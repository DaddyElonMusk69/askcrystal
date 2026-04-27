function Hm(r, n) {
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
function bf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Za = { exports: {} }, is = {}, el = { exports: {} }, oe = {};
var Ad;
function Vm() {
  if (Ad) return oe;
  Ad = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), h = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), w = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function v(E) {
    return E === null || typeof E != "object" ? null : (E = b && E[b] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var R = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, j = Object.assign, N = {};
  function U(E, A, te) {
    this.props = E, this.context = A, this.refs = N, this.updater = te || R;
  }
  U.prototype.isReactComponent = {}, U.prototype.setState = function(E, A) {
    if (typeof E != "object" && typeof E != "function" && E != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, E, A, "setState");
  }, U.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = U.prototype;
  function ae(E, A, te) {
    this.props = E, this.context = A, this.refs = N, this.updater = te || R;
  }
  var ee = ae.prototype = new Y();
  ee.constructor = ae, j(ee, U.prototype), ee.isPureReactComponent = !0;
  var le = Array.isArray, Q = Object.prototype.hasOwnProperty, de = { current: null }, ue = { key: !0, ref: !0, __self: !0, __source: !0 };
  function J(E, A, te) {
    var se, X = {}, ce = null, ge = null;
    if (A != null) for (se in A.ref !== void 0 && (ge = A.ref), A.key !== void 0 && (ce = "" + A.key), A) Q.call(A, se) && !ue.hasOwnProperty(se) && (X[se] = A[se]);
    var ie = arguments.length - 2;
    if (ie === 1) X.children = te;
    else if (1 < ie) {
      for (var ne = Array(ie), ze = 0; ze < ie; ze++) ne[ze] = arguments[ze + 2];
      X.children = ne;
    }
    if (E && E.defaultProps) for (se in ie = E.defaultProps, ie) X[se] === void 0 && (X[se] = ie[se]);
    return { $$typeof: r, type: E, key: ce, ref: ge, props: X, _owner: de.current };
  }
  function ye(E, A) {
    return { $$typeof: r, type: E.type, key: A, ref: E.ref, props: E.props, _owner: E._owner };
  }
  function Le(E) {
    return typeof E == "object" && E !== null && E.$$typeof === r;
  }
  function Ce(E) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(te) {
      return A[te];
    });
  }
  var Xe = /\/+/g;
  function Oe(E, A) {
    return typeof E == "object" && E !== null && E.key != null ? Ce("" + E.key) : A.toString(36);
  }
  function it(E, A, te, se, X) {
    var ce = typeof E;
    (ce === "undefined" || ce === "boolean") && (E = null);
    var ge = !1;
    if (E === null) ge = !0;
    else switch (ce) {
      case "string":
      case "number":
        ge = !0;
        break;
      case "object":
        switch (E.$$typeof) {
          case r:
          case n:
            ge = !0;
        }
    }
    if (ge) return ge = E, X = X(ge), E = se === "" ? "." + Oe(ge, 0) : se, le(X) ? (te = "", E != null && (te = E.replace(Xe, "$&/") + "/"), it(X, A, te, "", function(ze) {
      return ze;
    })) : X != null && (Le(X) && (X = ye(X, te + (!X.key || ge && ge.key === X.key ? "" : ("" + X.key).replace(Xe, "$&/") + "/") + E)), A.push(X)), 1;
    if (ge = 0, se = se === "" ? "." : se + ":", le(E)) for (var ie = 0; ie < E.length; ie++) {
      ce = E[ie];
      var ne = se + Oe(ce, ie);
      ge += it(ce, A, te, ne, X);
    }
    else if (ne = v(E), typeof ne == "function") for (E = ne.call(E), ie = 0; !(ce = E.next()).done; ) ce = ce.value, ne = se + Oe(ce, ie++), ge += it(ce, A, te, ne, X);
    else if (ce === "object") throw A = String(E), Error("Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead.");
    return ge;
  }
  function dt(E, A, te) {
    if (E == null) return E;
    var se = [], X = 0;
    return it(E, se, "", "", function(ce) {
      return A.call(te, ce, X++);
    }), se;
  }
  function K(E) {
    if (E._status === -1) {
      var A = E._result;
      A = A(), A.then(function(te) {
        (E._status === 0 || E._status === -1) && (E._status = 1, E._result = te);
      }, function(te) {
        (E._status === 0 || E._status === -1) && (E._status = 2, E._result = te);
      }), E._status === -1 && (E._status = 0, E._result = A);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var re = { current: null }, O = { transition: null }, B = { ReactCurrentDispatcher: re, ReactCurrentBatchConfig: O, ReactCurrentOwner: de };
  function F() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return oe.Children = { map: dt, forEach: function(E, A, te) {
    dt(E, function() {
      A.apply(this, arguments);
    }, te);
  }, count: function(E) {
    var A = 0;
    return dt(E, function() {
      A++;
    }), A;
  }, toArray: function(E) {
    return dt(E, function(A) {
      return A;
    }) || [];
  }, only: function(E) {
    if (!Le(E)) throw Error("React.Children.only expected to receive a single React element child.");
    return E;
  } }, oe.Component = U, oe.Fragment = i, oe.Profiler = u, oe.PureComponent = ae, oe.StrictMode = a, oe.Suspense = m, oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = B, oe.act = F, oe.cloneElement = function(E, A, te) {
    if (E == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + E + ".");
    var se = j({}, E.props), X = E.key, ce = E.ref, ge = E._owner;
    if (A != null) {
      if (A.ref !== void 0 && (ce = A.ref, ge = de.current), A.key !== void 0 && (X = "" + A.key), E.type && E.type.defaultProps) var ie = E.type.defaultProps;
      for (ne in A) Q.call(A, ne) && !ue.hasOwnProperty(ne) && (se[ne] = A[ne] === void 0 && ie !== void 0 ? ie[ne] : A[ne]);
    }
    var ne = arguments.length - 2;
    if (ne === 1) se.children = te;
    else if (1 < ne) {
      ie = Array(ne);
      for (var ze = 0; ze < ne; ze++) ie[ze] = arguments[ze + 2];
      se.children = ie;
    }
    return { $$typeof: r, type: E.type, key: X, ref: ce, props: se, _owner: ge };
  }, oe.createContext = function(E) {
    return E = { $$typeof: h, _currentValue: E, _currentValue2: E, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, E.Provider = { $$typeof: d, _context: E }, E.Consumer = E;
  }, oe.createElement = J, oe.createFactory = function(E) {
    var A = J.bind(null, E);
    return A.type = E, A;
  }, oe.createRef = function() {
    return { current: null };
  }, oe.forwardRef = function(E) {
    return { $$typeof: p, render: E };
  }, oe.isValidElement = Le, oe.lazy = function(E) {
    return { $$typeof: w, _payload: { _status: -1, _result: E }, _init: K };
  }, oe.memo = function(E, A) {
    return { $$typeof: _, type: E, compare: A === void 0 ? null : A };
  }, oe.startTransition = function(E) {
    var A = O.transition;
    O.transition = {};
    try {
      E();
    } finally {
      O.transition = A;
    }
  }, oe.unstable_act = F, oe.useCallback = function(E, A) {
    return re.current.useCallback(E, A);
  }, oe.useContext = function(E) {
    return re.current.useContext(E);
  }, oe.useDebugValue = function() {
  }, oe.useDeferredValue = function(E) {
    return re.current.useDeferredValue(E);
  }, oe.useEffect = function(E, A) {
    return re.current.useEffect(E, A);
  }, oe.useId = function() {
    return re.current.useId();
  }, oe.useImperativeHandle = function(E, A, te) {
    return re.current.useImperativeHandle(E, A, te);
  }, oe.useInsertionEffect = function(E, A) {
    return re.current.useInsertionEffect(E, A);
  }, oe.useLayoutEffect = function(E, A) {
    return re.current.useLayoutEffect(E, A);
  }, oe.useMemo = function(E, A) {
    return re.current.useMemo(E, A);
  }, oe.useReducer = function(E, A, te) {
    return re.current.useReducer(E, A, te);
  }, oe.useRef = function(E) {
    return re.current.useRef(E);
  }, oe.useState = function(E) {
    return re.current.useState(E);
  }, oe.useSyncExternalStore = function(E, A, te) {
    return re.current.useSyncExternalStore(E, A, te);
  }, oe.useTransition = function() {
    return re.current.useTransition();
  }, oe.version = "18.3.1", oe;
}
var Md;
function _l() {
  return Md || (Md = 1, el.exports = Vm()), el.exports;
}
var Nd;
function Wm() {
  if (Nd) return is;
  Nd = 1;
  var r = _l(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(p, m, _) {
    var w, b = {}, v = null, R = null;
    _ !== void 0 && (v = "" + _), m.key !== void 0 && (v = "" + m.key), m.ref !== void 0 && (R = m.ref);
    for (w in m) a.call(m, w) && !d.hasOwnProperty(w) && (b[w] = m[w]);
    if (p && p.defaultProps) for (w in m = p.defaultProps, m) b[w] === void 0 && (b[w] = m[w]);
    return { $$typeof: n, type: p, key: v, ref: R, props: b, _owner: u.current };
  }
  return is.Fragment = i, is.jsx = h, is.jsxs = h, is;
}
var Pd;
function Ym() {
  return Pd || (Pd = 1, Za.exports = Wm()), Za.exports;
}
var g = Ym(), k = _l();
const Tt = /* @__PURE__ */ bf(k), Qm = /* @__PURE__ */ Hm({
  __proto__: null,
  default: Tt
}, [k]);
var Pi = {}, tl = { exports: {} }, st = {}, nl = { exports: {} }, rl = {};
var jd;
function Gm() {
  return jd || (jd = 1, (function(r) {
    function n(O, B) {
      var F = O.length;
      O.push(B);
      e: for (; 0 < F; ) {
        var E = F - 1 >>> 1, A = O[E];
        if (0 < u(A, B)) O[E] = B, O[F] = A, F = E;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function a(O) {
      if (O.length === 0) return null;
      var B = O[0], F = O.pop();
      if (F !== B) {
        O[0] = F;
        e: for (var E = 0, A = O.length, te = A >>> 1; E < te; ) {
          var se = 2 * (E + 1) - 1, X = O[se], ce = se + 1, ge = O[ce];
          if (0 > u(X, F)) ce < A && 0 > u(ge, X) ? (O[E] = ge, O[ce] = F, E = ce) : (O[E] = X, O[se] = F, E = se);
          else if (ce < A && 0 > u(ge, F)) O[E] = ge, O[ce] = F, E = ce;
          else break e;
        }
      }
      return B;
    }
    function u(O, B) {
      var F = O.sortIndex - B.sortIndex;
      return F !== 0 ? F : O.id - B.id;
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
    var m = [], _ = [], w = 1, b = null, v = 3, R = !1, j = !1, N = !1, U = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, ae = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ee(O) {
      for (var B = i(_); B !== null; ) {
        if (B.callback === null) a(_);
        else if (B.startTime <= O) a(_), B.sortIndex = B.expirationTime, n(m, B);
        else break;
        B = i(_);
      }
    }
    function le(O) {
      if (N = !1, ee(O), !j) if (i(m) !== null) j = !0, K(Q);
      else {
        var B = i(_);
        B !== null && re(le, B.startTime - O);
      }
    }
    function Q(O, B) {
      j = !1, N && (N = !1, Y(J), J = -1), R = !0;
      var F = v;
      try {
        for (ee(B), b = i(m); b !== null && (!(b.expirationTime > B) || O && !Ce()); ) {
          var E = b.callback;
          if (typeof E == "function") {
            b.callback = null, v = b.priorityLevel;
            var A = E(b.expirationTime <= B);
            B = r.unstable_now(), typeof A == "function" ? b.callback = A : b === i(m) && a(m), ee(B);
          } else a(m);
          b = i(m);
        }
        if (b !== null) var te = !0;
        else {
          var se = i(_);
          se !== null && re(le, se.startTime - B), te = !1;
        }
        return te;
      } finally {
        b = null, v = F, R = !1;
      }
    }
    var de = !1, ue = null, J = -1, ye = 5, Le = -1;
    function Ce() {
      return !(r.unstable_now() - Le < ye);
    }
    function Xe() {
      if (ue !== null) {
        var O = r.unstable_now();
        Le = O;
        var B = !0;
        try {
          B = ue(!0, O);
        } finally {
          B ? Oe() : (de = !1, ue = null);
        }
      } else de = !1;
    }
    var Oe;
    if (typeof ae == "function") Oe = function() {
      ae(Xe);
    };
    else if (typeof MessageChannel < "u") {
      var it = new MessageChannel(), dt = it.port2;
      it.port1.onmessage = Xe, Oe = function() {
        dt.postMessage(null);
      };
    } else Oe = function() {
      U(Xe, 0);
    };
    function K(O) {
      ue = O, de || (de = !0, Oe());
    }
    function re(O, B) {
      J = U(function() {
        O(r.unstable_now());
      }, B);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, r.unstable_continueExecution = function() {
      j || R || (j = !0, K(Q));
    }, r.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ye = 0 < O ? Math.floor(1e3 / O) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(m);
    }, r.unstable_next = function(O) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = v;
      }
      var F = v;
      v = B;
      try {
        return O();
      } finally {
        v = F;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(O, B) {
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
      var F = v;
      v = O;
      try {
        return B();
      } finally {
        v = F;
      }
    }, r.unstable_scheduleCallback = function(O, B, F) {
      var E = r.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? E + F : E) : F = E, O) {
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
      return A = F + A, O = { id: w++, callback: B, priorityLevel: O, startTime: F, expirationTime: A, sortIndex: -1 }, F > E ? (O.sortIndex = F, n(_, O), i(m) === null && O === i(_) && (N ? (Y(J), J = -1) : N = !0, re(le, F - E))) : (O.sortIndex = A, n(m, O), j || R || (j = !0, K(Q))), O;
    }, r.unstable_shouldYield = Ce, r.unstable_wrapCallback = function(O) {
      var B = v;
      return function() {
        var F = v;
        v = B;
        try {
          return O.apply(this, arguments);
        } finally {
          v = F;
        }
      };
    };
  })(rl)), rl;
}
var Ld;
function qm() {
  return Ld || (Ld = 1, nl.exports = Gm()), nl.exports;
}
var Od;
function Km() {
  if (Od) return st;
  Od = 1;
  var r = _l(), n = qm();
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
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, _ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, w = {}, b = {};
  function v(e) {
    return m.call(b, e) ? !0 : m.call(w, e) ? !1 : _.test(e) ? b[e] = !0 : (w[e] = !0, !1);
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
  function j(e, t, s, o) {
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
  var Y = /[\-:]([a-z])/g;
  function ae(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Y,
      ae
    );
    U[t] = new N(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Y, ae);
    U[t] = new N(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Y, ae);
    U[t] = new N(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    U[e] = new N(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), U.xlinkHref = new N("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    U[e] = new N(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function ee(e, t, s, o) {
    var l = U.hasOwnProperty(t) ? U[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (j(t, s, l, o) && (s = null), o || l === null ? v(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var le = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Q = /* @__PURE__ */ Symbol.for("react.element"), de = /* @__PURE__ */ Symbol.for("react.portal"), ue = /* @__PURE__ */ Symbol.for("react.fragment"), J = /* @__PURE__ */ Symbol.for("react.strict_mode"), ye = /* @__PURE__ */ Symbol.for("react.profiler"), Le = /* @__PURE__ */ Symbol.for("react.provider"), Ce = /* @__PURE__ */ Symbol.for("react.context"), Xe = /* @__PURE__ */ Symbol.for("react.forward_ref"), Oe = /* @__PURE__ */ Symbol.for("react.suspense"), it = /* @__PURE__ */ Symbol.for("react.suspense_list"), dt = /* @__PURE__ */ Symbol.for("react.memo"), K = /* @__PURE__ */ Symbol.for("react.lazy"), re = /* @__PURE__ */ Symbol.for("react.offscreen"), O = Symbol.iterator;
  function B(e) {
    return e === null || typeof e != "object" ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var F = Object.assign, E;
  function A(e) {
    if (E === void 0) try {
      throw Error();
    } catch (s) {
      var t = s.stack.trim().match(/\n( *(at )?)/);
      E = t && t[1] || "";
    }
    return `
` + E + e;
  }
  var te = !1;
  function se(e, t) {
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
`), f = l.length - 1, y = c.length - 1; 1 <= f && 0 <= y && l[f] !== c[y]; ) y--;
        for (; 1 <= f && 0 <= y; f--, y--) if (l[f] !== c[y]) {
          if (f !== 1 || y !== 1)
            do
              if (f--, y--, 0 > y || l[f] !== c[y]) {
                var S = `
` + l[f].replace(" at new ", " at ");
                return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), S;
              }
            while (1 <= f && 0 <= y);
          break;
        }
      }
    } finally {
      te = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? A(e) : "";
  }
  function X(e) {
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
        return e = se(e.type, !1), e;
      case 11:
        return e = se(e.type.render, !1), e;
      case 1:
        return e = se(e.type, !0), e;
      default:
        return "";
    }
  }
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ue:
        return "Fragment";
      case de:
        return "Portal";
      case ye:
        return "Profiler";
      case J:
        return "StrictMode";
      case Oe:
        return "Suspense";
      case it:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ce:
        return (e.displayName || "Context") + ".Consumer";
      case Le:
        return (e._context.displayName || "Context") + ".Provider";
      case Xe:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case dt:
        return t = e.displayName || null, t !== null ? t : ce(e.type) || "Memo";
      case K:
        t = e._payload, e = e._init;
        try {
          return ce(e(t));
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
        return ce(t);
      case 8:
        return t === J ? "StrictMode" : "Mode";
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
  function ie(e) {
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
  function ne(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ze(e) {
    var t = ne(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
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
  function _n(e) {
    e._valueTracker || (e._valueTracker = ze(e));
  }
  function Ol(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = ne(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
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
    return F({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function zl(e, t) {
    var s = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    s = ie(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Dl(e, t) {
    t = t.checked, t != null && ee(e, "checked", t, !1);
  }
  function oo(e, t) {
    Dl(e, t);
    var s = ie(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? ao(e, t.type, s) : t.hasOwnProperty("defaultValue") && ao(e, t.type, ie(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
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
  var wr = Array.isArray;
  function Un(e, t, s, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < s.length; l++) t["$" + s[l]] = !0;
      for (s = 0; s < e.length; s++) l = t.hasOwnProperty("$" + e[s].value), e[s].selected !== l && (e[s].selected = l), l && o && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + ie(s), t = null, l = 0; l < e.length; l++) {
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
    return F({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Bl(e, t) {
    var s = t.value;
    if (s == null) {
      if (s = t.children, t = t.defaultValue, s != null) {
        if (t != null) throw Error(i(92));
        if (wr(s)) {
          if (1 < s.length) throw Error(i(93));
          s = s[0];
        }
        t = s;
      }
      t == null && (t = ""), s = t;
    }
    e._wrapperState = { initialValue: ie(s) };
  }
  function Ul(e, t) {
    var s = ie(t.value), o = ie(t.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), t.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), o != null && (e.defaultValue = "" + o);
  }
  function $l(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Hl(e) {
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
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Hl(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var bs, Vl = (function(e) {
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
  function Sr(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var xr = {
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
  }, Qh = ["Webkit", "ms", "Moz", "O"];
  Object.keys(xr).forEach(function(e) {
    Qh.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), xr[t] = xr[e];
    });
  });
  function Wl(e, t, s) {
    return t == null || typeof t == "boolean" || t === "" ? "" : s || typeof t != "number" || t === 0 || xr.hasOwnProperty(e) && xr[e] ? ("" + t).trim() : t + "px";
  }
  function Yl(e, t) {
    e = e.style;
    for (var s in t) if (t.hasOwnProperty(s)) {
      var o = s.indexOf("--") === 0, l = Wl(s, t[s], o);
      s === "float" && (s = "cssFloat"), o ? e.setProperty(s, l) : e[s] = l;
    }
  }
  var Gh = F({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function co(e, t) {
    if (t) {
      if (Gh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
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
  var mo = null, $n = null, Hn = null;
  function Ql(e) {
    if (e = Vr(e)) {
      if (typeof mo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = Gs(t), mo(e.stateNode, e.type, t));
    }
  }
  function Gl(e) {
    $n ? Hn ? Hn.push(e) : Hn = [e] : $n = e;
  }
  function ql() {
    if ($n) {
      var e = $n, t = Hn;
      if (Hn = $n = null, Ql(e), t) for (e = 0; e < t.length; e++) Ql(t[e]);
    }
  }
  function Kl(e, t) {
    return e(t);
  }
  function Jl() {
  }
  var go = !1;
  function Xl(e, t, s) {
    if (go) return e(t, s);
    go = !0;
    try {
      return Kl(e, t, s);
    } finally {
      go = !1, ($n !== null || Hn !== null) && (Jl(), ql());
    }
  }
  function Er(e, t) {
    var s = e.stateNode;
    if (s === null) return null;
    var o = Gs(s);
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
    var kr = {};
    Object.defineProperty(kr, "passive", { get: function() {
      yo = !0;
    } }), window.addEventListener("test", kr, kr), window.removeEventListener("test", kr, kr);
  } catch {
    yo = !1;
  }
  function qh(e, t, s, o, l, c, f, y, S) {
    var I = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, I);
    } catch (P) {
      this.onError(P);
    }
  }
  var br = !1, Cs = null, Ts = !1, vo = null, Kh = { onError: function(e) {
    br = !0, Cs = e;
  } };
  function Jh(e, t, s, o, l, c, f, y, S) {
    br = !1, Cs = null, qh.apply(Kh, arguments);
  }
  function Xh(e, t, s, o, l, c, f, y, S) {
    if (Jh.apply(this, arguments), br) {
      if (br) {
        var I = Cs;
        br = !1, Cs = null;
      } else throw Error(i(198));
      Ts || (Ts = !0, vo = I);
    }
  }
  function wn(e) {
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
  function Zl(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function eu(e) {
    if (wn(e) !== e) throw Error(i(188));
  }
  function Zh(e) {
    var t = e.alternate;
    if (!t) {
      if (t = wn(e), t === null) throw Error(i(188));
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
          if (c === s) return eu(l), e;
          if (c === o) return eu(l), t;
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
  function tu(e) {
    return e = Zh(e), e !== null ? nu(e) : null;
  }
  function nu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = nu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var ru = n.unstable_scheduleCallback, su = n.unstable_cancelCallback, ep = n.unstable_shouldYield, tp = n.unstable_requestPaint, Ae = n.unstable_now, np = n.unstable_getCurrentPriorityLevel, _o = n.unstable_ImmediatePriority, iu = n.unstable_UserBlockingPriority, Is = n.unstable_NormalPriority, rp = n.unstable_LowPriority, ou = n.unstable_IdlePriority, Rs = null, Nt = null;
  function sp(e) {
    if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
      Nt.onCommitFiberRoot(Rs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var _t = Math.clz32 ? Math.clz32 : ap, ip = Math.log, op = Math.LN2;
  function ap(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ip(e) / op | 0) | 0;
  }
  var As = 64, Ms = 4194304;
  function Cr(e) {
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
    var o = 0, l = e.suspendedLanes, c = e.pingedLanes, f = s & 268435455;
    if (f !== 0) {
      var y = f & ~l;
      y !== 0 ? o = Cr(y) : (c &= f, c !== 0 && (o = Cr(c)));
    } else f = s & ~l, f !== 0 ? o = Cr(f) : c !== 0 && (o = Cr(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - _t(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function lp(e, t) {
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
  function up(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var f = 31 - _t(c), y = 1 << f, S = l[f];
      S === -1 ? ((y & s) === 0 || (y & o) !== 0) && (l[f] = lp(y, t)) : S <= t && (e.expiredLanes |= y), c &= ~y;
    }
  }
  function wo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function au() {
    var e = As;
    return As <<= 1, (As & 4194240) === 0 && (As = 64), e;
  }
  function So(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Tr(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - _t(t), e[t] = s;
  }
  function cp(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - _t(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function xo(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - _t(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var me = 0;
  function lu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var uu, Eo, cu, du, fu, ko = !1, Ps = [], Xt = null, Zt = null, en = null, Ir = /* @__PURE__ */ new Map(), Rr = /* @__PURE__ */ new Map(), tn = [], dp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function hu(e, t) {
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
        Ir.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Rr.delete(t.pointerId);
    }
  }
  function Ar(e, t, s, o, l, c) {
    return e === null || e.nativeEvent !== c ? (e = { blockedOn: t, domEventName: s, eventSystemFlags: o, nativeEvent: c, targetContainers: [l] }, t !== null && (t = Vr(t), t !== null && Eo(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function fp(e, t, s, o, l) {
    switch (t) {
      case "focusin":
        return Xt = Ar(Xt, e, t, s, o, l), !0;
      case "dragenter":
        return Zt = Ar(Zt, e, t, s, o, l), !0;
      case "mouseover":
        return en = Ar(en, e, t, s, o, l), !0;
      case "pointerover":
        var c = l.pointerId;
        return Ir.set(c, Ar(Ir.get(c) || null, e, t, s, o, l)), !0;
      case "gotpointercapture":
        return c = l.pointerId, Rr.set(c, Ar(Rr.get(c) || null, e, t, s, o, l)), !0;
    }
    return !1;
  }
  function pu(e) {
    var t = Sn(e.target);
    if (t !== null) {
      var s = wn(t);
      if (s !== null) {
        if (t = s.tag, t === 13) {
          if (t = Zl(s), t !== null) {
            e.blockedOn = t, fu(e.priority, function() {
              cu(s);
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
      var s = Co(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        ho = o, s.target.dispatchEvent(o), ho = null;
      } else return t = Vr(s), t !== null && Eo(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function mu(e, t, s) {
    js(e) && s.delete(t);
  }
  function hp() {
    ko = !1, Xt !== null && js(Xt) && (Xt = null), Zt !== null && js(Zt) && (Zt = null), en !== null && js(en) && (en = null), Ir.forEach(mu), Rr.forEach(mu);
  }
  function Mr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, ko || (ko = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, hp)));
  }
  function Nr(e) {
    function t(l) {
      return Mr(l, e);
    }
    if (0 < Ps.length) {
      Mr(Ps[0], e);
      for (var s = 1; s < Ps.length; s++) {
        var o = Ps[s];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (Xt !== null && Mr(Xt, e), Zt !== null && Mr(Zt, e), en !== null && Mr(en, e), Ir.forEach(t), Rr.forEach(t), s = 0; s < tn.length; s++) o = tn[s], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < tn.length && (s = tn[0], s.blockedOn === null); ) pu(s), s.blockedOn === null && tn.shift();
  }
  var Vn = le.ReactCurrentBatchConfig, Ls = !0;
  function pp(e, t, s, o) {
    var l = me, c = Vn.transition;
    Vn.transition = null;
    try {
      me = 1, bo(e, t, s, o);
    } finally {
      me = l, Vn.transition = c;
    }
  }
  function mp(e, t, s, o) {
    var l = me, c = Vn.transition;
    Vn.transition = null;
    try {
      me = 4, bo(e, t, s, o);
    } finally {
      me = l, Vn.transition = c;
    }
  }
  function bo(e, t, s, o) {
    if (Ls) {
      var l = Co(e, t, s, o);
      if (l === null) Ho(e, t, o, Os, s), hu(e, o);
      else if (fp(l, e, t, s, o)) o.stopPropagation();
      else if (hu(e, o), t & 4 && -1 < dp.indexOf(e)) {
        for (; l !== null; ) {
          var c = Vr(l);
          if (c !== null && uu(c), c = Co(e, t, s, o), c === null && Ho(e, t, o, Os, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else Ho(e, t, o, null, s);
    }
  }
  var Os = null;
  function Co(e, t, s, o) {
    if (Os = null, e = po(o), e = Sn(e), e !== null) if (t = wn(e), t === null) e = null;
    else if (s = t.tag, s === 13) {
      if (e = Zl(t), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Os = e, null;
  }
  function gu(e) {
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
        switch (np()) {
          case _o:
            return 1;
          case iu:
            return 4;
          case Is:
          case rp:
            return 16;
          case ou:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var nn = null, To = null, zs = null;
  function yu() {
    if (zs) return zs;
    var e, t = To, s = t.length, o, l = "value" in nn ? nn.value : nn.textContent, c = l.length;
    for (e = 0; e < s && t[e] === l[e]; e++) ;
    var f = s - e;
    for (o = 1; o <= f && t[s - o] === l[c - o]; o++) ;
    return zs = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Ds(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Fs() {
    return !0;
  }
  function vu() {
    return !1;
  }
  function ot(e) {
    function t(s, o, l, c, f) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (s = e[y], this[y] = s ? s(c) : c[y]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Fs : vu, this.isPropagationStopped = vu, this;
    }
    return F(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Fs);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Fs);
    }, persist: function() {
    }, isPersistent: Fs }), t;
  }
  var Wn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Io = ot(Wn), Pr = F({}, Wn, { view: 0, detail: 0 }), gp = ot(Pr), Ro, Ao, jr, Bs = F({}, Pr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: No, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== jr && (jr && e.type === "mousemove" ? (Ro = e.screenX - jr.screenX, Ao = e.screenY - jr.screenY) : Ao = Ro = 0, jr = e), Ro);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ao;
  } }), _u = ot(Bs), yp = F({}, Bs, { dataTransfer: 0 }), vp = ot(yp), _p = F({}, Pr, { relatedTarget: 0 }), Mo = ot(_p), wp = F({}, Wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Sp = ot(wp), xp = F({}, Wn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Ep = ot(xp), kp = F({}, Wn, { data: 0 }), wu = ot(kp), bp = {
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
  }, Cp = {
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
  function Ip(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Tp[e]) ? !!t[e] : !1;
  }
  function No() {
    return Ip;
  }
  var Rp = F({}, Pr, { key: function(e) {
    if (e.key) {
      var t = bp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ds(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cp[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: No, charCode: function(e) {
    return e.type === "keypress" ? Ds(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ds(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Ap = ot(Rp), Mp = F({}, Bs, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Su = ot(Mp), Np = F({}, Pr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: No }), Pp = ot(Np), jp = F({}, Wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Lp = ot(jp), Op = F({}, Bs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), zp = ot(Op), Dp = [9, 13, 27, 32], Po = p && "CompositionEvent" in window, Lr = null;
  p && "documentMode" in document && (Lr = document.documentMode);
  var Fp = p && "TextEvent" in window && !Lr, xu = p && (!Po || Lr && 8 < Lr && 11 >= Lr), Eu = " ", ku = !1;
  function bu(e, t) {
    switch (e) {
      case "keyup":
        return Dp.indexOf(t.keyCode) !== -1;
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
  var Yn = !1;
  function Bp(e, t) {
    switch (e) {
      case "compositionend":
        return Cu(t);
      case "keypress":
        return t.which !== 32 ? null : (ku = !0, Eu);
      case "textInput":
        return e = t.data, e === Eu && ku ? null : e;
      default:
        return null;
    }
  }
  function Up(e, t) {
    if (Yn) return e === "compositionend" || !Po && bu(e, t) ? (e = yu(), zs = To = nn = null, Yn = !1, e) : null;
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
        return xu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var $p = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Tu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!$p[e.type] : t === "textarea";
  }
  function Iu(e, t, s, o) {
    Gl(o), t = Ws(t, "onChange"), 0 < t.length && (s = new Io("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var Or = null, zr = null;
  function Hp(e) {
    Yu(e, 0);
  }
  function Us(e) {
    var t = Jn(e);
    if (Ol(t)) return e;
  }
  function Vp(e, t) {
    if (e === "change") return t;
  }
  var Ru = !1;
  if (p) {
    var jo;
    if (p) {
      var Lo = "oninput" in document;
      if (!Lo) {
        var Au = document.createElement("div");
        Au.setAttribute("oninput", "return;"), Lo = typeof Au.oninput == "function";
      }
      jo = Lo;
    } else jo = !1;
    Ru = jo && (!document.documentMode || 9 < document.documentMode);
  }
  function Mu() {
    Or && (Or.detachEvent("onpropertychange", Nu), zr = Or = null);
  }
  function Nu(e) {
    if (e.propertyName === "value" && Us(zr)) {
      var t = [];
      Iu(t, zr, e, po(e)), Xl(Hp, t);
    }
  }
  function Wp(e, t, s) {
    e === "focusin" ? (Mu(), Or = t, zr = s, Or.attachEvent("onpropertychange", Nu)) : e === "focusout" && Mu();
  }
  function Yp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Us(zr);
  }
  function Qp(e, t) {
    if (e === "click") return Us(t);
  }
  function Gp(e, t) {
    if (e === "input" || e === "change") return Us(t);
  }
  function qp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var wt = typeof Object.is == "function" ? Object.is : qp;
  function Dr(e, t) {
    if (wt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var s = Object.keys(e), o = Object.keys(t);
    if (s.length !== o.length) return !1;
    for (o = 0; o < s.length; o++) {
      var l = s[o];
      if (!m.call(t, l) || !wt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Pu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ju(e, t) {
    var s = Pu(e);
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
      s = Pu(s);
    }
  }
  function Lu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Lu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ou() {
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
  function Kp(e) {
    var t = Ou(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Lu(s.ownerDocument.documentElement, s)) {
      if (o !== null && Oo(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = ju(s, c);
          var f = ju(
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
  var Jp = p && "documentMode" in document && 11 >= document.documentMode, Qn = null, zo = null, Fr = null, Do = !1;
  function zu(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Do || Qn == null || Qn !== ks(o) || (o = Qn, "selectionStart" in o && Oo(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Fr && Dr(Fr, o) || (Fr = o, o = Ws(zo, "onSelect"), 0 < o.length && (t = new Io("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = Qn)));
  }
  function $s(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var Gn = { animationend: $s("Animation", "AnimationEnd"), animationiteration: $s("Animation", "AnimationIteration"), animationstart: $s("Animation", "AnimationStart"), transitionend: $s("Transition", "TransitionEnd") }, Fo = {}, Du = {};
  p && (Du = document.createElement("div").style, "AnimationEvent" in window || (delete Gn.animationend.animation, delete Gn.animationiteration.animation, delete Gn.animationstart.animation), "TransitionEvent" in window || delete Gn.transitionend.transition);
  function Hs(e) {
    if (Fo[e]) return Fo[e];
    if (!Gn[e]) return e;
    var t = Gn[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Du) return Fo[e] = t[s];
    return e;
  }
  var Fu = Hs("animationend"), Bu = Hs("animationiteration"), Uu = Hs("animationstart"), $u = Hs("transitionend"), Hu = /* @__PURE__ */ new Map(), Vu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function rn(e, t) {
    Hu.set(e, t), d(t, [e]);
  }
  for (var Bo = 0; Bo < Vu.length; Bo++) {
    var Uo = Vu[Bo], Xp = Uo.toLowerCase(), Zp = Uo[0].toUpperCase() + Uo.slice(1);
    rn(Xp, "on" + Zp);
  }
  rn(Fu, "onAnimationEnd"), rn(Bu, "onAnimationIteration"), rn(Uu, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn($u, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Br = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), em = new Set("cancel close invalid load scroll toggle".split(" ").concat(Br));
  function Wu(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, Xh(o, t, void 0, e), e.currentTarget = null;
  }
  function Yu(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var y = o[f], S = y.instance, I = y.currentTarget;
          if (y = y.listener, S !== c && l.isPropagationStopped()) break e;
          Wu(l, y, I), c = S;
        }
        else for (f = 0; f < o.length; f++) {
          if (y = o[f], S = y.instance, I = y.currentTarget, y = y.listener, S !== c && l.isPropagationStopped()) break e;
          Wu(l, y, I), c = S;
        }
      }
    }
    if (Ts) throw e = vo, Ts = !1, vo = null, e;
  }
  function _e(e, t) {
    var s = t[qo];
    s === void 0 && (s = t[qo] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (Qu(t, e, 2, !1), s.add(o));
  }
  function $o(e, t, s) {
    var o = 0;
    t && (o |= 4), Qu(s, e, o, t);
  }
  var Vs = "_reactListening" + Math.random().toString(36).slice(2);
  function Ur(e) {
    if (!e[Vs]) {
      e[Vs] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (em.has(s) || $o(s, !1, e), $o(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Vs] || (t[Vs] = !0, $o("selectionchange", !1, t));
    }
  }
  function Qu(e, t, s, o) {
    switch (gu(t)) {
      case 1:
        var l = pp;
        break;
      case 4:
        l = mp;
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
      var f = o.tag;
      if (f === 3 || f === 4) {
        var y = o.stateNode.containerInfo;
        if (y === l || y.nodeType === 8 && y.parentNode === l) break;
        if (f === 4) for (f = o.return; f !== null; ) {
          var S = f.tag;
          if ((S === 3 || S === 4) && (S = f.stateNode.containerInfo, S === l || S.nodeType === 8 && S.parentNode === l)) return;
          f = f.return;
        }
        for (; y !== null; ) {
          if (f = Sn(y), f === null) return;
          if (S = f.tag, S === 5 || S === 6) {
            o = c = f;
            continue e;
          }
          y = y.parentNode;
        }
      }
      o = o.return;
    }
    Xl(function() {
      var I = c, P = po(s), L = [];
      e: {
        var M = Hu.get(e);
        if (M !== void 0) {
          var D = Io, H = e;
          switch (e) {
            case "keypress":
              if (Ds(s) === 0) break e;
            case "keydown":
            case "keyup":
              D = Ap;
              break;
            case "focusin":
              H = "focus", D = Mo;
              break;
            case "focusout":
              H = "blur", D = Mo;
              break;
            case "beforeblur":
            case "afterblur":
              D = Mo;
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
              D = _u;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = vp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = Pp;
              break;
            case Fu:
            case Bu:
            case Uu:
              D = Sp;
              break;
            case $u:
              D = Lp;
              break;
            case "scroll":
              D = gp;
              break;
            case "wheel":
              D = zp;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = Ep;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = Su;
          }
          var V = (t & 4) !== 0, Me = !V && e === "scroll", C = V ? M !== null ? M + "Capture" : null : M;
          V = [];
          for (var x = I, T; x !== null; ) {
            T = x;
            var z = T.stateNode;
            if (T.tag === 5 && z !== null && (T = z, C !== null && (z = Er(x, C), z != null && V.push($r(x, z, T)))), Me) break;
            x = x.return;
          }
          0 < V.length && (M = new D(M, H, null, s, P), L.push({ event: M, listeners: V }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (M = e === "mouseover" || e === "pointerover", D = e === "mouseout" || e === "pointerout", M && s !== ho && (H = s.relatedTarget || s.fromElement) && (Sn(H) || H[Ut])) break e;
          if ((D || M) && (M = P.window === P ? P : (M = P.ownerDocument) ? M.defaultView || M.parentWindow : window, D ? (H = s.relatedTarget || s.toElement, D = I, H = H ? Sn(H) : null, H !== null && (Me = wn(H), H !== Me || H.tag !== 5 && H.tag !== 6) && (H = null)) : (D = null, H = I), D !== H)) {
            if (V = _u, z = "onMouseLeave", C = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (V = Su, z = "onPointerLeave", C = "onPointerEnter", x = "pointer"), Me = D == null ? M : Jn(D), T = H == null ? M : Jn(H), M = new V(z, x + "leave", D, s, P), M.target = Me, M.relatedTarget = T, z = null, Sn(P) === I && (V = new V(C, x + "enter", H, s, P), V.target = T, V.relatedTarget = Me, z = V), Me = z, D && H) t: {
              for (V = D, C = H, x = 0, T = V; T; T = qn(T)) x++;
              for (T = 0, z = C; z; z = qn(z)) T++;
              for (; 0 < x - T; ) V = qn(V), x--;
              for (; 0 < T - x; ) C = qn(C), T--;
              for (; x--; ) {
                if (V === C || C !== null && V === C.alternate) break t;
                V = qn(V), C = qn(C);
              }
              V = null;
            }
            else V = null;
            D !== null && Gu(L, M, D, V, !1), H !== null && Me !== null && Gu(L, Me, H, V, !0);
          }
        }
        e: {
          if (M = I ? Jn(I) : window, D = M.nodeName && M.nodeName.toLowerCase(), D === "select" || D === "input" && M.type === "file") var W = Vp;
          else if (Tu(M)) if (Ru) W = Gp;
          else {
            W = Yp;
            var G = Wp;
          }
          else (D = M.nodeName) && D.toLowerCase() === "input" && (M.type === "checkbox" || M.type === "radio") && (W = Qp);
          if (W && (W = W(e, I))) {
            Iu(L, W, s, P);
            break e;
          }
          G && G(e, M, I), e === "focusout" && (G = M._wrapperState) && G.controlled && M.type === "number" && ao(M, "number", M.value);
        }
        switch (G = I ? Jn(I) : window, e) {
          case "focusin":
            (Tu(G) || G.contentEditable === "true") && (Qn = G, zo = I, Fr = null);
            break;
          case "focusout":
            Fr = zo = Qn = null;
            break;
          case "mousedown":
            Do = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Do = !1, zu(L, s, P);
            break;
          case "selectionchange":
            if (Jp) break;
          case "keydown":
          case "keyup":
            zu(L, s, P);
        }
        var q;
        if (Po) e: {
          switch (e) {
            case "compositionstart":
              var Z = "onCompositionStart";
              break e;
            case "compositionend":
              Z = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Z = "onCompositionUpdate";
              break e;
          }
          Z = void 0;
        }
        else Yn ? bu(e, s) && (Z = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (Z = "onCompositionStart");
        Z && (xu && s.locale !== "ko" && (Yn || Z !== "onCompositionStart" ? Z === "onCompositionEnd" && Yn && (q = yu()) : (nn = P, To = "value" in nn ? nn.value : nn.textContent, Yn = !0)), G = Ws(I, Z), 0 < G.length && (Z = new wu(Z, e, null, s, P), L.push({ event: Z, listeners: G }), q ? Z.data = q : (q = Cu(s), q !== null && (Z.data = q)))), (q = Fp ? Bp(e, s) : Up(e, s)) && (I = Ws(I, "onBeforeInput"), 0 < I.length && (P = new wu("onBeforeInput", "beforeinput", null, s, P), L.push({ event: P, listeners: I }), P.data = q));
      }
      Yu(L, t);
    });
  }
  function $r(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function Ws(e, t) {
    for (var s = t + "Capture", o = []; e !== null; ) {
      var l = e, c = l.stateNode;
      l.tag === 5 && c !== null && (l = c, c = Er(e, s), c != null && o.unshift($r(e, c, l)), c = Er(e, t), c != null && o.push($r(e, c, l))), e = e.return;
    }
    return o;
  }
  function qn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Gu(e, t, s, o, l) {
    for (var c = t._reactName, f = []; s !== null && s !== o; ) {
      var y = s, S = y.alternate, I = y.stateNode;
      if (S !== null && S === o) break;
      y.tag === 5 && I !== null && (y = I, l ? (S = Er(s, c), S != null && f.unshift($r(s, S, y))) : l || (S = Er(s, c), S != null && f.push($r(s, S, y)))), s = s.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var tm = /\r\n?/g, nm = /\u0000|\uFFFD/g;
  function qu(e) {
    return (typeof e == "string" ? e : "" + e).replace(tm, `
`).replace(nm, "");
  }
  function Ys(e, t, s) {
    if (t = qu(t), qu(e) !== t && s) throw Error(i(425));
  }
  function Qs() {
  }
  var Vo = null, Wo = null;
  function Yo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qo = typeof setTimeout == "function" ? setTimeout : void 0, rm = typeof clearTimeout == "function" ? clearTimeout : void 0, Ku = typeof Promise == "function" ? Promise : void 0, sm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ku < "u" ? function(e) {
    return Ku.resolve(null).then(e).catch(im);
  } : Qo;
  function im(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Go(e, t) {
    var s = t, o = 0;
    do {
      var l = s.nextSibling;
      if (e.removeChild(s), l && l.nodeType === 8) if (s = l.data, s === "/$") {
        if (o === 0) {
          e.removeChild(l), Nr(t);
          return;
        }
        o--;
      } else s !== "$" && s !== "$?" && s !== "$!" || o++;
      s = l;
    } while (s);
    Nr(t);
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
  function Ju(e) {
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
  var Kn = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + Kn, Hr = "__reactProps$" + Kn, Ut = "__reactContainer$" + Kn, qo = "__reactEvents$" + Kn, om = "__reactListeners$" + Kn, am = "__reactHandles$" + Kn;
  function Sn(e) {
    var t = e[Pt];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[Ut] || s[Pt]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = Ju(e); e !== null; ) {
          if (s = e[Pt]) return s;
          e = Ju(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Vr(e) {
    return e = e[Pt] || e[Ut], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Jn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Gs(e) {
    return e[Hr] || null;
  }
  var Ko = [], Xn = -1;
  function on(e) {
    return { current: e };
  }
  function we(e) {
    0 > Xn || (e.current = Ko[Xn], Ko[Xn] = null, Xn--);
  }
  function ve(e, t) {
    Xn++, Ko[Xn] = e.current, e.current = t;
  }
  var an = {}, He = on(an), Ze = on(!1), xn = an;
  function Zn(e, t) {
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
  function qs() {
    we(Ze), we(He);
  }
  function Xu(e, t, s) {
    if (He.current !== an) throw Error(i(168));
    ve(He, t), ve(Ze, s);
  }
  function Zu(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, ge(e) || "Unknown", l));
    return F({}, s, o);
  }
  function Ks(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || an, xn = He.current, ve(He, e), ve(Ze, Ze.current), !0;
  }
  function ec(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = Zu(e, t, xn), o.__reactInternalMemoizedMergedChildContext = e, we(Ze), we(He), ve(He, e)) : we(Ze), ve(Ze, s);
  }
  var $t = null, Js = !1, Jo = !1;
  function tc(e) {
    $t === null ? $t = [e] : $t.push(e);
  }
  function lm(e) {
    Js = !0, tc(e);
  }
  function ln() {
    if (!Jo && $t !== null) {
      Jo = !0;
      var e = 0, t = me;
      try {
        var s = $t;
        for (me = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        $t = null, Js = !1;
      } catch (l) {
        throw $t !== null && ($t = $t.slice(e + 1)), ru(_o, ln), l;
      } finally {
        me = t, Jo = !1;
      }
    }
    return null;
  }
  var er = [], tr = 0, Xs = null, Zs = 0, ft = [], ht = 0, En = null, Ht = 1, Vt = "";
  function kn(e, t) {
    er[tr++] = Zs, er[tr++] = Xs, Xs = e, Zs = t;
  }
  function nc(e, t, s) {
    ft[ht++] = Ht, ft[ht++] = Vt, ft[ht++] = En, En = e;
    var o = Ht;
    e = Vt;
    var l = 32 - _t(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - _t(t) + l;
    if (30 < c) {
      var f = l - l % 5;
      c = (o & (1 << f) - 1).toString(32), o >>= f, l -= f, Ht = 1 << 32 - _t(t) + l | s << l | o, Vt = c + e;
    } else Ht = 1 << c | s << l | o, Vt = e;
  }
  function Xo(e) {
    e.return !== null && (kn(e, 1), nc(e, 1, 0));
  }
  function Zo(e) {
    for (; e === Xs; ) Xs = er[--tr], er[tr] = null, Zs = er[--tr], er[tr] = null;
    for (; e === En; ) En = ft[--ht], ft[ht] = null, Vt = ft[--ht], ft[ht] = null, Ht = ft[--ht], ft[ht] = null;
  }
  var at = null, lt = null, xe = !1, St = null;
  function rc(e, t) {
    var s = yt(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function sc(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, at = e, lt = sn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, at = e, lt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = En !== null ? { id: Ht, overflow: Vt } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = yt(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, at = e, lt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ea(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ta(e) {
    if (xe) {
      var t = lt;
      if (t) {
        var s = t;
        if (!sc(e, t)) {
          if (ea(e)) throw Error(i(418));
          t = sn(s.nextSibling);
          var o = at;
          t && sc(e, t) ? rc(o, s) : (e.flags = e.flags & -4097 | 2, xe = !1, at = e);
        }
      } else {
        if (ea(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, xe = !1, at = e;
      }
    }
  }
  function ic(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    at = e;
  }
  function ei(e) {
    if (e !== at) return !1;
    if (!xe) return ic(e), xe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Yo(e.type, e.memoizedProps)), t && (t = lt)) {
      if (ea(e)) throw oc(), Error(i(418));
      for (; t; ) rc(e, t), t = sn(t.nextSibling);
    }
    if (ic(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (t === 0) {
                lt = sn(e.nextSibling);
                break e;
              }
              t--;
            } else s !== "$" && s !== "$!" && s !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        lt = null;
      }
    } else lt = at ? sn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function oc() {
    for (var e = lt; e; ) e = sn(e.nextSibling);
  }
  function nr() {
    lt = at = null, xe = !1;
  }
  function na(e) {
    St === null ? St = [e] : St.push(e);
  }
  var um = le.ReactCurrentBatchConfig;
  function Wr(e, t, s) {
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
  function ti(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function ac(e) {
    var t = e._init;
    return t(e._payload);
  }
  function lc(e) {
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
      return C = gn(C, x), C.index = 0, C.sibling = null, C;
    }
    function c(C, x, T) {
      return C.index = T, e ? (T = C.alternate, T !== null ? (T = T.index, T < x ? (C.flags |= 2, x) : T) : (C.flags |= 2, x)) : (C.flags |= 1048576, x);
    }
    function f(C) {
      return e && C.alternate === null && (C.flags |= 2), C;
    }
    function y(C, x, T, z) {
      return x === null || x.tag !== 6 ? (x = Qa(T, C.mode, z), x.return = C, x) : (x = l(x, T), x.return = C, x);
    }
    function S(C, x, T, z) {
      var W = T.type;
      return W === ue ? P(C, x, T.props.children, z, T.key) : x !== null && (x.elementType === W || typeof W == "object" && W !== null && W.$$typeof === K && ac(W) === x.type) ? (z = l(x, T.props), z.ref = Wr(C, x, T), z.return = C, z) : (z = bi(T.type, T.key, T.props, null, C.mode, z), z.ref = Wr(C, x, T), z.return = C, z);
    }
    function I(C, x, T, z) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== T.containerInfo || x.stateNode.implementation !== T.implementation ? (x = Ga(T, C.mode, z), x.return = C, x) : (x = l(x, T.children || []), x.return = C, x);
    }
    function P(C, x, T, z, W) {
      return x === null || x.tag !== 7 ? (x = Nn(T, C.mode, z, W), x.return = C, x) : (x = l(x, T), x.return = C, x);
    }
    function L(C, x, T) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Qa("" + x, C.mode, T), x.return = C, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Q:
            return T = bi(x.type, x.key, x.props, null, C.mode, T), T.ref = Wr(C, null, x), T.return = C, T;
          case de:
            return x = Ga(x, C.mode, T), x.return = C, x;
          case K:
            var z = x._init;
            return L(C, z(x._payload), T);
        }
        if (wr(x) || B(x)) return x = Nn(x, C.mode, T, null), x.return = C, x;
        ti(C, x);
      }
      return null;
    }
    function M(C, x, T, z) {
      var W = x !== null ? x.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return W !== null ? null : y(C, x, "" + T, z);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Q:
            return T.key === W ? S(C, x, T, z) : null;
          case de:
            return T.key === W ? I(C, x, T, z) : null;
          case K:
            return W = T._init, M(
              C,
              x,
              W(T._payload),
              z
            );
        }
        if (wr(T) || B(T)) return W !== null ? null : P(C, x, T, z, null);
        ti(C, T);
      }
      return null;
    }
    function D(C, x, T, z, W) {
      if (typeof z == "string" && z !== "" || typeof z == "number") return C = C.get(T) || null, y(x, C, "" + z, W);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case Q:
            return C = C.get(z.key === null ? T : z.key) || null, S(x, C, z, W);
          case de:
            return C = C.get(z.key === null ? T : z.key) || null, I(x, C, z, W);
          case K:
            var G = z._init;
            return D(C, x, T, G(z._payload), W);
        }
        if (wr(z) || B(z)) return C = C.get(T) || null, P(x, C, z, W, null);
        ti(x, z);
      }
      return null;
    }
    function H(C, x, T, z) {
      for (var W = null, G = null, q = x, Z = x = 0, Be = null; q !== null && Z < T.length; Z++) {
        q.index > Z ? (Be = q, q = null) : Be = q.sibling;
        var he = M(C, q, T[Z], z);
        if (he === null) {
          q === null && (q = Be);
          break;
        }
        e && q && he.alternate === null && t(C, q), x = c(he, x, Z), G === null ? W = he : G.sibling = he, G = he, q = Be;
      }
      if (Z === T.length) return s(C, q), xe && kn(C, Z), W;
      if (q === null) {
        for (; Z < T.length; Z++) q = L(C, T[Z], z), q !== null && (x = c(q, x, Z), G === null ? W = q : G.sibling = q, G = q);
        return xe && kn(C, Z), W;
      }
      for (q = o(C, q); Z < T.length; Z++) Be = D(q, C, Z, T[Z], z), Be !== null && (e && Be.alternate !== null && q.delete(Be.key === null ? Z : Be.key), x = c(Be, x, Z), G === null ? W = Be : G.sibling = Be, G = Be);
      return e && q.forEach(function(yn) {
        return t(C, yn);
      }), xe && kn(C, Z), W;
    }
    function V(C, x, T, z) {
      var W = B(T);
      if (typeof W != "function") throw Error(i(150));
      if (T = W.call(T), T == null) throw Error(i(151));
      for (var G = W = null, q = x, Z = x = 0, Be = null, he = T.next(); q !== null && !he.done; Z++, he = T.next()) {
        q.index > Z ? (Be = q, q = null) : Be = q.sibling;
        var yn = M(C, q, he.value, z);
        if (yn === null) {
          q === null && (q = Be);
          break;
        }
        e && q && yn.alternate === null && t(C, q), x = c(yn, x, Z), G === null ? W = yn : G.sibling = yn, G = yn, q = Be;
      }
      if (he.done) return s(
        C,
        q
      ), xe && kn(C, Z), W;
      if (q === null) {
        for (; !he.done; Z++, he = T.next()) he = L(C, he.value, z), he !== null && (x = c(he, x, Z), G === null ? W = he : G.sibling = he, G = he);
        return xe && kn(C, Z), W;
      }
      for (q = o(C, q); !he.done; Z++, he = T.next()) he = D(q, C, Z, he.value, z), he !== null && (e && he.alternate !== null && q.delete(he.key === null ? Z : he.key), x = c(he, x, Z), G === null ? W = he : G.sibling = he, G = he);
      return e && q.forEach(function($m) {
        return t(C, $m);
      }), xe && kn(C, Z), W;
    }
    function Me(C, x, T, z) {
      if (typeof T == "object" && T !== null && T.type === ue && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Q:
            e: {
              for (var W = T.key, G = x; G !== null; ) {
                if (G.key === W) {
                  if (W = T.type, W === ue) {
                    if (G.tag === 7) {
                      s(C, G.sibling), x = l(G, T.props.children), x.return = C, C = x;
                      break e;
                    }
                  } else if (G.elementType === W || typeof W == "object" && W !== null && W.$$typeof === K && ac(W) === G.type) {
                    s(C, G.sibling), x = l(G, T.props), x.ref = Wr(C, G, T), x.return = C, C = x;
                    break e;
                  }
                  s(C, G);
                  break;
                } else t(C, G);
                G = G.sibling;
              }
              T.type === ue ? (x = Nn(T.props.children, C.mode, z, T.key), x.return = C, C = x) : (z = bi(T.type, T.key, T.props, null, C.mode, z), z.ref = Wr(C, x, T), z.return = C, C = z);
            }
            return f(C);
          case de:
            e: {
              for (G = T.key; x !== null; ) {
                if (x.key === G) if (x.tag === 4 && x.stateNode.containerInfo === T.containerInfo && x.stateNode.implementation === T.implementation) {
                  s(C, x.sibling), x = l(x, T.children || []), x.return = C, C = x;
                  break e;
                } else {
                  s(C, x);
                  break;
                }
                else t(C, x);
                x = x.sibling;
              }
              x = Ga(T, C.mode, z), x.return = C, C = x;
            }
            return f(C);
          case K:
            return G = T._init, Me(C, x, G(T._payload), z);
        }
        if (wr(T)) return H(C, x, T, z);
        if (B(T)) return V(C, x, T, z);
        ti(C, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, x !== null && x.tag === 6 ? (s(C, x.sibling), x = l(x, T), x.return = C, C = x) : (s(C, x), x = Qa(T, C.mode, z), x.return = C, C = x), f(C)) : s(C, x);
    }
    return Me;
  }
  var rr = lc(!0), uc = lc(!1), ni = on(null), ri = null, sr = null, ra = null;
  function sa() {
    ra = sr = ri = null;
  }
  function ia(e) {
    var t = ni.current;
    we(ni), e._currentValue = t;
  }
  function oa(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function ir(e, t) {
    ri = e, ra = sr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (tt = !0), e.firstContext = null);
  }
  function pt(e) {
    var t = e._currentValue;
    if (ra !== e) if (e = { context: e, memoizedValue: t, next: null }, sr === null) {
      if (ri === null) throw Error(i(308));
      sr = e, ri.dependencies = { lanes: 0, firstContext: e };
    } else sr = sr.next = e;
    return t;
  }
  var bn = null;
  function aa(e) {
    bn === null ? bn = [e] : bn.push(e);
  }
  function cc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, aa(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Wt(e, o);
  }
  function Wt(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var un = !1;
  function la(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function dc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Yt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function cn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (fe & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Wt(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, aa(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Wt(e, s);
  }
  function si(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, xo(e, s);
    }
  }
  function fc(e, t) {
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
  function ii(e, t, s, o) {
    var l = e.updateQueue;
    un = !1;
    var c = l.firstBaseUpdate, f = l.lastBaseUpdate, y = l.shared.pending;
    if (y !== null) {
      l.shared.pending = null;
      var S = y, I = S.next;
      S.next = null, f === null ? c = I : f.next = I, f = S;
      var P = e.alternate;
      P !== null && (P = P.updateQueue, y = P.lastBaseUpdate, y !== f && (y === null ? P.firstBaseUpdate = I : y.next = I, P.lastBaseUpdate = S));
    }
    if (c !== null) {
      var L = l.baseState;
      f = 0, P = I = S = null, y = c;
      do {
        var M = y.lane, D = y.eventTime;
        if ((o & M) === M) {
          P !== null && (P = P.next = {
            eventTime: D,
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          });
          e: {
            var H = e, V = y;
            switch (M = t, D = s, V.tag) {
              case 1:
                if (H = V.payload, typeof H == "function") {
                  L = H.call(D, L, M);
                  break e;
                }
                L = H;
                break e;
              case 3:
                H.flags = H.flags & -65537 | 128;
              case 0:
                if (H = V.payload, M = typeof H == "function" ? H.call(D, L, M) : H, M == null) break e;
                L = F({}, L, M);
                break e;
              case 2:
                un = !0;
            }
          }
          y.callback !== null && y.lane !== 0 && (e.flags |= 64, M = l.effects, M === null ? l.effects = [y] : M.push(y));
        } else D = { eventTime: D, lane: M, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, P === null ? (I = P = D, S = L) : P = P.next = D, f |= M;
        if (y = y.next, y === null) {
          if (y = l.shared.pending, y === null) break;
          M = y, y = M.next, M.next = null, l.lastBaseUpdate = M, l.shared.pending = null;
        }
      } while (!0);
      if (P === null && (S = L), l.baseState = S, l.firstBaseUpdate = I, l.lastBaseUpdate = P, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          f |= l.lane, l = l.next;
        while (l !== t);
      } else c === null && (l.shared.lanes = 0);
      In |= f, e.lanes = f, e.memoizedState = L;
    }
  }
  function hc(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = s, typeof l != "function") throw Error(i(191, l));
        l.call(o);
      }
    }
  }
  var Yr = {}, jt = on(Yr), Qr = on(Yr), Gr = on(Yr);
  function Cn(e) {
    if (e === Yr) throw Error(i(174));
    return e;
  }
  function ua(e, t) {
    switch (ve(Gr, t), ve(Qr, e), ve(jt, Yr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : uo(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = uo(t, e);
    }
    we(jt), ve(jt, t);
  }
  function or() {
    we(jt), we(Qr), we(Gr);
  }
  function pc(e) {
    Cn(Gr.current);
    var t = Cn(jt.current), s = uo(t, e.type);
    t !== s && (ve(Qr, e), ve(jt, s));
  }
  function ca(e) {
    Qr.current === e && (we(jt), we(Qr));
  }
  var Ee = on(0);
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
  var ai = le.ReactCurrentDispatcher, ha = le.ReactCurrentBatchConfig, Tn = 0, ke = null, Pe = null, De = null, li = !1, qr = !1, Kr = 0, cm = 0;
  function Ve() {
    throw Error(i(321));
  }
  function pa(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!wt(e[s], t[s])) return !1;
    return !0;
  }
  function ma(e, t, s, o, l, c) {
    if (Tn = c, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ai.current = e === null || e.memoizedState === null ? pm : mm, e = s(o, l), qr) {
      c = 0;
      do {
        if (qr = !1, Kr = 0, 25 <= c) throw Error(i(301));
        c += 1, De = Pe = null, t.updateQueue = null, ai.current = gm, e = s(o, l);
      } while (qr);
    }
    if (ai.current = di, t = Pe !== null && Pe.next !== null, Tn = 0, De = Pe = ke = null, li = !1, t) throw Error(i(300));
    return e;
  }
  function ga() {
    var e = Kr !== 0;
    return Kr = 0, e;
  }
  function Lt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return De === null ? ke.memoizedState = De = e : De = De.next = e, De;
  }
  function mt() {
    if (Pe === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Pe.next;
    var t = De === null ? ke.memoizedState : De.next;
    if (t !== null) De = t, Pe = e;
    else {
      if (e === null) throw Error(i(310));
      Pe = e, e = { memoizedState: Pe.memoizedState, baseState: Pe.baseState, baseQueue: Pe.baseQueue, queue: Pe.queue, next: null }, De === null ? ke.memoizedState = De = e : De = De.next = e;
    }
    return De;
  }
  function Jr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ya(e) {
    var t = mt(), s = t.queue;
    if (s === null) throw Error(i(311));
    s.lastRenderedReducer = e;
    var o = Pe, l = o.baseQueue, c = s.pending;
    if (c !== null) {
      if (l !== null) {
        var f = l.next;
        l.next = c.next, c.next = f;
      }
      o.baseQueue = l = c, s.pending = null;
    }
    if (l !== null) {
      c = l.next, o = o.baseState;
      var y = f = null, S = null, I = c;
      do {
        var P = I.lane;
        if ((Tn & P) === P) S !== null && (S = S.next = { lane: 0, action: I.action, hasEagerState: I.hasEagerState, eagerState: I.eagerState, next: null }), o = I.hasEagerState ? I.eagerState : e(o, I.action);
        else {
          var L = {
            lane: P,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          };
          S === null ? (y = S = L, f = o) : S = S.next = L, ke.lanes |= P, In |= P;
        }
        I = I.next;
      } while (I !== null && I !== c);
      S === null ? f = o : S.next = y, wt(o, t.memoizedState) || (tt = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = S, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, ke.lanes |= c, In |= c, l = l.next;
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
      var f = l = l.next;
      do
        c = e(c, f.action), f = f.next;
      while (f !== l);
      wt(c, t.memoizedState) || (tt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), s.lastRenderedState = c;
    }
    return [c, o];
  }
  function mc() {
  }
  function gc(e, t) {
    var s = ke, o = mt(), l = t(), c = !wt(o.memoizedState, l);
    if (c && (o.memoizedState = l, tt = !0), o = o.queue, _a(_c.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || De !== null && De.memoizedState.tag & 1) {
      if (s.flags |= 2048, Xr(9, vc.bind(null, s, o, l, t), void 0, null), Fe === null) throw Error(i(349));
      (Tn & 30) !== 0 || yc(s, t, l);
    }
    return l;
  }
  function yc(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = ke.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ke.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function vc(e, t, s, o) {
    t.value = s, t.getSnapshot = o, wc(t) && Sc(e);
  }
  function _c(e, t, s) {
    return s(function() {
      wc(t) && Sc(e);
    });
  }
  function wc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !wt(e, s);
    } catch {
      return !0;
    }
  }
  function Sc(e) {
    var t = Wt(e, 1);
    t !== null && bt(t, e, 1, -1);
  }
  function xc(e) {
    var t = Lt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Jr, lastRenderedState: e }, t.queue = e, e = e.dispatch = hm.bind(null, ke, e), [t.memoizedState, e];
  }
  function Xr(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = ke.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ke.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Ec() {
    return mt().memoizedState;
  }
  function ui(e, t, s, o) {
    var l = Lt();
    ke.flags |= e, l.memoizedState = Xr(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function ci(e, t, s, o) {
    var l = mt();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (Pe !== null) {
      var f = Pe.memoizedState;
      if (c = f.destroy, o !== null && pa(o, f.deps)) {
        l.memoizedState = Xr(t, s, c, o);
        return;
      }
    }
    ke.flags |= e, l.memoizedState = Xr(1 | t, s, c, o);
  }
  function kc(e, t) {
    return ui(8390656, 8, e, t);
  }
  function _a(e, t) {
    return ci(2048, 8, e, t);
  }
  function bc(e, t) {
    return ci(4, 2, e, t);
  }
  function Cc(e, t) {
    return ci(4, 4, e, t);
  }
  function Tc(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Ic(e, t, s) {
    return s = s != null ? s.concat([e]) : null, ci(4, 4, Tc.bind(null, t, e), s);
  }
  function wa() {
  }
  function Rc(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && pa(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function Ac(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && pa(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function Mc(e, t, s) {
    return (Tn & 21) === 0 ? (e.baseState && (e.baseState = !1, tt = !0), e.memoizedState = s) : (wt(s, t) || (s = au(), ke.lanes |= s, In |= s, e.baseState = !0), t);
  }
  function dm(e, t) {
    var s = me;
    me = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = ha.transition;
    ha.transition = {};
    try {
      e(!1), t();
    } finally {
      me = s, ha.transition = o;
    }
  }
  function Nc() {
    return mt().memoizedState;
  }
  function fm(e, t, s) {
    var o = pn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, Pc(e)) jc(t, s);
    else if (s = cc(e, t, s, o), s !== null) {
      var l = qe();
      bt(s, e, o, l), Lc(s, t, o);
    }
  }
  function hm(e, t, s) {
    var o = pn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Pc(e)) jc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var f = t.lastRenderedState, y = c(f, s);
        if (l.hasEagerState = !0, l.eagerState = y, wt(y, f)) {
          var S = t.interleaved;
          S === null ? (l.next = l, aa(t)) : (l.next = S.next, S.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = cc(e, t, l, o), s !== null && (l = qe(), bt(s, e, o, l), Lc(s, t, o));
    }
  }
  function Pc(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function jc(e, t) {
    qr = li = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Lc(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, xo(e, s);
    }
  }
  var di = { readContext: pt, useCallback: Ve, useContext: Ve, useEffect: Ve, useImperativeHandle: Ve, useInsertionEffect: Ve, useLayoutEffect: Ve, useMemo: Ve, useReducer: Ve, useRef: Ve, useState: Ve, useDebugValue: Ve, useDeferredValue: Ve, useTransition: Ve, useMutableSource: Ve, useSyncExternalStore: Ve, useId: Ve, unstable_isNewReconciler: !1 }, pm = { readContext: pt, useCallback: function(e, t) {
    return Lt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: pt, useEffect: kc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, ui(
      4194308,
      4,
      Tc.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return ui(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ui(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = Lt();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = Lt();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = fm.bind(null, ke, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Lt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: xc, useDebugValue: wa, useDeferredValue: function(e) {
    return Lt().memoizedState = e;
  }, useTransition: function() {
    var e = xc(!1), t = e[0];
    return e = dm.bind(null, e[1]), Lt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = ke, l = Lt();
    if (xe) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), Fe === null) throw Error(i(349));
      (Tn & 30) !== 0 || yc(o, t, s);
    }
    l.memoizedState = s;
    var c = { value: s, getSnapshot: t };
    return l.queue = c, kc(_c.bind(
      null,
      o,
      c,
      e
    ), [e]), o.flags |= 2048, Xr(9, vc.bind(null, o, c, s, t), void 0, null), s;
  }, useId: function() {
    var e = Lt(), t = Fe.identifierPrefix;
    if (xe) {
      var s = Vt, o = Ht;
      s = (o & ~(1 << 32 - _t(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = Kr++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = cm++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, mm = {
    readContext: pt,
    useCallback: Rc,
    useContext: pt,
    useEffect: _a,
    useImperativeHandle: Ic,
    useInsertionEffect: bc,
    useLayoutEffect: Cc,
    useMemo: Ac,
    useReducer: ya,
    useRef: Ec,
    useState: function() {
      return ya(Jr);
    },
    useDebugValue: wa,
    useDeferredValue: function(e) {
      var t = mt();
      return Mc(t, Pe.memoizedState, e);
    },
    useTransition: function() {
      var e = ya(Jr)[0], t = mt().memoizedState;
      return [e, t];
    },
    useMutableSource: mc,
    useSyncExternalStore: gc,
    useId: Nc,
    unstable_isNewReconciler: !1
  }, gm = { readContext: pt, useCallback: Rc, useContext: pt, useEffect: _a, useImperativeHandle: Ic, useInsertionEffect: bc, useLayoutEffect: Cc, useMemo: Ac, useReducer: va, useRef: Ec, useState: function() {
    return va(Jr);
  }, useDebugValue: wa, useDeferredValue: function(e) {
    var t = mt();
    return Pe === null ? t.memoizedState = e : Mc(t, Pe.memoizedState, e);
  }, useTransition: function() {
    var e = va(Jr)[0], t = mt().memoizedState;
    return [e, t];
  }, useMutableSource: mc, useSyncExternalStore: gc, useId: Nc, unstable_isNewReconciler: !1 };
  function xt(e, t) {
    if (e && e.defaultProps) {
      t = F({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function Sa(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : F({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var fi = { isMounted: function(e) {
    return (e = e._reactInternals) ? wn(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = qe(), l = pn(e), c = Yt(o, l);
    c.payload = t, s != null && (c.callback = s), t = cn(e, c, l), t !== null && (bt(t, e, l, o), si(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = qe(), l = pn(e), c = Yt(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = cn(e, c, l), t !== null && (bt(t, e, l, o), si(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = qe(), o = pn(e), l = Yt(s, o);
    l.tag = 2, t != null && (l.callback = t), t = cn(e, l, o), t !== null && (bt(t, e, o, s), si(t, e, o));
  } };
  function Oc(e, t, s, o, l, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, f) : t.prototype && t.prototype.isPureReactComponent ? !Dr(s, o) || !Dr(l, c) : !0;
  }
  function zc(e, t, s) {
    var o = !1, l = an, c = t.contextType;
    return typeof c == "object" && c !== null ? c = pt(c) : (l = et(t) ? xn : He.current, o = t.contextTypes, c = (o = o != null) ? Zn(e, l) : an), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = fi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Dc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && fi.enqueueReplaceState(t, t.state, null);
  }
  function xa(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, la(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = pt(c) : (c = et(t) ? xn : He.current, l.context = Zn(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Sa(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && fi.enqueueReplaceState(l, l.state, null), ii(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function ar(e, t) {
    try {
      var s = "", o = t;
      do
        s += X(o), o = o.return;
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
  var ym = typeof WeakMap == "function" ? WeakMap : Map;
  function Fc(e, t, s) {
    s = Yt(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      _i || (_i = !0, Fa = o), ka(e, t);
    }, s;
  }
  function Bc(e, t, s) {
    s = Yt(-1, s), s.tag = 3;
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
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), s;
  }
  function Uc(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new ym();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = Mm.bind(null, e, t, s), t.then(e, e));
  }
  function $c(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Hc(e, t, s, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = Yt(-1, 1), t.tag = 2, cn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var vm = le.ReactCurrentOwner, tt = !1;
  function Ge(e, t, s, o) {
    t.child = e === null ? uc(t, null, s, o) : rr(t, e.child, s, o);
  }
  function Vc(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return ir(t, l), o = ma(e, t, s, o, c, l), s = ga(), e !== null && !tt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qt(e, t, l)) : (xe && s && Xo(t), t.flags |= 1, Ge(e, t, o, l), t.child);
  }
  function Wc(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !Ya(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, Yc(e, t, c, o, l)) : (e = bi(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var f = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Dr, s(f, o) && e.ref === t.ref) return Qt(e, t, l);
    }
    return t.flags |= 1, e = gn(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Yc(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Dr(c, o) && e.ref === t.ref) if (tt = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (tt = !0);
      else return t.lanes = e.lanes, Qt(e, t, l);
    }
    return ba(e, t, s, o, l);
  }
  function Qc(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ve(ur, ut), ut |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ve(ur, ut), ut |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, ve(ur, ut), ut |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, ve(ur, ut), ut |= o;
    return Ge(e, t, l, s), t.child;
  }
  function Gc(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ba(e, t, s, o, l) {
    var c = et(s) ? xn : He.current;
    return c = Zn(t, c), ir(t, l), s = ma(e, t, s, o, c, l), o = ga(), e !== null && !tt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qt(e, t, l)) : (xe && o && Xo(t), t.flags |= 1, Ge(e, t, s, l), t.child);
  }
  function qc(e, t, s, o, l) {
    if (et(s)) {
      var c = !0;
      Ks(t);
    } else c = !1;
    if (ir(t, l), t.stateNode === null) pi(e, t), zc(t, s, o), xa(t, s, o, l), o = !0;
    else if (e === null) {
      var f = t.stateNode, y = t.memoizedProps;
      f.props = y;
      var S = f.context, I = s.contextType;
      typeof I == "object" && I !== null ? I = pt(I) : (I = et(s) ? xn : He.current, I = Zn(t, I));
      var P = s.getDerivedStateFromProps, L = typeof P == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      L || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== o || S !== I) && Dc(t, f, o, I), un = !1;
      var M = t.memoizedState;
      f.state = M, ii(t, o, f, l), S = t.memoizedState, y !== o || M !== S || Ze.current || un ? (typeof P == "function" && (Sa(t, s, P, o), S = t.memoizedState), (y = un || Oc(t, s, y, o, M, S, I)) ? (L || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = S), f.props = o, f.state = S, f.context = I, o = y) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, dc(e, t), y = t.memoizedProps, I = t.type === t.elementType ? y : xt(t.type, y), f.props = I, L = t.pendingProps, M = f.context, S = s.contextType, typeof S == "object" && S !== null ? S = pt(S) : (S = et(s) ? xn : He.current, S = Zn(t, S));
      var D = s.getDerivedStateFromProps;
      (P = typeof D == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== L || M !== S) && Dc(t, f, o, S), un = !1, M = t.memoizedState, f.state = M, ii(t, o, f, l);
      var H = t.memoizedState;
      y !== L || M !== H || Ze.current || un ? (typeof D == "function" && (Sa(t, s, D, o), H = t.memoizedState), (I = un || Oc(t, s, I, o, M, H, S) || !1) ? (P || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, H, S), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, H, S)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = H), f.props = o, f.state = H, f.context = S, o = I) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Ca(e, t, s, o, c, l);
  }
  function Ca(e, t, s, o, l, c) {
    Gc(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return l && ec(t, s, !1), Qt(e, t, c);
    o = t.stateNode, vm.current = t;
    var y = f && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = rr(t, e.child, null, c), t.child = rr(t, null, y, c)) : Ge(e, t, y, c), t.memoizedState = o.state, l && ec(t, s, !0), t.child;
  }
  function Kc(e) {
    var t = e.stateNode;
    t.pendingContext ? Xu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Xu(e, t.context, !1), ua(e, t.containerInfo);
  }
  function Jc(e, t, s, o, l) {
    return nr(), na(l), t.flags |= 256, Ge(e, t, s, o), t.child;
  }
  var Ta = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ia(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Xc(e, t, s) {
    var o = t.pendingProps, l = Ee.current, c = !1, f = (t.flags & 128) !== 0, y;
    if ((y = f) || (y = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), y ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), ve(Ee, l & 1), e === null)
      return ta(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = f) : c = Ci(f, o, 0, null), e = Nn(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = Ia(s), t.memoizedState = Ta, e) : Ra(t, f));
    if (l = e.memoizedState, l !== null && (y = l.dehydrated, y !== null)) return _m(e, t, f, o, y, l, s);
    if (c) {
      c = o.fallback, f = t.mode, l = e.child, y = l.sibling;
      var S = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = S, t.deletions = null) : (o = gn(l, S), o.subtreeFlags = l.subtreeFlags & 14680064), y !== null ? c = gn(y, c) : (c = Nn(c, f, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, f = e.child.memoizedState, f = f === null ? Ia(s) : { baseLanes: f.baseLanes | s, cachePool: null, transitions: f.transitions }, c.memoizedState = f, c.childLanes = e.childLanes & ~s, t.memoizedState = Ta, o;
    }
    return c = e.child, e = c.sibling, o = gn(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Ra(e, t) {
    return t = Ci({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function hi(e, t, s, o) {
    return o !== null && na(o), rr(t, e.child, null, s), e = Ra(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function _m(e, t, s, o, l, c, f) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = Ea(Error(i(422))), hi(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Ci({ mode: "visible", children: o.children }, l, 0, null), c = Nn(c, l, f, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && rr(t, e.child, null, f), t.child.memoizedState = Ia(f), t.memoizedState = Ta, c);
    if ((t.mode & 1) === 0) return hi(e, t, f, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var y = o.dgst;
      return o = y, c = Error(i(419)), o = Ea(c, o, void 0), hi(e, t, f, o);
    }
    if (y = (f & e.childLanes) !== 0, tt || y) {
      if (o = Fe, o !== null) {
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
        l = (l & (o.suspendedLanes | f)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Wt(e, l), bt(o, e, l, -1));
      }
      return Wa(), o = Ea(Error(i(421))), hi(e, t, f, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Nm.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, lt = sn(l.nextSibling), at = t, xe = !0, St = null, e !== null && (ft[ht++] = Ht, ft[ht++] = Vt, ft[ht++] = En, Ht = e.id, Vt = e.overflow, En = t), t = Ra(t, o.children), t.flags |= 4096, t);
  }
  function Zc(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), oa(e.return, t, s);
  }
  function Aa(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function ed(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (Ge(e, t, o.children, s), o = Ee.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Zc(e, s, t);
        else if (e.tag === 19) Zc(e, s, t);
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
    if (ve(Ee, o), (t.mode & 1) === 0) t.memoizedState = null;
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
  function Qt(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), In |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = gn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = gn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function wm(e, t, s) {
    switch (t.tag) {
      case 3:
        Kc(t), nr();
        break;
      case 5:
        pc(t);
        break;
      case 1:
        et(t.type) && Ks(t);
        break;
      case 4:
        ua(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        ve(ni, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (ve(Ee, Ee.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? Xc(e, t, s) : (ve(Ee, Ee.current & 1), e = Qt(e, t, s), e !== null ? e.sibling : null);
        ve(Ee, Ee.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return ed(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), ve(Ee, Ee.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Qc(e, t, s);
    }
    return Qt(e, t, s);
  }
  var td, Ma, nd, rd;
  td = function(e, t) {
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
  }, nd = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, Cn(jt.current);
      var c = null;
      switch (s) {
        case "input":
          l = io(e, l), o = io(e, o), c = [];
          break;
        case "select":
          l = F({}, l, { value: void 0 }), o = F({}, o, { value: void 0 }), c = [];
          break;
        case "textarea":
          l = lo(e, l), o = lo(e, o), c = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Qs);
      }
      co(s, o);
      var f;
      s = null;
      for (I in l) if (!o.hasOwnProperty(I) && l.hasOwnProperty(I) && l[I] != null) if (I === "style") {
        var y = l[I];
        for (f in y) y.hasOwnProperty(f) && (s || (s = {}), s[f] = "");
      } else I !== "dangerouslySetInnerHTML" && I !== "children" && I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && I !== "autoFocus" && (u.hasOwnProperty(I) ? c || (c = []) : (c = c || []).push(I, null));
      for (I in o) {
        var S = o[I];
        if (y = l?.[I], o.hasOwnProperty(I) && S !== y && (S != null || y != null)) if (I === "style") if (y) {
          for (f in y) !y.hasOwnProperty(f) || S && S.hasOwnProperty(f) || (s || (s = {}), s[f] = "");
          for (f in S) S.hasOwnProperty(f) && y[f] !== S[f] && (s || (s = {}), s[f] = S[f]);
        } else s || (c || (c = []), c.push(
          I,
          s
        )), s = S;
        else I === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, y = y ? y.__html : void 0, S != null && y !== S && (c = c || []).push(I, S)) : I === "children" ? typeof S != "string" && typeof S != "number" || (c = c || []).push(I, "" + S) : I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && (u.hasOwnProperty(I) ? (S != null && I === "onScroll" && _e("scroll", e), c || y === S || (c = [])) : (c = c || []).push(I, S));
      }
      s && (c = c || []).push("style", s);
      var I = c;
      (t.updateQueue = I) && (t.flags |= 4);
    }
  }, rd = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function Zr(e, t) {
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
  function We(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = s, t;
  }
  function Sm(e, t, s) {
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
        return We(t), null;
      case 1:
        return et(t.type) && qs(), We(t), null;
      case 3:
        return o = t.stateNode, or(), we(Ze), we(He), fa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (ei(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, St !== null && ($a(St), St = null))), Ma(e, t), We(t), null;
      case 5:
        ca(t);
        var l = Cn(Gr.current);
        if (s = t.type, e !== null && t.stateNode != null) nd(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return We(t), null;
          }
          if (e = Cn(jt.current), ei(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[Pt] = t, o[Hr] = c, e = (t.mode & 1) !== 0, s) {
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
                for (l = 0; l < Br.length; l++) _e(Br[l], o);
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
                zl(o, c), _e("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, _e("invalid", o);
                break;
              case "textarea":
                Bl(o, c), _e("invalid", o);
            }
            co(s, c), l = null;
            for (var f in c) if (c.hasOwnProperty(f)) {
              var y = c[f];
              f === "children" ? typeof y == "string" ? o.textContent !== y && (c.suppressHydrationWarning !== !0 && Ys(o.textContent, y, e), l = ["children", y]) : typeof y == "number" && o.textContent !== "" + y && (c.suppressHydrationWarning !== !0 && Ys(
                o.textContent,
                y,
                e
              ), l = ["children", "" + y]) : u.hasOwnProperty(f) && y != null && f === "onScroll" && _e("scroll", o);
            }
            switch (s) {
              case "input":
                _n(o), Fl(o, c, !0);
                break;
              case "textarea":
                _n(o), $l(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = Qs);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            f = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Hl(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(s, { is: o.is }) : (e = f.createElement(s), s === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, s), e[Pt] = t, e[Hr] = o, td(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = fo(s, o), s) {
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
                  for (l = 0; l < Br.length; l++) _e(Br[l], e);
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
                  zl(e, o), l = io(e, o), _e("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = F({}, o, { value: void 0 }), _e("invalid", e);
                  break;
                case "textarea":
                  Bl(e, o), l = lo(e, o), _e("invalid", e);
                  break;
                default:
                  l = o;
              }
              co(s, l), y = l;
              for (c in y) if (y.hasOwnProperty(c)) {
                var S = y[c];
                c === "style" ? Yl(e, S) : c === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, S != null && Vl(e, S)) : c === "children" ? typeof S == "string" ? (s !== "textarea" || S !== "") && Sr(e, S) : typeof S == "number" && Sr(e, "" + S) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? S != null && c === "onScroll" && _e("scroll", e) : S != null && ee(e, c, S, f));
              }
              switch (s) {
                case "input":
                  _n(e), Fl(e, o, !1);
                  break;
                case "textarea":
                  _n(e), $l(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ie(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, c = o.value, c != null ? Un(e, !!o.multiple, c, !1) : o.defaultValue != null && Un(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Qs);
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
        return We(t), null;
      case 6:
        if (e && t.stateNode != null) rd(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = Cn(Gr.current), Cn(jt.current), ei(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[Pt] = t, (c = o.nodeValue !== s) && (e = at, e !== null)) switch (e.tag) {
              case 3:
                Ys(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Ys(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[Pt] = t, t.stateNode = o;
        }
        return We(t), null;
      case 13:
        if (we(Ee), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (xe && lt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) oc(), nr(), t.flags |= 98560, c = !1;
          else if (c = ei(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[Pt] = t;
            } else nr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            We(t), c = !1;
          } else St !== null && ($a(St), St = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Ee.current & 1) !== 0 ? je === 0 && (je = 3) : Wa())), t.updateQueue !== null && (t.flags |= 4), We(t), null);
      case 4:
        return or(), Ma(e, t), e === null && Ur(t.stateNode.containerInfo), We(t), null;
      case 10:
        return ia(t.type._context), We(t), null;
      case 17:
        return et(t.type) && qs(), We(t), null;
      case 19:
        if (we(Ee), c = t.memoizedState, c === null) return We(t), null;
        if (o = (t.flags & 128) !== 0, f = c.rendering, f === null) if (o) Zr(c, !1);
        else {
          if (je !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = oi(e), f !== null) {
              for (t.flags |= 128, Zr(c, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, f = c.alternate, f === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f.childLanes, c.lanes = f.lanes, c.child = f.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f.memoizedProps, c.memoizedState = f.memoizedState, c.updateQueue = f.updateQueue, c.type = f.type, e = f.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return ve(Ee, Ee.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && Ae() > cr && (t.flags |= 128, o = !0, Zr(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = oi(f), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), Zr(c, !0), c.tail === null && c.tailMode === "hidden" && !f.alternate && !xe) return We(t), null;
          } else 2 * Ae() - c.renderingStartTime > cr && s !== 1073741824 && (t.flags |= 128, o = !0, Zr(c, !1), t.lanes = 4194304);
          c.isBackwards ? (f.sibling = t.child, t.child = f) : (s = c.last, s !== null ? s.sibling = f : t.child = f, c.last = f);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = Ae(), t.sibling = null, s = Ee.current, ve(Ee, o ? s & 1 | 2 : s & 1), t) : (We(t), null);
      case 22:
      case 23:
        return Va(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (ut & 1073741824) !== 0 && (We(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : We(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function xm(e, t) {
    switch (Zo(t), t.tag) {
      case 1:
        return et(t.type) && qs(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return or(), we(Ze), we(He), fa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ca(t), null;
      case 13:
        if (we(Ee), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          nr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return we(Ee), null;
      case 4:
        return or(), null;
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
  var mi = !1, Ye = !1, Em = typeof WeakSet == "function" ? WeakSet : Set, $ = null;
  function lr(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      Te(e, t, o);
    }
    else s.current = null;
  }
  function Na(e, t, s) {
    try {
      s();
    } catch (o) {
      Te(e, t, o);
    }
  }
  var sd = !1;
  function km(e, t) {
    if (Vo = Ls, e = Ou(), Oo(e)) {
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
          var f = 0, y = -1, S = -1, I = 0, P = 0, L = e, M = null;
          t: for (; ; ) {
            for (var D; L !== s || l !== 0 && L.nodeType !== 3 || (y = f + l), L !== c || o !== 0 && L.nodeType !== 3 || (S = f + o), L.nodeType === 3 && (f += L.nodeValue.length), (D = L.firstChild) !== null; )
              M = L, L = D;
            for (; ; ) {
              if (L === e) break t;
              if (M === s && ++I === l && (y = f), M === c && ++P === o && (S = f), (D = L.nextSibling) !== null) break;
              L = M, M = L.parentNode;
            }
            L = D;
          }
          s = y === -1 || S === -1 ? null : { start: y, end: S };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (Wo = { focusedElem: e, selectionRange: s }, Ls = !1, $ = t; $ !== null; ) if (t = $, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, $ = e;
    else for (; $ !== null; ) {
      t = $;
      try {
        var H = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (H !== null) {
              var V = H.memoizedProps, Me = H.memoizedState, C = t.stateNode, x = C.getSnapshotBeforeUpdate(t.elementType === t.type ? V : xt(t.type, V), Me);
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
        Te(t, t.return, z);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, $ = e;
        break;
      }
      $ = t.return;
    }
    return H = sd, sd = !1, H;
  }
  function es(e, t, s) {
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
  function id(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, id(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Pt], delete t[Hr], delete t[qo], delete t[om], delete t[am])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function od(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ad(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || od(e.return)) return null;
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
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = Qs));
    else if (o !== 4 && (e = e.child, e !== null)) for (ja(e, t, s), e = e.sibling; e !== null; ) ja(e, t, s), e = e.sibling;
  }
  function La(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (La(e, t, s), e = e.sibling; e !== null; ) La(e, t, s), e = e.sibling;
  }
  var Ue = null, Et = !1;
  function dn(e, t, s) {
    for (s = s.child; s !== null; ) ld(e, t, s), s = s.sibling;
  }
  function ld(e, t, s) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
      Nt.onCommitFiberUnmount(Rs, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        Ye || lr(s, t);
      case 6:
        var o = Ue, l = Et;
        Ue = null, dn(e, t, s), Ue = o, Et = l, Ue !== null && (Et ? (e = Ue, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : Ue.removeChild(s.stateNode));
        break;
      case 18:
        Ue !== null && (Et ? (e = Ue, s = s.stateNode, e.nodeType === 8 ? Go(e.parentNode, s) : e.nodeType === 1 && Go(e, s), Nr(e)) : Go(Ue, s.stateNode));
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
            var c = l, f = c.destroy;
            c = c.tag, f !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && Na(s, t, f), l = l.next;
          } while (l !== o);
        }
        dn(e, t, s);
        break;
      case 1:
        if (!Ye && (lr(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
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
  function ud(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Em()), t.forEach(function(o) {
        var l = Pm.bind(null, e, o);
        s.has(o) || (s.add(o), o.then(l, l));
      });
    }
  }
  function kt(e, t) {
    var s = t.deletions;
    if (s !== null) for (var o = 0; o < s.length; o++) {
      var l = s[o];
      try {
        var c = e, f = t, y = f;
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
        ld(c, f, l), Ue = null, Et = !1;
        var S = l.alternate;
        S !== null && (S.return = null), l.return = null;
      } catch (I) {
        Te(l, t, I);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) cd(t, e), t = t.sibling;
  }
  function cd(e, t) {
    var s = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (kt(t, e), Ot(e), o & 4) {
          try {
            es(3, e, e.return), gi(3, e);
          } catch (V) {
            Te(e, e.return, V);
          }
          try {
            es(5, e, e.return);
          } catch (V) {
            Te(e, e.return, V);
          }
        }
        break;
      case 1:
        kt(t, e), Ot(e), o & 512 && s !== null && lr(s, s.return);
        break;
      case 5:
        if (kt(t, e), Ot(e), o & 512 && s !== null && lr(s, s.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Sr(l, "");
          } catch (V) {
            Te(e, e.return, V);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, f = s !== null ? s.memoizedProps : c, y = e.type, S = e.updateQueue;
          if (e.updateQueue = null, S !== null) try {
            y === "input" && c.type === "radio" && c.name != null && Dl(l, c), fo(y, f);
            var I = fo(y, c);
            for (f = 0; f < S.length; f += 2) {
              var P = S[f], L = S[f + 1];
              P === "style" ? Yl(l, L) : P === "dangerouslySetInnerHTML" ? Vl(l, L) : P === "children" ? Sr(l, L) : ee(l, P, L, I);
            }
            switch (y) {
              case "input":
                oo(l, c);
                break;
              case "textarea":
                Ul(l, c);
                break;
              case "select":
                var M = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var D = c.value;
                D != null ? Un(l, !!c.multiple, D, !1) : M !== !!c.multiple && (c.defaultValue != null ? Un(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : Un(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[Hr] = c;
          } catch (V) {
            Te(e, e.return, V);
          }
        }
        break;
      case 6:
        if (kt(t, e), Ot(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (V) {
            Te(e, e.return, V);
          }
        }
        break;
      case 3:
        if (kt(t, e), Ot(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Nr(t.containerInfo);
        } catch (V) {
          Te(e, e.return, V);
        }
        break;
      case 4:
        kt(t, e), Ot(e);
        break;
      case 13:
        kt(t, e), Ot(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Da = Ae())), o & 4 && ud(e);
        break;
      case 22:
        if (P = s !== null && s.memoizedState !== null, e.mode & 1 ? (Ye = (I = Ye) || P, kt(t, e), Ye = I) : kt(t, e), Ot(e), o & 8192) {
          if (I = e.memoizedState !== null, (e.stateNode.isHidden = I) && !P && (e.mode & 1) !== 0) for ($ = e, P = e.child; P !== null; ) {
            for (L = $ = P; $ !== null; ) {
              switch (M = $, D = M.child, M.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  es(4, M, M.return);
                  break;
                case 1:
                  lr(M, M.return);
                  var H = M.stateNode;
                  if (typeof H.componentWillUnmount == "function") {
                    o = M, s = M.return;
                    try {
                      t = o, H.props = t.memoizedProps, H.state = t.memoizedState, H.componentWillUnmount();
                    } catch (V) {
                      Te(o, s, V);
                    }
                  }
                  break;
                case 5:
                  lr(M, M.return);
                  break;
                case 22:
                  if (M.memoizedState !== null) {
                    hd(L);
                    continue;
                  }
              }
              D !== null ? (D.return = M, $ = D) : hd(L);
            }
            P = P.sibling;
          }
          e: for (P = null, L = e; ; ) {
            if (L.tag === 5) {
              if (P === null) {
                P = L;
                try {
                  l = L.stateNode, I ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (y = L.stateNode, S = L.memoizedProps.style, f = S != null && S.hasOwnProperty("display") ? S.display : null, y.style.display = Wl("display", f));
                } catch (V) {
                  Te(e, e.return, V);
                }
              }
            } else if (L.tag === 6) {
              if (P === null) try {
                L.stateNode.nodeValue = I ? "" : L.memoizedProps;
              } catch (V) {
                Te(e, e.return, V);
              }
            } else if ((L.tag !== 22 && L.tag !== 23 || L.memoizedState === null || L === e) && L.child !== null) {
              L.child.return = L, L = L.child;
              continue;
            }
            if (L === e) break e;
            for (; L.sibling === null; ) {
              if (L.return === null || L.return === e) break e;
              P === L && (P = null), L = L.return;
            }
            P === L && (P = null), L.sibling.return = L.return, L = L.sibling;
          }
        }
        break;
      case 19:
        kt(t, e), Ot(e), o & 4 && ud(e);
        break;
      case 21:
        break;
      default:
        kt(
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
            if (od(s)) {
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
            o.flags & 32 && (Sr(l, ""), o.flags &= -33);
            var c = ad(e);
            La(e, c, l);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, y = ad(e);
            ja(e, y, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (S) {
        Te(e, e.return, S);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function bm(e, t, s) {
    $ = e, dd(e);
  }
  function dd(e, t, s) {
    for (var o = (e.mode & 1) !== 0; $ !== null; ) {
      var l = $, c = l.child;
      if (l.tag === 22 && o) {
        var f = l.memoizedState !== null || mi;
        if (!f) {
          var y = l.alternate, S = y !== null && y.memoizedState !== null || Ye;
          y = mi;
          var I = Ye;
          if (mi = f, (Ye = S) && !I) for ($ = l; $ !== null; ) f = $, S = f.child, f.tag === 22 && f.memoizedState !== null ? pd(l) : S !== null ? (S.return = f, $ = S) : pd(l);
          for (; c !== null; ) $ = c, dd(c), c = c.sibling;
          $ = l, mi = y, Ye = I;
        }
        fd(e);
      } else (l.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = l, $ = c) : fd(e);
    }
  }
  function fd(e) {
    for (; $ !== null; ) {
      var t = $;
      if ((t.flags & 8772) !== 0) {
        var s = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ye || gi(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !Ye) if (s === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? s.memoizedProps : xt(t.type, s.memoizedProps);
                o.componentDidUpdate(l, s.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var c = t.updateQueue;
              c !== null && hc(t, c, o);
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
                hc(t, f, s);
              }
              break;
            case 5:
              var y = t.stateNode;
              if (s === null && t.flags & 4) {
                s = y;
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
                var I = t.alternate;
                if (I !== null) {
                  var P = I.memoizedState;
                  if (P !== null) {
                    var L = P.dehydrated;
                    L !== null && Nr(L);
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
          Ye || t.flags & 512 && Pa(t);
        } catch (M) {
          Te(t, t.return, M);
        }
      }
      if (t === e) {
        $ = null;
        break;
      }
      if (s = t.sibling, s !== null) {
        s.return = t.return, $ = s;
        break;
      }
      $ = t.return;
    }
  }
  function hd(e) {
    for (; $ !== null; ) {
      var t = $;
      if (t === e) {
        $ = null;
        break;
      }
      var s = t.sibling;
      if (s !== null) {
        s.return = t.return, $ = s;
        break;
      }
      $ = t.return;
    }
  }
  function pd(e) {
    for (; $ !== null; ) {
      var t = $;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              gi(4, t);
            } catch (S) {
              Te(t, s, S);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (S) {
                Te(t, l, S);
              }
            }
            var c = t.return;
            try {
              Pa(t);
            } catch (S) {
              Te(t, c, S);
            }
            break;
          case 5:
            var f = t.return;
            try {
              Pa(t);
            } catch (S) {
              Te(t, f, S);
            }
        }
      } catch (S) {
        Te(t, t.return, S);
      }
      if (t === e) {
        $ = null;
        break;
      }
      var y = t.sibling;
      if (y !== null) {
        y.return = t.return, $ = y;
        break;
      }
      $ = t.return;
    }
  }
  var Cm = Math.ceil, yi = le.ReactCurrentDispatcher, Oa = le.ReactCurrentOwner, gt = le.ReactCurrentBatchConfig, fe = 0, Fe = null, Ne = null, $e = 0, ut = 0, ur = on(0), je = 0, ts = null, In = 0, vi = 0, za = 0, ns = null, nt = null, Da = 0, cr = 1 / 0, Gt = null, _i = !1, Fa = null, fn = null, wi = !1, hn = null, Si = 0, rs = 0, Ba = null, xi = -1, Ei = 0;
  function qe() {
    return (fe & 6) !== 0 ? Ae() : xi !== -1 ? xi : xi = Ae();
  }
  function pn(e) {
    return (e.mode & 1) === 0 ? 1 : (fe & 2) !== 0 && $e !== 0 ? $e & -$e : um.transition !== null ? (Ei === 0 && (Ei = au()), Ei) : (e = me, e !== 0 || (e = window.event, e = e === void 0 ? 16 : gu(e.type)), e);
  }
  function bt(e, t, s, o) {
    if (50 < rs) throw rs = 0, Ba = null, Error(i(185));
    Tr(e, s, o), ((fe & 2) === 0 || e !== Fe) && (e === Fe && ((fe & 2) === 0 && (vi |= s), je === 4 && mn(e, $e)), rt(e, o), s === 1 && fe === 0 && (t.mode & 1) === 0 && (cr = Ae() + 500, Js && ln()));
  }
  function rt(e, t) {
    var s = e.callbackNode;
    up(e, t);
    var o = Ns(e, e === Fe ? $e : 0);
    if (o === 0) s !== null && su(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && su(s), t === 1) e.tag === 0 ? lm(gd.bind(null, e)) : tc(gd.bind(null, e)), sm(function() {
        (fe & 6) === 0 && ln();
      }), s = null;
      else {
        switch (lu(o)) {
          case 1:
            s = _o;
            break;
          case 4:
            s = iu;
            break;
          case 16:
            s = Is;
            break;
          case 536870912:
            s = ou;
            break;
          default:
            s = Is;
        }
        s = kd(s, md.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function md(e, t) {
    if (xi = -1, Ei = 0, (fe & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (dr() && e.callbackNode !== s) return null;
    var o = Ns(e, e === Fe ? $e : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = ki(e, o);
    else {
      t = o;
      var l = fe;
      fe |= 2;
      var c = vd();
      (Fe !== e || $e !== t) && (Gt = null, cr = Ae() + 500, An(e, t));
      do
        try {
          Rm();
          break;
        } catch (y) {
          yd(e, y);
        }
      while (!0);
      sa(), yi.current = c, fe = l, Ne !== null ? t = 0 : (Fe = null, $e = 0, t = je);
    }
    if (t !== 0) {
      if (t === 2 && (l = wo(e), l !== 0 && (o = l, t = Ua(e, l))), t === 1) throw s = ts, An(e, 0), mn(e, o), rt(e, Ae()), s;
      if (t === 6) mn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !Tm(l) && (t = ki(e, o), t === 2 && (c = wo(e), c !== 0 && (o = c, t = Ua(e, c))), t === 1)) throw s = ts, An(e, 0), mn(e, o), rt(e, Ae()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            Mn(e, nt, Gt);
            break;
          case 3:
            if (mn(e, o), (o & 130023424) === o && (t = Da + 500 - Ae(), 10 < t)) {
              if (Ns(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                qe(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Qo(Mn.bind(null, e, nt, Gt), t);
              break;
            }
            Mn(e, nt, Gt);
            break;
          case 4:
            if (mn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var f = 31 - _t(o);
              c = 1 << f, f = t[f], f > l && (l = f), o &= ~c;
            }
            if (o = l, o = Ae() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Cm(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = Qo(Mn.bind(null, e, nt, Gt), o);
              break;
            }
            Mn(e, nt, Gt);
            break;
          case 5:
            Mn(e, nt, Gt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return rt(e, Ae()), e.callbackNode === s ? md.bind(null, e) : null;
  }
  function Ua(e, t) {
    var s = ns;
    return e.current.memoizedState.isDehydrated && (An(e, t).flags |= 256), e = ki(e, t), e !== 2 && (t = nt, nt = s, t !== null && $a(t)), e;
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
            if (!wt(c(), l)) return !1;
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
      var s = 31 - _t(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function gd(e) {
    if ((fe & 6) !== 0) throw Error(i(327));
    dr();
    var t = Ns(e, 0);
    if ((t & 1) === 0) return rt(e, Ae()), null;
    var s = ki(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = wo(e);
      o !== 0 && (t = o, s = Ua(e, o));
    }
    if (s === 1) throw s = ts, An(e, 0), mn(e, t), rt(e, Ae()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Mn(e, nt, Gt), rt(e, Ae()), null;
  }
  function Ha(e, t) {
    var s = fe;
    fe |= 1;
    try {
      return e(t);
    } finally {
      fe = s, fe === 0 && (cr = Ae() + 500, Js && ln());
    }
  }
  function Rn(e) {
    hn !== null && hn.tag === 0 && (fe & 6) === 0 && dr();
    var t = fe;
    fe |= 1;
    var s = gt.transition, o = me;
    try {
      if (gt.transition = null, me = 1, e) return e();
    } finally {
      me = o, gt.transition = s, fe = t, (fe & 6) === 0 && ln();
    }
  }
  function Va() {
    ut = ur.current, we(ur);
  }
  function An(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, rm(s)), Ne !== null) for (s = Ne.return; s !== null; ) {
      var o = s;
      switch (Zo(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && qs();
          break;
        case 3:
          or(), we(Ze), we(He), fa();
          break;
        case 5:
          ca(o);
          break;
        case 4:
          or();
          break;
        case 13:
          we(Ee);
          break;
        case 19:
          we(Ee);
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
    if (Fe = e, Ne = e = gn(e.current, null), $e = ut = t, je = 0, ts = null, za = vi = In = 0, nt = ns = null, bn !== null) {
      for (t = 0; t < bn.length; t++) if (s = bn[t], o = s.interleaved, o !== null) {
        s.interleaved = null;
        var l = o.next, c = s.pending;
        if (c !== null) {
          var f = c.next;
          c.next = l, o.next = f;
        }
        s.pending = o;
      }
      bn = null;
    }
    return e;
  }
  function yd(e, t) {
    do {
      var s = Ne;
      try {
        if (sa(), ai.current = di, li) {
          for (var o = ke.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          li = !1;
        }
        if (Tn = 0, De = Pe = ke = null, qr = !1, Kr = 0, Oa.current = null, s === null || s.return === null) {
          je = 1, ts = t, Ne = null;
          break;
        }
        e: {
          var c = e, f = s.return, y = s, S = t;
          if (t = $e, y.flags |= 32768, S !== null && typeof S == "object" && typeof S.then == "function") {
            var I = S, P = y, L = P.tag;
            if ((P.mode & 1) === 0 && (L === 0 || L === 11 || L === 15)) {
              var M = P.alternate;
              M ? (P.updateQueue = M.updateQueue, P.memoizedState = M.memoizedState, P.lanes = M.lanes) : (P.updateQueue = null, P.memoizedState = null);
            }
            var D = $c(f);
            if (D !== null) {
              D.flags &= -257, Hc(D, f, y, c, t), D.mode & 1 && Uc(c, I, t), t = D, S = I;
              var H = t.updateQueue;
              if (H === null) {
                var V = /* @__PURE__ */ new Set();
                V.add(S), t.updateQueue = V;
              } else H.add(S);
              break e;
            } else {
              if ((t & 1) === 0) {
                Uc(c, I, t), Wa();
                break e;
              }
              S = Error(i(426));
            }
          } else if (xe && y.mode & 1) {
            var Me = $c(f);
            if (Me !== null) {
              (Me.flags & 65536) === 0 && (Me.flags |= 256), Hc(Me, f, y, c, t), na(ar(S, y));
              break e;
            }
          }
          c = S = ar(S, y), je !== 4 && (je = 2), ns === null ? ns = [c] : ns.push(c), c = f;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var C = Fc(c, S, t);
                fc(c, C);
                break e;
              case 1:
                y = S;
                var x = c.type, T = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof x.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (fn === null || !fn.has(T)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var z = Bc(c, y, t);
                  fc(c, z);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        wd(s);
      } catch (W) {
        t = W, Ne === s && s !== null && (Ne = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function vd() {
    var e = yi.current;
    return yi.current = di, e === null ? di : e;
  }
  function Wa() {
    (je === 0 || je === 3 || je === 2) && (je = 4), Fe === null || (In & 268435455) === 0 && (vi & 268435455) === 0 || mn(Fe, $e);
  }
  function ki(e, t) {
    var s = fe;
    fe |= 2;
    var o = vd();
    (Fe !== e || $e !== t) && (Gt = null, An(e, t));
    do
      try {
        Im();
        break;
      } catch (l) {
        yd(e, l);
      }
    while (!0);
    if (sa(), fe = s, yi.current = o, Ne !== null) throw Error(i(261));
    return Fe = null, $e = 0, je;
  }
  function Im() {
    for (; Ne !== null; ) _d(Ne);
  }
  function Rm() {
    for (; Ne !== null && !ep(); ) _d(Ne);
  }
  function _d(e) {
    var t = Ed(e.alternate, e, ut);
    e.memoizedProps = e.pendingProps, t === null ? wd(e) : Ne = t, Oa.current = null;
  }
  function wd(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = Sm(s, t, ut), s !== null) {
          Ne = s;
          return;
        }
      } else {
        if (s = xm(s, t), s !== null) {
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
  function Mn(e, t, s) {
    var o = me, l = gt.transition;
    try {
      gt.transition = null, me = 1, Am(e, t, s, o);
    } finally {
      gt.transition = l, me = o;
    }
    return null;
  }
  function Am(e, t, s, o) {
    do
      dr();
    while (hn !== null);
    if ((fe & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (cp(e, c), e === Fe && (Ne = Fe = null, $e = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || wi || (wi = !0, kd(Is, function() {
      return dr(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = gt.transition, gt.transition = null;
      var f = me;
      me = 1;
      var y = fe;
      fe |= 4, Oa.current = null, km(e, s), cd(s, e), Kp(Wo), Ls = !!Vo, Wo = Vo = null, e.current = s, bm(s), tp(), fe = y, me = f, gt.transition = c;
    } else e.current = s;
    if (wi && (wi = !1, hn = e, Si = l), c = e.pendingLanes, c === 0 && (fn = null), sp(s.stateNode), rt(e, Ae()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (_i) throw _i = !1, e = Fa, Fa = null, e;
    return (Si & 1) !== 0 && e.tag !== 0 && dr(), c = e.pendingLanes, (c & 1) !== 0 ? e === Ba ? rs++ : (rs = 0, Ba = e) : rs = 0, ln(), null;
  }
  function dr() {
    if (hn !== null) {
      var e = lu(Si), t = gt.transition, s = me;
      try {
        if (gt.transition = null, me = 16 > e ? 16 : e, hn === null) var o = !1;
        else {
          if (e = hn, hn = null, Si = 0, (fe & 6) !== 0) throw Error(i(331));
          var l = fe;
          for (fe |= 4, $ = e.current; $ !== null; ) {
            var c = $, f = c.child;
            if (($.flags & 16) !== 0) {
              var y = c.deletions;
              if (y !== null) {
                for (var S = 0; S < y.length; S++) {
                  var I = y[S];
                  for ($ = I; $ !== null; ) {
                    var P = $;
                    switch (P.tag) {
                      case 0:
                      case 11:
                      case 15:
                        es(8, P, c);
                    }
                    var L = P.child;
                    if (L !== null) L.return = P, $ = L;
                    else for (; $ !== null; ) {
                      P = $;
                      var M = P.sibling, D = P.return;
                      if (id(P), P === I) {
                        $ = null;
                        break;
                      }
                      if (M !== null) {
                        M.return = D, $ = M;
                        break;
                      }
                      $ = D;
                    }
                  }
                }
                var H = c.alternate;
                if (H !== null) {
                  var V = H.child;
                  if (V !== null) {
                    H.child = null;
                    do {
                      var Me = V.sibling;
                      V.sibling = null, V = Me;
                    } while (V !== null);
                  }
                }
                $ = c;
              }
            }
            if ((c.subtreeFlags & 2064) !== 0 && f !== null) f.return = c, $ = f;
            else e: for (; $ !== null; ) {
              if (c = $, (c.flags & 2048) !== 0) switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  es(9, c, c.return);
              }
              var C = c.sibling;
              if (C !== null) {
                C.return = c.return, $ = C;
                break e;
              }
              $ = c.return;
            }
          }
          var x = e.current;
          for ($ = x; $ !== null; ) {
            f = $;
            var T = f.child;
            if ((f.subtreeFlags & 2064) !== 0 && T !== null) T.return = f, $ = T;
            else e: for (f = x; $ !== null; ) {
              if (y = $, (y.flags & 2048) !== 0) try {
                switch (y.tag) {
                  case 0:
                  case 11:
                  case 15:
                    gi(9, y);
                }
              } catch (W) {
                Te(y, y.return, W);
              }
              if (y === f) {
                $ = null;
                break e;
              }
              var z = y.sibling;
              if (z !== null) {
                z.return = y.return, $ = z;
                break e;
              }
              $ = y.return;
            }
          }
          if (fe = l, ln(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
            Nt.onPostCommitFiberRoot(Rs, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        me = s, gt.transition = t;
      }
    }
    return !1;
  }
  function Sd(e, t, s) {
    t = ar(s, t), t = Fc(e, t, 1), e = cn(e, t, 1), t = qe(), e !== null && (Tr(e, 1, t), rt(e, t));
  }
  function Te(e, t, s) {
    if (e.tag === 3) Sd(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Sd(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (fn === null || !fn.has(o))) {
          e = ar(s, e), e = Bc(t, e, 1), t = cn(t, e, 1), e = qe(), t !== null && (Tr(t, 1, e), rt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Mm(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = qe(), e.pingedLanes |= e.suspendedLanes & s, Fe === e && ($e & s) === s && (je === 4 || je === 3 && ($e & 130023424) === $e && 500 > Ae() - Da ? An(e, 0) : za |= s), rt(e, t);
  }
  function xd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Ms, Ms <<= 1, (Ms & 130023424) === 0 && (Ms = 4194304)));
    var s = qe();
    e = Wt(e, t), e !== null && (Tr(e, t, s), rt(e, s));
  }
  function Nm(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), xd(e, s);
  }
  function Pm(e, t) {
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
    o !== null && o.delete(t), xd(e, s);
  }
  var Ed;
  Ed = function(e, t, s) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Ze.current) tt = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return tt = !1, wm(e, t, s);
      tt = (e.flags & 131072) !== 0;
    }
    else tt = !1, xe && (t.flags & 1048576) !== 0 && nc(t, Zs, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        pi(e, t), e = t.pendingProps;
        var l = Zn(t, He.current);
        ir(t, s), l = ma(null, t, o, e, l, s);
        var c = ga();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, et(o) ? (c = !0, Ks(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, la(t), l.updater = fi, t.stateNode = l, l._reactInternals = t, xa(t, o, e, s), t = Ca(null, t, o, !0, c, s)) : (t.tag = 0, xe && c && Xo(t), Ge(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (pi(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = Lm(o), e = xt(o, e), l) {
            case 0:
              t = ba(null, t, o, e, s);
              break e;
            case 1:
              t = qc(null, t, o, e, s);
              break e;
            case 11:
              t = Vc(null, t, o, e, s);
              break e;
            case 14:
              t = Wc(null, t, o, xt(o.type, e), s);
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
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), ba(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), qc(e, t, o, l, s);
      case 3:
        e: {
          if (Kc(t), e === null) throw Error(i(387));
          o = t.pendingProps, c = t.memoizedState, l = c.element, dc(e, t), ii(t, o, null, s);
          var f = t.memoizedState;
          if (o = f.element, c.isDehydrated) if (c = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
            l = ar(Error(i(423)), t), t = Jc(e, t, o, s, l);
            break e;
          } else if (o !== l) {
            l = ar(Error(i(424)), t), t = Jc(e, t, o, s, l);
            break e;
          } else for (lt = sn(t.stateNode.containerInfo.firstChild), at = t, xe = !0, St = null, s = uc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (nr(), o === l) {
              t = Qt(e, t, s);
              break e;
            }
            Ge(e, t, o, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return pc(t), e === null && ta(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, f = l.children, Yo(o, l) ? f = null : c !== null && Yo(o, c) && (t.flags |= 32), Gc(e, t), Ge(e, t, f, s), t.child;
      case 6:
        return e === null && ta(t), null;
      case 13:
        return Xc(e, t, s);
      case 4:
        return ua(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = rr(t, null, o, s) : Ge(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), Vc(e, t, o, l, s);
      case 7:
        return Ge(e, t, t.pendingProps, s), t.child;
      case 8:
        return Ge(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return Ge(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, f = l.value, ve(ni, o._currentValue), o._currentValue = f, c !== null) if (wt(c.value, f)) {
            if (c.children === l.children && !Ze.current) {
              t = Qt(e, t, s);
              break e;
            }
          } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
            var y = c.dependencies;
            if (y !== null) {
              f = c.child;
              for (var S = y.firstContext; S !== null; ) {
                if (S.context === o) {
                  if (c.tag === 1) {
                    S = Yt(-1, s & -s), S.tag = 2;
                    var I = c.updateQueue;
                    if (I !== null) {
                      I = I.shared;
                      var P = I.pending;
                      P === null ? S.next = S : (S.next = P.next, P.next = S), I.pending = S;
                    }
                  }
                  c.lanes |= s, S = c.alternate, S !== null && (S.lanes |= s), oa(
                    c.return,
                    s,
                    t
                  ), y.lanes |= s;
                  break;
                }
                S = S.next;
              }
            } else if (c.tag === 10) f = c.type === t.type ? null : c.child;
            else if (c.tag === 18) {
              if (f = c.return, f === null) throw Error(i(341));
              f.lanes |= s, y = f.alternate, y !== null && (y.lanes |= s), oa(f, s, t), f = c.sibling;
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
          Ge(e, t, l.children, s), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, o = t.pendingProps.children, ir(t, s), l = pt(l), o = o(l), t.flags |= 1, Ge(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = xt(o, t.pendingProps), l = xt(o.type, l), Wc(e, t, o, l, s);
      case 15:
        return Yc(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), pi(e, t), t.tag = 1, et(o) ? (e = !0, Ks(t)) : e = !1, ir(t, s), zc(t, o, l), xa(t, o, l, s), Ca(null, t, o, !0, e, s);
      case 19:
        return ed(e, t, s);
      case 22:
        return Qc(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function kd(e, t) {
    return ru(e, t);
  }
  function jm(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yt(e, t, s, o) {
    return new jm(e, t, s, o);
  }
  function Ya(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Lm(e) {
    if (typeof e == "function") return Ya(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Xe) return 11;
      if (e === dt) return 14;
    }
    return 2;
  }
  function gn(e, t) {
    var s = e.alternate;
    return s === null ? (s = yt(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function bi(e, t, s, o, l, c) {
    var f = 2;
    if (o = e, typeof e == "function") Ya(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case ue:
        return Nn(s.children, l, c, t);
      case J:
        f = 8, l |= 8;
        break;
      case ye:
        return e = yt(12, s, t, l | 2), e.elementType = ye, e.lanes = c, e;
      case Oe:
        return e = yt(13, s, t, l), e.elementType = Oe, e.lanes = c, e;
      case it:
        return e = yt(19, s, t, l), e.elementType = it, e.lanes = c, e;
      case re:
        return Ci(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Le:
            f = 10;
            break e;
          case Ce:
            f = 9;
            break e;
          case Xe:
            f = 11;
            break e;
          case dt:
            f = 14;
            break e;
          case K:
            f = 16, o = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = yt(f, s, t, l), t.elementType = e, t.type = o, t.lanes = c, t;
  }
  function Nn(e, t, s, o) {
    return e = yt(7, e, o, t), e.lanes = s, e;
  }
  function Ci(e, t, s, o) {
    return e = yt(22, e, o, t), e.elementType = re, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function Qa(e, t, s) {
    return e = yt(6, e, null, t), e.lanes = s, e;
  }
  function Ga(e, t, s) {
    return t = yt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Om(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = So(0), this.expirationTimes = So(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = So(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function qa(e, t, s, o, l, c, f, y, S) {
    return e = new Om(e, t, s, y, S), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = yt(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, la(c), e;
  }
  function zm(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: de, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function bd(e) {
    if (!e) return an;
    e = e._reactInternals;
    e: {
      if (wn(e) !== e || e.tag !== 1) throw Error(i(170));
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
      if (et(s)) return Zu(e, s, t);
    }
    return t;
  }
  function Cd(e, t, s, o, l, c, f, y, S) {
    return e = qa(s, o, !0, e, l, c, f, y, S), e.context = bd(null), s = e.current, o = qe(), l = pn(s), c = Yt(o, l), c.callback = t ?? null, cn(s, c, l), e.current.lanes = l, Tr(e, l, o), rt(e, o), e;
  }
  function Ti(e, t, s, o) {
    var l = t.current, c = qe(), f = pn(l);
    return s = bd(s), t.context === null ? t.context = s : t.pendingContext = s, t = Yt(c, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = cn(l, t, f), e !== null && (bt(e, l, f, c), si(e, l, f)), f;
  }
  function Ii(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Td(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function Ka(e, t) {
    Td(e, t), (e = e.alternate) && Td(e, t);
  }
  function Dm() {
    return null;
  }
  var Id = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Ja(e) {
    this._internalRoot = e;
  }
  Ri.prototype.render = Ja.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Ti(e, t, null, null);
  }, Ri.prototype.unmount = Ja.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Rn(function() {
        Ti(null, e, null, null);
      }), t[Ut] = null;
    }
  };
  function Ri(e) {
    this._internalRoot = e;
  }
  Ri.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = du();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < tn.length && t !== 0 && t < tn[s].priority; s++) ;
      tn.splice(s, 0, e), s === 0 && pu(e);
    }
  };
  function Xa(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ai(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Rd() {
  }
  function Fm(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var I = Ii(f);
          c.call(I);
        };
      }
      var f = Cd(t, o, e, 0, null, !1, !1, "", Rd);
      return e._reactRootContainer = f, e[Ut] = f.current, Ur(e.nodeType === 8 ? e.parentNode : e), Rn(), f;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var y = o;
      o = function() {
        var I = Ii(S);
        y.call(I);
      };
    }
    var S = qa(e, 0, !1, null, null, !1, !1, "", Rd);
    return e._reactRootContainer = S, e[Ut] = S.current, Ur(e.nodeType === 8 ? e.parentNode : e), Rn(function() {
      Ti(t, S, s, o);
    }), S;
  }
  function Mi(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var f = c;
      if (typeof l == "function") {
        var y = l;
        l = function() {
          var S = Ii(f);
          y.call(S);
        };
      }
      Ti(t, f, e, l);
    } else f = Fm(s, t, e, l, o);
    return Ii(f);
  }
  uu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = Cr(t.pendingLanes);
          s !== 0 && (xo(t, s | 1), rt(t, Ae()), (fe & 6) === 0 && (cr = Ae() + 500, ln()));
        }
        break;
      case 13:
        Rn(function() {
          var o = Wt(e, 1);
          if (o !== null) {
            var l = qe();
            bt(o, e, 1, l);
          }
        }), Ka(e, 1);
    }
  }, Eo = function(e) {
    if (e.tag === 13) {
      var t = Wt(e, 134217728);
      if (t !== null) {
        var s = qe();
        bt(t, e, 134217728, s);
      }
      Ka(e, 134217728);
    }
  }, cu = function(e) {
    if (e.tag === 13) {
      var t = pn(e), s = Wt(e, t);
      if (s !== null) {
        var o = qe();
        bt(s, e, t, o);
      }
      Ka(e, t);
    }
  }, du = function() {
    return me;
  }, fu = function(e, t) {
    var s = me;
    try {
      return me = e, t();
    } finally {
      me = s;
    }
  }, mo = function(e, t, s) {
    switch (t) {
      case "input":
        if (oo(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = Gs(o);
              if (!l) throw Error(i(90));
              Ol(o), oo(o, l);
            }
          }
        }
        break;
      case "textarea":
        Ul(e, s);
        break;
      case "select":
        t = s.value, t != null && Un(e, !!s.multiple, t, !1);
    }
  }, Kl = Ha, Jl = Rn;
  var Bm = { usingClientEntryPoint: !1, Events: [Vr, Jn, Gs, Gl, ql, Ha] }, ss = { findFiberByHostInstance: Sn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Um = { bundleType: ss.bundleType, version: ss.version, rendererPackageName: ss.rendererPackageName, rendererConfig: ss.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: le.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = tu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ss.findFiberByHostInstance || Dm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ni = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ni.isDisabled && Ni.supportsFiber) try {
      Rs = Ni.inject(Um), Nt = Ni;
    } catch {
    }
  }
  return st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bm, st.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Xa(t)) throw Error(i(200));
    return zm(e, t, null, s);
  }, st.createRoot = function(e, t) {
    if (!Xa(e)) throw Error(i(299));
    var s = !1, o = "", l = Id;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = qa(e, 1, !1, null, null, s, !1, o, l), e[Ut] = t.current, Ur(e.nodeType === 8 ? e.parentNode : e), new Ja(t);
  }, st.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = tu(t), e = e === null ? null : e.stateNode, e;
  }, st.flushSync = function(e) {
    return Rn(e);
  }, st.hydrate = function(e, t, s) {
    if (!Ai(t)) throw Error(i(200));
    return Mi(null, e, t, !0, s);
  }, st.hydrateRoot = function(e, t, s) {
    if (!Xa(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", f = Id;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (f = s.onRecoverableError)), t = Cd(t, null, e, 1, s ?? null, l, !1, c, f), e[Ut] = t.current, Ur(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new Ri(t);
  }, st.render = function(e, t, s) {
    if (!Ai(t)) throw Error(i(200));
    return Mi(null, e, t, !1, s);
  }, st.unmountComponentAtNode = function(e) {
    if (!Ai(e)) throw Error(i(40));
    return e._reactRootContainer ? (Rn(function() {
      Mi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Ut] = null;
      });
    }), !0) : !1;
  }, st.unstable_batchedUpdates = Ha, st.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Ai(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Mi(e, t, s, !1, o);
  }, st.version = "18.3.1-next-f1338f8080-20240426", st;
}
var zd;
function Cf() {
  if (zd) return tl.exports;
  zd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), tl.exports = Km(), tl.exports;
}
var Dd;
function Jm() {
  if (Dd) return Pi;
  Dd = 1;
  var r = Cf();
  return Pi.createRoot = r.createRoot, Pi.hydrateRoot = r.hydrateRoot, Pi;
}
var Xm = Jm(), Zm = Cf();
const eg = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
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
class Tf {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return eg(this._providers);
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
class tg {
  _contextProvider = new Tf();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class ng {
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
const rg = (r) => r.status.type === "complete";
class If extends ng {
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => rg(d) ? d : await n.send(d))) : [], a = this.text;
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
    const d = a.onSpeech((_) => {
      if (!this._isActiveSession(u, a))
        return;
      const w = _.isFinal !== !1, v = this._dictationBaseText && !this._dictationBaseText.endsWith(" ") && _.transcript ? " " : "";
      if (w) {
        if (this._dictationBaseText = this._dictationBaseText + v + _.transcript, this._currentInterimText = "", this._text = this._dictationBaseText, this._dictation) {
          const { transcript: R, ...j } = this._dictation;
          this._dictation = j;
        }
        this._notifySubscribers();
      } else
        this._currentInterimText = v + _.transcript, this._text = this._dictationBaseText + this._currentInterimText, this._dictation && (this._dictation = {
          ...this._dictation,
          transcript: _.transcript
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
class sg extends If {
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
let ig = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const wl = ig("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), og = "__optimistic__", ag = () => `${og}${wl()}`, vr = /* @__PURE__ */ Symbol("autoStatus"), lg = Object.freeze(Object.assign({ type: "running" }, { [vr]: !0 })), ug = Object.freeze(Object.assign({
  type: "complete",
  reason: "unknown"
}, { [vr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "tool-calls"
}, { [vr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "interrupt"
}, { [vr]: !0 }));
const cg = (r) => r[vr] === !0, Rf = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [vr]: !0 }) : r && n ? lg : ug;
var Pn = { exports: {} }, Fd;
function dg() {
  if (Fd) return Pn.exports;
  Fd = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(p, m, _) {
    _ == null && m !== null && typeof m == "object" && (_ = m, m = void 0), r && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const w = JSON.parse(p, m);
    if (w === null || typeof w != "object")
      return w;
    const b = _ && _.protoAction || "error", v = _ && _.constructorAction || "error";
    if (b === "ignore" && v === "ignore")
      return w;
    if (b !== "ignore" && v !== "ignore") {
      if (n.test(p) === !1 && i.test(p) === !1)
        return w;
    } else if (b !== "ignore" && v === "ignore") {
      if (n.test(p) === !1)
        return w;
    } else if (i.test(p) === !1)
      return w;
    return u(w, { protoAction: b, constructorAction: v, safe: _ && _.safe });
  }
  function u(p, { protoAction: m = "error", constructorAction: _ = "error", safe: w } = {}) {
    let b = [p];
    for (; b.length; ) {
      const v = b;
      b = [];
      for (const R of v) {
        if (m !== "ignore" && Object.prototype.hasOwnProperty.call(R, "__proto__")) {
          if (w === !0)
            return null;
          if (m === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete R.__proto__;
        }
        if (_ !== "ignore" && Object.prototype.hasOwnProperty.call(R, "constructor") && R.constructor !== null && typeof R.constructor == "object" && Object.prototype.hasOwnProperty.call(R.constructor, "prototype")) {
          if (w === !0)
            return null;
          if (_ === "error")
            throw new SyntaxError("Object contains forbidden prototype property");
          delete R.constructor;
        }
        for (const j in R) {
          const N = R[j];
          N && typeof N == "object" && b.push(N);
        }
      }
    }
    return p;
  }
  function d(p, m, _) {
    const { stackTraceLimit: w } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, m, _);
    } finally {
      Error.stackTraceLimit = w;
    }
  }
  function h(p, m) {
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
  return Pn.exports = d, Pn.exports.default = d, Pn.exports.parse = d, Pn.exports.safeParse = h, Pn.exports.scan = u, Pn.exports;
}
var fg = dg();
const Bd = /* @__PURE__ */ bf(fg);
function hg(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function h() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(b, v, R) {
    switch (b) {
      case '"': {
        i = v, n.pop(), n.push(R), n.push("INSIDE_STRING"), h();
        break;
      }
      case "f":
      case "t":
      case "n": {
        i = v, a = v, n.pop(), n.push(R), n.push("INSIDE_LITERAL");
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
        i = v, n.pop(), n.push(R), n.push("INSIDE_NUMBER"), h();
        break;
      }
      case "{": {
        i = v, n.pop(), n.push(R), n.push("INSIDE_OBJECT_START"), h();
        break;
      }
      case "[": {
        i = v, n.pop(), n.push(R), n.push("INSIDE_ARRAY_START"), h();
        break;
      }
    }
  }
  function m(b, v) {
    switch (b) {
      case ",": {
        n.pop(), n.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        i = v, n.pop(), d = u.pop();
        break;
      }
    }
  }
  function _(b, v) {
    switch (b) {
      case ",": {
        n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
        break;
      }
      case "]": {
        i = v, n.pop(), d = u.pop();
        break;
      }
    }
  }
  for (let b = 0; b < r.length; b++) {
    const v = r[b];
    switch (n[n.length - 1]) {
      case "ROOT":
        p(v, b, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (v) {
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
        v === '"' && (n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "");
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (v) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE"), d += v;
            break;
          }
          default: {
            d += v;
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        v === ":" && (n.pop(), n.push("INSIDE_OBJECT_BEFORE_VALUE"));
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        p(v, b, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        m(v, b);
        break;
      }
      case "INSIDE_STRING": {
        switch (v) {
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
        v === "]" ? (i = b, n.pop(), d = u.pop()) : (i = b, d = "0", p(v, b, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (v) {
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
        p(v, b, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        n.pop(), n[n.length - 1] === "INSIDE_STRING" ? i = b : n[n.length - 1] === "INSIDE_OBJECT_KEY" && (d += v);
        break;
      }
      case "INSIDE_NUMBER": {
        switch (v) {
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
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(v, b), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(v, b);
            break;
          }
          case "}": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && m(v, b);
            break;
          }
          case "]": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(v, b);
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
        const j = r.substring(a, b + 1);
        !"false".startsWith(j) && !"true".startsWith(j) && !"null".startsWith(j) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? m(v, b) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(v, b)) : i = b;
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
        const R = r.substring(a, r.length);
        "true".startsWith(R) ? w += "true".slice(R.length) : "false".startsWith(R) ? w += "false".slice(R.length) : "null".startsWith(R) && (w += "null".slice(R.length));
      }
    }
  return [w, u];
}
const sl = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), pg = (r) => {
  if (r.length === 0)
    return {
      [sl]: { state: "partial", partialPath: [] }
    };
  try {
    const n = Bd.parse(r);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[sl] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = hg(r), a = Bd.parse(n);
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
  const { role: a, id: u, createdAt: d, attachments: h, status: p, metadata: m } = r, _ = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, w = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, b = ({ image: v, ...R }) => {
    const j = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(v), N = /^https?:\/\//.test(v);
    return j || N ? { ...R, image: v } : (console.warn("Invalid image data format detected"), null);
  };
  if (a !== "user" && h?.length)
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
        content: w.map((v) => {
          const R = v.type;
          switch (R) {
            case "text":
            case "reasoning":
              return v.text.trim().length === 0 ? null : v;
            case "file":
            case "source":
              return v;
            case "image":
              return b(v);
            case "data":
              return v;
            case "tool-call": {
              const { parentId: j, messages: N, ...U } = v, Y = {
                ...U,
                toolCallId: v.toolCallId ?? `tool-${wl()}`,
                ...j !== void 0 && { parentId: j },
                ...N !== void 0 && { messages: N }
              };
              return v.args ? {
                ...Y,
                args: v.args,
                argsText: v.argsText ?? JSON.stringify(v.args)
              } : {
                ...Y,
                args: pg(v.argsText ?? "") ?? {},
                argsText: v.argsText ?? ""
              };
            }
            default: {
              const j = R;
              throw new Error(`Unsupported assistant message part type: ${j}`);
            }
          }
        }).filter((v) => !!v),
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
        content: w.map((v) => {
          const R = v.type;
          switch (R) {
            case "text":
            case "image":
            case "audio":
            case "file":
              return v;
            default: {
              const j = R;
              throw new Error(`Unsupported user message part type: ${j}`);
            }
          }
        }),
        attachments: h ?? [],
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    case "system":
      if (w.length !== 1 || w[0].type !== "text")
        throw new Error("System messages must have exactly one text message part.");
      return {
        ..._,
        role: a,
        content: w,
        metadata: {
          custom: m?.custom ?? {}
        }
      };
    default: {
      const v = a;
      throw new Error(`Unknown message role: ${v}`);
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
    const n = r.map((i) => Sl(i, wl(), Rf(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, a) => ({
        parentId: a > 0 ? n[a - 1].id : null,
        message: i
      }))
    };
  }
}, Di = (r) => r.next ? Di(r.next) : "current" in r ? r : null;
class mg {
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
class Af {
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
        ], (Di(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const h = n ? n.level + 1 : 0;
        this.updateLevels(i, h);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new mg(() => {
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
      a = ag();
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
      const h = this.messages.get(d);
      if (!h)
        throw new Error("MessageRepository(deleteMessage): Child message not found. This is likely an internal bug in assistant-ui.");
      this.performOp(u, h, "relink");
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
class qi {
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
class El extends qi {
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
function gg(r, n) {
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
class It extends qi {
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
    return n === Rt || gg(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const pr = /* @__PURE__ */ Symbol("innerMessage"), yg = (r) => r[pr], ds = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class Mf {
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
class Nf extends Mf {
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
class vg extends Nf {
  get source() {
    return "thread-composer";
  }
}
class _g extends Nf {
  get source() {
    return "edit-composer";
  }
}
class wg extends Mf {
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
class Pf extends qi {
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
const jf = Object.freeze([]), Lf = Object.freeze({}), Sg = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? jf,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? Lf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), xg = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? jf,
  runConfig: r?.runConfig ?? Lf,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class Of {
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
    return a || (a = new Pf({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
class Eg extends Of {
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
      getState: () => Sg(n.getState()),
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
    return new vg(new It({
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
class kg extends Of {
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
      getState: () => xg(n.getState()),
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
    return new _g(new It({
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
const Ud = /* @__PURE__ */ Symbol.for("aui.tool-response");
class Ui {
  get [Ud]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && Ud in n;
  }
  static toResponse(n) {
    return n instanceof Ui ? n : new Ui({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class $d {
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
    const u = i.toolName, d = i.toolCallId, h = Ui.toResponse(n);
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
class $i extends qi {
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
const Li = Object.freeze({
  type: "complete"
}), bg = (r, n, i) => {
  if (r.role !== "assistant")
    return Li;
  if (i.type === "tool-call")
    return i.result ? Li : r.status;
  const a = n === Math.max(0, r.content.length - 1);
  return r.status.type === "requires-action" ? Li : a ? r.status : Li;
}, Hd = (r, n) => {
  const i = r.content[n];
  if (!i)
    return Rt;
  const a = bg(r, n, i);
  return Object.freeze({
    ...i,
    [pr]: i[pr],
    status: a
  });
};
class Cg {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new kg(new $i({
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
    return ds(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new $d(new It({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => Hd(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new $d(new It({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), a = i.content.findIndex((u) => u.type === "tool-call" && u.toolCallId === n);
        return a === -1 ? Rt : Hd(i, a);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new wg(new It({
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
}), Ig = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), Rg = (r, n) => typeof n == "string" ? {
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
}, Ag = (r, n) => {
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
class Mg {
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
      getState: () => Ag(n.getState(), i.getState()),
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
    }, this.composer = new Eg(new $i({
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
    this._threadBinding.getState().append(Rg(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(Ig(i));
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
    return new Cg(new It({
      path: n,
      getState: () => {
        const { message: a, parentId: u, index: d } = i() ?? {}, { messages: h, speech: p } = this._threadBinding.getState();
        if (!a || u === void 0 || d === void 0)
          return Rt;
        const _ = this._threadBinding.getState().getBranches(a.id), w = a.metadata.submittedFeedback;
        return {
          ...a,
          [pr]: a[pr],
          index: d,
          isLast: h.at(-1)?.id === a.id,
          parentId: u,
          branchNumber: _.indexOf(a.id) + 1,
          branchCount: _.length,
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
    return a || (a = new Pf({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
const Ng = (r) => ({
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
class Pg {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = Mg) {
    this._core = n, this._runtimeFactory = i;
    const a = new El({
      path: {},
      getState: () => Ng(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new ji(new It({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => Oi(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new $i({
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
    return new this._runtimeFactory(new $i({
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
const jg = k.createContext(null), Lg = () => k.useContext(jg), jn = Object.freeze([]), zn = "DEFAULT_THREAD_ID", Og = Object.freeze([zn]), zf = Object.freeze({
  id: zn,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), zg = Promise.resolve(), Vd = Object.freeze({
  [zn]: zf
});
class Dg {
  adapter;
  threadFactory;
  _mainThreadId = zn;
  _threads = Og;
  _archivedThreads = jn;
  _threadData = Vd;
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
    return zg;
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
    if (n === zn)
      return zf;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? zn, d = n.threads ?? jn, h = n.archivedThreads ?? jn, p = a.threadId ?? zn, m = a.threads ?? jn, _ = a.archivedThreads ?? jn;
    !i && p === u && m === d && _ === h || (this._threadData = {
      ...Vd,
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
    }, m !== d && (this._threads = this.adapter.threads?.map((w) => w.id) ?? jn), _ !== h && (this._archivedThreads = this.adapter.archivedThreads?.map((w) => w.id) ?? jn), p !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
class Wd {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((a, u) => {
      const d = this.cache.get(a), h = i(d, a, u);
      return this.cache.set(a, h), h;
    });
  }
}
class Fg extends If {
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
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = a, this._sourceId = u.id, this._previousText = ds(u), this.setText(this._previousText), this.setRole(u.role), this.setAttachments(u.attachments ?? []), this._nonTextParts = u.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    ds(n) !== this._previousText && this.runtime.append({
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
  repository = new Af();
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
  composer = new sg(this);
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
    this._editComposers.set(n, new Fg(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
    const u = i.speak(ds(a)), d = u.subscribe(() => {
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
const Ug = Object.freeze([]), $g = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class Hg extends Bg {
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
  _converter = new Wd();
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
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? Ug, this._capabilities = {
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
          this._converter = new Wd();
        else if (a.isRunning === n.isRunning && a.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, h, p) => {
        if (!n.convertMessage)
          return h;
        const m = p === (n.messages?.length ?? 0) - 1, _ = Rf(m, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !cg(d.status) || d.status === _))
          return d;
        const w = n.convertMessage(h, p), b = Sl(w, p.toString(), _);
        return b[pr] = h, b;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const h = u[d], p = u[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, h);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), $g(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
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
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(ds(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
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
    const i = new Af();
    i.import(xl.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(yg).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const Yd = (r) => r.adapters?.threadList ?? {};
class Vg extends tg {
  threads;
  constructor(n) {
    super(), this.threads = new Dg(Yd(n), () => new Hg(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(Yd(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const Wg = (r) => {
  const [n] = k.useState(() => new Vg(r));
  k.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = Lg() ?? {};
  return k.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), k.useMemo(() => new Ky(n), [n]);
};
function Yg(r, n) {
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
function Qg(r) {
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
let os = null;
function Gg(r, n) {
  r.currentIndex = 0;
  const i = os;
  os = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    os = i;
  }
}
function kl() {
  if (!os)
    throw new Error("No resource fiber available");
  return os;
}
function Df(r, n) {
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
function fs(r) {
  r.isMounted = !1, Qg(r);
}
function hs(r, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return Gg(r, () => {
    r.renderContext = i;
    try {
      i.state = Df(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function ps(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, Yg(n, r);
}
const qg = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, Qd = qg ? k.useEffect : k.useLayoutEffect;
function bl(r) {
  const [, n] = k.useState({}), i = k.useMemo(() => Ki(r.type, () => n({})), [r.type]), a = hs(i, r.props);
  return Qd(() => () => fs(i), [i]), Qd(() => {
    ps(i, a);
  }), a.state;
}
const Ji = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, as = (r, n, i) => n === r;
let fr;
const il = () => {
  if (fr)
    return fr;
  const r = () => ({
    apis: /* @__PURE__ */ new Map(),
    nextId: 0,
    listeners: /* @__PURE__ */ new Set()
  });
  if (typeof window > "u")
    return fr = r(), fr;
  const n = window.__ASSISTANT_UI_DEVTOOLS_HOOK__;
  if (n)
    return fr = n, n;
  const i = r();
  return window.__ASSISTANT_UI_DEVTOOLS_HOOK__ = i, fr = i, i;
};
class On {
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
      }), m.logs.length > On.MAX_EVENT_LOGS_PER_API && (m.logs = m.logs.slice(-200)), On.notifyListeners(a));
    }), h = n.subscribe?.(() => {
      On.notifyListeners(a);
    });
    return i.apis.set(a, u), On.notifyListeners(a), () => {
      const p = il();
      p.apis.get(a) && (d?.(), h?.(), p.apis.delete(a), On.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    il().listeners.forEach((a) => a(n));
  }
}
function be(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[Ff] = r, n;
}
const Kg = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function Jg(r) {
  const n = kl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (h) => {
        const p = d.value, m = typeof h == "function" ? h(p) : h;
        Object.is(p, m) || (d.value = m, Kg(n));
      }
    };
    n.cells[i] = d;
  }
  const a = n.cells[i];
  if (a.type !== "state")
    throw new Error("Hook order changed between renders");
  return a;
}
function Ft(r) {
  const n = Jg(r);
  return [n.value, n.set];
}
function Xg() {
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
function Je(r, n) {
  const i = kl(), a = Xg();
  i.renderContext.commitTasks.push({
    effect: r,
    deps: n,
    cellIndex: a
  });
}
function mr(r) {
  const [n] = Ft(() => ({
    current: r
  }));
  return n;
}
const Zg = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, pe = (r, n) => {
  const i = mr();
  return i.current || (i.current = { value: r(), deps: n }), Zg(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, ey = (r, n) => pe(() => r, n);
function ls(r, n) {
  const [i, a] = Ft({}), u = pe(() => Ki(r.type, () => a({})), [r.type]), d = n ? pe(() => r.props, n) : r.props, h = pe(() => hs(u, d), [u, d, i]);
  return Je(() => () => fs(u), [u]), Je(() => {
    ps(u, h);
  }, [u, h]), h.state;
}
function Bt(r) {
  return Df(r.type, r.props);
}
function Bf(r, n, i) {
  const [a, u] = Ft(0), d = ey(() => u((_) => _ + 1), []), [h] = Ft(() => /* @__PURE__ */ new Map()), p = pe(() => n, i), m = pe(() => {
    const _ = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const w in r) {
      const b = r[w], v = p(b, w);
      let R = h.get(w);
      (!R || R.resource !== v.type) && (R && _.remove.push(w), R = Ki(v.type, d), _.add.push([w, R]));
      const j = hs(R, v.props);
      _.commit.push([w, j]), _.return[w] = j.state;
    }
    if (h.size > _.commit.length - _.add.length + _.remove.length)
      for (const w of h.keys())
        w in r || _.remove.push(w);
    return _;
  }, [r, p, a]);
  return Je(() => () => {
    for (const _ of h.keys())
      fs(h.get(_)), h.delete(_);
  }, []), Je(() => {
    for (const _ of m.remove)
      fs(h.get(_)), h.delete(_);
    for (const [_, w] of m.add)
      h.set(_, w);
    for (const [_, w] of m.commit)
      ps(h.get(_), w);
  }, [m]), m.return;
}
const ty = 50;
let Dt = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class ny {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Dt.schedulers.add(this), ry();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const ry = () => {
  Dt.isScheduled || (Dt.isScheduled = !0, queueMicrotask(Uf));
}, Uf = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of Dt.schedulers)
      if (Dt.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > ty)
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
    Dt.schedulers.clear(), Dt.isScheduled = !1;
  }
}, hl = (r) => {
  const n = Dt;
  Dt = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = r();
    return Uf(), i;
  } finally {
    Dt = n;
  }
}, sy = be((r) => {
  const [, n] = Ft(r.element), i = ls(r.element), a = mr(/* @__PURE__ */ new Set()).current, u = mr(i);
  return Je(() => {
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
}), iy = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (p) => i ? p : (i = !0, hl(() => {
      p && (a = hs(h, u)), !d.isDirty && ps(h, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, fs(h);
    }
  }, d = new ny(() => {
    a = hs(h, u), !(d.isDirty || !i) && ps(h, a);
  }), h = Ki(sy, () => d.markDirty());
  return hl(() => {
    d.markDirty();
  }), a.state;
}, us = /* @__PURE__ */ Symbol("tap.Context"), $f = (r) => ({
  [us]: r
}), Hf = (r, n, i) => {
  const a = r[us];
  r[us] = n;
  try {
    return i();
  } finally {
    r[us] = a;
  }
}, Vf = (r) => r[us], Gd = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (_, w) => {
    const b = typeof _ == "function" ? _(n) : _;
    if (!Object.is(b, n)) {
      const v = n;
      n = w ?? (typeof b != "object" || b === null) ? b : Object.assign({}, n, b), i.forEach((R) => R(n, v));
    }
  }, u = () => n, p = { setState: a, getState: u, getInitialState: () => m, subscribe: (_) => (i.add(_), () => i.delete(_)) }, m = n = r(a, u, p);
  return p;
}, oy = ((r) => r ? Gd(r) : Gd), ay = (r) => r;
function ly(r, n = ay) {
  const i = Tt.useSyncExternalStore(
    r.subscribe,
    Tt.useCallback(() => n(r.getState()), [r, n]),
    Tt.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return Tt.useDebugValue(i), i;
}
const qd = (r) => {
  const n = oy(r), i = (a) => ly(n, a);
  return Object.assign(i, n), i;
}, uy = ((r) => r ? qd(r) : qd);
function Kd(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function Wf(...r) {
  return (n) => {
    let i = !1;
    const a = r.map((u) => {
      const d = Kd(u, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : Kd(r[u], null);
        }
      };
  };
}
function Xi(...r) {
  return k.useCallback(Wf(...r), r);
}
const Yf = be((r) => {
  const n = pe(() => iy(r, { mount: !1 }), [r.type]);
  return Je(() => {
    n.render(r);
  }), n;
});
class cy {
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
  Je(() => {
    i.current = r;
  });
  const a = pe(() => new Proxy({}, new cy(i)), []), u = n?.key, d = r.getState();
  return pe(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, Hi = be((r) => {
  const n = mr(r.get);
  return Je(() => {
    n.current = r.get;
  }), pe(() => Qe({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), dy = be((r) => {
  const n = ls(r.scopeElement);
  return pe(() => [r.fieldName, n], [r.fieldName, n]);
}), fy = be((r) => {
  const { on: n, subscribe: i, ...a } = r, u = mr({ on: n, subscribe: i });
  Je(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = Bf(a, (h, p) => dy({
    fieldName: p,
    scopeElement: h
  }), []);
  return pe(() => {
    const h = Object.fromEntries(Object.values(d)), { on: p, subscribe: m } = u.current;
    return p && (h.on = (_, w) => p(_, w)), m && (h.subscribe = (_) => m(_)), h;
  }, [d]);
}), Qf = $f(null), hy = (r, n) => Hf(Qf, r, n), Gf = () => {
  const r = Vf(Qf);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, py = be(({ toolkit: r }) => {
  const [n, i] = Ft(() => ({
    tools: {}
  })), a = Gf();
  Je(() => {
    if (!r)
      return;
    const d = [];
    for (const [m, _] of Object.entries(r))
      _.render && d.push(u(m, _.render));
    const h = Object.entries(r).reduce((m, [_, w]) => {
      const { render: b, ...v } = w;
      return m[_] = v, m;
    }, {}), p = {
      getModelContext: () => ({
        tools: h
      })
    };
    return d.push(a.register(p)), () => {
      d.forEach((m) => m());
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
        [d]: p.tools[d]?.filter((m) => m !== h) ?? []
      }
    }));
  });
  return At({
    getState: () => n,
    setToolUI: u
  });
}), my = be(() => pe(() => {
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
}, [])), qf = $f(null), gy = (r, n) => Hf(qf, r, n), Cl = () => {
  const r = Vf(qf);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, yy = be(() => {
  const [r] = Ft(() => ({})), n = new Tf();
  return At({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), vy = be(({ threads: r, modelContext: n, tools: i }) => {
  const a = Bt(my()), { threads: u, tools: d, modelContext: h } = gy(a, () => {
    const m = ls(n ?? yy(), [n]);
    return hy(m.api, () => ({
      modelContext: m,
      tools: ls(i ?? py({}), [i]),
      threads: ls(r, [r])
    }));
  }), p = pe(() => ({
    threads: u.state,
    tools: d.state,
    modelContext: h.state
  }), [u.state, d.state, h.state]);
  return At({
    getState: () => p,
    threads: u.api,
    tools: d.api,
    modelContext: h.api,
    on: a.on
  });
}), _y = (r) => {
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
      if (as("thread", d) || as("thread-list-item", d) || as("composer", d))
        return r.getState().api.on(u, (h) => {
          h.threadId === n().getState().id && a(h);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, wy = (r) => {
  const n = Tl(), i = bl(Yf(vy(r))), a = k.useMemo(() => _y(i), [i]);
  return k.useMemo(() => Jf(n, a), [n, a]);
}, Qe = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, Vi = () => () => {
}, Kf = k.createContext({
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
  subscribe: Vi,
  on: (r) => {
    const { scope: n } = Ji(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), Tl = () => k.useContext(Kf), Il = (r) => {
  const n = Tl(), i = bl(fy(r));
  return k.useMemo(() => Jf(n, i), [n, i]);
}, Sy = (r) => wy(r);
function Mt(r) {
  return r ? Sy(r) : Tl();
}
const xy = (r, n) => r === Vi ? n : n === Vi ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, Jf = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: xy(r.subscribe, i ?? Vi)
  };
}, Zi = ({ api: r, children: n, devToolsVisible: i = !0 }) => (k.useEffect(() => {
  if (!(!i || !r.subscribe))
    return On.register(r);
}, [r, i]), g.jsx(Kf.Provider, { value: r, children: n }));
class Jd {
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
const Se = (r) => {
  const n = Mt(), i = k.useMemo(() => new Jd(n), [n]), a = k.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (k.useDebugValue(a), a instanceof Jd)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, ol = (r, n) => {
  const i = Mt(), a = k.useRef(n);
  k.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = Ji(r);
  k.useEffect(() => i.on({ scope: u, event: d }, (h) => a.current(h)), [i, u, d]);
};
function Ey(r, n) {
  function i(a) {
    const u = k.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function Xf(r, n) {
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
const Zf = k.createContext(null), ky = Ey(Zf, "ThreadPrimitive.Viewport"), { useThreadViewport: Wi, useThreadViewportStore: Rl } = Xf(ky, "useThreadViewport"), by = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function Cy(r, n = Ty) {
  by(r);
  const i = k.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return k.useDebugValue(i), i;
}
const Ty = (r) => r;
function Iy(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? Cy(d, u) : null;
  }
  return n;
}
function Ry(r) {
  const n = Mt(), i = Se(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const zt = Iy(Ry), Fn = (r) => {
  const [, n] = Ft(r.getState);
  return Je(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, Ay = be(({ runtime: r }) => {
  const n = Fn(r), i = Cl();
  return Je(() => {
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
}), ms = (r) => {
  const n = pe(() => Object.fromEntries(r), [r]), i = Bf(n, (d) => d, []), a = pe(() => Object.keys(i), [i]);
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
}, eh = be(({ runtime: r }) => {
  const n = Fn(r);
  return At({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), My = be(({ runtime: r, index: n }) => {
  const i = pe(() => r.getAttachmentByIndex(n), [r, n]);
  return Bt(eh({
    runtime: i
  }));
}), th = be(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = Fn(i), u = Cl();
  Je(() => {
    const p = [], m = [
      "send",
      "attachment-add"
    ];
    for (const _ of m) {
      const w = i.unstable_on(_, () => {
        u.emit(`composer.${_}`, {
          threadId: r.current,
          ...n && { messageId: n.current }
        });
      });
      p.push(w);
    }
    return () => {
      for (const _ of p)
        _();
    };
  }, [i, u, r, n]);
  const d = ms(a.attachments.map((p, m) => [
    p.id,
    My({ runtime: i, index: m })
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
  return At({
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
}), Ny = be(({ runtime: r }) => {
  const n = Fn(r);
  return At({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), Py = be(({ runtime: r, index: n }) => {
  const i = pe(() => r.getAttachmentByIndex(n), [r, n]);
  return Bt(eh({ runtime: i }));
}), jy = be(({ runtime: r, index: n }) => {
  const i = pe(() => r.getMessagePartByIndex(n), [r, n]);
  return Bt(Ny({ runtime: i }));
}), Ly = be(({ runtime: r, threadIdRef: n }) => {
  const i = Fn(r), [a, u] = Ft(!1), [d, h] = Ft(!1), p = pe(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), m = Bt(th({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: p
  })), _ = ms(i.content.map((v, R) => [
    "toolCallId" in v && v.toolCallId != null ? `toolCallId-${v.toolCallId}` : `index-${R}`,
    jy({ runtime: r, index: R })
  ])), w = ms(i.attachments?.map((v, R) => [
    v.id,
    Py({ runtime: r, index: R })
  ]) ?? []), b = pe(() => ({
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
    getState: () => b,
    composer: m.api,
    reload: (v) => r.reload(v),
    speak: () => r.speak(),
    stopSpeaking: () => r.stopSpeaking(),
    submitFeedback: (v) => r.submitFeedback(v),
    switchToBranch: (v) => r.switchToBranch(v),
    getCopyText: () => r.unstable_getCopyText(),
    part: (v) => "index" in v ? _.api({ index: v.index }) : _.api({ key: `toolCallId-${v.toolCallId}` }),
    attachment: (v) => "id" in v ? w.api({ key: v.id }) : w.api(v),
    setIsCopied: u,
    setIsHovering: h,
    __internal_getRuntime: () => r
  }, {
    key: i.id
  });
}), Oy = be(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = pe(() => r.getMessageById(n), [r, n]);
  return Bt(Ly({ runtime: a, threadIdRef: i }));
}), zy = be(({ runtime: r }) => {
  const n = Fn(r), i = Cl();
  Je(() => {
    const p = [], m = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const _ of m) {
      const w = r.unstable_on(_, () => {
        const b = r.getState()?.threadId || "unknown";
        i.emit(`thread.${_}`, {
          threadId: b
        });
      });
      p.push(w);
    }
    return () => {
      for (const _ of p)
        _();
    };
  }, [r]);
  const a = pe(() => ({
    get current() {
      return r.getState().threadId;
    }
  }), [r]), u = Bt(th({
    runtime: r.composer,
    threadIdRef: a
  })), d = ms(n.messages.map((p) => [
    p.id,
    Oy({ runtime: r, id: p.id, threadIdRef: a })
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
  return At({
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
}), Dy = be(({ runtime: r, id: n }) => {
  const i = pe(() => r.getItemById(n), [r, n]);
  return Bt(Ay({
    runtime: i
  }));
}), Fy = be(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = Fn(r), a = Bt(zy({
    runtime: r.main
  })), u = ms(Object.keys(i.threadItems).map((h) => [
    h,
    Dy({ runtime: r, id: h })
  ])), d = pe(() => ({
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
    item: (h) => {
      if (h === "main")
        return u.api({ key: d.mainThreadId });
      if ("id" in h)
        return u.api({ key: h.id });
      const { index: p, archived: m = !1 } = h, _ = m ? d.archivedThreadIds[p] : d.threadIds[p];
      return u.api({ key: _ });
    },
    switchToThread: (h) => {
      r.switchToThread(h);
    },
    switchToNewThread: () => {
      r.switchToNewThread();
    },
    __internal_getAssistantRuntime: () => n
  });
}), By = be((r) => {
  const n = Gf();
  return Je(() => r.registerModelContextProvider(n), [r, n]), Bt(Fy({
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
}, Uy = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = al((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: h
      }
    });
  }), a = al((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: h
      }
    });
  }), u = al((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: h
      }
    });
  }), d = uy(() => ({
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
}, gs = (r) => r, $y = (r) => {
  const n = Rl({ optional: !0 }), [i] = k.useState(() => Uy(r));
  return k.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), k.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && gs(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), k.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && gs(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, nh = ({ children: r, options: n = {} }) => {
  const i = $y(n), [a] = k.useState(() => ({
    useThreadViewport: i
  }));
  return g.jsx(Zf.Provider, { value: a, children: r });
}, Hy = (r) => r._core?.RenderComponent, Vy = ({ children: r, runtime: n }) => {
  const i = Mt({
    threads: By(n)
  }), a = Hy(n);
  return g.jsxs(Zi, { api: i, children: [a && g.jsx(a, {}), g.jsx(nh, { children: r })] });
}, Wy = k.memo(Vy), Yy = ({ index: r, children: n }) => {
  const i = Mt(), a = Il({
    message: Hi({
      source: "thread",
      query: { type: "index", index: r },
      get: () => i.thread().message({ index: r })
    }),
    composer: Hi({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: r }).composer
    }),
    on(u, d) {
      const h = () => i.thread().message({ index: r }), { event: p, scope: m } = Ji(u);
      return !as("composer", m) && !as("message", m) ? i.on(u, d) : i.on({ scope: "thread", event: p }, (_) => {
        _.messageId === h().getState().id && d(_);
      });
    }
  });
  return g.jsx(Zi, { api: a, children: n });
}, Qy = ({ index: r, children: n }) => {
  const i = Mt(), a = Il({
    part: Hi({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return g.jsx(Zi, { api: a, children: n });
}, Gy = be(({ text: r, isRunning: n }) => {
  const i = pe(() => ({
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
}), qy = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = bl(Yf(Gy({ text: r, isRunning: n }))), u = Il({
    part: Hi({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return g.jsx(Zi, { api: u, children: i });
};
class Ky {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new Pg(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
  const n = k.useRef(r);
  return k.useEffect(() => {
    n.current = r;
  }), k.useMemo(() => (...i) => n.current?.(...i), []);
}
const Jy = k.createContext(null);
function Xy(r) {
  const n = k.useContext(Jy);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: Kw, useSmoothStatusStore: Zy } = Xf(Xy, "useSmoothStatus");
class ev {
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
const ll = Object.freeze({
  type: "running"
}), tv = (r, n = !1) => {
  const { text: i } = r, a = Se(({ message: w }) => w.id), u = k.useRef(a), [d, h] = k.useState(i), p = Zy({ optional: !0 }), m = eo((w) => {
    if (h(w), p) {
      const b = d !== w || r.status.type === "running" ? ll : r.status;
      gs(p).setState(b, !0);
    }
  });
  k.useEffect(() => {
    if (p) {
      const w = n && (d !== i || r.status.type === "running") ? ll : r.status;
      gs(p).setState(w, !0);
    }
  }, [p, n, i, d, r.status]);
  const [_] = k.useState(new ev(i, m));
  return k.useEffect(() => {
    if (!n) {
      _.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(_.targetText)) {
      u.current = a, m(i), _.currentText = i, _.targetText = i, _.stop();
      return;
    }
    _.targetText = i, _.start();
  }, [m, _, a, n, i]), k.useEffect(() => () => {
    _.stop();
  }, [_]), k.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : ll
  } : r, [n, d, r, i]);
};
var nv = /* @__PURE__ */ Symbol.for("react.lazy"), Yi = Qm[" use ".trim().toString()];
function rv(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function rh(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === nv && "_payload" in r && rv(r._payload);
}
// @__NO_SIDE_EFFECTS__
function sh(r) {
  const n = /* @__PURE__ */ sv(r), i = k.forwardRef((a, u) => {
    let { children: d, ...h } = a;
    rh(d) && typeof Yi == "function" && (d = Yi(d._payload));
    const p = k.Children.toArray(d), m = p.find(ov);
    if (m) {
      const _ = m.props.children, w = p.map((b) => b === m ? k.Children.count(_) > 1 ? k.Children.only(null) : k.isValidElement(_) ? _.props.children : null : b);
      return /* @__PURE__ */ g.jsx(n, { ...h, ref: u, children: k.isValidElement(_) ? k.cloneElement(_, void 0, w) : null });
    }
    return /* @__PURE__ */ g.jsx(n, { ...h, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var ih = /* @__PURE__ */ sh("Slot");
// @__NO_SIDE_EFFECTS__
function sv(r) {
  const n = k.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if (rh(u) && typeof Yi == "function" && (u = Yi(u._payload)), k.isValidElement(u)) {
      const h = lv(u), p = av(d, u.props);
      return u.type !== k.Fragment && (p.ref = a ? Wf(a, h) : h), k.cloneElement(u, p);
    }
    return k.Children.count(u) > 1 ? k.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var iv = /* @__PURE__ */ Symbol("radix.slottable");
function ov(r) {
  return k.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === iv;
}
function av(r, n) {
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
function lv(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var uv = [
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
], _r = uv.reduce((r, n) => {
  const i = /* @__PURE__ */ sh(`Primitive.${n}`), a = k.forwardRef((u, d) => {
    const { asChild: h, ...p } = u, m = h ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g.jsx(m, { ...p, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function cs(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const oh = (r, n, i = []) => {
  const a = k.forwardRef((u, d) => {
    const h = {}, p = {};
    Object.keys(u).forEach((_) => {
      i.includes(_) ? h[_] = u[_] : p[_] = u[_];
    });
    const m = n(h) ?? void 0;
    return g.jsx(_r.button, { type: "button", ...p, ref: d, disabled: p.disabled || !m, onClick: cs(p.onClick, m) });
  });
  return a.displayName = r, a;
};
function cv(r, n = globalThis?.document) {
  const i = eo(r);
  k.useEffect(() => {
    const a = (u) => {
      u.key === "Escape" && i(u);
    };
    return n.addEventListener("keydown", a, { capture: !0 }), () => n.removeEventListener("keydown", a, { capture: !0 });
  }, [i, n]);
}
const ws = (r) => {
  const n = k.useRef(void 0);
  return k.useCallback((a) => {
    n.current && n.current(), a && (n.current = r(a));
  }, [r]);
}, ah = (r, n) => {
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
  return ws(i);
}, Xd = k.createContext(!1), Zd = (r, n) => {
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
  const a = Se(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: m, message: _ }) => _.isLast && _.role === "assistant" && _.index >= 1 && m.messages.at(_.index - 1)?.role === "user"
  ), u = Rl({ optional: !0 }), d = k.useContext(Xd), h = k.useCallback((m) => {
    if (!u || d)
      return;
    const _ = () => {
      const w = u.getState();
      if (w.turnAnchor === "top" && a) {
        const { viewport: b, inset: v, userMessage: R } = w.height, j = Zd(n, m), N = Zd(i, m), U = R <= j ? R : N, Y = Math.max(0, b - v - U);
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
  ]), p = ws(h);
  return g.jsx(Xd.Provider, { value: !0, children: g.jsx(ih, { ref: p, children: r }) });
};
lh.displayName = "ThreadPrimitive.ViewportSlack";
const dv = () => {
  const r = Mt(), n = Se(() => r.message()), i = k.useCallback((a) => {
    const u = () => {
      n.setIsHovering(!0);
    }, d = () => {
      n.setIsHovering(!1);
    };
    return a.addEventListener("mouseenter", u), a.addEventListener("mouseleave", d), a.matches(":hover") && queueMicrotask(() => n.setIsHovering(!0)), () => {
      a.removeEventListener("mouseenter", u), a.removeEventListener("mouseleave", d), n.setIsHovering(!1);
    };
  }, [n]);
  return ws(i);
}, fv = () => {
  const r = Wi((u) => u.turnAnchor), n = Wi((u) => u.registerUserMessageHeight), i = Se(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = k.useCallback((u) => u.offsetHeight, []);
  return ah(i ? n : null, a);
}, Al = k.forwardRef((r, n) => {
  const i = dv(), a = fv(), u = Xi(n, i, a);
  return g.jsx(lh, { children: g.jsx(_r.div, { ...r, ref: u }) });
});
Al.displayName = "MessagePrimitive.Root";
const hv = () => Se(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), uh = k.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = tv(hv(), r);
  return g.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
uh.displayName = "MessagePartPrimitive.Text";
const pv = () => Se(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), ch = k.forwardRef((r, n) => {
  const { image: i } = pv();
  return g.jsx(_r.img, { src: i, ...r, ref: n });
});
ch.displayName = "MessagePartPrimitive.Image";
const dh = ({ children: r }) => Se(({ part: i }) => i.status.type === "running") ? r : null;
dh.displayName = "MessagePartPrimitive.InProgress";
const ef = (r) => Symbol.iterator in r, tf = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), nf = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, mv = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function gv(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : ef(r) && ef(n) ? tf(r) && tf(n) ? nf(r, n) : mv(r, n) : nf(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function yv(r) {
  const n = Tt.useRef(void 0);
  return (i) => {
    const a = r(i);
    return gv(n.current, a) ? n.current : n.current = a;
  };
}
const rf = (r) => {
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
}, vv = (r) => {
  const n = [], i = rf("toolGroup"), a = rf("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, _v = () => {
  const r = Se(yv((n) => n.message.parts.map((i) => i.type)));
  return k.useMemo(() => r.length === 0 ? [] : vv(r), [r]);
}, wv = ({ Fallback: r, ...n }) => {
  const i = Se(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? g.jsx(i, { ...n }) : null;
}, Kt = {
  Text: () => g.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [g.jsx(uh, {}), g.jsx(dh, { children: g.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => g.jsx(ch, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, Sv = ({ components: { Text: r = Kt.Text, Reasoning: n = Kt.Reasoning, Image: i = Kt.Image, Source: a = Kt.Source, File: u = Kt.File, Unstable_Audio: d = Kt.Unstable_Audio, tools: h = {} } = {} }) => {
  const p = Mt(), m = Se(({ part: w }) => w), _ = m.type;
  if (_ === "tool-call") {
    const w = p.part().addToolResult, b = p.part().resumeToolCall;
    if ("Override" in h)
      return g.jsx(h.Override, { ...m, addResult: w, resume: b });
    const v = h.by_name?.[m.toolName] ?? h.Fallback;
    return g.jsx(wv, { ...m, Fallback: v, addResult: w, resume: b });
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
      const w = _;
      throw new Error(`Unknown message part type: ${w}`);
  }
}, Fi = k.memo(({ index: r, components: n }) => g.jsx(Qy, { index: r, children: g.jsx(Sv, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
Fi.displayName = "MessagePrimitive.PartByIndex";
const xv = ({ status: r, component: n }) => g.jsx(qy, { text: "", isRunning: r.type === "running", children: g.jsx(n, { type: "text", text: "", status: r }) }), Ev = Object.freeze({
  type: "complete"
}), kv = ({ components: r }) => {
  const n = Se((i) => i.message.status ?? Ev);
  return r?.Empty ? g.jsx(r.Empty, { status: n }) : g.jsx(xv, { status: n, component: r?.Text ?? Kt.Text });
}, bv = k.memo(kv, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), Ml = ({ components: r }) => {
  const n = Se(({ message: u }) => u.parts.length), i = _v(), a = k.useMemo(() => n === 0 ? g.jsx(bv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return g.jsx(Fi, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? Kt.ToolGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => g.jsx(Fi, { index: u.startIndex + p, components: r }, p)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? Kt.ReasoningGroup;
      return g.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => g.jsx(Fi, { index: u.startIndex + p, components: r }, p)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return g.jsx(g.Fragment, { children: a });
};
Ml.displayName = "MessagePrimitive.Parts";
const fh = ({ children: r }) => Se(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
fh.displayName = "MessagePrimitive.Error";
const hh = () => {
  const r = Mt(), n = Se((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = k.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, Cv = oh("ComposerPrimitive.Send", hh), ph = k.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = hh(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return g.jsx(_r.form, { ...n, ref: i, onSubmit: cs(r, u) });
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
var Iv = k.useLayoutEffect, Rv = function(n) {
  var i = Tt.useRef(n);
  return Iv(function() {
    i.current = n;
  }), i;
}, sf = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, Av = function(n, i) {
  var a = Tt.useRef();
  return Tt.useCallback(function(u) {
    n.current = u, a.current && sf(a.current, null), a.current = i, i && sf(i, u);
  }, [i]);
}, of = {
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
}, Mv = function(n) {
  Object.keys(of).forEach(function(i) {
    n.style.setProperty(i, of[i], "important");
  });
}, af = Mv, Ke = null, lf = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function Nv(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), Ke || (Ke = document.createElement("textarea"), Ke.setAttribute("tabindex", "-1"), Ke.setAttribute("aria-hidden", "true"), af(Ke)), Ke.parentNode === null && document.body.appendChild(Ke);
  var u = r.paddingSize, d = r.borderSize, h = r.sizingStyle, p = h.boxSizing;
  Object.keys(h).forEach(function(v) {
    var R = v;
    Ke.style[R] = h[R];
  }), af(Ke), Ke.value = n;
  var m = lf(Ke, r);
  Ke.value = n, m = lf(Ke, r), Ke.value = "x";
  var _ = Ke.scrollHeight - u, w = _ * i;
  p === "border-box" && (w = w + u + d), m = Math.max(w, m);
  var b = _ * a;
  return p === "border-box" && (b = b + u + d), m = Math.min(b, m), [m, _];
}
var uf = function() {
}, Pv = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, jv = [
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
], Lv = !!document.documentElement.currentStyle, Ov = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = Pv(jv, i), u = a.boxSizing;
  if (u === "")
    return null;
  Lv && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), h = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: h
  };
}, zv = Ov;
function Nl(r, n, i) {
  var a = Rv(i);
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
var Dv = function(n, i) {
  Nl(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, Fv = function(n) {
  Nl(window, "resize", n);
}, Bv = function(n) {
  Nl(document.fonts, "loadingdone", n);
}, Uv = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], $v = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, h = n.onChange, p = h === void 0 ? uf : h, m = n.onHeightChange, _ = m === void 0 ? uf : m, w = Tv(n, Uv), b = w.value !== void 0, v = k.useRef(null), R = Av(v, i), j = k.useRef(0), N = k.useRef(), U = function() {
    var ee = v.current, le = a && N.current ? N.current : zv(ee);
    if (le) {
      N.current = le;
      var Q = Nv(le, ee.value || ee.placeholder || "x", d, u), de = Q[0], ue = Q[1];
      j.current !== de && (j.current = de, ee.style.setProperty("height", de + "px", "important"), _(de, {
        rowHeight: ue
      }));
    }
  }, Y = function(ee) {
    b || U(), p(ee);
  };
  return k.useLayoutEffect(U), Dv(v, function() {
    if (!b) {
      var ae = v.current.value;
      requestAnimationFrame(function() {
        var ee = v.current;
        ee && ae !== ee.value && U();
      });
    }
  }), Fv(U), Bv(U), /* @__PURE__ */ k.createElement("textarea", pl({}, w, {
    onChange: Y,
    ref: R
  }));
}, Hv = /* @__PURE__ */ k.forwardRef($v);
const mh = (r) => {
  const n = eo(r), i = Wi((a) => a.onScrollToBottom);
  k.useEffect(() => i(n), [i, n]);
}, gh = k.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: h = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: m = !0, unstable_focusOnScrollToBottom: _ = !0, unstable_focusOnThreadSwitched: w = !0, addAttachmentOnPaste: b = !0, ...v }, R) => {
  const j = Mt(), N = Se(({ composer: J }) => J.isEditing ? J.text : ""), U = n ? ih : Hv, Y = Se(({ thread: J, composer: ye }) => J.isDisabled || ye.dictation?.inputDisabled) || i, ae = k.useRef(null), ee = Xi(R, ae);
  cv((J) => {
    if (!p || !ae.current?.contains(J.target))
      return;
    const ye = j.composer();
    ye.getState().canCancel && (ye.cancel(), J.preventDefault());
  });
  const le = (J) => {
    Y || !h || J.nativeEvent.isComposing || J.key === "Enter" && J.shiftKey === !1 && (j.thread().getState().isRunning || (J.preventDefault(), ae.current?.closest("form")?.requestSubmit()));
  }, Q = async (J) => {
    if (!b)
      return;
    const ye = j.thread().getState().capabilities, Le = Array.from(J.clipboardData?.files || []);
    if (ye.attachments && Le.length > 0)
      try {
        J.preventDefault(), await Promise.all(Le.map((Ce) => j.composer().addAttachment(Ce)));
      } catch (Ce) {
        console.error("Error adding attachment:", Ce);
      }
  }, de = r && !Y, ue = k.useCallback(() => {
    const J = ae.current;
    !J || !de || (J.focus({ preventScroll: !0 }), J.setSelectionRange(J.value.length, J.value.length));
  }, [de]);
  return k.useEffect(() => ue(), [ue]), mh(() => {
    j.composer().getState().type === "thread" && _ && ue();
  }), k.useEffect(() => {
    if (!(j.composer().getState().type !== "thread" || !m))
      return j.on("thread.run-start", ue);
  }, [m, ue, j]), k.useEffect(() => {
    if (!(j.composer().getState().type !== "thread" || !w))
      return j.on("thread-list-item.switched-to", ue);
  }, [w, ue, j]), g.jsx(U, { name: "input", value: N, ...v, ref: ee, disabled: Y, onChange: cs(a, (J) => {
    j.composer().getState().isEditing && hl(() => {
      j.composer().setText(J.target.value);
    });
  }), onKeyDown: cs(u, le), onPaste: cs(d, Q) });
});
gh.displayName = "ComposerPrimitive.Input";
const Vv = () => {
  const r = Mt(), n = Se(({ composer: a }) => !a.canCancel), i = k.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, Wv = oh("ComposerPrimitive.Cancel", Vv), yh = k.forwardRef((r, n) => g.jsx(_r.div, { ...r, ref: n }));
yh.displayName = "ThreadPrimitive.Root";
const Yv = (r) => Se(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), ml = ({ children: r, ...n }) => Yv(n) ? r : null;
ml.displayName = "ThreadPrimitive.If";
const Qv = (r) => {
  const n = eo(r), i = k.useCallback((a) => {
    const u = new ResizeObserver(() => {
      n();
    }), d = new MutationObserver((h) => {
      h.some((m) => m.type !== "attributes" || m.attributeName !== "style") && n();
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
  return ws(i);
}, Gv = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = k.useRef(null), d = Rl();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const h = k.useRef(0), p = k.useRef(null), m = k.useCallback((R) => {
    const j = u.current;
    j && (p.current = R, j.scrollTo({ top: j.scrollHeight, behavior: R }));
  }, []), _ = () => {
    const R = u.current;
    if (!R)
      return;
    const j = d.getState().isAtBottom, N = Math.abs(R.scrollHeight - R.scrollTop - R.clientHeight) < 1 || R.scrollHeight <= R.clientHeight;
    !N && h.current < R.scrollTop || (N && (p.current = null), (N || p.current === null) && N !== j && gs(d).setState({
      isAtBottom: N
    })), h.current = R.scrollTop;
  }, w = Qv(() => {
    const R = p.current;
    R ? m(R) : r && d.getState().isAtBottom && m("instant"), _();
  }), b = ws((R) => (R.addEventListener("scroll", _), () => {
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
  }), Xi(w, b, u);
}, qv = () => {
  const r = Wi((i) => i.registerViewport), n = k.useCallback((i) => i.clientHeight, []);
  return ah(r, n);
}, vh = k.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, h) => {
  const p = Gv({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), m = qv(), _ = Xi(h, p, m);
  return g.jsx(_r.div, { ...d, ref: _, children: u });
});
vh.displayName = "ThreadPrimitive.ViewportScrollable";
const _h = k.forwardRef(({ turnAnchor: r, ...n }, i) => g.jsx(nh, { options: { turnAnchor: r }, children: g.jsx(vh, { ...n, ref: i }) }));
_h.displayName = "ThreadPrimitive.Viewport";
const wh = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, Kv = () => null, Jv = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? Kv;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, Xv = ({ components: r }) => {
  const n = Se(({ message: u }) => u.role), i = Se(({ message: u }) => u.composer.isEditing), a = Jv(r, n, i);
  return g.jsx(a, {});
}, Sh = k.memo(({ index: r, components: n }) => g.jsx(Yy, { index: r, children: g.jsx(Xv, { components: n }) }), (r, n) => r.index === n.index && wh(r.components, n.components));
Sh.displayName = "ThreadPrimitive.MessageByIndex";
const xh = ({ components: r }) => {
  const n = Se(({ thread: a }) => a.messages.length);
  return k.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => g.jsx(Sh, { index: u, components: r }, u)), [n, r]);
};
xh.displayName = "ThreadPrimitive.Messages";
const Zv = k.memo(xh, (r, n) => wh(r.components, n.components)), e_ = 1, vt = Object.freeze({
  product_card: "product_card",
  product_carousel: "product_carousel",
  ritual_card: "ritual_card",
  reading_summary: "reading_summary",
  collection_link: "collection_link",
  next_steps: "next_steps"
}), ct = Object.freeze({
  [vt.product_card]: "display_product_card",
  [vt.product_carousel]: "display_product_carousel",
  [vt.ritual_card]: "display_ritual_card",
  [vt.reading_summary]: "display_reading_summary",
  [vt.collection_link]: "display_collection_link",
  [vt.next_steps]: "display_next_steps"
}), t_ = Object.freeze(
  Object.fromEntries(
    Object.entries(ct).map(([r, n]) => [n, r])
  )
), Eh = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, kh = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, n_ = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), Jt = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Re = (r, n = "") => typeof r != "string" ? n : r.trim() || n, Ie = (r) => Re(r) || null, ys = (r) => {
  const n = Re(r);
  return n ? /^(https?:\/\/|\/)/i.test(n) ? n : `/${n.replace(/^\/+/, "")}` : null;
}, r_ = (r, n = !0) => typeof r == "boolean" ? r : n, Pl = (r, n = 6) => Array.isArray(r) ? r.map((i) => Re(typeof i == "string" ? i : i?.label || i?.title || i?.text)).filter(Boolean).slice(0, n) : [], bh = (r) => {
  if (!Jt(r))
    return null;
  const n = Re(r.title, "Untitled crystal"), i = ys(r.url);
  return {
    id: Ie(r.id || r.productId),
    handle: Ie(r.handle),
    title: n,
    url: i || (r.handle ? `/products/${r.handle}` : null),
    image: ys(r.image || r.featuredImage || r.imageUrl),
    price: Ie(r.price || r.priceText),
    compareAtPrice: Ie(r.compareAtPrice || r.compareAt),
    badge: Ie(r.badge || r.tag || r.intent || r.eyebrow),
    summary: Ie(r.summary || r.description || r.body),
    reason: Ie(r.reason),
    note: Ie(r.note || r.ritual || r.howToUse || r.how_to_use),
    ctaLabel: Ie(r.ctaLabel || r.buttonLabel || r.linkLabel),
    merchandiseId: Ie(r.merchandiseId || r.variantId),
    variantId: Ie(r.variantId || r.merchandiseId),
    available: r_(r.available, !0)
  };
}, Ch = (r, n = 6) => Array.isArray(r) ? r.map(bh).filter(Boolean).slice(0, n) : [], s_ = (r) => {
  if (!Jt(r))
    return null;
  const n = bh(r.product || r);
  return n ? {
    eyebrow: Re(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: Ie(r.reason || n.reason),
    note: Ie(r.note || r.ritual || n.note),
    ctaLabel: Re(r.ctaLabel || r.buttonLabel || n.ctaLabel, "View crystal"),
    product: n
  } : null;
}, i_ = (r) => {
  if (!Jt(r))
    return null;
  const n = Ch(r.products, 8);
  return n.length === 0 ? null : {
    eyebrow: Re(r.eyebrow || r.kicker, "Matched for you"),
    title: Re(r.title, "Recommended crystals"),
    reason: Ie(r.reason || r.description),
    browseUrl: ys(r.browseUrl || r.url),
    browseLabel: Re(r.browseLabel || r.ctaLabel, "Browse all"),
    products: n
  };
}, o_ = (r) => {
  if (!Jt(r))
    return null;
  const n = Pl(r.steps, 6);
  return n.length === 0 && !Re(r.summary) ? null : {
    eyebrow: Re(r.eyebrow || r.kicker, "Ritual"),
    title: Re(r.title, "How to work with this energy"),
    summary: Ie(r.summary || r.reason || r.description),
    duration: Ie(r.duration),
    steps: n,
    note: Ie(r.note),
    disclaimer: Ie(r.disclaimer),
    linkedProducts: Ch(r.linkedProducts || r.products, 3)
  };
}, a_ = (r) => {
  if (!Jt(r))
    return null;
  const n = Re(r.summary || r.description);
  return n ? {
    eyebrow: Re(r.eyebrow || r.kicker, "Energy blueprint"),
    title: Re(r.title, "What your energy is asking for"),
    summary: n,
    energyFocus: Ie(r.energyFocus || r.energy || r.focus),
    highlights: Pl(r.highlights || r.bullets || r.keyPoints, 5),
    disclaimer: Ie(r.disclaimer)
  } : null;
}, l_ = (r) => {
  if (!Jt(r))
    return null;
  const n = ys(r.url || r.browseUrl);
  return n ? {
    eyebrow: Re(r.eyebrow || r.kicker, "Browse deeper"),
    title: Re(r.title, "Open the full collection"),
    description: Ie(r.description || r.reason),
    url: n,
    label: Re(r.label || r.ctaLabel, "Shop collection"),
    image: ys(r.image || r.imageUrl)
  } : null;
}, u_ = (r) => {
  if (!Jt(r))
    return null;
  const n = Pl(r.steps, 5);
  return n.length === 0 ? null : {
    eyebrow: Re(r.eyebrow || r.kicker, "Next steps"),
    title: Re(r.title, "What to do next"),
    steps: n,
    closing: Ie(r.closing || r.note)
  };
}, c_ = Object.freeze({
  [vt.product_card]: {
    toolName: ct.product_card,
    normalizeProps: s_
  },
  [vt.product_carousel]: {
    toolName: ct.product_carousel,
    normalizeProps: i_
  },
  [vt.ritual_card]: {
    toolName: ct.ritual_card,
    normalizeProps: o_
  },
  [vt.reading_summary]: {
    toolName: ct.reading_summary,
    normalizeProps: a_
  },
  [vt.collection_link]: {
    toolName: ct.collection_link,
    normalizeProps: l_
  },
  [vt.next_steps]: {
    toolName: ct.next_steps,
    normalizeProps: u_
  }
}), vs = (r, n = "component") => {
  if (!Jt(r))
    return null;
  const i = Re(
    r.component || r.componentType || t_[r.toolName]
  ), a = c_[i];
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
    version: e_,
    props: u
  };
}, Dn = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = vs(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, jl = (r) => {
  const n = [], i = (a, u = 0) => {
    if (u > 3 || a == null)
      return;
    if (Array.isArray(a)) {
      a.forEach((h, p) => {
        const m = vs(h, `${u}-${p}`);
        m && n.push(m);
      });
      return;
    }
    const d = vs(a, `${u}`);
    if (d) {
      n.push(d);
      return;
    }
    Jt(a) && (i(a.components, u + 1), i(a.component, u + 1), i(a.ui?.components, u + 1), i(a.payload?.components, u + 1), i(a.data?.components, u + 1), i(a.data?.ui?.components, u + 1), i(a.metadata?.components, u + 1), i(a.metadata?.ui?.components, u + 1));
  };
  return i(r), Dn([], n);
}, cf = (r, n = "component") => {
  const i = vs(r, n);
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
}, d_ = (r) => vs(r), Th = (r) => {
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
      for (const h of d) {
        const p = Th(h[1]);
        p && i.push(p);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(Eh()), a(kh()), {
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
    const h = d[0], p = Th(d[1] || d[2] || "");
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
}, Ih = (r = "") => {
  const { answer: n, payloads: i } = f_(r);
  let a = [];
  for (const u of i)
    a = Dn(a, jl(u));
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
      const h = d.slice(0, a.length);
      if (h.length >= u && a.startsWith(h))
        return i;
    }
  return -1;
}, m_ = (r = "") => {
  const n = Eh(), i = kh();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = p_(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, g_ = "section-rendering-askcrystal-chat-product-card", Qi = /* @__PURE__ */ new Map(), zi = /* @__PURE__ */ new Map(), y_ = {
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
  const n = Qi.get(r);
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
      return Qi.set(r, d), d;
    }).finally(() => {
      zi.delete(r);
    });
    zi.set(r, i);
  }
  return zi.get(r);
}
function Ss({ eyebrow: r, title: n, children: i, className: a = "" }) {
  return /* @__PURE__ */ g.jsxs("section", { className: `ac-tool ${a}`.trim(), children: [
    /* @__PURE__ */ g.jsxs("header", { className: "ac-tool__header", children: [
      r ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__eyebrow", children: r }) : null,
      n ? /* @__PURE__ */ g.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function C_({ image: r, title: n, compact: i = !1 }) {
  return /* @__PURE__ */ g.jsx("div", { className: `ac-tool-product__media${i ? " ac-tool-product__media--compact" : ""}`, children: r ? /* @__PURE__ */ g.jsx("img", { src: r, alt: n, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "ac-tool-product__placeholder", children: "Crystal" }) });
}
function T_({ product: r, ctaLabel: n }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-product__meta", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-product__price-group", children: [
      r.price ? /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__price", children: r.price }) : null,
      r.compareAtPrice ? /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__compare", children: r.compareAtPrice }) : null
    ] }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-tool-product__cta", children: n || "View crystal" })
  ] });
}
function I_({ product: r, ctaLabel: n }) {
  const i = w_(r), a = S_(r), u = x_(r), d = n || "View", h = a ? /* @__PURE__ */ g.jsx("img", { className: "askcrystal-chat-product-card__image", src: a, alt: u, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }), p = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsx("div", { className: "askcrystal-chat-product-card__media", children: h }),
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
  const i = __(r), [a, u] = k.useState(() => i && Qi.get(i) || null), [d, h] = k.useState(null);
  return k.useEffect(() => {
    let p = !0;
    if (!i)
      return k.startTransition(() => {
        u(null), h(new Error("Missing product card request URL"));
      }), () => {
        p = !1;
      };
    const m = Qi.get(i);
    return m ? (k.startTransition(() => {
      u(m), h(null);
    }), () => {
      p = !1;
    }) : (k.startTransition(() => {
      u(null), h(null);
    }), b_(i).then((_) => {
      p && k.startTransition(() => {
        u(_), h(null);
      });
    }).catch((_) => {
      p && (typeof console < "u" && typeof console.warn == "function" && console.warn("[AskCrystal] Native product card render fell back to hydrated shell.", {
        requestUrl: i,
        error: _,
        product: r
      }), k.startTransition(() => {
        u(null), h(_);
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
    browseLabel: h,
    products: p
  } = n.props;
  return /* @__PURE__ */ g.jsxs(Ss, { eyebrow: i, title: a, className: "ac-tool--carousel", children: [
    u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: p.map((m, _) => {
      const w = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsx(C_, { image: m.image, title: m.title, compact: !0 }),
        /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-carousel__copy", children: [
          m.badge ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product__badge", children: m.badge }) : null,
          /* @__PURE__ */ g.jsx("h4", { className: "ac-tool-product__title", children: m.title }),
          m.reason || m.summary ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool-product__summary", children: m.reason || m.summary }) : null,
          /* @__PURE__ */ g.jsx(T_, { product: m, ctaLabel: m.ctaLabel || "View" })
        ] })
      ] });
      return m.url ? /* @__PURE__ */ g.jsx("a", { className: "ac-tool-carousel__card", href: m.url, role: "listitem", children: w }, m.id || m.handle || _) : /* @__PURE__ */ g.jsx("div", { className: "ac-tool-carousel__card", role: "listitem", children: w }, m.id || m.handle || _);
    }) }),
    d ? /* @__PURE__ */ g.jsx("div", { className: "ac-tool__footer", children: /* @__PURE__ */ g.jsx("a", { className: "ac-tool__footer-link", href: d, children: h }) }) : null
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
    steps: h,
    note: p,
    disclaimer: m,
    linkedProducts: _
  } = n.props;
  return /* @__PURE__ */ g.jsxs(Ss, { eyebrow: i, title: a, className: "ac-tool--ritual", children: [
    u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    d ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__detail", children: d }) : null,
    /* @__PURE__ */ g.jsx("ol", { className: "ac-ritual-steps", children: h.map((w) => /* @__PURE__ */ g.jsxs("li", { className: "ac-ritual-steps__item", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-ritual-steps__dot", "aria-hidden": "true" }),
      /* @__PURE__ */ g.jsx("span", { children: w })
    ] }, w)) }),
    _.length > 0 ? /* @__PURE__ */ g.jsx("div", { className: "ac-tool-chip-row", role: "list", "aria-label": "Linked products", children: _.map((w, b) => w.url ? /* @__PURE__ */ g.jsx("a", { className: "ac-tool-chip", href: w.url, role: "listitem", children: w.title }, w.id || w.handle || b) : /* @__PURE__ */ g.jsx("span", { className: "ac-tool-chip", role: "listitem", children: w.title }, w.id || w.handle || b)) }) : null,
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
    highlights: h,
    disclaimer: p
  } = n.props;
  return /* @__PURE__ */ g.jsxs(Ss, { eyebrow: i, title: a, className: "ac-tool--summary", children: [
    d ? /* @__PURE__ */ g.jsx("p", { className: "ac-summary__focus", children: d }) : null,
    /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }),
    h.length > 0 ? /* @__PURE__ */ g.jsx("ul", { className: "ac-summary__list", children: h.map((m) => /* @__PURE__ */ g.jsx("li", { children: m }, m)) }) : null,
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
    label: h,
    image: p
  } = n.props, m = /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-tool-collection__copy", children: [
      i ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__eyebrow", children: i }) : null,
      /* @__PURE__ */ g.jsx("h3", { className: "ac-tool__title", children: a }),
      u ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: u }) : null
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-tool-collection__action", children: /* @__PURE__ */ g.jsx("span", { children: h }) }),
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
  return /* @__PURE__ */ g.jsxs(Ss, { eyebrow: i, title: a, className: "ac-tool--next-steps", children: [
    /* @__PURE__ */ g.jsx("ul", { className: "ac-next-steps", children: u.map((h, p) => /* @__PURE__ */ g.jsxs("li", { className: "ac-next-steps__item", children: [
      /* @__PURE__ */ g.jsx("span", { className: "ac-next-steps__index", children: p + 1 }),
      /* @__PURE__ */ g.jsx("span", { children: h })
    ] }, h)) }),
    d ? /* @__PURE__ */ g.jsx("p", { className: "ac-tool__note", children: d }) : null
  ] });
}
function O_(r) {
  const n = Bn(r);
  return n ? /* @__PURE__ */ g.jsx(Ss, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ g.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function z_({ children: r }) {
  return /* @__PURE__ */ g.jsx("div", { className: "ac-tool-group", children: r });
}
const D_ = {
  tools: {
    by_name: {
      [ct.product_card]: A_,
      [ct.product_carousel]: M_,
      [ct.ritual_card]: N_,
      [ct.reading_summary]: P_,
      [ct.collection_link]: j_,
      [ct.next_steps]: L_
    },
    Fallback: O_
  },
  ToolGroup: z_
}, Rh = "[data-askcrystal-homepage-root]", Gi = /* @__PURE__ */ new Map(), F_ = "askcrystal-main-thread", B_ = "http://localhost:8787", df = "askcrystal-theme-session-id", Ah = "askcrystal-theme-chat-sessions-v1", Mh = "askcrystal-theme-active-session-id", U_ = "askcrystal:session-registry", ff = "askcrystal:session-select", hf = "askcrystal:session-create", to = 24, $_ = "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538";
let pf = 0;
const H_ = 7, Nh = Tt.createContext({
  sendPrompt: () => {
  },
  onCancel: () => {
  },
  isRunning: !1
});
function Ph() {
  return Tt.useContext(Nh);
}
function V_(r) {
  const n = document.getElementById(r);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function xs(r = []) {
  return r.map((n) => n.type === "text" || n.type === "reasoning" ? n.text : "").join(" ").trim();
}
function ul(r) {
  const n = r?.answer || r?.delta || r?.text || r?.message || r?.reply || r?.output || r?.data?.answer || r?.data?.text;
  return typeof n == "string" ? n : "";
}
function vn(r) {
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
  return vn(
    r?.suggestions || r?.suggestedQuestions || r?.suggested_questions || r?.data?.suggestions || r?.data?.suggestedQuestions || r?.data?.suggested_questions || []
  );
}
function jh() {
  return typeof window < "u" && typeof window.localStorage < "u";
}
function mf(r) {
  if (!jh()) return "";
  try {
    return window.localStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function gf(r, n) {
  if (jh())
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
function Lh(r, n = 52) {
  const i = typeof r == "string" ? r.replace(/\s+/g, " ").trim() : "";
  return i ? i.length <= n ? i : `${i.slice(0, Math.max(1, n - 1)).trimEnd()}…` : "";
}
function Q_(r) {
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
  return Array.isArray(r) ? r.map(Q_).filter(Boolean) : [];
}
function gl(r) {
  if (!r || typeof r != "object") return "";
  const n = r.content || r.parts || [], i = xs(Array.isArray(n) ? n : []);
  return i || (Array.isArray(r.metadata?.unstable_data) && r.metadata.unstable_data.length > 0 && r.role === "assistant" ? "Shared storefront picks and guidance." : "");
}
function ro(r, n = "New reading") {
  const i = Array.isArray(r) ? r.find((u) => u?.role === "user" && gl(u)) : null, a = gl(i);
  return a ? Lh(a, 42) : n;
}
function G_(r) {
  if (!Array.isArray(r) || r.length === 0)
    return "No messages yet.";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = gl(r[n]);
    if (i) return Lh(i, 78);
  }
  return "No messages yet.";
}
function Oh(r, n = null) {
  if (!Array.isArray(r) || r.length === 0) return n;
  for (let i = r.length - 1; i >= 0; i -= 1) {
    const a = r[i]?.createdAt;
    if (!a) continue;
    const u = new Date(a).toISOString();
    if (u) return u;
  }
  return n;
}
function Es(r) {
  return [...r].sort((n, i) => {
    const a = new Date(i?.updatedAt || 0).getTime(), u = new Date(n?.updatedAt || 0).getTime();
    return a - u;
  });
}
function so(r = {}) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), i = no(r.messages || []);
  return {
    id: typeof r.id == "string" && r.id ? r.id : yr("thread"),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : ro(i),
    createdAt: typeof r.createdAt == "string" && r.createdAt ? r.createdAt : n,
    updatedAt: typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : n,
    conversationId: typeof r.conversationId == "string" && r.conversationId ? r.conversationId : null,
    messages: i,
    suggestions: vn(r.suggestions || [])
  };
}
function q_(r) {
  if (!r || typeof r != "object") return null;
  const n = no(r.messages || []), i = typeof r.createdAt == "string" && r.createdAt ? r.createdAt : (/* @__PURE__ */ new Date()).toISOString(), a = typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : Oh(n, i) || i;
  return so({
    ...r,
    createdAt: i,
    updatedAt: a,
    messages: n,
    suggestions: vn(r.suggestions || []),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : ro(n)
  });
}
function K_() {
  const r = Y_(mf(Ah), []), n = Array.isArray(r) ? r.map(q_).filter(Boolean) : [], i = n.length > 0 ? Es(n).slice(0, to) : [so()], a = mf(Mh), u = i.some((d) => d.id === a) ? a : i[0].id;
  return {
    sessions: i,
    activeSessionId: u
  };
}
function J_({ sessions: r, activeSessionId: n }) {
  gf(
    Ah,
    JSON.stringify(Es(r).slice(0, to))
  ), gf(Mh, n);
}
function yf(r, n) {
  return Array.isArray(r) && r.find((i) => i.id === n) || null;
}
function vf(r) {
  return r ? {
    ...r,
    title: ro(r.messages, r.title || "New reading"),
    updatedAt: Oh(r.messages, (/* @__PURE__ */ new Date()).toISOString()) || (/* @__PURE__ */ new Date()).toISOString()
  } : null;
}
function _f(r, n, i = {}) {
  const a = [];
  let u = !1;
  for (const d of Array.isArray(r) ? r : []) {
    if (d.id !== n) {
      a.push(d);
      continue;
    }
    u = !0;
    const h = i.messages !== void 0 ? no(i.messages) : d.messages, p = vf({
      ...d,
      ...i,
      messages: h,
      suggestions: i.suggestions !== void 0 ? vn(i.suggestions) : d.suggestions,
      conversationId: i.conversationId !== void 0 ? i.conversationId || null : d.conversationId
    });
    a.push(p);
  }
  return u || a.push(vf(so({
    id: n,
    ...i
  }))), Es(a).slice(0, to);
}
function zh(r) {
  return Es(Array.isArray(r) ? r : []).map((n) => ({
    id: n.id,
    title: ro(n.messages, n.title || "New reading"),
    preview: G_(n.messages),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    isEmpty: !Array.isArray(n.messages) || n.messages.length === 0
  }));
}
function X_({ sessions: r, activeSessionId: n, isRunning: i }) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(U_, {
    detail: {
      sessions: zh(r),
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
function qt(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, h = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const p = `${n}-${h}`;
    if (d[2] && d[3]) {
      const m = d[3].trim();
      i.push(
        Z_(m) ? /* @__PURE__ */ g.jsx("a", { href: m, target: m.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ g.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ g.jsx("strong", { children: qt(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ g.jsx("em", { children: qt(d[6], `${p}-em`) }, p));
    u = a.lastIndex, h += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function _s(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function ew(r) {
  const n = _s(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function tw(r) {
  const n = _s(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function wf(r) {
  const n = _s(r);
  return n.length >= 2 && n.some(Boolean);
}
function nw(r, n) {
  const i = r[n];
  if (!wf(i)) return null;
  const a = _s(i), u = r[n + 1], d = tw(u);
  let h = n + (d ? 2 : 1);
  const p = [];
  for (; h < r.length && wf(r[h]); ) {
    const m = _s(r[h]);
    if (m.length !== a.length) break;
    p.push(m), h += 1;
  }
  return p.length === 0 ? null : {
    headers: a,
    alignments: d ? ew(u) : a.map(() => "left"),
    rows: p,
    nextIndex: h
  };
}
function rw(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function Dh({ text: r = "" }) {
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
      a < n.length && (a += 1), rw(b) ? i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ g.jsx(Dh, { text: w.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ g.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ g.jsx("code", { children: w.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const h = u.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const w = `h${h[1].length + 2}`;
      i.push(
        /* @__PURE__ */ g.jsx(w, { children: qt(h[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ g.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const p = nw(n, a);
    if (p) {
      const { headers: w, alignments: b, rows: v, nextIndex: R } = p;
      a = R, i.push(
        /* @__PURE__ */ g.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ g.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ g.jsx("thead", { children: /* @__PURE__ */ g.jsx("tr", { children: w.map((j, N) => /* @__PURE__ */ g.jsx(
            "th",
            {
              style: { textAlign: b[N] || "left" },
              children: qt(j, `table-head-${a}-${N}`)
            },
            `table-head-${a}-${N}`
          )) }) }),
          /* @__PURE__ */ g.jsx("tbody", { children: v.map((j, N) => /* @__PURE__ */ g.jsx("tr", { children: w.map((U, Y) => /* @__PURE__ */ g.jsx(
            "td",
            {
              style: { textAlign: b[Y] || "left" },
              children: qt(j[Y] || "", `table-cell-${a}-${N}-${Y}`)
            },
            `table-cell-${a}-${N}-${Y}`
          )) }, `table-row-${a}-${N}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        w.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ul", { children: w.map((b, v) => /* @__PURE__ */ g.jsx("li", { children: qt(b, `ul-${a}-${v}`) }, `ul-${a}-${v}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        w.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("ol", { children: w.map((b, v) => /* @__PURE__ */ g.jsx("li", { children: qt(b, `ol-${a}-${v}`) }, `ol-${a}-${v}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        w.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ g.jsx("blockquote", { children: w.map((b, v) => /* @__PURE__ */ g.jsx("p", { children: qt(b, `quote-${a}-${v}`) }, `quote-${a}-${v}`)) }, `quote-${a}`)
      );
      continue;
    }
    const m = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      m.push(n[a].trim()), a += 1;
    const _ = m.join(" ");
    i.push(
      /* @__PURE__ */ g.jsx("p", { children: qt(_, `p-${a}`) }, `p-${a}`)
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
  return iw(d).trim();
}
function Fh(r) {
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
function Sf(r) {
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
  const i = Fh(n);
  let a = Sf(i || n);
  if (!i) {
    if (!a) return "";
    const u = Uh(a);
    if (u && (a = Sf(u) || a), Bh(a) || yl(a))
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
function xf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(n) || /^```(?:json|xml)?\s*[\[{<]/.test(n) || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(n) || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(n) : !1;
}
function Uh(r) {
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
    if (!yl(h)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((h) => h.trim()).filter(Boolean);
  let d = 0;
  for (; d < u.length && yl(u[d]); )
    d += 1;
  return u.slice(d).join(`

`).trim();
}
function Ll(r) {
  return Array.isArray(r) ? r.map((n) => typeof n == "string" ? n.trim() : "").filter(Boolean).slice(-6) : typeof r == "string" ? r.split(`
`).map((n) => n.trim()).filter(Boolean).slice(-6) : [];
}
function aw({ statusStage: r = "", statusTool: n = "", statusText: i = "" }) {
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
function Bi(r) {
  const n = Math.sin(r * 12.9898 + 78.233) * 43758.5453;
  return n - Math.floor(n);
}
function lw({ statusText: r = "", statusStage: n = "", ambientStatusText: i = "", hasToolActivity: a = !1 }) {
  return i || (n && n !== "tool" && r ? r : a ? "Following the clearest thread..." : "Settling into your energy...");
}
function uw() {
  const [r, n] = k.useState(!1);
  return k.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
function cw({ statusText: r }) {
  return r ? /* @__PURE__ */ g.jsxs("div", { className: "ac-live-status", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("span", { className: "ac-live-status__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ g.jsx("span", { className: "ac-live-status__text", children: r })
  ] }) : null;
}
function dw({
  statusText: r,
  statusStage: n = "",
  statusTool: i = "",
  ambientStatusText: a = ""
}) {
  const u = uw(), d = k.useMemo(() => {
    const m = lw({
      statusText: r,
      statusStage: n,
      ambientStatusText: a,
      hasToolActivity: n === "tool"
    }), _ = aw({
      statusStage: n === "tool" ? "compose" : n,
      statusTool: i,
      statusText: m
    });
    return [...new Set([m, ..._].filter(Boolean))];
  }, [a, n, r, i]), [h, p] = k.useState(0);
  return k.useEffect(() => {
    p(0);
  }, [d]), k.useEffect(() => {
    if (u || d.length <= 1) return;
    const m = window.setTimeout(() => {
      p((_) => (_ + 1) % d.length);
    }, 7200);
    return () => window.clearTimeout(m);
  }, [d.length, h, u]), /* @__PURE__ */ g.jsx("p", { className: "ac-progress-card__ambient", children: d[h] || "The reading is still moving..." });
}
function fw(r) {
  return r >= 55e3 ? "This one is taking the longer orbit." : r >= 3e4 ? "Full readings can take 30-60 seconds to come through." : r >= 12e3 ? "A deeper read may take a few more moments." : r >= 4e3 ? "Following the strongest thread." : "The first signs are arriving.";
}
function hw({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = "",
  statusElapsedMs: d = 0
}) {
  const h = k.useRef(Date.now()), [p, m] = k.useState(0);
  k.useEffect(() => {
    const ee = window.setInterval(() => {
      m(Date.now() - h.current);
    }, 1e3);
    return () => window.clearInterval(ee);
  }, []);
  const _ = Math.max(Number(d) || 0, p), w = _ >= 4e3 || i === "tool" || i === "compose", b = Ll(n), v = r || "Opening the thread beneath your question...", R = "Choosing the strongest reading path", j = "Choosing the right reading path", N = b.filter((ee) => ee !== R && ee !== j);
  i === "tool" && v && v !== R && v !== j && !N.includes(v) && N.push(v);
  const U = N.slice(-1), Y = [
    {
      label: "Your question has entered the reading",
      state: "done"
    }
  ];
  if (w) {
    const ee = U.length > 0 || i === "compose";
    Y.push({
      label: ee ? "The strongest reading path is chosen" : R,
      state: ee ? "done" : "current"
    }), U.forEach((le, Q) => {
      const de = Q === U.length - 1;
      Y.push({
        label: le,
        state: i === "tool" && de ? "current" : "done"
      });
    }), Y.push({
      label: "Shaping the guidance into a clear answer",
      state: i === "compose" ? "current" : "pending"
    });
  } else
    Y.push({
      label: v,
      state: "current"
    });
  const ae = Y.slice(0, 4);
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-progress-card", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-progress-card__header", children: /* @__PURE__ */ g.jsxs("div", { className: "ac-progress-card__heading", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-progress-card__eyebrow", children: "AskCrystal is listening" }),
      /* @__PURE__ */ g.jsx("h3", { children: "Reading the signs" })
    ] }) }),
    /* @__PURE__ */ g.jsx("ol", { className: "ac-progress-card__steps ac-progress-card__steps--lyric", "aria-label": "Reading progress", children: ae.map((ee, le) => /* @__PURE__ */ g.jsxs(
      "li",
      {
        className: `ac-progress-card__step ac-progress-card__step--${ee.state}`,
        style: { "--ac-progress-step-index": le },
        children: [
          /* @__PURE__ */ g.jsx("span", { className: "ac-progress-card__step-marker", "aria-hidden": "true" }),
          /* @__PURE__ */ g.jsx("span", { className: "ac-progress-card__step-label", children: ee.label })
        ]
      },
      `${ee.label}-${le}`
    )) }),
    /* @__PURE__ */ g.jsx(
      dw,
      {
        statusText: r,
        statusStage: i,
        statusTool: a,
        ambientStatusText: u
      }
    ),
    /* @__PURE__ */ g.jsx("div", { className: "ac-progress-card__footer", children: /* @__PURE__ */ g.jsx("p", { className: "ac-progress-card__expectation", children: fw(_) }) })
  ] });
}
function pw(r) {
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
    taskId: Vh(r),
    elapsedMs: Number.isFinite(n) ? Math.max(0, n) : 0
  };
}
function $h(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return xs(i.content);
  }
  return "";
}
function fl(r, n) {
  return r.find((i) => n(i));
}
function mw({ matchedIntention: r, fallbackProduct: n, products: i }) {
  return r?.product ? Dn([], [
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
  ]) : Dn([], [
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
function gw(r, n) {
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
  ].find((m) => m.test.test(i)), d = n[0], h = mw({
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
function Hh(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = Fh(n), u = (i || n).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && Bh(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), h = Uh(u), p = d >= 0 ? u.slice(d).trim() : h || u, _ = p.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).filter((b) => !xf(b)), w = (_.length > 0 ? _.join(`

`) : p).trim();
    if (w && !xf(w))
      return w;
  }
  return "";
}
function yw(r) {
  const n = Hh(r);
  return n || [
    "I tried to check the shelf for you, but the live catalog result was not available in this moment.",
    "For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”",
    "If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely."
  ].join(`

`);
}
function Ef(r, n = []) {
  const i = Ih(r), a = Dn(n, i.components), u = yw(i.answer);
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
function hr({ text: r = "", components: n = [] } = {}) {
  const i = typeof r == "string" ? r : "", a = Ih(i), u = Dn(n, a.components), d = h_(i), h = [], p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), _ = (v) => `${v.toolName}:${v.toolCallId}`;
  for (const v of u) {
    const R = cf(v);
    R && m.set(_(R), R);
  }
  const w = (v) => {
    const R = m_(v).trim(), j = Hh(R);
    if (!j) return;
    const N = h[h.length - 1];
    if (N?.type === "text") {
      N.text = `${N.text}

${j}`.trim();
      return;
    }
    h.push({
      type: "text",
      text: j
    });
  }, b = (v) => {
    for (const R of v) {
      const j = cf(R);
      if (!j) continue;
      const N = _(j);
      p.has(N) || (h.push(m.get(N) || j), p.add(N));
    }
  };
  if (d.some((v) => v.type === "payload"))
    for (const v of d) {
      if (v.type === "text") {
        w(v.value);
        continue;
      }
      b(jl(v.value));
    }
  else
    w(i);
  for (const v of m.values()) {
    const R = _(v);
    p.has(R) || h.push(v);
  }
  return h;
}
function vw(r) {
  return /^https?:\/\//i.test(r);
}
function gr(r) {
  return r ? vw(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${B_}${r}` : r : "";
}
function _w(r) {
  return r ? r.endsWith("/stream") ? gr(r) : gr(`${r.replace(/\/$/, "")}/stream`) : "";
}
function ww(r) {
  return r ? r.endsWith("/stop") ? gr(r) : gr(`${r.replace(/\/$/, "")}/stop`) : "";
}
function Sw(r) {
  return r ? r.endsWith("/suggestions") ? gr(r) : gr(`${r.replace(/\/$/, "")}/suggestions`) : "";
}
function xw() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  try {
    const r = window.localStorage.getItem(df);
    if (r) return r;
    const n = yr("session");
    return window.localStorage.setItem(df, n), n;
  } catch {
    return yr("session");
  }
}
function Ew(r) {
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
function Vh(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function kw(r) {
  const n = r?.messageId || r?.message_id || r?.data?.messageId || r?.data?.message_id;
  return typeof n == "string" ? n : "";
}
function Wh() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function Ct(r) {
  if (r?.aborted)
    throw Wh();
}
function bw(r = "", n = "") {
  const i = Math.min(r.length, n.length);
  let a = 0;
  for (; a < i && r[a] === n[a]; )
    a += 1;
  return a;
}
function Cw(r, n = 28, i = "normal") {
  if (typeof r != "string" || !r) return [];
  const a = r.match(/\n+|[^\s\n]+(?:\s+)?|[ \t]+/g) || [r];
  if (a.length <= n) return a;
  if (i === "final") {
    const h = [], p = Math.min(a.length, n);
    let m = 0;
    for (; m < a.length; ) {
      const _ = a.length - m, w = Math.max(1, p - h.length), b = _ / w, v = Math.max(1, Math.floor(b)), R = Bi(m + r.length + h.length), j = R > 0.72 ? 1 : R < 0.18 ? -1 : 0;
      let N = Math.max(1, Math.round(v + j));
      const U = a[m] || "", Y = U.trim();
      /[\n]/.test(U) || /[.!?。！？]$/.test(Y) ? N = 1 : /[,:;，；：]$/.test(Y) ? N = Math.min(N, 2) : N = Math.min(N, 3), h.push(a.slice(m, m + N).join("")), m += N;
    }
    return h;
  }
  const u = Math.ceil(a.length / n), d = [];
  for (let h = 0; h < a.length; h += u)
    d.push(a.slice(h, h + u).join(""));
  return d;
}
function Tw(r, n = "normal", i = "", a = 0) {
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
  const d = typeof i == "string" ? i.trim() : "", h = /[.!?。！？]$/.test(d) ? 176 : /[,;:，；：]$/.test(d) ? 104 : /\n/.test(i) ? 136 : 0, p = n === "final" ? Math.min(28, Math.max(0, d.length * 2 - 10)) : 0, m = n === "final" ? 52 : 6, _ = Math.round((Bi(a + r + d.length) - 0.5) * m), w = n === "final" && Bi(a * 3.17 + r) > 0.78 ? 64 + Math.round(Bi(a + 17) * 48) : 0;
  return Math.max(0, u + h + p + _ + w);
}
function Iw(r, n) {
  return r ? new Promise((i, a) => {
    const u = globalThis.setTimeout(() => {
      h(), i();
    }, r), d = () => {
      h(), a(Wh());
    };
    function h() {
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
  const h = !!r && n.startsWith(r);
  let p = h ? r : "";
  if (!h && r) {
    const v = bw(r, n);
    v / Math.max(1, Math.min(r.length, n.length)) >= 0.65 && (p = n.slice(0, v));
  }
  const m = n.slice(p.length);
  if (!m)
    return p !== r && a?.("", p, u), n;
  const _ = d === "fast" ? n.length > 1400 ? 64 : n.length > 700 ? 52 : 40 : d === "final" ? n.length > 1800 ? 120 : n.length > 1200 ? 104 : n.length > 700 ? 88 : 68 : n.length > 1400 ? 44 : n.length > 700 ? 36 : 28, w = Cw(m, _, d);
  let b = p;
  for (let v = 0; v < w.length; v += 1) {
    Ct(i);
    const R = w[v];
    if (b += R, a?.(!h && v === 0 ? "" : R, b, u), v < w.length - 1) {
      const N = Tw(w.length, d, R, v);
      await Iw(N, i);
    }
  }
  return n;
}
async function Aw({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a }) {
  if (!(!r || !n))
    try {
      await fetch(ww(r), {
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
async function Mw({ apiEndpoint: r, messageId: n, sessionId: i }) {
  if (!r || !n) return [];
  try {
    const a = await fetch(Sw(r), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messageId: n,
        sessionId: i
      })
    });
    if (!a.ok) return [];
    const u = await a.json();
    return vn(
      u?.suggestions || u?.data?.suggestions || u?.data || []
    );
  } catch (a) {
    return console.error("[AskCrystal] Suggested prompts request failed.", a), [];
  }
}
async function Nw({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: h, onComponents: p, onSuggestions: m }) {
  Ct(i);
  const _ = await fetch(_w(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: $h(n),
      conversationId: a,
      sessionId: u
    }),
    signal: i
  });
  if (!_.ok) {
    let ae = `Proxy returned ${_.status}`;
    try {
      const ee = await _.json();
      ae = ee?.error || ee?.message || ae;
    } catch {
    }
    throw new Error(ae);
  }
  if (!_.body)
    throw new Error("The proxy did not return a readable stream.");
  const w = _.body.getReader(), b = new TextDecoder();
  let v = "", R = "", j = "", N = [], U = [], Y = a || null;
  for (; ; ) {
    Ct(i);
    const { done: ae, value: ee } = await w.read();
    if (ae) break;
    Ct(i), v += b.decode(ee, { stream: !0 });
    const le = Ew(v);
    v = le.remaining;
    for (const Q of le.events) {
      if (Ct(i), Q.event === "status" && typeof Q.payload?.message == "string" && (Ct(i), d?.(Q.payload)), Q.event === "error")
        throw new Error(Q.payload?.error || Q.payload?.message || "The proxy stream failed.");
      const de = jl(Q.payload);
      de.length && (Ct(i), N = Dn(N, de), p?.(N, de, Q.payload), Y = Q.payload?.conversationId || Q.payload?.conversation_id || Y);
      const ue = W_(Q.payload);
      if (ue.length && (Ct(i), U = ue, m?.(ue, Q.payload), Y = Q.payload?.conversationId || Q.payload?.conversation_id || Y), Q.event === "replace") {
        Ct(i);
        const J = ul(Q.payload);
        if (J) {
          R = J;
          const ye = dl(R);
          ye && (j = ye);
        }
        Y = Q.payload?.conversationId || Q.payload?.conversation_id || Y;
      }
      if (["delta", "message", "agent_message"].includes(Q.event)) {
        Ct(i);
        const J = ul(Q.payload);
        if (J) {
          R += J;
          const ye = dl(R);
          ye && (j = ye);
        }
        Y = Q.payload?.conversationId || Q.payload?.conversation_id || Y;
      }
      if (Q.event === "complete") {
        Ct(i);
        const J = ul(Q.payload) || R, Le = dl(J) || j || j, Ce = Ef(J || Le, N);
        return {
          answer: Ce.answer,
          components: Ce.components,
          sourceText: Ce.sourceText,
          suggestions: ue.length ? ue : U,
          conversationId: Q.payload?.conversationId || Q.payload?.conversation_id || Y || null,
          messageId: kw(Q.payload) || null
        };
      }
    }
  }
  if (j || N.length > 0) {
    const ae = Ef(j, N);
    return {
      answer: ae.answer,
      components: ae.components,
      sourceText: ae.sourceText,
      suggestions: U,
      conversationId: Y,
      messageId: null
    };
  }
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function yr(r = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${r}-${crypto.randomUUID()}` : (pf += 1, `${r}-${Date.now()}-${pf}`);
}
function Pw(r) {
  return {
    id: yr("user"),
    role: "user",
    createdAt: /* @__PURE__ */ new Date(),
    content: r.content || [],
    attachments: r.attachments || [],
    metadata: r.metadata || {
      custom: {}
    }
  };
}
function Ln({
  id: r = yr("assistant"),
  text: n = "",
  parts: i = null,
  components: a = [],
  status: u,
  error: d,
  statusText: h = "",
  statusStage: p = "",
  statusTool: m = "",
  statusHistory: _ = [],
  ambientStatusText: w = "",
  statusElapsedMs: b = null
}) {
  const v = Ll(_).join(`
`), R = Number(b);
  return {
    id: r,
    role: "assistant",
    createdAt: /* @__PURE__ */ new Date(),
    content: Array.isArray(i) ? i : hr({ text: n, components: a }),
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
        ...m ? { statusTool: m } : {},
        ...v ? { statusHistoryText: v } : {},
        ...w ? { ambientStatusText: w } : {},
        ...Number.isFinite(R) ? { statusElapsedMs: Math.max(0, R) } : {}
      }
    }
  };
}
function jw(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Ll(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((h) => h !== a);
  return d.push(a), d.slice(-4);
}
function vl({ id: r, text: n = "", components: i = [] }) {
  const u = !!(typeof n == "string" ? n.trim() : "") || i.length > 0;
  return Ln({
    id: r,
    parts: hr({
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
function kf(r, n) {
  if (!Array.isArray(r) || !n || r.length === 0)
    return Array.isArray(r) ? [...r] : [];
  const i = [...r], a = i[i.length - 1];
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = vl({
    id: a.id,
    text: xs(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function Lw({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: h, onComponents: p, onSuggestions: m }) {
  const _ = $h(n);
  if (r.runtimeMode === "proxy" && r.apiEndpoint)
    try {
      return await Nw({
        apiEndpoint: r.apiEndpoint,
        messages: n,
        abortSignal: i,
        conversationId: a,
        sessionId: u,
        onStatus: d,
        onDelta: h,
        onComponents: p,
        onSuggestions: m
      });
    } catch (b) {
      throw b?.name === "AbortError" || console.error("[AskCrystal] Proxy runtime failed.", b), b;
    }
  const w = gw(_, r.products);
  return {
    answer: w.answer,
    components: w.components || [],
    suggestions: [],
    sourceText: w.answer,
    conversationId: a,
    messageId: null
  };
}
function Ow(r) {
  const n = k.useMemo(() => K_(), []), i = yf(n.sessions, n.activeSessionId) || n.sessions[0], [a, u] = k.useState(n.sessions), [d, h] = k.useState(i.id), [p, m] = k.useState(i.messages), [_, w] = k.useState(i.suggestions), [b, v] = k.useState(!1), R = k.useRef(null), j = k.useRef(""), N = k.useRef(""), U = k.useRef(!1), Y = k.useRef(i.conversationId || null), ae = k.useRef(p), ee = k.useRef(a), le = k.useRef(d), Q = k.useRef(b), de = k.useRef(xw());
  k.useEffect(() => {
    ae.current = p;
  }, [p]), k.useEffect(() => {
    ee.current = a;
  }, [a]), k.useEffect(() => {
    le.current = d;
  }, [d]), k.useEffect(() => {
    Q.current = b;
  }, [b]), k.useEffect(() => {
    u((K) => _f(K, d, {
      messages: kf(p, U.current),
      suggestions: _,
      conversationId: Y.current,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }, [d, p, _]), k.useEffect(() => {
    J_({
      sessions: a,
      activeSessionId: d
    }), X_({
      sessions: a,
      activeSessionId: d,
      isRunning: b
    });
  }, [d, b, a]);
  const ue = k.useCallback((K) => {
    K && (Y.current = K.conversationId || null, U.current = !1, N.current = "", h(K.id), m(no(K.messages)), w(vn(K.suggestions)));
  }, []), J = k.useCallback((K) => {
    if (!K || Q.current)
      return;
    if (K === le.current) {
      cl();
      return;
    }
    const re = yf(ee.current, K);
    if (!re) return;
    const O = {
      ...re,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    u((B) => _f(B, K, {
      updatedAt: O.updatedAt
    })), ue(O), cl();
  }, [ue]), ye = k.useCallback(() => {
    if (Q.current) return;
    const K = so();
    u(
      (re) => Es([K, ...re]).slice(0, to)
    ), ue(K), cl();
  }, [ue]);
  k.useEffect(() => {
    if (typeof window > "u") return;
    const K = (O) => {
      J(O.detail?.sessionId || "");
    }, re = () => {
      ye();
    };
    return window.addEventListener(ff, K), window.addEventListener(hf, re), () => {
      window.removeEventListener(ff, K), window.removeEventListener(hf, re);
    };
  }, [ye, J]);
  const Le = k.useCallback((K) => {
    m(kf(K, U.current));
  }, []), Ce = k.useCallback((K, re) => {
    m(
      (O) => O.map((B) => B.id !== K ? B : re(B))
    );
  }, []), Xe = k.useCallback(async () => {
    const K = R.current, re = j.current, O = N.current, B = Y.current, F = de.current;
    K?.abort(), U.current = !0, Q.current = !1, v(!1), w([]), re && Ce(
      re,
      (E) => vl({
        id: E.id,
        text: xs(E.content || []),
        components: E.metadata?.unstable_data || []
      })
    ), !(!O || !r.apiEndpoint) && await Aw({
      apiEndpoint: r.apiEndpoint,
      taskId: O,
      sessionId: F,
      conversationId: B
    });
  }, [r.apiEndpoint, Ce]), Oe = k.useCallback(
    async (K) => {
      if (K.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      const re = Pw(K), O = yr("assistant"), B = new AbortController(), F = Ln({
        id: O,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy...",
        statusElapsedMs: 0
      }), E = [...ae.current, re];
      R.current = B, j.current = O, N.current = "", U.current = !1, Q.current = !0, v(!0), w([]), m([...E, F]);
      let A = "", te = [], se = [];
      try {
        const X = await Lw({
          config: r,
          messages: E,
          abortSignal: B.signal,
          conversationId: Y.current,
          sessionId: de.current,
          onStatus: (ie) => {
            if (B.signal.aborted) return;
            const ne = pw(ie);
            ne.taskId && (N.current = ne.taskId), Ce(
              O,
              (ze) => Ln({
                id: O,
                parts: hr({
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
                statusHistory: jw(ze.metadata?.custom?.statusHistoryText, ne),
                ambientStatusText: ne.stage === "tool" ? ze.metadata?.custom?.ambientStatusText || "Settling into your energy..." : ne.message,
                statusElapsedMs: ne.elapsedMs
              })
            );
          },
          onComponents: (ie, ne, ze) => {
            if (B.signal.aborted) return;
            const _n = Vh(ze);
            _n && (N.current = _n), te = ie;
          },
          onSuggestions: (ie) => {
            B.signal.aborted || (se = vn(ie));
          }
        });
        Y.current = X.conversationId || Y.current, N.current = "", U.current = !1;
        const ce = X.components || te, ge = vn(
          X.suggestions?.length ? X.suggestions : se
        );
        if (Ce(
          O,
          () => Ln({
            id: O,
            parts: hr({
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
        ), A = await Rw({
          currentAnswer: "",
          nextAnswer: X.answer,
          abortSignal: B.signal,
          speed: "final",
          onDelta: (ie, ne) => {
            B.signal.aborted || (A = ne, Ce(
              O,
              () => Ln({
                id: O,
                parts: hr({
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
          ...E,
          Ln({
            id: O,
            parts: hr({
              text: A || X.answer || X.sourceText,
              components: ce
            }),
            components: ce,
            status: {
              type: "complete",
              reason: "stop"
            }
          })
        ]), w(ge), X.messageId && r.apiEndpoint) {
          const ie = le.current;
          Mw({
            apiEndpoint: r.apiEndpoint,
            messageId: X.messageId,
            sessionId: de.current
          }).then((ne) => {
            ne.length && le.current === ie && w(ne);
          });
        }
      } catch (X) {
        if (X?.name === "AbortError") {
          N.current = "", w([]), m([
            ...E,
            vl({
              id: O,
              text: A,
              components: []
            })
          ]);
          return;
        }
        console.error("[AskCrystal] Assistant runtime failed.", X), N.current = "", U.current = !1, w([]), m([
          ...E,
          Ln({
            id: O,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: X?.message || "Unknown runtime error"
            },
            error: X?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        R.current === B && (R.current = null), j.current === O && (j.current = ""), N.current && B.signal.aborted && (N.current = ""), Q.current = !1, v(!1);
      }
    },
    [r, Ce]
  ), it = k.useCallback((K) => {
    const re = typeof K == "string" ? K.trim() : "";
    !re || Q.current || Oe({
      role: "user",
      content: [
        {
          type: "text",
          text: re
        }
      ],
      metadata: {
        custom: {
          source: "suggestion"
        }
      }
    });
  }, [Oe]), dt = k.useMemo(
    () => ({
      messages: p,
      suggestions: _,
      isRunning: b,
      setMessages: Le,
      onImport: Le,
      onNew: Oe,
      onCancel: Xe,
      adapters: {
        threadList: {
          threadId: d || F_,
          threads: zh(a).map((K) => ({
            id: K.id,
            remoteId: K.id,
            title: K.title
          }))
        }
      }
    }),
    [d, b, p, Xe, Oe, Le, a, _]
  );
  return {
    runtime: Wg(dt),
    hasUserMessages: p.some((K) => K.role === "user"),
    activeSessionId: d,
    sendPrompt: it,
    onCancel: Xe,
    isRunning: b
  };
}
function zw({ product: r }) {
  return /* @__PURE__ */ g.jsxs("a", { className: "ac-homepage__product-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-media", children: r.image ? /* @__PURE__ */ g.jsx("img", { src: r.image, alt: r.title, loading: "lazy" }) : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__product-meta", children: r.badge || "Bestseller" }),
      /* @__PURE__ */ g.jsx("h3", { children: r.title }),
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__product-link", children: "View product" })
    ] })
  ] });
}
function Dw({ config: r }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-shelf", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "ac-homepage__guide-shelf-header", children: [
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
        /* @__PURE__ */ g.jsx("h2", { children: r.shelfHeading })
      ] }),
      /* @__PURE__ */ g.jsx("a", { className: "ac-homepage__browse-link", href: r.browseUrl, children: "Browse all" })
    ] }),
    r.products.length ? /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ g.jsx(zw, { product: n }, n.id)) }) : /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
  ] });
}
function Fw({ card: r }) {
  const { sendPrompt: n, isRunning: i } = Ph(), a = [
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
function Bw({ config: r }) {
  const n = typeof r.headingLine1 == "string" ? r.headingLine1.trim() : "", i = typeof r.headingLine2Prefix == "string" ? r.headingLine2Prefix.trim() : "", a = typeof r.headingAccent == "string" ? r.headingAccent.trim() : "", u = typeof r.headingSuffix == "string" ? r.headingSuffix.trim() : "", d = a && u.toLowerCase().startsWith(`${a.toLowerCase()} `) ? u.slice(a.length).trimStart() : u, h = !!(n || i || a || d), p = [n, i].filter(Boolean).join(" "), m = (w, b) => {
    if (!w) return null;
    const v = Array.from(w.matchAll(/\byou\b/gi));
    if (!v.length)
      return w;
    const R = [];
    let j = 0;
    return v.forEach((N, U) => {
      const Y = N.index ?? 0;
      Y > j && R.push(
        /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-copy", children: w.slice(j, Y) }, `${b}-copy-${U}`)
      ), R.push(
        /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-accent", children: N[0] }, `${b}-accent-${U}`)
      ), j = Y + N[0].length;
    }), j < w.length && R.push(
      /* @__PURE__ */ g.jsx("span", { className: "ac-homepage__guide-title-copy", children: w.slice(j) }, `${b}-copy-tail`)
    ), R;
  }, _ = [
    {
      id: "compatibility",
      layout: "portrait",
      eyebrow: "Love",
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
      id: "horoscope",
      layout: "wide",
      eyebrow: "Horoscope",
      title: "Check today's cosmic weather",
      description: "Get zodiac timing, mood guidance, and crystal support.",
      cta: "Read my horoscope",
      emblemUrl: "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_4.png?v=1777105421",
      prompt: "Give me a daily horoscope reading and crystal guidance. Ask for my zodiac sign if you need it."
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
      /* @__PURE__ */ g.jsx("h1", { className: "ac-homepage__guide-title", children: h ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
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
      _.map((w) => /* @__PURE__ */ g.jsx(Fw, { card: w }, w.id)),
      /* @__PURE__ */ g.jsx(Dw, { config: r })
    ] })
  ] }) });
}
function Uw() {
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
          /* @__PURE__ */ g.jsx(ml, { running: !1, children: /* @__PURE__ */ g.jsx(Cv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ g.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ g.jsx(ml, { running: !0, children: /* @__PURE__ */ g.jsx(Wv, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function $w() {
  return typeof document > "u" ? null : Zm.createPortal(
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ g.jsx(Uw, {}) }),
    document.body
  );
}
function Hw() {
  return /* @__PURE__ */ g.jsx(Al, { className: "ac-message ac-message--user", children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ g.jsx(Ml, {}) }) });
}
function Vw() {
  const { sendPrompt: r, isRunning: n } = Ph(), i = zt((p) => p.id || ""), a = zt((p) => p.status?.type === "complete"), u = Se(({ thread: p }) => p.suggestions || []), d = Se(({ thread: p }) => p.isRunning), h = Se(({ thread: p }) => {
    for (let m = p.messages.length - 1; m >= 0; m -= 1) {
      const _ = p.messages[m];
      if (_?.role === "assistant")
        return _.id === i;
    }
    return !1;
  });
  return !a || d || !h || !u.length ? null : /* @__PURE__ */ g.jsx("div", { className: "ac-message__suggestions", "aria-label": "Suggested follow-up prompts", children: u.map((p, m) => /* @__PURE__ */ g.jsx(
    "button",
    {
      type: "button",
      className: "ac-message__suggestion",
      disabled: d || n,
      onClick: () => r(p.prompt),
      children: p.prompt
    },
    `${i}-suggestion-${m}-${p.prompt}`
  )) });
}
function Ww() {
  const r = zt((v) => v.content || v.parts || []), n = xs(r), i = r.some((v) => v.type === "tool-call"), a = zt((v) => v.status?.type === "running"), u = zt((v) => v.metadata?.custom?.statusText || ""), d = zt((v) => v.metadata?.custom?.statusStage || ""), h = zt((v) => v.metadata?.custom?.statusTool || ""), p = zt((v) => v.metadata?.custom?.statusHistoryText || ""), m = zt((v) => v.metadata?.custom?.ambientStatusText || ""), _ = zt((v) => v.metadata?.custom?.statusElapsedMs || 0), w = a && !n && !i, b = a && (!!n || i) && d === "tool" && !!u;
  return /* @__PURE__ */ g.jsxs(Al, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ g.jsx("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: w ? /* @__PURE__ */ g.jsx(
      hw,
      {
        statusText: u,
        statusHistoryText: p,
        statusStage: d,
        statusTool: h,
        ambientStatusText: m,
        statusElapsedMs: _
      }
    ) : /* @__PURE__ */ g.jsx("div", { className: "ac-message__content-layer", children: /* @__PURE__ */ g.jsx(
      Ml,
      {
        components: {
          Text: ({ text: v }) => /* @__PURE__ */ g.jsx(Dh, { text: v }),
          ...D_
        }
      }
    ) }) }),
    b ? /* @__PURE__ */ g.jsx("div", { className: "ac-message__status", children: /* @__PURE__ */ g.jsx(cw, { statusText: u }) }) : null,
    /* @__PURE__ */ g.jsx(Vw, {}),
    /* @__PURE__ */ g.jsx(fh, { children: /* @__PURE__ */ g.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function Yw({ config: r }) {
  const { runtime: n, hasUserMessages: i, activeSessionId: a, sendPrompt: u, onCancel: d, isRunning: h } = Ow(r), p = k.useMemo(() => ({
    sendPrompt: u,
    onCancel: d,
    isRunning: h
  }), [h, d, u]), m = k.useRef(null), _ = k.useRef(null), w = k.useRef(!1);
  return k.useEffect(() => {
    if (!_.current) return;
    const v = window.requestAnimationFrame(() => {
      if (_.current) {
        if (!i) {
          w.current = !1, _.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        w.current || (w.current = !0, _.current.scrollTo({ top: _.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame(v);
  }, [a, i]), k.useEffect(() => {
    const b = m.current, v = _.current;
    if (!b || !v || typeof window > "u") return;
    const R = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let j = 0;
    const N = () => {
      j = 0;
      const Y = Math.max(180, Math.min(320, v.clientHeight * 0.4)), ae = R?.matches ? 0 : Math.min(54, v.scrollTop * 0.18), ee = Math.max(0, 1 - v.scrollTop / Y);
      b.style.setProperty("--ac-homepage-backdrop-offset", `${ae.toFixed(2)}px`), b.style.setProperty("--ac-homepage-backdrop-opacity", ee.toFixed(3));
    }, U = () => {
      j || (j = window.requestAnimationFrame(N));
    };
    return N(), v.addEventListener("scroll", U, { passive: !0 }), () => {
      v.removeEventListener("scroll", U), j && window.cancelAnimationFrame(j);
    };
  }, [a]), /* @__PURE__ */ g.jsx(Nh.Provider, { value: p, children: /* @__PURE__ */ g.jsx(Wy, { runtime: n, children: /* @__PURE__ */ g.jsxs("div", { ref: m, className: "ac-homepage", children: [
    /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__backdrop", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("img", { src: $_, alt: "", loading: "eager", decoding: "async" }) }),
    /* @__PURE__ */ g.jsx(yh, { className: "ac-homepage__thread", children: /* @__PURE__ */ g.jsxs(
      _h,
      {
        ref: _,
        className: "ac-homepage__viewport",
        autoScroll: i,
        turnAnchor: i ? "bottom" : "top",
        scrollToBottomOnInitialize: !1,
        scrollToBottomOnRunStart: i,
        scrollToBottomOnThreadSwitch: i,
        children: [
          /* @__PURE__ */ g.jsx(Bw, { config: r }),
          /* @__PURE__ */ g.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ g.jsx(
            Zv,
            {
              components: {
                UserMessage: Hw,
                AssistantMessage: Ww
              }
            }
          ) }),
          /* @__PURE__ */ g.jsx($w, {})
        ]
      }
    ) })
  ] }) }) });
}
function Qw(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || Gi.has(i)) return;
  const a = V_(n);
  if (!a) return;
  const u = Xm.createRoot(r);
  u.render(/* @__PURE__ */ g.jsx(Yw, { config: a })), Gi.set(i, u);
}
function Gw(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = Gi.get(n);
  i && (i.unmount(), Gi.delete(n));
}
function Yh(r = document) {
  r.querySelectorAll(Rh).forEach((n) => Qw(n));
}
function qw(r) {
  r.querySelectorAll(Rh).forEach((n) => Gw(n));
}
Yh();
document.addEventListener("shopify:section:load", (r) => {
  Yh(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  qw(r.target);
});
