
const parser = require("@babel/parser");
// 为parser提供模板引擎
const template = require("@babel/template").default;
// 遍历AST
const traverse = require("@babel/traverse").default;
// 操作节点，比如判断节点类型，生成新的节点等
const babelt = require("@babel/types");
// 将语法树转换为源代码
const generator = require("@babel/generator");
// 操作文件
const fs = require("fs");

//定义公共函数
function wtofile(path, flags, code) {
    var fd = fs.openSync(path,flags);
    fs.writeSync(fd, code);
    fs.closeSync(fd);
}

function dtofile(path) {
    fs.unlinkSync(path);
}

var file_path = 'c18a1a5c.js';
var jscode = fs.readFileSync(file_path, {
    encoding: "utf-8"
});

// 转换为AST语法树
let ast = parser.parse(jscode);

// 导出调用函数
let topcode = "";
function gettempjs(ast) {
    let tempast = parser.parse("");  //深复制
    tempast.program.body = ast.program.body[0].expression.callee.body.body.slice(0, 5);
    let code = generator.default(tempast, {
        compact: false //压缩格式
    }).code;
    topcode = code;
    wtofile('temp.js', 'w', code + '\n');
}

// 提取解密函数
gettempjs(ast);


let functionnamelist = [];
traverse(ast, {
    FunctionDeclaration(path){
        if (path.node.params.length === 0){
            wtofile('temp.js', 'a', path.toString() + '\n');
            functionnamelist.push(path.node.id.name);
        }
    }
});

let code = "{";
functionnamelist.forEach(function(item, index){
    code += item + ': ' + item + ', '
});
code += '}';
wtofile('temp.js', 'a', "module.exports=" + code + ";\n");
let Functionnamecall = require('./temp');
traverse(ast, {
    FunctionDeclaration(path){
        if (path.node.params.length === 0){
            let bindingslist = path.parentPath.scope.bindings;
            let bindings = bindingslist[path.node.id.name];
            for (let i = 0; i < bindings.referencePaths.length; i++) {
                let item = bindings.referencePaths[i].parentPath;
                if (item.node.type === 'CallExpression'){
                    try{
                        let value = Functionnamecall[item.node.callee.name]();
                        if ((typeof value) === 'string'){
                            item.replaceWith(babelt.stringLiteral(value))
                        }else{
                            return;
                        }
                    }catch (e) {
                        return
                    }
                }else{
                    return;
                }
            }
            path.remove()
        }
    }
});
dtofile('temp.js');

// 计算二元运算
traverse(ast, {
    BinaryExpression(path){
        if (path.node.left.type === 'NumericLiteral' && path.node.right.type === 'NumericLiteral'){
            switch (path.node.operator) {
                case "+":
                    path.replaceWith(babelt.numericLiteral(path.node.left.value + path.node.right.value));
                    path.parentPath.visit();
                    break;
                case "-":
                    path.replaceWith(babelt.numericLiteral(path.node.left.value - path.node.right.value));
                    path.parentPath.visit();
                    break;
            }
        }

    }
});

// 导出调用函数
function gettempjs2(ast) {
    let tempast = parser.parse("");  //深复制
    tempast.program.body = ast.program.body[0].expression.callee.body.body.slice(0, 5);
    let code = generator.default(tempast, {
        compact: false //压缩格式
    }).code;
    wtofile('temp2.js', 'w', code + '\n');
    code = generator.default(ast.program.body[0].expression.callee.body.body[ast.program.body[0].expression.callee.body.body.length - 1], {
        compact: false //压缩格式
    }).code;
    wtofile('temp2.js', 'a', code + '\n');
    wtofile('temp2.js', 'a', "module.exports=" + ast.program.body[0].expression.callee.body.body[ast.program.body[0].expression.callee.body.body.length - 1].id.name + ";\n");
}

// 提取解密函数
gettempjs2(ast);
Functionnamecall = require('./temp2');

// 还原部分直接的字符串
traverse(ast, {
    CallExpression(path){
        if (path.node.callee.name === ast.program.body[0].expression.callee.body.body[ast.program.body[0].expression.callee.body.body.length - 1].id.name && path.node.arguments.length === 1){
            try{
                let value = Functionnamecall(path.node.arguments[0].value);
                if ((typeof value) === 'undefined'){
                    path.remove()
                }else{
                    path.replaceWith(babelt.stringLiteral(value))
                }
            }catch (e) {}
        }
    }
});
dtofile('temp2.js');

traverse(ast, {
    BlockStatement(path){
        if (path.node.body.length >= 2 && path.node.body[path.node.body.length - 1].type === 'WhileStatement'){
            let BlockStatements = [];
            if (path.node.body[path.node.body.length - 2].declarations.length === 1){
                let number = path.node.body[path.node.body.length - 2].declarations[0].init.value;
                let idname = path.node.body[path.node.body.length - 2].declarations[0].id.name;
                while (true){
                    let isreturn = false;
                    for (let i = 0; i < path.node.body[path.node.body.length - 1].body.body[0].cases.length; i++) {
                        let item = path.node.body[path.node.body.length - 1].body.body[0].cases[i];
                        if (item.test.value === number){
                            for (let j = 0; j < item.consequent.length; j++) {
                                let item2 = item.consequent[j];
                                if (item2.type === 'ExpressionStatement' && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === idname){
                                    switch (item2.expression.operator) {
                                        case "+=":
                                            number += item2.expression.right.value;
                                            break;
                                        case "-=":
                                            number -= item2.expression.right.value;
                                            break;
                                        default:
                                            throw "未知的运算符号"
                                    }
                                    break;
                                }else if(item2.type === 'ReturnStatement'){
                                    BlockStatements.push(item2);
                                    isreturn = true;
                                    break;
                                }else{
                                    BlockStatements.push(item2)
                                }
                            }
                            while(item.consequent[item.consequent.length - 1].type !== 'BreakStatement' && !isreturn){
                                i++;
                                item = path.node.body[path.node.body.length - 1].body.body[0].cases[i];
                                for (let j = 0; j < item.consequent.length; j++) {
                                    let item2 = item.consequent[j];
                                    if (item2.type === 'ExpressionStatement' && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === idname){
                                        switch (item2.expression.operator) {
                                            case "+=":
                                                number += item2.expression.right.value;
                                                break;
                                            case "-=":
                                                number -= item2.expression.right.value;
                                                break;
                                            default:
                                                throw "未知的运算符号"
                                        }
                                        break;
                                    }else if(item2.type === 'ReturnStatement'){
                                        BlockStatements.push(item2);
                                        isreturn = true;
                                        break;
                                    }else{
                                        BlockStatements.push(item2)
                                    }
                                }
                            }
                            break
                        }
                    }
                    if (isreturn){
                        break;
                    }
                }
                path.node.body = path.node.body.slice(0, -2).concat(BlockStatements)
            }else{
                let numberlist = path.node.body[path.node.body.length - 2].declarations[1].init.elements;
                let idname = path.node.body[path.node.body.length - 2].declarations[1].id.name;
                let number = 0;
                let pushname;
                let pushdata = {};
                while (number < numberlist.length){
                    for (let i = 0; i < path.node.body[path.node.body.length - 1].body.body[0].cases.length; i++) {
                        let item = path.node.body[path.node.body.length - 1].body.body[0].cases[i];
                        if (item.test.value === numberlist[number].value){
                            for (let j = 0; j < item.consequent.length; j++) {
                                let item2 = item.consequent[j];
                                if (item2.type === 'VariableDeclaration' && item2.declarations.length === 1 && item2.declarations[0].init.type === 'MemberExpression' && item2.declarations[0].init.object.type === 'Identifier' && item2.declarations[0].init.object.name === idname){
                                    pushname = item2.declarations[0].id.name;
                                }else if(item2.type === 'VariableDeclaration' && item2.declarations.length === 1 && item2.declarations[0].init.type === 'ArrayExpression'){
                                    BlockStatements.push(item2);
                                    pushdata[item2.declarations[0].id.name] = item2.declarations[0].init.elements;
                                }else if(item2.type === 'ExpressionStatement' && item2.expression.type === 'CallExpression' && item2.expression.callee.type === 'MemberExpression' && item2.expression.callee.object.type === 'Identifier' && item2.expression.callee.object.name === pushname){
                                    numberlist = numberlist.concat(pushdata[item2.expression.arguments[1].name]);
                                    // 逆向删除变量
                                    for (let k = 0; k < BlockStatements.length; k++) {
                                        let item3 = BlockStatements[k];
                                        if (item3.type === 'VariableDeclaration' && item3.declarations.length === 1 && item3.declarations[0].id.name === item2.expression.arguments[1].name){
                                            BlockStatements.splice(k, 1);
                                            break;
                                        }
                                    }
                                }else if(item2.type === 'BreakStatement'){
                                }else{
                                    BlockStatements.push(item2);
                                }
                            }
                            while(item.consequent[item.consequent.length - 1].type !== 'BreakStatement' && item.consequent[item.consequent.length - 1].type !== 'ReturnStatement'){
                                i++;
                                item = path.node.body[path.node.body.length - 1].body.body[0].cases[i];
                                for (let j = 0; j < item.consequent.length; j++) {
                                    let item2 = item.consequent[j];
                                    if (item2.type === 'VariableDeclaration' && item2.declarations.length === 1 && item2.declarations[0].init.type === 'MemberExpression' && item2.declarations[0].init.object.type === 'Identifier' && item2.declarations[0].init.object.name === idname){
                                        pushname = item2.declarations[0].id.name;
                                    }else if(item2.type === 'VariableDeclaration' && item2.declarations.length === 1 && item2.declarations[0].init.type === 'ArrayExpression'){
                                        BlockStatements.push(item2);
                                        pushdata[item2.declarations[0].id.name] = item2.declarations[0].init.elements;
                                    }else if(item2.type === 'ExpressionStatement' && item2.expression.type === 'CallExpression' && item2.expression.callee.type === 'MemberExpression' && item2.expression.callee.object.type === 'Identifier' && item2.expression.callee.object.name === pushname){
                                        numberlist = numberlist.concat(pushdata[item2.expression.arguments[1].name]);
                                        // 逆向删除变量
                                        for (let k = 0; k < BlockStatements.length; k++) {
                                            let item3 = BlockStatements[k];
                                            if (item3.type === 'VariableDeclaration' && item3.declarations.length === 1 && item3.declarations[0].id.name === item2.expression.arguments[1].name){
                                                BlockStatements.splice(k, 1);
                                                break;
                                            }
                                        }
                                    }else if(item2.type === 'BreakStatement'){
                                    }else{
                                        BlockStatements.push(item2);
                                    }
                                }
                            }
                        }
                    }
                    number++;
                }
                path.node.body = path.node.body.slice(0, -2).concat(BlockStatements)
            }
        }
    }
});

// 此时可以看到最后一个函数是最长的，实际是多个函数混合在一起，通过第一个参数的偏移值来确定执行的哪一个函数
// 实际只有两个调用处，可以将函数分离出来
Functionnamecall = ast.program.body[0].expression.callee.body.body[ast.program.body[0].expression.callee.body.body.length - 1];
let delnumber = ast.program.body[0].expression.callee.body.body.length - 1;
traverse(ast, {
    CallExpression(path){
        if(path.node.callee.name === Functionnamecall.id.name){
            path.node.callee.name = path.node.callee.name + '_' + path.node.arguments[0].value;
            let BlockStatements = [];
            let number = path.node.arguments[0].value;
            let idname = Functionnamecall.params[0].name;
            while (true){
                let isreturn = false;
                for (let i = 0; i < Functionnamecall.body.body[0].body.body[0].cases.length; i++) {
                    let item = Functionnamecall.body.body[0].body.body[0].cases[i];
                    if (item.test.value === number){
                        for (let j = 0; j < item.consequent.length; j++) {
                            let item2 = item.consequent[j];
                            if (item2.type === 'ExpressionStatement' && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === idname){
                                switch (item2.expression.operator) {
                                    case "+=":
                                        number += item2.expression.right.value;
                                        break;
                                    case "-=":
                                        number -= item2.expression.right.value;
                                        break;
                                    default:
                                        throw "未知的运算符号"
                                }
                                break;
                            }else if(item2.type === 'ReturnStatement'){
                                BlockStatements.push(item2);
                                isreturn = true;
                                break;
                            }else{
                                BlockStatements.push(item2)
                            }
                        }
                        while(item.consequent[item.consequent.length - 1].type !== 'ContinueStatement' && !isreturn){
                            i++;
                            item = Functionnamecall.body.body[0].body.body[0].cases[i];
                            for (let j = 0; j < item.consequent.length; j++) {
                                let item2 = item.consequent[j];
                                if (item2.type === 'ExpressionStatement' && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === idname){
                                    switch (item2.expression.operator) {
                                        case "+=":
                                            number += item2.expression.right.value;
                                            break;
                                        case "-=":
                                            number -= item2.expression.right.value;
                                            break;
                                        default:
                                            throw "未知的运算符号"
                                    }
                                    break;
                                }else if(item2.type === 'ReturnStatement'){
                                    BlockStatements.push(item2);
                                    isreturn = true;
                                    break;
                                }else{
                                    BlockStatements.push(item2)
                                }
                            }
                        }
                        break
                    }
                }
                if (isreturn){
                    break;
                }
            }
            ast.program.body[0].expression.callee.body.body.push(babelt.functionDeclaration(babelt.identifier(path.node.callee.name), Functionnamecall.params.slice(0, path.node.arguments.length), babelt.blockStatement(BlockStatements)))
        }
    }
});
ast.program.body[0].expression.callee.body.body.splice(delnumber, 1);

ast = parser.parse(generator.default(ast).code);

// 还原形如下面的代码
// var bn = "qzE",
//     bo = 1;
// bo = bo + 1;
// bn = 1;
// var bp = "";
// bn = bo;
// bo = [3178496, 3670016, 3670016, 3538944, 3964928];
//
// for (var bq = 0; bq < bo.length; bq++) {
//     bp = bp + $(bo[bq] >> 15);
// }
//
// bo = bo.p(bn);

// 应该被还原为
// var bp = "apply";

// 递归反混淆上述情况
traverse(ast, {
    BlockStatement(path){
        let iii = 0;
        while (iii < path.node.body.length){
            let BlockStatements = [];
            let item = path.node.body[iii];
            let itemdeclarationslen = 0;
            if (item.declarations){
                itemdeclarationslen = item.declarations.length;
            }
            code = generator.default(item).code;
            if (item.type === 'VariableDeclaration' && item.declarations.length >= 2){
                let flag = false;
                for (let jjj = 0; jjj < item.declarations.length; jjj++) {
                    let item2 = item.declarations[jjj];
                    if(item2.init && item2.init.type === 'StringLiteral' && item.declarations[jjj + 1] && item.declarations[jjj + 1].init && item.declarations[jjj + 1].init.type === 'NumericLiteral' && item.declarations[jjj + 1].init.value === 1){
                        BlockStatements.push(babelt.variableDeclaration("var", [item2, item.declarations[jjj + 1]]));
                        if (itemdeclarationslen === 2){
                            path.node.body.splice(iii, 1)[0];
                        }else{
                            path.node.body[iii].declarations.splice(jjj, 2);
                            iii--;
                        }
                        flag = true;
                        break;
                    }
                }
                if (flag){
                    // 接下来可以认为一定是存在混淆的块
                    let jjj = 0;
                    while(jjj < 5){
                        let item2 = path.node.body[iii + jjj];
                        if(item2 && item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.name === BlockStatements[0].declarations[1].id.name && item2.expression.right.type === 'BinaryExpression'){
                            BlockStatements.push(path.node.body.splice(iii + jjj, 1)[0]);
                            iii = iii + jjj;
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === BlockStatements[0].declarations[0].id.name){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            let varnumber = 0;
                            let varidname = '';
                            while (true){
                                if (item2.type === 'VariableDeclaration'){
                                    varnumber = iii;
                                    iii++;
                                    let item3 = JSON.parse(JSON.stringify(item2));
                                    let item4 = JSON.parse(JSON.stringify(item2));
                                    item4.declarations.forEach(function(item5, index5){
                                        if(item5.init.type === 'StringLiteral' && item5.init.value === ""){
                                            varidname = item5.id.name;
                                            item3.declarations = [item5];
                                        }
                                    });
                                    if (item3.declarations[0].init.type === 'StringLiteral' && item3.declarations[0].init.value === ""){
                                        BlockStatements.push(item3);
                                        break;
                                    }else{
                                        iii++;
                                        item2 = path.node.body[iii];
                                    }
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === BlockStatements[0].declarations[0].id.name){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                    if(!item2){
                                        iii = varnumber + 1;
                                        break;
                                    }
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === BlockStatements[0].declarations[1].id.name){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.type === 'ForStatement' && item2.body.body[0].expression && item2.body.body[0].expression.type === 'AssignmentExpression' && item2.body.body[0].expression.left.name === varidname){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                    if(!item2){
                                        iii = varnumber + 1;
                                        break;
                                    }
                                }
                            }
                            let asttemp = parser.parse("");
                            asttemp.program.body = BlockStatements;
                            code = generator.default(asttemp).code;
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === BlockStatements[0].declarations[1].id.name){
                                    path.node.body.splice(iii, 1);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            asttemp = parser.parse("");
                            asttemp.program.body = BlockStatements;
                            code = generator.default(asttemp).code;
                            eval(topcode + code);
                            path.node.body[varnumber].declarations.forEach(function (item3, index3) {
                                if(item3.id.name === varidname){
                                    item3.init = babelt.stringLiteral(eval(varidname));
                                }
                            });
                            iii = 0;
                        }else if(item2 && item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.name === BlockStatements[0].declarations[1].id.name && item2.expression.right.name === BlockStatements[0].declarations[0].id.name){
                            BlockStatements.push(path.node.body.splice(iii + jjj, 1)[0]);
                            iii = iii + jjj;
                            item2 = path.node.body[iii];
                            let tempnumber = iii;
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === BlockStatements[0].declarations[0].id.name && item2.expression.right.type === 'NumericLiteral' && item2.expression.right.value === 1){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                    if(!item2){
                                        iii = tempnumber;
                                        break;
                                    }
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.type === 'Identifier' && item2.expression.left.name === BlockStatements[0].declarations[0].id.name){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            let varnumber = 0;
                            let varidname = "";
                            while (true){
                                if (item2.type === 'VariableDeclaration' && item2.declarations[0].init && item2.declarations[0].init.type === 'ArrayExpression'){
                                    varnumber = iii;
                                    varidname = item2.declarations[0].id.name;
                                    BlockStatements.push(item2);
                                    iii++;
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.right.name === BlockStatements[0].declarations[1].id.name && item2.expression.left.name === BlockStatements[0].declarations[0].id.name){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.name === BlockStatements[0].declarations[1].id.name){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.type === 'ForStatement'){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            item2 = path.node.body[iii];
                            while (true){
                                if (item2.expression && item2.expression.type === 'AssignmentExpression' && item2.expression.left.name === BlockStatements[0].declarations[1].id.name){
                                    BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                                    break;
                                }else {
                                    iii++;
                                    item2 = path.node.body[iii];
                                }
                            }
                            let asttemp = parser.parse("");
                            asttemp.program.body = BlockStatements;
                            code = generator.default(asttemp).code;
                            eval(topcode + code);
                            let arrayexpression = [];
                            eval(varidname).forEach(function (item3, index3) {
                                arrayexpression.push(babelt.stringLiteral(item3))
                            });
                            path.node.body[varnumber].declarations[0].init = babelt.arrayExpression(arrayexpression);
                            iii = 0;
                        }
                        jjj++;
                    }
                }
            }
            iii++;
        }
    }
});

// var aC = N,
//     aD = "",
//     aE = "n\xA6\x96\x8A\xA4\x92\x9F\xD6\xB3\x96\xAC\xBD\x89\x89\x85[\xA0\xABg",
//     aF = $(aE.d(0) - aE.length);
//
// for (var aG = 1; aG < aE.length; aG++) {
//     aF += $(aE.d(aG) - aF.d(aG - 1));
// }

// 应该被还原为
// var aF = "[KK?e-rdOGeX1X-.r9.";
// 字符串混淆
traverse(ast, {
    VariableDeclarator(path){
        if(path.node.init){
            if(path.node.init.type === 'StringLiteral' && path.node.init.value !== ''){
                let bindings = path.scope.getBinding(path.node.id.name);
                if(bindings && bindings.referencePaths.length === 4 && bindings.referencePaths[0].parentPath.parent.type === 'CallExpression'){
                    let code = "var " + path.toString() + ';';
                    code += "var " + bindings.referencePaths[0].parentPath.parentPath.parentPath.parentPath.parentPath.toString() + ';';
                    code += bindings.referencePaths[2].parentPath.parentPath.parentPath.toString();
                    let idname = bindings.referencePaths[0].parentPath.parentPath.parentPath.parentPath.parent.id.name;
                    if(bindings.referencePaths[0].parentPath.parentPath.parentPath.parentPath.parentPath.parent.declarations.length === 1){
                        bindings.referencePaths[0].parentPath.parentPath.parentPath.parentPath.parentPath.parentPath.remove()
                    }else{
                        bindings.referencePaths[0].parentPath.parentPath.parentPath.parentPath.parentPath.remove()
                    }
                    bindings.referencePaths[2].parentPath.parentPath.parentPath.remove();
                    eval(topcode + code);
                    path.node.id.name = idname;
                    path.node.init = babelt.stringLiteral(eval(idname));
                }
            }
        }
    }
});

// 回填上面反混淆的字符串
ast = parser.parse(generator.default(ast).code);
traverse(ast, {
    VariableDeclarator(path){
        if(path.node.init){
            if(path.node.init.type === 'StringLiteral' && path.node.init.value !== ''){
                let bindings = path.scope.getBinding(path.node.id.name);
                if(bindings && bindings.constantViolations.length === 0 && bindings.referencePaths.length === 1){
                    bindings.referencePaths[0].replaceWith(babelt.stringLiteral(path.node.init.value));
                    if(path.parent.declarations.length === 1){
                        path.parentPath.remove()
                    }else{
                        path.remove()
                    }
                }
            }else if(path.node.init.type === 'ArrayExpression' && path.node.init.elements.length !== 0){
                let bindings = path.scope.getBinding(path.node.id.name);
                let flag = true;
                path.node.init.elements.forEach(function (item, index) {
                    if (item.type !== 'StringLiteral'){
                        flag = false;
                    }
                });
                if(flag && bindings && bindings.constantViolations.length === 0 && bindings.referencePaths.length === 1){
                    bindings.referencePaths[0].replaceWith(path.node.init);
                    if(path.parent.declarations.length === 1){
                        path.parentPath.remove()
                    }else{
                        path.remove()
                    }
                }
            }else if(path.node.init.type === 'CallExpression' && path.node.init.callee.type === 'MemberExpression' && path.node.init.callee.property.type === 'Identifier' && path.node.init.callee.property.name === 'j' && path.node.init.arguments.length === 1){
                let tempstr = "";
                path.node.init.callee.object.elements.forEach(function (item, index) {
                    tempstr += item.value;
                });
                path.node.init = babelt.stringLiteral(tempstr);
            }
        }
    }
});


// 长代码块字符串混淆
traverse(ast, {
    BlockStatement(path){
        let iii = 0;
        while (iii < path.node.body.length){
            let item = path.node.body[iii];
            if(item.type === 'VariableDeclaration' && item.declarations.length === 11){
                let BlockStatements = [];
                let flag = false;
                for (let jjj = 0; jjj < item.declarations.length; jjj++) {
                    if(item.declarations[jjj].init && item.declarations[jjj].init.type === 'StringLiteral' && item.declarations[jjj + 1] && item.declarations[jjj + 1].init && item.declarations[jjj + 1].init.type === 'FunctionExpression' && item.declarations[jjj + 2] && item.declarations[jjj + 2].init.type === 'StringLiteral'){
                        flag = true;
                        if (item.declarations.length === 11){
                            BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                        }else{
                            BlockStatements.push(babelt.variableDeclaration("var", item.declarations.splice(jjj, 11)));
                            iii++;
                        }
                        break;
                    }
                }
                if(flag){
                    item = path.node.body[iii];
                    while (true){
                        if (item.expression && item.expression.type === 'AssignmentExpression' && item.expression.left.name === BlockStatements[0].declarations[10].id.name){
                            BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                            break;
                        }else {
                            iii++;
                            item = path.node.body[iii];
                        }
                    }
                    item = path.node.body[iii];
                    while (true){
                        if (item.expression && item.expression.type === 'AssignmentExpression' && item.expression.left.name === BlockStatements[0].declarations[4].id.name){
                            BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                            break;
                        }else {
                            iii++;
                            item = path.node.body[iii];
                        }
                    }
                    item = path.node.body[iii];
                    while (true){
                        if (item.type === 'ForStatement'){
                            BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                            break;
                        }else {
                            iii++;
                            item = path.node.body[iii];
                        }
                    }
                    item = path.node.body[iii];
                    let varnameid = "";
                    while (true){
                        if (item.expression && item.expression.type === 'AssignmentExpression' && item.expression.left.name === BlockStatements[0].declarations[4].id.name){
                            varnameid = item.expression.left.name;
                            BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                            break;
                        }else {
                            iii++;
                            item = path.node.body[iii];
                        }
                    }
                    item = path.node.body[iii];
                    while (true){
                        if (item.type === 'ForStatement'){
                            BlockStatements.push(item);
                            break;
                        }else {
                            iii++;
                            item = path.node.body[iii];
                        }
                    }
                    let asttemp = parser.parse("");
                    asttemp.program.body = BlockStatements ;
                    code = generator.default(asttemp).code;
                    eval(topcode + code);
                    path.node.body[iii] = babelt.variableDeclaration("var", [babelt.variableDeclarator(babelt.identifier(varnameid), babelt.stringLiteral(eval(varnameid)))]);
                    iii = 0;
                }
            }
            iii++
        }
    }
});

traverse(ast, {
    BlockStatement(path) {
        let iii = 0;
        while (iii < path.node.body.length) {
            let item = path.node.body[iii];
            if(item.type === 'VariableDeclaration' && item.declarations.length === 9 && !item.declarations[0].init && item.declarations[8].init.type === 'StringLiteral'){
                let BlockStatements = [];
                BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                item = path.node.body[iii];
                while (true){
                    if (item.expression && item.expression.type === 'AssignmentExpression' && item.expression.left.name === BlockStatements[0].declarations[0].id.name){
                        BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                        break;
                    }else {
                        iii++;
                        item = path.node.body[iii];
                    }
                }
                item = path.node.body[iii];
                while (true){
                    if (item.type === 'VariableDeclaration' && item.declarations[0].init.type === 'ArrayExpression'){
                        BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                        break;
                    }else {
                        iii++;
                        item = path.node.body[iii];
                    }
                }
                item = path.node.body[iii];
                while (true){
                    if (item.type === 'ForStatement'){
                        BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                        break;
                    }else {
                        iii++;
                        item = path.node.body[iii];
                    }
                }
                item = path.node.body[iii];
                while (true){
                    if (item.expression && item.expression.type === 'AssignmentExpression' && item.expression.left.name === BlockStatements[0].declarations[2].id.name){
                        BlockStatements.push(path.node.body.splice(iii, 1)[0]);
                        break;
                    }else {
                        iii++;
                        item = path.node.body[iii];
                    }
                }
                item = path.node.body[iii];
                while (true){
                    if (item.expression && item.expression.type === 'AssignmentExpression' && item.expression.left.name === BlockStatements[0].declarations[2].id.name){
                        BlockStatements.push(...path.node.body.splice(iii, 3));
                        break;
                    }else {
                        iii++;
                        item = path.node.body[iii];
                    }
                }
                item = path.node.body[iii];
                while (true){
                    if (item.type === 'ForStatement'){
                        BlockStatements.push(...path.node.body.splice(iii, 2));
                        break;
                    }else {
                        iii++;
                        item = path.node.body[iii];
                    }
                }
                BlockStatements.push(path.node.body[iii]);
                let asttemp = parser.parse("");
                asttemp.program.body = BlockStatements ;
                let code = generator.default(asttemp).code;
                let varnameid = BlockStatements[9].declarations[0].id.name;
                eval(topcode + code);
                path.node.body[iii] = babelt.variableDeclaration("var", [babelt.variableDeclarator(babelt.identifier(varnameid), babelt.stringLiteral(eval(varnameid)))]);
            }
            iii++;
        }
    }
});

// 回填上面反混淆的字符串
ast = parser.parse(generator.default(ast).code);
traverse(ast, {
    VariableDeclarator(path){
        if(path.node.init){
            if(path.node.init.type === 'StringLiteral' && path.node.init.value !== ''){
                let bindings = path.scope.getBinding(path.node.id.name);
                if(bindings && bindings.constantViolations.length === 0 && bindings.referencePaths.length === 1){
                    bindings.referencePaths[0].replaceWith(babelt.stringLiteral(path.node.init.value));
                    if(path.parent.declarations.length === 1){
                        path.parentPath.remove()
                    }else{
                        path.remove()
                    }
                }
            }
        }
    }
});

ast = parser.parse(generator.default(ast).code);

function check_code(path1, path2){
    for (let i = 0; i < path1.parentPath.parent.body.length; i++) {
        let item = path1.parentPath.parent.body[i];
        if(item === path2.node){
            return true;
        }
    }
    return false;
}

// 尝试删除一些花指令
traverse(ast, {
    VariableDeclarator(path) {
        if (path.node.init && path.node.init.type === 'StringLiteral' && path.node.init.value === 'abcdefghijk'){
            let temppath = path.getSibling(path.key - 1);
            if (temppath.node.init && temppath.node.init.type === 'ArrayExpression'){
                let bindings = path.scope.getBinding(path.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings = path.scope.getBinding(temppath.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                if(path.parent.declarations.length === 2){
                    path.parentPath.remove()
                }else{
                    path.parent.declarations.splice(path.key - 1, 2);
                }
            }
        }else if(path.node.init && path.node.init.type === 'NumericLiteral' && path.node.init.value === 1){
            let temppath2 = path.getSibling(path.key + 1);
            let temppath3 = path.getSibling(path.key + 2);
            let temppath4 = path.getSibling(path.key + 3);
            if (temppath2.node && temppath2.node.init && temppath2.node.init.type === 'UnaryExpression' && temppath2.node.init.argument.value === 1 && temppath3.node.init && temppath3.node.init.type === 'NumericLiteral' && temppath3.node.init.value === 2 && temppath4.node.init && temppath4.node.init.type === 'NumericLiteral' && temppath4.node.init.value === 0){
                let bindings = path.scope.getBinding(temppath2.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings = path.scope.getBinding(temppath3.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings = path.scope.getBinding(temppath4.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings = path.scope.getBinding(path.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                if(path.parent.declarations.length === 4){
                    path.parentPath.remove()
                }else{
                    path.parent.declarations.splice(path.key, 4);
                }
            }
        }
        else if(path.node.init && path.node.init.type === 'ArrayExpression' && path.node.init.elements.length === 0){
            let temppath = path.getSibling(path.key + 1);
            if (temppath.node && !temppath.node.init){
                let bindings = path.scope.getBinding(path.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings = path.scope.getBinding(temppath.node.id.name);
                bindings.referencePaths.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                bindings.constantViolations.forEach(function (item, index) {
                    let tempitem = item;
                    let flag = true;
                    while (!check_code(path, tempitem)){
                        tempitem = tempitem.parentPath;
                        if(tempitem.node === null || tempitem.node.type === 'Program'){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        if (tempitem.node.type === 'VariableDeclaration'){
                            item.parentPath.remove()
                        }else{
                            tempitem.remove();
                        }
                    }
                });
                if(path.parent.declarations.length === 2){
                    path.parentPath.remove()
                }else{
                    path.parent.declarations.splice(path.key, 2);
                }
            }
        }
    }
});


code = generator.default(ast, {
    compact: false,  // 压缩格式
    comments: false,  // 注释
    jsescOption: {
        minimal: true // 转义
    }
}).code;
wtofile('bossdecrypt.js', 'w', code);
