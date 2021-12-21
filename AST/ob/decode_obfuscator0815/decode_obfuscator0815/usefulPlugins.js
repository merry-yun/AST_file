/*****************************************************
ͨ�ò���ϼ�:
Module name:usefulPugins.js
Author:������ջ���ϰ�
Date:2021.08.15
Version:V1.4.0
��ӭ���뱾�˵�����:
https://t.zsxq.com/FMRf2ZV
*****************************************************/

const types     = require("@babel/types");

//�жϽڵ�Ԫ���Ƿ�Ϊ������
//eg.  ++123,-456,"789";
function isBaseLiteral(path)
{
	if (path.isLiteral())
	{
		return true;
	}
	if (path.isUnaryExpression({operator:"-"}) || 
	    path.isUnaryExpression({operator:"+"}))
	{
		return isBaseLiteral(path.get('argument'));
	}
	
	return false;
}


//�жϽڵ�Ԫ��[Arrays]�Ƿ�ȫ��Ϊ������
function isElementsLiteral(path)
{
	let key = null;
	
	if (path.isArrayExpression())
	{
		key = "elements";
	}
	else if(path.isObjectExpression())
	{
		key = "properties";
	}
	else if(path.isCallExpression())
	{
		key = "arguments";
	}
	else
	{
		return isBaseLiteral(path);
	}
	
	let elements = path.get(key);
	
	if (elements.length == 0) return false;
	
	if (key == "properties")
	{
		return elements.every(element => isBaseLiteral(element.get("value")));
	}
	
	return elements.every(element=>isBaseLiteral(element));
}


/******************************
����ǰ:
var a = 123,b = 456;
let c  = 789,d = 120;
�����:
var a = 123;
var b = 456;
let c = 789;
let d = 120;
******************************/
const DeclaratorToDeclaration = 
{
	VariableDeclaration(path)
	{
		if (path.parentPath.isForStatement())
		{
			return;
		}
		
		let {declarations,kind} = path.node;
		if (declarations.length == 1)
		{
			return;
		}
		let newDeclartionNode = types.VariableDeclaration(kind,[declarations[0]]);
		path.insertBefore(newDeclartionNode);
		declarations.shift();
		path.visit();
	},
}

const varDeclarToFuncDeclar = 
{
	VariableDeclarator(path)
	{
		let {id,init} = path.node;
		if (!types.isFunctionExpression(init,{id:null}))
		{
			return;
		}
		let {params,body} = init;
		let newNode = types.FunctionDeclaration(id,params,body);
		path.parentPath.replaceWith(newNode);
	},
}

//�淶Forѭ����Whileѭ��
const standardLoop = 
{
	"ForStatement|WhileStatement"({node})
	{
		if(types.isExpressionStatement(node.body))
    {
    	node.body = types.BlockStatement([node.body]);
    }
  },
}

function isSequenceCanBeResolved(path)
{
	let parentPath = path.parentPath;
	if (parentPath.isForStatement() || parentPath.isLogicalExpression())
	{
		return false;
	}
	let statement = path.getStatementParent();
	if (!statement) 
	{
		return false;
	}
	let CondintionPath = path.findParent(p => p.isConditionalExpression());
	if (CondintionPath)
	{
		let nextCondintionPath = statement.findParent(p => p.isConditionalExpression());
		if (nextCondintionPath != CondintionPath) 
		{
			return false;
		}
	}	
	return true;
}

//�����ű��ʽ
const resolveSequence = {
	SequenceExpression: {
		exit(path){
			let {scope} = path;
			if (!isSequenceCanBeResolved(path))
			{
				return;
			}
			let statement = path.getStatementParent();
			let expressions = path.get('expressions');
			let lastExpression = expressions.pop();
			for (let expression of expressions)
			{
				if(expression.isLiteral() || expression.isIdentifier())
				{
					expression.remove();
					continue;
				}
				statement.insertBefore(types.ExpressionStatement(expression=expression.node));
			}
			path.replaceInline(lastExpression);
			scope.crawl();
    }
    
  },
}

const simplifyLiteral = {
	NumericLiteral({node}) {
		if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
			node.extra = undefined;
		}
  },
  StringLiteral({node}) 
  {
  	if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
  		node.extra = undefined;
    }
  },
}

const constantFold = 
{
	  "BinaryExpression|UnaryExpression"(path)
    {
    	if(path.isUnaryExpression({operator:"-"}) || 
    	   path.isUnaryExpression({operator:"void"}))
    	{
    		return;
    	}
    	const {confident,value} = path.evaluate();
    	if (!confident || value == "Infinity") return;
    	path.replaceWith(types.valueToNode(value));
    },
}

//ɾ���ظ�������δ���ı��ʼֵ�ı���
const deleteRepeatDefine = {
	"VariableDeclarator|FunctionDeclaration"(path)
	{
		let {node,scope,parentPath} = path;
		
		if (path.isFunctionDeclaration())
		{
			scope = parentPath.scope;
		}
		let name = node.id.name;
		const binding = scope.getBinding(name);
		if (path.isFunctionDeclaration())
		{
			if(!binding || binding.constantViolations.length > 1)
			{
				return;
			}
		}
    else
    {
    	if(!binding || !binding.constant) return;
    }
    
    scope.traverse(scope.block,{
    	VariableDeclarator(path)
    	{
    		let {node,scope} = path;
    		let {id,init} = node;
    		if (!types.isIdentifier(init,{name:name})) return;
    		
    		const binding = scope.getBinding(id.name);
    		
    		if (!binding || !binding.constant) return;
    	
    		scope.rename(id.name,name);
    		path.remove();
    	},
    })
    
    scope.crawl();     
	},
	 
}

const keyToLiteral = {
	MemberExpression:
	{
		exit({node})
		{
			const prop = node.property;
			if (!node.computed && types.isIdentifier(prop))
			{
				node.property = types.StringLiteral(prop.name);
				node.computed = true;
			}
    }
  },	
  ObjectProperty: 
  {
		exit({node})
		{
			const key = node.key;
			if (!node.computed && types.isIdentifier(key))
			{
				node.key = types.StringLiteral(key.name);
			}
		}
	},  
}

const preDecodeObject = {
	VariableDeclarator({node,parentPath,scope})
	{
		const {id,init} = node;
		if (!types.isObjectExpression(init)) return;
		let name = id.name;
		
		let properties = init.properties;
		let allNextSiblings = parentPath.getAllNextSiblings();
		for (let nextSibling of allNextSiblings)
		{
			if (!nextSibling.isExpressionStatement())  break;
			
			let expression = nextSibling.get('expression');
			if (!expression.isAssignmentExpression({operator:"="})) break;

			let {left,right} = expression.node;
			if (!types.isMemberExpression(left)) break;
			
			let {object,property} = left;
			if (!types.isIdentifier(object,{name:name}) ||
			    !types.isStringLiteral(property)) 
		  {
		  	break;
		  }
		  
			properties.push(types.ObjectProperty(property,right));
			nextSibling.remove();
		}	
		scope.crawl();	
	},
}

const removeDeadCode = {
	"IfStatement|ConditionalExpression"(path)
	{
		let {consequent,alternate} = path.node;
		let testPath = path.get('test');
		const evaluateTest = testPath.evaluateTruthy();
		if (evaluateTest === true)
		{
			if (types.isBlockStatement(consequent))
			{
				consequent = consequent.body;
			}
			path.replaceWithMultiple(consequent);
		}
		else if (evaluateTest === false)
		{
			if (alternate != null)
			{
				if (types.isBlockStatement(alternate))
			  {
			  	alternate = alternate.body;
			  }
				path.replaceWithMultiple(alternate);
			}
			else
			{
				path.remove();
			}
		}  		
	},
  EmptyStatement(path)
  {
  	path.remove();
  },  
  "VariableDeclarator|FunctionDeclaration"(path)
	{//��setTimeout��������eval�������޷�����Ƿ����ã��������á�
		let {node,scope,parentPath} = path;
		if (path.isFunctionDeclaration())
		{
			scope = parentPath.scope;
		}
		let binding =  scope.getBinding(node.id.name);	
		if (binding && !binding.referenced && binding.constant)
		{//û�б����ã�Ҳû�б��ı�
			path.remove();
		}
	},
}

exports.isBaseLiteral      = isBaseLiteral;
exports.constantFold       = constantFold;
exports.keyToLiteral       = keyToLiteral;
exports.standardLoop       = standardLoop;
exports.removeDeadCode     = removeDeadCode;
exports.preDecodeObject    = preDecodeObject;
exports.simplifyLiteral    = simplifyLiteral;
exports.resolveSequence    = resolveSequence;
exports.isElementsLiteral  = isElementsLiteral;
exports.deleteRepeatDefine = deleteRepeatDefine;
exports.varDeclarToFuncDeclar = varDeclarToFuncDeclar;
exports.DeclaratorToDeclaration = DeclaratorToDeclaration;