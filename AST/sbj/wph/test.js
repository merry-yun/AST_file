
const args = require('minimist')(process.argv.slice(2))
delete args['_']

function r(e) {
    if (e < 0 || 53 < e)
        return NaN;
    var t = 0 | 1073741824 * Math.random();
    return 30 < e ? t + 1073741824 * (0 | Math.random() * (1 << e - 30)) : t >>> 30 - e
}

function a(e, t) {
    for (var i = e.toString(16), n = t - i.length, r = "0"; 0 < n; n >>>= 1,
    r += r)
        1 & n && (i = r + i);
    return i
}

function o() {
    return a(r(32), 8) + "-" + a(r(16), 4) + "-" + a(16384 | r(12), 4) + "-" + a(32768 | r(14), 4) + "-" + a(r(48), 12)
}
let result = o();
console.log(result)