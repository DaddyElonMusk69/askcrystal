function im(s, n) {
  for (var i = 0; i < n.length; i++) {
    const l = n[i];
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
function tf(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Wa = { exports: {} }, ts = {}, Qa = { exports: {} }, ee = {};
var _d;
function om() {
  if (_d) return ee;
  _d = 1;
  var s = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), h = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), E = /* @__PURE__ */ Symbol.for("react.lazy"), I = Symbol.iterator;
  function C(w) {
    return w === null || typeof w != "object" ? null : (w = I && w[I] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var R = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, z = Object.assign, H = {};
  function G(w, N, Z) {
    this.props = w, this.context = N, this.refs = H, this.updater = Z || R;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(w, N) {
    if (typeof w != "object" && typeof w != "function" && w != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, w, N, "setState");
  }, G.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function se() {
  }
  se.prototype = G.prototype;
  function Q(w, N, Z) {
    this.props = w, this.context = N, this.refs = H, this.updater = Z || R;
  }
  var J = Q.prototype = new se();
  J.constructor = Q, z(J, G.prototype), J.isPureReactComponent = !0;
  var X = Array.isArray, Ee = Object.prototype.hasOwnProperty, ne = { current: null }, ue = { key: !0, ref: !0, __self: !0, __source: !0 };
  function q(w, N, Z) {
    var te, ie = {}, oe = null, he = null;
    if (N != null) for (te in N.ref !== void 0 && (he = N.ref), N.key !== void 0 && (oe = "" + N.key), N) Ee.call(N, te) && !ue.hasOwnProperty(te) && (ie[te] = N[te]);
    var ce = arguments.length - 2;
    if (ce === 1) ie.children = Z;
    else if (1 < ce) {
      for (var ye = Array(ce), st = 0; st < ce; st++) ye[st] = arguments[st + 2];
      ie.children = ye;
    }
    if (w && w.defaultProps) for (te in ce = w.defaultProps, ce) ie[te] === void 0 && (ie[te] = ce[te]);
    return { $$typeof: s, type: w, key: oe, ref: he, props: ie, _owner: ne.current };
  }
  function fe(w, N) {
    return { $$typeof: s, type: w.type, key: N, ref: w.ref, props: w.props, _owner: w._owner };
  }
  function Ae(w) {
    return typeof w == "object" && w !== null && w.$$typeof === s;
  }
  function Ie(w) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(Z) {
      return N[Z];
    });
  }
  var Je = /\/+/g;
  function Pe(w, N) {
    return typeof w == "object" && w !== null && w.key != null ? Ie("" + w.key) : N.toString(36);
  }
  function vt(w, N, Z, te, ie) {
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
          case n:
            he = !0;
        }
    }
    if (he) return he = w, ie = ie(he), w = te === "" ? "." + Pe(he, 0) : te, X(ie) ? (Z = "", w != null && (Z = w.replace(Je, "$&/") + "/"), vt(ie, N, Z, "", function(st) {
      return st;
    })) : ie != null && (Ae(ie) && (ie = fe(ie, Z + (!ie.key || he && he.key === ie.key ? "" : ("" + ie.key).replace(Je, "$&/") + "/") + w)), N.push(ie)), 1;
    if (he = 0, te = te === "" ? "." : te + ":", X(w)) for (var ce = 0; ce < w.length; ce++) {
      oe = w[ce];
      var ye = te + Pe(oe, ce);
      he += vt(oe, N, Z, ye, ie);
    }
    else if (ye = C(w), typeof ye == "function") for (w = ye.call(w), ce = 0; !(oe = w.next()).done; ) oe = oe.value, ye = te + Pe(oe, ce++), he += vt(oe, N, Z, ye, ie);
    else if (oe === "object") throw N = String(w), Error("Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead.");
    return he;
  }
  function Rt(w, N, Z) {
    if (w == null) return w;
    var te = [], ie = 0;
    return vt(w, te, "", "", function(oe) {
      return N.call(Z, oe, ie++);
    }), te;
  }
  function qe(w) {
    if (w._status === -1) {
      var N = w._result;
      N = N(), N.then(function(Z) {
        (w._status === 0 || w._status === -1) && (w._status = 1, w._result = Z);
      }, function(Z) {
        (w._status === 0 || w._status === -1) && (w._status = 2, w._result = Z);
      }), w._status === -1 && (w._status = 0, w._result = N);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var ke = { current: null }, L = { transition: null }, Y = { ReactCurrentDispatcher: ke, ReactCurrentBatchConfig: L, ReactCurrentOwner: ne };
  function F() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ee.Children = { map: Rt, forEach: function(w, N, Z) {
    Rt(w, function() {
      N.apply(this, arguments);
    }, Z);
  }, count: function(w) {
    var N = 0;
    return Rt(w, function() {
      N++;
    }), N;
  }, toArray: function(w) {
    return Rt(w, function(N) {
      return N;
    }) || [];
  }, only: function(w) {
    if (!Ae(w)) throw Error("React.Children.only expected to receive a single React element child.");
    return w;
  } }, ee.Component = G, ee.Fragment = i, ee.Profiler = c, ee.PureComponent = Q, ee.StrictMode = l, ee.Suspense = m, ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y, ee.act = F, ee.cloneElement = function(w, N, Z) {
    if (w == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + w + ".");
    var te = z({}, w.props), ie = w.key, oe = w.ref, he = w._owner;
    if (N != null) {
      if (N.ref !== void 0 && (oe = N.ref, he = ne.current), N.key !== void 0 && (ie = "" + N.key), w.type && w.type.defaultProps) var ce = w.type.defaultProps;
      for (ye in N) Ee.call(N, ye) && !ue.hasOwnProperty(ye) && (te[ye] = N[ye] === void 0 && ce !== void 0 ? ce[ye] : N[ye]);
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
    var N = q.bind(null, w);
    return N.type = w, N;
  }, ee.createRef = function() {
    return { current: null };
  }, ee.forwardRef = function(w) {
    return { $$typeof: p, render: w };
  }, ee.isValidElement = Ae, ee.lazy = function(w) {
    return { $$typeof: E, _payload: { _status: -1, _result: w }, _init: qe };
  }, ee.memo = function(w, N) {
    return { $$typeof: _, type: w, compare: N === void 0 ? null : N };
  }, ee.startTransition = function(w) {
    var N = L.transition;
    L.transition = {};
    try {
      w();
    } finally {
      L.transition = N;
    }
  }, ee.unstable_act = F, ee.useCallback = function(w, N) {
    return ke.current.useCallback(w, N);
  }, ee.useContext = function(w) {
    return ke.current.useContext(w);
  }, ee.useDebugValue = function() {
  }, ee.useDeferredValue = function(w) {
    return ke.current.useDeferredValue(w);
  }, ee.useEffect = function(w, N) {
    return ke.current.useEffect(w, N);
  }, ee.useId = function() {
    return ke.current.useId();
  }, ee.useImperativeHandle = function(w, N, Z) {
    return ke.current.useImperativeHandle(w, N, Z);
  }, ee.useInsertionEffect = function(w, N) {
    return ke.current.useInsertionEffect(w, N);
  }, ee.useLayoutEffect = function(w, N) {
    return ke.current.useLayoutEffect(w, N);
  }, ee.useMemo = function(w, N) {
    return ke.current.useMemo(w, N);
  }, ee.useReducer = function(w, N, Z) {
    return ke.current.useReducer(w, N, Z);
  }, ee.useRef = function(w) {
    return ke.current.useRef(w);
  }, ee.useState = function(w) {
    return ke.current.useState(w);
  }, ee.useSyncExternalStore = function(w, N, Z) {
    return ke.current.useSyncExternalStore(w, N, Z);
  }, ee.useTransition = function() {
    return ke.current.useTransition();
  }, ee.version = "18.3.1", ee;
}
var Sd;
function ul() {
  return Sd || (Sd = 1, Qa.exports = om()), Qa.exports;
}
var wd;
function am() {
  if (wd) return ts;
  wd = 1;
  var s = ul(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, c = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(p, m, _) {
    var E, I = {}, C = null, R = null;
    _ !== void 0 && (C = "" + _), m.key !== void 0 && (C = "" + m.key), m.ref !== void 0 && (R = m.ref);
    for (E in m) l.call(m, E) && !d.hasOwnProperty(E) && (I[E] = m[E]);
    if (p && p.defaultProps) for (E in m = p.defaultProps, m) I[E] === void 0 && (I[E] = m[E]);
    return { $$typeof: n, type: p, key: C, ref: R, props: I, _owner: c.current };
  }
  return ts.Fragment = i, ts.jsx = h, ts.jsxs = h, ts;
}
var xd;
function lm() {
  return xd || (xd = 1, Wa.exports = am()), Wa.exports;
}
var y = lm(), b = ul();
const Gt = /* @__PURE__ */ tf(b), um = /* @__PURE__ */ im({
  __proto__: null,
  default: Gt
}, [b]);
var bi = {}, Ya = { exports: {} }, rt = {}, Ga = { exports: {} }, Ka = {};
var Ed;
function cm() {
  return Ed || (Ed = 1, (function(s) {
    function n(L, Y) {
      var F = L.length;
      L.push(Y);
      e: for (; 0 < F; ) {
        var w = F - 1 >>> 1, N = L[w];
        if (0 < c(N, Y)) L[w] = Y, L[F] = N, F = w;
        else break e;
      }
    }
    function i(L) {
      return L.length === 0 ? null : L[0];
    }
    function l(L) {
      if (L.length === 0) return null;
      var Y = L[0], F = L.pop();
      if (F !== Y) {
        L[0] = F;
        e: for (var w = 0, N = L.length, Z = N >>> 1; w < Z; ) {
          var te = 2 * (w + 1) - 1, ie = L[te], oe = te + 1, he = L[oe];
          if (0 > c(ie, F)) oe < N && 0 > c(he, ie) ? (L[w] = he, L[oe] = F, w = oe) : (L[w] = ie, L[te] = F, w = te);
          else if (oe < N && 0 > c(he, F)) L[w] = he, L[oe] = F, w = oe;
          else break e;
        }
      }
      return Y;
    }
    function c(L, Y) {
      var F = L.sortIndex - Y.sortIndex;
      return F !== 0 ? F : L.id - Y.id;
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
    var m = [], _ = [], E = 1, I = null, C = 3, R = !1, z = !1, H = !1, G = typeof setTimeout == "function" ? setTimeout : null, se = typeof clearTimeout == "function" ? clearTimeout : null, Q = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function J(L) {
      for (var Y = i(_); Y !== null; ) {
        if (Y.callback === null) l(_);
        else if (Y.startTime <= L) l(_), Y.sortIndex = Y.expirationTime, n(m, Y);
        else break;
        Y = i(_);
      }
    }
    function X(L) {
      if (H = !1, J(L), !z) if (i(m) !== null) z = !0, qe(Ee);
      else {
        var Y = i(_);
        Y !== null && ke(X, Y.startTime - L);
      }
    }
    function Ee(L, Y) {
      z = !1, H && (H = !1, se(q), q = -1), R = !0;
      var F = C;
      try {
        for (J(Y), I = i(m); I !== null && (!(I.expirationTime > Y) || L && !Ie()); ) {
          var w = I.callback;
          if (typeof w == "function") {
            I.callback = null, C = I.priorityLevel;
            var N = w(I.expirationTime <= Y);
            Y = s.unstable_now(), typeof N == "function" ? I.callback = N : I === i(m) && l(m), J(Y);
          } else l(m);
          I = i(m);
        }
        if (I !== null) var Z = !0;
        else {
          var te = i(_);
          te !== null && ke(X, te.startTime - Y), Z = !1;
        }
        return Z;
      } finally {
        I = null, C = F, R = !1;
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
        var Y = !0;
        try {
          Y = ue(!0, L);
        } finally {
          Y ? Pe() : (ne = !1, ue = null);
        }
      } else ne = !1;
    }
    var Pe;
    if (typeof Q == "function") Pe = function() {
      Q(Je);
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
    function ke(L, Y) {
      q = G(function() {
        L(s.unstable_now());
      }, Y);
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
          var Y = 3;
          break;
        default:
          Y = C;
      }
      var F = C;
      C = Y;
      try {
        return L();
      } finally {
        C = F;
      }
    }, s.unstable_pauseExecution = function() {
    }, s.unstable_requestPaint = function() {
    }, s.unstable_runWithPriority = function(L, Y) {
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
      var F = C;
      C = L;
      try {
        return Y();
      } finally {
        C = F;
      }
    }, s.unstable_scheduleCallback = function(L, Y, F) {
      var w = s.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? w + F : w) : F = w, L) {
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
      return N = F + N, L = { id: E++, callback: Y, priorityLevel: L, startTime: F, expirationTime: N, sortIndex: -1 }, F > w ? (L.sortIndex = F, n(_, L), i(m) === null && L === i(_) && (H ? (se(q), q = -1) : H = !0, ke(X, F - w))) : (L.sortIndex = N, n(m, L), z || R || (z = !0, qe(Ee))), L;
    }, s.unstable_shouldYield = Ie, s.unstable_wrapCallback = function(L) {
      var Y = C;
      return function() {
        var F = C;
        C = Y;
        try {
          return L.apply(this, arguments);
        } finally {
          C = F;
        }
      };
    };
  })(Ka)), Ka;
}
var kd;
function dm() {
  return kd || (kd = 1, Ga.exports = cm()), Ga.exports;
}
var Cd;
function fm() {
  if (Cd) return rt;
  Cd = 1;
  var s = ul(), n = dm();
  function i(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var l = /* @__PURE__ */ new Set(), c = {};
  function d(e, t) {
    h(e, t), h(e + "Capture", t);
  }
  function h(e, t) {
    for (c[e] = t, e = 0; e < t.length; e++) l.add(t[e]);
  }
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, _ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, E = {}, I = {};
  function C(e) {
    return m.call(I, e) ? !0 : m.call(E, e) ? !1 : _.test(e) ? I[e] = !0 : (E[e] = !0, !1);
  }
  function R(e, t, r, o) {
    if (r !== null && r.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function z(e, t, r, o) {
    if (t === null || typeof t > "u" || R(e, t, r, o)) return !0;
    if (o) return !1;
    if (r !== null) switch (r.type) {
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
  function H(e, t, r, o, a, u, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = a, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = f;
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
  function Q(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      se,
      Q
    );
    G[t] = new H(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(se, Q);
    G[t] = new H(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(se, Q);
    G[t] = new H(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    G[e] = new H(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), G.xlinkHref = new H("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    G[e] = new H(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function J(e, t, r, o) {
    var a = G.hasOwnProperty(t) ? G[t] : null;
    (a !== null ? a.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (z(t, r, a, o) && (r = null), o || a === null ? C(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : a.mustUseProperty ? e[a.propertyName] = r === null ? a.type === 3 ? !1 : "" : r : (t = a.attributeName, o = a.attributeNamespace, r === null ? e.removeAttribute(t) : (a = a.type, r = a === 3 || a === 4 && r === !0 ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
  }
  var X = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ee = /* @__PURE__ */ Symbol.for("react.element"), ne = /* @__PURE__ */ Symbol.for("react.portal"), ue = /* @__PURE__ */ Symbol.for("react.fragment"), q = /* @__PURE__ */ Symbol.for("react.strict_mode"), fe = /* @__PURE__ */ Symbol.for("react.profiler"), Ae = /* @__PURE__ */ Symbol.for("react.provider"), Ie = /* @__PURE__ */ Symbol.for("react.context"), Je = /* @__PURE__ */ Symbol.for("react.forward_ref"), Pe = /* @__PURE__ */ Symbol.for("react.suspense"), vt = /* @__PURE__ */ Symbol.for("react.suspense_list"), Rt = /* @__PURE__ */ Symbol.for("react.memo"), qe = /* @__PURE__ */ Symbol.for("react.lazy"), ke = /* @__PURE__ */ Symbol.for("react.offscreen"), L = Symbol.iterator;
  function Y(e) {
    return e === null || typeof e != "object" ? null : (e = L && e[L] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var F = Object.assign, w;
  function N(e) {
    if (w === void 0) try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      w = t && t[1] || "";
    }
    return `
` + w + e;
  }
  var Z = !1;
  function te(e, t) {
    if (!e || Z) return "";
    Z = !0;
    var r = Error.prepareStackTrace;
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
      Z = !1, Error.prepareStackTrace = r;
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
    var t = ye(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var a = r.get, u = r.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return a.call(this);
      }, set: function(f) {
        o = "" + f, u.call(this, f);
      } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
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
  function Cl(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(), o = "";
    return e && (o = ye(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), !0) : !1;
  }
  function vs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function qi(e, t) {
    var r = t.checked;
    return F({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
  }
  function Tl(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    r = ce(t.value != null ? t.value : r), e._wrapperState = { initialChecked: o, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function bl(e, t) {
    t = t.checked, t != null && J(e, "checked", t, !1);
  }
  function Xi(e, t) {
    bl(e, t);
    var r = ce(t.value), o = t.type;
    if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Zi(e, t.type, r) : t.hasOwnProperty("defaultValue") && Zi(e, t.type, ce(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Il(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
  }
  function Zi(e, t, r) {
    (t !== "number" || vs(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var gr = Array.isArray;
  function zn(e, t, r, o) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < r.length; a++) t["$" + r[a]] = !0;
      for (r = 0; r < e.length; r++) a = t.hasOwnProperty("$" + e[r].value), e[r].selected !== a && (e[r].selected = a), a && o && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + ce(r), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === r) {
          e[a].selected = !0, o && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function eo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return F({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Rl(e, t) {
    var r = t.value;
    if (r == null) {
      if (r = t.children, t = t.defaultValue, r != null) {
        if (t != null) throw Error(i(92));
        if (gr(r)) {
          if (1 < r.length) throw Error(i(93));
          r = r[0];
        }
        t = r;
      }
      t == null && (t = ""), r = t;
    }
    e._wrapperState = { initialValue: ce(r) };
  }
  function Ml(e, t) {
    var r = ce(t.value), o = ce(t.defaultValue);
    r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
  }
  function Nl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Al(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function to(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Al(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var _s, Pl = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, a) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, r, o, a);
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
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
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
  }, uh = ["Webkit", "ms", "Moz", "O"];
  Object.keys(vr).forEach(function(e) {
    uh.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), vr[t] = vr[e];
    });
  });
  function jl(e, t, r) {
    return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || vr.hasOwnProperty(e) && vr[e] ? ("" + t).trim() : t + "px";
  }
  function Ll(e, t) {
    e = e.style;
    for (var r in t) if (t.hasOwnProperty(r)) {
      var o = r.indexOf("--") === 0, a = jl(r, t[r], o);
      r === "float" && (r = "cssFloat"), o ? e.setProperty(r, a) : e[r] = a;
    }
  }
  var ch = F({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function no(e, t) {
    if (t) {
      if (ch[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function ro(e, t) {
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
  var so = null;
  function io(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var oo = null, Dn = null, Fn = null;
  function Ol(e) {
    if (e = Br(e)) {
      if (typeof oo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = $s(t), oo(e.stateNode, e.type, t));
    }
  }
  function zl(e) {
    Dn ? Fn ? Fn.push(e) : Fn = [e] : Dn = e;
  }
  function Dl() {
    if (Dn) {
      var e = Dn, t = Fn;
      if (Fn = Dn = null, Ol(e), t) for (e = 0; e < t.length; e++) Ol(t[e]);
    }
  }
  function Fl(e, t) {
    return e(t);
  }
  function Bl() {
  }
  var ao = !1;
  function Ul(e, t, r) {
    if (ao) return e(t, r);
    ao = !0;
    try {
      return Fl(e, t, r);
    } finally {
      ao = !1, (Dn !== null || Fn !== null) && (Bl(), Dl());
    }
  }
  function _r(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var o = $s(r);
    if (o === null) return null;
    r = o[t];
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
    if (r && typeof r != "function") throw Error(i(231, t, typeof r));
    return r;
  }
  var lo = !1;
  if (p) try {
    var Sr = {};
    Object.defineProperty(Sr, "passive", { get: function() {
      lo = !0;
    } }), window.addEventListener("test", Sr, Sr), window.removeEventListener("test", Sr, Sr);
  } catch {
    lo = !1;
  }
  function dh(e, t, r, o, a, u, f, g, v) {
    var T = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, T);
    } catch (A) {
      this.onError(A);
    }
  }
  var wr = !1, Ss = null, ws = !1, uo = null, fh = { onError: function(e) {
    wr = !0, Ss = e;
  } };
  function hh(e, t, r, o, a, u, f, g, v) {
    wr = !1, Ss = null, dh.apply(fh, arguments);
  }
  function ph(e, t, r, o, a, u, f, g, v) {
    if (hh.apply(this, arguments), wr) {
      if (wr) {
        var T = Ss;
        wr = !1, Ss = null;
      } else throw Error(i(198));
      ws || (ws = !0, uo = T);
    }
  }
  function gn(e) {
    var t = e, r = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (r = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? r : null;
  }
  function $l(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Hl(e) {
    if (gn(e) !== e) throw Error(i(188));
  }
  function mh(e) {
    var t = e.alternate;
    if (!t) {
      if (t = gn(e), t === null) throw Error(i(188));
      return t !== e ? null : e;
    }
    for (var r = e, o = t; ; ) {
      var a = r.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (o = a.return, o !== null) {
          r = o;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === r) return Hl(a), e;
          if (u === o) return Hl(a), t;
          u = u.sibling;
        }
        throw Error(i(188));
      }
      if (r.return !== o.return) r = a, o = u;
      else {
        for (var f = !1, g = a.child; g; ) {
          if (g === r) {
            f = !0, r = a, o = u;
            break;
          }
          if (g === o) {
            f = !0, o = a, r = u;
            break;
          }
          g = g.sibling;
        }
        if (!f) {
          for (g = u.child; g; ) {
            if (g === r) {
              f = !0, r = u, o = a;
              break;
            }
            if (g === o) {
              f = !0, o = u, r = a;
              break;
            }
            g = g.sibling;
          }
          if (!f) throw Error(i(189));
        }
      }
      if (r.alternate !== o) throw Error(i(190));
    }
    if (r.tag !== 3) throw Error(i(188));
    return r.stateNode.current === r ? e : t;
  }
  function Vl(e) {
    return e = mh(e), e !== null ? Wl(e) : null;
  }
  function Wl(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Wl(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ql = n.unstable_scheduleCallback, Yl = n.unstable_cancelCallback, gh = n.unstable_shouldYield, yh = n.unstable_requestPaint, Re = n.unstable_now, vh = n.unstable_getCurrentPriorityLevel, co = n.unstable_ImmediatePriority, Gl = n.unstable_UserBlockingPriority, xs = n.unstable_NormalPriority, _h = n.unstable_LowPriority, Kl = n.unstable_IdlePriority, Es = null, Mt = null;
  function Sh(e) {
    if (Mt && typeof Mt.onCommitFiberRoot == "function") try {
      Mt.onCommitFiberRoot(Es, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var _t = Math.clz32 ? Math.clz32 : Eh, wh = Math.log, xh = Math.LN2;
  function Eh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (wh(e) / xh | 0) | 0;
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
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var o = 0, a = e.suspendedLanes, u = e.pingedLanes, f = r & 268435455;
    if (f !== 0) {
      var g = f & ~a;
      g !== 0 ? o = xr(g) : (u &= f, u !== 0 && (o = xr(u)));
    } else f = r & ~a, f !== 0 ? o = xr(f) : u !== 0 && (o = xr(u));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & a) === 0 && (a = o & -o, u = t & -t, a >= u || a === 16 && (u & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - _t(t), a = 1 << r, o |= e[r], t &= ~a;
    return o;
  }
  function kh(e, t) {
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
  function Ch(e, t) {
    for (var r = e.suspendedLanes, o = e.pingedLanes, a = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var f = 31 - _t(u), g = 1 << f, v = a[f];
      v === -1 ? ((g & r) === 0 || (g & o) !== 0) && (a[f] = kh(g, t)) : v <= t && (e.expiredLanes |= g), u &= ~g;
    }
  }
  function fo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Jl() {
    var e = ks;
    return ks <<= 1, (ks & 4194240) === 0 && (ks = 64), e;
  }
  function ho(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function Er(e, t, r) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - _t(t), e[t] = r;
  }
  function Th(e, t) {
    var r = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var a = 31 - _t(r), u = 1 << a;
      t[a] = 0, o[a] = -1, e[a] = -1, r &= ~u;
    }
  }
  function po(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var o = 31 - _t(r), a = 1 << o;
      a & t | e[o] & t && (e[o] |= t), r &= ~a;
    }
  }
  var de = 0;
  function ql(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Xl, mo, Zl, eu, tu, go = !1, bs = [], Jt = null, qt = null, Xt = null, kr = /* @__PURE__ */ new Map(), Cr = /* @__PURE__ */ new Map(), Zt = [], bh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function nu(e, t) {
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
  function Tr(e, t, r, o, a, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: o, nativeEvent: u, targetContainers: [a] }, t !== null && (t = Br(t), t !== null && mo(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function Ih(e, t, r, o, a) {
    switch (t) {
      case "focusin":
        return Jt = Tr(Jt, e, t, r, o, a), !0;
      case "dragenter":
        return qt = Tr(qt, e, t, r, o, a), !0;
      case "mouseover":
        return Xt = Tr(Xt, e, t, r, o, a), !0;
      case "pointerover":
        var u = a.pointerId;
        return kr.set(u, Tr(kr.get(u) || null, e, t, r, o, a)), !0;
      case "gotpointercapture":
        return u = a.pointerId, Cr.set(u, Tr(Cr.get(u) || null, e, t, r, o, a)), !0;
    }
    return !1;
  }
  function ru(e) {
    var t = yn(e.target);
    if (t !== null) {
      var r = gn(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = $l(r), t !== null) {
            e.blockedOn = t, tu(e.priority, function() {
              Zl(r);
            });
            return;
          }
        } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Is(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = vo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var o = new r.constructor(r.type, r);
        so = o, r.target.dispatchEvent(o), so = null;
      } else return t = Br(r), t !== null && mo(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function su(e, t, r) {
    Is(e) && r.delete(t);
  }
  function Rh() {
    go = !1, Jt !== null && Is(Jt) && (Jt = null), qt !== null && Is(qt) && (qt = null), Xt !== null && Is(Xt) && (Xt = null), kr.forEach(su), Cr.forEach(su);
  }
  function br(e, t) {
    e.blockedOn === t && (e.blockedOn = null, go || (go = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Rh)));
  }
  function Ir(e) {
    function t(a) {
      return br(a, e);
    }
    if (0 < bs.length) {
      br(bs[0], e);
      for (var r = 1; r < bs.length; r++) {
        var o = bs[r];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (Jt !== null && br(Jt, e), qt !== null && br(qt, e), Xt !== null && br(Xt, e), kr.forEach(t), Cr.forEach(t), r = 0; r < Zt.length; r++) o = Zt[r], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < Zt.length && (r = Zt[0], r.blockedOn === null); ) ru(r), r.blockedOn === null && Zt.shift();
  }
  var Bn = X.ReactCurrentBatchConfig, Rs = !0;
  function Mh(e, t, r, o) {
    var a = de, u = Bn.transition;
    Bn.transition = null;
    try {
      de = 1, yo(e, t, r, o);
    } finally {
      de = a, Bn.transition = u;
    }
  }
  function Nh(e, t, r, o) {
    var a = de, u = Bn.transition;
    Bn.transition = null;
    try {
      de = 4, yo(e, t, r, o);
    } finally {
      de = a, Bn.transition = u;
    }
  }
  function yo(e, t, r, o) {
    if (Rs) {
      var a = vo(e, t, r, o);
      if (a === null) Lo(e, t, o, Ms, r), nu(e, o);
      else if (Ih(a, e, t, r, o)) o.stopPropagation();
      else if (nu(e, o), t & 4 && -1 < bh.indexOf(e)) {
        for (; a !== null; ) {
          var u = Br(a);
          if (u !== null && Xl(u), u = vo(e, t, r, o), u === null && Lo(e, t, o, Ms, r), u === a) break;
          a = u;
        }
        a !== null && o.stopPropagation();
      } else Lo(e, t, o, null, r);
    }
  }
  var Ms = null;
  function vo(e, t, r, o) {
    if (Ms = null, e = io(o), e = yn(e), e !== null) if (t = gn(e), t === null) e = null;
    else if (r = t.tag, r === 13) {
      if (e = $l(t), e !== null) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Ms = e, null;
  }
  function iu(e) {
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
        switch (vh()) {
          case co:
            return 1;
          case Gl:
            return 4;
          case xs:
          case _h:
            return 16;
          case Kl:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var en = null, _o = null, Ns = null;
  function ou() {
    if (Ns) return Ns;
    var e, t = _o, r = t.length, o, a = "value" in en ? en.value : en.textContent, u = a.length;
    for (e = 0; e < r && t[e] === a[e]; e++) ;
    var f = r - e;
    for (o = 1; o <= f && t[r - o] === a[u - o]; o++) ;
    return Ns = a.slice(e, 1 < o ? 1 - o : void 0);
  }
  function As(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ps() {
    return !0;
  }
  function au() {
    return !1;
  }
  function it(e) {
    function t(r, o, a, u, f) {
      this._reactName = r, this._targetInst = a, this.type = o, this.nativeEvent = u, this.target = f, this.currentTarget = null;
      for (var g in e) e.hasOwnProperty(g) && (r = e[g], this[g] = r ? r(u) : u[g]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Ps : au, this.isPropagationStopped = au, this;
    }
    return F(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Ps);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Ps);
    }, persist: function() {
    }, isPersistent: Ps }), t;
  }
  var Un = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, So = it(Un), Rr = F({}, Un, { view: 0, detail: 0 }), Ah = it(Rr), wo, xo, Mr, js = F({}, Rr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ko, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Mr && (Mr && e.type === "mousemove" ? (wo = e.screenX - Mr.screenX, xo = e.screenY - Mr.screenY) : xo = wo = 0, Mr = e), wo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : xo;
  } }), lu = it(js), Ph = F({}, js, { dataTransfer: 0 }), jh = it(Ph), Lh = F({}, Rr, { relatedTarget: 0 }), Eo = it(Lh), Oh = F({}, Un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), zh = it(Oh), Dh = F({}, Un, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Fh = it(Dh), Bh = F({}, Un, { data: 0 }), uu = it(Bh), Uh = {
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
  }, $h = {
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
  }, Hh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Vh(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Hh[e]) ? !!t[e] : !1;
  }
  function ko() {
    return Vh;
  }
  var Wh = F({}, Rr, { key: function(e) {
    if (e.key) {
      var t = Uh[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = As(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $h[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ko, charCode: function(e) {
    return e.type === "keypress" ? As(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? As(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Qh = it(Wh), Yh = F({}, js, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), cu = it(Yh), Gh = F({}, Rr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ko }), Kh = it(Gh), Jh = F({}, Un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qh = it(Jh), Xh = F({}, js, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zh = it(Xh), ep = [9, 13, 27, 32], Co = p && "CompositionEvent" in window, Nr = null;
  p && "documentMode" in document && (Nr = document.documentMode);
  var tp = p && "TextEvent" in window && !Nr, du = p && (!Co || Nr && 8 < Nr && 11 >= Nr), fu = " ", hu = !1;
  function pu(e, t) {
    switch (e) {
      case "keyup":
        return ep.indexOf(t.keyCode) !== -1;
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
  function mu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var $n = !1;
  function np(e, t) {
    switch (e) {
      case "compositionend":
        return mu(t);
      case "keypress":
        return t.which !== 32 ? null : (hu = !0, fu);
      case "textInput":
        return e = t.data, e === fu && hu ? null : e;
      default:
        return null;
    }
  }
  function rp(e, t) {
    if ($n) return e === "compositionend" || !Co && pu(e, t) ? (e = ou(), Ns = _o = en = null, $n = !1, e) : null;
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
        return du && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var sp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function gu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!sp[e.type] : t === "textarea";
  }
  function yu(e, t, r, o) {
    zl(o), t = Fs(t, "onChange"), 0 < t.length && (r = new So("onChange", "change", null, r, o), e.push({ event: r, listeners: t }));
  }
  var Ar = null, Pr = null;
  function ip(e) {
    Lu(e, 0);
  }
  function Ls(e) {
    var t = Yn(e);
    if (Cl(t)) return e;
  }
  function op(e, t) {
    if (e === "change") return t;
  }
  var vu = !1;
  if (p) {
    var To;
    if (p) {
      var bo = "oninput" in document;
      if (!bo) {
        var _u = document.createElement("div");
        _u.setAttribute("oninput", "return;"), bo = typeof _u.oninput == "function";
      }
      To = bo;
    } else To = !1;
    vu = To && (!document.documentMode || 9 < document.documentMode);
  }
  function Su() {
    Ar && (Ar.detachEvent("onpropertychange", wu), Pr = Ar = null);
  }
  function wu(e) {
    if (e.propertyName === "value" && Ls(Pr)) {
      var t = [];
      yu(t, Pr, e, io(e)), Ul(ip, t);
    }
  }
  function ap(e, t, r) {
    e === "focusin" ? (Su(), Ar = t, Pr = r, Ar.attachEvent("onpropertychange", wu)) : e === "focusout" && Su();
  }
  function lp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ls(Pr);
  }
  function up(e, t) {
    if (e === "click") return Ls(t);
  }
  function cp(e, t) {
    if (e === "input" || e === "change") return Ls(t);
  }
  function dp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var St = typeof Object.is == "function" ? Object.is : dp;
  function jr(e, t) {
    if (St(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var r = Object.keys(e), o = Object.keys(t);
    if (r.length !== o.length) return !1;
    for (o = 0; o < r.length; o++) {
      var a = r[o];
      if (!m.call(t, a) || !St(e[a], t[a])) return !1;
    }
    return !0;
  }
  function xu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Eu(e, t) {
    var r = xu(e);
    e = 0;
    for (var o; r; ) {
      if (r.nodeType === 3) {
        if (o = e + r.textContent.length, e <= t && o >= t) return { node: r, offset: t - e };
        e = o;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = xu(r);
    }
  }
  function ku(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ku(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Cu() {
    for (var e = window, t = vs(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = vs(e.document);
    }
    return t;
  }
  function Io(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function fp(e) {
    var t = Cu(), r = e.focusedElem, o = e.selectionRange;
    if (t !== r && r && r.ownerDocument && ku(r.ownerDocument.documentElement, r)) {
      if (o !== null && Io(r)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
        else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var a = r.textContent.length, u = Math.min(o.start, a);
          o = o.end === void 0 ? u : Math.min(o.end, a), !e.extend && u > o && (a = o, o = u, u = a), a = Eu(r, u);
          var f = Eu(
            r,
            o
          );
          a && f && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== f.node || e.focusOffset !== f.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), u > o ? (e.addRange(t), e.extend(f.node, f.offset)) : (t.setEnd(f.node, f.offset), e.addRange(t)));
        }
      }
      for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var hp = p && "documentMode" in document && 11 >= document.documentMode, Hn = null, Ro = null, Lr = null, Mo = !1;
  function Tu(e, t, r) {
    var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Mo || Hn == null || Hn !== vs(o) || (o = Hn, "selectionStart" in o && Io(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Lr && jr(Lr, o) || (Lr = o, o = Fs(Ro, "onSelect"), 0 < o.length && (t = new So("onSelect", "select", null, t, r), e.push({ event: t, listeners: o }), t.target = Hn)));
  }
  function Os(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var Vn = { animationend: Os("Animation", "AnimationEnd"), animationiteration: Os("Animation", "AnimationIteration"), animationstart: Os("Animation", "AnimationStart"), transitionend: Os("Transition", "TransitionEnd") }, No = {}, bu = {};
  p && (bu = document.createElement("div").style, "AnimationEvent" in window || (delete Vn.animationend.animation, delete Vn.animationiteration.animation, delete Vn.animationstart.animation), "TransitionEvent" in window || delete Vn.transitionend.transition);
  function zs(e) {
    if (No[e]) return No[e];
    if (!Vn[e]) return e;
    var t = Vn[e], r;
    for (r in t) if (t.hasOwnProperty(r) && r in bu) return No[e] = t[r];
    return e;
  }
  var Iu = zs("animationend"), Ru = zs("animationiteration"), Mu = zs("animationstart"), Nu = zs("transitionend"), Au = /* @__PURE__ */ new Map(), Pu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function tn(e, t) {
    Au.set(e, t), d(t, [e]);
  }
  for (var Ao = 0; Ao < Pu.length; Ao++) {
    var Po = Pu[Ao], pp = Po.toLowerCase(), mp = Po[0].toUpperCase() + Po.slice(1);
    tn(pp, "on" + mp);
  }
  tn(Iu, "onAnimationEnd"), tn(Ru, "onAnimationIteration"), tn(Mu, "onAnimationStart"), tn("dblclick", "onDoubleClick"), tn("focusin", "onFocus"), tn("focusout", "onBlur"), tn(Nu, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Or = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), gp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Or));
  function ju(e, t, r) {
    var o = e.type || "unknown-event";
    e.currentTarget = r, ph(o, t, void 0, e), e.currentTarget = null;
  }
  function Lu(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var o = e[r], a = o.event;
      o = o.listeners;
      e: {
        var u = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var g = o[f], v = g.instance, T = g.currentTarget;
          if (g = g.listener, v !== u && a.isPropagationStopped()) break e;
          ju(a, g, T), u = v;
        }
        else for (f = 0; f < o.length; f++) {
          if (g = o[f], v = g.instance, T = g.currentTarget, g = g.listener, v !== u && a.isPropagationStopped()) break e;
          ju(a, g, T), u = v;
        }
      }
    }
    if (ws) throw e = uo, ws = !1, uo = null, e;
  }
  function me(e, t) {
    var r = t[Uo];
    r === void 0 && (r = t[Uo] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    r.has(o) || (Ou(t, e, 2, !1), r.add(o));
  }
  function jo(e, t, r) {
    var o = 0;
    t && (o |= 4), Ou(r, e, o, t);
  }
  var Ds = "_reactListening" + Math.random().toString(36).slice(2);
  function zr(e) {
    if (!e[Ds]) {
      e[Ds] = !0, l.forEach(function(r) {
        r !== "selectionchange" && (gp.has(r) || jo(r, !1, e), jo(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ds] || (t[Ds] = !0, jo("selectionchange", !1, t));
    }
  }
  function Ou(e, t, r, o) {
    switch (iu(t)) {
      case 1:
        var a = Mh;
        break;
      case 4:
        a = Nh;
        break;
      default:
        a = yo;
    }
    r = a.bind(null, t, r, e), a = void 0, !lo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), o ? a !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: a }) : e.addEventListener(t, r, !0) : a !== void 0 ? e.addEventListener(t, r, { passive: a }) : e.addEventListener(t, r, !1);
  }
  function Lo(e, t, r, o, a) {
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
    Ul(function() {
      var T = u, A = io(r), P = [];
      e: {
        var M = Au.get(e);
        if (M !== void 0) {
          var O = So, B = e;
          switch (e) {
            case "keypress":
              if (As(r) === 0) break e;
            case "keydown":
            case "keyup":
              O = Qh;
              break;
            case "focusin":
              B = "focus", O = Eo;
              break;
            case "focusout":
              B = "blur", O = Eo;
              break;
            case "beforeblur":
            case "afterblur":
              O = Eo;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              O = lu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = jh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = Kh;
              break;
            case Iu:
            case Ru:
            case Mu:
              O = zh;
              break;
            case Nu:
              O = qh;
              break;
            case "scroll":
              O = Ah;
              break;
            case "wheel":
              O = Zh;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = Fh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = cu;
          }
          var U = (t & 4) !== 0, Me = !U && e === "scroll", x = U ? M !== null ? M + "Capture" : null : M;
          U = [];
          for (var S = T, k; S !== null; ) {
            k = S;
            var j = k.stateNode;
            if (k.tag === 5 && j !== null && (k = j, x !== null && (j = _r(S, x), j != null && U.push(Dr(S, j, k)))), Me) break;
            S = S.return;
          }
          0 < U.length && (M = new O(M, B, null, r, A), P.push({ event: M, listeners: U }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (M = e === "mouseover" || e === "pointerover", O = e === "mouseout" || e === "pointerout", M && r !== so && (B = r.relatedTarget || r.fromElement) && (yn(B) || B[Dt])) break e;
          if ((O || M) && (M = A.window === A ? A : (M = A.ownerDocument) ? M.defaultView || M.parentWindow : window, O ? (B = r.relatedTarget || r.toElement, O = T, B = B ? yn(B) : null, B !== null && (Me = gn(B), B !== Me || B.tag !== 5 && B.tag !== 6) && (B = null)) : (O = null, B = T), O !== B)) {
            if (U = lu, j = "onMouseLeave", x = "onMouseEnter", S = "mouse", (e === "pointerout" || e === "pointerover") && (U = cu, j = "onPointerLeave", x = "onPointerEnter", S = "pointer"), Me = O == null ? M : Yn(O), k = B == null ? M : Yn(B), M = new U(j, S + "leave", O, r, A), M.target = Me, M.relatedTarget = k, j = null, yn(A) === T && (U = new U(x, S + "enter", B, r, A), U.target = k, U.relatedTarget = Me, j = U), Me = j, O && B) t: {
              for (U = O, x = B, S = 0, k = U; k; k = Wn(k)) S++;
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
            O !== null && zu(P, M, O, U, !1), B !== null && Me !== null && zu(P, Me, B, U, !0);
          }
        }
        e: {
          if (M = T ? Yn(T) : window, O = M.nodeName && M.nodeName.toLowerCase(), O === "select" || O === "input" && M.type === "file") var $ = op;
          else if (gu(M)) if (vu) $ = cp;
          else {
            $ = lp;
            var V = ap;
          }
          else (O = M.nodeName) && O.toLowerCase() === "input" && (M.type === "checkbox" || M.type === "radio") && ($ = up);
          if ($ && ($ = $(e, T))) {
            yu(P, $, r, A);
            break e;
          }
          V && V(e, M, T), e === "focusout" && (V = M._wrapperState) && V.controlled && M.type === "number" && Zi(M, "number", M.value);
        }
        switch (V = T ? Yn(T) : window, e) {
          case "focusin":
            (gu(V) || V.contentEditable === "true") && (Hn = V, Ro = T, Lr = null);
            break;
          case "focusout":
            Lr = Ro = Hn = null;
            break;
          case "mousedown":
            Mo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mo = !1, Tu(P, r, A);
            break;
          case "selectionchange":
            if (hp) break;
          case "keydown":
          case "keyup":
            Tu(P, r, A);
        }
        var W;
        if (Co) e: {
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
        else $n ? pu(e, r) && (K = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (K = "onCompositionStart");
        K && (du && r.locale !== "ko" && ($n || K !== "onCompositionStart" ? K === "onCompositionEnd" && $n && (W = ou()) : (en = A, _o = "value" in en ? en.value : en.textContent, $n = !0)), V = Fs(T, K), 0 < V.length && (K = new uu(K, e, null, r, A), P.push({ event: K, listeners: V }), W ? K.data = W : (W = mu(r), W !== null && (K.data = W)))), (W = tp ? np(e, r) : rp(e, r)) && (T = Fs(T, "onBeforeInput"), 0 < T.length && (A = new uu("onBeforeInput", "beforeinput", null, r, A), P.push({ event: A, listeners: T }), A.data = W));
      }
      Lu(P, t);
    });
  }
  function Dr(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function Fs(e, t) {
    for (var r = t + "Capture", o = []; e !== null; ) {
      var a = e, u = a.stateNode;
      a.tag === 5 && u !== null && (a = u, u = _r(e, r), u != null && o.unshift(Dr(e, u, a)), u = _r(e, t), u != null && o.push(Dr(e, u, a))), e = e.return;
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
  function zu(e, t, r, o, a) {
    for (var u = t._reactName, f = []; r !== null && r !== o; ) {
      var g = r, v = g.alternate, T = g.stateNode;
      if (v !== null && v === o) break;
      g.tag === 5 && T !== null && (g = T, a ? (v = _r(r, u), v != null && f.unshift(Dr(r, v, g))) : a || (v = _r(r, u), v != null && f.push(Dr(r, v, g)))), r = r.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var yp = /\r\n?/g, vp = /\u0000|\uFFFD/g;
  function Du(e) {
    return (typeof e == "string" ? e : "" + e).replace(yp, `
`).replace(vp, "");
  }
  function Bs(e, t, r) {
    if (t = Du(t), Du(e) !== t && r) throw Error(i(425));
  }
  function Us() {
  }
  var Oo = null, zo = null;
  function Do(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Fo = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, Fu = typeof Promise == "function" ? Promise : void 0, Sp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fu < "u" ? function(e) {
    return Fu.resolve(null).then(e).catch(wp);
  } : Fo;
  function wp(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Bo(e, t) {
    var r = t, o = 0;
    do {
      var a = r.nextSibling;
      if (e.removeChild(r), a && a.nodeType === 8) if (r = a.data, r === "/$") {
        if (o === 0) {
          e.removeChild(a), Ir(t);
          return;
        }
        o--;
      } else r !== "$" && r !== "$?" && r !== "$!" || o++;
      r = a;
    } while (r);
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
  function Bu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?") {
          if (t === 0) return e;
          t--;
        } else r === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Qn = Math.random().toString(36).slice(2), Nt = "__reactFiber$" + Qn, Fr = "__reactProps$" + Qn, Dt = "__reactContainer$" + Qn, Uo = "__reactEvents$" + Qn, xp = "__reactListeners$" + Qn, Ep = "__reactHandles$" + Qn;
  function yn(e) {
    var t = e[Nt];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Dt] || r[Nt]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Bu(e); e !== null; ) {
          if (r = e[Nt]) return r;
          e = Bu(e);
        }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Br(e) {
    return e = e[Nt] || e[Dt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Yn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function $s(e) {
    return e[Fr] || null;
  }
  var $o = [], Gn = -1;
  function rn(e) {
    return { current: e };
  }
  function ge(e) {
    0 > Gn || (e.current = $o[Gn], $o[Gn] = null, Gn--);
  }
  function pe(e, t) {
    Gn++, $o[Gn] = e.current, e.current = t;
  }
  var sn = {}, Ue = rn(sn), Xe = rn(!1), vn = sn;
  function Kn(e, t) {
    var r = e.type.contextTypes;
    if (!r) return sn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var a = {}, u;
    for (u in r) a[u] = t[u];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
  }
  function Ze(e) {
    return e = e.childContextTypes, e != null;
  }
  function Hs() {
    ge(Xe), ge(Ue);
  }
  function Uu(e, t, r) {
    if (Ue.current !== sn) throw Error(i(168));
    pe(Ue, t), pe(Xe, r);
  }
  function $u(e, t, r) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
    o = o.getChildContext();
    for (var a in o) if (!(a in t)) throw Error(i(108, he(e) || "Unknown", a));
    return F({}, r, o);
  }
  function Vs(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || sn, vn = Ue.current, pe(Ue, e), pe(Xe, Xe.current), !0;
  }
  function Hu(e, t, r) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    r ? (e = $u(e, t, vn), o.__reactInternalMemoizedMergedChildContext = e, ge(Xe), ge(Ue), pe(Ue, e)) : ge(Xe), pe(Xe, r);
  }
  var Ft = null, Ws = !1, Ho = !1;
  function Vu(e) {
    Ft === null ? Ft = [e] : Ft.push(e);
  }
  function kp(e) {
    Ws = !0, Vu(e);
  }
  function on() {
    if (!Ho && Ft !== null) {
      Ho = !0;
      var e = 0, t = de;
      try {
        var r = Ft;
        for (de = 1; e < r.length; e++) {
          var o = r[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Ft = null, Ws = !1;
      } catch (a) {
        throw Ft !== null && (Ft = Ft.slice(e + 1)), Ql(co, on), a;
      } finally {
        de = t, Ho = !1;
      }
    }
    return null;
  }
  var Jn = [], qn = 0, Qs = null, Ys = 0, ct = [], dt = 0, _n = null, Bt = 1, Ut = "";
  function Sn(e, t) {
    Jn[qn++] = Ys, Jn[qn++] = Qs, Qs = e, Ys = t;
  }
  function Wu(e, t, r) {
    ct[dt++] = Bt, ct[dt++] = Ut, ct[dt++] = _n, _n = e;
    var o = Bt;
    e = Ut;
    var a = 32 - _t(o) - 1;
    o &= ~(1 << a), r += 1;
    var u = 32 - _t(t) + a;
    if (30 < u) {
      var f = a - a % 5;
      u = (o & (1 << f) - 1).toString(32), o >>= f, a -= f, Bt = 1 << 32 - _t(t) + a | r << a | o, Ut = u + e;
    } else Bt = 1 << u | r << a | o, Ut = e;
  }
  function Vo(e) {
    e.return !== null && (Sn(e, 1), Wu(e, 1, 0));
  }
  function Wo(e) {
    for (; e === Qs; ) Qs = Jn[--qn], Jn[qn] = null, Ys = Jn[--qn], Jn[qn] = null;
    for (; e === _n; ) _n = ct[--dt], ct[dt] = null, Ut = ct[--dt], ct[dt] = null, Bt = ct[--dt], ct[dt] = null;
  }
  var ot = null, at = null, ve = !1, wt = null;
  function Qu(e, t) {
    var r = mt(5, null, null, 0);
    r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
  }
  function Yu(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ot = e, at = nn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ot = e, at = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (r = _n !== null ? { id: Bt, overflow: Ut } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = mt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, ot = e, at = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Qo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Yo(e) {
    if (ve) {
      var t = at;
      if (t) {
        var r = t;
        if (!Yu(e, t)) {
          if (Qo(e)) throw Error(i(418));
          t = nn(r.nextSibling);
          var o = ot;
          t && Yu(e, t) ? Qu(o, r) : (e.flags = e.flags & -4097 | 2, ve = !1, ot = e);
        }
      } else {
        if (Qo(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, ve = !1, ot = e;
      }
    }
  }
  function Gu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ot = e;
  }
  function Gs(e) {
    if (e !== ot) return !1;
    if (!ve) return Gu(e), ve = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Do(e.type, e.memoizedProps)), t && (t = at)) {
      if (Qo(e)) throw Ku(), Error(i(418));
      for (; t; ) Qu(e, t), t = nn(t.nextSibling);
    }
    if (Gu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                at = nn(e.nextSibling);
                break e;
              }
              t--;
            } else r !== "$" && r !== "$!" && r !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        at = null;
      }
    } else at = ot ? nn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ku() {
    for (var e = at; e; ) e = nn(e.nextSibling);
  }
  function Xn() {
    at = ot = null, ve = !1;
  }
  function Go(e) {
    wt === null ? wt = [e] : wt.push(e);
  }
  var Cp = X.ReactCurrentBatchConfig;
  function Ur(e, t, r) {
    if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (r._owner) {
        if (r = r._owner, r) {
          if (r.tag !== 1) throw Error(i(309));
          var o = r.stateNode;
        }
        if (!o) throw Error(i(147, e));
        var a = o, u = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(f) {
          var g = a.refs;
          f === null ? delete g[u] : g[u] = f;
        }, t._stringRef = u, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!r._owner) throw Error(i(290, e));
    }
    return e;
  }
  function Ks(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Ju(e) {
    var t = e._init;
    return t(e._payload);
  }
  function qu(e) {
    function t(x, S) {
      if (e) {
        var k = x.deletions;
        k === null ? (x.deletions = [S], x.flags |= 16) : k.push(S);
      }
    }
    function r(x, S) {
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
      return S === null || S.tag !== 6 ? (S = Fa(k, x.mode, j), S.return = x, S) : (S = a(S, k), S.return = x, S);
    }
    function v(x, S, k, j) {
      var $ = k.type;
      return $ === ue ? A(x, S, k.props.children, j, k.key) : S !== null && (S.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === qe && Ju($) === S.type) ? (j = a(S, k.props), j.ref = Ur(x, S, k), j.return = x, j) : (j = _i(k.type, k.key, k.props, null, x.mode, j), j.ref = Ur(x, S, k), j.return = x, j);
    }
    function T(x, S, k, j) {
      return S === null || S.tag !== 4 || S.stateNode.containerInfo !== k.containerInfo || S.stateNode.implementation !== k.implementation ? (S = Ba(k, x.mode, j), S.return = x, S) : (S = a(S, k.children || []), S.return = x, S);
    }
    function A(x, S, k, j, $) {
      return S === null || S.tag !== 7 ? (S = In(k, x.mode, j, $), S.return = x, S) : (S = a(S, k), S.return = x, S);
    }
    function P(x, S, k) {
      if (typeof S == "string" && S !== "" || typeof S == "number") return S = Fa("" + S, x.mode, k), S.return = x, S;
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Ee:
            return k = _i(S.type, S.key, S.props, null, x.mode, k), k.ref = Ur(x, null, S), k.return = x, k;
          case ne:
            return S = Ba(S, x.mode, k), S.return = x, S;
          case qe:
            var j = S._init;
            return P(x, j(S._payload), k);
        }
        if (gr(S) || Y(S)) return S = In(S, x.mode, k, null), S.return = x, S;
        Ks(x, S);
      }
      return null;
    }
    function M(x, S, k, j) {
      var $ = S !== null ? S.key : null;
      if (typeof k == "string" && k !== "" || typeof k == "number") return $ !== null ? null : g(x, S, "" + k, j);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case Ee:
            return k.key === $ ? v(x, S, k, j) : null;
          case ne:
            return k.key === $ ? T(x, S, k, j) : null;
          case qe:
            return $ = k._init, M(
              x,
              S,
              $(k._payload),
              j
            );
        }
        if (gr(k) || Y(k)) return $ !== null ? null : A(x, S, k, j, null);
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
        if (gr(j) || Y(j)) return x = x.get(k) || null, A(S, x, j, $, null);
        Ks(S, j);
      }
      return null;
    }
    function B(x, S, k, j) {
      for (var $ = null, V = null, W = S, K = S = 0, De = null; W !== null && K < k.length; K++) {
        W.index > K ? (De = W, W = null) : De = W.sibling;
        var ae = M(x, W, k[K], j);
        if (ae === null) {
          W === null && (W = De);
          break;
        }
        e && W && ae.alternate === null && t(x, W), S = u(ae, S, K), V === null ? $ = ae : V.sibling = ae, V = ae, W = De;
      }
      if (K === k.length) return r(x, W), ve && Sn(x, K), $;
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
      var $ = Y(k);
      if (typeof $ != "function") throw Error(i(150));
      if (k = $.call(k), k == null) throw Error(i(151));
      for (var V = $ = null, W = S, K = S = 0, De = null, ae = k.next(); W !== null && !ae.done; K++, ae = k.next()) {
        W.index > K ? (De = W, W = null) : De = W.sibling;
        var mn = M(x, W, ae.value, j);
        if (mn === null) {
          W === null && (W = De);
          break;
        }
        e && W && mn.alternate === null && t(x, W), S = u(mn, S, K), V === null ? $ = mn : V.sibling = mn, V = mn, W = De;
      }
      if (ae.done) return r(
        x,
        W
      ), ve && Sn(x, K), $;
      if (W === null) {
        for (; !ae.done; K++, ae = k.next()) ae = P(x, ae.value, j), ae !== null && (S = u(ae, S, K), V === null ? $ = ae : V.sibling = ae, V = ae);
        return ve && Sn(x, K), $;
      }
      for (W = o(x, W); !ae.done; K++, ae = k.next()) ae = O(W, x, K, ae.value, j), ae !== null && (e && ae.alternate !== null && W.delete(ae.key === null ? K : ae.key), S = u(ae, S, K), V === null ? $ = ae : V.sibling = ae, V = ae);
      return e && W.forEach(function(sm) {
        return t(x, sm);
      }), ve && Sn(x, K), $;
    }
    function Me(x, S, k, j) {
      if (typeof k == "object" && k !== null && k.type === ue && k.key === null && (k = k.props.children), typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case Ee:
            e: {
              for (var $ = k.key, V = S; V !== null; ) {
                if (V.key === $) {
                  if ($ = k.type, $ === ue) {
                    if (V.tag === 7) {
                      r(x, V.sibling), S = a(V, k.props.children), S.return = x, x = S;
                      break e;
                    }
                  } else if (V.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === qe && Ju($) === V.type) {
                    r(x, V.sibling), S = a(V, k.props), S.ref = Ur(x, V, k), S.return = x, x = S;
                    break e;
                  }
                  r(x, V);
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
                  r(x, S.sibling), S = a(S, k.children || []), S.return = x, x = S;
                  break e;
                } else {
                  r(x, S);
                  break;
                }
                else t(x, S);
                S = S.sibling;
              }
              S = Ba(k, x.mode, j), S.return = x, x = S;
            }
            return f(x);
          case qe:
            return V = k._init, Me(x, S, V(k._payload), j);
        }
        if (gr(k)) return B(x, S, k, j);
        if (Y(k)) return U(x, S, k, j);
        Ks(x, k);
      }
      return typeof k == "string" && k !== "" || typeof k == "number" ? (k = "" + k, S !== null && S.tag === 6 ? (r(x, S.sibling), S = a(S, k), S.return = x, x = S) : (r(x, S), S = Fa(k, x.mode, j), S.return = x, x = S), f(x)) : r(x, S);
    }
    return Me;
  }
  var Zn = qu(!0), Xu = qu(!1), Js = rn(null), qs = null, er = null, Ko = null;
  function Jo() {
    Ko = er = qs = null;
  }
  function qo(e) {
    var t = Js.current;
    ge(Js), e._currentValue = t;
  }
  function Xo(e, t, r) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function tr(e, t) {
    qs = e, Ko = er = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (et = !0), e.firstContext = null);
  }
  function ft(e) {
    var t = e._currentValue;
    if (Ko !== e) if (e = { context: e, memoizedValue: t, next: null }, er === null) {
      if (qs === null) throw Error(i(308));
      er = e, qs.dependencies = { lanes: 0, firstContext: e };
    } else er = er.next = e;
    return t;
  }
  var wn = null;
  function Zo(e) {
    wn === null ? wn = [e] : wn.push(e);
  }
  function Zu(e, t, r, o) {
    var a = t.interleaved;
    return a === null ? (r.next = r, Zo(t)) : (r.next = a.next, a.next = r), t.interleaved = r, $t(e, o);
  }
  function $t(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
    return r.tag === 3 ? r.stateNode : null;
  }
  var an = !1;
  function ea(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function ec(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Ht(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ln(e, t, r) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (re & 2) !== 0) {
      var a = o.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), o.pending = t, $t(e, r);
    }
    return a = o.interleaved, a === null ? (t.next = t, Zo(o)) : (t.next = a.next, a.next = t), o.interleaved = t, $t(e, r);
  }
  function Xs(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, po(e, r);
    }
  }
  function tc(e, t) {
    var r = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, r === o)) {
      var a = null, u = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var f = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
          u === null ? a = u = f : u = u.next = f, r = r.next;
        } while (r !== null);
        u === null ? a = u = t : u = u.next = t;
      } else a = u = t;
      r = { baseState: o.baseState, firstBaseUpdate: a, lastBaseUpdate: u, shared: o.shared, effects: o.effects }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  function Zs(e, t, r, o) {
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
        var M = g.lane, O = g.eventTime;
        if ((o & M) === M) {
          A !== null && (A = A.next = {
            eventTime: O,
            lane: 0,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null
          });
          e: {
            var B = e, U = g;
            switch (M = t, O = r, U.tag) {
              case 1:
                if (B = U.payload, typeof B == "function") {
                  P = B.call(O, P, M);
                  break e;
                }
                P = B;
                break e;
              case 3:
                B.flags = B.flags & -65537 | 128;
              case 0:
                if (B = U.payload, M = typeof B == "function" ? B.call(O, P, M) : B, M == null) break e;
                P = F({}, P, M);
                break e;
              case 2:
                an = !0;
            }
          }
          g.callback !== null && g.lane !== 0 && (e.flags |= 64, M = a.effects, M === null ? a.effects = [g] : M.push(g));
        } else O = { eventTime: O, lane: M, tag: g.tag, payload: g.payload, callback: g.callback, next: null }, A === null ? (T = A = O, v = P) : A = A.next = O, f |= M;
        if (g = g.next, g === null) {
          if (g = a.shared.pending, g === null) break;
          M = g, g = M.next, M.next = null, a.lastBaseUpdate = M, a.shared.pending = null;
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
  function nc(e, t, r) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], a = o.callback;
      if (a !== null) {
        if (o.callback = null, o = r, typeof a != "function") throw Error(i(191, a));
        a.call(o);
      }
    }
  }
  var $r = {}, At = rn($r), Hr = rn($r), Vr = rn($r);
  function xn(e) {
    if (e === $r) throw Error(i(174));
    return e;
  }
  function ta(e, t) {
    switch (pe(Vr, t), pe(Hr, e), pe(At, $r), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : to(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = to(t, e);
    }
    ge(At), pe(At, t);
  }
  function nr() {
    ge(At), ge(Hr), ge(Vr);
  }
  function rc(e) {
    xn(Vr.current);
    var t = xn(At.current), r = to(t, e.type);
    t !== r && (pe(Hr, e), pe(At, r));
  }
  function na(e) {
    Hr.current === e && (ge(At), ge(Hr));
  }
  var _e = rn(0);
  function ei(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t;
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
  var ra = [];
  function sa() {
    for (var e = 0; e < ra.length; e++) ra[e]._workInProgressVersionPrimary = null;
    ra.length = 0;
  }
  var ti = X.ReactCurrentDispatcher, ia = X.ReactCurrentBatchConfig, En = 0, Se = null, je = null, Oe = null, ni = !1, Wr = !1, Qr = 0, Tp = 0;
  function $e() {
    throw Error(i(321));
  }
  function oa(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++) if (!St(e[r], t[r])) return !1;
    return !0;
  }
  function aa(e, t, r, o, a, u) {
    if (En = u, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ti.current = e === null || e.memoizedState === null ? Mp : Np, e = r(o, a), Wr) {
      u = 0;
      do {
        if (Wr = !1, Qr = 0, 25 <= u) throw Error(i(301));
        u += 1, Oe = je = null, t.updateQueue = null, ti.current = Ap, e = r(o, a);
      } while (Wr);
    }
    if (ti.current = ii, t = je !== null && je.next !== null, En = 0, Oe = je = Se = null, ni = !1, t) throw Error(i(300));
    return e;
  }
  function la() {
    var e = Qr !== 0;
    return Qr = 0, e;
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
  function Yr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ua(e) {
    var t = ht(), r = t.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var o = je, a = o.baseQueue, u = r.pending;
    if (u !== null) {
      if (a !== null) {
        var f = a.next;
        a.next = u.next, u.next = f;
      }
      o.baseQueue = a = u, r.pending = null;
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
      v === null ? f = o : v.next = g, St(o, t.memoizedState) || (et = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = v, r.lastRenderedState = o;
    }
    if (e = r.interleaved, e !== null) {
      a = e;
      do
        u = a.lane, Se.lanes |= u, kn |= u, a = a.next;
      while (a !== e);
    } else a === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function ca(e) {
    var t = ht(), r = t.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var o = r.dispatch, a = r.pending, u = t.memoizedState;
    if (a !== null) {
      r.pending = null;
      var f = a = a.next;
      do
        u = e(u, f.action), f = f.next;
      while (f !== a);
      St(u, t.memoizedState) || (et = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), r.lastRenderedState = u;
    }
    return [u, o];
  }
  function sc() {
  }
  function ic(e, t) {
    var r = Se, o = ht(), a = t(), u = !St(o.memoizedState, a);
    if (u && (o.memoizedState = a, et = !0), o = o.queue, da(lc.bind(null, r, o, e), [e]), o.getSnapshot !== t || u || Oe !== null && Oe.memoizedState.tag & 1) {
      if (r.flags |= 2048, Gr(9, ac.bind(null, r, o, a, t), void 0, null), ze === null) throw Error(i(349));
      (En & 30) !== 0 || oc(r, t, a);
    }
    return a;
  }
  function oc(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = Se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Se.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function ac(e, t, r, o) {
    t.value = r, t.getSnapshot = o, uc(t) && cc(e);
  }
  function lc(e, t, r) {
    return r(function() {
      uc(t) && cc(e);
    });
  }
  function uc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !St(e, r);
    } catch {
      return !0;
    }
  }
  function cc(e) {
    var t = $t(e, 1);
    t !== null && Ct(t, e, 1, -1);
  }
  function dc(e) {
    var t = Pt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Yr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Rp.bind(null, Se, e), [t.memoizedState, e];
  }
  function Gr(e, t, r, o) {
    return e = { tag: e, create: t, destroy: r, deps: o, next: null }, t = Se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Se.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function fc() {
    return ht().memoizedState;
  }
  function ri(e, t, r, o) {
    var a = Pt();
    Se.flags |= e, a.memoizedState = Gr(1 | t, r, void 0, o === void 0 ? null : o);
  }
  function si(e, t, r, o) {
    var a = ht();
    o = o === void 0 ? null : o;
    var u = void 0;
    if (je !== null) {
      var f = je.memoizedState;
      if (u = f.destroy, o !== null && oa(o, f.deps)) {
        a.memoizedState = Gr(t, r, u, o);
        return;
      }
    }
    Se.flags |= e, a.memoizedState = Gr(1 | t, r, u, o);
  }
  function hc(e, t) {
    return ri(8390656, 8, e, t);
  }
  function da(e, t) {
    return si(2048, 8, e, t);
  }
  function pc(e, t) {
    return si(4, 2, e, t);
  }
  function mc(e, t) {
    return si(4, 4, e, t);
  }
  function gc(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function yc(e, t, r) {
    return r = r != null ? r.concat([e]) : null, si(4, 4, gc.bind(null, t, e), r);
  }
  function fa() {
  }
  function vc(e, t) {
    var r = ht();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && oa(t, o[1]) ? o[0] : (r.memoizedState = [e, t], e);
  }
  function _c(e, t) {
    var r = ht();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && oa(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [e, t], e);
  }
  function Sc(e, t, r) {
    return (En & 21) === 0 ? (e.baseState && (e.baseState = !1, et = !0), e.memoizedState = r) : (St(r, t) || (r = Jl(), Se.lanes |= r, kn |= r, e.baseState = !0), t);
  }
  function bp(e, t) {
    var r = de;
    de = r !== 0 && 4 > r ? r : 4, e(!0);
    var o = ia.transition;
    ia.transition = {};
    try {
      e(!1), t();
    } finally {
      de = r, ia.transition = o;
    }
  }
  function wc() {
    return ht().memoizedState;
  }
  function Ip(e, t, r) {
    var o = fn(e);
    if (r = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null }, xc(e)) Ec(t, r);
    else if (r = Zu(e, t, r, o), r !== null) {
      var a = Ye();
      Ct(r, e, o, a), kc(r, t, o);
    }
  }
  function Rp(e, t, r) {
    var o = fn(e), a = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null };
    if (xc(e)) Ec(t, a);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var f = t.lastRenderedState, g = u(f, r);
        if (a.hasEagerState = !0, a.eagerState = g, St(g, f)) {
          var v = t.interleaved;
          v === null ? (a.next = a, Zo(t)) : (a.next = v.next, v.next = a), t.interleaved = a;
          return;
        }
      } catch {
      }
      r = Zu(e, t, a, o), r !== null && (a = Ye(), Ct(r, e, o, a), kc(r, t, o));
    }
  }
  function xc(e) {
    var t = e.alternate;
    return e === Se || t !== null && t === Se;
  }
  function Ec(e, t) {
    Wr = ni = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function kc(e, t, r) {
    if ((r & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, po(e, r);
    }
  }
  var ii = { readContext: ft, useCallback: $e, useContext: $e, useEffect: $e, useImperativeHandle: $e, useInsertionEffect: $e, useLayoutEffect: $e, useMemo: $e, useReducer: $e, useRef: $e, useState: $e, useDebugValue: $e, useDeferredValue: $e, useTransition: $e, useMutableSource: $e, useSyncExternalStore: $e, useId: $e, unstable_isNewReconciler: !1 }, Mp = { readContext: ft, useCallback: function(e, t) {
    return Pt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: ft, useEffect: hc, useImperativeHandle: function(e, t, r) {
    return r = r != null ? r.concat([e]) : null, ri(
      4194308,
      4,
      gc.bind(null, t, e),
      r
    );
  }, useLayoutEffect: function(e, t) {
    return ri(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ri(4, 2, e, t);
  }, useMemo: function(e, t) {
    var r = Pt();
    return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
  }, useReducer: function(e, t, r) {
    var o = Pt();
    return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Ip.bind(null, Se, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Pt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: dc, useDebugValue: fa, useDeferredValue: function(e) {
    return Pt().memoizedState = e;
  }, useTransition: function() {
    var e = dc(!1), t = e[0];
    return e = bp.bind(null, e[1]), Pt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, r) {
    var o = Se, a = Pt();
    if (ve) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else {
      if (r = t(), ze === null) throw Error(i(349));
      (En & 30) !== 0 || oc(o, t, r);
    }
    a.memoizedState = r;
    var u = { value: r, getSnapshot: t };
    return a.queue = u, hc(lc.bind(
      null,
      o,
      u,
      e
    ), [e]), o.flags |= 2048, Gr(9, ac.bind(null, o, u, r, t), void 0, null), r;
  }, useId: function() {
    var e = Pt(), t = ze.identifierPrefix;
    if (ve) {
      var r = Ut, o = Bt;
      r = (o & ~(1 << 32 - _t(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = Qr++, 0 < r && (t += "H" + r.toString(32)), t += ":";
    } else r = Tp++, t = ":" + t + "r" + r.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Np = {
    readContext: ft,
    useCallback: vc,
    useContext: ft,
    useEffect: da,
    useImperativeHandle: yc,
    useInsertionEffect: pc,
    useLayoutEffect: mc,
    useMemo: _c,
    useReducer: ua,
    useRef: fc,
    useState: function() {
      return ua(Yr);
    },
    useDebugValue: fa,
    useDeferredValue: function(e) {
      var t = ht();
      return Sc(t, je.memoizedState, e);
    },
    useTransition: function() {
      var e = ua(Yr)[0], t = ht().memoizedState;
      return [e, t];
    },
    useMutableSource: sc,
    useSyncExternalStore: ic,
    useId: wc,
    unstable_isNewReconciler: !1
  }, Ap = { readContext: ft, useCallback: vc, useContext: ft, useEffect: da, useImperativeHandle: yc, useInsertionEffect: pc, useLayoutEffect: mc, useMemo: _c, useReducer: ca, useRef: fc, useState: function() {
    return ca(Yr);
  }, useDebugValue: fa, useDeferredValue: function(e) {
    var t = ht();
    return je === null ? t.memoizedState = e : Sc(t, je.memoizedState, e);
  }, useTransition: function() {
    var e = ca(Yr)[0], t = ht().memoizedState;
    return [e, t];
  }, useMutableSource: sc, useSyncExternalStore: ic, useId: wc, unstable_isNewReconciler: !1 };
  function xt(e, t) {
    if (e && e.defaultProps) {
      t = F({}, t), e = e.defaultProps;
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function ha(e, t, r, o) {
    t = e.memoizedState, r = r(o, t), r = r == null ? t : F({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var oi = { isMounted: function(e) {
    return (e = e._reactInternals) ? gn(e) === e : !1;
  }, enqueueSetState: function(e, t, r) {
    e = e._reactInternals;
    var o = Ye(), a = fn(e), u = Ht(o, a);
    u.payload = t, r != null && (u.callback = r), t = ln(e, u, a), t !== null && (Ct(t, e, a, o), Xs(t, e, a));
  }, enqueueReplaceState: function(e, t, r) {
    e = e._reactInternals;
    var o = Ye(), a = fn(e), u = Ht(o, a);
    u.tag = 1, u.payload = t, r != null && (u.callback = r), t = ln(e, u, a), t !== null && (Ct(t, e, a, o), Xs(t, e, a));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var r = Ye(), o = fn(e), a = Ht(r, o);
    a.tag = 2, t != null && (a.callback = t), t = ln(e, a, o), t !== null && (Ct(t, e, o, r), Xs(t, e, o));
  } };
  function Cc(e, t, r, o, a, u, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, f) : t.prototype && t.prototype.isPureReactComponent ? !jr(r, o) || !jr(a, u) : !0;
  }
  function Tc(e, t, r) {
    var o = !1, a = sn, u = t.contextType;
    return typeof u == "object" && u !== null ? u = ft(u) : (a = Ze(t) ? vn : Ue.current, o = t.contextTypes, u = (o = o != null) ? Kn(e, a) : sn), t = new t(r, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = oi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = u), t;
  }
  function bc(e, t, r, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && oi.enqueueReplaceState(t, t.state, null);
  }
  function pa(e, t, r, o) {
    var a = e.stateNode;
    a.props = r, a.state = e.memoizedState, a.refs = {}, ea(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? a.context = ft(u) : (u = Ze(t) ? vn : Ue.current, a.context = Kn(e, u)), a.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (ha(e, t, u, r), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && oi.enqueueReplaceState(a, a.state, null), Zs(e, r, a, o), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function rr(e, t) {
    try {
      var r = "", o = t;
      do
        r += ie(o), o = o.return;
      while (o);
      var a = r;
    } catch (u) {
      a = `
Error generating stack: ` + u.message + `
` + u.stack;
    }
    return { value: e, source: t, stack: a, digest: null };
  }
  function ma(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function ga(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  var Pp = typeof WeakMap == "function" ? WeakMap : Map;
  function Ic(e, t, r) {
    r = Ht(-1, r), r.tag = 3, r.payload = { element: null };
    var o = t.value;
    return r.callback = function() {
      hi || (hi = !0, Na = o), ga(e, t);
    }, r;
  }
  function Rc(e, t, r) {
    r = Ht(-1, r), r.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var a = t.value;
      r.payload = function() {
        return o(a);
      }, r.callback = function() {
        ga(e, t);
      };
    }
    var u = e.stateNode;
    return u !== null && typeof u.componentDidCatch == "function" && (r.callback = function() {
      ga(e, t), typeof o != "function" && (cn === null ? cn = /* @__PURE__ */ new Set([this]) : cn.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), r;
  }
  function Mc(e, t, r) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Pp();
      var a = /* @__PURE__ */ new Set();
      o.set(t, a);
    } else a = o.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), o.set(t, a));
    a.has(r) || (a.add(r), e = Yp.bind(null, e, t, r), t.then(e, e));
  }
  function Nc(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ac(e, t, r, o, a) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = Ht(-1, 1), t.tag = 2, ln(r, t, 1))), r.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e);
  }
  var jp = X.ReactCurrentOwner, et = !1;
  function Qe(e, t, r, o) {
    t.child = e === null ? Xu(t, null, r, o) : Zn(t, e.child, r, o);
  }
  function Pc(e, t, r, o, a) {
    r = r.render;
    var u = t.ref;
    return tr(t, a), o = aa(e, t, r, o, u, a), r = la(), e !== null && !et ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Vt(e, t, a)) : (ve && r && Vo(t), t.flags |= 1, Qe(e, t, o, a), t.child);
  }
  function jc(e, t, r, o, a) {
    if (e === null) {
      var u = r.type;
      return typeof u == "function" && !Da(u) && u.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = u, Lc(e, t, u, o, a)) : (e = _i(r.type, null, o, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, (e.lanes & a) === 0) {
      var f = u.memoizedProps;
      if (r = r.compare, r = r !== null ? r : jr, r(f, o) && e.ref === t.ref) return Vt(e, t, a);
    }
    return t.flags |= 1, e = pn(u, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Lc(e, t, r, o, a) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (jr(u, o) && e.ref === t.ref) if (et = !1, t.pendingProps = o = u, (e.lanes & a) !== 0) (e.flags & 131072) !== 0 && (et = !0);
      else return t.lanes = e.lanes, Vt(e, t, a);
    }
    return ya(e, t, r, o, a);
  }
  function Oc(e, t, r) {
    var o = t.pendingProps, a = o.children, u = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, pe(ir, lt), lt |= r;
    else {
      if ((r & 1073741824) === 0) return e = u !== null ? u.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, pe(ir, lt), lt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = u !== null ? u.baseLanes : r, pe(ir, lt), lt |= o;
    }
    else u !== null ? (o = u.baseLanes | r, t.memoizedState = null) : o = r, pe(ir, lt), lt |= o;
    return Qe(e, t, a, r), t.child;
  }
  function zc(e, t) {
    var r = t.ref;
    (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ya(e, t, r, o, a) {
    var u = Ze(r) ? vn : Ue.current;
    return u = Kn(t, u), tr(t, a), r = aa(e, t, r, o, u, a), o = la(), e !== null && !et ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Vt(e, t, a)) : (ve && o && Vo(t), t.flags |= 1, Qe(e, t, r, a), t.child);
  }
  function Dc(e, t, r, o, a) {
    if (Ze(r)) {
      var u = !0;
      Vs(t);
    } else u = !1;
    if (tr(t, a), t.stateNode === null) li(e, t), Tc(t, r, o), pa(t, r, o, a), o = !0;
    else if (e === null) {
      var f = t.stateNode, g = t.memoizedProps;
      f.props = g;
      var v = f.context, T = r.contextType;
      typeof T == "object" && T !== null ? T = ft(T) : (T = Ze(r) ? vn : Ue.current, T = Kn(t, T));
      var A = r.getDerivedStateFromProps, P = typeof A == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      P || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== o || v !== T) && bc(t, f, o, T), an = !1;
      var M = t.memoizedState;
      f.state = M, Zs(t, o, f, a), v = t.memoizedState, g !== o || M !== v || Xe.current || an ? (typeof A == "function" && (ha(t, r, A, o), v = t.memoizedState), (g = an || Cc(t, r, g, o, M, v, T)) ? (P || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = v), f.props = o, f.state = v, f.context = T, o = g) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, ec(e, t), g = t.memoizedProps, T = t.type === t.elementType ? g : xt(t.type, g), f.props = T, P = t.pendingProps, M = f.context, v = r.contextType, typeof v == "object" && v !== null ? v = ft(v) : (v = Ze(r) ? vn : Ue.current, v = Kn(t, v));
      var O = r.getDerivedStateFromProps;
      (A = typeof O == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== P || M !== v) && bc(t, f, o, v), an = !1, M = t.memoizedState, f.state = M, Zs(t, o, f, a);
      var B = t.memoizedState;
      g !== P || M !== B || Xe.current || an ? (typeof O == "function" && (ha(t, r, O, o), B = t.memoizedState), (T = an || Cc(t, r, T, o, M, B, v) || !1) ? (A || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, B, v), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, B, v)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = B), f.props = o, f.state = B, f.context = v, o = T) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return va(e, t, r, o, u, a);
  }
  function va(e, t, r, o, a, u) {
    zc(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return a && Hu(t, r, !1), Vt(e, t, u);
    o = t.stateNode, jp.current = t;
    var g = f && typeof r.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = Zn(t, e.child, null, u), t.child = Zn(t, null, g, u)) : Qe(e, t, g, u), t.memoizedState = o.state, a && Hu(t, r, !0), t.child;
  }
  function Fc(e) {
    var t = e.stateNode;
    t.pendingContext ? Uu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Uu(e, t.context, !1), ta(e, t.containerInfo);
  }
  function Bc(e, t, r, o, a) {
    return Xn(), Go(a), t.flags |= 256, Qe(e, t, r, o), t.child;
  }
  var _a = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Sa(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Uc(e, t, r) {
    var o = t.pendingProps, a = _e.current, u = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), g ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), pe(_e, a & 1), e === null)
      return Yo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && u !== null ? (u.childLanes = 0, u.pendingProps = f) : u = Si(f, o, 0, null), e = In(e, o, r, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = Sa(r), t.memoizedState = _a, e) : wa(t, f));
    if (a = e.memoizedState, a !== null && (g = a.dehydrated, g !== null)) return Lp(e, t, f, o, g, a, r);
    if (u) {
      u = o.fallback, f = t.mode, a = e.child, g = a.sibling;
      var v = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== a ? (o = t.child, o.childLanes = 0, o.pendingProps = v, t.deletions = null) : (o = pn(a, v), o.subtreeFlags = a.subtreeFlags & 14680064), g !== null ? u = pn(g, u) : (u = In(u, f, r, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, f = e.child.memoizedState, f = f === null ? Sa(r) : { baseLanes: f.baseLanes | r, cachePool: null, transitions: f.transitions }, u.memoizedState = f, u.childLanes = e.childLanes & ~r, t.memoizedState = _a, o;
    }
    return u = e.child, e = u.sibling, o = pn(u, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function wa(e, t) {
    return t = Si({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function ai(e, t, r, o) {
    return o !== null && Go(o), Zn(t, e.child, null, r), e = wa(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Lp(e, t, r, o, a, u, f) {
    if (r)
      return t.flags & 256 ? (t.flags &= -257, o = ma(Error(i(422))), ai(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, a = t.mode, o = Si({ mode: "visible", children: o.children }, a, 0, null), u = In(u, a, f, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & 1) !== 0 && Zn(t, e.child, null, f), t.child.memoizedState = Sa(f), t.memoizedState = _a, u);
    if ((t.mode & 1) === 0) return ai(e, t, f, null);
    if (a.data === "$!") {
      if (o = a.nextSibling && a.nextSibling.dataset, o) var g = o.dgst;
      return o = g, u = Error(i(419)), o = ma(u, o, void 0), ai(e, t, f, o);
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
      return za(), o = ma(Error(i(421))), ai(e, t, f, o);
    }
    return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Gp.bind(null, e), a._reactRetry = t, null) : (e = u.treeContext, at = nn(a.nextSibling), ot = t, ve = !0, wt = null, e !== null && (ct[dt++] = Bt, ct[dt++] = Ut, ct[dt++] = _n, Bt = e.id, Ut = e.overflow, _n = t), t = wa(t, o.children), t.flags |= 4096, t);
  }
  function $c(e, t, r) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), Xo(e.return, t, r);
  }
  function xa(e, t, r, o, a) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: r, tailMode: a } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = r, u.tailMode = a);
  }
  function Hc(e, t, r) {
    var o = t.pendingProps, a = o.revealOrder, u = o.tail;
    if (Qe(e, t, o.children, r), o = _e.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && $c(e, r, t);
        else if (e.tag === 19) $c(e, r, t);
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
        for (r = t.child, a = null; r !== null; ) e = r.alternate, e !== null && ei(e) === null && (a = r), r = r.sibling;
        r = a, r === null ? (a = t.child, t.child = null) : (a = r.sibling, r.sibling = null), xa(t, !1, a, r, u);
        break;
      case "backwards":
        for (r = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && ei(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = r, r = a, a = e;
        }
        xa(t, !0, r, null, u);
        break;
      case "together":
        xa(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function li(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Vt(e, t, r) {
    if (e !== null && (t.dependencies = e.dependencies), kn |= t.lanes, (r & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, r = pn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = pn(e, e.pendingProps), r.return = t;
      r.sibling = null;
    }
    return t.child;
  }
  function Op(e, t, r) {
    switch (t.tag) {
      case 3:
        Fc(t), Xn();
        break;
      case 5:
        rc(t);
        break;
      case 1:
        Ze(t.type) && Vs(t);
        break;
      case 4:
        ta(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, a = t.memoizedProps.value;
        pe(Js, o._currentValue), o._currentValue = a;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (pe(_e, _e.current & 1), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? Uc(e, t, r) : (pe(_e, _e.current & 1), e = Vt(e, t, r), e !== null ? e.sibling : null);
        pe(_e, _e.current & 1);
        break;
      case 19:
        if (o = (r & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return Hc(e, t, r);
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), pe(_e, _e.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Oc(e, t, r);
    }
    return Vt(e, t, r);
  }
  var Vc, Ea, Wc, Qc;
  Vc = function(e, t) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
      else if (r.tag !== 4 && r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  }, Ea = function() {
  }, Wc = function(e, t, r, o) {
    var a = e.memoizedProps;
    if (a !== o) {
      e = t.stateNode, xn(At.current);
      var u = null;
      switch (r) {
        case "input":
          a = qi(e, a), o = qi(e, o), u = [];
          break;
        case "select":
          a = F({}, a, { value: void 0 }), o = F({}, o, { value: void 0 }), u = [];
          break;
        case "textarea":
          a = eo(e, a), o = eo(e, o), u = [];
          break;
        default:
          typeof a.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Us);
      }
      no(r, o);
      var f;
      r = null;
      for (T in a) if (!o.hasOwnProperty(T) && a.hasOwnProperty(T) && a[T] != null) if (T === "style") {
        var g = a[T];
        for (f in g) g.hasOwnProperty(f) && (r || (r = {}), r[f] = "");
      } else T !== "dangerouslySetInnerHTML" && T !== "children" && T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && T !== "autoFocus" && (c.hasOwnProperty(T) ? u || (u = []) : (u = u || []).push(T, null));
      for (T in o) {
        var v = o[T];
        if (g = a?.[T], o.hasOwnProperty(T) && v !== g && (v != null || g != null)) if (T === "style") if (g) {
          for (f in g) !g.hasOwnProperty(f) || v && v.hasOwnProperty(f) || (r || (r = {}), r[f] = "");
          for (f in v) v.hasOwnProperty(f) && g[f] !== v[f] && (r || (r = {}), r[f] = v[f]);
        } else r || (u || (u = []), u.push(
          T,
          r
        )), r = v;
        else T === "dangerouslySetInnerHTML" ? (v = v ? v.__html : void 0, g = g ? g.__html : void 0, v != null && g !== v && (u = u || []).push(T, v)) : T === "children" ? typeof v != "string" && typeof v != "number" || (u = u || []).push(T, "" + v) : T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && (c.hasOwnProperty(T) ? (v != null && T === "onScroll" && me("scroll", e), u || g === v || (u = [])) : (u = u || []).push(T, v));
      }
      r && (u = u || []).push("style", r);
      var T = u;
      (t.updateQueue = T) && (t.flags |= 4);
    }
  }, Qc = function(e, t, r, o) {
    r !== o && (t.flags |= 4);
  };
  function Kr(e, t) {
    if (!ve) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
        r === null ? e.tail = null : r.sibling = null;
        break;
      case "collapsed":
        r = e.tail;
        for (var o = null; r !== null; ) r.alternate !== null && (o = r), r = r.sibling;
        o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
    }
  }
  function He(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
    if (t) for (var a = e.child; a !== null; ) r |= a.lanes | a.childLanes, o |= a.subtreeFlags & 14680064, o |= a.flags & 14680064, a.return = e, a = a.sibling;
    else for (a = e.child; a !== null; ) r |= a.lanes | a.childLanes, o |= a.subtreeFlags, o |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= o, e.childLanes = r, t;
  }
  function zp(e, t, r) {
    var o = t.pendingProps;
    switch (Wo(t), t.tag) {
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
        return o = t.stateNode, nr(), ge(Xe), ge(Ue), sa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (Gs(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, wt !== null && (ja(wt), wt = null))), Ea(e, t), He(t), null;
      case 5:
        na(t);
        var a = xn(Vr.current);
        if (r = t.type, e !== null && t.stateNode != null) Wc(e, t, r, o, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return He(t), null;
          }
          if (e = xn(At.current), Gs(t)) {
            o = t.stateNode, r = t.type;
            var u = t.memoizedProps;
            switch (o[Nt] = t, o[Fr] = u, e = (t.mode & 1) !== 0, r) {
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
                Tl(o, u), me("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!u.multiple }, me("invalid", o);
                break;
              case "textarea":
                Rl(o, u), me("invalid", o);
            }
            no(r, u), a = null;
            for (var f in u) if (u.hasOwnProperty(f)) {
              var g = u[f];
              f === "children" ? typeof g == "string" ? o.textContent !== g && (u.suppressHydrationWarning !== !0 && Bs(o.textContent, g, e), a = ["children", g]) : typeof g == "number" && o.textContent !== "" + g && (u.suppressHydrationWarning !== !0 && Bs(
                o.textContent,
                g,
                e
              ), a = ["children", "" + g]) : c.hasOwnProperty(f) && g != null && f === "onScroll" && me("scroll", o);
            }
            switch (r) {
              case "input":
                ys(o), Il(o, u, !0);
                break;
              case "textarea":
                ys(o), Nl(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (o.onclick = Us);
            }
            o = a, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            f = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Al(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(r, { is: o.is }) : (e = f.createElement(r), r === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, r), e[Nt] = t, e[Fr] = o, Vc(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = ro(r, o), r) {
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
                  Tl(e, o), a = qi(e, o), me("invalid", e);
                  break;
                case "option":
                  a = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, a = F({}, o, { value: void 0 }), me("invalid", e);
                  break;
                case "textarea":
                  Rl(e, o), a = eo(e, o), me("invalid", e);
                  break;
                default:
                  a = o;
              }
              no(r, a), g = a;
              for (u in g) if (g.hasOwnProperty(u)) {
                var v = g[u];
                u === "style" ? Ll(e, v) : u === "dangerouslySetInnerHTML" ? (v = v ? v.__html : void 0, v != null && Pl(e, v)) : u === "children" ? typeof v == "string" ? (r !== "textarea" || v !== "") && yr(e, v) : typeof v == "number" && yr(e, "" + v) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (c.hasOwnProperty(u) ? v != null && u === "onScroll" && me("scroll", e) : v != null && J(e, u, v, f));
              }
              switch (r) {
                case "input":
                  ys(e), Il(e, o, !1);
                  break;
                case "textarea":
                  ys(e), Nl(e);
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
              switch (r) {
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
        if (e && t.stateNode != null) Qc(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (r = xn(Vr.current), xn(At.current), Gs(t)) {
            if (o = t.stateNode, r = t.memoizedProps, o[Nt] = t, (u = o.nodeValue !== r) && (e = ot, e !== null)) switch (e.tag) {
              case 3:
                Bs(o.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Bs(o.nodeValue, r, (e.mode & 1) !== 0);
            }
            u && (t.flags |= 4);
          } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[Nt] = t, t.stateNode = o;
        }
        return He(t), null;
      case 13:
        if (ge(_e), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ve && at !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Ku(), Xn(), t.flags |= 98560, u = !1;
          else if (u = Gs(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(i(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(i(317));
              u[Nt] = t;
            } else Xn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            He(t), u = !1;
          } else wt !== null && (ja(wt), wt = null), u = !0;
          if (!u) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (_e.current & 1) !== 0 ? Le === 0 && (Le = 3) : za())), t.updateQueue !== null && (t.flags |= 4), He(t), null);
      case 4:
        return nr(), Ea(e, t), e === null && zr(t.stateNode.containerInfo), He(t), null;
      case 10:
        return qo(t.type._context), He(t), null;
      case 17:
        return Ze(t.type) && Hs(), He(t), null;
      case 19:
        if (ge(_e), u = t.memoizedState, u === null) return He(t), null;
        if (o = (t.flags & 128) !== 0, f = u.rendering, f === null) if (o) Kr(u, !1);
        else {
          if (Le !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = ei(e), f !== null) {
              for (t.flags |= 128, Kr(u, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) u = r, e = o, u.flags &= 14680066, f = u.alternate, f === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = f.childLanes, u.lanes = f.lanes, u.child = f.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = f.memoizedProps, u.memoizedState = f.memoizedState, u.updateQueue = f.updateQueue, u.type = f.type, e = f.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
              return pe(_e, _e.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          u.tail !== null && Re() > or && (t.flags |= 128, o = !0, Kr(u, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = ei(f), e !== null) {
            if (t.flags |= 128, o = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), Kr(u, !0), u.tail === null && u.tailMode === "hidden" && !f.alternate && !ve) return He(t), null;
          } else 2 * Re() - u.renderingStartTime > or && r !== 1073741824 && (t.flags |= 128, o = !0, Kr(u, !1), t.lanes = 4194304);
          u.isBackwards ? (f.sibling = t.child, t.child = f) : (r = u.last, r !== null ? r.sibling = f : t.child = f, u.last = f);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = Re(), t.sibling = null, r = _e.current, pe(_e, o ? r & 1 | 2 : r & 1), t) : (He(t), null);
      case 22:
      case 23:
        return Oa(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (lt & 1073741824) !== 0 && (He(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : He(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Dp(e, t) {
    switch (Wo(t), t.tag) {
      case 1:
        return Ze(t.type) && Hs(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return nr(), ge(Xe), ge(Ue), sa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return na(t), null;
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
        return qo(t.type._context), null;
      case 22:
      case 23:
        return Oa(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ui = !1, Ve = !1, Fp = typeof WeakSet == "function" ? WeakSet : Set, D = null;
  function sr(e, t) {
    var r = e.ref;
    if (r !== null) if (typeof r == "function") try {
      r(null);
    } catch (o) {
      Ce(e, t, o);
    }
    else r.current = null;
  }
  function ka(e, t, r) {
    try {
      r();
    } catch (o) {
      Ce(e, t, o);
    }
  }
  var Yc = !1;
  function Bp(e, t) {
    if (Oo = Rs, e = Cu(), Io(e)) {
      if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        r = (r = e.ownerDocument) && r.defaultView || window;
        var o = r.getSelection && r.getSelection();
        if (o && o.rangeCount !== 0) {
          r = o.anchorNode;
          var a = o.anchorOffset, u = o.focusNode;
          o = o.focusOffset;
          try {
            r.nodeType, u.nodeType;
          } catch {
            r = null;
            break e;
          }
          var f = 0, g = -1, v = -1, T = 0, A = 0, P = e, M = null;
          t: for (; ; ) {
            for (var O; P !== r || a !== 0 && P.nodeType !== 3 || (g = f + a), P !== u || o !== 0 && P.nodeType !== 3 || (v = f + o), P.nodeType === 3 && (f += P.nodeValue.length), (O = P.firstChild) !== null; )
              M = P, P = O;
            for (; ; ) {
              if (P === e) break t;
              if (M === r && ++T === a && (g = f), M === u && ++A === o && (v = f), (O = P.nextSibling) !== null) break;
              P = M, M = P.parentNode;
            }
            P = O;
          }
          r = g === -1 || v === -1 ? null : { start: g, end: v };
        } else r = null;
      }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (zo = { focusedElem: e, selectionRange: r }, Rs = !1, D = t; D !== null; ) if (t = D, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, D = e;
    else for (; D !== null; ) {
      t = D;
      try {
        var B = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (B !== null) {
              var U = B.memoizedProps, Me = B.memoizedState, x = t.stateNode, S = x.getSnapshotBeforeUpdate(t.elementType === t.type ? U : xt(t.type, U), Me);
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
    return B = Yc, Yc = !1, B;
  }
  function Jr(e, t, r) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var a = o = o.next;
      do {
        if ((a.tag & e) === e) {
          var u = a.destroy;
          a.destroy = void 0, u !== void 0 && ka(t, r, u);
        }
        a = a.next;
      } while (a !== o);
    }
  }
  function ci(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var r = t = t.next;
      do {
        if ((r.tag & e) === e) {
          var o = r.create;
          r.destroy = o();
        }
        r = r.next;
      } while (r !== t);
    }
  }
  function Ca(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode;
      e.tag, e = r, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Gc(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Gc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Nt], delete t[Fr], delete t[Uo], delete t[xp], delete t[Ep])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Kc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Jc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Kc(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ta(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = Us));
    else if (o !== 4 && (e = e.child, e !== null)) for (Ta(e, t, r), e = e.sibling; e !== null; ) Ta(e, t, r), e = e.sibling;
  }
  function ba(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (ba(e, t, r), e = e.sibling; e !== null; ) ba(e, t, r), e = e.sibling;
  }
  var Fe = null, Et = !1;
  function un(e, t, r) {
    for (r = r.child; r !== null; ) qc(e, t, r), r = r.sibling;
  }
  function qc(e, t, r) {
    if (Mt && typeof Mt.onCommitFiberUnmount == "function") try {
      Mt.onCommitFiberUnmount(Es, r);
    } catch {
    }
    switch (r.tag) {
      case 5:
        Ve || sr(r, t);
      case 6:
        var o = Fe, a = Et;
        Fe = null, un(e, t, r), Fe = o, Et = a, Fe !== null && (Et ? (e = Fe, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Fe.removeChild(r.stateNode));
        break;
      case 18:
        Fe !== null && (Et ? (e = Fe, r = r.stateNode, e.nodeType === 8 ? Bo(e.parentNode, r) : e.nodeType === 1 && Bo(e, r), Ir(e)) : Bo(Fe, r.stateNode));
        break;
      case 4:
        o = Fe, a = Et, Fe = r.stateNode.containerInfo, Et = !0, un(e, t, r), Fe = o, Et = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ve && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          a = o = o.next;
          do {
            var u = a, f = u.destroy;
            u = u.tag, f !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && ka(r, t, f), a = a.next;
          } while (a !== o);
        }
        un(e, t, r);
        break;
      case 1:
        if (!Ve && (sr(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
        } catch (g) {
          Ce(r, t, g);
        }
        un(e, t, r);
        break;
      case 21:
        un(e, t, r);
        break;
      case 22:
        r.mode & 1 ? (Ve = (o = Ve) || r.memoizedState !== null, un(e, t, r), Ve = o) : un(e, t, r);
        break;
      default:
        un(e, t, r);
    }
  }
  function Xc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      r === null && (r = e.stateNode = new Fp()), t.forEach(function(o) {
        var a = Kp.bind(null, e, o);
        r.has(o) || (r.add(o), o.then(a, a));
      });
    }
  }
  function kt(e, t) {
    var r = t.deletions;
    if (r !== null) for (var o = 0; o < r.length; o++) {
      var a = r[o];
      try {
        var u = e, f = t, g = f;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 5:
              Fe = g.stateNode, Et = !1;
              break e;
            case 3:
              Fe = g.stateNode.containerInfo, Et = !0;
              break e;
            case 4:
              Fe = g.stateNode.containerInfo, Et = !0;
              break e;
          }
          g = g.return;
        }
        if (Fe === null) throw Error(i(160));
        qc(u, f, a), Fe = null, Et = !1;
        var v = a.alternate;
        v !== null && (v.return = null), a.return = null;
      } catch (T) {
        Ce(a, t, T);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Zc(t, e), t = t.sibling;
  }
  function Zc(e, t) {
    var r = e.alternate, o = e.flags;
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
        kt(t, e), jt(e), o & 512 && r !== null && sr(r, r.return);
        break;
      case 5:
        if (kt(t, e), jt(e), o & 512 && r !== null && sr(r, r.return), e.flags & 32) {
          var a = e.stateNode;
          try {
            yr(a, "");
          } catch (U) {
            Ce(e, e.return, U);
          }
        }
        if (o & 4 && (a = e.stateNode, a != null)) {
          var u = e.memoizedProps, f = r !== null ? r.memoizedProps : u, g = e.type, v = e.updateQueue;
          if (e.updateQueue = null, v !== null) try {
            g === "input" && u.type === "radio" && u.name != null && bl(a, u), ro(g, f);
            var T = ro(g, u);
            for (f = 0; f < v.length; f += 2) {
              var A = v[f], P = v[f + 1];
              A === "style" ? Ll(a, P) : A === "dangerouslySetInnerHTML" ? Pl(a, P) : A === "children" ? yr(a, P) : J(a, A, P, T);
            }
            switch (g) {
              case "input":
                Xi(a, u);
                break;
              case "textarea":
                Ml(a, u);
                break;
              case "select":
                var M = a._wrapperState.wasMultiple;
                a._wrapperState.wasMultiple = !!u.multiple;
                var O = u.value;
                O != null ? zn(a, !!u.multiple, O, !1) : M !== !!u.multiple && (u.defaultValue != null ? zn(
                  a,
                  !!u.multiple,
                  u.defaultValue,
                  !0
                ) : zn(a, !!u.multiple, u.multiple ? [] : "", !1));
            }
            a[Fr] = u;
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
        if (kt(t, e), jt(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
          Ir(t.containerInfo);
        } catch (U) {
          Ce(e, e.return, U);
        }
        break;
      case 4:
        kt(t, e), jt(e);
        break;
      case 13:
        kt(t, e), jt(e), a = e.child, a.flags & 8192 && (u = a.memoizedState !== null, a.stateNode.isHidden = u, !u || a.alternate !== null && a.alternate.memoizedState !== null || (Ma = Re())), o & 4 && Xc(e);
        break;
      case 22:
        if (A = r !== null && r.memoizedState !== null, e.mode & 1 ? (Ve = (T = Ve) || A, kt(t, e), Ve = T) : kt(t, e), jt(e), o & 8192) {
          if (T = e.memoizedState !== null, (e.stateNode.isHidden = T) && !A && (e.mode & 1) !== 0) for (D = e, A = e.child; A !== null; ) {
            for (P = D = A; D !== null; ) {
              switch (M = D, O = M.child, M.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Jr(4, M, M.return);
                  break;
                case 1:
                  sr(M, M.return);
                  var B = M.stateNode;
                  if (typeof B.componentWillUnmount == "function") {
                    o = M, r = M.return;
                    try {
                      t = o, B.props = t.memoizedProps, B.state = t.memoizedState, B.componentWillUnmount();
                    } catch (U) {
                      Ce(o, r, U);
                    }
                  }
                  break;
                case 5:
                  sr(M, M.return);
                  break;
                case 22:
                  if (M.memoizedState !== null) {
                    nd(P);
                    continue;
                  }
              }
              O !== null ? (O.return = M, D = O) : nd(P);
            }
            A = A.sibling;
          }
          e: for (A = null, P = e; ; ) {
            if (P.tag === 5) {
              if (A === null) {
                A = P;
                try {
                  a = P.stateNode, T ? (u = a.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (g = P.stateNode, v = P.memoizedProps.style, f = v != null && v.hasOwnProperty("display") ? v.display : null, g.style.display = jl("display", f));
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
        kt(t, e), jt(e), o & 4 && Xc(e);
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
          for (var r = e.return; r !== null; ) {
            if (Kc(r)) {
              var o = r;
              break e;
            }
            r = r.return;
          }
          throw Error(i(160));
        }
        switch (o.tag) {
          case 5:
            var a = o.stateNode;
            o.flags & 32 && (yr(a, ""), o.flags &= -33);
            var u = Jc(e);
            ba(e, u, a);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, g = Jc(e);
            Ta(e, g, f);
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
  function Up(e, t, r) {
    D = e, ed(e);
  }
  function ed(e, t, r) {
    for (var o = (e.mode & 1) !== 0; D !== null; ) {
      var a = D, u = a.child;
      if (a.tag === 22 && o) {
        var f = a.memoizedState !== null || ui;
        if (!f) {
          var g = a.alternate, v = g !== null && g.memoizedState !== null || Ve;
          g = ui;
          var T = Ve;
          if (ui = f, (Ve = v) && !T) for (D = a; D !== null; ) f = D, v = f.child, f.tag === 22 && f.memoizedState !== null ? rd(a) : v !== null ? (v.return = f, D = v) : rd(a);
          for (; u !== null; ) D = u, ed(u), u = u.sibling;
          D = a, ui = g, Ve = T;
        }
        td(e);
      } else (a.subtreeFlags & 8772) !== 0 && u !== null ? (u.return = a, D = u) : td(e);
    }
  }
  function td(e) {
    for (; D !== null; ) {
      var t = D;
      if ((t.flags & 8772) !== 0) {
        var r = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ve || ci(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !Ve) if (r === null) o.componentDidMount();
              else {
                var a = t.elementType === t.type ? r.memoizedProps : xt(t.type, r.memoizedProps);
                o.componentDidUpdate(a, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var u = t.updateQueue;
              u !== null && nc(t, u, o);
              break;
            case 3:
              var f = t.updateQueue;
              if (f !== null) {
                if (r = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    r = t.child.stateNode;
                    break;
                  case 1:
                    r = t.child.stateNode;
                }
                nc(t, f, r);
              }
              break;
            case 5:
              var g = t.stateNode;
              if (r === null && t.flags & 4) {
                r = g;
                var v = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    v.autoFocus && r.focus();
                    break;
                  case "img":
                    v.src && (r.src = v.src);
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
          Ve || t.flags & 512 && Ca(t);
        } catch (M) {
          Ce(t, t.return, M);
        }
      }
      if (t === e) {
        D = null;
        break;
      }
      if (r = t.sibling, r !== null) {
        r.return = t.return, D = r;
        break;
      }
      D = t.return;
    }
  }
  function nd(e) {
    for (; D !== null; ) {
      var t = D;
      if (t === e) {
        D = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, D = r;
        break;
      }
      D = t.return;
    }
  }
  function rd(e) {
    for (; D !== null; ) {
      var t = D;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              ci(4, t);
            } catch (v) {
              Ce(t, r, v);
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
              Ca(t);
            } catch (v) {
              Ce(t, u, v);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Ca(t);
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
  var $p = Math.ceil, di = X.ReactCurrentDispatcher, Ia = X.ReactCurrentOwner, pt = X.ReactCurrentBatchConfig, re = 0, ze = null, Ne = null, Be = 0, lt = 0, ir = rn(0), Le = 0, qr = null, kn = 0, fi = 0, Ra = 0, Xr = null, tt = null, Ma = 0, or = 1 / 0, Wt = null, hi = !1, Na = null, cn = null, pi = !1, dn = null, mi = 0, Zr = 0, Aa = null, gi = -1, yi = 0;
  function Ye() {
    return (re & 6) !== 0 ? Re() : gi !== -1 ? gi : gi = Re();
  }
  function fn(e) {
    return (e.mode & 1) === 0 ? 1 : (re & 2) !== 0 && Be !== 0 ? Be & -Be : Cp.transition !== null ? (yi === 0 && (yi = Jl()), yi) : (e = de, e !== 0 || (e = window.event, e = e === void 0 ? 16 : iu(e.type)), e);
  }
  function Ct(e, t, r, o) {
    if (50 < Zr) throw Zr = 0, Aa = null, Error(i(185));
    Er(e, r, o), ((re & 2) === 0 || e !== ze) && (e === ze && ((re & 2) === 0 && (fi |= r), Le === 4 && hn(e, Be)), nt(e, o), r === 1 && re === 0 && (t.mode & 1) === 0 && (or = Re() + 500, Ws && on()));
  }
  function nt(e, t) {
    var r = e.callbackNode;
    Ch(e, t);
    var o = Ts(e, e === ze ? Be : 0);
    if (o === 0) r !== null && Yl(r), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (r != null && Yl(r), t === 1) e.tag === 0 ? kp(id.bind(null, e)) : Vu(id.bind(null, e)), Sp(function() {
        (re & 6) === 0 && on();
      }), r = null;
      else {
        switch (ql(o)) {
          case 1:
            r = co;
            break;
          case 4:
            r = Gl;
            break;
          case 16:
            r = xs;
            break;
          case 536870912:
            r = Kl;
            break;
          default:
            r = xs;
        }
        r = hd(r, sd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = r;
    }
  }
  function sd(e, t) {
    if (gi = -1, yi = 0, (re & 6) !== 0) throw Error(i(327));
    var r = e.callbackNode;
    if (ar() && e.callbackNode !== r) return null;
    var o = Ts(e, e === ze ? Be : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = vi(e, o);
    else {
      t = o;
      var a = re;
      re |= 2;
      var u = ad();
      (ze !== e || Be !== t) && (Wt = null, or = Re() + 500, Tn(e, t));
      do
        try {
          Wp();
          break;
        } catch (g) {
          od(e, g);
        }
      while (!0);
      Jo(), di.current = u, re = a, Ne !== null ? t = 0 : (ze = null, Be = 0, t = Le);
    }
    if (t !== 0) {
      if (t === 2 && (a = fo(e), a !== 0 && (o = a, t = Pa(e, a))), t === 1) throw r = qr, Tn(e, 0), hn(e, o), nt(e, Re()), r;
      if (t === 6) hn(e, o);
      else {
        if (a = e.current.alternate, (o & 30) === 0 && !Hp(a) && (t = vi(e, o), t === 2 && (u = fo(e), u !== 0 && (o = u, t = Pa(e, u))), t === 1)) throw r = qr, Tn(e, 0), hn(e, o), nt(e, Re()), r;
        switch (e.finishedWork = a, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            bn(e, tt, Wt);
            break;
          case 3:
            if (hn(e, o), (o & 130023424) === o && (t = Ma + 500 - Re(), 10 < t)) {
              if (Ts(e, 0) !== 0) break;
              if (a = e.suspendedLanes, (a & o) !== o) {
                Ye(), e.pingedLanes |= e.suspendedLanes & a;
                break;
              }
              e.timeoutHandle = Fo(bn.bind(null, e, tt, Wt), t);
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
            if (o = a, o = Re() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * $p(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = Fo(bn.bind(null, e, tt, Wt), o);
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
    return nt(e, Re()), e.callbackNode === r ? sd.bind(null, e) : null;
  }
  function Pa(e, t) {
    var r = Xr;
    return e.current.memoizedState.isDehydrated && (Tn(e, t).flags |= 256), e = vi(e, t), e !== 2 && (t = tt, tt = r, t !== null && ja(t)), e;
  }
  function ja(e) {
    tt === null ? tt = e : tt.push.apply(tt, e);
  }
  function Hp(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
          var a = r[o], u = a.getSnapshot;
          a = a.value;
          try {
            if (!St(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
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
    for (t &= ~Ra, t &= ~fi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var r = 31 - _t(t), o = 1 << r;
      e[r] = -1, t &= ~o;
    }
  }
  function id(e) {
    if ((re & 6) !== 0) throw Error(i(327));
    ar();
    var t = Ts(e, 0);
    if ((t & 1) === 0) return nt(e, Re()), null;
    var r = vi(e, t);
    if (e.tag !== 0 && r === 2) {
      var o = fo(e);
      o !== 0 && (t = o, r = Pa(e, o));
    }
    if (r === 1) throw r = qr, Tn(e, 0), hn(e, t), nt(e, Re()), r;
    if (r === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, bn(e, tt, Wt), nt(e, Re()), null;
  }
  function La(e, t) {
    var r = re;
    re |= 1;
    try {
      return e(t);
    } finally {
      re = r, re === 0 && (or = Re() + 500, Ws && on());
    }
  }
  function Cn(e) {
    dn !== null && dn.tag === 0 && (re & 6) === 0 && ar();
    var t = re;
    re |= 1;
    var r = pt.transition, o = de;
    try {
      if (pt.transition = null, de = 1, e) return e();
    } finally {
      de = o, pt.transition = r, re = t, (re & 6) === 0 && on();
    }
  }
  function Oa() {
    lt = ir.current, ge(ir);
  }
  function Tn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var r = e.timeoutHandle;
    if (r !== -1 && (e.timeoutHandle = -1, _p(r)), Ne !== null) for (r = Ne.return; r !== null; ) {
      var o = r;
      switch (Wo(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && Hs();
          break;
        case 3:
          nr(), ge(Xe), ge(Ue), sa();
          break;
        case 5:
          na(o);
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
          qo(o.type._context);
          break;
        case 22:
        case 23:
          Oa();
      }
      r = r.return;
    }
    if (ze = e, Ne = e = pn(e.current, null), Be = lt = t, Le = 0, qr = null, Ra = fi = kn = 0, tt = Xr = null, wn !== null) {
      for (t = 0; t < wn.length; t++) if (r = wn[t], o = r.interleaved, o !== null) {
        r.interleaved = null;
        var a = o.next, u = r.pending;
        if (u !== null) {
          var f = u.next;
          u.next = a, o.next = f;
        }
        r.pending = o;
      }
      wn = null;
    }
    return e;
  }
  function od(e, t) {
    do {
      var r = Ne;
      try {
        if (Jo(), ti.current = ii, ni) {
          for (var o = Se.memoizedState; o !== null; ) {
            var a = o.queue;
            a !== null && (a.pending = null), o = o.next;
          }
          ni = !1;
        }
        if (En = 0, Oe = je = Se = null, Wr = !1, Qr = 0, Ia.current = null, r === null || r.return === null) {
          Le = 1, qr = t, Ne = null;
          break;
        }
        e: {
          var u = e, f = r.return, g = r, v = t;
          if (t = Be, g.flags |= 32768, v !== null && typeof v == "object" && typeof v.then == "function") {
            var T = v, A = g, P = A.tag;
            if ((A.mode & 1) === 0 && (P === 0 || P === 11 || P === 15)) {
              var M = A.alternate;
              M ? (A.updateQueue = M.updateQueue, A.memoizedState = M.memoizedState, A.lanes = M.lanes) : (A.updateQueue = null, A.memoizedState = null);
            }
            var O = Nc(f);
            if (O !== null) {
              O.flags &= -257, Ac(O, f, g, u, t), O.mode & 1 && Mc(u, T, t), t = O, v = T;
              var B = t.updateQueue;
              if (B === null) {
                var U = /* @__PURE__ */ new Set();
                U.add(v), t.updateQueue = U;
              } else B.add(v);
              break e;
            } else {
              if ((t & 1) === 0) {
                Mc(u, T, t), za();
                break e;
              }
              v = Error(i(426));
            }
          } else if (ve && g.mode & 1) {
            var Me = Nc(f);
            if (Me !== null) {
              (Me.flags & 65536) === 0 && (Me.flags |= 256), Ac(Me, f, g, u, t), Go(rr(v, g));
              break e;
            }
          }
          u = v = rr(v, g), Le !== 4 && (Le = 2), Xr === null ? Xr = [u] : Xr.push(u), u = f;
          do {
            switch (u.tag) {
              case 3:
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var x = Ic(u, v, t);
                tc(u, x);
                break e;
              case 1:
                g = v;
                var S = u.type, k = u.stateNode;
                if ((u.flags & 128) === 0 && (typeof S.getDerivedStateFromError == "function" || k !== null && typeof k.componentDidCatch == "function" && (cn === null || !cn.has(k)))) {
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var j = Rc(u, g, t);
                  tc(u, j);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        ud(r);
      } catch ($) {
        t = $, Ne === r && r !== null && (Ne = r = r.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ad() {
    var e = di.current;
    return di.current = ii, e === null ? ii : e;
  }
  function za() {
    (Le === 0 || Le === 3 || Le === 2) && (Le = 4), ze === null || (kn & 268435455) === 0 && (fi & 268435455) === 0 || hn(ze, Be);
  }
  function vi(e, t) {
    var r = re;
    re |= 2;
    var o = ad();
    (ze !== e || Be !== t) && (Wt = null, Tn(e, t));
    do
      try {
        Vp();
        break;
      } catch (a) {
        od(e, a);
      }
    while (!0);
    if (Jo(), re = r, di.current = o, Ne !== null) throw Error(i(261));
    return ze = null, Be = 0, Le;
  }
  function Vp() {
    for (; Ne !== null; ) ld(Ne);
  }
  function Wp() {
    for (; Ne !== null && !gh(); ) ld(Ne);
  }
  function ld(e) {
    var t = fd(e.alternate, e, lt);
    e.memoizedProps = e.pendingProps, t === null ? ud(e) : Ne = t, Ia.current = null;
  }
  function ud(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (r = zp(r, t, lt), r !== null) {
          Ne = r;
          return;
        }
      } else {
        if (r = Dp(r, t), r !== null) {
          r.flags &= 32767, Ne = r;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Le = 6, Ne = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Ne = t;
        return;
      }
      Ne = t = e;
    } while (t !== null);
    Le === 0 && (Le = 5);
  }
  function bn(e, t, r) {
    var o = de, a = pt.transition;
    try {
      pt.transition = null, de = 1, Qp(e, t, r, o);
    } finally {
      pt.transition = a, de = o;
    }
    return null;
  }
  function Qp(e, t, r, o) {
    do
      ar();
    while (dn !== null);
    if ((re & 6) !== 0) throw Error(i(327));
    r = e.finishedWork;
    var a = e.finishedLanes;
    if (r === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var u = r.lanes | r.childLanes;
    if (Th(e, u), e === ze && (Ne = ze = null, Be = 0), (r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0 || pi || (pi = !0, hd(xs, function() {
      return ar(), null;
    })), u = (r.flags & 15990) !== 0, (r.subtreeFlags & 15990) !== 0 || u) {
      u = pt.transition, pt.transition = null;
      var f = de;
      de = 1;
      var g = re;
      re |= 4, Ia.current = null, Bp(e, r), Zc(r, e), fp(zo), Rs = !!Oo, zo = Oo = null, e.current = r, Up(r), yh(), re = g, de = f, pt.transition = u;
    } else e.current = r;
    if (pi && (pi = !1, dn = e, mi = a), u = e.pendingLanes, u === 0 && (cn = null), Sh(r.stateNode), nt(e, Re()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) a = t[r], o(a.value, { componentStack: a.stack, digest: a.digest });
    if (hi) throw hi = !1, e = Na, Na = null, e;
    return (mi & 1) !== 0 && e.tag !== 0 && ar(), u = e.pendingLanes, (u & 1) !== 0 ? e === Aa ? Zr++ : (Zr = 0, Aa = e) : Zr = 0, on(), null;
  }
  function ar() {
    if (dn !== null) {
      var e = ql(mi), t = pt.transition, r = de;
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
                      var M = A.sibling, O = A.return;
                      if (Gc(A), A === T) {
                        D = null;
                        break;
                      }
                      if (M !== null) {
                        M.return = O, D = M;
                        break;
                      }
                      D = O;
                    }
                  }
                }
                var B = u.alternate;
                if (B !== null) {
                  var U = B.child;
                  if (U !== null) {
                    B.child = null;
                    do {
                      var Me = U.sibling;
                      U.sibling = null, U = Me;
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
          if (re = a, on(), Mt && typeof Mt.onPostCommitFiberRoot == "function") try {
            Mt.onPostCommitFiberRoot(Es, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        de = r, pt.transition = t;
      }
    }
    return !1;
  }
  function cd(e, t, r) {
    t = rr(r, t), t = Ic(e, t, 1), e = ln(e, t, 1), t = Ye(), e !== null && (Er(e, 1, t), nt(e, t));
  }
  function Ce(e, t, r) {
    if (e.tag === 3) cd(e, e, r);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        cd(t, e, r);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (cn === null || !cn.has(o))) {
          e = rr(r, e), e = Rc(t, e, 1), t = ln(t, e, 1), e = Ye(), t !== null && (Er(t, 1, e), nt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Yp(e, t, r) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = Ye(), e.pingedLanes |= e.suspendedLanes & r, ze === e && (Be & r) === r && (Le === 4 || Le === 3 && (Be & 130023424) === Be && 500 > Re() - Ma ? Tn(e, 0) : Ra |= r), nt(e, t);
  }
  function dd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Cs, Cs <<= 1, (Cs & 130023424) === 0 && (Cs = 4194304)));
    var r = Ye();
    e = $t(e, t), e !== null && (Er(e, t, r), nt(e, r));
  }
  function Gp(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), dd(e, r);
  }
  function Kp(e, t) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode, a = e.memoizedState;
        a !== null && (r = a.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    o !== null && o.delete(t), dd(e, r);
  }
  var fd;
  fd = function(e, t, r) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Xe.current) et = !0;
    else {
      if ((e.lanes & r) === 0 && (t.flags & 128) === 0) return et = !1, Op(e, t, r);
      et = (e.flags & 131072) !== 0;
    }
    else et = !1, ve && (t.flags & 1048576) !== 0 && Wu(t, Ys, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        li(e, t), e = t.pendingProps;
        var a = Kn(t, Ue.current);
        tr(t, r), a = aa(null, t, o, e, a, r);
        var u = la();
        return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ze(o) ? (u = !0, Vs(t)) : u = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, ea(t), a.updater = oi, t.stateNode = a, a._reactInternals = t, pa(t, o, e, r), t = va(null, t, o, !0, u, r)) : (t.tag = 0, ve && u && Vo(t), Qe(null, t, a, r), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (li(e, t), e = t.pendingProps, a = o._init, o = a(o._payload), t.type = o, a = t.tag = qp(o), e = xt(o, e), a) {
            case 0:
              t = ya(null, t, o, e, r);
              break e;
            case 1:
              t = Dc(null, t, o, e, r);
              break e;
            case 11:
              t = Pc(null, t, o, e, r);
              break e;
            case 14:
              t = jc(null, t, o, xt(o.type, e), r);
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
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), ya(e, t, o, a, r);
      case 1:
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), Dc(e, t, o, a, r);
      case 3:
        e: {
          if (Fc(t), e === null) throw Error(i(387));
          o = t.pendingProps, u = t.memoizedState, a = u.element, ec(e, t), Zs(t, o, null, r);
          var f = t.memoizedState;
          if (o = f.element, u.isDehydrated) if (u = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            a = rr(Error(i(423)), t), t = Bc(e, t, o, r, a);
            break e;
          } else if (o !== a) {
            a = rr(Error(i(424)), t), t = Bc(e, t, o, r, a);
            break e;
          } else for (at = nn(t.stateNode.containerInfo.firstChild), ot = t, ve = !0, wt = null, r = Xu(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
          else {
            if (Xn(), o === a) {
              t = Vt(e, t, r);
              break e;
            }
            Qe(e, t, o, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return rc(t), e === null && Yo(t), o = t.type, a = t.pendingProps, u = e !== null ? e.memoizedProps : null, f = a.children, Do(o, a) ? f = null : u !== null && Do(o, u) && (t.flags |= 32), zc(e, t), Qe(e, t, f, r), t.child;
      case 6:
        return e === null && Yo(t), null;
      case 13:
        return Uc(e, t, r);
      case 4:
        return ta(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = Zn(t, null, o, r) : Qe(e, t, o, r), t.child;
      case 11:
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), Pc(e, t, o, a, r);
      case 7:
        return Qe(e, t, t.pendingProps, r), t.child;
      case 8:
        return Qe(e, t, t.pendingProps.children, r), t.child;
      case 12:
        return Qe(e, t, t.pendingProps.children, r), t.child;
      case 10:
        e: {
          if (o = t.type._context, a = t.pendingProps, u = t.memoizedProps, f = a.value, pe(Js, o._currentValue), o._currentValue = f, u !== null) if (St(u.value, f)) {
            if (u.children === a.children && !Xe.current) {
              t = Vt(e, t, r);
              break e;
            }
          } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
            var g = u.dependencies;
            if (g !== null) {
              f = u.child;
              for (var v = g.firstContext; v !== null; ) {
                if (v.context === o) {
                  if (u.tag === 1) {
                    v = Ht(-1, r & -r), v.tag = 2;
                    var T = u.updateQueue;
                    if (T !== null) {
                      T = T.shared;
                      var A = T.pending;
                      A === null ? v.next = v : (v.next = A.next, A.next = v), T.pending = v;
                    }
                  }
                  u.lanes |= r, v = u.alternate, v !== null && (v.lanes |= r), Xo(
                    u.return,
                    r,
                    t
                  ), g.lanes |= r;
                  break;
                }
                v = v.next;
              }
            } else if (u.tag === 10) f = u.type === t.type ? null : u.child;
            else if (u.tag === 18) {
              if (f = u.return, f === null) throw Error(i(341));
              f.lanes |= r, g = f.alternate, g !== null && (g.lanes |= r), Xo(f, r, t), f = u.sibling;
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
          Qe(e, t, a.children, r), t = t.child;
        }
        return t;
      case 9:
        return a = t.type, o = t.pendingProps.children, tr(t, r), a = ft(a), o = o(a), t.flags |= 1, Qe(e, t, o, r), t.child;
      case 14:
        return o = t.type, a = xt(o, t.pendingProps), a = xt(o.type, a), jc(e, t, o, a, r);
      case 15:
        return Lc(e, t, t.type, t.pendingProps, r);
      case 17:
        return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : xt(o, a), li(e, t), t.tag = 1, Ze(o) ? (e = !0, Vs(t)) : e = !1, tr(t, r), Tc(t, o, a), pa(t, o, a, r), va(null, t, o, !0, e, r);
      case 19:
        return Hc(e, t, r);
      case 22:
        return Oc(e, t, r);
    }
    throw Error(i(156, t.tag));
  };
  function hd(e, t) {
    return Ql(e, t);
  }
  function Jp(e, t, r, o) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function mt(e, t, r, o) {
    return new Jp(e, t, r, o);
  }
  function Da(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function qp(e) {
    if (typeof e == "function") return Da(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Je) return 11;
      if (e === Rt) return 14;
    }
    return 2;
  }
  function pn(e, t) {
    var r = e.alternate;
    return r === null ? (r = mt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
  }
  function _i(e, t, r, o, a, u) {
    var f = 2;
    if (o = e, typeof e == "function") Da(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case ue:
        return In(r.children, a, u, t);
      case q:
        f = 8, a |= 8;
        break;
      case fe:
        return e = mt(12, r, t, a | 2), e.elementType = fe, e.lanes = u, e;
      case Pe:
        return e = mt(13, r, t, a), e.elementType = Pe, e.lanes = u, e;
      case vt:
        return e = mt(19, r, t, a), e.elementType = vt, e.lanes = u, e;
      case ke:
        return Si(r, a, u, t);
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
    return t = mt(f, r, t, a), t.elementType = e, t.type = o, t.lanes = u, t;
  }
  function In(e, t, r, o) {
    return e = mt(7, e, o, t), e.lanes = r, e;
  }
  function Si(e, t, r, o) {
    return e = mt(22, e, o, t), e.elementType = ke, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
  }
  function Fa(e, t, r) {
    return e = mt(6, e, null, t), e.lanes = r, e;
  }
  function Ba(e, t, r) {
    return t = mt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Xp(e, t, r, o, a) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ho(0), this.expirationTimes = ho(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ho(0), this.identifierPrefix = o, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
  }
  function Ua(e, t, r, o, a, u, f, g, v) {
    return e = new Xp(e, t, r, g, v), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = mt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: o, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ea(u), e;
  }
  function Zp(e, t, r) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ne, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: r };
  }
  function pd(e) {
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
      var r = e.type;
      if (Ze(r)) return $u(e, r, t);
    }
    return t;
  }
  function md(e, t, r, o, a, u, f, g, v) {
    return e = Ua(r, o, !0, e, a, u, f, g, v), e.context = pd(null), r = e.current, o = Ye(), a = fn(r), u = Ht(o, a), u.callback = t ?? null, ln(r, u, a), e.current.lanes = a, Er(e, a, o), nt(e, o), e;
  }
  function wi(e, t, r, o) {
    var a = t.current, u = Ye(), f = fn(a);
    return r = pd(r), t.context === null ? t.context = r : t.pendingContext = r, t = Ht(u, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = ln(a, t, f), e !== null && (Ct(e, a, f, u), Xs(e, a, f)), f;
  }
  function xi(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function gd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function $a(e, t) {
    gd(e, t), (e = e.alternate) && gd(e, t);
  }
  function em() {
    return null;
  }
  var yd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Ha(e) {
    this._internalRoot = e;
  }
  Ei.prototype.render = Ha.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    wi(e, t, null, null);
  }, Ei.prototype.unmount = Ha.prototype.unmount = function() {
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
      var t = eu();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < Zt.length && t !== 0 && t < Zt[r].priority; r++) ;
      Zt.splice(r, 0, e), r === 0 && ru(e);
    }
  };
  function Va(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function ki(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function vd() {
  }
  function tm(e, t, r, o, a) {
    if (a) {
      if (typeof o == "function") {
        var u = o;
        o = function() {
          var T = xi(f);
          u.call(T);
        };
      }
      var f = md(t, o, e, 0, null, !1, !1, "", vd);
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
    var v = Ua(e, 0, !1, null, null, !1, !1, "", vd);
    return e._reactRootContainer = v, e[Dt] = v.current, zr(e.nodeType === 8 ? e.parentNode : e), Cn(function() {
      wi(t, v, r, o);
    }), v;
  }
  function Ci(e, t, r, o, a) {
    var u = r._reactRootContainer;
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
    } else f = tm(r, t, e, a, o);
    return xi(f);
  }
  Xl = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = xr(t.pendingLanes);
          r !== 0 && (po(t, r | 1), nt(t, Re()), (re & 6) === 0 && (or = Re() + 500, on()));
        }
        break;
      case 13:
        Cn(function() {
          var o = $t(e, 1);
          if (o !== null) {
            var a = Ye();
            Ct(o, e, 1, a);
          }
        }), $a(e, 1);
    }
  }, mo = function(e) {
    if (e.tag === 13) {
      var t = $t(e, 134217728);
      if (t !== null) {
        var r = Ye();
        Ct(t, e, 134217728, r);
      }
      $a(e, 134217728);
    }
  }, Zl = function(e) {
    if (e.tag === 13) {
      var t = fn(e), r = $t(e, t);
      if (r !== null) {
        var o = Ye();
        Ct(r, e, t, o);
      }
      $a(e, t);
    }
  }, eu = function() {
    return de;
  }, tu = function(e, t) {
    var r = de;
    try {
      return de = e, t();
    } finally {
      de = r;
    }
  }, oo = function(e, t, r) {
    switch (t) {
      case "input":
        if (Xi(e, r), t = r.name, r.type === "radio" && t != null) {
          for (r = e; r.parentNode; ) r = r.parentNode;
          for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
            var o = r[t];
            if (o !== e && o.form === e.form) {
              var a = $s(o);
              if (!a) throw Error(i(90));
              Cl(o), Xi(o, a);
            }
          }
        }
        break;
      case "textarea":
        Ml(e, r);
        break;
      case "select":
        t = r.value, t != null && zn(e, !!r.multiple, t, !1);
    }
  }, Fl = La, Bl = Cn;
  var nm = { usingClientEntryPoint: !1, Events: [Br, Yn, $s, zl, Dl, La] }, es = { findFiberByHostInstance: yn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, rm = { bundleType: es.bundleType, version: es.version, rendererPackageName: es.rendererPackageName, rendererConfig: es.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: X.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Vl(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: es.findFiberByHostInstance || em, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ti.isDisabled && Ti.supportsFiber) try {
      Es = Ti.inject(rm), Mt = Ti;
    } catch {
    }
  }
  return rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nm, rt.createPortal = function(e, t) {
    var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Va(t)) throw Error(i(200));
    return Zp(e, t, null, r);
  }, rt.createRoot = function(e, t) {
    if (!Va(e)) throw Error(i(299));
    var r = !1, o = "", a = yd;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = Ua(e, 1, !1, null, null, r, !1, o, a), e[Dt] = t.current, zr(e.nodeType === 8 ? e.parentNode : e), new Ha(t);
  }, rt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = Vl(t), e = e === null ? null : e.stateNode, e;
  }, rt.flushSync = function(e) {
    return Cn(e);
  }, rt.hydrate = function(e, t, r) {
    if (!ki(t)) throw Error(i(200));
    return Ci(null, e, t, !0, r);
  }, rt.hydrateRoot = function(e, t, r) {
    if (!Va(e)) throw Error(i(405));
    var o = r != null && r.hydratedSources || null, a = !1, u = "", f = yd;
    if (r != null && (r.unstable_strictMode === !0 && (a = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (f = r.onRecoverableError)), t = md(t, null, e, 1, r ?? null, a, !1, u, f), e[Dt] = t.current, zr(e), o) for (e = 0; e < o.length; e++) r = o[e], a = r._getVersion, a = a(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, a] : t.mutableSourceEagerHydrationData.push(
      r,
      a
    );
    return new Ei(t);
  }, rt.render = function(e, t, r) {
    if (!ki(t)) throw Error(i(200));
    return Ci(null, e, t, !1, r);
  }, rt.unmountComponentAtNode = function(e) {
    if (!ki(e)) throw Error(i(40));
    return e._reactRootContainer ? (Cn(function() {
      Ci(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Dt] = null;
      });
    }), !0) : !1;
  }, rt.unstable_batchedUpdates = La, rt.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
    if (!ki(r)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Ci(e, t, r, !1, o);
  }, rt.version = "18.3.1-next-f1338f8080-20240426", rt;
}
var Td;
function nf() {
  if (Td) return Ya.exports;
  Td = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (n) {
        console.error(n);
      }
  }
  return s(), Ya.exports = fm(), Ya.exports;
}
var bd;
function hm() {
  if (bd) return bi;
  bd = 1;
  var s = nf();
  return bi.createRoot = s.createRoot, bi.hydrateRoot = s.hydrateRoot, bi;
}
var pm = hm(), mm = nf();
const gm = (s) => Array.from(s).map((i) => i.getModelContext()).sort((i, l) => (l.priority ?? 0) - (i.priority ?? 0)).reduce((i, l) => {
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
class rf {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return gm(this._providers);
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
class ym {
  _contextProvider = new rf();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class vm {
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
      } catch (l) {
        n.push(l);
      }
    if (n.length > 0)
      throw n.length === 1 ? n[0] : new AggregateError(n);
  }
}
const _m = (s) => s.status.type === "complete";
class sf extends vm {
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
        const { status: i, inputDisabled: l } = this._dictation;
        this._dictation = l ? { status: i, inputDisabled: l } : { status: i };
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => _m(d) ? d : await n.send(d))) : [], l = this.text;
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
  async addAttachment(n) {
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
    }, c = i.add({ file: n });
    if (Symbol.asyncIterator in c)
      for await (const d of c)
        l(d);
    else
      l(await c);
    this._notifyEventSubscribers("attachment-add"), this._notifySubscribers();
  }
  async removeAttachment(n) {
    const i = this.getAttachmentAdapter();
    if (!i)
      throw new Error("Attachments are not supported");
    const l = this._attachments.findIndex((d) => d.id === n);
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
    const l = n.listen();
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
    const n = this._dictationSession, i = this._activeDictationSessionId;
    n.stop().finally(() => {
      this._cleanupDictation({ sessionId: i });
    });
  }
  _cleanupDictation(n) {
    if (!(n?.sessionId !== void 0 && n.sessionId !== this._activeDictationSessionId || this._isCleaningDictation)) {
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
  _notifyEventSubscribers(n) {
    const i = this._eventSubscribers.get(n);
    if (i)
      for (const l of i)
        l();
  }
  unstable_on(n, i) {
    const l = this._eventSubscribers.get(n);
    return l ? l.add(i) : this._eventSubscribers.set(n, /* @__PURE__ */ new Set([i])), () => {
      const c = this._eventSubscribers.get(n);
      c && c.delete(i);
    };
  }
}
class Sm extends sf {
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
let wm = (s, n = 21) => (i = n) => {
  let l = "", c = i | 0;
  for (; c--; )
    l += s[Math.random() * s.length | 0];
  return l;
};
const cl = wm("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), xm = "__optimistic__", Em = () => `${xm}${cl()}`, hr = /* @__PURE__ */ Symbol("autoStatus"), km = Object.freeze(Object.assign({ type: "running" }, { [hr]: !0 })), Cm = Object.freeze(Object.assign({
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
const Tm = (s) => s[hr] === !0, of = (s, n, i, l, c) => s && c ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: c
}, { [hr]: !0 }) : s && n ? km : Cm;
var Rn = { exports: {} }, Id;
function bm() {
  if (Id) return Rn.exports;
  Id = 1;
  const s = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function l(p, m, _) {
    _ == null && m !== null && typeof m == "object" && (_ = m, m = void 0), s && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const E = JSON.parse(p, m);
    if (E === null || typeof E != "object")
      return E;
    const I = _ && _.protoAction || "error", C = _ && _.constructorAction || "error";
    if (I === "ignore" && C === "ignore")
      return E;
    if (I !== "ignore" && C !== "ignore") {
      if (n.test(p) === !1 && i.test(p) === !1)
        return E;
    } else if (I !== "ignore" && C === "ignore") {
      if (n.test(p) === !1)
        return E;
    } else if (i.test(p) === !1)
      return E;
    return c(E, { protoAction: I, constructorAction: C, safe: _ && _.safe });
  }
  function c(p, { protoAction: m = "error", constructorAction: _ = "error", safe: E } = {}) {
    let I = [p];
    for (; I.length; ) {
      const C = I;
      I = [];
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
          H && typeof H == "object" && I.push(H);
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
var Im = bm();
const Rd = /* @__PURE__ */ tf(Im);
function Rm(s) {
  const n = ["ROOT"];
  let i = -1, l = null;
  const c = [];
  let d;
  function h() {
    d !== void 0 && (c.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(I, C, R) {
    switch (I) {
      case '"': {
        i = C, n.pop(), n.push(R), n.push("INSIDE_STRING"), h();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = C, l = C, n.pop(), n.push(R), n.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        n.pop(), n.push(R), n.push("INSIDE_NUMBER"), h();
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
        i = C, n.pop(), n.push(R), n.push("INSIDE_NUMBER"), h();
        break;
      }
      case "{": {
        i = C, n.pop(), n.push(R), n.push("INSIDE_OBJECT_START"), h();
        break;
      }
      case "[": {
        i = C, n.pop(), n.push(R), n.push("INSIDE_ARRAY_START"), h();
        break;
      }
    }
  }
  function m(I, C) {
    switch (I) {
      case ",": {
        n.pop(), n.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        i = C, n.pop(), d = c.pop();
        break;
      }
    }
  }
  function _(I, C) {
    switch (I) {
      case ",": {
        n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
        break;
      }
      case "]": {
        i = C, n.pop(), d = c.pop();
        break;
      }
    }
  }
  for (let I = 0; I < s.length; I++) {
    const C = s[I];
    switch (n[n.length - 1]) {
      case "ROOT":
        p(C, I, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (C) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "";
            break;
          }
          case "}": {
            i = I, n.pop(), d = c.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        C === '"' && (n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "");
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (C) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE"), d += C;
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
        C === ":" && (n.pop(), n.push("INSIDE_OBJECT_BEFORE_VALUE"));
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        p(C, I, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        m(C, I);
        break;
      }
      case "INSIDE_STRING": {
        switch (C) {
          case '"': {
            n.pop(), i = I, d = c.pop();
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            i = I;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        C === "]" ? (i = I, n.pop(), d = c.pop()) : (i = I, d = "0", p(C, I, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (C) {
          case ",": {
            n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
            break;
          }
          case "]": {
            i = I, n.pop(), d = c.pop();
            break;
          }
          default: {
            i = I;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        p(C, I, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        n.pop(), n[n.length - 1] === "INSIDE_STRING" ? i = I : n[n.length - 1] === "INSIDE_OBJECT_KEY" && (d += C);
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
            i = I;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            n.pop(), d = c.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(C, I), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(C, I);
            break;
          }
          case "}": {
            n.pop(), d = c.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(C, I);
            break;
          }
          case "]": {
            n.pop(), d = c.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(C, I);
            break;
          }
          default: {
            n.pop(), d = c.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const z = s.substring(l, I + 1);
        !"false".startsWith(z) && !"true".startsWith(z) && !"null".startsWith(z) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? m(C, I) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(C, I)) : i = I;
        break;
      }
    }
  }
  let E = s.slice(0, i + 1);
  for (let I = n.length - 1; I >= 0; I--)
    switch (n[I]) {
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
const Ja = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), Mm = (s) => {
  if (s.length === 0)
    return {
      [Ja]: { state: "partial", partialPath: [] }
    };
  try {
    const n = Rd.parse(s);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[Ja] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = Rm(s), l = Rd.parse(n);
      if (typeof l != "object" || l === null)
        throw new Error("argsText is expected to be an object");
      return l[Ja] = {
        state: "partial",
        partialPath: i
      }, l;
    } catch {
      return;
    }
  }
}, dl = (s, n, i) => {
  const { role: l, id: c, createdAt: d, attachments: h, status: p, metadata: m } = s, _ = {
    id: c ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, E = typeof s.content == "string" ? [{ type: "text", text: s.content }] : s.content, I = ({ image: C, ...R }) => {
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
              return I(C);
            case "data":
              return C;
            case "tool-call": {
              const { parentId: z, messages: H, ...G } = C, se = {
                ...G,
                toolCallId: C.toolCallId ?? `tool-${cl()}`,
                ...z !== void 0 && { parentId: z },
                ...H !== void 0 && { messages: H }
              };
              return C.args ? {
                ...se,
                args: C.args,
                argsText: C.argsText ?? JSON.stringify(C.args)
              } : {
                ...se,
                args: Mm(C.argsText ?? "") ?? {},
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
}, fl = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (s) => {
    const n = s.map((i) => dl(i, cl(), of(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, l) => ({
        parentId: l > 0 ? n[l - 1].id : null,
        message: i
      }))
    };
  }
}, Pi = (s) => s.next ? Pi(s.next) : "current" in s ? s : null;
class Nm {
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
class af {
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
    for (const l of n.children) {
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
  performOp(n, i, l) {
    const c = i.prev ?? this.root, d = n ?? this.root;
    if (!(l === "relink" && c === d)) {
      if (l !== "link" && (c.children = c.children.filter((h) => h !== i.current.id), c.next === i)) {
        const h = c.children.at(-1), p = h ? this.messages.get(h) : null;
        if (p === void 0)
          throw new Error("MessageRepository(performOp/cut): Fallback sibling message not found. This is likely an internal bug in assistant-ui.");
        c.next = p;
      }
      if (l !== "cut") {
        for (let p = n; p; p = p.prev)
          if (p.current.id === i.current.id)
            throw new Error("MessageRepository(performOp/link): A message with the same id already exists in the parent tree. This error occurs if the same message id is found multiple times. This is likely an internal bug in assistant-ui.");
        d.children = [
          ...d.children,
          i.current.id
        ], (Pi(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const h = n ? n.level + 1 : 0;
        this.updateLevels(i, h);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new Nm(() => {
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
  addOrUpdateMessage(n, i) {
    const l = this.messages.get(i.id), c = n ? this.messages.get(n) : null;
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
    let l;
    do
      l = Em();
    while (this.messages.has(l));
    return this.addOrUpdateMessage(n, dl(i, l, { type: "running" })), l;
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
    const l = this.messages.get(n);
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
    this.performOp(null, l, "cut"), this.messages.delete(n), this.head === l && (this.head = Pi(c ?? this.root)), this._messages.dirty();
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
    const { children: l } = i.prev ?? this.root;
    return l;
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
    const l = i.prev ?? this.root;
    l.next = i, this.head = Pi(i), this._messages.dirty();
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
    for (const { message: l, parentId: c } of i)
      this.addOrUpdateMessage(c, l);
    this.resetHead(n ?? i.at(-1)?.message.id ?? null);
  }
}
class Vi {
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
const bt = /* @__PURE__ */ Symbol("skip-update");
class hl extends Vi {
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
      n !== bt && (this._previousState = n), this._previousStateDirty = !1;
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
class Ii {
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
    let l = this._core.getState().isMain, c = this._core.getState().id;
    return this.subscribe(() => {
      const d = this._core.getState(), h = d.isMain, p = d.id;
      l === h && c === p || (l = h, c = p, !(n === "switched-to" && !h) && (n === "switched-away" && h || i()));
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
function Am(s, n) {
  if (s === void 0 && n === void 0)
    return !0;
  if (s === void 0 || n === void 0)
    return !1;
  for (const i of Object.keys(s)) {
    const l = s[i], c = n[i];
    if (!Object.is(l, c))
      return !1;
  }
  return !0;
}
class Tt extends Vi {
  binding;
  get path() {
    return this.binding.path;
  }
  constructor(n) {
    super(), this.binding = n;
    const i = n.getState();
    if (i === bt)
      throw new Error("Entry not available in the store");
    this._previousState = i;
  }
  _previousState;
  getState = () => (this.isConnected || this._syncState(), this._previousState);
  _syncState() {
    const n = this.binding.getState();
    return n === bt || Am(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const cr = /* @__PURE__ */ Symbol("innerMessage"), Pm = (s) => s[cr], as = (s) => s.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class lf {
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
class uf extends lf {
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
class jm extends uf {
  get source() {
    return "thread-composer";
  }
}
class Lm extends uf {
  get source() {
    return "edit-composer";
  }
}
class Om extends lf {
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
class cf extends Vi {
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
    let i = this.config.binding.getState(), l = i?.unstable_on(this.config.event, n);
    const c = () => {
      const h = this.config.binding.getState();
      h !== i && (i = h, l?.(), l = this.config.binding.getState()?.unstable_on(this.config.event, n));
    }, d = this.outerSubscribe(c);
    return () => {
      d?.(), l?.();
    };
  }
}
const df = Object.freeze([]), ff = Object.freeze({}), zm = (s) => Object.freeze({
  type: "thread",
  isEditing: s?.isEditing ?? !1,
  canCancel: s?.canCancel ?? !1,
  isEmpty: s?.isEmpty ?? !0,
  attachments: s?.attachments ?? df,
  text: s?.text ?? "",
  role: s?.role ?? "user",
  runConfig: s?.runConfig ?? ff,
  attachmentAccept: s?.attachmentAccept ?? "",
  dictation: s?.dictation,
  value: s?.text ?? ""
}), Dm = (s) => Object.freeze({
  type: "edit",
  isEditing: s?.isEditing ?? !1,
  canCancel: s?.canCancel ?? !1,
  isEmpty: s?.isEmpty ?? !0,
  text: s?.text ?? "",
  role: s?.role ?? "user",
  attachments: s?.attachments ?? df,
  runConfig: s?.runConfig ?? ff,
  attachmentAccept: s?.attachmentAccept ?? "",
  dictation: s?.dictation,
  value: s?.text ?? ""
});
class hf {
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
    let l = this._eventSubscriptionSubjects.get(n);
    return l || (l = new cf({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, l)), l.subscribe(i);
  }
}
class Fm extends hf {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(n) {
    const i = new hl({
      path: n.path,
      getState: () => zm(n.getState()),
      subscribe: (l) => n.subscribe(l)
    });
    super({
      path: n.path,
      getState: () => n.getState(),
      subscribe: (l) => i.subscribe(l)
    }), this._getState = i.getState.bind(i), this.__internal_bindMethods();
  }
  getState() {
    return this._getState();
  }
  getAttachmentByIndex(n) {
    return new jm(new Tt({
      path: {
        ...this.path,
        attachmentSource: "thread-composer",
        attachmentSelector: { type: "index", index: n },
        ref: `${this.path.ref}.attachments[${n}]`
      },
      getState: () => {
        const l = this.getState().attachments[n];
        return l ? {
          ...l,
          source: "thread-composer"
        } : bt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
class Bm extends hf {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(n, i) {
    const l = new hl({
      path: n.path,
      getState: () => Dm(n.getState()),
      subscribe: (c) => n.subscribe(c)
    });
    super({
      path: n.path,
      getState: () => n.getState(),
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
  getAttachmentByIndex(n) {
    return new Lm(new Tt({
      path: {
        ...this.path,
        attachmentSource: "edit-composer",
        attachmentSelector: { type: "index", index: n },
        ref: `${this.path.ref}.attachments[${n}]`
      },
      getState: () => {
        const l = this.getState().attachments[n];
        return l ? {
          ...l,
          source: "edit-composer"
        } : bt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Md = /* @__PURE__ */ Symbol.for("aui.tool-response");
class Li {
  get [Md]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && Md in n;
  }
  static toResponse(n) {
    return n instanceof Li ? n : new Li({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class Nd {
  contentBinding;
  messageApi;
  threadApi;
  get path() {
    return this.contentBinding.path;
  }
  constructor(n, i, l) {
    this.contentBinding = n, this.messageApi = i, this.threadApi = l, this.__internal_bindMethods();
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
    const l = this.messageApi.getState();
    if (!l)
      throw new Error("Message is not available");
    const c = i.toolName, d = i.toolCallId, h = Li.toResponse(n);
    this.threadApi.getState().addToolResult({
      messageId: l.id,
      toolName: c,
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
    const l = i.toolCallId;
    this.threadApi.getState().resumeToolCall({
      toolCallId: l,
      payload: n
    });
  }
  subscribe(n) {
    return this.contentBinding.subscribe(n);
  }
}
class Oi extends Vi {
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
    let i = this.binding.getState(), l = i?.subscribe(n);
    const c = () => {
      const h = this.binding.getState();
      h !== i && (i = h, l?.(), l = this.binding.getState()?.subscribe(n), n());
    }, d = this.outerSubscribe(c);
    return () => {
      d?.(), l?.();
    };
  }
}
const Ri = Object.freeze({
  type: "complete"
}), Um = (s, n, i) => {
  if (s.role !== "assistant")
    return Ri;
  if (i.type === "tool-call")
    return i.result ? Ri : s.status;
  const l = n === Math.max(0, s.content.length - 1);
  return s.status.type === "requires-action" ? Ri : l ? s.status : Ri;
}, Ad = (s, n) => {
  const i = s.content[n];
  if (!i)
    return bt;
  const l = Um(s, n, i);
  return Object.freeze({
    ...i,
    [cr]: i[cr],
    status: l
  });
};
class $m {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new Bm(new Oi({
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
  reload(n = {}) {
    const i = this._getEditComposerRuntimeCore(), l = i ?? this._threadBinding.getState().composer, c = i ?? l, { runConfig: d = c.runConfig } = n, h = this._core.getState();
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
    const l = this._core.getState();
    if (i && n)
      throw new Error("May not specify both branchId and position");
    if (!i && !n)
      throw new Error("Must specify either branchId or position");
    const d = this._threadBinding.getState().getBranches(l.id);
    let h = i;
    if (n === "previous" ? h = d[l.branchNumber - 2] : n === "next" && (h = d[l.branchNumber]), !h)
      throw new Error("Branch not found");
    this._threadBinding.getState().switchToBranch(h);
  }
  unstable_getCopyText() {
    return as(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new Nd(new Tt({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => Ad(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new Nd(new Tt({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), l = i.content.findIndex((c) => c.type === "tool-call" && c.toolCallId === n);
        return l === -1 ? bt : Ad(i, l);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new Om(new Tt({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.attachments[${n}]`,
        attachmentSource: "message",
        attachmentSelector: { type: "index", index: n }
      },
      getState: () => {
        const l = this.getState().attachments?.[n];
        return l ? {
          ...l,
          source: "message"
        } : bt;
      },
      subscribe: (i) => this._core.subscribe(i)
    }));
  }
}
const Hm = (s) => ({
  parentId: s.parentId ?? null,
  sourceId: s.sourceId ?? null,
  runConfig: s.runConfig ?? {},
  ...s.stream ? { stream: s.stream } : {}
}), Vm = (s) => ({
  parentId: s.parentId ?? null,
  sourceId: s.sourceId ?? null,
  runConfig: s.runConfig ?? {}
}), Wm = (s, n) => typeof n == "string" ? {
  createdAt: /* @__PURE__ */ new Date(),
  parentId: s.at(-1)?.id ?? null,
  sourceId: null,
  runConfig: {},
  role: "user",
  content: [{ type: "text", text: n }],
  attachments: [],
  metadata: { custom: {} }
} : {
  createdAt: n.createdAt ?? /* @__PURE__ */ new Date(),
  parentId: n.parentId ?? s.at(-1)?.id ?? null,
  sourceId: n.sourceId ?? null,
  role: n.role ?? "user",
  content: n.content,
  attachments: n.attachments ?? [],
  metadata: n.metadata ?? { custom: {} },
  runConfig: n.runConfig ?? {},
  startRun: n.startRun
}, Qm = (s, n) => {
  const i = s.messages.at(-1);
  return Object.freeze({
    threadId: n.id,
    metadata: n,
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
class Ym {
  get path() {
    return this._threadBinding.path;
  }
  get __internal_threadBinding() {
    return this._threadBinding;
  }
  _threadBinding;
  constructor(n, i) {
    const l = new Tt({
      path: n.path,
      getState: () => Qm(n.getState(), i.getState()),
      subscribe: (c) => {
        const d = n.subscribe(c), h = i.subscribe(c);
        return () => {
          d(), h();
        };
      }
    });
    this._threadBinding = {
      path: n.path,
      getState: () => n.getState(),
      getStateState: () => l.getState(),
      outerSubscribe: (c) => n.outerSubscribe(c),
      subscribe: (c) => n.subscribe(c)
    }, this.composer = new Fm(new Oi({
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
  append(n) {
    this._threadBinding.getState().append(Wm(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(Vm(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun(Hm(n));
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
      const i = this._threadBinding.getState().messages, l = i[n];
      if (l)
        return {
          message: l,
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
    return new $m(new Tt({
      path: n,
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
  unstable_on(n, i) {
    let l = this._eventSubscriptionSubjects.get(n);
    return l || (l = new cf({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, l)), l.subscribe(i);
  }
}
const Gm = (s) => ({
  mainThreadId: s.mainThreadId,
  newThread: s.newThreadId,
  threads: s.threadIds,
  archivedThreads: s.archivedThreadIds,
  isLoading: s.isLoading,
  threadItems: s.threadData
}), Mi = (s, n) => {
  if (n === void 0)
    return bt;
  const i = s.getItemById(n);
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
class Km {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = Ym) {
    this._core = n, this._runtimeFactory = i;
    const l = new hl({
      path: {},
      getState: () => Gm(n),
      subscribe: (c) => n.subscribe(c)
    });
    this._getState = l.getState.bind(l), this._mainThreadListItemRuntime = new Ii(new Tt({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => Mi(this._core, this._core.mainThreadId),
      subscribe: (c) => this._core.subscribe(c)
    }), this._core), this.main = new i(new Oi({
      path: {
        ref: "threads.main",
        threadSelector: { type: "main" }
      },
      getState: () => n.getMainThreadRuntimeCore(),
      subscribe: (c) => n.subscribe(c)
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
    return new this._runtimeFactory(new Oi({
      path: {
        ref: `threads[threadId=${JSON.stringify(n)}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => this._core.getThreadRuntimeCore(n),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(n) {
    return new Ii(new Tt({
      path: {
        ref: `threadItems[${n}]`,
        threadSelector: { type: "index", index: n }
      },
      getState: () => Mi(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new Ii(new Tt({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => Mi(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new Ii(new Tt({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => Mi(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Jm = b.createContext(null), qm = () => b.useContext(Jm), Mn = Object.freeze([]), jn = "DEFAULT_THREAD_ID", Xm = Object.freeze([jn]), pf = Object.freeze({
  id: jn,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), Zm = Promise.resolve(), Pd = Object.freeze({
  [jn]: pf
});
class eg {
  adapter;
  threadFactory;
  _mainThreadId = jn;
  _threads = Xm;
  _archivedThreads = Mn;
  _threadData = Pd;
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
    return Zm;
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
    if (n === jn)
      return pf;
  }
  __internal_setAdapter(n, i = !1) {
    const l = this.adapter;
    this.adapter = n;
    const c = n.threadId ?? jn, d = n.threads ?? Mn, h = n.archivedThreads ?? Mn, p = l.threadId ?? jn, m = l.threads ?? Mn, _ = l.archivedThreads ?? Mn;
    !i && p === c && m === d && _ === h || (this._threadData = {
      ...Pd,
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
    }, m !== d && (this._threads = this.adapter.threads?.map((E) => E.id) ?? Mn), _ !== h && (this._archivedThreads = this.adapter.archivedThreads?.map((E) => E.id) ?? Mn), p !== c && (this._mainThreadId = c, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
    const l = this.adapter.onRename;
    if (!l)
      throw new Error("External store adapter does not support renaming");
    l(n, i);
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
class jd {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((l, c) => {
      const d = this.cache.get(l), h = i(d, l, c);
      return this.cache.set(l, h), h;
    });
  }
}
class tg extends sf {
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
  constructor(n, i, { parentId: l, message: c }) {
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = l, this._sourceId = c.id, this._previousText = as(c), this.setText(this._previousText), this.setRole(c.role), this.setAttachments(c.attachments ?? []), this._nonTextParts = c.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    as(n) !== this._previousText && this.runtime.append({
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
class ng {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new af();
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
  composer = new Sm(this);
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
    this._editComposers.set(n, new tg(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
      for (const l of i)
        l();
  }
  subscribe(n) {
    return this._subscriptions.add(n), () => this._subscriptions.delete(n);
  }
  submitFeedback({ messageId: n, type: i }) {
    const l = this.adapters?.feedback;
    if (!l)
      throw new Error("Feedback adapter not configured");
    const { message: c, parentId: d } = this.repository.getMessage(n);
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
  speak(n) {
    const i = this.adapters?.speech;
    if (!i)
      throw new Error("Speech adapter not configured");
    const { message: l } = this.repository.getMessage(n);
    this._stopSpeaking?.();
    const c = i.speak(as(l)), d = c.subscribe(() => {
      c.status.type === "ended" ? (this._stopSpeaking = void 0, this.speech = void 0) : this.speech = { messageId: n, status: c.status }, this._notifySubscribers();
    });
    this.speech = { messageId: n, status: c.status }, this._notifySubscribers(), this._stopSpeaking = () => {
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
  import(n) {
    this.ensureInitialized(), this.repository.clear(), this.repository.import(n), this._notifySubscribers();
  }
  reset(n) {
    this.import(fl.fromArray(n ?? []));
  }
  _eventSubscribers = /* @__PURE__ */ new Map();
  unstable_on(n, i) {
    if (n === "model-context-update")
      return this._contextProvider.subscribe?.(i) ?? (() => {
      });
    const l = this._eventSubscribers.get(n);
    return l ? l.add(i) : this._eventSubscribers.set(n, /* @__PURE__ */ new Set([i])), () => {
      this._eventSubscribers.get(n).delete(i);
    };
  }
}
const rg = Object.freeze([]), sg = (s, n) => s && n[n.length - 1]?.role !== "assistant";
class ig extends ng {
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
  _converter = new jd();
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
    const l = this._store;
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? rg, this._capabilities = {
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
    if (n.messageRepository) {
      if (l && l.isRunning === n.isRunning && l.messageRepository === n.messageRepository) {
        this._notifySubscribers();
        return;
      }
      this.repository.clear(), this._assistantOptimisticId = null, this.repository.import(n.messageRepository), c = this.repository.getMessages();
    } else if (n.messages) {
      if (l) {
        if (l.convertMessage !== n.convertMessage)
          this._converter = new jd();
        else if (l.isRunning === n.isRunning && l.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      c = n.convertMessage ? this._converter.convertMessages(n.messages, (d, h, p) => {
        if (!n.convertMessage)
          return h;
        const m = p === (n.messages?.length ?? 0) - 1, _ = of(m, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !Tm(d.status) || d.status === _))
          return d;
        const E = n.convertMessage(h, p), I = dl(E, p.toString(), _);
        return I[cr] = h, I;
      }) : n.messages;
      for (let d = 0; d < c.length; d++) {
        const h = c[d], p = c[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, h);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    c.length > 0 && this.ensureInitialized(), (l?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), sg(i, c) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(c.at(-1)?.id ?? null, {
      role: "assistant",
      content: []
    })), this.repository.resetHead(this._assistantOptimisticId ?? c.at(-1)?.id ?? null), this._messages = this.repository.getMessages(), this._notifySubscribers();
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
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(as(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
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
    const i = new af();
    i.import(fl.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(Pm).filter((l) => l != null)) : this._store.setMessages?.(n);
  };
}
const Ld = (s) => s.adapters?.threadList ?? {};
class og extends ym {
  threads;
  constructor(n) {
    super(), this.threads = new eg(Ld(n), () => new ig(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(Ld(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const ag = (s) => {
  const [n] = b.useState(() => new og(s));
  b.useEffect(() => {
    n.setAdapter(s);
  });
  const { modelContext: i } = qm() ?? {};
  return b.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), b.useMemo(() => new fy(n), [n]);
};
function lg(s, n) {
  s.commitTasks.forEach((i) => {
    const l = i.cellIndex, c = n.cells[l];
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
function ug(s) {
  let n = null;
  for (let i = s.cells.length - 1; i >= 0; i--) {
    const l = s.cells[i];
    if (l?.type === "effect" && l.mounted && l.cleanup)
      try {
        l.cleanup();
      } catch (c) {
        n == null && (n = c);
      } finally {
        l.mounted = !1;
      }
  }
  if (n != null)
    throw n;
}
let ns = null;
function cg(s, n) {
  s.currentIndex = 0;
  const i = ns;
  ns = s;
  try {
    if (n(), s.isFirstRender = !1, s.cells.length !== s.currentIndex)
      throw new Error(`Rendered ${s.currentIndex} hooks but expected ${s.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    ns = i;
  }
}
function pl() {
  if (!ns)
    throw new Error("No resource fiber available");
  return ns;
}
function mf(s, n) {
  const i = s[gf];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const gf = /* @__PURE__ */ Symbol("fnSymbol");
function Wi(s, n) {
  return {
    resource: s,
    scheduleRerender: n,
    cells: [],
    currentIndex: 0,
    renderContext: void 0,
    isFirstRender: !0,
    isMounted: !1,
    isNeverMounted: !0
  };
}
function ls(s) {
  s.isMounted = !1, ug(s);
}
function us(s, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return cg(s, () => {
    s.renderContext = i;
    try {
      i.state = mf(s.resource, n);
    } finally {
      s.renderContext = void 0;
    }
  }), i;
}
function cs(s, n) {
  s.isMounted = !0, s.isNeverMounted = !1, lg(n, s);
}
const dg = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, Od = dg ? b.useEffect : b.useLayoutEffect;
function ml(s) {
  const [, n] = b.useState({}), i = b.useMemo(() => Wi(s.type, () => n({})), [s.type]), l = us(i, s.props);
  return Od(() => () => ls(i), [i]), Od(() => {
    cs(i, l);
  }), l.state;
}
const Qi = (s) => typeof s == "string" ? {
  scope: s.split(".")[0],
  event: s
} : {
  scope: s.scope,
  event: s.event
}, rs = (s, n, i) => n === s;
let lr;
const qa = () => {
  if (lr)
    return lr;
  const s = () => ({
    apis: /* @__PURE__ */ new Map(),
    nextId: 0,
    listeners: /* @__PURE__ */ new Set()
  });
  if (typeof window > "u")
    return lr = s(), lr;
  const n = window.__ASSISTANT_UI_DEVTOOLS_HOOK__;
  if (n)
    return lr = n, n;
  const i = s();
  return window.__ASSISTANT_UI_DEVTOOLS_HOOK__ = i, lr = i, i;
};
class An {
  static MAX_EVENT_LOGS_PER_API = 200;
  static register(n) {
    const i = qa();
    for (const p of i.apis.values())
      if (p.api === n)
        return () => {
        };
    const l = i.nextId++, c = {
      api: n,
      logs: []
    }, d = n.on?.("*", (p) => {
      const m = i.apis.get(l);
      m && (m.logs.push({
        time: /* @__PURE__ */ new Date(),
        event: p.event,
        data: p.payload
      }), m.logs.length > An.MAX_EVENT_LOGS_PER_API && (m.logs = m.logs.slice(-200)), An.notifyListeners(l));
    }), h = n.subscribe?.(() => {
      An.notifyListeners(l);
    });
    return i.apis.set(l, c), An.notifyListeners(l), () => {
      const p = qa();
      p.apis.get(l) && (d?.(), h?.(), p.apis.delete(l), An.notifyListeners(l));
    };
  }
  static notifyListeners(n) {
    qa().listeners.forEach((l) => l(n));
  }
}
function xe(s) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[gf] = s, n;
}
const fg = (s) => {
  if (s.renderContext)
    throw new Error("Resource updated during render");
  if (s.isMounted)
    s.scheduleRerender();
  else if (s.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function hg(s) {
  const n = pl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof s == "function" ? s() : s,
      set: (h) => {
        const p = d.value, m = typeof h == "function" ? h(p) : h;
        Object.is(p, m) || (d.value = m, fg(n));
      }
    };
    n.cells[i] = d;
  }
  const l = n.cells[i];
  if (l.type !== "state")
    throw new Error("Hook order changed between renders");
  return l;
}
function Ot(s) {
  const n = hg(s);
  return [n.value, n.set];
}
function pg() {
  const s = pl(), n = s.currentIndex++;
  if (!s.isFirstRender && n >= s.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!s.cells[n]) {
    const l = {
      type: "effect",
      mounted: !1
    };
    s.cells[n] = l;
  }
  if (s.cells[n].type !== "effect")
    throw new Error("Hook order changed between renders");
  return n;
}
function Ke(s, n) {
  const i = pl(), l = pg();
  i.renderContext.commitTasks.push({
    effect: s,
    deps: n,
    cellIndex: l
  });
}
function dr(s) {
  const [n] = Ot(() => ({
    current: s
  }));
  return n;
}
const mg = (s, n) => {
  if (s.length !== n.length)
    return !1;
  for (let i = 0; i < s.length; i++)
    if (!Object.is(s[i], n[i]))
      return !1;
  return !0;
}, le = (s, n) => {
  const i = dr();
  return i.current || (i.current = { value: s(), deps: n }), mg(i.current.deps, n) || (i.current.value = s(), i.current.deps = n), i.current.value;
}, gg = (s, n) => le(() => s, n);
function ss(s, n) {
  const [i, l] = Ot({}), c = le(() => Wi(s.type, () => l({})), [s.type]), d = n ? le(() => s.props, n) : s.props, h = le(() => us(c, d), [c, d, i]);
  return Ke(() => () => ls(c), [c]), Ke(() => {
    cs(c, h);
  }, [c, h]), h.state;
}
function zt(s) {
  return mf(s.type, s.props);
}
function yf(s, n, i) {
  const [l, c] = Ot(0), d = gg(() => c((_) => _ + 1), []), [h] = Ot(() => /* @__PURE__ */ new Map()), p = le(() => n, i), m = le(() => {
    const _ = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const E in s) {
      const I = s[E], C = p(I, E);
      let R = h.get(E);
      (!R || R.resource !== C.type) && (R && _.remove.push(E), R = Wi(C.type, d), _.add.push([E, R]));
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
const yg = 50;
let Lt = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class vg {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Lt.schedulers.add(this), _g();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const _g = () => {
  Lt.isScheduled || (Lt.isScheduled = !0, queueMicrotask(vf));
}, vf = () => {
  try {
    const s = [];
    let n = 0;
    for (const i of Lt.schedulers)
      if (Lt.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > yg)
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
}, sl = (s) => {
  const n = Lt;
  Lt = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = s();
    return vf(), i;
  } finally {
    Lt = n;
  }
}, Sg = xe((s) => {
  const [, n] = Ot(s.element), i = ss(s.element), l = dr(/* @__PURE__ */ new Set()).current, c = dr(i);
  return Ke(() => {
    i !== c.current && (c.current = i, l.forEach((h) => h()));
  }), le(() => ({
    getState: () => c.current,
    subscribe: (h) => (l.add(h), () => l.delete(h)),
    render: (h) => {
      const p = s.element !== h;
      s.element = h, s.onRender(p) && n(h);
    },
    unmount: s.onUnmount
  }), []);
}), wg = (s, { mount: n = !0 } = {}) => {
  let i = n, l;
  const c = {
    element: s,
    onRender: (p) => i ? p : (i = !0, sl(() => {
      p && (l = us(h, c)), !d.isDirty && cs(h, l);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, ls(h);
    }
  }, d = new vg(() => {
    l = us(h, c), !(d.isDirty || !i) && cs(h, l);
  }), h = Wi(Sg, () => d.markDirty());
  return sl(() => {
    d.markDirty();
  }), l.state;
}, is = /* @__PURE__ */ Symbol("tap.Context"), _f = (s) => ({
  [is]: s
}), Sf = (s, n, i) => {
  const l = s[is];
  s[is] = n;
  try {
    return i();
  } finally {
    s[is] = l;
  }
}, wf = (s) => s[is], zd = (s) => {
  let n;
  const i = /* @__PURE__ */ new Set(), l = (_, E) => {
    const I = typeof _ == "function" ? _(n) : _;
    if (!Object.is(I, n)) {
      const C = n;
      n = E ?? (typeof I != "object" || I === null) ? I : Object.assign({}, n, I), i.forEach((R) => R(n, C));
    }
  }, c = () => n, p = { setState: l, getState: c, getInitialState: () => m, subscribe: (_) => (i.add(_), () => i.delete(_)) }, m = n = s(l, c, p);
  return p;
}, xg = ((s) => s ? zd(s) : zd), Eg = (s) => s;
function kg(s, n = Eg) {
  const i = Gt.useSyncExternalStore(
    s.subscribe,
    Gt.useCallback(() => n(s.getState()), [s, n]),
    Gt.useCallback(() => n(s.getInitialState()), [s, n])
  );
  return Gt.useDebugValue(i), i;
}
const Dd = (s) => {
  const n = xg(s), i = (l) => kg(n, l);
  return Object.assign(i, n), i;
}, Cg = ((s) => s ? Dd(s) : Dd);
function Fd(s, n) {
  if (typeof s == "function")
    return s(n);
  s != null && (s.current = n);
}
function xf(...s) {
  return (n) => {
    let i = !1;
    const l = s.map((c) => {
      const d = Fd(c, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let c = 0; c < l.length; c++) {
          const d = l[c];
          typeof d == "function" ? d() : Fd(s[c], null);
        }
      };
  };
}
function Yi(...s) {
  return b.useCallback(xf(...s), s);
}
const Ef = xe((s) => {
  const n = le(() => wg(s, { mount: !1 }), [s.type]);
  return Ke(() => {
    n.render(s);
  }), n;
});
class Tg {
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
const It = (s, n) => {
  const i = dr(s);
  Ke(() => {
    i.current = s;
  });
  const l = le(() => new Proxy({}, new Tg(i)), []), c = n?.key, d = s.getState();
  return le(() => ({
    key: c,
    state: d,
    api: l
  }), [d, c]);
}, zi = xe((s) => {
  const n = dr(s.get);
  return Ke(() => {
    n.current = s.get;
  }), le(() => We({
    source: s.source,
    query: s.query,
    get: () => n.current()
  }), [s.source, JSON.stringify(s.query)]);
}), bg = xe((s) => {
  const n = ss(s.scopeElement);
  return le(() => [s.fieldName, n], [s.fieldName, n]);
}), Ig = xe((s) => {
  const { on: n, subscribe: i, ...l } = s, c = dr({ on: n, subscribe: i });
  Ke(() => {
    c.current = { on: n, subscribe: i };
  });
  const d = yf(l, (h, p) => bg({
    fieldName: p,
    scopeElement: h
  }), []);
  return le(() => {
    const h = Object.fromEntries(Object.values(d)), { on: p, subscribe: m } = c.current;
    return p && (h.on = (_, E) => p(_, E)), m && (h.subscribe = (_) => m(_)), h;
  }, [d]);
}), kf = _f(null), Rg = (s, n) => Sf(kf, s, n), Cf = () => {
  const s = wf(kf);
  if (!s)
    throw new Error("Model context is not available in this context");
  return s;
}, Mg = xe(({ toolkit: s }) => {
  const [n, i] = Ot(() => ({
    tools: {}
  })), l = Cf();
  Ke(() => {
    if (!s)
      return;
    const d = [];
    for (const [m, _] of Object.entries(s))
      _.render && d.push(c(m, _.render));
    const h = Object.entries(s).reduce((m, [_, E]) => {
      const { render: I, ...C } = E;
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
    getState: () => n,
    setToolUI: c
  });
}), Ng = xe(() => le(() => {
  const n = /* @__PURE__ */ new Map();
  return {
    on: (i, l) => {
      n.has(i) || n.set(i, /* @__PURE__ */ new Set());
      const c = n.get(i);
      return c.add(l), () => {
        c.delete(l), c.size === 0 && n.delete(i);
      };
    },
    emit: (i, l) => {
      const c = n.get(i), d = n.get("*");
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
}, [])), Tf = _f(null), Ag = (s, n) => Sf(Tf, s, n), gl = () => {
  const s = wf(Tf);
  if (!s)
    throw new Error("Events context is not available");
  return s;
}, Pg = xe(() => {
  const [s] = Ot(() => ({})), n = new rf();
  return It({
    getState: () => s,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), jg = xe(({ threads: s, modelContext: n, tools: i }) => {
  const l = zt(Ng()), { threads: c, tools: d, modelContext: h } = Ag(l, () => {
    const m = ss(n ?? Pg(), [n]);
    return Rg(m.api, () => ({
      modelContext: m,
      tools: ss(i ?? Mg({}), [i]),
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
}), Lg = (s) => {
  const n = () => s.getState().api.threads.item("main");
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
      get: () => n()
    }),
    composer: We({
      source: "thread",
      query: {},
      get: () => s.getState().api.threads.thread("main").composer
    }),
    on(i, l) {
      const { event: c, scope: d } = Qi(i);
      if (d === "*")
        return s.getState().api.on(c, l);
      if (rs("thread", d) || rs("thread-list-item", d) || rs("composer", d))
        return s.getState().api.on(c, (h) => {
          h.threadId === n().getState().id && l(h);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: s.subscribe
  };
}, Og = (s) => {
  const n = yl(), i = ml(Ef(jg(s))), l = b.useMemo(() => Lg(i), [i]);
  return b.useMemo(() => If(n, l), [n, l]);
}, We = (s) => {
  const n = s.get;
  return n.source = s.source, n.query = s.query, n;
}, Di = () => () => {
}, bf = b.createContext({
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
  subscribe: Di,
  on: (s) => {
    const { scope: n } = Qi(s);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), yl = () => b.useContext(bf), vl = (s) => {
  const n = yl(), i = ml(Ig(s));
  return b.useMemo(() => If(n, i), [n, i]);
}, zg = (s) => Og(s);
function yt(s) {
  return s ? zg(s) : yl();
}
const Dg = (s, n) => s === Di ? n : n === Di ? s : (...i) => {
  const l = s(...i), c = n(...i);
  return () => {
    l(), c();
  };
}, If = (s, n) => {
  const i = n.subscribe;
  return {
    ...s,
    ...n,
    subscribe: Dg(s.subscribe, i ?? Di)
  };
}, Gi = ({ api: s, children: n, devToolsVisible: i = !0 }) => (b.useEffect(() => {
  if (!(!i || !s.subscribe))
    return An.register(s);
}, [s, i]), y.jsx(bf.Provider, { value: s, children: n }));
class Bd {
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
const we = (s) => {
  const n = yt(), i = b.useMemo(() => new Bd(n), [n]), l = b.useSyncExternalStore(n.subscribe, () => s(i), () => s(i));
  if (b.useDebugValue(l), l instanceof Bd)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return l;
}, Xa = (s, n) => {
  const i = yt(), l = b.useRef(n);
  b.useEffect(() => {
    l.current = n;
  });
  const { scope: c, event: d } = Qi(s);
  b.useEffect(() => i.on({ scope: c, event: d }, (h) => l.current(h)), [i, c, d]);
};
function Fg(s, n) {
  function i(l) {
    const c = b.useContext(s);
    if (!l?.optional && !c)
      throw new Error(`This component must be used within ${n}.`);
    return c;
  }
  return i;
}
function Rf(s, n) {
  function i(c) {
    const d = s(c);
    return d ? d[n] : null;
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
    [n]: l,
    [`${n}Store`]: i
  };
}
const Mf = b.createContext(null), Bg = Fg(Mf, "ThreadPrimitive.Viewport"), { useThreadViewport: Fi, useThreadViewportStore: _l } = Rf(Bg, "useThreadViewport"), Ug = (s) => {
  const n = s;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function $g(s, n = Hg) {
  Ug(s);
  const i = b.useSyncExternalStore(s.subscribe, () => n(s.getState()), () => n(s.getState()));
  return b.useDebugValue(i), i;
}
const Hg = (s) => s;
function Vg(s) {
  function n(i) {
    let l = !1, c;
    typeof i == "function" ? c = i : i && (l = !!i.optional, c = i.selector);
    const d = s({ optional: l });
    return d ? $g(d, c) : null;
  }
  return n;
}
function Wg(s) {
  const n = yt(), i = we(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !s?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const Ni = Vg(Wg), Ln = (s) => {
  const [, n] = Ot(s.getState);
  return Ke(() => (n(s.getState()), s.subscribe(() => {
    n(s.getState());
  })), [s]), s.getState();
}, Qg = xe(({ runtime: s }) => {
  const n = Ln(s), i = gl();
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
    getState: () => n,
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
    key: n.id
  });
}), ds = (s) => {
  const n = le(() => Object.fromEntries(s), [s]), i = yf(n, (d) => d, []), l = le(() => Object.keys(i), [i]);
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
}, Nf = xe(({ runtime: s }) => {
  const n = Ln(s);
  return It({
    getState: () => n,
    remove: s.remove,
    __internal_getRuntime: () => s
  }, {
    key: n.id
  });
}), Yg = xe(({ runtime: s, index: n }) => {
  const i = le(() => s.getAttachmentByIndex(n), [s, n]);
  return zt(Nf({
    runtime: i
  }));
}), Af = xe(({ threadIdRef: s, messageIdRef: n, runtime: i }) => {
  const l = Ln(i), c = gl();
  Ke(() => {
    const p = [], m = [
      "send",
      "attachment-add"
    ];
    for (const _ of m) {
      const E = i.unstable_on(_, () => {
        c.emit(`composer.${_}`, {
          threadId: s.current,
          ...n && { messageId: n.current }
        });
      });
      p.push(E);
    }
    return () => {
      for (const _ of p)
        _();
    };
  }, [i, c, s, n]);
  const d = ds(l.attachments.map((p, m) => [
    p.id,
    Yg({ runtime: i, index: m })
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
}), Gg = xe(({ runtime: s }) => {
  const n = Ln(s);
  return It({
    getState: () => n,
    addToolResult: (l) => s.addToolResult(l),
    resumeToolCall: (l) => s.resumeToolCall(l),
    __internal_getRuntime: () => s
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), Kg = xe(({ runtime: s, index: n }) => {
  const i = le(() => s.getAttachmentByIndex(n), [s, n]);
  return zt(Nf({ runtime: i }));
}), Jg = xe(({ runtime: s, index: n }) => {
  const i = le(() => s.getMessagePartByIndex(n), [s, n]);
  return zt(Gg({ runtime: i }));
}), qg = xe(({ runtime: s, threadIdRef: n }) => {
  const i = Ln(s), [l, c] = Ot(!1), [d, h] = Ot(!1), p = le(() => ({
    get current() {
      return s.getState().id;
    }
  }), [s]), m = zt(Af({
    runtime: s.composer,
    threadIdRef: n,
    messageIdRef: p
  })), _ = ds(i.content.map((C, R) => [
    "toolCallId" in C && C.toolCallId != null ? `toolCallId-${C.toolCallId}` : `index-${R}`,
    Jg({ runtime: s, index: R })
  ])), E = ds(i.attachments?.map((C, R) => [
    C.id,
    Kg({ runtime: s, index: R })
  ]) ?? []), I = le(() => ({
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
    getState: () => I,
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
}), Xg = xe(({ runtime: s, id: n, threadIdRef: i }) => {
  const l = le(() => s.getMessageById(n), [s, n]);
  return zt(qg({ runtime: l, threadIdRef: i }));
}), Zg = xe(({ runtime: s }) => {
  const n = Ln(s), i = gl();
  Ke(() => {
    const p = [], m = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const _ of m) {
      const E = s.unstable_on(_, () => {
        const I = s.getState()?.threadId || "unknown";
        i.emit(`thread.${_}`, {
          threadId: I
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
  }), [s]), c = zt(Af({
    runtime: s.composer,
    threadIdRef: l
  })), d = ds(n.messages.map((p) => [
    p.id,
    Xg({ runtime: s, id: p.id, threadIdRef: l })
  ])), h = le(() => ({
    isEmpty: d.state.length === 0 && !n.isLoading,
    isDisabled: n.isDisabled,
    isLoading: n.isLoading,
    isRunning: n.isRunning,
    capabilities: n.capabilities,
    state: n.state,
    suggestions: n.suggestions,
    extras: n.extras,
    speech: n.speech,
    composer: c.state,
    messages: d.state
  }), [n, d, c.state]);
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
}), ey = xe(({ runtime: s, id: n }) => {
  const i = le(() => s.getItemById(n), [s, n]);
  return zt(Qg({
    runtime: i
  }));
}), ty = xe(({ runtime: s, __internal_assistantRuntime: n }) => {
  const i = Ln(s), l = zt(Zg({
    runtime: s.main
  })), c = ds(Object.keys(i.threadItems).map((h) => [
    h,
    ey({ runtime: s, id: h })
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
    __internal_getAssistantRuntime: () => n
  });
}), ny = xe((s) => {
  const n = Cf();
  return Ke(() => s.registerModelContextProvider(n), [s, n]), zt(ty({
    runtime: s.threads,
    __internal_assistantRuntime: s
  }));
}), Za = (s) => {
  const n = /* @__PURE__ */ new Map(), i = () => {
    let l = 0;
    for (const c of n.values())
      l += c;
    s(l);
  };
  return {
    register: () => {
      const l = /* @__PURE__ */ Symbol();
      return n.set(l, 0), {
        setHeight: (c) => {
          n.get(l) !== c && (n.set(l, c), i());
        },
        unregister: () => {
          n.delete(l), i();
        }
      };
    }
  };
}, ry = (s = {}) => {
  const n = /* @__PURE__ */ new Set(), i = Za((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: h
      }
    });
  }), l = Za((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: h
      }
    });
  }), c = Za((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: h
      }
    });
  }), d = Cg(() => ({
    isAtBottom: !0,
    scrollToBottom: ({ behavior: h = "auto" } = {}) => {
      for (const p of n)
        p({ behavior: h });
    },
    onScrollToBottom: (h) => (n.add(h), () => {
      n.delete(h);
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
}, fs = (s) => s, sy = (s) => {
  const n = _l({ optional: !0 }), [i] = b.useState(() => ry(s));
  return b.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), b.useEffect(() => {
    if (n)
      return i.subscribe((l) => {
        n.getState().isAtBottom !== l.isAtBottom && fs(n).setState({ isAtBottom: l.isAtBottom });
      });
  }, [i, n]), b.useEffect(() => {
    const l = {
      turnAnchor: s.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== l.turnAnchor && fs(i).setState(l);
  }, [i, s.turnAnchor]), i;
}, Pf = ({ children: s, options: n = {} }) => {
  const i = sy(n), [l] = b.useState(() => ({
    useThreadViewport: i
  }));
  return y.jsx(Mf.Provider, { value: l, children: s });
}, iy = (s) => s._core?.RenderComponent, oy = ({ children: s, runtime: n }) => {
  const i = yt({
    threads: ny(n)
  }), l = iy(n);
  return y.jsxs(Gi, { api: i, children: [l && y.jsx(l, {}), y.jsx(Pf, { children: s })] });
}, ay = b.memo(oy), ly = ({ index: s, children: n }) => {
  const i = yt(), l = vl({
    message: zi({
      source: "thread",
      query: { type: "index", index: s },
      get: () => i.thread().message({ index: s })
    }),
    composer: zi({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: s }).composer
    }),
    on(c, d) {
      const h = () => i.thread().message({ index: s }), { event: p, scope: m } = Qi(c);
      return !rs("composer", m) && !rs("message", m) ? i.on(c, d) : i.on({ scope: "thread", event: p }, (_) => {
        _.messageId === h().getState().id && d(_);
      });
    }
  });
  return y.jsx(Gi, { api: l, children: n });
}, uy = ({ index: s, children: n }) => {
  const i = yt(), l = vl({
    part: zi({
      source: "message",
      query: { type: "index", index: s },
      get: () => i.message().part({ index: s })
    })
  });
  return y.jsx(Gi, { api: l, children: n });
}, cy = xe(({ text: s, isRunning: n }) => {
  const i = le(() => ({
    type: "text",
    text: s,
    status: n ? { type: "running" } : { type: "complete" }
  }), [s, n]);
  return It({
    getState: () => i,
    addToolResult: () => {
      throw new Error("Not supported");
    },
    resumeToolCall: () => {
      throw new Error("Not supported");
    }
  });
}), dy = ({ text: s, isRunning: n = !1, children: i }) => {
  const l = ml(Ef(cy({ text: s, isRunning: n }))), c = vl({
    part: zi({
      source: "root",
      query: {},
      get: () => l.getState().api
    }),
    subscribe: l.subscribe
  });
  return y.jsx(Gi, { api: c, children: i });
};
class fy {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new Km(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
    return this._core.threads.getMainThreadRuntimeCore().import(fl.fromArray(n ?? []));
  }
}
function Ki(s) {
  const n = b.useRef(s);
  return b.useEffect(() => {
    n.current = s;
  }), b.useMemo(() => (...i) => n.current?.(...i), []);
}
const hy = b.createContext(null);
function py(s) {
  const n = b.useContext(hy);
  if (!s?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: R_, useSmoothStatusStore: my } = Rf(py, "useSmoothStatus");
class gy {
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
    let l = n - this.lastUpdateTime;
    const c = this.targetText.length - this.currentText.length, d = Math.min(5, 250 / c);
    let h = 0;
    for (; l >= d && h < c; )
      h++, l -= d;
    h !== c ? this.animationFrameId = requestAnimationFrame(this.animate) : this.animationFrameId = null, h !== 0 && (this.currentText = this.targetText.slice(0, this.currentText.length + h), this.lastUpdateTime = n - l, this.setText(this.currentText));
  };
}
const el = Object.freeze({
  type: "running"
}), yy = (s, n = !1) => {
  const { text: i } = s, l = we(({ message: E }) => E.id), c = b.useRef(l), [d, h] = b.useState(i), p = my({ optional: !0 }), m = Ki((E) => {
    if (h(E), p) {
      const I = d !== E || s.status.type === "running" ? el : s.status;
      fs(p).setState(I, !0);
    }
  });
  b.useEffect(() => {
    if (p) {
      const E = n && (d !== i || s.status.type === "running") ? el : s.status;
      fs(p).setState(E, !0);
    }
  }, [p, n, i, d, s.status]);
  const [_] = b.useState(new gy(i, m));
  return b.useEffect(() => {
    if (!n) {
      _.stop();
      return;
    }
    if (c.current !== l || !i.startsWith(_.targetText)) {
      c.current = l, m(i), _.currentText = i, _.targetText = i, _.stop();
      return;
    }
    _.targetText = i, _.start();
  }, [m, _, l, n, i]), b.useEffect(() => () => {
    _.stop();
  }, [_]), b.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? s.status : el
  } : s, [n, d, s, i]);
};
var vy = /* @__PURE__ */ Symbol.for("react.lazy"), Bi = um[" use ".trim().toString()];
function _y(s) {
  return typeof s == "object" && s !== null && "then" in s;
}
function jf(s) {
  return s != null && typeof s == "object" && "$$typeof" in s && s.$$typeof === vy && "_payload" in s && _y(s._payload);
}
// @__NO_SIDE_EFFECTS__
function Lf(s) {
  const n = /* @__PURE__ */ Sy(s), i = b.forwardRef((l, c) => {
    let { children: d, ...h } = l;
    jf(d) && typeof Bi == "function" && (d = Bi(d._payload));
    const p = b.Children.toArray(d), m = p.find(xy);
    if (m) {
      const _ = m.props.children, E = p.map((I) => I === m ? b.Children.count(_) > 1 ? b.Children.only(null) : b.isValidElement(_) ? _.props.children : null : I);
      return /* @__PURE__ */ y.jsx(n, { ...h, ref: c, children: b.isValidElement(_) ? b.cloneElement(_, void 0, E) : null });
    }
    return /* @__PURE__ */ y.jsx(n, { ...h, ref: c, children: d });
  });
  return i.displayName = `${s}.Slot`, i;
}
var Of = /* @__PURE__ */ Lf("Slot");
// @__NO_SIDE_EFFECTS__
function Sy(s) {
  const n = b.forwardRef((i, l) => {
    let { children: c, ...d } = i;
    if (jf(c) && typeof Bi == "function" && (c = Bi(c._payload)), b.isValidElement(c)) {
      const h = ky(c), p = Ey(d, c.props);
      return c.type !== b.Fragment && (p.ref = l ? xf(l, h) : h), b.cloneElement(c, p);
    }
    return b.Children.count(c) > 1 ? b.Children.only(null) : null;
  });
  return n.displayName = `${s}.SlotClone`, n;
}
var wy = /* @__PURE__ */ Symbol("radix.slottable");
function xy(s) {
  return b.isValidElement(s) && typeof s.type == "function" && "__radixId" in s.type && s.type.__radixId === wy;
}
function Ey(s, n) {
  const i = { ...n };
  for (const l in n) {
    const c = s[l], d = n[l];
    /^on[A-Z]/.test(l) ? c && d ? i[l] = (...p) => {
      const m = d(...p);
      return c(...p), m;
    } : c && (i[l] = c) : l === "style" ? i[l] = { ...c, ...d } : l === "className" && (i[l] = [c, d].filter(Boolean).join(" "));
  }
  return { ...s, ...i };
}
function ky(s) {
  let n = Object.getOwnPropertyDescriptor(s.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? s.ref : (n = Object.getOwnPropertyDescriptor(s, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? s.props.ref : s.props.ref || s.ref);
}
var Cy = [
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
], pr = Cy.reduce((s, n) => {
  const i = /* @__PURE__ */ Lf(`Primitive.${n}`), l = b.forwardRef((c, d) => {
    const { asChild: h, ...p } = c, m = h ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ y.jsx(m, { ...p, ref: d });
  });
  return l.displayName = `Primitive.${n}`, { ...s, [n]: l };
}, {});
function os(s, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(c) {
    if (s?.(c), i === !1 || !c.defaultPrevented)
      return n?.(c);
  };
}
const Sl = (s, n, i = []) => {
  const l = b.forwardRef((c, d) => {
    const h = {}, p = {};
    Object.keys(c).forEach((_) => {
      i.includes(_) ? h[_] = c[_] : p[_] = c[_];
    });
    const m = n(h) ?? void 0;
    return y.jsx(pr.button, { type: "button", ...p, ref: d, disabled: p.disabled || !m, onClick: os(p.onClick, m) });
  });
  return l.displayName = s, l;
};
function Ty(s, n = globalThis?.document) {
  const i = Ki(s);
  b.useEffect(() => {
    const l = (c) => {
      c.key === "Escape" && i(c);
    };
    return n.addEventListener("keydown", l, { capture: !0 }), () => n.removeEventListener("keydown", l, { capture: !0 });
  }, [i, n]);
}
const gs = (s) => {
  const n = b.useRef(void 0);
  return b.useCallback((l) => {
    n.current && n.current(), l && (n.current = s(l));
  }, [s]);
}, zf = (s, n) => {
  const i = b.useCallback((l) => {
    if (!s)
      return;
    const c = s(), d = () => {
      const p = n ? n(l) : l.offsetHeight;
      c.setHeight(p);
    }, h = new ResizeObserver(d);
    return h.observe(l), d(), () => {
      h.disconnect(), c.unregister();
    };
  }, [s, n]);
  return gs(i);
}, Ud = b.createContext(!1), $d = (s, n) => {
  const i = s.match(/^([\d.]+)(em|px|rem)$/);
  if (!i)
    return 0;
  const l = parseFloat(i[1]), c = i[2];
  if (c === "px")
    return l;
  if (c === "em") {
    const d = parseFloat(getComputedStyle(n).fontSize) || 16;
    return l * d;
  }
  if (c === "rem") {
    const d = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return l * d;
  }
  return 0;
}, Df = ({ children: s, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const l = we(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: m, message: _ }) => _.isLast && _.role === "assistant" && _.index >= 1 && m.messages.at(_.index - 1)?.role === "user"
  ), c = _l({ optional: !0 }), d = b.useContext(Ud), h = b.useCallback((m) => {
    if (!c || d)
      return;
    const _ = () => {
      const E = c.getState();
      if (E.turnAnchor === "top" && l) {
        const { viewport: I, inset: C, userMessage: R } = E.height, z = $d(n, m), H = $d(i, m), G = R <= z ? R : H, se = Math.max(0, I - C - G);
        m.style.minHeight = `${se}px`, m.style.flexShrink = "0", m.style.transition = "min-height 0s";
      } else
        m.style.minHeight = "", m.style.flexShrink = "", m.style.transition = "";
    };
    return _(), c.subscribe(_);
  }, [
    c,
    l,
    d,
    n,
    i
  ]), p = gs(h);
  return y.jsx(Ud.Provider, { value: !0, children: y.jsx(Of, { ref: p, children: s }) });
};
Df.displayName = "ThreadPrimitive.ViewportSlack";
const by = () => {
  const s = yt(), n = we(() => s.message()), i = b.useCallback((l) => {
    const c = () => {
      n.setIsHovering(!0);
    }, d = () => {
      n.setIsHovering(!1);
    };
    return l.addEventListener("mouseenter", c), l.addEventListener("mouseleave", d), l.matches(":hover") && queueMicrotask(() => n.setIsHovering(!0)), () => {
      l.removeEventListener("mouseenter", c), l.removeEventListener("mouseleave", d), n.setIsHovering(!1);
    };
  }, [n]);
  return gs(i);
}, Iy = () => {
  const s = Fi((c) => c.turnAnchor), n = Fi((c) => c.registerUserMessageHeight), i = we(({ thread: c, message: d }) => s === "top" && d.role === "user" && d.index === c.messages.length - 2 && c.messages.at(-1)?.role === "assistant"), l = b.useCallback((c) => c.offsetHeight, []);
  return zf(i ? n : null, l);
}, wl = b.forwardRef((s, n) => {
  const i = by(), l = Iy(), c = Yi(n, i, l);
  return y.jsx(Df, { children: y.jsx(pr.div, { ...s, ref: c }) });
});
wl.displayName = "MessagePrimitive.Root";
const Ry = () => we(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), Ff = b.forwardRef(({ smooth: s = !0, component: n = "span", ...i }, l) => {
  const { text: c, status: d } = yy(Ry(), s);
  return y.jsx(n, { "data-status": d.type, ...i, ref: l, children: c });
});
Ff.displayName = "MessagePartPrimitive.Text";
const My = () => we(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), Bf = b.forwardRef((s, n) => {
  const { image: i } = My();
  return y.jsx(pr.img, { src: i, ...s, ref: n });
});
Bf.displayName = "MessagePartPrimitive.Image";
const Uf = ({ children: s }) => we(({ part: i }) => i.status.type === "running") ? s : null;
Uf.displayName = "MessagePartPrimitive.InProgress";
const Hd = (s) => Symbol.iterator in s, Vd = (s) => (
  // HACK: avoid checking entries type
  "entries" in s
), Wd = (s, n) => {
  const i = s instanceof Map ? s : new Map(s.entries()), l = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== l.size)
    return !1;
  for (const [c, d] of i)
    if (!l.has(c) || !Object.is(d, l.get(c)))
      return !1;
  return !0;
}, Ny = (s, n) => {
  const i = s[Symbol.iterator](), l = n[Symbol.iterator]();
  let c = i.next(), d = l.next();
  for (; !c.done && !d.done; ) {
    if (!Object.is(c.value, d.value))
      return !1;
    c = i.next(), d = l.next();
  }
  return !!c.done && !!d.done;
};
function Ay(s, n) {
  return Object.is(s, n) ? !0 : typeof s != "object" || s === null || typeof n != "object" || n === null || Object.getPrototypeOf(s) !== Object.getPrototypeOf(n) ? !1 : Hd(s) && Hd(n) ? Vd(s) && Vd(n) ? Wd(s, n) : Ny(s, n) : Wd(
    { entries: () => Object.entries(s) },
    { entries: () => Object.entries(n) }
  );
}
function Py(s) {
  const n = Gt.useRef(void 0);
  return (i) => {
    const l = s(i);
    return Ay(n.current, l) ? n.current : n.current = l;
  };
}
const Qd = (s) => {
  let n = -1;
  return {
    startGroup: (i) => {
      n === -1 && (n = i);
    },
    endGroup: (i, l) => {
      n !== -1 && (l.push({
        type: s,
        startIndex: n,
        endIndex: i
      }), n = -1);
    },
    finalize: (i, l) => {
      n !== -1 && l.push({
        type: s,
        startIndex: n,
        endIndex: i
      });
    }
  };
}, jy = (s) => {
  const n = [], i = Qd("toolGroup"), l = Qd("reasoningGroup");
  for (let c = 0; c < s.length; c++) {
    const d = s[c];
    d === "tool-call" ? (l.endGroup(c - 1, n), i.startGroup(c)) : d === "reasoning" ? (i.endGroup(c - 1, n), l.startGroup(c)) : (i.endGroup(c - 1, n), l.endGroup(c - 1, n), n.push({ type: "single", index: c }));
  }
  return i.finalize(s.length - 1, n), l.finalize(s.length - 1, n), n;
}, Ly = () => {
  const s = we(Py((n) => n.message.parts.map((i) => i.type)));
  return b.useMemo(() => s.length === 0 ? [] : jy(s), [s]);
}, Oy = ({ Fallback: s, ...n }) => {
  const i = we(({ tools: l }) => {
    const c = l.tools[n.toolName] ?? s;
    return Array.isArray(c) ? c[0] ?? s : c;
  });
  return i ? y.jsx(i, { ...n }) : null;
}, Yt = {
  Text: () => y.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [y.jsx(Ff, {}), y.jsx(Uf, { children: y.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => y.jsx(Bf, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: s }) => s,
  ReasoningGroup: ({ children: s }) => s
}, zy = ({ components: { Text: s = Yt.Text, Reasoning: n = Yt.Reasoning, Image: i = Yt.Image, Source: l = Yt.Source, File: c = Yt.File, Unstable_Audio: d = Yt.Unstable_Audio, tools: h = {} } = {} }) => {
  const p = yt(), m = we(({ part: E }) => E), _ = m.type;
  if (_ === "tool-call") {
    const E = p.part().addToolResult, I = p.part().resumeToolCall;
    if ("Override" in h)
      return y.jsx(h.Override, { ...m, addResult: E, resume: I });
    const C = h.by_name?.[m.toolName] ?? h.Fallback;
    return y.jsx(Oy, { ...m, Fallback: C, addResult: E, resume: I });
  }
  if (m.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (_) {
    case "text":
      return y.jsx(s, { ...m });
    case "reasoning":
      return y.jsx(n, { ...m });
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
}, ji = b.memo(({ index: s, components: n }) => y.jsx(uy, { index: s, children: y.jsx(zy, { components: n }) }), (s, n) => s.index === n.index && s.components?.Text === n.components?.Text && s.components?.Reasoning === n.components?.Reasoning && s.components?.Source === n.components?.Source && s.components?.Image === n.components?.Image && s.components?.File === n.components?.File && s.components?.Unstable_Audio === n.components?.Unstable_Audio && s.components?.tools === n.components?.tools && s.components?.ToolGroup === n.components?.ToolGroup && s.components?.ReasoningGroup === n.components?.ReasoningGroup);
ji.displayName = "MessagePrimitive.PartByIndex";
const Dy = ({ status: s, component: n }) => y.jsx(dy, { text: "", isRunning: s.type === "running", children: y.jsx(n, { type: "text", text: "", status: s }) }), Fy = Object.freeze({
  type: "complete"
}), By = ({ components: s }) => {
  const n = we((i) => i.message.status ?? Fy);
  return s?.Empty ? y.jsx(s.Empty, { status: n }) : y.jsx(Dy, { status: n, component: s?.Text ?? Yt.Text });
}, Uy = b.memo(By, (s, n) => s.components?.Empty === n.components?.Empty && s.components?.Text === n.components?.Text), xl = ({ components: s }) => {
  const n = we(({ message: c }) => c.parts.length), i = Ly(), l = b.useMemo(() => n === 0 ? y.jsx(Uy, { components: s }) : i.map((c) => {
    if (c.type === "single")
      return y.jsx(ji, { index: c.index, components: s }, c.index);
    if (c.type === "toolGroup") {
      const d = s?.ToolGroup ?? Yt.ToolGroup;
      return y.jsx(d, { startIndex: c.startIndex, endIndex: c.endIndex, children: Array.from({ length: c.endIndex - c.startIndex + 1 }, (h, p) => y.jsx(ji, { index: c.startIndex + p, components: s }, p)) }, `tool-${c.startIndex}`);
    } else {
      const d = s?.ReasoningGroup ?? Yt.ReasoningGroup;
      return y.jsx(d, { startIndex: c.startIndex, endIndex: c.endIndex, children: Array.from({ length: c.endIndex - c.startIndex + 1 }, (h, p) => y.jsx(ji, { index: c.startIndex + p, components: s }, p)) }, `reasoning-${c.startIndex}`);
    }
  }), [i, s, n]);
  return y.jsx(y.Fragment, { children: l });
};
xl.displayName = "MessagePrimitive.Parts";
const $f = ({ children: s }) => we(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? s : null;
$f.displayName = "MessagePrimitive.Error";
const Hf = () => {
  const s = yt(), n = we((l) => l.thread.isRunning || !l.composer.isEditing || l.composer.isEmpty), i = b.useCallback(() => {
    s.composer().send();
  }, [s]);
  return n ? null : i;
}, $y = Sl("ComposerPrimitive.Send", Hf), Vf = b.forwardRef(({ onSubmit: s, ...n }, i) => {
  const l = Hf(), c = (d) => {
    d.preventDefault(), l && l();
  };
  return y.jsx(pr.form, { ...n, ref: i, onSubmit: os(s, c) });
});
Vf.displayName = "ComposerPrimitive.Root";
function il() {
  return il = Object.assign ? Object.assign.bind() : function(s) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var l in i) ({}).hasOwnProperty.call(i, l) && (s[l] = i[l]);
    }
    return s;
  }, il.apply(null, arguments);
}
function Hy(s, n) {
  if (s == null) return {};
  var i = {};
  for (var l in s) if ({}.hasOwnProperty.call(s, l)) {
    if (n.indexOf(l) !== -1) continue;
    i[l] = s[l];
  }
  return i;
}
var Vy = b.useLayoutEffect, Wy = function(n) {
  var i = Gt.useRef(n);
  return Vy(function() {
    i.current = n;
  }), i;
}, Yd = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, Qy = function(n, i) {
  var l = Gt.useRef();
  return Gt.useCallback(function(c) {
    n.current = c, l.current && Yd(l.current, null), l.current = i, i && Yd(i, c);
  }, [i]);
}, Gd = {
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
}, Yy = function(n) {
  Object.keys(Gd).forEach(function(i) {
    n.style.setProperty(i, Gd[i], "important");
  });
}, Kd = Yy, Ge = null, Jd = function(n, i) {
  var l = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? l + i.borderSize : l - i.paddingSize;
};
function Gy(s, n, i, l) {
  i === void 0 && (i = 1), l === void 0 && (l = 1 / 0), Ge || (Ge = document.createElement("textarea"), Ge.setAttribute("tabindex", "-1"), Ge.setAttribute("aria-hidden", "true"), Kd(Ge)), Ge.parentNode === null && document.body.appendChild(Ge);
  var c = s.paddingSize, d = s.borderSize, h = s.sizingStyle, p = h.boxSizing;
  Object.keys(h).forEach(function(C) {
    var R = C;
    Ge.style[R] = h[R];
  }), Kd(Ge), Ge.value = n;
  var m = Jd(Ge, s);
  Ge.value = n, m = Jd(Ge, s), Ge.value = "x";
  var _ = Ge.scrollHeight - c, E = _ * i;
  p === "border-box" && (E = E + c + d), m = Math.max(E, m);
  var I = _ * l;
  return p === "border-box" && (I = I + c + d), m = Math.min(I, m), [m, _];
}
var qd = function() {
}, Ky = function(n, i) {
  return n.reduce(function(l, c) {
    return l[c] = i[c], l;
  }, {});
}, Jy = [
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
], qy = !!document.documentElement.currentStyle, Xy = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var l = Ky(Jy, i), c = l.boxSizing;
  if (c === "")
    return null;
  qy && c === "border-box" && (l.width = parseFloat(l.width) + parseFloat(l.borderRightWidth) + parseFloat(l.borderLeftWidth) + parseFloat(l.paddingRight) + parseFloat(l.paddingLeft) + "px");
  var d = parseFloat(l.paddingBottom) + parseFloat(l.paddingTop), h = parseFloat(l.borderBottomWidth) + parseFloat(l.borderTopWidth);
  return {
    sizingStyle: l,
    paddingSize: d,
    borderSize: h
  };
}, Zy = Xy;
function El(s, n, i) {
  var l = Wy(i);
  b.useLayoutEffect(function() {
    var c = function(h) {
      return l.current(h);
    };
    if (s)
      return s.addEventListener(n, c), function() {
        return s.removeEventListener(n, c);
      };
  }, []);
}
var ev = function(n, i) {
  El(document.body, "reset", function(l) {
    n.current.form === l.target && i(l);
  });
}, tv = function(n) {
  El(window, "resize", n);
}, nv = function(n) {
  El(document.fonts, "loadingdone", n);
}, rv = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], sv = function(n, i) {
  var l = n.cacheMeasurements, c = n.maxRows, d = n.minRows, h = n.onChange, p = h === void 0 ? qd : h, m = n.onHeightChange, _ = m === void 0 ? qd : m, E = Hy(n, rv), I = E.value !== void 0, C = b.useRef(null), R = Qy(C, i), z = b.useRef(0), H = b.useRef(), G = function() {
    var J = C.current, X = l && H.current ? H.current : Zy(J);
    if (X) {
      H.current = X;
      var Ee = Gy(X, J.value || J.placeholder || "x", d, c), ne = Ee[0], ue = Ee[1];
      z.current !== ne && (z.current = ne, J.style.setProperty("height", ne + "px", "important"), _(ne, {
        rowHeight: ue
      }));
    }
  }, se = function(J) {
    I || G(), p(J);
  };
  return b.useLayoutEffect(G), ev(C, function() {
    if (!I) {
      var Q = C.current.value;
      requestAnimationFrame(function() {
        var J = C.current;
        J && Q !== J.value && G();
      });
    }
  }), tv(G), nv(G), /* @__PURE__ */ b.createElement("textarea", il({}, E, {
    onChange: se,
    ref: R
  }));
}, iv = /* @__PURE__ */ b.forwardRef(sv);
const Wf = (s) => {
  const n = Ki(s), i = Fi((l) => l.onScrollToBottom);
  b.useEffect(() => i(n), [i, n]);
}, Qf = b.forwardRef(({ autoFocus: s = !1, asChild: n, disabled: i, onChange: l, onKeyDown: c, onPaste: d, submitOnEnter: h = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: m = !0, unstable_focusOnScrollToBottom: _ = !0, unstable_focusOnThreadSwitched: E = !0, addAttachmentOnPaste: I = !0, ...C }, R) => {
  const z = yt(), H = we(({ composer: q }) => q.isEditing ? q.text : ""), G = n ? Of : iv, se = we(({ thread: q, composer: fe }) => q.isDisabled || fe.dictation?.inputDisabled) || i, Q = b.useRef(null), J = Yi(R, Q);
  Ty((q) => {
    if (!p || !Q.current?.contains(q.target))
      return;
    const fe = z.composer();
    fe.getState().canCancel && (fe.cancel(), q.preventDefault());
  });
  const X = (q) => {
    se || !h || q.nativeEvent.isComposing || q.key === "Enter" && q.shiftKey === !1 && (z.thread().getState().isRunning || (q.preventDefault(), Q.current?.closest("form")?.requestSubmit()));
  }, Ee = async (q) => {
    if (!I)
      return;
    const fe = z.thread().getState().capabilities, Ae = Array.from(q.clipboardData?.files || []);
    if (fe.attachments && Ae.length > 0)
      try {
        q.preventDefault(), await Promise.all(Ae.map((Ie) => z.composer().addAttachment(Ie)));
      } catch (Ie) {
        console.error("Error adding attachment:", Ie);
      }
  }, ne = s && !se, ue = b.useCallback(() => {
    const q = Q.current;
    !q || !ne || (q.focus({ preventScroll: !0 }), q.setSelectionRange(q.value.length, q.value.length));
  }, [ne]);
  return b.useEffect(() => ue(), [ue]), Wf(() => {
    z.composer().getState().type === "thread" && _ && ue();
  }), b.useEffect(() => {
    if (!(z.composer().getState().type !== "thread" || !m))
      return z.on("thread.run-start", ue);
  }, [m, ue, z]), b.useEffect(() => {
    if (!(z.composer().getState().type !== "thread" || !E))
      return z.on("thread-list-item.switched-to", ue);
  }, [E, ue, z]), y.jsx(G, { name: "input", value: H, ...C, ref: J, disabled: se, onChange: os(l, (q) => {
    z.composer().getState().isEditing && sl(() => {
      z.composer().setText(q.target.value);
    });
  }), onKeyDown: os(c, X), onPaste: os(d, Ee) });
});
Qf.displayName = "ComposerPrimitive.Input";
const ov = () => {
  const s = yt(), n = we(({ composer: l }) => !l.canCancel), i = b.useCallback(() => {
    s.composer().cancel();
  }, [s]);
  return n ? null : i;
}, av = Sl("ComposerPrimitive.Cancel", ov), Yf = b.forwardRef((s, n) => y.jsx(pr.div, { ...s, ref: n }));
Yf.displayName = "ThreadPrimitive.Root";
const lv = (s) => we(({ thread: n }) => !(s.empty === !0 && !n.isEmpty || s.empty === !1 && n.isEmpty || s.running === !0 && !n.isRunning || s.running === !1 && n.isRunning || s.disabled === !0 && !n.isDisabled || s.disabled === !1 && n.isDisabled)), ol = ({ children: s, ...n }) => lv(n) ? s : null;
ol.displayName = "ThreadPrimitive.If";
const uv = (s) => {
  const n = Ki(s), i = b.useCallback((l) => {
    const c = new ResizeObserver(() => {
      n();
    }), d = new MutationObserver((h) => {
      h.some((m) => m.type !== "attributes" || m.attributeName !== "style") && n();
    });
    return c.observe(l), d.observe(l, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      characterData: !0
    }), () => {
      c.disconnect(), d.disconnect();
    };
  }, [n]);
  return gs(i);
}, cv = ({ autoScroll: s, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: l = !0 }) => {
  const c = b.useRef(null), d = _l();
  s === void 0 && (s = d.getState().turnAnchor !== "top");
  const h = b.useRef(0), p = b.useRef(null), m = b.useCallback((R) => {
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
  }, E = uv(() => {
    const R = p.current;
    R ? m(R) : s && d.getState().isAtBottom && m("instant"), _();
  }), I = gs((R) => (R.addEventListener("scroll", _), () => {
    R.removeEventListener("scroll", _);
  }));
  return Wf(({ behavior: R }) => {
    m(R);
  }), Xa("thread.run-start", () => {
    n && (p.current = "auto", requestAnimationFrame(() => {
      m("auto");
    }));
  }), Xa("thread.initialize", () => {
    i && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), Xa("thread-list-item.switched-to", () => {
    l && (p.current = "instant", requestAnimationFrame(() => {
      m("instant");
    }));
  }), Yi(E, I, c);
}, dv = () => {
  const s = Fi((i) => i.registerViewport), n = b.useCallback((i) => i.clientHeight, []);
  return zf(s, n);
}, Gf = b.forwardRef(({ autoScroll: s, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: l, children: c, ...d }, h) => {
  const p = cv({
    autoScroll: s,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: l
  }), m = dv(), _ = Yi(h, p, m);
  return y.jsx(pr.div, { ...d, ref: _, children: c });
});
Gf.displayName = "ThreadPrimitive.ViewportScrollable";
const Kf = b.forwardRef(({ turnAnchor: s, ...n }, i) => y.jsx(Pf, { options: { turnAnchor: s }, children: y.jsx(Gf, { ...n, ref: i }) }));
Kf.displayName = "ThreadPrimitive.Viewport";
const Jf = (s, n) => s.Message === n.Message && s.EditComposer === n.EditComposer && s.UserEditComposer === n.UserEditComposer && s.AssistantEditComposer === n.AssistantEditComposer && s.SystemEditComposer === n.SystemEditComposer && s.UserMessage === n.UserMessage && s.AssistantMessage === n.AssistantMessage && s.SystemMessage === n.SystemMessage, fv = () => null, hv = (s, n, i) => {
  switch (n) {
    case "user":
      return i ? s.UserEditComposer ?? s.EditComposer ?? s.UserMessage ?? s.Message : s.UserMessage ?? s.Message;
    case "assistant":
      return i ? s.AssistantEditComposer ?? s.EditComposer ?? s.AssistantMessage ?? s.Message : s.AssistantMessage ?? s.Message;
    case "system":
      return i ? s.SystemEditComposer ?? s.EditComposer ?? s.SystemMessage ?? s.Message : s.SystemMessage ?? fv;
    default:
      const l = n;
      throw new Error(`Unknown message role: ${l}`);
  }
}, pv = ({ components: s }) => {
  const n = we(({ message: c }) => c.role), i = we(({ message: c }) => c.composer.isEditing), l = hv(s, n, i);
  return y.jsx(l, {});
}, qf = b.memo(({ index: s, components: n }) => y.jsx(ly, { index: s, children: y.jsx(pv, { components: n }) }), (s, n) => s.index === n.index && Jf(s.components, n.components));
qf.displayName = "ThreadPrimitive.MessageByIndex";
const Xf = ({ components: s }) => {
  const n = we(({ thread: l }) => l.messages.length);
  return b.useMemo(() => n === 0 ? null : Array.from({ length: n }, (l, c) => y.jsx(qf, { index: c, components: s }, c)), [n, s]);
};
Xf.displayName = "ThreadPrimitive.Messages";
const mv = b.memo(Xf, (s, n) => Jf(s.components, n.components)), gv = ({ prompt: s, send: n, clearComposer: i = !0, autoSend: l, method: c }) => {
  const d = yt(), h = we(({ thread: _ }) => _.isDisabled), p = n ?? l ?? !1, m = b.useCallback(() => {
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
}, yv = Sl("ThreadPrimitive.Suggestion", gv, ["prompt", "send", "clearComposer", "autoSend", "method"]), vv = 1, gt = Object.freeze({
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
}), _v = Object.freeze(
  Object.fromEntries(
    Object.entries(ut).map(([s, n]) => [n, s])
  )
), Zf = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, eh = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, Kt = (s) => typeof s == "object" && s !== null && !Array.isArray(s), be = (s, n = "") => typeof s != "string" ? n : s.trim() || n, Te = (s) => be(s) || null, hs = (s) => {
  const n = be(s);
  return n ? /^(https?:\/\/|\/)/i.test(n) ? n : `/${n.replace(/^\/+/, "")}` : null;
}, Sv = (s, n = !0) => typeof s == "boolean" ? s : n, kl = (s, n = 6) => Array.isArray(s) ? s.map((i) => be(typeof i == "string" ? i : i?.label || i?.title || i?.text)).filter(Boolean).slice(0, n) : [], th = (s) => {
  if (!Kt(s))
    return null;
  const n = be(s.title, "Untitled crystal"), i = hs(s.url);
  return {
    id: Te(s.id || s.productId),
    handle: Te(s.handle),
    title: n,
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
    available: Sv(s.available, !0)
  };
}, nh = (s, n = 6) => Array.isArray(s) ? s.map(th).filter(Boolean).slice(0, n) : [], wv = (s) => {
  if (!Kt(s))
    return null;
  const n = th(s.product || s);
  return n ? {
    eyebrow: be(s.eyebrow || s.kicker || s.intent, "Prescription"),
    reason: Te(s.reason || n.reason),
    note: Te(s.note || s.ritual || n.note),
    ctaLabel: be(s.ctaLabel || s.buttonLabel || n.ctaLabel, "View crystal"),
    product: n
  } : null;
}, xv = (s) => {
  if (!Kt(s))
    return null;
  const n = nh(s.products, 8);
  return n.length === 0 ? null : {
    eyebrow: be(s.eyebrow || s.kicker, "Matched for you"),
    title: be(s.title, "Recommended crystals"),
    reason: Te(s.reason || s.description),
    browseUrl: hs(s.browseUrl || s.url),
    browseLabel: be(s.browseLabel || s.ctaLabel, "Browse all"),
    products: n
  };
}, Ev = (s) => {
  if (!Kt(s))
    return null;
  const n = kl(s.steps, 6);
  return n.length === 0 && !be(s.summary) ? null : {
    eyebrow: be(s.eyebrow || s.kicker, "Ritual"),
    title: be(s.title, "How to work with this energy"),
    summary: Te(s.summary || s.reason || s.description),
    duration: Te(s.duration),
    steps: n,
    note: Te(s.note),
    disclaimer: Te(s.disclaimer),
    linkedProducts: nh(s.linkedProducts || s.products, 3)
  };
}, kv = (s) => {
  if (!Kt(s))
    return null;
  const n = be(s.summary || s.description);
  return n ? {
    eyebrow: be(s.eyebrow || s.kicker, "Energy blueprint"),
    title: be(s.title, "What your energy is asking for"),
    summary: n,
    energyFocus: Te(s.energyFocus || s.energy || s.focus),
    highlights: kl(s.highlights || s.bullets || s.keyPoints, 5),
    disclaimer: Te(s.disclaimer)
  } : null;
}, Cv = (s) => {
  if (!Kt(s))
    return null;
  const n = hs(s.url || s.browseUrl);
  return n ? {
    eyebrow: be(s.eyebrow || s.kicker, "Browse deeper"),
    title: be(s.title, "Open the full collection"),
    description: Te(s.description || s.reason),
    url: n,
    label: be(s.label || s.ctaLabel, "Shop collection"),
    image: hs(s.image || s.imageUrl)
  } : null;
}, Tv = (s) => {
  if (!Kt(s))
    return null;
  const n = kl(s.steps, 5);
  return n.length === 0 ? null : {
    eyebrow: be(s.eyebrow || s.kicker, "Next steps"),
    title: be(s.title, "What to do next"),
    steps: n,
    closing: Te(s.closing || s.note)
  };
}, bv = Object.freeze({
  [gt.product_card]: {
    toolName: ut.product_card,
    normalizeProps: wv
  },
  [gt.product_carousel]: {
    toolName: ut.product_carousel,
    normalizeProps: xv
  },
  [gt.ritual_card]: {
    toolName: ut.ritual_card,
    normalizeProps: Ev
  },
  [gt.reading_summary]: {
    toolName: ut.reading_summary,
    normalizeProps: kv
  },
  [gt.collection_link]: {
    toolName: ut.collection_link,
    normalizeProps: Cv
  },
  [gt.next_steps]: {
    toolName: ut.next_steps,
    normalizeProps: Tv
  }
}), ps = (s, n = "component") => {
  if (!Kt(s))
    return null;
  const i = be(
    s.component || s.componentType || _v[s.toolName]
  ), l = bv[i];
  if (!l)
    return null;
  const c = l.normalizeProps(
    s.props || s.result?.props || s.result || s.args?.props || s.args || s
  );
  if (!c)
    return null;
  const d = be(s.id || s.toolCallId, `${l.toolName}-${n}`);
  return {
    type: "component",
    component: i,
    toolName: l.toolName,
    id: d,
    version: vv,
    props: c
  };
}, fr = (s = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const l of [...s, ...n]) {
    const c = ps(l, i.size);
    if (!c)
      continue;
    const d = `${c.toolName}:${c.id}`;
    i.set(d, c);
  }
  return [...i.values()];
}, rh = (s) => {
  const n = [], i = (l, c = 0) => {
    if (c > 3 || l == null)
      return;
    if (Array.isArray(l)) {
      l.forEach((h, p) => {
        const m = ps(h, `${c}-${p}`);
        m && n.push(m);
      });
      return;
    }
    const d = ps(l, `${c}`);
    if (d) {
      n.push(d);
      return;
    }
    Kt(l) && (i(l.components, c + 1), i(l.component, c + 1), i(l.ui?.components, c + 1), i(l.payload?.components, c + 1), i(l.data?.components, c + 1), i(l.data?.ui?.components, c + 1), i(l.metadata?.components, c + 1), i(l.metadata?.ui?.components, c + 1));
  };
  return i(s), fr([], n);
}, Iv = (s, n = "component") => {
  const i = ps(s, n);
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
}, Rv = (s = []) => Array.isArray(s) ? s.map((n, i) => Iv(n, i)).filter(Boolean) : [], Mv = (s) => ps(s), Nv = (s) => {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}, Av = (s = "") => {
  let n = String(s || ""), i = [];
  const l = (c) => {
    const d = [...n.matchAll(c)];
    if (d.length !== 0) {
      for (const h of d) {
        const p = Nv(h[1]);
        p && (i = fr(i, rh(p)));
      }
      n = n.replace(c, "").trim();
    }
  };
  return l(Zf()), l(eh()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    components: i
  };
}, Pv = (s = "") => {
  const n = Zf(), i = eh();
  let l = String(s || "").replace(n, "").replace(i, "");
  const c = l.toLowerCase(), d = c.indexOf("```askcrystal-ui");
  d !== -1 && (l = l.slice(0, d));
  const h = c.indexOf("<askcrystal-ui>");
  return h !== -1 && (l = l.slice(0, h)), l.trimEnd();
}, jv = "section-rendering-askcrystal-chat-product-card", Ui = /* @__PURE__ */ new Map(), Ai = /* @__PURE__ */ new Map();
function On(s) {
  return Mv({
    toolName: s.toolName,
    result: s.result,
    args: s.args,
    toolCallId: s.toolCallId
  });
}
function Lv(s) {
  const n = typeof s == "string" ? s.trim() : "";
  if (!n)
    return null;
  if (/^\d+$/.test(n))
    return n;
  const i = n.match(/\/(\d+)(?:\?.*)?$/);
  return i ? i[1] : null;
}
function Ov(s) {
  const n = s?.url || (s?.handle ? `/products/${s.handle}` : null);
  if (!n || typeof window > "u")
    return null;
  const i = new URL(n, window.location.origin);
  i.searchParams.set("section_id", jv);
  const l = Lv(s?.variantId || s?.merchandiseId);
  return l && i.searchParams.set("variant", l), i.toString();
}
function zv(s) {
  return new DOMParser().parseFromString(s, "text/html").querySelector("[data-askcrystal-native-product-card]")?.outerHTML?.trim() || null;
}
async function Dv(s) {
  if (!s)
    throw new Error("Missing product card request URL");
  const n = Ui.get(s);
  if (n)
    return n;
  if (!Ai.has(s)) {
    const i = fetch(s, {
      headers: {
        accept: "text/html"
      },
      credentials: "same-origin"
    }).then(async (l) => {
      if (!l.ok)
        throw new Error(`Failed to load native product card (${l.status})`);
      const c = await l.text(), d = zv(c);
      if (!d)
        throw new Error("Native product card markup was not found in the section response");
      return Ui.set(s, d), d;
    }).finally(() => {
      Ai.delete(s);
    });
    Ai.set(s, i);
  }
  return Ai.get(s);
}
function mr({ eyebrow: s, title: n, children: i, className: l = "" }) {
  return /* @__PURE__ */ y.jsxs("section", { className: `ac-tool ${l}`.trim(), children: [
    /* @__PURE__ */ y.jsxs("header", { className: "ac-tool__header", children: [
      s ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__eyebrow", children: s }) : null,
      n ? /* @__PURE__ */ y.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function sh({ image: s, title: n, compact: i = !1 }) {
  return /* @__PURE__ */ y.jsx("div", { className: `ac-tool-product__media${i ? " ac-tool-product__media--compact" : ""}`, children: s ? /* @__PURE__ */ y.jsx("img", { src: s, alt: n, loading: "lazy" }) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-product__placeholder", children: "Crystal" }) });
}
function ih({ product: s, ctaLabel: n }) {
  return /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__meta", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__price-group", children: [
      s.price ? /* @__PURE__ */ y.jsx("span", { className: "ac-tool-product__price", children: s.price }) : null,
      s.compareAtPrice ? /* @__PURE__ */ y.jsx("span", { className: "ac-tool-product__compare", children: s.compareAtPrice }) : null
    ] }),
    /* @__PURE__ */ y.jsx("span", { className: "ac-tool-product__cta", children: n || "View crystal" })
  ] });
}
function Fv({ product: s, ctaLabel: n }) {
  const i = /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(sh, { image: s.image, title: s.title }),
    /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__body", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-product__heading", children: [
        s.badge ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__badge", children: s.badge }) : null,
        /* @__PURE__ */ y.jsx("h4", { className: "ac-tool-product__title", children: s.title })
      ] }),
      /* @__PURE__ */ y.jsx(ih, { product: s, ctaLabel: n })
    ] })
  ] });
  return s.url ? /* @__PURE__ */ y.jsx("a", { className: "ac-tool-product ac-tool-product--single", href: s.url, children: i }) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-product ac-tool-product--single", children: i });
}
function Bv({ product: s, ctaLabel: n }) {
  const i = Ov(s), [l, c] = b.useState(() => i && Ui.get(i) || null), [d, h] = b.useState(null);
  return b.useEffect(() => {
    let p = !0;
    if (!i)
      return b.startTransition(() => {
        c(null), h(new Error("Missing product card request URL"));
      }), () => {
        p = !1;
      };
    const m = Ui.get(i);
    return m ? (b.startTransition(() => {
      c(m), h(null);
    }), () => {
      p = !1;
    }) : (b.startTransition(() => {
      c(null), h(null);
    }), Dv(i).then((_) => {
      p && b.startTransition(() => {
        c(_), h(null);
      });
    }).catch((_) => {
      p && b.startTransition(() => {
        c(null), h(_);
      });
    }), () => {
      p = !1;
    });
  }, [i]), l ? /* @__PURE__ */ y.jsx(
    "div",
    {
      className: "ac-tool-product-native",
      dangerouslySetInnerHTML: { __html: l }
    }
  ) : d ? /* @__PURE__ */ y.jsx("div", { className: "ac-tool-product-native", children: /* @__PURE__ */ y.jsx(Fv, { product: s, ctaLabel: n }) }) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-product-native ac-tool-product-native--loading", "aria-busy": "true", "aria-live": "polite", children: /* @__PURE__ */ y.jsx("span", { className: "ac-tool-product-native__loading-label", children: "Loading product card..." }) });
}
function Uv(s) {
  const n = On(s);
  if (!n)
    return null;
  const {
    eyebrow: i,
    reason: l,
    note: c,
    ctaLabel: d,
    product: h
  } = n.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, className: "ac-tool--product-card", children: [
    l ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__reason", children: l }) : null,
    /* @__PURE__ */ y.jsx(Bv, { product: h, ctaLabel: d }),
    h.summary ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__summary", children: h.summary }) : null,
    c ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__note", children: c }) : null
  ] });
}
function $v(s) {
  const n = On(s);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: l,
    reason: c,
    browseUrl: d,
    browseLabel: h,
    products: p
  } = n.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--carousel", children: [
    c ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: c }) : null,
    /* @__PURE__ */ y.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": l, children: p.map((m, _) => {
      const E = /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
        /* @__PURE__ */ y.jsx(sh, { image: m.image, title: m.title, compact: !0 }),
        /* @__PURE__ */ y.jsxs("div", { className: "ac-tool-carousel__copy", children: [
          m.badge ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__badge", children: m.badge }) : null,
          /* @__PURE__ */ y.jsx("h4", { className: "ac-tool-product__title", children: m.title }),
          m.reason || m.summary ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool-product__summary", children: m.reason || m.summary }) : null,
          /* @__PURE__ */ y.jsx(ih, { product: m, ctaLabel: m.ctaLabel || "View" })
        ] })
      ] });
      return m.url ? /* @__PURE__ */ y.jsx("a", { className: "ac-tool-carousel__card", href: m.url, role: "listitem", children: E }, m.id || m.handle || _) : /* @__PURE__ */ y.jsx("div", { className: "ac-tool-carousel__card", role: "listitem", children: E }, m.id || m.handle || _);
    }) }),
    d ? /* @__PURE__ */ y.jsx("div", { className: "ac-tool__footer", children: /* @__PURE__ */ y.jsx("a", { className: "ac-tool__footer-link", href: d, children: h }) }) : null
  ] });
}
function Hv(s) {
  const n = On(s);
  if (!n)
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
  } = n.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--ritual", children: [
    c ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: c }) : null,
    d ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__detail", children: d }) : null,
    /* @__PURE__ */ y.jsx("ol", { className: "ac-ritual-steps", children: h.map((E) => /* @__PURE__ */ y.jsxs("li", { className: "ac-ritual-steps__item", children: [
      /* @__PURE__ */ y.jsx("span", { className: "ac-ritual-steps__dot", "aria-hidden": "true" }),
      /* @__PURE__ */ y.jsx("span", { children: E })
    ] }, E)) }),
    _.length > 0 ? /* @__PURE__ */ y.jsx("div", { className: "ac-tool-chip-row", role: "list", "aria-label": "Linked products", children: _.map((E, I) => E.url ? /* @__PURE__ */ y.jsx("a", { className: "ac-tool-chip", href: E.url, role: "listitem", children: E.title }, E.id || E.handle || I) : /* @__PURE__ */ y.jsx("span", { className: "ac-tool-chip", role: "listitem", children: E.title }, E.id || E.handle || I)) }) : null,
    p ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__note", children: p }) : null,
    m ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__disclaimer", children: m }) : null
  ] });
}
function Vv(s) {
  const n = On(s);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: l,
    summary: c,
    energyFocus: d,
    highlights: h,
    disclaimer: p
  } = n.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--summary", children: [
    d ? /* @__PURE__ */ y.jsx("p", { className: "ac-summary__focus", children: d }) : null,
    /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: c }),
    h.length > 0 ? /* @__PURE__ */ y.jsx("ul", { className: "ac-summary__list", children: h.map((m) => /* @__PURE__ */ y.jsx("li", { children: m }, m)) }) : null,
    p ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__disclaimer", children: p }) : null
  ] });
}
function Wv(s) {
  const n = On(s);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: l,
    description: c,
    url: d,
    label: h,
    image: p
  } = n.props, m = /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
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
function Qv(s) {
  const n = On(s);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: l,
    steps: c,
    closing: d
  } = n.props;
  return /* @__PURE__ */ y.jsxs(mr, { eyebrow: i, title: l, className: "ac-tool--next-steps", children: [
    /* @__PURE__ */ y.jsx("ul", { className: "ac-next-steps", children: c.map((h, p) => /* @__PURE__ */ y.jsxs("li", { className: "ac-next-steps__item", children: [
      /* @__PURE__ */ y.jsx("span", { className: "ac-next-steps__index", children: p + 1 }),
      /* @__PURE__ */ y.jsx("span", { children: h })
    ] }, h)) }),
    d ? /* @__PURE__ */ y.jsx("p", { className: "ac-tool__note", children: d }) : null
  ] });
}
function Yv(s) {
  const n = On(s);
  return n ? /* @__PURE__ */ y.jsx(mr, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ y.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function Gv({ children: s }) {
  return /* @__PURE__ */ y.jsx("div", { className: "ac-tool-group", children: s });
}
const Kv = {
  tools: {
    by_name: {
      [ut.product_card]: Uv,
      [ut.product_carousel]: $v,
      [ut.ritual_card]: Hv,
      [ut.reading_summary]: Vv,
      [ut.collection_link]: Wv,
      [ut.next_steps]: Qv
    },
    Fallback: Yv
  },
  ToolGroup: Gv
}, oh = "[data-askcrystal-homepage-root]", $i = /* @__PURE__ */ new Map(), tl = "askcrystal-main-thread", Jv = "http://localhost:8787", Xd = "askcrystal-theme-session-id";
let Zd = 0;
const qv = 7;
function Xv(s) {
  const n = document.getElementById(s);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function Ji(s = []) {
  return s.map((n) => n.type === "text" || n.type === "reasoning" ? n.text : "").join(" ").trim();
}
function nl(s) {
  const n = s?.answer || s?.delta || s?.text || s?.message || s?.reply || s?.output || s?.data?.answer || s?.data?.text;
  return typeof n == "string" ? n : "";
}
function Zv(s) {
  return /^(https?:\/\/|mailto:|\/)/i.test(s);
}
function Pn(s, n = "inline") {
  const i = [], l = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let c = 0, d, h = 0;
  for (; (d = l.exec(s)) !== null; ) {
    d.index > c && i.push(s.slice(c, d.index));
    const p = `${n}-${h}`;
    if (d[2] && d[3]) {
      const m = d[3].trim();
      i.push(
        Zv(m) ? /* @__PURE__ */ y.jsx("a", { href: m, target: m.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ y.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ y.jsx("strong", { children: Pn(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ y.jsx("em", { children: Pn(d[6], `${p}-em`) }, p));
    c = l.lastIndex, h += 1;
  }
  return c < s.length && i.push(s.slice(c)), i;
}
function e_({ text: s = "" }) {
  const n = String(s).replace(/\r\n/g, `
`).split(`
`), i = [];
  let l = 0;
  for (; l < n.length; ) {
    const c = n[l];
    if (!c.trim()) {
      l += 1;
      continue;
    }
    if (c.match(/^```(\w+)?\s*$/)) {
      const _ = [];
      for (l += 1; l < n.length && !/^```\s*$/.test(n[l]); )
        _.push(n[l]), l += 1;
      l < n.length && (l += 1), i.push(
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
      for (; l < n.length && /^\s*[-*]\s+/.test(n[l]); )
        _.push(n[l].replace(/^\s*[-*]\s+/, "")), l += 1;
      i.push(
        /* @__PURE__ */ y.jsx("ul", { children: _.map((E, I) => /* @__PURE__ */ y.jsx("li", { children: Pn(E, `ul-${l}-${I}`) }, `ul-${l}-${I}`)) }, `ul-${l}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(c)) {
      const _ = [];
      for (; l < n.length && /^\s*\d+\.\s+/.test(n[l]); )
        _.push(n[l].replace(/^\s*\d+\.\s+/, "")), l += 1;
      i.push(
        /* @__PURE__ */ y.jsx("ol", { children: _.map((E, I) => /* @__PURE__ */ y.jsx("li", { children: Pn(E, `ol-${l}-${I}`) }, `ol-${l}-${I}`)) }, `ol-${l}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(c)) {
      const _ = [];
      for (; l < n.length && /^\s*>\s?/.test(n[l]); )
        _.push(n[l].replace(/^\s*>\s?/, "")), l += 1;
      i.push(
        /* @__PURE__ */ y.jsx("blockquote", { children: _.map((E, I) => /* @__PURE__ */ y.jsx("p", { children: Pn(E, `quote-${l}-${I}`) }, `quote-${l}-${I}`)) }, `quote-${l}`)
      );
      continue;
    }
    const p = [];
    for (; l < n.length && n[l].trim() && !/^```/.test(n[l]) && !/^(#{1,3})\s+/.test(n[l]) && !/^\s*[-*]\s+/.test(n[l]) && !/^\s*\d+\.\s+/.test(n[l]) && !/^\s*>\s?/.test(n[l]); )
      p.push(n[l].trim()), l += 1;
    const m = p.join(" ");
    i.push(
      /* @__PURE__ */ y.jsx("p", { children: Pn(m, `p-${l}`) }, `p-${l}`)
    );
  }
  return /* @__PURE__ */ y.jsx("div", { className: "ac-markdown", children: i });
}
function t_({ statusText: s }) {
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
function n_({ statusText: s }) {
  return s ? /* @__PURE__ */ y.jsxs("div", { className: "ac-live-status", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ y.jsx("span", { className: "ac-live-status__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ y.jsx("span", { className: "ac-live-status__text", children: s })
  ] }) : null;
}
function r_(s) {
  return s ? typeof s == "string" ? {
    stage: "",
    tool: "",
    message: s,
    taskId: ""
  } : {
    stage: typeof s.stage == "string" ? s.stage : "",
    tool: typeof s.tool == "string" ? s.tool : "",
    message: typeof s.message == "string" ? s.message : "",
    taskId: al(s)
  } : {
    stage: "",
    tool: "",
    message: "",
    taskId: ""
  };
}
function ah(s) {
  for (let n = s.length - 1; n >= 0; n -= 1) {
    const i = s[n];
    if (i.role === "user")
      return Ji(i.content);
  }
  return "";
}
function rl(s, n) {
  return s.find((i) => n(i));
}
function s_({ matchedIntention: s, fallbackProduct: n, products: i }) {
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
function i_(s, n) {
  const i = s.toLowerCase(), c = [
    {
      key: "calm",
      test: /sleep|rest|anxious|stress|calm|ground|peace/,
      lead: "I would start by softening the energy around your nervous system before recommending anything too activating.",
      product: rl(n, (m) => /amethyst|selenite|moonstone|calm|sleep/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
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
      product: rl(n, (m) => /rose|heart|love|pink/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
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
      product: rl(n, (m) => /citrine|pyrite|tiger|success|abundance/i.test(`${m.title} ${m.summary || ""}`)) || n[0],
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
  ].find((m) => m.test.test(i)), d = n[0], h = s_({
    matchedIntention: c,
    fallbackProduct: d,
    products: n
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
function o_(s) {
  const n = typeof s == "string" ? s.trim() : "";
  if (!n) return "";
  if (!/<\/?(minimax:tool_call|invoke|action_input|parameter)\b/i.test(n))
    return n;
  const l = n.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/<\/?[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
  return l && !/\b(search|browse|checking|catalog)\b/i.test(l) ? l : [
    "I tried to check the shelf for you, but the live catalog result was not available in this moment.",
    "For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”",
    "If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely."
  ].join(`

`);
}
function ef(s, n = []) {
  const i = Av(s), l = fr(n, i.components), c = o_(i.answer);
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
function ur({ text: s = "", components: n = [] } = {}) {
  const i = [], l = Pv(s).trim();
  return l && i.push({
    type: "text",
    text: l
  }), i.push(...Rv(n)), i;
}
function a_(s) {
  return /^https?:\/\//i.test(s);
}
function Hi(s) {
  return s ? a_(s) ? s : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && s.startsWith("/apps/") ? `${Jv}${s}` : s : "";
}
function l_(s) {
  return s ? s.endsWith("/stream") ? Hi(s) : Hi(`${s.replace(/\/$/, "")}/stream`) : "";
}
function u_(s) {
  return s ? s.endsWith("/stop") ? Hi(s) : Hi(`${s.replace(/\/$/, "")}/stop`) : "";
}
function c_() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  try {
    const s = window.localStorage.getItem(Xd);
    if (s) return s;
    const n = ms("session");
    return window.localStorage.setItem(Xd, n), n;
  } catch {
    return ms("session");
  }
}
function d_(s) {
  const n = [];
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
function al(s) {
  const n = s?.taskId || s?.task_id || s?.data?.taskId || s?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function f_() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const s = new Error("The operation was aborted.");
  return s.name = "AbortError", s;
}
function Qt(s) {
  if (s?.aborted)
    throw f_();
}
async function h_({ apiEndpoint: s, taskId: n, sessionId: i, conversationId: l }) {
  if (!(!s || !n))
    try {
      await fetch(u_(s), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskId: n,
          sessionId: i,
          conversationId: l
        }),
        keepalive: !0
      });
    } catch (c) {
      console.error("[AskCrystal] Stop request failed.", c);
    }
}
async function p_({ apiEndpoint: s, messages: n, abortSignal: i, conversationId: l, sessionId: c, onStatus: d, onDelta: h, onComponents: p }) {
  Qt(i);
  const m = await fetch(l_(s), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: ah(n),
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
  let I = "", C = "", R = [], z = l || null;
  for (; ; ) {
    Qt(i);
    const { done: H, value: G } = await _.read();
    if (H) break;
    Qt(i), I += E.decode(G, { stream: !0 });
    const se = d_(I);
    I = se.remaining;
    for (const Q of se.events) {
      if (Qt(i), Q.event === "status" && typeof Q.payload?.message == "string" && (Qt(i), d?.(Q.payload)), Q.event === "error")
        throw new Error(Q.payload?.error || Q.payload?.message || "The proxy stream failed.");
      const J = rh(Q.payload);
      if (J.length && (Qt(i), R = fr(R, J), p?.(R, J, Q.payload), z = Q.payload?.conversationId || Q.payload?.conversation_id || z), Q.event === "replace") {
        Qt(i);
        const X = nl(Q.payload);
        X && (C = X, h?.("", C, Q.payload)), z = Q.payload?.conversationId || Q.payload?.conversation_id || z;
      }
      if (["delta", "message", "agent_message"].includes(Q.event)) {
        Qt(i);
        const X = nl(Q.payload);
        X && (C += X, h?.(X, C, Q.payload)), z = Q.payload?.conversationId || Q.payload?.conversation_id || z;
      }
      if (Q.event === "complete") {
        Qt(i);
        const Ee = nl(Q.payload) || C, ne = ef(Ee, R);
        return {
          answer: ne.answer,
          components: ne.components,
          conversationId: Q.payload?.conversationId || Q.payload?.conversation_id || z || null
        };
      }
    }
  }
  if (C) {
    const H = ef(C, R);
    return {
      answer: H.answer,
      components: H.components,
      conversationId: z
    };
  }
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function ms(s = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${s}-${crypto.randomUUID()}` : (Zd += 1, `${s}-${Date.now()}-${Zd}`);
}
function m_(s) {
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
function Nn({
  id: s = ms("assistant"),
  text: n = "",
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
    content: Array.isArray(i) ? i : ur({ text: n, components: l }),
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
function ll({ id: s, text: n = "", components: i = [] }) {
  const c = !!(typeof n == "string" ? n.trim() : "") || i.length > 0;
  return Nn({
    id: s,
    parts: ur({
      text: c ? n : "Reply stopped.",
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
function g_(s, n) {
  if (!Array.isArray(s) || !n || s.length === 0)
    return Array.isArray(s) ? [...s] : [];
  const i = [...s], l = i[i.length - 1];
  return l?.role === "assistant" && l?.status?.type === "running" && (i[i.length - 1] = ll({
    id: l.id,
    text: Ji(l.content || l.parts || []),
    components: l.metadata?.unstable_data || []
  })), i;
}
async function y_({ config: s, messages: n, abortSignal: i, conversationId: l, sessionId: c, onStatus: d, onDelta: h, onComponents: p }) {
  const m = ah(n);
  if (s.runtimeMode === "proxy" && s.apiEndpoint)
    try {
      return await p_({
        apiEndpoint: s.apiEndpoint,
        messages: n,
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
  const _ = i_(m, s.products);
  return {
    answer: _.answer,
    components: _.components || [],
    conversationId: l
  };
}
function v_(s) {
  const [n, i] = b.useState([]), [l, c] = b.useState(!1), d = b.useRef(null), h = b.useRef(""), p = b.useRef(""), m = b.useRef(!1), _ = b.useRef(null), E = b.useRef(n), I = b.useRef(c_());
  b.useEffect(() => {
    E.current = n;
  }, [n]);
  const C = b.useCallback((se) => {
    i(g_(se, m.current));
  }, []), R = b.useCallback((se, Q) => {
    i(
      (J) => J.map((X) => X.id !== se ? X : Q(X))
    );
  }, []), z = b.useCallback(async () => {
    const se = d.current, Q = h.current, J = p.current, X = _.current, Ee = I.current;
    se?.abort(), m.current = !0, c(!1), Q && R(
      Q,
      (ne) => ll({
        id: ne.id,
        text: Ji(ne.content || []),
        components: ne.metadata?.unstable_data || []
      })
    ), !(!J || !s.apiEndpoint) && await h_({
      apiEndpoint: s.apiEndpoint,
      taskId: J,
      sessionId: Ee,
      conversationId: X
    });
  }, [s.apiEndpoint, R]), H = b.useCallback(
    async (se) => {
      if (se.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      const Q = m_(se), J = ms("assistant"), X = new AbortController(), Ee = Nn({
        id: J,
        status: {
          type: "running"
        },
        statusText: "Tuning in...",
        statusStage: "listen"
      }), ne = [...E.current, Q];
      d.current = X, h.current = J, p.current = "", m.current = !1, c(!0), i([...ne, Ee]);
      let ue = "", q = [];
      try {
        const fe = await y_({
          config: s,
          messages: ne,
          abortSignal: X.signal,
          conversationId: _.current,
          sessionId: I.current,
          onStatus: (Ae) => {
            if (X.signal.aborted) return;
            const Ie = r_(Ae);
            Ie.taskId && (p.current = Ie.taskId), R(
              J,
              () => Nn({
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
            const Pe = al(Je);
            Pe && (p.current = Pe), ue = Ie, R(
              J,
              () => Nn({
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
            const Pe = al(Je);
            Pe && (p.current = Pe), q = Ae, R(
              J,
              () => Nn({
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
          Nn({
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
            ll({
              id: J,
              text: ue,
              components: q
            })
          ]);
          return;
        }
        console.error("[AskCrystal] Assistant runtime failed.", fe), p.current = "", m.current = !1, i([
          ...ne,
          Nn({
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
  ), G = b.useMemo(
    () => ({
      messages: n,
      isRunning: l,
      setMessages: C,
      onImport: C,
      onNew: H,
      onCancel: z,
      adapters: {
        threadList: {
          threadId: tl,
          threads: [
            {
              id: tl,
              remoteId: tl,
              title: "AskCrystal"
            }
          ]
        }
      }
    }),
    [l, n, z, H, C]
  );
  return ag(G);
}
function __({ product: s }) {
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
function S_({ config: s }) {
  const n = s.suggestions.filter(Boolean);
  return /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__welcome", children: [
    /* @__PURE__ */ y.jsxs("section", { className: "ac-homepage__intro", children: [
      /* @__PURE__ */ y.jsx("p", { className: "ac-homepage__eyebrow", children: s.eyebrow }),
      /* @__PURE__ */ y.jsx("h1", { children: s.heading }),
      /* @__PURE__ */ y.jsx("p", { className: "ac-homepage__description", children: s.description }),
      /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__suggestions", role: "list", "aria-label": "Suggested prompts", children: n.map((i) => /* @__PURE__ */ y.jsx(
        yv,
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
      s.products.length ? /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: s.products.map((i) => /* @__PURE__ */ y.jsx(__, { product: i }, i.id)) }) : /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
    ] })
  ] });
}
function w_() {
  const s = b.useRef(null), [n, i] = b.useState(!1), l = b.useCallback(() => {
    const c = s.current;
    if (!c) {
      i(!1);
      return;
    }
    const d = c.scrollHeight > c.clientHeight + 2;
    i((h) => h === d ? h : d);
  }, []);
  return b.useEffect(() => {
    const c = window.requestAnimationFrame(l);
    return () => window.cancelAnimationFrame(c);
  }, [l]), /* @__PURE__ */ y.jsx(Vf, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ y.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ y.jsx(
          Qf,
          {
            ref: s,
            className: "ac-homepage__composer-input",
            placeholder: "What guidance or crystal do you need today?",
            minRows: 1,
            maxRows: qv,
            autoFocus: !1,
            onChange: () => {
              window.requestAnimationFrame(l);
            },
            onHeightChange: () => {
              window.requestAnimationFrame(l);
            }
          }
        ),
        /* @__PURE__ */ y.jsxs("div", { className: "ac-homepage__composer-actions", children: [
          /* @__PURE__ */ y.jsx(ol, { running: !1, children: /* @__PURE__ */ y.jsx($y, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ y.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ y.jsx(ol, { running: !0, children: /* @__PURE__ */ y.jsx(av, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function x_() {
  return typeof document > "u" ? null : mm.createPortal(
    /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ y.jsx(w_, {}) }),
    document.body
  );
}
function E_() {
  return /* @__PURE__ */ y.jsx(wl, { className: "ac-message ac-message--user", children: /* @__PURE__ */ y.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ y.jsx(xl, {}) }) });
}
function k_() {
  const s = Ni((m) => m.content || m.parts || []), n = Ji(s), i = s.some((m) => m.type === "tool-call"), l = Ni((m) => m.status?.type === "running"), c = Ni((m) => m.metadata?.custom?.statusText || ""), d = Ni((m) => m.metadata?.custom?.statusStage || ""), h = l && !n && !i, p = l && (!!n || i) && d === "tool" && !!c;
  return /* @__PURE__ */ y.jsxs(wl, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ y.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ y.jsx("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: h ? /* @__PURE__ */ y.jsx(t_, { statusText: c }) : /* @__PURE__ */ y.jsx(
      xl,
      {
        components: {
          Text: ({ text: m }) => /* @__PURE__ */ y.jsx(e_, { text: m }),
          ...Kv
        }
      }
    ) }),
    p ? /* @__PURE__ */ y.jsx("div", { className: "ac-message__status", children: /* @__PURE__ */ y.jsx(n_, { statusText: c }) }) : null,
    /* @__PURE__ */ y.jsx($f, { children: /* @__PURE__ */ y.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function C_({ config: s }) {
  const n = v_(s);
  return /* @__PURE__ */ y.jsx(ay, { runtime: n, children: /* @__PURE__ */ y.jsx("div", { className: "ac-homepage", children: /* @__PURE__ */ y.jsx(Yf, { className: "ac-homepage__thread", children: /* @__PURE__ */ y.jsxs(Kf, { className: "ac-homepage__viewport", children: [
    /* @__PURE__ */ y.jsx(S_, { config: s }),
    /* @__PURE__ */ y.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ y.jsx(
      mv,
      {
        components: {
          UserMessage: E_,
          AssistantMessage: k_
        }
      }
    ) }),
    /* @__PURE__ */ y.jsx(x_, {})
  ] }) }) }) });
}
function T_(s) {
  const n = s.getAttribute("data-config-id"), i = s.getAttribute("data-section-id") || n;
  if (!n || $i.has(i)) return;
  const l = Xv(n);
  if (!l) return;
  const c = pm.createRoot(s);
  c.render(/* @__PURE__ */ y.jsx(C_, { config: l })), $i.set(i, c);
}
function b_(s) {
  const n = s.getAttribute("data-section-id");
  if (!n) return;
  const i = $i.get(n);
  i && (i.unmount(), $i.delete(n));
}
function lh(s = document) {
  s.querySelectorAll(oh).forEach((n) => T_(n));
}
function I_(s) {
  s.querySelectorAll(oh).forEach((n) => b_(n));
}
lh();
document.addEventListener("shopify:section:load", (s) => {
  lh(s.target);
});
document.addEventListener("shopify:section:unload", (s) => {
  I_(s.target);
});
