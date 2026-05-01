function um(r, n) {
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
var ll = { exports: {} }, hs = {}, ul = { exports: {} }, ue = {};
var $d;
function cm() {
  if ($d) return ue;
  $d = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), h = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), x = /* @__PURE__ */ Symbol.for("react.lazy"), k = Symbol.iterator;
  function _(w) {
    return w === null || typeof w != "object" ? null : (w = k && w[k] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var I = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, N = Object.assign, L = {};
  function B(w, R, H) {
    this.props = w, this.context = R, this.refs = L, this.updater = H || I;
  }
  B.prototype.isReactComponent = {}, B.prototype.setState = function(w, R) {
    if (typeof w != "object" && typeof w != "function" && w != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, w, R, "setState");
  }, B.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function V() {
  }
  V.prototype = B.prototype;
  function K(w, R, H) {
    this.props = w, this.context = R, this.refs = L, this.updater = H || I;
  }
  var U = K.prototype = new V();
  U.constructor = K, N(U, B.prototype), U.isPureReactComponent = !0;
  var ne = Array.isArray, ce = Object.prototype.hasOwnProperty, ie = { current: null }, D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Q(w, R, H) {
    var re, se = {}, ee = null, le = null;
    if (R != null) for (re in R.ref !== void 0 && (le = R.ref), R.key !== void 0 && (ee = "" + R.key), R) ce.call(R, re) && !D.hasOwnProperty(re) && (se[re] = R[re]);
    var fe = arguments.length - 2;
    if (fe === 1) se.children = H;
    else if (1 < fe) {
      for (var ae = Array(fe), Ue = 0; Ue < fe; Ue++) ae[Ue] = arguments[Ue + 2];
      se.children = ae;
    }
    if (w && w.defaultProps) for (re in fe = w.defaultProps, fe) se[re] === void 0 && (se[re] = fe[re]);
    return { $$typeof: r, type: w, key: ee, ref: le, props: se, _owner: ie.current };
  }
  function oe(w, R) {
    return { $$typeof: r, type: w.type, key: R, ref: w.ref, props: w.props, _owner: w._owner };
  }
  function Se(w) {
    return typeof w == "object" && w !== null && w.$$typeof === r;
  }
  function Re(w) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(H) {
      return R[H];
    });
  }
  var ye = /\/+/g;
  function ve(w, R) {
    return typeof w == "object" && w !== null && w.key != null ? Re("" + w.key) : R.toString(36);
  }
  function _e(w, R, H, re, se) {
    var ee = typeof w;
    (ee === "undefined" || ee === "boolean") && (w = null);
    var le = !1;
    if (w === null) le = !0;
    else switch (ee) {
      case "string":
      case "number":
        le = !0;
        break;
      case "object":
        switch (w.$$typeof) {
          case r:
          case n:
            le = !0;
        }
    }
    if (le) return le = w, se = se(le), w = re === "" ? "." + ve(le, 0) : re, ne(se) ? (H = "", w != null && (H = w.replace(ye, "$&/") + "/"), _e(se, R, H, "", function(Ue) {
      return Ue;
    })) : se != null && (Se(se) && (se = oe(se, H + (!se.key || le && le.key === se.key ? "" : ("" + se.key).replace(ye, "$&/") + "/") + w)), R.push(se)), 1;
    if (le = 0, re = re === "" ? "." : re + ":", ne(w)) for (var fe = 0; fe < w.length; fe++) {
      ee = w[fe];
      var ae = re + ve(ee, fe);
      le += _e(ee, R, H, ae, se);
    }
    else if (ae = _(w), typeof ae == "function") for (w = ae.call(w), fe = 0; !(ee = w.next()).done; ) ee = ee.value, ae = re + ve(ee, fe++), le += _e(ee, R, H, ae, se);
    else if (ee === "object") throw R = String(w), Error("Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead.");
    return le;
  }
  function ze(w, R, H) {
    if (w == null) return w;
    var re = [], se = 0;
    return _e(w, re, "", "", function(ee) {
      return R.call(H, ee, se++);
    }), re;
  }
  function Ae(w) {
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
  var pe = { current: null }, F = { transition: null }, Z = { ReactCurrentDispatcher: pe, ReactCurrentBatchConfig: F, ReactCurrentOwner: ie };
  function M() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ue.Children = { map: ze, forEach: function(w, R, H) {
    ze(w, function() {
      R.apply(this, arguments);
    }, H);
  }, count: function(w) {
    var R = 0;
    return ze(w, function() {
      R++;
    }), R;
  }, toArray: function(w) {
    return ze(w, function(R) {
      return R;
    }) || [];
  }, only: function(w) {
    if (!Se(w)) throw Error("React.Children.only expected to receive a single React element child.");
    return w;
  } }, ue.Component = B, ue.Fragment = i, ue.Profiler = u, ue.PureComponent = K, ue.StrictMode = a, ue.Suspense = y, ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, ue.act = M, ue.cloneElement = function(w, R, H) {
    if (w == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + w + ".");
    var re = N({}, w.props), se = w.key, ee = w.ref, le = w._owner;
    if (R != null) {
      if (R.ref !== void 0 && (ee = R.ref, le = ie.current), R.key !== void 0 && (se = "" + R.key), w.type && w.type.defaultProps) var fe = w.type.defaultProps;
      for (ae in R) ce.call(R, ae) && !D.hasOwnProperty(ae) && (re[ae] = R[ae] === void 0 && fe !== void 0 ? fe[ae] : R[ae]);
    }
    var ae = arguments.length - 2;
    if (ae === 1) re.children = H;
    else if (1 < ae) {
      fe = Array(ae);
      for (var Ue = 0; Ue < ae; Ue++) fe[Ue] = arguments[Ue + 2];
      re.children = fe;
    }
    return { $$typeof: r, type: w.type, key: se, ref: ee, props: re, _owner: le };
  }, ue.createContext = function(w) {
    return w = { $$typeof: h, _currentValue: w, _currentValue2: w, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, w.Provider = { $$typeof: d, _context: w }, w.Consumer = w;
  }, ue.createElement = Q, ue.createFactory = function(w) {
    var R = Q.bind(null, w);
    return R.type = w, R;
  }, ue.createRef = function() {
    return { current: null };
  }, ue.forwardRef = function(w) {
    return { $$typeof: p, render: w };
  }, ue.isValidElement = Se, ue.lazy = function(w) {
    return { $$typeof: x, _payload: { _status: -1, _result: w }, _init: Ae };
  }, ue.memo = function(w, R) {
    return { $$typeof: v, type: w, compare: R === void 0 ? null : R };
  }, ue.startTransition = function(w) {
    var R = F.transition;
    F.transition = {};
    try {
      w();
    } finally {
      F.transition = R;
    }
  }, ue.unstable_act = M, ue.useCallback = function(w, R) {
    return pe.current.useCallback(w, R);
  }, ue.useContext = function(w) {
    return pe.current.useContext(w);
  }, ue.useDebugValue = function() {
  }, ue.useDeferredValue = function(w) {
    return pe.current.useDeferredValue(w);
  }, ue.useEffect = function(w, R) {
    return pe.current.useEffect(w, R);
  }, ue.useId = function() {
    return pe.current.useId();
  }, ue.useImperativeHandle = function(w, R, H) {
    return pe.current.useImperativeHandle(w, R, H);
  }, ue.useInsertionEffect = function(w, R) {
    return pe.current.useInsertionEffect(w, R);
  }, ue.useLayoutEffect = function(w, R) {
    return pe.current.useLayoutEffect(w, R);
  }, ue.useMemo = function(w, R) {
    return pe.current.useMemo(w, R);
  }, ue.useReducer = function(w, R, H) {
    return pe.current.useReducer(w, R, H);
  }, ue.useRef = function(w) {
    return pe.current.useRef(w);
  }, ue.useState = function(w) {
    return pe.current.useState(w);
  }, ue.useSyncExternalStore = function(w, R, H) {
    return pe.current.useSyncExternalStore(w, R, H);
  }, ue.useTransition = function() {
    return pe.current.useTransition();
  }, ue.version = "18.3.1", ue;
}
var Hd;
function Ll() {
  return Hd || (Hd = 1, ul.exports = cm()), ul.exports;
}
var Vd;
function dm() {
  if (Vd) return hs;
  Vd = 1;
  var r = Ll(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(p, y, v) {
    var x, k = {}, _ = null, I = null;
    v !== void 0 && (_ = "" + v), y.key !== void 0 && (_ = "" + y.key), y.ref !== void 0 && (I = y.ref);
    for (x in y) a.call(y, x) && !d.hasOwnProperty(x) && (k[x] = y[x]);
    if (p && p.defaultProps) for (x in y = p.defaultProps, y) k[x] === void 0 && (k[x] = y[x]);
    return { $$typeof: n, type: p, key: _, ref: I, props: k, _owner: u.current };
  }
  return hs.Fragment = i, hs.jsx = h, hs.jsxs = h, hs;
}
var Wd;
function fm() {
  return Wd || (Wd = 1, ll.exports = dm()), ll.exports;
}
var g = fm(), b = Ll();
const At = /* @__PURE__ */ zf(b), hm = /* @__PURE__ */ um({
  __proto__: null,
  default: At
}, [b]);
var Bi = {}, cl = { exports: {} }, lt = {}, dl = { exports: {} }, fl = {};
var Yd;
function pm() {
  return Yd || (Yd = 1, (function(r) {
    function n(F, Z) {
      var M = F.length;
      F.push(Z);
      e: for (; 0 < M; ) {
        var w = M - 1 >>> 1, R = F[w];
        if (0 < u(R, Z)) F[w] = Z, F[M] = R, M = w;
        else break e;
      }
    }
    function i(F) {
      return F.length === 0 ? null : F[0];
    }
    function a(F) {
      if (F.length === 0) return null;
      var Z = F[0], M = F.pop();
      if (M !== Z) {
        F[0] = M;
        e: for (var w = 0, R = F.length, H = R >>> 1; w < H; ) {
          var re = 2 * (w + 1) - 1, se = F[re], ee = re + 1, le = F[ee];
          if (0 > u(se, M)) ee < R && 0 > u(le, se) ? (F[w] = le, F[ee] = M, w = ee) : (F[w] = se, F[re] = M, w = re);
          else if (ee < R && 0 > u(le, M)) F[w] = le, F[ee] = M, w = ee;
          else break e;
        }
      }
      return Z;
    }
    function u(F, Z) {
      var M = F.sortIndex - Z.sortIndex;
      return M !== 0 ? M : F.id - Z.id;
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
    var y = [], v = [], x = 1, k = null, _ = 3, I = !1, N = !1, L = !1, B = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function U(F) {
      for (var Z = i(v); Z !== null; ) {
        if (Z.callback === null) a(v);
        else if (Z.startTime <= F) a(v), Z.sortIndex = Z.expirationTime, n(y, Z);
        else break;
        Z = i(v);
      }
    }
    function ne(F) {
      if (L = !1, U(F), !N) if (i(y) !== null) N = !0, Ae(ce);
      else {
        var Z = i(v);
        Z !== null && pe(ne, Z.startTime - F);
      }
    }
    function ce(F, Z) {
      N = !1, L && (L = !1, V(Q), Q = -1), I = !0;
      var M = _;
      try {
        for (U(Z), k = i(y); k !== null && (!(k.expirationTime > Z) || F && !Re()); ) {
          var w = k.callback;
          if (typeof w == "function") {
            k.callback = null, _ = k.priorityLevel;
            var R = w(k.expirationTime <= Z);
            Z = r.unstable_now(), typeof R == "function" ? k.callback = R : k === i(y) && a(y), U(Z);
          } else a(y);
          k = i(y);
        }
        if (k !== null) var H = !0;
        else {
          var re = i(v);
          re !== null && pe(ne, re.startTime - Z), H = !1;
        }
        return H;
      } finally {
        k = null, _ = M, I = !1;
      }
    }
    var ie = !1, D = null, Q = -1, oe = 5, Se = -1;
    function Re() {
      return !(r.unstable_now() - Se < oe);
    }
    function ye() {
      if (D !== null) {
        var F = r.unstable_now();
        Se = F;
        var Z = !0;
        try {
          Z = D(!0, F);
        } finally {
          Z ? ve() : (ie = !1, D = null);
        }
      } else ie = !1;
    }
    var ve;
    if (typeof K == "function") ve = function() {
      K(ye);
    };
    else if (typeof MessageChannel < "u") {
      var _e = new MessageChannel(), ze = _e.port2;
      _e.port1.onmessage = ye, ve = function() {
        ze.postMessage(null);
      };
    } else ve = function() {
      B(ye, 0);
    };
    function Ae(F) {
      D = F, ie || (ie = !0, ve());
    }
    function pe(F, Z) {
      Q = B(function() {
        F(r.unstable_now());
      }, Z);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(F) {
      F.callback = null;
    }, r.unstable_continueExecution = function() {
      N || I || (N = !0, Ae(ce));
    }, r.unstable_forceFrameRate = function(F) {
      0 > F || 125 < F ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : oe = 0 < F ? Math.floor(1e3 / F) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return _;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(y);
    }, r.unstable_next = function(F) {
      switch (_) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = _;
      }
      var M = _;
      _ = Z;
      try {
        return F();
      } finally {
        _ = M;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(F, Z) {
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
        return Z();
      } finally {
        _ = M;
      }
    }, r.unstable_scheduleCallback = function(F, Z, M) {
      var w = r.unstable_now();
      switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? w + M : w) : M = w, F) {
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
      return R = M + R, F = { id: x++, callback: Z, priorityLevel: F, startTime: M, expirationTime: R, sortIndex: -1 }, M > w ? (F.sortIndex = M, n(v, F), i(y) === null && F === i(v) && (L ? (V(Q), Q = -1) : L = !0, pe(ne, M - w))) : (F.sortIndex = R, n(y, F), N || I || (N = !0, Ae(ce))), F;
    }, r.unstable_shouldYield = Re, r.unstable_wrapCallback = function(F) {
      var Z = _;
      return function() {
        var M = _;
        _ = Z;
        try {
          return F.apply(this, arguments);
        } finally {
          _ = M;
        }
      };
    };
  })(fl)), fl;
}
var Gd;
function gm() {
  return Gd || (Gd = 1, dl.exports = pm()), dl.exports;
}
var qd;
function mm() {
  if (qd) return lt;
  qd = 1;
  var r = Ll(), n = gm();
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
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), y = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, x = {}, k = {};
  function _(e) {
    return y.call(k, e) ? !0 : y.call(x, e) ? !1 : v.test(e) ? k[e] = !0 : (x[e] = !0, !1);
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
  function L(e, t, s, o, l, c, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = s, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = f;
  }
  var B = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    B[e] = new L(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    B[t] = new L(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    B[e] = new L(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    B[e] = new L(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    B[e] = new L(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    B[e] = new L(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    B[e] = new L(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    B[e] = new L(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    B[e] = new L(e, 5, !1, e.toLowerCase(), null, !1, !1);
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
    B[t] = new L(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(V, K);
    B[t] = new L(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(V, K);
    B[t] = new L(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    B[e] = new L(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), B.xlinkHref = new L("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    B[e] = new L(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function U(e, t, s, o) {
    var l = B.hasOwnProperty(t) ? B[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (N(t, s, l, o) && (s = null), o || l === null ? _(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var ne = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ce = /* @__PURE__ */ Symbol.for("react.element"), ie = /* @__PURE__ */ Symbol.for("react.portal"), D = /* @__PURE__ */ Symbol.for("react.fragment"), Q = /* @__PURE__ */ Symbol.for("react.strict_mode"), oe = /* @__PURE__ */ Symbol.for("react.profiler"), Se = /* @__PURE__ */ Symbol.for("react.provider"), Re = /* @__PURE__ */ Symbol.for("react.context"), ye = /* @__PURE__ */ Symbol.for("react.forward_ref"), ve = /* @__PURE__ */ Symbol.for("react.suspense"), _e = /* @__PURE__ */ Symbol.for("react.suspense_list"), ze = /* @__PURE__ */ Symbol.for("react.memo"), Ae = /* @__PURE__ */ Symbol.for("react.lazy"), pe = /* @__PURE__ */ Symbol.for("react.offscreen"), F = Symbol.iterator;
  function Z(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
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
  function re(e, t) {
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
      H = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? R(e) : "";
  }
  function se(e) {
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
        return e = re(e.type, !1), e;
      case 11:
        return e = re(e.type.render, !1), e;
      case 1:
        return e = re(e.type, !0), e;
      default:
        return "";
    }
  }
  function ee(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case D:
        return "Fragment";
      case ie:
        return "Portal";
      case oe:
        return "Profiler";
      case Q:
        return "StrictMode";
      case ve:
        return "Suspense";
      case _e:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Re:
        return (e.displayName || "Context") + ".Consumer";
      case Se:
        return (e._context.displayName || "Context") + ".Provider";
      case ye:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ze:
        return t = e.displayName || null, t !== null ? t : ee(e.type) || "Memo";
      case Ae:
        t = e._payload, e = e._init;
        try {
          return ee(e(t));
        } catch {
        }
    }
    return null;
  }
  function le(e) {
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
  function fe(e) {
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
  function Ue(e) {
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
  function kn(e) {
    e._valueTracker || (e._valueTracker = Ue(e));
  }
  function rn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = ae(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
  }
  function Yn(e) {
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
    s = fe(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Ir(e, t) {
    t = t.checked, t != null && U(e, "checked", t, !1);
  }
  function wt(e, t) {
    Ir(e, t);
    var s = fe(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Le(e, t.type, s) : t.hasOwnProperty("defaultValue") && Le(e, t.type, fe(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function je(e, t, s) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function Le(e, t, s) {
    (t !== "number" || Yn(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var Ge = Array.isArray;
  function ht(e, t, s, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < s.length; l++) t["$" + s[l]] = !0;
      for (s = 0; s < e.length; s++) l = t.hasOwnProperty("$" + e[s].value), e[s].selected !== l && (e[s].selected = l), l && o && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + fe(s), t = null, l = 0; l < e.length; l++) {
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
        if (Ge(s)) {
          if (1 < s.length) throw Error(i(93));
          s = s[0];
        }
        t = s;
      }
      t == null && (t = ""), s = t;
    }
    e._wrapperState = { initialValue: fe(s) };
  }
  function Zl(e, t) {
    var s = fe(t.value), o = fe(t.defaultValue);
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
  function _o(e, t) {
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
  }, hp = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ar).forEach(function(e) {
    hp.forEach(function(t) {
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
  var pp = M({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function So(e, t) {
    if (t) {
      if (pp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function wo(e, t) {
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
  var xo = null;
  function Eo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ko = null, Gn = null, qn = null;
  function iu(e) {
    if (e = Xr(e)) {
      if (typeof ko != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = ei(t), ko(e.stateNode, e.type, t));
    }
  }
  function ou(e) {
    Gn ? qn ? qn.push(e) : qn = [e] : Gn = e;
  }
  function au() {
    if (Gn) {
      var e = Gn, t = qn;
      if (qn = Gn = null, iu(e), t) for (e = 0; e < t.length; e++) iu(t[e]);
    }
  }
  function lu(e, t) {
    return e(t);
  }
  function uu() {
  }
  var bo = !1;
  function cu(e, t, s) {
    if (bo) return e(t, s);
    bo = !0;
    try {
      return lu(e, t, s);
    } finally {
      bo = !1, (Gn !== null || qn !== null) && (uu(), au());
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
  var Co = !1;
  if (p) try {
    var Nr = {};
    Object.defineProperty(Nr, "passive", { get: function() {
      Co = !0;
    } }), window.addEventListener("test", Nr, Nr), window.removeEventListener("test", Nr, Nr);
  } catch {
    Co = !1;
  }
  function gp(e, t, s, o, l, c, f, m, S) {
    var A = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, A);
    } catch (j) {
      this.onError(j);
    }
  }
  var Pr = !1, Ns = null, Ps = !1, To = null, mp = { onError: function(e) {
    Pr = !0, Ns = e;
  } };
  function yp(e, t, s, o, l, c, f, m, S) {
    Pr = !1, Ns = null, gp.apply(mp, arguments);
  }
  function vp(e, t, s, o, l, c, f, m, S) {
    if (yp.apply(this, arguments), Pr) {
      if (Pr) {
        var A = Ns;
        Pr = !1, Ns = null;
      } else throw Error(i(198));
      Ps || (Ps = !0, To = A);
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
  function _p(e) {
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
  function hu(e) {
    return e = _p(e), e !== null ? pu(e) : null;
  }
  function pu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = pu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var gu = n.unstable_scheduleCallback, mu = n.unstable_cancelCallback, Sp = n.unstable_shouldYield, wp = n.unstable_requestPaint, Ne = n.unstable_now, xp = n.unstable_getCurrentPriorityLevel, Io = n.unstable_ImmediatePriority, yu = n.unstable_UserBlockingPriority, js = n.unstable_NormalPriority, Ep = n.unstable_LowPriority, vu = n.unstable_IdlePriority, Ls = null, Lt = null;
  function kp(e) {
    if (Lt && typeof Lt.onCommitFiberRoot == "function") try {
      Lt.onCommitFiberRoot(Ls, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var xt = Math.clz32 ? Math.clz32 : Tp, bp = Math.log, Cp = Math.LN2;
  function Tp(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (bp(e) / Cp | 0) | 0;
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
      var m = f & ~l;
      m !== 0 ? o = jr(m) : (c &= f, c !== 0 && (o = jr(c)));
    } else f = s & ~l, f !== 0 ? o = jr(f) : c !== 0 && (o = jr(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - xt(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function Ip(e, t) {
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
  function Rp(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var f = 31 - xt(c), m = 1 << f, S = l[f];
      S === -1 ? ((m & s) === 0 || (m & o) !== 0) && (l[f] = Ip(m, t)) : S <= t && (e.expiredLanes |= m), c &= ~m;
    }
  }
  function Ro(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function _u() {
    var e = Os;
    return Os <<= 1, (Os & 4194240) === 0 && (Os = 64), e;
  }
  function Ao(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Lr(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - xt(t), e[t] = s;
  }
  function Ap(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - xt(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function Mo(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - xt(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var me = 0;
  function Su(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var wu, No, xu, Eu, ku, Po = !1, Bs = [], sn = null, on = null, an = null, Or = /* @__PURE__ */ new Map(), zr = /* @__PURE__ */ new Map(), ln = [], Mp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
  function Np(e, t, s, o, l) {
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
      var s = Lo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        xo = o, s.target.dispatchEvent(o), xo = null;
      } else return t = Xr(s), t !== null && No(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function Tu(e, t, s) {
    Fs(e) && s.delete(t);
  }
  function Pp() {
    Po = !1, sn !== null && Fs(sn) && (sn = null), on !== null && Fs(on) && (on = null), an !== null && Fs(an) && (an = null), Or.forEach(Tu), zr.forEach(Tu);
  }
  function Br(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Po || (Po = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Pp)));
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
  var Qn = ne.ReactCurrentBatchConfig, Us = !0;
  function jp(e, t, s, o) {
    var l = me, c = Qn.transition;
    Qn.transition = null;
    try {
      me = 1, jo(e, t, s, o);
    } finally {
      me = l, Qn.transition = c;
    }
  }
  function Lp(e, t, s, o) {
    var l = me, c = Qn.transition;
    Qn.transition = null;
    try {
      me = 4, jo(e, t, s, o);
    } finally {
      me = l, Qn.transition = c;
    }
  }
  function jo(e, t, s, o) {
    if (Us) {
      var l = Lo(e, t, s, o);
      if (l === null) Xo(e, t, o, $s, s), bu(e, o);
      else if (Np(l, e, t, s, o)) o.stopPropagation();
      else if (bu(e, o), t & 4 && -1 < Mp.indexOf(e)) {
        for (; l !== null; ) {
          var c = Xr(l);
          if (c !== null && wu(c), c = Lo(e, t, s, o), c === null && Xo(e, t, o, $s, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else Xo(e, t, o, null, s);
    }
  }
  var $s = null;
  function Lo(e, t, s, o) {
    if ($s = null, e = Eo(o), e = Cn(e), e !== null) if (t = bn(e), t === null) e = null;
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
        switch (xp()) {
          case Io:
            return 1;
          case yu:
            return 4;
          case js:
          case Ep:
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
  var un = null, Oo = null, Hs = null;
  function Ru() {
    if (Hs) return Hs;
    var e, t = Oo, s = t.length, o, l = "value" in un ? un.value : un.textContent, c = l.length;
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
  function ut(e) {
    function t(s, o, l, c, f) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var m in e) e.hasOwnProperty(m) && (s = e[m], this[m] = s ? s(c) : c[m]);
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
  }, defaultPrevented: 0, isTrusted: 0 }, zo = ut(Kn), Ur = M({}, Kn, { view: 0, detail: 0 }), Op = ut(Ur), Do, Bo, $r, Ys = M({}, Ur, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Uo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== $r && ($r && e.type === "mousemove" ? (Do = e.screenX - $r.screenX, Bo = e.screenY - $r.screenY) : Bo = Do = 0, $r = e), Do);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Bo;
  } }), Mu = ut(Ys), zp = M({}, Ys, { dataTransfer: 0 }), Dp = ut(zp), Bp = M({}, Ur, { relatedTarget: 0 }), Fo = ut(Bp), Fp = M({}, Kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Up = ut(Fp), $p = M({}, Kn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Hp = ut($p), Vp = M({}, Kn, { data: 0 }), Nu = ut(Vp), Wp = {
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
  }, Yp = {
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
  }, Gp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function qp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Gp[e]) ? !!t[e] : !1;
  }
  function Uo() {
    return qp;
  }
  var Qp = M({}, Ur, { key: function(e) {
    if (e.key) {
      var t = Wp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Vs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Yp[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Uo, charCode: function(e) {
    return e.type === "keypress" ? Vs(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Vs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Kp = ut(Qp), Jp = M({}, Ys, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Pu = ut(Jp), Xp = M({}, Ur, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Uo }), Zp = ut(Xp), eg = M({}, Kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), tg = ut(eg), ng = M({}, Ys, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), rg = ut(ng), sg = [9, 13, 27, 32], $o = p && "CompositionEvent" in window, Hr = null;
  p && "documentMode" in document && (Hr = document.documentMode);
  var ig = p && "TextEvent" in window && !Hr, ju = p && (!$o || Hr && 8 < Hr && 11 >= Hr), Lu = " ", Ou = !1;
  function zu(e, t) {
    switch (e) {
      case "keyup":
        return sg.indexOf(t.keyCode) !== -1;
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
  function og(e, t) {
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
  function ag(e, t) {
    if (Jn) return e === "compositionend" || !$o && zu(e, t) ? (e = Ru(), Hs = Oo = un = null, Jn = !1, e) : null;
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
  var lg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Bu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!lg[e.type] : t === "textarea";
  }
  function Fu(e, t, s, o) {
    ou(o), t = Js(t, "onChange"), 0 < t.length && (s = new zo("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var Vr = null, Wr = null;
  function ug(e) {
    sc(e, 0);
  }
  function Gs(e) {
    var t = nr(e);
    if (rn(t)) return e;
  }
  function cg(e, t) {
    if (e === "change") return t;
  }
  var Uu = !1;
  if (p) {
    var Ho;
    if (p) {
      var Vo = "oninput" in document;
      if (!Vo) {
        var $u = document.createElement("div");
        $u.setAttribute("oninput", "return;"), Vo = typeof $u.oninput == "function";
      }
      Ho = Vo;
    } else Ho = !1;
    Uu = Ho && (!document.documentMode || 9 < document.documentMode);
  }
  function Hu() {
    Vr && (Vr.detachEvent("onpropertychange", Vu), Wr = Vr = null);
  }
  function Vu(e) {
    if (e.propertyName === "value" && Gs(Wr)) {
      var t = [];
      Fu(t, Wr, e, Eo(e)), cu(ug, t);
    }
  }
  function dg(e, t, s) {
    e === "focusin" ? (Hu(), Vr = t, Wr = s, Vr.attachEvent("onpropertychange", Vu)) : e === "focusout" && Hu();
  }
  function fg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Gs(Wr);
  }
  function hg(e, t) {
    if (e === "click") return Gs(t);
  }
  function pg(e, t) {
    if (e === "input" || e === "change") return Gs(t);
  }
  function gg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Et = typeof Object.is == "function" ? Object.is : gg;
  function Yr(e, t) {
    if (Et(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var s = Object.keys(e), o = Object.keys(t);
    if (s.length !== o.length) return !1;
    for (o = 0; o < s.length; o++) {
      var l = s[o];
      if (!y.call(t, l) || !Et(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Wu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Yu(e, t) {
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
  function Gu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Gu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function qu() {
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
  function Wo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function mg(e) {
    var t = qu(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Gu(s.ownerDocument.documentElement, s)) {
      if (o !== null && Wo(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = Yu(s, c);
          var f = Yu(
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
  var yg = p && "documentMode" in document && 11 >= document.documentMode, Xn = null, Yo = null, Gr = null, Go = !1;
  function Qu(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Go || Xn == null || Xn !== Yn(o) || (o = Xn, "selectionStart" in o && Wo(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Gr && Yr(Gr, o) || (Gr = o, o = Js(Yo, "onSelect"), 0 < o.length && (t = new zo("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = Xn)));
  }
  function qs(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var Zn = { animationend: qs("Animation", "AnimationEnd"), animationiteration: qs("Animation", "AnimationIteration"), animationstart: qs("Animation", "AnimationStart"), transitionend: qs("Transition", "TransitionEnd") }, qo = {}, Ku = {};
  p && (Ku = document.createElement("div").style, "AnimationEvent" in window || (delete Zn.animationend.animation, delete Zn.animationiteration.animation, delete Zn.animationstart.animation), "TransitionEvent" in window || delete Zn.transitionend.transition);
  function Qs(e) {
    if (qo[e]) return qo[e];
    if (!Zn[e]) return e;
    var t = Zn[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Ku) return qo[e] = t[s];
    return e;
  }
  var Ju = Qs("animationend"), Xu = Qs("animationiteration"), Zu = Qs("animationstart"), ec = Qs("transitionend"), tc = /* @__PURE__ */ new Map(), nc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function cn(e, t) {
    tc.set(e, t), d(t, [e]);
  }
  for (var Qo = 0; Qo < nc.length; Qo++) {
    var Ko = nc[Qo], vg = Ko.toLowerCase(), _g = Ko[0].toUpperCase() + Ko.slice(1);
    cn(vg, "on" + _g);
  }
  cn(Ju, "onAnimationEnd"), cn(Xu, "onAnimationIteration"), cn(Zu, "onAnimationStart"), cn("dblclick", "onDoubleClick"), cn("focusin", "onFocus"), cn("focusout", "onBlur"), cn(ec, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var qr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Sg = new Set("cancel close invalid load scroll toggle".split(" ").concat(qr));
  function rc(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, vp(o, t, void 0, e), e.currentTarget = null;
  }
  function sc(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var m = o[f], S = m.instance, A = m.currentTarget;
          if (m = m.listener, S !== c && l.isPropagationStopped()) break e;
          rc(l, m, A), c = S;
        }
        else for (f = 0; f < o.length; f++) {
          if (m = o[f], S = m.instance, A = m.currentTarget, m = m.listener, S !== c && l.isPropagationStopped()) break e;
          rc(l, m, A), c = S;
        }
      }
    }
    if (Ps) throw e = To, Ps = !1, To = null, e;
  }
  function xe(e, t) {
    var s = t[sa];
    s === void 0 && (s = t[sa] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (ic(t, e, 2, !1), s.add(o));
  }
  function Jo(e, t, s) {
    var o = 0;
    t && (o |= 4), ic(s, e, o, t);
  }
  var Ks = "_reactListening" + Math.random().toString(36).slice(2);
  function Qr(e) {
    if (!e[Ks]) {
      e[Ks] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (Sg.has(s) || Jo(s, !1, e), Jo(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ks] || (t[Ks] = !0, Jo("selectionchange", !1, t));
    }
  }
  function ic(e, t, s, o) {
    switch (Iu(t)) {
      case 1:
        var l = jp;
        break;
      case 4:
        l = Lp;
        break;
      default:
        l = jo;
    }
    s = l.bind(null, t, s, e), l = void 0, !Co || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, s, { capture: !0, passive: l }) : e.addEventListener(t, s, !0) : l !== void 0 ? e.addEventListener(t, s, { passive: l }) : e.addEventListener(t, s, !1);
  }
  function Xo(e, t, s, o, l) {
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
          if (f = Cn(m), f === null) return;
          if (S = f.tag, S === 5 || S === 6) {
            o = c = f;
            continue e;
          }
          m = m.parentNode;
        }
      }
      o = o.return;
    }
    cu(function() {
      var A = c, j = Eo(s), O = [];
      e: {
        var P = tc.get(e);
        if (P !== void 0) {
          var $ = zo, Y = e;
          switch (e) {
            case "keypress":
              if (Vs(s) === 0) break e;
            case "keydown":
            case "keyup":
              $ = Kp;
              break;
            case "focusin":
              Y = "focus", $ = Fo;
              break;
            case "focusout":
              Y = "blur", $ = Fo;
              break;
            case "beforeblur":
            case "afterblur":
              $ = Fo;
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
              $ = Mu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              $ = Dp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              $ = Zp;
              break;
            case Ju:
            case Xu:
            case Zu:
              $ = Up;
              break;
            case ec:
              $ = tg;
              break;
            case "scroll":
              $ = Op;
              break;
            case "wheel":
              $ = rg;
              break;
            case "copy":
            case "cut":
            case "paste":
              $ = Hp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              $ = Pu;
          }
          var G = (t & 4) !== 0, Pe = !G && e === "scroll", C = G ? P !== null ? P + "Capture" : null : P;
          G = [];
          for (var E = A, T; E !== null; ) {
            T = E;
            var z = T.stateNode;
            if (T.tag === 5 && z !== null && (T = z, C !== null && (z = Mr(E, C), z != null && G.push(Kr(E, z, T)))), Pe) break;
            E = E.return;
          }
          0 < G.length && (P = new $(P, Y, null, s, j), O.push({ event: P, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", $ = e === "mouseout" || e === "pointerout", P && s !== xo && (Y = s.relatedTarget || s.fromElement) && (Cn(Y) || Y[Yt])) break e;
          if (($ || P) && (P = j.window === j ? j : (P = j.ownerDocument) ? P.defaultView || P.parentWindow : window, $ ? (Y = s.relatedTarget || s.toElement, $ = A, Y = Y ? Cn(Y) : null, Y !== null && (Pe = bn(Y), Y !== Pe || Y.tag !== 5 && Y.tag !== 6) && (Y = null)) : ($ = null, Y = A), $ !== Y)) {
            if (G = Mu, z = "onMouseLeave", C = "onMouseEnter", E = "mouse", (e === "pointerout" || e === "pointerover") && (G = Pu, z = "onPointerLeave", C = "onPointerEnter", E = "pointer"), Pe = $ == null ? P : nr($), T = Y == null ? P : nr(Y), P = new G(z, E + "leave", $, s, j), P.target = Pe, P.relatedTarget = T, z = null, Cn(j) === A && (G = new G(C, E + "enter", Y, s, j), G.target = T, G.relatedTarget = Pe, z = G), Pe = z, $ && Y) t: {
              for (G = $, C = Y, E = 0, T = G; T; T = er(T)) E++;
              for (T = 0, z = C; z; z = er(z)) T++;
              for (; 0 < E - T; ) G = er(G), E--;
              for (; 0 < T - E; ) C = er(C), T--;
              for (; E--; ) {
                if (G === C || C !== null && G === C.alternate) break t;
                G = er(G), C = er(C);
              }
              G = null;
            }
            else G = null;
            $ !== null && oc(O, P, $, G, !1), Y !== null && Pe !== null && oc(O, Pe, Y, G, !0);
          }
        }
        e: {
          if (P = A ? nr(A) : window, $ = P.nodeName && P.nodeName.toLowerCase(), $ === "select" || $ === "input" && P.type === "file") var q = cg;
          else if (Bu(P)) if (Uu) q = pg;
          else {
            q = fg;
            var J = dg;
          }
          else ($ = P.nodeName) && $.toLowerCase() === "input" && (P.type === "checkbox" || P.type === "radio") && (q = hg);
          if (q && (q = q(e, A))) {
            Fu(O, q, s, j);
            break e;
          }
          J && J(e, P, A), e === "focusout" && (J = P._wrapperState) && J.controlled && P.type === "number" && Le(P, "number", P.value);
        }
        switch (J = A ? nr(A) : window, e) {
          case "focusin":
            (Bu(J) || J.contentEditable === "true") && (Xn = J, Yo = A, Gr = null);
            break;
          case "focusout":
            Gr = Yo = Xn = null;
            break;
          case "mousedown":
            Go = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Go = !1, Qu(O, s, j);
            break;
          case "selectionchange":
            if (yg) break;
          case "keydown":
          case "keyup":
            Qu(O, s, j);
        }
        var X;
        if ($o) e: {
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
        else Jn ? zu(e, s) && (te = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (te = "onCompositionStart");
        te && (ju && s.locale !== "ko" && (Jn || te !== "onCompositionStart" ? te === "onCompositionEnd" && Jn && (X = Ru()) : (un = j, Oo = "value" in un ? un.value : un.textContent, Jn = !0)), J = Js(A, te), 0 < J.length && (te = new Nu(te, e, null, s, j), O.push({ event: te, listeners: J }), X ? te.data = X : (X = Du(s), X !== null && (te.data = X)))), (X = ig ? og(e, s) : ag(e, s)) && (A = Js(A, "onBeforeInput"), 0 < A.length && (j = new Nu("onBeforeInput", "beforeinput", null, s, j), O.push({ event: j, listeners: A }), j.data = X));
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
      var m = s, S = m.alternate, A = m.stateNode;
      if (S !== null && S === o) break;
      m.tag === 5 && A !== null && (m = A, l ? (S = Mr(s, c), S != null && f.unshift(Kr(s, S, m))) : l || (S = Mr(s, c), S != null && f.push(Kr(s, S, m)))), s = s.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var wg = /\r\n?/g, xg = /\u0000|\uFFFD/g;
  function ac(e) {
    return (typeof e == "string" ? e : "" + e).replace(wg, `
`).replace(xg, "");
  }
  function Xs(e, t, s) {
    if (t = ac(t), ac(e) !== t && s) throw Error(i(425));
  }
  function Zs() {
  }
  var Zo = null, ea = null;
  function ta(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var na = typeof setTimeout == "function" ? setTimeout : void 0, Eg = typeof clearTimeout == "function" ? clearTimeout : void 0, lc = typeof Promise == "function" ? Promise : void 0, kg = typeof queueMicrotask == "function" ? queueMicrotask : typeof lc < "u" ? function(e) {
    return lc.resolve(null).then(e).catch(bg);
  } : na;
  function bg(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ra(e, t) {
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
  var tr = Math.random().toString(36).slice(2), Ot = "__reactFiber$" + tr, Jr = "__reactProps$" + tr, Yt = "__reactContainer$" + tr, sa = "__reactEvents$" + tr, Cg = "__reactListeners$" + tr, Tg = "__reactHandles$" + tr;
  function Cn(e) {
    var t = e[Ot];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[Yt] || s[Ot]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = uc(e); e !== null; ) {
          if (s = e[Ot]) return s;
          e = uc(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Xr(e) {
    return e = e[Ot] || e[Yt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function nr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function ei(e) {
    return e[Jr] || null;
  }
  var ia = [], rr = -1;
  function fn(e) {
    return { current: e };
  }
  function Ee(e) {
    0 > rr || (e.current = ia[rr], ia[rr] = null, rr--);
  }
  function we(e, t) {
    rr++, ia[rr] = e.current, e.current = t;
  }
  var hn = {}, qe = fn(hn), rt = fn(!1), Tn = hn;
  function sr(e, t) {
    var s = e.type.contextTypes;
    if (!s) return hn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var l = {}, c;
    for (c in s) l[c] = t[c];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function st(e) {
    return e = e.childContextTypes, e != null;
  }
  function ti() {
    Ee(rt), Ee(qe);
  }
  function cc(e, t, s) {
    if (qe.current !== hn) throw Error(i(168));
    we(qe, t), we(rt, s);
  }
  function dc(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, le(e) || "Unknown", l));
    return M({}, s, o);
  }
  function ni(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || hn, Tn = qe.current, we(qe, e), we(rt, rt.current), !0;
  }
  function fc(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = dc(e, t, Tn), o.__reactInternalMemoizedMergedChildContext = e, Ee(rt), Ee(qe), we(qe, e)) : Ee(rt), we(rt, s);
  }
  var Gt = null, ri = !1, oa = !1;
  function hc(e) {
    Gt === null ? Gt = [e] : Gt.push(e);
  }
  function Ig(e) {
    ri = !0, hc(e);
  }
  function pn() {
    if (!oa && Gt !== null) {
      oa = !0;
      var e = 0, t = me;
      try {
        var s = Gt;
        for (me = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Gt = null, ri = !1;
      } catch (l) {
        throw Gt !== null && (Gt = Gt.slice(e + 1)), gu(Io, pn), l;
      } finally {
        me = t, oa = !1;
      }
    }
    return null;
  }
  var ir = [], or = 0, si = null, ii = 0, pt = [], gt = 0, In = null, qt = 1, Qt = "";
  function Rn(e, t) {
    ir[or++] = ii, ir[or++] = si, si = e, ii = t;
  }
  function pc(e, t, s) {
    pt[gt++] = qt, pt[gt++] = Qt, pt[gt++] = In, In = e;
    var o = qt;
    e = Qt;
    var l = 32 - xt(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - xt(t) + l;
    if (30 < c) {
      var f = l - l % 5;
      c = (o & (1 << f) - 1).toString(32), o >>= f, l -= f, qt = 1 << 32 - xt(t) + l | s << l | o, Qt = c + e;
    } else qt = 1 << c | s << l | o, Qt = e;
  }
  function aa(e) {
    e.return !== null && (Rn(e, 1), pc(e, 1, 0));
  }
  function la(e) {
    for (; e === si; ) si = ir[--or], ir[or] = null, ii = ir[--or], ir[or] = null;
    for (; e === In; ) In = pt[--gt], pt[gt] = null, Qt = pt[--gt], pt[gt] = null, qt = pt[--gt], pt[gt] = null;
  }
  var ct = null, dt = null, be = !1, kt = null;
  function gc(e, t) {
    var s = _t(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function mc(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ct = e, dt = dn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ct = e, dt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = In !== null ? { id: qt, overflow: Qt } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = _t(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, ct = e, dt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ua(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ca(e) {
    if (be) {
      var t = dt;
      if (t) {
        var s = t;
        if (!mc(e, t)) {
          if (ua(e)) throw Error(i(418));
          t = dn(s.nextSibling);
          var o = ct;
          t && mc(e, t) ? gc(o, s) : (e.flags = e.flags & -4097 | 2, be = !1, ct = e);
        }
      } else {
        if (ua(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, be = !1, ct = e;
      }
    }
  }
  function yc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ct = e;
  }
  function oi(e) {
    if (e !== ct) return !1;
    if (!be) return yc(e), be = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ta(e.type, e.memoizedProps)), t && (t = dt)) {
      if (ua(e)) throw vc(), Error(i(418));
      for (; t; ) gc(e, t), t = dn(t.nextSibling);
    }
    if (yc(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (t === 0) {
                dt = dn(e.nextSibling);
                break e;
              }
              t--;
            } else s !== "$" && s !== "$!" && s !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        dt = null;
      }
    } else dt = ct ? dn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function vc() {
    for (var e = dt; e; ) e = dn(e.nextSibling);
  }
  function ar() {
    dt = ct = null, be = !1;
  }
  function da(e) {
    kt === null ? kt = [e] : kt.push(e);
  }
  var Rg = ne.ReactCurrentBatchConfig;
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
          var m = l.refs;
          f === null ? delete m[c] : m[c] = f;
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
    function m(C, E, T, z) {
      return E === null || E.tag !== 6 ? (E = nl(T, C.mode, z), E.return = C, E) : (E = l(E, T), E.return = C, E);
    }
    function S(C, E, T, z) {
      var q = T.type;
      return q === D ? j(C, E, T.props.children, z, T.key) : E !== null && (E.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Ae && _c(q) === E.type) ? (z = l(E, T.props), z.ref = Zr(C, E, T), z.return = C, z) : (z = Mi(T.type, T.key, T.props, null, C.mode, z), z.ref = Zr(C, E, T), z.return = C, z);
    }
    function A(C, E, T, z) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== T.containerInfo || E.stateNode.implementation !== T.implementation ? (E = rl(T, C.mode, z), E.return = C, E) : (E = l(E, T.children || []), E.return = C, E);
    }
    function j(C, E, T, z, q) {
      return E === null || E.tag !== 7 ? (E = zn(T, C.mode, z, q), E.return = C, E) : (E = l(E, T), E.return = C, E);
    }
    function O(C, E, T) {
      if (typeof E == "string" && E !== "" || typeof E == "number") return E = nl("" + E, C.mode, T), E.return = C, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case ce:
            return T = Mi(E.type, E.key, E.props, null, C.mode, T), T.ref = Zr(C, null, E), T.return = C, T;
          case ie:
            return E = rl(E, C.mode, T), E.return = C, E;
          case Ae:
            var z = E._init;
            return O(C, z(E._payload), T);
        }
        if (Ge(E) || Z(E)) return E = zn(E, C.mode, T, null), E.return = C, E;
        ai(C, E);
      }
      return null;
    }
    function P(C, E, T, z) {
      var q = E !== null ? E.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return q !== null ? null : m(C, E, "" + T, z);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case ce:
            return T.key === q ? S(C, E, T, z) : null;
          case ie:
            return T.key === q ? A(C, E, T, z) : null;
          case Ae:
            return q = T._init, P(
              C,
              E,
              q(T._payload),
              z
            );
        }
        if (Ge(T) || Z(T)) return q !== null ? null : j(C, E, T, z, null);
        ai(C, T);
      }
      return null;
    }
    function $(C, E, T, z, q) {
      if (typeof z == "string" && z !== "" || typeof z == "number") return C = C.get(T) || null, m(E, C, "" + z, q);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case ce:
            return C = C.get(z.key === null ? T : z.key) || null, S(E, C, z, q);
          case ie:
            return C = C.get(z.key === null ? T : z.key) || null, A(E, C, z, q);
          case Ae:
            var J = z._init;
            return $(C, E, T, J(z._payload), q);
        }
        if (Ge(z) || Z(z)) return C = C.get(T) || null, j(E, C, z, q, null);
        ai(E, z);
      }
      return null;
    }
    function Y(C, E, T, z) {
      for (var q = null, J = null, X = E, te = E = 0, Ve = null; X !== null && te < T.length; te++) {
        X.index > te ? (Ve = X, X = null) : Ve = X.sibling;
        var he = P(C, X, T[te], z);
        if (he === null) {
          X === null && (X = Ve);
          break;
        }
        e && X && he.alternate === null && t(C, X), E = c(he, E, te), J === null ? q = he : J.sibling = he, J = he, X = Ve;
      }
      if (te === T.length) return s(C, X), be && Rn(C, te), q;
      if (X === null) {
        for (; te < T.length; te++) X = O(C, T[te], z), X !== null && (E = c(X, E, te), J === null ? q = X : J.sibling = X, J = X);
        return be && Rn(C, te), q;
      }
      for (X = o(C, X); te < T.length; te++) Ve = $(X, C, te, T[te], z), Ve !== null && (e && Ve.alternate !== null && X.delete(Ve.key === null ? te : Ve.key), E = c(Ve, E, te), J === null ? q = Ve : J.sibling = Ve, J = Ve);
      return e && X.forEach(function(En) {
        return t(C, En);
      }), be && Rn(C, te), q;
    }
    function G(C, E, T, z) {
      var q = Z(T);
      if (typeof q != "function") throw Error(i(150));
      if (T = q.call(T), T == null) throw Error(i(151));
      for (var J = q = null, X = E, te = E = 0, Ve = null, he = T.next(); X !== null && !he.done; te++, he = T.next()) {
        X.index > te ? (Ve = X, X = null) : Ve = X.sibling;
        var En = P(C, X, he.value, z);
        if (En === null) {
          X === null && (X = Ve);
          break;
        }
        e && X && En.alternate === null && t(C, X), E = c(En, E, te), J === null ? q = En : J.sibling = En, J = En, X = Ve;
      }
      if (he.done) return s(
        C,
        X
      ), be && Rn(C, te), q;
      if (X === null) {
        for (; !he.done; te++, he = T.next()) he = O(C, he.value, z), he !== null && (E = c(he, E, te), J === null ? q = he : J.sibling = he, J = he);
        return be && Rn(C, te), q;
      }
      for (X = o(C, X); !he.done; te++, he = T.next()) he = $(X, C, te, he.value, z), he !== null && (e && he.alternate !== null && X.delete(he.key === null ? te : he.key), E = c(he, E, te), J === null ? q = he : J.sibling = he, J = he);
      return e && X.forEach(function(lm) {
        return t(C, lm);
      }), be && Rn(C, te), q;
    }
    function Pe(C, E, T, z) {
      if (typeof T == "object" && T !== null && T.type === D && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case ce:
            e: {
              for (var q = T.key, J = E; J !== null; ) {
                if (J.key === q) {
                  if (q = T.type, q === D) {
                    if (J.tag === 7) {
                      s(C, J.sibling), E = l(J, T.props.children), E.return = C, C = E;
                      break e;
                    }
                  } else if (J.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Ae && _c(q) === J.type) {
                    s(C, J.sibling), E = l(J, T.props), E.ref = Zr(C, J, T), E.return = C, C = E;
                    break e;
                  }
                  s(C, J);
                  break;
                } else t(C, J);
                J = J.sibling;
              }
              T.type === D ? (E = zn(T.props.children, C.mode, z, T.key), E.return = C, C = E) : (z = Mi(T.type, T.key, T.props, null, C.mode, z), z.ref = Zr(C, E, T), z.return = C, C = z);
            }
            return f(C);
          case ie:
            e: {
              for (J = T.key; E !== null; ) {
                if (E.key === J) if (E.tag === 4 && E.stateNode.containerInfo === T.containerInfo && E.stateNode.implementation === T.implementation) {
                  s(C, E.sibling), E = l(E, T.children || []), E.return = C, C = E;
                  break e;
                } else {
                  s(C, E);
                  break;
                }
                else t(C, E);
                E = E.sibling;
              }
              E = rl(T, C.mode, z), E.return = C, C = E;
            }
            return f(C);
          case Ae:
            return J = T._init, Pe(C, E, J(T._payload), z);
        }
        if (Ge(T)) return Y(C, E, T, z);
        if (Z(T)) return G(C, E, T, z);
        ai(C, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, E !== null && E.tag === 6 ? (s(C, E.sibling), E = l(E, T), E.return = C, C = E) : (s(C, E), E = nl(T, C.mode, z), E.return = C, C = E), f(C)) : s(C, E);
    }
    return Pe;
  }
  var lr = Sc(!0), wc = Sc(!1), li = fn(null), ui = null, ur = null, fa = null;
  function ha() {
    fa = ur = ui = null;
  }
  function pa(e) {
    var t = li.current;
    Ee(li), e._currentValue = t;
  }
  function ga(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function cr(e, t) {
    ui = e, fa = ur = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (it = !0), e.firstContext = null);
  }
  function mt(e) {
    var t = e._currentValue;
    if (fa !== e) if (e = { context: e, memoizedValue: t, next: null }, ur === null) {
      if (ui === null) throw Error(i(308));
      ur = e, ui.dependencies = { lanes: 0, firstContext: e };
    } else ur = ur.next = e;
    return t;
  }
  var An = null;
  function ma(e) {
    An === null ? An = [e] : An.push(e);
  }
  function xc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, ma(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Kt(e, o);
  }
  function Kt(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var gn = !1;
  function ya(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Ec(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Jt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function mn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (de & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Kt(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, ma(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Kt(e, s);
  }
  function ci(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, Mo(e, s);
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
    gn = !1;
    var c = l.firstBaseUpdate, f = l.lastBaseUpdate, m = l.shared.pending;
    if (m !== null) {
      l.shared.pending = null;
      var S = m, A = S.next;
      S.next = null, f === null ? c = A : f.next = A, f = S;
      var j = e.alternate;
      j !== null && (j = j.updateQueue, m = j.lastBaseUpdate, m !== f && (m === null ? j.firstBaseUpdate = A : m.next = A, j.lastBaseUpdate = S));
    }
    if (c !== null) {
      var O = l.baseState;
      f = 0, j = A = S = null, m = c;
      do {
        var P = m.lane, $ = m.eventTime;
        if ((o & P) === P) {
          j !== null && (j = j.next = {
            eventTime: $,
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          });
          e: {
            var Y = e, G = m;
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
                gn = !0;
            }
          }
          m.callback !== null && m.lane !== 0 && (e.flags |= 64, P = l.effects, P === null ? l.effects = [m] : P.push(m));
        } else $ = { eventTime: $, lane: P, tag: m.tag, payload: m.payload, callback: m.callback, next: null }, j === null ? (A = j = $, S = O) : j = j.next = $, f |= P;
        if (m = m.next, m === null) {
          if (m = l.shared.pending, m === null) break;
          P = m, m = P.next, P.next = null, l.lastBaseUpdate = P, l.shared.pending = null;
        }
      } while (!0);
      if (j === null && (S = O), l.baseState = S, l.firstBaseUpdate = A, l.lastBaseUpdate = j, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          f |= l.lane, l = l.next;
        while (l !== t);
      } else c === null && (l.shared.lanes = 0);
      Pn |= f, e.lanes = f, e.memoizedState = O;
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
  var es = {}, zt = fn(es), ts = fn(es), ns = fn(es);
  function Mn(e) {
    if (e === es) throw Error(i(174));
    return e;
  }
  function va(e, t) {
    switch (we(ns, t), we(ts, e), we(zt, es), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : _o(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = _o(t, e);
    }
    Ee(zt), we(zt, t);
  }
  function dr() {
    Ee(zt), Ee(ts), Ee(ns);
  }
  function Cc(e) {
    Mn(ns.current);
    var t = Mn(zt.current), s = _o(t, e.type);
    t !== s && (we(ts, e), we(zt, s));
  }
  function _a(e) {
    ts.current === e && (Ee(zt), Ee(ts));
  }
  var Ce = fn(0);
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
  var Sa = [];
  function wa() {
    for (var e = 0; e < Sa.length; e++) Sa[e]._workInProgressVersionPrimary = null;
    Sa.length = 0;
  }
  var hi = ne.ReactCurrentDispatcher, xa = ne.ReactCurrentBatchConfig, Nn = 0, Te = null, De = null, $e = null, pi = !1, rs = !1, ss = 0, Ag = 0;
  function Qe() {
    throw Error(i(321));
  }
  function Ea(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!Et(e[s], t[s])) return !1;
    return !0;
  }
  function ka(e, t, s, o, l, c) {
    if (Nn = c, Te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, hi.current = e === null || e.memoizedState === null ? jg : Lg, e = s(o, l), rs) {
      c = 0;
      do {
        if (rs = !1, ss = 0, 25 <= c) throw Error(i(301));
        c += 1, $e = De = null, t.updateQueue = null, hi.current = Og, e = s(o, l);
      } while (rs);
    }
    if (hi.current = yi, t = De !== null && De.next !== null, Nn = 0, $e = De = Te = null, pi = !1, t) throw Error(i(300));
    return e;
  }
  function ba() {
    var e = ss !== 0;
    return ss = 0, e;
  }
  function Dt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return $e === null ? Te.memoizedState = $e = e : $e = $e.next = e, $e;
  }
  function yt() {
    if (De === null) {
      var e = Te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = $e === null ? Te.memoizedState : $e.next;
    if (t !== null) $e = t, De = e;
    else {
      if (e === null) throw Error(i(310));
      De = e, e = { memoizedState: De.memoizedState, baseState: De.baseState, baseQueue: De.baseQueue, queue: De.queue, next: null }, $e === null ? Te.memoizedState = $e = e : $e = $e.next = e;
    }
    return $e;
  }
  function is(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ca(e) {
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
      var m = f = null, S = null, A = c;
      do {
        var j = A.lane;
        if ((Nn & j) === j) S !== null && (S = S.next = { lane: 0, action: A.action, hasEagerState: A.hasEagerState, eagerState: A.eagerState, next: null }), o = A.hasEagerState ? A.eagerState : e(o, A.action);
        else {
          var O = {
            lane: j,
            action: A.action,
            hasEagerState: A.hasEagerState,
            eagerState: A.eagerState,
            next: null
          };
          S === null ? (m = S = O, f = o) : S = S.next = O, Te.lanes |= j, Pn |= j;
        }
        A = A.next;
      } while (A !== null && A !== c);
      S === null ? f = o : S.next = m, Et(o, t.memoizedState) || (it = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = S, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, Te.lanes |= c, Pn |= c, l = l.next;
      while (l !== e);
    } else l === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function Ta(e) {
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
      Et(c, t.memoizedState) || (it = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), s.lastRenderedState = c;
    }
    return [c, o];
  }
  function Tc() {
  }
  function Ic(e, t) {
    var s = Te, o = yt(), l = t(), c = !Et(o.memoizedState, l);
    if (c && (o.memoizedState = l, it = !0), o = o.queue, Ia(Mc.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || $e !== null && $e.memoizedState.tag & 1) {
      if (s.flags |= 2048, os(9, Ac.bind(null, s, o, l, t), void 0, null), He === null) throw Error(i(349));
      (Nn & 30) !== 0 || Rc(s, t, l);
    }
    return l;
  }
  function Rc(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = Te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Te.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function Ac(e, t, s, o) {
    t.value = s, t.getSnapshot = o, Nc(t) && Pc(e);
  }
  function Mc(e, t, s) {
    return s(function() {
      Nc(t) && Pc(e);
    });
  }
  function Nc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !Et(e, s);
    } catch {
      return !0;
    }
  }
  function Pc(e) {
    var t = Kt(e, 1);
    t !== null && It(t, e, 1, -1);
  }
  function jc(e) {
    var t = Dt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: is, lastRenderedState: e }, t.queue = e, e = e.dispatch = Pg.bind(null, Te, e), [t.memoizedState, e];
  }
  function os(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = Te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Te.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Lc() {
    return yt().memoizedState;
  }
  function gi(e, t, s, o) {
    var l = Dt();
    Te.flags |= e, l.memoizedState = os(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function mi(e, t, s, o) {
    var l = yt();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (De !== null) {
      var f = De.memoizedState;
      if (c = f.destroy, o !== null && Ea(o, f.deps)) {
        l.memoizedState = os(t, s, c, o);
        return;
      }
    }
    Te.flags |= e, l.memoizedState = os(1 | t, s, c, o);
  }
  function Oc(e, t) {
    return gi(8390656, 8, e, t);
  }
  function Ia(e, t) {
    return mi(2048, 8, e, t);
  }
  function zc(e, t) {
    return mi(4, 2, e, t);
  }
  function Dc(e, t) {
    return mi(4, 4, e, t);
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
    return s = s != null ? s.concat([e]) : null, mi(4, 4, Bc.bind(null, t, e), s);
  }
  function Ra() {
  }
  function Uc(e, t) {
    var s = yt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && Ea(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function $c(e, t) {
    var s = yt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && Ea(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function Hc(e, t, s) {
    return (Nn & 21) === 0 ? (e.baseState && (e.baseState = !1, it = !0), e.memoizedState = s) : (Et(s, t) || (s = _u(), Te.lanes |= s, Pn |= s, e.baseState = !0), t);
  }
  function Mg(e, t) {
    var s = me;
    me = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = xa.transition;
    xa.transition = {};
    try {
      e(!1), t();
    } finally {
      me = s, xa.transition = o;
    }
  }
  function Vc() {
    return yt().memoizedState;
  }
  function Ng(e, t, s) {
    var o = Sn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, Wc(e)) Yc(t, s);
    else if (s = xc(e, t, s, o), s !== null) {
      var l = et();
      It(s, e, o, l), Gc(s, t, o);
    }
  }
  function Pg(e, t, s) {
    var o = Sn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Wc(e)) Yc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var f = t.lastRenderedState, m = c(f, s);
        if (l.hasEagerState = !0, l.eagerState = m, Et(m, f)) {
          var S = t.interleaved;
          S === null ? (l.next = l, ma(t)) : (l.next = S.next, S.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = xc(e, t, l, o), s !== null && (l = et(), It(s, e, o, l), Gc(s, t, o));
    }
  }
  function Wc(e) {
    var t = e.alternate;
    return e === Te || t !== null && t === Te;
  }
  function Yc(e, t) {
    rs = pi = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Gc(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, Mo(e, s);
    }
  }
  var yi = { readContext: mt, useCallback: Qe, useContext: Qe, useEffect: Qe, useImperativeHandle: Qe, useInsertionEffect: Qe, useLayoutEffect: Qe, useMemo: Qe, useReducer: Qe, useRef: Qe, useState: Qe, useDebugValue: Qe, useDeferredValue: Qe, useTransition: Qe, useMutableSource: Qe, useSyncExternalStore: Qe, useId: Qe, unstable_isNewReconciler: !1 }, jg = { readContext: mt, useCallback: function(e, t) {
    return Dt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: mt, useEffect: Oc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, gi(
      4194308,
      4,
      Bc.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return gi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return gi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = Dt();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = Dt();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Ng.bind(null, Te, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Dt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: jc, useDebugValue: Ra, useDeferredValue: function(e) {
    return Dt().memoizedState = e;
  }, useTransition: function() {
    var e = jc(!1), t = e[0];
    return e = Mg.bind(null, e[1]), Dt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = Te, l = Dt();
    if (be) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), He === null) throw Error(i(349));
      (Nn & 30) !== 0 || Rc(o, t, s);
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
    var e = Dt(), t = He.identifierPrefix;
    if (be) {
      var s = Qt, o = qt;
      s = (o & ~(1 << 32 - xt(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = ss++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = Ag++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Lg = {
    readContext: mt,
    useCallback: Uc,
    useContext: mt,
    useEffect: Ia,
    useImperativeHandle: Fc,
    useInsertionEffect: zc,
    useLayoutEffect: Dc,
    useMemo: $c,
    useReducer: Ca,
    useRef: Lc,
    useState: function() {
      return Ca(is);
    },
    useDebugValue: Ra,
    useDeferredValue: function(e) {
      var t = yt();
      return Hc(t, De.memoizedState, e);
    },
    useTransition: function() {
      var e = Ca(is)[0], t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: Tc,
    useSyncExternalStore: Ic,
    useId: Vc,
    unstable_isNewReconciler: !1
  }, Og = { readContext: mt, useCallback: Uc, useContext: mt, useEffect: Ia, useImperativeHandle: Fc, useInsertionEffect: zc, useLayoutEffect: Dc, useMemo: $c, useReducer: Ta, useRef: Lc, useState: function() {
    return Ta(is);
  }, useDebugValue: Ra, useDeferredValue: function(e) {
    var t = yt();
    return De === null ? t.memoizedState = e : Hc(t, De.memoizedState, e);
  }, useTransition: function() {
    var e = Ta(is)[0], t = yt().memoizedState;
    return [e, t];
  }, useMutableSource: Tc, useSyncExternalStore: Ic, useId: Vc, unstable_isNewReconciler: !1 };
  function bt(e, t) {
    if (e && e.defaultProps) {
      t = M({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function Aa(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : M({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var vi = { isMounted: function(e) {
    return (e = e._reactInternals) ? bn(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = et(), l = Sn(e), c = Jt(o, l);
    c.payload = t, s != null && (c.callback = s), t = mn(e, c, l), t !== null && (It(t, e, l, o), ci(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = et(), l = Sn(e), c = Jt(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = mn(e, c, l), t !== null && (It(t, e, l, o), ci(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = et(), o = Sn(e), l = Jt(s, o);
    l.tag = 2, t != null && (l.callback = t), t = mn(e, l, o), t !== null && (It(t, e, o, s), ci(t, e, o));
  } };
  function qc(e, t, s, o, l, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, f) : t.prototype && t.prototype.isPureReactComponent ? !Yr(s, o) || !Yr(l, c) : !0;
  }
  function Qc(e, t, s) {
    var o = !1, l = hn, c = t.contextType;
    return typeof c == "object" && c !== null ? c = mt(c) : (l = st(t) ? Tn : qe.current, o = t.contextTypes, c = (o = o != null) ? sr(e, l) : hn), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = vi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Kc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && vi.enqueueReplaceState(t, t.state, null);
  }
  function Ma(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, ya(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = mt(c) : (c = st(t) ? Tn : qe.current, l.context = sr(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Aa(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && vi.enqueueReplaceState(l, l.state, null), di(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function fr(e, t) {
    try {
      var s = "", o = t;
      do
        s += se(o), o = o.return;
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
  function Pa(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var zg = typeof WeakMap == "function" ? WeakMap : Map;
  function Jc(e, t, s) {
    s = Jt(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      bi || (bi = !0, qa = o), Pa(e, t);
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
        Pa(e, t);
      };
    }
    var c = e.stateNode;
    return c !== null && typeof c.componentDidCatch == "function" && (s.callback = function() {
      Pa(e, t), typeof o != "function" && (vn === null ? vn = /* @__PURE__ */ new Set([this]) : vn.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), s;
  }
  function Zc(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new zg();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = Jg.bind(null, e, t, s), t.then(e, e));
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
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = Jt(-1, 1), t.tag = 2, mn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var Dg = ne.ReactCurrentOwner, it = !1;
  function Ze(e, t, s, o) {
    t.child = e === null ? wc(t, null, s, o) : lr(t, e.child, s, o);
  }
  function nd(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return cr(t, l), o = ka(e, t, s, o, c, l), s = ba(), e !== null && !it ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xt(e, t, l)) : (be && s && aa(t), t.flags |= 1, Ze(e, t, o, l), t.child);
  }
  function rd(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !tl(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, sd(e, t, c, o, l)) : (e = Mi(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var f = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Yr, s(f, o) && e.ref === t.ref) return Xt(e, t, l);
    }
    return t.flags |= 1, e = xn(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function sd(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Yr(c, o) && e.ref === t.ref) if (it = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (it = !0);
      else return t.lanes = e.lanes, Xt(e, t, l);
    }
    return ja(e, t, s, o, l);
  }
  function id(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, we(pr, ft), ft |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, we(pr, ft), ft |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, we(pr, ft), ft |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, we(pr, ft), ft |= o;
    return Ze(e, t, l, s), t.child;
  }
  function od(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ja(e, t, s, o, l) {
    var c = st(s) ? Tn : qe.current;
    return c = sr(t, c), cr(t, l), s = ka(e, t, s, o, c, l), o = ba(), e !== null && !it ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xt(e, t, l)) : (be && o && aa(t), t.flags |= 1, Ze(e, t, s, l), t.child);
  }
  function ad(e, t, s, o, l) {
    if (st(s)) {
      var c = !0;
      ni(t);
    } else c = !1;
    if (cr(t, l), t.stateNode === null) Si(e, t), Qc(t, s, o), Ma(t, s, o, l), o = !0;
    else if (e === null) {
      var f = t.stateNode, m = t.memoizedProps;
      f.props = m;
      var S = f.context, A = s.contextType;
      typeof A == "object" && A !== null ? A = mt(A) : (A = st(s) ? Tn : qe.current, A = sr(t, A));
      var j = s.getDerivedStateFromProps, O = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      O || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (m !== o || S !== A) && Kc(t, f, o, A), gn = !1;
      var P = t.memoizedState;
      f.state = P, di(t, o, f, l), S = t.memoizedState, m !== o || P !== S || rt.current || gn ? (typeof j == "function" && (Aa(t, s, j, o), S = t.memoizedState), (m = gn || qc(t, s, m, o, P, S, A)) ? (O || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = S), f.props = o, f.state = S, f.context = A, o = m) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, Ec(e, t), m = t.memoizedProps, A = t.type === t.elementType ? m : bt(t.type, m), f.props = A, O = t.pendingProps, P = f.context, S = s.contextType, typeof S == "object" && S !== null ? S = mt(S) : (S = st(s) ? Tn : qe.current, S = sr(t, S));
      var $ = s.getDerivedStateFromProps;
      (j = typeof $ == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (m !== O || P !== S) && Kc(t, f, o, S), gn = !1, P = t.memoizedState, f.state = P, di(t, o, f, l);
      var Y = t.memoizedState;
      m !== O || P !== Y || rt.current || gn ? (typeof $ == "function" && (Aa(t, s, $, o), Y = t.memoizedState), (A = gn || qc(t, s, A, o, P, Y, S) || !1) ? (j || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, Y, S), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, Y, S)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || m === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = Y), f.props = o, f.state = Y, f.context = S, o = A) : (typeof f.componentDidUpdate != "function" || m === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return La(e, t, s, o, c, l);
  }
  function La(e, t, s, o, l, c) {
    od(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return l && fc(t, s, !1), Xt(e, t, c);
    o = t.stateNode, Dg.current = t;
    var m = f && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = lr(t, e.child, null, c), t.child = lr(t, null, m, c)) : Ze(e, t, m, c), t.memoizedState = o.state, l && fc(t, s, !0), t.child;
  }
  function ld(e) {
    var t = e.stateNode;
    t.pendingContext ? cc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && cc(e, t.context, !1), va(e, t.containerInfo);
  }
  function ud(e, t, s, o, l) {
    return ar(), da(l), t.flags |= 256, Ze(e, t, s, o), t.child;
  }
  var Oa = { dehydrated: null, treeContext: null, retryLane: 0 };
  function za(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function cd(e, t, s) {
    var o = t.pendingProps, l = Ce.current, c = !1, f = (t.flags & 128) !== 0, m;
    if ((m = f) || (m = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), m ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), we(Ce, l & 1), e === null)
      return ca(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = f) : c = Ni(f, o, 0, null), e = zn(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = za(s), t.memoizedState = Oa, e) : Da(t, f));
    if (l = e.memoizedState, l !== null && (m = l.dehydrated, m !== null)) return Bg(e, t, f, o, m, l, s);
    if (c) {
      c = o.fallback, f = t.mode, l = e.child, m = l.sibling;
      var S = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = S, t.deletions = null) : (o = xn(l, S), o.subtreeFlags = l.subtreeFlags & 14680064), m !== null ? c = xn(m, c) : (c = zn(c, f, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, f = e.child.memoizedState, f = f === null ? za(s) : { baseLanes: f.baseLanes | s, cachePool: null, transitions: f.transitions }, c.memoizedState = f, c.childLanes = e.childLanes & ~s, t.memoizedState = Oa, o;
    }
    return c = e.child, e = c.sibling, o = xn(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Da(e, t) {
    return t = Ni({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function _i(e, t, s, o) {
    return o !== null && da(o), lr(t, e.child, null, s), e = Da(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Bg(e, t, s, o, l, c, f) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = Na(Error(i(422))), _i(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Ni({ mode: "visible", children: o.children }, l, 0, null), c = zn(c, l, f, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && lr(t, e.child, null, f), t.child.memoizedState = za(f), t.memoizedState = Oa, c);
    if ((t.mode & 1) === 0) return _i(e, t, f, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var m = o.dgst;
      return o = m, c = Error(i(419)), o = Na(c, o, void 0), _i(e, t, f, o);
    }
    if (m = (f & e.childLanes) !== 0, it || m) {
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
        l = (l & (o.suspendedLanes | f)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Kt(e, l), It(o, e, l, -1));
      }
      return el(), o = Na(Error(i(421))), _i(e, t, f, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Xg.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, dt = dn(l.nextSibling), ct = t, be = !0, kt = null, e !== null && (pt[gt++] = qt, pt[gt++] = Qt, pt[gt++] = In, qt = e.id, Qt = e.overflow, In = t), t = Da(t, o.children), t.flags |= 4096, t);
  }
  function dd(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), ga(e.return, t, s);
  }
  function Ba(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function fd(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (Ze(e, t, o.children, s), o = Ce.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
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
    if (we(Ce, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (s = t.child, l = null; s !== null; ) e = s.alternate, e !== null && fi(e) === null && (l = s), s = s.sibling;
        s = l, s === null ? (l = t.child, t.child = null) : (l = s.sibling, s.sibling = null), Ba(t, !1, l, s, c);
        break;
      case "backwards":
        for (s = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && fi(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = s, s = l, l = e;
        }
        Ba(t, !0, s, null, c);
        break;
      case "together":
        Ba(t, !1, null, null, void 0);
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
    if (e !== null && (t.dependencies = e.dependencies), Pn |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = xn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = xn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function Fg(e, t, s) {
    switch (t.tag) {
      case 3:
        ld(t), ar();
        break;
      case 5:
        Cc(t);
        break;
      case 1:
        st(t.type) && ni(t);
        break;
      case 4:
        va(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        we(li, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (we(Ce, Ce.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? cd(e, t, s) : (we(Ce, Ce.current & 1), e = Xt(e, t, s), e !== null ? e.sibling : null);
        we(Ce, Ce.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return fd(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), we(Ce, Ce.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, id(e, t, s);
    }
    return Xt(e, t, s);
  }
  var hd, Fa, pd, gd;
  hd = function(e, t) {
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
  }, Fa = function() {
  }, pd = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, Mn(zt.current);
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
      So(s, o);
      var f;
      s = null;
      for (A in l) if (!o.hasOwnProperty(A) && l.hasOwnProperty(A) && l[A] != null) if (A === "style") {
        var m = l[A];
        for (f in m) m.hasOwnProperty(f) && (s || (s = {}), s[f] = "");
      } else A !== "dangerouslySetInnerHTML" && A !== "children" && A !== "suppressContentEditableWarning" && A !== "suppressHydrationWarning" && A !== "autoFocus" && (u.hasOwnProperty(A) ? c || (c = []) : (c = c || []).push(A, null));
      for (A in o) {
        var S = o[A];
        if (m = l?.[A], o.hasOwnProperty(A) && S !== m && (S != null || m != null)) if (A === "style") if (m) {
          for (f in m) !m.hasOwnProperty(f) || S && S.hasOwnProperty(f) || (s || (s = {}), s[f] = "");
          for (f in S) S.hasOwnProperty(f) && m[f] !== S[f] && (s || (s = {}), s[f] = S[f]);
        } else s || (c || (c = []), c.push(
          A,
          s
        )), s = S;
        else A === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, m = m ? m.__html : void 0, S != null && m !== S && (c = c || []).push(A, S)) : A === "children" ? typeof S != "string" && typeof S != "number" || (c = c || []).push(A, "" + S) : A !== "suppressContentEditableWarning" && A !== "suppressHydrationWarning" && (u.hasOwnProperty(A) ? (S != null && A === "onScroll" && xe("scroll", e), c || m === S || (c = [])) : (c = c || []).push(A, S));
      }
      s && (c = c || []).push("style", s);
      var A = c;
      (t.updateQueue = A) && (t.flags |= 4);
    }
  }, gd = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function as(e, t) {
    if (!be) switch (e.tailMode) {
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
  function Ug(e, t, s) {
    var o = t.pendingProps;
    switch (la(t), t.tag) {
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
        return st(t.type) && ti(), Ke(t), null;
      case 3:
        return o = t.stateNode, dr(), Ee(rt), Ee(qe), wa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (oi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, kt !== null && (Ja(kt), kt = null))), Fa(e, t), Ke(t), null;
      case 5:
        _a(t);
        var l = Mn(ns.current);
        if (s = t.type, e !== null && t.stateNode != null) pd(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return Ke(t), null;
          }
          if (e = Mn(zt.current), oi(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[Ot] = t, o[Jr] = c, e = (t.mode & 1) !== 0, s) {
              case "dialog":
                xe("cancel", o), xe("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                xe("load", o);
                break;
              case "video":
              case "audio":
                for (l = 0; l < qr.length; l++) xe(qr[l], o);
                break;
              case "source":
                xe("error", o);
                break;
              case "img":
              case "image":
              case "link":
                xe(
                  "error",
                  o
                ), xe("load", o);
                break;
              case "details":
                xe("toggle", o);
                break;
              case "input":
                As(o, c), xe("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, xe("invalid", o);
                break;
              case "textarea":
                Wt(o, c), xe("invalid", o);
            }
            So(s, c), l = null;
            for (var f in c) if (c.hasOwnProperty(f)) {
              var m = c[f];
              f === "children" ? typeof m == "string" ? o.textContent !== m && (c.suppressHydrationWarning !== !0 && Xs(o.textContent, m, e), l = ["children", m]) : typeof m == "number" && o.textContent !== "" + m && (c.suppressHydrationWarning !== !0 && Xs(
                o.textContent,
                m,
                e
              ), l = ["children", "" + m]) : u.hasOwnProperty(f) && m != null && f === "onScroll" && xe("scroll", o);
            }
            switch (s) {
              case "input":
                kn(o), je(o, c, !0);
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
            f = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = tu(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(s, { is: o.is }) : (e = f.createElement(s), s === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, s), e[Ot] = t, e[Jr] = o, hd(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = wo(s, o), s) {
                case "dialog":
                  xe("cancel", e), xe("close", e), l = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  xe("load", e), l = o;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < qr.length; l++) xe(qr[l], e);
                  l = o;
                  break;
                case "source":
                  xe("error", e), l = o;
                  break;
                case "img":
                case "image":
                case "link":
                  xe(
                    "error",
                    e
                  ), xe("load", e), l = o;
                  break;
                case "details":
                  xe("toggle", e), l = o;
                  break;
                case "input":
                  As(e, o), l = Tr(e, o), xe("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = M({}, o, { value: void 0 }), xe("invalid", e);
                  break;
                case "textarea":
                  Wt(e, o), l = Vt(e, o), xe("invalid", e);
                  break;
                default:
                  l = o;
              }
              So(s, l), m = l;
              for (c in m) if (m.hasOwnProperty(c)) {
                var S = m[c];
                c === "style" ? su(e, S) : c === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, S != null && nu(e, S)) : c === "children" ? typeof S == "string" ? (s !== "textarea" || S !== "") && Rr(e, S) : typeof S == "number" && Rr(e, "" + S) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? S != null && c === "onScroll" && xe("scroll", e) : S != null && U(e, c, S, f));
              }
              switch (s) {
                case "input":
                  kn(e), je(e, o, !1);
                  break;
                case "textarea":
                  kn(e), eu(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + fe(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, c = o.value, c != null ? ht(e, !!o.multiple, c, !1) : o.defaultValue != null && ht(
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
        if (e && t.stateNode != null) gd(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = Mn(ns.current), Mn(zt.current), oi(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[Ot] = t, (c = o.nodeValue !== s) && (e = ct, e !== null)) switch (e.tag) {
              case 3:
                Xs(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Xs(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[Ot] = t, t.stateNode = o;
        }
        return Ke(t), null;
      case 13:
        if (Ee(Ce), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (be && dt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) vc(), ar(), t.flags |= 98560, c = !1;
          else if (c = oi(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[Ot] = t;
            } else ar(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ke(t), c = !1;
          } else kt !== null && (Ja(kt), kt = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Ce.current & 1) !== 0 ? Be === 0 && (Be = 3) : el())), t.updateQueue !== null && (t.flags |= 4), Ke(t), null);
      case 4:
        return dr(), Fa(e, t), e === null && Qr(t.stateNode.containerInfo), Ke(t), null;
      case 10:
        return pa(t.type._context), Ke(t), null;
      case 17:
        return st(t.type) && ti(), Ke(t), null;
      case 19:
        if (Ee(Ce), c = t.memoizedState, c === null) return Ke(t), null;
        if (o = (t.flags & 128) !== 0, f = c.rendering, f === null) if (o) as(c, !1);
        else {
          if (Be !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = fi(e), f !== null) {
              for (t.flags |= 128, as(c, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, f = c.alternate, f === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f.childLanes, c.lanes = f.lanes, c.child = f.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f.memoizedProps, c.memoizedState = f.memoizedState, c.updateQueue = f.updateQueue, c.type = f.type, e = f.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return we(Ce, Ce.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && Ne() > gr && (t.flags |= 128, o = !0, as(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = fi(f), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), as(c, !0), c.tail === null && c.tailMode === "hidden" && !f.alternate && !be) return Ke(t), null;
          } else 2 * Ne() - c.renderingStartTime > gr && s !== 1073741824 && (t.flags |= 128, o = !0, as(c, !1), t.lanes = 4194304);
          c.isBackwards ? (f.sibling = t.child, t.child = f) : (s = c.last, s !== null ? s.sibling = f : t.child = f, c.last = f);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = Ne(), t.sibling = null, s = Ce.current, we(Ce, o ? s & 1 | 2 : s & 1), t) : (Ke(t), null);
      case 22:
      case 23:
        return Za(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (ft & 1073741824) !== 0 && (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ke(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function $g(e, t) {
    switch (la(t), t.tag) {
      case 1:
        return st(t.type) && ti(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return dr(), Ee(rt), Ee(qe), wa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return _a(t), null;
      case 13:
        if (Ee(Ce), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          ar();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ee(Ce), null;
      case 4:
        return dr(), null;
      case 10:
        return pa(t.type._context), null;
      case 22:
      case 23:
        return Za(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var wi = !1, Je = !1, Hg = typeof WeakSet == "function" ? WeakSet : Set, W = null;
  function hr(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      Me(e, t, o);
    }
    else s.current = null;
  }
  function Ua(e, t, s) {
    try {
      s();
    } catch (o) {
      Me(e, t, o);
    }
  }
  var md = !1;
  function Vg(e, t) {
    if (Zo = Us, e = qu(), Wo(e)) {
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
          var f = 0, m = -1, S = -1, A = 0, j = 0, O = e, P = null;
          t: for (; ; ) {
            for (var $; O !== s || l !== 0 && O.nodeType !== 3 || (m = f + l), O !== c || o !== 0 && O.nodeType !== 3 || (S = f + o), O.nodeType === 3 && (f += O.nodeValue.length), ($ = O.firstChild) !== null; )
              P = O, O = $;
            for (; ; ) {
              if (O === e) break t;
              if (P === s && ++A === l && (m = f), P === c && ++j === o && (S = f), ($ = O.nextSibling) !== null) break;
              O = P, P = O.parentNode;
            }
            O = $;
          }
          s = m === -1 || S === -1 ? null : { start: m, end: S };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (ea = { focusedElem: e, selectionRange: s }, Us = !1, W = t; W !== null; ) if (t = W, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, W = e;
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
              var G = Y.memoizedProps, Pe = Y.memoizedState, C = t.stateNode, E = C.getSnapshotBeforeUpdate(t.elementType === t.type ? G : bt(t.type, G), Pe);
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
        Me(t, t.return, z);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, W = e;
        break;
      }
      W = t.return;
    }
    return Y = md, md = !1, Y;
  }
  function ls(e, t, s) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy;
          l.destroy = void 0, c !== void 0 && Ua(t, s, c);
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
  function $a(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function yd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, yd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ot], delete t[Jr], delete t[sa], delete t[Cg], delete t[Tg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
  function Ha(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = Zs));
    else if (o !== 4 && (e = e.child, e !== null)) for (Ha(e, t, s), e = e.sibling; e !== null; ) Ha(e, t, s), e = e.sibling;
  }
  function Va(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Va(e, t, s), e = e.sibling; e !== null; ) Va(e, t, s), e = e.sibling;
  }
  var We = null, Ct = !1;
  function yn(e, t, s) {
    for (s = s.child; s !== null; ) Sd(e, t, s), s = s.sibling;
  }
  function Sd(e, t, s) {
    if (Lt && typeof Lt.onCommitFiberUnmount == "function") try {
      Lt.onCommitFiberUnmount(Ls, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        Je || hr(s, t);
      case 6:
        var o = We, l = Ct;
        We = null, yn(e, t, s), We = o, Ct = l, We !== null && (Ct ? (e = We, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : We.removeChild(s.stateNode));
        break;
      case 18:
        We !== null && (Ct ? (e = We, s = s.stateNode, e.nodeType === 8 ? ra(e.parentNode, s) : e.nodeType === 1 && ra(e, s), Fr(e)) : ra(We, s.stateNode));
        break;
      case 4:
        o = We, l = Ct, We = s.stateNode.containerInfo, Ct = !0, yn(e, t, s), We = o, Ct = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Je && (o = s.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var c = l, f = c.destroy;
            c = c.tag, f !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && Ua(s, t, f), l = l.next;
          } while (l !== o);
        }
        yn(e, t, s);
        break;
      case 1:
        if (!Je && (hr(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = s.memoizedProps, o.state = s.memoizedState, o.componentWillUnmount();
        } catch (m) {
          Me(s, t, m);
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
      s === null && (s = e.stateNode = new Hg()), t.forEach(function(o) {
        var l = Zg.bind(null, e, o);
        s.has(o) || (s.add(o), o.then(l, l));
      });
    }
  }
  function Tt(e, t) {
    var s = t.deletions;
    if (s !== null) for (var o = 0; o < s.length; o++) {
      var l = s[o];
      try {
        var c = e, f = t, m = f;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 5:
              We = m.stateNode, Ct = !1;
              break e;
            case 3:
              We = m.stateNode.containerInfo, Ct = !0;
              break e;
            case 4:
              We = m.stateNode.containerInfo, Ct = !0;
              break e;
          }
          m = m.return;
        }
        if (We === null) throw Error(i(160));
        Sd(c, f, l), We = null, Ct = !1;
        var S = l.alternate;
        S !== null && (S.return = null), l.return = null;
      } catch (A) {
        Me(l, t, A);
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
        if (Tt(t, e), Bt(e), o & 4) {
          try {
            ls(3, e, e.return), xi(3, e);
          } catch (G) {
            Me(e, e.return, G);
          }
          try {
            ls(5, e, e.return);
          } catch (G) {
            Me(e, e.return, G);
          }
        }
        break;
      case 1:
        Tt(t, e), Bt(e), o & 512 && s !== null && hr(s, s.return);
        break;
      case 5:
        if (Tt(t, e), Bt(e), o & 512 && s !== null && hr(s, s.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Rr(l, "");
          } catch (G) {
            Me(e, e.return, G);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, f = s !== null ? s.memoizedProps : c, m = e.type, S = e.updateQueue;
          if (e.updateQueue = null, S !== null) try {
            m === "input" && c.type === "radio" && c.name != null && Ir(l, c), wo(m, f);
            var A = wo(m, c);
            for (f = 0; f < S.length; f += 2) {
              var j = S[f], O = S[f + 1];
              j === "style" ? su(l, O) : j === "dangerouslySetInnerHTML" ? nu(l, O) : j === "children" ? Rr(l, O) : U(l, j, O, A);
            }
            switch (m) {
              case "input":
                wt(l, c);
                break;
              case "textarea":
                Zl(l, c);
                break;
              case "select":
                var P = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var $ = c.value;
                $ != null ? ht(l, !!c.multiple, $, !1) : P !== !!c.multiple && (c.defaultValue != null ? ht(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : ht(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[Jr] = c;
          } catch (G) {
            Me(e, e.return, G);
          }
        }
        break;
      case 6:
        if (Tt(t, e), Bt(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (G) {
            Me(e, e.return, G);
          }
        }
        break;
      case 3:
        if (Tt(t, e), Bt(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Fr(t.containerInfo);
        } catch (G) {
          Me(e, e.return, G);
        }
        break;
      case 4:
        Tt(t, e), Bt(e);
        break;
      case 13:
        Tt(t, e), Bt(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Ga = Ne())), o & 4 && wd(e);
        break;
      case 22:
        if (j = s !== null && s.memoizedState !== null, e.mode & 1 ? (Je = (A = Je) || j, Tt(t, e), Je = A) : Tt(t, e), Bt(e), o & 8192) {
          if (A = e.memoizedState !== null, (e.stateNode.isHidden = A) && !j && (e.mode & 1) !== 0) for (W = e, j = e.child; j !== null; ) {
            for (O = W = j; W !== null; ) {
              switch (P = W, $ = P.child, P.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ls(4, P, P.return);
                  break;
                case 1:
                  hr(P, P.return);
                  var Y = P.stateNode;
                  if (typeof Y.componentWillUnmount == "function") {
                    o = P, s = P.return;
                    try {
                      t = o, Y.props = t.memoizedProps, Y.state = t.memoizedState, Y.componentWillUnmount();
                    } catch (G) {
                      Me(o, s, G);
                    }
                  }
                  break;
                case 5:
                  hr(P, P.return);
                  break;
                case 22:
                  if (P.memoizedState !== null) {
                    bd(O);
                    continue;
                  }
              }
              $ !== null ? ($.return = P, W = $) : bd(O);
            }
            j = j.sibling;
          }
          e: for (j = null, O = e; ; ) {
            if (O.tag === 5) {
              if (j === null) {
                j = O;
                try {
                  l = O.stateNode, A ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (m = O.stateNode, S = O.memoizedProps.style, f = S != null && S.hasOwnProperty("display") ? S.display : null, m.style.display = ru("display", f));
                } catch (G) {
                  Me(e, e.return, G);
                }
              }
            } else if (O.tag === 6) {
              if (j === null) try {
                O.stateNode.nodeValue = A ? "" : O.memoizedProps;
              } catch (G) {
                Me(e, e.return, G);
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
        Tt(t, e), Bt(e), o & 4 && wd(e);
        break;
      case 21:
        break;
      default:
        Tt(
          t,
          e
        ), Bt(e);
    }
  }
  function Bt(e) {
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
            Va(e, c, l);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, m = _d(e);
            Ha(e, m, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (S) {
        Me(e, e.return, S);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Wg(e, t, s) {
    W = e, Ed(e);
  }
  function Ed(e, t, s) {
    for (var o = (e.mode & 1) !== 0; W !== null; ) {
      var l = W, c = l.child;
      if (l.tag === 22 && o) {
        var f = l.memoizedState !== null || wi;
        if (!f) {
          var m = l.alternate, S = m !== null && m.memoizedState !== null || Je;
          m = wi;
          var A = Je;
          if (wi = f, (Je = S) && !A) for (W = l; W !== null; ) f = W, S = f.child, f.tag === 22 && f.memoizedState !== null ? Cd(l) : S !== null ? (S.return = f, W = S) : Cd(l);
          for (; c !== null; ) W = c, Ed(c), c = c.sibling;
          W = l, wi = m, Je = A;
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
                var l = t.elementType === t.type ? s.memoizedProps : bt(t.type, s.memoizedProps);
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
                var A = t.alternate;
                if (A !== null) {
                  var j = A.memoizedState;
                  if (j !== null) {
                    var O = j.dehydrated;
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
          Je || t.flags & 512 && $a(t);
        } catch (P) {
          Me(t, t.return, P);
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
              Me(t, s, S);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (S) {
                Me(t, l, S);
              }
            }
            var c = t.return;
            try {
              $a(t);
            } catch (S) {
              Me(t, c, S);
            }
            break;
          case 5:
            var f = t.return;
            try {
              $a(t);
            } catch (S) {
              Me(t, f, S);
            }
        }
      } catch (S) {
        Me(t, t.return, S);
      }
      if (t === e) {
        W = null;
        break;
      }
      var m = t.sibling;
      if (m !== null) {
        m.return = t.return, W = m;
        break;
      }
      W = t.return;
    }
  }
  var Yg = Math.ceil, Ei = ne.ReactCurrentDispatcher, Wa = ne.ReactCurrentOwner, vt = ne.ReactCurrentBatchConfig, de = 0, He = null, Oe = null, Ye = 0, ft = 0, pr = fn(0), Be = 0, us = null, Pn = 0, ki = 0, Ya = 0, cs = null, ot = null, Ga = 0, gr = 1 / 0, Zt = null, bi = !1, qa = null, vn = null, Ci = !1, _n = null, Ti = 0, ds = 0, Qa = null, Ii = -1, Ri = 0;
  function et() {
    return (de & 6) !== 0 ? Ne() : Ii !== -1 ? Ii : Ii = Ne();
  }
  function Sn(e) {
    return (e.mode & 1) === 0 ? 1 : (de & 2) !== 0 && Ye !== 0 ? Ye & -Ye : Rg.transition !== null ? (Ri === 0 && (Ri = _u()), Ri) : (e = me, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Iu(e.type)), e);
  }
  function It(e, t, s, o) {
    if (50 < ds) throw ds = 0, Qa = null, Error(i(185));
    Lr(e, s, o), ((de & 2) === 0 || e !== He) && (e === He && ((de & 2) === 0 && (ki |= s), Be === 4 && wn(e, Ye)), at(e, o), s === 1 && de === 0 && (t.mode & 1) === 0 && (gr = Ne() + 500, ri && pn()));
  }
  function at(e, t) {
    var s = e.callbackNode;
    Rp(e, t);
    var o = Ds(e, e === He ? Ye : 0);
    if (o === 0) s !== null && mu(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && mu(s), t === 1) e.tag === 0 ? Ig(Id.bind(null, e)) : hc(Id.bind(null, e)), kg(function() {
        (de & 6) === 0 && pn();
      }), s = null;
      else {
        switch (Su(o)) {
          case 1:
            s = Io;
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
    if (Ii = -1, Ri = 0, (de & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (mr() && e.callbackNode !== s) return null;
    var o = Ds(e, e === He ? Ye : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = Ai(e, o);
    else {
      t = o;
      var l = de;
      de |= 2;
      var c = Ad();
      (He !== e || Ye !== t) && (Zt = null, gr = Ne() + 500, Ln(e, t));
      do
        try {
          Qg();
          break;
        } catch (m) {
          Rd(e, m);
        }
      while (!0);
      ha(), Ei.current = c, de = l, Oe !== null ? t = 0 : (He = null, Ye = 0, t = Be);
    }
    if (t !== 0) {
      if (t === 2 && (l = Ro(e), l !== 0 && (o = l, t = Ka(e, l))), t === 1) throw s = us, Ln(e, 0), wn(e, o), at(e, Ne()), s;
      if (t === 6) wn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !Gg(l) && (t = Ai(e, o), t === 2 && (c = Ro(e), c !== 0 && (o = c, t = Ka(e, c))), t === 1)) throw s = us, Ln(e, 0), wn(e, o), at(e, Ne()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            On(e, ot, Zt);
            break;
          case 3:
            if (wn(e, o), (o & 130023424) === o && (t = Ga + 500 - Ne(), 10 < t)) {
              if (Ds(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                et(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = na(On.bind(null, e, ot, Zt), t);
              break;
            }
            On(e, ot, Zt);
            break;
          case 4:
            if (wn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var f = 31 - xt(o);
              c = 1 << f, f = t[f], f > l && (l = f), o &= ~c;
            }
            if (o = l, o = Ne() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Yg(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = na(On.bind(null, e, ot, Zt), o);
              break;
            }
            On(e, ot, Zt);
            break;
          case 5:
            On(e, ot, Zt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return at(e, Ne()), e.callbackNode === s ? Td.bind(null, e) : null;
  }
  function Ka(e, t) {
    var s = cs;
    return e.current.memoizedState.isDehydrated && (Ln(e, t).flags |= 256), e = Ai(e, t), e !== 2 && (t = ot, ot = s, t !== null && Ja(t)), e;
  }
  function Ja(e) {
    ot === null ? ot = e : ot.push.apply(ot, e);
  }
  function Gg(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var s = t.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var o = 0; o < s.length; o++) {
          var l = s[o], c = l.getSnapshot;
          l = l.value;
          try {
            if (!Et(c(), l)) return !1;
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
      var s = 31 - xt(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function Id(e) {
    if ((de & 6) !== 0) throw Error(i(327));
    mr();
    var t = Ds(e, 0);
    if ((t & 1) === 0) return at(e, Ne()), null;
    var s = Ai(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = Ro(e);
      o !== 0 && (t = o, s = Ka(e, o));
    }
    if (s === 1) throw s = us, Ln(e, 0), wn(e, t), at(e, Ne()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, On(e, ot, Zt), at(e, Ne()), null;
  }
  function Xa(e, t) {
    var s = de;
    de |= 1;
    try {
      return e(t);
    } finally {
      de = s, de === 0 && (gr = Ne() + 500, ri && pn());
    }
  }
  function jn(e) {
    _n !== null && _n.tag === 0 && (de & 6) === 0 && mr();
    var t = de;
    de |= 1;
    var s = vt.transition, o = me;
    try {
      if (vt.transition = null, me = 1, e) return e();
    } finally {
      me = o, vt.transition = s, de = t, (de & 6) === 0 && pn();
    }
  }
  function Za() {
    ft = pr.current, Ee(pr);
  }
  function Ln(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, Eg(s)), Oe !== null) for (s = Oe.return; s !== null; ) {
      var o = s;
      switch (la(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && ti();
          break;
        case 3:
          dr(), Ee(rt), Ee(qe), wa();
          break;
        case 5:
          _a(o);
          break;
        case 4:
          dr();
          break;
        case 13:
          Ee(Ce);
          break;
        case 19:
          Ee(Ce);
          break;
        case 10:
          pa(o.type._context);
          break;
        case 22:
        case 23:
          Za();
      }
      s = s.return;
    }
    if (He = e, Oe = e = xn(e.current, null), Ye = ft = t, Be = 0, us = null, Ya = ki = Pn = 0, ot = cs = null, An !== null) {
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
      var s = Oe;
      try {
        if (ha(), hi.current = yi, pi) {
          for (var o = Te.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          pi = !1;
        }
        if (Nn = 0, $e = De = Te = null, rs = !1, ss = 0, Wa.current = null, s === null || s.return === null) {
          Be = 1, us = t, Oe = null;
          break;
        }
        e: {
          var c = e, f = s.return, m = s, S = t;
          if (t = Ye, m.flags |= 32768, S !== null && typeof S == "object" && typeof S.then == "function") {
            var A = S, j = m, O = j.tag;
            if ((j.mode & 1) === 0 && (O === 0 || O === 11 || O === 15)) {
              var P = j.alternate;
              P ? (j.updateQueue = P.updateQueue, j.memoizedState = P.memoizedState, j.lanes = P.lanes) : (j.updateQueue = null, j.memoizedState = null);
            }
            var $ = ed(f);
            if ($ !== null) {
              $.flags &= -257, td($, f, m, c, t), $.mode & 1 && Zc(c, A, t), t = $, S = A;
              var Y = t.updateQueue;
              if (Y === null) {
                var G = /* @__PURE__ */ new Set();
                G.add(S), t.updateQueue = G;
              } else Y.add(S);
              break e;
            } else {
              if ((t & 1) === 0) {
                Zc(c, A, t), el();
                break e;
              }
              S = Error(i(426));
            }
          } else if (be && m.mode & 1) {
            var Pe = ed(f);
            if (Pe !== null) {
              (Pe.flags & 65536) === 0 && (Pe.flags |= 256), td(Pe, f, m, c, t), da(fr(S, m));
              break e;
            }
          }
          c = S = fr(S, m), Be !== 4 && (Be = 2), cs === null ? cs = [c] : cs.push(c), c = f;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var C = Jc(c, S, t);
                kc(c, C);
                break e;
              case 1:
                m = S;
                var E = c.type, T = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof E.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (vn === null || !vn.has(T)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var z = Xc(c, m, t);
                  kc(c, z);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        Nd(s);
      } catch (q) {
        t = q, Oe === s && s !== null && (Oe = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Ad() {
    var e = Ei.current;
    return Ei.current = yi, e === null ? yi : e;
  }
  function el() {
    (Be === 0 || Be === 3 || Be === 2) && (Be = 4), He === null || (Pn & 268435455) === 0 && (ki & 268435455) === 0 || wn(He, Ye);
  }
  function Ai(e, t) {
    var s = de;
    de |= 2;
    var o = Ad();
    (He !== e || Ye !== t) && (Zt = null, Ln(e, t));
    do
      try {
        qg();
        break;
      } catch (l) {
        Rd(e, l);
      }
    while (!0);
    if (ha(), de = s, Ei.current = o, Oe !== null) throw Error(i(261));
    return He = null, Ye = 0, Be;
  }
  function qg() {
    for (; Oe !== null; ) Md(Oe);
  }
  function Qg() {
    for (; Oe !== null && !Sp(); ) Md(Oe);
  }
  function Md(e) {
    var t = Ld(e.alternate, e, ft);
    e.memoizedProps = e.pendingProps, t === null ? Nd(e) : Oe = t, Wa.current = null;
  }
  function Nd(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = Ug(s, t, ft), s !== null) {
          Oe = s;
          return;
        }
      } else {
        if (s = $g(s, t), s !== null) {
          s.flags &= 32767, Oe = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Be = 6, Oe = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Oe = t;
        return;
      }
      Oe = t = e;
    } while (t !== null);
    Be === 0 && (Be = 5);
  }
  function On(e, t, s) {
    var o = me, l = vt.transition;
    try {
      vt.transition = null, me = 1, Kg(e, t, s, o);
    } finally {
      vt.transition = l, me = o;
    }
    return null;
  }
  function Kg(e, t, s, o) {
    do
      mr();
    while (_n !== null);
    if ((de & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (Ap(e, c), e === He && (Oe = He = null, Ye = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || Ci || (Ci = !0, Od(js, function() {
      return mr(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = vt.transition, vt.transition = null;
      var f = me;
      me = 1;
      var m = de;
      de |= 4, Wa.current = null, Vg(e, s), xd(s, e), mg(ea), Us = !!Zo, ea = Zo = null, e.current = s, Wg(s), wp(), de = m, me = f, vt.transition = c;
    } else e.current = s;
    if (Ci && (Ci = !1, _n = e, Ti = l), c = e.pendingLanes, c === 0 && (vn = null), kp(s.stateNode), at(e, Ne()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (bi) throw bi = !1, e = qa, qa = null, e;
    return (Ti & 1) !== 0 && e.tag !== 0 && mr(), c = e.pendingLanes, (c & 1) !== 0 ? e === Qa ? ds++ : (ds = 0, Qa = e) : ds = 0, pn(), null;
  }
  function mr() {
    if (_n !== null) {
      var e = Su(Ti), t = vt.transition, s = me;
      try {
        if (vt.transition = null, me = 16 > e ? 16 : e, _n === null) var o = !1;
        else {
          if (e = _n, _n = null, Ti = 0, (de & 6) !== 0) throw Error(i(331));
          var l = de;
          for (de |= 4, W = e.current; W !== null; ) {
            var c = W, f = c.child;
            if ((W.flags & 16) !== 0) {
              var m = c.deletions;
              if (m !== null) {
                for (var S = 0; S < m.length; S++) {
                  var A = m[S];
                  for (W = A; W !== null; ) {
                    var j = W;
                    switch (j.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ls(8, j, c);
                    }
                    var O = j.child;
                    if (O !== null) O.return = j, W = O;
                    else for (; W !== null; ) {
                      j = W;
                      var P = j.sibling, $ = j.return;
                      if (yd(j), j === A) {
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
                      var Pe = G.sibling;
                      G.sibling = null, G = Pe;
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
              if (m = W, (m.flags & 2048) !== 0) try {
                switch (m.tag) {
                  case 0:
                  case 11:
                  case 15:
                    xi(9, m);
                }
              } catch (q) {
                Me(m, m.return, q);
              }
              if (m === f) {
                W = null;
                break e;
              }
              var z = m.sibling;
              if (z !== null) {
                z.return = m.return, W = z;
                break e;
              }
              W = m.return;
            }
          }
          if (de = l, pn(), Lt && typeof Lt.onPostCommitFiberRoot == "function") try {
            Lt.onPostCommitFiberRoot(Ls, e);
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
  function Pd(e, t, s) {
    t = fr(s, t), t = Jc(e, t, 1), e = mn(e, t, 1), t = et(), e !== null && (Lr(e, 1, t), at(e, t));
  }
  function Me(e, t, s) {
    if (e.tag === 3) Pd(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Pd(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (vn === null || !vn.has(o))) {
          e = fr(s, e), e = Xc(t, e, 1), t = mn(t, e, 1), e = et(), t !== null && (Lr(t, 1, e), at(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Jg(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = et(), e.pingedLanes |= e.suspendedLanes & s, He === e && (Ye & s) === s && (Be === 4 || Be === 3 && (Ye & 130023424) === Ye && 500 > Ne() - Ga ? Ln(e, 0) : Ya |= s), at(e, t);
  }
  function jd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = zs, zs <<= 1, (zs & 130023424) === 0 && (zs = 4194304)));
    var s = et();
    e = Kt(e, t), e !== null && (Lr(e, t, s), at(e, s));
  }
  function Xg(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), jd(e, s);
  }
  function Zg(e, t) {
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
    if (e !== null) if (e.memoizedProps !== t.pendingProps || rt.current) it = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return it = !1, Fg(e, t, s);
      it = (e.flags & 131072) !== 0;
    }
    else it = !1, be && (t.flags & 1048576) !== 0 && pc(t, ii, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        Si(e, t), e = t.pendingProps;
        var l = sr(t, qe.current);
        cr(t, s), l = ka(null, t, o, e, l, s);
        var c = ba();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, st(o) ? (c = !0, ni(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, ya(t), l.updater = vi, t.stateNode = l, l._reactInternals = t, Ma(t, o, e, s), t = La(null, t, o, !0, c, s)) : (t.tag = 0, be && c && aa(t), Ze(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (Si(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = tm(o), e = bt(o, e), l) {
            case 0:
              t = ja(null, t, o, e, s);
              break e;
            case 1:
              t = ad(null, t, o, e, s);
              break e;
            case 11:
              t = nd(null, t, o, e, s);
              break e;
            case 14:
              t = rd(null, t, o, bt(o.type, e), s);
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
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : bt(o, l), ja(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : bt(o, l), ad(e, t, o, l, s);
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
          } else for (dt = dn(t.stateNode.containerInfo.firstChild), ct = t, be = !0, kt = null, s = wc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
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
        return Cc(t), e === null && ca(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, f = l.children, ta(o, l) ? f = null : c !== null && ta(o, c) && (t.flags |= 32), od(e, t), Ze(e, t, f, s), t.child;
      case 6:
        return e === null && ca(t), null;
      case 13:
        return cd(e, t, s);
      case 4:
        return va(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = lr(t, null, o, s) : Ze(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : bt(o, l), nd(e, t, o, l, s);
      case 7:
        return Ze(e, t, t.pendingProps, s), t.child;
      case 8:
        return Ze(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return Ze(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, f = l.value, we(li, o._currentValue), o._currentValue = f, c !== null) if (Et(c.value, f)) {
            if (c.children === l.children && !rt.current) {
              t = Xt(e, t, s);
              break e;
            }
          } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
            var m = c.dependencies;
            if (m !== null) {
              f = c.child;
              for (var S = m.firstContext; S !== null; ) {
                if (S.context === o) {
                  if (c.tag === 1) {
                    S = Jt(-1, s & -s), S.tag = 2;
                    var A = c.updateQueue;
                    if (A !== null) {
                      A = A.shared;
                      var j = A.pending;
                      j === null ? S.next = S : (S.next = j.next, j.next = S), A.pending = S;
                    }
                  }
                  c.lanes |= s, S = c.alternate, S !== null && (S.lanes |= s), ga(
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
              f.lanes |= s, m = f.alternate, m !== null && (m.lanes |= s), ga(f, s, t), f = c.sibling;
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
        return l = t.type, o = t.pendingProps.children, cr(t, s), l = mt(l), o = o(l), t.flags |= 1, Ze(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = bt(o, t.pendingProps), l = bt(o.type, l), rd(e, t, o, l, s);
      case 15:
        return sd(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : bt(o, l), Si(e, t), t.tag = 1, st(o) ? (e = !0, ni(t)) : e = !1, cr(t, s), Qc(t, o, l), Ma(t, o, l, s), La(null, t, o, !0, e, s);
      case 19:
        return fd(e, t, s);
      case 22:
        return id(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function Od(e, t) {
    return gu(e, t);
  }
  function em(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, s, o) {
    return new em(e, t, s, o);
  }
  function tl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function tm(e) {
    if (typeof e == "function") return tl(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === ye) return 11;
      if (e === ze) return 14;
    }
    return 2;
  }
  function xn(e, t) {
    var s = e.alternate;
    return s === null ? (s = _t(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function Mi(e, t, s, o, l, c) {
    var f = 2;
    if (o = e, typeof e == "function") tl(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case D:
        return zn(s.children, l, c, t);
      case Q:
        f = 8, l |= 8;
        break;
      case oe:
        return e = _t(12, s, t, l | 2), e.elementType = oe, e.lanes = c, e;
      case ve:
        return e = _t(13, s, t, l), e.elementType = ve, e.lanes = c, e;
      case _e:
        return e = _t(19, s, t, l), e.elementType = _e, e.lanes = c, e;
      case pe:
        return Ni(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Se:
            f = 10;
            break e;
          case Re:
            f = 9;
            break e;
          case ye:
            f = 11;
            break e;
          case ze:
            f = 14;
            break e;
          case Ae:
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
  function Ni(e, t, s, o) {
    return e = _t(22, e, o, t), e.elementType = pe, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function nl(e, t, s) {
    return e = _t(6, e, null, t), e.lanes = s, e;
  }
  function rl(e, t, s) {
    return t = _t(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function nm(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ao(0), this.expirationTimes = Ao(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ao(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function sl(e, t, s, o, l, c, f, m, S) {
    return e = new nm(e, t, s, m, S), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = _t(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ya(c), e;
  }
  function rm(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ie, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function zd(e) {
    if (!e) return hn;
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
            if (st(t.type)) {
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
      if (st(s)) return dc(e, s, t);
    }
    return t;
  }
  function Dd(e, t, s, o, l, c, f, m, S) {
    return e = sl(s, o, !0, e, l, c, f, m, S), e.context = zd(null), s = e.current, o = et(), l = Sn(s), c = Jt(o, l), c.callback = t ?? null, mn(s, c, l), e.current.lanes = l, Lr(e, l, o), at(e, o), e;
  }
  function Pi(e, t, s, o) {
    var l = t.current, c = et(), f = Sn(l);
    return s = zd(s), t.context === null ? t.context = s : t.pendingContext = s, t = Jt(c, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = mn(l, t, f), e !== null && (It(e, l, f, c), ci(e, l, f)), f;
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
  function il(e, t) {
    Bd(e, t), (e = e.alternate) && Bd(e, t);
  }
  function sm() {
    return null;
  }
  var Fd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function ol(e) {
    this._internalRoot = e;
  }
  Li.prototype.render = ol.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Pi(e, t, null, null);
  }, Li.prototype.unmount = ol.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      jn(function() {
        Pi(null, e, null, null);
      }), t[Yt] = null;
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
  function al(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Oi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ud() {
  }
  function im(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var A = ji(f);
          c.call(A);
        };
      }
      var f = Dd(t, o, e, 0, null, !1, !1, "", Ud);
      return e._reactRootContainer = f, e[Yt] = f.current, Qr(e.nodeType === 8 ? e.parentNode : e), jn(), f;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var m = o;
      o = function() {
        var A = ji(S);
        m.call(A);
      };
    }
    var S = sl(e, 0, !1, null, null, !1, !1, "", Ud);
    return e._reactRootContainer = S, e[Yt] = S.current, Qr(e.nodeType === 8 ? e.parentNode : e), jn(function() {
      Pi(t, S, s, o);
    }), S;
  }
  function zi(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var f = c;
      if (typeof l == "function") {
        var m = l;
        l = function() {
          var S = ji(f);
          m.call(S);
        };
      }
      Pi(t, f, e, l);
    } else f = im(s, t, e, l, o);
    return ji(f);
  }
  wu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = jr(t.pendingLanes);
          s !== 0 && (Mo(t, s | 1), at(t, Ne()), (de & 6) === 0 && (gr = Ne() + 500, pn()));
        }
        break;
      case 13:
        jn(function() {
          var o = Kt(e, 1);
          if (o !== null) {
            var l = et();
            It(o, e, 1, l);
          }
        }), il(e, 1);
    }
  }, No = function(e) {
    if (e.tag === 13) {
      var t = Kt(e, 134217728);
      if (t !== null) {
        var s = et();
        It(t, e, 134217728, s);
      }
      il(e, 134217728);
    }
  }, xu = function(e) {
    if (e.tag === 13) {
      var t = Sn(e), s = Kt(e, t);
      if (s !== null) {
        var o = et();
        It(s, e, t, o);
      }
      il(e, t);
    }
  }, Eu = function() {
    return me;
  }, ku = function(e, t) {
    var s = me;
    try {
      return me = e, t();
    } finally {
      me = s;
    }
  }, ko = function(e, t, s) {
    switch (t) {
      case "input":
        if (wt(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = ei(o);
              if (!l) throw Error(i(90));
              rn(o), wt(o, l);
            }
          }
        }
        break;
      case "textarea":
        Zl(e, s);
        break;
      case "select":
        t = s.value, t != null && ht(e, !!s.multiple, t, !1);
    }
  }, lu = Xa, uu = jn;
  var om = { usingClientEntryPoint: !1, Events: [Xr, nr, ei, ou, au, Xa] }, fs = { findFiberByHostInstance: Cn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, am = { bundleType: fs.bundleType, version: fs.version, rendererPackageName: fs.rendererPackageName, rendererConfig: fs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ne.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = hu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: fs.findFiberByHostInstance || sm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Di = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Di.isDisabled && Di.supportsFiber) try {
      Ls = Di.inject(am), Lt = Di;
    } catch {
    }
  }
  return lt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = om, lt.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!al(t)) throw Error(i(200));
    return rm(e, t, null, s);
  }, lt.createRoot = function(e, t) {
    if (!al(e)) throw Error(i(299));
    var s = !1, o = "", l = Fd;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = sl(e, 1, !1, null, null, s, !1, o, l), e[Yt] = t.current, Qr(e.nodeType === 8 ? e.parentNode : e), new ol(t);
  }, lt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = hu(t), e = e === null ? null : e.stateNode, e;
  }, lt.flushSync = function(e) {
    return jn(e);
  }, lt.hydrate = function(e, t, s) {
    if (!Oi(t)) throw Error(i(200));
    return zi(null, e, t, !0, s);
  }, lt.hydrateRoot = function(e, t, s) {
    if (!al(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", f = Fd;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (f = s.onRecoverableError)), t = Dd(t, null, e, 1, s ?? null, l, !1, c, f), e[Yt] = t.current, Qr(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new Li(t);
  }, lt.render = function(e, t, s) {
    if (!Oi(t)) throw Error(i(200));
    return zi(null, e, t, !1, s);
  }, lt.unmountComponentAtNode = function(e) {
    if (!Oi(e)) throw Error(i(40));
    return e._reactRootContainer ? (jn(function() {
      zi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Yt] = null;
      });
    }), !0) : !1;
  }, lt.unstable_batchedUpdates = Xa, lt.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Oi(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return zi(e, t, s, !1, o);
  }, lt.version = "18.3.1-next-f1338f8080-20240426", lt;
}
var Qd;
function Df() {
  if (Qd) return cl.exports;
  Qd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), cl.exports = mm(), cl.exports;
}
var Kd;
function ym() {
  if (Kd) return Bi;
  Kd = 1;
  var r = Df();
  return Bi.createRoot = r.createRoot, Bi.hydrateRoot = r.hydrateRoot, Bi;
}
var vm = ym(), _m = Df();
const Sm = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
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
class Bf {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return Sm(this._providers);
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
class wm {
  _contextProvider = new Bf();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class xm {
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
const Em = (r) => r.status.type === "complete";
class Ff extends xm {
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => Em(d) ? d : await n.send(d))) : [], a = this.text;
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
class km extends Ff {
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
let bm = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const Ol = bm("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), Cm = "__optimistic__", Tm = () => `${Cm}${Ol()}`, br = /* @__PURE__ */ Symbol("autoStatus"), Im = Object.freeze(Object.assign({ type: "running" }, { [br]: !0 })), Rm = Object.freeze(Object.assign({
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
const Am = (r) => r[br] === !0, Uf = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [br]: !0 }) : r && n ? Im : Rm;
var Dn = { exports: {} }, Jd;
function Mm() {
  if (Jd) return Dn.exports;
  Jd = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(p, y, v) {
    v == null && y !== null && typeof y == "object" && (v = y, y = void 0), r && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const x = JSON.parse(p, y);
    if (x === null || typeof x != "object")
      return x;
    const k = v && v.protoAction || "error", _ = v && v.constructorAction || "error";
    if (k === "ignore" && _ === "ignore")
      return x;
    if (k !== "ignore" && _ !== "ignore") {
      if (n.test(p) === !1 && i.test(p) === !1)
        return x;
    } else if (k !== "ignore" && _ === "ignore") {
      if (n.test(p) === !1)
        return x;
    } else if (i.test(p) === !1)
      return x;
    return u(x, { protoAction: k, constructorAction: _, safe: v && v.safe });
  }
  function u(p, { protoAction: y = "error", constructorAction: v = "error", safe: x } = {}) {
    let k = [p];
    for (; k.length; ) {
      const _ = k;
      k = [];
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
          const L = I[N];
          L && typeof L == "object" && k.push(L);
        }
      }
    }
    return p;
  }
  function d(p, y, v) {
    const { stackTraceLimit: x } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, y, v);
    } finally {
      Error.stackTraceLimit = x;
    }
  }
  function h(p, y) {
    const { stackTraceLimit: v } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, y, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = v;
    }
  }
  return Dn.exports = d, Dn.exports.default = d, Dn.exports.parse = d, Dn.exports.safeParse = h, Dn.exports.scan = u, Dn.exports;
}
var Nm = Mm();
const Xd = /* @__PURE__ */ zf(Nm);
function Pm(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function h() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(k, _, I) {
    switch (k) {
      case '"': {
        i = _, n.pop(), n.push(I), n.push("INSIDE_STRING"), h();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = _, a = _, n.pop(), n.push(I), n.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        n.pop(), n.push(I), n.push("INSIDE_NUMBER"), h();
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
        i = _, n.pop(), n.push(I), n.push("INSIDE_NUMBER"), h();
        break;
      }
      case "{": {
        i = _, n.pop(), n.push(I), n.push("INSIDE_OBJECT_START"), h();
        break;
      }
      case "[": {
        i = _, n.pop(), n.push(I), n.push("INSIDE_ARRAY_START"), h();
        break;
      }
    }
  }
  function y(k, _) {
    switch (k) {
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
  function v(k, _) {
    switch (k) {
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
  for (let k = 0; k < r.length; k++) {
    const _ = r[k];
    switch (n[n.length - 1]) {
      case "ROOT":
        p(_, k, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (_) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "";
            break;
          }
          case "}": {
            i = k, n.pop(), d = u.pop();
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
        p(_, k, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        y(_, k);
        break;
      }
      case "INSIDE_STRING": {
        switch (_) {
          case '"': {
            n.pop(), i = k, d = u.pop();
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            i = k;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        _ === "]" ? (i = k, n.pop(), d = u.pop()) : (i = k, d = "0", p(_, k, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (_) {
          case ",": {
            n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
            break;
          }
          case "]": {
            i = k, n.pop(), d = u.pop();
            break;
          }
          default: {
            i = k;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        p(_, k, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        n.pop(), n[n.length - 1] === "INSIDE_STRING" ? i = k : n[n.length - 1] === "INSIDE_OBJECT_KEY" && (d += _);
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
            i = k;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(_, k), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && y(_, k);
            break;
          }
          case "}": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && y(_, k);
            break;
          }
          case "]": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(_, k);
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
        const N = r.substring(a, k + 1);
        !"false".startsWith(N) && !"true".startsWith(N) && !"null".startsWith(N) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? y(_, k) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && v(_, k)) : i = k;
        break;
      }
    }
  }
  let x = r.slice(0, i + 1);
  for (let k = n.length - 1; k >= 0; k--)
    switch (n[k]) {
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
const hl = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), jm = (r) => {
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
      const [n, i] = Pm(r), a = Xd.parse(n);
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
  const { role: a, id: u, createdAt: d, attachments: h, status: p, metadata: y } = r, v = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, x = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, k = ({ image: _, ...I }) => {
    const N = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(_), L = /^https?:\/\//.test(_);
    return N || L ? { ...I, image: _ } : (console.warn("Invalid image data format detected"), null);
  };
  if (a !== "user" && h?.length)
    throw new Error("attachments are only supported for user messages");
  if (a !== "assistant" && p)
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
              return k(_);
            case "data":
              return _;
            case "tool-call": {
              const { parentId: N, messages: L, ...B } = _, V = {
                ...B,
                toolCallId: _.toolCallId ?? `tool-${Ol()}`,
                ...N !== void 0 && { parentId: N },
                ...L !== void 0 && { messages: L }
              };
              return _.args ? {
                ...V,
                args: _.args,
                argsText: _.argsText ?? JSON.stringify(_.args)
              } : {
                ...V,
                args: jm(_.argsText ?? "") ?? {},
                argsText: _.argsText ?? ""
              };
            }
            default: {
              const N = I;
              throw new Error(`Unsupported assistant message part type: ${N}`);
            }
          }
        }).filter((_) => !!_),
        status: p ?? i,
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
}, Yi = (r) => r.next ? Yi(r.next) : "current" in r ? r : null;
class Lm {
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
        ], (Yi(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const h = n ? n.level + 1 : 0;
        this.updateLevels(i, h);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new Lm(() => {
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
      a = Tm();
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
      const h = this.messages.get(d);
      if (!h)
        throw new Error("MessageRepository(deleteMessage): Child message not found. This is likely an internal bug in assistant-ui.");
      this.performOp(u, h, "relink");
    }
    this.performOp(null, a, "cut"), this.messages.delete(n), this.head === a && (this.head = Yi(u ?? this.root)), this._messages.dirty();
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
    a.next = i, this.head = Yi(i), this._messages.dirty();
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
class lo {
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
class Bl extends lo {
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
function Om(r, n) {
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
class Mt extends lo {
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
    return n === Nt || Om(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const Sr = /* @__PURE__ */ Symbol("innerMessage"), zm = (r) => r[Sr], _s = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

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
class Dm extends Vf {
  get source() {
    return "thread-composer";
  }
}
class Bm extends Vf {
  get source() {
    return "edit-composer";
  }
}
class Fm extends Hf {
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
class Wf extends lo {
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
const Yf = Object.freeze([]), Gf = Object.freeze({}), Um = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? Yf,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? Gf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), $m = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? Yf,
  runConfig: r?.runConfig ?? Gf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class qf {
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
class Hm extends qf {
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
      getState: () => Um(n.getState()),
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
    return new Dm(new Mt({
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
class Vm extends qf {
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
      getState: () => $m(n.getState()),
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
    return new Bm(new Mt({
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
class qi {
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
    return n instanceof qi ? n : new qi({
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
    const u = i.toolName, d = i.toolCallId, h = qi.toResponse(n);
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
class Qi extends lo {
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
const Ui = Object.freeze({
  type: "complete"
}), Wm = (r, n, i) => {
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
  const a = Wm(r, n, i);
  return Object.freeze({
    ...i,
    [Sr]: i[Sr],
    status: a
  });
};
class Ym {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new Vm(new Qi({
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
    return _s(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new ef(new Mt({
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
    return new ef(new Mt({
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
    return new Fm(new Mt({
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
const Gm = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {},
  ...r.stream ? { stream: r.stream } : {}
}), qm = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), Qm = (r, n) => typeof n == "string" ? {
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
}, Km = (r, n) => {
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
class Jm {
  get path() {
    return this._threadBinding.path;
  }
  get __internal_threadBinding() {
    return this._threadBinding;
  }
  _threadBinding;
  constructor(n, i) {
    const a = new Mt({
      path: n.path,
      getState: () => Km(n.getState(), i.getState()),
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
    }, this.composer = new Hm(new Qi({
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
    this._threadBinding.getState().append(Qm(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(qm(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun(Gm(n));
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
    return new Ym(new Mt({
      path: n,
      getState: () => {
        const { message: a, parentId: u, index: d } = i() ?? {}, { messages: h, speech: p } = this._threadBinding.getState();
        if (!a || u === void 0 || d === void 0)
          return Nt;
        const v = this._threadBinding.getState().getBranches(a.id), x = a.metadata.submittedFeedback;
        return {
          ...a,
          [Sr]: a[Sr],
          index: d,
          isLast: h.at(-1)?.id === a.id,
          parentId: u,
          branchNumber: v.indexOf(a.id) + 1,
          branchCount: v.length,
          speech: p?.messageId === a.id ? p : void 0,
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
const Xm = (r) => ({
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
class Zm {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = Jm) {
    this._core = n, this._runtimeFactory = i;
    const a = new Bl({
      path: {},
      getState: () => Xm(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new Fi(new Mt({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => $i(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new Qi({
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
    return new this._runtimeFactory(new Qi({
      path: {
        ref: `threads[threadId=${JSON.stringify(n)}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => this._core.getThreadRuntimeCore(n),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(n) {
    return new Fi(new Mt({
      path: {
        ref: `threadItems[${n}]`,
        threadSelector: { type: "index", index: n }
      },
      getState: () => $i(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new Fi(new Mt({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => $i(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new Fi(new Mt({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => $i(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const ey = b.createContext(null), ty = () => b.useContext(ey), Bn = Object.freeze([]), $n = "DEFAULT_THREAD_ID", ny = Object.freeze([$n]), Qf = Object.freeze({
  id: $n,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), ry = Promise.resolve(), nf = Object.freeze({
  [$n]: Qf
});
class sy {
  adapter;
  threadFactory;
  _mainThreadId = $n;
  _threads = ny;
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
    return ry;
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
      return Qf;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? $n, d = n.threads ?? Bn, h = n.archivedThreads ?? Bn, p = a.threadId ?? $n, y = a.threads ?? Bn, v = a.archivedThreads ?? Bn;
    !i && p === u && y === d && v === h || (this._threadData = {
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
    }, y !== d && (this._threads = this.adapter.threads?.map((x) => x.id) ?? Bn), v !== h && (this._archivedThreads = this.adapter.archivedThreads?.map((x) => x.id) ?? Bn), p !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
      const d = this.cache.get(a), h = i(d, a, u);
      return this.cache.set(a, h), h;
    });
  }
}
class iy extends Ff {
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
class oy {
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
  composer = new km(this);
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
    this._editComposers.set(n, new iy(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
const ay = Object.freeze([]), ly = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class uy extends oy {
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
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? ay, this._capabilities = {
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
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, h, p) => {
        if (!n.convertMessage)
          return h;
        const y = p === (n.messages?.length ?? 0) - 1, v = Uf(y, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !Am(d.status) || d.status === v))
          return d;
        const x = n.convertMessage(h, p), k = zl(x, p.toString(), v);
        return k[Sr] = h, k;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const h = u[d], p = u[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, h);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), ly(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
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
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(zm).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const sf = (r) => r.adapters?.threadList ?? {};
class cy extends wm {
  threads;
  constructor(n) {
    super(), this.threads = new sy(sf(n), () => new uy(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(sf(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const dy = (r) => {
  const [n] = b.useState(() => new cy(r));
  b.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = ty() ?? {};
  return b.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), b.useMemo(() => new mv(n), [n]);
};
function fy(r, n) {
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
let ps = null;
function py(r, n) {
  r.currentIndex = 0;
  const i = ps;
  ps = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    ps = i;
  }
}
function Fl() {
  if (!ps)
    throw new Error("No resource fiber available");
  return ps;
}
function Kf(r, n) {
  const i = r[Jf];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const Jf = /* @__PURE__ */ Symbol("fnSymbol");
function uo(r, n) {
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
  return py(r, () => {
    r.renderContext = i;
    try {
      i.state = Kf(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function xs(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, fy(n, r);
}
const gy = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, of = gy ? b.useEffect : b.useLayoutEffect;
function Ul(r) {
  const [, n] = b.useState({}), i = b.useMemo(() => uo(r.type, () => n({})), [r.type]), a = ws(i, r.props);
  return of(() => () => Ss(i), [i]), of(() => {
    xs(i, a);
  }), a.state;
}
const co = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, gs = (r, n, i) => n === r;
let yr;
const pl = () => {
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
    const i = pl();
    for (const p of i.apis.values())
      if (p.api === n)
        return () => {
        };
    const a = i.nextId++, u = {
      api: n,
      logs: []
    }, d = n.on?.("*", (p) => {
      const y = i.apis.get(a);
      y && (y.logs.push({
        time: /* @__PURE__ */ new Date(),
        event: p.event,
        data: p.payload
      }), y.logs.length > Fn.MAX_EVENT_LOGS_PER_API && (y.logs = y.logs.slice(-200)), Fn.notifyListeners(a));
    }), h = n.subscribe?.(() => {
      Fn.notifyListeners(a);
    });
    return i.apis.set(a, u), Fn.notifyListeners(a), () => {
      const p = pl();
      p.apis.get(a) && (d?.(), h?.(), p.apis.delete(a), Fn.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    pl().listeners.forEach((a) => a(n));
  }
}
function Ie(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[Jf] = r, n;
}
const my = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function yy(r) {
  const n = Fl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (h) => {
        const p = d.value, y = typeof h == "function" ? h(p) : h;
        Object.is(p, y) || (d.value = y, my(n));
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
  const n = yy(r);
  return [n.value, n.set];
}
function vy() {
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
  const i = Fl(), a = vy();
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
const _y = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, ge = (r, n) => {
  const i = wr();
  return i.current || (i.current = { value: r(), deps: n }), _y(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, Sy = (r, n) => ge(() => r, n);
function ms(r, n) {
  const [i, a] = $t({}), u = ge(() => uo(r.type, () => a({})), [r.type]), d = n ? ge(() => r.props, n) : r.props, h = ge(() => ws(u, d), [u, d, i]);
  return nt(() => () => Ss(u), [u]), nt(() => {
    xs(u, h);
  }, [u, h]), h.state;
}
function Ht(r) {
  return Kf(r.type, r.props);
}
function Xf(r, n, i) {
  const [a, u] = $t(0), d = Sy(() => u((v) => v + 1), []), [h] = $t(() => /* @__PURE__ */ new Map()), p = ge(() => n, i), y = ge(() => {
    const v = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const x in r) {
      const k = r[x], _ = p(k, x);
      let I = h.get(x);
      (!I || I.resource !== _.type) && (I && v.remove.push(x), I = uo(_.type, d), v.add.push([x, I]));
      const N = ws(I, _.props);
      v.commit.push([x, N]), v.return[x] = N.state;
    }
    if (h.size > v.commit.length - v.add.length + v.remove.length)
      for (const x of h.keys())
        x in r || v.remove.push(x);
    return v;
  }, [r, p, a]);
  return nt(() => () => {
    for (const v of h.keys())
      Ss(h.get(v)), h.delete(v);
  }, []), nt(() => {
    for (const v of y.remove)
      Ss(h.get(v)), h.delete(v);
    for (const [v, x] of y.add)
      h.set(v, x);
    for (const [v, x] of y.commit)
      xs(h.get(v), x);
  }, [y]), y.return;
}
const wy = 50;
let Ut = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class xy {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Ut.schedulers.add(this), Ey();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const Ey = () => {
  Ut.isScheduled || (Ut.isScheduled = !0, queueMicrotask(Zf));
}, Zf = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of Ut.schedulers)
      if (Ut.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > wy)
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
}, xl = (r) => {
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
}, ky = Ie((r) => {
  const [, n] = $t(r.element), i = ms(r.element), a = wr(/* @__PURE__ */ new Set()).current, u = wr(i);
  return nt(() => {
    i !== u.current && (u.current = i, a.forEach((h) => h()));
  }), ge(() => ({
    getState: () => u.current,
    subscribe: (h) => (a.add(h), () => a.delete(h)),
    render: (h) => {
      const p = r.element !== h;
      r.element = h, r.onRender(p) && n(h);
    },
    unmount: r.onUnmount
  }), []);
}), by = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (p) => i ? p : (i = !0, xl(() => {
      p && (a = ws(h, u)), !d.isDirty && xs(h, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, Ss(h);
    }
  }, d = new xy(() => {
    a = ws(h, u), !(d.isDirty || !i) && xs(h, a);
  }), h = uo(ky, () => d.markDirty());
  return xl(() => {
    d.markDirty();
  }), a.state;
}, ys = /* @__PURE__ */ Symbol("tap.Context"), eh = (r) => ({
  [ys]: r
}), th = (r, n, i) => {
  const a = r[ys];
  r[ys] = n;
  try {
    return i();
  } finally {
    r[ys] = a;
  }
}, nh = (r) => r[ys], af = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (v, x) => {
    const k = typeof v == "function" ? v(n) : v;
    if (!Object.is(k, n)) {
      const _ = n;
      n = x ?? (typeof k != "object" || k === null) ? k : Object.assign({}, n, k), i.forEach((I) => I(n, _));
    }
  }, u = () => n, p = { setState: a, getState: u, getInitialState: () => y, subscribe: (v) => (i.add(v), () => i.delete(v)) }, y = n = r(a, u, p);
  return p;
}, Cy = ((r) => r ? af(r) : af), Ty = (r) => r;
function Iy(r, n = Ty) {
  const i = At.useSyncExternalStore(
    r.subscribe,
    At.useCallback(() => n(r.getState()), [r, n]),
    At.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return At.useDebugValue(i), i;
}
const lf = (r) => {
  const n = Cy(r), i = (a) => Iy(n, a);
  return Object.assign(i, n), i;
}, Ry = ((r) => r ? lf(r) : lf);
function uf(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function rh(...r) {
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
function fo(...r) {
  return b.useCallback(rh(...r), r);
}
const sh = Ie((r) => {
  const n = ge(() => by(r, { mount: !1 }), [r.type]);
  return nt(() => {
    n.render(r);
  }), n;
});
class Ay {
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
const Pt = (r, n) => {
  const i = wr(r);
  nt(() => {
    i.current = r;
  });
  const a = ge(() => new Proxy({}, new Ay(i)), []), u = n?.key, d = r.getState();
  return ge(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, Ki = Ie((r) => {
  const n = wr(r.get);
  return nt(() => {
    n.current = r.get;
  }), ge(() => Xe({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), My = Ie((r) => {
  const n = ms(r.scopeElement);
  return ge(() => [r.fieldName, n], [r.fieldName, n]);
}), Ny = Ie((r) => {
  const { on: n, subscribe: i, ...a } = r, u = wr({ on: n, subscribe: i });
  nt(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = Xf(a, (h, p) => My({
    fieldName: p,
    scopeElement: h
  }), []);
  return ge(() => {
    const h = Object.fromEntries(Object.values(d)), { on: p, subscribe: y } = u.current;
    return p && (h.on = (v, x) => p(v, x)), y && (h.subscribe = (v) => y(v)), h;
  }, [d]);
}), ih = eh(null), Py = (r, n) => th(ih, r, n), oh = () => {
  const r = nh(ih);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, jy = Ie(({ toolkit: r }) => {
  const [n, i] = $t(() => ({
    tools: {}
  })), a = oh();
  nt(() => {
    if (!r)
      return;
    const d = [];
    for (const [y, v] of Object.entries(r))
      v.render && d.push(u(y, v.render));
    const h = Object.entries(r).reduce((y, [v, x]) => {
      const { render: k, ..._ } = x;
      return y[v] = _, y;
    }, {}), p = {
      getModelContext: () => ({
        tools: h
      })
    };
    return d.push(a.register(p)), () => {
      d.forEach((y) => y());
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
        [d]: p.tools[d]?.filter((y) => y !== h) ?? []
      }
    }));
  });
  return Pt({
    getState: () => n,
    setToolUI: u
  });
}), Ly = Ie(() => ge(() => {
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
}, [])), ah = eh(null), Oy = (r, n) => th(ah, r, n), $l = () => {
  const r = nh(ah);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, zy = Ie(() => {
  const [r] = $t(() => ({})), n = new Bf();
  return Pt({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), Dy = Ie(({ threads: r, modelContext: n, tools: i }) => {
  const a = Ht(Ly()), { threads: u, tools: d, modelContext: h } = Oy(a, () => {
    const y = ms(n ?? zy(), [n]);
    return Py(y.api, () => ({
      modelContext: y,
      tools: ms(i ?? jy({}), [i]),
      threads: ms(r, [r])
    }));
  }), p = ge(() => ({
    threads: u.state,
    tools: d.state,
    modelContext: h.state
  }), [u.state, d.state, h.state]);
  return Pt({
    getState: () => p,
    threads: u.api,
    tools: d.api,
    modelContext: h.api,
    on: a.on
  });
}), By = (r) => {
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
      const { event: u, scope: d } = co(i);
      if (d === "*")
        return r.getState().api.on(u, a);
      if (gs("thread", d) || gs("thread-list-item", d) || gs("composer", d))
        return r.getState().api.on(u, (h) => {
          h.threadId === n().getState().id && a(h);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, Fy = (r) => {
  const n = Hl(), i = Ul(sh(Dy(r))), a = b.useMemo(() => By(i), [i]);
  return b.useMemo(() => uh(n, a), [n, a]);
}, Xe = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, Ji = () => () => {
}, lh = b.createContext({
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
    const { scope: n } = co(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), Hl = () => b.useContext(lh), Vl = (r) => {
  const n = Hl(), i = Ul(Ny(r));
  return b.useMemo(() => uh(n, i), [n, i]);
}, Uy = (r) => Fy(r);
function jt(r) {
  return r ? Uy(r) : Hl();
}
const $y = (r, n) => r === Ji ? n : n === Ji ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, uh = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: $y(r.subscribe, i ?? Ji)
  };
}, ho = ({ api: r, children: n, devToolsVisible: i = !0 }) => (b.useEffect(() => {
  if (!(!i || !r.subscribe))
    return Fn.register(r);
}, [r, i]), g.jsx(lh.Provider, { value: r, children: n }));
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
const ke = (r) => {
  const n = jt(), i = b.useMemo(() => new cf(n), [n]), a = b.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (b.useDebugValue(a), a instanceof cf)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, gl = (r, n) => {
  const i = jt(), a = b.useRef(n);
  b.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = co(r);
  b.useEffect(() => i.on({ scope: u, event: d }, (h) => a.current(h)), [i, u, d]);
};
function Hy(r, n) {
  function i(a) {
    const u = b.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function ch(r, n) {
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
const dh = b.createContext(null), Vy = Hy(dh, "ThreadPrimitive.Viewport"), { useThreadViewport: Xi, useThreadViewportStore: Wl } = ch(Vy, "useThreadViewport"), Wy = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function Yy(r, n = Gy) {
  Wy(r);
  const i = b.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return b.useDebugValue(i), i;
}
const Gy = (r) => r;
function qy(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? Yy(d, u) : null;
  }
  return n;
}
function Qy(r) {
  const n = jt(), i = ke(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const Rt = qy(Qy), Vn = (r) => {
  const [, n] = $t(r.getState);
  return nt(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, Ky = Ie(({ runtime: r }) => {
  const n = Vn(r), i = $l();
  return nt(() => {
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
  }, [r, i]), Pt({
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
  const n = ge(() => Object.fromEntries(r), [r]), i = Xf(n, (d) => d, []), a = ge(() => Object.keys(i), [i]);
  return {
    state: ge(() => {
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
}, fh = Ie(({ runtime: r }) => {
  const n = Vn(r);
  return Pt({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), Jy = Ie(({ runtime: r, index: n }) => {
  const i = ge(() => r.getAttachmentByIndex(n), [r, n]);
  return Ht(fh({
    runtime: i
  }));
}), hh = Ie(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = Vn(i), u = $l();
  nt(() => {
    const p = [], y = [
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
      p.push(x);
    }
    return () => {
      for (const v of p)
        v();
    };
  }, [i, u, r, n]);
  const d = Es(a.attachments.map((p, y) => [
    p.id,
    Jy({ runtime: i, index: y })
  ])), h = ge(() => ({
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
  return Pt({
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
}), Xy = Ie(({ runtime: r }) => {
  const n = Vn(r);
  return Pt({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), Zy = Ie(({ runtime: r, index: n }) => {
  const i = ge(() => r.getAttachmentByIndex(n), [r, n]);
  return Ht(fh({ runtime: i }));
}), ev = Ie(({ runtime: r, index: n }) => {
  const i = ge(() => r.getMessagePartByIndex(n), [r, n]);
  return Ht(Xy({ runtime: i }));
}), tv = Ie(({ runtime: r, threadIdRef: n }) => {
  const i = Vn(r), [a, u] = $t(!1), [d, h] = $t(!1), p = ge(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), y = Ht(hh({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: p
  })), v = Es(i.content.map((_, I) => [
    "toolCallId" in _ && _.toolCallId != null ? `toolCallId-${_.toolCallId}` : `index-${I}`,
    ev({ runtime: r, index: I })
  ])), x = Es(i.attachments?.map((_, I) => [
    _.id,
    Zy({ runtime: r, index: I })
  ]) ?? []), k = ge(() => ({
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
  return Pt({
    getState: () => k,
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
}), nv = Ie(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = ge(() => r.getMessageById(n), [r, n]);
  return Ht(tv({ runtime: a, threadIdRef: i }));
}), rv = Ie(({ runtime: r }) => {
  const n = Vn(r), i = $l();
  nt(() => {
    const p = [], y = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const v of y) {
      const x = r.unstable_on(v, () => {
        const k = r.getState()?.threadId || "unknown";
        i.emit(`thread.${v}`, {
          threadId: k
        });
      });
      p.push(x);
    }
    return () => {
      for (const v of p)
        v();
    };
  }, [r]);
  const a = ge(() => ({
    get current() {
      return r.getState().threadId;
    }
  }), [r]), u = Ht(hh({
    runtime: r.composer,
    threadIdRef: a
  })), d = Es(n.messages.map((p) => [
    p.id,
    nv({ runtime: r, id: p.id, threadIdRef: a })
  ])), h = ge(() => ({
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
  return Pt({
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
}), sv = Ie(({ runtime: r, id: n }) => {
  const i = ge(() => r.getItemById(n), [r, n]);
  return Ht(Ky({
    runtime: i
  }));
}), iv = Ie(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = Vn(r), a = Ht(rv({
    runtime: r.main
  })), u = Es(Object.keys(i.threadItems).map((h) => [
    h,
    sv({ runtime: r, id: h })
  ])), d = ge(() => ({
    mainThreadId: i.mainThreadId,
    newThreadId: i.newThread ?? null,
    isLoading: i.isLoading,
    threadIds: i.threads,
    archivedThreadIds: i.archivedThreads,
    threadItems: u.state,
    main: a.state
  }), [i, u.state, a.state]);
  return Pt({
    getState: () => d,
    thread: () => a.api,
    item: (h) => {
      if (h === "main")
        return u.api({ key: d.mainThreadId });
      if ("id" in h)
        return u.api({ key: h.id });
      const { index: p, archived: y = !1 } = h, v = y ? d.archivedThreadIds[p] : d.threadIds[p];
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
}), ov = Ie((r) => {
  const n = oh();
  return nt(() => r.registerModelContextProvider(n), [r, n]), Ht(iv({
    runtime: r.threads,
    __internal_assistantRuntime: r
  }));
}), ml = (r) => {
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
}, av = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = ml((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: h
      }
    });
  }), a = ml((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: h
      }
    });
  }), u = ml((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: h
      }
    });
  }), d = Ry(() => ({
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
}, ks = (r) => r, lv = (r) => {
  const n = Wl({ optional: !0 }), [i] = b.useState(() => av(r));
  return b.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), b.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && ks(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), b.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && ks(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, ph = ({ children: r, options: n = {} }) => {
  const i = lv(n), [a] = b.useState(() => ({
    useThreadViewport: i
  }));
  return g.jsx(dh.Provider, { value: a, children: r });
}, uv = (r) => r._core?.RenderComponent, cv = ({ children: r, runtime: n }) => {
  const i = jt({
    threads: ov(n)
  }), a = uv(n);
  return g.jsxs(ho, { api: i, children: [a && g.jsx(a, {}), g.jsx(ph, { children: r })] });
}, dv = b.memo(cv), fv = ({ index: r, children: n }) => {
  const i = jt(), a = Vl({
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
      const h = () => i.thread().message({ index: r }), { event: p, scope: y } = co(u);
      return !gs("composer", y) && !gs("message", y) ? i.on(u, d) : i.on({ scope: "thread", event: p }, (v) => {
        v.messageId === h().getState().id && d(v);
      });
    }
  });
  return g.jsx(ho, { api: a, children: n });
}, hv = ({ index: r, children: n }) => {
  const i = jt(), a = Vl({
    part: Ki({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return g.jsx(ho, { api: a, children: n });
}, pv = Ie(({ text: r, isRunning: n }) => {
  const i = ge(() => ({
    type: "text",
    text: r,
    status: n ? { type: "running" } : { type: "complete" }
  }), [r, n]);
  return Pt({
    getState: () => i,
    addToolResult: () => {
      throw new Error("Not supported");
    },
    resumeToolCall: () => {
      throw new Error("Not supported");
    }
  });
}), gv = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = Ul(sh(pv({ text: r, isRunning: n }))), u = Vl({
    part: Ki({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return g.jsx(ho, { api: u, children: i });
};
class mv {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new Zm(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
function po(r) {
  const n = b.useRef(r);
  return b.useEffect(() => {
    n.current = r;
  }), b.useMemo(() => (...i) => n.current?.(...i), []);
}
const yv = b.createContext(null);
function vv(r) {
  const n = b.useContext(yv);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: Iw, useSmoothStatusStore: _v } = ch(vv, "useSmoothStatus");
class Sv {
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
const yl = Object.freeze({
  type: "running"
}), wv = (r, n = !1) => {
  const { text: i } = r, a = ke(({ message: x }) => x.id), u = b.useRef(a), [d, h] = b.useState(i), p = _v({ optional: !0 }), y = po((x) => {
    if (h(x), p) {
      const k = d !== x || r.status.type === "running" ? yl : r.status;
      ks(p).setState(k, !0);
    }
  });
  b.useEffect(() => {
    if (p) {
      const x = n && (d !== i || r.status.type === "running") ? yl : r.status;
      ks(p).setState(x, !0);
    }
  }, [p, n, i, d, r.status]);
  const [v] = b.useState(new Sv(i, y));
  return b.useEffect(() => {
    if (!n) {
      v.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(v.targetText)) {
      u.current = a, y(i), v.currentText = i, v.targetText = i, v.stop();
      return;
    }
    v.targetText = i, v.start();
  }, [y, v, a, n, i]), b.useEffect(() => () => {
    v.stop();
  }, [v]), b.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : yl
  } : r, [n, d, r, i]);
};
var xv = /* @__PURE__ */ Symbol.for("react.lazy"), Zi = hm[" use ".trim().toString()];
function Ev(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function gh(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === xv && "_payload" in r && Ev(r._payload);
}
// @__NO_SIDE_EFFECTS__
function mh(r) {
  const n = /* @__PURE__ */ kv(r), i = b.forwardRef((a, u) => {
    let { children: d, ...h } = a;
    gh(d) && typeof Zi == "function" && (d = Zi(d._payload));
    const p = b.Children.toArray(d), y = p.find(Cv);
    if (y) {
      const v = y.props.children, x = p.map((k) => k === y ? b.Children.count(v) > 1 ? b.Children.only(null) : b.isValidElement(v) ? v.props.children : null : k);
      return /* @__PURE__ */ g.jsx(n, { ...h, ref: u, children: b.isValidElement(v) ? b.cloneElement(v, void 0, x) : null });
    }
    return /* @__PURE__ */ g.jsx(n, { ...h, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var yh = /* @__PURE__ */ mh("Slot");
// @__NO_SIDE_EFFECTS__
function kv(r) {
  const n = b.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if (gh(u) && typeof Zi == "function" && (u = Zi(u._payload)), b.isValidElement(u)) {
      const h = Iv(u), p = Tv(d, u.props);
      return u.type !== b.Fragment && (p.ref = a ? rh(a, h) : h), b.cloneElement(u, p);
    }
    return b.Children.count(u) > 1 ? b.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var bv = /* @__PURE__ */ Symbol("radix.slottable");
function Cv(r) {
  return b.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === bv;
}
function Tv(r, n) {
  const i = { ...n };
  for (const a in n) {
    const u = r[a], d = n[a];
    /^on[A-Z]/.test(a) ? u && d ? i[a] = (...p) => {
      const y = d(...p);
      return u(...p), y;
    } : u && (i[a] = u) : a === "style" ? i[a] = { ...u, ...d } : a === "className" && (i[a] = [u, d].filter(Boolean).join(" "));
  }
  return { ...r, ...i };
}
function Iv(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var Rv = [
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
], Cr = Rv.reduce((r, n) => {
  const i = /* @__PURE__ */ mh(`Primitive.${n}`), a = b.forwardRef((u, d) => {
    const { asChild: h, ...p } = u, y = h ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g.jsx(y, { ...p, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function vs(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const vh = (r, n, i = []) => {
  const a = b.forwardRef((u, d) => {
    const h = {}, p = {};
    Object.keys(u).forEach((v) => {
      i.includes(v) ? h[v] = u[v] : p[v] = u[v];
    });
    const y = n(h) ?? void 0;
    return g.jsx(Cr.button, { type: "button", ...p, ref: d, disabled: p.disabled || !y, onClick: vs(p.onClick, y) });
  });
  return a.displayName = r, a;
};
function Av(r, n = globalThis?.document) {
  const i = po(r);
  b.useEffect(() => {
    const a = (u) => {
      u.key === "Escape" && i(u);
    };
    return n.addEventListener("keydown", a, { capture: !0 }), () => n.removeEventListener("keydown", a, { capture: !0 });
  }, [i, n]);
}
const Is = (r) => {
  const n = b.useRef(void 0);
  return b.useCallback((a) => {
    n.current && n.current(), a && (n.current = r(a));
  }, [r]);
}, _h = (r, n) => {
  const i = b.useCallback((a) => {
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
}, df = b.createContext(!1), ff = (r, n) => {
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
}, Sh = ({ children: r, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const a = ke(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: y, message: v }) => v.isLast && v.role === "assistant" && v.index >= 1 && y.messages.at(v.index - 1)?.role === "user"
  ), u = Wl({ optional: !0 }), d = b.useContext(df), h = b.useCallback((y) => {
    if (!u || d)
      return;
    const v = () => {
      const x = u.getState();
      if (x.turnAnchor === "top" && a) {
        const { viewport: k, inset: _, userMessage: I } = x.height, N = ff(n, y), L = ff(i, y), B = I <= N ? I : L, V = Math.max(0, k - _ - B);
        y.style.minHeight = `${V}px`, y.style.flexShrink = "0", y.style.transition = "min-height 0s";
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
  ]), p = Is(h);
  return g.jsx(df.Provider, { value: !0, children: g.jsx(yh, { ref: p, children: r }) });
};
Sh.displayName = "ThreadPrimitive.ViewportSlack";
const Mv = () => {
  const r = jt(), n = ke(() => r.message()), i = b.useCallback((a) => {
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
  const r = Xi((u) => u.turnAnchor), n = Xi((u) => u.registerUserMessageHeight), i = ke(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = b.useCallback((u) => u.offsetHeight, []);
  return _h(i ? n : null, a);
}, Yl = b.forwardRef((r, n) => {
  const i = Mv(), a = Nv(), u = fo(n, i, a);
  return g.jsx(Sh, { children: g.jsx(Cr.div, { ...r, ref: u }) });
});
Yl.displayName = "MessagePrimitive.Root";
const Pv = () => ke(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), wh = b.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = wv(Pv(), r);
  return g.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
wh.displayName = "MessagePartPrimitive.Text";
const jv = () => ke(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), xh = b.forwardRef((r, n) => {
  const { image: i } = jv();
  return g.jsx(Cr.img, { src: i, ...r, ref: n });
});
xh.displayName = "MessagePartPrimitive.Image";
const Eh = ({ children: r }) => ke(({ part: i }) => i.status.type === "running") ? r : null;
Eh.displayName = "MessagePartPrimitive.InProgress";
const hf = (r) => Symbol.iterator in r, pf = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), gf = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, Lv = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function Ov(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : hf(r) && hf(n) ? pf(r) && pf(n) ? gf(r, n) : Lv(r, n) : gf(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function zv(r) {
  const n = At.useRef(void 0);
  return (i) => {
    const a = r(i);
    return Ov(n.current, a) ? n.current : n.current = a;
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
}, Dv = (r) => {
  const n = [], i = mf("toolGroup"), a = mf("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, Bv = () => {
  const r = ke(zv((n) => n.message.parts.map((i) => i.type)));
  return b.useMemo(() => r.length === 0 ? [] : Dv(r), [r]);
}, Fv = ({ Fallback: r, ...n }) => {
  const i = ke(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? g.jsx(i, { ...n }) : null;
}, nn = {
  Text: () => g.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [g.jsx(wh, {}), g.jsx(Eh, { children: g.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => g.jsx(xh, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, Uv = ({ components: { Text: r = nn.Text, Reasoning: n = nn.Reasoning, Image: i = nn.Image, Source: a = nn.Source, File: u = nn.File, Unstable_Audio: d = nn.Unstable_Audio, tools: h = {} } = {} }) => {
  const p = jt(), y = ke(({ part: x }) => x), v = y.type;
  if (v === "tool-call") {
    const x = p.part().addToolResult, k = p.part().resumeToolCall;
    if ("Override" in h)
      return g.jsx(h.Override, { ...y, addResult: x, resume: k });
    const _ = h.by_name?.[y.toolName] ?? h.Fallback;
    return g.jsx(Fv, { ...y, Fallback: _, addResult: x, resume: k });
  }
  if (y.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (v) {
    case "text":
      return g.jsx(r, { ...y });
    case "reasoning":
      return g.jsx(n, { ...y });
    case "source":
      return g.jsx(a, { ...y });
    case "image":
      return g.jsx(i, { ...y });
    case "file":
      return g.jsx(u, { ...y });
    case "audio":
      return g.jsx(d, { ...y });
    case "data":
      return null;
    default:
      const x = v;
      throw new Error(`Unknown message part type: ${x}`);
  }
}, Gi = b.memo(({ index: r, components: n }) => g.jsx(hv, { index: r, children: g.jsx(Uv, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
Gi.displayName = "MessagePrimitive.PartByIndex";
const $v = ({ status: r, component: n }) => g.jsx(gv, { text: "", isRunning: r.type === "running", children: g.jsx(n, { type: "text", text: "", status: r }) }), Hv = Object.freeze({
  type: "complete"
}), Vv = ({ components: r }) => {
  const n = ke((i) => i.message.status ?? Hv);
  return r?.Empty ? g.jsx(r.Empty, { status: n }) : g.jsx($v, { status: n, component: r?.Text ?? nn.Text });
}, Wv = b.memo(Vv, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), Gl = ({ components: r }) => {
  const n = ke(({ message: u }) => u.parts.length), i = Bv(), a = b.useMemo(() => n === 0 ? g.jsx(Wv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return g.jsx(Gi, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? nn.ToolGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => g.jsx(Gi, { index: u.startIndex + p, components: r }, p)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? nn.ReasoningGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => g.jsx(Gi, { index: u.startIndex + p, components: r }, p)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return g.jsx(g.Fragment, { children: a });
};
Gl.displayName = "MessagePrimitive.Parts";
const kh = ({ children: r }) => ke(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
kh.displayName = "MessagePrimitive.Error";
const bh = () => {
  const r = jt(), n = ke((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = b.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, Yv = vh("ComposerPrimitive.Send", bh), Ch = b.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = bh(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return g.jsx(Cr.form, { ...n, ref: i, onSubmit: vs(r, u) });
});
Ch.displayName = "ComposerPrimitive.Root";
function El() {
  return El = Object.assign ? Object.assign.bind() : function(r) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }
    return r;
  }, El.apply(null, arguments);
}
function Gv(r, n) {
  if (r == null) return {};
  var i = {};
  for (var a in r) if ({}.hasOwnProperty.call(r, a)) {
    if (n.indexOf(a) !== -1) continue;
    i[a] = r[a];
  }
  return i;
}
var qv = b.useLayoutEffect, Qv = function(n) {
  var i = At.useRef(n);
  return qv(function() {
    i.current = n;
  }), i;
}, yf = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, Kv = function(n, i) {
  var a = At.useRef();
  return At.useCallback(function(u) {
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
}, Jv = function(n) {
  Object.keys(vf).forEach(function(i) {
    n.style.setProperty(i, vf[i], "important");
  });
}, _f = Jv, tt = null, Sf = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function Xv(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), tt || (tt = document.createElement("textarea"), tt.setAttribute("tabindex", "-1"), tt.setAttribute("aria-hidden", "true"), _f(tt)), tt.parentNode === null && document.body.appendChild(tt);
  var u = r.paddingSize, d = r.borderSize, h = r.sizingStyle, p = h.boxSizing;
  Object.keys(h).forEach(function(_) {
    var I = _;
    tt.style[I] = h[I];
  }), _f(tt), tt.value = n;
  var y = Sf(tt, r);
  tt.value = n, y = Sf(tt, r), tt.value = "x";
  var v = tt.scrollHeight - u, x = v * i;
  p === "border-box" && (x = x + u + d), y = Math.max(x, y);
  var k = v * a;
  return p === "border-box" && (k = k + u + d), y = Math.min(k, y), [y, v];
}
var wf = function() {
}, Zv = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, e_ = [
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
], t_ = !!document.documentElement.currentStyle, n_ = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = Zv(e_, i), u = a.boxSizing;
  if (u === "")
    return null;
  t_ && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), h = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: h
  };
}, r_ = n_;
function ql(r, n, i) {
  var a = Qv(i);
  b.useLayoutEffect(function() {
    var u = function(h) {
      return a.current(h);
    };
    if (r)
      return r.addEventListener(n, u), function() {
        return r.removeEventListener(n, u);
      };
  }, []);
}
var s_ = function(n, i) {
  ql(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, i_ = function(n) {
  ql(window, "resize", n);
}, o_ = function(n) {
  ql(document.fonts, "loadingdone", n);
}, a_ = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], l_ = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, h = n.onChange, p = h === void 0 ? wf : h, y = n.onHeightChange, v = y === void 0 ? wf : y, x = Gv(n, a_), k = x.value !== void 0, _ = b.useRef(null), I = Kv(_, i), N = b.useRef(0), L = b.useRef(), B = function() {
    var U = _.current, ne = a && L.current ? L.current : r_(U);
    if (ne) {
      L.current = ne;
      var ce = Xv(ne, U.value || U.placeholder || "x", d, u), ie = ce[0], D = ce[1];
      N.current !== ie && (N.current = ie, U.style.setProperty("height", ie + "px", "important"), v(ie, {
        rowHeight: D
      }));
    }
  }, V = function(U) {
    k || B(), p(U);
  };
  return b.useLayoutEffect(B), s_(_, function() {
    if (!k) {
      var K = _.current.value;
      requestAnimationFrame(function() {
        var U = _.current;
        U && K !== U.value && B();
      });
    }
  }), i_(B), o_(B), /* @__PURE__ */ b.createElement("textarea", El({}, x, {
    onChange: V,
    ref: I
  }));
}, u_ = /* @__PURE__ */ b.forwardRef(l_);
const Th = (r) => {
  const n = po(r), i = Xi((a) => a.onScrollToBottom);
  b.useEffect(() => i(n), [i, n]);
}, Ih = b.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: h = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: y = !0, unstable_focusOnScrollToBottom: v = !0, unstable_focusOnThreadSwitched: x = !0, addAttachmentOnPaste: k = !0, ..._ }, I) => {
  const N = jt(), L = ke(({ composer: Q }) => Q.isEditing ? Q.text : ""), B = n ? yh : u_, V = ke(({ thread: Q, composer: oe }) => Q.isDisabled || oe.dictation?.inputDisabled) || i, K = b.useRef(null), U = fo(I, K);
  Av((Q) => {
    if (!p || !K.current?.contains(Q.target))
      return;
    const oe = N.composer();
    oe.getState().canCancel && (oe.cancel(), Q.preventDefault());
  });
  const ne = (Q) => {
    V || !h || Q.nativeEvent.isComposing || Q.key === "Enter" && Q.shiftKey === !1 && (N.thread().getState().isRunning || (Q.preventDefault(), K.current?.closest("form")?.requestSubmit()));
  }, ce = async (Q) => {
    if (!k)
      return;
    const oe = N.thread().getState().capabilities, Se = Array.from(Q.clipboardData?.files || []);
    if (oe.attachments && Se.length > 0)
      try {
        Q.preventDefault(), await Promise.all(Se.map((Re) => N.composer().addAttachment(Re)));
      } catch (Re) {
        console.error("Error adding attachment:", Re);
      }
  }, ie = r && !V, D = b.useCallback(() => {
    const Q = K.current;
    !Q || !ie || (Q.focus({ preventScroll: !0 }), Q.setSelectionRange(Q.value.length, Q.value.length));
  }, [ie]);
  return b.useEffect(() => D(), [D]), Th(() => {
    N.composer().getState().type === "thread" && v && D();
  }), b.useEffect(() => {
    if (!(N.composer().getState().type !== "thread" || !y))
      return N.on("thread.run-start", D);
  }, [y, D, N]), b.useEffect(() => {
    if (!(N.composer().getState().type !== "thread" || !x))
      return N.on("thread-list-item.switched-to", D);
  }, [x, D, N]), g.jsx(B, { name: "input", value: L, ..._, ref: U, disabled: V, onChange: vs(a, (Q) => {
    N.composer().getState().isEditing && xl(() => {
      N.composer().setText(Q.target.value);
    });
  }), onKeyDown: vs(u, ne), onPaste: vs(d, ce) });
});
Ih.displayName = "ComposerPrimitive.Input";
const c_ = () => {
  const r = jt(), n = ke(({ composer: a }) => !a.canCancel), i = b.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, d_ = vh("ComposerPrimitive.Cancel", c_), Rh = b.forwardRef((r, n) => g.jsx(Cr.div, { ...r, ref: n }));
Rh.displayName = "ThreadPrimitive.Root";
const f_ = (r) => ke(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), kl = ({ children: r, ...n }) => f_(n) ? r : null;
kl.displayName = "ThreadPrimitive.If";
const h_ = (r) => {
  const n = po(r), i = b.useCallback((a) => {
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
  return Is(i);
}, p_ = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = b.useRef(null), d = Wl();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const h = b.useRef(0), p = b.useRef(null), y = b.useCallback((I) => {
    const N = u.current;
    N && (p.current = I, N.scrollTo({ top: N.scrollHeight, behavior: I }));
  }, []), v = () => {
    const I = u.current;
    if (!I)
      return;
    const N = d.getState().isAtBottom, L = Math.abs(I.scrollHeight - I.scrollTop - I.clientHeight) < 1 || I.scrollHeight <= I.clientHeight;
    !L && h.current < I.scrollTop || (L && (p.current = null), (L || p.current === null) && L !== N && ks(d).setState({
      isAtBottom: L
    })), h.current = I.scrollTop;
  }, x = h_(() => {
    const I = p.current;
    I ? y(I) : r && d.getState().isAtBottom && y("instant"), v();
  }), k = Is((I) => (I.addEventListener("scroll", v), () => {
    I.removeEventListener("scroll", v);
  }));
  return Th(({ behavior: I }) => {
    y(I);
  }), gl("thread.run-start", () => {
    n && (p.current = "auto", requestAnimationFrame(() => {
      y("auto");
    }));
  }), gl("thread.initialize", () => {
    i && (p.current = "instant", requestAnimationFrame(() => {
      y("instant");
    }));
  }), gl("thread-list-item.switched-to", () => {
    a && (p.current = "instant", requestAnimationFrame(() => {
      y("instant");
    }));
  }), fo(x, k, u);
}, g_ = () => {
  const r = Xi((i) => i.registerViewport), n = b.useCallback((i) => i.clientHeight, []);
  return _h(r, n);
}, Ah = b.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, h) => {
  const p = p_({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), y = g_(), v = fo(h, p, y);
  return g.jsx(Cr.div, { ...d, ref: v, children: u });
});
Ah.displayName = "ThreadPrimitive.ViewportScrollable";
const Mh = b.forwardRef(({ turnAnchor: r, ...n }, i) => g.jsx(ph, { options: { turnAnchor: r }, children: g.jsx(Ah, { ...n, ref: i }) }));
Mh.displayName = "ThreadPrimitive.Viewport";
const Nh = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, m_ = () => null, y_ = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? m_;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, v_ = ({ components: r }) => {
  const n = ke(({ message: u }) => u.role), i = ke(({ message: u }) => u.composer.isEditing), a = y_(r, n, i);
  return g.jsx(a, {});
}, Ph = b.memo(({ index: r, components: n }) => g.jsx(fv, { index: r, children: g.jsx(v_, { components: n }) }), (r, n) => r.index === n.index && Nh(r.components, n.components));
Ph.displayName = "ThreadPrimitive.MessageByIndex";
const jh = ({ components: r }) => {
  const n = ke(({ thread: a }) => a.messages.length);
  return b.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => g.jsx(Ph, { index: u, components: r }, u)), [n, r]);
};
jh.displayName = "ThreadPrimitive.Messages";
const __ = b.memo(jh, (r, n) => Nh(r.components, n.components)), S_ = 1, eo = Object.freeze({
  product_card: "product_card",
  product_carousel: "product_carousel"
}), bs = Object.freeze({
  [eo.product_card]: "display_product_card",
  [eo.product_carousel]: "display_product_carousel"
}), w_ = Object.freeze(
  Object.fromEntries(
    Object.entries(bs).map(([r, n]) => [n, r])
  )
), Lh = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, Oh = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, x_ = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), Rs = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Hn = (r, n = "") => typeof r != "string" ? n : r.trim() || n, _r = (r) => Hn(r) || null, zh = (r) => {
  if (!Rs(r))
    return null;
  const n = {
    product_id: _r(r.product_id),
    handle: _r(r.handle),
    variant_id: _r(r.variant_id)
  };
  return !n.product_id && !n.handle && !n.variant_id ? null : n;
}, E_ = (r, n = 4) => Array.isArray(r) ? r.map(zh).filter(Boolean).slice(0, n) : [], k_ = (r) => {
  if (!Rs(r))
    return null;
  const n = zh(r.product_ref);
  return n ? {
    eyebrow: Hn(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: _r(r.reason),
    note: _r(r.note || r.ritual),
    ctaLabel: Hn(r.cta_label, "View crystal"),
    product_ref: n
  } : null;
}, b_ = (r) => {
  if (!Rs(r))
    return null;
  const n = E_(r.product_refs, 4);
  return n.length === 0 ? null : {
    eyebrow: Hn(r.eyebrow || r.kicker, "Matched for you"),
    title: Hn(r.title, "Recommended crystals"),
    reason: _r(r.reason || r.description),
    product_refs: n
  };
}, C_ = Object.freeze({
  [eo.product_card]: {
    toolName: bs.product_card,
    normalizeProps: k_
  },
  [eo.product_carousel]: {
    toolName: bs.product_carousel,
    normalizeProps: b_
  }
}), Ql = (r, n = "component") => {
  if (!Rs(r))
    return null;
  const i = Hn(
    r.component || r.componentType || w_[r.toolName]
  ), a = C_[i];
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
    version: S_,
    props: u
  };
}, go = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = Ql(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, Dh = (r) => {
  const n = Array.isArray(r) ? r : Rs(r) && Array.isArray(r.components) ? r.components : [];
  return go([], n);
}, xf = (r, n = "component") => {
  const i = Ql(r, n);
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
}, T_ = (r) => Ql(r), Bh = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}, I_ = (r = "") => {
  let n = String(r || "");
  const i = [], a = (u) => {
    const d = [...n.matchAll(u)];
    if (d.length !== 0) {
      for (const h of d) {
        const p = Bh(h[1]);
        p && i.push(p);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(Lh()), a(Oh()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    payloads: i
  };
}, R_ = (r = "") => {
  const n = String(r || ""), i = [], a = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi;
  let u = 0, d;
  for (; (d = a.exec(n)) !== null; ) {
    d.index > u && i.push({
      type: "text",
      value: n.slice(u, d.index)
    });
    const h = d[0], p = Bh(d[1] || d[2] || "");
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
}, Fh = (r = "") => {
  const { answer: n, payloads: i } = I_(r);
  let a = [];
  for (const u of i)
    a = go(a, Dh(u));
  return {
    answer: n,
    components: a
  };
}, A_ = (r = "") => {
  const n = String(r || "").toLowerCase();
  for (let i = 0; i < n.length; i += 1)
    for (const { marker: a, minPrefixLength: u } of x_) {
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
}, M_ = (r = "") => {
  const n = Lh(), i = Oh();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = A_(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, N_ = "section-rendering-askcrystal-chat-product-card", to = /* @__PURE__ */ new Map(), Hi = /* @__PURE__ */ new Map(), Ef = /* @__PURE__ */ new Map(), Vi = /* @__PURE__ */ new Map(), Uh = {
  "--product-card-gap": "12px",
  "--product-card-alignment": "stretch",
  "--padding-block-start": "0px",
  "--padding-block-end": "0px",
  "--padding-inline-start": "0px",
  "--padding-inline-end": "0px"
};
function P_(r) {
  return typeof window > "u" ? r : /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `http://localhost:8787${r}` : r;
}
function Kl(r) {
  return T_({
    toolName: r.toolName,
    result: r.result,
    args: r.args,
    toolCallId: r.toolCallId
  });
}
function j_(r) {
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
function L_(r) {
  const n = xr(r);
  return n ? JSON.stringify({
    handle: n.handle || "",
    product_id: n.productId || "",
    variant_id: n.variantId || ""
  }) : "";
}
async function O_(r) {
  const n = xr(r);
  if (!n)
    throw new Error("Missing product reference");
  if (n.handle)
    return n;
  const i = L_(r);
  if (!i)
    throw new Error("Missing product reference");
  const a = Ef.get(i);
  if (a)
    return a;
  if (!Vi.has(i)) {
    const u = fetch(P_("/apps/askcrystal/catalog/resolve-product-card"), {
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
      const p = xr({
        product_id: h.product.product_id || n.productId,
        handle: h.product.handle,
        variant_id: h.product.variant_id || n.variantId,
        title: h.product.title || "",
        image: h.product.image || "",
        imageAlt: h.product.imageAlt || "",
        price: h.product.price || "",
        compareAtPrice: h.product.compareAtPrice || ""
      });
      return Ef.set(i, p), p;
    }).finally(() => {
      Vi.delete(i);
    });
    Vi.set(i, u);
  }
  return Vi.get(i);
}
function z_(r, n) {
  const i = xr(r);
  if (!i?.handle || typeof window > "u")
    return null;
  const a = typeof window.Shopify?.routes?.root == "string" ? window.Shopify.routes.root : "/", u = new URL(`products/${i.handle}`, new URL(a, window.location.origin));
  u.searchParams.set("section_id", N_), u.searchParams.set("askcrystal_handle", i.handle);
  const d = j_(i.variantId);
  return d && u.searchParams.set("variant", d), typeof n == "string" && n.trim() && u.searchParams.set("askcrystal_cta", n.trim()), u.toString();
}
function D_(r) {
  const n = typeof r?.handle == "string" ? r.handle.trim() : "";
  return n ? `/products/${n}` : null;
}
function B_(r) {
  const n = typeof r?.title == "string" ? r.title.trim() : "";
  if (n)
    return n;
  const i = typeof r?.handle == "string" ? r.handle.trim() : "";
  return i ? i.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (a) => a.toUpperCase()) : "Recommended crystal";
}
function F_(r) {
  if (!r)
    return !1;
  const n = !!r.querySelector("a[href]"), i = !!r.querySelector("img, .askcrystal-chat-product-card__placeholder");
  return n && i;
}
function U_(r) {
  const i = new DOMParser().parseFromString(r, "text/html").querySelector("[data-askcrystal-native-product-card]");
  return F_(i) ? i.outerHTML.trim() : null;
}
async function $_(r) {
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
      const u = await a.text(), d = U_(u);
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
function $h({ eyebrow: r, title: n, children: i, className: a = "" }) {
  return /* @__PURE__ */ g.jsxs("section", { className: `ac-tool ${a}`.trim(), children: [
    /* @__PURE__ */ g.jsxs("header", { className: "ac-tool__header", children: [
      r ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__eyebrow", children: r }) : null,
      n ? /* @__PURE__ */ g.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function H_({ productRef: r, ctaLabel: n }) {
  const i = D_(r), a = B_(r), u = n || "View", d = typeof r?.image == "string" ? r.image.trim() : "", h = typeof r?.imageAlt == "string" ? r.imageAlt.trim() : a, p = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__media", children: d ? /* @__PURE__ */ g.jsx("img", { className: "askcrystal-chat-product-card__image", src: d, alt: h, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__body", children: [
      /* @__PURE__ */ g.jsx("product-title", { className: "askcrystal-chat-product-card__title", children: /* @__PURE__ */ g.jsx("span", { className: "title-text", children: a }) }),
      /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__meta", children: [
        r?.price ? /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__price-group", children: [
          /* @__PURE__ */ g.jsx("span", { className: "askcrystal-chat-product-card__price askcrystal-chat-product-card__price--hydrated", children: r.price }),
          r.compareAtPrice ? /* @__PURE__ */ g.jsx("span", { className: "askcrystal-chat-product-card__compare", children: r.compareAtPrice }) : null
        ] }) : null,
        /* @__PURE__ */ g.jsx("span", { className: "askcrystal-chat-product-card__cta", children: u })
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
          "data-product-id": r?.productId || void 0,
          children: /* @__PURE__ */ g.jsx(
            "div",
            {
              className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
              style: Uh,
              children: i ? /* @__PURE__ */ g.jsx("a", { className: "askcrystal-chat-product-card__surface", href: i, children: p }) : /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__surface", children: p })
            }
          )
        }
      )
    }
  );
}
function V_() {
  return /* @__PURE__ */ g.jsx(
    "div",
    {
      className: "askcrystal-chat-product-card ac-product-card-skeleton",
      "data-askcrystal-native-product-card": !0,
      "data-askcrystal-render-mode": "loading",
      "aria-hidden": "true",
      children: /* @__PURE__ */ g.jsx("div", { className: "product-card askcrystal-chat-product-card__card", children: /* @__PURE__ */ g.jsx(
        "div",
        {
          className: "product-card__content product-grid__card askcrystal-chat-product-card__content",
          style: Uh,
          children: /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__surface", children: [
            /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__media ac-product-card-skeleton__media", children: /* @__PURE__ */ g.jsx("span", { className: "ac-product-card-skeleton__crystal" }) }),
            /* @__PURE__ */ g.jsxs("div", { className: "askcrystal-chat-product-card__body ac-product-card-skeleton__body", children: [
              /* @__PURE__ */ g.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--title" }),
              /* @__PURE__ */ g.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--short" }),
              /* @__PURE__ */ g.jsxs("span", { className: "ac-product-card-skeleton__meta", children: [
                /* @__PURE__ */ g.jsx("span", { className: "ac-product-card-skeleton__line ac-product-card-skeleton__line--price" }),
                /* @__PURE__ */ g.jsx("span", { className: "ac-product-card-skeleton__pill" })
              ] })
            ] })
          ] })
        }
      ) })
    }
  );
}
function Hh({ productRef: r, ctaLabel: n, variant: i = "block" }) {
  const [a, u] = b.useState(() => xr(r)), d = z_(a, n), [h, p] = b.useState(() => d && to.get(d) || null), [y, v] = b.useState(null), x = i === "carousel" ? " ac-tool-product-native--carousel" : "";
  return b.useEffect(() => {
    let k = !0;
    return O_(r).then((_) => {
      k && b.startTransition(() => {
        u(_);
      });
    }).catch((_) => {
      k && b.startTransition(() => {
        v(_), u(xr(r));
      });
    }), () => {
      k = !1;
    };
  }, [r]), b.useEffect(() => {
    let k = !0;
    if (!d)
      return b.startTransition(() => {
        p(null), v(new Error("Missing product card request URL"));
      }), () => {
        k = !1;
      };
    const _ = to.get(d);
    return _ ? (b.startTransition(() => {
      p(_), v(null);
    }), () => {
      k = !1;
    }) : (b.startTransition(() => {
      p(null), v(null);
    }), $_(d).then((I) => {
      k && b.startTransition(() => {
        p(I), v(null);
      });
    }).catch((I) => {
      k && (typeof console < "u" && typeof console.warn == "function" && console.warn("[AskCrystal] Native product card render fell back to hydrated shell.", {
        requestUrl: d,
        error: I,
        productRef: a
      }), b.startTransition(() => {
        p(null), v(I);
      }));
    }), () => {
      k = !1;
    });
  }, [d, a]), h ? /* @__PURE__ */ g.jsx(
    "div",
    {
      className: `ac-tool-product-native ac-tool-product-native--native${x}`,
      dangerouslySetInnerHTML: { __html: h }
    }
  ) : /* @__PURE__ */ g.jsx(
    "div",
    {
      className: `ac-tool-product-native${x} ${y ? "ac-tool-product-native--fallback" : "ac-tool-product-native--loading"}`.trim(),
      "aria-busy": y ? void 0 : "true",
      "aria-live": "polite",
      children: y ? /* @__PURE__ */ g.jsx(H_, { productRef: a || r, ctaLabel: n }) : /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product-native__loading-label", children: "Polishing the storefront card..." }),
        /* @__PURE__ */ g.jsx(V_, {})
      ] })
    }
  );
}
function W_(r) {
  const n = Kl(r);
  if (!n)
    return null;
  const { ctaLabel: i, eyebrow: a, note: u, product_ref: d, reason: h } = n.props;
  return /* @__PURE__ */ g.jsxs("section", { className: "ac-tool-product-block", children: [
    a || h || u ? /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-product-context", children: [
      a ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product-context__eyebrow", children: a }) : null,
      h ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product-context__reason", children: h }) : null,
      u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product-context__note", children: u }) : null
    ] }) : null,
    /* @__PURE__ */ g.jsx(Hh, { productRef: d, ctaLabel: i })
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
  return /* @__PURE__ */ g.jsxs($h, { eyebrow: i, title: a, className: "ac-tool--carousel", children: [
    u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: d.map((h, p) => {
      const y = h.product_id || h.handle || h.variant_id || p;
      return /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel__item", role: "listitem", children: /* @__PURE__ */ g.jsx(Hh, { productRef: h, ctaLabel: "View", variant: "carousel" }) }, y);
    }) })
  ] });
}
function G_(r) {
  const n = Kl(r);
  return n ? /* @__PURE__ */ g.jsx($h, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function q_({ children: r }) {
  return /* @__PURE__ */ g.jsx("div", { className: "ac-tool-group", children: r });
}
const Q_ = {
  [bs.product_card]: W_,
  [bs.product_carousel]: Y_
}, K_ = {
  tools: {
    by_name: Q_,
    Fallback: G_
  },
  ToolGroup: q_
}, Vh = "[data-askcrystal-homepage-root]", no = /* @__PURE__ */ new Map(), J_ = "askcrystal-main-thread", X_ = "http://localhost:8787", Wh = Object.freeze([]), bl = "askcrystal-theme-session-id", Yh = "askcrystal-theme-chat-sessions-v1", Gh = "askcrystal-theme-active-session-id", Cl = "askcrystal-theme-pending-prompt-v1", Z_ = "askcrystal:session-registry", kf = "askcrystal:session-select", bf = "askcrystal:session-create", Cf = "askcrystal:session-delete", mo = 24, eS = "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538";
let Tf = 0;
const tS = 7, qh = At.createContext({
  sendPrompt: () => {
  },
  onCancel: () => {
  },
  isRunning: !1
});
function Qh() {
  return At.useContext(qh);
}
function nS(r) {
  const n = document.getElementById(r);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function Ft(r = []) {
  return r.map((n) => n.type === "text" ? n.text : "").join(" ").trim();
}
function vl(r) {
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
const Tl = /```askcrystal-suggestions\s*([\s\S]*?)```|<askcrystal-suggestions>\s*([\s\S]*?)<\/askcrystal-suggestions>/gi, rS = [
  "```askcrystal-suggestions",
  "<askcrystal-suggestions"
];
function sS(r) {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function iS(r = "") {
  let n = String(r || "");
  const i = [], a = [...n.matchAll(Tl)];
  for (const u of a) {
    const d = sS(u[1] || u[2] || ""), h = Fe(d?.suggestions || d || []);
    i.push(...h);
  }
  return n = n.replace(Tl, "").replace(/\n{3,}/g, `

`).trim(), {
    answer: n,
    suggestions: Fe(i)
  };
}
function ro(r = "") {
  let n = String(r || "").replace(Tl, "");
  const i = n.toLowerCase(), a = rS.map((u) => i.indexOf(u)).filter((u) => u >= 0);
  return a.length > 0 && (n = n.slice(0, Math.min(...a))), n.trimEnd();
}
function Kh() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.localStorage < "u";
  } catch {
    return !1;
  }
}
function Il(r) {
  if (!Kh()) return "";
  try {
    return window.localStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function so(r, n) {
  if (Kh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.localStorage.removeItem(r);
        return;
      }
      window.localStorage.setItem(r, n);
    } catch {
    }
}
function Jh() {
  if (typeof window > "u") return !1;
  try {
    return typeof window.sessionStorage < "u";
  } catch {
    return !1;
  }
}
function oS(r) {
  if (!Jh()) return "";
  try {
    return window.sessionStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function Xh(r, n) {
  if (Jh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.sessionStorage.removeItem(r);
        return;
      }
      window.sessionStorage.setItem(r, n);
    } catch {
    }
}
function aS(r) {
  return r === "chat" ? "chat" : "home";
}
function lS() {
  if (typeof window > "u") return "";
  try {
    const r = new URLSearchParams(window.location.search), n = r.get("askcrystal") || r.get("mode");
    if (n === "chat") return "chat";
    if (n === "home") return "home";
  } catch {
  }
  return "";
}
function Zh(r = {}) {
  return lS() || aS(r.displayMode);
}
function ep(r = {}) {
  return (typeof r.chatPageUrl == "string" ? r.chatPageUrl.trim() : "") || "/?askcrystal=chat";
}
function uS(r, n) {
  const i = typeof n == "string" ? n.trim() : "";
  return !i || typeof window > "u" ? !1 : (Xh(Cl, JSON.stringify({
    prompt: i,
    createdAt: Date.now()
  })), window.location.assign(ep(r)), !0);
}
function cS() {
  const r = oS(Cl);
  if (!r) return "";
  Xh(Cl, "");
  const n = tp(r, null), i = typeof n?.prompt == "string" ? n.prompt.trim() : "", a = Number(n?.createdAt), u = Number.isFinite(a) ? Date.now() - a < 300 * 1e3 : !0;
  return i && u ? i : "";
}
function tp(r, n) {
  if (typeof r != "string" || !r.trim()) return n;
  try {
    return JSON.parse(r);
  } catch {
    return n;
  }
}
function np(r, n = 52) {
  const i = typeof r == "string" ? r.replace(/\s+/g, " ").trim() : "";
  return i ? i.length <= n ? i : `${i.slice(0, Math.max(1, n - 1)).trimEnd()}…` : "";
}
function dS(r) {
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
function yo(r) {
  return Array.isArray(r) ? r.map(dS).filter(Boolean) : [];
}
function Rl(r) {
  if (!r || typeof r != "object") return "";
  const n = r.content || r.parts || [], i = Ft(Array.isArray(n) ? n : []);
  return i || (Array.isArray(r.metadata?.unstable_data) && r.metadata.unstable_data.length > 0 && r.role === "assistant" ? "Shared storefront picks and guidance." : "");
}
function vo(r, n = "New reading") {
  const i = Array.isArray(r) ? r.find((u) => u?.role === "user" && Rl(u)) : null, a = Rl(i);
  return a ? np(a, 42) : n;
}
function fS(r) {
  if (!Array.isArray(r) || r.length === 0)
    return "No messages yet.";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = Rl(r[n]);
    if (i) return np(i, 78);
  }
  return "No messages yet.";
}
function rp(r, n = null) {
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
  const n = (/* @__PURE__ */ new Date()).toISOString(), i = yo(r.messages || []);
  return {
    id: typeof r.id == "string" && r.id ? r.id : Wn("thread"),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : vo(i),
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
  const n = yo(r.messages || []), i = typeof r.createdAt == "string" && r.createdAt ? r.createdAt : (/* @__PURE__ */ new Date()).toISOString(), a = typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : rp(n, i) || i;
  return Cs({
    ...r,
    createdAt: i,
    updatedAt: a,
    messages: n,
    suggestions: Fe(r.suggestions || []),
    suggestionsMessageId: typeof r.suggestionsMessageId == "string" ? r.suggestionsMessageId : "",
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : vo(n)
  });
}
function pS() {
  const r = tp(Il(Yh), []), n = Array.isArray(r) ? r.map(hS).filter(Boolean) : [], i = n.length > 0 ? Er(n).slice(0, mo) : [Cs()], a = Il(Gh), u = i.some((d) => d.id === a) ? a : i[0].id;
  return {
    sessions: i,
    activeSessionId: u
  };
}
function gS({ sessions: r, activeSessionId: n }) {
  so(
    Yh,
    JSON.stringify(Er(r).slice(0, mo))
  ), so(Gh, n);
}
function _l(r, n) {
  return Array.isArray(r) && r.find((i) => i.id === n) || null;
}
function If(r) {
  return r ? {
    ...r,
    title: vo(r.messages, r.title || "New reading"),
    updatedAt: rp(r.messages, (/* @__PURE__ */ new Date()).toISOString()) || (/* @__PURE__ */ new Date()).toISOString()
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
    const h = i.messages !== void 0 ? yo(i.messages) : d.messages, p = If({
      ...d,
      ...i,
      messages: h,
      suggestions: i.suggestions !== void 0 ? Fe(i.suggestions) : d.suggestions,
      suggestionsMessageId: i.suggestionsMessageId !== void 0 ? i.suggestionsMessageId || "" : d.suggestionsMessageId || "",
      conversationId: i.conversationId !== void 0 ? i.conversationId || null : d.conversationId
    });
    a.push(p);
  }
  return u || a.push(If(Cs({
    id: n,
    ...i
  }))), Er(a).slice(0, mo);
}
function sp(r) {
  return Er(Array.isArray(r) ? r : []).map((n) => ({
    id: n.id,
    title: vo(n.messages, n.title || "New reading"),
    preview: fS(n.messages),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    isEmpty: !Array.isArray(n.messages) || n.messages.length === 0
  }));
}
function mS({ sessions: r, activeSessionId: n, isRunning: i }) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Z_, {
    detail: {
      sessions: sp(r),
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
function yS(r) {
  return /^(https?:\/\/|mailto:|\/)/i.test(r);
}
function en(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, h = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const p = `${n}-${h}`;
    if (d[2] && d[3]) {
      const y = d[3].trim();
      i.push(
        yS(y) ? /* @__PURE__ */ g.jsx("a", { href: y, target: y.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ g.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ g.jsx("strong", { children: en(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ g.jsx("em", { children: en(d[6], `${p}-em`) }, p));
    u = a.lastIndex, h += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function Ts(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function vS(r) {
  const n = Ts(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function _S(r) {
  const n = Ts(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function Af(r) {
  const n = Ts(r);
  return n.length >= 2 && n.some(Boolean);
}
function SS(r, n) {
  const i = r[n];
  if (!Af(i)) return null;
  const a = Ts(i), u = r[n + 1], d = _S(u);
  let h = n + (d ? 2 : 1);
  const p = [];
  for (; h < r.length && Af(r[h]); ) {
    const y = Ts(r[h]);
    if (y.length !== a.length) break;
    p.push(y), h += 1;
  }
  return p.length === 0 ? null : {
    headers: a,
    alignments: d ? vS(u) : a.map(() => "left"),
    rows: p,
    nextIndex: h
  };
}
function wS(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function ip({ text: r = "" }) {
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
      const x = [], k = d[1] || "";
      for (a += 1; a < n.length && !/^```\s*$/.test(n[a]); )
        x.push(n[a]), a += 1;
      a < n.length && (a += 1), wS(k) ? i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ g.jsx(ip, { text: x.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ g.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ g.jsx("code", { children: x.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const h = u.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const x = `h${h[1].length + 2}`;
      i.push(
        /* @__PURE__ */ g.jsx(x, { children: en(h[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ g.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const p = SS(n, a);
    if (p) {
      const { headers: x, alignments: k, rows: _, nextIndex: I } = p;
      a = I, i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ g.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ g.jsx("thead", { children: /* @__PURE__ */ g.jsx("tr", { children: x.map((N, L) => /* @__PURE__ */ g.jsx(
            "th",
            {
              style: { textAlign: k[L] || "left" },
              children: en(N, `table-head-${a}-${L}`)
            },
            `table-head-${a}-${L}`
          )) }) }),
          /* @__PURE__ */ g.jsx("tbody", { children: _.map((N, L) => /* @__PURE__ */ g.jsx("tr", { children: x.map((B, V) => /* @__PURE__ */ g.jsx(
            "td",
            {
              style: { textAlign: k[V] || "left" },
              children: en(N[V] || "", `table-cell-${a}-${L}-${V}`)
            },
            `table-cell-${a}-${L}-${V}`
          )) }, `table-row-${a}-${L}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        x.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ul", { children: x.map((k, _) => /* @__PURE__ */ g.jsx("li", { children: en(k, `ul-${a}-${_}`) }, `ul-${a}-${_}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        x.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ol", { children: x.map((k, _) => /* @__PURE__ */ g.jsx("li", { children: en(k, `ol-${a}-${_}`) }, `ol-${a}-${_}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const x = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        x.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("blockquote", { children: x.map((k, _) => /* @__PURE__ */ g.jsx("p", { children: en(k, `quote-${a}-${_}`) }, `quote-${a}-${_}`)) }, `quote-${a}`)
      );
      continue;
    }
    const y = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      y.push(n[a].trim()), a += 1;
    const v = y.join(" ");
    i.push(
      /* @__PURE__ */ g.jsx("p", { children: en(v, `p-${a}`) }, `p-${a}`)
    );
  }
  return /* @__PURE__ */ g.jsx("div", { className: "ac-markdown", children: i });
}
function xS(r) {
  if (typeof r != "string" || !r) return "";
  try {
    return JSON.parse(r);
  } catch {
    return r.replace(/^"/, "").replace(/"$/, "");
  }
}
function ES(r) {
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
function kS(r) {
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
  return ES(d).trim();
}
function op(r) {
  if (typeof r != "string") return "";
  const n = Jl(r).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trim();
  if (!n) return "";
  const i = [...n.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi
  )].pop();
  if (i?.[1]) {
    const d = xS(i[1]).trim();
    if (d) return d;
  }
  const a = kS(n);
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
function bS(r) {
  if (typeof r != "string") return "";
  let n = r.replace(/^\uFEFF/, "").trimStart();
  if (!n) return "";
  const i = n.slice(0, 24).toLowerCase().replace(/\s+/g, " ").trim();
  if (i && i.length >= 3 && i.length <= 13 && "final answer:".startsWith(i) && /^[a-z:\s]+$/i.test(n.trim()) && n.trim().length <= 24)
    return "";
  const a = [...n.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  return typeof a?.index == "number" ? n = n.slice(a.index + a[0].length).trimStart() : n = n.replace(/^final answer\s*:\s*/i, ""), n;
}
function Sl(r) {
  if (typeof r != "string") return "";
  const n = ro(Jl(r)).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trimStart();
  if (!n) return "";
  const i = op(n), a = ro(bS(i || n));
  return a ? a.replace(/\n{3,}/g, `

`).trimStart() : "";
}
function CS(r) {
  if (typeof r != "string") return !1;
  const n = r.toLowerCase();
  return /\bthought:\b/.test(n) || /\bobservation:\b/.test(n) || /\baction:\b/.test(n) || /\bquestion:\b/.test(n) || /"action"\s*:/.test(n) || /\bfinal answer\b/.test(n);
}
function Mf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(n) || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(n) || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(n) || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(n) || /\bi have \w+ products?\b/.test(n) : !1;
}
function Nf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(n) || /^```(?:json|xml)?\s*[\[{<]/.test(n) || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(n) || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(n) : !1;
}
function TS(r) {
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
    if (!Mf(h)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((h) => h.trim()).filter(Boolean);
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
function IS({ statusStage: r = "", statusTool: n = "", statusText: i = "" }) {
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
function RS({ statusText: r = "", statusStage: n = "", ambientStatusText: i = "", hasToolActivity: a = !1 }) {
  return i || (n && n !== "tool" && r ? r : a ? "Following the clearest thread..." : "Settling into your energy...");
}
function AS() {
  const [r, n] = b.useState(!1);
  return b.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
function MS({
  statusText: r,
  statusStage: n = "",
  statusTool: i = "",
  ambientStatusText: a = ""
}) {
  const u = AS(), d = b.useMemo(() => {
    const y = RS({
      statusText: r,
      statusStage: n,
      ambientStatusText: a,
      hasToolActivity: n === "tool"
    }), v = IS({
      statusStage: n === "tool" ? "compose" : n,
      statusTool: i,
      statusText: y
    });
    return [...new Set([y, ...v].filter(Boolean))];
  }, [a, n, r, i]), [h, p] = b.useState(0);
  return b.useEffect(() => {
    p(0);
  }, [d]), b.useEffect(() => {
    if (u || d.length <= 1) return;
    const y = window.setTimeout(() => {
      p((v) => (v + 1) % d.length);
    }, 7200);
    return () => window.clearTimeout(y);
  }, [d.length, h, u]), /* @__PURE__ */ g.jsx("p", { className: "ac-progress-card__ambient", children: d[h] || "The reading is still moving..." });
}
function NS(r) {
  return r >= 55e3 ? "This reading is taking the longer orbit, but the thread is still moving." : r >= 3e4 ? "Detailed chart work can need a fuller minute to cross-check timing, symbols, and shelf." : r >= 12e3 ? "Deeper readings sometimes need a few more breaths before they become useful." : r >= 4e3 ? "Following the strongest thread." : "The first signs are arriving.";
}
function PS({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = "",
  statusElapsedMs: d = 0
}) {
  const h = b.useRef(Date.now()), [p, y] = b.useState(0);
  b.useEffect(() => {
    const ne = window.setInterval(() => {
      y(Date.now() - h.current);
    }, 1e3);
    return () => window.clearInterval(ne);
  }, []);
  const v = Math.max(Number(d) || 0, p), x = v >= 3e4 ? "long" : v >= 12e3 ? "deep" : "early", k = v >= 4e3 || i === "tool" || i === "compose", _ = Xl(n), I = r || "Opening the thread beneath your question...", N = "Choosing the strongest reading path", L = "Choosing the right reading path", B = _.filter((ne) => ne !== N && ne !== L);
  i === "tool" && I && I !== N && I !== L && !B.includes(I) && B.push(I);
  const V = B.slice(-1), K = [
    {
      label: "Your question has entered the reading",
      state: "done"
    }
  ];
  if (k) {
    const ne = V.length > 0 || i === "compose";
    K.push({
      label: ne ? "The strongest reading path is chosen" : N,
      state: ne ? "done" : "current"
    }), V.forEach((ce, ie) => {
      const D = ie === V.length - 1;
      K.push({
        label: ce,
        state: i === "tool" && D ? "current" : "done"
      });
    }), K.push({
      label: "Shaping the guidance into a clear answer",
      state: i === "compose" ? "current" : "pending"
    });
  } else
    K.push({
      label: I,
      state: "current"
    });
  const U = K.slice(0, 4);
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-progress-card", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-progress-card__header", children: /* @__PURE__ */ g.jsxs("div", { className: "ac-progress-card__heading", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-progress-card__eyebrow", children: "AskCrystal is listening" }),
      /* @__PURE__ */ g.jsxs("h3", { children: [
        "Reading the signs",
        /* @__PURE__ */ g.jsxs("span", { className: "ac-progress-card__heading-dots", "aria-hidden": "true", children: [
          /* @__PURE__ */ g.jsx("span", {}),
          /* @__PURE__ */ g.jsx("span", {}),
          /* @__PURE__ */ g.jsx("span", {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ g.jsx("ol", { className: "ac-progress-card__steps ac-progress-card__steps--lyric", "aria-label": "Reading progress", children: U.map((ne, ce) => /* @__PURE__ */ g.jsxs(
      "li",
      {
        className: `ac-progress-card__step ac-progress-card__step--${ne.state}`,
        style: { "--ac-progress-step-index": ce },
        children: [
          /* @__PURE__ */ g.jsx("span", { className: "ac-progress-card__step-marker", "aria-hidden": "true" }),
          /* @__PURE__ */ g.jsx("span", { className: "ac-progress-card__step-label", children: ne.label })
        ]
      },
      `${ne.label}-${ce}`
    )) }),
    /* @__PURE__ */ g.jsx(
      MS,
      {
        statusText: r,
        statusStage: i,
        statusTool: a,
        ambientStatusText: u
      }
    ),
    /* @__PURE__ */ g.jsx("div", { className: "ac-progress-card__footer", children: /* @__PURE__ */ g.jsx("p", { className: `ac-progress-card__expectation ac-progress-card__expectation--${x}`, children: NS(v) }) })
  ] });
}
function jS(r) {
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
function ap(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return Ft(i.content);
  }
  return "";
}
function lp(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = op(n), a = ro(i || n), u = Jl(a).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && CS(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), h = TS(u), p = d >= 0 ? u.slice(d).trim() : h || u, v = p.split(/\n{2,}/).map((k) => k.trim()).filter(Boolean).filter((k) => !Nf(k)), x = (v.length > 0 ? v.join(`

`) : p).trim();
    if (x && !Nf(x))
      return x;
  }
  return "";
}
function LS(r) {
  const n = lp(r);
  return n || [
    "AskCrystal finished the request, but the final guidance was not readable.",
    "Please try once more, or ask the question in a slightly simpler way so the reading can come through cleanly."
  ].join(`

`);
}
function Al(r, n = []) {
  const i = iS(r), a = Fh(i.answer), u = go(n, a.components), d = LS(a.answer), h = i.suggestions;
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
function Un({ text: r = "", components: n = [] } = {}) {
  const i = typeof r == "string" ? r : "", a = Fh(i), u = go(n, a.components), d = R_(i), h = [], p = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Map(), v = (_) => `${_.toolName}:${_.toolCallId}`;
  for (const _ of u) {
    const I = xf(_);
    I && y.set(v(I), I);
  }
  const x = (_) => {
    const I = ro(M_(_)).trim(), N = lp(I);
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
  }, k = (_) => {
    for (const I of _) {
      const N = xf(I);
      if (!N) continue;
      const L = v(N);
      p.has(L) || (h.push(y.get(L) || N), p.add(L));
    }
  };
  if (d.some((_) => _.type === "payload"))
    for (const _ of d) {
      if (_.type === "text") {
        x(_.value);
        continue;
      }
      k(Dh(_.value));
    }
  else
    x(i);
  for (const _ of y.values()) {
    const I = v(_);
    p.has(I) || h.push(_);
  }
  return h;
}
function OS(r) {
  return /^https?:\/\//i.test(r);
}
function kr(r) {
  return r ? OS(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${X_}${r}` : r : "";
}
function zS(r) {
  return r ? r.endsWith("/stream") ? kr(r) : kr(`${r.replace(/\/$/, "")}/stream`) : "";
}
function DS(r) {
  return r ? r.endsWith("/stop") ? kr(r) : kr(`${r.replace(/\/$/, "")}/stop`) : "";
}
function up(r) {
  return r ? r.replace(/\/$/, "").replace(/\/(?:stream|stop|suggestions)$/, "").replace(/\/chat$/, "") : "";
}
function BS(r) {
  if (!r) return "";
  const n = `${up(r)}/identity/bootstrap`;
  return kr(n);
}
function FS(r) {
  if (!r) return "";
  const n = `${up(r)}/threads/messages`;
  return kr(n);
}
function US(r) {
  return /<html[\s>]/i.test(r || "") && /powered-by:\s*Shopify|cdn\/shop|shopify-section/i.test(r || "");
}
async function $S(r) {
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
  return US(u) ? "AskCrystal proxy is not connected. Shopify is serving the storefront page for /apps/askcrystal instead of forwarding the request to the app proxy." : n;
}
function HS() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  const r = Il(bl);
  if (r) return r;
  const n = Wn("session");
  return so(bl, n), n;
}
function Ml(r) {
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
function io(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function oo(r) {
  const n = r?.messageId || r?.message_id || r?.data?.messageId || r?.data?.message_id;
  return typeof n == "string" ? n : "";
}
function VS(r = []) {
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
async function WS({
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
  let p = i, y = Fe(u), v = d;
  const x = (k) => {
    const _ = vr(y, Nl(k));
    _.length !== y.length && (y = _, v = oo(k) || v, h?.(y, v));
  };
  try {
    for (; ; ) {
      St(a);
      const { done: _, value: I } = await r.read();
      if (_) break;
      St(a), p += n.decode(I, { stream: !0 });
      const N = Ml(p);
      p = N.remaining;
      for (const L of N.events)
        St(a), L.event === "suggestions" && x(L.payload);
    }
    const k = n.decode();
    if (k || p) {
      const _ = Ml(`${p}${k}

`);
      for (const I of _.events)
        I.event === "suggestions" && x(I.payload);
    }
  } catch (k) {
    k?.name !== "AbortError" && console.warn("[AskCrystal] Late suggestion stream could not be drained.", k);
  }
  return {
    suggestions: y,
    messageId: v
  };
}
function YS(r) {
  const n = r?.event || r?.data?.event;
  return typeof n == "string" ? n : "";
}
function GS(r) {
  if (typeof r?.tool == "string" && r.tool) return r.tool;
  if (typeof r?.tool_name == "string" && r.tool_name) return r.tool_name;
  if (r?.tool_labels && typeof r.tool_labels == "object") {
    const n = Object.values(r.tool_labels).find((i) => typeof i == "string" && i);
    if (typeof n == "string") return n;
  }
  return "";
}
function cp(r) {
  if (!r || typeof r != "object") return null;
  const n = typeof r.thought == "string" ? r.thought.trim() : typeof r.data?.thought == "string" ? r.data.thought.trim() : "", i = GS(r).trim(), a = typeof r.tool_input == "string" ? r.tool_input : typeof r.toolInput == "string" ? r.toolInput : typeof r.data?.tool_input == "string" ? r.data.tool_input : "", u = typeof r.observation == "string" ? r.observation : typeof r.data?.observation == "string" ? r.data.observation : "";
  if (!n && !i && !a && !u) return null;
  const d = oo(r), h = io(r), p = Number.isFinite(Number(r.position)) ? Number(r.position) : null;
  return {
    id: typeof r.id == "string" && r.id ? r.id : `${d || h || "thought"}:${p ?? 0}`,
    position: p,
    thought: n,
    tool: i,
    toolInput: a,
    observation: u,
    messageId: d,
    taskId: h,
    sourceEvent: typeof r.sourceEvent == "string" ? r.sourceEvent : YS(r)
  };
}
function ao(r) {
  return Array.isArray(r) ? r.map(cp).filter(Boolean) : [];
}
function dp(r, n) {
  const i = cp(n);
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
function qS() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function St(r) {
  if (r?.aborted)
    throw qS();
}
async function QS({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a, storefrontSessionId: u }) {
  if (!(!r || !n))
    try {
      await fetch(DS(r), {
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
async function KS({ apiEndpoint: r, sessionId: n }) {
  if (!r || !n) return null;
  try {
    const i = new URL(BS(r), window.location.origin);
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
async function JS({ apiEndpoint: r, sessionId: n, storefrontSessionId: i }) {
  if (!r || !n || !i) return null;
  try {
    const a = new URL(FS(r), window.location.origin);
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
async function XS({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: h, onThought: p, onDelta: y, onSuggestions: v }) {
  St(i);
  const x = await fetch(zS(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: ap(n),
      conversationId: a,
      sessionId: u,
      storefrontSessionId: d
    }),
    signal: i
  });
  if (!x.ok)
    throw new Error(await $S(x));
  if (!x.body)
    throw new Error("The proxy did not return a readable stream.");
  const k = x.body.getReader(), _ = new TextDecoder();
  let I = "", N = "", L = "", B = [], V = [], K = a || null;
  for (; ; ) {
    St(i);
    const { done: U, value: ne } = await k.read();
    if (U) break;
    St(i), I += _.decode(ne, { stream: !0 });
    const ce = Ml(I);
    I = ce.remaining;
    for (let ie = 0; ie < ce.events.length; ie += 1) {
      const D = ce.events[ie];
      if (St(i), D.event === "status" && typeof D.payload?.message == "string" && (St(i), h?.(D.payload)), D.event === "thought" && (St(i), B = dp(B, D.payload), p?.(D.payload), K = D.payload?.conversationId || D.payload?.conversation_id || K), D.event === "error")
        throw new Error(D.payload?.error || D.payload?.message || "The proxy stream failed.");
      if (D.event === "suggestions") {
        V = vr(V, Nl(D.payload)), v?.(V, oo(D.payload) || "");
        continue;
      }
      if (D.event === "replace") {
        St(i);
        const Q = vl(D.payload);
        if (Q) {
          N = Q;
          const oe = Sl(N);
          if (oe) {
            const Se = L;
            L = oe, oe !== Se && y?.("", oe, D.payload);
          }
        }
        K = D.payload?.conversationId || D.payload?.conversation_id || K;
      }
      if (["delta", "message", "agent_message"].includes(D.event)) {
        St(i);
        const Q = vl(D.payload);
        if (Q) {
          N += Q;
          const oe = Sl(N);
          if (oe) {
            const Se = L;
            if (L = oe, oe !== Se) {
              const Re = oe.startsWith(Se) ? oe.slice(Se.length) : oe;
              y?.(Re, oe, D.payload);
            }
          }
        }
        K = D.payload?.conversationId || D.payload?.conversation_id || K;
      }
      if (D.event === "complete") {
        St(i);
        const Q = vl(D.payload) || N, oe = typeof D.payload?.sourceText == "string" && D.payload.sourceText.trim() ? D.payload.sourceText : typeof D.payload?.source_text == "string" && D.payload.source_text.trim() ? D.payload.source_text : Q, Re = Sl(Q) || L || L, ye = Fe(D.payload?.suggestions || D.payload?.data?.suggestions || []), ve = oo(D.payload) || null;
        if (!Q && !Re && B.length > 0)
          return {
            answer: "",
            components: [],
            sourceText: "",
            suggestions: vr(V, ye),
            conversationId: D.payload?.conversationId || D.payload?.conversation_id || K || null,
            messageId: ve,
            thoughts: B
          };
        const _e = Al(oe || Re), ze = Fe(_e.suggestions || []), Ae = Fe([
          ...V,
          ...ze,
          ...ye
        ]);
        for (const F of ce.events.slice(ie + 1))
          F.event === "suggestions" && (V = vr(V, Nl(F.payload)));
        const pe = vr(Ae, V);
        return WS({
          reader: k,
          decoder: _,
          initialBuffer: I,
          abortSignal: i,
          initialSuggestions: pe,
          messageId: ve || "",
          onSuggestions: v
        }), {
          answer: _e.answer,
          components: _e.components,
          sourceText: _e.sourceText,
          suggestions: pe,
          conversationId: D.payload?.conversationId || D.payload?.conversation_id || K || null,
          messageId: ve,
          thoughts: B
        };
      }
    }
  }
  if (L) {
    const U = Al(L);
    return {
      answer: U.answer,
      components: U.components,
      sourceText: U.sourceText,
      suggestions: vr(V, U.suggestions || []),
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
function ZS(r) {
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
  statusText: h = "",
  statusStage: p = "",
  statusTool: y = "",
  statusHistory: v = [],
  ambientStatusText: x = "",
  statusElapsedMs: k = null,
  thoughts: _ = []
}) {
  const I = Xl(v).join(`
`), N = Number(k), L = ao(_), B = mw(
    L,
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
        ...h ? { statusText: h } : {},
        ...p ? { statusStage: p } : {},
        ...y ? { statusTool: y } : {},
        ...I ? { statusHistoryText: I } : {},
        ...x ? { ambientStatusText: x } : {},
        ...Number.isFinite(N) ? { statusElapsedMs: Math.max(0, N) } : {},
        ...B.length ? { difyProgressEntries: B } : {}
      }
    }
  };
}
function wl(r) {
  return String(r || "").replace(/\s+/g, " ").trim();
}
function Pf(r) {
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
    const u = Ft(a.content || a.parts || []);
    if (u) return u;
  }
  return "";
}
function ew(r) {
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
function tw(r) {
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
function nw(r, n) {
  const i = Array.isArray(r?.messages) ? r.messages : [], a = wl(n);
  if (!a || i.length === 0) return null;
  let u = -1, d = -1;
  for (let k = i.length - 1; k >= 0; k -= 1) {
    const _ = i[k];
    if (_?.role !== "user" || wl(_.text) !== a) continue;
    const I = i.findIndex(
      (N, L) => L > k && N?.role === "assistant" && (wl(N.text) || Array.isArray(N.components) && N.components.length > 0)
    );
    if (I !== -1) {
      u = k, d = I;
      break;
    }
  }
  if (u === -1 || d === -1) return null;
  const h = i.map((k) => k?.role === "user" ? ew(k) : k?.role === "assistant" ? tw(k) : null).filter(Boolean), p = i[d], y = Al(p?.text || "", p?.components || []), v = Fe(p?.suggestions || []), x = v.length ? v : Fe(y.suggestions || []);
  return {
    messages: h,
    suggestions: x,
    suggestionsMessageId: h[d]?.id || "",
    conversationId: r?.thread?.conversationId || null
  };
}
function rw(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Xl(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((h) => h !== a);
  return d.push(a), d.slice(-4);
}
function Pl({ id: r, text: n = "", components: i = [], thoughts: a = [] }) {
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
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = Pl({
    id: a.id,
    text: Ft(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function sw({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, storefrontSessionId: d, onStatus: h, onThought: p, onDelta: y, onSuggestions: v }) {
  if (!r.apiEndpoint)
    throw new Error("AskCrystal backend endpoint is not configured.");
  try {
    return await XS({
      apiEndpoint: r.apiEndpoint,
      messages: n,
      abortSignal: i,
      conversationId: a,
      sessionId: u,
      storefrontSessionId: d,
      onStatus: h,
      onThought: p,
      onDelta: y,
      onSuggestions: v
    });
  } catch (x) {
    throw x?.name === "AbortError" || console.error("[AskCrystal] Backend runtime failed.", x), x;
  }
}
function iw(r) {
  const n = b.useMemo(() => pS(), []), i = _l(n.sessions, n.activeSessionId) || n.sessions[0], [a, u] = b.useState(n.sessions), [d, h] = b.useState(i.id), [p, y] = b.useState(i.messages), [v, x] = b.useState(i.suggestions), [k, _] = b.useState(i.suggestionsMessageId || ""), [I, N] = b.useState(!1), L = b.useRef(null), B = b.useRef(""), V = b.useRef(""), K = b.useRef(!1), U = b.useRef(i.conversationId || null), ne = b.useRef(p), ce = b.useRef(a), ie = b.useRef(d), D = b.useRef(I), Q = b.useRef(HS());
  b.useEffect(() => {
    if (!r.apiEndpoint) return;
    let M = !1;
    return KS({
      apiEndpoint: r.apiEndpoint,
      sessionId: Q.current
    }).then((w) => {
      if (M || !w?.ok) return;
      const R = typeof w.identity?.guestToken == "string" ? w.identity.guestToken.trim() : "";
      R && R !== Q.current && (Q.current = R, so(bl, R));
    }), () => {
      M = !0;
    };
  }, [r.apiEndpoint]), b.useEffect(() => {
    ne.current = p;
  }, [p]), b.useEffect(() => {
    ce.current = a;
  }, [a]), b.useEffect(() => {
    ie.current = d;
  }, [d]), b.useEffect(() => {
    D.current = I;
  }, [I]), b.useEffect(() => {
    u((M) => Rf(M, d, {
      messages: jf(p, K.current),
      suggestions: v,
      suggestionsMessageId: k,
      conversationId: U.current,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }, [d, p, v, k]), b.useEffect(() => {
    gS({
      sessions: a,
      activeSessionId: d
    }), mS({
      sessions: a,
      activeSessionId: d,
      isRunning: I
    });
  }, [d, I, a]);
  const oe = b.useCallback((M) => {
    M && (U.current = M.conversationId || null, K.current = !1, V.current = "", h(M.id), y(yo(M.messages)), x(Fe(M.suggestions)), _(M.suggestionsMessageId || ""));
  }, []), Se = b.useCallback((M) => {
    if (!M || D.current)
      return;
    if (M === ie.current) {
      Wi();
      return;
    }
    const w = _l(ce.current, M);
    if (!w) return;
    const R = {
      ...w,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    u((H) => Rf(H, M, {
      updatedAt: R.updatedAt
    })), oe(R), Wi();
  }, [oe]), Re = b.useCallback(() => {
    if (D.current) return;
    const M = Cs();
    u(
      (w) => Er([M, ...w]).slice(0, mo)
    ), oe(M), Wi();
  }, [oe]), ye = b.useCallback((M) => {
    if (!M || D.current) return;
    const w = Er(
      ce.current.filter((se) => se.id !== M)
    ), R = w.length > 0 ? w : [Cs()], H = M === ie.current, re = _l(R, ie.current) || R[0];
    u(R), (H || re.id !== ie.current) && oe(re), Wi();
  }, [oe]);
  b.useEffect(() => {
    if (typeof window > "u") return;
    const M = (H) => {
      Se(H.detail?.sessionId || "");
    }, w = () => {
      Re();
    }, R = (H) => {
      ye(H.detail?.sessionId || "");
    };
    return window.addEventListener(kf, M), window.addEventListener(bf, w), window.addEventListener(Cf, R), () => {
      window.removeEventListener(kf, M), window.removeEventListener(bf, w), window.removeEventListener(Cf, R);
    };
  }, [Re, ye, Se]);
  const ve = b.useCallback((M) => {
    y(jf(M, K.current));
  }, []), _e = b.useCallback((M, w) => {
    y(
      (R) => R.map((H) => H.id !== M ? H : w(H))
    );
  }, []), ze = b.useCallback(async ({ expectedPrompt: M = "", poll: w = !1 } = {}) => {
    if (!r.apiEndpoint) return !1;
    const R = ie.current, H = M || Pf(ne.current);
    if (!H || !R) return !1;
    const re = Date.now() + (w ? 75e3 : 0);
    do {
      const se = await JS({
        apiEndpoint: r.apiEndpoint,
        sessionId: Q.current,
        storefrontSessionId: R
      }), ee = nw(se, H);
      if (ee)
        return ie.current !== R ? !1 : (U.current = ee.conversationId || U.current, K.current = !1, V.current = "", B.current = "", L.current = null, D.current = !1, N(!1), y(ee.messages), x(ee.suggestions), _(ee.suggestions.length ? ee.suggestionsMessageId : ""), !0);
      if (!w || Date.now() >= re) break;
      await new Promise((le) => setTimeout(le, 2e3));
    } while (!0);
    return !1;
  }, [r.apiEndpoint]);
  b.useEffect(() => {
    if (typeof window > "u") return;
    let M = !1;
    const w = () => {
      if (M || document.visibilityState && document.visibilityState !== "visible") return;
      const H = Pf(ne.current);
      H && ze({
        expectedPrompt: H,
        poll: !1
      });
    }, R = window.setTimeout(w, 800);
    return window.addEventListener("focus", w), window.addEventListener("pageshow", w), document.addEventListener("visibilitychange", w), () => {
      M = !0, window.clearTimeout(R), window.removeEventListener("focus", w), window.removeEventListener("pageshow", w), document.removeEventListener("visibilitychange", w);
    };
  }, [ze]);
  const Ae = b.useCallback(async () => {
    const M = L.current, w = B.current, R = V.current, H = U.current, re = Q.current, se = ie.current;
    M?.abort(), K.current = !0, D.current = !1, N(!1), x([]), _(""), w && _e(
      w,
      (ee) => Pl({
        id: ee.id,
        text: Ft(ee.content || []),
        components: ee.metadata?.unstable_data || []
      })
    ), !(!R || !r.apiEndpoint) && await QS({
      apiEndpoint: r.apiEndpoint,
      taskId: R,
      sessionId: re,
      conversationId: H,
      storefrontSessionId: se
    });
  }, [r.apiEndpoint, _e]), pe = b.useCallback(
    async (M) => {
      if (M.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      if (Zh(r) === "home") {
        const ae = Ft(M.content || []);
        if (uS(r, ae))
          return;
      }
      const w = ZS(M), R = Wn("assistant"), H = new AbortController(), re = tn({
        id: R,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy...",
        statusElapsedMs: 0
      }), se = [...ne.current, w];
      L.current = H, B.current = R, V.current = "", K.current = !1, D.current = !0, N(!0), x([]), _(""), y([...se, re]);
      let ee = "", le = [];
      const fe = ie.current;
      try {
        const ae = await sw({
          config: r,
          messages: se,
          abortSignal: H.signal,
          conversationId: U.current,
          sessionId: Q.current,
          storefrontSessionId: fe,
          onStatus: (wt) => {
            if (H.signal.aborted) return;
            const je = jS(wt);
            je.taskId && (V.current = je.taskId), _e(R, (Le) => {
              const Ge = Ft(Le.content || Le.parts || []), Vt = Array.isArray(Le.metadata?.unstable_data) ? Le.metadata.unstable_data : [], Wt = !!(Ge.trim() || Vt.length || le.length);
              return tn({
                id: R,
                parts: Un({
                  text: Ge,
                  components: Vt
                }),
                components: Vt,
                status: {
                  type: "running"
                },
                thoughts: le,
                statusText: Wt ? "" : je.message,
                statusStage: Wt ? "" : je.stage,
                statusTool: Wt ? "" : je.tool,
                statusHistory: Wt ? [] : rw(Le.metadata?.custom?.statusHistoryText, je),
                ambientStatusText: Wt ? "" : je.stage === "tool" ? Le.metadata?.custom?.ambientStatusText || "Settling into your energy..." : je.message,
                statusElapsedMs: Wt ? null : je.elapsedMs
              });
            });
          },
          onThought: (wt) => {
            if (H.signal.aborted) return;
            const je = io(wt);
            je && (V.current = je), le = dp(le, wt), _e(R, (Le) => {
              const ht = Array.isArray(Le.metadata?.unstable_data) ? Le.metadata.unstable_data : [], Vt = Ft(Le.content || Le.parts || []) || ee;
              return tn({
                id: R,
                parts: Un({
                  text: Vt,
                  components: ht
                }),
                components: ht,
                status: {
                  type: "running"
                },
                thoughts: le,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: []
              });
            });
          },
          onDelta: (wt, je, Le) => {
            if (H.signal.aborted) return;
            const Ge = io(Le);
            Ge && (V.current = Ge), ee = je, _e(
              R,
              () => tn({
                id: R,
                parts: Un({
                  text: je
                }),
                components: [],
                status: {
                  type: "running"
                },
                thoughts: le,
                statusText: "",
                statusStage: "",
                statusTool: "",
                statusHistory: []
              })
            );
          },
          onSuggestions: (wt, je) => {
            if (H.signal.aborted || K.current || ie.current !== fe) return;
            const Le = Fe(wt || []);
            if (!Le.length) return;
            const Ge = B.current, ht = VS(ne.current);
            Ge && Ge !== R || !Ge && ht !== R || (x(Le), _(je || R));
          }
        });
        U.current = ae.conversationId || U.current, V.current = "", K.current = !1;
        const Ue = ae.components || [], kn = Array.isArray(ae.thoughts) && ae.thoughts.length ? ae.thoughts : le, rn = Fe(ae.suggestions || []), Yn = ae.answer || ee || ae.sourceText || "", Tr = ae.sourceText || Yn, As = tn({
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
          ...se,
          As
        ];
        ne.current = Ir, y(Ir), rn.length && (x(rn), _(R));
      } catch (ae) {
        const Ue = K.current || H.signal.aborted;
        if (ae?.name === "AbortError" && Ue) {
          V.current = "", x([]), _(""), y([
            ...se,
            Pl({
              id: R,
              text: ee,
              components: [],
              thoughts: le
            })
          ]);
          return;
        }
        if (console.error("[AskCrystal] Assistant runtime failed.", ae), _e(
          R,
          (rn) => tn({
            id: R,
            parts: Un({
              text: Ft(rn.content || rn.parts || []) || ee
            }),
            components: [],
            status: {
              type: "running"
            },
            thoughts: le,
            statusText: "Reconnecting to your reading...",
            statusStage: "recover",
            ambientStatusText: "Reconnecting to your reading..."
          })
        ), await ze({
          expectedPrompt: ap(se),
          poll: !0
        })) return;
        V.current = "", K.current = !1, x([]), _(""), y([
          ...se,
          tn({
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
        L.current === H && (L.current = null), B.current === R && (B.current = ""), V.current && H.signal.aborted && (V.current = ""), D.current = !1, N(!1);
      }
    },
    [r, ze, _e]
  ), F = b.useCallback((M) => {
    const w = typeof M == "string" ? M.trim() : "";
    !w || D.current || pe({
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
  }, [pe]), Z = b.useMemo(
    () => ({
      messages: p,
      suggestions: v,
      suggestionsMessageId: k,
      isRunning: I,
      setMessages: ve,
      onImport: ve,
      onNew: pe,
      onCancel: Ae,
      adapters: {
        threadList: {
          threadId: d || J_,
          threads: sp(a).map((M) => ({
            id: M.id,
            remoteId: M.id,
            title: M.title
          }))
        }
      }
    }),
    [d, I, p, Ae, pe, ve, a, v, k]
  );
  return {
    runtime: dy(Z),
    hasUserMessages: p.some((M) => M.role === "user"),
    activeSessionId: d,
    sendPrompt: F,
    onCancel: Ae,
    isRunning: I
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
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__guide-shelf-header", children: /* @__PURE__ */ g.jsxs("div", { children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
      /* @__PURE__ */ g.jsx("h2", { children: r.shelfHeading })
    ] }) }),
    r.products.length ? /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ g.jsx(ow, { product: n }, n.id)) }) : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
  ] });
}
function Lf({ card: r }) {
  const { sendPrompt: n, isRunning: i } = Qh(), a = [
    "ac-homepage__guide-card",
    r.layout ? `ac-homepage__guide-card--${r.layout}` : "",
    r.emblemUrl ? "ac-homepage__guide-card--has-emblem" : ""
  ].filter(Boolean).join(" "), u = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    r.emblemUrl ? /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__guide-card-emblem", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("img", { src: r.emblemUrl, alt: "", loading: "lazy", decoding: "async" }) }) : null,
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-card-copy", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__guide-card-eyebrow", children: r.eyebrow }),
      /* @__PURE__ */ g.jsx("h3", { children: r.title }),
      /* @__PURE__ */ g.jsx("p", { children: r.description })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-card-footer", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-card-action", children: r.cta }),
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-card-arrow", "aria-hidden": "true", children: "→" })
    ] })
  ] });
  return r.prompt ? /* @__PURE__ */ g.jsx(
    "button",
    {
      type: "button",
      className: a,
      disabled: i,
      onClick: () => n(r.prompt),
      children: u
    }
  ) : /* @__PURE__ */ g.jsx("a", { className: a, href: r.href, children: u });
}
function lw({ config: r }) {
  const n = typeof r.headingLine1 == "string" ? r.headingLine1.trim() : "", i = typeof r.headingLine2Prefix == "string" ? r.headingLine2Prefix.trim() : "", a = typeof r.headingAccent == "string" ? r.headingAccent.trim() : "", u = typeof r.headingSuffix == "string" ? r.headingSuffix.trim() : "", d = a && u.toLowerCase().startsWith(`${a.toLowerCase()} `) ? u.slice(a.length).trimStart() : u, h = !!(n || i || a || d), p = [n, i].filter(Boolean).join(" "), y = (k, _) => {
    if (!k) return null;
    const I = Array.from(k.matchAll(/\byou\b/gi));
    if (!I.length)
      return k;
    const N = [];
    let L = 0;
    return I.forEach((B, V) => {
      const K = B.index ?? 0;
      K > L && N.push(
        /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-copy", children: k.slice(L, K) }, `${_}-copy-${V}`)
      ), N.push(
        /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-accent", children: B[0] }, `${_}-accent-${V}`)
      ), L = K + B[0].length;
    }), L < k.length && N.push(
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-copy", children: k.slice(L) }, `${_}-copy-tail`)
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
      href: ep(r)
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
  return /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__welcome", children: /* @__PURE__ */ g.jsxs("section", { className: "ac-homepage__guide", "aria-label": "Guided AskCrystal paths", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-header", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__guide-kicker", children: r.eyebrow }),
      /* @__PURE__ */ g.jsx("h1", { className: "ac-homepage__guide-title", children: h ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        p ? /* @__PURE__ */ g.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          p,
          a || d ? " " : ""
        ] }) : null,
        a ? /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-accent", children: a }) : null,
        d ? /* @__PURE__ */ g.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          p || a ? " " : "",
          y(d, "heading-suffix")
        ] }) : null
      ] }) : r.heading })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-grid", children: [
      v.map((k) => /* @__PURE__ */ g.jsx(Lf, { card: k }, k.id)),
      /* @__PURE__ */ g.jsx(aw, { config: r }),
      /* @__PURE__ */ g.jsx(Lf, { card: x })
    ] })
  ] }) });
}
function uw() {
  const r = b.useRef(null), [n, i] = b.useState(!1), a = b.useCallback(() => {
    const u = r.current;
    if (!u) {
      i(!1);
      return;
    }
    const d = u.scrollHeight > u.clientHeight + 2;
    i((h) => h === d ? h : d);
  }, []);
  return b.useEffect(() => {
    const u = window.requestAnimationFrame(a);
    return () => window.cancelAnimationFrame(u);
  }, [a]), /* @__PURE__ */ g.jsx(Ch, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ g.jsx(
          Ih,
          {
            ref: r,
            className: "ac-homepage__composer-input",
            placeholder: "ask me anything",
            minRows: 1,
            maxRows: tS,
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
          /* @__PURE__ */ g.jsx(kl, { running: !1, children: /* @__PURE__ */ g.jsx(Yv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ g.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ g.jsx(kl, { running: !0, children: /* @__PURE__ */ g.jsx(d_, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function cw() {
  return typeof document > "u" ? null : _m.createPortal(
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ g.jsx(uw, {}) }),
    document.body
  );
}
function dw() {
  return /* @__PURE__ */ g.jsx(Yl, { className: "ac-message ac-message--user", children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ g.jsx(Gl, {}) }) });
}
function fw() {
  const { sendPrompt: r, isRunning: n } = Qh(), i = Rt((p) => p.id || ""), a = Rt((p) => p.status?.type === "complete"), u = ke(({ thread: p }) => p.suggestions || Wh), d = ke(({ thread: p }) => p.isRunning), h = ke(({ thread: p }) => {
    for (let y = p.messages.length - 1; y >= 0; y -= 1) {
      const v = p.messages[y];
      if (v?.role === "assistant")
        return v.id === i;
    }
    return !1;
  });
  return !a || d || !h || !u.length ? null : /* @__PURE__ */ g.jsx("div", { className: "ac-message__suggestions", "aria-label": "Suggested follow-up prompts", children: u.map((p, y) => /* @__PURE__ */ g.jsx(
    "button",
    {
      type: "button",
      className: "ac-message__suggestion",
      disabled: d || n,
      onClick: () => r(p.prompt),
      children: p.prompt
    },
    `${i}-suggestion-${y}-${p.prompt}`
  )) });
}
function hw(r = "") {
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
function jl(r = "") {
  return String(r).toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}
function pw(r = "", n = "") {
  const i = jl(r), a = jl(`${r} ${n}`);
  return /search catalog|catalog|collection|product search|shopify search/.test(a) ? "Checking the crystal shelf..." : /get product details|product details|variant|inventory|price/.test(a) ? "Verifying the strongest match..." : /cart|checkout|update cart|get cart/.test(a) ? /update/.test(i) ? "Preparing the cart update..." : "Opening your cart..." : /policy|faq|shipping|return|store question/.test(a) ? "Checking the store guidance..." : /horoscope|zodiac|astrology|planet|daily guidance|star/.test(a) ? "Reading the sky pattern..." : /bazi|four pillars|day master|heavenly stem|earthly branch/.test(a) ? "Mapping the elemental chart..." : /tarot|spread|card/.test(a) ? "Laying out the spread..." : /fengshui|feng shui|space audit|room|placement/.test(a) ? "Reading the room’s flow..." : /yinyuan|matchmaking|relationship|compatib|connection/.test(a) ? "Tracing the connection pattern..." : /numerology|shushu|number profile/.test(a) ? "Reducing the numbers..." : /taibu|router|structured divination|route/.test(a) ? "Choosing the clearest reading path..." : /crystal|stone|chakra|ritual|intention|energy/.test(a) ? "Matching the energy to a crystal..." : r ? "Consulting the right tool..." : "";
}
function gw(r, n = 0) {
  const i = hw(r?.tool || ""), a = [
    r?.thought,
    r?.toolInput,
    r?.observation
  ].filter(Boolean).join(" "), u = pw(i, a);
  if (u) return u;
  const d = jl(a);
  return /search|look up|find|catalog|product|shop|store|inventory/.test(d) ? "Checking the crystal shelf..." : /chart|zodiac|horoscope|planet|bazi|tarot|feng|numerology|relationship|compatib/.test(d) ? "Reading the pattern..." : /recommend|guidance|answer|respond|final|compose/.test(d) ? "Bringing the guidance into focus..." : /tool|workflow|call|input|observation/.test(d) ? "Consulting the right tool..." : Of[n % Of.length];
}
function mw(r = [], n = !1) {
  const i = ao(r), a = /* @__PURE__ */ new Map();
  i.forEach((d, h) => {
    const p = gw(d, h);
    if (!p) return;
    const y = `${p}:${d.tool || ""}`, v = a.get(y), x = !!d.observation || !n && h < i.length - 1;
    a.set(y, {
      id: d.id || y,
      label: p,
      isFinished: v?.isFinished || x,
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
function yw(r, n = 0) {
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
function vw(r) {
  return Array.isArray(r) ? r.map(yw).filter(Boolean).sort((n, i) => n.order - i.order) : [];
}
function _w({ statusText: r = "" }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-dify-pending", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("span", { className: "ac-dify-pending__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ g.jsx("span", { children: r || "Thinking..." })
  ] });
}
function Sw() {
  const r = Rt((U) => U.content || U.parts || Wh), n = Ft(r), i = r.some((U) => U.type === "tool-call"), a = Rt((U) => U.status?.type === "running"), u = Rt((U) => U.metadata?.custom?.statusText || ""), d = Rt((U) => U.metadata?.custom?.statusStage || ""), h = Rt((U) => U.metadata?.custom?.statusTool || ""), p = Rt((U) => U.metadata?.custom?.statusHistoryText || ""), y = Rt((U) => U.metadata?.custom?.ambientStatusText || ""), v = Rt((U) => U.metadata?.custom?.statusElapsedMs || 0), x = Rt((U) => U.metadata?.custom?.difyProgressEntries), k = b.useMemo(() => vw(x), [x]), _ = k.length > 0, I = a && !n && !i && !_, N = !!n || i, L = a && !N, B = k.find((U) => U.isCurrent) || k[k.length - 1] || null, V = p || k.map((U) => U.label).join(`
`), K = u || B?.label || "";
  return /* @__PURE__ */ g.jsxs(Yl, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: [
      L ? /* @__PURE__ */ g.jsx(
        PS,
        {
          statusText: K,
          statusHistoryText: V,
          statusStage: d || (_ ? "tool" : "listen"),
          statusTool: h,
          ambientStatusText: y,
          statusElapsedMs: v
        }
      ) : null,
      N ? /* @__PURE__ */ g.jsx("div", { className: "ac-message__content-layer", children: /* @__PURE__ */ g.jsx(
        Gl,
        {
          components: {
            Text: ({ text: U }) => /* @__PURE__ */ g.jsx(ip, { text: U }),
            ...K_
          }
        }
      ) }) : I && !L ? /* @__PURE__ */ g.jsx(_w, { statusText: u }) : null
    ] }),
    /* @__PURE__ */ g.jsx(fw, {}),
    /* @__PURE__ */ g.jsx(kh, { children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function ww({ className: r = "" }) {
  const n = ["ac-chat-page__crystal-scene", r].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsxs("div", { className: n, "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("span", { className: "ac-chat-page__crystal-arc ac-chat-page__crystal-arc--left" }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-chat-page__crystal-arc ac-chat-page__crystal-arc--right" }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-chat-page__crystal-star ac-chat-page__crystal-star--one" }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-chat-page__crystal-star ac-chat-page__crystal-star--two" }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-chat-page__crystal-star ac-chat-page__crystal-star--three" }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-chat-page__crystal-orb", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-chat-page__crystal-orb-shine" }),
      /* @__PURE__ */ g.jsx("span", { className: "ac-chat-page__crystal-orb-star" })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-chat-page__crystal-base", children: [
      /* @__PURE__ */ g.jsx("span", {}),
      /* @__PURE__ */ g.jsx("span", {})
    ] })
  ] });
}
function xw() {
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
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-chat-page__welcome-card", children: [
    /* @__PURE__ */ g.jsx("p", { className: "ac-chat-page__welcome-kicker", children: "Welcome in" }),
    /* @__PURE__ */ g.jsx("h2", { children: "Ask for a reading, a crystal match, or a practical next step." }),
    /* @__PURE__ */ g.jsx("p", { children: "AskCrystal can read Bazi charts, daily horoscopes, tarot spreads, relationship patterns, feng shui layouts, Shushu numerology, and then connect the guidance to real crystal jewelry and care rituals when shopping is useful." }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-chat-page__welcome-chips", "aria-label": "AskCrystal capabilities", children: r.map((n) => /* @__PURE__ */ g.jsx("span", { children: n }, n)) })
  ] });
}
function Ew({ hasUserMessages: r = !1 }) {
  return /* @__PURE__ */ g.jsxs("section", { className: "ac-chat-page__hero", "aria-label": "AskCrystal reading room", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-chat-page__hero-backdrop", "aria-hidden": "true" }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-chat-page__hero-rule", "aria-hidden": "true" }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-chat-page__hero-copy", children: [
      /* @__PURE__ */ g.jsx("h1", { children: "Hi, I’m AskCrystal" }),
      /* @__PURE__ */ g.jsx("p", { children: "Your guide for readings, crystals, rituals, and clarity." })
    ] }),
    r ? null : /* @__PURE__ */ g.jsx(xw, {}),
    /* @__PURE__ */ g.jsx(ww, {})
  ] });
}
function kw({ config: r }) {
  const { runtime: n, hasUserMessages: i, activeSessionId: a, sendPrompt: u, onCancel: d, isRunning: h } = iw(r), p = b.useMemo(() => ({
    sendPrompt: u,
    onCancel: d,
    isRunning: h
  }), [h, d, u]), y = Zh(r), v = y === "chat", x = v && i, k = b.useRef(null), _ = b.useRef(null), I = b.useRef(!1), N = b.useRef(!1);
  b.useEffect(() => {
    if (!v || N.current || h) return;
    N.current = !0;
    const B = cS();
    if (!B) return;
    const V = window.setTimeout(() => {
      u(B);
    }, 80);
    return () => window.clearTimeout(V);
  }, [v, h, u]), b.useEffect(() => {
    if (!_.current) return;
    const V = window.requestAnimationFrame(() => {
      if (_.current) {
        if (!x) {
          I.current = !1, _.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        I.current || (I.current = !0, _.current.scrollTo({ top: _.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame(V);
  }, [a, x]), b.useEffect(() => {
    const B = k.current, V = _.current;
    if (!B || !V || typeof window > "u") return;
    const K = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let U = 0, ne = Math.max(1, V.clientHeight || 1);
    const ce = /* @__PURE__ */ new Map(), ie = (ye) => Math.round(ye), D = (ye) => Math.round(ye * 100) / 100, Q = (ye, ve) => {
      ce.get(ye) !== ve && (ce.set(ye, ve), B.style.setProperty(ye, ve));
    }, oe = () => {
      U = 0;
      const ye = V.scrollTop, ve = Math.max(280, Math.min(520, ne * 0.68)), _e = Math.max(0, 1 - ye / ve);
      if (!v) {
        const Ae = K?.matches ? 0 : Math.min(92, ye * 0.28);
        Q("--ac-homepage-backdrop-offset", `${ie(Ae)}px`), Q("--ac-homepage-backdrop-opacity", String(D(_e)));
        return;
      }
      const ze = K?.matches ? 0 : Math.min(260, ye * 0.34);
      Q("--ac-chat-bg-offset", `${ie(ze)}px`), Q("--ac-chat-bg-opacity", String(D(_e)));
    }, Se = () => {
      U || (U = window.requestAnimationFrame(oe));
    }, Re = () => {
      ne = Math.max(1, V.clientHeight || 1), Se();
    };
    return oe(), V.addEventListener("scroll", Se, { passive: !0 }), window.addEventListener("resize", Re, { passive: !0 }), () => {
      V.removeEventListener("scroll", Se), window.removeEventListener("resize", Re), U && window.cancelAnimationFrame(U);
    };
  }, [a, i, v]);
  const L = [
    "ac-homepage",
    `ac-homepage--${y}`,
    v ? i ? "ac-homepage--has-messages" : "ac-homepage--empty" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx(qh.Provider, { value: p, children: /* @__PURE__ */ g.jsx(dv, { runtime: n, children: /* @__PURE__ */ g.jsxs("div", { ref: k, className: L, children: [
    v ? null : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__backdrop", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("img", { src: eS, alt: "", loading: "eager", decoding: "async" }) }),
    /* @__PURE__ */ g.jsx(Rh, { className: "ac-homepage__thread", children: /* @__PURE__ */ g.jsxs(
      Mh,
      {
        ref: _,
        className: "ac-homepage__viewport",
        autoScroll: x,
        turnAnchor: x ? "bottom" : "top",
        scrollToBottomOnInitialize: !1,
        scrollToBottomOnRunStart: x,
        scrollToBottomOnThreadSwitch: x,
        children: [
          v ? /* @__PURE__ */ g.jsx(Ew, { hasUserMessages: i }) : /* @__PURE__ */ g.jsx(lw, { config: r }),
          v ? /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ g.jsx(
            __,
            {
              components: {
                UserMessage: dw,
                AssistantMessage: Sw
              }
            }
          ) }) : null,
          /* @__PURE__ */ g.jsx(cw, {})
        ]
      }
    ) })
  ] }) }) });
}
function bw(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || no.has(i)) return;
  const a = nS(n);
  if (!a) return;
  const u = vm.createRoot(r);
  u.render(/* @__PURE__ */ g.jsx(kw, { config: a })), no.set(i, u);
}
function Cw(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = no.get(n);
  i && (i.unmount(), no.delete(n));
}
function fp(r = document) {
  r.querySelectorAll(Vh).forEach((n) => bw(n));
}
function Tw(r) {
  r.querySelectorAll(Vh).forEach((n) => Cw(n));
}
fp();
document.addEventListener("shopify:section:load", (r) => {
  fp(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  Tw(r.target);
});
