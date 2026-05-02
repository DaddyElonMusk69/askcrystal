function cg(r, n) {
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
function zf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var ul = { exports: {} }, ps = {}, cl = { exports: {} }, ce = {};
var $d;
function dg() {
  if ($d) return ce;
  $d = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), p = /* @__PURE__ */ Symbol.for("react.context"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), x = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function _(w) {
    return w === null || typeof w != "object" ? null : (w = b && w[b] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var I = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, N = Object.assign, P = {};
  function B(w, R, V) {
    this.props = w, this.context = R, this.refs = P, this.updater = V || I;
  }
  B.prototype.isReactComponent = {}, B.prototype.setState = function(w, R) {
    if (typeof w != "object" && typeof w != "function" && w != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, w, R, "setState");
  }, B.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function $() {
  }
  $.prototype = B.prototype;
  function K(w, R, V) {
    this.props = w, this.context = R, this.refs = P, this.updater = V || I;
  }
  var te = K.prototype = new $();
  te.constructor = K, N(te, B.prototype), te.isPureReactComponent = !0;
  var oe = Array.isArray, fe = Object.prototype.hasOwnProperty, J = { current: null }, D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function F(w, R, V) {
    var ie, ae = {}, ne = null, de = null;
    if (R != null) for (ie in R.ref !== void 0 && (de = R.ref), R.key !== void 0 && (ne = "" + R.key), R) fe.call(R, ie) && !D.hasOwnProperty(ie) && (ae[ie] = R[ie]);
    var ge = arguments.length - 2;
    if (ge === 1) ae.children = V;
    else if (1 < ge) {
      for (var le = Array(ge), Ue = 0; Ue < ge; Ue++) le[Ue] = arguments[Ue + 2];
      ae.children = le;
    }
    if (w && w.defaultProps) for (ie in ge = w.defaultProps, ge) ae[ie] === void 0 && (ae[ie] = ge[ie]);
    return { $$typeof: r, type: w, key: ne, ref: de, props: ae, _owner: J.current };
  }
  function se(w, R) {
    return { $$typeof: r, type: w.type, key: R, ref: w.ref, props: w.props, _owner: w._owner };
  }
  function G(w) {
    return typeof w == "object" && w !== null && w.$$typeof === r;
  }
  function Ce(w) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(V) {
      return R[V];
    });
  }
  var ve = /\/+/g;
  function he(w, R) {
    return typeof w == "object" && w !== null && w.key != null ? Ce("" + w.key) : R.toString(36);
  }
  function ue(w, R, V, ie, ae) {
    var ne = typeof w;
    (ne === "undefined" || ne === "boolean") && (w = null);
    var de = !1;
    if (w === null) de = !0;
    else switch (ne) {
      case "string":
      case "number":
        de = !0;
        break;
      case "object":
        switch (w.$$typeof) {
          case r:
          case n:
            de = !0;
        }
    }
    if (de) return de = w, ae = ae(de), w = ie === "" ? "." + he(de, 0) : ie, oe(ae) ? (V = "", w != null && (V = w.replace(ve, "$&/") + "/"), ue(ae, R, V, "", function(Ue) {
      return Ue;
    })) : ae != null && (G(ae) && (ae = se(ae, V + (!ae.key || de && de.key === ae.key ? "" : ("" + ae.key).replace(ve, "$&/") + "/") + w)), R.push(ae)), 1;
    if (de = 0, ie = ie === "" ? "." : ie + ":", oe(w)) for (var ge = 0; ge < w.length; ge++) {
      ne = w[ge];
      var le = ie + he(ne, ge);
      de += ue(ne, R, V, le, ae);
    }
    else if (le = _(w), typeof le == "function") for (w = le.call(w), ge = 0; !(ne = w.next()).done; ) ne = ne.value, le = ie + he(ne, ge++), de += ue(ne, R, V, le, ae);
    else if (ne === "object") throw R = String(w), Error("Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead.");
    return de;
  }
  function we(w, R, V) {
    if (w == null) return w;
    var ie = [], ae = 0;
    return ue(w, ie, "", "", function(ne) {
      return R.call(V, ne, ae++);
    }), ie;
  }
  function Me(w) {
    if (w._status === -1) {
      var R = w._result;
      R = R(), R.then(function(V) {
        (w._status === 0 || w._status === -1) && (w._status = 1, w._result = V);
      }, function(V) {
        (w._status === 0 || w._status === -1) && (w._status = 2, w._result = V);
      }), w._status === -1 && (w._status = 0, w._result = R);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var me = { current: null }, U = { transition: null }, ee = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: U, ReactCurrentOwner: J };
  function M() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ce.Children = { map: we, forEach: function(w, R, V) {
    we(w, function() {
      R.apply(this, arguments);
    }, V);
  }, count: function(w) {
    var R = 0;
    return we(w, function() {
      R++;
    }), R;
  }, toArray: function(w) {
    return we(w, function(R) {
      return R;
    }) || [];
  }, only: function(w) {
    if (!G(w)) throw Error("React.Children.only expected to receive a single React element child.");
    return w;
  } }, ce.Component = B, ce.Fragment = i, ce.Profiler = u, ce.PureComponent = K, ce.StrictMode = a, ce.Suspense = y, ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ee, ce.act = M, ce.cloneElement = function(w, R, V) {
    if (w == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + w + ".");
    var ie = N({}, w.props), ae = w.key, ne = w.ref, de = w._owner;
    if (R != null) {
      if (R.ref !== void 0 && (ne = R.ref, de = J.current), R.key !== void 0 && (ae = "" + R.key), w.type && w.type.defaultProps) var ge = w.type.defaultProps;
      for (le in R) fe.call(R, le) && !D.hasOwnProperty(le) && (ie[le] = R[le] === void 0 && ge !== void 0 ? ge[le] : R[le]);
    }
    var le = arguments.length - 2;
    if (le === 1) ie.children = V;
    else if (1 < le) {
      ge = Array(le);
      for (var Ue = 0; Ue < le; Ue++) ge[Ue] = arguments[Ue + 2];
      ie.children = ge;
    }
    return { $$typeof: r, type: w.type, key: ae, ref: ne, props: ie, _owner: de };
  }, ce.createContext = function(w) {
    return w = { $$typeof: p, _currentValue: w, _currentValue2: w, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, w.Provider = { $$typeof: d, _context: w }, w.Consumer = w;
  }, ce.createElement = F, ce.createFactory = function(w) {
    var R = F.bind(null, w);
    return R.type = w, R;
  }, ce.createRef = function() {
    return { current: null };
  }, ce.forwardRef = function(w) {
    return { $$typeof: h, render: w };
  }, ce.isValidElement = G, ce.lazy = function(w) {
    return { $$typeof: x, _payload: { _status: -1, _result: w }, _init: Me };
  }, ce.memo = function(w, R) {
    return { $$typeof: v, type: w, compare: R === void 0 ? null : R };
  }, ce.startTransition = function(w) {
    var R = U.transition;
    U.transition = {};
    try {
      w();
    } finally {
      U.transition = R;
    }
  }, ce.unstable_act = M, ce.useCallback = function(w, R) {
    return me.current.useCallback(w, R);
  }, ce.useContext = function(w) {
    return me.current.useContext(w);
  }, ce.useDebugValue = function() {
  }, ce.useDeferredValue = function(w) {
    return me.current.useDeferredValue(w);
  }, ce.useEffect = function(w, R) {
    return me.current.useEffect(w, R);
  }, ce.useId = function() {
    return me.current.useId();
  }, ce.useImperativeHandle = function(w, R, V) {
    return me.current.useImperativeHandle(w, R, V);
  }, ce.useInsertionEffect = function(w, R) {
    return me.current.useInsertionEffect(w, R);
  }, ce.useLayoutEffect = function(w, R) {
    return me.current.useLayoutEffect(w, R);
  }, ce.useMemo = function(w, R) {
    return me.current.useMemo(w, R);
  }, ce.useReducer = function(w, R, V) {
    return me.current.useReducer(w, R, V);
  }, ce.useRef = function(w) {
    return me.current.useRef(w);
  }, ce.useState = function(w) {
    return me.current.useState(w);
  }, ce.useSyncExternalStore = function(w, R, V) {
    return me.current.useSyncExternalStore(w, R, V);
  }, ce.useTransition = function() {
    return me.current.useTransition();
  }, ce.version = "18.3.1", ce;
}
var Hd;
function Ll() {
  return Hd || (Hd = 1, cl.exports = dg()), cl.exports;
}
var Vd;
function fg() {
  if (Vd) return ps;
  Vd = 1;
  var r = Ll(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(h, y, v) {
    var x, b = {}, _ = null, I = null;
    v !== void 0 && (_ = "" + v), y.key !== void 0 && (_ = "" + y.key), y.ref !== void 0 && (I = y.ref);
    for (x in y) a.call(y, x) && !d.hasOwnProperty(x) && (b[x] = y[x]);
    if (h && h.defaultProps) for (x in y = h.defaultProps, y) b[x] === void 0 && (b[x] = y[x]);
    return { $$typeof: n, type: h, key: _, ref: I, props: b, _owner: u.current };
  }
  return ps.Fragment = i, ps.jsx = p, ps.jsxs = p, ps;
}
var Wd;
function pg() {
  return Wd || (Wd = 1, ul.exports = fg()), ul.exports;
}
var m = pg(), k = Ll();
const Mt = /* @__PURE__ */ zf(k), hg = /* @__PURE__ */ cg({
  __proto__: null,
  default: Mt
}, [k]);
var Bi = {}, dl = { exports: {} }, ut = {}, fl = { exports: {} }, pl = {};
var Gd;
function mg() {
  return Gd || (Gd = 1, (function(r) {
    function n(U, ee) {
      var M = U.length;
      U.push(ee);
      e: for (; 0 < M; ) {
        var w = M - 1 >>> 1, R = U[w];
        if (0 < u(R, ee)) U[w] = ee, U[M] = R, M = w;
        else break e;
      }
    }
    function i(U) {
      return U.length === 0 ? null : U[0];
    }
    function a(U) {
      if (U.length === 0) return null;
      var ee = U[0], M = U.pop();
      if (M !== ee) {
        U[0] = M;
        e: for (var w = 0, R = U.length, V = R >>> 1; w < V; ) {
          var ie = 2 * (w + 1) - 1, ae = U[ie], ne = ie + 1, de = U[ne];
          if (0 > u(ae, M)) ne < R && 0 > u(de, ae) ? (U[w] = de, U[ne] = M, w = ne) : (U[w] = ae, U[ie] = M, w = ie);
          else if (ne < R && 0 > u(de, M)) U[w] = de, U[ne] = M, w = ne;
          else break e;
        }
      }
      return ee;
    }
    function u(U, ee) {
      var M = U.sortIndex - ee.sortIndex;
      return M !== 0 ? M : U.id - ee.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      r.unstable_now = function() {
        return d.now();
      };
    } else {
      var p = Date, h = p.now();
      r.unstable_now = function() {
        return p.now() - h;
      };
    }
    var y = [], v = [], x = 1, b = null, _ = 3, I = !1, N = !1, P = !1, B = typeof setTimeout == "function" ? setTimeout : null, $ = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function te(U) {
      for (var ee = i(v); ee !== null; ) {
        if (ee.callback === null) a(v);
        else if (ee.startTime <= U) a(v), ee.sortIndex = ee.expirationTime, n(y, ee);
        else break;
        ee = i(v);
      }
    }
    function oe(U) {
      if (P = !1, te(U), !N) if (i(y) !== null) N = !0, Me(fe);
      else {
        var ee = i(v);
        ee !== null && me(oe, ee.startTime - U);
      }
    }
    function fe(U, ee) {
      N = !1, P && (P = !1, $(F), F = -1), I = !0;
      var M = _;
      try {
        for (te(ee), b = i(y); b !== null && (!(b.expirationTime > ee) || U && !Ce()); ) {
          var w = b.callback;
          if (typeof w == "function") {
            b.callback = null, _ = b.priorityLevel;
            var R = w(b.expirationTime <= ee);
            ee = r.unstable_now(), typeof R == "function" ? b.callback = R : b === i(y) && a(y), te(ee);
          } else a(y);
          b = i(y);
        }
        if (b !== null) var V = !0;
        else {
          var ie = i(v);
          ie !== null && me(oe, ie.startTime - ee), V = !1;
        }
        return V;
      } finally {
        b = null, _ = M, I = !1;
      }
    }
    var J = !1, D = null, F = -1, se = 5, G = -1;
    function Ce() {
      return !(r.unstable_now() - G < se);
    }
    function ve() {
      if (D !== null) {
        var U = r.unstable_now();
        G = U;
        var ee = !0;
        try {
          ee = D(!0, U);
        } finally {
          ee ? he() : (J = !1, D = null);
        }
      } else J = !1;
    }
    var he;
    if (typeof K == "function") he = function() {
      K(ve);
    };
    else if (typeof MessageChannel < "u") {
      var ue = new MessageChannel(), we = ue.port2;
      ue.port1.onmessage = ve, he = function() {
        we.postMessage(null);
      };
    } else he = function() {
      B(ve, 0);
    };
    function Me(U) {
      D = U, J || (J = !0, he());
    }
    function me(U, ee) {
      F = B(function() {
        U(r.unstable_now());
      }, ee);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, r.unstable_continueExecution = function() {
      N || I || (N = !0, Me(fe));
    }, r.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : se = 0 < U ? Math.floor(1e3 / U) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return _;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(y);
    }, r.unstable_next = function(U) {
      switch (_) {
        case 1:
        case 2:
        case 3:
          var ee = 3;
          break;
        default:
          ee = _;
      }
      var M = _;
      _ = ee;
      try {
        return U();
      } finally {
        _ = M;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(U, ee) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var M = _;
      _ = U;
      try {
        return ee();
      } finally {
        _ = M;
      }
    }, r.unstable_scheduleCallback = function(U, ee, M) {
      var w = r.unstable_now();
      switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? w + M : w) : M = w, U) {
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
      return R = M + R, U = { id: x++, callback: ee, priorityLevel: U, startTime: M, expirationTime: R, sortIndex: -1 }, M > w ? (U.sortIndex = M, n(v, U), i(y) === null && U === i(v) && (P ? ($(F), F = -1) : P = !0, me(oe, M - w))) : (U.sortIndex = R, n(y, U), N || I || (N = !0, Me(fe))), U;
    }, r.unstable_shouldYield = Ce, r.unstable_wrapCallback = function(U) {
      var ee = _;
      return function() {
        var M = _;
        _ = ee;
        try {
          return U.apply(this, arguments);
        } finally {
          _ = M;
        }
      };
    };
  })(pl)), pl;
}
var Yd;
function gg() {
  return Yd || (Yd = 1, fl.exports = mg()), fl.exports;
}
var Qd;
function yg() {
  if (Qd) return ut;
  Qd = 1;
  var r = Ll(), n = gg();
  function i(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, s = 1; s < arguments.length; s++) t += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), u = {};
  function d(e, t) {
    p(e, t), p(e + "Capture", t);
  }
  function p(e, t) {
    for (u[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var h = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), y = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, x = {}, b = {};
  function _(e) {
    return y.call(b, e) ? !0 : y.call(x, e) ? !1 : v.test(e) ? b[e] = !0 : (x[e] = !0, !1);
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
  function N(e, t, s, o) {
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
  function P(e, t, s, o, l, c, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = s, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = f;
  }
  var B = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    B[e] = new P(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    B[t] = new P(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    B[e] = new P(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    B[e] = new P(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    B[e] = new P(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    B[e] = new P(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    B[e] = new P(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    B[e] = new P(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    B[e] = new P(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var $ = /[\-:]([a-z])/g;
  function K(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      $,
      K
    );
    B[t] = new P(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace($, K);
    B[t] = new P(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace($, K);
    B[t] = new P(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    B[e] = new P(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), B.xlinkHref = new P("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    B[e] = new P(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function te(e, t, s, o) {
    var l = B.hasOwnProperty(t) ? B[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (N(t, s, l, o) && (s = null), o || l === null ? _(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var oe = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, fe = /* @__PURE__ */ Symbol.for("react.element"), J = /* @__PURE__ */ Symbol.for("react.portal"), D = /* @__PURE__ */ Symbol.for("react.fragment"), F = /* @__PURE__ */ Symbol.for("react.strict_mode"), se = /* @__PURE__ */ Symbol.for("react.profiler"), G = /* @__PURE__ */ Symbol.for("react.provider"), Ce = /* @__PURE__ */ Symbol.for("react.context"), ve = /* @__PURE__ */ Symbol.for("react.forward_ref"), he = /* @__PURE__ */ Symbol.for("react.suspense"), ue = /* @__PURE__ */ Symbol.for("react.suspense_list"), we = /* @__PURE__ */ Symbol.for("react.memo"), Me = /* @__PURE__ */ Symbol.for("react.lazy"), me = /* @__PURE__ */ Symbol.for("react.offscreen"), U = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object" ? null : (e = U && e[U] || e["@@iterator"], typeof e == "function" ? e : null);
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
  var V = !1;
  function ie(e, t) {
    if (!e || V) return "";
    V = !0;
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
        } catch (A) {
          var o = A;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (A) {
          o = A;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (A) {
          o = A;
        }
        e();
      }
    } catch (A) {
      if (A && o && typeof A.stack == "string") {
        for (var l = A.stack.split(`
`), c = o.stack.split(`
`), f = l.length - 1, g = c.length - 1; 1 <= f && 0 <= g && l[f] !== c[g]; ) g--;
        for (; 1 <= f && 0 <= g; f--, g--) if (l[f] !== c[g]) {
          if (f !== 1 || g !== 1)
            do
              if (f--, g--, 0 > g || l[f] !== c[g]) {
                var S = `
` + l[f].replace(" at new ", " at ");
                return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), S;
              }
            while (1 <= f && 0 <= g);
          break;
        }
      }
    } finally {
      V = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? R(e) : "";
  }
  function ae(e) {
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
        return e = ie(e.type, !1), e;
      case 11:
        return e = ie(e.type.render, !1), e;
      case 1:
        return e = ie(e.type, !0), e;
      default:
        return "";
    }
  }
  function ne(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case D:
        return "Fragment";
      case J:
        return "Portal";
      case se:
        return "Profiler";
      case F:
        return "StrictMode";
      case he:
        return "Suspense";
      case ue:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ce:
        return (e.displayName || "Context") + ".Consumer";
      case G:
        return (e._context.displayName || "Context") + ".Provider";
      case ve:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case we:
        return t = e.displayName || null, t !== null ? t : ne(e.type) || "Memo";
      case Me:
        t = e._payload, e = e._init;
        try {
          return ne(e(t));
        } catch {
        }
    }
    return null;
  }
  function de(e) {
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
        return ne(t);
      case 8:
        return t === F ? "StrictMode" : "Mode";
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
  function ge(e) {
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
  function le(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ue(e) {
    var t = le(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
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
  function kn(e) {
    e._valueTracker || (e._valueTracker = Ue(e));
  }
  function rn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = le(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
  }
  function Gn(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Tr(e, t) {
    var s = t.checked;
    return M({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function As(e, t) {
    var s = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    s = ge(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Ir(e, t) {
    t = t.checked, t != null && te(e, "checked", t, !1);
  }
  function xt(e, t) {
    Ir(e, t);
    var s = ge(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Pe(e, t.type, s) : t.hasOwnProperty("defaultValue") && Pe(e, t.type, ge(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Oe(e, t, s) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function Pe(e, t, s) {
    (t !== "number" || Gn(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var Ye = Array.isArray;
  function rt(e, t, s, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < s.length; l++) t["$" + s[l]] = !0;
      for (s = 0; s < e.length; s++) l = t.hasOwnProperty("$" + e[s].value), e[s].selected !== l && (e[s].selected = l), l && o && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + ge(s), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === s) {
          e[l].selected = !0, o && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Vt(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return M({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Wt(e, t) {
    var s = t.value;
    if (s == null) {
      if (s = t.children, t = t.defaultValue, s != null) {
        if (t != null) throw Error(i(92));
        if (Ye(s)) {
          if (1 < s.length) throw Error(i(93));
          s = s[0];
        }
        t = s;
      }
      t == null && (t = ""), s = t;
    }
    e._wrapperState = { initialValue: ge(s) };
  }
  function Zl(e, t) {
    var s = ge(t.value), o = ge(t.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), t.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), o != null && (e.defaultValue = "" + o);
  }
  function eu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function tu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function So(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? tu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Ms, nu = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, s, o, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, s, o, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Ms = Ms || document.createElement("div"), Ms.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ms.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Rr(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ar = {
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
  }, hh = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ar).forEach(function(e) {
    hh.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Ar[t] = Ar[e];
    });
  });
  function ru(e, t, s) {
    return t == null || typeof t == "boolean" || t === "" ? "" : s || typeof t != "number" || t === 0 || Ar.hasOwnProperty(e) && Ar[e] ? ("" + t).trim() : t + "px";
  }
  function su(e, t) {
    e = e.style;
    for (var s in t) if (t.hasOwnProperty(s)) {
      var o = s.indexOf("--") === 0, l = ru(s, t[s], o);
      s === "float" && (s = "cssFloat"), o ? e.setProperty(s, l) : e[s] = l;
    }
  }
  var mh = M({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function wo(e, t) {
    if (t) {
      if (mh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function xo(e, t) {
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
  var Eo = null;
  function ko(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var bo = null, Yn = null, Qn = null;
  function iu(e) {
    if (e = Xr(e)) {
      if (typeof bo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = ei(t), bo(e.stateNode, e.type, t));
    }
  }
  function ou(e) {
    Yn ? Qn ? Qn.push(e) : Qn = [e] : Yn = e;
  }
  function au() {
    if (Yn) {
      var e = Yn, t = Qn;
      if (Qn = Yn = null, iu(e), t) for (e = 0; e < t.length; e++) iu(t[e]);
    }
  }
  function lu(e, t) {
    return e(t);
  }
  function uu() {
  }
  var Co = !1;
  function cu(e, t, s) {
    if (Co) return e(t, s);
    Co = !0;
    try {
      return lu(e, t, s);
    } finally {
      Co = !1, (Yn !== null || Qn !== null) && (uu(), au());
    }
  }
  function Mr(e, t) {
    var s = e.stateNode;
    if (s === null) return null;
    var o = ei(s);
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
  var To = !1;
  if (h) try {
    var Pr = {};
    Object.defineProperty(Pr, "passive", { get: function() {
      To = !0;
    } }), window.addEventListener("test", Pr, Pr), window.removeEventListener("test", Pr, Pr);
  } catch {
    To = !1;
  }
  function gh(e, t, s, o, l, c, f, g, S) {
    var A = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, A);
    } catch (L) {
      this.onError(L);
    }
  }
  var Nr = !1, Ps = null, Ns = !1, Io = null, yh = { onError: function(e) {
    Nr = !0, Ps = e;
  } };
  function vh(e, t, s, o, l, c, f, g, S) {
    Nr = !1, Ps = null, gh.apply(yh, arguments);
  }
  function _h(e, t, s, o, l, c, f, g, S) {
    if (vh.apply(this, arguments), Nr) {
      if (Nr) {
        var A = Ps;
        Nr = !1, Ps = null;
      } else throw Error(i(198));
      Ns || (Ns = !0, Io = A);
    }
  }
  function bn(e) {
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
  function du(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function fu(e) {
    if (bn(e) !== e) throw Error(i(188));
  }
  function Sh(e) {
    var t = e.alternate;
    if (!t) {
      if (t = bn(e), t === null) throw Error(i(188));
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
          if (c === s) return fu(l), e;
          if (c === o) return fu(l), t;
          c = c.sibling;
        }
        throw Error(i(188));
      }
      if (s.return !== o.return) s = l, o = c;
      else {
        for (var f = !1, g = l.child; g; ) {
          if (g === s) {
            f = !0, s = l, o = c;
            break;
          }
          if (g === o) {
            f = !0, o = l, s = c;
            break;
          }
          g = g.sibling;
        }
        if (!f) {
          for (g = c.child; g; ) {
            if (g === s) {
              f = !0, s = c, o = l;
              break;
            }
            if (g === o) {
              f = !0, o = c, s = l;
              break;
            }
            g = g.sibling;
          }
          if (!f) throw Error(i(189));
        }
      }
      if (s.alternate !== o) throw Error(i(190));
    }
    if (s.tag !== 3) throw Error(i(188));
    return s.stateNode.current === s ? e : t;
  }
  function pu(e) {
    return e = Sh(e), e !== null ? hu(e) : null;
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
  var mu = n.unstable_scheduleCallback, gu = n.unstable_cancelCallback, wh = n.unstable_shouldYield, xh = n.unstable_requestPaint, je = n.unstable_now, Eh = n.unstable_getCurrentPriorityLevel, Ro = n.unstable_ImmediatePriority, yu = n.unstable_UserBlockingPriority, js = n.unstable_NormalPriority, kh = n.unstable_LowPriority, vu = n.unstable_IdlePriority, Ls = null, Ot = null;
  function bh(e) {
    if (Ot && typeof Ot.onCommitFiberRoot == "function") try {
      Ot.onCommitFiberRoot(Ls, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Et = Math.clz32 ? Math.clz32 : Ih, Ch = Math.log, Th = Math.LN2;
  function Ih(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ch(e) / Th | 0) | 0;
  }
  var Os = 64, zs = 4194304;
  function jr(e) {
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
  function Ds(e, t) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var o = 0, l = e.suspendedLanes, c = e.pingedLanes, f = s & 268435455;
    if (f !== 0) {
      var g = f & ~l;
      g !== 0 ? o = jr(g) : (c &= f, c !== 0 && (o = jr(c)));
    } else f = s & ~l, f !== 0 ? o = jr(f) : c !== 0 && (o = jr(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - Et(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function Rh(e, t) {
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
  function Ah(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var f = 31 - Et(c), g = 1 << f, S = l[f];
      S === -1 ? ((g & s) === 0 || (g & o) !== 0) && (l[f] = Rh(g, t)) : S <= t && (e.expiredLanes |= g), c &= ~g;
    }
  }
  function Ao(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function _u() {
    var e = Os;
    return Os <<= 1, (Os & 4194240) === 0 && (Os = 64), e;
  }
  function Mo(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Lr(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Et(t), e[t] = s;
  }
  function Mh(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - Et(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function Po(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - Et(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var Se = 0;
  function Su(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var wu, No, xu, Eu, ku, jo = !1, Bs = [], sn = null, on = null, an = null, Or = /* @__PURE__ */ new Map(), zr = /* @__PURE__ */ new Map(), ln = [], Ph = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function bu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        sn = null;
        break;
      case "dragenter":
      case "dragleave":
        on = null;
        break;
      case "mouseover":
      case "mouseout":
        an = null;
        break;
      case "pointerover":
      case "pointerout":
        Or.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        zr.delete(t.pointerId);
    }
  }
  function Dr(e, t, s, o, l, c) {
    return e === null || e.nativeEvent !== c ? (e = { blockedOn: t, domEventName: s, eventSystemFlags: o, nativeEvent: c, targetContainers: [l] }, t !== null && (t = Xr(t), t !== null && No(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Nh(e, t, s, o, l) {
    switch (t) {
      case "focusin":
        return sn = Dr(sn, e, t, s, o, l), !0;
      case "dragenter":
        return on = Dr(on, e, t, s, o, l), !0;
      case "mouseover":
        return an = Dr(an, e, t, s, o, l), !0;
      case "pointerover":
        var c = l.pointerId;
        return Or.set(c, Dr(Or.get(c) || null, e, t, s, o, l)), !0;
      case "gotpointercapture":
        return c = l.pointerId, zr.set(c, Dr(zr.get(c) || null, e, t, s, o, l)), !0;
    }
    return !1;
  }
  function Cu(e) {
    var t = Cn(e.target);
    if (t !== null) {
      var s = bn(t);
      if (s !== null) {
        if (t = s.tag, t === 13) {
          if (t = du(s), t !== null) {
            e.blockedOn = t, ku(e.priority, function() {
              xu(s);
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
      var s = Oo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        Eo = o, s.target.dispatchEvent(o), Eo = null;
      } else return t = Xr(s), t !== null && No(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function Tu(e, t, s) {
    Fs(e) && s.delete(t);
  }
  function jh() {
    jo = !1, sn !== null && Fs(sn) && (sn = null), on !== null && Fs(on) && (on = null), an !== null && Fs(an) && (an = null), Or.forEach(Tu), zr.forEach(Tu);
  }
  function Br(e, t) {
    e.blockedOn === t && (e.blockedOn = null, jo || (jo = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, jh)));
  }
  function Fr(e) {
    function t(l) {
      return Br(l, e);
    }
    if (0 < Bs.length) {
      Br(Bs[0], e);
      for (var s = 1; s < Bs.length; s++) {
        var o = Bs[s];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (sn !== null && Br(sn, e), on !== null && Br(on, e), an !== null && Br(an, e), Or.forEach(t), zr.forEach(t), s = 0; s < ln.length; s++) o = ln[s], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < ln.length && (s = ln[0], s.blockedOn === null); ) Cu(s), s.blockedOn === null && ln.shift();
  }
  var qn = oe.ReactCurrentBatchConfig, Us = !0;
  function Lh(e, t, s, o) {
    var l = Se, c = qn.transition;
    qn.transition = null;
    try {
      Se = 1, Lo(e, t, s, o);
    } finally {
      Se = l, qn.transition = c;
    }
  }
  function Oh(e, t, s, o) {
    var l = Se, c = qn.transition;
    qn.transition = null;
    try {
      Se = 4, Lo(e, t, s, o);
    } finally {
      Se = l, qn.transition = c;
    }
  }
  function Lo(e, t, s, o) {
    if (Us) {
      var l = Oo(e, t, s, o);
      if (l === null) Zo(e, t, o, $s, s), bu(e, o);
      else if (Nh(l, e, t, s, o)) o.stopPropagation();
      else if (bu(e, o), t & 4 && -1 < Ph.indexOf(e)) {
        for (; l !== null; ) {
          var c = Xr(l);
          if (c !== null && wu(c), c = Oo(e, t, s, o), c === null && Zo(e, t, o, $s, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else Zo(e, t, o, null, s);
    }
  }
  var $s = null;
  function Oo(e, t, s, o) {
    if ($s = null, e = ko(o), e = Cn(e), e !== null) if (t = bn(e), t === null) e = null;
    else if (s = t.tag, s === 13) {
      if (e = du(t), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return $s = e, null;
  }
  function Iu(e) {
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
        switch (Eh()) {
          case Ro:
            return 1;
          case yu:
            return 4;
          case js:
          case kh:
            return 16;
          case vu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var un = null, zo = null, Hs = null;
  function Ru() {
    if (Hs) return Hs;
    var e, t = zo, s = t.length, o, l = "value" in un ? un.value : un.textContent, c = l.length;
    for (e = 0; e < s && t[e] === l[e]; e++) ;
    var f = s - e;
    for (o = 1; o <= f && t[s - o] === l[c - o]; o++) ;
    return Hs = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Vs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ws() {
    return !0;
  }
  function Au() {
    return !1;
  }
  function ct(e) {
    function t(s, o, l, c, f) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var g in e) e.hasOwnProperty(g) && (s = e[g], this[g] = s ? s(c) : c[g]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Ws : Au, this.isPropagationStopped = Au, this;
    }
    return M(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Ws);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Ws);
    }, persist: function() {
    }, isPersistent: Ws }), t;
  }
  var Kn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Do = ct(Kn), Ur = M({}, Kn, { view: 0, detail: 0 }), zh = ct(Ur), Bo, Fo, $r, Gs = M({}, Ur, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: $o, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== $r && ($r && e.type === "mousemove" ? (Bo = e.screenX - $r.screenX, Fo = e.screenY - $r.screenY) : Fo = Bo = 0, $r = e), Bo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Fo;
  } }), Mu = ct(Gs), Dh = M({}, Gs, { dataTransfer: 0 }), Bh = ct(Dh), Fh = M({}, Ur, { relatedTarget: 0 }), Uo = ct(Fh), Uh = M({}, Kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), $h = ct(Uh), Hh = M({}, Kn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Vh = ct(Hh), Wh = M({}, Kn, { data: 0 }), Pu = ct(Wh), Gh = {
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
  }, Yh = {
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
  }, Qh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function qh(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Qh[e]) ? !!t[e] : !1;
  }
  function $o() {
    return qh;
  }
  var Kh = M({}, Ur, { key: function(e) {
    if (e.key) {
      var t = Gh[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Vs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Yh[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: $o, charCode: function(e) {
    return e.type === "keypress" ? Vs(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Vs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Jh = ct(Kh), Xh = M({}, Gs, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Nu = ct(Xh), Zh = M({}, Ur, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: $o }), em = ct(Zh), tm = M({}, Kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), nm = ct(tm), rm = M({}, Gs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), sm = ct(rm), im = [9, 13, 27, 32], Ho = h && "CompositionEvent" in window, Hr = null;
  h && "documentMode" in document && (Hr = document.documentMode);
  var om = h && "TextEvent" in window && !Hr, ju = h && (!Ho || Hr && 8 < Hr && 11 >= Hr), Lu = " ", Ou = !1;
  function zu(e, t) {
    switch (e) {
      case "keyup":
        return im.indexOf(t.keyCode) !== -1;
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
  function Du(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Jn = !1;
  function am(e, t) {
    switch (e) {
      case "compositionend":
        return Du(t);
      case "keypress":
        return t.which !== 32 ? null : (Ou = !0, Lu);
      case "textInput":
        return e = t.data, e === Lu && Ou ? null : e;
      default:
        return null;
    }
  }
  function lm(e, t) {
    if (Jn) return e === "compositionend" || !Ho && zu(e, t) ? (e = Ru(), Hs = zo = un = null, Jn = !1, e) : null;
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
        return ju && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var um = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Bu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!um[e.type] : t === "textarea";
  }
  function Fu(e, t, s, o) {
    ou(o), t = Js(t, "onChange"), 0 < t.length && (s = new Do("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var Vr = null, Wr = null;
  function cm(e) {
    sc(e, 0);
  }
  function Ys(e) {
    var t = nr(e);
    if (rn(t)) return e;
  }
  function dm(e, t) {
    if (e === "change") return t;
  }
  var Uu = !1;
  if (h) {
    var Vo;
    if (h) {
      var Wo = "oninput" in document;
      if (!Wo) {
        var $u = document.createElement("div");
        $u.setAttribute("oninput", "return;"), Wo = typeof $u.oninput == "function";
      }
      Vo = Wo;
    } else Vo = !1;
    Uu = Vo && (!document.documentMode || 9 < document.documentMode);
  }
  function Hu() {
    Vr && (Vr.detachEvent("onpropertychange", Vu), Wr = Vr = null);
  }
  function Vu(e) {
    if (e.propertyName === "value" && Ys(Wr)) {
      var t = [];
      Fu(t, Wr, e, ko(e)), cu(cm, t);
    }
  }
  function fm(e, t, s) {
    e === "focusin" ? (Hu(), Vr = t, Wr = s, Vr.attachEvent("onpropertychange", Vu)) : e === "focusout" && Hu();
  }
  function pm(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ys(Wr);
  }
  function hm(e, t) {
    if (e === "click") return Ys(t);
  }
  function mm(e, t) {
    if (e === "input" || e === "change") return Ys(t);
  }
  function gm(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var kt = typeof Object.is == "function" ? Object.is : gm;
  function Gr(e, t) {
    if (kt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var s = Object.keys(e), o = Object.keys(t);
    if (s.length !== o.length) return !1;
    for (o = 0; o < s.length; o++) {
      var l = s[o];
      if (!y.call(t, l) || !kt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Wu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Gu(e, t) {
    var s = Wu(e);
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
      s = Wu(s);
    }
  }
  function Yu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Yu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Qu() {
    for (var e = window, t = Gn(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof t.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = t.contentWindow;
      else break;
      t = Gn(e.document);
    }
    return t;
  }
  function Go(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function ym(e) {
    var t = Qu(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Yu(s.ownerDocument.documentElement, s)) {
      if (o !== null && Go(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = Gu(s, c);
          var f = Gu(
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
  var vm = h && "documentMode" in document && 11 >= document.documentMode, Xn = null, Yo = null, Yr = null, Qo = !1;
  function qu(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Qo || Xn == null || Xn !== Gn(o) || (o = Xn, "selectionStart" in o && Go(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Yr && Gr(Yr, o) || (Yr = o, o = Js(Yo, "onSelect"), 0 < o.length && (t = new Do("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = Xn)));
  }
  function Qs(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var Zn = { animationend: Qs("Animation", "AnimationEnd"), animationiteration: Qs("Animation", "AnimationIteration"), animationstart: Qs("Animation", "AnimationStart"), transitionend: Qs("Transition", "TransitionEnd") }, qo = {}, Ku = {};
  h && (Ku = document.createElement("div").style, "AnimationEvent" in window || (delete Zn.animationend.animation, delete Zn.animationiteration.animation, delete Zn.animationstart.animation), "TransitionEvent" in window || delete Zn.transitionend.transition);
  function qs(e) {
    if (qo[e]) return qo[e];
    if (!Zn[e]) return e;
    var t = Zn[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Ku) return qo[e] = t[s];
    return e;
  }
  var Ju = qs("animationend"), Xu = qs("animationiteration"), Zu = qs("animationstart"), ec = qs("transitionend"), tc = /* @__PURE__ */ new Map(), nc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function cn(e, t) {
    tc.set(e, t), d(t, [e]);
  }
  for (var Ko = 0; Ko < nc.length; Ko++) {
    var Jo = nc[Ko], _m = Jo.toLowerCase(), Sm = Jo[0].toUpperCase() + Jo.slice(1);
    cn(_m, "on" + Sm);
  }
  cn(Ju, "onAnimationEnd"), cn(Xu, "onAnimationIteration"), cn(Zu, "onAnimationStart"), cn("dblclick", "onDoubleClick"), cn("focusin", "onFocus"), cn("focusout", "onBlur"), cn(ec, "onTransitionEnd"), p("onMouseEnter", ["mouseout", "mouseover"]), p("onMouseLeave", ["mouseout", "mouseover"]), p("onPointerEnter", ["pointerout", "pointerover"]), p("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Qr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), wm = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qr));
  function rc(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, _h(o, t, void 0, e), e.currentTarget = null;
  }
  function sc(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var g = o[f], S = g.instance, A = g.currentTarget;
          if (g = g.listener, S !== c && l.isPropagationStopped()) break e;
          rc(l, g, A), c = S;
        }
        else for (f = 0; f < o.length; f++) {
          if (g = o[f], S = g.instance, A = g.currentTarget, g = g.listener, S !== c && l.isPropagationStopped()) break e;
          rc(l, g, A), c = S;
        }
      }
    }
    if (Ns) throw e = Io, Ns = !1, Io = null, e;
  }
  function Ee(e, t) {
    var s = t[ia];
    s === void 0 && (s = t[ia] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (ic(t, e, 2, !1), s.add(o));
  }
  function Xo(e, t, s) {
    var o = 0;
    t && (o |= 4), ic(s, e, o, t);
  }
  var Ks = "_reactListening" + Math.random().toString(36).slice(2);
  function qr(e) {
    if (!e[Ks]) {
      e[Ks] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (wm.has(s) || Xo(s, !1, e), Xo(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ks] || (t[Ks] = !0, Xo("selectionchange", !1, t));
    }
  }
  function ic(e, t, s, o) {
    switch (Iu(t)) {
      case 1:
        var l = Lh;
        break;
      case 4:
        l = Oh;
        break;
      default:
        l = Lo;
    }
    s = l.bind(null, t, s, e), l = void 0, !To || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, s, { capture: !0, passive: l }) : e.addEventListener(t, s, !0) : l !== void 0 ? e.addEventListener(t, s, { passive: l }) : e.addEventListener(t, s, !1);
  }
  function Zo(e, t, s, o, l) {
    var c = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var f = o.tag;
      if (f === 3 || f === 4) {
        var g = o.stateNode.containerInfo;
        if (g === l || g.nodeType === 8 && g.parentNode === l) break;
        if (f === 4) for (f = o.return; f !== null; ) {
          var S = f.tag;
          if ((S === 3 || S === 4) && (S = f.stateNode.containerInfo, S === l || S.nodeType === 8 && S.parentNode === l)) return;
          f = f.return;
        }
        for (; g !== null; ) {
          if (f = Cn(g), f === null) return;
          if (S = f.tag, S === 5 || S === 6) {
            o = c = f;
            continue e;
          }
          g = g.parentNode;
        }
      }
      o = o.return;
    }
    cu(function() {
      var A = c, L = ko(s), O = [];
      e: {
        var j = tc.get(e);
        if (j !== void 0) {
          var H = Do, Y = e;
          switch (e) {
            case "keypress":
              if (Vs(s) === 0) break e;
            case "keydown":
            case "keyup":
              H = Jh;
              break;
            case "focusin":
              Y = "focus", H = Uo;
              break;
            case "focusout":
              Y = "blur", H = Uo;
              break;
            case "beforeblur":
            case "afterblur":
              H = Uo;
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
              H = Mu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = Bh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = em;
              break;
            case Ju:
            case Xu:
            case Zu:
              H = $h;
              break;
            case ec:
              H = nm;
              break;
            case "scroll":
              H = zh;
              break;
            case "wheel":
              H = sm;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = Vh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = Nu;
          }
          var Q = (t & 4) !== 0, Le = !Q && e === "scroll", C = Q ? j !== null ? j + "Capture" : null : j;
          Q = [];
          for (var E = A, T; E !== null; ) {
            T = E;
            var z = T.stateNode;
            if (T.tag === 5 && z !== null && (T = z, C !== null && (z = Mr(E, C), z != null && Q.push(Kr(E, z, T)))), Le) break;
            E = E.return;
          }
          0 < Q.length && (j = new H(j, Y, null, s, L), O.push({ event: j, listeners: Q }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (j = e === "mouseover" || e === "pointerover", H = e === "mouseout" || e === "pointerout", j && s !== Eo && (Y = s.relatedTarget || s.fromElement) && (Cn(Y) || Y[Gt])) break e;
          if ((H || j) && (j = L.window === L ? L : (j = L.ownerDocument) ? j.defaultView || j.parentWindow : window, H ? (Y = s.relatedTarget || s.toElement, H = A, Y = Y ? Cn(Y) : null, Y !== null && (Le = bn(Y), Y !== Le || Y.tag !== 5 && Y.tag !== 6) && (Y = null)) : (H = null, Y = A), H !== Y)) {
            if (Q = Mu, z = "onMouseLeave", C = "onMouseEnter", E = "mouse", (e === "pointerout" || e === "pointerover") && (Q = Nu, z = "onPointerLeave", C = "onPointerEnter", E = "pointer"), Le = H == null ? j : nr(H), T = Y == null ? j : nr(Y), j = new Q(z, E + "leave", H, s, L), j.target = Le, j.relatedTarget = T, z = null, Cn(L) === A && (Q = new Q(C, E + "enter", Y, s, L), Q.target = T, Q.relatedTarget = Le, z = Q), Le = z, H && Y) t: {
              for (Q = H, C = Y, E = 0, T = Q; T; T = er(T)) E++;
              for (T = 0, z = C; z; z = er(z)) T++;
              for (; 0 < E - T; ) Q = er(Q), E--;
              for (; 0 < T - E; ) C = er(C), T--;
              for (; E--; ) {
                if (Q === C || C !== null && Q === C.alternate) break t;
                Q = er(Q), C = er(C);
              }
              Q = null;
            }
            else Q = null;
            H !== null && oc(O, j, H, Q, !1), Y !== null && Le !== null && oc(O, Le, Y, Q, !0);
          }
        }
        e: {
          if (j = A ? nr(A) : window, H = j.nodeName && j.nodeName.toLowerCase(), H === "select" || H === "input" && j.type === "file") var q = dm;
          else if (Bu(j)) if (Uu) q = mm;
          else {
            q = pm;
            var X = fm;
          }
          else (H = j.nodeName) && H.toLowerCase() === "input" && (j.type === "checkbox" || j.type === "radio") && (q = hm);
          if (q && (q = q(e, A))) {
            Fu(O, q, s, L);
            break e;
          }
          X && X(e, j, A), e === "focusout" && (X = j._wrapperState) && X.controlled && j.type === "number" && Pe(j, "number", j.value);
        }
        switch (X = A ? nr(A) : window, e) {
          case "focusin":
            (Bu(X) || X.contentEditable === "true") && (Xn = X, Yo = A, Yr = null);
            break;
          case "focusout":
            Yr = Yo = Xn = null;
            break;
          case "mousedown":
            Qo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Qo = !1, qu(O, s, L);
            break;
          case "selectionchange":
            if (vm) break;
          case "keydown":
          case "keyup":
            qu(O, s, L);
        }
        var Z;
        if (Ho) e: {
          switch (e) {
            case "compositionstart":
              var re = "onCompositionStart";
              break e;
            case "compositionend":
              re = "onCompositionEnd";
              break e;
            case "compositionupdate":
              re = "onCompositionUpdate";
              break e;
          }
          re = void 0;
        }
        else Jn ? zu(e, s) && (re = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (re = "onCompositionStart");
        re && (ju && s.locale !== "ko" && (Jn || re !== "onCompositionStart" ? re === "onCompositionEnd" && Jn && (Z = Ru()) : (un = L, zo = "value" in un ? un.value : un.textContent, Jn = !0)), X = Js(A, re), 0 < X.length && (re = new Pu(re, e, null, s, L), O.push({ event: re, listeners: X }), Z ? re.data = Z : (Z = Du(s), Z !== null && (re.data = Z)))), (Z = om ? am(e, s) : lm(e, s)) && (A = Js(A, "onBeforeInput"), 0 < A.length && (L = new Pu("onBeforeInput", "beforeinput", null, s, L), O.push({ event: L, listeners: A }), L.data = Z));
      }
      sc(O, t);
    });
  }
  function Kr(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function Js(e, t) {
    for (var s = t + "Capture", o = []; e !== null; ) {
      var l = e, c = l.stateNode;
      l.tag === 5 && c !== null && (l = c, c = Mr(e, s), c != null && o.unshift(Kr(e, c, l)), c = Mr(e, t), c != null && o.push(Kr(e, c, l))), e = e.return;
    }
    return o;
  }
  function er(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function oc(e, t, s, o, l) {
    for (var c = t._reactName, f = []; s !== null && s !== o; ) {
      var g = s, S = g.alternate, A = g.stateNode;
      if (S !== null && S === o) break;
      g.tag === 5 && A !== null && (g = A, l ? (S = Mr(s, c), S != null && f.unshift(Kr(s, S, g))) : l || (S = Mr(s, c), S != null && f.push(Kr(s, S, g)))), s = s.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var xm = /\r\n?/g, Em = /\u0000|\uFFFD/g;
  function ac(e) {
    return (typeof e == "string" ? e : "" + e).replace(xm, `
`).replace(Em, "");
  }
  function Xs(e, t, s) {
    if (t = ac(t), ac(e) !== t && s) throw Error(i(425));
  }
  function Zs() {
  }
  var ea = null, ta = null;
  function na(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ra = typeof setTimeout == "function" ? setTimeout : void 0, km = typeof clearTimeout == "function" ? clearTimeout : void 0, lc = typeof Promise == "function" ? Promise : void 0, bm = typeof queueMicrotask == "function" ? queueMicrotask : typeof lc < "u" ? function(e) {
    return lc.resolve(null).then(e).catch(Cm);
  } : ra;
  function Cm(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function sa(e, t) {
    var s = t, o = 0;
    do {
      var l = s.nextSibling;
      if (e.removeChild(s), l && l.nodeType === 8) if (s = l.data, s === "/$") {
        if (o === 0) {
          e.removeChild(l), Fr(t);
          return;
        }
        o--;
      } else s !== "$" && s !== "$?" && s !== "$!" || o++;
      s = l;
    } while (s);
    Fr(t);
  }
  function dn(e) {
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
  function uc(e) {
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
  var tr = Math.random().toString(36).slice(2), zt = "__reactFiber$" + tr, Jr = "__reactProps$" + tr, Gt = "__reactContainer$" + tr, ia = "__reactEvents$" + tr, Tm = "__reactListeners$" + tr, Im = "__reactHandles$" + tr;
  function Cn(e) {
    var t = e[zt];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[Gt] || s[zt]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = uc(e); e !== null; ) {
          if (s = e[zt]) return s;
          e = uc(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Xr(e) {
    return e = e[zt] || e[Gt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function nr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function ei(e) {
    return e[Jr] || null;
  }
  var oa = [], rr = -1;
  function fn(e) {
    return { current: e };
  }
  function ke(e) {
    0 > rr || (e.current = oa[rr], oa[rr] = null, rr--);
  }
  function xe(e, t) {
    rr++, oa[rr] = e.current, e.current = t;
  }
  var pn = {}, Qe = fn(pn), st = fn(!1), Tn = pn;
  function sr(e, t) {
    var s = e.type.contextTypes;
    if (!s) return pn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var l = {}, c;
    for (c in s) l[c] = t[c];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function it(e) {
    return e = e.childContextTypes, e != null;
  }
  function ti() {
    ke(st), ke(Qe);
  }
  function cc(e, t, s) {
    if (Qe.current !== pn) throw Error(i(168));
    xe(Qe, t), xe(st, s);
  }
  function dc(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, de(e) || "Unknown", l));
    return M({}, s, o);
  }
  function ni(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pn, Tn = Qe.current, xe(Qe, e), xe(st, st.current), !0;
  }
  function fc(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = dc(e, t, Tn), o.__reactInternalMemoizedMergedChildContext = e, ke(st), ke(Qe), xe(Qe, e)) : ke(st), xe(st, s);
  }
  var Yt = null, ri = !1, aa = !1;
  function pc(e) {
    Yt === null ? Yt = [e] : Yt.push(e);
  }
  function Rm(e) {
    ri = !0, pc(e);
  }
  function hn() {
    if (!aa && Yt !== null) {
      aa = !0;
      var e = 0, t = Se;
      try {
        var s = Yt;
        for (Se = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Yt = null, ri = !1;
      } catch (l) {
        throw Yt !== null && (Yt = Yt.slice(e + 1)), mu(Ro, hn), l;
      } finally {
        Se = t, aa = !1;
      }
    }
    return null;
  }
  var ir = [], or = 0, si = null, ii = 0, ht = [], mt = 0, In = null, Qt = 1, qt = "";
  function Rn(e, t) {
    ir[or++] = ii, ir[or++] = si, si = e, ii = t;
  }
  function hc(e, t, s) {
    ht[mt++] = Qt, ht[mt++] = qt, ht[mt++] = In, In = e;
    var o = Qt;
    e = qt;
    var l = 32 - Et(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - Et(t) + l;
    if (30 < c) {
      var f = l - l % 5;
      c = (o & (1 << f) - 1).toString(32), o >>= f, l -= f, Qt = 1 << 32 - Et(t) + l | s << l | o, qt = c + e;
    } else Qt = 1 << c | s << l | o, qt = e;
  }
  function la(e) {
    e.return !== null && (Rn(e, 1), hc(e, 1, 0));
  }
  function ua(e) {
    for (; e === si; ) si = ir[--or], ir[or] = null, ii = ir[--or], ir[or] = null;
    for (; e === In; ) In = ht[--mt], ht[mt] = null, qt = ht[--mt], ht[mt] = null, Qt = ht[--mt], ht[mt] = null;
  }
  var dt = null, ft = null, Te = !1, bt = null;
  function mc(e, t) {
    var s = _t(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function gc(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, dt = e, ft = dn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, dt = e, ft = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = In !== null ? { id: Qt, overflow: qt } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = _t(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, dt = e, ft = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ca(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function da(e) {
    if (Te) {
      var t = ft;
      if (t) {
        var s = t;
        if (!gc(e, t)) {
          if (ca(e)) throw Error(i(418));
          t = dn(s.nextSibling);
          var o = dt;
          t && gc(e, t) ? mc(o, s) : (e.flags = e.flags & -4097 | 2, Te = !1, dt = e);
        }
      } else {
        if (ca(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, Te = !1, dt = e;
      }
    }
  }
  function yc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    dt = e;
  }
  function oi(e) {
    if (e !== dt) return !1;
    if (!Te) return yc(e), Te = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !na(e.type, e.memoizedProps)), t && (t = ft)) {
      if (ca(e)) throw vc(), Error(i(418));
      for (; t; ) mc(e, t), t = dn(t.nextSibling);
    }
    if (yc(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (t === 0) {
                ft = dn(e.nextSibling);
                break e;
              }
              t--;
            } else s !== "$" && s !== "$!" && s !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        ft = null;
      }
    } else ft = dt ? dn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function vc() {
    for (var e = ft; e; ) e = dn(e.nextSibling);
  }
  function ar() {
    ft = dt = null, Te = !1;
  }
  function fa(e) {
    bt === null ? bt = [e] : bt.push(e);
  }
  var Am = oe.ReactCurrentBatchConfig;
  function Zr(e, t, s) {
    if (e = s.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(i(309));
          var o = s.stateNode;
        }
        if (!o) throw Error(i(147, e));
        var l = o, c = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === c ? t.ref : (t = function(f) {
          var g = l.refs;
          f === null ? delete g[c] : g[c] = f;
        }, t._stringRef = c, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!s._owner) throw Error(i(290, e));
    }
    return e;
  }
  function ai(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function _c(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Sc(e) {
    function t(C, E) {
      if (e) {
        var T = C.deletions;
        T === null ? (C.deletions = [E], C.flags |= 16) : T.push(E);
      }
    }
    function s(C, E) {
      if (!e) return null;
      for (; E !== null; ) t(C, E), E = E.sibling;
      return null;
    }
    function o(C, E) {
      for (C = /* @__PURE__ */ new Map(); E !== null; ) E.key !== null ? C.set(E.key, E) : C.set(E.index, E), E = E.sibling;
      return C;
    }
    function l(C, E) {
      return C = xn(C, E), C.index = 0, C.sibling = null, C;
    }
    function c(C, E, T) {
      return C.index = T, e ? (T = C.alternate, T !== null ? (T = T.index, T < E ? (C.flags |= 2, E) : T) : (C.flags |= 2, E)) : (C.flags |= 1048576, E);
    }
    function f(C) {
      return e && C.alternate === null && (C.flags |= 2), C;
    }
    function g(C, E, T, z) {
      return E === null || E.tag !== 6 ? (E = rl(T, C.mode, z), E.return = C, E) : (E = l(E, T), E.return = C, E);
    }
    function S(C, E, T, z) {
      var q = T.type;
      return q === D ? L(C, E, T.props.children, z, T.key) : E !== null && (E.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Me && _c(q) === E.type) ? (z = l(E, T.props), z.ref = Zr(C, E, T), z.return = C, z) : (z = Mi(T.type, T.key, T.props, null, C.mode, z), z.ref = Zr(C, E, T), z.return = C, z);
    }
    function A(C, E, T, z) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== T.containerInfo || E.stateNode.implementation !== T.implementation ? (E = sl(T, C.mode, z), E.return = C, E) : (E = l(E, T.children || []), E.return = C, E);
    }
    function L(C, E, T, z, q) {
      return E === null || E.tag !== 7 ? (E = zn(T, C.mode, z, q), E.return = C, E) : (E = l(E, T), E.return = C, E);
    }
    function O(C, E, T) {
      if (typeof E == "string" && E !== "" || typeof E == "number") return E = rl("" + E, C.mode, T), E.return = C, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case fe:
            return T = Mi(E.type, E.key, E.props, null, C.mode, T), T.ref = Zr(C, null, E), T.return = C, T;
          case J:
            return E = sl(E, C.mode, T), E.return = C, E;
          case Me:
            var z = E._init;
            return O(C, z(E._payload), T);
        }
        if (Ye(E) || ee(E)) return E = zn(E, C.mode, T, null), E.return = C, E;
        ai(C, E);
      }
      return null;
    }
    function j(C, E, T, z) {
      var q = E !== null ? E.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return q !== null ? null : g(C, E, "" + T, z);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case fe:
            return T.key === q ? S(C, E, T, z) : null;
          case J:
            return T.key === q ? A(C, E, T, z) : null;
          case Me:
            return q = T._init, j(
              C,
              E,
              q(T._payload),
              z
            );
        }
        if (Ye(T) || ee(T)) return q !== null ? null : L(C, E, T, z, null);
        ai(C, T);
      }
      return null;
    }
    function H(C, E, T, z, q) {
      if (typeof z == "string" && z !== "" || typeof z == "number") return C = C.get(T) || null, g(E, C, "" + z, q);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case fe:
            return C = C.get(z.key === null ? T : z.key) || null, S(E, C, z, q);
          case J:
            return C = C.get(z.key === null ? T : z.key) || null, A(E, C, z, q);
          case Me:
            var X = z._init;
            return H(C, E, T, X(z._payload), q);
        }
        if (Ye(z) || ee(z)) return C = C.get(T) || null, L(E, C, z, q, null);
        ai(E, z);
      }
      return null;
    }
    function Y(C, E, T, z) {
      for (var q = null, X = null, Z = E, re = E = 0, Ve = null; Z !== null && re < T.length; re++) {
        Z.index > re ? (Ve = Z, Z = null) : Ve = Z.sibling;
        var ye = j(C, Z, T[re], z);
        if (ye === null) {
          Z === null && (Z = Ve);
          break;
        }
        e && Z && ye.alternate === null && t(C, Z), E = c(ye, E, re), X === null ? q = ye : X.sibling = ye, X = ye, Z = Ve;
      }
      if (re === T.length) return s(C, Z), Te && Rn(C, re), q;
      if (Z === null) {
        for (; re < T.length; re++) Z = O(C, T[re], z), Z !== null && (E = c(Z, E, re), X === null ? q = Z : X.sibling = Z, X = Z);
        return Te && Rn(C, re), q;
      }
      for (Z = o(C, Z); re < T.length; re++) Ve = H(Z, C, re, T[re], z), Ve !== null && (e && Ve.alternate !== null && Z.delete(Ve.key === null ? re : Ve.key), E = c(Ve, E, re), X === null ? q = Ve : X.sibling = Ve, X = Ve);
      return e && Z.forEach(function(En) {
        return t(C, En);
      }), Te && Rn(C, re), q;
    }
    function Q(C, E, T, z) {
      var q = ee(T);
      if (typeof q != "function") throw Error(i(150));
      if (T = q.call(T), T == null) throw Error(i(151));
      for (var X = q = null, Z = E, re = E = 0, Ve = null, ye = T.next(); Z !== null && !ye.done; re++, ye = T.next()) {
        Z.index > re ? (Ve = Z, Z = null) : Ve = Z.sibling;
        var En = j(C, Z, ye.value, z);
        if (En === null) {
          Z === null && (Z = Ve);
          break;
        }
        e && Z && En.alternate === null && t(C, Z), E = c(En, E, re), X === null ? q = En : X.sibling = En, X = En, Z = Ve;
      }
      if (ye.done) return s(
        C,
        Z
      ), Te && Rn(C, re), q;
      if (Z === null) {
        for (; !ye.done; re++, ye = T.next()) ye = O(C, ye.value, z), ye !== null && (E = c(ye, E, re), X === null ? q = ye : X.sibling = ye, X = ye);
        return Te && Rn(C, re), q;
      }
      for (Z = o(C, Z); !ye.done; re++, ye = T.next()) ye = H(Z, C, re, ye.value, z), ye !== null && (e && ye.alternate !== null && Z.delete(ye.key === null ? re : ye.key), E = c(ye, E, re), X === null ? q = ye : X.sibling = ye, X = ye);
      return e && Z.forEach(function(ug) {
        return t(C, ug);
      }), Te && Rn(C, re), q;
    }
    function Le(C, E, T, z) {
      if (typeof T == "object" && T !== null && T.type === D && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case fe:
            e: {
              for (var q = T.key, X = E; X !== null; ) {
                if (X.key === q) {
                  if (q = T.type, q === D) {
                    if (X.tag === 7) {
                      s(C, X.sibling), E = l(X, T.props.children), E.return = C, C = E;
                      break e;
                    }
                  } else if (X.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Me && _c(q) === X.type) {
                    s(C, X.sibling), E = l(X, T.props), E.ref = Zr(C, X, T), E.return = C, C = E;
                    break e;
                  }
                  s(C, X);
                  break;
                } else t(C, X);
                X = X.sibling;
              }
              T.type === D ? (E = zn(T.props.children, C.mode, z, T.key), E.return = C, C = E) : (z = Mi(T.type, T.key, T.props, null, C.mode, z), z.ref = Zr(C, E, T), z.return = C, C = z);
            }
            return f(C);
          case J:
            e: {
              for (X = T.key; E !== null; ) {
                if (E.key === X) if (E.tag === 4 && E.stateNode.containerInfo === T.containerInfo && E.stateNode.implementation === T.implementation) {
                  s(C, E.sibling), E = l(E, T.children || []), E.return = C, C = E;
                  break e;
                } else {
                  s(C, E);
                  break;
                }
                else t(C, E);
                E = E.sibling;
              }
              E = sl(T, C.mode, z), E.return = C, C = E;
            }
            return f(C);
          case Me:
            return X = T._init, Le(C, E, X(T._payload), z);
        }
        if (Ye(T)) return Y(C, E, T, z);
        if (ee(T)) return Q(C, E, T, z);
        ai(C, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, E !== null && E.tag === 6 ? (s(C, E.sibling), E = l(E, T), E.return = C, C = E) : (s(C, E), E = rl(T, C.mode, z), E.return = C, C = E), f(C)) : s(C, E);
    }
    return Le;
  }
  var lr = Sc(!0), wc = Sc(!1), li = fn(null), ui = null, ur = null, pa = null;
  function ha() {
    pa = ur = ui = null;
  }
  function ma(e) {
    var t = li.current;
    ke(li), e._currentValue = t;
  }
  function ga(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function cr(e, t) {
    ui = e, pa = ur = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (ot = !0), e.firstContext = null);
  }
  function gt(e) {
    var t = e._currentValue;
    if (pa !== e) if (e = { context: e, memoizedValue: t, next: null }, ur === null) {
      if (ui === null) throw Error(i(308));
      ur = e, ui.dependencies = { lanes: 0, firstContext: e };
    } else ur = ur.next = e;
    return t;
  }
  var An = null;
  function ya(e) {
    An === null ? An = [e] : An.push(e);
  }
  function xc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, ya(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Kt(e, o);
  }
  function Kt(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var mn = !1;
  function va(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Ec(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Jt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function gn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (pe & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Kt(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, ya(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Kt(e, s);
  }
  function ci(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, Po(e, s);
    }
  }
  function kc(e, t) {
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
  function di(e, t, s, o) {
    var l = e.updateQueue;
    mn = !1;
    var c = l.firstBaseUpdate, f = l.lastBaseUpdate, g = l.shared.pending;
    if (g !== null) {
      l.shared.pending = null;
      var S = g, A = S.next;
      S.next = null, f === null ? c = A : f.next = A, f = S;
      var L = e.alternate;
      L !== null && (L = L.updateQueue, g = L.lastBaseUpdate, g !== f && (g === null ? L.firstBaseUpdate = A : g.next = A, L.lastBaseUpdate = S));
    }
    if (c !== null) {
      var O = l.baseState;
      f = 0, L = A = S = null, g = c;
      do {
        var j = g.lane, H = g.eventTime;
        if ((o & j) === j) {
          L !== null && (L = L.next = {
            eventTime: H,
            lane: 0,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null
          });
          e: {
            var Y = e, Q = g;
            switch (j = t, H = s, Q.tag) {
              case 1:
                if (Y = Q.payload, typeof Y == "function") {
                  O = Y.call(H, O, j);
                  break e;
                }
                O = Y;
                break e;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = Q.payload, j = typeof Y == "function" ? Y.call(H, O, j) : Y, j == null) break e;
                O = M({}, O, j);
                break e;
              case 2:
                mn = !0;
            }
          }
          g.callback !== null && g.lane !== 0 && (e.flags |= 64, j = l.effects, j === null ? l.effects = [g] : j.push(g));
        } else H = { eventTime: H, lane: j, tag: g.tag, payload: g.payload, callback: g.callback, next: null }, L === null ? (A = L = H, S = O) : L = L.next = H, f |= j;
        if (g = g.next, g === null) {
          if (g = l.shared.pending, g === null) break;
          j = g, g = j.next, j.next = null, l.lastBaseUpdate = j, l.shared.pending = null;
        }
      } while (!0);
      if (L === null && (S = O), l.baseState = S, l.firstBaseUpdate = A, l.lastBaseUpdate = L, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          f |= l.lane, l = l.next;
        while (l !== t);
      } else c === null && (l.shared.lanes = 0);
      Nn |= f, e.lanes = f, e.memoizedState = O;
    }
  }
  function bc(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = s, typeof l != "function") throw Error(i(191, l));
        l.call(o);
      }
    }
  }
  var es = {}, Dt = fn(es), ts = fn(es), ns = fn(es);
  function Mn(e) {
    if (e === es) throw Error(i(174));
    return e;
  }
  function _a(e, t) {
    switch (xe(ns, t), xe(ts, e), xe(Dt, es), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : So(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = So(t, e);
    }
    ke(Dt), xe(Dt, t);
  }
  function dr() {
    ke(Dt), ke(ts), ke(ns);
  }
  function Cc(e) {
    Mn(ns.current);
    var t = Mn(Dt.current), s = So(t, e.type);
    t !== s && (xe(ts, e), xe(Dt, s));
  }
  function Sa(e) {
    ts.current === e && (ke(Dt), ke(ts));
  }
  var Ie = fn(0);
  function fi(e) {
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
  var wa = [];
  function xa() {
    for (var e = 0; e < wa.length; e++) wa[e]._workInProgressVersionPrimary = null;
    wa.length = 0;
  }
  var pi = oe.ReactCurrentDispatcher, Ea = oe.ReactCurrentBatchConfig, Pn = 0, Re = null, De = null, $e = null, hi = !1, rs = !1, ss = 0, Mm = 0;
  function qe() {
    throw Error(i(321));
  }
  function ka(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!kt(e[s], t[s])) return !1;
    return !0;
  }
  function ba(e, t, s, o, l, c) {
    if (Pn = c, Re = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, pi.current = e === null || e.memoizedState === null ? Lm : Om, e = s(o, l), rs) {
      c = 0;
      do {
        if (rs = !1, ss = 0, 25 <= c) throw Error(i(301));
        c += 1, $e = De = null, t.updateQueue = null, pi.current = zm, e = s(o, l);
      } while (rs);
    }
    if (pi.current = yi, t = De !== null && De.next !== null, Pn = 0, $e = De = Re = null, hi = !1, t) throw Error(i(300));
    return e;
  }
  function Ca() {
    var e = ss !== 0;
    return ss = 0, e;
  }
  function Bt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return $e === null ? Re.memoizedState = $e = e : $e = $e.next = e, $e;
  }
  function yt() {
    if (De === null) {
      var e = Re.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = $e === null ? Re.memoizedState : $e.next;
    if (t !== null) $e = t, De = e;
    else {
      if (e === null) throw Error(i(310));
      De = e, e = { memoizedState: De.memoizedState, baseState: De.baseState, baseQueue: De.baseQueue, queue: De.queue, next: null }, $e === null ? Re.memoizedState = $e = e : $e = $e.next = e;
    }
    return $e;
  }
  function is(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ta(e) {
    var t = yt(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = De, l = o.baseQueue, c = s.pending;
    if (c !== null) {
      if (l !== null) {
        var f = l.next;
        l.next = c.next, c.next = f;
      }
      o.baseQueue = l = c, s.pending = null;
    }
    if (l !== null) {
      c = l.next, o = o.baseState;
      var g = f = null, S = null, A = c;
      do {
        var L = A.lane;
        if ((Pn & L) === L) S !== null && (S = S.next = { lane: 0, action: A.action, hasEagerState: A.hasEagerState, eagerState: A.eagerState, next: null }), o = A.hasEagerState ? A.eagerState : e(o, A.action);
        else {
          var O = {
            lane: L,
            action: A.action,
            hasEagerState: A.hasEagerState,
            eagerState: A.eagerState,
            next: null
          };
          S === null ? (g = S = O, f = o) : S = S.next = O, Re.lanes |= L, Nn |= L;
        }
        A = A.next;
      } while (A !== null && A !== c);
      S === null ? f = o : S.next = g, kt(o, t.memoizedState) || (ot = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = S, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, Re.lanes |= c, Nn |= c, l = l.next;
      while (l !== e);
    } else l === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function Ia(e) {
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
      kt(c, t.memoizedState) || (ot = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), s.lastRenderedState = c;
    }
    return [c, o];
  }
  function Tc() {
  }
  function Ic(e, t) {
    var s = Re, o = yt(), l = t(), c = !kt(o.memoizedState, l);
    if (c && (o.memoizedState = l, ot = !0), o = o.queue, Ra(Mc.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || $e !== null && $e.memoizedState.tag & 1) {
      if (s.flags |= 2048, os(9, Ac.bind(null, s, o, l, t), void 0, null), He === null) throw Error(i(349));
      (Pn & 30) !== 0 || Rc(s, t, l);
    }
    return l;
  }
  function Rc(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = Re.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Re.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function Ac(e, t, s, o) {
    t.value = s, t.getSnapshot = o, Pc(t) && Nc(e);
  }
  function Mc(e, t, s) {
    return s(function() {
      Pc(t) && Nc(e);
    });
  }
  function Pc(e) {
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
    var t = Kt(e, 1);
    t !== null && Rt(t, e, 1, -1);
  }
  function jc(e) {
    var t = Bt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: is, lastRenderedState: e }, t.queue = e, e = e.dispatch = jm.bind(null, Re, e), [t.memoizedState, e];
  }
  function os(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = Re.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Re.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Lc() {
    return yt().memoizedState;
  }
  function mi(e, t, s, o) {
    var l = Bt();
    Re.flags |= e, l.memoizedState = os(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function gi(e, t, s, o) {
    var l = yt();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (De !== null) {
      var f = De.memoizedState;
      if (c = f.destroy, o !== null && ka(o, f.deps)) {
        l.memoizedState = os(t, s, c, o);
        return;
      }
    }
    Re.flags |= e, l.memoizedState = os(1 | t, s, c, o);
  }
  function Oc(e, t) {
    return mi(8390656, 8, e, t);
  }
  function Ra(e, t) {
    return gi(2048, 8, e, t);
  }
  function zc(e, t) {
    return gi(4, 2, e, t);
  }
  function Dc(e, t) {
    return gi(4, 4, e, t);
  }
  function Bc(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Fc(e, t, s) {
    return s = s != null ? s.concat([e]) : null, gi(4, 4, Bc.bind(null, t, e), s);
  }
  function Aa() {
  }
  function Uc(e, t) {
    var s = yt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && ka(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function $c(e, t) {
    var s = yt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && ka(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function Hc(e, t, s) {
    return (Pn & 21) === 0 ? (e.baseState && (e.baseState = !1, ot = !0), e.memoizedState = s) : (kt(s, t) || (s = _u(), Re.lanes |= s, Nn |= s, e.baseState = !0), t);
  }
  function Pm(e, t) {
    var s = Se;
    Se = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = Ea.transition;
    Ea.transition = {};
    try {
      e(!1), t();
    } finally {
      Se = s, Ea.transition = o;
    }
  }
  function Vc() {
    return yt().memoizedState;
  }
  function Nm(e, t, s) {
    var o = Sn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, Wc(e)) Gc(t, s);
    else if (s = xc(e, t, s, o), s !== null) {
      var l = et();
      Rt(s, e, o, l), Yc(s, t, o);
    }
  }
  function jm(e, t, s) {
    var o = Sn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Wc(e)) Gc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var f = t.lastRenderedState, g = c(f, s);
        if (l.hasEagerState = !0, l.eagerState = g, kt(g, f)) {
          var S = t.interleaved;
          S === null ? (l.next = l, ya(t)) : (l.next = S.next, S.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = xc(e, t, l, o), s !== null && (l = et(), Rt(s, e, o, l), Yc(s, t, o));
    }
  }
  function Wc(e) {
    var t = e.alternate;
    return e === Re || t !== null && t === Re;
  }
  function Gc(e, t) {
    rs = hi = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Yc(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, Po(e, s);
    }
  }
  var yi = { readContext: gt, useCallback: qe, useContext: qe, useEffect: qe, useImperativeHandle: qe, useInsertionEffect: qe, useLayoutEffect: qe, useMemo: qe, useReducer: qe, useRef: qe, useState: qe, useDebugValue: qe, useDeferredValue: qe, useTransition: qe, useMutableSource: qe, useSyncExternalStore: qe, useId: qe, unstable_isNewReconciler: !1 }, Lm = { readContext: gt, useCallback: function(e, t) {
    return Bt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: gt, useEffect: Oc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, mi(
      4194308,
      4,
      Bc.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return mi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return mi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = Bt();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = Bt();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Nm.bind(null, Re, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Bt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: jc, useDebugValue: Aa, useDeferredValue: function(e) {
    return Bt().memoizedState = e;
  }, useTransition: function() {
    var e = jc(!1), t = e[0];
    return e = Pm.bind(null, e[1]), Bt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = Re, l = Bt();
    if (Te) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), He === null) throw Error(i(349));
      (Pn & 30) !== 0 || Rc(o, t, s);
    }
    l.memoizedState = s;
    var c = { value: s, getSnapshot: t };
    return l.queue = c, Oc(Mc.bind(
      null,
      o,
      c,
      e
    ), [e]), o.flags |= 2048, os(9, Ac.bind(null, o, c, s, t), void 0, null), s;
  }, useId: function() {
    var e = Bt(), t = He.identifierPrefix;
    if (Te) {
      var s = qt, o = Qt;
      s = (o & ~(1 << 32 - Et(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = ss++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = Mm++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Om = {
    readContext: gt,
    useCallback: Uc,
    useContext: gt,
    useEffect: Ra,
    useImperativeHandle: Fc,
    useInsertionEffect: zc,
    useLayoutEffect: Dc,
    useMemo: $c,
    useReducer: Ta,
    useRef: Lc,
    useState: function() {
      return Ta(is);
    },
    useDebugValue: Aa,
    useDeferredValue: function(e) {
      var t = yt();
      return Hc(t, De.memoizedState, e);
    },
    useTransition: function() {
      var e = Ta(is)[0], t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: Tc,
    useSyncExternalStore: Ic,
    useId: Vc,
    unstable_isNewReconciler: !1
  }, zm = { readContext: gt, useCallback: Uc, useContext: gt, useEffect: Ra, useImperativeHandle: Fc, useInsertionEffect: zc, useLayoutEffect: Dc, useMemo: $c, useReducer: Ia, useRef: Lc, useState: function() {
    return Ia(is);
  }, useDebugValue: Aa, useDeferredValue: function(e) {
    var t = yt();
    return De === null ? t.memoizedState = e : Hc(t, De.memoizedState, e);
  }, useTransition: function() {
    var e = Ia(is)[0], t = yt().memoizedState;
    return [e, t];
  }, useMutableSource: Tc, useSyncExternalStore: Ic, useId: Vc, unstable_isNewReconciler: !1 };
  function Ct(e, t) {
    if (e && e.defaultProps) {
      t = M({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function Ma(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : M({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var vi = { isMounted: function(e) {
    return (e = e._reactInternals) ? bn(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = et(), l = Sn(e), c = Jt(o, l);
    c.payload = t, s != null && (c.callback = s), t = gn(e, c, l), t !== null && (Rt(t, e, l, o), ci(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = et(), l = Sn(e), c = Jt(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = gn(e, c, l), t !== null && (Rt(t, e, l, o), ci(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = et(), o = Sn(e), l = Jt(s, o);
    l.tag = 2, t != null && (l.callback = t), t = gn(e, l, o), t !== null && (Rt(t, e, o, s), ci(t, e, o));
  } };
  function Qc(e, t, s, o, l, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, f) : t.prototype && t.prototype.isPureReactComponent ? !Gr(s, o) || !Gr(l, c) : !0;
  }
  function qc(e, t, s) {
    var o = !1, l = pn, c = t.contextType;
    return typeof c == "object" && c !== null ? c = gt(c) : (l = it(t) ? Tn : Qe.current, o = t.contextTypes, c = (o = o != null) ? sr(e, l) : pn), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = vi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Kc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && vi.enqueueReplaceState(t, t.state, null);
  }
  function Pa(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, va(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = gt(c) : (c = it(t) ? Tn : Qe.current, l.context = sr(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Ma(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && vi.enqueueReplaceState(l, l.state, null), di(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function fr(e, t) {
    try {
      var s = "", o = t;
      do
        s += ae(o), o = o.return;
      while (o);
      var l = s;
    } catch (c) {
      l = `
Error generating stack: ` + c.message + `
` + c.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function Na(e, t, s) {
    return { value: e, source: null, stack: s ?? null, digest: t ?? null };
  }
  function ja(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var Dm = typeof WeakMap == "function" ? WeakMap : Map;
  function Jc(e, t, s) {
    s = Jt(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      bi || (bi = !0, qa = o), ja(e, t);
    }, s;
  }
  function Xc(e, t, s) {
    s = Jt(-1, s), s.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var l = t.value;
      s.payload = function() {
        return o(l);
      }, s.callback = function() {
        ja(e, t);
      };
    }
    var c = e.stateNode;
    return c !== null && typeof c.componentDidCatch == "function" && (s.callback = function() {
      ja(e, t), typeof o != "function" && (vn === null ? vn = /* @__PURE__ */ new Set([this]) : vn.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), s;
  }
  function Zc(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Dm();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = Xm.bind(null, e, t, s), t.then(e, e));
  }
  function ed(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function td(e, t, s, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = Jt(-1, 1), t.tag = 2, gn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var Bm = oe.ReactCurrentOwner, ot = !1;
  function Ze(e, t, s, o) {
    t.child = e === null ? wc(t, null, s, o) : lr(t, e.child, s, o);
  }
  function nd(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return cr(t, l), o = ba(e, t, s, o, c, l), s = Ca(), e !== null && !ot ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xt(e, t, l)) : (Te && s && la(t), t.flags |= 1, Ze(e, t, o, l), t.child);
  }
  function rd(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !nl(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, sd(e, t, c, o, l)) : (e = Mi(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var f = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Gr, s(f, o) && e.ref === t.ref) return Xt(e, t, l);
    }
    return t.flags |= 1, e = xn(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function sd(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Gr(c, o) && e.ref === t.ref) if (ot = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (ot = !0);
      else return t.lanes = e.lanes, Xt(e, t, l);
    }
    return La(e, t, s, o, l);
  }
  function id(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, xe(hr, pt), pt |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, xe(hr, pt), pt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, xe(hr, pt), pt |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, xe(hr, pt), pt |= o;
    return Ze(e, t, l, s), t.child;
  }
  function od(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function La(e, t, s, o, l) {
    var c = it(s) ? Tn : Qe.current;
    return c = sr(t, c), cr(t, l), s = ba(e, t, s, o, c, l), o = Ca(), e !== null && !ot ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xt(e, t, l)) : (Te && o && la(t), t.flags |= 1, Ze(e, t, s, l), t.child);
  }
  function ad(e, t, s, o, l) {
    if (it(s)) {
      var c = !0;
      ni(t);
    } else c = !1;
    if (cr(t, l), t.stateNode === null) Si(e, t), qc(t, s, o), Pa(t, s, o, l), o = !0;
    else if (e === null) {
      var f = t.stateNode, g = t.memoizedProps;
      f.props = g;
      var S = f.context, A = s.contextType;
      typeof A == "object" && A !== null ? A = gt(A) : (A = it(s) ? Tn : Qe.current, A = sr(t, A));
      var L = s.getDerivedStateFromProps, O = typeof L == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      O || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== o || S !== A) && Kc(t, f, o, A), mn = !1;
      var j = t.memoizedState;
      f.state = j, di(t, o, f, l), S = t.memoizedState, g !== o || j !== S || st.current || mn ? (typeof L == "function" && (Ma(t, s, L, o), S = t.memoizedState), (g = mn || Qc(t, s, g, o, j, S, A)) ? (O || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = S), f.props = o, f.state = S, f.context = A, o = g) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, Ec(e, t), g = t.memoizedProps, A = t.type === t.elementType ? g : Ct(t.type, g), f.props = A, O = t.pendingProps, j = f.context, S = s.contextType, typeof S == "object" && S !== null ? S = gt(S) : (S = it(s) ? Tn : Qe.current, S = sr(t, S));
      var H = s.getDerivedStateFromProps;
      (L = typeof H == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== O || j !== S) && Kc(t, f, o, S), mn = !1, j = t.memoizedState, f.state = j, di(t, o, f, l);
      var Y = t.memoizedState;
      g !== O || j !== Y || st.current || mn ? (typeof H == "function" && (Ma(t, s, H, o), Y = t.memoizedState), (A = mn || Qc(t, s, A, o, j, Y, S) || !1) ? (L || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, Y, S), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, Y, S)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = Y), f.props = o, f.state = Y, f.context = S, o = A) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Oa(e, t, s, o, c, l);
  }
  function Oa(e, t, s, o, l, c) {
    od(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return l && fc(t, s, !1), Xt(e, t, c);
    o = t.stateNode, Bm.current = t;
    var g = f && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = lr(t, e.child, null, c), t.child = lr(t, null, g, c)) : Ze(e, t, g, c), t.memoizedState = o.state, l && fc(t, s, !0), t.child;
  }
  function ld(e) {
    var t = e.stateNode;
    t.pendingContext ? cc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && cc(e, t.context, !1), _a(e, t.containerInfo);
  }
  function ud(e, t, s, o, l) {
    return ar(), fa(l), t.flags |= 256, Ze(e, t, s, o), t.child;
  }
  var za = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Da(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function cd(e, t, s) {
    var o = t.pendingProps, l = Ie.current, c = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), g ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), xe(Ie, l & 1), e === null)
      return da(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = f) : c = Pi(f, o, 0, null), e = zn(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = Da(s), t.memoizedState = za, e) : Ba(t, f));
    if (l = e.memoizedState, l !== null && (g = l.dehydrated, g !== null)) return Fm(e, t, f, o, g, l, s);
    if (c) {
      c = o.fallback, f = t.mode, l = e.child, g = l.sibling;
      var S = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = S, t.deletions = null) : (o = xn(l, S), o.subtreeFlags = l.subtreeFlags & 14680064), g !== null ? c = xn(g, c) : (c = zn(c, f, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, f = e.child.memoizedState, f = f === null ? Da(s) : { baseLanes: f.baseLanes | s, cachePool: null, transitions: f.transitions }, c.memoizedState = f, c.childLanes = e.childLanes & ~s, t.memoizedState = za, o;
    }
    return c = e.child, e = c.sibling, o = xn(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Ba(e, t) {
    return t = Pi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function _i(e, t, s, o) {
    return o !== null && fa(o), lr(t, e.child, null, s), e = Ba(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Fm(e, t, s, o, l, c, f) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = Na(Error(i(422))), _i(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Pi({ mode: "visible", children: o.children }, l, 0, null), c = zn(c, l, f, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && lr(t, e.child, null, f), t.child.memoizedState = Da(f), t.memoizedState = za, c);
    if ((t.mode & 1) === 0) return _i(e, t, f, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var g = o.dgst;
      return o = g, c = Error(i(419)), o = Na(c, o, void 0), _i(e, t, f, o);
    }
    if (g = (f & e.childLanes) !== 0, ot || g) {
      if (o = He, o !== null) {
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
        l = (l & (o.suspendedLanes | f)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Kt(e, l), Rt(o, e, l, -1));
      }
      return tl(), o = Na(Error(i(421))), _i(e, t, f, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Zm.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, ft = dn(l.nextSibling), dt = t, Te = !0, bt = null, e !== null && (ht[mt++] = Qt, ht[mt++] = qt, ht[mt++] = In, Qt = e.id, qt = e.overflow, In = t), t = Ba(t, o.children), t.flags |= 4096, t);
  }
  function dd(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), ga(e.return, t, s);
  }
  function Fa(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function fd(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (Ze(e, t, o.children, s), o = Ie.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && dd(e, s, t);
        else if (e.tag === 19) dd(e, s, t);
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
    if (xe(Ie, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (s = t.child, l = null; s !== null; ) e = s.alternate, e !== null && fi(e) === null && (l = s), s = s.sibling;
        s = l, s === null ? (l = t.child, t.child = null) : (l = s.sibling, s.sibling = null), Fa(t, !1, l, s, c);
        break;
      case "backwards":
        for (s = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && fi(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = s, s = l, l = e;
        }
        Fa(t, !0, s, null, c);
        break;
      case "together":
        Fa(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Si(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Xt(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), Nn |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = xn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = xn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function Um(e, t, s) {
    switch (t.tag) {
      case 3:
        ld(t), ar();
        break;
      case 5:
        Cc(t);
        break;
      case 1:
        it(t.type) && ni(t);
        break;
      case 4:
        _a(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        xe(li, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (xe(Ie, Ie.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? cd(e, t, s) : (xe(Ie, Ie.current & 1), e = Xt(e, t, s), e !== null ? e.sibling : null);
        xe(Ie, Ie.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return fd(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), xe(Ie, Ie.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, id(e, t, s);
    }
    return Xt(e, t, s);
  }
  var pd, Ua, hd, md;
  pd = function(e, t) {
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
  }, Ua = function() {
  }, hd = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, Mn(Dt.current);
      var c = null;
      switch (s) {
        case "input":
          l = Tr(e, l), o = Tr(e, o), c = [];
          break;
        case "select":
          l = M({}, l, { value: void 0 }), o = M({}, o, { value: void 0 }), c = [];
          break;
        case "textarea":
          l = Vt(e, l), o = Vt(e, o), c = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Zs);
      }
      wo(s, o);
      var f;
      s = null;
      for (A in l) if (!o.hasOwnProperty(A) && l.hasOwnProperty(A) && l[A] != null) if (A === "style") {
        var g = l[A];
        for (f in g) g.hasOwnProperty(f) && (s || (s = {}), s[f] = "");
      } else A !== "dangerouslySetInnerHTML" && A !== "children" && A !== "suppressContentEditableWarning" && A !== "suppressHydrationWarning" && A !== "autoFocus" && (u.hasOwnProperty(A) ? c || (c = []) : (c = c || []).push(A, null));
      for (A in o) {
        var S = o[A];
        if (g = l?.[A], o.hasOwnProperty(A) && S !== g && (S != null || g != null)) if (A === "style") if (g) {
          for (f in g) !g.hasOwnProperty(f) || S && S.hasOwnProperty(f) || (s || (s = {}), s[f] = "");
          for (f in S) S.hasOwnProperty(f) && g[f] !== S[f] && (s || (s = {}), s[f] = S[f]);
        } else s || (c || (c = []), c.push(
          A,
          s
        )), s = S;
        else A === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, g = g ? g.__html : void 0, S != null && g !== S && (c = c || []).push(A, S)) : A === "children" ? typeof S != "string" && typeof S != "number" || (c = c || []).push(A, "" + S) : A !== "suppressContentEditableWarning" && A !== "suppressHydrationWarning" && (u.hasOwnProperty(A) ? (S != null && A === "onScroll" && Ee("scroll", e), c || g === S || (c = [])) : (c = c || []).push(A, S));
      }
      s && (c = c || []).push("style", s);
      var A = c;
      (t.updateQueue = A) && (t.flags |= 4);
    }
  }, md = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function as(e, t) {
    if (!Te) switch (e.tailMode) {
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
  function Ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = s, t;
  }
  function $m(e, t, s) {
    var o = t.pendingProps;
    switch (ua(t), t.tag) {
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
        return Ke(t), null;
      case 1:
        return it(t.type) && ti(), Ke(t), null;
      case 3:
        return o = t.stateNode, dr(), ke(st), ke(Qe), xa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (oi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, bt !== null && (Xa(bt), bt = null))), Ua(e, t), Ke(t), null;
      case 5:
        Sa(t);
        var l = Mn(ns.current);
        if (s = t.type, e !== null && t.stateNode != null) hd(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return Ke(t), null;
          }
          if (e = Mn(Dt.current), oi(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[zt] = t, o[Jr] = c, e = (t.mode & 1) !== 0, s) {
              case "dialog":
                Ee("cancel", o), Ee("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ee("load", o);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Qr.length; l++) Ee(Qr[l], o);
                break;
              case "source":
                Ee("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Ee(
                  "error",
                  o
                ), Ee("load", o);
                break;
              case "details":
                Ee("toggle", o);
                break;
              case "input":
                As(o, c), Ee("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, Ee("invalid", o);
                break;
              case "textarea":
                Wt(o, c), Ee("invalid", o);
            }
            wo(s, c), l = null;
            for (var f in c) if (c.hasOwnProperty(f)) {
              var g = c[f];
              f === "children" ? typeof g == "string" ? o.textContent !== g && (c.suppressHydrationWarning !== !0 && Xs(o.textContent, g, e), l = ["children", g]) : typeof g == "number" && o.textContent !== "" + g && (c.suppressHydrationWarning !== !0 && Xs(
                o.textContent,
                g,
                e
              ), l = ["children", "" + g]) : u.hasOwnProperty(f) && g != null && f === "onScroll" && Ee("scroll", o);
            }
            switch (s) {
              case "input":
                kn(o), Oe(o, c, !0);
                break;
              case "textarea":
                kn(o), eu(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = Zs);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            f = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = tu(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(s, { is: o.is }) : (e = f.createElement(s), s === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, s), e[zt] = t, e[Jr] = o, pd(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = xo(s, o), s) {
                case "dialog":
                  Ee("cancel", e), Ee("close", e), l = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Ee("load", e), l = o;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < Qr.length; l++) Ee(Qr[l], e);
                  l = o;
                  break;
                case "source":
                  Ee("error", e), l = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Ee(
                    "error",
                    e
                  ), Ee("load", e), l = o;
                  break;
                case "details":
                  Ee("toggle", e), l = o;
                  break;
                case "input":
                  As(e, o), l = Tr(e, o), Ee("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = M({}, o, { value: void 0 }), Ee("invalid", e);
                  break;
                case "textarea":
                  Wt(e, o), l = Vt(e, o), Ee("invalid", e);
                  break;
                default:
                  l = o;
              }
              wo(s, l), g = l;
              for (c in g) if (g.hasOwnProperty(c)) {
                var S = g[c];
                c === "style" ? su(e, S) : c === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, S != null && nu(e, S)) : c === "children" ? typeof S == "string" ? (s !== "textarea" || S !== "") && Rr(e, S) : typeof S == "number" && Rr(e, "" + S) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? S != null && c === "onScroll" && Ee("scroll", e) : S != null && te(e, c, S, f));
              }
              switch (s) {
                case "input":
                  kn(e), Oe(e, o, !1);
                  break;
                case "textarea":
                  kn(e), eu(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ge(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, c = o.value, c != null ? rt(e, !!o.multiple, c, !1) : o.defaultValue != null && rt(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Zs);
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
        return Ke(t), null;
      case 6:
        if (e && t.stateNode != null) md(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = Mn(ns.current), Mn(Dt.current), oi(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[zt] = t, (c = o.nodeValue !== s) && (e = dt, e !== null)) switch (e.tag) {
              case 3:
                Xs(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Xs(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[zt] = t, t.stateNode = o;
        }
        return Ke(t), null;
      case 13:
        if (ke(Ie), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Te && ft !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) vc(), ar(), t.flags |= 98560, c = !1;
          else if (c = oi(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[zt] = t;
            } else ar(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ke(t), c = !1;
          } else bt !== null && (Xa(bt), bt = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Ie.current & 1) !== 0 ? Be === 0 && (Be = 3) : tl())), t.updateQueue !== null && (t.flags |= 4), Ke(t), null);
      case 4:
        return dr(), Ua(e, t), e === null && qr(t.stateNode.containerInfo), Ke(t), null;
      case 10:
        return ma(t.type._context), Ke(t), null;
      case 17:
        return it(t.type) && ti(), Ke(t), null;
      case 19:
        if (ke(Ie), c = t.memoizedState, c === null) return Ke(t), null;
        if (o = (t.flags & 128) !== 0, f = c.rendering, f === null) if (o) as(c, !1);
        else {
          if (Be !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = fi(e), f !== null) {
              for (t.flags |= 128, as(c, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, f = c.alternate, f === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f.childLanes, c.lanes = f.lanes, c.child = f.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f.memoizedProps, c.memoizedState = f.memoizedState, c.updateQueue = f.updateQueue, c.type = f.type, e = f.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return xe(Ie, Ie.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && je() > mr && (t.flags |= 128, o = !0, as(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = fi(f), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), as(c, !0), c.tail === null && c.tailMode === "hidden" && !f.alternate && !Te) return Ke(t), null;
          } else 2 * je() - c.renderingStartTime > mr && s !== 1073741824 && (t.flags |= 128, o = !0, as(c, !1), t.lanes = 4194304);
          c.isBackwards ? (f.sibling = t.child, t.child = f) : (s = c.last, s !== null ? s.sibling = f : t.child = f, c.last = f);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = je(), t.sibling = null, s = Ie.current, xe(Ie, o ? s & 1 | 2 : s & 1), t) : (Ke(t), null);
      case 22:
      case 23:
        return el(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (pt & 1073741824) !== 0 && (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ke(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Hm(e, t) {
    switch (ua(t), t.tag) {
      case 1:
        return it(t.type) && ti(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return dr(), ke(st), ke(Qe), xa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Sa(t), null;
      case 13:
        if (ke(Ie), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          ar();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ke(Ie), null;
      case 4:
        return dr(), null;
      case 10:
        return ma(t.type._context), null;
      case 22:
      case 23:
        return el(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var wi = !1, Je = !1, Vm = typeof WeakSet == "function" ? WeakSet : Set, W = null;
  function pr(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      Ne(e, t, o);
    }
    else s.current = null;
  }
  function $a(e, t, s) {
    try {
      s();
    } catch (o) {
      Ne(e, t, o);
    }
  }
  var gd = !1;
  function Wm(e, t) {
    if (ea = Us, e = Qu(), Go(e)) {
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
          var f = 0, g = -1, S = -1, A = 0, L = 0, O = e, j = null;
          t: for (; ; ) {
            for (var H; O !== s || l !== 0 && O.nodeType !== 3 || (g = f + l), O !== c || o !== 0 && O.nodeType !== 3 || (S = f + o), O.nodeType === 3 && (f += O.nodeValue.length), (H = O.firstChild) !== null; )
              j = O, O = H;
            for (; ; ) {
              if (O === e) break t;
              if (j === s && ++A === l && (g = f), j === c && ++L === o && (S = f), (H = O.nextSibling) !== null) break;
              O = j, j = O.parentNode;
            }
            O = H;
          }
          s = g === -1 || S === -1 ? null : { start: g, end: S };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (ta = { focusedElem: e, selectionRange: s }, Us = !1, W = t; W !== null; ) if (t = W, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, W = e;
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
              var Q = Y.memoizedProps, Le = Y.memoizedState, C = t.stateNode, E = C.getSnapshotBeforeUpdate(t.elementType === t.type ? Q : Ct(t.type, Q), Le);
              C.__reactInternalSnapshotBeforeUpdate = E;
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
        Ne(t, t.return, z);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, W = e;
        break;
      }
      W = t.return;
    }
    return Y = gd, gd = !1, Y;
  }
  function ls(e, t, s) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy;
          l.destroy = void 0, c !== void 0 && $a(t, s, c);
        }
        l = l.next;
      } while (l !== o);
    }
  }
  function xi(e, t) {
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
  function Ha(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function yd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, yd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[zt], delete t[Jr], delete t[ia], delete t[Tm], delete t[Im])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function vd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function _d(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || vd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Va(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = Zs));
    else if (o !== 4 && (e = e.child, e !== null)) for (Va(e, t, s), e = e.sibling; e !== null; ) Va(e, t, s), e = e.sibling;
  }
  function Wa(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Wa(e, t, s), e = e.sibling; e !== null; ) Wa(e, t, s), e = e.sibling;
  }
  var We = null, Tt = !1;
  function yn(e, t, s) {
    for (s = s.child; s !== null; ) Sd(e, t, s), s = s.sibling;
  }
  function Sd(e, t, s) {
    if (Ot && typeof Ot.onCommitFiberUnmount == "function") try {
      Ot.onCommitFiberUnmount(Ls, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        Je || pr(s, t);
      case 6:
        var o = We, l = Tt;
        We = null, yn(e, t, s), We = o, Tt = l, We !== null && (Tt ? (e = We, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : We.removeChild(s.stateNode));
        break;
      case 18:
        We !== null && (Tt ? (e = We, s = s.stateNode, e.nodeType === 8 ? sa(e.parentNode, s) : e.nodeType === 1 && sa(e, s), Fr(e)) : sa(We, s.stateNode));
        break;
      case 4:
        o = We, l = Tt, We = s.stateNode.containerInfo, Tt = !0, yn(e, t, s), We = o, Tt = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Je && (o = s.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var c = l, f = c.destroy;
            c = c.tag, f !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && $a(s, t, f), l = l.next;
          } while (l !== o);
        }
        yn(e, t, s);
        break;
      case 1:
        if (!Je && (pr(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = s.memoizedProps, o.state = s.memoizedState, o.componentWillUnmount();
        } catch (g) {
          Ne(s, t, g);
        }
        yn(e, t, s);
        break;
      case 21:
        yn(e, t, s);
        break;
      case 22:
        s.mode & 1 ? (Je = (o = Je) || s.memoizedState !== null, yn(e, t, s), Je = o) : yn(e, t, s);
        break;
      default:
        yn(e, t, s);
    }
  }
  function wd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Vm()), t.forEach(function(o) {
        var l = eg.bind(null, e, o);
        s.has(o) || (s.add(o), o.then(l, l));
      });
    }
  }
  function It(e, t) {
    var s = t.deletions;
    if (s !== null) for (var o = 0; o < s.length; o++) {
      var l = s[o];
      try {
        var c = e, f = t, g = f;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 5:
              We = g.stateNode, Tt = !1;
              break e;
            case 3:
              We = g.stateNode.containerInfo, Tt = !0;
              break e;
            case 4:
              We = g.stateNode.containerInfo, Tt = !0;
              break e;
          }
          g = g.return;
        }
        if (We === null) throw Error(i(160));
        Sd(c, f, l), We = null, Tt = !1;
        var S = l.alternate;
        S !== null && (S.return = null), l.return = null;
      } catch (A) {
        Ne(l, t, A);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) xd(t, e), t = t.sibling;
  }
  function xd(e, t) {
    var s = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (It(t, e), Ft(e), o & 4) {
          try {
            ls(3, e, e.return), xi(3, e);
          } catch (Q) {
            Ne(e, e.return, Q);
          }
          try {
            ls(5, e, e.return);
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        break;
      case 1:
        It(t, e), Ft(e), o & 512 && s !== null && pr(s, s.return);
        break;
      case 5:
        if (It(t, e), Ft(e), o & 512 && s !== null && pr(s, s.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Rr(l, "");
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, f = s !== null ? s.memoizedProps : c, g = e.type, S = e.updateQueue;
          if (e.updateQueue = null, S !== null) try {
            g === "input" && c.type === "radio" && c.name != null && Ir(l, c), xo(g, f);
            var A = xo(g, c);
            for (f = 0; f < S.length; f += 2) {
              var L = S[f], O = S[f + 1];
              L === "style" ? su(l, O) : L === "dangerouslySetInnerHTML" ? nu(l, O) : L === "children" ? Rr(l, O) : te(l, L, O, A);
            }
            switch (g) {
              case "input":
                xt(l, c);
                break;
              case "textarea":
                Zl(l, c);
                break;
              case "select":
                var j = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var H = c.value;
                H != null ? rt(l, !!c.multiple, H, !1) : j !== !!c.multiple && (c.defaultValue != null ? rt(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : rt(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[Jr] = c;
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        break;
      case 6:
        if (It(t, e), Ft(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (Q) {
            Ne(e, e.return, Q);
          }
        }
        break;
      case 3:
        if (It(t, e), Ft(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Fr(t.containerInfo);
        } catch (Q) {
          Ne(e, e.return, Q);
        }
        break;
      case 4:
        It(t, e), Ft(e);
        break;
      case 13:
        It(t, e), Ft(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Qa = je())), o & 4 && wd(e);
        break;
      case 22:
        if (L = s !== null && s.memoizedState !== null, e.mode & 1 ? (Je = (A = Je) || L, It(t, e), Je = A) : It(t, e), Ft(e), o & 8192) {
          if (A = e.memoizedState !== null, (e.stateNode.isHidden = A) && !L && (e.mode & 1) !== 0) for (W = e, L = e.child; L !== null; ) {
            for (O = W = L; W !== null; ) {
              switch (j = W, H = j.child, j.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ls(4, j, j.return);
                  break;
                case 1:
                  pr(j, j.return);
                  var Y = j.stateNode;
                  if (typeof Y.componentWillUnmount == "function") {
                    o = j, s = j.return;
                    try {
                      t = o, Y.props = t.memoizedProps, Y.state = t.memoizedState, Y.componentWillUnmount();
                    } catch (Q) {
                      Ne(o, s, Q);
                    }
                  }
                  break;
                case 5:
                  pr(j, j.return);
                  break;
                case 22:
                  if (j.memoizedState !== null) {
                    bd(O);
                    continue;
                  }
              }
              H !== null ? (H.return = j, W = H) : bd(O);
            }
            L = L.sibling;
          }
          e: for (L = null, O = e; ; ) {
            if (O.tag === 5) {
              if (L === null) {
                L = O;
                try {
                  l = O.stateNode, A ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (g = O.stateNode, S = O.memoizedProps.style, f = S != null && S.hasOwnProperty("display") ? S.display : null, g.style.display = ru("display", f));
                } catch (Q) {
                  Ne(e, e.return, Q);
                }
              }
            } else if (O.tag === 6) {
              if (L === null) try {
                O.stateNode.nodeValue = A ? "" : O.memoizedProps;
              } catch (Q) {
                Ne(e, e.return, Q);
              }
            } else if ((O.tag !== 22 && O.tag !== 23 || O.memoizedState === null || O === e) && O.child !== null) {
              O.child.return = O, O = O.child;
              continue;
            }
            if (O === e) break e;
            for (; O.sibling === null; ) {
              if (O.return === null || O.return === e) break e;
              L === O && (L = null), O = O.return;
            }
            L === O && (L = null), O.sibling.return = O.return, O = O.sibling;
          }
        }
        break;
      case 19:
        It(t, e), Ft(e), o & 4 && wd(e);
        break;
      case 21:
        break;
      default:
        It(
          t,
          e
        ), Ft(e);
    }
  }
  function Ft(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var s = e.return; s !== null; ) {
            if (vd(s)) {
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
            o.flags & 32 && (Rr(l, ""), o.flags &= -33);
            var c = _d(e);
            Wa(e, c, l);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, g = _d(e);
            Va(e, g, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (S) {
        Ne(e, e.return, S);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Gm(e, t, s) {
    W = e, Ed(e);
  }
  function Ed(e, t, s) {
    for (var o = (e.mode & 1) !== 0; W !== null; ) {
      var l = W, c = l.child;
      if (l.tag === 22 && o) {
        var f = l.memoizedState !== null || wi;
        if (!f) {
          var g = l.alternate, S = g !== null && g.memoizedState !== null || Je;
          g = wi;
          var A = Je;
          if (wi = f, (Je = S) && !A) for (W = l; W !== null; ) f = W, S = f.child, f.tag === 22 && f.memoizedState !== null ? Cd(l) : S !== null ? (S.return = f, W = S) : Cd(l);
          for (; c !== null; ) W = c, Ed(c), c = c.sibling;
          W = l, wi = g, Je = A;
        }
        kd(e);
      } else (l.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = l, W = c) : kd(e);
    }
  }
  function kd(e) {
    for (; W !== null; ) {
      var t = W;
      if ((t.flags & 8772) !== 0) {
        var s = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Je || xi(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !Je) if (s === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? s.memoizedProps : Ct(t.type, s.memoizedProps);
                o.componentDidUpdate(l, s.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var c = t.updateQueue;
              c !== null && bc(t, c, o);
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
                bc(t, f, s);
              }
              break;
            case 5:
              var g = t.stateNode;
              if (s === null && t.flags & 4) {
                s = g;
                var S = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    S.autoFocus && s.focus();
                    break;
                  case "img":
                    S.src && (s.src = S.src);
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
                var A = t.alternate;
                if (A !== null) {
                  var L = A.memoizedState;
                  if (L !== null) {
                    var O = L.dehydrated;
                    O !== null && Fr(O);
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
          Je || t.flags & 512 && Ha(t);
        } catch (j) {
          Ne(t, t.return, j);
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
  function bd(e) {
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
  function Cd(e) {
    for (; W !== null; ) {
      var t = W;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              xi(4, t);
            } catch (S) {
              Ne(t, s, S);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (S) {
                Ne(t, l, S);
              }
            }
            var c = t.return;
            try {
              Ha(t);
            } catch (S) {
              Ne(t, c, S);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Ha(t);
            } catch (S) {
              Ne(t, f, S);
            }
        }
      } catch (S) {
        Ne(t, t.return, S);
      }
      if (t === e) {
        W = null;
        break;
      }
      var g = t.sibling;
      if (g !== null) {
        g.return = t.return, W = g;
        break;
      }
      W = t.return;
    }
  }
  var Ym = Math.ceil, Ei = oe.ReactCurrentDispatcher, Ga = oe.ReactCurrentOwner, vt = oe.ReactCurrentBatchConfig, pe = 0, He = null, ze = null, Ge = 0, pt = 0, hr = fn(0), Be = 0, us = null, Nn = 0, ki = 0, Ya = 0, cs = null, at = null, Qa = 0, mr = 1 / 0, Zt = null, bi = !1, qa = null, vn = null, Ci = !1, _n = null, Ti = 0, ds = 0, Ka = null, Ii = -1, Ri = 0;
  function et() {
    return (pe & 6) !== 0 ? je() : Ii !== -1 ? Ii : Ii = je();
  }
  function Sn(e) {
    return (e.mode & 1) === 0 ? 1 : (pe & 2) !== 0 && Ge !== 0 ? Ge & -Ge : Am.transition !== null ? (Ri === 0 && (Ri = _u()), Ri) : (e = Se, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Iu(e.type)), e);
  }
  function Rt(e, t, s, o) {
    if (50 < ds) throw ds = 0, Ka = null, Error(i(185));
    Lr(e, s, o), ((pe & 2) === 0 || e !== He) && (e === He && ((pe & 2) === 0 && (ki |= s), Be === 4 && wn(e, Ge)), lt(e, o), s === 1 && pe === 0 && (t.mode & 1) === 0 && (mr = je() + 500, ri && hn()));
  }
  function lt(e, t) {
    var s = e.callbackNode;
    Ah(e, t);
    var o = Ds(e, e === He ? Ge : 0);
    if (o === 0) s !== null && gu(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && gu(s), t === 1) e.tag === 0 ? Rm(Id.bind(null, e)) : pc(Id.bind(null, e)), bm(function() {
        (pe & 6) === 0 && hn();
      }), s = null;
      else {
        switch (Su(o)) {
          case 1:
            s = Ro;
            break;
          case 4:
            s = yu;
            break;
          case 16:
            s = js;
            break;
          case 536870912:
            s = vu;
            break;
          default:
            s = js;
        }
        s = Od(s, Td.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function Td(e, t) {
    if (Ii = -1, Ri = 0, (pe & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (gr() && e.callbackNode !== s) return null;
    var o = Ds(e, e === He ? Ge : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = Ai(e, o);
    else {
      t = o;
      var l = pe;
      pe |= 2;
      var c = Ad();
      (He !== e || Ge !== t) && (Zt = null, mr = je() + 500, Ln(e, t));
      do
        try {
          Km();
          break;
        } catch (g) {
          Rd(e, g);
        }
      while (!0);
      ha(), Ei.current = c, pe = l, ze !== null ? t = 0 : (He = null, Ge = 0, t = Be);
    }
    if (t !== 0) {
      if (t === 2 && (l = Ao(e), l !== 0 && (o = l, t = Ja(e, l))), t === 1) throw s = us, Ln(e, 0), wn(e, o), lt(e, je()), s;
      if (t === 6) wn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !Qm(l) && (t = Ai(e, o), t === 2 && (c = Ao(e), c !== 0 && (o = c, t = Ja(e, c))), t === 1)) throw s = us, Ln(e, 0), wn(e, o), lt(e, je()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            On(e, at, Zt);
            break;
          case 3:
            if (wn(e, o), (o & 130023424) === o && (t = Qa + 500 - je(), 10 < t)) {
              if (Ds(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                et(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = ra(On.bind(null, e, at, Zt), t);
              break;
            }
            On(e, at, Zt);
            break;
          case 4:
            if (wn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var f = 31 - Et(o);
              c = 1 << f, f = t[f], f > l && (l = f), o &= ~c;
            }
            if (o = l, o = je() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Ym(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = ra(On.bind(null, e, at, Zt), o);
              break;
            }
            On(e, at, Zt);
            break;
          case 5:
            On(e, at, Zt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return lt(e, je()), e.callbackNode === s ? Td.bind(null, e) : null;
  }
  function Ja(e, t) {
    var s = cs;
    return e.current.memoizedState.isDehydrated && (Ln(e, t).flags |= 256), e = Ai(e, t), e !== 2 && (t = at, at = s, t !== null && Xa(t)), e;
  }
  function Xa(e) {
    at === null ? at = e : at.push.apply(at, e);
  }
  function Qm(e) {
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
  function wn(e, t) {
    for (t &= ~Ya, t &= ~ki, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var s = 31 - Et(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function Id(e) {
    if ((pe & 6) !== 0) throw Error(i(327));
    gr();
    var t = Ds(e, 0);
    if ((t & 1) === 0) return lt(e, je()), null;
    var s = Ai(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = Ao(e);
      o !== 0 && (t = o, s = Ja(e, o));
    }
    if (s === 1) throw s = us, Ln(e, 0), wn(e, t), lt(e, je()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, On(e, at, Zt), lt(e, je()), null;
  }
  function Za(e, t) {
    var s = pe;
    pe |= 1;
    try {
      return e(t);
    } finally {
      pe = s, pe === 0 && (mr = je() + 500, ri && hn());
    }
  }
  function jn(e) {
    _n !== null && _n.tag === 0 && (pe & 6) === 0 && gr();
    var t = pe;
    pe |= 1;
    var s = vt.transition, o = Se;
    try {
      if (vt.transition = null, Se = 1, e) return e();
    } finally {
      Se = o, vt.transition = s, pe = t, (pe & 6) === 0 && hn();
    }
  }
  function el() {
    pt = hr.current, ke(hr);
  }
  function Ln(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, km(s)), ze !== null) for (s = ze.return; s !== null; ) {
      var o = s;
      switch (ua(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && ti();
          break;
        case 3:
          dr(), ke(st), ke(Qe), xa();
          break;
        case 5:
          Sa(o);
          break;
        case 4:
          dr();
          break;
        case 13:
          ke(Ie);
          break;
        case 19:
          ke(Ie);
          break;
        case 10:
          ma(o.type._context);
          break;
        case 22:
        case 23:
          el();
      }
      s = s.return;
    }
    if (He = e, ze = e = xn(e.current, null), Ge = pt = t, Be = 0, us = null, Ya = ki = Nn = 0, at = cs = null, An !== null) {
      for (t = 0; t < An.length; t++) if (s = An[t], o = s.interleaved, o !== null) {
        s.interleaved = null;
        var l = o.next, c = s.pending;
        if (c !== null) {
          var f = c.next;
          c.next = l, o.next = f;
        }
        s.pending = o;
      }
      An = null;
    }
    return e;
  }
  function Rd(e, t) {
    do {
      var s = ze;
      try {
        if (ha(), pi.current = yi, hi) {
          for (var o = Re.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          hi = !1;
        }
        if (Pn = 0, $e = De = Re = null, rs = !1, ss = 0, Ga.current = null, s === null || s.return === null) {
          Be = 1, us = t, ze = null;
          break;
        }
        e: {
          var c = e, f = s.return, g = s, S = t;
          if (t = Ge, g.flags |= 32768, S !== null && typeof S == "object" && typeof S.then == "function") {
            var A = S, L = g, O = L.tag;
            if ((L.mode & 1) === 0 && (O === 0 || O === 11 || O === 15)) {
              var j = L.alternate;
              j ? (L.updateQueue = j.updateQueue, L.memoizedState = j.memoizedState, L.lanes = j.lanes) : (L.updateQueue = null, L.memoizedState = null);
            }
            var H = ed(f);
            if (H !== null) {
              H.flags &= -257, td(H, f, g, c, t), H.mode & 1 && Zc(c, A, t), t = H, S = A;
              var Y = t.updateQueue;
              if (Y === null) {
                var Q = /* @__PURE__ */ new Set();
                Q.add(S), t.updateQueue = Q;
              } else Y.add(S);
              break e;
            } else {
              if ((t & 1) === 0) {
                Zc(c, A, t), tl();
                break e;
              }
              S = Error(i(426));
            }
          } else if (Te && g.mode & 1) {
            var Le = ed(f);
            if (Le !== null) {
              (Le.flags & 65536) === 0 && (Le.flags |= 256), td(Le, f, g, c, t), fa(fr(S, g));
              break e;
            }
          }
          c = S = fr(S, g), Be !== 4 && (Be = 2), cs === null ? cs = [c] : cs.push(c), c = f;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var C = Jc(c, S, t);
                kc(c, C);
                break e;
              case 1:
                g = S;
                var E = c.type, T = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof E.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (vn === null || !vn.has(T)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var z = Xc(c, g, t);
                  kc(c, z);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        Pd(s);
      } catch (q) {
        t = q, ze === s && s !== null && (ze = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Ad() {
    var e = Ei.current;
    return Ei.current = yi, e === null ? yi : e;
  }
  function tl() {
    (Be === 0 || Be === 3 || Be === 2) && (Be = 4), He === null || (Nn & 268435455) === 0 && (ki & 268435455) === 0 || wn(He, Ge);
  }
  function Ai(e, t) {
    var s = pe;
    pe |= 2;
    var o = Ad();
    (He !== e || Ge !== t) && (Zt = null, Ln(e, t));
    do
      try {
        qm();
        break;
      } catch (l) {
        Rd(e, l);
      }
    while (!0);
    if (ha(), pe = s, Ei.current = o, ze !== null) throw Error(i(261));
    return He = null, Ge = 0, Be;
  }
  function qm() {
    for (; ze !== null; ) Md(ze);
  }
  function Km() {
    for (; ze !== null && !wh(); ) Md(ze);
  }
  function Md(e) {
    var t = Ld(e.alternate, e, pt);
    e.memoizedProps = e.pendingProps, t === null ? Pd(e) : ze = t, Ga.current = null;
  }
  function Pd(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = $m(s, t, pt), s !== null) {
          ze = s;
          return;
        }
      } else {
        if (s = Hm(s, t), s !== null) {
          s.flags &= 32767, ze = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Be = 6, ze = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        ze = t;
        return;
      }
      ze = t = e;
    } while (t !== null);
    Be === 0 && (Be = 5);
  }
  function On(e, t, s) {
    var o = Se, l = vt.transition;
    try {
      vt.transition = null, Se = 1, Jm(e, t, s, o);
    } finally {
      vt.transition = l, Se = o;
    }
    return null;
  }
  function Jm(e, t, s, o) {
    do
      gr();
    while (_n !== null);
    if ((pe & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (Mh(e, c), e === He && (ze = He = null, Ge = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || Ci || (Ci = !0, Od(js, function() {
      return gr(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = vt.transition, vt.transition = null;
      var f = Se;
      Se = 1;
      var g = pe;
      pe |= 4, Ga.current = null, Wm(e, s), xd(s, e), ym(ta), Us = !!ea, ta = ea = null, e.current = s, Gm(s), xh(), pe = g, Se = f, vt.transition = c;
    } else e.current = s;
    if (Ci && (Ci = !1, _n = e, Ti = l), c = e.pendingLanes, c === 0 && (vn = null), bh(s.stateNode), lt(e, je()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (bi) throw bi = !1, e = qa, qa = null, e;
    return (Ti & 1) !== 0 && e.tag !== 0 && gr(), c = e.pendingLanes, (c & 1) !== 0 ? e === Ka ? ds++ : (ds = 0, Ka = e) : ds = 0, hn(), null;
  }
  function gr() {
    if (_n !== null) {
      var e = Su(Ti), t = vt.transition, s = Se;
      try {
        if (vt.transition = null, Se = 16 > e ? 16 : e, _n === null) var o = !1;
        else {
          if (e = _n, _n = null, Ti = 0, (pe & 6) !== 0) throw Error(i(331));
          var l = pe;
          for (pe |= 4, W = e.current; W !== null; ) {
            var c = W, f = c.child;
            if ((W.flags & 16) !== 0) {
              var g = c.deletions;
              if (g !== null) {
                for (var S = 0; S < g.length; S++) {
                  var A = g[S];
                  for (W = A; W !== null; ) {
                    var L = W;
                    switch (L.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ls(8, L, c);
                    }
                    var O = L.child;
                    if (O !== null) O.return = L, W = O;
                    else for (; W !== null; ) {
                      L = W;
                      var j = L.sibling, H = L.return;
                      if (yd(L), L === A) {
                        W = null;
                        break;
                      }
                      if (j !== null) {
                        j.return = H, W = j;
                        break;
                      }
                      W = H;
                    }
                  }
                }
                var Y = c.alternate;
                if (Y !== null) {
                  var Q = Y.child;
                  if (Q !== null) {
                    Y.child = null;
                    do {
                      var Le = Q.sibling;
                      Q.sibling = null, Q = Le;
                    } while (Q !== null);
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
                  ls(9, c, c.return);
              }
              var C = c.sibling;
              if (C !== null) {
                C.return = c.return, W = C;
                break e;
              }
              W = c.return;
            }
          }
          var E = e.current;
          for (W = E; W !== null; ) {
            f = W;
            var T = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && T !== null) T.return = f, W = T;
            else e: for (f = E; W !== null; ) {
              if (g = W, (g.flags & 2048) !== 0) try {
                switch (g.tag) {
                  case 0:
                  case 11:
                  case 15:
                    xi(9, g);
                }
              } catch (q) {
                Ne(g, g.return, q);
              }
              if (g === f) {
                W = null;
                break e;
              }
              var z = g.sibling;
              if (z !== null) {
                z.return = g.return, W = z;
                break e;
              }
              W = g.return;
            }
          }
          if (pe = l, hn(), Ot && typeof Ot.onPostCommitFiberRoot == "function") try {
            Ot.onPostCommitFiberRoot(Ls, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Se = s, vt.transition = t;
      }
    }
    return !1;
  }
  function Nd(e, t, s) {
    t = fr(s, t), t = Jc(e, t, 1), e = gn(e, t, 1), t = et(), e !== null && (Lr(e, 1, t), lt(e, t));
  }
  function Ne(e, t, s) {
    if (e.tag === 3) Nd(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Nd(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (vn === null || !vn.has(o))) {
          e = fr(s, e), e = Xc(t, e, 1), t = gn(t, e, 1), e = et(), t !== null && (Lr(t, 1, e), lt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Xm(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = et(), e.pingedLanes |= e.suspendedLanes & s, He === e && (Ge & s) === s && (Be === 4 || Be === 3 && (Ge & 130023424) === Ge && 500 > je() - Qa ? Ln(e, 0) : Ya |= s), lt(e, t);
  }
  function jd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = zs, zs <<= 1, (zs & 130023424) === 0 && (zs = 4194304)));
    var s = et();
    e = Kt(e, t), e !== null && (Lr(e, t, s), lt(e, s));
  }
  function Zm(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), jd(e, s);
  }
  function eg(e, t) {
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
    o !== null && o.delete(t), jd(e, s);
  }
  var Ld;
  Ld = function(e, t, s) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || st.current) ot = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return ot = !1, Um(e, t, s);
      ot = (e.flags & 131072) !== 0;
    }
    else ot = !1, Te && (t.flags & 1048576) !== 0 && hc(t, ii, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        Si(e, t), e = t.pendingProps;
        var l = sr(t, Qe.current);
        cr(t, s), l = ba(null, t, o, e, l, s);
        var c = Ca();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, it(o) ? (c = !0, ni(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, va(t), l.updater = vi, t.stateNode = l, l._reactInternals = t, Pa(t, o, e, s), t = Oa(null, t, o, !0, c, s)) : (t.tag = 0, Te && c && la(t), Ze(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (Si(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = ng(o), e = Ct(o, e), l) {
            case 0:
              t = La(null, t, o, e, s);
              break e;
            case 1:
              t = ad(null, t, o, e, s);
              break e;
            case 11:
              t = nd(null, t, o, e, s);
              break e;
            case 14:
              t = rd(null, t, o, Ct(o.type, e), s);
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
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), La(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), ad(e, t, o, l, s);
      case 3:
        e: {
          if (ld(t), e === null) throw Error(i(387));
          o = t.pendingProps, c = t.memoizedState, l = c.element, Ec(e, t), di(t, o, null, s);
          var f = t.memoizedState;
          if (o = f.element, c.isDehydrated) if (c = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
            l = fr(Error(i(423)), t), t = ud(e, t, o, s, l);
            break e;
          } else if (o !== l) {
            l = fr(Error(i(424)), t), t = ud(e, t, o, s, l);
            break e;
          } else for (ft = dn(t.stateNode.containerInfo.firstChild), dt = t, Te = !0, bt = null, s = wc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (ar(), o === l) {
              t = Xt(e, t, s);
              break e;
            }
            Ze(e, t, o, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Cc(t), e === null && da(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, f = l.children, na(o, l) ? f = null : c !== null && na(o, c) && (t.flags |= 32), od(e, t), Ze(e, t, f, s), t.child;
      case 6:
        return e === null && da(t), null;
      case 13:
        return cd(e, t, s);
      case 4:
        return _a(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = lr(t, null, o, s) : Ze(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), nd(e, t, o, l, s);
      case 7:
        return Ze(e, t, t.pendingProps, s), t.child;
      case 8:
        return Ze(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return Ze(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, f = l.value, xe(li, o._currentValue), o._currentValue = f, c !== null) if (kt(c.value, f)) {
            if (c.children === l.children && !st.current) {
              t = Xt(e, t, s);
              break e;
            }
          } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
            var g = c.dependencies;
            if (g !== null) {
              f = c.child;
              for (var S = g.firstContext; S !== null; ) {
                if (S.context === o) {
                  if (c.tag === 1) {
                    S = Jt(-1, s & -s), S.tag = 2;
                    var A = c.updateQueue;
                    if (A !== null) {
                      A = A.shared;
                      var L = A.pending;
                      L === null ? S.next = S : (S.next = L.next, L.next = S), A.pending = S;
                    }
                  }
                  c.lanes |= s, S = c.alternate, S !== null && (S.lanes |= s), ga(
                    c.return,
                    s,
                    t
                  ), g.lanes |= s;
                  break;
                }
                S = S.next;
              }
            } else if (c.tag === 10) f = c.type === t.type ? null : c.child;
            else if (c.tag === 18) {
              if (f = c.return, f === null) throw Error(i(341));
              f.lanes |= s, g = f.alternate, g !== null && (g.lanes |= s), ga(f, s, t), f = c.sibling;
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
          Ze(e, t, l.children, s), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, o = t.pendingProps.children, cr(t, s), l = gt(l), o = o(l), t.flags |= 1, Ze(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = Ct(o, t.pendingProps), l = Ct(o.type, l), rd(e, t, o, l, s);
      case 15:
        return sd(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ct(o, l), Si(e, t), t.tag = 1, it(o) ? (e = !0, ni(t)) : e = !1, cr(t, s), qc(t, o, l), Pa(t, o, l, s), Oa(null, t, o, !0, e, s);
      case 19:
        return fd(e, t, s);
      case 22:
        return id(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function Od(e, t) {
    return mu(e, t);
  }
  function tg(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, s, o) {
    return new tg(e, t, s, o);
  }
  function nl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ng(e) {
    if (typeof e == "function") return nl(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === ve) return 11;
      if (e === we) return 14;
    }
    return 2;
  }
  function xn(e, t) {
    var s = e.alternate;
    return s === null ? (s = _t(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function Mi(e, t, s, o, l, c) {
    var f = 2;
    if (o = e, typeof e == "function") nl(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case D:
        return zn(s.children, l, c, t);
      case F:
        f = 8, l |= 8;
        break;
      case se:
        return e = _t(12, s, t, l | 2), e.elementType = se, e.lanes = c, e;
      case he:
        return e = _t(13, s, t, l), e.elementType = he, e.lanes = c, e;
      case ue:
        return e = _t(19, s, t, l), e.elementType = ue, e.lanes = c, e;
      case me:
        return Pi(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case G:
            f = 10;
            break e;
          case Ce:
            f = 9;
            break e;
          case ve:
            f = 11;
            break e;
          case we:
            f = 14;
            break e;
          case Me:
            f = 16, o = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = _t(f, s, t, l), t.elementType = e, t.type = o, t.lanes = c, t;
  }
  function zn(e, t, s, o) {
    return e = _t(7, e, o, t), e.lanes = s, e;
  }
  function Pi(e, t, s, o) {
    return e = _t(22, e, o, t), e.elementType = me, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function rl(e, t, s) {
    return e = _t(6, e, null, t), e.lanes = s, e;
  }
  function sl(e, t, s) {
    return t = _t(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function rg(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Mo(0), this.expirationTimes = Mo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Mo(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function il(e, t, s, o, l, c, f, g, S) {
    return e = new rg(e, t, s, g, S), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = _t(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, va(c), e;
  }
  function sg(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: J, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function zd(e) {
    if (!e) return pn;
    e = e._reactInternals;
    e: {
      if (bn(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (it(t.type)) {
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
      if (it(s)) return dc(e, s, t);
    }
    return t;
  }
  function Dd(e, t, s, o, l, c, f, g, S) {
    return e = il(s, o, !0, e, l, c, f, g, S), e.context = zd(null), s = e.current, o = et(), l = Sn(s), c = Jt(o, l), c.callback = t ?? null, gn(s, c, l), e.current.lanes = l, Lr(e, l, o), lt(e, o), e;
  }
  function Ni(e, t, s, o) {
    var l = t.current, c = et(), f = Sn(l);
    return s = zd(s), t.context === null ? t.context = s : t.pendingContext = s, t = Jt(c, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = gn(l, t, f), e !== null && (Rt(e, l, f, c), ci(e, l, f)), f;
  }
  function ji(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Bd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function ol(e, t) {
    Bd(e, t), (e = e.alternate) && Bd(e, t);
  }
  function ig() {
    return null;
  }
  var Fd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function al(e) {
    this._internalRoot = e;
  }
  Li.prototype.render = al.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Ni(e, t, null, null);
  }, Li.prototype.unmount = al.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      jn(function() {
        Ni(null, e, null, null);
      }), t[Gt] = null;
    }
  };
  function Li(e) {
    this._internalRoot = e;
  }
  Li.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Eu();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < ln.length && t !== 0 && t < ln[s].priority; s++) ;
      ln.splice(s, 0, e), s === 0 && Cu(e);
    }
  };
  function ll(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Oi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ud() {
  }
  function og(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var A = ji(f);
          c.call(A);
        };
      }
      var f = Dd(t, o, e, 0, null, !1, !1, "", Ud);
      return e._reactRootContainer = f, e[Gt] = f.current, qr(e.nodeType === 8 ? e.parentNode : e), jn(), f;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var g = o;
      o = function() {
        var A = ji(S);
        g.call(A);
      };
    }
    var S = il(e, 0, !1, null, null, !1, !1, "", Ud);
    return e._reactRootContainer = S, e[Gt] = S.current, qr(e.nodeType === 8 ? e.parentNode : e), jn(function() {
      Ni(t, S, s, o);
    }), S;
  }
  function zi(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var f = c;
      if (typeof l == "function") {
        var g = l;
        l = function() {
          var S = ji(f);
          g.call(S);
        };
      }
      Ni(t, f, e, l);
    } else f = og(s, t, e, l, o);
    return ji(f);
  }
  wu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = jr(t.pendingLanes);
          s !== 0 && (Po(t, s | 1), lt(t, je()), (pe & 6) === 0 && (mr = je() + 500, hn()));
        }
        break;
      case 13:
        jn(function() {
          var o = Kt(e, 1);
          if (o !== null) {
            var l = et();
            Rt(o, e, 1, l);
          }
        }), ol(e, 1);
    }
  }, No = function(e) {
    if (e.tag === 13) {
      var t = Kt(e, 134217728);
      if (t !== null) {
        var s = et();
        Rt(t, e, 134217728, s);
      }
      ol(e, 134217728);
    }
  }, xu = function(e) {
    if (e.tag === 13) {
      var t = Sn(e), s = Kt(e, t);
      if (s !== null) {
        var o = et();
        Rt(s, e, t, o);
      }
      ol(e, t);
    }
  }, Eu = function() {
    return Se;
  }, ku = function(e, t) {
    var s = Se;
    try {
      return Se = e, t();
    } finally {
      Se = s;
    }
  }, bo = function(e, t, s) {
    switch (t) {
      case "input":
        if (xt(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = ei(o);
              if (!l) throw Error(i(90));
              rn(o), xt(o, l);
            }
          }
        }
        break;
      case "textarea":
        Zl(e, s);
        break;
      case "select":
        t = s.value, t != null && rt(e, !!s.multiple, t, !1);
    }
  }, lu = Za, uu = jn;
  var ag = { usingClientEntryPoint: !1, Events: [Xr, nr, ei, ou, au, Za] }, fs = { findFiberByHostInstance: Cn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, lg = { bundleType: fs.bundleType, version: fs.version, rendererPackageName: fs.rendererPackageName, rendererConfig: fs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: oe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = pu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: fs.findFiberByHostInstance || ig, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Di = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Di.isDisabled && Di.supportsFiber) try {
      Ls = Di.inject(lg), Ot = Di;
    } catch {
    }
  }
  return ut.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ag, ut.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ll(t)) throw Error(i(200));
    return sg(e, t, null, s);
  }, ut.createRoot = function(e, t) {
    if (!ll(e)) throw Error(i(299));
    var s = !1, o = "", l = Fd;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = il(e, 1, !1, null, null, s, !1, o, l), e[Gt] = t.current, qr(e.nodeType === 8 ? e.parentNode : e), new al(t);
  }, ut.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = pu(t), e = e === null ? null : e.stateNode, e;
  }, ut.flushSync = function(e) {
    return jn(e);
  }, ut.hydrate = function(e, t, s) {
    if (!Oi(t)) throw Error(i(200));
    return zi(null, e, t, !0, s);
  }, ut.hydrateRoot = function(e, t, s) {
    if (!ll(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", f = Fd;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (f = s.onRecoverableError)), t = Dd(t, null, e, 1, s ?? null, l, !1, c, f), e[Gt] = t.current, qr(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new Li(t);
  }, ut.render = function(e, t, s) {
    if (!Oi(t)) throw Error(i(200));
    return zi(null, e, t, !1, s);
  }, ut.unmountComponentAtNode = function(e) {
    if (!Oi(e)) throw Error(i(40));
    return e._reactRootContainer ? (jn(function() {
      zi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Gt] = null;
      });
    }), !0) : !1;
  }, ut.unstable_batchedUpdates = Za, ut.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Oi(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return zi(e, t, s, !1, o);
  }, ut.version = "18.3.1-next-f1338f8080-20240426", ut;
}
var qd;
function Df() {
  if (qd) return dl.exports;
  qd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), dl.exports = yg(), dl.exports;
}
var Kd;
function vg() {
  if (Kd) return Bi;
  Kd = 1;
  var r = Df();
  return Bi.createRoot = r.createRoot, Bi.hydrateRoot = r.hydrateRoot, Bi;
}
var _g = vg(), Sg = Df();
const wg = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
  if (a.system && (i.system ? i.system += `

${a.system}` : i.system = a.system), a.tools)
    for (const [u, d] of Object.entries(a.tools)) {
      const p = i.tools?.[u];
      if (p && p !== d)
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
class Bf {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return wg(this._providers);
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
class xg {
  _contextProvider = new Bf();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class Eg {
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
const kg = (r) => r.status.type === "complete";
class Ff extends Eg {
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => kg(d) ? d : await n.send(d))) : [], a = this.text;
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
      const p = this._attachments.findIndex((h) => h.id === d.id);
      p !== -1 ? this._attachments = [
        ...this._attachments.slice(0, p),
        d,
        ...this._attachments.slice(p + 1)
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
      for (const x of this._dictationUnsubscribes)
        x();
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
      const x = v.isFinal !== !1, _ = this._dictationBaseText && !this._dictationBaseText.endsWith(" ") && v.transcript ? " " : "";
      if (x) {
        if (this._dictationBaseText = this._dictationBaseText + _ + v.transcript, this._currentInterimText = "", this._text = this._dictationBaseText, this._dictation) {
          const { transcript: I, ...N } = this._dictation;
          this._dictation = N;
        }
        this._notifySubscribers();
      } else
        this._currentInterimText = _ + v.transcript, this._text = this._dictationBaseText + this._currentInterimText, this._dictation && (this._dictation = {
          ...this._dictation,
          transcript: v.transcript
        }), this._notifySubscribers();
    });
    this._dictationUnsubscribes.push(d);
    const p = a.onSpeechStart(() => {
      this._isActiveSession(u, a) && (this._dictation = {
        status: { type: "running" },
        inputDisabled: i,
        ...this._dictation?.transcript && {
          transcript: this._dictation.transcript
        }
      }, this._notifySubscribers());
    });
    this._dictationUnsubscribes.push(p);
    const h = a.onSpeechEnd(() => {
      this._cleanupDictation({ sessionId: u });
    });
    this._dictationUnsubscribes.push(h);
    const y = setInterval(() => {
      this._isActiveSession(u, a) && a.status.type === "ended" && this._cleanupDictation({ sessionId: u });
    }, 100);
    this._dictationUnsubscribes.push(() => clearInterval(y));
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
class bg extends Ff {
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
let Cg = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const Ol = Cg("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), Tg = "__optimistic__", Ig = () => `${Tg}${Ol()}`, br = /* @__PURE__ */ Symbol("autoStatus"), Rg = Object.freeze(Object.assign({ type: "running" }, { [br]: !0 })), Ag = Object.freeze(Object.assign({
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
const Mg = (r) => r[br] === !0, Uf = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [br]: !0 }) : r && n ? Rg : Ag;
var Dn = { exports: {} }, Jd;
function Pg() {
  if (Jd) return Dn.exports;
  Jd = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(h, y, v) {
    v == null && y !== null && typeof y == "object" && (v = y, y = void 0), r && Buffer.isBuffer(h) && (h = h.toString()), h && h.charCodeAt(0) === 65279 && (h = h.slice(1));
    const x = JSON.parse(h, y);
    if (x === null || typeof x != "object")
      return x;
    const b = v && v.protoAction || "error", _ = v && v.constructorAction || "error";
    if (b === "ignore" && _ === "ignore")
      return x;
    if (b !== "ignore" && _ !== "ignore") {
      if (n.test(h) === !1 && i.test(h) === !1)
        return x;
    } else if (b !== "ignore" && _ === "ignore") {
      if (n.test(h) === !1)
        return x;
    } else if (i.test(h) === !1)
      return x;
    return u(x, { protoAction: b, constructorAction: _, safe: v && v.safe });
  }
  function u(h, { protoAction: y = "error", constructorAction: v = "error", safe: x } = {}) {
    let b = [h];
    for (; b.length; ) {
      const _ = b;
      b = [];
      for (const I of _) {
        if (y !== "ignore" && Object.prototype.hasOwnProperty.call(I, "__proto__")) {
          if (x === !0)
            return null;
          if (y === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete I.__proto__;
        }
        if (v !== "ignore" && Object.prototype.hasOwnProperty.call(I, "constructor") && I.constructor !== null && typeof I.constructor == "object" && Object.prototype.hasOwnProperty.call(I.constructor, "prototype")) {
          if (x === !0)
            return null;
          if (v === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete I.constructor;
        }
        for (const N in I) {
          const P = I[N];
          P && typeof P == "object" && b.push(P);
        }
      }
    }
    return h;
  }
  function d(h, y, v) {
    const { stackTraceLimit: x } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(h, y, v);
    } finally {
      Error.stackTraceLimit = x;
    }
  }
  function p(h, y) {
    const { stackTraceLimit: v } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(h, y, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = v;
    }
  }
  return Dn.exports = d, Dn.exports.default = d, Dn.exports.parse = d, Dn.exports.safeParse = p, Dn.exports.scan = u, Dn.exports;
}
var Ng = Pg();
const Xd = /* @__PURE__ */ zf(Ng);
function jg(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function p() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function h(b, _, I) {
    switch (b) {
      case '"': {
        i = _, n.pop(), n.push(I), n.push("INSIDE_STRING"), p();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = _, a = _, n.pop(), n.push(I), n.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        n.pop(), n.push(I), n.push("INSIDE_NUMBER"), p();
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
        i = _, n.pop(), n.push(I), n.push("INSIDE_NUMBER"), p();
        break;
      }
      case "{": {
        i = _, n.pop(), n.push(I), n.push("INSIDE_OBJECT_START"), p();
        break;
      }
      case "[": {
        i = _, n.pop(), n.push(I), n.push("INSIDE_ARRAY_START"), p();
        break;
      }
    }
  }
  function y(b, _) {
    switch (b) {
      case ",": {
        n.pop(), n.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        i = _, n.pop(), d = u.pop();
        break;
      }
    }
  }
  function v(b, _) {
    switch (b) {
      case ",": {
        n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
        break;
      }
      case "]": {
        i = _, n.pop(), d = u.pop();
        break;
      }
    }
  }
  for (let b = 0; b < r.length; b++) {
    const _ = r[b];
    switch (n[n.length - 1]) {
      case "ROOT":
        h(_, b, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (_) {
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
        _ === '"' && (n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "");
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (_) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE"), d += _;
            break;
          }
          default: {
            d += _;
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        _ === ":" && (n.pop(), n.push("INSIDE_OBJECT_BEFORE_VALUE"));
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        h(_, b, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        y(_, b);
        break;
      }
      case "INSIDE_STRING": {
        switch (_) {
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
        _ === "]" ? (i = b, n.pop(), d = u.pop()) : (i = b, d = "0", h(_, b, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (_) {
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
        h(_, b, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        n.pop(), n[n.length - 1] === "INSIDE_STRING" ? i = b : n[n.length - 1] === "INSIDE_OBJECT_KEY" && (d += _);
        break;
      }
      case "INSIDE_NUMBER": {
        switch (_) {
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
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(_, b), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && y(_, b);
            break;
          }
          case "}": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && y(_, b);
            break;
          }
          case "]": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(_, b);
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
        !"false".startsWith(N) && !"true".startsWith(N) && !"null".startsWith(N) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? y(_, b) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(_, b)) : i = b;
        break;
      }
    }
  }
  let x = r.slice(0, i + 1);
  for (let b = n.length - 1; b >= 0; b--)
    switch (n[b]) {
      case "INSIDE_STRING": {
        x += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        x += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        x += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const I = r.substring(a, r.length);
        "true".startsWith(I) ? x += "true".slice(I.length) : "false".startsWith(I) ? x += "false".slice(I.length) : "null".startsWith(I) && (x += "null".slice(I.length));
      }
    }
  return [x, u];
}
const hl = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), Lg = (r) => {
  if (r.length === 0)
    return {
      [hl]: { state: "partial", partialPath: [] }
    };
  try {
    const n = Xd.parse(r);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[hl] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = jg(r), a = Xd.parse(n);
      if (typeof a != "object" || a === null)
        throw new Error("argsText is expected to be an object");
      return a[hl] = {
        state: "partial",
        partialPath: i
      }, a;
    } catch {
      return;
    }
  }
}, zl = (r, n, i) => {
  const { role: a, id: u, createdAt: d, attachments: p, status: h, metadata: y } = r, v = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, x = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, b = ({ image: _, ...I }) => {
    const N = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(_), P = /^https?:\/\//.test(_);
    return N || P ? { ...I, image: _ } : (console.warn("Invalid image data format detected"), null);
  };
  if (a !== "user" && p?.length)
    throw new Error("attachments are only supported for user messages");
  if (a !== "assistant" && h)
    throw new Error("status is only supported for assistant messages");
  if (a !== "assistant" && y?.steps)
    throw new Error("metadata.steps is only supported for assistant messages");
  switch (a) {
    case "assistant":
      return {
        ...v,
        role: a,
        content: x.map((_) => {
          const I = _.type;
          switch (I) {
            case "text":
            case "reasoning":
              return _.text.trim().length === 0 ? null : _;
            case "file":
            case "source":
              return _;
            case "image":
              return b(_);
            case "data":
              return _;
            case "tool-call": {
              const { parentId: N, messages: P, ...B } = _, $ = {
                ...B,
                toolCallId: _.toolCallId ?? `tool-${Ol()}`,
                ...N !== void 0 && { parentId: N },
                ...P !== void 0 && { messages: P }
              };
              return _.args ? {
                ...$,
                args: _.args,
                argsText: _.argsText ?? JSON.stringify(_.args)
              } : {
                ...$,
                args: Lg(_.argsText ?? "") ?? {},
                argsText: _.argsText ?? ""
              };
            }
            default: {
              const N = I;
              throw new Error(`Unsupported assistant message part type: ${N}`);
            }
          }
        }).filter((_) => !!_),
        status: h ?? i,
        metadata: {
          unstable_state: y?.unstable_state ?? null,
          unstable_annotations: y?.unstable_annotations ?? [],
          unstable_data: y?.unstable_data ?? [],
          custom: y?.custom ?? {},
          steps: y?.steps ?? [],
          ...y?.submittedFeedback && {
            submittedFeedback: y.submittedFeedback
          }
        }
      };
    case "user":
      return {
        ...v,
        role: a,
        content: x.map((_) => {
          const I = _.type;
          switch (I) {
            case "text":
            case "image":
            case "audio":
            case "file":
              return _;
            default: {
              const N = I;
              throw new Error(`Unsupported user message part type: ${N}`);
            }
          }
        }),
        attachments: p ?? [],
        metadata: {
          custom: y?.custom ?? {}
        }
      };
    case "system":
      if (x.length !== 1 || x[0].type !== "text")
        throw new Error("System messages must have exactly one text message part.");
      return {
        ...v,
        role: a,
        content: x,
        metadata: {
          custom: y?.custom ?? {}
        }
      };
    default: {
      const _ = a;
      throw new Error(`Unknown message role: ${_}`);
    }
  }
}, Dl = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (r) => {
    const n = r.map((i) => zl(i, Ol(), Uf(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, a) => ({
        parentId: a > 0 ? n[a - 1].id : null,
        message: i
      }))
    };
  }
}, Gi = (r) => r.next ? Gi(r.next) : "current" in r ? r : null;
class Og {
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
class $f {
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
      if (a !== "link" && (u.children = u.children.filter((p) => p !== i.current.id), u.next === i)) {
        const p = u.children.at(-1), h = p ? this.messages.get(p) : null;
        if (h === void 0)
          throw new Error("MessageRepository(performOp/cut): Fallback sibling message not found. This is likely an internal bug in assistant-ui.");
        u.next = h;
      }
      if (a !== "cut") {
        for (let h = n; h; h = h.prev)
          if (h.current.id === i.current.id)
            throw new Error("MessageRepository(performOp/link): A message with the same id already exists in the parent tree. This error occurs if the same message id is found multiple times. This is likely an internal bug in assistant-ui.");
        d.children = [
          ...d.children,
          i.current.id
        ], (Gi(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const p = n ? n.level + 1 : 0;
        this.updateLevels(i, p);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new Og(() => {
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
      a = Ig();
    while (this.messages.has(a));
    return this.addOrUpdateMessage(n, zl(i, a, { type: "running" })), a;
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
      const p = this.messages.get(d);
      if (!p)
        throw new Error("MessageRepository(deleteMessage): Child message not found. This is likely an internal bug in assistant-ui.");
      this.performOp(u, p, "relink");
    }
    this.performOp(null, a, "cut"), this.messages.delete(n), this.head === a && (this.head = Gi(u ?? this.root)), this._messages.dirty();
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
    a.next = i, this.head = Gi(i), this._messages.dirty();
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
          const p = this.messages.get(d);
          p && (a(p), this.messages.delete(d));
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
class uo {
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
const Nt = /* @__PURE__ */ Symbol("skip-update");
class Bl extends uo {
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
      n !== Nt && (this._previousState = n), this._previousStateDirty = !1;
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
      const d = this._core.getState(), p = d.isMain, h = d.id;
      a === p && u === h || (a = p, u = h, !(n === "switched-to" && !p) && (n === "switched-away" && p || i()));
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
function zg(r, n) {
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
class Pt extends uo {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(n) {
    super(), this.binding = n;
    const i = n.getState();
    if (i === Nt)
      throw new Error("Entry not available in the store");
    this._previousState = i;
  }
  _previousState;
  getState = () => (this.isConnected || this._syncState(), this._previousState);
  _syncState() {
    const n = this.binding.getState();
    return n === Nt || zg(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const Sr = /* @__PURE__ */ Symbol("innerMessage"), Dg = (r) => r[Sr], _s = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class Hf {
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
class Vf extends Hf {
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
class Bg extends Vf {
  get source() {
    return "thread-composer";
  }
}
class Fg extends Vf {
  get source() {
    return "edit-composer";
  }
}
class Ug extends Hf {
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
class Wf extends uo {
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
      const p = this.config.binding.getState();
      p !== i && (i = p, a?.(), a = this.config.binding.getState()?.unstable_on(this.config.event, n));
    }, d = this.outerSubscribe(u);
    return () => {
      d?.(), a?.();
    };
  }
}
const Gf = Object.freeze([]), Yf = Object.freeze({}), $g = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? Gf,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? Yf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), Hg = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? Gf,
  runConfig: r?.runConfig ?? Yf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class Qf {
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
    return a || (a = new Wf({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
class Vg extends Qf {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(n) {
    const i = new Bl({
      path: n.path,
      getState: () => $g(n.getState()),
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
    return new Bg(new Pt({
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
        } : Nt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
class Wg extends Qf {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(n, i) {
    const a = new Bl({
      path: n.path,
      getState: () => Hg(n.getState()),
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
    return new Fg(new Pt({
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
        } : Nt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Zd = /* @__PURE__ */ Symbol.for("aui.tool-response");
class Qi {
  get [Zd]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && Zd in n;
  }
  static toResponse(n) {
    return n instanceof Qi ? n : new Qi({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class ef {
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
    const u = i.toolName, d = i.toolCallId, p = Qi.toResponse(n);
    this.threadApi.getState().addToolResult({
      messageId: a.id,
      toolName: u,
      toolCallId: d,
      result: p.result,
      artifact: p.artifact,
      isError: p.isError
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
class qi extends uo {
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
      const p = this.binding.getState();
      p !== i && (i = p, a?.(), a = this.binding.getState()?.subscribe(n), n());
    }, d = this.outerSubscribe(u);
    return () => {
      d?.(), a?.();
    };
  }
}
const Ui = Object.freeze({
  type: "complete"
}), Gg = (r, n, i) => {
  if (r.role !== "assistant")
    return Ui;
  if (i.type === "tool-call")
    return i.result ? Ui : r.status;
  const a = n === Math.max(0, r.content.length - 1);
  return r.status.type === "requires-action" ? Ui : a ? r.status : Ui;
}, tf = (r, n) => {
  const i = r.content[n];
  if (!i)
    return Nt;
  const a = Gg(r, n, i);
  return Object.freeze({
    ...i,
    [Sr]: i[Sr],
    status: a
  });
};
class Yg {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new Wg(new qi({
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
    const i = this._getEditComposerRuntimeCore(), a = i ?? this._threadBinding.getState().composer, u = i ?? a, { runConfig: d = u.runConfig } = n, p = this._core.getState();
    if (p.role !== "assistant")
      throw new Error("Can only reload assistant messages");
    this._threadBinding.getState().startRun({
      parentId: p.parentId,
      sourceId: p.id,
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
    let p = i;
    if (n === "previous" ? p = d[a.branchNumber - 2] : n === "next" && (p = d[a.branchNumber]), !p)
      throw new Error("Branch not found");
    this._threadBinding.getState().switchToBranch(p);
  }
  unstable_getCopyText() {
    return _s(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new ef(new Pt({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => tf(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new ef(new Pt({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), a = i.content.findIndex((u) => u.type === "tool-call" && u.toolCallId === n);
        return a === -1 ? Nt : tf(i, a);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new Ug(new Pt({
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
        } : Nt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }));
  }
}
const Qg = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {},
  ...r.stream ? { stream: r.stream } : {}
}), qg = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), Kg = (r, n) => typeof n == "string" ? {
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
}, Jg = (r, n) => {
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
class Xg {
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
      getState: () => Jg(n.getState(), i.getState()),
      subscribe: (u) => {
        const d = n.subscribe(u), p = i.subscribe(u);
        return () => {
          d(), p();
        };
      }
    });
    this._threadBinding = {
      path: n.path,
      getState: () => n.getState(),
      getStateState: () => a.getState(),
      outerSubscribe: (u) => n.outerSubscribe(u),
      subscribe: (u) => n.subscribe(u)
    }, this.composer = new Vg(new qi({
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
    this._threadBinding.getState().append(Kg(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(qg(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun(Qg(n));
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
    return new Yg(new Pt({
      path: n,
      getState: () => {
        const { message: a, parentId: u, index: d } = i() ?? {}, { messages: p, speech: h } = this._threadBinding.getState();
        if (!a || u === void 0 || d === void 0)
          return Nt;
        const v = this._threadBinding.getState().getBranches(a.id), x = a.metadata.submittedFeedback;
        return {
          ...a,
          [Sr]: a[Sr],
          index: d,
          isLast: p.at(-1)?.id === a.id,
          parentId: u,
          branchNumber: v.indexOf(a.id) + 1,
          branchCount: v.length,
          speech: h?.messageId === a.id ? h : void 0,
          submittedFeedback: x
        };
      },
      subscribe: (a) => this._threadBinding.subscribe(a)
    }), this._threadBinding);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    let a = this._eventSubscriptionSubjects.get(n);
    return a || (a = new Wf({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
const Zg = (r) => ({
  mainThreadId: r.mainThreadId,
  newThread: r.newThreadId,
  threads: r.threadIds,
  archivedThreads: r.archivedThreadIds,
  isLoading: r.isLoading,
  threadItems: r.threadData
}), $i = (r, n) => {
  if (n === void 0)
    return Nt;
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
  } : Nt;
};
class ey {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = Xg) {
    this._core = n, this._runtimeFactory = i;
    const a = new Bl({
      path: {},
      getState: () => Zg(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new Fi(new Pt({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => $i(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new qi({
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
    return new this._runtimeFactory(new qi({
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
      getState: () => $i(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new Fi(new Pt({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => $i(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new Fi(new Pt({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => $i(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const ty = k.createContext(null), ny = () => k.useContext(ty), Bn = Object.freeze([]), $n = "DEFAULT_THREAD_ID", ry = Object.freeze([$n]), qf = Object.freeze({
  id: $n,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), sy = Promise.resolve(), nf = Object.freeze({
  [$n]: qf
});
class iy {
  adapter;
  threadFactory;
  _mainThreadId = $n;
  _threads = ry;
  _archivedThreads = Bn;
  _threadData = nf;
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
    return sy;
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
    if (n === $n)
      return qf;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? $n, d = n.threads ?? Bn, p = n.archivedThreads ?? Bn, h = a.threadId ?? $n, y = a.threads ?? Bn, v = a.archivedThreads ?? Bn;
    !i && h === u && y === d && v === p || (this._threadData = {
      ...nf,
      ...Object.fromEntries(n.threads?.map((x) => [
        x.id,
        {
          ...x,
          remoteId: x.remoteId,
          externalId: x.externalId,
          status: "regular"
        }
      ]) ?? []),
      ...Object.fromEntries(n.archivedThreads?.map((x) => [
        x.id,
        {
          ...x,
          remoteId: x.remoteId,
          externalId: x.externalId,
          status: "archived"
        }
      ]) ?? [])
    }, y !== d && (this._threads = this.adapter.threads?.map((x) => x.id) ?? Bn), v !== p && (this._archivedThreads = this.adapter.archivedThreads?.map((x) => x.id) ?? Bn), h !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
class rf {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((a, u) => {
      const d = this.cache.get(a), p = i(d, a, u);
      return this.cache.set(a, p), p;
    });
  }
}
class oy extends Ff {
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
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = a, this._sourceId = u.id, this._previousText = _s(u), this.setText(this._previousText), this.setRole(u.role), this.setAttachments(u.attachments ?? []), this._nonTextParts = u.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    _s(n) !== this._previousText && this.runtime.append({
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
class ay {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new $f();
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
  composer = new bg(this);
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
    this._editComposers.set(n, new oy(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
      const p = {
        ...u,
        metadata: {
          ...u.metadata,
          submittedFeedback: { type: i }
        }
      };
      this.repository.addOrUpdateMessage(d, p);
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
    const u = i.speak(_s(a)), d = u.subscribe(() => {
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
    this.import(Dl.fromArray(n ?? []));
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
const ly = Object.freeze([]), uy = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class cy extends ay {
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
  _converter = new rf();
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
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? ly, this._capabilities = {
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
          this._converter = new rf();
        else if (a.isRunning === n.isRunning && a.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, p, h) => {
        if (!n.convertMessage)
          return p;
        const y = h === (n.messages?.length ?? 0) - 1, v = Uf(y, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !Mg(d.status) || d.status === v))
          return d;
        const x = n.convertMessage(p, h), b = zl(x, h.toString(), v);
        return b[Sr] = p, b;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const p = u[d], h = u[d - 1];
        this.repository.addOrUpdateMessage(h?.id ?? null, p);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), uy(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
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
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(_s(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
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
    const i = new $f();
    i.import(Dl.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(Dg).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const sf = (r) => r.adapters?.threadList ?? {};
class dy extends xg {
  threads;
  constructor(n) {
    super(), this.threads = new iy(sf(n), () => new cy(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(sf(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const fy = (r) => {
  const [n] = k.useState(() => new dy(r));
  k.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = ny() ?? {};
  return k.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), k.useMemo(() => new yv(n), [n]);
};
function py(r, n) {
  r.commitTasks.forEach((i) => {
    const a = i.cellIndex, u = n.cells[a];
    if (u.type !== "effect")
      throw new Error("Cannot find effect cell");
    let d = !0;
    if (u.deps !== void 0 && i.deps !== void 0 && (d = u.deps.length !== i.deps.length || u.deps.some((p, h) => !Object.is(p, i.deps[h]))), d) {
      if (u.mounted) {
        if (typeof u.deps != typeof i.deps)
          throw new Error("tapEffect called with and without dependencies across re-renders");
        try {
          u.mounted && u.cleanup && u.cleanup();
        } finally {
          u.mounted = !1;
        }
      }
      const p = i.effect();
      if (p !== void 0 && typeof p != "function")
        throw new Error(`An effect function must either return a cleanup function or nothing. Received: ${typeof p}`);
      u.mounted = !0, u.cleanup = typeof p == "function" ? p : void 0, u.deps = i.deps;
    }
  });
}
function hy(r) {
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
let hs = null;
function my(r, n) {
  r.currentIndex = 0;
  const i = hs;
  hs = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    hs = i;
  }
}
function Fl() {
  if (!hs)
    throw new Error("No resource fiber available");
  return hs;
}
function Kf(r, n) {
  const i = r[Jf];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const Jf = /* @__PURE__ */ Symbol("fnSymbol");
function co(r, n) {
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
function Ss(r) {
  r.isMounted = !1, hy(r);
}
function ws(r, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return my(r, () => {
    r.renderContext = i;
    try {
      i.state = Kf(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function xs(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, py(n, r);
}
const gy = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, of = gy ? k.useEffect : k.useLayoutEffect;
function Ul(r) {
  const [, n] = k.useState({}), i = k.useMemo(() => co(r.type, () => n({})), [r.type]), a = ws(i, r.props);
  return of(() => () => Ss(i), [i]), of(() => {
    xs(i, a);
  }), a.state;
}
const fo = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, ms = (r, n, i) => n === r;
let yr;
const ml = () => {
  if (yr)
    return yr;
  const r = () => ({
    apis: /* @__PURE__ */ new Map(),
    nextId: 0,
    listeners: /* @__PURE__ */ new Set()
  });
  if (typeof window > "u")
    return yr = r(), yr;
  const n = window.__ASSISTANT_UI_DEVTOOLS_HOOK__;
  if (n)
    return yr = n, n;
  const i = r();
  return window.__ASSISTANT_UI_DEVTOOLS_HOOK__ = i, yr = i, i;
};
class Fn {
  static MAX_EVENT_LOGS_PER_API = 200;
  static register(n) {
    const i = ml();
    for (const h of i.apis.values())
      if (h.api === n)
        return () => {
        };
    const a = i.nextId++, u = {
      api: n,
      logs: []
    }, d = n.on?.("*", (h) => {
      const y = i.apis.get(a);
      y && (y.logs.push({
        time: /* @__PURE__ */ new Date(),
        event: h.event,
        data: h.payload
      }), y.logs.length > Fn.MAX_EVENT_LOGS_PER_API && (y.logs = y.logs.slice(-200)), Fn.notifyListeners(a));
    }), p = n.subscribe?.(() => {
      Fn.notifyListeners(a);
    });
    return i.apis.set(a, u), Fn.notifyListeners(a), () => {
      const h = ml();
      h.apis.get(a) && (d?.(), p?.(), h.apis.delete(a), Fn.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    ml().listeners.forEach((a) => a(n));
  }
}
function Ae(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[Jf] = r, n;
}
const yy = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function vy(r) {
  const n = Fl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (p) => {
        const h = d.value, y = typeof p == "function" ? p(h) : p;
        Object.is(h, y) || (d.value = y, yy(n));
      }
    };
    n.cells[i] = d;
  }
  const a = n.cells[i];
  if (a.type !== "state")
    throw new Error("Hook order changed between renders");
  return a;
}
function $t(r) {
  const n = vy(r);
  return [n.value, n.set];
}
function _y() {
  const r = Fl(), n = r.currentIndex++;
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
function nt(r, n) {
  const i = Fl(), a = _y();
  i.renderContext.commitTasks.push({
    effect: r,
    deps: n,
    cellIndex: a
  });
}
function wr(r) {
  const [n] = $t(() => ({
    current: r
  }));
  return n;
}
const Sy = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, _e = (r, n) => {
  const i = wr();
  return i.current || (i.current = { value: r(), deps: n }), Sy(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, wy = (r, n) => _e(() => r, n);
function gs(r, n) {
  const [i, a] = $t({}), u = _e(() => co(r.type, () => a({})), [r.type]), d = n ? _e(() => r.props, n) : r.props, p = _e(() => ws(u, d), [u, d, i]);
  return nt(() => () => Ss(u), [u]), nt(() => {
    xs(u, p);
  }, [u, p]), p.state;
}
function Ht(r) {
  return Kf(r.type, r.props);
}
function Xf(r, n, i) {
  const [a, u] = $t(0), d = wy(() => u((v) => v + 1), []), [p] = $t(() => /* @__PURE__ */ new Map()), h = _e(() => n, i), y = _e(() => {
    const v = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const x in r) {
      const b = r[x], _ = h(b, x);
      let I = p.get(x);
      (!I || I.resource !== _.type) && (I && v.remove.push(x), I = co(_.type, d), v.add.push([x, I]));
      const N = ws(I, _.props);
      v.commit.push([x, N]), v.return[x] = N.state;
    }
    if (p.size > v.commit.length - v.add.length + v.remove.length)
      for (const x of p.keys())
        x in r || v.remove.push(x);
    return v;
  }, [r, h, a]);
  return nt(() => () => {
    for (const v of p.keys())
      Ss(p.get(v)), p.delete(v);
  }, []), nt(() => {
    for (const v of y.remove)
      Ss(p.get(v)), p.delete(v);
    for (const [v, x] of y.add)
      p.set(v, x);
    for (const [v, x] of y.commit)
      xs(p.get(v), x);
  }, [y]), y.return;
}
const xy = 50;
let Ut = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class Ey {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Ut.schedulers.add(this), ky();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const ky = () => {
  Ut.isScheduled || (Ut.isScheduled = !0, queueMicrotask(Zf));
}, Zf = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of Ut.schedulers)
      if (Ut.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > xy)
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
    Ut.schedulers.clear(), Ut.isScheduled = !1;
  }
}, El = (r) => {
  const n = Ut;
  Ut = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = r();
    return Zf(), i;
  } finally {
    Ut = n;
  }
}, by = Ae((r) => {
  const [, n] = $t(r.element), i = gs(r.element), a = wr(/* @__PURE__ */ new Set()).current, u = wr(i);
  return nt(() => {
    i !== u.current && (u.current = i, a.forEach((p) => p()));
  }), _e(() => ({
    getState: () => u.current,
    subscribe: (p) => (a.add(p), () => a.delete(p)),
    render: (p) => {
      const h = r.element !== p;
      r.element = p, r.onRender(h) && n(p);
    },
    unmount: r.onUnmount
  }), []);
}), Cy = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (h) => i ? h : (i = !0, El(() => {
      h && (a = ws(p, u)), !d.isDirty && xs(p, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, Ss(p);
    }
  }, d = new Ey(() => {
    a = ws(p, u), !(d.isDirty || !i) && xs(p, a);
  }), p = co(by, () => d.markDirty());
  return El(() => {
    d.markDirty();
  }), a.state;
}, ys = /* @__PURE__ */ Symbol("tap.Context"), ep = (r) => ({
  [ys]: r
}), tp = (r, n, i) => {
  const a = r[ys];
  r[ys] = n;
  try {
    return i();
  } finally {
    r[ys] = a;
  }
}, np = (r) => r[ys], af = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (v, x) => {
    const b = typeof v == "function" ? v(n) : v;
    if (!Object.is(b, n)) {
      const _ = n;
      n = x ?? (typeof b != "object" || b === null) ? b : Object.assign({}, n, b), i.forEach((I) => I(n, _));
    }
  }, u = () => n, h = { setState: a, getState: u, getInitialState: () => y, subscribe: (v) => (i.add(v), () => i.delete(v)) }, y = n = r(a, u, h);
  return h;
}, Ty = ((r) => r ? af(r) : af), Iy = (r) => r;
function Ry(r, n = Iy) {
  const i = Mt.useSyncExternalStore(
    r.subscribe,
    Mt.useCallback(() => n(r.getState()), [r, n]),
    Mt.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return Mt.useDebugValue(i), i;
}
const lf = (r) => {
  const n = Ty(r), i = (a) => Ry(n, a);
  return Object.assign(i, n), i;
}, Ay = ((r) => r ? lf(r) : lf);
function uf(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function rp(...r) {
  return (n) => {
    let i = !1;
    const a = r.map((u) => {
      const d = uf(u, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : uf(r[u], null);
        }
      };
  };
}
function po(...r) {
  return k.useCallback(rp(...r), r);
}
const sp = Ae((r) => {
  const n = _e(() => Cy(r, { mount: !1 }), [r.type]);
  return nt(() => {
    n.render(r);
  }), n;
});
class My {
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
const jt = (r, n) => {
  const i = wr(r);
  nt(() => {
    i.current = r;
  });
  const a = _e(() => new Proxy({}, new My(i)), []), u = n?.key, d = r.getState();
  return _e(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, Ki = Ae((r) => {
  const n = wr(r.get);
  return nt(() => {
    n.current = r.get;
  }), _e(() => Xe({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), Py = Ae((r) => {
  const n = gs(r.scopeElement);
  return _e(() => [r.fieldName, n], [r.fieldName, n]);
}), Ny = Ae((r) => {
  const { on: n, subscribe: i, ...a } = r, u = wr({ on: n, subscribe: i });
  nt(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = Xf(a, (p, h) => Py({
    fieldName: h,
    scopeElement: p
  }), []);
  return _e(() => {
    const p = Object.fromEntries(Object.values(d)), { on: h, subscribe: y } = u.current;
    return h && (p.on = (v, x) => h(v, x)), y && (p.subscribe = (v) => y(v)), p;
  }, [d]);
}), ip = ep(null), jy = (r, n) => tp(ip, r, n), op = () => {
  const r = np(ip);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, Ly = Ae(({ toolkit: r }) => {
  const [n, i] = $t(() => ({
    tools: {}
  })), a = op();
  nt(() => {
    if (!r)
      return;
    const d = [];
    for (const [y, v] of Object.entries(r))
      v.render && d.push(u(y, v.render));
    const p = Object.entries(r).reduce((y, [v, x]) => {
      const { render: b, ..._ } = x;
      return y[v] = _, y;
    }, {}), h = {
      getModelContext: () => ({
        tools: p
      })
    };
    return d.push(a.register(h)), () => {
      d.forEach((y) => y());
    };
  }, [r, a]);
  const u = (d, p) => (i((h) => ({
    ...h,
    tools: {
      ...h.tools,
      [d]: [...h.tools[d] ?? [], p]
    }
  })), () => {
    i((h) => ({
      ...h,
      tools: {
        ...h.tools,
        [d]: h.tools[d]?.filter((y) => y !== p) ?? []
      }
    }));
  });
  return jt({
    getState: () => n,
    setToolUI: u
  });
}), Oy = Ae(() => _e(() => {
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
          for (const p of u)
            p(a);
        if (d)
          for (const p of d)
            p({ event: i, payload: a });
      });
    }
  };
}, [])), ap = ep(null), zy = (r, n) => tp(ap, r, n), $l = () => {
  const r = np(ap);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, Dy = Ae(() => {
  const [r] = $t(() => ({})), n = new Bf();
  return jt({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), By = Ae(({ threads: r, modelContext: n, tools: i }) => {
  const a = Ht(Oy()), { threads: u, tools: d, modelContext: p } = zy(a, () => {
    const y = gs(n ?? Dy(), [n]);
    return jy(y.api, () => ({
      modelContext: y,
      tools: gs(i ?? Ly({}), [i]),
      threads: gs(r, [r])
    }));
  }), h = _e(() => ({
    threads: u.state,
    tools: d.state,
    modelContext: p.state
  }), [u.state, d.state, p.state]);
  return jt({
    getState: () => h,
    threads: u.api,
    tools: d.api,
    modelContext: p.api,
    on: a.on
  });
}), Fy = (r) => {
  const n = () => r.getState().api.threads.item("main");
  return {
    threads: Xe({
      source: "root",
      query: {},
      get: () => r.getState().api.threads
    }),
    tools: Xe({
      source: "root",
      query: {},
      get: () => r.getState().api.tools
    }),
    modelContext: Xe({
      source: "root",
      query: {},
      get: () => r.getState().api.modelContext
    }),
    thread: Xe({
      source: "threads",
      query: { type: "main" },
      get: () => r.getState().api.threads.thread("main")
    }),
    threadListItem: Xe({
      source: "threads",
      query: { type: "main" },
      get: () => n()
    }),
    composer: Xe({
      source: "thread",
      query: {},
      get: () => r.getState().api.threads.thread("main").composer
    }),
    on(i, a) {
      const { event: u, scope: d } = fo(i);
      if (d === "*")
        return r.getState().api.on(u, a);
      if (ms("thread", d) || ms("thread-list-item", d) || ms("composer", d))
        return r.getState().api.on(u, (p) => {
          p.threadId === n().getState().id && a(p);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, Uy = (r) => {
  const n = Hl(), i = Ul(sp(By(r))), a = k.useMemo(() => Fy(i), [i]);
  return k.useMemo(() => up(n, a), [n, a]);
}, Xe = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, Ji = () => () => {
}, lp = k.createContext({
  threads: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Threads is only available inside <AssistantProvider />");
    }
  }),
  tools: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Tools is only available inside <AssistantProvider />");
    }
  }),
  modelContext: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("ModelContext is only available inside <AssistantProvider />");
    }
  }),
  threadListItem: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("ThreadListItem is only available inside <AssistantProvider />");
    }
  }),
  thread: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Thread is only available inside <AssistantProvider />");
    }
  }),
  composer: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Composer is only available inside <AssistantProvider />");
    }
  }),
  message: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Message is only available inside <ThreadPrimitive.Messages />");
    }
  }),
  part: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Part is only available inside <MessagePrimitive.Parts />");
    }
  }),
  attachment: Xe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Attachment is only available inside <MessagePrimitive.Attachments /> or <ComposerPrimitive.Attachments />");
    }
  }),
  subscribe: Ji,
  on: (r) => {
    const { scope: n } = fo(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), Hl = () => k.useContext(lp), Vl = (r) => {
  const n = Hl(), i = Ul(Ny(r));
  return k.useMemo(() => up(n, i), [n, i]);
}, $y = (r) => Uy(r);
function Lt(r) {
  return r ? $y(r) : Hl();
}
const Hy = (r, n) => r === Ji ? n : n === Ji ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, up = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: Hy(r.subscribe, i ?? Ji)
  };
}, ho = ({ api: r, children: n, devToolsVisible: i = !0 }) => (k.useEffect(() => {
  if (!(!i || !r.subscribe))
    return Fn.register(r);
}, [r, i]), m.jsx(lp.Provider, { value: r, children: n }));
class cf {
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
const be = (r) => {
  const n = Lt(), i = k.useMemo(() => new cf(n), [n]), a = k.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (k.useDebugValue(a), a instanceof cf)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, gl = (r, n) => {
  const i = Lt(), a = k.useRef(n);
  k.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = fo(r);
  k.useEffect(() => i.on({ scope: u, event: d }, (p) => a.current(p)), [i, u, d]);
};
function Vy(r, n) {
  function i(a) {
    const u = k.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function cp(r, n) {
  function i(u) {
    const d = r(u);
    return d ? d[n] : null;
  }
  function a(u) {
    let d = !1, p;
    typeof u == "function" ? p = u : u && typeof u == "object" && (d = !!u.optional, p = u.selector);
    const h = i({
      optional: d
    });
    return h ? p ? h(p) : h() : null;
  }
  return {
    [n]: a,
    [`${n}Store`]: i
  };
}
const dp = k.createContext(null), Wy = Vy(dp, "ThreadPrimitive.Viewport"), { useThreadViewport: Xi, useThreadViewportStore: Wl } = cp(Wy, "useThreadViewport"), Gy = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function Yy(r, n = Qy) {
  Gy(r);
  const i = k.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return k.useDebugValue(i), i;
}
const Qy = (r) => r;
function qy(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? Yy(d, u) : null;
  }
  return n;
}
function Ky(r) {
  const n = Lt(), i = be(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const St = qy(Ky), Vn = (r) => {
  const [, n] = $t(r.getState);
  return nt(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, Jy = Ae(({ runtime: r }) => {
  const n = Vn(r), i = $l();
  return nt(() => {
    const a = [], u = [
      "switched-to",
      "switched-away"
    ];
    for (const d of u) {
      const p = r.unstable_on(d, () => {
        i.emit(`thread-list-item.${d}`, {
          threadId: r.getState().id
        });
      });
      a.push(p);
    }
    return () => {
      for (const d of a)
        d();
    };
  }, [r, i]), jt({
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
}), Es = (r) => {
  const n = _e(() => Object.fromEntries(r), [r]), i = Xf(n, (d) => d, []), a = _e(() => Object.keys(i), [i]);
  return {
    state: _e(() => {
      const d = new Array(a.length);
      for (let p = 0; p < a.length; p++)
        d[p] = i[a[p]].state;
      return d;
    }, [a, i]),
    api: (d) => {
      const p = "index" in d ? i[a[d.index]]?.api : i[d.key]?.api;
      if (!p)
        throw new Error(`tapLookupResources: Resource not found for lookup: ${JSON.stringify(d)}`);
      return p;
    }
  };
}, fp = Ae(({ runtime: r }) => {
  const n = Vn(r);
  return jt({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), Xy = Ae(({ runtime: r, index: n }) => {
  const i = _e(() => r.getAttachmentByIndex(n), [r, n]);
  return Ht(fp({
    runtime: i
  }));
}), pp = Ae(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = Vn(i), u = $l();
  nt(() => {
    const h = [], y = [
      "send",
      "attachment-add"
    ];
    for (const v of y) {
      const x = i.unstable_on(v, () => {
        u.emit(`composer.${v}`, {
          threadId: r.current,
          ...n && { messageId: n.current }
        });
      });
      h.push(x);
    }
    return () => {
      for (const v of h)
        v();
    };
  }, [i, u, r, n]);
  const d = Es(a.attachments.map((h, y) => [
    h.id,
    Xy({ runtime: i, index: y })
  ])), p = _e(() => ({
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
  return jt({
    getState: () => p,
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
    attachment: (h) => "id" in h ? d.api({ key: h.id }) : d.api(h),
    __internal_getRuntime: () => i
  });
}), Zy = Ae(({ runtime: r }) => {
  const n = Vn(r);
  return jt({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), ev = Ae(({ runtime: r, index: n }) => {
  const i = _e(() => r.getAttachmentByIndex(n), [r, n]);
  return Ht(fp({ runtime: i }));
}), tv = Ae(({ runtime: r, index: n }) => {
  const i = _e(() => r.getMessagePartByIndex(n), [r, n]);
  return Ht(Zy({ runtime: i }));
}), nv = Ae(({ runtime: r, threadIdRef: n }) => {
  const i = Vn(r), [a, u] = $t(!1), [d, p] = $t(!1), h = _e(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), y = Ht(pp({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: h
  })), v = Es(i.content.map((_, I) => [
    "toolCallId" in _ && _.toolCallId != null ? `toolCallId-${_.toolCallId}` : `index-${I}`,
    tv({ runtime: r, index: I })
  ])), x = Es(i.attachments?.map((_, I) => [
    _.id,
    ev({ runtime: r, index: I })
  ]) ?? []), b = _e(() => ({
    ...i,
    parts: v.state,
    composer: y.state,
    isCopied: a,
    isHovering: d
  }), [
    i,
    v.state,
    y.state,
    a,
    d
  ]);
  return jt({
    getState: () => b,
    composer: y.api,
    reload: (_) => r.reload(_),
    speak: () => r.speak(),
    stopSpeaking: () => r.stopSpeaking(),
    submitFeedback: (_) => r.submitFeedback(_),
    switchToBranch: (_) => r.switchToBranch(_),
    getCopyText: () => r.unstable_getCopyText(),
    part: (_) => "index" in _ ? v.api({ index: _.index }) : v.api({ key: `toolCallId-${_.toolCallId}` }),
    attachment: (_) => "id" in _ ? x.api({ key: _.id }) : x.api(_),
    setIsCopied: u,
    setIsHovering: p,
    __internal_getRuntime: () => r
  }, {
    key: i.id
  });
}), rv = Ae(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = _e(() => r.getMessageById(n), [r, n]);
  return Ht(nv({ runtime: a, threadIdRef: i }));
}), sv = Ae(({ runtime: r }) => {
  const n = Vn(r), i = $l();
  nt(() => {
    const h = [], y = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const v of y) {
      const x = r.unstable_on(v, () => {
        const b = r.getState()?.threadId || "unknown";
        i.emit(`thread.${v}`, {
          threadId: b
        });
      });
      h.push(x);
    }
    return () => {
      for (const v of h)
        v();
    };
  }, [r]);
  const a = _e(() => ({
    get current() {
      return r.getState().threadId;
    }
  }), [r]), u = Ht(pp({
    runtime: r.composer,
    threadIdRef: a
  })), d = Es(n.messages.map((h) => [
    h.id,
    rv({ runtime: r, id: h.id, threadIdRef: a })
  ])), p = _e(() => ({
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
  return jt({
    getState: () => p,
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
    message: (h) => "id" in h ? d.api({ key: h.id }) : d.api(h),
    __internal_getRuntime: () => r
  });
}), iv = Ae(({ runtime: r, id: n }) => {
  const i = _e(() => r.getItemById(n), [r, n]);
  return Ht(Jy({
    runtime: i
  }));
}), ov = Ae(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = Vn(r), a = Ht(sv({
    runtime: r.main
  })), u = Es(Object.keys(i.threadItems).map((p) => [
    p,
    iv({ runtime: r, id: p })
  ])), d = _e(() => ({
    mainThreadId: i.mainThreadId,
    newThreadId: i.newThread ?? null,
    isLoading: i.isLoading,
    threadIds: i.threads,
    archivedThreadIds: i.archivedThreads,
    threadItems: u.state,
    main: a.state
  }), [i, u.state, a.state]);
  return jt({
    getState: () => d,
    thread: () => a.api,
    item: (p) => {
      if (p === "main")
        return u.api({ key: d.mainThreadId });
      if ("id" in p)
        return u.api({ key: p.id });
      const { index: h, archived: y = !1 } = p, v = y ? d.archivedThreadIds[h] : d.threadIds[h];
      return u.api({ key: v });
    },
    switchToThread: (p) => {
      r.switchToThread(p);
    },
    switchToNewThread: () => {
      r.switchToNewThread();
    },
    __internal_getAssistantRuntime: () => n
  });
}), av = Ae((r) => {
  const n = op();
  return nt(() => r.registerModelContextProvider(n), [r, n]), Ht(ov({
    runtime: r.threads,
    __internal_assistantRuntime: r
  }));
}), yl = (r) => {
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
}, lv = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = yl((p) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: p
      }
    });
  }), a = yl((p) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: p
      }
    });
  }), u = yl((p) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: p
      }
    });
  }), d = Ay(() => ({
    isAtBottom: !0,
    scrollToBottom: ({ behavior: p = "auto" } = {}) => {
      for (const h of n)
        h({ behavior: p });
    },
    onScrollToBottom: (p) => (n.add(p), () => {
      n.delete(p);
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
}, ks = (r) => r, uv = (r) => {
  const n = Wl({ optional: !0 }), [i] = k.useState(() => lv(r));
  return k.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), k.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && ks(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), k.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && ks(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, hp = ({ children: r, options: n = {} }) => {
  const i = uv(n), [a] = k.useState(() => ({
    useThreadViewport: i
  }));
  return m.jsx(dp.Provider, { value: a, children: r });
}, cv = (r) => r._core?.RenderComponent, dv = ({ children: r, runtime: n }) => {
  const i = Lt({
    threads: av(n)
  }), a = cv(n);
  return m.jsxs(ho, { api: i, children: [a && m.jsx(a, {}), m.jsx(hp, { children: r })] });
}, fv = k.memo(dv), pv = ({ index: r, children: n }) => {
  const i = Lt(), a = Vl({
    message: Ki({
      source: "thread",
      query: { type: "index", index: r },
      get: () => i.thread().message({ index: r })
    }),
    composer: Ki({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: r }).composer
    }),
    on(u, d) {
      const p = () => i.thread().message({ index: r }), { event: h, scope: y } = fo(u);
      return !ms("composer", y) && !ms("message", y) ? i.on(u, d) : i.on({ scope: "thread", event: h }, (v) => {
        v.messageId === p().getState().id && d(v);
      });
    }
  });
  return m.jsx(ho, { api: a, children: n });
}, hv = ({ index: r, children: n }) => {
  const i = Lt(), a = Vl({
    part: Ki({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return m.jsx(ho, { api: a, children: n });
}, mv = Ae(({ text: r, isRunning: n }) => {
  const i = _e(() => ({
    type: "text",
    text: r,
    status: n ? { type: "running" } : { type: "complete" }
  }), [r, n]);
  return jt({
    getState: () => i,
    addToolResult: () => {
      throw new Error("Not supported");
    },
    resumeToolCall: () => {
      throw new Error("Not supported");
    }
  });
}), gv = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = Ul(sp(mv({ text: r, isRunning: n }))), u = Vl({
    part: Ki({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return m.jsx(ho, { api: u, children: i });
};
class yv {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new ey(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
    return this._core.threads.getMainThreadRuntimeCore().import(Dl.fromArray(n ?? []));
  }
}
function mo(r) {
  const n = k.useRef(r);
  return k.useEffect(() => {
    n.current = r;
  }), k.useMemo(() => (...i) => n.current?.(...i), []);
}
const vv = k.createContext(null);
function _v(r) {
  const n = k.useContext(vv);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: Rw, useSmoothStatusStore: Sv } = cp(_v, "useSmoothStatus");
class wv {
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
    let p = 0;
    for (; a >= d && p < u; )
      p++, a -= d;
    p !== u ? this.animationFrameId = requestAnimationFrame(this.animate) : this.animationFrameId = null, p !== 0 && (this.currentText = this.targetText.slice(0, this.currentText.length + p), this.lastUpdateTime = n - a, this.setText(this.currentText));
  };
}
const vl = Object.freeze({
  type: "running"
}), xv = (r, n = !1) => {
  const { text: i } = r, a = be(({ message: x }) => x.id), u = k.useRef(a), [d, p] = k.useState(i), h = Sv({ optional: !0 }), y = mo((x) => {
    if (p(x), h) {
      const b = d !== x || r.status.type === "running" ? vl : r.status;
      ks(h).setState(b, !0);
    }
  });
  k.useEffect(() => {
    if (h) {
      const x = n && (d !== i || r.status.type === "running") ? vl : r.status;
      ks(h).setState(x, !0);
    }
  }, [h, n, i, d, r.status]);
  const [v] = k.useState(new wv(i, y));
  return k.useEffect(() => {
    if (!n) {
      v.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(v.targetText)) {
      u.current = a, y(i), v.currentText = i, v.targetText = i, v.stop();
      return;
    }
    v.targetText = i, v.start();
  }, [y, v, a, n, i]), k.useEffect(() => () => {
    v.stop();
  }, [v]), k.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : vl
  } : r, [n, d, r, i]);
};
var Ev = /* @__PURE__ */ Symbol.for("react.lazy"), Zi = hg[" use ".trim().toString()];
function kv(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function mp(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === Ev && "_payload" in r && kv(r._payload);
}
// @__NO_SIDE_EFFECTS__
function gp(r) {
  const n = /* @__PURE__ */ bv(r), i = k.forwardRef((a, u) => {
    let { children: d, ...p } = a;
    mp(d) && typeof Zi == "function" && (d = Zi(d._payload));
    const h = k.Children.toArray(d), y = h.find(Tv);
    if (y) {
      const v = y.props.children, x = h.map((b) => b === y ? k.Children.count(v) > 1 ? k.Children.only(null) : k.isValidElement(v) ? v.props.children : null : b);
      return /* @__PURE__ */ m.jsx(n, { ...p, ref: u, children: k.isValidElement(v) ? k.cloneElement(v, void 0, x) : null });
    }
    return /* @__PURE__ */ m.jsx(n, { ...p, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var yp = /* @__PURE__ */ gp("Slot");
// @__NO_SIDE_EFFECTS__
function bv(r) {
  const n = k.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if (mp(u) && typeof Zi == "function" && (u = Zi(u._payload)), k.isValidElement(u)) {
      const p = Rv(u), h = Iv(d, u.props);
      return u.type !== k.Fragment && (h.ref = a ? rp(a, p) : p), k.cloneElement(u, h);
    }
    return k.Children.count(u) > 1 ? k.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var Cv = /* @__PURE__ */ Symbol("radix.slottable");
function Tv(r) {
  return k.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === Cv;
}
function Iv(r, n) {
  const i = { ...n };
  for (const a in n) {
    const u = r[a], d = n[a];
    /^on[A-Z]/.test(a) ? u && d ? i[a] = (...h) => {
      const y = d(...h);
      return u(...h), y;
    } : u && (i[a] = u) : a === "style" ? i[a] = { ...u, ...d } : a === "className" && (i[a] = [u, d].filter(Boolean).join(" "));
  }
  return { ...r, ...i };
}
function Rv(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var Av = [
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
], Cr = Av.reduce((r, n) => {
  const i = /* @__PURE__ */ gp(`Primitive.${n}`), a = k.forwardRef((u, d) => {
    const { asChild: p, ...h } = u, y = p ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m.jsx(y, { ...h, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function vs(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const vp = (r, n, i = []) => {
  const a = k.forwardRef((u, d) => {
    const p = {}, h = {};
    Object.keys(u).forEach((v) => {
      i.includes(v) ? p[v] = u[v] : h[v] = u[v];
    });
    const y = n(p) ?? void 0;
    return m.jsx(Cr.button, { type: "button", ...h, ref: d, disabled: h.disabled || !y, onClick: vs(h.onClick, y) });
  });
  return a.displayName = r, a;
};
function Mv(r, n = globalThis?.document) {
  const i = mo(r);
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
}, _p = (r, n) => {
  const i = k.useCallback((a) => {
    if (!r)
      return;
    const u = r(), d = () => {
      const h = n ? n(a) : a.offsetHeight;
      u.setHeight(h);
    }, p = new ResizeObserver(d);
    return p.observe(a), d(), () => {
      p.disconnect(), u.unregister();
    };
  }, [r, n]);
  return Is(i);
}, df = k.createContext(!1), ff = (r, n) => {
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
}, Sp = ({ children: r, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const a = be(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: y, message: v }) => v.isLast && v.role === "assistant" && v.index >= 1 && y.messages.at(v.index - 1)?.role === "user"
  ), u = Wl({ optional: !0 }), d = k.useContext(df), p = k.useCallback((y) => {
    if (!u || d)
      return;
    const v = () => {
      const x = u.getState();
      if (x.turnAnchor === "top" && a) {
        const { viewport: b, inset: _, userMessage: I } = x.height, N = ff(n, y), P = ff(i, y), B = I <= N ? I : P, $ = Math.max(0, b - _ - B);
        y.style.minHeight = `${$}px`, y.style.flexShrink = "0", y.style.transition = "min-height 0s";
      } else
        y.style.minHeight = "", y.style.flexShrink = "", y.style.transition = "";
    };
    return v(), u.subscribe(v);
  }, [
    u,
    a,
    d,
    n,
    i
  ]), h = Is(p);
  return m.jsx(df.Provider, { value: !0, children: m.jsx(yp, { ref: h, children: r }) });
};
Sp.displayName = "ThreadPrimitive.ViewportSlack";
const Pv = () => {
  const r = Lt(), n = be(() => r.message()), i = k.useCallback((a) => {
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
}, Nv = () => {
  const r = Xi((u) => u.turnAnchor), n = Xi((u) => u.registerUserMessageHeight), i = be(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = k.useCallback((u) => u.offsetHeight, []);
  return _p(i ? n : null, a);
}, Gl = k.forwardRef((r, n) => {
  const i = Pv(), a = Nv(), u = po(n, i, a);
  return m.jsx(Sp, { children: m.jsx(Cr.div, { ...r, ref: u }) });
});
Gl.displayName = "MessagePrimitive.Root";
const jv = () => be(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), wp = k.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = xv(jv(), r);
  return m.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
wp.displayName = "MessagePartPrimitive.Text";
const Lv = () => be(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), xp = k.forwardRef((r, n) => {
  const { image: i } = Lv();
  return m.jsx(Cr.img, { src: i, ...r, ref: n });
});
xp.displayName = "MessagePartPrimitive.Image";
const Ep = ({ children: r }) => be(({ part: i }) => i.status.type === "running") ? r : null;
Ep.displayName = "MessagePartPrimitive.InProgress";
const pf = (r) => Symbol.iterator in r, hf = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), mf = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, Ov = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function zv(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : pf(r) && pf(n) ? hf(r) && hf(n) ? mf(r, n) : Ov(r, n) : mf(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function Dv(r) {
  const n = Mt.useRef(void 0);
  return (i) => {
    const a = r(i);
    return zv(n.current, a) ? n.current : n.current = a;
  };
}
const gf = (r) => {
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
}, Bv = (r) => {
  const n = [], i = gf("toolGroup"), a = gf("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, Fv = () => {
  const r = be(Dv((n) => n.message.parts.map((i) => i.type)));
  return k.useMemo(() => r.length === 0 ? [] : Bv(r), [r]);
}, Uv = ({ Fallback: r, ...n }) => {
  const i = be(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? m.jsx(i, { ...n }) : null;
}, nn = {
  Text: () => m.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [m.jsx(wp, {}), m.jsx(Ep, { children: m.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => m.jsx(xp, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, $v = ({ components: { Text: r = nn.Text, Reasoning: n = nn.Reasoning, Image: i = nn.Image, Source: a = nn.Source, File: u = nn.File, Unstable_Audio: d = nn.Unstable_Audio, tools: p = {} } = {} }) => {
  const h = Lt(), y = be(({ part: x }) => x), v = y.type;
  if (v === "tool-call") {
    const x = h.part().addToolResult, b = h.part().resumeToolCall;
    if ("Override" in p)
      return m.jsx(p.Override, { ...y, addResult: x, resume: b });
    const _ = p.by_name?.[y.toolName] ?? p.Fallback;
    return m.jsx(Uv, { ...y, Fallback: _, addResult: x, resume: b });
  }
  if (y.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (v) {
    case "text":
      return m.jsx(r, { ...y });
    case "reasoning":
      return m.jsx(n, { ...y });
    case "source":
      return m.jsx(a, { ...y });
    case "image":
      return m.jsx(i, { ...y });
    case "file":
      return m.jsx(u, { ...y });
    case "audio":
      return m.jsx(d, { ...y });
    case "data":
      return null;
    default:
      const x = v;
      throw new Error(`Unknown message part type: ${x}`);
  }
}, Yi = k.memo(({ index: r, components: n }) => m.jsx(hv, { index: r, children: m.jsx($v, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
Yi.displayName = "MessagePrimitive.PartByIndex";
const Hv = ({ status: r, component: n }) => m.jsx(gv, { text: "", isRunning: r.type === "running", children: m.jsx(n, { type: "text", text: "", status: r }) }), Vv = Object.freeze({
  type: "complete"
}), Wv = ({ components: r }) => {
  const n = be((i) => i.message.status ?? Vv);
  return r?.Empty ? m.jsx(r.Empty, { status: n }) : m.jsx(Hv, { status: n, component: r?.Text ?? nn.Text });
}, Gv = k.memo(Wv, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), Yl = ({ components: r }) => {
  const n = be(({ message: u }) => u.parts.length), i = Fv(), a = k.useMemo(() => n === 0 ? m.jsx(Gv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return m.jsx(Yi, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? nn.ToolGroup;
      return m.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (p, h) => m.jsx(Yi, { index: u.startIndex + h, components: r }, h)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? nn.ReasoningGroup;
      return m.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (p, h) => m.jsx(Yi, { index: u.startIndex + h, components: r }, h)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return m.jsx(m.Fragment, { children: a });
};
Yl.displayName = "MessagePrimitive.Parts";
const kp = ({ children: r }) => be(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
kp.displayName = "MessagePrimitive.Error";
const bp = () => {
  const r = Lt(), n = be((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = k.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, Yv = vp("ComposerPrimitive.Send", bp), Cp = k.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = bp(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return m.jsx(Cr.form, { ...n, ref: i, onSubmit: vs(r, u) });
});
Cp.displayName = "ComposerPrimitive.Root";
function kl() {
  return kl = Object.assign ? Object.assign.bind() : function(r) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }
    return r;
  }, kl.apply(null, arguments);
}
function Qv(r, n) {
  if (r == null) return {};
  var i = {};
  for (var a in r) if ({}.hasOwnProperty.call(r, a)) {
    if (n.indexOf(a) !== -1) continue;
    i[a] = r[a];
  }
  return i;
}
var qv = k.useLayoutEffect, Kv = function(n) {
  var i = Mt.useRef(n);
  return qv(function() {
    i.current = n;
  }), i;
}, yf = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, Jv = function(n, i) {
  var a = Mt.useRef();
  return Mt.useCallback(function(u) {
    n.current = u, a.current && yf(a.current, null), a.current = i, i && yf(i, u);
  }, [i]);
}, vf = {
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
}, Xv = function(n) {
  Object.keys(vf).forEach(function(i) {
    n.style.setProperty(i, vf[i], "important");
  });
}, _f = Xv, tt = null, Sf = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function Zv(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), tt || (tt = document.createElement("textarea"), tt.setAttribute("tabindex", "-1"), tt.setAttribute("aria-hidden", "true"), _f(tt)), tt.parentNode === null && document.body.appendChild(tt);
  var u = r.paddingSize, d = r.borderSize, p = r.sizingStyle, h = p.boxSizing;
  Object.keys(p).forEach(function(_) {
    var I = _;
    tt.style[I] = p[I];
  }), _f(tt), tt.value = n;
  var y = Sf(tt, r);
  tt.value = n, y = Sf(tt, r), tt.value = "x";
  var v = tt.scrollHeight - u, x = v * i;
  h === "border-box" && (x = x + u + d), y = Math.max(x, y);
  var b = v * a;
  return h === "border-box" && (b = b + u + d), y = Math.min(b, y), [y, v];
}
var wf = function() {
}, e_ = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, t_ = [
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
], n_ = !!document.documentElement.currentStyle, r_ = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = e_(t_, i), u = a.boxSizing;
  if (u === "")
    return null;
  n_ && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), p = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: p
  };
}, s_ = r_;
function Ql(r, n, i) {
  var a = Kv(i);
  k.useLayoutEffect(function() {
    var u = function(p) {
      return a.current(p);
    };
    if (r)
      return r.addEventListener(n, u), function() {
        return r.removeEventListener(n, u);
      };
  }, []);
}
var i_ = function(n, i) {
  Ql(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, o_ = function(n) {
  Ql(window, "resize", n);
}, a_ = function(n) {
  Ql(document.fonts, "loadingdone", n);
}, l_ = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], u_ = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, p = n.onChange, h = p === void 0 ? wf : p, y = n.onHeightChange, v = y === void 0 ? wf : y, x = Qv(n, l_), b = x.value !== void 0, _ = k.useRef(null), I = Jv(_, i), N = k.useRef(0), P = k.useRef(), B = function() {
    var te = _.current, oe = a && P.current ? P.current : s_(te);
    if (oe) {
      P.current = oe;
      var fe = Zv(oe, te.value || te.placeholder || "x", d, u), J = fe[0], D = fe[1];
      N.current !== J && (N.current = J, te.style.setProperty("height", J + "px", "important"), v(J, {
        rowHeight: D
      }));
    }
  }, $ = function(te) {
    b || B(), h(te);
  };
  return k.useLayoutEffect(B), i_(_, function() {
    if (!b) {
      var K = _.current.value;
      requestAnimationFrame(function() {
        var te = _.current;
        te && K !== te.value && B();
      });
    }
  }), o_(B), a_(B), /* @__PURE__ */ k.createElement("textarea", kl({}, x, {
    onChange: $,
    ref: I
  }));
}, c_ = /* @__PURE__ */ k.forwardRef(u_);
const Tp = (r) => {
  const n = mo(r), i = Xi((a) => a.onScrollToBottom);
  k.useEffect(() => i(n), [i, n]);
}, Ip = k.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: p = !0, cancelOnEscape: h = !0, unstable_focusOnRunStart: y = !0, unstable_focusOnScrollToBottom: v = !0, unstable_focusOnThreadSwitched: x = !0, addAttachmentOnPaste: b = !0, ..._ }, I) => {
  const N = Lt(), P = be(({ composer: F }) => F.isEditing ? F.text : ""), B = n ? yp : c_, $ = be(({ thread: F, composer: se }) => F.isDisabled || se.dictation?.inputDisabled) || i, K = k.useRef(null), te = po(I, K);
  Mv((F) => {
    if (!h || !K.current?.contains(F.target))
      return;
    const se = N.composer();
    se.getState().canCancel && (se.cancel(), F.preventDefault());
  });
  const oe = (F) => {
    $ || !p || F.nativeEvent.isComposing || F.key === "Enter" && F.shiftKey === !1 && (N.thread().getState().isRunning || (F.preventDefault(), K.current?.closest("form")?.requestSubmit()));
  }, fe = async (F) => {
    if (!b)
      return;
    const se = N.thread().getState().capabilities, G = Array.from(F.clipboardData?.files || []);
    if (se.attachments && G.length > 0)
      try {
        F.preventDefault(), await Promise.all(G.map((Ce) => N.composer().addAttachment(Ce)));
      } catch (Ce) {
        console.error("Error adding attachment:", Ce);
      }
  }, J = r && !$, D = k.useCallback(() => {
    const F = K.current;
    !F || !J || (F.focus({ preventScroll: !0 }), F.setSelectionRange(F.value.length, F.value.length));
  }, [J]);
  return k.useEffect(() => D(), [D]), Tp(() => {
    N.composer().getState().type === "thread" && v && D();
  }), k.useEffect(() => {
    if (!(N.composer().getState().type !== "thread" || !y))
      return N.on("thread.run-start", D);
  }, [y, D, N]), k.useEffect(() => {
    if (!(N.composer().getState().type !== "thread" || !x))
      return N.on("thread-list-item.switched-to", D);
  }, [x, D, N]), m.jsx(B, { name: "input", value: P, ..._, ref: te, disabled: $, onChange: vs(a, (F) => {
    N.composer().getState().isEditing && El(() => {
      N.composer().setText(F.target.value);
    });
  }), onKeyDown: vs(u, oe), onPaste: vs(d, fe) });
});
Ip.displayName = "ComposerPrimitive.Input";
const d_ = () => {
  const r = Lt(), n = be(({ composer: a }) => !a.canCancel), i = k.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, f_ = vp("ComposerPrimitive.Cancel", d_), Rp = k.forwardRef((r, n) => m.jsx(Cr.div, { ...r, ref: n }));
Rp.displayName = "ThreadPrimitive.Root";
const p_ = (r) => be(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), bl = ({ children: r, ...n }) => p_(n) ? r : null;
bl.displayName = "ThreadPrimitive.If";
const h_ = (r) => {
  const n = mo(r), i = k.useCallback((a) => {
    const u = new ResizeObserver(() => {
      n();
    }), d = new MutationObserver((p) => {
      p.some((y) => y.type !== "attributes" || y.attributeName !== "style") && n();
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
}, m_ = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = k.useRef(null), d = Wl();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const p = k.useRef(0), h = k.useRef(null), y = k.useCallback((I) => {
    const N = u.current;
    N && (h.current = I, N.scrollTo({ top: N.scrollHeight, behavior: I }));
  }, []), v = () => {
    const I = u.current;
    if (!I)
      return;
    const N = d.getState().isAtBottom, P = Math.abs(I.scrollHeight - I.scrollTop - I.clientHeight) < 1 || I.scrollHeight <= I.clientHeight;
    !P && p.current < I.scrollTop || (P && (h.current = null), (P || h.current === null) && P !== N && ks(d).setState({
      isAtBottom: P
    })), p.current = I.scrollTop;
  }, x = h_(() => {
    const I = h.current;
    I ? y(I) : r && d.getState().isAtBottom && y("instant"), v();
  }), b = Is((I) => (I.addEventListener("scroll", v), () => {
    I.removeEventListener("scroll", v);
  }));
  return Tp(({ behavior: I }) => {
    y(I);
  }), gl("thread.run-start", () => {
    n && (h.current = "auto", requestAnimationFrame(() => {
      y("auto");
    }));
  }), gl("thread.initialize", () => {
    i && (h.current = "instant", requestAnimationFrame(() => {
      y("instant");
    }));
  }), gl("thread-list-item.switched-to", () => {
    a && (h.current = "instant", requestAnimationFrame(() => {
      y("instant");
    }));
  }), po(x, b, u);
}, g_ = () => {
  const r = Xi((i) => i.registerViewport), n = k.useCallback((i) => i.clientHeight, []);
  return _p(r, n);
}, Ap = k.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, p) => {
  const h = m_({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), y = g_(), v = po(p, h, y);
  return m.jsx(Cr.div, { ...d, ref: v, children: u });
});
Ap.displayName = "ThreadPrimitive.ViewportScrollable";
const Mp = k.forwardRef(({ turnAnchor: r, ...n }, i) => m.jsx(hp, { options: { turnAnchor: r }, children: m.jsx(Ap, { ...n, ref: i }) }));
Mp.displayName = "ThreadPrimitive.Viewport";
const Pp = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, y_ = () => null, v_ = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? y_;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, __ = ({ components: r }) => {
  const n = be(({ message: u }) => u.role), i = be(({ message: u }) => u.composer.isEditing), a = v_(r, n, i);
  return m.jsx(a, {});
}, Np = k.memo(({ index: r, components: n }) => m.jsx(pv, { index: r, children: m.jsx(__, { components: n }) }), (r, n) => r.index === n.index && Pp(r.components, n.components));
Np.displayName = "ThreadPrimitive.MessageByIndex";
const jp = ({ components: r }) => {
  const n = be(({ thread: a }) => a.messages.length);
  return k.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => m.jsx(Np, { index: u, components: r }, u)), [n, r]);
};
jp.displayName = "ThreadPrimitive.Messages";
const S_ = k.memo(jp, (r, n) => Pp(r.components, n.components)), w_ = 1, eo = Object.freeze({
  product_card: "product_card",
  product_carousel: "product_carousel"
}), bs = Object.freeze({
  [eo.product_card]: "display_product_card",
  [eo.product_carousel]: "display_product_carousel"
}), x_ = Object.freeze(
  Object.fromEntries(
    Object.entries(bs).map(([r, n]) => [n, r])
  )
), Lp = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, Op = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, E_ = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), Rs = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Hn = (r, n = "") => typeof r != "string" ? n : r.trim() || n, _r = (r) => Hn(r) || null, zp = (r) => {
  if (!Rs(r))
    return null;
  const n = {
    product_id: _r(r.product_id),
    handle: _r(r.handle),
    variant_id: _r(r.variant_id)
  };
  return !n.product_id && !n.handle && !n.variant_id ? null : n;
}, k_ = (r, n = 4) => Array.isArray(r) ? r.map(zp).filter(Boolean).slice(0, n) : [], b_ = (r) => {
  if (!Rs(r))
    return null;
  const n = zp(r.product_ref);
  return n ? {
    eyebrow: Hn(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: _r(r.reason),
    note: _r(r.note || r.ritual),
    ctaLabel: Hn(r.cta_label, "View crystal"),
    product_ref: n
  } : null;
}, C_ = (r) => {
  if (!Rs(r))
    return null;
  const n = k_(r.product_refs, 4);
  return n.length === 0 ? null : {
    eyebrow: Hn(r.eyebrow || r.kicker, "Matched for you"),
    title: Hn(r.title, "Recommended crystals"),
    reason: _r(r.reason || r.description),
    product_refs: n
  };
}, T_ = Object.freeze({
  [eo.product_card]: {
    toolName: bs.product_card,
    normalizeProps: b_
  },
  [eo.product_carousel]: {
    toolName: bs.product_carousel,
    normalizeProps: C_
  }
}), ql = (r, n = "component") => {
  if (!Rs(r))
    return null;
  const i = Hn(
    r.component || r.componentType || x_[r.toolName]
  ), a = T_[i];
  if (!a)
    return null;
  const u = a.normalizeProps(
    r.props || r.result?.props || r.result || r.args?.props || r.args || r
  );
  if (!u)
    return null;
  const d = Hn(r.id || r.toolCallId, `${a.toolName}-${n}`);
  return {
    type: "component",
    component: i,
    toolName: a.toolName,
    id: d,
    version: w_,
    props: u
  };
}, go = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = ql(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, Dp = (r) => {
  const n = Array.isArray(r) ? r : Rs(r) && Array.isArray(r.components) ? r.components : [];
  return go([], n);
}, xf = (r, n = "component") => {
  const i = ql(r, n);
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
}, I_ = (r) => ql(r), Bp = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}, R_ = (r = "") => {
  let n = String(r || "");
  const i = [], a = (u) => {
    const d = [...n.matchAll(u)];
    if (d.length !== 0) {
      for (const p of d) {
        const h = Bp(p[1]);
        h && i.push(h);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(Lp()), a(Op()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    payloads: i
  };
}, A_ = (r = "") => {
  const n = String(r || ""), i = [], a = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi;
  let u = 0, d;
  for (; (d = a.exec(n)) !== null; ) {
    d.index > u && i.push({
      type: "text",
      value: n.slice(u, d.index)
    });
    const p = d[0], h = Bp(d[1] || d[2] || "");
    h ? i.push({
      type: "payload",
      value: h
    }) : i.push({
      type: "text",
      value: p
    }), u = d.index + p.length;
  }
  return u < n.length && i.push({
    type: "text",
    value: n.slice(u)
  }), i;
}, Fp = (r = "") => {
  const { answer: n, payloads: i } = R_(r);
  let a = [];
  for (const u of i)
    a = go(a, Dp(u));
  return {
    answer: n,
    components: a
  };
}, M_ = (r = "") => {
  const n = String(r || "").toLowerCase();
  for (let i = 0; i < n.length; i += 1)
    for (const { marker: a, minPrefixLength: u } of E_) {
      if (n[i] !== a[0])
        continue;
      const d = n.slice(i);
      if (d.startsWith(a))
        return i;
      const p = d.slice(0, a.length);
      if (p.length >= u && a.startsWith(p))
        return i;
    }
  return -1;
}, P_ = (r = "") => {
  const n = Lp(), i = Op();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = M_(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, N_ = "section-rendering-askcrystal-chat-product-card", to = /* @__PURE__ */ new Map(), Hi = /* @__PURE__ */ new Map(), Ef = /* @__PURE__ */ new Map(), Vi = /* @__PURE__ */ new Map(), Up = {
  "--product-card-gap": "12px",
  "--product-card-alignment": "stretch",
  "--padding-block-start": "0px",
  "--padding-block-end": "0px",
  "--padding-inline-start": "0px",
  "--padding-inline-end": "0px"
};
function j_(r) {
  return typeof window > "u" ? r : /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `http://localhost:8787${r}` : r;
}
function Kl(r) {
  return I_({
    toolName: r.toolName,
    result: r.result,
    args: r.args,
    toolCallId: r.toolCallId
  });
}
function L_(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n)
    return null;
  if (/^\d+$/.test(n))
    return n;
  const i = n.match(/\/(\d+)(?:\?.*)?$/);
  return i ? i[1] : null;
}
function xr(r) {
  if (!r || typeof r != "object")
    return null;
  const n = typeof r.handle == "string" ? r.handle.trim() : "", i = typeof r.product_id == "string" ? r.product_id.trim() : "", a = typeof r.variant_id == "string" ? r.variant_id.trim() : "";
  return !n && !i && !a ? null : {
    handle: n,
    productId: i,
    variantId: a,
    title: typeof r.title == "string" ? r.title.trim() : "",
    image: typeof r.image == "string" ? r.image.trim() : "",
    imageAlt: typeof r.imageAlt == "string" ? r.imageAlt.trim() : "",
    price: typeof r.price == "string" ? r.price.trim() : "",
    compareAtPrice: typeof r.compareAtPrice == "string" ? r.compareAtPrice.trim() : ""
  };
}
function O_(r) {
  const n = xr(r);
  return n ? JSON.stringify({
    handle: n.handle || "",
    product_id: n.productId || "",
    variant_id: n.variantId || ""
  }) : "";
}
async function z_(r) {
  const n = xr(r);
  if (!n)
    throw new Error("Missing product reference");
  if (n.handle)
    return n;
  const i = O_(r);
  if (!i)
    throw new Error("Missing product reference");
  const a = Ef.get(i);
  if (a)
    return a;
  if (!Vi.has(i)) {
    const u = fetch(j_("/apps/askcrystal/catalog/resolve-product-card"), {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        product_ref: {
          ...n.productId ? { product_id: n.productId } : {},
          ...n.handle ? { handle: n.handle } : {},
          ...n.variantId ? { variant_id: n.variantId } : {}
        }
      })
    }).then(async (d) => {
      const p = await d.json().catch(() => null);
      if (!d.ok || !p?.ok || !p?.product?.handle)
        throw new Error(p?.error || `Failed to resolve product reference (${d.status})`);
      const h = xr({
        product_id: p.product.product_id || n.productId,
        handle: p.product.handle,
        variant_id: p.product.variant_id || n.variantId,
        title: p.product.title || "",
        image: p.product.image || "",
        imageAlt: p.product.imageAlt || "",
        price: p.product.price || "",
        compareAtPrice: p.product.compareAtPrice || ""
      });
      return Ef.set(i, h), h;
    }).finally(() => {
      Vi.delete(i);
    });
    Vi.set(i, u);
  }
  return Vi.get(i);
}
function D_(r, n) {
  const i = xr(r);
  if (!i?.handle || typeof window > "u")
    return null;
  const a = typeof window.Shopify?.routes?.root == "string" ? window.Shopify.routes.root : "/", u = new URL(`products/${i.handle}`, new URL(a, window.location.origin));
  u.searchParams.set("section_id", N_), u.searchParams.set("askcrystal_handle", i.handle);
  const d = L_(i.variantId);
  return d && u.searchParams.set("variant", d), typeof n == "string" && n.trim() && u.searchParams.set("askcrystal_cta", n.trim()), u.toString();
}
function B_(r) {
  const n = typeof r?.handle == "string" ? r.handle.trim() : "";
  return n ? `/products/${n}` : null;
}
function F_(r) {
  const n = typeof r?.title == "string" ? r.title.trim() : "";
  if (n)
    return n;
  const i = typeof r?.handle == "string" ? r.handle.trim() : "";
  return i ? i.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (a) => a.toUpperCase()) : "Recommended crystal";
}
function U_(r) {
  if (!r)
    return !1;
  const n = !!r.querySelector("a[href]"), i = !!r.querySelector("img, .askcrystal-chat-product-card__placeholder");
  return n && i;
}
function $_(r) {
  const i = new DOMParser().parseFromString(r, "text/html").querySelector("[data-askcrystal-native-product-card]");
  return U_(i) ? i.outerHTML.trim() : null;
}
async function H_(r) {
  if (!r)
    throw new Error("Missing product card request URL");
  const n = to.get(r);
  if (n)
    return n;
  if (!Hi.has(r)) {
    const i = fetch(r, {
      headers: {
        accept: "text/html"
      },
      credentials: "same-origin"
    }).then(async (a) => {
      if (!a.ok)
        throw new Error(`Failed to load native product card (${a.status})`);
      const u = await a.text(), d = $_(u);
      if (!d)
        throw new Error("Native product card markup was not found in the section response");
      return to.set(r, d), d;
    }).finally(() => {
      Hi.delete(r);
    });
    Hi.set(r, i);
  }
  return Hi.get(r);
}
function $p({ eyebrow: r, title: n, children: i, className: a = "" }) {
  return /* @__PURE__ */ m.jsxs("section", { className: `ac-tool ${a}`.trim(), children: [
    /* @__PURE__ */ m.jsxs("header", { className: "ac-tool__header", children: [
      r ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__eyebrow", children: r }) : null,
      n ? /* @__PURE__ */ m.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function V_({ productRef: r, ctaLabel: n }) {
  const i = B_(r), a = F_(r), u = n || "View", d = typeof r?.image == "string" ? r.image.trim() : "", p = typeof r?.imageAlt == "string" ? r.imageAlt.trim() : a, h = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__media", children: d ? /* @__PURE__ */ m.jsx("img", { className: "askcrystal-chat-product-card__image", src: d, alt: p, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__body", children: [
      /* @__PURE__ */ m.jsx("product-title", { className: "askcrystal-chat-product-card__title", children: /* @__PURE__ */ m.jsx("span", { className: "title-text", children: a }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__meta", children: [
        r?.price ? /* @__PURE__ */ m.jsxs("div", { className: "askcrystal-chat-product-card__price-group", children: [
          /* @__PURE__ */ m.jsx("span", { className: "askcrystal-chat-product-card__price askcrystal-chat-product-card__price--hydrated", children: r.price }),
          r.compareAtPrice ? /* @__PURE__ */ m.jsx("span", { className: "askcrystal-chat-product-card__compare", children: r.compareAtPrice }) : null
        ] }) : null,
        /* @__PURE__ */ m.jsx("span", { className: "askcrystal-chat-product-card__cta", children: u })
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
          "data-product-id": r?.productId || void 0,
          children: /* @__PURE__ */ m.jsx(
            "div",
            {
              className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
              style: Up,
              children: i ? /* @__PURE__ */ m.jsx("a", { className: "askcrystal-chat-product-card__surface", href: i, children: h }) : /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__surface", children: h })
            }
          )
        }
      )
    }
  );
}
function W_() {
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
          style: Up,
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
function Hp({ productRef: r, ctaLabel: n, variant: i = "block" }) {
  const [a, u] = k.useState(() => xr(r)), d = D_(a, n), [p, h] = k.useState(() => d && to.get(d) || null), [y, v] = k.useState(null), x = i === "carousel" ? " ac-tool-product-native--carousel" : "";
  return k.useEffect(() => {
    let b = !0;
    return z_(r).then((_) => {
      b && k.startTransition(() => {
        u(_);
      });
    }).catch((_) => {
      b && k.startTransition(() => {
        v(_), u(xr(r));
      });
    }), () => {
      b = !1;
    };
  }, [r]), k.useEffect(() => {
    let b = !0;
    if (!d)
      return k.startTransition(() => {
        h(null), v(new Error("Missing product card request URL"));
      }), () => {
        b = !1;
      };
    const _ = to.get(d);
    return _ ? (k.startTransition(() => {
      h(_), v(null);
    }), () => {
      b = !1;
    }) : (k.startTransition(() => {
      h(null), v(null);
    }), H_(d).then((I) => {
      b && k.startTransition(() => {
        h(I), v(null);
      });
    }).catch((I) => {
      b && (typeof console < "u" && typeof console.warn == "function" && console.warn("[AskCrystal] Native product card render fell back to hydrated shell.", {
        requestUrl: d,
        error: I,
        productRef: a
      }), k.startTransition(() => {
        h(null), v(I);
      }));
    }), () => {
      b = !1;
    });
  }, [d, a]), p ? /* @__PURE__ */ m.jsx(
    "div",
    {
      className: `ac-tool-product-native ac-tool-product-native--native${x}`,
      dangerouslySetInnerHTML: { __html: p }
    }
  ) : /* @__PURE__ */ m.jsx(
    "div",
    {
      className: `ac-tool-product-native${x} ${y ? "ac-tool-product-native--fallback" : "ac-tool-product-native--loading"}`.trim(),
      "aria-busy": y ? void 0 : "true",
      "aria-live": "polite",
      children: y ? /* @__PURE__ */ m.jsx(V_, { productRef: a || r, ctaLabel: n }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product-native__loading-label", children: "Polishing the storefront card..." }),
        /* @__PURE__ */ m.jsx(W_, {})
      ] })
    }
  );
}
function G_(r) {
  const n = Kl(r);
  if (!n)
    return null;
  const { ctaLabel: i, eyebrow: a, note: u, product_ref: d, reason: p } = n.props;
  return /* @__PURE__ */ m.jsxs("section", { className: "ac-tool-product-block", children: [
    a || p || u ? /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-product-context", children: [
      a ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product-context__eyebrow", children: a }) : null,
      p ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product-context__reason", children: p }) : null,
      u ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product-context__note", children: u }) : null
    ] }) : null,
    /* @__PURE__ */ m.jsx(Hp, { productRef: d, ctaLabel: i })
  ] });
}
function Y_(r) {
  const n = Kl(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    reason: u,
    product_refs: d
  } = n.props;
  return /* @__PURE__ */ m.jsxs($p, { eyebrow: i, title: a, className: "ac-tool--carousel", children: [
    u ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    /* @__PURE__ */ m.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: d.map((p, h) => {
      const y = p.product_id || p.handle || p.variant_id || h;
      return /* @__PURE__ */ m.jsx("div", { className: "ac-tool-carousel__item", role: "listitem", children: /* @__PURE__ */ m.jsx(Hp, { productRef: p, ctaLabel: "View", variant: "carousel" }) }, y);
    }) })
  ] });
}
function Q_(r) {
  const n = Kl(r);
  return n ? /* @__PURE__ */ m.jsx($p, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function q_({ children: r }) {
  return /* @__PURE__ */ m.jsx("div", { className: "ac-tool-group", children: r });
}
const K_ = {
  [bs.product_card]: G_,
  [bs.product_carousel]: Y_
}, J_ = {
  tools: {
    by_name: K_,
    Fallback: Q_
  },
  ToolGroup: q_
}, Vp = "[data-askcrystal-homepage-root]", no = /* @__PURE__ */ new Map(), X_ = "askcrystal-main-thread", Z_ = "http://localhost:8787", Wp = Object.freeze([]), Cl = "askcrystal-theme-session-id", Gp = "askcrystal-theme-chat-sessions-v1", Yp = "askcrystal-theme-active-session-id", Tl = "askcrystal-theme-pending-prompt-v1", eS = "askcrystal:session-registry", kf = "askcrystal:session-select", bf = "askcrystal:session-create", Cf = "askcrystal:session-delete", yo = 24, tS = "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538";
let Tf = 0;
const nS = 7, Qp = Mt.createContext({
  sendPrompt: () => {
  },
  onCancel: () => {
  },
  isRunning: !1
});
function qp() {
  return Mt.useContext(Qp);
}
function rS(r) {
  const n = document.getElementById(r);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function At(r = []) {
  return r.map((n) => n.type === "text" ? n.text : "").join(" ").trim();
}
function _l(r) {
  const n = r?.answer || r?.delta || r?.text || r?.message || r?.reply || r?.output || r?.data?.answer || r?.data?.text || r?.data?.outputs?.answer || r?.data?.outputs?.text || r?.data?.outputs?.output;
  return typeof n == "string" ? n : "";
}
function Fe(r) {
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
const Il = /```askcrystal-suggestions\s*([\s\S]*?)```|<askcrystal-suggestions>\s*([\s\S]*?)<\/askcrystal-suggestions>/gi, sS = [
  "```askcrystal-suggestions",
  "<askcrystal-suggestions"
];
function iS(r) {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function oS(r = "") {
  let n = String(r || "");
  const i = [], a = [...n.matchAll(Il)];
  for (const u of a) {
    const d = iS(u[1] || u[2] || ""), p = Fe(d?.suggestions || d || []);
    i.push(...p);
  }
  return n = n.replace(Il, "").replace(/\n{3,}/g, `

`).trim(), {
    answer: n,
    suggestions: Fe(i)
  };
}
function ro(r = "") {
  let n = String(r || "").replace(Il, "");
  const i = n.toLowerCase(), a = sS.map((u) => i.indexOf(u)).filter((u) => u >= 0);
  return a.length > 0 && (n = n.slice(0, Math.min(...a))), n.trimEnd();
}
function Kp() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.localStorage < "u";
  } catch {
    return !1;
  }
}
function Rl(r) {
  if (!Kp()) return "";
  try {
    return window.localStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function so(r, n) {
  if (Kp())
    try {
      if (n === "" || n === null || n === void 0) {
        window.localStorage.removeItem(r);
        return;
      }
      window.localStorage.setItem(r, n);
    } catch {
    }
}
function Jp() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.sessionStorage < "u";
  } catch {
    return !1;
  }
}
function aS(r) {
  if (!Jp()) return "";
  try {
    return window.sessionStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function Xp(r, n) {
  if (Jp())
    try {
      if (n === "" || n === null || n === void 0) {
        window.sessionStorage.removeItem(r);
        return;
      }
      window.sessionStorage.setItem(r, n);
    } catch {
    }
}
function lS(r) {
  return r === "chat" ? "chat" : "home";
}
function uS() {
  if (typeof window > "u") return "";
  try {
    const r = new URLSearchParams(window.location.search), n = r.get("askcrystal") || r.get("mode");
    if (n === "chat") return "chat";
    if (n === "home") return "home";
  } catch {
  }
  return "";
}
function Zp(r = {}) {
  return uS() || lS(r.displayMode);
}
function eh(r = {}) {
  return (typeof r.chatPageUrl == "string" ? r.chatPageUrl.trim() : "") || "/?askcrystal=chat";
}
function cS(r, n) {
  const i = typeof n == "string" ? n.trim() : "";
  return !i || typeof window > "u" ? !1 : (Xp(Tl, JSON.stringify({
    prompt: i,
    createdAt: Date.now()
  })), window.location.assign(eh(r)), !0);
}
function dS() {
  const r = aS(Tl);
  if (!r) return "";
  Xp(Tl, "");
  const n = th(r, null), i = typeof n?.prompt == "string" ? n.prompt.trim() : "", a = Number(n?.createdAt), u = Number.isFinite(a) ? Date.now() - a < 300 * 1e3 : !0;
  return i && u ? i : "";
}
function th(r, n) {
  if (typeof r != "string" || !r.trim()) return n;
  try {
    return JSON.parse(r);
  } catch {
    return n;
  }
}
function nh(r, n = 52) {
  const i = typeof r == "string" ? r.replace(/\s+/g, " ").trim() : "";
  return i ? i.length <= n ? i : `${i.slice(0, Math.max(1, n - 1)).trimEnd()}…` : "";
}
function fS(r) {
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
function vo(r) {
  return Array.isArray(r) ? r.map(fS).filter(Boolean) : [];
}
function Al(r) {
  if (!r || typeof r != "object") return "";
  const n = r.content || r.parts || [], i = At(Array.isArray(n) ? n : []);
  return i || (Array.isArray(r.metadata?.unstable_data) && r.metadata.unstable_data.length > 0 && r.role === "assistant" ? "Shared storefront picks and guidance." : "");
}
function _o(r, n = "New reading") {
  const i = Array.isArray(r) ? r.find((u) => u?.role === "user" && Al(u)) : null, a = Al(i);
  return a ? nh(a, 42) : n;
}
function pS(r) {
  if (!Array.isArray(r) || r.length === 0)
    return "No messages yet.";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = Al(r[n]);
    if (i) return nh(i, 78);
  }
  return "No messages yet.";
}
function rh(r, n = null) {
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
  const n = (/* @__PURE__ */ new Date()).toISOString(), i = vo(r.messages || []);
  return {
    id: typeof r.id == "string" && r.id ? r.id : Wn("thread"),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : _o(i),
    createdAt: typeof r.createdAt == "string" && r.createdAt ? r.createdAt : n,
    updatedAt: typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : n,
    conversationId: typeof r.conversationId == "string" && r.conversationId ? r.conversationId : null,
    messages: i,
    suggestions: Fe(r.suggestions || []),
    suggestionsMessageId: typeof r.suggestionsMessageId == "string" ? r.suggestionsMessageId : ""
  };
}
function hS(r) {
  if (!r || typeof r != "object") return null;
  const n = vo(r.messages || []), i = typeof r.createdAt == "string" && r.createdAt ? r.createdAt : (/* @__PURE__ */ new Date()).toISOString(), a = typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : rh(n, i) || i;
  return Cs({
    ...r,
    createdAt: i,
    updatedAt: a,
    messages: n,
    suggestions: Fe(r.suggestions || []),
    suggestionsMessageId: typeof r.suggestionsMessageId == "string" ? r.suggestionsMessageId : "",
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : _o(n)
  });
}
function mS() {
  const r = th(Rl(Gp), []), n = Array.isArray(r) ? r.map(hS).filter(Boolean) : [], i = n.length > 0 ? Er(n).slice(0, yo) : [Cs()], a = Rl(Yp), u = i.some((d) => d.id === a) ? a : i[0].id;
  return {
    sessions: i,
    activeSessionId: u
  };
}
function gS({ sessions: r, activeSessionId: n }) {
  so(
    Gp,
    JSON.stringify(Er(r).slice(0, yo))
  ), so(Yp, n);
}
function Sl(r, n) {
  return Array.isArray(r) && r.find((i) => i.id === n) || null;
}
function If(r) {
  return r ? {
    ...r,
    title: _o(r.messages, r.title || "New reading"),
    updatedAt: rh(r.messages, (/* @__PURE__ */ new Date()).toISOString()) || (/* @__PURE__ */ new Date()).toISOString()
  } : null;
}
function Rf(r, n, i = {}) {
  const a = [];
  let u = !1;
  for (const d of Array.isArray(r) ? r : []) {
    if (d.id !== n) {
      a.push(d);
      continue;
    }
    u = !0;
    const p = i.messages !== void 0 ? vo(i.messages) : d.messages, h = If({
      ...d,
      ...i,
      messages: p,
      suggestions: i.suggestions !== void 0 ? Fe(i.suggestions) : d.suggestions,
      suggestionsMessageId: i.suggestionsMessageId !== void 0 ? i.suggestionsMessageId || "" : d.suggestionsMessageId || "",
      conversationId: i.conversationId !== void 0 ? i.conversationId || null : d.conversationId
    });
    a.push(h);
  }
  return u || a.push(If(Cs({
    id: n,
    ...i
  }))), Er(a).slice(0, yo);
}
function sh(r) {
  return Er(Array.isArray(r) ? r : []).map((n) => ({
    id: n.id,
    title: _o(n.messages, n.title || "New reading"),
    preview: pS(n.messages),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    isEmpty: !Array.isArray(n.messages) || n.messages.length === 0
  }));
}
function yS({ sessions: r, activeSessionId: n, isRunning: i }) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(eS, {
    detail: {
      sessions: sh(r),
      activeSessionId: n,
      isRunning: !!i
    }
  }));
}
function Wi() {
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
function vS(r) {
  return /^(https?:\/\/|mailto:|\/)/i.test(r);
}
function en(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, p = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const h = `${n}-${p}`;
    if (d[2] && d[3]) {
      const y = d[3].trim();
      i.push(
        vS(y) ? /* @__PURE__ */ m.jsx("a", { href: y, target: y.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, h) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ m.jsx("code", { children: d[4] }, h)) : d[5] ? i.push(/* @__PURE__ */ m.jsx("strong", { children: en(d[5], `${h}-strong`) }, h)) : d[6] && i.push(/* @__PURE__ */ m.jsx("em", { children: en(d[6], `${h}-em`) }, h));
    u = a.lastIndex, p += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function Ts(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function _S(r) {
  const n = Ts(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function SS(r) {
  const n = Ts(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function Af(r) {
  const n = Ts(r);
  return n.length >= 2 && n.some(Boolean);
}
function wS(r, n) {
  const i = r[n];
  if (!Af(i)) return null;
  const a = Ts(i), u = r[n + 1], d = SS(u);
  let p = n + (d ? 2 : 1);
  const h = [];
  for (; p < r.length && Af(r[p]); ) {
    const y = Ts(r[p]);
    if (y.length !== a.length) break;
    h.push(y), p += 1;
  }
  return h.length === 0 ? null : {
    headers: a,
    alignments: d ? _S(u) : a.map(() => "left"),
    rows: h,
    nextIndex: p
  };
}
function xS(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function ih({ text: r = "" }) {
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
      const x = [], b = d[1] || "";
      for (a += 1; a < n.length && !/^```\s*$/.test(n[a]); )
        x.push(n[a]), a += 1;
      a < n.length && (a += 1), xS(b) ? i.push(
        /* @__PURE__ */ m.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ m.jsx(ih, { text: x.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ m.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ m.jsx("code", { children: x.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const p = u.match(/^(#{1,3})\s+(.+)$/);
    if (p) {
      const x = `h${p[1].length + 2}`;
      i.push(
        /* @__PURE__ */ m.jsx(x, { children: en(p[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ m.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const h = wS(n, a);
    if (h) {
      const { headers: x, alignments: b, rows: _, nextIndex: I } = h;
      a = I, i.push(
        /* @__PURE__ */ m.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ m.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ m.jsx("thead", { children: /* @__PURE__ */ m.jsx("tr", { children: x.map((N, P) => /* @__PURE__ */ m.jsx(
            "th",
            {
              style: { textAlign: b[P] || "left" },
              children: en(N, `table-head-${a}-${P}`)
            },
            `table-head-${a}-${P}`
          )) }) }),
          /* @__PURE__ */ m.jsx("tbody", { children: _.map((N, P) => /* @__PURE__ */ m.jsx("tr", { children: x.map((B, $) => /* @__PURE__ */ m.jsx(
            "td",
            {
              style: { textAlign: b[$] || "left" },
              children: en(N[$] || "", `table-cell-${a}-${P}-${$}`)
            },
            `table-cell-${a}-${P}-${$}`
          )) }, `table-row-${a}-${P}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        x.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("ul", { children: x.map((b, _) => /* @__PURE__ */ m.jsx("li", { children: en(b, `ul-${a}-${_}`) }, `ul-${a}-${_}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        x.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("ol", { children: x.map((b, _) => /* @__PURE__ */ m.jsx("li", { children: en(b, `ol-${a}-${_}`) }, `ol-${a}-${_}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        x.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("blockquote", { children: x.map((b, _) => /* @__PURE__ */ m.jsx("p", { children: en(b, `quote-${a}-${_}`) }, `quote-${a}-${_}`)) }, `quote-${a}`)
      );
      continue;
    }
    const y = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      y.push(n[a].trim()), a += 1;
    const v = y.join(" ");
    i.push(
      /* @__PURE__ */ m.jsx("p", { children: en(v, `p-${a}`) }, `p-${a}`)
    );
  }
  return /* @__PURE__ */ m.jsx("div", { className: "ac-markdown", children: i });
}
function ES(r) {
  if (typeof r != "string" || !r) return "";
  try {
    return JSON.parse(r);
  } catch {
    return r.replace(/^"/, "").replace(/"$/, "");
  }
}
function kS(r) {
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
function bS(r) {
  if (typeof r != "string" || !r) return "";
  const n = [...r.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*"/gi
  )].pop();
  if (!n || typeof n.index != "number") return "";
  const i = n.index + n[0].length;
  let a = i, u = !1;
  for (; a < r.length; ) {
    const p = r[a];
    if (u) {
      u = !1, a += 1;
      continue;
    }
    if (p === "\\") {
      u = !0, a += 1;
      continue;
    }
    if (p === '"') break;
    a += 1;
  }
  const d = r.slice(i, a);
  return kS(d).trim();
}
function oh(r) {
  if (typeof r != "string") return "";
  const n = Jl(r).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trim();
  if (!n) return "";
  const i = [...n.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi
  )].pop();
  if (i?.[1]) {
    const d = ES(i[1]).trim();
    if (d) return d;
  }
  const a = bS(n);
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
function Jl(r) {
  return typeof r != "string" ? "" : r.replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, "").replace(/<thinking\b[^>]*>[\s\S]*?<\/thinking>/gi, "").replace(/<reasoning\b[^>]*>[\s\S]*?<\/reasoning>/gi, "").replace(/<analysis\b[^>]*>[\s\S]*?<\/analysis>/gi, "").replace(/<think\b[^>]*>[\s\S]*$/gi, "").replace(/<thinking\b[^>]*>[\s\S]*$/gi, "").replace(/<reasoning\b[^>]*>[\s\S]*$/gi, "").replace(/<analysis\b[^>]*>[\s\S]*$/gi, "");
}
function CS(r) {
  if (typeof r != "string") return "";
  let n = r.replace(/^\uFEFF/, "").trimStart();
  if (!n) return "";
  const i = n.slice(0, 24).toLowerCase().replace(/\s+/g, " ").trim();
  if (i && i.length >= 3 && i.length <= 13 && "final answer:".startsWith(i) && /^[a-z:\s]+$/i.test(n.trim()) && n.trim().length <= 24)
    return "";
  const a = [...n.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  return typeof a?.index == "number" ? n = n.slice(a.index + a[0].length).trimStart() : n = n.replace(/^final answer\s*:\s*/i, ""), n;
}
function wl(r) {
  if (typeof r != "string") return "";
  const n = ro(Jl(r)).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trimStart();
  if (!n) return "";
  const i = oh(n), a = ro(CS(i || n));
  return a ? a.replace(/\n{3,}/g, `

`).trimStart() : "";
}
function TS(r) {
  if (typeof r != "string") return !1;
  const n = r.toLowerCase();
  return /\bthought:\b/.test(n) || /\bobservation:\b/.test(n) || /\baction:\b/.test(n) || /\bquestion:\b/.test(n) || /"action"\s*:/.test(n) || /\bfinal answer\b/.test(n);
}
function Mf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(n) || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(n) || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(n) || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(n) || /\bi have \w+ products?\b/.test(n) : !1;
}
function Pf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(n) || /^```(?:json|xml)?\s*[\[{<]/.test(n) || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(n) || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(n) : !1;
}
function IS(r) {
  if (typeof r != "string") return "";
  let n = r.trim();
  if (!n) return "";
  const i = n.split(`
`);
  let a = 0;
  for (; a < i.length; ) {
    const p = i[a].trim();
    if (!p) {
      a += 1;
      continue;
    }
    if (!Mf(p)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  let d = 0;
  for (; d < u.length && Mf(u[d]); )
    d += 1;
  return u.slice(d).join(`

`).trim();
}
function Xl(r) {
  return Array.isArray(r) ? r.map((n) => typeof n == "string" ? n.trim() : "").filter(Boolean).slice(-6) : typeof r == "string" ? r.split(`
`).map((n) => n.trim()).filter(Boolean).slice(-6) : [];
}
function RS() {
  const [r, n] = k.useState(!1);
  return k.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
const AS = [
  "Reading the pattern field...",
  "Following the strongest thread...",
  "Cross-checking the signals...",
  "Letting the guidance take shape..."
];
function MS({ userPrompt: r = "", statusText: n = "", progressLabel: i = "" }) {
  const a = lo(`${r} ${n} ${i}`);
  return /horoscope|zodiac|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces|daily|weekly|monthly/.test(a) ? "Daily guidance" : /bazi|four pillars|day master|element|heavenly stem|earthly branch|birth time|birthday/.test(a) ? "Elemental structure" : /tarot|card|spread|draw/.test(a) ? "Symbolic spread" : /fengshui|feng shui|room|desk|bedroom|home|space|placement/.test(a) ? "Space harmony" : /relationship|love|partner|match|compatib|marriage|yinyuan|connection|dating/.test(a) ? "Relationship pattern" : /numerology|number|shushu|life path|name/.test(a) ? "Number pattern" : /crystal|stone|necklace|bracelet|ring|earring|shop|product|gift|buy|cart/.test(a) ? "Crystal match" : /sleep|rest|dream|insomnia|calm|anxiety|stress|peace/.test(a) ? "Rest & calm" : /protect|protection|ground|grounding|safe|stability|negative/.test(a) ? "Grounding & protection" : /career|work|job|business|direction|decision|choice|path|future/.test(a) ? "Direction & momentum" : /money|abundance|wealth|prosperity|success|confidence/.test(a) ? "Abundance focus" : /heart|heal|healing|emotion|clarity|grief|breakup/.test(a) ? "Emotional clarity" : "Current question";
}
function PS({ elapsedMs: r = 0, statusStage: n = "", hasProgress: i = !1 }) {
  return n === "compose" || r >= 2e4 ? "materializing" : i || n === "tool" ? "tool-aware" : r >= 1800 ? "deepening" : "settling";
}
function NS(r) {
  return r === "tool-aware" ? "focused" : r === "materializing" ? "resolving" : r === "deepening" ? "active" : "quiet";
}
function jS({ phase: r, elapsedMs: n = 0, progressLabel: i = "" }) {
  return r === "materializing" ? n >= 32e3 ? ["Almost ready"] : ["Shaping your guidance..."] : r === "tool-aware" && i ? [
    i,
    "Cross-checking the strongest signal...",
    "Letting the pattern resolve..."
  ] : r === "deepening" ? AS : ["Tuning into your current state..."];
}
function LS({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = "",
  statusElapsedMs: d = 0,
  progressEntries: p = [],
  userPrompt: h = "",
  isExiting: y = !1
}) {
  const v = RS(), x = k.useRef(Date.now()), [b, _] = k.useState(0), [I, N] = k.useState(0), [P, B] = k.useState({
    current: "Tuning into your current state...",
    previous: "",
    key: 0
  });
  k.useEffect(() => {
    const ue = window.setInterval(() => {
      _(Date.now() - x.current);
    }, 1e3);
    return () => window.clearInterval(ue);
  }, []);
  const $ = Math.max(Number(d) || 0, b), K = k.useMemo(
    () => fh(p),
    [p]
  ), te = K.find((ue) => ue.isCurrent) || K[K.length - 1] || null, oe = Xl(n), fe = oe[oe.length - 1] || "", J = te?.label || fe || "", D = !!J, F = PS({ elapsedMs: $, statusStage: i, hasProgress: D }), se = NS(F), G = k.useMemo(
    () => jS({ phase: F, elapsedMs: $, progressLabel: J }),
    [$, F, J]
  ), Ce = MS({
    userPrompt: h,
    statusText: u || r,
    progressLabel: J
  }), ve = $ >= 6500 || D, he = G[Math.min(I, G.length - 1)] || G[0] || "Tuning into your current state...";
  return k.useEffect(() => {
    N(0);
  }, [F, J]), k.useEffect(() => {
    if (v || G.length <= 1) return;
    const ue = window.setTimeout(() => {
      N((we) => (we + 1) % G.length);
    }, 2200);
    return () => window.clearTimeout(ue);
  }, [I, v, G.length]), k.useEffect(() => {
    B((ue) => ue.current === he ? ue : {
      current: he,
      previous: v ? "" : ue.current,
      key: ue.key + 1
    });
  }, [he, v]), k.useEffect(() => {
    if (!P.previous) return;
    const ue = window.setTimeout(() => {
      B((we) => we.key === P.key ? { ...we, previous: "" } : we);
    }, 560);
    return () => window.clearTimeout(ue);
  }, [P.key, P.previous]), /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: [
        "ac-reading-progress",
        `ac-reading-progress--${F}`,
        `ac-reading-progress--${se}`,
        y ? "ac-reading-progress--exiting" : ""
      ].join(" "),
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ m.jsx("span", { className: "visually-hidden", children: he }),
        /* @__PURE__ */ m.jsxs("div", { className: "ac-reading-progress__header", "aria-hidden": "true", children: [
          /* @__PURE__ */ m.jsx("p", { children: "✦ Interpreting your energy" }),
          /* @__PURE__ */ m.jsx("span", { children: F === "materializing" ? "Signal resolving" : "Reading session" })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "ac-reading-progress__instrument", "aria-hidden": "true", children: [
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__aurora" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__goldfield" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__ring ac-reading-progress__ring--outer" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__ring ac-reading-progress__ring--middle" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__ring ac-reading-progress__ring--inner" }),
          /* @__PURE__ */ m.jsxs("span", { className: "ac-reading-progress__constellation", children: [
            /* @__PURE__ */ m.jsx("i", {}),
            /* @__PURE__ */ m.jsx("i", {}),
            /* @__PURE__ */ m.jsx("i", {}),
            /* @__PURE__ */ m.jsx("i", {}),
            /* @__PURE__ */ m.jsx("i", {}),
            /* @__PURE__ */ m.jsx("i", {})
          ] }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__beam ac-reading-progress__beam--one" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__beam ac-reading-progress__beam--two" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-reading-progress__aperture", children: /* @__PURE__ */ m.jsx("span", {}) })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "ac-reading-progress__copy", children: [
          /* @__PURE__ */ m.jsxs("p", { className: "ac-reading-progress__line", "aria-hidden": "true", children: [
            P.previous ? /* @__PURE__ */ m.jsx(
              "span",
              {
                className: "ac-reading-progress__line-text ac-reading-progress__line-text--previous",
                children: P.previous
              },
              `previous-${P.key}`
            ) : null,
            /* @__PURE__ */ m.jsx(
              "span",
              {
                className: "ac-reading-progress__line-text ac-reading-progress__line-text--current",
                children: P.current
              },
              `current-${P.key}`
            )
          ] }),
          ve ? /* @__PURE__ */ m.jsxs("div", { className: "ac-reading-progress__focus", "aria-hidden": "true", children: [
            /* @__PURE__ */ m.jsx("span", { children: "Signal focus" }),
            /* @__PURE__ */ m.jsx("strong", { children: Ce })
          ] }) : null
        ] })
      ]
    }
  );
}
function OS(r) {
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
    taskId: io(r),
    elapsedMs: Number.isFinite(n) ? Math.max(0, n) : 0
  };
}
function ah(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return At(i.content);
  }
  return "";
}
function lh(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = oh(n), a = ro(i || n), u = Jl(a).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && TS(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), p = IS(u), h = d >= 0 ? u.slice(d).trim() : p || u, v = h.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).filter((b) => !Pf(b)), x = (v.length > 0 ? v.join(`

`) : h).trim();
    if (x && !Pf(x))
      return x;
  }
  return "";
}
function zS(r) {
  const n = lh(r);
  return n || [
    "AskCrystal finished the request, but the final guidance was not readable.",
    "Please try once more, or ask the question in a slightly simpler way so the reading can come through cleanly."
  ].join(`

`);
}
function Ml(r, n = []) {
  const i = oS(r), a = Fp(i.answer), u = go(n, a.components), d = zS(a.answer), p = i.suggestions;
  return d ? {
    answer: d,
    components: u,
    suggestions: p,
    sourceText: typeof r == "string" && r.trim() ? r : d
  } : u.length > 0 ? {
    answer: "I found a store-backed match for you below.",
    components: u,
    suggestions: p,
    sourceText: typeof r == "string" && r.trim() ? r : "I found a store-backed match for you below."
  } : {
    answer: "AskCrystal finished the request, but no guidance text came back. Please try again.",
    components: [],
    suggestions: p,
    sourceText: "AskCrystal finished the request, but no guidance text came back. Please try again."
  };
}
function Un({ text: r = "", components: n = [] } = {}) {
  const i = typeof r == "string" ? r : "", a = Fp(i), u = go(n, a.components), d = A_(i), p = [], h = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Map(), v = (_) => `${_.toolName}:${_.toolCallId}`;
  for (const _ of u) {
    const I = xf(_);
    I && y.set(v(I), I);
  }
  const x = (_) => {
    const I = ro(P_(_)).trim(), N = lh(I);
    if (!N) return;
    const P = p[p.length - 1];
    if (P?.type === "text") {
      P.text = `${P.text}

${N}`.trim();
      return;
    }
    p.push({
      type: "text",
      text: N
    });
  }, b = (_) => {
    for (const I of _) {
      const N = xf(I);
      if (!N) continue;
      const P = v(N);
      h.has(P) || (p.push(y.get(P) || N), h.add(P));
    }
  };
  if (d.some((_) => _.type === "payload"))
    for (const _ of d) {
      if (_.type === "text") {
        x(_.value);
        continue;
      }
      b(Dp(_.value));
    }
  else
    x(i);
  for (const _ of y.values()) {
    const I = v(_);
    h.has(I) || p.push(_);
  }
  return p;
}
function DS(r) {
  return /^https?:\/\//i.test(r);
}
function kr(r) {
  return r ? DS(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${Z_}${r}` : r : "";
}
function BS(r) {
  return r ? r.endsWith("/stream") ? kr(r) : kr(`${r.replace(/\/$/, "")}/stream`) : "";
}
function FS(r) {
  return r ? r.endsWith("/stop") ? kr(r) : kr(`${r.replace(/\/$/, "")}/stop`) : "";
}
function uh(r) {
  return r ? r.replace(/\/$/, "").replace(/\/(?:stream|stop|suggestions)$/, "").replace(/\/chat$/, "") : "";
}
function US(r) {
  if (!r) return "";
  const n = `${uh(r)}/identity/bootstrap`;
  return kr(n);
}
function $S(r) {
  if (!r) return "";
  const n = `${uh(r)}/threads/messages`;
  return kr(n);
}
function HS(r) {
  return /<html[\s>]/i.test(r || "") && /powered-by:\s*Shopify|cdn\/shop|shopify-section/i.test(r || "");
}
async function VS(r) {
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
  return HS(u) ? "AskCrystal proxy is not connected. Shopify is serving the storefront page for /apps/askcrystal instead of forwarding the request to the app proxy." : n;
}
function WS() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  const r = Rl(Cl);
  if (r) return r;
  const n = Wn("session");
  return so(Cl, n), n;
}
function Pl(r) {
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
    const p = [];
    if (u.split(`
`).forEach((h) => {
      h.startsWith("event:") && (d = h.slice(6).trim() || d), h.startsWith("data:") && p.push(h.slice(5).trim());
    }), !!p.length)
      try {
        n.push({
          event: d,
          payload: JSON.parse(p.join(`
`))
        });
      } catch {
      }
  }
  return { events: n, remaining: i };
}
function io(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function oo(r) {
  const n = r?.messageId || r?.message_id || r?.data?.messageId || r?.data?.message_id;
  return typeof n == "string" ? n : "";
}
function GS(r = []) {
  if (!Array.isArray(r)) return "";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i?.role === "assistant")
      return typeof i.id == "string" ? i.id : "";
  }
  return "";
}
function Nl(r) {
  return Fe(
    r?.suggestions || r?.data?.suggestions || r?.data || []
  );
}
function vr(r = [], n = []) {
  return Fe([
    ...Fe(r),
    ...Fe(n)
  ]);
}
async function YS({
  reader: r,
  decoder: n,
  initialBuffer: i = "",
  abortSignal: a,
  initialSuggestions: u = [],
  messageId: d = "",
  onSuggestions: p
}) {
  if (!r || !n)
    return {
      suggestions: Fe(u),
      messageId: d
    };
  let h = i, y = Fe(u), v = d;
  const x = (b) => {
    const _ = vr(y, Nl(b));
    _.length !== y.length && (y = _, v = oo(b) || v, p?.(y, v));
  };
  try {
    for (; ; ) {
      wt(a);
      const { done: _, value: I } = await r.read();
      if (_) break;
      wt(a), h += n.decode(I, { stream: !0 });
      const N = Pl(h);
      h = N.remaining;
      for (const P of N.events)
        wt(a), P.event === "suggestions" && x(P.payload);
    }
    const b = n.decode();
    if (b || h) {
      const _ = Pl(`${h}${b}

`);
      for (const I of _.events)
        I.event === "suggestions" && x(I.payload);
    }
  } catch (b) {
    b?.name !== "AbortError" && console.warn("[AskCrystal] Late suggestion stream could not be drained.", b);
  }
  return {
    suggestions: y,
    messageId: v
  };
}
function QS(r) {
  const n = r?.event || r?.data?.event;
  return typeof n == "string" ? n : "";
}
function qS(r) {
  if (typeof r?.tool == "string" && r.tool) return r.tool;
  if (typeof r?.tool_name == "string" && r.tool_name) return r.tool_name;
  if (r?.tool_labels && typeof r.tool_labels == "object") {
    const n = Object.values(r.tool_labels).find((i) => typeof i == "string" && i);
    if (typeof n == "string") return n;
  }
  return "";
}
function ch(r) {
  if (!r || typeof r != "object") return null;
  const n = typeof r.thought == "string" ? r.thought.trim() : typeof r.data?.thought == "string" ? r.data.thought.trim() : "", i = qS(r).trim(), a = typeof r.tool_input == "string" ? r.tool_input : typeof r.toolInput == "string" ? r.toolInput : typeof r.data?.tool_input == "string" ? r.data.tool_input : "", u = typeof r.observation == "string" ? r.observation : typeof r.data?.observation == "string" ? r.data.observation : "";
  if (!n && !i && !a && !u) return null;
  const d = oo(r), p = io(r), h = Number.isFinite(Number(r.position)) ? Number(r.position) : null;
  return {
    id: typeof r.id == "string" && r.id ? r.id : `${d || p || "thought"}:${h ?? 0}`,
    position: h,
    thought: n,
    tool: i,
    toolInput: a,
    observation: u,
    messageId: d,
    taskId: p,
    sourceEvent: typeof r.sourceEvent == "string" ? r.sourceEvent : QS(r)
  };
}
function ao(r) {
  return Array.isArray(r) ? r.map(ch).filter(Boolean) : [];
}
function dh(r, n) {
  const i = ch(n);
  if (!i) return ao(r);
  const a = ao(r), u = a.findIndex((d) => !!(d.id && i.id && d.id === i.id || d.position !== null && i.position !== null && d.position === i.position));
  return u >= 0 ? (a[u] = {
    ...a[u],
    ...i,
    thought: i.thought || a[u].thought,
    toolInput: i.toolInput || a[u].toolInput,
    observation: i.observation || a[u].observation
  }, a) : [...a, i];
}
function KS() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function wt(r) {
  if (r?.aborted)
    throw KS();
}
async function JS({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a, storefrontSessionId: u }) {
  if (!(!r || !n))
    try {
      await fetch(FS(r), {
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
async function XS({ apiEndpoint: r, sessionId: n }) {
  if (!r || !n) return null;
  try {
    const i = new URL(US(r), window.location.origin);
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
async function ZS({ apiEndpoint: r, sessionId: n, storefrontSessionId: i }) {
  if (!r || !n || !i) return null;
  try {
    const a = new URL($S(r), window.location.origin);
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
async function ew({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: p, onThought: h, onDelta: y, onSuggestions: v }) {
  wt(i);
  const x = await fetch(BS(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: ah(n),
      conversationId: a,
      sessionId: u,
      storefrontSessionId: d
    }),
    signal: i
  });
  if (!x.ok)
    throw new Error(await VS(x));
  if (!x.body)
    throw new Error("The proxy did not return a readable stream.");
  const b = x.body.getReader(), _ = new TextDecoder();
  let I = "", N = "", P = "", B = [], $ = [], K = a || null;
  for (; ; ) {
    wt(i);
    const { done: te, value: oe } = await b.read();
    if (te) break;
    wt(i), I += _.decode(oe, { stream: !0 });
    const fe = Pl(I);
    I = fe.remaining;
    for (let J = 0; J < fe.events.length; J += 1) {
      const D = fe.events[J];
      if (wt(i), D.event === "status" && typeof D.payload?.message == "string" && (wt(i), p?.(D.payload)), D.event === "thought" && (wt(i), B = dh(B, D.payload), h?.(D.payload), K = D.payload?.conversationId || D.payload?.conversation_id || K), D.event === "error")
        throw new Error(D.payload?.error || D.payload?.message || "The proxy stream failed.");
      if (D.event === "suggestions") {
        $ = vr($, Nl(D.payload)), v?.($, oo(D.payload) || "");
        continue;
      }
      if (D.event === "replace") {
        wt(i);
        const F = _l(D.payload);
        if (F) {
          N = F;
          const se = wl(N);
          if (se) {
            const G = P;
            P = se, se !== G && y?.("", se, D.payload);
          }
        }
        K = D.payload?.conversationId || D.payload?.conversation_id || K;
      }
      if (["delta", "message", "agent_message"].includes(D.event)) {
        wt(i);
        const F = _l(D.payload);
        if (F) {
          N += F;
          const se = wl(N);
          if (se) {
            const G = P;
            if (P = se, se !== G) {
              const Ce = se.startsWith(G) ? se.slice(G.length) : se;
              y?.(Ce, se, D.payload);
            }
          }
        }
        K = D.payload?.conversationId || D.payload?.conversation_id || K;
      }
      if (D.event === "complete") {
        wt(i);
        const F = _l(D.payload) || N, se = typeof D.payload?.sourceText == "string" && D.payload.sourceText.trim() ? D.payload.sourceText : typeof D.payload?.source_text == "string" && D.payload.source_text.trim() ? D.payload.source_text : F, Ce = wl(F) || P || P, ve = Fe(D.payload?.suggestions || D.payload?.data?.suggestions || []), he = oo(D.payload) || null;
        if (!F && !Ce && B.length > 0)
          return {
            answer: "",
            components: [],
            sourceText: "",
            suggestions: vr($, ve),
            conversationId: D.payload?.conversationId || D.payload?.conversation_id || K || null,
            messageId: he,
            thoughts: B
          };
        const ue = Ml(se || Ce), we = Fe(ue.suggestions || []), Me = Fe([
          ...$,
          ...we,
          ...ve
        ]);
        for (const U of fe.events.slice(J + 1))
          U.event === "suggestions" && ($ = vr($, Nl(U.payload)));
        const me = vr(Me, $);
        return YS({
          reader: b,
          decoder: _,
          initialBuffer: I,
          abortSignal: i,
          initialSuggestions: me,
          messageId: he || "",
          onSuggestions: v
        }), {
          answer: ue.answer,
          components: ue.components,
          sourceText: ue.sourceText,
          suggestions: me,
          conversationId: D.payload?.conversationId || D.payload?.conversation_id || K || null,
          messageId: he,
          thoughts: B
        };
      }
    }
  }
  if (P) {
    const te = Ml(P);
    return {
      answer: te.answer,
      components: te.components,
      sourceText: te.sourceText,
      suggestions: vr($, te.suggestions || []),
      conversationId: K,
      messageId: null,
      thoughts: B
    };
  }
  if (B.length > 0)
    return {
      answer: "",
      components: [],
      sourceText: "",
      suggestions: [],
      conversationId: K,
      messageId: null,
      thoughts: B
    };
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function Wn(r = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${r}-${crypto.randomUUID()}` : (Tf += 1, `${r}-${Date.now()}-${Tf}`);
}
function tw(r) {
  return {
    id: Wn("user"),
    role: "user",
    createdAt: /* @__PURE__ */ new Date(),
    content: r.content || [],
    attachments: r.attachments || [],
    metadata: r.metadata || {
      custom: {}
    }
  };
}
function tn({
  id: r = Wn("assistant"),
  text: n = "",
  parts: i = null,
  components: a = [],
  status: u,
  error: d,
  statusText: p = "",
  statusStage: h = "",
  statusTool: y = "",
  statusHistory: v = [],
  ambientStatusText: x = "",
  statusElapsedMs: b = null,
  thoughts: _ = [],
  userPrompt: I = ""
}) {
  const N = Xl(v).join(`
`), P = Number(b), B = ao(_), $ = vw(
    B,
    u?.type === "running"
  );
  return {
    id: r,
    role: "assistant",
    createdAt: /* @__PURE__ */ new Date(),
    content: Array.isArray(i) ? i : Un({ text: n, components: a }),
    status: u,
    metadata: {
      unstable_state: null,
      unstable_annotations: [],
      unstable_data: a,
      steps: [],
      custom: {
        ...d ? { error: d } : {},
        ...p ? { statusText: p } : {},
        ...h ? { statusStage: h } : {},
        ...y ? { statusTool: y } : {},
        ...N ? { statusHistoryText: N } : {},
        ...x ? { ambientStatusText: x } : {},
        ...Number.isFinite(P) ? { statusElapsedMs: Math.max(0, P) } : {},
        ...$.length ? { difyProgressEntries: $ } : {},
        ...I ? { userPrompt: I } : {}
      }
    }
  };
}
function xl(r) {
  return String(r || "").replace(/\s+/g, " ").trim();
}
function Nf(r) {
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
    const u = At(a.content || a.parts || []);
    if (u) return u;
  }
  return "";
}
function nw(r) {
  const n = typeof r?.text == "string" ? r.text : "";
  return {
    id: typeof r?.id == "string" && r.id ? r.id : Wn("user"),
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
function rw(r) {
  const n = Array.isArray(r?.components) ? r.components : [];
  return tn({
    id: typeof r?.id == "string" && r.id ? r.id : Wn("assistant"),
    text: typeof r?.text == "string" ? r.text : "",
    components: n,
    status: {
      type: "complete",
      reason: "stop"
    }
  });
}
function sw(r, n) {
  const i = Array.isArray(r?.messages) ? r.messages : [], a = xl(n);
  if (!a || i.length === 0) return null;
  let u = -1, d = -1;
  for (let b = i.length - 1; b >= 0; b -= 1) {
    const _ = i[b];
    if (_?.role !== "user" || xl(_.text) !== a) continue;
    const I = i.findIndex(
      (N, P) => P > b && N?.role === "assistant" && (xl(N.text) || Array.isArray(N.components) && N.components.length > 0)
    );
    if (I !== -1) {
      u = b, d = I;
      break;
    }
  }
  if (u === -1 || d === -1) return null;
  const p = i.map((b) => b?.role === "user" ? nw(b) : b?.role === "assistant" ? rw(b) : null).filter(Boolean), h = i[d], y = Ml(h?.text || "", h?.components || []), v = Fe(h?.suggestions || []), x = v.length ? v : Fe(y.suggestions || []);
  return {
    messages: p,
    suggestions: x,
    suggestionsMessageId: p[d]?.id || "",
    conversationId: r?.thread?.conversationId || null
  };
}
function iw(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Xl(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((p) => p !== a);
  return d.push(a), d.slice(-4);
}
function jl({ id: r, text: n = "", components: i = [], thoughts: a = [] }) {
  const d = !!(typeof n == "string" ? n.trim() : "") || i.length > 0;
  return tn({
    id: r,
    parts: Un({
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
function jf(r, n) {
  if (!Array.isArray(r) || !n || r.length === 0)
    return Array.isArray(r) ? [...r] : [];
  const i = [...r], a = i[i.length - 1];
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = jl({
    id: a.id,
    text: At(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function ow({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: p, onThought: h, onDelta: y, onSuggestions: v }) {
  if (!r.apiEndpoint)
    throw new Error("AskCrystal backend endpoint is not configured.");
  try {
    return await ew({
      apiEndpoint: r.apiEndpoint,
      messages: n,
      abortSignal: i,
      conversationId: a,
      sessionId: u,
      storefrontSessionId: d,
      onStatus: p,
      onThought: h,
      onDelta: y,
      onSuggestions: v
    });
  } catch (x) {
    throw x?.name === "AbortError" || console.error("[AskCrystal] Backend runtime failed.", x), x;
  }
}
function aw(r) {
  const n = k.useMemo(() => mS(), []), i = Sl(n.sessions, n.activeSessionId) || n.sessions[0], [a, u] = k.useState(n.sessions), [d, p] = k.useState(i.id), [h, y] = k.useState(i.messages), [v, x] = k.useState(i.suggestions), [b, _] = k.useState(i.suggestionsMessageId || ""), [I, N] = k.useState(!1), P = k.useRef(null), B = k.useRef(""), $ = k.useRef(""), K = k.useRef(!1), te = k.useRef(i.conversationId || null), oe = k.useRef(h), fe = k.useRef(a), J = k.useRef(d), D = k.useRef(I), F = k.useRef(WS());
  k.useEffect(() => {
    if (!r.apiEndpoint) return;
    let M = !1;
    return XS({
      apiEndpoint: r.apiEndpoint,
      sessionId: F.current
    }).then((w) => {
      if (M || !w?.ok) return;
      const R = typeof w.identity?.guestToken == "string" ? w.identity.guestToken.trim() : "";
      R && R !== F.current && (F.current = R, so(Cl, R));
    }), () => {
      M = !0;
    };
  }, [r.apiEndpoint]), k.useEffect(() => {
    oe.current = h;
  }, [h]), k.useEffect(() => {
    fe.current = a;
  }, [a]), k.useEffect(() => {
    J.current = d;
  }, [d]), k.useEffect(() => {
    D.current = I;
  }, [I]), k.useEffect(() => {
    u((M) => Rf(M, d, {
      messages: jf(h, K.current),
      suggestions: v,
      suggestionsMessageId: b,
      conversationId: te.current,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }, [d, h, v, b]), k.useEffect(() => {
    gS({
      sessions: a,
      activeSessionId: d
    }), yS({
      sessions: a,
      activeSessionId: d,
      isRunning: I
    });
  }, [d, I, a]);
  const se = k.useCallback((M) => {
    M && (te.current = M.conversationId || null, K.current = !1, $.current = "", p(M.id), y(vo(M.messages)), x(Fe(M.suggestions)), _(M.suggestionsMessageId || ""));
  }, []), G = k.useCallback((M) => {
    if (!M || D.current)
      return;
    if (M === J.current) {
      Wi();
      return;
    }
    const w = Sl(fe.current, M);
    if (!w) return;
    const R = {
      ...w,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    u((V) => Rf(V, M, {
      updatedAt: R.updatedAt
    })), se(R), Wi();
  }, [se]), Ce = k.useCallback(() => {
    if (D.current) return;
    const M = Cs();
    u(
      (w) => Er([M, ...w]).slice(0, yo)
    ), se(M), Wi();
  }, [se]), ve = k.useCallback((M) => {
    if (!M || D.current) return;
    const w = Er(
      fe.current.filter((ae) => ae.id !== M)
    ), R = w.length > 0 ? w : [Cs()], V = M === J.current, ie = Sl(R, J.current) || R[0];
    u(R), (V || ie.id !== J.current) && se(ie), Wi();
  }, [se]);
  k.useEffect(() => {
    if (typeof window > "u") return;
    const M = (V) => {
      G(V.detail?.sessionId || "");
    }, w = () => {
      Ce();
    }, R = (V) => {
      ve(V.detail?.sessionId || "");
    };
    return window.addEventListener(kf, M), window.addEventListener(bf, w), window.addEventListener(Cf, R), () => {
      window.removeEventListener(kf, M), window.removeEventListener(bf, w), window.removeEventListener(Cf, R);
    };
  }, [Ce, ve, G]);
  const he = k.useCallback((M) => {
    y(jf(M, K.current));
  }, []), ue = k.useCallback((M, w) => {
    y(
      (R) => R.map((V) => V.id !== M ? V : w(V))
    );
  }, []), we = k.useCallback(async ({ expectedPrompt: M = "", poll: w = !1 } = {}) => {
    if (!r.apiEndpoint) return !1;
    const R = J.current, V = M || Nf(oe.current);
    if (!V || !R) return !1;
    const ie = Date.now() + (w ? 75e3 : 0);
    do {
      const ae = await ZS({
        apiEndpoint: r.apiEndpoint,
        sessionId: F.current,
        storefrontSessionId: R
      }), ne = sw(ae, V);
      if (ne)
        return J.current !== R ? !1 : (te.current = ne.conversationId || te.current, K.current = !1, $.current = "", B.current = "", P.current = null, D.current = !1, N(!1), y(ne.messages), x(ne.suggestions), _(ne.suggestions.length ? ne.suggestionsMessageId : ""), !0);
      if (!w || Date.now() >= ie) break;
      await new Promise((de) => setTimeout(de, 2e3));
    } while (!0);
    return !1;
  }, [r.apiEndpoint]);
  k.useEffect(() => {
    if (typeof window > "u") return;
    let M = !1;
    const w = () => {
      if (M || document.visibilityState && document.visibilityState !== "visible") return;
      const V = Nf(oe.current);
      V && we({
        expectedPrompt: V,
        poll: !1
      });
    }, R = window.setTimeout(w, 800);
    return window.addEventListener("focus", w), window.addEventListener("pageshow", w), document.addEventListener("visibilitychange", w), () => {
      M = !0, window.clearTimeout(R), window.removeEventListener("focus", w), window.removeEventListener("pageshow", w), document.removeEventListener("visibilitychange", w);
    };
  }, [we]);
  const Me = k.useCallback(async () => {
    const M = P.current, w = B.current, R = $.current, V = te.current, ie = F.current, ae = J.current;
    M?.abort(), K.current = !0, D.current = !1, N(!1), x([]), _(""), w && ue(
      w,
      (ne) => jl({
        id: ne.id,
        text: At(ne.content || []),
        components: ne.metadata?.unstable_data || []
      })
    ), !(!R || !r.apiEndpoint) && await JS({
      apiEndpoint: r.apiEndpoint,
      taskId: R,
      sessionId: ie,
      conversationId: V,
      storefrontSessionId: ae
    });
  }, [r.apiEndpoint, ue]), me = k.useCallback(
    async (M) => {
      if (M.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      if (Zp(r) === "home") {
        const le = At(M.content || []);
        if (cS(r, le))
          return;
      }
      const w = tw(M), R = Wn("assistant"), V = new AbortController(), ie = tn({
        id: R,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy...",
        statusElapsedMs: 0,
        userPrompt: w.content ? At(w.content) : ""
      }), ae = [...oe.current, w];
      P.current = V, B.current = R, $.current = "", K.current = !1, D.current = !0, N(!0), x([]), _(""), y([...ae, ie]);
      let ne = "", de = [];
      const ge = J.current;
      try {
        const le = await ow({
          config: r,
          messages: ae,
          abortSignal: V.signal,
          conversationId: te.current,
          sessionId: F.current,
          storefrontSessionId: ge,
          onStatus: (xt) => {
            if (V.signal.aborted) return;
            const Oe = OS(xt);
            Oe.taskId && ($.current = Oe.taskId), ue(R, (Pe) => {
              const Ye = At(Pe.content || Pe.parts || []), Vt = Array.isArray(Pe.metadata?.unstable_data) ? Pe.metadata.unstable_data : [], Wt = !!(Ye.trim() || Vt.length);
              return tn({
                id: R,
                parts: Un({
                  text: Ye,
                  components: Vt
                }),
                components: Vt,
                status: {
                  type: "running"
                },
                thoughts: de,
                statusText: Wt ? "" : Oe.message,
                statusStage: Wt ? "" : Oe.stage,
                statusTool: Wt ? "" : Oe.tool,
                statusHistory: Wt ? [] : iw(Pe.metadata?.custom?.statusHistoryText, Oe),
                ambientStatusText: Wt ? "" : Oe.stage === "tool" ? Pe.metadata?.custom?.ambientStatusText || "Settling into your energy..." : Oe.message,
                statusElapsedMs: Wt ? null : Oe.elapsedMs,
                userPrompt: Pe.metadata?.custom?.userPrompt || ""
              });
            });
          },
          onThought: (xt) => {
            if (V.signal.aborted) return;
            const Oe = io(xt);
            Oe && ($.current = Oe), de = dh(de, xt), ue(R, (Pe) => {
              const rt = Array.isArray(Pe.metadata?.unstable_data) ? Pe.metadata.unstable_data : [], Vt = At(Pe.content || Pe.parts || []) || ne;
              return tn({
                id: R,
                parts: Un({
                  text: Vt,
                  components: rt
                }),
                components: rt,
                status: {
                  type: "running"
                },
                thoughts: de,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: [],
                userPrompt: Pe.metadata?.custom?.userPrompt || ""
              });
            });
          },
          onDelta: (xt, Oe, Pe) => {
            if (V.signal.aborted) return;
            const Ye = io(Pe);
            Ye && ($.current = Ye), ne = Oe, ue(
              R,
              (rt) => tn({
                id: R,
                parts: Un({
                  text: Oe
                }),
                components: [],
                status: {
                  type: "running"
                },
                thoughts: de,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: [],
                userPrompt: rt.metadata?.custom?.userPrompt || ""
              })
            );
          },
          onSuggestions: (xt, Oe) => {
            if (V.signal.aborted || K.current || J.current !== ge) return;
            const Pe = Fe(xt || []);
            if (!Pe.length) return;
            const Ye = B.current, rt = GS(oe.current);
            Ye && Ye !== R || !Ye && rt !== R || (x(Pe), _(Oe || R));
          }
        });
        te.current = le.conversationId || te.current, $.current = "", K.current = !1;
        const Ue = le.components || [], kn = Array.isArray(le.thoughts) && le.thoughts.length ? le.thoughts : de, rn = Fe(le.suggestions || []), Gn = le.answer || ne || le.sourceText || "", Tr = le.sourceText || Gn, As = tn({
          id: R,
          parts: Un({
            text: Tr,
            components: Ue
          }),
          components: Ue,
          status: {
            type: "complete",
            reason: "stop"
          },
          thoughts: kn
        }), Ir = [
          ...ae,
          As
        ];
        oe.current = Ir, y(Ir), rn.length && (x(rn), _(R));
      } catch (le) {
        const Ue = K.current || V.signal.aborted;
        if (le?.name === "AbortError" && Ue) {
          $.current = "", x([]), _(""), y([
            ...ae,
            jl({
              id: R,
              text: ne,
              components: [],
              thoughts: de
            })
          ]);
          return;
        }
        if (console.error("[AskCrystal] Assistant runtime failed.", le), ue(
          R,
          (rn) => tn({
            id: R,
            parts: Un({
              text: At(rn.content || rn.parts || []) || ne
            }),
            components: [],
            status: {
              type: "running"
            },
            thoughts: de,
            statusText: "Reconnecting to your reading...",
            statusStage: "recover",
            ambientStatusText: "Reconnecting to your reading..."
          })
        ), await we({
          expectedPrompt: ah(ae),
          poll: !0
        })) return;
        $.current = "", K.current = !1, x([]), _(""), y([
          ...ae,
          tn({
            id: R,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: le?.message || "Unknown runtime error"
            },
            error: le?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        P.current === V && (P.current = null), B.current === R && (B.current = ""), $.current && V.signal.aborted && ($.current = ""), D.current = !1, N(!1);
      }
    },
    [r, we, ue]
  ), U = k.useCallback((M) => {
    const w = typeof M == "string" ? M.trim() : "";
    !w || D.current || me({
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
  }, [me]), ee = k.useMemo(
    () => ({
      messages: h,
      suggestions: v,
      suggestionsMessageId: b,
      isRunning: I,
      setMessages: he,
      onImport: he,
      onNew: me,
      onCancel: Me,
      adapters: {
        threadList: {
          threadId: d || X_,
          threads: sh(a).map((M) => ({
            id: M.id,
            remoteId: M.id,
            title: M.title
          }))
        }
      }
    }),
    [d, I, h, Me, me, he, a, v, b]
  );
  return {
    runtime: fy(ee),
    hasUserMessages: h.some((M) => M.role === "user"),
    activeSessionId: d,
    sendPrompt: U,
    onCancel: Me,
    isRunning: I
  };
}
function lw({ product: r }) {
  return /* @__PURE__ */ m.jsxs("a", { className: "ac-homepage__product-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-media", children: r.image ? /* @__PURE__ */ m.jsx("img", { src: r.image, alt: r.title, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__product-meta", children: r.badge || "Bestseller" }),
      /* @__PURE__ */ m.jsx("h3", { children: r.title }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__product-link", children: "View product" })
    ] })
  ] });
}
function uw({ config: r }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-shelf", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__guide-shelf-header", children: /* @__PURE__ */ m.jsxs("div", { children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
      /* @__PURE__ */ m.jsx("h2", { children: r.shelfHeading })
    ] }) }),
    r.products.length ? /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ m.jsx(lw, { product: n }, n.id)) }) : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
  ] });
}
function Lf({ card: r }) {
  const { sendPrompt: n, isRunning: i } = qp(), a = [
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
function cw({ config: r }) {
  const n = typeof r.headingLine1 == "string" ? r.headingLine1.trim() : "", i = typeof r.headingLine2Prefix == "string" ? r.headingLine2Prefix.trim() : "", a = typeof r.headingAccent == "string" ? r.headingAccent.trim() : "", u = typeof r.headingSuffix == "string" ? r.headingSuffix.trim() : "", d = a && u.toLowerCase().startsWith(`${a.toLowerCase()} `) ? u.slice(a.length).trimStart() : u, p = !!(n || i || a || d), h = [n, i].filter(Boolean).join(" "), y = (b, _) => {
    if (!b) return null;
    const I = Array.from(b.matchAll(/\byou\b/gi));
    if (!I.length)
      return b;
    const N = [];
    let P = 0;
    return I.forEach((B, $) => {
      const K = B.index ?? 0;
      K > P && N.push(
        /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-copy", children: b.slice(P, K) }, `${_}-copy-${$}`)
      ), N.push(
        /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-accent", children: B[0] }, `${_}-accent-${$}`)
      ), P = K + B[0].length;
    }), P < b.length && N.push(
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-copy", children: b.slice(P) }, `${_}-copy-tail`)
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
      href: eh(r)
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
  ], x = {
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
      /* @__PURE__ */ m.jsx("h1", { className: "ac-homepage__guide-title", children: p ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        h ? /* @__PURE__ */ m.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          h,
          a || d ? " " : ""
        ] }) : null,
        a ? /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-accent", children: a }) : null,
        d ? /* @__PURE__ */ m.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          h || a ? " " : "",
          y(d, "heading-suffix")
        ] }) : null
      ] }) : r.heading })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-grid", children: [
      v.map((b) => /* @__PURE__ */ m.jsx(Lf, { card: b }, b.id)),
      /* @__PURE__ */ m.jsx(uw, { config: r }),
      /* @__PURE__ */ m.jsx(Lf, { card: x })
    ] })
  ] }) });
}
function dw() {
  const r = k.useRef(null), [n, i] = k.useState(!1), a = k.useCallback(() => {
    const u = r.current;
    if (!u) {
      i(!1);
      return;
    }
    const d = u.scrollHeight > u.clientHeight + 2;
    i((p) => p === d ? p : d);
  }, []);
  return k.useEffect(() => {
    const u = window.requestAnimationFrame(a);
    return () => window.cancelAnimationFrame(u);
  }, [a]), /* @__PURE__ */ m.jsx(Cp, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ m.jsx(
          Ip,
          {
            ref: r,
            className: "ac-homepage__composer-input",
            placeholder: "ask me anything",
            minRows: 1,
            maxRows: nS,
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
          /* @__PURE__ */ m.jsx(bl, { running: !1, children: /* @__PURE__ */ m.jsx(Yv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ m.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ m.jsx(bl, { running: !0, children: /* @__PURE__ */ m.jsx(f_, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function fw() {
  return typeof document > "u" ? null : Sg.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ m.jsx(dw, {}) }),
    document.body
  );
}
function pw() {
  return /* @__PURE__ */ m.jsx(Gl, { className: "ac-message ac-message--user", children: /* @__PURE__ */ m.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ m.jsx(Yl, {}) }) });
}
function hw() {
  const { sendPrompt: r, isRunning: n } = qp(), i = St((h) => h.id || ""), a = St((h) => h.status?.type === "complete"), u = be(({ thread: h }) => h.suggestions || Wp), d = be(({ thread: h }) => h.isRunning), p = be(({ thread: h }) => {
    for (let y = h.messages.length - 1; y >= 0; y -= 1) {
      const v = h.messages[y];
      if (v?.role === "assistant")
        return v.id === i;
    }
    return !1;
  });
  return !a || d || !p || !u.length ? null : /* @__PURE__ */ m.jsx("div", { className: "ac-message__suggestions", "aria-label": "Suggested follow-up prompts", children: u.map((h, y) => /* @__PURE__ */ m.jsx(
    "button",
    {
      type: "button",
      className: "ac-message__suggestion",
      disabled: d || n,
      onClick: () => r(h.prompt),
      children: h.prompt
    },
    `${i}-suggestion-${y}-${h.prompt}`
  )) });
}
function mw(r = "") {
  if (typeof r != "string" || !r.trim()) return "";
  try {
    const n = JSON.parse(r);
    if (Array.isArray(n))
      return n.map((i) => typeof i == "string" ? i : "").filter(Boolean).join(", ");
  } catch {
  }
  return r;
}
const Of = [
  "Settling into the shape of your question...",
  "Listening for the clearest thread...",
  "Letting the reading gather itself...",
  "Bringing the guidance into plain language..."
];
function lo(r = "") {
  return String(r).toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}
function gw(r = "", n = "") {
  const i = lo(r), a = lo(`${r} ${n}`);
  return /search catalog|catalog|collection|product search|shopify search/.test(a) ? "Looking for a crystal match..." : /get product details|product details|variant|inventory|price/.test(a) ? "Verifying the strongest match..." : /cart|checkout|update cart|get cart/.test(a) ? /update/.test(i) ? "Preparing the cart update..." : "Opening your cart..." : /policy|faq|shipping|return|store question/.test(a) ? "Checking the store guidance..." : /horoscope|zodiac|astrology|planet|daily guidance|star/.test(a) ? "Aligning today’s sky pattern..." : /bazi|four pillars|day master|heavenly stem|earthly branch/.test(a) ? "Mapping the elemental structure..." : /tarot|spread|card/.test(a) ? "Drawing the symbolic spread..." : /fengshui|feng shui|space audit|room|placement/.test(a) ? "Tracing the room’s energy flow..." : /yinyuan|matchmaking|relationship|compatib|connection/.test(a) ? "Reading the connection pattern..." : /numerology|shushu|number profile/.test(a) ? "Following the number pattern..." : /taibu|router|structured divination|route/.test(a) ? "Choosing the clearest reading path..." : /crystal|stone|chakra|ritual|intention|energy/.test(a) ? "Looking for a crystal match..." : r ? "Consulting the right tool..." : "";
}
function yw(r, n = 0) {
  const i = mw(r?.tool || ""), a = [
    r?.thought,
    r?.toolInput,
    r?.observation
  ].filter(Boolean).join(" "), u = gw(i, a);
  if (u) return u;
  const d = lo(a);
  return /search|look up|find|catalog|product|shop|store|inventory/.test(d) ? "Checking the crystal shelf..." : /chart|zodiac|horoscope|planet|bazi|tarot|feng|numerology|relationship|compatib/.test(d) ? "Reading the pattern..." : /recommend|guidance|answer|respond|final|compose/.test(d) ? "Bringing the guidance into focus..." : /tool|workflow|call|input|observation/.test(d) ? "Consulting the right tool..." : Of[n % Of.length];
}
function vw(r = [], n = !1) {
  const i = ao(r), a = /* @__PURE__ */ new Map();
  i.forEach((d, p) => {
    const h = yw(d, p);
    if (!h) return;
    const y = `${h}:${d.tool || ""}`, v = a.get(y), x = !!d.observation || !n && p < i.length - 1;
    a.set(y, {
      id: d.id || y,
      label: h,
      isFinished: v?.isFinished || x,
      order: v?.order ?? p
    });
  });
  const u = Array.from(a.values()).sort((d, p) => d.order - p.order);
  return u.length ? u.map((d, p) => {
    const h = n && p === u.length - 1 && !d.isFinished;
    return {
      ...d,
      isCurrent: h,
      isFinished: !h && (d.isFinished || p < u.length - 1)
    };
  }) : [];
}
function _w(r, n = 0) {
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
function fh(r) {
  return Array.isArray(r) ? r.map(_w).filter(Boolean).sort((n, i) => n.order - i.order) : [];
}
function Sw({ statusText: r = "" }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-dify-pending", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ m.jsx("span", { className: "ac-dify-pending__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ m.jsx("span", { children: r || "Thinking..." })
  ] });
}
function ww() {
  return /* @__PURE__ */ m.jsx("div", { className: "ac-message__ready", children: "✦ Your reading is ready" });
}
function xw() {
  const r = St((G) => G.content || G.parts || Wp), n = At(r), i = r.some((G) => G.type === "tool-call"), a = St((G) => G.status?.type === "running"), u = St((G) => G.metadata?.custom?.statusText || ""), d = St((G) => G.metadata?.custom?.statusStage || ""), p = St((G) => G.metadata?.custom?.statusTool || ""), h = St((G) => G.metadata?.custom?.statusHistoryText || ""), y = St((G) => G.metadata?.custom?.ambientStatusText || ""), v = St((G) => G.metadata?.custom?.statusElapsedMs || 0), x = St((G) => G.metadata?.custom?.difyProgressEntries), b = St((G) => G.metadata?.custom?.userPrompt || ""), _ = k.useMemo(() => fh(x), [x]), I = _.length > 0, N = a && !n && !i && !I, P = !!n || i, B = a && !P, $ = _.find((G) => G.isCurrent) || _[_.length - 1] || null, K = h || _.map((G) => G.label).join(`
`), te = u || $?.label || "", oe = k.useMemo(() => ({
    statusText: te,
    statusHistoryText: K,
    statusStage: d || (I ? "tool" : "listen"),
    statusTool: p,
    ambientStatusText: y,
    statusElapsedMs: v,
    progressEntries: _,
    userPrompt: b
  }), [
    y,
    _,
    I,
    K,
    te,
    v,
    d,
    p,
    b
  ]), [fe, J] = k.useState({
    isVisible: B,
    isExiting: !1,
    props: oe
  }), D = k.useRef(B), F = k.useRef(null), se = k.useRef(oe);
  return k.useEffect(() => {
    se.current = oe;
  }, [oe]), k.useEffect(() => {
    B && (F.current && (window.clearTimeout(F.current), F.current = null), D.current = !0, J({
      isVisible: !0,
      isExiting: !1,
      props: oe
    }));
  }, [oe, B]), k.useEffect(() => {
    if (!B) {
      if (!D.current) {
        J({
          isVisible: !1,
          isExiting: !1,
          props: oe
        });
        return;
      }
      if (!F.current)
        return D.current = !1, J((G) => ({
          ...G,
          isExiting: !0
        })), F.current = window.setTimeout(() => {
          J({
            isVisible: !1,
            isExiting: !1,
            props: se.current
          }), F.current = null;
        }, 280), () => {
          F.current && (window.clearTimeout(F.current), F.current = null);
        };
    }
  }, [B]), k.useEffect(() => () => {
    F.current && (window.clearTimeout(F.current), F.current = null);
  }, []), /* @__PURE__ */ m.jsxs(Gl, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: [
      fe.isVisible ? /* @__PURE__ */ m.jsx(
        LS,
        {
          ...fe.props,
          isExiting: fe.isExiting
        }
      ) : null,
      P ? /* @__PURE__ */ m.jsxs("div", { className: "ac-message__content-layer", children: [
        /* @__PURE__ */ m.jsx(ww, {}),
        /* @__PURE__ */ m.jsx(
          Yl,
          {
            components: {
              Text: ({ text: G }) => /* @__PURE__ */ m.jsx(ih, { text: G }),
              ...J_
            }
          }
        )
      ] }) : N && !B ? /* @__PURE__ */ m.jsx(Sw, { statusText: u }) : null
    ] }),
    /* @__PURE__ */ m.jsx(hw, {}),
    /* @__PURE__ */ m.jsx(kp, { children: /* @__PURE__ */ m.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function Ew() {
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
function kw({ hasUserMessages: r = !1 }) {
  return /* @__PURE__ */ m.jsxs("section", { className: "ac-chat-page__hero", "aria-label": "AskCrystal reading room", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "ac-chat-page__hero-copy", children: [
      /* @__PURE__ */ m.jsx("h1", { children: "Hi, I’m AskCrystal" }),
      /* @__PURE__ */ m.jsx("p", { children: "Your guide for readings, crystals, rituals, and clarity." })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-chat-page__orb", "aria-hidden": "true", children: [
      /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__orb-field" }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__orb-ring ac-chat-page__orb-ring--outer" }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__orb-ring ac-chat-page__orb-ring--inner" }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__orb-aperture" }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-chat-page__orb-horizon" })
    ] }),
    r ? null : /* @__PURE__ */ m.jsx(Ew, {})
  ] });
}
function bw({ config: r }) {
  const { runtime: n, hasUserMessages: i, activeSessionId: a, sendPrompt: u, onCancel: d, isRunning: p } = aw(r), h = k.useMemo(() => ({
    sendPrompt: u,
    onCancel: d,
    isRunning: p
  }), [p, d, u]), y = Zp(r), v = y === "chat", x = v && i, b = k.useRef(null), _ = k.useRef(null), I = k.useRef(!1), N = k.useRef(!1);
  k.useEffect(() => {
    if (!v || N.current || p) return;
    N.current = !0;
    const B = dS();
    if (!B) return;
    const $ = window.setTimeout(() => {
      u(B);
    }, 80);
    return () => window.clearTimeout($);
  }, [v, p, u]), k.useEffect(() => {
    if (!_.current) return;
    const $ = window.requestAnimationFrame(() => {
      if (_.current) {
        if (!x) {
          I.current = !1, _.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        I.current || (I.current = !0, _.current.scrollTo({ top: _.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame($);
  }, [a, x]), k.useEffect(() => {
    const B = b.current, $ = _.current;
    if (!B || !$ || typeof window > "u") return;
    const K = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let te = 0, oe = Math.max(1, $.clientHeight || 1);
    const fe = /* @__PURE__ */ new Map(), J = (ve) => Math.round(ve), D = (ve) => Math.round(ve * 100) / 100, F = (ve, he) => {
      fe.get(ve) !== he && (fe.set(ve, he), B.style.setProperty(ve, he));
    }, se = () => {
      te = 0;
      const ve = $.scrollTop, he = Math.max(280, Math.min(520, oe * 0.68)), ue = Math.max(0, 1 - ve / he);
      if (!v) {
        const me = K?.matches ? 0 : Math.min(92, ve * 0.28);
        F("--ac-homepage-backdrop-offset", `${J(me)}px`), F("--ac-homepage-backdrop-opacity", String(D(ue)));
        return;
      }
      const we = 18, Me = K?.matches ? we : we + Math.min(260, ve * 0.34);
      F("--ac-chat-bg-offset", `${J(Me)}px`), F("--ac-chat-bg-opacity", String(D(ue)));
    }, G = () => {
      te || (te = window.requestAnimationFrame(se));
    }, Ce = () => {
      oe = Math.max(1, $.clientHeight || 1), G();
    };
    return se(), $.addEventListener("scroll", G, { passive: !0 }), window.addEventListener("resize", Ce, { passive: !0 }), () => {
      $.removeEventListener("scroll", G), window.removeEventListener("resize", Ce), te && window.cancelAnimationFrame(te);
    };
  }, [a, i, v]);
  const P = [
    "ac-homepage",
    `ac-homepage--${y}`,
    v ? i ? "ac-homepage--has-messages" : "ac-homepage--empty" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ m.jsx(Qp.Provider, { value: h, children: /* @__PURE__ */ m.jsx(fv, { runtime: n, children: /* @__PURE__ */ m.jsxs("div", { ref: b, className: P, children: [
    v ? null : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__backdrop", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("img", { src: tS, alt: "", loading: "eager", decoding: "async" }) }),
    /* @__PURE__ */ m.jsx(Rp, { className: "ac-homepage__thread", children: /* @__PURE__ */ m.jsxs(
      Mp,
      {
        ref: _,
        className: "ac-homepage__viewport",
        autoScroll: x,
        turnAnchor: x ? "bottom" : "top",
        scrollToBottomOnInitialize: !1,
        scrollToBottomOnRunStart: x,
        scrollToBottomOnThreadSwitch: x,
        children: [
          v ? /* @__PURE__ */ m.jsx(kw, { hasUserMessages: i }) : /* @__PURE__ */ m.jsx(cw, { config: r }),
          v ? /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ m.jsx(
            S_,
            {
              components: {
                UserMessage: pw,
                AssistantMessage: xw
              }
            }
          ) }) : null,
          /* @__PURE__ */ m.jsx(fw, {})
        ]
      }
    ) })
  ] }) }) });
}
function Cw(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || no.has(i)) return;
  const a = rS(n);
  if (!a) return;
  const u = _g.createRoot(r);
  u.render(/* @__PURE__ */ m.jsx(bw, { config: a })), no.set(i, u);
}
function Tw(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = no.get(n);
  i && (i.unmount(), no.delete(n));
}
function ph(r = document) {
  r.querySelectorAll(Vp).forEach((n) => Cw(n));
}
function Iw(r) {
  r.querySelectorAll(Vp).forEach((n) => Tw(n));
}
ph();
document.addEventListener("shopify:section:load", (r) => {
  ph(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  Iw(r.target);
});
