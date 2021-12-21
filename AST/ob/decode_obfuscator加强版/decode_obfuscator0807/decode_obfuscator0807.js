/*****************************************************
Module name:decode_obfuscator.js
Author:悦来客栈的老板
Date:2021.08.07
Version:V2.0.1
混淆工具地址:https://obfuscator.io/

脚本仅用于被obfuscator混淆了的代码，不支持商业工具混淆的代码

声明:

脚本仅用于学习研究，禁止非法使用，否则后果自负！


使用方法可以观看在线视频:

https://www.bilibili.com/video/BV16V411H7yz

欢迎购买AST星球共同学习交流
星球地址:
https://t.zsxq.com/FMRf2ZV

微信:523176585

*****************************************************/

const fs            = require('fs');
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const types         = require("@babel/types");
const generator     = require("@babel/generator").default;
const usefulPlugins = require("./usefulPlugins");

const {varDeclarToFuncDeclar}   = usefulPlugins;
const {DeclaratorToDeclaration} = usefulPlugins;
const {standardLoop,resolveSequence}     = usefulPlugins;
const {constantFold,preDecodeObject}     = usefulPlugins;
const {keyToLiteral,isElementsLiteral}   = usefulPlugins;
const {removeDeadCode,simplifyLiteral}   = usefulPlugins;
const {isBaseLiteral,deleteRepeatDefine} = usefulPlugins;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
let ast    = parser.parse(sourceCode);

console.time("处理完毕，耗时");


//字面量解混淆
console.log("traverse Hex or Unicode String.......");

traverse(ast, simplifyLiteral);

console.log("constantFold.......");

traverse(ast, constantFold);

console.log("delete Repeat Define.......");

traverse(ast, deleteRepeatDefine);

console.log("resolve Sequence.......");

traverse(ast, standardLoop);
traverse(ast, resolveSequence);

console.log("Simpliy VariableDeclaration......");

traverse(ast, DeclaratorToDeclaration);

traverse(ast, varDeclarToFuncDeclar);

function getReDefineFunction(scope,funcNames)
{
	decodeCode = "";
	scope.traverse(scope.block,{
			"FunctionDeclaration"(path)
			{
				let {id,body} = path.node;
				body = body.body;
				if (body.length != 1 || !types.isReturnStatement(body[0]))
				{
					return;
				}
				let argument = body[0].argument;
				if (!types.isCallExpression(argument) || 
				    !types.isIdentifier(argument.callee))
				{
					return;
				}
				decodeCode += path.toString();
				funcNames.push(id.name);
				path.remove();
			},
	})
	return decodeCode;
}



//获取 Obfuscator 混淆的特征paths，大数组 + 自执行函数 + 解密函数
function getObfuscatorPaths(path,funcNames)
{
	
	let {scope} = path;
	let idPath   = path.get("id");
	let initPath = path.get("init");
	
	if (!initPath.isArrayExpression() ||
	    !isElementsLiteral(initPath)) 
	{//如果不是 数组类型，或者数组元素不全是字面量(包括-3等UnaryExpression表达式)，则直接返回。
		return;
	}

	let binding = scope.getBinding(idPath.node.name);
	let {constant,referencePaths} = binding;
	if (!constant || referencePaths.length < 2) 
	{
		return;
	}
	
	let obfuscatorPaths = [path];
	
	for (const referPath of referencePaths)
	{
		let AncestorPath = referPath.findParent(p => p.isFunctionDeclaration()) || 
		                   referPath.findParent(p => p.isCallExpression());
		if (!AncestorPath)
		{
			return;
		}
		if (AncestorPath.isFunctionDeclaration())
		{
			funcNames.push(AncestorPath.get('id').node.name);
		}
		else
		{
			if(!AncestorPath.parentPath.isExpressionStatement({expression:AncestorPath.node}))
			{
				return;
			}
			AncestorPath = AncestorPath.parentPath;
		}
		if (obfuscatorPaths.includes(AncestorPath))
		{
			continue;
		}
		obfuscatorPaths.push(AncestorPath);		
	}
	return obfuscatorPaths;
}

console.log("traverse CallExpress To ToLiteral.......");

const CallExpressToLiteral = 
{
	VariableDeclarator(path) 
	{
		let {scope} = path;
    let funcNames = [];
    let obfuscatorPaths = getObfuscatorPaths(path, funcNames);
    if (!obfuscatorPaths || obfuscatorPaths.length < 3) return;
    
    let obfuscatorCode = "";
    obfuscatorPaths.forEach(eachPath => {obfuscatorCode += eachPath.toString() + ";\n"});
    obfuscatorCode += getReDefineFunction(scope,funcNames);

    let funcAst = parser.parse(obfuscatorCode);
	  obfuscatorCode = generator(funcAst,opts = {"compact":true}).code;

    eval(obfuscatorCode);
    
    let binding =  scope.getBinding(funcNames[0]);
    let {start,end} = binding.path.node;
    let canRemoved = true;
    
    scope.traverse(scope.block, {
       "CallExpression"(path) 
       {
       	let node = path.node;
       	if (node.start > start && node.end < end) return;
        let {callee, arguments} = node;
        if (!types.isIdentifier(callee)) return;
        if (!funcNames.includes(callee.name)) return;
        if (!isElementsLiteral(path)) 
        {
        	canRemoved = false;
        	return;
        }
        
        let value = eval(path.toString());
        console.log(path.toString(), "-->", value);
        path.replaceWith(types.valueToNode(value));
       },
    });
    
    if (canRemoved)
    {
    	obfuscatorPaths.forEach(eachPath => {eachPath.remove();});   	
    }
    
    scope.crawl();
  },
}

traverse(ast, CallExpressToLiteral);

console.log("constantFold.......");

traverse(ast, constantFold);


//object key值Literal
console.log("Object Preconditioning .......");

traverse(ast, keyToLiteral);
traverse(ast, preDecodeObject);

//处理object

console.log("Object Decode .......");


function savePropertiesToObject(properties,newMap)
{
	for (const property of properties)
	{
		let propKey   = property.key.value;
		let propValue = property.value;
		if (types.isStringLiteral(propValue))
		{
			newMap.set(propKey,propValue.value);
		}
		else if (types.isFunctionExpression(propValue))
		{
			let retState = propValue.body.body;
			if (retState.length == 1 && types.isReturnStatement(retState[0]))
			{
				let argument = retState[0].argument;
				if (types.isCallExpression(argument))
				{
					newMap.set(propKey,"Call");
				}
				else if (types.isBinaryExpression(argument) || 
							   types.isLogicalExpression(argument))
				{
					newMap.set(propKey,argument.operator);
				}
			}
		}
		else
		{
			break;
		}
	}
}

function replaceReferNode(newMap,referencePaths,scope)
{
	for (const referPath of referencePaths)
	{
		let {node,parent,parentPath} = referPath;
		let ancestorPath = parentPath.parentPath;
		if (!parentPath.isMemberExpression({object:node})) 
		{
			continue;
		}
		let {property} = parent;
		let propKey = property.value;
		let propValue = newMap.get(propKey);
		if (!propValue) 
		{
			continue;
		}

		
		if (ancestorPath.isCallExpression({callee:parent}))
		{
			let {arguments} = ancestorPath.node;
			switch (propValue) {
					case "Call":
						 ancestorPath.replaceWith(types.CallExpression(arguments[0], arguments.slice(1)));
						 break;
					case "||":
					case "&&":
						 ancestorPath.replaceWith(types.LogicalExpression(propValue, arguments[0], arguments[1]));
						 break;
					default:
						 ancestorPath.replaceWith(types.BinaryExpression(propValue, arguments[0], arguments[1]));
						 break; 
			}
		}
		else
		{
			parentPath.replaceWith(types.valueToNode(propValue));
		}
		
		scope.crawl();
	}	
}


const decodeObject = {
	VariableDeclarator({node,scope})
	{
		const {id,init} = node;
		if (!types.isObjectExpression(init)) return;
		let name = id.name;

		let binding =  scope.getBinding(name);
		let {constant,referencePaths} = binding;
		if (!constant) return;

		let properties = init.properties;
		if (properties.length == 0) return;
		
		let newMap = new Map();
		savePropertiesToObject(properties,newMap); 
		if (newMap.size != properties.length) return;
		
		replaceReferNode(newMap,referencePaths,scope);
		
		newMap.clear();
	},
}

traverse(ast, decodeObject);


console.log("Control Flow Decoding.......\n");

//去控制流
const decodeControlFlow = {
	
	WhileStatement(path)
	{
		const {node,scope} = path;
		const {test,body}  = node;
		if (!types.isLiteral(test,{value:true})) return;
		if (body.body.length != 2) return;
		let switchNode = body.body[0],breakNode = body.body[1];
		if (!types.isSwitchStatement(switchNode) || 
		    !types.isBreakStatement(breakNode))
		{
			return;
		}
		let {discriminant,cases} = switchNode;
		if (!types.isMemberExpression(discriminant)) return;
		let {object,property} = discriminant;
		if (!types.isIdentifier(object) || !types.isUpdateExpression(property)) return;
		
		let arrName = object.name;
		let binding =  scope.getBinding(arrName);
		if (!binding || !binding.path || !binding.path.isVariableDeclarator()) return;
		let {id,init} = binding.path.node; 
		if (!types.isCallExpression(init) || !types.isMemberExpression(init.callee)) return;
		object   = init.callee.object;
		property = init.callee.property;
		if (!types.isStringLiteral(object) || !types.isStringLiteral(property,{value:"split"})) 
		{
			return;
		}
		
		let disPatchArray = object.value.split("|");
		let retBody = [];
		disPatchArray.forEach(index =>
		{
			let caseBody = cases[index].consequent;
			if (types.isContinueStatement(caseBody[caseBody.length-1]))
			{
				caseBody.pop();
			}
			retBody = retBody.concat(caseBody);
		})
		
		path.replaceWithMultiple(retBody);
	},
}

traverse(ast, decodeControlFlow);


console.log("constantFold.......");

traverse(ast, constantFold);

console.log("remove Dead Code.......\n");

traverse(ast, removeDeadCode);

const deleteObfuscatorCode = 
{
	VariableDeclarator(path)
	{
		let sourceCode = path.toString();
		let {id,init} = path.node;
		if (types.isCallExpression(init))
		{
			let {callee,arguments} = init;
			if (arguments.length == 0 && sourceCode.includes("apply"))
			{
				path.remove();
			}
			else if((sourceCode.includes("constructor") || sourceCode.includes("RegExp")) &&
				     types.isIdentifier(callee) && arguments.length == 2 && 
				     types.isThisExpression(arguments[0]) &&
				     types.isFunctionExpression(arguments[1]))
			{
				let funcName = id.name;
				
				let nextSibling = path.parentPath.getNextSibling();
				if (nextSibling.isExpressionStatement())
				{
					let expression = nextSibling.get("expression");
					
					if (expression.isCallExpression() && expression.get("callee").isIdentifier({name:funcName}))
					{
						path.remove();
						nextSibling.remove();
					}
				}
			}
		}
	},
	ExpressionStatement(path)
	{
		let sourceCode = path.toString();
		if (!sourceCode.includes("RegExp") && !sourceCode.includes("chain"))
		{
			return;
		}
		
		let {expression} = path.node;
		if (!types.isCallExpression(expression))
		{
			return;
		}
		let {callee,arguments} = expression;
		
		if (!types.isFunctionExpression(callee) || arguments.length != 0)
		{
			return;
		}
		
		let body = callee.body.body;
		if (body.length != 1 || !types.isExpressionStatement(body[0]))
		{
			return;
		}
		expression = body[0].expression;
		if (!types.isCallExpression(expression))
		{
			return;
		}		
		callee = expression.callee;
		arguments = expression.arguments;
		
		if (!types.isCallExpression(callee) || arguments.length != 0)
		{
			return;
		}
		arguments = callee.arguments;
		if(arguments.length == 2 && 
			types.isThisExpression(arguments[0]) &&
			types.isFunctionExpression(arguments[1]))
		{
			path.remove();
		}
	},
	CallExpression(path)
	{
		let {scope,node} = path;
		let {callee,arguments} = node;
		if (!types.isIdentifier(callee,{name:"setInterval"}))
		{
			return;
		}
		if (arguments.length != 2 || !types.isFunctionExpression(arguments[0]) ||
		    !types.isNumericLiteral(arguments[1]))
		{
			return;
		}
		
		let body = arguments[0].body.body;
		if (body.length != 1 || !types.isExpressionStatement(body[0]))
		{
			return;
		}
		expression = body[0].expression;
		if (!types.isCallExpression(expression))
		{
			return;
		}
		callee = expression.callee;
		arguments = expression.arguments;
		
		if (!types.isIdentifier(callee) || arguments.length != 0)
		{
			return;
		}
		
		let binding =  scope.getBinding(callee.name);
		if (!binding || !binding.path)
		{
			return;
		}
		
		let sourceCode = binding.path.toString();
		if (sourceCode.includes("constructor") || 
		    sourceCode.includes("debugger"))
		{
			path.remove();
			binding.path.remove();
		}
	},
}

traverse(ast, deleteObfuscatorCode);


console.timeEnd("处理完毕，耗时");



let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});