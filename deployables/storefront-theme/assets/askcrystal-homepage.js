function gm(r, n) {
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
function Ff(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var pl = { exports: {} }, _s = {}, gl = { exports: {} }, de = {};
var Wd;
function mm() {
  if (Wd) return de;
  Wd = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), h = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), x = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function _(w) {
    return w === null || typeof w != "object" ? null : (w = b && w[b] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var A = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, P = Object.assign, N = {};
  function U(w, I, W) {
    this.props = w, this.context = I, this.refs = N, this.updater = W || A;
  }
  U.prototype.isReactComponent = {}, U.prototype.setState = function(w, I) {
    if (typeof w != "object" && typeof w != "function" && w != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, w, I, "setState");
  }, U.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function B() {
  }
  B.prototype = U.prototype;
  function J(w, I, W) {
    this.props = w, this.context = I, this.refs = N, this.updater = W || A;
  }
  var X = J.prototype = new B();
  X.constructor = J, P(X, U.prototype), X.isPureReactComponent = !0;
  var le = Array.isArray, fe = Object.prototype.hasOwnProperty, K = { current: null }, D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function H(w, I, W) {
    var ie, oe = {}, ne = null, pe = null;
    if (I != null) for (ie in I.ref !== void 0 && (pe = I.ref), I.key !== void 0 && (ne = "" + I.key), I) fe.call(I, ie) && !D.hasOwnProperty(ie) && (oe[ie] = I[ie]);
    var _e = arguments.length - 2;
    if (_e === 1) oe.children = W;
    else if (1 < _e) {
      for (var ue = Array(_e), Ue = 0; Ue < _e; Ue++) ue[Ue] = arguments[Ue + 2];
      oe.children = ue;
    }
    if (w && w.defaultProps) for (ie in _e = w.defaultProps, _e) oe[ie] === void 0 && (oe[ie] = _e[ie]);
    return { $$typeof: r, type: w, key: ne, ref: pe, props: oe, _owner: K.current };
  }
  function se(w, I) {
    return { $$typeof: r, type: w.type, key: I, ref: w.ref, props: w.props, _owner: w._owner };
  }
  function ge(w) {
    return typeof w == "object" && w !== null && w.$$typeof === r;
  }
  function ve(w) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(W) {
      return I[W];
    });
  }
  var me = /\/+/g;
  function he(w, I) {
    return typeof w == "object" && w !== null && w.key != null ? ve("" + w.key) : I.toString(36);
  }
  function ae(w, I, W, ie, oe) {
    var ne = typeof w;
    (ne === "undefined" || ne === "boolean") && (w = null);
    var pe = !1;
    if (w === null) pe = !0;
    else switch (ne) {
      case "string":
      case "number":
        pe = !0;
        break;
      case "object":
        switch (w.$$typeof) {
          case r:
          case n:
            pe = !0;
        }
    }
    if (pe) return pe = w, oe = oe(pe), w = ie === "" ? "." + he(pe, 0) : ie, le(oe) ? (W = "", w != null && (W = w.replace(me, "$&/") + "/"), ae(oe, I, W, "", function(Ue) {
      return Ue;
    })) : oe != null && (ge(oe) && (oe = se(oe, W + (!oe.key || pe && pe.key === oe.key ? "" : ("" + oe.key).replace(me, "$&/") + "/") + w)), I.push(oe)), 1;
    if (pe = 0, ie = ie === "" ? "." : ie + ":", le(w)) for (var _e = 0; _e < w.length; _e++) {
      ne = w[_e];
      var ue = ie + he(ne, _e);
      pe += ae(ne, I, W, ue, oe);
    }
    else if (ue = _(w), typeof ue == "function") for (w = ue.call(w), _e = 0; !(ne = w.next()).done; ) ne = ne.value, ue = ie + he(ne, _e++), pe += ae(ne, I, W, ue, oe);
    else if (ne === "object") throw I = String(w), Error("Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead.");
    return pe;
  }
  function ce(w, I, W) {
    if (w == null) return w;
    var ie = [], oe = 0;
    return ae(w, ie, "", "", function(ne) {
      return I.call(W, ne, oe++);
    }), ie;
  }
  function ke(w) {
    if (w._status === -1) {
      var I = w._result;
      I = I(), I.then(function(W) {
        (w._status === 0 || w._status === -1) && (w._status = 1, w._result = W);
      }, function(W) {
        (w._status === 0 || w._status === -1) && (w._status = 2, w._result = W);
      }), w._status === -1 && (w._status = 0, w._result = I);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var $ = { current: null }, F = { transition: null }, te = { ReactCurrentDispatcher: $, ReactCurrentBatchConfig: F, ReactCurrentOwner: K };
  function M() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return de.Children = { map: ce, forEach: function(w, I, W) {
    ce(w, function() {
      I.apply(this, arguments);
    }, W);
  }, count: function(w) {
    var I = 0;
    return ce(w, function() {
      I++;
    }), I;
  }, toArray: function(w) {
    return ce(w, function(I) {
      return I;
    }) || [];
  }, only: function(w) {
    if (!ge(w)) throw Error("React.Children.only expected to receive a single React element child.");
    return w;
  } }, de.Component = U, de.Fragment = i, de.Profiler = u, de.PureComponent = J, de.StrictMode = a, de.Suspense = y, de.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = te, de.act = M, de.cloneElement = function(w, I, W) {
    if (w == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + w + ".");
    var ie = P({}, w.props), oe = w.key, ne = w.ref, pe = w._owner;
    if (I != null) {
      if (I.ref !== void 0 && (ne = I.ref, pe = K.current), I.key !== void 0 && (oe = "" + I.key), w.type && w.type.defaultProps) var _e = w.type.defaultProps;
      for (ue in I) fe.call(I, ue) && !D.hasOwnProperty(ue) && (ie[ue] = I[ue] === void 0 && _e !== void 0 ? _e[ue] : I[ue]);
    }
    var ue = arguments.length - 2;
    if (ue === 1) ie.children = W;
    else if (1 < ue) {
      _e = Array(ue);
      for (var Ue = 0; Ue < ue; Ue++) _e[Ue] = arguments[Ue + 2];
      ie.children = _e;
    }
    return { $$typeof: r, type: w.type, key: oe, ref: ne, props: ie, _owner: pe };
  }, de.createContext = function(w) {
    return w = { $$typeof: h, _currentValue: w, _currentValue2: w, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, w.Provider = { $$typeof: d, _context: w }, w.Consumer = w;
  }, de.createElement = H, de.createFactory = function(w) {
    var I = H.bind(null, w);
    return I.type = w, I;
  }, de.createRef = function() {
    return { current: null };
  }, de.forwardRef = function(w) {
    return { $$typeof: g, render: w };
  }, de.isValidElement = ge, de.lazy = function(w) {
    return { $$typeof: x, _payload: { _status: -1, _result: w }, _init: ke };
  }, de.memo = function(w, I) {
    return { $$typeof: v, type: w, compare: I === void 0 ? null : I };
  }, de.startTransition = function(w) {
    var I = F.transition;
    F.transition = {};
    try {
      w();
    } finally {
      F.transition = I;
    }
  }, de.unstable_act = M, de.useCallback = function(w, I) {
    return $.current.useCallback(w, I);
  }, de.useContext = function(w) {
    return $.current.useContext(w);
  }, de.useDebugValue = function() {
  }, de.useDeferredValue = function(w) {
    return $.current.useDeferredValue(w);
  }, de.useEffect = function(w, I) {
    return $.current.useEffect(w, I);
  }, de.useId = function() {
    return $.current.useId();
  }, de.useImperativeHandle = function(w, I, W) {
    return $.current.useImperativeHandle(w, I, W);
  }, de.useInsertionEffect = function(w, I) {
    return $.current.useInsertionEffect(w, I);
  }, de.useLayoutEffect = function(w, I) {
    return $.current.useLayoutEffect(w, I);
  }, de.useMemo = function(w, I) {
    return $.current.useMemo(w, I);
  }, de.useReducer = function(w, I, W) {
    return $.current.useReducer(w, I, W);
  }, de.useRef = function(w) {
    return $.current.useRef(w);
  }, de.useState = function(w) {
    return $.current.useState(w);
  }, de.useSyncExternalStore = function(w, I, W) {
    return $.current.useSyncExternalStore(w, I, W);
  }, de.useTransition = function() {
    return $.current.useTransition();
  }, de.version = "18.3.1", de;
}
var qd;
function Ul() {
  return qd || (qd = 1, gl.exports = mm()), gl.exports;
}
var Gd;
function ym() {
  if (Gd) return _s;
  Gd = 1;
  var r = Ul(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(g, y, v) {
    var x, b = {}, _ = null, A = null;
    v !== void 0 && (_ = "" + v), y.key !== void 0 && (_ = "" + y.key), y.ref !== void 0 && (A = y.ref);
    for (x in y) a.call(y, x) && !d.hasOwnProperty(x) && (b[x] = y[x]);
    if (g && g.defaultProps) for (x in y = g.defaultProps, y) b[x] === void 0 && (b[x] = y[x]);
    return { $$typeof: n, type: g, key: _, ref: A, props: b, _owner: u.current };
  }
  return _s.Fragment = i, _s.jsx = h, _s.jsxs = h, _s;
}
var Yd;
function vm() {
  return Yd || (Yd = 1, pl.exports = ym()), pl.exports;
}
var p = vm(), E = Ul();
const Nt = /* @__PURE__ */ Ff(E), _m = /* @__PURE__ */ gm({
  __proto__: null,
  default: Nt
}, [E]);
var qi = {}, ml = { exports: {} }, dt = {}, yl = { exports: {} }, vl = {};
var Qd;
function Sm() {
  return Qd || (Qd = 1, (function(r) {
    function n(F, te) {
      var M = F.length;
      F.push(te);
      e: for (; 0 < M; ) {
        var w = M - 1 >>> 1, I = F[w];
        if (0 < u(I, te)) F[w] = te, F[M] = I, M = w;
        else break e;
      }
    }
    function i(F) {
      return F.length === 0 ? null : F[0];
    }
    function a(F) {
      if (F.length === 0) return null;
      var te = F[0], M = F.pop();
      if (M !== te) {
        F[0] = M;
        e: for (var w = 0, I = F.length, W = I >>> 1; w < W; ) {
          var ie = 2 * (w + 1) - 1, oe = F[ie], ne = ie + 1, pe = F[ne];
          if (0 > u(oe, M)) ne < I && 0 > u(pe, oe) ? (F[w] = pe, F[ne] = M, w = ne) : (F[w] = oe, F[ie] = M, w = ie);
          else if (ne < I && 0 > u(pe, M)) F[w] = pe, F[ne] = M, w = ne;
          else break e;
        }
      }
      return te;
    }
    function u(F, te) {
      var M = F.sortIndex - te.sortIndex;
      return M !== 0 ? M : F.id - te.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      r.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, g = h.now();
      r.unstable_now = function() {
        return h.now() - g;
      };
    }
    var y = [], v = [], x = 1, b = null, _ = 3, A = !1, P = !1, N = !1, U = typeof setTimeout == "function" ? setTimeout : null, B = typeof clearTimeout == "function" ? clearTimeout : null, J = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function X(F) {
      for (var te = i(v); te !== null; ) {
        if (te.callback === null) a(v);
        else if (te.startTime <= F) a(v), te.sortIndex = te.expirationTime, n(y, te);
        else break;
        te = i(v);
      }
    }
    function le(F) {
      if (N = !1, X(F), !P) if (i(y) !== null) P = !0, ke(fe);
      else {
        var te = i(v);
        te !== null && $(le, te.startTime - F);
      }
    }
    function fe(F, te) {
      P = !1, N && (N = !1, B(H), H = -1), A = !0;
      var M = _;
      try {
        for (X(te), b = i(y); b !== null && (!(b.expirationTime > te) || F && !ve()); ) {
          var w = b.callback;
          if (typeof w == "function") {
            b.callback = null, _ = b.priorityLevel;
            var I = w(b.expirationTime <= te);
            te = r.unstable_now(), typeof I == "function" ? b.callback = I : b === i(y) && a(y), X(te);
          } else a(y);
          b = i(y);
        }
        if (b !== null) var W = !0;
        else {
          var ie = i(v);
          ie !== null && $(le, ie.startTime - te), W = !1;
        }
        return W;
      } finally {
        b = null, _ = M, A = !1;
      }
    }
    var K = !1, D = null, H = -1, se = 5, ge = -1;
    function ve() {
      return !(r.unstable_now() - ge < se);
    }
    function me() {
      if (D !== null) {
        var F = r.unstable_now();
        ge = F;
        var te = !0;
        try {
          te = D(!0, F);
        } finally {
          te ? he() : (K = !1, D = null);
        }
      } else K = !1;
    }
    var he;
    if (typeof J == "function") he = function() {
      J(me);
    };
    else if (typeof MessageChannel < "u") {
      var ae = new MessageChannel(), ce = ae.port2;
      ae.port1.onmessage = me, he = function() {
        ce.postMessage(null);
      };
    } else he = function() {
      U(me, 0);
    };
    function ke(F) {
      D = F, K || (K = !0, he());
    }
    function $(F, te) {
      H = U(function() {
        F(r.unstable_now());
      }, te);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(F) {
      F.callback = null;
    }, r.unstable_continueExecution = function() {
      P || A || (P = !0, ke(fe));
    }, r.unstable_forceFrameRate = function(F) {
      0 > F || 125 < F ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : se = 0 < F ? Math.floor(1e3 / F) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return _;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(y);
    }, r.unstable_next = function(F) {
      switch (_) {
        case 1:
        case 2:
        case 3:
          var te = 3;
          break;
        default:
          te = _;
      }
      var M = _;
      _ = te;
      try {
        return F();
      } finally {
        _ = M;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(F, te) {
      switch (F) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          F = 3;
      }
      var M = _;
      _ = F;
      try {
        return te();
      } finally {
        _ = M;
      }
    }, r.unstable_scheduleCallback = function(F, te, M) {
      var w = r.unstable_now();
      switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? w + M : w) : M = w, F) {
        case 1:
          var I = -1;
          break;
        case 2:
          I = 250;
          break;
        case 5:
          I = 1073741823;
          break;
        case 4:
          I = 1e4;
          break;
        default:
          I = 5e3;
      }
      return I = M + I, F = { id: x++, callback: te, priorityLevel: F, startTime: M, expirationTime: I, sortIndex: -1 }, M > w ? (F.sortIndex = M, n(v, F), i(y) === null && F === i(v) && (N ? (B(H), H = -1) : N = !0, $(le, M - w))) : (F.sortIndex = I, n(y, F), P || A || (P = !0, ke(fe))), F;
    }, r.unstable_shouldYield = ve, r.unstable_wrapCallback = function(F) {
      var te = _;
      return function() {
        var M = _;
        _ = te;
        try {
          return F.apply(this, arguments);
        } finally {
          _ = M;
        }
      };
    };
  })(vl)), vl;
}
var Kd;
function wm() {
  return Kd || (Kd = 1, yl.exports = Sm()), yl.exports;
}
var Jd;
function xm() {
  if (Jd) return dt;
  Jd = 1;
  var r = Ul(), n = wm();
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
  var g = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), y = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, x = {}, b = {};
  function _(e) {
    return y.call(b, e) ? !0 : y.call(x, e) ? !1 : v.test(e) ? b[e] = !0 : (x[e] = !0, !1);
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
  function P(e, t, s, o) {
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
  function N(e, t, s, o, l, c, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = s, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = f;
  }
  var U = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    U[e] = new N(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    U[t] = new N(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    U[e] = new N(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    U[e] = new N(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    U[e] = new N(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    U[e] = new N(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    U[e] = new N(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    U[e] = new N(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    U[e] = new N(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var B = /[\-:]([a-z])/g;
  function J(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      B,
      J
    );
    U[t] = new N(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(B, J);
    U[t] = new N(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(B, J);
    U[t] = new N(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    U[e] = new N(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), U.xlinkHref = new N("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    U[e] = new N(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function X(e, t, s, o) {
    var l = U.hasOwnProperty(t) ? U[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (P(t, s, l, o) && (s = null), o || l === null ? _(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var le = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, fe = /* @__PURE__ */ Symbol.for("react.element"), K = /* @__PURE__ */ Symbol.for("react.portal"), D = /* @__PURE__ */ Symbol.for("react.fragment"), H = /* @__PURE__ */ Symbol.for("react.strict_mode"), se = /* @__PURE__ */ Symbol.for("react.profiler"), ge = /* @__PURE__ */ Symbol.for("react.provider"), ve = /* @__PURE__ */ Symbol.for("react.context"), me = /* @__PURE__ */ Symbol.for("react.forward_ref"), he = /* @__PURE__ */ Symbol.for("react.suspense"), ae = /* @__PURE__ */ Symbol.for("react.suspense_list"), ce = /* @__PURE__ */ Symbol.for("react.memo"), ke = /* @__PURE__ */ Symbol.for("react.lazy"), $ = /* @__PURE__ */ Symbol.for("react.offscreen"), F = Symbol.iterator;
  function te(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var M = Object.assign, w;
  function I(e) {
    if (w === void 0) try {
      throw Error();
    } catch (s) {
      var t = s.stack.trim().match(/\n( *(at )?)/);
      w = t && t[1] || "";
    }
    return `
` + w + e;
  }
  var W = !1;
  function ie(e, t) {
    if (!e || W) return "";
    W = !0;
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
`), f = l.length - 1, m = c.length - 1; 1 <= f && 0 <= m && l[f] !== c[m]; ) m--;
        for (; 1 <= f && 0 <= m; f--, m--) if (l[f] !== c[m]) {
          if (f !== 1 || m !== 1)
            do
              if (f--, m--, 0 > m || l[f] !== c[m]) {
                var S = `
` + l[f].replace(" at new ", " at ");
                return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), S;
              }
            while (1 <= f && 0 <= m);
          break;
        }
      }
    } finally {
      W = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? I(e) : "";
  }
  function oe(e) {
    switch (e.tag) {
      case 5:
        return I(e.type);
      case 16:
        return I("Lazy");
      case 13:
        return I("Suspense");
      case 19:
        return I("SuspenseList");
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
      case K:
        return "Portal";
      case se:
        return "Profiler";
      case H:
        return "StrictMode";
      case he:
        return "Suspense";
      case ae:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case ve:
        return (e.displayName || "Context") + ".Consumer";
      case ge:
        return (e._context.displayName || "Context") + ".Provider";
      case me:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ce:
        return t = e.displayName || null, t !== null ? t : ne(e.type) || "Memo";
      case ke:
        t = e._payload, e = e._init;
        try {
          return ne(e(t));
        } catch {
        }
    }
    return null;
  }
  function pe(e) {
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
        return t === H ? "StrictMode" : "Mode";
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
  function _e(e) {
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
  function ue(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ue(e) {
    var t = ue(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
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
  function bn(e) {
    e._valueTracker || (e._valueTracker = Ue(e));
  }
  function sn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = ue(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
  }
  function Yn(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Nr(e, t) {
    var s = t.checked;
    return M({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function Ds(e, t) {
    var s = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    s = _e(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Pr(e, t) {
    t = t.checked, t != null && X(e, "checked", t, !1);
  }
  function mt(e, t) {
    Pr(e, t);
    var s = _e(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Ie(e, t.type, s) : t.hasOwnProperty("defaultValue") && Ie(e, t.type, _e(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Ae(e, t, s) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function Ie(e, t, s) {
    (t !== "number" || Yn(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var Ye = Array.isArray;
  function tt(e, t, s, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < s.length; l++) t["$" + s[l]] = !0;
      for (s = 0; s < e.length; s++) l = t.hasOwnProperty("$" + e[s].value), e[s].selected !== l && (e[s].selected = l), l && o && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + _e(s), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === s) {
          e[l].selected = !0, o && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function zt(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return M({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Qe(e, t) {
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
    e._wrapperState = { initialValue: _e(s) };
  }
  function Dt(e, t) {
    var s = _e(t.value), o = _e(t.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), t.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), o != null && (e.defaultValue = "" + o);
  }
  function Cn(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Qn(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function jr(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Qn(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Kn, iu = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, s, o, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, s, o, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Kn = Kn || document.createElement("div"), Kn.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Kn.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Lr(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Or = {
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
  }, _p = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Or).forEach(function(e) {
    _p.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Or[t] = Or[e];
    });
  });
  function ou(e, t, s) {
    return t == null || typeof t == "boolean" || t === "" ? "" : s || typeof t != "number" || t === 0 || Or.hasOwnProperty(e) && Or[e] ? ("" + t).trim() : t + "px";
  }
  function au(e, t) {
    e = e.style;
    for (var s in t) if (t.hasOwnProperty(s)) {
      var o = s.indexOf("--") === 0, l = ou(s, t[s], o);
      s === "float" && (s = "cssFloat"), o ? e.setProperty(s, l) : e[s] = l;
    }
  }
  var Sp = M({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Co(e, t) {
    if (t) {
      if (Sp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function To(e, t) {
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
  var Io = null;
  function Ro(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ao = null, Jn = null, Xn = null;
  function lu(e) {
    if (e = ss(e)) {
      if (typeof Ao != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = ai(t), Ao(e.stateNode, e.type, t));
    }
  }
  function uu(e) {
    Jn ? Xn ? Xn.push(e) : Xn = [e] : Jn = e;
  }
  function cu() {
    if (Jn) {
      var e = Jn, t = Xn;
      if (Xn = Jn = null, lu(e), t) for (e = 0; e < t.length; e++) lu(t[e]);
    }
  }
  function du(e, t) {
    return e(t);
  }
  function fu() {
  }
  var Mo = !1;
  function hu(e, t, s) {
    if (Mo) return e(t, s);
    Mo = !0;
    try {
      return du(e, t, s);
    } finally {
      Mo = !1, (Jn !== null || Xn !== null) && (fu(), cu());
    }
  }
  function zr(e, t) {
    var s = e.stateNode;
    if (s === null) return null;
    var o = ai(s);
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
  var No = !1;
  if (g) try {
    var Dr = {};
    Object.defineProperty(Dr, "passive", { get: function() {
      No = !0;
    } }), window.addEventListener("test", Dr, Dr), window.removeEventListener("test", Dr, Dr);
  } catch {
    No = !1;
  }
  function wp(e, t, s, o, l, c, f, m, S) {
    var R = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, R);
    } catch (L) {
      this.onError(L);
    }
  }
  var Br = !1, Bs = null, Fs = !1, Po = null, xp = { onError: function(e) {
    Br = !0, Bs = e;
  } };
  function Ep(e, t, s, o, l, c, f, m, S) {
    Br = !1, Bs = null, wp.apply(xp, arguments);
  }
  function kp(e, t, s, o, l, c, f, m, S) {
    if (Ep.apply(this, arguments), Br) {
      if (Br) {
        var R = Bs;
        Br = !1, Bs = null;
      } else throw Error(i(198));
      Fs || (Fs = !0, Po = R);
    }
  }
  function Tn(e) {
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
  function pu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function gu(e) {
    if (Tn(e) !== e) throw Error(i(188));
  }
  function bp(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Tn(e), t === null) throw Error(i(188));
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
          if (c === s) return gu(l), e;
          if (c === o) return gu(l), t;
          c = c.sibling;
        }
        throw Error(i(188));
      }
      if (s.return !== o.return) s = l, o = c;
      else {
        for (var f = !1, m = l.child; m; ) {
          if (m === s) {
            f = !0, s = l, o = c;
            break;
          }
          if (m === o) {
            f = !0, o = l, s = c;
            break;
          }
          m = m.sibling;
        }
        if (!f) {
          for (m = c.child; m; ) {
            if (m === s) {
              f = !0, s = c, o = l;
              break;
            }
            if (m === o) {
              f = !0, o = c, s = l;
              break;
            }
            m = m.sibling;
          }
          if (!f) throw Error(i(189));
        }
      }
      if (s.alternate !== o) throw Error(i(190));
    }
    if (s.tag !== 3) throw Error(i(188));
    return s.stateNode.current === s ? e : t;
  }
  function mu(e) {
    return e = bp(e), e !== null ? yu(e) : null;
  }
  function yu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = yu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var vu = n.unstable_scheduleCallback, _u = n.unstable_cancelCallback, Cp = n.unstable_shouldYield, Tp = n.unstable_requestPaint, Le = n.unstable_now, Ip = n.unstable_getCurrentPriorityLevel, jo = n.unstable_ImmediatePriority, Su = n.unstable_UserBlockingPriority, Us = n.unstable_NormalPriority, Rp = n.unstable_LowPriority, wu = n.unstable_IdlePriority, $s = null, Bt = null;
  function Ap(e) {
    if (Bt && typeof Bt.onCommitFiberRoot == "function") try {
      Bt.onCommitFiberRoot($s, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var kt = Math.clz32 ? Math.clz32 : Pp, Mp = Math.log, Np = Math.LN2;
  function Pp(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Mp(e) / Np | 0) | 0;
  }
  var Hs = 64, Vs = 4194304;
  function Fr(e) {
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
  function Ws(e, t) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var o = 0, l = e.suspendedLanes, c = e.pingedLanes, f = s & 268435455;
    if (f !== 0) {
      var m = f & ~l;
      m !== 0 ? o = Fr(m) : (c &= f, c !== 0 && (o = Fr(c)));
    } else f = s & ~l, f !== 0 ? o = Fr(f) : c !== 0 && (o = Fr(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - kt(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function jp(e, t) {
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
  function Lp(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var f = 31 - kt(c), m = 1 << f, S = l[f];
      S === -1 ? ((m & s) === 0 || (m & o) !== 0) && (l[f] = jp(m, t)) : S <= t && (e.expiredLanes |= m), c &= ~m;
    }
  }
  function Lo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function xu() {
    var e = Hs;
    return Hs <<= 1, (Hs & 4194240) === 0 && (Hs = 64), e;
  }
  function Oo(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Ur(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - kt(t), e[t] = s;
  }
  function Op(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - kt(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function zo(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - kt(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var xe = 0;
  function Eu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var ku, Do, bu, Cu, Tu, Bo = !1, qs = [], on = null, an = null, ln = null, $r = /* @__PURE__ */ new Map(), Hr = /* @__PURE__ */ new Map(), un = [], zp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Iu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        on = null;
        break;
      case "dragenter":
      case "dragleave":
        an = null;
        break;
      case "mouseover":
      case "mouseout":
        ln = null;
        break;
      case "pointerover":
      case "pointerout":
        $r.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hr.delete(t.pointerId);
    }
  }
  function Vr(e, t, s, o, l, c) {
    return e === null || e.nativeEvent !== c ? (e = { blockedOn: t, domEventName: s, eventSystemFlags: o, nativeEvent: c, targetContainers: [l] }, t !== null && (t = ss(t), t !== null && Do(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Dp(e, t, s, o, l) {
    switch (t) {
      case "focusin":
        return on = Vr(on, e, t, s, o, l), !0;
      case "dragenter":
        return an = Vr(an, e, t, s, o, l), !0;
      case "mouseover":
        return ln = Vr(ln, e, t, s, o, l), !0;
      case "pointerover":
        var c = l.pointerId;
        return $r.set(c, Vr($r.get(c) || null, e, t, s, o, l)), !0;
      case "gotpointercapture":
        return c = l.pointerId, Hr.set(c, Vr(Hr.get(c) || null, e, t, s, o, l)), !0;
    }
    return !1;
  }
  function Ru(e) {
    var t = In(e.target);
    if (t !== null) {
      var s = Tn(t);
      if (s !== null) {
        if (t = s.tag, t === 13) {
          if (t = pu(s), t !== null) {
            e.blockedOn = t, Tu(e.priority, function() {
              bu(s);
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
  function Gs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var s = Uo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        Io = o, s.target.dispatchEvent(o), Io = null;
      } else return t = ss(s), t !== null && Do(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function Au(e, t, s) {
    Gs(e) && s.delete(t);
  }
  function Bp() {
    Bo = !1, on !== null && Gs(on) && (on = null), an !== null && Gs(an) && (an = null), ln !== null && Gs(ln) && (ln = null), $r.forEach(Au), Hr.forEach(Au);
  }
  function Wr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bo || (Bo = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Bp)));
  }
  function qr(e) {
    function t(l) {
      return Wr(l, e);
    }
    if (0 < qs.length) {
      Wr(qs[0], e);
      for (var s = 1; s < qs.length; s++) {
        var o = qs[s];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (on !== null && Wr(on, e), an !== null && Wr(an, e), ln !== null && Wr(ln, e), $r.forEach(t), Hr.forEach(t), s = 0; s < un.length; s++) o = un[s], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < un.length && (s = un[0], s.blockedOn === null); ) Ru(s), s.blockedOn === null && un.shift();
  }
  var Zn = le.ReactCurrentBatchConfig, Ys = !0;
  function Fp(e, t, s, o) {
    var l = xe, c = Zn.transition;
    Zn.transition = null;
    try {
      xe = 1, Fo(e, t, s, o);
    } finally {
      xe = l, Zn.transition = c;
    }
  }
  function Up(e, t, s, o) {
    var l = xe, c = Zn.transition;
    Zn.transition = null;
    try {
      xe = 4, Fo(e, t, s, o);
    } finally {
      xe = l, Zn.transition = c;
    }
  }
  function Fo(e, t, s, o) {
    if (Ys) {
      var l = Uo(e, t, s, o);
      if (l === null) sa(e, t, o, Qs, s), Iu(e, o);
      else if (Dp(l, e, t, s, o)) o.stopPropagation();
      else if (Iu(e, o), t & 4 && -1 < zp.indexOf(e)) {
        for (; l !== null; ) {
          var c = ss(l);
          if (c !== null && ku(c), c = Uo(e, t, s, o), c === null && sa(e, t, o, Qs, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else sa(e, t, o, null, s);
    }
  }
  var Qs = null;
  function Uo(e, t, s, o) {
    if (Qs = null, e = Ro(o), e = In(e), e !== null) if (t = Tn(e), t === null) e = null;
    else if (s = t.tag, s === 13) {
      if (e = pu(t), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Qs = e, null;
  }
  function Mu(e) {
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
        switch (Ip()) {
          case jo:
            return 1;
          case Su:
            return 4;
          case Us:
          case Rp:
            return 16;
          case wu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var cn = null, $o = null, Ks = null;
  function Nu() {
    if (Ks) return Ks;
    var e, t = $o, s = t.length, o, l = "value" in cn ? cn.value : cn.textContent, c = l.length;
    for (e = 0; e < s && t[e] === l[e]; e++) ;
    var f = s - e;
    for (o = 1; o <= f && t[s - o] === l[c - o]; o++) ;
    return Ks = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Js(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Xs() {
    return !0;
  }
  function Pu() {
    return !1;
  }
  function ft(e) {
    function t(s, o, l, c, f) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var m in e) e.hasOwnProperty(m) && (s = e[m], this[m] = s ? s(c) : c[m]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Xs : Pu, this.isPropagationStopped = Pu, this;
    }
    return M(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Xs);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Xs);
    }, persist: function() {
    }, isPersistent: Xs }), t;
  }
  var er = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ho = ft(er), Gr = M({}, er, { view: 0, detail: 0 }), $p = ft(Gr), Vo, Wo, Yr, Zs = M({}, Gr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Go, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Yr && (Yr && e.type === "mousemove" ? (Vo = e.screenX - Yr.screenX, Wo = e.screenY - Yr.screenY) : Wo = Vo = 0, Yr = e), Vo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Wo;
  } }), ju = ft(Zs), Hp = M({}, Zs, { dataTransfer: 0 }), Vp = ft(Hp), Wp = M({}, Gr, { relatedTarget: 0 }), qo = ft(Wp), qp = M({}, er, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Gp = ft(qp), Yp = M({}, er, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Qp = ft(Yp), Kp = M({}, er, { data: 0 }), Lu = ft(Kp), Jp = {
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
  }, Xp = {
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
  }, Zp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function eg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Zp[e]) ? !!t[e] : !1;
  }
  function Go() {
    return eg;
  }
  var tg = M({}, Gr, { key: function(e) {
    if (e.key) {
      var t = Jp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Js(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Xp[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Go, charCode: function(e) {
    return e.type === "keypress" ? Js(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Js(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), ng = ft(tg), rg = M({}, Zs, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ou = ft(rg), sg = M({}, Gr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Go }), ig = ft(sg), og = M({}, er, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ag = ft(og), lg = M({}, Zs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ug = ft(lg), cg = [9, 13, 27, 32], Yo = g && "CompositionEvent" in window, Qr = null;
  g && "documentMode" in document && (Qr = document.documentMode);
  var dg = g && "TextEvent" in window && !Qr, zu = g && (!Yo || Qr && 8 < Qr && 11 >= Qr), Du = " ", Bu = !1;
  function Fu(e, t) {
    switch (e) {
      case "keyup":
        return cg.indexOf(t.keyCode) !== -1;
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
  function Uu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var tr = !1;
  function fg(e, t) {
    switch (e) {
      case "compositionend":
        return Uu(t);
      case "keypress":
        return t.which !== 32 ? null : (Bu = !0, Du);
      case "textInput":
        return e = t.data, e === Du && Bu ? null : e;
      default:
        return null;
    }
  }
  function hg(e, t) {
    if (tr) return e === "compositionend" || !Yo && Fu(e, t) ? (e = Nu(), Ks = $o = cn = null, tr = !1, e) : null;
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
        return zu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var pg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function $u(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!pg[e.type] : t === "textarea";
  }
  function Hu(e, t, s, o) {
    uu(o), t = si(t, "onChange"), 0 < t.length && (s = new Ho("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var Kr = null, Jr = null;
  function gg(e) {
    ac(e, 0);
  }
  function ei(e) {
    var t = or(e);
    if (sn(t)) return e;
  }
  function mg(e, t) {
    if (e === "change") return t;
  }
  var Vu = !1;
  if (g) {
    var Qo;
    if (g) {
      var Ko = "oninput" in document;
      if (!Ko) {
        var Wu = document.createElement("div");
        Wu.setAttribute("oninput", "return;"), Ko = typeof Wu.oninput == "function";
      }
      Qo = Ko;
    } else Qo = !1;
    Vu = Qo && (!document.documentMode || 9 < document.documentMode);
  }
  function qu() {
    Kr && (Kr.detachEvent("onpropertychange", Gu), Jr = Kr = null);
  }
  function Gu(e) {
    if (e.propertyName === "value" && ei(Jr)) {
      var t = [];
      Hu(t, Jr, e, Ro(e)), hu(gg, t);
    }
  }
  function yg(e, t, s) {
    e === "focusin" ? (qu(), Kr = t, Jr = s, Kr.attachEvent("onpropertychange", Gu)) : e === "focusout" && qu();
  }
  function vg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return ei(Jr);
  }
  function _g(e, t) {
    if (e === "click") return ei(t);
  }
  function Sg(e, t) {
    if (e === "input" || e === "change") return ei(t);
  }
  function wg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var bt = typeof Object.is == "function" ? Object.is : wg;
  function Xr(e, t) {
    if (bt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var s = Object.keys(e), o = Object.keys(t);
    if (s.length !== o.length) return !1;
    for (o = 0; o < s.length; o++) {
      var l = s[o];
      if (!y.call(t, l) || !bt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Yu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Qu(e, t) {
    var s = Yu(e);
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
      s = Yu(s);
    }
  }
  function Ku(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ku(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ju() {
    for (var e = window, t = Yn(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof t.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = t.contentWindow;
      else break;
      t = Yn(e.document);
    }
    return t;
  }
  function Jo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function xg(e) {
    var t = Ju(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Ku(s.ownerDocument.documentElement, s)) {
      if (o !== null && Jo(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = Qu(s, c);
          var f = Qu(
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
  var Eg = g && "documentMode" in document && 11 >= document.documentMode, nr = null, Xo = null, Zr = null, Zo = !1;
  function Xu(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Zo || nr == null || nr !== Yn(o) || (o = nr, "selectionStart" in o && Jo(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Zr && Xr(Zr, o) || (Zr = o, o = si(Xo, "onSelect"), 0 < o.length && (t = new Ho("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = nr)));
  }
  function ti(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var rr = { animationend: ti("Animation", "AnimationEnd"), animationiteration: ti("Animation", "AnimationIteration"), animationstart: ti("Animation", "AnimationStart"), transitionend: ti("Transition", "TransitionEnd") }, ea = {}, Zu = {};
  g && (Zu = document.createElement("div").style, "AnimationEvent" in window || (delete rr.animationend.animation, delete rr.animationiteration.animation, delete rr.animationstart.animation), "TransitionEvent" in window || delete rr.transitionend.transition);
  function ni(e) {
    if (ea[e]) return ea[e];
    if (!rr[e]) return e;
    var t = rr[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Zu) return ea[e] = t[s];
    return e;
  }
  var ec = ni("animationend"), tc = ni("animationiteration"), nc = ni("animationstart"), rc = ni("transitionend"), sc = /* @__PURE__ */ new Map(), ic = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function dn(e, t) {
    sc.set(e, t), d(t, [e]);
  }
  for (var ta = 0; ta < ic.length; ta++) {
    var na = ic[ta], kg = na.toLowerCase(), bg = na[0].toUpperCase() + na.slice(1);
    dn(kg, "on" + bg);
  }
  dn(ec, "onAnimationEnd"), dn(tc, "onAnimationIteration"), dn(nc, "onAnimationStart"), dn("dblclick", "onDoubleClick"), dn("focusin", "onFocus"), dn("focusout", "onBlur"), dn(rc, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var es = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cg = new Set("cancel close invalid load scroll toggle".split(" ").concat(es));
  function oc(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, kp(o, t, void 0, e), e.currentTarget = null;
  }
  function ac(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var m = o[f], S = m.instance, R = m.currentTarget;
          if (m = m.listener, S !== c && l.isPropagationStopped()) break e;
          oc(l, m, R), c = S;
        }
        else for (f = 0; f < o.length; f++) {
          if (m = o[f], S = m.instance, R = m.currentTarget, m = m.listener, S !== c && l.isPropagationStopped()) break e;
          oc(l, m, R), c = S;
        }
      }
    }
    if (Fs) throw e = Po, Fs = !1, Po = null, e;
  }
  function be(e, t) {
    var s = t[ca];
    s === void 0 && (s = t[ca] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (lc(t, e, 2, !1), s.add(o));
  }
  function ra(e, t, s) {
    var o = 0;
    t && (o |= 4), lc(s, e, o, t);
  }
  var ri = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[ri]) {
      e[ri] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (Cg.has(s) || ra(s, !1, e), ra(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ri] || (t[ri] = !0, ra("selectionchange", !1, t));
    }
  }
  function lc(e, t, s, o) {
    switch (Mu(t)) {
      case 1:
        var l = Fp;
        break;
      case 4:
        l = Up;
        break;
      default:
        l = Fo;
    }
    s = l.bind(null, t, s, e), l = void 0, !No || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, s, { capture: !0, passive: l }) : e.addEventListener(t, s, !0) : l !== void 0 ? e.addEventListener(t, s, { passive: l }) : e.addEventListener(t, s, !1);
  }
  function sa(e, t, s, o, l) {
    var c = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var f = o.tag;
      if (f === 3 || f === 4) {
        var m = o.stateNode.containerInfo;
        if (m === l || m.nodeType === 8 && m.parentNode === l) break;
        if (f === 4) for (f = o.return; f !== null; ) {
          var S = f.tag;
          if ((S === 3 || S === 4) && (S = f.stateNode.containerInfo, S === l || S.nodeType === 8 && S.parentNode === l)) return;
          f = f.return;
        }
        for (; m !== null; ) {
          if (f = In(m), f === null) return;
          if (S = f.tag, S === 5 || S === 6) {
            o = c = f;
            continue e;
          }
          m = m.parentNode;
        }
      }
      o = o.return;
    }
    hu(function() {
      var R = c, L = Ro(s), O = [];
      e: {
        var j = sc.get(e);
        if (j !== void 0) {
          var V = Ho, G = e;
          switch (e) {
            case "keypress":
              if (Js(s) === 0) break e;
            case "keydown":
            case "keyup":
              V = ng;
              break;
            case "focusin":
              G = "focus", V = qo;
              break;
            case "focusout":
              G = "blur", V = qo;
              break;
            case "beforeblur":
            case "afterblur":
              V = qo;
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
              V = ju;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              V = Vp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              V = ig;
              break;
            case ec:
            case tc:
            case nc:
              V = Gp;
              break;
            case rc:
              V = ag;
              break;
            case "scroll":
              V = $p;
              break;
            case "wheel":
              V = ug;
              break;
            case "copy":
            case "cut":
            case "paste":
              V = Qp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              V = Ou;
          }
          var Y = (t & 4) !== 0, Oe = !Y && e === "scroll", C = Y ? j !== null ? j + "Capture" : null : j;
          Y = [];
          for (var k = R, T; k !== null; ) {
            T = k;
            var z = T.stateNode;
            if (T.tag === 5 && z !== null && (T = z, C !== null && (z = zr(k, C), z != null && Y.push(ns(k, z, T)))), Oe) break;
            k = k.return;
          }
          0 < Y.length && (j = new V(j, G, null, s, L), O.push({ event: j, listeners: Y }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (j = e === "mouseover" || e === "pointerover", V = e === "mouseout" || e === "pointerout", j && s !== Io && (G = s.relatedTarget || s.fromElement) && (In(G) || G[Gt])) break e;
          if ((V || j) && (j = L.window === L ? L : (j = L.ownerDocument) ? j.defaultView || j.parentWindow : window, V ? (G = s.relatedTarget || s.toElement, V = R, G = G ? In(G) : null, G !== null && (Oe = Tn(G), G !== Oe || G.tag !== 5 && G.tag !== 6) && (G = null)) : (V = null, G = R), V !== G)) {
            if (Y = ju, z = "onMouseLeave", C = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (Y = Ou, z = "onPointerLeave", C = "onPointerEnter", k = "pointer"), Oe = V == null ? j : or(V), T = G == null ? j : or(G), j = new Y(z, k + "leave", V, s, L), j.target = Oe, j.relatedTarget = T, z = null, In(L) === R && (Y = new Y(C, k + "enter", G, s, L), Y.target = T, Y.relatedTarget = Oe, z = Y), Oe = z, V && G) t: {
              for (Y = V, C = G, k = 0, T = Y; T; T = sr(T)) k++;
              for (T = 0, z = C; z; z = sr(z)) T++;
              for (; 0 < k - T; ) Y = sr(Y), k--;
              for (; 0 < T - k; ) C = sr(C), T--;
              for (; k--; ) {
                if (Y === C || C !== null && Y === C.alternate) break t;
                Y = sr(Y), C = sr(C);
              }
              Y = null;
            }
            else Y = null;
            V !== null && uc(O, j, V, Y, !1), G !== null && Oe !== null && uc(O, Oe, G, Y, !0);
          }
        }
        e: {
          if (j = R ? or(R) : window, V = j.nodeName && j.nodeName.toLowerCase(), V === "select" || V === "input" && j.type === "file") var Q = mg;
          else if ($u(j)) if (Vu) Q = Sg;
          else {
            Q = vg;
            var Z = yg;
          }
          else (V = j.nodeName) && V.toLowerCase() === "input" && (j.type === "checkbox" || j.type === "radio") && (Q = _g);
          if (Q && (Q = Q(e, R))) {
            Hu(O, Q, s, L);
            break e;
          }
          Z && Z(e, j, R), e === "focusout" && (Z = j._wrapperState) && Z.controlled && j.type === "number" && Ie(j, "number", j.value);
        }
        switch (Z = R ? or(R) : window, e) {
          case "focusin":
            ($u(Z) || Z.contentEditable === "true") && (nr = Z, Xo = R, Zr = null);
            break;
          case "focusout":
            Zr = Xo = nr = null;
            break;
          case "mousedown":
            Zo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Zo = !1, Xu(O, s, L);
            break;
          case "selectionchange":
            if (Eg) break;
          case "keydown":
          case "keyup":
            Xu(O, s, L);
        }
        var ee;
        if (Yo) e: {
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
        else tr ? Fu(e, s) && (re = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (re = "onCompositionStart");
        re && (zu && s.locale !== "ko" && (tr || re !== "onCompositionStart" ? re === "onCompositionEnd" && tr && (ee = Nu()) : (cn = L, $o = "value" in cn ? cn.value : cn.textContent, tr = !0)), Z = si(R, re), 0 < Z.length && (re = new Lu(re, e, null, s, L), O.push({ event: re, listeners: Z }), ee ? re.data = ee : (ee = Uu(s), ee !== null && (re.data = ee)))), (ee = dg ? fg(e, s) : hg(e, s)) && (R = si(R, "onBeforeInput"), 0 < R.length && (L = new Lu("onBeforeInput", "beforeinput", null, s, L), O.push({ event: L, listeners: R }), L.data = ee));
      }
      ac(O, t);
    });
  }
  function ns(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function si(e, t) {
    for (var s = t + "Capture", o = []; e !== null; ) {
      var l = e, c = l.stateNode;
      l.tag === 5 && c !== null && (l = c, c = zr(e, s), c != null && o.unshift(ns(e, c, l)), c = zr(e, t), c != null && o.push(ns(e, c, l))), e = e.return;
    }
    return o;
  }
  function sr(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function uc(e, t, s, o, l) {
    for (var c = t._reactName, f = []; s !== null && s !== o; ) {
      var m = s, S = m.alternate, R = m.stateNode;
      if (S !== null && S === o) break;
      m.tag === 5 && R !== null && (m = R, l ? (S = zr(s, c), S != null && f.unshift(ns(s, S, m))) : l || (S = zr(s, c), S != null && f.push(ns(s, S, m)))), s = s.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Tg = /\r\n?/g, Ig = /\u0000|\uFFFD/g;
  function cc(e) {
    return (typeof e == "string" ? e : "" + e).replace(Tg, `
`).replace(Ig, "");
  }
  function ii(e, t, s) {
    if (t = cc(t), cc(e) !== t && s) throw Error(i(425));
  }
  function oi() {
  }
  var ia = null, oa = null;
  function aa(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var la = typeof setTimeout == "function" ? setTimeout : void 0, Rg = typeof clearTimeout == "function" ? clearTimeout : void 0, dc = typeof Promise == "function" ? Promise : void 0, Ag = typeof queueMicrotask == "function" ? queueMicrotask : typeof dc < "u" ? function(e) {
    return dc.resolve(null).then(e).catch(Mg);
  } : la;
  function Mg(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ua(e, t) {
    var s = t, o = 0;
    do {
      var l = s.nextSibling;
      if (e.removeChild(s), l && l.nodeType === 8) if (s = l.data, s === "/$") {
        if (o === 0) {
          e.removeChild(l), qr(t);
          return;
        }
        o--;
      } else s !== "$" && s !== "$?" && s !== "$!" || o++;
      s = l;
    } while (s);
    qr(t);
  }
  function fn(e) {
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
  function fc(e) {
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
  var ir = Math.random().toString(36).slice(2), Ft = "__reactFiber$" + ir, rs = "__reactProps$" + ir, Gt = "__reactContainer$" + ir, ca = "__reactEvents$" + ir, Ng = "__reactListeners$" + ir, Pg = "__reactHandles$" + ir;
  function In(e) {
    var t = e[Ft];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[Gt] || s[Ft]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = fc(e); e !== null; ) {
          if (s = e[Ft]) return s;
          e = fc(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function ss(e) {
    return e = e[Ft] || e[Gt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function or(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function ai(e) {
    return e[rs] || null;
  }
  var da = [], ar = -1;
  function hn(e) {
    return { current: e };
  }
  function Ce(e) {
    0 > ar || (e.current = da[ar], da[ar] = null, ar--);
  }
  function Ee(e, t) {
    ar++, da[ar] = e.current, e.current = t;
  }
  var pn = {}, Ke = hn(pn), ot = hn(!1), Rn = pn;
  function lr(e, t) {
    var s = e.type.contextTypes;
    if (!s) return pn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var l = {}, c;
    for (c in s) l[c] = t[c];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function at(e) {
    return e = e.childContextTypes, e != null;
  }
  function li() {
    Ce(ot), Ce(Ke);
  }
  function hc(e, t, s) {
    if (Ke.current !== pn) throw Error(i(168));
    Ee(Ke, t), Ee(ot, s);
  }
  function pc(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, pe(e) || "Unknown", l));
    return M({}, s, o);
  }
  function ui(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pn, Rn = Ke.current, Ee(Ke, e), Ee(ot, ot.current), !0;
  }
  function gc(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = pc(e, t, Rn), o.__reactInternalMemoizedMergedChildContext = e, Ce(ot), Ce(Ke), Ee(Ke, e)) : Ce(ot), Ee(ot, s);
  }
  var Yt = null, ci = !1, fa = !1;
  function mc(e) {
    Yt === null ? Yt = [e] : Yt.push(e);
  }
  function jg(e) {
    ci = !0, mc(e);
  }
  function gn() {
    if (!fa && Yt !== null) {
      fa = !0;
      var e = 0, t = xe;
      try {
        var s = Yt;
        for (xe = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Yt = null, ci = !1;
      } catch (l) {
        throw Yt !== null && (Yt = Yt.slice(e + 1)), vu(jo, gn), l;
      } finally {
        xe = t, fa = !1;
      }
    }
    return null;
  }
  var ur = [], cr = 0, di = null, fi = 0, yt = [], vt = 0, An = null, Qt = 1, Kt = "";
  function Mn(e, t) {
    ur[cr++] = fi, ur[cr++] = di, di = e, fi = t;
  }
  function yc(e, t, s) {
    yt[vt++] = Qt, yt[vt++] = Kt, yt[vt++] = An, An = e;
    var o = Qt;
    e = Kt;
    var l = 32 - kt(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - kt(t) + l;
    if (30 < c) {
      var f = l - l % 5;
      c = (o & (1 << f) - 1).toString(32), o >>= f, l -= f, Qt = 1 << 32 - kt(t) + l | s << l | o, Kt = c + e;
    } else Qt = 1 << c | s << l | o, Kt = e;
  }
  function ha(e) {
    e.return !== null && (Mn(e, 1), yc(e, 1, 0));
  }
  function pa(e) {
    for (; e === di; ) di = ur[--cr], ur[cr] = null, fi = ur[--cr], ur[cr] = null;
    for (; e === An; ) An = yt[--vt], yt[vt] = null, Kt = yt[--vt], yt[vt] = null, Qt = yt[--vt], yt[vt] = null;
  }
  var ht = null, pt = null, Re = !1, Ct = null;
  function vc(e, t) {
    var s = xt(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function _c(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ht = e, pt = fn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ht = e, pt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = An !== null ? { id: Qt, overflow: Kt } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = xt(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, ht = e, pt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ga(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ma(e) {
    if (Re) {
      var t = pt;
      if (t) {
        var s = t;
        if (!_c(e, t)) {
          if (ga(e)) throw Error(i(418));
          t = fn(s.nextSibling);
          var o = ht;
          t && _c(e, t) ? vc(o, s) : (e.flags = e.flags & -4097 | 2, Re = !1, ht = e);
        }
      } else {
        if (ga(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, Re = !1, ht = e;
      }
    }
  }
  function Sc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ht = e;
  }
  function hi(e) {
    if (e !== ht) return !1;
    if (!Re) return Sc(e), Re = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !aa(e.type, e.memoizedProps)), t && (t = pt)) {
      if (ga(e)) throw wc(), Error(i(418));
      for (; t; ) vc(e, t), t = fn(t.nextSibling);
    }
    if (Sc(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (t === 0) {
                pt = fn(e.nextSibling);
                break e;
              }
              t--;
            } else s !== "$" && s !== "$!" && s !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        pt = null;
      }
    } else pt = ht ? fn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function wc() {
    for (var e = pt; e; ) e = fn(e.nextSibling);
  }
  function dr() {
    pt = ht = null, Re = !1;
  }
  function ya(e) {
    Ct === null ? Ct = [e] : Ct.push(e);
  }
  var Lg = le.ReactCurrentBatchConfig;
  function is(e, t, s) {
    if (e = s.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(i(309));
          var o = s.stateNode;
        }
        if (!o) throw Error(i(147, e));
        var l = o, c = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === c ? t.ref : (t = function(f) {
          var m = l.refs;
          f === null ? delete m[c] : m[c] = f;
        }, t._stringRef = c, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!s._owner) throw Error(i(290, e));
    }
    return e;
  }
  function pi(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function xc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Ec(e) {
    function t(C, k) {
      if (e) {
        var T = C.deletions;
        T === null ? (C.deletions = [k], C.flags |= 16) : T.push(k);
      }
    }
    function s(C, k) {
      if (!e) return null;
      for (; k !== null; ) t(C, k), k = k.sibling;
      return null;
    }
    function o(C, k) {
      for (C = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? C.set(k.key, k) : C.set(k.index, k), k = k.sibling;
      return C;
    }
    function l(C, k) {
      return C = En(C, k), C.index = 0, C.sibling = null, C;
    }
    function c(C, k, T) {
      return C.index = T, e ? (T = C.alternate, T !== null ? (T = T.index, T < k ? (C.flags |= 2, k) : T) : (C.flags |= 2, k)) : (C.flags |= 1048576, k);
    }
    function f(C) {
      return e && C.alternate === null && (C.flags |= 2), C;
    }
    function m(C, k, T, z) {
      return k === null || k.tag !== 6 ? (k = ll(T, C.mode, z), k.return = C, k) : (k = l(k, T), k.return = C, k);
    }
    function S(C, k, T, z) {
      var Q = T.type;
      return Q === D ? L(C, k, T.props.children, z, T.key) : k !== null && (k.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === ke && xc(Q) === k.type) ? (z = l(k, T.props), z.ref = is(C, k, T), z.return = C, z) : (z = Di(T.type, T.key, T.props, null, C.mode, z), z.ref = is(C, k, T), z.return = C, z);
    }
    function R(C, k, T, z) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== T.containerInfo || k.stateNode.implementation !== T.implementation ? (k = ul(T, C.mode, z), k.return = C, k) : (k = l(k, T.children || []), k.return = C, k);
    }
    function L(C, k, T, z, Q) {
      return k === null || k.tag !== 7 ? (k = Bn(T, C.mode, z, Q), k.return = C, k) : (k = l(k, T), k.return = C, k);
    }
    function O(C, k, T) {
      if (typeof k == "string" && k !== "" || typeof k == "number") return k = ll("" + k, C.mode, T), k.return = C, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case fe:
            return T = Di(k.type, k.key, k.props, null, C.mode, T), T.ref = is(C, null, k), T.return = C, T;
          case K:
            return k = ul(k, C.mode, T), k.return = C, k;
          case ke:
            var z = k._init;
            return O(C, z(k._payload), T);
        }
        if (Ye(k) || te(k)) return k = Bn(k, C.mode, T, null), k.return = C, k;
        pi(C, k);
      }
      return null;
    }
    function j(C, k, T, z) {
      var Q = k !== null ? k.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return Q !== null ? null : m(C, k, "" + T, z);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case fe:
            return T.key === Q ? S(C, k, T, z) : null;
          case K:
            return T.key === Q ? R(C, k, T, z) : null;
          case ke:
            return Q = T._init, j(
              C,
              k,
              Q(T._payload),
              z
            );
        }
        if (Ye(T) || te(T)) return Q !== null ? null : L(C, k, T, z, null);
        pi(C, T);
      }
      return null;
    }
    function V(C, k, T, z, Q) {
      if (typeof z == "string" && z !== "" || typeof z == "number") return C = C.get(T) || null, m(k, C, "" + z, Q);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case fe:
            return C = C.get(z.key === null ? T : z.key) || null, S(k, C, z, Q);
          case K:
            return C = C.get(z.key === null ? T : z.key) || null, R(k, C, z, Q);
          case ke:
            var Z = z._init;
            return V(C, k, T, Z(z._payload), Q);
        }
        if (Ye(z) || te(z)) return C = C.get(T) || null, L(k, C, z, Q, null);
        pi(k, z);
      }
      return null;
    }
    function G(C, k, T, z) {
      for (var Q = null, Z = null, ee = k, re = k = 0, Ve = null; ee !== null && re < T.length; re++) {
        ee.index > re ? (Ve = ee, ee = null) : Ve = ee.sibling;
        var Se = j(C, ee, T[re], z);
        if (Se === null) {
          ee === null && (ee = Ve);
          break;
        }
        e && ee && Se.alternate === null && t(C, ee), k = c(Se, k, re), Z === null ? Q = Se : Z.sibling = Se, Z = Se, ee = Ve;
      }
      if (re === T.length) return s(C, ee), Re && Mn(C, re), Q;
      if (ee === null) {
        for (; re < T.length; re++) ee = O(C, T[re], z), ee !== null && (k = c(ee, k, re), Z === null ? Q = ee : Z.sibling = ee, Z = ee);
        return Re && Mn(C, re), Q;
      }
      for (ee = o(C, ee); re < T.length; re++) Ve = V(ee, C, re, T[re], z), Ve !== null && (e && Ve.alternate !== null && ee.delete(Ve.key === null ? re : Ve.key), k = c(Ve, k, re), Z === null ? Q = Ve : Z.sibling = Ve, Z = Ve);
      return e && ee.forEach(function(kn) {
        return t(C, kn);
      }), Re && Mn(C, re), Q;
    }
    function Y(C, k, T, z) {
      var Q = te(T);
      if (typeof Q != "function") throw Error(i(150));
      if (T = Q.call(T), T == null) throw Error(i(151));
      for (var Z = Q = null, ee = k, re = k = 0, Ve = null, Se = T.next(); ee !== null && !Se.done; re++, Se = T.next()) {
        ee.index > re ? (Ve = ee, ee = null) : Ve = ee.sibling;
        var kn = j(C, ee, Se.value, z);
        if (kn === null) {
          ee === null && (ee = Ve);
          break;
        }
        e && ee && kn.alternate === null && t(C, ee), k = c(kn, k, re), Z === null ? Q = kn : Z.sibling = kn, Z = kn, ee = Ve;
      }
      if (Se.done) return s(
        C,
        ee
      ), Re && Mn(C, re), Q;
      if (ee === null) {
        for (; !Se.done; re++, Se = T.next()) Se = O(C, Se.value, z), Se !== null && (k = c(Se, k, re), Z === null ? Q = Se : Z.sibling = Se, Z = Se);
        return Re && Mn(C, re), Q;
      }
      for (ee = o(C, ee); !Se.done; re++, Se = T.next()) Se = V(ee, C, re, Se.value, z), Se !== null && (e && Se.alternate !== null && ee.delete(Se.key === null ? re : Se.key), k = c(Se, k, re), Z === null ? Q = Se : Z.sibling = Se, Z = Se);
      return e && ee.forEach(function(pm) {
        return t(C, pm);
      }), Re && Mn(C, re), Q;
    }
    function Oe(C, k, T, z) {
      if (typeof T == "object" && T !== null && T.type === D && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case fe:
            e: {
              for (var Q = T.key, Z = k; Z !== null; ) {
                if (Z.key === Q) {
                  if (Q = T.type, Q === D) {
                    if (Z.tag === 7) {
                      s(C, Z.sibling), k = l(Z, T.props.children), k.return = C, C = k;
                      break e;
                    }
                  } else if (Z.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === ke && xc(Q) === Z.type) {
                    s(C, Z.sibling), k = l(Z, T.props), k.ref = is(C, Z, T), k.return = C, C = k;
                    break e;
                  }
                  s(C, Z);
                  break;
                } else t(C, Z);
                Z = Z.sibling;
              }
              T.type === D ? (k = Bn(T.props.children, C.mode, z, T.key), k.return = C, C = k) : (z = Di(T.type, T.key, T.props, null, C.mode, z), z.ref = is(C, k, T), z.return = C, C = z);
            }
            return f(C);
          case K:
            e: {
              for (Z = T.key; k !== null; ) {
                if (k.key === Z) if (k.tag === 4 && k.stateNode.containerInfo === T.containerInfo && k.stateNode.implementation === T.implementation) {
                  s(C, k.sibling), k = l(k, T.children || []), k.return = C, C = k;
                  break e;
                } else {
                  s(C, k);
                  break;
                }
                else t(C, k);
                k = k.sibling;
              }
              k = ul(T, C.mode, z), k.return = C, C = k;
            }
            return f(C);
          case ke:
            return Z = T._init, Oe(C, k, Z(T._payload), z);
        }
        if (Ye(T)) return G(C, k, T, z);
        if (te(T)) return Y(C, k, T, z);
        pi(C, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, k !== null && k.tag === 6 ? (s(C, k.sibling), k = l(k, T), k.return = C, C = k) : (s(C, k), k = ll(T, C.mode, z), k.return = C, C = k), f(C)) : s(C, k);
    }
    return Oe;
  }
  var fr = Ec(!0), kc = Ec(!1), gi = hn(null), mi = null, hr = null, va = null;
  function _a() {
    va = hr = mi = null;
  }
  function Sa(e) {
    var t = gi.current;
    Ce(gi), e._currentValue = t;
  }
  function wa(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function pr(e, t) {
    mi = e, va = hr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (lt = !0), e.firstContext = null);
  }
  function _t(e) {
    var t = e._currentValue;
    if (va !== e) if (e = { context: e, memoizedValue: t, next: null }, hr === null) {
      if (mi === null) throw Error(i(308));
      hr = e, mi.dependencies = { lanes: 0, firstContext: e };
    } else hr = hr.next = e;
    return t;
  }
  var Nn = null;
  function xa(e) {
    Nn === null ? Nn = [e] : Nn.push(e);
  }
  function bc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, xa(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Jt(e, o);
  }
  function Jt(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var mn = !1;
  function Ea(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Cc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Xt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function yn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ye & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Jt(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, xa(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Jt(e, s);
  }
  function yi(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, zo(e, s);
    }
  }
  function Tc(e, t) {
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
  function vi(e, t, s, o) {
    var l = e.updateQueue;
    mn = !1;
    var c = l.firstBaseUpdate, f = l.lastBaseUpdate, m = l.shared.pending;
    if (m !== null) {
      l.shared.pending = null;
      var S = m, R = S.next;
      S.next = null, f === null ? c = R : f.next = R, f = S;
      var L = e.alternate;
      L !== null && (L = L.updateQueue, m = L.lastBaseUpdate, m !== f && (m === null ? L.firstBaseUpdate = R : m.next = R, L.lastBaseUpdate = S));
    }
    if (c !== null) {
      var O = l.baseState;
      f = 0, L = R = S = null, m = c;
      do {
        var j = m.lane, V = m.eventTime;
        if ((o & j) === j) {
          L !== null && (L = L.next = {
            eventTime: V,
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          });
          e: {
            var G = e, Y = m;
            switch (j = t, V = s, Y.tag) {
              case 1:
                if (G = Y.payload, typeof G == "function") {
                  O = G.call(V, O, j);
                  break e;
                }
                O = G;
                break e;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = Y.payload, j = typeof G == "function" ? G.call(V, O, j) : G, j == null) break e;
                O = M({}, O, j);
                break e;
              case 2:
                mn = !0;
            }
          }
          m.callback !== null && m.lane !== 0 && (e.flags |= 64, j = l.effects, j === null ? l.effects = [m] : j.push(m));
        } else V = { eventTime: V, lane: j, tag: m.tag, payload: m.payload, callback: m.callback, next: null }, L === null ? (R = L = V, S = O) : L = L.next = V, f |= j;
        if (m = m.next, m === null) {
          if (m = l.shared.pending, m === null) break;
          j = m, m = j.next, j.next = null, l.lastBaseUpdate = j, l.shared.pending = null;
        }
      } while (!0);
      if (L === null && (S = O), l.baseState = S, l.firstBaseUpdate = R, l.lastBaseUpdate = L, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          f |= l.lane, l = l.next;
        while (l !== t);
      } else c === null && (l.shared.lanes = 0);
      Ln |= f, e.lanes = f, e.memoizedState = O;
    }
  }
  function Ic(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = s, typeof l != "function") throw Error(i(191, l));
        l.call(o);
      }
    }
  }
  var os = {}, Ut = hn(os), as = hn(os), ls = hn(os);
  function Pn(e) {
    if (e === os) throw Error(i(174));
    return e;
  }
  function ka(e, t) {
    switch (Ee(ls, t), Ee(as, e), Ee(Ut, os), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : jr(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = jr(t, e);
    }
    Ce(Ut), Ee(Ut, t);
  }
  function gr() {
    Ce(Ut), Ce(as), Ce(ls);
  }
  function Rc(e) {
    Pn(ls.current);
    var t = Pn(Ut.current), s = jr(t, e.type);
    t !== s && (Ee(as, e), Ee(Ut, s));
  }
  function ba(e) {
    as.current === e && (Ce(Ut), Ce(as));
  }
  var Me = hn(0);
  function _i(e) {
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
  var Ca = [];
  function Ta() {
    for (var e = 0; e < Ca.length; e++) Ca[e]._workInProgressVersionPrimary = null;
    Ca.length = 0;
  }
  var Si = le.ReactCurrentDispatcher, Ia = le.ReactCurrentBatchConfig, jn = 0, Ne = null, De = null, $e = null, wi = !1, us = !1, cs = 0, Og = 0;
  function Je() {
    throw Error(i(321));
  }
  function Ra(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!bt(e[s], t[s])) return !1;
    return !0;
  }
  function Aa(e, t, s, o, l, c) {
    if (jn = c, Ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Si.current = e === null || e.memoizedState === null ? Fg : Ug, e = s(o, l), us) {
      c = 0;
      do {
        if (us = !1, cs = 0, 25 <= c) throw Error(i(301));
        c += 1, $e = De = null, t.updateQueue = null, Si.current = $g, e = s(o, l);
      } while (us);
    }
    if (Si.current = ki, t = De !== null && De.next !== null, jn = 0, $e = De = Ne = null, wi = !1, t) throw Error(i(300));
    return e;
  }
  function Ma() {
    var e = cs !== 0;
    return cs = 0, e;
  }
  function $t() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return $e === null ? Ne.memoizedState = $e = e : $e = $e.next = e, $e;
  }
  function St() {
    if (De === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = $e === null ? Ne.memoizedState : $e.next;
    if (t !== null) $e = t, De = e;
    else {
      if (e === null) throw Error(i(310));
      De = e, e = { memoizedState: De.memoizedState, baseState: De.baseState, baseQueue: De.baseQueue, queue: De.queue, next: null }, $e === null ? Ne.memoizedState = $e = e : $e = $e.next = e;
    }
    return $e;
  }
  function ds(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Na(e) {
    var t = St(), s = t.queue;
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
      var m = f = null, S = null, R = c;
      do {
        var L = R.lane;
        if ((jn & L) === L) S !== null && (S = S.next = { lane: 0, action: R.action, hasEagerState: R.hasEagerState, eagerState: R.eagerState, next: null }), o = R.hasEagerState ? R.eagerState : e(o, R.action);
        else {
          var O = {
            lane: L,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          };
          S === null ? (m = S = O, f = o) : S = S.next = O, Ne.lanes |= L, Ln |= L;
        }
        R = R.next;
      } while (R !== null && R !== c);
      S === null ? f = o : S.next = m, bt(o, t.memoizedState) || (lt = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = S, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, Ne.lanes |= c, Ln |= c, l = l.next;
      while (l !== e);
    } else l === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function Pa(e) {
    var t = St(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = s.dispatch, l = s.pending, c = t.memoizedState;
    if (l !== null) {
      s.pending = null;
      var f = l = l.next;
      do
        c = e(c, f.action), f = f.next;
      while (f !== l);
      bt(c, t.memoizedState) || (lt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), s.lastRenderedState = c;
    }
    return [c, o];
  }
  function Ac() {
  }
  function Mc(e, t) {
    var s = Ne, o = St(), l = t(), c = !bt(o.memoizedState, l);
    if (c && (o.memoizedState = l, lt = !0), o = o.queue, ja(jc.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || $e !== null && $e.memoizedState.tag & 1) {
      if (s.flags |= 2048, fs(9, Pc.bind(null, s, o, l, t), void 0, null), He === null) throw Error(i(349));
      (jn & 30) !== 0 || Nc(s, t, l);
    }
    return l;
  }
  function Nc(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = Ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ne.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function Pc(e, t, s, o) {
    t.value = s, t.getSnapshot = o, Lc(t) && Oc(e);
  }
  function jc(e, t, s) {
    return s(function() {
      Lc(t) && Oc(e);
    });
  }
  function Lc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !bt(e, s);
    } catch {
      return !0;
    }
  }
  function Oc(e) {
    var t = Jt(e, 1);
    t !== null && At(t, e, 1, -1);
  }
  function zc(e) {
    var t = $t();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ds, lastRenderedState: e }, t.queue = e, e = e.dispatch = Bg.bind(null, Ne, e), [t.memoizedState, e];
  }
  function fs(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = Ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ne.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Dc() {
    return St().memoizedState;
  }
  function xi(e, t, s, o) {
    var l = $t();
    Ne.flags |= e, l.memoizedState = fs(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function Ei(e, t, s, o) {
    var l = St();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (De !== null) {
      var f = De.memoizedState;
      if (c = f.destroy, o !== null && Ra(o, f.deps)) {
        l.memoizedState = fs(t, s, c, o);
        return;
      }
    }
    Ne.flags |= e, l.memoizedState = fs(1 | t, s, c, o);
  }
  function Bc(e, t) {
    return xi(8390656, 8, e, t);
  }
  function ja(e, t) {
    return Ei(2048, 8, e, t);
  }
  function Fc(e, t) {
    return Ei(4, 2, e, t);
  }
  function Uc(e, t) {
    return Ei(4, 4, e, t);
  }
  function $c(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Hc(e, t, s) {
    return s = s != null ? s.concat([e]) : null, Ei(4, 4, $c.bind(null, t, e), s);
  }
  function La() {
  }
  function Vc(e, t) {
    var s = St();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && Ra(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function Wc(e, t) {
    var s = St();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && Ra(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function qc(e, t, s) {
    return (jn & 21) === 0 ? (e.baseState && (e.baseState = !1, lt = !0), e.memoizedState = s) : (bt(s, t) || (s = xu(), Ne.lanes |= s, Ln |= s, e.baseState = !0), t);
  }
  function zg(e, t) {
    var s = xe;
    xe = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = Ia.transition;
    Ia.transition = {};
    try {
      e(!1), t();
    } finally {
      xe = s, Ia.transition = o;
    }
  }
  function Gc() {
    return St().memoizedState;
  }
  function Dg(e, t, s) {
    var o = wn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, Yc(e)) Qc(t, s);
    else if (s = bc(e, t, s, o), s !== null) {
      var l = rt();
      At(s, e, o, l), Kc(s, t, o);
    }
  }
  function Bg(e, t, s) {
    var o = wn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Yc(e)) Qc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var f = t.lastRenderedState, m = c(f, s);
        if (l.hasEagerState = !0, l.eagerState = m, bt(m, f)) {
          var S = t.interleaved;
          S === null ? (l.next = l, xa(t)) : (l.next = S.next, S.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = bc(e, t, l, o), s !== null && (l = rt(), At(s, e, o, l), Kc(s, t, o));
    }
  }
  function Yc(e) {
    var t = e.alternate;
    return e === Ne || t !== null && t === Ne;
  }
  function Qc(e, t) {
    us = wi = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Kc(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, zo(e, s);
    }
  }
  var ki = { readContext: _t, useCallback: Je, useContext: Je, useEffect: Je, useImperativeHandle: Je, useInsertionEffect: Je, useLayoutEffect: Je, useMemo: Je, useReducer: Je, useRef: Je, useState: Je, useDebugValue: Je, useDeferredValue: Je, useTransition: Je, useMutableSource: Je, useSyncExternalStore: Je, useId: Je, unstable_isNewReconciler: !1 }, Fg = { readContext: _t, useCallback: function(e, t) {
    return $t().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: _t, useEffect: Bc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, xi(
      4194308,
      4,
      $c.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return xi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return xi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = $t();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = $t();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Dg.bind(null, Ne, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = $t();
    return e = { current: e }, t.memoizedState = e;
  }, useState: zc, useDebugValue: La, useDeferredValue: function(e) {
    return $t().memoizedState = e;
  }, useTransition: function() {
    var e = zc(!1), t = e[0];
    return e = zg.bind(null, e[1]), $t().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = Ne, l = $t();
    if (Re) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), He === null) throw Error(i(349));
      (jn & 30) !== 0 || Nc(o, t, s);
    }
    l.memoizedState = s;
    var c = { value: s, getSnapshot: t };
    return l.queue = c, Bc(jc.bind(
      null,
      o,
      c,
      e
    ), [e]), o.flags |= 2048, fs(9, Pc.bind(null, o, c, s, t), void 0, null), s;
  }, useId: function() {
    var e = $t(), t = He.identifierPrefix;
    if (Re) {
      var s = Kt, o = Qt;
      s = (o & ~(1 << 32 - kt(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = cs++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = Og++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Ug = {
    readContext: _t,
    useCallback: Vc,
    useContext: _t,
    useEffect: ja,
    useImperativeHandle: Hc,
    useInsertionEffect: Fc,
    useLayoutEffect: Uc,
    useMemo: Wc,
    useReducer: Na,
    useRef: Dc,
    useState: function() {
      return Na(ds);
    },
    useDebugValue: La,
    useDeferredValue: function(e) {
      var t = St();
      return qc(t, De.memoizedState, e);
    },
    useTransition: function() {
      var e = Na(ds)[0], t = St().memoizedState;
      return [e, t];
    },
    useMutableSource: Ac,
    useSyncExternalStore: Mc,
    useId: Gc,
    unstable_isNewReconciler: !1
  }, $g = { readContext: _t, useCallback: Vc, useContext: _t, useEffect: ja, useImperativeHandle: Hc, useInsertionEffect: Fc, useLayoutEffect: Uc, useMemo: Wc, useReducer: Pa, useRef: Dc, useState: function() {
    return Pa(ds);
  }, useDebugValue: La, useDeferredValue: function(e) {
    var t = St();
    return De === null ? t.memoizedState = e : qc(t, De.memoizedState, e);
  }, useTransition: function() {
    var e = Pa(ds)[0], t = St().memoizedState;
    return [e, t];
  }, useMutableSource: Ac, useSyncExternalStore: Mc, useId: Gc, unstable_isNewReconciler: !1 };
  function Tt(e, t) {
    if (e && e.defaultProps) {
      t = M({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function Oa(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : M({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var bi = { isMounted: function(e) {
    return (e = e._reactInternals) ? Tn(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = rt(), l = wn(e), c = Xt(o, l);
    c.payload = t, s != null && (c.callback = s), t = yn(e, c, l), t !== null && (At(t, e, l, o), yi(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = rt(), l = wn(e), c = Xt(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = yn(e, c, l), t !== null && (At(t, e, l, o), yi(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = rt(), o = wn(e), l = Xt(s, o);
    l.tag = 2, t != null && (l.callback = t), t = yn(e, l, o), t !== null && (At(t, e, o, s), yi(t, e, o));
  } };
  function Jc(e, t, s, o, l, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, f) : t.prototype && t.prototype.isPureReactComponent ? !Xr(s, o) || !Xr(l, c) : !0;
  }
  function Xc(e, t, s) {
    var o = !1, l = pn, c = t.contextType;
    return typeof c == "object" && c !== null ? c = _t(c) : (l = at(t) ? Rn : Ke.current, o = t.contextTypes, c = (o = o != null) ? lr(e, l) : pn), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = bi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Zc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && bi.enqueueReplaceState(t, t.state, null);
  }
  function za(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, Ea(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = _t(c) : (c = at(t) ? Rn : Ke.current, l.context = lr(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Oa(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && bi.enqueueReplaceState(l, l.state, null), vi(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function mr(e, t) {
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
  function Da(e, t, s) {
    return { value: e, source: null, stack: s ?? null, digest: t ?? null };
  }
  function Ba(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var Hg = typeof WeakMap == "function" ? WeakMap : Map;
  function ed(e, t, s) {
    s = Xt(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      Ni || (Ni = !0, el = o), Ba(e, t);
    }, s;
  }
  function td(e, t, s) {
    s = Xt(-1, s), s.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var l = t.value;
      s.payload = function() {
        return o(l);
      }, s.callback = function() {
        Ba(e, t);
      };
    }
    var c = e.stateNode;
    return c !== null && typeof c.componentDidCatch == "function" && (s.callback = function() {
      Ba(e, t), typeof o != "function" && (_n === null ? _n = /* @__PURE__ */ new Set([this]) : _n.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), s;
  }
  function nd(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Hg();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = rm.bind(null, e, t, s), t.then(e, e));
  }
  function rd(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function sd(e, t, s, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = Xt(-1, 1), t.tag = 2, yn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var Vg = le.ReactCurrentOwner, lt = !1;
  function nt(e, t, s, o) {
    t.child = e === null ? kc(t, null, s, o) : fr(t, e.child, s, o);
  }
  function id(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return pr(t, l), o = Aa(e, t, s, o, c, l), s = Ma(), e !== null && !lt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Zt(e, t, l)) : (Re && s && ha(t), t.flags |= 1, nt(e, t, o, l), t.child);
  }
  function od(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !al(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, ad(e, t, c, o, l)) : (e = Di(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var f = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Xr, s(f, o) && e.ref === t.ref) return Zt(e, t, l);
    }
    return t.flags |= 1, e = En(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function ad(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Xr(c, o) && e.ref === t.ref) if (lt = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (lt = !0);
      else return t.lanes = e.lanes, Zt(e, t, l);
    }
    return Fa(e, t, s, o, l);
  }
  function ld(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ee(vr, gt), gt |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ee(vr, gt), gt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, Ee(vr, gt), gt |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, Ee(vr, gt), gt |= o;
    return nt(e, t, l, s), t.child;
  }
  function ud(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Fa(e, t, s, o, l) {
    var c = at(s) ? Rn : Ke.current;
    return c = lr(t, c), pr(t, l), s = Aa(e, t, s, o, c, l), o = Ma(), e !== null && !lt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Zt(e, t, l)) : (Re && o && ha(t), t.flags |= 1, nt(e, t, s, l), t.child);
  }
  function cd(e, t, s, o, l) {
    if (at(s)) {
      var c = !0;
      ui(t);
    } else c = !1;
    if (pr(t, l), t.stateNode === null) Ti(e, t), Xc(t, s, o), za(t, s, o, l), o = !0;
    else if (e === null) {
      var f = t.stateNode, m = t.memoizedProps;
      f.props = m;
      var S = f.context, R = s.contextType;
      typeof R == "object" && R !== null ? R = _t(R) : (R = at(s) ? Rn : Ke.current, R = lr(t, R));
      var L = s.getDerivedStateFromProps, O = typeof L == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      O || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (m !== o || S !== R) && Zc(t, f, o, R), mn = !1;
      var j = t.memoizedState;
      f.state = j, vi(t, o, f, l), S = t.memoizedState, m !== o || j !== S || ot.current || mn ? (typeof L == "function" && (Oa(t, s, L, o), S = t.memoizedState), (m = mn || Jc(t, s, m, o, j, S, R)) ? (O || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = S), f.props = o, f.state = S, f.context = R, o = m) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, Cc(e, t), m = t.memoizedProps, R = t.type === t.elementType ? m : Tt(t.type, m), f.props = R, O = t.pendingProps, j = f.context, S = s.contextType, typeof S == "object" && S !== null ? S = _t(S) : (S = at(s) ? Rn : Ke.current, S = lr(t, S));
      var V = s.getDerivedStateFromProps;
      (L = typeof V == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (m !== O || j !== S) && Zc(t, f, o, S), mn = !1, j = t.memoizedState, f.state = j, vi(t, o, f, l);
      var G = t.memoizedState;
      m !== O || j !== G || ot.current || mn ? (typeof V == "function" && (Oa(t, s, V, o), G = t.memoizedState), (R = mn || Jc(t, s, R, o, j, G, S) || !1) ? (L || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, G, S), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, G, S)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || m === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = G), f.props = o, f.state = G, f.context = S, o = R) : (typeof f.componentDidUpdate != "function" || m === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Ua(e, t, s, o, c, l);
  }
  function Ua(e, t, s, o, l, c) {
    ud(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return l && gc(t, s, !1), Zt(e, t, c);
    o = t.stateNode, Vg.current = t;
    var m = f && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = fr(t, e.child, null, c), t.child = fr(t, null, m, c)) : nt(e, t, m, c), t.memoizedState = o.state, l && gc(t, s, !0), t.child;
  }
  function dd(e) {
    var t = e.stateNode;
    t.pendingContext ? hc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && hc(e, t.context, !1), ka(e, t.containerInfo);
  }
  function fd(e, t, s, o, l) {
    return dr(), ya(l), t.flags |= 256, nt(e, t, s, o), t.child;
  }
  var $a = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ha(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function hd(e, t, s) {
    var o = t.pendingProps, l = Me.current, c = !1, f = (t.flags & 128) !== 0, m;
    if ((m = f) || (m = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), m ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ee(Me, l & 1), e === null)
      return ma(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = f) : c = Bi(f, o, 0, null), e = Bn(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = Ha(s), t.memoizedState = $a, e) : Va(t, f));
    if (l = e.memoizedState, l !== null && (m = l.dehydrated, m !== null)) return Wg(e, t, f, o, m, l, s);
    if (c) {
      c = o.fallback, f = t.mode, l = e.child, m = l.sibling;
      var S = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = S, t.deletions = null) : (o = En(l, S), o.subtreeFlags = l.subtreeFlags & 14680064), m !== null ? c = En(m, c) : (c = Bn(c, f, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, f = e.child.memoizedState, f = f === null ? Ha(s) : { baseLanes: f.baseLanes | s, cachePool: null, transitions: f.transitions }, c.memoizedState = f, c.childLanes = e.childLanes & ~s, t.memoizedState = $a, o;
    }
    return c = e.child, e = c.sibling, o = En(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Va(e, t) {
    return t = Bi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Ci(e, t, s, o) {
    return o !== null && ya(o), fr(t, e.child, null, s), e = Va(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Wg(e, t, s, o, l, c, f) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = Da(Error(i(422))), Ci(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Bi({ mode: "visible", children: o.children }, l, 0, null), c = Bn(c, l, f, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && fr(t, e.child, null, f), t.child.memoizedState = Ha(f), t.memoizedState = $a, c);
    if ((t.mode & 1) === 0) return Ci(e, t, f, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var m = o.dgst;
      return o = m, c = Error(i(419)), o = Da(c, o, void 0), Ci(e, t, f, o);
    }
    if (m = (f & e.childLanes) !== 0, lt || m) {
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
        l = (l & (o.suspendedLanes | f)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Jt(e, l), At(o, e, l, -1));
      }
      return ol(), o = Da(Error(i(421))), Ci(e, t, f, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = sm.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, pt = fn(l.nextSibling), ht = t, Re = !0, Ct = null, e !== null && (yt[vt++] = Qt, yt[vt++] = Kt, yt[vt++] = An, Qt = e.id, Kt = e.overflow, An = t), t = Va(t, o.children), t.flags |= 4096, t);
  }
  function pd(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), wa(e.return, t, s);
  }
  function Wa(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function gd(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (nt(e, t, o.children, s), o = Me.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && pd(e, s, t);
        else if (e.tag === 19) pd(e, s, t);
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
    if (Ee(Me, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (s = t.child, l = null; s !== null; ) e = s.alternate, e !== null && _i(e) === null && (l = s), s = s.sibling;
        s = l, s === null ? (l = t.child, t.child = null) : (l = s.sibling, s.sibling = null), Wa(t, !1, l, s, c);
        break;
      case "backwards":
        for (s = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && _i(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = s, s = l, l = e;
        }
        Wa(t, !0, s, null, c);
        break;
      case "together":
        Wa(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Ti(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Zt(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), Ln |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = En(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = En(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function qg(e, t, s) {
    switch (t.tag) {
      case 3:
        dd(t), dr();
        break;
      case 5:
        Rc(t);
        break;
      case 1:
        at(t.type) && ui(t);
        break;
      case 4:
        ka(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        Ee(gi, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (Ee(Me, Me.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? hd(e, t, s) : (Ee(Me, Me.current & 1), e = Zt(e, t, s), e !== null ? e.sibling : null);
        Ee(Me, Me.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return gd(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Ee(Me, Me.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, ld(e, t, s);
    }
    return Zt(e, t, s);
  }
  var md, qa, yd, vd;
  md = function(e, t) {
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
  }, qa = function() {
  }, yd = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, Pn(Ut.current);
      var c = null;
      switch (s) {
        case "input":
          l = Nr(e, l), o = Nr(e, o), c = [];
          break;
        case "select":
          l = M({}, l, { value: void 0 }), o = M({}, o, { value: void 0 }), c = [];
          break;
        case "textarea":
          l = zt(e, l), o = zt(e, o), c = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = oi);
      }
      Co(s, o);
      var f;
      s = null;
      for (R in l) if (!o.hasOwnProperty(R) && l.hasOwnProperty(R) && l[R] != null) if (R === "style") {
        var m = l[R];
        for (f in m) m.hasOwnProperty(f) && (s || (s = {}), s[f] = "");
      } else R !== "dangerouslySetInnerHTML" && R !== "children" && R !== "suppressContentEditableWarning" && R !== "suppressHydrationWarning" && R !== "autoFocus" && (u.hasOwnProperty(R) ? c || (c = []) : (c = c || []).push(R, null));
      for (R in o) {
        var S = o[R];
        if (m = l?.[R], o.hasOwnProperty(R) && S !== m && (S != null || m != null)) if (R === "style") if (m) {
          for (f in m) !m.hasOwnProperty(f) || S && S.hasOwnProperty(f) || (s || (s = {}), s[f] = "");
          for (f in S) S.hasOwnProperty(f) && m[f] !== S[f] && (s || (s = {}), s[f] = S[f]);
        } else s || (c || (c = []), c.push(
          R,
          s
        )), s = S;
        else R === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, m = m ? m.__html : void 0, S != null && m !== S && (c = c || []).push(R, S)) : R === "children" ? typeof S != "string" && typeof S != "number" || (c = c || []).push(R, "" + S) : R !== "suppressContentEditableWarning" && R !== "suppressHydrationWarning" && (u.hasOwnProperty(R) ? (S != null && R === "onScroll" && be("scroll", e), c || m === S || (c = [])) : (c = c || []).push(R, S));
      }
      s && (c = c || []).push("style", s);
      var R = c;
      (t.updateQueue = R) && (t.flags |= 4);
    }
  }, vd = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function hs(e, t) {
    if (!Re) switch (e.tailMode) {
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
  function Xe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = s, t;
  }
  function Gg(e, t, s) {
    var o = t.pendingProps;
    switch (pa(t), t.tag) {
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
        return Xe(t), null;
      case 1:
        return at(t.type) && li(), Xe(t), null;
      case 3:
        return o = t.stateNode, gr(), Ce(ot), Ce(Ke), Ta(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (hi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ct !== null && (rl(Ct), Ct = null))), qa(e, t), Xe(t), null;
      case 5:
        ba(t);
        var l = Pn(ls.current);
        if (s = t.type, e !== null && t.stateNode != null) yd(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return Xe(t), null;
          }
          if (e = Pn(Ut.current), hi(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[Ft] = t, o[rs] = c, e = (t.mode & 1) !== 0, s) {
              case "dialog":
                be("cancel", o), be("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                be("load", o);
                break;
              case "video":
              case "audio":
                for (l = 0; l < es.length; l++) be(es[l], o);
                break;
              case "source":
                be("error", o);
                break;
              case "img":
              case "image":
              case "link":
                be(
                  "error",
                  o
                ), be("load", o);
                break;
              case "details":
                be("toggle", o);
                break;
              case "input":
                Ds(o, c), be("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, be("invalid", o);
                break;
              case "textarea":
                Qe(o, c), be("invalid", o);
            }
            Co(s, c), l = null;
            for (var f in c) if (c.hasOwnProperty(f)) {
              var m = c[f];
              f === "children" ? typeof m == "string" ? o.textContent !== m && (c.suppressHydrationWarning !== !0 && ii(o.textContent, m, e), l = ["children", m]) : typeof m == "number" && o.textContent !== "" + m && (c.suppressHydrationWarning !== !0 && ii(
                o.textContent,
                m,
                e
              ), l = ["children", "" + m]) : u.hasOwnProperty(f) && m != null && f === "onScroll" && be("scroll", o);
            }
            switch (s) {
              case "input":
                bn(o), Ae(o, c, !0);
                break;
              case "textarea":
                bn(o), Cn(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = oi);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            f = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Qn(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(s, { is: o.is }) : (e = f.createElement(s), s === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, s), e[Ft] = t, e[rs] = o, md(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = To(s, o), s) {
                case "dialog":
                  be("cancel", e), be("close", e), l = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  be("load", e), l = o;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < es.length; l++) be(es[l], e);
                  l = o;
                  break;
                case "source":
                  be("error", e), l = o;
                  break;
                case "img":
                case "image":
                case "link":
                  be(
                    "error",
                    e
                  ), be("load", e), l = o;
                  break;
                case "details":
                  be("toggle", e), l = o;
                  break;
                case "input":
                  Ds(e, o), l = Nr(e, o), be("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = M({}, o, { value: void 0 }), be("invalid", e);
                  break;
                case "textarea":
                  Qe(e, o), l = zt(e, o), be("invalid", e);
                  break;
                default:
                  l = o;
              }
              Co(s, l), m = l;
              for (c in m) if (m.hasOwnProperty(c)) {
                var S = m[c];
                c === "style" ? au(e, S) : c === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, S != null && iu(e, S)) : c === "children" ? typeof S == "string" ? (s !== "textarea" || S !== "") && Lr(e, S) : typeof S == "number" && Lr(e, "" + S) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? S != null && c === "onScroll" && be("scroll", e) : S != null && X(e, c, S, f));
              }
              switch (s) {
                case "input":
                  bn(e), Ae(e, o, !1);
                  break;
                case "textarea":
                  bn(e), Cn(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + _e(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, c = o.value, c != null ? tt(e, !!o.multiple, c, !1) : o.defaultValue != null && tt(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = oi);
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
        return Xe(t), null;
      case 6:
        if (e && t.stateNode != null) vd(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = Pn(ls.current), Pn(Ut.current), hi(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[Ft] = t, (c = o.nodeValue !== s) && (e = ht, e !== null)) switch (e.tag) {
              case 3:
                ii(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && ii(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[Ft] = t, t.stateNode = o;
        }
        return Xe(t), null;
      case 13:
        if (Ce(Me), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Re && pt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) wc(), dr(), t.flags |= 98560, c = !1;
          else if (c = hi(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[Ft] = t;
            } else dr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Xe(t), c = !1;
          } else Ct !== null && (rl(Ct), Ct = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Me.current & 1) !== 0 ? Be === 0 && (Be = 3) : ol())), t.updateQueue !== null && (t.flags |= 4), Xe(t), null);
      case 4:
        return gr(), qa(e, t), e === null && ts(t.stateNode.containerInfo), Xe(t), null;
      case 10:
        return Sa(t.type._context), Xe(t), null;
      case 17:
        return at(t.type) && li(), Xe(t), null;
      case 19:
        if (Ce(Me), c = t.memoizedState, c === null) return Xe(t), null;
        if (o = (t.flags & 128) !== 0, f = c.rendering, f === null) if (o) hs(c, !1);
        else {
          if (Be !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = _i(e), f !== null) {
              for (t.flags |= 128, hs(c, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, f = c.alternate, f === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f.childLanes, c.lanes = f.lanes, c.child = f.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f.memoizedProps, c.memoizedState = f.memoizedState, c.updateQueue = f.updateQueue, c.type = f.type, e = f.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return Ee(Me, Me.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && Le() > _r && (t.flags |= 128, o = !0, hs(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = _i(f), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), hs(c, !0), c.tail === null && c.tailMode === "hidden" && !f.alternate && !Re) return Xe(t), null;
          } else 2 * Le() - c.renderingStartTime > _r && s !== 1073741824 && (t.flags |= 128, o = !0, hs(c, !1), t.lanes = 4194304);
          c.isBackwards ? (f.sibling = t.child, t.child = f) : (s = c.last, s !== null ? s.sibling = f : t.child = f, c.last = f);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = Le(), t.sibling = null, s = Me.current, Ee(Me, o ? s & 1 | 2 : s & 1), t) : (Xe(t), null);
      case 22:
      case 23:
        return il(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (gt & 1073741824) !== 0 && (Xe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Xe(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Yg(e, t) {
    switch (pa(t), t.tag) {
      case 1:
        return at(t.type) && li(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return gr(), Ce(ot), Ce(Ke), Ta(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ba(t), null;
      case 13:
        if (Ce(Me), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          dr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ce(Me), null;
      case 4:
        return gr(), null;
      case 10:
        return Sa(t.type._context), null;
      case 22:
      case 23:
        return il(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ii = !1, Ze = !1, Qg = typeof WeakSet == "function" ? WeakSet : Set, q = null;
  function yr(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      je(e, t, o);
    }
    else s.current = null;
  }
  function Ga(e, t, s) {
    try {
      s();
    } catch (o) {
      je(e, t, o);
    }
  }
  var _d = !1;
  function Kg(e, t) {
    if (ia = Ys, e = Ju(), Jo(e)) {
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
          var f = 0, m = -1, S = -1, R = 0, L = 0, O = e, j = null;
          t: for (; ; ) {
            for (var V; O !== s || l !== 0 && O.nodeType !== 3 || (m = f + l), O !== c || o !== 0 && O.nodeType !== 3 || (S = f + o), O.nodeType === 3 && (f += O.nodeValue.length), (V = O.firstChild) !== null; )
              j = O, O = V;
            for (; ; ) {
              if (O === e) break t;
              if (j === s && ++R === l && (m = f), j === c && ++L === o && (S = f), (V = O.nextSibling) !== null) break;
              O = j, j = O.parentNode;
            }
            O = V;
          }
          s = m === -1 || S === -1 ? null : { start: m, end: S };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (oa = { focusedElem: e, selectionRange: s }, Ys = !1, q = t; q !== null; ) if (t = q, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, q = e;
    else for (; q !== null; ) {
      t = q;
      try {
        var G = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (G !== null) {
              var Y = G.memoizedProps, Oe = G.memoizedState, C = t.stateNode, k = C.getSnapshotBeforeUpdate(t.elementType === t.type ? Y : Tt(t.type, Y), Oe);
              C.__reactInternalSnapshotBeforeUpdate = k;
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
        je(t, t.return, z);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, q = e;
        break;
      }
      q = t.return;
    }
    return G = _d, _d = !1, G;
  }
  function ps(e, t, s) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy;
          l.destroy = void 0, c !== void 0 && Ga(t, s, c);
        }
        l = l.next;
      } while (l !== o);
    }
  }
  function Ri(e, t) {
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
  function Ya(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Sd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Sd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ft], delete t[rs], delete t[ca], delete t[Ng], delete t[Pg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function wd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function xd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || wd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Qa(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = oi));
    else if (o !== 4 && (e = e.child, e !== null)) for (Qa(e, t, s), e = e.sibling; e !== null; ) Qa(e, t, s), e = e.sibling;
  }
  function Ka(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Ka(e, t, s), e = e.sibling; e !== null; ) Ka(e, t, s), e = e.sibling;
  }
  var We = null, It = !1;
  function vn(e, t, s) {
    for (s = s.child; s !== null; ) Ed(e, t, s), s = s.sibling;
  }
  function Ed(e, t, s) {
    if (Bt && typeof Bt.onCommitFiberUnmount == "function") try {
      Bt.onCommitFiberUnmount($s, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        Ze || yr(s, t);
      case 6:
        var o = We, l = It;
        We = null, vn(e, t, s), We = o, It = l, We !== null && (It ? (e = We, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : We.removeChild(s.stateNode));
        break;
      case 18:
        We !== null && (It ? (e = We, s = s.stateNode, e.nodeType === 8 ? ua(e.parentNode, s) : e.nodeType === 1 && ua(e, s), qr(e)) : ua(We, s.stateNode));
        break;
      case 4:
        o = We, l = It, We = s.stateNode.containerInfo, It = !0, vn(e, t, s), We = o, It = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ze && (o = s.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var c = l, f = c.destroy;
            c = c.tag, f !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && Ga(s, t, f), l = l.next;
          } while (l !== o);
        }
        vn(e, t, s);
        break;
      case 1:
        if (!Ze && (yr(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = s.memoizedProps, o.state = s.memoizedState, o.componentWillUnmount();
        } catch (m) {
          je(s, t, m);
        }
        vn(e, t, s);
        break;
      case 21:
        vn(e, t, s);
        break;
      case 22:
        s.mode & 1 ? (Ze = (o = Ze) || s.memoizedState !== null, vn(e, t, s), Ze = o) : vn(e, t, s);
        break;
      default:
        vn(e, t, s);
    }
  }
  function kd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Qg()), t.forEach(function(o) {
        var l = im.bind(null, e, o);
        s.has(o) || (s.add(o), o.then(l, l));
      });
    }
  }
  function Rt(e, t) {
    var s = t.deletions;
    if (s !== null) for (var o = 0; o < s.length; o++) {
      var l = s[o];
      try {
        var c = e, f = t, m = f;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 5:
              We = m.stateNode, It = !1;
              break e;
            case 3:
              We = m.stateNode.containerInfo, It = !0;
              break e;
            case 4:
              We = m.stateNode.containerInfo, It = !0;
              break e;
          }
          m = m.return;
        }
        if (We === null) throw Error(i(160));
        Ed(c, f, l), We = null, It = !1;
        var S = l.alternate;
        S !== null && (S.return = null), l.return = null;
      } catch (R) {
        je(l, t, R);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) bd(t, e), t = t.sibling;
  }
  function bd(e, t) {
    var s = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Rt(t, e), Ht(e), o & 4) {
          try {
            ps(3, e, e.return), Ri(3, e);
          } catch (Y) {
            je(e, e.return, Y);
          }
          try {
            ps(5, e, e.return);
          } catch (Y) {
            je(e, e.return, Y);
          }
        }
        break;
      case 1:
        Rt(t, e), Ht(e), o & 512 && s !== null && yr(s, s.return);
        break;
      case 5:
        if (Rt(t, e), Ht(e), o & 512 && s !== null && yr(s, s.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Lr(l, "");
          } catch (Y) {
            je(e, e.return, Y);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, f = s !== null ? s.memoizedProps : c, m = e.type, S = e.updateQueue;
          if (e.updateQueue = null, S !== null) try {
            m === "input" && c.type === "radio" && c.name != null && Pr(l, c), To(m, f);
            var R = To(m, c);
            for (f = 0; f < S.length; f += 2) {
              var L = S[f], O = S[f + 1];
              L === "style" ? au(l, O) : L === "dangerouslySetInnerHTML" ? iu(l, O) : L === "children" ? Lr(l, O) : X(l, L, O, R);
            }
            switch (m) {
              case "input":
                mt(l, c);
                break;
              case "textarea":
                Dt(l, c);
                break;
              case "select":
                var j = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var V = c.value;
                V != null ? tt(l, !!c.multiple, V, !1) : j !== !!c.multiple && (c.defaultValue != null ? tt(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : tt(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[rs] = c;
          } catch (Y) {
            je(e, e.return, Y);
          }
        }
        break;
      case 6:
        if (Rt(t, e), Ht(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (Y) {
            je(e, e.return, Y);
          }
        }
        break;
      case 3:
        if (Rt(t, e), Ht(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          qr(t.containerInfo);
        } catch (Y) {
          je(e, e.return, Y);
        }
        break;
      case 4:
        Rt(t, e), Ht(e);
        break;
      case 13:
        Rt(t, e), Ht(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Za = Le())), o & 4 && kd(e);
        break;
      case 22:
        if (L = s !== null && s.memoizedState !== null, e.mode & 1 ? (Ze = (R = Ze) || L, Rt(t, e), Ze = R) : Rt(t, e), Ht(e), o & 8192) {
          if (R = e.memoizedState !== null, (e.stateNode.isHidden = R) && !L && (e.mode & 1) !== 0) for (q = e, L = e.child; L !== null; ) {
            for (O = q = L; q !== null; ) {
              switch (j = q, V = j.child, j.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ps(4, j, j.return);
                  break;
                case 1:
                  yr(j, j.return);
                  var G = j.stateNode;
                  if (typeof G.componentWillUnmount == "function") {
                    o = j, s = j.return;
                    try {
                      t = o, G.props = t.memoizedProps, G.state = t.memoizedState, G.componentWillUnmount();
                    } catch (Y) {
                      je(o, s, Y);
                    }
                  }
                  break;
                case 5:
                  yr(j, j.return);
                  break;
                case 22:
                  if (j.memoizedState !== null) {
                    Id(O);
                    continue;
                  }
              }
              V !== null ? (V.return = j, q = V) : Id(O);
            }
            L = L.sibling;
          }
          e: for (L = null, O = e; ; ) {
            if (O.tag === 5) {
              if (L === null) {
                L = O;
                try {
                  l = O.stateNode, R ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (m = O.stateNode, S = O.memoizedProps.style, f = S != null && S.hasOwnProperty("display") ? S.display : null, m.style.display = ou("display", f));
                } catch (Y) {
                  je(e, e.return, Y);
                }
              }
            } else if (O.tag === 6) {
              if (L === null) try {
                O.stateNode.nodeValue = R ? "" : O.memoizedProps;
              } catch (Y) {
                je(e, e.return, Y);
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
        Rt(t, e), Ht(e), o & 4 && kd(e);
        break;
      case 21:
        break;
      default:
        Rt(
          t,
          e
        ), Ht(e);
    }
  }
  function Ht(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var s = e.return; s !== null; ) {
            if (wd(s)) {
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
            o.flags & 32 && (Lr(l, ""), o.flags &= -33);
            var c = xd(e);
            Ka(e, c, l);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, m = xd(e);
            Qa(e, m, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (S) {
        je(e, e.return, S);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Jg(e, t, s) {
    q = e, Cd(e);
  }
  function Cd(e, t, s) {
    for (var o = (e.mode & 1) !== 0; q !== null; ) {
      var l = q, c = l.child;
      if (l.tag === 22 && o) {
        var f = l.memoizedState !== null || Ii;
        if (!f) {
          var m = l.alternate, S = m !== null && m.memoizedState !== null || Ze;
          m = Ii;
          var R = Ze;
          if (Ii = f, (Ze = S) && !R) for (q = l; q !== null; ) f = q, S = f.child, f.tag === 22 && f.memoizedState !== null ? Rd(l) : S !== null ? (S.return = f, q = S) : Rd(l);
          for (; c !== null; ) q = c, Cd(c), c = c.sibling;
          q = l, Ii = m, Ze = R;
        }
        Td(e);
      } else (l.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = l, q = c) : Td(e);
    }
  }
  function Td(e) {
    for (; q !== null; ) {
      var t = q;
      if ((t.flags & 8772) !== 0) {
        var s = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ze || Ri(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !Ze) if (s === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? s.memoizedProps : Tt(t.type, s.memoizedProps);
                o.componentDidUpdate(l, s.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var c = t.updateQueue;
              c !== null && Ic(t, c, o);
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
                Ic(t, f, s);
              }
              break;
            case 5:
              var m = t.stateNode;
              if (s === null && t.flags & 4) {
                s = m;
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
                var R = t.alternate;
                if (R !== null) {
                  var L = R.memoizedState;
                  if (L !== null) {
                    var O = L.dehydrated;
                    O !== null && qr(O);
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
          Ze || t.flags & 512 && Ya(t);
        } catch (j) {
          je(t, t.return, j);
        }
      }
      if (t === e) {
        q = null;
        break;
      }
      if (s = t.sibling, s !== null) {
        s.return = t.return, q = s;
        break;
      }
      q = t.return;
    }
  }
  function Id(e) {
    for (; q !== null; ) {
      var t = q;
      if (t === e) {
        q = null;
        break;
      }
      var s = t.sibling;
      if (s !== null) {
        s.return = t.return, q = s;
        break;
      }
      q = t.return;
    }
  }
  function Rd(e) {
    for (; q !== null; ) {
      var t = q;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              Ri(4, t);
            } catch (S) {
              je(t, s, S);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (S) {
                je(t, l, S);
              }
            }
            var c = t.return;
            try {
              Ya(t);
            } catch (S) {
              je(t, c, S);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Ya(t);
            } catch (S) {
              je(t, f, S);
            }
        }
      } catch (S) {
        je(t, t.return, S);
      }
      if (t === e) {
        q = null;
        break;
      }
      var m = t.sibling;
      if (m !== null) {
        m.return = t.return, q = m;
        break;
      }
      q = t.return;
    }
  }
  var Xg = Math.ceil, Ai = le.ReactCurrentDispatcher, Ja = le.ReactCurrentOwner, wt = le.ReactCurrentBatchConfig, ye = 0, He = null, ze = null, qe = 0, gt = 0, vr = hn(0), Be = 0, gs = null, Ln = 0, Mi = 0, Xa = 0, ms = null, ut = null, Za = 0, _r = 1 / 0, en = null, Ni = !1, el = null, _n = null, Pi = !1, Sn = null, ji = 0, ys = 0, tl = null, Li = -1, Oi = 0;
  function rt() {
    return (ye & 6) !== 0 ? Le() : Li !== -1 ? Li : Li = Le();
  }
  function wn(e) {
    return (e.mode & 1) === 0 ? 1 : (ye & 2) !== 0 && qe !== 0 ? qe & -qe : Lg.transition !== null ? (Oi === 0 && (Oi = xu()), Oi) : (e = xe, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Mu(e.type)), e);
  }
  function At(e, t, s, o) {
    if (50 < ys) throw ys = 0, tl = null, Error(i(185));
    Ur(e, s, o), ((ye & 2) === 0 || e !== He) && (e === He && ((ye & 2) === 0 && (Mi |= s), Be === 4 && xn(e, qe)), ct(e, o), s === 1 && ye === 0 && (t.mode & 1) === 0 && (_r = Le() + 500, ci && gn()));
  }
  function ct(e, t) {
    var s = e.callbackNode;
    Lp(e, t);
    var o = Ws(e, e === He ? qe : 0);
    if (o === 0) s !== null && _u(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && _u(s), t === 1) e.tag === 0 ? jg(Md.bind(null, e)) : mc(Md.bind(null, e)), Ag(function() {
        (ye & 6) === 0 && gn();
      }), s = null;
      else {
        switch (Eu(o)) {
          case 1:
            s = jo;
            break;
          case 4:
            s = Su;
            break;
          case 16:
            s = Us;
            break;
          case 536870912:
            s = wu;
            break;
          default:
            s = Us;
        }
        s = Bd(s, Ad.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function Ad(e, t) {
    if (Li = -1, Oi = 0, (ye & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (Sr() && e.callbackNode !== s) return null;
    var o = Ws(e, e === He ? qe : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = zi(e, o);
    else {
      t = o;
      var l = ye;
      ye |= 2;
      var c = Pd();
      (He !== e || qe !== t) && (en = null, _r = Le() + 500, zn(e, t));
      do
        try {
          tm();
          break;
        } catch (m) {
          Nd(e, m);
        }
      while (!0);
      _a(), Ai.current = c, ye = l, ze !== null ? t = 0 : (He = null, qe = 0, t = Be);
    }
    if (t !== 0) {
      if (t === 2 && (l = Lo(e), l !== 0 && (o = l, t = nl(e, l))), t === 1) throw s = gs, zn(e, 0), xn(e, o), ct(e, Le()), s;
      if (t === 6) xn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !Zg(l) && (t = zi(e, o), t === 2 && (c = Lo(e), c !== 0 && (o = c, t = nl(e, c))), t === 1)) throw s = gs, zn(e, 0), xn(e, o), ct(e, Le()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            Dn(e, ut, en);
            break;
          case 3:
            if (xn(e, o), (o & 130023424) === o && (t = Za + 500 - Le(), 10 < t)) {
              if (Ws(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                rt(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = la(Dn.bind(null, e, ut, en), t);
              break;
            }
            Dn(e, ut, en);
            break;
          case 4:
            if (xn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var f = 31 - kt(o);
              c = 1 << f, f = t[f], f > l && (l = f), o &= ~c;
            }
            if (o = l, o = Le() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Xg(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = la(Dn.bind(null, e, ut, en), o);
              break;
            }
            Dn(e, ut, en);
            break;
          case 5:
            Dn(e, ut, en);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return ct(e, Le()), e.callbackNode === s ? Ad.bind(null, e) : null;
  }
  function nl(e, t) {
    var s = ms;
    return e.current.memoizedState.isDehydrated && (zn(e, t).flags |= 256), e = zi(e, t), e !== 2 && (t = ut, ut = s, t !== null && rl(t)), e;
  }
  function rl(e) {
    ut === null ? ut = e : ut.push.apply(ut, e);
  }
  function Zg(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var s = t.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var o = 0; o < s.length; o++) {
          var l = s[o], c = l.getSnapshot;
          l = l.value;
          try {
            if (!bt(c(), l)) return !1;
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
  function xn(e, t) {
    for (t &= ~Xa, t &= ~Mi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var s = 31 - kt(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function Md(e) {
    if ((ye & 6) !== 0) throw Error(i(327));
    Sr();
    var t = Ws(e, 0);
    if ((t & 1) === 0) return ct(e, Le()), null;
    var s = zi(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = Lo(e);
      o !== 0 && (t = o, s = nl(e, o));
    }
    if (s === 1) throw s = gs, zn(e, 0), xn(e, t), ct(e, Le()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Dn(e, ut, en), ct(e, Le()), null;
  }
  function sl(e, t) {
    var s = ye;
    ye |= 1;
    try {
      return e(t);
    } finally {
      ye = s, ye === 0 && (_r = Le() + 500, ci && gn());
    }
  }
  function On(e) {
    Sn !== null && Sn.tag === 0 && (ye & 6) === 0 && Sr();
    var t = ye;
    ye |= 1;
    var s = wt.transition, o = xe;
    try {
      if (wt.transition = null, xe = 1, e) return e();
    } finally {
      xe = o, wt.transition = s, ye = t, (ye & 6) === 0 && gn();
    }
  }
  function il() {
    gt = vr.current, Ce(vr);
  }
  function zn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, Rg(s)), ze !== null) for (s = ze.return; s !== null; ) {
      var o = s;
      switch (pa(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && li();
          break;
        case 3:
          gr(), Ce(ot), Ce(Ke), Ta();
          break;
        case 5:
          ba(o);
          break;
        case 4:
          gr();
          break;
        case 13:
          Ce(Me);
          break;
        case 19:
          Ce(Me);
          break;
        case 10:
          Sa(o.type._context);
          break;
        case 22:
        case 23:
          il();
      }
      s = s.return;
    }
    if (He = e, ze = e = En(e.current, null), qe = gt = t, Be = 0, gs = null, Xa = Mi = Ln = 0, ut = ms = null, Nn !== null) {
      for (t = 0; t < Nn.length; t++) if (s = Nn[t], o = s.interleaved, o !== null) {
        s.interleaved = null;
        var l = o.next, c = s.pending;
        if (c !== null) {
          var f = c.next;
          c.next = l, o.next = f;
        }
        s.pending = o;
      }
      Nn = null;
    }
    return e;
  }
  function Nd(e, t) {
    do {
      var s = ze;
      try {
        if (_a(), Si.current = ki, wi) {
          for (var o = Ne.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          wi = !1;
        }
        if (jn = 0, $e = De = Ne = null, us = !1, cs = 0, Ja.current = null, s === null || s.return === null) {
          Be = 1, gs = t, ze = null;
          break;
        }
        e: {
          var c = e, f = s.return, m = s, S = t;
          if (t = qe, m.flags |= 32768, S !== null && typeof S == "object" && typeof S.then == "function") {
            var R = S, L = m, O = L.tag;
            if ((L.mode & 1) === 0 && (O === 0 || O === 11 || O === 15)) {
              var j = L.alternate;
              j ? (L.updateQueue = j.updateQueue, L.memoizedState = j.memoizedState, L.lanes = j.lanes) : (L.updateQueue = null, L.memoizedState = null);
            }
            var V = rd(f);
            if (V !== null) {
              V.flags &= -257, sd(V, f, m, c, t), V.mode & 1 && nd(c, R, t), t = V, S = R;
              var G = t.updateQueue;
              if (G === null) {
                var Y = /* @__PURE__ */ new Set();
                Y.add(S), t.updateQueue = Y;
              } else G.add(S);
              break e;
            } else {
              if ((t & 1) === 0) {
                nd(c, R, t), ol();
                break e;
              }
              S = Error(i(426));
            }
          } else if (Re && m.mode & 1) {
            var Oe = rd(f);
            if (Oe !== null) {
              (Oe.flags & 65536) === 0 && (Oe.flags |= 256), sd(Oe, f, m, c, t), ya(mr(S, m));
              break e;
            }
          }
          c = S = mr(S, m), Be !== 4 && (Be = 2), ms === null ? ms = [c] : ms.push(c), c = f;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var C = ed(c, S, t);
                Tc(c, C);
                break e;
              case 1:
                m = S;
                var k = c.type, T = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof k.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (_n === null || !_n.has(T)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var z = td(c, m, t);
                  Tc(c, z);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        Ld(s);
      } catch (Q) {
        t = Q, ze === s && s !== null && (ze = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Pd() {
    var e = Ai.current;
    return Ai.current = ki, e === null ? ki : e;
  }
  function ol() {
    (Be === 0 || Be === 3 || Be === 2) && (Be = 4), He === null || (Ln & 268435455) === 0 && (Mi & 268435455) === 0 || xn(He, qe);
  }
  function zi(e, t) {
    var s = ye;
    ye |= 2;
    var o = Pd();
    (He !== e || qe !== t) && (en = null, zn(e, t));
    do
      try {
        em();
        break;
      } catch (l) {
        Nd(e, l);
      }
    while (!0);
    if (_a(), ye = s, Ai.current = o, ze !== null) throw Error(i(261));
    return He = null, qe = 0, Be;
  }
  function em() {
    for (; ze !== null; ) jd(ze);
  }
  function tm() {
    for (; ze !== null && !Cp(); ) jd(ze);
  }
  function jd(e) {
    var t = Dd(e.alternate, e, gt);
    e.memoizedProps = e.pendingProps, t === null ? Ld(e) : ze = t, Ja.current = null;
  }
  function Ld(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = Gg(s, t, gt), s !== null) {
          ze = s;
          return;
        }
      } else {
        if (s = Yg(s, t), s !== null) {
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
  function Dn(e, t, s) {
    var o = xe, l = wt.transition;
    try {
      wt.transition = null, xe = 1, nm(e, t, s, o);
    } finally {
      wt.transition = l, xe = o;
    }
    return null;
  }
  function nm(e, t, s, o) {
    do
      Sr();
    while (Sn !== null);
    if ((ye & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (Op(e, c), e === He && (ze = He = null, qe = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || Pi || (Pi = !0, Bd(Us, function() {
      return Sr(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = wt.transition, wt.transition = null;
      var f = xe;
      xe = 1;
      var m = ye;
      ye |= 4, Ja.current = null, Kg(e, s), bd(s, e), xg(oa), Ys = !!ia, oa = ia = null, e.current = s, Jg(s), Tp(), ye = m, xe = f, wt.transition = c;
    } else e.current = s;
    if (Pi && (Pi = !1, Sn = e, ji = l), c = e.pendingLanes, c === 0 && (_n = null), Ap(s.stateNode), ct(e, Le()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (Ni) throw Ni = !1, e = el, el = null, e;
    return (ji & 1) !== 0 && e.tag !== 0 && Sr(), c = e.pendingLanes, (c & 1) !== 0 ? e === tl ? ys++ : (ys = 0, tl = e) : ys = 0, gn(), null;
  }
  function Sr() {
    if (Sn !== null) {
      var e = Eu(ji), t = wt.transition, s = xe;
      try {
        if (wt.transition = null, xe = 16 > e ? 16 : e, Sn === null) var o = !1;
        else {
          if (e = Sn, Sn = null, ji = 0, (ye & 6) !== 0) throw Error(i(331));
          var l = ye;
          for (ye |= 4, q = e.current; q !== null; ) {
            var c = q, f = c.child;
            if ((q.flags & 16) !== 0) {
              var m = c.deletions;
              if (m !== null) {
                for (var S = 0; S < m.length; S++) {
                  var R = m[S];
                  for (q = R; q !== null; ) {
                    var L = q;
                    switch (L.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ps(8, L, c);
                    }
                    var O = L.child;
                    if (O !== null) O.return = L, q = O;
                    else for (; q !== null; ) {
                      L = q;
                      var j = L.sibling, V = L.return;
                      if (Sd(L), L === R) {
                        q = null;
                        break;
                      }
                      if (j !== null) {
                        j.return = V, q = j;
                        break;
                      }
                      q = V;
                    }
                  }
                }
                var G = c.alternate;
                if (G !== null) {
                  var Y = G.child;
                  if (Y !== null) {
                    G.child = null;
                    do {
                      var Oe = Y.sibling;
                      Y.sibling = null, Y = Oe;
                    } while (Y !== null);
                  }
                }
                q = c;
              }
            }
            if ((c.subtreeFlags & 2064) !== 0 && f !== null) f.return = c, q = f;
            else e: for (; q !== null; ) {
              if (c = q, (c.flags & 2048) !== 0) switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  ps(9, c, c.return);
              }
              var C = c.sibling;
              if (C !== null) {
                C.return = c.return, q = C;
                break e;
              }
              q = c.return;
            }
          }
          var k = e.current;
          for (q = k; q !== null; ) {
            f = q;
            var T = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && T !== null) T.return = f, q = T;
            else e: for (f = k; q !== null; ) {
              if (m = q, (m.flags & 2048) !== 0) try {
                switch (m.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ri(9, m);
                }
              } catch (Q) {
                je(m, m.return, Q);
              }
              if (m === f) {
                q = null;
                break e;
              }
              var z = m.sibling;
              if (z !== null) {
                z.return = m.return, q = z;
                break e;
              }
              q = m.return;
            }
          }
          if (ye = l, gn(), Bt && typeof Bt.onPostCommitFiberRoot == "function") try {
            Bt.onPostCommitFiberRoot($s, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        xe = s, wt.transition = t;
      }
    }
    return !1;
  }
  function Od(e, t, s) {
    t = mr(s, t), t = ed(e, t, 1), e = yn(e, t, 1), t = rt(), e !== null && (Ur(e, 1, t), ct(e, t));
  }
  function je(e, t, s) {
    if (e.tag === 3) Od(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Od(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (_n === null || !_n.has(o))) {
          e = mr(s, e), e = td(t, e, 1), t = yn(t, e, 1), e = rt(), t !== null && (Ur(t, 1, e), ct(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function rm(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = rt(), e.pingedLanes |= e.suspendedLanes & s, He === e && (qe & s) === s && (Be === 4 || Be === 3 && (qe & 130023424) === qe && 500 > Le() - Za ? zn(e, 0) : Xa |= s), ct(e, t);
  }
  function zd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Vs, Vs <<= 1, (Vs & 130023424) === 0 && (Vs = 4194304)));
    var s = rt();
    e = Jt(e, t), e !== null && (Ur(e, t, s), ct(e, s));
  }
  function sm(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), zd(e, s);
  }
  function im(e, t) {
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
    o !== null && o.delete(t), zd(e, s);
  }
  var Dd;
  Dd = function(e, t, s) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || ot.current) lt = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return lt = !1, qg(e, t, s);
      lt = (e.flags & 131072) !== 0;
    }
    else lt = !1, Re && (t.flags & 1048576) !== 0 && yc(t, fi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        Ti(e, t), e = t.pendingProps;
        var l = lr(t, Ke.current);
        pr(t, s), l = Aa(null, t, o, e, l, s);
        var c = Ma();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, at(o) ? (c = !0, ui(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ea(t), l.updater = bi, t.stateNode = l, l._reactInternals = t, za(t, o, e, s), t = Ua(null, t, o, !0, c, s)) : (t.tag = 0, Re && c && ha(t), nt(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (Ti(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = am(o), e = Tt(o, e), l) {
            case 0:
              t = Fa(null, t, o, e, s);
              break e;
            case 1:
              t = cd(null, t, o, e, s);
              break e;
            case 11:
              t = id(null, t, o, e, s);
              break e;
            case 14:
              t = od(null, t, o, Tt(o.type, e), s);
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
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Tt(o, l), Fa(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Tt(o, l), cd(e, t, o, l, s);
      case 3:
        e: {
          if (dd(t), e === null) throw Error(i(387));
          o = t.pendingProps, c = t.memoizedState, l = c.element, Cc(e, t), vi(t, o, null, s);
          var f = t.memoizedState;
          if (o = f.element, c.isDehydrated) if (c = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
            l = mr(Error(i(423)), t), t = fd(e, t, o, s, l);
            break e;
          } else if (o !== l) {
            l = mr(Error(i(424)), t), t = fd(e, t, o, s, l);
            break e;
          } else for (pt = fn(t.stateNode.containerInfo.firstChild), ht = t, Re = !0, Ct = null, s = kc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (dr(), o === l) {
              t = Zt(e, t, s);
              break e;
            }
            nt(e, t, o, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Rc(t), e === null && ma(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, f = l.children, aa(o, l) ? f = null : c !== null && aa(o, c) && (t.flags |= 32), ud(e, t), nt(e, t, f, s), t.child;
      case 6:
        return e === null && ma(t), null;
      case 13:
        return hd(e, t, s);
      case 4:
        return ka(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = fr(t, null, o, s) : nt(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Tt(o, l), id(e, t, o, l, s);
      case 7:
        return nt(e, t, t.pendingProps, s), t.child;
      case 8:
        return nt(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return nt(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, f = l.value, Ee(gi, o._currentValue), o._currentValue = f, c !== null) if (bt(c.value, f)) {
            if (c.children === l.children && !ot.current) {
              t = Zt(e, t, s);
              break e;
            }
          } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
            var m = c.dependencies;
            if (m !== null) {
              f = c.child;
              for (var S = m.firstContext; S !== null; ) {
                if (S.context === o) {
                  if (c.tag === 1) {
                    S = Xt(-1, s & -s), S.tag = 2;
                    var R = c.updateQueue;
                    if (R !== null) {
                      R = R.shared;
                      var L = R.pending;
                      L === null ? S.next = S : (S.next = L.next, L.next = S), R.pending = S;
                    }
                  }
                  c.lanes |= s, S = c.alternate, S !== null && (S.lanes |= s), wa(
                    c.return,
                    s,
                    t
                  ), m.lanes |= s;
                  break;
                }
                S = S.next;
              }
            } else if (c.tag === 10) f = c.type === t.type ? null : c.child;
            else if (c.tag === 18) {
              if (f = c.return, f === null) throw Error(i(341));
              f.lanes |= s, m = f.alternate, m !== null && (m.lanes |= s), wa(f, s, t), f = c.sibling;
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
          nt(e, t, l.children, s), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, o = t.pendingProps.children, pr(t, s), l = _t(l), o = o(l), t.flags |= 1, nt(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = Tt(o, t.pendingProps), l = Tt(o.type, l), od(e, t, o, l, s);
      case 15:
        return ad(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Tt(o, l), Ti(e, t), t.tag = 1, at(o) ? (e = !0, ui(t)) : e = !1, pr(t, s), Xc(t, o, l), za(t, o, l, s), Ua(null, t, o, !0, e, s);
      case 19:
        return gd(e, t, s);
      case 22:
        return ld(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function Bd(e, t) {
    return vu(e, t);
  }
  function om(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function xt(e, t, s, o) {
    return new om(e, t, s, o);
  }
  function al(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function am(e) {
    if (typeof e == "function") return al(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === me) return 11;
      if (e === ce) return 14;
    }
    return 2;
  }
  function En(e, t) {
    var s = e.alternate;
    return s === null ? (s = xt(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function Di(e, t, s, o, l, c) {
    var f = 2;
    if (o = e, typeof e == "function") al(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case D:
        return Bn(s.children, l, c, t);
      case H:
        f = 8, l |= 8;
        break;
      case se:
        return e = xt(12, s, t, l | 2), e.elementType = se, e.lanes = c, e;
      case he:
        return e = xt(13, s, t, l), e.elementType = he, e.lanes = c, e;
      case ae:
        return e = xt(19, s, t, l), e.elementType = ae, e.lanes = c, e;
      case $:
        return Bi(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case ge:
            f = 10;
            break e;
          case ve:
            f = 9;
            break e;
          case me:
            f = 11;
            break e;
          case ce:
            f = 14;
            break e;
          case ke:
            f = 16, o = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = xt(f, s, t, l), t.elementType = e, t.type = o, t.lanes = c, t;
  }
  function Bn(e, t, s, o) {
    return e = xt(7, e, o, t), e.lanes = s, e;
  }
  function Bi(e, t, s, o) {
    return e = xt(22, e, o, t), e.elementType = $, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function ll(e, t, s) {
    return e = xt(6, e, null, t), e.lanes = s, e;
  }
  function ul(e, t, s) {
    return t = xt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function lm(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Oo(0), this.expirationTimes = Oo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Oo(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function cl(e, t, s, o, l, c, f, m, S) {
    return e = new lm(e, t, s, m, S), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = xt(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ea(c), e;
  }
  function um(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: K, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function Fd(e) {
    if (!e) return pn;
    e = e._reactInternals;
    e: {
      if (Tn(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (at(t.type)) {
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
      if (at(s)) return pc(e, s, t);
    }
    return t;
  }
  function Ud(e, t, s, o, l, c, f, m, S) {
    return e = cl(s, o, !0, e, l, c, f, m, S), e.context = Fd(null), s = e.current, o = rt(), l = wn(s), c = Xt(o, l), c.callback = t ?? null, yn(s, c, l), e.current.lanes = l, Ur(e, l, o), ct(e, o), e;
  }
  function Fi(e, t, s, o) {
    var l = t.current, c = rt(), f = wn(l);
    return s = Fd(s), t.context === null ? t.context = s : t.pendingContext = s, t = Xt(c, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = yn(l, t, f), e !== null && (At(e, l, f, c), yi(e, l, f)), f;
  }
  function Ui(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function $d(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function dl(e, t) {
    $d(e, t), (e = e.alternate) && $d(e, t);
  }
  function cm() {
    return null;
  }
  var Hd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function fl(e) {
    this._internalRoot = e;
  }
  $i.prototype.render = fl.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Fi(e, t, null, null);
  }, $i.prototype.unmount = fl.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      On(function() {
        Fi(null, e, null, null);
      }), t[Gt] = null;
    }
  };
  function $i(e) {
    this._internalRoot = e;
  }
  $i.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Cu();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < un.length && t !== 0 && t < un[s].priority; s++) ;
      un.splice(s, 0, e), s === 0 && Ru(e);
    }
  };
  function hl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Hi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Vd() {
  }
  function dm(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var R = Ui(f);
          c.call(R);
        };
      }
      var f = Ud(t, o, e, 0, null, !1, !1, "", Vd);
      return e._reactRootContainer = f, e[Gt] = f.current, ts(e.nodeType === 8 ? e.parentNode : e), On(), f;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var m = o;
      o = function() {
        var R = Ui(S);
        m.call(R);
      };
    }
    var S = cl(e, 0, !1, null, null, !1, !1, "", Vd);
    return e._reactRootContainer = S, e[Gt] = S.current, ts(e.nodeType === 8 ? e.parentNode : e), On(function() {
      Fi(t, S, s, o);
    }), S;
  }
  function Vi(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var f = c;
      if (typeof l == "function") {
        var m = l;
        l = function() {
          var S = Ui(f);
          m.call(S);
        };
      }
      Fi(t, f, e, l);
    } else f = dm(s, t, e, l, o);
    return Ui(f);
  }
  ku = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = Fr(t.pendingLanes);
          s !== 0 && (zo(t, s | 1), ct(t, Le()), (ye & 6) === 0 && (_r = Le() + 500, gn()));
        }
        break;
      case 13:
        On(function() {
          var o = Jt(e, 1);
          if (o !== null) {
            var l = rt();
            At(o, e, 1, l);
          }
        }), dl(e, 1);
    }
  }, Do = function(e) {
    if (e.tag === 13) {
      var t = Jt(e, 134217728);
      if (t !== null) {
        var s = rt();
        At(t, e, 134217728, s);
      }
      dl(e, 134217728);
    }
  }, bu = function(e) {
    if (e.tag === 13) {
      var t = wn(e), s = Jt(e, t);
      if (s !== null) {
        var o = rt();
        At(s, e, t, o);
      }
      dl(e, t);
    }
  }, Cu = function() {
    return xe;
  }, Tu = function(e, t) {
    var s = xe;
    try {
      return xe = e, t();
    } finally {
      xe = s;
    }
  }, Ao = function(e, t, s) {
    switch (t) {
      case "input":
        if (mt(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = ai(o);
              if (!l) throw Error(i(90));
              sn(o), mt(o, l);
            }
          }
        }
        break;
      case "textarea":
        Dt(e, s);
        break;
      case "select":
        t = s.value, t != null && tt(e, !!s.multiple, t, !1);
    }
  }, du = sl, fu = On;
  var fm = { usingClientEntryPoint: !1, Events: [ss, or, ai, uu, cu, sl] }, vs = { findFiberByHostInstance: In, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, hm = { bundleType: vs.bundleType, version: vs.version, rendererPackageName: vs.rendererPackageName, rendererConfig: vs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: le.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = mu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: vs.findFiberByHostInstance || cm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Wi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wi.isDisabled && Wi.supportsFiber) try {
      $s = Wi.inject(hm), Bt = Wi;
    } catch {
    }
  }
  return dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fm, dt.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!hl(t)) throw Error(i(200));
    return um(e, t, null, s);
  }, dt.createRoot = function(e, t) {
    if (!hl(e)) throw Error(i(299));
    var s = !1, o = "", l = Hd;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = cl(e, 1, !1, null, null, s, !1, o, l), e[Gt] = t.current, ts(e.nodeType === 8 ? e.parentNode : e), new fl(t);
  }, dt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = mu(t), e = e === null ? null : e.stateNode, e;
  }, dt.flushSync = function(e) {
    return On(e);
  }, dt.hydrate = function(e, t, s) {
    if (!Hi(t)) throw Error(i(200));
    return Vi(null, e, t, !0, s);
  }, dt.hydrateRoot = function(e, t, s) {
    if (!hl(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", f = Hd;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (f = s.onRecoverableError)), t = Ud(t, null, e, 1, s ?? null, l, !1, c, f), e[Gt] = t.current, ts(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new $i(t);
  }, dt.render = function(e, t, s) {
    if (!Hi(t)) throw Error(i(200));
    return Vi(null, e, t, !1, s);
  }, dt.unmountComponentAtNode = function(e) {
    if (!Hi(e)) throw Error(i(40));
    return e._reactRootContainer ? (On(function() {
      Vi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Gt] = null;
      });
    }), !0) : !1;
  }, dt.unstable_batchedUpdates = sl, dt.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Hi(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Vi(e, t, s, !1, o);
  }, dt.version = "18.3.1-next-f1338f8080-20240426", dt;
}
var Xd;
function Uf() {
  if (Xd) return ml.exports;
  Xd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), ml.exports = xm(), ml.exports;
}
var Zd;
function Em() {
  if (Zd) return qi;
  Zd = 1;
  var r = Uf();
  return qi.createRoot = r.createRoot, qi.hydrateRoot = r.hydrateRoot, qi;
}
var km = Em(), bm = Uf();
const Cm = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
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
class $f {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return Cm(this._providers);
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
class Tm {
  _contextProvider = new $f();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class Im {
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
const Rm = (r) => r.status.type === "complete";
class Hf extends Im {
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => Rm(d) ? d : await n.send(d))) : [], a = this.text;
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
      const h = this._attachments.findIndex((g) => g.id === d.id);
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
          const { transcript: A, ...P } = this._dictation;
          this._dictation = P;
        }
        this._notifySubscribers();
      } else
        this._currentInterimText = _ + v.transcript, this._text = this._dictationBaseText + this._currentInterimText, this._dictation && (this._dictation = {
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
    const g = a.onSpeechEnd(() => {
      this._cleanupDictation({ sessionId: u });
    });
    this._dictationUnsubscribes.push(g);
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
class Am extends Hf {
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
let Mm = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const $l = Mm("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), Nm = "__optimistic__", Pm = () => `${Nm}${$l()}`, Ar = /* @__PURE__ */ Symbol("autoStatus"), jm = Object.freeze(Object.assign({ type: "running" }, { [Ar]: !0 })), Lm = Object.freeze(Object.assign({
  type: "complete",
  reason: "unknown"
}, { [Ar]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "tool-calls"
}, { [Ar]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "interrupt"
}, { [Ar]: !0 }));
const Om = (r) => r[Ar] === !0, Vf = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [Ar]: !0 }) : r && n ? jm : Lm;
var Fn = { exports: {} }, ef;
function zm() {
  if (ef) return Fn.exports;
  ef = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(g, y, v) {
    v == null && y !== null && typeof y == "object" && (v = y, y = void 0), r && Buffer.isBuffer(g) && (g = g.toString()), g && g.charCodeAt(0) === 65279 && (g = g.slice(1));
    const x = JSON.parse(g, y);
    if (x === null || typeof x != "object")
      return x;
    const b = v && v.protoAction || "error", _ = v && v.constructorAction || "error";
    if (b === "ignore" && _ === "ignore")
      return x;
    if (b !== "ignore" && _ !== "ignore") {
      if (n.test(g) === !1 && i.test(g) === !1)
        return x;
    } else if (b !== "ignore" && _ === "ignore") {
      if (n.test(g) === !1)
        return x;
    } else if (i.test(g) === !1)
      return x;
    return u(x, { protoAction: b, constructorAction: _, safe: v && v.safe });
  }
  function u(g, { protoAction: y = "error", constructorAction: v = "error", safe: x } = {}) {
    let b = [g];
    for (; b.length; ) {
      const _ = b;
      b = [];
      for (const A of _) {
        if (y !== "ignore" && Object.prototype.hasOwnProperty.call(A, "__proto__")) {
          if (x === !0)
            return null;
          if (y === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete A.__proto__;
        }
        if (v !== "ignore" && Object.prototype.hasOwnProperty.call(A, "constructor") && A.constructor !== null && typeof A.constructor == "object" && Object.prototype.hasOwnProperty.call(A.constructor, "prototype")) {
          if (x === !0)
            return null;
          if (v === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete A.constructor;
        }
        for (const P in A) {
          const N = A[P];
          N && typeof N == "object" && b.push(N);
        }
      }
    }
    return g;
  }
  function d(g, y, v) {
    const { stackTraceLimit: x } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(g, y, v);
    } finally {
      Error.stackTraceLimit = x;
    }
  }
  function h(g, y) {
    const { stackTraceLimit: v } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(g, y, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = v;
    }
  }
  return Fn.exports = d, Fn.exports.default = d, Fn.exports.parse = d, Fn.exports.safeParse = h, Fn.exports.scan = u, Fn.exports;
}
var Dm = zm();
const tf = /* @__PURE__ */ Ff(Dm);
function Bm(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function h() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function g(b, _, A) {
    switch (b) {
      case '"': {
        i = _, n.pop(), n.push(A), n.push("INSIDE_STRING"), h();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = _, a = _, n.pop(), n.push(A), n.push("INSIDE_LITERAL");
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
        i = _, n.pop(), n.push(A), n.push("INSIDE_NUMBER"), h();
        break;
      }
      case "{": {
        i = _, n.pop(), n.push(A), n.push("INSIDE_OBJECT_START"), h();
        break;
      }
      case "[": {
        i = _, n.pop(), n.push(A), n.push("INSIDE_ARRAY_START"), h();
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
        g(_, b, "FINISH");
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
        g(_, b, "INSIDE_OBJECT_AFTER_VALUE");
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
        _ === "]" ? (i = b, n.pop(), d = u.pop()) : (i = b, d = "0", g(_, b, "INSIDE_ARRAY_AFTER_VALUE"));
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
        g(_, b, "INSIDE_ARRAY_AFTER_VALUE");
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
        const P = r.substring(a, b + 1);
        !"false".startsWith(P) && !"true".startsWith(P) && !"null".startsWith(P) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? y(_, b) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(_, b)) : i = b;
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
        const A = r.substring(a, r.length);
        "true".startsWith(A) ? x += "true".slice(A.length) : "false".startsWith(A) ? x += "false".slice(A.length) : "null".startsWith(A) && (x += "null".slice(A.length));
      }
    }
  return [x, u];
}
const _l = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), Fm = (r) => {
  if (r.length === 0)
    return {
      [_l]: { state: "partial", partialPath: [] }
    };
  try {
    const n = tf.parse(r);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[_l] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = Bm(r), a = tf.parse(n);
      if (typeof a != "object" || a === null)
        throw new Error("argsText is expected to be an object");
      return a[_l] = {
        state: "partial",
        partialPath: i
      }, a;
    } catch {
      return;
    }
  }
}, Hl = (r, n, i) => {
  const { role: a, id: u, createdAt: d, attachments: h, status: g, metadata: y } = r, v = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, x = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, b = ({ image: _, ...A }) => {
    const P = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(_), N = /^https?:\/\//.test(_);
    return P || N ? { ...A, image: _ } : (console.warn("Invalid image data format detected"), null);
  };
  if (a !== "user" && h?.length)
    throw new Error("attachments are only supported for user messages");
  if (a !== "assistant" && g)
    throw new Error("status is only supported for assistant messages");
  if (a !== "assistant" && y?.steps)
    throw new Error("metadata.steps is only supported for assistant messages");
  switch (a) {
    case "assistant":
      return {
        ...v,
        role: a,
        content: x.map((_) => {
          const A = _.type;
          switch (A) {
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
              const { parentId: P, messages: N, ...U } = _, B = {
                ...U,
                toolCallId: _.toolCallId ?? `tool-${$l()}`,
                ...P !== void 0 && { parentId: P },
                ...N !== void 0 && { messages: N }
              };
              return _.args ? {
                ...B,
                args: _.args,
                argsText: _.argsText ?? JSON.stringify(_.args)
              } : {
                ...B,
                args: Fm(_.argsText ?? "") ?? {},
                argsText: _.argsText ?? ""
              };
            }
            default: {
              const P = A;
              throw new Error(`Unsupported assistant message part type: ${P}`);
            }
          }
        }).filter((_) => !!_),
        status: g ?? i,
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
          const A = _.type;
          switch (A) {
            case "text":
            case "image":
            case "audio":
            case "file":
              return _;
            default: {
              const P = A;
              throw new Error(`Unsupported user message part type: ${P}`);
            }
          }
        }),
        attachments: h ?? [],
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
}, Vl = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (r) => {
    const n = r.map((i) => Hl(i, $l(), Vf(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, a) => ({
        parentId: a > 0 ? n[a - 1].id : null,
        message: i
      }))
    };
  }
}, Zi = (r) => r.next ? Zi(r.next) : "current" in r ? r : null;
class Um {
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
class Wf {
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
        const h = u.children.at(-1), g = h ? this.messages.get(h) : null;
        if (g === void 0)
          throw new Error("MessageRepository(performOp/cut): Fallback sibling message not found. This is likely an internal bug in assistant-ui.");
        u.next = g;
      }
      if (a !== "cut") {
        for (let g = n; g; g = g.prev)
          if (g.current.id === i.current.id)
            throw new Error("MessageRepository(performOp/link): A message with the same id already exists in the parent tree. This error occurs if the same message id is found multiple times. This is likely an internal bug in assistant-ui.");
        d.children = [
          ...d.children,
          i.current.id
        ], (Zi(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const h = n ? n.level + 1 : 0;
        this.updateLevels(i, h);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new Um(() => {
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
      a = Pm();
    while (this.messages.has(a));
    return this.addOrUpdateMessage(n, Hl(i, a, { type: "running" })), a;
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
    this.performOp(null, a, "cut"), this.messages.delete(n), this.head === a && (this.head = Zi(u ?? this.root)), this._messages.dirty();
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
    a.next = i, this.head = Zi(i), this._messages.dirty();
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
class mo {
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
class Wl extends mo {
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
class Gi {
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
      const d = this._core.getState(), h = d.isMain, g = d.id;
      a === h && u === g || (a = h, u = g, !(n === "switched-to" && !h) && (n === "switched-away" && h || i()));
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
function $m(r, n) {
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
class Pt extends mo {
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
    return n === jt || $m(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const kr = /* @__PURE__ */ Symbol("innerMessage"), Hm = (r) => r[kr], bs = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class qf {
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
class Gf extends qf {
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
class Vm extends Gf {
  get source() {
    return "thread-composer";
  }
}
class Wm extends Gf {
  get source() {
    return "edit-composer";
  }
}
class qm extends qf {
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
class Yf extends mo {
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
const Qf = Object.freeze([]), Kf = Object.freeze({}), Gm = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? Qf,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? Kf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), Ym = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? Qf,
  runConfig: r?.runConfig ?? Kf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class Jf {
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
    return a || (a = new Yf({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
class Qm extends Jf {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(n) {
    const i = new Wl({
      path: n.path,
      getState: () => Gm(n.getState()),
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
    return new Vm(new Pt({
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
class Km extends Jf {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(n, i) {
    const a = new Wl({
      path: n.path,
      getState: () => Ym(n.getState()),
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
    return new Wm(new Pt({
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
const nf = /* @__PURE__ */ Symbol.for("aui.tool-response");
class to {
  get [nf]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && nf in n;
  }
  static toResponse(n) {
    return n instanceof to ? n : new to({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class rf {
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
    const u = i.toolName, d = i.toolCallId, h = to.toResponse(n);
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
class no extends mo {
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
const Yi = Object.freeze({
  type: "complete"
}), Jm = (r, n, i) => {
  if (r.role !== "assistant")
    return Yi;
  if (i.type === "tool-call")
    return i.result ? Yi : r.status;
  const a = n === Math.max(0, r.content.length - 1);
  return r.status.type === "requires-action" ? Yi : a ? r.status : Yi;
}, sf = (r, n) => {
  const i = r.content[n];
  if (!i)
    return jt;
  const a = Jm(r, n, i);
  return Object.freeze({
    ...i,
    [kr]: i[kr],
    status: a
  });
};
class Xm {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new Km(new no({
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
    return bs(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new rf(new Pt({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => sf(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new rf(new Pt({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), a = i.content.findIndex((u) => u.type === "tool-call" && u.toolCallId === n);
        return a === -1 ? jt : sf(i, a);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new qm(new Pt({
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
const Zm = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {},
  ...r.stream ? { stream: r.stream } : {}
}), ey = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), ty = (r, n) => typeof n == "string" ? {
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
}, ny = (r, n) => {
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
class ry {
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
      getState: () => ny(n.getState(), i.getState()),
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
    }, this.composer = new Qm(new no({
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
    this._threadBinding.getState().append(ty(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(ey(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun(Zm(n));
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
    return new Xm(new Pt({
      path: n,
      getState: () => {
        const { message: a, parentId: u, index: d } = i() ?? {}, { messages: h, speech: g } = this._threadBinding.getState();
        if (!a || u === void 0 || d === void 0)
          return jt;
        const v = this._threadBinding.getState().getBranches(a.id), x = a.metadata.submittedFeedback;
        return {
          ...a,
          [kr]: a[kr],
          index: d,
          isLast: h.at(-1)?.id === a.id,
          parentId: u,
          branchNumber: v.indexOf(a.id) + 1,
          branchCount: v.length,
          speech: g?.messageId === a.id ? g : void 0,
          submittedFeedback: x
        };
      },
      subscribe: (a) => this._threadBinding.subscribe(a)
    }), this._threadBinding);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    let a = this._eventSubscriptionSubjects.get(n);
    return a || (a = new Yf({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
const sy = (r) => ({
  mainThreadId: r.mainThreadId,
  newThread: r.newThreadId,
  threads: r.threadIds,
  archivedThreads: r.archivedThreadIds,
  isLoading: r.isLoading,
  threadItems: r.threadData
}), Qi = (r, n) => {
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
class iy {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = ry) {
    this._core = n, this._runtimeFactory = i;
    const a = new Wl({
      path: {},
      getState: () => sy(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new Gi(new Pt({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => Qi(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new no({
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
    return new this._runtimeFactory(new no({
      path: {
        ref: `threads[threadId=${JSON.stringify(n)}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => this._core.getThreadRuntimeCore(n),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(n) {
    return new Gi(new Pt({
      path: {
        ref: `threadItems[${n}]`,
        threadSelector: { type: "index", index: n }
      },
      getState: () => Qi(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new Gi(new Pt({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => Qi(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new Gi(new Pt({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => Qi(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const oy = E.createContext(null), ay = () => E.useContext(oy), Un = Object.freeze([]), Vn = "DEFAULT_THREAD_ID", ly = Object.freeze([Vn]), Xf = Object.freeze({
  id: Vn,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), uy = Promise.resolve(), of = Object.freeze({
  [Vn]: Xf
});
class cy {
  adapter;
  threadFactory;
  _mainThreadId = Vn;
  _threads = ly;
  _archivedThreads = Un;
  _threadData = of;
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
    return uy;
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
      return Xf;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? Vn, d = n.threads ?? Un, h = n.archivedThreads ?? Un, g = a.threadId ?? Vn, y = a.threads ?? Un, v = a.archivedThreads ?? Un;
    !i && g === u && y === d && v === h || (this._threadData = {
      ...of,
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
    }, y !== d && (this._threads = this.adapter.threads?.map((x) => x.id) ?? Un), v !== h && (this._archivedThreads = this.adapter.archivedThreads?.map((x) => x.id) ?? Un), g !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
class af {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((a, u) => {
      const d = this.cache.get(a), h = i(d, a, u);
      return this.cache.set(a, h), h;
    });
  }
}
class dy extends Hf {
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
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = a, this._sourceId = u.id, this._previousText = bs(u), this.setText(this._previousText), this.setRole(u.role), this.setAttachments(u.attachments ?? []), this._nonTextParts = u.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    bs(n) !== this._previousText && this.runtime.append({
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
class fy {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new Wf();
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
  composer = new Am(this);
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
    this._editComposers.set(n, new dy(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
    const u = i.speak(bs(a)), d = u.subscribe(() => {
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
    this.import(Vl.fromArray(n ?? []));
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
const hy = Object.freeze([]), py = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class gy extends fy {
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
  _converter = new af();
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
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? hy, this._capabilities = {
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
          this._converter = new af();
        else if (a.isRunning === n.isRunning && a.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, h, g) => {
        if (!n.convertMessage)
          return h;
        const y = g === (n.messages?.length ?? 0) - 1, v = Vf(y, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !Om(d.status) || d.status === v))
          return d;
        const x = n.convertMessage(h, g), b = Hl(x, g.toString(), v);
        return b[kr] = h, b;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const h = u[d], g = u[d - 1];
        this.repository.addOrUpdateMessage(g?.id ?? null, h);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), py(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
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
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(bs(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
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
    const i = new Wf();
    i.import(Vl.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(Hm).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const lf = (r) => r.adapters?.threadList ?? {};
class my extends Tm {
  threads;
  constructor(n) {
    super(), this.threads = new cy(lf(n), () => new gy(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(lf(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const yy = (r) => {
  const [n] = E.useState(() => new my(r));
  E.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = ay() ?? {};
  return E.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), E.useMemo(() => new xv(n), [n]);
};
function vy(r, n) {
  r.commitTasks.forEach((i) => {
    const a = i.cellIndex, u = n.cells[a];
    if (u.type !== "effect")
      throw new Error("Cannot find effect cell");
    let d = !0;
    if (u.deps !== void 0 && i.deps !== void 0 && (d = u.deps.length !== i.deps.length || u.deps.some((h, g) => !Object.is(h, i.deps[g]))), d) {
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
function _y(r) {
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
let Ss = null;
function Sy(r, n) {
  r.currentIndex = 0;
  const i = Ss;
  Ss = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    Ss = i;
  }
}
function ql() {
  if (!Ss)
    throw new Error("No resource fiber available");
  return Ss;
}
function Zf(r, n) {
  const i = r[eh];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const eh = /* @__PURE__ */ Symbol("fnSymbol");
function yo(r, n) {
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
function Cs(r) {
  r.isMounted = !1, _y(r);
}
function Ts(r, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return Sy(r, () => {
    r.renderContext = i;
    try {
      i.state = Zf(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function Is(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, vy(n, r);
}
const wy = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, uf = wy ? E.useEffect : E.useLayoutEffect;
function Gl(r) {
  const [, n] = E.useState({}), i = E.useMemo(() => yo(r.type, () => n({})), [r.type]), a = Ts(i, r.props);
  return uf(() => () => Cs(i), [i]), uf(() => {
    Is(i, a);
  }), a.state;
}
const vo = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, ws = (r, n, i) => n === r;
let wr;
const Sl = () => {
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
class $n {
  static MAX_EVENT_LOGS_PER_API = 200;
  static register(n) {
    const i = Sl();
    for (const g of i.apis.values())
      if (g.api === n)
        return () => {
        };
    const a = i.nextId++, u = {
      api: n,
      logs: []
    }, d = n.on?.("*", (g) => {
      const y = i.apis.get(a);
      y && (y.logs.push({
        time: /* @__PURE__ */ new Date(),
        event: g.event,
        data: g.payload
      }), y.logs.length > $n.MAX_EVENT_LOGS_PER_API && (y.logs = y.logs.slice(-200)), $n.notifyListeners(a));
    }), h = n.subscribe?.(() => {
      $n.notifyListeners(a);
    });
    return i.apis.set(a, u), $n.notifyListeners(a), () => {
      const g = Sl();
      g.apis.get(a) && (d?.(), h?.(), g.apis.delete(a), $n.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    Sl().listeners.forEach((a) => a(n));
  }
}
function Pe(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[eh] = r, n;
}
const xy = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function Ey(r) {
  const n = ql(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (h) => {
        const g = d.value, y = typeof h == "function" ? h(g) : h;
        Object.is(g, y) || (d.value = y, xy(n));
      }
    };
    n.cells[i] = d;
  }
  const a = n.cells[i];
  if (a.type !== "state")
    throw new Error("Hook order changed between renders");
  return a;
}
function Wt(r) {
  const n = Ey(r);
  return [n.value, n.set];
}
function ky() {
  const r = ql(), n = r.currentIndex++;
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
function it(r, n) {
  const i = ql(), a = ky();
  i.renderContext.commitTasks.push({
    effect: r,
    deps: n,
    cellIndex: a
  });
}
function br(r) {
  const [n] = Wt(() => ({
    current: r
  }));
  return n;
}
const by = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, we = (r, n) => {
  const i = br();
  return i.current || (i.current = { value: r(), deps: n }), by(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, Cy = (r, n) => we(() => r, n);
function xs(r, n) {
  const [i, a] = Wt({}), u = we(() => yo(r.type, () => a({})), [r.type]), d = n ? we(() => r.props, n) : r.props, h = we(() => Ts(u, d), [u, d, i]);
  return it(() => () => Cs(u), [u]), it(() => {
    Is(u, h);
  }, [u, h]), h.state;
}
function qt(r) {
  return Zf(r.type, r.props);
}
function th(r, n, i) {
  const [a, u] = Wt(0), d = Cy(() => u((v) => v + 1), []), [h] = Wt(() => /* @__PURE__ */ new Map()), g = we(() => n, i), y = we(() => {
    const v = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const x in r) {
      const b = r[x], _ = g(b, x);
      let A = h.get(x);
      (!A || A.resource !== _.type) && (A && v.remove.push(x), A = yo(_.type, d), v.add.push([x, A]));
      const P = Ts(A, _.props);
      v.commit.push([x, P]), v.return[x] = P.state;
    }
    if (h.size > v.commit.length - v.add.length + v.remove.length)
      for (const x of h.keys())
        x in r || v.remove.push(x);
    return v;
  }, [r, g, a]);
  return it(() => () => {
    for (const v of h.keys())
      Cs(h.get(v)), h.delete(v);
  }, []), it(() => {
    for (const v of y.remove)
      Cs(h.get(v)), h.delete(v);
    for (const [v, x] of y.add)
      h.set(v, x);
    for (const [v, x] of y.commit)
      Is(h.get(v), x);
  }, [y]), y.return;
}
const Ty = 50;
let Vt = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class Iy {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Vt.schedulers.add(this), Ry();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const Ry = () => {
  Vt.isScheduled || (Vt.isScheduled = !0, queueMicrotask(nh));
}, nh = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of Vt.schedulers)
      if (Vt.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > Ty)
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
}, Il = (r) => {
  const n = Vt;
  Vt = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = r();
    return nh(), i;
  } finally {
    Vt = n;
  }
}, Ay = Pe((r) => {
  const [, n] = Wt(r.element), i = xs(r.element), a = br(/* @__PURE__ */ new Set()).current, u = br(i);
  return it(() => {
    i !== u.current && (u.current = i, a.forEach((h) => h()));
  }), we(() => ({
    getState: () => u.current,
    subscribe: (h) => (a.add(h), () => a.delete(h)),
    render: (h) => {
      const g = r.element !== h;
      r.element = h, r.onRender(g) && n(h);
    },
    unmount: r.onUnmount
  }), []);
}), My = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (g) => i ? g : (i = !0, Il(() => {
      g && (a = Ts(h, u)), !d.isDirty && Is(h, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, Cs(h);
    }
  }, d = new Iy(() => {
    a = Ts(h, u), !(d.isDirty || !i) && Is(h, a);
  }), h = yo(Ay, () => d.markDirty());
  return Il(() => {
    d.markDirty();
  }), a.state;
}, Es = /* @__PURE__ */ Symbol("tap.Context"), rh = (r) => ({
  [Es]: r
}), sh = (r, n, i) => {
  const a = r[Es];
  r[Es] = n;
  try {
    return i();
  } finally {
    r[Es] = a;
  }
}, ih = (r) => r[Es], cf = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (v, x) => {
    const b = typeof v == "function" ? v(n) : v;
    if (!Object.is(b, n)) {
      const _ = n;
      n = x ?? (typeof b != "object" || b === null) ? b : Object.assign({}, n, b), i.forEach((A) => A(n, _));
    }
  }, u = () => n, g = { setState: a, getState: u, getInitialState: () => y, subscribe: (v) => (i.add(v), () => i.delete(v)) }, y = n = r(a, u, g);
  return g;
}, Ny = ((r) => r ? cf(r) : cf), Py = (r) => r;
function jy(r, n = Py) {
  const i = Nt.useSyncExternalStore(
    r.subscribe,
    Nt.useCallback(() => n(r.getState()), [r, n]),
    Nt.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return Nt.useDebugValue(i), i;
}
const df = (r) => {
  const n = Ny(r), i = (a) => jy(n, a);
  return Object.assign(i, n), i;
}, Ly = ((r) => r ? df(r) : df);
function ff(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function oh(...r) {
  return (n) => {
    let i = !1;
    const a = r.map((u) => {
      const d = ff(u, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : ff(r[u], null);
        }
      };
  };
}
function _o(...r) {
  return E.useCallback(oh(...r), r);
}
const ah = Pe((r) => {
  const n = we(() => My(r, { mount: !1 }), [r.type]);
  return it(() => {
    n.render(r);
  }), n;
});
class Oy {
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
  const i = br(r);
  it(() => {
    i.current = r;
  });
  const a = we(() => new Proxy({}, new Oy(i)), []), u = n?.key, d = r.getState();
  return we(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, ro = Pe((r) => {
  const n = br(r.get);
  return it(() => {
    n.current = r.get;
  }), we(() => et({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), zy = Pe((r) => {
  const n = xs(r.scopeElement);
  return we(() => [r.fieldName, n], [r.fieldName, n]);
}), Dy = Pe((r) => {
  const { on: n, subscribe: i, ...a } = r, u = br({ on: n, subscribe: i });
  it(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = th(a, (h, g) => zy({
    fieldName: g,
    scopeElement: h
  }), []);
  return we(() => {
    const h = Object.fromEntries(Object.values(d)), { on: g, subscribe: y } = u.current;
    return g && (h.on = (v, x) => g(v, x)), y && (h.subscribe = (v) => y(v)), h;
  }, [d]);
}), lh = rh(null), By = (r, n) => sh(lh, r, n), uh = () => {
  const r = ih(lh);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, Fy = Pe(({ toolkit: r }) => {
  const [n, i] = Wt(() => ({
    tools: {}
  })), a = uh();
  it(() => {
    if (!r)
      return;
    const d = [];
    for (const [y, v] of Object.entries(r))
      v.render && d.push(u(y, v.render));
    const h = Object.entries(r).reduce((y, [v, x]) => {
      const { render: b, ..._ } = x;
      return y[v] = _, y;
    }, {}), g = {
      getModelContext: () => ({
        tools: h
      })
    };
    return d.push(a.register(g)), () => {
      d.forEach((y) => y());
    };
  }, [r, a]);
  const u = (d, h) => (i((g) => ({
    ...g,
    tools: {
      ...g.tools,
      [d]: [...g.tools[d] ?? [], h]
    }
  })), () => {
    i((g) => ({
      ...g,
      tools: {
        ...g.tools,
        [d]: g.tools[d]?.filter((y) => y !== h) ?? []
      }
    }));
  });
  return Lt({
    getState: () => n,
    setToolUI: u
  });
}), Uy = Pe(() => we(() => {
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
}, [])), ch = rh(null), $y = (r, n) => sh(ch, r, n), Yl = () => {
  const r = ih(ch);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, Hy = Pe(() => {
  const [r] = Wt(() => ({})), n = new $f();
  return Lt({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), Vy = Pe(({ threads: r, modelContext: n, tools: i }) => {
  const a = qt(Uy()), { threads: u, tools: d, modelContext: h } = $y(a, () => {
    const y = xs(n ?? Hy(), [n]);
    return By(y.api, () => ({
      modelContext: y,
      tools: xs(i ?? Fy({}), [i]),
      threads: xs(r, [r])
    }));
  }), g = we(() => ({
    threads: u.state,
    tools: d.state,
    modelContext: h.state
  }), [u.state, d.state, h.state]);
  return Lt({
    getState: () => g,
    threads: u.api,
    tools: d.api,
    modelContext: h.api,
    on: a.on
  });
}), Wy = (r) => {
  const n = () => r.getState().api.threads.item("main");
  return {
    threads: et({
      source: "root",
      query: {},
      get: () => r.getState().api.threads
    }),
    tools: et({
      source: "root",
      query: {},
      get: () => r.getState().api.tools
    }),
    modelContext: et({
      source: "root",
      query: {},
      get: () => r.getState().api.modelContext
    }),
    thread: et({
      source: "threads",
      query: { type: "main" },
      get: () => r.getState().api.threads.thread("main")
    }),
    threadListItem: et({
      source: "threads",
      query: { type: "main" },
      get: () => n()
    }),
    composer: et({
      source: "thread",
      query: {},
      get: () => r.getState().api.threads.thread("main").composer
    }),
    on(i, a) {
      const { event: u, scope: d } = vo(i);
      if (d === "*")
        return r.getState().api.on(u, a);
      if (ws("thread", d) || ws("thread-list-item", d) || ws("composer", d))
        return r.getState().api.on(u, (h) => {
          h.threadId === n().getState().id && a(h);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, qy = (r) => {
  const n = Ql(), i = Gl(ah(Vy(r))), a = E.useMemo(() => Wy(i), [i]);
  return E.useMemo(() => fh(n, a), [n, a]);
}, et = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, so = () => () => {
}, dh = E.createContext({
  threads: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("Threads is only available inside <AssistantProvider />");
    }
  }),
  tools: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("Tools is only available inside <AssistantProvider />");
    }
  }),
  modelContext: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("ModelContext is only available inside <AssistantProvider />");
    }
  }),
  threadListItem: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("ThreadListItem is only available inside <AssistantProvider />");
    }
  }),
  thread: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("Thread is only available inside <AssistantProvider />");
    }
  }),
  composer: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("Composer is only available inside <AssistantProvider />");
    }
  }),
  message: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("Message is only available inside <ThreadPrimitive.Messages />");
    }
  }),
  part: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("Part is only available inside <MessagePrimitive.Parts />");
    }
  }),
  attachment: et({
    source: null,
    query: {},
    get: () => {
      throw new Error("Attachment is only available inside <MessagePrimitive.Attachments /> or <ComposerPrimitive.Attachments />");
    }
  }),
  subscribe: so,
  on: (r) => {
    const { scope: n } = vo(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), Ql = () => E.useContext(dh), Kl = (r) => {
  const n = Ql(), i = Gl(Dy(r));
  return E.useMemo(() => fh(n, i), [n, i]);
}, Gy = (r) => qy(r);
function Ot(r) {
  return r ? Gy(r) : Ql();
}
const Yy = (r, n) => r === so ? n : n === so ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, fh = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: Yy(r.subscribe, i ?? so)
  };
}, So = ({ api: r, children: n, devToolsVisible: i = !0 }) => (E.useEffect(() => {
  if (!(!i || !r.subscribe))
    return $n.register(r);
}, [r, i]), p.jsx(dh.Provider, { value: r, children: n }));
class hf {
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
const Te = (r) => {
  const n = Ot(), i = E.useMemo(() => new hf(n), [n]), a = E.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (E.useDebugValue(a), a instanceof hf)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, wl = (r, n) => {
  const i = Ot(), a = E.useRef(n);
  E.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = vo(r);
  E.useEffect(() => i.on({ scope: u, event: d }, (h) => a.current(h)), [i, u, d]);
};
function Qy(r, n) {
  function i(a) {
    const u = E.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function hh(r, n) {
  function i(u) {
    const d = r(u);
    return d ? d[n] : null;
  }
  function a(u) {
    let d = !1, h;
    typeof u == "function" ? h = u : u && typeof u == "object" && (d = !!u.optional, h = u.selector);
    const g = i({
      optional: d
    });
    return g ? h ? g(h) : g() : null;
  }
  return {
    [n]: a,
    [`${n}Store`]: i
  };
}
const ph = E.createContext(null), Ky = Qy(ph, "ThreadPrimitive.Viewport"), { useThreadViewport: io, useThreadViewportStore: Jl } = hh(Ky, "useThreadViewport"), Jy = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function Xy(r, n = Zy) {
  Jy(r);
  const i = E.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return E.useDebugValue(i), i;
}
const Zy = (r) => r;
function ev(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? Xy(d, u) : null;
  }
  return n;
}
function tv(r) {
  const n = Ot(), i = Te(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const Ge = ev(tv), qn = (r) => {
  const [, n] = Wt(r.getState);
  return it(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, nv = Pe(({ runtime: r }) => {
  const n = qn(r), i = Yl();
  return it(() => {
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
}), Rs = (r) => {
  const n = we(() => Object.fromEntries(r), [r]), i = th(n, (d) => d, []), a = we(() => Object.keys(i), [i]);
  return {
    state: we(() => {
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
}, gh = Pe(({ runtime: r }) => {
  const n = qn(r);
  return Lt({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), rv = Pe(({ runtime: r, index: n }) => {
  const i = we(() => r.getAttachmentByIndex(n), [r, n]);
  return qt(gh({
    runtime: i
  }));
}), mh = Pe(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = qn(i), u = Yl();
  it(() => {
    const g = [], y = [
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
      g.push(x);
    }
    return () => {
      for (const v of g)
        v();
    };
  }, [i, u, r, n]);
  const d = Rs(a.attachments.map((g, y) => [
    g.id,
    rv({ runtime: i, index: y })
  ])), h = we(() => ({
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
    attachment: (g) => "id" in g ? d.api({ key: g.id }) : d.api(g),
    __internal_getRuntime: () => i
  });
}), sv = Pe(({ runtime: r }) => {
  const n = qn(r);
  return Lt({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), iv = Pe(({ runtime: r, index: n }) => {
  const i = we(() => r.getAttachmentByIndex(n), [r, n]);
  return qt(gh({ runtime: i }));
}), ov = Pe(({ runtime: r, index: n }) => {
  const i = we(() => r.getMessagePartByIndex(n), [r, n]);
  return qt(sv({ runtime: i }));
}), av = Pe(({ runtime: r, threadIdRef: n }) => {
  const i = qn(r), [a, u] = Wt(!1), [d, h] = Wt(!1), g = we(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), y = qt(mh({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: g
  })), v = Rs(i.content.map((_, A) => [
    "toolCallId" in _ && _.toolCallId != null ? `toolCallId-${_.toolCallId}` : `index-${A}`,
    ov({ runtime: r, index: A })
  ])), x = Rs(i.attachments?.map((_, A) => [
    _.id,
    iv({ runtime: r, index: A })
  ]) ?? []), b = we(() => ({
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
  return Lt({
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
    setIsHovering: h,
    __internal_getRuntime: () => r
  }, {
    key: i.id
  });
}), lv = Pe(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = we(() => r.getMessageById(n), [r, n]);
  return qt(av({ runtime: a, threadIdRef: i }));
}), uv = Pe(({ runtime: r }) => {
  const n = qn(r), i = Yl();
  it(() => {
    const g = [], y = [
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
      g.push(x);
    }
    return () => {
      for (const v of g)
        v();
    };
  }, [r]);
  const a = we(() => ({
    get current() {
      return r.getState().threadId;
    }
  }), [r]), u = qt(mh({
    runtime: r.composer,
    threadIdRef: a
  })), d = Rs(n.messages.map((g) => [
    g.id,
    lv({ runtime: r, id: g.id, threadIdRef: a })
  ])), h = we(() => ({
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
    message: (g) => "id" in g ? d.api({ key: g.id }) : d.api(g),
    __internal_getRuntime: () => r
  });
}), cv = Pe(({ runtime: r, id: n }) => {
  const i = we(() => r.getItemById(n), [r, n]);
  return qt(nv({
    runtime: i
  }));
}), dv = Pe(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = qn(r), a = qt(uv({
    runtime: r.main
  })), u = Rs(Object.keys(i.threadItems).map((h) => [
    h,
    cv({ runtime: r, id: h })
  ])), d = we(() => ({
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
      const { index: g, archived: y = !1 } = h, v = y ? d.archivedThreadIds[g] : d.threadIds[g];
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
}), fv = Pe((r) => {
  const n = uh();
  return it(() => r.registerModelContextProvider(n), [r, n]), qt(dv({
    runtime: r.threads,
    __internal_assistantRuntime: r
  }));
}), xl = (r) => {
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
}, hv = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = xl((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: h
      }
    });
  }), a = xl((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: h
      }
    });
  }), u = xl((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: h
      }
    });
  }), d = Ly(() => ({
    isAtBottom: !0,
    scrollToBottom: ({ behavior: h = "auto" } = {}) => {
      for (const g of n)
        g({ behavior: h });
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
}, As = (r) => r, pv = (r) => {
  const n = Jl({ optional: !0 }), [i] = E.useState(() => hv(r));
  return E.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), E.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && As(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), E.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && As(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, yh = ({ children: r, options: n = {} }) => {
  const i = pv(n), [a] = E.useState(() => ({
    useThreadViewport: i
  }));
  return p.jsx(ph.Provider, { value: a, children: r });
}, gv = (r) => r._core?.RenderComponent, mv = ({ children: r, runtime: n }) => {
  const i = Ot({
    threads: fv(n)
  }), a = gv(n);
  return p.jsxs(So, { api: i, children: [a && p.jsx(a, {}), p.jsx(yh, { children: r })] });
}, yv = E.memo(mv), vv = ({ index: r, children: n }) => {
  const i = Ot(), a = Kl({
    message: ro({
      source: "thread",
      query: { type: "index", index: r },
      get: () => i.thread().message({ index: r })
    }),
    composer: ro({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: r }).composer
    }),
    on(u, d) {
      const h = () => i.thread().message({ index: r }), { event: g, scope: y } = vo(u);
      return !ws("composer", y) && !ws("message", y) ? i.on(u, d) : i.on({ scope: "thread", event: g }, (v) => {
        v.messageId === h().getState().id && d(v);
      });
    }
  });
  return p.jsx(So, { api: a, children: n });
}, _v = ({ index: r, children: n }) => {
  const i = Ot(), a = Kl({
    part: ro({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return p.jsx(So, { api: a, children: n });
}, Sv = Pe(({ text: r, isRunning: n }) => {
  const i = we(() => ({
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
}), wv = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = Gl(ah(Sv({ text: r, isRunning: n }))), u = Kl({
    part: ro({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return p.jsx(So, { api: u, children: i });
};
class xv {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new iy(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
    return this._core.threads.getMainThreadRuntimeCore().import(Vl.fromArray(n ?? []));
  }
}
function wo(r) {
  const n = E.useRef(r);
  return E.useEffect(() => {
    n.current = r;
  }), E.useMemo(() => (...i) => n.current?.(...i), []);
}
const Ev = E.createContext(null);
function kv(r) {
  const n = E.useContext(Ev);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: Lw, useSmoothStatusStore: bv } = hh(kv, "useSmoothStatus");
class Cv {
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
const El = Object.freeze({
  type: "running"
}), Tv = (r, n = !1) => {
  const { text: i } = r, a = Te(({ message: x }) => x.id), u = E.useRef(a), [d, h] = E.useState(i), g = bv({ optional: !0 }), y = wo((x) => {
    if (h(x), g) {
      const b = d !== x || r.status.type === "running" ? El : r.status;
      As(g).setState(b, !0);
    }
  });
  E.useEffect(() => {
    if (g) {
      const x = n && (d !== i || r.status.type === "running") ? El : r.status;
      As(g).setState(x, !0);
    }
  }, [g, n, i, d, r.status]);
  const [v] = E.useState(new Cv(i, y));
  return E.useEffect(() => {
    if (!n) {
      v.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(v.targetText)) {
      u.current = a, y(i), v.currentText = i, v.targetText = i, v.stop();
      return;
    }
    v.targetText = i, v.start();
  }, [y, v, a, n, i]), E.useEffect(() => () => {
    v.stop();
  }, [v]), E.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : El
  } : r, [n, d, r, i]);
};
var Iv = /* @__PURE__ */ Symbol.for("react.lazy"), oo = _m[" use ".trim().toString()];
function Rv(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function vh(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === Iv && "_payload" in r && Rv(r._payload);
}
// @__NO_SIDE_EFFECTS__
function _h(r) {
  const n = /* @__PURE__ */ Av(r), i = E.forwardRef((a, u) => {
    let { children: d, ...h } = a;
    vh(d) && typeof oo == "function" && (d = oo(d._payload));
    const g = E.Children.toArray(d), y = g.find(Nv);
    if (y) {
      const v = y.props.children, x = g.map((b) => b === y ? E.Children.count(v) > 1 ? E.Children.only(null) : E.isValidElement(v) ? v.props.children : null : b);
      return /* @__PURE__ */ p.jsx(n, { ...h, ref: u, children: E.isValidElement(v) ? E.cloneElement(v, void 0, x) : null });
    }
    return /* @__PURE__ */ p.jsx(n, { ...h, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var Sh = /* @__PURE__ */ _h("Slot");
// @__NO_SIDE_EFFECTS__
function Av(r) {
  const n = E.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if (vh(u) && typeof oo == "function" && (u = oo(u._payload)), E.isValidElement(u)) {
      const h = jv(u), g = Pv(d, u.props);
      return u.type !== E.Fragment && (g.ref = a ? oh(a, h) : h), E.cloneElement(u, g);
    }
    return E.Children.count(u) > 1 ? E.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var Mv = /* @__PURE__ */ Symbol("radix.slottable");
function Nv(r) {
  return E.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === Mv;
}
function Pv(r, n) {
  const i = { ...n };
  for (const a in n) {
    const u = r[a], d = n[a];
    /^on[A-Z]/.test(a) ? u && d ? i[a] = (...g) => {
      const y = d(...g);
      return u(...g), y;
    } : u && (i[a] = u) : a === "style" ? i[a] = { ...u, ...d } : a === "className" && (i[a] = [u, d].filter(Boolean).join(" "));
  }
  return { ...r, ...i };
}
function jv(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var Lv = [
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
], Mr = Lv.reduce((r, n) => {
  const i = /* @__PURE__ */ _h(`Primitive.${n}`), a = E.forwardRef((u, d) => {
    const { asChild: h, ...g } = u, y = h ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p.jsx(y, { ...g, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function ks(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const wh = (r, n, i = []) => {
  const a = E.forwardRef((u, d) => {
    const h = {}, g = {};
    Object.keys(u).forEach((v) => {
      i.includes(v) ? h[v] = u[v] : g[v] = u[v];
    });
    const y = n(h) ?? void 0;
    return p.jsx(Mr.button, { type: "button", ...g, ref: d, disabled: g.disabled || !y, onClick: ks(g.onClick, y) });
  });
  return a.displayName = r, a;
};
function Ov(r, n = globalThis?.document) {
  const i = wo(r);
  E.useEffect(() => {
    const a = (u) => {
      u.key === "Escape" && i(u);
    };
    return n.addEventListener("keydown", a, { capture: !0 }), () => n.removeEventListener("keydown", a, { capture: !0 });
  }, [i, n]);
}
const Os = (r) => {
  const n = E.useRef(void 0);
  return E.useCallback((a) => {
    n.current && n.current(), a && (n.current = r(a));
  }, [r]);
}, xh = (r, n) => {
  const i = E.useCallback((a) => {
    if (!r)
      return;
    const u = r(), d = () => {
      const g = n ? n(a) : a.offsetHeight;
      u.setHeight(g);
    }, h = new ResizeObserver(d);
    return h.observe(a), d(), () => {
      h.disconnect(), u.unregister();
    };
  }, [r, n]);
  return Os(i);
}, pf = E.createContext(!1), gf = (r, n) => {
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
}, Eh = ({ children: r, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const a = Te(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: y, message: v }) => v.isLast && v.role === "assistant" && v.index >= 1 && y.messages.at(v.index - 1)?.role === "user"
  ), u = Jl({ optional: !0 }), d = E.useContext(pf), h = E.useCallback((y) => {
    if (!u || d)
      return;
    const v = () => {
      const x = u.getState();
      if (x.turnAnchor === "top" && a) {
        const { viewport: b, inset: _, userMessage: A } = x.height, P = gf(n, y), N = gf(i, y), U = A <= P ? A : N, B = Math.max(0, b - _ - U);
        y.style.minHeight = `${B}px`, y.style.flexShrink = "0", y.style.transition = "min-height 0s";
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
  ]), g = Os(h);
  return p.jsx(pf.Provider, { value: !0, children: p.jsx(Sh, { ref: g, children: r }) });
};
Eh.displayName = "ThreadPrimitive.ViewportSlack";
const zv = () => {
  const r = Ot(), n = Te(() => r.message()), i = E.useCallback((a) => {
    const u = () => {
      n.setIsHovering(!0);
    }, d = () => {
      n.setIsHovering(!1);
    };
    return a.addEventListener("mouseenter", u), a.addEventListener("mouseleave", d), a.matches(":hover") && queueMicrotask(() => n.setIsHovering(!0)), () => {
      a.removeEventListener("mouseenter", u), a.removeEventListener("mouseleave", d), n.setIsHovering(!1);
    };
  }, [n]);
  return Os(i);
}, Dv = () => {
  const r = io((u) => u.turnAnchor), n = io((u) => u.registerUserMessageHeight), i = Te(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = E.useCallback((u) => u.offsetHeight, []);
  return xh(i ? n : null, a);
}, Xl = E.forwardRef((r, n) => {
  const i = zv(), a = Dv(), u = _o(n, i, a);
  return p.jsx(Eh, { children: p.jsx(Mr.div, { ...r, ref: u }) });
});
Xl.displayName = "MessagePrimitive.Root";
const Bv = () => Te(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), kh = E.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = Tv(Bv(), r);
  return p.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
kh.displayName = "MessagePartPrimitive.Text";
const Fv = () => Te(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), bh = E.forwardRef((r, n) => {
  const { image: i } = Fv();
  return p.jsx(Mr.img, { src: i, ...r, ref: n });
});
bh.displayName = "MessagePartPrimitive.Image";
const Ch = ({ children: r }) => Te(({ part: i }) => i.status.type === "running") ? r : null;
Ch.displayName = "MessagePartPrimitive.InProgress";
const mf = (r) => Symbol.iterator in r, yf = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), vf = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, Uv = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function $v(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : mf(r) && mf(n) ? yf(r) && yf(n) ? vf(r, n) : Uv(r, n) : vf(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function Hv(r) {
  const n = Nt.useRef(void 0);
  return (i) => {
    const a = r(i);
    return $v(n.current, a) ? n.current : n.current = a;
  };
}
const _f = (r) => {
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
}, Vv = (r) => {
  const n = [], i = _f("toolGroup"), a = _f("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, Wv = () => {
  const r = Te(Hv((n) => n.message.parts.map((i) => i.type)));
  return E.useMemo(() => r.length === 0 ? [] : Vv(r), [r]);
}, qv = ({ Fallback: r, ...n }) => {
  const i = Te(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? p.jsx(i, { ...n }) : null;
}, rn = {
  Text: () => p.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [p.jsx(kh, {}), p.jsx(Ch, { children: p.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => p.jsx(bh, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, Gv = ({ components: { Text: r = rn.Text, Reasoning: n = rn.Reasoning, Image: i = rn.Image, Source: a = rn.Source, File: u = rn.File, Unstable_Audio: d = rn.Unstable_Audio, tools: h = {} } = {} }) => {
  const g = Ot(), y = Te(({ part: x }) => x), v = y.type;
  if (v === "tool-call") {
    const x = g.part().addToolResult, b = g.part().resumeToolCall;
    if ("Override" in h)
      return p.jsx(h.Override, { ...y, addResult: x, resume: b });
    const _ = h.by_name?.[y.toolName] ?? h.Fallback;
    return p.jsx(qv, { ...y, Fallback: _, addResult: x, resume: b });
  }
  if (y.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (v) {
    case "text":
      return p.jsx(r, { ...y });
    case "reasoning":
      return p.jsx(n, { ...y });
    case "source":
      return p.jsx(a, { ...y });
    case "image":
      return p.jsx(i, { ...y });
    case "file":
      return p.jsx(u, { ...y });
    case "audio":
      return p.jsx(d, { ...y });
    case "data":
      return null;
    default:
      const x = v;
      throw new Error(`Unknown message part type: ${x}`);
  }
}, eo = E.memo(({ index: r, components: n }) => p.jsx(_v, { index: r, children: p.jsx(Gv, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
eo.displayName = "MessagePrimitive.PartByIndex";
const Yv = ({ status: r, component: n }) => p.jsx(wv, { text: "", isRunning: r.type === "running", children: p.jsx(n, { type: "text", text: "", status: r }) }), Qv = Object.freeze({
  type: "complete"
}), Kv = ({ components: r }) => {
  const n = Te((i) => i.message.status ?? Qv);
  return r?.Empty ? p.jsx(r.Empty, { status: n }) : p.jsx(Yv, { status: n, component: r?.Text ?? rn.Text });
}, Jv = E.memo(Kv, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), Zl = ({ components: r }) => {
  const n = Te(({ message: u }) => u.parts.length), i = Wv(), a = E.useMemo(() => n === 0 ? p.jsx(Jv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return p.jsx(eo, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? rn.ToolGroup;
      return p.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, g) => p.jsx(eo, { index: u.startIndex + g, components: r }, g)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? rn.ReasoningGroup;
      return p.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, g) => p.jsx(eo, { index: u.startIndex + g, components: r }, g)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return p.jsx(p.Fragment, { children: a });
};
Zl.displayName = "MessagePrimitive.Parts";
const Th = ({ children: r }) => Te(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
Th.displayName = "MessagePrimitive.Error";
const Ih = () => {
  const r = Ot(), n = Te((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = E.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, Xv = wh("ComposerPrimitive.Send", Ih), Rh = E.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = Ih(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return p.jsx(Mr.form, { ...n, ref: i, onSubmit: ks(r, u) });
});
Rh.displayName = "ComposerPrimitive.Root";
function Rl() {
  return Rl = Object.assign ? Object.assign.bind() : function(r) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }
    return r;
  }, Rl.apply(null, arguments);
}
function Zv(r, n) {
  if (r == null) return {};
  var i = {};
  for (var a in r) if ({}.hasOwnProperty.call(r, a)) {
    if (n.indexOf(a) !== -1) continue;
    i[a] = r[a];
  }
  return i;
}
var e_ = E.useLayoutEffect, t_ = function(n) {
  var i = Nt.useRef(n);
  return e_(function() {
    i.current = n;
  }), i;
}, Sf = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, n_ = function(n, i) {
  var a = Nt.useRef();
  return Nt.useCallback(function(u) {
    n.current = u, a.current && Sf(a.current, null), a.current = i, i && Sf(i, u);
  }, [i]);
}, wf = {
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
}, r_ = function(n) {
  Object.keys(wf).forEach(function(i) {
    n.style.setProperty(i, wf[i], "important");
  });
}, xf = r_, st = null, Ef = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function s_(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), st || (st = document.createElement("textarea"), st.setAttribute("tabindex", "-1"), st.setAttribute("aria-hidden", "true"), xf(st)), st.parentNode === null && document.body.appendChild(st);
  var u = r.paddingSize, d = r.borderSize, h = r.sizingStyle, g = h.boxSizing;
  Object.keys(h).forEach(function(_) {
    var A = _;
    st.style[A] = h[A];
  }), xf(st), st.value = n;
  var y = Ef(st, r);
  st.value = n, y = Ef(st, r), st.value = "x";
  var v = st.scrollHeight - u, x = v * i;
  g === "border-box" && (x = x + u + d), y = Math.max(x, y);
  var b = v * a;
  return g === "border-box" && (b = b + u + d), y = Math.min(b, y), [y, v];
}
var kf = function() {
}, i_ = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, o_ = [
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
], a_ = !!document.documentElement.currentStyle, l_ = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = i_(o_, i), u = a.boxSizing;
  if (u === "")
    return null;
  a_ && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), h = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: h
  };
}, u_ = l_;
function eu(r, n, i) {
  var a = t_(i);
  E.useLayoutEffect(function() {
    var u = function(h) {
      return a.current(h);
    };
    if (r)
      return r.addEventListener(n, u), function() {
        return r.removeEventListener(n, u);
      };
  }, []);
}
var c_ = function(n, i) {
  eu(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, d_ = function(n) {
  eu(window, "resize", n);
}, f_ = function(n) {
  eu(document.fonts, "loadingdone", n);
}, h_ = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], p_ = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, h = n.onChange, g = h === void 0 ? kf : h, y = n.onHeightChange, v = y === void 0 ? kf : y, x = Zv(n, h_), b = x.value !== void 0, _ = E.useRef(null), A = n_(_, i), P = E.useRef(0), N = E.useRef(), U = function() {
    var X = _.current, le = a && N.current ? N.current : u_(X);
    if (le) {
      N.current = le;
      var fe = s_(le, X.value || X.placeholder || "x", d, u), K = fe[0], D = fe[1];
      P.current !== K && (P.current = K, X.style.setProperty("height", K + "px", "important"), v(K, {
        rowHeight: D
      }));
    }
  }, B = function(X) {
    b || U(), g(X);
  };
  return E.useLayoutEffect(U), c_(_, function() {
    if (!b) {
      var J = _.current.value;
      requestAnimationFrame(function() {
        var X = _.current;
        X && J !== X.value && U();
      });
    }
  }), d_(U), f_(U), /* @__PURE__ */ E.createElement("textarea", Rl({}, x, {
    onChange: B,
    ref: A
  }));
}, g_ = /* @__PURE__ */ E.forwardRef(p_);
const Ah = (r) => {
  const n = wo(r), i = io((a) => a.onScrollToBottom);
  E.useEffect(() => i(n), [i, n]);
}, Mh = E.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: h = !0, cancelOnEscape: g = !0, unstable_focusOnRunStart: y = !0, unstable_focusOnScrollToBottom: v = !0, unstable_focusOnThreadSwitched: x = !0, addAttachmentOnPaste: b = !0, ..._ }, A) => {
  const P = Ot(), N = Te(({ composer: H }) => H.isEditing ? H.text : ""), U = n ? Sh : g_, B = Te(({ thread: H, composer: se }) => H.isDisabled || se.dictation?.inputDisabled) || i, J = E.useRef(null), X = _o(A, J);
  Ov((H) => {
    if (!g || !J.current?.contains(H.target))
      return;
    const se = P.composer();
    se.getState().canCancel && (se.cancel(), H.preventDefault());
  });
  const le = (H) => {
    B || !h || H.nativeEvent.isComposing || H.key === "Enter" && H.shiftKey === !1 && (P.thread().getState().isRunning || (H.preventDefault(), J.current?.closest("form")?.requestSubmit()));
  }, fe = async (H) => {
    if (!b)
      return;
    const se = P.thread().getState().capabilities, ge = Array.from(H.clipboardData?.files || []);
    if (se.attachments && ge.length > 0)
      try {
        H.preventDefault(), await Promise.all(ge.map((ve) => P.composer().addAttachment(ve)));
      } catch (ve) {
        console.error("Error adding attachment:", ve);
      }
  }, K = r && !B, D = E.useCallback(() => {
    const H = J.current;
    !H || !K || (H.focus({ preventScroll: !0 }), H.setSelectionRange(H.value.length, H.value.length));
  }, [K]);
  return E.useEffect(() => D(), [D]), Ah(() => {
    P.composer().getState().type === "thread" && v && D();
  }), E.useEffect(() => {
    if (!(P.composer().getState().type !== "thread" || !y))
      return P.on("thread.run-start", D);
  }, [y, D, P]), E.useEffect(() => {
    if (!(P.composer().getState().type !== "thread" || !x))
      return P.on("thread-list-item.switched-to", D);
  }, [x, D, P]), p.jsx(U, { name: "input", value: N, ..._, ref: X, disabled: B, onChange: ks(a, (H) => {
    P.composer().getState().isEditing && Il(() => {
      P.composer().setText(H.target.value);
    });
  }), onKeyDown: ks(u, le), onPaste: ks(d, fe) });
});
Mh.displayName = "ComposerPrimitive.Input";
const m_ = () => {
  const r = Ot(), n = Te(({ composer: a }) => !a.canCancel), i = E.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, y_ = wh("ComposerPrimitive.Cancel", m_), Nh = E.forwardRef((r, n) => p.jsx(Mr.div, { ...r, ref: n }));
Nh.displayName = "ThreadPrimitive.Root";
const v_ = (r) => Te(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), Al = ({ children: r, ...n }) => v_(n) ? r : null;
Al.displayName = "ThreadPrimitive.If";
const __ = (r) => {
  const n = wo(r), i = E.useCallback((a) => {
    const u = new ResizeObserver(() => {
      n();
    }), d = new MutationObserver((h) => {
      h.some((y) => y.type !== "attributes" || y.attributeName !== "style") && n();
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
  return Os(i);
}, S_ = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = E.useRef(null), d = Jl();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const h = E.useRef(0), g = E.useRef(null), y = E.useCallback((A) => {
    const P = u.current;
    P && (g.current = A, P.scrollTo({ top: P.scrollHeight, behavior: A }));
  }, []), v = () => {
    const A = u.current;
    if (!A)
      return;
    const P = d.getState().isAtBottom, N = Math.abs(A.scrollHeight - A.scrollTop - A.clientHeight) < 1 || A.scrollHeight <= A.clientHeight;
    !N && h.current < A.scrollTop || (N && (g.current = null), (N || g.current === null) && N !== P && As(d).setState({
      isAtBottom: N
    })), h.current = A.scrollTop;
  }, x = __(() => {
    const A = g.current;
    A ? y(A) : r && d.getState().isAtBottom && y("instant"), v();
  }), b = Os((A) => (A.addEventListener("scroll", v), () => {
    A.removeEventListener("scroll", v);
  }));
  return Ah(({ behavior: A }) => {
    y(A);
  }), wl("thread.run-start", () => {
    n && (g.current = "auto", requestAnimationFrame(() => {
      y("auto");
    }));
  }), wl("thread.initialize", () => {
    i && (g.current = "instant", requestAnimationFrame(() => {
      y("instant");
    }));
  }), wl("thread-list-item.switched-to", () => {
    a && (g.current = "instant", requestAnimationFrame(() => {
      y("instant");
    }));
  }), _o(x, b, u);
}, w_ = () => {
  const r = io((i) => i.registerViewport), n = E.useCallback((i) => i.clientHeight, []);
  return xh(r, n);
}, Ph = E.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, h) => {
  const g = S_({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), y = w_(), v = _o(h, g, y);
  return p.jsx(Mr.div, { ...d, ref: v, children: u });
});
Ph.displayName = "ThreadPrimitive.ViewportScrollable";
const jh = E.forwardRef(({ turnAnchor: r, ...n }, i) => p.jsx(yh, { options: { turnAnchor: r }, children: p.jsx(Ph, { ...n, ref: i }) }));
jh.displayName = "ThreadPrimitive.Viewport";
const Lh = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, x_ = () => null, E_ = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? x_;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, k_ = ({ components: r }) => {
  const n = Te(({ message: u }) => u.role), i = Te(({ message: u }) => u.composer.isEditing), a = E_(r, n, i);
  return p.jsx(a, {});
}, Oh = E.memo(({ index: r, components: n }) => p.jsx(vv, { index: r, children: p.jsx(k_, { components: n }) }), (r, n) => r.index === n.index && Lh(r.components, n.components));
Oh.displayName = "ThreadPrimitive.MessageByIndex";
const zh = ({ components: r }) => {
  const n = Te(({ thread: a }) => a.messages.length);
  return E.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => p.jsx(Oh, { index: u, components: r }, u)), [n, r]);
};
zh.displayName = "ThreadPrimitive.Messages";
const b_ = E.memo(zh, (r, n) => Lh(r.components, n.components)), C_ = 1, ao = Object.freeze({
  product_card: "product_card",
  product_carousel: "product_carousel"
}), Ms = Object.freeze({
  [ao.product_card]: "display_product_card",
  [ao.product_carousel]: "display_product_carousel"
}), T_ = Object.freeze(
  Object.fromEntries(
    Object.entries(Ms).map(([r, n]) => [n, r])
  )
), Dh = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, Bh = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, I_ = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), zs = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Wn = (r, n = "") => typeof r != "string" ? n : r.trim() || n, Er = (r) => Wn(r) || null, Fh = (r) => {
  if (!zs(r))
    return null;
  const n = {
    product_id: Er(r.product_id),
    handle: Er(r.handle),
    variant_id: Er(r.variant_id)
  };
  return !n.product_id && !n.handle && !n.variant_id ? null : n;
}, R_ = (r, n = 4) => Array.isArray(r) ? r.map(Fh).filter(Boolean).slice(0, n) : [], A_ = (r) => {
  if (!zs(r))
    return null;
  const n = Fh(r.product_ref);
  return n ? {
    eyebrow: Wn(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: Er(r.reason),
    note: Er(r.note || r.ritual),
    ctaLabel: Wn(r.cta_label, "View crystal"),
    product_ref: n
  } : null;
}, M_ = (r) => {
  if (!zs(r))
    return null;
  const n = R_(r.product_refs, 4);
  return n.length === 0 ? null : {
    eyebrow: Wn(r.eyebrow || r.kicker, "Matched for you"),
    title: Wn(r.title, "Recommended crystals"),
    reason: Er(r.reason || r.description),
    product_refs: n
  };
}, N_ = Object.freeze({
  [ao.product_card]: {
    toolName: Ms.product_card,
    normalizeProps: A_
  },
  [ao.product_carousel]: {
    toolName: Ms.product_carousel,
    normalizeProps: M_
  }
}), tu = (r, n = "component") => {
  if (!zs(r))
    return null;
  const i = Wn(
    r.component || r.componentType || T_[r.toolName]
  ), a = N_[i];
  if (!a)
    return null;
  const u = a.normalizeProps(
    r.props || r.result?.props || r.result || r.args?.props || r.args || r
  );
  if (!u)
    return null;
  const d = Wn(r.id || r.toolCallId, `${a.toolName}-${n}`);
  return {
    type: "component",
    component: i,
    toolName: a.toolName,
    id: d,
    version: C_,
    props: u
  };
}, xo = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = tu(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, Uh = (r) => {
  const n = Array.isArray(r) ? r : zs(r) && Array.isArray(r.components) ? r.components : [];
  return xo([], n);
}, bf = (r, n = "component") => {
  const i = tu(r, n);
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
}, P_ = (r) => tu(r), $h = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}, j_ = (r = "") => {
  let n = String(r || "");
  const i = [], a = (u) => {
    const d = [...n.matchAll(u)];
    if (d.length !== 0) {
      for (const h of d) {
        const g = $h(h[1]);
        g && i.push(g);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(Dh()), a(Bh()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    payloads: i
  };
}, L_ = (r = "") => {
  const n = String(r || ""), i = [], a = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi;
  let u = 0, d;
  for (; (d = a.exec(n)) !== null; ) {
    d.index > u && i.push({
      type: "text",
      value: n.slice(u, d.index)
    });
    const h = d[0], g = $h(d[1] || d[2] || "");
    g ? i.push({
      type: "payload",
      value: g
    }) : i.push({
      type: "text",
      value: h
    }), u = d.index + h.length;
  }
  return u < n.length && i.push({
    type: "text",
    value: n.slice(u)
  }), i;
}, Hh = (r = "") => {
  const { answer: n, payloads: i } = j_(r);
  let a = [];
  for (const u of i)
    a = xo(a, Uh(u));
  return {
    answer: n,
    components: a
  };
}, O_ = (r = "") => {
  const n = String(r || "").toLowerCase();
  for (let i = 0; i < n.length; i += 1)
    for (const { marker: a, minPrefixLength: u } of I_) {
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
}, z_ = (r = "") => {
  const n = Dh(), i = Bh();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = O_(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, D_ = "section-rendering-askcrystal-chat-product-card", lo = /* @__PURE__ */ new Map(), Ki = /* @__PURE__ */ new Map(), Cf = /* @__PURE__ */ new Map(), Ji = /* @__PURE__ */ new Map(), Vh = {
  "--product-card-gap": "12px",
  "--product-card-alignment": "stretch",
  "--padding-block-start": "0px",
  "--padding-block-end": "0px",
  "--padding-inline-start": "0px",
  "--padding-inline-end": "0px"
};
function B_(r) {
  return typeof window > "u" ? r : /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `http://localhost:8787${r}` : r;
}
function nu(r) {
  return P_({
    toolName: r.toolName,
    result: r.result,
    args: r.args,
    toolCallId: r.toolCallId
  });
}
function F_(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n)
    return null;
  if (/^\d+$/.test(n))
    return n;
  const i = n.match(/\/(\d+)(?:\?.*)?$/);
  return i ? i[1] : null;
}
function Cr(r) {
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
function U_(r) {
  const n = Cr(r);
  return n ? JSON.stringify({
    handle: n.handle || "",
    product_id: n.productId || "",
    variant_id: n.variantId || ""
  }) : "";
}
async function $_(r) {
  const n = Cr(r);
  if (!n)
    throw new Error("Missing product reference");
  if (n.handle)
    return n;
  const i = U_(r);
  if (!i)
    throw new Error("Missing product reference");
  const a = Cf.get(i);
  if (a)
    return a;
  if (!Ji.has(i)) {
    const u = fetch(B_("/apps/askcrystal/catalog/resolve-product-card"), {
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
      const h = await d.json().catch(() => null);
      if (!d.ok || !h?.ok || !h?.product?.handle)
        throw new Error(h?.error || `Failed to resolve product reference (${d.status})`);
      const g = Cr({
        product_id: h.product.product_id || n.productId,
        handle: h.product.handle,
        variant_id: h.product.variant_id || n.variantId,
        title: h.product.title || "",
        image: h.product.image || "",
        imageAlt: h.product.imageAlt || "",
        price: h.product.price || "",
        compareAtPrice: h.product.compareAtPrice || ""
      });
      return Cf.set(i, g), g;
    }).finally(() => {
      Ji.delete(i);
    });
    Ji.set(i, u);
  }
  return Ji.get(i);
}
function H_(r, n) {
  const i = Cr(r);
  if (!i?.handle || typeof window > "u")
    return null;
  const a = typeof window.Shopify?.routes?.root == "string" ? window.Shopify.routes.root : "/", u = new URL(`products/${i.handle}`, new URL(a, window.location.origin));
  u.searchParams.set("section_id", D_), u.searchParams.set("askcrystal_handle", i.handle);
  const d = F_(i.variantId);
  return d && u.searchParams.set("variant", d), typeof n == "string" && n.trim() && u.searchParams.set("askcrystal_cta", n.trim()), u.toString();
}
function V_(r) {
  const n = typeof r?.handle == "string" ? r.handle.trim() : "";
  return n ? `/products/${n}` : null;
}
function W_(r) {
  const n = typeof r?.title == "string" ? r.title.trim() : "";
  if (n)
    return n;
  const i = typeof r?.handle == "string" ? r.handle.trim() : "";
  return i ? i.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (a) => a.toUpperCase()) : "Recommended crystal";
}
function q_(r) {
  if (!r)
    return !1;
  const n = !!r.querySelector("a[href]"), i = !!r.querySelector("img, .askcrystal-chat-product-card__placeholder");
  return n && i;
}
function G_(r) {
  const i = new DOMParser().parseFromString(r, "text/html").querySelector("[data-askcrystal-native-product-card]");
  return q_(i) ? i.outerHTML.trim() : null;
}
async function Y_(r) {
  if (!r)
    throw new Error("Missing product card request URL");
  const n = lo.get(r);
  if (n)
    return n;
  if (!Ki.has(r)) {
    const i = fetch(r, {
      headers: {
        accept: "text/html"
      },
      credentials: "same-origin"
    }).then(async (a) => {
      if (!a.ok)
        throw new Error(`Failed to load native product card (${a.status})`);
      const u = await a.text(), d = G_(u);
      if (!d)
        throw new Error("Native product card markup was not found in the section response");
      return lo.set(r, d), d;
    }).finally(() => {
      Ki.delete(r);
    });
    Ki.set(r, i);
  }
  return Ki.get(r);
}
function Wh({ eyebrow: r, title: n, children: i, className: a = "" }) {
  return /* @__PURE__ */ p.jsxs("section", { className: `ac-tool ${a}`.trim(), children: [
    /* @__PURE__ */ p.jsxs("header", { className: "ac-tool__header", children: [
      r ? /* @__PURE__ */ p.jsx("p", { className: "ac-tool__eyebrow", children: r }) : null,
      n ? /* @__PURE__ */ p.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function Q_({ productRef: r, ctaLabel: n }) {
  const i = V_(r), a = W_(r), u = n || "View", d = typeof r?.image == "string" ? r.image.trim() : "", h = typeof r?.imageAlt == "string" ? r.imageAlt.trim() : a, g = /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx("div", { className: "askcrystal-chat-product-card__media", children: d ? /* @__PURE__ */ p.jsx("img", { className: "askcrystal-chat-product-card__image", src: d, alt: h, loading: "lazy" }) : /* @__PURE__ */ p.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ p.jsxs("div", { className: "askcrystal-chat-product-card__body", children: [
      /* @__PURE__ */ p.jsx("product-title", { className: "askcrystal-chat-product-card__title", children: /* @__PURE__ */ p.jsx("span", { className: "title-text", children: a }) }),
      /* @__PURE__ */ p.jsxs("div", { className: "askcrystal-chat-product-card__meta", children: [
        r?.price ? /* @__PURE__ */ p.jsxs("div", { className: "askcrystal-chat-product-card__price-group", children: [
          /* @__PURE__ */ p.jsx("span", { className: "askcrystal-chat-product-card__price askcrystal-chat-product-card__price--hydrated", children: r.price }),
          r.compareAtPrice ? /* @__PURE__ */ p.jsx("span", { className: "askcrystal-chat-product-card__compare", children: r.compareAtPrice }) : null
        ] }) : null,
        /* @__PURE__ */ p.jsx("span", { className: "askcrystal-chat-product-card__cta", children: u })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ p.jsx(
    "div",
    {
      className: "askcrystal-chat-product-card",
      "data-askcrystal-native-product-card": !0,
      "data-askcrystal-render-mode": "hydrated",
      children: /* @__PURE__ */ p.jsx(
        "div",
        {
          className: "product-card askcrystal-chat-product-card__card",
          "data-product-id": r?.productId || void 0,
          children: /* @__PURE__ */ p.jsx(
            "div",
            {
              className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
              style: Vh,
              children: i ? /* @__PURE__ */ p.jsx("a", { className: "askcrystal-chat-product-card__surface", href: i, children: g }) : /* @__PURE__ */ p.jsx("div", { className: "askcrystal-chat-product-card__surface", children: g })
            }
          )
        }
      )
    }
  );
}
function K_() {
  return /* @__PURE__ */ p.jsx(
    "div",
    {
      className: "askcrystal-chat-product-card ac-product-card-skeleton",
      "data-askcrystal-native-product-card": !0,
      "data-askcrystal-render-mode": "loading",
      "aria-hidden": "true",
      children: /* @__PURE__ */ p.jsx("div", { className: "product-card askcrystal-chat-product-card__card", children: /* @__PURE__ */ p.jsx(
        "div",
        {
          className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
          style: Vh,
          children: /* @__PURE__ */ p.jsxs("div", { className: "askcrystal-chat-product-card__surface", children: [
            /* @__PURE__ */ p.jsx("div", { className: "askcrystal-chat-product-card__media ac-product-card-skeleton__media", children: /* @__PURE__ */ p.jsx("span", { className: "ac-product-card-skeleton__crystal" }) }),
            /* @__PURE__ */ p.jsxs("div", { className: "askcrystal-chat-product-card__body ac-product-card-skeleton__body", children: [
              /* @__PURE__ */ p.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--title" }),
              /* @__PURE__ */ p.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--short" }),
              /* @__PURE__ */ p.jsxs("span", { className: "ac-product-card-skeleton__meta", children: [
                /* @__PURE__ */ p.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--price" }),
                /* @__PURE__ */ p.jsx("span", { className: "ac-product-card-skeleton__pill" })
              ] })
            ] })
          ] })
        }
      ) })
    }
  );
}
function qh({ productRef: r, ctaLabel: n, variant: i = "block" }) {
  const [a, u] = E.useState(() => Cr(r)), d = H_(a, n), [h, g] = E.useState(() => d && lo.get(d) || null), [y, v] = E.useState(null), x = i === "carousel" ? " ac-tool-product-native--carousel" : "";
  return E.useEffect(() => {
    let b = !0;
    return $_(r).then((_) => {
      b && E.startTransition(() => {
        u(_);
      });
    }).catch((_) => {
      b && E.startTransition(() => {
        v(_), u(Cr(r));
      });
    }), () => {
      b = !1;
    };
  }, [r]), E.useEffect(() => {
    let b = !0;
    if (!d)
      return E.startTransition(() => {
        g(null), v(new Error("Missing product card request URL"));
      }), () => {
        b = !1;
      };
    const _ = lo.get(d);
    return _ ? (E.startTransition(() => {
      g(_), v(null);
    }), () => {
      b = !1;
    }) : (E.startTransition(() => {
      g(null), v(null);
    }), Y_(d).then((A) => {
      b && E.startTransition(() => {
        g(A), v(null);
      });
    }).catch((A) => {
      b && (typeof console < "u" && typeof console.warn == "function" && console.warn("[AskCrystal] Native product card render fell back to hydrated shell.", {
        requestUrl: d,
        error: A,
        productRef: a
      }), E.startTransition(() => {
        g(null), v(A);
      }));
    }), () => {
      b = !1;
    });
  }, [d, a]), h ? /* @__PURE__ */ p.jsx(
    "div",
    {
      className: `ac-tool-product-native ac-tool-product-native--native${x}`,
      dangerouslySetInnerHTML: { __html: h }
    }
  ) : /* @__PURE__ */ p.jsx(
    "div",
    {
      className: `ac-tool-product-native${x} ${y ? "ac-tool-product-native--fallback" : "ac-tool-product-native--loading"}`.trim(),
      "aria-busy": y ? void 0 : "true",
      "aria-live": "polite",
      children: y ? /* @__PURE__ */ p.jsx(Q_, { productRef: a || r, ctaLabel: n }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        /* @__PURE__ */ p.jsx("span", { className: "ac-tool-product-native__loading-label", children: "Polishing the storefront card..." }),
        /* @__PURE__ */ p.jsx(K_, {})
      ] })
    }
  );
}
function J_(r) {
  const n = nu(r);
  if (!n)
    return null;
  const { ctaLabel: i, eyebrow: a, note: u, product_ref: d, reason: h } = n.props;
  return /* @__PURE__ */ p.jsxs("section", { className: "ac-tool-product-block", children: [
    a || h || u ? /* @__PURE__ */ p.jsxs("div", { className: "ac-tool-product-context", children: [
      a ? /* @__PURE__ */ p.jsx("p", { className: "ac-tool-product-context__eyebrow", children: a }) : null,
      h ? /* @__PURE__ */ p.jsx("p", { className: "ac-tool-product-context__reason", children: h }) : null,
      u ? /* @__PURE__ */ p.jsx("p", { className: "ac-tool-product-context__note", children: u }) : null
    ] }) : null,
    /* @__PURE__ */ p.jsx(qh, { productRef: d, ctaLabel: i })
  ] });
}
function X_(r) {
  const n = nu(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    reason: u,
    product_refs: d
  } = n.props;
  return /* @__PURE__ */ p.jsxs(Wh, { eyebrow: i, title: a, className: "ac-tool--carousel", children: [
    u ? /* @__PURE__ */ p.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    /* @__PURE__ */ p.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: d.map((h, g) => {
      const y = h.product_id || h.handle || h.variant_id || g;
      return /* @__PURE__ */ p.jsx("div", { className: "ac-tool-carousel__item", role: "listitem", children: /* @__PURE__ */ p.jsx(qh, { productRef: h, ctaLabel: "View", variant: "carousel" }) }, y);
    }) })
  ] });
}
function Z_(r) {
  const n = nu(r);
  return n ? /* @__PURE__ */ p.jsx(Wh, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ p.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function eS({ children: r }) {
  return /* @__PURE__ */ p.jsx("div", { className: "ac-tool-group", children: r });
}
const tS = {
  [Ms.product_card]: J_,
  [Ms.product_carousel]: X_
}, nS = {
  tools: {
    by_name: tS,
    Fallback: Z_
  },
  ToolGroup: eS
}, Gh = "[data-askcrystal-homepage-root]", uo = /* @__PURE__ */ new Map(), rS = "askcrystal-main-thread", sS = "http://localhost:8787", ru = Object.freeze([]), Ml = "askcrystal-theme-session-id", Yh = "askcrystal-theme-chat-sessions-v1", Qh = "askcrystal-theme-active-session-id", Nl = "askcrystal-theme-pending-prompt-v1", iS = "askcrystal:session-registry", Tf = "askcrystal:session-select", If = "askcrystal:session-create", Rf = "askcrystal:session-delete", Eo = 24, oS = "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538";
let Af = 0;
const aS = 7, Kh = Nt.createContext({
  sendPrompt: () => {
  },
  onCancel: () => {
  },
  isRunning: !1
});
function Jh() {
  return Nt.useContext(Kh);
}
function lS(r) {
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
function kl(r) {
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
const Pl = /```askcrystal-suggestions\s*([\s\S]*?)```|<askcrystal-suggestions>\s*([\s\S]*?)<\/askcrystal-suggestions>/gi, uS = [
  "```askcrystal-suggestions",
  "<askcrystal-suggestions"
];
function cS(r) {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function dS(r = "") {
  let n = String(r || "");
  const i = [], a = [...n.matchAll(Pl)];
  for (const u of a) {
    const d = cS(u[1] || u[2] || ""), h = Fe(d?.suggestions || d || []);
    i.push(...h);
  }
  return n = n.replace(Pl, "").replace(/\n{3,}/g, `

`).trim(), {
    answer: n,
    suggestions: Fe(i)
  };
}
function co(r = "") {
  let n = String(r || "").replace(Pl, "");
  const i = n.toLowerCase(), a = uS.map((u) => i.indexOf(u)).filter((u) => u >= 0);
  return a.length > 0 && (n = n.slice(0, Math.min(...a))), n.trimEnd();
}
function Xh() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.localStorage < "u";
  } catch {
    return !1;
  }
}
function jl(r) {
  if (!Xh()) return "";
  try {
    return window.localStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function fo(r, n) {
  if (Xh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.localStorage.removeItem(r);
        return;
      }
      window.localStorage.setItem(r, n);
    } catch {
    }
}
function Zh() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.sessionStorage < "u";
  } catch {
    return !1;
  }
}
function fS(r) {
  if (!Zh()) return "";
  try {
    return window.sessionStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function ep(r, n) {
  if (Zh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.sessionStorage.removeItem(r);
        return;
      }
      window.sessionStorage.setItem(r, n);
    } catch {
    }
}
function hS(r) {
  return r === "chat" ? "chat" : "home";
}
function pS() {
  if (typeof window > "u") return "";
  try {
    const r = new URLSearchParams(window.location.search), n = r.get("askcrystal") || r.get("mode");
    if (n === "chat") return "chat";
    if (n === "home") return "home";
  } catch {
  }
  return "";
}
function tp(r = {}) {
  return pS() || hS(r.displayMode);
}
function np(r = {}) {
  return (typeof r.chatPageUrl == "string" ? r.chatPageUrl.trim() : "") || "/?askcrystal=chat";
}
function gS(r, n) {
  const i = typeof n == "string" ? n.trim() : "";
  return !i || typeof window > "u" ? !1 : (ep(Nl, JSON.stringify({
    prompt: i,
    createdAt: Date.now()
  })), window.location.assign(np(r)), !0);
}
function mS() {
  const r = fS(Nl);
  if (!r) return "";
  ep(Nl, "");
  const n = rp(r, null), i = typeof n?.prompt == "string" ? n.prompt.trim() : "", a = Number(n?.createdAt), u = Number.isFinite(a) ? Date.now() - a < 300 * 1e3 : !0;
  return i && u ? i : "";
}
function rp(r, n) {
  if (typeof r != "string" || !r.trim()) return n;
  try {
    return JSON.parse(r);
  } catch {
    return n;
  }
}
function sp(r, n = 52) {
  const i = typeof r == "string" ? r.replace(/\s+/g, " ").trim() : "";
  return i ? i.length <= n ? i : `${i.slice(0, Math.max(1, n - 1)).trimEnd()}…` : "";
}
function yS(r) {
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
function ko(r) {
  return Array.isArray(r) ? r.map(yS).filter(Boolean) : [];
}
function Ll(r) {
  if (!r || typeof r != "object") return "";
  const n = r.content || r.parts || [], i = Mt(Array.isArray(n) ? n : []);
  return i || (Array.isArray(r.metadata?.unstable_data) && r.metadata.unstable_data.length > 0 && r.role === "assistant" ? "Shared storefront picks and guidance." : "");
}
function bo(r, n = "New reading") {
  const i = Array.isArray(r) ? r.find((u) => u?.role === "user" && Ll(u)) : null, a = Ll(i);
  return a ? sp(a, 42) : n;
}
function vS(r) {
  if (!Array.isArray(r) || r.length === 0)
    return "No messages yet.";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = Ll(r[n]);
    if (i) return sp(i, 78);
  }
  return "No messages yet.";
}
function ip(r, n = null) {
  if (!Array.isArray(r) || r.length === 0) return n;
  for (let i = r.length - 1; i >= 0; i -= 1) {
    const a = r[i]?.createdAt;
    if (!a) continue;
    const u = new Date(a).toISOString();
    if (u) return u;
  }
  return n;
}
function Tr(r) {
  return [...r].sort((n, i) => {
    const a = new Date(i?.updatedAt || 0).getTime(), u = new Date(n?.updatedAt || 0).getTime();
    return a - u;
  });
}
function Ns(r = {}) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), i = ko(r.messages || []);
  return {
    id: typeof r.id == "string" && r.id ? r.id : Gn("thread"),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : bo(i),
    createdAt: typeof r.createdAt == "string" && r.createdAt ? r.createdAt : n,
    updatedAt: typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : n,
    conversationId: typeof r.conversationId == "string" && r.conversationId ? r.conversationId : null,
    messages: i,
    suggestions: Fe(r.suggestions || []),
    suggestionsMessageId: typeof r.suggestionsMessageId == "string" ? r.suggestionsMessageId : ""
  };
}
function _S(r) {
  if (!r || typeof r != "object") return null;
  const n = ko(r.messages || []), i = typeof r.createdAt == "string" && r.createdAt ? r.createdAt : (/* @__PURE__ */ new Date()).toISOString(), a = typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : ip(n, i) || i;
  return Ns({
    ...r,
    createdAt: i,
    updatedAt: a,
    messages: n,
    suggestions: Fe(r.suggestions || []),
    suggestionsMessageId: typeof r.suggestionsMessageId == "string" ? r.suggestionsMessageId : "",
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : bo(n)
  });
}
function SS() {
  const r = rp(jl(Yh), []), n = Array.isArray(r) ? r.map(_S).filter(Boolean) : [], i = n.length > 0 ? Tr(n).slice(0, Eo) : [Ns()], a = jl(Qh), u = i.some((d) => d.id === a) ? a : i[0].id;
  return {
    sessions: i,
    activeSessionId: u
  };
}
function wS({ sessions: r, activeSessionId: n }) {
  fo(
    Yh,
    JSON.stringify(Tr(r).slice(0, Eo))
  ), fo(Qh, n);
}
function bl(r, n) {
  return Array.isArray(r) && r.find((i) => i.id === n) || null;
}
function Mf(r) {
  return r ? {
    ...r,
    title: bo(r.messages, r.title || "New reading"),
    updatedAt: ip(r.messages, (/* @__PURE__ */ new Date()).toISOString()) || (/* @__PURE__ */ new Date()).toISOString()
  } : null;
}
function Nf(r, n, i = {}) {
  const a = [];
  let u = !1;
  for (const d of Array.isArray(r) ? r : []) {
    if (d.id !== n) {
      a.push(d);
      continue;
    }
    u = !0;
    const h = i.messages !== void 0 ? ko(i.messages) : d.messages, g = Mf({
      ...d,
      ...i,
      messages: h,
      suggestions: i.suggestions !== void 0 ? Fe(i.suggestions) : d.suggestions,
      suggestionsMessageId: i.suggestionsMessageId !== void 0 ? i.suggestionsMessageId || "" : d.suggestionsMessageId || "",
      conversationId: i.conversationId !== void 0 ? i.conversationId || null : d.conversationId
    });
    a.push(g);
  }
  return u || a.push(Mf(Ns({
    id: n,
    ...i
  }))), Tr(a).slice(0, Eo);
}
function op(r) {
  return Tr(Array.isArray(r) ? r : []).map((n) => ({
    id: n.id,
    title: bo(n.messages, n.title || "New reading"),
    preview: vS(n.messages),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    isEmpty: !Array.isArray(n.messages) || n.messages.length === 0
  }));
}
function xS({ sessions: r, activeSessionId: n, isRunning: i }) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(iS, {
    detail: {
      sessions: op(r),
      activeSessionId: n,
      isRunning: !!i
    }
  }));
}
function Xi() {
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
function ES(r) {
  return /^(https?:\/\/|mailto:|\/)/i.test(r);
}
function tn(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, h = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const g = `${n}-${h}`;
    if (d[2] && d[3]) {
      const y = d[3].trim();
      i.push(
        ES(y) ? /* @__PURE__ */ p.jsx("a", { href: y, target: y.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, g) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ p.jsx("code", { children: d[4] }, g)) : d[5] ? i.push(/* @__PURE__ */ p.jsx("strong", { children: tn(d[5], `${g}-strong`) }, g)) : d[6] && i.push(/* @__PURE__ */ p.jsx("em", { children: tn(d[6], `${g}-em`) }, g));
    u = a.lastIndex, h += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function Ps(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function kS(r) {
  const n = Ps(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function bS(r) {
  const n = Ps(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function Pf(r) {
  const n = Ps(r);
  return n.length >= 2 && n.some(Boolean);
}
function CS(r, n) {
  const i = r[n];
  if (!Pf(i)) return null;
  const a = Ps(i), u = r[n + 1], d = bS(u);
  let h = n + (d ? 2 : 1);
  const g = [];
  for (; h < r.length && Pf(r[h]); ) {
    const y = Ps(r[h]);
    if (y.length !== a.length) break;
    g.push(y), h += 1;
  }
  return g.length === 0 ? null : {
    headers: a,
    alignments: d ? kS(u) : a.map(() => "left"),
    rows: g,
    nextIndex: h
  };
}
function TS(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function ap({ text: r = "" }) {
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
      a < n.length && (a += 1), TS(b) ? i.push(
        /* @__PURE__ */ p.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ p.jsx(ap, { text: x.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ p.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ p.jsx("code", { children: x.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const h = u.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const x = `h${h[1].length + 2}`;
      i.push(
        /* @__PURE__ */ p.jsx(x, { children: tn(h[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ p.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const g = CS(n, a);
    if (g) {
      const { headers: x, alignments: b, rows: _, nextIndex: A } = g;
      a = A, i.push(
        /* @__PURE__ */ p.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ p.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ p.jsx("thead", { children: /* @__PURE__ */ p.jsx("tr", { children: x.map((P, N) => /* @__PURE__ */ p.jsx(
            "th",
            {
              style: { textAlign: b[N] || "left" },
              children: tn(P, `table-head-${a}-${N}`)
            },
            `table-head-${a}-${N}`
          )) }) }),
          /* @__PURE__ */ p.jsx("tbody", { children: _.map((P, N) => /* @__PURE__ */ p.jsx("tr", { children: x.map((U, B) => /* @__PURE__ */ p.jsx(
            "td",
            {
              style: { textAlign: b[B] || "left" },
              children: tn(P[B] || "", `table-cell-${a}-${N}-${B}`)
            },
            `table-cell-${a}-${N}-${B}`
          )) }, `table-row-${a}-${N}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        x.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ p.jsx("ul", { children: x.map((b, _) => /* @__PURE__ */ p.jsx("li", { children: tn(b, `ul-${a}-${_}`) }, `ul-${a}-${_}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        x.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ p.jsx("ol", { children: x.map((b, _) => /* @__PURE__ */ p.jsx("li", { children: tn(b, `ol-${a}-${_}`) }, `ol-${a}-${_}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        x.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ p.jsx("blockquote", { children: x.map((b, _) => /* @__PURE__ */ p.jsx("p", { children: tn(b, `quote-${a}-${_}`) }, `quote-${a}-${_}`)) }, `quote-${a}`)
      );
      continue;
    }
    const y = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      y.push(n[a].trim()), a += 1;
    const v = y.join(" ");
    i.push(
      /* @__PURE__ */ p.jsx("p", { children: tn(v, `p-${a}`) }, `p-${a}`)
    );
  }
  return /* @__PURE__ */ p.jsx("div", { className: "ac-markdown", children: i });
}
function IS(r) {
  if (typeof r != "string" || !r) return "";
  try {
    return JSON.parse(r);
  } catch {
    return r.replace(/^"/, "").replace(/"$/, "");
  }
}
function RS(r) {
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
function AS(r) {
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
  return RS(d).trim();
}
function lp(r) {
  if (typeof r != "string") return "";
  const n = su(r).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trim();
  if (!n) return "";
  const i = [...n.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi
  )].pop();
  if (i?.[1]) {
    const d = IS(i[1]).trim();
    if (d) return d;
  }
  const a = AS(n);
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
function su(r) {
  return typeof r != "string" ? "" : r.replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, "").replace(/<thinking\b[^>]*>[\s\S]*?<\/thinking>/gi, "").replace(/<reasoning\b[^>]*>[\s\S]*?<\/reasoning>/gi, "").replace(/<analysis\b[^>]*>[\s\S]*?<\/analysis>/gi, "").replace(/<think\b[^>]*>[\s\S]*$/gi, "").replace(/<thinking\b[^>]*>[\s\S]*$/gi, "").replace(/<reasoning\b[^>]*>[\s\S]*$/gi, "").replace(/<analysis\b[^>]*>[\s\S]*$/gi, "");
}
function MS(r) {
  if (typeof r != "string") return "";
  let n = r.replace(/^\uFEFF/, "").trimStart();
  if (!n) return "";
  const i = n.slice(0, 24).toLowerCase().replace(/\s+/g, " ").trim();
  if (i && i.length >= 3 && i.length <= 13 && "final answer:".startsWith(i) && /^[a-z:\s]+$/i.test(n.trim()) && n.trim().length <= 24)
    return "";
  const a = [...n.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  return typeof a?.index == "number" ? n = n.slice(a.index + a[0].length).trimStart() : n = n.replace(/^final answer\s*:\s*/i, ""), n;
}
function Cl(r) {
  if (typeof r != "string") return "";
  const n = co(su(r)).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trimStart();
  if (!n) return "";
  const i = lp(n), a = co(MS(i || n));
  return a ? a.replace(/\n{3,}/g, `

`).trimStart() : "";
}
function up(r) {
  if (typeof r != "string") return !1;
  const n = r.toLowerCase();
  return /\bthought:\b/.test(n) || /\bobservation:\b/.test(n) || /\baction:\b/.test(n) || /\bquestion:\b/.test(n) || /"action"\s*:/.test(n) || /\bfinal answer\b/.test(n);
}
function Ol(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(n) || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(n) || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(n) || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(n) || /\bi have \w+ products?\b/.test(n) : !1;
}
function jf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(n) || /^```(?:json|xml)?\s*[\[{<]/.test(n) || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(n) || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(n) : !1;
}
function NS(r) {
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
    if (!Ol(h)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((h) => h.trim()).filter(Boolean);
  let d = 0;
  for (; d < u.length && Ol(u[d]); )
    d += 1;
  return u.slice(d).join(`

`).trim();
}
function Ir(r) {
  return Array.isArray(r) ? r.map((n) => typeof n == "string" ? n.trim() : "").filter(Boolean).slice(-6) : typeof r == "string" ? r.split(`
`).map((n) => n.trim()).filter(Boolean).slice(-6) : [];
}
function PS() {
  const [r, n] = E.useState(!1);
  return E.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
const jS = [
  "Reading the pattern field...",
  "Following the strongest thread...",
  "Cross-checking the signals...",
  "Letting the guidance take shape..."
];
function LS({ userPrompt: r = "", statusText: n = "", progressLabel: i = "" }) {
  const a = js(`${r} ${n} ${i}`);
  return /horoscope|zodiac|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces|daily|weekly|monthly/.test(a) ? "Daily guidance" : /bazi|four pillars|day master|element|heavenly stem|earthly branch|birth time|birthday/.test(a) ? "Elemental structure" : /tarot|card|spread|draw/.test(a) ? "Symbolic spread" : /fengshui|feng shui|room|desk|bedroom|home|space|placement/.test(a) ? "Space harmony" : /relationship|love|partner|match|compatib|marriage|yinyuan|connection|dating/.test(a) ? "Relationship pattern" : /numerology|number|shushu|life path|name/.test(a) ? "Number pattern" : /crystal|stone|necklace|bracelet|ring|earring|shop|product|gift|buy|cart/.test(a) ? "Crystal match" : /sleep|rest|dream|insomnia|calm|anxiety|stress|peace/.test(a) ? "Rest & calm" : /protect|protection|ground|grounding|safe|stability|negative/.test(a) ? "Grounding & protection" : /career|work|job|business|direction|decision|choice|path|future/.test(a) ? "Direction & momentum" : /money|abundance|wealth|prosperity|success|confidence/.test(a) ? "Abundance focus" : /heart|heal|healing|emotion|clarity|grief|breakup/.test(a) ? "Emotional clarity" : "Current question";
}
function OS({ elapsedMs: r = 0, statusStage: n = "", hasProgress: i = !1 }) {
  return n === "compose" || r >= 2e4 ? "materializing" : i || n === "tool" ? "tool-aware" : r >= 1800 ? "deepening" : "settling";
}
function zS(r) {
  return r === "tool-aware" ? "focused" : r === "materializing" ? "resolving" : r === "deepening" ? "active" : "quiet";
}
function DS({ phase: r, elapsedMs: n = 0, progressLabel: i = "" }) {
  return r === "materializing" ? n >= 32e3 ? ["Almost ready"] : ["Shaping your guidance..."] : r === "tool-aware" && i ? [
    i,
    "Cross-checking the strongest signal...",
    "Letting the pattern resolve..."
  ] : r === "deepening" ? jS : ["Tuning into your current state..."];
}
function BS({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = "",
  statusElapsedMs: d = 0,
  progressEntries: h = [],
  userPrompt: g = "",
  isExiting: y = !1
}) {
  const v = PS(), x = E.useRef(Date.now()), [b, _] = E.useState(0), [A, P] = E.useState(0), [N, U] = E.useState({
    current: "Tuning into your current state...",
    previous: "",
    key: 0
  });
  E.useEffect(() => {
    const ae = window.setInterval(() => {
      _(Date.now() - x.current);
    }, 1e3);
    return () => window.clearInterval(ae);
  }, []);
  const B = Math.max(Number(d) || 0, b), J = E.useMemo(
    () => Ls(h),
    [h]
  ), X = J.find((ae) => ae.isCurrent) || J[J.length - 1] || null, le = Ir(n), fe = le[le.length - 1] || "", K = X?.label || fe || "", D = !!K, H = OS({ elapsedMs: B, statusStage: i, hasProgress: D }), se = zS(H), ge = E.useMemo(
    () => DS({ phase: H, elapsedMs: B, progressLabel: K }),
    [B, H, K]
  ), ve = LS({
    userPrompt: g,
    statusText: u || r,
    progressLabel: K
  }), me = B >= 6500 || D, he = ge[Math.min(A, ge.length - 1)] || ge[0] || "Tuning into your current state...";
  return E.useEffect(() => {
    P(0);
  }, [H, K]), E.useEffect(() => {
    if (v || ge.length <= 1) return;
    const ae = window.setTimeout(() => {
      P((ce) => (ce + 1) % ge.length);
    }, 2200);
    return () => window.clearTimeout(ae);
  }, [A, v, ge.length]), E.useEffect(() => {
    U((ae) => ae.current === he ? ae : {
      current: he,
      previous: v ? "" : ae.current,
      key: ae.key + 1
    });
  }, [he, v]), E.useEffect(() => {
    if (!N.previous) return;
    const ae = window.setTimeout(() => {
      U((ce) => ce.key === N.key ? { ...ce, previous: "" } : ce);
    }, 560);
    return () => window.clearTimeout(ae);
  }, [N.key, N.previous]), /* @__PURE__ */ p.jsxs(
    "div",
    {
      className: [
        "ac-reading-progress",
        `ac-reading-progress--${H}`,
        `ac-reading-progress--${se}`,
        y ? "ac-reading-progress--exiting" : ""
      ].join(" "),
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ p.jsx("span", { className: "visually-hidden", children: he }),
        /* @__PURE__ */ p.jsxs("div", { className: "ac-reading-progress__header", "aria-hidden": "true", children: [
          /* @__PURE__ */ p.jsx("p", { children: "✦ Interpreting your energy" }),
          /* @__PURE__ */ p.jsx("span", { children: H === "materializing" ? "Signal resolving" : "Reading session" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "ac-reading-progress__instrument", "aria-hidden": "true", children: [
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__aurora" }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__goldfield" }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__ring ac-reading-progress__ring--outer" }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__ring ac-reading-progress__ring--middle" }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__ring ac-reading-progress__ring--inner" }),
          /* @__PURE__ */ p.jsxs("span", { className: "ac-reading-progress__constellation", children: [
            /* @__PURE__ */ p.jsx("i", {}),
            /* @__PURE__ */ p.jsx("i", {}),
            /* @__PURE__ */ p.jsx("i", {}),
            /* @__PURE__ */ p.jsx("i", {}),
            /* @__PURE__ */ p.jsx("i", {}),
            /* @__PURE__ */ p.jsx("i", {})
          ] }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__beam ac-reading-progress__beam--one" }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__beam ac-reading-progress__beam--two" }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-reading-progress__aperture", children: /* @__PURE__ */ p.jsx("span", {}) })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "ac-reading-progress__copy", children: [
          /* @__PURE__ */ p.jsxs("p", { className: "ac-reading-progress__line", "aria-hidden": "true", children: [
            N.previous ? /* @__PURE__ */ p.jsx(
              "span",
              {
                className: "ac-reading-progress__line-text ac-reading-progress__line-text--previous",
                children: N.previous
              },
              `previous-${N.key}`
            ) : null,
            /* @__PURE__ */ p.jsx(
              "span",
              {
                className: "ac-reading-progress__line-text ac-reading-progress__line-text--current",
                children: N.current
              },
              `current-${N.key}`
            )
          ] }),
          me ? /* @__PURE__ */ p.jsxs("div", { className: "ac-reading-progress__focus", "aria-hidden": "true", children: [
            /* @__PURE__ */ p.jsx("span", { children: "Signal focus" }),
            /* @__PURE__ */ p.jsx("strong", { children: ve })
          ] }) : null
        ] })
      ]
    }
  );
}
function cp(r) {
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
    taskId: ho(r),
    elapsedMs: Number.isFinite(n) ? Math.max(0, n) : 0
  };
}
function dp(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return Mt(i.content);
  }
  return "";
}
function fp(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = lp(n), a = co(i || n), u = su(a).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && up(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), h = NS(u), g = d >= 0 ? u.slice(d).trim() : h || u, v = g.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).filter((b) => !jf(b)), x = (v.length > 0 ? v.join(`

`) : g).trim();
    if (x && !jf(x))
      return x;
  }
  return "";
}
function FS(r) {
  const n = fp(r);
  return n || [
    "AskCrystal finished the request, but the final guidance was not readable.",
    "Please try once more, or ask the question in a slightly simpler way so the reading can come through cleanly."
  ].join(`

`);
}
function zl(r, n = []) {
  const i = dS(r), a = Hh(i.answer), u = xo(n, a.components), d = FS(a.answer), h = i.suggestions;
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
function Hn({ text: r = "", components: n = [] } = {}) {
  const i = typeof r == "string" ? r : "", a = Hh(i), u = xo(n, a.components), d = L_(i), h = [], g = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Map(), v = (_) => `${_.toolName}:${_.toolCallId}`;
  for (const _ of u) {
    const A = bf(_);
    A && y.set(v(A), A);
  }
  const x = (_) => {
    const A = co(z_(_)).trim(), P = fp(A);
    if (!P) return;
    const N = h[h.length - 1];
    if (N?.type === "text") {
      N.text = `${N.text}

${P}`.trim();
      return;
    }
    h.push({
      type: "text",
      text: P
    });
  }, b = (_) => {
    for (const A of _) {
      const P = bf(A);
      if (!P) continue;
      const N = v(P);
      g.has(N) || (h.push(y.get(N) || P), g.add(N));
    }
  };
  if (d.some((_) => _.type === "payload"))
    for (const _ of d) {
      if (_.type === "text") {
        x(_.value);
        continue;
      }
      b(Uh(_.value));
    }
  else
    x(i);
  for (const _ of y.values()) {
    const A = v(_);
    g.has(A) || h.push(_);
  }
  return h;
}
function US(r) {
  return /^https?:\/\//i.test(r);
}
function Rr(r) {
  return r ? US(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${sS}${r}` : r : "";
}
function $S(r) {
  return r ? r.endsWith("/stream") ? Rr(r) : Rr(`${r.replace(/\/$/, "")}/stream`) : "";
}
function HS(r) {
  return r ? r.endsWith("/stop") ? Rr(r) : Rr(`${r.replace(/\/$/, "")}/stop`) : "";
}
function hp(r) {
  return r ? r.replace(/\/$/, "").replace(/\/(?:stream|stop|suggestions)$/, "").replace(/\/chat$/, "") : "";
}
function VS(r) {
  if (!r) return "";
  const n = `${hp(r)}/identity/bootstrap`;
  return Rr(n);
}
function WS(r) {
  if (!r) return "";
  const n = `${hp(r)}/threads/messages`;
  return Rr(n);
}
function qS(r) {
  return /<html[\s>]/i.test(r || "") && /powered-by:\s*Shopify|cdn\/shop|shopify-section/i.test(r || "");
}
async function GS(r) {
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
  return qS(u) ? "AskCrystal proxy is not connected. Shopify is serving the storefront page for /apps/askcrystal instead of forwarding the request to the app proxy." : n;
}
function YS() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  const r = jl(Ml);
  if (r) return r;
  const n = Gn("session");
  return fo(Ml, n), n;
}
function Dl(r) {
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
`).forEach((g) => {
      g.startsWith("event:") && (d = g.slice(6).trim() || d), g.startsWith("data:") && h.push(g.slice(5).trim());
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
function ho(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function po(r) {
  const n = r?.messageId || r?.message_id || r?.data?.messageId || r?.data?.message_id;
  return typeof n == "string" ? n : "";
}
function QS(r = []) {
  if (!Array.isArray(r)) return "";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i?.role === "assistant")
      return typeof i.id == "string" ? i.id : "";
  }
  return "";
}
function Bl(r) {
  return Fe(
    r?.suggestions || r?.data?.suggestions || r?.data || []
  );
}
function xr(r = [], n = []) {
  return Fe([
    ...Fe(r),
    ...Fe(n)
  ]);
}
async function KS({
  reader: r,
  decoder: n,
  initialBuffer: i = "",
  abortSignal: a,
  initialSuggestions: u = [],
  messageId: d = "",
  onSuggestions: h
}) {
  if (!r || !n)
    return {
      suggestions: Fe(u),
      messageId: d
    };
  let g = i, y = Fe(u), v = d;
  const x = (b) => {
    const _ = xr(y, Bl(b));
    _.length !== y.length && (y = _, v = po(b) || v, h?.(y, v));
  };
  try {
    for (; ; ) {
      Et(a);
      const { done: _, value: A } = await r.read();
      if (_) break;
      Et(a), g += n.decode(A, { stream: !0 });
      const P = Dl(g);
      g = P.remaining;
      for (const N of P.events)
        Et(a), N.event === "suggestions" && x(N.payload);
    }
    const b = n.decode();
    if (b || g) {
      const _ = Dl(`${g}${b}

`);
      for (const A of _.events)
        A.event === "suggestions" && x(A.payload);
    }
  } catch (b) {
    b?.name !== "AbortError" && console.warn("[AskCrystal] Late suggestion stream could not be drained.", b);
  }
  return {
    suggestions: y,
    messageId: v
  };
}
function JS(r) {
  const n = r?.event || r?.data?.event;
  return typeof n == "string" ? n : "";
}
function XS(r) {
  if (typeof r?.tool == "string" && r.tool) return r.tool;
  if (typeof r?.tool_name == "string" && r.tool_name) return r.tool_name;
  if (r?.tool_labels && typeof r.tool_labels == "object") {
    const n = Object.values(r.tool_labels).find((i) => typeof i == "string" && i);
    if (typeof n == "string") return n;
  }
  return "";
}
function pp(r) {
  if (!r || typeof r != "object") return null;
  const n = typeof r.thought == "string" ? r.thought.trim() : typeof r.data?.thought == "string" ? r.data.thought.trim() : "", i = XS(r).trim(), a = typeof r.tool_input == "string" ? r.tool_input : typeof r.toolInput == "string" ? r.toolInput : typeof r.data?.tool_input == "string" ? r.data.tool_input : "", u = typeof r.observation == "string" ? r.observation : typeof r.data?.observation == "string" ? r.data.observation : "";
  if (!n && !i && !a && !u) return null;
  const d = po(r), h = ho(r), g = Number.isFinite(Number(r.position)) ? Number(r.position) : null;
  return {
    id: typeof r.id == "string" && r.id ? r.id : `${d || h || "thought"}:${g ?? 0}`,
    position: g,
    thought: n,
    tool: i,
    toolInput: a,
    observation: u,
    messageId: d,
    taskId: h,
    sourceEvent: typeof r.sourceEvent == "string" ? r.sourceEvent : JS(r)
  };
}
function go(r) {
  return Array.isArray(r) ? r.map(pp).filter(Boolean) : [];
}
function gp(r, n) {
  const i = pp(n);
  if (!i) return go(r);
  const a = go(r), u = a.findIndex((d) => !!(d.id && i.id && d.id === i.id || d.position !== null && i.position !== null && d.position === i.position));
  return u >= 0 ? (a[u] = {
    ...a[u],
    ...i,
    thought: i.thought || a[u].thought,
    toolInput: i.toolInput || a[u].toolInput,
    observation: i.observation || a[u].observation
  }, a) : [...a, i];
}
function ZS() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function Et(r) {
  if (r?.aborted)
    throw ZS();
}
async function ew({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a, storefrontSessionId: u }) {
  if (!(!r || !n))
    try {
      await fetch(HS(r), {
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
async function tw({ apiEndpoint: r, sessionId: n }) {
  if (!r || !n) return null;
  try {
    const i = new URL(VS(r), window.location.origin);
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
async function nw({ apiEndpoint: r, sessionId: n, storefrontSessionId: i }) {
  if (!r || !n || !i) return null;
  try {
    const a = new URL(WS(r), window.location.origin);
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
async function rw({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: h, onThought: g, onDelta: y, onSuggestions: v }) {
  Et(i);
  const x = await fetch($S(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: dp(n),
      conversationId: a,
      sessionId: u,
      storefrontSessionId: d
    }),
    signal: i
  });
  if (!x.ok)
    throw new Error(await GS(x));
  if (!x.body)
    throw new Error("The proxy did not return a readable stream.");
  const b = x.body.getReader(), _ = new TextDecoder();
  let A = "", P = "", N = "", U = [], B = [], J = a || null;
  for (; ; ) {
    Et(i);
    const { done: X, value: le } = await b.read();
    if (X) break;
    Et(i), A += _.decode(le, { stream: !0 });
    const fe = Dl(A);
    A = fe.remaining;
    for (let K = 0; K < fe.events.length; K += 1) {
      const D = fe.events[K];
      if (Et(i), D.event === "status" && typeof D.payload?.message == "string" && (Et(i), h?.(D.payload)), D.event === "thought" && (Et(i), U = gp(U, D.payload), g?.(D.payload), J = D.payload?.conversationId || D.payload?.conversation_id || J), D.event === "error")
        throw new Error(D.payload?.error || D.payload?.message || "The proxy stream failed.");
      if (D.event === "suggestions") {
        B = xr(B, Bl(D.payload)), v?.(B, po(D.payload) || "");
        continue;
      }
      if (D.event === "replace") {
        Et(i);
        const H = kl(D.payload);
        if (H) {
          P = H;
          const se = Cl(P);
          if (se) {
            const ge = N;
            N = se, se !== ge && y?.("", se, D.payload);
          }
        }
        J = D.payload?.conversationId || D.payload?.conversation_id || J;
      }
      if (["delta", "message", "agent_message"].includes(D.event)) {
        Et(i);
        const H = kl(D.payload);
        if (H) {
          P += H;
          const se = Cl(P);
          if (se) {
            const ge = N;
            if (N = se, se !== ge) {
              const ve = se.startsWith(ge) ? se.slice(ge.length) : se;
              y?.(ve, se, D.payload);
            }
          }
        }
        J = D.payload?.conversationId || D.payload?.conversation_id || J;
      }
      if (D.event === "complete") {
        Et(i);
        const H = kl(D.payload) || P, se = typeof D.payload?.sourceText == "string" && D.payload.sourceText.trim() ? D.payload.sourceText : typeof D.payload?.source_text == "string" && D.payload.source_text.trim() ? D.payload.source_text : H, ve = Cl(H) || N || N, me = Fe(D.payload?.suggestions || D.payload?.data?.suggestions || []), he = po(D.payload) || null;
        if (!H && !ve && U.length > 0)
          return {
            answer: "",
            components: [],
            sourceText: "",
            suggestions: xr(B, me),
            conversationId: D.payload?.conversationId || D.payload?.conversation_id || J || null,
            messageId: he,
            thoughts: U
          };
        const ae = zl(se || ve), ce = Fe(ae.suggestions || []), ke = Fe([
          ...B,
          ...ce,
          ...me
        ]);
        for (const F of fe.events.slice(K + 1))
          F.event === "suggestions" && (B = xr(B, Bl(F.payload)));
        const $ = xr(ke, B);
        return KS({
          reader: b,
          decoder: _,
          initialBuffer: A,
          abortSignal: i,
          initialSuggestions: $,
          messageId: he || "",
          onSuggestions: v
        }), {
          answer: ae.answer,
          components: ae.components,
          sourceText: ae.sourceText,
          suggestions: $,
          conversationId: D.payload?.conversationId || D.payload?.conversation_id || J || null,
          messageId: he,
          thoughts: U
        };
      }
    }
  }
  if (N) {
    const X = zl(N);
    return {
      answer: X.answer,
      components: X.components,
      sourceText: X.sourceText,
      suggestions: xr(B, X.suggestions || []),
      conversationId: J,
      messageId: null,
      thoughts: U
    };
  }
  if (U.length > 0)
    return {
      answer: "",
      components: [],
      sourceText: "",
      suggestions: [],
      conversationId: J,
      messageId: null,
      thoughts: U
    };
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function Gn(r = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${r}-${crypto.randomUUID()}` : (Af += 1, `${r}-${Date.now()}-${Af}`);
}
function sw(r) {
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
function nn({
  id: r = Gn("assistant"),
  text: n = "",
  parts: i = null,
  components: a = [],
  status: u,
  error: d,
  statusText: h = "",
  statusStage: g = "",
  statusTool: y = "",
  statusHistory: v = [],
  ambientStatusText: x = "",
  statusElapsedMs: b = null,
  continuationStatusText: _ = "",
  continuationStatusStage: A = "",
  continuationStatusTool: P = "",
  continuationStatusHistory: N = [],
  continuationProgressEntries: U = [],
  thoughts: B = [],
  userPrompt: J = ""
}) {
  const X = Ir(v).join(`
`), le = Ir(N).join(`
`), fe = Ls(U), K = Number(b), D = go(B), H = yp(
    D,
    u?.type === "running"
  );
  return {
    id: r,
    role: "assistant",
    createdAt: /* @__PURE__ */ new Date(),
    content: Array.isArray(i) ? i : Hn({ text: n, components: a }),
    status: u,
    metadata: {
      unstable_state: null,
      unstable_annotations: [],
      unstable_data: a,
      steps: [],
      custom: {
        ...d ? { error: d } : {},
        ...h ? { statusText: h } : {},
        ...g ? { statusStage: g } : {},
        ...y ? { statusTool: y } : {},
        ...X ? { statusHistoryText: X } : {},
        ...x ? { ambientStatusText: x } : {},
        ...Number.isFinite(K) ? { statusElapsedMs: Math.max(0, K) } : {},
        ...H.length ? { difyProgressEntries: H } : {},
        ..._ ? { continuationStatusText: _ } : {},
        ...A ? { continuationStatusStage: A } : {},
        ...P ? { continuationStatusTool: P } : {},
        ...le ? { continuationStatusHistoryText: le } : {},
        ...fe.length ? { continuationProgressEntries: fe } : {},
        ...J ? { userPrompt: J } : {}
      }
    }
  };
}
function Tl(r) {
  return String(r || "").replace(/\s+/g, " ").trim();
}
function Lf(r) {
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
function iw(r) {
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
function ow(r) {
  const n = Array.isArray(r?.components) ? r.components : [];
  return nn({
    id: typeof r?.id == "string" && r.id ? r.id : Gn("assistant"),
    text: typeof r?.text == "string" ? r.text : "",
    components: n,
    status: {
      type: "complete",
      reason: "stop"
    }
  });
}
function aw(r, n) {
  const i = Array.isArray(r?.messages) ? r.messages : [], a = Tl(n);
  if (!a || i.length === 0) return null;
  let u = -1, d = -1;
  for (let b = i.length - 1; b >= 0; b -= 1) {
    const _ = i[b];
    if (_?.role !== "user" || Tl(_.text) !== a) continue;
    const A = i.findIndex(
      (P, N) => N > b && P?.role === "assistant" && (Tl(P.text) || Array.isArray(P.components) && P.components.length > 0)
    );
    if (A !== -1) {
      u = b, d = A;
      break;
    }
  }
  if (u === -1 || d === -1) return null;
  const h = i.map((b) => b?.role === "user" ? iw(b) : b?.role === "assistant" ? ow(b) : null).filter(Boolean), g = i[d], y = zl(g?.text || "", g?.components || []), v = Fe(g?.suggestions || []), x = v.length ? v : Fe(y.suggestions || []);
  return {
    messages: h,
    suggestions: x,
    suggestionsMessageId: h[d]?.id || "",
    conversationId: r?.thread?.conversationId || null
  };
}
function lw(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Ir(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((h) => h !== a);
  return d.push(a), d.slice(-4);
}
function Of(r, n) {
  const i = typeof n == "string" ? n.trim() : "", a = Ir(r);
  if (!i || a[a.length - 1] === i)
    return a;
  const u = a.filter((d) => d !== i);
  return u.push(i), u.slice(-3);
}
function uw(r) {
  const n = cp(r), i = [
    n.stage,
    n.tool,
    n.message
  ].filter(Boolean).join(" ");
  if (!i.trim()) return "";
  const a = mp(n.tool, i);
  if (a) return a;
  if (n.stage === "compose")
    return "Bringing the guidance back into focus...";
  if (n.stage === "recover")
    return "Reconnecting to your reading...";
  const u = n.message.trim(), d = up(u) || Ol(u);
  return u && !d ? u : "The reading is still moving...";
}
function Fl({ id: r, text: n = "", components: i = [], thoughts: a = [] }) {
  const d = !!(typeof n == "string" ? n.trim() : "") || i.length > 0;
  return nn({
    id: r,
    parts: Hn({
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
function zf(r, n) {
  if (!Array.isArray(r) || !n || r.length === 0)
    return Array.isArray(r) ? [...r] : [];
  const i = [...r], a = i[i.length - 1];
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = Fl({
    id: a.id,
    text: Mt(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function cw({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: h, onThought: g, onDelta: y, onSuggestions: v }) {
  if (!r.apiEndpoint)
    throw new Error("AskCrystal backend endpoint is not configured.");
  try {
    return await rw({
      apiEndpoint: r.apiEndpoint,
      messages: n,
      abortSignal: i,
      conversationId: a,
      sessionId: u,
      storefrontSessionId: d,
      onStatus: h,
      onThought: g,
      onDelta: y,
      onSuggestions: v
    });
  } catch (x) {
    throw x?.name === "AbortError" || console.error("[AskCrystal] Backend runtime failed.", x), x;
  }
}
function dw(r) {
  const n = E.useMemo(() => SS(), []), i = bl(n.sessions, n.activeSessionId) || n.sessions[0], [a, u] = E.useState(n.sessions), [d, h] = E.useState(i.id), [g, y] = E.useState(i.messages), [v, x] = E.useState(i.suggestions), [b, _] = E.useState(i.suggestionsMessageId || ""), [A, P] = E.useState(!1), N = E.useRef(null), U = E.useRef(""), B = E.useRef(""), J = E.useRef(!1), X = E.useRef(i.conversationId || null), le = E.useRef(g), fe = E.useRef(a), K = E.useRef(d), D = E.useRef(A), H = E.useRef(YS());
  E.useEffect(() => {
    if (!r.apiEndpoint) return;
    let M = !1;
    return tw({
      apiEndpoint: r.apiEndpoint,
      sessionId: H.current
    }).then((w) => {
      if (M || !w?.ok) return;
      const I = typeof w.identity?.guestToken == "string" ? w.identity.guestToken.trim() : "";
      I && I !== H.current && (H.current = I, fo(Ml, I));
    }), () => {
      M = !0;
    };
  }, [r.apiEndpoint]), E.useEffect(() => {
    le.current = g;
  }, [g]), E.useEffect(() => {
    fe.current = a;
  }, [a]), E.useEffect(() => {
    K.current = d;
  }, [d]), E.useEffect(() => {
    D.current = A;
  }, [A]), E.useEffect(() => {
    u((M) => Nf(M, d, {
      messages: zf(g, J.current),
      suggestions: v,
      suggestionsMessageId: b,
      conversationId: X.current,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }, [d, g, v, b]), E.useEffect(() => {
    wS({
      sessions: a,
      activeSessionId: d
    }), xS({
      sessions: a,
      activeSessionId: d,
      isRunning: A
    });
  }, [d, A, a]);
  const se = E.useCallback((M) => {
    M && (X.current = M.conversationId || null, J.current = !1, B.current = "", h(M.id), y(ko(M.messages)), x(Fe(M.suggestions)), _(M.suggestionsMessageId || ""));
  }, []), ge = E.useCallback((M) => {
    if (!M || D.current)
      return;
    if (M === K.current) {
      Xi();
      return;
    }
    const w = bl(fe.current, M);
    if (!w) return;
    const I = {
      ...w,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    u((W) => Nf(W, M, {
      updatedAt: I.updatedAt
    })), se(I), Xi();
  }, [se]), ve = E.useCallback(() => {
    if (D.current) return;
    const M = Ns();
    u(
      (w) => Tr([M, ...w]).slice(0, Eo)
    ), se(M), Xi();
  }, [se]), me = E.useCallback((M) => {
    if (!M || D.current) return;
    const w = Tr(
      fe.current.filter((oe) => oe.id !== M)
    ), I = w.length > 0 ? w : [Ns()], W = M === K.current, ie = bl(I, K.current) || I[0];
    u(I), (W || ie.id !== K.current) && se(ie), Xi();
  }, [se]);
  E.useEffect(() => {
    if (typeof window > "u") return;
    const M = (W) => {
      ge(W.detail?.sessionId || "");
    }, w = () => {
      ve();
    }, I = (W) => {
      me(W.detail?.sessionId || "");
    };
    return window.addEventListener(Tf, M), window.addEventListener(If, w), window.addEventListener(Rf, I), () => {
      window.removeEventListener(Tf, M), window.removeEventListener(If, w), window.removeEventListener(Rf, I);
    };
  }, [ve, me, ge]);
  const he = E.useCallback((M) => {
    y(zf(M, J.current));
  }, []), ae = E.useCallback((M, w) => {
    y(
      (I) => I.map((W) => W.id !== M ? W : w(W))
    );
  }, []), ce = E.useCallback(async ({ expectedPrompt: M = "", poll: w = !1 } = {}) => {
    if (!r.apiEndpoint) return !1;
    const I = K.current, W = M || Lf(le.current);
    if (!W || !I) return !1;
    const ie = Date.now() + (w ? 75e3 : 0);
    do {
      const oe = await nw({
        apiEndpoint: r.apiEndpoint,
        sessionId: H.current,
        storefrontSessionId: I
      }), ne = aw(oe, W);
      if (ne)
        return K.current !== I ? !1 : (X.current = ne.conversationId || X.current, J.current = !1, B.current = "", U.current = "", N.current = null, D.current = !1, P(!1), y(ne.messages), x(ne.suggestions), _(ne.suggestions.length ? ne.suggestionsMessageId : ""), !0);
      if (!w || Date.now() >= ie) break;
      await new Promise((pe) => setTimeout(pe, 2e3));
    } while (!0);
    return !1;
  }, [r.apiEndpoint]);
  E.useEffect(() => {
    if (typeof window > "u") return;
    let M = !1;
    const w = () => {
      if (M || document.visibilityState && document.visibilityState !== "visible") return;
      const W = Lf(le.current);
      W && ce({
        expectedPrompt: W,
        poll: !1
      });
    }, I = window.setTimeout(w, 800);
    return window.addEventListener("focus", w), window.addEventListener("pageshow", w), document.addEventListener("visibilitychange", w), () => {
      M = !0, window.clearTimeout(I), window.removeEventListener("focus", w), window.removeEventListener("pageshow", w), document.removeEventListener("visibilitychange", w);
    };
  }, [ce]);
  const ke = E.useCallback(async () => {
    const M = N.current, w = U.current, I = B.current, W = X.current, ie = H.current, oe = K.current;
    M?.abort(), J.current = !0, D.current = !1, P(!1), x([]), _(""), w && ae(
      w,
      (ne) => Fl({
        id: ne.id,
        text: Mt(ne.content || []),
        components: ne.metadata?.unstable_data || []
      })
    ), !(!I || !r.apiEndpoint) && await ew({
      apiEndpoint: r.apiEndpoint,
      taskId: I,
      sessionId: ie,
      conversationId: W,
      storefrontSessionId: oe
    });
  }, [r.apiEndpoint, ae]), $ = E.useCallback(
    async (M) => {
      if (M.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      if (tp(r) === "home") {
        const ue = Mt(M.content || []);
        if (gS(r, ue))
          return;
      }
      const w = sw(M), I = Gn("assistant"), W = new AbortController(), ie = nn({
        id: I,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy...",
        statusElapsedMs: 0,
        userPrompt: w.content ? Mt(w.content) : ""
      }), oe = [...le.current, w];
      N.current = W, U.current = I, B.current = "", J.current = !1, D.current = !0, P(!0), x([]), _(""), y([...oe, ie]);
      let ne = "", pe = [];
      const _e = K.current;
      try {
        const ue = await cw({
          config: r,
          messages: oe,
          abortSignal: W.signal,
          conversationId: X.current,
          sessionId: H.current,
          storefrontSessionId: _e,
          onStatus: (mt) => {
            if (W.signal.aborted) return;
            const Ae = cp(mt);
            Ae.taskId && (B.current = Ae.taskId), ae(I, (Ie) => {
              const Ye = Mt(Ie.content || Ie.parts || []), zt = Array.isArray(Ie.metadata?.unstable_data) ? Ie.metadata.unstable_data : [], Qe = !!(Ye.trim() || zt.length), Dt = Qe ? uw(Ae) : "", Cn = Qe ? Of(
                Ie.metadata?.custom?.continuationStatusHistoryText,
                Dt
              ) : [];
              return nn({
                id: I,
                parts: Hn({
                  text: Ye,
                  components: zt
                }),
                components: zt,
                status: {
                  type: "running"
                },
                thoughts: pe,
                statusText: Qe ? "" : Ae.message,
                statusStage: Qe ? "" : Ae.stage,
                statusTool: Qe ? "" : Ae.tool,
                statusHistory: Qe ? [] : lw(Ie.metadata?.custom?.statusHistoryText, Ae),
                ambientStatusText: Qe ? "" : Ae.stage === "tool" ? Ie.metadata?.custom?.ambientStatusText || "Settling into your energy..." : Ae.message,
                statusElapsedMs: Qe ? null : Ae.elapsedMs,
                continuationStatusText: Dt,
                continuationStatusStage: Qe ? Ae.stage : "",
                continuationStatusTool: Qe ? Ae.tool : "",
                continuationStatusHistory: Cn,
                userPrompt: Ie.metadata?.custom?.userPrompt || ""
              });
            });
          },
          onThought: (mt) => {
            if (W.signal.aborted) return;
            const Ae = ho(mt);
            Ae && (B.current = Ae), pe = gp(pe, mt), ae(I, (Ie) => {
              const tt = Array.isArray(Ie.metadata?.unstable_data) ? Ie.metadata.unstable_data : [], zt = Mt(Ie.content || Ie.parts || []) || ne, Qe = !!(zt.trim() || tt.length), Dt = yp([mt], !0), Cn = Dt.find((Kn) => Kn.isCurrent) || Dt[Dt.length - 1] || null, Qn = Qe && Cn?.label || "", jr = Qe ? Of(
                Ie.metadata?.custom?.continuationStatusHistoryText,
                Qn
              ) : [];
              return nn({
                id: I,
                parts: Hn({
                  text: zt,
                  components: tt
                }),
                components: tt,
                status: {
                  type: "running"
                },
                thoughts: pe,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: [],
                continuationStatusText: Qn,
                continuationStatusStage: Qn ? "tool" : "",
                continuationStatusTool: Cn?.id || "",
                continuationStatusHistory: jr,
                continuationProgressEntries: Dt,
                userPrompt: Ie.metadata?.custom?.userPrompt || ""
              });
            });
          },
          onDelta: (mt, Ae, Ie) => {
            if (W.signal.aborted) return;
            const Ye = ho(Ie);
            Ye && (B.current = Ye), ne = Ae, ae(
              I,
              (tt) => nn({
                id: I,
                parts: Hn({
                  text: Ae
                }),
                components: [],
                status: {
                  type: "running"
                },
                thoughts: pe,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: [],
                userPrompt: tt.metadata?.custom?.userPrompt || ""
              })
            );
          },
          onSuggestions: (mt, Ae) => {
            if (W.signal.aborted || J.current || K.current !== _e) return;
            const Ie = Fe(mt || []);
            if (!Ie.length) return;
            const Ye = U.current, tt = QS(le.current);
            Ye && Ye !== I || !Ye && tt !== I || (x(Ie), _(Ae || I));
          }
        });
        X.current = ue.conversationId || X.current, B.current = "", J.current = !1;
        const Ue = ue.components || [], bn = Array.isArray(ue.thoughts) && ue.thoughts.length ? ue.thoughts : pe, sn = Fe(ue.suggestions || []), Yn = ue.answer || ne || ue.sourceText || "", Nr = ue.sourceText || Yn, Ds = nn({
          id: I,
          parts: Hn({
            text: Nr,
            components: Ue
          }),
          components: Ue,
          status: {
            type: "complete",
            reason: "stop"
          },
          thoughts: bn
        }), Pr = [
          ...oe,
          Ds
        ];
        le.current = Pr, y(Pr), sn.length && (x(sn), _(I));
      } catch (ue) {
        const Ue = J.current || W.signal.aborted;
        if (ue?.name === "AbortError" && Ue) {
          B.current = "", x([]), _(""), y([
            ...oe,
            Fl({
              id: I,
              text: ne,
              components: [],
              thoughts: pe
            })
          ]);
          return;
        }
        if (console.error("[AskCrystal] Assistant runtime failed.", ue), ae(
          I,
          (sn) => nn({
            id: I,
            parts: Hn({
              text: Mt(sn.content || sn.parts || []) || ne
            }),
            components: [],
            status: {
              type: "running"
            },
            thoughts: pe,
            statusText: "Reconnecting to your reading...",
            statusStage: "recover",
            ambientStatusText: "Reconnecting to your reading..."
          })
        ), await ce({
          expectedPrompt: dp(oe),
          poll: !0
        })) return;
        B.current = "", J.current = !1, x([]), _(""), y([
          ...oe,
          nn({
            id: I,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: ue?.message || "Unknown runtime error"
            },
            error: ue?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        N.current === W && (N.current = null), U.current === I && (U.current = ""), B.current && W.signal.aborted && (B.current = ""), D.current = !1, P(!1);
      }
    },
    [r, ce, ae]
  ), F = E.useCallback((M) => {
    const w = typeof M == "string" ? M.trim() : "";
    !w || D.current || $({
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
  }, [$]), te = E.useMemo(
    () => ({
      messages: g,
      suggestions: v,
      suggestionsMessageId: b,
      isRunning: A,
      setMessages: he,
      onImport: he,
      onNew: $,
      onCancel: ke,
      adapters: {
        threadList: {
          threadId: d || rS,
          threads: op(a).map((M) => ({
            id: M.id,
            remoteId: M.id,
            title: M.title
          }))
        }
      }
    }),
    [d, A, g, ke, $, he, a, v, b]
  );
  return {
    runtime: yy(te),
    hasUserMessages: g.some((M) => M.role === "user"),
    activeSessionId: d,
    sendPrompt: F,
    onCancel: ke,
    isRunning: A
  };
}
function fw({ product: r }) {
  return /* @__PURE__ */ p.jsxs("a", { className: "ac-homepage__product-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__product-media", children: r.image ? /* @__PURE__ */ p.jsx("img", { src: r.image, alt: r.title, loading: "lazy" }) : /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__product-meta", children: r.badge || "AskCrystal edit" }),
      /* @__PURE__ */ p.jsx("h3", { children: r.title }),
      r.summary ? /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__product-summary", children: r.summary }) : null,
      r.price ? /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__product-price", children: r.price }) : null,
      /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__product-link", children: "View the piece" })
    ] })
  ] });
}
function hw({ catalog: r }) {
  const n = String(r.title || "").trim().toLowerCase() === "products" ? "Curated crystal collection" : r.title || "Curated crystal collection";
  return /* @__PURE__ */ p.jsxs("a", { className: "ac-homepage__catalog-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__catalog-card-media", children: r.image ? /* @__PURE__ */ p.jsx("img", { src: r.image, alt: n, loading: "lazy" }) : /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__catalog-card-placeholder", children: "Collection" }) }),
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__catalog-card-copy", children: [
      /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__catalog-card-meta", children: r.count ? `${r.count} artist-selected pieces` : "Artist-selected collection" }),
      /* @__PURE__ */ p.jsx("h3", { children: n }),
      r.description ? /* @__PURE__ */ p.jsx("p", { children: r.description }) : null
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__catalog-card-products", "aria-label": `${n} preview products`, children: (r.previewProducts || []).map((i) => /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__catalog-card-product", children: i.image ? /* @__PURE__ */ p.jsx("img", { src: i.image, alt: i.title, loading: "lazy" }) : /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__catalog-card-product-placeholder", "aria-hidden": "true", children: "✦" }) }, i.id)) }),
    /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__catalog-card-link", children: "View collection" })
  ] });
}
function pw({ config: r }) {
  const n = Array.isArray(r.quickCatalogs) ? r.quickCatalogs.slice(0, 4) : ru;
  return n.length ? /* @__PURE__ */ p.jsxs("section", { className: "ac-homepage__catalog-band", "aria-labelledby": "ac-homepage-quick-catalogs-title", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__guide-shelf-header", children: [
      /* @__PURE__ */ p.jsxs("div", { children: [
        /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Collections" }),
        /* @__PURE__ */ p.jsx("h2", { id: "ac-homepage-quick-catalogs-title", children: r.quickCatalogsHeading || "Curated collections" })
      ] }),
      r.quickCatalogsBrowseLabel ? /* @__PURE__ */ p.jsx("a", { className: "ac-homepage__browse-link", href: r.browseUrl || "/collections", children: r.quickCatalogsBrowseLabel }) : null
    ] }),
    r.quickCatalogsDescription ? /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__catalog-band-note", children: r.quickCatalogsDescription }) : null,
    /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__catalog-rail", role: "list", "aria-label": r.quickCatalogsHeading || "Curated collections", children: n.map((i, a) => /* @__PURE__ */ p.jsx(hw, { catalog: i }, `${i.id || i.url || "catalog"}-${a}`)) })
  ] }) : null;
}
function gw() {
  return /* @__PURE__ */ p.jsxs("aside", { className: "ac-homepage__artist-card", "aria-labelledby": "ac-homepage-featured-artist-title", children: [
    /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__artist-media", children: /* @__PURE__ */ p.jsx(
      "img",
      {
        src: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/askcrystal-artist-daniel-moreau-profile.png?v=1777688900",
        alt: "Black and white portrait of Daniel Moreau",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__artist-copy", children: [
      /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Featured artist" }),
      /* @__PURE__ */ p.jsx("h2", { id: "ac-homepage-featured-artist-title", children: "Daniel Moreau" }),
      /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__artist-role", children: "AskCrystal Studio Designer" }),
      /* @__PURE__ */ p.jsx("p", { children: "Daniel approaches crystal objects through proportion and utility, giving grounding pieces a quiet architectural presence." }),
      /* @__PURE__ */ p.jsx("a", { className: "ac-homepage__artist-link", href: "/collections/best-sellers", children: "Explore his edit" })
    ] })
  ] });
}
function mw({ config: r }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__guide-shelf", children: [
    /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__guide-shelf-header", children: /* @__PURE__ */ p.jsxs("div", { children: [
      /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
      /* @__PURE__ */ p.jsx("h2", { children: r.shelfHeading || "Best sellers" })
    ] }) }),
    r.shelfNote ? /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__shelf-note", children: r.shelfNote }) : null,
    r.products.length ? /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ p.jsx(fw, { product: n }, n.id)) }) : /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a best sellers collection in the section settings to populate this edit." })
  ] });
}
function Df({ card: r }) {
  const { sendPrompt: n, isRunning: i } = Jh(), a = [
    "ac-homepage__guide-card",
    r.layout ? `ac-homepage__guide-card--${r.layout}` : "",
    r.emblemUrl ? "ac-homepage__guide-card--has-emblem" : ""
  ].filter(Boolean).join(" "), u = /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    r.emblemUrl ? /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__guide-card-emblem", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx("img", { src: r.emblemUrl, alt: "", loading: "lazy", decoding: "async" }) }) : null,
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__guide-card-copy", children: [
      /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__guide-card-eyebrow", children: r.eyebrow }),
      /* @__PURE__ */ p.jsx("h3", { children: r.title }),
      /* @__PURE__ */ p.jsx("p", { children: r.description })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__guide-card-footer", children: [
      /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__guide-card-action", children: r.cta }),
      /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__guide-card-arrow", "aria-hidden": "true", children: "→" })
    ] })
  ] });
  return r.prompt ? /* @__PURE__ */ p.jsx(
    "button",
    {
      type: "button",
      className: a,
      disabled: i,
      onClick: () => n(r.prompt),
      children: u
    }
  ) : /* @__PURE__ */ p.jsx("a", { className: a, href: r.href, children: u });
}
function yw({ config: r }) {
  const n = typeof r.headingLine1 == "string" ? r.headingLine1.trim() : "", i = typeof r.headingLine2Prefix == "string" ? r.headingLine2Prefix.trim() : "", a = typeof r.headingAccent == "string" ? r.headingAccent.trim() : "", u = typeof r.headingSuffix == "string" ? r.headingSuffix.trim() : "", d = a && u.toLowerCase().startsWith(`${a.toLowerCase()} `) ? u.slice(a.length).trimStart() : u, h = !!(n || i || a || d), g = [n, i].filter(Boolean).join(" "), y = (b, _) => {
    if (!b) return null;
    const A = Array.from(b.matchAll(/\byou\b/gi));
    if (!A.length)
      return b;
    const P = [];
    let N = 0;
    return A.forEach((U, B) => {
      const J = U.index ?? 0;
      J > N && P.push(
        /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__guide-title-copy", children: b.slice(N, J) }, `${_}-copy-${B}`)
      ), P.push(
        /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__guide-title-accent", children: U[0] }, `${_}-accent-${B}`)
      ), N = J + U[0].length;
    }), N < b.length && P.push(
      /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__guide-title-copy", children: b.slice(N) }, `${_}-copy-tail`)
    ), P;
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
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/horosope.webp?v=1777770463",
      prompt: "Give me today's horoscope guidance. Ask for my zodiac sign if you need it."
    },
    {
      id: "ask-anything",
      layout: "wide",
      eyebrow: "Open chat",
      title: "Enter the reading room",
      description: "Open a blank conversation and start with anything when you are ready.",
      cta: "Open chat",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/open_chat.webp?v=1777770463",
      href: np(r)
    },
    {
      id: "bazi",
      layout: "wide",
      eyebrow: "Bazi",
      title: "Four Pillars birth chart",
      description: "Read elemental balance, timing, and life patterns from birth details.",
      cta: "Start Bazi",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/bazi.webp?v=1777770463",
      prompt: "I want a Bazi Four Pillars reading. Ask me for the birth details you need."
    },
    {
      id: "fengshui",
      layout: "wide",
      eyebrow: "Feng shui",
      title: "Space energy audit",
      description: "Read a room layout for flow, blocked areas, and practical placement shifts.",
      cta: "Audit my room",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/fengshui.webp?v=1777770463",
      prompt: "Audit the feng shui of my room. Ask me for the room layout details you need."
    },
    {
      id: "shushu",
      layout: "compact",
      eyebrow: "Numerology",
      title: "Shushu number profile",
      description: "Use birth numbers for personality themes, cycles, and current emphasis.",
      cta: "Read numbers",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/numerology.webp?v=1777770463",
      prompt: "Create a Shushu numerology profile. Ask me for the birth date if you need it."
    },
    {
      id: "taibu",
      layout: "compact",
      eyebrow: "Not sure?",
      title: "Choose the right reading",
      description: "Describe the situation and AskCrystal will choose the cleanest divination path.",
      cta: "Help me choose",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/choose_reading.webp?v=1777770463",
      prompt: "Help me choose the right reading method for my situation."
    },
    {
      id: "crystal-match",
      layout: "wide",
      eyebrow: "Crystal match",
      title: "Find one shop piece",
      description: "Turn a feeling, intention, or reading into a grounded jewelry recommendation.",
      cta: "Match me",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/crystal_match.webp?v=1777770463",
      prompt: "Recommend one crystal jewelry piece from the shop for my current need."
    },
    {
      id: "shop-intention",
      layout: "compact",
      eyebrow: "Shop intent",
      title: "Browse by intention",
      description: "Calm, protection, love, focus, abundance, sleep, or grounding.",
      cta: "Shop intent",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/shop_intent.webp?v=1777770463",
      prompt: "Help me shop crystals by intention. Ask me which intention I want to focus on."
    },
    {
      id: "care-ritual",
      layout: "compact",
      eyebrow: "Ritual",
      title: "Crystal care practice",
      description: "Learn a simple way to cleanse, charge, wear, or place a stone.",
      cta: "Create ritual",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/ritual.webp?v=1777770463",
      prompt: "Teach me a simple crystal care ritual for a stone I own."
    }
  ], x = {
    id: "store-help",
    layout: "strip",
    eyebrow: "Store help",
    title: "Product, policy, and cart questions",
    description: "Ask about a product, compare options, or check shop guidance.",
    cta: "Ask store",
    emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/policy.webp?v=1777770463",
    prompt: "I have a store or product question. Help me find the answer."
  };
  return /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__welcome", children: /* @__PURE__ */ p.jsxs("section", { className: "ac-homepage__guide", "aria-label": "Guided AskCrystal paths", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__guide-header", children: [
      /* @__PURE__ */ p.jsx("p", { className: "ac-homepage__guide-kicker", children: r.eyebrow }),
      /* @__PURE__ */ p.jsx("h1", { className: "ac-homepage__guide-title", children: h ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        g ? /* @__PURE__ */ p.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          g,
          a || d ? " " : ""
        ] }) : null,
        a ? /* @__PURE__ */ p.jsx("span", { className: "ac-homepage__guide-title-accent", children: a }) : null,
        d ? /* @__PURE__ */ p.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          g || a ? " " : "",
          y(d, "heading-suffix")
        ] }) : null
      ] }) : r.heading })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__guide-grid", children: [
      v.map((b) => /* @__PURE__ */ p.jsx(Df, { card: b }, b.id)),
      /* @__PURE__ */ p.jsx(pw, { config: r }),
      /* @__PURE__ */ p.jsx(gw, {}),
      /* @__PURE__ */ p.jsx(mw, { config: r }),
      /* @__PURE__ */ p.jsx(Df, { card: x })
    ] })
  ] }) });
}
function vw() {
  const r = E.useRef(null), [n, i] = E.useState(!1), a = E.useCallback(() => {
    const u = r.current;
    if (!u) {
      i(!1);
      return;
    }
    const d = u.scrollHeight > u.clientHeight + 2;
    i((h) => h === d ? h : d);
  }, []);
  return E.useEffect(() => {
    const u = window.requestAnimationFrame(a);
    return () => window.cancelAnimationFrame(u);
  }, [a]), /* @__PURE__ */ p.jsx(Rh, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ p.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ p.jsx(
          Mh,
          {
            ref: r,
            className: "ac-homepage__composer-input",
            placeholder: "ask me anything",
            minRows: 1,
            maxRows: aS,
            autoFocus: !1,
            onChange: () => {
              window.requestAnimationFrame(a);
            },
            onHeightChange: () => {
              window.requestAnimationFrame(a);
            }
          }
        ),
        /* @__PURE__ */ p.jsxs("div", { className: "ac-homepage__composer-actions", children: [
          /* @__PURE__ */ p.jsx(Al, { running: !1, children: /* @__PURE__ */ p.jsx(Xv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ p.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ p.jsx(Al, { running: !0, children: /* @__PURE__ */ p.jsx(y_, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function _w() {
  return typeof document > "u" ? null : bm.createPortal(
    /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ p.jsx(vw, {}) }),
    document.body
  );
}
function Sw() {
  return /* @__PURE__ */ p.jsx(Xl, { className: "ac-message ac-message--user", children: /* @__PURE__ */ p.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ p.jsx(Zl, {}) }) });
}
function ww() {
  const { sendPrompt: r, isRunning: n } = Jh(), i = Ge((g) => g.id || ""), a = Ge((g) => g.status?.type === "complete"), u = Te(({ thread: g }) => g.suggestions || ru), d = Te(({ thread: g }) => g.isRunning), h = Te(({ thread: g }) => {
    for (let y = g.messages.length - 1; y >= 0; y -= 1) {
      const v = g.messages[y];
      if (v?.role === "assistant")
        return v.id === i;
    }
    return !1;
  });
  return !a || d || !h || !u.length ? null : /* @__PURE__ */ p.jsx("div", { className: "ac-message__suggestions", "aria-label": "Suggested follow-up prompts", children: u.map((g, y) => /* @__PURE__ */ p.jsx(
    "button",
    {
      type: "button",
      className: "ac-message__suggestion",
      disabled: d || n,
      onClick: () => r(g.prompt),
      children: g.prompt
    },
    `${i}-suggestion-${y}-${g.prompt}`
  )) });
}
function xw(r = "") {
  if (typeof r != "string" || !r.trim()) return "";
  try {
    const n = JSON.parse(r);
    if (Array.isArray(n))
      return n.map((i) => typeof i == "string" ? i : "").filter(Boolean).join(", ");
  } catch {
  }
  return r;
}
const Bf = [
  "Settling into the shape of your question...",
  "Listening for the clearest thread...",
  "Letting the reading gather itself...",
  "Bringing the guidance into plain language..."
];
function js(r = "") {
  return String(r).toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}
function mp(r = "", n = "") {
  const i = js(r), a = js(`${r} ${n}`);
  return /search catalog|catalog|collection|product search|shopify search/.test(a) ? "Looking for a crystal match..." : /get product details|product details|variant|inventory|price/.test(a) ? "Verifying the strongest match..." : /cart|checkout|update cart|get cart/.test(a) ? /update/.test(i) ? "Preparing the cart update..." : "Opening your cart..." : /policy|faq|shipping|return|store question/.test(a) ? "Checking the store guidance..." : /horoscope|zodiac|astrology|planet|daily guidance|star/.test(a) ? "Aligning today’s sky pattern..." : /bazi|four pillars|day master|heavenly stem|earthly branch/.test(a) ? "Mapping the elemental structure..." : /tarot|spread|card/.test(a) ? "Drawing the symbolic spread..." : /fengshui|feng shui|space audit|room|placement/.test(a) ? "Tracing the room’s energy flow..." : /yinyuan|matchmaking|relationship|compatib|connection/.test(a) ? "Reading the connection pattern..." : /numerology|shushu|number profile/.test(a) ? "Following the number pattern..." : /taibu|router|structured divination|route/.test(a) ? "Choosing the clearest reading path..." : /crystal|stone|chakra|ritual|intention|energy/.test(a) ? "Looking for a crystal match..." : r ? "Consulting the right tool..." : "";
}
function Ew(r, n = 0) {
  const i = xw(r?.tool || ""), a = [
    r?.thought,
    r?.toolInput,
    r?.observation
  ].filter(Boolean).join(" "), u = mp(i, a);
  if (u) return u;
  const d = js(a);
  return /search|look up|find|catalog|product|shop|store|inventory/.test(d) ? "Checking the crystal edit..." : /chart|zodiac|horoscope|planet|bazi|tarot|feng|numerology|relationship|compatib/.test(d) ? "Reading the pattern..." : /recommend|guidance|answer|respond|final|compose/.test(d) ? "Bringing the guidance into focus..." : /tool|workflow|call|input|observation/.test(d) ? "Consulting the right tool..." : Bf[n % Bf.length];
}
function yp(r = [], n = !1) {
  const i = go(r), a = /* @__PURE__ */ new Map();
  i.forEach((d, h) => {
    const g = Ew(d, h);
    if (!g) return;
    const y = `${g}:${d.tool || ""}`, v = a.get(y), x = !!d.observation || !n && h < i.length - 1;
    a.set(y, {
      id: d.id || y,
      label: g,
      isFinished: v?.isFinished || x,
      order: v?.order ?? h
    });
  });
  const u = Array.from(a.values()).sort((d, h) => d.order - h.order);
  return u.length ? u.map((d, h) => {
    const g = n && h === u.length - 1 && !d.isFinished;
    return {
      ...d,
      isCurrent: g,
      isFinished: !g && (d.isFinished || h < u.length - 1)
    };
  }) : [];
}
function kw(r, n = 0) {
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
function Ls(r) {
  return Array.isArray(r) ? r.map(kw).filter(Boolean).sort((n, i) => n.order - i.order) : [];
}
function bw({ statusText: r = "" }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "ac-dify-pending", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ p.jsx("span", { className: "ac-dify-pending__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ p.jsx("span", { children: r || "Thinking..." })
  ] });
}
function Cw({
  statusText: r = "",
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  progressEntries: u = []
}) {
  const d = E.useMemo(
    () => Ls(u),
    [u]
  ), h = d.find((_) => _.isCurrent) || d[d.length - 1] || null, g = Ir(n), y = g[g.length - 1] || "", v = r || h?.label || y || "The reading is still moving...", x = js(`${i} ${a} ${v}`), b = /shopify|catalog|product|crystal|cart|store|shelf|match/.test(x) ? "shop" : /horoscope|zodiac|bazi|tarot|feng|yinyuan|numerology|shushu|reading|chart|pattern/.test(x) ? "reading" : "general";
  return /* @__PURE__ */ p.jsxs(
    "div",
    {
      className: `ac-continuation-signal ac-continuation-signal--${b}`,
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ p.jsx("span", { className: "ac-continuation-signal__glyph", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx("span", {}) }),
        /* @__PURE__ */ p.jsxs("span", { className: "ac-continuation-signal__copy", children: [
          /* @__PURE__ */ p.jsx("span", { className: "ac-continuation-signal__eyebrow", children: "Signal still moving" }),
          /* @__PURE__ */ p.jsx("span", { className: "ac-continuation-signal__line", children: v })
        ] })
      ]
    }
  );
}
function Tw() {
  return /* @__PURE__ */ p.jsx("div", { className: "ac-message__ready", children: "✦ Your reading is ready" });
}
function Iw() {
  const r = Ge(($) => $.content || $.parts || ru), n = Mt(r), i = r.some(($) => $.type === "tool-call"), a = Ge(($) => $.status?.type === "running"), u = Ge(($) => $.metadata?.custom?.statusText || ""), d = Ge(($) => $.metadata?.custom?.statusStage || ""), h = Ge(($) => $.metadata?.custom?.statusTool || ""), g = Ge(($) => $.metadata?.custom?.statusHistoryText || ""), y = Ge(($) => $.metadata?.custom?.ambientStatusText || ""), v = Ge(($) => $.metadata?.custom?.statusElapsedMs || 0), x = Ge(($) => $.metadata?.custom?.difyProgressEntries), b = Ge(($) => $.metadata?.custom?.continuationStatusText || ""), _ = Ge(($) => $.metadata?.custom?.continuationStatusStage || ""), A = Ge(($) => $.metadata?.custom?.continuationStatusTool || ""), P = Ge(($) => $.metadata?.custom?.continuationStatusHistoryText || ""), N = Ge(($) => $.metadata?.custom?.continuationProgressEntries), U = Ge(($) => $.metadata?.custom?.userPrompt || ""), B = E.useMemo(() => Ls(x), [x]), J = E.useMemo(
    () => Ls(N),
    [N]
  ), X = B.length > 0, le = a && !n && !i && !X, fe = !!n || i, K = a && !fe, D = a && fe && !!(b || P || J.length), H = B.find(($) => $.isCurrent) || B[B.length - 1] || null, se = g || B.map(($) => $.label).join(`
`), ge = u || H?.label || "", ve = E.useMemo(() => ({
    statusText: ge,
    statusHistoryText: se,
    statusStage: d || (X ? "tool" : "listen"),
    statusTool: h,
    ambientStatusText: y,
    statusElapsedMs: v,
    progressEntries: B,
    userPrompt: U
  }), [
    y,
    B,
    X,
    se,
    ge,
    v,
    d,
    h,
    U
  ]), [me, he] = E.useState({
    isVisible: K,
    isExiting: !1,
    props: ve
  }), ae = E.useRef(K), ce = E.useRef(null), ke = E.useRef(ve);
  return E.useEffect(() => {
    ke.current = ve;
  }, [ve]), E.useEffect(() => {
    K && (ce.current && (window.clearTimeout(ce.current), ce.current = null), ae.current = !0, he({
      isVisible: !0,
      isExiting: !1,
      props: ve
    }));
  }, [ve, K]), E.useEffect(() => {
    if (!K) {
      if (!ae.current) {
        he({
          isVisible: !1,
          isExiting: !1,
          props: ve
        });
        return;
      }
      if (!ce.current)
        return ae.current = !1, he(($) => ({
          ...$,
          isExiting: !0
        })), ce.current = window.setTimeout(() => {
          he({
            isVisible: !1,
            isExiting: !1,
            props: ke.current
          }), ce.current = null;
        }, 280), () => {
          ce.current && (window.clearTimeout(ce.current), ce.current = null);
        };
    }
  }, [K]), E.useEffect(() => () => {
    ce.current && (window.clearTimeout(ce.current), ce.current = null);
  }, []), /* @__PURE__ */ p.jsxs(Xl, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ p.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ p.jsxs("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: [
      me.isVisible ? /* @__PURE__ */ p.jsx(
        BS,
        {
          ...me.props,
          isExiting: me.isExiting
        }
      ) : null,
      fe ? /* @__PURE__ */ p.jsxs("div", { className: "ac-message__content-layer", children: [
        /* @__PURE__ */ p.jsx(Tw, {}),
        /* @__PURE__ */ p.jsx(
          Zl,
          {
            components: {
              Text: ({ text: $ }) => /* @__PURE__ */ p.jsx(ap, { text: $ }),
              ...nS
            }
          }
        ),
        D ? /* @__PURE__ */ p.jsx(
          Cw,
          {
            statusText: b,
            statusHistoryText: P,
            statusStage: _,
            statusTool: A,
            progressEntries: J
          }
        ) : null
      ] }) : le && !K ? /* @__PURE__ */ p.jsx(bw, { statusText: u }) : null
    ] }),
    /* @__PURE__ */ p.jsx(ww, {}),
    /* @__PURE__ */ p.jsx(Th, { children: /* @__PURE__ */ p.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function Rw() {
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
  return /* @__PURE__ */ p.jsxs("div", { className: "ac-chat-page__welcome-card", children: [
    /* @__PURE__ */ p.jsx("p", { className: "ac-chat-page__welcome-kicker", children: "Welcome in" }),
    /* @__PURE__ */ p.jsx("h2", { children: "Ask for a reading, a crystal match, or a practical next step." }),
    /* @__PURE__ */ p.jsx("p", { children: "AskCrystal can read Bazi charts, daily horoscopes, tarot spreads, relationship patterns, feng shui layouts, Shushu numerology, and then connect the guidance to real crystal jewelry and care rituals when shopping is useful." }),
    /* @__PURE__ */ p.jsx("div", { className: "ac-chat-page__welcome-chips", "aria-label": "AskCrystal capabilities", children: r.map((n) => /* @__PURE__ */ p.jsx("span", { children: n }, n)) })
  ] });
}
function Aw({ hasUserMessages: r = !1 }) {
  return /* @__PURE__ */ p.jsxs("section", { className: "ac-chat-page__hero", "aria-label": "AskCrystal reading room", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "ac-chat-page__hero-copy", children: [
      /* @__PURE__ */ p.jsx("h1", { children: "Hi, I’m AskCrystal" }),
      /* @__PURE__ */ p.jsx("p", { children: "Your guide for readings, crystals, rituals, and clarity." })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "ac-chat-page__orb", "aria-hidden": "true", children: [
      /* @__PURE__ */ p.jsx("span", { className: "ac-chat-page__orb-field" }),
      /* @__PURE__ */ p.jsx("span", { className: "ac-chat-page__orb-ring ac-chat-page__orb-ring--outer" }),
      /* @__PURE__ */ p.jsx("span", { className: "ac-chat-page__orb-ring ac-chat-page__orb-ring--inner" }),
      /* @__PURE__ */ p.jsx("span", { className: "ac-chat-page__orb-aperture" }),
      /* @__PURE__ */ p.jsx("span", { className: "ac-chat-page__orb-horizon" })
    ] }),
    r ? null : /* @__PURE__ */ p.jsx(Rw, {})
  ] });
}
function Mw({ config: r }) {
  const { runtime: n, hasUserMessages: i, activeSessionId: a, sendPrompt: u, onCancel: d, isRunning: h } = dw(r), g = E.useMemo(() => ({
    sendPrompt: u,
    onCancel: d,
    isRunning: h
  }), [h, d, u]), y = tp(r), v = y === "chat", x = v && i, b = E.useRef(null), _ = E.useRef(null), A = E.useRef(!1), P = E.useRef(!1);
  E.useEffect(() => {
    if (!v || P.current || h) return;
    P.current = !0;
    const U = mS();
    if (!U) return;
    const B = window.setTimeout(() => {
      u(U);
    }, 80);
    return () => window.clearTimeout(B);
  }, [v, h, u]), E.useEffect(() => {
    if (!_.current) return;
    const B = window.requestAnimationFrame(() => {
      if (_.current) {
        if (!x) {
          A.current = !1, _.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        A.current || (A.current = !0, _.current.scrollTo({ top: _.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame(B);
  }, [a, x]), E.useEffect(() => {
    const U = b.current, B = _.current;
    if (!U || !B || typeof window > "u") return;
    const J = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let X = 0, le = Math.max(1, B.clientHeight || 1);
    const fe = /* @__PURE__ */ new Map(), K = (me) => Math.round(me), D = (me) => Math.round(me * 100) / 100, H = (me, he) => {
      fe.get(me) !== he && (fe.set(me, he), U.style.setProperty(me, he));
    }, se = () => {
      X = 0;
      const me = B.scrollTop, he = Math.max(280, Math.min(520, le * 0.68)), ae = Math.max(0, 1 - me / he);
      if (!v) {
        const $ = J?.matches ? 0 : Math.min(92, me * 0.28);
        H("--ac-homepage-backdrop-offset", `${K($)}px`), H("--ac-homepage-backdrop-opacity", String(D(ae)));
        return;
      }
      const ce = 18, ke = J?.matches ? ce : ce + Math.min(260, me * 0.34);
      H("--ac-chat-bg-offset", `${K(ke)}px`), H("--ac-chat-bg-opacity", String(D(ae)));
    }, ge = () => {
      X || (X = window.requestAnimationFrame(se));
    }, ve = () => {
      le = Math.max(1, B.clientHeight || 1), ge();
    };
    return se(), B.addEventListener("scroll", ge, { passive: !0 }), window.addEventListener("resize", ve, { passive: !0 }), () => {
      B.removeEventListener("scroll", ge), window.removeEventListener("resize", ve), X && window.cancelAnimationFrame(X);
    };
  }, [a, i, v]);
  const N = [
    "ac-homepage",
    `ac-homepage--${y}`,
    v ? i ? "ac-homepage--has-messages" : "ac-homepage--empty" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p.jsx(Kh.Provider, { value: g, children: /* @__PURE__ */ p.jsx(yv, { runtime: n, children: /* @__PURE__ */ p.jsxs("div", { ref: b, className: N, children: [
    v ? null : /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__backdrop", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx("img", { src: oS, alt: "", loading: "eager", decoding: "async" }) }),
    /* @__PURE__ */ p.jsx(Nh, { className: "ac-homepage__thread", children: /* @__PURE__ */ p.jsxs(
      jh,
      {
        ref: _,
        className: "ac-homepage__viewport",
        autoScroll: x,
        turnAnchor: x ? "bottom" : "top",
        scrollToBottomOnInitialize: !1,
        scrollToBottomOnRunStart: x,
        scrollToBottomOnThreadSwitch: x,
        children: [
          v ? /* @__PURE__ */ p.jsx(Aw, { hasUserMessages: i }) : /* @__PURE__ */ p.jsx(yw, { config: r }),
          v ? /* @__PURE__ */ p.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ p.jsx(
            b_,
            {
              components: {
                UserMessage: Sw,
                AssistantMessage: Iw
              }
            }
          ) }) : null,
          /* @__PURE__ */ p.jsx(_w, {})
        ]
      }
    ) })
  ] }) }) });
}
function Nw(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || uo.has(i)) return;
  const a = lS(n);
  if (!a) return;
  const u = km.createRoot(r);
  u.render(/* @__PURE__ */ p.jsx(Mw, { config: a })), uo.set(i, u);
}
function Pw(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = uo.get(n);
  i && (i.unmount(), uo.delete(n));
}
function vp(r = document) {
  r.querySelectorAll(Gh).forEach((n) => Nw(n));
}
function jw(r) {
  r.querySelectorAll(Gh).forEach((n) => Pw(n));
}
vp();
document.addEventListener("shopify:section:load", (r) => {
  vp(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  jw(r.target);
});
