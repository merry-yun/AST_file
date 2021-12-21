var mars_cid = function(b) {
    for (var a = (new Date).getTime().toString(), b, d = 0, c = a.length, g = 0; g < c; g++)
        d += parseInt(a[g]);
    console.log(a)
    console.log(d)
    for (var c = d % 32, l = 0, d = b.length, g = 0; g < d; g++)
        g !== c && (l += parseInt(b[g], 16));
    console.log(l)
    g = (l % 16).toString(16);
    console.log(g)
    console.log(b)
    console.log(c, d)
    a = a + '_' + b.substr(0, c) + g.toString() + b.substr(1 + c, d);
    return a
}

var mars_sid = '18fbc57184df569bd493e408017f22f4';
var result = mars_cid(mars_sid);
console.log(result);

