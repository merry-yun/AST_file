//navigator = {};
//location = {};
proxy = function (object_) {
    return new Proxy(object_, {
        get(target, property, receiver){
            console.log('GET', target.constructor.name, property, target[property]);
            return target['property'];
    }
    })
};

(() => {
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const myToString = function () {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };
    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        })
    }

    delete Function.prototype['toString'];

    set_native(Function.prototype, myToString);
    set_native(Function.prototype.toString, myFunction_toString_symbol);
    safeFunction = (func) => {
        set_native(func, myFunction_toString_symbol);
    };
}).call();
//
////疯狂补环境中
//// Window
//Window = function Window() {
//}
//safeFunction(Window)
//Object.defineProperties(Window.prototype, {
//    [Symbol.toString]: {
//        value: "Window",
//        configurable: true
//    }
//});
window = self = global;
//window.__proto__ = Window.prototype;
//window = proxy(window);
//
//HTMLDocument = function HTMLDocument() {
//}
//safeFunction(HTMLDocument)
//Object.defineProperties(HTMLDocument.prototype, {
//    [Symbol.toString]: {
//        value: "HTMLDocument",
//        configurable: true
//    }
//});
document = {};
//document.__proto__ = HTMLDocument.prototype;
//document = proxy(document);
//document.scripts = function HTMLCollection() {
//
//}

//navigator = proxy(navigator);
//location = proxy(location);
//document = proxy(document);