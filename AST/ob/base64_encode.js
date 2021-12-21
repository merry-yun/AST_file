function Base64(_Shumei_4479) {
    var _Shumei_367 = 192
    var _Shumei_368 = "="
    var _Shumei_369 = "=="
    var _Shumei_372 = 255
    var _Shumei_375 = 240
    var _Shumei_503 = 6
    var _Shumei_1054 = "charAt"
    var _Shumei_1059 = "charCodeAt"
    var _Shumei_1070 = 15
    var _Shumei_1085 = 63
    var _Shumei_1157 = ""
    var _Shumei_1268 = 4
    var _Shumei_1269 = 3
    var _Shumei_1276 = 2
    var _Shumei_1290 = "length"
    var _Shumei_1298 = 0
    var _Shumei_4488 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var _Shumei_1290 = "length";

    var _Shumei_4486, _Shumei_4487, _Shumei_4485;

    var _Shumei_4482, _Shumei_4483, _Shumei_4484;

    _Shumei_4485 = _Shumei_4479[_Shumei_1290];
    _Shumei_4487 = _Shumei_1298;
    _Shumei_4486 = _Shumei_1157;

    while (_Shumei_4487 < _Shumei_4485) {
        _Shumei_4482 = _Shumei_4479[_Shumei_1059](_Shumei_4487++) & _Shumei_372;

        if (_Shumei_4487 == _Shumei_4485) {
            _Shumei_4486 += _Shumei_4488[_Shumei_1054](_Shumei_4482 >> _Shumei_1276);
            _Shumei_4486 += _Shumei_4488[_Shumei_1054]((_Shumei_4482 & _Shumei_1269) << _Shumei_1268);
            _Shumei_4486 += _Shumei_369;
            break;
        }

        _Shumei_4483 = _Shumei_4479[_Shumei_1059](_Shumei_4487++);

        if (_Shumei_4487 == _Shumei_4485) {
            _Shumei_4486 += _Shumei_4488[_Shumei_1054](_Shumei_4482 >> _Shumei_1276);
            _Shumei_4486 += _Shumei_4488[_Shumei_1054]((_Shumei_4482 & _Shumei_1269) << _Shumei_1268 | (_Shumei_4483 & _Shumei_375) >> _Shumei_1268);
            _Shumei_4486 += _Shumei_4488[_Shumei_1054]((_Shumei_4483 & _Shumei_1070) << _Shumei_1276);
            _Shumei_4486 += _Shumei_368;
            break;
        }

        _Shumei_4484 = _Shumei_4479[_Shumei_1059](_Shumei_4487++);
        _Shumei_4486 += _Shumei_4488[_Shumei_1054](_Shumei_4482 >> _Shumei_1276);
        _Shumei_4486 += _Shumei_4488[_Shumei_1054]((_Shumei_4482 & _Shumei_1269) << _Shumei_1268 | (_Shumei_4483 & _Shumei_375) >> _Shumei_1268);
        _Shumei_4486 += _Shumei_4488[_Shumei_1054]((_Shumei_4483 & _Shumei_1070) << _Shumei_1276 | (_Shumei_4484 & _Shumei_367) >> _Shumei_503);
        _Shumei_4486 += _Shumei_4488[_Shumei_1054](_Shumei_4484 & _Shumei_1085);
    }

    return _Shumei_4486;
} // 转为base64

result = Base64("123!#@$#%#^%^")
console.log(result)

const { base64encode, base64decode } = require('nodejs-base64');

let encoded = base64encode("123!#@$#%#^%^");
console.log(encoded)