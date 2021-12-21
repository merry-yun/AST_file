window = new Proxy(global, {
    get: function (target, key, receiver) {
        console.log("window.get", key, target[key]);
        if (target[key] instanceof Object){
            return  new Proxy(target[key], {
                get: function (_target, _key, _receiver) {
                    console.log("window.get", key, _key, _target[_key]);
                    return _target[_key];                 },
                set: function (_target, _key, _value, _receiver) {
                    console.log("window.set", key, _key, _value);
                    _target[_key] = _value;
                    }
                    })
                }
                return target[key];
            },
    set: function (target, key, value, receiver) {
        console.log("window.set", key, value);
        target[key] = value;
        }
});