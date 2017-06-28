function p(a) {
    this.cards = a ? a.cards : []
}
p.prototype.add = function(a) {
    this.cards.push(a)
};
p.prototype.get = function(a) {
    return this.cards[a]
};
p.prototype.length = function() {
    return this.cards.length
};
p.prototype.pop = function() {
    return this.cards.pop()
};
p.prototype.indexOf = function(a) {
    return this.cards.indexOf(a)
};
p.prototype.remove = function(a) {
    a = this.indexOf(a);
    if (-1 == a) return !1;
    this.cards.splice(a, 1);
    return !0
};

function r() {}
r.prototype.restore = function(a) {
    if (!a.rules && !a.rules.cardsToDraw) return !1;
    this.deck = new p(a.deck);
    this.stock = new p(a.stock);
    this.rules = a.rules;
    this.tableausFaceDown = [];
    for (var b = 0; b != a.tableausFaceDown.length; b++) this.tableausFaceDown.push(new p(a.tableausFaceDown[b]));
    this.tableausFaceUp = [];
    for (b = 0; b != a.tableausFaceUp.length; b++) this.tableausFaceUp.push(new p(a.tableausFaceUp[b]));
    this.waste = new p(a.waste);
    this.foundations = [];
    for (b = 0; b != a.foundations.length; b++) this.foundations.push(new p(a.foundations[b]));
    return !0
};

function t(a) {
    if (0 == a.stock.length())
        for (; a.waste.length();) {
            var b = a.waste.pop();
            a.stock.add(b)
        } else
            for (var c = 0; c != a.rules.cardsToDraw && a.stock.length(); c++) b = a.stock.pop(), a.waste.add(b)
}

function u(a) {
    var b = a % 13;
    return 0 == b ? [] : 2 > Math.floor(a / 13) ? [26 + (b - 1), 39 + (b - 1)] : [0 + (b - 1), 13 + (b - 1)]
}

function v(a) {
    var b = a % 13;
    return 12 == b ? [] : [13 * Math.floor(a / 13) + (b + 1)]
}
r.prototype.remove = function(a) {
    for (var b = 0; 7 != b; b++) {
        var c = this.tableausFaceUp[b];
        if (c.remove(a)) return 0 == c.length() && (a = this.tableausFaceDown[b], 0 < a.length() && (a = a.pop(), c.cards.splice(0, 0, a))), !0
    }
    if (this.stock.remove(a) || this.waste.remove(a)) return !0;
    for (c = 0; 4 != c; c++)
        if (this.foundations[c].remove(a)) return !0;
    return !1
};

function w(a, b, c) {
    for (; b;) {
        var d;
        a: {
            d = a;
            for (var e = b, f = 0; 7 != f; f++) {
                var n = d.tableausFaceUp[f],
                    g = n.indexOf(e);
                if (-1 != g && g < n.length() - 1) {
                    d = n.get(g + 1);
                    break a
                }
            }
            d = null
        }
        a.remove(b) && a.tableausFaceUp[c].add(b);
        b = d
    }
};

function x(a, b, c) {
    var d = document.createElement("span");
    d.style.width = a.g + "px";
    d.style.height = a.f + "px";
    d.className = "placeholder";
    d.style.backgroundPosition = "-" + a.g * a.Q + "px -" + a.f * a.v + "px";
    d.style.left = b + "px";
    d.style.top = c + "px";
    a.F.appendChild(d)
}

function z(a, b, c) {
    var d = document.createElement("span");
    d.style.width = a.g + "px";
    d.style.height = a.f + "px";
    d.className = "overlay";
    d.style.left = b + "px";
    d.style.top = c + "px";
    a.D.appendChild(d);
    return d
}

function A(a) {
    var b = document.createElement("span");
    b.style.width = a.g + "px";
    b.style.height = a.f + "px";
    b.className = "card";
    B(a, b);
    return b
}

function D(a) {
    var b = document.createElement("span");
    b.className = "indicator";
    b.style.width = a.N + "px";
    b.style.height = a.K + "px";
    b.style.backgroundPosition = "-" + a.O + "px -" + a.P + "px";
    return b
}

function B(a, b) {
    b.style.backgroundPosition = a.g * a.I + "px -" + a.f * a.v + "px"
}

function E(a, b, c) {
    b.style.backgroundPosition = "-" + a.g * (c % 13) + "px -" + a.f * Math.floor(c / 13) + "px"
}

function F(a, b, c, d, e) {
    a.o.hasOwnProperty(b) || (a.o[b] = {});
    a.o[b][c + "/" + d] = (new Date).getTime();
    var f = a.a[b];
    G(a, f, null, null);
    if (Math.round(f.offsetLeft) == Math.round(c) && Math.round(f.offsetTop) == Math.round(d)) f.style.B = "none", f.style.zIndex = 0, e();
    else {
        f.style.zIndex = 1;
        var n = (new Date).getTime();
        a.d[b] = {
            startTime: n,
            U: n + a.J,
            G: f.offsetLeft,
            H: f.offsetTop,
            r: c,
            s: d,
            Z: e
        }
    }
}

function J(a, b, c, d) {
    a.V = d.clientX;
    a.W = d.clientY;
    for (d = 0; 52 != d; d++) {
        var e = a.a[d];
        e.onmousemove = null;
        e.onclick = null
    }
    a.c.style.display = "none";
    a.C = !0;
    document.onmousemove = function(d) {
        if (a.C)
            for (k in a.C = !1, b) {
                var c = a.a[b[k]];
                c.style.zIndex = 1;
                c.style.B = "rgba(0, 0, 0, 0.497656) -3px -3px 12px inset, rgba(0, 0, 0, 0.398438) 4px 5px 5px"
            } else
                for (k in b) c = a.a[b[k]], c.style.left = c.offsetLeft + d.clientX - a.X + "px", c.style.top = c.offsetTop + d.clientY - a.Y + "px";
        a.X = d.clientX;
        a.Y = d.clientY
    };
    document.onmouseup = function(d) {
        var e =
            a.V == d.clientX && a.W == d.clientY,
            g = b[0],
            q = a.a[g];
        if (d = a.b[g]) {
            if (e) {
                var l = Number.MAX_VALUE,
                    h = [];
                for (k in d)
                    if (e = d[k], 1 == b.length || e.e) {
                        var m = a.o[g][e.x + "/" + e.y];
                        m || (m = Number.MIN_VALUE);
                        m == l ? h.push(e) : m < l && (l = m, h = [e])
                    }
                h && (d = h);
                g = Number.MIN_VALUE;
                l = [];
                for (k in d)
                    if (e = d[k], 1 == b.length || e.e) h = e.q, h == g ? l.push(e) : h > g && (g = h, l = [e]);
                l && (d = l)
            }
            g = q.offsetLeft;
            q = q.offsetTop;
            l = Number.MAX_VALUE;
            for (k in d)
                if (e = d[k], 1 == b.length || e.e) h = Math.pow(g - e.x, 2) + Math.pow(q - e.y, 2), h < l && (l = h, closestSlot = e);
            closestSlot && closestSlot.action()
        }
        document.onmousemove =
            null;
        document.onmouseup = null;
        K(c);
        L(a, c)
    }
}

function G(a, b, c, d) {
    d || c ? b.onmousemove = function() {
        a.c.style.left = b.offsetLeft + a.L + "px";
        a.c.style.top = b.offsetTop + a.M + "px";
        b.parentNode.insertBefore(a.c, b.nextSibling);
        a.c.style.display = "block";
        a.c.onmousedown = c;
        b.onmousedown = c;
        a.c.onclick = d;
        b.onclick = d;
        a.c.onmouseout = function() {
            a.c.style.display = "none"
        }
    } : (b.onclick = null, b.onmousemove = null, b.onmousedown = null)
}

function M(a, b) {
    a.p.removeChild(b);
    a.p.appendChild(b)
}

function N(a, b) {
    a.style.B = "none";
    a.style.zIndex = 0;
    b.Z()
}

function L(a, b) {
    a.b = {};
    for (k in a.d) {
        var c = a.d[k],
            d = a.a[k];
        d.style.left = c.r + "px";
        d.style.top = c.s + "px";
        N(d, c);
        delete a.d[k]
    }
    for (var e = 0; 4 != e; e++) {
        var f = b.foundations[e],
            n = a.w + a.A * e,
            g = f.length();
        if (0 == g) {
            var q = [0, 13, 26, 39];
            for (k in q) {
                var l = q[k],
                    h = a.b[l];
                null == h && (h = []);
                new function(d, c, e) {
                    h.push({
                        x: e,
                        y: a.l,
                        action: function() {
                            b.remove(d) && b.foundations[c].add(d)
                        },
                        q: 3,
                        e: !1
                    })
                }(l, e, n);
                a.b[l] = h
            }
        } else
            for (var m = 0; m < g; m++) {
                var c = f.get(m),
                    d = a.a[c],
                    y;
                if (m == g - 1) {
                    var H = [c];
                    new function(d, c, e) {
                        y = function() {
                            E(a,
                                c, e);
                            G(a, c, function(c) {
                                J(a, d, b, c)
                            })
                        }
                    }(H, d, c);
                    q = v(c);
                    for (k in q) l = q[k], h = a.b[l], null == h && (h = []), new function(d, c) {
                        h.push({
                            x: n,
                            y: a.l,
                            action: function() {
                                b.remove(d) && b.foundations[c].add(d)
                            },
                            q: 3,
                            e: !1
                        })
                    }(l, e), a.b[l] = h
                } else y = function() {};
                F(a, c, n, a.l, y);
                M(a, d)
            }
    }
    for (e = 0; 7 != e; e++) {
        f = b.tableausFaceDown[e];
        g = f.length();
        for (m = 0; m < g; m++) c = f.get(m), d = a.a[c], F(a, c, a.i + a.j * e, a.k + a.n * m, function() {}), B(a, d), M(a, d);
        var f = b.tableausFaceUp[e],
            I = f.length();
        if (0 == I)
            for (k in q = [12, 25, 38, 51], q) l = q[k], h = a.b[l], null == h && (h = []), new function(d, c) {
                h.push({
                    x: a.i + a.j * c,
                    y: a.k + 0 * a.n,
                    action: function() {
                        w(b, d, c)
                    },
                    q: 2,
                    e: !0
                })
            }(l, e, m), a.b[l] = h;
        else
            for (m = 0; m < I; m++) {
                c = f.get(m);
                d = a.a[c];
                H = f.cards.slice(m);
                if (m == I - 1)
                    for (k in q = u(c), q) l = q[k], h = a.b[l], null == h && (h = []), new function(d, c, e, f) {
                        h.push({
                            x: a.i + a.j * c,
                            y: a.k + a.n * (e + f + 1),
                            action: function() {
                                w(b, d, c)
                            },
                            q: 2,
                            e: !0
                        })
                    }(l, e, m, g), a.b[l] = h;
                new function(d, c, e) {
                    y = function() {
                        E(a, c, e);
                        G(a, c, function(c) {
                            J(a, d, b, c)
                        })
                    }
                }(H, d, c);
                F(a, c, a.i + a.j * e, a.k + a.n * (m + g), y);
                M(a, d)
            }
    }
    for (var q = b.stock.length(), s =
            0; s != q; s++) c = b.stock.get(s), d = a.a[c], B(a, d), M(a, d), F(a, c, a.m, a.h, function() {});
    G(a, a.$, null, function() {
        t(b);
        K(b);
        L(a, b)
    });
    for (var C = b.waste.length(), s = 0; s != C; s++) new function() {
        var d = b.waste.get(s),
            c = a.a[d],
            e;
        if (s == C - 1) {
            var f = [];
            f.push(d);
            e = function() {
                G(a, c, function(d) {
                    J(a, f, b, d)
                }, null);
                E(a, c, d)
            }
        } else e = function() {
            E(a, c, d)
        };
        M(a, c);
        var g = s - (C - Math.min(b.rules.cardsToDraw, C));
        0 > g && (g = 0);
        F(a, d, a.R + a.S * g, a.T, e)
    };
    if (0 == b.stock.length() && 1 >= b.waste.length()) {
        d = !1;
        for (e = 0; 7 != e; e++)
            if (f = b.tableausFaceDown[e],
                0 < f.length()) {
                d = !0;
                break
            }
        d || window.setTimeout(function() {
            for (var d = 0; 7 != d; d++) {
                var c = b.tableausFaceUp[d];
                if (0 < c.length() && (m = c.length() - 1, c = c.get(m), c = a.b[c]))
                    for (k in c) {
                        var e = c[k];
                        if (!e.e) {
                            e.action();
                            K(b);
                            L(a, b);
                            return
                        }
                    }
            }
        }, 400)
    }
}

function K(a) {
    3 < localStorage.gamePosition && delete localStorage["gamePosition" + (localStorage.gamePosition - 3)];
    localStorage.gamePosition++;
    localStorage["gamePosition" + localStorage.gamePosition] = JSON.stringify(a)
};
var O = new function() {
    function a() {
        window.setTimeout(a, 1E3 / this.u);
        var b = (new Date).getTime();
        for (k in d.d) {
            var c = d.d[k],
                n = d.a[k],
                g = (b - c.startTime) / (c.U - c.startTime);
            1 < g ? (n.style.left = c.r + "px", n.style.top = c.s + "px", N(n, c), delete d.d[k]) : (g = (Math.sin(g * (Math.PI / 2 - Math.PI / 4) + Math.PI / 4) - 0.5) / 0.5, n.style.left = g * (c.r - c.G) + c.G + "px", n.style.top = g * (c.s - c.H) + c.H + "px")
        }
    }
    this.t = document.getElementById("gameDiv");
    this.g = 103;
    this.f = 143;
    this.i = this.h = this.m = 42;
    this.k = 210;
    this.j = 115;
    this.n = 25;
    this.w = 386;
    this.A = 115;
    this.l = this.h;
    this.N = 109;
    this.K = 149;
    this.O = 1;
    this.P = 716;
    this.L = -4;
    this.M = -3;
    this.R = 196;
    this.S = 22;
    this.T = this.h;
    this.v = 4;
    this.I = 0;
    this.Q = 1;
    this.J = 250;
    this.u = 60;
    this.a = [];
    this.d = {};
    this.o = {};
    this.F = document.createElement("div");
    this.t.appendChild(this.F);
    this.p = document.createElement("div");
    this.t.appendChild(this.p);
    this.D = document.createElement("div");
    this.t.appendChild(this.D);
    for (var b = 0; 52 != b; b++) {
        var c = A(this);
        this.a[b] = c;
        this.p.appendChild(c)
    }
    var d = this;
    this.c = D(this);
    window.setTimeout(a, 1E3 /
        this.u);
    x(this, this.m, this.h);
    this.$ = z(this, this.m, this.h);
    for (b = 0; 7 != b; b++) x(this, this.i + this.j * b, d.k);
    for (b = 0; 4 != b; b++) x(this, this.w + this.A * b, d.l)
};
window.redraw = function() {
    var a = P = new r,
        b = JSON.parse(localStorage.rules);
    a.deck = new p;
    a.stock = new p;
    a.tableausFaceDown = [];
    a.tableausFaceUp = [];
    a.waste = new p;
    a.foundations = [];
    a.rules = b;
    for (b = 0; 52 != b; b++) a.deck.add(b);
    var b = Q(localStorage.seed),
        c = a.deck.cards,
        d, e, f = c.length;
    if (f)
        for (; --f;) e = Math.floor(b() * (f + 1)), d = c[e], c[e] = c[f], c[f] = d;
    for (b = 0; 7 != b; b++) {
        a.tableausFaceDown[b] = new p;
        for (c = 0; c <= b - 1; c++) a.tableausFaceDown[b].add(a.deck.pop());
        a.tableausFaceUp[b] = new p;
        a.tableausFaceUp[b].add(a.deck.pop())
    }
    for (; 0 <
        a.deck.length();) a.stock.add(a.deck.pop());
    for (b = 0; 4 != b; b++) a.foundations[b] = new p;
    L(O, P);
    t(P);
    K(P);
    L(O, P)
};
window.newGame = function(a) {
    localStorage.gamePosition = 0;
    localStorage.version = 2;
    localStorage.seed = Math.floor(1E5 * Math.random());
    localStorage.rules = JSON.stringify(a);
    window.redraw()
};
document.oncontextmenu = function() {
    return !1
};
var P;
0 < localStorage.gamePosition && 2 == localStorage.version ? (P = new r, P.restore(JSON.parse(localStorage["gamePosition" + localStorage.gamePosition])) ? (L(O, P), L(O, P)) : window.newGame({
    cardsToDraw: 3
})) : window.newGame({
    cardsToDraw: 3
});

function R() {
    return 1 < localStorage.gamePosition && localStorage["gamePosition" + (localStorage.gamePosition - 1)]
}
window.undo = function() {
    R() && (localStorage.gamePosition--, P = new r, P.restore(JSON.parse(localStorage["gamePosition" + localStorage.gamePosition])), L(O, P))
};
window.applicationCache && window.applicationCache.addEventListener("updateready", function() {
    window.applicationCache.status == window.applicationCache.UPDATEREADY && window.applicationCache.swapCache()
}, !1);



document.addEventListener("keypress", function(a) {
    a.ctrlKey && 26 === a.which && window.undo()
}, !1);


function V() {
    function a(a) {
        a = a.toString();
        for (var d = 0; d < a.length; d++) {
            b += a.charCodeAt(d);
            var e = 0.02519603282416938 * b;
            b = e >>> 0;
            e -= b;
            e *= b;
            b = e >>> 0;
            e -= b;
            b += 4294967296 * e
        }
        return 2.3283064365386963E-10 * (b >>> 0)
    }
    var b = 4022871197;
    a.version = "Mash 0.9";
    return a
}

function Q() {
    return function(a) {
        function b() {
            var a = 2091639 * c + 2.3283064365386963E-10 * f;
            c = d;
            d = e;
            return e = a - (f = a | 0)
        }
        var c = 0,
            d = 0,
            e = 0,
            f = 1;
        0 == a.length && (a = [+new Date]);
        for (var n = V(), c = n(" "), d = n(" "), e = n(" "), g = 0; g < a.length; g++) c -= n(a[g]), 0 > c && (c += 1), d -= n(a[g]), 0 > d && (d += 1), e -= n(a[g]), 0 > e && (e += 1);
        n = null;
        b.ca = function() {
            return 4294967296 * b()
        };
        b.ba = function() {
            return b() + 1.1102230246251565E-16 * (2097152 * b() | 0)
        };
        b.version = "Alea 0.9";
        b.aa = a;
        return b
    }(Array.prototype.slice.call(arguments))
};