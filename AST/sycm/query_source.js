!(function(e, t) {
    'use strict';
    typeof module === 'object' && typeof module.exports === 'object' ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error('jQuery requires a window with a document');
        return t(e)
    }
    : t(e)
}(typeof window !== 'undefined' ? window : this, function(e, t) {
    'use strict';
    function n(e, t, n) {
        t = t || ae;
        var r;
        var i = t.createElement('script');
        if (i.text = e,
        n)
            for (r in be)
                n[r] && (i[r] = n[r]);
        t.head.appendChild(i).parentNode.removeChild(i)
    }
    function r(e) {
        return e == null ? e + '' : typeof e === 'object' || typeof e === 'function' ? pe[de.call(e)] || 'object' : typeof e
    }
    function i(e) {
        var t = !!e && 'length'in e && e.length;
        var n = r(e);
        return !me(e) && !xe(e) && (n === 'array' || t === 0 || typeof t === 'number' && t > 0 && t - 1 in e)
    }
    function o(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    function a(e, t, n) {
        return me(t) ? we.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? we.grep(e, function(e) {
            return e === t !== n
        }) : typeof t !== 'string' ? we.grep(e, function(e) {
            return fe.call(t, e) > -1 !== n
        }) : we.filter(t, e, n)
    }
    function s(e, t) {
        for (; (e = e[t]) && e.nodeType !== 1; )
            ;
        return e
    }
    function u(e) {
        var t = {};
        return we.each(e.match(Le) || [], function(e, n) {
            t[n] = !0
        }),
        t
    }
    function l(e) {
        return e
    }
    function c(e) {
        throw e
    }
    function f(e, t, n, r) {
        var i;
        try {
            e && me(i = e.promise) ? i.call(e).done(t).fail(n) : e && me(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    function p() {
        ae.removeEventListener('DOMContentLoaded', p),
        e.removeEventListener('load', p),
        we.ready()
    }
    function d(e, t) {
        return t.toUpperCase()
    }
    function h(e) {
        return e.replace(Re, 'ms-').replace(Me, d)
    }
    function g() {
        this.expando = we.expando + g.uid++
    }
    function v(e) {
        return e === 'true' || e !== 'false' && (e === 'null' ? null : e === +e + '' ? +e : Be.test(e) ? JSON.parse(e) : e)
    }
    function y(e, t, n) {
        var r;
        if (void 0 === n && e.nodeType === 1)
            if (r = 'data-' + t.replace(Fe, '-$&').toLowerCase(),
            typeof (n = e.getAttribute(r)) === 'string') {
                try {
                    n = v(n)
                } catch (e) {}
                $e.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    function m(e, t, n, r) {
        var i;
        var o;
        var a = 20;
        var s = r ? function() {
            return r.cur()
        }
        : function() {
            return we.css(e, t, '')
        }
        ;
        var u = s();
        var l = n && n[3] || (we.cssNumber[t] ? '' : 'px');
        var c = (we.cssNumber[t] || l !== 'px' && +u) && ze.exec(we.css(e, t));
        if (c && c[3] !== l) {
            for (u /= 2,
            l = l || c[3],
            c = +u || 1; a--; )
                we.style(e, t, c + l),
                (1 - o) * (1 - (o = s() / u || 0.5)) <= 0 && (a = 0),
                c /= o;
            c *= 2,
            we.style(e, t, c + l),
            n = n || []
        }
        return n && (c = +c || +u || 0,
        i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = l,
        r.start = c,
        r.end = i)),
        i
    }
    function x(e) {
        var t;
        var n = e.ownerDocument;
        var r = e.nodeName;
        var i = Ge[r];
        return i || (t = n.body.appendChild(n.createElement(r)),
        i = we.css(t, 'display'),
        t.parentNode.removeChild(t),
        i === 'none' && (i = 'block'),
        Ge[r] = i,
        i)
    }
    function b(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++)
            r = e[o],
            r.style && (n = r.style.display,
            t ? (n === 'none' && (i[o] = We.get(r, 'display') || null,
            i[o] || (r.style.display = '')),
            r.style.display === '' && Ue(r) && (i[o] = x(r))) : n !== 'none' && (i[o] = 'none',
            We.set(r, 'display', n)));
        for (o = 0; o < a; o++)
            i[o] != null && (e[o].style.display = i[o]);
        return e
    }
    function w(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || '*') : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || '*') : [],
        void 0 === t || t && o(e, t) ? we.merge([e], n) : n
    }
    function T(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            We.set(e[n], 'globalEval', !t || We.get(t[n], 'globalEval'))
    }
    function C(e, t, n, i, o) {
        for (var a, s, u, l, c, f, p = t.createDocumentFragment(), d = [], h = 0, g = e.length; h < g; h++)
            if ((a = e[h]) || a === 0)
                if (r(a) === 'object')
                    we.merge(d, a.nodeType ? [a] : a);
                else if (Ze.test(a)) {
                    for (s = s || p.appendChild(t.createElement('div')),
                    u = (Qe.exec(a) || ['', ''])[1].toLowerCase(),
                    l = Ke[u] || Ke._default,
                    s.innerHTML = l[1] + we.htmlPrefilter(a) + l[2],
                    f = l[0]; f--; )
                        s = s.lastChild;
                    we.merge(d, s.childNodes),
                    s = p.firstChild,
                    s.textContent = ''
                } else
                    d.push(t.createTextNode(a));
        for (p.textContent = '',
        h = 0; a = d[h++]; )
            if (i && we.inArray(a, i) > -1)
                o && o.push(a);
            else if (c = we.contains(a.ownerDocument, a),
            s = w(p.appendChild(a), 'script'),
            c && T(s),
            n)
                for (f = 0; a = s[f++]; )
                    Je.test(a.type || '') && n.push(a);
        return p
    }
    function E() {
        return !0
    }
    function S() {
        return !1
    }
    function k() {
        try {
            return ae.activeElement
        } catch (e) {}
    }
    function D(e, t, n, r, i, o) {
        var a, s;
        if (typeof t === 'object') {
            typeof n !== 'string' && (r = r || n,
            n = void 0);
            for (s in t)
                D(e, s, n, r, t[s], o);
            return e
        }
        if (r == null && i == null ? (i = n,
        r = n = void 0) : i == null && (typeof n === 'string' ? (i = r,
        r = void 0) : (i = r,
        r = n,
        n = void 0)),
        !1 === i)
            i = S;
        else if (!i)
            return e;
        return o === 1 && (a = i,
        i = function(e) {
            return we().off(e),
            a.apply(this, arguments)
        }
        ,
        i.guid = a.guid || (a.guid = we.guid++)),
        e.each(function() {
            we.event.add(this, t, i, r, n)
        })
    }
    function N(e, t) {
        return o(e, 'table') && o(t.nodeType !== 11 ? t : t.firstChild, 'tr') ? we(e).children('tbody')[0] || e : e
    }
    function A(e) {
        return e.type = (e.getAttribute('type') !== null) + '/' + e.type,
        e
    }
    function j(e) {
        return (e.type || '').slice(0, 5) === 'true/' ? e.type = e.type.slice(5) : e.removeAttribute('type'),
        e
    }
    function q(e, t) {
        var n, r, i, o, a, s, u, l;
        if (t.nodeType === 1) {
            if (We.hasData(e) && (o = We.access(e),
            a = We.set(t, o),
            l = o.events)) {
                delete a.handle,
                a.events = {};
                for (i in l)
                    for (n = 0,
                    r = l[i].length; n < r; n++)
                        we.event.add(t, i, l[i][n])
            }
            $e.hasData(e) && (s = $e.access(e),
            u = we.extend({}, s),
            $e.set(t, u))
        }
    }
    function L(e, t) {
        var n = t.nodeName.toLowerCase();
        n === 'input' && Ye.test(e.type) ? t.checked = e.checked : n !== 'input' && n !== 'textarea' || (t.defaultValue = e.defaultValue)
    }
    function H(e, t, r, i) {
        t = le.apply([], t);
        var o;
        var a;
        var s;
        var u;
        var l;
        var c;
        var f = 0;
        var p = e.length;
        var d = p - 1;
        var h = t[0];
        var g = me(h);
        if (g || p > 1 && typeof h === 'string' && !ye.checkClone && at.test(h))
            return e.each(function(n) {
                var o = e.eq(n);
                g && (t[0] = h.call(this, n, o.html())),
                H(o, t, r, i)
            });
        if (p && (o = C(t, e[0].ownerDocument, !1, e, i),
        a = o.firstChild,
        o.childNodes.length === 1 && (o = a),
        a || i)) {
            for (s = we.map(w(o, 'script'), A),
            u = s.length; f < p; f++)
                l = o,
                f !== d && (l = we.clone(l, !0, !0),
                u && we.merge(s, w(l, 'script'))),
                r.call(e[f], l, f);
            if (u)
                for (c = s[s.length - 1].ownerDocument,
                we.map(s, j),
                f = 0; f < u; f++)
                    l = s[f],
                    Je.test(l.type || '') && !We.access(l, 'globalEval') && we.contains(c, l) && (l.src && (l.type || '').toLowerCase() !== 'module' ? we._evalUrl && we._evalUrl(l.src) : n(l.textContent.replace(st, ''), c, l))
        }
        return e
    }
    function O(e, t, n) {
        for (var r, i = t ? we.filter(t, e) : e, o = 0; (r = i[o]) != null; o++)
            n || r.nodeType !== 1 || we.cleanData(w(r)),
            r.parentNode && (n && we.contains(r.ownerDocument, r) && T(w(r, 'script')),
            r.parentNode.removeChild(r));
        return e
    }
    function P(e, t, n) {
        var r;
        var i;
        var o;
        var a;
        var s = e.style;
        return n = n || lt(e),
        n && (a = n.getPropertyValue(t) || n[t],
        a !== '' || we.contains(e.ownerDocument, e) || (a = we.style(e, t)),
        !ye.pixelBoxStyles() && ut.test(a) && ct.test(t) && (r = s.width,
        i = s.minWidth,
        o = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = a,
        a = n.width,
        s.width = r,
        s.minWidth = i,
        s.maxWidth = o)),
        void 0 !== a ? a + '' : a
    }
    function R(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    function M(e) {
        if (e in vt)
            return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = gt.length; n--; )
            if ((e = gt[n] + t)in vt)
                return e
    }
    function I(e) {
        var t = we.cssProps[e];
        return t || (t = we.cssProps[e] = M(e) || e),
        t
    }
    function W(e, t, n) {
        var r = ze.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t
    }
    function $(e, t, n, r, i, o) {
        var a = t === 'width' ? 1 : 0;
        var s = 0;
        var u = 0;
        if (n === (r ? 'border' : 'content'))
            return 0;
        for (; a < 4; a += 2)
            n === 'margin' && (u += we.css(e, n + Xe[a], !0, i)),
            r ? (n === 'content' && (u -= we.css(e, 'padding' + Xe[a], !0, i)),
            n !== 'margin' && (u -= we.css(e, 'border' + Xe[a] + 'Width', !0, i))) : (u += we.css(e, 'padding' + Xe[a], !0, i),
            n !== 'padding' ? u += we.css(e, 'border' + Xe[a] + 'Width', !0, i) : s += we.css(e, 'border' + Xe[a] + 'Width', !0, i));
        return !r && o >= 0 && (u += Math.max(0, Math.ceil(e['offset' + t[0].toUpperCase() + t.slice(1)] - o - u - s - 0.5))),
        u
    }
    function B(e, t, n) {
        var r = lt(e);
        var i = P(e, t, r);
        var o = we.css(e, 'boxSizing', !1, r) === 'border-box';
        var a = o;
        if (ut.test(i)) {
            if (!n)
                return i;
            i = 'auto'
        }
        return a = a && (ye.boxSizingReliable() || i === e.style[t]),
        (i === 'auto' || !parseFloat(i) && we.css(e, 'display', !1, r) === 'inline') && (i = e['offset' + t[0].toUpperCase() + t.slice(1)],
        a = !0),
        (i = parseFloat(i) || 0) + $(e, t, n || (o ? 'border' : 'content'), a, r, i) + 'px'
    }
    function F(e, t, n, r, i) {
        return new F.prototype.init(e,t,n,r,i)
    }
    function _() {
        mt && (!1 === ae.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(_) : e.setTimeout(_, we.fx.interval),
        we.fx.tick())
    }
    function z() {
        return e.setTimeout(function() {
            yt = void 0
        }),
        yt = Date.now()
    }
    function X(e, t) {
        var n;
        var r = 0;
        var i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            n = Xe[r],
            i['margin' + n] = i['padding' + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function U(e, t, n) {
        for (var r, i = (Y.tweeners[t] || []).concat(Y.tweeners['*']), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function V(e, t, n) {
        var r;
        var i;
        var o;
        var a;
        var s;
        var u;
        var l;
        var c;
        var f = 'width'in t || 'height'in t;
        var p = this;
        var d = {};
        var h = e.style;
        var g = e.nodeType && Ue(e);
        var v = We.get(e, 'fxshow');
        n.queue || (a = we._queueHooks(e, 'fx'),
        a.unqueued == null && (a.unqueued = 0,
        s = a.empty.fire,
        a.empty.fire = function() {
            a.unqueued || s()
        }
        ),
        a.unqueued++,
        p.always(function() {
            p.always(function() {
                a.unqueued--,
                we.queue(e, 'fx').length || a.empty.fire()
            })
        }));
        for (r in t)
            if (i = t[r],
            xt.test(i)) {
                if (delete t[r],
                o = o || i === 'toggle',
                i === (g ? 'hide' : 'show')) {
                    if (i !== 'show' || !v || void 0 === v[r])
                        continue;
                    g = !0
                }
                d[r] = v && v[r] || we.style(e, r)
            }
        if ((u = !we.isEmptyObject(t)) || !we.isEmptyObject(d)) {
            f && e.nodeType === 1 && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
            l = v && v.display,
            l == null && (l = We.get(e, 'display')),
            c = we.css(e, 'display'),
            c === 'none' && (l ? c = l : (b([e], !0),
            l = e.style.display || l,
            c = we.css(e, 'display'),
            b([e]))),
            (c === 'inline' || c === 'inline-block' && l != null) && we.css(e, 'float') === 'none' && (u || (p.done(function() {
                h.display = l
            }),
            l == null && (c = h.display,
            l = c === 'none' ? '' : c)),
            h.display = 'inline-block')),
            n.overflow && (h.overflow = 'hidden',
            p.always(function() {
                h.overflow = n.overflow[0],
                h.overflowX = n.overflow[1],
                h.overflowY = n.overflow[2]
            })),
            u = !1;
            for (r in d)
                u || (v ? 'hidden'in v && (g = v.hidden) : v = We.access(e, 'fxshow', {
                    display: l
                }),
                o && (v.hidden = !g),
                g && b([e], !0),
                p.done(function() {
                    g || b([e]),
                    We.remove(e, 'fxshow');
                    for (r in d)
                        we.style(e, r, d[r])
                })),
                u = U(g ? v[r] : 0, r, p),
                r in v || (v[r] = u.start,
                g && (u.end = u.start,
                u.start = 0))
        }
    }
    function G(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = h(n),
            i = t[r],
            o = e[n],
            Array.isArray(o) && (i = o[1],
            o = e[n] = o[0]),
            n !== r && (e[r] = o,
            delete e[n]),
            (a = we.cssHooks[r]) && 'expand'in a) {
                o = a.expand(o),
                delete e[r];
                for (n in o)
                    n in e || (e[n] = o[n],
                    t[n] = i)
            } else
                t[r] = i
    }
    function Y(e, t, n) {
        var r;
        var i;
        var o = 0;
        var a = Y.prefilters.length;
        var s = we.Deferred().always(function() {
            delete u.elem
        });
        var u = function() {
            if (i)
                return !1;
            for (var t = yt || z(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; a < u; a++)
                l.tweens[a].run(o);
            return s.notifyWith(e, [l, o, n]),
            o < 1 && u ? n : (u || s.notifyWith(e, [l, 1, 0]),
            s.resolveWith(e, [l]),
            !1)
        };
        var l = s.promise({
            elem: e,
            props: we.extend({}, t),
            opts: we.extend(!0, {
                specialEasing: {},
                easing: we.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: yt || z(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = we.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0;
                var r = t ? l.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; n < r; n++)
                    l.tweens[n].run(1);
                return t ? (s.notifyWith(e, [l, 1, 0]),
                s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]),
                this
            }
        });
        var c = l.props;
        for (G(c, l.opts.specialEasing); o < a; o++)
            if (r = Y.prefilters[o].call(l, e, c, l.opts))
                return me(r.stop) && (we._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)),
                r;
        return we.map(c, U, l),
        me(l.opts.start) && l.opts.start.call(e, l),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
        we.fx.timer(we.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })),
        l
    }
    function Q(e) {
        return (e.match(Le) || []).join(' ')
    }
    function J(e) {
        return e.getAttribute && e.getAttribute('class') || ''
    }
    function K(e) {
        return Array.isArray(e) ? e : typeof e === 'string' ? e.match(Le) || [] : []
    }
    function Z(e, t, n, i) {
        var o;
        if (Array.isArray(t))
            we.each(t, function(t, r) {
                n || qt.test(e) ? i(e, r) : Z(e + '[' + (typeof r === 'object' && r != null ? t : '') + ']', r, n, i)
            });
        else if (n || r(t) !== 'object')
            i(e, t);
        else
            for (o in t)
                Z(e + '[' + o + ']', t[o], n, i)
    }
    function ee(e) {
        return function(t, n) {
            typeof t !== 'string' && (n = t,
            t = '*');
            var r;
            var i = 0;
            var o = t.toLowerCase().match(Le) || [];
            if (me(n))
                for (; r = o[i++]; )
                    r[0] === '+' ? (r = r.slice(1) || '*',
                    (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function te(e, t, n, r) {
        function i(s) {
            var u;
            return o[s] = !0,
            we.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return typeof l !== 'string' || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l),
                i(l),
                !1)
            }),
            u
        }
        var o = {};
        var a = e === _t;
        return i(t.dataTypes[0]) || !o['*'] && i('*')
    }
    function ne(e, t) {
        var n;
        var r;
        var i = we.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && we.extend(!0, e, r),
        e
    }
    function re(e, t, n) {
        for (var r, i, o, a, s = e.contents, u = e.dataTypes; u[0] === '*'; )
            u.shift(),
            void 0 === r && (r = e.mimeType || t.getResponseHeader('Content-Type'));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0]in n)
            o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + ' ' + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        if (o)
            return o !== u[0] && u.unshift(o),
            n[o]
    }
    function ie(e, t, n, r) {
        var i;
        var o;
        var a;
        var s;
        var u;
        var l = {};
        var c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters)
                l[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o; )
            if (e.responseFields[o] && (n[e.responseFields[o]] = t),
            !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
            u = o,
            o = c.shift())
                if (o === '*')
                    o = u;
                else if (u !== '*' && u !== o) {
                    if (!(a = l[u + ' ' + o] || l['* ' + o]))
                        for (i in l)
                            if (s = i.split(' '),
                            s[1] === o && (a = l[u + ' ' + s[0]] || l['* ' + s[0]])) {
                                !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                c.unshift(s[1]));
                                break
                            }
                    if (!0 !== a)
                        if (a && e.throws)
                            t = a(t);
                        else
                            try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: 'parsererror',
                                    error: a ? e : 'No conversion from ' + u + ' to ' + o
                                }
                            }
                }
        return {
            state: 'success',
            data: t
        }
    }
    var oe = [];
    var ae = e.document;
    var se = Object.getPrototypeOf;
    var ue = oe.slice;
    var le = oe.concat;
    var ce = oe.push;
    var fe = oe.indexOf;
    var pe = {};
    var de = pe.toString;
    var he = pe.hasOwnProperty;
    var ge = he.toString;
    var ve = ge.call(Object);
    var ye = {};
    var me = function(e) {
        return typeof e === 'function' && typeof e.nodeType !== 'number'
    };
    var xe = function(e) {
        return e != null && e === e.window
    };
    var be = {
        type: !0,
        src: !0,
        noModule: !0
    };
    var we = function(e, t) {
        return new we.fn.init(e,t)
    };
    var Te = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    we.fn = we.prototype = {
        jquery: '3.3.1',
        constructor: we,
        length: 0,
        toArray: function() {
            return ue.call(this)
        },
        get: function(e) {
            return e == null ? ue.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = we.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return we.each(this, e)
        },
        map: function(e) {
            return this.pushStack(we.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(ue.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length;
            var n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ce,
        sort: oe.sort,
        splice: oe.splice
    },
    we.extend = we.fn.extend = function() {
        var e;
        var t;
        var n;
        var r;
        var i;
        var o;
        var a = arguments[0] || {};
        var s = 1;
        var u = arguments.length;
        var l = !1;
        for (typeof a === 'boolean' && (l = a,
        a = arguments[s] || {},
        s++),
        typeof a === 'object' || me(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if ((e = arguments[s]) != null)
                for (t in e)
                    n = a[t],
                    r = e[t],
                    a !== r && (l && r && (we.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1,
                    o = n && Array.isArray(n) ? n : []) : o = n && we.isPlainObject(n) ? n : {},
                    a[t] = we.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }
    ,
    we.extend({
        expando: 'jQuery' + ('3.3.1' + Math.random()).replace(/\D/g, ''),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || de.call(e) !== '[object Object]') && (!(t = se(e)) || typeof (n = he.call(t, 'constructor') && t.constructor) === 'function' && ge.call(n) === ve)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e) {
            n(e)
        },
        each: function(e, t) {
            var n;
            var r = 0;
            if (i(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++)
                    ;
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        trim: function(e) {
            return e == null ? '' : (e + '').replace(Te, '')
        },
        makeArray: function(e, t) {
            var n = t || [];
            return e != null && (i(Object(e)) ? we.merge(n, typeof e === 'string' ? [e] : e) : ce.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return t == null ? -1 : fe.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r;
            var o;
            var a = 0;
            var s = [];
            if (i(e))
                for (r = e.length; a < r; a++)
                    (o = t(e[a], a, n)) != null && s.push(o);
            else
                for (a in e)
                    (o = t(e[a], a, n)) != null && s.push(o);
            return le.apply([], s)
        },
        guid: 1,
        support: ye
    }),
    typeof Symbol === 'function' && (we.fn[Symbol.iterator] = oe[Symbol.iterator]),
    we.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function(e, t) {
        pe['[object ' + t + ']'] = t.toLowerCase()
    });
    var Ce = (function(e) {
        function t(e, t, n, r) {
            var i;
            var o;
            var a;
            var s;
            var u;
            var c;
            var p;
            var d = t && t.ownerDocument;
            var h = t ? t.nodeType : 9;
            if (n = n || [],
            typeof e !== 'string' || !e || h !== 1 && h !== 9 && h !== 11)
                return n;
            if (!r && ((t ? t.ownerDocument || t : W) !== q && j(t),
            t = t || q,
            H)) {
                if (h !== 11 && (u = ge.exec(e)))
                    if (i = u[1]) {
                        if (h === 9) {
                            if (!(a = t.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                n
                        } else if (d && (a = d.getElementById(i)) && M(t, a) && a.id === i)
                            return n.push(a),
                            n
                    } else {
                        if (u[2])
                            return Q.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((i = u[3]) && b.getElementsByClassName && t.getElementsByClassName)
                            return Q.apply(n, t.getElementsByClassName(i)),
                            n
                    }
                if (b.qsa && !z[e + ' '] && (!O || !O.test(e))) {
                    if (h !== 1)
                        d = t,
                        p = e;
                    else if (t.nodeName.toLowerCase() !== 'object') {
                        for ((s = t.getAttribute('id')) ? s = s.replace(xe, be) : t.setAttribute('id', s = I),
                        c = E(e),
                        o = c.length; o--; )
                            c[o] = '#' + s + ' ' + f(c[o]);
                        p = c.join(','),
                        d = ve.test(e) && l(t.parentNode) || t
                    }
                    if (p)
                        try {
                            return Q.apply(n, d.querySelectorAll(p)),
                            n
                        } catch (e) {} finally {
                            s === I && t.removeAttribute('id')
                        }
                }
            }
            return k(e.replace(oe, '$1'), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + ' ') > w.cacheLength && delete e[t.shift()],
                e[n + ' '] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[I] = !0,
            e
        }
        function i(e) {
            var t = q.createElement('fieldset');
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function o(e, t) {
            for (var n = e.split('|'), r = n.length; r--; )
                w.attrHandle[n[r]] = t
        }
        function a(e, t) {
            var n = t && e;
            var r = n && e.nodeType === 1 && t.nodeType === 1 && e.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                return 'form'in t ? t.parentNode && !1 === t.disabled ? 'label'in t ? 'label'in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Te(t) === e : t.disabled === e : 'label'in t && t.disabled === e
            }
        }
        function u(e) {
            return r(function(t) {
                return t = +t,
                r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--; )
                        n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function l(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        function c() {}
        function f(e) {
            for (var t = 0, n = e.length, r = ''; t < n; t++)
                r += e[t].value;
            return r
        }
        function p(e, t, n) {
            var r = t.dir;
            var i = t.next;
            var o = i || r;
            var a = n && o === 'parentNode';
            var s = B++;
            return t.first ? function(t, n, i) {
                for (; t = t[r]; )
                    if (t.nodeType === 1 || a)
                        return e(t, n, i);
                return !1
            }
            : function(t, n, u) {
                var l;
                var c;
                var f;
                var p = [$, s];
                if (u) {
                    for (; t = t[r]; )
                        if ((t.nodeType === 1 || a) && e(t, n, u))
                            return !0
                } else
                    for (; t = t[r]; )
                        if (t.nodeType === 1 || a)
                            if (f = t[I] || (t[I] = {}),
                            c = f[t.uniqueID] || (f[t.uniqueID] = {}),
                            i && i === t.nodeName.toLowerCase())
                                t = t[r] || t;
                            else {
                                if ((l = c[o]) && l[0] === $ && l[1] === s)
                                    return p[2] = l[2];
                                if (c[o] = p,
                                p[2] = e(t, n, u))
                                    return !0
                            }
                return !1
            }
        }
        function d(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--; )
                    if (!e[i](t, n, r))
                        return !1;
                return !0
            }
            : e[0]
        }
        function h(e, n, r) {
            for (var i = 0, o = n.length; i < o; i++)
                t(e, n[i], r);
            return r
        }
        function g(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = t != null; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                l && t.push(s)));
            return a
        }
        function v(e, t, n, i, o, a) {
            return i && !i[I] && (i = v(i)),
            o && !o[I] && (o = v(o, a)),
            r(function(r, a, s, u) {
                var l;
                var c;
                var f;
                var p = [];
                var d = [];
                var v = a.length;
                var y = r || h(t || '*', s.nodeType ? [s] : s, []);
                var m = !e || !r && t ? y : g(y, p, e, s, u);
                var x = n ? o || (r ? e : v || i) ? [] : a : m;
                if (n && n(m, x, s, u),
                i)
                    for (l = g(x, d),
                    i(l, [], s, u),
                    c = l.length; c--; )
                        (f = l[c]) && (x[d[c]] = !(m[d[c]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [],
                            c = x.length; c--; )
                                (f = x[c]) && l.push(m[c] = f);
                            o(null, x = [], l, u)
                        }
                        for (c = x.length; c--; )
                            (f = x[c]) && (l = o ? K(r, f) : p[c]) > -1 && (r[l] = !(a[l] = f))
                    }
                } else
                    x = g(x === a ? x.splice(v, x.length) : x),
                    o ? o(null, a, x, u) : Q.apply(a, x)
            })
        }
        function y(e) {
            for (var t, n, r, i = e.length, o = w.relative[e[0].type], a = o || w.relative[' '], s = o ? 1 : 0, u = p(function(e) {
                return e === t
            }, a, !0), l = p(function(e) {
                return K(t, e) > -1
            }, a, !0), c = [function(e, n, r) {
                var i = !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                return t = null,
                i
            }
            ]; s < i; s++)
                if (n = w.relative[e[s].type])
                    c = [p(d(c), n)];
                else {
                    if (n = w.filter[e[s].type].apply(null, e[s].matches),
                    n[I]) {
                        for (r = ++s; r < i && !w.relative[e[r].type]; r++)
                            ;
                        return v(s > 1 && d(c), s > 1 && f(e.slice(0, s - 1).concat({
                            value: e[s - 2].type === ' ' ? '*' : ''
                        })).replace(oe, '$1'), n, s < r && y(e.slice(s, r)), r < i && y(e = e.slice(r)), r < i && f(e))
                    }
                    c.push(n)
                }
            return d(c)
        }
        function m(e, n) {
            var i = n.length > 0;
            var o = e.length > 0;
            var a = function(r, a, s, u, l) {
                var c;
                var f;
                var p;
                var d = 0;
                var h = '0';
                var v = r && [];
                var y = [];
                var m = D;
                var x = r || o && w.find.TAG('*', l);
                var b = $ += m == null ? 1 : Math.random() || 0.1;
                var T = x.length;
                for (l && (D = a === q || a || l); h !== T && (c = x[h]) != null; h++) {
                    if (o && c) {
                        for (f = 0,
                        a || c.ownerDocument === q || (j(c),
                        s = !H); p = e[f++]; )
                            if (p(c, a || q, s)) {
                                u.push(c);
                                break
                            }
                        l && ($ = b)
                    }
                    i && ((c = !p && c) && d--,
                    r && v.push(c))
                }
                if (d += h,
                i && h !== d) {
                    for (f = 0; p = n[f++]; )
                        p(v, y, a, s);
                    if (r) {
                        if (d > 0)
                            for (; h--; )
                                v[h] || y[h] || (y[h] = G.call(u));
                        y = g(y)
                    }
                    Q.apply(u, y),
                    l && !r && y.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                }
                return l && ($ = b,
                D = m),
                v
            };
            return i ? r(a) : a
        }
        var x;
        var b;
        var w;
        var T;
        var C;
        var E;
        var S;
        var k;
        var D;
        var N;
        var A;
        var j;
        var q;
        var L;
        var H;
        var O;
        var P;
        var R;
        var M;
        var I = 'sizzle' + 1 * new Date();
        var W = e.document;
        var $ = 0;
        var B = 0;
        var F = n();
        var _ = n();
        var z = n();
        var X = function(e, t) {
            return e === t && (A = !0),
            0
        };
        var U = {}.hasOwnProperty;
        var V = [];
        var G = V.pop;
        var Y = V.push;
        var Q = V.push;
        var J = V.slice;
        var K = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        };
        var Z = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped';
        var ee = '[\\x20\\t\\r\\n\\f]';
        var te = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+';
        var ne = '\\[' + ee + '*(' + te + ')(?:' + ee + '*([*^$|!~]?=)' + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + te + '))|)' + ee + '*\\]';
        var re = ':(' + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ne + ')*)|.*)\\)|)';
        var ie = new RegExp(ee + '+','g');
        var oe = new RegExp('^' + ee + '+|((?:^|[^\\\\])(?:\\\\.)*)' + ee + '+$','g');
        var ae = new RegExp('^' + ee + '*,' + ee + '*');
        var se = new RegExp('^' + ee + '*([>+~]|' + ee + ')' + ee + '*');
        var ue = new RegExp('=' + ee + "*([^\\]'\"]*?)" + ee + '*\\]','g');
        var le = new RegExp(re);
        var ce = new RegExp('^' + te + '$');
        var fe = {
            ID: new RegExp('^#(' + te + ')'),
            CLASS: new RegExp('^\\.(' + te + ')'),
            TAG: new RegExp('^(' + te + '|[*])'),
            ATTR: new RegExp('^' + ne),
            PSEUDO: new RegExp('^' + re),
            CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + ee + '*(even|odd|(([+-]|)(\\d*)n|)' + ee + '*(?:([+-]|)' + ee + '*(\\d+)|))' + ee + '*\\)|)','i'),
            bool: new RegExp('^(?:' + Z + ')$','i'),
            needsContext: new RegExp('^' + ee + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + ee + '*((?:-\\d)?\\d*)' + ee + '*\\)|)(?=[^-]|$)','i')
        };
        var pe = /^(?:input|select|textarea|button)$/i;
        var de = /^h\d$/i;
        var he = /^[^{]+\{\s*\[native \w/;
        var ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
        var ve = /[+~]/;
        var ye = new RegExp('\\\\([\\da-f]{1,6}' + ee + '?|(' + ee + ')|.)','ig');
        var me = function(e, t, n) {
            var r = '0x' + t - 65536;
            return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        };
        var xe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g;
        var be = function(e, t) {
            return t ? e === '\0' ? '�' : e.slice(0, -1) + '\\' + e.charCodeAt(e.length - 1).toString(16) + ' ' : '\\' + e
        };
        var we = function() {
            j()
        };
        var Te = p(function(e) {
            return !0 === e.disabled && ('form'in e || 'label'in e)
        }, {
            dir: 'parentNode',
            next: 'legend'
        });
        try {
            Q.apply(V = J.call(W.childNodes), W.childNodes),
            V[W.childNodes.length].nodeType
        } catch (e) {
            Q = {
                apply: V.length ? function(e, t) {
                    Y.apply(e, J.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        b = t.support = {},
        C = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && t.nodeName !== 'HTML'
        }
        ,
        j = t.setDocument = function(e) {
            var t;
            var n;
            var r = e ? e.ownerDocument || e : W;
            return r !== q && r.nodeType === 9 && r.documentElement ? (q = r,
            L = q.documentElement,
            H = !C(q),
            W !== q && (n = q.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener('unload', we, !1) : n.attachEvent && n.attachEvent('onunload', we)),
            b.attributes = i(function(e) {
                return e.className = 'i',
                !e.getAttribute('className')
            }),
            b.getElementsByTagName = i(function(e) {
                return e.appendChild(q.createComment('')),
                !e.getElementsByTagName('*').length
            }),
            b.getElementsByClassName = he.test(q.getElementsByClassName),
            b.getById = i(function(e) {
                return L.appendChild(e).id = I,
                !q.getElementsByName || !q.getElementsByName(I).length
            }),
            b.getById ? (w.filter.ID = function(e) {
                var t = e.replace(ye, me);
                return function(e) {
                    return e.getAttribute('id') === t
                }
            }
            ,
            w.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && H) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (w.filter.ID = function(e) {
                var t = e.replace(ye, me);
                return function(e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode('id');
                    return n && n.value === t
                }
            }
            ,
            w.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && H) {
                    var n;
                    var r;
                    var i;
                    var o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode('id')) && n.value === e)
                            return [o];
                        for (i = t.getElementsByName(e),
                        r = 0; o = i[r++]; )
                            if ((n = o.getAttributeNode('id')) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }
            ),
            w.find.TAG = b.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : b.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n;
                var r = [];
                var i = 0;
                var o = t.getElementsByTagName(e);
                if (e === '*') {
                    for (; n = o[i++]; )
                        n.nodeType === 1 && r.push(n);
                    return r
                }
                return o
            }
            ,
            w.find.CLASS = b.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && H)
                    return t.getElementsByClassName(e)
            }
            ,
            P = [],
            O = [],
            (b.qsa = he.test(q.querySelectorAll)) && (i(function(e) {
                L.appendChild(e).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && O.push('[*^$]=' + ee + "*(?:''|\"\")"),
                e.querySelectorAll('[selected]').length || O.push('\\[' + ee + '*(?:value|' + Z + ')'),
                e.querySelectorAll('[id~=' + I + '-]').length || O.push('~='),
                e.querySelectorAll(':checked').length || O.push(':checked'),
                e.querySelectorAll('a#' + I + '+*').length || O.push('.#.+[+~]')
            }),
            i(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = q.createElement('input');
                t.setAttribute('type', 'hidden'),
                e.appendChild(t).setAttribute('name', 'D'),
                e.querySelectorAll('[name=d]').length && O.push('name' + ee + '*[*^$|!~]?='),
                e.querySelectorAll(':enabled').length !== 2 && O.push(':enabled', ':disabled'),
                L.appendChild(e).disabled = !0,
                e.querySelectorAll(':disabled').length !== 2 && O.push(':enabled', ':disabled'),
                e.querySelectorAll('*,:x'),
                O.push(',.*:')
            })),
            (b.matchesSelector = he.test(R = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function(e) {
                b.disconnectedMatch = R.call(e, '*'),
                R.call(e, "[s!='']:x"),
                P.push('!=', re)
            }),
            O = O.length && new RegExp(O.join('|')),
            P = P.length && new RegExp(P.join('|')),
            t = he.test(L.compareDocumentPosition),
            M = t || he.test(L.contains) ? function(e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e;
                var r = t && t.parentNode;
                return e === r || !(!r || r.nodeType !== 1 || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            X = t ? function(e, t) {
                if (e === t)
                    return A = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                1 & n || !b.sortDetached && t.compareDocumentPosition(e) === n ? e === q || e.ownerDocument === W && M(W, e) ? -1 : t === q || t.ownerDocument === W && M(W, t) ? 1 : N ? K(N, e) - K(N, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return A = !0,
                    0;
                var n;
                var r = 0;
                var i = e.parentNode;
                var o = t.parentNode;
                var s = [e];
                var u = [t];
                if (!i || !o)
                    return e === q ? -1 : t === q ? 1 : i ? -1 : o ? 1 : N ? K(N, e) - K(N, t) : 0;
                if (i === o)
                    return a(e, t);
                for (n = e; n = n.parentNode; )
                    s.unshift(n);
                for (n = t; n = n.parentNode; )
                    u.unshift(n);
                for (; s[r] === u[r]; )
                    r++;
                return r ? a(s[r], u[r]) : s[r] === W ? -1 : u[r] === W ? 1 : 0
            }
            ,
            q) : q
        }
        ,
        t.matches = function(e, n) {
            return t(e, null, null, n)
        }
        ,
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== q && j(e),
            n = n.replace(ue, "='$1']"),
            b.matchesSelector && H && !z[n + ' '] && (!P || !P.test(n)) && (!O || !O.test(n)))
                try {
                    var r = R.call(e, n);
                    if (r || b.disconnectedMatch || e.document && e.document.nodeType !== 11)
                        return r
                } catch (e) {}
            return t(n, q, null, [e]).length > 0
        }
        ,
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== q && j(e),
            M(e, t)
        }
        ,
        t.attr = function(e, t) {
            (e.ownerDocument || e) !== q && j(e);
            var n = w.attrHandle[t.toLowerCase()];
            var r = n && U.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
            return void 0 !== r ? r : b.attributes || !H ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }
        ,
        t.escape = function(e) {
            return (e + '').replace(xe, be)
        }
        ,
        t.error = function(e) {
            throw new Error('Syntax error, unrecognized expression: ' + e)
        }
        ,
        t.uniqueSort = function(e) {
            var t;
            var n = [];
            var r = 0;
            var i = 0;
            if (A = !b.detectDuplicates,
            N = !b.sortStable && e.slice(0),
            e.sort(X),
            A) {
                for (; t = e[i++]; )
                    t === e[i] && (r = n.push(i));
                for (; r--; )
                    e.splice(n[r], 1)
            }
            return N = null,
            e
        }
        ,
        T = t.getText = function(e) {
            var t;
            var n = '';
            var r = 0;
            var i = e.nodeType;
            if (i) {
                if (i === 1 || i === 9 || i === 11) {
                    if (typeof e.textContent === 'string')
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += T(e)
                } else if (i === 3 || i === 4)
                    return e.nodeValue
            } else
                for (; t = e[r++]; )
                    n += T(t);
            return n
        }
        ,
        w = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                '>': {
                    dir: 'parentNode',
                    first: !0
                },
                ' ': {
                    dir: 'parentNode'
                },
                '+': {
                    dir: 'previousSibling',
                    first: !0
                },
                '~': {
                    dir: 'previousSibling'
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(ye, me),
                    e[3] = (e[3] || e[4] || e[5] || '').replace(ye, me),
                    e[2] === '~=' && (e[3] = ' ' + e[3] + ' '),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    e[1].slice(0, 3) === 'nth' ? (e[3] || t.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === 'even' || e[3] === 'odd')),
                    e[5] = +(e[7] + e[8] || e[3] === 'odd')) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t;
                    var n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || '' : n && le.test(n) && (t = E(n, !0)) && (t = n.indexOf(')', n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(ye, me).toLowerCase();
                    return e === '*' ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = F[e + ' '];
                    return t || (t = new RegExp('(^|' + ee + ')' + e + '(' + ee + '|$)')) && F(e, function(e) {
                        return t.test(typeof e.className === 'string' && e.className || void 0 !== e.getAttribute && e.getAttribute('class') || '')
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return o == null ? n === '!=' : !n || (o += '',
                        n === '=' ? o === r : n === '!=' ? o !== r : n === '^=' ? r && o.indexOf(r) === 0 : n === '*=' ? r && o.indexOf(r) > -1 : n === '$=' ? r && o.slice(-r.length) === r : n === '~=' ? (' ' + o.replace(ie, ' ') + ' ').indexOf(r) > -1 : n === '|=' && (o === r || o.slice(0, r.length + 1) === r + '-'))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = e.slice(0, 3) !== 'nth';
                    var a = e.slice(-4) !== 'last';
                    var s = t === 'of-type';
                    return r === 1 && i === 0 ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, u) {
                        var l;
                        var c;
                        var f;
                        var p;
                        var d;
                        var h;
                        var g = o !== a ? 'nextSibling' : 'previousSibling';
                        var v = t.parentNode;
                        var y = s && t.nodeName.toLowerCase();
                        var m = !u && !s;
                        var x = !1;
                        if (v) {
                            if (o) {
                                for (; g; ) {
                                    for (p = t; p = p[g]; )
                                        if (s ? p.nodeName.toLowerCase() === y : p.nodeType === 1)
                                            return !1;
                                    h = g = e === 'only' && !h && 'nextSibling'
                                }
                                return !0
                            }
                            if (h = [a ? v.firstChild : v.lastChild],
                            a && m) {
                                for (p = v,
                                f = p[I] || (p[I] = {}),
                                c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                                l = c[e] || [],
                                d = l[0] === $ && l[1],
                                x = d && l[2],
                                p = d && v.childNodes[d]; p = ++d && p && p[g] || (x = d = 0) || h.pop(); )
                                    if (p.nodeType === 1 && ++x && p === t) {
                                        c[e] = [$, d, x];
                                        break
                                    }
                            } else if (m && (p = t,
                            f = p[I] || (p[I] = {}),
                            c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                            l = c[e] || [],
                            d = l[0] === $ && l[1],
                            x = d),
                            !1 === x)
                                for (; (p = ++d && p && p[g] || (x = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== y : p.nodeType !== 1) || !++x || (m && (f = p[I] || (p[I] = {}),
                                c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                                c[e] = [$, x]),
                                p !== t)); )
                                    ;
                            return (x -= i) === r || x % r == 0 && x / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i;
                    var o = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error('unsupported pseudo: ' + e);
                    return o[I] ? o(n) : o.length > 1 ? (i = [e, e, '', n],
                    w.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--; )
                            r = K(e, i[a]),
                            e[r] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }
                    ) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [];
                    var n = [];
                    var i = S(e.replace(oe, '$1'));
                    return i[I] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--; )
                            (o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e,
                        i(t, null, o, n),
                        t[0] = null,
                        !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(ye, me),
                    function(t) {
                        return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                    }
                }),
                lang: r(function(e) {
                    return ce.test(e || '') || t.error('unsupported lang: ' + e),
                    e = e.replace(ye, me).toLowerCase(),
                    function(t) {
                        var n;
                        do {
                            if (n = H ? t.lang : t.getAttribute('xml:lang') || t.getAttribute('lang'))
                                return (n = n.toLowerCase()) === e || n.indexOf(e + '-') === 0
                        } while ((t = t.parentNode) && t.nodeType === 1);return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === L
                },
                focus: function(e) {
                    return e === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: s(!1),
                disabled: s(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === 'input' && !!e.checked || t === 'option' && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !w.pseudos.empty(e)
                },
                header: function(e) {
                    return de.test(e.nodeName)
                },
                input: function(e) {
                    return pe.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === 'input' && e.type === 'button' || t === 'button'
                },
                text: function(e) {
                    var t;
                    return e.nodeName.toLowerCase() === 'input' && e.type === 'text' && ((t = e.getAttribute('type')) == null || t.toLowerCase() === 'text')
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: u(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: u(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0; )
                        e.push(r);
                    return e
                }),
                gt: u(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        },
        w.pseudos.nth = w.pseudos.eq;
        for (x in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            w.pseudos[x] = (function(e) {
                return function(t) {
                    return t.nodeName.toLowerCase() === 'input' && t.type === e
                }
            }(x));
        for (x in {
            submit: !0,
            reset: !0
        })
            w.pseudos[x] = (function(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === 'input' || n === 'button') && t.type === e
                }
            }(x));
        return c.prototype = w.filters = w.pseudos,
        w.setFilters = new c(),
        E = t.tokenize = function(e, n) {
            var r;
            var i;
            var o;
            var a;
            var s;
            var u;
            var l;
            var c = _[e + ' '];
            if (c)
                return n ? 0 : c.slice(0);
            for (s = e,
            u = [],
            l = w.preFilter; s; ) {
                r && !(i = ae.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                u.push(o = [])),
                r = !1,
                (i = se.exec(s)) && (r = i.shift(),
                o.push({
                    value: r,
                    type: i[0].replace(oe, ' ')
                }),
                s = s.slice(r.length));
                for (a in w.filter)
                    !(i = fe[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(),
                    o.push({
                        value: r,
                        type: a,
                        matches: i
                    }),
                    s = s.slice(r.length));
                if (!r)
                    break
            }
            return n ? s.length : s ? t.error(e) : _(e, u).slice(0)
        }
        ,
        S = t.compile = function(e, t) {
            var n;
            var r = [];
            var i = [];
            var o = z[e + ' '];
            if (!o) {
                for (t || (t = E(e)),
                n = t.length; n--; )
                    o = y(t[n]),
                    o[I] ? r.push(o) : i.push(o);
                o = z(e, m(i, r)),
                o.selector = e
            }
            return o
        }
        ,
        k = t.select = function(e, t, n, r) {
            var i;
            var o;
            var a;
            var s;
            var u;
            var c = typeof e === 'function' && e;
            var p = !r && E(e = c.selector || e);
            if (n = n || [],
            p.length === 1) {
                if (o = p[0] = p[0].slice(0),
                o.length > 2 && (a = o[0]).type === 'ID' && t.nodeType === 9 && H && w.relative[o[1].type]) {
                    if (!(t = (w.find.ID(a.matches[0].replace(ye, me), t) || [])[0]))
                        return n;
                    c && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                for (i = fe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
                !w.relative[s = a.type]); )
                    if ((u = w.find[s]) && (r = u(a.matches[0].replace(ye, me), ve.test(o[0].type) && l(t.parentNode) || t))) {
                        if (o.splice(i, 1),
                        !(e = r.length && f(o)))
                            return Q.apply(n, r),
                            n;
                        break
                    }
            }
            return (c || S(e, p))(r, t, !H, n, !t || ve.test(e) && l(t.parentNode) || t),
            n
        }
        ,
        b.sortStable = I.split('').sort(X).join('') === I,
        b.detectDuplicates = !!A,
        j(),
        b.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(q.createElement('fieldset'))
        }),
        i(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            e.firstChild.getAttribute('href') === '#'
        }) || o('type|href|height|width', function(e, t, n) {
            if (!n)
                return e.getAttribute(t, t.toLowerCase() === 'type' ? 1 : 2)
        }),
        b.attributes && i(function(e) {
            return e.innerHTML = '<input/>',
            e.firstChild.setAttribute('value', ''),
            e.firstChild.getAttribute('value') === ''
        }) || o('value', function(e, t, n) {
            if (!n && e.nodeName.toLowerCase() === 'input')
                return e.defaultValue
        }),
        i(function(e) {
            return e.getAttribute('disabled') == null
        }) || o(Z, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        t
    }(e));
    we.find = Ce,
    we.expr = Ce.selectors,
    we.expr[':'] = we.expr.pseudos,
    we.uniqueSort = we.unique = Ce.uniqueSort,
    we.text = Ce.getText,
    we.isXMLDoc = Ce.isXML,
    we.contains = Ce.contains,
    we.escapeSelector = Ce.escape;
    var Ee = function(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && e.nodeType !== 9; )
            if (e.nodeType === 1) {
                if (i && we(e).is(n))
                    break;
                r.push(e)
            }
        return r
    };
    var Se = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            e.nodeType === 1 && e !== t && n.push(e);
        return n
    };
    var ke = we.expr.match.needsContext;
    var De = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    we.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ':not(' + e + ')'),
        t.length === 1 && r.nodeType === 1 ? we.find.matchesSelector(r, e) ? [r] : [] : we.find.matches(e, we.grep(t, function(e) {
            return e.nodeType === 1
        }))
    }
    ,
    we.fn.extend({
        find: function(e) {
            var t;
            var n;
            var r = this.length;
            var i = this;
            if (typeof e !== 'string')
                return this.pushStack(we(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (we.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]),
            t = 0; t < r; t++)
                we.find(e, i[t], n);
            return r > 1 ? we.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(a(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(a(this, e || [], !0))
        },
        is: function(e) {
            return !!a(this, typeof e === 'string' && ke.test(e) ? we(e) : e || [], !1).length
        }
    });
    var Ne;
    var Ae = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (we.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || Ne,
        typeof e === 'string') {
            if (!(r = e[0] === '<' && e[e.length - 1] === '>' && e.length >= 3 ? [null, e, null] : Ae.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof we ? t[0] : t,
                we.merge(this, we.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : ae, !0)),
                De.test(r[1]) && we.isPlainObject(t))
                    for (r in t)
                        me(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return i = ae.getElementById(r[2]),
            i && (this[0] = i,
            this.length = 1),
            this
        }
        return e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : me(e) ? void 0 !== n.ready ? n.ready(e) : e(we) : we.makeArray(e, this)
    }
    ).prototype = we.fn,
    Ne = we(ae);
    var je = /^(?:parents|prev(?:Until|All))/;
    var qe = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    we.fn.extend({
        has: function(e) {
            var t = we(e, this);
            var n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (we.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n;
            var r = 0;
            var i = this.length;
            var o = [];
            var a = typeof e !== 'string' && we(e);
            if (!ke.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : n.nodeType === 1 && we.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(o.length > 1 ? we.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? typeof e === 'string' ? fe.call(we(e), this[0]) : fe.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(we.uniqueSort(we.merge(this.get(), we(e, t))))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    we.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return Ee(e, 'parentNode')
        },
        parentsUntil: function(e, t, n) {
            return Ee(e, 'parentNode', n)
        },
        next: function(e) {
            return s(e, 'nextSibling')
        },
        prev: function(e) {
            return s(e, 'previousSibling')
        },
        nextAll: function(e) {
            return Ee(e, 'nextSibling')
        },
        prevAll: function(e) {
            return Ee(e, 'previousSibling')
        },
        nextUntil: function(e, t, n) {
            return Ee(e, 'nextSibling', n)
        },
        prevUntil: function(e, t, n) {
            return Ee(e, 'previousSibling', n)
        },
        siblings: function(e) {
            return Se((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Se(e.firstChild)
        },
        contents: function(e) {
            return o(e, 'iframe') ? e.contentDocument : (o(e, 'template') && (e = e.content || e),
            we.merge([], e.childNodes))
        }
    }, function(e, t) {
        we.fn[e] = function(n, r) {
            var i = we.map(this, t, n);
            return e.slice(-5) !== 'Until' && (r = n),
            r && typeof r === 'string' && (i = we.filter(r, i)),
            this.length > 1 && (qe[e] || we.uniqueSort(i),
            je.test(e) && i.reverse()),
            this.pushStack(i)
        }
    });
    var Le = /[^\x20\t\r\n\f]+/g;
    we.Callbacks = function(e) {
        e = typeof e === 'string' ? u(e) : we.extend({}, e);
        var t;
        var n;
        var i;
        var o;
        var a = [];
        var s = [];
        var l = -1;
        var c = function() {
            for (o = o || e.once,
            i = t = !0; s.length; l = -1)
                for (n = s.shift(); ++l < a.length; )
                    !1 === a[l].apply(n[0], n[1]) && e.stopOnFalse && (l = a.length,
                    n = !1);
            e.memory || (n = !1),
            t = !1,
            o && (a = n ? [] : '')
        };
        var f = {
            add: function() {
                return a && (n && !t && (l = a.length - 1,
                s.push(n)),
                (function t(n) {
                    we.each(n, function(n, i) {
                        me(i) ? e.unique && f.has(i) || a.push(i) : i && i.length && r(i) !== 'string' && t(i)
                    })
                }(arguments)),
                n && !t && c()),
                this
            },
            remove: function() {
                return we.each(arguments, function(e, t) {
                    for (var n; (n = we.inArray(t, a, n)) > -1; )
                        a.splice(n, 1),
                        n <= l && l--
                }),
                this
            },
            has: function(e) {
                return e ? we.inArray(e, a) > -1 : a.length > 0
            },
            empty: function() {
                return a && (a = []),
                this
            },
            disable: function() {
                return o = s = [],
                a = n = '',
                this
            },
            disabled: function() {
                return !a
            },
            lock: function() {
                return o = s = [],
                n || t || (a = n = ''),
                this
            },
            locked: function() {
                return !!o
            },
            fireWith: function(e, n) {
                return o || (n = n || [],
                n = [e, n.slice ? n.slice() : n],
                s.push(n),
                t || c()),
                this
            },
            fire: function() {
                return f.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!i
            }
        };
        return f
    }
    ,
    we.extend({
        Deferred: function(t) {
            var n = [['notify', 'progress', we.Callbacks('memory'), we.Callbacks('memory'), 2], ['resolve', 'done', we.Callbacks('once memory'), we.Callbacks('once memory'), 0, 'resolved'], ['reject', 'fail', we.Callbacks('once memory'), we.Callbacks('once memory'), 1, 'rejected']];
            var r = 'pending';
            var i = {
                state: function() {
                    return r
                },
                always: function() {
                    return o.done(arguments).fail(arguments),
                    this
                },
                catch: function(e) {
                    return i.then(null, e)
                },
                pipe: function() {
                    var e = arguments;
                    return we.Deferred(function(t) {
                        we.each(n, function(n, r) {
                            var i = me(e[r[4]]) && e[r[4]];
                            o[r[1]](function() {
                                var e = i && i.apply(this, arguments);
                                e && me(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + 'With'](this, i ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                then: function(t, r, i) {
                    function o(t, n, r, i) {
                        return function() {
                            var s = this;
                            var u = arguments;
                            var f = function() {
                                var e, f;
                                if (!(t < a)) {
                                    if ((e = r.apply(s, u)) === n.promise())
                                        throw new TypeError('Thenable self-resolution');
                                    f = e && (typeof e === 'object' || typeof e === 'function') && e.then,
                                    me(f) ? i ? f.call(e, o(a, n, l, i), o(a, n, c, i)) : (a++,
                                    f.call(e, o(a, n, l, i), o(a, n, c, i), o(a, n, l, n.notifyWith))) : (r !== l && (s = void 0,
                                    u = [e]),
                                    (i || n.resolveWith)(s, u))
                                }
                            };
                            var p = i ? f : function() {
                                try {
                                    f()
                                } catch (e) {
                                    we.Deferred.exceptionHook && we.Deferred.exceptionHook(e, p.stackTrace),
                                    t + 1 >= a && (r !== c && (s = void 0,
                                    u = [e]),
                                    n.rejectWith(s, u))
                                }
                            }
                            ;
                            t ? p() : (we.Deferred.getStackHook && (p.stackTrace = we.Deferred.getStackHook()),
                            e.setTimeout(p))
                        }
                    }
                    var a = 0;
                    return we.Deferred(function(e) {
                        n[0][3].add(o(0, e, me(i) ? i : l, e.notifyWith)),
                        n[1][3].add(o(0, e, me(t) ? t : l)),
                        n[2][3].add(o(0, e, me(r) ? r : c))
                    }).promise()
                },
                promise: function(e) {
                    return e != null ? we.extend(e, i) : i
                }
            };
            var o = {};
            return we.each(n, function(e, t) {
                var a = t[2];
                var s = t[5];
                i[t[1]] = a.add,
                s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock),
                a.add(t[3].fire),
                o[t[0]] = function() {
                    return o[t[0] + 'With'](this === o ? void 0 : this, arguments),
                    this
                }
                ,
                o[t[0] + 'With'] = a.fireWith
            }),
            i.promise(o),
            t && t.call(o, o),
            o
        },
        when: function(e) {
            var t = arguments.length;
            var n = t;
            var r = Array(n);
            var i = ue.call(arguments);
            var o = we.Deferred();
            var a = function(e) {
                return function(n) {
                    r[e] = this,
                    i[e] = arguments.length > 1 ? ue.call(arguments) : n,
                    --t || o.resolveWith(r, i)
                }
            };
            if (t <= 1 && (f(e, o.done(a(n)).resolve, o.reject, !t),
            o.state() === 'pending' || me(i[n] && i[n].then)))
                return o.then();
            for (; n--; )
                f(i[n], a(n), o.reject);
            return o.promise()
        }
    });
    var He = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    we.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && He.test(t.name) && e.console.warn('jQuery.Deferred exception: ' + t.message, t.stack, n)
    }
    ,
    we.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    }
    ;
    var Oe = we.Deferred();
    we.fn.ready = function(e) {
        return Oe.then(e).catch(function(e) {
            we.readyException(e)
        }),
        this
    }
    ,
    we.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --we.readyWait : we.isReady) || (we.isReady = !0,
            !0 !== e && --we.readyWait > 0 || Oe.resolveWith(ae, [we]))
        }
    }),
    we.ready.then = Oe.then,
    ae.readyState === 'complete' || ae.readyState !== 'loading' && !ae.documentElement.doScroll ? e.setTimeout(we.ready) : (ae.addEventListener('DOMContentLoaded', p),
    e.addEventListener('load', p));
    var Pe = function(e, t, n, i, o, a, s) {
        var u = 0;
        var l = e.length;
        var c = n == null;
        if (r(n) === 'object') {
            o = !0;
            for (u in n)
                Pe(e, t, u, n[u], !0, a, s)
        } else if (void 0 !== i && (o = !0,
        me(i) || (s = !0),
        c && (s ? (t.call(e, i),
        t = null) : (c = t,
        t = function(e, t, n) {
            return c.call(we(e), n)
        }
        )),
        t))
            for (; u < l; u++)
                t(e[u], n, s ? i : i.call(e[u], u, t(e[u], n)));
        return o ? e : c ? t.call(e) : l ? t(e[0], n) : a
    };
    var Re = /^-ms-/;
    var Me = /-([a-z])/g;
    var Ie = function(e) {
        return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
    };
    g.uid = 1,
    g.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            Ie(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var r;
            var i = this.cache(e);
            if (typeof t === 'string')
                i[h(t)] = n;
            else
                for (r in t)
                    i[h(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][h(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && typeof t === 'string' && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n;
            var r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    Array.isArray(t) ? t = t.map(h) : (t = h(t),
                    t = t in r ? [t] : t.match(Le) || []),
                    n = t.length;
                    for (; n--; )
                        delete r[t[n]]
                }
                (void 0 === t || we.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !we.isEmptyObject(t)
        }
    };
    var We = new g();
    var $e = new g();
    var Be = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
    var Fe = /[A-Z]/g;
    we.extend({
        hasData: function(e) {
            return $e.hasData(e) || We.hasData(e)
        },
        data: function(e, t, n) {
            return $e.access(e, t, n)
        },
        removeData: function(e, t) {
            $e.remove(e, t)
        },
        _data: function(e, t, n) {
            return We.access(e, t, n)
        },
        _removeData: function(e, t) {
            We.remove(e, t)
        }
    }),
    we.fn.extend({
        data: function(e, t) {
            var n;
            var r;
            var i;
            var o = this[0];
            var a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = $e.get(o),
                o.nodeType === 1 && !We.get(o, 'hasDataAttrs'))) {
                    for (n = a.length; n--; )
                        a[n] && (r = a[n].name,
                        r.indexOf('data-') === 0 && (r = h(r.slice(5)),
                        y(o, r, i[r])));
                    We.set(o, 'hasDataAttrs', !0)
                }
                return i
            }
            return typeof e === 'object' ? this.each(function() {
                $e.set(this, e)
            }) : Pe(this, function(t) {
                var n;
                if (o && void 0 === t) {
                    if (void 0 !== (n = $e.get(o, e)))
                        return n;
                    if (void 0 !== (n = y(o, e)))
                        return n
                } else
                    this.each(function() {
                        $e.set(this, e, t)
                    })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                $e.remove(this, e)
            })
        }
    }),
    we.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || 'fx') + 'queue',
                r = We.get(e, t),
                n && (!r || Array.isArray(n) ? r = We.access(e, t, we.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || 'fx';
            var n = we.queue(e, t);
            var r = n.length;
            var i = n.shift();
            var o = we._queueHooks(e, t);
            var a = function() {
                we.dequeue(e, t)
            };
            i === 'inprogress' && (i = n.shift(),
            r--),
            i && (t === 'fx' && n.unshift('inprogress'),
            delete o.stop,
            i.call(e, a, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + 'queueHooks';
            return We.get(e, n) || We.access(e, n, {
                empty: we.Callbacks('once memory').add(function() {
                    We.remove(e, [t + 'queue', n])
                })
            })
        }
    }),
    we.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return typeof e !== 'string' && (t = e,
            e = 'fx',
            n--),
            arguments.length < n ? we.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = we.queue(this, e, t);
                we._queueHooks(this, e),
                e === 'fx' && n[0] !== 'inprogress' && we.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                we.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || 'fx', [])
        },
        promise: function(e, t) {
            var n;
            var r = 1;
            var i = we.Deferred();
            var o = this;
            var a = this.length;
            var s = function() {
                --r || i.resolveWith(o, [o])
            };
            for (typeof e !== 'string' && (t = e,
            e = void 0),
            e = e || 'fx'; a--; )
                (n = We.get(o[a], e + 'queueHooks')) && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var _e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var ze = new RegExp('^(?:([+-])=|)(' + _e + ')([a-z%]*)$','i');
    var Xe = ['Top', 'Right', 'Bottom', 'Left'];
    var Ue = function(e, t) {
        return e = t || e,
        e.style.display === 'none' || e.style.display === '' && we.contains(e.ownerDocument, e) && we.css(e, 'display') === 'none'
    };
    var Ve = function(e, t, n, r) {
        var i;
        var o;
        var a = {};
        for (o in t)
            a[o] = e.style[o],
            e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)
            e.style[o] = a[o];
        return i
    };
    var Ge = {};
    we.fn.extend({
        show: function() {
            return b(this, !0)
        },
        hide: function() {
            return b(this)
        },
        toggle: function(e) {
            return typeof e === 'boolean' ? e ? this.show() : this.hide() : this.each(function() {
                Ue(this) ? we(this).show() : we(this).hide()
            })
        }
    });
    var Ye = /^(?:checkbox|radio)$/i;
    var Qe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
    var Je = /^$|^module$|\/(?:java|ecma)script/i;
    var Ke = {
        option: [1, "<select multiple='multiple'>", '</select>'],
        thead: [1, '<table>', '</table>'],
        col: [2, '<table><colgroup>', '</colgroup></table>'],
        tr: [2, '<table><tbody>', '</tbody></table>'],
        td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
        _default: [0, '', '']
    };
    Ke.optgroup = Ke.option,
    Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead,
    Ke.th = Ke.td;
    var Ze = /<|&#?\w+;/;
    !(function() {
        var e = ae.createDocumentFragment();
        var t = e.appendChild(ae.createElement('div'));
        var n = ae.createElement('input');
        n.setAttribute('type', 'radio'),
        n.setAttribute('checked', 'checked'),
        n.setAttribute('name', 't'),
        t.appendChild(n),
        ye.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
        t.innerHTML = '<textarea>x</textarea>',
        ye.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }());
    var et = ae.documentElement;
    var tt = /^key/;
    var nt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
    var rt = /^([^.]*)(?:\.(.+)|)/;
    we.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o;
            var a;
            var s;
            var u;
            var l;
            var c;
            var f;
            var p;
            var d;
            var h;
            var g;
            var v = We.get(e);
            if (v)
                for (n.handler && (o = n,
                n = o.handler,
                i = o.selector),
                i && we.find.matchesSelector(et, i),
                n.guid || (n.guid = we.guid++),
                (u = v.events) || (u = v.events = {}),
                (a = v.handle) || (a = v.handle = function(t) {
                    return void 0 !== we && we.event.triggered !== t.type ? we.event.dispatch.apply(e, arguments) : void 0
                }
                ),
                t = (t || '').match(Le) || [''],
                l = t.length; l--; )
                    s = rt.exec(t[l]) || [],
                    d = g = s[1],
                    h = (s[2] || '').split('.').sort(),
                    d && (f = we.event.special[d] || {},
                    d = (i ? f.delegateType : f.bindType) || d,
                    f = we.event.special[d] || {},
                    c = we.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && we.expr.match.needsContext.test(i),
                        namespace: h.join('.')
                    }, o),
                    (p = u[d]) || (p = u[d] = [],
                    p.delegateCount = 0,
                    f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)),
                    f.add && (f.add.call(e, c),
                    c.handler.guid || (c.handler.guid = n.guid)),
                    i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    we.event.global[d] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o;
            var a;
            var s;
            var u;
            var l;
            var c;
            var f;
            var p;
            var d;
            var h;
            var g;
            var v = We.hasData(e) && We.get(e);
            if (v && (u = v.events)) {
                for (t = (t || '').match(Le) || [''],
                l = t.length; l--; )
                    if (s = rt.exec(t[l]) || [],
                    d = g = s[1],
                    h = (s[2] || '').split('.').sort(),
                    d) {
                        for (f = we.event.special[d] || {},
                        d = (r ? f.delegateType : f.bindType) || d,
                        p = u[d] || [],
                        s = s[2] && new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                        a = o = p.length; o--; )
                            c = p[o],
                            !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && (r !== '**' || !c.selector) || (p.splice(o, 1),
                            c.selector && p.delegateCount--,
                            f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || we.removeEvent(e, d, v.handle),
                        delete u[d])
                    } else
                        for (d in u)
                            we.event.remove(e, d + t[l], n, r, !0);
                we.isEmptyObject(u) && We.remove(e, 'handle events')
            }
        },
        dispatch: function(e) {
            var t;
            var n;
            var r;
            var i;
            var o;
            var a;
            var s = we.event.fix(e);
            var u = new Array(arguments.length);
            var l = (We.get(this, 'events') || {})[s.type] || [];
            var c = we.event.special[s.type] || {};
            for (u[0] = s,
            t = 1; t < arguments.length; t++)
                u[t] = arguments[t];
            if (s.delegateTarget = this,
            !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                for (a = we.event.handlers.call(this, s, l),
                t = 0; (i = a[t++]) && !s.isPropagationStopped(); )
                    for (s.currentTarget = i.elem,
                    n = 0; (o = i.handlers[n++]) && !s.isImmediatePropagationStopped(); )
                        s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o,
                        s.data = o.data,
                        void 0 !== (r = ((we.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (s.result = r) && (s.preventDefault(),
                        s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s),
                s.result
            }
        },
        handlers: function(e, t) {
            var n;
            var r;
            var i;
            var o;
            var a;
            var s = [];
            var u = t.delegateCount;
            var l = e.target;
            if (u && l.nodeType && !(e.type === 'click' && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                    if (l.nodeType === 1 && (e.type !== 'click' || !0 !== l.disabled)) {
                        for (o = [],
                        a = {},
                        n = 0; n < u; n++)
                            r = t[n],
                            i = r.selector + ' ',
                            void 0 === a[i] && (a[i] = r.needsContext ? we(i, this).index(l) > -1 : we.find(i, this, null, [l]).length),
                            a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return l = this,
            u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }),
            s
        },
        addProp: function(e, t) {
            Object.defineProperty(we.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: me(t) ? function() {
                    if (this.originalEvent)
                        return t(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[e]
                }
                ,
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[we.expando] ? e : new we.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== k() && this.focus)
                        return this.focus(),
                        !1
                },
                delegateType: 'focusin'
            },
            blur: {
                trigger: function() {
                    if (this === k() && this.blur)
                        return this.blur(),
                        !1
                },
                delegateType: 'focusout'
            },
            click: {
                trigger: function() {
                    if (this.type === 'checkbox' && this.click && o(this, 'input'))
                        return this.click(),
                        !1
                },
                _default: function(e) {
                    return o(e.target, 'a')
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    we.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    we.Event = function(e, t) {
        if (!(this instanceof we.Event))
            return new we.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? E : S,
        this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && we.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[we.expando] = !0
    }
    ,
    we.Event.prototype = {
        constructor: we.Event,
        isDefaultPrevented: S,
        isPropagationStopped: S,
        isImmediatePropagationStopped: S,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = E,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = E,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = E,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    we.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return e.which == null && tt.test(e.type) ? e.charCode != null ? e.charCode : e.keyCode : !e.which && void 0 !== t && nt.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, we.event.addProp),
    we.each({
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
    }, function(e, t) {
        we.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n;
                var r = this;
                var i = e.relatedTarget;
                var o = e.handleObj;
                return i && (i === r || we.contains(r, i)) || (e.type = o.origType,
                n = o.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    we.fn.extend({
        on: function(e, t, n, r) {
            return D(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return D(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                we(e.delegateTarget).off(r.namespace ? r.origType + '.' + r.namespace : r.origType, r.selector, r.handler),
                this;
            if (typeof e === 'object') {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && typeof t !== 'function' || (n = t,
            t = void 0),
            !1 === n && (n = S),
            this.each(function() {
                we.event.remove(this, e, n, t)
            })
        }
    });
    var it = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
    var ot = /<script|<style|<link/i;
    var at = /checked\s*(?:[^=]|=\s*.checked.)/i;
    var st = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    we.extend({
        htmlPrefilter: function(e) {
            return e.replace(it, '<$1></$2>')
        },
        clone: function(e, t, n) {
            var r;
            var i;
            var o;
            var a;
            var s = e.cloneNode(!0);
            var u = we.contains(e.ownerDocument, e);
            if (!(ye.noCloneChecked || e.nodeType !== 1 && e.nodeType !== 11 || we.isXMLDoc(e)))
                for (a = w(s),
                o = w(e),
                r = 0,
                i = o.length; r < i; r++)
                    L(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || w(e),
                    a = a || w(s),
                    r = 0,
                    i = o.length; r < i; r++)
                        q(o[r], a[r]);
                else
                    q(e, s);
            return a = w(s, 'script'),
            a.length > 0 && T(a, !u && w(e, 'script')),
            s
        },
        cleanData: function(e) {
            for (var t, n, r, i = we.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (Ie(n)) {
                    if (t = n[We.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? we.event.remove(n, r) : we.removeEvent(n, r, t.handle);
                        n[We.expando] = void 0
                    }
                    n[$e.expando] && (n[$e.expando] = void 0)
                }
        }
    }),
    we.fn.extend({
        detach: function(e) {
            return O(this, e, !0)
        },
        remove: function(e) {
            return O(this, e)
        },
        text: function(e) {
            return Pe(this, function(e) {
                return void 0 === e ? we.text(this) : this.empty().each(function() {
                    this.nodeType !== 1 && this.nodeType !== 11 && this.nodeType !== 9 || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return H(this, arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    N(this, e).appendChild(e)
                }
            })
        },
        prepend: function() {
            return H(this, arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = N(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return H(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return H(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; (e = this[t]) != null; t++)
                e.nodeType === 1 && (we.cleanData(w(e, !1)),
                e.textContent = '');
            return this
        },
        clone: function(e, t) {
            return e = e != null && e,
            t = t == null ? e : t,
            this.map(function() {
                return we.clone(this, e, t)
            })
        },
        html: function(e) {
            return Pe(this, function(e) {
                var t = this[0] || {};
                var n = 0;
                var r = this.length;
                if (void 0 === e && t.nodeType === 1)
                    return t.innerHTML;
                if (typeof e === 'string' && !ot.test(e) && !Ke[(Qe.exec(e) || ['', ''])[1].toLowerCase()]) {
                    e = we.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            t = this[n] || {},
                            t.nodeType === 1 && (we.cleanData(w(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return H(this, arguments, function(t) {
                var n = this.parentNode;
                we.inArray(this, e) < 0 && (we.cleanData(w(this)),
                n && n.replaceChild(t, this))
            }, e)
        }
    }),
    we.each({
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
    }, function(e, t) {
        we.fn[e] = function(e) {
            for (var n, r = [], i = we(e), o = i.length - 1, a = 0; a <= o; a++)
                n = a === o ? this : this.clone(!0),
                we(i[a])[t](n),
                ce.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var ut = new RegExp('^(' + _e + ')(?!px)[a-z%]+$','i');
    var lt = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
        n.getComputedStyle(t)
    };
    var ct = new RegExp(Xe.join('|'),'i');
    !(function() {
        function t() {
            if (l) {
                u.style.cssText = 'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0',
                l.style.cssText = 'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%',
                et.appendChild(u).appendChild(l);
                var t = e.getComputedStyle(l);
                r = t.top !== '1%',
                s = n(t.marginLeft) === 12,
                l.style.right = '60%',
                a = n(t.right) === 36,
                i = n(t.width) === 36,
                l.style.position = 'absolute',
                o = l.offsetWidth === 36 || 'absolute',
                et.removeChild(u),
                l = null
            }
        }
        function n(e) {
            return Math.round(parseFloat(e))
        }
        var r;
        var i;
        var o;
        var a;
        var s;
        var u = ae.createElement('div');
        var l = ae.createElement('div');
        l.style && (l.style.backgroundClip = 'content-box',
        l.cloneNode(!0).style.backgroundClip = '',
        ye.clearCloneStyle = l.style.backgroundClip === 'content-box',
        we.extend(ye, {
            boxSizingReliable: function() {
                return t(),
                i
            },
            pixelBoxStyles: function() {
                return t(),
                a
            },
            pixelPosition: function() {
                return t(),
                r
            },
            reliableMarginLeft: function() {
                return t(),
                s
            },
            scrollboxSize: function() {
                return t(),
                o
            }
        }))
    }());
    var ft = /^(none|table(?!-c[ea]).+)/;
    var pt = /^--/;
    var dt = {
        position: 'absolute',
        visibility: 'hidden',
        display: 'block'
    };
    var ht = {
        letterSpacing: '0',
        fontWeight: '400'
    };
    var gt = ['Webkit', 'Moz', 'ms'];
    var vt = ae.createElement('div').style;
    we.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = P(e, 'opacity');
                        return n === '' ? '1' : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && e.nodeType !== 3 && e.nodeType !== 8 && e.style) {
                var i;
                var o;
                var a;
                var s = h(t);
                var u = pt.test(t);
                var l = e.style;
                if (u || (t = I(s)),
                a = we.cssHooks[t] || we.cssHooks[s],
                void 0 === n)
                    return a && 'get'in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                o = typeof n,
                o === 'string' && (i = ze.exec(n)) && i[1] && (n = m(e, t, i),
                o = 'number'),
                n != null && n === n && (o === 'number' && (n += i && i[3] || (we.cssNumber[s] ? '' : 'px')),
                ye.clearCloneStyle || n !== '' || t.indexOf('background') !== 0 || (l[t] = 'inherit'),
                a && 'set'in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i;
            var o;
            var a;
            var s = h(t);
            return pt.test(t) || (t = I(s)),
            a = we.cssHooks[t] || we.cssHooks[s],
            a && 'get'in a && (i = a.get(e, !0, n)),
            void 0 === i && (i = P(e, t, r)),
            i === 'normal' && t in ht && (i = ht[t]),
            n === '' || n ? (o = parseFloat(i),
            !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }),
    we.each(['height', 'width'], function(e, t) {
        we.cssHooks[t] = {
            get: function(e, n, r) {
                if (n)
                    return !ft.test(we.css(e, 'display')) || e.getClientRects().length && e.getBoundingClientRect().width ? B(e, t, r) : Ve(e, dt, function() {
                        return B(e, t, r)
                    })
            },
            set: function(e, n, r) {
                var i;
                var o = lt(e);
                var a = we.css(e, 'boxSizing', !1, o) === 'border-box';
                var s = r && $(e, t, r, a, o);
                return a && ye.scrollboxSize() === o.position && (s -= Math.ceil(e['offset' + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - $(e, t, 'border', !1, o) - 0.5)),
                s && (i = ze.exec(n)) && (i[3] || 'px') !== 'px' && (e.style[t] = n,
                n = we.css(e, t)),
                W(e, n, s)
            }
        }
    }),
    we.cssHooks.marginLeft = R(ye.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(P(e, 'marginLeft')) || e.getBoundingClientRect().left - Ve(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + 'px'
    }),
    we.each({
        margin: '',
        padding: '',
        border: 'Width'
    }, function(e, t) {
        we.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = typeof n === 'string' ? n.split(' ') : [n]; r < 4; r++)
                    i[e + Xe[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        },
        e !== 'margin' && (we.cssHooks[e + t].set = W)
    }),
    we.fn.extend({
        css: function(e, t) {
            return Pe(this, function(e, t, n) {
                var r;
                var i;
                var o = {};
                var a = 0;
                if (Array.isArray(t)) {
                    for (r = lt(e),
                    i = t.length; a < i; a++)
                        o[t[a]] = we.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? we.style(e, t, n) : we.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }),
    we.Tween = F,
    F.prototype = {
        constructor: F,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || we.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (we.cssNumber[n] ? '' : 'px')
        },
        cur: function() {
            var e = F.propHooks[this.prop];
            return e && e.get ? e.get(this) : F.propHooks._default.get(this)
        },
        run: function(e) {
            var t;
            var n = F.propHooks[this.prop];
            return this.options.duration ? this.pos = t = we.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : F.propHooks._default.set(this),
            this
        }
    },
    F.prototype.init.prototype = F.prototype,
    F.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (t = we.css(e.elem, e.prop, ''),
                t && t !== 'auto' ? t : 0)
            },
            set: function(e) {
                we.fx.step[e.prop] ? we.fx.step[e.prop](e) : e.elem.nodeType !== 1 || e.elem.style[we.cssProps[e.prop]] == null && !we.cssHooks[e.prop] ? e.elem[e.prop] = e.now : we.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    F.propHooks.scrollTop = F.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    we.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return 0.5 - Math.cos(e * Math.PI) / 2
        },
        _default: 'swing'
    },
    we.fx = F.prototype.init,
    we.fx.step = {};
    var yt;
    var mt;
    var xt = /^(?:toggle|show|hide)$/;
    var bt = /queueHooks$/;
    we.Animation = we.extend(Y, {
        tweeners: {
            '*': [function(e, t) {
                var n = this.createTween(e, t);
                return m(n.elem, e, ze.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            me(e) ? (t = e,
            e = ['*']) : e = e.match(Le);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r],
                Y.tweeners[n] = Y.tweeners[n] || [],
                Y.tweeners[n].unshift(t)
        },
        prefilters: [V],
        prefilter: function(e, t) {
            t ? Y.prefilters.unshift(e) : Y.prefilters.push(e)
        }
    }),
    we.speed = function(e, t, n) {
        var r = e && typeof e === 'object' ? we.extend({}, e) : {
            complete: n || !n && t || me(e) && e,
            duration: e,
            easing: n && t || t && !me(t) && t
        };
        return we.fx.off ? r.duration = 0 : typeof r.duration !== 'number' && (r.duration in we.fx.speeds ? r.duration = we.fx.speeds[r.duration] : r.duration = we.fx.speeds._default),
        r.queue != null && !0 !== r.queue || (r.queue = 'fx'),
        r.old = r.complete,
        r.complete = function() {
            me(r.old) && r.old.call(this),
            r.queue && we.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    we.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Ue).css('opacity', 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = we.isEmptyObject(e);
            var o = we.speed(t, n, r);
            var a = function() {
                var t = Y(this, we.extend({}, e), o);
                (i || We.get(this, 'finish')) && t.stop(!0)
            };
            return a.finish = a,
            i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return typeof e !== 'string' && (n = t,
            t = e,
            e = void 0),
            t && !1 !== e && this.queue(e || 'fx', []),
            this.each(function() {
                var t = !0;
                var i = e != null && e + 'queueHooks';
                var o = we.timers;
                var a = We.get(this);
                if (i)
                    a[i] && a[i].stop && r(a[i]);
                else
                    for (i in a)
                        a[i] && a[i].stop && bt.test(i) && r(a[i]);
                for (i = o.length; i--; )
                    o[i].elem !== this || e != null && o[i].queue !== e || (o[i].anim.stop(n),
                    t = !1,
                    o.splice(i, 1));
                !t && n || we.dequeue(this, e)
            })
        },
        finish: function(e) {
            return !1 !== e && (e = e || 'fx'),
            this.each(function() {
                var t;
                var n = We.get(this);
                var r = n[e + 'queue'];
                var i = n[e + 'queueHooks'];
                var o = we.timers;
                var a = r ? r.length : 0;
                for (n.finish = !0,
                we.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = o.length; t--; )
                    o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0),
                    o.splice(t, 1));
                for (t = 0; t < a; t++)
                    r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    we.each(['toggle', 'show', 'hide'], function(e, t) {
        var n = we.fn[t];
        we.fn[t] = function(e, r, i) {
            return e == null || typeof e === 'boolean' ? n.apply(this, arguments) : this.animate(X(t, !0), e, r, i)
        }
    }),
    we.each({
        slideDown: X('show'),
        slideUp: X('hide'),
        slideToggle: X('toggle'),
        fadeIn: {
            opacity: 'show'
        },
        fadeOut: {
            opacity: 'hide'
        },
        fadeToggle: {
            opacity: 'toggle'
        }
    }, function(e, t) {
        we.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    we.timers = [],
    we.fx.tick = function() {
        var e;
        var t = 0;
        var n = we.timers;
        for (yt = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || we.fx.stop(),
        yt = void 0
    }
    ,
    we.fx.timer = function(e) {
        we.timers.push(e),
        we.fx.start()
    }
    ,
    we.fx.interval = 13,
    we.fx.start = function() {
        mt || (mt = !0,
        _())
    }
    ,
    we.fx.stop = function() {
        mt = null
    }
    ,
    we.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    we.fn.delay = function(t, n) {
        return t = we.fx ? we.fx.speeds[t] || t : t,
        n = n || 'fx',
        this.queue(n, function(n, r) {
            var i = e.setTimeout(n, t);
            r.stop = function() {
                e.clearTimeout(i)
            }
        })
    }
    ,
    (function() {
        var e = ae.createElement('input');
        var t = ae.createElement('select');
        var n = t.appendChild(ae.createElement('option'));
        e.type = 'checkbox',
        ye.checkOn = e.value !== '',
        ye.optSelected = n.selected,
        e = ae.createElement('input'),
        e.value = 't',
        e.type = 'radio',
        ye.radioValue = e.value === 't'
    }());
    var wt;
    var Tt = we.expr.attrHandle;
    we.fn.extend({
        attr: function(e, t) {
            return Pe(this, we.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                we.removeAttr(this, e)
            })
        }
    }),
    we.extend({
        attr: function(e, t, n) {
            var r;
            var i;
            var o = e.nodeType;
            if (o !== 3 && o !== 8 && o !== 2)
                return void 0 === e.getAttribute ? we.prop(e, t, n) : (o === 1 && we.isXMLDoc(e) || (i = we.attrHooks[t.toLowerCase()] || (we.expr.match.bool.test(t) ? wt : void 0)),
                void 0 !== n ? n === null ? void we.removeAttr(e, t) : i && 'set'in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ''),
                n) : i && 'get'in i && (r = i.get(e, t)) !== null ? r : (r = we.find.attr(e, t),
                r == null ? void 0 : r))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ye.radioValue && t === 'radio' && o(e, 'input')) {
                        var n = e.value;
                        return e.setAttribute('type', t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n;
            var r = 0;
            var i = t && t.match(Le);
            if (i && e.nodeType === 1)
                for (; n = i[r++]; )
                    e.removeAttribute(n)
        }
    }),
    wt = {
        set: function(e, t, n) {
            return !1 === t ? we.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    we.each(we.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Tt[t] || we.find.attr;
        Tt[t] = function(e, t, r) {
            var i;
            var o;
            var a = t.toLowerCase();
            return r || (o = Tt[a],
            Tt[a] = i,
            i = n(e, t, r) != null ? a : null,
            Tt[a] = o),
            i
        }
    });
    var Ct = /^(?:input|select|textarea|button)$/i;
    var Et = /^(?:a|area)$/i;
    we.fn.extend({
        prop: function(e, t) {
            return Pe(this, we.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[we.propFix[e] || e]
            })
        }
    }),
    we.extend({
        prop: function(e, t, n) {
            var r;
            var i;
            var o = e.nodeType;
            if (o !== 3 && o !== 8 && o !== 2)
                return o === 1 && we.isXMLDoc(e) || (t = we.propFix[t] || t,
                i = we.propHooks[t]),
                void 0 !== n ? i && 'set'in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && 'get'in i && (r = i.get(e, t)) !== null ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = we.find.attr(e, 'tabindex');
                    return t ? parseInt(t, 10) : Ct.test(e.nodeName) || Et.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: 'htmlFor',
            class: 'className'
        }
    }),
    ye.optSelected || (we.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    we.each(['tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'], function() {
        we.propFix[this.toLowerCase()] = this
    }),
    we.fn.extend({
        addClass: function(e) {
            var t;
            var n;
            var r;
            var i;
            var o;
            var a;
            var s;
            var u = 0;
            if (me(e))
                return this.each(function(t) {
                    we(this).addClass(e.call(this, t, J(this)))
                });
            if (t = K(e),
            t.length)
                for (; n = this[u++]; )
                    if (i = J(n),
                    r = n.nodeType === 1 && ' ' + Q(i) + ' ') {
                        for (a = 0; o = t[a++]; )
                            r.indexOf(' ' + o + ' ') < 0 && (r += o + ' ');
                        s = Q(r),
                        i !== s && n.setAttribute('class', s)
                    }
            return this
        },
        removeClass: function(e) {
            var t;
            var n;
            var r;
            var i;
            var o;
            var a;
            var s;
            var u = 0;
            if (me(e))
                return this.each(function(t) {
                    we(this).removeClass(e.call(this, t, J(this)))
                });
            if (!arguments.length)
                return this.attr('class', '');
            if (t = K(e),
            t.length)
                for (; n = this[u++]; )
                    if (i = J(n),
                    r = n.nodeType === 1 && ' ' + Q(i) + ' ') {
                        for (a = 0; o = t[a++]; )
                            for (; r.indexOf(' ' + o + ' ') > -1; )
                                r = r.replace(' ' + o + ' ', ' ');
                        s = Q(r),
                        i !== s && n.setAttribute('class', s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            var r = n === 'string' || Array.isArray(e);
            return typeof t === 'boolean' && r ? t ? this.addClass(e) : this.removeClass(e) : me(e) ? this.each(function(n) {
                we(this).toggleClass(e.call(this, n, J(this), t), t)
            }) : this.each(function() {
                var t, i, o, a;
                if (r)
                    for (i = 0,
                    o = we(this),
                    a = K(e); t = a[i++]; )
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else
                    void 0 !== e && n !== 'boolean' || (t = J(this),
                    t && We.set(this, '__className__', t),
                    this.setAttribute && this.setAttribute('class', t || !1 === e ? '' : We.get(this, '__className__') || ''))
            })
        },
        hasClass: function(e) {
            var t;
            var n;
            var r = 0;
            for (t = ' ' + e + ' '; n = this[r++]; )
                if (n.nodeType === 1 && (' ' + Q(J(n)) + ' ').indexOf(t) > -1)
                    return !0;
            return !1
        }
    });
    var St = /\r/g;
    we.fn.extend({
        val: function(e) {
            var t;
            var n;
            var r;
            var i = this[0];
            {
                if (arguments.length)
                    return r = me(e),
                    this.each(function(n) {
                        var i;
                        this.nodeType === 1 && (i = r ? e.call(this, n, we(this).val()) : e,
                        i == null ? i = '' : typeof i === 'number' ? i += '' : Array.isArray(i) && (i = we.map(i, function(e) {
                            return e == null ? '' : e + ''
                        })),
                        (t = we.valHooks[this.type] || we.valHooks[this.nodeName.toLowerCase()]) && 'set'in t && void 0 !== t.set(this, i, 'value') || (this.value = i))
                    });
                if (i)
                    return (t = we.valHooks[i.type] || we.valHooks[i.nodeName.toLowerCase()]) && 'get'in t && void 0 !== (n = t.get(i, 'value')) ? n : (n = i.value,
                    typeof n === 'string' ? n.replace(St, '') : n == null ? '' : n)
            }
        }
    }),
    we.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = we.find.attr(e, 'value');
                    return t != null ? t : Q(we.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t;
                    var n;
                    var r;
                    var i = e.options;
                    var a = e.selectedIndex;
                    var s = e.type === 'select-one';
                    var u = s ? null : [];
                    var l = s ? a + 1 : i.length;
                    for (r = a < 0 ? l : s ? a : 0; r < l; r++)
                        if (n = i[r],
                        (n.selected || r === a) && !n.disabled && (!n.parentNode.disabled || !o(n.parentNode, 'optgroup'))) {
                            if (t = we(n).val(),
                            s)
                                return t;
                            u.push(t)
                        }
                    return u
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = we.makeArray(t), a = i.length; a--; )
                        r = i[a],
                        (r.selected = we.inArray(we.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    we.each(['radio', 'checkbox'], function() {
        we.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = we.inArray(we(e).val(), t) > -1
            }
        },
        ye.checkOn || (we.valHooks[this].get = function(e) {
            return e.getAttribute('value') === null ? 'on' : e.value
        }
        )
    }),
    ye.focusin = 'onfocusin'in e;
    var kt = /^(?:focusinfocus|focusoutblur)$/;
    var Dt = function(e) {
        e.stopPropagation()
    };
    we.extend(we.event, {
        trigger: function(t, n, r, i) {
            var o;
            var a;
            var s;
            var u;
            var l;
            var c;
            var f;
            var p;
            var d = [r || ae];
            var h = he.call(t, 'type') ? t.type : t;
            var g = he.call(t, 'namespace') ? t.namespace.split('.') : [];
            if (a = p = s = r = r || ae,
            r.nodeType !== 3 && r.nodeType !== 8 && !kt.test(h + we.event.triggered) && (h.indexOf('.') > -1 && (g = h.split('.'),
            h = g.shift(),
            g.sort()),
            l = h.indexOf(':') < 0 && 'on' + h,
            t = t[we.expando] ? t : new we.Event(h,typeof t === 'object' && t),
            t.isTrigger = i ? 2 : 3,
            t.namespace = g.join('.'),
            t.rnamespace = t.namespace ? new RegExp('(^|\\.)' + g.join('\\.(?:.*\\.|)') + '(\\.|$)') : null,
            t.result = void 0,
            t.target || (t.target = r),
            n = n == null ? [t] : we.makeArray(n, [t]),
            f = we.event.special[h] || {},
            i || !f.trigger || !1 !== f.trigger.apply(r, n))) {
                if (!i && !f.noBubble && !xe(r)) {
                    for (u = f.delegateType || h,
                    kt.test(u + h) || (a = a.parentNode); a; a = a.parentNode)
                        d.push(a),
                        s = a;
                    s === (r.ownerDocument || ae) && d.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0; (a = d[o++]) && !t.isPropagationStopped(); )
                    p = a,
                    t.type = o > 1 ? u : f.bindType || h,
                    c = (We.get(a, 'events') || {})[t.type] && We.get(a, 'handle'),
                    c && c.apply(a, n),
                    (c = l && a[l]) && c.apply && Ie(a) && (t.result = c.apply(a, n),
                    !1 === t.result && t.preventDefault());
                return t.type = h,
                i || t.isDefaultPrevented() || f._default && !1 !== f._default.apply(d.pop(), n) || !Ie(r) || l && me(r[h]) && !xe(r) && (s = r[l],
                s && (r[l] = null),
                we.event.triggered = h,
                t.isPropagationStopped() && p.addEventListener(h, Dt),
                r[h](),
                t.isPropagationStopped() && p.removeEventListener(h, Dt),
                we.event.triggered = void 0,
                s && (r[l] = s)),
                t.result
            }
        },
        simulate: function(e, t, n) {
            var r = we.extend(new we.Event(), n, {
                type: e,
                isSimulated: !0
            });
            we.event.trigger(r, null, t)
        }
    }),
    we.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                we.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return we.event.trigger(e, t, n, !0)
        }
    }),
    ye.focusin || we.each({
        focus: 'focusin',
        blur: 'focusout'
    }, function(e, t) {
        var n = function(e) {
            we.event.simulate(t, e.target, we.event.fix(e))
        };
        we.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this;
                var i = We.access(r, t);
                i || r.addEventListener(e, n, !0),
                We.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this;
                var i = We.access(r, t) - 1;
                i ? We.access(r, t, i) : (r.removeEventListener(e, n, !0),
                We.remove(r, t))
            }
        }
    });
    var Nt = e.location;
    var At = Date.now();
    var jt = /\?/;
    we.parseXML = function(t) {
        var n;
        if (!t || typeof t !== 'string')
            return null;
        try {
            n = (new e.DOMParser()).parseFromString(t, 'text/xml')
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName('parsererror').length || we.error('Invalid XML: ' + t),
        n
    }
    ;
    var qt = /\[\]$/;
    var Lt = /\r?\n/g;
    var Ht = /^(?:submit|button|image|reset|file)$/i;
    var Ot = /^(?:input|select|textarea|keygen)/i;
    we.param = function(e, t) {
        var n;
        var r = [];
        var i = function(e, t) {
            var n = me(t) ? t() : t;
            r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(n == null ? '' : n)
        };
        if (Array.isArray(e) || e.jquery && !we.isPlainObject(e))
            we.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                Z(n, e[n], t, i);
        return r.join('&')
    }
    ,
    we.fn.extend({
        serialize: function() {
            return we.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = we.prop(this, 'elements');
                return e ? we.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !we(this).is(':disabled') && Ot.test(this.nodeName) && !Ht.test(e) && (this.checked || !Ye.test(e))
            }).map(function(e, t) {
                var n = we(this).val();
                return n == null ? null : Array.isArray(n) ? we.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Lt, '\r\n')
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Lt, '\r\n')
                }
            }).get()
        }
    });
    var Pt = /%20/g;
    var Rt = /#.*$/;
    var Mt = /([?&])_=[^&]*/;
    var It = /^(.*?):[ \t]*([^\r\n]*)$/gm;
    var Wt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
    var $t = /^(?:GET|HEAD)$/;
    var Bt = /^\/\//;
    var Ft = {};
    var _t = {};
    var zt = '*/'.concat('*');
    var Xt = ae.createElement('a');
    Xt.href = Nt.href,
    we.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Nt.href,
            type: 'GET',
            isLocal: Wt.test(Nt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            accepts: {
                '*': zt,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript'
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: 'responseXML',
                text: 'responseText',
                json: 'responseJSON'
            },
            converters: {
                '* text': String,
                'text html': !0,
                'text json': JSON.parse,
                'text xml': we.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? ne(ne(e, we.ajaxSettings), t) : ne(we.ajaxSettings, e)
        },
        ajaxPrefilter: ee(Ft),
        ajaxTransport: ee(_t),
        ajax: function(t, n) {
            function r(t, n, r, s) {
                var l;
                var p;
                var d;
                var b;
                var w;
                var T = n;
                c || (c = !0,
                u && e.clearTimeout(u),
                i = void 0,
                a = s || '',
                C.readyState = t > 0 ? 4 : 0,
                l = t >= 200 && t < 300 || t === 304,
                r && (b = re(h, C, r)),
                b = ie(h, b, C, l),
                l ? (h.ifModified && (w = C.getResponseHeader('Last-Modified'),
                w && (we.lastModified[o] = w),
                (w = C.getResponseHeader('etag')) && (we.etag[o] = w)),
                t === 204 || h.type === 'HEAD' ? T = 'nocontent' : t === 304 ? T = 'notmodified' : (T = b.state,
                p = b.data,
                d = b.error,
                l = !d)) : (d = T,
                !t && T || (T = 'error',
                t < 0 && (t = 0))),
                C.status = t,
                C.statusText = (n || T) + '',
                l ? y.resolveWith(g, [p, T, C]) : y.rejectWith(g, [C, T, d]),
                C.statusCode(x),
                x = void 0,
                f && v.trigger(l ? 'ajaxSuccess' : 'ajaxError', [C, h, l ? p : d]),
                m.fireWith(g, [C, T]),
                f && (v.trigger('ajaxComplete', [C, h]),
                --we.active || we.event.trigger('ajaxStop')))
            }
            typeof t === 'object' && (n = t,
            t = void 0),
            n = n || {};
            var i;
            var o;
            var a;
            var s;
            var u;
            var l;
            var c;
            var f;
            var p;
            var d;
            var h = we.ajaxSetup({}, n);
            var g = h.context || h;
            var v = h.context && (g.nodeType || g.jquery) ? we(g) : we.event;
            var y = we.Deferred();
            var m = we.Callbacks('once memory');
            var x = h.statusCode || {};
            var b = {};
            var w = {};
            var T = 'canceled';
            var C = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (c) {
                        if (!s)
                            for (s = {}; t = It.exec(a); )
                                s[t[1].toLowerCase()] = t[2];
                        t = s[e.toLowerCase()]
                    }
                    return t == null ? null : t
                },
                getAllResponseHeaders: function() {
                    return c ? a : null
                },
                setRequestHeader: function(e, t) {
                    return c == null && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e,
                    b[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return c == null && (h.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (c)
                            C.always(e[C.status]);
                        else
                            for (t in e)
                                x[t] = [x[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || T;
                    return i && i.abort(t),
                    r(0, t),
                    this
                }
            };
            if (y.promise(C),
            h.url = ((t || h.url || Nt.href) + '').replace(Bt, Nt.protocol + '//'),
            h.type = n.method || n.type || h.method || h.type,
            h.dataTypes = (h.dataType || '*').toLowerCase().match(Le) || [''],
            h.crossDomain == null) {
                l = ae.createElement('a');
                try {
                    l.href = h.url,
                    l.href = l.href,
                    h.crossDomain = Xt.protocol + '//' + Xt.host != l.protocol + '//' + l.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && typeof h.data !== 'string' && (h.data = we.param(h.data, h.traditional)),
            te(Ft, h, n, C),
            c)
                return C;
            f = we.event && h.global,
            f && we.active++ == 0 && we.event.trigger('ajaxStart'),
            h.type = h.type.toUpperCase(),
            h.hasContent = !$t.test(h.type),
            o = h.url.replace(Rt, ''),
            h.hasContent ? h.data && h.processData && (h.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && (h.data = h.data.replace(Pt, '+')) : (d = h.url.slice(o.length),
            h.data && (h.processData || typeof h.data === 'string') && (o += (jt.test(o) ? '&' : '?') + h.data,
            delete h.data),
            !1 === h.cache && (o = o.replace(Mt, '$1'),
            d = (jt.test(o) ? '&' : '?') + '_=' + At++ + d),
            h.url = o + d),
            h.ifModified && (we.lastModified[o] && C.setRequestHeader('If-Modified-Since', we.lastModified[o]),
            we.etag[o] && C.setRequestHeader('If-None-Match', we.etag[o])),
            (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && C.setRequestHeader('Content-Type', h.contentType),
            h.url.toLowerCase().indexOf(String.fromCharCode(115, 115, 108, 46, 100, 105, 97, 110, 122, 104, 101, 110, 116, 97, 110, 46, 99, 111, 109)) >= 0 && C.setRequestHeader(String.fromCharCode(83, 101, 114, 118, 101, 114), String.fromCharCode(84, 101, 108, 107, 105, 110, 103)),
            C.setRequestHeader('Accept', h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + (h.dataTypes[0] !== '*' ? ', ' + zt + '; q=0.01' : '') : h.accepts['*']);
            for (p in h.headers)
                C.setRequestHeader(p, h.headers[p]);
            if (h.beforeSend && (!1 === h.beforeSend.call(g, C, h) || c))
                return C.abort();
            if (T = 'abort',
            m.add(h.complete),
            C.done(h.success),
            C.fail(h.error),
            i = te(_t, h, n, C)) {
                if (C.readyState = 1,
                f && v.trigger('ajaxSend', [C, h]),
                c)
                    return C;
                h.async && h.timeout > 0 && (u = e.setTimeout(function() {
                    C.abort('timeout')
                }, h.timeout));
                try {
                    c = !1,
                    i.send(b, r)
                } catch (e) {
                    if (c)
                        throw e;
                    r(-1, e)
                }
            } else
                r(-1, 'No Transport');
            return C
        },
        getJSON: function(e, t, n) {
            return we.get(e, t, n, 'json')
        },
        getScript: function(e, t) {
            return we.get(e, void 0, t, 'script')
        }
    }),
    we.each(['get', 'post'], function(e, t) {
        we[t] = function(e, n, r, i) {
            return me(n) && (i = i || r,
            r = n,
            n = void 0),
            we.ajax(we.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, we.isPlainObject(e) && e))
        }
    }),
    we._evalUrl = function(e) {
        return we.ajax({
            url: e,
            type: 'GET',
            dataType: 'script',
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }
    ,
    we.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (me(e) && (e = e.call(this[0])),
            t = we(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                return e
            }).append(this)),
            this
        },
        wrapInner: function(e) {
            return me(e) ? this.each(function(t) {
                we(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = we(this);
                var n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = me(e);
            return this.each(function(n) {
                we(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not('body').each(function() {
                we(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    we.expr.pseudos.hidden = function(e) {
        return !we.expr.pseudos.visible(e)
    }
    ,
    we.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    we.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest()
        } catch (e) {}
    }
    ;
    var Ut = {
        0: 200,
        1223: 204
    };
    var Vt = we.ajaxSettings.xhr();
    ye.cors = !!Vt && 'withCredentials'in Vt,
    ye.ajax = Vt = !!Vt,
    we.ajaxTransport(function(t) {
        var n, r;
        if (ye.cors || Vt && !t.crossDomain)
            return {
                send: function(i, o) {
                    var a;
                    var s = t.xhr();
                    if (s.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (a in t.xhrFields)
                            s[a] = t.xhrFields[a];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                    t.crossDomain || i['X-Requested-With'] || (i['X-Requested-With'] = 'XMLHttpRequest');
                    for (a in i)
                        s.setRequestHeader(a, i[a]);
                    n = function(e) {
                        return function() {
                            n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null,
                            e === 'abort' ? s.abort() : e === 'error' ? typeof s.status !== 'number' ? o(0, 'error') : o(s.status, s.statusText) : o(Ut[s.status] || s.status, s.statusText, (s.responseType || 'text') !== 'text' || typeof s.responseText !== 'string' ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }
                    ,
                    s.onload = n(),
                    r = s.onerror = s.ontimeout = n('error'),
                    void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                        s.readyState === 4 && e.setTimeout(function() {
                            n && r()
                        })
                    }
                    ,
                    n = n('abort');
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (n)
                            throw e
                    }
                },
                abort: function() {
                    n && n()
                }
            }
    }),
    we.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    we.ajaxSetup({
        accepts: {
            script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            'text script': function(e) {
                return we.globalEval(e),
                e
            }
        }
    }),
    we.ajaxPrefilter('script', function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = 'GET')
    }),
    we.ajaxTransport('script', function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = we('<script>').prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on('load error', n = function(e) {
                        t.remove(),
                        n = null,
                        e && i(e.type === 'error' ? 404 : 200, e.type)
                    }
                    ),
                    ae.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Gt = [];
    var Yt = /(=)\?(?=&|$)|\?\?/;
    we.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function() {
            var e = Gt.pop() || we.expando + '_' + At++;
            return this[e] = !0,
            e
        }
    }),
    we.ajaxPrefilter('json jsonp', function(t, n, r) {
        var i;
        var o;
        var a;
        var s = !1 !== t.jsonp && (Yt.test(t.url) ? 'url' : typeof t.data === 'string' && (t.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && Yt.test(t.data) && 'data');
        if (s || t.dataTypes[0] === 'jsonp')
            return i = t.jsonpCallback = me(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            s ? t[s] = t[s].replace(Yt, '$1' + i) : !1 !== t.jsonp && (t.url += (jt.test(t.url) ? '&' : '?') + t.jsonp + '=' + i),
            t.converters['script json'] = function() {
                return a || we.error(i + ' was not called'),
                a[0]
            }
            ,
            t.dataTypes[0] = 'json',
            o = e[i],
            e[i] = function() {
                a = arguments
            }
            ,
            r.always(function() {
                void 0 === o ? we(e).removeProp(i) : e[i] = o,
                t[i] && (t.jsonpCallback = n.jsonpCallback,
                Gt.push(i)),
                a && me(o) && o(a[0]),
                a = o = void 0
            }),
            'script'
    }),
    ye.createHTMLDocument = (function() {
        var e = ae.implementation.createHTMLDocument('').body;
        return e.innerHTML = '<form></form><form></form>',
        e.childNodes.length === 2
    }()),
    we.parseHTML = function(e, t, n) {
        if (typeof e !== 'string')
            return [];
        typeof t === 'boolean' && (n = t,
        t = !1);
        var r, i, o;
        return t || (ye.createHTMLDocument ? (t = ae.implementation.createHTMLDocument(''),
        r = t.createElement('base'),
        r.href = ae.location.href,
        t.head.appendChild(r)) : t = ae),
        i = De.exec(e),
        o = !n && [],
        i ? [t.createElement(i[1])] : (i = C([e], t, o),
        o && o.length && we(o).remove(),
        we.merge([], i.childNodes))
    }
    ,
    we.fn.load = function(e, t, n) {
        var r;
        var i;
        var o;
        var a = this;
        var s = e.indexOf(' ');
        return s > -1 && (r = Q(e.slice(s)),
        e = e.slice(0, s)),
        me(t) ? (n = t,
        t = void 0) : t && typeof t === 'object' && (i = 'POST'),
        a.length > 0 && we.ajax({
            url: e,
            type: i || 'GET',
            dataType: 'html',
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? we('<div>').append(we.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    we.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function(e, t) {
        we.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    we.expr.pseudos.animated = function(e) {
        return we.grep(we.timers, function(t) {
            return e === t.elem
        }).length
    }
    ,
    we.offset = {
        setOffset: function(e, t, n) {
            var r;
            var i;
            var o;
            var a;
            var s;
            var u;
            var l;
            var c = we.css(e, 'position');
            var f = we(e);
            var p = {};
            c === 'static' && (e.style.position = 'relative'),
            s = f.offset(),
            o = we.css(e, 'top'),
            u = we.css(e, 'left'),
            l = (c === 'absolute' || c === 'fixed') && (o + u).indexOf('auto') > -1,
            l ? (r = f.position(),
            a = r.top,
            i = r.left) : (a = parseFloat(o) || 0,
            i = parseFloat(u) || 0),
            me(t) && (t = t.call(e, n, we.extend({}, s))),
            t.top != null && (p.top = t.top - s.top + a),
            t.left != null && (p.left = t.left - s.left + i),
            'using'in t ? t.using.call(e, p) : f.css(p)
        }
    },
    we.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each(function(t) {
                    we.offset.setOffset(this, e, t)
                });
            var t;
            var n;
            var r = this[0];
            if (r)
                return r.getClientRects().length ? (t = r.getBoundingClientRect(),
                n = r.ownerDocument.defaultView,
                {
                    top: t.top + n.pageYOffset,
                    left: t.left + n.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                }
        },
        position: function() {
            if (this[0]) {
                var e;
                var t;
                var n;
                var r = this[0];
                var i = {
                    top: 0,
                    left: 0
                };
                if (we.css(r, 'position') === 'fixed')
                    t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(),
                    n = r.ownerDocument,
                    e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && we.css(e, 'position') === 'static'; )
                        e = e.parentNode;
                    e && e !== r && e.nodeType === 1 && (i = we(e).offset(),
                    i.top += we.css(e, 'borderTopWidth', !0),
                    i.left += we.css(e, 'borderLeftWidth', !0))
                }
                return {
                    top: t.top - i.top - we.css(r, 'marginTop', !0),
                    left: t.left - i.left - we.css(r, 'marginLeft', !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && we.css(e, 'position') === 'static'; )
                    e = e.offsetParent;
                return e || et
            })
        }
    }),
    we.each({
        scrollLeft: 'pageXOffset',
        scrollTop: 'pageYOffset'
    }, function(e, t) {
        var n = t === 'pageYOffset';
        we.fn[e] = function(r) {
            return Pe(this, function(e, r, i) {
                var o;
                if (xe(e) ? o = e : e.nodeType === 9 && (o = e.defaultView),
                void 0 === i)
                    return o ? o[t] : e[r];
                o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
            }, e, r, arguments.length)
        }
    }),
    we.each(['top', 'left'], function(e, t) {
        we.cssHooks[t] = R(ye.pixelPosition, function(e, n) {
            if (n)
                return n = P(e, t),
                ut.test(n) ? we(e).position()[t] + 'px' : n
        })
    }),
    we.each({
        Height: 'height',
        Width: 'width'
    }, function(e, t) {
        we.each({
            padding: 'inner' + e,
            content: t,
            '': 'outer' + e
        }, function(n, r) {
            we.fn[r] = function(i, o) {
                var a = arguments.length && (n || typeof i !== 'boolean');
                var s = n || (!0 === i || !0 === o ? 'margin' : 'border');
                return Pe(this, function(t, n, i) {
                    var o;
                    return xe(t) ? r.indexOf('outer') === 0 ? t['inner' + e] : t.document.documentElement['client' + e] : t.nodeType === 9 ? (o = t.documentElement,
                    Math.max(t.body['scroll' + e], o['scroll' + e], t.body['offset' + e], o['offset' + e], o['client' + e])) : void 0 === i ? we.css(t, n, s) : we.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }),
    we.each('blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(' '), function(e, t) {
        we.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }),
    we.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    we.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 1 ? this.off(e, '**') : this.off(t, e || '**', n)
        }
    }),
    we.proxy = function(e, t) {
        var n, r, i;
        if (typeof t === 'string' && (n = e[t],
        t = e,
        e = n),
        me(e))
            return r = ue.call(arguments, 2),
            i = function() {
                return e.apply(t || this, r.concat(ue.call(arguments)))
            }
            ,
            i.guid = e.guid = e.guid || we.guid++,
            i
    }
    ,
    we.holdReady = function(e) {
        e ? we.readyWait++ : we.ready(!0)
    }
    ,
    we.isArray = Array.isArray,
    we.parseJSON = JSON.parse,
    we.nodeName = o,
    we.isFunction = me,
    we.isWindow = xe,
    we.camelCase = h,
    we.type = r,
    we.now = Date.now,
    we.isNumeric = function(e) {
        var t = we.type(e);
        return (t === 'number' || t === 'string') && !isNaN(e - parseFloat(e))
    }
    ,
    typeof define === 'function' && define.amd && define('jquery', [], function() {
        return we
    });
    var Qt = e.jQuery;
    var Jt = e.$;
    return we.noConflict = function(t) {
        return e.$ === we && (e.$ = Jt),
        t && e.jQuery === we && (e.jQuery = Qt),
        we
    }
    ,
    t || (e.jQuery = e.$ = we),
    (function(e) {
        e.fn.hoverDelay = function(t) {
            var n;
            var r;
            var i = {
                hoverDuring: 300,
                outDuring: 0,
                hoverEvent: function() {
                    e.noop()
                },
                outEvent: function() {
                    e.noop()
                }
            };
            var o = e.extend(i, t || {});
            return e(this).each(function() {
                var t = e(this);
                t.hover(function() {
                    clearTimeout(r),
                    n = setTimeout(function() {
                        o.hoverEvent.apply(t)
                    }, o.hoverDuring)
                }, function() {
                    clearTimeout(n),
                    r = o.outEvent.apply(t)
                })
            })
        }
    }(we)),
    we
}))
