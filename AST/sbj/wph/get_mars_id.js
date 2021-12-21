l = function l(t) {
    var e = "0123456789abcdef"
      , n = ""
      , r = 0;
    for (t = t || 32; r < t; r++)
        n += e.charAt(Math.ceil(1E8 * Math.random()) % e.length);
    return n
}

mars_cid = function() {
    for (var t = (new Date).getTime().toString(), e = l(), n = 0, r = t.length, o = 0; o < r; o++)
        n += parseInt(t[o]);
    var i = n % 32
      , u = n
      , c = e.length;
    for (o = 0; o < c; o++)
        o !== i && (u += parseInt(e[o], 16));
    var a = (u % 16).toString(16),
    s = t + "_" + e.substr(0, i) + a.toString() + e.substr(1 + i, c);
    return  s
}
console.log(mars_cid())