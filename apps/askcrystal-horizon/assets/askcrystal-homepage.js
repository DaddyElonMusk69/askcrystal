function xm(r, n) {
  for (var i = 0; i < n.length; i++) {
    const a = n[i];
    if (typeof a != "string" && !Array.isArray(a)) {
      for (const u in a)
        if (u !== "default" && !(u in r)) {
          const d = Object.getOwnPropertyDescriptor(a, u);
          d && Object.defineProperty(r, u, d.get ? d : {
            enumerable: !0,
            get: () => a[u]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
function cf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var qa = { exports: {} }, ns = {}, Ga = { exports: {} }, te = {};
var Ed;
function km() {
  if (Ed) return te;
  Ed = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), f = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), w = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function S(k) {
    return k === null || typeof k != "object" ? null : (k = b && k[b] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var I = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, P = Object.assign, j = {};
  function z(k, A, ee) {
    this.props = k, this.context = A, this.refs = j, this.updater = ee || I;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(k, A) {
    if (typeof k != "object" && typeof k != "function" && k != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, k, A, "setState");
  }, z.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function J() {
  }
  J.prototype = z.prototype;
  function ue(k, A, ee) {
    this.props = k, this.context = A, this.refs = j, this.updater = ee || I;
  }
  var Z = ue.prototype = new J();
  Z.constructor = ue, P(Z, z.prototype), Z.isPureReactComponent = !0;
  var ie = Array.isArray, V = Object.prototype.hasOwnProperty, X = { current: null }, re = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Q(k, A, ee) {
    var ne, oe = {}, ae = null, ge = null;
    if (A != null) for (ne in A.ref !== void 0 && (ge = A.ref), A.key !== void 0 && (ae = "" + A.key), A) V.call(A, ne) && !re.hasOwnProperty(ne) && (oe[ne] = A[ne]);
    var de = arguments.length - 2;
    if (de === 1) oe.children = ee;
    else if (1 < de) {
      for (var Se = Array(de), ot = 0; ot < de; ot++) Se[ot] = arguments[ot + 2];
      oe.children = Se;
    }
    if (k && k.defaultProps) for (ne in de = k.defaultProps, de) oe[ne] === void 0 && (oe[ne] = de[ne]);
    return { $$typeof: r, type: k, key: ae, ref: ge, props: oe, _owner: X.current };
  }
  function he(k, A) {
    return { $$typeof: r, type: k.type, key: A, ref: k.ref, props: k.props, _owner: k._owner };
  }
  function Be(k) {
    return typeof k == "object" && k !== null && k.$$typeof === r;
  }
  function Le(k) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(ee) {
      return A[ee];
    });
  }
  var Ie = /\/+/g;
  function He(k, A) {
    return typeof k == "object" && k !== null && k.key != null ? Le("" + k.key) : A.toString(36);
  }
  function it(k, A, ee, ne, oe) {
    var ae = typeof k;
    (ae === "undefined" || ae === "boolean") && (k = null);
    var ge = !1;
    if (k === null) ge = !0;
    else switch (ae) {
      case "string":
      case "number":
        ge = !0;
        break;
      case "object":
        switch (k.$$typeof) {
          case r:
          case n:
            ge = !0;
        }
    }
    if (ge) return ge = k, oe = oe(ge), k = ne === "" ? "." + He(ge, 0) : ne, ie(oe) ? (ee = "", k != null && (ee = k.replace(Ie, "$&/") + "/"), it(oe, A, ee, "", function(ot) {
      return ot;
    })) : oe != null && (Be(oe) && (oe = he(oe, ee + (!oe.key || ge && ge.key === oe.key ? "" : ("" + oe.key).replace(Ie, "$&/") + "/") + k)), A.push(oe)), 1;
    if (ge = 0, ne = ne === "" ? "." : ne + ":", ie(k)) for (var de = 0; de < k.length; de++) {
      ae = k[de];
      var Se = ne + He(ae, de);
      ge += it(ae, A, ee, Se, oe);
    }
    else if (Se = S(k), typeof Se == "function") for (k = Se.call(k), de = 0; !(ae = k.next()).done; ) ae = ae.value, Se = ne + He(ae, de++), ge += it(ae, A, ee, Se, oe);
    else if (ae === "object") throw A = String(k), Error("Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead.");
    return ge;
  }
  function Oe(k, A, ee) {
    if (k == null) return k;
    var ne = [], oe = 0;
    return it(k, ne, "", "", function(ae) {
      return A.call(ee, ae, oe++);
    }), ne;
  }
  function pe(k) {
    if (k._status === -1) {
      var A = k._result;
      A = A(), A.then(function(ee) {
        (k._status === 0 || k._status === -1) && (k._status = 1, k._result = ee);
      }, function(ee) {
        (k._status === 0 || k._status === -1) && (k._status = 2, k._result = ee);
      }), k._status === -1 && (k._status = 0, k._result = A);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var me = { current: null }, D = { transition: null }, G = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: D, ReactCurrentOwner: X };
  function U() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return te.Children = { map: Oe, forEach: function(k, A, ee) {
    Oe(k, function() {
      A.apply(this, arguments);
    }, ee);
  }, count: function(k) {
    var A = 0;
    return Oe(k, function() {
      A++;
    }), A;
  }, toArray: function(k) {
    return Oe(k, function(A) {
      return A;
    }) || [];
  }, only: function(k) {
    if (!Be(k)) throw Error("React.Children.only expected to receive a single React element child.");
    return k;
  } }, te.Component = z, te.Fragment = i, te.Profiler = u, te.PureComponent = ue, te.StrictMode = a, te.Suspense = m, te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = G, te.act = U, te.cloneElement = function(k, A, ee) {
    if (k == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
    var ne = P({}, k.props), oe = k.key, ae = k.ref, ge = k._owner;
    if (A != null) {
      if (A.ref !== void 0 && (ae = A.ref, ge = X.current), A.key !== void 0 && (oe = "" + A.key), k.type && k.type.defaultProps) var de = k.type.defaultProps;
      for (Se in A) V.call(A, Se) && !re.hasOwnProperty(Se) && (ne[Se] = A[Se] === void 0 && de !== void 0 ? de[Se] : A[Se]);
    }
    var Se = arguments.length - 2;
    if (Se === 1) ne.children = ee;
    else if (1 < Se) {
      de = Array(Se);
      for (var ot = 0; ot < Se; ot++) de[ot] = arguments[ot + 2];
      ne.children = de;
    }
    return { $$typeof: r, type: k.type, key: oe, ref: ae, props: ne, _owner: ge };
  }, te.createContext = function(k) {
    return k = { $$typeof: f, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, k.Provider = { $$typeof: d, _context: k }, k.Consumer = k;
  }, te.createElement = Q, te.createFactory = function(k) {
    var A = Q.bind(null, k);
    return A.type = k, A;
  }, te.createRef = function() {
    return { current: null };
  }, te.forwardRef = function(k) {
    return { $$typeof: p, render: k };
  }, te.isValidElement = Be, te.lazy = function(k) {
    return { $$typeof: w, _payload: { _status: -1, _result: k }, _init: pe };
  }, te.memo = function(k, A) {
    return { $$typeof: v, type: k, compare: A === void 0 ? null : A };
  }, te.startTransition = function(k) {
    var A = D.transition;
    D.transition = {};
    try {
      k();
    } finally {
      D.transition = A;
    }
  }, te.unstable_act = U, te.useCallback = function(k, A) {
    return me.current.useCallback(k, A);
  }, te.useContext = function(k) {
    return me.current.useContext(k);
  }, te.useDebugValue = function() {
  }, te.useDeferredValue = function(k) {
    return me.current.useDeferredValue(k);
  }, te.useEffect = function(k, A) {
    return me.current.useEffect(k, A);
  }, te.useId = function() {
    return me.current.useId();
  }, te.useImperativeHandle = function(k, A, ee) {
    return me.current.useImperativeHandle(k, A, ee);
  }, te.useInsertionEffect = function(k, A) {
    return me.current.useInsertionEffect(k, A);
  }, te.useLayoutEffect = function(k, A) {
    return me.current.useLayoutEffect(k, A);
  }, te.useMemo = function(k, A) {
    return me.current.useMemo(k, A);
  }, te.useReducer = function(k, A, ee) {
    return me.current.useReducer(k, A, ee);
  }, te.useRef = function(k) {
    return me.current.useRef(k);
  }, te.useState = function(k) {
    return me.current.useState(k);
  }, te.useSyncExternalStore = function(k, A, ee) {
    return me.current.useSyncExternalStore(k, A, ee);
  }, te.useTransition = function() {
    return me.current.useTransition();
  }, te.version = "18.3.1", te;
}
var bd;
function fl() {
  return bd || (bd = 1, Ga.exports = km()), Ga.exports;
}
var Td;
function Em() {
  if (Td) return ns;
  Td = 1;
  var r = fl(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(p, m, v) {
    var w, b = {}, S = null, I = null;
    v !== void 0 && (S = "" + v), m.key !== void 0 && (S = "" + m.key), m.ref !== void 0 && (I = m.ref);
    for (w in m) a.call(m, w) && !d.hasOwnProperty(w) && (b[w] = m[w]);
    if (p && p.defaultProps) for (w in m = p.defaultProps, m) b[w] === void 0 && (b[w] = m[w]);
    return { $$typeof: n, type: p, key: S, ref: I, props: b, _owner: u.current };
  }
  return ns.Fragment = i, ns.jsx = f, ns.jsxs = f, ns;
}
var Cd;
function bm() {
  return Cd || (Cd = 1, qa.exports = Em()), qa.exports;
}
var g = bm(), C = fl();
const Kt = /* @__PURE__ */ cf(C), Tm = /* @__PURE__ */ xm({
  __proto__: null,
  default: Kt
}, [C]);
var Ai = {}, Ka = { exports: {} }, st = {}, Ja = { exports: {} }, Xa = {};
var Rd;
function Cm() {
  return Rd || (Rd = 1, (function(r) {
    function n(D, G) {
      var U = D.length;
      D.push(G);
      e: for (; 0 < U; ) {
        var k = U - 1 >>> 1, A = D[k];
        if (0 < u(A, G)) D[k] = G, D[U] = A, U = k;
        else break e;
      }
    }
    function i(D) {
      return D.length === 0 ? null : D[0];
    }
    function a(D) {
      if (D.length === 0) return null;
      var G = D[0], U = D.pop();
      if (U !== G) {
        D[0] = U;
        e: for (var k = 0, A = D.length, ee = A >>> 1; k < ee; ) {
          var ne = 2 * (k + 1) - 1, oe = D[ne], ae = ne + 1, ge = D[ae];
          if (0 > u(oe, U)) ae < A && 0 > u(ge, oe) ? (D[k] = ge, D[ae] = U, k = ae) : (D[k] = oe, D[ne] = U, k = ne);
          else if (ae < A && 0 > u(ge, U)) D[k] = ge, D[ae] = U, k = ae;
          else break e;
        }
      }
      return G;
    }
    function u(D, G) {
      var U = D.sortIndex - G.sortIndex;
      return U !== 0 ? U : D.id - G.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      r.unstable_now = function() {
        return d.now();
      };
    } else {
      var f = Date, p = f.now();
      r.unstable_now = function() {
        return f.now() - p;
      };
    }
    var m = [], v = [], w = 1, b = null, S = 3, I = !1, P = !1, j = !1, z = typeof setTimeout == "function" ? setTimeout : null, J = typeof clearTimeout == "function" ? clearTimeout : null, ue = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Z(D) {
      for (var G = i(v); G !== null; ) {
        if (G.callback === null) a(v);
        else if (G.startTime <= D) a(v), G.sortIndex = G.expirationTime, n(m, G);
        else break;
        G = i(v);
      }
    }
    function ie(D) {
      if (j = !1, Z(D), !P) if (i(m) !== null) P = !0, pe(V);
      else {
        var G = i(v);
        G !== null && me(ie, G.startTime - D);
      }
    }
    function V(D, G) {
      P = !1, j && (j = !1, J(Q), Q = -1), I = !0;
      var U = S;
      try {
        for (Z(G), b = i(m); b !== null && (!(b.expirationTime > G) || D && !Le()); ) {
          var k = b.callback;
          if (typeof k == "function") {
            b.callback = null, S = b.priorityLevel;
            var A = k(b.expirationTime <= G);
            G = r.unstable_now(), typeof A == "function" ? b.callback = A : b === i(m) && a(m), Z(G);
          } else a(m);
          b = i(m);
        }
        if (b !== null) var ee = !0;
        else {
          var ne = i(v);
          ne !== null && me(ie, ne.startTime - G), ee = !1;
        }
        return ee;
      } finally {
        b = null, S = U, I = !1;
      }
    }
    var X = !1, re = null, Q = -1, he = 5, Be = -1;
    function Le() {
      return !(r.unstable_now() - Be < he);
    }
    function Ie() {
      if (re !== null) {
        var D = r.unstable_now();
        Be = D;
        var G = !0;
        try {
          G = re(!0, D);
        } finally {
          G ? He() : (X = !1, re = null);
        }
      } else X = !1;
    }
    var He;
    if (typeof ue == "function") He = function() {
      ue(Ie);
    };
    else if (typeof MessageChannel < "u") {
      var it = new MessageChannel(), Oe = it.port2;
      it.port1.onmessage = Ie, He = function() {
        Oe.postMessage(null);
      };
    } else He = function() {
      z(Ie, 0);
    };
    function pe(D) {
      re = D, X || (X = !0, He());
    }
    function me(D, G) {
      Q = z(function() {
        D(r.unstable_now());
      }, G);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(D) {
      D.callback = null;
    }, r.unstable_continueExecution = function() {
      P || I || (P = !0, pe(V));
    }, r.unstable_forceFrameRate = function(D) {
      0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : he = 0 < D ? Math.floor(1e3 / D) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(m);
    }, r.unstable_next = function(D) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = S;
      }
      var U = S;
      S = G;
      try {
        return D();
      } finally {
        S = U;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(D, G) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var U = S;
      S = D;
      try {
        return G();
      } finally {
        S = U;
      }
    }, r.unstable_scheduleCallback = function(D, G, U) {
      var k = r.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? k + U : k) : U = k, D) {
        case 1:
          var A = -1;
          break;
        case 2:
          A = 250;
          break;
        case 5:
          A = 1073741823;
          break;
        case 4:
          A = 1e4;
          break;
        default:
          A = 5e3;
      }
      return A = U + A, D = { id: w++, callback: G, priorityLevel: D, startTime: U, expirationTime: A, sortIndex: -1 }, U > k ? (D.sortIndex = U, n(v, D), i(m) === null && D === i(v) && (j ? (J(Q), Q = -1) : j = !0, me(ie, U - k))) : (D.sortIndex = A, n(m, D), P || I || (P = !0, pe(V))), D;
    }, r.unstable_shouldYield = Le, r.unstable_wrapCallback = function(D) {
      var G = S;
      return function() {
        var U = S;
        S = G;
        try {
          return D.apply(this, arguments);
        } finally {
          S = U;
        }
      };
    };
  })(Xa)), Xa;
}
var Id;
function Rm() {
  return Id || (Id = 1, Ja.exports = Cm()), Ja.exports;
}
var Md;
function Im() {
  if (Md) return st;
  Md = 1;
  var r = fl(), n = Rm();
  function i(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, s = 1; s < arguments.length; s++) t += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), u = {};
  function d(e, t) {
    f(e, t), f(e + "Capture", t);
  }
  function f(e, t) {
    for (u[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, w = {}, b = {};
  function S(e) {
    return m.call(b, e) ? !0 : m.call(w, e) ? !1 : v.test(e) ? b[e] = !0 : (w[e] = !0, !1);
  }
  function I(e, t, s, o) {
    if (s !== null && s.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : s !== null ? !s.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function P(e, t, s, o) {
    if (t === null || typeof t > "u" || I(e, t, s, o)) return !0;
    if (o) return !1;
    if (s !== null) switch (s.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function j(e, t, s, o, l, c, h) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = s, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = h;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    z[e] = new j(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    z[t] = new j(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    z[e] = new j(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    z[e] = new j(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    z[e] = new j(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    z[e] = new j(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    z[e] = new j(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    z[e] = new j(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    z[e] = new j(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var J = /[\-:]([a-z])/g;
  function ue(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      J,
      ue
    );
    z[t] = new j(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(J, ue);
    z[t] = new j(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(J, ue);
    z[t] = new j(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    z[e] = new j(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), z.xlinkHref = new j("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    z[e] = new j(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function Z(e, t, s, o) {
    var l = z.hasOwnProperty(t) ? z[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (P(t, s, l, o) && (s = null), o || l === null ? S(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var ie = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, V = /* @__PURE__ */ Symbol.for("react.element"), X = /* @__PURE__ */ Symbol.for("react.portal"), re = /* @__PURE__ */ Symbol.for("react.fragment"), Q = /* @__PURE__ */ Symbol.for("react.strict_mode"), he = /* @__PURE__ */ Symbol.for("react.profiler"), Be = /* @__PURE__ */ Symbol.for("react.provider"), Le = /* @__PURE__ */ Symbol.for("react.context"), Ie = /* @__PURE__ */ Symbol.for("react.forward_ref"), He = /* @__PURE__ */ Symbol.for("react.suspense"), it = /* @__PURE__ */ Symbol.for("react.suspense_list"), Oe = /* @__PURE__ */ Symbol.for("react.memo"), pe = /* @__PURE__ */ Symbol.for("react.lazy"), me = /* @__PURE__ */ Symbol.for("react.offscreen"), D = Symbol.iterator;
  function G(e) {
    return e === null || typeof e != "object" ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var U = Object.assign, k;
  function A(e) {
    if (k === void 0) try {
      throw Error();
    } catch (s) {
      var t = s.stack.trim().match(/\n( *(at )?)/);
      k = t && t[1] || "";
    }
    return `
` + k + e;
  }
  var ee = !1;
  function ne(e, t) {
    if (!e || ee) return "";
    ee = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (R) {
          var o = R;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (R) {
          o = R;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (R) {
          o = R;
        }
        e();
      }
    } catch (R) {
      if (R && o && typeof R.stack == "string") {
        for (var l = R.stack.split(`
`), c = o.stack.split(`
`), h = l.length - 1, y = c.length - 1; 1 <= h && 0 <= y && l[h] !== c[y]; ) y--;
        for (; 1 <= h && 0 <= y; h--, y--) if (l[h] !== c[y]) {
          if (h !== 1 || y !== 1)
            do
              if (h--, y--, 0 > y || l[h] !== c[y]) {
                var _ = `
` + l[h].replace(" at new ", " at ");
                return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), _;
              }
            while (1 <= h && 0 <= y);
          break;
        }
      }
    } finally {
      ee = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? A(e) : "";
  }
  function oe(e) {
    switch (e.tag) {
      case 5:
        return A(e.type);
      case 16:
        return A("Lazy");
      case 13:
        return A("Suspense");
      case 19:
        return A("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = ne(e.type, !1), e;
      case 11:
        return e = ne(e.type.render, !1), e;
      case 1:
        return e = ne(e.type, !0), e;
      default:
        return "";
    }
  }
  function ae(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case re:
        return "Fragment";
      case X:
        return "Portal";
      case he:
        return "Profiler";
      case Q:
        return "StrictMode";
      case He:
        return "Suspense";
      case it:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Le:
        return (e.displayName || "Context") + ".Consumer";
      case Be:
        return (e._context.displayName || "Context") + ".Provider";
      case Ie:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Oe:
        return t = e.displayName || null, t !== null ? t : ae(e.type) || "Memo";
      case pe:
        t = e._payload, e = e._init;
        try {
          return ae(e(t));
        } catch {
        }
    }
    return null;
  }
  function ge(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ae(t);
      case 8:
        return t === Q ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function de(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Se(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ot(e) {
    var t = Se(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var l = s.get, c = s.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(h) {
        o = "" + h, c.call(this, h);
      } }), Object.defineProperty(e, t, { enumerable: s.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(h) {
        o = "" + h;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Ss(e) {
    e._valueTracker || (e._valueTracker = ot(e));
  }
  function Ml(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = Se(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
  }
  function xs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function eo(e, t) {
    var s = t.checked;
    return U({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function Al(e, t) {
    var s = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    s = de(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Nl(e, t) {
    t = t.checked, t != null && Z(e, "checked", t, !1);
  }
  function to(e, t) {
    Nl(e, t);
    var s = de(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? no(e, t.type, s) : t.hasOwnProperty("defaultValue") && no(e, t.type, de(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Pl(e, t, s) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function no(e, t, s) {
    (t !== "number" || xs(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var yr = Array.isArray;
  function Fn(e, t, s, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < s.length; l++) t["$" + s[l]] = !0;
      for (s = 0; s < e.length; s++) l = t.hasOwnProperty("$" + e[s].value), e[s].selected !== l && (e[s].selected = l), l && o && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + de(s), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === s) {
          e[l].selected = !0, o && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ro(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return U({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function jl(e, t) {
    var s = t.value;
    if (s == null) {
      if (s = t.children, t = t.defaultValue, s != null) {
        if (t != null) throw Error(i(92));
        if (yr(s)) {
          if (1 < s.length) throw Error(i(93));
          s = s[0];
        }
        t = s;
      }
      t == null && (t = ""), s = t;
    }
    e._wrapperState = { initialValue: de(s) };
  }
  function Ll(e, t) {
    var s = de(t.value), o = de(t.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), t.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), o != null && (e.defaultValue = "" + o);
  }
  function Ol(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function zl(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function so(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? zl(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var ks, Dl = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, s, o, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, s, o, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (ks = ks || document.createElement("div"), ks.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ks.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function vr(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var _r = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Th = ["Webkit", "ms", "Moz", "O"];
  Object.keys(_r).forEach(function(e) {
    Th.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), _r[t] = _r[e];
    });
  });
  function Fl(e, t, s) {
    return t == null || typeof t == "boolean" || t === "" ? "" : s || typeof t != "number" || t === 0 || _r.hasOwnProperty(e) && _r[e] ? ("" + t).trim() : t + "px";
  }
  function Bl(e, t) {
    e = e.style;
    for (var s in t) if (t.hasOwnProperty(s)) {
      var o = s.indexOf("--") === 0, l = Fl(s, t[s], o);
      s === "float" && (s = "cssFloat"), o ? e.setProperty(s, l) : e[s] = l;
    }
  }
  var Ch = U({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function io(e, t) {
    if (t) {
      if (Ch[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function oo(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var ao = null;
  function lo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var uo = null, Bn = null, Un = null;
  function Ul(e) {
    if (e = Ur(e)) {
      if (typeof uo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = Qs(t), uo(e.stateNode, e.type, t));
    }
  }
  function $l(e) {
    Bn ? Un ? Un.push(e) : Un = [e] : Bn = e;
  }
  function Hl() {
    if (Bn) {
      var e = Bn, t = Un;
      if (Un = Bn = null, Ul(e), t) for (e = 0; e < t.length; e++) Ul(t[e]);
    }
  }
  function Vl(e, t) {
    return e(t);
  }
  function Wl() {
  }
  var co = !1;
  function Ql(e, t, s) {
    if (co) return e(t, s);
    co = !0;
    try {
      return Vl(e, t, s);
    } finally {
      co = !1, (Bn !== null || Un !== null) && (Wl(), Hl());
    }
  }
  function wr(e, t) {
    var s = e.stateNode;
    if (s === null) return null;
    var o = Qs(s);
    if (o === null) return null;
    s = o[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (s && typeof s != "function") throw Error(i(231, t, typeof s));
    return s;
  }
  var fo = !1;
  if (p) try {
    var Sr = {};
    Object.defineProperty(Sr, "passive", { get: function() {
      fo = !0;
    } }), window.addEventListener("test", Sr, Sr), window.removeEventListener("test", Sr, Sr);
  } catch {
    fo = !1;
  }
  function Rh(e, t, s, o, l, c, h, y, _) {
    var R = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, R);
    } catch (N) {
      this.onError(N);
    }
  }
  var xr = !1, Es = null, bs = !1, ho = null, Ih = { onError: function(e) {
    xr = !0, Es = e;
  } };
  function Mh(e, t, s, o, l, c, h, y, _) {
    xr = !1, Es = null, Rh.apply(Ih, arguments);
  }
  function Ah(e, t, s, o, l, c, h, y, _) {
    if (Mh.apply(this, arguments), xr) {
      if (xr) {
        var R = Es;
        xr = !1, Es = null;
      } else throw Error(i(198));
      bs || (bs = !0, ho = R);
    }
  }
  function vn(e) {
    var t = e, s = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (s = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? s : null;
  }
  function Yl(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function ql(e) {
    if (vn(e) !== e) throw Error(i(188));
  }
  function Nh(e) {
    var t = e.alternate;
    if (!t) {
      if (t = vn(e), t === null) throw Error(i(188));
      return t !== e ? null : e;
    }
    for (var s = e, o = t; ; ) {
      var l = s.return;
      if (l === null) break;
      var c = l.alternate;
      if (c === null) {
        if (o = l.return, o !== null) {
          s = o;
          continue;
        }
        break;
      }
      if (l.child === c.child) {
        for (c = l.child; c; ) {
          if (c === s) return ql(l), e;
          if (c === o) return ql(l), t;
          c = c.sibling;
        }
        throw Error(i(188));
      }
      if (s.return !== o.return) s = l, o = c;
      else {
        for (var h = !1, y = l.child; y; ) {
          if (y === s) {
            h = !0, s = l, o = c;
            break;
          }
          if (y === o) {
            h = !0, o = l, s = c;
            break;
          }
          y = y.sibling;
        }
        if (!h) {
          for (y = c.child; y; ) {
            if (y === s) {
              h = !0, s = c, o = l;
              break;
            }
            if (y === o) {
              h = !0, o = c, s = l;
              break;
            }
            y = y.sibling;
          }
          if (!h) throw Error(i(189));
        }
      }
      if (s.alternate !== o) throw Error(i(190));
    }
    if (s.tag !== 3) throw Error(i(188));
    return s.stateNode.current === s ? e : t;
  }
  function Gl(e) {
    return e = Nh(e), e !== null ? Kl(e) : null;
  }
  function Kl(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Kl(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Jl = n.unstable_scheduleCallback, Xl = n.unstable_cancelCallback, Ph = n.unstable_shouldYield, jh = n.unstable_requestPaint, Me = n.unstable_now, Lh = n.unstable_getCurrentPriorityLevel, po = n.unstable_ImmediatePriority, Zl = n.unstable_UserBlockingPriority, Ts = n.unstable_NormalPriority, Oh = n.unstable_LowPriority, eu = n.unstable_IdlePriority, Cs = null, Nt = null;
  function zh(e) {
    if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
      Nt.onCommitFiberRoot(Cs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var wt = Math.clz32 ? Math.clz32 : Bh, Dh = Math.log, Fh = Math.LN2;
  function Bh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Dh(e) / Fh | 0) | 0;
  }
  var Rs = 64, Is = 4194304;
  function kr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Ms(e, t) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var o = 0, l = e.suspendedLanes, c = e.pingedLanes, h = s & 268435455;
    if (h !== 0) {
      var y = h & ~l;
      y !== 0 ? o = kr(y) : (c &= h, c !== 0 && (o = kr(c)));
    } else h = s & ~l, h !== 0 ? o = kr(h) : c !== 0 && (o = kr(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - wt(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function Uh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function $h(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var h = 31 - wt(c), y = 1 << h, _ = l[h];
      _ === -1 ? ((y & s) === 0 || (y & o) !== 0) && (l[h] = Uh(y, t)) : _ <= t && (e.expiredLanes |= y), c &= ~y;
    }
  }
  function mo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function tu() {
    var e = Rs;
    return Rs <<= 1, (Rs & 4194240) === 0 && (Rs = 64), e;
  }
  function go(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Er(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - wt(t), e[t] = s;
  }
  function Hh(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - wt(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function yo(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - wt(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var fe = 0;
  function nu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var ru, vo, su, iu, ou, _o = !1, As = [], Xt = null, Zt = null, en = null, br = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Map(), tn = [], Vh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function au(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Xt = null;
        break;
      case "dragenter":
      case "dragleave":
        Zt = null;
        break;
      case "mouseover":
      case "mouseout":
        en = null;
        break;
      case "pointerover":
      case "pointerout":
        br.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tr.delete(t.pointerId);
    }
  }
  function Cr(e, t, s, o, l, c) {
    return e === null || e.nativeEvent !== c ? (e = { blockedOn: t, domEventName: s, eventSystemFlags: o, nativeEvent: c, targetContainers: [l] }, t !== null && (t = Ur(t), t !== null && vo(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Wh(e, t, s, o, l) {
    switch (t) {
      case "focusin":
        return Xt = Cr(Xt, e, t, s, o, l), !0;
      case "dragenter":
        return Zt = Cr(Zt, e, t, s, o, l), !0;
      case "mouseover":
        return en = Cr(en, e, t, s, o, l), !0;
      case "pointerover":
        var c = l.pointerId;
        return br.set(c, Cr(br.get(c) || null, e, t, s, o, l)), !0;
      case "gotpointercapture":
        return c = l.pointerId, Tr.set(c, Cr(Tr.get(c) || null, e, t, s, o, l)), !0;
    }
    return !1;
  }
  function lu(e) {
    var t = _n(e.target);
    if (t !== null) {
      var s = vn(t);
      if (s !== null) {
        if (t = s.tag, t === 13) {
          if (t = Yl(s), t !== null) {
            e.blockedOn = t, ou(e.priority, function() {
              su(s);
            });
            return;
          }
        } else if (t === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ns(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var s = So(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        ao = o, s.target.dispatchEvent(o), ao = null;
      } else return t = Ur(s), t !== null && vo(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function uu(e, t, s) {
    Ns(e) && s.delete(t);
  }
  function Qh() {
    _o = !1, Xt !== null && Ns(Xt) && (Xt = null), Zt !== null && Ns(Zt) && (Zt = null), en !== null && Ns(en) && (en = null), br.forEach(uu), Tr.forEach(uu);
  }
  function Rr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, _o || (_o = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Qh)));
  }
  function Ir(e) {
    function t(l) {
      return Rr(l, e);
    }
    if (0 < As.length) {
      Rr(As[0], e);
      for (var s = 1; s < As.length; s++) {
        var o = As[s];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (Xt !== null && Rr(Xt, e), Zt !== null && Rr(Zt, e), en !== null && Rr(en, e), br.forEach(t), Tr.forEach(t), s = 0; s < tn.length; s++) o = tn[s], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < tn.length && (s = tn[0], s.blockedOn === null); ) lu(s), s.blockedOn === null && tn.shift();
  }
  var $n = ie.ReactCurrentBatchConfig, Ps = !0;
  function Yh(e, t, s, o) {
    var l = fe, c = $n.transition;
    $n.transition = null;
    try {
      fe = 1, wo(e, t, s, o);
    } finally {
      fe = l, $n.transition = c;
    }
  }
  function qh(e, t, s, o) {
    var l = fe, c = $n.transition;
    $n.transition = null;
    try {
      fe = 4, wo(e, t, s, o);
    } finally {
      fe = l, $n.transition = c;
    }
  }
  function wo(e, t, s, o) {
    if (Ps) {
      var l = So(e, t, s, o);
      if (l === null) Do(e, t, o, js, s), au(e, o);
      else if (Wh(l, e, t, s, o)) o.stopPropagation();
      else if (au(e, o), t & 4 && -1 < Vh.indexOf(e)) {
        for (; l !== null; ) {
          var c = Ur(l);
          if (c !== null && ru(c), c = So(e, t, s, o), c === null && Do(e, t, o, js, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else Do(e, t, o, null, s);
    }
  }
  var js = null;
  function So(e, t, s, o) {
    if (js = null, e = lo(o), e = _n(e), e !== null) if (t = vn(e), t === null) e = null;
    else if (s = t.tag, s === 13) {
      if (e = Yl(t), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return js = e, null;
  }
  function cu(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Lh()) {
          case po:
            return 1;
          case Zl:
            return 4;
          case Ts:
          case Oh:
            return 16;
          case eu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var nn = null, xo = null, Ls = null;
  function du() {
    if (Ls) return Ls;
    var e, t = xo, s = t.length, o, l = "value" in nn ? nn.value : nn.textContent, c = l.length;
    for (e = 0; e < s && t[e] === l[e]; e++) ;
    var h = s - e;
    for (o = 1; o <= h && t[s - o] === l[c - o]; o++) ;
    return Ls = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Os(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function zs() {
    return !0;
  }
  function fu() {
    return !1;
  }
  function at(e) {
    function t(s, o, l, c, h) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = h, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (s = e[y], this[y] = s ? s(c) : c[y]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? zs : fu, this.isPropagationStopped = fu, this;
    }
    return U(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = zs);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = zs);
    }, persist: function() {
    }, isPersistent: zs }), t;
  }
  var Hn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ko = at(Hn), Mr = U({}, Hn, { view: 0, detail: 0 }), Gh = at(Mr), Eo, bo, Ar, Ds = U({}, Mr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Co, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Ar && (Ar && e.type === "mousemove" ? (Eo = e.screenX - Ar.screenX, bo = e.screenY - Ar.screenY) : bo = Eo = 0, Ar = e), Eo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : bo;
  } }), hu = at(Ds), Kh = U({}, Ds, { dataTransfer: 0 }), Jh = at(Kh), Xh = U({}, Mr, { relatedTarget: 0 }), To = at(Xh), Zh = U({}, Hn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ep = at(Zh), tp = U({}, Hn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), np = at(tp), rp = U({}, Hn, { data: 0 }), pu = at(rp), sp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, ip = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, op = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function ap(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = op[e]) ? !!t[e] : !1;
  }
  function Co() {
    return ap;
  }
  var lp = U({}, Mr, { key: function(e) {
    if (e.key) {
      var t = sp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Os(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ip[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Co, charCode: function(e) {
    return e.type === "keypress" ? Os(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Os(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), up = at(lp), cp = U({}, Ds, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), mu = at(cp), dp = U({}, Mr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Co }), fp = at(dp), hp = U({}, Hn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), pp = at(hp), mp = U({}, Ds, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gp = at(mp), yp = [9, 13, 27, 32], Ro = p && "CompositionEvent" in window, Nr = null;
  p && "documentMode" in document && (Nr = document.documentMode);
  var vp = p && "TextEvent" in window && !Nr, gu = p && (!Ro || Nr && 8 < Nr && 11 >= Nr), yu = " ", vu = !1;
  function _u(e, t) {
    switch (e) {
      case "keyup":
        return yp.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function wu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Vn = !1;
  function _p(e, t) {
    switch (e) {
      case "compositionend":
        return wu(t);
      case "keypress":
        return t.which !== 32 ? null : (vu = !0, yu);
      case "textInput":
        return e = t.data, e === yu && vu ? null : e;
      default:
        return null;
    }
  }
  function wp(e, t) {
    if (Vn) return e === "compositionend" || !Ro && _u(e, t) ? (e = du(), Ls = xo = nn = null, Vn = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return gu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Sp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Su(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Sp[e.type] : t === "textarea";
  }
  function xu(e, t, s, o) {
    $l(o), t = Hs(t, "onChange"), 0 < t.length && (s = new ko("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var Pr = null, jr = null;
  function xp(e) {
    Bu(e, 0);
  }
  function Fs(e) {
    var t = Gn(e);
    if (Ml(t)) return e;
  }
  function kp(e, t) {
    if (e === "change") return t;
  }
  var ku = !1;
  if (p) {
    var Io;
    if (p) {
      var Mo = "oninput" in document;
      if (!Mo) {
        var Eu = document.createElement("div");
        Eu.setAttribute("oninput", "return;"), Mo = typeof Eu.oninput == "function";
      }
      Io = Mo;
    } else Io = !1;
    ku = Io && (!document.documentMode || 9 < document.documentMode);
  }
  function bu() {
    Pr && (Pr.detachEvent("onpropertychange", Tu), jr = Pr = null);
  }
  function Tu(e) {
    if (e.propertyName === "value" && Fs(jr)) {
      var t = [];
      xu(t, jr, e, lo(e)), Ql(xp, t);
    }
  }
  function Ep(e, t, s) {
    e === "focusin" ? (bu(), Pr = t, jr = s, Pr.attachEvent("onpropertychange", Tu)) : e === "focusout" && bu();
  }
  function bp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Fs(jr);
  }
  function Tp(e, t) {
    if (e === "click") return Fs(t);
  }
  function Cp(e, t) {
    if (e === "input" || e === "change") return Fs(t);
  }
  function Rp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var St = typeof Object.is == "function" ? Object.is : Rp;
  function Lr(e, t) {
    if (St(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var s = Object.keys(e), o = Object.keys(t);
    if (s.length !== o.length) return !1;
    for (o = 0; o < s.length; o++) {
      var l = s[o];
      if (!m.call(t, l) || !St(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Cu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ru(e, t) {
    var s = Cu(e);
    e = 0;
    for (var o; s; ) {
      if (s.nodeType === 3) {
        if (o = e + s.textContent.length, e <= t && o >= t) return { node: s, offset: t - e };
        e = o;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = Cu(s);
    }
  }
  function Iu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Iu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Mu() {
    for (var e = window, t = xs(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof t.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = t.contentWindow;
      else break;
      t = xs(e.document);
    }
    return t;
  }
  function Ao(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Ip(e) {
    var t = Mu(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Iu(s.ownerDocument.documentElement, s)) {
      if (o !== null && Ao(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = Ru(s, c);
          var h = Ru(
            s,
            o
          );
          l && h && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== h.node || e.focusOffset !== h.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), c > o ? (e.addRange(t), e.extend(h.node, h.offset)) : (t.setEnd(h.node, h.offset), e.addRange(t)));
        }
      }
      for (t = [], e = s; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof s.focus == "function" && s.focus(), s = 0; s < t.length; s++) e = t[s], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Mp = p && "documentMode" in document && 11 >= document.documentMode, Wn = null, No = null, Or = null, Po = !1;
  function Au(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Po || Wn == null || Wn !== xs(o) || (o = Wn, "selectionStart" in o && Ao(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Or && Lr(Or, o) || (Or = o, o = Hs(No, "onSelect"), 0 < o.length && (t = new ko("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = Wn)));
  }
  function Bs(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var Qn = { animationend: Bs("Animation", "AnimationEnd"), animationiteration: Bs("Animation", "AnimationIteration"), animationstart: Bs("Animation", "AnimationStart"), transitionend: Bs("Transition", "TransitionEnd") }, jo = {}, Nu = {};
  p && (Nu = document.createElement("div").style, "AnimationEvent" in window || (delete Qn.animationend.animation, delete Qn.animationiteration.animation, delete Qn.animationstart.animation), "TransitionEvent" in window || delete Qn.transitionend.transition);
  function Us(e) {
    if (jo[e]) return jo[e];
    if (!Qn[e]) return e;
    var t = Qn[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Nu) return jo[e] = t[s];
    return e;
  }
  var Pu = Us("animationend"), ju = Us("animationiteration"), Lu = Us("animationstart"), Ou = Us("transitionend"), zu = /* @__PURE__ */ new Map(), Du = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function rn(e, t) {
    zu.set(e, t), d(t, [e]);
  }
  for (var Lo = 0; Lo < Du.length; Lo++) {
    var Oo = Du[Lo], Ap = Oo.toLowerCase(), Np = Oo[0].toUpperCase() + Oo.slice(1);
    rn(Ap, "on" + Np);
  }
  rn(Pu, "onAnimationEnd"), rn(ju, "onAnimationIteration"), rn(Lu, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(Ou, "onTransitionEnd"), f("onMouseEnter", ["mouseout", "mouseover"]), f("onMouseLeave", ["mouseout", "mouseover"]), f("onPointerEnter", ["pointerout", "pointerover"]), f("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var zr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Pp = new Set("cancel close invalid load scroll toggle".split(" ").concat(zr));
  function Fu(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, Ah(o, t, void 0, e), e.currentTarget = null;
  }
  function Bu(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var h = o.length - 1; 0 <= h; h--) {
          var y = o[h], _ = y.instance, R = y.currentTarget;
          if (y = y.listener, _ !== c && l.isPropagationStopped()) break e;
          Fu(l, y, R), c = _;
        }
        else for (h = 0; h < o.length; h++) {
          if (y = o[h], _ = y.instance, R = y.currentTarget, y = y.listener, _ !== c && l.isPropagationStopped()) break e;
          Fu(l, y, R), c = _;
        }
      }
    }
    if (bs) throw e = ho, bs = !1, ho = null, e;
  }
  function _e(e, t) {
    var s = t[Vo];
    s === void 0 && (s = t[Vo] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (Uu(t, e, 2, !1), s.add(o));
  }
  function zo(e, t, s) {
    var o = 0;
    t && (o |= 4), Uu(s, e, o, t);
  }
  var $s = "_reactListening" + Math.random().toString(36).slice(2);
  function Dr(e) {
    if (!e[$s]) {
      e[$s] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (Pp.has(s) || zo(s, !1, e), zo(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[$s] || (t[$s] = !0, zo("selectionchange", !1, t));
    }
  }
  function Uu(e, t, s, o) {
    switch (cu(t)) {
      case 1:
        var l = Yh;
        break;
      case 4:
        l = qh;
        break;
      default:
        l = wo;
    }
    s = l.bind(null, t, s, e), l = void 0, !fo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, s, { capture: !0, passive: l }) : e.addEventListener(t, s, !0) : l !== void 0 ? e.addEventListener(t, s, { passive: l }) : e.addEventListener(t, s, !1);
  }
  function Do(e, t, s, o, l) {
    var c = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var h = o.tag;
      if (h === 3 || h === 4) {
        var y = o.stateNode.containerInfo;
        if (y === l || y.nodeType === 8 && y.parentNode === l) break;
        if (h === 4) for (h = o.return; h !== null; ) {
          var _ = h.tag;
          if ((_ === 3 || _ === 4) && (_ = h.stateNode.containerInfo, _ === l || _.nodeType === 8 && _.parentNode === l)) return;
          h = h.return;
        }
        for (; y !== null; ) {
          if (h = _n(y), h === null) return;
          if (_ = h.tag, _ === 5 || _ === 6) {
            o = c = h;
            continue e;
          }
          y = y.parentNode;
        }
      }
      o = o.return;
    }
    Ql(function() {
      var R = c, N = lo(s), L = [];
      e: {
        var M = zu.get(e);
        if (M !== void 0) {
          var F = ko, $ = e;
          switch (e) {
            case "keypress":
              if (Os(s) === 0) break e;
            case "keydown":
            case "keyup":
              F = up;
              break;
            case "focusin":
              $ = "focus", F = To;
              break;
            case "focusout":
              $ = "blur", F = To;
              break;
            case "beforeblur":
            case "afterblur":
              F = To;
              break;
            case "click":
              if (s.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              F = hu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              F = Jh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = fp;
              break;
            case Pu:
            case ju:
            case Lu:
              F = ep;
              break;
            case Ou:
              F = pp;
              break;
            case "scroll":
              F = Gh;
              break;
            case "wheel":
              F = gp;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = np;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              F = mu;
          }
          var H = (t & 4) !== 0, Ae = !H && e === "scroll", E = H ? M !== null ? M + "Capture" : null : M;
          H = [];
          for (var x = R, T; x !== null; ) {
            T = x;
            var O = T.stateNode;
            if (T.tag === 5 && O !== null && (T = O, E !== null && (O = wr(x, E), O != null && H.push(Fr(x, O, T)))), Ae) break;
            x = x.return;
          }
          0 < H.length && (M = new F(M, $, null, s, N), L.push({ event: M, listeners: H }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (M = e === "mouseover" || e === "pointerover", F = e === "mouseout" || e === "pointerout", M && s !== ao && ($ = s.relatedTarget || s.fromElement) && (_n($) || $[Bt])) break e;
          if ((F || M) && (M = N.window === N ? N : (M = N.ownerDocument) ? M.defaultView || M.parentWindow : window, F ? ($ = s.relatedTarget || s.toElement, F = R, $ = $ ? _n($) : null, $ !== null && (Ae = vn($), $ !== Ae || $.tag !== 5 && $.tag !== 6) && ($ = null)) : (F = null, $ = R), F !== $)) {
            if (H = hu, O = "onMouseLeave", E = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (H = mu, O = "onPointerLeave", E = "onPointerEnter", x = "pointer"), Ae = F == null ? M : Gn(F), T = $ == null ? M : Gn($), M = new H(O, x + "leave", F, s, N), M.target = Ae, M.relatedTarget = T, O = null, _n(N) === R && (H = new H(E, x + "enter", $, s, N), H.target = T, H.relatedTarget = Ae, O = H), Ae = O, F && $) t: {
              for (H = F, E = $, x = 0, T = H; T; T = Yn(T)) x++;
              for (T = 0, O = E; O; O = Yn(O)) T++;
              for (; 0 < x - T; ) H = Yn(H), x--;
              for (; 0 < T - x; ) E = Yn(E), T--;
              for (; x--; ) {
                if (H === E || E !== null && H === E.alternate) break t;
                H = Yn(H), E = Yn(E);
              }
              H = null;
            }
            else H = null;
            F !== null && $u(L, M, F, H, !1), $ !== null && Ae !== null && $u(L, Ae, $, H, !0);
          }
        }
        e: {
          if (M = R ? Gn(R) : window, F = M.nodeName && M.nodeName.toLowerCase(), F === "select" || F === "input" && M.type === "file") var W = kp;
          else if (Su(M)) if (ku) W = Cp;
          else {
            W = bp;
            var Y = Ep;
          }
          else (F = M.nodeName) && F.toLowerCase() === "input" && (M.type === "checkbox" || M.type === "radio") && (W = Tp);
          if (W && (W = W(e, R))) {
            xu(L, W, s, N);
            break e;
          }
          Y && Y(e, M, R), e === "focusout" && (Y = M._wrapperState) && Y.controlled && M.type === "number" && no(M, "number", M.value);
        }
        switch (Y = R ? Gn(R) : window, e) {
          case "focusin":
            (Su(Y) || Y.contentEditable === "true") && (Wn = Y, No = R, Or = null);
            break;
          case "focusout":
            Or = No = Wn = null;
            break;
          case "mousedown":
            Po = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Po = !1, Au(L, s, N);
            break;
          case "selectionchange":
            if (Mp) break;
          case "keydown":
          case "keyup":
            Au(L, s, N);
        }
        var q;
        if (Ro) e: {
          switch (e) {
            case "compositionstart":
              var K = "onCompositionStart";
              break e;
            case "compositionend":
              K = "onCompositionEnd";
              break e;
            case "compositionupdate":
              K = "onCompositionUpdate";
              break e;
          }
          K = void 0;
        }
        else Vn ? _u(e, s) && (K = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (K = "onCompositionStart");
        K && (gu && s.locale !== "ko" && (Vn || K !== "onCompositionStart" ? K === "onCompositionEnd" && Vn && (q = du()) : (nn = N, xo = "value" in nn ? nn.value : nn.textContent, Vn = !0)), Y = Hs(R, K), 0 < Y.length && (K = new pu(K, e, null, s, N), L.push({ event: K, listeners: Y }), q ? K.data = q : (q = wu(s), q !== null && (K.data = q)))), (q = vp ? _p(e, s) : wp(e, s)) && (R = Hs(R, "onBeforeInput"), 0 < R.length && (N = new pu("onBeforeInput", "beforeinput", null, s, N), L.push({ event: N, listeners: R }), N.data = q));
      }
      Bu(L, t);
    });
  }
  function Fr(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function Hs(e, t) {
    for (var s = t + "Capture", o = []; e !== null; ) {
      var l = e, c = l.stateNode;
      l.tag === 5 && c !== null && (l = c, c = wr(e, s), c != null && o.unshift(Fr(e, c, l)), c = wr(e, t), c != null && o.push(Fr(e, c, l))), e = e.return;
    }
    return o;
  }
  function Yn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function $u(e, t, s, o, l) {
    for (var c = t._reactName, h = []; s !== null && s !== o; ) {
      var y = s, _ = y.alternate, R = y.stateNode;
      if (_ !== null && _ === o) break;
      y.tag === 5 && R !== null && (y = R, l ? (_ = wr(s, c), _ != null && h.unshift(Fr(s, _, y))) : l || (_ = wr(s, c), _ != null && h.push(Fr(s, _, y)))), s = s.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var jp = /\r\n?/g, Lp = /\u0000|\uFFFD/g;
  function Hu(e) {
    return (typeof e == "string" ? e : "" + e).replace(jp, `
`).replace(Lp, "");
  }
  function Vs(e, t, s) {
    if (t = Hu(t), Hu(e) !== t && s) throw Error(i(425));
  }
  function Ws() {
  }
  var Fo = null, Bo = null;
  function Uo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var $o = typeof setTimeout == "function" ? setTimeout : void 0, Op = typeof clearTimeout == "function" ? clearTimeout : void 0, Vu = typeof Promise == "function" ? Promise : void 0, zp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vu < "u" ? function(e) {
    return Vu.resolve(null).then(e).catch(Dp);
  } : $o;
  function Dp(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ho(e, t) {
    var s = t, o = 0;
    do {
      var l = s.nextSibling;
      if (e.removeChild(s), l && l.nodeType === 8) if (s = l.data, s === "/$") {
        if (o === 0) {
          e.removeChild(l), Ir(t);
          return;
        }
        o--;
      } else s !== "$" && s !== "$?" && s !== "$!" || o++;
      s = l;
    } while (s);
    Ir(t);
  }
  function sn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Wu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var s = e.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (t === 0) return e;
          t--;
        } else s === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var qn = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + qn, Br = "__reactProps$" + qn, Bt = "__reactContainer$" + qn, Vo = "__reactEvents$" + qn, Fp = "__reactListeners$" + qn, Bp = "__reactHandles$" + qn;
  function _n(e) {
    var t = e[Pt];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[Bt] || s[Pt]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = Wu(e); e !== null; ) {
          if (s = e[Pt]) return s;
          e = Wu(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Ur(e) {
    return e = e[Pt] || e[Bt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Gn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Qs(e) {
    return e[Br] || null;
  }
  var Wo = [], Kn = -1;
  function on(e) {
    return { current: e };
  }
  function we(e) {
    0 > Kn || (e.current = Wo[Kn], Wo[Kn] = null, Kn--);
  }
  function ye(e, t) {
    Kn++, Wo[Kn] = e.current, e.current = t;
  }
  var an = {}, Ve = on(an), Ze = on(!1), wn = an;
  function Jn(e, t) {
    var s = e.type.contextTypes;
    if (!s) return an;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var l = {}, c;
    for (c in s) l[c] = t[c];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function et(e) {
    return e = e.childContextTypes, e != null;
  }
  function Ys() {
    we(Ze), we(Ve);
  }
  function Qu(e, t, s) {
    if (Ve.current !== an) throw Error(i(168));
    ye(Ve, t), ye(Ze, s);
  }
  function Yu(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, ge(e) || "Unknown", l));
    return U({}, s, o);
  }
  function qs(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || an, wn = Ve.current, ye(Ve, e), ye(Ze, Ze.current), !0;
  }
  function qu(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = Yu(e, t, wn), o.__reactInternalMemoizedMergedChildContext = e, we(Ze), we(Ve), ye(Ve, e)) : we(Ze), ye(Ze, s);
  }
  var Ut = null, Gs = !1, Qo = !1;
  function Gu(e) {
    Ut === null ? Ut = [e] : Ut.push(e);
  }
  function Up(e) {
    Gs = !0, Gu(e);
  }
  function ln() {
    if (!Qo && Ut !== null) {
      Qo = !0;
      var e = 0, t = fe;
      try {
        var s = Ut;
        for (fe = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Ut = null, Gs = !1;
      } catch (l) {
        throw Ut !== null && (Ut = Ut.slice(e + 1)), Jl(po, ln), l;
      } finally {
        fe = t, Qo = !1;
      }
    }
    return null;
  }
  var Xn = [], Zn = 0, Ks = null, Js = 0, ft = [], ht = 0, Sn = null, $t = 1, Ht = "";
  function xn(e, t) {
    Xn[Zn++] = Js, Xn[Zn++] = Ks, Ks = e, Js = t;
  }
  function Ku(e, t, s) {
    ft[ht++] = $t, ft[ht++] = Ht, ft[ht++] = Sn, Sn = e;
    var o = $t;
    e = Ht;
    var l = 32 - wt(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - wt(t) + l;
    if (30 < c) {
      var h = l - l % 5;
      c = (o & (1 << h) - 1).toString(32), o >>= h, l -= h, $t = 1 << 32 - wt(t) + l | s << l | o, Ht = c + e;
    } else $t = 1 << c | s << l | o, Ht = e;
  }
  function Yo(e) {
    e.return !== null && (xn(e, 1), Ku(e, 1, 0));
  }
  function qo(e) {
    for (; e === Ks; ) Ks = Xn[--Zn], Xn[Zn] = null, Js = Xn[--Zn], Xn[Zn] = null;
    for (; e === Sn; ) Sn = ft[--ht], ft[ht] = null, Ht = ft[--ht], ft[ht] = null, $t = ft[--ht], ft[ht] = null;
  }
  var lt = null, ut = null, xe = !1, xt = null;
  function Ju(e, t) {
    var s = yt(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function Xu(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, lt = e, ut = sn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, lt = e, ut = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = Sn !== null ? { id: $t, overflow: Ht } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = yt(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, lt = e, ut = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Go(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Ko(e) {
    if (xe) {
      var t = ut;
      if (t) {
        var s = t;
        if (!Xu(e, t)) {
          if (Go(e)) throw Error(i(418));
          t = sn(s.nextSibling);
          var o = lt;
          t && Xu(e, t) ? Ju(o, s) : (e.flags = e.flags & -4097 | 2, xe = !1, lt = e);
        }
      } else {
        if (Go(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, xe = !1, lt = e;
      }
    }
  }
  function Zu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    lt = e;
  }
  function Xs(e) {
    if (e !== lt) return !1;
    if (!xe) return Zu(e), xe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Uo(e.type, e.memoizedProps)), t && (t = ut)) {
      if (Go(e)) throw ec(), Error(i(418));
      for (; t; ) Ju(e, t), t = sn(t.nextSibling);
    }
    if (Zu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (t === 0) {
                ut = sn(e.nextSibling);
                break e;
              }
              t--;
            } else s !== "$" && s !== "$!" && s !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        ut = null;
      }
    } else ut = lt ? sn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ec() {
    for (var e = ut; e; ) e = sn(e.nextSibling);
  }
  function er() {
    ut = lt = null, xe = !1;
  }
  function Jo(e) {
    xt === null ? xt = [e] : xt.push(e);
  }
  var $p = ie.ReactCurrentBatchConfig;
  function $r(e, t, s) {
    if (e = s.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(i(309));
          var o = s.stateNode;
        }
        if (!o) throw Error(i(147, e));
        var l = o, c = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === c ? t.ref : (t = function(h) {
          var y = l.refs;
          h === null ? delete y[c] : y[c] = h;
        }, t._stringRef = c, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!s._owner) throw Error(i(290, e));
    }
    return e;
  }
  function Zs(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function tc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function nc(e) {
    function t(E, x) {
      if (e) {
        var T = E.deletions;
        T === null ? (E.deletions = [x], E.flags |= 16) : T.push(x);
      }
    }
    function s(E, x) {
      if (!e) return null;
      for (; x !== null; ) t(E, x), x = x.sibling;
      return null;
    }
    function o(E, x) {
      for (E = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? E.set(x.key, x) : E.set(x.index, x), x = x.sibling;
      return E;
    }
    function l(E, x) {
      return E = gn(E, x), E.index = 0, E.sibling = null, E;
    }
    function c(E, x, T) {
      return E.index = T, e ? (T = E.alternate, T !== null ? (T = T.index, T < x ? (E.flags |= 2, x) : T) : (E.flags |= 2, x)) : (E.flags |= 1048576, x);
    }
    function h(E) {
      return e && E.alternate === null && (E.flags |= 2), E;
    }
    function y(E, x, T, O) {
      return x === null || x.tag !== 6 ? (x = $a(T, E.mode, O), x.return = E, x) : (x = l(x, T), x.return = E, x);
    }
    function _(E, x, T, O) {
      var W = T.type;
      return W === re ? N(E, x, T.props.children, O, T.key) : x !== null && (x.elementType === W || typeof W == "object" && W !== null && W.$$typeof === pe && tc(W) === x.type) ? (O = l(x, T.props), O.ref = $r(E, x, T), O.return = E, O) : (O = ki(T.type, T.key, T.props, null, E.mode, O), O.ref = $r(E, x, T), O.return = E, O);
    }
    function R(E, x, T, O) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== T.containerInfo || x.stateNode.implementation !== T.implementation ? (x = Ha(T, E.mode, O), x.return = E, x) : (x = l(x, T.children || []), x.return = E, x);
    }
    function N(E, x, T, O, W) {
      return x === null || x.tag !== 7 ? (x = Mn(T, E.mode, O, W), x.return = E, x) : (x = l(x, T), x.return = E, x);
    }
    function L(E, x, T) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = $a("" + x, E.mode, T), x.return = E, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case V:
            return T = ki(x.type, x.key, x.props, null, E.mode, T), T.ref = $r(E, null, x), T.return = E, T;
          case X:
            return x = Ha(x, E.mode, T), x.return = E, x;
          case pe:
            var O = x._init;
            return L(E, O(x._payload), T);
        }
        if (yr(x) || G(x)) return x = Mn(x, E.mode, T, null), x.return = E, x;
        Zs(E, x);
      }
      return null;
    }
    function M(E, x, T, O) {
      var W = x !== null ? x.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return W !== null ? null : y(E, x, "" + T, O);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case V:
            return T.key === W ? _(E, x, T, O) : null;
          case X:
            return T.key === W ? R(E, x, T, O) : null;
          case pe:
            return W = T._init, M(
              E,
              x,
              W(T._payload),
              O
            );
        }
        if (yr(T) || G(T)) return W !== null ? null : N(E, x, T, O, null);
        Zs(E, T);
      }
      return null;
    }
    function F(E, x, T, O, W) {
      if (typeof O == "string" && O !== "" || typeof O == "number") return E = E.get(T) || null, y(x, E, "" + O, W);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case V:
            return E = E.get(O.key === null ? T : O.key) || null, _(x, E, O, W);
          case X:
            return E = E.get(O.key === null ? T : O.key) || null, R(x, E, O, W);
          case pe:
            var Y = O._init;
            return F(E, x, T, Y(O._payload), W);
        }
        if (yr(O) || G(O)) return E = E.get(T) || null, N(x, E, O, W, null);
        Zs(x, O);
      }
      return null;
    }
    function $(E, x, T, O) {
      for (var W = null, Y = null, q = x, K = x = 0, Fe = null; q !== null && K < T.length; K++) {
        q.index > K ? (Fe = q, q = null) : Fe = q.sibling;
        var le = M(E, q, T[K], O);
        if (le === null) {
          q === null && (q = Fe);
          break;
        }
        e && q && le.alternate === null && t(E, q), x = c(le, x, K), Y === null ? W = le : Y.sibling = le, Y = le, q = Fe;
      }
      if (K === T.length) return s(E, q), xe && xn(E, K), W;
      if (q === null) {
        for (; K < T.length; K++) q = L(E, T[K], O), q !== null && (x = c(q, x, K), Y === null ? W = q : Y.sibling = q, Y = q);
        return xe && xn(E, K), W;
      }
      for (q = o(E, q); K < T.length; K++) Fe = F(q, E, K, T[K], O), Fe !== null && (e && Fe.alternate !== null && q.delete(Fe.key === null ? K : Fe.key), x = c(Fe, x, K), Y === null ? W = Fe : Y.sibling = Fe, Y = Fe);
      return e && q.forEach(function(yn) {
        return t(E, yn);
      }), xe && xn(E, K), W;
    }
    function H(E, x, T, O) {
      var W = G(T);
      if (typeof W != "function") throw Error(i(150));
      if (T = W.call(T), T == null) throw Error(i(151));
      for (var Y = W = null, q = x, K = x = 0, Fe = null, le = T.next(); q !== null && !le.done; K++, le = T.next()) {
        q.index > K ? (Fe = q, q = null) : Fe = q.sibling;
        var yn = M(E, q, le.value, O);
        if (yn === null) {
          q === null && (q = Fe);
          break;
        }
        e && q && yn.alternate === null && t(E, q), x = c(yn, x, K), Y === null ? W = yn : Y.sibling = yn, Y = yn, q = Fe;
      }
      if (le.done) return s(
        E,
        q
      ), xe && xn(E, K), W;
      if (q === null) {
        for (; !le.done; K++, le = T.next()) le = L(E, le.value, O), le !== null && (x = c(le, x, K), Y === null ? W = le : Y.sibling = le, Y = le);
        return xe && xn(E, K), W;
      }
      for (q = o(E, q); !le.done; K++, le = T.next()) le = F(q, E, K, le.value, O), le !== null && (e && le.alternate !== null && q.delete(le.key === null ? K : le.key), x = c(le, x, K), Y === null ? W = le : Y.sibling = le, Y = le);
      return e && q.forEach(function(Sm) {
        return t(E, Sm);
      }), xe && xn(E, K), W;
    }
    function Ae(E, x, T, O) {
      if (typeof T == "object" && T !== null && T.type === re && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case V:
            e: {
              for (var W = T.key, Y = x; Y !== null; ) {
                if (Y.key === W) {
                  if (W = T.type, W === re) {
                    if (Y.tag === 7) {
                      s(E, Y.sibling), x = l(Y, T.props.children), x.return = E, E = x;
                      break e;
                    }
                  } else if (Y.elementType === W || typeof W == "object" && W !== null && W.$$typeof === pe && tc(W) === Y.type) {
                    s(E, Y.sibling), x = l(Y, T.props), x.ref = $r(E, Y, T), x.return = E, E = x;
                    break e;
                  }
                  s(E, Y);
                  break;
                } else t(E, Y);
                Y = Y.sibling;
              }
              T.type === re ? (x = Mn(T.props.children, E.mode, O, T.key), x.return = E, E = x) : (O = ki(T.type, T.key, T.props, null, E.mode, O), O.ref = $r(E, x, T), O.return = E, E = O);
            }
            return h(E);
          case X:
            e: {
              for (Y = T.key; x !== null; ) {
                if (x.key === Y) if (x.tag === 4 && x.stateNode.containerInfo === T.containerInfo && x.stateNode.implementation === T.implementation) {
                  s(E, x.sibling), x = l(x, T.children || []), x.return = E, E = x;
                  break e;
                } else {
                  s(E, x);
                  break;
                }
                else t(E, x);
                x = x.sibling;
              }
              x = Ha(T, E.mode, O), x.return = E, E = x;
            }
            return h(E);
          case pe:
            return Y = T._init, Ae(E, x, Y(T._payload), O);
        }
        if (yr(T)) return $(E, x, T, O);
        if (G(T)) return H(E, x, T, O);
        Zs(E, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, x !== null && x.tag === 6 ? (s(E, x.sibling), x = l(x, T), x.return = E, E = x) : (s(E, x), x = $a(T, E.mode, O), x.return = E, E = x), h(E)) : s(E, x);
    }
    return Ae;
  }
  var tr = nc(!0), rc = nc(!1), ei = on(null), ti = null, nr = null, Xo = null;
  function Zo() {
    Xo = nr = ti = null;
  }
  function ea(e) {
    var t = ei.current;
    we(ei), e._currentValue = t;
  }
  function ta(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function rr(e, t) {
    ti = e, Xo = nr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (tt = !0), e.firstContext = null);
  }
  function pt(e) {
    var t = e._currentValue;
    if (Xo !== e) if (e = { context: e, memoizedValue: t, next: null }, nr === null) {
      if (ti === null) throw Error(i(308));
      nr = e, ti.dependencies = { lanes: 0, firstContext: e };
    } else nr = nr.next = e;
    return t;
  }
  var kn = null;
  function na(e) {
    kn === null ? kn = [e] : kn.push(e);
  }
  function sc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, na(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Vt(e, o);
  }
  function Vt(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var un = !1;
  function ra(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function ic(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Wt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function cn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (se & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Vt(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, na(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Vt(e, s);
  }
  function ni(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, yo(e, s);
    }
  }
  function oc(e, t) {
    var s = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, s === o)) {
      var l = null, c = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var h = { eventTime: s.eventTime, lane: s.lane, tag: s.tag, payload: s.payload, callback: s.callback, next: null };
          c === null ? l = c = h : c = c.next = h, s = s.next;
        } while (s !== null);
        c === null ? l = c = t : c = c.next = t;
      } else l = c = t;
      s = { baseState: o.baseState, firstBaseUpdate: l, lastBaseUpdate: c, shared: o.shared, effects: o.effects }, e.updateQueue = s;
      return;
    }
    e = s.lastBaseUpdate, e === null ? s.firstBaseUpdate = t : e.next = t, s.lastBaseUpdate = t;
  }
  function ri(e, t, s, o) {
    var l = e.updateQueue;
    un = !1;
    var c = l.firstBaseUpdate, h = l.lastBaseUpdate, y = l.shared.pending;
    if (y !== null) {
      l.shared.pending = null;
      var _ = y, R = _.next;
      _.next = null, h === null ? c = R : h.next = R, h = _;
      var N = e.alternate;
      N !== null && (N = N.updateQueue, y = N.lastBaseUpdate, y !== h && (y === null ? N.firstBaseUpdate = R : y.next = R, N.lastBaseUpdate = _));
    }
    if (c !== null) {
      var L = l.baseState;
      h = 0, N = R = _ = null, y = c;
      do {
        var M = y.lane, F = y.eventTime;
        if ((o & M) === M) {
          N !== null && (N = N.next = {
            eventTime: F,
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          });
          e: {
            var $ = e, H = y;
            switch (M = t, F = s, H.tag) {
              case 1:
                if ($ = H.payload, typeof $ == "function") {
                  L = $.call(F, L, M);
                  break e;
                }
                L = $;
                break e;
              case 3:
                $.flags = $.flags & -65537 | 128;
              case 0:
                if ($ = H.payload, M = typeof $ == "function" ? $.call(F, L, M) : $, M == null) break e;
                L = U({}, L, M);
                break e;
              case 2:
                un = !0;
            }
          }
          y.callback !== null && y.lane !== 0 && (e.flags |= 64, M = l.effects, M === null ? l.effects = [y] : M.push(y));
        } else F = { eventTime: F, lane: M, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, N === null ? (R = N = F, _ = L) : N = N.next = F, h |= M;
        if (y = y.next, y === null) {
          if (y = l.shared.pending, y === null) break;
          M = y, y = M.next, M.next = null, l.lastBaseUpdate = M, l.shared.pending = null;
        }
      } while (!0);
      if (N === null && (_ = L), l.baseState = _, l.firstBaseUpdate = R, l.lastBaseUpdate = N, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          h |= l.lane, l = l.next;
        while (l !== t);
      } else c === null && (l.shared.lanes = 0);
      Tn |= h, e.lanes = h, e.memoizedState = L;
    }
  }
  function ac(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = s, typeof l != "function") throw Error(i(191, l));
        l.call(o);
      }
    }
  }
  var Hr = {}, jt = on(Hr), Vr = on(Hr), Wr = on(Hr);
  function En(e) {
    if (e === Hr) throw Error(i(174));
    return e;
  }
  function sa(e, t) {
    switch (ye(Wr, t), ye(Vr, e), ye(jt, Hr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : so(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = so(t, e);
    }
    we(jt), ye(jt, t);
  }
  function sr() {
    we(jt), we(Vr), we(Wr);
  }
  function lc(e) {
    En(Wr.current);
    var t = En(jt.current), s = so(t, e.type);
    t !== s && (ye(Vr, e), ye(jt, s));
  }
  function ia(e) {
    Vr.current === e && (we(jt), we(Vr));
  }
  var ke = on(0);
  function si(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var s = t.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || s.data === "$?" || s.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var oa = [];
  function aa() {
    for (var e = 0; e < oa.length; e++) oa[e]._workInProgressVersionPrimary = null;
    oa.length = 0;
  }
  var ii = ie.ReactCurrentDispatcher, la = ie.ReactCurrentBatchConfig, bn = 0, Ee = null, Pe = null, ze = null, oi = !1, Qr = !1, Yr = 0, Hp = 0;
  function We() {
    throw Error(i(321));
  }
  function ua(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!St(e[s], t[s])) return !1;
    return !0;
  }
  function ca(e, t, s, o, l, c) {
    if (bn = c, Ee = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ii.current = e === null || e.memoizedState === null ? Yp : qp, e = s(o, l), Qr) {
      c = 0;
      do {
        if (Qr = !1, Yr = 0, 25 <= c) throw Error(i(301));
        c += 1, ze = Pe = null, t.updateQueue = null, ii.current = Gp, e = s(o, l);
      } while (Qr);
    }
    if (ii.current = ui, t = Pe !== null && Pe.next !== null, bn = 0, ze = Pe = Ee = null, oi = !1, t) throw Error(i(300));
    return e;
  }
  function da() {
    var e = Yr !== 0;
    return Yr = 0, e;
  }
  function Lt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ze === null ? Ee.memoizedState = ze = e : ze = ze.next = e, ze;
  }
  function mt() {
    if (Pe === null) {
      var e = Ee.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Pe.next;
    var t = ze === null ? Ee.memoizedState : ze.next;
    if (t !== null) ze = t, Pe = e;
    else {
      if (e === null) throw Error(i(310));
      Pe = e, e = { memoizedState: Pe.memoizedState, baseState: Pe.baseState, baseQueue: Pe.baseQueue, queue: Pe.queue, next: null }, ze === null ? Ee.memoizedState = ze = e : ze = ze.next = e;
    }
    return ze;
  }
  function qr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function fa(e) {
    var t = mt(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = Pe, l = o.baseQueue, c = s.pending;
    if (c !== null) {
      if (l !== null) {
        var h = l.next;
        l.next = c.next, c.next = h;
      }
      o.baseQueue = l = c, s.pending = null;
    }
    if (l !== null) {
      c = l.next, o = o.baseState;
      var y = h = null, _ = null, R = c;
      do {
        var N = R.lane;
        if ((bn & N) === N) _ !== null && (_ = _.next = { lane: 0, action: R.action, hasEagerState: R.hasEagerState, eagerState: R.eagerState, next: null }), o = R.hasEagerState ? R.eagerState : e(o, R.action);
        else {
          var L = {
            lane: N,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          };
          _ === null ? (y = _ = L, h = o) : _ = _.next = L, Ee.lanes |= N, Tn |= N;
        }
        R = R.next;
      } while (R !== null && R !== c);
      _ === null ? h = o : _.next = y, St(o, t.memoizedState) || (tt = !0), t.memoizedState = o, t.baseState = h, t.baseQueue = _, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, Ee.lanes |= c, Tn |= c, l = l.next;
      while (l !== e);
    } else l === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function ha(e) {
    var t = mt(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = s.dispatch, l = s.pending, c = t.memoizedState;
    if (l !== null) {
      s.pending = null;
      var h = l = l.next;
      do
        c = e(c, h.action), h = h.next;
      while (h !== l);
      St(c, t.memoizedState) || (tt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), s.lastRenderedState = c;
    }
    return [c, o];
  }
  function uc() {
  }
  function cc(e, t) {
    var s = Ee, o = mt(), l = t(), c = !St(o.memoizedState, l);
    if (c && (o.memoizedState = l, tt = !0), o = o.queue, pa(hc.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || ze !== null && ze.memoizedState.tag & 1) {
      if (s.flags |= 2048, Gr(9, fc.bind(null, s, o, l, t), void 0, null), De === null) throw Error(i(349));
      (bn & 30) !== 0 || dc(s, t, l);
    }
    return l;
  }
  function dc(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = Ee.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ee.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function fc(e, t, s, o) {
    t.value = s, t.getSnapshot = o, pc(t) && mc(e);
  }
  function hc(e, t, s) {
    return s(function() {
      pc(t) && mc(e);
    });
  }
  function pc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !St(e, s);
    } catch {
      return !0;
    }
  }
  function mc(e) {
    var t = Vt(e, 1);
    t !== null && Tt(t, e, 1, -1);
  }
  function gc(e) {
    var t = Lt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: qr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Qp.bind(null, Ee, e), [t.memoizedState, e];
  }
  function Gr(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = Ee.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ee.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function yc() {
    return mt().memoizedState;
  }
  function ai(e, t, s, o) {
    var l = Lt();
    Ee.flags |= e, l.memoizedState = Gr(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function li(e, t, s, o) {
    var l = mt();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (Pe !== null) {
      var h = Pe.memoizedState;
      if (c = h.destroy, o !== null && ua(o, h.deps)) {
        l.memoizedState = Gr(t, s, c, o);
        return;
      }
    }
    Ee.flags |= e, l.memoizedState = Gr(1 | t, s, c, o);
  }
  function vc(e, t) {
    return ai(8390656, 8, e, t);
  }
  function pa(e, t) {
    return li(2048, 8, e, t);
  }
  function _c(e, t) {
    return li(4, 2, e, t);
  }
  function wc(e, t) {
    return li(4, 4, e, t);
  }
  function Sc(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function xc(e, t, s) {
    return s = s != null ? s.concat([e]) : null, li(4, 4, Sc.bind(null, t, e), s);
  }
  function ma() {
  }
  function kc(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && ua(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function Ec(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && ua(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function bc(e, t, s) {
    return (bn & 21) === 0 ? (e.baseState && (e.baseState = !1, tt = !0), e.memoizedState = s) : (St(s, t) || (s = tu(), Ee.lanes |= s, Tn |= s, e.baseState = !0), t);
  }
  function Vp(e, t) {
    var s = fe;
    fe = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = la.transition;
    la.transition = {};
    try {
      e(!1), t();
    } finally {
      fe = s, la.transition = o;
    }
  }
  function Tc() {
    return mt().memoizedState;
  }
  function Wp(e, t, s) {
    var o = pn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, Cc(e)) Rc(t, s);
    else if (s = sc(e, t, s, o), s !== null) {
      var l = Ke();
      Tt(s, e, o, l), Ic(s, t, o);
    }
  }
  function Qp(e, t, s) {
    var o = pn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Cc(e)) Rc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var h = t.lastRenderedState, y = c(h, s);
        if (l.hasEagerState = !0, l.eagerState = y, St(y, h)) {
          var _ = t.interleaved;
          _ === null ? (l.next = l, na(t)) : (l.next = _.next, _.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = sc(e, t, l, o), s !== null && (l = Ke(), Tt(s, e, o, l), Ic(s, t, o));
    }
  }
  function Cc(e) {
    var t = e.alternate;
    return e === Ee || t !== null && t === Ee;
  }
  function Rc(e, t) {
    Qr = oi = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Ic(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, yo(e, s);
    }
  }
  var ui = { readContext: pt, useCallback: We, useContext: We, useEffect: We, useImperativeHandle: We, useInsertionEffect: We, useLayoutEffect: We, useMemo: We, useReducer: We, useRef: We, useState: We, useDebugValue: We, useDeferredValue: We, useTransition: We, useMutableSource: We, useSyncExternalStore: We, useId: We, unstable_isNewReconciler: !1 }, Yp = { readContext: pt, useCallback: function(e, t) {
    return Lt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: pt, useEffect: vc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, ai(
      4194308,
      4,
      Sc.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return ai(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ai(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = Lt();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = Lt();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Wp.bind(null, Ee, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Lt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: gc, useDebugValue: ma, useDeferredValue: function(e) {
    return Lt().memoizedState = e;
  }, useTransition: function() {
    var e = gc(!1), t = e[0];
    return e = Vp.bind(null, e[1]), Lt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = Ee, l = Lt();
    if (xe) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), De === null) throw Error(i(349));
      (bn & 30) !== 0 || dc(o, t, s);
    }
    l.memoizedState = s;
    var c = { value: s, getSnapshot: t };
    return l.queue = c, vc(hc.bind(
      null,
      o,
      c,
      e
    ), [e]), o.flags |= 2048, Gr(9, fc.bind(null, o, c, s, t), void 0, null), s;
  }, useId: function() {
    var e = Lt(), t = De.identifierPrefix;
    if (xe) {
      var s = Ht, o = $t;
      s = (o & ~(1 << 32 - wt(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = Yr++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = Hp++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, qp = {
    readContext: pt,
    useCallback: kc,
    useContext: pt,
    useEffect: pa,
    useImperativeHandle: xc,
    useInsertionEffect: _c,
    useLayoutEffect: wc,
    useMemo: Ec,
    useReducer: fa,
    useRef: yc,
    useState: function() {
      return fa(qr);
    },
    useDebugValue: ma,
    useDeferredValue: function(e) {
      var t = mt();
      return bc(t, Pe.memoizedState, e);
    },
    useTransition: function() {
      var e = fa(qr)[0], t = mt().memoizedState;
      return [e, t];
    },
    useMutableSource: uc,
    useSyncExternalStore: cc,
    useId: Tc,
    unstable_isNewReconciler: !1
  }, Gp = { readContext: pt, useCallback: kc, useContext: pt, useEffect: pa, useImperativeHandle: xc, useInsertionEffect: _c, useLayoutEffect: wc, useMemo: Ec, useReducer: ha, useRef: yc, useState: function() {
    return ha(qr);
  }, useDebugValue: ma, useDeferredValue: function(e) {
    var t = mt();
    return Pe === null ? t.memoizedState = e : bc(t, Pe.memoizedState, e);
  }, useTransition: function() {
    var e = ha(qr)[0], t = mt().memoizedState;
    return [e, t];
  }, useMutableSource: uc, useSyncExternalStore: cc, useId: Tc, unstable_isNewReconciler: !1 };
  function kt(e, t) {
    if (e && e.defaultProps) {
      t = U({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function ga(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : U({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var ci = { isMounted: function(e) {
    return (e = e._reactInternals) ? vn(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = Ke(), l = pn(e), c = Wt(o, l);
    c.payload = t, s != null && (c.callback = s), t = cn(e, c, l), t !== null && (Tt(t, e, l, o), ni(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = Ke(), l = pn(e), c = Wt(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = cn(e, c, l), t !== null && (Tt(t, e, l, o), ni(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = Ke(), o = pn(e), l = Wt(s, o);
    l.tag = 2, t != null && (l.callback = t), t = cn(e, l, o), t !== null && (Tt(t, e, o, s), ni(t, e, o));
  } };
  function Mc(e, t, s, o, l, c, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, h) : t.prototype && t.prototype.isPureReactComponent ? !Lr(s, o) || !Lr(l, c) : !0;
  }
  function Ac(e, t, s) {
    var o = !1, l = an, c = t.contextType;
    return typeof c == "object" && c !== null ? c = pt(c) : (l = et(t) ? wn : Ve.current, o = t.contextTypes, c = (o = o != null) ? Jn(e, l) : an), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ci, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Nc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && ci.enqueueReplaceState(t, t.state, null);
  }
  function ya(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, ra(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = pt(c) : (c = et(t) ? wn : Ve.current, l.context = Jn(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (ga(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ci.enqueueReplaceState(l, l.state, null), ri(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function ir(e, t) {
    try {
      var s = "", o = t;
      do
        s += oe(o), o = o.return;
      while (o);
      var l = s;
    } catch (c) {
      l = `
Error generating stack: ` + c.message + `
` + c.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function va(e, t, s) {
    return { value: e, source: null, stack: s ?? null, digest: t ?? null };
  }
  function _a(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var Kp = typeof WeakMap == "function" ? WeakMap : Map;
  function Pc(e, t, s) {
    s = Wt(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      yi || (yi = !0, ja = o), _a(e, t);
    }, s;
  }
  function jc(e, t, s) {
    s = Wt(-1, s), s.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var l = t.value;
      s.payload = function() {
        return o(l);
      }, s.callback = function() {
        _a(e, t);
      };
    }
    var c = e.stateNode;
    return c !== null && typeof c.componentDidCatch == "function" && (s.callback = function() {
      _a(e, t), typeof o != "function" && (fn === null ? fn = /* @__PURE__ */ new Set([this]) : fn.add(this));
      var h = t.stack;
      this.componentDidCatch(t.value, { componentStack: h !== null ? h : "" });
    }), s;
  }
  function Lc(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Kp();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = cm.bind(null, e, t, s), t.then(e, e));
  }
  function Oc(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function zc(e, t, s, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = Wt(-1, 1), t.tag = 2, cn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var Jp = ie.ReactCurrentOwner, tt = !1;
  function Ge(e, t, s, o) {
    t.child = e === null ? rc(t, null, s, o) : tr(t, e.child, s, o);
  }
  function Dc(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return rr(t, l), o = ca(e, t, s, o, c, l), s = da(), e !== null && !tt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qt(e, t, l)) : (xe && s && Yo(t), t.flags |= 1, Ge(e, t, o, l), t.child);
  }
  function Fc(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !Ua(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, Bc(e, t, c, o, l)) : (e = ki(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var h = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Lr, s(h, o) && e.ref === t.ref) return Qt(e, t, l);
    }
    return t.flags |= 1, e = gn(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Bc(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Lr(c, o) && e.ref === t.ref) if (tt = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (tt = !0);
      else return t.lanes = e.lanes, Qt(e, t, l);
    }
    return wa(e, t, s, o, l);
  }
  function Uc(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ye(ar, ct), ct |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ye(ar, ct), ct |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, ye(ar, ct), ct |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, ye(ar, ct), ct |= o;
    return Ge(e, t, l, s), t.child;
  }
  function $c(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function wa(e, t, s, o, l) {
    var c = et(s) ? wn : Ve.current;
    return c = Jn(t, c), rr(t, l), s = ca(e, t, s, o, c, l), o = da(), e !== null && !tt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qt(e, t, l)) : (xe && o && Yo(t), t.flags |= 1, Ge(e, t, s, l), t.child);
  }
  function Hc(e, t, s, o, l) {
    if (et(s)) {
      var c = !0;
      qs(t);
    } else c = !1;
    if (rr(t, l), t.stateNode === null) fi(e, t), Ac(t, s, o), ya(t, s, o, l), o = !0;
    else if (e === null) {
      var h = t.stateNode, y = t.memoizedProps;
      h.props = y;
      var _ = h.context, R = s.contextType;
      typeof R == "object" && R !== null ? R = pt(R) : (R = et(s) ? wn : Ve.current, R = Jn(t, R));
      var N = s.getDerivedStateFromProps, L = typeof N == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      L || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== o || _ !== R) && Nc(t, h, o, R), un = !1;
      var M = t.memoizedState;
      h.state = M, ri(t, o, h, l), _ = t.memoizedState, y !== o || M !== _ || Ze.current || un ? (typeof N == "function" && (ga(t, s, N, o), _ = t.memoizedState), (y = un || Mc(t, s, y, o, M, _, R)) ? (L || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = _), h.props = o, h.state = _, h.context = R, o = y) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      h = t.stateNode, ic(e, t), y = t.memoizedProps, R = t.type === t.elementType ? y : kt(t.type, y), h.props = R, L = t.pendingProps, M = h.context, _ = s.contextType, typeof _ == "object" && _ !== null ? _ = pt(_) : (_ = et(s) ? wn : Ve.current, _ = Jn(t, _));
      var F = s.getDerivedStateFromProps;
      (N = typeof F == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== L || M !== _) && Nc(t, h, o, _), un = !1, M = t.memoizedState, h.state = M, ri(t, o, h, l);
      var $ = t.memoizedState;
      y !== L || M !== $ || Ze.current || un ? (typeof F == "function" && (ga(t, s, F, o), $ = t.memoizedState), (R = un || Mc(t, s, R, o, M, $, _) || !1) ? (N || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, $, _), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, $, _)), typeof h.componentDidUpdate == "function" && (t.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = $), h.props = o, h.state = $, h.context = _, o = R) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Sa(e, t, s, o, c, l);
  }
  function Sa(e, t, s, o, l, c) {
    $c(e, t);
    var h = (t.flags & 128) !== 0;
    if (!o && !h) return l && qu(t, s, !1), Qt(e, t, c);
    o = t.stateNode, Jp.current = t;
    var y = h && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && h ? (t.child = tr(t, e.child, null, c), t.child = tr(t, null, y, c)) : Ge(e, t, y, c), t.memoizedState = o.state, l && qu(t, s, !0), t.child;
  }
  function Vc(e) {
    var t = e.stateNode;
    t.pendingContext ? Qu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Qu(e, t.context, !1), sa(e, t.containerInfo);
  }
  function Wc(e, t, s, o, l) {
    return er(), Jo(l), t.flags |= 256, Ge(e, t, s, o), t.child;
  }
  var xa = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ka(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Qc(e, t, s) {
    var o = t.pendingProps, l = ke.current, c = !1, h = (t.flags & 128) !== 0, y;
    if ((y = h) || (y = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), y ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), ye(ke, l & 1), e === null)
      return Ko(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (h = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, h = { mode: "hidden", children: h }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = h) : c = Ei(h, o, 0, null), e = Mn(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = ka(s), t.memoizedState = xa, e) : Ea(t, h));
    if (l = e.memoizedState, l !== null && (y = l.dehydrated, y !== null)) return Xp(e, t, h, o, y, l, s);
    if (c) {
      c = o.fallback, h = t.mode, l = e.child, y = l.sibling;
      var _ = { mode: "hidden", children: o.children };
      return (h & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = _, t.deletions = null) : (o = gn(l, _), o.subtreeFlags = l.subtreeFlags & 14680064), y !== null ? c = gn(y, c) : (c = Mn(c, h, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, h = e.child.memoizedState, h = h === null ? ka(s) : { baseLanes: h.baseLanes | s, cachePool: null, transitions: h.transitions }, c.memoizedState = h, c.childLanes = e.childLanes & ~s, t.memoizedState = xa, o;
    }
    return c = e.child, e = c.sibling, o = gn(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Ea(e, t) {
    return t = Ei({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function di(e, t, s, o) {
    return o !== null && Jo(o), tr(t, e.child, null, s), e = Ea(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Xp(e, t, s, o, l, c, h) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = va(Error(i(422))), di(e, t, h, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Ei({ mode: "visible", children: o.children }, l, 0, null), c = Mn(c, l, h, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && tr(t, e.child, null, h), t.child.memoizedState = ka(h), t.memoizedState = xa, c);
    if ((t.mode & 1) === 0) return di(e, t, h, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var y = o.dgst;
      return o = y, c = Error(i(419)), o = va(c, o, void 0), di(e, t, h, o);
    }
    if (y = (h & e.childLanes) !== 0, tt || y) {
      if (o = De, o !== null) {
        switch (h & -h) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        l = (l & (o.suspendedLanes | h)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Vt(e, l), Tt(o, e, l, -1));
      }
      return Ba(), o = va(Error(i(421))), di(e, t, h, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = dm.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, ut = sn(l.nextSibling), lt = t, xe = !0, xt = null, e !== null && (ft[ht++] = $t, ft[ht++] = Ht, ft[ht++] = Sn, $t = e.id, Ht = e.overflow, Sn = t), t = Ea(t, o.children), t.flags |= 4096, t);
  }
  function Yc(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), ta(e.return, t, s);
  }
  function ba(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function qc(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (Ge(e, t, o.children, s), o = ke.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Yc(e, s, t);
        else if (e.tag === 19) Yc(e, s, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      o &= 1;
    }
    if (ye(ke, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (s = t.child, l = null; s !== null; ) e = s.alternate, e !== null && si(e) === null && (l = s), s = s.sibling;
        s = l, s === null ? (l = t.child, t.child = null) : (l = s.sibling, s.sibling = null), ba(t, !1, l, s, c);
        break;
      case "backwards":
        for (s = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && si(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = s, s = l, l = e;
        }
        ba(t, !0, s, null, c);
        break;
      case "together":
        ba(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function fi(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Qt(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), Tn |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = gn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = gn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function Zp(e, t, s) {
    switch (t.tag) {
      case 3:
        Vc(t), er();
        break;
      case 5:
        lc(t);
        break;
      case 1:
        et(t.type) && qs(t);
        break;
      case 4:
        sa(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        ye(ei, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (ye(ke, ke.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? Qc(e, t, s) : (ye(ke, ke.current & 1), e = Qt(e, t, s), e !== null ? e.sibling : null);
        ye(ke, ke.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return qc(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), ye(ke, ke.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Uc(e, t, s);
    }
    return Qt(e, t, s);
  }
  var Gc, Ta, Kc, Jc;
  Gc = function(e, t) {
    for (var s = t.child; s !== null; ) {
      if (s.tag === 5 || s.tag === 6) e.appendChild(s.stateNode);
      else if (s.tag !== 4 && s.child !== null) {
        s.child.return = s, s = s.child;
        continue;
      }
      if (s === t) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === t) return;
        s = s.return;
      }
      s.sibling.return = s.return, s = s.sibling;
    }
  }, Ta = function() {
  }, Kc = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, En(jt.current);
      var c = null;
      switch (s) {
        case "input":
          l = eo(e, l), o = eo(e, o), c = [];
          break;
        case "select":
          l = U({}, l, { value: void 0 }), o = U({}, o, { value: void 0 }), c = [];
          break;
        case "textarea":
          l = ro(e, l), o = ro(e, o), c = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Ws);
      }
      io(s, o);
      var h;
      s = null;
      for (R in l) if (!o.hasOwnProperty(R) && l.hasOwnProperty(R) && l[R] != null) if (R === "style") {
        var y = l[R];
        for (h in y) y.hasOwnProperty(h) && (s || (s = {}), s[h] = "");
      } else R !== "dangerouslySetInnerHTML" && R !== "children" && R !== "suppressContentEditableWarning" && R !== "suppressHydrationWarning" && R !== "autoFocus" && (u.hasOwnProperty(R) ? c || (c = []) : (c = c || []).push(R, null));
      for (R in o) {
        var _ = o[R];
        if (y = l?.[R], o.hasOwnProperty(R) && _ !== y && (_ != null || y != null)) if (R === "style") if (y) {
          for (h in y) !y.hasOwnProperty(h) || _ && _.hasOwnProperty(h) || (s || (s = {}), s[h] = "");
          for (h in _) _.hasOwnProperty(h) && y[h] !== _[h] && (s || (s = {}), s[h] = _[h]);
        } else s || (c || (c = []), c.push(
          R,
          s
        )), s = _;
        else R === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, y = y ? y.__html : void 0, _ != null && y !== _ && (c = c || []).push(R, _)) : R === "children" ? typeof _ != "string" && typeof _ != "number" || (c = c || []).push(R, "" + _) : R !== "suppressContentEditableWarning" && R !== "suppressHydrationWarning" && (u.hasOwnProperty(R) ? (_ != null && R === "onScroll" && _e("scroll", e), c || y === _ || (c = [])) : (c = c || []).push(R, _));
      }
      s && (c = c || []).push("style", s);
      var R = c;
      (t.updateQueue = R) && (t.flags |= 4);
    }
  }, Jc = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function Kr(e, t) {
    if (!xe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var s = null; t !== null; ) t.alternate !== null && (s = t), t = t.sibling;
        s === null ? e.tail = null : s.sibling = null;
        break;
      case "collapsed":
        s = e.tail;
        for (var o = null; s !== null; ) s.alternate !== null && (o = s), s = s.sibling;
        o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
    }
  }
  function Qe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = s, t;
  }
  function em(e, t, s) {
    var o = t.pendingProps;
    switch (qo(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Qe(t), null;
      case 1:
        return et(t.type) && Ys(), Qe(t), null;
      case 3:
        return o = t.stateNode, sr(), we(Ze), we(Ve), aa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (Xs(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, xt !== null && (za(xt), xt = null))), Ta(e, t), Qe(t), null;
      case 5:
        ia(t);
        var l = En(Wr.current);
        if (s = t.type, e !== null && t.stateNode != null) Kc(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return Qe(t), null;
          }
          if (e = En(jt.current), Xs(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[Pt] = t, o[Br] = c, e = (t.mode & 1) !== 0, s) {
              case "dialog":
                _e("cancel", o), _e("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                _e("load", o);
                break;
              case "video":
              case "audio":
                for (l = 0; l < zr.length; l++) _e(zr[l], o);
                break;
              case "source":
                _e("error", o);
                break;
              case "img":
              case "image":
              case "link":
                _e(
                  "error",
                  o
                ), _e("load", o);
                break;
              case "details":
                _e("toggle", o);
                break;
              case "input":
                Al(o, c), _e("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, _e("invalid", o);
                break;
              case "textarea":
                jl(o, c), _e("invalid", o);
            }
            io(s, c), l = null;
            for (var h in c) if (c.hasOwnProperty(h)) {
              var y = c[h];
              h === "children" ? typeof y == "string" ? o.textContent !== y && (c.suppressHydrationWarning !== !0 && Vs(o.textContent, y, e), l = ["children", y]) : typeof y == "number" && o.textContent !== "" + y && (c.suppressHydrationWarning !== !0 && Vs(
                o.textContent,
                y,
                e
              ), l = ["children", "" + y]) : u.hasOwnProperty(h) && y != null && h === "onScroll" && _e("scroll", o);
            }
            switch (s) {
              case "input":
                Ss(o), Pl(o, c, !0);
                break;
              case "textarea":
                Ss(o), Ol(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = Ws);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            h = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = zl(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = h.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = h.createElement(s, { is: o.is }) : (e = h.createElement(s), s === "select" && (h = e, o.multiple ? h.multiple = !0 : o.size && (h.size = o.size))) : e = h.createElementNS(e, s), e[Pt] = t, e[Br] = o, Gc(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (h = oo(s, o), s) {
                case "dialog":
                  _e("cancel", e), _e("close", e), l = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  _e("load", e), l = o;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < zr.length; l++) _e(zr[l], e);
                  l = o;
                  break;
                case "source":
                  _e("error", e), l = o;
                  break;
                case "img":
                case "image":
                case "link":
                  _e(
                    "error",
                    e
                  ), _e("load", e), l = o;
                  break;
                case "details":
                  _e("toggle", e), l = o;
                  break;
                case "input":
                  Al(e, o), l = eo(e, o), _e("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = U({}, o, { value: void 0 }), _e("invalid", e);
                  break;
                case "textarea":
                  jl(e, o), l = ro(e, o), _e("invalid", e);
                  break;
                default:
                  l = o;
              }
              io(s, l), y = l;
              for (c in y) if (y.hasOwnProperty(c)) {
                var _ = y[c];
                c === "style" ? Bl(e, _) : c === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, _ != null && Dl(e, _)) : c === "children" ? typeof _ == "string" ? (s !== "textarea" || _ !== "") && vr(e, _) : typeof _ == "number" && vr(e, "" + _) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? _ != null && c === "onScroll" && _e("scroll", e) : _ != null && Z(e, c, _, h));
              }
              switch (s) {
                case "input":
                  Ss(e), Pl(e, o, !1);
                  break;
                case "textarea":
                  Ss(e), Ol(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + de(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, c = o.value, c != null ? Fn(e, !!o.multiple, c, !1) : o.defaultValue != null && Fn(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Ws);
              }
              switch (s) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Qe(t), null;
      case 6:
        if (e && t.stateNode != null) Jc(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = En(Wr.current), En(jt.current), Xs(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[Pt] = t, (c = o.nodeValue !== s) && (e = lt, e !== null)) switch (e.tag) {
              case 3:
                Vs(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Vs(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[Pt] = t, t.stateNode = o;
        }
        return Qe(t), null;
      case 13:
        if (we(ke), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (xe && ut !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) ec(), er(), t.flags |= 98560, c = !1;
          else if (c = Xs(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[Pt] = t;
            } else er(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Qe(t), c = !1;
          } else xt !== null && (za(xt), xt = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ke.current & 1) !== 0 ? je === 0 && (je = 3) : Ba())), t.updateQueue !== null && (t.flags |= 4), Qe(t), null);
      case 4:
        return sr(), Ta(e, t), e === null && Dr(t.stateNode.containerInfo), Qe(t), null;
      case 10:
        return ea(t.type._context), Qe(t), null;
      case 17:
        return et(t.type) && Ys(), Qe(t), null;
      case 19:
        if (we(ke), c = t.memoizedState, c === null) return Qe(t), null;
        if (o = (t.flags & 128) !== 0, h = c.rendering, h === null) if (o) Kr(c, !1);
        else {
          if (je !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (h = si(e), h !== null) {
              for (t.flags |= 128, Kr(c, !1), o = h.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, h = c.alternate, h === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = h.childLanes, c.lanes = h.lanes, c.child = h.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = h.memoizedProps, c.memoizedState = h.memoizedState, c.updateQueue = h.updateQueue, c.type = h.type, e = h.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return ye(ke, ke.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && Me() > lr && (t.flags |= 128, o = !0, Kr(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = si(h), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), Kr(c, !0), c.tail === null && c.tailMode === "hidden" && !h.alternate && !xe) return Qe(t), null;
          } else 2 * Me() - c.renderingStartTime > lr && s !== 1073741824 && (t.flags |= 128, o = !0, Kr(c, !1), t.lanes = 4194304);
          c.isBackwards ? (h.sibling = t.child, t.child = h) : (s = c.last, s !== null ? s.sibling = h : t.child = h, c.last = h);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = Me(), t.sibling = null, s = ke.current, ye(ke, o ? s & 1 | 2 : s & 1), t) : (Qe(t), null);
      case 22:
      case 23:
        return Fa(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (ct & 1073741824) !== 0 && (Qe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Qe(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function tm(e, t) {
    switch (qo(t), t.tag) {
      case 1:
        return et(t.type) && Ys(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return sr(), we(Ze), we(Ve), aa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ia(t), null;
      case 13:
        if (we(ke), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          er();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return we(ke), null;
      case 4:
        return sr(), null;
      case 10:
        return ea(t.type._context), null;
      case 22:
      case 23:
        return Fa(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var hi = !1, Ye = !1, nm = typeof WeakSet == "function" ? WeakSet : Set, B = null;
  function or(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      Te(e, t, o);
    }
    else s.current = null;
  }
  function Ca(e, t, s) {
    try {
      s();
    } catch (o) {
      Te(e, t, o);
    }
  }
  var Xc = !1;
  function rm(e, t) {
    if (Fo = Ps, e = Mu(), Ao(e)) {
      if ("selectionStart" in e) var s = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        s = (s = e.ownerDocument) && s.defaultView || window;
        var o = s.getSelection && s.getSelection();
        if (o && o.rangeCount !== 0) {
          s = o.anchorNode;
          var l = o.anchorOffset, c = o.focusNode;
          o = o.focusOffset;
          try {
            s.nodeType, c.nodeType;
          } catch {
            s = null;
            break e;
          }
          var h = 0, y = -1, _ = -1, R = 0, N = 0, L = e, M = null;
          t: for (; ; ) {
            for (var F; L !== s || l !== 0 && L.nodeType !== 3 || (y = h + l), L !== c || o !== 0 && L.nodeType !== 3 || (_ = h + o), L.nodeType === 3 && (h += L.nodeValue.length), (F = L.firstChild) !== null; )
              M = L, L = F;
            for (; ; ) {
              if (L === e) break t;
              if (M === s && ++R === l && (y = h), M === c && ++N === o && (_ = h), (F = L.nextSibling) !== null) break;
              L = M, M = L.parentNode;
            }
            L = F;
          }
          s = y === -1 || _ === -1 ? null : { start: y, end: _ };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (Bo = { focusedElem: e, selectionRange: s }, Ps = !1, B = t; B !== null; ) if (t = B, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, B = e;
    else for (; B !== null; ) {
      t = B;
      try {
        var $ = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ($ !== null) {
              var H = $.memoizedProps, Ae = $.memoizedState, E = t.stateNode, x = E.getSnapshotBeforeUpdate(t.elementType === t.type ? H : kt(t.type, H), Ae);
              E.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var T = t.stateNode.containerInfo;
            T.nodeType === 1 ? T.textContent = "" : T.nodeType === 9 && T.documentElement && T.removeChild(T.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(i(163));
        }
      } catch (O) {
        Te(t, t.return, O);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, B = e;
        break;
      }
      B = t.return;
    }
    return $ = Xc, Xc = !1, $;
  }
  function Jr(e, t, s) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy;
          l.destroy = void 0, c !== void 0 && Ca(t, s, c);
        }
        l = l.next;
      } while (l !== o);
    }
  }
  function pi(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var s = t = t.next;
      do {
        if ((s.tag & e) === e) {
          var o = s.create;
          s.destroy = o();
        }
        s = s.next;
      } while (s !== t);
    }
  }
  function Ra(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Zc(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Zc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Pt], delete t[Br], delete t[Vo], delete t[Fp], delete t[Bp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ed(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function td(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ed(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ia(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = Ws));
    else if (o !== 4 && (e = e.child, e !== null)) for (Ia(e, t, s), e = e.sibling; e !== null; ) Ia(e, t, s), e = e.sibling;
  }
  function Ma(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Ma(e, t, s), e = e.sibling; e !== null; ) Ma(e, t, s), e = e.sibling;
  }
  var Ue = null, Et = !1;
  function dn(e, t, s) {
    for (s = s.child; s !== null; ) nd(e, t, s), s = s.sibling;
  }
  function nd(e, t, s) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
      Nt.onCommitFiberUnmount(Cs, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        Ye || or(s, t);
      case 6:
        var o = Ue, l = Et;
        Ue = null, dn(e, t, s), Ue = o, Et = l, Ue !== null && (Et ? (e = Ue, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : Ue.removeChild(s.stateNode));
        break;
      case 18:
        Ue !== null && (Et ? (e = Ue, s = s.stateNode, e.nodeType === 8 ? Ho(e.parentNode, s) : e.nodeType === 1 && Ho(e, s), Ir(e)) : Ho(Ue, s.stateNode));
        break;
      case 4:
        o = Ue, l = Et, Ue = s.stateNode.containerInfo, Et = !0, dn(e, t, s), Ue = o, Et = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ye && (o = s.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var c = l, h = c.destroy;
            c = c.tag, h !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && Ca(s, t, h), l = l.next;
          } while (l !== o);
        }
        dn(e, t, s);
        break;
      case 1:
        if (!Ye && (or(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = s.memoizedProps, o.state = s.memoizedState, o.componentWillUnmount();
        } catch (y) {
          Te(s, t, y);
        }
        dn(e, t, s);
        break;
      case 21:
        dn(e, t, s);
        break;
      case 22:
        s.mode & 1 ? (Ye = (o = Ye) || s.memoizedState !== null, dn(e, t, s), Ye = o) : dn(e, t, s);
        break;
      default:
        dn(e, t, s);
    }
  }
  function rd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new nm()), t.forEach(function(o) {
        var l = fm.bind(null, e, o);
        s.has(o) || (s.add(o), o.then(l, l));
      });
    }
  }
  function bt(e, t) {
    var s = t.deletions;
    if (s !== null) for (var o = 0; o < s.length; o++) {
      var l = s[o];
      try {
        var c = e, h = t, y = h;
        e: for (; y !== null; ) {
          switch (y.tag) {
            case 5:
              Ue = y.stateNode, Et = !1;
              break e;
            case 3:
              Ue = y.stateNode.containerInfo, Et = !0;
              break e;
            case 4:
              Ue = y.stateNode.containerInfo, Et = !0;
              break e;
          }
          y = y.return;
        }
        if (Ue === null) throw Error(i(160));
        nd(c, h, l), Ue = null, Et = !1;
        var _ = l.alternate;
        _ !== null && (_.return = null), l.return = null;
      } catch (R) {
        Te(l, t, R);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) sd(t, e), t = t.sibling;
  }
  function sd(e, t) {
    var s = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (bt(t, e), Ot(e), o & 4) {
          try {
            Jr(3, e, e.return), pi(3, e);
          } catch (H) {
            Te(e, e.return, H);
          }
          try {
            Jr(5, e, e.return);
          } catch (H) {
            Te(e, e.return, H);
          }
        }
        break;
      case 1:
        bt(t, e), Ot(e), o & 512 && s !== null && or(s, s.return);
        break;
      case 5:
        if (bt(t, e), Ot(e), o & 512 && s !== null && or(s, s.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            vr(l, "");
          } catch (H) {
            Te(e, e.return, H);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, h = s !== null ? s.memoizedProps : c, y = e.type, _ = e.updateQueue;
          if (e.updateQueue = null, _ !== null) try {
            y === "input" && c.type === "radio" && c.name != null && Nl(l, c), oo(y, h);
            var R = oo(y, c);
            for (h = 0; h < _.length; h += 2) {
              var N = _[h], L = _[h + 1];
              N === "style" ? Bl(l, L) : N === "dangerouslySetInnerHTML" ? Dl(l, L) : N === "children" ? vr(l, L) : Z(l, N, L, R);
            }
            switch (y) {
              case "input":
                to(l, c);
                break;
              case "textarea":
                Ll(l, c);
                break;
              case "select":
                var M = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var F = c.value;
                F != null ? Fn(l, !!c.multiple, F, !1) : M !== !!c.multiple && (c.defaultValue != null ? Fn(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : Fn(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[Br] = c;
          } catch (H) {
            Te(e, e.return, H);
          }
        }
        break;
      case 6:
        if (bt(t, e), Ot(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (H) {
            Te(e, e.return, H);
          }
        }
        break;
      case 3:
        if (bt(t, e), Ot(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Ir(t.containerInfo);
        } catch (H) {
          Te(e, e.return, H);
        }
        break;
      case 4:
        bt(t, e), Ot(e);
        break;
      case 13:
        bt(t, e), Ot(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Pa = Me())), o & 4 && rd(e);
        break;
      case 22:
        if (N = s !== null && s.memoizedState !== null, e.mode & 1 ? (Ye = (R = Ye) || N, bt(t, e), Ye = R) : bt(t, e), Ot(e), o & 8192) {
          if (R = e.memoizedState !== null, (e.stateNode.isHidden = R) && !N && (e.mode & 1) !== 0) for (B = e, N = e.child; N !== null; ) {
            for (L = B = N; B !== null; ) {
              switch (M = B, F = M.child, M.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Jr(4, M, M.return);
                  break;
                case 1:
                  or(M, M.return);
                  var $ = M.stateNode;
                  if (typeof $.componentWillUnmount == "function") {
                    o = M, s = M.return;
                    try {
                      t = o, $.props = t.memoizedProps, $.state = t.memoizedState, $.componentWillUnmount();
                    } catch (H) {
                      Te(o, s, H);
                    }
                  }
                  break;
                case 5:
                  or(M, M.return);
                  break;
                case 22:
                  if (M.memoizedState !== null) {
                    ad(L);
                    continue;
                  }
              }
              F !== null ? (F.return = M, B = F) : ad(L);
            }
            N = N.sibling;
          }
          e: for (N = null, L = e; ; ) {
            if (L.tag === 5) {
              if (N === null) {
                N = L;
                try {
                  l = L.stateNode, R ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (y = L.stateNode, _ = L.memoizedProps.style, h = _ != null && _.hasOwnProperty("display") ? _.display : null, y.style.display = Fl("display", h));
                } catch (H) {
                  Te(e, e.return, H);
                }
              }
            } else if (L.tag === 6) {
              if (N === null) try {
                L.stateNode.nodeValue = R ? "" : L.memoizedProps;
              } catch (H) {
                Te(e, e.return, H);
              }
            } else if ((L.tag !== 22 && L.tag !== 23 || L.memoizedState === null || L === e) && L.child !== null) {
              L.child.return = L, L = L.child;
              continue;
            }
            if (L === e) break e;
            for (; L.sibling === null; ) {
              if (L.return === null || L.return === e) break e;
              N === L && (N = null), L = L.return;
            }
            N === L && (N = null), L.sibling.return = L.return, L = L.sibling;
          }
        }
        break;
      case 19:
        bt(t, e), Ot(e), o & 4 && rd(e);
        break;
      case 21:
        break;
      default:
        bt(
          t,
          e
        ), Ot(e);
    }
  }
  function Ot(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var s = e.return; s !== null; ) {
            if (ed(s)) {
              var o = s;
              break e;
            }
            s = s.return;
          }
          throw Error(i(160));
        }
        switch (o.tag) {
          case 5:
            var l = o.stateNode;
            o.flags & 32 && (vr(l, ""), o.flags &= -33);
            var c = td(e);
            Ma(e, c, l);
            break;
          case 3:
          case 4:
            var h = o.stateNode.containerInfo, y = td(e);
            Ia(e, y, h);
            break;
          default:
            throw Error(i(161));
        }
      } catch (_) {
        Te(e, e.return, _);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function sm(e, t, s) {
    B = e, id(e);
  }
  function id(e, t, s) {
    for (var o = (e.mode & 1) !== 0; B !== null; ) {
      var l = B, c = l.child;
      if (l.tag === 22 && o) {
        var h = l.memoizedState !== null || hi;
        if (!h) {
          var y = l.alternate, _ = y !== null && y.memoizedState !== null || Ye;
          y = hi;
          var R = Ye;
          if (hi = h, (Ye = _) && !R) for (B = l; B !== null; ) h = B, _ = h.child, h.tag === 22 && h.memoizedState !== null ? ld(l) : _ !== null ? (_.return = h, B = _) : ld(l);
          for (; c !== null; ) B = c, id(c), c = c.sibling;
          B = l, hi = y, Ye = R;
        }
        od(e);
      } else (l.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = l, B = c) : od(e);
    }
  }
  function od(e) {
    for (; B !== null; ) {
      var t = B;
      if ((t.flags & 8772) !== 0) {
        var s = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ye || pi(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !Ye) if (s === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? s.memoizedProps : kt(t.type, s.memoizedProps);
                o.componentDidUpdate(l, s.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var c = t.updateQueue;
              c !== null && ac(t, c, o);
              break;
            case 3:
              var h = t.updateQueue;
              if (h !== null) {
                if (s = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    s = t.child.stateNode;
                    break;
                  case 1:
                    s = t.child.stateNode;
                }
                ac(t, h, s);
              }
              break;
            case 5:
              var y = t.stateNode;
              if (s === null && t.flags & 4) {
                s = y;
                var _ = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    _.autoFocus && s.focus();
                    break;
                  case "img":
                    _.src && (s.src = _.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var R = t.alternate;
                if (R !== null) {
                  var N = R.memoizedState;
                  if (N !== null) {
                    var L = N.dehydrated;
                    L !== null && Ir(L);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(i(163));
          }
          Ye || t.flags & 512 && Ra(t);
        } catch (M) {
          Te(t, t.return, M);
        }
      }
      if (t === e) {
        B = null;
        break;
      }
      if (s = t.sibling, s !== null) {
        s.return = t.return, B = s;
        break;
      }
      B = t.return;
    }
  }
  function ad(e) {
    for (; B !== null; ) {
      var t = B;
      if (t === e) {
        B = null;
        break;
      }
      var s = t.sibling;
      if (s !== null) {
        s.return = t.return, B = s;
        break;
      }
      B = t.return;
    }
  }
  function ld(e) {
    for (; B !== null; ) {
      var t = B;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              pi(4, t);
            } catch (_) {
              Te(t, s, _);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (_) {
                Te(t, l, _);
              }
            }
            var c = t.return;
            try {
              Ra(t);
            } catch (_) {
              Te(t, c, _);
            }
            break;
          case 5:
            var h = t.return;
            try {
              Ra(t);
            } catch (_) {
              Te(t, h, _);
            }
        }
      } catch (_) {
        Te(t, t.return, _);
      }
      if (t === e) {
        B = null;
        break;
      }
      var y = t.sibling;
      if (y !== null) {
        y.return = t.return, B = y;
        break;
      }
      B = t.return;
    }
  }
  var im = Math.ceil, mi = ie.ReactCurrentDispatcher, Aa = ie.ReactCurrentOwner, gt = ie.ReactCurrentBatchConfig, se = 0, De = null, Ne = null, $e = 0, ct = 0, ar = on(0), je = 0, Xr = null, Tn = 0, gi = 0, Na = 0, Zr = null, nt = null, Pa = 0, lr = 1 / 0, Yt = null, yi = !1, ja = null, fn = null, vi = !1, hn = null, _i = 0, es = 0, La = null, wi = -1, Si = 0;
  function Ke() {
    return (se & 6) !== 0 ? Me() : wi !== -1 ? wi : wi = Me();
  }
  function pn(e) {
    return (e.mode & 1) === 0 ? 1 : (se & 2) !== 0 && $e !== 0 ? $e & -$e : $p.transition !== null ? (Si === 0 && (Si = tu()), Si) : (e = fe, e !== 0 || (e = window.event, e = e === void 0 ? 16 : cu(e.type)), e);
  }
  function Tt(e, t, s, o) {
    if (50 < es) throw es = 0, La = null, Error(i(185));
    Er(e, s, o), ((se & 2) === 0 || e !== De) && (e === De && ((se & 2) === 0 && (gi |= s), je === 4 && mn(e, $e)), rt(e, o), s === 1 && se === 0 && (t.mode & 1) === 0 && (lr = Me() + 500, Gs && ln()));
  }
  function rt(e, t) {
    var s = e.callbackNode;
    $h(e, t);
    var o = Ms(e, e === De ? $e : 0);
    if (o === 0) s !== null && Xl(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && Xl(s), t === 1) e.tag === 0 ? Up(cd.bind(null, e)) : Gu(cd.bind(null, e)), zp(function() {
        (se & 6) === 0 && ln();
      }), s = null;
      else {
        switch (nu(o)) {
          case 1:
            s = po;
            break;
          case 4:
            s = Zl;
            break;
          case 16:
            s = Ts;
            break;
          case 536870912:
            s = eu;
            break;
          default:
            s = Ts;
        }
        s = vd(s, ud.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function ud(e, t) {
    if (wi = -1, Si = 0, (se & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (ur() && e.callbackNode !== s) return null;
    var o = Ms(e, e === De ? $e : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = xi(e, o);
    else {
      t = o;
      var l = se;
      se |= 2;
      var c = fd();
      (De !== e || $e !== t) && (Yt = null, lr = Me() + 500, Rn(e, t));
      do
        try {
          lm();
          break;
        } catch (y) {
          dd(e, y);
        }
      while (!0);
      Zo(), mi.current = c, se = l, Ne !== null ? t = 0 : (De = null, $e = 0, t = je);
    }
    if (t !== 0) {
      if (t === 2 && (l = mo(e), l !== 0 && (o = l, t = Oa(e, l))), t === 1) throw s = Xr, Rn(e, 0), mn(e, o), rt(e, Me()), s;
      if (t === 6) mn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !om(l) && (t = xi(e, o), t === 2 && (c = mo(e), c !== 0 && (o = c, t = Oa(e, c))), t === 1)) throw s = Xr, Rn(e, 0), mn(e, o), rt(e, Me()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            In(e, nt, Yt);
            break;
          case 3:
            if (mn(e, o), (o & 130023424) === o && (t = Pa + 500 - Me(), 10 < t)) {
              if (Ms(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                Ke(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = $o(In.bind(null, e, nt, Yt), t);
              break;
            }
            In(e, nt, Yt);
            break;
          case 4:
            if (mn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var h = 31 - wt(o);
              c = 1 << h, h = t[h], h > l && (l = h), o &= ~c;
            }
            if (o = l, o = Me() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * im(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = $o(In.bind(null, e, nt, Yt), o);
              break;
            }
            In(e, nt, Yt);
            break;
          case 5:
            In(e, nt, Yt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return rt(e, Me()), e.callbackNode === s ? ud.bind(null, e) : null;
  }
  function Oa(e, t) {
    var s = Zr;
    return e.current.memoizedState.isDehydrated && (Rn(e, t).flags |= 256), e = xi(e, t), e !== 2 && (t = nt, nt = s, t !== null && za(t)), e;
  }
  function za(e) {
    nt === null ? nt = e : nt.push.apply(nt, e);
  }
  function om(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var s = t.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var o = 0; o < s.length; o++) {
          var l = s[o], c = l.getSnapshot;
          l = l.value;
          try {
            if (!St(c(), l)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (s = t.child, t.subtreeFlags & 16384 && s !== null) s.return = t, t = s;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function mn(e, t) {
    for (t &= ~Na, t &= ~gi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var s = 31 - wt(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function cd(e) {
    if ((se & 6) !== 0) throw Error(i(327));
    ur();
    var t = Ms(e, 0);
    if ((t & 1) === 0) return rt(e, Me()), null;
    var s = xi(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = mo(e);
      o !== 0 && (t = o, s = Oa(e, o));
    }
    if (s === 1) throw s = Xr, Rn(e, 0), mn(e, t), rt(e, Me()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, In(e, nt, Yt), rt(e, Me()), null;
  }
  function Da(e, t) {
    var s = se;
    se |= 1;
    try {
      return e(t);
    } finally {
      se = s, se === 0 && (lr = Me() + 500, Gs && ln());
    }
  }
  function Cn(e) {
    hn !== null && hn.tag === 0 && (se & 6) === 0 && ur();
    var t = se;
    se |= 1;
    var s = gt.transition, o = fe;
    try {
      if (gt.transition = null, fe = 1, e) return e();
    } finally {
      fe = o, gt.transition = s, se = t, (se & 6) === 0 && ln();
    }
  }
  function Fa() {
    ct = ar.current, we(ar);
  }
  function Rn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, Op(s)), Ne !== null) for (s = Ne.return; s !== null; ) {
      var o = s;
      switch (qo(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && Ys();
          break;
        case 3:
          sr(), we(Ze), we(Ve), aa();
          break;
        case 5:
          ia(o);
          break;
        case 4:
          sr();
          break;
        case 13:
          we(ke);
          break;
        case 19:
          we(ke);
          break;
        case 10:
          ea(o.type._context);
          break;
        case 22:
        case 23:
          Fa();
      }
      s = s.return;
    }
    if (De = e, Ne = e = gn(e.current, null), $e = ct = t, je = 0, Xr = null, Na = gi = Tn = 0, nt = Zr = null, kn !== null) {
      for (t = 0; t < kn.length; t++) if (s = kn[t], o = s.interleaved, o !== null) {
        s.interleaved = null;
        var l = o.next, c = s.pending;
        if (c !== null) {
          var h = c.next;
          c.next = l, o.next = h;
        }
        s.pending = o;
      }
      kn = null;
    }
    return e;
  }
  function dd(e, t) {
    do {
      var s = Ne;
      try {
        if (Zo(), ii.current = ui, oi) {
          for (var o = Ee.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          oi = !1;
        }
        if (bn = 0, ze = Pe = Ee = null, Qr = !1, Yr = 0, Aa.current = null, s === null || s.return === null) {
          je = 1, Xr = t, Ne = null;
          break;
        }
        e: {
          var c = e, h = s.return, y = s, _ = t;
          if (t = $e, y.flags |= 32768, _ !== null && typeof _ == "object" && typeof _.then == "function") {
            var R = _, N = y, L = N.tag;
            if ((N.mode & 1) === 0 && (L === 0 || L === 11 || L === 15)) {
              var M = N.alternate;
              M ? (N.updateQueue = M.updateQueue, N.memoizedState = M.memoizedState, N.lanes = M.lanes) : (N.updateQueue = null, N.memoizedState = null);
            }
            var F = Oc(h);
            if (F !== null) {
              F.flags &= -257, zc(F, h, y, c, t), F.mode & 1 && Lc(c, R, t), t = F, _ = R;
              var $ = t.updateQueue;
              if ($ === null) {
                var H = /* @__PURE__ */ new Set();
                H.add(_), t.updateQueue = H;
              } else $.add(_);
              break e;
            } else {
              if ((t & 1) === 0) {
                Lc(c, R, t), Ba();
                break e;
              }
              _ = Error(i(426));
            }
          } else if (xe && y.mode & 1) {
            var Ae = Oc(h);
            if (Ae !== null) {
              (Ae.flags & 65536) === 0 && (Ae.flags |= 256), zc(Ae, h, y, c, t), Jo(ir(_, y));
              break e;
            }
          }
          c = _ = ir(_, y), je !== 4 && (je = 2), Zr === null ? Zr = [c] : Zr.push(c), c = h;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var E = Pc(c, _, t);
                oc(c, E);
                break e;
              case 1:
                y = _;
                var x = c.type, T = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof x.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (fn === null || !fn.has(T)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var O = jc(c, y, t);
                  oc(c, O);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        pd(s);
      } catch (W) {
        t = W, Ne === s && s !== null && (Ne = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function fd() {
    var e = mi.current;
    return mi.current = ui, e === null ? ui : e;
  }
  function Ba() {
    (je === 0 || je === 3 || je === 2) && (je = 4), De === null || (Tn & 268435455) === 0 && (gi & 268435455) === 0 || mn(De, $e);
  }
  function xi(e, t) {
    var s = se;
    se |= 2;
    var o = fd();
    (De !== e || $e !== t) && (Yt = null, Rn(e, t));
    do
      try {
        am();
        break;
      } catch (l) {
        dd(e, l);
      }
    while (!0);
    if (Zo(), se = s, mi.current = o, Ne !== null) throw Error(i(261));
    return De = null, $e = 0, je;
  }
  function am() {
    for (; Ne !== null; ) hd(Ne);
  }
  function lm() {
    for (; Ne !== null && !Ph(); ) hd(Ne);
  }
  function hd(e) {
    var t = yd(e.alternate, e, ct);
    e.memoizedProps = e.pendingProps, t === null ? pd(e) : Ne = t, Aa.current = null;
  }
  function pd(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = em(s, t, ct), s !== null) {
          Ne = s;
          return;
        }
      } else {
        if (s = tm(s, t), s !== null) {
          s.flags &= 32767, Ne = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          je = 6, Ne = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Ne = t;
        return;
      }
      Ne = t = e;
    } while (t !== null);
    je === 0 && (je = 5);
  }
  function In(e, t, s) {
    var o = fe, l = gt.transition;
    try {
      gt.transition = null, fe = 1, um(e, t, s, o);
    } finally {
      gt.transition = l, fe = o;
    }
    return null;
  }
  function um(e, t, s, o) {
    do
      ur();
    while (hn !== null);
    if ((se & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (Hh(e, c), e === De && (Ne = De = null, $e = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || vi || (vi = !0, vd(Ts, function() {
      return ur(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = gt.transition, gt.transition = null;
      var h = fe;
      fe = 1;
      var y = se;
      se |= 4, Aa.current = null, rm(e, s), sd(s, e), Ip(Bo), Ps = !!Fo, Bo = Fo = null, e.current = s, sm(s), jh(), se = y, fe = h, gt.transition = c;
    } else e.current = s;
    if (vi && (vi = !1, hn = e, _i = l), c = e.pendingLanes, c === 0 && (fn = null), zh(s.stateNode), rt(e, Me()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (yi) throw yi = !1, e = ja, ja = null, e;
    return (_i & 1) !== 0 && e.tag !== 0 && ur(), c = e.pendingLanes, (c & 1) !== 0 ? e === La ? es++ : (es = 0, La = e) : es = 0, ln(), null;
  }
  function ur() {
    if (hn !== null) {
      var e = nu(_i), t = gt.transition, s = fe;
      try {
        if (gt.transition = null, fe = 16 > e ? 16 : e, hn === null) var o = !1;
        else {
          if (e = hn, hn = null, _i = 0, (se & 6) !== 0) throw Error(i(331));
          var l = se;
          for (se |= 4, B = e.current; B !== null; ) {
            var c = B, h = c.child;
            if ((B.flags & 16) !== 0) {
              var y = c.deletions;
              if (y !== null) {
                for (var _ = 0; _ < y.length; _++) {
                  var R = y[_];
                  for (B = R; B !== null; ) {
                    var N = B;
                    switch (N.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Jr(8, N, c);
                    }
                    var L = N.child;
                    if (L !== null) L.return = N, B = L;
                    else for (; B !== null; ) {
                      N = B;
                      var M = N.sibling, F = N.return;
                      if (Zc(N), N === R) {
                        B = null;
                        break;
                      }
                      if (M !== null) {
                        M.return = F, B = M;
                        break;
                      }
                      B = F;
                    }
                  }
                }
                var $ = c.alternate;
                if ($ !== null) {
                  var H = $.child;
                  if (H !== null) {
                    $.child = null;
                    do {
                      var Ae = H.sibling;
                      H.sibling = null, H = Ae;
                    } while (H !== null);
                  }
                }
                B = c;
              }
            }
            if ((c.subtreeFlags & 2064) !== 0 && h !== null) h.return = c, B = h;
            else e: for (; B !== null; ) {
              if (c = B, (c.flags & 2048) !== 0) switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  Jr(9, c, c.return);
              }
              var E = c.sibling;
              if (E !== null) {
                E.return = c.return, B = E;
                break e;
              }
              B = c.return;
            }
          }
          var x = e.current;
          for (B = x; B !== null; ) {
            h = B;
            var T = h.child;
            if ((h.subtreeFlags & 2064) !== 0 && T !== null) T.return = h, B = T;
            else e: for (h = x; B !== null; ) {
              if (y = B, (y.flags & 2048) !== 0) try {
                switch (y.tag) {
                  case 0:
                  case 11:
                  case 15:
                    pi(9, y);
                }
              } catch (W) {
                Te(y, y.return, W);
              }
              if (y === h) {
                B = null;
                break e;
              }
              var O = y.sibling;
              if (O !== null) {
                O.return = y.return, B = O;
                break e;
              }
              B = y.return;
            }
          }
          if (se = l, ln(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
            Nt.onPostCommitFiberRoot(Cs, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        fe = s, gt.transition = t;
      }
    }
    return !1;
  }
  function md(e, t, s) {
    t = ir(s, t), t = Pc(e, t, 1), e = cn(e, t, 1), t = Ke(), e !== null && (Er(e, 1, t), rt(e, t));
  }
  function Te(e, t, s) {
    if (e.tag === 3) md(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        md(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (fn === null || !fn.has(o))) {
          e = ir(s, e), e = jc(t, e, 1), t = cn(t, e, 1), e = Ke(), t !== null && (Er(t, 1, e), rt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function cm(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = Ke(), e.pingedLanes |= e.suspendedLanes & s, De === e && ($e & s) === s && (je === 4 || je === 3 && ($e & 130023424) === $e && 500 > Me() - Pa ? Rn(e, 0) : Na |= s), rt(e, t);
  }
  function gd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Is, Is <<= 1, (Is & 130023424) === 0 && (Is = 4194304)));
    var s = Ke();
    e = Vt(e, t), e !== null && (Er(e, t, s), rt(e, s));
  }
  function dm(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), gd(e, s);
  }
  function fm(e, t) {
    var s = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode, l = e.memoizedState;
        l !== null && (s = l.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    o !== null && o.delete(t), gd(e, s);
  }
  var yd;
  yd = function(e, t, s) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Ze.current) tt = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return tt = !1, Zp(e, t, s);
      tt = (e.flags & 131072) !== 0;
    }
    else tt = !1, xe && (t.flags & 1048576) !== 0 && Ku(t, Js, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        fi(e, t), e = t.pendingProps;
        var l = Jn(t, Ve.current);
        rr(t, s), l = ca(null, t, o, e, l, s);
        var c = da();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, et(o) ? (c = !0, qs(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, ra(t), l.updater = ci, t.stateNode = l, l._reactInternals = t, ya(t, o, e, s), t = Sa(null, t, o, !0, c, s)) : (t.tag = 0, xe && c && Yo(t), Ge(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (fi(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = pm(o), e = kt(o, e), l) {
            case 0:
              t = wa(null, t, o, e, s);
              break e;
            case 1:
              t = Hc(null, t, o, e, s);
              break e;
            case 11:
              t = Dc(null, t, o, e, s);
              break e;
            case 14:
              t = Fc(null, t, o, kt(o.type, e), s);
              break e;
          }
          throw Error(i(
            306,
            o,
            ""
          ));
        }
        return t;
      case 0:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : kt(o, l), wa(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : kt(o, l), Hc(e, t, o, l, s);
      case 3:
        e: {
          if (Vc(t), e === null) throw Error(i(387));
          o = t.pendingProps, c = t.memoizedState, l = c.element, ic(e, t), ri(t, o, null, s);
          var h = t.memoizedState;
          if (o = h.element, c.isDehydrated) if (c = { element: o, isDehydrated: !1, cache: h.cache, pendingSuspenseBoundaries: h.pendingSuspenseBoundaries, transitions: h.transitions }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
            l = ir(Error(i(423)), t), t = Wc(e, t, o, s, l);
            break e;
          } else if (o !== l) {
            l = ir(Error(i(424)), t), t = Wc(e, t, o, s, l);
            break e;
          } else for (ut = sn(t.stateNode.containerInfo.firstChild), lt = t, xe = !0, xt = null, s = rc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (er(), o === l) {
              t = Qt(e, t, s);
              break e;
            }
            Ge(e, t, o, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return lc(t), e === null && Ko(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, h = l.children, Uo(o, l) ? h = null : c !== null && Uo(o, c) && (t.flags |= 32), $c(e, t), Ge(e, t, h, s), t.child;
      case 6:
        return e === null && Ko(t), null;
      case 13:
        return Qc(e, t, s);
      case 4:
        return sa(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = tr(t, null, o, s) : Ge(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : kt(o, l), Dc(e, t, o, l, s);
      case 7:
        return Ge(e, t, t.pendingProps, s), t.child;
      case 8:
        return Ge(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return Ge(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, h = l.value, ye(ei, o._currentValue), o._currentValue = h, c !== null) if (St(c.value, h)) {
            if (c.children === l.children && !Ze.current) {
              t = Qt(e, t, s);
              break e;
            }
          } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
            var y = c.dependencies;
            if (y !== null) {
              h = c.child;
              for (var _ = y.firstContext; _ !== null; ) {
                if (_.context === o) {
                  if (c.tag === 1) {
                    _ = Wt(-1, s & -s), _.tag = 2;
                    var R = c.updateQueue;
                    if (R !== null) {
                      R = R.shared;
                      var N = R.pending;
                      N === null ? _.next = _ : (_.next = N.next, N.next = _), R.pending = _;
                    }
                  }
                  c.lanes |= s, _ = c.alternate, _ !== null && (_.lanes |= s), ta(
                    c.return,
                    s,
                    t
                  ), y.lanes |= s;
                  break;
                }
                _ = _.next;
              }
            } else if (c.tag === 10) h = c.type === t.type ? null : c.child;
            else if (c.tag === 18) {
              if (h = c.return, h === null) throw Error(i(341));
              h.lanes |= s, y = h.alternate, y !== null && (y.lanes |= s), ta(h, s, t), h = c.sibling;
            } else h = c.child;
            if (h !== null) h.return = c;
            else for (h = c; h !== null; ) {
              if (h === t) {
                h = null;
                break;
              }
              if (c = h.sibling, c !== null) {
                c.return = h.return, h = c;
                break;
              }
              h = h.return;
            }
            c = h;
          }
          Ge(e, t, l.children, s), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, o = t.pendingProps.children, rr(t, s), l = pt(l), o = o(l), t.flags |= 1, Ge(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = kt(o, t.pendingProps), l = kt(o.type, l), Fc(e, t, o, l, s);
      case 15:
        return Bc(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : kt(o, l), fi(e, t), t.tag = 1, et(o) ? (e = !0, qs(t)) : e = !1, rr(t, s), Ac(t, o, l), ya(t, o, l, s), Sa(null, t, o, !0, e, s);
      case 19:
        return qc(e, t, s);
      case 22:
        return Uc(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function vd(e, t) {
    return Jl(e, t);
  }
  function hm(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yt(e, t, s, o) {
    return new hm(e, t, s, o);
  }
  function Ua(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function pm(e) {
    if (typeof e == "function") return Ua(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Ie) return 11;
      if (e === Oe) return 14;
    }
    return 2;
  }
  function gn(e, t) {
    var s = e.alternate;
    return s === null ? (s = yt(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function ki(e, t, s, o, l, c) {
    var h = 2;
    if (o = e, typeof e == "function") Ua(e) && (h = 1);
    else if (typeof e == "string") h = 5;
    else e: switch (e) {
      case re:
        return Mn(s.children, l, c, t);
      case Q:
        h = 8, l |= 8;
        break;
      case he:
        return e = yt(12, s, t, l | 2), e.elementType = he, e.lanes = c, e;
      case He:
        return e = yt(13, s, t, l), e.elementType = He, e.lanes = c, e;
      case it:
        return e = yt(19, s, t, l), e.elementType = it, e.lanes = c, e;
      case me:
        return Ei(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Be:
            h = 10;
            break e;
          case Le:
            h = 9;
            break e;
          case Ie:
            h = 11;
            break e;
          case Oe:
            h = 14;
            break e;
          case pe:
            h = 16, o = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = yt(h, s, t, l), t.elementType = e, t.type = o, t.lanes = c, t;
  }
  function Mn(e, t, s, o) {
    return e = yt(7, e, o, t), e.lanes = s, e;
  }
  function Ei(e, t, s, o) {
    return e = yt(22, e, o, t), e.elementType = me, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function $a(e, t, s) {
    return e = yt(6, e, null, t), e.lanes = s, e;
  }
  function Ha(e, t, s) {
    return t = yt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function mm(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = go(0), this.expirationTimes = go(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = go(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function Va(e, t, s, o, l, c, h, y, _) {
    return e = new mm(e, t, s, y, _), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = yt(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ra(c), e;
  }
  function gm(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: X, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function _d(e) {
    if (!e) return an;
    e = e._reactInternals;
    e: {
      if (vn(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (et(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(i(171));
    }
    if (e.tag === 1) {
      var s = e.type;
      if (et(s)) return Yu(e, s, t);
    }
    return t;
  }
  function wd(e, t, s, o, l, c, h, y, _) {
    return e = Va(s, o, !0, e, l, c, h, y, _), e.context = _d(null), s = e.current, o = Ke(), l = pn(s), c = Wt(o, l), c.callback = t ?? null, cn(s, c, l), e.current.lanes = l, Er(e, l, o), rt(e, o), e;
  }
  function bi(e, t, s, o) {
    var l = t.current, c = Ke(), h = pn(l);
    return s = _d(s), t.context === null ? t.context = s : t.pendingContext = s, t = Wt(c, h), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = cn(l, t, h), e !== null && (Tt(e, l, h, c), ni(e, l, h)), h;
  }
  function Ti(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Sd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function Wa(e, t) {
    Sd(e, t), (e = e.alternate) && Sd(e, t);
  }
  function ym() {
    return null;
  }
  var xd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Qa(e) {
    this._internalRoot = e;
  }
  Ci.prototype.render = Qa.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    bi(e, t, null, null);
  }, Ci.prototype.unmount = Qa.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Cn(function() {
        bi(null, e, null, null);
      }), t[Bt] = null;
    }
  };
  function Ci(e) {
    this._internalRoot = e;
  }
  Ci.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = iu();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < tn.length && t !== 0 && t < tn[s].priority; s++) ;
      tn.splice(s, 0, e), s === 0 && lu(e);
    }
  };
  function Ya(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ri(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function kd() {
  }
  function vm(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var R = Ti(h);
          c.call(R);
        };
      }
      var h = wd(t, o, e, 0, null, !1, !1, "", kd);
      return e._reactRootContainer = h, e[Bt] = h.current, Dr(e.nodeType === 8 ? e.parentNode : e), Cn(), h;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var y = o;
      o = function() {
        var R = Ti(_);
        y.call(R);
      };
    }
    var _ = Va(e, 0, !1, null, null, !1, !1, "", kd);
    return e._reactRootContainer = _, e[Bt] = _.current, Dr(e.nodeType === 8 ? e.parentNode : e), Cn(function() {
      bi(t, _, s, o);
    }), _;
  }
  function Ii(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var h = c;
      if (typeof l == "function") {
        var y = l;
        l = function() {
          var _ = Ti(h);
          y.call(_);
        };
      }
      bi(t, h, e, l);
    } else h = vm(s, t, e, l, o);
    return Ti(h);
  }
  ru = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = kr(t.pendingLanes);
          s !== 0 && (yo(t, s | 1), rt(t, Me()), (se & 6) === 0 && (lr = Me() + 500, ln()));
        }
        break;
      case 13:
        Cn(function() {
          var o = Vt(e, 1);
          if (o !== null) {
            var l = Ke();
            Tt(o, e, 1, l);
          }
        }), Wa(e, 1);
    }
  }, vo = function(e) {
    if (e.tag === 13) {
      var t = Vt(e, 134217728);
      if (t !== null) {
        var s = Ke();
        Tt(t, e, 134217728, s);
      }
      Wa(e, 134217728);
    }
  }, su = function(e) {
    if (e.tag === 13) {
      var t = pn(e), s = Vt(e, t);
      if (s !== null) {
        var o = Ke();
        Tt(s, e, t, o);
      }
      Wa(e, t);
    }
  }, iu = function() {
    return fe;
  }, ou = function(e, t) {
    var s = fe;
    try {
      return fe = e, t();
    } finally {
      fe = s;
    }
  }, uo = function(e, t, s) {
    switch (t) {
      case "input":
        if (to(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = Qs(o);
              if (!l) throw Error(i(90));
              Ml(o), to(o, l);
            }
          }
        }
        break;
      case "textarea":
        Ll(e, s);
        break;
      case "select":
        t = s.value, t != null && Fn(e, !!s.multiple, t, !1);
    }
  }, Vl = Da, Wl = Cn;
  var _m = { usingClientEntryPoint: !1, Events: [Ur, Gn, Qs, $l, Hl, Da] }, ts = { findFiberByHostInstance: _n, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, wm = { bundleType: ts.bundleType, version: ts.version, rendererPackageName: ts.rendererPackageName, rendererConfig: ts.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ie.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Gl(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ts.findFiberByHostInstance || ym, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Mi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Mi.isDisabled && Mi.supportsFiber) try {
      Cs = Mi.inject(wm), Nt = Mi;
    } catch {
    }
  }
  return st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _m, st.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ya(t)) throw Error(i(200));
    return gm(e, t, null, s);
  }, st.createRoot = function(e, t) {
    if (!Ya(e)) throw Error(i(299));
    var s = !1, o = "", l = xd;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Va(e, 1, !1, null, null, s, !1, o, l), e[Bt] = t.current, Dr(e.nodeType === 8 ? e.parentNode : e), new Qa(t);
  }, st.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = Gl(t), e = e === null ? null : e.stateNode, e;
  }, st.flushSync = function(e) {
    return Cn(e);
  }, st.hydrate = function(e, t, s) {
    if (!Ri(t)) throw Error(i(200));
    return Ii(null, e, t, !0, s);
  }, st.hydrateRoot = function(e, t, s) {
    if (!Ya(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", h = xd;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (h = s.onRecoverableError)), t = wd(t, null, e, 1, s ?? null, l, !1, c, h), e[Bt] = t.current, Dr(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new Ci(t);
  }, st.render = function(e, t, s) {
    if (!Ri(t)) throw Error(i(200));
    return Ii(null, e, t, !1, s);
  }, st.unmountComponentAtNode = function(e) {
    if (!Ri(e)) throw Error(i(40));
    return e._reactRootContainer ? (Cn(function() {
      Ii(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Bt] = null;
      });
    }), !0) : !1;
  }, st.unstable_batchedUpdates = Da, st.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Ri(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Ii(e, t, s, !1, o);
  }, st.version = "18.3.1-next-f1338f8080-20240426", st;
}
var Ad;
function df() {
  if (Ad) return Ka.exports;
  Ad = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), Ka.exports = Im(), Ka.exports;
}
var Nd;
function Mm() {
  if (Nd) return Ai;
  Nd = 1;
  var r = df();
  return Ai.createRoot = r.createRoot, Ai.hydrateRoot = r.hydrateRoot, Ai;
}
var Am = Mm(), Nm = df();
const Pm = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
  if (a.system && (i.system ? i.system += `

${a.system}` : i.system = a.system), a.tools)
    for (const [u, d] of Object.entries(a.tools)) {
      const f = i.tools?.[u];
      if (f && f !== d)
        throw new Error(`You tried to define a tool with the name ${u}, but it already exists.`);
      i.tools || (i.tools = {}), i.tools[u] = d;
    }
  return a.config && (i.config = {
    ...i.config,
    ...a.config
  }), a.callSettings && (i.callSettings = {
    ...i.callSettings,
    ...a.callSettings
  }), i;
}, {});
class ff {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return Pm(this._providers);
  }
  registerModelContextProvider(n) {
    this._providers.add(n);
    const i = n.subscribe?.(() => {
      this.notifySubscribers();
    });
    return this.notifySubscribers(), () => {
      this._providers.delete(n), i?.(), this.notifySubscribers();
    };
  }
  _subscribers = /* @__PURE__ */ new Set();
  notifySubscribers() {
    for (const n of this._subscribers)
      n();
  }
  subscribe(n) {
    return this._subscribers.add(n), () => this._subscribers.delete(n);
  }
}
class jm {
  _contextProvider = new ff();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class Lm {
  _subscribers = /* @__PURE__ */ new Set();
  subscribe(n) {
    return this._subscribers.add(n), () => this._subscribers.delete(n);
  }
  waitForUpdate() {
    return new Promise((n) => {
      const i = this.subscribe(() => {
        i(), n();
      });
    });
  }
  _notifySubscribers() {
    const n = [];
    for (const i of this._subscribers)
      try {
        i();
      } catch (a) {
        n.push(a);
      }
    if (n.length > 0)
      throw n.length === 1 ? n[0] : new AggregateError(n);
  }
}
const Om = (r) => r.status.type === "complete";
class hf extends Lm {
  isEditing = !0;
  get attachmentAccept() {
    return this.getAttachmentAdapter()?.accept ?? "*";
  }
  _attachments = [];
  get attachments() {
    return this._attachments;
  }
  setAttachments(n) {
    this._attachments = n, this._notifySubscribers();
  }
  get isEmpty() {
    return !this.text.trim() && !this.attachments.length;
  }
  _text = "";
  get text() {
    return this._text;
  }
  _role = "user";
  get role() {
    return this._role;
  }
  _runConfig = {};
  get runConfig() {
    return this._runConfig;
  }
  setText(n) {
    if (this._text !== n) {
      if (this._text = n, this._dictation) {
        this._dictationBaseText = n, this._currentInterimText = "";
        const { status: i, inputDisabled: a } = this._dictation;
        this._dictation = a ? { status: i, inputDisabled: a } : { status: i };
      }
      this._notifySubscribers();
    }
  }
  setRole(n) {
    this._role !== n && (this._role = n, this._notifySubscribers());
  }
  setRunConfig(n) {
    this._runConfig !== n && (this._runConfig = n, this._notifySubscribers());
  }
  _emptyTextAndAttachments() {
    this._attachments = [], this._text = "", this._notifySubscribers();
  }
  async _onClearAttachments() {
    const n = this.getAttachmentAdapter();
    n && await Promise.all(this._attachments.map((i) => n.remove(i)));
  }
  async reset() {
    if (this._attachments.length === 0 && this._text === "" && this._role === "user" && Object.keys(this._runConfig).length === 0)
      return;
    this._role = "user", this._runConfig = {};
    const n = this._onClearAttachments();
    this._emptyTextAndAttachments(), await n;
  }
  async clearAttachments() {
    const n = this._onClearAttachments();
    this.setAttachments([]), await n;
  }
  async send() {
    this._dictationSession && (this._dictationSession.cancel(), this._cleanupDictation());
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => Om(d) ? d : await n.send(d))) : [], a = this.text;
    this._emptyTextAndAttachments();
    const u = {
      createdAt: /* @__PURE__ */ new Date(),
      role: this.role,
      content: a ? [{ type: "text", text: a }] : [],
      attachments: await i,
      runConfig: this.runConfig,
      metadata: { custom: {} }
    };
    this.handleSend(u), this._notifyEventSubscribers("send");
  }
  cancel() {
    this.handleCancel();
  }
  async addAttachment(n) {
    const i = this.getAttachmentAdapter();
    if (!i)
      throw new Error("Attachments are not supported");
    const a = (d) => {
      const f = this._attachments.findIndex((p) => p.id === d.id);
      f !== -1 ? this._attachments = [
        ...this._attachments.slice(0, f),
        d,
        ...this._attachments.slice(f + 1)
      ] : this._attachments = [...this._attachments, d], this._notifySubscribers();
    }, u = i.add({ file: n });
    if (Symbol.asyncIterator in u)
      for await (const d of u)
        a(d);
    else
      a(await u);
    this._notifyEventSubscribers("attachment-add"), this._notifySubscribers();
  }
  async removeAttachment(n) {
    const i = this.getAttachmentAdapter();
    if (!i)
      throw new Error("Attachments are not supported");
    const a = this._attachments.findIndex((d) => d.id === n);
    if (a === -1)
      throw new Error("Attachment not found");
    const u = this._attachments[a];
    await i.remove(u), this._attachments = [
      ...this._attachments.slice(0, a),
      ...this._attachments.slice(a + 1)
    ], this._notifySubscribers();
  }
  _dictation;
  _dictationSession;
  _dictationUnsubscribes = [];
  _dictationBaseText = "";
  _currentInterimText = "";
  _dictationSessionIdCounter = 0;
  _activeDictationSessionId;
  _isCleaningDictation = !1;
  get dictation() {
    return this._dictation;
  }
  _isActiveSession(n, i) {
    return this._activeDictationSessionId === n && this._dictationSession === i;
  }
  startDictation() {
    const n = this.getDictationAdapter();
    if (!n)
      throw new Error("Dictation adapter not configured");
    if (this._dictationSession) {
      for (const w of this._dictationUnsubscribes)
        w();
      this._dictationUnsubscribes = [], this._dictationSession.stop().catch(() => {
      }), this._dictationSession = void 0;
    }
    const i = n.disableInputDuringDictation ?? !1;
    this._dictationBaseText = this._text, this._currentInterimText = "";
    const a = n.listen();
    this._dictationSession = a;
    const u = ++this._dictationSessionIdCounter;
    this._activeDictationSessionId = u, this._dictation = { status: a.status, inputDisabled: i }, this._notifySubscribers();
    const d = a.onSpeech((v) => {
      if (!this._isActiveSession(u, a))
        return;
      const w = v.isFinal !== !1, S = this._dictationBaseText && !this._dictationBaseText.endsWith(" ") && v.transcript ? " " : "";
      if (w) {
        if (this._dictationBaseText = this._dictationBaseText + S + v.transcript, this._currentInterimText = "", this._text = this._dictationBaseText, this._dictation) {
          const { transcript: I, ...P } = this._dictation;
          this._dictation = P;
        }
        this._notifySubscribers();
      } else
        this._currentInterimText = S + v.transcript, this._text = this._dictationBaseText + this._currentInterimText, this._dictation && (this._dictation = {
          ...this._dictation,
          transcript: v.transcript
        }), this._notifySubscribers();
    });
    this._dictationUnsubscribes.push(d);
    const f = a.onSpeechStart(() => {
      this._isActiveSession(u, a) && (this._dictation = {
        status: { type: "running" },
        inputDisabled: i,
        ...this._dictation?.transcript && {
          transcript: this._dictation.transcript
        }
      }, this._notifySubscribers());
    });
    this._dictationUnsubscribes.push(f);
    const p = a.onSpeechEnd(() => {
      this._cleanupDictation({ sessionId: u });
    });
    this._dictationUnsubscribes.push(p);
    const m = setInterval(() => {
      this._isActiveSession(u, a) && a.status.type === "ended" && this._cleanupDictation({ sessionId: u });
    }, 100);
    this._dictationUnsubscribes.push(() => clearInterval(m));
  }
  stopDictation() {
    if (!this._dictationSession)
      return;
    const n = this._dictationSession, i = this._activeDictationSessionId;
    n.stop().finally(() => {
      this._cleanupDictation({ sessionId: i });
    });
  }
  _cleanupDictation(n) {
    if (!(n?.sessionId !== void 0 && n.sessionId !== this._activeDictationSessionId || this._isCleaningDictation)) {
      this._isCleaningDictation = !0;
      try {
        for (const a of this._dictationUnsubscribes)
          a();
        this._dictationUnsubscribes = [], this._dictationSession = void 0, this._activeDictationSessionId = void 0, this._dictation = void 0, this._dictationBaseText = "", this._currentInterimText = "", this._notifySubscribers();
      } finally {
        this._isCleaningDictation = !1;
      }
    }
  }
  _eventSubscribers = /* @__PURE__ */ new Map();
  _notifyEventSubscribers(n) {
    const i = this._eventSubscribers.get(n);
    if (i)
      for (const a of i)
        a();
  }
  unstable_on(n, i) {
    const a = this._eventSubscribers.get(n);
    return a ? a.add(i) : this._eventSubscribers.set(n, /* @__PURE__ */ new Set([i])), () => {
      const u = this._eventSubscribers.get(n);
      u && u.delete(i);
    };
  }
}
class zm extends hf {
  runtime;
  _canCancel = !1;
  get canCancel() {
    return this._canCancel;
  }
  get attachments() {
    return super.attachments;
  }
  getAttachmentAdapter() {
    return this.runtime.adapters?.attachments;
  }
  getDictationAdapter() {
    return this.runtime.adapters?.dictation;
  }
  constructor(n) {
    super(), this.runtime = n, this.connect();
  }
  connect() {
    return this.runtime.subscribe(() => {
      this.canCancel !== this.runtime.capabilities.cancel && (this._canCancel = this.runtime.capabilities.cancel, this._notifySubscribers());
    });
  }
  async handleSend(n) {
    this.runtime.append({
      ...n,
      parentId: this.runtime.messages.at(-1)?.id ?? null,
      sourceId: null
    });
  }
  async handleCancel() {
    this.runtime.cancelRun();
  }
}
let Dm = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const hl = Dm("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), Fm = "__optimistic__", Bm = () => `${Fm}${hl()}`, mr = /* @__PURE__ */ Symbol("autoStatus"), Um = Object.freeze(Object.assign({ type: "running" }, { [mr]: !0 })), $m = Object.freeze(Object.assign({
  type: "complete",
  reason: "unknown"
}, { [mr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "tool-calls"
}, { [mr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "interrupt"
}, { [mr]: !0 }));
const Hm = (r) => r[mr] === !0, pf = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [mr]: !0 }) : r && n ? Um : $m;
var An = { exports: {} }, Pd;
function Vm() {
  if (Pd) return An.exports;
  Pd = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(p, m, v) {
    v == null && m !== null && typeof m == "object" && (v = m, m = void 0), r && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const w = JSON.parse(p, m);
    if (w === null || typeof w != "object")
      return w;
    const b = v && v.protoAction || "error", S = v && v.constructorAction || "error";
    if (b === "ignore" && S === "ignore")
      return w;
    if (b !== "ignore" && S !== "ignore") {
      if (n.test(p) === !1 && i.test(p) === !1)
        return w;
    } else if (b !== "ignore" && S === "ignore") {
      if (n.test(p) === !1)
        return w;
    } else if (i.test(p) === !1)
      return w;
    return u(w, { protoAction: b, constructorAction: S, safe: v && v.safe });
  }
  function u(p, { protoAction: m = "error", constructorAction: v = "error", safe: w } = {}) {
    let b = [p];
    for (; b.length; ) {
      const S = b;
      b = [];
      for (const I of S) {
        if (m !== "ignore" && Object.prototype.hasOwnProperty.call(I, "__proto__")) {
          if (w === !0)
            return null;
          if (m === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete I.__proto__;
        }
        if (v !== "ignore" && Object.prototype.hasOwnProperty.call(I, "constructor") && I.constructor !== null && typeof I.constructor == "object" && Object.prototype.hasOwnProperty.call(I.constructor, "prototype")) {
          if (w === !0)
            return null;
          if (v === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete I.constructor;
        }
        for (const P in I) {
          const j = I[P];
          j && typeof j == "object" && b.push(j);
        }
      }
    }
    return p;
  }
  function d(p, m, v) {
    const { stackTraceLimit: w } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, m, v);
    } finally {
      Error.stackTraceLimit = w;
    }
  }
  function f(p, m) {
    const { stackTraceLimit: v } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, m, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = v;
    }
  }
  return An.exports = d, An.exports.default = d, An.exports.parse = d, An.exports.safeParse = f, An.exports.scan = u, An.exports;
}
var Wm = Vm();
const jd = /* @__PURE__ */ cf(Wm);
function Qm(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function f() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(b, S, I) {
    switch (b) {
      case '"': {
        i = S, n.pop(), n.push(I), n.push("INSIDE_STRING"), f();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = S, a = S, n.pop(), n.push(I), n.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        n.pop(), n.push(I), n.push("INSIDE_NUMBER"), f();
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        i = S, n.pop(), n.push(I), n.push("INSIDE_NUMBER"), f();
        break;
      }
      case "{": {
        i = S, n.pop(), n.push(I), n.push("INSIDE_OBJECT_START"), f();
        break;
      }
      case "[": {
        i = S, n.pop(), n.push(I), n.push("INSIDE_ARRAY_START"), f();
        break;
      }
    }
  }
  function m(b, S) {
    switch (b) {
      case ",": {
        n.pop(), n.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        i = S, n.pop(), d = u.pop();
        break;
      }
    }
  }
  function v(b, S) {
    switch (b) {
      case ",": {
        n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
        break;
      }
      case "]": {
        i = S, n.pop(), d = u.pop();
        break;
      }
    }
  }
  for (let b = 0; b < r.length; b++) {
    const S = r[b];
    switch (n[n.length - 1]) {
      case "ROOT":
        p(S, b, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (S) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "";
            break;
          }
          case "}": {
            i = b, n.pop(), d = u.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        S === '"' && (n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "");
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (S) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE"), d += S;
            break;
          }
          default: {
            d += S;
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        S === ":" && (n.pop(), n.push("INSIDE_OBJECT_BEFORE_VALUE"));
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        p(S, b, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        m(S, b);
        break;
      }
      case "INSIDE_STRING": {
        switch (S) {
          case '"': {
            n.pop(), i = b, d = u.pop();
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            i = b;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        S === "]" ? (i = b, n.pop(), d = u.pop()) : (i = b, d = "0", p(S, b, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (S) {
          case ",": {
            n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
            break;
          }
          case "]": {
            i = b, n.pop(), d = u.pop();
            break;
          }
          default: {
            i = b;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        p(S, b, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        n.pop(), n[n.length - 1] === "INSIDE_STRING" ? i = b : n[n.length - 1] === "INSIDE_OBJECT_KEY" && (d += S);
        break;
      }
      case "INSIDE_NUMBER": {
        switch (S) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            i = b;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(S, b), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(S, b);
            break;
          }
          case "}": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(S, b);
            break;
          }
          case "]": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(S, b);
            break;
          }
          default: {
            n.pop(), d = u.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const P = r.substring(a, b + 1);
        !"false".startsWith(P) && !"true".startsWith(P) && !"null".startsWith(P) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? m(S, b) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(S, b)) : i = b;
        break;
      }
    }
  }
  let w = r.slice(0, i + 1);
  for (let b = n.length - 1; b >= 0; b--)
    switch (n[b]) {
      case "INSIDE_STRING": {
        w += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        w += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        w += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const I = r.substring(a, r.length);
        "true".startsWith(I) ? w += "true".slice(I.length) : "false".startsWith(I) ? w += "false".slice(I.length) : "null".startsWith(I) && (w += "null".slice(I.length));
      }
    }
  return [w, u];
}
const Za = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), Ym = (r) => {
  if (r.length === 0)
    return {
      [Za]: { state: "partial", partialPath: [] }
    };
  try {
    const n = jd.parse(r);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[Za] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = Qm(r), a = jd.parse(n);
      if (typeof a != "object" || a === null)
        throw new Error("argsText is expected to be an object");
      return a[Za] = {
        state: "partial",
        partialPath: i
      }, a;
    } catch {
      return;
    }
  }
}, pl = (r, n, i) => {
  const { role: a, id: u, createdAt: d, attachments: f, status: p, metadata: m } = r, v = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, w = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, b = ({ image: S, ...I }) => {
    const P = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(S), j = /^https?:\/\//.test(S);
    return P || j ? { ...I, image: S } : (console.warn("Invalid image data format detected"), null);
  };
  if (a !== "user" && f?.length)
    throw new Error("attachments are only supported for user messages");
  if (a !== "assistant" && p)
    throw new Error("status is only supported for assistant messages");
  if (a !== "assistant" && m?.steps)
    throw new Error("metadata.steps is only supported for assistant messages");
  switch (a) {
    case "assistant":
      return {
        ...v,
        role: a,
        content: w.map((S) => {
          const I = S.type;
          switch (I) {
            case "text":
            case "reasoning":
              return S.text.trim().length === 0 ? null : S;
            case "file":
            case "source":
              return S;
            case "image":
              return b(S);
            case "data":
              return S;
            case "tool-call": {
              const { parentId: P, messages: j, ...z } = S, J = {
                ...z,
                toolCallId: S.toolCallId ?? `tool-${hl()}`,
                ...P !== void 0 && { parentId: P },
                ...j !== void 0 && { messages: j }
              };
              return S.args ? {
                ...J,
                args: S.args,
                argsText: S.argsText ?? JSON.stringify(S.args)
              } : {
                ...J,
                args: Ym(S.argsText ?? "") ?? {},
                argsText: S.argsText ?? ""
              };
            }
            default: {
              const P = I;
              throw new Error(`Unsupported assistant message part type: ${P}`);
            }
          }
        }).filter((S) => !!S),
        status: p ?? i,
        metadata: {
          unstable_state: m?.unstable_state ?? null,
          unstable_annotations: m?.unstable_annotations ?? [],
          unstable_data: m?.unstable_data ?? [],
          custom: m?.custom ?? {},
          steps: m?.steps ?? [],
          ...m?.submittedFeedback && {
            submittedFeedback: m.submittedFeedback
          }
        }
      };
    case "user":
      return {
        ...v,
        role: a,
        content: w.map((S) => {
          const I = S.type;
          switch (I) {
            case "text":
            case "image":
            case "audio":
            case "file":
              return S;
            default: {
              const P = I;
              throw new Error(`Unsupported user message part type: ${P}`);
            }
          }
        }),
        attachments: f ?? [],
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    case "system":
      if (w.length !== 1 || w[0].type !== "text")
        throw new Error("System messages must have exactly one text message part.");
      return {
        ...v,
        role: a,
        content: w,
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    default: {
      const S = a;
      throw new Error(`Unknown message role: ${S}`);
    }
  }
}, ml = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (r) => {
    const n = r.map((i) => pl(i, hl(), pf(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, a) => ({
        parentId: a > 0 ? n[a - 1].id : null,
        message: i
      }))
    };
  }
}, Oi = (r) => r.next ? Oi(r.next) : "current" in r ? r : null;
class qm {
  func;
  _value = null;
  /**
   * @param func - The function that computes the cached value
   */
  constructor(n) {
    this.func = n;
  }
  /**
   * Gets the cached value, computing it if necessary.
   */
  get value() {
    return this._value === null && (this._value = this.func()), this._value;
  }
  /**
   * Invalidates the cache, forcing recomputation on next access.
   */
  dirty() {
    this._value = null;
  }
}
class mf {
  /** Map of message IDs to repository message objects */
  messages = /* @__PURE__ */ new Map();
  /** Reference to the current head (most recent) message in the active branch */
  head = null;
  /** Root node of the tree structure */
  root = {
    children: [],
    next: null
  };
  /**
   * Recursively updates the level of a message and all its descendants.
   *
   * @param message - The message to update
   * @param newLevel - The new level for the message
   */
  updateLevels(n, i) {
    n.level = i;
    for (const a of n.children) {
      const u = this.messages.get(a);
      u && this.updateLevels(u, i + 1);
    }
  }
  /**
   * Performs link/unlink operations between messages in the tree.
   *
   * @param newParent - The new parent message, or null
   * @param child - The child message to operate on
   * @param operation - The type of operation to perform:
   *   - "cut": Remove the child from its current parent
   *   - "link": Add the child to a new parent
   *   - "relink": Both cut and link operations
   */
  performOp(n, i, a) {
    const u = i.prev ?? this.root, d = n ?? this.root;
    if (!(a === "relink" && u === d)) {
      if (a !== "link" && (u.children = u.children.filter((f) => f !== i.current.id), u.next === i)) {
        const f = u.children.at(-1), p = f ? this.messages.get(f) : null;
        if (p === void 0)
          throw new Error("MessageRepository(performOp/cut): Fallback sibling message not found. This is likely an internal bug in assistant-ui.");
        u.next = p;
      }
      if (a !== "cut") {
        for (let p = n; p; p = p.prev)
          if (p.current.id === i.current.id)
            throw new Error("MessageRepository(performOp/link): A message with the same id already exists in the parent tree. This error occurs if the same message id is found multiple times. This is likely an internal bug in assistant-ui.");
        d.children = [
          ...d.children,
          i.current.id
        ], (Oi(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const f = n ? n.level + 1 : 0;
        this.updateLevels(i, f);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new qm(() => {
    const n = new Array((this.head?.level ?? -1) + 1);
    for (let i = this.head; i; i = i.prev)
      n[i.level] = i.current;
    return n;
  });
  /**
   * Gets the ID of the current head message.
   * @returns The ID of the head message, or null if no messages exist
   */
  get headId() {
    return this.head?.current.id ?? null;
  }
  /**
   * Gets all messages in the current active branch, from root to head.
   * @param headId - Optional ID of the head message to get messages for. If not provided, uses the current head.
   * @returns Array of messages in the specified branch
   */
  getMessages(n) {
    if (n === void 0 || n === this.head?.current.id)
      return this._messages.value;
    const i = this.messages.get(n);
    if (!i)
      throw new Error("MessageRepository(getMessages): Head message not found. This is likely an internal bug in assistant-ui.");
    const a = new Array(i.level + 1);
    for (let u = i; u; u = u.prev)
      a[u.level] = u.current;
    return a;
  }
  /**
   * Adds a new message or updates an existing one in the repository.
   * If the message ID already exists, the message is updated and potentially relinked to a new parent.
   * If the message is new, it's added as a child of the specified parent.
   *
   * @param parentId - ID of the parent message, or null for root messages
   * @param message - The message to add or update
   * @throws Error if the parent message is not found
   */
  addOrUpdateMessage(n, i) {
    const a = this.messages.get(i.id), u = n ? this.messages.get(n) : null;
    if (u === void 0)
      throw new Error("MessageRepository(addOrUpdateMessage): Parent message not found. This is likely an internal bug in assistant-ui.");
    if (a) {
      a.current = i, this.performOp(u, a, "relink"), this._messages.dirty();
      return;
    }
    const d = {
      prev: u,
      current: i,
      next: null,
      children: [],
      level: u ? u.level + 1 : 0
    };
    this.messages.set(i.id, d), this.performOp(u, d, "link"), this.head === u && (this.head = d), this._messages.dirty();
  }
  /**
   * Gets a message and its parent ID by message ID.
   *
   * @param messageId - ID of the message to retrieve
   * @returns Object containing the message and its parent ID
   * @throws Error if the message is not found
   */
  getMessage(n) {
    const i = this.messages.get(n);
    if (!i)
      throw new Error("MessageRepository(updateMessage): Message not found. This is likely an internal bug in assistant-ui.");
    return {
      parentId: i.prev?.current.id ?? null,
      message: i.current,
      index: i.level
    };
  }
  /**
   * Adds an optimistic message to the repository.
   * An optimistic message is a temporary placeholder that will be replaced by a real message later.
   *
   * @param parentId - ID of the parent message, or null for root messages
   * @param message - The core message to convert to an optimistic message
   * @returns The generated optimistic ID
   */
  appendOptimisticMessage(n, i) {
    let a;
    do
      a = Bm();
    while (this.messages.has(a));
    return this.addOrUpdateMessage(n, pl(i, a, { type: "running" })), a;
  }
  /**
   * Deletes a message from the repository and relinks its children.
   *
   * @param messageId - ID of the message to delete
   * @param replacementId - Optional ID of the message to become the new parent of the children,
   *                       undefined means use the deleted message's parent,
   *                       null means use the root
   * @throws Error if the message or replacement is not found
   */
  deleteMessage(n, i) {
    const a = this.messages.get(n);
    if (!a)
      throw new Error("MessageRepository(deleteMessage): Message not found. This is likely an internal bug in assistant-ui.");
    const u = i === void 0 ? a.prev : i === null ? null : this.messages.get(i);
    if (u === void 0)
      throw new Error("MessageRepository(deleteMessage): Replacement not found. This is likely an internal bug in assistant-ui.");
    for (const d of a.children) {
      const f = this.messages.get(d);
      if (!f)
        throw new Error("MessageRepository(deleteMessage): Child message not found. This is likely an internal bug in assistant-ui.");
      this.performOp(u, f, "relink");
    }
    this.performOp(null, a, "cut"), this.messages.delete(n), this.head === a && (this.head = Oi(u ?? this.root)), this._messages.dirty();
  }
  /**
   * Gets all branch IDs (sibling messages) at the level of a specified message.
   *
   * @param messageId - ID of the message to find branches for
   * @returns Array of message IDs representing branches
   * @throws Error if the message is not found
   */
  getBranches(n) {
    const i = this.messages.get(n);
    if (!i)
      throw new Error("MessageRepository(getBranches): Message not found. This is likely an internal bug in assistant-ui.");
    const { children: a } = i.prev ?? this.root;
    return a;
  }
  /**
   * Switches the active branch to the one containing the specified message.
   *
   * @param messageId - ID of the message in the branch to switch to
   * @throws Error if the branch is not found
   */
  switchToBranch(n) {
    const i = this.messages.get(n);
    if (!i)
      throw new Error("MessageRepository(switchToBranch): Branch not found. This is likely an internal bug in assistant-ui.");
    const a = i.prev ?? this.root;
    a.next = i, this.head = Oi(i), this._messages.dirty();
  }
  /**
   * Resets the head to a specific message or null.
   *
   * @param messageId - ID of the message to set as head, or null to clear the head
   * @throws Error if the message is not found
   */
  resetHead(n) {
    if (n === null) {
      this.clear();
      return;
    }
    const i = this.messages.get(n);
    if (!i)
      throw new Error("MessageRepository(resetHead): Branch not found. This is likely an internal bug in assistant-ui.");
    if (i.children.length > 0) {
      const a = (u) => {
        for (const d of u.children) {
          const f = this.messages.get(d);
          f && (a(f), this.messages.delete(d));
        }
      };
      a(i), i.children = [], i.next = null;
    }
    this.head = i;
    for (let a = i; a; a = a.prev)
      a.prev && (a.prev.next = a);
    this._messages.dirty();
  }
  /**
   * Clears all messages from the repository.
   */
  clear() {
    this.messages.clear(), this.head = null, this.root = {
      children: [],
      next: null
    }, this._messages.dirty();
  }
  /**
   * Exports the repository state for persistence.
   *
   * @returns Exportable repository state
   */
  export() {
    const n = [];
    for (const [, i] of this.messages)
      n.push({
        message: i.current,
        parentId: i.prev?.current.id ?? null
      });
    return {
      headId: this.head?.current.id ?? null,
      messages: n
    };
  }
  /**
   * Imports repository state from an exported repository.
   *
   * @param repository - The exported repository state to import
   */
  import({ headId: n, messages: i }) {
    for (const { message: a, parentId: u } of i)
      this.addOrUpdateMessage(u, a);
    this.resetHead(n ?? i.at(-1)?.message.id ?? null);
  }
}
class Yi {
  _subscriptions = /* @__PURE__ */ new Set();
  _connection;
  get isConnected() {
    return !!this._connection;
  }
  notifySubscribers() {
    for (const n of this._subscriptions)
      n();
  }
  _updateConnection() {
    if (this._subscriptions.size > 0) {
      if (this._connection)
        return;
      this._connection = this._connect();
    } else
      this._connection?.(), this._connection = void 0;
  }
  subscribe(n) {
    return this._subscriptions.add(n), this._updateConnection(), () => {
      this._subscriptions.delete(n), this._updateConnection();
    };
  }
}
const Mt = /* @__PURE__ */ Symbol("skip-update");
class gl extends Yi {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(n) {
    super(), this.binding = n;
  }
  _previousStateDirty = !0;
  _previousState;
  getState = () => {
    if (!this.isConnected || this._previousStateDirty) {
      const n = this.binding.getState();
      n !== Mt && (this._previousState = n), this._previousStateDirty = !1;
    }
    if (this._previousState === void 0)
      throw new Error("Entry not available in the store");
    return this._previousState;
  };
  _connect() {
    const n = () => {
      this._previousStateDirty = !0, this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
class Ni {
  _core;
  _threadListBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadListBinding = i, this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.switchTo = this.switchTo.bind(this), this.rename = this.rename.bind(this), this.archive = this.archive.bind(this), this.unarchive = this.unarchive.bind(this), this.delete = this.delete.bind(this), this.initialize = this.initialize.bind(this), this.generateTitle = this.generateTitle.bind(this), this.subscribe = this.subscribe.bind(this), this.unstable_on = this.unstable_on.bind(this), this.getState = this.getState.bind(this), this.detach = this.detach.bind(this);
  }
  getState() {
    return this._core.getState();
  }
  switchTo() {
    const n = this._core.getState();
    return this._threadListBinding.switchToThread(n.id);
  }
  rename(n) {
    const i = this._core.getState();
    return this._threadListBinding.rename(i.id, n);
  }
  archive() {
    const n = this._core.getState();
    return this._threadListBinding.archive(n.id);
  }
  unarchive() {
    const n = this._core.getState();
    return this._threadListBinding.unarchive(n.id);
  }
  delete() {
    const n = this._core.getState();
    return this._threadListBinding.delete(n.id);
  }
  initialize() {
    const n = this._core.getState();
    return this._threadListBinding.initialize(n.id);
  }
  generateTitle() {
    const n = this._core.getState();
    return this._threadListBinding.generateTitle(n.id);
  }
  unstable_on(n, i) {
    let a = this._core.getState().isMain, u = this._core.getState().id;
    return this.subscribe(() => {
      const d = this._core.getState(), f = d.isMain, p = d.id;
      a === f && u === p || (a = f, u = p, !(n === "switched-to" && !f) && (n === "switched-away" && f || i()));
    });
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  detach() {
    const n = this._core.getState();
    this._threadListBinding.detach(n.id);
  }
  /** @internal */
  __internal_getRuntime() {
    return this;
  }
}
function Gm(r, n) {
  if (r === void 0 && n === void 0)
    return !0;
  if (r === void 0 || n === void 0)
    return !1;
  for (const i of Object.keys(r)) {
    const a = r[i], u = n[i];
    if (!Object.is(a, u))
      return !1;
  }
  return !0;
}
class It extends Yi {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(n) {
    super(), this.binding = n;
    const i = n.getState();
    if (i === Mt)
      throw new Error("Entry not available in the store");
    this._previousState = i;
  }
  _previousState;
  getState = () => (this.isConnected || this._syncState(), this._previousState);
  _syncState() {
    const n = this.binding.getState();
    return n === Mt || Gm(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const hr = /* @__PURE__ */ Symbol("innerMessage"), Km = (r) => r[hr], ls = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class gf {
  _core;
  get path() {
    return this._core.path;
  }
  constructor(n) {
    this._core = n, this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.getState = this.getState.bind(this), this.remove = this.remove.bind(this), this.subscribe = this.subscribe.bind(this);
  }
  getState() {
    return this._core.getState();
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
}
class yf extends gf {
  _composerApi;
  constructor(n, i) {
    super(n), this._composerApi = i;
  }
  remove() {
    const n = this._composerApi.getState();
    if (!n)
      throw new Error("Composer is not available");
    return n.removeAttachment(this.getState().id);
  }
}
class Jm extends yf {
  get source() {
    return "thread-composer";
  }
}
class Xm extends yf {
  get source() {
    return "edit-composer";
  }
}
class Zm extends gf {
  get source() {
    return "message";
  }
  constructor(n) {
    super(n);
  }
  remove() {
    throw new Error("Message attachments cannot be removed");
  }
}
class vf extends Yi {
  config;
  constructor(n) {
    super(), this.config = n;
  }
  getState() {
    return this.config.binding.getState();
  }
  outerSubscribe(n) {
    return this.config.binding.subscribe(n);
  }
  _connect() {
    const n = () => {
      this.notifySubscribers();
    };
    let i = this.config.binding.getState(), a = i?.unstable_on(this.config.event, n);
    const u = () => {
      const f = this.config.binding.getState();
      f !== i && (i = f, a?.(), a = this.config.binding.getState()?.unstable_on(this.config.event, n));
    }, d = this.outerSubscribe(u);
    return () => {
      d?.(), a?.();
    };
  }
}
const _f = Object.freeze([]), wf = Object.freeze({}), eg = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? _f,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? wf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), tg = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? _f,
  runConfig: r?.runConfig ?? wf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class Sf {
  _core;
  get path() {
    return this._core.path;
  }
  constructor(n) {
    this._core = n;
  }
  __internal_bindMethods() {
    this.setText = this.setText.bind(this), this.setRunConfig = this.setRunConfig.bind(this), this.getState = this.getState.bind(this), this.subscribe = this.subscribe.bind(this), this.addAttachment = this.addAttachment.bind(this), this.reset = this.reset.bind(this), this.clearAttachments = this.clearAttachments.bind(this), this.send = this.send.bind(this), this.cancel = this.cancel.bind(this), this.setRole = this.setRole.bind(this), this.getAttachmentByIndex = this.getAttachmentByIndex.bind(this), this.startDictation = this.startDictation.bind(this), this.stopDictation = this.stopDictation.bind(this), this.unstable_on = this.unstable_on.bind(this);
  }
  setText(n) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    i.setText(n);
  }
  setRunConfig(n) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    i.setRunConfig(n);
  }
  addAttachment(n) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    return i.addAttachment(n);
  }
  reset() {
    const n = this._core.getState();
    if (!n)
      throw new Error("Composer is not available");
    return n.reset();
  }
  clearAttachments() {
    const n = this._core.getState();
    if (!n)
      throw new Error("Composer is not available");
    return n.clearAttachments();
  }
  send() {
    const n = this._core.getState();
    if (!n)
      throw new Error("Composer is not available");
    n.send();
  }
  cancel() {
    const n = this._core.getState();
    if (!n)
      throw new Error("Composer is not available");
    n.cancel();
  }
  setRole(n) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    i.setRole(n);
  }
  startDictation() {
    const n = this._core.getState();
    if (!n)
      throw new Error("Composer is not available");
    n.startDictation();
  }
  stopDictation() {
    const n = this._core.getState();
    if (!n)
      throw new Error("Composer is not available");
    n.stopDictation();
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    let a = this._eventSubscriptionSubjects.get(n);
    return a || (a = new vf({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
class ng extends Sf {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(n) {
    const i = new gl({
      path: n.path,
      getState: () => eg(n.getState()),
      subscribe: (a) => n.subscribe(a)
    });
    super({
      path: n.path,
      getState: () => n.getState(),
      subscribe: (a) => i.subscribe(a)
    }), this._getState = i.getState.bind(i), this.__internal_bindMethods();
  }
  getState() {
    return this._getState();
  }
  getAttachmentByIndex(n) {
    return new Jm(new It({
      path: {
        ...this.path,
        attachmentSource: "thread-composer",
        attachmentSelector: { type: "index", index: n },
        ref: `${this.path.ref}.attachments[${n}]`
      },
      getState: () => {
        const a = this.getState().attachments[n];
        return a ? {
          ...a,
          source: "thread-composer"
        } : Mt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
class rg extends Sf {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(n, i) {
    const a = new gl({
      path: n.path,
      getState: () => tg(n.getState()),
      subscribe: (u) => n.subscribe(u)
    });
    super({
      path: n.path,
      getState: () => n.getState(),
      subscribe: (u) => a.subscribe(u)
    }), this._beginEdit = i, this._getState = a.getState.bind(a), this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    super.__internal_bindMethods(), this.beginEdit = this.beginEdit.bind(this);
  }
  getState() {
    return this._getState();
  }
  beginEdit() {
    this._beginEdit();
  }
  getAttachmentByIndex(n) {
    return new Xm(new It({
      path: {
        ...this.path,
        attachmentSource: "edit-composer",
        attachmentSelector: { type: "index", index: n },
        ref: `${this.path.ref}.attachments[${n}]`
      },
      getState: () => {
        const a = this.getState().attachments[n];
        return a ? {
          ...a,
          source: "edit-composer"
        } : Mt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Ld = /* @__PURE__ */ Symbol.for("aui.tool-response");
class Di {
  get [Ld]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && Ld in n;
  }
  static toResponse(n) {
    return n instanceof Di ? n : new Di({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class Od {
  contentBinding;
  messageApi;
  threadApi;
  get path() {
    return this.contentBinding.path;
  }
  constructor(n, i, a) {
    this.contentBinding = n, this.messageApi = i, this.threadApi = a, this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.addToolResult = this.addToolResult.bind(this), this.resumeToolCall = this.resumeToolCall.bind(this), this.getState = this.getState.bind(this), this.subscribe = this.subscribe.bind(this);
  }
  getState() {
    return this.contentBinding.getState();
  }
  addToolResult(n) {
    const i = this.contentBinding.getState();
    if (!i)
      throw new Error("Message part is not available");
    if (i.type !== "tool-call")
      throw new Error("Tried to add tool result to non-tool message part");
    if (!this.messageApi)
      throw new Error("Message API is not available. This is likely a bug in assistant-ui.");
    if (!this.threadApi)
      throw new Error("Thread API is not available");
    const a = this.messageApi.getState();
    if (!a)
      throw new Error("Message is not available");
    const u = i.toolName, d = i.toolCallId, f = Di.toResponse(n);
    this.threadApi.getState().addToolResult({
      messageId: a.id,
      toolName: u,
      toolCallId: d,
      result: f.result,
      artifact: f.artifact,
      isError: f.isError
    });
  }
  resumeToolCall(n) {
    const i = this.contentBinding.getState();
    if (!i)
      throw new Error("Message part is not available");
    if (i.type !== "tool-call")
      throw new Error("Tried to resume tool call on non-tool message part");
    if (!this.threadApi)
      throw new Error("Thread API is not available");
    const a = i.toolCallId;
    this.threadApi.getState().resumeToolCall({
      toolCallId: a,
      payload: n
    });
  }
  subscribe(n) {
    return this.contentBinding.subscribe(n);
  }
}
class Fi extends Yi {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(n) {
    super(), this.binding = n;
  }
  getState() {
    return this.binding.getState();
  }
  outerSubscribe(n) {
    return this.binding.subscribe(n);
  }
  _connect() {
    const n = () => {
      this.notifySubscribers();
    };
    let i = this.binding.getState(), a = i?.subscribe(n);
    const u = () => {
      const f = this.binding.getState();
      f !== i && (i = f, a?.(), a = this.binding.getState()?.subscribe(n), n());
    }, d = this.outerSubscribe(u);
    return () => {
      d?.(), a?.();
    };
  }
}
const Pi = Object.freeze({
  type: "complete"
}), sg = (r, n, i) => {
  if (r.role !== "assistant")
    return Pi;
  if (i.type === "tool-call")
    return i.result ? Pi : r.status;
  const a = n === Math.max(0, r.content.length - 1);
  return r.status.type === "requires-action" ? Pi : a ? r.status : Pi;
}, zd = (r, n) => {
  const i = r.content[n];
  if (!i)
    return Mt;
  const a = sg(r, n, i);
  return Object.freeze({
    ...i,
    [hr]: i[hr],
    status: a
  });
};
class ig {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new rg(new Fi({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.composer`,
        composerSource: "edit"
      },
      getState: this._getEditComposerRuntimeCore,
      subscribe: (a) => this._threadBinding.subscribe(a)
    }), () => this._threadBinding.getState().beginEdit(this._core.getState().id)), this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.reload = this.reload.bind(this), this.getState = this.getState.bind(this), this.subscribe = this.subscribe.bind(this), this.getMessagePartByIndex = this.getMessagePartByIndex.bind(this), this.getMessagePartByToolCallId = this.getMessagePartByToolCallId.bind(this), this.getAttachmentByIndex = this.getAttachmentByIndex.bind(this), this.unstable_getCopyText = this.unstable_getCopyText.bind(this), this.speak = this.speak.bind(this), this.stopSpeaking = this.stopSpeaking.bind(this), this.submitFeedback = this.submitFeedback.bind(this), this.switchToBranch = this.switchToBranch.bind(this);
  }
  composer;
  _getEditComposerRuntimeCore = () => this._threadBinding.getState().getEditComposer(this._core.getState().id);
  getState() {
    return this._core.getState();
  }
  reload(n = {}) {
    const i = this._getEditComposerRuntimeCore(), a = i ?? this._threadBinding.getState().composer, u = i ?? a, { runConfig: d = u.runConfig } = n, f = this._core.getState();
    if (f.role !== "assistant")
      throw new Error("Can only reload assistant messages");
    this._threadBinding.getState().startRun({
      parentId: f.parentId,
      sourceId: f.id,
      runConfig: d
    });
  }
  speak() {
    const n = this._core.getState();
    return this._threadBinding.getState().speak(n.id);
  }
  stopSpeaking() {
    const n = this._core.getState();
    if (this._threadBinding.getState().speech?.messageId === n.id)
      this._threadBinding.getState().stopSpeaking();
    else
      throw new Error("Message is not being spoken");
  }
  submitFeedback({ type: n }) {
    const i = this._core.getState();
    this._threadBinding.getState().submitFeedback({
      messageId: i.id,
      type: n
    });
  }
  switchToBranch({ position: n, branchId: i }) {
    const a = this._core.getState();
    if (i && n)
      throw new Error("May not specify both branchId and position");
    if (!i && !n)
      throw new Error("Must specify either branchId or position");
    const d = this._threadBinding.getState().getBranches(a.id);
    let f = i;
    if (n === "previous" ? f = d[a.branchNumber - 2] : n === "next" && (f = d[a.branchNumber]), !f)
      throw new Error("Branch not found");
    this._threadBinding.getState().switchToBranch(f);
  }
  unstable_getCopyText() {
    return ls(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new Od(new It({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => zd(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new Od(new It({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), a = i.content.findIndex((u) => u.type === "tool-call" && u.toolCallId === n);
        return a === -1 ? Mt : zd(i, a);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new Zm(new It({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.attachments[${n}]`,
        attachmentSource: "message",
        attachmentSelector: { type: "index", index: n }
      },
      getState: () => {
        const a = this.getState().attachments?.[n];
        return a ? {
          ...a,
          source: "message"
        } : Mt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }));
  }
}
const og = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {},
  ...r.stream ? { stream: r.stream } : {}
}), ag = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), lg = (r, n) => typeof n == "string" ? {
  createdAt: /* @__PURE__ */ new Date(),
  parentId: r.at(-1)?.id ?? null,
  sourceId: null,
  runConfig: {},
  role: "user",
  content: [{ type: "text", text: n }],
  attachments: [],
  metadata: { custom: {} }
} : {
  createdAt: n.createdAt ?? /* @__PURE__ */ new Date(),
  parentId: n.parentId ?? r.at(-1)?.id ?? null,
  sourceId: n.sourceId ?? null,
  role: n.role ?? "user",
  content: n.content,
  attachments: n.attachments ?? [],
  metadata: n.metadata ?? { custom: {} },
  runConfig: n.runConfig ?? {},
  startRun: n.startRun
}, ug = (r, n) => {
  const i = r.messages.at(-1);
  return Object.freeze({
    threadId: n.id,
    metadata: n,
    capabilities: r.capabilities,
    isDisabled: r.isDisabled,
    isLoading: r.isLoading,
    isRunning: i?.role !== "assistant" ? !1 : i.status.type === "running",
    messages: r.messages,
    state: r.state,
    suggestions: r.suggestions,
    extras: r.extras,
    speech: r.speech
  });
};
class cg {
  get path() {
    return this._threadBinding.path;
  }
  get __internal_threadBinding() {
    return this._threadBinding;
  }
  _threadBinding;
  constructor(n, i) {
    const a = new It({
      path: n.path,
      getState: () => ug(n.getState(), i.getState()),
      subscribe: (u) => {
        const d = n.subscribe(u), f = i.subscribe(u);
        return () => {
          d(), f();
        };
      }
    });
    this._threadBinding = {
      path: n.path,
      getState: () => n.getState(),
      getStateState: () => a.getState(),
      outerSubscribe: (u) => n.outerSubscribe(u),
      subscribe: (u) => n.subscribe(u)
    }, this.composer = new ng(new Fi({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.composer`,
        composerSource: "thread"
      },
      getState: () => this._threadBinding.getState().composer,
      subscribe: (u) => this._threadBinding.subscribe(u)
    })), this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.append = this.append.bind(this), this.unstable_resumeRun = this.unstable_resumeRun.bind(this), this.unstable_loadExternalState = this.unstable_loadExternalState.bind(this), this.startRun = this.startRun.bind(this), this.cancelRun = this.cancelRun.bind(this), this.stopSpeaking = this.stopSpeaking.bind(this), this.export = this.export.bind(this), this.import = this.import.bind(this), this.reset = this.reset.bind(this), this.getMessageByIndex = this.getMessageByIndex.bind(this), this.getMessageById = this.getMessageById.bind(this), this.subscribe = this.subscribe.bind(this), this.unstable_on = this.unstable_on.bind(this), this.getModelContext = this.getModelContext.bind(this), this.getModelConfig = this.getModelConfig.bind(this), this.getState = this.getState.bind(this);
  }
  composer;
  getState() {
    return this._threadBinding.getStateState();
  }
  append(n) {
    this._threadBinding.getState().append(lg(this._threadBinding.getState().messages, n));
  }
  subscribe(n) {
    return this._threadBinding.subscribe(n);
  }
  getModelContext() {
    return this._threadBinding.getState().getModelContext();
  }
  getModelConfig() {
    return this.getModelContext();
  }
  startRun(n) {
    const i = n === null || typeof n == "string" ? { parentId: n } : n;
    return this._threadBinding.getState().startRun(ag(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun(og(n));
  }
  unstable_loadExternalState(n) {
    this._threadBinding.getState().unstable_loadExternalState(n);
  }
  cancelRun() {
    this._threadBinding.getState().cancelRun();
  }
  stopSpeaking() {
    return this._threadBinding.getState().stopSpeaking();
  }
  export() {
    return this._threadBinding.getState().export();
  }
  import(n) {
    this._threadBinding.getState().import(n);
  }
  reset(n) {
    this._threadBinding.getState().reset(n);
  }
  getMessageByIndex(n) {
    if (n < 0)
      throw new Error("Message index must be >= 0");
    return this._getMessageRuntime({
      ...this.path,
      ref: `${this.path.ref}${this.path.ref}.messages[${n}]`,
      messageSelector: { type: "index", index: n }
    }, () => {
      const i = this._threadBinding.getState().messages, a = i[n];
      if (a)
        return {
          message: a,
          parentId: i[n - 1]?.id ?? null,
          index: n
        };
    });
  }
  getMessageById(n) {
    return this._getMessageRuntime({
      ...this.path,
      ref: this.path.ref + `${this.path.ref}.messages[messageId=${JSON.stringify(n)}]`,
      messageSelector: { type: "messageId", messageId: n }
    }, () => this._threadBinding.getState().getMessageById(n));
  }
  _getMessageRuntime(n, i) {
    return new ig(new It({
      path: n,
      getState: () => {
        const { message: a, parentId: u, index: d } = i() ?? {}, { messages: f, speech: p } = this._threadBinding.getState();
        if (!a || u === void 0 || d === void 0)
          return Mt;
        const v = this._threadBinding.getState().getBranches(a.id), w = a.metadata.submittedFeedback;
        return {
          ...a,
          [hr]: a[hr],
          index: d,
          isLast: f.at(-1)?.id === a.id,
          parentId: u,
          branchNumber: v.indexOf(a.id) + 1,
          branchCount: v.length,
          speech: p?.messageId === a.id ? p : void 0,
          submittedFeedback: w
        };
      },
      subscribe: (a) => this._threadBinding.subscribe(a)
    }), this._threadBinding);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    let a = this._eventSubscriptionSubjects.get(n);
    return a || (a = new vf({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
const dg = (r) => ({
  mainThreadId: r.mainThreadId,
  newThread: r.newThreadId,
  threads: r.threadIds,
  archivedThreads: r.archivedThreadIds,
  isLoading: r.isLoading,
  threadItems: r.threadData
}), ji = (r, n) => {
  if (n === void 0)
    return Mt;
  const i = r.getItemById(n);
  return i ? {
    id: i.id,
    threadId: i.id,
    // TODO remove in 0.12.0
    remoteId: i.remoteId,
    externalId: i.externalId,
    title: i.title,
    status: i.status,
    isMain: i.id === r.mainThreadId
  } : Mt;
};
class fg {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = cg) {
    this._core = n, this._runtimeFactory = i;
    const a = new gl({
      path: {},
      getState: () => dg(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new Ni(new It({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => ji(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new Fi({
      path: {
        ref: "threads.main",
        threadSelector: { type: "main" }
      },
      getState: () => n.getMainThreadRuntimeCore(),
      subscribe: (u) => n.subscribe(u)
    }), this._mainThreadListItemRuntime), this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.switchToThread = this.switchToThread.bind(this), this.switchToNewThread = this.switchToNewThread.bind(this), this.getState = this.getState.bind(this), this.subscribe = this.subscribe.bind(this), this.getById = this.getById.bind(this), this.getItemById = this.getItemById.bind(this), this.getItemByIndex = this.getItemByIndex.bind(this), this.getArchivedItemByIndex = this.getArchivedItemByIndex.bind(this);
  }
  switchToThread(n) {
    return this._core.switchToThread(n);
  }
  switchToNewThread() {
    return this._core.switchToNewThread();
  }
  getState() {
    return this._getState();
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  _mainThreadListItemRuntime;
  main;
  get mainItem() {
    return this._mainThreadListItemRuntime;
  }
  getById(n) {
    return new this._runtimeFactory(new Fi({
      path: {
        ref: `threads[threadId=${JSON.stringify(n)}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => this._core.getThreadRuntimeCore(n),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(n) {
    return new Ni(new It({
      path: {
        ref: `threadItems[${n}]`,
        threadSelector: { type: "index", index: n }
      },
      getState: () => ji(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new Ni(new It({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => ji(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new Ni(new It({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => ji(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const hg = C.createContext(null), pg = () => C.useContext(hg), Nn = Object.freeze([]), Ln = "DEFAULT_THREAD_ID", mg = Object.freeze([Ln]), xf = Object.freeze({
  id: Ln,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), gg = Promise.resolve(), Dd = Object.freeze({
  [Ln]: xf
});
class yg {
  adapter;
  threadFactory;
  _mainThreadId = Ln;
  _threads = mg;
  _archivedThreads = Nn;
  _threadData = Dd;
  get isLoading() {
    return this.adapter.isLoading ?? !1;
  }
  get newThreadId() {
  }
  get threadIds() {
    return this._threads;
  }
  get archivedThreadIds() {
    return this._archivedThreads;
  }
  get threadData() {
    return this._threadData;
  }
  getLoadThreadsPromise() {
    return gg;
  }
  _mainThread;
  get mainThreadId() {
    return this._mainThreadId;
  }
  constructor(n = {}, i) {
    this.adapter = n, this.threadFactory = i, this._mainThread = this.threadFactory(), this.__internal_setAdapter(n, !0);
  }
  getMainThreadRuntimeCore() {
    return this._mainThread;
  }
  getThreadRuntimeCore() {
    throw new Error("Method not implemented.");
  }
  getItemById(n) {
    for (const i of this.adapter.threads ?? [])
      if (i.id === n)
        return i;
    for (const i of this.adapter.archivedThreads ?? [])
      if (i.id === n)
        return i;
    if (n === Ln)
      return xf;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? Ln, d = n.threads ?? Nn, f = n.archivedThreads ?? Nn, p = a.threadId ?? Ln, m = a.threads ?? Nn, v = a.archivedThreads ?? Nn;
    !i && p === u && m === d && v === f || (this._threadData = {
      ...Dd,
      ...Object.fromEntries(n.threads?.map((w) => [
        w.id,
        {
          ...w,
          remoteId: w.remoteId,
          externalId: w.externalId,
          status: "regular"
        }
      ]) ?? []),
      ...Object.fromEntries(n.archivedThreads?.map((w) => [
        w.id,
        {
          ...w,
          remoteId: w.remoteId,
          externalId: w.externalId,
          status: "archived"
        }
      ]) ?? [])
    }, m !== d && (this._threads = this.adapter.threads?.map((w) => w.id) ?? Nn), v !== f && (this._archivedThreads = this.adapter.archivedThreads?.map((w) => w.id) ?? Nn), p !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
  }
  async switchToThread(n) {
    if (this._mainThreadId === n)
      return;
    const i = this.adapter.onSwitchToThread;
    if (!i)
      throw new Error("External store adapter does not support switching to thread");
    i(n);
  }
  async switchToNewThread() {
    const n = this.adapter.onSwitchToNewThread;
    if (!n)
      throw new Error("External store adapter does not support switching to new thread");
    n();
  }
  async rename(n, i) {
    const a = this.adapter.onRename;
    if (!a)
      throw new Error("External store adapter does not support renaming");
    a(n, i);
  }
  async detach() {
  }
  async archive(n) {
    const i = this.adapter.onArchive;
    if (!i)
      throw new Error("External store adapter does not support archiving");
    i(n);
  }
  async unarchive(n) {
    const i = this.adapter.onUnarchive;
    if (!i)
      throw new Error("External store adapter does not support unarchiving");
    i(n);
  }
  async delete(n) {
    const i = this.adapter.onDelete;
    if (!i)
      throw new Error("External store adapter does not support deleting");
    i(n);
  }
  initialize(n) {
    return Promise.resolve({ remoteId: n, externalId: void 0 });
  }
  generateTitle() {
    throw new Error("Method not implemented.");
  }
  _subscriptions = /* @__PURE__ */ new Set();
  subscribe(n) {
    return this._subscriptions.add(n), () => this._subscriptions.delete(n);
  }
  _notifySubscribers() {
    for (const n of this._subscriptions)
      n();
  }
}
class Fd {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((a, u) => {
      const d = this.cache.get(a), f = i(d, a, u);
      return this.cache.set(a, f), f;
    });
  }
}
class vg extends hf {
  runtime;
  endEditCallback;
  get canCancel() {
    return !0;
  }
  getAttachmentAdapter() {
    return this.runtime.adapters?.attachments;
  }
  getDictationAdapter() {
    return this.runtime.adapters?.dictation;
  }
  _nonTextParts;
  _previousText;
  _parentId;
  _sourceId;
  constructor(n, i, { parentId: a, message: u }) {
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = a, this._sourceId = u.id, this._previousText = ls(u), this.setText(this._previousText), this.setRole(u.role), this.setAttachments(u.attachments ?? []), this._nonTextParts = u.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    ls(n) !== this._previousText && this.runtime.append({
      ...n,
      content: [...n.content, ...this._nonTextParts],
      parentId: this._parentId,
      sourceId: this._sourceId
    }), this.handleCancel();
  }
  handleCancel() {
    this.endEditCallback(), this._notifySubscribers();
  }
}
class _g {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new mf();
  get messages() {
    return this.repository.getMessages();
  }
  get state() {
    let n;
    for (const i of this.messages)
      if (i.role === "assistant") {
        n = i;
        break;
      }
    return n?.metadata.unstable_state ?? null;
  }
  composer = new zm(this);
  constructor(n) {
    this._contextProvider = n;
  }
  getModelContext() {
    return this._contextProvider.getModelContext();
  }
  _editComposers = /* @__PURE__ */ new Map();
  getEditComposer(n) {
    return this._editComposers.get(n);
  }
  beginEdit(n) {
    if (this._editComposers.has(n))
      throw new Error("Edit already in progress");
    this._editComposers.set(n, new vg(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
  }
  getMessageById(n) {
    try {
      return this.repository.getMessage(n);
    } catch {
      return;
    }
  }
  getBranches(n) {
    return this.repository.getBranches(n);
  }
  switchToBranch(n) {
    this.repository.switchToBranch(n), this._notifySubscribers();
  }
  _notifySubscribers() {
    for (const n of this._subscriptions)
      n();
  }
  _notifyEventSubscribers(n) {
    const i = this._eventSubscribers.get(n);
    if (i)
      for (const a of i)
        a();
  }
  subscribe(n) {
    return this._subscriptions.add(n), () => this._subscriptions.delete(n);
  }
  submitFeedback({ messageId: n, type: i }) {
    const a = this.adapters?.feedback;
    if (!a)
      throw new Error("Feedback adapter not configured");
    const { message: u, parentId: d } = this.repository.getMessage(n);
    if (a.submit({ message: u, type: i }), u.role === "assistant") {
      const f = {
        ...u,
        metadata: {
          ...u.metadata,
          submittedFeedback: { type: i }
        }
      };
      this.repository.addOrUpdateMessage(d, f);
    }
    this._notifySubscribers();
  }
  _stopSpeaking;
  speech;
  speak(n) {
    const i = this.adapters?.speech;
    if (!i)
      throw new Error("Speech adapter not configured");
    const { message: a } = this.repository.getMessage(n);
    this._stopSpeaking?.();
    const u = i.speak(ls(a)), d = u.subscribe(() => {
      u.status.type === "ended" ? (this._stopSpeaking = void 0, this.speech = void 0) : this.speech = { messageId: n, status: u.status }, this._notifySubscribers();
    });
    this.speech = { messageId: n, status: u.status }, this._notifySubscribers(), this._stopSpeaking = () => {
      u.cancel(), d(), this.speech = void 0, this._stopSpeaking = void 0;
    };
  }
  stopSpeaking() {
    if (!this._stopSpeaking)
      throw new Error("No message is being spoken");
    this._stopSpeaking(), this._notifySubscribers();
  }
  ensureInitialized() {
    this._isInitialized || (this._isInitialized = !0, this._notifyEventSubscribers("initialize"));
  }
  // TODO import()/export() on external store doesn't make much sense
  export() {
    return this.repository.export();
  }
  import(n) {
    this.ensureInitialized(), this.repository.clear(), this.repository.import(n), this._notifySubscribers();
  }
  reset(n) {
    this.import(ml.fromArray(n ?? []));
  }
  _eventSubscribers = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    if (n === "model-context-update")
      return this._contextProvider.subscribe?.(i) ?? (() => {
      });
    const a = this._eventSubscribers.get(n);
    return a ? a.add(i) : this._eventSubscribers.set(n, /* @__PURE__ */ new Set([i])), () => {
      this._eventSubscribers.get(n).delete(i);
    };
  }
}
const wg = Object.freeze([]), Sg = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class xg extends _g {
  _assistantOptimisticId = null;
  _capabilities = {
    switchToBranch: !1,
    switchBranchDuringRun: !1,
    edit: !1,
    reload: !1,
    cancel: !1,
    unstable_copy: !1,
    speech: !1,
    dictation: !1,
    attachments: !1,
    feedback: !1
  };
  get capabilities() {
    return this._capabilities;
  }
  _messages;
  isDisabled;
  get isLoading() {
    return this._store.isLoading ?? !1;
  }
  get messages() {
    return this._messages;
  }
  get state() {
    return this._store.state ?? super.state;
  }
  get adapters() {
    return this._store.adapters;
  }
  suggestions = [];
  extras = void 0;
  _converter = new Fd();
  _store;
  beginEdit(n) {
    if (!this._store.onEdit)
      throw new Error("Runtime does not support editing.");
    super.beginEdit(n);
  }
  constructor(n, i) {
    super(n), this.__internal_setAdapter(i);
  }
  __internal_setAdapter(n) {
    if (this._store === n)
      return;
    const i = n.isRunning ?? !1;
    this.isDisabled = n.isDisabled ?? !1;
    const a = this._store;
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? wg, this._capabilities = {
      switchToBranch: this._store.setMessages !== void 0,
      switchBranchDuringRun: !1,
      // External store never supports branch switching during run
      edit: this._store.onEdit !== void 0,
      reload: this._store.onReload !== void 0,
      cancel: this._store.onCancel !== void 0,
      speech: this._store.adapters?.speech !== void 0,
      dictation: this._store.adapters?.dictation !== void 0,
      unstable_copy: this._store.unstable_capabilities?.copy !== !1,
      // default true
      attachments: !!this._store.adapters?.attachments,
      feedback: !!this._store.adapters?.feedback
    };
    let u;
    if (n.messageRepository) {
      if (a && a.isRunning === n.isRunning && a.messageRepository === n.messageRepository) {
        this._notifySubscribers();
        return;
      }
      this.repository.clear(), this._assistantOptimisticId = null, this.repository.import(n.messageRepository), u = this.repository.getMessages();
    } else if (n.messages) {
      if (a) {
        if (a.convertMessage !== n.convertMessage)
          this._converter = new Fd();
        else if (a.isRunning === n.isRunning && a.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, f, p) => {
        if (!n.convertMessage)
          return f;
        const m = p === (n.messages?.length ?? 0) - 1, v = pf(m, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !Hm(d.status) || d.status === v))
          return d;
        const w = n.convertMessage(f, p), b = pl(w, p.toString(), v);
        return b[hr] = f, b;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const f = u[d], p = u[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, f);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), Sg(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
      role: "assistant",
      content: []
    })), this.repository.resetHead(this._assistantOptimisticId ?? u.at(-1)?.id ?? null), this._messages = this.repository.getMessages(), this._notifySubscribers();
  }
  switchToBranch(n) {
    if (!this._store.setMessages)
      throw new Error("Runtime does not support switching branches.");
    this._store.isRunning || (this.repository.switchToBranch(n), this.updateMessages(this.repository.getMessages()));
  }
  async append(n) {
    if (n.parentId !== (this.messages.at(-1)?.id ?? null)) {
      if (!this._store.onEdit)
        throw new Error("Runtime does not support editing messages.");
      await this._store.onEdit(n);
    } else
      await this._store.onNew(n);
  }
  async startRun(n) {
    if (!this._store.onReload)
      throw new Error("Runtime does not support reloading messages.");
    await this._store.onReload(n.parentId, n);
  }
  async resumeRun(n) {
    if (!this._store.onResume)
      throw new Error("Runtime does not support resuming runs.");
    await this._store.onResume(n);
  }
  unstable_loadExternalState(n) {
    if (!this._store.onLoadExternalState)
      throw new Error("Runtime does not support importing states.");
    this._store.onLoadExternalState(n);
  }
  cancelRun() {
    if (!this._store.onCancel)
      throw new Error("Runtime does not support cancelling runs.");
    this._store.onCancel(), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null);
    let n = this.repository.getMessages();
    const i = n[n.length - 1];
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(ls(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
      this.updateMessages(n);
    }, 0);
  }
  addToolResult(n) {
    if (!this._store.onAddToolResult && !this._store.onAddToolResult)
      throw new Error("Runtime does not support tool results.");
    this._store.onAddToolResult?.(n);
  }
  resumeToolCall(n) {
    if (!this._store.onResumeToolCall)
      throw new Error("Runtime does not support resuming tool calls.");
    this._store.onResumeToolCall(n);
  }
  reset(n) {
    const i = new mf();
    i.import(ml.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(Km).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const Bd = (r) => r.adapters?.threadList ?? {};
class kg extends jm {
  threads;
  constructor(n) {
    super(), this.threads = new yg(Bd(n), () => new xg(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(Bd(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const Eg = (r) => {
  const [n] = C.useState(() => new kg(r));
  C.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = pg() ?? {};
  return C.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), C.useMemo(() => new Iy(n), [n]);
};
function bg(r, n) {
  r.commitTasks.forEach((i) => {
    const a = i.cellIndex, u = n.cells[a];
    if (u.type !== "effect")
      throw new Error("Cannot find effect cell");
    let d = !0;
    if (u.deps !== void 0 && i.deps !== void 0 && (d = u.deps.length !== i.deps.length || u.deps.some((f, p) => !Object.is(f, i.deps[p]))), d) {
      if (u.mounted) {
        if (typeof u.deps != typeof i.deps)
          throw new Error("tapEffect called with and without dependencies across re-renders");
        try {
          u.mounted && u.cleanup && u.cleanup();
        } finally {
          u.mounted = !1;
        }
      }
      const f = i.effect();
      if (f !== void 0 && typeof f != "function")
        throw new Error(`An effect function must either return a cleanup function or nothing. Received: ${typeof f}`);
      u.mounted = !0, u.cleanup = typeof f == "function" ? f : void 0, u.deps = i.deps;
    }
  });
}
function Tg(r) {
  let n = null;
  for (let i = r.cells.length - 1; i >= 0; i--) {
    const a = r.cells[i];
    if (a?.type === "effect" && a.mounted && a.cleanup)
      try {
        a.cleanup();
      } catch (u) {
        n == null && (n = u);
      } finally {
        a.mounted = !1;
      }
  }
  if (n != null)
    throw n;
}
let rs = null;
function Cg(r, n) {
  r.currentIndex = 0;
  const i = rs;
  rs = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    rs = i;
  }
}
function yl() {
  if (!rs)
    throw new Error("No resource fiber available");
  return rs;
}
function kf(r, n) {
  const i = r[Ef];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const Ef = /* @__PURE__ */ Symbol("fnSymbol");
function qi(r, n) {
  return {
    resource: r,
    scheduleRerender: n,
    cells: [],
    currentIndex: 0,
    renderContext: void 0,
    isFirstRender: !0,
    isMounted: !1,
    isNeverMounted: !0
  };
}
function us(r) {
  r.isMounted = !1, Tg(r);
}
function cs(r, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return Cg(r, () => {
    r.renderContext = i;
    try {
      i.state = kf(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function ds(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, bg(n, r);
}
const Rg = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, Ud = Rg ? C.useEffect : C.useLayoutEffect;
function vl(r) {
  const [, n] = C.useState({}), i = C.useMemo(() => qi(r.type, () => n({})), [r.type]), a = cs(i, r.props);
  return Ud(() => () => us(i), [i]), Ud(() => {
    ds(i, a);
  }), a.state;
}
const Gi = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, ss = (r, n, i) => n === r;
let cr;
const el = () => {
  if (cr)
    return cr;
  const r = () => ({
    apis: /* @__PURE__ */ new Map(),
    nextId: 0,
    listeners: /* @__PURE__ */ new Set()
  });
  if (typeof window > "u")
    return cr = r(), cr;
  const n = window.__ASSISTANT_UI_DEVTOOLS_HOOK__;
  if (n)
    return cr = n, n;
  const i = r();
  return window.__ASSISTANT_UI_DEVTOOLS_HOOK__ = i, cr = i, i;
};
class jn {
  static MAX_EVENT_LOGS_PER_API = 200;
  static register(n) {
    const i = el();
    for (const p of i.apis.values())
      if (p.api === n)
        return () => {
        };
    const a = i.nextId++, u = {
      api: n,
      logs: []
    }, d = n.on?.("*", (p) => {
      const m = i.apis.get(a);
      m && (m.logs.push({
        time: /* @__PURE__ */ new Date(),
        event: p.event,
        data: p.payload
      }), m.logs.length > jn.MAX_EVENT_LOGS_PER_API && (m.logs = m.logs.slice(-200)), jn.notifyListeners(a));
    }), f = n.subscribe?.(() => {
      jn.notifyListeners(a);
    });
    return i.apis.set(a, u), jn.notifyListeners(a), () => {
      const p = el();
      p.apis.get(a) && (d?.(), f?.(), p.apis.delete(a), jn.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    el().listeners.forEach((a) => a(n));
  }
}
function be(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[Ef] = r, n;
}
const Ig = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function Mg(r) {
  const n = yl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (f) => {
        const p = d.value, m = typeof f == "function" ? f(p) : f;
        Object.is(p, m) || (d.value = m, Ig(n));
      }
    };
    n.cells[i] = d;
  }
  const a = n.cells[i];
  if (a.type !== "state")
    throw new Error("Hook order changed between renders");
  return a;
}
function Dt(r) {
  const n = Mg(r);
  return [n.value, n.set];
}
function Ag() {
  const r = yl(), n = r.currentIndex++;
  if (!r.isFirstRender && n >= r.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!r.cells[n]) {
    const a = {
      type: "effect",
      mounted: !1
    };
    r.cells[n] = a;
  }
  if (r.cells[n].type !== "effect")
    throw new Error("Hook order changed between renders");
  return n;
}
function Xe(r, n) {
  const i = yl(), a = Ag();
  i.renderContext.commitTasks.push({
    effect: r,
    deps: n,
    cellIndex: a
  });
}
function pr(r) {
  const [n] = Dt(() => ({
    current: r
  }));
  return n;
}
const Ng = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, ce = (r, n) => {
  const i = pr();
  return i.current || (i.current = { value: r(), deps: n }), Ng(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, Pg = (r, n) => ce(() => r, n);
function is(r, n) {
  const [i, a] = Dt({}), u = ce(() => qi(r.type, () => a({})), [r.type]), d = n ? ce(() => r.props, n) : r.props, f = ce(() => cs(u, d), [u, d, i]);
  return Xe(() => () => us(u), [u]), Xe(() => {
    ds(u, f);
  }, [u, f]), f.state;
}
function Ft(r) {
  return kf(r.type, r.props);
}
function bf(r, n, i) {
  const [a, u] = Dt(0), d = Pg(() => u((v) => v + 1), []), [f] = Dt(() => /* @__PURE__ */ new Map()), p = ce(() => n, i), m = ce(() => {
    const v = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const w in r) {
      const b = r[w], S = p(b, w);
      let I = f.get(w);
      (!I || I.resource !== S.type) && (I && v.remove.push(w), I = qi(S.type, d), v.add.push([w, I]));
      const P = cs(I, S.props);
      v.commit.push([w, P]), v.return[w] = P.state;
    }
    if (f.size > v.commit.length - v.add.length + v.remove.length)
      for (const w of f.keys())
        w in r || v.remove.push(w);
    return v;
  }, [r, p, a]);
  return Xe(() => () => {
    for (const v of f.keys())
      us(f.get(v)), f.delete(v);
  }, []), Xe(() => {
    for (const v of m.remove)
      us(f.get(v)), f.delete(v);
    for (const [v, w] of m.add)
      f.set(v, w);
    for (const [v, w] of m.commit)
      ds(f.get(v), w);
  }, [m]), m.return;
}
const jg = 50;
let zt = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class Lg {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, zt.schedulers.add(this), Og();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const Og = () => {
  zt.isScheduled || (zt.isScheduled = !0, queueMicrotask(Tf));
}, Tf = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of zt.schedulers)
      if (zt.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > jg)
          throw new Error("Maximum update depth exceeded. This can happen when a resource repeatedly calls setState inside tapEffect.");
        try {
          i.runTask();
        } catch (a) {
          r.push(a);
        }
      }
    if (r.length > 0)
      throw r.length === 1 ? r[0] : new AggregateError(r, "Errors occurred during flushSync");
  } finally {
    zt.schedulers.clear(), zt.isScheduled = !1;
  }
}, ll = (r) => {
  const n = zt;
  zt = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = r();
    return Tf(), i;
  } finally {
    zt = n;
  }
}, zg = be((r) => {
  const [, n] = Dt(r.element), i = is(r.element), a = pr(/* @__PURE__ */ new Set()).current, u = pr(i);
  return Xe(() => {
    i !== u.current && (u.current = i, a.forEach((f) => f()));
  }), ce(() => ({
    getState: () => u.current,
    subscribe: (f) => (a.add(f), () => a.delete(f)),
    render: (f) => {
      const p = r.element !== f;
      r.element = f, r.onRender(p) && n(f);
    },
    unmount: r.onUnmount
  }), []);
}), Dg = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (p) => i ? p : (i = !0, ll(() => {
      p && (a = cs(f, u)), !d.isDirty && ds(f, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, us(f);
    }
  }, d = new Lg(() => {
    a = cs(f, u), !(d.isDirty || !i) && ds(f, a);
  }), f = qi(zg, () => d.markDirty());
  return ll(() => {
    d.markDirty();
  }), a.state;
}, os = /* @__PURE__ */ Symbol("tap.Context"), Cf = (r) => ({
  [os]: r
}), Rf = (r, n, i) => {
  const a = r[os];
  r[os] = n;
  try {
    return i();
  } finally {
    r[os] = a;
  }
}, If = (r) => r[os], $d = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (v, w) => {
    const b = typeof v == "function" ? v(n) : v;
    if (!Object.is(b, n)) {
      const S = n;
      n = w ?? (typeof b != "object" || b === null) ? b : Object.assign({}, n, b), i.forEach((I) => I(n, S));
    }
  }, u = () => n, p = { setState: a, getState: u, getInitialState: () => m, subscribe: (v) => (i.add(v), () => i.delete(v)) }, m = n = r(a, u, p);
  return p;
}, Fg = ((r) => r ? $d(r) : $d), Bg = (r) => r;
function Ug(r, n = Bg) {
  const i = Kt.useSyncExternalStore(
    r.subscribe,
    Kt.useCallback(() => n(r.getState()), [r, n]),
    Kt.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return Kt.useDebugValue(i), i;
}
const Hd = (r) => {
  const n = Fg(r), i = (a) => Ug(n, a);
  return Object.assign(i, n), i;
}, $g = ((r) => r ? Hd(r) : Hd);
function Vd(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function Mf(...r) {
  return (n) => {
    let i = !1;
    const a = r.map((u) => {
      const d = Vd(u, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : Vd(r[u], null);
        }
      };
  };
}
function Ki(...r) {
  return C.useCallback(Mf(...r), r);
}
const Af = be((r) => {
  const n = ce(() => Dg(r, { mount: !1 }), [r.type]);
  return Xe(() => {
    n.render(r);
  }), n;
});
class Hg {
  ref;
  constructor(n) {
    this.ref = n;
  }
  get(n, i) {
    return this.ref.current[i];
  }
  ownKeys() {
    return Object.keys(this.ref.current);
  }
  has(n, i) {
    return i in this.ref.current;
  }
  getOwnPropertyDescriptor(n, i) {
    return Object.getOwnPropertyDescriptor(this.ref.current, i);
  }
  set() {
    return !1;
  }
  setPrototypeOf() {
    return !1;
  }
  defineProperty() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  preventExtensions() {
    return !1;
  }
}
const At = (r, n) => {
  const i = pr(r);
  Xe(() => {
    i.current = r;
  });
  const a = ce(() => new Proxy({}, new Hg(i)), []), u = n?.key, d = r.getState();
  return ce(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, Bi = be((r) => {
  const n = pr(r.get);
  return Xe(() => {
    n.current = r.get;
  }), ce(() => qe({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), Vg = be((r) => {
  const n = is(r.scopeElement);
  return ce(() => [r.fieldName, n], [r.fieldName, n]);
}), Wg = be((r) => {
  const { on: n, subscribe: i, ...a } = r, u = pr({ on: n, subscribe: i });
  Xe(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = bf(a, (f, p) => Vg({
    fieldName: p,
    scopeElement: f
  }), []);
  return ce(() => {
    const f = Object.fromEntries(Object.values(d)), { on: p, subscribe: m } = u.current;
    return p && (f.on = (v, w) => p(v, w)), m && (f.subscribe = (v) => m(v)), f;
  }, [d]);
}), Nf = Cf(null), Qg = (r, n) => Rf(Nf, r, n), Pf = () => {
  const r = If(Nf);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, Yg = be(({ toolkit: r }) => {
  const [n, i] = Dt(() => ({
    tools: {}
  })), a = Pf();
  Xe(() => {
    if (!r)
      return;
    const d = [];
    for (const [m, v] of Object.entries(r))
      v.render && d.push(u(m, v.render));
    const f = Object.entries(r).reduce((m, [v, w]) => {
      const { render: b, ...S } = w;
      return m[v] = S, m;
    }, {}), p = {
      getModelContext: () => ({
        tools: f
      })
    };
    return d.push(a.register(p)), () => {
      d.forEach((m) => m());
    };
  }, [r, a]);
  const u = (d, f) => (i((p) => ({
    ...p,
    tools: {
      ...p.tools,
      [d]: [...p.tools[d] ?? [], f]
    }
  })), () => {
    i((p) => ({
      ...p,
      tools: {
        ...p.tools,
        [d]: p.tools[d]?.filter((m) => m !== f) ?? []
      }
    }));
  });
  return At({
    getState: () => n,
    setToolUI: u
  });
}), qg = be(() => ce(() => {
  const n = /* @__PURE__ */ new Map();
  return {
    on: (i, a) => {
      n.has(i) || n.set(i, /* @__PURE__ */ new Set());
      const u = n.get(i);
      return u.add(a), () => {
        u.delete(a), u.size === 0 && n.delete(i);
      };
    },
    emit: (i, a) => {
      const u = n.get(i), d = n.get("*");
      !u && !d || queueMicrotask(() => {
        if (u)
          for (const f of u)
            f(a);
        if (d)
          for (const f of d)
            f({ event: i, payload: a });
      });
    }
  };
}, [])), jf = Cf(null), Gg = (r, n) => Rf(jf, r, n), _l = () => {
  const r = If(jf);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, Kg = be(() => {
  const [r] = Dt(() => ({})), n = new ff();
  return At({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), Jg = be(({ threads: r, modelContext: n, tools: i }) => {
  const a = Ft(qg()), { threads: u, tools: d, modelContext: f } = Gg(a, () => {
    const m = is(n ?? Kg(), [n]);
    return Qg(m.api, () => ({
      modelContext: m,
      tools: is(i ?? Yg({}), [i]),
      threads: is(r, [r])
    }));
  }), p = ce(() => ({
    threads: u.state,
    tools: d.state,
    modelContext: f.state
  }), [u.state, d.state, f.state]);
  return At({
    getState: () => p,
    threads: u.api,
    tools: d.api,
    modelContext: f.api,
    on: a.on
  });
}), Xg = (r) => {
  const n = () => r.getState().api.threads.item("main");
  return {
    threads: qe({
      source: "root",
      query: {},
      get: () => r.getState().api.threads
    }),
    tools: qe({
      source: "root",
      query: {},
      get: () => r.getState().api.tools
    }),
    modelContext: qe({
      source: "root",
      query: {},
      get: () => r.getState().api.modelContext
    }),
    thread: qe({
      source: "threads",
      query: { type: "main" },
      get: () => r.getState().api.threads.thread("main")
    }),
    threadListItem: qe({
      source: "threads",
      query: { type: "main" },
      get: () => n()
    }),
    composer: qe({
      source: "thread",
      query: {},
      get: () => r.getState().api.threads.thread("main").composer
    }),
    on(i, a) {
      const { event: u, scope: d } = Gi(i);
      if (d === "*")
        return r.getState().api.on(u, a);
      if (ss("thread", d) || ss("thread-list-item", d) || ss("composer", d))
        return r.getState().api.on(u, (f) => {
          f.threadId === n().getState().id && a(f);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, Zg = (r) => {
  const n = wl(), i = vl(Af(Jg(r))), a = C.useMemo(() => Xg(i), [i]);
  return C.useMemo(() => Of(n, a), [n, a]);
}, qe = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, Ui = () => () => {
}, Lf = C.createContext({
  threads: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Threads is only available inside <AssistantProvider />");
    }
  }),
  tools: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Tools is only available inside <AssistantProvider />");
    }
  }),
  modelContext: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("ModelContext is only available inside <AssistantProvider />");
    }
  }),
  threadListItem: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("ThreadListItem is only available inside <AssistantProvider />");
    }
  }),
  thread: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Thread is only available inside <AssistantProvider />");
    }
  }),
  composer: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Composer is only available inside <AssistantProvider />");
    }
  }),
  message: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Message is only available inside <ThreadPrimitive.Messages />");
    }
  }),
  part: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Part is only available inside <MessagePrimitive.Parts />");
    }
  }),
  attachment: qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Attachment is only available inside <MessagePrimitive.Attachments /> or <ComposerPrimitive.Attachments />");
    }
  }),
  subscribe: Ui,
  on: (r) => {
    const { scope: n } = Gi(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), wl = () => C.useContext(Lf), Sl = (r) => {
  const n = wl(), i = vl(Wg(r));
  return C.useMemo(() => Of(n, i), [n, i]);
}, ey = (r) => Zg(r);
function _t(r) {
  return r ? ey(r) : wl();
}
const ty = (r, n) => r === Ui ? n : n === Ui ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, Of = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: ty(r.subscribe, i ?? Ui)
  };
}, Ji = ({ api: r, children: n, devToolsVisible: i = !0 }) => (C.useEffect(() => {
  if (!(!i || !r.subscribe))
    return jn.register(r);
}, [r, i]), g.jsx(Lf.Provider, { value: r, children: n }));
class Wd {
  #e;
  constructor(n) {
    this.#e = n;
  }
  get threads() {
    return this.#e.threads().getState();
  }
  get tools() {
    return this.#e.tools().getState();
  }
  get threadListItem() {
    return this.#e.threadListItem().getState();
  }
  get thread() {
    return this.#e.thread().getState();
  }
  get composer() {
    return this.#e.composer().getState();
  }
  get message() {
    return this.#e.message().getState();
  }
  get part() {
    return this.#e.part().getState();
  }
  get attachment() {
    return this.#e.attachment().getState();
  }
}
const ve = (r) => {
  const n = _t(), i = C.useMemo(() => new Wd(n), [n]), a = C.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (C.useDebugValue(a), a instanceof Wd)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, tl = (r, n) => {
  const i = _t(), a = C.useRef(n);
  C.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = Gi(r);
  C.useEffect(() => i.on({ scope: u, event: d }, (f) => a.current(f)), [i, u, d]);
};
function ny(r, n) {
  function i(a) {
    const u = C.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function zf(r, n) {
  function i(u) {
    const d = r(u);
    return d ? d[n] : null;
  }
  function a(u) {
    let d = !1, f;
    typeof u == "function" ? f = u : u && typeof u == "object" && (d = !!u.optional, f = u.selector);
    const p = i({
      optional: d
    });
    return p ? f ? p(f) : p() : null;
  }
  return {
    [n]: a,
    [`${n}Store`]: i
  };
}
const Df = C.createContext(null), ry = ny(Df, "ThreadPrimitive.Viewport"), { useThreadViewport: $i, useThreadViewportStore: xl } = zf(ry, "useThreadViewport"), sy = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function iy(r, n = oy) {
  sy(r);
  const i = C.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return C.useDebugValue(i), i;
}
const oy = (r) => r;
function ay(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? iy(d, u) : null;
  }
  return n;
}
function ly(r) {
  const n = _t(), i = ve(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const Rt = ay(ly), zn = (r) => {
  const [, n] = Dt(r.getState);
  return Xe(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, uy = be(({ runtime: r }) => {
  const n = zn(r), i = _l();
  return Xe(() => {
    const a = [], u = [
      "switched-to",
      "switched-away"
    ];
    for (const d of u) {
      const f = r.unstable_on(d, () => {
        i.emit(`thread-list-item.${d}`, {
          threadId: r.getState().id
        });
      });
      a.push(f);
    }
    return () => {
      for (const d of a)
        d();
    };
  }, [r, i]), At({
    getState: () => n,
    switchTo: r.switchTo,
    rename: r.rename,
    archive: r.archive,
    unarchive: r.unarchive,
    delete: r.delete,
    generateTitle: r.generateTitle,
    initialize: r.initialize,
    detach: r.detach,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), fs = (r) => {
  const n = ce(() => Object.fromEntries(r), [r]), i = bf(n, (d) => d, []), a = ce(() => Object.keys(i), [i]);
  return {
    state: ce(() => {
      const d = new Array(a.length);
      for (let f = 0; f < a.length; f++)
        d[f] = i[a[f]].state;
      return d;
    }, [a, i]),
    api: (d) => {
      const f = "index" in d ? i[a[d.index]]?.api : i[d.key]?.api;
      if (!f)
        throw new Error(`tapLookupResources: Resource not found for lookup: ${JSON.stringify(d)}`);
      return f;
    }
  };
}, Ff = be(({ runtime: r }) => {
  const n = zn(r);
  return At({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), cy = be(({ runtime: r, index: n }) => {
  const i = ce(() => r.getAttachmentByIndex(n), [r, n]);
  return Ft(Ff({
    runtime: i
  }));
}), Bf = be(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = zn(i), u = _l();
  Xe(() => {
    const p = [], m = [
      "send",
      "attachment-add"
    ];
    for (const v of m) {
      const w = i.unstable_on(v, () => {
        u.emit(`composer.${v}`, {
          threadId: r.current,
          ...n && { messageId: n.current }
        });
      });
      p.push(w);
    }
    return () => {
      for (const v of p)
        v();
    };
  }, [i, u, r, n]);
  const d = fs(a.attachments.map((p, m) => [
    p.id,
    cy({ runtime: i, index: m })
  ])), f = ce(() => ({
    text: a.text,
    role: a.role,
    attachments: d.state,
    runConfig: a.runConfig,
    isEditing: a.isEditing,
    canCancel: a.canCancel,
    attachmentAccept: a.attachmentAccept,
    isEmpty: a.isEmpty,
    type: a.type ?? "thread",
    dictation: a.dictation
  }), [a, d.state]);
  return At({
    getState: () => f,
    setText: i.setText,
    setRole: i.setRole,
    setRunConfig: i.setRunConfig,
    addAttachment: i.addAttachment,
    reset: i.reset,
    clearAttachments: i.clearAttachments,
    send: i.send,
    cancel: i.cancel,
    beginEdit: i.beginEdit ?? (() => {
      throw new Error("beginEdit is not supported in this runtime");
    }),
    startDictation: i.startDictation,
    stopDictation: i.stopDictation,
    attachment: (p) => "id" in p ? d.api({ key: p.id }) : d.api(p),
    __internal_getRuntime: () => i
  });
}), dy = be(({ runtime: r }) => {
  const n = zn(r);
  return At({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), fy = be(({ runtime: r, index: n }) => {
  const i = ce(() => r.getAttachmentByIndex(n), [r, n]);
  return Ft(Ff({ runtime: i }));
}), hy = be(({ runtime: r, index: n }) => {
  const i = ce(() => r.getMessagePartByIndex(n), [r, n]);
  return Ft(dy({ runtime: i }));
}), py = be(({ runtime: r, threadIdRef: n }) => {
  const i = zn(r), [a, u] = Dt(!1), [d, f] = Dt(!1), p = ce(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), m = Ft(Bf({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: p
  })), v = fs(i.content.map((S, I) => [
    "toolCallId" in S && S.toolCallId != null ? `toolCallId-${S.toolCallId}` : `index-${I}`,
    hy({ runtime: r, index: I })
  ])), w = fs(i.attachments?.map((S, I) => [
    S.id,
    fy({ runtime: r, index: I })
  ]) ?? []), b = ce(() => ({
    ...i,
    parts: v.state,
    composer: m.state,
    isCopied: a,
    isHovering: d
  }), [
    i,
    v.state,
    m.state,
    a,
    d
  ]);
  return At({
    getState: () => b,
    composer: m.api,
    reload: (S) => r.reload(S),
    speak: () => r.speak(),
    stopSpeaking: () => r.stopSpeaking(),
    submitFeedback: (S) => r.submitFeedback(S),
    switchToBranch: (S) => r.switchToBranch(S),
    getCopyText: () => r.unstable_getCopyText(),
    part: (S) => "index" in S ? v.api({ index: S.index }) : v.api({ key: `toolCallId-${S.toolCallId}` }),
    attachment: (S) => "id" in S ? w.api({ key: S.id }) : w.api(S),
    setIsCopied: u,
    setIsHovering: f,
    __internal_getRuntime: () => r
  }, {
    key: i.id
  });
}), my = be(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = ce(() => r.getMessageById(n), [r, n]);
  return Ft(py({ runtime: a, threadIdRef: i }));
}), gy = be(({ runtime: r }) => {
  const n = zn(r), i = _l();
  Xe(() => {
    const p = [], m = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const v of m) {
      const w = r.unstable_on(v, () => {
        const b = r.getState()?.threadId || "unknown";
        i.emit(`thread.${v}`, {
          threadId: b
        });
      });
      p.push(w);
    }
    return () => {
      for (const v of p)
        v();
    };
  }, [r]);
  const a = ce(() => ({
    get current() {
      return r.getState().threadId;
    }
  }), [r]), u = Ft(Bf({
    runtime: r.composer,
    threadIdRef: a
  })), d = fs(n.messages.map((p) => [
    p.id,
    my({ runtime: r, id: p.id, threadIdRef: a })
  ])), f = ce(() => ({
    isEmpty: d.state.length === 0 && !n.isLoading,
    isDisabled: n.isDisabled,
    isLoading: n.isLoading,
    isRunning: n.isRunning,
    capabilities: n.capabilities,
    state: n.state,
    suggestions: n.suggestions,
    extras: n.extras,
    speech: n.speech,
    composer: u.state,
    messages: d.state
  }), [n, d, u.state]);
  return At({
    getState: () => f,
    composer: u.api,
    append: r.append,
    startRun: r.startRun,
    unstable_resumeRun: r.unstable_resumeRun,
    cancelRun: r.cancelRun,
    getModelContext: r.getModelContext,
    export: r.export,
    import: r.import,
    reset: r.reset,
    stopSpeaking: r.stopSpeaking,
    startVoice: async () => {
      throw new Error("startVoice is not supported in this runtime");
    },
    stopVoice: async () => {
      throw new Error("stopVoice is not supported in this runtime");
    },
    message: (p) => "id" in p ? d.api({ key: p.id }) : d.api(p),
    __internal_getRuntime: () => r
  });
}), yy = be(({ runtime: r, id: n }) => {
  const i = ce(() => r.getItemById(n), [r, n]);
  return Ft(uy({
    runtime: i
  }));
}), vy = be(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = zn(r), a = Ft(gy({
    runtime: r.main
  })), u = fs(Object.keys(i.threadItems).map((f) => [
    f,
    yy({ runtime: r, id: f })
  ])), d = ce(() => ({
    mainThreadId: i.mainThreadId,
    newThreadId: i.newThread ?? null,
    isLoading: i.isLoading,
    threadIds: i.threads,
    archivedThreadIds: i.archivedThreads,
    threadItems: u.state,
    main: a.state
  }), [i, u.state, a.state]);
  return At({
    getState: () => d,
    thread: () => a.api,
    item: (f) => {
      if (f === "main")
        return u.api({ key: d.mainThreadId });
      if ("id" in f)
        return u.api({ key: f.id });
      const { index: p, archived: m = !1 } = f, v = m ? d.archivedThreadIds[p] : d.threadIds[p];
      return u.api({ key: v });
    },
    switchToThread: (f) => {
      r.switchToThread(f);
    },
    switchToNewThread: () => {
      r.switchToNewThread();
    },
    __internal_getAssistantRuntime: () => n
  });
}), _y = be((r) => {
  const n = Pf();
  return Xe(() => r.registerModelContextProvider(n), [r, n]), Ft(vy({
    runtime: r.threads,
    __internal_assistantRuntime: r
  }));
}), nl = (r) => {
  const n = /* @__PURE__ */ new Map(), i = () => {
    let a = 0;
    for (const u of n.values())
      a += u;
    r(a);
  };
  return {
    register: () => {
      const a = /* @__PURE__ */ Symbol();
      return n.set(a, 0), {
        setHeight: (u) => {
          n.get(a) !== u && (n.set(a, u), i());
        },
        unregister: () => {
          n.delete(a), i();
        }
      };
    }
  };
}, wy = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = nl((f) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: f
      }
    });
  }), a = nl((f) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: f
      }
    });
  }), u = nl((f) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: f
      }
    });
  }), d = $g(() => ({
    isAtBottom: !0,
    scrollToBottom: ({ behavior: f = "auto" } = {}) => {
      for (const p of n)
        p({ behavior: f });
    },
    onScrollToBottom: (f) => (n.add(f), () => {
      n.delete(f);
    }),
    turnAnchor: r.turnAnchor ?? "bottom",
    height: {
      viewport: 0,
      inset: 0,
      userMessage: 0
    },
    registerViewport: i.register,
    registerContentInset: a.register,
    registerUserMessageHeight: u.register
  }));
  return d;
}, hs = (r) => r, Sy = (r) => {
  const n = xl({ optional: !0 }), [i] = C.useState(() => wy(r));
  return C.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), C.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && hs(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), C.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && hs(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, Uf = ({ children: r, options: n = {} }) => {
  const i = Sy(n), [a] = C.useState(() => ({
    useThreadViewport: i
  }));
  return g.jsx(Df.Provider, { value: a, children: r });
}, xy = (r) => r._core?.RenderComponent, ky = ({ children: r, runtime: n }) => {
  const i = _t({
    threads: _y(n)
  }), a = xy(n);
  return g.jsxs(Ji, { api: i, children: [a && g.jsx(a, {}), g.jsx(Uf, { children: r })] });
}, Ey = C.memo(ky), by = ({ index: r, children: n }) => {
  const i = _t(), a = Sl({
    message: Bi({
      source: "thread",
      query: { type: "index", index: r },
      get: () => i.thread().message({ index: r })
    }),
    composer: Bi({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: r }).composer
    }),
    on(u, d) {
      const f = () => i.thread().message({ index: r }), { event: p, scope: m } = Gi(u);
      return !ss("composer", m) && !ss("message", m) ? i.on(u, d) : i.on({ scope: "thread", event: p }, (v) => {
        v.messageId === f().getState().id && d(v);
      });
    }
  });
  return g.jsx(Ji, { api: a, children: n });
}, Ty = ({ index: r, children: n }) => {
  const i = _t(), a = Sl({
    part: Bi({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return g.jsx(Ji, { api: a, children: n });
}, Cy = be(({ text: r, isRunning: n }) => {
  const i = ce(() => ({
    type: "text",
    text: r,
    status: n ? { type: "running" } : { type: "complete" }
  }), [r, n]);
  return At({
    getState: () => i,
    addToolResult: () => {
      throw new Error("Not supported");
    },
    resumeToolCall: () => {
      throw new Error("Not supported");
    }
  });
}), Ry = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = vl(Af(Cy({ text: r, isRunning: n }))), u = Sl({
    part: Bi({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return g.jsx(Ji, { api: u, children: i });
};
class Iy {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new fg(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.switchToNewThread = this.switchToNewThread.bind(this), this.switchToThread = this.switchToThread.bind(this), this.registerModelContextProvider = this.registerModelContextProvider.bind(this), this.registerModelConfigProvider = this.registerModelConfigProvider.bind(this), this.reset = this.reset.bind(this);
  }
  get thread() {
    return this._thread;
  }
  switchToNewThread() {
    return this._core.threads.switchToNewThread();
  }
  switchToThread(n) {
    return this._core.threads.switchToThread(n);
  }
  registerModelContextProvider(n) {
    return this._core.registerModelContextProvider(n);
  }
  registerModelConfigProvider(n) {
    return this.registerModelContextProvider(n);
  }
  reset({ initialMessages: n } = {}) {
    return this._core.threads.getMainThreadRuntimeCore().import(ml.fromArray(n ?? []));
  }
}
function Xi(r) {
  const n = C.useRef(r);
  return C.useEffect(() => {
    n.current = r;
  }), C.useMemo(() => (...i) => n.current?.(...i), []);
}
const My = C.createContext(null);
function Ay(r) {
  const n = C.useContext(My);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: _w, useSmoothStatusStore: Ny } = zf(Ay, "useSmoothStatus");
class Py {
  currentText;
  setText;
  animationFrameId = null;
  lastUpdateTime = Date.now();
  targetText = "";
  constructor(n, i) {
    this.currentText = n, this.setText = i;
  }
  start() {
    this.animationFrameId === null && (this.lastUpdateTime = Date.now(), this.animate());
  }
  stop() {
    this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null);
  }
  animate = () => {
    const n = Date.now();
    let a = n - this.lastUpdateTime;
    const u = this.targetText.length - this.currentText.length, d = Math.min(5, 250 / u);
    let f = 0;
    for (; a >= d && f < u; )
      f++, a -= d;
    f !== u ? this.animationFrameId = requestAnimationFrame(this.animate) : this.animationFrameId = null, f !== 0 && (this.currentText = this.targetText.slice(0, this.currentText.length + f), this.lastUpdateTime = n - a, this.setText(this.currentText));
  };
}
const rl = Object.freeze({
  type: "running"
}), jy = (r, n = !1) => {
  const { text: i } = r, a = ve(({ message: w }) => w.id), u = C.useRef(a), [d, f] = C.useState(i), p = Ny({ optional: !0 }), m = Xi((w) => {
    if (f(w), p) {
      const b = d !== w || r.status.type === "running" ? rl : r.status;
      hs(p).setState(b, !0);
    }
  });
  C.useEffect(() => {
    if (p) {
      const w = n && (d !== i || r.status.type === "running") ? rl : r.status;
      hs(p).setState(w, !0);
    }
  }, [p, n, i, d, r.status]);
  const [v] = C.useState(new Py(i, m));
  return C.useEffect(() => {
    if (!n) {
      v.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(v.targetText)) {
      u.current = a, m(i), v.currentText = i, v.targetText = i, v.stop();
      return;
    }
    v.targetText = i, v.start();
  }, [m, v, a, n, i]), C.useEffect(() => () => {
    v.stop();
  }, [v]), C.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : rl
  } : r, [n, d, r, i]);
};
var Ly = /* @__PURE__ */ Symbol.for("react.lazy"), Hi = Tm[" use ".trim().toString()];
function Oy(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function $f(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === Ly && "_payload" in r && Oy(r._payload);
}
// @__NO_SIDE_EFFECTS__
function Hf(r) {
  const n = /* @__PURE__ */ zy(r), i = C.forwardRef((a, u) => {
    let { children: d, ...f } = a;
    $f(d) && typeof Hi == "function" && (d = Hi(d._payload));
    const p = C.Children.toArray(d), m = p.find(Fy);
    if (m) {
      const v = m.props.children, w = p.map((b) => b === m ? C.Children.count(v) > 1 ? C.Children.only(null) : C.isValidElement(v) ? v.props.children : null : b);
      return /* @__PURE__ */ g.jsx(n, { ...f, ref: u, children: C.isValidElement(v) ? C.cloneElement(v, void 0, w) : null });
    }
    return /* @__PURE__ */ g.jsx(n, { ...f, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var Vf = /* @__PURE__ */ Hf("Slot");
// @__NO_SIDE_EFFECTS__
function zy(r) {
  const n = C.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if ($f(u) && typeof Hi == "function" && (u = Hi(u._payload)), C.isValidElement(u)) {
      const f = Uy(u), p = By(d, u.props);
      return u.type !== C.Fragment && (p.ref = a ? Mf(a, f) : f), C.cloneElement(u, p);
    }
    return C.Children.count(u) > 1 ? C.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var Dy = /* @__PURE__ */ Symbol("radix.slottable");
function Fy(r) {
  return C.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === Dy;
}
function By(r, n) {
  const i = { ...n };
  for (const a in n) {
    const u = r[a], d = n[a];
    /^on[A-Z]/.test(a) ? u && d ? i[a] = (...p) => {
      const m = d(...p);
      return u(...p), m;
    } : u && (i[a] = u) : a === "style" ? i[a] = { ...u, ...d } : a === "className" && (i[a] = [u, d].filter(Boolean).join(" "));
  }
  return { ...r, ...i };
}
function Uy(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var $y = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], gr = $y.reduce((r, n) => {
  const i = /* @__PURE__ */ Hf(`Primitive.${n}`), a = C.forwardRef((u, d) => {
    const { asChild: f, ...p } = u, m = f ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g.jsx(m, { ...p, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function as(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const kl = (r, n, i = []) => {
  const a = C.forwardRef((u, d) => {
    const f = {}, p = {};
    Object.keys(u).forEach((v) => {
      i.includes(v) ? f[v] = u[v] : p[v] = u[v];
    });
    const m = n(f) ?? void 0;
    return g.jsx(gr.button, { type: "button", ...p, ref: d, disabled: p.disabled || !m, onClick: as(p.onClick, m) });
  });
  return a.displayName = r, a;
};
function Hy(r, n = globalThis?.document) {
  const i = Xi(r);
  C.useEffect(() => {
    const a = (u) => {
      u.key === "Escape" && i(u);
    };
    return n.addEventListener("keydown", a, { capture: !0 }), () => n.removeEventListener("keydown", a, { capture: !0 });
  }, [i, n]);
}
const _s = (r) => {
  const n = C.useRef(void 0);
  return C.useCallback((a) => {
    n.current && n.current(), a && (n.current = r(a));
  }, [r]);
}, Wf = (r, n) => {
  const i = C.useCallback((a) => {
    if (!r)
      return;
    const u = r(), d = () => {
      const p = n ? n(a) : a.offsetHeight;
      u.setHeight(p);
    }, f = new ResizeObserver(d);
    return f.observe(a), d(), () => {
      f.disconnect(), u.unregister();
    };
  }, [r, n]);
  return _s(i);
}, Qd = C.createContext(!1), Yd = (r, n) => {
  const i = r.match(/^([\d.]+)(em|px|rem)$/);
  if (!i)
    return 0;
  const a = parseFloat(i[1]), u = i[2];
  if (u === "px")
    return a;
  if (u === "em") {
    const d = parseFloat(getComputedStyle(n).fontSize) || 16;
    return a * d;
  }
  if (u === "rem") {
    const d = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return a * d;
  }
  return 0;
}, Qf = ({ children: r, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const a = ve(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: m, message: v }) => v.isLast && v.role === "assistant" && v.index >= 1 && m.messages.at(v.index - 1)?.role === "user"
  ), u = xl({ optional: !0 }), d = C.useContext(Qd), f = C.useCallback((m) => {
    if (!u || d)
      return;
    const v = () => {
      const w = u.getState();
      if (w.turnAnchor === "top" && a) {
        const { viewport: b, inset: S, userMessage: I } = w.height, P = Yd(n, m), j = Yd(i, m), z = I <= P ? I : j, J = Math.max(0, b - S - z);
        m.style.minHeight = `${J}px`, m.style.flexShrink = "0", m.style.transition = "min-height 0s";
      } else
        m.style.minHeight = "", m.style.flexShrink = "", m.style.transition = "";
    };
    return v(), u.subscribe(v);
  }, [
    u,
    a,
    d,
    n,
    i
  ]), p = _s(f);
  return g.jsx(Qd.Provider, { value: !0, children: g.jsx(Vf, { ref: p, children: r }) });
};
Qf.displayName = "ThreadPrimitive.ViewportSlack";
const Vy = () => {
  const r = _t(), n = ve(() => r.message()), i = C.useCallback((a) => {
    const u = () => {
      n.setIsHovering(!0);
    }, d = () => {
      n.setIsHovering(!1);
    };
    return a.addEventListener("mouseenter", u), a.addEventListener("mouseleave", d), a.matches(":hover") && queueMicrotask(() => n.setIsHovering(!0)), () => {
      a.removeEventListener("mouseenter", u), a.removeEventListener("mouseleave", d), n.setIsHovering(!1);
    };
  }, [n]);
  return _s(i);
}, Wy = () => {
  const r = $i((u) => u.turnAnchor), n = $i((u) => u.registerUserMessageHeight), i = ve(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = C.useCallback((u) => u.offsetHeight, []);
  return Wf(i ? n : null, a);
}, El = C.forwardRef((r, n) => {
  const i = Vy(), a = Wy(), u = Ki(n, i, a);
  return g.jsx(Qf, { children: g.jsx(gr.div, { ...r, ref: u }) });
});
El.displayName = "MessagePrimitive.Root";
const Qy = () => ve(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), Yf = C.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = jy(Qy(), r);
  return g.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
Yf.displayName = "MessagePartPrimitive.Text";
const Yy = () => ve(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), qf = C.forwardRef((r, n) => {
  const { image: i } = Yy();
  return g.jsx(gr.img, { src: i, ...r, ref: n });
});
qf.displayName = "MessagePartPrimitive.Image";
const Gf = ({ children: r }) => ve(({ part: i }) => i.status.type === "running") ? r : null;
Gf.displayName = "MessagePartPrimitive.InProgress";
const qd = (r) => Symbol.iterator in r, Gd = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), Kd = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, qy = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function Gy(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : qd(r) && qd(n) ? Gd(r) && Gd(n) ? Kd(r, n) : qy(r, n) : Kd(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function Ky(r) {
  const n = Kt.useRef(void 0);
  return (i) => {
    const a = r(i);
    return Gy(n.current, a) ? n.current : n.current = a;
  };
}
const Jd = (r) => {
  let n = -1;
  return {
    startGroup: (i) => {
      n === -1 && (n = i);
    },
    endGroup: (i, a) => {
      n !== -1 && (a.push({
        type: r,
        startIndex: n,
        endIndex: i
      }), n = -1);
    },
    finalize: (i, a) => {
      n !== -1 && a.push({
        type: r,
        startIndex: n,
        endIndex: i
      });
    }
  };
}, Jy = (r) => {
  const n = [], i = Jd("toolGroup"), a = Jd("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, Xy = () => {
  const r = ve(Ky((n) => n.message.parts.map((i) => i.type)));
  return C.useMemo(() => r.length === 0 ? [] : Jy(r), [r]);
}, Zy = ({ Fallback: r, ...n }) => {
  const i = ve(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? g.jsx(i, { ...n }) : null;
}, Gt = {
  Text: () => g.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [g.jsx(Yf, {}), g.jsx(Gf, { children: g.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => g.jsx(qf, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, ev = ({ components: { Text: r = Gt.Text, Reasoning: n = Gt.Reasoning, Image: i = Gt.Image, Source: a = Gt.Source, File: u = Gt.File, Unstable_Audio: d = Gt.Unstable_Audio, tools: f = {} } = {} }) => {
  const p = _t(), m = ve(({ part: w }) => w), v = m.type;
  if (v === "tool-call") {
    const w = p.part().addToolResult, b = p.part().resumeToolCall;
    if ("Override" in f)
      return g.jsx(f.Override, { ...m, addResult: w, resume: b });
    const S = f.by_name?.[m.toolName] ?? f.Fallback;
    return g.jsx(Zy, { ...m, Fallback: S, addResult: w, resume: b });
  }
  if (m.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (v) {
    case "text":
      return g.jsx(r, { ...m });
    case "reasoning":
      return g.jsx(n, { ...m });
    case "source":
      return g.jsx(a, { ...m });
    case "image":
      return g.jsx(i, { ...m });
    case "file":
      return g.jsx(u, { ...m });
    case "audio":
      return g.jsx(d, { ...m });
    case "data":
      return null;
    default:
      const w = v;
      throw new Error(`Unknown message part type: ${w}`);
  }
}, zi = C.memo(({ index: r, components: n }) => g.jsx(Ty, { index: r, children: g.jsx(ev, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
zi.displayName = "MessagePrimitive.PartByIndex";
const tv = ({ status: r, component: n }) => g.jsx(Ry, { text: "", isRunning: r.type === "running", children: g.jsx(n, { type: "text", text: "", status: r }) }), nv = Object.freeze({
  type: "complete"
}), rv = ({ components: r }) => {
  const n = ve((i) => i.message.status ?? nv);
  return r?.Empty ? g.jsx(r.Empty, { status: n }) : g.jsx(tv, { status: n, component: r?.Text ?? Gt.Text });
}, sv = C.memo(rv, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), bl = ({ components: r }) => {
  const n = ve(({ message: u }) => u.parts.length), i = Xy(), a = C.useMemo(() => n === 0 ? g.jsx(sv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return g.jsx(zi, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? Gt.ToolGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (f, p) => g.jsx(zi, { index: u.startIndex + p, components: r }, p)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? Gt.ReasoningGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (f, p) => g.jsx(zi, { index: u.startIndex + p, components: r }, p)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return g.jsx(g.Fragment, { children: a });
};
bl.displayName = "MessagePrimitive.Parts";
const Kf = ({ children: r }) => ve(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
Kf.displayName = "MessagePrimitive.Error";
const Jf = () => {
  const r = _t(), n = ve((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = C.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, iv = kl("ComposerPrimitive.Send", Jf), Xf = C.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = Jf(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return g.jsx(gr.form, { ...n, ref: i, onSubmit: as(r, u) });
});
Xf.displayName = "ComposerPrimitive.Root";
function ul() {
  return ul = Object.assign ? Object.assign.bind() : function(r) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }
    return r;
  }, ul.apply(null, arguments);
}
function ov(r, n) {
  if (r == null) return {};
  var i = {};
  for (var a in r) if ({}.hasOwnProperty.call(r, a)) {
    if (n.indexOf(a) !== -1) continue;
    i[a] = r[a];
  }
  return i;
}
var av = C.useLayoutEffect, lv = function(n) {
  var i = Kt.useRef(n);
  return av(function() {
    i.current = n;
  }), i;
}, Xd = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, uv = function(n, i) {
  var a = Kt.useRef();
  return Kt.useCallback(function(u) {
    n.current = u, a.current && Xd(a.current, null), a.current = i, i && Xd(i, u);
  }, [i]);
}, Zd = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0",
  display: "block"
}, cv = function(n) {
  Object.keys(Zd).forEach(function(i) {
    n.style.setProperty(i, Zd[i], "important");
  });
}, ef = cv, Je = null, tf = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function dv(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), Je || (Je = document.createElement("textarea"), Je.setAttribute("tabindex", "-1"), Je.setAttribute("aria-hidden", "true"), ef(Je)), Je.parentNode === null && document.body.appendChild(Je);
  var u = r.paddingSize, d = r.borderSize, f = r.sizingStyle, p = f.boxSizing;
  Object.keys(f).forEach(function(S) {
    var I = S;
    Je.style[I] = f[I];
  }), ef(Je), Je.value = n;
  var m = tf(Je, r);
  Je.value = n, m = tf(Je, r), Je.value = "x";
  var v = Je.scrollHeight - u, w = v * i;
  p === "border-box" && (w = w + u + d), m = Math.max(w, m);
  var b = v * a;
  return p === "border-box" && (b = b + u + d), m = Math.min(b, m), [m, v];
}
var nf = function() {
}, fv = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, hv = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width",
  "wordBreak",
  "wordSpacing",
  "scrollbarGutter"
], pv = !!document.documentElement.currentStyle, mv = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = fv(hv, i), u = a.boxSizing;
  if (u === "")
    return null;
  pv && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), f = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: f
  };
}, gv = mv;
function Tl(r, n, i) {
  var a = lv(i);
  C.useLayoutEffect(function() {
    var u = function(f) {
      return a.current(f);
    };
    if (r)
      return r.addEventListener(n, u), function() {
        return r.removeEventListener(n, u);
      };
  }, []);
}
var yv = function(n, i) {
  Tl(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, vv = function(n) {
  Tl(window, "resize", n);
}, _v = function(n) {
  Tl(document.fonts, "loadingdone", n);
}, wv = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], Sv = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, f = n.onChange, p = f === void 0 ? nf : f, m = n.onHeightChange, v = m === void 0 ? nf : m, w = ov(n, wv), b = w.value !== void 0, S = C.useRef(null), I = uv(S, i), P = C.useRef(0), j = C.useRef(), z = function() {
    var Z = S.current, ie = a && j.current ? j.current : gv(Z);
    if (ie) {
      j.current = ie;
      var V = dv(ie, Z.value || Z.placeholder || "x", d, u), X = V[0], re = V[1];
      P.current !== X && (P.current = X, Z.style.setProperty("height", X + "px", "important"), v(X, {
        rowHeight: re
      }));
    }
  }, J = function(Z) {
    b || z(), p(Z);
  };
  return C.useLayoutEffect(z), yv(S, function() {
    if (!b) {
      var ue = S.current.value;
      requestAnimationFrame(function() {
        var Z = S.current;
        Z && ue !== Z.value && z();
      });
    }
  }), vv(z), _v(z), /* @__PURE__ */ C.createElement("textarea", ul({}, w, {
    onChange: J,
    ref: I
  }));
}, xv = /* @__PURE__ */ C.forwardRef(Sv);
const Zf = (r) => {
  const n = Xi(r), i = $i((a) => a.onScrollToBottom);
  C.useEffect(() => i(n), [i, n]);
}, eh = C.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: f = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: m = !0, unstable_focusOnScrollToBottom: v = !0, unstable_focusOnThreadSwitched: w = !0, addAttachmentOnPaste: b = !0, ...S }, I) => {
  const P = _t(), j = ve(({ composer: Q }) => Q.isEditing ? Q.text : ""), z = n ? Vf : xv, J = ve(({ thread: Q, composer: he }) => Q.isDisabled || he.dictation?.inputDisabled) || i, ue = C.useRef(null), Z = Ki(I, ue);
  Hy((Q) => {
    if (!p || !ue.current?.contains(Q.target))
      return;
    const he = P.composer();
    he.getState().canCancel && (he.cancel(), Q.preventDefault());
  });
  const ie = (Q) => {
    J || !f || Q.nativeEvent.isComposing || Q.key === "Enter" && Q.shiftKey === !1 && (P.thread().getState().isRunning || (Q.preventDefault(), ue.current?.closest("form")?.requestSubmit()));
  }, V = async (Q) => {
    if (!b)
      return;
    const he = P.thread().getState().capabilities, Be = Array.from(Q.clipboardData?.files || []);
    if (he.attachments && Be.length > 0)
      try {
        Q.preventDefault(), await Promise.all(Be.map((Le) => P.composer().addAttachment(Le)));
      } catch (Le) {
        console.error("Error adding attachment:", Le);
      }
  }, X = r && !J, re = C.useCallback(() => {
    const Q = ue.current;
    !Q || !X || (Q.focus({ preventScroll: !0 }), Q.setSelectionRange(Q.value.length, Q.value.length));
  }, [X]);
  return C.useEffect(() => re(), [re]), Zf(() => {
    P.composer().getState().type === "thread" && v && re();
  }), C.useEffect(() => {
    if (!(P.composer().getState().type !== "thread" || !m))
      return P.on("thread.run-start", re);
  }, [m, re, P]), C.useEffect(() => {
    if (!(P.composer().getState().type !== "thread" || !w))
      return P.on("thread-list-item.switched-to", re);
  }, [w, re, P]), g.jsx(z, { name: "input", value: j, ...S, ref: Z, disabled: J, onChange: as(a, (Q) => {
    P.composer().getState().isEditing && ll(() => {
      P.composer().setText(Q.target.value);
    });
  }), onKeyDown: as(u, ie), onPaste: as(d, V) });
});
eh.displayName = "ComposerPrimitive.Input";
const kv = () => {
  const r = _t(), n = ve(({ composer: a }) => !a.canCancel), i = C.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, Ev = kl("ComposerPrimitive.Cancel", kv), th = C.forwardRef((r, n) => g.jsx(gr.div, { ...r, ref: n }));
th.displayName = "ThreadPrimitive.Root";
const bv = (r) => ve(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), cl = ({ children: r, ...n }) => bv(n) ? r : null;
cl.displayName = "ThreadPrimitive.If";
const Tv = (r) => {
  const n = Xi(r), i = C.useCallback((a) => {
    const u = new ResizeObserver(() => {
      n();
    }), d = new MutationObserver((f) => {
      f.some((m) => m.type !== "attributes" || m.attributeName !== "style") && n();
    });
    return u.observe(a), d.observe(a, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      characterData: !0
    }), () => {
      u.disconnect(), d.disconnect();
    };
  }, [n]);
  return _s(i);
}, Cv = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = C.useRef(null), d = xl();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const f = C.useRef(0), p = C.useRef(null), m = C.useCallback((I) => {
    const P = u.current;
    P && (p.current = I, P.scrollTo({ top: P.scrollHeight, behavior: I }));
  }, []), v = () => {
    const I = u.current;
    if (!I)
      return;
    const P = d.getState().isAtBottom, j = Math.abs(I.scrollHeight - I.scrollTop - I.clientHeight) < 1 || I.scrollHeight <= I.clientHeight;
    !j && f.current < I.scrollTop || (j && (p.current = null), (j || p.current === null) && j !== P && hs(d).setState({
      isAtBottom: j
    })), f.current = I.scrollTop;
  }, w = Tv(() => {
    const I = p.current;
    I ? m(I) : r && d.getState().isAtBottom && m("instant"), v();
  }), b = _s((I) => (I.addEventListener("scroll", v), () => {
    I.removeEventListener("scroll", v);
  }));
  return Zf(({ behavior: I }) => {
    m(I);
  }), tl("thread.run-start", () => {
    n && (p.current = "auto", requestAnimationFrame(() => {
      m("auto");
    }));
  }), tl("thread.initialize", () => {
    i && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), tl("thread-list-item.switched-to", () => {
    a && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), Ki(w, b, u);
}, Rv = () => {
  const r = $i((i) => i.registerViewport), n = C.useCallback((i) => i.clientHeight, []);
  return Wf(r, n);
}, nh = C.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, f) => {
  const p = Cv({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), m = Rv(), v = Ki(f, p, m);
  return g.jsx(gr.div, { ...d, ref: v, children: u });
});
nh.displayName = "ThreadPrimitive.ViewportScrollable";
const rh = C.forwardRef(({ turnAnchor: r, ...n }, i) => g.jsx(Uf, { options: { turnAnchor: r }, children: g.jsx(nh, { ...n, ref: i }) }));
rh.displayName = "ThreadPrimitive.Viewport";
const sh = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, Iv = () => null, Mv = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? Iv;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, Av = ({ components: r }) => {
  const n = ve(({ message: u }) => u.role), i = ve(({ message: u }) => u.composer.isEditing), a = Mv(r, n, i);
  return g.jsx(a, {});
}, ih = C.memo(({ index: r, components: n }) => g.jsx(by, { index: r, children: g.jsx(Av, { components: n }) }), (r, n) => r.index === n.index && sh(r.components, n.components));
ih.displayName = "ThreadPrimitive.MessageByIndex";
const oh = ({ components: r }) => {
  const n = ve(({ thread: a }) => a.messages.length);
  return C.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => g.jsx(ih, { index: u, components: r }, u)), [n, r]);
};
oh.displayName = "ThreadPrimitive.Messages";
const Nv = C.memo(oh, (r, n) => sh(r.components, n.components)), Pv = ({ prompt: r, send: n, clearComposer: i = !0, autoSend: a, method: u }) => {
  const d = _t(), f = ve(({ thread: v }) => v.isDisabled), p = n ?? a ?? !1, m = C.useCallback(() => {
    const v = d.thread().getState().isRunning;
    if (p && !v)
      d.thread().append(r), i && d.composer().setText("");
    else if (i)
      d.composer().setText(r);
    else {
      const w = d.composer().getState().text;
      d.composer().setText(w.trim() ? `${w} ${r}` : r);
    }
  }, [d, p, i, r]);
  return f ? null : m;
}, ah = kl("ThreadPrimitive.Suggestion", Pv, ["prompt", "send", "clearComposer", "autoSend", "method"]), jv = 1, vt = Object.freeze({
  product_card: "product_card",
  product_carousel: "product_carousel",
  ritual_card: "ritual_card",
  reading_summary: "reading_summary",
  collection_link: "collection_link",
  next_steps: "next_steps"
}), dt = Object.freeze({
  [vt.product_card]: "display_product_card",
  [vt.product_carousel]: "display_product_carousel",
  [vt.ritual_card]: "display_ritual_card",
  [vt.reading_summary]: "display_reading_summary",
  [vt.collection_link]: "display_collection_link",
  [vt.next_steps]: "display_next_steps"
}), Lv = Object.freeze(
  Object.fromEntries(
    Object.entries(dt).map(([r, n]) => [n, r])
  )
), lh = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, uh = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, Ov = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), Jt = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Re = (r, n = "") => typeof r != "string" ? n : r.trim() || n, Ce = (r) => Re(r) || null, ps = (r) => {
  const n = Re(r);
  return n ? /^(https?:\/\/|\/)/i.test(n) ? n : `/${n.replace(/^\/+/, "")}` : null;
}, zv = (r, n = !0) => typeof r == "boolean" ? r : n, Cl = (r, n = 6) => Array.isArray(r) ? r.map((i) => Re(typeof i == "string" ? i : i?.label || i?.title || i?.text)).filter(Boolean).slice(0, n) : [], ch = (r) => {
  if (!Jt(r))
    return null;
  const n = Re(r.title, "Untitled crystal"), i = ps(r.url);
  return {
    id: Ce(r.id || r.productId),
    handle: Ce(r.handle),
    title: n,
    url: i || (r.handle ? `/products/${r.handle}` : null),
    image: ps(r.image || r.featuredImage || r.imageUrl),
    price: Ce(r.price || r.priceText),
    compareAtPrice: Ce(r.compareAtPrice || r.compareAt),
    badge: Ce(r.badge || r.tag || r.intent || r.eyebrow),
    summary: Ce(r.summary || r.description || r.body),
    reason: Ce(r.reason),
    note: Ce(r.note || r.ritual || r.howToUse || r.how_to_use),
    ctaLabel: Ce(r.ctaLabel || r.buttonLabel || r.linkLabel),
    merchandiseId: Ce(r.merchandiseId || r.variantId),
    variantId: Ce(r.variantId || r.merchandiseId),
    available: zv(r.available, !0)
  };
}, dh = (r, n = 6) => Array.isArray(r) ? r.map(ch).filter(Boolean).slice(0, n) : [], Dv = (r) => {
  if (!Jt(r))
    return null;
  const n = ch(r.product || r);
  return n ? {
    eyebrow: Re(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: Ce(r.reason || n.reason),
    note: Ce(r.note || r.ritual || n.note),
    ctaLabel: Re(r.ctaLabel || r.buttonLabel || n.ctaLabel, "View crystal"),
    product: n
  } : null;
}, Fv = (r) => {
  if (!Jt(r))
    return null;
  const n = dh(r.products, 8);
  return n.length === 0 ? null : {
    eyebrow: Re(r.eyebrow || r.kicker, "Matched for you"),
    title: Re(r.title, "Recommended crystals"),
    reason: Ce(r.reason || r.description),
    browseUrl: ps(r.browseUrl || r.url),
    browseLabel: Re(r.browseLabel || r.ctaLabel, "Browse all"),
    products: n
  };
}, Bv = (r) => {
  if (!Jt(r))
    return null;
  const n = Cl(r.steps, 6);
  return n.length === 0 && !Re(r.summary) ? null : {
    eyebrow: Re(r.eyebrow || r.kicker, "Ritual"),
    title: Re(r.title, "How to work with this energy"),
    summary: Ce(r.summary || r.reason || r.description),
    duration: Ce(r.duration),
    steps: n,
    note: Ce(r.note),
    disclaimer: Ce(r.disclaimer),
    linkedProducts: dh(r.linkedProducts || r.products, 3)
  };
}, Uv = (r) => {
  if (!Jt(r))
    return null;
  const n = Re(r.summary || r.description);
  return n ? {
    eyebrow: Re(r.eyebrow || r.kicker, "Energy blueprint"),
    title: Re(r.title, "What your energy is asking for"),
    summary: n,
    energyFocus: Ce(r.energyFocus || r.energy || r.focus),
    highlights: Cl(r.highlights || r.bullets || r.keyPoints, 5),
    disclaimer: Ce(r.disclaimer)
  } : null;
}, $v = (r) => {
  if (!Jt(r))
    return null;
  const n = ps(r.url || r.browseUrl);
  return n ? {
    eyebrow: Re(r.eyebrow || r.kicker, "Browse deeper"),
    title: Re(r.title, "Open the full collection"),
    description: Ce(r.description || r.reason),
    url: n,
    label: Re(r.label || r.ctaLabel, "Shop collection"),
    image: ps(r.image || r.imageUrl)
  } : null;
}, Hv = (r) => {
  if (!Jt(r))
    return null;
  const n = Cl(r.steps, 5);
  return n.length === 0 ? null : {
    eyebrow: Re(r.eyebrow || r.kicker, "Next steps"),
    title: Re(r.title, "What to do next"),
    steps: n,
    closing: Ce(r.closing || r.note)
  };
}, Vv = Object.freeze({
  [vt.product_card]: {
    toolName: dt.product_card,
    normalizeProps: Dv
  },
  [vt.product_carousel]: {
    toolName: dt.product_carousel,
    normalizeProps: Fv
  },
  [vt.ritual_card]: {
    toolName: dt.ritual_card,
    normalizeProps: Bv
  },
  [vt.reading_summary]: {
    toolName: dt.reading_summary,
    normalizeProps: Uv
  },
  [vt.collection_link]: {
    toolName: dt.collection_link,
    normalizeProps: $v
  },
  [vt.next_steps]: {
    toolName: dt.next_steps,
    normalizeProps: Hv
  }
}), ms = (r, n = "component") => {
  if (!Jt(r))
    return null;
  const i = Re(
    r.component || r.componentType || Lv[r.toolName]
  ), a = Vv[i];
  if (!a)
    return null;
  const u = a.normalizeProps(
    r.props || r.result?.props || r.result || r.args?.props || r.args || r
  );
  if (!u)
    return null;
  const d = Re(r.id || r.toolCallId, `${a.toolName}-${n}`);
  return {
    type: "component",
    component: i,
    toolName: a.toolName,
    id: d,
    version: jv,
    props: u
  };
}, On = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = ms(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, Rl = (r) => {
  const n = [], i = (a, u = 0) => {
    if (u > 3 || a == null)
      return;
    if (Array.isArray(a)) {
      a.forEach((f, p) => {
        const m = ms(f, `${u}-${p}`);
        m && n.push(m);
      });
      return;
    }
    const d = ms(a, `${u}`);
    if (d) {
      n.push(d);
      return;
    }
    Jt(a) && (i(a.components, u + 1), i(a.component, u + 1), i(a.ui?.components, u + 1), i(a.payload?.components, u + 1), i(a.data?.components, u + 1), i(a.data?.ui?.components, u + 1), i(a.metadata?.components, u + 1), i(a.metadata?.ui?.components, u + 1));
  };
  return i(r), On([], n);
}, rf = (r, n = "component") => {
  const i = ms(r, n);
  if (!i)
    return null;
  const a = {
    component: i.component,
    version: i.version,
    props: i.props
  };
  return {
    type: "tool-call",
    toolCallId: i.id,
    toolName: i.toolName,
    args: a,
    argsText: JSON.stringify(a),
    result: {
      component: i.component,
      version: i.version,
      props: i.props
    }
  };
}, Wv = (r) => ms(r), fh = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}, Qv = (r = "") => {
  let n = String(r || "");
  const i = [], a = (u) => {
    const d = [...n.matchAll(u)];
    if (d.length !== 0) {
      for (const f of d) {
        const p = fh(f[1]);
        p && i.push(p);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(lh()), a(uh()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    payloads: i
  };
}, Yv = (r = "") => {
  const n = String(r || ""), i = [], a = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi;
  let u = 0, d;
  for (; (d = a.exec(n)) !== null; ) {
    d.index > u && i.push({
      type: "text",
      value: n.slice(u, d.index)
    });
    const f = d[0], p = fh(d[1] || d[2] || "");
    p ? i.push({
      type: "payload",
      value: p
    }) : i.push({
      type: "text",
      value: f
    }), u = d.index + f.length;
  }
  return u < n.length && i.push({
    type: "text",
    value: n.slice(u)
  }), i;
}, hh = (r = "") => {
  const { answer: n, payloads: i } = Qv(r);
  let a = [];
  for (const u of i)
    a = On(a, Rl(u));
  return {
    answer: n,
    components: a
  };
}, qv = (r = "") => {
  const n = String(r || "").toLowerCase();
  for (let i = 0; i < n.length; i += 1)
    for (const { marker: a, minPrefixLength: u } of Ov) {
      if (n[i] !== a[0])
        continue;
      const d = n.slice(i);
      if (d.startsWith(a))
        return i;
      const f = d.slice(0, a.length);
      if (f.length >= u && a.startsWith(f))
        return i;
    }
  return -1;
}, Gv = (r = "") => {
  const n = lh(), i = uh();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = qv(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, Kv = "section-rendering-askcrystal-chat-product-card", Vi = /* @__PURE__ */ new Map(), Li = /* @__PURE__ */ new Map(), Jv = {
  "--product-card-gap": "12px",
  "--product-card-alignment": "stretch",
  "--padding-block-start": "0px",
  "--padding-block-end": "0px",
  "--padding-inline-start": "0px",
  "--padding-inline-end": "0px"
};
function Dn(r) {
  return Wv({
    toolName: r.toolName,
    result: r.result,
    args: r.args,
    toolCallId: r.toolCallId
  });
}
function Xv(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n)
    return null;
  if (/^\d+$/.test(n))
    return n;
  const i = n.match(/\/(\d+)(?:\?.*)?$/);
  return i ? i[1] : null;
}
function Zv(r) {
  if (!r?.handle || typeof window > "u")
    return null;
  const n = typeof window.Shopify?.routes?.root == "string" ? window.Shopify.routes.root : "/", i = new URL(`products/${r.handle}`, new URL(n, window.location.origin));
  i.searchParams.set("section_id", Kv), i.searchParams.set("askcrystal_handle", r.handle);
  const a = Xv(r?.variantId || r?.merchandiseId);
  return a && i.searchParams.set("variant", a), i.toString();
}
function e_(r) {
  const n = typeof r?.url == "string" ? r.url.trim() : "";
  if (n)
    return n;
  const i = typeof r?.handle == "string" ? r.handle.trim() : "";
  return i ? `/products/${i}` : null;
}
function t_(r) {
  const n = r?.image;
  if (typeof n == "string" && n.trim())
    return n.trim();
  if (n && typeof n == "object") {
    const a = n.url || n.src;
    if (typeof a == "string" && a.trim())
      return a.trim();
  }
  const i = r?.featuredImage || r?.featured_image;
  if (i && typeof i == "object") {
    const a = i.url || i.src;
    if (typeof a == "string" && a.trim())
      return a.trim();
  }
  return null;
}
function n_(r) {
  const n = r?.image;
  if (n && typeof n == "object") {
    const a = n.alt || n.altText;
    if (typeof a == "string" && a.trim())
      return a.trim();
  }
  const i = r?.featuredImage || r?.featured_image;
  if (i && typeof i == "object") {
    const a = i.alt || i.altText;
    if (typeof a == "string" && a.trim())
      return a.trim();
  }
  return r?.title || "Product image";
}
function r_(r) {
  if (!r)
    return !1;
  const n = !!r.querySelector("a[href]"), i = !!r.querySelector("img, .askcrystal-chat-product-card__placeholder");
  return n && i;
}
function s_(r) {
  const i = new DOMParser().parseFromString(r, "text/html").querySelector("[data-askcrystal-native-product-card]");
  return r_(i) ? i.outerHTML.trim() : null;
}
async function i_(r) {
  if (!r)
    throw new Error("Missing product card request URL");
  const n = Vi.get(r);
  if (n)
    return n;
  if (!Li.has(r)) {
    const i = fetch(r, {
      headers: {
        accept: "text/html"
      },
      credentials: "same-origin"
    }).then(async (a) => {
      if (!a.ok)
        throw new Error(`Failed to load native product card (${a.status})`);
      const u = await a.text(), d = s_(u);
      if (!d)
        throw new Error("Native product card markup was not found in the section response");
      return Vi.set(r, d), d;
    }).finally(() => {
      Li.delete(r);
    });
    Li.set(r, i);
  }
  return Li.get(r);
}
function ws({ eyebrow: r, title: n, children: i, className: a = "" }) {
  return /* @__PURE__ */ g.jsxs("section", { className: `ac-tool ${a}`.trim(), children: [
    /* @__PURE__ */ g.jsxs("header", { className: "ac-tool__header", children: [
      r ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__eyebrow", children: r }) : null,
      n ? /* @__PURE__ */ g.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function o_({ image: r, title: n, compact: i = !1 }) {
  return /* @__PURE__ */ g.jsx("div", { className: `ac-tool-product__media${i ? " ac-tool-product__media--compact" : ""}`, children: r ? /* @__PURE__ */ g.jsx("img", { src: r, alt: n, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "ac-tool-product__placeholder", children: "Crystal" }) });
}
function a_({ product: r, ctaLabel: n }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-product__meta", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-product__price-group", children: [
      r.price ? /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__price", children: r.price }) : null,
      r.compareAtPrice ? /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__compare", children: r.compareAtPrice }) : null
    ] }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__cta", children: n || "View crystal" })
  ] });
}
function l_({ product: r, ctaLabel: n }) {
  const i = e_(r), a = t_(r), u = n_(r), d = n || "View", f = a ? /* @__PURE__ */ g.jsx("img", { className: "askcrystal-chat-product-card__image", src: a, alt: u, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }), p = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__media", children: f }),
    /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__body", children: [
      /* @__PURE__ */ g.jsx("product-title", { className: "askcrystal-chat-product-card__title", children: /* @__PURE__ */ g.jsx("span", { className: "title-text", children: r.title }) }),
      /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__meta", children: [
        /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__price-group", children: [
          r.price ? /* @__PURE__ */ g.jsx("span", { className: "askcrystal-chat-product-card__price askcrystal-chat-product-card__price--hydrated", children: r.price }) : null,
          r.compareAtPrice ? /* @__PURE__ */ g.jsx("span", { className: "askcrystal-chat-product-card__compare", children: r.compareAtPrice }) : null
        ] }),
        /* @__PURE__ */ g.jsx("span", { className: "askcrystal-chat-product-card__cta", children: d })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ g.jsx(
    "div",
    {
      className: "askcrystal-chat-product-card",
      "data-askcrystal-native-product-card": !0,
      "data-askcrystal-render-mode": "hydrated",
      children: /* @__PURE__ */ g.jsx(
        "div",
        {
          className: "product-card askcrystal-chat-product-card__card",
          "data-product-id": r.id || void 0,
          children: /* @__PURE__ */ g.jsx(
            "div",
            {
              className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
              style: Jv,
              children: i ? /* @__PURE__ */ g.jsx("a", { className: "askcrystal-chat-product-card__surface", href: i, children: p }) : /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__surface", children: p })
            }
          )
        }
      )
    }
  );
}
function u_({ product: r, ctaLabel: n }) {
  const i = Zv(r), [a, u] = C.useState(() => i && Vi.get(i) || null), [d, f] = C.useState(null);
  return C.useEffect(() => {
    let p = !0;
    if (!i)
      return C.startTransition(() => {
        u(null), f(new Error("Missing product card request URL"));
      }), () => {
        p = !1;
      };
    const m = Vi.get(i);
    return m ? (C.startTransition(() => {
      u(m), f(null);
    }), () => {
      p = !1;
    }) : (C.startTransition(() => {
      u(null), f(null);
    }), i_(i).then((v) => {
      p && C.startTransition(() => {
        u(v), f(null);
      });
    }).catch((v) => {
      p && (typeof console < "u" && typeof console.warn == "function" && console.warn("[AskCrystal] Native product card render fell back to hydrated shell.", {
        requestUrl: i,
        error: v,
        product: r
      }), C.startTransition(() => {
        u(null), f(v);
      }));
    }), () => {
      p = !1;
    });
  }, [i]), a ? /* @__PURE__ */ g.jsx(
    "div",
    {
      className: "ac-tool-product-native ac-tool-product-native--native",
      dangerouslySetInnerHTML: { __html: a }
    }
  ) : /* @__PURE__ */ g.jsx(
    "div",
    {
      className: `ac-tool-product-native ${d ? "ac-tool-product-native--fallback" : "ac-tool-product-native--loading"}`.trim(),
      "aria-busy": d ? void 0 : "true",
      "aria-live": "polite",
      children: /* @__PURE__ */ g.jsx(l_, { product: r, ctaLabel: n })
    }
  );
}
function c_(r) {
  const n = Dn(r);
  if (!n)
    return null;
  const { ctaLabel: i, product: a } = n.props;
  return /* @__PURE__ */ g.jsx("section", { className: "ac-tool-product-block", children: /* @__PURE__ */ g.jsx(u_, { product: a, ctaLabel: i }) });
}
function d_(r) {
  const n = Dn(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    reason: u,
    browseUrl: d,
    browseLabel: f,
    products: p
  } = n.props;
  return /* @__PURE__ */ g.jsxs(ws, { eyebrow: i, title: a, className: "ac-tool--carousel", children: [
    u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: p.map((m, v) => {
      const w = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsx(o_, { image: m.image, title: m.title, compact: !0 }),
        /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-carousel__copy", children: [
          m.badge ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product__badge", children: m.badge }) : null,
          /* @__PURE__ */ g.jsx("h4", { className: "ac-tool-product__title", children: m.title }),
          m.reason || m.summary ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product__summary", children: m.reason || m.summary }) : null,
          /* @__PURE__ */ g.jsx(a_, { product: m, ctaLabel: m.ctaLabel || "View" })
        ] })
      ] });
      return m.url ? /* @__PURE__ */ g.jsx("a", { className: "ac-tool-carousel__card", href: m.url, role: "listitem", children: w }, m.id || m.handle || v) : /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel__card", role: "listitem", children: w }, m.id || m.handle || v);
    }) }),
    d ? /* @__PURE__ */ g.jsx("div", { className: "ac-tool__footer", children: /* @__PURE__ */ g.jsx("a", { className: "ac-tool__footer-link", href: d, children: f }) }) : null
  ] });
}
function f_(r) {
  const n = Dn(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    summary: u,
    duration: d,
    steps: f,
    note: p,
    disclaimer: m,
    linkedProducts: v
  } = n.props;
  return /* @__PURE__ */ g.jsxs(ws, { eyebrow: i, title: a, className: "ac-tool--ritual", children: [
    u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    d ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__detail", children: d }) : null,
    /* @__PURE__ */ g.jsx("ol", { className: "ac-ritual-steps", children: f.map((w) => /* @__PURE__ */ g.jsxs("li", { className: "ac-ritual-steps__item", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-ritual-steps__dot", "aria-hidden": "true" }),
      /* @__PURE__ */ g.jsx("span", { children: w })
    ] }, w)) }),
    v.length > 0 ? /* @__PURE__ */ g.jsx("div", { className: "ac-tool-chip-row", role: "list", "aria-label": "Linked products", children: v.map((w, b) => w.url ? /* @__PURE__ */ g.jsx("a", { className: "ac-tool-chip", href: w.url, role: "listitem", children: w.title }, w.id || w.handle || b) : /* @__PURE__ */ g.jsx("span", { className: "ac-tool-chip", role: "listitem", children: w.title }, w.id || w.handle || b)) }) : null,
    p ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__note", children: p }) : null,
    m ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__disclaimer", children: m }) : null
  ] });
}
function h_(r) {
  const n = Dn(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    summary: u,
    energyFocus: d,
    highlights: f,
    disclaimer: p
  } = n.props;
  return /* @__PURE__ */ g.jsxs(ws, { eyebrow: i, title: a, className: "ac-tool--summary", children: [
    d ? /* @__PURE__ */ g.jsx("p", { className: "ac-summary__focus", children: d }) : null,
    /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }),
    f.length > 0 ? /* @__PURE__ */ g.jsx("ul", { className: "ac-summary__list", children: f.map((m) => /* @__PURE__ */ g.jsx("li", { children: m }, m)) }) : null,
    p ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__disclaimer", children: p }) : null
  ] });
}
function p_(r) {
  const n = Dn(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    description: u,
    url: d,
    label: f,
    image: p
  } = n.props, m = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-collection__copy", children: [
      i ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__eyebrow", children: i }) : null,
      /* @__PURE__ */ g.jsx("h3", { className: "ac-tool__title", children: a }),
      u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-tool-collection__action", children: /* @__PURE__ */ g.jsx("span", { children: f }) }),
    p ? /* @__PURE__ */ g.jsx("div", { className: "ac-tool-collection__image", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("img", { src: p, alt: "", loading: "lazy" }) }) : null
  ] });
  return /* @__PURE__ */ g.jsx("section", { className: "ac-tool ac-tool--collection", children: d ? /* @__PURE__ */ g.jsx("a", { className: "ac-tool-collection", href: d, children: m }) : /* @__PURE__ */ g.jsx("div", { className: "ac-tool-collection", children: m }) });
}
function m_(r) {
  const n = Dn(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    steps: u,
    closing: d
  } = n.props;
  return /* @__PURE__ */ g.jsxs(ws, { eyebrow: i, title: a, className: "ac-tool--next-steps", children: [
    /* @__PURE__ */ g.jsx("ul", { className: "ac-next-steps", children: u.map((f, p) => /* @__PURE__ */ g.jsxs("li", { className: "ac-next-steps__item", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-next-steps__index", children: p + 1 }),
      /* @__PURE__ */ g.jsx("span", { children: f })
    ] }, f)) }),
    d ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__note", children: d }) : null
  ] });
}
function g_(r) {
  const n = Dn(r);
  return n ? /* @__PURE__ */ g.jsx(ws, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function y_({ children: r }) {
  return /* @__PURE__ */ g.jsx("div", { className: "ac-tool-group", children: r });
}
const v_ = {
  tools: {
    by_name: {
      [dt.product_card]: c_,
      [dt.product_carousel]: d_,
      [dt.ritual_card]: f_,
      [dt.reading_summary]: h_,
      [dt.collection_link]: p_,
      [dt.next_steps]: m_
    },
    Fallback: g_
  },
  ToolGroup: y_
}, ph = "[data-askcrystal-homepage-root]", Wi = /* @__PURE__ */ new Map(), sl = "askcrystal-main-thread", __ = "http://localhost:8787", sf = "askcrystal-theme-session-id";
let of = 0;
const w_ = 7;
function S_(r) {
  const n = document.getElementById(r);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function Zi(r = []) {
  return r.map((n) => n.type === "text" || n.type === "reasoning" ? n.text : "").join(" ").trim();
}
function il(r) {
  const n = r?.answer || r?.delta || r?.text || r?.message || r?.reply || r?.output || r?.data?.answer || r?.data?.text;
  return typeof n == "string" ? n : "";
}
function mh(r) {
  const n = Array.isArray(r) ? r : Array.isArray(r?.suggestions) ? r.suggestions : Array.isArray(r?.data) ? r.data : [], i = /* @__PURE__ */ new Set();
  return n.map((a) => typeof a == "string" ? {
    prompt: a.trim()
  } : a && typeof a == "object" && typeof a.prompt == "string" ? {
    prompt: a.prompt.trim()
  } : null).filter((a) => a?.prompt).filter((a) => {
    const u = a.prompt.toLowerCase();
    return i.has(u) ? !1 : (i.add(u), !0);
  }).slice(0, 6);
}
function x_(r) {
  return mh(
    r?.suggestions || r?.suggestedQuestions || r?.suggested_questions || r?.data?.suggestions || r?.data?.suggestedQuestions || r?.data?.suggested_questions || []
  );
}
function k_(r) {
  return /^(https?:\/\/|mailto:|\/)/i.test(r);
}
function qt(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, f = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const p = `${n}-${f}`;
    if (d[2] && d[3]) {
      const m = d[3].trim();
      i.push(
        k_(m) ? /* @__PURE__ */ g.jsx("a", { href: m, target: m.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ g.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ g.jsx("strong", { children: qt(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ g.jsx("em", { children: qt(d[6], `${p}-em`) }, p));
    u = a.lastIndex, f += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function gs(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function E_(r) {
  const n = gs(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function b_(r) {
  const n = gs(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function af(r) {
  const n = gs(r);
  return n.length >= 2 && n.some(Boolean);
}
function T_(r, n) {
  const i = r[n];
  if (!af(i)) return null;
  const a = gs(i), u = r[n + 1], d = b_(u);
  let f = n + (d ? 2 : 1);
  const p = [];
  for (; f < r.length && af(r[f]); ) {
    const m = gs(r[f]);
    if (m.length !== a.length) break;
    p.push(m), f += 1;
  }
  return p.length === 0 ? null : {
    headers: a,
    alignments: d ? E_(u) : a.map(() => "left"),
    rows: p,
    nextIndex: f
  };
}
function C_(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function gh({ text: r = "" }) {
  const n = String(r).replace(/\r\n/g, `
`).split(`
`), i = [];
  let a = 0;
  for (; a < n.length; ) {
    const u = n[a];
    if (!u.trim()) {
      a += 1;
      continue;
    }
    const d = u.match(/^```(\w+)?\s*$/);
    if (d) {
      const w = [], b = d[1] || "";
      for (a += 1; a < n.length && !/^```\s*$/.test(n[a]); )
        w.push(n[a]), a += 1;
      a < n.length && (a += 1), C_(b) ? i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ g.jsx(gh, { text: w.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ g.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ g.jsx("code", { children: w.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const f = u.match(/^(#{1,3})\s+(.+)$/);
    if (f) {
      const w = `h${f[1].length + 2}`;
      i.push(
        /* @__PURE__ */ g.jsx(w, { children: qt(f[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ g.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const p = T_(n, a);
    if (p) {
      const { headers: w, alignments: b, rows: S, nextIndex: I } = p;
      a = I, i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ g.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ g.jsx("thead", { children: /* @__PURE__ */ g.jsx("tr", { children: w.map((P, j) => /* @__PURE__ */ g.jsx(
            "th",
            {
              style: { textAlign: b[j] || "left" },
              children: qt(P, `table-head-${a}-${j}`)
            },
            `table-head-${a}-${j}`
          )) }) }),
          /* @__PURE__ */ g.jsx("tbody", { children: S.map((P, j) => /* @__PURE__ */ g.jsx("tr", { children: w.map((z, J) => /* @__PURE__ */ g.jsx(
            "td",
            {
              style: { textAlign: b[J] || "left" },
              children: qt(P[J] || "", `table-cell-${a}-${j}-${J}`)
            },
            `table-cell-${a}-${j}-${J}`
          )) }, `table-row-${a}-${j}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        w.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ul", { children: w.map((b, S) => /* @__PURE__ */ g.jsx("li", { children: qt(b, `ul-${a}-${S}`) }, `ul-${a}-${S}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        w.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ol", { children: w.map((b, S) => /* @__PURE__ */ g.jsx("li", { children: qt(b, `ol-${a}-${S}`) }, `ol-${a}-${S}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        w.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("blockquote", { children: w.map((b, S) => /* @__PURE__ */ g.jsx("p", { children: qt(b, `quote-${a}-${S}`) }, `quote-${a}-${S}`)) }, `quote-${a}`)
      );
      continue;
    }
    const m = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      m.push(n[a].trim()), a += 1;
    const v = m.join(" ");
    i.push(
      /* @__PURE__ */ g.jsx("p", { children: qt(v, `p-${a}`) }, `p-${a}`)
    );
  }
  return /* @__PURE__ */ g.jsx("div", { className: "ac-markdown", children: i });
}
function R_(r) {
  if (typeof r != "string" || !r) return "";
  try {
    return JSON.parse(r);
  } catch {
    return r.replace(/^"/, "").replace(/"$/, "");
  }
}
function I_(r) {
  if (typeof r != "string" || !r) return "";
  let n = "", i = !1;
  for (let a = 0; a < r.length; a += 1) {
    const u = r[a];
    if (i) {
      switch (u) {
        case "n":
          n += `
`;
          break;
        case "r":
          n += "\r";
          break;
        case "t":
          n += "	";
          break;
        case '"':
          n += '"';
          break;
        case "\\":
          n += "\\";
          break;
        case "/":
          n += "/";
          break;
        case "b":
          n += "\b";
          break;
        case "f":
          n += "\f";
          break;
        case "u": {
          const d = r.slice(a + 1, a + 5);
          /^[0-9a-fA-F]{4}$/.test(d) && (n += String.fromCharCode(Number.parseInt(d, 16)), a += 4);
          break;
        }
        default:
          n += u;
      }
      i = !1;
      continue;
    }
    if (u === "\\") {
      i = !0;
      continue;
    }
    n += u;
  }
  return n;
}
function M_(r) {
  if (typeof r != "string" || !r) return "";
  const n = [...r.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*"/gi
  )].pop();
  if (!n || typeof n.index != "number") return "";
  const i = n.index + n[0].length;
  let a = i, u = !1;
  for (; a < r.length; ) {
    const f = r[a];
    if (u) {
      u = !1, a += 1;
      continue;
    }
    if (f === "\\") {
      u = !0, a += 1;
      continue;
    }
    if (f === '"') break;
    a += 1;
  }
  const d = r.slice(i, a);
  return I_(d).trim();
}
function yh(r) {
  if (typeof r != "string") return "";
  const n = r.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trim();
  if (!n) return "";
  const i = [...n.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi
  )].pop();
  if (i?.[1]) {
    const d = R_(i[1]).trim();
    if (d) return d;
  }
  const a = M_(n);
  if (a) return a;
  const u = [...n.matchAll(
    /(?:^|\n)\s*final answer\s*:\s*/gim
  )].pop();
  if (typeof u?.index == "number") {
    const d = n.slice(u.index + u[0].length).trim();
    if (d) return d;
  }
  return "";
}
function lf(r) {
  if (typeof r != "string") return "";
  let n = r.replace(/^\uFEFF/, "").trimStart();
  if (!n) return "";
  const i = n.slice(0, 24).toLowerCase().replace(/\s+/g, " ").trim();
  if (i && i.length >= 3 && i.length <= 13 && "final answer:".startsWith(i) && /^[a-z:\s]+$/i.test(n.trim()) && n.trim().length <= 24)
    return "";
  const a = [...n.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  return typeof a?.index == "number" ? n = n.slice(a.index + a[0].length).trimStart() : n = n.replace(/^final answer\s*:\s*/i, ""), n;
}
function ol(r) {
  if (typeof r != "string") return "";
  const n = r.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trimStart();
  if (!n) return "";
  const i = yh(n);
  let a = lf(i || n);
  if (!i) {
    if (!a) return "";
    const u = _h(a);
    if (u && (a = lf(u) || a), vh(a) || ys(a))
      return "";
  }
  return a.replace(/\n{3,}/g, `

`).trimStart();
}
function vh(r) {
  if (typeof r != "string") return !1;
  const n = r.toLowerCase();
  return /\bthought:\b/.test(n) || /\bobservation:\b/.test(n) || /\baction:\b/.test(n) || /\bquestion:\b/.test(n) || /"action"\s*:/.test(n) || /\bfinal answer\b/.test(n);
}
function ys(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(n) || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(n) || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(n) || /\b(search results|search_catalog|get_product_details|tool_call|catalog lookup|parameter name=)\b/.test(n) || /\bi have \w+ products?\b/.test(n) : !1;
}
function _h(r) {
  if (typeof r != "string") return "";
  let n = r.trim();
  if (!n) return "";
  const i = n.split(`
`);
  let a = 0;
  for (; a < i.length; ) {
    const f = i[a].trim();
    if (!f) {
      a += 1;
      continue;
    }
    if (!ys(f)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((f) => f.trim()).filter(Boolean);
  let d = 0;
  for (; d < u.length && ys(u[d]); )
    d += 1;
  return u.slice(d).join(`

`).trim();
}
function Il(r) {
  return Array.isArray(r) ? r.map((n) => typeof n == "string" ? n.trim() : "").filter(Boolean).slice(-6) : typeof r == "string" ? r.split(`
`).map((n) => n.trim()).filter(Boolean).slice(-6) : [];
}
function A_({ statusStage: r = "", statusTool: n = "", statusText: i = "" }) {
  const a = `${r} ${n} ${i}`.toLowerCase();
  return /shopify|catalog|product|variant|collection|cart|storefront|inventory|shelf/.test(a) ? [
    "Walking the crystal shelves for the closest resonance...",
    "Checking which pieces answer your question most clearly...",
    "Looking for a match that feels chosen, not generic...",
    "Comparing the quieter stones with the brighter ones...",
    "Following the pull toward the clearest shelf match..."
  ] : /knowledge|dataset|retriev|document|archive|rag|kb|search|library/.test(a) ? [
    "Opening the archive and brushing dust from the pages...",
    "Crossing older notes with the feeling in your question...",
    "Pulling the clearest thread from the library...",
    "Listening for where memory and meaning overlap...",
    "Letting the right fragment rise to the surface..."
  ] : /tarot|card|spread/.test(a) ? [
    "Turning the cards slowly, one current at a time...",
    "Watching which symbols insist on being seen...",
    "Letting the spread settle before reading the pattern...",
    "Listening for the card that changes the whole story...",
    "Tracing the image that keeps returning to the surface..."
  ] : /astrology|natal|zodiac|planet|birth|horoscope|star/.test(a) ? [
    "Tracing the sky-map behind your question...",
    "Checking where the planets press most strongly...",
    "Following the brighter houses and quieter tensions...",
    "Listening for the weather between stars and self...",
    "Letting the chart reveal its steadier rhythm..."
  ] : /bazi|shushu|taibu|fengshui|yinyuan|marriage|fate|element/.test(a) ? [
    "Following the hidden stems beneath the surface...",
    "Reading the pattern through timing, element, and fate...",
    "Letting the older map reveal its structure...",
    "Listening for the balance inside the chart...",
    "Holding the pattern until its shape becomes clear..."
  ] : /crystal|stone|chakra|healing|ritual/.test(a) ? [
    "Holding the stones against the shape of your question...",
    "Checking which crystal answers with steadiness...",
    "Listening for resonance before recommendation...",
    "Feeling for the stone that calms instead of performs...",
    "Letting the ritual choose its own gentle center..."
  ] : r === "compose" || r === "thought" ? [
    "The pattern is starting to surface...",
    "Gathering the clearest strand before I speak...",
    "Letting the reading take its proper shape...",
    "Bringing symbol, shelf, and guidance into one thread...",
    "Waiting for the answer to settle into plain language..."
  ] : [
    "Settling into the thread beneath your words...",
    "Listening for what wants to be named first...",
    "Holding the question until the noise falls away...",
    "Letting the reading gather around the clearest signal...",
    "Finding the gentlest path into the answer..."
  ];
}
function N_(r, n) {
  if (!r.length) return [];
  const i = (n % r.length + r.length) % r.length;
  return [...r.slice(i), ...r.slice(0, i)];
}
function fr(r) {
  const n = Math.sin(r * 12.9898 + 78.233) * 43758.5453;
  return n - Math.floor(n);
}
function P_(r = [], n = []) {
  if (!r.length) return [...new Set(n.filter(Boolean))];
  if (!n.length) return [...new Set(r.filter(Boolean))];
  const i = [r[0]];
  let a = 1, u = 0;
  for (; a < r.length || u < n.length; )
    a < r.length && (i.push(r[a]), a += 1), u < n.length && (i.push(n[u]), u += 1);
  return [...new Set(i.filter(Boolean))];
}
function j_({ statusText: r = "", statusStage: n = "", ambientStatusText: i = "", hasToolActivity: a = !1 }) {
  return i || (n && n !== "tool" && r ? r : a ? "Following the clearest thread..." : "Settling into your energy...");
}
function L_({
  statusText: r = "",
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = ""
}) {
  const d = Il(n), f = [];
  i === "tool" && r && f.push(r), d.forEach((S) => {
    f.includes(S) || f.push(S);
  });
  const p = j_({
    statusText: r,
    statusStage: i,
    ambientStatusText: u,
    hasToolActivity: f.length > 0
  }), m = i && i !== "tool" ? i : f.length > 0 ? "compose" : i, v = A_({
    statusStage: m,
    statusTool: f.length > 0 ? "" : a,
    statusText: p
  }), w = Math.round(
    fr(
      p.length + f.join("").length * 0.5 + v.length
    ) * 100
  ), b = N_(v, w);
  return P_([p, ...b], f);
}
function O_(r = "", n = 0) {
  const i = typeof r == "string" ? r.trim() : "", a = 1040, u = /[.!?。！？]$/.test(i) ? 220 : /[,;:，；：]$/.test(i) ? 120 : 0, d = Math.min(320, Math.max(0, i.length * 6)), f = Math.round((fr(n + i.length) - 0.5) * 220);
  return Math.max(880, a + u + d + f);
}
function wh() {
  const [r, n] = C.useState(!1);
  return C.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
function z_({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = ""
}) {
  const d = wh(), f = C.useMemo(
    () => L_({
      statusText: r,
      statusHistoryText: n,
      statusStage: i,
      statusTool: a,
      ambientStatusText: u
    }),
    [u, n, i, r, a]
  ), [p, m] = C.useState(0), [v, w] = C.useState(!1), b = C.useMemo(() => f.length <= 2 ? f : [...f, ...f.slice(0, 2)], [f]);
  C.useEffect(() => {
    m(0), w(!0);
    const P = window.requestAnimationFrame(() => {
      w(!1);
    });
    return () => window.cancelAnimationFrame(P);
  }, [f]), C.useEffect(() => {
    if (d || f.length <= 2 || p >= f.length) return;
    let P, j = !1;
    const z = p + 1, J = b[z] || "";
    return P = window.setTimeout(() => {
      j || m(z);
    }, O_(J, p)), () => {
      j = !0, window.clearTimeout(P);
    };
  }, [b, d, p, f.length]), C.useEffect(() => {
    if (d || f.length <= 2 || p < f.length) return;
    const P = window.setTimeout(() => {
      w(!0), m(0), window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          w(!1);
        });
      });
    }, 720);
    return () => window.clearTimeout(P);
  }, [d, p, f.length]);
  const S = d || f.length <= 2 ? f.slice(0, 2) : [
    f[p % f.length],
    f[(p + 1) % f.length]
  ].filter(Boolean), I = r || S[S.length - 1] || "Settling into your energy...";
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-thinking", children: [
    /* @__PURE__ */ g.jsx("span", { className: "visually-hidden", role: "status", "aria-live": "polite", children: I }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-thinking__lead", "aria-hidden": "true", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-thinking__orb" }),
      /* @__PURE__ */ g.jsxs("span", { className: "ac-thinking__dots", children: [
        /* @__PURE__ */ g.jsx("span", {}),
        /* @__PURE__ */ g.jsx("span", {}),
        /* @__PURE__ */ g.jsx("span", {})
      ] })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-thinking__trail", "aria-hidden": "true", children: d || f.length <= 2 ? S.map((P, j) => /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `ac-thinking__line${j === S.length - 1 ? " is-current" : ""}`,
        children: P
      },
      `${P}-${j}`
    )) : /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `ac-thinking__track${v ? " is-resetting" : ""}`,
        style: { transform: `translateY(calc(var(--ac-thinking-line-step) * -${p}))` },
        children: b.map((P, j) => /* @__PURE__ */ g.jsx("div", { className: "ac-thinking__line", children: P }, `${P}-${j}`))
      }
    ) })
  ] });
}
function D_({ statusText: r }) {
  return r ? /* @__PURE__ */ g.jsxs("div", { className: "ac-live-status", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("span", { className: "ac-live-status__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-live-status__text", children: r })
  ] }) : null;
}
function F_(r) {
  return r ? typeof r == "string" ? {
    stage: "",
    tool: "",
    message: r,
    taskId: ""
  } : {
    stage: typeof r.stage == "string" ? r.stage : "",
    tool: typeof r.tool == "string" ? r.tool : "",
    message: typeof r.message == "string" ? r.message : "",
    taskId: kh(r)
  } : {
    stage: "",
    tool: "",
    message: "",
    taskId: ""
  };
}
function Sh(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return Zi(i.content);
  }
  return "";
}
function al(r, n) {
  return r.find((i) => n(i));
}
function B_({ matchedIntention: r, fallbackProduct: n, products: i }) {
  return r?.product ? On([], [
    {
      component: "reading_summary",
      id: `summary-${r.key}`,
      props: {
        title: "What your energy is asking for",
        summary: r.summary,
        energyFocus: r.energyFocus,
        highlights: r.highlights,
        disclaimer: "Spiritual wellness guidance only. Let your own judgment lead the final choice."
      }
    },
    {
      component: r.key === "calm" ? "product_card" : "product_carousel",
      id: `products-${r.key}`,
      props: r.key === "calm" ? {
        eyebrow: "Best first match",
        reason: r.cardReason,
        note: r.ritual,
        product: r.product
      } : {
        eyebrow: "Curated shelf",
        title: r.carouselTitle,
        reason: r.cardReason,
        products: [
          r.product,
          ...i.filter((a) => a.id !== r.product.id).slice(0, 2)
        ]
      }
    },
    {
      component: "ritual_card",
      id: `ritual-${r.key}`,
      props: {
        title: r.ritualTitle,
        summary: r.ritualSummary,
        steps: r.ritualSteps,
        linkedProducts: r.product ? [r.product] : [],
        note: r.ritual
      }
    }
  ]) : On([], [
    {
      component: "collection_link",
      id: "browse-collections",
      props: {
        title: "Browse by intention while we learn more",
        description: "If you already know the feeling or outcome you want, open the wider shelf and keep the conversation going.",
        url: "/collections/all",
        label: "Shop all crystals"
      }
    },
    n ? {
      component: "product_card",
      id: "fallback-product",
      props: {
        eyebrow: "A gentle starting point",
        reason: "This is a strong first shelf item while the guide narrows your intention.",
        product: n
      }
    } : null,
    {
      component: "next_steps",
      id: "guided-next-steps",
      props: {
        title: "How this storefront works best",
        steps: [
          "Start with the feeling that is most present right now.",
          "Let the guide narrow the intention before shopping too broadly.",
          "Use the recommendation cards to move into a product or ritual without leaving the thread."
        ]
      }
    }
  ]);
}
function U_(r, n) {
  const i = r.toLowerCase(), u = [
    {
      key: "calm",
      test: /sleep|rest|anxious|stress|calm|ground|peace/,
      lead: "I would start by softening the energy around your nervous system before recommending anything too activating.",
      product: al(n, (m) => /amethyst|selenite|moonstone|calm|sleep/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
      summary: "There is a strong need to reduce static first. The most supportive move is to favor calm, sleep, and grounding over anything intensely energizing.",
      energyFocus: "Soften + ground",
      highlights: [
        "Your nervous system wants steadiness before action.",
        "Sleep, safety, and gentleness matter more than intensity right now.",
        "A quieter ritual will likely work better than a complicated one."
      ],
      cardReason: "This recommendation leans calm, quiet, and easy to return to at the end of the day.",
      ritualTitle: "A quick evening grounding ritual",
      ritualSummary: "Keep the ritual simple enough that you can actually repeat it tonight.",
      ritualSteps: [
        "Hold the crystal somewhere visible or easy to reach.",
        "Take three slow breaths and let your shoulders drop.",
        "Name one thing you are releasing from today."
      ],
      ritual: "A good starting ritual is one grounding breath, one clear intention, and one stone you can keep within reach tonight."
    },
    {
      key: "love",
      test: /love|relationship|heart|marriage|partner|friendship/,
      lead: "This sounds less like a product hunt and more like a heart-reading moment, so I would slow the recommendation down and keep it gentle.",
      product: al(n, (m) => /rose|heart|love|pink/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
      summary: "This turn feels centered on tenderness, boundaries, and emotional clarity. The right recommendation should support the heart without forcing urgency.",
      energyFocus: "Heart clarity",
      highlights: [
        "Gentleness matters more than intensity here.",
        "You may need reassurance and discernment at the same time.",
        "A ritual that centers boundaries can support the product recommendation."
      ],
      cardReason: "These picks keep the energy soft, relational, and emotionally supportive rather than overly dramatic.",
      carouselTitle: "Crystals for heart clarity",
      ritualTitle: "A small heart-centering ritual",
      ritualSummary: "Use a short reset that helps you notice what feels true before making any promises.",
      ritualSteps: [
        "Place the crystal near your heart or in your palm.",
        "Name the kind of love or safety you want more of.",
        "Choose one boundary that protects that intention this week."
      ],
      ritual: "If you want, we can frame the next step around heart clarity, boundaries, or reconciliation instead of jumping straight to a purchase."
    },
    {
      key: "career",
      test: /money|career|work|abundance|business|confidence|success/,
      lead: "I would treat this as an intention and momentum question first, then narrow into stones that support focus, confidence, and abundance.",
      product: al(n, (m) => /citrine|pyrite|tiger|success|abundance/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
      summary: "The energy here is not just about manifestation. It is about focus, self-trust, and practical momentum around work or money.",
      energyFocus: "Clarity + momentum",
      highlights: [
        "Confidence works best when tied to a concrete next move.",
        "A visible object can act as a daily reset for intention and follow-through.",
        "The recommendation should feel energizing but still grounded in action."
      ],
      cardReason: "These recommendations support focus, direction, and steady abundance rather than vague hype.",
      carouselTitle: "Crystals for work and abundance",
      ritualTitle: "A work-intention ritual",
      ritualSummary: "Use the product as a prompt for action, not only a symbol for wishing.",
      ritualSteps: [
        "Place the crystal beside the task that matters most this week.",
        "Write one measurable outcome you want to move toward.",
        "Return to the crystal before you begin the work block."
      ],
      ritual: "The strongest commerce-friendly flow here is intention first, then one practical object you can return to during work or planning."
    }
  ].find((m) => m.test.test(i)), d = n[0], f = B_({
    matchedIntention: u,
    fallbackProduct: d,
    products: n
  });
  return u?.product ? {
    answer: `${u.lead}

A likely fit from the current shelf is ${u.product.title}. ${u.product.summary || "It looks aligned with the intention you mentioned."}

${u.ritual}`,
    components: f
  } : {
    answer: `I can already support the guided-storefront shape we want here: start with the feeling, clarify the intention, and only then move into product curation.

${d ? `A natural first shelf item to explore is ${d.title}. ${d.summary || "It is a strong general starting point while we learn more about the user."}` : "Once the catalog feed is connected, this space can surface a small set of best-fit crystals without leaving the thread."}

If you tell me what is most present right now, I can narrow the reading and the recommendation together.`,
    components: f
  };
}
function xh(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = yh(n), u = (i || n).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && vh(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), f = _h(u), p = d >= 0 ? u.slice(d).trim() : f || u, v = p.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).filter((b) => !ys(b)), w = (v.length > 0 ? v.join(`

`) : p).trim();
    if (w && !ys(w))
      return w;
  }
  return "";
}
function $_(r) {
  const n = xh(r);
  return n || [
    "I tried to check the shelf for you, but the live catalog result was not available in this moment.",
    "For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”",
    "If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely."
  ].join(`

`);
}
function uf(r, n = []) {
  const i = hh(r), a = On(n, i.components), u = $_(i.answer);
  return u ? {
    answer: u,
    components: a,
    sourceText: typeof r == "string" && r.trim() ? r : u
  } : a.length > 0 ? {
    answer: "I found a store-backed match for you below.",
    components: a,
    sourceText: typeof r == "string" && r.trim() ? r : "I found a store-backed match for you below."
  } : {
    answer: "AskCrystal finished the request, but no guidance text came back. Please try again.",
    components: [],
    sourceText: "AskCrystal finished the request, but no guidance text came back. Please try again."
  };
}
function dr({ text: r = "", components: n = [] } = {}) {
  const i = typeof r == "string" ? r : "", a = hh(i), u = On(n, a.components), d = Yv(i), f = [], p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), v = (S) => `${S.toolName}:${S.toolCallId}`;
  for (const S of u) {
    const I = rf(S);
    I && m.set(v(I), I);
  }
  const w = (S) => {
    const I = Gv(S).trim(), P = xh(I);
    if (!P) return;
    const j = f[f.length - 1];
    if (j?.type === "text") {
      j.text = `${j.text}

${P}`.trim();
      return;
    }
    f.push({
      type: "text",
      text: P
    });
  }, b = (S) => {
    for (const I of S) {
      const P = rf(I);
      if (!P) continue;
      const j = v(P);
      p.has(j) || (f.push(m.get(j) || P), p.add(j));
    }
  };
  if (d.some((S) => S.type === "payload"))
    for (const S of d) {
      if (S.type === "text") {
        w(S.value);
        continue;
      }
      b(Rl(S.value));
    }
  else
    w(i);
  for (const S of m.values()) {
    const I = v(S);
    p.has(I) || f.push(S);
  }
  return f;
}
function H_(r) {
  return /^https?:\/\//i.test(r);
}
function Qi(r) {
  return r ? H_(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${__}${r}` : r : "";
}
function V_(r) {
  return r ? r.endsWith("/stream") ? Qi(r) : Qi(`${r.replace(/\/$/, "")}/stream`) : "";
}
function W_(r) {
  return r ? r.endsWith("/stop") ? Qi(r) : Qi(`${r.replace(/\/$/, "")}/stop`) : "";
}
function Q_() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  try {
    const r = window.localStorage.getItem(sf);
    if (r) return r;
    const n = vs("session");
    return window.localStorage.setItem(sf, n), n;
  } catch {
    return vs("session");
  }
}
function Y_(r) {
  const n = [];
  let i = r.replace(/\r\n/g, `
`);
  for (; ; ) {
    const a = i.indexOf(`

`);
    if (a === -1) break;
    const u = i.slice(0, a);
    i = i.slice(a + 2);
    let d = "message";
    const f = [];
    if (u.split(`
`).forEach((p) => {
      p.startsWith("event:") && (d = p.slice(6).trim() || d), p.startsWith("data:") && f.push(p.slice(5).trim());
    }), !!f.length)
      try {
        n.push({
          event: d,
          payload: JSON.parse(f.join(`
`))
        });
      } catch {
      }
  }
  return { events: n, remaining: i };
}
function kh(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function Eh() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function Ct(r) {
  if (r?.aborted)
    throw Eh();
}
function q_(r = "", n = "") {
  const i = Math.min(r.length, n.length);
  let a = 0;
  for (; a < i && r[a] === n[a]; )
    a += 1;
  return a;
}
function G_(r, n = 28, i = "normal") {
  if (typeof r != "string" || !r) return [];
  const a = r.match(/\n+|[^\s\n]+(?:\s+)?|[ \t]+/g) || [r];
  if (a.length <= n) return a;
  if (i === "final") {
    const f = [], p = Math.min(a.length, n);
    let m = 0;
    for (; m < a.length; ) {
      const v = a.length - m, w = Math.max(1, p - f.length), b = v / w, S = Math.max(1, Math.floor(b)), I = fr(m + r.length + f.length), P = I > 0.72 ? 1 : I < 0.18 ? -1 : 0;
      let j = Math.max(1, Math.round(S + P));
      const z = a[m] || "", J = z.trim();
      /[\n]/.test(z) || /[.!?。！？]$/.test(J) ? j = 1 : /[,:;，；：]$/.test(J) ? j = Math.min(j, 2) : j = Math.min(j, 3), f.push(a.slice(m, m + j).join("")), m += j;
    }
    return f;
  }
  const u = Math.ceil(a.length / n), d = [];
  for (let f = 0; f < a.length; f += u)
    d.push(a.slice(f, f + u).join(""));
  return d;
}
function K_(r, n = "normal", i = "", a = 0) {
  let u = 0;
  if (n === "fast") {
    if (r <= 1) return 0;
    r <= 10 ? u = 16 : r <= 20 ? u = 11 : r <= 32 ? u = 8 : u = 6;
  } else if (n === "final") {
    if (r <= 1) return 0;
    r <= 8 ? u = 112 : r <= 16 ? u = 94 : r <= 28 ? u = 78 : r <= 44 ? u = 64 : r <= 64 ? u = 54 : u = 46;
  } else {
    if (r <= 1) return 0;
    r <= 8 ? u = 24 : r <= 16 ? u = 18 : u = 12;
  }
  const d = typeof i == "string" ? i.trim() : "", f = /[.!?。！？]$/.test(d) ? 176 : /[,;:，；：]$/.test(d) ? 104 : /\n/.test(i) ? 136 : 0, p = n === "final" ? Math.min(28, Math.max(0, d.length * 2 - 10)) : 0, m = n === "final" ? 52 : 6, v = Math.round((fr(a + r + d.length) - 0.5) * m), w = n === "final" && fr(a * 3.17 + r) > 0.78 ? 64 + Math.round(fr(a + 17) * 48) : 0;
  return Math.max(0, u + f + p + v + w);
}
function J_(r, n) {
  return r ? new Promise((i, a) => {
    const u = globalThis.setTimeout(() => {
      f(), i();
    }, r), d = () => {
      f(), a(Eh());
    };
    function f() {
      globalThis.clearTimeout(u), n?.removeEventListener?.("abort", d);
    }
    n?.addEventListener?.("abort", d, { once: !0 });
  }) : Promise.resolve();
}
async function X_({
  currentAnswer: r = "",
  nextAnswer: n = "",
  abortSignal: i,
  onDelta: a,
  eventPayload: u,
  speed: d = "normal"
}) {
  if (!n || n === r)
    return n || r;
  const f = !!r && n.startsWith(r);
  let p = f ? r : "";
  if (!f && r) {
    const S = q_(r, n);
    S / Math.max(1, Math.min(r.length, n.length)) >= 0.65 && (p = n.slice(0, S));
  }
  const m = n.slice(p.length);
  if (!m)
    return p !== r && a?.("", p, u), n;
  const v = d === "fast" ? n.length > 1400 ? 64 : n.length > 700 ? 52 : 40 : d === "final" ? n.length > 1800 ? 120 : n.length > 1200 ? 104 : n.length > 700 ? 88 : 68 : n.length > 1400 ? 44 : n.length > 700 ? 36 : 28, w = G_(m, v, d);
  let b = p;
  for (let S = 0; S < w.length; S += 1) {
    Ct(i);
    const I = w[S];
    if (b += I, a?.(!f && S === 0 ? "" : I, b, u), S < w.length - 1) {
      const j = K_(w.length, d, I, S);
      await J_(j, i);
    }
  }
  return n;
}
async function Z_({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a }) {
  if (!(!r || !n))
    try {
      await fetch(W_(r), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskId: n,
          sessionId: i,
          conversationId: a
        }),
        keepalive: !0
      });
    } catch (u) {
      console.error("[AskCrystal] Stop request failed.", u);
    }
}
async function ew({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: f, onComponents: p, onSuggestions: m }) {
  Ct(i);
  const v = await fetch(V_(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: Sh(n),
      conversationId: a,
      sessionId: u
    }),
    signal: i
  });
  if (!v.ok) {
    let ue = `Proxy returned ${v.status}`;
    try {
      const Z = await v.json();
      ue = Z?.error || Z?.message || ue;
    } catch {
    }
    throw new Error(ue);
  }
  if (!v.body)
    throw new Error("The proxy did not return a readable stream.");
  const w = v.body.getReader(), b = new TextDecoder();
  let S = "", I = "", P = "", j = [], z = [], J = a || null;
  for (; ; ) {
    Ct(i);
    const { done: ue, value: Z } = await w.read();
    if (ue) break;
    Ct(i), S += b.decode(Z, { stream: !0 });
    const ie = Y_(S);
    S = ie.remaining;
    for (const V of ie.events) {
      if (Ct(i), V.event === "status" && typeof V.payload?.message == "string" && (Ct(i), d?.(V.payload)), V.event === "error")
        throw new Error(V.payload?.error || V.payload?.message || "The proxy stream failed.");
      const X = Rl(V.payload);
      X.length && (Ct(i), j = On(j, X), p?.(j, X, V.payload), J = V.payload?.conversationId || V.payload?.conversation_id || J);
      const re = x_(V.payload);
      if (re.length && (Ct(i), z = re, m?.(re, V.payload), J = V.payload?.conversationId || V.payload?.conversation_id || J), V.event === "replace") {
        Ct(i);
        const Q = il(V.payload);
        if (Q) {
          I = Q;
          const he = ol(I);
          he && (P = he);
        }
        J = V.payload?.conversationId || V.payload?.conversation_id || J;
      }
      if (["delta", "message", "agent_message"].includes(V.event)) {
        Ct(i);
        const Q = il(V.payload);
        if (Q) {
          I += Q;
          const he = ol(I);
          he && (P = he);
        }
        J = V.payload?.conversationId || V.payload?.conversation_id || J;
      }
      if (V.event === "complete") {
        Ct(i);
        const Q = il(V.payload) || I, Be = ol(Q) || P || P, Le = uf(Q || Be, j);
        return {
          answer: Le.answer,
          components: Le.components,
          sourceText: Le.sourceText,
          suggestions: re.length ? re : z,
          conversationId: V.payload?.conversationId || V.payload?.conversation_id || J || null
        };
      }
    }
  }
  if (P || j.length > 0) {
    const ue = uf(P, j);
    return {
      answer: ue.answer,
      components: ue.components,
      sourceText: ue.sourceText,
      suggestions: z,
      conversationId: J
    };
  }
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function vs(r = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${r}-${crypto.randomUUID()}` : (of += 1, `${r}-${Date.now()}-${of}`);
}
function tw(r) {
  return {
    id: vs("user"),
    role: "user",
    createdAt: /* @__PURE__ */ new Date(),
    content: r.content || [],
    attachments: r.attachments || [],
    metadata: r.metadata || {
      custom: {}
    }
  };
}
function Pn({
  id: r = vs("assistant"),
  text: n = "",
  parts: i = null,
  components: a = [],
  status: u,
  error: d,
  statusText: f = "",
  statusStage: p = "",
  statusTool: m = "",
  statusHistory: v = [],
  ambientStatusText: w = "",
  revealPulse: b = 0,
  revealMode: S = ""
}) {
  const I = Il(v).join(`
`);
  return {
    id: r,
    role: "assistant",
    createdAt: /* @__PURE__ */ new Date(),
    content: Array.isArray(i) ? i : dr({ text: n, components: a }),
    status: u,
    metadata: {
      unstable_state: null,
      unstable_annotations: [],
      unstable_data: a,
      steps: [],
      custom: {
        ...d ? { error: d } : {},
        ...f ? { statusText: f } : {},
        ...p ? { statusStage: p } : {},
        ...m ? { statusTool: m } : {},
        ...I ? { statusHistoryText: I } : {},
        ...w ? { ambientStatusText: w } : {},
        ...b ? { revealPulse: b } : {},
        ...S ? { revealMode: S } : {}
      }
    }
  };
}
function nw(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Il(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((f) => f !== a);
  return d.push(a), d.slice(-4);
}
function dl({ id: r, text: n = "", components: i = [] }) {
  const u = !!(typeof n == "string" ? n.trim() : "") || i.length > 0;
  return Pn({
    id: r,
    parts: dr({
      text: u ? n : "Reply stopped.",
      components: i
    }),
    components: i,
    status: {
      type: "incomplete",
      reason: "cancelled"
    },
    statusText: "",
    statusStage: "",
    statusTool: ""
  });
}
function rw(r, n) {
  if (!Array.isArray(r) || !n || r.length === 0)
    return Array.isArray(r) ? [...r] : [];
  const i = [...r], a = i[i.length - 1];
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = dl({
    id: a.id,
    text: Zi(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function sw({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: f, onComponents: p, onSuggestions: m }) {
  const v = Sh(n);
  if (r.runtimeMode === "proxy" && r.apiEndpoint)
    try {
      return await ew({
        apiEndpoint: r.apiEndpoint,
        messages: n,
        abortSignal: i,
        conversationId: a,
        sessionId: u,
        onStatus: d,
        onDelta: f,
        onComponents: p,
        onSuggestions: m
      });
    } catch (b) {
      throw b?.name === "AbortError" || console.error("[AskCrystal] Proxy runtime failed.", b), b;
    }
  const w = U_(v, r.products);
  return {
    answer: w.answer,
    components: w.components || [],
    suggestions: [],
    sourceText: w.answer,
    conversationId: a
  };
}
function iw(r) {
  const [n, i] = C.useState([]), [a, u] = C.useState([]), [d, f] = C.useState(!1), p = C.useRef(null), m = C.useRef(""), v = C.useRef(""), w = C.useRef(!1), b = C.useRef(null), S = C.useRef(n), I = C.useRef(Q_());
  C.useEffect(() => {
    S.current = n;
  }, [n]);
  const P = C.useCallback((Z) => {
    i(rw(Z, w.current));
  }, []), j = C.useCallback((Z, ie) => {
    i(
      (V) => V.map((X) => X.id !== Z ? X : ie(X))
    );
  }, []), z = C.useCallback(async () => {
    const Z = p.current, ie = m.current, V = v.current, X = b.current, re = I.current;
    Z?.abort(), w.current = !0, f(!1), u([]), ie && j(
      ie,
      (Q) => dl({
        id: Q.id,
        text: Zi(Q.content || []),
        components: Q.metadata?.unstable_data || []
      })
    ), !(!V || !r.apiEndpoint) && await Z_({
      apiEndpoint: r.apiEndpoint,
      taskId: V,
      sessionId: re,
      conversationId: X
    });
  }, [r.apiEndpoint, j]), J = C.useCallback(
    async (Z) => {
      if (Z.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      const ie = tw(Z), V = vs("assistant"), X = new AbortController(), re = Pn({
        id: V,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy..."
      }), Q = [...S.current, ie];
      p.current = X, m.current = V, v.current = "", w.current = !1, f(!0), u([]), i([...Q, re]);
      let he = "", Be = [], Le = 0;
      try {
        const Ie = await sw({
          config: r,
          messages: Q,
          abortSignal: X.signal,
          conversationId: b.current,
          sessionId: I.current,
          onStatus: (Oe) => {
            if (X.signal.aborted) return;
            const pe = F_(Oe);
            pe.taskId && (v.current = pe.taskId), j(
              V,
              (me) => Pn({
                id: V,
                parts: dr({
                  text: "",
                  components: []
                }),
                components: [],
                status: {
                  type: "running"
                },
                statusText: pe.message,
                statusStage: pe.stage,
                statusTool: pe.tool,
                statusHistory: nw(me.metadata?.custom?.statusHistoryText, pe),
                ambientStatusText: pe.stage === "tool" ? me.metadata?.custom?.ambientStatusText || "Settling into your energy..." : pe.message
              })
            );
          },
          onComponents: (Oe, pe, me) => {
            if (X.signal.aborted) return;
            const D = kh(me);
            D && (v.current = D), Be = Oe;
          },
          onSuggestions: (Oe) => {
            X.signal.aborted || u(Oe);
          }
        });
        b.current = Ie.conversationId || b.current, v.current = "", w.current = !1;
        const He = Ie.components || Be, it = mh(Ie.suggestions);
        j(
          V,
          () => Pn({
            id: V,
            parts: dr({
              text: "",
              components: []
            }),
            components: [],
            status: {
              type: "running"
            },
            statusText: "",
            statusStage: "",
            statusTool: "",
            statusHistory: []
          })
        ), he = await X_({
          currentAnswer: "",
          nextAnswer: Ie.answer,
          abortSignal: X.signal,
          speed: "final",
          onDelta: (Oe, pe) => {
            X.signal.aborted || (he = pe, j(
              V,
              () => Pn({
                id: V,
                parts: dr({
                  text: pe,
                  components: []
                }),
                components: [],
                status: {
                  type: "running"
                },
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: [],
                revealPulse: Le += 1,
                revealMode: /\n/.test(Oe || "") ? "newline" : "inline"
              })
            ));
          }
        }), i([
          ...Q,
          Pn({
            id: V,
            parts: dr({
              text: Ie.sourceText || he,
              components: He
            }),
            components: He,
            status: {
              type: "complete",
              reason: "stop"
            },
            revealPulse: Le,
            revealMode: ""
          })
        ]), u(it);
      } catch (Ie) {
        if (Ie?.name === "AbortError") {
          v.current = "", u([]), i([
            ...Q,
            dl({
              id: V,
              text: he,
              components: []
            })
          ]);
          return;
        }
        console.error("[AskCrystal] Assistant runtime failed.", Ie), v.current = "", w.current = !1, u([]), i([
          ...Q,
          Pn({
            id: V,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: Ie?.message || "Unknown runtime error"
            },
            error: Ie?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        p.current === X && (p.current = null), m.current === V && (m.current = ""), v.current && X.signal.aborted && (v.current = ""), f(!1);
      }
    },
    [r, j]
  ), ue = C.useMemo(
    () => ({
      messages: n,
      suggestions: a,
      isRunning: d,
      setMessages: P,
      onImport: P,
      onNew: J,
      onCancel: z,
      adapters: {
        threadList: {
          threadId: sl,
          threads: [
            {
              id: sl,
              remoteId: sl,
              title: "AskCrystal"
            }
          ]
        }
      }
    }),
    [d, n, z, J, P, a]
  );
  return {
    runtime: Eg(ue),
    hasUserMessages: n.some((Z) => Z.role === "user")
  };
}
function ow({ product: r }) {
  return /* @__PURE__ */ g.jsxs("a", { className: "ac-homepage__product-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-media", children: r.image ? /* @__PURE__ */ g.jsx("img", { src: r.image, alt: r.title, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__product-meta", children: r.badge || "Bestseller" }),
      /* @__PURE__ */ g.jsx("h3", { children: r.title }),
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__product-link", children: "View product" })
    ] })
  ] });
}
function aw({ config: r }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-shelf", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-shelf-header", children: [
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
        /* @__PURE__ */ g.jsx("h2", { children: r.shelfHeading })
      ] }),
      /* @__PURE__ */ g.jsx("a", { className: "ac-homepage__browse-link", href: r.browseUrl, children: "Browse all" })
    ] }),
    r.products.length ? /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ g.jsx(ow, { product: n }, n.id)) }) : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
  ] });
}
function lw({ card: r }) {
  const n = [
    "ac-homepage__guide-card",
    r.layout ? `ac-homepage__guide-card--${r.layout}` : ""
  ].filter(Boolean).join(" "), i = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-card-copy", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__guide-card-eyebrow", children: r.eyebrow }),
      /* @__PURE__ */ g.jsx("h3", { children: r.title }),
      /* @__PURE__ */ g.jsx("p", { children: r.description })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__guide-card-footer", children: /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-card-action", children: r.cta }) })
  ] });
  return r.prompt ? /* @__PURE__ */ g.jsx(
    ah,
    {
      className: n,
      prompt: r.prompt,
      send: !0,
      children: i
    }
  ) : /* @__PURE__ */ g.jsx("a", { className: n, href: r.href, children: i });
}
function uw({ config: r }) {
  const n = [
    {
      id: "compatibility",
      layout: "portrait",
      eyebrow: "Relationships",
      title: "Read love and compatibility",
      description: "Explore soulmate patterns, synastry, and relationship guidance through East-meets-West metaphysics.",
      cta: "Open compatibility",
      prompt: "Can you do a love and compatibility reading for me?"
    },
    {
      id: "divination",
      layout: "portrait",
      eyebrow: "Readings",
      title: "Tarot, Bazi, and energy readings",
      description: "Use tarot, destiny reading, astrology, or a daily check-in to understand the pattern before you shop.",
      cta: "Start a reading",
      prompt: "Give me a reading using the best method for my current situation."
    },
    {
      id: "ask-anything",
      layout: "wide",
      eyebrow: "Open chat",
      title: "Ask anything about crystals, rituals, or life",
      description: "Start with a question, a feeling, or a life situation. AskCrystal can guide, explain, and recommend without hiding the store.",
      cta: "Ask AskCrystal",
      prompt: "I have a situation in my life and want guidance plus crystal recommendations."
    },
    {
      id: "ritual-plan",
      layout: "compact",
      eyebrow: "Daily support",
      title: "Build a practical ritual",
      description: "Get a simple cleansing, charging, or intention-setting plan around the stones you choose.",
      cta: "Build my ritual",
      prompt: "Help me build a simple crystal ritual for what I need right now."
    },
    {
      id: "browse-store",
      layout: "strip",
      eyebrow: "Storefront",
      title: "Browse the full crystal shop",
      description: "Open the wider shelf, then return to the conversation whenever you want guidance.",
      cta: "Browse all products",
      href: r.browseUrl
    }
  ];
  return /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__welcome", children: /* @__PURE__ */ g.jsxs("section", { className: "ac-homepage__guide", "aria-label": "Guided AskCrystal paths", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-header", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__guide-kicker", children: r.eyebrow }),
      /* @__PURE__ */ g.jsx("h1", { className: "ac-homepage__guide-title", children: r.heading })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-grid", children: [
      n.map((i) => /* @__PURE__ */ g.jsx(lw, { card: i }, i.id)),
      /* @__PURE__ */ g.jsx(aw, { config: r })
    ] })
  ] }) });
}
function cw() {
  const r = C.useRef(null), [n, i] = C.useState(!1), a = C.useCallback(() => {
    const u = r.current;
    if (!u) {
      i(!1);
      return;
    }
    const d = u.scrollHeight > u.clientHeight + 2;
    i((f) => f === d ? f : d);
  }, []);
  return C.useEffect(() => {
    const u = window.requestAnimationFrame(a);
    return () => window.cancelAnimationFrame(u);
  }, [a]), /* @__PURE__ */ g.jsx(Xf, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ g.jsx(
          eh,
          {
            ref: r,
            className: "ac-homepage__composer-input",
            placeholder: "What guidance or crystal do you need today?",
            minRows: 1,
            maxRows: w_,
            autoFocus: !1,
            onChange: () => {
              window.requestAnimationFrame(a);
            },
            onHeightChange: () => {
              window.requestAnimationFrame(a);
            }
          }
        ),
        /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__composer-actions", children: [
          /* @__PURE__ */ g.jsx(cl, { running: !1, children: /* @__PURE__ */ g.jsx(iv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ g.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ g.jsx(cl, { running: !0, children: /* @__PURE__ */ g.jsx(Ev, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function dw() {
  return typeof document > "u" ? null : Nm.createPortal(
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ g.jsx(cw, {}) }),
    document.body
  );
}
function fw() {
  return /* @__PURE__ */ g.jsx(El, { className: "ac-message ac-message--user", children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ g.jsx(bl, {}) }) });
}
function hw() {
  const r = Rt((d) => d.id || ""), n = Rt((d) => d.status?.type === "complete"), i = ve(({ thread: d }) => d.suggestions || []), a = ve(({ thread: d }) => d.isRunning), u = ve(({ thread: d }) => {
    for (let f = d.messages.length - 1; f >= 0; f -= 1) {
      const p = d.messages[f];
      if (p?.role === "assistant")
        return p.id === r;
    }
    return !1;
  });
  return !n || a || !u || !i.length ? null : /* @__PURE__ */ g.jsx("div", { className: "ac-message__suggestions", "aria-label": "Suggested follow-up prompts", children: i.map((d, f) => /* @__PURE__ */ g.jsx(
    ah,
    {
      className: "ac-message__suggestion",
      prompt: d.prompt,
      send: !0,
      children: d.prompt
    },
    `${r}-suggestion-${f}-${d.prompt}`
  )) });
}
function pw() {
  const r = Rt((z) => z.content || z.parts || []), n = Zi(r), i = r.some((z) => z.type === "tool-call"), a = Rt((z) => z.status?.type === "running"), u = Rt((z) => z.metadata?.custom?.statusText || ""), d = Rt((z) => z.metadata?.custom?.statusStage || ""), f = Rt((z) => z.metadata?.custom?.statusTool || ""), p = Rt((z) => z.metadata?.custom?.statusHistoryText || ""), m = Rt((z) => z.metadata?.custom?.ambientStatusText || ""), v = Rt((z) => Number(z.metadata?.custom?.revealPulse || 0)), w = Rt((z) => z.metadata?.custom?.revealMode || ""), b = wh(), S = a && !n && !i, I = a && (!!n || i) && d === "tool" && !!u, P = !b && v > 0 ? v % 2 === 0 ? " is-revealing-a" : " is-revealing-b" : "", j = !b && w ? ` is-reveal-${w}` : "";
  return /* @__PURE__ */ g.jsxs(El, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: S ? /* @__PURE__ */ g.jsx(
      z_,
      {
        statusText: u,
        statusHistoryText: p,
        statusStage: d,
        statusTool: f,
        ambientStatusText: m
      }
    ) : /* @__PURE__ */ g.jsx("div", { className: `ac-message__content-layer${P}${j}`, children: /* @__PURE__ */ g.jsx(
      bl,
      {
        components: {
          Text: ({ text: z }) => /* @__PURE__ */ g.jsx(gh, { text: z }),
          ...v_
        }
      }
    ) }) }),
    I ? /* @__PURE__ */ g.jsx("div", { className: "ac-message__status", children: /* @__PURE__ */ g.jsx(D_, { statusText: u }) }) : null,
    /* @__PURE__ */ g.jsx(hw, {}),
    /* @__PURE__ */ g.jsx(Kf, { children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function mw({ config: r }) {
  const { runtime: n, hasUserMessages: i } = iw(r), a = C.useRef(null), u = C.useRef(!1);
  return C.useEffect(() => {
    if (!a.current) return;
    const f = window.requestAnimationFrame(() => {
      if (a.current) {
        if (!i) {
          u.current = !1, a.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        u.current || (u.current = !0, a.current.scrollTo({ top: a.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame(f);
  }, [i]), /* @__PURE__ */ g.jsx(Ey, { runtime: n, children: /* @__PURE__ */ g.jsx("div", { className: "ac-homepage", children: /* @__PURE__ */ g.jsx(th, { className: "ac-homepage__thread", children: /* @__PURE__ */ g.jsxs(
    rh,
    {
      ref: a,
      className: "ac-homepage__viewport",
      autoScroll: i,
      turnAnchor: i ? "bottom" : "top",
      scrollToBottomOnInitialize: !1,
      scrollToBottomOnRunStart: i,
      scrollToBottomOnThreadSwitch: i,
      children: [
        /* @__PURE__ */ g.jsx(uw, { config: r }),
        /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ g.jsx(
          Nv,
          {
            components: {
              UserMessage: fw,
              AssistantMessage: pw
            }
          }
        ) }),
        /* @__PURE__ */ g.jsx(dw, {})
      ]
    }
  ) }) }) });
}
function gw(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || Wi.has(i)) return;
  const a = S_(n);
  if (!a) return;
  const u = Am.createRoot(r);
  u.render(/* @__PURE__ */ g.jsx(mw, { config: a })), Wi.set(i, u);
}
function yw(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = Wi.get(n);
  i && (i.unmount(), Wi.delete(n));
}
function bh(r = document) {
  r.querySelectorAll(ph).forEach((n) => gw(n));
}
function vw(r) {
  r.querySelectorAll(ph).forEach((n) => yw(n));
}
bh();
document.addEventListener("shopify:section:load", (r) => {
  bh(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  vw(r.target);
});
