import { useSignal as A, useComputed as j } from "@preact/signals";
import { options as S, Fragment as x } from "preact";
var E, y, H, L, C = 0, X = [], w = [], l = S, V = l.__b, N = l.__r, I = l.diffed, P = l.__c, Y = l.unmount, B = l.__;
function ne(e, t) {
  l.__h && l.__h(y, e, C || t), C = 0;
  var r = y.__H || (y.__H = { __: [], __h: [] });
  return e >= r.__.length && r.__.push({ __V: w }), r.__[e];
}
function oe(e) {
  return C = 5, ce(function() {
    return { current: e };
  }, []);
}
function ce(e, t) {
  var r = ne(E++, 7);
  return se(r.__H, t) ? (r.__V = e(), r.i = t, r.__h = e, r.__V) : r.__;
}
function ie() {
  for (var e; e = X.shift(); )
    if (e.__P && e.__H)
      try {
        e.__H.__h.forEach(T), e.__H.__h.forEach(q), e.__H.__h = [];
      } catch (t) {
        e.__H.__h = [], l.__e(t, e.__v);
      }
}
l.__b = function(e) {
  y = null, V && V(e);
}, l.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), B && B(e, t);
}, l.__r = function(e) {
  N && N(e), E = 0;
  var t = (y = e.__c).__H;
  t && (H === y ? (t.__h = [], y.__h = [], t.__.forEach(function(r) {
    r.__N && (r.__ = r.__N), r.__V = w, r.__N = r.i = void 0;
  })) : (t.__h.forEach(T), t.__h.forEach(q), t.__h = [], E = 0)), H = y;
}, l.diffed = function(e) {
  I && I(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (X.push(t) !== 1 && L === l.requestAnimationFrame || ((L = l.requestAnimationFrame) || le)(ie)), t.__H.__.forEach(function(r) {
    r.i && (r.__H = r.i), r.__V !== w && (r.__ = r.__V), r.i = void 0, r.__V = w;
  })), H = y = null;
}, l.__c = function(e, t) {
  t.some(function(r) {
    try {
      r.__h.forEach(T), r.__h = r.__h.filter(function(o) {
        return !o.__ || q(o);
      });
    } catch (o) {
      t.some(function(_) {
        _.__h && (_.__h = []);
      }), t = [], l.__e(o, r.__v);
    }
  }), P && P(e, t);
}, l.unmount = function(e) {
  Y && Y(e);
  var t, r = e.__c;
  r && r.__H && (r.__H.__.forEach(function(o) {
    try {
      T(o);
    } catch (_) {
      t = _;
    }
  }), r.__H = void 0, t && l.__e(t, r.__v));
};
var O = typeof requestAnimationFrame == "function";
function le(e) {
  var t, r = function() {
    clearTimeout(o), O && cancelAnimationFrame(t), setTimeout(e);
  }, o = setTimeout(r, 100);
  O && (t = requestAnimationFrame(r));
}
function T(e) {
  var t = y, r = e.__c;
  typeof r == "function" && (e.__c = void 0, r()), y = t;
}
function q(e) {
  var t = y;
  e.__c = e.__(), y = t;
}
function se(e, t) {
  return !e || e.length !== t.length || t.some(function(r, o) {
    return r !== e[o];
  });
}
function _e(e, t) {
  return new Date(t, e, 0).getDate();
}
function ue(e, t, {
  locale: r = void 0
} = {}) {
  const o = G(r), _ = _e(e + 1, t), d = F(1, _).map((h) => new Date(t, e, h)), u = o.findIndex((h) => h === J(d[0], r, {}));
  let n = u, a = F(0, u);
  const c = new Array(7 * 6).fill(-1);
  a.forEach((h, p) => {
    const m = new Date(d[0]);
    m.setDate(m.getDate() + (p - u)), c[h] = {
      previousMonth: !0,
      date: m
    };
  }), d.forEach((h, p) => {
    c[n++] = {
      date: h
    };
  });
  let f = n - 1;
  return c.slice(n).forEach((h, p) => {
    const m = c[f], b = new Date(m.date);
    b.setDate(b.getDate() + 1), c[++f] = {
      nextMonth: !0,
      date: b
    };
  }), c.reduce((h, p, m) => {
    const b = Math.floor(m / 7);
    return (h[b] || (h[b] = [])).push(p), h;
  }, []);
}
function W(e) {
  return Intl.DateTimeFormat("en-gb", {
    dateStyle: "medium"
  }).format(e).split(" ").slice(1).join(" ");
}
function F(e, t) {
  return t == null && (t = e, e = 0), new Array(t).fill(0).map((r, o) => e + o);
}
function G(e, t) {
  const r = new Array(7);
  return F(7).forEach((o, _) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + _), r[d.getDay()] = J(d, e, t);
  }), r;
}
function J(e, t = "en-gb", r = {}) {
  return Intl.DateTimeFormat(t, {
    weekday: r.format || "short"
  }).format(e);
}
function de(e, t = "en-gb") {
  return Intl.DateTimeFormat(t).format(e);
}
function z(e, t, r) {
  return e.filter((o) => fe(o, t, r));
}
function fe(e, t, r) {
  return t.getTime() < e.getTime() && r.getTime() > e.getTime();
}
function he(e, t) {
  return e.getTime() > t.getTime();
}
var ge = 0;
function i(e, t, r, o, _, d) {
  t || (t = {});
  var u, n, a = t;
  if ("ref" in a)
    for (n in a = {}, t)
      n == "ref" ? u = t[n] : a[n] = t[n];
  var c = { type: e, props: a, key: r, ref: u, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --ge, __i: -1, __u: 0, __source: _, __self: d };
  if (typeof e == "function" && (u = e.defaultProps))
    for (n in u)
      a[n] === void 0 && (a[n] = u[n]);
  return S.vnode && S.vnode(c), c;
}
function pe({
  value: e = /* @__PURE__ */ new Date(),
  mode: t = "single",
  onSelect: r = () => {
  },
  locale: o = "en-gb",
  weekdayFormat: _ = "narrow",
  arrowLeft: d = () => i(x, {
    children: "<"
  }),
  arrowRight: u = () => i(x, {
    children: ">"
  })
}) {
  const n = oe(!1), a = A([]), c = A(new Date(e)), f = A(null), h = G(o, {
    format: _
  }), p = j(() => {
    const s = c.value;
    return ue(s.getMonth(), s.getFullYear(), {
      weekdays: h
    });
  }), m = j(() => p.value.map((s) => s.map((v) => v.date)).flat(2)), b = t == "range" && Array.isArray(e) && (e == null ? void 0 : e.length) == 2 && !n.current ? z(m.value, e[0], e[1]) : [], Q = j(() => {
    const s = m.value;
    if (f.value && a.value.length == 1 && t == "range") {
      const v = [a.value[0], f.value].sort(he);
      return z(s, v[0], v[1]);
    }
    return [];
  });
  let R = 3;
  return i("div", {
    class: "preachjs-calendar",
    children: [i("div", {
      class: "preachjs-calendar--header",
      children: [i("button", {
        tabIndex: 1,
        "aria-label": "Previous",
        onClick: () => {
          const s = new Date(c.value);
          s.setMonth(s.getMonth() - 1), c.value = s;
        },
        children: i(d, {})
      }), i("h2", {
        "aria-hidden": "true",
        children: W(c.value)
      }), i("button", {
        tabIndex: 2,
        "aria-label": "Next",
        onClick: () => {
          const s = new Date(c.value);
          s.setMonth(s.getMonth() + 1), c.value = s;
        },
        children: i(u, {})
      })]
    }), i("table", {
      class: "preachjs-calendar--grid",
      role: "grid",
      autofocus: !0,
      tabIndex: 3,
      "aria-label": W(c.value),
      children: [i("thead", {
        class: "preachjs-calendar--grid-header",
        children: i("tr", {
          children: h.map((s) => i("th", {
            children: s
          }))
        })
      }), i("tbody", {
        class: "preachjs-calendar--grid-body",
        children: p.value.map((s, v) => i("tr", {
          children: s.map((g, D) => {
            const Z = t == "single" && !Array.isArray(e) && g.date.getTime() === e.getTime() || !1;
            let k, $, ee = b.includes(g.date) || Q.value.includes(g.date);
            t == "range" && (a.value.length && n.current ? k = g.date.getTime() === a.value[0].getTime() : Array.isArray(e) && !n.current && (k = e[0] && g.date.getTime() === e[0].getTime(), $ = e[1] && g.date.getTime() === e[1].getTime()));
            const M = ["preachjs-calendar--grid-cell", Z && "active", k && "preachjs-calendar--grid-cell-start", ee && "preachjs-calendar--grid-cell-in-range", $ && "preachjs-calendar--grid-cell-end"];
            return g.previousMonth || g.nextMonth ? i("td", {
              role: "gridcell",
              "data-row": v,
              "data-col": D,
              "aria-disabled": "true",
              class: U(M, "preachjs-calendar--grid-cell-disabled"),
              tabIndex: D + R + 7 * v,
              ref: K(t),
              children: i("button", {
                style: {
                  flex: 1
                },
                disabled: !0,
                children: g.date.getDate()
              })
            }) : i("td", {
              ref: K(t),
              tabIndex: D + R + 7 * v,
              "data-row": v,
              "data-col": D,
              "data-date": g.date.toISOString(),
              role: "gridcell",
              class: U(M, ""),
              children: i("button", {
                onClick: () => {
                  if (n.current = !0, t == "single") {
                    r(g.date), n.current = !1;
                    return;
                  }
                  if (t == "range")
                    if (a.value.push(g.date), a.value.length == 2) {
                      const te = a.value.slice();
                      a.value = [], r(te.sort((re, ae) => re.getTime() > ae.getTime())), n.current = !1;
                    } else
                      f.value = null, ye(window, f);
                },
                "aria-label": de(g.date, void 0),
                children: g.date.getDate()
              })
            });
          })
        }))
      })]
    })]
  });
}
function K(e) {
  return (t) => {
    t && e === "single" && t.addEventListener("keyup", (r) => {
      const o = Array.from(r.target.parentNode.classList.entries()).findIndex((a) => a[1] == "preachjs-calendar--grid-cell") > -1;
      if (!(Array.from(r.target.classList.entries()).findIndex((a) => a[1] == "preachjs-calendar--grid-cell") > -1 || o))
        return;
      const d = o ? r.target.parentNode : r.target, u = +d.dataset.row, n = +d.dataset.col;
      switch (console.log({
        k: r.key
      }), r.key) {
        case "ArrowDown": {
          const a = r.target.closest(".preachjs-calendar--grid-body").querySelector(`[data-row='${u + 1}'][data-col='${n}']`);
          a == null || a.querySelector("button").focus();
          break;
        }
        case "ArrowUp": {
          const a = r.target.closest(".preachjs-calendar--grid-body").querySelector(`[data-row='${u - 1}'][data-col='${n}']`);
          a == null || a.querySelector("button").focus();
          break;
        }
        case "ArrowRight": {
          let a = n + 1, c = u;
          a > 6 && (c += 1, a = 0);
          const f = r.target.closest(".preachjs-calendar--grid-body").querySelector(`[data-row='${c}'][data-col='${a}']`);
          f == null || f.querySelector("button").focus();
          break;
        }
        case "ArrowLeft": {
          let a = n - 1, c = u;
          a < 0 && (c -= 1, a = 6);
          const f = r.target.closest(".preachjs-calendar--grid-body").querySelector(`[data-row='${c}'][data-col='${a}']`);
          f == null || f.querySelector("button").focus();
          break;
        }
        case " ":
        case "Enter": {
          const a = r.target.closest("[data-row][data-col]");
          a == null || a.querySelector("button").click();
          break;
        }
      }
    });
  };
}
function ye(e, t) {
  e.addEventListener("mousemove", (r) => {
    const _ = document.elementFromPoint(r.clientX, r.clientY).closest(".preachjs-calendar--grid-cell");
    _ && (t.value = new Date(_.dataset.date));
  }, {
    passive: !0
  });
}
function U(e, ...t) {
  return t.filter(Boolean).concat(e.filter(Boolean)).join(" ");
}
export {
  pe as Calendar
};
