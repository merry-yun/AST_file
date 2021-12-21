
const params = require('minimist')(process.argv.slice(2))
delete params['_']

var CryptoJS = require("crypto-js");
var vipParamsEncrypt = {
    data: {
        secret: {
            "3c5ad16dbc06cd16ae1fd3344d87f16b": "U2FsdGVkX1/f3zYuiRoYm9vb5Z9R2sDcnm/4rC23IgvW9E8as+kKYw1cSmpBB0eFUycxirbwr17ynjGWr7QAyg=="
        },
        aes: {
            secret: "qyrohlf5sjazleru"
        }
    },
    encrypt: function(skey, params, pc_eversion) {
        var _this = this;
        if (!skey || !params)
            return;
        if (typeof params === "object") {
            var arr = [];
            for (var i in params) {
                if (params[i] === undefined || params[i] === null)
                    params[i] = "";
                arr.push(i + "=" + params[i])
            }
            params = arr.join("&")
        }
        var iv = CryptoJS.lib.WordArray.random(16);
        var secret = _this.data.secret[skey] ? _this.data.secret[skey] : "";
        secret = _this.aesDecrypt(secret, _this.data.aes.secret);
        var key = CryptoJS.MD5(secret);
        var encrypted = CryptoJS.AES.encrypt(params, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var output = CryptoJS.lib.WordArray.create(iv.words.slice(0));
        output.concat(encrypted.ciphertext);
        var edata = output.toString(CryptoJS.enc.Base64);
        return edata
    },
    aesEncrypt: function(msg, secret) {
        return CryptoJS.AES.encrypt(msg, secret).toString()
    },
    aesDecrypt: function(msg, secret) {
        var bytes = CryptoJS.AES.decrypt(msg, secret);
        return bytes.toString(CryptoJS.enc.Utf8)
    }
};

skey = "3c5ad16dbc06cd16ae1fd3344d87f16b"
//console.log(params)
console.log(vipParamsEncrypt.encrypt(skey, params))