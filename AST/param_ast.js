//引用文件流
const fs = require("fs");
//将js转换为AST
const {parse} = require("@babel/parser");
//遍历AST各节点
const traverse = require("@babel/traverse").default;
//判断节点的类型
const t = require("@babel/types");
//将AST转换为Js
generator = require("@babel/generator").default;

let jscode = fs.readFileSync('param.js', {
    "encoding": "utf-8"
});


let ast = parse(jscode)

const resolveActualParams = {
	CallExpression(path)
	{
		let calleePath    = path.get('callee');
		let argumentsPath = path.get('arguments');
		if (!calleePath.isFunctionExpression() || argumentsPath.length == 0)
		{
			return;
		}

		let paramsPath = calleePath.get('params');
		let scope      = calleePath.scope;

		for (let i=0; i<argumentsPath.length; i++)
		{
			let argPath = paramsPath[i];
			let name = argPath.node.name;
			const binding = scope.getBinding(name);
			if (!binding || !binding.constant) continue;
			for (let referPath of binding.referencePaths)
			{
				referPath.replaceWith(argumentsPath[i].node);
			}
			argPath.remove();
			argumentsPath[i].remove();
		}
	},
}

traverse(ast, resolveActualParams);
let {code} = generator(ast, opts = {jsescOption: {"minimal": true}});
console.log(code)