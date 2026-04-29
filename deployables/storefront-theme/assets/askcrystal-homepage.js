function sg(r, n) {
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
function Lf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var sl = { exports: {} }, ds = {}, il = { exports: {} }, ce = {};
var Ud;
function ig() {
  if (Ud) return ce;
  Ud = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), h = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), E = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function S(w) {
    return w === null || typeof w != "object" ? null : (w = b && w[b] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var A = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, N = Object.assign, L = {};
  function D(w, R, H) {
    this.props = w, this.context = R, this.refs = L, this.updater = H || A;
  }
  D.prototype.isReactComponent = {}, D.prototype.setState = function(w, R) {
    if (typeof w != "object" && typeof w != "function" && w != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, w, R, "setState");
  }, D.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function V() {
  }
  V.prototype = D.prototype;
  function K(w, R, H) {
    this.props = w, this.context = R, this.refs = L, this.updater = H || A;
  }
  var F = K.prototype = new V();
  F.constructor = K, N(F, D.prototype), F.isPureReactComponent = !0;
  var se = Array.isArray, he = Object.prototype.hasOwnProperty, U = { current: null }, ie = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Q(w, R, H) {
    var ne, re = {}, ee = null, ue = null;
    if (R != null) for (ne in R.ref !== void 0 && (ue = R.ref), R.key !== void 0 && (ee = "" + R.key), R) he.call(R, ne) && !ie.hasOwnProperty(ne) && (re[ne] = R[ne]);
    var oe = arguments.length - 2;
    if (oe === 1) re.children = H;
    else if (1 < oe) {
      for (var ae = Array(oe), De = 0; De < oe; De++) ae[De] = arguments[De + 2];
      re.children = ae;
    }
    if (w && w.defaultProps) for (ne in oe = w.defaultProps, oe) re[ne] === void 0 && (re[ne] = oe[ne]);
    return { $$typeof: r, type: w, key: ee, ref: ue, props: re, _owner: U.current };
  }
  function le(w, R) {
    return { $$typeof: r, type: w.type, key: R, ref: w.ref, props: w.props, _owner: w._owner };
  }
  function ge(w) {
    return typeof w == "object" && w !== null && w.$$typeof === r;
  }
  function Ee(w) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(H) {
      return R[H];
    });
  }
  var ye = /\/+/g;
  function be(w, R) {
    return typeof w == "object" && w !== null && w.key != null ? Ee("" + w.key) : R.toString(36);
  }
  function Ce(w, R, H, ne, re) {
    var ee = typeof w;
    (ee === "undefined" || ee === "boolean") && (w = null);
    var ue = !1;
    if (w === null) ue = !0;
    else switch (ee) {
      case "string":
      case "number":
        ue = !0;
        break;
      case "object":
        switch (w.$$typeof) {
          case r:
          case n:
            ue = !0;
        }
    }
    if (ue) return ue = w, re = re(ue), w = ne === "" ? "." + be(ue, 0) : ne, se(re) ? (H = "", w != null && (H = w.replace(ye, "$&/") + "/"), Ce(re, R, H, "", function(De) {
      return De;
    })) : re != null && (ge(re) && (re = le(re, H + (!re.key || ue && ue.key === re.key ? "" : ("" + re.key).replace(ye, "$&/") + "/") + w)), R.push(re)), 1;
    if (ue = 0, ne = ne === "" ? "." : ne + ":", se(w)) for (var oe = 0; oe < w.length; oe++) {
      ee = w[oe];
      var ae = ne + be(ee, oe);
      ue += Ce(ee, R, H, ae, re);
    }
    else if (ae = S(w), typeof ae == "function") for (w = ae.call(w), oe = 0; !(ee = w.next()).done; ) ee = ee.value, ae = ne + be(ee, oe++), ue += Ce(ee, R, H, ae, re);
    else if (ee === "object") throw R = String(w), Error("Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead.");
    return ue;
  }
  function He(w, R, H) {
    if (w == null) return w;
    var ne = [], re = 0;
    return Ce(w, ne, "", "", function(ee) {
      return R.call(H, ee, re++);
    }), ne;
  }
  function Pe(w) {
    if (w._status === -1) {
      var R = w._result;
      R = R(), R.then(function(H) {
        (w._status === 0 || w._status === -1) && (w._status = 1, w._result = H);
      }, function(H) {
        (w._status === 0 || w._status === -1) && (w._status = 2, w._result = H);
      }), w._status === -1 && (w._status = 0, w._result = R);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var ve = { current: null }, B = { transition: null }, Z = { ReactCurrentDispatcher: ve, ReactCurrentBatchConfig: B, ReactCurrentOwner: U };
  function M() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ce.Children = { map: He, forEach: function(w, R, H) {
    He(w, function() {
      R.apply(this, arguments);
    }, H);
  }, count: function(w) {
    var R = 0;
    return He(w, function() {
      R++;
    }), R;
  }, toArray: function(w) {
    return He(w, function(R) {
      return R;
    }) || [];
  }, only: function(w) {
    if (!ge(w)) throw Error("React.Children.only expected to receive a single React element child.");
    return w;
  } }, ce.Component = D, ce.Fragment = i, ce.Profiler = u, ce.PureComponent = K, ce.StrictMode = a, ce.Suspense = g, ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, ce.act = M, ce.cloneElement = function(w, R, H) {
    if (w == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + w + ".");
    var ne = N({}, w.props), re = w.key, ee = w.ref, ue = w._owner;
    if (R != null) {
      if (R.ref !== void 0 && (ee = R.ref, ue = U.current), R.key !== void 0 && (re = "" + R.key), w.type && w.type.defaultProps) var oe = w.type.defaultProps;
      for (ae in R) he.call(R, ae) && !ie.hasOwnProperty(ae) && (ne[ae] = R[ae] === void 0 && oe !== void 0 ? oe[ae] : R[ae]);
    }
    var ae = arguments.length - 2;
    if (ae === 1) ne.children = H;
    else if (1 < ae) {
      oe = Array(ae);
      for (var De = 0; De < ae; De++) oe[De] = arguments[De + 2];
      ne.children = oe;
    }
    return { $$typeof: r, type: w.type, key: re, ref: ee, props: ne, _owner: ue };
  }, ce.createContext = function(w) {
    return w = { $$typeof: h, _currentValue: w, _currentValue2: w, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, w.Provider = { $$typeof: d, _context: w }, w.Consumer = w;
  }, ce.createElement = Q, ce.createFactory = function(w) {
    var R = Q.bind(null, w);
    return R.type = w, R;
  }, ce.createRef = function() {
    return { current: null };
  }, ce.forwardRef = function(w) {
    return { $$typeof: p, render: w };
  }, ce.isValidElement = ge, ce.lazy = function(w) {
    return { $$typeof: E, _payload: { _status: -1, _result: w }, _init: Pe };
  }, ce.memo = function(w, R) {
    return { $$typeof: v, type: w, compare: R === void 0 ? null : R };
  }, ce.startTransition = function(w) {
    var R = B.transition;
    B.transition = {};
    try {
      w();
    } finally {
      B.transition = R;
    }
  }, ce.unstable_act = M, ce.useCallback = function(w, R) {
    return ve.current.useCallback(w, R);
  }, ce.useContext = function(w) {
    return ve.current.useContext(w);
  }, ce.useDebugValue = function() {
  }, ce.useDeferredValue = function(w) {
    return ve.current.useDeferredValue(w);
  }, ce.useEffect = function(w, R) {
    return ve.current.useEffect(w, R);
  }, ce.useId = function() {
    return ve.current.useId();
  }, ce.useImperativeHandle = function(w, R, H) {
    return ve.current.useImperativeHandle(w, R, H);
  }, ce.useInsertionEffect = function(w, R) {
    return ve.current.useInsertionEffect(w, R);
  }, ce.useLayoutEffect = function(w, R) {
    return ve.current.useLayoutEffect(w, R);
  }, ce.useMemo = function(w, R) {
    return ve.current.useMemo(w, R);
  }, ce.useReducer = function(w, R, H) {
    return ve.current.useReducer(w, R, H);
  }, ce.useRef = function(w) {
    return ve.current.useRef(w);
  }, ce.useState = function(w) {
    return ve.current.useState(w);
  }, ce.useSyncExternalStore = function(w, R, H) {
    return ve.current.useSyncExternalStore(w, R, H);
  }, ce.useTransition = function() {
    return ve.current.useTransition();
  }, ce.version = "18.3.1", ce;
}
var $d;
function Nl() {
  return $d || ($d = 1, il.exports = ig()), il.exports;
}
var Hd;
function og() {
  if (Hd) return ds;
  Hd = 1;
  var r = Nl(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(p, g, v) {
    var E, b = {}, S = null, A = null;
    v !== void 0 && (S = "" + v), g.key !== void 0 && (S = "" + g.key), g.ref !== void 0 && (A = g.ref);
    for (E in g) a.call(g, E) && !d.hasOwnProperty(E) && (b[E] = g[E]);
    if (p && p.defaultProps) for (E in g = p.defaultProps, g) b[E] === void 0 && (b[E] = g[E]);
    return { $$typeof: n, type: p, key: S, ref: A, props: b, _owner: u.current };
  }
  return ds.Fragment = i, ds.jsx = h, ds.jsxs = h, ds;
}
var Vd;
function ag() {
  return Vd || (Vd = 1, sl.exports = og()), sl.exports;
}
var m = ag(), k = Nl();
const Nt = /* @__PURE__ */ Lf(k), lg = /* @__PURE__ */ sg({
  __proto__: null,
  default: Nt
}, [k]);
var Di = {}, ol = { exports: {} }, at = {}, al = { exports: {} }, ll = {};
var Wd;
function ug() {
  return Wd || (Wd = 1, (function(r) {
    function n(B, Z) {
      var M = B.length;
      B.push(Z);
      e: for (; 0 < M; ) {
        var w = M - 1 >>> 1, R = B[w];
        if (0 < u(R, Z)) B[w] = Z, B[M] = R, M = w;
        else break e;
      }
    }
    function i(B) {
      return B.length === 0 ? null : B[0];
    }
    function a(B) {
      if (B.length === 0) return null;
      var Z = B[0], M = B.pop();
      if (M !== Z) {
        B[0] = M;
        e: for (var w = 0, R = B.length, H = R >>> 1; w < H; ) {
          var ne = 2 * (w + 1) - 1, re = B[ne], ee = ne + 1, ue = B[ee];
          if (0 > u(re, M)) ee < R && 0 > u(ue, re) ? (B[w] = ue, B[ee] = M, w = ee) : (B[w] = re, B[ne] = M, w = ne);
          else if (ee < R && 0 > u(ue, M)) B[w] = ue, B[ee] = M, w = ee;
          else break e;
        }
      }
      return Z;
    }
    function u(B, Z) {
      var M = B.sortIndex - Z.sortIndex;
      return M !== 0 ? M : B.id - Z.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      r.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, p = h.now();
      r.unstable_now = function() {
        return h.now() - p;
      };
    }
    var g = [], v = [], E = 1, b = null, S = 3, A = !1, N = !1, L = !1, D = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function F(B) {
      for (var Z = i(v); Z !== null; ) {
        if (Z.callback === null) a(v);
        else if (Z.startTime <= B) a(v), Z.sortIndex = Z.expirationTime, n(g, Z);
        else break;
        Z = i(v);
      }
    }
    function se(B) {
      if (L = !1, F(B), !N) if (i(g) !== null) N = !0, Pe(he);
      else {
        var Z = i(v);
        Z !== null && ve(se, Z.startTime - B);
      }
    }
    function he(B, Z) {
      N = !1, L && (L = !1, V(Q), Q = -1), A = !0;
      var M = S;
      try {
        for (F(Z), b = i(g); b !== null && (!(b.expirationTime > Z) || B && !Ee()); ) {
          var w = b.callback;
          if (typeof w == "function") {
            b.callback = null, S = b.priorityLevel;
            var R = w(b.expirationTime <= Z);
            Z = r.unstable_now(), typeof R == "function" ? b.callback = R : b === i(g) && a(g), F(Z);
          } else a(g);
          b = i(g);
        }
        if (b !== null) var H = !0;
        else {
          var ne = i(v);
          ne !== null && ve(se, ne.startTime - Z), H = !1;
        }
        return H;
      } finally {
        b = null, S = M, A = !1;
      }
    }
    var U = !1, ie = null, Q = -1, le = 5, ge = -1;
    function Ee() {
      return !(r.unstable_now() - ge < le);
    }
    function ye() {
      if (ie !== null) {
        var B = r.unstable_now();
        ge = B;
        var Z = !0;
        try {
          Z = ie(!0, B);
        } finally {
          Z ? be() : (U = !1, ie = null);
        }
      } else U = !1;
    }
    var be;
    if (typeof K == "function") be = function() {
      K(ye);
    };
    else if (typeof MessageChannel < "u") {
      var Ce = new MessageChannel(), He = Ce.port2;
      Ce.port1.onmessage = ye, be = function() {
        He.postMessage(null);
      };
    } else be = function() {
      D(ye, 0);
    };
    function Pe(B) {
      ie = B, U || (U = !0, be());
    }
    function ve(B, Z) {
      Q = D(function() {
        B(r.unstable_now());
      }, Z);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, r.unstable_continueExecution = function() {
      N || A || (N = !0, Pe(he));
    }, r.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : le = 0 < B ? Math.floor(1e3 / B) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(g);
    }, r.unstable_next = function(B) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = S;
      }
      var M = S;
      S = Z;
      try {
        return B();
      } finally {
        S = M;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(B, Z) {
      switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          B = 3;
      }
      var M = S;
      S = B;
      try {
        return Z();
      } finally {
        S = M;
      }
    }, r.unstable_scheduleCallback = function(B, Z, M) {
      var w = r.unstable_now();
      switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? w + M : w) : M = w, B) {
        case 1:
          var R = -1;
          break;
        case 2:
          R = 250;
          break;
        case 5:
          R = 1073741823;
          break;
        case 4:
          R = 1e4;
          break;
        default:
          R = 5e3;
      }
      return R = M + R, B = { id: E++, callback: Z, priorityLevel: B, startTime: M, expirationTime: R, sortIndex: -1 }, M > w ? (B.sortIndex = M, n(v, B), i(g) === null && B === i(v) && (L ? (V(Q), Q = -1) : L = !0, ve(se, M - w))) : (B.sortIndex = R, n(g, B), N || A || (N = !0, Pe(he))), B;
    }, r.unstable_shouldYield = Ee, r.unstable_wrapCallback = function(B) {
      var Z = S;
      return function() {
        var M = S;
        S = Z;
        try {
          return B.apply(this, arguments);
        } finally {
          S = M;
        }
      };
    };
  })(ll)), ll;
}
var Yd;
function cg() {
  return Yd || (Yd = 1, al.exports = ug()), al.exports;
}
var Gd;
function dg() {
  if (Gd) return at;
  Gd = 1;
  var r = Nl(), n = cg();
  function i(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, s = 1; s < arguments.length; s++) t += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), u = {};
  function d(e, t) {
    h(e, t), h(e + "Capture", t);
  }
  function h(e, t) {
    for (u[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, E = {}, b = {};
  function S(e) {
    return g.call(b, e) ? !0 : g.call(E, e) ? !1 : v.test(e) ? b[e] = !0 : (E[e] = !0, !1);
  }
  function A(e, t, s, o) {
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
  function N(e, t, s, o) {
    if (t === null || typeof t > "u" || A(e, t, s, o)) return !0;
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
  function L(e, t, s, o, l, c, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = s, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = f;
  }
  var D = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    D[e] = new L(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    D[t] = new L(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    D[e] = new L(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    D[e] = new L(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    D[e] = new L(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    D[e] = new L(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    D[e] = new L(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    D[e] = new L(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    D[e] = new L(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var V = /[\-:]([a-z])/g;
  function K(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      V,
      K
    );
    D[t] = new L(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(V, K);
    D[t] = new L(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(V, K);
    D[t] = new L(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    D[e] = new L(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), D.xlinkHref = new L("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    D[e] = new L(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function F(e, t, s, o) {
    var l = D.hasOwnProperty(t) ? D[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (N(t, s, l, o) && (s = null), o || l === null ? S(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var se = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, he = /* @__PURE__ */ Symbol.for("react.element"), U = /* @__PURE__ */ Symbol.for("react.portal"), ie = /* @__PURE__ */ Symbol.for("react.fragment"), Q = /* @__PURE__ */ Symbol.for("react.strict_mode"), le = /* @__PURE__ */ Symbol.for("react.profiler"), ge = /* @__PURE__ */ Symbol.for("react.provider"), Ee = /* @__PURE__ */ Symbol.for("react.context"), ye = /* @__PURE__ */ Symbol.for("react.forward_ref"), be = /* @__PURE__ */ Symbol.for("react.suspense"), Ce = /* @__PURE__ */ Symbol.for("react.suspense_list"), He = /* @__PURE__ */ Symbol.for("react.memo"), Pe = /* @__PURE__ */ Symbol.for("react.lazy"), ve = /* @__PURE__ */ Symbol.for("react.offscreen"), B = Symbol.iterator;
  function Z(e) {
    return e === null || typeof e != "object" ? null : (e = B && e[B] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var M = Object.assign, w;
  function R(e) {
    if (w === void 0) try {
      throw Error();
    } catch (s) {
      var t = s.stack.trim().match(/\n( *(at )?)/);
      w = t && t[1] || "";
    }
    return `
` + w + e;
  }
  var H = !1;
  function ne(e, t) {
    if (!e || H) return "";
    H = !0;
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
        } catch (I) {
          var o = I;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (I) {
          o = I;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (I) {
          o = I;
        }
        e();
      }
    } catch (I) {
      if (I && o && typeof I.stack == "string") {
        for (var l = I.stack.split(`
`), c = o.stack.split(`
`), f = l.length - 1, y = c.length - 1; 1 <= f && 0 <= y && l[f] !== c[y]; ) y--;
        for (; 1 <= f && 0 <= y; f--, y--) if (l[f] !== c[y]) {
          if (f !== 1 || y !== 1)
            do
              if (f--, y--, 0 > y || l[f] !== c[y]) {
                var _ = `
` + l[f].replace(" at new ", " at ");
                return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), _;
              }
            while (1 <= f && 0 <= y);
          break;
        }
      }
    } finally {
      H = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? R(e) : "";
  }
  function re(e) {
    switch (e.tag) {
      case 5:
        return R(e.type);
      case 16:
        return R("Lazy");
      case 13:
        return R("Suspense");
      case 19:
        return R("SuspenseList");
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
  function ee(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ie:
        return "Fragment";
      case U:
        return "Portal";
      case le:
        return "Profiler";
      case Q:
        return "StrictMode";
      case be:
        return "Suspense";
      case Ce:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ee:
        return (e.displayName || "Context") + ".Consumer";
      case ge:
        return (e._context.displayName || "Context") + ".Provider";
      case ye:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case He:
        return t = e.displayName || null, t !== null ? t : ee(e.type) || "Memo";
      case Pe:
        t = e._payload, e = e._init;
        try {
          return ee(e(t));
        } catch {
        }
    }
    return null;
  }
  function ue(e) {
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
        return ee(t);
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
  function oe(e) {
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
  function ae(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function De(e) {
    var t = ae(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var l = s.get, c = s.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(f) {
        o = "" + f, c.call(this, f);
      } }), Object.defineProperty(e, t, { enumerable: s.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(f) {
        o = "" + f;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Tn(e) {
    e._valueTracker || (e._valueTracker = De(e));
  }
  function on(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = ae(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
  }
  function qn(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function wt(e, t) {
    var s = t.checked;
    return M({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function Le(e, t) {
    var s = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    s = oe(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Fe(e, t) {
    t = t.checked, t != null && F(e, "checked", t, !1);
  }
  function Je(e, t) {
    Fe(e, t);
    var s = oe(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? xt(e, t.type, s) : t.hasOwnProperty("defaultValue") && xt(e, t.type, oe(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function St(e, t, s) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function xt(e, t, s) {
    (t !== "number" || qn(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var ht = Array.isArray;
  function Qn(e, t, s, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < s.length; l++) t["$" + s[l]] = !0;
      for (s = 0; s < e.length; s++) l = t.hasOwnProperty("$" + e[s].value), e[s].selected !== l && (e[s].selected = l), l && o && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + oe(s), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === s) {
          e[l].selected = !0, o && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function po(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return M({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Jl(e, t) {
    var s = t.value;
    if (s == null) {
      if (s = t.children, t = t.defaultValue, s != null) {
        if (t != null) throw Error(i(92));
        if (ht(s)) {
          if (1 < s.length) throw Error(i(93));
          s = s[0];
        }
        t = s;
      }
      t == null && (t = ""), s = t;
    }
    e._wrapperState = { initialValue: oe(s) };
  }
  function Xl(e, t) {
    var s = oe(t.value), o = oe(t.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), t.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), o != null && (e.defaultValue = "" + o);
  }
  function Zl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function eu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function mo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? eu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var As, tu = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, s, o, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, s, o, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (As = As || document.createElement("div"), As.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = As.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Tr(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ir = {
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
  }, lp = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ir).forEach(function(e) {
    lp.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Ir[t] = Ir[e];
    });
  });
  function nu(e, t, s) {
    return t == null || typeof t == "boolean" || t === "" ? "" : s || typeof t != "number" || t === 0 || Ir.hasOwnProperty(e) && Ir[e] ? ("" + t).trim() : t + "px";
  }
  function ru(e, t) {
    e = e.style;
    for (var s in t) if (t.hasOwnProperty(s)) {
      var o = s.indexOf("--") === 0, l = nu(s, t[s], o);
      s === "float" && (s = "cssFloat"), o ? e.setProperty(s, l) : e[s] = l;
    }
  }
  var up = M({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function go(e, t) {
    if (t) {
      if (up[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function yo(e, t) {
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
  var vo = null;
  function _o(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var wo = null, Kn = null, Jn = null;
  function su(e) {
    if (e = Kr(e)) {
      if (typeof wo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = Zs(t), wo(e.stateNode, e.type, t));
    }
  }
  function iu(e) {
    Kn ? Jn ? Jn.push(e) : Jn = [e] : Kn = e;
  }
  function ou() {
    if (Kn) {
      var e = Kn, t = Jn;
      if (Jn = Kn = null, su(e), t) for (e = 0; e < t.length; e++) su(t[e]);
    }
  }
  function au(e, t) {
    return e(t);
  }
  function lu() {
  }
  var So = !1;
  function uu(e, t, s) {
    if (So) return e(t, s);
    So = !0;
    try {
      return au(e, t, s);
    } finally {
      So = !1, (Kn !== null || Jn !== null) && (lu(), ou());
    }
  }
  function Rr(e, t) {
    var s = e.stateNode;
    if (s === null) return null;
    var o = Zs(s);
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
  var xo = !1;
  if (p) try {
    var Ar = {};
    Object.defineProperty(Ar, "passive", { get: function() {
      xo = !0;
    } }), window.addEventListener("test", Ar, Ar), window.removeEventListener("test", Ar, Ar);
  } catch {
    xo = !1;
  }
  function cp(e, t, s, o, l, c, f, y, _) {
    var I = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, I);
    } catch (j) {
      this.onError(j);
    }
  }
  var Mr = !1, Ms = null, Ns = !1, Eo = null, dp = { onError: function(e) {
    Mr = !0, Ms = e;
  } };
  function fp(e, t, s, o, l, c, f, y, _) {
    Mr = !1, Ms = null, cp.apply(dp, arguments);
  }
  function hp(e, t, s, o, l, c, f, y, _) {
    if (fp.apply(this, arguments), Mr) {
      if (Mr) {
        var I = Ms;
        Mr = !1, Ms = null;
      } else throw Error(i(198));
      Ns || (Ns = !0, Eo = I);
    }
  }
  function In(e) {
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
  function cu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function du(e) {
    if (In(e) !== e) throw Error(i(188));
  }
  function pp(e) {
    var t = e.alternate;
    if (!t) {
      if (t = In(e), t === null) throw Error(i(188));
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
          if (c === s) return du(l), e;
          if (c === o) return du(l), t;
          c = c.sibling;
        }
        throw Error(i(188));
      }
      if (s.return !== o.return) s = l, o = c;
      else {
        for (var f = !1, y = l.child; y; ) {
          if (y === s) {
            f = !0, s = l, o = c;
            break;
          }
          if (y === o) {
            f = !0, o = l, s = c;
            break;
          }
          y = y.sibling;
        }
        if (!f) {
          for (y = c.child; y; ) {
            if (y === s) {
              f = !0, s = c, o = l;
              break;
            }
            if (y === o) {
              f = !0, o = c, s = l;
              break;
            }
            y = y.sibling;
          }
          if (!f) throw Error(i(189));
        }
      }
      if (s.alternate !== o) throw Error(i(190));
    }
    if (s.tag !== 3) throw Error(i(188));
    return s.stateNode.current === s ? e : t;
  }
  function fu(e) {
    return e = pp(e), e !== null ? hu(e) : null;
  }
  function hu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = hu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var pu = n.unstable_scheduleCallback, mu = n.unstable_cancelCallback, mp = n.unstable_shouldYield, gp = n.unstable_requestPaint, Me = n.unstable_now, yp = n.unstable_getCurrentPriorityLevel, ko = n.unstable_ImmediatePriority, gu = n.unstable_UserBlockingPriority, Ps = n.unstable_NormalPriority, vp = n.unstable_LowPriority, yu = n.unstable_IdlePriority, js = null, zt = null;
  function _p(e) {
    if (zt && typeof zt.onCommitFiberRoot == "function") try {
      zt.onCommitFiberRoot(js, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Et = Math.clz32 ? Math.clz32 : xp, wp = Math.log, Sp = Math.LN2;
  function xp(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (wp(e) / Sp | 0) | 0;
  }
  var Ls = 64, Os = 4194304;
  function Nr(e) {
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
  function zs(e, t) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var o = 0, l = e.suspendedLanes, c = e.pingedLanes, f = s & 268435455;
    if (f !== 0) {
      var y = f & ~l;
      y !== 0 ? o = Nr(y) : (c &= f, c !== 0 && (o = Nr(c)));
    } else f = s & ~l, f !== 0 ? o = Nr(f) : c !== 0 && (o = Nr(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - Et(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function Ep(e, t) {
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
  function kp(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var f = 31 - Et(c), y = 1 << f, _ = l[f];
      _ === -1 ? ((y & s) === 0 || (y & o) !== 0) && (l[f] = Ep(y, t)) : _ <= t && (e.expiredLanes |= y), c &= ~y;
    }
  }
  function bo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function vu() {
    var e = Ls;
    return Ls <<= 1, (Ls & 4194240) === 0 && (Ls = 64), e;
  }
  function Co(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Pr(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Et(t), e[t] = s;
  }
  function bp(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - Et(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function To(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - Et(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var me = 0;
  function _u(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var wu, Io, Su, xu, Eu, Ro = !1, Ds = [], an = null, ln = null, un = null, jr = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), cn = [], Cp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ku(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        an = null;
        break;
      case "dragenter":
      case "dragleave":
        ln = null;
        break;
      case "mouseover":
      case "mouseout":
        un = null;
        break;
      case "pointerover":
      case "pointerout":
        jr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Lr.delete(t.pointerId);
    }
  }
  function Or(e, t, s, o, l, c) {
    return e === null || e.nativeEvent !== c ? (e = { blockedOn: t, domEventName: s, eventSystemFlags: o, nativeEvent: c, targetContainers: [l] }, t !== null && (t = Kr(t), t !== null && Io(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Tp(e, t, s, o, l) {
    switch (t) {
      case "focusin":
        return an = Or(an, e, t, s, o, l), !0;
      case "dragenter":
        return ln = Or(ln, e, t, s, o, l), !0;
      case "mouseover":
        return un = Or(un, e, t, s, o, l), !0;
      case "pointerover":
        var c = l.pointerId;
        return jr.set(c, Or(jr.get(c) || null, e, t, s, o, l)), !0;
      case "gotpointercapture":
        return c = l.pointerId, Lr.set(c, Or(Lr.get(c) || null, e, t, s, o, l)), !0;
    }
    return !1;
  }
  function bu(e) {
    var t = Rn(e.target);
    if (t !== null) {
      var s = In(t);
      if (s !== null) {
        if (t = s.tag, t === 13) {
          if (t = cu(s), t !== null) {
            e.blockedOn = t, Eu(e.priority, function() {
              Su(s);
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
  function Fs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var s = Mo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        vo = o, s.target.dispatchEvent(o), vo = null;
      } else return t = Kr(s), t !== null && Io(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function Cu(e, t, s) {
    Fs(e) && s.delete(t);
  }
  function Ip() {
    Ro = !1, an !== null && Fs(an) && (an = null), ln !== null && Fs(ln) && (ln = null), un !== null && Fs(un) && (un = null), jr.forEach(Cu), Lr.forEach(Cu);
  }
  function zr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ro || (Ro = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Ip)));
  }
  function Dr(e) {
    function t(l) {
      return zr(l, e);
    }
    if (0 < Ds.length) {
      zr(Ds[0], e);
      for (var s = 1; s < Ds.length; s++) {
        var o = Ds[s];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (an !== null && zr(an, e), ln !== null && zr(ln, e), un !== null && zr(un, e), jr.forEach(t), Lr.forEach(t), s = 0; s < cn.length; s++) o = cn[s], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < cn.length && (s = cn[0], s.blockedOn === null); ) bu(s), s.blockedOn === null && cn.shift();
  }
  var Xn = se.ReactCurrentBatchConfig, Bs = !0;
  function Rp(e, t, s, o) {
    var l = me, c = Xn.transition;
    Xn.transition = null;
    try {
      me = 1, Ao(e, t, s, o);
    } finally {
      me = l, Xn.transition = c;
    }
  }
  function Ap(e, t, s, o) {
    var l = me, c = Xn.transition;
    Xn.transition = null;
    try {
      me = 4, Ao(e, t, s, o);
    } finally {
      me = l, Xn.transition = c;
    }
  }
  function Ao(e, t, s, o) {
    if (Bs) {
      var l = Mo(e, t, s, o);
      if (l === null) qo(e, t, o, Us, s), ku(e, o);
      else if (Tp(l, e, t, s, o)) o.stopPropagation();
      else if (ku(e, o), t & 4 && -1 < Cp.indexOf(e)) {
        for (; l !== null; ) {
          var c = Kr(l);
          if (c !== null && wu(c), c = Mo(e, t, s, o), c === null && qo(e, t, o, Us, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else qo(e, t, o, null, s);
    }
  }
  var Us = null;
  function Mo(e, t, s, o) {
    if (Us = null, e = _o(o), e = Rn(e), e !== null) if (t = In(e), t === null) e = null;
    else if (s = t.tag, s === 13) {
      if (e = cu(t), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Us = e, null;
  }
  function Tu(e) {
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
        switch (yp()) {
          case ko:
            return 1;
          case gu:
            return 4;
          case Ps:
          case vp:
            return 16;
          case yu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var dn = null, No = null, $s = null;
  function Iu() {
    if ($s) return $s;
    var e, t = No, s = t.length, o, l = "value" in dn ? dn.value : dn.textContent, c = l.length;
    for (e = 0; e < s && t[e] === l[e]; e++) ;
    var f = s - e;
    for (o = 1; o <= f && t[s - o] === l[c - o]; o++) ;
    return $s = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Hs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Vs() {
    return !0;
  }
  function Ru() {
    return !1;
  }
  function ut(e) {
    function t(s, o, l, c, f) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (s = e[y], this[y] = s ? s(c) : c[y]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Vs : Ru, this.isPropagationStopped = Ru, this;
    }
    return M(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Vs);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Vs);
    }, persist: function() {
    }, isPersistent: Vs }), t;
  }
  var Zn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Po = ut(Zn), Fr = M({}, Zn, { view: 0, detail: 0 }), Mp = ut(Fr), jo, Lo, Br, Ws = M({}, Fr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Br && (Br && e.type === "mousemove" ? (jo = e.screenX - Br.screenX, Lo = e.screenY - Br.screenY) : Lo = jo = 0, Br = e), jo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Lo;
  } }), Au = ut(Ws), Np = M({}, Ws, { dataTransfer: 0 }), Pp = ut(Np), jp = M({}, Fr, { relatedTarget: 0 }), Oo = ut(jp), Lp = M({}, Zn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Op = ut(Lp), zp = M({}, Zn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Dp = ut(zp), Fp = M({}, Zn, { data: 0 }), Mu = ut(Fp), Bp = {
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
  }, Up = {
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
  }, $p = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Hp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = $p[e]) ? !!t[e] : !1;
  }
  function zo() {
    return Hp;
  }
  var Vp = M({}, Fr, { key: function(e) {
    if (e.key) {
      var t = Bp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Hs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Up[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zo, charCode: function(e) {
    return e.type === "keypress" ? Hs(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Hs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Wp = ut(Vp), Yp = M({}, Ws, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Nu = ut(Yp), Gp = M({}, Fr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zo }), qp = ut(Gp), Qp = M({}, Zn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Kp = ut(Qp), Jp = M({}, Ws, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Xp = ut(Jp), Zp = [9, 13, 27, 32], Do = p && "CompositionEvent" in window, Ur = null;
  p && "documentMode" in document && (Ur = document.documentMode);
  var em = p && "TextEvent" in window && !Ur, Pu = p && (!Do || Ur && 8 < Ur && 11 >= Ur), ju = " ", Lu = !1;
  function Ou(e, t) {
    switch (e) {
      case "keyup":
        return Zp.indexOf(t.keyCode) !== -1;
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
  function zu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var er = !1;
  function tm(e, t) {
    switch (e) {
      case "compositionend":
        return zu(t);
      case "keypress":
        return t.which !== 32 ? null : (Lu = !0, ju);
      case "textInput":
        return e = t.data, e === ju && Lu ? null : e;
      default:
        return null;
    }
  }
  function nm(e, t) {
    if (er) return e === "compositionend" || !Do && Ou(e, t) ? (e = Iu(), $s = No = dn = null, er = !1, e) : null;
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
        return Pu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var rm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Du(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!rm[e.type] : t === "textarea";
  }
  function Fu(e, t, s, o) {
    iu(o), t = Ks(t, "onChange"), 0 < t.length && (s = new Po("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var $r = null, Hr = null;
  function sm(e) {
    rc(e, 0);
  }
  function Ys(e) {
    var t = ir(e);
    if (on(t)) return e;
  }
  function im(e, t) {
    if (e === "change") return t;
  }
  var Bu = !1;
  if (p) {
    var Fo;
    if (p) {
      var Bo = "oninput" in document;
      if (!Bo) {
        var Uu = document.createElement("div");
        Uu.setAttribute("oninput", "return;"), Bo = typeof Uu.oninput == "function";
      }
      Fo = Bo;
    } else Fo = !1;
    Bu = Fo && (!document.documentMode || 9 < document.documentMode);
  }
  function $u() {
    $r && ($r.detachEvent("onpropertychange", Hu), Hr = $r = null);
  }
  function Hu(e) {
    if (e.propertyName === "value" && Ys(Hr)) {
      var t = [];
      Fu(t, Hr, e, _o(e)), uu(sm, t);
    }
  }
  function om(e, t, s) {
    e === "focusin" ? ($u(), $r = t, Hr = s, $r.attachEvent("onpropertychange", Hu)) : e === "focusout" && $u();
  }
  function am(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ys(Hr);
  }
  function lm(e, t) {
    if (e === "click") return Ys(t);
  }
  function um(e, t) {
    if (e === "input" || e === "change") return Ys(t);
  }
  function cm(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var kt = typeof Object.is == "function" ? Object.is : cm;
  function Vr(e, t) {
    if (kt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var s = Object.keys(e), o = Object.keys(t);
    if (s.length !== o.length) return !1;
    for (o = 0; o < s.length; o++) {
      var l = s[o];
      if (!g.call(t, l) || !kt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Vu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Wu(e, t) {
    var s = Vu(e);
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
      s = Vu(s);
    }
  }
  function Yu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Yu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Gu() {
    for (var e = window, t = qn(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof t.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = t.contentWindow;
      else break;
      t = qn(e.document);
    }
    return t;
  }
  function Uo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function dm(e) {
    var t = Gu(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Yu(s.ownerDocument.documentElement, s)) {
      if (o !== null && Uo(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = Wu(s, c);
          var f = Wu(
            s,
            o
          );
          l && f && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== f.node || e.focusOffset !== f.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), c > o ? (e.addRange(t), e.extend(f.node, f.offset)) : (t.setEnd(f.node, f.offset), e.addRange(t)));
        }
      }
      for (t = [], e = s; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof s.focus == "function" && s.focus(), s = 0; s < t.length; s++) e = t[s], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var fm = p && "documentMode" in document && 11 >= document.documentMode, tr = null, $o = null, Wr = null, Ho = !1;
  function qu(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Ho || tr == null || tr !== qn(o) || (o = tr, "selectionStart" in o && Uo(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Wr && Vr(Wr, o) || (Wr = o, o = Ks($o, "onSelect"), 0 < o.length && (t = new Po("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = tr)));
  }
  function Gs(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var nr = { animationend: Gs("Animation", "AnimationEnd"), animationiteration: Gs("Animation", "AnimationIteration"), animationstart: Gs("Animation", "AnimationStart"), transitionend: Gs("Transition", "TransitionEnd") }, Vo = {}, Qu = {};
  p && (Qu = document.createElement("div").style, "AnimationEvent" in window || (delete nr.animationend.animation, delete nr.animationiteration.animation, delete nr.animationstart.animation), "TransitionEvent" in window || delete nr.transitionend.transition);
  function qs(e) {
    if (Vo[e]) return Vo[e];
    if (!nr[e]) return e;
    var t = nr[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Qu) return Vo[e] = t[s];
    return e;
  }
  var Ku = qs("animationend"), Ju = qs("animationiteration"), Xu = qs("animationstart"), Zu = qs("transitionend"), ec = /* @__PURE__ */ new Map(), tc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function fn(e, t) {
    ec.set(e, t), d(t, [e]);
  }
  for (var Wo = 0; Wo < tc.length; Wo++) {
    var Yo = tc[Wo], hm = Yo.toLowerCase(), pm = Yo[0].toUpperCase() + Yo.slice(1);
    fn(hm, "on" + pm);
  }
  fn(Ku, "onAnimationEnd"), fn(Ju, "onAnimationIteration"), fn(Xu, "onAnimationStart"), fn("dblclick", "onDoubleClick"), fn("focusin", "onFocus"), fn("focusout", "onBlur"), fn(Zu, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Yr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mm = new Set("cancel close invalid load scroll toggle".split(" ").concat(Yr));
  function nc(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, hp(o, t, void 0, e), e.currentTarget = null;
  }
  function rc(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var y = o[f], _ = y.instance, I = y.currentTarget;
          if (y = y.listener, _ !== c && l.isPropagationStopped()) break e;
          nc(l, y, I), c = _;
        }
        else for (f = 0; f < o.length; f++) {
          if (y = o[f], _ = y.instance, I = y.currentTarget, y = y.listener, _ !== c && l.isPropagationStopped()) break e;
          nc(l, y, I), c = _;
        }
      }
    }
    if (Ns) throw e = Eo, Ns = !1, Eo = null, e;
  }
  function we(e, t) {
    var s = t[ea];
    s === void 0 && (s = t[ea] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (sc(t, e, 2, !1), s.add(o));
  }
  function Go(e, t, s) {
    var o = 0;
    t && (o |= 4), sc(s, e, o, t);
  }
  var Qs = "_reactListening" + Math.random().toString(36).slice(2);
  function Gr(e) {
    if (!e[Qs]) {
      e[Qs] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (mm.has(s) || Go(s, !1, e), Go(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Qs] || (t[Qs] = !0, Go("selectionchange", !1, t));
    }
  }
  function sc(e, t, s, o) {
    switch (Tu(t)) {
      case 1:
        var l = Rp;
        break;
      case 4:
        l = Ap;
        break;
      default:
        l = Ao;
    }
    s = l.bind(null, t, s, e), l = void 0, !xo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, s, { capture: !0, passive: l }) : e.addEventListener(t, s, !0) : l !== void 0 ? e.addEventListener(t, s, { passive: l }) : e.addEventListener(t, s, !1);
  }
  function qo(e, t, s, o, l) {
    var c = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var f = o.tag;
      if (f === 3 || f === 4) {
        var y = o.stateNode.containerInfo;
        if (y === l || y.nodeType === 8 && y.parentNode === l) break;
        if (f === 4) for (f = o.return; f !== null; ) {
          var _ = f.tag;
          if ((_ === 3 || _ === 4) && (_ = f.stateNode.containerInfo, _ === l || _.nodeType === 8 && _.parentNode === l)) return;
          f = f.return;
        }
        for (; y !== null; ) {
          if (f = Rn(y), f === null) return;
          if (_ = f.tag, _ === 5 || _ === 6) {
            o = c = f;
            continue e;
          }
          y = y.parentNode;
        }
      }
      o = o.return;
    }
    uu(function() {
      var I = c, j = _o(s), O = [];
      e: {
        var P = ec.get(e);
        if (P !== void 0) {
          var $ = Po, Y = e;
          switch (e) {
            case "keypress":
              if (Hs(s) === 0) break e;
            case "keydown":
            case "keyup":
              $ = Wp;
              break;
            case "focusin":
              Y = "focus", $ = Oo;
              break;
            case "focusout":
              Y = "blur", $ = Oo;
              break;
            case "beforeblur":
            case "afterblur":
              $ = Oo;
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
              $ = Au;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              $ = Pp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              $ = qp;
              break;
            case Ku:
            case Ju:
            case Xu:
              $ = Op;
              break;
            case Zu:
              $ = Kp;
              break;
            case "scroll":
              $ = Mp;
              break;
            case "wheel":
              $ = Xp;
              break;
            case "copy":
            case "cut":
            case "paste":
              $ = Dp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              $ = Nu;
          }
          var G = (t & 4) !== 0, Ne = !G && e === "scroll", C = G ? P !== null ? P + "Capture" : null : P;
          G = [];
          for (var x = I, T; x !== null; ) {
            T = x;
            var z = T.stateNode;
            if (T.tag === 5 && z !== null && (T = z, C !== null && (z = Rr(x, C), z != null && G.push(qr(x, z, T)))), Ne) break;
            x = x.return;
          }
          0 < G.length && (P = new $(P, Y, null, s, j), O.push({ event: P, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", $ = e === "mouseout" || e === "pointerout", P && s !== vo && (Y = s.relatedTarget || s.fromElement) && (Rn(Y) || Y[Qt])) break e;
          if (($ || P) && (P = j.window === j ? j : (P = j.ownerDocument) ? P.defaultView || P.parentWindow : window, $ ? (Y = s.relatedTarget || s.toElement, $ = I, Y = Y ? Rn(Y) : null, Y !== null && (Ne = In(Y), Y !== Ne || Y.tag !== 5 && Y.tag !== 6) && (Y = null)) : ($ = null, Y = I), $ !== Y)) {
            if (G = Au, z = "onMouseLeave", C = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (G = Nu, z = "onPointerLeave", C = "onPointerEnter", x = "pointer"), Ne = $ == null ? P : ir($), T = Y == null ? P : ir(Y), P = new G(z, x + "leave", $, s, j), P.target = Ne, P.relatedTarget = T, z = null, Rn(j) === I && (G = new G(C, x + "enter", Y, s, j), G.target = T, G.relatedTarget = Ne, z = G), Ne = z, $ && Y) t: {
              for (G = $, C = Y, x = 0, T = G; T; T = rr(T)) x++;
              for (T = 0, z = C; z; z = rr(z)) T++;
              for (; 0 < x - T; ) G = rr(G), x--;
              for (; 0 < T - x; ) C = rr(C), T--;
              for (; x--; ) {
                if (G === C || C !== null && G === C.alternate) break t;
                G = rr(G), C = rr(C);
              }
              G = null;
            }
            else G = null;
            $ !== null && ic(O, P, $, G, !1), Y !== null && Ne !== null && ic(O, Ne, Y, G, !0);
          }
        }
        e: {
          if (P = I ? ir(I) : window, $ = P.nodeName && P.nodeName.toLowerCase(), $ === "select" || $ === "input" && P.type === "file") var q = im;
          else if (Du(P)) if (Bu) q = um;
          else {
            q = am;
            var J = om;
          }
          else ($ = P.nodeName) && $.toLowerCase() === "input" && (P.type === "checkbox" || P.type === "radio") && (q = lm);
          if (q && (q = q(e, I))) {
            Fu(O, q, s, j);
            break e;
          }
          J && J(e, P, I), e === "focusout" && (J = P._wrapperState) && J.controlled && P.type === "number" && xt(P, "number", P.value);
        }
        switch (J = I ? ir(I) : window, e) {
          case "focusin":
            (Du(J) || J.contentEditable === "true") && (tr = J, $o = I, Wr = null);
            break;
          case "focusout":
            Wr = $o = tr = null;
            break;
          case "mousedown":
            Ho = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ho = !1, qu(O, s, j);
            break;
          case "selectionchange":
            if (fm) break;
          case "keydown":
          case "keyup":
            qu(O, s, j);
        }
        var X;
        if (Do) e: {
          switch (e) {
            case "compositionstart":
              var te = "onCompositionStart";
              break e;
            case "compositionend":
              te = "onCompositionEnd";
              break e;
            case "compositionupdate":
              te = "onCompositionUpdate";
              break e;
          }
          te = void 0;
        }
        else er ? Ou(e, s) && (te = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (te = "onCompositionStart");
        te && (Pu && s.locale !== "ko" && (er || te !== "onCompositionStart" ? te === "onCompositionEnd" && er && (X = Iu()) : (dn = j, No = "value" in dn ? dn.value : dn.textContent, er = !0)), J = Ks(I, te), 0 < J.length && (te = new Mu(te, e, null, s, j), O.push({ event: te, listeners: J }), X ? te.data = X : (X = zu(s), X !== null && (te.data = X)))), (X = em ? tm(e, s) : nm(e, s)) && (I = Ks(I, "onBeforeInput"), 0 < I.length && (j = new Mu("onBeforeInput", "beforeinput", null, s, j), O.push({ event: j, listeners: I }), j.data = X));
      }
      rc(O, t);
    });
  }
  function qr(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function Ks(e, t) {
    for (var s = t + "Capture", o = []; e !== null; ) {
      var l = e, c = l.stateNode;
      l.tag === 5 && c !== null && (l = c, c = Rr(e, s), c != null && o.unshift(qr(e, c, l)), c = Rr(e, t), c != null && o.push(qr(e, c, l))), e = e.return;
    }
    return o;
  }
  function rr(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function ic(e, t, s, o, l) {
    for (var c = t._reactName, f = []; s !== null && s !== o; ) {
      var y = s, _ = y.alternate, I = y.stateNode;
      if (_ !== null && _ === o) break;
      y.tag === 5 && I !== null && (y = I, l ? (_ = Rr(s, c), _ != null && f.unshift(qr(s, _, y))) : l || (_ = Rr(s, c), _ != null && f.push(qr(s, _, y)))), s = s.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var gm = /\r\n?/g, ym = /\u0000|\uFFFD/g;
  function oc(e) {
    return (typeof e == "string" ? e : "" + e).replace(gm, `
`).replace(ym, "");
  }
  function Js(e, t, s) {
    if (t = oc(t), oc(e) !== t && s) throw Error(i(425));
  }
  function Xs() {
  }
  var Qo = null, Ko = null;
  function Jo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Xo = typeof setTimeout == "function" ? setTimeout : void 0, vm = typeof clearTimeout == "function" ? clearTimeout : void 0, ac = typeof Promise == "function" ? Promise : void 0, _m = typeof queueMicrotask == "function" ? queueMicrotask : typeof ac < "u" ? function(e) {
    return ac.resolve(null).then(e).catch(wm);
  } : Xo;
  function wm(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Zo(e, t) {
    var s = t, o = 0;
    do {
      var l = s.nextSibling;
      if (e.removeChild(s), l && l.nodeType === 8) if (s = l.data, s === "/$") {
        if (o === 0) {
          e.removeChild(l), Dr(t);
          return;
        }
        o--;
      } else s !== "$" && s !== "$?" && s !== "$!" || o++;
      s = l;
    } while (s);
    Dr(t);
  }
  function hn(e) {
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
  function lc(e) {
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
  var sr = Math.random().toString(36).slice(2), Dt = "__reactFiber$" + sr, Qr = "__reactProps$" + sr, Qt = "__reactContainer$" + sr, ea = "__reactEvents$" + sr, Sm = "__reactListeners$" + sr, xm = "__reactHandles$" + sr;
  function Rn(e) {
    var t = e[Dt];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[Qt] || s[Dt]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = lc(e); e !== null; ) {
          if (s = e[Dt]) return s;
          e = lc(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Kr(e) {
    return e = e[Dt] || e[Qt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function ir(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Zs(e) {
    return e[Qr] || null;
  }
  var ta = [], or = -1;
  function pn(e) {
    return { current: e };
  }
  function Se(e) {
    0 > or || (e.current = ta[or], ta[or] = null, or--);
  }
  function _e(e, t) {
    or++, ta[or] = e.current, e.current = t;
  }
  var mn = {}, Ye = pn(mn), nt = pn(!1), An = mn;
  function ar(e, t) {
    var s = e.type.contextTypes;
    if (!s) return mn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var l = {}, c;
    for (c in s) l[c] = t[c];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function rt(e) {
    return e = e.childContextTypes, e != null;
  }
  function ei() {
    Se(nt), Se(Ye);
  }
  function uc(e, t, s) {
    if (Ye.current !== mn) throw Error(i(168));
    _e(Ye, t), _e(nt, s);
  }
  function cc(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, ue(e) || "Unknown", l));
    return M({}, s, o);
  }
  function ti(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || mn, An = Ye.current, _e(Ye, e), _e(nt, nt.current), !0;
  }
  function dc(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = cc(e, t, An), o.__reactInternalMemoizedMergedChildContext = e, Se(nt), Se(Ye), _e(Ye, e)) : Se(nt), _e(nt, s);
  }
  var Kt = null, ni = !1, na = !1;
  function fc(e) {
    Kt === null ? Kt = [e] : Kt.push(e);
  }
  function Em(e) {
    ni = !0, fc(e);
  }
  function gn() {
    if (!na && Kt !== null) {
      na = !0;
      var e = 0, t = me;
      try {
        var s = Kt;
        for (me = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Kt = null, ni = !1;
      } catch (l) {
        throw Kt !== null && (Kt = Kt.slice(e + 1)), pu(ko, gn), l;
      } finally {
        me = t, na = !1;
      }
    }
    return null;
  }
  var lr = [], ur = 0, ri = null, si = 0, pt = [], mt = 0, Mn = null, Jt = 1, Xt = "";
  function Nn(e, t) {
    lr[ur++] = si, lr[ur++] = ri, ri = e, si = t;
  }
  function hc(e, t, s) {
    pt[mt++] = Jt, pt[mt++] = Xt, pt[mt++] = Mn, Mn = e;
    var o = Jt;
    e = Xt;
    var l = 32 - Et(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - Et(t) + l;
    if (30 < c) {
      var f = l - l % 5;
      c = (o & (1 << f) - 1).toString(32), o >>= f, l -= f, Jt = 1 << 32 - Et(t) + l | s << l | o, Xt = c + e;
    } else Jt = 1 << c | s << l | o, Xt = e;
  }
  function ra(e) {
    e.return !== null && (Nn(e, 1), hc(e, 1, 0));
  }
  function sa(e) {
    for (; e === ri; ) ri = lr[--ur], lr[ur] = null, si = lr[--ur], lr[ur] = null;
    for (; e === Mn; ) Mn = pt[--mt], pt[mt] = null, Xt = pt[--mt], pt[mt] = null, Jt = pt[--mt], pt[mt] = null;
  }
  var ct = null, dt = null, ke = !1, bt = null;
  function pc(e, t) {
    var s = _t(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function mc(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ct = e, dt = hn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ct = e, dt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = Mn !== null ? { id: Jt, overflow: Xt } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = _t(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, ct = e, dt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ia(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function oa(e) {
    if (ke) {
      var t = dt;
      if (t) {
        var s = t;
        if (!mc(e, t)) {
          if (ia(e)) throw Error(i(418));
          t = hn(s.nextSibling);
          var o = ct;
          t && mc(e, t) ? pc(o, s) : (e.flags = e.flags & -4097 | 2, ke = !1, ct = e);
        }
      } else {
        if (ia(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, ke = !1, ct = e;
      }
    }
  }
  function gc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ct = e;
  }
  function ii(e) {
    if (e !== ct) return !1;
    if (!ke) return gc(e), ke = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Jo(e.type, e.memoizedProps)), t && (t = dt)) {
      if (ia(e)) throw yc(), Error(i(418));
      for (; t; ) pc(e, t), t = hn(t.nextSibling);
    }
    if (gc(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (t === 0) {
                dt = hn(e.nextSibling);
                break e;
              }
              t--;
            } else s !== "$" && s !== "$!" && s !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        dt = null;
      }
    } else dt = ct ? hn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function yc() {
    for (var e = dt; e; ) e = hn(e.nextSibling);
  }
  function cr() {
    dt = ct = null, ke = !1;
  }
  function aa(e) {
    bt === null ? bt = [e] : bt.push(e);
  }
  var km = se.ReactCurrentBatchConfig;
  function Jr(e, t, s) {
    if (e = s.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(i(309));
          var o = s.stateNode;
        }
        if (!o) throw Error(i(147, e));
        var l = o, c = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === c ? t.ref : (t = function(f) {
          var y = l.refs;
          f === null ? delete y[c] : y[c] = f;
        }, t._stringRef = c, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!s._owner) throw Error(i(290, e));
    }
    return e;
  }
  function oi(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function vc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function _c(e) {
    function t(C, x) {
      if (e) {
        var T = C.deletions;
        T === null ? (C.deletions = [x], C.flags |= 16) : T.push(x);
      }
    }
    function s(C, x) {
      if (!e) return null;
      for (; x !== null; ) t(C, x), x = x.sibling;
      return null;
    }
    function o(C, x) {
      for (C = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? C.set(x.key, x) : C.set(x.index, x), x = x.sibling;
      return C;
    }
    function l(C, x) {
      return C = kn(C, x), C.index = 0, C.sibling = null, C;
    }
    function c(C, x, T) {
      return C.index = T, e ? (T = C.alternate, T !== null ? (T = T.index, T < x ? (C.flags |= 2, x) : T) : (C.flags |= 2, x)) : (C.flags |= 1048576, x);
    }
    function f(C) {
      return e && C.alternate === null && (C.flags |= 2), C;
    }
    function y(C, x, T, z) {
      return x === null || x.tag !== 6 ? (x = Xa(T, C.mode, z), x.return = C, x) : (x = l(x, T), x.return = C, x);
    }
    function _(C, x, T, z) {
      var q = T.type;
      return q === ie ? j(C, x, T.props.children, z, T.key) : x !== null && (x.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Pe && vc(q) === x.type) ? (z = l(x, T.props), z.ref = Jr(C, x, T), z.return = C, z) : (z = Ai(T.type, T.key, T.props, null, C.mode, z), z.ref = Jr(C, x, T), z.return = C, z);
    }
    function I(C, x, T, z) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== T.containerInfo || x.stateNode.implementation !== T.implementation ? (x = Za(T, C.mode, z), x.return = C, x) : (x = l(x, T.children || []), x.return = C, x);
    }
    function j(C, x, T, z, q) {
      return x === null || x.tag !== 7 ? (x = Bn(T, C.mode, z, q), x.return = C, x) : (x = l(x, T), x.return = C, x);
    }
    function O(C, x, T) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Xa("" + x, C.mode, T), x.return = C, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case he:
            return T = Ai(x.type, x.key, x.props, null, C.mode, T), T.ref = Jr(C, null, x), T.return = C, T;
          case U:
            return x = Za(x, C.mode, T), x.return = C, x;
          case Pe:
            var z = x._init;
            return O(C, z(x._payload), T);
        }
        if (ht(x) || Z(x)) return x = Bn(x, C.mode, T, null), x.return = C, x;
        oi(C, x);
      }
      return null;
    }
    function P(C, x, T, z) {
      var q = x !== null ? x.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return q !== null ? null : y(C, x, "" + T, z);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case he:
            return T.key === q ? _(C, x, T, z) : null;
          case U:
            return T.key === q ? I(C, x, T, z) : null;
          case Pe:
            return q = T._init, P(
              C,
              x,
              q(T._payload),
              z
            );
        }
        if (ht(T) || Z(T)) return q !== null ? null : j(C, x, T, z, null);
        oi(C, T);
      }
      return null;
    }
    function $(C, x, T, z, q) {
      if (typeof z == "string" && z !== "" || typeof z == "number") return C = C.get(T) || null, y(x, C, "" + z, q);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case he:
            return C = C.get(z.key === null ? T : z.key) || null, _(x, C, z, q);
          case U:
            return C = C.get(z.key === null ? T : z.key) || null, I(x, C, z, q);
          case Pe:
            var J = z._init;
            return $(C, x, T, J(z._payload), q);
        }
        if (ht(z) || Z(z)) return C = C.get(T) || null, j(x, C, z, q, null);
        oi(x, z);
      }
      return null;
    }
    function Y(C, x, T, z) {
      for (var q = null, J = null, X = x, te = x = 0, $e = null; X !== null && te < T.length; te++) {
        X.index > te ? ($e = X, X = null) : $e = X.sibling;
        var fe = P(C, X, T[te], z);
        if (fe === null) {
          X === null && (X = $e);
          break;
        }
        e && X && fe.alternate === null && t(C, X), x = c(fe, x, te), J === null ? q = fe : J.sibling = fe, J = fe, X = $e;
      }
      if (te === T.length) return s(C, X), ke && Nn(C, te), q;
      if (X === null) {
        for (; te < T.length; te++) X = O(C, T[te], z), X !== null && (x = c(X, x, te), J === null ? q = X : J.sibling = X, J = X);
        return ke && Nn(C, te), q;
      }
      for (X = o(C, X); te < T.length; te++) $e = $(X, C, te, T[te], z), $e !== null && (e && $e.alternate !== null && X.delete($e.key === null ? te : $e.key), x = c($e, x, te), J === null ? q = $e : J.sibling = $e, J = $e);
      return e && X.forEach(function(bn) {
        return t(C, bn);
      }), ke && Nn(C, te), q;
    }
    function G(C, x, T, z) {
      var q = Z(T);
      if (typeof q != "function") throw Error(i(150));
      if (T = q.call(T), T == null) throw Error(i(151));
      for (var J = q = null, X = x, te = x = 0, $e = null, fe = T.next(); X !== null && !fe.done; te++, fe = T.next()) {
        X.index > te ? ($e = X, X = null) : $e = X.sibling;
        var bn = P(C, X, fe.value, z);
        if (bn === null) {
          X === null && (X = $e);
          break;
        }
        e && X && bn.alternate === null && t(C, X), x = c(bn, x, te), J === null ? q = bn : J.sibling = bn, J = bn, X = $e;
      }
      if (fe.done) return s(
        C,
        X
      ), ke && Nn(C, te), q;
      if (X === null) {
        for (; !fe.done; te++, fe = T.next()) fe = O(C, fe.value, z), fe !== null && (x = c(fe, x, te), J === null ? q = fe : J.sibling = fe, J = fe);
        return ke && Nn(C, te), q;
      }
      for (X = o(C, X); !fe.done; te++, fe = T.next()) fe = $(X, C, te, fe.value, z), fe !== null && (e && fe.alternate !== null && X.delete(fe.key === null ? te : fe.key), x = c(fe, x, te), J === null ? q = fe : J.sibling = fe, J = fe);
      return e && X.forEach(function(rg) {
        return t(C, rg);
      }), ke && Nn(C, te), q;
    }
    function Ne(C, x, T, z) {
      if (typeof T == "object" && T !== null && T.type === ie && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case he:
            e: {
              for (var q = T.key, J = x; J !== null; ) {
                if (J.key === q) {
                  if (q = T.type, q === ie) {
                    if (J.tag === 7) {
                      s(C, J.sibling), x = l(J, T.props.children), x.return = C, C = x;
                      break e;
                    }
                  } else if (J.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Pe && vc(q) === J.type) {
                    s(C, J.sibling), x = l(J, T.props), x.ref = Jr(C, J, T), x.return = C, C = x;
                    break e;
                  }
                  s(C, J);
                  break;
                } else t(C, J);
                J = J.sibling;
              }
              T.type === ie ? (x = Bn(T.props.children, C.mode, z, T.key), x.return = C, C = x) : (z = Ai(T.type, T.key, T.props, null, C.mode, z), z.ref = Jr(C, x, T), z.return = C, C = z);
            }
            return f(C);
          case U:
            e: {
              for (J = T.key; x !== null; ) {
                if (x.key === J) if (x.tag === 4 && x.stateNode.containerInfo === T.containerInfo && x.stateNode.implementation === T.implementation) {
                  s(C, x.sibling), x = l(x, T.children || []), x.return = C, C = x;
                  break e;
                } else {
                  s(C, x);
                  break;
                }
                else t(C, x);
                x = x.sibling;
              }
              x = Za(T, C.mode, z), x.return = C, C = x;
            }
            return f(C);
          case Pe:
            return J = T._init, Ne(C, x, J(T._payload), z);
        }
        if (ht(T)) return Y(C, x, T, z);
        if (Z(T)) return G(C, x, T, z);
        oi(C, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, x !== null && x.tag === 6 ? (s(C, x.sibling), x = l(x, T), x.return = C, C = x) : (s(C, x), x = Xa(T, C.mode, z), x.return = C, C = x), f(C)) : s(C, x);
    }
    return Ne;
  }
  var dr = _c(!0), wc = _c(!1), ai = pn(null), li = null, fr = null, la = null;
  function ua() {
    la = fr = li = null;
  }
  function ca(e) {
    var t = ai.current;
    Se(ai), e._currentValue = t;
  }
  function da(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function hr(e, t) {
    li = e, la = fr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (st = !0), e.firstContext = null);
  }
  function gt(e) {
    var t = e._currentValue;
    if (la !== e) if (e = { context: e, memoizedValue: t, next: null }, fr === null) {
      if (li === null) throw Error(i(308));
      fr = e, li.dependencies = { lanes: 0, firstContext: e };
    } else fr = fr.next = e;
    return t;
  }
  var Pn = null;
  function fa(e) {
    Pn === null ? Pn = [e] : Pn.push(e);
  }
  function Sc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, fa(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Zt(e, o);
  }
  function Zt(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var yn = !1;
  function ha(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function xc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function en(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function vn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (de & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Zt(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, fa(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Zt(e, s);
  }
  function ui(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, To(e, s);
    }
  }
  function Ec(e, t) {
    var s = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, s === o)) {
      var l = null, c = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var f = { eventTime: s.eventTime, lane: s.lane, tag: s.tag, payload: s.payload, callback: s.callback, next: null };
          c === null ? l = c = f : c = c.next = f, s = s.next;
        } while (s !== null);
        c === null ? l = c = t : c = c.next = t;
      } else l = c = t;
      s = { baseState: o.baseState, firstBaseUpdate: l, lastBaseUpdate: c, shared: o.shared, effects: o.effects }, e.updateQueue = s;
      return;
    }
    e = s.lastBaseUpdate, e === null ? s.firstBaseUpdate = t : e.next = t, s.lastBaseUpdate = t;
  }
  function ci(e, t, s, o) {
    var l = e.updateQueue;
    yn = !1;
    var c = l.firstBaseUpdate, f = l.lastBaseUpdate, y = l.shared.pending;
    if (y !== null) {
      l.shared.pending = null;
      var _ = y, I = _.next;
      _.next = null, f === null ? c = I : f.next = I, f = _;
      var j = e.alternate;
      j !== null && (j = j.updateQueue, y = j.lastBaseUpdate, y !== f && (y === null ? j.firstBaseUpdate = I : y.next = I, j.lastBaseUpdate = _));
    }
    if (c !== null) {
      var O = l.baseState;
      f = 0, j = I = _ = null, y = c;
      do {
        var P = y.lane, $ = y.eventTime;
        if ((o & P) === P) {
          j !== null && (j = j.next = {
            eventTime: $,
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          });
          e: {
            var Y = e, G = y;
            switch (P = t, $ = s, G.tag) {
              case 1:
                if (Y = G.payload, typeof Y == "function") {
                  O = Y.call($, O, P);
                  break e;
                }
                O = Y;
                break e;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = G.payload, P = typeof Y == "function" ? Y.call($, O, P) : Y, P == null) break e;
                O = M({}, O, P);
                break e;
              case 2:
                yn = !0;
            }
          }
          y.callback !== null && y.lane !== 0 && (e.flags |= 64, P = l.effects, P === null ? l.effects = [y] : P.push(y));
        } else $ = { eventTime: $, lane: P, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, j === null ? (I = j = $, _ = O) : j = j.next = $, f |= P;
        if (y = y.next, y === null) {
          if (y = l.shared.pending, y === null) break;
          P = y, y = P.next, P.next = null, l.lastBaseUpdate = P, l.shared.pending = null;
        }
      } while (!0);
      if (j === null && (_ = O), l.baseState = _, l.firstBaseUpdate = I, l.lastBaseUpdate = j, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          f |= l.lane, l = l.next;
        while (l !== t);
      } else c === null && (l.shared.lanes = 0);
      On |= f, e.lanes = f, e.memoizedState = O;
    }
  }
  function kc(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = s, typeof l != "function") throw Error(i(191, l));
        l.call(o);
      }
    }
  }
  var Xr = {}, Ft = pn(Xr), Zr = pn(Xr), es = pn(Xr);
  function jn(e) {
    if (e === Xr) throw Error(i(174));
    return e;
  }
  function pa(e, t) {
    switch (_e(es, t), _e(Zr, e), _e(Ft, Xr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : mo(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = mo(t, e);
    }
    Se(Ft), _e(Ft, t);
  }
  function pr() {
    Se(Ft), Se(Zr), Se(es);
  }
  function bc(e) {
    jn(es.current);
    var t = jn(Ft.current), s = mo(t, e.type);
    t !== s && (_e(Zr, e), _e(Ft, s));
  }
  function ma(e) {
    Zr.current === e && (Se(Ft), Se(Zr));
  }
  var Te = pn(0);
  function di(e) {
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
  var ga = [];
  function ya() {
    for (var e = 0; e < ga.length; e++) ga[e]._workInProgressVersionPrimary = null;
    ga.length = 0;
  }
  var fi = se.ReactCurrentDispatcher, va = se.ReactCurrentBatchConfig, Ln = 0, Ie = null, Oe = null, Be = null, hi = !1, ts = !1, ns = 0, bm = 0;
  function Ge() {
    throw Error(i(321));
  }
  function _a(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!kt(e[s], t[s])) return !1;
    return !0;
  }
  function wa(e, t, s, o, l, c) {
    if (Ln = c, Ie = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, fi.current = e === null || e.memoizedState === null ? Rm : Am, e = s(o, l), ts) {
      c = 0;
      do {
        if (ts = !1, ns = 0, 25 <= c) throw Error(i(301));
        c += 1, Be = Oe = null, t.updateQueue = null, fi.current = Mm, e = s(o, l);
      } while (ts);
    }
    if (fi.current = gi, t = Oe !== null && Oe.next !== null, Ln = 0, Be = Oe = Ie = null, hi = !1, t) throw Error(i(300));
    return e;
  }
  function Sa() {
    var e = ns !== 0;
    return ns = 0, e;
  }
  function Bt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Be === null ? Ie.memoizedState = Be = e : Be = Be.next = e, Be;
  }
  function yt() {
    if (Oe === null) {
      var e = Ie.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Oe.next;
    var t = Be === null ? Ie.memoizedState : Be.next;
    if (t !== null) Be = t, Oe = e;
    else {
      if (e === null) throw Error(i(310));
      Oe = e, e = { memoizedState: Oe.memoizedState, baseState: Oe.baseState, baseQueue: Oe.baseQueue, queue: Oe.queue, next: null }, Be === null ? Ie.memoizedState = Be = e : Be = Be.next = e;
    }
    return Be;
  }
  function rs(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function xa(e) {
    var t = yt(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = Oe, l = o.baseQueue, c = s.pending;
    if (c !== null) {
      if (l !== null) {
        var f = l.next;
        l.next = c.next, c.next = f;
      }
      o.baseQueue = l = c, s.pending = null;
    }
    if (l !== null) {
      c = l.next, o = o.baseState;
      var y = f = null, _ = null, I = c;
      do {
        var j = I.lane;
        if ((Ln & j) === j) _ !== null && (_ = _.next = { lane: 0, action: I.action, hasEagerState: I.hasEagerState, eagerState: I.eagerState, next: null }), o = I.hasEagerState ? I.eagerState : e(o, I.action);
        else {
          var O = {
            lane: j,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          };
          _ === null ? (y = _ = O, f = o) : _ = _.next = O, Ie.lanes |= j, On |= j;
        }
        I = I.next;
      } while (I !== null && I !== c);
      _ === null ? f = o : _.next = y, kt(o, t.memoizedState) || (st = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = _, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, Ie.lanes |= c, On |= c, l = l.next;
      while (l !== e);
    } else l === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function Ea(e) {
    var t = yt(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = s.dispatch, l = s.pending, c = t.memoizedState;
    if (l !== null) {
      s.pending = null;
      var f = l = l.next;
      do
        c = e(c, f.action), f = f.next;
      while (f !== l);
      kt(c, t.memoizedState) || (st = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), s.lastRenderedState = c;
    }
    return [c, o];
  }
  function Cc() {
  }
  function Tc(e, t) {
    var s = Ie, o = yt(), l = t(), c = !kt(o.memoizedState, l);
    if (c && (o.memoizedState = l, st = !0), o = o.queue, ka(Ac.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || Be !== null && Be.memoizedState.tag & 1) {
      if (s.flags |= 2048, ss(9, Rc.bind(null, s, o, l, t), void 0, null), Ue === null) throw Error(i(349));
      (Ln & 30) !== 0 || Ic(s, t, l);
    }
    return l;
  }
  function Ic(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = Ie.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ie.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function Rc(e, t, s, o) {
    t.value = s, t.getSnapshot = o, Mc(t) && Nc(e);
  }
  function Ac(e, t, s) {
    return s(function() {
      Mc(t) && Nc(e);
    });
  }
  function Mc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !kt(e, s);
    } catch {
      return !0;
    }
  }
  function Nc(e) {
    var t = Zt(e, 1);
    t !== null && Rt(t, e, 1, -1);
  }
  function Pc(e) {
    var t = Bt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: rs, lastRenderedState: e }, t.queue = e, e = e.dispatch = Im.bind(null, Ie, e), [t.memoizedState, e];
  }
  function ss(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = Ie.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ie.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function jc() {
    return yt().memoizedState;
  }
  function pi(e, t, s, o) {
    var l = Bt();
    Ie.flags |= e, l.memoizedState = ss(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function mi(e, t, s, o) {
    var l = yt();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (Oe !== null) {
      var f = Oe.memoizedState;
      if (c = f.destroy, o !== null && _a(o, f.deps)) {
        l.memoizedState = ss(t, s, c, o);
        return;
      }
    }
    Ie.flags |= e, l.memoizedState = ss(1 | t, s, c, o);
  }
  function Lc(e, t) {
    return pi(8390656, 8, e, t);
  }
  function ka(e, t) {
    return mi(2048, 8, e, t);
  }
  function Oc(e, t) {
    return mi(4, 2, e, t);
  }
  function zc(e, t) {
    return mi(4, 4, e, t);
  }
  function Dc(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Fc(e, t, s) {
    return s = s != null ? s.concat([e]) : null, mi(4, 4, Dc.bind(null, t, e), s);
  }
  function ba() {
  }
  function Bc(e, t) {
    var s = yt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && _a(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function Uc(e, t) {
    var s = yt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && _a(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function $c(e, t, s) {
    return (Ln & 21) === 0 ? (e.baseState && (e.baseState = !1, st = !0), e.memoizedState = s) : (kt(s, t) || (s = vu(), Ie.lanes |= s, On |= s, e.baseState = !0), t);
  }
  function Cm(e, t) {
    var s = me;
    me = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = va.transition;
    va.transition = {};
    try {
      e(!1), t();
    } finally {
      me = s, va.transition = o;
    }
  }
  function Hc() {
    return yt().memoizedState;
  }
  function Tm(e, t, s) {
    var o = xn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, Vc(e)) Wc(t, s);
    else if (s = Sc(e, t, s, o), s !== null) {
      var l = Ze();
      Rt(s, e, o, l), Yc(s, t, o);
    }
  }
  function Im(e, t, s) {
    var o = xn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Vc(e)) Wc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var f = t.lastRenderedState, y = c(f, s);
        if (l.hasEagerState = !0, l.eagerState = y, kt(y, f)) {
          var _ = t.interleaved;
          _ === null ? (l.next = l, fa(t)) : (l.next = _.next, _.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = Sc(e, t, l, o), s !== null && (l = Ze(), Rt(s, e, o, l), Yc(s, t, o));
    }
  }
  function Vc(e) {
    var t = e.alternate;
    return e === Ie || t !== null && t === Ie;
  }
  function Wc(e, t) {
    ts = hi = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Yc(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, To(e, s);
    }
  }
  var gi = { readContext: gt, useCallback: Ge, useContext: Ge, useEffect: Ge, useImperativeHandle: Ge, useInsertionEffect: Ge, useLayoutEffect: Ge, useMemo: Ge, useReducer: Ge, useRef: Ge, useState: Ge, useDebugValue: Ge, useDeferredValue: Ge, useTransition: Ge, useMutableSource: Ge, useSyncExternalStore: Ge, useId: Ge, unstable_isNewReconciler: !1 }, Rm = { readContext: gt, useCallback: function(e, t) {
    return Bt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: gt, useEffect: Lc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, pi(
      4194308,
      4,
      Dc.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return pi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return pi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = Bt();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = Bt();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Tm.bind(null, Ie, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Bt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Pc, useDebugValue: ba, useDeferredValue: function(e) {
    return Bt().memoizedState = e;
  }, useTransition: function() {
    var e = Pc(!1), t = e[0];
    return e = Cm.bind(null, e[1]), Bt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = Ie, l = Bt();
    if (ke) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), Ue === null) throw Error(i(349));
      (Ln & 30) !== 0 || Ic(o, t, s);
    }
    l.memoizedState = s;
    var c = { value: s, getSnapshot: t };
    return l.queue = c, Lc(Ac.bind(
      null,
      o,
      c,
      e
    ), [e]), o.flags |= 2048, ss(9, Rc.bind(null, o, c, s, t), void 0, null), s;
  }, useId: function() {
    var e = Bt(), t = Ue.identifierPrefix;
    if (ke) {
      var s = Xt, o = Jt;
      s = (o & ~(1 << 32 - Et(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = ns++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = bm++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Am = {
    readContext: gt,
    useCallback: Bc,
    useContext: gt,
    useEffect: ka,
    useImperativeHandle: Fc,
    useInsertionEffect: Oc,
    useLayoutEffect: zc,
    useMemo: Uc,
    useReducer: xa,
    useRef: jc,
    useState: function() {
      return xa(rs);
    },
    useDebugValue: ba,
    useDeferredValue: function(e) {
      var t = yt();
      return $c(t, Oe.memoizedState, e);
    },
    useTransition: function() {
      var e = xa(rs)[0], t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: Cc,
    useSyncExternalStore: Tc,
    useId: Hc,
    unstable_isNewReconciler: !1
  }, Mm = { readContext: gt, useCallback: Bc, useContext: gt, useEffect: ka, useImperativeHandle: Fc, useInsertionEffect: Oc, useLayoutEffect: zc, useMemo: Uc, useReducer: Ea, useRef: jc, useState: function() {
    return Ea(rs);
  }, useDebugValue: ba, useDeferredValue: function(e) {
    var t = yt();
    return Oe === null ? t.memoizedState = e : $c(t, Oe.memoizedState, e);
  }, useTransition: function() {
    var e = Ea(rs)[0], t = yt().memoizedState;
    return [e, t];
  }, useMutableSource: Cc, useSyncExternalStore: Tc, useId: Hc, unstable_isNewReconciler: !1 };
  function Ct(e, t) {
    if (e && e.defaultProps) {
      t = M({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function Ca(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : M({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var yi = { isMounted: function(e) {
    return (e = e._reactInternals) ? In(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = Ze(), l = xn(e), c = en(o, l);
    c.payload = t, s != null && (c.callback = s), t = vn(e, c, l), t !== null && (Rt(t, e, l, o), ui(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = Ze(), l = xn(e), c = en(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = vn(e, c, l), t !== null && (Rt(t, e, l, o), ui(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = Ze(), o = xn(e), l = en(s, o);
    l.tag = 2, t != null && (l.callback = t), t = vn(e, l, o), t !== null && (Rt(t, e, o, s), ui(t, e, o));
  } };
  function Gc(e, t, s, o, l, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, f) : t.prototype && t.prototype.isPureReactComponent ? !Vr(s, o) || !Vr(l, c) : !0;
  }
  function qc(e, t, s) {
    var o = !1, l = mn, c = t.contextType;
    return typeof c == "object" && c !== null ? c = gt(c) : (l = rt(t) ? An : Ye.current, o = t.contextTypes, c = (o = o != null) ? ar(e, l) : mn), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = yi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Qc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && yi.enqueueReplaceState(t, t.state, null);
  }
  function Ta(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, ha(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = gt(c) : (c = rt(t) ? An : Ye.current, l.context = ar(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Ca(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && yi.enqueueReplaceState(l, l.state, null), ci(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function mr(e, t) {
    try {
      var s = "", o = t;
      do
        s += re(o), o = o.return;
      while (o);
      var l = s;
    } catch (c) {
      l = `
Error generating stack: ` + c.message + `
` + c.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function Ia(e, t, s) {
    return { value: e, source: null, stack: s ?? null, digest: t ?? null };
  }
  function Ra(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var Nm = typeof WeakMap == "function" ? WeakMap : Map;
  function Kc(e, t, s) {
    s = en(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      ki || (ki = !0, Va = o), Ra(e, t);
    }, s;
  }
  function Jc(e, t, s) {
    s = en(-1, s), s.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var l = t.value;
      s.payload = function() {
        return o(l);
      }, s.callback = function() {
        Ra(e, t);
      };
    }
    var c = e.stateNode;
    return c !== null && typeof c.componentDidCatch == "function" && (s.callback = function() {
      Ra(e, t), typeof o != "function" && (wn === null ? wn = /* @__PURE__ */ new Set([this]) : wn.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), s;
  }
  function Xc(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Nm();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = Ym.bind(null, e, t, s), t.then(e, e));
  }
  function Zc(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function ed(e, t, s, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = en(-1, 1), t.tag = 2, vn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var Pm = se.ReactCurrentOwner, st = !1;
  function Xe(e, t, s, o) {
    t.child = e === null ? wc(t, null, s, o) : dr(t, e.child, s, o);
  }
  function td(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return hr(t, l), o = wa(e, t, s, o, c, l), s = Sa(), e !== null && !st ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, tn(e, t, l)) : (ke && s && ra(t), t.flags |= 1, Xe(e, t, o, l), t.child);
  }
  function nd(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !Ja(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, rd(e, t, c, o, l)) : (e = Ai(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var f = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Vr, s(f, o) && e.ref === t.ref) return tn(e, t, l);
    }
    return t.flags |= 1, e = kn(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function rd(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Vr(c, o) && e.ref === t.ref) if (st = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (st = !0);
      else return t.lanes = e.lanes, tn(e, t, l);
    }
    return Aa(e, t, s, o, l);
  }
  function sd(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _e(yr, ft), ft |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, _e(yr, ft), ft |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, _e(yr, ft), ft |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, _e(yr, ft), ft |= o;
    return Xe(e, t, l, s), t.child;
  }
  function id(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Aa(e, t, s, o, l) {
    var c = rt(s) ? An : Ye.current;
    return c = ar(t, c), hr(t, l), s = wa(e, t, s, o, c, l), o = Sa(), e !== null && !st ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, tn(e, t, l)) : (ke && o && ra(t), t.flags |= 1, Xe(e, t, s, l), t.child);
  }
  function od(e, t, s, o, l) {
    if (rt(s)) {
      var c = !0;
      ti(t);
    } else c = !1;
    if (hr(t, l), t.stateNode === null) _i(e, t), qc(t, s, o), Ta(t, s, o, l), o = !0;
    else if (e === null) {
      var f = t.stateNode, y = t.memoizedProps;
      f.props = y;
      var _ = f.context, I = s.contextType;
      typeof I == "object" && I !== null ? I = gt(I) : (I = rt(s) ? An : Ye.current, I = ar(t, I));
      var j = s.getDerivedStateFromProps, O = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      O || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== o || _ !== I) && Qc(t, f, o, I), yn = !1;
      var P = t.memoizedState;
      f.state = P, ci(t, o, f, l), _ = t.memoizedState, y !== o || P !== _ || nt.current || yn ? (typeof j == "function" && (Ca(t, s, j, o), _ = t.memoizedState), (y = yn || Gc(t, s, y, o, P, _, I)) ? (O || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = _), f.props = o, f.state = _, f.context = I, o = y) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, xc(e, t), y = t.memoizedProps, I = t.type === t.elementType ? y : Ct(t.type, y), f.props = I, O = t.pendingProps, P = f.context, _ = s.contextType, typeof _ == "object" && _ !== null ? _ = gt(_) : (_ = rt(s) ? An : Ye.current, _ = ar(t, _));
      var $ = s.getDerivedStateFromProps;
      (j = typeof $ == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== O || P !== _) && Qc(t, f, o, _), yn = !1, P = t.memoizedState, f.state = P, ci(t, o, f, l);
      var Y = t.memoizedState;
      y !== O || P !== Y || nt.current || yn ? (typeof $ == "function" && (Ca(t, s, $, o), Y = t.memoizedState), (I = yn || Gc(t, s, I, o, P, Y, _) || !1) ? (j || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, Y, _), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, Y, _)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = Y), f.props = o, f.state = Y, f.context = _, o = I) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Ma(e, t, s, o, c, l);
  }
  function Ma(e, t, s, o, l, c) {
    id(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return l && dc(t, s, !1), tn(e, t, c);
    o = t.stateNode, Pm.current = t;
    var y = f && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = dr(t, e.child, null, c), t.child = dr(t, null, y, c)) : Xe(e, t, y, c), t.memoizedState = o.state, l && dc(t, s, !0), t.child;
  }
  function ad(e) {
    var t = e.stateNode;
    t.pendingContext ? uc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && uc(e, t.context, !1), pa(e, t.containerInfo);
  }
  function ld(e, t, s, o, l) {
    return cr(), aa(l), t.flags |= 256, Xe(e, t, s, o), t.child;
  }
  var Na = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Pa(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function ud(e, t, s) {
    var o = t.pendingProps, l = Te.current, c = !1, f = (t.flags & 128) !== 0, y;
    if ((y = f) || (y = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), y ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), _e(Te, l & 1), e === null)
      return oa(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = f) : c = Mi(f, o, 0, null), e = Bn(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = Pa(s), t.memoizedState = Na, e) : ja(t, f));
    if (l = e.memoizedState, l !== null && (y = l.dehydrated, y !== null)) return jm(e, t, f, o, y, l, s);
    if (c) {
      c = o.fallback, f = t.mode, l = e.child, y = l.sibling;
      var _ = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = _, t.deletions = null) : (o = kn(l, _), o.subtreeFlags = l.subtreeFlags & 14680064), y !== null ? c = kn(y, c) : (c = Bn(c, f, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, f = e.child.memoizedState, f = f === null ? Pa(s) : { baseLanes: f.baseLanes | s, cachePool: null, transitions: f.transitions }, c.memoizedState = f, c.childLanes = e.childLanes & ~s, t.memoizedState = Na, o;
    }
    return c = e.child, e = c.sibling, o = kn(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function ja(e, t) {
    return t = Mi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function vi(e, t, s, o) {
    return o !== null && aa(o), dr(t, e.child, null, s), e = ja(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function jm(e, t, s, o, l, c, f) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = Ia(Error(i(422))), vi(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Mi({ mode: "visible", children: o.children }, l, 0, null), c = Bn(c, l, f, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && dr(t, e.child, null, f), t.child.memoizedState = Pa(f), t.memoizedState = Na, c);
    if ((t.mode & 1) === 0) return vi(e, t, f, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var y = o.dgst;
      return o = y, c = Error(i(419)), o = Ia(c, o, void 0), vi(e, t, f, o);
    }
    if (y = (f & e.childLanes) !== 0, st || y) {
      if (o = Ue, o !== null) {
        switch (f & -f) {
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
        l = (l & (o.suspendedLanes | f)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Zt(e, l), Rt(o, e, l, -1));
      }
      return Ka(), o = Ia(Error(i(421))), vi(e, t, f, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Gm.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, dt = hn(l.nextSibling), ct = t, ke = !0, bt = null, e !== null && (pt[mt++] = Jt, pt[mt++] = Xt, pt[mt++] = Mn, Jt = e.id, Xt = e.overflow, Mn = t), t = ja(t, o.children), t.flags |= 4096, t);
  }
  function cd(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), da(e.return, t, s);
  }
  function La(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function dd(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (Xe(e, t, o.children, s), o = Te.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && cd(e, s, t);
        else if (e.tag === 19) cd(e, s, t);
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
    if (_e(Te, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (s = t.child, l = null; s !== null; ) e = s.alternate, e !== null && di(e) === null && (l = s), s = s.sibling;
        s = l, s === null ? (l = t.child, t.child = null) : (l = s.sibling, s.sibling = null), La(t, !1, l, s, c);
        break;
      case "backwards":
        for (s = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && di(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = s, s = l, l = e;
        }
        La(t, !0, s, null, c);
        break;
      case "together":
        La(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function _i(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function tn(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), On |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = kn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = kn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function Lm(e, t, s) {
    switch (t.tag) {
      case 3:
        ad(t), cr();
        break;
      case 5:
        bc(t);
        break;
      case 1:
        rt(t.type) && ti(t);
        break;
      case 4:
        pa(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        _e(ai, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (_e(Te, Te.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? ud(e, t, s) : (_e(Te, Te.current & 1), e = tn(e, t, s), e !== null ? e.sibling : null);
        _e(Te, Te.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return dd(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), _e(Te, Te.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, sd(e, t, s);
    }
    return tn(e, t, s);
  }
  var fd, Oa, hd, pd;
  fd = function(e, t) {
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
  }, Oa = function() {
  }, hd = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, jn(Ft.current);
      var c = null;
      switch (s) {
        case "input":
          l = wt(e, l), o = wt(e, o), c = [];
          break;
        case "select":
          l = M({}, l, { value: void 0 }), o = M({}, o, { value: void 0 }), c = [];
          break;
        case "textarea":
          l = po(e, l), o = po(e, o), c = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Xs);
      }
      go(s, o);
      var f;
      s = null;
      for (I in l) if (!o.hasOwnProperty(I) && l.hasOwnProperty(I) && l[I] != null) if (I === "style") {
        var y = l[I];
        for (f in y) y.hasOwnProperty(f) && (s || (s = {}), s[f] = "");
      } else I !== "dangerouslySetInnerHTML" && I !== "children" && I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && I !== "autoFocus" && (u.hasOwnProperty(I) ? c || (c = []) : (c = c || []).push(I, null));
      for (I in o) {
        var _ = o[I];
        if (y = l?.[I], o.hasOwnProperty(I) && _ !== y && (_ != null || y != null)) if (I === "style") if (y) {
          for (f in y) !y.hasOwnProperty(f) || _ && _.hasOwnProperty(f) || (s || (s = {}), s[f] = "");
          for (f in _) _.hasOwnProperty(f) && y[f] !== _[f] && (s || (s = {}), s[f] = _[f]);
        } else s || (c || (c = []), c.push(
          I,
          s
        )), s = _;
        else I === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, y = y ? y.__html : void 0, _ != null && y !== _ && (c = c || []).push(I, _)) : I === "children" ? typeof _ != "string" && typeof _ != "number" || (c = c || []).push(I, "" + _) : I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && (u.hasOwnProperty(I) ? (_ != null && I === "onScroll" && we("scroll", e), c || y === _ || (c = [])) : (c = c || []).push(I, _));
      }
      s && (c = c || []).push("style", s);
      var I = c;
      (t.updateQueue = I) && (t.flags |= 4);
    }
  }, pd = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function is(e, t) {
    if (!ke) switch (e.tailMode) {
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
  function qe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = s, t;
  }
  function Om(e, t, s) {
    var o = t.pendingProps;
    switch (sa(t), t.tag) {
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
        return qe(t), null;
      case 1:
        return rt(t.type) && ei(), qe(t), null;
      case 3:
        return o = t.stateNode, pr(), Se(nt), Se(Ye), ya(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (ii(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, bt !== null && (Ga(bt), bt = null))), Oa(e, t), qe(t), null;
      case 5:
        ma(t);
        var l = jn(es.current);
        if (s = t.type, e !== null && t.stateNode != null) hd(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return qe(t), null;
          }
          if (e = jn(Ft.current), ii(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[Dt] = t, o[Qr] = c, e = (t.mode & 1) !== 0, s) {
              case "dialog":
                we("cancel", o), we("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                we("load", o);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Yr.length; l++) we(Yr[l], o);
                break;
              case "source":
                we("error", o);
                break;
              case "img":
              case "image":
              case "link":
                we(
                  "error",
                  o
                ), we("load", o);
                break;
              case "details":
                we("toggle", o);
                break;
              case "input":
                Le(o, c), we("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, we("invalid", o);
                break;
              case "textarea":
                Jl(o, c), we("invalid", o);
            }
            go(s, c), l = null;
            for (var f in c) if (c.hasOwnProperty(f)) {
              var y = c[f];
              f === "children" ? typeof y == "string" ? o.textContent !== y && (c.suppressHydrationWarning !== !0 && Js(o.textContent, y, e), l = ["children", y]) : typeof y == "number" && o.textContent !== "" + y && (c.suppressHydrationWarning !== !0 && Js(
                o.textContent,
                y,
                e
              ), l = ["children", "" + y]) : u.hasOwnProperty(f) && y != null && f === "onScroll" && we("scroll", o);
            }
            switch (s) {
              case "input":
                Tn(o), St(o, c, !0);
                break;
              case "textarea":
                Tn(o), Zl(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = Xs);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            f = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = eu(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(s, { is: o.is }) : (e = f.createElement(s), s === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, s), e[Dt] = t, e[Qr] = o, fd(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = yo(s, o), s) {
                case "dialog":
                  we("cancel", e), we("close", e), l = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  we("load", e), l = o;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < Yr.length; l++) we(Yr[l], e);
                  l = o;
                  break;
                case "source":
                  we("error", e), l = o;
                  break;
                case "img":
                case "image":
                case "link":
                  we(
                    "error",
                    e
                  ), we("load", e), l = o;
                  break;
                case "details":
                  we("toggle", e), l = o;
                  break;
                case "input":
                  Le(e, o), l = wt(e, o), we("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = M({}, o, { value: void 0 }), we("invalid", e);
                  break;
                case "textarea":
                  Jl(e, o), l = po(e, o), we("invalid", e);
                  break;
                default:
                  l = o;
              }
              go(s, l), y = l;
              for (c in y) if (y.hasOwnProperty(c)) {
                var _ = y[c];
                c === "style" ? ru(e, _) : c === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, _ != null && tu(e, _)) : c === "children" ? typeof _ == "string" ? (s !== "textarea" || _ !== "") && Tr(e, _) : typeof _ == "number" && Tr(e, "" + _) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? _ != null && c === "onScroll" && we("scroll", e) : _ != null && F(e, c, _, f));
              }
              switch (s) {
                case "input":
                  Tn(e), St(e, o, !1);
                  break;
                case "textarea":
                  Tn(e), Zl(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + oe(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, c = o.value, c != null ? Qn(e, !!o.multiple, c, !1) : o.defaultValue != null && Qn(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Xs);
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
        return qe(t), null;
      case 6:
        if (e && t.stateNode != null) pd(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = jn(es.current), jn(Ft.current), ii(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[Dt] = t, (c = o.nodeValue !== s) && (e = ct, e !== null)) switch (e.tag) {
              case 3:
                Js(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Js(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[Dt] = t, t.stateNode = o;
        }
        return qe(t), null;
      case 13:
        if (Se(Te), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ke && dt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) yc(), cr(), t.flags |= 98560, c = !1;
          else if (c = ii(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[Dt] = t;
            } else cr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            qe(t), c = !1;
          } else bt !== null && (Ga(bt), bt = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Te.current & 1) !== 0 ? ze === 0 && (ze = 3) : Ka())), t.updateQueue !== null && (t.flags |= 4), qe(t), null);
      case 4:
        return pr(), Oa(e, t), e === null && Gr(t.stateNode.containerInfo), qe(t), null;
      case 10:
        return ca(t.type._context), qe(t), null;
      case 17:
        return rt(t.type) && ei(), qe(t), null;
      case 19:
        if (Se(Te), c = t.memoizedState, c === null) return qe(t), null;
        if (o = (t.flags & 128) !== 0, f = c.rendering, f === null) if (o) is(c, !1);
        else {
          if (ze !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = di(e), f !== null) {
              for (t.flags |= 128, is(c, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, f = c.alternate, f === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f.childLanes, c.lanes = f.lanes, c.child = f.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f.memoizedProps, c.memoizedState = f.memoizedState, c.updateQueue = f.updateQueue, c.type = f.type, e = f.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return _e(Te, Te.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && Me() > vr && (t.flags |= 128, o = !0, is(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = di(f), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), is(c, !0), c.tail === null && c.tailMode === "hidden" && !f.alternate && !ke) return qe(t), null;
          } else 2 * Me() - c.renderingStartTime > vr && s !== 1073741824 && (t.flags |= 128, o = !0, is(c, !1), t.lanes = 4194304);
          c.isBackwards ? (f.sibling = t.child, t.child = f) : (s = c.last, s !== null ? s.sibling = f : t.child = f, c.last = f);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = Me(), t.sibling = null, s = Te.current, _e(Te, o ? s & 1 | 2 : s & 1), t) : (qe(t), null);
      case 22:
      case 23:
        return Qa(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (ft & 1073741824) !== 0 && (qe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : qe(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function zm(e, t) {
    switch (sa(t), t.tag) {
      case 1:
        return rt(t.type) && ei(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return pr(), Se(nt), Se(Ye), ya(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ma(t), null;
      case 13:
        if (Se(Te), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          cr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Se(Te), null;
      case 4:
        return pr(), null;
      case 10:
        return ca(t.type._context), null;
      case 22:
      case 23:
        return Qa(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var wi = !1, Qe = !1, Dm = typeof WeakSet == "function" ? WeakSet : Set, W = null;
  function gr(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      Ae(e, t, o);
    }
    else s.current = null;
  }
  function za(e, t, s) {
    try {
      s();
    } catch (o) {
      Ae(e, t, o);
    }
  }
  var md = !1;
  function Fm(e, t) {
    if (Qo = Bs, e = Gu(), Uo(e)) {
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
          var f = 0, y = -1, _ = -1, I = 0, j = 0, O = e, P = null;
          t: for (; ; ) {
            for (var $; O !== s || l !== 0 && O.nodeType !== 3 || (y = f + l), O !== c || o !== 0 && O.nodeType !== 3 || (_ = f + o), O.nodeType === 3 && (f += O.nodeValue.length), ($ = O.firstChild) !== null; )
              P = O, O = $;
            for (; ; ) {
              if (O === e) break t;
              if (P === s && ++I === l && (y = f), P === c && ++j === o && (_ = f), ($ = O.nextSibling) !== null) break;
              O = P, P = O.parentNode;
            }
            O = $;
          }
          s = y === -1 || _ === -1 ? null : { start: y, end: _ };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (Ko = { focusedElem: e, selectionRange: s }, Bs = !1, W = t; W !== null; ) if (t = W, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, W = e;
    else for (; W !== null; ) {
      t = W;
      try {
        var Y = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Y !== null) {
              var G = Y.memoizedProps, Ne = Y.memoizedState, C = t.stateNode, x = C.getSnapshotBeforeUpdate(t.elementType === t.type ? G : Ct(t.type, G), Ne);
              C.__reactInternalSnapshotBeforeUpdate = x;
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
      } catch (z) {
        Ae(t, t.return, z);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, W = e;
        break;
      }
      W = t.return;
    }
    return Y = md, md = !1, Y;
  }
  function os(e, t, s) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy;
          l.destroy = void 0, c !== void 0 && za(t, s, c);
        }
        l = l.next;
      } while (l !== o);
    }
  }
  function Si(e, t) {
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
  function Da(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function gd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, gd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Dt], delete t[Qr], delete t[ea], delete t[Sm], delete t[xm])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function yd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function vd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || yd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Fa(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = Xs));
    else if (o !== 4 && (e = e.child, e !== null)) for (Fa(e, t, s), e = e.sibling; e !== null; ) Fa(e, t, s), e = e.sibling;
  }
  function Ba(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Ba(e, t, s), e = e.sibling; e !== null; ) Ba(e, t, s), e = e.sibling;
  }
  var Ve = null, Tt = !1;
  function _n(e, t, s) {
    for (s = s.child; s !== null; ) _d(e, t, s), s = s.sibling;
  }
  function _d(e, t, s) {
    if (zt && typeof zt.onCommitFiberUnmount == "function") try {
      zt.onCommitFiberUnmount(js, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        Qe || gr(s, t);
      case 6:
        var o = Ve, l = Tt;
        Ve = null, _n(e, t, s), Ve = o, Tt = l, Ve !== null && (Tt ? (e = Ve, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : Ve.removeChild(s.stateNode));
        break;
      case 18:
        Ve !== null && (Tt ? (e = Ve, s = s.stateNode, e.nodeType === 8 ? Zo(e.parentNode, s) : e.nodeType === 1 && Zo(e, s), Dr(e)) : Zo(Ve, s.stateNode));
        break;
      case 4:
        o = Ve, l = Tt, Ve = s.stateNode.containerInfo, Tt = !0, _n(e, t, s), Ve = o, Tt = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Qe && (o = s.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var c = l, f = c.destroy;
            c = c.tag, f !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && za(s, t, f), l = l.next;
          } while (l !== o);
        }
        _n(e, t, s);
        break;
      case 1:
        if (!Qe && (gr(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = s.memoizedProps, o.state = s.memoizedState, o.componentWillUnmount();
        } catch (y) {
          Ae(s, t, y);
        }
        _n(e, t, s);
        break;
      case 21:
        _n(e, t, s);
        break;
      case 22:
        s.mode & 1 ? (Qe = (o = Qe) || s.memoizedState !== null, _n(e, t, s), Qe = o) : _n(e, t, s);
        break;
      default:
        _n(e, t, s);
    }
  }
  function wd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Dm()), t.forEach(function(o) {
        var l = qm.bind(null, e, o);
        s.has(o) || (s.add(o), o.then(l, l));
      });
    }
  }
  function It(e, t) {
    var s = t.deletions;
    if (s !== null) for (var o = 0; o < s.length; o++) {
      var l = s[o];
      try {
        var c = e, f = t, y = f;
        e: for (; y !== null; ) {
          switch (y.tag) {
            case 5:
              Ve = y.stateNode, Tt = !1;
              break e;
            case 3:
              Ve = y.stateNode.containerInfo, Tt = !0;
              break e;
            case 4:
              Ve = y.stateNode.containerInfo, Tt = !0;
              break e;
          }
          y = y.return;
        }
        if (Ve === null) throw Error(i(160));
        _d(c, f, l), Ve = null, Tt = !1;
        var _ = l.alternate;
        _ !== null && (_.return = null), l.return = null;
      } catch (I) {
        Ae(l, t, I);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Sd(t, e), t = t.sibling;
  }
  function Sd(e, t) {
    var s = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (It(t, e), Ut(e), o & 4) {
          try {
            os(3, e, e.return), Si(3, e);
          } catch (G) {
            Ae(e, e.return, G);
          }
          try {
            os(5, e, e.return);
          } catch (G) {
            Ae(e, e.return, G);
          }
        }
        break;
      case 1:
        It(t, e), Ut(e), o & 512 && s !== null && gr(s, s.return);
        break;
      case 5:
        if (It(t, e), Ut(e), o & 512 && s !== null && gr(s, s.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Tr(l, "");
          } catch (G) {
            Ae(e, e.return, G);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, f = s !== null ? s.memoizedProps : c, y = e.type, _ = e.updateQueue;
          if (e.updateQueue = null, _ !== null) try {
            y === "input" && c.type === "radio" && c.name != null && Fe(l, c), yo(y, f);
            var I = yo(y, c);
            for (f = 0; f < _.length; f += 2) {
              var j = _[f], O = _[f + 1];
              j === "style" ? ru(l, O) : j === "dangerouslySetInnerHTML" ? tu(l, O) : j === "children" ? Tr(l, O) : F(l, j, O, I);
            }
            switch (y) {
              case "input":
                Je(l, c);
                break;
              case "textarea":
                Xl(l, c);
                break;
              case "select":
                var P = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var $ = c.value;
                $ != null ? Qn(l, !!c.multiple, $, !1) : P !== !!c.multiple && (c.defaultValue != null ? Qn(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : Qn(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[Qr] = c;
          } catch (G) {
            Ae(e, e.return, G);
          }
        }
        break;
      case 6:
        if (It(t, e), Ut(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (G) {
            Ae(e, e.return, G);
          }
        }
        break;
      case 3:
        if (It(t, e), Ut(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Dr(t.containerInfo);
        } catch (G) {
          Ae(e, e.return, G);
        }
        break;
      case 4:
        It(t, e), Ut(e);
        break;
      case 13:
        It(t, e), Ut(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Ha = Me())), o & 4 && wd(e);
        break;
      case 22:
        if (j = s !== null && s.memoizedState !== null, e.mode & 1 ? (Qe = (I = Qe) || j, It(t, e), Qe = I) : It(t, e), Ut(e), o & 8192) {
          if (I = e.memoizedState !== null, (e.stateNode.isHidden = I) && !j && (e.mode & 1) !== 0) for (W = e, j = e.child; j !== null; ) {
            for (O = W = j; W !== null; ) {
              switch (P = W, $ = P.child, P.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  os(4, P, P.return);
                  break;
                case 1:
                  gr(P, P.return);
                  var Y = P.stateNode;
                  if (typeof Y.componentWillUnmount == "function") {
                    o = P, s = P.return;
                    try {
                      t = o, Y.props = t.memoizedProps, Y.state = t.memoizedState, Y.componentWillUnmount();
                    } catch (G) {
                      Ae(o, s, G);
                    }
                  }
                  break;
                case 5:
                  gr(P, P.return);
                  break;
                case 22:
                  if (P.memoizedState !== null) {
                    kd(O);
                    continue;
                  }
              }
              $ !== null ? ($.return = P, W = $) : kd(O);
            }
            j = j.sibling;
          }
          e: for (j = null, O = e; ; ) {
            if (O.tag === 5) {
              if (j === null) {
                j = O;
                try {
                  l = O.stateNode, I ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (y = O.stateNode, _ = O.memoizedProps.style, f = _ != null && _.hasOwnProperty("display") ? _.display : null, y.style.display = nu("display", f));
                } catch (G) {
                  Ae(e, e.return, G);
                }
              }
            } else if (O.tag === 6) {
              if (j === null) try {
                O.stateNode.nodeValue = I ? "" : O.memoizedProps;
              } catch (G) {
                Ae(e, e.return, G);
              }
            } else if ((O.tag !== 22 && O.tag !== 23 || O.memoizedState === null || O === e) && O.child !== null) {
              O.child.return = O, O = O.child;
              continue;
            }
            if (O === e) break e;
            for (; O.sibling === null; ) {
              if (O.return === null || O.return === e) break e;
              j === O && (j = null), O = O.return;
            }
            j === O && (j = null), O.sibling.return = O.return, O = O.sibling;
          }
        }
        break;
      case 19:
        It(t, e), Ut(e), o & 4 && wd(e);
        break;
      case 21:
        break;
      default:
        It(
          t,
          e
        ), Ut(e);
    }
  }
  function Ut(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var s = e.return; s !== null; ) {
            if (yd(s)) {
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
            o.flags & 32 && (Tr(l, ""), o.flags &= -33);
            var c = vd(e);
            Ba(e, c, l);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, y = vd(e);
            Fa(e, y, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (_) {
        Ae(e, e.return, _);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Bm(e, t, s) {
    W = e, xd(e);
  }
  function xd(e, t, s) {
    for (var o = (e.mode & 1) !== 0; W !== null; ) {
      var l = W, c = l.child;
      if (l.tag === 22 && o) {
        var f = l.memoizedState !== null || wi;
        if (!f) {
          var y = l.alternate, _ = y !== null && y.memoizedState !== null || Qe;
          y = wi;
          var I = Qe;
          if (wi = f, (Qe = _) && !I) for (W = l; W !== null; ) f = W, _ = f.child, f.tag === 22 && f.memoizedState !== null ? bd(l) : _ !== null ? (_.return = f, W = _) : bd(l);
          for (; c !== null; ) W = c, xd(c), c = c.sibling;
          W = l, wi = y, Qe = I;
        }
        Ed(e);
      } else (l.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = l, W = c) : Ed(e);
    }
  }
  function Ed(e) {
    for (; W !== null; ) {
      var t = W;
      if ((t.flags & 8772) !== 0) {
        var s = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Qe || Si(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !Qe) if (s === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? s.memoizedProps : Ct(t.type, s.memoizedProps);
                o.componentDidUpdate(l, s.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var c = t.updateQueue;
              c !== null && kc(t, c, o);
              break;
            case 3:
              var f = t.updateQueue;
              if (f !== null) {
                if (s = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    s = t.child.stateNode;
                    break;
                  case 1:
                    s = t.child.stateNode;
                }
                kc(t, f, s);
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
                var I = t.alternate;
                if (I !== null) {
                  var j = I.memoizedState;
                  if (j !== null) {
                    var O = j.dehydrated;
                    O !== null && Dr(O);
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
          Qe || t.flags & 512 && Da(t);
        } catch (P) {
          Ae(t, t.return, P);
        }
      }
      if (t === e) {
        W = null;
        break;
      }
      if (s = t.sibling, s !== null) {
        s.return = t.return, W = s;
        break;
      }
      W = t.return;
    }
  }
  function kd(e) {
    for (; W !== null; ) {
      var t = W;
      if (t === e) {
        W = null;
        break;
      }
      var s = t.sibling;
      if (s !== null) {
        s.return = t.return, W = s;
        break;
      }
      W = t.return;
    }
  }
  function bd(e) {
    for (; W !== null; ) {
      var t = W;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              Si(4, t);
            } catch (_) {
              Ae(t, s, _);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (_) {
                Ae(t, l, _);
              }
            }
            var c = t.return;
            try {
              Da(t);
            } catch (_) {
              Ae(t, c, _);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Da(t);
            } catch (_) {
              Ae(t, f, _);
            }
        }
      } catch (_) {
        Ae(t, t.return, _);
      }
      if (t === e) {
        W = null;
        break;
      }
      var y = t.sibling;
      if (y !== null) {
        y.return = t.return, W = y;
        break;
      }
      W = t.return;
    }
  }
  var Um = Math.ceil, xi = se.ReactCurrentDispatcher, Ua = se.ReactCurrentOwner, vt = se.ReactCurrentBatchConfig, de = 0, Ue = null, je = null, We = 0, ft = 0, yr = pn(0), ze = 0, as = null, On = 0, Ei = 0, $a = 0, ls = null, it = null, Ha = 0, vr = 1 / 0, nn = null, ki = !1, Va = null, wn = null, bi = !1, Sn = null, Ci = 0, us = 0, Wa = null, Ti = -1, Ii = 0;
  function Ze() {
    return (de & 6) !== 0 ? Me() : Ti !== -1 ? Ti : Ti = Me();
  }
  function xn(e) {
    return (e.mode & 1) === 0 ? 1 : (de & 2) !== 0 && We !== 0 ? We & -We : km.transition !== null ? (Ii === 0 && (Ii = vu()), Ii) : (e = me, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Tu(e.type)), e);
  }
  function Rt(e, t, s, o) {
    if (50 < us) throw us = 0, Wa = null, Error(i(185));
    Pr(e, s, o), ((de & 2) === 0 || e !== Ue) && (e === Ue && ((de & 2) === 0 && (Ei |= s), ze === 4 && En(e, We)), ot(e, o), s === 1 && de === 0 && (t.mode & 1) === 0 && (vr = Me() + 500, ni && gn()));
  }
  function ot(e, t) {
    var s = e.callbackNode;
    kp(e, t);
    var o = zs(e, e === Ue ? We : 0);
    if (o === 0) s !== null && mu(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && mu(s), t === 1) e.tag === 0 ? Em(Td.bind(null, e)) : fc(Td.bind(null, e)), _m(function() {
        (de & 6) === 0 && gn();
      }), s = null;
      else {
        switch (_u(o)) {
          case 1:
            s = ko;
            break;
          case 4:
            s = gu;
            break;
          case 16:
            s = Ps;
            break;
          case 536870912:
            s = yu;
            break;
          default:
            s = Ps;
        }
        s = Ld(s, Cd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function Cd(e, t) {
    if (Ti = -1, Ii = 0, (de & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (_r() && e.callbackNode !== s) return null;
    var o = zs(e, e === Ue ? We : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = Ri(e, o);
    else {
      t = o;
      var l = de;
      de |= 2;
      var c = Rd();
      (Ue !== e || We !== t) && (nn = null, vr = Me() + 500, Dn(e, t));
      do
        try {
          Vm();
          break;
        } catch (y) {
          Id(e, y);
        }
      while (!0);
      ua(), xi.current = c, de = l, je !== null ? t = 0 : (Ue = null, We = 0, t = ze);
    }
    if (t !== 0) {
      if (t === 2 && (l = bo(e), l !== 0 && (o = l, t = Ya(e, l))), t === 1) throw s = as, Dn(e, 0), En(e, o), ot(e, Me()), s;
      if (t === 6) En(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !$m(l) && (t = Ri(e, o), t === 2 && (c = bo(e), c !== 0 && (o = c, t = Ya(e, c))), t === 1)) throw s = as, Dn(e, 0), En(e, o), ot(e, Me()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            Fn(e, it, nn);
            break;
          case 3:
            if (En(e, o), (o & 130023424) === o && (t = Ha + 500 - Me(), 10 < t)) {
              if (zs(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                Ze(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Xo(Fn.bind(null, e, it, nn), t);
              break;
            }
            Fn(e, it, nn);
            break;
          case 4:
            if (En(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var f = 31 - Et(o);
              c = 1 << f, f = t[f], f > l && (l = f), o &= ~c;
            }
            if (o = l, o = Me() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Um(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = Xo(Fn.bind(null, e, it, nn), o);
              break;
            }
            Fn(e, it, nn);
            break;
          case 5:
            Fn(e, it, nn);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return ot(e, Me()), e.callbackNode === s ? Cd.bind(null, e) : null;
  }
  function Ya(e, t) {
    var s = ls;
    return e.current.memoizedState.isDehydrated && (Dn(e, t).flags |= 256), e = Ri(e, t), e !== 2 && (t = it, it = s, t !== null && Ga(t)), e;
  }
  function Ga(e) {
    it === null ? it = e : it.push.apply(it, e);
  }
  function $m(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var s = t.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var o = 0; o < s.length; o++) {
          var l = s[o], c = l.getSnapshot;
          l = l.value;
          try {
            if (!kt(c(), l)) return !1;
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
  function En(e, t) {
    for (t &= ~$a, t &= ~Ei, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var s = 31 - Et(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function Td(e) {
    if ((de & 6) !== 0) throw Error(i(327));
    _r();
    var t = zs(e, 0);
    if ((t & 1) === 0) return ot(e, Me()), null;
    var s = Ri(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = bo(e);
      o !== 0 && (t = o, s = Ya(e, o));
    }
    if (s === 1) throw s = as, Dn(e, 0), En(e, t), ot(e, Me()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Fn(e, it, nn), ot(e, Me()), null;
  }
  function qa(e, t) {
    var s = de;
    de |= 1;
    try {
      return e(t);
    } finally {
      de = s, de === 0 && (vr = Me() + 500, ni && gn());
    }
  }
  function zn(e) {
    Sn !== null && Sn.tag === 0 && (de & 6) === 0 && _r();
    var t = de;
    de |= 1;
    var s = vt.transition, o = me;
    try {
      if (vt.transition = null, me = 1, e) return e();
    } finally {
      me = o, vt.transition = s, de = t, (de & 6) === 0 && gn();
    }
  }
  function Qa() {
    ft = yr.current, Se(yr);
  }
  function Dn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, vm(s)), je !== null) for (s = je.return; s !== null; ) {
      var o = s;
      switch (sa(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && ei();
          break;
        case 3:
          pr(), Se(nt), Se(Ye), ya();
          break;
        case 5:
          ma(o);
          break;
        case 4:
          pr();
          break;
        case 13:
          Se(Te);
          break;
        case 19:
          Se(Te);
          break;
        case 10:
          ca(o.type._context);
          break;
        case 22:
        case 23:
          Qa();
      }
      s = s.return;
    }
    if (Ue = e, je = e = kn(e.current, null), We = ft = t, ze = 0, as = null, $a = Ei = On = 0, it = ls = null, Pn !== null) {
      for (t = 0; t < Pn.length; t++) if (s = Pn[t], o = s.interleaved, o !== null) {
        s.interleaved = null;
        var l = o.next, c = s.pending;
        if (c !== null) {
          var f = c.next;
          c.next = l, o.next = f;
        }
        s.pending = o;
      }
      Pn = null;
    }
    return e;
  }
  function Id(e, t) {
    do {
      var s = je;
      try {
        if (ua(), fi.current = gi, hi) {
          for (var o = Ie.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          hi = !1;
        }
        if (Ln = 0, Be = Oe = Ie = null, ts = !1, ns = 0, Ua.current = null, s === null || s.return === null) {
          ze = 1, as = t, je = null;
          break;
        }
        e: {
          var c = e, f = s.return, y = s, _ = t;
          if (t = We, y.flags |= 32768, _ !== null && typeof _ == "object" && typeof _.then == "function") {
            var I = _, j = y, O = j.tag;
            if ((j.mode & 1) === 0 && (O === 0 || O === 11 || O === 15)) {
              var P = j.alternate;
              P ? (j.updateQueue = P.updateQueue, j.memoizedState = P.memoizedState, j.lanes = P.lanes) : (j.updateQueue = null, j.memoizedState = null);
            }
            var $ = Zc(f);
            if ($ !== null) {
              $.flags &= -257, ed($, f, y, c, t), $.mode & 1 && Xc(c, I, t), t = $, _ = I;
              var Y = t.updateQueue;
              if (Y === null) {
                var G = /* @__PURE__ */ new Set();
                G.add(_), t.updateQueue = G;
              } else Y.add(_);
              break e;
            } else {
              if ((t & 1) === 0) {
                Xc(c, I, t), Ka();
                break e;
              }
              _ = Error(i(426));
            }
          } else if (ke && y.mode & 1) {
            var Ne = Zc(f);
            if (Ne !== null) {
              (Ne.flags & 65536) === 0 && (Ne.flags |= 256), ed(Ne, f, y, c, t), aa(mr(_, y));
              break e;
            }
          }
          c = _ = mr(_, y), ze !== 4 && (ze = 2), ls === null ? ls = [c] : ls.push(c), c = f;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var C = Kc(c, _, t);
                Ec(c, C);
                break e;
              case 1:
                y = _;
                var x = c.type, T = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof x.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (wn === null || !wn.has(T)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var z = Jc(c, y, t);
                  Ec(c, z);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        Md(s);
      } catch (q) {
        t = q, je === s && s !== null && (je = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Rd() {
    var e = xi.current;
    return xi.current = gi, e === null ? gi : e;
  }
  function Ka() {
    (ze === 0 || ze === 3 || ze === 2) && (ze = 4), Ue === null || (On & 268435455) === 0 && (Ei & 268435455) === 0 || En(Ue, We);
  }
  function Ri(e, t) {
    var s = de;
    de |= 2;
    var o = Rd();
    (Ue !== e || We !== t) && (nn = null, Dn(e, t));
    do
      try {
        Hm();
        break;
      } catch (l) {
        Id(e, l);
      }
    while (!0);
    if (ua(), de = s, xi.current = o, je !== null) throw Error(i(261));
    return Ue = null, We = 0, ze;
  }
  function Hm() {
    for (; je !== null; ) Ad(je);
  }
  function Vm() {
    for (; je !== null && !mp(); ) Ad(je);
  }
  function Ad(e) {
    var t = jd(e.alternate, e, ft);
    e.memoizedProps = e.pendingProps, t === null ? Md(e) : je = t, Ua.current = null;
  }
  function Md(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = Om(s, t, ft), s !== null) {
          je = s;
          return;
        }
      } else {
        if (s = zm(s, t), s !== null) {
          s.flags &= 32767, je = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          ze = 6, je = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        je = t;
        return;
      }
      je = t = e;
    } while (t !== null);
    ze === 0 && (ze = 5);
  }
  function Fn(e, t, s) {
    var o = me, l = vt.transition;
    try {
      vt.transition = null, me = 1, Wm(e, t, s, o);
    } finally {
      vt.transition = l, me = o;
    }
    return null;
  }
  function Wm(e, t, s, o) {
    do
      _r();
    while (Sn !== null);
    if ((de & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (bp(e, c), e === Ue && (je = Ue = null, We = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || bi || (bi = !0, Ld(Ps, function() {
      return _r(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = vt.transition, vt.transition = null;
      var f = me;
      me = 1;
      var y = de;
      de |= 4, Ua.current = null, Fm(e, s), Sd(s, e), dm(Ko), Bs = !!Qo, Ko = Qo = null, e.current = s, Bm(s), gp(), de = y, me = f, vt.transition = c;
    } else e.current = s;
    if (bi && (bi = !1, Sn = e, Ci = l), c = e.pendingLanes, c === 0 && (wn = null), _p(s.stateNode), ot(e, Me()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (ki) throw ki = !1, e = Va, Va = null, e;
    return (Ci & 1) !== 0 && e.tag !== 0 && _r(), c = e.pendingLanes, (c & 1) !== 0 ? e === Wa ? us++ : (us = 0, Wa = e) : us = 0, gn(), null;
  }
  function _r() {
    if (Sn !== null) {
      var e = _u(Ci), t = vt.transition, s = me;
      try {
        if (vt.transition = null, me = 16 > e ? 16 : e, Sn === null) var o = !1;
        else {
          if (e = Sn, Sn = null, Ci = 0, (de & 6) !== 0) throw Error(i(331));
          var l = de;
          for (de |= 4, W = e.current; W !== null; ) {
            var c = W, f = c.child;
            if ((W.flags & 16) !== 0) {
              var y = c.deletions;
              if (y !== null) {
                for (var _ = 0; _ < y.length; _++) {
                  var I = y[_];
                  for (W = I; W !== null; ) {
                    var j = W;
                    switch (j.tag) {
                      case 0:
                      case 11:
                      case 15:
                        os(8, j, c);
                    }
                    var O = j.child;
                    if (O !== null) O.return = j, W = O;
                    else for (; W !== null; ) {
                      j = W;
                      var P = j.sibling, $ = j.return;
                      if (gd(j), j === I) {
                        W = null;
                        break;
                      }
                      if (P !== null) {
                        P.return = $, W = P;
                        break;
                      }
                      W = $;
                    }
                  }
                }
                var Y = c.alternate;
                if (Y !== null) {
                  var G = Y.child;
                  if (G !== null) {
                    Y.child = null;
                    do {
                      var Ne = G.sibling;
                      G.sibling = null, G = Ne;
                    } while (G !== null);
                  }
                }
                W = c;
              }
            }
            if ((c.subtreeFlags & 2064) !== 0 && f !== null) f.return = c, W = f;
            else e: for (; W !== null; ) {
              if (c = W, (c.flags & 2048) !== 0) switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  os(9, c, c.return);
              }
              var C = c.sibling;
              if (C !== null) {
                C.return = c.return, W = C;
                break e;
              }
              W = c.return;
            }
          }
          var x = e.current;
          for (W = x; W !== null; ) {
            f = W;
            var T = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && T !== null) T.return = f, W = T;
            else e: for (f = x; W !== null; ) {
              if (y = W, (y.flags & 2048) !== 0) try {
                switch (y.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Si(9, y);
                }
              } catch (q) {
                Ae(y, y.return, q);
              }
              if (y === f) {
                W = null;
                break e;
              }
              var z = y.sibling;
              if (z !== null) {
                z.return = y.return, W = z;
                break e;
              }
              W = y.return;
            }
          }
          if (de = l, gn(), zt && typeof zt.onPostCommitFiberRoot == "function") try {
            zt.onPostCommitFiberRoot(js, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        me = s, vt.transition = t;
      }
    }
    return !1;
  }
  function Nd(e, t, s) {
    t = mr(s, t), t = Kc(e, t, 1), e = vn(e, t, 1), t = Ze(), e !== null && (Pr(e, 1, t), ot(e, t));
  }
  function Ae(e, t, s) {
    if (e.tag === 3) Nd(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Nd(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (wn === null || !wn.has(o))) {
          e = mr(s, e), e = Jc(t, e, 1), t = vn(t, e, 1), e = Ze(), t !== null && (Pr(t, 1, e), ot(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Ym(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = Ze(), e.pingedLanes |= e.suspendedLanes & s, Ue === e && (We & s) === s && (ze === 4 || ze === 3 && (We & 130023424) === We && 500 > Me() - Ha ? Dn(e, 0) : $a |= s), ot(e, t);
  }
  function Pd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Os, Os <<= 1, (Os & 130023424) === 0 && (Os = 4194304)));
    var s = Ze();
    e = Zt(e, t), e !== null && (Pr(e, t, s), ot(e, s));
  }
  function Gm(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), Pd(e, s);
  }
  function qm(e, t) {
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
    o !== null && o.delete(t), Pd(e, s);
  }
  var jd;
  jd = function(e, t, s) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || nt.current) st = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return st = !1, Lm(e, t, s);
      st = (e.flags & 131072) !== 0;
    }
    else st = !1, ke && (t.flags & 1048576) !== 0 && hc(t, si, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        _i(e, t), e = t.pendingProps;
        var l = ar(t, Ye.current);
        hr(t, s), l = wa(null, t, o, e, l, s);
        var c = Sa();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, rt(o) ? (c = !0, ti(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, ha(t), l.updater = yi, t.stateNode = l, l._reactInternals = t, Ta(t, o, e, s), t = Ma(null, t, o, !0, c, s)) : (t.tag = 0, ke && c && ra(t), Xe(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (_i(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = Km(o), e = Ct(o, e), l) {
            case 0:
              t = Aa(null, t, o, e, s);
              break e;
            case 1:
              t = od(null, t, o, e, s);
              break e;
            case 11:
              t = td(null, t, o, e, s);
              break e;
            case 14:
              t = nd(null, t, o, Ct(o.type, e), s);
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
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), Aa(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), od(e, t, o, l, s);
      case 3:
        e: {
          if (ad(t), e === null) throw Error(i(387));
          o = t.pendingProps, c = t.memoizedState, l = c.element, xc(e, t), ci(t, o, null, s);
          var f = t.memoizedState;
          if (o = f.element, c.isDehydrated) if (c = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
            l = mr(Error(i(423)), t), t = ld(e, t, o, s, l);
            break e;
          } else if (o !== l) {
            l = mr(Error(i(424)), t), t = ld(e, t, o, s, l);
            break e;
          } else for (dt = hn(t.stateNode.containerInfo.firstChild), ct = t, ke = !0, bt = null, s = wc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (cr(), o === l) {
              t = tn(e, t, s);
              break e;
            }
            Xe(e, t, o, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return bc(t), e === null && oa(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, f = l.children, Jo(o, l) ? f = null : c !== null && Jo(o, c) && (t.flags |= 32), id(e, t), Xe(e, t, f, s), t.child;
      case 6:
        return e === null && oa(t), null;
      case 13:
        return ud(e, t, s);
      case 4:
        return pa(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = dr(t, null, o, s) : Xe(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), td(e, t, o, l, s);
      case 7:
        return Xe(e, t, t.pendingProps, s), t.child;
      case 8:
        return Xe(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return Xe(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, f = l.value, _e(ai, o._currentValue), o._currentValue = f, c !== null) if (kt(c.value, f)) {
            if (c.children === l.children && !nt.current) {
              t = tn(e, t, s);
              break e;
            }
          } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
            var y = c.dependencies;
            if (y !== null) {
              f = c.child;
              for (var _ = y.firstContext; _ !== null; ) {
                if (_.context === o) {
                  if (c.tag === 1) {
                    _ = en(-1, s & -s), _.tag = 2;
                    var I = c.updateQueue;
                    if (I !== null) {
                      I = I.shared;
                      var j = I.pending;
                      j === null ? _.next = _ : (_.next = j.next, j.next = _), I.pending = _;
                    }
                  }
                  c.lanes |= s, _ = c.alternate, _ !== null && (_.lanes |= s), da(
                    c.return,
                    s,
                    t
                  ), y.lanes |= s;
                  break;
                }
                _ = _.next;
              }
            } else if (c.tag === 10) f = c.type === t.type ? null : c.child;
            else if (c.tag === 18) {
              if (f = c.return, f === null) throw Error(i(341));
              f.lanes |= s, y = f.alternate, y !== null && (y.lanes |= s), da(f, s, t), f = c.sibling;
            } else f = c.child;
            if (f !== null) f.return = c;
            else for (f = c; f !== null; ) {
              if (f === t) {
                f = null;
                break;
              }
              if (c = f.sibling, c !== null) {
                c.return = f.return, f = c;
                break;
              }
              f = f.return;
            }
            c = f;
          }
          Xe(e, t, l.children, s), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, o = t.pendingProps.children, hr(t, s), l = gt(l), o = o(l), t.flags |= 1, Xe(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = Ct(o, t.pendingProps), l = Ct(o.type, l), nd(e, t, o, l, s);
      case 15:
        return rd(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), _i(e, t), t.tag = 1, rt(o) ? (e = !0, ti(t)) : e = !1, hr(t, s), qc(t, o, l), Ta(t, o, l, s), Ma(null, t, o, !0, e, s);
      case 19:
        return dd(e, t, s);
      case 22:
        return sd(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function Ld(e, t) {
    return pu(e, t);
  }
  function Qm(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, s, o) {
    return new Qm(e, t, s, o);
  }
  function Ja(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Km(e) {
    if (typeof e == "function") return Ja(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === ye) return 11;
      if (e === He) return 14;
    }
    return 2;
  }
  function kn(e, t) {
    var s = e.alternate;
    return s === null ? (s = _t(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function Ai(e, t, s, o, l, c) {
    var f = 2;
    if (o = e, typeof e == "function") Ja(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case ie:
        return Bn(s.children, l, c, t);
      case Q:
        f = 8, l |= 8;
        break;
      case le:
        return e = _t(12, s, t, l | 2), e.elementType = le, e.lanes = c, e;
      case be:
        return e = _t(13, s, t, l), e.elementType = be, e.lanes = c, e;
      case Ce:
        return e = _t(19, s, t, l), e.elementType = Ce, e.lanes = c, e;
      case ve:
        return Mi(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case ge:
            f = 10;
            break e;
          case Ee:
            f = 9;
            break e;
          case ye:
            f = 11;
            break e;
          case He:
            f = 14;
            break e;
          case Pe:
            f = 16, o = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = _t(f, s, t, l), t.elementType = e, t.type = o, t.lanes = c, t;
  }
  function Bn(e, t, s, o) {
    return e = _t(7, e, o, t), e.lanes = s, e;
  }
  function Mi(e, t, s, o) {
    return e = _t(22, e, o, t), e.elementType = ve, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function Xa(e, t, s) {
    return e = _t(6, e, null, t), e.lanes = s, e;
  }
  function Za(e, t, s) {
    return t = _t(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Jm(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Co(0), this.expirationTimes = Co(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Co(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function el(e, t, s, o, l, c, f, y, _) {
    return e = new Jm(e, t, s, y, _), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = _t(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ha(c), e;
  }
  function Xm(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: U, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function Od(e) {
    if (!e) return mn;
    e = e._reactInternals;
    e: {
      if (In(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (rt(t.type)) {
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
      if (rt(s)) return cc(e, s, t);
    }
    return t;
  }
  function zd(e, t, s, o, l, c, f, y, _) {
    return e = el(s, o, !0, e, l, c, f, y, _), e.context = Od(null), s = e.current, o = Ze(), l = xn(s), c = en(o, l), c.callback = t ?? null, vn(s, c, l), e.current.lanes = l, Pr(e, l, o), ot(e, o), e;
  }
  function Ni(e, t, s, o) {
    var l = t.current, c = Ze(), f = xn(l);
    return s = Od(s), t.context === null ? t.context = s : t.pendingContext = s, t = en(c, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = vn(l, t, f), e !== null && (Rt(e, l, f, c), ui(e, l, f)), f;
  }
  function Pi(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Dd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function tl(e, t) {
    Dd(e, t), (e = e.alternate) && Dd(e, t);
  }
  function Zm() {
    return null;
  }
  var Fd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function nl(e) {
    this._internalRoot = e;
  }
  ji.prototype.render = nl.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Ni(e, t, null, null);
  }, ji.prototype.unmount = nl.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      zn(function() {
        Ni(null, e, null, null);
      }), t[Qt] = null;
    }
  };
  function ji(e) {
    this._internalRoot = e;
  }
  ji.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = xu();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < cn.length && t !== 0 && t < cn[s].priority; s++) ;
      cn.splice(s, 0, e), s === 0 && bu(e);
    }
  };
  function rl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Li(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Bd() {
  }
  function eg(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var I = Pi(f);
          c.call(I);
        };
      }
      var f = zd(t, o, e, 0, null, !1, !1, "", Bd);
      return e._reactRootContainer = f, e[Qt] = f.current, Gr(e.nodeType === 8 ? e.parentNode : e), zn(), f;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var y = o;
      o = function() {
        var I = Pi(_);
        y.call(I);
      };
    }
    var _ = el(e, 0, !1, null, null, !1, !1, "", Bd);
    return e._reactRootContainer = _, e[Qt] = _.current, Gr(e.nodeType === 8 ? e.parentNode : e), zn(function() {
      Ni(t, _, s, o);
    }), _;
  }
  function Oi(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var f = c;
      if (typeof l == "function") {
        var y = l;
        l = function() {
          var _ = Pi(f);
          y.call(_);
        };
      }
      Ni(t, f, e, l);
    } else f = eg(s, t, e, l, o);
    return Pi(f);
  }
  wu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = Nr(t.pendingLanes);
          s !== 0 && (To(t, s | 1), ot(t, Me()), (de & 6) === 0 && (vr = Me() + 500, gn()));
        }
        break;
      case 13:
        zn(function() {
          var o = Zt(e, 1);
          if (o !== null) {
            var l = Ze();
            Rt(o, e, 1, l);
          }
        }), tl(e, 1);
    }
  }, Io = function(e) {
    if (e.tag === 13) {
      var t = Zt(e, 134217728);
      if (t !== null) {
        var s = Ze();
        Rt(t, e, 134217728, s);
      }
      tl(e, 134217728);
    }
  }, Su = function(e) {
    if (e.tag === 13) {
      var t = xn(e), s = Zt(e, t);
      if (s !== null) {
        var o = Ze();
        Rt(s, e, t, o);
      }
      tl(e, t);
    }
  }, xu = function() {
    return me;
  }, Eu = function(e, t) {
    var s = me;
    try {
      return me = e, t();
    } finally {
      me = s;
    }
  }, wo = function(e, t, s) {
    switch (t) {
      case "input":
        if (Je(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = Zs(o);
              if (!l) throw Error(i(90));
              on(o), Je(o, l);
            }
          }
        }
        break;
      case "textarea":
        Xl(e, s);
        break;
      case "select":
        t = s.value, t != null && Qn(e, !!s.multiple, t, !1);
    }
  }, au = qa, lu = zn;
  var tg = { usingClientEntryPoint: !1, Events: [Kr, ir, Zs, iu, ou, qa] }, cs = { findFiberByHostInstance: Rn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ng = { bundleType: cs.bundleType, version: cs.version, rendererPackageName: cs.rendererPackageName, rendererConfig: cs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: se.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = fu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: cs.findFiberByHostInstance || Zm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zi.isDisabled && zi.supportsFiber) try {
      js = zi.inject(ng), zt = zi;
    } catch {
    }
  }
  return at.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tg, at.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!rl(t)) throw Error(i(200));
    return Xm(e, t, null, s);
  }, at.createRoot = function(e, t) {
    if (!rl(e)) throw Error(i(299));
    var s = !1, o = "", l = Fd;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = el(e, 1, !1, null, null, s, !1, o, l), e[Qt] = t.current, Gr(e.nodeType === 8 ? e.parentNode : e), new nl(t);
  }, at.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = fu(t), e = e === null ? null : e.stateNode, e;
  }, at.flushSync = function(e) {
    return zn(e);
  }, at.hydrate = function(e, t, s) {
    if (!Li(t)) throw Error(i(200));
    return Oi(null, e, t, !0, s);
  }, at.hydrateRoot = function(e, t, s) {
    if (!rl(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", f = Fd;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (f = s.onRecoverableError)), t = zd(t, null, e, 1, s ?? null, l, !1, c, f), e[Qt] = t.current, Gr(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new ji(t);
  }, at.render = function(e, t, s) {
    if (!Li(t)) throw Error(i(200));
    return Oi(null, e, t, !1, s);
  }, at.unmountComponentAtNode = function(e) {
    if (!Li(e)) throw Error(i(40));
    return e._reactRootContainer ? (zn(function() {
      Oi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Qt] = null;
      });
    }), !0) : !1;
  }, at.unstable_batchedUpdates = qa, at.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Li(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Oi(e, t, s, !1, o);
  }, at.version = "18.3.1-next-f1338f8080-20240426", at;
}
var qd;
function Of() {
  if (qd) return ol.exports;
  qd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), ol.exports = dg(), ol.exports;
}
var Qd;
function fg() {
  if (Qd) return Di;
  Qd = 1;
  var r = Of();
  return Di.createRoot = r.createRoot, Di.hydrateRoot = r.hydrateRoot, Di;
}
var hg = fg(), pg = Of();
const mg = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
  if (a.system && (i.system ? i.system += `

${a.system}` : i.system = a.system), a.tools)
    for (const [u, d] of Object.entries(a.tools)) {
      const h = i.tools?.[u];
      if (h && h !== d)
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
class zf {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return mg(this._providers);
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
class gg {
  _contextProvider = new zf();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class yg {
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
const vg = (r) => r.status.type === "complete";
class Df extends yg {
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => vg(d) ? d : await n.send(d))) : [], a = this.text;
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
      const h = this._attachments.findIndex((p) => p.id === d.id);
      h !== -1 ? this._attachments = [
        ...this._attachments.slice(0, h),
        d,
        ...this._attachments.slice(h + 1)
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
      for (const E of this._dictationUnsubscribes)
        E();
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
      const E = v.isFinal !== !1, S = this._dictationBaseText && !this._dictationBaseText.endsWith(" ") && v.transcript ? " " : "";
      if (E) {
        if (this._dictationBaseText = this._dictationBaseText + S + v.transcript, this._currentInterimText = "", this._text = this._dictationBaseText, this._dictation) {
          const { transcript: A, ...N } = this._dictation;
          this._dictation = N;
        }
        this._notifySubscribers();
      } else
        this._currentInterimText = S + v.transcript, this._text = this._dictationBaseText + this._currentInterimText, this._dictation && (this._dictation = {
          ...this._dictation,
          transcript: v.transcript
        }), this._notifySubscribers();
    });
    this._dictationUnsubscribes.push(d);
    const h = a.onSpeechStart(() => {
      this._isActiveSession(u, a) && (this._dictation = {
        status: { type: "running" },
        inputDisabled: i,
        ...this._dictation?.transcript && {
          transcript: this._dictation.transcript
        }
      }, this._notifySubscribers());
    });
    this._dictationUnsubscribes.push(h);
    const p = a.onSpeechEnd(() => {
      this._cleanupDictation({ sessionId: u });
    });
    this._dictationUnsubscribes.push(p);
    const g = setInterval(() => {
      this._isActiveSession(u, a) && a.status.type === "ended" && this._cleanupDictation({ sessionId: u });
    }, 100);
    this._dictationUnsubscribes.push(() => clearInterval(g));
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
class _g extends Df {
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
let wg = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const Pl = wg("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), Sg = "__optimistic__", xg = () => `${Sg}${Pl()}`, br = /* @__PURE__ */ Symbol("autoStatus"), Eg = Object.freeze(Object.assign({ type: "running" }, { [br]: !0 })), kg = Object.freeze(Object.assign({
  type: "complete",
  reason: "unknown"
}, { [br]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "tool-calls"
}, { [br]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "interrupt"
}, { [br]: !0 }));
const bg = (r) => r[br] === !0, Ff = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [br]: !0 }) : r && n ? Eg : kg;
var Un = { exports: {} }, Kd;
function Cg() {
  if (Kd) return Un.exports;
  Kd = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(p, g, v) {
    v == null && g !== null && typeof g == "object" && (v = g, g = void 0), r && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const E = JSON.parse(p, g);
    if (E === null || typeof E != "object")
      return E;
    const b = v && v.protoAction || "error", S = v && v.constructorAction || "error";
    if (b === "ignore" && S === "ignore")
      return E;
    if (b !== "ignore" && S !== "ignore") {
      if (n.test(p) === !1 && i.test(p) === !1)
        return E;
    } else if (b !== "ignore" && S === "ignore") {
      if (n.test(p) === !1)
        return E;
    } else if (i.test(p) === !1)
      return E;
    return u(E, { protoAction: b, constructorAction: S, safe: v && v.safe });
  }
  function u(p, { protoAction: g = "error", constructorAction: v = "error", safe: E } = {}) {
    let b = [p];
    for (; b.length; ) {
      const S = b;
      b = [];
      for (const A of S) {
        if (g !== "ignore" && Object.prototype.hasOwnProperty.call(A, "__proto__")) {
          if (E === !0)
            return null;
          if (g === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete A.__proto__;
        }
        if (v !== "ignore" && Object.prototype.hasOwnProperty.call(A, "constructor") && A.constructor !== null && typeof A.constructor == "object" && Object.prototype.hasOwnProperty.call(A.constructor, "prototype")) {
          if (E === !0)
            return null;
          if (v === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete A.constructor;
        }
        for (const N in A) {
          const L = A[N];
          L && typeof L == "object" && b.push(L);
        }
      }
    }
    return p;
  }
  function d(p, g, v) {
    const { stackTraceLimit: E } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, g, v);
    } finally {
      Error.stackTraceLimit = E;
    }
  }
  function h(p, g) {
    const { stackTraceLimit: v } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, g, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = v;
    }
  }
  return Un.exports = d, Un.exports.default = d, Un.exports.parse = d, Un.exports.safeParse = h, Un.exports.scan = u, Un.exports;
}
var Tg = Cg();
const Jd = /* @__PURE__ */ Lf(Tg);
function Ig(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function h() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(b, S, A) {
    switch (b) {
      case '"': {
        i = S, n.pop(), n.push(A), n.push("INSIDE_STRING"), h();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = S, a = S, n.pop(), n.push(A), n.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        n.pop(), n.push(A), n.push("INSIDE_NUMBER"), h();
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
        i = S, n.pop(), n.push(A), n.push("INSIDE_NUMBER"), h();
        break;
      }
      case "{": {
        i = S, n.pop(), n.push(A), n.push("INSIDE_OBJECT_START"), h();
        break;
      }
      case "[": {
        i = S, n.pop(), n.push(A), n.push("INSIDE_ARRAY_START"), h();
        break;
      }
    }
  }
  function g(b, S) {
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
        g(S, b);
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
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(S, b), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && g(S, b);
            break;
          }
          case "}": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && g(S, b);
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
        const N = r.substring(a, b + 1);
        !"false".startsWith(N) && !"true".startsWith(N) && !"null".startsWith(N) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? g(S, b) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(S, b)) : i = b;
        break;
      }
    }
  }
  let E = r.slice(0, i + 1);
  for (let b = n.length - 1; b >= 0; b--)
    switch (n[b]) {
      case "INSIDE_STRING": {
        E += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        E += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        E += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const A = r.substring(a, r.length);
        "true".startsWith(A) ? E += "true".slice(A.length) : "false".startsWith(A) ? E += "false".slice(A.length) : "null".startsWith(A) && (E += "null".slice(A.length));
      }
    }
  return [E, u];
}
const ul = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), Rg = (r) => {
  if (r.length === 0)
    return {
      [ul]: { state: "partial", partialPath: [] }
    };
  try {
    const n = Jd.parse(r);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[ul] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = Ig(r), a = Jd.parse(n);
      if (typeof a != "object" || a === null)
        throw new Error("argsText is expected to be an object");
      return a[ul] = {
        state: "partial",
        partialPath: i
      }, a;
    } catch {
      return;
    }
  }
}, jl = (r, n, i) => {
  const { role: a, id: u, createdAt: d, attachments: h, status: p, metadata: g } = r, v = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, E = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, b = ({ image: S, ...A }) => {
    const N = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(S), L = /^https?:\/\//.test(S);
    return N || L ? { ...A, image: S } : (console.warn("Invalid image data format detected"), null);
  };
  if (a !== "user" && h?.length)
    throw new Error("attachments are only supported for user messages");
  if (a !== "assistant" && p)
    throw new Error("status is only supported for assistant messages");
  if (a !== "assistant" && g?.steps)
    throw new Error("metadata.steps is only supported for assistant messages");
  switch (a) {
    case "assistant":
      return {
        ...v,
        role: a,
        content: E.map((S) => {
          const A = S.type;
          switch (A) {
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
              const { parentId: N, messages: L, ...D } = S, V = {
                ...D,
                toolCallId: S.toolCallId ?? `tool-${Pl()}`,
                ...N !== void 0 && { parentId: N },
                ...L !== void 0 && { messages: L }
              };
              return S.args ? {
                ...V,
                args: S.args,
                argsText: S.argsText ?? JSON.stringify(S.args)
              } : {
                ...V,
                args: Rg(S.argsText ?? "") ?? {},
                argsText: S.argsText ?? ""
              };
            }
            default: {
              const N = A;
              throw new Error(`Unsupported assistant message part type: ${N}`);
            }
          }
        }).filter((S) => !!S),
        status: p ?? i,
        metadata: {
          unstable_state: g?.unstable_state ?? null,
          unstable_annotations: g?.unstable_annotations ?? [],
          unstable_data: g?.unstable_data ?? [],
          custom: g?.custom ?? {},
          steps: g?.steps ?? [],
          ...g?.submittedFeedback && {
            submittedFeedback: g.submittedFeedback
          }
        }
      };
    case "user":
      return {
        ...v,
        role: a,
        content: E.map((S) => {
          const A = S.type;
          switch (A) {
            case "text":
            case "image":
            case "audio":
            case "file":
              return S;
            default: {
              const N = A;
              throw new Error(`Unsupported user message part type: ${N}`);
            }
          }
        }),
        attachments: h ?? [],
        metadata: {
          custom: g?.custom ?? {}
        }
      };
    case "system":
      if (E.length !== 1 || E[0].type !== "text")
        throw new Error("System messages must have exactly one text message part.");
      return {
        ...v,
        role: a,
        content: E,
        metadata: {
          custom: g?.custom ?? {}
        }
      };
    default: {
      const S = a;
      throw new Error(`Unknown message role: ${S}`);
    }
  }
}, Ll = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (r) => {
    const n = r.map((i) => jl(i, Pl(), Ff(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, a) => ({
        parentId: a > 0 ? n[a - 1].id : null,
        message: i
      }))
    };
  }
}, Vi = (r) => r.next ? Vi(r.next) : "current" in r ? r : null;
class Ag {
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
class Bf {
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
      if (a !== "link" && (u.children = u.children.filter((h) => h !== i.current.id), u.next === i)) {
        const h = u.children.at(-1), p = h ? this.messages.get(h) : null;
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
        ], (Vi(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const h = n ? n.level + 1 : 0;
        this.updateLevels(i, h);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new Ag(() => {
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
      a = xg();
    while (this.messages.has(a));
    return this.addOrUpdateMessage(n, jl(i, a, { type: "running" })), a;
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
      const h = this.messages.get(d);
      if (!h)
        throw new Error("MessageRepository(deleteMessage): Child message not found. This is likely an internal bug in assistant-ui.");
      this.performOp(u, h, "relink");
    }
    this.performOp(null, a, "cut"), this.messages.delete(n), this.head === a && (this.head = Vi(u ?? this.root)), this._messages.dirty();
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
    a.next = i, this.head = Vi(i), this._messages.dirty();
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
          const h = this.messages.get(d);
          h && (a(h), this.messages.delete(d));
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
class so {
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
const jt = /* @__PURE__ */ Symbol("skip-update");
class Ol extends so {
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
      n !== jt && (this._previousState = n), this._previousStateDirty = !1;
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
class Fi {
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
      const d = this._core.getState(), h = d.isMain, p = d.id;
      a === h && u === p || (a = h, u = p, !(n === "switched-to" && !h) && (n === "switched-away" && h || i()));
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
function Mg(r, n) {
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
class Pt extends so {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(n) {
    super(), this.binding = n;
    const i = n.getState();
    if (i === jt)
      throw new Error("Entry not available in the store");
    this._previousState = i;
  }
  _previousState;
  getState = () => (this.isConnected || this._syncState(), this._previousState);
  _syncState() {
    const n = this.binding.getState();
    return n === jt || Mg(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const Sr = /* @__PURE__ */ Symbol("innerMessage"), Ng = (r) => r[Sr], vs = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class Uf {
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
class $f extends Uf {
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
class Pg extends $f {
  get source() {
    return "thread-composer";
  }
}
class jg extends $f {
  get source() {
    return "edit-composer";
  }
}
class Lg extends Uf {
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
class Hf extends so {
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
      const h = this.config.binding.getState();
      h !== i && (i = h, a?.(), a = this.config.binding.getState()?.unstable_on(this.config.event, n));
    }, d = this.outerSubscribe(u);
    return () => {
      d?.(), a?.();
    };
  }
}
const Vf = Object.freeze([]), Wf = Object.freeze({}), Og = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? Vf,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? Wf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), zg = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? Vf,
  runConfig: r?.runConfig ?? Wf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class Yf {
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
    return a || (a = new Hf({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
class Dg extends Yf {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(n) {
    const i = new Ol({
      path: n.path,
      getState: () => Og(n.getState()),
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
    return new Pg(new Pt({
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
        } : jt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
class Fg extends Yf {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(n, i) {
    const a = new Ol({
      path: n.path,
      getState: () => zg(n.getState()),
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
    return new jg(new Pt({
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
        } : jt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Xd = /* @__PURE__ */ Symbol.for("aui.tool-response");
class Yi {
  get [Xd]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && Xd in n;
  }
  static toResponse(n) {
    return n instanceof Yi ? n : new Yi({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class Zd {
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
    const u = i.toolName, d = i.toolCallId, h = Yi.toResponse(n);
    this.threadApi.getState().addToolResult({
      messageId: a.id,
      toolName: u,
      toolCallId: d,
      result: h.result,
      artifact: h.artifact,
      isError: h.isError
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
class Gi extends so {
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
      const h = this.binding.getState();
      h !== i && (i = h, a?.(), a = this.binding.getState()?.subscribe(n), n());
    }, d = this.outerSubscribe(u);
    return () => {
      d?.(), a?.();
    };
  }
}
const Bi = Object.freeze({
  type: "complete"
}), Bg = (r, n, i) => {
  if (r.role !== "assistant")
    return Bi;
  if (i.type === "tool-call")
    return i.result ? Bi : r.status;
  const a = n === Math.max(0, r.content.length - 1);
  return r.status.type === "requires-action" ? Bi : a ? r.status : Bi;
}, ef = (r, n) => {
  const i = r.content[n];
  if (!i)
    return jt;
  const a = Bg(r, n, i);
  return Object.freeze({
    ...i,
    [Sr]: i[Sr],
    status: a
  });
};
class Ug {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new Fg(new Gi({
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
    const i = this._getEditComposerRuntimeCore(), a = i ?? this._threadBinding.getState().composer, u = i ?? a, { runConfig: d = u.runConfig } = n, h = this._core.getState();
    if (h.role !== "assistant")
      throw new Error("Can only reload assistant messages");
    this._threadBinding.getState().startRun({
      parentId: h.parentId,
      sourceId: h.id,
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
    let h = i;
    if (n === "previous" ? h = d[a.branchNumber - 2] : n === "next" && (h = d[a.branchNumber]), !h)
      throw new Error("Branch not found");
    this._threadBinding.getState().switchToBranch(h);
  }
  unstable_getCopyText() {
    return vs(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new Zd(new Pt({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => ef(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new Zd(new Pt({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), a = i.content.findIndex((u) => u.type === "tool-call" && u.toolCallId === n);
        return a === -1 ? jt : ef(i, a);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new Lg(new Pt({
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
        } : jt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }));
  }
}
const $g = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {},
  ...r.stream ? { stream: r.stream } : {}
}), Hg = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), Vg = (r, n) => typeof n == "string" ? {
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
}, Wg = (r, n) => {
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
class Yg {
  get path() {
    return this._threadBinding.path;
  }
  get __internal_threadBinding() {
    return this._threadBinding;
  }
  _threadBinding;
  constructor(n, i) {
    const a = new Pt({
      path: n.path,
      getState: () => Wg(n.getState(), i.getState()),
      subscribe: (u) => {
        const d = n.subscribe(u), h = i.subscribe(u);
        return () => {
          d(), h();
        };
      }
    });
    this._threadBinding = {
      path: n.path,
      getState: () => n.getState(),
      getStateState: () => a.getState(),
      outerSubscribe: (u) => n.outerSubscribe(u),
      subscribe: (u) => n.subscribe(u)
    }, this.composer = new Dg(new Gi({
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
    this._threadBinding.getState().append(Vg(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(Hg(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun($g(n));
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
    return new Ug(new Pt({
      path: n,
      getState: () => {
        const { message: a, parentId: u, index: d } = i() ?? {}, { messages: h, speech: p } = this._threadBinding.getState();
        if (!a || u === void 0 || d === void 0)
          return jt;
        const v = this._threadBinding.getState().getBranches(a.id), E = a.metadata.submittedFeedback;
        return {
          ...a,
          [Sr]: a[Sr],
          index: d,
          isLast: h.at(-1)?.id === a.id,
          parentId: u,
          branchNumber: v.indexOf(a.id) + 1,
          branchCount: v.length,
          speech: p?.messageId === a.id ? p : void 0,
          submittedFeedback: E
        };
      },
      subscribe: (a) => this._threadBinding.subscribe(a)
    }), this._threadBinding);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    let a = this._eventSubscriptionSubjects.get(n);
    return a || (a = new Hf({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
const Gg = (r) => ({
  mainThreadId: r.mainThreadId,
  newThread: r.newThreadId,
  threads: r.threadIds,
  archivedThreads: r.archivedThreadIds,
  isLoading: r.isLoading,
  threadItems: r.threadData
}), Ui = (r, n) => {
  if (n === void 0)
    return jt;
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
  } : jt;
};
class qg {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = Yg) {
    this._core = n, this._runtimeFactory = i;
    const a = new Ol({
      path: {},
      getState: () => Gg(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new Fi(new Pt({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => Ui(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new Gi({
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
    return new this._runtimeFactory(new Gi({
      path: {
        ref: `threads[threadId=${JSON.stringify(n)}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => this._core.getThreadRuntimeCore(n),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(n) {
    return new Fi(new Pt({
      path: {
        ref: `threadItems[${n}]`,
        threadSelector: { type: "index", index: n }
      },
      getState: () => Ui(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new Fi(new Pt({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => Ui(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new Fi(new Pt({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => Ui(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Qg = k.createContext(null), Kg = () => k.useContext(Qg), $n = Object.freeze([]), Vn = "DEFAULT_THREAD_ID", Jg = Object.freeze([Vn]), Gf = Object.freeze({
  id: Vn,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), Xg = Promise.resolve(), tf = Object.freeze({
  [Vn]: Gf
});
class Zg {
  adapter;
  threadFactory;
  _mainThreadId = Vn;
  _threads = Jg;
  _archivedThreads = $n;
  _threadData = tf;
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
    return Xg;
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
    if (n === Vn)
      return Gf;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? Vn, d = n.threads ?? $n, h = n.archivedThreads ?? $n, p = a.threadId ?? Vn, g = a.threads ?? $n, v = a.archivedThreads ?? $n;
    !i && p === u && g === d && v === h || (this._threadData = {
      ...tf,
      ...Object.fromEntries(n.threads?.map((E) => [
        E.id,
        {
          ...E,
          remoteId: E.remoteId,
          externalId: E.externalId,
          status: "regular"
        }
      ]) ?? []),
      ...Object.fromEntries(n.archivedThreads?.map((E) => [
        E.id,
        {
          ...E,
          remoteId: E.remoteId,
          externalId: E.externalId,
          status: "archived"
        }
      ]) ?? [])
    }, g !== d && (this._threads = this.adapter.threads?.map((E) => E.id) ?? $n), v !== h && (this._archivedThreads = this.adapter.archivedThreads?.map((E) => E.id) ?? $n), p !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
class nf {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((a, u) => {
      const d = this.cache.get(a), h = i(d, a, u);
      return this.cache.set(a, h), h;
    });
  }
}
class ey extends Df {
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
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = a, this._sourceId = u.id, this._previousText = vs(u), this.setText(this._previousText), this.setRole(u.role), this.setAttachments(u.attachments ?? []), this._nonTextParts = u.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    vs(n) !== this._previousText && this.runtime.append({
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
class ty {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new Bf();
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
  composer = new _g(this);
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
    this._editComposers.set(n, new ey(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
      const h = {
        ...u,
        metadata: {
          ...u.metadata,
          submittedFeedback: { type: i }
        }
      };
      this.repository.addOrUpdateMessage(d, h);
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
    const u = i.speak(vs(a)), d = u.subscribe(() => {
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
    this.import(Ll.fromArray(n ?? []));
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
const ny = Object.freeze([]), ry = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class sy extends ty {
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
  _converter = new nf();
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
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? ny, this._capabilities = {
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
          this._converter = new nf();
        else if (a.isRunning === n.isRunning && a.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, h, p) => {
        if (!n.convertMessage)
          return h;
        const g = p === (n.messages?.length ?? 0) - 1, v = Ff(g, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !bg(d.status) || d.status === v))
          return d;
        const E = n.convertMessage(h, p), b = jl(E, p.toString(), v);
        return b[Sr] = h, b;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const h = u[d], p = u[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, h);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), ry(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
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
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(vs(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
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
    const i = new Bf();
    i.import(Ll.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(Ng).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const rf = (r) => r.adapters?.threadList ?? {};
class iy extends gg {
  threads;
  constructor(n) {
    super(), this.threads = new Zg(rf(n), () => new sy(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(rf(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const oy = (r) => {
  const [n] = k.useState(() => new iy(r));
  k.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = Kg() ?? {};
  return k.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), k.useMemo(() => new dv(n), [n]);
};
function ay(r, n) {
  r.commitTasks.forEach((i) => {
    const a = i.cellIndex, u = n.cells[a];
    if (u.type !== "effect")
      throw new Error("Cannot find effect cell");
    let d = !0;
    if (u.deps !== void 0 && i.deps !== void 0 && (d = u.deps.length !== i.deps.length || u.deps.some((h, p) => !Object.is(h, i.deps[p]))), d) {
      if (u.mounted) {
        if (typeof u.deps != typeof i.deps)
          throw new Error("tapEffect called with and without dependencies across re-renders");
        try {
          u.mounted && u.cleanup && u.cleanup();
        } finally {
          u.mounted = !1;
        }
      }
      const h = i.effect();
      if (h !== void 0 && typeof h != "function")
        throw new Error(`An effect function must either return a cleanup function or nothing. Received: ${typeof h}`);
      u.mounted = !0, u.cleanup = typeof h == "function" ? h : void 0, u.deps = i.deps;
    }
  });
}
function ly(r) {
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
let fs = null;
function uy(r, n) {
  r.currentIndex = 0;
  const i = fs;
  fs = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    fs = i;
  }
}
function zl() {
  if (!fs)
    throw new Error("No resource fiber available");
  return fs;
}
function qf(r, n) {
  const i = r[Qf];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const Qf = /* @__PURE__ */ Symbol("fnSymbol");
function io(r, n) {
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
function _s(r) {
  r.isMounted = !1, ly(r);
}
function ws(r, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return uy(r, () => {
    r.renderContext = i;
    try {
      i.state = qf(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function Ss(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, ay(n, r);
}
const cy = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, sf = cy ? k.useEffect : k.useLayoutEffect;
function Dl(r) {
  const [, n] = k.useState({}), i = k.useMemo(() => io(r.type, () => n({})), [r.type]), a = ws(i, r.props);
  return sf(() => () => _s(i), [i]), sf(() => {
    Ss(i, a);
  }), a.state;
}
const oo = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, hs = (r, n, i) => n === r;
let wr;
const cl = () => {
  if (wr)
    return wr;
  const r = () => ({
    apis: /* @__PURE__ */ new Map(),
    nextId: 0,
    listeners: /* @__PURE__ */ new Set()
  });
  if (typeof window > "u")
    return wr = r(), wr;
  const n = window.__ASSISTANT_UI_DEVTOOLS_HOOK__;
  if (n)
    return wr = n, n;
  const i = r();
  return window.__ASSISTANT_UI_DEVTOOLS_HOOK__ = i, wr = i, i;
};
class Hn {
  static MAX_EVENT_LOGS_PER_API = 200;
  static register(n) {
    const i = cl();
    for (const p of i.apis.values())
      if (p.api === n)
        return () => {
        };
    const a = i.nextId++, u = {
      api: n,
      logs: []
    }, d = n.on?.("*", (p) => {
      const g = i.apis.get(a);
      g && (g.logs.push({
        time: /* @__PURE__ */ new Date(),
        event: p.event,
        data: p.payload
      }), g.logs.length > Hn.MAX_EVENT_LOGS_PER_API && (g.logs = g.logs.slice(-200)), Hn.notifyListeners(a));
    }), h = n.subscribe?.(() => {
      Hn.notifyListeners(a);
    });
    return i.apis.set(a, u), Hn.notifyListeners(a), () => {
      const p = cl();
      p.apis.get(a) && (d?.(), h?.(), p.apis.delete(a), Hn.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    cl().listeners.forEach((a) => a(n));
  }
}
function Re(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[Qf] = r, n;
}
const dy = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function fy(r) {
  const n = zl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (h) => {
        const p = d.value, g = typeof h == "function" ? h(p) : h;
        Object.is(p, g) || (d.value = g, dy(n));
      }
    };
    n.cells[i] = d;
  }
  const a = n.cells[i];
  if (a.type !== "state")
    throw new Error("Hook order changed between renders");
  return a;
}
function Yt(r) {
  const n = fy(r);
  return [n.value, n.set];
}
function hy() {
  const r = zl(), n = r.currentIndex++;
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
function tt(r, n) {
  const i = zl(), a = hy();
  i.renderContext.commitTasks.push({
    effect: r,
    deps: n,
    cellIndex: a
  });
}
function xr(r) {
  const [n] = Yt(() => ({
    current: r
  }));
  return n;
}
const py = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, pe = (r, n) => {
  const i = xr();
  return i.current || (i.current = { value: r(), deps: n }), py(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, my = (r, n) => pe(() => r, n);
function ps(r, n) {
  const [i, a] = Yt({}), u = pe(() => io(r.type, () => a({})), [r.type]), d = n ? pe(() => r.props, n) : r.props, h = pe(() => ws(u, d), [u, d, i]);
  return tt(() => () => _s(u), [u]), tt(() => {
    Ss(u, h);
  }, [u, h]), h.state;
}
function qt(r) {
  return qf(r.type, r.props);
}
function Kf(r, n, i) {
  const [a, u] = Yt(0), d = my(() => u((v) => v + 1), []), [h] = Yt(() => /* @__PURE__ */ new Map()), p = pe(() => n, i), g = pe(() => {
    const v = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const E in r) {
      const b = r[E], S = p(b, E);
      let A = h.get(E);
      (!A || A.resource !== S.type) && (A && v.remove.push(E), A = io(S.type, d), v.add.push([E, A]));
      const N = ws(A, S.props);
      v.commit.push([E, N]), v.return[E] = N.state;
    }
    if (h.size > v.commit.length - v.add.length + v.remove.length)
      for (const E of h.keys())
        E in r || v.remove.push(E);
    return v;
  }, [r, p, a]);
  return tt(() => () => {
    for (const v of h.keys())
      _s(h.get(v)), h.delete(v);
  }, []), tt(() => {
    for (const v of g.remove)
      _s(h.get(v)), h.delete(v);
    for (const [v, E] of g.add)
      h.set(v, E);
    for (const [v, E] of g.commit)
      Ss(h.get(v), E);
  }, [g]), g.return;
}
const gy = 50;
let Vt = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class yy {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Vt.schedulers.add(this), vy();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const vy = () => {
  Vt.isScheduled || (Vt.isScheduled = !0, queueMicrotask(Jf));
}, Jf = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of Vt.schedulers)
      if (Vt.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > gy)
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
    Vt.schedulers.clear(), Vt.isScheduled = !1;
  }
}, _l = (r) => {
  const n = Vt;
  Vt = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = r();
    return Jf(), i;
  } finally {
    Vt = n;
  }
}, _y = Re((r) => {
  const [, n] = Yt(r.element), i = ps(r.element), a = xr(/* @__PURE__ */ new Set()).current, u = xr(i);
  return tt(() => {
    i !== u.current && (u.current = i, a.forEach((h) => h()));
  }), pe(() => ({
    getState: () => u.current,
    subscribe: (h) => (a.add(h), () => a.delete(h)),
    render: (h) => {
      const p = r.element !== h;
      r.element = h, r.onRender(p) && n(h);
    },
    unmount: r.onUnmount
  }), []);
}), wy = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (p) => i ? p : (i = !0, _l(() => {
      p && (a = ws(h, u)), !d.isDirty && Ss(h, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, _s(h);
    }
  }, d = new yy(() => {
    a = ws(h, u), !(d.isDirty || !i) && Ss(h, a);
  }), h = io(_y, () => d.markDirty());
  return _l(() => {
    d.markDirty();
  }), a.state;
}, ms = /* @__PURE__ */ Symbol("tap.Context"), Xf = (r) => ({
  [ms]: r
}), Zf = (r, n, i) => {
  const a = r[ms];
  r[ms] = n;
  try {
    return i();
  } finally {
    r[ms] = a;
  }
}, eh = (r) => r[ms], of = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (v, E) => {
    const b = typeof v == "function" ? v(n) : v;
    if (!Object.is(b, n)) {
      const S = n;
      n = E ?? (typeof b != "object" || b === null) ? b : Object.assign({}, n, b), i.forEach((A) => A(n, S));
    }
  }, u = () => n, p = { setState: a, getState: u, getInitialState: () => g, subscribe: (v) => (i.add(v), () => i.delete(v)) }, g = n = r(a, u, p);
  return p;
}, Sy = ((r) => r ? of(r) : of), xy = (r) => r;
function Ey(r, n = xy) {
  const i = Nt.useSyncExternalStore(
    r.subscribe,
    Nt.useCallback(() => n(r.getState()), [r, n]),
    Nt.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return Nt.useDebugValue(i), i;
}
const af = (r) => {
  const n = Sy(r), i = (a) => Ey(n, a);
  return Object.assign(i, n), i;
}, ky = ((r) => r ? af(r) : af);
function lf(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function th(...r) {
  return (n) => {
    let i = !1;
    const a = r.map((u) => {
      const d = lf(u, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : lf(r[u], null);
        }
      };
  };
}
function ao(...r) {
  return k.useCallback(th(...r), r);
}
const nh = Re((r) => {
  const n = pe(() => wy(r, { mount: !1 }), [r.type]);
  return tt(() => {
    n.render(r);
  }), n;
});
class by {
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
const Lt = (r, n) => {
  const i = xr(r);
  tt(() => {
    i.current = r;
  });
  const a = pe(() => new Proxy({}, new by(i)), []), u = n?.key, d = r.getState();
  return pe(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, qi = Re((r) => {
  const n = xr(r.get);
  return tt(() => {
    n.current = r.get;
  }), pe(() => Ke({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), Cy = Re((r) => {
  const n = ps(r.scopeElement);
  return pe(() => [r.fieldName, n], [r.fieldName, n]);
}), Ty = Re((r) => {
  const { on: n, subscribe: i, ...a } = r, u = xr({ on: n, subscribe: i });
  tt(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = Kf(a, (h, p) => Cy({
    fieldName: p,
    scopeElement: h
  }), []);
  return pe(() => {
    const h = Object.fromEntries(Object.values(d)), { on: p, subscribe: g } = u.current;
    return p && (h.on = (v, E) => p(v, E)), g && (h.subscribe = (v) => g(v)), h;
  }, [d]);
}), rh = Xf(null), Iy = (r, n) => Zf(rh, r, n), sh = () => {
  const r = eh(rh);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, Ry = Re(({ toolkit: r }) => {
  const [n, i] = Yt(() => ({
    tools: {}
  })), a = sh();
  tt(() => {
    if (!r)
      return;
    const d = [];
    for (const [g, v] of Object.entries(r))
      v.render && d.push(u(g, v.render));
    const h = Object.entries(r).reduce((g, [v, E]) => {
      const { render: b, ...S } = E;
      return g[v] = S, g;
    }, {}), p = {
      getModelContext: () => ({
        tools: h
      })
    };
    return d.push(a.register(p)), () => {
      d.forEach((g) => g());
    };
  }, [r, a]);
  const u = (d, h) => (i((p) => ({
    ...p,
    tools: {
      ...p.tools,
      [d]: [...p.tools[d] ?? [], h]
    }
  })), () => {
    i((p) => ({
      ...p,
      tools: {
        ...p.tools,
        [d]: p.tools[d]?.filter((g) => g !== h) ?? []
      }
    }));
  });
  return Lt({
    getState: () => n,
    setToolUI: u
  });
}), Ay = Re(() => pe(() => {
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
          for (const h of u)
            h(a);
        if (d)
          for (const h of d)
            h({ event: i, payload: a });
      });
    }
  };
}, [])), ih = Xf(null), My = (r, n) => Zf(ih, r, n), Fl = () => {
  const r = eh(ih);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, Ny = Re(() => {
  const [r] = Yt(() => ({})), n = new zf();
  return Lt({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), Py = Re(({ threads: r, modelContext: n, tools: i }) => {
  const a = qt(Ay()), { threads: u, tools: d, modelContext: h } = My(a, () => {
    const g = ps(n ?? Ny(), [n]);
    return Iy(g.api, () => ({
      modelContext: g,
      tools: ps(i ?? Ry({}), [i]),
      threads: ps(r, [r])
    }));
  }), p = pe(() => ({
    threads: u.state,
    tools: d.state,
    modelContext: h.state
  }), [u.state, d.state, h.state]);
  return Lt({
    getState: () => p,
    threads: u.api,
    tools: d.api,
    modelContext: h.api,
    on: a.on
  });
}), jy = (r) => {
  const n = () => r.getState().api.threads.item("main");
  return {
    threads: Ke({
      source: "root",
      query: {},
      get: () => r.getState().api.threads
    }),
    tools: Ke({
      source: "root",
      query: {},
      get: () => r.getState().api.tools
    }),
    modelContext: Ke({
      source: "root",
      query: {},
      get: () => r.getState().api.modelContext
    }),
    thread: Ke({
      source: "threads",
      query: { type: "main" },
      get: () => r.getState().api.threads.thread("main")
    }),
    threadListItem: Ke({
      source: "threads",
      query: { type: "main" },
      get: () => n()
    }),
    composer: Ke({
      source: "thread",
      query: {},
      get: () => r.getState().api.threads.thread("main").composer
    }),
    on(i, a) {
      const { event: u, scope: d } = oo(i);
      if (d === "*")
        return r.getState().api.on(u, a);
      if (hs("thread", d) || hs("thread-list-item", d) || hs("composer", d))
        return r.getState().api.on(u, (h) => {
          h.threadId === n().getState().id && a(h);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, Ly = (r) => {
  const n = Bl(), i = Dl(nh(Py(r))), a = k.useMemo(() => jy(i), [i]);
  return k.useMemo(() => ah(n, a), [n, a]);
}, Ke = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, Qi = () => () => {
}, oh = k.createContext({
  threads: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("Threads is only available inside <AssistantProvider />");
    }
  }),
  tools: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("Tools is only available inside <AssistantProvider />");
    }
  }),
  modelContext: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("ModelContext is only available inside <AssistantProvider />");
    }
  }),
  threadListItem: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("ThreadListItem is only available inside <AssistantProvider />");
    }
  }),
  thread: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("Thread is only available inside <AssistantProvider />");
    }
  }),
  composer: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("Composer is only available inside <AssistantProvider />");
    }
  }),
  message: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("Message is only available inside <ThreadPrimitive.Messages />");
    }
  }),
  part: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("Part is only available inside <MessagePrimitive.Parts />");
    }
  }),
  attachment: Ke({
    source: null,
    query: {},
    get: () => {
      throw new Error("Attachment is only available inside <MessagePrimitive.Attachments /> or <ComposerPrimitive.Attachments />");
    }
  }),
  subscribe: Qi,
  on: (r) => {
    const { scope: n } = oo(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), Bl = () => k.useContext(oh), Ul = (r) => {
  const n = Bl(), i = Dl(Ty(r));
  return k.useMemo(() => ah(n, i), [n, i]);
}, Oy = (r) => Ly(r);
function Ot(r) {
  return r ? Oy(r) : Bl();
}
const zy = (r, n) => r === Qi ? n : n === Qi ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, ah = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: zy(r.subscribe, i ?? Qi)
  };
}, lo = ({ api: r, children: n, devToolsVisible: i = !0 }) => (k.useEffect(() => {
  if (!(!i || !r.subscribe))
    return Hn.register(r);
}, [r, i]), m.jsx(oh.Provider, { value: r, children: n }));
class uf {
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
const xe = (r) => {
  const n = Ot(), i = k.useMemo(() => new uf(n), [n]), a = k.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (k.useDebugValue(a), a instanceof uf)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, dl = (r, n) => {
  const i = Ot(), a = k.useRef(n);
  k.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = oo(r);
  k.useEffect(() => i.on({ scope: u, event: d }, (h) => a.current(h)), [i, u, d]);
};
function Dy(r, n) {
  function i(a) {
    const u = k.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function lh(r, n) {
  function i(u) {
    const d = r(u);
    return d ? d[n] : null;
  }
  function a(u) {
    let d = !1, h;
    typeof u == "function" ? h = u : u && typeof u == "object" && (d = !!u.optional, h = u.selector);
    const p = i({
      optional: d
    });
    return p ? h ? p(h) : p() : null;
  }
  return {
    [n]: a,
    [`${n}Store`]: i
  };
}
const uh = k.createContext(null), Fy = Dy(uh, "ThreadPrimitive.Viewport"), { useThreadViewport: Ki, useThreadViewportStore: $l } = lh(Fy, "useThreadViewport"), By = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function Uy(r, n = $y) {
  By(r);
  const i = k.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return k.useDebugValue(i), i;
}
const $y = (r) => r;
function Hy(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? Uy(d, u) : null;
  }
  return n;
}
function Vy(r) {
  const n = Ot(), i = xe(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const At = Hy(Vy), Yn = (r) => {
  const [, n] = Yt(r.getState);
  return tt(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, Wy = Re(({ runtime: r }) => {
  const n = Yn(r), i = Fl();
  return tt(() => {
    const a = [], u = [
      "switched-to",
      "switched-away"
    ];
    for (const d of u) {
      const h = r.unstable_on(d, () => {
        i.emit(`thread-list-item.${d}`, {
          threadId: r.getState().id
        });
      });
      a.push(h);
    }
    return () => {
      for (const d of a)
        d();
    };
  }, [r, i]), Lt({
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
}), xs = (r) => {
  const n = pe(() => Object.fromEntries(r), [r]), i = Kf(n, (d) => d, []), a = pe(() => Object.keys(i), [i]);
  return {
    state: pe(() => {
      const d = new Array(a.length);
      for (let h = 0; h < a.length; h++)
        d[h] = i[a[h]].state;
      return d;
    }, [a, i]),
    api: (d) => {
      const h = "index" in d ? i[a[d.index]]?.api : i[d.key]?.api;
      if (!h)
        throw new Error(`tapLookupResources: Resource not found for lookup: ${JSON.stringify(d)}`);
      return h;
    }
  };
}, ch = Re(({ runtime: r }) => {
  const n = Yn(r);
  return Lt({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), Yy = Re(({ runtime: r, index: n }) => {
  const i = pe(() => r.getAttachmentByIndex(n), [r, n]);
  return qt(ch({
    runtime: i
  }));
}), dh = Re(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = Yn(i), u = Fl();
  tt(() => {
    const p = [], g = [
      "send",
      "attachment-add"
    ];
    for (const v of g) {
      const E = i.unstable_on(v, () => {
        u.emit(`composer.${v}`, {
          threadId: r.current,
          ...n && { messageId: n.current }
        });
      });
      p.push(E);
    }
    return () => {
      for (const v of p)
        v();
    };
  }, [i, u, r, n]);
  const d = xs(a.attachments.map((p, g) => [
    p.id,
    Yy({ runtime: i, index: g })
  ])), h = pe(() => ({
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
  return Lt({
    getState: () => h,
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
}), Gy = Re(({ runtime: r }) => {
  const n = Yn(r);
  return Lt({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), qy = Re(({ runtime: r, index: n }) => {
  const i = pe(() => r.getAttachmentByIndex(n), [r, n]);
  return qt(ch({ runtime: i }));
}), Qy = Re(({ runtime: r, index: n }) => {
  const i = pe(() => r.getMessagePartByIndex(n), [r, n]);
  return qt(Gy({ runtime: i }));
}), Ky = Re(({ runtime: r, threadIdRef: n }) => {
  const i = Yn(r), [a, u] = Yt(!1), [d, h] = Yt(!1), p = pe(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), g = qt(dh({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: p
  })), v = xs(i.content.map((S, A) => [
    "toolCallId" in S && S.toolCallId != null ? `toolCallId-${S.toolCallId}` : `index-${A}`,
    Qy({ runtime: r, index: A })
  ])), E = xs(i.attachments?.map((S, A) => [
    S.id,
    qy({ runtime: r, index: A })
  ]) ?? []), b = pe(() => ({
    ...i,
    parts: v.state,
    composer: g.state,
    isCopied: a,
    isHovering: d
  }), [
    i,
    v.state,
    g.state,
    a,
    d
  ]);
  return Lt({
    getState: () => b,
    composer: g.api,
    reload: (S) => r.reload(S),
    speak: () => r.speak(),
    stopSpeaking: () => r.stopSpeaking(),
    submitFeedback: (S) => r.submitFeedback(S),
    switchToBranch: (S) => r.switchToBranch(S),
    getCopyText: () => r.unstable_getCopyText(),
    part: (S) => "index" in S ? v.api({ index: S.index }) : v.api({ key: `toolCallId-${S.toolCallId}` }),
    attachment: (S) => "id" in S ? E.api({ key: S.id }) : E.api(S),
    setIsCopied: u,
    setIsHovering: h,
    __internal_getRuntime: () => r
  }, {
    key: i.id
  });
}), Jy = Re(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = pe(() => r.getMessageById(n), [r, n]);
  return qt(Ky({ runtime: a, threadIdRef: i }));
}), Xy = Re(({ runtime: r }) => {
  const n = Yn(r), i = Fl();
  tt(() => {
    const p = [], g = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const v of g) {
      const E = r.unstable_on(v, () => {
        const b = r.getState()?.threadId || "unknown";
        i.emit(`thread.${v}`, {
          threadId: b
        });
      });
      p.push(E);
    }
    return () => {
      for (const v of p)
        v();
    };
  }, [r]);
  const a = pe(() => ({
    get current() {
      return r.getState().threadId;
    }
  }), [r]), u = qt(dh({
    runtime: r.composer,
    threadIdRef: a
  })), d = xs(n.messages.map((p) => [
    p.id,
    Jy({ runtime: r, id: p.id, threadIdRef: a })
  ])), h = pe(() => ({
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
  return Lt({
    getState: () => h,
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
}), Zy = Re(({ runtime: r, id: n }) => {
  const i = pe(() => r.getItemById(n), [r, n]);
  return qt(Wy({
    runtime: i
  }));
}), ev = Re(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = Yn(r), a = qt(Xy({
    runtime: r.main
  })), u = xs(Object.keys(i.threadItems).map((h) => [
    h,
    Zy({ runtime: r, id: h })
  ])), d = pe(() => ({
    mainThreadId: i.mainThreadId,
    newThreadId: i.newThread ?? null,
    isLoading: i.isLoading,
    threadIds: i.threads,
    archivedThreadIds: i.archivedThreads,
    threadItems: u.state,
    main: a.state
  }), [i, u.state, a.state]);
  return Lt({
    getState: () => d,
    thread: () => a.api,
    item: (h) => {
      if (h === "main")
        return u.api({ key: d.mainThreadId });
      if ("id" in h)
        return u.api({ key: h.id });
      const { index: p, archived: g = !1 } = h, v = g ? d.archivedThreadIds[p] : d.threadIds[p];
      return u.api({ key: v });
    },
    switchToThread: (h) => {
      r.switchToThread(h);
    },
    switchToNewThread: () => {
      r.switchToNewThread();
    },
    __internal_getAssistantRuntime: () => n
  });
}), tv = Re((r) => {
  const n = sh();
  return tt(() => r.registerModelContextProvider(n), [r, n]), qt(ev({
    runtime: r.threads,
    __internal_assistantRuntime: r
  }));
}), fl = (r) => {
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
}, nv = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = fl((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: h
      }
    });
  }), a = fl((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: h
      }
    });
  }), u = fl((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: h
      }
    });
  }), d = ky(() => ({
    isAtBottom: !0,
    scrollToBottom: ({ behavior: h = "auto" } = {}) => {
      for (const p of n)
        p({ behavior: h });
    },
    onScrollToBottom: (h) => (n.add(h), () => {
      n.delete(h);
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
}, Es = (r) => r, rv = (r) => {
  const n = $l({ optional: !0 }), [i] = k.useState(() => nv(r));
  return k.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), k.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && Es(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), k.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && Es(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, fh = ({ children: r, options: n = {} }) => {
  const i = rv(n), [a] = k.useState(() => ({
    useThreadViewport: i
  }));
  return m.jsx(uh.Provider, { value: a, children: r });
}, sv = (r) => r._core?.RenderComponent, iv = ({ children: r, runtime: n }) => {
  const i = Ot({
    threads: tv(n)
  }), a = sv(n);
  return m.jsxs(lo, { api: i, children: [a && m.jsx(a, {}), m.jsx(fh, { children: r })] });
}, ov = k.memo(iv), av = ({ index: r, children: n }) => {
  const i = Ot(), a = Ul({
    message: qi({
      source: "thread",
      query: { type: "index", index: r },
      get: () => i.thread().message({ index: r })
    }),
    composer: qi({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: r }).composer
    }),
    on(u, d) {
      const h = () => i.thread().message({ index: r }), { event: p, scope: g } = oo(u);
      return !hs("composer", g) && !hs("message", g) ? i.on(u, d) : i.on({ scope: "thread", event: p }, (v) => {
        v.messageId === h().getState().id && d(v);
      });
    }
  });
  return m.jsx(lo, { api: a, children: n });
}, lv = ({ index: r, children: n }) => {
  const i = Ot(), a = Ul({
    part: qi({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return m.jsx(lo, { api: a, children: n });
}, uv = Re(({ text: r, isRunning: n }) => {
  const i = pe(() => ({
    type: "text",
    text: r,
    status: n ? { type: "running" } : { type: "complete" }
  }), [r, n]);
  return Lt({
    getState: () => i,
    addToolResult: () => {
      throw new Error("Not supported");
    },
    resumeToolCall: () => {
      throw new Error("Not supported");
    }
  });
}), cv = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = Dl(nh(uv({ text: r, isRunning: n }))), u = Ul({
    part: qi({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return m.jsx(lo, { api: u, children: i });
};
class dv {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new qg(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
    return this._core.threads.getMainThreadRuntimeCore().import(Ll.fromArray(n ?? []));
  }
}
function uo(r) {
  const n = k.useRef(r);
  return k.useEffect(() => {
    n.current = r;
  }), k.useMemo(() => (...i) => n.current?.(...i), []);
}
const fv = k.createContext(null);
function hv(r) {
  const n = k.useContext(fv);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: CS, useSmoothStatusStore: pv } = lh(hv, "useSmoothStatus");
class mv {
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
    let h = 0;
    for (; a >= d && h < u; )
      h++, a -= d;
    h !== u ? this.animationFrameId = requestAnimationFrame(this.animate) : this.animationFrameId = null, h !== 0 && (this.currentText = this.targetText.slice(0, this.currentText.length + h), this.lastUpdateTime = n - a, this.setText(this.currentText));
  };
}
const hl = Object.freeze({
  type: "running"
}), gv = (r, n = !1) => {
  const { text: i } = r, a = xe(({ message: E }) => E.id), u = k.useRef(a), [d, h] = k.useState(i), p = pv({ optional: !0 }), g = uo((E) => {
    if (h(E), p) {
      const b = d !== E || r.status.type === "running" ? hl : r.status;
      Es(p).setState(b, !0);
    }
  });
  k.useEffect(() => {
    if (p) {
      const E = n && (d !== i || r.status.type === "running") ? hl : r.status;
      Es(p).setState(E, !0);
    }
  }, [p, n, i, d, r.status]);
  const [v] = k.useState(new mv(i, g));
  return k.useEffect(() => {
    if (!n) {
      v.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(v.targetText)) {
      u.current = a, g(i), v.currentText = i, v.targetText = i, v.stop();
      return;
    }
    v.targetText = i, v.start();
  }, [g, v, a, n, i]), k.useEffect(() => () => {
    v.stop();
  }, [v]), k.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : hl
  } : r, [n, d, r, i]);
};
var yv = /* @__PURE__ */ Symbol.for("react.lazy"), Ji = lg[" use ".trim().toString()];
function vv(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function hh(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === yv && "_payload" in r && vv(r._payload);
}
// @__NO_SIDE_EFFECTS__
function ph(r) {
  const n = /* @__PURE__ */ _v(r), i = k.forwardRef((a, u) => {
    let { children: d, ...h } = a;
    hh(d) && typeof Ji == "function" && (d = Ji(d._payload));
    const p = k.Children.toArray(d), g = p.find(Sv);
    if (g) {
      const v = g.props.children, E = p.map((b) => b === g ? k.Children.count(v) > 1 ? k.Children.only(null) : k.isValidElement(v) ? v.props.children : null : b);
      return /* @__PURE__ */ m.jsx(n, { ...h, ref: u, children: k.isValidElement(v) ? k.cloneElement(v, void 0, E) : null });
    }
    return /* @__PURE__ */ m.jsx(n, { ...h, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var mh = /* @__PURE__ */ ph("Slot");
// @__NO_SIDE_EFFECTS__
function _v(r) {
  const n = k.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if (hh(u) && typeof Ji == "function" && (u = Ji(u._payload)), k.isValidElement(u)) {
      const h = Ev(u), p = xv(d, u.props);
      return u.type !== k.Fragment && (p.ref = a ? th(a, h) : h), k.cloneElement(u, p);
    }
    return k.Children.count(u) > 1 ? k.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var wv = /* @__PURE__ */ Symbol("radix.slottable");
function Sv(r) {
  return k.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === wv;
}
function xv(r, n) {
  const i = { ...n };
  for (const a in n) {
    const u = r[a], d = n[a];
    /^on[A-Z]/.test(a) ? u && d ? i[a] = (...p) => {
      const g = d(...p);
      return u(...p), g;
    } : u && (i[a] = u) : a === "style" ? i[a] = { ...u, ...d } : a === "className" && (i[a] = [u, d].filter(Boolean).join(" "));
  }
  return { ...r, ...i };
}
function Ev(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var kv = [
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
], Cr = kv.reduce((r, n) => {
  const i = /* @__PURE__ */ ph(`Primitive.${n}`), a = k.forwardRef((u, d) => {
    const { asChild: h, ...p } = u, g = h ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m.jsx(g, { ...p, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function gs(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const gh = (r, n, i = []) => {
  const a = k.forwardRef((u, d) => {
    const h = {}, p = {};
    Object.keys(u).forEach((v) => {
      i.includes(v) ? h[v] = u[v] : p[v] = u[v];
    });
    const g = n(h) ?? void 0;
    return m.jsx(Cr.button, { type: "button", ...p, ref: d, disabled: p.disabled || !g, onClick: gs(p.onClick, g) });
  });
  return a.displayName = r, a;
};
function bv(r, n = globalThis?.document) {
  const i = uo(r);
  k.useEffect(() => {
    const a = (u) => {
      u.key === "Escape" && i(u);
    };
    return n.addEventListener("keydown", a, { capture: !0 }), () => n.removeEventListener("keydown", a, { capture: !0 });
  }, [i, n]);
}
const Is = (r) => {
  const n = k.useRef(void 0);
  return k.useCallback((a) => {
    n.current && n.current(), a && (n.current = r(a));
  }, [r]);
}, yh = (r, n) => {
  const i = k.useCallback((a) => {
    if (!r)
      return;
    const u = r(), d = () => {
      const p = n ? n(a) : a.offsetHeight;
      u.setHeight(p);
    }, h = new ResizeObserver(d);
    return h.observe(a), d(), () => {
      h.disconnect(), u.unregister();
    };
  }, [r, n]);
  return Is(i);
}, cf = k.createContext(!1), df = (r, n) => {
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
}, vh = ({ children: r, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const a = xe(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: g, message: v }) => v.isLast && v.role === "assistant" && v.index >= 1 && g.messages.at(v.index - 1)?.role === "user"
  ), u = $l({ optional: !0 }), d = k.useContext(cf), h = k.useCallback((g) => {
    if (!u || d)
      return;
    const v = () => {
      const E = u.getState();
      if (E.turnAnchor === "top" && a) {
        const { viewport: b, inset: S, userMessage: A } = E.height, N = df(n, g), L = df(i, g), D = A <= N ? A : L, V = Math.max(0, b - S - D);
        g.style.minHeight = `${V}px`, g.style.flexShrink = "0", g.style.transition = "min-height 0s";
      } else
        g.style.minHeight = "", g.style.flexShrink = "", g.style.transition = "";
    };
    return v(), u.subscribe(v);
  }, [
    u,
    a,
    d,
    n,
    i
  ]), p = Is(h);
  return m.jsx(cf.Provider, { value: !0, children: m.jsx(mh, { ref: p, children: r }) });
};
vh.displayName = "ThreadPrimitive.ViewportSlack";
const Cv = () => {
  const r = Ot(), n = xe(() => r.message()), i = k.useCallback((a) => {
    const u = () => {
      n.setIsHovering(!0);
    }, d = () => {
      n.setIsHovering(!1);
    };
    return a.addEventListener("mouseenter", u), a.addEventListener("mouseleave", d), a.matches(":hover") && queueMicrotask(() => n.setIsHovering(!0)), () => {
      a.removeEventListener("mouseenter", u), a.removeEventListener("mouseleave", d), n.setIsHovering(!1);
    };
  }, [n]);
  return Is(i);
}, Tv = () => {
  const r = Ki((u) => u.turnAnchor), n = Ki((u) => u.registerUserMessageHeight), i = xe(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = k.useCallback((u) => u.offsetHeight, []);
  return yh(i ? n : null, a);
}, Hl = k.forwardRef((r, n) => {
  const i = Cv(), a = Tv(), u = ao(n, i, a);
  return m.jsx(vh, { children: m.jsx(Cr.div, { ...r, ref: u }) });
});
Hl.displayName = "MessagePrimitive.Root";
const Iv = () => xe(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), _h = k.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = gv(Iv(), r);
  return m.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
_h.displayName = "MessagePartPrimitive.Text";
const Rv = () => xe(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), wh = k.forwardRef((r, n) => {
  const { image: i } = Rv();
  return m.jsx(Cr.img, { src: i, ...r, ref: n });
});
wh.displayName = "MessagePartPrimitive.Image";
const Sh = ({ children: r }) => xe(({ part: i }) => i.status.type === "running") ? r : null;
Sh.displayName = "MessagePartPrimitive.InProgress";
const ff = (r) => Symbol.iterator in r, hf = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), pf = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, Av = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function Mv(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : ff(r) && ff(n) ? hf(r) && hf(n) ? pf(r, n) : Av(r, n) : pf(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function Nv(r) {
  const n = Nt.useRef(void 0);
  return (i) => {
    const a = r(i);
    return Mv(n.current, a) ? n.current : n.current = a;
  };
}
const mf = (r) => {
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
}, Pv = (r) => {
  const n = [], i = mf("toolGroup"), a = mf("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, jv = () => {
  const r = xe(Nv((n) => n.message.parts.map((i) => i.type)));
  return k.useMemo(() => r.length === 0 ? [] : Pv(r), [r]);
}, Lv = ({ Fallback: r, ...n }) => {
  const i = xe(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? m.jsx(i, { ...n }) : null;
}, sn = {
  Text: () => m.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [m.jsx(_h, {}), m.jsx(Sh, { children: m.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => m.jsx(wh, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, Ov = ({ components: { Text: r = sn.Text, Reasoning: n = sn.Reasoning, Image: i = sn.Image, Source: a = sn.Source, File: u = sn.File, Unstable_Audio: d = sn.Unstable_Audio, tools: h = {} } = {} }) => {
  const p = Ot(), g = xe(({ part: E }) => E), v = g.type;
  if (v === "tool-call") {
    const E = p.part().addToolResult, b = p.part().resumeToolCall;
    if ("Override" in h)
      return m.jsx(h.Override, { ...g, addResult: E, resume: b });
    const S = h.by_name?.[g.toolName] ?? h.Fallback;
    return m.jsx(Lv, { ...g, Fallback: S, addResult: E, resume: b });
  }
  if (g.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (v) {
    case "text":
      return m.jsx(r, { ...g });
    case "reasoning":
      return m.jsx(n, { ...g });
    case "source":
      return m.jsx(a, { ...g });
    case "image":
      return m.jsx(i, { ...g });
    case "file":
      return m.jsx(u, { ...g });
    case "audio":
      return m.jsx(d, { ...g });
    case "data":
      return null;
    default:
      const E = v;
      throw new Error(`Unknown message part type: ${E}`);
  }
}, Wi = k.memo(({ index: r, components: n }) => m.jsx(lv, { index: r, children: m.jsx(Ov, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
Wi.displayName = "MessagePrimitive.PartByIndex";
const zv = ({ status: r, component: n }) => m.jsx(cv, { text: "", isRunning: r.type === "running", children: m.jsx(n, { type: "text", text: "", status: r }) }), Dv = Object.freeze({
  type: "complete"
}), Fv = ({ components: r }) => {
  const n = xe((i) => i.message.status ?? Dv);
  return r?.Empty ? m.jsx(r.Empty, { status: n }) : m.jsx(zv, { status: n, component: r?.Text ?? sn.Text });
}, Bv = k.memo(Fv, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), Vl = ({ components: r }) => {
  const n = xe(({ message: u }) => u.parts.length), i = jv(), a = k.useMemo(() => n === 0 ? m.jsx(Bv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return m.jsx(Wi, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? sn.ToolGroup;
      return m.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => m.jsx(Wi, { index: u.startIndex + p, components: r }, p)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? sn.ReasoningGroup;
      return m.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => m.jsx(Wi, { index: u.startIndex + p, components: r }, p)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return m.jsx(m.Fragment, { children: a });
};
Vl.displayName = "MessagePrimitive.Parts";
const xh = ({ children: r }) => xe(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
xh.displayName = "MessagePrimitive.Error";
const Eh = () => {
  const r = Ot(), n = xe((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = k.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, Uv = gh("ComposerPrimitive.Send", Eh), kh = k.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = Eh(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return m.jsx(Cr.form, { ...n, ref: i, onSubmit: gs(r, u) });
});
kh.displayName = "ComposerPrimitive.Root";
function wl() {
  return wl = Object.assign ? Object.assign.bind() : function(r) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }
    return r;
  }, wl.apply(null, arguments);
}
function $v(r, n) {
  if (r == null) return {};
  var i = {};
  for (var a in r) if ({}.hasOwnProperty.call(r, a)) {
    if (n.indexOf(a) !== -1) continue;
    i[a] = r[a];
  }
  return i;
}
var Hv = k.useLayoutEffect, Vv = function(n) {
  var i = Nt.useRef(n);
  return Hv(function() {
    i.current = n;
  }), i;
}, gf = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, Wv = function(n, i) {
  var a = Nt.useRef();
  return Nt.useCallback(function(u) {
    n.current = u, a.current && gf(a.current, null), a.current = i, i && gf(i, u);
  }, [i]);
}, yf = {
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
}, Yv = function(n) {
  Object.keys(yf).forEach(function(i) {
    n.style.setProperty(i, yf[i], "important");
  });
}, vf = Yv, et = null, _f = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function Gv(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), et || (et = document.createElement("textarea"), et.setAttribute("tabindex", "-1"), et.setAttribute("aria-hidden", "true"), vf(et)), et.parentNode === null && document.body.appendChild(et);
  var u = r.paddingSize, d = r.borderSize, h = r.sizingStyle, p = h.boxSizing;
  Object.keys(h).forEach(function(S) {
    var A = S;
    et.style[A] = h[A];
  }), vf(et), et.value = n;
  var g = _f(et, r);
  et.value = n, g = _f(et, r), et.value = "x";
  var v = et.scrollHeight - u, E = v * i;
  p === "border-box" && (E = E + u + d), g = Math.max(E, g);
  var b = v * a;
  return p === "border-box" && (b = b + u + d), g = Math.min(b, g), [g, v];
}
var wf = function() {
}, qv = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, Qv = [
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
], Kv = !!document.documentElement.currentStyle, Jv = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = qv(Qv, i), u = a.boxSizing;
  if (u === "")
    return null;
  Kv && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), h = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: h
  };
}, Xv = Jv;
function Wl(r, n, i) {
  var a = Vv(i);
  k.useLayoutEffect(function() {
    var u = function(h) {
      return a.current(h);
    };
    if (r)
      return r.addEventListener(n, u), function() {
        return r.removeEventListener(n, u);
      };
  }, []);
}
var Zv = function(n, i) {
  Wl(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, e_ = function(n) {
  Wl(window, "resize", n);
}, t_ = function(n) {
  Wl(document.fonts, "loadingdone", n);
}, n_ = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], r_ = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, h = n.onChange, p = h === void 0 ? wf : h, g = n.onHeightChange, v = g === void 0 ? wf : g, E = $v(n, n_), b = E.value !== void 0, S = k.useRef(null), A = Wv(S, i), N = k.useRef(0), L = k.useRef(), D = function() {
    var F = S.current, se = a && L.current ? L.current : Xv(F);
    if (se) {
      L.current = se;
      var he = Gv(se, F.value || F.placeholder || "x", d, u), U = he[0], ie = he[1];
      N.current !== U && (N.current = U, F.style.setProperty("height", U + "px", "important"), v(U, {
        rowHeight: ie
      }));
    }
  }, V = function(F) {
    b || D(), p(F);
  };
  return k.useLayoutEffect(D), Zv(S, function() {
    if (!b) {
      var K = S.current.value;
      requestAnimationFrame(function() {
        var F = S.current;
        F && K !== F.value && D();
      });
    }
  }), e_(D), t_(D), /* @__PURE__ */ k.createElement("textarea", wl({}, E, {
    onChange: V,
    ref: A
  }));
}, s_ = /* @__PURE__ */ k.forwardRef(r_);
const bh = (r) => {
  const n = uo(r), i = Ki((a) => a.onScrollToBottom);
  k.useEffect(() => i(n), [i, n]);
}, Ch = k.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: h = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: g = !0, unstable_focusOnScrollToBottom: v = !0, unstable_focusOnThreadSwitched: E = !0, addAttachmentOnPaste: b = !0, ...S }, A) => {
  const N = Ot(), L = xe(({ composer: Q }) => Q.isEditing ? Q.text : ""), D = n ? mh : s_, V = xe(({ thread: Q, composer: le }) => Q.isDisabled || le.dictation?.inputDisabled) || i, K = k.useRef(null), F = ao(A, K);
  bv((Q) => {
    if (!p || !K.current?.contains(Q.target))
      return;
    const le = N.composer();
    le.getState().canCancel && (le.cancel(), Q.preventDefault());
  });
  const se = (Q) => {
    V || !h || Q.nativeEvent.isComposing || Q.key === "Enter" && Q.shiftKey === !1 && (N.thread().getState().isRunning || (Q.preventDefault(), K.current?.closest("form")?.requestSubmit()));
  }, he = async (Q) => {
    if (!b)
      return;
    const le = N.thread().getState().capabilities, ge = Array.from(Q.clipboardData?.files || []);
    if (le.attachments && ge.length > 0)
      try {
        Q.preventDefault(), await Promise.all(ge.map((Ee) => N.composer().addAttachment(Ee)));
      } catch (Ee) {
        console.error("Error adding attachment:", Ee);
      }
  }, U = r && !V, ie = k.useCallback(() => {
    const Q = K.current;
    !Q || !U || (Q.focus({ preventScroll: !0 }), Q.setSelectionRange(Q.value.length, Q.value.length));
  }, [U]);
  return k.useEffect(() => ie(), [ie]), bh(() => {
    N.composer().getState().type === "thread" && v && ie();
  }), k.useEffect(() => {
    if (!(N.composer().getState().type !== "thread" || !g))
      return N.on("thread.run-start", ie);
  }, [g, ie, N]), k.useEffect(() => {
    if (!(N.composer().getState().type !== "thread" || !E))
      return N.on("thread-list-item.switched-to", ie);
  }, [E, ie, N]), m.jsx(D, { name: "input", value: L, ...S, ref: F, disabled: V, onChange: gs(a, (Q) => {
    N.composer().getState().isEditing && _l(() => {
      N.composer().setText(Q.target.value);
    });
  }), onKeyDown: gs(u, se), onPaste: gs(d, he) });
});
Ch.displayName = "ComposerPrimitive.Input";
const i_ = () => {
  const r = Ot(), n = xe(({ composer: a }) => !a.canCancel), i = k.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, o_ = gh("ComposerPrimitive.Cancel", i_), Th = k.forwardRef((r, n) => m.jsx(Cr.div, { ...r, ref: n }));
Th.displayName = "ThreadPrimitive.Root";
const a_ = (r) => xe(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), Sl = ({ children: r, ...n }) => a_(n) ? r : null;
Sl.displayName = "ThreadPrimitive.If";
const l_ = (r) => {
  const n = uo(r), i = k.useCallback((a) => {
    const u = new ResizeObserver(() => {
      n();
    }), d = new MutationObserver((h) => {
      h.some((g) => g.type !== "attributes" || g.attributeName !== "style") && n();
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
  return Is(i);
}, u_ = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = k.useRef(null), d = $l();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const h = k.useRef(0), p = k.useRef(null), g = k.useCallback((A) => {
    const N = u.current;
    N && (p.current = A, N.scrollTo({ top: N.scrollHeight, behavior: A }));
  }, []), v = () => {
    const A = u.current;
    if (!A)
      return;
    const N = d.getState().isAtBottom, L = Math.abs(A.scrollHeight - A.scrollTop - A.clientHeight) < 1 || A.scrollHeight <= A.clientHeight;
    !L && h.current < A.scrollTop || (L && (p.current = null), (L || p.current === null) && L !== N && Es(d).setState({
      isAtBottom: L
    })), h.current = A.scrollTop;
  }, E = l_(() => {
    const A = p.current;
    A ? g(A) : r && d.getState().isAtBottom && g("instant"), v();
  }), b = Is((A) => (A.addEventListener("scroll", v), () => {
    A.removeEventListener("scroll", v);
  }));
  return bh(({ behavior: A }) => {
    g(A);
  }), dl("thread.run-start", () => {
    n && (p.current = "auto", requestAnimationFrame(() => {
      g("auto");
    }));
  }), dl("thread.initialize", () => {
    i && (p.current = "instant", requestAnimationFrame(() => {
      g("instant");
    }));
  }), dl("thread-list-item.switched-to", () => {
    a && (p.current = "instant", requestAnimationFrame(() => {
      g("instant");
    }));
  }), ao(E, b, u);
}, c_ = () => {
  const r = Ki((i) => i.registerViewport), n = k.useCallback((i) => i.clientHeight, []);
  return yh(r, n);
}, Ih = k.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, h) => {
  const p = u_({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), g = c_(), v = ao(h, p, g);
  return m.jsx(Cr.div, { ...d, ref: v, children: u });
});
Ih.displayName = "ThreadPrimitive.ViewportScrollable";
const Rh = k.forwardRef(({ turnAnchor: r, ...n }, i) => m.jsx(fh, { options: { turnAnchor: r }, children: m.jsx(Ih, { ...n, ref: i }) }));
Rh.displayName = "ThreadPrimitive.Viewport";
const Ah = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, d_ = () => null, f_ = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? d_;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, h_ = ({ components: r }) => {
  const n = xe(({ message: u }) => u.role), i = xe(({ message: u }) => u.composer.isEditing), a = f_(r, n, i);
  return m.jsx(a, {});
}, Mh = k.memo(({ index: r, components: n }) => m.jsx(av, { index: r, children: m.jsx(h_, { components: n }) }), (r, n) => r.index === n.index && Ah(r.components, n.components));
Mh.displayName = "ThreadPrimitive.MessageByIndex";
const Nh = ({ components: r }) => {
  const n = xe(({ thread: a }) => a.messages.length);
  return k.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => m.jsx(Mh, { index: u, components: r }, u)), [n, r]);
};
Nh.displayName = "ThreadPrimitive.Messages";
const p_ = k.memo(Nh, (r, n) => Ah(r.components, n.components)), m_ = 1, Xi = Object.freeze({
  product_card: "product_card",
  product_carousel: "product_carousel"
}), ks = Object.freeze({
  [Xi.product_card]: "display_product_card",
  [Xi.product_carousel]: "display_product_carousel"
}), g_ = Object.freeze(
  Object.fromEntries(
    Object.entries(ks).map(([r, n]) => [n, r])
  )
), Ph = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, jh = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, y_ = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), Rs = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Wt = (r, n = "") => typeof r != "string" ? n : r.trim() || n, lt = (r) => Wt(r) || null, xl = (r) => {
  const n = Wt(r);
  return n ? /^(https?:\/\/|\/)/i.test(n) ? n : `/${n.replace(/^\/+/, "")}` : null;
}, v_ = (r, n = !0) => typeof r == "boolean" ? r : n, Lh = (r) => {
  if (!Rs(r))
    return null;
  const n = Wt(r.title, "Untitled crystal"), i = xl(r.url);
  return {
    id: lt(r.id || r.productId),
    handle: lt(r.handle),
    title: n,
    url: i || (r.handle ? `/products/${r.handle}` : null),
    image: xl(r.image || r.featuredImage || r.imageUrl),
    price: lt(r.price || r.priceText),
    compareAtPrice: lt(r.compareAtPrice || r.compareAt),
    badge: lt(r.badge || r.tag || r.intent || r.eyebrow),
    summary: lt(r.summary || r.description || r.body),
    reason: lt(r.reason),
    note: lt(r.note || r.ritual || r.howToUse || r.how_to_use),
    ctaLabel: lt(r.ctaLabel || r.buttonLabel || r.linkLabel),
    merchandiseId: lt(r.merchandiseId || r.variantId),
    variantId: lt(r.variantId || r.merchandiseId),
    available: v_(r.available, !0)
  };
}, __ = (r, n = 6) => Array.isArray(r) ? r.map(Lh).filter(Boolean).slice(0, n) : [], w_ = (r) => {
  if (!Rs(r))
    return null;
  const n = Lh(r.product || r);
  return n ? {
    eyebrow: Wt(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: lt(r.reason || n.reason),
    note: lt(r.note || r.ritual || n.note),
    ctaLabel: Wt(r.ctaLabel || r.buttonLabel || n.ctaLabel, "View crystal"),
    product: n
  } : null;
}, S_ = (r) => {
  if (!Rs(r))
    return null;
  const n = __(r.products, 8);
  return n.length === 0 ? null : {
    eyebrow: Wt(r.eyebrow || r.kicker, "Matched for you"),
    title: Wt(r.title, "Recommended crystals"),
    reason: lt(r.reason || r.description),
    browseUrl: xl(r.browseUrl || r.url),
    browseLabel: Wt(r.browseLabel || r.ctaLabel, "Browse all"),
    products: n
  };
}, x_ = Object.freeze({
  [Xi.product_card]: {
    toolName: ks.product_card,
    normalizeProps: w_
  },
  [Xi.product_carousel]: {
    toolName: ks.product_carousel,
    normalizeProps: S_
  }
}), bs = (r, n = "component") => {
  if (!Rs(r))
    return null;
  const i = Wt(
    r.component || r.componentType || g_[r.toolName]
  ), a = x_[i];
  if (!a)
    return null;
  const u = a.normalizeProps(
    r.props || r.result?.props || r.result || r.args?.props || r.args || r
  );
  if (!u)
    return null;
  const d = Wt(r.id || r.toolCallId, `${a.toolName}-${n}`);
  return {
    type: "component",
    component: i,
    toolName: a.toolName,
    id: d,
    version: m_,
    props: u
  };
}, Wn = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = bs(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, Yl = (r) => {
  const n = [], i = (a, u = 0) => {
    if (u > 3 || a == null)
      return;
    if (Array.isArray(a)) {
      a.forEach((h, p) => {
        const g = bs(h, `${u}-${p}`);
        g && n.push(g);
      });
      return;
    }
    const d = bs(a, `${u}`);
    if (d) {
      n.push(d);
      return;
    }
    Rs(a) && (i(a.components, u + 1), i(a.component, u + 1), i(a.ui?.components, u + 1), i(a.payload?.components, u + 1), i(a.data?.components, u + 1), i(a.data?.ui?.components, u + 1), i(a.metadata?.components, u + 1), i(a.metadata?.ui?.components, u + 1));
  };
  return i(r), Wn([], n);
}, Sf = (r, n = "component") => {
  const i = bs(r, n);
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
}, E_ = (r) => bs(r), Oh = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}, k_ = (r = "") => {
  let n = String(r || "");
  const i = [], a = (u) => {
    const d = [...n.matchAll(u)];
    if (d.length !== 0) {
      for (const h of d) {
        const p = Oh(h[1]);
        p && i.push(p);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(Ph()), a(jh()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    payloads: i
  };
}, b_ = (r = "") => {
  const n = String(r || ""), i = [], a = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi;
  let u = 0, d;
  for (; (d = a.exec(n)) !== null; ) {
    d.index > u && i.push({
      type: "text",
      value: n.slice(u, d.index)
    });
    const h = d[0], p = Oh(d[1] || d[2] || "");
    p ? i.push({
      type: "payload",
      value: p
    }) : i.push({
      type: "text",
      value: h
    }), u = d.index + h.length;
  }
  return u < n.length && i.push({
    type: "text",
    value: n.slice(u)
  }), i;
}, zh = (r = "") => {
  const { answer: n, payloads: i } = k_(r);
  let a = [];
  for (const u of i)
    a = Wn(a, Yl(u));
  return {
    answer: n,
    components: a
  };
}, C_ = (r = "") => {
  const n = String(r || "").toLowerCase();
  for (let i = 0; i < n.length; i += 1)
    for (const { marker: a, minPrefixLength: u } of y_) {
      if (n[i] !== a[0])
        continue;
      const d = n.slice(i);
      if (d.startsWith(a))
        return i;
      const h = d.slice(0, a.length);
      if (h.length >= u && a.startsWith(h))
        return i;
    }
  return -1;
}, T_ = (r = "") => {
  const n = Ph(), i = jh();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = C_(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, I_ = "section-rendering-askcrystal-chat-product-card", Zi = /* @__PURE__ */ new Map(), $i = /* @__PURE__ */ new Map(), Dh = {
  "--product-card-gap": "12px",
  "--product-card-alignment": "stretch",
  "--padding-block-start": "0px",
  "--padding-block-end": "0px",
  "--padding-inline-start": "0px",
  "--padding-inline-end": "0px"
};
function Gl(r) {
  return E_({
    toolName: r.toolName,
    result: r.result,
    args: r.args,
    toolCallId: r.toolCallId
  });
}
function R_(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n)
    return null;
  if (/^\d+$/.test(n))
    return n;
  const i = n.match(/\/(\d+)(?:\?.*)?$/);
  return i ? i[1] : null;
}
function A_(r, n) {
  if (!r?.handle || typeof window > "u")
    return null;
  const i = typeof window.Shopify?.routes?.root == "string" ? window.Shopify.routes.root : "/", a = new URL(`products/${r.handle}`, new URL(i, window.location.origin));
  a.searchParams.set("section_id", I_), a.searchParams.set("askcrystal_handle", r.handle);
  const u = R_(r?.variantId || r?.merchandiseId);
  return u && a.searchParams.set("variant", u), typeof n == "string" && n.trim() && a.searchParams.set("askcrystal_cta", n.trim()), a.toString();
}
function M_(r) {
  const n = typeof r?.url == "string" ? r.url.trim() : "";
  if (n)
    return n;
  const i = typeof r?.handle == "string" ? r.handle.trim() : "";
  return i ? `/products/${i}` : null;
}
function N_(r) {
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
function P_(r) {
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
function j_(r) {
  if (!r)
    return !1;
  const n = !!r.querySelector("a[href]"), i = !!r.querySelector("img, .askcrystal-chat-product-card__placeholder");
  return n && i;
}
function L_(r) {
  const i = new DOMParser().parseFromString(r, "text/html").querySelector("[data-askcrystal-native-product-card]");
  return j_(i) ? i.outerHTML.trim() : null;
}
async function O_(r) {
  if (!r)
    throw new Error("Missing product card request URL");
  const n = Zi.get(r);
  if (n)
    return n;
  if (!$i.has(r)) {
    const i = fetch(r, {
      headers: {
        accept: "text/html"
      },
      credentials: "same-origin"
    }).then(async (a) => {
      if (!a.ok)
        throw new Error(`Failed to load native product card (${a.status})`);
      const u = await a.text(), d = L_(u);
      if (!d)
        throw new Error("Native product card markup was not found in the section response");
      return Zi.set(r, d), d;
    }).finally(() => {
      $i.delete(r);
    });
    $i.set(r, i);
  }
  return $i.get(r);
}
function Fh({ eyebrow: r, title: n, children: i, className: a = "" }) {
  return /* @__PURE__ */ m.jsxs("section", { className: `ac-tool ${a}`.trim(), children: [
    /* @__PURE__ */ m.jsxs("header", { className: "ac-tool__header", children: [
      r ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__eyebrow", children: r }) : null,
      n ? /* @__PURE__ */ m.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function z_({ image: r, title: n, compact: i = !1 }) {
  return /* @__PURE__ */ m.jsx("div", { className: `ac-tool-product__media${i ? " ac-tool-product__media--compact" : ""}`, children: r ? /* @__PURE__ */ m.jsx("img", { src: r, alt: n, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "ac-tool-product__placeholder", children: "Crystal" }) });
}
function D_({ product: r, ctaLabel: n }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-product__meta", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-product__price-group", children: [
      r.price ? /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product__price", children: r.price }) : null,
      r.compareAtPrice ? /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product__compare", children: r.compareAtPrice }) : null
    ] }),
    /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product__cta", children: n || "View crystal" })
  ] });
}
function F_({ product: r, ctaLabel: n }) {
  const i = M_(r), a = N_(r), u = P_(r), d = n || "View", h = a ? /* @__PURE__ */ m.jsx("img", { className: "askcrystal-chat-product-card__image", src: a, alt: u, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }), p = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__media", children: h }),
    /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__body", children: [
      /* @__PURE__ */ m.jsx("product-title", { className: "askcrystal-chat-product-card__title", children: /* @__PURE__ */ m.jsx("span", { className: "title-text", children: r.title }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__meta", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__price-group", children: [
          r.price ? /* @__PURE__ */ m.jsx("span", { className: "askcrystal-chat-product-card__price askcrystal-chat-product-card__price--hydrated", children: r.price }) : null,
          r.compareAtPrice ? /* @__PURE__ */ m.jsx("span", { className: "askcrystal-chat-product-card__compare", children: r.compareAtPrice }) : null
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "askcrystal-chat-product-card__cta", children: d })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ m.jsx(
    "div",
    {
      className: "askcrystal-chat-product-card",
      "data-askcrystal-native-product-card": !0,
      "data-askcrystal-render-mode": "hydrated",
      children: /* @__PURE__ */ m.jsx(
        "div",
        {
          className: "product-card askcrystal-chat-product-card__card",
          "data-product-id": r.id || void 0,
          children: /* @__PURE__ */ m.jsx(
            "div",
            {
              className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
              style: Dh,
              children: i ? /* @__PURE__ */ m.jsx("a", { className: "askcrystal-chat-product-card__surface", href: i, children: p }) : /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__surface", children: p })
            }
          )
        }
      )
    }
  );
}
function B_() {
  return /* @__PURE__ */ m.jsx(
    "div",
    {
      className: "askcrystal-chat-product-card ac-product-card-skeleton",
      "data-askcrystal-native-product-card": !0,
      "data-askcrystal-render-mode": "loading",
      "aria-hidden": "true",
      children: /* @__PURE__ */ m.jsx("div", { className: "product-card askcrystal-chat-product-card__card", children: /* @__PURE__ */ m.jsx(
        "div",
        {
          className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
          style: Dh,
          children: /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__surface", children: [
            /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__media ac-product-card-skeleton__media", children: /* @__PURE__ */ m.jsx("span", { className: "ac-product-card-skeleton__crystal" }) }),
            /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__body ac-product-card-skeleton__body", children: [
              /* @__PURE__ */ m.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--title" }),
              /* @__PURE__ */ m.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--short" }),
              /* @__PURE__ */ m.jsxs("span", { className: "ac-product-card-skeleton__meta", children: [
                /* @__PURE__ */ m.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--price" }),
                /* @__PURE__ */ m.jsx("span", { className: "ac-product-card-skeleton__pill" })
              ] })
            ] })
          ] })
        }
      ) })
    }
  );
}
function U_({ product: r, ctaLabel: n }) {
  const i = A_(r, n), [a, u] = k.useState(() => i && Zi.get(i) || null), [d, h] = k.useState(null);
  return k.useEffect(() => {
    let p = !0;
    if (!i)
      return k.startTransition(() => {
        u(null), h(new Error("Missing product card request URL"));
      }), () => {
        p = !1;
      };
    const g = Zi.get(i);
    return g ? (k.startTransition(() => {
      u(g), h(null);
    }), () => {
      p = !1;
    }) : (k.startTransition(() => {
      u(null), h(null);
    }), O_(i).then((v) => {
      p && k.startTransition(() => {
        u(v), h(null);
      });
    }).catch((v) => {
      p && (typeof console < "u" && typeof console.warn == "function" && console.warn("[AskCrystal] Native product card render fell back to hydrated shell.", {
        requestUrl: i,
        error: v,
        product: r
      }), k.startTransition(() => {
        u(null), h(v);
      }));
    }), () => {
      p = !1;
    });
  }, [i]), a ? /* @__PURE__ */ m.jsx(
    "div",
    {
      className: "ac-tool-product-native ac-tool-product-native--native",
      dangerouslySetInnerHTML: { __html: a }
    }
  ) : /* @__PURE__ */ m.jsx(
    "div",
    {
      className: `ac-tool-product-native ${d ? "ac-tool-product-native--fallback" : "ac-tool-product-native--loading"}`.trim(),
      "aria-busy": d ? void 0 : "true",
      "aria-live": "polite",
      children: d ? /* @__PURE__ */ m.jsx(F_, { product: r, ctaLabel: n }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product-native__loading-label", children: "Polishing the storefront card..." }),
        /* @__PURE__ */ m.jsx(B_, {})
      ] })
    }
  );
}
function $_(r) {
  const n = Gl(r);
  if (!n)
    return null;
  const { ctaLabel: i, eyebrow: a, note: u, product: d, reason: h } = n.props;
  return /* @__PURE__ */ m.jsxs("section", { className: "ac-tool-product-block", children: [
    a || h || u ? /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-product-context", children: [
      a ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product-context__eyebrow", children: a }) : null,
      h ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product-context__reason", children: h }) : null,
      u ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product-context__note", children: u }) : null
    ] }) : null,
    /* @__PURE__ */ m.jsx(U_, { product: d, ctaLabel: i })
  ] });
}
function H_(r) {
  const n = Gl(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    reason: u,
    browseUrl: d,
    browseLabel: h,
    products: p
  } = n.props;
  return /* @__PURE__ */ m.jsxs(Fh, { eyebrow: i, title: a, className: "ac-tool--carousel", children: [
    u ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    /* @__PURE__ */ m.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: p.map((g, v) => {
      const E = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsx(z_, { image: g.image, title: g.title, compact: !0 }),
        /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-carousel__copy", children: [
          g.badge ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product__badge", children: g.badge }) : null,
          /* @__PURE__ */ m.jsx("h4", { className: "ac-tool-product__title", children: g.title }),
          /* @__PURE__ */ m.jsx(D_, { product: g, ctaLabel: g.ctaLabel || "View" })
        ] })
      ] });
      return g.url ? /* @__PURE__ */ m.jsx("a", { className: "ac-tool-carousel__card", href: g.url, role: "listitem", children: E }, g.id || g.handle || v) : /* @__PURE__ */ m.jsx("div", { className: "ac-tool-carousel__card", role: "listitem", children: E }, g.id || g.handle || v);
    }) }),
    d ? /* @__PURE__ */ m.jsx("div", { className: "ac-tool__footer", children: /* @__PURE__ */ m.jsx("a", { className: "ac-tool__footer-link", href: d, children: h }) }) : null
  ] });
}
function V_(r) {
  const n = Gl(r);
  return n ? /* @__PURE__ */ m.jsx(Fh, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function W_({ children: r }) {
  return /* @__PURE__ */ m.jsx("div", { className: "ac-tool-group", children: r });
}
const Y_ = {
  [ks.product_card]: $_,
  [ks.product_carousel]: H_
}, G_ = {
  tools: {
    by_name: Y_,
    Fallback: V_
  },
  ToolGroup: W_
}, Bh = "[data-askcrystal-homepage-root]", eo = /* @__PURE__ */ new Map(), q_ = "askcrystal-main-thread", Q_ = "http://localhost:8787", Uh = Object.freeze([]), El = "askcrystal-theme-session-id", $h = "askcrystal-theme-chat-sessions-v1", Hh = "askcrystal-theme-active-session-id", kl = "askcrystal-theme-pending-prompt-v1", K_ = "askcrystal:session-registry", xf = "askcrystal:session-select", Ef = "askcrystal:session-create", kf = "askcrystal:session-delete", co = 24, J_ = "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538";
let bf = 0;
const X_ = 7, Vh = Nt.createContext({
  sendPrompt: () => {
  },
  onCancel: () => {
  },
  isRunning: !1
});
function Wh() {
  return Nt.useContext(Vh);
}
function Z_(r) {
  const n = document.getElementById(r);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function Mt(r = []) {
  return r.map((n) => n.type === "text" ? n.text : "").join(" ").trim();
}
function pl(r) {
  const n = r?.answer || r?.delta || r?.text || r?.message || r?.reply || r?.output || r?.data?.answer || r?.data?.text || r?.data?.outputs?.answer || r?.data?.outputs?.text || r?.data?.outputs?.output;
  return typeof n == "string" ? n : "";
}
function Gt(r) {
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
const bl = /```askcrystal-suggestions\s*([\s\S]*?)```|<askcrystal-suggestions>\s*([\s\S]*?)<\/askcrystal-suggestions>/gi, ew = [
  "```askcrystal-suggestions",
  "<askcrystal-suggestions"
];
function tw(r) {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function nw(r = "") {
  let n = String(r || "");
  const i = [], a = [...n.matchAll(bl)];
  for (const u of a) {
    const d = tw(u[1] || u[2] || ""), h = Gt(d?.suggestions || d || []);
    i.push(...h);
  }
  return n = n.replace(bl, "").replace(/\n{3,}/g, `

`).trim(), {
    answer: n,
    suggestions: Gt(i)
  };
}
function to(r = "") {
  let n = String(r || "").replace(bl, "");
  const i = n.toLowerCase(), a = ew.map((u) => i.indexOf(u)).filter((u) => u >= 0);
  return a.length > 0 && (n = n.slice(0, Math.min(...a))), n.trimEnd();
}
function Yh() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.localStorage < "u";
  } catch {
    return !1;
  }
}
function Cl(r) {
  if (!Yh()) return "";
  try {
    return window.localStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function no(r, n) {
  if (Yh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.localStorage.removeItem(r);
        return;
      }
      window.localStorage.setItem(r, n);
    } catch {
    }
}
function Gh() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.sessionStorage < "u";
  } catch {
    return !1;
  }
}
function rw(r) {
  if (!Gh()) return "";
  try {
    return window.sessionStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function qh(r, n) {
  if (Gh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.sessionStorage.removeItem(r);
        return;
      }
      window.sessionStorage.setItem(r, n);
    } catch {
    }
}
function sw(r) {
  return r === "chat" ? "chat" : "home";
}
function iw() {
  if (typeof window > "u") return "";
  try {
    const r = new URLSearchParams(window.location.search), n = r.get("askcrystal") || r.get("mode");
    if (n === "chat") return "chat";
    if (n === "home") return "home";
  } catch {
  }
  return "";
}
function Qh(r = {}) {
  return iw() || sw(r.displayMode);
}
function Kh(r = {}) {
  return (typeof r.chatPageUrl == "string" ? r.chatPageUrl.trim() : "") || "/?askcrystal=chat";
}
function ow(r, n) {
  const i = typeof n == "string" ? n.trim() : "";
  return !i || typeof window > "u" ? !1 : (qh(kl, JSON.stringify({
    prompt: i,
    createdAt: Date.now()
  })), window.location.assign(Kh(r)), !0);
}
function aw() {
  const r = rw(kl);
  if (!r) return "";
  qh(kl, "");
  const n = Jh(r, null), i = typeof n?.prompt == "string" ? n.prompt.trim() : "", a = Number(n?.createdAt), u = Number.isFinite(a) ? Date.now() - a < 300 * 1e3 : !0;
  return i && u ? i : "";
}
function Jh(r, n) {
  if (typeof r != "string" || !r.trim()) return n;
  try {
    return JSON.parse(r);
  } catch {
    return n;
  }
}
function Xh(r, n = 52) {
  const i = typeof r == "string" ? r.replace(/\s+/g, " ").trim() : "";
  return i ? i.length <= n ? i : `${i.slice(0, Math.max(1, n - 1)).trimEnd()}…` : "";
}
function lw(r) {
  if (!r || typeof r != "object") return null;
  const n = r.createdAt ? new Date(r.createdAt) : /* @__PURE__ */ new Date(), i = {
    ...r,
    createdAt: Number.isNaN(n.getTime()) ? /* @__PURE__ */ new Date() : n,
    content: Array.isArray(r.content) ? r.content : Array.isArray(r.parts) ? r.parts : [],
    attachments: Array.isArray(r.attachments) ? r.attachments : [],
    metadata: r.metadata && typeof r.metadata == "object" ? r.metadata : { custom: {} }
  };
  return i.role === "assistant" && i.status?.type === "running" ? {
    ...i,
    status: {
      type: "incomplete",
      reason: "interrupted"
    },
    metadata: {
      ...i.metadata || {},
      custom: {
        ...i.metadata?.custom || {}
      }
    }
  } : i;
}
function fo(r) {
  return Array.isArray(r) ? r.map(lw).filter(Boolean) : [];
}
function Tl(r) {
  if (!r || typeof r != "object") return "";
  const n = r.content || r.parts || [], i = Mt(Array.isArray(n) ? n : []);
  return i || (Array.isArray(r.metadata?.unstable_data) && r.metadata.unstable_data.length > 0 && r.role === "assistant" ? "Shared storefront picks and guidance." : "");
}
function ho(r, n = "New reading") {
  const i = Array.isArray(r) ? r.find((u) => u?.role === "user" && Tl(u)) : null, a = Tl(i);
  return a ? Xh(a, 42) : n;
}
function uw(r) {
  if (!Array.isArray(r) || r.length === 0)
    return "No messages yet.";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = Tl(r[n]);
    if (i) return Xh(i, 78);
  }
  return "No messages yet.";
}
function Zh(r, n = null) {
  if (!Array.isArray(r) || r.length === 0) return n;
  for (let i = r.length - 1; i >= 0; i -= 1) {
    const a = r[i]?.createdAt;
    if (!a) continue;
    const u = new Date(a).toISOString();
    if (u) return u;
  }
  return n;
}
function Er(r) {
  return [...r].sort((n, i) => {
    const a = new Date(i?.updatedAt || 0).getTime(), u = new Date(n?.updatedAt || 0).getTime();
    return a - u;
  });
}
function Cs(r = {}) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), i = fo(r.messages || []);
  return {
    id: typeof r.id == "string" && r.id ? r.id : Gn("thread"),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : ho(i),
    createdAt: typeof r.createdAt == "string" && r.createdAt ? r.createdAt : n,
    updatedAt: typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : n,
    conversationId: typeof r.conversationId == "string" && r.conversationId ? r.conversationId : null,
    messages: i,
    suggestions: Gt(r.suggestions || []),
    suggestionsMessageId: typeof r.suggestionsMessageId == "string" ? r.suggestionsMessageId : ""
  };
}
function cw(r) {
  if (!r || typeof r != "object") return null;
  const n = fo(r.messages || []), i = typeof r.createdAt == "string" && r.createdAt ? r.createdAt : (/* @__PURE__ */ new Date()).toISOString(), a = typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : Zh(n, i) || i;
  return Cs({
    ...r,
    createdAt: i,
    updatedAt: a,
    messages: n,
    suggestions: Gt(r.suggestions || []),
    suggestionsMessageId: typeof r.suggestionsMessageId == "string" ? r.suggestionsMessageId : "",
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : ho(n)
  });
}
function dw() {
  const r = Jh(Cl($h), []), n = Array.isArray(r) ? r.map(cw).filter(Boolean) : [], i = n.length > 0 ? Er(n).slice(0, co) : [Cs()], a = Cl(Hh), u = i.some((d) => d.id === a) ? a : i[0].id;
  return {
    sessions: i,
    activeSessionId: u
  };
}
function fw({ sessions: r, activeSessionId: n }) {
  no(
    $h,
    JSON.stringify(Er(r).slice(0, co))
  ), no(Hh, n);
}
function ml(r, n) {
  return Array.isArray(r) && r.find((i) => i.id === n) || null;
}
function Cf(r) {
  return r ? {
    ...r,
    title: ho(r.messages, r.title || "New reading"),
    updatedAt: Zh(r.messages, (/* @__PURE__ */ new Date()).toISOString()) || (/* @__PURE__ */ new Date()).toISOString()
  } : null;
}
function Tf(r, n, i = {}) {
  const a = [];
  let u = !1;
  for (const d of Array.isArray(r) ? r : []) {
    if (d.id !== n) {
      a.push(d);
      continue;
    }
    u = !0;
    const h = i.messages !== void 0 ? fo(i.messages) : d.messages, p = Cf({
      ...d,
      ...i,
      messages: h,
      suggestions: i.suggestions !== void 0 ? Gt(i.suggestions) : d.suggestions,
      suggestionsMessageId: i.suggestionsMessageId !== void 0 ? i.suggestionsMessageId || "" : d.suggestionsMessageId || "",
      conversationId: i.conversationId !== void 0 ? i.conversationId || null : d.conversationId
    });
    a.push(p);
  }
  return u || a.push(Cf(Cs({
    id: n,
    ...i
  }))), Er(a).slice(0, co);
}
function ep(r) {
  return Er(Array.isArray(r) ? r : []).map((n) => ({
    id: n.id,
    title: ho(n.messages, n.title || "New reading"),
    preview: uw(n.messages),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    isEmpty: !Array.isArray(n.messages) || n.messages.length === 0
  }));
}
function hw({ sessions: r, activeSessionId: n, isRunning: i }) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(K_, {
    detail: {
      sessions: ep(r),
      activeSessionId: n,
      isRunning: !!i
    }
  }));
}
function Hi() {
  if (typeof document > "u") return;
  const r = document.getElementById("Details-menu-drawer-container");
  if (!r) return;
  const n = r.querySelector(".menu-drawer__close-button");
  if (n instanceof HTMLElement) {
    n.click();
    return;
  }
  "open" in r && (r.open = !1), r.removeAttribute("open");
}
function pw(r) {
  return /^(https?:\/\/|mailto:|\/)/i.test(r);
}
function rn(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, h = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const p = `${n}-${h}`;
    if (d[2] && d[3]) {
      const g = d[3].trim();
      i.push(
        pw(g) ? /* @__PURE__ */ m.jsx("a", { href: g, target: g.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ m.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ m.jsx("strong", { children: rn(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ m.jsx("em", { children: rn(d[6], `${p}-em`) }, p));
    u = a.lastIndex, h += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function Ts(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function mw(r) {
  const n = Ts(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function gw(r) {
  const n = Ts(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function If(r) {
  const n = Ts(r);
  return n.length >= 2 && n.some(Boolean);
}
function yw(r, n) {
  const i = r[n];
  if (!If(i)) return null;
  const a = Ts(i), u = r[n + 1], d = gw(u);
  let h = n + (d ? 2 : 1);
  const p = [];
  for (; h < r.length && If(r[h]); ) {
    const g = Ts(r[h]);
    if (g.length !== a.length) break;
    p.push(g), h += 1;
  }
  return p.length === 0 ? null : {
    headers: a,
    alignments: d ? mw(u) : a.map(() => "left"),
    rows: p,
    nextIndex: h
  };
}
function vw(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function tp({ text: r = "" }) {
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
      const E = [], b = d[1] || "";
      for (a += 1; a < n.length && !/^```\s*$/.test(n[a]); )
        E.push(n[a]), a += 1;
      a < n.length && (a += 1), vw(b) ? i.push(
        /* @__PURE__ */ m.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ m.jsx(tp, { text: E.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ m.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ m.jsx("code", { children: E.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const h = u.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const E = `h${h[1].length + 2}`;
      i.push(
        /* @__PURE__ */ m.jsx(E, { children: rn(h[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ m.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const p = yw(n, a);
    if (p) {
      const { headers: E, alignments: b, rows: S, nextIndex: A } = p;
      a = A, i.push(
        /* @__PURE__ */ m.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ m.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ m.jsx("thead", { children: /* @__PURE__ */ m.jsx("tr", { children: E.map((N, L) => /* @__PURE__ */ m.jsx(
            "th",
            {
              style: { textAlign: b[L] || "left" },
              children: rn(N, `table-head-${a}-${L}`)
            },
            `table-head-${a}-${L}`
          )) }) }),
          /* @__PURE__ */ m.jsx("tbody", { children: S.map((N, L) => /* @__PURE__ */ m.jsx("tr", { children: E.map((D, V) => /* @__PURE__ */ m.jsx(
            "td",
            {
              style: { textAlign: b[V] || "left" },
              children: rn(N[V] || "", `table-cell-${a}-${L}-${V}`)
            },
            `table-cell-${a}-${L}-${V}`
          )) }, `table-row-${a}-${L}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const E = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        E.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("ul", { children: E.map((b, S) => /* @__PURE__ */ m.jsx("li", { children: rn(b, `ul-${a}-${S}`) }, `ul-${a}-${S}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const E = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        E.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("ol", { children: E.map((b, S) => /* @__PURE__ */ m.jsx("li", { children: rn(b, `ol-${a}-${S}`) }, `ol-${a}-${S}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const E = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        E.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("blockquote", { children: E.map((b, S) => /* @__PURE__ */ m.jsx("p", { children: rn(b, `quote-${a}-${S}`) }, `quote-${a}-${S}`)) }, `quote-${a}`)
      );
      continue;
    }
    const g = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      g.push(n[a].trim()), a += 1;
    const v = g.join(" ");
    i.push(
      /* @__PURE__ */ m.jsx("p", { children: rn(v, `p-${a}`) }, `p-${a}`)
    );
  }
  return /* @__PURE__ */ m.jsx("div", { className: "ac-markdown", children: i });
}
function _w(r) {
  if (typeof r != "string" || !r) return "";
  try {
    return JSON.parse(r);
  } catch {
    return r.replace(/^"/, "").replace(/"$/, "");
  }
}
function ww(r) {
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
function Sw(r) {
  if (typeof r != "string" || !r) return "";
  const n = [...r.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*"/gi
  )].pop();
  if (!n || typeof n.index != "number") return "";
  const i = n.index + n[0].length;
  let a = i, u = !1;
  for (; a < r.length; ) {
    const h = r[a];
    if (u) {
      u = !1, a += 1;
      continue;
    }
    if (h === "\\") {
      u = !0, a += 1;
      continue;
    }
    if (h === '"') break;
    a += 1;
  }
  const d = r.slice(i, a);
  return ww(d).trim();
}
function np(r) {
  if (typeof r != "string") return "";
  const n = ql(r).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trim();
  if (!n) return "";
  const i = [...n.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi
  )].pop();
  if (i?.[1]) {
    const d = _w(i[1]).trim();
    if (d) return d;
  }
  const a = Sw(n);
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
function ql(r) {
  return typeof r != "string" ? "" : r.replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, "").replace(/<thinking\b[^>]*>[\s\S]*?<\/thinking>/gi, "").replace(/<reasoning\b[^>]*>[\s\S]*?<\/reasoning>/gi, "").replace(/<analysis\b[^>]*>[\s\S]*?<\/analysis>/gi, "").replace(/<think\b[^>]*>[\s\S]*$/gi, "").replace(/<thinking\b[^>]*>[\s\S]*$/gi, "").replace(/<reasoning\b[^>]*>[\s\S]*$/gi, "").replace(/<analysis\b[^>]*>[\s\S]*$/gi, "");
}
function xw(r) {
  if (typeof r != "string") return "";
  let n = r.replace(/^\uFEFF/, "").trimStart();
  if (!n) return "";
  const i = n.slice(0, 24).toLowerCase().replace(/\s+/g, " ").trim();
  if (i && i.length >= 3 && i.length <= 13 && "final answer:".startsWith(i) && /^[a-z:\s]+$/i.test(n.trim()) && n.trim().length <= 24)
    return "";
  const a = [...n.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  return typeof a?.index == "number" ? n = n.slice(a.index + a[0].length).trimStart() : n = n.replace(/^final answer\s*:\s*/i, ""), n;
}
function gl(r) {
  if (typeof r != "string") return "";
  const n = to(ql(r)).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trimStart();
  if (!n) return "";
  const i = np(n), a = to(xw(i || n));
  return a ? a.replace(/\n{3,}/g, `

`).trimStart() : "";
}
function Ew(r) {
  if (typeof r != "string") return !1;
  const n = r.toLowerCase();
  return /\bthought:\b/.test(n) || /\bobservation:\b/.test(n) || /\baction:\b/.test(n) || /\bquestion:\b/.test(n) || /"action"\s*:/.test(n) || /\bfinal answer\b/.test(n);
}
function Rf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(n) || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(n) || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(n) || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(n) || /\bi have \w+ products?\b/.test(n) : !1;
}
function Af(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(n) || /^```(?:json|xml)?\s*[\[{<]/.test(n) || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(n) || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(n) : !1;
}
function kw(r) {
  if (typeof r != "string") return "";
  let n = r.trim();
  if (!n) return "";
  const i = n.split(`
`);
  let a = 0;
  for (; a < i.length; ) {
    const h = i[a].trim();
    if (!h) {
      a += 1;
      continue;
    }
    if (!Rf(h)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((h) => h.trim()).filter(Boolean);
  let d = 0;
  for (; d < u.length && Rf(u[d]); )
    d += 1;
  return u.slice(d).join(`

`).trim();
}
function Ql(r) {
  return Array.isArray(r) ? r.map((n) => typeof n == "string" ? n.trim() : "").filter(Boolean).slice(-6) : typeof r == "string" ? r.split(`
`).map((n) => n.trim()).filter(Boolean).slice(-6) : [];
}
function bw({ statusStage: r = "", statusTool: n = "", statusText: i = "" }) {
  const a = `${r} ${n} ${i}`.toLowerCase();
  return /shopify|catalog|product|variant|collection|cart|storefront|inventory|shelf/.test(a) ? [
    "Walking the crystal shelves for a close match...",
    "Comparing a few pieces against your question...",
    "Checking which crystal pieces answer most clearly...",
    "Looking for a match that feels chosen, not generic...",
    "Following the pull toward the clearest shelf match..."
  ] : /knowledge|dataset|retriev|document|archive|rag|kb|search|library/.test(a) ? [
    "Opening the archive and brushing dust from the pages...",
    "Cross-checking older notes with your question...",
    "Pulling the clearest thread from the library...",
    "Listening where memory and meaning overlap...",
    "Letting the right fragment rise to the surface..."
  ] : /tarot|card|spread/.test(a) ? [
    "Turning the cards one current at a time...",
    "Watching which symbols insist on being seen...",
    "Letting the spread settle before reading the pattern...",
    "Listening for the card that changes the story...",
    "Tracing the image that keeps returning to the surface..."
  ] : /astrology|natal|zodiac|planet|birth|horoscope|star/.test(a) ? [
    "Tracing the sky-map behind your question...",
    "Checking where the planets press most strongly...",
    "Following the bright houses and quiet tensions...",
    "Listening for the weather between stars and self...",
    "Letting the chart reveal its steadier rhythm..."
  ] : /bazi|shushu|taibu|fengshui|yinyuan|marriage|fate|element/.test(a) ? [
    "Following the hidden stems beneath the surface...",
    "Reading the timing, element, and pattern in the chart...",
    "Letting the older map reveal structure...",
    "Listening for balance inside the chart...",
    "Holding the pattern until its shape becomes clear..."
  ] : /crystal|stone|chakra|healing|ritual/.test(a) ? [
    "Holding the stones against the shape of your question...",
    "Checking which crystal answers steadily...",
    "Listening for resonance before choosing...",
    "Feeling for the stone that calms instead of performs...",
    "Letting the ritual find its gentle center..."
  ] : r === "compose" || r === "thought" ? [
    "The pattern is surfacing...",
    "Gathering the clearest strand before I speak...",
    "Letting the reading take its proper shape...",
    "Joining symbol, shelf, and guidance...",
    "Settling into plain language..."
  ] : [
    "Settling into the thread beneath your words...",
    "Listening for what wants to be named first...",
    "Holding the question until the noise falls away...",
    "Letting the reading gather around the clearest signal...",
    "Finding the gentlest path into the answer..."
  ];
}
function Cw({ statusText: r = "", statusStage: n = "", ambientStatusText: i = "", hasToolActivity: a = !1 }) {
  return i || (n && n !== "tool" && r ? r : a ? "Following the clearest thread..." : "Settling into your energy...");
}
function Tw() {
  const [r, n] = k.useState(!1);
  return k.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
function Iw({
  statusText: r,
  statusStage: n = "",
  statusTool: i = "",
  ambientStatusText: a = ""
}) {
  const u = Tw(), d = k.useMemo(() => {
    const g = Cw({
      statusText: r,
      statusStage: n,
      ambientStatusText: a,
      hasToolActivity: n === "tool"
    }), v = bw({
      statusStage: n === "tool" ? "compose" : n,
      statusTool: i,
      statusText: g
    });
    return [...new Set([g, ...v].filter(Boolean))];
  }, [a, n, r, i]), [h, p] = k.useState(0);
  return k.useEffect(() => {
    p(0);
  }, [d]), k.useEffect(() => {
    if (u || d.length <= 1) return;
    const g = window.setTimeout(() => {
      p((v) => (v + 1) % d.length);
    }, 7200);
    return () => window.clearTimeout(g);
  }, [d.length, h, u]), /* @__PURE__ */ m.jsx("p", { className: "ac-progress-card__ambient", children: d[h] || "The reading is still moving..." });
}
function Rw(r) {
  return r >= 55e3 ? "This reading is taking the longer orbit, but the thread is still moving." : r >= 3e4 ? "Detailed chart work can need a fuller minute to cross-check timing, symbols, and shelf." : r >= 12e3 ? "Deeper readings sometimes need a few more breaths before they become useful." : r >= 4e3 ? "Following the strongest thread." : "The first signs are arriving.";
}
function Aw({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = "",
  statusElapsedMs: d = 0
}) {
  const h = k.useRef(Date.now()), [p, g] = k.useState(0);
  k.useEffect(() => {
    const se = window.setInterval(() => {
      g(Date.now() - h.current);
    }, 1e3);
    return () => window.clearInterval(se);
  }, []);
  const v = Math.max(Number(d) || 0, p), E = v >= 3e4 ? "long" : v >= 12e3 ? "deep" : "early", b = v >= 4e3 || i === "tool" || i === "compose", S = Ql(n), A = r || "Opening the thread beneath your question...", N = "Choosing the strongest reading path", L = "Choosing the right reading path", D = S.filter((se) => se !== N && se !== L);
  i === "tool" && A && A !== N && A !== L && !D.includes(A) && D.push(A);
  const V = D.slice(-1), K = [
    {
      label: "Your question has entered the reading",
      state: "done"
    }
  ];
  if (b) {
    const se = V.length > 0 || i === "compose";
    K.push({
      label: se ? "The strongest reading path is chosen" : N,
      state: se ? "done" : "current"
    }), V.forEach((he, U) => {
      const ie = U === V.length - 1;
      K.push({
        label: he,
        state: i === "tool" && ie ? "current" : "done"
      });
    }), K.push({
      label: "Shaping the guidance into a clear answer",
      state: i === "compose" ? "current" : "pending"
    });
  } else
    K.push({
      label: A,
      state: "current"
    });
  const F = K.slice(0, 4);
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-progress-card", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-progress-card__header", children: /* @__PURE__ */ m.jsxs("div", { className: "ac-progress-card__heading", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-progress-card__eyebrow", children: "AskCrystal is listening" }),
      /* @__PURE__ */ m.jsxs("h3", { children: [
        "Reading the signs",
        /* @__PURE__ */ m.jsxs("span", { className: "ac-progress-card__heading-dots", "aria-hidden": "true", children: [
          /* @__PURE__ */ m.jsx("span", {}),
          /* @__PURE__ */ m.jsx("span", {}),
          /* @__PURE__ */ m.jsx("span", {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ m.jsx("ol", { className: "ac-progress-card__steps ac-progress-card__steps--lyric", "aria-label": "Reading progress", children: F.map((se, he) => /* @__PURE__ */ m.jsxs(
      "li",
      {
        className: `ac-progress-card__step ac-progress-card__step--${se.state}`,
        style: { "--ac-progress-step-index": he },
        children: [
          /* @__PURE__ */ m.jsx("span", { className: "ac-progress-card__step-marker", "aria-hidden": "true" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-progress-card__step-label", children: se.label })
        ]
      },
      `${se.label}-${he}`
    )) }),
    /* @__PURE__ */ m.jsx(
      Iw,
      {
        statusText: r,
        statusStage: i,
        statusTool: a,
        ambientStatusText: u
      }
    ),
    /* @__PURE__ */ m.jsx("div", { className: "ac-progress-card__footer", children: /* @__PURE__ */ m.jsx("p", { className: `ac-progress-card__expectation ac-progress-card__expectation--${E}`, children: Rw(v) }) })
  ] });
}
function Mw(r) {
  if (!r)
    return {
      stage: "",
      tool: "",
      message: "",
      taskId: "",
      elapsedMs: 0
    };
  if (typeof r == "string")
    return {
      stage: "",
      tool: "",
      message: r,
      taskId: "",
      elapsedMs: 0
    };
  const n = Number(r.elapsedMs);
  return {
    stage: typeof r.stage == "string" ? r.stage : "",
    tool: typeof r.tool == "string" ? r.tool : "",
    message: typeof r.message == "string" ? r.message : "",
    taskId: ys(r),
    elapsedMs: Number.isFinite(n) ? Math.max(0, n) : 0
  };
}
function Kl(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return Mt(i.content);
  }
  return "";
}
function yl(r, n) {
  return r.find((i) => n(i));
}
function Nw({ matchedIntention: r, fallbackProduct: n, products: i }) {
  return r?.product ? Wn([], [
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
  ]) : Wn([], [
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
function Pw(r, n) {
  const i = r.toLowerCase(), u = [
    {
      key: "calm",
      test: /sleep|rest|anxious|stress|calm|ground|peace/,
      lead: "I would start by softening the energy around your nervous system before recommending anything too activating.",
      product: yl(n, (g) => /amethyst|selenite|moonstone|calm|sleep/i.test(`${g.title} ${g.summary || ""}`)) || n[0],
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
      product: yl(n, (g) => /rose|heart|love|pink/i.test(`${g.title} ${g.summary || ""}`)) || n[0],
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
      product: yl(n, (g) => /citrine|pyrite|tiger|success|abundance/i.test(`${g.title} ${g.summary || ""}`)) || n[0],
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
  ].find((g) => g.test.test(i)), d = n[0], h = Nw({
    matchedIntention: u,
    fallbackProduct: d,
    products: n
  });
  return u?.product ? {
    answer: `${u.lead}

A likely fit from the current shelf is ${u.product.title}. ${u.product.summary || "It looks aligned with the intention you mentioned."}

${u.ritual}`,
    components: h
  } : {
    answer: `I can already support the guided-storefront shape we want here: start with the feeling, clarify the intention, and only then move into product curation.

${d ? `A natural first shelf item to explore is ${d.title}. ${d.summary || "It is a strong general starting point while we learn more about the user."}` : "Once the catalog feed is connected, this space can surface a small set of best-fit crystals without leaving the thread."}

If you tell me what is most present right now, I can narrow the reading and the recommendation together.`,
    components: h
  };
}
function rp(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = np(n), a = to(i || n), u = ql(a).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && Ew(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), h = kw(u), p = d >= 0 ? u.slice(d).trim() : h || u, v = p.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).filter((b) => !Af(b)), E = (v.length > 0 ? v.join(`

`) : p).trim();
    if (E && !Af(E))
      return E;
  }
  return "";
}
function jw(r) {
  const n = rp(r);
  return n || [
    "I tried to check the shelf for you, but the live catalog result was not available in this moment.",
    "For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”",
    "If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely."
  ].join(`

`);
}
function Il(r, n = []) {
  const i = nw(r), a = zh(i.answer), u = Wn(n, a.components), d = jw(a.answer), h = i.suggestions;
  return d ? {
    answer: d,
    components: u,
    suggestions: h,
    sourceText: typeof r == "string" && r.trim() ? r : d
  } : u.length > 0 ? {
    answer: "I found a store-backed match for you below.",
    components: u,
    suggestions: h,
    sourceText: typeof r == "string" && r.trim() ? r : "I found a store-backed match for you below."
  } : {
    answer: "AskCrystal finished the request, but no guidance text came back. Please try again.",
    components: [],
    suggestions: h,
    sourceText: "AskCrystal finished the request, but no guidance text came back. Please try again."
  };
}
function Cn({ text: r = "", components: n = [] } = {}) {
  const i = typeof r == "string" ? r : "", a = zh(i), u = Wn(n, a.components), d = b_(i), h = [], p = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map(), v = (S) => `${S.toolName}:${S.toolCallId}`;
  for (const S of u) {
    const A = Sf(S);
    A && g.set(v(A), A);
  }
  const E = (S) => {
    const A = to(T_(S)).trim(), N = rp(A);
    if (!N) return;
    const L = h[h.length - 1];
    if (L?.type === "text") {
      L.text = `${L.text}

${N}`.trim();
      return;
    }
    h.push({
      type: "text",
      text: N
    });
  }, b = (S) => {
    for (const A of S) {
      const N = Sf(A);
      if (!N) continue;
      const L = v(N);
      p.has(L) || (h.push(g.get(L) || N), p.add(L));
    }
  };
  if (d.some((S) => S.type === "payload"))
    for (const S of d) {
      if (S.type === "text") {
        E(S.value);
        continue;
      }
      b(Yl(S.value));
    }
  else
    E(i);
  for (const S of g.values()) {
    const A = v(S);
    p.has(A) || h.push(S);
  }
  return h;
}
function Lw(r) {
  return /^https?:\/\//i.test(r);
}
function kr(r) {
  return r ? Lw(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${Q_}${r}` : r : "";
}
function Ow(r) {
  return r ? r.endsWith("/stream") ? kr(r) : kr(`${r.replace(/\/$/, "")}/stream`) : "";
}
function zw(r) {
  return r ? r.endsWith("/stop") ? kr(r) : kr(`${r.replace(/\/$/, "")}/stop`) : "";
}
function sp(r) {
  return r ? r.replace(/\/$/, "").replace(/\/(?:stream|stop|suggestions)$/, "").replace(/\/chat$/, "") : "";
}
function Dw(r) {
  if (!r) return "";
  const n = `${sp(r)}/identity/bootstrap`;
  return kr(n);
}
function Fw(r) {
  if (!r) return "";
  const n = `${sp(r)}/threads/messages`;
  return kr(n);
}
function Bw(r) {
  return /<html[\s>]/i.test(r || "") && /powered-by:\s*Shopify|cdn\/shop|shopify-section/i.test(r || "");
}
async function Uw(r) {
  const n = `Proxy returned ${r.status}`, i = r.headers.get("content-type") || "", a = r.clone();
  if (i.includes("application/json"))
    try {
      const d = await r.json();
      return d?.error || d?.message || n;
    } catch {
    }
  let u = "";
  try {
    u = await a.text();
  } catch {
  }
  return Bw(u) ? "AskCrystal proxy is not connected. Shopify is serving the storefront page for /apps/askcrystal instead of forwarding the request to the app proxy." : n;
}
function $w() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  const r = Cl(El);
  if (r) return r;
  const n = Gn("session");
  return no(El, n), n;
}
function Hw(r) {
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
    const h = [];
    if (u.split(`
`).forEach((p) => {
      p.startsWith("event:") && (d = p.slice(6).trim() || d), p.startsWith("data:") && h.push(p.slice(5).trim());
    }), !!h.length)
      try {
        n.push({
          event: d,
          payload: JSON.parse(h.join(`
`))
        });
      } catch {
      }
  }
  return { events: n, remaining: i };
}
function ys(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function Rl(r) {
  const n = r?.messageId || r?.message_id || r?.data?.messageId || r?.data?.message_id;
  return typeof n == "string" ? n : "";
}
function Vw(r) {
  const n = r?.event || r?.data?.event;
  return typeof n == "string" ? n : "";
}
function Ww(r) {
  if (typeof r?.tool == "string" && r.tool) return r.tool;
  if (typeof r?.tool_name == "string" && r.tool_name) return r.tool_name;
  if (r?.tool_labels && typeof r.tool_labels == "object") {
    const n = Object.values(r.tool_labels).find((i) => typeof i == "string" && i);
    if (typeof n == "string") return n;
  }
  return "";
}
function ip(r) {
  if (!r || typeof r != "object") return null;
  const n = typeof r.thought == "string" ? r.thought.trim() : typeof r.data?.thought == "string" ? r.data.thought.trim() : "", i = Ww(r).trim(), a = typeof r.tool_input == "string" ? r.tool_input : typeof r.toolInput == "string" ? r.toolInput : typeof r.data?.tool_input == "string" ? r.data.tool_input : "", u = typeof r.observation == "string" ? r.observation : typeof r.data?.observation == "string" ? r.data.observation : "";
  if (!n && !i && !a && !u) return null;
  const d = Rl(r), h = ys(r), p = Number.isFinite(Number(r.position)) ? Number(r.position) : null;
  return {
    id: typeof r.id == "string" && r.id ? r.id : `${d || h || "thought"}:${p ?? 0}`,
    position: p,
    thought: n,
    tool: i,
    toolInput: a,
    observation: u,
    messageId: d,
    taskId: h,
    sourceEvent: typeof r.sourceEvent == "string" ? r.sourceEvent : Vw(r)
  };
}
function ro(r) {
  return Array.isArray(r) ? r.map(ip).filter(Boolean) : [];
}
function op(r, n) {
  const i = ip(n);
  if (!i) return ro(r);
  const a = ro(r), u = a.findIndex((d) => !!(d.id && i.id && d.id === i.id || d.position !== null && i.position !== null && d.position === i.position));
  return u >= 0 ? (a[u] = {
    ...a[u],
    ...i,
    thought: i.thought || a[u].thought,
    toolInput: i.toolInput || a[u].toolInput,
    observation: i.observation || a[u].observation
  }, a) : [...a, i];
}
function Yw() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function $t(r) {
  if (r?.aborted)
    throw Yw();
}
async function Gw({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a, storefrontSessionId: u }) {
  if (!(!r || !n))
    try {
      await fetch(zw(r), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskId: n,
          sessionId: i,
          conversationId: a,
          storefrontSessionId: u
        }),
        keepalive: !0
      });
    } catch (d) {
      console.error("[AskCrystal] Stop request failed.", d);
    }
}
async function qw({ apiEndpoint: r, sessionId: n }) {
  if (!r || !n) return null;
  try {
    const i = new URL(Dw(r), window.location.origin);
    i.searchParams.set("guestToken", n);
    const a = await fetch(i.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    return a.ok ? await a.json() : null;
  } catch (i) {
    return console.error("[AskCrystal] Identity bootstrap failed.", i), null;
  }
}
async function Qw({ apiEndpoint: r, sessionId: n, storefrontSessionId: i }) {
  if (!r || !n || !i) return null;
  try {
    const a = new URL(Fw(r), window.location.origin);
    a.searchParams.set("guestToken", n), a.searchParams.set("storefrontSessionId", i);
    const u = await fetch(a.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store"
    });
    return u.ok ? await u.json() : null;
  } catch {
    return null;
  }
}
async function Kw({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: h, onThought: p, onDelta: g, onComponents: v }) {
  $t(i);
  const E = await fetch(Ow(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: Kl(n),
      conversationId: a,
      sessionId: u,
      storefrontSessionId: d
    }),
    signal: i
  });
  if (!E.ok)
    throw new Error(await Uw(E));
  if (!E.body)
    throw new Error("The proxy did not return a readable stream.");
  const b = E.body.getReader(), S = new TextDecoder();
  let A = "", N = "", L = "", D = [], V = [], K = a || null;
  for (; ; ) {
    $t(i);
    const { done: F, value: se } = await b.read();
    if (F) break;
    $t(i), A += S.decode(se, { stream: !0 });
    const he = Hw(A);
    A = he.remaining;
    for (const U of he.events) {
      if ($t(i), U.event === "status" && typeof U.payload?.message == "string" && ($t(i), h?.(U.payload)), U.event === "thought" && ($t(i), D = op(D, U.payload), p?.(U.payload), K = U.payload?.conversationId || U.payload?.conversation_id || K), U.event === "error")
        throw new Error(U.payload?.error || U.payload?.message || "The proxy stream failed.");
      const ie = Yl(U.payload);
      if (ie.length && ($t(i), V = Wn(V, ie), v?.(V, ie, U.payload), K = U.payload?.conversationId || U.payload?.conversation_id || K), U.event === "replace") {
        $t(i);
        const Q = pl(U.payload);
        if (Q) {
          N = Q;
          const le = gl(N);
          if (le) {
            const ge = L;
            L = le, le !== ge && g?.("", le, U.payload);
          }
        }
        K = U.payload?.conversationId || U.payload?.conversation_id || K;
      }
      if (["delta", "message", "agent_message"].includes(U.event)) {
        $t(i);
        const Q = pl(U.payload);
        if (Q) {
          N += Q;
          const le = gl(N);
          if (le) {
            const ge = L;
            if (L = le, le !== ge) {
              const Ee = le.startsWith(ge) ? le.slice(ge.length) : le;
              g?.(Ee, le, U.payload);
            }
          }
        }
        K = U.payload?.conversationId || U.payload?.conversation_id || K;
      }
      if (U.event === "complete") {
        $t(i);
        const Q = pl(U.payload) || N, ge = gl(Q) || L || L;
        if (!Q && !ge && D.length > 0)
          return {
            answer: "",
            components: V,
            sourceText: "",
            suggestions: [],
            conversationId: U.payload?.conversationId || U.payload?.conversation_id || K || null,
            messageId: Rl(U.payload) || null,
            thoughts: D
          };
        const Ee = Il(Q || ge, V), ye = Gt(Ee.suggestions || []);
        return {
          answer: Ee.answer,
          components: Ee.components,
          sourceText: Ee.sourceText,
          suggestions: ye,
          conversationId: U.payload?.conversationId || U.payload?.conversation_id || K || null,
          messageId: Rl(U.payload) || null,
          thoughts: D
        };
      }
    }
  }
  if (L || V.length > 0) {
    const F = Il(L, V);
    return {
      answer: F.answer,
      components: F.components,
      sourceText: F.sourceText,
      suggestions: F.suggestions || [],
      conversationId: K,
      messageId: null,
      thoughts: D
    };
  }
  if (D.length > 0)
    return {
      answer: "",
      components: [],
      sourceText: "",
      suggestions: [],
      conversationId: K,
      messageId: null,
      thoughts: D
    };
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function Gn(r = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${r}-${crypto.randomUUID()}` : (bf += 1, `${r}-${Date.now()}-${bf}`);
}
function Jw(r) {
  return {
    id: Gn("user"),
    role: "user",
    createdAt: /* @__PURE__ */ new Date(),
    content: r.content || [],
    attachments: r.attachments || [],
    metadata: r.metadata || {
      custom: {}
    }
  };
}
function Ht({
  id: r = Gn("assistant"),
  text: n = "",
  parts: i = null,
  components: a = [],
  status: u,
  error: d,
  statusText: h = "",
  statusStage: p = "",
  statusTool: g = "",
  statusHistory: v = [],
  ambientStatusText: E = "",
  statusElapsedMs: b = null,
  thoughts: S = []
}) {
  const A = Ql(v).join(`
`), N = Number(b), L = ro(S), D = pS(
    L,
    u?.type === "running"
  );
  return {
    id: r,
    role: "assistant",
    createdAt: /* @__PURE__ */ new Date(),
    content: Array.isArray(i) ? i : Cn({ text: n, components: a }),
    status: u,
    metadata: {
      unstable_state: null,
      unstable_annotations: [],
      unstable_data: a,
      steps: [],
      custom: {
        ...d ? { error: d } : {},
        ...h ? { statusText: h } : {},
        ...p ? { statusStage: p } : {},
        ...g ? { statusTool: g } : {},
        ...A ? { statusHistoryText: A } : {},
        ...E ? { ambientStatusText: E } : {},
        ...Number.isFinite(N) ? { statusElapsedMs: Math.max(0, N) } : {},
        ...D.length ? { difyProgressEntries: D } : {}
      }
    }
  };
}
function vl(r) {
  return String(r || "").replace(/\s+/g, " ").trim();
}
function Mf(r) {
  if (!Array.isArray(r) || r.length === 0) return "";
  const n = (() => {
    for (let i = r.length - 1; i >= 0; i -= 1) {
      const a = r[i];
      if (a?.role === "assistant" && (a.status?.type === "running" || a.status?.type === "incomplete" && a.status?.reason !== "cancelled"))
        return i;
    }
    return -1;
  })();
  if (n === -1) return "";
  for (let i = n - 1; i >= 0; i -= 1) {
    const a = r[i];
    if (a?.role !== "user") continue;
    const u = Mt(a.content || a.parts || []);
    if (u) return u;
  }
  return "";
}
function Xw(r) {
  const n = typeof r?.text == "string" ? r.text : "";
  return {
    id: typeof r?.id == "string" && r.id ? r.id : Gn("user"),
    role: "user",
    createdAt: r?.createdAt ? new Date(r.createdAt) : /* @__PURE__ */ new Date(),
    content: n ? [{ type: "text", text: n }] : [],
    attachments: [],
    metadata: {
      custom: {
        source: "server-recovery"
      }
    }
  };
}
function Zw(r) {
  const n = Array.isArray(r?.components) ? r.components : [];
  return Ht({
    id: typeof r?.id == "string" && r.id ? r.id : Gn("assistant"),
    text: typeof r?.text == "string" ? r.text : "",
    components: n,
    status: {
      type: "complete",
      reason: "stop"
    }
  });
}
function eS(r, n) {
  const i = Array.isArray(r?.messages) ? r.messages : [], a = vl(n);
  if (!a || i.length === 0) return null;
  let u = -1, d = -1;
  for (let b = i.length - 1; b >= 0; b -= 1) {
    const S = i[b];
    if (S?.role !== "user" || vl(S.text) !== a) continue;
    const A = i.findIndex(
      (N, L) => L > b && N?.role === "assistant" && (vl(N.text) || Array.isArray(N.components) && N.components.length > 0)
    );
    if (A !== -1) {
      u = b, d = A;
      break;
    }
  }
  if (u === -1 || d === -1) return null;
  const h = i.map((b) => b?.role === "user" ? Xw(b) : b?.role === "assistant" ? Zw(b) : null).filter(Boolean), p = i[d], g = Il(p?.text || "", p?.components || []), v = Gt(p?.suggestions || []), E = v.length ? v : Gt(g.suggestions || []);
  return {
    messages: h,
    suggestions: E,
    suggestionsMessageId: h[d]?.id || "",
    conversationId: r?.thread?.conversationId || null
  };
}
function tS(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Ql(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((h) => h !== a);
  return d.push(a), d.slice(-4);
}
function Al({ id: r, text: n = "", components: i = [], thoughts: a = [] }) {
  const d = !!(typeof n == "string" ? n.trim() : "") || i.length > 0;
  return Ht({
    id: r,
    parts: Cn({
      text: d ? n : "Reply stopped.",
      components: i
    }),
    components: i,
    status: {
      type: "incomplete",
      reason: "cancelled"
    },
    statusText: "",
    statusStage: "",
    statusTool: "",
    thoughts: a
  });
}
function Nf(r, n) {
  if (!Array.isArray(r) || !n || r.length === 0)
    return Array.isArray(r) ? [...r] : [];
  const i = [...r], a = i[i.length - 1];
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = Al({
    id: a.id,
    text: Mt(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function nS({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: h, onThought: p, onDelta: g, onComponents: v }) {
  const E = Kl(n);
  if (r.runtimeMode === "proxy" && r.apiEndpoint)
    try {
      return await Kw({
        apiEndpoint: r.apiEndpoint,
        messages: n,
        abortSignal: i,
        conversationId: a,
        sessionId: u,
        storefrontSessionId: d,
        onStatus: h,
        onThought: p,
        onDelta: g,
        onComponents: v
      });
    } catch (S) {
      throw S?.name === "AbortError" || console.error("[AskCrystal] Proxy runtime failed.", S), S;
    }
  const b = Pw(E, r.products);
  return {
    answer: b.answer,
    components: b.components || [],
    suggestions: [],
    sourceText: b.answer,
    conversationId: a,
    messageId: null
  };
}
function rS(r) {
  const n = k.useMemo(() => dw(), []), i = ml(n.sessions, n.activeSessionId) || n.sessions[0], [a, u] = k.useState(n.sessions), [d, h] = k.useState(i.id), [p, g] = k.useState(i.messages), [v, E] = k.useState(i.suggestions), [b, S] = k.useState(i.suggestionsMessageId || ""), [A, N] = k.useState(!1), L = k.useRef(null), D = k.useRef(""), V = k.useRef(""), K = k.useRef(!1), F = k.useRef(i.conversationId || null), se = k.useRef(p), he = k.useRef(a), U = k.useRef(d), ie = k.useRef(A), Q = k.useRef($w());
  k.useEffect(() => {
    if (r.runtimeMode !== "proxy" || !r.apiEndpoint) return;
    let M = !1;
    return qw({
      apiEndpoint: r.apiEndpoint,
      sessionId: Q.current
    }).then((w) => {
      if (M || !w?.ok) return;
      const R = typeof w.identity?.guestToken == "string" ? w.identity.guestToken.trim() : "";
      R && R !== Q.current && (Q.current = R, no(El, R));
    }), () => {
      M = !0;
    };
  }, [r.apiEndpoint, r.runtimeMode]), k.useEffect(() => {
    se.current = p;
  }, [p]), k.useEffect(() => {
    he.current = a;
  }, [a]), k.useEffect(() => {
    U.current = d;
  }, [d]), k.useEffect(() => {
    ie.current = A;
  }, [A]), k.useEffect(() => {
    u((M) => Tf(M, d, {
      messages: Nf(p, K.current),
      suggestions: v,
      suggestionsMessageId: b,
      conversationId: F.current,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }, [d, p, v, b]), k.useEffect(() => {
    fw({
      sessions: a,
      activeSessionId: d
    }), hw({
      sessions: a,
      activeSessionId: d,
      isRunning: A
    });
  }, [d, A, a]);
  const le = k.useCallback((M) => {
    M && (F.current = M.conversationId || null, K.current = !1, V.current = "", h(M.id), g(fo(M.messages)), E(Gt(M.suggestions)), S(M.suggestionsMessageId || ""));
  }, []), ge = k.useCallback((M) => {
    if (!M || ie.current)
      return;
    if (M === U.current) {
      Hi();
      return;
    }
    const w = ml(he.current, M);
    if (!w) return;
    const R = {
      ...w,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    u((H) => Tf(H, M, {
      updatedAt: R.updatedAt
    })), le(R), Hi();
  }, [le]), Ee = k.useCallback(() => {
    if (ie.current) return;
    const M = Cs();
    u(
      (w) => Er([M, ...w]).slice(0, co)
    ), le(M), Hi();
  }, [le]), ye = k.useCallback((M) => {
    if (!M || ie.current) return;
    const w = Er(
      he.current.filter((re) => re.id !== M)
    ), R = w.length > 0 ? w : [Cs()], H = M === U.current, ne = ml(R, U.current) || R[0];
    u(R), (H || ne.id !== U.current) && le(ne), Hi();
  }, [le]);
  k.useEffect(() => {
    if (typeof window > "u") return;
    const M = (H) => {
      ge(H.detail?.sessionId || "");
    }, w = () => {
      Ee();
    }, R = (H) => {
      ye(H.detail?.sessionId || "");
    };
    return window.addEventListener(xf, M), window.addEventListener(Ef, w), window.addEventListener(kf, R), () => {
      window.removeEventListener(xf, M), window.removeEventListener(Ef, w), window.removeEventListener(kf, R);
    };
  }, [Ee, ye, ge]);
  const be = k.useCallback((M) => {
    g(Nf(M, K.current));
  }, []), Ce = k.useCallback((M, w) => {
    g(
      (R) => R.map((H) => H.id !== M ? H : w(H))
    );
  }, []), He = k.useCallback(async ({ expectedPrompt: M = "", poll: w = !1 } = {}) => {
    if (r.runtimeMode !== "proxy" || !r.apiEndpoint) return !1;
    const R = U.current, H = M || Mf(se.current);
    if (!H || !R) return !1;
    const ne = Date.now() + (w ? 75e3 : 0);
    do {
      const re = await Qw({
        apiEndpoint: r.apiEndpoint,
        sessionId: Q.current,
        storefrontSessionId: R
      }), ee = eS(re, H);
      if (ee)
        return U.current !== R ? !1 : (F.current = ee.conversationId || F.current, K.current = !1, V.current = "", D.current = "", L.current = null, ie.current = !1, N(!1), g(ee.messages), E(ee.suggestions), S(ee.suggestions.length ? ee.suggestionsMessageId : ""), !0);
      if (!w || Date.now() >= ne) break;
      await new Promise((ue) => setTimeout(ue, 2e3));
    } while (!0);
    return !1;
  }, [r.apiEndpoint, r.runtimeMode]);
  k.useEffect(() => {
    if (typeof window > "u") return;
    let M = !1;
    const w = () => {
      if (M || document.visibilityState && document.visibilityState !== "visible") return;
      const H = Mf(se.current);
      H && He({
        expectedPrompt: H,
        poll: !1
      });
    }, R = window.setTimeout(w, 800);
    return window.addEventListener("focus", w), window.addEventListener("pageshow", w), document.addEventListener("visibilitychange", w), () => {
      M = !0, window.clearTimeout(R), window.removeEventListener("focus", w), window.removeEventListener("pageshow", w), document.removeEventListener("visibilitychange", w);
    };
  }, [He]);
  const Pe = k.useCallback(async () => {
    const M = L.current, w = D.current, R = V.current, H = F.current, ne = Q.current, re = U.current;
    M?.abort(), K.current = !0, ie.current = !1, N(!1), E([]), S(""), w && Ce(
      w,
      (ee) => Al({
        id: ee.id,
        text: Mt(ee.content || []),
        components: ee.metadata?.unstable_data || []
      })
    ), !(!R || !r.apiEndpoint) && await Gw({
      apiEndpoint: r.apiEndpoint,
      taskId: R,
      sessionId: ne,
      conversationId: H,
      storefrontSessionId: re
    });
  }, [r.apiEndpoint, Ce]), ve = k.useCallback(
    async (M) => {
      if (M.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      if (Qh(r) === "home") {
        const ae = Mt(M.content || []);
        if (ow(r, ae))
          return;
      }
      const w = Jw(M), R = Gn("assistant"), H = new AbortController(), ne = Ht({
        id: R,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy...",
        statusElapsedMs: 0
      }), re = [...se.current, w];
      L.current = H, D.current = R, V.current = "", K.current = !1, ie.current = !0, N(!0), E([]), S(""), g([...re, ne]);
      let ee = "", ue = [], oe = [];
      try {
        const ae = await nS({
          config: r,
          messages: re,
          abortSignal: H.signal,
          conversationId: F.current,
          sessionId: Q.current,
          storefrontSessionId: U.current,
          onStatus: (wt) => {
            if (H.signal.aborted) return;
            const Le = Mw(wt);
            Le.taskId && (V.current = Le.taskId), Ce(R, (Fe) => {
              const Je = Mt(Fe.content || Fe.parts || []), St = Array.isArray(Fe.metadata?.unstable_data) ? Fe.metadata.unstable_data : [], xt = St.length ? St : oe, ht = !!(Je.trim() || xt.length || ue.length);
              return Ht({
                id: R,
                parts: Cn({
                  text: Je,
                  components: xt
                }),
                components: xt,
                status: {
                  type: "running"
                },
                thoughts: ue,
                statusText: ht ? "" : Le.message,
                statusStage: ht ? "" : Le.stage,
                statusTool: ht ? "" : Le.tool,
                statusHistory: ht ? [] : tS(Fe.metadata?.custom?.statusHistoryText, Le),
                ambientStatusText: ht ? "" : Le.stage === "tool" ? Fe.metadata?.custom?.ambientStatusText || "Settling into your energy..." : Le.message,
                statusElapsedMs: ht ? null : Le.elapsedMs
              });
            });
          },
          onThought: (wt) => {
            if (H.signal.aborted) return;
            const Le = ys(wt);
            Le && (V.current = Le), ue = op(ue, wt), Ce(R, (Fe) => {
              const Je = Array.isArray(Fe.metadata?.unstable_data) ? Fe.metadata.unstable_data : [], St = Je.length ? Je : oe, xt = Mt(Fe.content || Fe.parts || []) || ee;
              return Ht({
                id: R,
                parts: Cn({
                  text: xt,
                  components: St
                }),
                components: St,
                status: {
                  type: "running"
                },
                thoughts: ue,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: []
              });
            });
          },
          onDelta: (wt, Le, Fe) => {
            if (H.signal.aborted) return;
            const Je = ys(Fe);
            Je && (V.current = Je), ee = Le, Ce(
              R,
              () => Ht({
                id: R,
                parts: Cn({
                  text: Le,
                  components: oe
                }),
                components: oe,
                status: {
                  type: "running"
                },
                thoughts: ue,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: []
              })
            );
          },
          onComponents: (wt, Le, Fe) => {
            if (H.signal.aborted) return;
            const Je = ys(Fe);
            Je && (V.current = Je), oe = wt, Ce(R, (St) => {
              const xt = Mt(St.content || St.parts || []) || ee;
              return Ht({
                id: R,
                parts: Cn({
                  text: xt,
                  components: oe
                }),
                components: oe,
                status: {
                  type: "running"
                },
                thoughts: ue,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: []
              });
            });
          }
        });
        F.current = ae.conversationId || F.current, V.current = "", K.current = !1;
        const De = ae.components?.length ? ae.components : oe, Tn = Array.isArray(ae.thoughts) && ae.thoughts.length ? ae.thoughts : ue, on = Gt(ae.suggestions || []), qn = ae.answer || ee || ae.sourceText || "";
        g([
          ...re,
          Ht({
            id: R,
            parts: Cn({
              text: qn,
              components: De
            }),
            components: De,
            status: {
              type: "complete",
              reason: "stop"
            },
            thoughts: Tn
          })
        ]), E(on), S(on.length ? R : "");
      } catch (ae) {
        const De = K.current || H.signal.aborted;
        if (ae?.name === "AbortError" && De) {
          V.current = "", E([]), S(""), g([
            ...re,
            Al({
              id: R,
              text: ee,
              components: oe,
              thoughts: ue
            })
          ]);
          return;
        }
        if (console.error("[AskCrystal] Assistant runtime failed.", ae), Ce(
          R,
          (on) => Ht({
            id: R,
            parts: Cn({
              text: Mt(on.content || on.parts || []) || ee,
              components: oe
            }),
            components: oe,
            status: {
              type: "running"
            },
            thoughts: ue,
            statusText: "Reconnecting to your reading...",
            statusStage: "recover",
            ambientStatusText: "Reconnecting to your reading..."
          })
        ), await He({
          expectedPrompt: Kl(re),
          poll: !0
        })) return;
        V.current = "", K.current = !1, E([]), S(""), g([
          ...re,
          Ht({
            id: R,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: ae?.message || "Unknown runtime error"
            },
            error: ae?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        L.current === H && (L.current = null), D.current === R && (D.current = ""), V.current && H.signal.aborted && (V.current = ""), ie.current = !1, N(!1);
      }
    },
    [r, He, Ce]
  ), B = k.useCallback((M) => {
    const w = typeof M == "string" ? M.trim() : "";
    !w || ie.current || ve({
      role: "user",
      content: [
        {
          type: "text",
          text: w
        }
      ],
      metadata: {
        custom: {
          source: "suggestion"
        }
      }
    });
  }, [ve]), Z = k.useMemo(
    () => ({
      messages: p,
      suggestions: v,
      suggestionsMessageId: b,
      isRunning: A,
      setMessages: be,
      onImport: be,
      onNew: ve,
      onCancel: Pe,
      adapters: {
        threadList: {
          threadId: d || q_,
          threads: ep(a).map((M) => ({
            id: M.id,
            remoteId: M.id,
            title: M.title
          }))
        }
      }
    }),
    [d, A, p, Pe, ve, be, a, v, b]
  );
  return {
    runtime: oy(Z),
    hasUserMessages: p.some((M) => M.role === "user"),
    activeSessionId: d,
    sendPrompt: B,
    onCancel: Pe,
    isRunning: A
  };
}
function sS({ product: r }) {
  return /* @__PURE__ */ m.jsxs("a", { className: "ac-homepage__product-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-media", children: r.image ? /* @__PURE__ */ m.jsx("img", { src: r.image, alt: r.title, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__product-meta", children: r.badge || "Bestseller" }),
      /* @__PURE__ */ m.jsx("h3", { children: r.title }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__product-link", children: "View product" })
    ] })
  ] });
}
function iS({ config: r }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-shelf", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__guide-shelf-header", children: /* @__PURE__ */ m.jsxs("div", { children: [
      "wa          ",
      /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
      /* @__PURE__ */ m.jsx("h2", { children: r.shelfHeading })
    ] }) }),
    r.products.length ? /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ m.jsx(sS, { product: n }, n.id)) }) : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
  ] });
}
function Pf({ card: r }) {
  const { sendPrompt: n, isRunning: i } = Wh(), a = [
    "ac-homepage__guide-card",
    r.layout ? `ac-homepage__guide-card--${r.layout}` : "",
    r.emblemUrl ? "ac-homepage__guide-card--has-emblem" : ""
  ].filter(Boolean).join(" "), u = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    r.emblemUrl ? /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__guide-card-emblem", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("img", { src: r.emblemUrl, alt: "", loading: "lazy", decoding: "async" }) }) : null,
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-card-copy", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__guide-card-eyebrow", children: r.eyebrow }),
      /* @__PURE__ */ m.jsx("h3", { children: r.title }),
      /* @__PURE__ */ m.jsx("p", { children: r.description })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-card-footer", children: [
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-card-action", children: r.cta }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-card-arrow", "aria-hidden": "true", children: "→" })
    ] })
  ] });
  return r.prompt ? /* @__PURE__ */ m.jsx(
    "button",
    {
      type: "button",
      className: a,
      disabled: i,
      onClick: () => n(r.prompt),
      children: u
    }
  ) : /* @__PURE__ */ m.jsx("a", { className: a, href: r.href, children: u });
}
function oS({ config: r }) {
  const n = typeof r.headingLine1 == "string" ? r.headingLine1.trim() : "", i = typeof r.headingLine2Prefix == "string" ? r.headingLine2Prefix.trim() : "", a = typeof r.headingAccent == "string" ? r.headingAccent.trim() : "", u = typeof r.headingSuffix == "string" ? r.headingSuffix.trim() : "", d = a && u.toLowerCase().startsWith(`${a.toLowerCase()} `) ? u.slice(a.length).trimStart() : u, h = !!(n || i || a || d), p = [n, i].filter(Boolean).join(" "), g = (b, S) => {
    if (!b) return null;
    const A = Array.from(b.matchAll(/\byou\b/gi));
    if (!A.length)
      return b;
    const N = [];
    let L = 0;
    return A.forEach((D, V) => {
      const K = D.index ?? 0;
      K > L && N.push(
        /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-copy", children: b.slice(L, K) }, `${S}-copy-${V}`)
      ), N.push(
        /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-accent", children: D[0] }, `${S}-accent-${V}`)
      ), L = K + D[0].length;
    }), L < b.length && N.push(
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-copy", children: b.slice(L) }, `${S}-copy-tail`)
    ), N;
  }, v = [
    {
      id: "yinyuan",
      layout: "portrait",
      eyebrow: "Yinyuan",
      title: "Read love and synastry",
      description: "Explore soulmate, synastry, and relationship guidance.",
      cta: "Cosmic Match",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421",
      prompt: "Do a Yinyuan relationship reading. Ask me what relationship context you need."
    },
    {
      id: "tarot",
      layout: "portrait",
      eyebrow: "Tarot",
      title: "Pull a focused spread",
      description: "Ask about a decision, relationship, block, or next step.",
      cta: "Open tarot",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421",
      prompt: "I want a tarot spread for a question I am holding. Ask me for the question first."
    },
    {
      id: "horoscope",
      layout: "wide",
      eyebrow: "Horoscope",
      title: "Today’s zodiac weather",
      description: "Get daily sign guidance, timing notes, and crystal support.",
      cta: "Read today",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421",
      prompt: "Give me today's horoscope guidance. Ask for my zodiac sign if you need it."
    },
    {
      id: "ask-anything",
      layout: "wide",
      eyebrow: "Open chat",
      title: "Enter the reading room",
      description: "Open a blank conversation and start with anything when you are ready.",
      cta: "Open chat",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_3.png?v=1777105421",
      href: Kh(r)
    },
    {
      id: "bazi",
      layout: "wide",
      eyebrow: "Bazi",
      title: "Four Pillars birth chart",
      description: "Read elemental balance, timing, and life patterns from birth details.",
      cta: "Start Bazi",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421",
      prompt: "I want a Bazi Four Pillars reading. Ask me for the birth details you need."
    },
    {
      id: "fengshui",
      layout: "wide",
      eyebrow: "Feng shui",
      title: "Space energy audit",
      description: "Read a room layout for flow, blocked areas, and practical placement shifts.",
      cta: "Audit my room",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_5.png?v=1777105421",
      prompt: "Audit the feng shui of my room. Ask me for the room layout details you need."
    },
    {
      id: "shushu",
      layout: "compact",
      eyebrow: "Numerology",
      title: "Shushu number profile",
      description: "Use birth numbers for personality themes, cycles, and current emphasis.",
      cta: "Read numbers",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421",
      prompt: "Create a Shushu numerology profile. Ask me for the birth date if you need it."
    },
    {
      id: "taibu",
      layout: "compact",
      eyebrow: "Not sure?",
      title: "Choose the right reading",
      description: "Describe the situation and AskCrystal will choose the cleanest divination path.",
      cta: "Help me choose",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421",
      prompt: "Help me choose the right reading method for my situation."
    },
    {
      id: "crystal-match",
      layout: "wide",
      eyebrow: "Crystal match",
      title: "Find one shop piece",
      description: "Turn a feeling, intention, or reading into a grounded jewelry recommendation.",
      cta: "Match me",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_4.png?v=1777105421",
      prompt: "Recommend one crystal jewelry piece from the shop for my current need."
    },
    {
      id: "shop-intention",
      layout: "compact",
      eyebrow: "Shop intent",
      title: "Browse by intention",
      description: "Calm, protection, love, focus, abundance, sleep, or grounding.",
      cta: "Shop intent",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_5.png?v=1777105421",
      prompt: "Help me shop crystals by intention. Ask me which intention I want to focus on."
    },
    {
      id: "care-ritual",
      layout: "compact",
      eyebrow: "Ritual",
      title: "Crystal care practice",
      description: "Learn a simple way to cleanse, charge, wear, or place a stone.",
      cta: "Create ritual",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421",
      prompt: "Teach me a simple crystal care ritual for a stone I own."
    }
  ], E = {
    id: "store-help",
    layout: "strip",
    eyebrow: "Store help",
    title: "Product, policy, and cart questions",
    description: "Ask about a product, compare options, or check shop guidance.",
    cta: "Ask store",
    emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421",
    prompt: "I have a store or product question. Help me find the answer."
  };
  return /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__welcome", children: /* @__PURE__ */ m.jsxs("section", { className: "ac-homepage__guide", "aria-label": "Guided AskCrystal paths", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-header", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__guide-kicker", children: r.eyebrow }),
      /* @__PURE__ */ m.jsx("h1", { className: "ac-homepage__guide-title", children: h ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        p ? /* @__PURE__ */ m.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          p,
          a || d ? " " : ""
        ] }) : null,
        a ? /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-accent", children: a }) : null,
        d ? /* @__PURE__ */ m.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          p || a ? " " : "",
          g(d, "heading-suffix")
        ] }) : null
      ] }) : r.heading })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-grid", children: [
      v.map((b) => /* @__PURE__ */ m.jsx(Pf, { card: b }, b.id)),
      /* @__PURE__ */ m.jsx(iS, { config: r }),
      /* @__PURE__ */ m.jsx(Pf, { card: E })
    ] })
  ] }) });
}
function aS() {
  const r = k.useRef(null), [n, i] = k.useState(!1), a = k.useCallback(() => {
    const u = r.current;
    if (!u) {
      i(!1);
      return;
    }
    const d = u.scrollHeight > u.clientHeight + 2;
    i((h) => h === d ? h : d);
  }, []);
  return k.useEffect(() => {
    const u = window.requestAnimationFrame(a);
    return () => window.cancelAnimationFrame(u);
  }, [a]), /* @__PURE__ */ m.jsx(kh, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ m.jsx(
          Ch,
          {
            ref: r,
            className: "ac-homepage__composer-input",
            placeholder: "ask me anything",
            minRows: 1,
            maxRows: X_,
            autoFocus: !1,
            onChange: () => {
              window.requestAnimationFrame(a);
            },
            onHeightChange: () => {
              window.requestAnimationFrame(a);
            }
          }
        ),
        /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__composer-actions", children: [
          /* @__PURE__ */ m.jsx(Sl, { running: !1, children: /* @__PURE__ */ m.jsx(Uv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ m.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ m.jsx(Sl, { running: !0, children: /* @__PURE__ */ m.jsx(o_, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function lS() {
  return typeof document > "u" ? null : pg.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ m.jsx(aS, {}) }),
    document.body
  );
}
function uS() {
  return /* @__PURE__ */ m.jsx(Hl, { className: "ac-message ac-message--user", children: /* @__PURE__ */ m.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ m.jsx(Vl, {}) }) });
}
function cS() {
  const { sendPrompt: r, isRunning: n } = Wh(), i = At((p) => p.id || ""), a = At((p) => p.status?.type === "complete"), u = xe(({ thread: p }) => p.suggestions || Uh), d = xe(({ thread: p }) => p.isRunning), h = xe(({ thread: p }) => {
    for (let g = p.messages.length - 1; g >= 0; g -= 1) {
      const v = p.messages[g];
      if (v?.role === "assistant")
        return v.id === i;
    }
    return !1;
  });
  return !a || d || !h || !u.length ? null : /* @__PURE__ */ m.jsx("div", { className: "ac-message__suggestions", "aria-label": "Suggested follow-up prompts", children: u.map((p, g) => /* @__PURE__ */ m.jsx(
    "button",
    {
      type: "button",
      className: "ac-message__suggestion",
      disabled: d || n,
      onClick: () => r(p.prompt),
      children: p.prompt
    },
    `${i}-suggestion-${g}-${p.prompt}`
  )) });
}
function dS(r = "") {
  if (typeof r != "string" || !r.trim()) return "";
  try {
    const n = JSON.parse(r);
    if (Array.isArray(n))
      return n.map((i) => typeof i == "string" ? i : "").filter(Boolean).join(", ");
  } catch {
  }
  return r;
}
const jf = [
  "Settling into the shape of your question...",
  "Listening for the clearest thread...",
  "Letting the reading gather itself...",
  "Bringing the guidance into plain language..."
];
function Ml(r = "") {
  return String(r).toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}
function fS(r = "", n = "") {
  const i = Ml(r), a = Ml(`${r} ${n}`);
  return /search catalog|catalog|collection|product search|shopify search/.test(a) ? "Checking the crystal shelf..." : /get product details|product details|variant|inventory|price/.test(a) ? "Verifying the strongest match..." : /cart|checkout|update cart|get cart/.test(a) ? /update/.test(i) ? "Preparing the cart update..." : "Opening your cart..." : /policy|faq|shipping|return|store question/.test(a) ? "Checking the store guidance..." : /horoscope|zodiac|astrology|planet|daily guidance|star/.test(a) ? "Reading the sky pattern..." : /bazi|four pillars|day master|heavenly stem|earthly branch/.test(a) ? "Mapping the elemental chart..." : /tarot|spread|card/.test(a) ? "Laying out the spread..." : /fengshui|feng shui|space audit|room|placement/.test(a) ? "Reading the room’s flow..." : /yinyuan|matchmaking|relationship|compatib|connection/.test(a) ? "Tracing the connection pattern..." : /numerology|shushu|number profile/.test(a) ? "Reducing the numbers..." : /taibu|router|structured divination|route/.test(a) ? "Choosing the clearest reading path..." : /crystal|stone|chakra|ritual|intention|energy/.test(a) ? "Matching the energy to a crystal..." : r ? "Consulting the right tool..." : "";
}
function hS(r, n = 0) {
  const i = dS(r?.tool || ""), a = [
    r?.thought,
    r?.toolInput,
    r?.observation
  ].filter(Boolean).join(" "), u = fS(i, a);
  if (u) return u;
  const d = Ml(a);
  return /search|look up|find|catalog|product|shop|store|inventory/.test(d) ? "Checking the crystal shelf..." : /chart|zodiac|horoscope|planet|bazi|tarot|feng|numerology|relationship|compatib/.test(d) ? "Reading the pattern..." : /recommend|guidance|answer|respond|final|compose/.test(d) ? "Bringing the guidance into focus..." : /tool|workflow|call|input|observation/.test(d) ? "Consulting the right tool..." : jf[n % jf.length];
}
function pS(r = [], n = !1) {
  const i = ro(r), a = /* @__PURE__ */ new Map();
  i.forEach((d, h) => {
    const p = hS(d, h);
    if (!p) return;
    const g = `${p}:${d.tool || ""}`, v = a.get(g), E = !!d.observation || !n && h < i.length - 1;
    a.set(g, {
      id: d.id || g,
      label: p,
      isFinished: v?.isFinished || E,
      order: v?.order ?? h
    });
  });
  const u = Array.from(a.values()).sort((d, h) => d.order - h.order);
  return u.length ? u.map((d, h) => {
    const p = n && h === u.length - 1 && !d.isFinished;
    return {
      ...d,
      isCurrent: p,
      isFinished: !p && (d.isFinished || h < u.length - 1)
    };
  }) : [];
}
function mS(r, n = 0) {
  if (!r || typeof r != "object") return null;
  const i = typeof r.label == "string" ? r.label.trim() : "";
  return i ? {
    id: typeof r.id == "string" && r.id ? r.id : `${i}:${n}`,
    label: i,
    isCurrent: !!r.isCurrent,
    isFinished: !!r.isFinished,
    order: Number.isFinite(Number(r.order)) ? Number(r.order) : n
  } : null;
}
function gS(r) {
  return Array.isArray(r) ? r.map(mS).filter(Boolean).sort((n, i) => n.order - i.order) : [];
}
function yS({ statusText: r = "" }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-dify-pending", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ m.jsx("span", { className: "ac-dify-pending__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ m.jsx("span", { children: r || "Thinking..." })
  ] });
}
function vS() {
  const r = At((F) => F.content || F.parts || Uh), n = Mt(r), i = r.some((F) => F.type === "tool-call"), a = At((F) => F.status?.type === "running"), u = At((F) => F.metadata?.custom?.statusText || ""), d = At((F) => F.metadata?.custom?.statusStage || ""), h = At((F) => F.metadata?.custom?.statusTool || ""), p = At((F) => F.metadata?.custom?.statusHistoryText || ""), g = At((F) => F.metadata?.custom?.ambientStatusText || ""), v = At((F) => F.metadata?.custom?.statusElapsedMs || 0), E = At((F) => F.metadata?.custom?.difyProgressEntries), b = k.useMemo(() => gS(E), [E]), S = b.length > 0, A = a && !n && !i && !S, N = !!n || i, L = a && !N, D = b.find((F) => F.isCurrent) || b[b.length - 1] || null, V = p || b.map((F) => F.label).join(`
`), K = u || D?.label || "";
  return /* @__PURE__ */ m.jsxs(Hl, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: [
      L ? /* @__PURE__ */ m.jsx(
        Aw,
        {
          statusText: K,
          statusHistoryText: V,
          statusStage: d || (S ? "tool" : "listen"),
          statusTool: h,
          ambientStatusText: g,
          statusElapsedMs: v
        }
      ) : null,
      N ? /* @__PURE__ */ m.jsx("div", { className: "ac-message__content-layer", children: /* @__PURE__ */ m.jsx(
        Vl,
        {
          components: {
            Text: ({ text: F }) => /* @__PURE__ */ m.jsx(tp, { text: F }),
            ...G_
          }
        }
      ) }) : A && !L ? /* @__PURE__ */ m.jsx(yS, { statusText: u }) : null
    ] }),
    /* @__PURE__ */ m.jsx(cS, {}),
    /* @__PURE__ */ m.jsx(xh, { children: /* @__PURE__ */ m.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function _S({ className: r = "" }) {
  const n = ["ac-chat-page__crystal-scene", r].filter(Boolean).join(" ");
  return /* @__PURE__ */ m.jsxs("div", { className: n, "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__crystal-arc ac-chat-page__crystal-arc--left" }),
    /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__crystal-arc ac-chat-page__crystal-arc--right" }),
    /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__crystal-star ac-chat-page__crystal-star--one" }),
    /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__crystal-star ac-chat-page__crystal-star--two" }),
    /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__crystal-star ac-chat-page__crystal-star--three" }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-chat-page__crystal-orb", children: [
      /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__crystal-orb-shine" }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__crystal-orb-star" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-chat-page__crystal-base", children: [
      /* @__PURE__ */ m.jsx("span", {}),
      /* @__PURE__ */ m.jsx("span", {})
    ] })
  ] });
}
function wS() {
  const r = [
    "Bazi",
    "Horoscope",
    "Tarot",
    "Yinyuan",
    "Feng shui",
    "Numerology",
    "Crystal shopping",
    "Ritual care"
  ];
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-chat-page__welcome-card", children: [
    /* @__PURE__ */ m.jsx("p", { className: "ac-chat-page__welcome-kicker", children: "Welcome in" }),
    /* @__PURE__ */ m.jsx("h2", { children: "Ask for a reading, a crystal match, or a practical next step." }),
    /* @__PURE__ */ m.jsx("p", { children: "AskCrystal can read Bazi charts, daily horoscopes, tarot spreads, relationship patterns, feng shui layouts, Shushu numerology, and then connect the guidance to real crystal jewelry and care rituals when shopping is useful." }),
    /* @__PURE__ */ m.jsx("div", { className: "ac-chat-page__welcome-chips", "aria-label": "AskCrystal capabilities", children: r.map((n) => /* @__PURE__ */ m.jsx("span", { children: n }, n)) })
  ] });
}
function SS({ hasUserMessages: r = !1 }) {
  return /* @__PURE__ */ m.jsxs("section", { className: "ac-chat-page__hero", "aria-label": "AskCrystal reading room", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-chat-page__hero-backdrop", "aria-hidden": "true" }),
    /* @__PURE__ */ m.jsx("div", { className: "ac-chat-page__hero-rule", "aria-hidden": "true" }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-chat-page__hero-copy", children: [
      /* @__PURE__ */ m.jsx("h1", { children: "Hi, I’m AskCrystal" }),
      /* @__PURE__ */ m.jsx("p", { children: "Your guide for readings, crystals, rituals, and clarity." })
    ] }),
    r ? null : /* @__PURE__ */ m.jsx(wS, {}),
    /* @__PURE__ */ m.jsx(_S, {})
  ] });
}
function xS({ config: r }) {
  const { runtime: n, hasUserMessages: i, activeSessionId: a, sendPrompt: u, onCancel: d, isRunning: h } = rS(r), p = k.useMemo(() => ({
    sendPrompt: u,
    onCancel: d,
    isRunning: h
  }), [h, d, u]), g = Qh(r), v = g === "chat", E = v && i, b = k.useRef(null), S = k.useRef(null), A = k.useRef(!1), N = k.useRef(!1);
  k.useEffect(() => {
    if (!v || N.current || h) return;
    N.current = !0;
    const D = aw();
    if (!D) return;
    const V = window.setTimeout(() => {
      u(D);
    }, 80);
    return () => window.clearTimeout(V);
  }, [v, h, u]), k.useEffect(() => {
    if (!S.current) return;
    const V = window.requestAnimationFrame(() => {
      if (S.current) {
        if (!E) {
          A.current = !1, S.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        A.current || (A.current = !0, S.current.scrollTo({ top: S.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame(V);
  }, [a, E]), k.useEffect(() => {
    const D = b.current, V = S.current;
    if (!D || !V || typeof window > "u") return;
    const K = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let F = 0, se = Math.max(1, V.clientHeight || 1);
    const he = /* @__PURE__ */ new Map(), U = (ye) => Math.round(ye), ie = (ye) => Math.round(ye * 100) / 100, Q = (ye, be) => {
      he.get(ye) !== be && (he.set(ye, be), D.style.setProperty(ye, be));
    }, le = () => {
      F = 0;
      const ye = V.scrollTop, be = Math.max(280, Math.min(520, se * 0.68)), Ce = Math.max(0, 1 - ye / be);
      if (!v) {
        const Pe = K?.matches ? 0 : Math.min(92, ye * 0.28);
        Q("--ac-homepage-backdrop-offset", `${U(Pe)}px`), Q("--ac-homepage-backdrop-opacity", String(ie(Ce)));
        return;
      }
      const He = K?.matches ? 0 : Math.min(260, ye * 0.34);
      Q("--ac-chat-bg-offset", `${U(He)}px`), Q("--ac-chat-bg-opacity", String(ie(Ce)));
    }, ge = () => {
      F || (F = window.requestAnimationFrame(le));
    }, Ee = () => {
      se = Math.max(1, V.clientHeight || 1), ge();
    };
    return le(), V.addEventListener("scroll", ge, { passive: !0 }), window.addEventListener("resize", Ee, { passive: !0 }), () => {
      V.removeEventListener("scroll", ge), window.removeEventListener("resize", Ee), F && window.cancelAnimationFrame(F);
    };
  }, [a, i, v]);
  const L = [
    "ac-homepage",
    `ac-homepage--${g}`,
    v ? i ? "ac-homepage--has-messages" : "ac-homepage--empty" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ m.jsx(Vh.Provider, { value: p, children: /* @__PURE__ */ m.jsx(ov, { runtime: n, children: /* @__PURE__ */ m.jsxs("div", { ref: b, className: L, children: [
    v ? null : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__backdrop", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("img", { src: J_, alt: "", loading: "eager", decoding: "async" }) }),
    /* @__PURE__ */ m.jsx(Th, { className: "ac-homepage__thread", children: /* @__PURE__ */ m.jsxs(
      Rh,
      {
        ref: S,
        className: "ac-homepage__viewport",
        autoScroll: E,
        turnAnchor: E ? "bottom" : "top",
        scrollToBottomOnInitialize: !1,
        scrollToBottomOnRunStart: E,
        scrollToBottomOnThreadSwitch: E,
        children: [
          v ? /* @__PURE__ */ m.jsx(SS, { hasUserMessages: i }) : /* @__PURE__ */ m.jsx(oS, { config: r }),
          v ? /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ m.jsx(
            p_,
            {
              components: {
                UserMessage: uS,
                AssistantMessage: vS
              }
            }
          ) }) : null,
          /* @__PURE__ */ m.jsx(lS, {})
        ]
      }
    ) })
  ] }) }) });
}
function ES(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || eo.has(i)) return;
  const a = Z_(n);
  if (!a) return;
  const u = hg.createRoot(r);
  u.render(/* @__PURE__ */ m.jsx(xS, { config: a })), eo.set(i, u);
}
function kS(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = eo.get(n);
  i && (i.unmount(), eo.delete(n));
}
function ap(r = document) {
  r.querySelectorAll(Bh).forEach((n) => ES(n));
}
function bS(r) {
  r.querySelectorAll(Bh).forEach((n) => kS(n));
}
ap();
document.addEventListener("shopify:section:load", (r) => {
  ap(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  bS(r.target);
});
