//将js转化为AST
const {parse} = require("@babel/parser");
//遍历AST各节点
const traverse = require("@babel/traverse").default;
//判断节点的类型
const t = require("@babel/types");
//将AST转化为js
const generator = require("@babel/generator").default;
const fs = require("fs");

let jscode = fs.readFileSync('./test.js', {
encoding: "utf-8"
});

//let jscode = "var b = a['lenght'];"
//let jscode = "a===b"
//let jscode = "var s = \'\x48\x65\x6c\x6c\x6f\'"
let ast = parse(jscode)

//const visitor =
//{
//   "MemberExpression"(path){
//        let property = path.get('property');
//        if(property.isStringLiteral()){
//            let value = property.node.value;
//            path.node.computed = false
//            property.replaceWith(t.Identifier(value))
//         }
//   }
//};

//const visitor = {
//    "BinaryExpression"(path){
//        if(path.node.operator === "===="){
//            console.log('enter')
//            path.node.left = t.identifier("wo")
//            path.node.right = t.identifier('sb')
//            }
//    }
//};
//
//const visitor = {
//    "BinaryExpression"(path){
//        if (path.node.operator === "==="){
//            path.node.left = t.identifier("we");
//            path.node.operator = "*"
//            path.node.right = t.identifier("stone");
//        }
////        else {
////         return;
////        }
//
//    }
//};

//const visitor = {
//    "StringLiteral"(path){
//        path.get('extra').remove()
//        }
//}


const visitor =
    {
        VariableDeclarator(path){
            // 还原数组对象
            const {id, init} = path.node;

            // 非Array或者没有元素， 返回
            if (!t.isArrayExpression(init) || init.elements.length===0) return;

            let elements = init.elements;
            console.log(elements)

            // 获取binding实例
            const binding = path.scope.getBinding(id.name);

            for ( const ref_path of binding.referencePaths){
                // 获取 MemberExpression 父节点
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
        }
    }

const visitor1 = {
     "StringLiteral"(path){
        delete path.node.extra
//        path.get('extra').remove()
        }
}

traverse(ast, visitor);
//traverse(ast, visitor1);
let {code} = generator(ast  );

fs.writeFile('./decode_test.js',  code, (err)=>{});
//console.log(code)