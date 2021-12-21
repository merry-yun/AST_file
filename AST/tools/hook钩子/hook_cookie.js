var code = function(){
    var org = document.cookie.__lookupSetter__('cookie');
    document.__defineSetter__("cookie",function(cookie){
        if(cookie.indexOf('shshshfpa')>-1){
            debugger;
        }
        org = cookie;
    });
    document.__defineGetter__("cookie",function(){return org;});
}
var script = document.createElement('script');
script.textContent = '(' + code + ')()';
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);