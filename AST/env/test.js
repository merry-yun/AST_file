window = global;
navigator = {};
document = {};
navigator.vendor = "";
navigator.appName = "Netscape";
navigator.plugins = [];
navigator.platform = "Win32";
navigator.webdriver = false;
webkitURL = function (){};
WebAssembly = {};
window.toString = function(){return "[object Window]"};
navigator.oscpu = "Windows NT 6.1; Win64; x64";
navigator.language = "zh-CN";
window.outerWidth = 1936;
window.outerHeight = 1056;
window.WebGLRenderingContext = function (){};

window.constructor = {};
window.constructor.toString = function(){return "function Window() {\n   [native code]\n}"};

eval.toString = function(){return "function eval() {\n   [native code]\n}"};


document = {};
document.createElement = function(img)
{
   if (img === "img")
   {
      return {src:""};
   }
}
