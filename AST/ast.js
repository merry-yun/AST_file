
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

let jscode = fs.readFileSync('test.js', {
    "encoding": "utf-8"
});

let ast = parse(jscode)
//变量替换
var test = {}
//todo something
const visitorchange = {
    "VariableDeclarator|Identifier"(path) {
        if (path.isVariableDeclarator()) {
            test[path.node.id.name] = path.node.init.value
            console.log(path.node.id.name)
        }

        if (path.parent.type === "AssignmentExpression" && test.hasOwnProperty(path.node.name)) {
//            path.replaceWith(t.valueToNode(test.s))
              let left = path.parent.left.name
              let right = path.parent.right.value
              console.log(left, right)
//              console.log(path)
        }
    }
}

const visitorchange_v1 = {
    "Identifier"(path) {
        let = {confident, value} = path.evaluate();
        if (confident) {
            path.replaceInline(t.valueToNode(value))
        }
    }
}

//unicode转换
const visitorUnicode = {
    "StringLiteral"(path){
        delete path.node.extra
    }
}

//大数组还原
const visitor_array = {
        "VariableDeclarator"(path){
            // 还原数组对象
            const {id, init} = path.node;

            // 非Array或者空Array， 返回
            if (!t.isArrayExpression(init) || init.elements.length===0) return;

            let elements = init.elements;
//            console.log(elements)

            // 获取binding实例
            const binding = path.scope.getBinding(id.name);


            for ( const ref_path of binding.referencePaths){
                // 获取 MemberExpression 父节点
//                console.log(ref_path)
                let member_path = ref_path.findParent(p=>p.isMemberExpression());
                if (!member_path)
                {

                    continue;
                }
                let property = member_path.get('property');

                // 索引值不是 NumericLiteral 类型的不处理
                if(!property.isNumericLiteral()){
                    continue;
                }

                // 获取索引值
                let index = property.node.value;

                // 获取索引值对应的节点， 并替换
                let arr_ele = elements[index];
                member_path.replaceWith(arr_ele)
            }
        },
        "StringLiteral"(path){
            delete path.node.extra
        }
    }

const visitor_array_v1 = {
    "CallExpression"(path) {
        var node = path.node;
        console.log(node)
        if(node.callee == undefined || node.callee.property == undefined) {
            return;
        }

        if(node.callee.property.name == "_l1L1") {
            var index = node.arguments[0].value;
            var value = _l1L1[index];
            console.log(value)
            path.replaceInline(t.valueToNode(value))
        }
    }
}

//控制流扁平化
const visitor_switch = {
	"WhileStatement"(path)
	{
		const {test,body} = path.node;

		//特征while语句是否为true
		if (!t.isBooleanLiteral(test) || test.value !== true) return;

		//特征语句判断，body.body[0] 必须是 SwitchStatement 节点，
		//注意一定要先判断长度，避免index出错
		if (body.body.length === 0  || !t.isSwitchStatement(body.body[0])) return;
        console.log(body.body.length)
		let switch_state = body.body[0];

		//获取discriminant及cases节点
		let {discriminant,cases} = switch_state;

		//特征语句判断，经过此判断后，基本可以确定是需要还原的while节点了。
		//如果出错了，可以继续增加判断，直到不出错即可
		if (!t.isMemberExpression(discriminant) || !t.isUpdateExpression(discriminant.property)) return;



		//获取数组名，用于查找该数组。
		let arr_name = discriminant.object.name;
		console.log(arr_name)
		let arr = [];

		//在这里再加一个特征语句的判断：WhileStatement 节点前面有两个节点
		let all_pre_siblings = path.getAllPrevSiblings();
//		if (all_pre_siblings.length !== 2) return;

		all_pre_siblings.forEach(pre_path =>
		{//虽然知道是第0个节点，但这里还是做下判断取arr
			const {declarations} = pre_path.node;
			let {id,init} = declarations[0];
			if (arr_name == id.name)
			{//如果是定义arr的节点，拿到该arr的值
				arr = init.callee.object.value.split('|');
				console.log(arr)
			}
			//没啥用的语句可以直接删除
			pre_path.remove()
		})

		//新建一个 数组变量，用于存放 case 节点
		let ret_body = [];

		arr.forEach(index =>
		{//遍历数组，去case节点
		    for (let case_state of cases){
		        if (index === case_state.test.value){
//		            console.log("i got it", index, case_state,test.value)
                    let case_body = case_state.consequent;
                    if (t.isContinueStatement(case_body[case_body.length-1]))
                    {//删除 continue语句
                        case_body.pop();
                    }
                    //存放于数组变量中
                    ret_body = ret_body.concat(case_body);

		        }

		    }
		})


		//替换
		path.replaceInline(ret_body);
	},
}

//for switch
const for_visitor = {
	ForStatement(path)
	{
		const {init,update,test,body} = path.node;
		if (!t.isVariableDeclaration(init) || !t.isBinaryExpression(test) || update !== null ) return;

		let declaration = init.declarations[0];

		const init_name = declaration.id.name;
		let init_value  = declaration.init.value;

		let {left,right,operator} = test;

		if (!t.isIdentifier(left,{name:init_name}) || operator !== "!=" ||
		    !t.isNumericLiteral(right)) return;

		let test_value = right.value;
		let switch_body = body.body[0];
		if (!t.isSwitchStatement(switch_body)) return;

		let {discriminant,cases} = switch_body;
		if (!t.isIdentifier(discriminant,{name:init_name})) return;

		let ret_body = [];

		let end_flag = false;


		while (init_value !== test_value)
		{
			if (end_flag === true)
			{
				break;
			}
			for (const each_case of cases)
			{
				let {test,consequent} = each_case;
				if (init_value !== test.value)
				{
					continue;
				}

				if (t.isContinueStatement(consequent[consequent.length-1]))
				{
					consequent.pop();
				}
				if (t.isExpressionStatement(consequent[consequent.length-1]))
				{
					let {expression} = consequent[consequent.length-1];
					if (t.isAssignmentExpression(expression))
					{
						let {left,right,operator} = expression;
						if (t.isIdentifier(left,{name:init_name}))
						{
							init_value = right.value;
							consequent.pop();
						}
					}
				}

				if (t.isReturnStatement(consequent[consequent.length-1]))
				{
					end_flag = true;
				}

				ret_body = ret_body.concat(consequent);
				break;
			}
		}
		path.replaceInline(ret_body);
	},
}

traverse(ast, visitorchange);
//let {code} = generator(ast);
let {code} = generator(ast, opts = {jsescOption: {"minimal": true}});
console.log(code)
fs.writeFile('./decode_test.js', code, (err) =>{});