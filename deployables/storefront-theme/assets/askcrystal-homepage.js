function $m(r, n) {
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
function Tf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Za = { exports: {} }, ss = {}, el = { exports: {} }, re = {};
var Md;
function Hm() {
  if (Md) return re;
  Md = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), f = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), E = Symbol.iterator;
  function S(k) {
    return k === null || typeof k != "object" ? null : (k = E && k[E] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var R = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, A = Object.assign, M = {};
  function $(k, N, te) {
    this.props = k, this.context = N, this.refs = M, this.updater = te || R;
  }
  $.prototype.isReactComponent = {}, $.prototype.setState = function(k, N) {
    if (typeof k != "object" && typeof k != "function" && k != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, k, N, "setState");
  }, $.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = $.prototype;
  function ue(k, N, te) {
    this.props = k, this.context = N, this.refs = M, this.updater = te || R;
  }
  var de = ue.prototype = new Y();
  de.constructor = ue, A(de, $.prototype), de.isPureReactComponent = !0;
  var ye = Array.isArray, J = Object.prototype.hasOwnProperty, fe = { current: null }, se = { key: !0, ref: !0, __self: !0, __source: !0 };
  function K(k, N, te) {
    var G, ie = {}, oe = null, ae = null;
    if (N != null) for (G in N.ref !== void 0 && (ae = N.ref), N.key !== void 0 && (oe = "" + N.key), N) J.call(N, G) && !se.hasOwnProperty(G) && (ie[G] = N[G]);
    var ne = arguments.length - 2;
    if (ne === 1) ie.children = te;
    else if (1 < ne) {
      for (var me = Array(ne), He = 0; He < ne; He++) me[He] = arguments[He + 2];
      ie.children = me;
    }
    if (k && k.defaultProps) for (G in ne = k.defaultProps, ne) ie[G] === void 0 && (ie[G] = ne[G]);
    return { $$typeof: r, type: k, key: oe, ref: ae, props: ie, _owner: fe.current };
  }
  function ve(k, N) {
    return { $$typeof: r, type: k.type, key: N, ref: k.ref, props: k.props, _owner: k._owner };
  }
  function Oe(k) {
    return typeof k == "object" && k !== null && k.$$typeof === r;
  }
  function Ce(k) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(te) {
      return N[te];
    });
  }
  var it = /\/+/g;
  function $e(k, N) {
    return typeof k == "object" && k !== null && k.key != null ? Ce("" + k.key) : N.toString(36);
  }
  function ot(k, N, te, G, ie) {
    var oe = typeof k;
    (oe === "undefined" || oe === "boolean") && (k = null);
    var ae = !1;
    if (k === null) ae = !0;
    else switch (oe) {
      case "string":
      case "number":
        ae = !0;
        break;
      case "object":
        switch (k.$$typeof) {
          case r:
          case n:
            ae = !0;
        }
    }
    if (ae) return ae = k, ie = ie(ae), k = G === "" ? "." + $e(ae, 0) : G, ye(ie) ? (te = "", k != null && (te = k.replace(it, "$&/") + "/"), ot(ie, N, te, "", function(He) {
      return He;
    })) : ie != null && (Oe(ie) && (ie = ve(ie, te + (!ie.key || ae && ae.key === ie.key ? "" : ("" + ie.key).replace(it, "$&/") + "/") + k)), N.push(ie)), 1;
    if (ae = 0, G = G === "" ? "." : G + ":", ye(k)) for (var ne = 0; ne < k.length; ne++) {
      oe = k[ne];
      var me = G + $e(oe, ne);
      ae += ot(oe, N, te, me, ie);
    }
    else if (me = S(k), typeof me == "function") for (k = me.call(k), ne = 0; !(oe = k.next()).done; ) oe = oe.value, me = G + $e(oe, ne++), ae += ot(oe, N, te, me, ie);
    else if (oe === "object") throw N = String(k), Error("Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead.");
    return ae;
  }
  function ee(k, N, te) {
    if (k == null) return k;
    var G = [], ie = 0;
    return ot(k, G, "", "", function(oe) {
      return N.call(te, oe, ie++);
    }), G;
  }
  function pe(k) {
    if (k._status === -1) {
      var N = k._result;
      N = N(), N.then(function(te) {
        (k._status === 0 || k._status === -1) && (k._status = 1, k._result = te);
      }, function(te) {
        (k._status === 0 || k._status === -1) && (k._status = 2, k._result = te);
      }), k._status === -1 && (k._status = 0, k._result = N);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var Z = { current: null }, O = { transition: null }, W = { ReactCurrentDispatcher: Z, ReactCurrentBatchConfig: O, ReactCurrentOwner: fe };
  function D() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return re.Children = { map: ee, forEach: function(k, N, te) {
    ee(k, function() {
      N.apply(this, arguments);
    }, te);
  }, count: function(k) {
    var N = 0;
    return ee(k, function() {
      N++;
    }), N;
  }, toArray: function(k) {
    return ee(k, function(N) {
      return N;
    }) || [];
  }, only: function(k) {
    if (!Oe(k)) throw Error("React.Children.only expected to receive a single React element child.");
    return k;
  } }, re.Component = $, re.Fragment = i, re.Profiler = u, re.PureComponent = ue, re.StrictMode = a, re.Suspense = m, re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W, re.act = D, re.cloneElement = function(k, N, te) {
    if (k == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
    var G = A({}, k.props), ie = k.key, oe = k.ref, ae = k._owner;
    if (N != null) {
      if (N.ref !== void 0 && (oe = N.ref, ae = fe.current), N.key !== void 0 && (ie = "" + N.key), k.type && k.type.defaultProps) var ne = k.type.defaultProps;
      for (me in N) J.call(N, me) && !se.hasOwnProperty(me) && (G[me] = N[me] === void 0 && ne !== void 0 ? ne[me] : N[me]);
    }
    var me = arguments.length - 2;
    if (me === 1) G.children = te;
    else if (1 < me) {
      ne = Array(me);
      for (var He = 0; He < me; He++) ne[He] = arguments[He + 2];
      G.children = ne;
    }
    return { $$typeof: r, type: k.type, key: ie, ref: oe, props: G, _owner: ae };
  }, re.createContext = function(k) {
    return k = { $$typeof: f, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, k.Provider = { $$typeof: d, _context: k }, k.Consumer = k;
  }, re.createElement = K, re.createFactory = function(k) {
    var N = K.bind(null, k);
    return N.type = k, N;
  }, re.createRef = function() {
    return { current: null };
  }, re.forwardRef = function(k) {
    return { $$typeof: p, render: k };
  }, re.isValidElement = Oe, re.lazy = function(k) {
    return { $$typeof: v, _payload: { _status: -1, _result: k }, _init: pe };
  }, re.memo = function(k, N) {
    return { $$typeof: _, type: k, compare: N === void 0 ? null : N };
  }, re.startTransition = function(k) {
    var N = O.transition;
    O.transition = {};
    try {
      k();
    } finally {
      O.transition = N;
    }
  }, re.unstable_act = D, re.useCallback = function(k, N) {
    return Z.current.useCallback(k, N);
  }, re.useContext = function(k) {
    return Z.current.useContext(k);
  }, re.useDebugValue = function() {
  }, re.useDeferredValue = function(k) {
    return Z.current.useDeferredValue(k);
  }, re.useEffect = function(k, N) {
    return Z.current.useEffect(k, N);
  }, re.useId = function() {
    return Z.current.useId();
  }, re.useImperativeHandle = function(k, N, te) {
    return Z.current.useImperativeHandle(k, N, te);
  }, re.useInsertionEffect = function(k, N) {
    return Z.current.useInsertionEffect(k, N);
  }, re.useLayoutEffect = function(k, N) {
    return Z.current.useLayoutEffect(k, N);
  }, re.useMemo = function(k, N) {
    return Z.current.useMemo(k, N);
  }, re.useReducer = function(k, N, te) {
    return Z.current.useReducer(k, N, te);
  }, re.useRef = function(k) {
    return Z.current.useRef(k);
  }, re.useState = function(k) {
    return Z.current.useState(k);
  }, re.useSyncExternalStore = function(k, N, te) {
    return Z.current.useSyncExternalStore(k, N, te);
  }, re.useTransition = function() {
    return Z.current.useTransition();
  }, re.version = "18.3.1", re;
}
var Nd;
function _l() {
  return Nd || (Nd = 1, el.exports = Hm()), el.exports;
}
var Pd;
function Vm() {
  if (Pd) return ss;
  Pd = 1;
  var r = _l(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(p, m, _) {
    var v, E = {}, S = null, R = null;
    _ !== void 0 && (S = "" + _), m.key !== void 0 && (S = "" + m.key), m.ref !== void 0 && (R = m.ref);
    for (v in m) a.call(m, v) && !d.hasOwnProperty(v) && (E[v] = m[v]);
    if (p && p.defaultProps) for (v in m = p.defaultProps, m) E[v] === void 0 && (E[v] = m[v]);
    return { $$typeof: n, type: p, key: S, ref: R, props: E, _owner: u.current };
  }
  return ss.Fragment = i, ss.jsx = f, ss.jsxs = f, ss;
}
var jd;
function Wm() {
  return jd || (jd = 1, Za.exports = Vm()), Za.exports;
}
var g = Wm(), b = _l();
const Kt = /* @__PURE__ */ Tf(b), Ym = /* @__PURE__ */ $m({
  __proto__: null,
  default: Kt
}, [b]);
var Pi = {}, tl = { exports: {} }, st = {}, nl = { exports: {} }, rl = {};
var Ld;
function qm() {
  return Ld || (Ld = 1, (function(r) {
    function n(O, W) {
      var D = O.length;
      O.push(W);
      e: for (; 0 < D; ) {
        var k = D - 1 >>> 1, N = O[k];
        if (0 < u(N, W)) O[k] = W, O[D] = N, D = k;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function a(O) {
      if (O.length === 0) return null;
      var W = O[0], D = O.pop();
      if (D !== W) {
        O[0] = D;
        e: for (var k = 0, N = O.length, te = N >>> 1; k < te; ) {
          var G = 2 * (k + 1) - 1, ie = O[G], oe = G + 1, ae = O[oe];
          if (0 > u(ie, D)) oe < N && 0 > u(ae, ie) ? (O[k] = ae, O[oe] = D, k = oe) : (O[k] = ie, O[G] = D, k = G);
          else if (oe < N && 0 > u(ae, D)) O[k] = ae, O[oe] = D, k = oe;
          else break e;
        }
      }
      return W;
    }
    function u(O, W) {
      var D = O.sortIndex - W.sortIndex;
      return D !== 0 ? D : O.id - W.id;
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
    var m = [], _ = [], v = 1, E = null, S = 3, R = !1, A = !1, M = !1, $ = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, ue = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function de(O) {
      for (var W = i(_); W !== null; ) {
        if (W.callback === null) a(_);
        else if (W.startTime <= O) a(_), W.sortIndex = W.expirationTime, n(m, W);
        else break;
        W = i(_);
      }
    }
    function ye(O) {
      if (M = !1, de(O), !A) if (i(m) !== null) A = !0, pe(J);
      else {
        var W = i(_);
        W !== null && Z(ye, W.startTime - O);
      }
    }
    function J(O, W) {
      A = !1, M && (M = !1, Y(K), K = -1), R = !0;
      var D = S;
      try {
        for (de(W), E = i(m); E !== null && (!(E.expirationTime > W) || O && !Ce()); ) {
          var k = E.callback;
          if (typeof k == "function") {
            E.callback = null, S = E.priorityLevel;
            var N = k(E.expirationTime <= W);
            W = r.unstable_now(), typeof N == "function" ? E.callback = N : E === i(m) && a(m), de(W);
          } else a(m);
          E = i(m);
        }
        if (E !== null) var te = !0;
        else {
          var G = i(_);
          G !== null && Z(ye, G.startTime - W), te = !1;
        }
        return te;
      } finally {
        E = null, S = D, R = !1;
      }
    }
    var fe = !1, se = null, K = -1, ve = 5, Oe = -1;
    function Ce() {
      return !(r.unstable_now() - Oe < ve);
    }
    function it() {
      if (se !== null) {
        var O = r.unstable_now();
        Oe = O;
        var W = !0;
        try {
          W = se(!0, O);
        } finally {
          W ? $e() : (fe = !1, se = null);
        }
      } else fe = !1;
    }
    var $e;
    if (typeof ue == "function") $e = function() {
      ue(it);
    };
    else if (typeof MessageChannel < "u") {
      var ot = new MessageChannel(), ee = ot.port2;
      ot.port1.onmessage = it, $e = function() {
        ee.postMessage(null);
      };
    } else $e = function() {
      $(it, 0);
    };
    function pe(O) {
      se = O, fe || (fe = !0, $e());
    }
    function Z(O, W) {
      K = $(function() {
        O(r.unstable_now());
      }, W);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, r.unstable_continueExecution = function() {
      A || R || (A = !0, pe(J));
    }, r.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ve = 0 < O ? Math.floor(1e3 / O) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(m);
    }, r.unstable_next = function(O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var W = 3;
          break;
        default:
          W = S;
      }
      var D = S;
      S = W;
      try {
        return O();
      } finally {
        S = D;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(O, W) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var D = S;
      S = O;
      try {
        return W();
      } finally {
        S = D;
      }
    }, r.unstable_scheduleCallback = function(O, W, D) {
      var k = r.unstable_now();
      switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? k + D : k) : D = k, O) {
        case 1:
          var N = -1;
          break;
        case 2:
          N = 250;
          break;
        case 5:
          N = 1073741823;
          break;
        case 4:
          N = 1e4;
          break;
        default:
          N = 5e3;
      }
      return N = D + N, O = { id: v++, callback: W, priorityLevel: O, startTime: D, expirationTime: N, sortIndex: -1 }, D > k ? (O.sortIndex = D, n(_, O), i(m) === null && O === i(_) && (M ? (Y(K), K = -1) : M = !0, Z(ye, D - k))) : (O.sortIndex = N, n(m, O), A || R || (A = !0, pe(J))), O;
    }, r.unstable_shouldYield = Ce, r.unstable_wrapCallback = function(O) {
      var W = S;
      return function() {
        var D = S;
        S = W;
        try {
          return O.apply(this, arguments);
        } finally {
          S = D;
        }
      };
    };
  })(rl)), rl;
}
var Od;
function Qm() {
  return Od || (Od = 1, nl.exports = qm()), nl.exports;
}
var zd;
function Gm() {
  if (zd) return st;
  zd = 1;
  var r = _l(), n = Qm();
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
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, _ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, v = {}, E = {};
  function S(e) {
    return m.call(E, e) ? !0 : m.call(v, e) ? !1 : _.test(e) ? E[e] = !0 : (v[e] = !0, !1);
  }
  function R(e, t, s, o) {
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
  function A(e, t, s, o) {
    if (t === null || typeof t > "u" || R(e, t, s, o)) return !0;
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
  function M(e, t, s, o, l, c, h) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = s, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = h;
  }
  var $ = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    $[e] = new M(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    $[t] = new M(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    $[e] = new M(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    $[e] = new M(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    $[e] = new M(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    $[e] = new M(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    $[e] = new M(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    $[e] = new M(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    $[e] = new M(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Y = /[\-:]([a-z])/g;
  function ue(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Y,
      ue
    );
    $[t] = new M(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Y, ue);
    $[t] = new M(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Y, ue);
    $[t] = new M(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    $[e] = new M(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), $.xlinkHref = new M("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    $[e] = new M(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function de(e, t, s, o) {
    var l = $.hasOwnProperty(t) ? $[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (A(t, s, l, o) && (s = null), o || l === null ? S(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var ye = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, J = /* @__PURE__ */ Symbol.for("react.element"), fe = /* @__PURE__ */ Symbol.for("react.portal"), se = /* @__PURE__ */ Symbol.for("react.fragment"), K = /* @__PURE__ */ Symbol.for("react.strict_mode"), ve = /* @__PURE__ */ Symbol.for("react.profiler"), Oe = /* @__PURE__ */ Symbol.for("react.provider"), Ce = /* @__PURE__ */ Symbol.for("react.context"), it = /* @__PURE__ */ Symbol.for("react.forward_ref"), $e = /* @__PURE__ */ Symbol.for("react.suspense"), ot = /* @__PURE__ */ Symbol.for("react.suspense_list"), ee = /* @__PURE__ */ Symbol.for("react.memo"), pe = /* @__PURE__ */ Symbol.for("react.lazy"), Z = /* @__PURE__ */ Symbol.for("react.offscreen"), O = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var D = Object.assign, k;
  function N(e) {
    if (k === void 0) try {
      throw Error();
    } catch (s) {
      var t = s.stack.trim().match(/\n( *(at )?)/);
      k = t && t[1] || "";
    }
    return `
` + k + e;
  }
  var te = !1;
  function G(e, t) {
    if (!e || te) return "";
    te = !0;
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
`), h = l.length - 1, y = c.length - 1; 1 <= h && 0 <= y && l[h] !== c[y]; ) y--;
        for (; 1 <= h && 0 <= y; h--, y--) if (l[h] !== c[y]) {
          if (h !== 1 || y !== 1)
            do
              if (h--, y--, 0 > y || l[h] !== c[y]) {
                var w = `
` + l[h].replace(" at new ", " at ");
                return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), w;
              }
            while (1 <= h && 0 <= y);
          break;
        }
      }
    } finally {
      te = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? N(e) : "";
  }
  function ie(e) {
    switch (e.tag) {
      case 5:
        return N(e.type);
      case 16:
        return N("Lazy");
      case 13:
        return N("Suspense");
      case 19:
        return N("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = G(e.type, !1), e;
      case 11:
        return e = G(e.type.render, !1), e;
      case 1:
        return e = G(e.type, !0), e;
      default:
        return "";
    }
  }
  function oe(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case se:
        return "Fragment";
      case fe:
        return "Portal";
      case ve:
        return "Profiler";
      case K:
        return "StrictMode";
      case $e:
        return "Suspense";
      case ot:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ce:
        return (e.displayName || "Context") + ".Consumer";
      case Oe:
        return (e._context.displayName || "Context") + ".Provider";
      case it:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ee:
        return t = e.displayName || null, t !== null ? t : oe(e.type) || "Memo";
      case pe:
        t = e._payload, e = e._init;
        try {
          return oe(e(t));
        } catch {
        }
    }
    return null;
  }
  function ae(e) {
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
        return oe(t);
      case 8:
        return t === K ? "StrictMode" : "Mode";
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
  function ne(e) {
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
  function me(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function He(e) {
    var t = me(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
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
  function Es(e) {
    e._valueTracker || (e._valueTracker = He(e));
  }
  function zl(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = me(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
  }
  function ks(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function io(e, t) {
    var s = t.checked;
    return D({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function Dl(e, t) {
    var s = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    s = ne(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Bl(e, t) {
    t = t.checked, t != null && de(e, "checked", t, !1);
  }
  function oo(e, t) {
    Bl(e, t);
    var s = ne(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? ao(e, t.type, s) : t.hasOwnProperty("defaultValue") && ao(e, t.type, ne(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Fl(e, t, s) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function ao(e, t, s) {
    (t !== "number" || ks(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var _r = Array.isArray;
  function Fn(e, t, s, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < s.length; l++) t["$" + s[l]] = !0;
      for (s = 0; s < e.length; s++) l = t.hasOwnProperty("$" + e[s].value), e[s].selected !== l && (e[s].selected = l), l && o && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + ne(s), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === s) {
          e[l].selected = !0, o && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function lo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return D({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Ul(e, t) {
    var s = t.value;
    if (s == null) {
      if (s = t.children, t = t.defaultValue, s != null) {
        if (t != null) throw Error(i(92));
        if (_r(s)) {
          if (1 < s.length) throw Error(i(93));
          s = s[0];
        }
        t = s;
      }
      t == null && (t = ""), s = t;
    }
    e._wrapperState = { initialValue: ne(s) };
  }
  function $l(e, t) {
    var s = ne(t.value), o = ne(t.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), t.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), o != null && (e.defaultValue = "" + o);
  }
  function Hl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Vl(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function uo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Vl(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var bs, Wl = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, s, o, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, s, o, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (bs = bs || document.createElement("div"), bs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = bs.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function wr(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Sr = {
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
  }, Yh = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Sr).forEach(function(e) {
    Yh.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Sr[t] = Sr[e];
    });
  });
  function Yl(e, t, s) {
    return t == null || typeof t == "boolean" || t === "" ? "" : s || typeof t != "number" || t === 0 || Sr.hasOwnProperty(e) && Sr[e] ? ("" + t).trim() : t + "px";
  }
  function ql(e, t) {
    e = e.style;
    for (var s in t) if (t.hasOwnProperty(s)) {
      var o = s.indexOf("--") === 0, l = Yl(s, t[s], o);
      s === "float" && (s = "cssFloat"), o ? e.setProperty(s, l) : e[s] = l;
    }
  }
  var qh = D({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function co(e, t) {
    if (t) {
      if (qh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function fo(e, t) {
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
  var ho = null;
  function po(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var mo = null, Un = null, $n = null;
  function Ql(e) {
    if (e = Hr(e)) {
      if (typeof mo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = Qs(t), mo(e.stateNode, e.type, t));
    }
  }
  function Gl(e) {
    Un ? $n ? $n.push(e) : $n = [e] : Un = e;
  }
  function Kl() {
    if (Un) {
      var e = Un, t = $n;
      if ($n = Un = null, Ql(e), t) for (e = 0; e < t.length; e++) Ql(t[e]);
    }
  }
  function Jl(e, t) {
    return e(t);
  }
  function Xl() {
  }
  var go = !1;
  function Zl(e, t, s) {
    if (go) return e(t, s);
    go = !0;
    try {
      return Jl(e, t, s);
    } finally {
      go = !1, (Un !== null || $n !== null) && (Xl(), Kl());
    }
  }
  function xr(e, t) {
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
  var yo = !1;
  if (p) try {
    var Er = {};
    Object.defineProperty(Er, "passive", { get: function() {
      yo = !0;
    } }), window.addEventListener("test", Er, Er), window.removeEventListener("test", Er, Er);
  } catch {
    yo = !1;
  }
  function Qh(e, t, s, o, l, c, h, y, w) {
    var I = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, I);
    } catch (j) {
      this.onError(j);
    }
  }
  var kr = !1, Ts = null, Cs = !1, vo = null, Gh = { onError: function(e) {
    kr = !0, Ts = e;
  } };
  function Kh(e, t, s, o, l, c, h, y, w) {
    kr = !1, Ts = null, Qh.apply(Gh, arguments);
  }
  function Jh(e, t, s, o, l, c, h, y, w) {
    if (Kh.apply(this, arguments), kr) {
      if (kr) {
        var I = Ts;
        kr = !1, Ts = null;
      } else throw Error(i(198));
      Cs || (Cs = !0, vo = I);
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
  function eu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function tu(e) {
    if (vn(e) !== e) throw Error(i(188));
  }
  function Xh(e) {
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
          if (c === s) return tu(l), e;
          if (c === o) return tu(l), t;
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
  function nu(e) {
    return e = Xh(e), e !== null ? ru(e) : null;
  }
  function ru(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ru(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var su = n.unstable_scheduleCallback, iu = n.unstable_cancelCallback, Zh = n.unstable_shouldYield, ep = n.unstable_requestPaint, Me = n.unstable_now, tp = n.unstable_getCurrentPriorityLevel, _o = n.unstable_ImmediatePriority, ou = n.unstable_UserBlockingPriority, Is = n.unstable_NormalPriority, np = n.unstable_LowPriority, au = n.unstable_IdlePriority, Rs = null, Mt = null;
  function rp(e) {
    if (Mt && typeof Mt.onCommitFiberRoot == "function") try {
      Mt.onCommitFiberRoot(Rs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var wt = Math.clz32 ? Math.clz32 : op, sp = Math.log, ip = Math.LN2;
  function op(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (sp(e) / ip | 0) | 0;
  }
  var As = 64, Ms = 4194304;
  function br(e) {
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
  function Ns(e, t) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var o = 0, l = e.suspendedLanes, c = e.pingedLanes, h = s & 268435455;
    if (h !== 0) {
      var y = h & ~l;
      y !== 0 ? o = br(y) : (c &= h, c !== 0 && (o = br(c)));
    } else h = s & ~l, h !== 0 ? o = br(h) : c !== 0 && (o = br(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - wt(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function ap(e, t) {
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
  function lp(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var h = 31 - wt(c), y = 1 << h, w = l[h];
      w === -1 ? ((y & s) === 0 || (y & o) !== 0) && (l[h] = ap(y, t)) : w <= t && (e.expiredLanes |= y), c &= ~y;
    }
  }
  function wo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function lu() {
    var e = As;
    return As <<= 1, (As & 4194240) === 0 && (As = 64), e;
  }
  function So(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Tr(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - wt(t), e[t] = s;
  }
  function up(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - wt(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function xo(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - wt(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var ge = 0;
  function uu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var cu, Eo, du, fu, hu, ko = !1, Ps = [], Xt = null, Zt = null, en = null, Cr = /* @__PURE__ */ new Map(), Ir = /* @__PURE__ */ new Map(), tn = [], cp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function pu(e, t) {
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
        Cr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ir.delete(t.pointerId);
    }
  }
  function Rr(e, t, s, o, l, c) {
    return e === null || e.nativeEvent !== c ? (e = { blockedOn: t, domEventName: s, eventSystemFlags: o, nativeEvent: c, targetContainers: [l] }, t !== null && (t = Hr(t), t !== null && Eo(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function dp(e, t, s, o, l) {
    switch (t) {
      case "focusin":
        return Xt = Rr(Xt, e, t, s, o, l), !0;
      case "dragenter":
        return Zt = Rr(Zt, e, t, s, o, l), !0;
      case "mouseover":
        return en = Rr(en, e, t, s, o, l), !0;
      case "pointerover":
        var c = l.pointerId;
        return Cr.set(c, Rr(Cr.get(c) || null, e, t, s, o, l)), !0;
      case "gotpointercapture":
        return c = l.pointerId, Ir.set(c, Rr(Ir.get(c) || null, e, t, s, o, l)), !0;
    }
    return !1;
  }
  function mu(e) {
    var t = _n(e.target);
    if (t !== null) {
      var s = vn(t);
      if (s !== null) {
        if (t = s.tag, t === 13) {
          if (t = eu(s), t !== null) {
            e.blockedOn = t, hu(e.priority, function() {
              du(s);
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
  function js(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var s = To(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        ho = o, s.target.dispatchEvent(o), ho = null;
      } else return t = Hr(s), t !== null && Eo(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function gu(e, t, s) {
    js(e) && s.delete(t);
  }
  function fp() {
    ko = !1, Xt !== null && js(Xt) && (Xt = null), Zt !== null && js(Zt) && (Zt = null), en !== null && js(en) && (en = null), Cr.forEach(gu), Ir.forEach(gu);
  }
  function Ar(e, t) {
    e.blockedOn === t && (e.blockedOn = null, ko || (ko = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, fp)));
  }
  function Mr(e) {
    function t(l) {
      return Ar(l, e);
    }
    if (0 < Ps.length) {
      Ar(Ps[0], e);
      for (var s = 1; s < Ps.length; s++) {
        var o = Ps[s];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (Xt !== null && Ar(Xt, e), Zt !== null && Ar(Zt, e), en !== null && Ar(en, e), Cr.forEach(t), Ir.forEach(t), s = 0; s < tn.length; s++) o = tn[s], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < tn.length && (s = tn[0], s.blockedOn === null); ) mu(s), s.blockedOn === null && tn.shift();
  }
  var Hn = ye.ReactCurrentBatchConfig, Ls = !0;
  function hp(e, t, s, o) {
    var l = ge, c = Hn.transition;
    Hn.transition = null;
    try {
      ge = 1, bo(e, t, s, o);
    } finally {
      ge = l, Hn.transition = c;
    }
  }
  function pp(e, t, s, o) {
    var l = ge, c = Hn.transition;
    Hn.transition = null;
    try {
      ge = 4, bo(e, t, s, o);
    } finally {
      ge = l, Hn.transition = c;
    }
  }
  function bo(e, t, s, o) {
    if (Ls) {
      var l = To(e, t, s, o);
      if (l === null) Ho(e, t, o, Os, s), pu(e, o);
      else if (dp(l, e, t, s, o)) o.stopPropagation();
      else if (pu(e, o), t & 4 && -1 < cp.indexOf(e)) {
        for (; l !== null; ) {
          var c = Hr(l);
          if (c !== null && cu(c), c = To(e, t, s, o), c === null && Ho(e, t, o, Os, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else Ho(e, t, o, null, s);
    }
  }
  var Os = null;
  function To(e, t, s, o) {
    if (Os = null, e = po(o), e = _n(e), e !== null) if (t = vn(e), t === null) e = null;
    else if (s = t.tag, s === 13) {
      if (e = eu(t), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Os = e, null;
  }
  function yu(e) {
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
        switch (tp()) {
          case _o:
            return 1;
          case ou:
            return 4;
          case Is:
          case np:
            return 16;
          case au:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var nn = null, Co = null, zs = null;
  function vu() {
    if (zs) return zs;
    var e, t = Co, s = t.length, o, l = "value" in nn ? nn.value : nn.textContent, c = l.length;
    for (e = 0; e < s && t[e] === l[e]; e++) ;
    var h = s - e;
    for (o = 1; o <= h && t[s - o] === l[c - o]; o++) ;
    return zs = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Ds(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Bs() {
    return !0;
  }
  function _u() {
    return !1;
  }
  function at(e) {
    function t(s, o, l, c, h) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = h, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (s = e[y], this[y] = s ? s(c) : c[y]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Bs : _u, this.isPropagationStopped = _u, this;
    }
    return D(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Bs);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Bs);
    }, persist: function() {
    }, isPersistent: Bs }), t;
  }
  var Vn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Io = at(Vn), Nr = D({}, Vn, { view: 0, detail: 0 }), mp = at(Nr), Ro, Ao, Pr, Fs = D({}, Nr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: No, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Pr && (Pr && e.type === "mousemove" ? (Ro = e.screenX - Pr.screenX, Ao = e.screenY - Pr.screenY) : Ao = Ro = 0, Pr = e), Ro);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ao;
  } }), wu = at(Fs), gp = D({}, Fs, { dataTransfer: 0 }), yp = at(gp), vp = D({}, Nr, { relatedTarget: 0 }), Mo = at(vp), _p = D({}, Vn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), wp = at(_p), Sp = D({}, Vn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), xp = at(Sp), Ep = D({}, Vn, { data: 0 }), Su = at(Ep), kp = {
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
  }, bp = {
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
  }, Tp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Cp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Tp[e]) ? !!t[e] : !1;
  }
  function No() {
    return Cp;
  }
  var Ip = D({}, Nr, { key: function(e) {
    if (e.key) {
      var t = kp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ds(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? bp[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: No, charCode: function(e) {
    return e.type === "keypress" ? Ds(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ds(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Rp = at(Ip), Ap = D({}, Fs, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), xu = at(Ap), Mp = D({}, Nr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: No }), Np = at(Mp), Pp = D({}, Vn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), jp = at(Pp), Lp = D({}, Fs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Op = at(Lp), zp = [9, 13, 27, 32], Po = p && "CompositionEvent" in window, jr = null;
  p && "documentMode" in document && (jr = document.documentMode);
  var Dp = p && "TextEvent" in window && !jr, Eu = p && (!Po || jr && 8 < jr && 11 >= jr), ku = " ", bu = !1;
  function Tu(e, t) {
    switch (e) {
      case "keyup":
        return zp.indexOf(t.keyCode) !== -1;
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
  function Cu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Wn = !1;
  function Bp(e, t) {
    switch (e) {
      case "compositionend":
        return Cu(t);
      case "keypress":
        return t.which !== 32 ? null : (bu = !0, ku);
      case "textInput":
        return e = t.data, e === ku && bu ? null : e;
      default:
        return null;
    }
  }
  function Fp(e, t) {
    if (Wn) return e === "compositionend" || !Po && Tu(e, t) ? (e = vu(), zs = Co = nn = null, Wn = !1, e) : null;
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
        return Eu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Up = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Iu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Up[e.type] : t === "textarea";
  }
  function Ru(e, t, s, o) {
    Gl(o), t = Ws(t, "onChange"), 0 < t.length && (s = new Io("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var Lr = null, Or = null;
  function $p(e) {
    qu(e, 0);
  }
  function Us(e) {
    var t = Kn(e);
    if (zl(t)) return e;
  }
  function Hp(e, t) {
    if (e === "change") return t;
  }
  var Au = !1;
  if (p) {
    var jo;
    if (p) {
      var Lo = "oninput" in document;
      if (!Lo) {
        var Mu = document.createElement("div");
        Mu.setAttribute("oninput", "return;"), Lo = typeof Mu.oninput == "function";
      }
      jo = Lo;
    } else jo = !1;
    Au = jo && (!document.documentMode || 9 < document.documentMode);
  }
  function Nu() {
    Lr && (Lr.detachEvent("onpropertychange", Pu), Or = Lr = null);
  }
  function Pu(e) {
    if (e.propertyName === "value" && Us(Or)) {
      var t = [];
      Ru(t, Or, e, po(e)), Zl($p, t);
    }
  }
  function Vp(e, t, s) {
    e === "focusin" ? (Nu(), Lr = t, Or = s, Lr.attachEvent("onpropertychange", Pu)) : e === "focusout" && Nu();
  }
  function Wp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Us(Or);
  }
  function Yp(e, t) {
    if (e === "click") return Us(t);
  }
  function qp(e, t) {
    if (e === "input" || e === "change") return Us(t);
  }
  function Qp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var St = typeof Object.is == "function" ? Object.is : Qp;
  function zr(e, t) {
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
  function ju(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Lu(e, t) {
    var s = ju(e);
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
      s = ju(s);
    }
  }
  function Ou(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ou(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function zu() {
    for (var e = window, t = ks(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof t.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = t.contentWindow;
      else break;
      t = ks(e.document);
    }
    return t;
  }
  function Oo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Gp(e) {
    var t = zu(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Ou(s.ownerDocument.documentElement, s)) {
      if (o !== null && Oo(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = Lu(s, c);
          var h = Lu(
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
  var Kp = p && "documentMode" in document && 11 >= document.documentMode, Yn = null, zo = null, Dr = null, Do = !1;
  function Du(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Do || Yn == null || Yn !== ks(o) || (o = Yn, "selectionStart" in o && Oo(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Dr && zr(Dr, o) || (Dr = o, o = Ws(zo, "onSelect"), 0 < o.length && (t = new Io("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = Yn)));
  }
  function $s(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var qn = { animationend: $s("Animation", "AnimationEnd"), animationiteration: $s("Animation", "AnimationIteration"), animationstart: $s("Animation", "AnimationStart"), transitionend: $s("Transition", "TransitionEnd") }, Bo = {}, Bu = {};
  p && (Bu = document.createElement("div").style, "AnimationEvent" in window || (delete qn.animationend.animation, delete qn.animationiteration.animation, delete qn.animationstart.animation), "TransitionEvent" in window || delete qn.transitionend.transition);
  function Hs(e) {
    if (Bo[e]) return Bo[e];
    if (!qn[e]) return e;
    var t = qn[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Bu) return Bo[e] = t[s];
    return e;
  }
  var Fu = Hs("animationend"), Uu = Hs("animationiteration"), $u = Hs("animationstart"), Hu = Hs("transitionend"), Vu = /* @__PURE__ */ new Map(), Wu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function rn(e, t) {
    Vu.set(e, t), d(t, [e]);
  }
  for (var Fo = 0; Fo < Wu.length; Fo++) {
    var Uo = Wu[Fo], Jp = Uo.toLowerCase(), Xp = Uo[0].toUpperCase() + Uo.slice(1);
    rn(Jp, "on" + Xp);
  }
  rn(Fu, "onAnimationEnd"), rn(Uu, "onAnimationIteration"), rn($u, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(Hu, "onTransitionEnd"), f("onMouseEnter", ["mouseout", "mouseover"]), f("onMouseLeave", ["mouseout", "mouseover"]), f("onPointerEnter", ["pointerout", "pointerover"]), f("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Br = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Zp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Br));
  function Yu(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, Jh(o, t, void 0, e), e.currentTarget = null;
  }
  function qu(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var h = o.length - 1; 0 <= h; h--) {
          var y = o[h], w = y.instance, I = y.currentTarget;
          if (y = y.listener, w !== c && l.isPropagationStopped()) break e;
          Yu(l, y, I), c = w;
        }
        else for (h = 0; h < o.length; h++) {
          if (y = o[h], w = y.instance, I = y.currentTarget, y = y.listener, w !== c && l.isPropagationStopped()) break e;
          Yu(l, y, I), c = w;
        }
      }
    }
    if (Cs) throw e = vo, Cs = !1, vo = null, e;
  }
  function Se(e, t) {
    var s = t[Go];
    s === void 0 && (s = t[Go] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (Qu(t, e, 2, !1), s.add(o));
  }
  function $o(e, t, s) {
    var o = 0;
    t && (o |= 4), Qu(s, e, o, t);
  }
  var Vs = "_reactListening" + Math.random().toString(36).slice(2);
  function Fr(e) {
    if (!e[Vs]) {
      e[Vs] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (Zp.has(s) || $o(s, !1, e), $o(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Vs] || (t[Vs] = !0, $o("selectionchange", !1, t));
    }
  }
  function Qu(e, t, s, o) {
    switch (yu(t)) {
      case 1:
        var l = hp;
        break;
      case 4:
        l = pp;
        break;
      default:
        l = bo;
    }
    s = l.bind(null, t, s, e), l = void 0, !yo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, s, { capture: !0, passive: l }) : e.addEventListener(t, s, !0) : l !== void 0 ? e.addEventListener(t, s, { passive: l }) : e.addEventListener(t, s, !1);
  }
  function Ho(e, t, s, o, l) {
    var c = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var h = o.tag;
      if (h === 3 || h === 4) {
        var y = o.stateNode.containerInfo;
        if (y === l || y.nodeType === 8 && y.parentNode === l) break;
        if (h === 4) for (h = o.return; h !== null; ) {
          var w = h.tag;
          if ((w === 3 || w === 4) && (w = h.stateNode.containerInfo, w === l || w.nodeType === 8 && w.parentNode === l)) return;
          h = h.return;
        }
        for (; y !== null; ) {
          if (h = _n(y), h === null) return;
          if (w = h.tag, w === 5 || w === 6) {
            o = c = h;
            continue e;
          }
          y = y.parentNode;
        }
      }
      o = o.return;
    }
    Zl(function() {
      var I = c, j = po(s), L = [];
      e: {
        var P = Vu.get(e);
        if (P !== void 0) {
          var B = Io, U = e;
          switch (e) {
            case "keypress":
              if (Ds(s) === 0) break e;
            case "keydown":
            case "keyup":
              B = Rp;
              break;
            case "focusin":
              U = "focus", B = Mo;
              break;
            case "focusout":
              U = "blur", B = Mo;
              break;
            case "beforeblur":
            case "afterblur":
              B = Mo;
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
              B = wu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = yp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = Np;
              break;
            case Fu:
            case Uu:
            case $u:
              B = wp;
              break;
            case Hu:
              B = jp;
              break;
            case "scroll":
              B = mp;
              break;
            case "wheel":
              B = Op;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = xp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = xu;
          }
          var H = (t & 4) !== 0, Ne = !H && e === "scroll", T = H ? P !== null ? P + "Capture" : null : P;
          H = [];
          for (var x = I, C; x !== null; ) {
            C = x;
            var z = C.stateNode;
            if (C.tag === 5 && z !== null && (C = z, T !== null && (z = xr(x, T), z != null && H.push(Ur(x, z, C)))), Ne) break;
            x = x.return;
          }
          0 < H.length && (P = new B(P, U, null, s, j), L.push({ event: P, listeners: H }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", B = e === "mouseout" || e === "pointerout", P && s !== ho && (U = s.relatedTarget || s.fromElement) && (_n(U) || U[Bt])) break e;
          if ((B || P) && (P = j.window === j ? j : (P = j.ownerDocument) ? P.defaultView || P.parentWindow : window, B ? (U = s.relatedTarget || s.toElement, B = I, U = U ? _n(U) : null, U !== null && (Ne = vn(U), U !== Ne || U.tag !== 5 && U.tag !== 6) && (U = null)) : (B = null, U = I), B !== U)) {
            if (H = wu, z = "onMouseLeave", T = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (H = xu, z = "onPointerLeave", T = "onPointerEnter", x = "pointer"), Ne = B == null ? P : Kn(B), C = U == null ? P : Kn(U), P = new H(z, x + "leave", B, s, j), P.target = Ne, P.relatedTarget = C, z = null, _n(j) === I && (H = new H(T, x + "enter", U, s, j), H.target = C, H.relatedTarget = Ne, z = H), Ne = z, B && U) t: {
              for (H = B, T = U, x = 0, C = H; C; C = Qn(C)) x++;
              for (C = 0, z = T; z; z = Qn(z)) C++;
              for (; 0 < x - C; ) H = Qn(H), x--;
              for (; 0 < C - x; ) T = Qn(T), C--;
              for (; x--; ) {
                if (H === T || T !== null && H === T.alternate) break t;
                H = Qn(H), T = Qn(T);
              }
              H = null;
            }
            else H = null;
            B !== null && Gu(L, P, B, H, !1), U !== null && Ne !== null && Gu(L, Ne, U, H, !0);
          }
        }
        e: {
          if (P = I ? Kn(I) : window, B = P.nodeName && P.nodeName.toLowerCase(), B === "select" || B === "input" && P.type === "file") var V = Hp;
          else if (Iu(P)) if (Au) V = qp;
          else {
            V = Wp;
            var q = Vp;
          }
          else (B = P.nodeName) && B.toLowerCase() === "input" && (P.type === "checkbox" || P.type === "radio") && (V = Yp);
          if (V && (V = V(e, I))) {
            Ru(L, V, s, j);
            break e;
          }
          q && q(e, P, I), e === "focusout" && (q = P._wrapperState) && q.controlled && P.type === "number" && ao(P, "number", P.value);
        }
        switch (q = I ? Kn(I) : window, e) {
          case "focusin":
            (Iu(q) || q.contentEditable === "true") && (Yn = q, zo = I, Dr = null);
            break;
          case "focusout":
            Dr = zo = Yn = null;
            break;
          case "mousedown":
            Do = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Do = !1, Du(L, s, j);
            break;
          case "selectionchange":
            if (Kp) break;
          case "keydown":
          case "keyup":
            Du(L, s, j);
        }
        var Q;
        if (Po) e: {
          switch (e) {
            case "compositionstart":
              var X = "onCompositionStart";
              break e;
            case "compositionend":
              X = "onCompositionEnd";
              break e;
            case "compositionupdate":
              X = "onCompositionUpdate";
              break e;
          }
          X = void 0;
        }
        else Wn ? Tu(e, s) && (X = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (X = "onCompositionStart");
        X && (Eu && s.locale !== "ko" && (Wn || X !== "onCompositionStart" ? X === "onCompositionEnd" && Wn && (Q = vu()) : (nn = j, Co = "value" in nn ? nn.value : nn.textContent, Wn = !0)), q = Ws(I, X), 0 < q.length && (X = new Su(X, e, null, s, j), L.push({ event: X, listeners: q }), Q ? X.data = Q : (Q = Cu(s), Q !== null && (X.data = Q)))), (Q = Dp ? Bp(e, s) : Fp(e, s)) && (I = Ws(I, "onBeforeInput"), 0 < I.length && (j = new Su("onBeforeInput", "beforeinput", null, s, j), L.push({ event: j, listeners: I }), j.data = Q));
      }
      qu(L, t);
    });
  }
  function Ur(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function Ws(e, t) {
    for (var s = t + "Capture", o = []; e !== null; ) {
      var l = e, c = l.stateNode;
      l.tag === 5 && c !== null && (l = c, c = xr(e, s), c != null && o.unshift(Ur(e, c, l)), c = xr(e, t), c != null && o.push(Ur(e, c, l))), e = e.return;
    }
    return o;
  }
  function Qn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Gu(e, t, s, o, l) {
    for (var c = t._reactName, h = []; s !== null && s !== o; ) {
      var y = s, w = y.alternate, I = y.stateNode;
      if (w !== null && w === o) break;
      y.tag === 5 && I !== null && (y = I, l ? (w = xr(s, c), w != null && h.unshift(Ur(s, w, y))) : l || (w = xr(s, c), w != null && h.push(Ur(s, w, y)))), s = s.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var em = /\r\n?/g, tm = /\u0000|\uFFFD/g;
  function Ku(e) {
    return (typeof e == "string" ? e : "" + e).replace(em, `
`).replace(tm, "");
  }
  function Ys(e, t, s) {
    if (t = Ku(t), Ku(e) !== t && s) throw Error(i(425));
  }
  function qs() {
  }
  var Vo = null, Wo = null;
  function Yo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var qo = typeof setTimeout == "function" ? setTimeout : void 0, nm = typeof clearTimeout == "function" ? clearTimeout : void 0, Ju = typeof Promise == "function" ? Promise : void 0, rm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ju < "u" ? function(e) {
    return Ju.resolve(null).then(e).catch(sm);
  } : qo;
  function sm(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Qo(e, t) {
    var s = t, o = 0;
    do {
      var l = s.nextSibling;
      if (e.removeChild(s), l && l.nodeType === 8) if (s = l.data, s === "/$") {
        if (o === 0) {
          e.removeChild(l), Mr(t);
          return;
        }
        o--;
      } else s !== "$" && s !== "$?" && s !== "$!" || o++;
      s = l;
    } while (s);
    Mr(t);
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
  function Xu(e) {
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
  var Gn = Math.random().toString(36).slice(2), Nt = "__reactFiber$" + Gn, $r = "__reactProps$" + Gn, Bt = "__reactContainer$" + Gn, Go = "__reactEvents$" + Gn, im = "__reactListeners$" + Gn, om = "__reactHandles$" + Gn;
  function _n(e) {
    var t = e[Nt];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[Bt] || s[Nt]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = Xu(e); e !== null; ) {
          if (s = e[Nt]) return s;
          e = Xu(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Hr(e) {
    return e = e[Nt] || e[Bt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Kn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Qs(e) {
    return e[$r] || null;
  }
  var Ko = [], Jn = -1;
  function on(e) {
    return { current: e };
  }
  function xe(e) {
    0 > Jn || (e.current = Ko[Jn], Ko[Jn] = null, Jn--);
  }
  function _e(e, t) {
    Jn++, Ko[Jn] = e.current, e.current = t;
  }
  var an = {}, Ve = on(an), Ze = on(!1), wn = an;
  function Xn(e, t) {
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
  function Gs() {
    xe(Ze), xe(Ve);
  }
  function Zu(e, t, s) {
    if (Ve.current !== an) throw Error(i(168));
    _e(Ve, t), _e(Ze, s);
  }
  function ec(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, ae(e) || "Unknown", l));
    return D({}, s, o);
  }
  function Ks(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || an, wn = Ve.current, _e(Ve, e), _e(Ze, Ze.current), !0;
  }
  function tc(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = ec(e, t, wn), o.__reactInternalMemoizedMergedChildContext = e, xe(Ze), xe(Ve), _e(Ve, e)) : xe(Ze), _e(Ze, s);
  }
  var Ft = null, Js = !1, Jo = !1;
  function nc(e) {
    Ft === null ? Ft = [e] : Ft.push(e);
  }
  function am(e) {
    Js = !0, nc(e);
  }
  function ln() {
    if (!Jo && Ft !== null) {
      Jo = !0;
      var e = 0, t = ge;
      try {
        var s = Ft;
        for (ge = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Ft = null, Js = !1;
      } catch (l) {
        throw Ft !== null && (Ft = Ft.slice(e + 1)), su(_o, ln), l;
      } finally {
        ge = t, Jo = !1;
      }
    }
    return null;
  }
  var Zn = [], er = 0, Xs = null, Zs = 0, ft = [], ht = 0, Sn = null, Ut = 1, $t = "";
  function xn(e, t) {
    Zn[er++] = Zs, Zn[er++] = Xs, Xs = e, Zs = t;
  }
  function rc(e, t, s) {
    ft[ht++] = Ut, ft[ht++] = $t, ft[ht++] = Sn, Sn = e;
    var o = Ut;
    e = $t;
    var l = 32 - wt(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - wt(t) + l;
    if (30 < c) {
      var h = l - l % 5;
      c = (o & (1 << h) - 1).toString(32), o >>= h, l -= h, Ut = 1 << 32 - wt(t) + l | s << l | o, $t = c + e;
    } else Ut = 1 << c | s << l | o, $t = e;
  }
  function Xo(e) {
    e.return !== null && (xn(e, 1), rc(e, 1, 0));
  }
  function Zo(e) {
    for (; e === Xs; ) Xs = Zn[--er], Zn[er] = null, Zs = Zn[--er], Zn[er] = null;
    for (; e === Sn; ) Sn = ft[--ht], ft[ht] = null, $t = ft[--ht], ft[ht] = null, Ut = ft[--ht], ft[ht] = null;
  }
  var lt = null, ut = null, Ee = !1, xt = null;
  function sc(e, t) {
    var s = yt(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function ic(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, lt = e, ut = sn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, lt = e, ut = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = Sn !== null ? { id: Ut, overflow: $t } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = yt(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, lt = e, ut = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ea(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ta(e) {
    if (Ee) {
      var t = ut;
      if (t) {
        var s = t;
        if (!ic(e, t)) {
          if (ea(e)) throw Error(i(418));
          t = sn(s.nextSibling);
          var o = lt;
          t && ic(e, t) ? sc(o, s) : (e.flags = e.flags & -4097 | 2, Ee = !1, lt = e);
        }
      } else {
        if (ea(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, Ee = !1, lt = e;
      }
    }
  }
  function oc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    lt = e;
  }
  function ei(e) {
    if (e !== lt) return !1;
    if (!Ee) return oc(e), Ee = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Yo(e.type, e.memoizedProps)), t && (t = ut)) {
      if (ea(e)) throw ac(), Error(i(418));
      for (; t; ) sc(e, t), t = sn(t.nextSibling);
    }
    if (oc(e), e.tag === 13) {
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
  function ac() {
    for (var e = ut; e; ) e = sn(e.nextSibling);
  }
  function tr() {
    ut = lt = null, Ee = !1;
  }
  function na(e) {
    xt === null ? xt = [e] : xt.push(e);
  }
  var lm = ye.ReactCurrentBatchConfig;
  function Vr(e, t, s) {
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
  function ti(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function lc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function uc(e) {
    function t(T, x) {
      if (e) {
        var C = T.deletions;
        C === null ? (T.deletions = [x], T.flags |= 16) : C.push(x);
      }
    }
    function s(T, x) {
      if (!e) return null;
      for (; x !== null; ) t(T, x), x = x.sibling;
      return null;
    }
    function o(T, x) {
      for (T = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? T.set(x.key, x) : T.set(x.index, x), x = x.sibling;
      return T;
    }
    function l(T, x) {
      return T = gn(T, x), T.index = 0, T.sibling = null, T;
    }
    function c(T, x, C) {
      return T.index = C, e ? (C = T.alternate, C !== null ? (C = C.index, C < x ? (T.flags |= 2, x) : C) : (T.flags |= 2, x)) : (T.flags |= 1048576, x);
    }
    function h(T) {
      return e && T.alternate === null && (T.flags |= 2), T;
    }
    function y(T, x, C, z) {
      return x === null || x.tag !== 6 ? (x = qa(C, T.mode, z), x.return = T, x) : (x = l(x, C), x.return = T, x);
    }
    function w(T, x, C, z) {
      var V = C.type;
      return V === se ? j(T, x, C.props.children, z, C.key) : x !== null && (x.elementType === V || typeof V == "object" && V !== null && V.$$typeof === pe && lc(V) === x.type) ? (z = l(x, C.props), z.ref = Vr(T, x, C), z.return = T, z) : (z = bi(C.type, C.key, C.props, null, T.mode, z), z.ref = Vr(T, x, C), z.return = T, z);
    }
    function I(T, x, C, z) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== C.containerInfo || x.stateNode.implementation !== C.implementation ? (x = Qa(C, T.mode, z), x.return = T, x) : (x = l(x, C.children || []), x.return = T, x);
    }
    function j(T, x, C, z, V) {
      return x === null || x.tag !== 7 ? (x = An(C, T.mode, z, V), x.return = T, x) : (x = l(x, C), x.return = T, x);
    }
    function L(T, x, C) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = qa("" + x, T.mode, C), x.return = T, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case J:
            return C = bi(x.type, x.key, x.props, null, T.mode, C), C.ref = Vr(T, null, x), C.return = T, C;
          case fe:
            return x = Qa(x, T.mode, C), x.return = T, x;
          case pe:
            var z = x._init;
            return L(T, z(x._payload), C);
        }
        if (_r(x) || W(x)) return x = An(x, T.mode, C, null), x.return = T, x;
        ti(T, x);
      }
      return null;
    }
    function P(T, x, C, z) {
      var V = x !== null ? x.key : null;
      if (typeof C == "string" && C !== "" || typeof C == "number") return V !== null ? null : y(T, x, "" + C, z);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case J:
            return C.key === V ? w(T, x, C, z) : null;
          case fe:
            return C.key === V ? I(T, x, C, z) : null;
          case pe:
            return V = C._init, P(
              T,
              x,
              V(C._payload),
              z
            );
        }
        if (_r(C) || W(C)) return V !== null ? null : j(T, x, C, z, null);
        ti(T, C);
      }
      return null;
    }
    function B(T, x, C, z, V) {
      if (typeof z == "string" && z !== "" || typeof z == "number") return T = T.get(C) || null, y(x, T, "" + z, V);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case J:
            return T = T.get(z.key === null ? C : z.key) || null, w(x, T, z, V);
          case fe:
            return T = T.get(z.key === null ? C : z.key) || null, I(x, T, z, V);
          case pe:
            var q = z._init;
            return B(T, x, C, q(z._payload), V);
        }
        if (_r(z) || W(z)) return T = T.get(C) || null, j(x, T, z, V, null);
        ti(x, z);
      }
      return null;
    }
    function U(T, x, C, z) {
      for (var V = null, q = null, Q = x, X = x = 0, Be = null; Q !== null && X < C.length; X++) {
        Q.index > X ? (Be = Q, Q = null) : Be = Q.sibling;
        var ce = P(T, Q, C[X], z);
        if (ce === null) {
          Q === null && (Q = Be);
          break;
        }
        e && Q && ce.alternate === null && t(T, Q), x = c(ce, x, X), q === null ? V = ce : q.sibling = ce, q = ce, Q = Be;
      }
      if (X === C.length) return s(T, Q), Ee && xn(T, X), V;
      if (Q === null) {
        for (; X < C.length; X++) Q = L(T, C[X], z), Q !== null && (x = c(Q, x, X), q === null ? V = Q : q.sibling = Q, q = Q);
        return Ee && xn(T, X), V;
      }
      for (Q = o(T, Q); X < C.length; X++) Be = B(Q, T, X, C[X], z), Be !== null && (e && Be.alternate !== null && Q.delete(Be.key === null ? X : Be.key), x = c(Be, x, X), q === null ? V = Be : q.sibling = Be, q = Be);
      return e && Q.forEach(function(yn) {
        return t(T, yn);
      }), Ee && xn(T, X), V;
    }
    function H(T, x, C, z) {
      var V = W(C);
      if (typeof V != "function") throw Error(i(150));
      if (C = V.call(C), C == null) throw Error(i(151));
      for (var q = V = null, Q = x, X = x = 0, Be = null, ce = C.next(); Q !== null && !ce.done; X++, ce = C.next()) {
        Q.index > X ? (Be = Q, Q = null) : Be = Q.sibling;
        var yn = P(T, Q, ce.value, z);
        if (yn === null) {
          Q === null && (Q = Be);
          break;
        }
        e && Q && yn.alternate === null && t(T, Q), x = c(yn, x, X), q === null ? V = yn : q.sibling = yn, q = yn, Q = Be;
      }
      if (ce.done) return s(
        T,
        Q
      ), Ee && xn(T, X), V;
      if (Q === null) {
        for (; !ce.done; X++, ce = C.next()) ce = L(T, ce.value, z), ce !== null && (x = c(ce, x, X), q === null ? V = ce : q.sibling = ce, q = ce);
        return Ee && xn(T, X), V;
      }
      for (Q = o(T, Q); !ce.done; X++, ce = C.next()) ce = B(Q, T, X, ce.value, z), ce !== null && (e && ce.alternate !== null && Q.delete(ce.key === null ? X : ce.key), x = c(ce, x, X), q === null ? V = ce : q.sibling = ce, q = ce);
      return e && Q.forEach(function(Um) {
        return t(T, Um);
      }), Ee && xn(T, X), V;
    }
    function Ne(T, x, C, z) {
      if (typeof C == "object" && C !== null && C.type === se && C.key === null && (C = C.props.children), typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case J:
            e: {
              for (var V = C.key, q = x; q !== null; ) {
                if (q.key === V) {
                  if (V = C.type, V === se) {
                    if (q.tag === 7) {
                      s(T, q.sibling), x = l(q, C.props.children), x.return = T, T = x;
                      break e;
                    }
                  } else if (q.elementType === V || typeof V == "object" && V !== null && V.$$typeof === pe && lc(V) === q.type) {
                    s(T, q.sibling), x = l(q, C.props), x.ref = Vr(T, q, C), x.return = T, T = x;
                    break e;
                  }
                  s(T, q);
                  break;
                } else t(T, q);
                q = q.sibling;
              }
              C.type === se ? (x = An(C.props.children, T.mode, z, C.key), x.return = T, T = x) : (z = bi(C.type, C.key, C.props, null, T.mode, z), z.ref = Vr(T, x, C), z.return = T, T = z);
            }
            return h(T);
          case fe:
            e: {
              for (q = C.key; x !== null; ) {
                if (x.key === q) if (x.tag === 4 && x.stateNode.containerInfo === C.containerInfo && x.stateNode.implementation === C.implementation) {
                  s(T, x.sibling), x = l(x, C.children || []), x.return = T, T = x;
                  break e;
                } else {
                  s(T, x);
                  break;
                }
                else t(T, x);
                x = x.sibling;
              }
              x = Qa(C, T.mode, z), x.return = T, T = x;
            }
            return h(T);
          case pe:
            return q = C._init, Ne(T, x, q(C._payload), z);
        }
        if (_r(C)) return U(T, x, C, z);
        if (W(C)) return H(T, x, C, z);
        ti(T, C);
      }
      return typeof C == "string" && C !== "" || typeof C == "number" ? (C = "" + C, x !== null && x.tag === 6 ? (s(T, x.sibling), x = l(x, C), x.return = T, T = x) : (s(T, x), x = qa(C, T.mode, z), x.return = T, T = x), h(T)) : s(T, x);
    }
    return Ne;
  }
  var nr = uc(!0), cc = uc(!1), ni = on(null), ri = null, rr = null, ra = null;
  function sa() {
    ra = rr = ri = null;
  }
  function ia(e) {
    var t = ni.current;
    xe(ni), e._currentValue = t;
  }
  function oa(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function sr(e, t) {
    ri = e, ra = rr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (tt = !0), e.firstContext = null);
  }
  function pt(e) {
    var t = e._currentValue;
    if (ra !== e) if (e = { context: e, memoizedValue: t, next: null }, rr === null) {
      if (ri === null) throw Error(i(308));
      rr = e, ri.dependencies = { lanes: 0, firstContext: e };
    } else rr = rr.next = e;
    return t;
  }
  var En = null;
  function aa(e) {
    En === null ? En = [e] : En.push(e);
  }
  function dc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, aa(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Ht(e, o);
  }
  function Ht(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var un = !1;
  function la(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function fc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Vt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function cn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (le & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Ht(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, aa(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Ht(e, s);
  }
  function si(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, xo(e, s);
    }
  }
  function hc(e, t) {
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
  function ii(e, t, s, o) {
    var l = e.updateQueue;
    un = !1;
    var c = l.firstBaseUpdate, h = l.lastBaseUpdate, y = l.shared.pending;
    if (y !== null) {
      l.shared.pending = null;
      var w = y, I = w.next;
      w.next = null, h === null ? c = I : h.next = I, h = w;
      var j = e.alternate;
      j !== null && (j = j.updateQueue, y = j.lastBaseUpdate, y !== h && (y === null ? j.firstBaseUpdate = I : y.next = I, j.lastBaseUpdate = w));
    }
    if (c !== null) {
      var L = l.baseState;
      h = 0, j = I = w = null, y = c;
      do {
        var P = y.lane, B = y.eventTime;
        if ((o & P) === P) {
          j !== null && (j = j.next = {
            eventTime: B,
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          });
          e: {
            var U = e, H = y;
            switch (P = t, B = s, H.tag) {
              case 1:
                if (U = H.payload, typeof U == "function") {
                  L = U.call(B, L, P);
                  break e;
                }
                L = U;
                break e;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = H.payload, P = typeof U == "function" ? U.call(B, L, P) : U, P == null) break e;
                L = D({}, L, P);
                break e;
              case 2:
                un = !0;
            }
          }
          y.callback !== null && y.lane !== 0 && (e.flags |= 64, P = l.effects, P === null ? l.effects = [y] : P.push(y));
        } else B = { eventTime: B, lane: P, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, j === null ? (I = j = B, w = L) : j = j.next = B, h |= P;
        if (y = y.next, y === null) {
          if (y = l.shared.pending, y === null) break;
          P = y, y = P.next, P.next = null, l.lastBaseUpdate = P, l.shared.pending = null;
        }
      } while (!0);
      if (j === null && (w = L), l.baseState = w, l.firstBaseUpdate = I, l.lastBaseUpdate = j, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          h |= l.lane, l = l.next;
        while (l !== t);
      } else c === null && (l.shared.lanes = 0);
      Tn |= h, e.lanes = h, e.memoizedState = L;
    }
  }
  function pc(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = s, typeof l != "function") throw Error(i(191, l));
        l.call(o);
      }
    }
  }
  var Wr = {}, Pt = on(Wr), Yr = on(Wr), qr = on(Wr);
  function kn(e) {
    if (e === Wr) throw Error(i(174));
    return e;
  }
  function ua(e, t) {
    switch (_e(qr, t), _e(Yr, e), _e(Pt, Wr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : uo(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = uo(t, e);
    }
    xe(Pt), _e(Pt, t);
  }
  function ir() {
    xe(Pt), xe(Yr), xe(qr);
  }
  function mc(e) {
    kn(qr.current);
    var t = kn(Pt.current), s = uo(t, e.type);
    t !== s && (_e(Yr, e), _e(Pt, s));
  }
  function ca(e) {
    Yr.current === e && (xe(Pt), xe(Yr));
  }
  var ke = on(0);
  function oi(e) {
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
  var da = [];
  function fa() {
    for (var e = 0; e < da.length; e++) da[e]._workInProgressVersionPrimary = null;
    da.length = 0;
  }
  var ai = ye.ReactCurrentDispatcher, ha = ye.ReactCurrentBatchConfig, bn = 0, be = null, je = null, ze = null, li = !1, Qr = !1, Gr = 0, um = 0;
  function We() {
    throw Error(i(321));
  }
  function pa(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!St(e[s], t[s])) return !1;
    return !0;
  }
  function ma(e, t, s, o, l, c) {
    if (bn = c, be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ai.current = e === null || e.memoizedState === null ? hm : pm, e = s(o, l), Qr) {
      c = 0;
      do {
        if (Qr = !1, Gr = 0, 25 <= c) throw Error(i(301));
        c += 1, ze = je = null, t.updateQueue = null, ai.current = mm, e = s(o, l);
      } while (Qr);
    }
    if (ai.current = di, t = je !== null && je.next !== null, bn = 0, ze = je = be = null, li = !1, t) throw Error(i(300));
    return e;
  }
  function ga() {
    var e = Gr !== 0;
    return Gr = 0, e;
  }
  function jt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ze === null ? be.memoizedState = ze = e : ze = ze.next = e, ze;
  }
  function mt() {
    if (je === null) {
      var e = be.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = ze === null ? be.memoizedState : ze.next;
    if (t !== null) ze = t, je = e;
    else {
      if (e === null) throw Error(i(310));
      je = e, e = { memoizedState: je.memoizedState, baseState: je.baseState, baseQueue: je.baseQueue, queue: je.queue, next: null }, ze === null ? be.memoizedState = ze = e : ze = ze.next = e;
    }
    return ze;
  }
  function Kr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ya(e) {
    var t = mt(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = je, l = o.baseQueue, c = s.pending;
    if (c !== null) {
      if (l !== null) {
        var h = l.next;
        l.next = c.next, c.next = h;
      }
      o.baseQueue = l = c, s.pending = null;
    }
    if (l !== null) {
      c = l.next, o = o.baseState;
      var y = h = null, w = null, I = c;
      do {
        var j = I.lane;
        if ((bn & j) === j) w !== null && (w = w.next = { lane: 0, action: I.action, hasEagerState: I.hasEagerState, eagerState: I.eagerState, next: null }), o = I.hasEagerState ? I.eagerState : e(o, I.action);
        else {
          var L = {
            lane: j,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          };
          w === null ? (y = w = L, h = o) : w = w.next = L, be.lanes |= j, Tn |= j;
        }
        I = I.next;
      } while (I !== null && I !== c);
      w === null ? h = o : w.next = y, St(o, t.memoizedState) || (tt = !0), t.memoizedState = o, t.baseState = h, t.baseQueue = w, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, be.lanes |= c, Tn |= c, l = l.next;
      while (l !== e);
    } else l === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function va(e) {
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
  function gc() {
  }
  function yc(e, t) {
    var s = be, o = mt(), l = t(), c = !St(o.memoizedState, l);
    if (c && (o.memoizedState = l, tt = !0), o = o.queue, _a(wc.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || ze !== null && ze.memoizedState.tag & 1) {
      if (s.flags |= 2048, Jr(9, _c.bind(null, s, o, l, t), void 0, null), De === null) throw Error(i(349));
      (bn & 30) !== 0 || vc(s, t, l);
    }
    return l;
  }
  function vc(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = be.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, be.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function _c(e, t, s, o) {
    t.value = s, t.getSnapshot = o, Sc(t) && xc(e);
  }
  function wc(e, t, s) {
    return s(function() {
      Sc(t) && xc(e);
    });
  }
  function Sc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !St(e, s);
    } catch {
      return !0;
    }
  }
  function xc(e) {
    var t = Ht(e, 1);
    t !== null && Tt(t, e, 1, -1);
  }
  function Ec(e) {
    var t = jt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Kr, lastRenderedState: e }, t.queue = e, e = e.dispatch = fm.bind(null, be, e), [t.memoizedState, e];
  }
  function Jr(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = be.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, be.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function kc() {
    return mt().memoizedState;
  }
  function ui(e, t, s, o) {
    var l = jt();
    be.flags |= e, l.memoizedState = Jr(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function ci(e, t, s, o) {
    var l = mt();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (je !== null) {
      var h = je.memoizedState;
      if (c = h.destroy, o !== null && pa(o, h.deps)) {
        l.memoizedState = Jr(t, s, c, o);
        return;
      }
    }
    be.flags |= e, l.memoizedState = Jr(1 | t, s, c, o);
  }
  function bc(e, t) {
    return ui(8390656, 8, e, t);
  }
  function _a(e, t) {
    return ci(2048, 8, e, t);
  }
  function Tc(e, t) {
    return ci(4, 2, e, t);
  }
  function Cc(e, t) {
    return ci(4, 4, e, t);
  }
  function Ic(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Rc(e, t, s) {
    return s = s != null ? s.concat([e]) : null, ci(4, 4, Ic.bind(null, t, e), s);
  }
  function wa() {
  }
  function Ac(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && pa(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function Mc(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && pa(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function Nc(e, t, s) {
    return (bn & 21) === 0 ? (e.baseState && (e.baseState = !1, tt = !0), e.memoizedState = s) : (St(s, t) || (s = lu(), be.lanes |= s, Tn |= s, e.baseState = !0), t);
  }
  function cm(e, t) {
    var s = ge;
    ge = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = ha.transition;
    ha.transition = {};
    try {
      e(!1), t();
    } finally {
      ge = s, ha.transition = o;
    }
  }
  function Pc() {
    return mt().memoizedState;
  }
  function dm(e, t, s) {
    var o = pn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, jc(e)) Lc(t, s);
    else if (s = dc(e, t, s, o), s !== null) {
      var l = Ke();
      Tt(s, e, o, l), Oc(s, t, o);
    }
  }
  function fm(e, t, s) {
    var o = pn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (jc(e)) Lc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var h = t.lastRenderedState, y = c(h, s);
        if (l.hasEagerState = !0, l.eagerState = y, St(y, h)) {
          var w = t.interleaved;
          w === null ? (l.next = l, aa(t)) : (l.next = w.next, w.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = dc(e, t, l, o), s !== null && (l = Ke(), Tt(s, e, o, l), Oc(s, t, o));
    }
  }
  function jc(e) {
    var t = e.alternate;
    return e === be || t !== null && t === be;
  }
  function Lc(e, t) {
    Qr = li = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Oc(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, xo(e, s);
    }
  }
  var di = { readContext: pt, useCallback: We, useContext: We, useEffect: We, useImperativeHandle: We, useInsertionEffect: We, useLayoutEffect: We, useMemo: We, useReducer: We, useRef: We, useState: We, useDebugValue: We, useDeferredValue: We, useTransition: We, useMutableSource: We, useSyncExternalStore: We, useId: We, unstable_isNewReconciler: !1 }, hm = { readContext: pt, useCallback: function(e, t) {
    return jt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: pt, useEffect: bc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, ui(
      4194308,
      4,
      Ic.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return ui(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ui(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = jt();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = jt();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = dm.bind(null, be, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = jt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Ec, useDebugValue: wa, useDeferredValue: function(e) {
    return jt().memoizedState = e;
  }, useTransition: function() {
    var e = Ec(!1), t = e[0];
    return e = cm.bind(null, e[1]), jt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = be, l = jt();
    if (Ee) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), De === null) throw Error(i(349));
      (bn & 30) !== 0 || vc(o, t, s);
    }
    l.memoizedState = s;
    var c = { value: s, getSnapshot: t };
    return l.queue = c, bc(wc.bind(
      null,
      o,
      c,
      e
    ), [e]), o.flags |= 2048, Jr(9, _c.bind(null, o, c, s, t), void 0, null), s;
  }, useId: function() {
    var e = jt(), t = De.identifierPrefix;
    if (Ee) {
      var s = $t, o = Ut;
      s = (o & ~(1 << 32 - wt(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = Gr++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = um++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, pm = {
    readContext: pt,
    useCallback: Ac,
    useContext: pt,
    useEffect: _a,
    useImperativeHandle: Rc,
    useInsertionEffect: Tc,
    useLayoutEffect: Cc,
    useMemo: Mc,
    useReducer: ya,
    useRef: kc,
    useState: function() {
      return ya(Kr);
    },
    useDebugValue: wa,
    useDeferredValue: function(e) {
      var t = mt();
      return Nc(t, je.memoizedState, e);
    },
    useTransition: function() {
      var e = ya(Kr)[0], t = mt().memoizedState;
      return [e, t];
    },
    useMutableSource: gc,
    useSyncExternalStore: yc,
    useId: Pc,
    unstable_isNewReconciler: !1
  }, mm = { readContext: pt, useCallback: Ac, useContext: pt, useEffect: _a, useImperativeHandle: Rc, useInsertionEffect: Tc, useLayoutEffect: Cc, useMemo: Mc, useReducer: va, useRef: kc, useState: function() {
    return va(Kr);
  }, useDebugValue: wa, useDeferredValue: function(e) {
    var t = mt();
    return je === null ? t.memoizedState = e : Nc(t, je.memoizedState, e);
  }, useTransition: function() {
    var e = va(Kr)[0], t = mt().memoizedState;
    return [e, t];
  }, useMutableSource: gc, useSyncExternalStore: yc, useId: Pc, unstable_isNewReconciler: !1 };
  function Et(e, t) {
    if (e && e.defaultProps) {
      t = D({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function Sa(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : D({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var fi = { isMounted: function(e) {
    return (e = e._reactInternals) ? vn(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = Ke(), l = pn(e), c = Vt(o, l);
    c.payload = t, s != null && (c.callback = s), t = cn(e, c, l), t !== null && (Tt(t, e, l, o), si(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = Ke(), l = pn(e), c = Vt(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = cn(e, c, l), t !== null && (Tt(t, e, l, o), si(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = Ke(), o = pn(e), l = Vt(s, o);
    l.tag = 2, t != null && (l.callback = t), t = cn(e, l, o), t !== null && (Tt(t, e, o, s), si(t, e, o));
  } };
  function zc(e, t, s, o, l, c, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, h) : t.prototype && t.prototype.isPureReactComponent ? !zr(s, o) || !zr(l, c) : !0;
  }
  function Dc(e, t, s) {
    var o = !1, l = an, c = t.contextType;
    return typeof c == "object" && c !== null ? c = pt(c) : (l = et(t) ? wn : Ve.current, o = t.contextTypes, c = (o = o != null) ? Xn(e, l) : an), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = fi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Bc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && fi.enqueueReplaceState(t, t.state, null);
  }
  function xa(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, la(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = pt(c) : (c = et(t) ? wn : Ve.current, l.context = Xn(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Sa(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && fi.enqueueReplaceState(l, l.state, null), ii(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function or(e, t) {
    try {
      var s = "", o = t;
      do
        s += ie(o), o = o.return;
      while (o);
      var l = s;
    } catch (c) {
      l = `
Error generating stack: ` + c.message + `
` + c.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function Ea(e, t, s) {
    return { value: e, source: null, stack: s ?? null, digest: t ?? null };
  }
  function ka(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var gm = typeof WeakMap == "function" ? WeakMap : Map;
  function Fc(e, t, s) {
    s = Vt(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      _i || (_i = !0, Ba = o), ka(e, t);
    }, s;
  }
  function Uc(e, t, s) {
    s = Vt(-1, s), s.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var l = t.value;
      s.payload = function() {
        return o(l);
      }, s.callback = function() {
        ka(e, t);
      };
    }
    var c = e.stateNode;
    return c !== null && typeof c.componentDidCatch == "function" && (s.callback = function() {
      ka(e, t), typeof o != "function" && (fn === null ? fn = /* @__PURE__ */ new Set([this]) : fn.add(this));
      var h = t.stack;
      this.componentDidCatch(t.value, { componentStack: h !== null ? h : "" });
    }), s;
  }
  function $c(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new gm();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = Am.bind(null, e, t, s), t.then(e, e));
  }
  function Hc(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Vc(e, t, s, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = Vt(-1, 1), t.tag = 2, cn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var ym = ye.ReactCurrentOwner, tt = !1;
  function Ge(e, t, s, o) {
    t.child = e === null ? cc(t, null, s, o) : nr(t, e.child, s, o);
  }
  function Wc(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return sr(t, l), o = ma(e, t, s, o, c, l), s = ga(), e !== null && !tt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Wt(e, t, l)) : (Ee && s && Xo(t), t.flags |= 1, Ge(e, t, o, l), t.child);
  }
  function Yc(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !Ya(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, qc(e, t, c, o, l)) : (e = bi(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var h = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : zr, s(h, o) && e.ref === t.ref) return Wt(e, t, l);
    }
    return t.flags |= 1, e = gn(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function qc(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (zr(c, o) && e.ref === t.ref) if (tt = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (tt = !0);
      else return t.lanes = e.lanes, Wt(e, t, l);
    }
    return ba(e, t, s, o, l);
  }
  function Qc(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _e(lr, ct), ct |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, _e(lr, ct), ct |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, _e(lr, ct), ct |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, _e(lr, ct), ct |= o;
    return Ge(e, t, l, s), t.child;
  }
  function Gc(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ba(e, t, s, o, l) {
    var c = et(s) ? wn : Ve.current;
    return c = Xn(t, c), sr(t, l), s = ma(e, t, s, o, c, l), o = ga(), e !== null && !tt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Wt(e, t, l)) : (Ee && o && Xo(t), t.flags |= 1, Ge(e, t, s, l), t.child);
  }
  function Kc(e, t, s, o, l) {
    if (et(s)) {
      var c = !0;
      Ks(t);
    } else c = !1;
    if (sr(t, l), t.stateNode === null) pi(e, t), Dc(t, s, o), xa(t, s, o, l), o = !0;
    else if (e === null) {
      var h = t.stateNode, y = t.memoizedProps;
      h.props = y;
      var w = h.context, I = s.contextType;
      typeof I == "object" && I !== null ? I = pt(I) : (I = et(s) ? wn : Ve.current, I = Xn(t, I));
      var j = s.getDerivedStateFromProps, L = typeof j == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      L || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== o || w !== I) && Bc(t, h, o, I), un = !1;
      var P = t.memoizedState;
      h.state = P, ii(t, o, h, l), w = t.memoizedState, y !== o || P !== w || Ze.current || un ? (typeof j == "function" && (Sa(t, s, j, o), w = t.memoizedState), (y = un || zc(t, s, y, o, P, w, I)) ? (L || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = w), h.props = o, h.state = w, h.context = I, o = y) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      h = t.stateNode, fc(e, t), y = t.memoizedProps, I = t.type === t.elementType ? y : Et(t.type, y), h.props = I, L = t.pendingProps, P = h.context, w = s.contextType, typeof w == "object" && w !== null ? w = pt(w) : (w = et(s) ? wn : Ve.current, w = Xn(t, w));
      var B = s.getDerivedStateFromProps;
      (j = typeof B == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== L || P !== w) && Bc(t, h, o, w), un = !1, P = t.memoizedState, h.state = P, ii(t, o, h, l);
      var U = t.memoizedState;
      y !== L || P !== U || Ze.current || un ? (typeof B == "function" && (Sa(t, s, B, o), U = t.memoizedState), (I = un || zc(t, s, I, o, P, U, w) || !1) ? (j || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, U, w), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, U, w)), typeof h.componentDidUpdate == "function" && (t.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = U), h.props = o, h.state = U, h.context = w, o = I) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Ta(e, t, s, o, c, l);
  }
  function Ta(e, t, s, o, l, c) {
    Gc(e, t);
    var h = (t.flags & 128) !== 0;
    if (!o && !h) return l && tc(t, s, !1), Wt(e, t, c);
    o = t.stateNode, ym.current = t;
    var y = h && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && h ? (t.child = nr(t, e.child, null, c), t.child = nr(t, null, y, c)) : Ge(e, t, y, c), t.memoizedState = o.state, l && tc(t, s, !0), t.child;
  }
  function Jc(e) {
    var t = e.stateNode;
    t.pendingContext ? Zu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zu(e, t.context, !1), ua(e, t.containerInfo);
  }
  function Xc(e, t, s, o, l) {
    return tr(), na(l), t.flags |= 256, Ge(e, t, s, o), t.child;
  }
  var Ca = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ia(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Zc(e, t, s) {
    var o = t.pendingProps, l = ke.current, c = !1, h = (t.flags & 128) !== 0, y;
    if ((y = h) || (y = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), y ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), _e(ke, l & 1), e === null)
      return ta(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (h = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, h = { mode: "hidden", children: h }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = h) : c = Ti(h, o, 0, null), e = An(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = Ia(s), t.memoizedState = Ca, e) : Ra(t, h));
    if (l = e.memoizedState, l !== null && (y = l.dehydrated, y !== null)) return vm(e, t, h, o, y, l, s);
    if (c) {
      c = o.fallback, h = t.mode, l = e.child, y = l.sibling;
      var w = { mode: "hidden", children: o.children };
      return (h & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = w, t.deletions = null) : (o = gn(l, w), o.subtreeFlags = l.subtreeFlags & 14680064), y !== null ? c = gn(y, c) : (c = An(c, h, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, h = e.child.memoizedState, h = h === null ? Ia(s) : { baseLanes: h.baseLanes | s, cachePool: null, transitions: h.transitions }, c.memoizedState = h, c.childLanes = e.childLanes & ~s, t.memoizedState = Ca, o;
    }
    return c = e.child, e = c.sibling, o = gn(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Ra(e, t) {
    return t = Ti({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function hi(e, t, s, o) {
    return o !== null && na(o), nr(t, e.child, null, s), e = Ra(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function vm(e, t, s, o, l, c, h) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = Ea(Error(i(422))), hi(e, t, h, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Ti({ mode: "visible", children: o.children }, l, 0, null), c = An(c, l, h, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && nr(t, e.child, null, h), t.child.memoizedState = Ia(h), t.memoizedState = Ca, c);
    if ((t.mode & 1) === 0) return hi(e, t, h, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var y = o.dgst;
      return o = y, c = Error(i(419)), o = Ea(c, o, void 0), hi(e, t, h, o);
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
        l = (l & (o.suspendedLanes | h)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Ht(e, l), Tt(o, e, l, -1));
      }
      return Wa(), o = Ea(Error(i(421))), hi(e, t, h, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Mm.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, ut = sn(l.nextSibling), lt = t, Ee = !0, xt = null, e !== null && (ft[ht++] = Ut, ft[ht++] = $t, ft[ht++] = Sn, Ut = e.id, $t = e.overflow, Sn = t), t = Ra(t, o.children), t.flags |= 4096, t);
  }
  function ed(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), oa(e.return, t, s);
  }
  function Aa(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function td(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (Ge(e, t, o.children, s), o = ke.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ed(e, s, t);
        else if (e.tag === 19) ed(e, s, t);
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
    if (_e(ke, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (s = t.child, l = null; s !== null; ) e = s.alternate, e !== null && oi(e) === null && (l = s), s = s.sibling;
        s = l, s === null ? (l = t.child, t.child = null) : (l = s.sibling, s.sibling = null), Aa(t, !1, l, s, c);
        break;
      case "backwards":
        for (s = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && oi(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = s, s = l, l = e;
        }
        Aa(t, !0, s, null, c);
        break;
      case "together":
        Aa(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function pi(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Wt(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), Tn |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = gn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = gn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function _m(e, t, s) {
    switch (t.tag) {
      case 3:
        Jc(t), tr();
        break;
      case 5:
        mc(t);
        break;
      case 1:
        et(t.type) && Ks(t);
        break;
      case 4:
        ua(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        _e(ni, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (_e(ke, ke.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? Zc(e, t, s) : (_e(ke, ke.current & 1), e = Wt(e, t, s), e !== null ? e.sibling : null);
        _e(ke, ke.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return td(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), _e(ke, ke.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Qc(e, t, s);
    }
    return Wt(e, t, s);
  }
  var nd, Ma, rd, sd;
  nd = function(e, t) {
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
  }, Ma = function() {
  }, rd = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, kn(Pt.current);
      var c = null;
      switch (s) {
        case "input":
          l = io(e, l), o = io(e, o), c = [];
          break;
        case "select":
          l = D({}, l, { value: void 0 }), o = D({}, o, { value: void 0 }), c = [];
          break;
        case "textarea":
          l = lo(e, l), o = lo(e, o), c = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = qs);
      }
      co(s, o);
      var h;
      s = null;
      for (I in l) if (!o.hasOwnProperty(I) && l.hasOwnProperty(I) && l[I] != null) if (I === "style") {
        var y = l[I];
        for (h in y) y.hasOwnProperty(h) && (s || (s = {}), s[h] = "");
      } else I !== "dangerouslySetInnerHTML" && I !== "children" && I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && I !== "autoFocus" && (u.hasOwnProperty(I) ? c || (c = []) : (c = c || []).push(I, null));
      for (I in o) {
        var w = o[I];
        if (y = l?.[I], o.hasOwnProperty(I) && w !== y && (w != null || y != null)) if (I === "style") if (y) {
          for (h in y) !y.hasOwnProperty(h) || w && w.hasOwnProperty(h) || (s || (s = {}), s[h] = "");
          for (h in w) w.hasOwnProperty(h) && y[h] !== w[h] && (s || (s = {}), s[h] = w[h]);
        } else s || (c || (c = []), c.push(
          I,
          s
        )), s = w;
        else I === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, y = y ? y.__html : void 0, w != null && y !== w && (c = c || []).push(I, w)) : I === "children" ? typeof w != "string" && typeof w != "number" || (c = c || []).push(I, "" + w) : I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && (u.hasOwnProperty(I) ? (w != null && I === "onScroll" && Se("scroll", e), c || y === w || (c = [])) : (c = c || []).push(I, w));
      }
      s && (c = c || []).push("style", s);
      var I = c;
      (t.updateQueue = I) && (t.flags |= 4);
    }
  }, sd = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function Xr(e, t) {
    if (!Ee) switch (e.tailMode) {
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
  function Ye(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = s, t;
  }
  function wm(e, t, s) {
    var o = t.pendingProps;
    switch (Zo(t), t.tag) {
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
        return Ye(t), null;
      case 1:
        return et(t.type) && Gs(), Ye(t), null;
      case 3:
        return o = t.stateNode, ir(), xe(Ze), xe(Ve), fa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (ei(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, xt !== null && ($a(xt), xt = null))), Ma(e, t), Ye(t), null;
      case 5:
        ca(t);
        var l = kn(qr.current);
        if (s = t.type, e !== null && t.stateNode != null) rd(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return Ye(t), null;
          }
          if (e = kn(Pt.current), ei(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[Nt] = t, o[$r] = c, e = (t.mode & 1) !== 0, s) {
              case "dialog":
                Se("cancel", o), Se("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Se("load", o);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Br.length; l++) Se(Br[l], o);
                break;
              case "source":
                Se("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Se(
                  "error",
                  o
                ), Se("load", o);
                break;
              case "details":
                Se("toggle", o);
                break;
              case "input":
                Dl(o, c), Se("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, Se("invalid", o);
                break;
              case "textarea":
                Ul(o, c), Se("invalid", o);
            }
            co(s, c), l = null;
            for (var h in c) if (c.hasOwnProperty(h)) {
              var y = c[h];
              h === "children" ? typeof y == "string" ? o.textContent !== y && (c.suppressHydrationWarning !== !0 && Ys(o.textContent, y, e), l = ["children", y]) : typeof y == "number" && o.textContent !== "" + y && (c.suppressHydrationWarning !== !0 && Ys(
                o.textContent,
                y,
                e
              ), l = ["children", "" + y]) : u.hasOwnProperty(h) && y != null && h === "onScroll" && Se("scroll", o);
            }
            switch (s) {
              case "input":
                Es(o), Fl(o, c, !0);
                break;
              case "textarea":
                Es(o), Hl(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = qs);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            h = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Vl(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = h.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = h.createElement(s, { is: o.is }) : (e = h.createElement(s), s === "select" && (h = e, o.multiple ? h.multiple = !0 : o.size && (h.size = o.size))) : e = h.createElementNS(e, s), e[Nt] = t, e[$r] = o, nd(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (h = fo(s, o), s) {
                case "dialog":
                  Se("cancel", e), Se("close", e), l = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Se("load", e), l = o;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < Br.length; l++) Se(Br[l], e);
                  l = o;
                  break;
                case "source":
                  Se("error", e), l = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Se(
                    "error",
                    e
                  ), Se("load", e), l = o;
                  break;
                case "details":
                  Se("toggle", e), l = o;
                  break;
                case "input":
                  Dl(e, o), l = io(e, o), Se("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = D({}, o, { value: void 0 }), Se("invalid", e);
                  break;
                case "textarea":
                  Ul(e, o), l = lo(e, o), Se("invalid", e);
                  break;
                default:
                  l = o;
              }
              co(s, l), y = l;
              for (c in y) if (y.hasOwnProperty(c)) {
                var w = y[c];
                c === "style" ? ql(e, w) : c === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, w != null && Wl(e, w)) : c === "children" ? typeof w == "string" ? (s !== "textarea" || w !== "") && wr(e, w) : typeof w == "number" && wr(e, "" + w) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? w != null && c === "onScroll" && Se("scroll", e) : w != null && de(e, c, w, h));
              }
              switch (s) {
                case "input":
                  Es(e), Fl(e, o, !1);
                  break;
                case "textarea":
                  Es(e), Hl(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ne(o.value));
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
                  typeof l.onClick == "function" && (e.onclick = qs);
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
        return Ye(t), null;
      case 6:
        if (e && t.stateNode != null) sd(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = kn(qr.current), kn(Pt.current), ei(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[Nt] = t, (c = o.nodeValue !== s) && (e = lt, e !== null)) switch (e.tag) {
              case 3:
                Ys(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Ys(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[Nt] = t, t.stateNode = o;
        }
        return Ye(t), null;
      case 13:
        if (xe(ke), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Ee && ut !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) ac(), tr(), t.flags |= 98560, c = !1;
          else if (c = ei(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[Nt] = t;
            } else tr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ye(t), c = !1;
          } else xt !== null && ($a(xt), xt = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ke.current & 1) !== 0 ? Le === 0 && (Le = 3) : Wa())), t.updateQueue !== null && (t.flags |= 4), Ye(t), null);
      case 4:
        return ir(), Ma(e, t), e === null && Fr(t.stateNode.containerInfo), Ye(t), null;
      case 10:
        return ia(t.type._context), Ye(t), null;
      case 17:
        return et(t.type) && Gs(), Ye(t), null;
      case 19:
        if (xe(ke), c = t.memoizedState, c === null) return Ye(t), null;
        if (o = (t.flags & 128) !== 0, h = c.rendering, h === null) if (o) Xr(c, !1);
        else {
          if (Le !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (h = oi(e), h !== null) {
              for (t.flags |= 128, Xr(c, !1), o = h.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, h = c.alternate, h === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = h.childLanes, c.lanes = h.lanes, c.child = h.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = h.memoizedProps, c.memoizedState = h.memoizedState, c.updateQueue = h.updateQueue, c.type = h.type, e = h.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return _e(ke, ke.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && Me() > ur && (t.flags |= 128, o = !0, Xr(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = oi(h), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), Xr(c, !0), c.tail === null && c.tailMode === "hidden" && !h.alternate && !Ee) return Ye(t), null;
          } else 2 * Me() - c.renderingStartTime > ur && s !== 1073741824 && (t.flags |= 128, o = !0, Xr(c, !1), t.lanes = 4194304);
          c.isBackwards ? (h.sibling = t.child, t.child = h) : (s = c.last, s !== null ? s.sibling = h : t.child = h, c.last = h);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = Me(), t.sibling = null, s = ke.current, _e(ke, o ? s & 1 | 2 : s & 1), t) : (Ye(t), null);
      case 22:
      case 23:
        return Va(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (ct & 1073741824) !== 0 && (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ye(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Sm(e, t) {
    switch (Zo(t), t.tag) {
      case 1:
        return et(t.type) && Gs(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ir(), xe(Ze), xe(Ve), fa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ca(t), null;
      case 13:
        if (xe(ke), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          tr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return xe(ke), null;
      case 4:
        return ir(), null;
      case 10:
        return ia(t.type._context), null;
      case 22:
      case 23:
        return Va(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var mi = !1, qe = !1, xm = typeof WeakSet == "function" ? WeakSet : Set, F = null;
  function ar(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      Ie(e, t, o);
    }
    else s.current = null;
  }
  function Na(e, t, s) {
    try {
      s();
    } catch (o) {
      Ie(e, t, o);
    }
  }
  var id = !1;
  function Em(e, t) {
    if (Vo = Ls, e = zu(), Oo(e)) {
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
          var h = 0, y = -1, w = -1, I = 0, j = 0, L = e, P = null;
          t: for (; ; ) {
            for (var B; L !== s || l !== 0 && L.nodeType !== 3 || (y = h + l), L !== c || o !== 0 && L.nodeType !== 3 || (w = h + o), L.nodeType === 3 && (h += L.nodeValue.length), (B = L.firstChild) !== null; )
              P = L, L = B;
            for (; ; ) {
              if (L === e) break t;
              if (P === s && ++I === l && (y = h), P === c && ++j === o && (w = h), (B = L.nextSibling) !== null) break;
              L = P, P = L.parentNode;
            }
            L = B;
          }
          s = y === -1 || w === -1 ? null : { start: y, end: w };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (Wo = { focusedElem: e, selectionRange: s }, Ls = !1, F = t; F !== null; ) if (t = F, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, F = e;
    else for (; F !== null; ) {
      t = F;
      try {
        var U = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (U !== null) {
              var H = U.memoizedProps, Ne = U.memoizedState, T = t.stateNode, x = T.getSnapshotBeforeUpdate(t.elementType === t.type ? H : Et(t.type, H), Ne);
              T.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var C = t.stateNode.containerInfo;
            C.nodeType === 1 ? C.textContent = "" : C.nodeType === 9 && C.documentElement && C.removeChild(C.documentElement);
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
        Ie(t, t.return, z);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, F = e;
        break;
      }
      F = t.return;
    }
    return U = id, id = !1, U;
  }
  function Zr(e, t, s) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy;
          l.destroy = void 0, c !== void 0 && Na(t, s, c);
        }
        l = l.next;
      } while (l !== o);
    }
  }
  function gi(e, t) {
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
  function Pa(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function od(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, od(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Nt], delete t[$r], delete t[Go], delete t[im], delete t[om])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ad(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ld(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ad(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ja(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = qs));
    else if (o !== 4 && (e = e.child, e !== null)) for (ja(e, t, s), e = e.sibling; e !== null; ) ja(e, t, s), e = e.sibling;
  }
  function La(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (La(e, t, s), e = e.sibling; e !== null; ) La(e, t, s), e = e.sibling;
  }
  var Fe = null, kt = !1;
  function dn(e, t, s) {
    for (s = s.child; s !== null; ) ud(e, t, s), s = s.sibling;
  }
  function ud(e, t, s) {
    if (Mt && typeof Mt.onCommitFiberUnmount == "function") try {
      Mt.onCommitFiberUnmount(Rs, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        qe || ar(s, t);
      case 6:
        var o = Fe, l = kt;
        Fe = null, dn(e, t, s), Fe = o, kt = l, Fe !== null && (kt ? (e = Fe, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : Fe.removeChild(s.stateNode));
        break;
      case 18:
        Fe !== null && (kt ? (e = Fe, s = s.stateNode, e.nodeType === 8 ? Qo(e.parentNode, s) : e.nodeType === 1 && Qo(e, s), Mr(e)) : Qo(Fe, s.stateNode));
        break;
      case 4:
        o = Fe, l = kt, Fe = s.stateNode.containerInfo, kt = !0, dn(e, t, s), Fe = o, kt = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!qe && (o = s.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var c = l, h = c.destroy;
            c = c.tag, h !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && Na(s, t, h), l = l.next;
          } while (l !== o);
        }
        dn(e, t, s);
        break;
      case 1:
        if (!qe && (ar(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = s.memoizedProps, o.state = s.memoizedState, o.componentWillUnmount();
        } catch (y) {
          Ie(s, t, y);
        }
        dn(e, t, s);
        break;
      case 21:
        dn(e, t, s);
        break;
      case 22:
        s.mode & 1 ? (qe = (o = qe) || s.memoizedState !== null, dn(e, t, s), qe = o) : dn(e, t, s);
        break;
      default:
        dn(e, t, s);
    }
  }
  function cd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new xm()), t.forEach(function(o) {
        var l = Nm.bind(null, e, o);
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
              Fe = y.stateNode, kt = !1;
              break e;
            case 3:
              Fe = y.stateNode.containerInfo, kt = !0;
              break e;
            case 4:
              Fe = y.stateNode.containerInfo, kt = !0;
              break e;
          }
          y = y.return;
        }
        if (Fe === null) throw Error(i(160));
        ud(c, h, l), Fe = null, kt = !1;
        var w = l.alternate;
        w !== null && (w.return = null), l.return = null;
      } catch (I) {
        Ie(l, t, I);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) dd(t, e), t = t.sibling;
  }
  function dd(e, t) {
    var s = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (bt(t, e), Lt(e), o & 4) {
          try {
            Zr(3, e, e.return), gi(3, e);
          } catch (H) {
            Ie(e, e.return, H);
          }
          try {
            Zr(5, e, e.return);
          } catch (H) {
            Ie(e, e.return, H);
          }
        }
        break;
      case 1:
        bt(t, e), Lt(e), o & 512 && s !== null && ar(s, s.return);
        break;
      case 5:
        if (bt(t, e), Lt(e), o & 512 && s !== null && ar(s, s.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            wr(l, "");
          } catch (H) {
            Ie(e, e.return, H);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, h = s !== null ? s.memoizedProps : c, y = e.type, w = e.updateQueue;
          if (e.updateQueue = null, w !== null) try {
            y === "input" && c.type === "radio" && c.name != null && Bl(l, c), fo(y, h);
            var I = fo(y, c);
            for (h = 0; h < w.length; h += 2) {
              var j = w[h], L = w[h + 1];
              j === "style" ? ql(l, L) : j === "dangerouslySetInnerHTML" ? Wl(l, L) : j === "children" ? wr(l, L) : de(l, j, L, I);
            }
            switch (y) {
              case "input":
                oo(l, c);
                break;
              case "textarea":
                $l(l, c);
                break;
              case "select":
                var P = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var B = c.value;
                B != null ? Fn(l, !!c.multiple, B, !1) : P !== !!c.multiple && (c.defaultValue != null ? Fn(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : Fn(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[$r] = c;
          } catch (H) {
            Ie(e, e.return, H);
          }
        }
        break;
      case 6:
        if (bt(t, e), Lt(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (H) {
            Ie(e, e.return, H);
          }
        }
        break;
      case 3:
        if (bt(t, e), Lt(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Mr(t.containerInfo);
        } catch (H) {
          Ie(e, e.return, H);
        }
        break;
      case 4:
        bt(t, e), Lt(e);
        break;
      case 13:
        bt(t, e), Lt(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Da = Me())), o & 4 && cd(e);
        break;
      case 22:
        if (j = s !== null && s.memoizedState !== null, e.mode & 1 ? (qe = (I = qe) || j, bt(t, e), qe = I) : bt(t, e), Lt(e), o & 8192) {
          if (I = e.memoizedState !== null, (e.stateNode.isHidden = I) && !j && (e.mode & 1) !== 0) for (F = e, j = e.child; j !== null; ) {
            for (L = F = j; F !== null; ) {
              switch (P = F, B = P.child, P.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Zr(4, P, P.return);
                  break;
                case 1:
                  ar(P, P.return);
                  var U = P.stateNode;
                  if (typeof U.componentWillUnmount == "function") {
                    o = P, s = P.return;
                    try {
                      t = o, U.props = t.memoizedProps, U.state = t.memoizedState, U.componentWillUnmount();
                    } catch (H) {
                      Ie(o, s, H);
                    }
                  }
                  break;
                case 5:
                  ar(P, P.return);
                  break;
                case 22:
                  if (P.memoizedState !== null) {
                    pd(L);
                    continue;
                  }
              }
              B !== null ? (B.return = P, F = B) : pd(L);
            }
            j = j.sibling;
          }
          e: for (j = null, L = e; ; ) {
            if (L.tag === 5) {
              if (j === null) {
                j = L;
                try {
                  l = L.stateNode, I ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (y = L.stateNode, w = L.memoizedProps.style, h = w != null && w.hasOwnProperty("display") ? w.display : null, y.style.display = Yl("display", h));
                } catch (H) {
                  Ie(e, e.return, H);
                }
              }
            } else if (L.tag === 6) {
              if (j === null) try {
                L.stateNode.nodeValue = I ? "" : L.memoizedProps;
              } catch (H) {
                Ie(e, e.return, H);
              }
            } else if ((L.tag !== 22 && L.tag !== 23 || L.memoizedState === null || L === e) && L.child !== null) {
              L.child.return = L, L = L.child;
              continue;
            }
            if (L === e) break e;
            for (; L.sibling === null; ) {
              if (L.return === null || L.return === e) break e;
              j === L && (j = null), L = L.return;
            }
            j === L && (j = null), L.sibling.return = L.return, L = L.sibling;
          }
        }
        break;
      case 19:
        bt(t, e), Lt(e), o & 4 && cd(e);
        break;
      case 21:
        break;
      default:
        bt(
          t,
          e
        ), Lt(e);
    }
  }
  function Lt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var s = e.return; s !== null; ) {
            if (ad(s)) {
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
            o.flags & 32 && (wr(l, ""), o.flags &= -33);
            var c = ld(e);
            La(e, c, l);
            break;
          case 3:
          case 4:
            var h = o.stateNode.containerInfo, y = ld(e);
            ja(e, y, h);
            break;
          default:
            throw Error(i(161));
        }
      } catch (w) {
        Ie(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function km(e, t, s) {
    F = e, fd(e);
  }
  function fd(e, t, s) {
    for (var o = (e.mode & 1) !== 0; F !== null; ) {
      var l = F, c = l.child;
      if (l.tag === 22 && o) {
        var h = l.memoizedState !== null || mi;
        if (!h) {
          var y = l.alternate, w = y !== null && y.memoizedState !== null || qe;
          y = mi;
          var I = qe;
          if (mi = h, (qe = w) && !I) for (F = l; F !== null; ) h = F, w = h.child, h.tag === 22 && h.memoizedState !== null ? md(l) : w !== null ? (w.return = h, F = w) : md(l);
          for (; c !== null; ) F = c, fd(c), c = c.sibling;
          F = l, mi = y, qe = I;
        }
        hd(e);
      } else (l.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = l, F = c) : hd(e);
    }
  }
  function hd(e) {
    for (; F !== null; ) {
      var t = F;
      if ((t.flags & 8772) !== 0) {
        var s = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              qe || gi(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !qe) if (s === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? s.memoizedProps : Et(t.type, s.memoizedProps);
                o.componentDidUpdate(l, s.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var c = t.updateQueue;
              c !== null && pc(t, c, o);
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
                pc(t, h, s);
              }
              break;
            case 5:
              var y = t.stateNode;
              if (s === null && t.flags & 4) {
                s = y;
                var w = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    w.autoFocus && s.focus();
                    break;
                  case "img":
                    w.src && (s.src = w.src);
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
                    var L = j.dehydrated;
                    L !== null && Mr(L);
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
          qe || t.flags & 512 && Pa(t);
        } catch (P) {
          Ie(t, t.return, P);
        }
      }
      if (t === e) {
        F = null;
        break;
      }
      if (s = t.sibling, s !== null) {
        s.return = t.return, F = s;
        break;
      }
      F = t.return;
    }
  }
  function pd(e) {
    for (; F !== null; ) {
      var t = F;
      if (t === e) {
        F = null;
        break;
      }
      var s = t.sibling;
      if (s !== null) {
        s.return = t.return, F = s;
        break;
      }
      F = t.return;
    }
  }
  function md(e) {
    for (; F !== null; ) {
      var t = F;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              gi(4, t);
            } catch (w) {
              Ie(t, s, w);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (w) {
                Ie(t, l, w);
              }
            }
            var c = t.return;
            try {
              Pa(t);
            } catch (w) {
              Ie(t, c, w);
            }
            break;
          case 5:
            var h = t.return;
            try {
              Pa(t);
            } catch (w) {
              Ie(t, h, w);
            }
        }
      } catch (w) {
        Ie(t, t.return, w);
      }
      if (t === e) {
        F = null;
        break;
      }
      var y = t.sibling;
      if (y !== null) {
        y.return = t.return, F = y;
        break;
      }
      F = t.return;
    }
  }
  var bm = Math.ceil, yi = ye.ReactCurrentDispatcher, Oa = ye.ReactCurrentOwner, gt = ye.ReactCurrentBatchConfig, le = 0, De = null, Pe = null, Ue = 0, ct = 0, lr = on(0), Le = 0, es = null, Tn = 0, vi = 0, za = 0, ts = null, nt = null, Da = 0, ur = 1 / 0, Yt = null, _i = !1, Ba = null, fn = null, wi = !1, hn = null, Si = 0, ns = 0, Fa = null, xi = -1, Ei = 0;
  function Ke() {
    return (le & 6) !== 0 ? Me() : xi !== -1 ? xi : xi = Me();
  }
  function pn(e) {
    return (e.mode & 1) === 0 ? 1 : (le & 2) !== 0 && Ue !== 0 ? Ue & -Ue : lm.transition !== null ? (Ei === 0 && (Ei = lu()), Ei) : (e = ge, e !== 0 || (e = window.event, e = e === void 0 ? 16 : yu(e.type)), e);
  }
  function Tt(e, t, s, o) {
    if (50 < ns) throw ns = 0, Fa = null, Error(i(185));
    Tr(e, s, o), ((le & 2) === 0 || e !== De) && (e === De && ((le & 2) === 0 && (vi |= s), Le === 4 && mn(e, Ue)), rt(e, o), s === 1 && le === 0 && (t.mode & 1) === 0 && (ur = Me() + 500, Js && ln()));
  }
  function rt(e, t) {
    var s = e.callbackNode;
    lp(e, t);
    var o = Ns(e, e === De ? Ue : 0);
    if (o === 0) s !== null && iu(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && iu(s), t === 1) e.tag === 0 ? am(yd.bind(null, e)) : nc(yd.bind(null, e)), rm(function() {
        (le & 6) === 0 && ln();
      }), s = null;
      else {
        switch (uu(o)) {
          case 1:
            s = _o;
            break;
          case 4:
            s = ou;
            break;
          case 16:
            s = Is;
            break;
          case 536870912:
            s = au;
            break;
          default:
            s = Is;
        }
        s = bd(s, gd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function gd(e, t) {
    if (xi = -1, Ei = 0, (le & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (cr() && e.callbackNode !== s) return null;
    var o = Ns(e, e === De ? Ue : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = ki(e, o);
    else {
      t = o;
      var l = le;
      le |= 2;
      var c = _d();
      (De !== e || Ue !== t) && (Yt = null, ur = Me() + 500, In(e, t));
      do
        try {
          Im();
          break;
        } catch (y) {
          vd(e, y);
        }
      while (!0);
      sa(), yi.current = c, le = l, Pe !== null ? t = 0 : (De = null, Ue = 0, t = Le);
    }
    if (t !== 0) {
      if (t === 2 && (l = wo(e), l !== 0 && (o = l, t = Ua(e, l))), t === 1) throw s = es, In(e, 0), mn(e, o), rt(e, Me()), s;
      if (t === 6) mn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !Tm(l) && (t = ki(e, o), t === 2 && (c = wo(e), c !== 0 && (o = c, t = Ua(e, c))), t === 1)) throw s = es, In(e, 0), mn(e, o), rt(e, Me()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            Rn(e, nt, Yt);
            break;
          case 3:
            if (mn(e, o), (o & 130023424) === o && (t = Da + 500 - Me(), 10 < t)) {
              if (Ns(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                Ke(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = qo(Rn.bind(null, e, nt, Yt), t);
              break;
            }
            Rn(e, nt, Yt);
            break;
          case 4:
            if (mn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var h = 31 - wt(o);
              c = 1 << h, h = t[h], h > l && (l = h), o &= ~c;
            }
            if (o = l, o = Me() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * bm(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = qo(Rn.bind(null, e, nt, Yt), o);
              break;
            }
            Rn(e, nt, Yt);
            break;
          case 5:
            Rn(e, nt, Yt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return rt(e, Me()), e.callbackNode === s ? gd.bind(null, e) : null;
  }
  function Ua(e, t) {
    var s = ts;
    return e.current.memoizedState.isDehydrated && (In(e, t).flags |= 256), e = ki(e, t), e !== 2 && (t = nt, nt = s, t !== null && $a(t)), e;
  }
  function $a(e) {
    nt === null ? nt = e : nt.push.apply(nt, e);
  }
  function Tm(e) {
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
    for (t &= ~za, t &= ~vi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var s = 31 - wt(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function yd(e) {
    if ((le & 6) !== 0) throw Error(i(327));
    cr();
    var t = Ns(e, 0);
    if ((t & 1) === 0) return rt(e, Me()), null;
    var s = ki(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = wo(e);
      o !== 0 && (t = o, s = Ua(e, o));
    }
    if (s === 1) throw s = es, In(e, 0), mn(e, t), rt(e, Me()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Rn(e, nt, Yt), rt(e, Me()), null;
  }
  function Ha(e, t) {
    var s = le;
    le |= 1;
    try {
      return e(t);
    } finally {
      le = s, le === 0 && (ur = Me() + 500, Js && ln());
    }
  }
  function Cn(e) {
    hn !== null && hn.tag === 0 && (le & 6) === 0 && cr();
    var t = le;
    le |= 1;
    var s = gt.transition, o = ge;
    try {
      if (gt.transition = null, ge = 1, e) return e();
    } finally {
      ge = o, gt.transition = s, le = t, (le & 6) === 0 && ln();
    }
  }
  function Va() {
    ct = lr.current, xe(lr);
  }
  function In(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, nm(s)), Pe !== null) for (s = Pe.return; s !== null; ) {
      var o = s;
      switch (Zo(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && Gs();
          break;
        case 3:
          ir(), xe(Ze), xe(Ve), fa();
          break;
        case 5:
          ca(o);
          break;
        case 4:
          ir();
          break;
        case 13:
          xe(ke);
          break;
        case 19:
          xe(ke);
          break;
        case 10:
          ia(o.type._context);
          break;
        case 22:
        case 23:
          Va();
      }
      s = s.return;
    }
    if (De = e, Pe = e = gn(e.current, null), Ue = ct = t, Le = 0, es = null, za = vi = Tn = 0, nt = ts = null, En !== null) {
      for (t = 0; t < En.length; t++) if (s = En[t], o = s.interleaved, o !== null) {
        s.interleaved = null;
        var l = o.next, c = s.pending;
        if (c !== null) {
          var h = c.next;
          c.next = l, o.next = h;
        }
        s.pending = o;
      }
      En = null;
    }
    return e;
  }
  function vd(e, t) {
    do {
      var s = Pe;
      try {
        if (sa(), ai.current = di, li) {
          for (var o = be.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          li = !1;
        }
        if (bn = 0, ze = je = be = null, Qr = !1, Gr = 0, Oa.current = null, s === null || s.return === null) {
          Le = 1, es = t, Pe = null;
          break;
        }
        e: {
          var c = e, h = s.return, y = s, w = t;
          if (t = Ue, y.flags |= 32768, w !== null && typeof w == "object" && typeof w.then == "function") {
            var I = w, j = y, L = j.tag;
            if ((j.mode & 1) === 0 && (L === 0 || L === 11 || L === 15)) {
              var P = j.alternate;
              P ? (j.updateQueue = P.updateQueue, j.memoizedState = P.memoizedState, j.lanes = P.lanes) : (j.updateQueue = null, j.memoizedState = null);
            }
            var B = Hc(h);
            if (B !== null) {
              B.flags &= -257, Vc(B, h, y, c, t), B.mode & 1 && $c(c, I, t), t = B, w = I;
              var U = t.updateQueue;
              if (U === null) {
                var H = /* @__PURE__ */ new Set();
                H.add(w), t.updateQueue = H;
              } else U.add(w);
              break e;
            } else {
              if ((t & 1) === 0) {
                $c(c, I, t), Wa();
                break e;
              }
              w = Error(i(426));
            }
          } else if (Ee && y.mode & 1) {
            var Ne = Hc(h);
            if (Ne !== null) {
              (Ne.flags & 65536) === 0 && (Ne.flags |= 256), Vc(Ne, h, y, c, t), na(or(w, y));
              break e;
            }
          }
          c = w = or(w, y), Le !== 4 && (Le = 2), ts === null ? ts = [c] : ts.push(c), c = h;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var T = Fc(c, w, t);
                hc(c, T);
                break e;
              case 1:
                y = w;
                var x = c.type, C = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof x.getDerivedStateFromError == "function" || C !== null && typeof C.componentDidCatch == "function" && (fn === null || !fn.has(C)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var z = Uc(c, y, t);
                  hc(c, z);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        Sd(s);
      } catch (V) {
        t = V, Pe === s && s !== null && (Pe = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function _d() {
    var e = yi.current;
    return yi.current = di, e === null ? di : e;
  }
  function Wa() {
    (Le === 0 || Le === 3 || Le === 2) && (Le = 4), De === null || (Tn & 268435455) === 0 && (vi & 268435455) === 0 || mn(De, Ue);
  }
  function ki(e, t) {
    var s = le;
    le |= 2;
    var o = _d();
    (De !== e || Ue !== t) && (Yt = null, In(e, t));
    do
      try {
        Cm();
        break;
      } catch (l) {
        vd(e, l);
      }
    while (!0);
    if (sa(), le = s, yi.current = o, Pe !== null) throw Error(i(261));
    return De = null, Ue = 0, Le;
  }
  function Cm() {
    for (; Pe !== null; ) wd(Pe);
  }
  function Im() {
    for (; Pe !== null && !Zh(); ) wd(Pe);
  }
  function wd(e) {
    var t = kd(e.alternate, e, ct);
    e.memoizedProps = e.pendingProps, t === null ? Sd(e) : Pe = t, Oa.current = null;
  }
  function Sd(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = wm(s, t, ct), s !== null) {
          Pe = s;
          return;
        }
      } else {
        if (s = Sm(s, t), s !== null) {
          s.flags &= 32767, Pe = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Le = 6, Pe = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Pe = t;
        return;
      }
      Pe = t = e;
    } while (t !== null);
    Le === 0 && (Le = 5);
  }
  function Rn(e, t, s) {
    var o = ge, l = gt.transition;
    try {
      gt.transition = null, ge = 1, Rm(e, t, s, o);
    } finally {
      gt.transition = l, ge = o;
    }
    return null;
  }
  function Rm(e, t, s, o) {
    do
      cr();
    while (hn !== null);
    if ((le & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (up(e, c), e === De && (Pe = De = null, Ue = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || wi || (wi = !0, bd(Is, function() {
      return cr(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = gt.transition, gt.transition = null;
      var h = ge;
      ge = 1;
      var y = le;
      le |= 4, Oa.current = null, Em(e, s), dd(s, e), Gp(Wo), Ls = !!Vo, Wo = Vo = null, e.current = s, km(s), ep(), le = y, ge = h, gt.transition = c;
    } else e.current = s;
    if (wi && (wi = !1, hn = e, Si = l), c = e.pendingLanes, c === 0 && (fn = null), rp(s.stateNode), rt(e, Me()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (_i) throw _i = !1, e = Ba, Ba = null, e;
    return (Si & 1) !== 0 && e.tag !== 0 && cr(), c = e.pendingLanes, (c & 1) !== 0 ? e === Fa ? ns++ : (ns = 0, Fa = e) : ns = 0, ln(), null;
  }
  function cr() {
    if (hn !== null) {
      var e = uu(Si), t = gt.transition, s = ge;
      try {
        if (gt.transition = null, ge = 16 > e ? 16 : e, hn === null) var o = !1;
        else {
          if (e = hn, hn = null, Si = 0, (le & 6) !== 0) throw Error(i(331));
          var l = le;
          for (le |= 4, F = e.current; F !== null; ) {
            var c = F, h = c.child;
            if ((F.flags & 16) !== 0) {
              var y = c.deletions;
              if (y !== null) {
                for (var w = 0; w < y.length; w++) {
                  var I = y[w];
                  for (F = I; F !== null; ) {
                    var j = F;
                    switch (j.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Zr(8, j, c);
                    }
                    var L = j.child;
                    if (L !== null) L.return = j, F = L;
                    else for (; F !== null; ) {
                      j = F;
                      var P = j.sibling, B = j.return;
                      if (od(j), j === I) {
                        F = null;
                        break;
                      }
                      if (P !== null) {
                        P.return = B, F = P;
                        break;
                      }
                      F = B;
                    }
                  }
                }
                var U = c.alternate;
                if (U !== null) {
                  var H = U.child;
                  if (H !== null) {
                    U.child = null;
                    do {
                      var Ne = H.sibling;
                      H.sibling = null, H = Ne;
                    } while (H !== null);
                  }
                }
                F = c;
              }
            }
            if ((c.subtreeFlags & 2064) !== 0 && h !== null) h.return = c, F = h;
            else e: for (; F !== null; ) {
              if (c = F, (c.flags & 2048) !== 0) switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  Zr(9, c, c.return);
              }
              var T = c.sibling;
              if (T !== null) {
                T.return = c.return, F = T;
                break e;
              }
              F = c.return;
            }
          }
          var x = e.current;
          for (F = x; F !== null; ) {
            h = F;
            var C = h.child;
            if ((h.subtreeFlags & 2064) !== 0 && C !== null) C.return = h, F = C;
            else e: for (h = x; F !== null; ) {
              if (y = F, (y.flags & 2048) !== 0) try {
                switch (y.tag) {
                  case 0:
                  case 11:
                  case 15:
                    gi(9, y);
                }
              } catch (V) {
                Ie(y, y.return, V);
              }
              if (y === h) {
                F = null;
                break e;
              }
              var z = y.sibling;
              if (z !== null) {
                z.return = y.return, F = z;
                break e;
              }
              F = y.return;
            }
          }
          if (le = l, ln(), Mt && typeof Mt.onPostCommitFiberRoot == "function") try {
            Mt.onPostCommitFiberRoot(Rs, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        ge = s, gt.transition = t;
      }
    }
    return !1;
  }
  function xd(e, t, s) {
    t = or(s, t), t = Fc(e, t, 1), e = cn(e, t, 1), t = Ke(), e !== null && (Tr(e, 1, t), rt(e, t));
  }
  function Ie(e, t, s) {
    if (e.tag === 3) xd(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        xd(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (fn === null || !fn.has(o))) {
          e = or(s, e), e = Uc(t, e, 1), t = cn(t, e, 1), e = Ke(), t !== null && (Tr(t, 1, e), rt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Am(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = Ke(), e.pingedLanes |= e.suspendedLanes & s, De === e && (Ue & s) === s && (Le === 4 || Le === 3 && (Ue & 130023424) === Ue && 500 > Me() - Da ? In(e, 0) : za |= s), rt(e, t);
  }
  function Ed(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Ms, Ms <<= 1, (Ms & 130023424) === 0 && (Ms = 4194304)));
    var s = Ke();
    e = Ht(e, t), e !== null && (Tr(e, t, s), rt(e, s));
  }
  function Mm(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), Ed(e, s);
  }
  function Nm(e, t) {
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
    o !== null && o.delete(t), Ed(e, s);
  }
  var kd;
  kd = function(e, t, s) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Ze.current) tt = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return tt = !1, _m(e, t, s);
      tt = (e.flags & 131072) !== 0;
    }
    else tt = !1, Ee && (t.flags & 1048576) !== 0 && rc(t, Zs, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        pi(e, t), e = t.pendingProps;
        var l = Xn(t, Ve.current);
        sr(t, s), l = ma(null, t, o, e, l, s);
        var c = ga();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, et(o) ? (c = !0, Ks(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, la(t), l.updater = fi, t.stateNode = l, l._reactInternals = t, xa(t, o, e, s), t = Ta(null, t, o, !0, c, s)) : (t.tag = 0, Ee && c && Xo(t), Ge(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (pi(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = jm(o), e = Et(o, e), l) {
            case 0:
              t = ba(null, t, o, e, s);
              break e;
            case 1:
              t = Kc(null, t, o, e, s);
              break e;
            case 11:
              t = Wc(null, t, o, e, s);
              break e;
            case 14:
              t = Yc(null, t, o, Et(o.type, e), s);
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
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Et(o, l), ba(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Et(o, l), Kc(e, t, o, l, s);
      case 3:
        e: {
          if (Jc(t), e === null) throw Error(i(387));
          o = t.pendingProps, c = t.memoizedState, l = c.element, fc(e, t), ii(t, o, null, s);
          var h = t.memoizedState;
          if (o = h.element, c.isDehydrated) if (c = { element: o, isDehydrated: !1, cache: h.cache, pendingSuspenseBoundaries: h.pendingSuspenseBoundaries, transitions: h.transitions }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
            l = or(Error(i(423)), t), t = Xc(e, t, o, s, l);
            break e;
          } else if (o !== l) {
            l = or(Error(i(424)), t), t = Xc(e, t, o, s, l);
            break e;
          } else for (ut = sn(t.stateNode.containerInfo.firstChild), lt = t, Ee = !0, xt = null, s = cc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (tr(), o === l) {
              t = Wt(e, t, s);
              break e;
            }
            Ge(e, t, o, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return mc(t), e === null && ta(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, h = l.children, Yo(o, l) ? h = null : c !== null && Yo(o, c) && (t.flags |= 32), Gc(e, t), Ge(e, t, h, s), t.child;
      case 6:
        return e === null && ta(t), null;
      case 13:
        return Zc(e, t, s);
      case 4:
        return ua(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = nr(t, null, o, s) : Ge(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Et(o, l), Wc(e, t, o, l, s);
      case 7:
        return Ge(e, t, t.pendingProps, s), t.child;
      case 8:
        return Ge(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return Ge(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, h = l.value, _e(ni, o._currentValue), o._currentValue = h, c !== null) if (St(c.value, h)) {
            if (c.children === l.children && !Ze.current) {
              t = Wt(e, t, s);
              break e;
            }
          } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
            var y = c.dependencies;
            if (y !== null) {
              h = c.child;
              for (var w = y.firstContext; w !== null; ) {
                if (w.context === o) {
                  if (c.tag === 1) {
                    w = Vt(-1, s & -s), w.tag = 2;
                    var I = c.updateQueue;
                    if (I !== null) {
                      I = I.shared;
                      var j = I.pending;
                      j === null ? w.next = w : (w.next = j.next, j.next = w), I.pending = w;
                    }
                  }
                  c.lanes |= s, w = c.alternate, w !== null && (w.lanes |= s), oa(
                    c.return,
                    s,
                    t
                  ), y.lanes |= s;
                  break;
                }
                w = w.next;
              }
            } else if (c.tag === 10) h = c.type === t.type ? null : c.child;
            else if (c.tag === 18) {
              if (h = c.return, h === null) throw Error(i(341));
              h.lanes |= s, y = h.alternate, y !== null && (y.lanes |= s), oa(h, s, t), h = c.sibling;
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
        return l = t.type, o = t.pendingProps.children, sr(t, s), l = pt(l), o = o(l), t.flags |= 1, Ge(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = Et(o, t.pendingProps), l = Et(o.type, l), Yc(e, t, o, l, s);
      case 15:
        return qc(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Et(o, l), pi(e, t), t.tag = 1, et(o) ? (e = !0, Ks(t)) : e = !1, sr(t, s), Dc(t, o, l), xa(t, o, l, s), Ta(null, t, o, !0, e, s);
      case 19:
        return td(e, t, s);
      case 22:
        return Qc(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function bd(e, t) {
    return su(e, t);
  }
  function Pm(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yt(e, t, s, o) {
    return new Pm(e, t, s, o);
  }
  function Ya(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function jm(e) {
    if (typeof e == "function") return Ya(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === it) return 11;
      if (e === ee) return 14;
    }
    return 2;
  }
  function gn(e, t) {
    var s = e.alternate;
    return s === null ? (s = yt(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function bi(e, t, s, o, l, c) {
    var h = 2;
    if (o = e, typeof e == "function") Ya(e) && (h = 1);
    else if (typeof e == "string") h = 5;
    else e: switch (e) {
      case se:
        return An(s.children, l, c, t);
      case K:
        h = 8, l |= 8;
        break;
      case ve:
        return e = yt(12, s, t, l | 2), e.elementType = ve, e.lanes = c, e;
      case $e:
        return e = yt(13, s, t, l), e.elementType = $e, e.lanes = c, e;
      case ot:
        return e = yt(19, s, t, l), e.elementType = ot, e.lanes = c, e;
      case Z:
        return Ti(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Oe:
            h = 10;
            break e;
          case Ce:
            h = 9;
            break e;
          case it:
            h = 11;
            break e;
          case ee:
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
  function An(e, t, s, o) {
    return e = yt(7, e, o, t), e.lanes = s, e;
  }
  function Ti(e, t, s, o) {
    return e = yt(22, e, o, t), e.elementType = Z, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function qa(e, t, s) {
    return e = yt(6, e, null, t), e.lanes = s, e;
  }
  function Qa(e, t, s) {
    return t = yt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Lm(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = So(0), this.expirationTimes = So(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = So(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function Ga(e, t, s, o, l, c, h, y, w) {
    return e = new Lm(e, t, s, y, w), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = yt(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, la(c), e;
  }
  function Om(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: fe, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function Td(e) {
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
      if (et(s)) return ec(e, s, t);
    }
    return t;
  }
  function Cd(e, t, s, o, l, c, h, y, w) {
    return e = Ga(s, o, !0, e, l, c, h, y, w), e.context = Td(null), s = e.current, o = Ke(), l = pn(s), c = Vt(o, l), c.callback = t ?? null, cn(s, c, l), e.current.lanes = l, Tr(e, l, o), rt(e, o), e;
  }
  function Ci(e, t, s, o) {
    var l = t.current, c = Ke(), h = pn(l);
    return s = Td(s), t.context === null ? t.context = s : t.pendingContext = s, t = Vt(c, h), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = cn(l, t, h), e !== null && (Tt(e, l, h, c), si(e, l, h)), h;
  }
  function Ii(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Id(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function Ka(e, t) {
    Id(e, t), (e = e.alternate) && Id(e, t);
  }
  function zm() {
    return null;
  }
  var Rd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Ja(e) {
    this._internalRoot = e;
  }
  Ri.prototype.render = Ja.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Ci(e, t, null, null);
  }, Ri.prototype.unmount = Ja.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Cn(function() {
        Ci(null, e, null, null);
      }), t[Bt] = null;
    }
  };
  function Ri(e) {
    this._internalRoot = e;
  }
  Ri.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = fu();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < tn.length && t !== 0 && t < tn[s].priority; s++) ;
      tn.splice(s, 0, e), s === 0 && mu(e);
    }
  };
  function Xa(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ai(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ad() {
  }
  function Dm(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var I = Ii(h);
          c.call(I);
        };
      }
      var h = Cd(t, o, e, 0, null, !1, !1, "", Ad);
      return e._reactRootContainer = h, e[Bt] = h.current, Fr(e.nodeType === 8 ? e.parentNode : e), Cn(), h;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var y = o;
      o = function() {
        var I = Ii(w);
        y.call(I);
      };
    }
    var w = Ga(e, 0, !1, null, null, !1, !1, "", Ad);
    return e._reactRootContainer = w, e[Bt] = w.current, Fr(e.nodeType === 8 ? e.parentNode : e), Cn(function() {
      Ci(t, w, s, o);
    }), w;
  }
  function Mi(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var h = c;
      if (typeof l == "function") {
        var y = l;
        l = function() {
          var w = Ii(h);
          y.call(w);
        };
      }
      Ci(t, h, e, l);
    } else h = Dm(s, t, e, l, o);
    return Ii(h);
  }
  cu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = br(t.pendingLanes);
          s !== 0 && (xo(t, s | 1), rt(t, Me()), (le & 6) === 0 && (ur = Me() + 500, ln()));
        }
        break;
      case 13:
        Cn(function() {
          var o = Ht(e, 1);
          if (o !== null) {
            var l = Ke();
            Tt(o, e, 1, l);
          }
        }), Ka(e, 1);
    }
  }, Eo = function(e) {
    if (e.tag === 13) {
      var t = Ht(e, 134217728);
      if (t !== null) {
        var s = Ke();
        Tt(t, e, 134217728, s);
      }
      Ka(e, 134217728);
    }
  }, du = function(e) {
    if (e.tag === 13) {
      var t = pn(e), s = Ht(e, t);
      if (s !== null) {
        var o = Ke();
        Tt(s, e, t, o);
      }
      Ka(e, t);
    }
  }, fu = function() {
    return ge;
  }, hu = function(e, t) {
    var s = ge;
    try {
      return ge = e, t();
    } finally {
      ge = s;
    }
  }, mo = function(e, t, s) {
    switch (t) {
      case "input":
        if (oo(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = Qs(o);
              if (!l) throw Error(i(90));
              zl(o), oo(o, l);
            }
          }
        }
        break;
      case "textarea":
        $l(e, s);
        break;
      case "select":
        t = s.value, t != null && Fn(e, !!s.multiple, t, !1);
    }
  }, Jl = Ha, Xl = Cn;
  var Bm = { usingClientEntryPoint: !1, Events: [Hr, Kn, Qs, Gl, Kl, Ha] }, rs = { findFiberByHostInstance: _n, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Fm = { bundleType: rs.bundleType, version: rs.version, rendererPackageName: rs.rendererPackageName, rendererConfig: rs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ye.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = nu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: rs.findFiberByHostInstance || zm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ni = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ni.isDisabled && Ni.supportsFiber) try {
      Rs = Ni.inject(Fm), Mt = Ni;
    } catch {
    }
  }
  return st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bm, st.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Xa(t)) throw Error(i(200));
    return Om(e, t, null, s);
  }, st.createRoot = function(e, t) {
    if (!Xa(e)) throw Error(i(299));
    var s = !1, o = "", l = Rd;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ga(e, 1, !1, null, null, s, !1, o, l), e[Bt] = t.current, Fr(e.nodeType === 8 ? e.parentNode : e), new Ja(t);
  }, st.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = nu(t), e = e === null ? null : e.stateNode, e;
  }, st.flushSync = function(e) {
    return Cn(e);
  }, st.hydrate = function(e, t, s) {
    if (!Ai(t)) throw Error(i(200));
    return Mi(null, e, t, !0, s);
  }, st.hydrateRoot = function(e, t, s) {
    if (!Xa(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", h = Rd;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (h = s.onRecoverableError)), t = Cd(t, null, e, 1, s ?? null, l, !1, c, h), e[Bt] = t.current, Fr(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new Ri(t);
  }, st.render = function(e, t, s) {
    if (!Ai(t)) throw Error(i(200));
    return Mi(null, e, t, !1, s);
  }, st.unmountComponentAtNode = function(e) {
    if (!Ai(e)) throw Error(i(40));
    return e._reactRootContainer ? (Cn(function() {
      Mi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Bt] = null;
      });
    }), !0) : !1;
  }, st.unstable_batchedUpdates = Ha, st.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Ai(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Mi(e, t, s, !1, o);
  }, st.version = "18.3.1-next-f1338f8080-20240426", st;
}
var Dd;
function Cf() {
  if (Dd) return tl.exports;
  Dd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), tl.exports = Gm(), tl.exports;
}
var Bd;
function Km() {
  if (Bd) return Pi;
  Bd = 1;
  var r = Cf();
  return Pi.createRoot = r.createRoot, Pi.hydrateRoot = r.hydrateRoot, Pi;
}
var Jm = Km(), Xm = Cf();
const Zm = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
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
class If {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return Zm(this._providers);
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
class eg {
  _contextProvider = new If();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class tg {
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
const ng = (r) => r.status.type === "complete";
class Rf extends tg {
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => ng(d) ? d : await n.send(d))) : [], a = this.text;
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
      for (const v of this._dictationUnsubscribes)
        v();
      this._dictationUnsubscribes = [], this._dictationSession.stop().catch(() => {
      }), this._dictationSession = void 0;
    }
    const i = n.disableInputDuringDictation ?? !1;
    this._dictationBaseText = this._text, this._currentInterimText = "";
    const a = n.listen();
    this._dictationSession = a;
    const u = ++this._dictationSessionIdCounter;
    this._activeDictationSessionId = u, this._dictation = { status: a.status, inputDisabled: i }, this._notifySubscribers();
    const d = a.onSpeech((_) => {
      if (!this._isActiveSession(u, a))
        return;
      const v = _.isFinal !== !1, S = this._dictationBaseText && !this._dictationBaseText.endsWith(" ") && _.transcript ? " " : "";
      if (v) {
        if (this._dictationBaseText = this._dictationBaseText + S + _.transcript, this._currentInterimText = "", this._text = this._dictationBaseText, this._dictation) {
          const { transcript: R, ...A } = this._dictation;
          this._dictation = A;
        }
        this._notifySubscribers();
      } else
        this._currentInterimText = S + _.transcript, this._text = this._dictationBaseText + this._currentInterimText, this._dictation && (this._dictation = {
          ...this._dictation,
          transcript: _.transcript
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
class rg extends Rf {
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
let sg = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const wl = sg("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), ig = "__optimistic__", og = () => `${ig}${wl()}`, yr = /* @__PURE__ */ Symbol("autoStatus"), ag = Object.freeze(Object.assign({ type: "running" }, { [yr]: !0 })), lg = Object.freeze(Object.assign({
  type: "complete",
  reason: "unknown"
}, { [yr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "tool-calls"
}, { [yr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "interrupt"
}, { [yr]: !0 }));
const ug = (r) => r[yr] === !0, Af = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [yr]: !0 }) : r && n ? ag : lg;
var Mn = { exports: {} }, Fd;
function cg() {
  if (Fd) return Mn.exports;
  Fd = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(p, m, _) {
    _ == null && m !== null && typeof m == "object" && (_ = m, m = void 0), r && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const v = JSON.parse(p, m);
    if (v === null || typeof v != "object")
      return v;
    const E = _ && _.protoAction || "error", S = _ && _.constructorAction || "error";
    if (E === "ignore" && S === "ignore")
      return v;
    if (E !== "ignore" && S !== "ignore") {
      if (n.test(p) === !1 && i.test(p) === !1)
        return v;
    } else if (E !== "ignore" && S === "ignore") {
      if (n.test(p) === !1)
        return v;
    } else if (i.test(p) === !1)
      return v;
    return u(v, { protoAction: E, constructorAction: S, safe: _ && _.safe });
  }
  function u(p, { protoAction: m = "error", constructorAction: _ = "error", safe: v } = {}) {
    let E = [p];
    for (; E.length; ) {
      const S = E;
      E = [];
      for (const R of S) {
        if (m !== "ignore" && Object.prototype.hasOwnProperty.call(R, "__proto__")) {
          if (v === !0)
            return null;
          if (m === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete R.__proto__;
        }
        if (_ !== "ignore" && Object.prototype.hasOwnProperty.call(R, "constructor") && R.constructor !== null && typeof R.constructor == "object" && Object.prototype.hasOwnProperty.call(R.constructor, "prototype")) {
          if (v === !0)
            return null;
          if (_ === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete R.constructor;
        }
        for (const A in R) {
          const M = R[A];
          M && typeof M == "object" && E.push(M);
        }
      }
    }
    return p;
  }
  function d(p, m, _) {
    const { stackTraceLimit: v } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, m, _);
    } finally {
      Error.stackTraceLimit = v;
    }
  }
  function f(p, m) {
    const { stackTraceLimit: _ } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, m, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = _;
    }
  }
  return Mn.exports = d, Mn.exports.default = d, Mn.exports.parse = d, Mn.exports.safeParse = f, Mn.exports.scan = u, Mn.exports;
}
var dg = cg();
const Ud = /* @__PURE__ */ Tf(dg);
function fg(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function f() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(E, S, R) {
    switch (E) {
      case '"': {
        i = S, n.pop(), n.push(R), n.push("INSIDE_STRING"), f();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = S, a = S, n.pop(), n.push(R), n.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        n.pop(), n.push(R), n.push("INSIDE_NUMBER"), f();
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
        i = S, n.pop(), n.push(R), n.push("INSIDE_NUMBER"), f();
        break;
      }
      case "{": {
        i = S, n.pop(), n.push(R), n.push("INSIDE_OBJECT_START"), f();
        break;
      }
      case "[": {
        i = S, n.pop(), n.push(R), n.push("INSIDE_ARRAY_START"), f();
        break;
      }
    }
  }
  function m(E, S) {
    switch (E) {
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
  function _(E, S) {
    switch (E) {
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
  for (let E = 0; E < r.length; E++) {
    const S = r[E];
    switch (n[n.length - 1]) {
      case "ROOT":
        p(S, E, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (S) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "";
            break;
          }
          case "}": {
            i = E, n.pop(), d = u.pop();
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
        p(S, E, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        m(S, E);
        break;
      }
      case "INSIDE_STRING": {
        switch (S) {
          case '"': {
            n.pop(), i = E, d = u.pop();
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            i = E;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        S === "]" ? (i = E, n.pop(), d = u.pop()) : (i = E, d = "0", p(S, E, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (S) {
          case ",": {
            n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
            break;
          }
          case "]": {
            i = E, n.pop(), d = u.pop();
            break;
          }
          default: {
            i = E;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        p(S, E, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        n.pop(), n[n.length - 1] === "INSIDE_STRING" ? i = E : n[n.length - 1] === "INSIDE_OBJECT_KEY" && (d += S);
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
            i = E;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(S, E), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(S, E);
            break;
          }
          case "}": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(S, E);
            break;
          }
          case "]": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(S, E);
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
        const A = r.substring(a, E + 1);
        !"false".startsWith(A) && !"true".startsWith(A) && !"null".startsWith(A) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? m(S, E) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(S, E)) : i = E;
        break;
      }
    }
  }
  let v = r.slice(0, i + 1);
  for (let E = n.length - 1; E >= 0; E--)
    switch (n[E]) {
      case "INSIDE_STRING": {
        v += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        v += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        v += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const R = r.substring(a, r.length);
        "true".startsWith(R) ? v += "true".slice(R.length) : "false".startsWith(R) ? v += "false".slice(R.length) : "null".startsWith(R) && (v += "null".slice(R.length));
      }
    }
  return [v, u];
}
const sl = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), hg = (r) => {
  if (r.length === 0)
    return {
      [sl]: { state: "partial", partialPath: [] }
    };
  try {
    const n = Ud.parse(r);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[sl] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = fg(r), a = Ud.parse(n);
      if (typeof a != "object" || a === null)
        throw new Error("argsText is expected to be an object");
      return a[sl] = {
        state: "partial",
        partialPath: i
      }, a;
    } catch {
      return;
    }
  }
}, Sl = (r, n, i) => {
  const { role: a, id: u, createdAt: d, attachments: f, status: p, metadata: m } = r, _ = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, v = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, E = ({ image: S, ...R }) => {
    const A = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(S), M = /^https?:\/\//.test(S);
    return A || M ? { ...R, image: S } : (console.warn("Invalid image data format detected"), null);
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
        ..._,
        role: a,
        content: v.map((S) => {
          const R = S.type;
          switch (R) {
            case "text":
            case "reasoning":
              return S.text.trim().length === 0 ? null : S;
            case "file":
            case "source":
              return S;
            case "image":
              return E(S);
            case "data":
              return S;
            case "tool-call": {
              const { parentId: A, messages: M, ...$ } = S, Y = {
                ...$,
                toolCallId: S.toolCallId ?? `tool-${wl()}`,
                ...A !== void 0 && { parentId: A },
                ...M !== void 0 && { messages: M }
              };
              return S.args ? {
                ...Y,
                args: S.args,
                argsText: S.argsText ?? JSON.stringify(S.args)
              } : {
                ...Y,
                args: hg(S.argsText ?? "") ?? {},
                argsText: S.argsText ?? ""
              };
            }
            default: {
              const A = R;
              throw new Error(`Unsupported assistant message part type: ${A}`);
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
        ..._,
        role: a,
        content: v.map((S) => {
          const R = S.type;
          switch (R) {
            case "text":
            case "image":
            case "audio":
            case "file":
              return S;
            default: {
              const A = R;
              throw new Error(`Unsupported user message part type: ${A}`);
            }
          }
        }),
        attachments: f ?? [],
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    case "system":
      if (v.length !== 1 || v[0].type !== "text")
        throw new Error("System messages must have exactly one text message part.");
      return {
        ..._,
        role: a,
        content: v,
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    default: {
      const S = a;
      throw new Error(`Unknown message role: ${S}`);
    }
  }
}, xl = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (r) => {
    const n = r.map((i) => Sl(i, wl(), Af(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, a) => ({
        parentId: a > 0 ? n[a - 1].id : null,
        message: i
      }))
    };
  }
}, Di = (r) => r.next ? Di(r.next) : "current" in r ? r : null;
class pg {
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
class Mf {
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
        ], (Di(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const f = n ? n.level + 1 : 0;
        this.updateLevels(i, f);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new pg(() => {
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
      a = og();
    while (this.messages.has(a));
    return this.addOrUpdateMessage(n, Sl(i, a, { type: "running" })), a;
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
    this.performOp(null, a, "cut"), this.messages.delete(n), this.head === a && (this.head = Di(u ?? this.root)), this._messages.dirty();
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
    a.next = i, this.head = Di(i), this._messages.dirty();
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
class Gi {
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
const Rt = /* @__PURE__ */ Symbol("skip-update");
class El extends Gi {
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
      n !== Rt && (this._previousState = n), this._previousStateDirty = !1;
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
class ji {
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
function mg(r, n) {
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
class It extends Gi {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(n) {
    super(), this.binding = n;
    const i = n.getState();
    if (i === Rt)
      throw new Error("Entry not available in the store");
    this._previousState = i;
  }
  _previousState;
  getState = () => (this.isConnected || this._syncState(), this._previousState);
  _syncState() {
    const n = this.binding.getState();
    return n === Rt || mg(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const pr = /* @__PURE__ */ Symbol("innerMessage"), gg = (r) => r[pr], cs = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class Nf {
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
class Pf extends Nf {
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
class yg extends Pf {
  get source() {
    return "thread-composer";
  }
}
class vg extends Pf {
  get source() {
    return "edit-composer";
  }
}
class _g extends Nf {
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
class jf extends Gi {
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
const Lf = Object.freeze([]), Of = Object.freeze({}), wg = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? Lf,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? Of,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), Sg = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? Lf,
  runConfig: r?.runConfig ?? Of,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class zf {
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
    return a || (a = new jf({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
class xg extends zf {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(n) {
    const i = new El({
      path: n.path,
      getState: () => wg(n.getState()),
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
    return new yg(new It({
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
        } : Rt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
class Eg extends zf {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(n, i) {
    const a = new El({
      path: n.path,
      getState: () => Sg(n.getState()),
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
    return new vg(new It({
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
        } : Rt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const $d = /* @__PURE__ */ Symbol.for("aui.tool-response");
class Fi {
  get [$d]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && $d in n;
  }
  static toResponse(n) {
    return n instanceof Fi ? n : new Fi({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class Hd {
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
    const u = i.toolName, d = i.toolCallId, f = Fi.toResponse(n);
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
class Ui extends Gi {
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
const Li = Object.freeze({
  type: "complete"
}), kg = (r, n, i) => {
  if (r.role !== "assistant")
    return Li;
  if (i.type === "tool-call")
    return i.result ? Li : r.status;
  const a = n === Math.max(0, r.content.length - 1);
  return r.status.type === "requires-action" ? Li : a ? r.status : Li;
}, Vd = (r, n) => {
  const i = r.content[n];
  if (!i)
    return Rt;
  const a = kg(r, n, i);
  return Object.freeze({
    ...i,
    [pr]: i[pr],
    status: a
  });
};
class bg {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new Eg(new Ui({
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
    return cs(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new Hd(new It({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => Vd(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new Hd(new It({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), a = i.content.findIndex((u) => u.type === "tool-call" && u.toolCallId === n);
        return a === -1 ? Rt : Vd(i, a);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new _g(new It({
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
        } : Rt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }));
  }
}
const Tg = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {},
  ...r.stream ? { stream: r.stream } : {}
}), Cg = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), Ig = (r, n) => typeof n == "string" ? {
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
}, Rg = (r, n) => {
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
class Ag {
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
      getState: () => Rg(n.getState(), i.getState()),
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
    }, this.composer = new xg(new Ui({
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
    this._threadBinding.getState().append(Ig(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(Cg(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun(Tg(n));
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
    return new bg(new It({
      path: n,
      getState: () => {
        const { message: a, parentId: u, index: d } = i() ?? {}, { messages: f, speech: p } = this._threadBinding.getState();
        if (!a || u === void 0 || d === void 0)
          return Rt;
        const _ = this._threadBinding.getState().getBranches(a.id), v = a.metadata.submittedFeedback;
        return {
          ...a,
          [pr]: a[pr],
          index: d,
          isLast: f.at(-1)?.id === a.id,
          parentId: u,
          branchNumber: _.indexOf(a.id) + 1,
          branchCount: _.length,
          speech: p?.messageId === a.id ? p : void 0,
          submittedFeedback: v
        };
      },
      subscribe: (a) => this._threadBinding.subscribe(a)
    }), this._threadBinding);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    let a = this._eventSubscriptionSubjects.get(n);
    return a || (a = new jf({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
const Mg = (r) => ({
  mainThreadId: r.mainThreadId,
  newThread: r.newThreadId,
  threads: r.threadIds,
  archivedThreads: r.archivedThreadIds,
  isLoading: r.isLoading,
  threadItems: r.threadData
}), Oi = (r, n) => {
  if (n === void 0)
    return Rt;
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
  } : Rt;
};
class Ng {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = Ag) {
    this._core = n, this._runtimeFactory = i;
    const a = new El({
      path: {},
      getState: () => Mg(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new ji(new It({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => Oi(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new Ui({
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
    return new this._runtimeFactory(new Ui({
      path: {
        ref: `threads[threadId=${JSON.stringify(n)}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => this._core.getThreadRuntimeCore(n),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(n) {
    return new ji(new It({
      path: {
        ref: `threadItems[${n}]`,
        threadSelector: { type: "index", index: n }
      },
      getState: () => Oi(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new ji(new It({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => Oi(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new ji(new It({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => Oi(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Pg = b.createContext(null), jg = () => b.useContext(Pg), Nn = Object.freeze([]), Ln = "DEFAULT_THREAD_ID", Lg = Object.freeze([Ln]), Df = Object.freeze({
  id: Ln,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), Og = Promise.resolve(), Wd = Object.freeze({
  [Ln]: Df
});
class zg {
  adapter;
  threadFactory;
  _mainThreadId = Ln;
  _threads = Lg;
  _archivedThreads = Nn;
  _threadData = Wd;
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
    return Og;
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
      return Df;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? Ln, d = n.threads ?? Nn, f = n.archivedThreads ?? Nn, p = a.threadId ?? Ln, m = a.threads ?? Nn, _ = a.archivedThreads ?? Nn;
    !i && p === u && m === d && _ === f || (this._threadData = {
      ...Wd,
      ...Object.fromEntries(n.threads?.map((v) => [
        v.id,
        {
          ...v,
          remoteId: v.remoteId,
          externalId: v.externalId,
          status: "regular"
        }
      ]) ?? []),
      ...Object.fromEntries(n.archivedThreads?.map((v) => [
        v.id,
        {
          ...v,
          remoteId: v.remoteId,
          externalId: v.externalId,
          status: "archived"
        }
      ]) ?? [])
    }, m !== d && (this._threads = this.adapter.threads?.map((v) => v.id) ?? Nn), _ !== f && (this._archivedThreads = this.adapter.archivedThreads?.map((v) => v.id) ?? Nn), p !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
class Yd {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((a, u) => {
      const d = this.cache.get(a), f = i(d, a, u);
      return this.cache.set(a, f), f;
    });
  }
}
class Dg extends Rf {
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
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = a, this._sourceId = u.id, this._previousText = cs(u), this.setText(this._previousText), this.setRole(u.role), this.setAttachments(u.attachments ?? []), this._nonTextParts = u.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    cs(n) !== this._previousText && this.runtime.append({
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
class Bg {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new Mf();
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
  composer = new rg(this);
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
    this._editComposers.set(n, new Dg(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
    const u = i.speak(cs(a)), d = u.subscribe(() => {
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
    this.import(xl.fromArray(n ?? []));
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
const Fg = Object.freeze([]), Ug = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class $g extends Bg {
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
  _converter = new Yd();
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
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? Fg, this._capabilities = {
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
          this._converter = new Yd();
        else if (a.isRunning === n.isRunning && a.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, f, p) => {
        if (!n.convertMessage)
          return f;
        const m = p === (n.messages?.length ?? 0) - 1, _ = Af(m, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !ug(d.status) || d.status === _))
          return d;
        const v = n.convertMessage(f, p), E = Sl(v, p.toString(), _);
        return E[pr] = f, E;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const f = u[d], p = u[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, f);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), Ug(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
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
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(cs(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
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
    const i = new Mf();
    i.import(xl.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(gg).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const qd = (r) => r.adapters?.threadList ?? {};
class Hg extends eg {
  threads;
  constructor(n) {
    super(), this.threads = new zg(qd(n), () => new $g(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(qd(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const Vg = (r) => {
  const [n] = b.useState(() => new Hg(r));
  b.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = jg() ?? {};
  return b.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), b.useMemo(() => new Gy(n), [n]);
};
function Wg(r, n) {
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
function Yg(r) {
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
let is = null;
function qg(r, n) {
  r.currentIndex = 0;
  const i = is;
  is = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    is = i;
  }
}
function kl() {
  if (!is)
    throw new Error("No resource fiber available");
  return is;
}
function Bf(r, n) {
  const i = r[Ff];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const Ff = /* @__PURE__ */ Symbol("fnSymbol");
function Ki(r, n) {
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
function ds(r) {
  r.isMounted = !1, Yg(r);
}
function fs(r, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return qg(r, () => {
    r.renderContext = i;
    try {
      i.state = Bf(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function hs(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, Wg(n, r);
}
const Qg = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, Qd = Qg ? b.useEffect : b.useLayoutEffect;
function bl(r) {
  const [, n] = b.useState({}), i = b.useMemo(() => Ki(r.type, () => n({})), [r.type]), a = fs(i, r.props);
  return Qd(() => () => ds(i), [i]), Qd(() => {
    hs(i, a);
  }), a.state;
}
const Ji = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, os = (r, n, i) => n === r;
let dr;
const il = () => {
  if (dr)
    return dr;
  const r = () => ({
    apis: /* @__PURE__ */ new Map(),
    nextId: 0,
    listeners: /* @__PURE__ */ new Set()
  });
  if (typeof window > "u")
    return dr = r(), dr;
  const n = window.__ASSISTANT_UI_DEVTOOLS_HOOK__;
  if (n)
    return dr = n, n;
  const i = r();
  return window.__ASSISTANT_UI_DEVTOOLS_HOOK__ = i, dr = i, i;
};
class jn {
  static MAX_EVENT_LOGS_PER_API = 200;
  static register(n) {
    const i = il();
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
      const p = il();
      p.apis.get(a) && (d?.(), f?.(), p.apis.delete(a), jn.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    il().listeners.forEach((a) => a(n));
  }
}
function Te(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[Ff] = r, n;
}
const Gg = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function Kg(r) {
  const n = kl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (f) => {
        const p = d.value, m = typeof f == "function" ? f(p) : f;
        Object.is(p, m) || (d.value = m, Gg(n));
      }
    };
    n.cells[i] = d;
  }
  const a = n.cells[i];
  if (a.type !== "state")
    throw new Error("Hook order changed between renders");
  return a;
}
function zt(r) {
  const n = Kg(r);
  return [n.value, n.set];
}
function Jg() {
  const r = kl(), n = r.currentIndex++;
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
  const i = kl(), a = Jg();
  i.renderContext.commitTasks.push({
    effect: r,
    deps: n,
    cellIndex: a
  });
}
function mr(r) {
  const [n] = zt(() => ({
    current: r
  }));
  return n;
}
const Xg = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, he = (r, n) => {
  const i = mr();
  return i.current || (i.current = { value: r(), deps: n }), Xg(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, Zg = (r, n) => he(() => r, n);
function as(r, n) {
  const [i, a] = zt({}), u = he(() => Ki(r.type, () => a({})), [r.type]), d = n ? he(() => r.props, n) : r.props, f = he(() => fs(u, d), [u, d, i]);
  return Xe(() => () => ds(u), [u]), Xe(() => {
    hs(u, f);
  }, [u, f]), f.state;
}
function Dt(r) {
  return Bf(r.type, r.props);
}
function Uf(r, n, i) {
  const [a, u] = zt(0), d = Zg(() => u((_) => _ + 1), []), [f] = zt(() => /* @__PURE__ */ new Map()), p = he(() => n, i), m = he(() => {
    const _ = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const v in r) {
      const E = r[v], S = p(E, v);
      let R = f.get(v);
      (!R || R.resource !== S.type) && (R && _.remove.push(v), R = Ki(S.type, d), _.add.push([v, R]));
      const A = fs(R, S.props);
      _.commit.push([v, A]), _.return[v] = A.state;
    }
    if (f.size > _.commit.length - _.add.length + _.remove.length)
      for (const v of f.keys())
        v in r || _.remove.push(v);
    return _;
  }, [r, p, a]);
  return Xe(() => () => {
    for (const _ of f.keys())
      ds(f.get(_)), f.delete(_);
  }, []), Xe(() => {
    for (const _ of m.remove)
      ds(f.get(_)), f.delete(_);
    for (const [_, v] of m.add)
      f.set(_, v);
    for (const [_, v] of m.commit)
      hs(f.get(_), v);
  }, [m]), m.return;
}
const ey = 50;
let Ot = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class ty {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Ot.schedulers.add(this), ny();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const ny = () => {
  Ot.isScheduled || (Ot.isScheduled = !0, queueMicrotask($f));
}, $f = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of Ot.schedulers)
      if (Ot.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > ey)
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
    Ot.schedulers.clear(), Ot.isScheduled = !1;
  }
}, hl = (r) => {
  const n = Ot;
  Ot = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = r();
    return $f(), i;
  } finally {
    Ot = n;
  }
}, ry = Te((r) => {
  const [, n] = zt(r.element), i = as(r.element), a = mr(/* @__PURE__ */ new Set()).current, u = mr(i);
  return Xe(() => {
    i !== u.current && (u.current = i, a.forEach((f) => f()));
  }), he(() => ({
    getState: () => u.current,
    subscribe: (f) => (a.add(f), () => a.delete(f)),
    render: (f) => {
      const p = r.element !== f;
      r.element = f, r.onRender(p) && n(f);
    },
    unmount: r.onUnmount
  }), []);
}), sy = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (p) => i ? p : (i = !0, hl(() => {
      p && (a = fs(f, u)), !d.isDirty && hs(f, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, ds(f);
    }
  }, d = new ty(() => {
    a = fs(f, u), !(d.isDirty || !i) && hs(f, a);
  }), f = Ki(ry, () => d.markDirty());
  return hl(() => {
    d.markDirty();
  }), a.state;
}, ls = /* @__PURE__ */ Symbol("tap.Context"), Hf = (r) => ({
  [ls]: r
}), Vf = (r, n, i) => {
  const a = r[ls];
  r[ls] = n;
  try {
    return i();
  } finally {
    r[ls] = a;
  }
}, Wf = (r) => r[ls], Gd = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (_, v) => {
    const E = typeof _ == "function" ? _(n) : _;
    if (!Object.is(E, n)) {
      const S = n;
      n = v ?? (typeof E != "object" || E === null) ? E : Object.assign({}, n, E), i.forEach((R) => R(n, S));
    }
  }, u = () => n, p = { setState: a, getState: u, getInitialState: () => m, subscribe: (_) => (i.add(_), () => i.delete(_)) }, m = n = r(a, u, p);
  return p;
}, iy = ((r) => r ? Gd(r) : Gd), oy = (r) => r;
function ay(r, n = oy) {
  const i = Kt.useSyncExternalStore(
    r.subscribe,
    Kt.useCallback(() => n(r.getState()), [r, n]),
    Kt.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return Kt.useDebugValue(i), i;
}
const Kd = (r) => {
  const n = iy(r), i = (a) => ay(n, a);
  return Object.assign(i, n), i;
}, ly = ((r) => r ? Kd(r) : Kd);
function Jd(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function Yf(...r) {
  return (n) => {
    let i = !1;
    const a = r.map((u) => {
      const d = Jd(u, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : Jd(r[u], null);
        }
      };
  };
}
function Xi(...r) {
  return b.useCallback(Yf(...r), r);
}
const qf = Te((r) => {
  const n = he(() => sy(r, { mount: !1 }), [r.type]);
  return Xe(() => {
    n.render(r);
  }), n;
});
class uy {
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
  const i = mr(r);
  Xe(() => {
    i.current = r;
  });
  const a = he(() => new Proxy({}, new uy(i)), []), u = n?.key, d = r.getState();
  return he(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, $i = Te((r) => {
  const n = mr(r.get);
  return Xe(() => {
    n.current = r.get;
  }), he(() => Qe({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), cy = Te((r) => {
  const n = as(r.scopeElement);
  return he(() => [r.fieldName, n], [r.fieldName, n]);
}), dy = Te((r) => {
  const { on: n, subscribe: i, ...a } = r, u = mr({ on: n, subscribe: i });
  Xe(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = Uf(a, (f, p) => cy({
    fieldName: p,
    scopeElement: f
  }), []);
  return he(() => {
    const f = Object.fromEntries(Object.values(d)), { on: p, subscribe: m } = u.current;
    return p && (f.on = (_, v) => p(_, v)), m && (f.subscribe = (_) => m(_)), f;
  }, [d]);
}), Qf = Hf(null), fy = (r, n) => Vf(Qf, r, n), Gf = () => {
  const r = Wf(Qf);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, hy = Te(({ toolkit: r }) => {
  const [n, i] = zt(() => ({
    tools: {}
  })), a = Gf();
  Xe(() => {
    if (!r)
      return;
    const d = [];
    for (const [m, _] of Object.entries(r))
      _.render && d.push(u(m, _.render));
    const f = Object.entries(r).reduce((m, [_, v]) => {
      const { render: E, ...S } = v;
      return m[_] = S, m;
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
}), py = Te(() => he(() => {
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
}, [])), Kf = Hf(null), my = (r, n) => Vf(Kf, r, n), Tl = () => {
  const r = Wf(Kf);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, gy = Te(() => {
  const [r] = zt(() => ({})), n = new If();
  return At({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), yy = Te(({ threads: r, modelContext: n, tools: i }) => {
  const a = Dt(py()), { threads: u, tools: d, modelContext: f } = my(a, () => {
    const m = as(n ?? gy(), [n]);
    return fy(m.api, () => ({
      modelContext: m,
      tools: as(i ?? hy({}), [i]),
      threads: as(r, [r])
    }));
  }), p = he(() => ({
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
}), vy = (r) => {
  const n = () => r.getState().api.threads.item("main");
  return {
    threads: Qe({
      source: "root",
      query: {},
      get: () => r.getState().api.threads
    }),
    tools: Qe({
      source: "root",
      query: {},
      get: () => r.getState().api.tools
    }),
    modelContext: Qe({
      source: "root",
      query: {},
      get: () => r.getState().api.modelContext
    }),
    thread: Qe({
      source: "threads",
      query: { type: "main" },
      get: () => r.getState().api.threads.thread("main")
    }),
    threadListItem: Qe({
      source: "threads",
      query: { type: "main" },
      get: () => n()
    }),
    composer: Qe({
      source: "thread",
      query: {},
      get: () => r.getState().api.threads.thread("main").composer
    }),
    on(i, a) {
      const { event: u, scope: d } = Ji(i);
      if (d === "*")
        return r.getState().api.on(u, a);
      if (os("thread", d) || os("thread-list-item", d) || os("composer", d))
        return r.getState().api.on(u, (f) => {
          f.threadId === n().getState().id && a(f);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, _y = (r) => {
  const n = Cl(), i = bl(qf(yy(r))), a = b.useMemo(() => vy(i), [i]);
  return b.useMemo(() => Xf(n, a), [n, a]);
}, Qe = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, Hi = () => () => {
}, Jf = b.createContext({
  threads: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Threads is only available inside <AssistantProvider />");
    }
  }),
  tools: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Tools is only available inside <AssistantProvider />");
    }
  }),
  modelContext: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("ModelContext is only available inside <AssistantProvider />");
    }
  }),
  threadListItem: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("ThreadListItem is only available inside <AssistantProvider />");
    }
  }),
  thread: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Thread is only available inside <AssistantProvider />");
    }
  }),
  composer: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Composer is only available inside <AssistantProvider />");
    }
  }),
  message: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Message is only available inside <ThreadPrimitive.Messages />");
    }
  }),
  part: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Part is only available inside <MessagePrimitive.Parts />");
    }
  }),
  attachment: Qe({
    source: null,
    query: {},
    get: () => {
      throw new Error("Attachment is only available inside <MessagePrimitive.Attachments /> or <ComposerPrimitive.Attachments />");
    }
  }),
  subscribe: Hi,
  on: (r) => {
    const { scope: n } = Ji(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), Cl = () => b.useContext(Jf), Il = (r) => {
  const n = Cl(), i = bl(dy(r));
  return b.useMemo(() => Xf(n, i), [n, i]);
}, wy = (r) => _y(r);
function _t(r) {
  return r ? wy(r) : Cl();
}
const Sy = (r, n) => r === Hi ? n : n === Hi ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, Xf = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: Sy(r.subscribe, i ?? Hi)
  };
}, Zi = ({ api: r, children: n, devToolsVisible: i = !0 }) => (b.useEffect(() => {
  if (!(!i || !r.subscribe))
    return jn.register(r);
}, [r, i]), g.jsx(Jf.Provider, { value: r, children: n }));
class Xd {
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
const we = (r) => {
  const n = _t(), i = b.useMemo(() => new Xd(n), [n]), a = b.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (b.useDebugValue(a), a instanceof Xd)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, ol = (r, n) => {
  const i = _t(), a = b.useRef(n);
  b.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = Ji(r);
  b.useEffect(() => i.on({ scope: u, event: d }, (f) => a.current(f)), [i, u, d]);
};
function xy(r, n) {
  function i(a) {
    const u = b.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function Zf(r, n) {
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
const eh = b.createContext(null), Ey = xy(eh, "ThreadPrimitive.Viewport"), { useThreadViewport: Vi, useThreadViewportStore: Rl } = Zf(Ey, "useThreadViewport"), ky = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function by(r, n = Ty) {
  ky(r);
  const i = b.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return b.useDebugValue(i), i;
}
const Ty = (r) => r;
function Cy(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? by(d, u) : null;
  }
  return n;
}
function Iy(r) {
  const n = _t(), i = we(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const qt = Cy(Iy), Dn = (r) => {
  const [, n] = zt(r.getState);
  return Xe(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, Ry = Te(({ runtime: r }) => {
  const n = Dn(r), i = Tl();
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
}), ps = (r) => {
  const n = he(() => Object.fromEntries(r), [r]), i = Uf(n, (d) => d, []), a = he(() => Object.keys(i), [i]);
  return {
    state: he(() => {
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
}, th = Te(({ runtime: r }) => {
  const n = Dn(r);
  return At({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), Ay = Te(({ runtime: r, index: n }) => {
  const i = he(() => r.getAttachmentByIndex(n), [r, n]);
  return Dt(th({
    runtime: i
  }));
}), nh = Te(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = Dn(i), u = Tl();
  Xe(() => {
    const p = [], m = [
      "send",
      "attachment-add"
    ];
    for (const _ of m) {
      const v = i.unstable_on(_, () => {
        u.emit(`composer.${_}`, {
          threadId: r.current,
          ...n && { messageId: n.current }
        });
      });
      p.push(v);
    }
    return () => {
      for (const _ of p)
        _();
    };
  }, [i, u, r, n]);
  const d = ps(a.attachments.map((p, m) => [
    p.id,
    Ay({ runtime: i, index: m })
  ])), f = he(() => ({
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
}), My = Te(({ runtime: r }) => {
  const n = Dn(r);
  return At({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), Ny = Te(({ runtime: r, index: n }) => {
  const i = he(() => r.getAttachmentByIndex(n), [r, n]);
  return Dt(th({ runtime: i }));
}), Py = Te(({ runtime: r, index: n }) => {
  const i = he(() => r.getMessagePartByIndex(n), [r, n]);
  return Dt(My({ runtime: i }));
}), jy = Te(({ runtime: r, threadIdRef: n }) => {
  const i = Dn(r), [a, u] = zt(!1), [d, f] = zt(!1), p = he(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), m = Dt(nh({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: p
  })), _ = ps(i.content.map((S, R) => [
    "toolCallId" in S && S.toolCallId != null ? `toolCallId-${S.toolCallId}` : `index-${R}`,
    Py({ runtime: r, index: R })
  ])), v = ps(i.attachments?.map((S, R) => [
    S.id,
    Ny({ runtime: r, index: R })
  ]) ?? []), E = he(() => ({
    ...i,
    parts: _.state,
    composer: m.state,
    isCopied: a,
    isHovering: d
  }), [
    i,
    _.state,
    m.state,
    a,
    d
  ]);
  return At({
    getState: () => E,
    composer: m.api,
    reload: (S) => r.reload(S),
    speak: () => r.speak(),
    stopSpeaking: () => r.stopSpeaking(),
    submitFeedback: (S) => r.submitFeedback(S),
    switchToBranch: (S) => r.switchToBranch(S),
    getCopyText: () => r.unstable_getCopyText(),
    part: (S) => "index" in S ? _.api({ index: S.index }) : _.api({ key: `toolCallId-${S.toolCallId}` }),
    attachment: (S) => "id" in S ? v.api({ key: S.id }) : v.api(S),
    setIsCopied: u,
    setIsHovering: f,
    __internal_getRuntime: () => r
  }, {
    key: i.id
  });
}), Ly = Te(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = he(() => r.getMessageById(n), [r, n]);
  return Dt(jy({ runtime: a, threadIdRef: i }));
}), Oy = Te(({ runtime: r }) => {
  const n = Dn(r), i = Tl();
  Xe(() => {
    const p = [], m = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const _ of m) {
      const v = r.unstable_on(_, () => {
        const E = r.getState()?.threadId || "unknown";
        i.emit(`thread.${_}`, {
          threadId: E
        });
      });
      p.push(v);
    }
    return () => {
      for (const _ of p)
        _();
    };
  }, [r]);
  const a = he(() => ({
    get current() {
      return r.getState().threadId;
    }
  }), [r]), u = Dt(nh({
    runtime: r.composer,
    threadIdRef: a
  })), d = ps(n.messages.map((p) => [
    p.id,
    Ly({ runtime: r, id: p.id, threadIdRef: a })
  ])), f = he(() => ({
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
}), zy = Te(({ runtime: r, id: n }) => {
  const i = he(() => r.getItemById(n), [r, n]);
  return Dt(Ry({
    runtime: i
  }));
}), Dy = Te(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = Dn(r), a = Dt(Oy({
    runtime: r.main
  })), u = ps(Object.keys(i.threadItems).map((f) => [
    f,
    zy({ runtime: r, id: f })
  ])), d = he(() => ({
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
      const { index: p, archived: m = !1 } = f, _ = m ? d.archivedThreadIds[p] : d.threadIds[p];
      return u.api({ key: _ });
    },
    switchToThread: (f) => {
      r.switchToThread(f);
    },
    switchToNewThread: () => {
      r.switchToNewThread();
    },
    __internal_getAssistantRuntime: () => n
  });
}), By = Te((r) => {
  const n = Gf();
  return Xe(() => r.registerModelContextProvider(n), [r, n]), Dt(Dy({
    runtime: r.threads,
    __internal_assistantRuntime: r
  }));
}), al = (r) => {
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
}, Fy = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = al((f) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: f
      }
    });
  }), a = al((f) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: f
      }
    });
  }), u = al((f) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: f
      }
    });
  }), d = ly(() => ({
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
}, ms = (r) => r, Uy = (r) => {
  const n = Rl({ optional: !0 }), [i] = b.useState(() => Fy(r));
  return b.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), b.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && ms(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), b.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && ms(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, rh = ({ children: r, options: n = {} }) => {
  const i = Uy(n), [a] = b.useState(() => ({
    useThreadViewport: i
  }));
  return g.jsx(eh.Provider, { value: a, children: r });
}, $y = (r) => r._core?.RenderComponent, Hy = ({ children: r, runtime: n }) => {
  const i = _t({
    threads: By(n)
  }), a = $y(n);
  return g.jsxs(Zi, { api: i, children: [a && g.jsx(a, {}), g.jsx(rh, { children: r })] });
}, Vy = b.memo(Hy), Wy = ({ index: r, children: n }) => {
  const i = _t(), a = Il({
    message: $i({
      source: "thread",
      query: { type: "index", index: r },
      get: () => i.thread().message({ index: r })
    }),
    composer: $i({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: r }).composer
    }),
    on(u, d) {
      const f = () => i.thread().message({ index: r }), { event: p, scope: m } = Ji(u);
      return !os("composer", m) && !os("message", m) ? i.on(u, d) : i.on({ scope: "thread", event: p }, (_) => {
        _.messageId === f().getState().id && d(_);
      });
    }
  });
  return g.jsx(Zi, { api: a, children: n });
}, Yy = ({ index: r, children: n }) => {
  const i = _t(), a = Il({
    part: $i({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return g.jsx(Zi, { api: a, children: n });
}, qy = Te(({ text: r, isRunning: n }) => {
  const i = he(() => ({
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
}), Qy = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = bl(qf(qy({ text: r, isRunning: n }))), u = Il({
    part: $i({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return g.jsx(Zi, { api: u, children: i });
};
class Gy {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new Ng(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
    return this._core.threads.getMainThreadRuntimeCore().import(xl.fromArray(n ?? []));
  }
}
function eo(r) {
  const n = b.useRef(r);
  return b.useEffect(() => {
    n.current = r;
  }), b.useMemo(() => (...i) => n.current?.(...i), []);
}
const Ky = b.createContext(null);
function Jy(r) {
  const n = b.useContext(Ky);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: Gw, useSmoothStatusStore: Xy } = Zf(Jy, "useSmoothStatus");
class Zy {
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
const ll = Object.freeze({
  type: "running"
}), ev = (r, n = !1) => {
  const { text: i } = r, a = we(({ message: v }) => v.id), u = b.useRef(a), [d, f] = b.useState(i), p = Xy({ optional: !0 }), m = eo((v) => {
    if (f(v), p) {
      const E = d !== v || r.status.type === "running" ? ll : r.status;
      ms(p).setState(E, !0);
    }
  });
  b.useEffect(() => {
    if (p) {
      const v = n && (d !== i || r.status.type === "running") ? ll : r.status;
      ms(p).setState(v, !0);
    }
  }, [p, n, i, d, r.status]);
  const [_] = b.useState(new Zy(i, m));
  return b.useEffect(() => {
    if (!n) {
      _.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(_.targetText)) {
      u.current = a, m(i), _.currentText = i, _.targetText = i, _.stop();
      return;
    }
    _.targetText = i, _.start();
  }, [m, _, a, n, i]), b.useEffect(() => () => {
    _.stop();
  }, [_]), b.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : ll
  } : r, [n, d, r, i]);
};
var tv = /* @__PURE__ */ Symbol.for("react.lazy"), Wi = Ym[" use ".trim().toString()];
function nv(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function sh(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === tv && "_payload" in r && nv(r._payload);
}
// @__NO_SIDE_EFFECTS__
function ih(r) {
  const n = /* @__PURE__ */ rv(r), i = b.forwardRef((a, u) => {
    let { children: d, ...f } = a;
    sh(d) && typeof Wi == "function" && (d = Wi(d._payload));
    const p = b.Children.toArray(d), m = p.find(iv);
    if (m) {
      const _ = m.props.children, v = p.map((E) => E === m ? b.Children.count(_) > 1 ? b.Children.only(null) : b.isValidElement(_) ? _.props.children : null : E);
      return /* @__PURE__ */ g.jsx(n, { ...f, ref: u, children: b.isValidElement(_) ? b.cloneElement(_, void 0, v) : null });
    }
    return /* @__PURE__ */ g.jsx(n, { ...f, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var oh = /* @__PURE__ */ ih("Slot");
// @__NO_SIDE_EFFECTS__
function rv(r) {
  const n = b.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if (sh(u) && typeof Wi == "function" && (u = Wi(u._payload)), b.isValidElement(u)) {
      const f = av(u), p = ov(d, u.props);
      return u.type !== b.Fragment && (p.ref = a ? Yf(a, f) : f), b.cloneElement(u, p);
    }
    return b.Children.count(u) > 1 ? b.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var sv = /* @__PURE__ */ Symbol("radix.slottable");
function iv(r) {
  return b.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === sv;
}
function ov(r, n) {
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
function av(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var lv = [
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
], vr = lv.reduce((r, n) => {
  const i = /* @__PURE__ */ ih(`Primitive.${n}`), a = b.forwardRef((u, d) => {
    const { asChild: f, ...p } = u, m = f ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g.jsx(m, { ...p, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function us(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const Al = (r, n, i = []) => {
  const a = b.forwardRef((u, d) => {
    const f = {}, p = {};
    Object.keys(u).forEach((_) => {
      i.includes(_) ? f[_] = u[_] : p[_] = u[_];
    });
    const m = n(f) ?? void 0;
    return g.jsx(vr.button, { type: "button", ...p, ref: d, disabled: p.disabled || !m, onClick: us(p.onClick, m) });
  });
  return a.displayName = r, a;
};
function uv(r, n = globalThis?.document) {
  const i = eo(r);
  b.useEffect(() => {
    const a = (u) => {
      u.key === "Escape" && i(u);
    };
    return n.addEventListener("keydown", a, { capture: !0 }), () => n.removeEventListener("keydown", a, { capture: !0 });
  }, [i, n]);
}
const _s = (r) => {
  const n = b.useRef(void 0);
  return b.useCallback((a) => {
    n.current && n.current(), a && (n.current = r(a));
  }, [r]);
}, ah = (r, n) => {
  const i = b.useCallback((a) => {
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
}, Zd = b.createContext(!1), ef = (r, n) => {
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
}, lh = ({ children: r, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const a = we(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: m, message: _ }) => _.isLast && _.role === "assistant" && _.index >= 1 && m.messages.at(_.index - 1)?.role === "user"
  ), u = Rl({ optional: !0 }), d = b.useContext(Zd), f = b.useCallback((m) => {
    if (!u || d)
      return;
    const _ = () => {
      const v = u.getState();
      if (v.turnAnchor === "top" && a) {
        const { viewport: E, inset: S, userMessage: R } = v.height, A = ef(n, m), M = ef(i, m), $ = R <= A ? R : M, Y = Math.max(0, E - S - $);
        m.style.minHeight = `${Y}px`, m.style.flexShrink = "0", m.style.transition = "min-height 0s";
      } else
        m.style.minHeight = "", m.style.flexShrink = "", m.style.transition = "";
    };
    return _(), u.subscribe(_);
  }, [
    u,
    a,
    d,
    n,
    i
  ]), p = _s(f);
  return g.jsx(Zd.Provider, { value: !0, children: g.jsx(oh, { ref: p, children: r }) });
};
lh.displayName = "ThreadPrimitive.ViewportSlack";
const cv = () => {
  const r = _t(), n = we(() => r.message()), i = b.useCallback((a) => {
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
}, dv = () => {
  const r = Vi((u) => u.turnAnchor), n = Vi((u) => u.registerUserMessageHeight), i = we(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = b.useCallback((u) => u.offsetHeight, []);
  return ah(i ? n : null, a);
}, Ml = b.forwardRef((r, n) => {
  const i = cv(), a = dv(), u = Xi(n, i, a);
  return g.jsx(lh, { children: g.jsx(vr.div, { ...r, ref: u }) });
});
Ml.displayName = "MessagePrimitive.Root";
const fv = () => we(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), uh = b.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = ev(fv(), r);
  return g.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
uh.displayName = "MessagePartPrimitive.Text";
const hv = () => we(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), ch = b.forwardRef((r, n) => {
  const { image: i } = hv();
  return g.jsx(vr.img, { src: i, ...r, ref: n });
});
ch.displayName = "MessagePartPrimitive.Image";
const dh = ({ children: r }) => we(({ part: i }) => i.status.type === "running") ? r : null;
dh.displayName = "MessagePartPrimitive.InProgress";
const tf = (r) => Symbol.iterator in r, nf = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), rf = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, pv = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function mv(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : tf(r) && tf(n) ? nf(r) && nf(n) ? rf(r, n) : pv(r, n) : rf(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function gv(r) {
  const n = Kt.useRef(void 0);
  return (i) => {
    const a = r(i);
    return mv(n.current, a) ? n.current : n.current = a;
  };
}
const sf = (r) => {
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
}, yv = (r) => {
  const n = [], i = sf("toolGroup"), a = sf("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, vv = () => {
  const r = we(gv((n) => n.message.parts.map((i) => i.type)));
  return b.useMemo(() => r.length === 0 ? [] : yv(r), [r]);
}, _v = ({ Fallback: r, ...n }) => {
  const i = we(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? g.jsx(i, { ...n }) : null;
}, Gt = {
  Text: () => g.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [g.jsx(uh, {}), g.jsx(dh, { children: g.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => g.jsx(ch, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, wv = ({ components: { Text: r = Gt.Text, Reasoning: n = Gt.Reasoning, Image: i = Gt.Image, Source: a = Gt.Source, File: u = Gt.File, Unstable_Audio: d = Gt.Unstable_Audio, tools: f = {} } = {} }) => {
  const p = _t(), m = we(({ part: v }) => v), _ = m.type;
  if (_ === "tool-call") {
    const v = p.part().addToolResult, E = p.part().resumeToolCall;
    if ("Override" in f)
      return g.jsx(f.Override, { ...m, addResult: v, resume: E });
    const S = f.by_name?.[m.toolName] ?? f.Fallback;
    return g.jsx(_v, { ...m, Fallback: S, addResult: v, resume: E });
  }
  if (m.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (_) {
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
      const v = _;
      throw new Error(`Unknown message part type: ${v}`);
  }
}, Bi = b.memo(({ index: r, components: n }) => g.jsx(Yy, { index: r, children: g.jsx(wv, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
Bi.displayName = "MessagePrimitive.PartByIndex";
const Sv = ({ status: r, component: n }) => g.jsx(Qy, { text: "", isRunning: r.type === "running", children: g.jsx(n, { type: "text", text: "", status: r }) }), xv = Object.freeze({
  type: "complete"
}), Ev = ({ components: r }) => {
  const n = we((i) => i.message.status ?? xv);
  return r?.Empty ? g.jsx(r.Empty, { status: n }) : g.jsx(Sv, { status: n, component: r?.Text ?? Gt.Text });
}, kv = b.memo(Ev, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), Nl = ({ components: r }) => {
  const n = we(({ message: u }) => u.parts.length), i = vv(), a = b.useMemo(() => n === 0 ? g.jsx(kv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return g.jsx(Bi, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? Gt.ToolGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (f, p) => g.jsx(Bi, { index: u.startIndex + p, components: r }, p)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? Gt.ReasoningGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (f, p) => g.jsx(Bi, { index: u.startIndex + p, components: r }, p)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return g.jsx(g.Fragment, { children: a });
};
Nl.displayName = "MessagePrimitive.Parts";
const fh = ({ children: r }) => we(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
fh.displayName = "MessagePrimitive.Error";
const hh = () => {
  const r = _t(), n = we((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = b.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, bv = Al("ComposerPrimitive.Send", hh), ph = b.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = hh(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return g.jsx(vr.form, { ...n, ref: i, onSubmit: us(r, u) });
});
ph.displayName = "ComposerPrimitive.Root";
function pl() {
  return pl = Object.assign ? Object.assign.bind() : function(r) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }
    return r;
  }, pl.apply(null, arguments);
}
function Tv(r, n) {
  if (r == null) return {};
  var i = {};
  for (var a in r) if ({}.hasOwnProperty.call(r, a)) {
    if (n.indexOf(a) !== -1) continue;
    i[a] = r[a];
  }
  return i;
}
var Cv = b.useLayoutEffect, Iv = function(n) {
  var i = Kt.useRef(n);
  return Cv(function() {
    i.current = n;
  }), i;
}, of = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, Rv = function(n, i) {
  var a = Kt.useRef();
  return Kt.useCallback(function(u) {
    n.current = u, a.current && of(a.current, null), a.current = i, i && of(i, u);
  }, [i]);
}, af = {
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
}, Av = function(n) {
  Object.keys(af).forEach(function(i) {
    n.style.setProperty(i, af[i], "important");
  });
}, lf = Av, Je = null, uf = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function Mv(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), Je || (Je = document.createElement("textarea"), Je.setAttribute("tabindex", "-1"), Je.setAttribute("aria-hidden", "true"), lf(Je)), Je.parentNode === null && document.body.appendChild(Je);
  var u = r.paddingSize, d = r.borderSize, f = r.sizingStyle, p = f.boxSizing;
  Object.keys(f).forEach(function(S) {
    var R = S;
    Je.style[R] = f[R];
  }), lf(Je), Je.value = n;
  var m = uf(Je, r);
  Je.value = n, m = uf(Je, r), Je.value = "x";
  var _ = Je.scrollHeight - u, v = _ * i;
  p === "border-box" && (v = v + u + d), m = Math.max(v, m);
  var E = _ * a;
  return p === "border-box" && (E = E + u + d), m = Math.min(E, m), [m, _];
}
var cf = function() {
}, Nv = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, Pv = [
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
], jv = !!document.documentElement.currentStyle, Lv = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = Nv(Pv, i), u = a.boxSizing;
  if (u === "")
    return null;
  jv && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), f = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: f
  };
}, Ov = Lv;
function Pl(r, n, i) {
  var a = Iv(i);
  b.useLayoutEffect(function() {
    var u = function(f) {
      return a.current(f);
    };
    if (r)
      return r.addEventListener(n, u), function() {
        return r.removeEventListener(n, u);
      };
  }, []);
}
var zv = function(n, i) {
  Pl(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, Dv = function(n) {
  Pl(window, "resize", n);
}, Bv = function(n) {
  Pl(document.fonts, "loadingdone", n);
}, Fv = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], Uv = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, f = n.onChange, p = f === void 0 ? cf : f, m = n.onHeightChange, _ = m === void 0 ? cf : m, v = Tv(n, Fv), E = v.value !== void 0, S = b.useRef(null), R = Rv(S, i), A = b.useRef(0), M = b.useRef(), $ = function() {
    var de = S.current, ye = a && M.current ? M.current : Ov(de);
    if (ye) {
      M.current = ye;
      var J = Mv(ye, de.value || de.placeholder || "x", d, u), fe = J[0], se = J[1];
      A.current !== fe && (A.current = fe, de.style.setProperty("height", fe + "px", "important"), _(fe, {
        rowHeight: se
      }));
    }
  }, Y = function(de) {
    E || $(), p(de);
  };
  return b.useLayoutEffect($), zv(S, function() {
    if (!E) {
      var ue = S.current.value;
      requestAnimationFrame(function() {
        var de = S.current;
        de && ue !== de.value && $();
      });
    }
  }), Dv($), Bv($), /* @__PURE__ */ b.createElement("textarea", pl({}, v, {
    onChange: Y,
    ref: R
  }));
}, $v = /* @__PURE__ */ b.forwardRef(Uv);
const mh = (r) => {
  const n = eo(r), i = Vi((a) => a.onScrollToBottom);
  b.useEffect(() => i(n), [i, n]);
}, gh = b.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: f = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: m = !0, unstable_focusOnScrollToBottom: _ = !0, unstable_focusOnThreadSwitched: v = !0, addAttachmentOnPaste: E = !0, ...S }, R) => {
  const A = _t(), M = we(({ composer: K }) => K.isEditing ? K.text : ""), $ = n ? oh : $v, Y = we(({ thread: K, composer: ve }) => K.isDisabled || ve.dictation?.inputDisabled) || i, ue = b.useRef(null), de = Xi(R, ue);
  uv((K) => {
    if (!p || !ue.current?.contains(K.target))
      return;
    const ve = A.composer();
    ve.getState().canCancel && (ve.cancel(), K.preventDefault());
  });
  const ye = (K) => {
    Y || !f || K.nativeEvent.isComposing || K.key === "Enter" && K.shiftKey === !1 && (A.thread().getState().isRunning || (K.preventDefault(), ue.current?.closest("form")?.requestSubmit()));
  }, J = async (K) => {
    if (!E)
      return;
    const ve = A.thread().getState().capabilities, Oe = Array.from(K.clipboardData?.files || []);
    if (ve.attachments && Oe.length > 0)
      try {
        K.preventDefault(), await Promise.all(Oe.map((Ce) => A.composer().addAttachment(Ce)));
      } catch (Ce) {
        console.error("Error adding attachment:", Ce);
      }
  }, fe = r && !Y, se = b.useCallback(() => {
    const K = ue.current;
    !K || !fe || (K.focus({ preventScroll: !0 }), K.setSelectionRange(K.value.length, K.value.length));
  }, [fe]);
  return b.useEffect(() => se(), [se]), mh(() => {
    A.composer().getState().type === "thread" && _ && se();
  }), b.useEffect(() => {
    if (!(A.composer().getState().type !== "thread" || !m))
      return A.on("thread.run-start", se);
  }, [m, se, A]), b.useEffect(() => {
    if (!(A.composer().getState().type !== "thread" || !v))
      return A.on("thread-list-item.switched-to", se);
  }, [v, se, A]), g.jsx($, { name: "input", value: M, ...S, ref: de, disabled: Y, onChange: us(a, (K) => {
    A.composer().getState().isEditing && hl(() => {
      A.composer().setText(K.target.value);
    });
  }), onKeyDown: us(u, ye), onPaste: us(d, J) });
});
gh.displayName = "ComposerPrimitive.Input";
const Hv = () => {
  const r = _t(), n = we(({ composer: a }) => !a.canCancel), i = b.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, Vv = Al("ComposerPrimitive.Cancel", Hv), yh = b.forwardRef((r, n) => g.jsx(vr.div, { ...r, ref: n }));
yh.displayName = "ThreadPrimitive.Root";
const Wv = (r) => we(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), ml = ({ children: r, ...n }) => Wv(n) ? r : null;
ml.displayName = "ThreadPrimitive.If";
const Yv = (r) => {
  const n = eo(r), i = b.useCallback((a) => {
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
}, qv = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = b.useRef(null), d = Rl();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const f = b.useRef(0), p = b.useRef(null), m = b.useCallback((R) => {
    const A = u.current;
    A && (p.current = R, A.scrollTo({ top: A.scrollHeight, behavior: R }));
  }, []), _ = () => {
    const R = u.current;
    if (!R)
      return;
    const A = d.getState().isAtBottom, M = Math.abs(R.scrollHeight - R.scrollTop - R.clientHeight) < 1 || R.scrollHeight <= R.clientHeight;
    !M && f.current < R.scrollTop || (M && (p.current = null), (M || p.current === null) && M !== A && ms(d).setState({
      isAtBottom: M
    })), f.current = R.scrollTop;
  }, v = Yv(() => {
    const R = p.current;
    R ? m(R) : r && d.getState().isAtBottom && m("instant"), _();
  }), E = _s((R) => (R.addEventListener("scroll", _), () => {
    R.removeEventListener("scroll", _);
  }));
  return mh(({ behavior: R }) => {
    m(R);
  }), ol("thread.run-start", () => {
    n && (p.current = "auto", requestAnimationFrame(() => {
      m("auto");
    }));
  }), ol("thread.initialize", () => {
    i && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), ol("thread-list-item.switched-to", () => {
    a && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), Xi(v, E, u);
}, Qv = () => {
  const r = Vi((i) => i.registerViewport), n = b.useCallback((i) => i.clientHeight, []);
  return ah(r, n);
}, vh = b.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, f) => {
  const p = qv({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), m = Qv(), _ = Xi(f, p, m);
  return g.jsx(vr.div, { ...d, ref: _, children: u });
});
vh.displayName = "ThreadPrimitive.ViewportScrollable";
const _h = b.forwardRef(({ turnAnchor: r, ...n }, i) => g.jsx(rh, { options: { turnAnchor: r }, children: g.jsx(vh, { ...n, ref: i }) }));
_h.displayName = "ThreadPrimitive.Viewport";
const wh = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, Gv = () => null, Kv = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? Gv;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, Jv = ({ components: r }) => {
  const n = we(({ message: u }) => u.role), i = we(({ message: u }) => u.composer.isEditing), a = Kv(r, n, i);
  return g.jsx(a, {});
}, Sh = b.memo(({ index: r, components: n }) => g.jsx(Wy, { index: r, children: g.jsx(Jv, { components: n }) }), (r, n) => r.index === n.index && wh(r.components, n.components));
Sh.displayName = "ThreadPrimitive.MessageByIndex";
const xh = ({ components: r }) => {
  const n = we(({ thread: a }) => a.messages.length);
  return b.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => g.jsx(Sh, { index: u, components: r }, u)), [n, r]);
};
xh.displayName = "ThreadPrimitive.Messages";
const Xv = b.memo(xh, (r, n) => wh(r.components, n.components)), Zv = ({ prompt: r, send: n, clearComposer: i = !0, autoSend: a, method: u }) => {
  const d = _t(), f = we(({ thread: _ }) => _.isDisabled), p = n ?? a ?? !1, m = b.useCallback(() => {
    const _ = d.thread().getState().isRunning;
    if (p && !_)
      d.thread().append(r), i && d.composer().setText("");
    else if (i)
      d.composer().setText(r);
    else {
      const v = d.composer().getState().text;
      d.composer().setText(v.trim() ? `${v} ${r}` : r);
    }
  }, [d, p, i, r]);
  return f ? null : m;
}, Eh = Al("ThreadPrimitive.Suggestion", Zv, ["prompt", "send", "clearComposer", "autoSend", "method"]), e_ = 1, vt = Object.freeze({
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
}), t_ = Object.freeze(
  Object.fromEntries(
    Object.entries(dt).map(([r, n]) => [n, r])
  )
), kh = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, bh = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, n_ = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), Jt = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Ae = (r, n = "") => typeof r != "string" ? n : r.trim() || n, Re = (r) => Ae(r) || null, gs = (r) => {
  const n = Ae(r);
  return n ? /^(https?:\/\/|\/)/i.test(n) ? n : `/${n.replace(/^\/+/, "")}` : null;
}, r_ = (r, n = !0) => typeof r == "boolean" ? r : n, jl = (r, n = 6) => Array.isArray(r) ? r.map((i) => Ae(typeof i == "string" ? i : i?.label || i?.title || i?.text)).filter(Boolean).slice(0, n) : [], Th = (r) => {
  if (!Jt(r))
    return null;
  const n = Ae(r.title, "Untitled crystal"), i = gs(r.url);
  return {
    id: Re(r.id || r.productId),
    handle: Re(r.handle),
    title: n,
    url: i || (r.handle ? `/products/${r.handle}` : null),
    image: gs(r.image || r.featuredImage || r.imageUrl),
    price: Re(r.price || r.priceText),
    compareAtPrice: Re(r.compareAtPrice || r.compareAt),
    badge: Re(r.badge || r.tag || r.intent || r.eyebrow),
    summary: Re(r.summary || r.description || r.body),
    reason: Re(r.reason),
    note: Re(r.note || r.ritual || r.howToUse || r.how_to_use),
    ctaLabel: Re(r.ctaLabel || r.buttonLabel || r.linkLabel),
    merchandiseId: Re(r.merchandiseId || r.variantId),
    variantId: Re(r.variantId || r.merchandiseId),
    available: r_(r.available, !0)
  };
}, Ch = (r, n = 6) => Array.isArray(r) ? r.map(Th).filter(Boolean).slice(0, n) : [], s_ = (r) => {
  if (!Jt(r))
    return null;
  const n = Th(r.product || r);
  return n ? {
    eyebrow: Ae(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: Re(r.reason || n.reason),
    note: Re(r.note || r.ritual || n.note),
    ctaLabel: Ae(r.ctaLabel || r.buttonLabel || n.ctaLabel, "View crystal"),
    product: n
  } : null;
}, i_ = (r) => {
  if (!Jt(r))
    return null;
  const n = Ch(r.products, 8);
  return n.length === 0 ? null : {
    eyebrow: Ae(r.eyebrow || r.kicker, "Matched for you"),
    title: Ae(r.title, "Recommended crystals"),
    reason: Re(r.reason || r.description),
    browseUrl: gs(r.browseUrl || r.url),
    browseLabel: Ae(r.browseLabel || r.ctaLabel, "Browse all"),
    products: n
  };
}, o_ = (r) => {
  if (!Jt(r))
    return null;
  const n = jl(r.steps, 6);
  return n.length === 0 && !Ae(r.summary) ? null : {
    eyebrow: Ae(r.eyebrow || r.kicker, "Ritual"),
    title: Ae(r.title, "How to work with this energy"),
    summary: Re(r.summary || r.reason || r.description),
    duration: Re(r.duration),
    steps: n,
    note: Re(r.note),
    disclaimer: Re(r.disclaimer),
    linkedProducts: Ch(r.linkedProducts || r.products, 3)
  };
}, a_ = (r) => {
  if (!Jt(r))
    return null;
  const n = Ae(r.summary || r.description);
  return n ? {
    eyebrow: Ae(r.eyebrow || r.kicker, "Energy blueprint"),
    title: Ae(r.title, "What your energy is asking for"),
    summary: n,
    energyFocus: Re(r.energyFocus || r.energy || r.focus),
    highlights: jl(r.highlights || r.bullets || r.keyPoints, 5),
    disclaimer: Re(r.disclaimer)
  } : null;
}, l_ = (r) => {
  if (!Jt(r))
    return null;
  const n = gs(r.url || r.browseUrl);
  return n ? {
    eyebrow: Ae(r.eyebrow || r.kicker, "Browse deeper"),
    title: Ae(r.title, "Open the full collection"),
    description: Re(r.description || r.reason),
    url: n,
    label: Ae(r.label || r.ctaLabel, "Shop collection"),
    image: gs(r.image || r.imageUrl)
  } : null;
}, u_ = (r) => {
  if (!Jt(r))
    return null;
  const n = jl(r.steps, 5);
  return n.length === 0 ? null : {
    eyebrow: Ae(r.eyebrow || r.kicker, "Next steps"),
    title: Ae(r.title, "What to do next"),
    steps: n,
    closing: Re(r.closing || r.note)
  };
}, c_ = Object.freeze({
  [vt.product_card]: {
    toolName: dt.product_card,
    normalizeProps: s_
  },
  [vt.product_carousel]: {
    toolName: dt.product_carousel,
    normalizeProps: i_
  },
  [vt.ritual_card]: {
    toolName: dt.ritual_card,
    normalizeProps: o_
  },
  [vt.reading_summary]: {
    toolName: dt.reading_summary,
    normalizeProps: a_
  },
  [vt.collection_link]: {
    toolName: dt.collection_link,
    normalizeProps: l_
  },
  [vt.next_steps]: {
    toolName: dt.next_steps,
    normalizeProps: u_
  }
}), ys = (r, n = "component") => {
  if (!Jt(r))
    return null;
  const i = Ae(
    r.component || r.componentType || t_[r.toolName]
  ), a = c_[i];
  if (!a)
    return null;
  const u = a.normalizeProps(
    r.props || r.result?.props || r.result || r.args?.props || r.args || r
  );
  if (!u)
    return null;
  const d = Ae(r.id || r.toolCallId, `${a.toolName}-${n}`);
  return {
    type: "component",
    component: i,
    toolName: a.toolName,
    id: d,
    version: e_,
    props: u
  };
}, zn = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = ys(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, Ll = (r) => {
  const n = [], i = (a, u = 0) => {
    if (u > 3 || a == null)
      return;
    if (Array.isArray(a)) {
      a.forEach((f, p) => {
        const m = ys(f, `${u}-${p}`);
        m && n.push(m);
      });
      return;
    }
    const d = ys(a, `${u}`);
    if (d) {
      n.push(d);
      return;
    }
    Jt(a) && (i(a.components, u + 1), i(a.component, u + 1), i(a.ui?.components, u + 1), i(a.payload?.components, u + 1), i(a.data?.components, u + 1), i(a.data?.ui?.components, u + 1), i(a.metadata?.components, u + 1), i(a.metadata?.ui?.components, u + 1));
  };
  return i(r), zn([], n);
}, df = (r, n = "component") => {
  const i = ys(r, n);
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
}, d_ = (r) => ys(r), Ih = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}, f_ = (r = "") => {
  let n = String(r || "");
  const i = [], a = (u) => {
    const d = [...n.matchAll(u)];
    if (d.length !== 0) {
      for (const f of d) {
        const p = Ih(f[1]);
        p && i.push(p);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(kh()), a(bh()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    payloads: i
  };
}, h_ = (r = "") => {
  const n = String(r || ""), i = [], a = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi;
  let u = 0, d;
  for (; (d = a.exec(n)) !== null; ) {
    d.index > u && i.push({
      type: "text",
      value: n.slice(u, d.index)
    });
    const f = d[0], p = Ih(d[1] || d[2] || "");
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
}, Rh = (r = "") => {
  const { answer: n, payloads: i } = f_(r);
  let a = [];
  for (const u of i)
    a = zn(a, Ll(u));
  return {
    answer: n,
    components: a
  };
}, p_ = (r = "") => {
  const n = String(r || "").toLowerCase();
  for (let i = 0; i < n.length; i += 1)
    for (const { marker: a, minPrefixLength: u } of n_) {
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
}, m_ = (r = "") => {
  const n = kh(), i = bh();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = p_(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, g_ = "section-rendering-askcrystal-chat-product-card", Yi = /* @__PURE__ */ new Map(), zi = /* @__PURE__ */ new Map(), y_ = {
  "--product-card-gap": "12px",
  "--product-card-alignment": "stretch",
  "--padding-block-start": "0px",
  "--padding-block-end": "0px",
  "--padding-inline-start": "0px",
  "--padding-inline-end": "0px"
};
function Bn(r) {
  return d_({
    toolName: r.toolName,
    result: r.result,
    args: r.args,
    toolCallId: r.toolCallId
  });
}
function v_(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n)
    return null;
  if (/^\d+$/.test(n))
    return n;
  const i = n.match(/\/(\d+)(?:\?.*)?$/);
  return i ? i[1] : null;
}
function __(r) {
  if (!r?.handle || typeof window > "u")
    return null;
  const n = typeof window.Shopify?.routes?.root == "string" ? window.Shopify.routes.root : "/", i = new URL(`products/${r.handle}`, new URL(n, window.location.origin));
  i.searchParams.set("section_id", g_), i.searchParams.set("askcrystal_handle", r.handle);
  const a = v_(r?.variantId || r?.merchandiseId);
  return a && i.searchParams.set("variant", a), i.toString();
}
function w_(r) {
  const n = typeof r?.url == "string" ? r.url.trim() : "";
  if (n)
    return n;
  const i = typeof r?.handle == "string" ? r.handle.trim() : "";
  return i ? `/products/${i}` : null;
}
function S_(r) {
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
function x_(r) {
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
function E_(r) {
  if (!r)
    return !1;
  const n = !!r.querySelector("a[href]"), i = !!r.querySelector("img, .askcrystal-chat-product-card__placeholder");
  return n && i;
}
function k_(r) {
  const i = new DOMParser().parseFromString(r, "text/html").querySelector("[data-askcrystal-native-product-card]");
  return E_(i) ? i.outerHTML.trim() : null;
}
async function b_(r) {
  if (!r)
    throw new Error("Missing product card request URL");
  const n = Yi.get(r);
  if (n)
    return n;
  if (!zi.has(r)) {
    const i = fetch(r, {
      headers: {
        accept: "text/html"
      },
      credentials: "same-origin"
    }).then(async (a) => {
      if (!a.ok)
        throw new Error(`Failed to load native product card (${a.status})`);
      const u = await a.text(), d = k_(u);
      if (!d)
        throw new Error("Native product card markup was not found in the section response");
      return Yi.set(r, d), d;
    }).finally(() => {
      zi.delete(r);
    });
    zi.set(r, i);
  }
  return zi.get(r);
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
function T_({ image: r, title: n, compact: i = !1 }) {
  return /* @__PURE__ */ g.jsx("div", { className: `ac-tool-product__media${i ? " ac-tool-product__media--compact" : ""}`, children: r ? /* @__PURE__ */ g.jsx("img", { src: r, alt: n, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "ac-tool-product__placeholder", children: "Crystal" }) });
}
function C_({ product: r, ctaLabel: n }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-product__meta", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-product__price-group", children: [
      r.price ? /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__price", children: r.price }) : null,
      r.compareAtPrice ? /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__compare", children: r.compareAtPrice }) : null
    ] }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__cta", children: n || "View crystal" })
  ] });
}
function I_({ product: r, ctaLabel: n }) {
  const i = w_(r), a = S_(r), u = x_(r), d = n || "View", f = a ? /* @__PURE__ */ g.jsx("img", { className: "askcrystal-chat-product-card__image", src: a, alt: u, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }), p = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
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
              style: y_,
              children: i ? /* @__PURE__ */ g.jsx("a", { className: "askcrystal-chat-product-card__surface", href: i, children: p }) : /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__surface", children: p })
            }
          )
        }
      )
    }
  );
}
function R_({ product: r, ctaLabel: n }) {
  const i = __(r), [a, u] = b.useState(() => i && Yi.get(i) || null), [d, f] = b.useState(null);
  return b.useEffect(() => {
    let p = !0;
    if (!i)
      return b.startTransition(() => {
        u(null), f(new Error("Missing product card request URL"));
      }), () => {
        p = !1;
      };
    const m = Yi.get(i);
    return m ? (b.startTransition(() => {
      u(m), f(null);
    }), () => {
      p = !1;
    }) : (b.startTransition(() => {
      u(null), f(null);
    }), b_(i).then((_) => {
      p && b.startTransition(() => {
        u(_), f(null);
      });
    }).catch((_) => {
      p && (typeof console < "u" && typeof console.warn == "function" && console.warn("[AskCrystal] Native product card render fell back to hydrated shell.", {
        requestUrl: i,
        error: _,
        product: r
      }), b.startTransition(() => {
        u(null), f(_);
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
      children: /* @__PURE__ */ g.jsx(I_, { product: r, ctaLabel: n })
    }
  );
}
function A_(r) {
  const n = Bn(r);
  if (!n)
    return null;
  const { ctaLabel: i, product: a } = n.props;
  return /* @__PURE__ */ g.jsx("section", { className: "ac-tool-product-block", children: /* @__PURE__ */ g.jsx(R_, { product: a, ctaLabel: i }) });
}
function M_(r) {
  const n = Bn(r);
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
    /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: p.map((m, _) => {
      const v = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsx(T_, { image: m.image, title: m.title, compact: !0 }),
        /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-carousel__copy", children: [
          m.badge ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product__badge", children: m.badge }) : null,
          /* @__PURE__ */ g.jsx("h4", { className: "ac-tool-product__title", children: m.title }),
          m.reason || m.summary ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product__summary", children: m.reason || m.summary }) : null,
          /* @__PURE__ */ g.jsx(C_, { product: m, ctaLabel: m.ctaLabel || "View" })
        ] })
      ] });
      return m.url ? /* @__PURE__ */ g.jsx("a", { className: "ac-tool-carousel__card", href: m.url, role: "listitem", children: v }, m.id || m.handle || _) : /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel__card", role: "listitem", children: v }, m.id || m.handle || _);
    }) }),
    d ? /* @__PURE__ */ g.jsx("div", { className: "ac-tool__footer", children: /* @__PURE__ */ g.jsx("a", { className: "ac-tool__footer-link", href: d, children: f }) }) : null
  ] });
}
function N_(r) {
  const n = Bn(r);
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
    linkedProducts: _
  } = n.props;
  return /* @__PURE__ */ g.jsxs(ws, { eyebrow: i, title: a, className: "ac-tool--ritual", children: [
    u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    d ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__detail", children: d }) : null,
    /* @__PURE__ */ g.jsx("ol", { className: "ac-ritual-steps", children: f.map((v) => /* @__PURE__ */ g.jsxs("li", { className: "ac-ritual-steps__item", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-ritual-steps__dot", "aria-hidden": "true" }),
      /* @__PURE__ */ g.jsx("span", { children: v })
    ] }, v)) }),
    _.length > 0 ? /* @__PURE__ */ g.jsx("div", { className: "ac-tool-chip-row", role: "list", "aria-label": "Linked products", children: _.map((v, E) => v.url ? /* @__PURE__ */ g.jsx("a", { className: "ac-tool-chip", href: v.url, role: "listitem", children: v.title }, v.id || v.handle || E) : /* @__PURE__ */ g.jsx("span", { className: "ac-tool-chip", role: "listitem", children: v.title }, v.id || v.handle || E)) }) : null,
    p ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__note", children: p }) : null,
    m ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__disclaimer", children: m }) : null
  ] });
}
function P_(r) {
  const n = Bn(r);
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
function j_(r) {
  const n = Bn(r);
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
function L_(r) {
  const n = Bn(r);
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
function O_(r) {
  const n = Bn(r);
  return n ? /* @__PURE__ */ g.jsx(ws, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function z_({ children: r }) {
  return /* @__PURE__ */ g.jsx("div", { className: "ac-tool-group", children: r });
}
const D_ = {
  tools: {
    by_name: {
      [dt.product_card]: A_,
      [dt.product_carousel]: M_,
      [dt.ritual_card]: N_,
      [dt.reading_summary]: P_,
      [dt.collection_link]: j_,
      [dt.next_steps]: L_
    },
    Fallback: O_
  },
  ToolGroup: z_
}, Ah = "[data-askcrystal-homepage-root]", qi = /* @__PURE__ */ new Map(), B_ = "askcrystal-main-thread", F_ = "http://localhost:8787", ff = "askcrystal-theme-session-id", Mh = "askcrystal-theme-chat-sessions-v1", Nh = "askcrystal-theme-active-session-id", U_ = "askcrystal:session-registry", hf = "askcrystal:session-select", pf = "askcrystal:session-create", to = 24, $_ = "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538";
let mf = 0;
const H_ = 7;
function V_(r) {
  const n = document.getElementById(r);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function Ss(r = []) {
  return r.map((n) => n.type === "text" || n.type === "reasoning" ? n.text : "").join(" ").trim();
}
function ul(r) {
  const n = r?.answer || r?.delta || r?.text || r?.message || r?.reply || r?.output || r?.data?.answer || r?.data?.text;
  return typeof n == "string" ? n : "";
}
function On(r) {
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
function W_(r) {
  return On(
    r?.suggestions || r?.suggestedQuestions || r?.suggested_questions || r?.data?.suggestions || r?.data?.suggestedQuestions || r?.data?.suggested_questions || []
  );
}
function Ph() {
  return typeof window < "u" && typeof window.localStorage < "u";
}
function gf(r) {
  if (!Ph()) return "";
  try {
    return window.localStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function yf(r, n) {
  if (Ph())
    try {
      if (n === "" || n === null || n === void 0) {
        window.localStorage.removeItem(r);
        return;
      }
      window.localStorage.setItem(r, n);
    } catch {
    }
}
function Y_(r, n) {
  if (typeof r != "string" || !r.trim()) return n;
  try {
    return JSON.parse(r);
  } catch {
    return n;
  }
}
function jh(r, n = 52) {
  const i = typeof r == "string" ? r.replace(/\s+/g, " ").trim() : "";
  return i ? i.length <= n ? i : `${i.slice(0, Math.max(1, n - 1)).trimEnd()}…` : "";
}
function q_(r) {
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
function no(r) {
  return Array.isArray(r) ? r.map(q_).filter(Boolean) : [];
}
function gl(r) {
  if (!r || typeof r != "object") return "";
  const n = r.content || r.parts || [], i = Ss(Array.isArray(n) ? n : []);
  return i || (Array.isArray(r.metadata?.unstable_data) && r.metadata.unstable_data.length > 0 && r.role === "assistant" ? "Shared storefront picks and guidance." : "");
}
function ro(r, n = "New reading") {
  const i = Array.isArray(r) ? r.find((u) => u?.role === "user" && gl(u)) : null, a = gl(i);
  return a ? jh(a, 42) : n;
}
function Q_(r) {
  if (!Array.isArray(r) || r.length === 0)
    return "No messages yet.";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = gl(r[n]);
    if (i) return jh(i, 78);
  }
  return "No messages yet.";
}
function Lh(r, n = null) {
  if (!Array.isArray(r) || r.length === 0) return n;
  for (let i = r.length - 1; i >= 0; i -= 1) {
    const a = r[i]?.createdAt;
    if (!a) continue;
    const u = new Date(a).toISOString();
    if (u) return u;
  }
  return n;
}
function xs(r) {
  return [...r].sort((n, i) => {
    const a = new Date(i?.updatedAt || 0).getTime(), u = new Date(n?.updatedAt || 0).getTime();
    return a - u;
  });
}
function so(r = {}) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), i = no(r.messages || []);
  return {
    id: typeof r.id == "string" && r.id ? r.id : gr("thread"),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : ro(i),
    createdAt: typeof r.createdAt == "string" && r.createdAt ? r.createdAt : n,
    updatedAt: typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : n,
    conversationId: typeof r.conversationId == "string" && r.conversationId ? r.conversationId : null,
    messages: i,
    suggestions: On(r.suggestions || [])
  };
}
function G_(r) {
  if (!r || typeof r != "object") return null;
  const n = no(r.messages || []), i = typeof r.createdAt == "string" && r.createdAt ? r.createdAt : (/* @__PURE__ */ new Date()).toISOString(), a = typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : Lh(n, i) || i;
  return so({
    ...r,
    createdAt: i,
    updatedAt: a,
    messages: n,
    suggestions: On(r.suggestions || []),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : ro(n)
  });
}
function K_() {
  const r = Y_(gf(Mh), []), n = Array.isArray(r) ? r.map(G_).filter(Boolean) : [], i = n.length > 0 ? xs(n).slice(0, to) : [so()], a = gf(Nh), u = i.some((d) => d.id === a) ? a : i[0].id;
  return {
    sessions: i,
    activeSessionId: u
  };
}
function J_({ sessions: r, activeSessionId: n }) {
  yf(
    Mh,
    JSON.stringify(xs(r).slice(0, to))
  ), yf(Nh, n);
}
function vf(r, n) {
  return Array.isArray(r) && r.find((i) => i.id === n) || null;
}
function _f(r) {
  return r ? {
    ...r,
    title: ro(r.messages, r.title || "New reading"),
    updatedAt: Lh(r.messages, (/* @__PURE__ */ new Date()).toISOString()) || (/* @__PURE__ */ new Date()).toISOString()
  } : null;
}
function wf(r, n, i = {}) {
  const a = [];
  let u = !1;
  for (const d of Array.isArray(r) ? r : []) {
    if (d.id !== n) {
      a.push(d);
      continue;
    }
    u = !0;
    const f = i.messages !== void 0 ? no(i.messages) : d.messages, p = _f({
      ...d,
      ...i,
      messages: f,
      suggestions: i.suggestions !== void 0 ? On(i.suggestions) : d.suggestions,
      conversationId: i.conversationId !== void 0 ? i.conversationId || null : d.conversationId
    });
    a.push(p);
  }
  return u || a.push(_f(so({
    id: n,
    ...i
  }))), xs(a).slice(0, to);
}
function Oh(r) {
  return xs(Array.isArray(r) ? r : []).map((n) => ({
    id: n.id,
    title: ro(n.messages, n.title || "New reading"),
    preview: Q_(n.messages),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    isEmpty: !Array.isArray(n.messages) || n.messages.length === 0
  }));
}
function X_({ sessions: r, activeSessionId: n, isRunning: i }) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(U_, {
    detail: {
      sessions: Oh(r),
      activeSessionId: n,
      isRunning: !!i
    }
  }));
}
function cl() {
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
function Z_(r) {
  return /^(https?:\/\/|mailto:|\/)/i.test(r);
}
function Qt(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, f = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const p = `${n}-${f}`;
    if (d[2] && d[3]) {
      const m = d[3].trim();
      i.push(
        Z_(m) ? /* @__PURE__ */ g.jsx("a", { href: m, target: m.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ g.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ g.jsx("strong", { children: Qt(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ g.jsx("em", { children: Qt(d[6], `${p}-em`) }, p));
    u = a.lastIndex, f += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function vs(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function ew(r) {
  const n = vs(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function tw(r) {
  const n = vs(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function Sf(r) {
  const n = vs(r);
  return n.length >= 2 && n.some(Boolean);
}
function nw(r, n) {
  const i = r[n];
  if (!Sf(i)) return null;
  const a = vs(i), u = r[n + 1], d = tw(u);
  let f = n + (d ? 2 : 1);
  const p = [];
  for (; f < r.length && Sf(r[f]); ) {
    const m = vs(r[f]);
    if (m.length !== a.length) break;
    p.push(m), f += 1;
  }
  return p.length === 0 ? null : {
    headers: a,
    alignments: d ? ew(u) : a.map(() => "left"),
    rows: p,
    nextIndex: f
  };
}
function rw(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function zh({ text: r = "" }) {
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
      const v = [], E = d[1] || "";
      for (a += 1; a < n.length && !/^```\s*$/.test(n[a]); )
        v.push(n[a]), a += 1;
      a < n.length && (a += 1), rw(E) ? i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ g.jsx(zh, { text: v.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ g.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ g.jsx("code", { children: v.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const f = u.match(/^(#{1,3})\s+(.+)$/);
    if (f) {
      const v = `h${f[1].length + 2}`;
      i.push(
        /* @__PURE__ */ g.jsx(v, { children: Qt(f[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ g.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const p = nw(n, a);
    if (p) {
      const { headers: v, alignments: E, rows: S, nextIndex: R } = p;
      a = R, i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ g.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ g.jsx("thead", { children: /* @__PURE__ */ g.jsx("tr", { children: v.map((A, M) => /* @__PURE__ */ g.jsx(
            "th",
            {
              style: { textAlign: E[M] || "left" },
              children: Qt(A, `table-head-${a}-${M}`)
            },
            `table-head-${a}-${M}`
          )) }) }),
          /* @__PURE__ */ g.jsx("tbody", { children: S.map((A, M) => /* @__PURE__ */ g.jsx("tr", { children: v.map(($, Y) => /* @__PURE__ */ g.jsx(
            "td",
            {
              style: { textAlign: E[Y] || "left" },
              children: Qt(A[Y] || "", `table-cell-${a}-${M}-${Y}`)
            },
            `table-cell-${a}-${M}-${Y}`
          )) }, `table-row-${a}-${M}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const v = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        v.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ul", { children: v.map((E, S) => /* @__PURE__ */ g.jsx("li", { children: Qt(E, `ul-${a}-${S}`) }, `ul-${a}-${S}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const v = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        v.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ol", { children: v.map((E, S) => /* @__PURE__ */ g.jsx("li", { children: Qt(E, `ol-${a}-${S}`) }, `ol-${a}-${S}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const v = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        v.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("blockquote", { children: v.map((E, S) => /* @__PURE__ */ g.jsx("p", { children: Qt(E, `quote-${a}-${S}`) }, `quote-${a}-${S}`)) }, `quote-${a}`)
      );
      continue;
    }
    const m = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      m.push(n[a].trim()), a += 1;
    const _ = m.join(" ");
    i.push(
      /* @__PURE__ */ g.jsx("p", { children: Qt(_, `p-${a}`) }, `p-${a}`)
    );
  }
  return /* @__PURE__ */ g.jsx("div", { className: "ac-markdown", children: i });
}
function sw(r) {
  if (typeof r != "string" || !r) return "";
  try {
    return JSON.parse(r);
  } catch {
    return r.replace(/^"/, "").replace(/"$/, "");
  }
}
function iw(r) {
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
function ow(r) {
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
  return iw(d).trim();
}
function Dh(r) {
  if (typeof r != "string") return "";
  const n = r.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trim();
  if (!n) return "";
  const i = [...n.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi
  )].pop();
  if (i?.[1]) {
    const d = sw(i[1]).trim();
    if (d) return d;
  }
  const a = ow(n);
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
function xf(r) {
  if (typeof r != "string") return "";
  let n = r.replace(/^\uFEFF/, "").trimStart();
  if (!n) return "";
  const i = n.slice(0, 24).toLowerCase().replace(/\s+/g, " ").trim();
  if (i && i.length >= 3 && i.length <= 13 && "final answer:".startsWith(i) && /^[a-z:\s]+$/i.test(n.trim()) && n.trim().length <= 24)
    return "";
  const a = [...n.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  return typeof a?.index == "number" ? n = n.slice(a.index + a[0].length).trimStart() : n = n.replace(/^final answer\s*:\s*/i, ""), n;
}
function dl(r) {
  if (typeof r != "string") return "";
  const n = r.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trimStart();
  if (!n) return "";
  const i = Dh(n);
  let a = xf(i || n);
  if (!i) {
    if (!a) return "";
    const u = Fh(a);
    if (u && (a = xf(u) || a), Bh(a) || yl(a))
      return "";
  }
  return a.replace(/\n{3,}/g, `

`).trimStart();
}
function Bh(r) {
  if (typeof r != "string") return !1;
  const n = r.toLowerCase();
  return /\bthought:\b/.test(n) || /\bobservation:\b/.test(n) || /\baction:\b/.test(n) || /\bquestion:\b/.test(n) || /"action"\s*:/.test(n) || /\bfinal answer\b/.test(n);
}
function yl(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(n) || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(n) || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(n) || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(n) || /\bi have \w+ products?\b/.test(n) : !1;
}
function Ef(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(n) || /^```(?:json|xml)?\s*[\[{<]/.test(n) || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(n) || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(n) : !1;
}
function Fh(r) {
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
    if (!yl(f)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((f) => f.trim()).filter(Boolean);
  let d = 0;
  for (; d < u.length && yl(u[d]); )
    d += 1;
  return u.slice(d).join(`

`).trim();
}
function Ol(r) {
  return Array.isArray(r) ? r.map((n) => typeof n == "string" ? n.trim() : "").filter(Boolean).slice(-6) : typeof r == "string" ? r.split(`
`).map((n) => n.trim()).filter(Boolean).slice(-6) : [];
}
function aw({ statusStage: r = "", statusTool: n = "", statusText: i = "" }) {
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
function lw(r, n) {
  if (!r.length) return [];
  const i = (n % r.length + r.length) % r.length;
  return [...r.slice(i), ...r.slice(0, i)];
}
function hr(r) {
  const n = Math.sin(r * 12.9898 + 78.233) * 43758.5453;
  return n - Math.floor(n);
}
function uw(r = [], n = []) {
  if (!r.length) return [...new Set(n.filter(Boolean))];
  if (!n.length) return [...new Set(r.filter(Boolean))];
  const i = [r[0]];
  let a = 1, u = 0;
  for (; a < r.length || u < n.length; )
    a < r.length && (i.push(r[a]), a += 1), u < n.length && (i.push(n[u]), u += 1);
  return [...new Set(i.filter(Boolean))];
}
function cw({ statusText: r = "", statusStage: n = "", ambientStatusText: i = "", hasToolActivity: a = !1 }) {
  return i || (n && n !== "tool" && r ? r : a ? "Following the clearest thread..." : "Settling into your energy...");
}
function dw({
  statusText: r = "",
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = ""
}) {
  const d = Ol(n), f = [];
  i === "tool" && r && f.push(r), d.forEach((S) => {
    f.includes(S) || f.push(S);
  });
  const p = cw({
    statusText: r,
    statusStage: i,
    ambientStatusText: u,
    hasToolActivity: f.length > 0
  }), m = i && i !== "tool" ? i : f.length > 0 ? "compose" : i, _ = aw({
    statusStage: m,
    statusTool: f.length > 0 ? "" : a,
    statusText: p
  }), v = Math.round(
    hr(
      p.length + f.join("").length * 0.5 + _.length
    ) * 100
  ), E = lw(_, v);
  return uw([p, ...E], f);
}
function fw(r = "", n = 0) {
  const i = typeof r == "string" ? r.trim() : "", a = 1040, u = /[.!?。！？]$/.test(i) ? 220 : /[,;:，；：]$/.test(i) ? 120 : 0, d = Math.min(320, Math.max(0, i.length * 6)), f = Math.round((hr(n + i.length) - 0.5) * 220);
  return Math.max(880, a + u + d + f);
}
function hw() {
  const [r, n] = b.useState(!1);
  return b.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
function pw({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = ""
}) {
  const d = hw(), f = b.useMemo(
    () => dw({
      statusText: r,
      statusHistoryText: n,
      statusStage: i,
      statusTool: a,
      ambientStatusText: u
    }),
    [u, n, i, r, a]
  ), [p, m] = b.useState(0), [_, v] = b.useState(!1), E = b.useMemo(() => f.length <= 2 ? f : [...f, ...f.slice(0, 2)], [f]);
  b.useEffect(() => {
    m(0), v(!0);
    const A = window.requestAnimationFrame(() => {
      v(!1);
    });
    return () => window.cancelAnimationFrame(A);
  }, [f]), b.useEffect(() => {
    if (d || f.length <= 2 || p >= f.length) return;
    let A, M = !1;
    const $ = p + 1, Y = E[$] || "";
    return A = window.setTimeout(() => {
      M || m($);
    }, fw(Y, p)), () => {
      M = !0, window.clearTimeout(A);
    };
  }, [E, d, p, f.length]), b.useEffect(() => {
    if (d || f.length <= 2 || p < f.length) return;
    const A = window.setTimeout(() => {
      v(!0), m(0), window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          v(!1);
        });
      });
    }, 720);
    return () => window.clearTimeout(A);
  }, [d, p, f.length]);
  const S = d || f.length <= 2 ? f.slice(0, 2) : [
    f[p % f.length],
    f[(p + 1) % f.length]
  ].filter(Boolean), R = r || S[S.length - 1] || "Settling into your energy...";
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-thinking", children: [
    /* @__PURE__ */ g.jsx("span", { className: "visually-hidden", role: "status", "aria-live": "polite", children: R }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-thinking__lead", "aria-hidden": "true", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-thinking__orb" }),
      /* @__PURE__ */ g.jsxs("span", { className: "ac-thinking__dots", children: [
        /* @__PURE__ */ g.jsx("span", {}),
        /* @__PURE__ */ g.jsx("span", {}),
        /* @__PURE__ */ g.jsx("span", {})
      ] })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-thinking__trail", "aria-hidden": "true", children: d || f.length <= 2 ? S.map((A, M) => /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `ac-thinking__line${M === S.length - 1 ? " is-current" : ""}`,
        children: A
      },
      `${A}-${M}`
    )) : /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `ac-thinking__track${_ ? " is-resetting" : ""}`,
        style: { transform: `translateY(calc(var(--ac-thinking-line-step) * -${p}))` },
        children: E.map((A, M) => /* @__PURE__ */ g.jsx("div", { className: "ac-thinking__line", children: A }, `${A}-${M}`))
      }
    ) })
  ] });
}
function mw({ statusText: r }) {
  return r ? /* @__PURE__ */ g.jsxs("div", { className: "ac-live-status", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("span", { className: "ac-live-status__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-live-status__text", children: r })
  ] }) : null;
}
function gw(r) {
  return r ? typeof r == "string" ? {
    stage: "",
    tool: "",
    message: r,
    taskId: ""
  } : {
    stage: typeof r.stage == "string" ? r.stage : "",
    tool: typeof r.tool == "string" ? r.tool : "",
    message: typeof r.message == "string" ? r.message : "",
    taskId: Hh(r)
  } : {
    stage: "",
    tool: "",
    message: "",
    taskId: ""
  };
}
function Uh(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return Ss(i.content);
  }
  return "";
}
function fl(r, n) {
  return r.find((i) => n(i));
}
function yw({ matchedIntention: r, fallbackProduct: n, products: i }) {
  return r?.product ? zn([], [
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
  ]) : zn([], [
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
function vw(r, n) {
  const i = r.toLowerCase(), u = [
    {
      key: "calm",
      test: /sleep|rest|anxious|stress|calm|ground|peace/,
      lead: "I would start by softening the energy around your nervous system before recommending anything too activating.",
      product: fl(n, (m) => /amethyst|selenite|moonstone|calm|sleep/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
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
      product: fl(n, (m) => /rose|heart|love|pink/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
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
      product: fl(n, (m) => /citrine|pyrite|tiger|success|abundance/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
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
  ].find((m) => m.test.test(i)), d = n[0], f = yw({
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
function $h(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = Dh(n), u = (i || n).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && Bh(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), f = Fh(u), p = d >= 0 ? u.slice(d).trim() : f || u, _ = p.split(/\n{2,}/).map((E) => E.trim()).filter(Boolean).filter((E) => !Ef(E)), v = (_.length > 0 ? _.join(`

`) : p).trim();
    if (v && !Ef(v))
      return v;
  }
  return "";
}
function _w(r) {
  const n = $h(r);
  return n || [
    "I tried to check the shelf for you, but the live catalog result was not available in this moment.",
    "For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”",
    "If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely."
  ].join(`

`);
}
function kf(r, n = []) {
  const i = Rh(r), a = zn(n, i.components), u = _w(i.answer);
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
function fr({ text: r = "", components: n = [] } = {}) {
  const i = typeof r == "string" ? r : "", a = Rh(i), u = zn(n, a.components), d = h_(i), f = [], p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), _ = (S) => `${S.toolName}:${S.toolCallId}`;
  for (const S of u) {
    const R = df(S);
    R && m.set(_(R), R);
  }
  const v = (S) => {
    const R = m_(S).trim(), A = $h(R);
    if (!A) return;
    const M = f[f.length - 1];
    if (M?.type === "text") {
      M.text = `${M.text}

${A}`.trim();
      return;
    }
    f.push({
      type: "text",
      text: A
    });
  }, E = (S) => {
    for (const R of S) {
      const A = df(R);
      if (!A) continue;
      const M = _(A);
      p.has(M) || (f.push(m.get(M) || A), p.add(M));
    }
  };
  if (d.some((S) => S.type === "payload"))
    for (const S of d) {
      if (S.type === "text") {
        v(S.value);
        continue;
      }
      E(Ll(S.value));
    }
  else
    v(i);
  for (const S of m.values()) {
    const R = _(S);
    p.has(R) || f.push(S);
  }
  return f;
}
function ww(r) {
  return /^https?:\/\//i.test(r);
}
function Qi(r) {
  return r ? ww(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${F_}${r}` : r : "";
}
function Sw(r) {
  return r ? r.endsWith("/stream") ? Qi(r) : Qi(`${r.replace(/\/$/, "")}/stream`) : "";
}
function xw(r) {
  return r ? r.endsWith("/stop") ? Qi(r) : Qi(`${r.replace(/\/$/, "")}/stop`) : "";
}
function Ew() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  try {
    const r = window.localStorage.getItem(ff);
    if (r) return r;
    const n = gr("session");
    return window.localStorage.setItem(ff, n), n;
  } catch {
    return gr("session");
  }
}
function kw(r) {
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
function Hh(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function Vh() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function Ct(r) {
  if (r?.aborted)
    throw Vh();
}
function bw(r = "", n = "") {
  const i = Math.min(r.length, n.length);
  let a = 0;
  for (; a < i && r[a] === n[a]; )
    a += 1;
  return a;
}
function Tw(r, n = 28, i = "normal") {
  if (typeof r != "string" || !r) return [];
  const a = r.match(/\n+|[^\s\n]+(?:\s+)?|[ \t]+/g) || [r];
  if (a.length <= n) return a;
  if (i === "final") {
    const f = [], p = Math.min(a.length, n);
    let m = 0;
    for (; m < a.length; ) {
      const _ = a.length - m, v = Math.max(1, p - f.length), E = _ / v, S = Math.max(1, Math.floor(E)), R = hr(m + r.length + f.length), A = R > 0.72 ? 1 : R < 0.18 ? -1 : 0;
      let M = Math.max(1, Math.round(S + A));
      const $ = a[m] || "", Y = $.trim();
      /[\n]/.test($) || /[.!?。！？]$/.test(Y) ? M = 1 : /[,:;，；：]$/.test(Y) ? M = Math.min(M, 2) : M = Math.min(M, 3), f.push(a.slice(m, m + M).join("")), m += M;
    }
    return f;
  }
  const u = Math.ceil(a.length / n), d = [];
  for (let f = 0; f < a.length; f += u)
    d.push(a.slice(f, f + u).join(""));
  return d;
}
function Cw(r, n = "normal", i = "", a = 0) {
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
  const d = typeof i == "string" ? i.trim() : "", f = /[.!?。！？]$/.test(d) ? 176 : /[,;:，；：]$/.test(d) ? 104 : /\n/.test(i) ? 136 : 0, p = n === "final" ? Math.min(28, Math.max(0, d.length * 2 - 10)) : 0, m = n === "final" ? 52 : 6, _ = Math.round((hr(a + r + d.length) - 0.5) * m), v = n === "final" && hr(a * 3.17 + r) > 0.78 ? 64 + Math.round(hr(a + 17) * 48) : 0;
  return Math.max(0, u + f + p + _ + v);
}
function Iw(r, n) {
  return r ? new Promise((i, a) => {
    const u = globalThis.setTimeout(() => {
      f(), i();
    }, r), d = () => {
      f(), a(Vh());
    };
    function f() {
      globalThis.clearTimeout(u), n?.removeEventListener?.("abort", d);
    }
    n?.addEventListener?.("abort", d, { once: !0 });
  }) : Promise.resolve();
}
async function Rw({
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
    const S = bw(r, n);
    S / Math.max(1, Math.min(r.length, n.length)) >= 0.65 && (p = n.slice(0, S));
  }
  const m = n.slice(p.length);
  if (!m)
    return p !== r && a?.("", p, u), n;
  const _ = d === "fast" ? n.length > 1400 ? 64 : n.length > 700 ? 52 : 40 : d === "final" ? n.length > 1800 ? 120 : n.length > 1200 ? 104 : n.length > 700 ? 88 : 68 : n.length > 1400 ? 44 : n.length > 700 ? 36 : 28, v = Tw(m, _, d);
  let E = p;
  for (let S = 0; S < v.length; S += 1) {
    Ct(i);
    const R = v[S];
    if (E += R, a?.(!f && S === 0 ? "" : R, E, u), S < v.length - 1) {
      const M = Cw(v.length, d, R, S);
      await Iw(M, i);
    }
  }
  return n;
}
async function Aw({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a }) {
  if (!(!r || !n))
    try {
      await fetch(xw(r), {
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
async function Mw({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: f, onComponents: p, onSuggestions: m }) {
  Ct(i);
  const _ = await fetch(Sw(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: Uh(n),
      conversationId: a,
      sessionId: u
    }),
    signal: i
  });
  if (!_.ok) {
    let ue = `Proxy returned ${_.status}`;
    try {
      const de = await _.json();
      ue = de?.error || de?.message || ue;
    } catch {
    }
    throw new Error(ue);
  }
  if (!_.body)
    throw new Error("The proxy did not return a readable stream.");
  const v = _.body.getReader(), E = new TextDecoder();
  let S = "", R = "", A = "", M = [], $ = [], Y = a || null;
  for (; ; ) {
    Ct(i);
    const { done: ue, value: de } = await v.read();
    if (ue) break;
    Ct(i), S += E.decode(de, { stream: !0 });
    const ye = kw(S);
    S = ye.remaining;
    for (const J of ye.events) {
      if (Ct(i), J.event === "status" && typeof J.payload?.message == "string" && (Ct(i), d?.(J.payload)), J.event === "error")
        throw new Error(J.payload?.error || J.payload?.message || "The proxy stream failed.");
      const fe = Ll(J.payload);
      fe.length && (Ct(i), M = zn(M, fe), p?.(M, fe, J.payload), Y = J.payload?.conversationId || J.payload?.conversation_id || Y);
      const se = W_(J.payload);
      if (se.length && (Ct(i), $ = se, m?.(se, J.payload), Y = J.payload?.conversationId || J.payload?.conversation_id || Y), J.event === "replace") {
        Ct(i);
        const K = ul(J.payload);
        if (K) {
          R = K;
          const ve = dl(R);
          ve && (A = ve);
        }
        Y = J.payload?.conversationId || J.payload?.conversation_id || Y;
      }
      if (["delta", "message", "agent_message"].includes(J.event)) {
        Ct(i);
        const K = ul(J.payload);
        if (K) {
          R += K;
          const ve = dl(R);
          ve && (A = ve);
        }
        Y = J.payload?.conversationId || J.payload?.conversation_id || Y;
      }
      if (J.event === "complete") {
        Ct(i);
        const K = ul(J.payload) || R, Oe = dl(K) || A || A, Ce = kf(K || Oe, M);
        return {
          answer: Ce.answer,
          components: Ce.components,
          sourceText: Ce.sourceText,
          suggestions: se.length ? se : $,
          conversationId: J.payload?.conversationId || J.payload?.conversation_id || Y || null
        };
      }
    }
  }
  if (A || M.length > 0) {
    const ue = kf(A, M);
    return {
      answer: ue.answer,
      components: ue.components,
      sourceText: ue.sourceText,
      suggestions: $,
      conversationId: Y
    };
  }
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function gr(r = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${r}-${crypto.randomUUID()}` : (mf += 1, `${r}-${Date.now()}-${mf}`);
}
function Nw(r) {
  return {
    id: gr("user"),
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
  id: r = gr("assistant"),
  text: n = "",
  parts: i = null,
  components: a = [],
  status: u,
  error: d,
  statusText: f = "",
  statusStage: p = "",
  statusTool: m = "",
  statusHistory: _ = [],
  ambientStatusText: v = ""
}) {
  const E = Ol(_).join(`
`);
  return {
    id: r,
    role: "assistant",
    createdAt: /* @__PURE__ */ new Date(),
    content: Array.isArray(i) ? i : fr({ text: n, components: a }),
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
        ...E ? { statusHistoryText: E } : {},
        ...v ? { ambientStatusText: v } : {}
      }
    }
  };
}
function Pw(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Ol(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((f) => f !== a);
  return d.push(a), d.slice(-4);
}
function vl({ id: r, text: n = "", components: i = [] }) {
  const u = !!(typeof n == "string" ? n.trim() : "") || i.length > 0;
  return Pn({
    id: r,
    parts: fr({
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
function bf(r, n) {
  if (!Array.isArray(r) || !n || r.length === 0)
    return Array.isArray(r) ? [...r] : [];
  const i = [...r], a = i[i.length - 1];
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = vl({
    id: a.id,
    text: Ss(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function jw({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: f, onComponents: p, onSuggestions: m }) {
  const _ = Uh(n);
  if (r.runtimeMode === "proxy" && r.apiEndpoint)
    try {
      return await Mw({
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
    } catch (E) {
      throw E?.name === "AbortError" || console.error("[AskCrystal] Proxy runtime failed.", E), E;
    }
  const v = vw(_, r.products);
  return {
    answer: v.answer,
    components: v.components || [],
    suggestions: [],
    sourceText: v.answer,
    conversationId: a
  };
}
function Lw(r) {
  const n = b.useMemo(() => K_(), []), i = vf(n.sessions, n.activeSessionId) || n.sessions[0], [a, u] = b.useState(n.sessions), [d, f] = b.useState(i.id), [p, m] = b.useState(i.messages), [_, v] = b.useState(i.suggestions), [E, S] = b.useState(!1), R = b.useRef(null), A = b.useRef(""), M = b.useRef(""), $ = b.useRef(!1), Y = b.useRef(i.conversationId || null), ue = b.useRef(p), de = b.useRef(a), ye = b.useRef(d), J = b.useRef(E), fe = b.useRef(Ew());
  b.useEffect(() => {
    ue.current = p;
  }, [p]), b.useEffect(() => {
    de.current = a;
  }, [a]), b.useEffect(() => {
    ye.current = d;
  }, [d]), b.useEffect(() => {
    J.current = E;
  }, [E]), b.useEffect(() => {
    u((ee) => wf(ee, d, {
      messages: bf(p, $.current),
      suggestions: _,
      conversationId: Y.current,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }, [d, p, _]), b.useEffect(() => {
    J_({
      sessions: a,
      activeSessionId: d
    }), X_({
      sessions: a,
      activeSessionId: d,
      isRunning: E
    });
  }, [d, E, a]);
  const se = b.useCallback((ee) => {
    ee && (Y.current = ee.conversationId || null, $.current = !1, M.current = "", f(ee.id), m(no(ee.messages)), v(On(ee.suggestions)));
  }, []), K = b.useCallback((ee) => {
    if (!ee || J.current)
      return;
    if (ee === ye.current) {
      cl();
      return;
    }
    const pe = vf(de.current, ee);
    if (!pe) return;
    const Z = {
      ...pe,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    u((O) => wf(O, ee, {
      updatedAt: Z.updatedAt
    })), se(Z), cl();
  }, [se]), ve = b.useCallback(() => {
    if (J.current) return;
    const ee = so();
    u(
      (pe) => xs([ee, ...pe]).slice(0, to)
    ), se(ee), cl();
  }, [se]);
  b.useEffect(() => {
    if (typeof window > "u") return;
    const ee = (Z) => {
      K(Z.detail?.sessionId || "");
    }, pe = () => {
      ve();
    };
    return window.addEventListener(hf, ee), window.addEventListener(pf, pe), () => {
      window.removeEventListener(hf, ee), window.removeEventListener(pf, pe);
    };
  }, [ve, K]);
  const Oe = b.useCallback((ee) => {
    m(bf(ee, $.current));
  }, []), Ce = b.useCallback((ee, pe) => {
    m(
      (Z) => Z.map((O) => O.id !== ee ? O : pe(O))
    );
  }, []), it = b.useCallback(async () => {
    const ee = R.current, pe = A.current, Z = M.current, O = Y.current, W = fe.current;
    ee?.abort(), $.current = !0, S(!1), v([]), pe && Ce(
      pe,
      (D) => vl({
        id: D.id,
        text: Ss(D.content || []),
        components: D.metadata?.unstable_data || []
      })
    ), !(!Z || !r.apiEndpoint) && await Aw({
      apiEndpoint: r.apiEndpoint,
      taskId: Z,
      sessionId: W,
      conversationId: O
    });
  }, [r.apiEndpoint, Ce]), $e = b.useCallback(
    async (ee) => {
      if (ee.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      const pe = Nw(ee), Z = gr("assistant"), O = new AbortController(), W = Pn({
        id: Z,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy..."
      }), D = [...ue.current, pe];
      R.current = O, A.current = Z, M.current = "", $.current = !1, S(!0), v([]), m([...D, W]);
      let k = "", N = [], te = [];
      try {
        const G = await jw({
          config: r,
          messages: D,
          abortSignal: O.signal,
          conversationId: Y.current,
          sessionId: fe.current,
          onStatus: (ae) => {
            if (O.signal.aborted) return;
            const ne = gw(ae);
            ne.taskId && (M.current = ne.taskId), Ce(
              Z,
              (me) => Pn({
                id: Z,
                parts: fr({
                  text: "",
                  components: []
                }),
                components: [],
                status: {
                  type: "running"
                },
                statusText: ne.message,
                statusStage: ne.stage,
                statusTool: ne.tool,
                statusHistory: Pw(me.metadata?.custom?.statusHistoryText, ne),
                ambientStatusText: ne.stage === "tool" ? me.metadata?.custom?.ambientStatusText || "Settling into your energy..." : ne.message
              })
            );
          },
          onComponents: (ae, ne, me) => {
            if (O.signal.aborted) return;
            const He = Hh(me);
            He && (M.current = He), N = ae;
          },
          onSuggestions: (ae) => {
            O.signal.aborted || (te = On(ae));
          }
        });
        Y.current = G.conversationId || Y.current, M.current = "", $.current = !1;
        const ie = G.components || N, oe = On(
          G.suggestions?.length ? G.suggestions : te
        );
        Ce(
          Z,
          () => Pn({
            id: Z,
            parts: fr({
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
        ), k = await Rw({
          currentAnswer: "",
          nextAnswer: G.answer,
          abortSignal: O.signal,
          speed: "final",
          onDelta: (ae, ne) => {
            O.signal.aborted || (k = ne, Ce(
              Z,
              () => Pn({
                id: Z,
                parts: fr({
                  text: ne,
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
            ));
          }
        }), m([
          ...D,
          Pn({
            id: Z,
            parts: fr({
              text: k || G.answer || G.sourceText,
              components: ie
            }),
            components: ie,
            status: {
              type: "complete",
              reason: "stop"
            }
          })
        ]), v(oe);
      } catch (G) {
        if (G?.name === "AbortError") {
          M.current = "", v([]), m([
            ...D,
            vl({
              id: Z,
              text: k,
              components: []
            })
          ]);
          return;
        }
        console.error("[AskCrystal] Assistant runtime failed.", G), M.current = "", $.current = !1, v([]), m([
          ...D,
          Pn({
            id: Z,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: G?.message || "Unknown runtime error"
            },
            error: G?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        R.current === O && (R.current = null), A.current === Z && (A.current = ""), M.current && O.signal.aborted && (M.current = ""), S(!1);
      }
    },
    [r, Ce]
  ), ot = b.useMemo(
    () => ({
      messages: p,
      suggestions: _,
      isRunning: E,
      setMessages: Oe,
      onImport: Oe,
      onNew: $e,
      onCancel: it,
      adapters: {
        threadList: {
          threadId: d || B_,
          threads: Oh(a).map((ee) => ({
            id: ee.id,
            remoteId: ee.id,
            title: ee.title
          }))
        }
      }
    }),
    [d, E, p, it, $e, Oe, a, _]
  );
  return {
    runtime: Vg(ot),
    hasUserMessages: p.some((ee) => ee.role === "user"),
    activeSessionId: d
  };
}
function Ow({ product: r }) {
  return /* @__PURE__ */ g.jsxs("a", { className: "ac-homepage__product-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-media", children: r.image ? /* @__PURE__ */ g.jsx("img", { src: r.image, alt: r.title, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__product-meta", children: r.badge || "Bestseller" }),
      /* @__PURE__ */ g.jsx("h3", { children: r.title }),
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__product-link", children: "View product" })
    ] })
  ] });
}
function zw({ config: r }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-shelf", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-shelf-header", children: [
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
        /* @__PURE__ */ g.jsx("h2", { children: r.shelfHeading })
      ] }),
      /* @__PURE__ */ g.jsx("a", { className: "ac-homepage__browse-link", href: r.browseUrl, children: "Browse all" })
    ] }),
    r.products.length ? /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ g.jsx(Ow, { product: n }, n.id)) }) : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
  ] });
}
function Dw({ card: r }) {
  const n = [
    "ac-homepage__guide-card",
    r.layout ? `ac-homepage__guide-card--${r.layout}` : "",
    r.emblemUrl ? "ac-homepage__guide-card--has-emblem" : ""
  ].filter(Boolean).join(" "), i = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
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
    Eh,
    {
      className: n,
      prompt: r.prompt,
      send: !0,
      children: i
    }
  ) : /* @__PURE__ */ g.jsx("a", { className: n, href: r.href, children: i });
}
function Bw({ config: r }) {
  const n = typeof r.headingLine1 == "string" ? r.headingLine1.trim() : "", i = typeof r.headingLine2Prefix == "string" ? r.headingLine2Prefix.trim() : "", a = typeof r.headingAccent == "string" ? r.headingAccent.trim() : "", u = typeof r.headingSuffix == "string" ? r.headingSuffix.trim() : "", d = a && u.toLowerCase().startsWith(`${a.toLowerCase()} `) ? u.slice(a.length).trimStart() : u, f = !!(n || i || a || d), p = [n, i].filter(Boolean).join(" "), m = (v, E) => {
    if (!v) return null;
    const S = Array.from(v.matchAll(/\byou\b/gi));
    if (!S.length)
      return v;
    const R = [];
    let A = 0;
    return S.forEach((M, $) => {
      const Y = M.index ?? 0;
      Y > A && R.push(
        /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-copy", children: v.slice(A, Y) }, `${E}-copy-${$}`)
      ), R.push(
        /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-accent", children: M[0] }, `${E}-accent-${$}`)
      ), A = Y + M[0].length;
    }), A < v.length && R.push(
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-copy", children: v.slice(A) }, `${E}-copy-tail`)
    ), R;
  }, _ = [
    {
      id: "compatibility",
      layout: "portrait",
      eyebrow: "Connections",
      title: "Read love and synastry",
      description: "Explore soulmate, synastry, and relationship guidance.",
      cta: "Cosmic match",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421",
      prompt: "Can you do a love and compatibility reading for me?"
    },
    {
      id: "divination",
      layout: "portrait",
      eyebrow: "Readings",
      title: "Tarot, Bazi, and energy readings",
      description: "Use tarot, Bazi, or a daily check-in before you shop.",
      cta: "Start a reading",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421",
      prompt: "Give me a reading using the best method for my current situation."
    },
    {
      id: "ask-anything",
      layout: "wide",
      eyebrow: "Open chat",
      title: "Ask anything about crystals, rituals, or life",
      description: "Start with a question, a feeling, or a life situation.",
      cta: "Ask AskCrystal",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_3.png?v=1777105421",
      prompt: "I have a situation in my life and want guidance plus crystal recommendations."
    },
    {
      id: "ritual-plan",
      layout: "wide",
      eyebrow: "Daily support",
      title: "Build a practical ritual",
      description: "Get a simple cleansing, charging, or intention-setting plan.",
      cta: "Build my ritual",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_4.png?v=1777105421",
      prompt: "Help me build a simple crystal ritual for what I need right now."
    },
    {
      id: "browse-store",
      layout: "wide",
      eyebrow: "Storefront",
      title: "Browse the full crystal shop",
      description: "Open the wider shelf, then return whenever you want guidance.",
      cta: "Browse all products",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_5.png?v=1777105421",
      href: r.browseUrl
    }
  ];
  return /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__welcome", children: /* @__PURE__ */ g.jsxs("section", { className: "ac-homepage__guide", "aria-label": "Guided AskCrystal paths", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-header", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__guide-kicker", children: r.eyebrow }),
      /* @__PURE__ */ g.jsx("h1", { className: "ac-homepage__guide-title", children: f ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        p ? /* @__PURE__ */ g.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          p,
          a || d ? " " : ""
        ] }) : null,
        a ? /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-accent", children: a }) : null,
        d ? /* @__PURE__ */ g.jsxs("span", { className: "ac-homepage__guide-title-copy", children: [
          p || a ? " " : "",
          m(d, "heading-suffix")
        ] }) : null
      ] }) : r.heading })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-grid", children: [
      _.map((v) => /* @__PURE__ */ g.jsx(Dw, { card: v }, v.id)),
      /* @__PURE__ */ g.jsx(zw, { config: r })
    ] })
  ] }) });
}
function Fw() {
  const r = b.useRef(null), [n, i] = b.useState(!1), a = b.useCallback(() => {
    const u = r.current;
    if (!u) {
      i(!1);
      return;
    }
    const d = u.scrollHeight > u.clientHeight + 2;
    i((f) => f === d ? f : d);
  }, []);
  return b.useEffect(() => {
    const u = window.requestAnimationFrame(a);
    return () => window.cancelAnimationFrame(u);
  }, [a]), /* @__PURE__ */ g.jsx(ph, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ g.jsx(
          gh,
          {
            ref: r,
            className: "ac-homepage__composer-input",
            placeholder: "ask me anything",
            minRows: 1,
            maxRows: H_,
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
          /* @__PURE__ */ g.jsx(ml, { running: !1, children: /* @__PURE__ */ g.jsx(bv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ g.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ g.jsx(ml, { running: !0, children: /* @__PURE__ */ g.jsx(Vv, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function Uw() {
  return typeof document > "u" ? null : Xm.createPortal(
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ g.jsx(Fw, {}) }),
    document.body
  );
}
function $w() {
  return /* @__PURE__ */ g.jsx(Ml, { className: "ac-message ac-message--user", children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ g.jsx(Nl, {}) }) });
}
function Hw() {
  const r = qt((d) => d.id || ""), n = qt((d) => d.status?.type === "complete"), i = we(({ thread: d }) => d.suggestions || []), a = we(({ thread: d }) => d.isRunning), u = we(({ thread: d }) => {
    for (let f = d.messages.length - 1; f >= 0; f -= 1) {
      const p = d.messages[f];
      if (p?.role === "assistant")
        return p.id === r;
    }
    return !1;
  });
  return !n || a || !u || !i.length ? null : /* @__PURE__ */ g.jsx("div", { className: "ac-message__suggestions", "aria-label": "Suggested follow-up prompts", children: i.map((d, f) => /* @__PURE__ */ g.jsx(
    Eh,
    {
      className: "ac-message__suggestion",
      prompt: d.prompt,
      send: !0,
      children: d.prompt
    },
    `${r}-suggestion-${f}-${d.prompt}`
  )) });
}
function Vw() {
  const r = qt((E) => E.content || E.parts || []), n = Ss(r), i = r.some((E) => E.type === "tool-call"), a = qt((E) => E.status?.type === "running"), u = qt((E) => E.metadata?.custom?.statusText || ""), d = qt((E) => E.metadata?.custom?.statusStage || ""), f = qt((E) => E.metadata?.custom?.statusTool || ""), p = qt((E) => E.metadata?.custom?.statusHistoryText || ""), m = qt((E) => E.metadata?.custom?.ambientStatusText || ""), _ = a && !n && !i, v = a && (!!n || i) && d === "tool" && !!u;
  return /* @__PURE__ */ g.jsxs(Ml, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: _ ? /* @__PURE__ */ g.jsx(
      pw,
      {
        statusText: u,
        statusHistoryText: p,
        statusStage: d,
        statusTool: f,
        ambientStatusText: m
      }
    ) : /* @__PURE__ */ g.jsx("div", { className: "ac-message__content-layer", children: /* @__PURE__ */ g.jsx(
      Nl,
      {
        components: {
          Text: ({ text: E }) => /* @__PURE__ */ g.jsx(zh, { text: E }),
          ...D_
        }
      }
    ) }) }),
    v ? /* @__PURE__ */ g.jsx("div", { className: "ac-message__status", children: /* @__PURE__ */ g.jsx(mw, { statusText: u }) }) : null,
    /* @__PURE__ */ g.jsx(Hw, {}),
    /* @__PURE__ */ g.jsx(fh, { children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function Ww({ config: r }) {
  const { runtime: n, hasUserMessages: i, activeSessionId: a } = Lw(r), u = b.useRef(null), d = b.useRef(null), f = b.useRef(!1);
  return b.useEffect(() => {
    if (!d.current) return;
    const m = window.requestAnimationFrame(() => {
      if (d.current) {
        if (!i) {
          f.current = !1, d.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        f.current || (f.current = !0, d.current.scrollTo({ top: d.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame(m);
  }, [a, i]), b.useEffect(() => {
    const p = u.current, m = d.current;
    if (!p || !m || typeof window > "u") return;
    const _ = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let v = 0;
    const E = () => {
      v = 0;
      const R = Math.max(180, Math.min(320, m.clientHeight * 0.4)), A = _?.matches ? 0 : Math.min(54, m.scrollTop * 0.18), M = Math.max(0, 1 - m.scrollTop / R);
      p.style.setProperty("--ac-homepage-backdrop-offset", `${A.toFixed(2)}px`), p.style.setProperty("--ac-homepage-backdrop-opacity", M.toFixed(3));
    }, S = () => {
      v || (v = window.requestAnimationFrame(E));
    };
    return E(), m.addEventListener("scroll", S, { passive: !0 }), () => {
      m.removeEventListener("scroll", S), v && window.cancelAnimationFrame(v);
    };
  }, [a]), /* @__PURE__ */ g.jsx(Vy, { runtime: n, children: /* @__PURE__ */ g.jsxs("div", { ref: u, className: "ac-homepage", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__backdrop", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("img", { src: $_, alt: "", loading: "eager", decoding: "async" }) }),
    /* @__PURE__ */ g.jsx(yh, { className: "ac-homepage__thread", children: /* @__PURE__ */ g.jsxs(
      _h,
      {
        ref: d,
        className: "ac-homepage__viewport",
        autoScroll: i,
        turnAnchor: i ? "bottom" : "top",
        scrollToBottomOnInitialize: !1,
        scrollToBottomOnRunStart: i,
        scrollToBottomOnThreadSwitch: i,
        children: [
          /* @__PURE__ */ g.jsx(Bw, { config: r }),
          /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ g.jsx(
            Xv,
            {
              components: {
                UserMessage: $w,
                AssistantMessage: Vw
              }
            }
          ) }),
          /* @__PURE__ */ g.jsx(Uw, {})
        ]
      }
    ) })
  ] }) });
}
function Yw(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || qi.has(i)) return;
  const a = V_(n);
  if (!a) return;
  const u = Jm.createRoot(r);
  u.render(/* @__PURE__ */ g.jsx(Ww, { config: a })), qi.set(i, u);
}
function qw(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = qi.get(n);
  i && (i.unmount(), qi.delete(n));
}
function Wh(r = document) {
  r.querySelectorAll(Ah).forEach((n) => Yw(n));
}
function Qw(r) {
  r.querySelectorAll(Ah).forEach((n) => qw(n));
}
Wh();
document.addEventListener("shopify:section:load", (r) => {
  Wh(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  Qw(r.target);
});
