function rm(s, r) {
  for (var i = 0; i < r.length; i++) {
    const l = r[i];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const c in l)
        if (c !== "default" && !(c in s)) {
          const d = Object.getOwnPropertyDescriptor(l, c);
          d && Object.defineProperty(s, c, d.get ? d : {
            enumerable: !0,
            get: () => l[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
function Zd(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ha = { exports: {} }, ts = {}, Va = { exports: {} }, ee = {};
var yd;
function sm() {
  if (yd) return ee;
  yd = 1;
  var s = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), h = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), E = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function C(w) {
    return w === null || typeof w != "object" ? null : (w = b && w[b] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var R = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, z = Object.assign, H = {};
  function G(w, M, Z) {
    this.props = w, this.context = M, this.refs = H, this.updater = Z || R;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(w, M) {
    if (typeof w != "object" && typeof w != "function" && w != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, w, M, "setState");
  }, G.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function se() {
  }
  se.prototype = G.prototype;
  function Y(w, M, Z) {
    this.props = w, this.context = M, this.refs = H, this.updater = Z || R;
  }
  var J = Y.prototype = new se();
  J.constructor = Y, z(J, G.prototype), J.isPureReactComponent = !0;
  var X = Array.isArray, Ee = Object.prototype.hasOwnProperty, ne = { current: null }, ue = { key: !0, ref: !0, __self: !0, __source: !0 };
  function q(w, M, Z) {
    var te, ie = {}, oe = null, he = null;
    if (M != null) for (te in M.ref !== void 0 && (he = M.ref), M.key !== void 0 && (oe = "" + M.key), M) Ee.call(M, te) && !ue.hasOwnProperty(te) && (ie[te] = M[te]);
    var ce = arguments.length - 2;
    if (ce === 1) ie.children = Z;
    else if (1 < ce) {
      for (var ye = Array(ce), st = 0; st < ce; st++) ye[st] = arguments[st + 2];
      ie.children = ye;
    }
    if (w && w.defaultProps) for (te in ce = w.defaultProps, ce) ie[te] === void 0 && (ie[te] = ce[te]);
    return { $$typeof: s, type: w, key: oe, ref: he, props: ie, _owner: ne.current };
  }
  function fe(w, M) {
    return { $$typeof: s, type: w.type, key: M, ref: w.ref, props: w.props, _owner: w._owner };
  }
  function Ae(w) {
    return typeof w == "object" && w !== null && w.$$typeof === s;
  }
  function Ie(w) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(Z) {
      return M[Z];
    });
  }
  var Je = /\/+/g;
  function Pe(w, M) {
    return typeof w == "object" && w !== null && w.key != null ? Ie("" + w.key) : M.toString(36);
  }
  function vt(w, M, Z, te, ie) {
    var oe = typeof w;
    (oe === "undefined" || oe === "boolean") && (w = null);
    var he = !1;
    if (w === null) he = !0;
    else switch (oe) {
      case "string":
      case "number":
        he = !0;
        break;
      case "object":
        switch (w.$$typeof) {
          case s:
          case r:
            he = !0;
        }
    }
    if (he) return he = w, ie = ie(he), w = te === "" ? "." + Pe(he, 0) : te, X(ie) ? (Z = "", w != null && (Z = w.replace(Je, "$&/") + "/"), vt(ie, M, Z, "", function(st) {
      return st;
    })) : ie != null && (Ae(ie) && (ie = fe(ie, Z + (!ie.key || he && he.key === ie.key ? "" : ("" + ie.key).replace(Je, "$&/") + "/") + w)), M.push(ie)), 1;
    if (he = 0, te = te === "" ? "." : te + ":", X(w)) for (var ce = 0; ce < w.length; ce++) {
      oe = w[ce];
      var ye = te + Pe(oe, ce);
      he += vt(oe, M, Z, ye, ie);
    }
    else if (ye = C(w), typeof ye == "function") for (w = ye.call(w), ce = 0; !(oe = w.next()).done; ) oe = oe.value, ye = te + Pe(oe, ce++), he += vt(oe, M, Z, ye, ie);
    else if (oe === "object") throw M = String(w), Error("Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead.");
    return he;
  }
  function Rt(w, M, Z) {
    if (w == null) return w;
    var te = [], ie = 0;
    return vt(w, te, "", "", function(oe) {
      return M.call(Z, oe, ie++);
    }), te;
  }
  function qe(w) {
    if (w._status === -1) {
      var M = w._result;
      M = M(), M.then(function(Z) {
        (w._status === 0 || w._status === -1) && (w._status = 1, w._result = Z);
      }, function(Z) {
        (w._status === 0 || w._status === -1) && (w._status = 2, w._result = Z);
      }), w._status === -1 && (w._status = 0, w._result = M);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var ke = { current: null }, L = { transition: null }, Q = { ReactCurrentDispatcher: ke, ReactCurrentBatchConfig: L, ReactCurrentOwner: ne };
  function B() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ee.Children = { map: Rt, forEach: function(w, M, Z) {
    Rt(w, function() {
      M.apply(this, arguments);
    }, Z);
  }, count: function(w) {
    var M = 0;
    return Rt(w, function() {
      M++;
    }), M;
  }, toArray: function(w) {
    return Rt(w, function(M) {
      return M;
    }) || [];
  }, only: function(w) {
    if (!Ae(w)) throw Error("React.Children.only expected to receive a single React element child.");
    return w;
  } }, ee.Component = G, ee.Fragment = i, ee.Profiler = c, ee.PureComponent = Y, ee.StrictMode = l, ee.Suspense = m, ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q, ee.act = B, ee.cloneElement = function(w, M, Z) {
    if (w == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + w + ".");
    var te = z({}, w.props), ie = w.key, oe = w.ref, he = w._owner;
    if (M != null) {
      if (M.ref !== void 0 && (oe = M.ref, he = ne.current), M.key !== void 0 && (ie = "" + M.key), w.type && w.type.defaultProps) var ce = w.type.defaultProps;
      for (ye in M) Ee.call(M, ye) && !ue.hasOwnProperty(ye) && (te[ye] = M[ye] === void 0 && ce !== void 0 ? ce[ye] : M[ye]);
    }
    var ye = arguments.length - 2;
    if (ye === 1) te.children = Z;
    else if (1 < ye) {
      ce = Array(ye);
      for (var st = 0; st < ye; st++) ce[st] = arguments[st + 2];
      te.children = ce;
    }
    return { $$typeof: s, type: w.type, key: ie, ref: oe, props: te, _owner: he };
  }, ee.createContext = function(w) {
    return w = { $$typeof: h, _currentValue: w, _currentValue2: w, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, w.Provider = { $$typeof: d, _context: w }, w.Consumer = w;
  }, ee.createElement = q, ee.createFactory = function(w) {
    var M = q.bind(null, w);
    return M.type = w, M;
  }, ee.createRef = function() {
    return { current: null };
  }, ee.forwardRef = function(w) {
    return { $$typeof: p, render: w };
  }, ee.isValidElement = Ae, ee.lazy = function(w) {
    return { $$typeof: E, _payload: { _status: -1, _result: w }, _init: qe };
  }, ee.memo = function(w, M) {
    return { $$typeof: _, type: w, compare: M === void 0 ? null : M };
  }, ee.startTransition = function(w) {
    var M = L.transition;
    L.transition = {};
    try {
      w();
    } finally {
      L.transition = M;
    }
  }, ee.unstable_act = B, ee.useCallback = function(w, M) {
    return ke.current.useCallback(w, M);
  }, ee.useContext = function(w) {
    return ke.current.useContext(w);
  }, ee.useDebugValue = function() {
  }, ee.useDeferredValue = function(w) {
    return ke.current.useDeferredValue(w);
  }, ee.useEffect = function(w, M) {
    return ke.current.useEffect(w, M);
  }, ee.useId = function() {
    return ke.current.useId();
  }, ee.useImperativeHandle = function(w, M, Z) {
    return ke.current.useImperativeHandle(w, M, Z);
  }, ee.useInsertionEffect = function(w, M) {
    return ke.current.useInsertionEffect(w, M);
  }, ee.useLayoutEffect = function(w, M) {
    return ke.current.useLayoutEffect(w, M);
  }, ee.useMemo = function(w, M) {
    return ke.current.useMemo(w, M);
  }, ee.useReducer = function(w, M, Z) {
    return ke.current.useReducer(w, M, Z);
  }, ee.useRef = function(w) {
    return ke.current.useRef(w);
  }, ee.useState = function(w) {
    return ke.current.useState(w);
  }, ee.useSyncExternalStore = function(w, M, Z) {
    return ke.current.useSyncExternalStore(w, M, Z);
  }, ee.useTransition = function() {
    return ke.current.useTransition();
  }, ee.version = "18.3.1", ee;
}
var vd;
function al() {
  return vd || (vd = 1, Va.exports = sm()), Va.exports;
}
var _d;
function im() {
  if (_d) return ts;
  _d = 1;
  var s = al(), r = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, c = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(p, m, _) {
    var E, b = {}, C = null, R = null;
    _ !== void 0 && (C = "" + _), m.key !== void 0 && (C = "" + m.key), m.ref !== void 0 && (R = m.ref);
    for (E in m) l.call(m, E) && !d.hasOwnProperty(E) && (b[E] = m[E]);
    if (p && p.defaultProps) for (E in m = p.defaultProps, m) b[E] === void 0 && (b[E] = m[E]);
    return { $$typeof: r, type: p, key: C, ref: R, props: b, _owner: c.current };
  }
  return ts.Fragment = i, ts.jsx = h, ts.jsxs = h, ts;
}
var Sd;
function om() {
  return Sd || (Sd = 1, Ha.exports = im()), Ha.exports;
}
var y = om(), I = al();
const Gt = /* @__PURE__ */ Zd(I), am = /* @__PURE__ */ rm({
  __proto__: null,
  default: Gt
}, [I]);
var bi = {}, Wa = { exports: {} }, rt = {}, Ya = { exports: {} }, Qa = {};
var wd;
function lm() {
  return wd || (wd = 1, (function(s) {
    function r(L, Q) {
      var B = L.length;
      L.push(Q);
      e: for (; 0 < B; ) {
        var w = B - 1 >>> 1, M = L[w];
        if (0 < c(M, Q)) L[w] = Q, L[B] = M, B = w;
        else break e;
      }
    }
    function i(L) {
      return L.length === 0 ? null : L[0];
    }
    function l(L) {
      if (L.length === 0) return null;
      var Q = L[0], B = L.pop();
      if (B !== Q) {
        L[0] = B;
        e: for (var w = 0, M = L.length, Z = M >>> 1; w < Z; ) {
          var te = 2 * (w + 1) - 1, ie = L[te], oe = te + 1, he = L[oe];
          if (0 > c(ie, B)) oe < M && 0 > c(he, ie) ? (L[w] = he, L[oe] = B, w = oe) : (L[w] = ie, L[te] = B, w = te);
          else if (oe < M && 0 > c(he, B)) L[w] = he, L[oe] = B, w = oe;
          else break e;
        }
      }
      return Q;
    }
    function c(L, Q) {
      var B = L.sortIndex - Q.sortIndex;
      return B !== 0 ? B : L.id - Q.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      s.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, p = h.now();
      s.unstable_now = function() {
        return h.now() - p;
      };
    }
    var m = [], _ = [], E = 1, b = null, C = 3, R = !1, z = !1, H = !1, G = typeof setTimeout == "function" ? setTimeout : null, se = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function J(L) {
      for (var Q = i(_); Q !== null; ) {
        if (Q.callback === null) l(_);
        else if (Q.startTime <= L) l(_), Q.sortIndex = Q.expirationTime, r(m, Q);
        else break;
        Q = i(_);
      }
    }
    function X(L) {
      if (H = !1, J(L), !z) if (i(m) !== null) z = !0, qe(Ee);
      else {
        var Q = i(_);
        Q !== null && ke(X, Q.startTime - L);
      }
    }
    function Ee(L, Q) {
      z = !1, H && (H = !1, se(q), q = -1), R = !0;
      var B = C;
      try {
        for (J(Q), b = i(m); b !== null && (!(b.expirationTime > Q) || L && !Ie()); ) {
          var w = b.callback;
          if (typeof w == "function") {
            b.callback = null, C = b.priorityLevel;
            var M = w(b.expirationTime <= Q);
            Q = s.unstable_now(), typeof M == "function" ? b.callback = M : b === i(m) && l(m), J(Q);
          } else l(m);
          b = i(m);
        }
        if (b !== null) var Z = !0;
        else {
          var te = i(_);
          te !== null && ke(X, te.startTime - Q), Z = !1;
        }
        return Z;
      } finally {
        b = null, C = B, R = !1;
      }
    }
    var ne = !1, ue = null, q = -1, fe = 5, Ae = -1;
    function Ie() {
      return !(s.unstable_now() - Ae < fe);
    }
    function Je() {
      if (ue !== null) {
        var L = s.unstable_now();
        Ae = L;
        var Q = !0;
        try {
          Q = ue(!0, L);
        } finally {
          Q ? Pe() : (ne = !1, ue = null);
        }
      } else ne = !1;
    }
    var Pe;
    if (typeof Y == "function") Pe = function() {
      Y(Je);
    };
    else if (typeof MessageChannel < "u") {
      var vt = new MessageChannel(), Rt = vt.port2;
      vt.port1.onmessage = Je, Pe = function() {
        Rt.postMessage(null);
      };
    } else Pe = function() {
      G(Je, 0);
    };
    function qe(L) {
      ue = L, ne || (ne = !0, Pe());
    }
    function ke(L, Q) {
      q = G(function() {
        L(s.unstable_now());
      }, Q);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, s.unstable_continueExecution = function() {
      z || R || (z = !0, qe(Ee));
    }, s.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : fe = 0 < L ? Math.floor(1e3 / L) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return C;
    }, s.unstable_getFirstCallbackNode = function() {
      return i(m);
    }, s.unstable_next = function(L) {
      switch (C) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = C;
      }
      var B = C;
      C = Q;
      try {
        return L();
      } finally {
        C = B;
      }
    }, s.unstable_pauseExecution = function() {
    }, s.unstable_requestPaint = function() {
    }, s.unstable_runWithPriority = function(L, Q) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var B = C;
      C = L;
      try {
        return Q();
      } finally {
        C = B;
      }
    }, s.unstable_scheduleCallback = function(L, Q, B) {
      var w = s.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? w + B : w) : B = w, L) {
        case 1:
          var M = -1;
          break;
        case 2:
          M = 250;
          break;
        case 5:
          M = 1073741823;
          break;
        case 4:
          M = 1e4;
          break;
        default:
          M = 5e3;
      }
      return M = B + M, L = { id: E++, callback: Q, priorityLevel: L, startTime: B, expirationTime: M, sortIndex: -1 }, B > w ? (L.sortIndex = B, r(_, L), i(m) === null && L === i(_) && (H ? (se(q), q = -1) : H = !0, ke(X, B - w))) : (L.sortIndex = M, r(m, L), z || R || (z = !0, qe(Ee))), L;
    }, s.unstable_shouldYield = Ie, s.unstable_wrapCallback = function(L) {
      var Q = C;
      return function() {
        var B = C;
        C = Q;
        try {
          return L.apply(this, arguments);
        } finally {
          C = B;
        }
      };
    };
  })(Qa)), Qa;
}
var xd;
function um() {
  return xd || (xd = 1, Ya.exports = lm()), Ya.exports;
}
var Ed;
function cm() {
  if (Ed) return rt;
  Ed = 1;
  var s = al(), r = um();
  function i(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var l = /* @__PURE__ */ new Set(), c = {};
  function d(e, t) {
    h(e, t), h(e + "Capture", t);
  }
  function h(e, t) {
    for (c[e] = t, e = 0; e < t.length; e++) l.add(t[e]);
  }
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, _ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, E = {}, b = {};
  function C(e) {
    return m.call(b, e) ? !0 : m.call(E, e) ? !1 : _.test(e) ? b[e] = !0 : (E[e] = !0, !1);
  }
  function R(e, t, n, o) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function z(e, t, n, o) {
    if (t === null || typeof t > "u" || R(e, t, n, o)) return !0;
    if (o) return !1;
    if (n !== null) switch (n.type) {
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
  function H(e, t, n, o, a, u, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = f;
  }
  var G = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    G[e] = new H(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    G[t] = new H(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    G[e] = new H(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    G[e] = new H(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    G[e] = new H(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    G[e] = new H(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    G[e] = new H(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    G[e] = new H(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    G[e] = new H(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var se = /[\-:]([a-z])/g;
  function Y(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      se,
      Y
    );
    G[t] = new H(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(se, Y);
    G[t] = new H(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(se, Y);
    G[t] = new H(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    G[e] = new H(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), G.xlinkHref = new H("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    G[e] = new H(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function J(e, t, n, o) {
    var a = G.hasOwnProperty(t) ? G[t] : null;
    (a !== null ? a.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (z(t, n, a, o) && (n = null), o || a === null ? C(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = n === null ? a.type === 3 ? !1 : "" : n : (t = a.attributeName, o = a.attributeNamespace, n === null ? e.removeAttribute(t) : (a = a.type, n = a === 3 || a === 4 && n === !0 ? "" : "" + n, o ? e.setAttributeNS(o, t, n) : e.setAttribute(t, n))));
  }
  var X = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ee = /* @__PURE__ */ Symbol.for("react.element"), ne = /* @__PURE__ */ Symbol.for("react.portal"), ue = /* @__PURE__ */ Symbol.for("react.fragment"), q = /* @__PURE__ */ Symbol.for("react.strict_mode"), fe = /* @__PURE__ */ Symbol.for("react.profiler"), Ae = /* @__PURE__ */ Symbol.for("react.provider"), Ie = /* @__PURE__ */ Symbol.for("react.context"), Je = /* @__PURE__ */ Symbol.for("react.forward_ref"), Pe = /* @__PURE__ */ Symbol.for("react.suspense"), vt = /* @__PURE__ */ Symbol.for("react.suspense_list"), Rt = /* @__PURE__ */ Symbol.for("react.memo"), qe = /* @__PURE__ */ Symbol.for("react.lazy"), ke = /* @__PURE__ */ Symbol.for("react.offscreen"), L = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object" ? null : (e = L && e[L] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var B = Object.assign, w;
  function M(e) {
    if (w === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      w = t && t[1] || "";
    }
    return `
` + w + e;
  }
  var Z = !1;
  function te(e, t) {
    if (!e || Z) return "";
    Z = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (T) {
          var o = T;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (T) {
          o = T;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (T) {
          o = T;
        }
        e();
      }
    } catch (T) {
      if (T && o && typeof T.stack == "string") {
        for (var a = T.stack.split(`
`), u = o.stack.split(`
`), f = a.length - 1, g = u.length - 1; 1 <= f && 0 <= g && a[f] !== u[g]; ) g--;
        for (; 1 <= f && 0 <= g; f--, g--) if (a[f] !== u[g]) {
          if (f !== 1 || g !== 1)
            do
              if (f--, g--, 0 > g || a[f] !== u[g]) {
                var v = `
` + a[f].replace(" at new ", " at ");
                return e.displayName && v.includes("<anonymous>") && (v = v.replace("<anonymous>", e.displayName)), v;
              }
            while (1 <= f && 0 <= g);
          break;
        }
      }
    } finally {
      Z = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? M(e) : "";
  }
  function ie(e) {
    switch (e.tag) {
      case 5:
        return M(e.type);
      case 16:
        return M("Lazy");
      case 13:
        return M("Suspense");
      case 19:
        return M("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = te(e.type, !1), e;
      case 11:
        return e = te(e.type.render, !1), e;
      case 1:
        return e = te(e.type, !0), e;
      default:
        return "";
    }
  }
  function oe(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ue:
        return "Fragment";
      case ne:
        return "Portal";
      case fe:
        return "Profiler";
      case q:
        return "StrictMode";
      case Pe:
        return "Suspense";
      case vt:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ie:
        return (e.displayName || "Context") + ".Consumer";
      case Ae:
        return (e._context.displayName || "Context") + ".Provider";
      case Je:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Rt:
        return t = e.displayName || null, t !== null ? t : oe(e.type) || "Memo";
      case qe:
        t = e._payload, e = e._init;
        try {
          return oe(e(t));
        } catch {
        }
    }
    return null;
  }
  function he(e) {
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
        return t === q ? "StrictMode" : "Mode";
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
  function ce(e) {
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
  function ye(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function st(e) {
    var t = ye(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, u = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return a.call(this);
      }, set: function(f) {
        o = "" + f, u.call(this, f);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(f) {
        o = "" + f;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function ys(e) {
    e._valueTracker || (e._valueTracker = st(e));
  }
  function El(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), o = "";
    return e && (o = ye(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== n ? (t.setValue(e), !0) : !1;
  }
  function vs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Ki(e, t) {
    var n = t.checked;
    return B({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function kl(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    n = ce(t.value != null ? t.value : n), e._wrapperState = { initialChecked: o, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Cl(e, t) {
    t = t.checked, t != null && J(e, "checked", t, !1);
  }
  function Ji(e, t) {
    Cl(e, t);
    var n = ce(t.value), o = t.type;
    if (n != null) o === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? qi(e, t.type, n) : t.hasOwnProperty("defaultValue") && qi(e, t.type, ce(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Tl(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function qi(e, t, n) {
    (t !== "number" || vs(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var gr = Array.isArray;
  function zn(e, t, n, o) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && o && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + ce(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = !0, o && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Xi(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return B({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function bl(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(i(92));
        if (gr(n)) {
          if (1 < n.length) throw Error(i(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: ce(n) };
  }
  function Il(e, t) {
    var n = ce(t.value), o = ce(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), o != null && (e.defaultValue = "" + o);
  }
  function Rl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Nl(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Zi(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Nl(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var _s, Ml = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, o, a) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, o, a);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (_s = _s || document.createElement("div"), _s.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = _s.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function yr(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var vr = {
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
  }, ah = ["Webkit", "ms", "Moz", "O"];
  Object.keys(vr).forEach(function(e) {
    ah.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), vr[t] = vr[e];
    });
  });
  function Al(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || vr.hasOwnProperty(e) && vr[e] ? ("" + t).trim() : t + "px";
  }
  function Pl(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var o = n.indexOf("--") === 0, a = Al(n, t[n], o);
      n === "float" && (n = "cssFloat"), o ? e.setProperty(n, a) : e[n] = a;
    }
  }
  var lh = B({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function eo(e, t) {
    if (t) {
      if (lh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function to(e, t) {
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
  var no = null;
  function ro(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var so = null, Dn = null, Bn = null;
  function jl(e) {
    if (e = Fr(e)) {
      if (typeof so != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = $s(t), so(e.stateNode, e.type, t));
    }
  }
  function Ll(e) {
    Dn ? Bn ? Bn.push(e) : Bn = [e] : Dn = e;
  }
  function Ol() {
    if (Dn) {
      var e = Dn, t = Bn;
      if (Bn = Dn = null, jl(e), t) for (e = 0; e < t.length; e++) jl(t[e]);
    }
  }
  function zl(e, t) {
    return e(t);
  }
  function Dl() {
  }
  var io = !1;
  function Bl(e, t, n) {
    if (io) return e(t, n);
    io = !0;
    try {
      return zl(e, t, n);
    } finally {
      io = !1, (Dn !== null || Bn !== null) && (Dl(), Ol());
    }
  }
  function _r(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var o = $s(n);
    if (o === null) return null;
    n = o[t];
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
    if (n && typeof n != "function") throw Error(i(231, t, typeof n));
    return n;
  }
  var oo = !1;
  if (p) try {
    var Sr = {};
    Object.defineProperty(Sr, "passive", { get: function() {
      oo = !0;
    } }), window.addEventListener("test", Sr, Sr), window.removeEventListener("test", Sr, Sr);
  } catch {
    oo = !1;
  }
  function uh(e, t, n, o, a, u, f, g, v) {
    var T = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, T);
    } catch (A) {
      this.onError(A);
    }
  }
  var wr = !1, Ss = null, ws = !1, ao = null, ch = { onError: function(e) {
    wr = !0, Ss = e;
  } };
  function dh(e, t, n, o, a, u, f, g, v) {
    wr = !1, Ss = null, uh.apply(ch, arguments);
  }
  function fh(e, t, n, o, a, u, f, g, v) {
    if (dh.apply(this, arguments), wr) {
      if (wr) {
        var T = Ss;
        wr = !1, Ss = null;
      } else throw Error(i(198));
      ws || (ws = !0, ao = T);
    }
  }
  function gn(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Fl(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Ul(e) {
    if (gn(e) !== e) throw Error(i(188));
  }
  function hh(e) {
    var t = e.alternate;
    if (!t) {
      if (t = gn(e), t === null) throw Error(i(188));
      return t !== e ? null : e;
    }
    for (var n = e, o = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (o = a.return, o !== null) {
          n = o;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === n) return Ul(a), e;
          if (u === o) return Ul(a), t;
          u = u.sibling;
        }
        throw Error(i(188));
      }
      if (n.return !== o.return) n = a, o = u;
      else {
        for (var f = !1, g = a.child; g; ) {
          if (g === n) {
            f = !0, n = a, o = u;
            break;
          }
          if (g === o) {
            f = !0, o = a, n = u;
            break;
          }
          g = g.sibling;
        }
        if (!f) {
          for (g = u.child; g; ) {
            if (g === n) {
              f = !0, n = u, o = a;
              break;
            }
            if (g === o) {
              f = !0, o = u, n = a;
              break;
            }
            g = g.sibling;
          }
          if (!f) throw Error(i(189));
        }
      }
      if (n.alternate !== o) throw Error(i(190));
    }
    if (n.tag !== 3) throw Error(i(188));
    return n.stateNode.current === n ? e : t;
  }
  function $l(e) {
    return e = hh(e), e !== null ? Hl(e) : null;
  }
  function Hl(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Hl(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Vl = r.unstable_scheduleCallback, Wl = r.unstable_cancelCallback, ph = r.unstable_shouldYield, mh = r.unstable_requestPaint, Re = r.unstable_now, gh = r.unstable_getCurrentPriorityLevel, lo = r.unstable_ImmediatePriority, Yl = r.unstable_UserBlockingPriority, xs = r.unstable_NormalPriority, yh = r.unstable_LowPriority, Ql = r.unstable_IdlePriority, Es = null, Nt = null;
  function vh(e) {
    if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
      Nt.onCommitFiberRoot(Es, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var _t = Math.clz32 ? Math.clz32 : wh, _h = Math.log, Sh = Math.LN2;
  function wh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (_h(e) / Sh | 0) | 0;
  }
  var ks = 64, Cs = 4194304;
  function xr(e) {
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
  function Ts(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var o = 0, a = e.suspendedLanes, u = e.pingedLanes, f = n & 268435455;
    if (f !== 0) {
      var g = f & ~a;
      g !== 0 ? o = xr(g) : (u &= f, u !== 0 && (o = xr(u)));
    } else f = n & ~a, f !== 0 ? o = xr(f) : u !== 0 && (o = xr(u));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & a) === 0 && (a = o & -o, u = t & -t, a >= u || a === 16 && (u & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) n = 31 - _t(t), a = 1 << n, o |= e[n], t &= ~a;
    return o;
  }
  function xh(e, t) {
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
  function Eh(e, t) {
    for (var n = e.suspendedLanes, o = e.pingedLanes, a = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var f = 31 - _t(u), g = 1 << f, v = a[f];
      v === -1 ? ((g & n) === 0 || (g & o) !== 0) && (a[f] = xh(g, t)) : v <= t && (e.expiredLanes |= g), u &= ~g;
    }
  }
  function uo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Gl() {
    var e = ks;
    return ks <<= 1, (ks & 4194240) === 0 && (ks = 64), e;
  }
  function co(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Er(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - _t(t), e[t] = n;
  }
  function kh(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var a = 31 - _t(n), u = 1 << a;
      t[a] = 0, o[a] = -1, e[a] = -1, n &= ~u;
    }
  }
  function fo(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var o = 31 - _t(n), a = 1 << o;
      a & t | e[o] & t && (e[o] |= t), n &= ~a;
    }
  }
  var de = 0;
  function Kl(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Jl, ho, ql, Xl, Zl, po = !1, bs = [], Jt = null, qt = null, Xt = null, kr = /* @__PURE__ */ new Map(), Cr = /* @__PURE__ */ new Map(), Zt = [], Ch = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function eu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Jt = null;
        break;
      case "dragenter":
      case "dragleave":
        qt = null;
        break;
      case "mouseover":
      case "mouseout":
        Xt = null;
        break;
      case "pointerover":
      case "pointerout":
        kr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cr.delete(t.pointerId);
    }
  }
  function Tr(e, t, n, o, a, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: o, nativeEvent: u, targetContainers: [a] }, t !== null && (t = Fr(t), t !== null && ho(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function Th(e, t, n, o, a) {
    switch (t) {
      case "focusin":
        return Jt = Tr(Jt, e, t, n, o, a), !0;
      case "dragenter":
        return qt = Tr(qt, e, t, n, o, a), !0;
      case "mouseover":
        return Xt = Tr(Xt, e, t, n, o, a), !0;
      case "pointerover":
        var u = a.pointerId;
        return kr.set(u, Tr(kr.get(u) || null, e, t, n, o, a)), !0;
      case "gotpointercapture":
        return u = a.pointerId, Cr.set(u, Tr(Cr.get(u) || null, e, t, n, o, a)), !0;
    }
    return !1;
  }
  function tu(e) {
    var t = yn(e.target);
    if (t !== null) {
      var n = gn(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = Fl(n), t !== null) {
            e.blockedOn = t, Zl(e.priority, function() {
              ql(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Is(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = go(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var o = new n.constructor(n.type, n);
        no = o, n.target.dispatchEvent(o), no = null;
      } else return t = Fr(n), t !== null && ho(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function nu(e, t, n) {
    Is(e) && n.delete(t);
  }
  function bh() {
    po = !1, Jt !== null && Is(Jt) && (Jt = null), qt !== null && Is(qt) && (qt = null), Xt !== null && Is(Xt) && (Xt = null), kr.forEach(nu), Cr.forEach(nu);
  }
  function br(e, t) {
    e.blockedOn === t && (e.blockedOn = null, po || (po = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, bh)));
  }
  function Ir(e) {
    function t(a) {
      return br(a, e);
    }
    if (0 < bs.length) {
      br(bs[0], e);
      for (var n = 1; n < bs.length; n++) {
        var o = bs[n];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (Jt !== null && br(Jt, e), qt !== null && br(qt, e), Xt !== null && br(Xt, e), kr.forEach(t), Cr.forEach(t), n = 0; n < Zt.length; n++) o = Zt[n], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < Zt.length && (n = Zt[0], n.blockedOn === null); ) tu(n), n.blockedOn === null && Zt.shift();
  }
  var Fn = X.ReactCurrentBatchConfig, Rs = !0;
  function Ih(e, t, n, o) {
    var a = de, u = Fn.transition;
    Fn.transition = null;
    try {
      de = 1, mo(e, t, n, o);
    } finally {
      de = a, Fn.transition = u;
    }
  }
  function Rh(e, t, n, o) {
    var a = de, u = Fn.transition;
    Fn.transition = null;
    try {
      de = 4, mo(e, t, n, o);
    } finally {
      de = a, Fn.transition = u;
    }
  }
  function mo(e, t, n, o) {
    if (Rs) {
      var a = go(e, t, n, o);
      if (a === null) Po(e, t, o, Ns, n), eu(e, o);
      else if (Th(a, e, t, n, o)) o.stopPropagation();
      else if (eu(e, o), t & 4 && -1 < Ch.indexOf(e)) {
        for (; a !== null; ) {
          var u = Fr(a);
          if (u !== null && Jl(u), u = go(e, t, n, o), u === null && Po(e, t, o, Ns, n), u === a) break;
          a = u;
        }
        a !== null && o.stopPropagation();
      } else Po(e, t, o, null, n);
    }
  }
  var Ns = null;
  function go(e, t, n, o) {
    if (Ns = null, e = ro(o), e = yn(e), e !== null) if (t = gn(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = Fl(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Ns = e, null;
  }
  function ru(e) {
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
        switch (gh()) {
          case lo:
            return 1;
          case Yl:
            return 4;
          case xs:
          case yh:
            return 16;
          case Ql:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var en = null, yo = null, Ms = null;
  function su() {
    if (Ms) return Ms;
    var e, t = yo, n = t.length, o, a = "value" in en ? en.value : en.textContent, u = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var f = n - e;
    for (o = 1; o <= f && t[n - o] === a[u - o]; o++) ;
    return Ms = a.slice(e, 1 < o ? 1 - o : void 0);
  }
  function As(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ps() {
    return !0;
  }
  function iu() {
    return !1;
  }
  function it(e) {
    function t(n, o, a, u, f) {
      this._reactName = n, this._targetInst = a, this.type = o, this.nativeEvent = u, this.target = f, this.currentTarget = null;
      for (var g in e) e.hasOwnProperty(g) && (n = e[g], this[g] = n ? n(u) : u[g]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Ps : iu, this.isPropagationStopped = iu, this;
    }
    return B(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ps);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ps);
    }, persist: function() {
    }, isPersistent: Ps }), t;
  }
  var Un = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, vo = it(Un), Rr = B({}, Un, { view: 0, detail: 0 }), Nh = it(Rr), _o, So, Nr, js = B({}, Rr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: xo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Nr && (Nr && e.type === "mousemove" ? (_o = e.screenX - Nr.screenX, So = e.screenY - Nr.screenY) : So = _o = 0, Nr = e), _o);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : So;
  } }), ou = it(js), Mh = B({}, js, { dataTransfer: 0 }), Ah = it(Mh), Ph = B({}, Rr, { relatedTarget: 0 }), wo = it(Ph), jh = B({}, Un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Lh = it(jh), Oh = B({}, Un, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), zh = it(Oh), Dh = B({}, Un, { data: 0 }), au = it(Dh), Bh = {
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
  }, Fh = {
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
  }, Uh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function $h(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Uh[e]) ? !!t[e] : !1;
  }
  function xo() {
    return $h;
  }
  var Hh = B({}, Rr, { key: function(e) {
    if (e.key) {
      var t = Bh[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = As(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Fh[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: xo, charCode: function(e) {
    return e.type === "keypress" ? As(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? As(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Vh = it(Hh), Wh = B({}, js, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), lu = it(Wh), Yh = B({}, Rr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: xo }), Qh = it(Yh), Gh = B({}, Un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Kh = it(Gh), Jh = B({}, js, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), qh = it(Jh), Xh = [9, 13, 27, 32], Eo = p && "CompositionEvent" in window, Mr = null;
  p && "documentMode" in document && (Mr = document.documentMode);
  var Zh = p && "TextEvent" in window && !Mr, uu = p && (!Eo || Mr && 8 < Mr && 11 >= Mr), cu = " ", du = !1;
  function fu(e, t) {
    switch (e) {
      case "keyup":
        return Xh.indexOf(t.keyCode) !== -1;
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
  function hu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var $n = !1;
  function ep(e, t) {
    switch (e) {
      case "compositionend":
        return hu(t);
      case "keypress":
        return t.which !== 32 ? null : (du = !0, cu);
      case "textInput":
        return e = t.data, e === cu && du ? null : e;
      default:
        return null;
    }
  }
  function tp(e, t) {
    if ($n) return e === "compositionend" || !Eo && fu(e, t) ? (e = su(), Ms = yo = en = null, $n = !1, e) : null;
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
        return uu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var np = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function pu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!np[e.type] : t === "textarea";
  }
  function mu(e, t, n, o) {
    Ll(o), t = Bs(t, "onChange"), 0 < t.length && (n = new vo("onChange", "change", null, n, o), e.push({ event: n, listeners: t }));
  }
  var Ar = null, Pr = null;
  function rp(e) {
    Pu(e, 0);
  }
  function Ls(e) {
    var t = Qn(e);
    if (El(t)) return e;
  }
  function sp(e, t) {
    if (e === "change") return t;
  }
  var gu = !1;
  if (p) {
    var ko;
    if (p) {
      var Co = "oninput" in document;
      if (!Co) {
        var yu = document.createElement("div");
        yu.setAttribute("oninput", "return;"), Co = typeof yu.oninput == "function";
      }
      ko = Co;
    } else ko = !1;
    gu = ko && (!document.documentMode || 9 < document.documentMode);
  }
  function vu() {
    Ar && (Ar.detachEvent("onpropertychange", _u), Pr = Ar = null);
  }
  function _u(e) {
    if (e.propertyName === "value" && Ls(Pr)) {
      var t = [];
      mu(t, Pr, e, ro(e)), Bl(rp, t);
    }
  }
  function ip(e, t, n) {
    e === "focusin" ? (vu(), Ar = t, Pr = n, Ar.attachEvent("onpropertychange", _u)) : e === "focusout" && vu();
  }
  function op(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ls(Pr);
  }
  function ap(e, t) {
    if (e === "click") return Ls(t);
  }
  function lp(e, t) {
    if (e === "input" || e === "change") return Ls(t);
  }
  function up(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var St = typeof Object.is == "function" ? Object.is : up;
  function jr(e, t) {
    if (St(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), o = Object.keys(t);
    if (n.length !== o.length) return !1;
    for (o = 0; o < n.length; o++) {
      var a = n[o];
      if (!m.call(t, a) || !St(e[a], t[a])) return !1;
    }
    return !0;
  }
  function Su(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function wu(e, t) {
    var n = Su(e);
    e = 0;
    for (var o; n; ) {
      if (n.nodeType === 3) {
        if (o = e + n.textContent.length, e <= t && o >= t) return { node: n, offset: t - e };
        e = o;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Su(n);
    }
  }
  function xu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Eu() {
    for (var e = window, t = vs(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = vs(e.document);
    }
    return t;
  }
  function To(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function cp(e) {
    var t = Eu(), n = e.focusedElem, o = e.selectionRange;
    if (t !== n && n && n.ownerDocument && xu(n.ownerDocument.documentElement, n)) {
      if (o !== null && To(n)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var a = n.textContent.length, u = Math.min(o.start, a);
          o = o.end === void 0 ? u : Math.min(o.end, a), !e.extend && u > o && (a = o, o = u, u = a), a = wu(n, u);
          var f = wu(
            n,
            o
          );
          a && f && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== f.node || e.focusOffset !== f.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), u > o ? (e.addRange(t), e.extend(f.node, f.offset)) : (t.setEnd(f.node, f.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var dp = p && "documentMode" in document && 11 >= document.documentMode, Hn = null, bo = null, Lr = null, Io = !1;
  function ku(e, t, n) {
    var o = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Io || Hn == null || Hn !== vs(o) || (o = Hn, "selectionStart" in o && To(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Lr && jr(Lr, o) || (Lr = o, o = Bs(bo, "onSelect"), 0 < o.length && (t = new vo("onSelect", "select", null, t, n), e.push({ event: t, listeners: o }), t.target = Hn)));
  }
  function Os(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Vn = { animationend: Os("Animation", "AnimationEnd"), animationiteration: Os("Animation", "AnimationIteration"), animationstart: Os("Animation", "AnimationStart"), transitionend: Os("Transition", "TransitionEnd") }, Ro = {}, Cu = {};
  p && (Cu = document.createElement("div").style, "AnimationEvent" in window || (delete Vn.animationend.animation, delete Vn.animationiteration.animation, delete Vn.animationstart.animation), "TransitionEvent" in window || delete Vn.transitionend.transition);
  function zs(e) {
    if (Ro[e]) return Ro[e];
    if (!Vn[e]) return e;
    var t = Vn[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Cu) return Ro[e] = t[n];
    return e;
  }
  var Tu = zs("animationend"), bu = zs("animationiteration"), Iu = zs("animationstart"), Ru = zs("transitionend"), Nu = /* @__PURE__ */ new Map(), Mu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function tn(e, t) {
    Nu.set(e, t), d(t, [e]);
  }
  for (var No = 0; No < Mu.length; No++) {
    var Mo = Mu[No], fp = Mo.toLowerCase(), hp = Mo[0].toUpperCase() + Mo.slice(1);
    tn(fp, "on" + hp);
  }
  tn(Tu, "onAnimationEnd"), tn(bu, "onAnimationIteration"), tn(Iu, "onAnimationStart"), tn("dblclick", "onDoubleClick"), tn("focusin", "onFocus"), tn("focusout", "onBlur"), tn(Ru, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Or = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), pp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Or));
  function Au(e, t, n) {
    var o = e.type || "unknown-event";
    e.currentTarget = n, fh(o, t, void 0, e), e.currentTarget = null;
  }
  function Pu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var o = e[n], a = o.event;
      o = o.listeners;
      e: {
        var u = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var g = o[f], v = g.instance, T = g.currentTarget;
          if (g = g.listener, v !== u && a.isPropagationStopped()) break e;
          Au(a, g, T), u = v;
        }
        else for (f = 0; f < o.length; f++) {
          if (g = o[f], v = g.instance, T = g.currentTarget, g = g.listener, v !== u && a.isPropagationStopped()) break e;
          Au(a, g, T), u = v;
        }
      }
    }
    if (ws) throw e = ao, ws = !1, ao = null, e;
  }
  function me(e, t) {
    var n = t[Bo];
    n === void 0 && (n = t[Bo] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    n.has(o) || (ju(t, e, 2, !1), n.add(o));
  }
  function Ao(e, t, n) {
    var o = 0;
    t && (o |= 4), ju(n, e, o, t);
  }
  var Ds = "_reactListening" + Math.random().toString(36).slice(2);
  function zr(e) {
    if (!e[Ds]) {
      e[Ds] = !0, l.forEach(function(n) {
        n !== "selectionchange" && (pp.has(n) || Ao(n, !1, e), Ao(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ds] || (t[Ds] = !0, Ao("selectionchange", !1, t));
    }
  }
  function ju(e, t, n, o) {
    switch (ru(t)) {
      case 1:
        var a = Ih;
        break;
      case 4:
        a = Rh;
        break;
      default:
        a = mo;
    }
    n = a.bind(null, t, n, e), a = void 0, !oo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), o ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
  }
  function Po(e, t, n, o, a) {
    var u = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var f = o.tag;
      if (f === 3 || f === 4) {
        var g = o.stateNode.containerInfo;
        if (g === a || g.nodeType === 8 && g.parentNode === a) break;
        if (f === 4) for (f = o.return; f !== null; ) {
          var v = f.tag;
          if ((v === 3 || v === 4) && (v = f.stateNode.containerInfo, v === a || v.nodeType === 8 && v.parentNode === a)) return;
          f = f.return;
        }
        for (; g !== null; ) {
          if (f = yn(g), f === null) return;
          if (v = f.tag, v === 5 || v === 6) {
            o = u = f;
            continue e;
          }
          g = g.parentNode;
        }
      }
      o = o.return;
    }
    Bl(function() {
      var T = u, A = ro(n), P = [];
      e: {
        var N = Nu.get(e);
        if (N !== void 0) {
          var O = vo, F = e;
          switch (e) {
            case "keypress":
              if (As(n) === 0) break e;
            case "keydown":
            case "keyup":
              O = Vh;
              break;
            case "focusin":
              F = "focus", O = wo;
              break;
            case "focusout":
              F = "blur", O = wo;
              break;
            case "beforeblur":
            case "afterblur":
              O = wo;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              O = ou;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = Ah;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = Qh;
              break;
            case Tu:
            case bu:
            case Iu:
              O = Lh;
              break;
            case Ru:
              O = Kh;
              break;
            case "scroll":
              O = Nh;
              break;
            case "wheel":
              O = qh;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = zh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = lu;
          }
          var U = (t & 4) !== 0, Ne = !U && e === "scroll", x = U ? N !== null ? N + "Capture" : null : N;
          U = [];
          for (var S = T, k; S !== null; ) {
            k = S;
            var j = k.stateNode;
            if (k.tag === 5 && j !== null && (k = j, x !== null && (j = _r(S, x), j != null && U.push(Dr(S, j, k)))), Ne) break;
            S = S.return;
          }
          0 < U.length && (N = new O(N, F, null, n, A), P.push({ event: N, listeners: U }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (N = e === "mouseover" || e === "pointerover", O = e === "mouseout" || e === "pointerout", N && n !== no && (F = n.relatedTarget || n.fromElement) && (yn(F) || F[Dt])) break e;
          if ((O || N) && (N = A.window === A ? A : (N = A.ownerDocument) ? N.defaultView || N.parentWindow : window, O ? (F = n.relatedTarget || n.toElement, O = T, F = F ? yn(F) : null, F !== null && (Ne = gn(F), F !== Ne || F.tag !== 5 && F.tag !== 6) && (F = null)) : (O = null, F = T), O !== F)) {
            if (U = ou, j = "onMouseLeave", x = "onMouseEnter", S = "mouse", (e === "pointerout" || e === "pointerover") && (U = lu, j = "onPointerLeave", x = "onPointerEnter", S = "pointer"), Ne = O == null ? N : Qn(O), k = F == null ? N : Qn(F), N = new U(j, S + "leave", O, n, A), N.target = Ne, N.relatedTarget = k, j = null, yn(A) === T && (U = new U(x, S + "enter", F, n, A), U.target = k, U.relatedTarget = Ne, j = U), Ne = j, O && F) t: {
              for (U = O, x = F, S = 0, k = U; k; k = Wn(k)) S++;
              for (k = 0, j = x; j; j = Wn(j)) k++;
              for (; 0 < S - k; ) U = Wn(U), S--;
              for (; 0 < k - S; ) x = Wn(x), k--;
              for (; S--; ) {
                if (U === x || x !== null && U === x.alternate) break t;
                U = Wn(U), x = Wn(x);
              }
              U = null;
            }
            else U = null;
            O !== null && Lu(P, N, O, U, !1), F !== null && Ne !== null && Lu(P, Ne, F, U, !0);
          }
        }
        e: {
          if (N = T ? Qn(T) : window, O = N.nodeName && N.nodeName.toLowerCase(), O === "select" || O === "input" && N.type === "file") var $ = sp;
          else if (pu(N)) if (gu) $ = lp;
          else {
            $ = op;
            var V = ip;
          }
          else (O = N.nodeName) && O.toLowerCase() === "input" && (N.type === "checkbox" || N.type === "radio") && ($ = ap);
          if ($ && ($ = $(e, T))) {
            mu(P, $, n, A);
            break e;
          }
          V && V(e, N, T), e === "focusout" && (V = N._wrapperState) && V.controlled && N.type === "number" && qi(N, "number", N.value);
        }
        switch (V = T ? Qn(T) : window, e) {
          case "focusin":
            (pu(V) || V.contentEditable === "true") && (Hn = V, bo = T, Lr = null);
            break;
          case "focusout":
            Lr = bo = Hn = null;
            break;
          case "mousedown":
            Io = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Io = !1, ku(P, n, A);
            break;
          case "selectionchange":
            if (dp) break;
          case "keydown":
          case "keyup":
            ku(P, n, A);
        }
        var W;
        if (Eo) e: {
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
        else $n ? fu(e, n) && (K = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (K = "onCompositionStart");
        K && (uu && n.locale !== "ko" && ($n || K !== "onCompositionStart" ? K === "onCompositionEnd" && $n && (W = su()) : (en = A, yo = "value" in en ? en.value : en.textContent, $n = !0)), V = Bs(T, K), 0 < V.length && (K = new au(K, e, null, n, A), P.push({ event: K, listeners: V }), W ? K.data = W : (W = hu(n), W !== null && (K.data = W)))), (W = Zh ? ep(e, n) : tp(e, n)) && (T = Bs(T, "onBeforeInput"), 0 < T.length && (A = new au("onBeforeInput", "beforeinput", null, n, A), P.push({ event: A, listeners: T }), A.data = W));
      }
      Pu(P, t);
    });
  }
  function Dr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Bs(e, t) {
    for (var n = t + "Capture", o = []; e !== null; ) {
      var a = e, u = a.stateNode;
      a.tag === 5 && u !== null && (a = u, u = _r(e, n), u != null && o.unshift(Dr(e, u, a)), u = _r(e, t), u != null && o.push(Dr(e, u, a))), e = e.return;
    }
    return o;
  }
  function Wn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Lu(e, t, n, o, a) {
    for (var u = t._reactName, f = []; n !== null && n !== o; ) {
      var g = n, v = g.alternate, T = g.stateNode;
      if (v !== null && v === o) break;
      g.tag === 5 && T !== null && (g = T, a ? (v = _r(n, u), v != null && f.unshift(Dr(n, v, g))) : a || (v = _r(n, u), v != null && f.push(Dr(n, v, g)))), n = n.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var mp = /\r\n?/g, gp = /\u0000|\uFFFD/g;
  function Ou(e) {
    return (typeof e == "string" ? e : "" + e).replace(mp, `
`).replace(gp, "");
  }
  function Fs(e, t, n) {
    if (t = Ou(t), Ou(e) !== t && n) throw Error(i(425));
  }
  function Us() {
  }
  var jo = null, Lo = null;
  function Oo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var zo = typeof setTimeout == "function" ? setTimeout : void 0, yp = typeof clearTimeout == "function" ? clearTimeout : void 0, zu = typeof Promise == "function" ? Promise : void 0, vp = typeof queueMicrotask == "function" ? queueMicrotask : typeof zu < "u" ? function(e) {
    return zu.resolve(null).then(e).catch(_p);
  } : zo;
  function _p(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Do(e, t) {
    var n = t, o = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$") {
        if (o === 0) {
          e.removeChild(a), Ir(t);
          return;
        }
        o--;
      } else n !== "$" && n !== "$?" && n !== "$!" || o++;
      n = a;
    } while (n);
    Ir(t);
  }
  function nn(e) {
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
  function Du(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Yn = Math.random().toString(36).slice(2), Mt = "__reactFiber$" + Yn, Br = "__reactProps$" + Yn, Dt = "__reactContainer$" + Yn, Bo = "__reactEvents$" + Yn, Sp = "__reactListeners$" + Yn, wp = "__reactHandles$" + Yn;
  function yn(e) {
    var t = e[Mt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Dt] || n[Mt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Du(e); e !== null; ) {
          if (n = e[Mt]) return n;
          e = Du(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Fr(e) {
    return e = e[Mt] || e[Dt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Qn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function $s(e) {
    return e[Br] || null;
  }
  var Fo = [], Gn = -1;
  function rn(e) {
    return { current: e };
  }
  function ge(e) {
    0 > Gn || (e.current = Fo[Gn], Fo[Gn] = null, Gn--);
  }
  function pe(e, t) {
    Gn++, Fo[Gn] = e.current, e.current = t;
  }
  var sn = {}, Ue = rn(sn), Xe = rn(!1), vn = sn;
  function Kn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return sn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var a = {}, u;
    for (u in n) a[u] = t[u];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
  }
  function Ze(e) {
    return e = e.childContextTypes, e != null;
  }
  function Hs() {
    ge(Xe), ge(Ue);
  }
  function Bu(e, t, n) {
    if (Ue.current !== sn) throw Error(i(168));
    pe(Ue, t), pe(Xe, n);
  }
  function Fu(e, t, n) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return n;
    o = o.getChildContext();
    for (var a in o) if (!(a in t)) throw Error(i(108, he(e) || "Unknown", a));
    return B({}, n, o);
  }
  function Vs(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || sn, vn = Ue.current, pe(Ue, e), pe(Xe, Xe.current), !0;
  }
  function Uu(e, t, n) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    n ? (e = Fu(e, t, vn), o.__reactInternalMemoizedMergedChildContext = e, ge(Xe), ge(Ue), pe(Ue, e)) : ge(Xe), pe(Xe, n);
  }
  var Bt = null, Ws = !1, Uo = !1;
  function $u(e) {
    Bt === null ? Bt = [e] : Bt.push(e);
  }
  function xp(e) {
    Ws = !0, $u(e);
  }
  function on() {
    if (!Uo && Bt !== null) {
      Uo = !0;
      var e = 0, t = de;
      try {
        var n = Bt;
        for (de = 1; e < n.length; e++) {
          var o = n[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Bt = null, Ws = !1;
      } catch (a) {
        throw Bt !== null && (Bt = Bt.slice(e + 1)), Vl(lo, on), a;
      } finally {
        de = t, Uo = !1;
      }
    }
    return null;
  }
  var Jn = [], qn = 0, Ys = null, Qs = 0, ct = [], dt = 0, _n = null, Ft = 1, Ut = "";
  function Sn(e, t) {
    Jn[qn++] = Qs, Jn[qn++] = Ys, Ys = e, Qs = t;
  }
  function Hu(e, t, n) {
    ct[dt++] = Ft, ct[dt++] = Ut, ct[dt++] = _n, _n = e;
    var o = Ft;
    e = Ut;
    var a = 32 - _t(o) - 1;
    o &= ~(1 << a), n += 1;
    var u = 32 - _t(t) + a;
    if (30 < u) {
      var f = a - a % 5;
      u = (o & (1 << f) - 1).toString(32), o >>= f, a -= f, Ft = 1 << 32 - _t(t) + a | n << a | o, Ut = u + e;
    } else Ft = 1 << u | n << a | o, Ut = e;
  }
  function $o(e) {
    e.return !== null && (Sn(e, 1), Hu(e, 1, 0));
  }
  function Ho(e) {
    for (; e === Ys; ) Ys = Jn[--qn], Jn[qn] = null, Qs = Jn[--qn], Jn[qn] = null;
    for (; e === _n; ) _n = ct[--dt], ct[dt] = null, Ut = ct[--dt], ct[dt] = null, Ft = ct[--dt], ct[dt] = null;
  }
  var ot = null, at = null, ve = !1, wt = null;
  function Vu(e, t) {
    var n = mt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Wu(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ot = e, at = nn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ot = e, at = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = _n !== null ? { id: Ft, overflow: Ut } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = mt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ot = e, at = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Vo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Wo(e) {
    if (ve) {
      var t = at;
      if (t) {
        var n = t;
        if (!Wu(e, t)) {
          if (Vo(e)) throw Error(i(418));
          t = nn(n.nextSibling);
          var o = ot;
          t && Wu(e, t) ? Vu(o, n) : (e.flags = e.flags & -4097 | 2, ve = !1, ot = e);
        }
      } else {
        if (Vo(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, ve = !1, ot = e;
      }
    }
  }
  function Yu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ot = e;
  }
  function Gs(e) {
    if (e !== ot) return !1;
    if (!ve) return Yu(e), ve = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Oo(e.type, e.memoizedProps)), t && (t = at)) {
      if (Vo(e)) throw Qu(), Error(i(418));
      for (; t; ) Vu(e, t), t = nn(t.nextSibling);
    }
    if (Yu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                at = nn(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        at = null;
      }
    } else at = ot ? nn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Qu() {
    for (var e = at; e; ) e = nn(e.nextSibling);
  }
  function Xn() {
    at = ot = null, ve = !1;
  }
  function Yo(e) {
    wt === null ? wt = [e] : wt.push(e);
  }
  var Ep = X.ReactCurrentBatchConfig;
  function Ur(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(i(309));
          var o = n.stateNode;
        }
        if (!o) throw Error(i(147, e));
        var a = o, u = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(f) {
          var g = a.refs;
          f === null ? delete g[u] : g[u] = f;
        }, t._stringRef = u, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!n._owner) throw Error(i(290, e));
    }
    return e;
  }
  function Ks(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Gu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Ku(e) {
    function t(x, S) {
      if (e) {
        var k = x.deletions;
        k === null ? (x.deletions = [S], x.flags |= 16) : k.push(S);
      }
    }
    function n(x, S) {
      if (!e) return null;
      for (; S !== null; ) t(x, S), S = S.sibling;
      return null;
    }
    function o(x, S) {
      for (x = /* @__PURE__ */ new Map(); S !== null; ) S.key !== null ? x.set(S.key, S) : x.set(S.index, S), S = S.sibling;
      return x;
    }
    function a(x, S) {
      return x = pn(x, S), x.index = 0, x.sibling = null, x;
    }
    function u(x, S, k) {
      return x.index = k, e ? (k = x.alternate, k !== null ? (k = k.index, k < S ? (x.flags |= 2, S) : k) : (x.flags |= 2, S)) : (x.flags |= 1048576, S);
    }
    function f(x) {
      return e && x.alternate === null && (x.flags |= 2), x;
    }
    function g(x, S, k, j) {
      return S === null || S.tag !== 6 ? (S = za(k, x.mode, j), S.return = x, S) : (S = a(S, k), S.return = x, S);
    }
    function v(x, S, k, j) {
      var $ = k.type;
      return $ === ue ? A(x, S, k.props.children, j, k.key) : S !== null && (S.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === qe && Gu($) === S.type) ? (j = a(S, k.props), j.ref = Ur(x, S, k), j.return = x, j) : (j = _i(k.type, k.key, k.props, null, x.mode, j), j.ref = Ur(x, S, k), j.return = x, j);
    }
    function T(x, S, k, j) {
      return S === null || S.tag !== 4 || S.stateNode.containerInfo !== k.containerInfo || S.stateNode.implementation !== k.implementation ? (S = Da(k, x.mode, j), S.return = x, S) : (S = a(S, k.children || []), S.return = x, S);
    }
    function A(x, S, k, j, $) {
      return S === null || S.tag !== 7 ? (S = In(k, x.mode, j, $), S.return = x, S) : (S = a(S, k), S.return = x, S);
    }
    function P(x, S, k) {
      if (typeof S == "string" && S !== "" || typeof S == "number") return S = za("" + S, x.mode, k), S.return = x, S;
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Ee:
            return k = _i(S.type, S.key, S.props, null, x.mode, k), k.ref = Ur(x, null, S), k.return = x, k;
          case ne:
            return S = Da(S, x.mode, k), S.return = x, S;
          case qe:
            var j = S._init;
            return P(x, j(S._payload), k);
        }
        if (gr(S) || Q(S)) return S = In(S, x.mode, k, null), S.return = x, S;
        Ks(x, S);
      }
      return null;
    }
    function N(x, S, k, j) {
      var $ = S !== null ? S.key : null;
      if (typeof k == "string" && k !== "" || typeof k == "number") return $ !== null ? null : g(x, S, "" + k, j);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case Ee:
            return k.key === $ ? v(x, S, k, j) : null;
          case ne:
            return k.key === $ ? T(x, S, k, j) : null;
          case qe:
            return $ = k._init, N(
              x,
              S,
              $(k._payload),
              j
            );
        }
        if (gr(k) || Q(k)) return $ !== null ? null : A(x, S, k, j, null);
        Ks(x, k);
      }
      return null;
    }
    function O(x, S, k, j, $) {
      if (typeof j == "string" && j !== "" || typeof j == "number") return x = x.get(k) || null, g(S, x, "" + j, $);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case Ee:
            return x = x.get(j.key === null ? k : j.key) || null, v(S, x, j, $);
          case ne:
            return x = x.get(j.key === null ? k : j.key) || null, T(S, x, j, $);
          case qe:
            var V = j._init;
            return O(x, S, k, V(j._payload), $);
        }
        if (gr(j) || Q(j)) return x = x.get(k) || null, A(S, x, j, $, null);
        Ks(S, j);
      }
      return null;
    }
    function F(x, S, k, j) {
      for (var $ = null, V = null, W = S, K = S = 0, De = null; W !== null && K < k.length; K++) {
        W.index > K ? (De = W, W = null) : De = W.sibling;
        var ae = N(x, W, k[K], j);
        if (ae === null) {
          W === null && (W = De);
          break;
        }
        e && W && ae.alternate === null && t(x, W), S = u(ae, S, K), V === null ? $ = ae : V.sibling = ae, V = ae, W = De;
      }
      if (K === k.length) return n(x, W), ve && Sn(x, K), $;
      if (W === null) {
        for (; K < k.length; K++) W = P(x, k[K], j), W !== null && (S = u(W, S, K), V === null ? $ = W : V.sibling = W, V = W);
        return ve && Sn(x, K), $;
      }
      for (W = o(x, W); K < k.length; K++) De = O(W, x, K, k[K], j), De !== null && (e && De.alternate !== null && W.delete(De.key === null ? K : De.key), S = u(De, S, K), V === null ? $ = De : V.sibling = De, V = De);
      return e && W.forEach(function(mn) {
        return t(x, mn);
      }), ve && Sn(x, K), $;
    }
    function U(x, S, k, j) {
      var $ = Q(k);
      if (typeof $ != "function") throw Error(i(150));
      if (k = $.call(k), k == null) throw Error(i(151));
      for (var V = $ = null, W = S, K = S = 0, De = null, ae = k.next(); W !== null && !ae.done; K++, ae = k.next()) {
        W.index > K ? (De = W, W = null) : De = W.sibling;
        var mn = N(x, W, ae.value, j);
        if (mn === null) {
          W === null && (W = De);
          break;
        }
        e && W && mn.alternate === null && t(x, W), S = u(mn, S, K), V === null ? $ = mn : V.sibling = mn, V = mn, W = De;
      }
      if (ae.done) return n(
        x,
        W
      ), ve && Sn(x, K), $;
      if (W === null) {
        for (; !ae.done; K++, ae = k.next()) ae = P(x, ae.value, j), ae !== null && (S = u(ae, S, K), V === null ? $ = ae : V.sibling = ae, V = ae);
        return ve && Sn(x, K), $;
      }
      for (W = o(x, W); !ae.done; K++, ae = k.next()) ae = O(W, x, K, ae.value, j), ae !== null && (e && ae.alternate !== null && W.delete(ae.key === null ? K : ae.key), S = u(ae, S, K), V === null ? $ = ae : V.sibling = ae, V = ae);
      return e && W.forEach(function(nm) {
        return t(x, nm);
      }), ve && Sn(x, K), $;
    }
    function Ne(x, S, k, j) {
      if (typeof k == "object" && k !== null && k.type === ue && k.key === null && (k = k.props.children), typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case Ee:
            e: {
              for (var $ = k.key, V = S; V !== null; ) {
                if (V.key === $) {
                  if ($ = k.type, $ === ue) {
                    if (V.tag === 7) {
                      n(x, V.sibling), S = a(V, k.props.children), S.return = x, x = S;
                      break e;
                    }
                  } else if (V.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === qe && Gu($) === V.type) {
                    n(x, V.sibling), S = a(V, k.props), S.ref = Ur(x, V, k), S.return = x, x = S;
                    break e;
                  }
                  n(x, V);
                  break;
                } else t(x, V);
                V = V.sibling;
              }
              k.type === ue ? (S = In(k.props.children, x.mode, j, k.key), S.return = x, x = S) : (j = _i(k.type, k.key, k.props, null, x.mode, j), j.ref = Ur(x, S, k), j.return = x, x = j);
            }
            return f(x);
          case ne:
            e: {
              for (V = k.key; S !== null; ) {
                if (S.key === V) if (S.tag === 4 && S.stateNode.containerInfo === k.containerInfo && S.stateNode.implementation === k.implementation) {
                  n(x, S.sibling), S = a(S, k.children || []), S.return = x, x = S;
                  break e;
                } else {
                  n(x, S);
                  break;
                }
                else t(x, S);
                S = S.sibling;
              }
              S = Da(k, x.mode, j), S.return = x, x = S;
            }
            return f(x);
          case qe:
            return V = k._init, Ne(x, S, V(k._payload), j);
        }
        if (gr(k)) return F(x, S, k, j);
        if (Q(k)) return U(x, S, k, j);
        Ks(x, k);
      }
      return typeof k == "string" && k !== "" || typeof k == "number" ? (k = "" + k, S !== null && S.tag === 6 ? (n(x, S.sibling), S = a(S, k), S.return = x, x = S) : (n(x, S), S = za(k, x.mode, j), S.return = x, x = S), f(x)) : n(x, S);
    }
    return Ne;
  }
  var Zn = Ku(!0), Ju = Ku(!1), Js = rn(null), qs = null, er = null, Qo = null;
  function Go() {
    Qo = er = qs = null;
  }
  function Ko(e) {
    var t = Js.current;
    ge(Js), e._currentValue = t;
  }
  function Jo(e, t, n) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function tr(e, t) {
    qs = e, Qo = er = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (et = !0), e.firstContext = null);
  }
  function ft(e) {
    var t = e._currentValue;
    if (Qo !== e) if (e = { context: e, memoizedValue: t, next: null }, er === null) {
      if (qs === null) throw Error(i(308));
      er = e, qs.dependencies = { lanes: 0, firstContext: e };
    } else er = er.next = e;
    return t;
  }
  var wn = null;
  function qo(e) {
    wn === null ? wn = [e] : wn.push(e);
  }
  function qu(e, t, n, o) {
    var a = t.interleaved;
    return a === null ? (n.next = n, qo(t)) : (n.next = a.next, a.next = n), t.interleaved = n, $t(e, o);
  }
  function $t(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var an = !1;
  function Xo(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Xu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Ht(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ln(e, t, n) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (re & 2) !== 0) {
      var a = o.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), o.pending = t, $t(e, n);
    }
    return a = o.interleaved, a === null ? (t.next = t, qo(o)) : (t.next = a.next, a.next = t), o.interleaved = t, $t(e, n);
  }
  function Xs(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, n |= o, t.lanes = n, fo(e, n);
    }
  }
  function Zu(e, t) {
    var n = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, n === o)) {
      var a = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          u === null ? a = u = f : u = u.next = f, n = n.next;
        } while (n !== null);
        u === null ? a = u = t : u = u.next = t;
      } else a = u = t;
      n = { baseState: o.baseState, firstBaseUpdate: a, lastBaseUpdate: u, shared: o.shared, effects: o.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Zs(e, t, n, o) {
    var a = e.updateQueue;
    an = !1;
    var u = a.firstBaseUpdate, f = a.lastBaseUpdate, g = a.shared.pending;
    if (g !== null) {
      a.shared.pending = null;
      var v = g, T = v.next;
      v.next = null, f === null ? u = T : f.next = T, f = v;
      var A = e.alternate;
      A !== null && (A = A.updateQueue, g = A.lastBaseUpdate, g !== f && (g === null ? A.firstBaseUpdate = T : g.next = T, A.lastBaseUpdate = v));
    }
    if (u !== null) {
      var P = a.baseState;
      f = 0, A = T = v = null, g = u;
      do {
        var N = g.lane, O = g.eventTime;
        if ((o & N) === N) {
          A !== null && (A = A.next = {
            eventTime: O,
            lane: 0,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null
          });
          e: {
            var F = e, U = g;
            switch (N = t, O = n, U.tag) {
              case 1:
                if (F = U.payload, typeof F == "function") {
                  P = F.call(O, P, N);
                  break e;
                }
                P = F;
                break e;
              case 3:
                F.flags = F.flags & -65537 | 128;
              case 0:
                if (F = U.payload, N = typeof F == "function" ? F.call(O, P, N) : F, N == null) break e;
                P = B({}, P, N);
                break e;
              case 2:
                an = !0;
            }
          }
          g.callback !== null && g.lane !== 0 && (e.flags |= 64, N = a.effects, N === null ? a.effects = [g] : N.push(g));
        } else O = { eventTime: O, lane: N, tag: g.tag, payload: g.payload, callback: g.callback, next: null }, A === null ? (T = A = O, v = P) : A = A.next = O, f |= N;
        if (g = g.next, g === null) {
          if (g = a.shared.pending, g === null) break;
          N = g, g = N.next, N.next = null, a.lastBaseUpdate = N, a.shared.pending = null;
        }
      } while (!0);
      if (A === null && (v = P), a.baseState = v, a.firstBaseUpdate = T, a.lastBaseUpdate = A, t = a.shared.interleaved, t !== null) {
        a = t;
        do
          f |= a.lane, a = a.next;
        while (a !== t);
      } else u === null && (a.shared.lanes = 0);
      kn |= f, e.lanes = f, e.memoizedState = P;
    }
  }
  function ec(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], a = o.callback;
      if (a !== null) {
        if (o.callback = null, o = n, typeof a != "function") throw Error(i(191, a));
        a.call(o);
      }
    }
  }
  var $r = {}, At = rn($r), Hr = rn($r), Vr = rn($r);
  function xn(e) {
    if (e === $r) throw Error(i(174));
    return e;
  }
  function Zo(e, t) {
    switch (pe(Vr, t), pe(Hr, e), pe(At, $r), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Zi(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Zi(t, e);
    }
    ge(At), pe(At, t);
  }
  function nr() {
    ge(At), ge(Hr), ge(Vr);
  }
  function tc(e) {
    xn(Vr.current);
    var t = xn(At.current), n = Zi(t, e.type);
    t !== n && (pe(Hr, e), pe(At, n));
  }
  function ea(e) {
    Hr.current === e && (ge(At), ge(Hr));
  }
  var _e = rn(0);
  function ei(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
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
  var ta = [];
  function na() {
    for (var e = 0; e < ta.length; e++) ta[e]._workInProgressVersionPrimary = null;
    ta.length = 0;
  }
  var ti = X.ReactCurrentDispatcher, ra = X.ReactCurrentBatchConfig, En = 0, Se = null, je = null, Oe = null, ni = !1, Wr = !1, Yr = 0, kp = 0;
  function $e() {
    throw Error(i(321));
  }
  function sa(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!St(e[n], t[n])) return !1;
    return !0;
  }
  function ia(e, t, n, o, a, u) {
    if (En = u, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ti.current = e === null || e.memoizedState === null ? Ip : Rp, e = n(o, a), Wr) {
      u = 0;
      do {
        if (Wr = !1, Yr = 0, 25 <= u) throw Error(i(301));
        u += 1, Oe = je = null, t.updateQueue = null, ti.current = Np, e = n(o, a);
      } while (Wr);
    }
    if (ti.current = ii, t = je !== null && je.next !== null, En = 0, Oe = je = Se = null, ni = !1, t) throw Error(i(300));
    return e;
  }
  function oa() {
    var e = Yr !== 0;
    return Yr = 0, e;
  }
  function Pt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Oe === null ? Se.memoizedState = Oe = e : Oe = Oe.next = e, Oe;
  }
  function ht() {
    if (je === null) {
      var e = Se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = Oe === null ? Se.memoizedState : Oe.next;
    if (t !== null) Oe = t, je = e;
    else {
      if (e === null) throw Error(i(310));
      je = e, e = { memoizedState: je.memoizedState, baseState: je.baseState, baseQueue: je.baseQueue, queue: je.queue, next: null }, Oe === null ? Se.memoizedState = Oe = e : Oe = Oe.next = e;
    }
    return Oe;
  }
  function Qr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function aa(e) {
    var t = ht(), n = t.queue;
    if (n === null) throw Error(i(311));
    n.lastRenderedReducer = e;
    var o = je, a = o.baseQueue, u = n.pending;
    if (u !== null) {
      if (a !== null) {
        var f = a.next;
        a.next = u.next, u.next = f;
      }
      o.baseQueue = a = u, n.pending = null;
    }
    if (a !== null) {
      u = a.next, o = o.baseState;
      var g = f = null, v = null, T = u;
      do {
        var A = T.lane;
        if ((En & A) === A) v !== null && (v = v.next = { lane: 0, action: T.action, hasEagerState: T.hasEagerState, eagerState: T.eagerState, next: null }), o = T.hasEagerState ? T.eagerState : e(o, T.action);
        else {
          var P = {
            lane: A,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          };
          v === null ? (g = v = P, f = o) : v = v.next = P, Se.lanes |= A, kn |= A;
        }
        T = T.next;
      } while (T !== null && T !== u);
      v === null ? f = o : v.next = g, St(o, t.memoizedState) || (et = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = v, n.lastRenderedState = o;
    }
    if (e = n.interleaved, e !== null) {
      a = e;
      do
        u = a.lane, Se.lanes |= u, kn |= u, a = a.next;
      while (a !== e);
    } else a === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function la(e) {
    var t = ht(), n = t.queue;
    if (n === null) throw Error(i(311));
    n.lastRenderedReducer = e;
    var o = n.dispatch, a = n.pending, u = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var f = a = a.next;
      do
        u = e(u, f.action), f = f.next;
      while (f !== a);
      St(u, t.memoizedState) || (et = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
    }
    return [u, o];
  }
  function nc() {
  }
  function rc(e, t) {
    var n = Se, o = ht(), a = t(), u = !St(o.memoizedState, a);
    if (u && (o.memoizedState = a, et = !0), o = o.queue, ua(oc.bind(null, n, o, e), [e]), o.getSnapshot !== t || u || Oe !== null && Oe.memoizedState.tag & 1) {
      if (n.flags |= 2048, Gr(9, ic.bind(null, n, o, a, t), void 0, null), ze === null) throw Error(i(349));
      (En & 30) !== 0 || sc(n, t, a);
    }
    return a;
  }
  function sc(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Se.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function ic(e, t, n, o) {
    t.value = n, t.getSnapshot = o, ac(t) && lc(e);
  }
  function oc(e, t, n) {
    return n(function() {
      ac(t) && lc(e);
    });
  }
  function ac(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !St(e, n);
    } catch {
      return !0;
    }
  }
  function lc(e) {
    var t = $t(e, 1);
    t !== null && Ct(t, e, 1, -1);
  }
  function uc(e) {
    var t = Pt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Qr, lastRenderedState: e }, t.queue = e, e = e.dispatch = bp.bind(null, Se, e), [t.memoizedState, e];
  }
  function Gr(e, t, n, o) {
    return e = { tag: e, create: t, destroy: n, deps: o, next: null }, t = Se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Se.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (o = n.next, n.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function cc() {
    return ht().memoizedState;
  }
  function ri(e, t, n, o) {
    var a = Pt();
    Se.flags |= e, a.memoizedState = Gr(1 | t, n, void 0, o === void 0 ? null : o);
  }
  function si(e, t, n, o) {
    var a = ht();
    o = o === void 0 ? null : o;
    var u = void 0;
    if (je !== null) {
      var f = je.memoizedState;
      if (u = f.destroy, o !== null && sa(o, f.deps)) {
        a.memoizedState = Gr(t, n, u, o);
        return;
      }
    }
    Se.flags |= e, a.memoizedState = Gr(1 | t, n, u, o);
  }
  function dc(e, t) {
    return ri(8390656, 8, e, t);
  }
  function ua(e, t) {
    return si(2048, 8, e, t);
  }
  function fc(e, t) {
    return si(4, 2, e, t);
  }
  function hc(e, t) {
    return si(4, 4, e, t);
  }
  function pc(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function mc(e, t, n) {
    return n = n != null ? n.concat([e]) : null, si(4, 4, pc.bind(null, t, e), n);
  }
  function ca() {
  }
  function gc(e, t) {
    var n = ht();
    t = t === void 0 ? null : t;
    var o = n.memoizedState;
    return o !== null && t !== null && sa(t, o[1]) ? o[0] : (n.memoizedState = [e, t], e);
  }
  function yc(e, t) {
    var n = ht();
    t = t === void 0 ? null : t;
    var o = n.memoizedState;
    return o !== null && t !== null && sa(t, o[1]) ? o[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function vc(e, t, n) {
    return (En & 21) === 0 ? (e.baseState && (e.baseState = !1, et = !0), e.memoizedState = n) : (St(n, t) || (n = Gl(), Se.lanes |= n, kn |= n, e.baseState = !0), t);
  }
  function Cp(e, t) {
    var n = de;
    de = n !== 0 && 4 > n ? n : 4, e(!0);
    var o = ra.transition;
    ra.transition = {};
    try {
      e(!1), t();
    } finally {
      de = n, ra.transition = o;
    }
  }
  function _c() {
    return ht().memoizedState;
  }
  function Tp(e, t, n) {
    var o = fn(e);
    if (n = { lane: o, action: n, hasEagerState: !1, eagerState: null, next: null }, Sc(e)) wc(t, n);
    else if (n = qu(e, t, n, o), n !== null) {
      var a = Qe();
      Ct(n, e, o, a), xc(n, t, o);
    }
  }
  function bp(e, t, n) {
    var o = fn(e), a = { lane: o, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Sc(e)) wc(t, a);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var f = t.lastRenderedState, g = u(f, n);
        if (a.hasEagerState = !0, a.eagerState = g, St(g, f)) {
          var v = t.interleaved;
          v === null ? (a.next = a, qo(t)) : (a.next = v.next, v.next = a), t.interleaved = a;
          return;
        }
      } catch {
      }
      n = qu(e, t, a, o), n !== null && (a = Qe(), Ct(n, e, o, a), xc(n, t, o));
    }
  }
  function Sc(e) {
    var t = e.alternate;
    return e === Se || t !== null && t === Se;
  }
  function wc(e, t) {
    Wr = ni = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function xc(e, t, n) {
    if ((n & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, n |= o, t.lanes = n, fo(e, n);
    }
  }
  var ii = { readContext: ft, useCallback: $e, useContext: $e, useEffect: $e, useImperativeHandle: $e, useInsertionEffect: $e, useLayoutEffect: $e, useMemo: $e, useReducer: $e, useRef: $e, useState: $e, useDebugValue: $e, useDeferredValue: $e, useTransition: $e, useMutableSource: $e, useSyncExternalStore: $e, useId: $e, unstable_isNewReconciler: !1 }, Ip = { readContext: ft, useCallback: function(e, t) {
    return Pt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: ft, useEffect: dc, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, ri(
      4194308,
      4,
      pc.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return ri(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ri(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Pt();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var o = Pt();
    return t = n !== void 0 ? n(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Tp.bind(null, Se, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Pt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: uc, useDebugValue: ca, useDeferredValue: function(e) {
    return Pt().memoizedState = e;
  }, useTransition: function() {
    var e = uc(!1), t = e[0];
    return e = Cp.bind(null, e[1]), Pt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var o = Se, a = Pt();
    if (ve) {
      if (n === void 0) throw Error(i(407));
      n = n();
    } else {
      if (n = t(), ze === null) throw Error(i(349));
      (En & 30) !== 0 || sc(o, t, n);
    }
    a.memoizedState = n;
    var u = { value: n, getSnapshot: t };
    return a.queue = u, dc(oc.bind(
      null,
      o,
      u,
      e
    ), [e]), o.flags |= 2048, Gr(9, ic.bind(null, o, u, n, t), void 0, null), n;
  }, useId: function() {
    var e = Pt(), t = ze.identifierPrefix;
    if (ve) {
      var n = Ut, o = Ft;
      n = (o & ~(1 << 32 - _t(o) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Yr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = kp++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Rp = {
    readContext: ft,
    useCallback: gc,
    useContext: ft,
    useEffect: ua,
    useImperativeHandle: mc,
    useInsertionEffect: fc,
    useLayoutEffect: hc,
    useMemo: yc,
    useReducer: aa,
    useRef: cc,
    useState: function() {
      return aa(Qr);
    },
    useDebugValue: ca,
    useDeferredValue: function(e) {
      var t = ht();
      return vc(t, je.memoizedState, e);
    },
    useTransition: function() {
      var e = aa(Qr)[0], t = ht().memoizedState;
      return [e, t];
    },
    useMutableSource: nc,
    useSyncExternalStore: rc,
    useId: _c,
    unstable_isNewReconciler: !1
  }, Np = { readContext: ft, useCallback: gc, useContext: ft, useEffect: ua, useImperativeHandle: mc, useInsertionEffect: fc, useLayoutEffect: hc, useMemo: yc, useReducer: la, useRef: cc, useState: function() {
    return la(Qr);
  }, useDebugValue: ca, useDeferredValue: function(e) {
    var t = ht();
    return je === null ? t.memoizedState = e : vc(t, je.memoizedState, e);
  }, useTransition: function() {
    var e = la(Qr)[0], t = ht().memoizedState;
    return [e, t];
  }, useMutableSource: nc, useSyncExternalStore: rc, useId: _c, unstable_isNewReconciler: !1 };
  function xt(e, t) {
    if (e && e.defaultProps) {
      t = B({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function da(e, t, n, o) {
    t = e.memoizedState, n = n(o, t), n = n == null ? t : B({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var oi = { isMounted: function(e) {
    return (e = e._reactInternals) ? gn(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var o = Qe(), a = fn(e), u = Ht(o, a);
    u.payload = t, n != null && (u.callback = n), t = ln(e, u, a), t !== null && (Ct(t, e, a, o), Xs(t, e, a));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var o = Qe(), a = fn(e), u = Ht(o, a);
    u.tag = 1, u.payload = t, n != null && (u.callback = n), t = ln(e, u, a), t !== null && (Ct(t, e, a, o), Xs(t, e, a));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Qe(), o = fn(e), a = Ht(n, o);
    a.tag = 2, t != null && (a.callback = t), t = ln(e, a, o), t !== null && (Ct(t, e, o, n), Xs(t, e, o));
  } };
  function Ec(e, t, n, o, a, u, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, f) : t.prototype && t.prototype.isPureReactComponent ? !jr(n, o) || !jr(a, u) : !0;
  }
  function kc(e, t, n) {
    var o = !1, a = sn, u = t.contextType;
    return typeof u == "object" && u !== null ? u = ft(u) : (a = Ze(t) ? vn : Ue.current, o = t.contextTypes, u = (o = o != null) ? Kn(e, a) : sn), t = new t(n, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = oi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = u), t;
  }
  function Cc(e, t, n, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, o), t.state !== e && oi.enqueueReplaceState(t, t.state, null);
  }
  function fa(e, t, n, o) {
    var a = e.stateNode;
    a.props = n, a.state = e.memoizedState, a.refs = {}, Xo(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? a.context = ft(u) : (u = Ze(t) ? vn : Ue.current, a.context = Kn(e, u)), a.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (da(e, t, u, n), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && oi.enqueueReplaceState(a, a.state, null), Zs(e, n, a, o), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function rr(e, t) {
    try {
      var n = "", o = t;
      do
        n += ie(o), o = o.return;
      while (o);
      var a = n;
    } catch (u) {
      a = `
Error generating stack: ` + u.message + `
` + u.stack;
    }
    return { value: e, source: t, stack: a, digest: null };
  }
  function ha(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function pa(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var Mp = typeof WeakMap == "function" ? WeakMap : Map;
  function Tc(e, t, n) {
    n = Ht(-1, n), n.tag = 3, n.payload = { element: null };
    var o = t.value;
    return n.callback = function() {
      hi || (hi = !0, Ra = o), pa(e, t);
    }, n;
  }
  function bc(e, t, n) {
    n = Ht(-1, n), n.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var a = t.value;
      n.payload = function() {
        return o(a);
      }, n.callback = function() {
        pa(e, t);
      };
    }
    var u = e.stateNode;
    return u !== null && typeof u.componentDidCatch == "function" && (n.callback = function() {
      pa(e, t), typeof o != "function" && (cn === null ? cn = /* @__PURE__ */ new Set([this]) : cn.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), n;
  }
  function Ic(e, t, n) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Mp();
      var a = /* @__PURE__ */ new Set();
      o.set(t, a);
    } else a = o.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), o.set(t, a));
    a.has(n) || (a.add(n), e = Wp.bind(null, e, t, n), t.then(e, e));
  }
  function Rc(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Nc(e, t, n, o, a) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ht(-1, 1), t.tag = 2, ln(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e);
  }
  var Ap = X.ReactCurrentOwner, et = !1;
  function Ye(e, t, n, o) {
    t.child = e === null ? Ju(t, null, n, o) : Zn(t, e.child, n, o);
  }
  function Mc(e, t, n, o, a) {
    n = n.render;
    var u = t.ref;
    return tr(t, a), o = ia(e, t, n, o, u, a), n = oa(), e !== null && !et ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Vt(e, t, a)) : (ve && n && $o(t), t.flags |= 1, Ye(e, t, o, a), t.child);
  }
  function Ac(e, t, n, o, a) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" && !Oa(u) && u.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = u, Pc(e, t, u, o, a)) : (e = _i(n.type, null, o, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, (e.lanes & a) === 0) {
      var f = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : jr, n(f, o) && e.ref === t.ref) return Vt(e, t, a);
    }
    return t.flags |= 1, e = pn(u, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Pc(e, t, n, o, a) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (jr(u, o) && e.ref === t.ref) if (et = !1, t.pendingProps = o = u, (e.lanes & a) !== 0) (e.flags & 131072) !== 0 && (et = !0);
      else return t.lanes = e.lanes, Vt(e, t, a);
    }
    return ma(e, t, n, o, a);
  }
  function jc(e, t, n) {
    var o = t.pendingProps, a = o.children, u = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, pe(ir, lt), lt |= n;
    else {
      if ((n & 1073741824) === 0) return e = u !== null ? u.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, pe(ir, lt), lt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = u !== null ? u.baseLanes : n, pe(ir, lt), lt |= o;
    }
    else u !== null ? (o = u.baseLanes | n, t.memoizedState = null) : o = n, pe(ir, lt), lt |= o;
    return Ye(e, t, a, n), t.child;
  }
  function Lc(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ma(e, t, n, o, a) {
    var u = Ze(n) ? vn : Ue.current;
    return u = Kn(t, u), tr(t, a), n = ia(e, t, n, o, u, a), o = oa(), e !== null && !et ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Vt(e, t, a)) : (ve && o && $o(t), t.flags |= 1, Ye(e, t, n, a), t.child);
  }
  function Oc(e, t, n, o, a) {
    if (Ze(n)) {
      var u = !0;
      Vs(t);
    } else u = !1;
    if (tr(t, a), t.stateNode === null) li(e, t), kc(t, n, o), fa(t, n, o, a), o = !0;
    else if (e === null) {
      var f = t.stateNode, g = t.memoizedProps;
      f.props = g;
      var v = f.context, T = n.contextType;
      typeof T == "object" && T !== null ? T = ft(T) : (T = Ze(n) ? vn : Ue.current, T = Kn(t, T));
      var A = n.getDerivedStateFromProps, P = typeof A == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      P || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== o || v !== T) && Cc(t, f, o, T), an = !1;
      var N = t.memoizedState;
      f.state = N, Zs(t, o, f, a), v = t.memoizedState, g !== o || N !== v || Xe.current || an ? (typeof A == "function" && (da(t, n, A, o), v = t.memoizedState), (g = an || Ec(t, n, g, o, N, v, T)) ? (P || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = v), f.props = o, f.state = v, f.context = T, o = g) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, Xu(e, t), g = t.memoizedProps, T = t.type === t.elementType ? g : xt(t.type, g), f.props = T, P = t.pendingProps, N = f.context, v = n.contextType, typeof v == "object" && v !== null ? v = ft(v) : (v = Ze(n) ? vn : Ue.current, v = Kn(t, v));
      var O = n.getDerivedStateFromProps;
      (A = typeof O == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== P || N !== v) && Cc(t, f, o, v), an = !1, N = t.memoizedState, f.state = N, Zs(t, o, f, a);
      var F = t.memoizedState;
      g !== P || N !== F || Xe.current || an ? (typeof O == "function" && (da(t, n, O, o), F = t.memoizedState), (T = an || Ec(t, n, T, o, N, F, v) || !1) ? (A || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, F, v), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, F, v)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = F), f.props = o, f.state = F, f.context = v, o = T) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return ga(e, t, n, o, u, a);
  }
  function ga(e, t, n, o, a, u) {
    Lc(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return a && Uu(t, n, !1), Vt(e, t, u);
    o = t.stateNode, Ap.current = t;
    var g = f && typeof n.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = Zn(t, e.child, null, u), t.child = Zn(t, null, g, u)) : Ye(e, t, g, u), t.memoizedState = o.state, a && Uu(t, n, !0), t.child;
  }
  function zc(e) {
    var t = e.stateNode;
    t.pendingContext ? Bu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Bu(e, t.context, !1), Zo(e, t.containerInfo);
  }
  function Dc(e, t, n, o, a) {
    return Xn(), Yo(a), t.flags |= 256, Ye(e, t, n, o), t.child;
  }
  var ya = { dehydrated: null, treeContext: null, retryLane: 0 };
  function va(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Bc(e, t, n) {
    var o = t.pendingProps, a = _e.current, u = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), g ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), pe(_e, a & 1), e === null)
      return Wo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && u !== null ? (u.childLanes = 0, u.pendingProps = f) : u = Si(f, o, 0, null), e = In(e, o, n, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = va(n), t.memoizedState = ya, e) : _a(t, f));
    if (a = e.memoizedState, a !== null && (g = a.dehydrated, g !== null)) return Pp(e, t, f, o, g, a, n);
    if (u) {
      u = o.fallback, f = t.mode, a = e.child, g = a.sibling;
      var v = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== a ? (o = t.child, o.childLanes = 0, o.pendingProps = v, t.deletions = null) : (o = pn(a, v), o.subtreeFlags = a.subtreeFlags & 14680064), g !== null ? u = pn(g, u) : (u = In(u, f, n, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, f = e.child.memoizedState, f = f === null ? va(n) : { baseLanes: f.baseLanes | n, cachePool: null, transitions: f.transitions }, u.memoizedState = f, u.childLanes = e.childLanes & ~n, t.memoizedState = ya, o;
    }
    return u = e.child, e = u.sibling, o = pn(u, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = n), o.return = t, o.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function _a(e, t) {
    return t = Si({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function ai(e, t, n, o) {
    return o !== null && Yo(o), Zn(t, e.child, null, n), e = _a(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Pp(e, t, n, o, a, u, f) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, o = ha(Error(i(422))), ai(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, a = t.mode, o = Si({ mode: "visible", children: o.children }, a, 0, null), u = In(u, a, f, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & 1) !== 0 && Zn(t, e.child, null, f), t.child.memoizedState = va(f), t.memoizedState = ya, u);
    if ((t.mode & 1) === 0) return ai(e, t, f, null);
    if (a.data === "$!") {
      if (o = a.nextSibling && a.nextSibling.dataset, o) var g = o.dgst;
      return o = g, u = Error(i(419)), o = ha(u, o, void 0), ai(e, t, f, o);
    }
    if (g = (f & e.childLanes) !== 0, et || g) {
      if (o = ze, o !== null) {
        switch (f & -f) {
          case 4:
            a = 2;
            break;
          case 16:
            a = 8;
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
            a = 32;
            break;
          case 536870912:
            a = 268435456;
            break;
          default:
            a = 0;
        }
        a = (a & (o.suspendedLanes | f)) !== 0 ? 0 : a, a !== 0 && a !== u.retryLane && (u.retryLane = a, $t(e, a), Ct(o, e, a, -1));
      }
      return La(), o = ha(Error(i(421))), ai(e, t, f, o);
    }
    return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Yp.bind(null, e), a._reactRetry = t, null) : (e = u.treeContext, at = nn(a.nextSibling), ot = t, ve = !0, wt = null, e !== null && (ct[dt++] = Ft, ct[dt++] = Ut, ct[dt++] = _n, Ft = e.id, Ut = e.overflow, _n = t), t = _a(t, o.children), t.flags |= 4096, t);
  }
  function Fc(e, t, n) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), Jo(e.return, t, n);
  }
  function Sa(e, t, n, o, a) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: n, tailMode: a } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = n, u.tailMode = a);
  }
  function Uc(e, t, n) {
    var o = t.pendingProps, a = o.revealOrder, u = o.tail;
    if (Ye(e, t, o.children, n), o = _e.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Fc(e, n, t);
        else if (e.tag === 19) Fc(e, n, t);
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
    if (pe(_e, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (a) {
      case "forwards":
        for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && ei(e) === null && (a = n), n = n.sibling;
        n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Sa(t, !1, a, n, u);
        break;
      case "backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && ei(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        Sa(t, !0, n, null, u);
        break;
      case "together":
        Sa(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function li(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Vt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), kn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, n = pn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = pn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function jp(e, t, n) {
    switch (t.tag) {
      case 3:
        zc(t), Xn();
        break;
      case 5:
        tc(t);
        break;
      case 1:
        Ze(t.type) && Vs(t);
        break;
      case 4:
        Zo(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, a = t.memoizedProps.value;
        pe(Js, o._currentValue), o._currentValue = a;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (pe(_e, _e.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Bc(e, t, n) : (pe(_e, _e.current & 1), e = Vt(e, t, n), e !== null ? e.sibling : null);
        pe(_e, _e.current & 1);
        break;
      case 19:
        if (o = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return Uc(e, t, n);
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), pe(_e, _e.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, jc(e, t, n);
    }
    return Vt(e, t, n);
  }
  var $c, wa, Hc, Vc;
  $c = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, wa = function() {
  }, Hc = function(e, t, n, o) {
    var a = e.memoizedProps;
    if (a !== o) {
      e = t.stateNode, xn(At.current);
      var u = null;
      switch (n) {
        case "input":
          a = Ki(e, a), o = Ki(e, o), u = [];
          break;
        case "select":
          a = B({}, a, { value: void 0 }), o = B({}, o, { value: void 0 }), u = [];
          break;
        case "textarea":
          a = Xi(e, a), o = Xi(e, o), u = [];
          break;
        default:
          typeof a.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Us);
      }
      eo(n, o);
      var f;
      n = null;
      for (T in a) if (!o.hasOwnProperty(T) && a.hasOwnProperty(T) && a[T] != null) if (T === "style") {
        var g = a[T];
        for (f in g) g.hasOwnProperty(f) && (n || (n = {}), n[f] = "");
      } else T !== "dangerouslySetInnerHTML" && T !== "children" && T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && T !== "autoFocus" && (c.hasOwnProperty(T) ? u || (u = []) : (u = u || []).push(T, null));
      for (T in o) {
        var v = o[T];
        if (g = a?.[T], o.hasOwnProperty(T) && v !== g && (v != null || g != null)) if (T === "style") if (g) {
          for (f in g) !g.hasOwnProperty(f) || v && v.hasOwnProperty(f) || (n || (n = {}), n[f] = "");
          for (f in v) v.hasOwnProperty(f) && g[f] !== v[f] && (n || (n = {}), n[f] = v[f]);
        } else n || (u || (u = []), u.push(
          T,
          n
        )), n = v;
        else T === "dangerouslySetInnerHTML" ? (v = v ? v.__html : void 0, g = g ? g.__html : void 0, v != null && g !== v && (u = u || []).push(T, v)) : T === "children" ? typeof v != "string" && typeof v != "number" || (u = u || []).push(T, "" + v) : T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && (c.hasOwnProperty(T) ? (v != null && T === "onScroll" && me("scroll", e), u || g === v || (u = [])) : (u = u || []).push(T, v));
      }
      n && (u = u || []).push("style", n);
      var T = u;
      (t.updateQueue = T) && (t.flags |= 4);
    }
  }, Vc = function(e, t, n, o) {
    n !== o && (t.flags |= 4);
  };
  function Kr(e, t) {
    if (!ve) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var o = null; n !== null; ) n.alternate !== null && (o = n), n = n.sibling;
        o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
    }
  }
  function He(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, o = 0;
    if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, o |= a.subtreeFlags & 14680064, o |= a.flags & 14680064, a.return = e, a = a.sibling;
    else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, o |= a.subtreeFlags, o |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= o, e.childLanes = n, t;
  }
  function Lp(e, t, n) {
    var o = t.pendingProps;
    switch (Ho(t), t.tag) {
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
        return He(t), null;
      case 1:
        return Ze(t.type) && Hs(), He(t), null;
      case 3:
        return o = t.stateNode, nr(), ge(Xe), ge(Ue), na(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (Gs(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, wt !== null && (Aa(wt), wt = null))), wa(e, t), He(t), null;
      case 5:
        ea(t);
        var a = xn(Vr.current);
        if (n = t.type, e !== null && t.stateNode != null) Hc(e, t, n, o, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return He(t), null;
          }
          if (e = xn(At.current), Gs(t)) {
            o = t.stateNode, n = t.type;
            var u = t.memoizedProps;
            switch (o[Mt] = t, o[Br] = u, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                me("cancel", o), me("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                me("load", o);
                break;
              case "video":
              case "audio":
                for (a = 0; a < Or.length; a++) me(Or[a], o);
                break;
              case "source":
                me("error", o);
                break;
              case "img":
              case "image":
              case "link":
                me(
                  "error",
                  o
                ), me("load", o);
                break;
              case "details":
                me("toggle", o);
                break;
              case "input":
                kl(o, u), me("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!u.multiple }, me("invalid", o);
                break;
              case "textarea":
                bl(o, u), me("invalid", o);
            }
            eo(n, u), a = null;
            for (var f in u) if (u.hasOwnProperty(f)) {
              var g = u[f];
              f === "children" ? typeof g == "string" ? o.textContent !== g && (u.suppressHydrationWarning !== !0 && Fs(o.textContent, g, e), a = ["children", g]) : typeof g == "number" && o.textContent !== "" + g && (u.suppressHydrationWarning !== !0 && Fs(
                o.textContent,
                g,
                e
              ), a = ["children", "" + g]) : c.hasOwnProperty(f) && g != null && f === "onScroll" && me("scroll", o);
            }
            switch (n) {
              case "input":
                ys(o), Tl(o, u, !0);
                break;
              case "textarea":
                ys(o), Rl(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (o.onclick = Us);
            }
            o = a, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            f = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Nl(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(n, { is: o.is }) : (e = f.createElement(n), n === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, n), e[Mt] = t, e[Br] = o, $c(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = to(n, o), n) {
                case "dialog":
                  me("cancel", e), me("close", e), a = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  me("load", e), a = o;
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < Or.length; a++) me(Or[a], e);
                  a = o;
                  break;
                case "source":
                  me("error", e), a = o;
                  break;
                case "img":
                case "image":
                case "link":
                  me(
                    "error",
                    e
                  ), me("load", e), a = o;
                  break;
                case "details":
                  me("toggle", e), a = o;
                  break;
                case "input":
                  kl(e, o), a = Ki(e, o), me("invalid", e);
                  break;
                case "option":
                  a = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, a = B({}, o, { value: void 0 }), me("invalid", e);
                  break;
                case "textarea":
                  bl(e, o), a = Xi(e, o), me("invalid", e);
                  break;
                default:
                  a = o;
              }
              eo(n, a), g = a;
              for (u in g) if (g.hasOwnProperty(u)) {
                var v = g[u];
                u === "style" ? Pl(e, v) : u === "dangerouslySetInnerHTML" ? (v = v ? v.__html : void 0, v != null && Ml(e, v)) : u === "children" ? typeof v == "string" ? (n !== "textarea" || v !== "") && yr(e, v) : typeof v == "number" && yr(e, "" + v) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (c.hasOwnProperty(u) ? v != null && u === "onScroll" && me("scroll", e) : v != null && J(e, u, v, f));
              }
              switch (n) {
                case "input":
                  ys(e), Tl(e, o, !1);
                  break;
                case "textarea":
                  ys(e), Rl(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ce(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, u = o.value, u != null ? zn(e, !!o.multiple, u, !1) : o.defaultValue != null && zn(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof a.onClick == "function" && (e.onclick = Us);
              }
              switch (n) {
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
        return He(t), null;
      case 6:
        if (e && t.stateNode != null) Vc(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (n = xn(Vr.current), xn(At.current), Gs(t)) {
            if (o = t.stateNode, n = t.memoizedProps, o[Mt] = t, (u = o.nodeValue !== n) && (e = ot, e !== null)) switch (e.tag) {
              case 3:
                Fs(o.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Fs(o.nodeValue, n, (e.mode & 1) !== 0);
            }
            u && (t.flags |= 4);
          } else o = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(o), o[Mt] = t, t.stateNode = o;
        }
        return He(t), null;
      case 13:
        if (ge(_e), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ve && at !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Qu(), Xn(), t.flags |= 98560, u = !1;
          else if (u = Gs(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(i(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(i(317));
              u[Mt] = t;
            } else Xn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            He(t), u = !1;
          } else wt !== null && (Aa(wt), wt = null), u = !0;
          if (!u) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (_e.current & 1) !== 0 ? Le === 0 && (Le = 3) : La())), t.updateQueue !== null && (t.flags |= 4), He(t), null);
      case 4:
        return nr(), wa(e, t), e === null && zr(t.stateNode.containerInfo), He(t), null;
      case 10:
        return Ko(t.type._context), He(t), null;
      case 17:
        return Ze(t.type) && Hs(), He(t), null;
      case 19:
        if (ge(_e), u = t.memoizedState, u === null) return He(t), null;
        if (o = (t.flags & 128) !== 0, f = u.rendering, f === null) if (o) Kr(u, !1);
        else {
          if (Le !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = ei(e), f !== null) {
              for (t.flags |= 128, Kr(u, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = n, n = t.child; n !== null; ) u = n, e = o, u.flags &= 14680066, f = u.alternate, f === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = f.childLanes, u.lanes = f.lanes, u.child = f.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = f.memoizedProps, u.memoizedState = f.memoizedState, u.updateQueue = f.updateQueue, u.type = f.type, e = f.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return pe(_e, _e.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          u.tail !== null && Re() > or && (t.flags |= 128, o = !0, Kr(u, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = ei(f), e !== null) {
            if (t.flags |= 128, o = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Kr(u, !0), u.tail === null && u.tailMode === "hidden" && !f.alternate && !ve) return He(t), null;
          } else 2 * Re() - u.renderingStartTime > or && n !== 1073741824 && (t.flags |= 128, o = !0, Kr(u, !1), t.lanes = 4194304);
          u.isBackwards ? (f.sibling = t.child, t.child = f) : (n = u.last, n !== null ? n.sibling = f : t.child = f, u.last = f);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = Re(), t.sibling = null, n = _e.current, pe(_e, o ? n & 1 | 2 : n & 1), t) : (He(t), null);
      case 22:
      case 23:
        return ja(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (lt & 1073741824) !== 0 && (He(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : He(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Op(e, t) {
    switch (Ho(t), t.tag) {
      case 1:
        return Ze(t.type) && Hs(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return nr(), ge(Xe), ge(Ue), na(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ea(t), null;
      case 13:
        if (ge(_e), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          Xn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ge(_e), null;
      case 4:
        return nr(), null;
      case 10:
        return Ko(t.type._context), null;
      case 22:
      case 23:
        return ja(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ui = !1, Ve = !1, zp = typeof WeakSet == "function" ? WeakSet : Set, D = null;
  function sr(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (o) {
      Ce(e, t, o);
    }
    else n.current = null;
  }
  function xa(e, t, n) {
    try {
      n();
    } catch (o) {
      Ce(e, t, o);
    }
  }
  var Wc = !1;
  function Dp(e, t) {
    if (jo = Rs, e = Eu(), To(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var o = n.getSelection && n.getSelection();
        if (o && o.rangeCount !== 0) {
          n = o.anchorNode;
          var a = o.anchorOffset, u = o.focusNode;
          o = o.focusOffset;
          try {
            n.nodeType, u.nodeType;
          } catch {
            n = null;
            break e;
          }
          var f = 0, g = -1, v = -1, T = 0, A = 0, P = e, N = null;
          t: for (; ; ) {
            for (var O; P !== n || a !== 0 && P.nodeType !== 3 || (g = f + a), P !== u || o !== 0 && P.nodeType !== 3 || (v = f + o), P.nodeType === 3 && (f += P.nodeValue.length), (O = P.firstChild) !== null; )
              N = P, P = O;
            for (; ; ) {
              if (P === e) break t;
              if (N === n && ++T === a && (g = f), N === u && ++A === o && (v = f), (O = P.nextSibling) !== null) break;
              P = N, N = P.parentNode;
            }
            P = O;
          }
          n = g === -1 || v === -1 ? null : { start: g, end: v };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Lo = { focusedElem: e, selectionRange: n }, Rs = !1, D = t; D !== null; ) if (t = D, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, D = e;
    else for (; D !== null; ) {
      t = D;
      try {
        var F = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (F !== null) {
              var U = F.memoizedProps, Ne = F.memoizedState, x = t.stateNode, S = x.getSnapshotBeforeUpdate(t.elementType === t.type ? U : xt(t.type, U), Ne);
              x.__reactInternalSnapshotBeforeUpdate = S;
            }
            break;
          case 3:
            var k = t.stateNode.containerInfo;
            k.nodeType === 1 ? k.textContent = "" : k.nodeType === 9 && k.documentElement && k.removeChild(k.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(i(163));
        }
      } catch (j) {
        Ce(t, t.return, j);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, D = e;
        break;
      }
      D = t.return;
    }
    return F = Wc, Wc = !1, F;
  }
  function Jr(e, t, n) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var a = o = o.next;
      do {
        if ((a.tag & e) === e) {
          var u = a.destroy;
          a.destroy = void 0, u !== void 0 && xa(t, n, u);
        }
        a = a.next;
      } while (a !== o);
    }
  }
  function ci(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var o = n.create;
          n.destroy = o();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Ea(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      e.tag, e = n, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Yc(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Yc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Mt], delete t[Br], delete t[Bo], delete t[Sp], delete t[wp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Qc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Gc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Qc(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ka(e, t, n) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Us));
    else if (o !== 4 && (e = e.child, e !== null)) for (ka(e, t, n), e = e.sibling; e !== null; ) ka(e, t, n), e = e.sibling;
  }
  function Ca(e, t, n) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Ca(e, t, n), e = e.sibling; e !== null; ) Ca(e, t, n), e = e.sibling;
  }
  var Be = null, Et = !1;
  function un(e, t, n) {
    for (n = n.child; n !== null; ) Kc(e, t, n), n = n.sibling;
  }
  function Kc(e, t, n) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
      Nt.onCommitFiberUnmount(Es, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        Ve || sr(n, t);
      case 6:
        var o = Be, a = Et;
        Be = null, un(e, t, n), Be = o, Et = a, Be !== null && (Et ? (e = Be, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Be.removeChild(n.stateNode));
        break;
      case 18:
        Be !== null && (Et ? (e = Be, n = n.stateNode, e.nodeType === 8 ? Do(e.parentNode, n) : e.nodeType === 1 && Do(e, n), Ir(e)) : Do(Be, n.stateNode));
        break;
      case 4:
        o = Be, a = Et, Be = n.stateNode.containerInfo, Et = !0, un(e, t, n), Be = o, Et = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ve && (o = n.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          a = o = o.next;
          do {
            var u = a, f = u.destroy;
            u = u.tag, f !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && xa(n, t, f), a = a.next;
          } while (a !== o);
        }
        un(e, t, n);
        break;
      case 1:
        if (!Ve && (sr(n, t), o = n.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = n.memoizedProps, o.state = n.memoizedState, o.componentWillUnmount();
        } catch (g) {
          Ce(n, t, g);
        }
        un(e, t, n);
        break;
      case 21:
        un(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (Ve = (o = Ve) || n.memoizedState !== null, un(e, t, n), Ve = o) : un(e, t, n);
        break;
      default:
        un(e, t, n);
    }
  }
  function Jc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new zp()), t.forEach(function(o) {
        var a = Qp.bind(null, e, o);
        n.has(o) || (n.add(o), o.then(a, a));
      });
    }
  }
  function kt(e, t) {
    var n = t.deletions;
    if (n !== null) for (var o = 0; o < n.length; o++) {
      var a = n[o];
      try {
        var u = e, f = t, g = f;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 5:
              Be = g.stateNode, Et = !1;
              break e;
            case 3:
              Be = g.stateNode.containerInfo, Et = !0;
              break e;
            case 4:
              Be = g.stateNode.containerInfo, Et = !0;
              break e;
          }
          g = g.return;
        }
        if (Be === null) throw Error(i(160));
        Kc(u, f, a), Be = null, Et = !1;
        var v = a.alternate;
        v !== null && (v.return = null), a.return = null;
      } catch (T) {
        Ce(a, t, T);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) qc(t, e), t = t.sibling;
  }
  function qc(e, t) {
    var n = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (kt(t, e), jt(e), o & 4) {
          try {
            Jr(3, e, e.return), ci(3, e);
          } catch (U) {
            Ce(e, e.return, U);
          }
          try {
            Jr(5, e, e.return);
          } catch (U) {
            Ce(e, e.return, U);
          }
        }
        break;
      case 1:
        kt(t, e), jt(e), o & 512 && n !== null && sr(n, n.return);
        break;
      case 5:
        if (kt(t, e), jt(e), o & 512 && n !== null && sr(n, n.return), e.flags & 32) {
          var a = e.stateNode;
          try {
            yr(a, "");
          } catch (U) {
            Ce(e, e.return, U);
          }
        }
        if (o & 4 && (a = e.stateNode, a != null)) {
          var u = e.memoizedProps, f = n !== null ? n.memoizedProps : u, g = e.type, v = e.updateQueue;
          if (e.updateQueue = null, v !== null) try {
            g === "input" && u.type === "radio" && u.name != null && Cl(a, u), to(g, f);
            var T = to(g, u);
            for (f = 0; f < v.length; f += 2) {
              var A = v[f], P = v[f + 1];
              A === "style" ? Pl(a, P) : A === "dangerouslySetInnerHTML" ? Ml(a, P) : A === "children" ? yr(a, P) : J(a, A, P, T);
            }
            switch (g) {
              case "input":
                Ji(a, u);
                break;
              case "textarea":
                Il(a, u);
                break;
              case "select":
                var N = a._wrapperState.wasMultiple;
                a._wrapperState.wasMultiple = !!u.multiple;
                var O = u.value;
                O != null ? zn(a, !!u.multiple, O, !1) : N !== !!u.multiple && (u.defaultValue != null ? zn(
                  a,
                  !!u.multiple,
                  u.defaultValue,
                  !0
                ) : zn(a, !!u.multiple, u.multiple ? [] : "", !1));
            }
            a[Br] = u;
          } catch (U) {
            Ce(e, e.return, U);
          }
        }
        break;
      case 6:
        if (kt(t, e), jt(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          a = e.stateNode, u = e.memoizedProps;
          try {
            a.nodeValue = u;
          } catch (U) {
            Ce(e, e.return, U);
          }
        }
        break;
      case 3:
        if (kt(t, e), jt(e), o & 4 && n !== null && n.memoizedState.isDehydrated) try {
          Ir(t.containerInfo);
        } catch (U) {
          Ce(e, e.return, U);
        }
        break;
      case 4:
        kt(t, e), jt(e);
        break;
      case 13:
        kt(t, e), jt(e), a = e.child, a.flags & 8192 && (u = a.memoizedState !== null, a.stateNode.isHidden = u, !u || a.alternate !== null && a.alternate.memoizedState !== null || (Ia = Re())), o & 4 && Jc(e);
        break;
      case 22:
        if (A = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ve = (T = Ve) || A, kt(t, e), Ve = T) : kt(t, e), jt(e), o & 8192) {
          if (T = e.memoizedState !== null, (e.stateNode.isHidden = T) && !A && (e.mode & 1) !== 0) for (D = e, A = e.child; A !== null; ) {
            for (P = D = A; D !== null; ) {
              switch (N = D, O = N.child, N.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Jr(4, N, N.return);
                  break;
                case 1:
                  sr(N, N.return);
                  var F = N.stateNode;
                  if (typeof F.componentWillUnmount == "function") {
                    o = N, n = N.return;
                    try {
                      t = o, F.props = t.memoizedProps, F.state = t.memoizedState, F.componentWillUnmount();
                    } catch (U) {
                      Ce(o, n, U);
                    }
                  }
                  break;
                case 5:
                  sr(N, N.return);
                  break;
                case 22:
                  if (N.memoizedState !== null) {
                    ed(P);
                    continue;
                  }
              }
              O !== null ? (O.return = N, D = O) : ed(P);
            }
            A = A.sibling;
          }
          e: for (A = null, P = e; ; ) {
            if (P.tag === 5) {
              if (A === null) {
                A = P;
                try {
                  a = P.stateNode, T ? (u = a.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (g = P.stateNode, v = P.memoizedProps.style, f = v != null && v.hasOwnProperty("display") ? v.display : null, g.style.display = Al("display", f));
                } catch (U) {
                  Ce(e, e.return, U);
                }
              }
            } else if (P.tag === 6) {
              if (A === null) try {
                P.stateNode.nodeValue = T ? "" : P.memoizedProps;
              } catch (U) {
                Ce(e, e.return, U);
              }
            } else if ((P.tag !== 22 && P.tag !== 23 || P.memoizedState === null || P === e) && P.child !== null) {
              P.child.return = P, P = P.child;
              continue;
            }
            if (P === e) break e;
            for (; P.sibling === null; ) {
              if (P.return === null || P.return === e) break e;
              A === P && (A = null), P = P.return;
            }
            A === P && (A = null), P.sibling.return = P.return, P = P.sibling;
          }
        }
        break;
      case 19:
        kt(t, e), jt(e), o & 4 && Jc(e);
        break;
      case 21:
        break;
      default:
        kt(
          t,
          e
        ), jt(e);
    }
  }
  function jt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Qc(n)) {
              var o = n;
              break e;
            }
            n = n.return;
          }
          throw Error(i(160));
        }
        switch (o.tag) {
          case 5:
            var a = o.stateNode;
            o.flags & 32 && (yr(a, ""), o.flags &= -33);
            var u = Gc(e);
            Ca(e, u, a);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, g = Gc(e);
            ka(e, g, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (v) {
        Ce(e, e.return, v);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Bp(e, t, n) {
    D = e, Xc(e);
  }
  function Xc(e, t, n) {
    for (var o = (e.mode & 1) !== 0; D !== null; ) {
      var a = D, u = a.child;
      if (a.tag === 22 && o) {
        var f = a.memoizedState !== null || ui;
        if (!f) {
          var g = a.alternate, v = g !== null && g.memoizedState !== null || Ve;
          g = ui;
          var T = Ve;
          if (ui = f, (Ve = v) && !T) for (D = a; D !== null; ) f = D, v = f.child, f.tag === 22 && f.memoizedState !== null ? td(a) : v !== null ? (v.return = f, D = v) : td(a);
          for (; u !== null; ) D = u, Xc(u), u = u.sibling;
          D = a, ui = g, Ve = T;
        }
        Zc(e);
      } else (a.subtreeFlags & 8772) !== 0 && u !== null ? (u.return = a, D = u) : Zc(e);
    }
  }
  function Zc(e) {
    for (; D !== null; ) {
      var t = D;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ve || ci(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !Ve) if (n === null) o.componentDidMount();
              else {
                var a = t.elementType === t.type ? n.memoizedProps : xt(t.type, n.memoizedProps);
                o.componentDidUpdate(a, n.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var u = t.updateQueue;
              u !== null && ec(t, u, o);
              break;
            case 3:
              var f = t.updateQueue;
              if (f !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                ec(t, f, n);
              }
              break;
            case 5:
              var g = t.stateNode;
              if (n === null && t.flags & 4) {
                n = g;
                var v = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    v.autoFocus && n.focus();
                    break;
                  case "img":
                    v.src && (n.src = v.src);
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
                var T = t.alternate;
                if (T !== null) {
                  var A = T.memoizedState;
                  if (A !== null) {
                    var P = A.dehydrated;
                    P !== null && Ir(P);
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
          Ve || t.flags & 512 && Ea(t);
        } catch (N) {
          Ce(t, t.return, N);
        }
      }
      if (t === e) {
        D = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, D = n;
        break;
      }
      D = t.return;
    }
  }
  function ed(e) {
    for (; D !== null; ) {
      var t = D;
      if (t === e) {
        D = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, D = n;
        break;
      }
      D = t.return;
    }
  }
  function td(e) {
    for (; D !== null; ) {
      var t = D;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              ci(4, t);
            } catch (v) {
              Ce(t, n, v);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var a = t.return;
              try {
                o.componentDidMount();
              } catch (v) {
                Ce(t, a, v);
              }
            }
            var u = t.return;
            try {
              Ea(t);
            } catch (v) {
              Ce(t, u, v);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Ea(t);
            } catch (v) {
              Ce(t, f, v);
            }
        }
      } catch (v) {
        Ce(t, t.return, v);
      }
      if (t === e) {
        D = null;
        break;
      }
      var g = t.sibling;
      if (g !== null) {
        g.return = t.return, D = g;
        break;
      }
      D = t.return;
    }
  }
  var Fp = Math.ceil, di = X.ReactCurrentDispatcher, Ta = X.ReactCurrentOwner, pt = X.ReactCurrentBatchConfig, re = 0, ze = null, Me = null, Fe = 0, lt = 0, ir = rn(0), Le = 0, qr = null, kn = 0, fi = 0, ba = 0, Xr = null, tt = null, Ia = 0, or = 1 / 0, Wt = null, hi = !1, Ra = null, cn = null, pi = !1, dn = null, mi = 0, Zr = 0, Na = null, gi = -1, yi = 0;
  function Qe() {
    return (re & 6) !== 0 ? Re() : gi !== -1 ? gi : gi = Re();
  }
  function fn(e) {
    return (e.mode & 1) === 0 ? 1 : (re & 2) !== 0 && Fe !== 0 ? Fe & -Fe : Ep.transition !== null ? (yi === 0 && (yi = Gl()), yi) : (e = de, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ru(e.type)), e);
  }
  function Ct(e, t, n, o) {
    if (50 < Zr) throw Zr = 0, Na = null, Error(i(185));
    Er(e, n, o), ((re & 2) === 0 || e !== ze) && (e === ze && ((re & 2) === 0 && (fi |= n), Le === 4 && hn(e, Fe)), nt(e, o), n === 1 && re === 0 && (t.mode & 1) === 0 && (or = Re() + 500, Ws && on()));
  }
  function nt(e, t) {
    var n = e.callbackNode;
    Eh(e, t);
    var o = Ts(e, e === ze ? Fe : 0);
    if (o === 0) n !== null && Wl(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (n != null && Wl(n), t === 1) e.tag === 0 ? xp(rd.bind(null, e)) : $u(rd.bind(null, e)), vp(function() {
        (re & 6) === 0 && on();
      }), n = null;
      else {
        switch (Kl(o)) {
          case 1:
            n = lo;
            break;
          case 4:
            n = Yl;
            break;
          case 16:
            n = xs;
            break;
          case 536870912:
            n = Ql;
            break;
          default:
            n = xs;
        }
        n = dd(n, nd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function nd(e, t) {
    if (gi = -1, yi = 0, (re & 6) !== 0) throw Error(i(327));
    var n = e.callbackNode;
    if (ar() && e.callbackNode !== n) return null;
    var o = Ts(e, e === ze ? Fe : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = vi(e, o);
    else {
      t = o;
      var a = re;
      re |= 2;
      var u = id();
      (ze !== e || Fe !== t) && (Wt = null, or = Re() + 500, Tn(e, t));
      do
        try {
          Hp();
          break;
        } catch (g) {
          sd(e, g);
        }
      while (!0);
      Go(), di.current = u, re = a, Me !== null ? t = 0 : (ze = null, Fe = 0, t = Le);
    }
    if (t !== 0) {
      if (t === 2 && (a = uo(e), a !== 0 && (o = a, t = Ma(e, a))), t === 1) throw n = qr, Tn(e, 0), hn(e, o), nt(e, Re()), n;
      if (t === 6) hn(e, o);
      else {
        if (a = e.current.alternate, (o & 30) === 0 && !Up(a) && (t = vi(e, o), t === 2 && (u = uo(e), u !== 0 && (o = u, t = Ma(e, u))), t === 1)) throw n = qr, Tn(e, 0), hn(e, o), nt(e, Re()), n;
        switch (e.finishedWork = a, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            bn(e, tt, Wt);
            break;
          case 3:
            if (hn(e, o), (o & 130023424) === o && (t = Ia + 500 - Re(), 10 < t)) {
              if (Ts(e, 0) !== 0) break;
              if (a = e.suspendedLanes, (a & o) !== o) {
                Qe(), e.pingedLanes |= e.suspendedLanes & a;
                break;
              }
              e.timeoutHandle = zo(bn.bind(null, e, tt, Wt), t);
              break;
            }
            bn(e, tt, Wt);
            break;
          case 4:
            if (hn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, a = -1; 0 < o; ) {
              var f = 31 - _t(o);
              u = 1 << f, f = t[f], f > a && (a = f), o &= ~u;
            }
            if (o = a, o = Re() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Fp(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = zo(bn.bind(null, e, tt, Wt), o);
              break;
            }
            bn(e, tt, Wt);
            break;
          case 5:
            bn(e, tt, Wt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return nt(e, Re()), e.callbackNode === n ? nd.bind(null, e) : null;
  }
  function Ma(e, t) {
    var n = Xr;
    return e.current.memoizedState.isDehydrated && (Tn(e, t).flags |= 256), e = vi(e, t), e !== 2 && (t = tt, tt = n, t !== null && Aa(t)), e;
  }
  function Aa(e) {
    tt === null ? tt = e : tt.push.apply(tt, e);
  }
  function Up(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var o = 0; o < n.length; o++) {
          var a = n[o], u = a.getSnapshot;
          a = a.value;
          try {
            if (!St(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
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
  function hn(e, t) {
    for (t &= ~ba, t &= ~fi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - _t(t), o = 1 << n;
      e[n] = -1, t &= ~o;
    }
  }
  function rd(e) {
    if ((re & 6) !== 0) throw Error(i(327));
    ar();
    var t = Ts(e, 0);
    if ((t & 1) === 0) return nt(e, Re()), null;
    var n = vi(e, t);
    if (e.tag !== 0 && n === 2) {
      var o = uo(e);
      o !== 0 && (t = o, n = Ma(e, o));
    }
    if (n === 1) throw n = qr, Tn(e, 0), hn(e, t), nt(e, Re()), n;
    if (n === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, bn(e, tt, Wt), nt(e, Re()), null;
  }
  function Pa(e, t) {
    var n = re;
    re |= 1;
    try {
      return e(t);
    } finally {
      re = n, re === 0 && (or = Re() + 500, Ws && on());
    }
  }
  function Cn(e) {
    dn !== null && dn.tag === 0 && (re & 6) === 0 && ar();
    var t = re;
    re |= 1;
    var n = pt.transition, o = de;
    try {
      if (pt.transition = null, de = 1, e) return e();
    } finally {
      de = o, pt.transition = n, re = t, (re & 6) === 0 && on();
    }
  }
  function ja() {
    lt = ir.current, ge(ir);
  }
  function Tn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, yp(n)), Me !== null) for (n = Me.return; n !== null; ) {
      var o = n;
      switch (Ho(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && Hs();
          break;
        case 3:
          nr(), ge(Xe), ge(Ue), na();
          break;
        case 5:
          ea(o);
          break;
        case 4:
          nr();
          break;
        case 13:
          ge(_e);
          break;
        case 19:
          ge(_e);
          break;
        case 10:
          Ko(o.type._context);
          break;
        case 22:
        case 23:
          ja();
      }
      n = n.return;
    }
    if (ze = e, Me = e = pn(e.current, null), Fe = lt = t, Le = 0, qr = null, ba = fi = kn = 0, tt = Xr = null, wn !== null) {
      for (t = 0; t < wn.length; t++) if (n = wn[t], o = n.interleaved, o !== null) {
        n.interleaved = null;
        var a = o.next, u = n.pending;
        if (u !== null) {
          var f = u.next;
          u.next = a, o.next = f;
        }
        n.pending = o;
      }
      wn = null;
    }
    return e;
  }
  function sd(e, t) {
    do {
      var n = Me;
      try {
        if (Go(), ti.current = ii, ni) {
          for (var o = Se.memoizedState; o !== null; ) {
            var a = o.queue;
            a !== null && (a.pending = null), o = o.next;
          }
          ni = !1;
        }
        if (En = 0, Oe = je = Se = null, Wr = !1, Yr = 0, Ta.current = null, n === null || n.return === null) {
          Le = 1, qr = t, Me = null;
          break;
        }
        e: {
          var u = e, f = n.return, g = n, v = t;
          if (t = Fe, g.flags |= 32768, v !== null && typeof v == "object" && typeof v.then == "function") {
            var T = v, A = g, P = A.tag;
            if ((A.mode & 1) === 0 && (P === 0 || P === 11 || P === 15)) {
              var N = A.alternate;
              N ? (A.updateQueue = N.updateQueue, A.memoizedState = N.memoizedState, A.lanes = N.lanes) : (A.updateQueue = null, A.memoizedState = null);
            }
            var O = Rc(f);
            if (O !== null) {
              O.flags &= -257, Nc(O, f, g, u, t), O.mode & 1 && Ic(u, T, t), t = O, v = T;
              var F = t.updateQueue;
              if (F === null) {
                var U = /* @__PURE__ */ new Set();
                U.add(v), t.updateQueue = U;
              } else F.add(v);
              break e;
            } else {
              if ((t & 1) === 0) {
                Ic(u, T, t), La();
                break e;
              }
              v = Error(i(426));
            }
          } else if (ve && g.mode & 1) {
            var Ne = Rc(f);
            if (Ne !== null) {
              (Ne.flags & 65536) === 0 && (Ne.flags |= 256), Nc(Ne, f, g, u, t), Yo(rr(v, g));
              break e;
            }
          }
          u = v = rr(v, g), Le !== 4 && (Le = 2), Xr === null ? Xr = [u] : Xr.push(u), u = f;
          do {
            switch (u.tag) {
              case 3:
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var x = Tc(u, v, t);
                Zu(u, x);
                break e;
              case 1:
                g = v;
                var S = u.type, k = u.stateNode;
                if ((u.flags & 128) === 0 && (typeof S.getDerivedStateFromError == "function" || k !== null && typeof k.componentDidCatch == "function" && (cn === null || !cn.has(k)))) {
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var j = bc(u, g, t);
                  Zu(u, j);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        ad(n);
      } catch ($) {
        t = $, Me === n && n !== null && (Me = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function id() {
    var e = di.current;
    return di.current = ii, e === null ? ii : e;
  }
  function La() {
    (Le === 0 || Le === 3 || Le === 2) && (Le = 4), ze === null || (kn & 268435455) === 0 && (fi & 268435455) === 0 || hn(ze, Fe);
  }
  function vi(e, t) {
    var n = re;
    re |= 2;
    var o = id();
    (ze !== e || Fe !== t) && (Wt = null, Tn(e, t));
    do
      try {
        $p();
        break;
      } catch (a) {
        sd(e, a);
      }
    while (!0);
    if (Go(), re = n, di.current = o, Me !== null) throw Error(i(261));
    return ze = null, Fe = 0, Le;
  }
  function $p() {
    for (; Me !== null; ) od(Me);
  }
  function Hp() {
    for (; Me !== null && !ph(); ) od(Me);
  }
  function od(e) {
    var t = cd(e.alternate, e, lt);
    e.memoizedProps = e.pendingProps, t === null ? ad(e) : Me = t, Ta.current = null;
  }
  function ad(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = Lp(n, t, lt), n !== null) {
          Me = n;
          return;
        }
      } else {
        if (n = Op(n, t), n !== null) {
          n.flags &= 32767, Me = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Le = 6, Me = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Me = t;
        return;
      }
      Me = t = e;
    } while (t !== null);
    Le === 0 && (Le = 5);
  }
  function bn(e, t, n) {
    var o = de, a = pt.transition;
    try {
      pt.transition = null, de = 1, Vp(e, t, n, o);
    } finally {
      pt.transition = a, de = o;
    }
    return null;
  }
  function Vp(e, t, n, o) {
    do
      ar();
    while (dn !== null);
    if ((re & 6) !== 0) throw Error(i(327));
    n = e.finishedWork;
    var a = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var u = n.lanes | n.childLanes;
    if (kh(e, u), e === ze && (Me = ze = null, Fe = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || pi || (pi = !0, dd(xs, function() {
      return ar(), null;
    })), u = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || u) {
      u = pt.transition, pt.transition = null;
      var f = de;
      de = 1;
      var g = re;
      re |= 4, Ta.current = null, Dp(e, n), qc(n, e), cp(Lo), Rs = !!jo, Lo = jo = null, e.current = n, Bp(n), mh(), re = g, de = f, pt.transition = u;
    } else e.current = n;
    if (pi && (pi = !1, dn = e, mi = a), u = e.pendingLanes, u === 0 && (cn = null), vh(n.stateNode), nt(e, Re()), t !== null) for (o = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], o(a.value, { componentStack: a.stack, digest: a.digest });
    if (hi) throw hi = !1, e = Ra, Ra = null, e;
    return (mi & 1) !== 0 && e.tag !== 0 && ar(), u = e.pendingLanes, (u & 1) !== 0 ? e === Na ? Zr++ : (Zr = 0, Na = e) : Zr = 0, on(), null;
  }
  function ar() {
    if (dn !== null) {
      var e = Kl(mi), t = pt.transition, n = de;
      try {
        if (pt.transition = null, de = 16 > e ? 16 : e, dn === null) var o = !1;
        else {
          if (e = dn, dn = null, mi = 0, (re & 6) !== 0) throw Error(i(331));
          var a = re;
          for (re |= 4, D = e.current; D !== null; ) {
            var u = D, f = u.child;
            if ((D.flags & 16) !== 0) {
              var g = u.deletions;
              if (g !== null) {
                for (var v = 0; v < g.length; v++) {
                  var T = g[v];
                  for (D = T; D !== null; ) {
                    var A = D;
                    switch (A.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Jr(8, A, u);
                    }
                    var P = A.child;
                    if (P !== null) P.return = A, D = P;
                    else for (; D !== null; ) {
                      A = D;
                      var N = A.sibling, O = A.return;
                      if (Yc(A), A === T) {
                        D = null;
                        break;
                      }
                      if (N !== null) {
                        N.return = O, D = N;
                        break;
                      }
                      D = O;
                    }
                  }
                }
                var F = u.alternate;
                if (F !== null) {
                  var U = F.child;
                  if (U !== null) {
                    F.child = null;
                    do {
                      var Ne = U.sibling;
                      U.sibling = null, U = Ne;
                    } while (U !== null);
                  }
                }
                D = u;
              }
            }
            if ((u.subtreeFlags & 2064) !== 0 && f !== null) f.return = u, D = f;
            else e: for (; D !== null; ) {
              if (u = D, (u.flags & 2048) !== 0) switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  Jr(9, u, u.return);
              }
              var x = u.sibling;
              if (x !== null) {
                x.return = u.return, D = x;
                break e;
              }
              D = u.return;
            }
          }
          var S = e.current;
          for (D = S; D !== null; ) {
            f = D;
            var k = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && k !== null) k.return = f, D = k;
            else e: for (f = S; D !== null; ) {
              if (g = D, (g.flags & 2048) !== 0) try {
                switch (g.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ci(9, g);
                }
              } catch ($) {
                Ce(g, g.return, $);
              }
              if (g === f) {
                D = null;
                break e;
              }
              var j = g.sibling;
              if (j !== null) {
                j.return = g.return, D = j;
                break e;
              }
              D = g.return;
            }
          }
          if (re = a, on(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
            Nt.onPostCommitFiberRoot(Es, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        de = n, pt.transition = t;
      }
    }
    return !1;
  }
  function ld(e, t, n) {
    t = rr(n, t), t = Tc(e, t, 1), e = ln(e, t, 1), t = Qe(), e !== null && (Er(e, 1, t), nt(e, t));
  }
  function Ce(e, t, n) {
    if (e.tag === 3) ld(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        ld(t, e, n);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (cn === null || !cn.has(o))) {
          e = rr(n, e), e = bc(t, e, 1), t = ln(t, e, 1), e = Qe(), t !== null && (Er(t, 1, e), nt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Wp(e, t, n) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = Qe(), e.pingedLanes |= e.suspendedLanes & n, ze === e && (Fe & n) === n && (Le === 4 || Le === 3 && (Fe & 130023424) === Fe && 500 > Re() - Ia ? Tn(e, 0) : ba |= n), nt(e, t);
  }
  function ud(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Cs, Cs <<= 1, (Cs & 130023424) === 0 && (Cs = 4194304)));
    var n = Qe();
    e = $t(e, t), e !== null && (Er(e, t, n), nt(e, n));
  }
  function Yp(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), ud(e, n);
  }
  function Qp(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode, a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    o !== null && o.delete(t), ud(e, n);
  }
  var cd;
  cd = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Xe.current) et = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return et = !1, jp(e, t, n);
      et = (e.flags & 131072) !== 0;
    }
    else et = !1, ve && (t.flags & 1048576) !== 0 && Hu(t, Qs, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        li(e, t), e = t.pendingProps;
        var a = Kn(t, Ue.current);
        tr(t, n), a = ia(null, t, o, e, a, n);
        var u = oa();
        return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ze(o) ? (u = !0, Vs(t)) : u = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Xo(t), a.updater = oi, t.stateNode = a, a._reactInternals = t, fa(t, o, e, n), t = ga(null, t, o, !0, u, n)) : (t.tag = 0, ve && u && $o(t), Ye(null, t, a, n), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (li(e, t), e = t.pendingProps, a = o._init, o = a(o._payload), t.type = o, a = t.tag = Kp(o), e = xt(o, e), a) {
            case 0:
              t = ma(null, t, o, e, n);
              break e;
            case 1:
              t = Oc(null, t, o, e, n);
              break e;
            case 11:
              t = Mc(null, t, o, e, n);
              break e;
            case 14:
              t = Ac(null, t, o, xt(o.type, e), n);
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
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), ma(e, t, o, a, n);
      case 1:
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), Oc(e, t, o, a, n);
      case 3:
        e: {
          if (zc(t), e === null) throw Error(i(387));
          o = t.pendingProps, u = t.memoizedState, a = u.element, Xu(e, t), Zs(t, o, null, n);
          var f = t.memoizedState;
          if (o = f.element, u.isDehydrated) if (u = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            a = rr(Error(i(423)), t), t = Dc(e, t, o, n, a);
            break e;
          } else if (o !== a) {
            a = rr(Error(i(424)), t), t = Dc(e, t, o, n, a);
            break e;
          } else for (at = nn(t.stateNode.containerInfo.firstChild), ot = t, ve = !0, wt = null, n = Ju(t, null, o, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Xn(), o === a) {
              t = Vt(e, t, n);
              break e;
            }
            Ye(e, t, o, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return tc(t), e === null && Wo(t), o = t.type, a = t.pendingProps, u = e !== null ? e.memoizedProps : null, f = a.children, Oo(o, a) ? f = null : u !== null && Oo(o, u) && (t.flags |= 32), Lc(e, t), Ye(e, t, f, n), t.child;
      case 6:
        return e === null && Wo(t), null;
      case 13:
        return Bc(e, t, n);
      case 4:
        return Zo(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = Zn(t, null, o, n) : Ye(e, t, o, n), t.child;
      case 11:
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), Mc(e, t, o, a, n);
      case 7:
        return Ye(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ye(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ye(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (o = t.type._context, a = t.pendingProps, u = t.memoizedProps, f = a.value, pe(Js, o._currentValue), o._currentValue = f, u !== null) if (St(u.value, f)) {
            if (u.children === a.children && !Xe.current) {
              t = Vt(e, t, n);
              break e;
            }
          } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
            var g = u.dependencies;
            if (g !== null) {
              f = u.child;
              for (var v = g.firstContext; v !== null; ) {
                if (v.context === o) {
                  if (u.tag === 1) {
                    v = Ht(-1, n & -n), v.tag = 2;
                    var T = u.updateQueue;
                    if (T !== null) {
                      T = T.shared;
                      var A = T.pending;
                      A === null ? v.next = v : (v.next = A.next, A.next = v), T.pending = v;
                    }
                  }
                  u.lanes |= n, v = u.alternate, v !== null && (v.lanes |= n), Jo(
                    u.return,
                    n,
                    t
                  ), g.lanes |= n;
                  break;
                }
                v = v.next;
              }
            } else if (u.tag === 10) f = u.type === t.type ? null : u.child;
            else if (u.tag === 18) {
              if (f = u.return, f === null) throw Error(i(341));
              f.lanes |= n, g = f.alternate, g !== null && (g.lanes |= n), Jo(f, n, t), f = u.sibling;
            } else f = u.child;
            if (f !== null) f.return = u;
            else for (f = u; f !== null; ) {
              if (f === t) {
                f = null;
                break;
              }
              if (u = f.sibling, u !== null) {
                u.return = f.return, f = u;
                break;
              }
              f = f.return;
            }
            u = f;
          }
          Ye(e, t, a.children, n), t = t.child;
        }
        return t;
      case 9:
        return a = t.type, o = t.pendingProps.children, tr(t, n), a = ft(a), o = o(a), t.flags |= 1, Ye(e, t, o, n), t.child;
      case 14:
        return o = t.type, a = xt(o, t.pendingProps), a = xt(o.type, a), Ac(e, t, o, a, n);
      case 15:
        return Pc(e, t, t.type, t.pendingProps, n);
      case 17:
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), li(e, t), t.tag = 1, Ze(o) ? (e = !0, Vs(t)) : e = !1, tr(t, n), kc(t, o, a), fa(t, o, a, n), ga(null, t, o, !0, e, n);
      case 19:
        return Uc(e, t, n);
      case 22:
        return jc(e, t, n);
    }
    throw Error(i(156, t.tag));
  };
  function dd(e, t) {
    return Vl(e, t);
  }
  function Gp(e, t, n, o) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function mt(e, t, n, o) {
    return new Gp(e, t, n, o);
  }
  function Oa(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Kp(e) {
    if (typeof e == "function") return Oa(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Je) return 11;
      if (e === Rt) return 14;
    }
    return 2;
  }
  function pn(e, t) {
    var n = e.alternate;
    return n === null ? (n = mt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function _i(e, t, n, o, a, u) {
    var f = 2;
    if (o = e, typeof e == "function") Oa(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case ue:
        return In(n.children, a, u, t);
      case q:
        f = 8, a |= 8;
        break;
      case fe:
        return e = mt(12, n, t, a | 2), e.elementType = fe, e.lanes = u, e;
      case Pe:
        return e = mt(13, n, t, a), e.elementType = Pe, e.lanes = u, e;
      case vt:
        return e = mt(19, n, t, a), e.elementType = vt, e.lanes = u, e;
      case ke:
        return Si(n, a, u, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Ae:
            f = 10;
            break e;
          case Ie:
            f = 9;
            break e;
          case Je:
            f = 11;
            break e;
          case Rt:
            f = 14;
            break e;
          case qe:
            f = 16, o = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = mt(f, n, t, a), t.elementType = e, t.type = o, t.lanes = u, t;
  }
  function In(e, t, n, o) {
    return e = mt(7, e, o, t), e.lanes = n, e;
  }
  function Si(e, t, n, o) {
    return e = mt(22, e, o, t), e.elementType = ke, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function za(e, t, n) {
    return e = mt(6, e, null, t), e.lanes = n, e;
  }
  function Da(e, t, n) {
    return t = mt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Jp(e, t, n, o, a) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = co(0), this.expirationTimes = co(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = co(0), this.identifierPrefix = o, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
  }
  function Ba(e, t, n, o, a, u, f, g, v) {
    return e = new Jp(e, t, n, g, v), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = mt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: o, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Xo(u), e;
  }
  function qp(e, t, n) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ne, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: n };
  }
  function fd(e) {
    if (!e) return sn;
    e = e._reactInternals;
    e: {
      if (gn(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ze(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(i(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Ze(n)) return Fu(e, n, t);
    }
    return t;
  }
  function hd(e, t, n, o, a, u, f, g, v) {
    return e = Ba(n, o, !0, e, a, u, f, g, v), e.context = fd(null), n = e.current, o = Qe(), a = fn(n), u = Ht(o, a), u.callback = t ?? null, ln(n, u, a), e.current.lanes = a, Er(e, a, o), nt(e, o), e;
  }
  function wi(e, t, n, o) {
    var a = t.current, u = Qe(), f = fn(a);
    return n = fd(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ht(u, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = ln(a, t, f), e !== null && (Ct(e, a, f, u), Xs(e, a, f)), f;
  }
  function xi(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function pd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Fa(e, t) {
    pd(e, t), (e = e.alternate) && pd(e, t);
  }
  function Xp() {
    return null;
  }
  var md = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Ua(e) {
    this._internalRoot = e;
  }
  Ei.prototype.render = Ua.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    wi(e, t, null, null);
  }, Ei.prototype.unmount = Ua.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Cn(function() {
        wi(null, e, null, null);
      }), t[Dt] = null;
    }
  };
  function Ei(e) {
    this._internalRoot = e;
  }
  Ei.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Xl();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Zt.length && t !== 0 && t < Zt[n].priority; n++) ;
      Zt.splice(n, 0, e), n === 0 && tu(e);
    }
  };
  function $a(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function ki(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function gd() {
  }
  function Zp(e, t, n, o, a) {
    if (a) {
      if (typeof o == "function") {
        var u = o;
        o = function() {
          var T = xi(f);
          u.call(T);
        };
      }
      var f = hd(t, o, e, 0, null, !1, !1, "", gd);
      return e._reactRootContainer = f, e[Dt] = f.current, zr(e.nodeType === 8 ? e.parentNode : e), Cn(), f;
    }
    for (; a = e.lastChild; ) e.removeChild(a);
    if (typeof o == "function") {
      var g = o;
      o = function() {
        var T = xi(v);
        g.call(T);
      };
    }
    var v = Ba(e, 0, !1, null, null, !1, !1, "", gd);
    return e._reactRootContainer = v, e[Dt] = v.current, zr(e.nodeType === 8 ? e.parentNode : e), Cn(function() {
      wi(t, v, n, o);
    }), v;
  }
  function Ci(e, t, n, o, a) {
    var u = n._reactRootContainer;
    if (u) {
      var f = u;
      if (typeof a == "function") {
        var g = a;
        a = function() {
          var v = xi(f);
          g.call(v);
        };
      }
      wi(t, f, e, a);
    } else f = Zp(n, t, e, a, o);
    return xi(f);
  }
  Jl = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = xr(t.pendingLanes);
          n !== 0 && (fo(t, n | 1), nt(t, Re()), (re & 6) === 0 && (or = Re() + 500, on()));
        }
        break;
      case 13:
        Cn(function() {
          var o = $t(e, 1);
          if (o !== null) {
            var a = Qe();
            Ct(o, e, 1, a);
          }
        }), Fa(e, 1);
    }
  }, ho = function(e) {
    if (e.tag === 13) {
      var t = $t(e, 134217728);
      if (t !== null) {
        var n = Qe();
        Ct(t, e, 134217728, n);
      }
      Fa(e, 134217728);
    }
  }, ql = function(e) {
    if (e.tag === 13) {
      var t = fn(e), n = $t(e, t);
      if (n !== null) {
        var o = Qe();
        Ct(n, e, t, o);
      }
      Fa(e, t);
    }
  }, Xl = function() {
    return de;
  }, Zl = function(e, t) {
    var n = de;
    try {
      return de = e, t();
    } finally {
      de = n;
    }
  }, so = function(e, t, n) {
    switch (t) {
      case "input":
        if (Ji(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var o = n[t];
            if (o !== e && o.form === e.form) {
              var a = $s(o);
              if (!a) throw Error(i(90));
              El(o), Ji(o, a);
            }
          }
        }
        break;
      case "textarea":
        Il(e, n);
        break;
      case "select":
        t = n.value, t != null && zn(e, !!n.multiple, t, !1);
    }
  }, zl = Pa, Dl = Cn;
  var em = { usingClientEntryPoint: !1, Events: [Fr, Qn, $s, Ll, Ol, Pa] }, es = { findFiberByHostInstance: yn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, tm = { bundleType: es.bundleType, version: es.version, rendererPackageName: es.rendererPackageName, rendererConfig: es.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: X.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = $l(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: es.findFiberByHostInstance || Xp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ti.isDisabled && Ti.supportsFiber) try {
      Es = Ti.inject(tm), Nt = Ti;
    } catch {
    }
  }
  return rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = em, rt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!$a(t)) throw Error(i(200));
    return qp(e, t, null, n);
  }, rt.createRoot = function(e, t) {
    if (!$a(e)) throw Error(i(299));
    var n = !1, o = "", a = md;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = Ba(e, 1, !1, null, null, n, !1, o, a), e[Dt] = t.current, zr(e.nodeType === 8 ? e.parentNode : e), new Ua(t);
  }, rt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = $l(t), e = e === null ? null : e.stateNode, e;
  }, rt.flushSync = function(e) {
    return Cn(e);
  }, rt.hydrate = function(e, t, n) {
    if (!ki(t)) throw Error(i(200));
    return Ci(null, e, t, !0, n);
  }, rt.hydrateRoot = function(e, t, n) {
    if (!$a(e)) throw Error(i(405));
    var o = n != null && n.hydratedSources || null, a = !1, u = "", f = md;
    if (n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (f = n.onRecoverableError)), t = hd(t, null, e, 1, n ?? null, a, !1, u, f), e[Dt] = t.current, zr(e), o) for (e = 0; e < o.length; e++) n = o[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(
      n,
      a
    );
    return new Ei(t);
  }, rt.render = function(e, t, n) {
    if (!ki(t)) throw Error(i(200));
    return Ci(null, e, t, !1, n);
  }, rt.unmountComponentAtNode = function(e) {
    if (!ki(e)) throw Error(i(40));
    return e._reactRootContainer ? (Cn(function() {
      Ci(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Dt] = null;
      });
    }), !0) : !1;
  }, rt.unstable_batchedUpdates = Pa, rt.unstable_renderSubtreeIntoContainer = function(e, t, n, o) {
    if (!ki(n)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Ci(e, t, n, !1, o);
  }, rt.version = "18.3.1-next-f1338f8080-20240426", rt;
}
var kd;
function ef() {
  if (kd) return Wa.exports;
  kd = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), Wa.exports = cm(), Wa.exports;
}
var Cd;
function dm() {
  if (Cd) return bi;
  Cd = 1;
  var s = ef();
  return bi.createRoot = s.createRoot, bi.hydrateRoot = s.hydrateRoot, bi;
}
var fm = dm(), hm = ef();
const pm = (s) => Array.from(s).map((i) => i.getModelContext()).sort((i, l) => (l.priority ?? 0) - (i.priority ?? 0)).reduce((i, l) => {
  if (l.system && (i.system ? i.system += `

${l.system}` : i.system = l.system), l.tools)
    for (const [c, d] of Object.entries(l.tools)) {
      const h = i.tools?.[c];
      if (h && h !== d)
        throw new Error(`You tried to define a tool with the name ${c}, but it already exists.`);
      i.tools || (i.tools = {}), i.tools[c] = d;
    }
  return l.config && (i.config = {
    ...i.config,
    ...l.config
  }), l.callSettings && (i.callSettings = {
    ...i.callSettings,
    ...l.callSettings
  }), i;
}, {});
class tf {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return pm(this._providers);
  }
  registerModelContextProvider(r) {
    this._providers.add(r);
    const i = r.subscribe?.(() => {
      this.notifySubscribers();
    });
    return this.notifySubscribers(), () => {
      this._providers.delete(r), i?.(), this.notifySubscribers();
    };
  }
  _subscribers = /* @__PURE__ */ new Set();
  notifySubscribers() {
    for (const r of this._subscribers)
      r();
  }
  subscribe(r) {
    return this._subscribers.add(r), () => this._subscribers.delete(r);
  }
}
class mm {
  _contextProvider = new tf();
  registerModelContextProvider(r) {
    return this._contextProvider.registerModelContextProvider(r);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class gm {
  _subscribers = /* @__PURE__ */ new Set();
  subscribe(r) {
    return this._subscribers.add(r), () => this._subscribers.delete(r);
  }
  waitForUpdate() {
    return new Promise((r) => {
      const i = this.subscribe(() => {
        i(), r();
      });
    });
  }
  _notifySubscribers() {
    const r = [];
    for (const i of this._subscribers)
      try {
        i();
      } catch (l) {
        r.push(l);
      }
    if (r.length > 0)
      throw r.length === 1 ? r[0] : new AggregateError(r);
  }
}
const ym = (s) => s.status.type === "complete";
class nf extends gm {
  isEditing = !0;
  get attachmentAccept() {
    return this.getAttachmentAdapter()?.accept ?? "*";
  }
  _attachments = [];
  get attachments() {
    return this._attachments;
  }
  setAttachments(r) {
    this._attachments = r, this._notifySubscribers();
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
  setText(r) {
    if (this._text !== r) {
      if (this._text = r, this._dictation) {
        this._dictationBaseText = r, this._currentInterimText = "";
        const { status: i, inputDisabled: l } = this._dictation;
        this._dictation = l ? { status: i, inputDisabled: l } : { status: i };
      }
      this._notifySubscribers();
    }
  }
  setRole(r) {
    this._role !== r && (this._role = r, this._notifySubscribers());
  }
  setRunConfig(r) {
    this._runConfig !== r && (this._runConfig = r, this._notifySubscribers());
  }
  _emptyTextAndAttachments() {
    this._attachments = [], this._text = "", this._notifySubscribers();
  }
  async _onClearAttachments() {
    const r = this.getAttachmentAdapter();
    r && await Promise.all(this._attachments.map((i) => r.remove(i)));
  }
  async reset() {
    if (this._attachments.length === 0 && this._text === "" && this._role === "user" && Object.keys(this._runConfig).length === 0)
      return;
    this._role = "user", this._runConfig = {};
    const r = this._onClearAttachments();
    this._emptyTextAndAttachments(), await r;
  }
  async clearAttachments() {
    const r = this._onClearAttachments();
    this.setAttachments([]), await r;
  }
  async send() {
    this._dictationSession && (this._dictationSession.cancel(), this._cleanupDictation());
    const r = this.getAttachmentAdapter(), i = r && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => ym(d) ? d : await r.send(d))) : [], l = this.text;
    this._emptyTextAndAttachments();
    const c = {
      createdAt: /* @__PURE__ */ new Date(),
      role: this.role,
      content: l ? [{ type: "text", text: l }] : [],
      attachments: await i,
      runConfig: this.runConfig,
      metadata: { custom: {} }
    };
    this.handleSend(c), this._notifyEventSubscribers("send");
  }
  cancel() {
    this.handleCancel();
  }
  async addAttachment(r) {
    const i = this.getAttachmentAdapter();
    if (!i)
      throw new Error("Attachments are not supported");
    const l = (d) => {
      const h = this._attachments.findIndex((p) => p.id === d.id);
      h !== -1 ? this._attachments = [
        ...this._attachments.slice(0, h),
        d,
        ...this._attachments.slice(h + 1)
      ] : this._attachments = [...this._attachments, d], this._notifySubscribers();
    }, c = i.add({ file: r });
    if (Symbol.asyncIterator in c)
      for await (const d of c)
        l(d);
    else
      l(await c);
    this._notifyEventSubscribers("attachment-add"), this._notifySubscribers();
  }
  async removeAttachment(r) {
    const i = this.getAttachmentAdapter();
    if (!i)
      throw new Error("Attachments are not supported");
    const l = this._attachments.findIndex((d) => d.id === r);
    if (l === -1)
      throw new Error("Attachment not found");
    const c = this._attachments[l];
    await i.remove(c), this._attachments = [
      ...this._attachments.slice(0, l),
      ...this._attachments.slice(l + 1)
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
  _isActiveSession(r, i) {
    return this._activeDictationSessionId === r && this._dictationSession === i;
  }
  startDictation() {
    const r = this.getDictationAdapter();
    if (!r)
      throw new Error("Dictation adapter not configured");
    if (this._dictationSession) {
      for (const E of this._dictationUnsubscribes)
        E();
      this._dictationUnsubscribes = [], this._dictationSession.stop().catch(() => {
      }), this._dictationSession = void 0;
    }
    const i = r.disableInputDuringDictation ?? !1;
    this._dictationBaseText = this._text, this._currentInterimText = "";
    const l = r.listen();
    this._dictationSession = l;
    const c = ++this._dictationSessionIdCounter;
    this._activeDictationSessionId = c, this._dictation = { status: l.status, inputDisabled: i }, this._notifySubscribers();
    const d = l.onSpeech((_) => {
      if (!this._isActiveSession(c, l))
        return;
      const E = _.isFinal !== !1, C = this._dictationBaseText && !this._dictationBaseText.endsWith(" ") && _.transcript ? " " : "";
      if (E) {
        if (this._dictationBaseText = this._dictationBaseText + C + _.transcript, this._currentInterimText = "", this._text = this._dictationBaseText, this._dictation) {
          const { transcript: R, ...z } = this._dictation;
          this._dictation = z;
        }
        this._notifySubscribers();
      } else
        this._currentInterimText = C + _.transcript, this._text = this._dictationBaseText + this._currentInterimText, this._dictation && (this._dictation = {
          ...this._dictation,
          transcript: _.transcript
        }), this._notifySubscribers();
    });
    this._dictationUnsubscribes.push(d);
    const h = l.onSpeechStart(() => {
      this._isActiveSession(c, l) && (this._dictation = {
        status: { type: "running" },
        inputDisabled: i,
        ...this._dictation?.transcript && {
          transcript: this._dictation.transcript
        }
      }, this._notifySubscribers());
    });
    this._dictationUnsubscribes.push(h);
    const p = l.onSpeechEnd(() => {
      this._cleanupDictation({ sessionId: c });
    });
    this._dictationUnsubscribes.push(p);
    const m = setInterval(() => {
      this._isActiveSession(c, l) && l.status.type === "ended" && this._cleanupDictation({ sessionId: c });
    }, 100);
    this._dictationUnsubscribes.push(() => clearInterval(m));
  }
  stopDictation() {
    if (!this._dictationSession)
      return;
    const r = this._dictationSession, i = this._activeDictationSessionId;
    r.stop().finally(() => {
      this._cleanupDictation({ sessionId: i });
    });
  }
  _cleanupDictation(r) {
    if (!(r?.sessionId !== void 0 && r.sessionId !== this._activeDictationSessionId || this._isCleaningDictation)) {
      this._isCleaningDictation = !0;
      try {
        for (const l of this._dictationUnsubscribes)
          l();
        this._dictationUnsubscribes = [], this._dictationSession = void 0, this._activeDictationSessionId = void 0, this._dictation = void 0, this._dictationBaseText = "", this._currentInterimText = "", this._notifySubscribers();
      } finally {
        this._isCleaningDictation = !1;
      }
    }
  }
  _eventSubscribers = /* @__PURE__ */ new Map();
  _notifyEventSubscribers(r) {
    const i = this._eventSubscribers.get(r);
    if (i)
      for (const l of i)
        l();
  }
  unstable_on(r, i) {
    const l = this._eventSubscribers.get(r);
    return l ? l.add(i) : this._eventSubscribers.set(r, /* @__PURE__ */ new Set([i])), () => {
      const c = this._eventSubscribers.get(r);
      c && c.delete(i);
    };
  }
}
class vm extends nf {
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
  constructor(r) {
    super(), this.runtime = r, this.connect();
  }
  connect() {
    return this.runtime.subscribe(() => {
      this.canCancel !== this.runtime.capabilities.cancel && (this._canCancel = this.runtime.capabilities.cancel, this._notifySubscribers());
    });
  }
  async handleSend(r) {
    this.runtime.append({
      ...r,
      parentId: this.runtime.messages.at(-1)?.id ?? null,
      sourceId: null
    });
  }
  async handleCancel() {
    this.runtime.cancelRun();
  }
}
let _m = (s, r = 21) => (i = r) => {
  let l = "", c = i | 0;
  for (; c--; )
    l += s[Math.random() * s.length | 0];
  return l;
};
const ll = _m("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), Sm = "__optimistic__", wm = () => `${Sm}${ll()}`, hr = /* @__PURE__ */ Symbol("autoStatus"), xm = Object.freeze(Object.assign({ type: "running" }, { [hr]: !0 })), Em = Object.freeze(Object.assign({
  type: "complete",
  reason: "unknown"
}, { [hr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "tool-calls"
}, { [hr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "interrupt"
}, { [hr]: !0 }));
const km = (s) => s[hr] === !0, rf = (s, r, i, l, c) => s && c ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: c
}, { [hr]: !0 }) : s && r ? xm : Em;
var Rn = { exports: {} }, Td;
function Cm() {
  if (Td) return Rn.exports;
  Td = 1;
  const s = typeof Buffer < "u", r = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function l(p, m, _) {
    _ == null && m !== null && typeof m == "object" && (_ = m, m = void 0), s && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const E = JSON.parse(p, m);
    if (E === null || typeof E != "object")
      return E;
    const b = _ && _.protoAction || "error", C = _ && _.constructorAction || "error";
    if (b === "ignore" && C === "ignore")
      return E;
    if (b !== "ignore" && C !== "ignore") {
      if (r.test(p) === !1 && i.test(p) === !1)
        return E;
    } else if (b !== "ignore" && C === "ignore") {
      if (r.test(p) === !1)
        return E;
    } else if (i.test(p) === !1)
      return E;
    return c(E, { protoAction: b, constructorAction: C, safe: _ && _.safe });
  }
  function c(p, { protoAction: m = "error", constructorAction: _ = "error", safe: E } = {}) {
    let b = [p];
    for (; b.length; ) {
      const C = b;
      b = [];
      for (const R of C) {
        if (m !== "ignore" && Object.prototype.hasOwnProperty.call(R, "__proto__")) {
          if (E === !0)
            return null;
          if (m === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete R.__proto__;
        }
        if (_ !== "ignore" && Object.prototype.hasOwnProperty.call(R, "constructor") && R.constructor !== null && typeof R.constructor == "object" && Object.prototype.hasOwnProperty.call(R.constructor, "prototype")) {
          if (E === !0)
            return null;
          if (_ === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete R.constructor;
        }
        for (const z in R) {
          const H = R[z];
          H && typeof H == "object" && b.push(H);
        }
      }
    }
    return p;
  }
  function d(p, m, _) {
    const { stackTraceLimit: E } = Error;
    Error.stackTraceLimit = 0;
    try {
      return l(p, m, _);
    } finally {
      Error.stackTraceLimit = E;
    }
  }
  function h(p, m) {
    const { stackTraceLimit: _ } = Error;
    Error.stackTraceLimit = 0;
    try {
      return l(p, m, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = _;
    }
  }
  return Rn.exports = d, Rn.exports.default = d, Rn.exports.parse = d, Rn.exports.safeParse = h, Rn.exports.scan = c, Rn.exports;
}
var Tm = Cm();
const bd = /* @__PURE__ */ Zd(Tm);
function bm(s) {
  const r = ["ROOT"];
  let i = -1, l = null;
  const c = [];
  let d;
  function h() {
    d !== void 0 && (c.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(b, C, R) {
    switch (b) {
      case '"': {
        i = C, r.pop(), r.push(R), r.push("INSIDE_STRING"), h();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = C, l = C, r.pop(), r.push(R), r.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        r.pop(), r.push(R), r.push("INSIDE_NUMBER"), h();
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
        i = C, r.pop(), r.push(R), r.push("INSIDE_NUMBER"), h();
        break;
      }
      case "{": {
        i = C, r.pop(), r.push(R), r.push("INSIDE_OBJECT_START"), h();
        break;
      }
      case "[": {
        i = C, r.pop(), r.push(R), r.push("INSIDE_ARRAY_START"), h();
        break;
      }
    }
  }
  function m(b, C) {
    switch (b) {
      case ",": {
        r.pop(), r.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        i = C, r.pop(), d = c.pop();
        break;
      }
    }
  }
  function _(b, C) {
    switch (b) {
      case ",": {
        r.pop(), r.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
        break;
      }
      case "]": {
        i = C, r.pop(), d = c.pop();
        break;
      }
    }
  }
  for (let b = 0; b < s.length; b++) {
    const C = s[b];
    switch (r[r.length - 1]) {
      case "ROOT":
        p(C, b, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (C) {
          case '"': {
            r.pop(), r.push("INSIDE_OBJECT_KEY"), d = "";
            break;
          }
          case "}": {
            i = b, r.pop(), d = c.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        C === '"' && (r.pop(), r.push("INSIDE_OBJECT_KEY"), d = "");
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (C) {
          case '"': {
            r.pop(), r.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
          case "\\": {
            r.push("INSIDE_STRING_ESCAPE"), d += C;
            break;
          }
          default: {
            d += C;
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        C === ":" && (r.pop(), r.push("INSIDE_OBJECT_BEFORE_VALUE"));
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        p(C, b, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        m(C, b);
        break;
      }
      case "INSIDE_STRING": {
        switch (C) {
          case '"': {
            r.pop(), i = b, d = c.pop();
            break;
          }
          case "\\": {
            r.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            i = b;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        C === "]" ? (i = b, r.pop(), d = c.pop()) : (i = b, d = "0", p(C, b, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (C) {
          case ",": {
            r.pop(), r.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
            break;
          }
          case "]": {
            i = b, r.pop(), d = c.pop();
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
        p(C, b, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        r.pop(), r[r.length - 1] === "INSIDE_STRING" ? i = b : r[r.length - 1] === "INSIDE_OBJECT_KEY" && (d += C);
        break;
      }
      case "INSIDE_NUMBER": {
        switch (C) {
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
            r.pop(), d = c.pop(), r[r.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(C, b), r[r.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(C, b);
            break;
          }
          case "}": {
            r.pop(), d = c.pop(), r[r.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(C, b);
            break;
          }
          case "]": {
            r.pop(), d = c.pop(), r[r.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(C, b);
            break;
          }
          default: {
            r.pop(), d = c.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const z = s.substring(l, b + 1);
        !"false".startsWith(z) && !"true".startsWith(z) && !"null".startsWith(z) ? (r.pop(), r[r.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? m(C, b) : r[r.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(C, b)) : i = b;
        break;
      }
    }
  }
  let E = s.slice(0, i + 1);
  for (let b = r.length - 1; b >= 0; b--)
    switch (r[b]) {
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
        const R = s.substring(l, s.length);
        "true".startsWith(R) ? E += "true".slice(R.length) : "false".startsWith(R) ? E += "false".slice(R.length) : "null".startsWith(R) && (E += "null".slice(R.length));
      }
    }
  return [E, c];
}
const Ga = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), Im = (s) => {
  if (s.length === 0)
    return {
      [Ga]: { state: "partial", partialPath: [] }
    };
  try {
    const r = bd.parse(s);
    if (typeof r != "object" || r === null)
      throw new Error("argsText is expected to be an object");
    return r[Ga] = {
      state: "complete",
      partialPath: []
    }, r;
  } catch {
    try {
      const [r, i] = bm(s), l = bd.parse(r);
      if (typeof l != "object" || l === null)
        throw new Error("argsText is expected to be an object");
      return l[Ga] = {
        state: "partial",
        partialPath: i
      }, l;
    } catch {
      return;
    }
  }
}, ul = (s, r, i) => {
  const { role: l, id: c, createdAt: d, attachments: h, status: p, metadata: m } = s, _ = {
    id: c ?? r,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, E = typeof s.content == "string" ? [{ type: "text", text: s.content }] : s.content, b = ({ image: C, ...R }) => {
    const z = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(C), H = /^https?:\/\//.test(C);
    return z || H ? { ...R, image: C } : (console.warn("Invalid image data format detected"), null);
  };
  if (l !== "user" && h?.length)
    throw new Error("attachments are only supported for user messages");
  if (l !== "assistant" && p)
    throw new Error("status is only supported for assistant messages");
  if (l !== "assistant" && m?.steps)
    throw new Error("metadata.steps is only supported for assistant messages");
  switch (l) {
    case "assistant":
      return {
        ..._,
        role: l,
        content: E.map((C) => {
          const R = C.type;
          switch (R) {
            case "text":
            case "reasoning":
              return C.text.trim().length === 0 ? null : C;
            case "file":
            case "source":
              return C;
            case "image":
              return b(C);
            case "data":
              return C;
            case "tool-call": {
              const { parentId: z, messages: H, ...G } = C, se = {
                ...G,
                toolCallId: C.toolCallId ?? `tool-${ll()}`,
                ...z !== void 0 && { parentId: z },
                ...H !== void 0 && { messages: H }
              };
              return C.args ? {
                ...se,
                args: C.args,
                argsText: C.argsText ?? JSON.stringify(C.args)
              } : {
                ...se,
                args: Im(C.argsText ?? "") ?? {},
                argsText: C.argsText ?? ""
              };
            }
            default: {
              const z = R;
              throw new Error(`Unsupported assistant message part type: ${z}`);
            }
          }
        }).filter((C) => !!C),
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
        role: l,
        content: E.map((C) => {
          const R = C.type;
          switch (R) {
            case "text":
            case "image":
            case "audio":
            case "file":
              return C;
            default: {
              const z = R;
              throw new Error(`Unsupported user message part type: ${z}`);
            }
          }
        }),
        attachments: h ?? [],
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    case "system":
      if (E.length !== 1 || E[0].type !== "text")
        throw new Error("System messages must have exactly one text message part.");
      return {
        ..._,
        role: l,
        content: E,
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    default: {
      const C = l;
      throw new Error(`Unknown message role: ${C}`);
    }
  }
}, cl = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (s) => {
    const r = s.map((i) => ul(i, ll(), rf(!1, !1, !1, !1, void 0)));
    return {
      messages: r.map((i, l) => ({
        parentId: l > 0 ? r[l - 1].id : null,
        message: i
      }))
    };
  }
}, Ai = (s) => s.next ? Ai(s.next) : "current" in s ? s : null;
class Rm {
  func;
  _value = null;
  /**
   * @param func - The function that computes the cached value
   */
  constructor(r) {
    this.func = r;
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
class sf {
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
  updateLevels(r, i) {
    r.level = i;
    for (const l of r.children) {
      const c = this.messages.get(l);
      c && this.updateLevels(c, i + 1);
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
  performOp(r, i, l) {
    const c = i.prev ?? this.root, d = r ?? this.root;
    if (!(l === "relink" && c === d)) {
      if (l !== "link" && (c.children = c.children.filter((h) => h !== i.current.id), c.next === i)) {
        const h = c.children.at(-1), p = h ? this.messages.get(h) : null;
        if (p === void 0)
          throw new Error("MessageRepository(performOp/cut): Fallback sibling message not found. This is likely an internal bug in assistant-ui.");
        c.next = p;
      }
      if (l !== "cut") {
        for (let p = r; p; p = p.prev)
          if (p.current.id === i.current.id)
            throw new Error("MessageRepository(performOp/link): A message with the same id already exists in the parent tree. This error occurs if the same message id is found multiple times. This is likely an internal bug in assistant-ui.");
        d.children = [
          ...d.children,
          i.current.id
        ], (Ai(i) === this.head || d.next === null) && (d.next = i), i.prev = r;
        const h = r ? r.level + 1 : 0;
        this.updateLevels(i, h);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new Rm(() => {
    const r = new Array((this.head?.level ?? -1) + 1);
    for (let i = this.head; i; i = i.prev)
      r[i.level] = i.current;
    return r;
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
  getMessages(r) {
    if (r === void 0 || r === this.head?.current.id)
      return this._messages.value;
    const i = this.messages.get(r);
    if (!i)
      throw new Error("MessageRepository(getMessages): Head message not found. This is likely an internal bug in assistant-ui.");
    const l = new Array(i.level + 1);
    for (let c = i; c; c = c.prev)
      l[c.level] = c.current;
    return l;
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
  addOrUpdateMessage(r, i) {
    const l = this.messages.get(i.id), c = r ? this.messages.get(r) : null;
    if (c === void 0)
      throw new Error("MessageRepository(addOrUpdateMessage): Parent message not found. This is likely an internal bug in assistant-ui.");
    if (l) {
      l.current = i, this.performOp(c, l, "relink"), this._messages.dirty();
      return;
    }
    const d = {
      prev: c,
      current: i,
      next: null,
      children: [],
      level: c ? c.level + 1 : 0
    };
    this.messages.set(i.id, d), this.performOp(c, d, "link"), this.head === c && (this.head = d), this._messages.dirty();
  }
  /**
   * Gets a message and its parent ID by message ID.
   *
   * @param messageId - ID of the message to retrieve
   * @returns Object containing the message and its parent ID
   * @throws Error if the message is not found
   */
  getMessage(r) {
    const i = this.messages.get(r);
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
  appendOptimisticMessage(r, i) {
    let l;
    do
      l = wm();
    while (this.messages.has(l));
    return this.addOrUpdateMessage(r, ul(i, l, { type: "running" })), l;
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
  deleteMessage(r, i) {
    const l = this.messages.get(r);
    if (!l)
      throw new Error("MessageRepository(deleteMessage): Message not found. This is likely an internal bug in assistant-ui.");
    const c = i === void 0 ? l.prev : i === null ? null : this.messages.get(i);
    if (c === void 0)
      throw new Error("MessageRepository(deleteMessage): Replacement not found. This is likely an internal bug in assistant-ui.");
    for (const d of l.children) {
      const h = this.messages.get(d);
      if (!h)
        throw new Error("MessageRepository(deleteMessage): Child message not found. This is likely an internal bug in assistant-ui.");
      this.performOp(c, h, "relink");
    }
    this.performOp(null, l, "cut"), this.messages.delete(r), this.head === l && (this.head = Ai(c ?? this.root)), this._messages.dirty();
  }
  /**
   * Gets all branch IDs (sibling messages) at the level of a specified message.
   *
   * @param messageId - ID of the message to find branches for
   * @returns Array of message IDs representing branches
   * @throws Error if the message is not found
   */
  getBranches(r) {
    const i = this.messages.get(r);
    if (!i)
      throw new Error("MessageRepository(getBranches): Message not found. This is likely an internal bug in assistant-ui.");
    const { children: l } = i.prev ?? this.root;
    return l;
  }
  /**
   * Switches the active branch to the one containing the specified message.
   *
   * @param messageId - ID of the message in the branch to switch to
   * @throws Error if the branch is not found
   */
  switchToBranch(r) {
    const i = this.messages.get(r);
    if (!i)
      throw new Error("MessageRepository(switchToBranch): Branch not found. This is likely an internal bug in assistant-ui.");
    const l = i.prev ?? this.root;
    l.next = i, this.head = Ai(i), this._messages.dirty();
  }
  /**
   * Resets the head to a specific message or null.
   *
   * @param messageId - ID of the message to set as head, or null to clear the head
   * @throws Error if the message is not found
   */
  resetHead(r) {
    if (r === null) {
      this.clear();
      return;
    }
    const i = this.messages.get(r);
    if (!i)
      throw new Error("MessageRepository(resetHead): Branch not found. This is likely an internal bug in assistant-ui.");
    if (i.children.length > 0) {
      const l = (c) => {
        for (const d of c.children) {
          const h = this.messages.get(d);
          h && (l(h), this.messages.delete(d));
        }
      };
      l(i), i.children = [], i.next = null;
    }
    this.head = i;
    for (let l = i; l; l = l.prev)
      l.prev && (l.prev.next = l);
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
    const r = [];
    for (const [, i] of this.messages)
      r.push({
        message: i.current,
        parentId: i.prev?.current.id ?? null
      });
    return {
      headId: this.head?.current.id ?? null,
      messages: r
    };
  }
  /**
   * Imports repository state from an exported repository.
   *
   * @param repository - The exported repository state to import
   */
  import({ headId: r, messages: i }) {
    for (const { message: l, parentId: c } of i)
      this.addOrUpdateMessage(c, l);
    this.resetHead(r ?? i.at(-1)?.message.id ?? null);
  }
}
class $i {
  _subscriptions = /* @__PURE__ */ new Set();
  _connection;
  get isConnected() {
    return !!this._connection;
  }
  notifySubscribers() {
    for (const r of this._subscriptions)
      r();
  }
  _updateConnection() {
    if (this._subscriptions.size > 0) {
      if (this._connection)
        return;
      this._connection = this._connect();
    } else
      this._connection?.(), this._connection = void 0;
  }
  subscribe(r) {
    return this._subscriptions.add(r), this._updateConnection(), () => {
      this._subscriptions.delete(r), this._updateConnection();
    };
  }
}
const bt = /* @__PURE__ */ Symbol("skip-update");
class dl extends $i {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(r) {
    super(), this.binding = r;
  }
  _previousStateDirty = !0;
  _previousState;
  getState = () => {
    if (!this.isConnected || this._previousStateDirty) {
      const r = this.binding.getState();
      r !== bt && (this._previousState = r), this._previousStateDirty = !1;
    }
    if (this._previousState === void 0)
      throw new Error("Entry not available in the store");
    return this._previousState;
  };
  _connect() {
    const r = () => {
      this._previousStateDirty = !0, this.notifySubscribers();
    };
    return this.binding.subscribe(r);
  }
}
class Ii {
  _core;
  _threadListBinding;
  get path() {
    return this._core.path;
  }
  constructor(r, i) {
    this._core = r, this._threadListBinding = i, this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.switchTo = this.switchTo.bind(this), this.rename = this.rename.bind(this), this.archive = this.archive.bind(this), this.unarchive = this.unarchive.bind(this), this.delete = this.delete.bind(this), this.initialize = this.initialize.bind(this), this.generateTitle = this.generateTitle.bind(this), this.subscribe = this.subscribe.bind(this), this.unstable_on = this.unstable_on.bind(this), this.getState = this.getState.bind(this), this.detach = this.detach.bind(this);
  }
  getState() {
    return this._core.getState();
  }
  switchTo() {
    const r = this._core.getState();
    return this._threadListBinding.switchToThread(r.id);
  }
  rename(r) {
    const i = this._core.getState();
    return this._threadListBinding.rename(i.id, r);
  }
  archive() {
    const r = this._core.getState();
    return this._threadListBinding.archive(r.id);
  }
  unarchive() {
    const r = this._core.getState();
    return this._threadListBinding.unarchive(r.id);
  }
  delete() {
    const r = this._core.getState();
    return this._threadListBinding.delete(r.id);
  }
  initialize() {
    const r = this._core.getState();
    return this._threadListBinding.initialize(r.id);
  }
  generateTitle() {
    const r = this._core.getState();
    return this._threadListBinding.generateTitle(r.id);
  }
  unstable_on(r, i) {
    let l = this._core.getState().isMain, c = this._core.getState().id;
    return this.subscribe(() => {
      const d = this._core.getState(), h = d.isMain, p = d.id;
      l === h && c === p || (l = h, c = p, !(r === "switched-to" && !h) && (r === "switched-away" && h || i()));
    });
  }
  subscribe(r) {
    return this._core.subscribe(r);
  }
  detach() {
    const r = this._core.getState();
    this._threadListBinding.detach(r.id);
  }
  /** @internal */
  __internal_getRuntime() {
    return this;
  }
}
function Nm(s, r) {
  if (s === void 0 && r === void 0)
    return !0;
  if (s === void 0 || r === void 0)
    return !1;
  for (const i of Object.keys(s)) {
    const l = s[i], c = r[i];
    if (!Object.is(l, c))
      return !1;
  }
  return !0;
}
class Tt extends $i {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(r) {
    super(), this.binding = r;
    const i = r.getState();
    if (i === bt)
      throw new Error("Entry not available in the store");
    this._previousState = i;
  }
  _previousState;
  getState = () => (this.isConnected || this._syncState(), this._previousState);
  _syncState() {
    const r = this.binding.getState();
    return r === bt || Nm(r, this._previousState) ? !1 : (this._previousState = r, !0);
  }
  _connect() {
    const r = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(r);
  }
}
const cr = /* @__PURE__ */ Symbol("innerMessage"), Mm = (s) => s[cr], as = (s) => s.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class of {
  _core;
  get path() {
    return this._core.path;
  }
  constructor(r) {
    this._core = r, this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.getState = this.getState.bind(this), this.remove = this.remove.bind(this), this.subscribe = this.subscribe.bind(this);
  }
  getState() {
    return this._core.getState();
  }
  subscribe(r) {
    return this._core.subscribe(r);
  }
}
class af extends of {
  _composerApi;
  constructor(r, i) {
    super(r), this._composerApi = i;
  }
  remove() {
    const r = this._composerApi.getState();
    if (!r)
      throw new Error("Composer is not available");
    return r.removeAttachment(this.getState().id);
  }
}
class Am extends af {
  get source() {
    return "thread-composer";
  }
}
class Pm extends af {
  get source() {
    return "edit-composer";
  }
}
class jm extends of {
  get source() {
    return "message";
  }
  constructor(r) {
    super(r);
  }
  remove() {
    throw new Error("Message attachments cannot be removed");
  }
}
class lf extends $i {
  config;
  constructor(r) {
    super(), this.config = r;
  }
  getState() {
    return this.config.binding.getState();
  }
  outerSubscribe(r) {
    return this.config.binding.subscribe(r);
  }
  _connect() {
    const r = () => {
      this.notifySubscribers();
    };
    let i = this.config.binding.getState(), l = i?.unstable_on(this.config.event, r);
    const c = () => {
      const h = this.config.binding.getState();
      h !== i && (i = h, l?.(), l = this.config.binding.getState()?.unstable_on(this.config.event, r));
    }, d = this.outerSubscribe(c);
    return () => {
      d?.(), l?.();
    };
  }
}
const uf = Object.freeze([]), cf = Object.freeze({}), Lm = (s) => Object.freeze({
  type: "thread",
  isEditing: s?.isEditing ?? !1,
  canCancel: s?.canCancel ?? !1,
  isEmpty: s?.isEmpty ?? !0,
  attachments: s?.attachments ?? uf,
  text: s?.text ?? "",
  role: s?.role ?? "user",
  runConfig: s?.runConfig ?? cf,
  attachmentAccept: s?.attachmentAccept ?? "",
  dictation: s?.dictation,
  value: s?.text ?? ""
}), Om = (s) => Object.freeze({
  type: "edit",
  isEditing: s?.isEditing ?? !1,
  canCancel: s?.canCancel ?? !1,
  isEmpty: s?.isEmpty ?? !0,
  text: s?.text ?? "",
  role: s?.role ?? "user",
  attachments: s?.attachments ?? uf,
  runConfig: s?.runConfig ?? cf,
  attachmentAccept: s?.attachmentAccept ?? "",
  dictation: s?.dictation,
  value: s?.text ?? ""
});
class df {
  _core;
  get path() {
    return this._core.path;
  }
  constructor(r) {
    this._core = r;
  }
  __internal_bindMethods() {
    this.setText = this.setText.bind(this), this.setRunConfig = this.setRunConfig.bind(this), this.getState = this.getState.bind(this), this.subscribe = this.subscribe.bind(this), this.addAttachment = this.addAttachment.bind(this), this.reset = this.reset.bind(this), this.clearAttachments = this.clearAttachments.bind(this), this.send = this.send.bind(this), this.cancel = this.cancel.bind(this), this.setRole = this.setRole.bind(this), this.getAttachmentByIndex = this.getAttachmentByIndex.bind(this), this.startDictation = this.startDictation.bind(this), this.stopDictation = this.stopDictation.bind(this), this.unstable_on = this.unstable_on.bind(this);
  }
  setText(r) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    i.setText(r);
  }
  setRunConfig(r) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    i.setRunConfig(r);
  }
  addAttachment(r) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    return i.addAttachment(r);
  }
  reset() {
    const r = this._core.getState();
    if (!r)
      throw new Error("Composer is not available");
    return r.reset();
  }
  clearAttachments() {
    const r = this._core.getState();
    if (!r)
      throw new Error("Composer is not available");
    return r.clearAttachments();
  }
  send() {
    const r = this._core.getState();
    if (!r)
      throw new Error("Composer is not available");
    r.send();
  }
  cancel() {
    const r = this._core.getState();
    if (!r)
      throw new Error("Composer is not available");
    r.cancel();
  }
  setRole(r) {
    const i = this._core.getState();
    if (!i)
      throw new Error("Composer is not available");
    i.setRole(r);
  }
  startDictation() {
    const r = this._core.getState();
    if (!r)
      throw new Error("Composer is not available");
    r.startDictation();
  }
  stopDictation() {
    const r = this._core.getState();
    if (!r)
      throw new Error("Composer is not available");
    r.stopDictation();
  }
  subscribe(r) {
    return this._core.subscribe(r);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(r, i) {
    let l = this._eventSubscriptionSubjects.get(r);
    return l || (l = new lf({
      event: r,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(r, l)), l.subscribe(i);
  }
}
class zm extends df {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(r) {
    const i = new dl({
      path: r.path,
      getState: () => Lm(r.getState()),
      subscribe: (l) => r.subscribe(l)
    });
    super({
      path: r.path,
      getState: () => r.getState(),
      subscribe: (l) => i.subscribe(l)
    }), this._getState = i.getState.bind(i), this.__internal_bindMethods();
  }
  getState() {
    return this._getState();
  }
  getAttachmentByIndex(r) {
    return new Am(new Tt({
      path: {
        ...this.path,
        attachmentSource: "thread-composer",
        attachmentSelector: { type: "index", index: r },
        ref: `${this.path.ref}.attachments[${r}]`
      },
      getState: () => {
        const l = this.getState().attachments[r];
        return l ? {
          ...l,
          source: "thread-composer"
        } : bt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
class Dm extends df {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(r, i) {
    const l = new dl({
      path: r.path,
      getState: () => Om(r.getState()),
      subscribe: (c) => r.subscribe(c)
    });
    super({
      path: r.path,
      getState: () => r.getState(),
      subscribe: (c) => l.subscribe(c)
    }), this._beginEdit = i, this._getState = l.getState.bind(l), this.__internal_bindMethods();
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
  getAttachmentByIndex(r) {
    return new Pm(new Tt({
      path: {
        ...this.path,
        attachmentSource: "edit-composer",
        attachmentSelector: { type: "index", index: r },
        ref: `${this.path.ref}.attachments[${r}]`
      },
      getState: () => {
        const l = this.getState().attachments[r];
        return l ? {
          ...l,
          source: "edit-composer"
        } : bt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Id = /* @__PURE__ */ Symbol.for("aui.tool-response");
class ji {
  get [Id]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(r) {
    r.artifact !== void 0 && (this.artifact = r.artifact), this.result = r.result, this.isError = r.isError ?? !1;
  }
  static [Symbol.hasInstance](r) {
    return typeof r == "object" && r !== null && Id in r;
  }
  static toResponse(r) {
    return r instanceof ji ? r : new ji({
      result: r === void 0 ? "<no result>" : r
    });
  }
}
class Rd {
  contentBinding;
  messageApi;
  threadApi;
  get path() {
    return this.contentBinding.path;
  }
  constructor(r, i, l) {
    this.contentBinding = r, this.messageApi = i, this.threadApi = l, this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.addToolResult = this.addToolResult.bind(this), this.resumeToolCall = this.resumeToolCall.bind(this), this.getState = this.getState.bind(this), this.subscribe = this.subscribe.bind(this);
  }
  getState() {
    return this.contentBinding.getState();
  }
  addToolResult(r) {
    const i = this.contentBinding.getState();
    if (!i)
      throw new Error("Message part is not available");
    if (i.type !== "tool-call")
      throw new Error("Tried to add tool result to non-tool message part");
    if (!this.messageApi)
      throw new Error("Message API is not available. This is likely a bug in assistant-ui.");
    if (!this.threadApi)
      throw new Error("Thread API is not available");
    const l = this.messageApi.getState();
    if (!l)
      throw new Error("Message is not available");
    const c = i.toolName, d = i.toolCallId, h = ji.toResponse(r);
    this.threadApi.getState().addToolResult({
      messageId: l.id,
      toolName: c,
      toolCallId: d,
      result: h.result,
      artifact: h.artifact,
      isError: h.isError
    });
  }
  resumeToolCall(r) {
    const i = this.contentBinding.getState();
    if (!i)
      throw new Error("Message part is not available");
    if (i.type !== "tool-call")
      throw new Error("Tried to resume tool call on non-tool message part");
    if (!this.threadApi)
      throw new Error("Thread API is not available");
    const l = i.toolCallId;
    this.threadApi.getState().resumeToolCall({
      toolCallId: l,
      payload: r
    });
  }
  subscribe(r) {
    return this.contentBinding.subscribe(r);
  }
}
class Li extends $i {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(r) {
    super(), this.binding = r;
  }
  getState() {
    return this.binding.getState();
  }
  outerSubscribe(r) {
    return this.binding.subscribe(r);
  }
  _connect() {
    const r = () => {
      this.notifySubscribers();
    };
    let i = this.binding.getState(), l = i?.subscribe(r);
    const c = () => {
      const h = this.binding.getState();
      h !== i && (i = h, l?.(), l = this.binding.getState()?.subscribe(r), r());
    }, d = this.outerSubscribe(c);
    return () => {
      d?.(), l?.();
    };
  }
}
const Ri = Object.freeze({
  type: "complete"
}), Bm = (s, r, i) => {
  if (s.role !== "assistant")
    return Ri;
  if (i.type === "tool-call")
    return i.result ? Ri : s.status;
  const l = r === Math.max(0, s.content.length - 1);
  return s.status.type === "requires-action" ? Ri : l ? s.status : Ri;
}, Nd = (s, r) => {
  const i = s.content[r];
  if (!i)
    return bt;
  const l = Bm(s, r, i);
  return Object.freeze({
    ...i,
    [cr]: i[cr],
    status: l
  });
};
class Fm {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(r, i) {
    this._core = r, this._threadBinding = i, this.composer = new Dm(new Li({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.composer`,
        composerSource: "edit"
      },
      getState: this._getEditComposerRuntimeCore,
      subscribe: (l) => this._threadBinding.subscribe(l)
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
  reload(r = {}) {
    const i = this._getEditComposerRuntimeCore(), l = i ?? this._threadBinding.getState().composer, c = i ?? l, { runConfig: d = c.runConfig } = r, h = this._core.getState();
    if (h.role !== "assistant")
      throw new Error("Can only reload assistant messages");
    this._threadBinding.getState().startRun({
      parentId: h.parentId,
      sourceId: h.id,
      runConfig: d
    });
  }
  speak() {
    const r = this._core.getState();
    return this._threadBinding.getState().speak(r.id);
  }
  stopSpeaking() {
    const r = this._core.getState();
    if (this._threadBinding.getState().speech?.messageId === r.id)
      this._threadBinding.getState().stopSpeaking();
    else
      throw new Error("Message is not being spoken");
  }
  submitFeedback({ type: r }) {
    const i = this._core.getState();
    this._threadBinding.getState().submitFeedback({
      messageId: i.id,
      type: r
    });
  }
  switchToBranch({ position: r, branchId: i }) {
    const l = this._core.getState();
    if (i && r)
      throw new Error("May not specify both branchId and position");
    if (!i && !r)
      throw new Error("Must specify either branchId or position");
    const d = this._threadBinding.getState().getBranches(l.id);
    let h = i;
    if (r === "previous" ? h = d[l.branchNumber - 2] : r === "next" && (h = d[l.branchNumber]), !h)
      throw new Error("Branch not found");
    this._threadBinding.getState().switchToBranch(h);
  }
  unstable_getCopyText() {
    return as(this.getState());
  }
  subscribe(r) {
    return this._core.subscribe(r);
  }
  getMessagePartByIndex(r) {
    if (r < 0)
      throw new Error("Message part index must be >= 0");
    return new Rd(new Tt({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${r}]`,
        messagePartSelector: { type: "index", index: r }
      },
      getState: () => Nd(this.getState(), r),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(r) {
    return new Rd(new Tt({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(r)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: r }
      },
      getState: () => {
        const i = this._core.getState(), l = i.content.findIndex((c) => c.type === "tool-call" && c.toolCallId === r);
        return l === -1 ? bt : Nd(i, l);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(r) {
    return new jm(new Tt({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.attachments[${r}]`,
        attachmentSource: "message",
        attachmentSelector: { type: "index", index: r }
      },
      getState: () => {
        const l = this.getState().attachments?.[r];
        return l ? {
          ...l,
          source: "message"
        } : bt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }));
  }
}
const Um = (s) => ({
  parentId: s.parentId ?? null,
  sourceId: s.sourceId ?? null,
  runConfig: s.runConfig ?? {},
  ...s.stream ? { stream: s.stream } : {}
}), $m = (s) => ({
  parentId: s.parentId ?? null,
  sourceId: s.sourceId ?? null,
  runConfig: s.runConfig ?? {}
}), Hm = (s, r) => typeof r == "string" ? {
  createdAt: /* @__PURE__ */ new Date(),
  parentId: s.at(-1)?.id ?? null,
  sourceId: null,
  runConfig: {},
  role: "user",
  content: [{ type: "text", text: r }],
  attachments: [],
  metadata: { custom: {} }
} : {
  createdAt: r.createdAt ?? /* @__PURE__ */ new Date(),
  parentId: r.parentId ?? s.at(-1)?.id ?? null,
  sourceId: r.sourceId ?? null,
  role: r.role ?? "user",
  content: r.content,
  attachments: r.attachments ?? [],
  metadata: r.metadata ?? { custom: {} },
  runConfig: r.runConfig ?? {},
  startRun: r.startRun
}, Vm = (s, r) => {
  const i = s.messages.at(-1);
  return Object.freeze({
    threadId: r.id,
    metadata: r,
    capabilities: s.capabilities,
    isDisabled: s.isDisabled,
    isLoading: s.isLoading,
    isRunning: i?.role !== "assistant" ? !1 : i.status.type === "running",
    messages: s.messages,
    state: s.state,
    suggestions: s.suggestions,
    extras: s.extras,
    speech: s.speech
  });
};
class Wm {
  get path() {
    return this._threadBinding.path;
  }
  get __internal_threadBinding() {
    return this._threadBinding;
  }
  _threadBinding;
  constructor(r, i) {
    const l = new Tt({
      path: r.path,
      getState: () => Vm(r.getState(), i.getState()),
      subscribe: (c) => {
        const d = r.subscribe(c), h = i.subscribe(c);
        return () => {
          d(), h();
        };
      }
    });
    this._threadBinding = {
      path: r.path,
      getState: () => r.getState(),
      getStateState: () => l.getState(),
      outerSubscribe: (c) => r.outerSubscribe(c),
      subscribe: (c) => r.subscribe(c)
    }, this.composer = new zm(new Li({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.composer`,
        composerSource: "thread"
      },
      getState: () => this._threadBinding.getState().composer,
      subscribe: (c) => this._threadBinding.subscribe(c)
    })), this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.append = this.append.bind(this), this.unstable_resumeRun = this.unstable_resumeRun.bind(this), this.unstable_loadExternalState = this.unstable_loadExternalState.bind(this), this.startRun = this.startRun.bind(this), this.cancelRun = this.cancelRun.bind(this), this.stopSpeaking = this.stopSpeaking.bind(this), this.export = this.export.bind(this), this.import = this.import.bind(this), this.reset = this.reset.bind(this), this.getMessageByIndex = this.getMessageByIndex.bind(this), this.getMessageById = this.getMessageById.bind(this), this.subscribe = this.subscribe.bind(this), this.unstable_on = this.unstable_on.bind(this), this.getModelContext = this.getModelContext.bind(this), this.getModelConfig = this.getModelConfig.bind(this), this.getState = this.getState.bind(this);
  }
  composer;
  getState() {
    return this._threadBinding.getStateState();
  }
  append(r) {
    this._threadBinding.getState().append(Hm(this._threadBinding.getState().messages, r));
  }
  subscribe(r) {
    return this._threadBinding.subscribe(r);
  }
  getModelContext() {
    return this._threadBinding.getState().getModelContext();
  }
  getModelConfig() {
    return this.getModelContext();
  }
  startRun(r) {
    const i = r === null || typeof r == "string" ? { parentId: r } : r;
    return this._threadBinding.getState().startRun($m(i));
  }
  unstable_resumeRun(r) {
    return this._threadBinding.getState().resumeRun(Um(r));
  }
  unstable_loadExternalState(r) {
    this._threadBinding.getState().unstable_loadExternalState(r);
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
  import(r) {
    this._threadBinding.getState().import(r);
  }
  reset(r) {
    this._threadBinding.getState().reset(r);
  }
  getMessageByIndex(r) {
    if (r < 0)
      throw new Error("Message index must be >= 0");
    return this._getMessageRuntime({
      ...this.path,
      ref: `${this.path.ref}${this.path.ref}.messages[${r}]`,
      messageSelector: { type: "index", index: r }
    }, () => {
      const i = this._threadBinding.getState().messages, l = i[r];
      if (l)
        return {
          message: l,
          parentId: i[r - 1]?.id ?? null,
          index: r
        };
    });
  }
  getMessageById(r) {
    return this._getMessageRuntime({
      ...this.path,
      ref: this.path.ref + `${this.path.ref}.messages[messageId=${JSON.stringify(r)}]`,
      messageSelector: { type: "messageId", messageId: r }
    }, () => this._threadBinding.getState().getMessageById(r));
  }
  _getMessageRuntime(r, i) {
    return new Fm(new Tt({
      path: r,
      getState: () => {
        const { message: l, parentId: c, index: d } = i() ?? {}, { messages: h, speech: p } = this._threadBinding.getState();
        if (!l || c === void 0 || d === void 0)
          return bt;
        const _ = this._threadBinding.getState().getBranches(l.id), E = l.metadata.submittedFeedback;
        return {
          ...l,
          [cr]: l[cr],
          index: d,
          isLast: h.at(-1)?.id === l.id,
          parentId: c,
          branchNumber: _.indexOf(l.id) + 1,
          branchCount: _.length,
          speech: p?.messageId === l.id ? p : void 0,
          submittedFeedback: E
        };
      },
      subscribe: (l) => this._threadBinding.subscribe(l)
    }), this._threadBinding);
  }
  _eventSubscriptionSubjects = /* @__PURE__ */ new Map();
  unstable_on(r, i) {
    let l = this._eventSubscriptionSubjects.get(r);
    return l || (l = new lf({
      event: r,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(r, l)), l.subscribe(i);
  }
}
const Ym = (s) => ({
  mainThreadId: s.mainThreadId,
  newThread: s.newThreadId,
  threads: s.threadIds,
  archivedThreads: s.archivedThreadIds,
  isLoading: s.isLoading,
  threadItems: s.threadData
}), Ni = (s, r) => {
  if (r === void 0)
    return bt;
  const i = s.getItemById(r);
  return i ? {
    id: i.id,
    threadId: i.id,
    // TODO remove in 0.12.0
    remoteId: i.remoteId,
    externalId: i.externalId,
    title: i.title,
    status: i.status,
    isMain: i.id === s.mainThreadId
  } : bt;
};
class Qm {
  _core;
  _runtimeFactory;
  _getState;
  constructor(r, i = Wm) {
    this._core = r, this._runtimeFactory = i;
    const l = new dl({
      path: {},
      getState: () => Ym(r),
      subscribe: (c) => r.subscribe(c)
    });
    this._getState = l.getState.bind(l), this._mainThreadListItemRuntime = new Ii(new Tt({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => Ni(this._core, this._core.mainThreadId),
      subscribe: (c) => this._core.subscribe(c)
    }), this._core), this.main = new i(new Li({
      path: {
        ref: "threads.main",
        threadSelector: { type: "main" }
      },
      getState: () => r.getMainThreadRuntimeCore(),
      subscribe: (c) => r.subscribe(c)
    }), this._mainThreadListItemRuntime), this.__internal_bindMethods();
  }
  __internal_bindMethods() {
    this.switchToThread = this.switchToThread.bind(this), this.switchToNewThread = this.switchToNewThread.bind(this), this.getState = this.getState.bind(this), this.subscribe = this.subscribe.bind(this), this.getById = this.getById.bind(this), this.getItemById = this.getItemById.bind(this), this.getItemByIndex = this.getItemByIndex.bind(this), this.getArchivedItemByIndex = this.getArchivedItemByIndex.bind(this);
  }
  switchToThread(r) {
    return this._core.switchToThread(r);
  }
  switchToNewThread() {
    return this._core.switchToNewThread();
  }
  getState() {
    return this._getState();
  }
  subscribe(r) {
    return this._core.subscribe(r);
  }
  _mainThreadListItemRuntime;
  main;
  get mainItem() {
    return this._mainThreadListItemRuntime;
  }
  getById(r) {
    return new this._runtimeFactory(new Li({
      path: {
        ref: `threads[threadId=${JSON.stringify(r)}]`,
        threadSelector: { type: "threadId", threadId: r }
      },
      getState: () => this._core.getThreadRuntimeCore(r),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(r) {
    return new Ii(new Tt({
      path: {
        ref: `threadItems[${r}]`,
        threadSelector: { type: "index", index: r }
      },
      getState: () => Ni(this._core, this._core.threadIds[r]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(r) {
    return new Ii(new Tt({
      path: {
        ref: `archivedThreadItems[${r}]`,
        threadSelector: { type: "archiveIndex", index: r }
      },
      getState: () => Ni(this._core, this._core.archivedThreadIds[r]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(r) {
    return new Ii(new Tt({
      path: {
        ref: `threadItems[threadId=${r}]`,
        threadSelector: { type: "threadId", threadId: r }
      },
      getState: () => Ni(this._core, r),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Gm = I.createContext(null), Km = () => I.useContext(Gm), Nn = Object.freeze([]), jn = "DEFAULT_THREAD_ID", Jm = Object.freeze([jn]), ff = Object.freeze({
  id: jn,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), qm = Promise.resolve(), Md = Object.freeze({
  [jn]: ff
});
class Xm {
  adapter;
  threadFactory;
  _mainThreadId = jn;
  _threads = Jm;
  _archivedThreads = Nn;
  _threadData = Md;
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
    return qm;
  }
  _mainThread;
  get mainThreadId() {
    return this._mainThreadId;
  }
  constructor(r = {}, i) {
    this.adapter = r, this.threadFactory = i, this._mainThread = this.threadFactory(), this.__internal_setAdapter(r, !0);
  }
  getMainThreadRuntimeCore() {
    return this._mainThread;
  }
  getThreadRuntimeCore() {
    throw new Error("Method not implemented.");
  }
  getItemById(r) {
    for (const i of this.adapter.threads ?? [])
      if (i.id === r)
        return i;
    for (const i of this.adapter.archivedThreads ?? [])
      if (i.id === r)
        return i;
    if (r === jn)
      return ff;
  }
  __internal_setAdapter(r, i = !1) {
    const l = this.adapter;
    this.adapter = r;
    const c = r.threadId ?? jn, d = r.threads ?? Nn, h = r.archivedThreads ?? Nn, p = l.threadId ?? jn, m = l.threads ?? Nn, _ = l.archivedThreads ?? Nn;
    !i && p === c && m === d && _ === h || (this._threadData = {
      ...Md,
      ...Object.fromEntries(r.threads?.map((E) => [
        E.id,
        {
          ...E,
          remoteId: E.remoteId,
          externalId: E.externalId,
          status: "regular"
        }
      ]) ?? []),
      ...Object.fromEntries(r.archivedThreads?.map((E) => [
        E.id,
        {
          ...E,
          remoteId: E.remoteId,
          externalId: E.externalId,
          status: "archived"
        }
      ]) ?? [])
    }, m !== d && (this._threads = this.adapter.threads?.map((E) => E.id) ?? Nn), _ !== h && (this._archivedThreads = this.adapter.archivedThreads?.map((E) => E.id) ?? Nn), p !== c && (this._mainThreadId = c, this._mainThread = this.threadFactory()), this._notifySubscribers());
  }
  async switchToThread(r) {
    if (this._mainThreadId === r)
      return;
    const i = this.adapter.onSwitchToThread;
    if (!i)
      throw new Error("External store adapter does not support switching to thread");
    i(r);
  }
  async switchToNewThread() {
    const r = this.adapter.onSwitchToNewThread;
    if (!r)
      throw new Error("External store adapter does not support switching to new thread");
    r();
  }
  async rename(r, i) {
    const l = this.adapter.onRename;
    if (!l)
      throw new Error("External store adapter does not support renaming");
    l(r, i);
  }
  async detach() {
  }
  async archive(r) {
    const i = this.adapter.onArchive;
    if (!i)
      throw new Error("External store adapter does not support archiving");
    i(r);
  }
  async unarchive(r) {
    const i = this.adapter.onUnarchive;
    if (!i)
      throw new Error("External store adapter does not support unarchiving");
    i(r);
  }
  async delete(r) {
    const i = this.adapter.onDelete;
    if (!i)
      throw new Error("External store adapter does not support deleting");
    i(r);
  }
  initialize(r) {
    return Promise.resolve({ remoteId: r, externalId: void 0 });
  }
  generateTitle() {
    throw new Error("Method not implemented.");
  }
  _subscriptions = /* @__PURE__ */ new Set();
  subscribe(r) {
    return this._subscriptions.add(r), () => this._subscriptions.delete(r);
  }
  _notifySubscribers() {
    for (const r of this._subscriptions)
      r();
  }
}
class Ad {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(r, i) {
    return r.map((l, c) => {
      const d = this.cache.get(l), h = i(d, l, c);
      return this.cache.set(l, h), h;
    });
  }
}
class Zm extends nf {
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
  constructor(r, i, { parentId: l, message: c }) {
    super(), this.runtime = r, this.endEditCallback = i, this._parentId = l, this._sourceId = c.id, this._previousText = as(c), this.setText(this._previousText), this.setRole(c.role), this.setAttachments(c.attachments ?? []), this._nonTextParts = c.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...r.composer.runConfig });
  }
  async handleSend(r) {
    as(r) !== this._previousText && this.runtime.append({
      ...r,
      content: [...r.content, ...this._nonTextParts],
      parentId: this._parentId,
      sourceId: this._sourceId
    }), this.handleCancel();
  }
  handleCancel() {
    this.endEditCallback(), this._notifySubscribers();
  }
}
class eg {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new sf();
  get messages() {
    return this.repository.getMessages();
  }
  get state() {
    let r;
    for (const i of this.messages)
      if (i.role === "assistant") {
        r = i;
        break;
      }
    return r?.metadata.unstable_state ?? null;
  }
  composer = new vm(this);
  constructor(r) {
    this._contextProvider = r;
  }
  getModelContext() {
    return this._contextProvider.getModelContext();
  }
  _editComposers = /* @__PURE__ */ new Map();
  getEditComposer(r) {
    return this._editComposers.get(r);
  }
  beginEdit(r) {
    if (this._editComposers.has(r))
      throw new Error("Edit already in progress");
    this._editComposers.set(r, new Zm(this, () => this._editComposers.delete(r), this.repository.getMessage(r))), this._notifySubscribers();
  }
  getMessageById(r) {
    try {
      return this.repository.getMessage(r);
    } catch {
      return;
    }
  }
  getBranches(r) {
    return this.repository.getBranches(r);
  }
  switchToBranch(r) {
    this.repository.switchToBranch(r), this._notifySubscribers();
  }
  _notifySubscribers() {
    for (const r of this._subscriptions)
      r();
  }
  _notifyEventSubscribers(r) {
    const i = this._eventSubscribers.get(r);
    if (i)
      for (const l of i)
        l();
  }
  subscribe(r) {
    return this._subscriptions.add(r), () => this._subscriptions.delete(r);
  }
  submitFeedback({ messageId: r, type: i }) {
    const l = this.adapters?.feedback;
    if (!l)
      throw new Error("Feedback adapter not configured");
    const { message: c, parentId: d } = this.repository.getMessage(r);
    if (l.submit({ message: c, type: i }), c.role === "assistant") {
      const h = {
        ...c,
        metadata: {
          ...c.metadata,
          submittedFeedback: { type: i }
        }
      };
      this.repository.addOrUpdateMessage(d, h);
    }
    this._notifySubscribers();
  }
  _stopSpeaking;
  speech;
  speak(r) {
    const i = this.adapters?.speech;
    if (!i)
      throw new Error("Speech adapter not configured");
    const { message: l } = this.repository.getMessage(r);
    this._stopSpeaking?.();
    const c = i.speak(as(l)), d = c.subscribe(() => {
      c.status.type === "ended" ? (this._stopSpeaking = void 0, this.speech = void 0) : this.speech = { messageId: r, status: c.status }, this._notifySubscribers();
    });
    this.speech = { messageId: r, status: c.status }, this._notifySubscribers(), this._stopSpeaking = () => {
      c.cancel(), d(), this.speech = void 0, this._stopSpeaking = void 0;
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
  import(r) {
    this.ensureInitialized(), this.repository.clear(), this.repository.import(r), this._notifySubscribers();
  }
  reset(r) {
    this.import(cl.fromArray(r ?? []));
  }
  _eventSubscribers = /* @__PURE__ */ new Map();
  unstable_on(r, i) {
    if (r === "model-context-update")
      return this._contextProvider.subscribe?.(i) ?? (() => {
      });
    const l = this._eventSubscribers.get(r);
    return l ? l.add(i) : this._eventSubscribers.set(r, /* @__PURE__ */ new Set([i])), () => {
      this._eventSubscribers.get(r).delete(i);
    };
  }
}
const tg = Object.freeze([]), ng = (s, r) => s && r[r.length - 1]?.role !== "assistant";
class rg extends eg {
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
  _converter = new Ad();
  _store;
  beginEdit(r) {
    if (!this._store.onEdit)
      throw new Error("Runtime does not support editing.");
    super.beginEdit(r);
  }
  constructor(r, i) {
    super(r), this.__internal_setAdapter(i);
  }
  __internal_setAdapter(r) {
    if (this._store === r)
      return;
    const i = r.isRunning ?? !1;
    this.isDisabled = r.isDisabled ?? !1;
    const l = this._store;
    this._store = r, this.extras = r.extras, this.suggestions = r.suggestions ?? tg, this._capabilities = {
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
    let c;
    if (r.messageRepository) {
      if (l && l.isRunning === r.isRunning && l.messageRepository === r.messageRepository) {
        this._notifySubscribers();
        return;
      }
      this.repository.clear(), this._assistantOptimisticId = null, this.repository.import(r.messageRepository), c = this.repository.getMessages();
    } else if (r.messages) {
      if (l) {
        if (l.convertMessage !== r.convertMessage)
          this._converter = new Ad();
        else if (l.isRunning === r.isRunning && l.messages === r.messages) {
          this._notifySubscribers();
          return;
        }
      }
      c = r.convertMessage ? this._converter.convertMessages(r.messages, (d, h, p) => {
        if (!r.convertMessage)
          return h;
        const m = p === (r.messages?.length ?? 0) - 1, _ = rf(m, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !km(d.status) || d.status === _))
          return d;
        const E = r.convertMessage(h, p), b = ul(E, p.toString(), _);
        return b[cr] = h, b;
      }) : r.messages;
      for (let d = 0; d < c.length; d++) {
        const h = c[d], p = c[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, h);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    c.length > 0 && this.ensureInitialized(), (l?.isRunning ?? !1) !== (r.isRunning ?? !1) && (r.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), ng(i, c) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(c.at(-1)?.id ?? null, {
      role: "assistant",
      content: []
    })), this.repository.resetHead(this._assistantOptimisticId ?? c.at(-1)?.id ?? null), this._messages = this.repository.getMessages(), this._notifySubscribers();
  }
  switchToBranch(r) {
    if (!this._store.setMessages)
      throw new Error("Runtime does not support switching branches.");
    this._store.isRunning || (this.repository.switchToBranch(r), this.updateMessages(this.repository.getMessages()));
  }
  async append(r) {
    if (r.parentId !== (this.messages.at(-1)?.id ?? null)) {
      if (!this._store.onEdit)
        throw new Error("Runtime does not support editing messages.");
      await this._store.onEdit(r);
    } else
      await this._store.onNew(r);
  }
  async startRun(r) {
    if (!this._store.onReload)
      throw new Error("Runtime does not support reloading messages.");
    await this._store.onReload(r.parentId, r);
  }
  async resumeRun(r) {
    if (!this._store.onResume)
      throw new Error("Runtime does not support resuming runs.");
    await this._store.onResume(r);
  }
  unstable_loadExternalState(r) {
    if (!this._store.onLoadExternalState)
      throw new Error("Runtime does not support importing states.");
    this._store.onLoadExternalState(r);
  }
  cancelRun() {
    if (!this._store.onCancel)
      throw new Error("Runtime does not support cancelling runs.");
    this._store.onCancel(), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null);
    let r = this.repository.getMessages();
    const i = r[r.length - 1];
    i?.role === "user" && i.id === r.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(as(i)), r = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
      this.updateMessages(r);
    }, 0);
  }
  addToolResult(r) {
    if (!this._store.onAddToolResult && !this._store.onAddToolResult)
      throw new Error("Runtime does not support tool results.");
    this._store.onAddToolResult?.(r);
  }
  resumeToolCall(r) {
    if (!this._store.onResumeToolCall)
      throw new Error("Runtime does not support resuming tool calls.");
    this._store.onResumeToolCall(r);
  }
  reset(r) {
    const i = new sf();
    i.import(cl.fromArray(r ?? [])), this.updateMessages(i.getMessages());
  }
  import(r) {
    this._assistantOptimisticId = null, super.import(r), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (r) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(r.flatMap(Mm).filter((l) => l != null)) : this._store.setMessages?.(r);
  };
}
const Pd = (s) => s.adapters?.threadList ?? {};
class sg extends mm {
  threads;
  constructor(r) {
    super(), this.threads = new Xm(Pd(r), () => new rg(this._contextProvider, r));
  }
  setAdapter(r) {
    this.threads.__internal_setAdapter(Pd(r)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(r);
  }
}
const ig = (s) => {
  const [r] = I.useState(() => new sg(s));
  I.useEffect(() => {
    r.setAdapter(s);
  });
  const { modelContext: i } = Km() ?? {};
  return I.useEffect(() => {
    if (i)
      return r.registerModelContextProvider(i);
  }, [i, r]), I.useMemo(() => new cy(r), [r]);
};
function og(s, r) {
  s.commitTasks.forEach((i) => {
    const l = i.cellIndex, c = r.cells[l];
    if (c.type !== "effect")
      throw new Error("Cannot find effect cell");
    let d = !0;
    if (c.deps !== void 0 && i.deps !== void 0 && (d = c.deps.length !== i.deps.length || c.deps.some((h, p) => !Object.is(h, i.deps[p]))), d) {
      if (c.mounted) {
        if (typeof c.deps != typeof i.deps)
          throw new Error("tapEffect called with and without dependencies across re-renders");
        try {
          c.mounted && c.cleanup && c.cleanup();
        } finally {
          c.mounted = !1;
        }
      }
      const h = i.effect();
      if (h !== void 0 && typeof h != "function")
        throw new Error(`An effect function must either return a cleanup function or nothing. Received: ${typeof h}`);
      c.mounted = !0, c.cleanup = typeof h == "function" ? h : void 0, c.deps = i.deps;
    }
  });
}
function ag(s) {
  let r = null;
  for (let i = s.cells.length - 1; i >= 0; i--) {
    const l = s.cells[i];
    if (l?.type === "effect" && l.mounted && l.cleanup)
      try {
        l.cleanup();
      } catch (c) {
        r == null && (r = c);
      } finally {
        l.mounted = !1;
      }
  }
  if (r != null)
    throw r;
}
let ns = null;
function lg(s, r) {
  s.currentIndex = 0;
  const i = ns;
  ns = s;
  try {
    if (r(), s.isFirstRender = !1, s.cells.length !== s.currentIndex)
      throw new Error(`Rendered ${s.currentIndex} hooks but expected ${s.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    ns = i;
  }
}
function fl() {
  if (!ns)
    throw new Error("No resource fiber available");
  return ns;
}
function hf(s, r) {
  const i = s[pf];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(r);
}
const pf = /* @__PURE__ */ Symbol("fnSymbol");
function Hi(s, r) {
  return {
    resource: s,
    scheduleRerender: r,
    cells: [],
    currentIndex: 0,
    renderContext: void 0,
    isFirstRender: !0,
    isMounted: !1,
    isNeverMounted: !0
  };
}
function ls(s) {
  s.isMounted = !1, ag(s);
}
function us(s, r) {
  const i = {
    commitTasks: [],
    props: r,
    state: void 0
  };
  return lg(s, () => {
    s.renderContext = i;
    try {
      i.state = hf(s.resource, r);
    } finally {
      s.renderContext = void 0;
    }
  }), i;
}
function cs(s, r) {
  s.isMounted = !0, s.isNeverMounted = !1, og(r, s);
}
const ug = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, jd = ug ? I.useEffect : I.useLayoutEffect;
function hl(s) {
  const [, r] = I.useState({}), i = I.useMemo(() => Hi(s.type, () => r({})), [s.type]), l = us(i, s.props);
  return jd(() => () => ls(i), [i]), jd(() => {
    cs(i, l);
  }), l.state;
}
const Vi = (s) => typeof s == "string" ? {
  scope: s.split(".")[0],
  event: s
} : {
  scope: s.scope,
  event: s.event
}, rs = (s, r, i) => r === s;
let lr;
const Ka = () => {
  if (lr)
    return lr;
  const s = () => ({
    apis: /* @__PURE__ */ new Map(),
    nextId: 0,
    listeners: /* @__PURE__ */ new Set()
  });
  if (typeof window > "u")
    return lr = s(), lr;
  const r = window.__ASSISTANT_UI_DEVTOOLS_HOOK__;
  if (r)
    return lr = r, r;
  const i = s();
  return window.__ASSISTANT_UI_DEVTOOLS_HOOK__ = i, lr = i, i;
};
class An {
  static MAX_EVENT_LOGS_PER_API = 200;
  static register(r) {
    const i = Ka();
    for (const p of i.apis.values())
      if (p.api === r)
        return () => {
        };
    const l = i.nextId++, c = {
      api: r,
      logs: []
    }, d = r.on?.("*", (p) => {
      const m = i.apis.get(l);
      m && (m.logs.push({
        time: /* @__PURE__ */ new Date(),
        event: p.event,
        data: p.payload
      }), m.logs.length > An.MAX_EVENT_LOGS_PER_API && (m.logs = m.logs.slice(-200)), An.notifyListeners(l));
    }), h = r.subscribe?.(() => {
      An.notifyListeners(l);
    });
    return i.apis.set(l, c), An.notifyListeners(l), () => {
      const p = Ka();
      p.apis.get(l) && (d?.(), h?.(), p.apis.delete(l), An.notifyListeners(l));
    };
  }
  static notifyListeners(r) {
    Ka().listeners.forEach((l) => l(r));
  }
}
function xe(s) {
  const r = (i) => ({
    type: r,
    props: i
  });
  return r[pf] = s, r;
}
const cg = (s) => {
  if (s.renderContext)
    throw new Error("Resource updated during render");
  if (s.isMounted)
    s.scheduleRerender();
  else if (s.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function dg(s) {
  const r = fl(), i = r.currentIndex++;
  if (!r.isFirstRender && i >= r.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!r.cells[i]) {
    const d = {
      type: "state",
      value: typeof s == "function" ? s() : s,
      set: (h) => {
        const p = d.value, m = typeof h == "function" ? h(p) : h;
        Object.is(p, m) || (d.value = m, cg(r));
      }
    };
    r.cells[i] = d;
  }
  const l = r.cells[i];
  if (l.type !== "state")
    throw new Error("Hook order changed between renders");
  return l;
}
function Ot(s) {
  const r = dg(s);
  return [r.value, r.set];
}
function fg() {
  const s = fl(), r = s.currentIndex++;
  if (!s.isFirstRender && r >= s.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!s.cells[r]) {
    const l = {
      type: "effect",
      mounted: !1
    };
    s.cells[r] = l;
  }
  if (s.cells[r].type !== "effect")
    throw new Error("Hook order changed between renders");
  return r;
}
function Ke(s, r) {
  const i = fl(), l = fg();
  i.renderContext.commitTasks.push({
    effect: s,
    deps: r,
    cellIndex: l
  });
}
function dr(s) {
  const [r] = Ot(() => ({
    current: s
  }));
  return r;
}
const hg = (s, r) => {
  if (s.length !== r.length)
    return !1;
  for (let i = 0; i < s.length; i++)
    if (!Object.is(s[i], r[i]))
      return !1;
  return !0;
}, le = (s, r) => {
  const i = dr();
  return i.current || (i.current = { value: s(), deps: r }), hg(i.current.deps, r) || (i.current.value = s(), i.current.deps = r), i.current.value;
}, pg = (s, r) => le(() => s, r);
function ss(s, r) {
  const [i, l] = Ot({}), c = le(() => Hi(s.type, () => l({})), [s.type]), d = r ? le(() => s.props, r) : s.props, h = le(() => us(c, d), [c, d, i]);
  return Ke(() => () => ls(c), [c]), Ke(() => {
    cs(c, h);
  }, [c, h]), h.state;
}
function zt(s) {
  return hf(s.type, s.props);
}
function mf(s, r, i) {
  const [l, c] = Ot(0), d = pg(() => c((_) => _ + 1), []), [h] = Ot(() => /* @__PURE__ */ new Map()), p = le(() => r, i), m = le(() => {
    const _ = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const E in s) {
      const b = s[E], C = p(b, E);
      let R = h.get(E);
      (!R || R.resource !== C.type) && (R && _.remove.push(E), R = Hi(C.type, d), _.add.push([E, R]));
      const z = us(R, C.props);
      _.commit.push([E, z]), _.return[E] = z.state;
    }
    if (h.size > _.commit.length - _.add.length + _.remove.length)
      for (const E of h.keys())
        E in s || _.remove.push(E);
    return _;
  }, [s, p, l]);
  return Ke(() => () => {
    for (const _ of h.keys())
      ls(h.get(_)), h.delete(_);
  }, []), Ke(() => {
    for (const _ of m.remove)
      ls(h.get(_)), h.delete(_);
    for (const [_, E] of m.add)
      h.set(_, E);
    for (const [_, E] of m.commit)
      cs(h.get(_), E);
  }, [m]), m.return;
}
const mg = 50;
let Lt = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class gg {
  _task;
  _isDirty = !1;
  constructor(r) {
    this._task = r;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Lt.schedulers.add(this), yg();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const yg = () => {
  Lt.isScheduled || (Lt.isScheduled = !0, queueMicrotask(gf));
}, gf = () => {
  try {
    const s = [];
    let r = 0;
    for (const i of Lt.schedulers)
      if (Lt.schedulers.delete(i), !!i.isDirty) {
        if (r++, r > mg)
          throw new Error("Maximum update depth exceeded. This can happen when a resource repeatedly calls setState inside tapEffect.");
        try {
          i.runTask();
        } catch (l) {
          s.push(l);
        }
      }
    if (s.length > 0)
      throw s.length === 1 ? s[0] : new AggregateError(s, "Errors occurred during flushSync");
  } finally {
    Lt.schedulers.clear(), Lt.isScheduled = !1;
  }
}, nl = (s) => {
  const r = Lt;
  Lt = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = s();
    return gf(), i;
  } finally {
    Lt = r;
  }
}, vg = xe((s) => {
  const [, r] = Ot(s.element), i = ss(s.element), l = dr(/* @__PURE__ */ new Set()).current, c = dr(i);
  return Ke(() => {
    i !== c.current && (c.current = i, l.forEach((h) => h()));
  }), le(() => ({
    getState: () => c.current,
    subscribe: (h) => (l.add(h), () => l.delete(h)),
    render: (h) => {
      const p = s.element !== h;
      s.element = h, s.onRender(p) && r(h);
    },
    unmount: s.onUnmount
  }), []);
}), _g = (s, { mount: r = !0 } = {}) => {
  let i = r, l;
  const c = {
    element: s,
    onRender: (p) => i ? p : (i = !0, nl(() => {
      p && (l = us(h, c)), !d.isDirty && cs(h, l);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, ls(h);
    }
  }, d = new gg(() => {
    l = us(h, c), !(d.isDirty || !i) && cs(h, l);
  }), h = Hi(vg, () => d.markDirty());
  return nl(() => {
    d.markDirty();
  }), l.state;
}, is = /* @__PURE__ */ Symbol("tap.Context"), yf = (s) => ({
  [is]: s
}), vf = (s, r, i) => {
  const l = s[is];
  s[is] = r;
  try {
    return i();
  } finally {
    s[is] = l;
  }
}, _f = (s) => s[is], Ld = (s) => {
  let r;
  const i = /* @__PURE__ */ new Set(), l = (_, E) => {
    const b = typeof _ == "function" ? _(r) : _;
    if (!Object.is(b, r)) {
      const C = r;
      r = E ?? (typeof b != "object" || b === null) ? b : Object.assign({}, r, b), i.forEach((R) => R(r, C));
    }
  }, c = () => r, p = { setState: l, getState: c, getInitialState: () => m, subscribe: (_) => (i.add(_), () => i.delete(_)) }, m = r = s(l, c, p);
  return p;
}, Sg = ((s) => s ? Ld(s) : Ld), wg = (s) => s;
function xg(s, r = wg) {
  const i = Gt.useSyncExternalStore(
    s.subscribe,
    Gt.useCallback(() => r(s.getState()), [s, r]),
    Gt.useCallback(() => r(s.getInitialState()), [s, r])
  );
  return Gt.useDebugValue(i), i;
}
const Od = (s) => {
  const r = Sg(s), i = (l) => xg(r, l);
  return Object.assign(i, r), i;
}, Eg = ((s) => s ? Od(s) : Od);
function zd(s, r) {
  if (typeof s == "function")
    return s(r);
  s != null && (s.current = r);
}
function Sf(...s) {
  return (r) => {
    let i = !1;
    const l = s.map((c) => {
      const d = zd(c, r);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let c = 0; c < l.length; c++) {
          const d = l[c];
          typeof d == "function" ? d() : zd(s[c], null);
        }
      };
  };
}
function Wi(...s) {
  return I.useCallback(Sf(...s), s);
}
const wf = xe((s) => {
  const r = le(() => _g(s, { mount: !1 }), [s.type]);
  return Ke(() => {
    r.render(s);
  }), r;
});
class kg {
  ref;
  constructor(r) {
    this.ref = r;
  }
  get(r, i) {
    return this.ref.current[i];
  }
  ownKeys() {
    return Object.keys(this.ref.current);
  }
  has(r, i) {
    return i in this.ref.current;
  }
  getOwnPropertyDescriptor(r, i) {
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
const It = (s, r) => {
  const i = dr(s);
  Ke(() => {
    i.current = s;
  });
  const l = le(() => new Proxy({}, new kg(i)), []), c = r?.key, d = s.getState();
  return le(() => ({
    key: c,
    state: d,
    api: l
  }), [d, c]);
}, Oi = xe((s) => {
  const r = dr(s.get);
  return Ke(() => {
    r.current = s.get;
  }), le(() => We({
    source: s.source,
    query: s.query,
    get: () => r.current()
  }), [s.source, JSON.stringify(s.query)]);
}), Cg = xe((s) => {
  const r = ss(s.scopeElement);
  return le(() => [s.fieldName, r], [s.fieldName, r]);
}), Tg = xe((s) => {
  const { on: r, subscribe: i, ...l } = s, c = dr({ on: r, subscribe: i });
  Ke(() => {
    c.current = { on: r, subscribe: i };
  });
  const d = mf(l, (h, p) => Cg({
    fieldName: p,
    scopeElement: h
  }), []);
  return le(() => {
    const h = Object.fromEntries(Object.values(d)), { on: p, subscribe: m } = c.current;
    return p && (h.on = (_, E) => p(_, E)), m && (h.subscribe = (_) => m(_)), h;
  }, [d]);
}), xf = yf(null), bg = (s, r) => vf(xf, s, r), Ef = () => {
  const s = _f(xf);
  if (!s)
    throw new Error("Model context is not available in this context");
  return s;
}, Ig = xe(({ toolkit: s }) => {
  const [r, i] = Ot(() => ({
    tools: {}
  })), l = Ef();
  Ke(() => {
    if (!s)
      return;
    const d = [];
    for (const [m, _] of Object.entries(s))
      _.render && d.push(c(m, _.render));
    const h = Object.entries(s).reduce((m, [_, E]) => {
      const { render: b, ...C } = E;
      return m[_] = C, m;
    }, {}), p = {
      getModelContext: () => ({
        tools: h
      })
    };
    return d.push(l.register(p)), () => {
      d.forEach((m) => m());
    };
  }, [s, l]);
  const c = (d, h) => (i((p) => ({
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
        [d]: p.tools[d]?.filter((m) => m !== h) ?? []
      }
    }));
  });
  return It({
    getState: () => r,
    setToolUI: c
  });
}), Rg = xe(() => le(() => {
  const r = /* @__PURE__ */ new Map();
  return {
    on: (i, l) => {
      r.has(i) || r.set(i, /* @__PURE__ */ new Set());
      const c = r.get(i);
      return c.add(l), () => {
        c.delete(l), c.size === 0 && r.delete(i);
      };
    },
    emit: (i, l) => {
      const c = r.get(i), d = r.get("*");
      !c && !d || queueMicrotask(() => {
        if (c)
          for (const h of c)
            h(l);
        if (d)
          for (const h of d)
            h({ event: i, payload: l });
      });
    }
  };
}, [])), kf = yf(null), Ng = (s, r) => vf(kf, s, r), pl = () => {
  const s = _f(kf);
  if (!s)
    throw new Error("Events context is not available");
  return s;
}, Mg = xe(() => {
  const [s] = Ot(() => ({})), r = new tf();
  return It({
    getState: () => s,
    getModelContext: () => r.getModelContext(),
    subscribe: (i) => r.subscribe(i),
    register: (i) => r.registerModelContextProvider(i)
  });
}), Ag = xe(({ threads: s, modelContext: r, tools: i }) => {
  const l = zt(Rg()), { threads: c, tools: d, modelContext: h } = Ng(l, () => {
    const m = ss(r ?? Mg(), [r]);
    return bg(m.api, () => ({
      modelContext: m,
      tools: ss(i ?? Ig({}), [i]),
      threads: ss(s, [s])
    }));
  }), p = le(() => ({
    threads: c.state,
    tools: d.state,
    modelContext: h.state
  }), [c.state, d.state, h.state]);
  return It({
    getState: () => p,
    threads: c.api,
    tools: d.api,
    modelContext: h.api,
    on: l.on
  });
}), Pg = (s) => {
  const r = () => s.getState().api.threads.item("main");
  return {
    threads: We({
      source: "root",
      query: {},
      get: () => s.getState().api.threads
    }),
    tools: We({
      source: "root",
      query: {},
      get: () => s.getState().api.tools
    }),
    modelContext: We({
      source: "root",
      query: {},
      get: () => s.getState().api.modelContext
    }),
    thread: We({
      source: "threads",
      query: { type: "main" },
      get: () => s.getState().api.threads.thread("main")
    }),
    threadListItem: We({
      source: "threads",
      query: { type: "main" },
      get: () => r()
    }),
    composer: We({
      source: "thread",
      query: {},
      get: () => s.getState().api.threads.thread("main").composer
    }),
    on(i, l) {
      const { event: c, scope: d } = Vi(i);
      if (d === "*")
        return s.getState().api.on(c, l);
      if (rs("thread", d) || rs("thread-list-item", d) || rs("composer", d))
        return s.getState().api.on(c, (h) => {
          h.threadId === r().getState().id && l(h);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: s.subscribe
  };
}, jg = (s) => {
  const r = ml(), i = hl(wf(Ag(s))), l = I.useMemo(() => Pg(i), [i]);
  return I.useMemo(() => Tf(r, l), [r, l]);
}, We = (s) => {
  const r = s.get;
  return r.source = s.source, r.query = s.query, r;
}, zi = () => () => {
}, Cf = I.createContext({
  threads: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("Threads is only available inside <AssistantProvider />");
    }
  }),
  tools: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("Tools is only available inside <AssistantProvider />");
    }
  }),
  modelContext: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("ModelContext is only available inside <AssistantProvider />");
    }
  }),
  threadListItem: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("ThreadListItem is only available inside <AssistantProvider />");
    }
  }),
  thread: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("Thread is only available inside <AssistantProvider />");
    }
  }),
  composer: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("Composer is only available inside <AssistantProvider />");
    }
  }),
  message: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("Message is only available inside <ThreadPrimitive.Messages />");
    }
  }),
  part: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("Part is only available inside <MessagePrimitive.Parts />");
    }
  }),
  attachment: We({
    source: null,
    query: {},
    get: () => {
      throw new Error("Attachment is only available inside <MessagePrimitive.Attachments /> or <ComposerPrimitive.Attachments />");
    }
  }),
  subscribe: zi,
  on: (s) => {
    const { scope: r } = Vi(s);
    throw new Error(`Event scope is not available in this component: ${r}`);
  }
}), ml = () => I.useContext(Cf), gl = (s) => {
  const r = ml(), i = hl(Tg(s));
  return I.useMemo(() => Tf(r, i), [r, i]);
}, Lg = (s) => jg(s);
function yt(s) {
  return s ? Lg(s) : ml();
}
const Og = (s, r) => s === zi ? r : r === zi ? s : (...i) => {
  const l = s(...i), c = r(...i);
  return () => {
    l(), c();
  };
}, Tf = (s, r) => {
  const i = r.subscribe;
  return {
    ...s,
    ...r,
    subscribe: Og(s.subscribe, i ?? zi)
  };
}, Yi = ({ api: s, children: r, devToolsVisible: i = !0 }) => (I.useEffect(() => {
  if (!(!i || !s.subscribe))
    return An.register(s);
}, [s, i]), y.jsx(Cf.Provider, { value: s, children: r }));
class Dd {
  #e;
  constructor(r) {
    this.#e = r;
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
const we = (s) => {
  const r = yt(), i = I.useMemo(() => new Dd(r), [r]), l = I.useSyncExternalStore(r.subscribe, () => s(i), () => s(i));
  if (I.useDebugValue(l), l instanceof Dd)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return l;
}, Ja = (s, r) => {
  const i = yt(), l = I.useRef(r);
  I.useEffect(() => {
    l.current = r;
  });
  const { scope: c, event: d } = Vi(s);
  I.useEffect(() => i.on({ scope: c, event: d }, (h) => l.current(h)), [i, c, d]);
};
function zg(s, r) {
  function i(l) {
    const c = I.useContext(s);
    if (!l?.optional && !c)
      throw new Error(`This component must be used within ${r}.`);
    return c;
  }
  return i;
}
function bf(s, r) {
  function i(c) {
    const d = s(c);
    return d ? d[r] : null;
  }
  function l(c) {
    let d = !1, h;
    typeof c == "function" ? h = c : c && typeof c == "object" && (d = !!c.optional, h = c.selector);
    const p = i({
      optional: d
    });
    return p ? h ? p(h) : p() : null;
  }
  return {
    [r]: l,
    [`${r}Store`]: i
  };
}
const If = I.createContext(null), Dg = zg(If, "ThreadPrimitive.Viewport"), { useThreadViewport: Di, useThreadViewportStore: yl } = bf(Dg, "useThreadViewport"), Bg = (s) => {
  const r = s;
  r.__isBound || (r.__internal_bindMethods?.(), r.__isBound = !0);
};
function Fg(s, r = Ug) {
  Bg(s);
  const i = I.useSyncExternalStore(s.subscribe, () => r(s.getState()), () => r(s.getState()));
  return I.useDebugValue(i), i;
}
const Ug = (s) => s;
function $g(s) {
  function r(i) {
    let l = !1, c;
    typeof i == "function" ? c = i : i && (l = !!i.optional, c = i.selector);
    const d = s({ optional: l });
    return d ? Fg(d, c) : null;
  }
  return r;
}
function Hg(s) {
  const r = yt(), i = we(() => r.message.source ? r.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !s?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const Mi = $g(Hg), Ln = (s) => {
  const [, r] = Ot(s.getState);
  return Ke(() => (r(s.getState()), s.subscribe(() => {
    r(s.getState());
  })), [s]), s.getState();
}, Vg = xe(({ runtime: s }) => {
  const r = Ln(s), i = pl();
  return Ke(() => {
    const l = [], c = [
      "switched-to",
      "switched-away"
    ];
    for (const d of c) {
      const h = s.unstable_on(d, () => {
        i.emit(`thread-list-item.${d}`, {
          threadId: s.getState().id
        });
      });
      l.push(h);
    }
    return () => {
      for (const d of l)
        d();
    };
  }, [s, i]), It({
    getState: () => r,
    switchTo: s.switchTo,
    rename: s.rename,
    archive: s.archive,
    unarchive: s.unarchive,
    delete: s.delete,
    generateTitle: s.generateTitle,
    initialize: s.initialize,
    detach: s.detach,
    __internal_getRuntime: () => s
  }, {
    key: r.id
  });
}), ds = (s) => {
  const r = le(() => Object.fromEntries(s), [s]), i = mf(r, (d) => d, []), l = le(() => Object.keys(i), [i]);
  return {
    state: le(() => {
      const d = new Array(l.length);
      for (let h = 0; h < l.length; h++)
        d[h] = i[l[h]].state;
      return d;
    }, [l, i]),
    api: (d) => {
      const h = "index" in d ? i[l[d.index]]?.api : i[d.key]?.api;
      if (!h)
        throw new Error(`tapLookupResources: Resource not found for lookup: ${JSON.stringify(d)}`);
      return h;
    }
  };
}, Rf = xe(({ runtime: s }) => {
  const r = Ln(s);
  return It({
    getState: () => r,
    remove: s.remove,
    __internal_getRuntime: () => s
  }, {
    key: r.id
  });
}), Wg = xe(({ runtime: s, index: r }) => {
  const i = le(() => s.getAttachmentByIndex(r), [s, r]);
  return zt(Rf({
    runtime: i
  }));
}), Nf = xe(({ threadIdRef: s, messageIdRef: r, runtime: i }) => {
  const l = Ln(i), c = pl();
  Ke(() => {
    const p = [], m = [
      "send",
      "attachment-add"
    ];
    for (const _ of m) {
      const E = i.unstable_on(_, () => {
        c.emit(`composer.${_}`, {
          threadId: s.current,
          ...r && { messageId: r.current }
        });
      });
      p.push(E);
    }
    return () => {
      for (const _ of p)
        _();
    };
  }, [i, c, s, r]);
  const d = ds(l.attachments.map((p, m) => [
    p.id,
    Wg({ runtime: i, index: m })
  ])), h = le(() => ({
    text: l.text,
    role: l.role,
    attachments: d.state,
    runConfig: l.runConfig,
    isEditing: l.isEditing,
    canCancel: l.canCancel,
    attachmentAccept: l.attachmentAccept,
    isEmpty: l.isEmpty,
    type: l.type ?? "thread",
    dictation: l.dictation
  }), [l, d.state]);
  return It({
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
}), Yg = xe(({ runtime: s }) => {
  const r = Ln(s);
  return It({
    getState: () => r,
    addToolResult: (l) => s.addToolResult(l),
    resumeToolCall: (l) => s.resumeToolCall(l),
    __internal_getRuntime: () => s
  }, {
    key: r.type === "tool-call" ? `toolCallId-${r.toolCallId}` : void 0
  });
}), Qg = xe(({ runtime: s, index: r }) => {
  const i = le(() => s.getAttachmentByIndex(r), [s, r]);
  return zt(Rf({ runtime: i }));
}), Gg = xe(({ runtime: s, index: r }) => {
  const i = le(() => s.getMessagePartByIndex(r), [s, r]);
  return zt(Yg({ runtime: i }));
}), Kg = xe(({ runtime: s, threadIdRef: r }) => {
  const i = Ln(s), [l, c] = Ot(!1), [d, h] = Ot(!1), p = le(() => ({
    get current() {
      return s.getState().id;
    }
  }), [s]), m = zt(Nf({
    runtime: s.composer,
    threadIdRef: r,
    messageIdRef: p
  })), _ = ds(i.content.map((C, R) => [
    "toolCallId" in C && C.toolCallId != null ? `toolCallId-${C.toolCallId}` : `index-${R}`,
    Gg({ runtime: s, index: R })
  ])), E = ds(i.attachments?.map((C, R) => [
    C.id,
    Qg({ runtime: s, index: R })
  ]) ?? []), b = le(() => ({
    ...i,
    parts: _.state,
    composer: m.state,
    isCopied: l,
    isHovering: d
  }), [
    i,
    _.state,
    m.state,
    l,
    d
  ]);
  return It({
    getState: () => b,
    composer: m.api,
    reload: (C) => s.reload(C),
    speak: () => s.speak(),
    stopSpeaking: () => s.stopSpeaking(),
    submitFeedback: (C) => s.submitFeedback(C),
    switchToBranch: (C) => s.switchToBranch(C),
    getCopyText: () => s.unstable_getCopyText(),
    part: (C) => "index" in C ? _.api({ index: C.index }) : _.api({ key: `toolCallId-${C.toolCallId}` }),
    attachment: (C) => "id" in C ? E.api({ key: C.id }) : E.api(C),
    setIsCopied: c,
    setIsHovering: h,
    __internal_getRuntime: () => s
  }, {
    key: i.id
  });
}), Jg = xe(({ runtime: s, id: r, threadIdRef: i }) => {
  const l = le(() => s.getMessageById(r), [s, r]);
  return zt(Kg({ runtime: l, threadIdRef: i }));
}), qg = xe(({ runtime: s }) => {
  const r = Ln(s), i = pl();
  Ke(() => {
    const p = [], m = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const _ of m) {
      const E = s.unstable_on(_, () => {
        const b = s.getState()?.threadId || "unknown";
        i.emit(`thread.${_}`, {
          threadId: b
        });
      });
      p.push(E);
    }
    return () => {
      for (const _ of p)
        _();
    };
  }, [s]);
  const l = le(() => ({
    get current() {
      return s.getState().threadId;
    }
  }), [s]), c = zt(Nf({
    runtime: s.composer,
    threadIdRef: l
  })), d = ds(r.messages.map((p) => [
    p.id,
    Jg({ runtime: s, id: p.id, threadIdRef: l })
  ])), h = le(() => ({
    isEmpty: d.state.length === 0 && !r.isLoading,
    isDisabled: r.isDisabled,
    isLoading: r.isLoading,
    isRunning: r.isRunning,
    capabilities: r.capabilities,
    state: r.state,
    suggestions: r.suggestions,
    extras: r.extras,
    speech: r.speech,
    composer: c.state,
    messages: d.state
  }), [r, d, c.state]);
  return It({
    getState: () => h,
    composer: c.api,
    append: s.append,
    startRun: s.startRun,
    unstable_resumeRun: s.unstable_resumeRun,
    cancelRun: s.cancelRun,
    getModelContext: s.getModelContext,
    export: s.export,
    import: s.import,
    reset: s.reset,
    stopSpeaking: s.stopSpeaking,
    startVoice: async () => {
      throw new Error("startVoice is not supported in this runtime");
    },
    stopVoice: async () => {
      throw new Error("stopVoice is not supported in this runtime");
    },
    message: (p) => "id" in p ? d.api({ key: p.id }) : d.api(p),
    __internal_getRuntime: () => s
  });
}), Xg = xe(({ runtime: s, id: r }) => {
  const i = le(() => s.getItemById(r), [s, r]);
  return zt(Vg({
    runtime: i
  }));
}), Zg = xe(({ runtime: s, __internal_assistantRuntime: r }) => {
  const i = Ln(s), l = zt(qg({
    runtime: s.main
  })), c = ds(Object.keys(i.threadItems).map((h) => [
    h,
    Xg({ runtime: s, id: h })
  ])), d = le(() => ({
    mainThreadId: i.mainThreadId,
    newThreadId: i.newThread ?? null,
    isLoading: i.isLoading,
    threadIds: i.threads,
    archivedThreadIds: i.archivedThreads,
    threadItems: c.state,
    main: l.state
  }), [i, c.state, l.state]);
  return It({
    getState: () => d,
    thread: () => l.api,
    item: (h) => {
      if (h === "main")
        return c.api({ key: d.mainThreadId });
      if ("id" in h)
        return c.api({ key: h.id });
      const { index: p, archived: m = !1 } = h, _ = m ? d.archivedThreadIds[p] : d.threadIds[p];
      return c.api({ key: _ });
    },
    switchToThread: (h) => {
      s.switchToThread(h);
    },
    switchToNewThread: () => {
      s.switchToNewThread();
    },
    __internal_getAssistantRuntime: () => r
  });
}), ey = xe((s) => {
  const r = Ef();
  return Ke(() => s.registerModelContextProvider(r), [s, r]), zt(Zg({
    runtime: s.threads,
    __internal_assistantRuntime: s
  }));
}), qa = (s) => {
  const r = /* @__PURE__ */ new Map(), i = () => {
    let l = 0;
    for (const c of r.values())
      l += c;
    s(l);
  };
  return {
    register: () => {
      const l = /* @__PURE__ */ Symbol();
      return r.set(l, 0), {
        setHeight: (c) => {
          r.get(l) !== c && (r.set(l, c), i());
        },
        unregister: () => {
          r.delete(l), i();
        }
      };
    }
  };
}, ty = (s = {}) => {
  const r = /* @__PURE__ */ new Set(), i = qa((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: h
      }
    });
  }), l = qa((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: h
      }
    });
  }), c = qa((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: h
      }
    });
  }), d = Eg(() => ({
    isAtBottom: !0,
    scrollToBottom: ({ behavior: h = "auto" } = {}) => {
      for (const p of r)
        p({ behavior: h });
    },
    onScrollToBottom: (h) => (r.add(h), () => {
      r.delete(h);
    }),
    turnAnchor: s.turnAnchor ?? "bottom",
    height: {
      viewport: 0,
      inset: 0,
      userMessage: 0
    },
    registerViewport: i.register,
    registerContentInset: l.register,
    registerUserMessageHeight: c.register
  }));
  return d;
}, fs = (s) => s, ny = (s) => {
  const r = yl({ optional: !0 }), [i] = I.useState(() => ty(s));
  return I.useEffect(() => r?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [r, i]), I.useEffect(() => {
    if (r)
      return i.subscribe((l) => {
        r.getState().isAtBottom !== l.isAtBottom && fs(r).setState({ isAtBottom: l.isAtBottom });
      });
  }, [i, r]), I.useEffect(() => {
    const l = {
      turnAnchor: s.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== l.turnAnchor && fs(i).setState(l);
  }, [i, s.turnAnchor]), i;
}, Mf = ({ children: s, options: r = {} }) => {
  const i = ny(r), [l] = I.useState(() => ({
    useThreadViewport: i
  }));
  return y.jsx(If.Provider, { value: l, children: s });
}, ry = (s) => s._core?.RenderComponent, sy = ({ children: s, runtime: r }) => {
  const i = yt({
    threads: ey(r)
  }), l = ry(r);
  return y.jsxs(Yi, { api: i, children: [l && y.jsx(l, {}), y.jsx(Mf, { children: s })] });
}, iy = I.memo(sy), oy = ({ index: s, children: r }) => {
  const i = yt(), l = gl({
    message: Oi({
      source: "thread",
      query: { type: "index", index: s },
      get: () => i.thread().message({ index: s })
    }),
    composer: Oi({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: s }).composer
    }),
    on(c, d) {
      const h = () => i.thread().message({ index: s }), { event: p, scope: m } = Vi(c);
      return !rs("composer", m) && !rs("message", m) ? i.on(c, d) : i.on({ scope: "thread", event: p }, (_) => {
        _.messageId === h().getState().id && d(_);
      });
    }
  });
  return y.jsx(Yi, { api: l, children: r });
}, ay = ({ index: s, children: r }) => {
  const i = yt(), l = gl({
    part: Oi({
      source: "message",
      query: { type: "index", index: s },
      get: () => i.message().part({ index: s })
    })
  });
  return y.jsx(Yi, { api: l, children: r });
}, ly = xe(({ text: s, isRunning: r }) => {
  const i = le(() => ({
    type: "text",
    text: s,
    status: r ? { type: "running" } : { type: "complete" }
  }), [s, r]);
  return It({
    getState: () => i,
    addToolResult: () => {
      throw new Error("Not supported");
    },
    resumeToolCall: () => {
      throw new Error("Not supported");
    }
  });
}), uy = ({ text: s, isRunning: r = !1, children: i }) => {
  const l = hl(wf(ly({ text: s, isRunning: r }))), c = gl({
    part: Oi({
      source: "root",
      query: {},
      get: () => l.getState().api
    }),
    subscribe: l.subscribe
  });
  return y.jsx(Yi, { api: c, children: i });
};
class cy {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(r) {
    this._core = r, this.threads = new Qm(r.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
  switchToThread(r) {
    return this._core.threads.switchToThread(r);
  }
  registerModelContextProvider(r) {
    return this._core.registerModelContextProvider(r);
  }
  registerModelConfigProvider(r) {
    return this.registerModelContextProvider(r);
  }
  reset({ initialMessages: r } = {}) {
    return this._core.threads.getMainThreadRuntimeCore().import(cl.fromArray(r ?? []));
  }
}
function Qi(s) {
  const r = I.useRef(s);
  return I.useEffect(() => {
    r.current = s;
  }), I.useMemo(() => (...i) => r.current?.(...i), []);
}
const dy = I.createContext(null);
function fy(s) {
  const r = I.useContext(dy);
  if (!s?.optional && !r)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return r;
}
const { useSmoothStatus: __, useSmoothStatusStore: hy } = bf(fy, "useSmoothStatus");
class py {
  currentText;
  setText;
  animationFrameId = null;
  lastUpdateTime = Date.now();
  targetText = "";
  constructor(r, i) {
    this.currentText = r, this.setText = i;
  }
  start() {
    this.animationFrameId === null && (this.lastUpdateTime = Date.now(), this.animate());
  }
  stop() {
    this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null);
  }
  animate = () => {
    const r = Date.now();
    let l = r - this.lastUpdateTime;
    const c = this.targetText.length - this.currentText.length, d = Math.min(5, 250 / c);
    let h = 0;
    for (; l >= d && h < c; )
      h++, l -= d;
    h !== c ? this.animationFrameId = requestAnimationFrame(this.animate) : this.animationFrameId = null, h !== 0 && (this.currentText = this.targetText.slice(0, this.currentText.length + h), this.lastUpdateTime = r - l, this.setText(this.currentText));
  };
}
const Xa = Object.freeze({
  type: "running"
}), my = (s, r = !1) => {
  const { text: i } = s, l = we(({ message: E }) => E.id), c = I.useRef(l), [d, h] = I.useState(i), p = hy({ optional: !0 }), m = Qi((E) => {
    if (h(E), p) {
      const b = d !== E || s.status.type === "running" ? Xa : s.status;
      fs(p).setState(b, !0);
    }
  });
  I.useEffect(() => {
    if (p) {
      const E = r && (d !== i || s.status.type === "running") ? Xa : s.status;
      fs(p).setState(E, !0);
    }
  }, [p, r, i, d, s.status]);
  const [_] = I.useState(new py(i, m));
  return I.useEffect(() => {
    if (!r) {
      _.stop();
      return;
    }
    if (c.current !== l || !i.startsWith(_.targetText)) {
      c.current = l, m(i), _.currentText = i, _.targetText = i, _.stop();
      return;
    }
    _.targetText = i, _.start();
  }, [m, _, l, r, i]), I.useEffect(() => () => {
    _.stop();
  }, [_]), I.useMemo(() => r ? {
    type: "text",
    text: d,
    status: i === d ? s.status : Xa
  } : s, [r, d, s, i]);
};
var gy = /* @__PURE__ */ Symbol.for("react.lazy"), Bi = am[" use ".trim().toString()];
function yy(s) {
  return typeof s == "object" && s !== null && "then" in s;
}
function Af(s) {
  return s != null && typeof s == "object" && "$$typeof" in s && s.$$typeof === gy && "_payload" in s && yy(s._payload);
}
// @__NO_SIDE_EFFECTS__
function Pf(s) {
  const r = /* @__PURE__ */ vy(s), i = I.forwardRef((l, c) => {
    let { children: d, ...h } = l;
    Af(d) && typeof Bi == "function" && (d = Bi(d._payload));
    const p = I.Children.toArray(d), m = p.find(Sy);
    if (m) {
      const _ = m.props.children, E = p.map((b) => b === m ? I.Children.count(_) > 1 ? I.Children.only(null) : I.isValidElement(_) ? _.props.children : null : b);
      return /* @__PURE__ */ y.jsx(r, { ...h, ref: c, children: I.isValidElement(_) ? I.cloneElement(_, void 0, E) : null });
    }
    return /* @__PURE__ */ y.jsx(r, { ...h, ref: c, children: d });
  });
  return i.displayName = `${s}.Slot`, i;
}
var jf = /* @__PURE__ */ Pf("Slot");
// @__NO_SIDE_EFFECTS__
function vy(s) {
  const r = I.forwardRef((i, l) => {
    let { children: c, ...d } = i;
    if (Af(c) && typeof Bi == "function" && (c = Bi(c._payload)), I.isValidElement(c)) {
      const h = xy(c), p = wy(d, c.props);
      return c.type !== I.Fragment && (p.ref = l ? Sf(l, h) : h), I.cloneElement(c, p);
    }
    return I.Children.count(c) > 1 ? I.Children.only(null) : null;
  });
  return r.displayName = `${s}.SlotClone`, r;
}
var _y = /* @__PURE__ */ Symbol("radix.slottable");
function Sy(s) {
  return I.isValidElement(s) && typeof s.type == "function" && "__radixId" in s.type && s.type.__radixId === _y;
}
function wy(s, r) {
  const i = { ...r };
  for (const l in r) {
    const c = s[l], d = r[l];
    /^on[A-Z]/.test(l) ? c && d ? i[l] = (...p) => {
      const m = d(...p);
      return c(...p), m;
    } : c && (i[l] = c) : l === "style" ? i[l] = { ...c, ...d } : l === "className" && (i[l] = [c, d].filter(Boolean).join(" "));
  }
  return { ...s, ...i };
}
function xy(s) {
  let r = Object.getOwnPropertyDescriptor(s.props, "ref")?.get, i = r && "isReactWarning" in r && r.isReactWarning;
  return i ? s.ref : (r = Object.getOwnPropertyDescriptor(s, "ref")?.get, i = r && "isReactWarning" in r && r.isReactWarning, i ? s.props.ref : s.props.ref || s.ref);
}
var Ey = [
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
], pr = Ey.reduce((s, r) => {
  const i = /* @__PURE__ */ Pf(`Primitive.${r}`), l = I.forwardRef((c, d) => {
    const { asChild: h, ...p } = c, m = h ? i : r;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ y.jsx(m, { ...p, ref: d });
  });
  return l.displayName = `Primitive.${r}`, { ...s, [r]: l };
}, {});
function os(s, r, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(c) {
    if (s?.(c), i === !1 || !c.defaultPrevented)
      return r?.(c);
  };
}
const vl = (s, r, i = []) => {
  const l = I.forwardRef((c, d) => {
    const h = {}, p = {};
    Object.keys(c).forEach((_) => {
      i.includes(_) ? h[_] = c[_] : p[_] = c[_];
    });
    const m = r(h) ?? void 0;
    return y.jsx(pr.button, { type: "button", ...p, ref: d, disabled: p.disabled || !m, onClick: os(p.onClick, m) });
  });
  return l.displayName = s, l;
};
function ky(s, r = globalThis?.document) {
  const i = Qi(s);
  I.useEffect(() => {
    const l = (c) => {
      c.key === "Escape" && i(c);
    };
    return r.addEventListener("keydown", l, { capture: !0 }), () => r.removeEventListener("keydown", l, { capture: !0 });
  }, [i, r]);
}
const gs = (s) => {
  const r = I.useRef(void 0);
  return I.useCallback((l) => {
    r.current && r.current(), l && (r.current = s(l));
  }, [s]);
}, Lf = (s, r) => {
  const i = I.useCallback((l) => {
    if (!s)
      return;
    const c = s(), d = () => {
      const p = r ? r(l) : l.offsetHeight;
      c.setHeight(p);
    }, h = new ResizeObserver(d);
    return h.observe(l), d(), () => {
      h.disconnect(), c.unregister();
    };
  }, [s, r]);
  return gs(i);
}, Bd = I.createContext(!1), Fd = (s, r) => {
  const i = s.match(/^([\d.]+)(em|px|rem)$/);
  if (!i)
    return 0;
  const l = parseFloat(i[1]), c = i[2];
  if (c === "px")
    return l;
  if (c === "em") {
    const d = parseFloat(getComputedStyle(r).fontSize) || 16;
    return l * d;
  }
  if (c === "rem") {
    const d = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return l * d;
  }
  return 0;
}, Of = ({ children: s, fillClampThreshold: r = "10em", fillClampOffset: i = "6em" }) => {
  const l = we(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: m, message: _ }) => _.isLast && _.role === "assistant" && _.index >= 1 && m.messages.at(_.index - 1)?.role === "user"
  ), c = yl({ optional: !0 }), d = I.useContext(Bd), h = I.useCallback((m) => {
    if (!c || d)
      return;
    const _ = () => {
      const E = c.getState();
      if (E.turnAnchor === "top" && l) {
        const { viewport: b, inset: C, userMessage: R } = E.height, z = Fd(r, m), H = Fd(i, m), G = R <= z ? R : H, se = Math.max(0, b - C - G);
        m.style.minHeight = `${se}px`, m.style.flexShrink = "0", m.style.transition = "min-height 0s";
      } else
        m.style.minHeight = "", m.style.flexShrink = "", m.style.transition = "";
    };
    return _(), c.subscribe(_);
  }, [
    c,
    l,
    d,
    r,
    i
  ]), p = gs(h);
  return y.jsx(Bd.Provider, { value: !0, children: y.jsx(jf, { ref: p, children: s }) });
};
Of.displayName = "ThreadPrimitive.ViewportSlack";
const Cy = () => {
  const s = yt(), r = we(() => s.message()), i = I.useCallback((l) => {
    const c = () => {
      r.setIsHovering(!0);
    }, d = () => {
      r.setIsHovering(!1);
    };
    return l.addEventListener("mouseenter", c), l.addEventListener("mouseleave", d), l.matches(":hover") && queueMicrotask(() => r.setIsHovering(!0)), () => {
      l.removeEventListener("mouseenter", c), l.removeEventListener("mouseleave", d), r.setIsHovering(!1);
    };
  }, [r]);
  return gs(i);
}, Ty = () => {
  const s = Di((c) => c.turnAnchor), r = Di((c) => c.registerUserMessageHeight), i = we(({ thread: c, message: d }) => s === "top" && d.role === "user" && d.index === c.messages.length - 2 && c.messages.at(-1)?.role === "assistant"), l = I.useCallback((c) => c.offsetHeight, []);
  return Lf(i ? r : null, l);
}, _l = I.forwardRef((s, r) => {
  const i = Cy(), l = Ty(), c = Wi(r, i, l);
  return y.jsx(Of, { children: y.jsx(pr.div, { ...s, ref: c }) });
});
_l.displayName = "MessagePrimitive.Root";
const by = () => we(({ part: r }) => {
  if (r.type !== "text" && r.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return r;
}), zf = I.forwardRef(({ smooth: s = !0, component: r = "span", ...i }, l) => {
  const { text: c, status: d } = my(by(), s);
  return y.jsx(r, { "data-status": d.type, ...i, ref: l, children: c });
});
zf.displayName = "MessagePartPrimitive.Text";
const Iy = () => we(({ part: r }) => {
  if (r.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return r;
}), Df = I.forwardRef((s, r) => {
  const { image: i } = Iy();
  return y.jsx(pr.img, { src: i, ...s, ref: r });
});
Df.displayName = "MessagePartPrimitive.Image";
const Bf = ({ children: s }) => we(({ part: i }) => i.status.type === "running") ? s : null;
Bf.displayName = "MessagePartPrimitive.InProgress";
const Ud = (s) => Symbol.iterator in s, $d = (s) => (
  // HACK: avoid checking entries type
  "entries" in s
), Hd = (s, r) => {
  const i = s instanceof Map ? s : new Map(s.entries()), l = r instanceof Map ? r : new Map(r.entries());
  if (i.size !== l.size)
    return !1;
  for (const [c, d] of i)
    if (!l.has(c) || !Object.is(d, l.get(c)))
      return !1;
  return !0;
}, Ry = (s, r) => {
  const i = s[Symbol.iterator](), l = r[Symbol.iterator]();
  let c = i.next(), d = l.next();
  for (; !c.done && !d.done; ) {
    if (!Object.is(c.value, d.value))
      return !1;
    c = i.next(), d = l.next();
  }
  return !!c.done && !!d.done;
};
function Ny(s, r) {
  return Object.is(s, r) ? !0 : typeof s != "object" || s === null || typeof r != "object" || r === null || Object.getPrototypeOf(s) !== Object.getPrototypeOf(r) ? !1 : Ud(s) && Ud(r) ? $d(s) && $d(r) ? Hd(s, r) : Ry(s, r) : Hd(
    { entries: () => Object.entries(s) },
    { entries: () => Object.entries(r) }
  );
}
function My(s) {
  const r = Gt.useRef(void 0);
  return (i) => {
    const l = s(i);
    return Ny(r.current, l) ? r.current : r.current = l;
  };
}
const Vd = (s) => {
  let r = -1;
  return {
    startGroup: (i) => {
      r === -1 && (r = i);
    },
    endGroup: (i, l) => {
      r !== -1 && (l.push({
        type: s,
        startIndex: r,
        endIndex: i
      }), r = -1);
    },
    finalize: (i, l) => {
      r !== -1 && l.push({
        type: s,
        startIndex: r,
        endIndex: i
      });
    }
  };
}, Ay = (s) => {
  const r = [], i = Vd("toolGroup"), l = Vd("reasoningGroup");
  for (let c = 0; c < s.length; c++) {
    const d = s[c];
    d === "tool-call" ? (l.endGroup(c - 1, r), i.startGroup(c)) : d === "reasoning" ? (i.endGroup(c - 1, r), l.startGroup(c)) : (i.endGroup(c - 1, r), l.endGroup(c - 1, r), r.push({ type: "single", index: c }));
  }
  return i.finalize(s.length - 1, r), l.finalize(s.length - 1, r), r;
}, Py = () => {
  const s = we(My((r) => r.message.parts.map((i) => i.type)));
  return I.useMemo(() => s.length === 0 ? [] : Ay(s), [s]);
}, jy = ({ Fallback: s, ...r }) => {
  const i = we(({ tools: l }) => {
    const c = l.tools[r.toolName] ?? s;
    return Array.isArray(c) ? c[0] ?? s : c;
  });
  return i ? y.jsx(i, { ...r }) : null;
}, Qt = {
  Text: () => y.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [y.jsx(zf, {}), y.jsx(Bf, { children: y.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => y.jsx(Df, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: s }) => s,
  ReasoningGroup: ({ children: s }) => s
}, Ly = ({ components: { Text: s = Qt.Text, Reasoning: r = Qt.Reasoning, Image: i = Qt.Image, Source: l = Qt.Source, File: c = Qt.File, Unstable_Audio: d = Qt.Unstable_Audio, tools: h = {} } = {} }) => {
  const p = yt(), m = we(({ part: E }) => E), _ = m.type;
  if (_ === "tool-call") {
    const E = p.part().addToolResult, b = p.part().resumeToolCall;
    if ("Override" in h)
      return y.jsx(h.Override, { ...m, addResult: E, resume: b });
    const C = h.by_name?.[m.toolName] ?? h.Fallback;
    return y.jsx(jy, { ...m, Fallback: C, addResult: E, resume: b });
  }
  if (m.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (_) {
    case "text":
      return y.jsx(s, { ...m });
    case "reasoning":
      return y.jsx(r, { ...m });
    case "source":
      return y.jsx(l, { ...m });
    case "image":
      return y.jsx(i, { ...m });
    case "file":
      return y.jsx(c, { ...m });
    case "audio":
      return y.jsx(d, { ...m });
    case "data":
      return null;
    default:
      const E = _;
      throw new Error(`Unknown message part type: ${E}`);
  }
}, Pi = I.memo(({ index: s, components: r }) => y.jsx(ay, { index: s, children: y.jsx(Ly, { components: r }) }), (s, r) => s.index === r.index && s.components?.Text === r.components?.Text && s.components?.Reasoning === r.components?.Reasoning && s.components?.Source === r.components?.Source && s.components?.Image === r.components?.Image && s.components?.File === r.components?.File && s.components?.Unstable_Audio === r.components?.Unstable_Audio && s.components?.tools === r.components?.tools && s.components?.ToolGroup === r.components?.ToolGroup && s.components?.ReasoningGroup === r.components?.ReasoningGroup);
Pi.displayName = "MessagePrimitive.PartByIndex";
const Oy = ({ status: s, component: r }) => y.jsx(uy, { text: "", isRunning: s.type === "running", children: y.jsx(r, { type: "text", text: "", status: s }) }), zy = Object.freeze({
  type: "complete"
}), Dy = ({ components: s }) => {
  const r = we((i) => i.message.status ?? zy);
  return s?.Empty ? y.jsx(s.Empty, { status: r }) : y.jsx(Oy, { status: r, component: s?.Text ?? Qt.Text });
}, By = I.memo(Dy, (s, r) => s.components?.Empty === r.components?.Empty && s.components?.Text === r.components?.Text), Sl = ({ components: s }) => {
  const r = we(({ message: c }) => c.parts.length), i = Py(), l = I.useMemo(() => r === 0 ? y.jsx(By, { components: s }) : i.map((c) => {
    if (c.type === "single")
      return y.jsx(Pi, { index: c.index, components: s }, c.index);
    if (c.type === "toolGroup") {
      const d = s?.ToolGroup ?? Qt.ToolGroup;
      return y.jsx(d, { startIndex: c.startIndex, endIndex: c.endIndex, children: Array.from({ length: c.endIndex - c.startIndex + 1 }, (h, p) => y.jsx(Pi, { index: c.startIndex + p, components: s }, p)) }, `tool-${c.startIndex}`);
    } else {
      const d = s?.ReasoningGroup ?? Qt.ReasoningGroup;
      return y.jsx(d, { startIndex: c.startIndex, endIndex: c.endIndex, children: Array.from({ length: c.endIndex - c.startIndex + 1 }, (h, p) => y.jsx(Pi, { index: c.startIndex + p, components: s }, p)) }, `reasoning-${c.startIndex}`);
    }
  }), [i, s, r]);
  return y.jsx(y.Fragment, { children: l });
};
Sl.displayName = "MessagePrimitive.Parts";
const Ff = ({ children: s }) => we(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? s : null;
Ff.displayName = "MessagePrimitive.Error";
const Uf = () => {
  const s = yt(), r = we((l) => l.thread.isRunning || !l.composer.isEditing || l.composer.isEmpty), i = I.useCallback(() => {
    s.composer().send();
  }, [s]);
  return r ? null : i;
}, Fy = vl("ComposerPrimitive.Send", Uf), $f = I.forwardRef(({ onSubmit: s, ...r }, i) => {
  const l = Uf(), c = (d) => {
    d.preventDefault(), l && l();
  };
  return y.jsx(pr.form, { ...r, ref: i, onSubmit: os(s, c) });
});
$f.displayName = "ComposerPrimitive.Root";
function rl() {
  return rl = Object.assign ? Object.assign.bind() : function(s) {
    for (var r = 1; r < arguments.length; r++) {
      var i = arguments[r];
      for (var l in i) ({}).hasOwnProperty.call(i, l) && (s[l] = i[l]);
    }
    return s;
  }, rl.apply(null, arguments);
}
function Uy(s, r) {
  if (s == null) return {};
  var i = {};
  for (var l in s) if ({}.hasOwnProperty.call(s, l)) {
    if (r.indexOf(l) !== -1) continue;
    i[l] = s[l];
  }
  return i;
}
var $y = I.useLayoutEffect, Hy = function(r) {
  var i = Gt.useRef(r);
  return $y(function() {
    i.current = r;
  }), i;
}, Wd = function(r, i) {
  if (typeof r == "function") {
    r(i);
    return;
  }
  r.current = i;
}, Vy = function(r, i) {
  var l = Gt.useRef();
  return Gt.useCallback(function(c) {
    r.current = c, l.current && Wd(l.current, null), l.current = i, i && Wd(i, c);
  }, [i]);
}, Yd = {
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
}, Wy = function(r) {
  Object.keys(Yd).forEach(function(i) {
    r.style.setProperty(i, Yd[i], "important");
  });
}, Qd = Wy, Ge = null, Gd = function(r, i) {
  var l = r.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? l + i.borderSize : l - i.paddingSize;
};
function Yy(s, r, i, l) {
  i === void 0 && (i = 1), l === void 0 && (l = 1 / 0), Ge || (Ge = document.createElement("textarea"), Ge.setAttribute("tabindex", "-1"), Ge.setAttribute("aria-hidden", "true"), Qd(Ge)), Ge.parentNode === null && document.body.appendChild(Ge);
  var c = s.paddingSize, d = s.borderSize, h = s.sizingStyle, p = h.boxSizing;
  Object.keys(h).forEach(function(C) {
    var R = C;
    Ge.style[R] = h[R];
  }), Qd(Ge), Ge.value = r;
  var m = Gd(Ge, s);
  Ge.value = r, m = Gd(Ge, s), Ge.value = "x";
  var _ = Ge.scrollHeight - c, E = _ * i;
  p === "border-box" && (E = E + c + d), m = Math.max(E, m);
  var b = _ * l;
  return p === "border-box" && (b = b + c + d), m = Math.min(b, m), [m, _];
}
var Kd = function() {
}, Qy = function(r, i) {
  return r.reduce(function(l, c) {
    return l[c] = i[c], l;
  }, {});
}, Gy = [
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
], Ky = !!document.documentElement.currentStyle, Jy = function(r) {
  var i = window.getComputedStyle(r);
  if (i === null)
    return null;
  var l = Qy(Gy, i), c = l.boxSizing;
  if (c === "")
    return null;
  Ky && c === "border-box" && (l.width = parseFloat(l.width) + parseFloat(l.borderRightWidth) + parseFloat(l.borderLeftWidth) + parseFloat(l.paddingRight) + parseFloat(l.paddingLeft) + "px");
  var d = parseFloat(l.paddingBottom) + parseFloat(l.paddingTop), h = parseFloat(l.borderBottomWidth) + parseFloat(l.borderTopWidth);
  return {
    sizingStyle: l,
    paddingSize: d,
    borderSize: h
  };
}, qy = Jy;
function wl(s, r, i) {
  var l = Hy(i);
  I.useLayoutEffect(function() {
    var c = function(h) {
      return l.current(h);
    };
    if (s)
      return s.addEventListener(r, c), function() {
        return s.removeEventListener(r, c);
      };
  }, []);
}
var Xy = function(r, i) {
  wl(document.body, "reset", function(l) {
    r.current.form === l.target && i(l);
  });
}, Zy = function(r) {
  wl(window, "resize", r);
}, ev = function(r) {
  wl(document.fonts, "loadingdone", r);
}, tv = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], nv = function(r, i) {
  var l = r.cacheMeasurements, c = r.maxRows, d = r.minRows, h = r.onChange, p = h === void 0 ? Kd : h, m = r.onHeightChange, _ = m === void 0 ? Kd : m, E = Uy(r, tv), b = E.value !== void 0, C = I.useRef(null), R = Vy(C, i), z = I.useRef(0), H = I.useRef(), G = function() {
    var J = C.current, X = l && H.current ? H.current : qy(J);
    if (X) {
      H.current = X;
      var Ee = Yy(X, J.value || J.placeholder || "x", d, c), ne = Ee[0], ue = Ee[1];
      z.current !== ne && (z.current = ne, J.style.setProperty("height", ne + "px", "important"), _(ne, {
        rowHeight: ue
      }));
    }
  }, se = function(J) {
    b || G(), p(J);
  };
  return I.useLayoutEffect(G), Xy(C, function() {
    if (!b) {
      var Y = C.current.value;
      requestAnimationFrame(function() {
        var J = C.current;
        J && Y !== J.value && G();
      });
    }
  }), Zy(G), ev(G), /* @__PURE__ */ I.createElement("textarea", rl({}, E, {
    onChange: se,
    ref: R
  }));
}, rv = /* @__PURE__ */ I.forwardRef(nv);
const Hf = (s) => {
  const r = Qi(s), i = Di((l) => l.onScrollToBottom);
  I.useEffect(() => i(r), [i, r]);
}, Vf = I.forwardRef(({ autoFocus: s = !1, asChild: r, disabled: i, onChange: l, onKeyDown: c, onPaste: d, submitOnEnter: h = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: m = !0, unstable_focusOnScrollToBottom: _ = !0, unstable_focusOnThreadSwitched: E = !0, addAttachmentOnPaste: b = !0, ...C }, R) => {
  const z = yt(), H = we(({ composer: q }) => q.isEditing ? q.text : ""), G = r ? jf : rv, se = we(({ thread: q, composer: fe }) => q.isDisabled || fe.dictation?.inputDisabled) || i, Y = I.useRef(null), J = Wi(R, Y);
  ky((q) => {
    if (!p || !Y.current?.contains(q.target))
      return;
    const fe = z.composer();
    fe.getState().canCancel && (fe.cancel(), q.preventDefault());
  });
  const X = (q) => {
    se || !h || q.nativeEvent.isComposing || q.key === "Enter" && q.shiftKey === !1 && (z.thread().getState().isRunning || (q.preventDefault(), Y.current?.closest("form")?.requestSubmit()));
  }, Ee = async (q) => {
    if (!b)
      return;
    const fe = z.thread().getState().capabilities, Ae = Array.from(q.clipboardData?.files || []);
    if (fe.attachments && Ae.length > 0)
      try {
        q.preventDefault(), await Promise.all(Ae.map((Ie) => z.composer().addAttachment(Ie)));
      } catch (Ie) {
        console.error("Error adding attachment:", Ie);
      }
  }, ne = s && !se, ue = I.useCallback(() => {
    const q = Y.current;
    !q || !ne || (q.focus({ preventScroll: !0 }), q.setSelectionRange(q.value.length, q.value.length));
  }, [ne]);
  return I.useEffect(() => ue(), [ue]), Hf(() => {
    z.composer().getState().type === "thread" && _ && ue();
  }), I.useEffect(() => {
    if (!(z.composer().getState().type !== "thread" || !m))
      return z.on("thread.run-start", ue);
  }, [m, ue, z]), I.useEffect(() => {
    if (!(z.composer().getState().type !== "thread" || !E))
      return z.on("thread-list-item.switched-to", ue);
  }, [E, ue, z]), y.jsx(G, { name: "input", value: H, ...C, ref: J, disabled: se, onChange: os(l, (q) => {
    z.composer().getState().isEditing && nl(() => {
      z.composer().setText(q.target.value);
    });
  }), onKeyDown: os(c, X), onPaste: os(d, Ee) });
});
Vf.displayName = "ComposerPrimitive.Input";
const sv = () => {
  const s = yt(), r = we(({ composer: l }) => !l.canCancel), i = I.useCallback(() => {
    s.composer().cancel();
  }, [s]);
  return r ? null : i;
}, iv = vl("ComposerPrimitive.Cancel", sv), Wf = I.forwardRef((s, r) => y.jsx(pr.div, { ...s, ref: r }));
Wf.displayName = "ThreadPrimitive.Root";
const ov = (s) => we(({ thread: r }) => !(s.empty === !0 && !r.isEmpty || s.empty === !1 && r.isEmpty || s.running === !0 && !r.isRunning || s.running === !1 && r.isRunning || s.disabled === !0 && !r.isDisabled || s.disabled === !1 && r.isDisabled)), sl = ({ children: s, ...r }) => ov(r) ? s : null;
sl.displayName = "ThreadPrimitive.If";
const av = (s) => {
  const r = Qi(s), i = I.useCallback((l) => {
    const c = new ResizeObserver(() => {
      r();
    }), d = new MutationObserver((h) => {
      h.some((m) => m.type !== "attributes" || m.attributeName !== "style") && r();
    });
    return c.observe(l), d.observe(l, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      characterData: !0
    }), () => {
      c.disconnect(), d.disconnect();
    };
  }, [r]);
  return gs(i);
}, lv = ({ autoScroll: s, scrollToBottomOnRunStart: r = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: l = !0 }) => {
  const c = I.useRef(null), d = yl();
  s === void 0 && (s = d.getState().turnAnchor !== "top");
  const h = I.useRef(0), p = I.useRef(null), m = I.useCallback((R) => {
    const z = c.current;
    z && (p.current = R, z.scrollTo({ top: z.scrollHeight, behavior: R }));
  }, []), _ = () => {
    const R = c.current;
    if (!R)
      return;
    const z = d.getState().isAtBottom, H = Math.abs(R.scrollHeight - R.scrollTop - R.clientHeight) < 1 || R.scrollHeight <= R.clientHeight;
    !H && h.current < R.scrollTop || (H && (p.current = null), (H || p.current === null) && H !== z && fs(d).setState({
      isAtBottom: H
    })), h.current = R.scrollTop;
  }, E = av(() => {
    const R = p.current;
    R ? m(R) : s && d.getState().isAtBottom && m("instant"), _();
  }), b = gs((R) => (R.addEventListener("scroll", _), () => {
    R.removeEventListener("scroll", _);
  }));
  return Hf(({ behavior: R }) => {
    m(R);
  }), Ja("thread.run-start", () => {
    r && (p.current = "auto", requestAnimationFrame(() => {
      m("auto");
    }));
  }), Ja("thread.initialize", () => {
    i && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), Ja("thread-list-item.switched-to", () => {
    l && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), Wi(E, b, c);
}, uv = () => {
  const s = Di((i) => i.registerViewport), r = I.useCallback((i) => i.clientHeight, []);
  return Lf(s, r);
}, Yf = I.forwardRef(({ autoScroll: s, scrollToBottomOnRunStart: r, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: l, children: c, ...d }, h) => {
  const p = lv({
    autoScroll: s,
    scrollToBottomOnRunStart: r,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: l
  }), m = uv(), _ = Wi(h, p, m);
  return y.jsx(pr.div, { ...d, ref: _, children: c });
});
Yf.displayName = "ThreadPrimitive.ViewportScrollable";
const Qf = I.forwardRef(({ turnAnchor: s, ...r }, i) => y.jsx(Mf, { options: { turnAnchor: s }, children: y.jsx(Yf, { ...r, ref: i }) }));
Qf.displayName = "ThreadPrimitive.Viewport";
const Gf = (s, r) => s.Message === r.Message && s.EditComposer === r.EditComposer && s.UserEditComposer === r.UserEditComposer && s.AssistantEditComposer === r.AssistantEditComposer && s.SystemEditComposer === r.SystemEditComposer && s.UserMessage === r.UserMessage && s.AssistantMessage === r.AssistantMessage && s.SystemMessage === r.SystemMessage, cv = () => null, dv = (s, r, i) => {
  switch (r) {
    case "user":
      return i ? s.UserEditComposer ?? s.EditComposer ?? s.UserMessage ?? s.Message : s.UserMessage ?? s.Message;
    case "assistant":
      return i ? s.AssistantEditComposer ?? s.EditComposer ?? s.AssistantMessage ?? s.Message : s.AssistantMessage ?? s.Message;
    case "system":
      return i ? s.SystemEditComposer ?? s.EditComposer ?? s.SystemMessage ?? s.Message : s.SystemMessage ?? cv;
    default:
      const l = r;
      throw new Error(`Unknown message role: ${l}`);
  }
}, fv = ({ components: s }) => {
  const r = we(({ message: c }) => c.role), i = we(({ message: c }) => c.composer.isEditing), l = dv(s, r, i);
  return y.jsx(l, {});
}, Kf = I.memo(({ index: s, components: r }) => y.jsx(oy, { index: s, children: y.jsx(fv, { components: r }) }), (s, r) => s.index === r.index && Gf(s.components, r.components));
Kf.displayName = "ThreadPrimitive.MessageByIndex";
const Jf = ({ components: s }) => {
  const r = we(({ thread: l }) => l.messages.length);
  return I.useMemo(() => r === 0 ? null : Array.from({ length: r }, (l, c) => y.jsx(Kf, { index: c, components: s }, c)), [r, s]);
};
Jf.displayName = "ThreadPrimitive.Messages";
const hv = I.memo(Jf, (s, r) => Gf(s.components, r.components)), pv = ({ prompt: s, send: r, clearComposer: i = !0, autoSend: l, method: c }) => {
  const d = yt(), h = we(({ thread: _ }) => _.isDisabled), p = r ?? l ?? !1, m = I.useCallback(() => {
    const _ = d.thread().getState().isRunning;
    if (p && !_)
      d.thread().append(s), i && d.composer().setText("");
    else if (i)
      d.composer().setText(s);
    else {
      const E = d.composer().getState().text;
      d.composer().setText(E.trim() ? `${E} ${s}` : s);
    }
  }, [d, p, i, s]);
  return h ? null : m;
}, mv = vl("ThreadPrimitive.Suggestion", pv, ["prompt", "send", "clearComposer", "autoSend", "method"]), gv = 1, gt = Object.freeze({
  product_card: "product_card",
  product_carousel: "product_carousel",
  ritual_card: "ritual_card",
  reading_summary: "reading_summary",
  collection_link: "collection_link",
  next_steps: "next_steps"
}), ut = Object.freeze({
  [gt.product_card]: "display_product_card",
  [gt.product_carousel]: "display_product_carousel",
  [gt.ritual_card]: "display_ritual_card",
  [gt.reading_summary]: "display_reading_summary",
  [gt.collection_link]: "display_collection_link",
  [gt.next_steps]: "display_next_steps"
}), yv = Object.freeze(
  Object.fromEntries(
    Object.entries(ut).map(([s, r]) => [r, s])
  )
), qf = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, Xf = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, Kt = (s) => typeof s == "object" && s !== null && !Array.isArray(s), be = (s, r = "") => typeof s != "string" ? r : s.trim() || r, Te = (s) => be(s) || null, hs = (s) => {
  const r = be(s);
  return r ? /^(https?:\/\/|\/)/i.test(r) ? r : `/${r.replace(/^\/+/, "")}` : null;
}, vv = (s, r = !0) => typeof s == "boolean" ? s : r, xl = (s, r = 6) => Array.isArray(s) ? s.map((i) => be(typeof i == "string" ? i : i?.label || i?.title || i?.text)).filter(Boolean).slice(0, r) : [], Zf = (s) => {
  if (!Kt(s))
    return null;
  const r = be(s.title, "Untitled crystal"), i = hs(s.url);
  return {
    id: Te(s.id || s.productId),
    handle: Te(s.handle),
    title: r,
    url: i || (s.handle ? `/products/${s.handle}` : null),
    image: hs(s.image || s.featuredImage || s.imageUrl),
    price: Te(s.price || s.priceText),
    compareAtPrice: Te(s.compareAtPrice || s.compareAt),
    badge: Te(s.badge || s.tag || s.intent || s.eyebrow),
    summary: Te(s.summary || s.description || s.body),
    reason: Te(s.reason),
    note: Te(s.note || s.ritual || s.howToUse || s.how_to_use),
    ctaLabel: Te(s.ctaLabel || s.buttonLabel || s.linkLabel),
    merchandiseId: Te(s.merchandiseId || s.variantId),
    variantId: Te(s.variantId || s.merchandiseId),
    available: vv(s.available, !0)
  };
}, eh = (s, r = 6) => Array.isArray(s) ? s.map(Zf).filter(Boolean).slice(0, r) : [], _v = (s) => {
  if (!Kt(s))
    return null;
  const r = Zf(s.product || s);
  return r ? {
    eyebrow: be(s.eyebrow || s.kicker || s.intent, "Prescription"),
    reason: Te(s.reason || r.reason),
    note: Te(s.note || s.ritual || r.note),
    ctaLabel: be(s.ctaLabel || s.buttonLabel || r.ctaLabel, "View crystal"),
    product: r
  } : null;
}, Sv = (s) => {
  if (!Kt(s))
    return null;
  const r = eh(s.products, 8);
  return r.length === 0 ? null : {
    eyebrow: be(s.eyebrow || s.kicker, "Matched for you"),
    title: be(s.title, "Recommended crystals"),
    reason: Te(s.reason || s.description),
    browseUrl: hs(s.browseUrl || s.url),
    browseLabel: be(s.browseLabel || s.ctaLabel, "Browse all"),
    products: r
  };
}, wv = (s) => {
  if (!Kt(s))
    return null;
  const r = xl(s.steps, 6);
  return r.length === 0 && !be(s.summary) ? null : {
    eyebrow: be(s.eyebrow || s.kicker, "Ritual"),
    title: be(s.title, "How to work with this energy"),
    summary: Te(s.summary || s.reason || s.description),
    duration: Te(s.duration),
    steps: r,
    note: Te(s.note),
    disclaimer: Te(s.disclaimer),
    linkedProducts: eh(s.linkedProducts || s.products, 3)
  };
}, xv = (s) => {
  if (!Kt(s))
    return null;
  const r = be(s.summary || s.description);
  return r ? {
    eyebrow: be(s.eyebrow || s.kicker, "Energy blueprint"),
    title: be(s.title, "What your energy is asking for"),
    summary: r,
    energyFocus: Te(s.energyFocus || s.energy || s.focus),
    highlights: xl(s.highlights || s.bullets || s.keyPoints, 5),
    disclaimer: Te(s.disclaimer)
  } : null;
}, Ev = (s) => {
  if (!Kt(s))
    return null;
  const r = hs(s.url || s.browseUrl);
  return r ? {
    eyebrow: be(s.eyebrow || s.kicker, "Browse deeper"),
    title: be(s.title, "Open the full collection"),
    description: Te(s.description || s.reason),
    url: r,
    label: be(s.label || s.ctaLabel, "Shop collection"),
    image: hs(s.image || s.imageUrl)
  } : null;
}, kv = (s) => {
  if (!Kt(s))
    return null;
  const r = xl(s.steps, 5);
  return r.length === 0 ? null : {
    eyebrow: be(s.eyebrow || s.kicker, "Next steps"),
    title: be(s.title, "What to do next"),
    steps: r,
    closing: Te(s.closing || s.note)
  };
}, Cv = Object.freeze({
  [gt.product_card]: {
    toolName: ut.product_card,
    normalizeProps: _v
  },
  [gt.product_carousel]: {
    toolName: ut.product_carousel,
    normalizeProps: Sv
  },
  [gt.ritual_card]: {
    toolName: ut.ritual_card,
    normalizeProps: wv
  },
  [gt.reading_summary]: {
    toolName: ut.reading_summary,
    normalizeProps: xv
  },
  [gt.collection_link]: {
    toolName: ut.collection_link,
    normalizeProps: Ev
  },
  [gt.next_steps]: {
    toolName: ut.next_steps,
    normalizeProps: kv
  }
}), ps = (s, r = "component") => {
  if (!Kt(s))
    return null;
  const i = be(
    s.component || s.componentType || yv[s.toolName]
  ), l = Cv[i];
  if (!l)
    return null;
  const c = l.normalizeProps(
    s.props || s.result?.props || s.result || s.args?.props || s.args || s
  );
  if (!c)
    return null;
  const d = be(s.id || s.toolCallId, `${l.toolName}-${r}`);
  return {
    type: "component",
    component: i,
    toolName: l.toolName,
    id: d,
    version: gv,
    props: c
  };
}, fr = (s = [], r = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const l of [...s, ...r]) {
    const c = ps(l, i.size);
    if (!c)
      continue;
    const d = `${c.toolName}:${c.id}`;
    i.set(d, c);
  }
  return [...i.values()];
}, th = (s) => {
  const r = [], i = (l, c = 0) => {
    if (c > 3 || l == null)
      return;
    if (Array.isArray(l)) {
      l.forEach((h, p) => {
        const m = ps(h, `${c}-${p}`);
        m && r.push(m);
      });
      return;
    }
    const d = ps(l, `${c}`);
    if (d) {
      r.push(d);
      return;
    }
    Kt(l) && (i(l.components, c + 1), i(l.component, c + 1), i(l.ui?.components, c + 1), i(l.payload?.components, c + 1), i(l.data?.components, c + 1), i(l.data?.ui?.components, c + 1), i(l.metadata?.components, c + 1), i(l.metadata?.ui?.components, c + 1));
  };
  return i(s), fr([], r);
}, Tv = (s, r = "component") => {
  const i = ps(s, r);
  if (!i)
    return null;
  const l = {
    component: i.component,
    version: i.version,
    props: i.props
  };
  return {
    type: "tool-call",
    toolCallId: i.id,
    toolName: i.toolName,
    args: l,
    argsText: JSON.stringify(l),
    result: {
      component: i.component,
      version: i.version,
      props: i.props
    }
  };
}, bv = (s = []) => Array.isArray(s) ? s.map((r, i) => Tv(r, i)).filter(Boolean) : [], Iv = (s) => ps(s), Rv = (s) => {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}, Nv = (s = "") => {
  let r = String(s || ""), i = [];
  const l = (c) => {
    const d = [...r.matchAll(c)];
    if (d.length !== 0) {
      for (const h of d) {
        const p = Rv(h[1]);
        p && (i = fr(i, th(p)));
      }
      r = r.replace(c, "").trim();
    }
  };
  return l(qf()), l(Xf()), {
    answer: r.replace(/\n{3,}/g, `

`).trim(),
    components: i
  };
}, Mv = (s = "") => {
  const r = qf(), i = Xf();
  let l = String(s || "").replace(r, "").replace(i, "");
  const c = l.toLowerCase(), d = c.indexOf("```askcrystal-ui");
  d !== -1 && (l = l.slice(0, d));
  const h = c.indexOf("<askcrystal-ui>");
  return h !== -1 && (l = l.slice(0, h)), l.trimEnd();
};
function On(s) {
  return Iv({
    toolName: s.toolName,
    result: s.result,
    args: s.args,
    toolCallId: s.toolCallId
  });
}
function mr({ eyebrow: s, title: r, children: i, className: l = "" }) {
  return /* @__PURE__ */ y.jsxs("section", { className: `ac-tool ${l}`.trim(), children: [
    /* @__PURE__ */ y.jsxs("header", { className: "ac-tool__header", children: [
      s ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__eyebrow", children: s }) : null,
      r ? /* @__PURE__ */ y.jsx("h3", { className: "ac-tool__title", children: r }) : null
    ] }),
    i
  ] });
}
function nh({ image: s, title: r, compact: i = !1 }) {
  return /* @__PURE__ */ y.jsx("div", { className: `ac-tool-product__media${i ? " ac-tool-product__media--compact" : ""}`, children: s ? /* @__PURE__ */ y.jsx("img", { src: s, alt: r, loading: "lazy" }) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-product__placeholder", children: "Crystal" }) });
}
function rh({ product: s, ctaLabel: r }) {
  return /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__meta", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__price-group", children: [
      s.price ? /* @__PURE__ */ y.jsx("span", { className: "ac-tool-product__price", children: s.price }) : null,
      s.compareAtPrice ? /* @__PURE__ */ y.jsx("span", { className: "ac-tool-product__compare", children: s.compareAtPrice }) : null
    ] }),
    /* @__PURE__ */ y.jsx("span", { className: "ac-tool-product__cta", children: r || "View crystal" })
  ] });
}
function Av(s) {
  const r = On(s);
  if (!r)
    return null;
  const {
    eyebrow: i,
    reason: l,
    note: c,
    ctaLabel: d,
    product: h
  } = r.props, p = /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(nh, { image: h.image, title: h.title }),
    /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__body", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__heading", children: [
        h.badge ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__badge", children: h.badge }) : null,
        /* @__PURE__ */ y.jsx("h4", { className: "ac-tool-product__title", children: h.title })
      ] }),
      l ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__reason", children: l }) : null,
      h.summary ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__summary", children: h.summary }) : null,
      c ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__note", children: c }) : null,
      /* @__PURE__ */ y.jsx(rh, { product: h, ctaLabel: d })
    ] })
  ] });
  return /* @__PURE__ */ y.jsx(mr, { eyebrow: i, className: "ac-tool--product-card", children: h.url ? /* @__PURE__ */ y.jsx("a", { className: "ac-tool-product ac-tool-product--single", href: h.url, children: p }) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-product ac-tool-product--single", children: p }) });
}
function Pv(s) {
  const r = On(s);
  if (!r)
    return null;
  const {
    eyebrow: i,
    title: l,
    reason: c,
    browseUrl: d,
    browseLabel: h,
    products: p
  } = r.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--carousel", children: [
    c ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: c }) : null,
    /* @__PURE__ */ y.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": l, children: p.map((m, _) => {
      const E = /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
        /* @__PURE__ */ y.jsx(nh, { image: m.image, title: m.title, compact: !0 }),
        /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-carousel__copy", children: [
          m.badge ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__badge", children: m.badge }) : null,
          /* @__PURE__ */ y.jsx("h4", { className: "ac-tool-product__title", children: m.title }),
          m.reason || m.summary ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__summary", children: m.reason || m.summary }) : null,
          /* @__PURE__ */ y.jsx(rh, { product: m, ctaLabel: m.ctaLabel || "View" })
        ] })
      ] });
      return m.url ? /* @__PURE__ */ y.jsx("a", { className: "ac-tool-carousel__card", href: m.url, role: "listitem", children: E }, m.id || m.handle || _) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-carousel__card", role: "listitem", children: E }, m.id || m.handle || _);
    }) }),
    d ? /* @__PURE__ */ y.jsx("div", { className: "ac-tool__footer", children: /* @__PURE__ */ y.jsx("a", { className: "ac-tool__footer-link", href: d, children: h }) }) : null
  ] });
}
function jv(s) {
  const r = On(s);
  if (!r)
    return null;
  const {
    eyebrow: i,
    title: l,
    summary: c,
    duration: d,
    steps: h,
    note: p,
    disclaimer: m,
    linkedProducts: _
  } = r.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--ritual", children: [
    c ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: c }) : null,
    d ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__detail", children: d }) : null,
    /* @__PURE__ */ y.jsx("ol", { className: "ac-ritual-steps", children: h.map((E) => /* @__PURE__ */ y.jsxs("li", { className: "ac-ritual-steps__item", children: [
      /* @__PURE__ */ y.jsx("span", { className: "ac-ritual-steps__dot", "aria-hidden": "true" }),
      /* @__PURE__ */ y.jsx("span", { children: E })
    ] }, E)) }),
    _.length > 0 ? /* @__PURE__ */ y.jsx("div", { className: "ac-tool-chip-row", role: "list", "aria-label": "Linked products", children: _.map((E, b) => E.url ? /* @__PURE__ */ y.jsx("a", { className: "ac-tool-chip", href: E.url, role: "listitem", children: E.title }, E.id || E.handle || b) : /* @__PURE__ */ y.jsx("span", { className: "ac-tool-chip", role: "listitem", children: E.title }, E.id || E.handle || b)) }) : null,
    p ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__note", children: p }) : null,
    m ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__disclaimer", children: m }) : null
  ] });
}
function Lv(s) {
  const r = On(s);
  if (!r)
    return null;
  const {
    eyebrow: i,
    title: l,
    summary: c,
    energyFocus: d,
    highlights: h,
    disclaimer: p
  } = r.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--summary", children: [
    d ? /* @__PURE__ */ y.jsx("p", { className: "ac-summary__focus", children: d }) : null,
    /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: c }),
    h.length > 0 ? /* @__PURE__ */ y.jsx("ul", { className: "ac-summary__list", children: h.map((m) => /* @__PURE__ */ y.jsx("li", { children: m }, m)) }) : null,
    p ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__disclaimer", children: p }) : null
  ] });
}
function Ov(s) {
  const r = On(s);
  if (!r)
    return null;
  const {
    eyebrow: i,
    title: l,
    description: c,
    url: d,
    label: h,
    image: p
  } = r.props, m = /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-collection__copy", children: [
      i ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__eyebrow", children: i }) : null,
      /* @__PURE__ */ y.jsx("h3", { className: "ac-tool__title", children: l }),
      c ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: c }) : null
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "ac-tool-collection__action", children: /* @__PURE__ */ y.jsx("span", { children: h }) }),
    p ? /* @__PURE__ */ y.jsx("div", { className: "ac-tool-collection__image", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("img", { src: p, alt: "", loading: "lazy" }) }) : null
  ] });
  return /* @__PURE__ */ y.jsx("section", { className: "ac-tool ac-tool--collection", children: d ? /* @__PURE__ */ y.jsx("a", { className: "ac-tool-collection", href: d, children: m }) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-collection", children: m }) });
}
function zv(s) {
  const r = On(s);
  if (!r)
    return null;
  const {
    eyebrow: i,
    title: l,
    steps: c,
    closing: d
  } = r.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--next-steps", children: [
    /* @__PURE__ */ y.jsx("ul", { className: "ac-next-steps", children: c.map((h, p) => /* @__PURE__ */ y.jsxs("li", { className: "ac-next-steps__item", children: [
      /* @__PURE__ */ y.jsx("span", { className: "ac-next-steps__index", children: p + 1 }),
      /* @__PURE__ */ y.jsx("span", { children: h })
    ] }, h)) }),
    d ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__note", children: d }) : null
  ] });
}
function Dv(s) {
  const r = On(s);
  return r ? /* @__PURE__ */ y.jsx(mr, { eyebrow: "Storefront", title: r.component.replace(/_/g, " "), children: /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function Bv({ children: s }) {
  return /* @__PURE__ */ y.jsx("div", { className: "ac-tool-group", children: s });
}
const Fv = {
  tools: {
    by_name: {
      [ut.product_card]: Av,
      [ut.product_carousel]: Pv,
      [ut.ritual_card]: jv,
      [ut.reading_summary]: Lv,
      [ut.collection_link]: Ov,
      [ut.next_steps]: zv
    },
    Fallback: Dv
  },
  ToolGroup: Bv
}, sh = "[data-askcrystal-homepage-root]", Fi = /* @__PURE__ */ new Map(), Za = "askcrystal-main-thread", Uv = "http://localhost:8787", Jd = "askcrystal-theme-session-id";
let qd = 0;
function $v(s) {
  const r = document.getElementById(s);
  if (!r) return null;
  try {
    return JSON.parse(r.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function Gi(s = []) {
  return s.map((r) => r.type === "text" || r.type === "reasoning" ? r.text : "").join(" ").trim();
}
function el(s) {
  const r = s?.answer || s?.delta || s?.text || s?.message || s?.reply || s?.output || s?.data?.answer || s?.data?.text;
  return typeof r == "string" ? r : "";
}
function Hv(s) {
  return /^(https?:\/\/|mailto:|\/)/i.test(s);
}
function Pn(s, r = "inline") {
  const i = [], l = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let c = 0, d, h = 0;
  for (; (d = l.exec(s)) !== null; ) {
    d.index > c && i.push(s.slice(c, d.index));
    const p = `${r}-${h}`;
    if (d[2] && d[3]) {
      const m = d[3].trim();
      i.push(
        Hv(m) ? /* @__PURE__ */ y.jsx("a", { href: m, target: m.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ y.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ y.jsx("strong", { children: Pn(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ y.jsx("em", { children: Pn(d[6], `${p}-em`) }, p));
    c = l.lastIndex, h += 1;
  }
  return c < s.length && i.push(s.slice(c)), i;
}
function Vv({ text: s = "" }) {
  const r = String(s).replace(/\r\n/g, `
`).split(`
`), i = [];
  let l = 0;
  for (; l < r.length; ) {
    const c = r[l];
    if (!c.trim()) {
      l += 1;
      continue;
    }
    if (c.match(/^```(\w+)?\s*$/)) {
      const _ = [];
      for (l += 1; l < r.length && !/^```\s*$/.test(r[l]); )
        _.push(r[l]), l += 1;
      l < r.length && (l += 1), i.push(
        /* @__PURE__ */ y.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ y.jsx("code", { children: _.join(`
`) }) }, `code-${l}`)
      );
      continue;
    }
    const h = c.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const _ = `h${h[1].length + 2}`;
      i.push(
        /* @__PURE__ */ y.jsx(_, { children: Pn(h[2], `heading-${l}`) }, `heading-${l}`)
      ), l += 1;
      continue;
    }
    if (/^\s*[-*]\s+/.test(c)) {
      const _ = [];
      for (; l < r.length && /^\s*[-*]\s+/.test(r[l]); )
        _.push(r[l].replace(/^\s*[-*]\s+/, "")), l += 1;
      i.push(
        /* @__PURE__ */ y.jsx("ul", { children: _.map((E, b) => /* @__PURE__ */ y.jsx("li", { children: Pn(E, `ul-${l}-${b}`) }, `ul-${l}-${b}`)) }, `ul-${l}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(c)) {
      const _ = [];
      for (; l < r.length && /^\s*\d+\.\s+/.test(r[l]); )
        _.push(r[l].replace(/^\s*\d+\.\s+/, "")), l += 1;
      i.push(
        /* @__PURE__ */ y.jsx("ol", { children: _.map((E, b) => /* @__PURE__ */ y.jsx("li", { children: Pn(E, `ol-${l}-${b}`) }, `ol-${l}-${b}`)) }, `ol-${l}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(c)) {
      const _ = [];
      for (; l < r.length && /^\s*>\s?/.test(r[l]); )
        _.push(r[l].replace(/^\s*>\s?/, "")), l += 1;
      i.push(
        /* @__PURE__ */ y.jsx("blockquote", { children: _.map((E, b) => /* @__PURE__ */ y.jsx("p", { children: Pn(E, `quote-${l}-${b}`) }, `quote-${l}-${b}`)) }, `quote-${l}`)
      );
      continue;
    }
    const p = [];
    for (; l < r.length && r[l].trim() && !/^```/.test(r[l]) && !/^(#{1,3})\s+/.test(r[l]) && !/^\s*[-*]\s+/.test(r[l]) && !/^\s*\d+\.\s+/.test(r[l]) && !/^\s*>\s?/.test(r[l]); )
      p.push(r[l].trim()), l += 1;
    const m = p.join(" ");
    i.push(
      /* @__PURE__ */ y.jsx("p", { children: Pn(m, `p-${l}`) }, `p-${l}`)
    );
  }
  return /* @__PURE__ */ y.jsx("div", { className: "ac-markdown", children: i });
}
function Wv({ statusText: s }) {
  return /* @__PURE__ */ y.jsxs("div", { className: "ac-thinking", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ y.jsx("span", { className: "ac-thinking__orb", "aria-hidden": "true" }),
    /* @__PURE__ */ y.jsx("span", { className: "ac-thinking__text", children: s || "Tuning in..." }),
    /* @__PURE__ */ y.jsxs("span", { className: "ac-thinking__dots", "aria-hidden": "true", children: [
      /* @__PURE__ */ y.jsx("span", {}),
      /* @__PURE__ */ y.jsx("span", {}),
      /* @__PURE__ */ y.jsx("span", {})
    ] })
  ] });
}
function Yv({ statusText: s }) {
  return s ? /* @__PURE__ */ y.jsxs("div", { className: "ac-live-status", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ y.jsx("span", { className: "ac-live-status__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ y.jsx("span", { className: "ac-live-status__text", children: s })
  ] }) : null;
}
function Qv(s) {
  return s ? typeof s == "string" ? {
    stage: "",
    tool: "",
    message: s,
    taskId: ""
  } : {
    stage: typeof s.stage == "string" ? s.stage : "",
    tool: typeof s.tool == "string" ? s.tool : "",
    message: typeof s.message == "string" ? s.message : "",
    taskId: il(s)
  } : {
    stage: "",
    tool: "",
    message: "",
    taskId: ""
  };
}
function ih(s) {
  for (let r = s.length - 1; r >= 0; r -= 1) {
    const i = s[r];
    if (i.role === "user")
      return Gi(i.content);
  }
  return "";
}
function tl(s, r) {
  return s.find((i) => r(i));
}
function Gv({ matchedIntention: s, fallbackProduct: r, products: i }) {
  return s?.product ? fr([], [
    {
      component: "reading_summary",
      id: `summary-${s.key}`,
      props: {
        title: "What your energy is asking for",
        summary: s.summary,
        energyFocus: s.energyFocus,
        highlights: s.highlights,
        disclaimer: "Spiritual wellness guidance only. Let your own judgment lead the final choice."
      }
    },
    {
      component: s.key === "calm" ? "product_card" : "product_carousel",
      id: `products-${s.key}`,
      props: s.key === "calm" ? {
        eyebrow: "Best first match",
        reason: s.cardReason,
        note: s.ritual,
        product: s.product
      } : {
        eyebrow: "Curated shelf",
        title: s.carouselTitle,
        reason: s.cardReason,
        products: [
          s.product,
          ...i.filter((l) => l.id !== s.product.id).slice(0, 2)
        ]
      }
    },
    {
      component: "ritual_card",
      id: `ritual-${s.key}`,
      props: {
        title: s.ritualTitle,
        summary: s.ritualSummary,
        steps: s.ritualSteps,
        linkedProducts: s.product ? [s.product] : [],
        note: s.ritual
      }
    }
  ]) : fr([], [
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
    r ? {
      component: "product_card",
      id: "fallback-product",
      props: {
        eyebrow: "A gentle starting point",
        reason: "This is a strong first shelf item while the guide narrows your intention.",
        product: r
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
function Kv(s, r) {
  const i = s.toLowerCase(), c = [
    {
      key: "calm",
      test: /sleep|rest|anxious|stress|calm|ground|peace/,
      lead: "I would start by softening the energy around your nervous system before recommending anything too activating.",
      product: tl(r, (m) => /amethyst|selenite|moonstone|calm|sleep/i.test(`${m.title} ${m.summary || ""}`)) || r[0],
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
      product: tl(r, (m) => /rose|heart|love|pink/i.test(`${m.title} ${m.summary || ""}`)) || r[0],
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
      product: tl(r, (m) => /citrine|pyrite|tiger|success|abundance/i.test(`${m.title} ${m.summary || ""}`)) || r[0],
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
  ].find((m) => m.test.test(i)), d = r[0], h = Gv({
    matchedIntention: c,
    fallbackProduct: d,
    products: r
  });
  return c?.product ? {
    answer: `${c.lead}

A likely fit from the current shelf is ${c.product.title}. ${c.product.summary || "It looks aligned with the intention you mentioned."}

${c.ritual}`,
    components: h
  } : {
    answer: `I can already support the guided-storefront shape we want here: start with the feeling, clarify the intention, and only then move into product curation.

${d ? `A natural first shelf item to explore is ${d.title}. ${d.summary || "It is a strong general starting point while we learn more about the user."}` : "Once the catalog feed is connected, this space can surface a small set of best-fit crystals without leaving the thread."}

If you tell me what is most present right now, I can narrow the reading and the recommendation together.`,
    components: h
  };
}
function Jv(s) {
  const r = typeof s == "string" ? s.trim() : "";
  if (!r) return "";
  if (!/<\/?(minimax:tool_call|invoke|action_input|parameter)\b/i.test(r))
    return r;
  const l = r.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/<\/?[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
  return l && !/\b(search|browse|checking|catalog)\b/i.test(l) ? l : [
    "I tried to check the shelf for you, but the live catalog result was not available in this moment.",
    "For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”",
    "If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely."
  ].join(`

`);
}
function Xd(s, r = []) {
  const i = Nv(s), l = fr(r, i.components), c = Jv(i.answer);
  return c ? {
    answer: c,
    components: l
  } : l.length > 0 ? {
    answer: "",
    components: l
  } : {
    answer: "AskCrystal finished the request, but no guidance text came back. Please try again.",
    components: []
  };
}
function ur({ text: s = "", components: r = [] } = {}) {
  const i = [], l = Mv(s).trim();
  return l && i.push({
    type: "text",
    text: l
  }), i.push(...bv(r)), i;
}
function qv(s) {
  return /^https?:\/\//i.test(s);
}
function Ui(s) {
  return s ? qv(s) ? s : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && s.startsWith("/apps/") ? `${Uv}${s}` : s : "";
}
function Xv(s) {
  return s ? s.endsWith("/stream") ? Ui(s) : Ui(`${s.replace(/\/$/, "")}/stream`) : "";
}
function Zv(s) {
  return s ? s.endsWith("/stop") ? Ui(s) : Ui(`${s.replace(/\/$/, "")}/stop`) : "";
}
function e_() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  try {
    const s = window.localStorage.getItem(Jd);
    if (s) return s;
    const r = ms("session");
    return window.localStorage.setItem(Jd, r), r;
  } catch {
    return ms("session");
  }
}
function t_(s) {
  const r = [];
  let i = s.replace(/\r\n/g, `
`);
  for (; ; ) {
    const l = i.indexOf(`

`);
    if (l === -1) break;
    const c = i.slice(0, l);
    i = i.slice(l + 2);
    let d = "message";
    const h = [];
    if (c.split(`
`).forEach((p) => {
      p.startsWith("event:") && (d = p.slice(6).trim() || d), p.startsWith("data:") && h.push(p.slice(5).trim());
    }), !!h.length)
      try {
        r.push({
          event: d,
          payload: JSON.parse(h.join(`
`))
        });
      } catch {
      }
  }
  return { events: r, remaining: i };
}
function il(s) {
  const r = s?.taskId || s?.task_id || s?.data?.taskId || s?.data?.task_id;
  return typeof r == "string" ? r : "";
}
function n_() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const s = new Error("The operation was aborted.");
  return s.name = "AbortError", s;
}
function Yt(s) {
  if (s?.aborted)
    throw n_();
}
async function r_({ apiEndpoint: s, taskId: r, sessionId: i, conversationId: l }) {
  if (!(!s || !r))
    try {
      await fetch(Zv(s), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskId: r,
          sessionId: i,
          conversationId: l
        }),
        keepalive: !0
      });
    } catch (c) {
      console.error("[AskCrystal] Stop request failed.", c);
    }
}
async function s_({ apiEndpoint: s, messages: r, abortSignal: i, conversationId: l, sessionId: c, onStatus: d, onDelta: h, onComponents: p }) {
  Yt(i);
  const m = await fetch(Xv(s), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: ih(r),
      conversationId: l,
      sessionId: c
    }),
    signal: i
  });
  if (!m.ok) {
    let H = `Proxy returned ${m.status}`;
    try {
      const G = await m.json();
      H = G?.error || G?.message || H;
    } catch {
    }
    throw new Error(H);
  }
  if (!m.body)
    throw new Error("The proxy did not return a readable stream.");
  const _ = m.body.getReader(), E = new TextDecoder();
  let b = "", C = "", R = [], z = l || null;
  for (; ; ) {
    Yt(i);
    const { done: H, value: G } = await _.read();
    if (H) break;
    Yt(i), b += E.decode(G, { stream: !0 });
    const se = t_(b);
    b = se.remaining;
    for (const Y of se.events) {
      if (Yt(i), Y.event === "status" && typeof Y.payload?.message == "string" && (Yt(i), d?.(Y.payload)), Y.event === "error")
        throw new Error(Y.payload?.error || Y.payload?.message || "The proxy stream failed.");
      const J = th(Y.payload);
      if (J.length && (Yt(i), R = fr(R, J), p?.(R, J, Y.payload), z = Y.payload?.conversationId || Y.payload?.conversation_id || z), Y.event === "replace") {
        Yt(i);
        const X = el(Y.payload);
        X && (C = X, h?.("", C, Y.payload)), z = Y.payload?.conversationId || Y.payload?.conversation_id || z;
      }
      if (["delta", "message", "agent_message"].includes(Y.event)) {
        Yt(i);
        const X = el(Y.payload);
        X && (C += X, h?.(X, C, Y.payload)), z = Y.payload?.conversationId || Y.payload?.conversation_id || z;
      }
      if (Y.event === "complete") {
        Yt(i);
        const Ee = el(Y.payload) || C, ne = Xd(Ee, R);
        return {
          answer: ne.answer,
          components: ne.components,
          conversationId: Y.payload?.conversationId || Y.payload?.conversation_id || z || null
        };
      }
    }
  }
  if (C) {
    const H = Xd(C, R);
    return {
      answer: H.answer,
      components: H.components,
      conversationId: z
    };
  }
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function ms(s = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${s}-${crypto.randomUUID()}` : (qd += 1, `${s}-${Date.now()}-${qd}`);
}
function i_(s) {
  return {
    id: ms("user"),
    role: "user",
    createdAt: /* @__PURE__ */ new Date(),
    content: s.content || [],
    attachments: s.attachments || [],
    metadata: s.metadata || {
      custom: {}
    }
  };
}
function Mn({
  id: s = ms("assistant"),
  text: r = "",
  parts: i = null,
  components: l = [],
  status: c,
  error: d,
  statusText: h = "",
  statusStage: p = "",
  statusTool: m = ""
}) {
  return {
    id: s,
    role: "assistant",
    createdAt: /* @__PURE__ */ new Date(),
    content: Array.isArray(i) ? i : ur({ text: r, components: l }),
    status: c,
    metadata: {
      unstable_state: null,
      unstable_annotations: [],
      unstable_data: l,
      steps: [],
      custom: {
        ...d ? { error: d } : {},
        ...h ? { statusText: h } : {},
        ...p ? { statusStage: p } : {},
        ...m ? { statusTool: m } : {}
      }
    }
  };
}
function ol({ id: s, text: r = "", components: i = [] }) {
  const c = !!(typeof r == "string" ? r.trim() : "") || i.length > 0;
  return Mn({
    id: s,
    parts: ur({
      text: c ? r : "Reply stopped.",
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
function o_(s, r) {
  if (!Array.isArray(s) || !r || s.length === 0)
    return Array.isArray(s) ? [...s] : [];
  const i = [...s], l = i[i.length - 1];
  return l?.role === "assistant" && l?.status?.type === "running" && (i[i.length - 1] = ol({
    id: l.id,
    text: Gi(l.content || l.parts || []),
    components: l.metadata?.unstable_data || []
  })), i;
}
async function a_({ config: s, messages: r, abortSignal: i, conversationId: l, sessionId: c, onStatus: d, onDelta: h, onComponents: p }) {
  const m = ih(r);
  if (s.runtimeMode === "proxy" && s.apiEndpoint)
    try {
      return await s_({
        apiEndpoint: s.apiEndpoint,
        messages: r,
        abortSignal: i,
        conversationId: l,
        sessionId: c,
        onStatus: d,
        onDelta: h,
        onComponents: p
      });
    } catch (E) {
      throw E?.name === "AbortError" || console.error("[AskCrystal] Proxy runtime failed.", E), E;
    }
  const _ = Kv(m, s.products);
  return {
    answer: _.answer,
    components: _.components || [],
    conversationId: l
  };
}
function l_(s) {
  const [r, i] = I.useState([]), [l, c] = I.useState(!1), d = I.useRef(null), h = I.useRef(""), p = I.useRef(""), m = I.useRef(!1), _ = I.useRef(null), E = I.useRef(r), b = I.useRef(e_());
  I.useEffect(() => {
    E.current = r;
  }, [r]);
  const C = I.useCallback((se) => {
    i(o_(se, m.current));
  }, []), R = I.useCallback((se, Y) => {
    i(
      (J) => J.map((X) => X.id !== se ? X : Y(X))
    );
  }, []), z = I.useCallback(async () => {
    const se = d.current, Y = h.current, J = p.current, X = _.current, Ee = b.current;
    se?.abort(), m.current = !0, c(!1), Y && R(
      Y,
      (ne) => ol({
        id: ne.id,
        text: Gi(ne.content || []),
        components: ne.metadata?.unstable_data || []
      })
    ), !(!J || !s.apiEndpoint) && await r_({
      apiEndpoint: s.apiEndpoint,
      taskId: J,
      sessionId: Ee,
      conversationId: X
    });
  }, [s.apiEndpoint, R]), H = I.useCallback(
    async (se) => {
      if (se.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      const Y = i_(se), J = ms("assistant"), X = new AbortController(), Ee = Mn({
        id: J,
        status: {
          type: "running"
        },
        statusText: "Tuning in...",
        statusStage: "listen"
      }), ne = [...E.current, Y];
      d.current = X, h.current = J, p.current = "", m.current = !1, c(!0), i([...ne, Ee]);
      let ue = "", q = [];
      try {
        const fe = await a_({
          config: s,
          messages: ne,
          abortSignal: X.signal,
          conversationId: _.current,
          sessionId: b.current,
          onStatus: (Ae) => {
            if (X.signal.aborted) return;
            const Ie = Qv(Ae);
            Ie.taskId && (p.current = Ie.taskId), R(
              J,
              () => Mn({
                id: J,
                parts: ur({
                  text: ue,
                  components: q
                }),
                components: q,
                status: {
                  type: "running"
                },
                statusText: Ie.message,
                statusStage: Ie.stage,
                statusTool: Ie.tool
              })
            );
          },
          onDelta: (Ae, Ie, Je) => {
            if (X.signal.aborted) return;
            const Pe = il(Je);
            Pe && (p.current = Pe), ue = Ie, R(
              J,
              () => Mn({
                id: J,
                parts: ur({
                  text: Ie,
                  components: q
                }),
                components: q,
                status: {
                  type: "running"
                },
                statusText: "",
                statusStage: "",
                statusTool: ""
              })
            );
          },
          onComponents: (Ae, Ie, Je) => {
            if (X.signal.aborted) return;
            const Pe = il(Je);
            Pe && (p.current = Pe), q = Ae, R(
              J,
              () => Mn({
                id: J,
                parts: ur({
                  text: ue,
                  components: Ae
                }),
                components: Ae,
                status: {
                  type: "running"
                },
                statusText: "",
                statusStage: "",
                statusTool: ""
              })
            );
          }
        });
        _.current = fe.conversationId || _.current, p.current = "", m.current = !1, i([
          ...ne,
          Mn({
            id: J,
            parts: ur({
              text: fe.answer,
              components: fe.components || q
            }),
            components: fe.components || q,
            status: {
              type: "complete",
              reason: "stop"
            }
          })
        ]);
      } catch (fe) {
        if (fe?.name === "AbortError") {
          p.current = "", i([
            ...ne,
            ol({
              id: J,
              text: ue,
              components: q
            })
          ]);
          return;
        }
        console.error("[AskCrystal] Assistant runtime failed.", fe), p.current = "", m.current = !1, i([
          ...ne,
          Mn({
            id: J,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: fe?.message || "Unknown runtime error"
            },
            error: fe?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        d.current === X && (d.current = null), h.current === J && (h.current = ""), p.current && X.signal.aborted && (p.current = ""), c(!1);
      }
    },
    [s, R]
  ), G = I.useMemo(
    () => ({
      messages: r,
      isRunning: l,
      setMessages: C,
      onImport: C,
      onNew: H,
      onCancel: z,
      adapters: {
        threadList: {
          threadId: Za,
          threads: [
            {
              id: Za,
              remoteId: Za,
              title: "AskCrystal"
            }
          ]
        }
      }
    }),
    [l, r, z, H, C]
  );
  return ig(G);
}
function u_({ product: s }) {
  return /* @__PURE__ */ y.jsxs("a", { className: "ac-homepage__product-card", href: s.url, role: "listitem", children: [
    /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__product-media", children: s.image ? /* @__PURE__ */ y.jsx("img", { src: s.image, alt: s.title, loading: "lazy" }) : /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ y.jsx("p", { className: "ac-homepage__product-meta", children: s.badge || "Bestseller" }),
      /* @__PURE__ */ y.jsx("h3", { children: s.title }),
      s.summary ? /* @__PURE__ */ y.jsx("p", { children: s.summary }) : null,
      /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__product-row", children: [
        /* @__PURE__ */ y.jsx("span", { className: "ac-homepage__product-price", children: s.price }),
        /* @__PURE__ */ y.jsx("span", { className: "ac-homepage__product-link", children: "View" })
      ] })
    ] })
  ] });
}
function c_({ config: s }) {
  const r = s.suggestions.filter(Boolean);
  return /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__welcome", children: [
    /* @__PURE__ */ y.jsxs("section", { className: "ac-homepage__intro", children: [
      /* @__PURE__ */ y.jsx("p", { className: "ac-homepage__eyebrow", children: s.eyebrow }),
      /* @__PURE__ */ y.jsx("h1", { children: s.heading }),
      /* @__PURE__ */ y.jsx("p", { className: "ac-homepage__description", children: s.description }),
      /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__suggestions", role: "list", "aria-label": "Suggested prompts", children: r.map((i) => /* @__PURE__ */ y.jsx(
        mv,
        {
          className: "ac-homepage__suggestion",
          prompt: i,
          send: !0,
          children: i
        },
        i
      )) }),
      /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__note", children: [
        /* @__PURE__ */ y.jsx("span", { className: "ac-homepage__note-mark", children: "Guide" }),
        /* @__PURE__ */ y.jsx("p", { children: s.note })
      ] })
    ] }),
    /* @__PURE__ */ y.jsxs("section", { className: "ac-homepage__shelf", "aria-label": "Featured products", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__shelf-header", children: [
        /* @__PURE__ */ y.jsxs("div", { children: [
          /* @__PURE__ */ y.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Storefront" }),
          /* @__PURE__ */ y.jsx("h2", { children: s.shelfHeading })
        ] }),
        /* @__PURE__ */ y.jsx("a", { className: "ac-homepage__browse-link", href: s.browseUrl, children: "Browse all" })
      ] }),
      s.products.length ? /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: s.products.map((i) => /* @__PURE__ */ y.jsx(u_, { product: i }, i.id)) }) : /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
    ] })
  ] });
}
function d_() {
  return /* @__PURE__ */ y.jsx($f, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__composer-shell", children: [
    /* @__PURE__ */ y.jsx(
      Vf,
      {
        className: "ac-homepage__composer-input",
        placeholder: "What guidance or crystal do you need today?",
        rows: 1,
        autoFocus: !1
      }
    ),
    /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__composer-actions", children: [
      /* @__PURE__ */ y.jsx(sl, { running: !1, children: /* @__PURE__ */ y.jsx(Fy, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ y.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
      /* @__PURE__ */ y.jsx(sl, { running: !0, children: /* @__PURE__ */ y.jsx(iv, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
    ] })
  ] }) });
}
function f_() {
  return typeof document > "u" ? null : hm.createPortal(
    /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ y.jsx(d_, {}) }),
    document.body
  );
}
function h_() {
  return /* @__PURE__ */ y.jsx(_l, { className: "ac-message ac-message--user", children: /* @__PURE__ */ y.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ y.jsx(Sl, {}) }) });
}
function p_() {
  const s = Mi((m) => m.content || m.parts || []), r = Gi(s), i = s.some((m) => m.type === "tool-call"), l = Mi((m) => m.status?.type === "running"), c = Mi((m) => m.metadata?.custom?.statusText || ""), d = Mi((m) => m.metadata?.custom?.statusStage || ""), h = l && !r && !i, p = l && (!!r || i) && d === "tool" && !!c;
  return /* @__PURE__ */ y.jsxs(_l, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ y.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ y.jsx("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: h ? /* @__PURE__ */ y.jsx(Wv, { statusText: c }) : /* @__PURE__ */ y.jsx(
      Sl,
      {
        components: {
          Text: ({ text: m }) => /* @__PURE__ */ y.jsx(Vv, { text: m }),
          ...Fv
        }
      }
    ) }),
    p ? /* @__PURE__ */ y.jsx("div", { className: "ac-message__status", children: /* @__PURE__ */ y.jsx(Yv, { statusText: c }) }) : null,
    /* @__PURE__ */ y.jsx(Ff, { children: /* @__PURE__ */ y.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function m_({ config: s }) {
  const r = l_(s);
  return /* @__PURE__ */ y.jsx(iy, { runtime: r, children: /* @__PURE__ */ y.jsx("div", { className: "ac-homepage", children: /* @__PURE__ */ y.jsx(Wf, { className: "ac-homepage__thread", children: /* @__PURE__ */ y.jsxs(Qf, { className: "ac-homepage__viewport", children: [
    /* @__PURE__ */ y.jsx(c_, { config: s }),
    /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ y.jsx(
      hv,
      {
        components: {
          UserMessage: h_,
          AssistantMessage: p_
        }
      }
    ) }),
    /* @__PURE__ */ y.jsx(f_, {})
  ] }) }) }) });
}
function g_(s) {
  const r = s.getAttribute("data-config-id"), i = s.getAttribute("data-section-id") || r;
  if (!r || Fi.has(i)) return;
  const l = $v(r);
  if (!l) return;
  const c = fm.createRoot(s);
  c.render(/* @__PURE__ */ y.jsx(m_, { config: l })), Fi.set(i, c);
}
function y_(s) {
  const r = s.getAttribute("data-section-id");
  if (!r) return;
  const i = Fi.get(r);
  i && (i.unmount(), Fi.delete(r));
}
function oh(s = document) {
  s.querySelectorAll(sh).forEach((r) => g_(r));
}
function v_(s) {
  s.querySelectorAll(sh).forEach((r) => y_(r));
}
oh();
document.addEventListener("shopify:section:load", (s) => {
  oh(s.target);
});
document.addEventListener("shopify:section:unload", (s) => {
  v_(s.target);
});
