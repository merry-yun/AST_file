/*****************************************************
Module name:decode_obfuscator.js
Author:悦来客栈的老板
Date:2021.06.06
Version:V1.2.0
混淆工具地址:https://obfuscator.io/
脚本仅用于被obfuscator混淆了的代码，不支持商业工具混淆的代码

声明:

脚本仅用于学习研究，禁止非法使用，否则后果自负！

欢迎购买AST星球共同学习交流
星球地址:
https://t.zsxq.com/FMRf2ZV
微信:523176585
*****************************************************/

const fs = require('fs');
const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const generator = require("@babel/generator").default;

const {deleteRepeatDefine} = require("./usefulPlugins");
const {constantFold,preDecodeObject} = require("./usefulPlugins");
const {keyToLiteral,isElementsLiteral}  = require("./usefulPlugins");
const {standardLoop,resolveSequence}    = require("./usefulPlugins");
const {removeDeadCode,simplifyLiteral}  = require("./usefulPlugins");


//将源代码解析为AST
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decode_result.js";


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

sourceCode = generator(ast).code;
ast    = parser.parse(sourceCode);


console.log("traverse callToLiteral.......");

function getReDefineFunction(scope,funcNames)
{
	decodeCode = "";
	scope.traverse(scope.block,{
			"VariableDeclarator"(path)
			{
				let {id,init} = path.node;
				if (!types.isFunctionExpression(init)) return;
				let body = init.body.body;
				if (body.length != 1 || !types.isReturnStatement(body[0])) return;
				if (!types.isCallExpression(body[0].argument)) return;
				decodeCode += ";\n" + path.toString();
				funcNames.push(id.name);
				path.remove();
			},
	})
	return decodeCode;
}



//获取 Obfuscator 混淆的特征paths，大数组 + 自执行函数 + 解密函数
function getObfuscatorPaths(path,funcNames)
{
	let obfuscatorPaths = [];
	let {scope} = path;
	let idPath   = path.get("id");
	let initPath = path.get("init");
	
	if (!initPath.isArrayExpression() ||
	    !isElementsLiteral(initPath)) 
	{//如果不是 数组类型，或者数组元素不全是字面量(包括-3等UnaryExpression表达式)，则直接返回。
		return [];
	}

	let binding = scope.getBinding(idPath.node.name);
	let {constant,referencePaths} = binding;
	if (!constant || referencePaths.length < 2) 
	{
		return [];	
	}
	
	obfuscatorPaths.push(path);
	
	for (const referPath of referencePaths)
	{
		let AncestorPath = referPath.findParent(p => p.isExpressionStatement()) || 
		                   referPath.findParent(p => p.isFunctionDeclaration()) ||
		                   referPath.findParent(p => p.isFunctionExpression());
		if (!AncestorPath)
		{
			return [];
		}
		if (AncestorPath.isFunctionDeclaration())
		{
			funcNames.push(AncestorPath.get('id').node.name);
		}
		else if (AncestorPath.isFunctionExpression())
		{
			AncestorPath = AncestorPath.parentPath;
			if (obfuscatorPaths.includes(AncestorPath))
			{
				continue;
			}
			if (!AncestorPath.isVariableDeclarator())
			{
				return [];
			}
			funcNames.push(AncestorPath.get('id').node.name);
		}
		else
		{
			let expression = AncestorPath.get('expression');
			if (!expression.isCallExpression())
			{
				return [];
			}
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
    
    let uniqueNames = new Set(funcNames);
    if (obfuscatorPaths.length != 3 || uniqueNames.size !== 1) return;
    uniqueNames.clear();
    
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
sourceCode = generator(ast).code;
ast    = parser.parse(sourceCode);

console.log("Object Decode .......");


function savePropertiesToObject(properties,newMap)
{
	for (const property of properties.reverse())
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

function replaceReferNode(newMap,referencePaths)
{
	for (const referPath of referencePaths.reverse())
	{
		let {node,parent,parentPath} = referPath;
		let ancestorPath = parentPath.parentPath;
		if (!parentPath.isMemberExpression({object:node})) return;
		let {property} = parent;
		let propKey = property.value;
		let propValue = newMap.get(propKey);
		if (!propValue) return;
		
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
		
		replaceReferNode(newMap,referencePaths);
		
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


sourceCode = generator(ast).code;
ast    = parser.parse(sourceCode);

console.log("constantFold.......");

traverse(ast, constantFold);

console.log("remove Dead Code.......\n");

traverse(ast, removeDeadCode);

console.timeEnd("处理完毕，耗时");



let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});