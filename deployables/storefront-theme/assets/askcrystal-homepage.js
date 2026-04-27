function Qm(r, n) {
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
function If(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var tl = { exports: {} }, ls = {}, nl = { exports: {} }, oe = {};
var Pd;
function Km() {
  if (Pd) return oe;
  Pd = 1;
  var r = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), h = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), w = /* @__PURE__ */ Symbol.for("react.lazy"), C = Symbol.iterator;
  function v(E) {
    return E === null || typeof E != "object" ? null : (E = C && E[C] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var R = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, j = Object.assign, M = {};
  function B(E, A, te) {
    this.props = E, this.context = A, this.refs = M, this.updater = te || R;
  }
  B.prototype.isReactComponent = {}, B.prototype.setState = function(E, A) {
    if (typeof E != "object" && typeof E != "function" && E != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, E, A, "setState");
  }, B.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = B.prototype;
  function re(E, A, te) {
    this.props = E, this.context = A, this.refs = M, this.updater = te || R;
  }
  var Z = re.prototype = new Y();
  Z.constructor = re, j(Z, B.prototype), Z.isPureReactComponent = !0;
  var ne = Array.isArray, q = Object.prototype.hasOwnProperty, ae = { current: null }, ie = { key: !0, ref: !0, __self: !0, __source: !0 };
  function X(E, A, te) {
    var se, le = {}, J = null, me = null;
    if (A != null) for (se in A.ref !== void 0 && (me = A.ref), A.key !== void 0 && (J = "" + A.key), A) q.call(A, se) && !ie.hasOwnProperty(se) && (le[se] = A[se]);
    var fe = arguments.length - 2;
    if (fe === 1) le.children = te;
    else if (1 < fe) {
      for (var ue = Array(fe), he = 0; he < fe; he++) ue[he] = arguments[he + 2];
      le.children = ue;
    }
    if (E && E.defaultProps) for (se in fe = E.defaultProps, fe) le[se] === void 0 && (le[se] = fe[se]);
    return { $$typeof: r, type: E, key: J, ref: me, props: le, _owner: ae.current };
  }
  function ye(E, A) {
    return { $$typeof: r, type: E.type, key: A, ref: E.ref, props: E.props, _owner: E._owner };
  }
  function De(E) {
    return typeof E == "object" && E !== null && E.$$typeof === r;
  }
  function Ne(E) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(te) {
      return A[te];
    });
  }
  var Fe = /\/+/g;
  function Be(E, A) {
    return typeof E == "object" && E !== null && E.key != null ? Ne("" + E.key) : A.toString(36);
  }
  function He(E, A, te, se, le) {
    var J = typeof E;
    (J === "undefined" || J === "boolean") && (E = null);
    var me = !1;
    if (E === null) me = !0;
    else switch (J) {
      case "string":
      case "number":
        me = !0;
        break;
      case "object":
        switch (E.$$typeof) {
          case r:
          case n:
            me = !0;
        }
    }
    if (me) return me = E, le = le(me), E = se === "" ? "." + Be(me, 0) : se, ne(le) ? (te = "", E != null && (te = E.replace(Fe, "$&/") + "/"), He(le, A, te, "", function(he) {
      return he;
    })) : le != null && (De(le) && (le = ye(le, te + (!le.key || me && me.key === le.key ? "" : ("" + le.key).replace(Fe, "$&/") + "/") + E)), A.push(le)), 1;
    if (me = 0, se = se === "" ? "." : se + ":", ne(E)) for (var fe = 0; fe < E.length; fe++) {
      J = E[fe];
      var ue = se + Be(J, fe);
      me += He(J, A, te, ue, le);
    }
    else if (ue = v(E), typeof ue == "function") for (E = ue.call(E), fe = 0; !(J = E.next()).done; ) J = J.value, ue = se + Be(J, fe++), me += He(J, A, te, ue, le);
    else if (J === "object") throw A = String(E), Error("Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead.");
    return me;
  }
  function dt(E, A, te) {
    if (E == null) return E;
    var se = [], le = 0;
    return He(E, se, "", "", function(J) {
      return A.call(te, J, le++);
    }), se;
  }
  function Ve(E) {
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
  var H = { current: null }, O = { transition: null }, F = { ReactCurrentDispatcher: H, ReactCurrentBatchConfig: O, ReactCurrentOwner: ae };
  function z() {
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
    if (!De(E)) throw Error("React.Children.only expected to receive a single React element child.");
    return E;
  } }, oe.Component = B, oe.Fragment = i, oe.Profiler = u, oe.PureComponent = re, oe.StrictMode = a, oe.Suspense = g, oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = F, oe.act = z, oe.cloneElement = function(E, A, te) {
    if (E == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + E + ".");
    var se = j({}, E.props), le = E.key, J = E.ref, me = E._owner;
    if (A != null) {
      if (A.ref !== void 0 && (J = A.ref, me = ae.current), A.key !== void 0 && (le = "" + A.key), E.type && E.type.defaultProps) var fe = E.type.defaultProps;
      for (ue in A) q.call(A, ue) && !ie.hasOwnProperty(ue) && (se[ue] = A[ue] === void 0 && fe !== void 0 ? fe[ue] : A[ue]);
    }
    var ue = arguments.length - 2;
    if (ue === 1) se.children = te;
    else if (1 < ue) {
      fe = Array(ue);
      for (var he = 0; he < ue; he++) fe[he] = arguments[he + 2];
      se.children = fe;
    }
    return { $$typeof: r, type: E.type, key: le, ref: J, props: se, _owner: me };
  }, oe.createContext = function(E) {
    return E = { $$typeof: h, _currentValue: E, _currentValue2: E, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, E.Provider = { $$typeof: d, _context: E }, E.Consumer = E;
  }, oe.createElement = X, oe.createFactory = function(E) {
    var A = X.bind(null, E);
    return A.type = E, A;
  }, oe.createRef = function() {
    return { current: null };
  }, oe.forwardRef = function(E) {
    return { $$typeof: p, render: E };
  }, oe.isValidElement = De, oe.lazy = function(E) {
    return { $$typeof: w, _payload: { _status: -1, _result: E }, _init: Ve };
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
  }, oe.unstable_act = z, oe.useCallback = function(E, A) {
    return H.current.useCallback(E, A);
  }, oe.useContext = function(E) {
    return H.current.useContext(E);
  }, oe.useDebugValue = function() {
  }, oe.useDeferredValue = function(E) {
    return H.current.useDeferredValue(E);
  }, oe.useEffect = function(E, A) {
    return H.current.useEffect(E, A);
  }, oe.useId = function() {
    return H.current.useId();
  }, oe.useImperativeHandle = function(E, A, te) {
    return H.current.useImperativeHandle(E, A, te);
  }, oe.useInsertionEffect = function(E, A) {
    return H.current.useInsertionEffect(E, A);
  }, oe.useLayoutEffect = function(E, A) {
    return H.current.useLayoutEffect(E, A);
  }, oe.useMemo = function(E, A) {
    return H.current.useMemo(E, A);
  }, oe.useReducer = function(E, A, te) {
    return H.current.useReducer(E, A, te);
  }, oe.useRef = function(E) {
    return H.current.useRef(E);
  }, oe.useState = function(E) {
    return H.current.useState(E);
  }, oe.useSyncExternalStore = function(E, A, te) {
    return H.current.useSyncExternalStore(E, A, te);
  }, oe.useTransition = function() {
    return H.current.useTransition();
  }, oe.version = "18.3.1", oe;
}
var jd;
function xl() {
  return jd || (jd = 1, nl.exports = Km()), nl.exports;
}
var Ld;
function Jm() {
  if (Ld) return ls;
  Ld = 1;
  var r = xl(), n = /* @__PURE__ */ Symbol.for("react.element"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(p, g, _) {
    var w, C = {}, v = null, R = null;
    _ !== void 0 && (v = "" + _), g.key !== void 0 && (v = "" + g.key), g.ref !== void 0 && (R = g.ref);
    for (w in g) a.call(g, w) && !d.hasOwnProperty(w) && (C[w] = g[w]);
    if (p && p.defaultProps) for (w in g = p.defaultProps, g) C[w] === void 0 && (C[w] = g[w]);
    return { $$typeof: n, type: p, key: v, ref: R, props: C, _owner: u.current };
  }
  return ls.Fragment = i, ls.jsx = h, ls.jsxs = h, ls;
}
var Od;
function Xm() {
  return Od || (Od = 1, tl.exports = Jm()), tl.exports;
}
var m = Xm(), k = xl();
const Tt = /* @__PURE__ */ If(k), Zm = /* @__PURE__ */ Qm({
  __proto__: null,
  default: Tt
}, [k]);
var Li = {}, rl = { exports: {} }, it = {}, sl = { exports: {} }, il = {};
var zd;
function eg() {
  return zd || (zd = 1, (function(r) {
    function n(O, F) {
      var z = O.length;
      O.push(F);
      e: for (; 0 < z; ) {
        var E = z - 1 >>> 1, A = O[E];
        if (0 < u(A, F)) O[E] = F, O[z] = A, z = E;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function a(O) {
      if (O.length === 0) return null;
      var F = O[0], z = O.pop();
      if (z !== F) {
        O[0] = z;
        e: for (var E = 0, A = O.length, te = A >>> 1; E < te; ) {
          var se = 2 * (E + 1) - 1, le = O[se], J = se + 1, me = O[J];
          if (0 > u(le, z)) J < A && 0 > u(me, le) ? (O[E] = me, O[J] = z, E = J) : (O[E] = le, O[se] = z, E = se);
          else if (J < A && 0 > u(me, z)) O[E] = me, O[J] = z, E = J;
          else break e;
        }
      }
      return F;
    }
    function u(O, F) {
      var z = O.sortIndex - F.sortIndex;
      return z !== 0 ? z : O.id - F.id;
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
    var g = [], _ = [], w = 1, C = null, v = 3, R = !1, j = !1, M = !1, B = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, re = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Z(O) {
      for (var F = i(_); F !== null; ) {
        if (F.callback === null) a(_);
        else if (F.startTime <= O) a(_), F.sortIndex = F.expirationTime, n(g, F);
        else break;
        F = i(_);
      }
    }
    function ne(O) {
      if (M = !1, Z(O), !j) if (i(g) !== null) j = !0, Ve(q);
      else {
        var F = i(_);
        F !== null && H(ne, F.startTime - O);
      }
    }
    function q(O, F) {
      j = !1, M && (M = !1, Y(X), X = -1), R = !0;
      var z = v;
      try {
        for (Z(F), C = i(g); C !== null && (!(C.expirationTime > F) || O && !Ne()); ) {
          var E = C.callback;
          if (typeof E == "function") {
            C.callback = null, v = C.priorityLevel;
            var A = E(C.expirationTime <= F);
            F = r.unstable_now(), typeof A == "function" ? C.callback = A : C === i(g) && a(g), Z(F);
          } else a(g);
          C = i(g);
        }
        if (C !== null) var te = !0;
        else {
          var se = i(_);
          se !== null && H(ne, se.startTime - F), te = !1;
        }
        return te;
      } finally {
        C = null, v = z, R = !1;
      }
    }
    var ae = !1, ie = null, X = -1, ye = 5, De = -1;
    function Ne() {
      return !(r.unstable_now() - De < ye);
    }
    function Fe() {
      if (ie !== null) {
        var O = r.unstable_now();
        De = O;
        var F = !0;
        try {
          F = ie(!0, O);
        } finally {
          F ? Be() : (ae = !1, ie = null);
        }
      } else ae = !1;
    }
    var Be;
    if (typeof re == "function") Be = function() {
      re(Fe);
    };
    else if (typeof MessageChannel < "u") {
      var He = new MessageChannel(), dt = He.port2;
      He.port1.onmessage = Fe, Be = function() {
        dt.postMessage(null);
      };
    } else Be = function() {
      B(Fe, 0);
    };
    function Ve(O) {
      ie = O, ae || (ae = !0, Be());
    }
    function H(O, F) {
      X = B(function() {
        O(r.unstable_now());
      }, F);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, r.unstable_continueExecution = function() {
      j || R || (j = !0, Ve(q));
    }, r.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ye = 0 < O ? Math.floor(1e3 / O) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, r.unstable_getFirstCallbackNode = function() {
      return i(g);
    }, r.unstable_next = function(O) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = v;
      }
      var z = v;
      v = F;
      try {
        return O();
      } finally {
        v = z;
      }
    }, r.unstable_pauseExecution = function() {
    }, r.unstable_requestPaint = function() {
    }, r.unstable_runWithPriority = function(O, F) {
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
      var z = v;
      v = O;
      try {
        return F();
      } finally {
        v = z;
      }
    }, r.unstable_scheduleCallback = function(O, F, z) {
      var E = r.unstable_now();
      switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? E + z : E) : z = E, O) {
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
      return A = z + A, O = { id: w++, callback: F, priorityLevel: O, startTime: z, expirationTime: A, sortIndex: -1 }, z > E ? (O.sortIndex = z, n(_, O), i(g) === null && O === i(_) && (M ? (Y(X), X = -1) : M = !0, H(ne, z - E))) : (O.sortIndex = A, n(g, O), j || R || (j = !0, Ve(q))), O;
    }, r.unstable_shouldYield = Ne, r.unstable_wrapCallback = function(O) {
      var F = v;
      return function() {
        var z = v;
        v = F;
        try {
          return O.apply(this, arguments);
        } finally {
          v = z;
        }
      };
    };
  })(il)), il;
}
var Dd;
function tg() {
  return Dd || (Dd = 1, sl.exports = eg()), sl.exports;
}
var Fd;
function ng() {
  if (Fd) return it;
  Fd = 1;
  var r = xl(), n = tg();
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
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, _ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, w = {}, C = {};
  function v(e) {
    return g.call(C, e) ? !0 : g.call(w, e) ? !1 : _.test(e) ? C[e] = !0 : (w[e] = !0, !1);
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
  function M(e, t, s, o, l, c, f) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = s, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = f;
  }
  var B = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    B[e] = new M(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    B[t] = new M(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    B[e] = new M(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    B[e] = new M(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    B[e] = new M(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    B[e] = new M(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    B[e] = new M(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    B[e] = new M(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    B[e] = new M(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Y = /[\-:]([a-z])/g;
  function re(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Y,
      re
    );
    B[t] = new M(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Y, re);
    B[t] = new M(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Y, re);
    B[t] = new M(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    B[e] = new M(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), B.xlinkHref = new M("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    B[e] = new M(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function Z(e, t, s, o) {
    var l = B.hasOwnProperty(t) ? B[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (j(t, s, l, o) && (s = null), o || l === null ? v(t) && (s === null ? e.removeAttribute(t) : e.setAttribute(t, "" + s)) : l.mustUseProperty ? e[l.propertyName] = s === null ? l.type === 3 ? !1 : "" : s : (t = l.attributeName, o = l.attributeNamespace, s === null ? e.removeAttribute(t) : (l = l.type, s = l === 3 || l === 4 && s === !0 ? "" : "" + s, o ? e.setAttributeNS(o, t, s) : e.setAttribute(t, s))));
  }
  var ne = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, q = /* @__PURE__ */ Symbol.for("react.element"), ae = /* @__PURE__ */ Symbol.for("react.portal"), ie = /* @__PURE__ */ Symbol.for("react.fragment"), X = /* @__PURE__ */ Symbol.for("react.strict_mode"), ye = /* @__PURE__ */ Symbol.for("react.profiler"), De = /* @__PURE__ */ Symbol.for("react.provider"), Ne = /* @__PURE__ */ Symbol.for("react.context"), Fe = /* @__PURE__ */ Symbol.for("react.forward_ref"), Be = /* @__PURE__ */ Symbol.for("react.suspense"), He = /* @__PURE__ */ Symbol.for("react.suspense_list"), dt = /* @__PURE__ */ Symbol.for("react.memo"), Ve = /* @__PURE__ */ Symbol.for("react.lazy"), H = /* @__PURE__ */ Symbol.for("react.offscreen"), O = Symbol.iterator;
  function F(e) {
    return e === null || typeof e != "object" ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var z = Object.assign, E;
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
  function le(e) {
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
  function J(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ie:
        return "Fragment";
      case ae:
        return "Portal";
      case ye:
        return "Profiler";
      case X:
        return "StrictMode";
      case Be:
        return "Suspense";
      case He:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ne:
        return (e.displayName || "Context") + ".Consumer";
      case De:
        return (e._context.displayName || "Context") + ".Provider";
      case Fe:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case dt:
        return t = e.displayName || null, t !== null ? t : J(e.type) || "Memo";
      case Ve:
        t = e._payload, e = e._init;
        try {
          return J(e(t));
        } catch {
        }
    }
    return null;
  }
  function me(e) {
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
        return J(t);
      case 8:
        return t === X ? "StrictMode" : "Mode";
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
  function ue(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function he(e) {
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
  function Ut(e) {
    e._valueTracker || (e._valueTracker = he(e));
  }
  function xr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(), o = "";
    return e && (o = ue(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== s ? (t.setValue(e), !0) : !1;
  }
  function Cs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function ao(e, t) {
    var s = t.checked;
    return z({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function Bl(e, t) {
    var s = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    s = fe(t.value != null ? t.value : s), e._wrapperState = { initialChecked: o, initialValue: s, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Ul(e, t) {
    t = t.checked, t != null && Z(e, "checked", t, !1);
  }
  function lo(e, t) {
    Ul(e, t);
    var s = fe(t.value), o = t.type;
    if (s != null) o === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? uo(e, t.type, s) : t.hasOwnProperty("defaultValue") && uo(e, t.type, fe(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function $l(e, t, s) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function uo(e, t, s) {
    (t !== "number" || Cs(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var Er = Array.isArray;
  function Un(e, t, s, o) {
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
  function co(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return z({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Hl(e, t) {
    var s = t.value;
    if (s == null) {
      if (s = t.children, t = t.defaultValue, s != null) {
        if (t != null) throw Error(i(92));
        if (Er(s)) {
          if (1 < s.length) throw Error(i(93));
          s = s[0];
        }
        t = s;
      }
      t == null && (t = ""), s = t;
    }
    e._wrapperState = { initialValue: fe(s) };
  }
  function Vl(e, t) {
    var s = fe(t.value), o = fe(t.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), t.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), o != null && (e.defaultValue = "" + o);
  }
  function Wl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Gl(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function fo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Gl(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Ts, Yl = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, s, o, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, s, o, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Ts = Ts || document.createElement("div"), Ts.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ts.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function kr(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var br = {
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
  }, Zh = ["Webkit", "ms", "Moz", "O"];
  Object.keys(br).forEach(function(e) {
    Zh.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), br[t] = br[e];
    });
  });
  function ql(e, t, s) {
    return t == null || typeof t == "boolean" || t === "" ? "" : s || typeof t != "number" || t === 0 || br.hasOwnProperty(e) && br[e] ? ("" + t).trim() : t + "px";
  }
  function Ql(e, t) {
    e = e.style;
    for (var s in t) if (t.hasOwnProperty(s)) {
      var o = s.indexOf("--") === 0, l = ql(s, t[s], o);
      s === "float" && (s = "cssFloat"), o ? e.setProperty(s, l) : e[s] = l;
    }
  }
  var ep = z({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ho(e, t) {
    if (t) {
      if (ep[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function po(e, t) {
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
  var mo = null;
  function go(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var yo = null, $n = null, Hn = null;
  function Kl(e) {
    if (e = Yr(e)) {
      if (typeof yo != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = Ks(t), yo(e.stateNode, e.type, t));
    }
  }
  function Jl(e) {
    $n ? Hn ? Hn.push(e) : Hn = [e] : $n = e;
  }
  function Xl() {
    if ($n) {
      var e = $n, t = Hn;
      if (Hn = $n = null, Kl(e), t) for (e = 0; e < t.length; e++) Kl(t[e]);
    }
  }
  function Zl(e, t) {
    return e(t);
  }
  function eu() {
  }
  var vo = !1;
  function tu(e, t, s) {
    if (vo) return e(t, s);
    vo = !0;
    try {
      return Zl(e, t, s);
    } finally {
      vo = !1, ($n !== null || Hn !== null) && (eu(), Xl());
    }
  }
  function Cr(e, t) {
    var s = e.stateNode;
    if (s === null) return null;
    var o = Ks(s);
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
  var _o = !1;
  if (p) try {
    var Tr = {};
    Object.defineProperty(Tr, "passive", { get: function() {
      _o = !0;
    } }), window.addEventListener("test", Tr, Tr), window.removeEventListener("test", Tr, Tr);
  } catch {
    _o = !1;
  }
  function tp(e, t, s, o, l, c, f, y, S) {
    var I = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(s, I);
    } catch (P) {
      this.onError(P);
    }
  }
  var Ir = !1, Is = null, Rs = !1, wo = null, np = { onError: function(e) {
    Ir = !0, Is = e;
  } };
  function rp(e, t, s, o, l, c, f, y, S) {
    Ir = !1, Is = null, tp.apply(np, arguments);
  }
  function sp(e, t, s, o, l, c, f, y, S) {
    if (rp.apply(this, arguments), Ir) {
      if (Ir) {
        var I = Is;
        Ir = !1, Is = null;
      } else throw Error(i(198));
      Rs || (Rs = !0, wo = I);
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
  function nu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function ru(e) {
    if (wn(e) !== e) throw Error(i(188));
  }
  function ip(e) {
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
          if (c === s) return ru(l), e;
          if (c === o) return ru(l), t;
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
  function su(e) {
    return e = ip(e), e !== null ? iu(e) : null;
  }
  function iu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = iu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var ou = n.unstable_scheduleCallback, au = n.unstable_cancelCallback, op = n.unstable_shouldYield, ap = n.unstable_requestPaint, Re = n.unstable_now, lp = n.unstable_getCurrentPriorityLevel, So = n.unstable_ImmediatePriority, lu = n.unstable_UserBlockingPriority, As = n.unstable_NormalPriority, up = n.unstable_LowPriority, uu = n.unstable_IdlePriority, Ms = null, Nt = null;
  function cp(e) {
    if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
      Nt.onCommitFiberRoot(Ms, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var _t = Math.clz32 ? Math.clz32 : hp, dp = Math.log, fp = Math.LN2;
  function hp(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (dp(e) / fp | 0) | 0;
  }
  var Ns = 64, Ps = 4194304;
  function Rr(e) {
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
  function js(e, t) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var o = 0, l = e.suspendedLanes, c = e.pingedLanes, f = s & 268435455;
    if (f !== 0) {
      var y = f & ~l;
      y !== 0 ? o = Rr(y) : (c &= f, c !== 0 && (o = Rr(c)));
    } else f = s & ~l, f !== 0 ? o = Rr(f) : c !== 0 && (o = Rr(c));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, c = t & -t, l >= c || l === 16 && (c & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= s & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) s = 31 - _t(t), l = 1 << s, o |= e[s], t &= ~l;
    return o;
  }
  function pp(e, t) {
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
  function mp(e, t) {
    for (var s = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
      var f = 31 - _t(c), y = 1 << f, S = l[f];
      S === -1 ? ((y & s) === 0 || (y & o) !== 0) && (l[f] = pp(y, t)) : S <= t && (e.expiredLanes |= y), c &= ~y;
    }
  }
  function xo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function cu() {
    var e = Ns;
    return Ns <<= 1, (Ns & 4194240) === 0 && (Ns = 64), e;
  }
  function Eo(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Ar(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - _t(t), e[t] = s;
  }
  function gp(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var l = 31 - _t(s), c = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, s &= ~c;
    }
  }
  function ko(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var o = 31 - _t(s), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), s &= ~l;
    }
  }
  var ge = 0;
  function du(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var fu, bo, hu, pu, mu, Co = !1, Ls = [], Zt = null, en = null, tn = null, Mr = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), nn = [], yp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function gu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Zt = null;
        break;
      case "dragenter":
      case "dragleave":
        en = null;
        break;
      case "mouseover":
      case "mouseout":
        tn = null;
        break;
      case "pointerover":
      case "pointerout":
        Mr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Nr.delete(t.pointerId);
    }
  }
  function Pr(e, t, s, o, l, c) {
    return e === null || e.nativeEvent !== c ? (e = { blockedOn: t, domEventName: s, eventSystemFlags: o, nativeEvent: c, targetContainers: [l] }, t !== null && (t = Yr(t), t !== null && bo(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function vp(e, t, s, o, l) {
    switch (t) {
      case "focusin":
        return Zt = Pr(Zt, e, t, s, o, l), !0;
      case "dragenter":
        return en = Pr(en, e, t, s, o, l), !0;
      case "mouseover":
        return tn = Pr(tn, e, t, s, o, l), !0;
      case "pointerover":
        var c = l.pointerId;
        return Mr.set(c, Pr(Mr.get(c) || null, e, t, s, o, l)), !0;
      case "gotpointercapture":
        return c = l.pointerId, Nr.set(c, Pr(Nr.get(c) || null, e, t, s, o, l)), !0;
    }
    return !1;
  }
  function yu(e) {
    var t = Sn(e.target);
    if (t !== null) {
      var s = wn(t);
      if (s !== null) {
        if (t = s.tag, t === 13) {
          if (t = nu(s), t !== null) {
            e.blockedOn = t, mu(e.priority, function() {
              hu(s);
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
  function Os(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var s = Io(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var o = new s.constructor(s.type, s);
        mo = o, s.target.dispatchEvent(o), mo = null;
      } else return t = Yr(s), t !== null && bo(t), e.blockedOn = s, !1;
      t.shift();
    }
    return !0;
  }
  function vu(e, t, s) {
    Os(e) && s.delete(t);
  }
  function _p() {
    Co = !1, Zt !== null && Os(Zt) && (Zt = null), en !== null && Os(en) && (en = null), tn !== null && Os(tn) && (tn = null), Mr.forEach(vu), Nr.forEach(vu);
  }
  function jr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Co || (Co = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, _p)));
  }
  function Lr(e) {
    function t(l) {
      return jr(l, e);
    }
    if (0 < Ls.length) {
      jr(Ls[0], e);
      for (var s = 1; s < Ls.length; s++) {
        var o = Ls[s];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (Zt !== null && jr(Zt, e), en !== null && jr(en, e), tn !== null && jr(tn, e), Mr.forEach(t), Nr.forEach(t), s = 0; s < nn.length; s++) o = nn[s], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < nn.length && (s = nn[0], s.blockedOn === null); ) yu(s), s.blockedOn === null && nn.shift();
  }
  var Vn = ne.ReactCurrentBatchConfig, zs = !0;
  function wp(e, t, s, o) {
    var l = ge, c = Vn.transition;
    Vn.transition = null;
    try {
      ge = 1, To(e, t, s, o);
    } finally {
      ge = l, Vn.transition = c;
    }
  }
  function Sp(e, t, s, o) {
    var l = ge, c = Vn.transition;
    Vn.transition = null;
    try {
      ge = 4, To(e, t, s, o);
    } finally {
      ge = l, Vn.transition = c;
    }
  }
  function To(e, t, s, o) {
    if (zs) {
      var l = Io(e, t, s, o);
      if (l === null) Wo(e, t, o, Ds, s), gu(e, o);
      else if (vp(l, e, t, s, o)) o.stopPropagation();
      else if (gu(e, o), t & 4 && -1 < yp.indexOf(e)) {
        for (; l !== null; ) {
          var c = Yr(l);
          if (c !== null && fu(c), c = Io(e, t, s, o), c === null && Wo(e, t, o, Ds, s), c === l) break;
          l = c;
        }
        l !== null && o.stopPropagation();
      } else Wo(e, t, o, null, s);
    }
  }
  var Ds = null;
  function Io(e, t, s, o) {
    if (Ds = null, e = go(o), e = Sn(e), e !== null) if (t = wn(e), t === null) e = null;
    else if (s = t.tag, s === 13) {
      if (e = nu(t), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Ds = e, null;
  }
  function _u(e) {
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
        switch (lp()) {
          case So:
            return 1;
          case lu:
            return 4;
          case As:
          case up:
            return 16;
          case uu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var rn = null, Ro = null, Fs = null;
  function wu() {
    if (Fs) return Fs;
    var e, t = Ro, s = t.length, o, l = "value" in rn ? rn.value : rn.textContent, c = l.length;
    for (e = 0; e < s && t[e] === l[e]; e++) ;
    var f = s - e;
    for (o = 1; o <= f && t[s - o] === l[c - o]; o++) ;
    return Fs = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Bs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Us() {
    return !0;
  }
  function Su() {
    return !1;
  }
  function ot(e) {
    function t(s, o, l, c, f) {
      this._reactName = s, this._targetInst = l, this.type = o, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (s = e[y], this[y] = s ? s(c) : c[y]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Us : Su, this.isPropagationStopped = Su, this;
    }
    return z(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Us);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Us);
    }, persist: function() {
    }, isPersistent: Us }), t;
  }
  var Wn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ao = ot(Wn), Or = z({}, Wn, { view: 0, detail: 0 }), xp = ot(Or), Mo, No, zr, $s = z({}, Or, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: jo, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== zr && (zr && e.type === "mousemove" ? (Mo = e.screenX - zr.screenX, No = e.screenY - zr.screenY) : No = Mo = 0, zr = e), Mo);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : No;
  } }), xu = ot($s), Ep = z({}, $s, { dataTransfer: 0 }), kp = ot(Ep), bp = z({}, Or, { relatedTarget: 0 }), Po = ot(bp), Cp = z({}, Wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Tp = ot(Cp), Ip = z({}, Wn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Rp = ot(Ip), Ap = z({}, Wn, { data: 0 }), Eu = ot(Ap), Mp = {
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
  }, Np = {
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
  }, Pp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function jp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Pp[e]) ? !!t[e] : !1;
  }
  function jo() {
    return jp;
  }
  var Lp = z({}, Or, { key: function(e) {
    if (e.key) {
      var t = Mp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Bs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Np[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: jo, charCode: function(e) {
    return e.type === "keypress" ? Bs(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Bs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Op = ot(Lp), zp = z({}, $s, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ku = ot(zp), Dp = z({}, Or, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: jo }), Fp = ot(Dp), Bp = z({}, Wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Up = ot(Bp), $p = z({}, $s, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Hp = ot($p), Vp = [9, 13, 27, 32], Lo = p && "CompositionEvent" in window, Dr = null;
  p && "documentMode" in document && (Dr = document.documentMode);
  var Wp = p && "TextEvent" in window && !Dr, bu = p && (!Lo || Dr && 8 < Dr && 11 >= Dr), Cu = " ", Tu = !1;
  function Iu(e, t) {
    switch (e) {
      case "keyup":
        return Vp.indexOf(t.keyCode) !== -1;
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
  function Ru(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Gn = !1;
  function Gp(e, t) {
    switch (e) {
      case "compositionend":
        return Ru(t);
      case "keypress":
        return t.which !== 32 ? null : (Tu = !0, Cu);
      case "textInput":
        return e = t.data, e === Cu && Tu ? null : e;
      default:
        return null;
    }
  }
  function Yp(e, t) {
    if (Gn) return e === "compositionend" || !Lo && Iu(e, t) ? (e = wu(), Fs = Ro = rn = null, Gn = !1, e) : null;
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
        return bu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var qp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Au(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!qp[e.type] : t === "textarea";
  }
  function Mu(e, t, s, o) {
    Jl(o), t = Ys(t, "onChange"), 0 < t.length && (s = new Ao("onChange", "change", null, s, o), e.push({ event: s, listeners: t }));
  }
  var Fr = null, Br = null;
  function Qp(e) {
    Qu(e, 0);
  }
  function Hs(e) {
    var t = Jn(e);
    if (xr(t)) return e;
  }
  function Kp(e, t) {
    if (e === "change") return t;
  }
  var Nu = !1;
  if (p) {
    var Oo;
    if (p) {
      var zo = "oninput" in document;
      if (!zo) {
        var Pu = document.createElement("div");
        Pu.setAttribute("oninput", "return;"), zo = typeof Pu.oninput == "function";
      }
      Oo = zo;
    } else Oo = !1;
    Nu = Oo && (!document.documentMode || 9 < document.documentMode);
  }
  function ju() {
    Fr && (Fr.detachEvent("onpropertychange", Lu), Br = Fr = null);
  }
  function Lu(e) {
    if (e.propertyName === "value" && Hs(Br)) {
      var t = [];
      Mu(t, Br, e, go(e)), tu(Qp, t);
    }
  }
  function Jp(e, t, s) {
    e === "focusin" ? (ju(), Fr = t, Br = s, Fr.attachEvent("onpropertychange", Lu)) : e === "focusout" && ju();
  }
  function Xp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Hs(Br);
  }
  function Zp(e, t) {
    if (e === "click") return Hs(t);
  }
  function em(e, t) {
    if (e === "input" || e === "change") return Hs(t);
  }
  function tm(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var wt = typeof Object.is == "function" ? Object.is : tm;
  function Ur(e, t) {
    if (wt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var s = Object.keys(e), o = Object.keys(t);
    if (s.length !== o.length) return !1;
    for (o = 0; o < s.length; o++) {
      var l = s[o];
      if (!g.call(t, l) || !wt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Ou(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function zu(e, t) {
    var s = Ou(e);
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
      s = Ou(s);
    }
  }
  function Du(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Du(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Fu() {
    for (var e = window, t = Cs(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof t.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = t.contentWindow;
      else break;
      t = Cs(e.document);
    }
    return t;
  }
  function Do(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function nm(e) {
    var t = Fu(), s = e.focusedElem, o = e.selectionRange;
    if (t !== s && s && s.ownerDocument && Du(s.ownerDocument.documentElement, s)) {
      if (o !== null && Do(s)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in s) s.selectionStart = t, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (t = s.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = s.textContent.length, c = Math.min(o.start, l);
          o = o.end === void 0 ? c : Math.min(o.end, l), !e.extend && c > o && (l = o, o = c, c = l), l = zu(s, c);
          var f = zu(
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
  var rm = p && "documentMode" in document && 11 >= document.documentMode, Yn = null, Fo = null, $r = null, Bo = !1;
  function Bu(e, t, s) {
    var o = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Bo || Yn == null || Yn !== Cs(o) || (o = Yn, "selectionStart" in o && Do(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), $r && Ur($r, o) || ($r = o, o = Ys(Fo, "onSelect"), 0 < o.length && (t = new Ao("onSelect", "select", null, t, s), e.push({ event: t, listeners: o }), t.target = Yn)));
  }
  function Vs(e, t) {
    var s = {};
    return s[e.toLowerCase()] = t.toLowerCase(), s["Webkit" + e] = "webkit" + t, s["Moz" + e] = "moz" + t, s;
  }
  var qn = { animationend: Vs("Animation", "AnimationEnd"), animationiteration: Vs("Animation", "AnimationIteration"), animationstart: Vs("Animation", "AnimationStart"), transitionend: Vs("Transition", "TransitionEnd") }, Uo = {}, Uu = {};
  p && (Uu = document.createElement("div").style, "AnimationEvent" in window || (delete qn.animationend.animation, delete qn.animationiteration.animation, delete qn.animationstart.animation), "TransitionEvent" in window || delete qn.transitionend.transition);
  function Ws(e) {
    if (Uo[e]) return Uo[e];
    if (!qn[e]) return e;
    var t = qn[e], s;
    for (s in t) if (t.hasOwnProperty(s) && s in Uu) return Uo[e] = t[s];
    return e;
  }
  var $u = Ws("animationend"), Hu = Ws("animationiteration"), Vu = Ws("animationstart"), Wu = Ws("transitionend"), Gu = /* @__PURE__ */ new Map(), Yu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function sn(e, t) {
    Gu.set(e, t), d(t, [e]);
  }
  for (var $o = 0; $o < Yu.length; $o++) {
    var Ho = Yu[$o], sm = Ho.toLowerCase(), im = Ho[0].toUpperCase() + Ho.slice(1);
    sn(sm, "on" + im);
  }
  sn($u, "onAnimationEnd"), sn(Hu, "onAnimationIteration"), sn(Vu, "onAnimationStart"), sn("dblclick", "onDoubleClick"), sn("focusin", "onFocus"), sn("focusout", "onBlur"), sn(Wu, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Hr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), om = new Set("cancel close invalid load scroll toggle".split(" ").concat(Hr));
  function qu(e, t, s) {
    var o = e.type || "unknown-event";
    e.currentTarget = s, sp(o, t, void 0, e), e.currentTarget = null;
  }
  function Qu(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var o = e[s], l = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t) for (var f = o.length - 1; 0 <= f; f--) {
          var y = o[f], S = y.instance, I = y.currentTarget;
          if (y = y.listener, S !== c && l.isPropagationStopped()) break e;
          qu(l, y, I), c = S;
        }
        else for (f = 0; f < o.length; f++) {
          if (y = o[f], S = y.instance, I = y.currentTarget, y = y.listener, S !== c && l.isPropagationStopped()) break e;
          qu(l, y, I), c = S;
        }
      }
    }
    if (Rs) throw e = wo, Rs = !1, wo = null, e;
  }
  function _e(e, t) {
    var s = t[Jo];
    s === void 0 && (s = t[Jo] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    s.has(o) || (Ku(t, e, 2, !1), s.add(o));
  }
  function Vo(e, t, s) {
    var o = 0;
    t && (o |= 4), Ku(s, e, o, t);
  }
  var Gs = "_reactListening" + Math.random().toString(36).slice(2);
  function Vr(e) {
    if (!e[Gs]) {
      e[Gs] = !0, a.forEach(function(s) {
        s !== "selectionchange" && (om.has(s) || Vo(s, !1, e), Vo(s, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Gs] || (t[Gs] = !0, Vo("selectionchange", !1, t));
    }
  }
  function Ku(e, t, s, o) {
    switch (_u(t)) {
      case 1:
        var l = wp;
        break;
      case 4:
        l = Sp;
        break;
      default:
        l = To;
    }
    s = l.bind(null, t, s, e), l = void 0, !_o || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, s, { capture: !0, passive: l }) : e.addEventListener(t, s, !0) : l !== void 0 ? e.addEventListener(t, s, { passive: l }) : e.addEventListener(t, s, !1);
  }
  function Wo(e, t, s, o, l) {
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
    tu(function() {
      var I = c, P = go(s), L = [];
      e: {
        var N = Gu.get(e);
        if (N !== void 0) {
          var U = Ao, V = e;
          switch (e) {
            case "keypress":
              if (Bs(s) === 0) break e;
            case "keydown":
            case "keyup":
              U = Op;
              break;
            case "focusin":
              V = "focus", U = Po;
              break;
            case "focusout":
              V = "blur", U = Po;
              break;
            case "beforeblur":
            case "afterblur":
              U = Po;
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
              U = xu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = kp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = Fp;
              break;
            case $u:
            case Hu:
            case Vu:
              U = Tp;
              break;
            case Wu:
              U = Up;
              break;
            case "scroll":
              U = xp;
              break;
            case "wheel":
              U = Hp;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = Rp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = ku;
          }
          var W = (t & 4) !== 0, Ae = !W && e === "scroll", b = W ? N !== null ? N + "Capture" : null : N;
          W = [];
          for (var x = I, T; x !== null; ) {
            T = x;
            var D = T.stateNode;
            if (T.tag === 5 && D !== null && (T = D, b !== null && (D = Cr(x, b), D != null && W.push(Wr(x, D, T)))), Ae) break;
            x = x.return;
          }
          0 < W.length && (N = new U(N, V, null, s, P), L.push({ event: N, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (N = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", N && s !== mo && (V = s.relatedTarget || s.fromElement) && (Sn(V) || V[$t])) break e;
          if ((U || N) && (N = P.window === P ? P : (N = P.ownerDocument) ? N.defaultView || N.parentWindow : window, U ? (V = s.relatedTarget || s.toElement, U = I, V = V ? Sn(V) : null, V !== null && (Ae = wn(V), V !== Ae || V.tag !== 5 && V.tag !== 6) && (V = null)) : (U = null, V = I), U !== V)) {
            if (W = xu, D = "onMouseLeave", b = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (W = ku, D = "onPointerLeave", b = "onPointerEnter", x = "pointer"), Ae = U == null ? N : Jn(U), T = V == null ? N : Jn(V), N = new W(D, x + "leave", U, s, P), N.target = Ae, N.relatedTarget = T, D = null, Sn(P) === I && (W = new W(b, x + "enter", V, s, P), W.target = T, W.relatedTarget = Ae, D = W), Ae = D, U && V) t: {
              for (W = U, b = V, x = 0, T = W; T; T = Qn(T)) x++;
              for (T = 0, D = b; D; D = Qn(D)) T++;
              for (; 0 < x - T; ) W = Qn(W), x--;
              for (; 0 < T - x; ) b = Qn(b), T--;
              for (; x--; ) {
                if (W === b || b !== null && W === b.alternate) break t;
                W = Qn(W), b = Qn(b);
              }
              W = null;
            }
            else W = null;
            U !== null && Ju(L, N, U, W, !1), V !== null && Ae !== null && Ju(L, Ae, V, W, !0);
          }
        }
        e: {
          if (N = I ? Jn(I) : window, U = N.nodeName && N.nodeName.toLowerCase(), U === "select" || U === "input" && N.type === "file") var G = Kp;
          else if (Au(N)) if (Nu) G = em;
          else {
            G = Xp;
            var Q = Jp;
          }
          else (U = N.nodeName) && U.toLowerCase() === "input" && (N.type === "checkbox" || N.type === "radio") && (G = Zp);
          if (G && (G = G(e, I))) {
            Mu(L, G, s, P);
            break e;
          }
          Q && Q(e, N, I), e === "focusout" && (Q = N._wrapperState) && Q.controlled && N.type === "number" && uo(N, "number", N.value);
        }
        switch (Q = I ? Jn(I) : window, e) {
          case "focusin":
            (Au(Q) || Q.contentEditable === "true") && (Yn = Q, Fo = I, $r = null);
            break;
          case "focusout":
            $r = Fo = Yn = null;
            break;
          case "mousedown":
            Bo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Bo = !1, Bu(L, s, P);
            break;
          case "selectionchange":
            if (rm) break;
          case "keydown":
          case "keyup":
            Bu(L, s, P);
        }
        var K;
        if (Lo) e: {
          switch (e) {
            case "compositionstart":
              var ee = "onCompositionStart";
              break e;
            case "compositionend":
              ee = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ee = "onCompositionUpdate";
              break e;
          }
          ee = void 0;
        }
        else Gn ? Iu(e, s) && (ee = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (ee = "onCompositionStart");
        ee && (bu && s.locale !== "ko" && (Gn || ee !== "onCompositionStart" ? ee === "onCompositionEnd" && Gn && (K = wu()) : (rn = P, Ro = "value" in rn ? rn.value : rn.textContent, Gn = !0)), Q = Ys(I, ee), 0 < Q.length && (ee = new Eu(ee, e, null, s, P), L.push({ event: ee, listeners: Q }), K ? ee.data = K : (K = Ru(s), K !== null && (ee.data = K)))), (K = Wp ? Gp(e, s) : Yp(e, s)) && (I = Ys(I, "onBeforeInput"), 0 < I.length && (P = new Eu("onBeforeInput", "beforeinput", null, s, P), L.push({ event: P, listeners: I }), P.data = K));
      }
      Qu(L, t);
    });
  }
  function Wr(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function Ys(e, t) {
    for (var s = t + "Capture", o = []; e !== null; ) {
      var l = e, c = l.stateNode;
      l.tag === 5 && c !== null && (l = c, c = Cr(e, s), c != null && o.unshift(Wr(e, c, l)), c = Cr(e, t), c != null && o.push(Wr(e, c, l))), e = e.return;
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
  function Ju(e, t, s, o, l) {
    for (var c = t._reactName, f = []; s !== null && s !== o; ) {
      var y = s, S = y.alternate, I = y.stateNode;
      if (S !== null && S === o) break;
      y.tag === 5 && I !== null && (y = I, l ? (S = Cr(s, c), S != null && f.unshift(Wr(s, S, y))) : l || (S = Cr(s, c), S != null && f.push(Wr(s, S, y)))), s = s.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var am = /\r\n?/g, lm = /\u0000|\uFFFD/g;
  function Xu(e) {
    return (typeof e == "string" ? e : "" + e).replace(am, `
`).replace(lm, "");
  }
  function qs(e, t, s) {
    if (t = Xu(t), Xu(e) !== t && s) throw Error(i(425));
  }
  function Qs() {
  }
  var Go = null, Yo = null;
  function qo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qo = typeof setTimeout == "function" ? setTimeout : void 0, um = typeof clearTimeout == "function" ? clearTimeout : void 0, Zu = typeof Promise == "function" ? Promise : void 0, cm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zu < "u" ? function(e) {
    return Zu.resolve(null).then(e).catch(dm);
  } : Qo;
  function dm(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ko(e, t) {
    var s = t, o = 0;
    do {
      var l = s.nextSibling;
      if (e.removeChild(s), l && l.nodeType === 8) if (s = l.data, s === "/$") {
        if (o === 0) {
          e.removeChild(l), Lr(t);
          return;
        }
        o--;
      } else s !== "$" && s !== "$?" && s !== "$!" || o++;
      s = l;
    } while (s);
    Lr(t);
  }
  function on(e) {
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
  function ec(e) {
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
  var Kn = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + Kn, Gr = "__reactProps$" + Kn, $t = "__reactContainer$" + Kn, Jo = "__reactEvents$" + Kn, fm = "__reactListeners$" + Kn, hm = "__reactHandles$" + Kn;
  function Sn(e) {
    var t = e[Pt];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if (t = s[$t] || s[Pt]) {
        if (s = t.alternate, t.child !== null || s !== null && s.child !== null) for (e = ec(e); e !== null; ) {
          if (s = e[Pt]) return s;
          e = ec(e);
        }
        return t;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Yr(e) {
    return e = e[Pt] || e[$t], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Jn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Ks(e) {
    return e[Gr] || null;
  }
  var Xo = [], Xn = -1;
  function an(e) {
    return { current: e };
  }
  function we(e) {
    0 > Xn || (e.current = Xo[Xn], Xo[Xn] = null, Xn--);
  }
  function ve(e, t) {
    Xn++, Xo[Xn] = e.current, e.current = t;
  }
  var ln = {}, We = an(ln), et = an(!1), xn = ln;
  function Zn(e, t) {
    var s = e.type.contextTypes;
    if (!s) return ln;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var l = {}, c;
    for (c in s) l[c] = t[c];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function tt(e) {
    return e = e.childContextTypes, e != null;
  }
  function Js() {
    we(et), we(We);
  }
  function tc(e, t, s) {
    if (We.current !== ln) throw Error(i(168));
    ve(We, t), ve(et, s);
  }
  function nc(e, t, s) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return s;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(i(108, me(e) || "Unknown", l));
    return z({}, s, o);
  }
  function Xs(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ln, xn = We.current, ve(We, e), ve(et, et.current), !0;
  }
  function rc(e, t, s) {
    var o = e.stateNode;
    if (!o) throw Error(i(169));
    s ? (e = nc(e, t, xn), o.__reactInternalMemoizedMergedChildContext = e, we(et), we(We), ve(We, e)) : we(et), ve(et, s);
  }
  var Ht = null, Zs = !1, Zo = !1;
  function sc(e) {
    Ht === null ? Ht = [e] : Ht.push(e);
  }
  function pm(e) {
    Zs = !0, sc(e);
  }
  function un() {
    if (!Zo && Ht !== null) {
      Zo = !0;
      var e = 0, t = ge;
      try {
        var s = Ht;
        for (ge = 1; e < s.length; e++) {
          var o = s[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Ht = null, Zs = !1;
      } catch (l) {
        throw Ht !== null && (Ht = Ht.slice(e + 1)), ou(So, un), l;
      } finally {
        ge = t, Zo = !1;
      }
    }
    return null;
  }
  var er = [], tr = 0, ei = null, ti = 0, ft = [], ht = 0, En = null, Vt = 1, Wt = "";
  function kn(e, t) {
    er[tr++] = ti, er[tr++] = ei, ei = e, ti = t;
  }
  function ic(e, t, s) {
    ft[ht++] = Vt, ft[ht++] = Wt, ft[ht++] = En, En = e;
    var o = Vt;
    e = Wt;
    var l = 32 - _t(o) - 1;
    o &= ~(1 << l), s += 1;
    var c = 32 - _t(t) + l;
    if (30 < c) {
      var f = l - l % 5;
      c = (o & (1 << f) - 1).toString(32), o >>= f, l -= f, Vt = 1 << 32 - _t(t) + l | s << l | o, Wt = c + e;
    } else Vt = 1 << c | s << l | o, Wt = e;
  }
  function ea(e) {
    e.return !== null && (kn(e, 1), ic(e, 1, 0));
  }
  function ta(e) {
    for (; e === ei; ) ei = er[--tr], er[tr] = null, ti = er[--tr], er[tr] = null;
    for (; e === En; ) En = ft[--ht], ft[ht] = null, Wt = ft[--ht], ft[ht] = null, Vt = ft[--ht], ft[ht] = null;
  }
  var at = null, lt = null, xe = !1, St = null;
  function oc(e, t) {
    var s = yt(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function ac(e, t) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return t = t.nodeType !== 1 || s.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, at = e, lt = on(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, at = e, lt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (s = En !== null ? { id: Vt, overflow: Wt } : null, e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = yt(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, at = e, lt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function na(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ra(e) {
    if (xe) {
      var t = lt;
      if (t) {
        var s = t;
        if (!ac(e, t)) {
          if (na(e)) throw Error(i(418));
          t = on(s.nextSibling);
          var o = at;
          t && ac(e, t) ? oc(o, s) : (e.flags = e.flags & -4097 | 2, xe = !1, at = e);
        }
      } else {
        if (na(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, xe = !1, at = e;
      }
    }
  }
  function lc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    at = e;
  }
  function ni(e) {
    if (e !== at) return !1;
    if (!xe) return lc(e), xe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !qo(e.type, e.memoizedProps)), t && (t = lt)) {
      if (na(e)) throw uc(), Error(i(418));
      for (; t; ) oc(e, t), t = on(t.nextSibling);
    }
    if (lc(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (t === 0) {
                lt = on(e.nextSibling);
                break e;
              }
              t--;
            } else s !== "$" && s !== "$!" && s !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        lt = null;
      }
    } else lt = at ? on(e.stateNode.nextSibling) : null;
    return !0;
  }
  function uc() {
    for (var e = lt; e; ) e = on(e.nextSibling);
  }
  function nr() {
    lt = at = null, xe = !1;
  }
  function sa(e) {
    St === null ? St = [e] : St.push(e);
  }
  var mm = ne.ReactCurrentBatchConfig;
  function qr(e, t, s) {
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
  function ri(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function cc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function dc(e) {
    function t(b, x) {
      if (e) {
        var T = b.deletions;
        T === null ? (b.deletions = [x], b.flags |= 16) : T.push(x);
      }
    }
    function s(b, x) {
      if (!e) return null;
      for (; x !== null; ) t(b, x), x = x.sibling;
      return null;
    }
    function o(b, x) {
      for (b = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? b.set(x.key, x) : b.set(x.index, x), x = x.sibling;
      return b;
    }
    function l(b, x) {
      return b = yn(b, x), b.index = 0, b.sibling = null, b;
    }
    function c(b, x, T) {
      return b.index = T, e ? (T = b.alternate, T !== null ? (T = T.index, T < x ? (b.flags |= 2, x) : T) : (b.flags |= 2, x)) : (b.flags |= 1048576, x);
    }
    function f(b) {
      return e && b.alternate === null && (b.flags |= 2), b;
    }
    function y(b, x, T, D) {
      return x === null || x.tag !== 6 ? (x = Qa(T, b.mode, D), x.return = b, x) : (x = l(x, T), x.return = b, x);
    }
    function S(b, x, T, D) {
      var G = T.type;
      return G === ie ? P(b, x, T.props.children, D, T.key) : x !== null && (x.elementType === G || typeof G == "object" && G !== null && G.$$typeof === Ve && cc(G) === x.type) ? (D = l(x, T.props), D.ref = qr(b, x, T), D.return = b, D) : (D = Ti(T.type, T.key, T.props, null, b.mode, D), D.ref = qr(b, x, T), D.return = b, D);
    }
    function I(b, x, T, D) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== T.containerInfo || x.stateNode.implementation !== T.implementation ? (x = Ka(T, b.mode, D), x.return = b, x) : (x = l(x, T.children || []), x.return = b, x);
    }
    function P(b, x, T, D, G) {
      return x === null || x.tag !== 7 ? (x = Nn(T, b.mode, D, G), x.return = b, x) : (x = l(x, T), x.return = b, x);
    }
    function L(b, x, T) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Qa("" + x, b.mode, T), x.return = b, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case q:
            return T = Ti(x.type, x.key, x.props, null, b.mode, T), T.ref = qr(b, null, x), T.return = b, T;
          case ae:
            return x = Ka(x, b.mode, T), x.return = b, x;
          case Ve:
            var D = x._init;
            return L(b, D(x._payload), T);
        }
        if (Er(x) || F(x)) return x = Nn(x, b.mode, T, null), x.return = b, x;
        ri(b, x);
      }
      return null;
    }
    function N(b, x, T, D) {
      var G = x !== null ? x.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return G !== null ? null : y(b, x, "" + T, D);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case q:
            return T.key === G ? S(b, x, T, D) : null;
          case ae:
            return T.key === G ? I(b, x, T, D) : null;
          case Ve:
            return G = T._init, N(
              b,
              x,
              G(T._payload),
              D
            );
        }
        if (Er(T) || F(T)) return G !== null ? null : P(b, x, T, D, null);
        ri(b, T);
      }
      return null;
    }
    function U(b, x, T, D, G) {
      if (typeof D == "string" && D !== "" || typeof D == "number") return b = b.get(T) || null, y(x, b, "" + D, G);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case q:
            return b = b.get(D.key === null ? T : D.key) || null, S(x, b, D, G);
          case ae:
            return b = b.get(D.key === null ? T : D.key) || null, I(x, b, D, G);
          case Ve:
            var Q = D._init;
            return U(b, x, T, Q(D._payload), G);
        }
        if (Er(D) || F(D)) return b = b.get(T) || null, P(x, b, D, G, null);
        ri(x, D);
      }
      return null;
    }
    function V(b, x, T, D) {
      for (var G = null, Q = null, K = x, ee = x = 0, ze = null; K !== null && ee < T.length; ee++) {
        K.index > ee ? (ze = K, K = null) : ze = K.sibling;
        var de = N(b, K, T[ee], D);
        if (de === null) {
          K === null && (K = ze);
          break;
        }
        e && K && de.alternate === null && t(b, K), x = c(de, x, ee), Q === null ? G = de : Q.sibling = de, Q = de, K = ze;
      }
      if (ee === T.length) return s(b, K), xe && kn(b, ee), G;
      if (K === null) {
        for (; ee < T.length; ee++) K = L(b, T[ee], D), K !== null && (x = c(K, x, ee), Q === null ? G = K : Q.sibling = K, Q = K);
        return xe && kn(b, ee), G;
      }
      for (K = o(b, K); ee < T.length; ee++) ze = U(K, b, ee, T[ee], D), ze !== null && (e && ze.alternate !== null && K.delete(ze.key === null ? ee : ze.key), x = c(ze, x, ee), Q === null ? G = ze : Q.sibling = ze, Q = ze);
      return e && K.forEach(function(vn) {
        return t(b, vn);
      }), xe && kn(b, ee), G;
    }
    function W(b, x, T, D) {
      var G = F(T);
      if (typeof G != "function") throw Error(i(150));
      if (T = G.call(T), T == null) throw Error(i(151));
      for (var Q = G = null, K = x, ee = x = 0, ze = null, de = T.next(); K !== null && !de.done; ee++, de = T.next()) {
        K.index > ee ? (ze = K, K = null) : ze = K.sibling;
        var vn = N(b, K, de.value, D);
        if (vn === null) {
          K === null && (K = ze);
          break;
        }
        e && K && vn.alternate === null && t(b, K), x = c(vn, x, ee), Q === null ? G = vn : Q.sibling = vn, Q = vn, K = ze;
      }
      if (de.done) return s(
        b,
        K
      ), xe && kn(b, ee), G;
      if (K === null) {
        for (; !de.done; ee++, de = T.next()) de = L(b, de.value, D), de !== null && (x = c(de, x, ee), Q === null ? G = de : Q.sibling = de, Q = de);
        return xe && kn(b, ee), G;
      }
      for (K = o(b, K); !de.done; ee++, de = T.next()) de = U(K, b, ee, de.value, D), de !== null && (e && de.alternate !== null && K.delete(de.key === null ? ee : de.key), x = c(de, x, ee), Q === null ? G = de : Q.sibling = de, Q = de);
      return e && K.forEach(function(qm) {
        return t(b, qm);
      }), xe && kn(b, ee), G;
    }
    function Ae(b, x, T, D) {
      if (typeof T == "object" && T !== null && T.type === ie && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case q:
            e: {
              for (var G = T.key, Q = x; Q !== null; ) {
                if (Q.key === G) {
                  if (G = T.type, G === ie) {
                    if (Q.tag === 7) {
                      s(b, Q.sibling), x = l(Q, T.props.children), x.return = b, b = x;
                      break e;
                    }
                  } else if (Q.elementType === G || typeof G == "object" && G !== null && G.$$typeof === Ve && cc(G) === Q.type) {
                    s(b, Q.sibling), x = l(Q, T.props), x.ref = qr(b, Q, T), x.return = b, b = x;
                    break e;
                  }
                  s(b, Q);
                  break;
                } else t(b, Q);
                Q = Q.sibling;
              }
              T.type === ie ? (x = Nn(T.props.children, b.mode, D, T.key), x.return = b, b = x) : (D = Ti(T.type, T.key, T.props, null, b.mode, D), D.ref = qr(b, x, T), D.return = b, b = D);
            }
            return f(b);
          case ae:
            e: {
              for (Q = T.key; x !== null; ) {
                if (x.key === Q) if (x.tag === 4 && x.stateNode.containerInfo === T.containerInfo && x.stateNode.implementation === T.implementation) {
                  s(b, x.sibling), x = l(x, T.children || []), x.return = b, b = x;
                  break e;
                } else {
                  s(b, x);
                  break;
                }
                else t(b, x);
                x = x.sibling;
              }
              x = Ka(T, b.mode, D), x.return = b, b = x;
            }
            return f(b);
          case Ve:
            return Q = T._init, Ae(b, x, Q(T._payload), D);
        }
        if (Er(T)) return V(b, x, T, D);
        if (F(T)) return W(b, x, T, D);
        ri(b, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, x !== null && x.tag === 6 ? (s(b, x.sibling), x = l(x, T), x.return = b, b = x) : (s(b, x), x = Qa(T, b.mode, D), x.return = b, b = x), f(b)) : s(b, x);
    }
    return Ae;
  }
  var rr = dc(!0), fc = dc(!1), si = an(null), ii = null, sr = null, ia = null;
  function oa() {
    ia = sr = ii = null;
  }
  function aa(e) {
    var t = si.current;
    we(si), e._currentValue = t;
  }
  function la(e, t, s) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === s) break;
      e = e.return;
    }
  }
  function ir(e, t) {
    ii = e, ia = sr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (nt = !0), e.firstContext = null);
  }
  function pt(e) {
    var t = e._currentValue;
    if (ia !== e) if (e = { context: e, memoizedValue: t, next: null }, sr === null) {
      if (ii === null) throw Error(i(308));
      sr = e, ii.dependencies = { lanes: 0, firstContext: e };
    } else sr = sr.next = e;
    return t;
  }
  var bn = null;
  function ua(e) {
    bn === null ? bn = [e] : bn.push(e);
  }
  function hc(e, t, s, o) {
    var l = t.interleaved;
    return l === null ? (s.next = s, ua(t)) : (s.next = l.next, l.next = s), t.interleaved = s, Gt(e, o);
  }
  function Gt(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; ) e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var cn = !1;
  function ca(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function pc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Yt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function dn(e, t, s) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ce & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, Gt(e, s);
    }
    return l = o.interleaved, l === null ? (t.next = t, ua(o)) : (t.next = l.next, l.next = t), o.interleaved = t, Gt(e, s);
  }
  function oi(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, ko(e, s);
    }
  }
  function mc(e, t) {
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
  function ai(e, t, s, o) {
    var l = e.updateQueue;
    cn = !1;
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
        var N = y.lane, U = y.eventTime;
        if ((o & N) === N) {
          P !== null && (P = P.next = {
            eventTime: U,
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          });
          e: {
            var V = e, W = y;
            switch (N = t, U = s, W.tag) {
              case 1:
                if (V = W.payload, typeof V == "function") {
                  L = V.call(U, L, N);
                  break e;
                }
                L = V;
                break e;
              case 3:
                V.flags = V.flags & -65537 | 128;
              case 0:
                if (V = W.payload, N = typeof V == "function" ? V.call(U, L, N) : V, N == null) break e;
                L = z({}, L, N);
                break e;
              case 2:
                cn = !0;
            }
          }
          y.callback !== null && y.lane !== 0 && (e.flags |= 64, N = l.effects, N === null ? l.effects = [y] : N.push(y));
        } else U = { eventTime: U, lane: N, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, P === null ? (I = P = U, S = L) : P = P.next = U, f |= N;
        if (y = y.next, y === null) {
          if (y = l.shared.pending, y === null) break;
          N = y, y = N.next, N.next = null, l.lastBaseUpdate = N, l.shared.pending = null;
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
  function gc(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = s, typeof l != "function") throw Error(i(191, l));
        l.call(o);
      }
    }
  }
  var Qr = {}, jt = an(Qr), Kr = an(Qr), Jr = an(Qr);
  function Cn(e) {
    if (e === Qr) throw Error(i(174));
    return e;
  }
  function da(e, t) {
    switch (ve(Jr, t), ve(Kr, e), ve(jt, Qr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : fo(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = fo(t, e);
    }
    we(jt), ve(jt, t);
  }
  function or() {
    we(jt), we(Kr), we(Jr);
  }
  function yc(e) {
    Cn(Jr.current);
    var t = Cn(jt.current), s = fo(t, e.type);
    t !== s && (ve(Kr, e), ve(jt, s));
  }
  function fa(e) {
    Kr.current === e && (we(jt), we(Kr));
  }
  var Ee = an(0);
  function li(e) {
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
  var ha = [];
  function pa() {
    for (var e = 0; e < ha.length; e++) ha[e]._workInProgressVersionPrimary = null;
    ha.length = 0;
  }
  var ui = ne.ReactCurrentDispatcher, ma = ne.ReactCurrentBatchConfig, Tn = 0, ke = null, Pe = null, Le = null, ci = !1, Xr = !1, Zr = 0, gm = 0;
  function Ge() {
    throw Error(i(321));
  }
  function ga(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++) if (!wt(e[s], t[s])) return !1;
    return !0;
  }
  function ya(e, t, s, o, l, c) {
    if (Tn = c, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ui.current = e === null || e.memoizedState === null ? wm : Sm, e = s(o, l), Xr) {
      c = 0;
      do {
        if (Xr = !1, Zr = 0, 25 <= c) throw Error(i(301));
        c += 1, Le = Pe = null, t.updateQueue = null, ui.current = xm, e = s(o, l);
      } while (Xr);
    }
    if (ui.current = hi, t = Pe !== null && Pe.next !== null, Tn = 0, Le = Pe = ke = null, ci = !1, t) throw Error(i(300));
    return e;
  }
  function va() {
    var e = Zr !== 0;
    return Zr = 0, e;
  }
  function Lt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Le === null ? ke.memoizedState = Le = e : Le = Le.next = e, Le;
  }
  function mt() {
    if (Pe === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Pe.next;
    var t = Le === null ? ke.memoizedState : Le.next;
    if (t !== null) Le = t, Pe = e;
    else {
      if (e === null) throw Error(i(310));
      Pe = e, e = { memoizedState: Pe.memoizedState, baseState: Pe.baseState, baseQueue: Pe.baseQueue, queue: Pe.queue, next: null }, Le === null ? ke.memoizedState = Le = e : Le = Le.next = e;
    }
    return Le;
  }
  function es(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function _a(e) {
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
      S === null ? f = o : S.next = y, wt(o, t.memoizedState) || (nt = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = S, s.lastRenderedState = o;
    }
    if (e = s.interleaved, e !== null) {
      l = e;
      do
        c = l.lane, ke.lanes |= c, In |= c, l = l.next;
      while (l !== e);
    } else l === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function wa(e) {
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
      wt(c, t.memoizedState) || (nt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), s.lastRenderedState = c;
    }
    return [c, o];
  }
  function vc() {
  }
  function _c(e, t) {
    var s = ke, o = mt(), l = t(), c = !wt(o.memoizedState, l);
    if (c && (o.memoizedState = l, nt = !0), o = o.queue, Sa(xc.bind(null, s, o, e), [e]), o.getSnapshot !== t || c || Le !== null && Le.memoizedState.tag & 1) {
      if (s.flags |= 2048, ts(9, Sc.bind(null, s, o, l, t), void 0, null), Oe === null) throw Error(i(349));
      (Tn & 30) !== 0 || wc(s, t, l);
    }
    return l;
  }
  function wc(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = ke.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ke.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function Sc(e, t, s, o) {
    t.value = s, t.getSnapshot = o, Ec(t) && kc(e);
  }
  function xc(e, t, s) {
    return s(function() {
      Ec(t) && kc(e);
    });
  }
  function Ec(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !wt(e, s);
    } catch {
      return !0;
    }
  }
  function kc(e) {
    var t = Gt(e, 1);
    t !== null && bt(t, e, 1, -1);
  }
  function bc(e) {
    var t = Lt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: es, lastRenderedState: e }, t.queue = e, e = e.dispatch = _m.bind(null, ke, e), [t.memoizedState, e];
  }
  function ts(e, t, s, o) {
    return e = { tag: e, create: t, destroy: s, deps: o, next: null }, t = ke.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ke.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (o = s.next, s.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Cc() {
    return mt().memoizedState;
  }
  function di(e, t, s, o) {
    var l = Lt();
    ke.flags |= e, l.memoizedState = ts(1 | t, s, void 0, o === void 0 ? null : o);
  }
  function fi(e, t, s, o) {
    var l = mt();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (Pe !== null) {
      var f = Pe.memoizedState;
      if (c = f.destroy, o !== null && ga(o, f.deps)) {
        l.memoizedState = ts(t, s, c, o);
        return;
      }
    }
    ke.flags |= e, l.memoizedState = ts(1 | t, s, c, o);
  }
  function Tc(e, t) {
    return di(8390656, 8, e, t);
  }
  function Sa(e, t) {
    return fi(2048, 8, e, t);
  }
  function Ic(e, t) {
    return fi(4, 2, e, t);
  }
  function Rc(e, t) {
    return fi(4, 4, e, t);
  }
  function Ac(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Mc(e, t, s) {
    return s = s != null ? s.concat([e]) : null, fi(4, 4, Ac.bind(null, t, e), s);
  }
  function xa() {
  }
  function Nc(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && ga(t, o[1]) ? o[0] : (s.memoizedState = [e, t], e);
  }
  function Pc(e, t) {
    var s = mt();
    t = t === void 0 ? null : t;
    var o = s.memoizedState;
    return o !== null && t !== null && ga(t, o[1]) ? o[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function jc(e, t, s) {
    return (Tn & 21) === 0 ? (e.baseState && (e.baseState = !1, nt = !0), e.memoizedState = s) : (wt(s, t) || (s = cu(), ke.lanes |= s, In |= s, e.baseState = !0), t);
  }
  function ym(e, t) {
    var s = ge;
    ge = s !== 0 && 4 > s ? s : 4, e(!0);
    var o = ma.transition;
    ma.transition = {};
    try {
      e(!1), t();
    } finally {
      ge = s, ma.transition = o;
    }
  }
  function Lc() {
    return mt().memoizedState;
  }
  function vm(e, t, s) {
    var o = mn(e);
    if (s = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null }, Oc(e)) zc(t, s);
    else if (s = hc(e, t, s, o), s !== null) {
      var l = Je();
      bt(s, e, o, l), Dc(s, t, o);
    }
  }
  function _m(e, t, s) {
    var o = mn(e), l = { lane: o, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Oc(e)) zc(t, l);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
        var f = t.lastRenderedState, y = c(f, s);
        if (l.hasEagerState = !0, l.eagerState = y, wt(y, f)) {
          var S = t.interleaved;
          S === null ? (l.next = l, ua(t)) : (l.next = S.next, S.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      s = hc(e, t, l, o), s !== null && (l = Je(), bt(s, e, o, l), Dc(s, t, o));
    }
  }
  function Oc(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function zc(e, t) {
    Xr = ci = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function Dc(e, t, s) {
    if ((s & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, s |= o, t.lanes = s, ko(e, s);
    }
  }
  var hi = { readContext: pt, useCallback: Ge, useContext: Ge, useEffect: Ge, useImperativeHandle: Ge, useInsertionEffect: Ge, useLayoutEffect: Ge, useMemo: Ge, useReducer: Ge, useRef: Ge, useState: Ge, useDebugValue: Ge, useDeferredValue: Ge, useTransition: Ge, useMutableSource: Ge, useSyncExternalStore: Ge, useId: Ge, unstable_isNewReconciler: !1 }, wm = { readContext: pt, useCallback: function(e, t) {
    return Lt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: pt, useEffect: Tc, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, di(
      4194308,
      4,
      Ac.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return di(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return di(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = Lt();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var o = Lt();
    return t = s !== void 0 ? s(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = vm.bind(null, ke, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Lt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: bc, useDebugValue: xa, useDeferredValue: function(e) {
    return Lt().memoizedState = e;
  }, useTransition: function() {
    var e = bc(!1), t = e[0];
    return e = ym.bind(null, e[1]), Lt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var o = ke, l = Lt();
    if (xe) {
      if (s === void 0) throw Error(i(407));
      s = s();
    } else {
      if (s = t(), Oe === null) throw Error(i(349));
      (Tn & 30) !== 0 || wc(o, t, s);
    }
    l.memoizedState = s;
    var c = { value: s, getSnapshot: t };
    return l.queue = c, Tc(xc.bind(
      null,
      o,
      c,
      e
    ), [e]), o.flags |= 2048, ts(9, Sc.bind(null, o, c, s, t), void 0, null), s;
  }, useId: function() {
    var e = Lt(), t = Oe.identifierPrefix;
    if (xe) {
      var s = Wt, o = Vt;
      s = (o & ~(1 << 32 - _t(o) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = Zr++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else s = gm++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Sm = {
    readContext: pt,
    useCallback: Nc,
    useContext: pt,
    useEffect: Sa,
    useImperativeHandle: Mc,
    useInsertionEffect: Ic,
    useLayoutEffect: Rc,
    useMemo: Pc,
    useReducer: _a,
    useRef: Cc,
    useState: function() {
      return _a(es);
    },
    useDebugValue: xa,
    useDeferredValue: function(e) {
      var t = mt();
      return jc(t, Pe.memoizedState, e);
    },
    useTransition: function() {
      var e = _a(es)[0], t = mt().memoizedState;
      return [e, t];
    },
    useMutableSource: vc,
    useSyncExternalStore: _c,
    useId: Lc,
    unstable_isNewReconciler: !1
  }, xm = { readContext: pt, useCallback: Nc, useContext: pt, useEffect: Sa, useImperativeHandle: Mc, useInsertionEffect: Ic, useLayoutEffect: Rc, useMemo: Pc, useReducer: wa, useRef: Cc, useState: function() {
    return wa(es);
  }, useDebugValue: xa, useDeferredValue: function(e) {
    var t = mt();
    return Pe === null ? t.memoizedState = e : jc(t, Pe.memoizedState, e);
  }, useTransition: function() {
    var e = wa(es)[0], t = mt().memoizedState;
    return [e, t];
  }, useMutableSource: vc, useSyncExternalStore: _c, useId: Lc, unstable_isNewReconciler: !1 };
  function xt(e, t) {
    if (e && e.defaultProps) {
      t = z({}, t), e = e.defaultProps;
      for (var s in e) t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  function Ea(e, t, s, o) {
    t = e.memoizedState, s = s(o, t), s = s == null ? t : z({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var pi = { isMounted: function(e) {
    return (e = e._reactInternals) ? wn(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var o = Je(), l = mn(e), c = Yt(o, l);
    c.payload = t, s != null && (c.callback = s), t = dn(e, c, l), t !== null && (bt(t, e, l, o), oi(t, e, l));
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var o = Je(), l = mn(e), c = Yt(o, l);
    c.tag = 1, c.payload = t, s != null && (c.callback = s), t = dn(e, c, l), t !== null && (bt(t, e, l, o), oi(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = Je(), o = mn(e), l = Yt(s, o);
    l.tag = 2, t != null && (l.callback = t), t = dn(e, l, o), t !== null && (bt(t, e, o, s), oi(t, e, o));
  } };
  function Fc(e, t, s, o, l, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, f) : t.prototype && t.prototype.isPureReactComponent ? !Ur(s, o) || !Ur(l, c) : !0;
  }
  function Bc(e, t, s) {
    var o = !1, l = ln, c = t.contextType;
    return typeof c == "object" && c !== null ? c = pt(c) : (l = tt(t) ? xn : We.current, o = t.contextTypes, c = (o = o != null) ? Zn(e, l) : ln), t = new t(s, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = pi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = c), t;
  }
  function Uc(e, t, s, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, o), t.state !== e && pi.enqueueReplaceState(t, t.state, null);
  }
  function ka(e, t, s, o) {
    var l = e.stateNode;
    l.props = s, l.state = e.memoizedState, l.refs = {}, ca(e);
    var c = t.contextType;
    typeof c == "object" && c !== null ? l.context = pt(c) : (c = tt(t) ? xn : We.current, l.context = Zn(e, c)), l.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Ea(e, t, c, s), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && pi.enqueueReplaceState(l, l.state, null), ai(e, s, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function ar(e, t) {
    try {
      var s = "", o = t;
      do
        s += le(o), o = o.return;
      while (o);
      var l = s;
    } catch (c) {
      l = `
Error generating stack: ` + c.message + `
` + c.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function ba(e, t, s) {
    return { value: e, source: null, stack: s ?? null, digest: t ?? null };
  }
  function Ca(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var Em = typeof WeakMap == "function" ? WeakMap : Map;
  function $c(e, t, s) {
    s = Yt(-1, s), s.tag = 3, s.payload = { element: null };
    var o = t.value;
    return s.callback = function() {
      Si || (Si = !0, Ua = o), Ca(e, t);
    }, s;
  }
  function Hc(e, t, s) {
    s = Yt(-1, s), s.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var l = t.value;
      s.payload = function() {
        return o(l);
      }, s.callback = function() {
        Ca(e, t);
      };
    }
    var c = e.stateNode;
    return c !== null && typeof c.componentDidCatch == "function" && (s.callback = function() {
      Ca(e, t), typeof o != "function" && (hn === null ? hn = /* @__PURE__ */ new Set([this]) : hn.add(this));
      var f = t.stack;
      this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
    }), s;
  }
  function Vc(e, t, s) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Em();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(s) || (l.add(s), e = zm.bind(null, e, t, s), t.then(e, e));
  }
  function Wc(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Gc(e, t, s, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = Yt(-1, 1), t.tag = 2, dn(s, t, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var km = ne.ReactCurrentOwner, nt = !1;
  function Ke(e, t, s, o) {
    t.child = e === null ? fc(t, null, s, o) : rr(t, e.child, s, o);
  }
  function Yc(e, t, s, o, l) {
    s = s.render;
    var c = t.ref;
    return ir(t, l), o = ya(e, t, s, o, c, l), s = va(), e !== null && !nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qt(e, t, l)) : (xe && s && ea(t), t.flags |= 1, Ke(e, t, o, l), t.child);
  }
  function qc(e, t, s, o, l) {
    if (e === null) {
      var c = s.type;
      return typeof c == "function" && !qa(c) && c.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = c, Qc(e, t, c, o, l)) : (e = Ti(s.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, (e.lanes & l) === 0) {
      var f = c.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Ur, s(f, o) && e.ref === t.ref) return qt(e, t, l);
    }
    return t.flags |= 1, e = yn(c, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Qc(e, t, s, o, l) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ur(c, o) && e.ref === t.ref) if (nt = !1, t.pendingProps = o = c, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (nt = !0);
      else return t.lanes = e.lanes, qt(e, t, l);
    }
    return Ta(e, t, s, o, l);
  }
  function Kc(e, t, s) {
    var o = t.pendingProps, l = o.children, c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ve(ur, ut), ut |= s;
    else {
      if ((s & 1073741824) === 0) return e = c !== null ? c.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ve(ur, ut), ut |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = c !== null ? c.baseLanes : s, ve(ur, ut), ut |= o;
    }
    else c !== null ? (o = c.baseLanes | s, t.memoizedState = null) : o = s, ve(ur, ut), ut |= o;
    return Ke(e, t, l, s), t.child;
  }
  function Jc(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Ta(e, t, s, o, l) {
    var c = tt(s) ? xn : We.current;
    return c = Zn(t, c), ir(t, l), s = ya(e, t, s, o, c, l), o = va(), e !== null && !nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qt(e, t, l)) : (xe && o && ea(t), t.flags |= 1, Ke(e, t, s, l), t.child);
  }
  function Xc(e, t, s, o, l) {
    if (tt(s)) {
      var c = !0;
      Xs(t);
    } else c = !1;
    if (ir(t, l), t.stateNode === null) gi(e, t), Bc(t, s, o), ka(t, s, o, l), o = !0;
    else if (e === null) {
      var f = t.stateNode, y = t.memoizedProps;
      f.props = y;
      var S = f.context, I = s.contextType;
      typeof I == "object" && I !== null ? I = pt(I) : (I = tt(s) ? xn : We.current, I = Zn(t, I));
      var P = s.getDerivedStateFromProps, L = typeof P == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      L || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== o || S !== I) && Uc(t, f, o, I), cn = !1;
      var N = t.memoizedState;
      f.state = N, ai(t, o, f, l), S = t.memoizedState, y !== o || N !== S || et.current || cn ? (typeof P == "function" && (Ea(t, s, P, o), S = t.memoizedState), (y = cn || Fc(t, s, y, o, N, S, I)) ? (L || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = S), f.props = o, f.state = S, f.context = I, o = y) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      f = t.stateNode, pc(e, t), y = t.memoizedProps, I = t.type === t.elementType ? y : xt(t.type, y), f.props = I, L = t.pendingProps, N = f.context, S = s.contextType, typeof S == "object" && S !== null ? S = pt(S) : (S = tt(s) ? xn : We.current, S = Zn(t, S));
      var U = s.getDerivedStateFromProps;
      (P = typeof U == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== L || N !== S) && Uc(t, f, o, S), cn = !1, N = t.memoizedState, f.state = N, ai(t, o, f, l);
      var V = t.memoizedState;
      y !== L || N !== V || et.current || cn ? (typeof U == "function" && (Ea(t, s, U, o), V = t.memoizedState), (I = cn || Fc(t, s, I, o, N, V, S) || !1) ? (P || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, V, S), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, V, S)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = V), f.props = o, f.state = V, f.context = S, o = I) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Ia(e, t, s, o, c, l);
  }
  function Ia(e, t, s, o, l, c) {
    Jc(e, t);
    var f = (t.flags & 128) !== 0;
    if (!o && !f) return l && rc(t, s, !1), qt(e, t, c);
    o = t.stateNode, km.current = t;
    var y = f && typeof s.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && f ? (t.child = rr(t, e.child, null, c), t.child = rr(t, null, y, c)) : Ke(e, t, y, c), t.memoizedState = o.state, l && rc(t, s, !0), t.child;
  }
  function Zc(e) {
    var t = e.stateNode;
    t.pendingContext ? tc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && tc(e, t.context, !1), da(e, t.containerInfo);
  }
  function ed(e, t, s, o, l) {
    return nr(), sa(l), t.flags |= 256, Ke(e, t, s, o), t.child;
  }
  var Ra = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Aa(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function td(e, t, s) {
    var o = t.pendingProps, l = Ee.current, c = !1, f = (t.flags & 128) !== 0, y;
    if ((y = f) || (y = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), y ? (c = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), ve(Ee, l & 1), e === null)
      return ra(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (f = o.children, e = o.fallback, c ? (o = t.mode, c = t.child, f = { mode: "hidden", children: f }, (o & 1) === 0 && c !== null ? (c.childLanes = 0, c.pendingProps = f) : c = Ii(f, o, 0, null), e = Nn(e, o, s, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = Aa(s), t.memoizedState = Ra, e) : Ma(t, f));
    if (l = e.memoizedState, l !== null && (y = l.dehydrated, y !== null)) return bm(e, t, f, o, y, l, s);
    if (c) {
      c = o.fallback, f = t.mode, l = e.child, y = l.sibling;
      var S = { mode: "hidden", children: o.children };
      return (f & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = S, t.deletions = null) : (o = yn(l, S), o.subtreeFlags = l.subtreeFlags & 14680064), y !== null ? c = yn(y, c) : (c = Nn(c, f, s, null), c.flags |= 2), c.return = t, o.return = t, o.sibling = c, t.child = o, o = c, c = t.child, f = e.child.memoizedState, f = f === null ? Aa(s) : { baseLanes: f.baseLanes | s, cachePool: null, transitions: f.transitions }, c.memoizedState = f, c.childLanes = e.childLanes & ~s, t.memoizedState = Ra, o;
    }
    return c = e.child, e = c.sibling, o = yn(c, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = s), o.return = t, o.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Ma(e, t) {
    return t = Ii({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function mi(e, t, s, o) {
    return o !== null && sa(o), rr(t, e.child, null, s), e = Ma(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function bm(e, t, s, o, l, c, f) {
    if (s)
      return t.flags & 256 ? (t.flags &= -257, o = ba(Error(i(422))), mi(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = o.fallback, l = t.mode, o = Ii({ mode: "visible", children: o.children }, l, 0, null), c = Nn(c, l, f, null), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, (t.mode & 1) !== 0 && rr(t, e.child, null, f), t.child.memoizedState = Aa(f), t.memoizedState = Ra, c);
    if ((t.mode & 1) === 0) return mi(e, t, f, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var y = o.dgst;
      return o = y, c = Error(i(419)), o = ba(c, o, void 0), mi(e, t, f, o);
    }
    if (y = (f & e.childLanes) !== 0, nt || y) {
      if (o = Oe, o !== null) {
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
        l = (l & (o.suspendedLanes | f)) !== 0 ? 0 : l, l !== 0 && l !== c.retryLane && (c.retryLane = l, Gt(e, l), bt(o, e, l, -1));
      }
      return Ya(), o = ba(Error(i(421))), mi(e, t, f, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Dm.bind(null, e), l._reactRetry = t, null) : (e = c.treeContext, lt = on(l.nextSibling), at = t, xe = !0, St = null, e !== null && (ft[ht++] = Vt, ft[ht++] = Wt, ft[ht++] = En, Vt = e.id, Wt = e.overflow, En = t), t = Ma(t, o.children), t.flags |= 4096, t);
  }
  function nd(e, t, s) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), la(e.return, t, s);
  }
  function Na(e, t, s, o, l) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: s, tailMode: l } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = o, c.tail = s, c.tailMode = l);
  }
  function rd(e, t, s) {
    var o = t.pendingProps, l = o.revealOrder, c = o.tail;
    if (Ke(e, t, o.children, s), o = Ee.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && nd(e, s, t);
        else if (e.tag === 19) nd(e, s, t);
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
        for (s = t.child, l = null; s !== null; ) e = s.alternate, e !== null && li(e) === null && (l = s), s = s.sibling;
        s = l, s === null ? (l = t.child, t.child = null) : (l = s.sibling, s.sibling = null), Na(t, !1, l, s, c);
        break;
      case "backwards":
        for (s = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && li(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = s, s = l, l = e;
        }
        Na(t, !0, s, null, c);
        break;
      case "together":
        Na(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function gi(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function qt(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), In |= t.lanes, (s & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, s = yn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; ) e = e.sibling, s = s.sibling = yn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function Cm(e, t, s) {
    switch (t.tag) {
      case 3:
        Zc(t), nr();
        break;
      case 5:
        yc(t);
        break;
      case 1:
        tt(t.type) && Xs(t);
        break;
      case 4:
        da(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        ve(si, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (ve(Ee, Ee.current & 1), t.flags |= 128, null) : (s & t.child.childLanes) !== 0 ? td(e, t, s) : (ve(Ee, Ee.current & 1), e = qt(e, t, s), e !== null ? e.sibling : null);
        ve(Ee, Ee.current & 1);
        break;
      case 19:
        if (o = (s & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return rd(e, t, s);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), ve(Ee, Ee.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Kc(e, t, s);
    }
    return qt(e, t, s);
  }
  var sd, Pa, id, od;
  sd = function(e, t) {
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
  }, Pa = function() {
  }, id = function(e, t, s, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, Cn(jt.current);
      var c = null;
      switch (s) {
        case "input":
          l = ao(e, l), o = ao(e, o), c = [];
          break;
        case "select":
          l = z({}, l, { value: void 0 }), o = z({}, o, { value: void 0 }), c = [];
          break;
        case "textarea":
          l = co(e, l), o = co(e, o), c = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Qs);
      }
      ho(s, o);
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
  }, od = function(e, t, s, o) {
    s !== o && (t.flags |= 4);
  };
  function ns(e, t) {
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
  function Ye(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) s |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = s, t;
  }
  function Tm(e, t, s) {
    var o = t.pendingProps;
    switch (ta(t), t.tag) {
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
        return tt(t.type) && Js(), Ye(t), null;
      case 3:
        return o = t.stateNode, or(), we(et), we(We), pa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (ni(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, St !== null && (Va(St), St = null))), Pa(e, t), Ye(t), null;
      case 5:
        fa(t);
        var l = Cn(Jr.current);
        if (s = t.type, e !== null && t.stateNode != null) id(e, t, s, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(i(166));
            return Ye(t), null;
          }
          if (e = Cn(jt.current), ni(t)) {
            o = t.stateNode, s = t.type;
            var c = t.memoizedProps;
            switch (o[Pt] = t, o[Gr] = c, e = (t.mode & 1) !== 0, s) {
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
                for (l = 0; l < Hr.length; l++) _e(Hr[l], o);
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
                Bl(o, c), _e("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!c.multiple }, _e("invalid", o);
                break;
              case "textarea":
                Hl(o, c), _e("invalid", o);
            }
            ho(s, c), l = null;
            for (var f in c) if (c.hasOwnProperty(f)) {
              var y = c[f];
              f === "children" ? typeof y == "string" ? o.textContent !== y && (c.suppressHydrationWarning !== !0 && qs(o.textContent, y, e), l = ["children", y]) : typeof y == "number" && o.textContent !== "" + y && (c.suppressHydrationWarning !== !0 && qs(
                o.textContent,
                y,
                e
              ), l = ["children", "" + y]) : u.hasOwnProperty(f) && y != null && f === "onScroll" && _e("scroll", o);
            }
            switch (s) {
              case "input":
                Ut(o), $l(o, c, !0);
                break;
              case "textarea":
                Ut(o), Wl(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = Qs);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            f = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Gl(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(s, { is: o.is }) : (e = f.createElement(s), s === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, s), e[Pt] = t, e[Gr] = o, sd(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (f = po(s, o), s) {
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
                  for (l = 0; l < Hr.length; l++) _e(Hr[l], e);
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
                  Bl(e, o), l = ao(e, o), _e("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = z({}, o, { value: void 0 }), _e("invalid", e);
                  break;
                case "textarea":
                  Hl(e, o), l = co(e, o), _e("invalid", e);
                  break;
                default:
                  l = o;
              }
              ho(s, l), y = l;
              for (c in y) if (y.hasOwnProperty(c)) {
                var S = y[c];
                c === "style" ? Ql(e, S) : c === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, S != null && Yl(e, S)) : c === "children" ? typeof S == "string" ? (s !== "textarea" || S !== "") && kr(e, S) : typeof S == "number" && kr(e, "" + S) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? S != null && c === "onScroll" && _e("scroll", e) : S != null && Z(e, c, S, f));
              }
              switch (s) {
                case "input":
                  Ut(e), $l(e, o, !1);
                  break;
                case "textarea":
                  Ut(e), Wl(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + fe(o.value));
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
        return Ye(t), null;
      case 6:
        if (e && t.stateNode != null) od(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(i(166));
          if (s = Cn(Jr.current), Cn(jt.current), ni(t)) {
            if (o = t.stateNode, s = t.memoizedProps, o[Pt] = t, (c = o.nodeValue !== s) && (e = at, e !== null)) switch (e.tag) {
              case 3:
                qs(o.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && qs(o.nodeValue, s, (e.mode & 1) !== 0);
            }
            c && (t.flags |= 4);
          } else o = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(o), o[Pt] = t, t.stateNode = o;
        }
        return Ye(t), null;
      case 13:
        if (we(Ee), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (xe && lt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) uc(), nr(), t.flags |= 98560, c = !1;
          else if (c = ni(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(i(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(i(317));
              c[Pt] = t;
            } else nr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ye(t), c = !1;
          } else St !== null && (Va(St), St = null), c = !0;
          if (!c) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = s, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Ee.current & 1) !== 0 ? je === 0 && (je = 3) : Ya())), t.updateQueue !== null && (t.flags |= 4), Ye(t), null);
      case 4:
        return or(), Pa(e, t), e === null && Vr(t.stateNode.containerInfo), Ye(t), null;
      case 10:
        return aa(t.type._context), Ye(t), null;
      case 17:
        return tt(t.type) && Js(), Ye(t), null;
      case 19:
        if (we(Ee), c = t.memoizedState, c === null) return Ye(t), null;
        if (o = (t.flags & 128) !== 0, f = c.rendering, f === null) if (o) ns(c, !1);
        else {
          if (je !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (f = li(e), f !== null) {
              for (t.flags |= 128, ns(c, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = s, s = t.child; s !== null; ) c = s, e = o, c.flags &= 14680066, f = c.alternate, f === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f.childLanes, c.lanes = f.lanes, c.child = f.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f.memoizedProps, c.memoizedState = f.memoizedState, c.updateQueue = f.updateQueue, c.type = f.type, e = f.dependencies, c.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return ve(Ee, Ee.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          c.tail !== null && Re() > cr && (t.flags |= 128, o = !0, ns(c, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = li(f), e !== null) {
            if (t.flags |= 128, o = !0, s = e.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), ns(c, !0), c.tail === null && c.tailMode === "hidden" && !f.alternate && !xe) return Ye(t), null;
          } else 2 * Re() - c.renderingStartTime > cr && s !== 1073741824 && (t.flags |= 128, o = !0, ns(c, !1), t.lanes = 4194304);
          c.isBackwards ? (f.sibling = t.child, t.child = f) : (s = c.last, s !== null ? s.sibling = f : t.child = f, c.last = f);
        }
        return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = Re(), t.sibling = null, s = Ee.current, ve(Ee, o ? s & 1 | 2 : s & 1), t) : (Ye(t), null);
      case 22:
      case 23:
        return Ga(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (ut & 1073741824) !== 0 && (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ye(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function Im(e, t) {
    switch (ta(t), t.tag) {
      case 1:
        return tt(t.type) && Js(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return or(), we(et), we(We), pa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return fa(t), null;
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
        return aa(t.type._context), null;
      case 22:
      case 23:
        return Ga(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var yi = !1, qe = !1, Rm = typeof WeakSet == "function" ? WeakSet : Set, $ = null;
  function lr(e, t) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (o) {
      Ce(e, t, o);
    }
    else s.current = null;
  }
  function ja(e, t, s) {
    try {
      s();
    } catch (o) {
      Ce(e, t, o);
    }
  }
  var ad = !1;
  function Am(e, t) {
    if (Go = zs, e = Fu(), Do(e)) {
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
          var f = 0, y = -1, S = -1, I = 0, P = 0, L = e, N = null;
          t: for (; ; ) {
            for (var U; L !== s || l !== 0 && L.nodeType !== 3 || (y = f + l), L !== c || o !== 0 && L.nodeType !== 3 || (S = f + o), L.nodeType === 3 && (f += L.nodeValue.length), (U = L.firstChild) !== null; )
              N = L, L = U;
            for (; ; ) {
              if (L === e) break t;
              if (N === s && ++I === l && (y = f), N === c && ++P === o && (S = f), (U = L.nextSibling) !== null) break;
              L = N, N = L.parentNode;
            }
            L = U;
          }
          s = y === -1 || S === -1 ? null : { start: y, end: S };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (Yo = { focusedElem: e, selectionRange: s }, zs = !1, $ = t; $ !== null; ) if (t = $, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, $ = e;
    else for (; $ !== null; ) {
      t = $;
      try {
        var V = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (V !== null) {
              var W = V.memoizedProps, Ae = V.memoizedState, b = t.stateNode, x = b.getSnapshotBeforeUpdate(t.elementType === t.type ? W : xt(t.type, W), Ae);
              b.__reactInternalSnapshotBeforeUpdate = x;
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
      } catch (D) {
        Ce(t, t.return, D);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, $ = e;
        break;
      }
      $ = t.return;
    }
    return V = ad, ad = !1, V;
  }
  function rs(e, t, s) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy;
          l.destroy = void 0, c !== void 0 && ja(t, s, c);
        }
        l = l.next;
      } while (l !== o);
    }
  }
  function vi(e, t) {
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
  function La(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function ld(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ld(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Pt], delete t[Gr], delete t[Jo], delete t[fm], delete t[hm])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ud(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function cd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ud(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Oa(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.nodeType === 8 ? s.parentNode.insertBefore(e, t) : s.insertBefore(e, t) : (s.nodeType === 8 ? (t = s.parentNode, t.insertBefore(e, s)) : (t = s, t.appendChild(e)), s = s._reactRootContainer, s != null || t.onclick !== null || (t.onclick = Qs));
    else if (o !== 4 && (e = e.child, e !== null)) for (Oa(e, t, s), e = e.sibling; e !== null; ) Oa(e, t, s), e = e.sibling;
  }
  function za(e, t, s) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? s.insertBefore(e, t) : s.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (za(e, t, s), e = e.sibling; e !== null; ) za(e, t, s), e = e.sibling;
  }
  var Ue = null, Et = !1;
  function fn(e, t, s) {
    for (s = s.child; s !== null; ) dd(e, t, s), s = s.sibling;
  }
  function dd(e, t, s) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
      Nt.onCommitFiberUnmount(Ms, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        qe || lr(s, t);
      case 6:
        var o = Ue, l = Et;
        Ue = null, fn(e, t, s), Ue = o, Et = l, Ue !== null && (Et ? (e = Ue, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : Ue.removeChild(s.stateNode));
        break;
      case 18:
        Ue !== null && (Et ? (e = Ue, s = s.stateNode, e.nodeType === 8 ? Ko(e.parentNode, s) : e.nodeType === 1 && Ko(e, s), Lr(e)) : Ko(Ue, s.stateNode));
        break;
      case 4:
        o = Ue, l = Et, Ue = s.stateNode.containerInfo, Et = !0, fn(e, t, s), Ue = o, Et = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!qe && (o = s.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var c = l, f = c.destroy;
            c = c.tag, f !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && ja(s, t, f), l = l.next;
          } while (l !== o);
        }
        fn(e, t, s);
        break;
      case 1:
        if (!qe && (lr(s, t), o = s.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = s.memoizedProps, o.state = s.memoizedState, o.componentWillUnmount();
        } catch (y) {
          Ce(s, t, y);
        }
        fn(e, t, s);
        break;
      case 21:
        fn(e, t, s);
        break;
      case 22:
        s.mode & 1 ? (qe = (o = qe) || s.memoizedState !== null, fn(e, t, s), qe = o) : fn(e, t, s);
        break;
      default:
        fn(e, t, s);
    }
  }
  function fd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Rm()), t.forEach(function(o) {
        var l = Fm.bind(null, e, o);
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
        dd(c, f, l), Ue = null, Et = !1;
        var S = l.alternate;
        S !== null && (S.return = null), l.return = null;
      } catch (I) {
        Ce(l, t, I);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) hd(t, e), t = t.sibling;
  }
  function hd(e, t) {
    var s = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (kt(t, e), Ot(e), o & 4) {
          try {
            rs(3, e, e.return), vi(3, e);
          } catch (W) {
            Ce(e, e.return, W);
          }
          try {
            rs(5, e, e.return);
          } catch (W) {
            Ce(e, e.return, W);
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
            kr(l, "");
          } catch (W) {
            Ce(e, e.return, W);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var c = e.memoizedProps, f = s !== null ? s.memoizedProps : c, y = e.type, S = e.updateQueue;
          if (e.updateQueue = null, S !== null) try {
            y === "input" && c.type === "radio" && c.name != null && Ul(l, c), po(y, f);
            var I = po(y, c);
            for (f = 0; f < S.length; f += 2) {
              var P = S[f], L = S[f + 1];
              P === "style" ? Ql(l, L) : P === "dangerouslySetInnerHTML" ? Yl(l, L) : P === "children" ? kr(l, L) : Z(l, P, L, I);
            }
            switch (y) {
              case "input":
                lo(l, c);
                break;
              case "textarea":
                Vl(l, c);
                break;
              case "select":
                var N = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!c.multiple;
                var U = c.value;
                U != null ? Un(l, !!c.multiple, U, !1) : N !== !!c.multiple && (c.defaultValue != null ? Un(
                  l,
                  !!c.multiple,
                  c.defaultValue,
                  !0
                ) : Un(l, !!c.multiple, c.multiple ? [] : "", !1));
            }
            l[Gr] = c;
          } catch (W) {
            Ce(e, e.return, W);
          }
        }
        break;
      case 6:
        if (kt(t, e), Ot(e), o & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, c = e.memoizedProps;
          try {
            l.nodeValue = c;
          } catch (W) {
            Ce(e, e.return, W);
          }
        }
        break;
      case 3:
        if (kt(t, e), Ot(e), o & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Lr(t.containerInfo);
        } catch (W) {
          Ce(e, e.return, W);
        }
        break;
      case 4:
        kt(t, e), Ot(e);
        break;
      case 13:
        kt(t, e), Ot(e), l = e.child, l.flags & 8192 && (c = l.memoizedState !== null, l.stateNode.isHidden = c, !c || l.alternate !== null && l.alternate.memoizedState !== null || (Ba = Re())), o & 4 && fd(e);
        break;
      case 22:
        if (P = s !== null && s.memoizedState !== null, e.mode & 1 ? (qe = (I = qe) || P, kt(t, e), qe = I) : kt(t, e), Ot(e), o & 8192) {
          if (I = e.memoizedState !== null, (e.stateNode.isHidden = I) && !P && (e.mode & 1) !== 0) for ($ = e, P = e.child; P !== null; ) {
            for (L = $ = P; $ !== null; ) {
              switch (N = $, U = N.child, N.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  rs(4, N, N.return);
                  break;
                case 1:
                  lr(N, N.return);
                  var V = N.stateNode;
                  if (typeof V.componentWillUnmount == "function") {
                    o = N, s = N.return;
                    try {
                      t = o, V.props = t.memoizedProps, V.state = t.memoizedState, V.componentWillUnmount();
                    } catch (W) {
                      Ce(o, s, W);
                    }
                  }
                  break;
                case 5:
                  lr(N, N.return);
                  break;
                case 22:
                  if (N.memoizedState !== null) {
                    gd(L);
                    continue;
                  }
              }
              U !== null ? (U.return = N, $ = U) : gd(L);
            }
            P = P.sibling;
          }
          e: for (P = null, L = e; ; ) {
            if (L.tag === 5) {
              if (P === null) {
                P = L;
                try {
                  l = L.stateNode, I ? (c = l.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (y = L.stateNode, S = L.memoizedProps.style, f = S != null && S.hasOwnProperty("display") ? S.display : null, y.style.display = ql("display", f));
                } catch (W) {
                  Ce(e, e.return, W);
                }
              }
            } else if (L.tag === 6) {
              if (P === null) try {
                L.stateNode.nodeValue = I ? "" : L.memoizedProps;
              } catch (W) {
                Ce(e, e.return, W);
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
        kt(t, e), Ot(e), o & 4 && fd(e);
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
            if (ud(s)) {
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
            o.flags & 32 && (kr(l, ""), o.flags &= -33);
            var c = cd(e);
            za(e, c, l);
            break;
          case 3:
          case 4:
            var f = o.stateNode.containerInfo, y = cd(e);
            Oa(e, y, f);
            break;
          default:
            throw Error(i(161));
        }
      } catch (S) {
        Ce(e, e.return, S);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Mm(e, t, s) {
    $ = e, pd(e);
  }
  function pd(e, t, s) {
    for (var o = (e.mode & 1) !== 0; $ !== null; ) {
      var l = $, c = l.child;
      if (l.tag === 22 && o) {
        var f = l.memoizedState !== null || yi;
        if (!f) {
          var y = l.alternate, S = y !== null && y.memoizedState !== null || qe;
          y = yi;
          var I = qe;
          if (yi = f, (qe = S) && !I) for ($ = l; $ !== null; ) f = $, S = f.child, f.tag === 22 && f.memoizedState !== null ? yd(l) : S !== null ? (S.return = f, $ = S) : yd(l);
          for (; c !== null; ) $ = c, pd(c), c = c.sibling;
          $ = l, yi = y, qe = I;
        }
        md(e);
      } else (l.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = l, $ = c) : md(e);
    }
  }
  function md(e) {
    for (; $ !== null; ) {
      var t = $;
      if ((t.flags & 8772) !== 0) {
        var s = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              qe || vi(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !qe) if (s === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? s.memoizedProps : xt(t.type, s.memoizedProps);
                o.componentDidUpdate(l, s.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var c = t.updateQueue;
              c !== null && gc(t, c, o);
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
                gc(t, f, s);
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
                    L !== null && Lr(L);
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
          qe || t.flags & 512 && La(t);
        } catch (N) {
          Ce(t, t.return, N);
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
  function gd(e) {
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
  function yd(e) {
    for (; $ !== null; ) {
      var t = $;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              vi(4, t);
            } catch (S) {
              Ce(t, s, S);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (S) {
                Ce(t, l, S);
              }
            }
            var c = t.return;
            try {
              La(t);
            } catch (S) {
              Ce(t, c, S);
            }
            break;
          case 5:
            var f = t.return;
            try {
              La(t);
            } catch (S) {
              Ce(t, f, S);
            }
        }
      } catch (S) {
        Ce(t, t.return, S);
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
  var Nm = Math.ceil, _i = ne.ReactCurrentDispatcher, Da = ne.ReactCurrentOwner, gt = ne.ReactCurrentBatchConfig, ce = 0, Oe = null, Me = null, $e = 0, ut = 0, ur = an(0), je = 0, ss = null, In = 0, wi = 0, Fa = 0, is = null, rt = null, Ba = 0, cr = 1 / 0, Qt = null, Si = !1, Ua = null, hn = null, xi = !1, pn = null, Ei = 0, os = 0, $a = null, ki = -1, bi = 0;
  function Je() {
    return (ce & 6) !== 0 ? Re() : ki !== -1 ? ki : ki = Re();
  }
  function mn(e) {
    return (e.mode & 1) === 0 ? 1 : (ce & 2) !== 0 && $e !== 0 ? $e & -$e : mm.transition !== null ? (bi === 0 && (bi = cu()), bi) : (e = ge, e !== 0 || (e = window.event, e = e === void 0 ? 16 : _u(e.type)), e);
  }
  function bt(e, t, s, o) {
    if (50 < os) throw os = 0, $a = null, Error(i(185));
    Ar(e, s, o), ((ce & 2) === 0 || e !== Oe) && (e === Oe && ((ce & 2) === 0 && (wi |= s), je === 4 && gn(e, $e)), st(e, o), s === 1 && ce === 0 && (t.mode & 1) === 0 && (cr = Re() + 500, Zs && un()));
  }
  function st(e, t) {
    var s = e.callbackNode;
    mp(e, t);
    var o = js(e, e === Oe ? $e : 0);
    if (o === 0) s !== null && au(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (s != null && au(s), t === 1) e.tag === 0 ? pm(_d.bind(null, e)) : sc(_d.bind(null, e)), cm(function() {
        (ce & 6) === 0 && un();
      }), s = null;
      else {
        switch (du(o)) {
          case 1:
            s = So;
            break;
          case 4:
            s = lu;
            break;
          case 16:
            s = As;
            break;
          case 536870912:
            s = uu;
            break;
          default:
            s = As;
        }
        s = Td(s, vd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function vd(e, t) {
    if (ki = -1, bi = 0, (ce & 6) !== 0) throw Error(i(327));
    var s = e.callbackNode;
    if (dr() && e.callbackNode !== s) return null;
    var o = js(e, e === Oe ? $e : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = Ci(e, o);
    else {
      t = o;
      var l = ce;
      ce |= 2;
      var c = Sd();
      (Oe !== e || $e !== t) && (Qt = null, cr = Re() + 500, An(e, t));
      do
        try {
          Lm();
          break;
        } catch (y) {
          wd(e, y);
        }
      while (!0);
      oa(), _i.current = c, ce = l, Me !== null ? t = 0 : (Oe = null, $e = 0, t = je);
    }
    if (t !== 0) {
      if (t === 2 && (l = xo(e), l !== 0 && (o = l, t = Ha(e, l))), t === 1) throw s = ss, An(e, 0), gn(e, o), st(e, Re()), s;
      if (t === 6) gn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !Pm(l) && (t = Ci(e, o), t === 2 && (c = xo(e), c !== 0 && (o = c, t = Ha(e, c))), t === 1)) throw s = ss, An(e, 0), gn(e, o), st(e, Re()), s;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            Mn(e, rt, Qt);
            break;
          case 3:
            if (gn(e, o), (o & 130023424) === o && (t = Ba + 500 - Re(), 10 < t)) {
              if (js(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                Je(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Qo(Mn.bind(null, e, rt, Qt), t);
              break;
            }
            Mn(e, rt, Qt);
            break;
          case 4:
            if (gn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var f = 31 - _t(o);
              c = 1 << f, f = t[f], f > l && (l = f), o &= ~c;
            }
            if (o = l, o = Re() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Nm(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = Qo(Mn.bind(null, e, rt, Qt), o);
              break;
            }
            Mn(e, rt, Qt);
            break;
          case 5:
            Mn(e, rt, Qt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return st(e, Re()), e.callbackNode === s ? vd.bind(null, e) : null;
  }
  function Ha(e, t) {
    var s = is;
    return e.current.memoizedState.isDehydrated && (An(e, t).flags |= 256), e = Ci(e, t), e !== 2 && (t = rt, rt = s, t !== null && Va(t)), e;
  }
  function Va(e) {
    rt === null ? rt = e : rt.push.apply(rt, e);
  }
  function Pm(e) {
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
  function gn(e, t) {
    for (t &= ~Fa, t &= ~wi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var s = 31 - _t(t), o = 1 << s;
      e[s] = -1, t &= ~o;
    }
  }
  function _d(e) {
    if ((ce & 6) !== 0) throw Error(i(327));
    dr();
    var t = js(e, 0);
    if ((t & 1) === 0) return st(e, Re()), null;
    var s = Ci(e, t);
    if (e.tag !== 0 && s === 2) {
      var o = xo(e);
      o !== 0 && (t = o, s = Ha(e, o));
    }
    if (s === 1) throw s = ss, An(e, 0), gn(e, t), st(e, Re()), s;
    if (s === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Mn(e, rt, Qt), st(e, Re()), null;
  }
  function Wa(e, t) {
    var s = ce;
    ce |= 1;
    try {
      return e(t);
    } finally {
      ce = s, ce === 0 && (cr = Re() + 500, Zs && un());
    }
  }
  function Rn(e) {
    pn !== null && pn.tag === 0 && (ce & 6) === 0 && dr();
    var t = ce;
    ce |= 1;
    var s = gt.transition, o = ge;
    try {
      if (gt.transition = null, ge = 1, e) return e();
    } finally {
      ge = o, gt.transition = s, ce = t, (ce & 6) === 0 && un();
    }
  }
  function Ga() {
    ut = ur.current, we(ur);
  }
  function An(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, um(s)), Me !== null) for (s = Me.return; s !== null; ) {
      var o = s;
      switch (ta(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && Js();
          break;
        case 3:
          or(), we(et), we(We), pa();
          break;
        case 5:
          fa(o);
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
          aa(o.type._context);
          break;
        case 22:
        case 23:
          Ga();
      }
      s = s.return;
    }
    if (Oe = e, Me = e = yn(e.current, null), $e = ut = t, je = 0, ss = null, Fa = wi = In = 0, rt = is = null, bn !== null) {
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
  function wd(e, t) {
    do {
      var s = Me;
      try {
        if (oa(), ui.current = hi, ci) {
          for (var o = ke.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          ci = !1;
        }
        if (Tn = 0, Le = Pe = ke = null, Xr = !1, Zr = 0, Da.current = null, s === null || s.return === null) {
          je = 1, ss = t, Me = null;
          break;
        }
        e: {
          var c = e, f = s.return, y = s, S = t;
          if (t = $e, y.flags |= 32768, S !== null && typeof S == "object" && typeof S.then == "function") {
            var I = S, P = y, L = P.tag;
            if ((P.mode & 1) === 0 && (L === 0 || L === 11 || L === 15)) {
              var N = P.alternate;
              N ? (P.updateQueue = N.updateQueue, P.memoizedState = N.memoizedState, P.lanes = N.lanes) : (P.updateQueue = null, P.memoizedState = null);
            }
            var U = Wc(f);
            if (U !== null) {
              U.flags &= -257, Gc(U, f, y, c, t), U.mode & 1 && Vc(c, I, t), t = U, S = I;
              var V = t.updateQueue;
              if (V === null) {
                var W = /* @__PURE__ */ new Set();
                W.add(S), t.updateQueue = W;
              } else V.add(S);
              break e;
            } else {
              if ((t & 1) === 0) {
                Vc(c, I, t), Ya();
                break e;
              }
              S = Error(i(426));
            }
          } else if (xe && y.mode & 1) {
            var Ae = Wc(f);
            if (Ae !== null) {
              (Ae.flags & 65536) === 0 && (Ae.flags |= 256), Gc(Ae, f, y, c, t), sa(ar(S, y));
              break e;
            }
          }
          c = S = ar(S, y), je !== 4 && (je = 2), is === null ? is = [c] : is.push(c), c = f;
          do {
            switch (c.tag) {
              case 3:
                c.flags |= 65536, t &= -t, c.lanes |= t;
                var b = $c(c, S, t);
                mc(c, b);
                break e;
              case 1:
                y = S;
                var x = c.type, T = c.stateNode;
                if ((c.flags & 128) === 0 && (typeof x.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (hn === null || !hn.has(T)))) {
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var D = Hc(c, y, t);
                  mc(c, D);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        Ed(s);
      } catch (G) {
        t = G, Me === s && s !== null && (Me = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Sd() {
    var e = _i.current;
    return _i.current = hi, e === null ? hi : e;
  }
  function Ya() {
    (je === 0 || je === 3 || je === 2) && (je = 4), Oe === null || (In & 268435455) === 0 && (wi & 268435455) === 0 || gn(Oe, $e);
  }
  function Ci(e, t) {
    var s = ce;
    ce |= 2;
    var o = Sd();
    (Oe !== e || $e !== t) && (Qt = null, An(e, t));
    do
      try {
        jm();
        break;
      } catch (l) {
        wd(e, l);
      }
    while (!0);
    if (oa(), ce = s, _i.current = o, Me !== null) throw Error(i(261));
    return Oe = null, $e = 0, je;
  }
  function jm() {
    for (; Me !== null; ) xd(Me);
  }
  function Lm() {
    for (; Me !== null && !op(); ) xd(Me);
  }
  function xd(e) {
    var t = Cd(e.alternate, e, ut);
    e.memoizedProps = e.pendingProps, t === null ? Ed(e) : Me = t, Da.current = null;
  }
  function Ed(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (s = Tm(s, t, ut), s !== null) {
          Me = s;
          return;
        }
      } else {
        if (s = Im(s, t), s !== null) {
          s.flags &= 32767, Me = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          je = 6, Me = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Me = t;
        return;
      }
      Me = t = e;
    } while (t !== null);
    je === 0 && (je = 5);
  }
  function Mn(e, t, s) {
    var o = ge, l = gt.transition;
    try {
      gt.transition = null, ge = 1, Om(e, t, s, o);
    } finally {
      gt.transition = l, ge = o;
    }
    return null;
  }
  function Om(e, t, s, o) {
    do
      dr();
    while (pn !== null);
    if ((ce & 6) !== 0) throw Error(i(327));
    s = e.finishedWork;
    var l = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var c = s.lanes | s.childLanes;
    if (gp(e, c), e === Oe && (Me = Oe = null, $e = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || xi || (xi = !0, Td(As, function() {
      return dr(), null;
    })), c = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || c) {
      c = gt.transition, gt.transition = null;
      var f = ge;
      ge = 1;
      var y = ce;
      ce |= 4, Da.current = null, Am(e, s), hd(s, e), nm(Yo), zs = !!Go, Yo = Go = null, e.current = s, Mm(s), ap(), ce = y, ge = f, gt.transition = c;
    } else e.current = s;
    if (xi && (xi = !1, pn = e, Ei = l), c = e.pendingLanes, c === 0 && (hn = null), cp(s.stateNode), st(e, Re()), t !== null) for (o = e.onRecoverableError, s = 0; s < t.length; s++) l = t[s], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (Si) throw Si = !1, e = Ua, Ua = null, e;
    return (Ei & 1) !== 0 && e.tag !== 0 && dr(), c = e.pendingLanes, (c & 1) !== 0 ? e === $a ? os++ : (os = 0, $a = e) : os = 0, un(), null;
  }
  function dr() {
    if (pn !== null) {
      var e = du(Ei), t = gt.transition, s = ge;
      try {
        if (gt.transition = null, ge = 16 > e ? 16 : e, pn === null) var o = !1;
        else {
          if (e = pn, pn = null, Ei = 0, (ce & 6) !== 0) throw Error(i(331));
          var l = ce;
          for (ce |= 4, $ = e.current; $ !== null; ) {
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
                        rs(8, P, c);
                    }
                    var L = P.child;
                    if (L !== null) L.return = P, $ = L;
                    else for (; $ !== null; ) {
                      P = $;
                      var N = P.sibling, U = P.return;
                      if (ld(P), P === I) {
                        $ = null;
                        break;
                      }
                      if (N !== null) {
                        N.return = U, $ = N;
                        break;
                      }
                      $ = U;
                    }
                  }
                }
                var V = c.alternate;
                if (V !== null) {
                  var W = V.child;
                  if (W !== null) {
                    V.child = null;
                    do {
                      var Ae = W.sibling;
                      W.sibling = null, W = Ae;
                    } while (W !== null);
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
                  rs(9, c, c.return);
              }
              var b = c.sibling;
              if (b !== null) {
                b.return = c.return, $ = b;
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
                    vi(9, y);
                }
              } catch (G) {
                Ce(y, y.return, G);
              }
              if (y === f) {
                $ = null;
                break e;
              }
              var D = y.sibling;
              if (D !== null) {
                D.return = y.return, $ = D;
                break e;
              }
              $ = y.return;
            }
          }
          if (ce = l, un(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
            Nt.onPostCommitFiberRoot(Ms, e);
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
  function kd(e, t, s) {
    t = ar(s, t), t = $c(e, t, 1), e = dn(e, t, 1), t = Je(), e !== null && (Ar(e, 1, t), st(e, t));
  }
  function Ce(e, t, s) {
    if (e.tag === 3) kd(e, e, s);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        kd(t, e, s);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (hn === null || !hn.has(o))) {
          e = ar(s, e), e = Hc(t, e, 1), t = dn(t, e, 1), e = Je(), t !== null && (Ar(t, 1, e), st(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function zm(e, t, s) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = Je(), e.pingedLanes |= e.suspendedLanes & s, Oe === e && ($e & s) === s && (je === 4 || je === 3 && ($e & 130023424) === $e && 500 > Re() - Ba ? An(e, 0) : Fa |= s), st(e, t);
  }
  function bd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Ps, Ps <<= 1, (Ps & 130023424) === 0 && (Ps = 4194304)));
    var s = Je();
    e = Gt(e, t), e !== null && (Ar(e, t, s), st(e, s));
  }
  function Dm(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), bd(e, s);
  }
  function Fm(e, t) {
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
    o !== null && o.delete(t), bd(e, s);
  }
  var Cd;
  Cd = function(e, t, s) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || et.current) nt = !0;
    else {
      if ((e.lanes & s) === 0 && (t.flags & 128) === 0) return nt = !1, Cm(e, t, s);
      nt = (e.flags & 131072) !== 0;
    }
    else nt = !1, xe && (t.flags & 1048576) !== 0 && ic(t, ti, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        gi(e, t), e = t.pendingProps;
        var l = Zn(t, We.current);
        ir(t, s), l = ya(null, t, o, e, l, s);
        var c = va();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, tt(o) ? (c = !0, Xs(t)) : c = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, ca(t), l.updater = pi, t.stateNode = l, l._reactInternals = t, ka(t, o, e, s), t = Ia(null, t, o, !0, c, s)) : (t.tag = 0, xe && c && ea(t), Ke(null, t, l, s), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (gi(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = Um(o), e = xt(o, e), l) {
            case 0:
              t = Ta(null, t, o, e, s);
              break e;
            case 1:
              t = Xc(null, t, o, e, s);
              break e;
            case 11:
              t = Yc(null, t, o, e, s);
              break e;
            case 14:
              t = qc(null, t, o, xt(o.type, e), s);
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
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), Ta(e, t, o, l, s);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), Xc(e, t, o, l, s);
      case 3:
        e: {
          if (Zc(t), e === null) throw Error(i(387));
          o = t.pendingProps, c = t.memoizedState, l = c.element, pc(e, t), ai(t, o, null, s);
          var f = t.memoizedState;
          if (o = f.element, c.isDehydrated) if (c = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
            l = ar(Error(i(423)), t), t = ed(e, t, o, s, l);
            break e;
          } else if (o !== l) {
            l = ar(Error(i(424)), t), t = ed(e, t, o, s, l);
            break e;
          } else for (lt = on(t.stateNode.containerInfo.firstChild), at = t, xe = !0, St = null, s = fc(t, null, o, s), t.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (nr(), o === l) {
              t = qt(e, t, s);
              break e;
            }
            Ke(e, t, o, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return yc(t), e === null && ra(t), o = t.type, l = t.pendingProps, c = e !== null ? e.memoizedProps : null, f = l.children, qo(o, l) ? f = null : c !== null && qo(o, c) && (t.flags |= 32), Jc(e, t), Ke(e, t, f, s), t.child;
      case 6:
        return e === null && ra(t), null;
      case 13:
        return td(e, t, s);
      case 4:
        return da(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = rr(t, null, o, s) : Ke(e, t, o, s), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), Yc(e, t, o, l, s);
      case 7:
        return Ke(e, t, t.pendingProps, s), t.child;
      case 8:
        return Ke(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return Ke(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, c = t.memoizedProps, f = l.value, ve(si, o._currentValue), o._currentValue = f, c !== null) if (wt(c.value, f)) {
            if (c.children === l.children && !et.current) {
              t = qt(e, t, s);
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
                  c.lanes |= s, S = c.alternate, S !== null && (S.lanes |= s), la(
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
              f.lanes |= s, y = f.alternate, y !== null && (y.lanes |= s), la(f, s, t), f = c.sibling;
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
          Ke(e, t, l.children, s), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, o = t.pendingProps.children, ir(t, s), l = pt(l), o = o(l), t.flags |= 1, Ke(e, t, o, s), t.child;
      case 14:
        return o = t.type, l = xt(o, t.pendingProps), l = xt(o.type, l), qc(e, t, o, l, s);
      case 15:
        return Qc(e, t, t.type, t.pendingProps, s);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : xt(o, l), gi(e, t), t.tag = 1, tt(o) ? (e = !0, Xs(t)) : e = !1, ir(t, s), Bc(t, o, l), ka(t, o, l, s), Ia(null, t, o, !0, e, s);
      case 19:
        return rd(e, t, s);
      case 22:
        return Kc(e, t, s);
    }
    throw Error(i(156, t.tag));
  };
  function Td(e, t) {
    return ou(e, t);
  }
  function Bm(e, t, s, o) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yt(e, t, s, o) {
    return new Bm(e, t, s, o);
  }
  function qa(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Um(e) {
    if (typeof e == "function") return qa(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Fe) return 11;
      if (e === dt) return 14;
    }
    return 2;
  }
  function yn(e, t) {
    var s = e.alternate;
    return s === null ? (s = yt(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function Ti(e, t, s, o, l, c) {
    var f = 2;
    if (o = e, typeof e == "function") qa(e) && (f = 1);
    else if (typeof e == "string") f = 5;
    else e: switch (e) {
      case ie:
        return Nn(s.children, l, c, t);
      case X:
        f = 8, l |= 8;
        break;
      case ye:
        return e = yt(12, s, t, l | 2), e.elementType = ye, e.lanes = c, e;
      case Be:
        return e = yt(13, s, t, l), e.elementType = Be, e.lanes = c, e;
      case He:
        return e = yt(19, s, t, l), e.elementType = He, e.lanes = c, e;
      case H:
        return Ii(s, l, c, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case De:
            f = 10;
            break e;
          case Ne:
            f = 9;
            break e;
          case Fe:
            f = 11;
            break e;
          case dt:
            f = 14;
            break e;
          case Ve:
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
  function Ii(e, t, s, o) {
    return e = yt(22, e, o, t), e.elementType = H, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function Qa(e, t, s) {
    return e = yt(6, e, null, t), e.lanes = s, e;
  }
  function Ka(e, t, s) {
    return t = yt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function $m(e, t, s, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Eo(0), this.expirationTimes = Eo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Eo(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function Ja(e, t, s, o, l, c, f, y, S) {
    return e = new $m(e, t, s, y, S), t === 1 ? (t = 1, c === !0 && (t |= 8)) : t = 0, c = yt(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = { element: o, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ca(c), e;
  }
  function Hm(e, t, s) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ae, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: s };
  }
  function Id(e) {
    if (!e) return ln;
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
            if (tt(t.type)) {
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
      if (tt(s)) return nc(e, s, t);
    }
    return t;
  }
  function Rd(e, t, s, o, l, c, f, y, S) {
    return e = Ja(s, o, !0, e, l, c, f, y, S), e.context = Id(null), s = e.current, o = Je(), l = mn(s), c = Yt(o, l), c.callback = t ?? null, dn(s, c, l), e.current.lanes = l, Ar(e, l, o), st(e, o), e;
  }
  function Ri(e, t, s, o) {
    var l = t.current, c = Je(), f = mn(l);
    return s = Id(s), t.context === null ? t.context = s : t.pendingContext = s, t = Yt(c, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = dn(l, t, f), e !== null && (bt(e, l, f, c), oi(e, l, f)), f;
  }
  function Ai(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Ad(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function Xa(e, t) {
    Ad(e, t), (e = e.alternate) && Ad(e, t);
  }
  function Vm() {
    return null;
  }
  var Md = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Za(e) {
    this._internalRoot = e;
  }
  Mi.prototype.render = Za.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Ri(e, t, null, null);
  }, Mi.prototype.unmount = Za.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Rn(function() {
        Ri(null, e, null, null);
      }), t[$t] = null;
    }
  };
  function Mi(e) {
    this._internalRoot = e;
  }
  Mi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = pu();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < nn.length && t !== 0 && t < nn[s].priority; s++) ;
      nn.splice(s, 0, e), s === 0 && yu(e);
    }
  };
  function el(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ni(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Nd() {
  }
  function Wm(e, t, s, o, l) {
    if (l) {
      if (typeof o == "function") {
        var c = o;
        o = function() {
          var I = Ai(f);
          c.call(I);
        };
      }
      var f = Rd(t, o, e, 0, null, !1, !1, "", Nd);
      return e._reactRootContainer = f, e[$t] = f.current, Vr(e.nodeType === 8 ? e.parentNode : e), Rn(), f;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var y = o;
      o = function() {
        var I = Ai(S);
        y.call(I);
      };
    }
    var S = Ja(e, 0, !1, null, null, !1, !1, "", Nd);
    return e._reactRootContainer = S, e[$t] = S.current, Vr(e.nodeType === 8 ? e.parentNode : e), Rn(function() {
      Ri(t, S, s, o);
    }), S;
  }
  function Pi(e, t, s, o, l) {
    var c = s._reactRootContainer;
    if (c) {
      var f = c;
      if (typeof l == "function") {
        var y = l;
        l = function() {
          var S = Ai(f);
          y.call(S);
        };
      }
      Ri(t, f, e, l);
    } else f = Wm(s, t, e, l, o);
    return Ai(f);
  }
  fu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = Rr(t.pendingLanes);
          s !== 0 && (ko(t, s | 1), st(t, Re()), (ce & 6) === 0 && (cr = Re() + 500, un()));
        }
        break;
      case 13:
        Rn(function() {
          var o = Gt(e, 1);
          if (o !== null) {
            var l = Je();
            bt(o, e, 1, l);
          }
        }), Xa(e, 1);
    }
  }, bo = function(e) {
    if (e.tag === 13) {
      var t = Gt(e, 134217728);
      if (t !== null) {
        var s = Je();
        bt(t, e, 134217728, s);
      }
      Xa(e, 134217728);
    }
  }, hu = function(e) {
    if (e.tag === 13) {
      var t = mn(e), s = Gt(e, t);
      if (s !== null) {
        var o = Je();
        bt(s, e, t, o);
      }
      Xa(e, t);
    }
  }, pu = function() {
    return ge;
  }, mu = function(e, t) {
    var s = ge;
    try {
      return ge = e, t();
    } finally {
      ge = s;
    }
  }, yo = function(e, t, s) {
    switch (t) {
      case "input":
        if (lo(e, s), t = s.name, s.type === "radio" && t != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < s.length; t++) {
            var o = s[t];
            if (o !== e && o.form === e.form) {
              var l = Ks(o);
              if (!l) throw Error(i(90));
              xr(o), lo(o, l);
            }
          }
        }
        break;
      case "textarea":
        Vl(e, s);
        break;
      case "select":
        t = s.value, t != null && Un(e, !!s.multiple, t, !1);
    }
  }, Zl = Wa, eu = Rn;
  var Gm = { usingClientEntryPoint: !1, Events: [Yr, Jn, Ks, Jl, Xl, Wa] }, as = { findFiberByHostInstance: Sn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Ym = { bundleType: as.bundleType, version: as.version, rendererPackageName: as.rendererPackageName, rendererConfig: as.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ne.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = su(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: as.findFiberByHostInstance || Vm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ji.isDisabled && ji.supportsFiber) try {
      Ms = ji.inject(Ym), Nt = ji;
    } catch {
    }
  }
  return it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gm, it.createPortal = function(e, t) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!el(t)) throw Error(i(200));
    return Hm(e, t, null, s);
  }, it.createRoot = function(e, t) {
    if (!el(e)) throw Error(i(299));
    var s = !1, o = "", l = Md;
    return t != null && (t.unstable_strictMode === !0 && (s = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ja(e, 1, !1, null, null, s, !1, o, l), e[$t] = t.current, Vr(e.nodeType === 8 ? e.parentNode : e), new Za(t);
  }, it.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = su(t), e = e === null ? null : e.stateNode, e;
  }, it.flushSync = function(e) {
    return Rn(e);
  }, it.hydrate = function(e, t, s) {
    if (!Ni(t)) throw Error(i(200));
    return Pi(null, e, t, !0, s);
  }, it.hydrateRoot = function(e, t, s) {
    if (!el(e)) throw Error(i(405));
    var o = s != null && s.hydratedSources || null, l = !1, c = "", f = Md;
    if (s != null && (s.unstable_strictMode === !0 && (l = !0), s.identifierPrefix !== void 0 && (c = s.identifierPrefix), s.onRecoverableError !== void 0 && (f = s.onRecoverableError)), t = Rd(t, null, e, 1, s ?? null, l, !1, c, f), e[$t] = t.current, Vr(e), o) for (e = 0; e < o.length; e++) s = o[e], l = s._getVersion, l = l(s._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [s, l] : t.mutableSourceEagerHydrationData.push(
      s,
      l
    );
    return new Mi(t);
  }, it.render = function(e, t, s) {
    if (!Ni(t)) throw Error(i(200));
    return Pi(null, e, t, !1, s);
  }, it.unmountComponentAtNode = function(e) {
    if (!Ni(e)) throw Error(i(40));
    return e._reactRootContainer ? (Rn(function() {
      Pi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[$t] = null;
      });
    }), !0) : !1;
  }, it.unstable_batchedUpdates = Wa, it.unstable_renderSubtreeIntoContainer = function(e, t, s, o) {
    if (!Ni(s)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Pi(e, t, s, !1, o);
  }, it.version = "18.3.1-next-f1338f8080-20240426", it;
}
var Bd;
function Rf() {
  if (Bd) return rl.exports;
  Bd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (n) {
        console.error(n);
      }
  }
  return r(), rl.exports = ng(), rl.exports;
}
var Ud;
function rg() {
  if (Ud) return Li;
  Ud = 1;
  var r = Rf();
  return Li.createRoot = r.createRoot, Li.hydrateRoot = r.hydrateRoot, Li;
}
var sg = rg(), ig = Rf();
const og = (r) => Array.from(r).map((i) => i.getModelContext()).sort((i, a) => (a.priority ?? 0) - (i.priority ?? 0)).reduce((i, a) => {
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
class Af {
  _providers = /* @__PURE__ */ new Set();
  getModelContext() {
    return og(this._providers);
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
class ag {
  _contextProvider = new Af();
  registerModelContextProvider(n) {
    return this._contextProvider.registerModelContextProvider(n);
  }
  getModelContextProvider() {
    return this._contextProvider;
  }
}
class lg {
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
const ug = (r) => r.status.type === "complete";
class Mf extends lg {
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
    const n = this.getAttachmentAdapter(), i = n && this.attachments.length > 0 ? Promise.all(this.attachments.map(async (d) => ug(d) ? d : await n.send(d))) : [], a = this.text;
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
class cg extends Mf {
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
let dg = (r, n = 21) => (i = n) => {
  let a = "", u = i | 0;
  for (; u--; )
    a += r[Math.random() * r.length | 0];
  return a;
};
const El = dg("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7), fg = "__optimistic__", hg = () => `${fg}${El()}`, wr = /* @__PURE__ */ Symbol("autoStatus"), pg = Object.freeze(Object.assign({ type: "running" }, { [wr]: !0 })), mg = Object.freeze(Object.assign({
  type: "complete",
  reason: "unknown"
}, { [wr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "tool-calls"
}, { [wr]: !0 }));
Object.freeze(Object.assign({
  type: "requires-action",
  reason: "interrupt"
}, { [wr]: !0 }));
const gg = (r) => r[wr] === !0, Nf = (r, n, i, a, u) => r && u ? Object.assign({
  type: "incomplete",
  reason: "error",
  error: u
}, { [wr]: !0 }) : r && n ? pg : mg;
var Pn = { exports: {} }, $d;
function yg() {
  if ($d) return Pn.exports;
  $d = 1;
  const r = typeof Buffer < "u", n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, i = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function a(p, g, _) {
    _ == null && g !== null && typeof g == "object" && (_ = g, g = void 0), r && Buffer.isBuffer(p) && (p = p.toString()), p && p.charCodeAt(0) === 65279 && (p = p.slice(1));
    const w = JSON.parse(p, g);
    if (w === null || typeof w != "object")
      return w;
    const C = _ && _.protoAction || "error", v = _ && _.constructorAction || "error";
    if (C === "ignore" && v === "ignore")
      return w;
    if (C !== "ignore" && v !== "ignore") {
      if (n.test(p) === !1 && i.test(p) === !1)
        return w;
    } else if (C !== "ignore" && v === "ignore") {
      if (n.test(p) === !1)
        return w;
    } else if (i.test(p) === !1)
      return w;
    return u(w, { protoAction: C, constructorAction: v, safe: _ && _.safe });
  }
  function u(p, { protoAction: g = "error", constructorAction: _ = "error", safe: w } = {}) {
    let C = [p];
    for (; C.length; ) {
      const v = C;
      C = [];
      for (const R of v) {
        if (g !== "ignore" && Object.prototype.hasOwnProperty.call(R, "__proto__")) {
          if (w === !0)
            return null;
          if (g === "error")
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
          const M = R[j];
          M && typeof M == "object" && C.push(M);
        }
      }
    }
    return p;
  }
  function d(p, g, _) {
    const { stackTraceLimit: w } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, g, _);
    } finally {
      Error.stackTraceLimit = w;
    }
  }
  function h(p, g) {
    const { stackTraceLimit: _ } = Error;
    Error.stackTraceLimit = 0;
    try {
      return a(p, g, { safe: !0 });
    } catch {
      return;
    } finally {
      Error.stackTraceLimit = _;
    }
  }
  return Pn.exports = d, Pn.exports.default = d, Pn.exports.parse = d, Pn.exports.safeParse = h, Pn.exports.scan = u, Pn.exports;
}
var vg = yg();
const Hd = /* @__PURE__ */ If(vg);
function _g(r) {
  const n = ["ROOT"];
  let i = -1, a = null;
  const u = [];
  let d;
  function h() {
    d !== void 0 && (u.push(JSON.parse(`"${d}"`)), d = void 0);
  }
  function p(C, v, R) {
    switch (C) {
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
  function g(C, v) {
    switch (C) {
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
  function _(C, v) {
    switch (C) {
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
  for (let C = 0; C < r.length; C++) {
    const v = r[C];
    switch (n[n.length - 1]) {
      case "ROOT":
        p(v, C, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (v) {
          case '"': {
            n.pop(), n.push("INSIDE_OBJECT_KEY"), d = "";
            break;
          }
          case "}": {
            i = C, n.pop(), d = u.pop();
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
        p(v, C, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        g(v, C);
        break;
      }
      case "INSIDE_STRING": {
        switch (v) {
          case '"': {
            n.pop(), i = C, d = u.pop();
            break;
          }
          case "\\": {
            n.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            i = C;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        v === "]" ? (i = C, n.pop(), d = u.pop()) : (i = C, d = "0", p(v, C, "INSIDE_ARRAY_AFTER_VALUE"));
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (v) {
          case ",": {
            n.pop(), n.push("INSIDE_ARRAY_AFTER_COMMA"), d = (Number(d) + 1).toString();
            break;
          }
          case "]": {
            i = C, n.pop(), d = u.pop();
            break;
          }
          default: {
            i = C;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        p(v, C, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        n.pop(), n[n.length - 1] === "INSIDE_STRING" ? i = C : n[n.length - 1] === "INSIDE_OBJECT_KEY" && (d += v);
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
            i = C;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(v, C), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && g(v, C);
            break;
          }
          case "}": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && g(v, C);
            break;
          }
          case "]": {
            n.pop(), d = u.pop(), n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(v, C);
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
        const j = r.substring(a, C + 1);
        !"false".startsWith(j) && !"true".startsWith(j) && !"null".startsWith(j) ? (n.pop(), n[n.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? g(v, C) : n[n.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && _(v, C)) : i = C;
        break;
      }
    }
  }
  let w = r.slice(0, i + 1);
  for (let C = n.length - 1; C >= 0; C--)
    switch (n[C]) {
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
const ol = /* @__PURE__ */ Symbol("aui.parse-partial-json-object.meta"), wg = (r) => {
  if (r.length === 0)
    return {
      [ol]: { state: "partial", partialPath: [] }
    };
  try {
    const n = Hd.parse(r);
    if (typeof n != "object" || n === null)
      throw new Error("argsText is expected to be an object");
    return n[ol] = {
      state: "complete",
      partialPath: []
    }, n;
  } catch {
    try {
      const [n, i] = _g(r), a = Hd.parse(n);
      if (typeof a != "object" || a === null)
        throw new Error("argsText is expected to be an object");
      return a[ol] = {
        state: "partial",
        partialPath: i
      }, a;
    } catch {
      return;
    }
  }
}, kl = (r, n, i) => {
  const { role: a, id: u, createdAt: d, attachments: h, status: p, metadata: g } = r, _ = {
    id: u ?? n,
    createdAt: d ?? /* @__PURE__ */ new Date()
  }, w = typeof r.content == "string" ? [{ type: "text", text: r.content }] : r.content, C = ({ image: v, ...R }) => {
    const j = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(v), M = /^https?:\/\//.test(v);
    return j || M ? { ...R, image: v } : (console.warn("Invalid image data format detected"), null);
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
              return C(v);
            case "data":
              return v;
            case "tool-call": {
              const { parentId: j, messages: M, ...B } = v, Y = {
                ...B,
                toolCallId: v.toolCallId ?? `tool-${El()}`,
                ...j !== void 0 && { parentId: j },
                ...M !== void 0 && { messages: M }
              };
              return v.args ? {
                ...Y,
                args: v.args,
                argsText: v.argsText ?? JSON.stringify(v.args)
              } : {
                ...Y,
                args: wg(v.argsText ?? "") ?? {},
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
          custom: g?.custom ?? {}
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
          custom: g?.custom ?? {}
        }
      };
    default: {
      const v = a;
      throw new Error(`Unknown message role: ${v}`);
    }
  }
}, bl = {
  /**
   * Converts an array of messages to an ExportedMessageRepository format.
   * Creates parent-child relationships based on the order of messages in the array.
   *
   * @param messages - Array of message-like objects to convert
   * @returns ExportedMessageRepository with parent-child relationships established
   */
  fromArray: (r) => {
    const n = r.map((i) => kl(i, El(), Nf(!1, !1, !1, !1, void 0)));
    return {
      messages: n.map((i, a) => ({
        parentId: a > 0 ? n[a - 1].id : null,
        message: i
      }))
    };
  }
}, Ui = (r) => r.next ? Ui(r.next) : "current" in r ? r : null;
class Sg {
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
class Pf {
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
        ], (Ui(i) === this.head || d.next === null) && (d.next = i), i.prev = n;
        const h = n ? n.level + 1 : 0;
        this.updateLevels(i, h);
      }
    }
  }
  /** Cached array of messages in the current active branch, from root to head */
  _messages = new Sg(() => {
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
      a = hg();
    while (this.messages.has(a));
    return this.addOrUpdateMessage(n, kl(i, a, { type: "running" })), a;
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
    this.performOp(null, a, "cut"), this.messages.delete(n), this.head === a && (this.head = Ui(u ?? this.root)), this._messages.dirty();
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
    a.next = i, this.head = Ui(i), this._messages.dirty();
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
class Xi {
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
class Cl extends Xi {
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
class Oi {
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
function xg(r, n) {
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
class It extends Xi {
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
    return n === Rt || xg(n, this._previousState) ? !1 : (this._previousState = n, !0);
  }
  _connect() {
    const n = () => {
      this._syncState() && this.notifySubscribers();
    };
    return this.binding.subscribe(n);
  }
}
const pr = /* @__PURE__ */ Symbol("innerMessage"), Eg = (r) => r[pr], ps = (r) => r.content.filter((i) => i.type === "text").map((i) => i.text).join(`

`);
class jf {
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
class Lf extends jf {
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
class kg extends Lf {
  get source() {
    return "thread-composer";
  }
}
class bg extends Lf {
  get source() {
    return "edit-composer";
  }
}
class Cg extends jf {
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
class Of extends Xi {
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
const zf = Object.freeze([]), Df = Object.freeze({}), Tg = (r) => Object.freeze({
  type: "thread",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  attachments: r?.attachments ?? zf,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  runConfig: r?.runConfig ?? Df,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
}), Ig = (r) => Object.freeze({
  type: "edit",
  isEditing: r?.isEditing ?? !1,
  canCancel: r?.canCancel ?? !1,
  isEmpty: r?.isEmpty ?? !0,
  text: r?.text ?? "",
  role: r?.role ?? "user",
  attachments: r?.attachments ?? zf,
  runConfig: r?.runConfig ?? Df,
  attachmentAccept: r?.attachmentAccept ?? "",
  dictation: r?.dictation,
  value: r?.text ?? ""
});
class Ff {
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
    return a || (a = new Of({
      event: n,
      binding: this._core
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
class Rg extends Ff {
  get path() {
    return this._core.path;
  }
  get type() {
    return "thread";
  }
  _getState;
  constructor(n) {
    const i = new Cl({
      path: n.path,
      getState: () => Tg(n.getState()),
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
    return new kg(new It({
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
class Ag extends Ff {
  _beginEdit;
  get path() {
    return this._core.path;
  }
  get type() {
    return "edit";
  }
  _getState;
  constructor(n, i) {
    const a = new Cl({
      path: n.path,
      getState: () => Ig(n.getState()),
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
    return new bg(new It({
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
const Vd = /* @__PURE__ */ Symbol.for("aui.tool-response");
class Vi {
  get [Vd]() {
    return !0;
  }
  artifact;
  result;
  isError;
  constructor(n) {
    n.artifact !== void 0 && (this.artifact = n.artifact), this.result = n.result, this.isError = n.isError ?? !1;
  }
  static [Symbol.hasInstance](n) {
    return typeof n == "object" && n !== null && Vd in n;
  }
  static toResponse(n) {
    return n instanceof Vi ? n : new Vi({
      result: n === void 0 ? "<no result>" : n
    });
  }
}
class Wd {
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
    const u = i.toolName, d = i.toolCallId, h = Vi.toResponse(n);
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
class Wi extends Xi {
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
const zi = Object.freeze({
  type: "complete"
}), Mg = (r, n, i) => {
  if (r.role !== "assistant")
    return zi;
  if (i.type === "tool-call")
    return i.result ? zi : r.status;
  const a = n === Math.max(0, r.content.length - 1);
  return r.status.type === "requires-action" ? zi : a ? r.status : zi;
}, Gd = (r, n) => {
  const i = r.content[n];
  if (!i)
    return Rt;
  const a = Mg(r, n, i);
  return Object.freeze({
    ...i,
    [pr]: i[pr],
    status: a
  });
};
class Ng {
  _core;
  _threadBinding;
  get path() {
    return this._core.path;
  }
  constructor(n, i) {
    this._core = n, this._threadBinding = i, this.composer = new Ag(new Wi({
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
    return ps(this.getState());
  }
  subscribe(n) {
    return this._core.subscribe(n);
  }
  getMessagePartByIndex(n) {
    if (n < 0)
      throw new Error("Message part index must be >= 0");
    return new Wd(new It({
      path: {
        ...this.path,
        ref: `${this.path.ref}${this.path.ref}.content[${n}]`,
        messagePartSelector: { type: "index", index: n }
      },
      getState: () => Gd(this.getState(), n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getMessagePartByToolCallId(n) {
    return new Wd(new It({
      path: {
        ...this.path,
        ref: this.path.ref + `${this.path.ref}.content[toolCallId=${JSON.stringify(n)}]`,
        messagePartSelector: { type: "toolCallId", toolCallId: n }
      },
      getState: () => {
        const i = this._core.getState(), a = i.content.findIndex((u) => u.type === "tool-call" && u.toolCallId === n);
        return a === -1 ? Rt : Gd(i, a);
      },
      subscribe: (i) => this._core.subscribe(i)
    }), this._core, this._threadBinding);
  }
  getAttachmentByIndex(n) {
    return new Cg(new It({
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
const Pg = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {},
  ...r.stream ? { stream: r.stream } : {}
}), jg = (r) => ({
  parentId: r.parentId ?? null,
  sourceId: r.sourceId ?? null,
  runConfig: r.runConfig ?? {}
}), Lg = (r, n) => typeof n == "string" ? {
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
}, Og = (r, n) => {
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
class zg {
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
      getState: () => Og(n.getState(), i.getState()),
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
    }, this.composer = new Rg(new Wi({
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
    this._threadBinding.getState().append(Lg(this._threadBinding.getState().messages, n));
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
    return this._threadBinding.getState().startRun(jg(i));
  }
  unstable_resumeRun(n) {
    return this._threadBinding.getState().resumeRun(Pg(n));
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
    return new Ng(new It({
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
    return a || (a = new Of({
      event: n,
      binding: this._threadBinding
    }), this._eventSubscriptionSubjects.set(n, a)), a.subscribe(i);
  }
}
const Dg = (r) => ({
  mainThreadId: r.mainThreadId,
  newThread: r.newThreadId,
  threads: r.threadIds,
  archivedThreads: r.archivedThreadIds,
  isLoading: r.isLoading,
  threadItems: r.threadData
}), Di = (r, n) => {
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
class Fg {
  _core;
  _runtimeFactory;
  _getState;
  constructor(n, i = zg) {
    this._core = n, this._runtimeFactory = i;
    const a = new Cl({
      path: {},
      getState: () => Dg(n),
      subscribe: (u) => n.subscribe(u)
    });
    this._getState = a.getState.bind(a), this._mainThreadListItemRuntime = new Oi(new It({
      path: {
        ref: "threadItems[main]",
        threadSelector: { type: "main" }
      },
      getState: () => Di(this._core, this._core.mainThreadId),
      subscribe: (u) => this._core.subscribe(u)
    }), this._core), this.main = new i(new Wi({
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
    return new this._runtimeFactory(new Wi({
      path: {
        ref: `threads[threadId=${JSON.stringify(n)}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => this._core.getThreadRuntimeCore(n),
      subscribe: (i) => this._core.subscribe(i)
    }), this.mainItem);
  }
  getItemByIndex(n) {
    return new Oi(new It({
      path: {
        ref: `threadItems[${n}]`,
        threadSelector: { type: "index", index: n }
      },
      getState: () => Di(this._core, this._core.threadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getArchivedItemByIndex(n) {
    return new Oi(new It({
      path: {
        ref: `archivedThreadItems[${n}]`,
        threadSelector: { type: "archiveIndex", index: n }
      },
      getState: () => Di(this._core, this._core.archivedThreadIds[n]),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
  getItemById(n) {
    return new Oi(new It({
      path: {
        ref: `threadItems[threadId=${n}]`,
        threadSelector: { type: "threadId", threadId: n }
      },
      getState: () => Di(this._core, n),
      subscribe: (i) => this._core.subscribe(i)
    }), this._core);
  }
}
const Bg = k.createContext(null), Ug = () => k.useContext(Bg), jn = Object.freeze([]), zn = "DEFAULT_THREAD_ID", $g = Object.freeze([zn]), Bf = Object.freeze({
  id: zn,
  remoteId: void 0,
  externalId: void 0,
  status: "regular"
}), Hg = Promise.resolve(), Yd = Object.freeze({
  [zn]: Bf
});
class Vg {
  adapter;
  threadFactory;
  _mainThreadId = zn;
  _threads = $g;
  _archivedThreads = jn;
  _threadData = Yd;
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
    return Hg;
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
      return Bf;
  }
  __internal_setAdapter(n, i = !1) {
    const a = this.adapter;
    this.adapter = n;
    const u = n.threadId ?? zn, d = n.threads ?? jn, h = n.archivedThreads ?? jn, p = a.threadId ?? zn, g = a.threads ?? jn, _ = a.archivedThreads ?? jn;
    !i && p === u && g === d && _ === h || (this._threadData = {
      ...Yd,
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
    }, g !== d && (this._threads = this.adapter.threads?.map((w) => w.id) ?? jn), _ !== h && (this._archivedThreads = this.adapter.archivedThreads?.map((w) => w.id) ?? jn), p !== u && (this._mainThreadId = u, this._mainThread = this.threadFactory()), this._notifySubscribers());
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
class qd {
  cache = /* @__PURE__ */ new WeakMap();
  convertMessages(n, i) {
    return n.map((a, u) => {
      const d = this.cache.get(a), h = i(d, a, u);
      return this.cache.set(a, h), h;
    });
  }
}
class Wg extends Mf {
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
    super(), this.runtime = n, this.endEditCallback = i, this._parentId = a, this._sourceId = u.id, this._previousText = ps(u), this.setText(this._previousText), this.setRole(u.role), this.setAttachments(u.attachments ?? []), this._nonTextParts = u.content.filter((d) => d.type !== "text"), this.setRunConfig({ ...n.composer.runConfig });
  }
  async handleSend(n) {
    ps(n) !== this._previousText && this.runtime.append({
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
class Gg {
  _contextProvider;
  _subscriptions = /* @__PURE__ */ new Set();
  _isInitialized = !1;
  repository = new Pf();
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
  composer = new cg(this);
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
    this._editComposers.set(n, new Wg(this, () => this._editComposers.delete(n), this.repository.getMessage(n))), this._notifySubscribers();
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
    const u = i.speak(ps(a)), d = u.subscribe(() => {
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
    this.import(bl.fromArray(n ?? []));
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
const Yg = Object.freeze([]), qg = (r, n) => r && n[n.length - 1]?.role !== "assistant";
class Qg extends Gg {
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
  _converter = new qd();
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
    this._store = n, this.extras = n.extras, this.suggestions = n.suggestions ?? Yg, this._capabilities = {
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
          this._converter = new qd();
        else if (a.isRunning === n.isRunning && a.messages === n.messages) {
          this._notifySubscribers();
          return;
        }
      }
      u = n.convertMessage ? this._converter.convertMessages(n.messages, (d, h, p) => {
        if (!n.convertMessage)
          return h;
        const g = p === (n.messages?.length ?? 0) - 1, _ = Nf(g, i, !1, !1, void 0);
        if (d && (d.role !== "assistant" || !gg(d.status) || d.status === _))
          return d;
        const w = n.convertMessage(h, p), C = kl(w, p.toString(), _);
        return C[pr] = h, C;
      }) : n.messages;
      for (let d = 0; d < u.length; d++) {
        const h = u[d], p = u[d - 1];
        this.repository.addOrUpdateMessage(p?.id ?? null, h);
      }
    } else
      throw new Error("ExternalStoreAdapter must provide either 'messages' or 'messageRepository'");
    u.length > 0 && this.ensureInitialized(), (a?.isRunning ?? !1) !== (n.isRunning ?? !1) && (n.isRunning ? this._notifyEventSubscribers("run-start") : this._notifyEventSubscribers("run-end")), this._assistantOptimisticId && (this.repository.deleteMessage(this._assistantOptimisticId), this._assistantOptimisticId = null), qg(i, u) && (this._assistantOptimisticId = this.repository.appendOptimisticMessage(u.at(-1)?.id ?? null, {
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
    i?.role === "user" && i.id === n.at(-1)?.id ? (this.repository.deleteMessage(i.id), this.composer.text.trim() || this.composer.setText(ps(i)), n = this.repository.getMessages()) : this._notifySubscribers(), setTimeout(() => {
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
    const i = new Pf();
    i.import(bl.fromArray(n ?? [])), this.updateMessages(i.getMessages());
  }
  import(n) {
    this._assistantOptimisticId = null, super.import(n), this._store.onImport && this._store.onImport(this.repository.getMessages());
  }
  updateMessages = (n) => {
    this._store.convertMessage !== void 0 ? this._store.setMessages?.(n.flatMap(Eg).filter((a) => a != null)) : this._store.setMessages?.(n);
  };
}
const Qd = (r) => r.adapters?.threadList ?? {};
class Kg extends ag {
  threads;
  constructor(n) {
    super(), this.threads = new Vg(Qd(n), () => new Qg(this._contextProvider, n));
  }
  setAdapter(n) {
    this.threads.__internal_setAdapter(Qd(n)), this.threads.getMainThreadRuntimeCore().__internal_setAdapter(n);
  }
}
const Jg = (r) => {
  const [n] = k.useState(() => new Kg(r));
  k.useEffect(() => {
    n.setAdapter(r);
  });
  const { modelContext: i } = Ug() ?? {};
  return k.useEffect(() => {
    if (i)
      return n.registerModelContextProvider(i);
  }, [i, n]), k.useMemo(() => new nv(n), [n]);
};
function Xg(r, n) {
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
function Zg(r) {
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
let us = null;
function ey(r, n) {
  r.currentIndex = 0;
  const i = us;
  us = r;
  try {
    if (n(), r.isFirstRender = !1, r.cells.length !== r.currentIndex)
      throw new Error(`Rendered ${r.currentIndex} hooks but expected ${r.cells.length}. Hooks must be called in the exact same order in every render.`);
  } finally {
    us = i;
  }
}
function Tl() {
  if (!us)
    throw new Error("No resource fiber available");
  return us;
}
function Uf(r, n) {
  const i = r[$f];
  if (!i)
    throw new Error("ResourceElement.type is not a valid Resource");
  return i(n);
}
const $f = /* @__PURE__ */ Symbol("fnSymbol");
function Zi(r, n) {
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
function ms(r) {
  r.isMounted = !1, Zg(r);
}
function gs(r, n) {
  const i = {
    commitTasks: [],
    props: n,
    state: void 0
  };
  return ey(r, () => {
    r.renderContext = i;
    try {
      i.state = Uf(r.resource, n);
    } finally {
      r.renderContext = void 0;
    }
  }), i;
}
function ys(r, n) {
  r.isMounted = !0, r.isNeverMounted = !1, Xg(n, r);
}
const ty = globalThis.__ASSISTANT_UI_DISABLE_LAYOUT_EFFECT__ === !0, Kd = ty ? k.useEffect : k.useLayoutEffect;
function Il(r) {
  const [, n] = k.useState({}), i = k.useMemo(() => Zi(r.type, () => n({})), [r.type]), a = gs(i, r.props);
  return Kd(() => () => ms(i), [i]), Kd(() => {
    ys(i, a);
  }), a.state;
}
const eo = (r) => typeof r == "string" ? {
  scope: r.split(".")[0],
  event: r
} : {
  scope: r.scope,
  event: r.event
}, cs = (r, n, i) => n === r;
let fr;
const al = () => {
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
    const i = al();
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
      }), g.logs.length > On.MAX_EVENT_LOGS_PER_API && (g.logs = g.logs.slice(-200)), On.notifyListeners(a));
    }), h = n.subscribe?.(() => {
      On.notifyListeners(a);
    });
    return i.apis.set(a, u), On.notifyListeners(a), () => {
      const p = al();
      p.apis.get(a) && (d?.(), h?.(), p.apis.delete(a), On.notifyListeners(a));
    };
  }
  static notifyListeners(n) {
    al().listeners.forEach((a) => a(n));
  }
}
function be(r) {
  const n = (i) => ({
    type: n,
    props: i
  });
  return n[$f] = r, n;
}
const ny = (r) => {
  if (r.renderContext)
    throw new Error("Resource updated during render");
  if (r.isMounted)
    r.scheduleRerender();
  else if (r.isNeverMounted)
    throw new Error("Resource updated before mount");
};
function ry(r) {
  const n = Tl(), i = n.currentIndex++;
  if (!n.isFirstRender && i >= n.cells.length)
    throw new Error("Rendered more hooks than during the previous render. Hooks must be called in the exact same order in every render.");
  if (!n.cells[i]) {
    const d = {
      type: "state",
      value: typeof r == "function" ? r() : r,
      set: (h) => {
        const p = d.value, g = typeof h == "function" ? h(p) : h;
        Object.is(p, g) || (d.value = g, ny(n));
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
  const n = ry(r);
  return [n.value, n.set];
}
function sy() {
  const r = Tl(), n = r.currentIndex++;
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
function Ze(r, n) {
  const i = Tl(), a = sy();
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
const iy = (r, n) => {
  if (r.length !== n.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.is(r[i], n[i]))
      return !1;
  return !0;
}, pe = (r, n) => {
  const i = mr();
  return i.current || (i.current = { value: r(), deps: n }), iy(i.current.deps, n) || (i.current.value = r(), i.current.deps = n), i.current.value;
}, oy = (r, n) => pe(() => r, n);
function ds(r, n) {
  const [i, a] = Ft({}), u = pe(() => Zi(r.type, () => a({})), [r.type]), d = n ? pe(() => r.props, n) : r.props, h = pe(() => gs(u, d), [u, d, i]);
  return Ze(() => () => ms(u), [u]), Ze(() => {
    ys(u, h);
  }, [u, h]), h.state;
}
function Bt(r) {
  return Uf(r.type, r.props);
}
function Hf(r, n, i) {
  const [a, u] = Ft(0), d = oy(() => u((_) => _ + 1), []), [h] = Ft(() => /* @__PURE__ */ new Map()), p = pe(() => n, i), g = pe(() => {
    const _ = {
      remove: [],
      add: [],
      commit: [],
      return: {}
    };
    for (const w in r) {
      const C = r[w], v = p(C, w);
      let R = h.get(w);
      (!R || R.resource !== v.type) && (R && _.remove.push(w), R = Zi(v.type, d), _.add.push([w, R]));
      const j = gs(R, v.props);
      _.commit.push([w, j]), _.return[w] = j.state;
    }
    if (h.size > _.commit.length - _.add.length + _.remove.length)
      for (const w of h.keys())
        w in r || _.remove.push(w);
    return _;
  }, [r, p, a]);
  return Ze(() => () => {
    for (const _ of h.keys())
      ms(h.get(_)), h.delete(_);
  }, []), Ze(() => {
    for (const _ of g.remove)
      ms(h.get(_)), h.delete(_);
    for (const [_, w] of g.add)
      h.set(_, w);
    for (const [_, w] of g.commit)
      ys(h.get(_), w);
  }, [g]), g.return;
}
const ay = 50;
let Dt = {
  schedulers: /* @__PURE__ */ new Set([]),
  isScheduled: !1
};
class ly {
  _task;
  _isDirty = !1;
  constructor(n) {
    this._task = n;
  }
  get isDirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = !0, Dt.schedulers.add(this), uy();
  }
  runTask() {
    this._isDirty = !1, this._task();
  }
}
const uy = () => {
  Dt.isScheduled || (Dt.isScheduled = !0, queueMicrotask(Vf));
}, Vf = () => {
  try {
    const r = [];
    let n = 0;
    for (const i of Dt.schedulers)
      if (Dt.schedulers.delete(i), !!i.isDirty) {
        if (n++, n > ay)
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
}, ml = (r) => {
  const n = Dt;
  Dt = {
    schedulers: /* @__PURE__ */ new Set([]),
    isScheduled: !0
  };
  try {
    const i = r();
    return Vf(), i;
  } finally {
    Dt = n;
  }
}, cy = be((r) => {
  const [, n] = Ft(r.element), i = ds(r.element), a = mr(/* @__PURE__ */ new Set()).current, u = mr(i);
  return Ze(() => {
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
}), dy = (r, { mount: n = !0 } = {}) => {
  let i = n, a;
  const u = {
    element: r,
    onRender: (p) => i ? p : (i = !0, ml(() => {
      p && (a = gs(h, u)), !d.isDirty && ys(h, a);
    }), !1),
    onUnmount: () => {
      if (!i)
        throw new Error("Resource not mounted");
      i = !1, ms(h);
    }
  }, d = new ly(() => {
    a = gs(h, u), !(d.isDirty || !i) && ys(h, a);
  }), h = Zi(cy, () => d.markDirty());
  return ml(() => {
    d.markDirty();
  }), a.state;
}, fs = /* @__PURE__ */ Symbol("tap.Context"), Wf = (r) => ({
  [fs]: r
}), Gf = (r, n, i) => {
  const a = r[fs];
  r[fs] = n;
  try {
    return i();
  } finally {
    r[fs] = a;
  }
}, Yf = (r) => r[fs], Jd = (r) => {
  let n;
  const i = /* @__PURE__ */ new Set(), a = (_, w) => {
    const C = typeof _ == "function" ? _(n) : _;
    if (!Object.is(C, n)) {
      const v = n;
      n = w ?? (typeof C != "object" || C === null) ? C : Object.assign({}, n, C), i.forEach((R) => R(n, v));
    }
  }, u = () => n, p = { setState: a, getState: u, getInitialState: () => g, subscribe: (_) => (i.add(_), () => i.delete(_)) }, g = n = r(a, u, p);
  return p;
}, fy = ((r) => r ? Jd(r) : Jd), hy = (r) => r;
function py(r, n = hy) {
  const i = Tt.useSyncExternalStore(
    r.subscribe,
    Tt.useCallback(() => n(r.getState()), [r, n]),
    Tt.useCallback(() => n(r.getInitialState()), [r, n])
  );
  return Tt.useDebugValue(i), i;
}
const Xd = (r) => {
  const n = fy(r), i = (a) => py(n, a);
  return Object.assign(i, n), i;
}, my = ((r) => r ? Xd(r) : Xd);
function Zd(r, n) {
  if (typeof r == "function")
    return r(n);
  r != null && (r.current = n);
}
function qf(...r) {
  return (n) => {
    let i = !1;
    const a = r.map((u) => {
      const d = Zd(u, n);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : Zd(r[u], null);
        }
      };
  };
}
function to(...r) {
  return k.useCallback(qf(...r), r);
}
const Qf = be((r) => {
  const n = pe(() => dy(r, { mount: !1 }), [r.type]);
  return Ze(() => {
    n.render(r);
  }), n;
});
class gy {
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
  Ze(() => {
    i.current = r;
  });
  const a = pe(() => new Proxy({}, new gy(i)), []), u = n?.key, d = r.getState();
  return pe(() => ({
    key: u,
    state: d,
    api: a
  }), [d, u]);
}, Gi = be((r) => {
  const n = mr(r.get);
  return Ze(() => {
    n.current = r.get;
  }), pe(() => Qe({
    source: r.source,
    query: r.query,
    get: () => n.current()
  }), [r.source, JSON.stringify(r.query)]);
}), yy = be((r) => {
  const n = ds(r.scopeElement);
  return pe(() => [r.fieldName, n], [r.fieldName, n]);
}), vy = be((r) => {
  const { on: n, subscribe: i, ...a } = r, u = mr({ on: n, subscribe: i });
  Ze(() => {
    u.current = { on: n, subscribe: i };
  });
  const d = Hf(a, (h, p) => yy({
    fieldName: p,
    scopeElement: h
  }), []);
  return pe(() => {
    const h = Object.fromEntries(Object.values(d)), { on: p, subscribe: g } = u.current;
    return p && (h.on = (_, w) => p(_, w)), g && (h.subscribe = (_) => g(_)), h;
  }, [d]);
}), Kf = Wf(null), _y = (r, n) => Gf(Kf, r, n), Jf = () => {
  const r = Yf(Kf);
  if (!r)
    throw new Error("Model context is not available in this context");
  return r;
}, wy = be(({ toolkit: r }) => {
  const [n, i] = Ft(() => ({
    tools: {}
  })), a = Jf();
  Ze(() => {
    if (!r)
      return;
    const d = [];
    for (const [g, _] of Object.entries(r))
      _.render && d.push(u(g, _.render));
    const h = Object.entries(r).reduce((g, [_, w]) => {
      const { render: C, ...v } = w;
      return g[_] = v, g;
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
  return At({
    getState: () => n,
    setToolUI: u
  });
}), Sy = be(() => pe(() => {
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
}, [])), Xf = Wf(null), xy = (r, n) => Gf(Xf, r, n), Rl = () => {
  const r = Yf(Xf);
  if (!r)
    throw new Error("Events context is not available");
  return r;
}, Ey = be(() => {
  const [r] = Ft(() => ({})), n = new Af();
  return At({
    getState: () => r,
    getModelContext: () => n.getModelContext(),
    subscribe: (i) => n.subscribe(i),
    register: (i) => n.registerModelContextProvider(i)
  });
}), ky = be(({ threads: r, modelContext: n, tools: i }) => {
  const a = Bt(Sy()), { threads: u, tools: d, modelContext: h } = xy(a, () => {
    const g = ds(n ?? Ey(), [n]);
    return _y(g.api, () => ({
      modelContext: g,
      tools: ds(i ?? wy({}), [i]),
      threads: ds(r, [r])
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
}), by = (r) => {
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
      const { event: u, scope: d } = eo(i);
      if (d === "*")
        return r.getState().api.on(u, a);
      if (cs("thread", d) || cs("thread-list-item", d) || cs("composer", d))
        return r.getState().api.on(u, (h) => {
          h.threadId === n().getState().id && a(h);
        });
      throw new Error(`Event scope is not available in this component: ${d}`);
    },
    subscribe: r.subscribe
  };
}, Cy = (r) => {
  const n = Al(), i = Il(Qf(ky(r))), a = k.useMemo(() => by(i), [i]);
  return k.useMemo(() => eh(n, a), [n, a]);
}, Qe = (r) => {
  const n = r.get;
  return n.source = r.source, n.query = r.query, n;
}, Yi = () => () => {
}, Zf = k.createContext({
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
  subscribe: Yi,
  on: (r) => {
    const { scope: n } = eo(r);
    throw new Error(`Event scope is not available in this component: ${n}`);
  }
}), Al = () => k.useContext(Zf), Ml = (r) => {
  const n = Al(), i = Il(vy(r));
  return k.useMemo(() => eh(n, i), [n, i]);
}, Ty = (r) => Cy(r);
function Mt(r) {
  return r ? Ty(r) : Al();
}
const Iy = (r, n) => r === Yi ? n : n === Yi ? r : (...i) => {
  const a = r(...i), u = n(...i);
  return () => {
    a(), u();
  };
}, eh = (r, n) => {
  const i = n.subscribe;
  return {
    ...r,
    ...n,
    subscribe: Iy(r.subscribe, i ?? Yi)
  };
}, no = ({ api: r, children: n, devToolsVisible: i = !0 }) => (k.useEffect(() => {
  if (!(!i || !r.subscribe))
    return On.register(r);
}, [r, i]), m.jsx(Zf.Provider, { value: r, children: n }));
class ef {
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
  const n = Mt(), i = k.useMemo(() => new ef(n), [n]), a = k.useSyncExternalStore(n.subscribe, () => r(i), () => r(i));
  if (k.useDebugValue(a), a instanceof ef)
    throw new Error("You tried to return the entire AssistantState. This is not supported due to technical limitations.");
  return a;
}, ll = (r, n) => {
  const i = Mt(), a = k.useRef(n);
  k.useEffect(() => {
    a.current = n;
  });
  const { scope: u, event: d } = eo(r);
  k.useEffect(() => i.on({ scope: u, event: d }, (h) => a.current(h)), [i, u, d]);
};
function Ry(r, n) {
  function i(a) {
    const u = k.useContext(r);
    if (!a?.optional && !u)
      throw new Error(`This component must be used within ${n}.`);
    return u;
  }
  return i;
}
function th(r, n) {
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
const nh = k.createContext(null), Ay = Ry(nh, "ThreadPrimitive.Viewport"), { useThreadViewport: qi, useThreadViewportStore: Nl } = th(Ay, "useThreadViewport"), My = (r) => {
  const n = r;
  n.__isBound || (n.__internal_bindMethods?.(), n.__isBound = !0);
};
function Ny(r, n = Py) {
  My(r);
  const i = k.useSyncExternalStore(r.subscribe, () => n(r.getState()), () => n(r.getState()));
  return k.useDebugValue(i), i;
}
const Py = (r) => r;
function jy(r) {
  function n(i) {
    let a = !1, u;
    typeof i == "function" ? u = i : i && (a = !!i.optional, u = i.selector);
    const d = r({ optional: a });
    return d ? Ny(d, u) : null;
  }
  return n;
}
function Ly(r) {
  const n = Mt(), i = Se(() => n.message.source ? n.message().__internal_getRuntime?.() ?? null : null);
  if (!i && !r?.optional)
    throw new Error("MessageRuntime is not available");
  return i;
}
const zt = jy(Ly), Fn = (r) => {
  const [, n] = Ft(r.getState);
  return Ze(() => (n(r.getState()), r.subscribe(() => {
    n(r.getState());
  })), [r]), r.getState();
}, Oy = be(({ runtime: r }) => {
  const n = Fn(r), i = Rl();
  return Ze(() => {
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
}), vs = (r) => {
  const n = pe(() => Object.fromEntries(r), [r]), i = Hf(n, (d) => d, []), a = pe(() => Object.keys(i), [i]);
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
}, rh = be(({ runtime: r }) => {
  const n = Fn(r);
  return At({
    getState: () => n,
    remove: r.remove,
    __internal_getRuntime: () => r
  }, {
    key: n.id
  });
}), zy = be(({ runtime: r, index: n }) => {
  const i = pe(() => r.getAttachmentByIndex(n), [r, n]);
  return Bt(rh({
    runtime: i
  }));
}), sh = be(({ threadIdRef: r, messageIdRef: n, runtime: i }) => {
  const a = Fn(i), u = Rl();
  Ze(() => {
    const p = [], g = [
      "send",
      "attachment-add"
    ];
    for (const _ of g) {
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
  const d = vs(a.attachments.map((p, g) => [
    p.id,
    zy({ runtime: i, index: g })
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
}), Dy = be(({ runtime: r }) => {
  const n = Fn(r);
  return At({
    getState: () => n,
    addToolResult: (a) => r.addToolResult(a),
    resumeToolCall: (a) => r.resumeToolCall(a),
    __internal_getRuntime: () => r
  }, {
    key: n.type === "tool-call" ? `toolCallId-${n.toolCallId}` : void 0
  });
}), Fy = be(({ runtime: r, index: n }) => {
  const i = pe(() => r.getAttachmentByIndex(n), [r, n]);
  return Bt(rh({ runtime: i }));
}), By = be(({ runtime: r, index: n }) => {
  const i = pe(() => r.getMessagePartByIndex(n), [r, n]);
  return Bt(Dy({ runtime: i }));
}), Uy = be(({ runtime: r, threadIdRef: n }) => {
  const i = Fn(r), [a, u] = Ft(!1), [d, h] = Ft(!1), p = pe(() => ({
    get current() {
      return r.getState().id;
    }
  }), [r]), g = Bt(sh({
    runtime: r.composer,
    threadIdRef: n,
    messageIdRef: p
  })), _ = vs(i.content.map((v, R) => [
    "toolCallId" in v && v.toolCallId != null ? `toolCallId-${v.toolCallId}` : `index-${R}`,
    By({ runtime: r, index: R })
  ])), w = vs(i.attachments?.map((v, R) => [
    v.id,
    Fy({ runtime: r, index: R })
  ]) ?? []), C = pe(() => ({
    ...i,
    parts: _.state,
    composer: g.state,
    isCopied: a,
    isHovering: d
  }), [
    i,
    _.state,
    g.state,
    a,
    d
  ]);
  return At({
    getState: () => C,
    composer: g.api,
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
}), $y = be(({ runtime: r, id: n, threadIdRef: i }) => {
  const a = pe(() => r.getMessageById(n), [r, n]);
  return Bt(Uy({ runtime: a, threadIdRef: i }));
}), Hy = be(({ runtime: r }) => {
  const n = Fn(r), i = Rl();
  Ze(() => {
    const p = [], g = [
      "run-start",
      "run-end",
      "initialize",
      "model-context-update"
    ];
    for (const _ of g) {
      const w = r.unstable_on(_, () => {
        const C = r.getState()?.threadId || "unknown";
        i.emit(`thread.${_}`, {
          threadId: C
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
  }), [r]), u = Bt(sh({
    runtime: r.composer,
    threadIdRef: a
  })), d = vs(n.messages.map((p) => [
    p.id,
    $y({ runtime: r, id: p.id, threadIdRef: a })
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
}), Vy = be(({ runtime: r, id: n }) => {
  const i = pe(() => r.getItemById(n), [r, n]);
  return Bt(Oy({
    runtime: i
  }));
}), Wy = be(({ runtime: r, __internal_assistantRuntime: n }) => {
  const i = Fn(r), a = Bt(Hy({
    runtime: r.main
  })), u = vs(Object.keys(i.threadItems).map((h) => [
    h,
    Vy({ runtime: r, id: h })
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
      const { index: p, archived: g = !1 } = h, _ = g ? d.archivedThreadIds[p] : d.threadIds[p];
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
}), Gy = be((r) => {
  const n = Jf();
  return Ze(() => r.registerModelContextProvider(n), [r, n]), Bt(Wy({
    runtime: r.threads,
    __internal_assistantRuntime: r
  }));
}), ul = (r) => {
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
}, Yy = (r = {}) => {
  const n = /* @__PURE__ */ new Set(), i = ul((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        viewport: h
      }
    });
  }), a = ul((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        inset: h
      }
    });
  }), u = ul((h) => {
    d.setState({
      height: {
        ...d.getState().height,
        userMessage: h
      }
    });
  }), d = my(() => ({
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
}, _s = (r) => r, qy = (r) => {
  const n = Nl({ optional: !0 }), [i] = k.useState(() => Yy(r));
  return k.useEffect(() => n?.getState().onScrollToBottom(() => {
    i.getState().scrollToBottom();
  }), [n, i]), k.useEffect(() => {
    if (n)
      return i.subscribe((a) => {
        n.getState().isAtBottom !== a.isAtBottom && _s(n).setState({ isAtBottom: a.isAtBottom });
      });
  }, [i, n]), k.useEffect(() => {
    const a = {
      turnAnchor: r.turnAnchor ?? "bottom"
    };
    i.getState().turnAnchor !== a.turnAnchor && _s(i).setState(a);
  }, [i, r.turnAnchor]), i;
}, ih = ({ children: r, options: n = {} }) => {
  const i = qy(n), [a] = k.useState(() => ({
    useThreadViewport: i
  }));
  return m.jsx(nh.Provider, { value: a, children: r });
}, Qy = (r) => r._core?.RenderComponent, Ky = ({ children: r, runtime: n }) => {
  const i = Mt({
    threads: Gy(n)
  }), a = Qy(n);
  return m.jsxs(no, { api: i, children: [a && m.jsx(a, {}), m.jsx(ih, { children: r })] });
}, Jy = k.memo(Ky), Xy = ({ index: r, children: n }) => {
  const i = Mt(), a = Ml({
    message: Gi({
      source: "thread",
      query: { type: "index", index: r },
      get: () => i.thread().message({ index: r })
    }),
    composer: Gi({
      source: "message",
      query: {},
      get: () => i.thread().message({ index: r }).composer
    }),
    on(u, d) {
      const h = () => i.thread().message({ index: r }), { event: p, scope: g } = eo(u);
      return !cs("composer", g) && !cs("message", g) ? i.on(u, d) : i.on({ scope: "thread", event: p }, (_) => {
        _.messageId === h().getState().id && d(_);
      });
    }
  });
  return m.jsx(no, { api: a, children: n });
}, Zy = ({ index: r, children: n }) => {
  const i = Mt(), a = Ml({
    part: Gi({
      source: "message",
      query: { type: "index", index: r },
      get: () => i.message().part({ index: r })
    })
  });
  return m.jsx(no, { api: a, children: n });
}, ev = be(({ text: r, isRunning: n }) => {
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
}), tv = ({ text: r, isRunning: n = !1, children: i }) => {
  const a = Il(Qf(ev({ text: r, isRunning: n }))), u = Ml({
    part: Gi({
      source: "root",
      query: {},
      get: () => a.getState().api
    }),
    subscribe: a.subscribe
  });
  return m.jsx(no, { api: u, children: i });
};
class nv {
  _core;
  threads;
  get threadList() {
    return this.threads;
  }
  _thread;
  constructor(n) {
    this._core = n, this.threads = new Fg(n.threads), this._thread = this.threads.main, this.__internal_bindMethods();
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
    return this._core.threads.getMainThreadRuntimeCore().import(bl.fromArray(n ?? []));
  }
}
function ro(r) {
  const n = k.useRef(r);
  return k.useEffect(() => {
    n.current = r;
  }), k.useMemo(() => (...i) => n.current?.(...i), []);
}
const rv = k.createContext(null);
function sv(r) {
  const n = k.useContext(rv);
  if (!r?.optional && !n)
    throw new Error("This component must be used within a SmoothContextProvider.");
  return n;
}
const { useSmoothStatus: uS, useSmoothStatusStore: iv } = th(sv, "useSmoothStatus");
class ov {
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
const cl = Object.freeze({
  type: "running"
}), av = (r, n = !1) => {
  const { text: i } = r, a = Se(({ message: w }) => w.id), u = k.useRef(a), [d, h] = k.useState(i), p = iv({ optional: !0 }), g = ro((w) => {
    if (h(w), p) {
      const C = d !== w || r.status.type === "running" ? cl : r.status;
      _s(p).setState(C, !0);
    }
  });
  k.useEffect(() => {
    if (p) {
      const w = n && (d !== i || r.status.type === "running") ? cl : r.status;
      _s(p).setState(w, !0);
    }
  }, [p, n, i, d, r.status]);
  const [_] = k.useState(new ov(i, g));
  return k.useEffect(() => {
    if (!n) {
      _.stop();
      return;
    }
    if (u.current !== a || !i.startsWith(_.targetText)) {
      u.current = a, g(i), _.currentText = i, _.targetText = i, _.stop();
      return;
    }
    _.targetText = i, _.start();
  }, [g, _, a, n, i]), k.useEffect(() => () => {
    _.stop();
  }, [_]), k.useMemo(() => n ? {
    type: "text",
    text: d,
    status: i === d ? r.status : cl
  } : r, [n, d, r, i]);
};
var lv = /* @__PURE__ */ Symbol.for("react.lazy"), Qi = Zm[" use ".trim().toString()];
function uv(r) {
  return typeof r == "object" && r !== null && "then" in r;
}
function oh(r) {
  return r != null && typeof r == "object" && "$$typeof" in r && r.$$typeof === lv && "_payload" in r && uv(r._payload);
}
// @__NO_SIDE_EFFECTS__
function ah(r) {
  const n = /* @__PURE__ */ cv(r), i = k.forwardRef((a, u) => {
    let { children: d, ...h } = a;
    oh(d) && typeof Qi == "function" && (d = Qi(d._payload));
    const p = k.Children.toArray(d), g = p.find(fv);
    if (g) {
      const _ = g.props.children, w = p.map((C) => C === g ? k.Children.count(_) > 1 ? k.Children.only(null) : k.isValidElement(_) ? _.props.children : null : C);
      return /* @__PURE__ */ m.jsx(n, { ...h, ref: u, children: k.isValidElement(_) ? k.cloneElement(_, void 0, w) : null });
    }
    return /* @__PURE__ */ m.jsx(n, { ...h, ref: u, children: d });
  });
  return i.displayName = `${r}.Slot`, i;
}
var lh = /* @__PURE__ */ ah("Slot");
// @__NO_SIDE_EFFECTS__
function cv(r) {
  const n = k.forwardRef((i, a) => {
    let { children: u, ...d } = i;
    if (oh(u) && typeof Qi == "function" && (u = Qi(u._payload)), k.isValidElement(u)) {
      const h = pv(u), p = hv(d, u.props);
      return u.type !== k.Fragment && (p.ref = a ? qf(a, h) : h), k.cloneElement(u, p);
    }
    return k.Children.count(u) > 1 ? k.Children.only(null) : null;
  });
  return n.displayName = `${r}.SlotClone`, n;
}
var dv = /* @__PURE__ */ Symbol("radix.slottable");
function fv(r) {
  return k.isValidElement(r) && typeof r.type == "function" && "__radixId" in r.type && r.type.__radixId === dv;
}
function hv(r, n) {
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
function pv(r) {
  let n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
  return i ? r.ref : (n = Object.getOwnPropertyDescriptor(r, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? r.props.ref : r.props.ref || r.ref);
}
var mv = [
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
], Sr = mv.reduce((r, n) => {
  const i = /* @__PURE__ */ ah(`Primitive.${n}`), a = k.forwardRef((u, d) => {
    const { asChild: h, ...p } = u, g = h ? i : n;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m.jsx(g, { ...p, ref: d });
  });
  return a.displayName = `Primitive.${n}`, { ...r, [n]: a };
}, {});
function hs(r, n, { checkForDefaultPrevented: i = !0 } = {}) {
  return function(u) {
    if (r?.(u), i === !1 || !u.defaultPrevented)
      return n?.(u);
  };
}
const uh = (r, n, i = []) => {
  const a = k.forwardRef((u, d) => {
    const h = {}, p = {};
    Object.keys(u).forEach((_) => {
      i.includes(_) ? h[_] = u[_] : p[_] = u[_];
    });
    const g = n(h) ?? void 0;
    return m.jsx(Sr.button, { type: "button", ...p, ref: d, disabled: p.disabled || !g, onClick: hs(p.onClick, g) });
  });
  return a.displayName = r, a;
};
function gv(r, n = globalThis?.document) {
  const i = ro(r);
  k.useEffect(() => {
    const a = (u) => {
      u.key === "Escape" && i(u);
    };
    return n.addEventListener("keydown", a, { capture: !0 }), () => n.removeEventListener("keydown", a, { capture: !0 });
  }, [i, n]);
}
const ks = (r) => {
  const n = k.useRef(void 0);
  return k.useCallback((a) => {
    n.current && n.current(), a && (n.current = r(a));
  }, [r]);
}, ch = (r, n) => {
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
  return ks(i);
}, tf = k.createContext(!1), nf = (r, n) => {
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
}, dh = ({ children: r, fillClampThreshold: n = "10em", fillClampOffset: i = "6em" }) => {
  const a = Se(
    // only add slack to the last assistant message following a user message (valid turn)
    ({ thread: g, message: _ }) => _.isLast && _.role === "assistant" && _.index >= 1 && g.messages.at(_.index - 1)?.role === "user"
  ), u = Nl({ optional: !0 }), d = k.useContext(tf), h = k.useCallback((g) => {
    if (!u || d)
      return;
    const _ = () => {
      const w = u.getState();
      if (w.turnAnchor === "top" && a) {
        const { viewport: C, inset: v, userMessage: R } = w.height, j = nf(n, g), M = nf(i, g), B = R <= j ? R : M, Y = Math.max(0, C - v - B);
        g.style.minHeight = `${Y}px`, g.style.flexShrink = "0", g.style.transition = "min-height 0s";
      } else
        g.style.minHeight = "", g.style.flexShrink = "", g.style.transition = "";
    };
    return _(), u.subscribe(_);
  }, [
    u,
    a,
    d,
    n,
    i
  ]), p = ks(h);
  return m.jsx(tf.Provider, { value: !0, children: m.jsx(lh, { ref: p, children: r }) });
};
dh.displayName = "ThreadPrimitive.ViewportSlack";
const yv = () => {
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
  return ks(i);
}, vv = () => {
  const r = qi((u) => u.turnAnchor), n = qi((u) => u.registerUserMessageHeight), i = Se(({ thread: u, message: d }) => r === "top" && d.role === "user" && d.index === u.messages.length - 2 && u.messages.at(-1)?.role === "assistant"), a = k.useCallback((u) => u.offsetHeight, []);
  return ch(i ? n : null, a);
}, Pl = k.forwardRef((r, n) => {
  const i = yv(), a = vv(), u = to(n, i, a);
  return m.jsx(dh, { children: m.jsx(Sr.div, { ...r, ref: u }) });
});
Pl.displayName = "MessagePrimitive.Root";
const _v = () => Se(({ part: n }) => {
  if (n.type !== "text" && n.type !== "reasoning")
    throw new Error("MessagePartText can only be used inside text or reasoning message parts.");
  return n;
}), fh = k.forwardRef(({ smooth: r = !0, component: n = "span", ...i }, a) => {
  const { text: u, status: d } = av(_v(), r);
  return m.jsx(n, { "data-status": d.type, ...i, ref: a, children: u });
});
fh.displayName = "MessagePartPrimitive.Text";
const wv = () => Se(({ part: n }) => {
  if (n.type !== "image")
    throw new Error("MessagePartImage can only be used inside image message parts.");
  return n;
}), hh = k.forwardRef((r, n) => {
  const { image: i } = wv();
  return m.jsx(Sr.img, { src: i, ...r, ref: n });
});
hh.displayName = "MessagePartPrimitive.Image";
const ph = ({ children: r }) => Se(({ part: i }) => i.status.type === "running") ? r : null;
ph.displayName = "MessagePartPrimitive.InProgress";
const rf = (r) => Symbol.iterator in r, sf = (r) => (
  // HACK: avoid checking entries type
  "entries" in r
), of = (r, n) => {
  const i = r instanceof Map ? r : new Map(r.entries()), a = n instanceof Map ? n : new Map(n.entries());
  if (i.size !== a.size)
    return !1;
  for (const [u, d] of i)
    if (!a.has(u) || !Object.is(d, a.get(u)))
      return !1;
  return !0;
}, Sv = (r, n) => {
  const i = r[Symbol.iterator](), a = n[Symbol.iterator]();
  let u = i.next(), d = a.next();
  for (; !u.done && !d.done; ) {
    if (!Object.is(u.value, d.value))
      return !1;
    u = i.next(), d = a.next();
  }
  return !!u.done && !!d.done;
};
function xv(r, n) {
  return Object.is(r, n) ? !0 : typeof r != "object" || r === null || typeof n != "object" || n === null || Object.getPrototypeOf(r) !== Object.getPrototypeOf(n) ? !1 : rf(r) && rf(n) ? sf(r) && sf(n) ? of(r, n) : Sv(r, n) : of(
    { entries: () => Object.entries(r) },
    { entries: () => Object.entries(n) }
  );
}
function Ev(r) {
  const n = Tt.useRef(void 0);
  return (i) => {
    const a = r(i);
    return xv(n.current, a) ? n.current : n.current = a;
  };
}
const af = (r) => {
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
}, kv = (r) => {
  const n = [], i = af("toolGroup"), a = af("reasoningGroup");
  for (let u = 0; u < r.length; u++) {
    const d = r[u];
    d === "tool-call" ? (a.endGroup(u - 1, n), i.startGroup(u)) : d === "reasoning" ? (i.endGroup(u - 1, n), a.startGroup(u)) : (i.endGroup(u - 1, n), a.endGroup(u - 1, n), n.push({ type: "single", index: u }));
  }
  return i.finalize(r.length - 1, n), a.finalize(r.length - 1, n), n;
}, bv = () => {
  const r = Se(Ev((n) => n.message.parts.map((i) => i.type)));
  return k.useMemo(() => r.length === 0 ? [] : kv(r), [r]);
}, Cv = ({ Fallback: r, ...n }) => {
  const i = Se(({ tools: a }) => {
    const u = a.tools[n.toolName] ?? r;
    return Array.isArray(u) ? u[0] ?? r : u;
  });
  return i ? m.jsx(i, { ...n }) : null;
}, Jt = {
  Text: () => m.jsxs("p", { style: { whiteSpace: "pre-line" }, children: [m.jsx(fh, {}), m.jsx(ph, { children: m.jsx("span", { style: { fontFamily: "revert" }, children: " ●" }) })] }),
  Reasoning: () => null,
  Source: () => null,
  Image: () => m.jsx(hh, {}),
  File: () => null,
  Unstable_Audio: () => null,
  ToolGroup: ({ children: r }) => r,
  ReasoningGroup: ({ children: r }) => r
}, Tv = ({ components: { Text: r = Jt.Text, Reasoning: n = Jt.Reasoning, Image: i = Jt.Image, Source: a = Jt.Source, File: u = Jt.File, Unstable_Audio: d = Jt.Unstable_Audio, tools: h = {} } = {} }) => {
  const p = Mt(), g = Se(({ part: w }) => w), _ = g.type;
  if (_ === "tool-call") {
    const w = p.part().addToolResult, C = p.part().resumeToolCall;
    if ("Override" in h)
      return m.jsx(h.Override, { ...g, addResult: w, resume: C });
    const v = h.by_name?.[g.toolName] ?? h.Fallback;
    return m.jsx(Cv, { ...g, Fallback: v, addResult: w, resume: C });
  }
  if (g.status?.type === "requires-action")
    throw new Error("Encountered unexpected requires-action status");
  switch (_) {
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
      const w = _;
      throw new Error(`Unknown message part type: ${w}`);
  }
}, $i = k.memo(({ index: r, components: n }) => m.jsx(Zy, { index: r, children: m.jsx(Tv, { components: n }) }), (r, n) => r.index === n.index && r.components?.Text === n.components?.Text && r.components?.Reasoning === n.components?.Reasoning && r.components?.Source === n.components?.Source && r.components?.Image === n.components?.Image && r.components?.File === n.components?.File && r.components?.Unstable_Audio === n.components?.Unstable_Audio && r.components?.tools === n.components?.tools && r.components?.ToolGroup === n.components?.ToolGroup && r.components?.ReasoningGroup === n.components?.ReasoningGroup);
$i.displayName = "MessagePrimitive.PartByIndex";
const Iv = ({ status: r, component: n }) => m.jsx(tv, { text: "", isRunning: r.type === "running", children: m.jsx(n, { type: "text", text: "", status: r }) }), Rv = Object.freeze({
  type: "complete"
}), Av = ({ components: r }) => {
  const n = Se((i) => i.message.status ?? Rv);
  return r?.Empty ? m.jsx(r.Empty, { status: n }) : m.jsx(Iv, { status: n, component: r?.Text ?? Jt.Text });
}, Mv = k.memo(Av, (r, n) => r.components?.Empty === n.components?.Empty && r.components?.Text === n.components?.Text), jl = ({ components: r }) => {
  const n = Se(({ message: u }) => u.parts.length), i = bv(), a = k.useMemo(() => n === 0 ? m.jsx(Mv, { components: r }) : i.map((u) => {
    if (u.type === "single")
      return m.jsx($i, { index: u.index, components: r }, u.index);
    if (u.type === "toolGroup") {
      const d = r?.ToolGroup ?? Jt.ToolGroup;
      return m.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => m.jsx($i, { index: u.startIndex + p, components: r }, p)) }, `tool-${u.startIndex}`);
    } else {
      const d = r?.ReasoningGroup ?? Jt.ReasoningGroup;
      return m.jsx(d, { startIndex: u.startIndex, endIndex: u.endIndex, children: Array.from({ length: u.endIndex - u.startIndex + 1 }, (h, p) => m.jsx($i, { index: u.startIndex + p, components: r }, p)) }, `reasoning-${u.startIndex}`);
    }
  }), [i, r, n]);
  return m.jsx(m.Fragment, { children: a });
};
jl.displayName = "MessagePrimitive.Parts";
const mh = ({ children: r }) => Se(({ message: i }) => i.status?.type === "incomplete" && i.status.reason === "error") ? r : null;
mh.displayName = "MessagePrimitive.Error";
const gh = () => {
  const r = Mt(), n = Se((a) => a.thread.isRunning || !a.composer.isEditing || a.composer.isEmpty), i = k.useCallback(() => {
    r.composer().send();
  }, [r]);
  return n ? null : i;
}, Nv = uh("ComposerPrimitive.Send", gh), yh = k.forwardRef(({ onSubmit: r, ...n }, i) => {
  const a = gh(), u = (d) => {
    d.preventDefault(), a && a();
  };
  return m.jsx(Sr.form, { ...n, ref: i, onSubmit: hs(r, u) });
});
yh.displayName = "ComposerPrimitive.Root";
function gl() {
  return gl = Object.assign ? Object.assign.bind() : function(r) {
    for (var n = 1; n < arguments.length; n++) {
      var i = arguments[n];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (r[a] = i[a]);
    }
    return r;
  }, gl.apply(null, arguments);
}
function Pv(r, n) {
  if (r == null) return {};
  var i = {};
  for (var a in r) if ({}.hasOwnProperty.call(r, a)) {
    if (n.indexOf(a) !== -1) continue;
    i[a] = r[a];
  }
  return i;
}
var jv = k.useLayoutEffect, Lv = function(n) {
  var i = Tt.useRef(n);
  return jv(function() {
    i.current = n;
  }), i;
}, lf = function(n, i) {
  if (typeof n == "function") {
    n(i);
    return;
  }
  n.current = i;
}, Ov = function(n, i) {
  var a = Tt.useRef();
  return Tt.useCallback(function(u) {
    n.current = u, a.current && lf(a.current, null), a.current = i, i && lf(i, u);
  }, [i]);
}, uf = {
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
}, zv = function(n) {
  Object.keys(uf).forEach(function(i) {
    n.style.setProperty(i, uf[i], "important");
  });
}, cf = zv, Xe = null, df = function(n, i) {
  var a = n.scrollHeight;
  return i.sizingStyle.boxSizing === "border-box" ? a + i.borderSize : a - i.paddingSize;
};
function Dv(r, n, i, a) {
  i === void 0 && (i = 1), a === void 0 && (a = 1 / 0), Xe || (Xe = document.createElement("textarea"), Xe.setAttribute("tabindex", "-1"), Xe.setAttribute("aria-hidden", "true"), cf(Xe)), Xe.parentNode === null && document.body.appendChild(Xe);
  var u = r.paddingSize, d = r.borderSize, h = r.sizingStyle, p = h.boxSizing;
  Object.keys(h).forEach(function(v) {
    var R = v;
    Xe.style[R] = h[R];
  }), cf(Xe), Xe.value = n;
  var g = df(Xe, r);
  Xe.value = n, g = df(Xe, r), Xe.value = "x";
  var _ = Xe.scrollHeight - u, w = _ * i;
  p === "border-box" && (w = w + u + d), g = Math.max(w, g);
  var C = _ * a;
  return p === "border-box" && (C = C + u + d), g = Math.min(C, g), [g, _];
}
var ff = function() {
}, Fv = function(n, i) {
  return n.reduce(function(a, u) {
    return a[u] = i[u], a;
  }, {});
}, Bv = [
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
], Uv = !!document.documentElement.currentStyle, $v = function(n) {
  var i = window.getComputedStyle(n);
  if (i === null)
    return null;
  var a = Fv(Bv, i), u = a.boxSizing;
  if (u === "")
    return null;
  Uv && u === "border-box" && (a.width = parseFloat(a.width) + parseFloat(a.borderRightWidth) + parseFloat(a.borderLeftWidth) + parseFloat(a.paddingRight) + parseFloat(a.paddingLeft) + "px");
  var d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop), h = parseFloat(a.borderBottomWidth) + parseFloat(a.borderTopWidth);
  return {
    sizingStyle: a,
    paddingSize: d,
    borderSize: h
  };
}, Hv = $v;
function Ll(r, n, i) {
  var a = Lv(i);
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
var Vv = function(n, i) {
  Ll(document.body, "reset", function(a) {
    n.current.form === a.target && i(a);
  });
}, Wv = function(n) {
  Ll(window, "resize", n);
}, Gv = function(n) {
  Ll(document.fonts, "loadingdone", n);
}, Yv = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], qv = function(n, i) {
  var a = n.cacheMeasurements, u = n.maxRows, d = n.minRows, h = n.onChange, p = h === void 0 ? ff : h, g = n.onHeightChange, _ = g === void 0 ? ff : g, w = Pv(n, Yv), C = w.value !== void 0, v = k.useRef(null), R = Ov(v, i), j = k.useRef(0), M = k.useRef(), B = function() {
    var Z = v.current, ne = a && M.current ? M.current : Hv(Z);
    if (ne) {
      M.current = ne;
      var q = Dv(ne, Z.value || Z.placeholder || "x", d, u), ae = q[0], ie = q[1];
      j.current !== ae && (j.current = ae, Z.style.setProperty("height", ae + "px", "important"), _(ae, {
        rowHeight: ie
      }));
    }
  }, Y = function(Z) {
    C || B(), p(Z);
  };
  return k.useLayoutEffect(B), Vv(v, function() {
    if (!C) {
      var re = v.current.value;
      requestAnimationFrame(function() {
        var Z = v.current;
        Z && re !== Z.value && B();
      });
    }
  }), Wv(B), Gv(B), /* @__PURE__ */ k.createElement("textarea", gl({}, w, {
    onChange: Y,
    ref: R
  }));
}, Qv = /* @__PURE__ */ k.forwardRef(qv);
const vh = (r) => {
  const n = ro(r), i = qi((a) => a.onScrollToBottom);
  k.useEffect(() => i(n), [i, n]);
}, _h = k.forwardRef(({ autoFocus: r = !1, asChild: n, disabled: i, onChange: a, onKeyDown: u, onPaste: d, submitOnEnter: h = !0, cancelOnEscape: p = !0, unstable_focusOnRunStart: g = !0, unstable_focusOnScrollToBottom: _ = !0, unstable_focusOnThreadSwitched: w = !0, addAttachmentOnPaste: C = !0, ...v }, R) => {
  const j = Mt(), M = Se(({ composer: X }) => X.isEditing ? X.text : ""), B = n ? lh : Qv, Y = Se(({ thread: X, composer: ye }) => X.isDisabled || ye.dictation?.inputDisabled) || i, re = k.useRef(null), Z = to(R, re);
  gv((X) => {
    if (!p || !re.current?.contains(X.target))
      return;
    const ye = j.composer();
    ye.getState().canCancel && (ye.cancel(), X.preventDefault());
  });
  const ne = (X) => {
    Y || !h || X.nativeEvent.isComposing || X.key === "Enter" && X.shiftKey === !1 && (j.thread().getState().isRunning || (X.preventDefault(), re.current?.closest("form")?.requestSubmit()));
  }, q = async (X) => {
    if (!C)
      return;
    const ye = j.thread().getState().capabilities, De = Array.from(X.clipboardData?.files || []);
    if (ye.attachments && De.length > 0)
      try {
        X.preventDefault(), await Promise.all(De.map((Ne) => j.composer().addAttachment(Ne)));
      } catch (Ne) {
        console.error("Error adding attachment:", Ne);
      }
  }, ae = r && !Y, ie = k.useCallback(() => {
    const X = re.current;
    !X || !ae || (X.focus({ preventScroll: !0 }), X.setSelectionRange(X.value.length, X.value.length));
  }, [ae]);
  return k.useEffect(() => ie(), [ie]), vh(() => {
    j.composer().getState().type === "thread" && _ && ie();
  }), k.useEffect(() => {
    if (!(j.composer().getState().type !== "thread" || !g))
      return j.on("thread.run-start", ie);
  }, [g, ie, j]), k.useEffect(() => {
    if (!(j.composer().getState().type !== "thread" || !w))
      return j.on("thread-list-item.switched-to", ie);
  }, [w, ie, j]), m.jsx(B, { name: "input", value: M, ...v, ref: Z, disabled: Y, onChange: hs(a, (X) => {
    j.composer().getState().isEditing && ml(() => {
      j.composer().setText(X.target.value);
    });
  }), onKeyDown: hs(u, ne), onPaste: hs(d, q) });
});
_h.displayName = "ComposerPrimitive.Input";
const Kv = () => {
  const r = Mt(), n = Se(({ composer: a }) => !a.canCancel), i = k.useCallback(() => {
    r.composer().cancel();
  }, [r]);
  return n ? null : i;
}, Jv = uh("ComposerPrimitive.Cancel", Kv), wh = k.forwardRef((r, n) => m.jsx(Sr.div, { ...r, ref: n }));
wh.displayName = "ThreadPrimitive.Root";
const Xv = (r) => Se(({ thread: n }) => !(r.empty === !0 && !n.isEmpty || r.empty === !1 && n.isEmpty || r.running === !0 && !n.isRunning || r.running === !1 && n.isRunning || r.disabled === !0 && !n.isDisabled || r.disabled === !1 && n.isDisabled)), yl = ({ children: r, ...n }) => Xv(n) ? r : null;
yl.displayName = "ThreadPrimitive.If";
const Zv = (r) => {
  const n = ro(r), i = k.useCallback((a) => {
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
  return ks(i);
}, e_ = ({ autoScroll: r, scrollToBottomOnRunStart: n = !0, scrollToBottomOnInitialize: i = !0, scrollToBottomOnThreadSwitch: a = !0 }) => {
  const u = k.useRef(null), d = Nl();
  r === void 0 && (r = d.getState().turnAnchor !== "top");
  const h = k.useRef(0), p = k.useRef(null), g = k.useCallback((R) => {
    const j = u.current;
    j && (p.current = R, j.scrollTo({ top: j.scrollHeight, behavior: R }));
  }, []), _ = () => {
    const R = u.current;
    if (!R)
      return;
    const j = d.getState().isAtBottom, M = Math.abs(R.scrollHeight - R.scrollTop - R.clientHeight) < 1 || R.scrollHeight <= R.clientHeight;
    !M && h.current < R.scrollTop || (M && (p.current = null), (M || p.current === null) && M !== j && _s(d).setState({
      isAtBottom: M
    })), h.current = R.scrollTop;
  }, w = Zv(() => {
    const R = p.current;
    R ? g(R) : r && d.getState().isAtBottom && g("instant"), _();
  }), C = ks((R) => (R.addEventListener("scroll", _), () => {
    R.removeEventListener("scroll", _);
  }));
  return vh(({ behavior: R }) => {
    g(R);
  }), ll("thread.run-start", () => {
    n && (p.current = "auto", requestAnimationFrame(() => {
      g("auto");
    }));
  }), ll("thread.initialize", () => {
    i && (p.current = "instant", requestAnimationFrame(() => {
      g("instant");
    }));
  }), ll("thread-list-item.switched-to", () => {
    a && (p.current = "instant", requestAnimationFrame(() => {
      g("instant");
    }));
  }), to(w, C, u);
}, t_ = () => {
  const r = qi((i) => i.registerViewport), n = k.useCallback((i) => i.clientHeight, []);
  return ch(r, n);
}, Sh = k.forwardRef(({ autoScroll: r, scrollToBottomOnRunStart: n, scrollToBottomOnInitialize: i, scrollToBottomOnThreadSwitch: a, children: u, ...d }, h) => {
  const p = e_({
    autoScroll: r,
    scrollToBottomOnRunStart: n,
    scrollToBottomOnInitialize: i,
    scrollToBottomOnThreadSwitch: a
  }), g = t_(), _ = to(h, p, g);
  return m.jsx(Sr.div, { ...d, ref: _, children: u });
});
Sh.displayName = "ThreadPrimitive.ViewportScrollable";
const xh = k.forwardRef(({ turnAnchor: r, ...n }, i) => m.jsx(ih, { options: { turnAnchor: r }, children: m.jsx(Sh, { ...n, ref: i }) }));
xh.displayName = "ThreadPrimitive.Viewport";
const Eh = (r, n) => r.Message === n.Message && r.EditComposer === n.EditComposer && r.UserEditComposer === n.UserEditComposer && r.AssistantEditComposer === n.AssistantEditComposer && r.SystemEditComposer === n.SystemEditComposer && r.UserMessage === n.UserMessage && r.AssistantMessage === n.AssistantMessage && r.SystemMessage === n.SystemMessage, n_ = () => null, r_ = (r, n, i) => {
  switch (n) {
    case "user":
      return i ? r.UserEditComposer ?? r.EditComposer ?? r.UserMessage ?? r.Message : r.UserMessage ?? r.Message;
    case "assistant":
      return i ? r.AssistantEditComposer ?? r.EditComposer ?? r.AssistantMessage ?? r.Message : r.AssistantMessage ?? r.Message;
    case "system":
      return i ? r.SystemEditComposer ?? r.EditComposer ?? r.SystemMessage ?? r.Message : r.SystemMessage ?? n_;
    default:
      const a = n;
      throw new Error(`Unknown message role: ${a}`);
  }
}, s_ = ({ components: r }) => {
  const n = Se(({ message: u }) => u.role), i = Se(({ message: u }) => u.composer.isEditing), a = r_(r, n, i);
  return m.jsx(a, {});
}, kh = k.memo(({ index: r, components: n }) => m.jsx(Xy, { index: r, children: m.jsx(s_, { components: n }) }), (r, n) => r.index === n.index && Eh(r.components, n.components));
kh.displayName = "ThreadPrimitive.MessageByIndex";
const bh = ({ components: r }) => {
  const n = Se(({ thread: a }) => a.messages.length);
  return k.useMemo(() => n === 0 ? null : Array.from({ length: n }, (a, u) => m.jsx(kh, { index: u, components: r }, u)), [n, r]);
};
bh.displayName = "ThreadPrimitive.Messages";
const i_ = k.memo(bh, (r, n) => Eh(r.components, n.components)), o_ = 1, vt = Object.freeze({
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
}), a_ = Object.freeze(
  Object.fromEntries(
    Object.entries(ct).map(([r, n]) => [n, r])
  )
), Ch = () => /```askcrystal-ui\s*([\s\S]*?)```/gi, Th = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi, l_ = Object.freeze([
  { marker: "```askcrystal-ui", minPrefixLength: 3 },
  { marker: "<askcrystal-ui>", minPrefixLength: 4 }
]), Xt = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Ie = (r, n = "") => typeof r != "string" ? n : r.trim() || n, Te = (r) => Ie(r) || null, ws = (r) => {
  const n = Ie(r);
  return n ? /^(https?:\/\/|\/)/i.test(n) ? n : `/${n.replace(/^\/+/, "")}` : null;
}, u_ = (r, n = !0) => typeof r == "boolean" ? r : n, Ol = (r, n = 6) => Array.isArray(r) ? r.map((i) => Ie(typeof i == "string" ? i : i?.label || i?.title || i?.text)).filter(Boolean).slice(0, n) : [], Ih = (r) => {
  if (!Xt(r))
    return null;
  const n = Ie(r.title, "Untitled crystal"), i = ws(r.url);
  return {
    id: Te(r.id || r.productId),
    handle: Te(r.handle),
    title: n,
    url: i || (r.handle ? `/products/${r.handle}` : null),
    image: ws(r.image || r.featuredImage || r.imageUrl),
    price: Te(r.price || r.priceText),
    compareAtPrice: Te(r.compareAtPrice || r.compareAt),
    badge: Te(r.badge || r.tag || r.intent || r.eyebrow),
    summary: Te(r.summary || r.description || r.body),
    reason: Te(r.reason),
    note: Te(r.note || r.ritual || r.howToUse || r.how_to_use),
    ctaLabel: Te(r.ctaLabel || r.buttonLabel || r.linkLabel),
    merchandiseId: Te(r.merchandiseId || r.variantId),
    variantId: Te(r.variantId || r.merchandiseId),
    available: u_(r.available, !0)
  };
}, Rh = (r, n = 6) => Array.isArray(r) ? r.map(Ih).filter(Boolean).slice(0, n) : [], c_ = (r) => {
  if (!Xt(r))
    return null;
  const n = Ih(r.product || r);
  return n ? {
    eyebrow: Ie(r.eyebrow || r.kicker || r.intent, "Prescription"),
    reason: Te(r.reason || n.reason),
    note: Te(r.note || r.ritual || n.note),
    ctaLabel: Ie(r.ctaLabel || r.buttonLabel || n.ctaLabel, "View crystal"),
    product: n
  } : null;
}, d_ = (r) => {
  if (!Xt(r))
    return null;
  const n = Rh(r.products, 8);
  return n.length === 0 ? null : {
    eyebrow: Ie(r.eyebrow || r.kicker, "Matched for you"),
    title: Ie(r.title, "Recommended crystals"),
    reason: Te(r.reason || r.description),
    browseUrl: ws(r.browseUrl || r.url),
    browseLabel: Ie(r.browseLabel || r.ctaLabel, "Browse all"),
    products: n
  };
}, f_ = (r) => {
  if (!Xt(r))
    return null;
  const n = Ol(r.steps, 6);
  return n.length === 0 && !Ie(r.summary) ? null : {
    eyebrow: Ie(r.eyebrow || r.kicker, "Ritual"),
    title: Ie(r.title, "How to work with this energy"),
    summary: Te(r.summary || r.reason || r.description),
    duration: Te(r.duration),
    steps: n,
    note: Te(r.note),
    disclaimer: Te(r.disclaimer),
    linkedProducts: Rh(r.linkedProducts || r.products, 3)
  };
}, h_ = (r) => {
  if (!Xt(r))
    return null;
  const n = Ie(r.summary || r.description);
  return n ? {
    eyebrow: Ie(r.eyebrow || r.kicker, "Energy blueprint"),
    title: Ie(r.title, "What your energy is asking for"),
    summary: n,
    energyFocus: Te(r.energyFocus || r.energy || r.focus),
    highlights: Ol(r.highlights || r.bullets || r.keyPoints, 5),
    disclaimer: Te(r.disclaimer)
  } : null;
}, p_ = (r) => {
  if (!Xt(r))
    return null;
  const n = ws(r.url || r.browseUrl);
  return n ? {
    eyebrow: Ie(r.eyebrow || r.kicker, "Browse deeper"),
    title: Ie(r.title, "Open the full collection"),
    description: Te(r.description || r.reason),
    url: n,
    label: Ie(r.label || r.ctaLabel, "Shop collection"),
    image: ws(r.image || r.imageUrl)
  } : null;
}, m_ = (r) => {
  if (!Xt(r))
    return null;
  const n = Ol(r.steps, 5);
  return n.length === 0 ? null : {
    eyebrow: Ie(r.eyebrow || r.kicker, "Next steps"),
    title: Ie(r.title, "What to do next"),
    steps: n,
    closing: Te(r.closing || r.note)
  };
}, g_ = Object.freeze({
  [vt.product_card]: {
    toolName: ct.product_card,
    normalizeProps: c_
  },
  [vt.product_carousel]: {
    toolName: ct.product_carousel,
    normalizeProps: d_
  },
  [vt.ritual_card]: {
    toolName: ct.ritual_card,
    normalizeProps: f_
  },
  [vt.reading_summary]: {
    toolName: ct.reading_summary,
    normalizeProps: h_
  },
  [vt.collection_link]: {
    toolName: ct.collection_link,
    normalizeProps: p_
  },
  [vt.next_steps]: {
    toolName: ct.next_steps,
    normalizeProps: m_
  }
}), Ss = (r, n = "component") => {
  if (!Xt(r))
    return null;
  const i = Ie(
    r.component || r.componentType || a_[r.toolName]
  ), a = g_[i];
  if (!a)
    return null;
  const u = a.normalizeProps(
    r.props || r.result?.props || r.result || r.args?.props || r.args || r
  );
  if (!u)
    return null;
  const d = Ie(r.id || r.toolCallId, `${a.toolName}-${n}`);
  return {
    type: "component",
    component: i,
    toolName: a.toolName,
    id: d,
    version: o_,
    props: u
  };
}, Dn = (r = [], n = []) => {
  const i = /* @__PURE__ */ new Map();
  for (const a of [...r, ...n]) {
    const u = Ss(a, i.size);
    if (!u)
      continue;
    const d = `${u.toolName}:${u.id}`;
    i.set(d, u);
  }
  return [...i.values()];
}, zl = (r) => {
  const n = [], i = (a, u = 0) => {
    if (u > 3 || a == null)
      return;
    if (Array.isArray(a)) {
      a.forEach((h, p) => {
        const g = Ss(h, `${u}-${p}`);
        g && n.push(g);
      });
      return;
    }
    const d = Ss(a, `${u}`);
    if (d) {
      n.push(d);
      return;
    }
    Xt(a) && (i(a.components, u + 1), i(a.component, u + 1), i(a.ui?.components, u + 1), i(a.payload?.components, u + 1), i(a.data?.components, u + 1), i(a.data?.ui?.components, u + 1), i(a.metadata?.components, u + 1), i(a.metadata?.ui?.components, u + 1));
  };
  return i(r), Dn([], n);
}, hf = (r, n = "component") => {
  const i = Ss(r, n);
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
}, y_ = (r) => Ss(r), Ah = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return null;
  }
}, v_ = (r = "") => {
  let n = String(r || "");
  const i = [], a = (u) => {
    const d = [...n.matchAll(u)];
    if (d.length !== 0) {
      for (const h of d) {
        const p = Ah(h[1]);
        p && i.push(p);
      }
      n = n.replace(u, "").trim();
    }
  };
  return a(Ch()), a(Th()), {
    answer: n.replace(/\n{3,}/g, `

`).trim(),
    payloads: i
  };
}, __ = (r = "") => {
  const n = String(r || ""), i = [], a = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi;
  let u = 0, d;
  for (; (d = a.exec(n)) !== null; ) {
    d.index > u && i.push({
      type: "text",
      value: n.slice(u, d.index)
    });
    const h = d[0], p = Ah(d[1] || d[2] || "");
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
}, Mh = (r = "") => {
  const { answer: n, payloads: i } = v_(r);
  let a = [];
  for (const u of i)
    a = Dn(a, zl(u));
  return {
    answer: n,
    components: a
  };
}, w_ = (r = "") => {
  const n = String(r || "").toLowerCase();
  for (let i = 0; i < n.length; i += 1)
    for (const { marker: a, minPrefixLength: u } of l_) {
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
}, S_ = (r = "") => {
  const n = Ch(), i = Th();
  let a = String(r || "").replace(n, "").replace(i, "");
  const u = w_(a);
  return u !== -1 && (a = a.slice(0, u)), a.trimEnd();
}, x_ = "section-rendering-askcrystal-chat-product-card", Ki = /* @__PURE__ */ new Map(), Fi = /* @__PURE__ */ new Map(), E_ = {
  "--product-card-gap": "12px",
  "--product-card-alignment": "stretch",
  "--padding-block-start": "0px",
  "--padding-block-end": "0px",
  "--padding-inline-start": "0px",
  "--padding-inline-end": "0px"
};
function Bn(r) {
  return y_({
    toolName: r.toolName,
    result: r.result,
    args: r.args,
    toolCallId: r.toolCallId
  });
}
function k_(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n)
    return null;
  if (/^\d+$/.test(n))
    return n;
  const i = n.match(/\/(\d+)(?:\?.*)?$/);
  return i ? i[1] : null;
}
function b_(r) {
  if (!r?.handle || typeof window > "u")
    return null;
  const n = typeof window.Shopify?.routes?.root == "string" ? window.Shopify.routes.root : "/", i = new URL(`products/${r.handle}`, new URL(n, window.location.origin));
  i.searchParams.set("section_id", x_), i.searchParams.set("askcrystal_handle", r.handle);
  const a = k_(r?.variantId || r?.merchandiseId);
  return a && i.searchParams.set("variant", a), i.toString();
}
function C_(r) {
  const n = typeof r?.url == "string" ? r.url.trim() : "";
  if (n)
    return n;
  const i = typeof r?.handle == "string" ? r.handle.trim() : "";
  return i ? `/products/${i}` : null;
}
function T_(r) {
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
function I_(r) {
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
function R_(r) {
  if (!r)
    return !1;
  const n = !!r.querySelector("a[href]"), i = !!r.querySelector("img, .askcrystal-chat-product-card__placeholder");
  return n && i;
}
function A_(r) {
  const i = new DOMParser().parseFromString(r, "text/html").querySelector("[data-askcrystal-native-product-card]");
  return R_(i) ? i.outerHTML.trim() : null;
}
async function M_(r) {
  if (!r)
    throw new Error("Missing product card request URL");
  const n = Ki.get(r);
  if (n)
    return n;
  if (!Fi.has(r)) {
    const i = fetch(r, {
      headers: {
        accept: "text/html"
      },
      credentials: "same-origin"
    }).then(async (a) => {
      if (!a.ok)
        throw new Error(`Failed to load native product card (${a.status})`);
      const u = await a.text(), d = A_(u);
      if (!d)
        throw new Error("Native product card markup was not found in the section response");
      return Ki.set(r, d), d;
    }).finally(() => {
      Fi.delete(r);
    });
    Fi.set(r, i);
  }
  return Fi.get(r);
}
function bs({ eyebrow: r, title: n, children: i, className: a = "" }) {
  return /* @__PURE__ */ m.jsxs("section", { className: `ac-tool ${a}`.trim(), children: [
    /* @__PURE__ */ m.jsxs("header", { className: "ac-tool__header", children: [
      r ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__eyebrow", children: r }) : null,
      n ? /* @__PURE__ */ m.jsx("h3", { className: "ac-tool__title", children: n }) : null
    ] }),
    i
  ] });
}
function N_({ image: r, title: n, compact: i = !1 }) {
  return /* @__PURE__ */ m.jsx("div", { className: `ac-tool-product__media${i ? " ac-tool-product__media--compact" : ""}`, children: r ? /* @__PURE__ */ m.jsx("img", { src: r, alt: n, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "ac-tool-product__placeholder", children: "Crystal" }) });
}
function P_({ product: r, ctaLabel: n }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-product__meta", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-product__price-group", children: [
      r.price ? /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product__price", children: r.price }) : null,
      r.compareAtPrice ? /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product__compare", children: r.compareAtPrice }) : null
    ] }),
    /* @__PURE__ */ m.jsx("span", { className: "ac-tool-product__cta", children: n || "View crystal" })
  ] });
}
function j_({ product: r, ctaLabel: n }) {
  const i = C_(r), a = T_(r), u = I_(r), d = n || "View", h = a ? /* @__PURE__ */ m.jsx("img", { className: "askcrystal-chat-product-card__image", src: a, alt: u, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__placeholder", children: "Crystal" }), p = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
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
              style: E_,
              children: i ? /* @__PURE__ */ m.jsx("a", { className: "askcrystal-chat-product-card__surface", href: i, children: p }) : /* @__PURE__ */ m.jsx("div", { className: "askcrystal-chat-product-card__surface", children: p })
            }
          )
        }
      )
    }
  );
}
function L_({ product: r, ctaLabel: n }) {
  const i = b_(r), [a, u] = k.useState(() => i && Ki.get(i) || null), [d, h] = k.useState(null);
  return k.useEffect(() => {
    let p = !0;
    if (!i)
      return k.startTransition(() => {
        u(null), h(new Error("Missing product card request URL"));
      }), () => {
        p = !1;
      };
    const g = Ki.get(i);
    return g ? (k.startTransition(() => {
      u(g), h(null);
    }), () => {
      p = !1;
    }) : (k.startTransition(() => {
      u(null), h(null);
    }), M_(i).then((_) => {
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
      children: /* @__PURE__ */ m.jsx(j_, { product: r, ctaLabel: n })
    }
  );
}
function O_(r) {
  const n = Bn(r);
  if (!n)
    return null;
  const { ctaLabel: i, product: a } = n.props;
  return /* @__PURE__ */ m.jsx("section", { className: "ac-tool-product-block", children: /* @__PURE__ */ m.jsx(L_, { product: a, ctaLabel: i }) });
}
function z_(r) {
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
  return /* @__PURE__ */ m.jsxs(bs, { eyebrow: i, title: a, className: "ac-tool--carousel", children: [
    u ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    /* @__PURE__ */ m.jsx("div", { className: "ac-tool-carousel", role: "list", "aria-label": a, children: p.map((g, _) => {
      const w = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsx(N_, { image: g.image, title: g.title, compact: !0 }),
        /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-carousel__copy", children: [
          g.badge ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product__badge", children: g.badge }) : null,
          /* @__PURE__ */ m.jsx("h4", { className: "ac-tool-product__title", children: g.title }),
          g.reason || g.summary ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool-product__summary", children: g.reason || g.summary }) : null,
          /* @__PURE__ */ m.jsx(P_, { product: g, ctaLabel: g.ctaLabel || "View" })
        ] })
      ] });
      return g.url ? /* @__PURE__ */ m.jsx("a", { className: "ac-tool-carousel__card", href: g.url, role: "listitem", children: w }, g.id || g.handle || _) : /* @__PURE__ */ m.jsx("div", { className: "ac-tool-carousel__card", role: "listitem", children: w }, g.id || g.handle || _);
    }) }),
    d ? /* @__PURE__ */ m.jsx("div", { className: "ac-tool__footer", children: /* @__PURE__ */ m.jsx("a", { className: "ac-tool__footer-link", href: d, children: h }) }) : null
  ] });
}
function D_(r) {
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
    disclaimer: g,
    linkedProducts: _
  } = n.props;
  return /* @__PURE__ */ m.jsxs(bs, { eyebrow: i, title: a, className: "ac-tool--ritual", children: [
    u ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: u }) : null,
    d ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__detail", children: d }) : null,
    /* @__PURE__ */ m.jsx("ol", { className: "ac-ritual-steps", children: h.map((w) => /* @__PURE__ */ m.jsxs("li", { className: "ac-ritual-steps__item", children: [
      /* @__PURE__ */ m.jsx("span", { className: "ac-ritual-steps__dot", "aria-hidden": "true" }),
      /* @__PURE__ */ m.jsx("span", { children: w })
    ] }, w)) }),
    _.length > 0 ? /* @__PURE__ */ m.jsx("div", { className: "ac-tool-chip-row", role: "list", "aria-label": "Linked products", children: _.map((w, C) => w.url ? /* @__PURE__ */ m.jsx("a", { className: "ac-tool-chip", href: w.url, role: "listitem", children: w.title }, w.id || w.handle || C) : /* @__PURE__ */ m.jsx("span", { className: "ac-tool-chip", role: "listitem", children: w.title }, w.id || w.handle || C)) }) : null,
    p ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__note", children: p }) : null,
    g ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__disclaimer", children: g }) : null
  ] });
}
function F_(r) {
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
  return /* @__PURE__ */ m.jsxs(bs, { eyebrow: i, title: a, className: "ac-tool--summary", children: [
    d ? /* @__PURE__ */ m.jsx("p", { className: "ac-summary__focus", children: d }) : null,
    /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: u }),
    h.length > 0 ? /* @__PURE__ */ m.jsx("ul", { className: "ac-summary__list", children: h.map((g) => /* @__PURE__ */ m.jsx("li", { children: g }, g)) }) : null,
    p ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__disclaimer", children: p }) : null
  ] });
}
function B_(r) {
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
  } = n.props, g = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsxs("div", { className: "ac-tool-collection__copy", children: [
      i ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__eyebrow", children: i }) : null,
      /* @__PURE__ */ m.jsx("h3", { className: "ac-tool__title", children: a }),
      u ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: u }) : null
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "ac-tool-collection__action", children: /* @__PURE__ */ m.jsx("span", { children: h }) }),
    p ? /* @__PURE__ */ m.jsx("div", { className: "ac-tool-collection__image", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("img", { src: p, alt: "", loading: "lazy" }) }) : null
  ] });
  return /* @__PURE__ */ m.jsx("section", { className: "ac-tool ac-tool--collection", children: d ? /* @__PURE__ */ m.jsx("a", { className: "ac-tool-collection", href: d, children: g }) : /* @__PURE__ */ m.jsx("div", { className: "ac-tool-collection", children: g }) });
}
function U_(r) {
  const n = Bn(r);
  if (!n)
    return null;
  const {
    eyebrow: i,
    title: a,
    steps: u,
    closing: d
  } = n.props;
  return /* @__PURE__ */ m.jsxs(bs, { eyebrow: i, title: a, className: "ac-tool--next-steps", children: [
    /* @__PURE__ */ m.jsx("ul", { className: "ac-next-steps", children: u.map((h, p) => /* @__PURE__ */ m.jsxs("li", { className: "ac-next-steps__item", children: [
      /* @__PURE__ */ m.jsx("span", { className: "ac-next-steps__index", children: p + 1 }),
      /* @__PURE__ */ m.jsx("span", { children: h })
    ] }, h)) }),
    d ? /* @__PURE__ */ m.jsx("p", { className: "ac-tool__note", children: d }) : null
  ] });
}
function $_(r) {
  const n = Bn(r);
  return n ? /* @__PURE__ */ m.jsx(bs, { eyebrow: "Storefront", title: n.component.replace(/_/g, " "), children: /* @__PURE__ */ m.jsx("p", { className: "ac-tool__lede", children: "This response includes a storefront component that has not been wired into the theme yet." }) }) : null;
}
function H_({ children: r }) {
  return /* @__PURE__ */ m.jsx("div", { className: "ac-tool-group", children: r });
}
const V_ = {
  tools: {
    by_name: {
      [ct.product_card]: O_,
      [ct.product_carousel]: z_,
      [ct.ritual_card]: D_,
      [ct.reading_summary]: F_,
      [ct.collection_link]: B_,
      [ct.next_steps]: U_
    },
    Fallback: $_
  },
  ToolGroup: H_
}, Nh = "[data-askcrystal-homepage-root]", Ji = /* @__PURE__ */ new Map(), W_ = "askcrystal-main-thread", G_ = "http://localhost:8787", pf = "askcrystal-theme-session-id", Ph = "askcrystal-theme-chat-sessions-v1", jh = "askcrystal-theme-active-session-id", vl = "askcrystal-theme-pending-prompt-v1", Y_ = "askcrystal:session-registry", mf = "askcrystal:session-select", gf = "askcrystal:session-create", yf = "askcrystal:session-delete", so = 24, q_ = "https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538";
let vf = 0;
const Q_ = 7, Lh = Tt.createContext({
  sendPrompt: () => {
  },
  onCancel: () => {
  },
  isRunning: !1
});
function Dl() {
  return Tt.useContext(Lh);
}
function K_(r) {
  const n = document.getElementById(r);
  if (!n) return null;
  try {
    return JSON.parse(n.textContent || "{}");
  } catch (i) {
    return console.error("[AskCrystal] Failed to parse section config", i), null;
  }
}
function gr(r = []) {
  return r.map((n) => n.type === "text" || n.type === "reasoning" ? n.text : "").join(" ").trim();
}
function dl(r) {
  const n = r?.answer || r?.delta || r?.text || r?.message || r?.reply || r?.output || r?.data?.answer || r?.data?.text;
  return typeof n == "string" ? n : "";
}
function _n(r) {
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
function J_(r) {
  return _n(
    r?.suggestions || r?.suggestedQuestions || r?.suggested_questions || r?.data?.suggestions || r?.data?.suggestedQuestions || r?.data?.suggested_questions || []
  );
}
function Oh() {
  return typeof window < "u" && typeof window.localStorage < "u";
}
function _f(r) {
  if (!Oh()) return "";
  try {
    return window.localStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function wf(r, n) {
  if (Oh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.localStorage.removeItem(r);
        return;
      }
      window.localStorage.setItem(r, n);
    } catch {
    }
}
function zh() {
  return typeof window < "u" && typeof window.sessionStorage < "u";
}
function X_(r) {
  if (!zh()) return "";
  try {
    return window.sessionStorage.getItem(r) || "";
  } catch {
    return "";
  }
}
function Dh(r, n) {
  if (zh())
    try {
      if (n === "" || n === null || n === void 0) {
        window.sessionStorage.removeItem(r);
        return;
      }
      window.sessionStorage.setItem(r, n);
    } catch {
    }
}
function Z_(r) {
  return r === "chat" ? "chat" : "home";
}
function ew() {
  if (typeof window > "u") return "";
  try {
    const r = new URLSearchParams(window.location.search), n = r.get("askcrystal") || r.get("mode");
    if (n === "chat") return "chat";
    if (n === "home") return "home";
  } catch {
  }
  return "";
}
function Fh(r = {}) {
  return ew() || Z_(r.displayMode);
}
function tw(r = {}) {
  return (typeof r.chatPageUrl == "string" ? r.chatPageUrl.trim() : "") || "/?askcrystal=chat";
}
function nw(r, n) {
  const i = typeof n == "string" ? n.trim() : "";
  return !i || typeof window > "u" ? !1 : (Dh(vl, JSON.stringify({
    prompt: i,
    createdAt: Date.now()
  })), window.location.assign(tw(r)), !0);
}
function rw() {
  const r = X_(vl);
  if (!r) return "";
  Dh(vl, "");
  const n = Bh(r, null), i = typeof n?.prompt == "string" ? n.prompt.trim() : "", a = Number(n?.createdAt), u = Number.isFinite(a) ? Date.now() - a < 300 * 1e3 : !0;
  return i && u ? i : "";
}
function Bh(r, n) {
  if (typeof r != "string" || !r.trim()) return n;
  try {
    return JSON.parse(r);
  } catch {
    return n;
  }
}
function Uh(r, n = 52) {
  const i = typeof r == "string" ? r.replace(/\s+/g, " ").trim() : "";
  return i ? i.length <= n ? i : `${i.slice(0, Math.max(1, n - 1)).trimEnd()}…` : "";
}
function sw(r) {
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
function io(r) {
  return Array.isArray(r) ? r.map(sw).filter(Boolean) : [];
}
function _l(r) {
  if (!r || typeof r != "object") return "";
  const n = r.content || r.parts || [], i = gr(Array.isArray(n) ? n : []);
  return i || (Array.isArray(r.metadata?.unstable_data) && r.metadata.unstable_data.length > 0 && r.role === "assistant" ? "Shared storefront picks and guidance." : "");
}
function oo(r, n = "New reading") {
  const i = Array.isArray(r) ? r.find((u) => u?.role === "user" && _l(u)) : null, a = _l(i);
  return a ? Uh(a, 42) : n;
}
function iw(r) {
  if (!Array.isArray(r) || r.length === 0)
    return "No messages yet.";
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = _l(r[n]);
    if (i) return Uh(i, 78);
  }
  return "No messages yet.";
}
function $h(r, n = null) {
  if (!Array.isArray(r) || r.length === 0) return n;
  for (let i = r.length - 1; i >= 0; i -= 1) {
    const a = r[i]?.createdAt;
    if (!a) continue;
    const u = new Date(a).toISOString();
    if (u) return u;
  }
  return n;
}
function yr(r) {
  return [...r].sort((n, i) => {
    const a = new Date(i?.updatedAt || 0).getTime(), u = new Date(n?.updatedAt || 0).getTime();
    return a - u;
  });
}
function xs(r = {}) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), i = io(r.messages || []);
  return {
    id: typeof r.id == "string" && r.id ? r.id : _r("thread"),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : oo(i),
    createdAt: typeof r.createdAt == "string" && r.createdAt ? r.createdAt : n,
    updatedAt: typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : n,
    conversationId: typeof r.conversationId == "string" && r.conversationId ? r.conversationId : null,
    messages: i,
    suggestions: _n(r.suggestions || [])
  };
}
function ow(r) {
  if (!r || typeof r != "object") return null;
  const n = io(r.messages || []), i = typeof r.createdAt == "string" && r.createdAt ? r.createdAt : (/* @__PURE__ */ new Date()).toISOString(), a = typeof r.updatedAt == "string" && r.updatedAt ? r.updatedAt : $h(n, i) || i;
  return xs({
    ...r,
    createdAt: i,
    updatedAt: a,
    messages: n,
    suggestions: _n(r.suggestions || []),
    title: typeof r.title == "string" && r.title.trim() ? r.title.trim() : oo(n)
  });
}
function aw() {
  const r = Bh(_f(Ph), []), n = Array.isArray(r) ? r.map(ow).filter(Boolean) : [], i = n.length > 0 ? yr(n).slice(0, so) : [xs()], a = _f(jh), u = i.some((d) => d.id === a) ? a : i[0].id;
  return {
    sessions: i,
    activeSessionId: u
  };
}
function lw({ sessions: r, activeSessionId: n }) {
  wf(
    Ph,
    JSON.stringify(yr(r).slice(0, so))
  ), wf(jh, n);
}
function fl(r, n) {
  return Array.isArray(r) && r.find((i) => i.id === n) || null;
}
function Sf(r) {
  return r ? {
    ...r,
    title: oo(r.messages, r.title || "New reading"),
    updatedAt: $h(r.messages, (/* @__PURE__ */ new Date()).toISOString()) || (/* @__PURE__ */ new Date()).toISOString()
  } : null;
}
function xf(r, n, i = {}) {
  const a = [];
  let u = !1;
  for (const d of Array.isArray(r) ? r : []) {
    if (d.id !== n) {
      a.push(d);
      continue;
    }
    u = !0;
    const h = i.messages !== void 0 ? io(i.messages) : d.messages, p = Sf({
      ...d,
      ...i,
      messages: h,
      suggestions: i.suggestions !== void 0 ? _n(i.suggestions) : d.suggestions,
      conversationId: i.conversationId !== void 0 ? i.conversationId || null : d.conversationId
    });
    a.push(p);
  }
  return u || a.push(Sf(xs({
    id: n,
    ...i
  }))), yr(a).slice(0, so);
}
function Hh(r) {
  return yr(Array.isArray(r) ? r : []).map((n) => ({
    id: n.id,
    title: oo(n.messages, n.title || "New reading"),
    preview: iw(n.messages),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    isEmpty: !Array.isArray(n.messages) || n.messages.length === 0
  }));
}
function uw({ sessions: r, activeSessionId: n, isRunning: i }) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Y_, {
    detail: {
      sessions: Hh(r),
      activeSessionId: n,
      isRunning: !!i
    }
  }));
}
function Bi() {
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
function cw(r) {
  return /^(https?:\/\/|mailto:|\/)/i.test(r);
}
function Kt(r, n = "inline") {
  const i = [], a = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let u = 0, d, h = 0;
  for (; (d = a.exec(r)) !== null; ) {
    d.index > u && i.push(r.slice(u, d.index));
    const p = `${n}-${h}`;
    if (d[2] && d[3]) {
      const g = d[3].trim();
      i.push(
        cw(g) ? /* @__PURE__ */ m.jsx("a", { href: g, target: g.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", children: d[2] }, p) : d[2]
      );
    } else d[4] ? i.push(/* @__PURE__ */ m.jsx("code", { children: d[4] }, p)) : d[5] ? i.push(/* @__PURE__ */ m.jsx("strong", { children: Kt(d[5], `${p}-strong`) }, p)) : d[6] && i.push(/* @__PURE__ */ m.jsx("em", { children: Kt(d[6], `${p}-em`) }, p));
    u = a.lastIndex, h += 1;
  }
  return u < r.length && i.push(r.slice(u)), i;
}
function Es(r) {
  if (typeof r != "string" || !r.includes("|")) return [];
  const n = r.trim().replace(/^\|/, "").replace(/\|$/, "");
  return n ? n.split("|").map((i) => i.trim()) : [];
}
function dw(r) {
  const n = Es(r);
  return n.length ? n.map((i) => /^:\-+\:$/.test(i) ? "center" : /^\-+\:$/.test(i) ? "right" : "left") : [];
}
function fw(r) {
  const n = Es(r);
  return n.length > 0 && n.every((i) => /^:?-{3,}:?$/.test(i));
}
function Ef(r) {
  const n = Es(r);
  return n.length >= 2 && n.some(Boolean);
}
function hw(r, n) {
  const i = r[n];
  if (!Ef(i)) return null;
  const a = Es(i), u = r[n + 1], d = fw(u);
  let h = n + (d ? 2 : 1);
  const p = [];
  for (; h < r.length && Ef(r[h]); ) {
    const g = Es(r[h]);
    if (g.length !== a.length) break;
    p.push(g), h += 1;
  }
  return p.length === 0 ? null : {
    headers: a,
    alignments: d ? dw(u) : a.map(() => "left"),
    rows: p,
    nextIndex: h
  };
}
function pw(r = "") {
  return /^(?:md|markdown|mdx)$/i.test(r.trim());
}
function Vh({ text: r = "" }) {
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
      const w = [], C = d[1] || "";
      for (a += 1; a < n.length && !/^```\s*$/.test(n[a]); )
        w.push(n[a]), a += 1;
      a < n.length && (a += 1), pw(C) ? i.push(
        /* @__PURE__ */ m.jsx("div", { className: "ac-markdown__embedded", children: /* @__PURE__ */ m.jsx(Vh, { text: w.join(`
`) }) }, `markdown-fence-${a}`)
      ) : i.push(
        /* @__PURE__ */ m.jsx("pre", { className: "ac-markdown__code-block", children: /* @__PURE__ */ m.jsx("code", { children: w.join(`
`) }) }, `code-${a}`)
      );
      continue;
    }
    const h = u.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const w = `h${h[1].length + 2}`;
      i.push(
        /* @__PURE__ */ m.jsx(w, { children: Kt(h[2], `heading-${a}`) }, `heading-${a}`)
      ), a += 1;
      continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(u)) {
      i.push(/* @__PURE__ */ m.jsx("hr", { className: "ac-markdown__rule" }, `rule-${a}`)), a += 1;
      continue;
    }
    const p = hw(n, a);
    if (p) {
      const { headers: w, alignments: C, rows: v, nextIndex: R } = p;
      a = R, i.push(
        /* @__PURE__ */ m.jsx("div", { className: "ac-markdown__table-wrap", children: /* @__PURE__ */ m.jsxs("table", { className: "ac-markdown__table", children: [
          /* @__PURE__ */ m.jsx("thead", { children: /* @__PURE__ */ m.jsx("tr", { children: w.map((j, M) => /* @__PURE__ */ m.jsx(
            "th",
            {
              style: { textAlign: C[M] || "left" },
              children: Kt(j, `table-head-${a}-${M}`)
            },
            `table-head-${a}-${M}`
          )) }) }),
          /* @__PURE__ */ m.jsx("tbody", { children: v.map((j, M) => /* @__PURE__ */ m.jsx("tr", { children: w.map((B, Y) => /* @__PURE__ */ m.jsx(
            "td",
            {
              style: { textAlign: C[Y] || "left" },
              children: Kt(j[Y] || "", `table-cell-${a}-${M}-${Y}`)
            },
            `table-cell-${a}-${M}-${Y}`
          )) }, `table-row-${a}-${M}`)) })
        ] }) }, `table-${a}`)
      );
      continue;
    }
    if (/^\s*[-*]\s+/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*[-*]\s+/.test(n[a]); )
        w.push(n[a].replace(/^\s*[-*]\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("ul", { children: w.map((C, v) => /* @__PURE__ */ m.jsx("li", { children: Kt(C, `ul-${a}-${v}`) }, `ul-${a}-${v}`)) }, `ul-${a}`)
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*\d+\.\s+/.test(n[a]); )
        w.push(n[a].replace(/^\s*\d+\.\s+/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("ol", { children: w.map((C, v) => /* @__PURE__ */ m.jsx("li", { children: Kt(C, `ol-${a}-${v}`) }, `ol-${a}-${v}`)) }, `ol-${a}`)
      );
      continue;
    }
    if (/^\s*>\s?/.test(u)) {
      const w = [];
      for (; a < n.length && /^\s*>\s?/.test(n[a]); )
        w.push(n[a].replace(/^\s*>\s?/, "")), a += 1;
      i.push(
        /* @__PURE__ */ m.jsx("blockquote", { children: w.map((C, v) => /* @__PURE__ */ m.jsx("p", { children: Kt(C, `quote-${a}-${v}`) }, `quote-${a}-${v}`)) }, `quote-${a}`)
      );
      continue;
    }
    const g = [];
    for (; a < n.length && n[a].trim() && !/^```/.test(n[a]) && !/^(#{1,3})\s+/.test(n[a]) && !/^\s*[-*]\s+/.test(n[a]) && !/^\s*\d+\.\s+/.test(n[a]) && !/^\s*>\s?/.test(n[a]); )
      g.push(n[a].trim()), a += 1;
    const _ = g.join(" ");
    i.push(
      /* @__PURE__ */ m.jsx("p", { children: Kt(_, `p-${a}`) }, `p-${a}`)
    );
  }
  return /* @__PURE__ */ m.jsx("div", { className: "ac-markdown", children: i });
}
function mw(r) {
  if (typeof r != "string" || !r) return "";
  try {
    return JSON.parse(r);
  } catch {
    return r.replace(/^"/, "").replace(/"$/, "");
  }
}
function gw(r) {
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
function yw(r) {
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
  return gw(d).trim();
}
function Wh(r) {
  if (typeof r != "string") return "";
  const n = r.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trim();
  if (!n) return "";
  const i = [...n.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi
  )].pop();
  if (i?.[1]) {
    const d = mw(i[1]).trim();
    if (d) return d;
  }
  const a = yw(n);
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
function kf(r) {
  if (typeof r != "string") return "";
  let n = r.replace(/^\uFEFF/, "").trimStart();
  if (!n) return "";
  const i = n.slice(0, 24).toLowerCase().replace(/\s+/g, " ").trim();
  if (i && i.length >= 3 && i.length <= 13 && "final answer:".startsWith(i) && /^[a-z:\s]+$/i.test(n.trim()) && n.trim().length <= 24)
    return "";
  const a = [...n.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  return typeof a?.index == "number" ? n = n.slice(a.index + a[0].length).trimStart() : n = n.replace(/^final answer\s*:\s*/i, ""), n;
}
function hl(r) {
  if (typeof r != "string") return "";
  const n = r.replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").trimStart();
  if (!n) return "";
  const i = Wh(n);
  let a = kf(i || n);
  if (!i) {
    if (!a) return "";
    const u = Yh(a);
    if (u && (a = kf(u) || a), Gh(a) || wl(a))
      return "";
  }
  return a.replace(/\n{3,}/g, `

`).trimStart();
}
function Gh(r) {
  if (typeof r != "string") return !1;
  const n = r.toLowerCase();
  return /\bthought:\b/.test(n) || /\bobservation:\b/.test(n) || /\baction:\b/.test(n) || /\bquestion:\b/.test(n) || /"action"\s*:/.test(n) || /\bfinal answer\b/.test(n);
}
function wl(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(n) || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(n) || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(n) || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(n) || /\bi have \w+ products?\b/.test(n) : !1;
}
function bf(r) {
  if (typeof r != "string") return !1;
  const n = r.trim().toLowerCase();
  return n ? /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(n) || /^```(?:json|xml)?\s*[\[{<]/.test(n) || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(n) || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(n) : !1;
}
function Yh(r) {
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
    if (!wl(h)) break;
    a += 1;
  }
  if (n = i.slice(a).join(`
`).trim(), !n) return "";
  const u = n.split(/\n{2,}/).map((h) => h.trim()).filter(Boolean);
  let d = 0;
  for (; d < u.length && wl(u[d]); )
    d += 1;
  return u.slice(d).join(`

`).trim();
}
function Fl(r) {
  return Array.isArray(r) ? r.map((n) => typeof n == "string" ? n.trim() : "").filter(Boolean).slice(-6) : typeof r == "string" ? r.split(`
`).map((n) => n.trim()).filter(Boolean).slice(-6) : [];
}
function vw({ statusStage: r = "", statusTool: n = "", statusText: i = "" }) {
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
function Hi(r) {
  const n = Math.sin(r * 12.9898 + 78.233) * 43758.5453;
  return n - Math.floor(n);
}
function _w({ statusText: r = "", statusStage: n = "", ambientStatusText: i = "", hasToolActivity: a = !1 }) {
  return i || (n && n !== "tool" && r ? r : a ? "Following the clearest thread..." : "Settling into your energy...");
}
function ww() {
  const [r, n] = k.useState(!1);
  return k.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => n(i.matches);
    return a(), i.addEventListener?.("change", a), () => i.removeEventListener?.("change", a);
  }, []), r;
}
function Sw({ statusText: r }) {
  return r ? /* @__PURE__ */ m.jsxs("div", { className: "ac-live-status", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ m.jsx("span", { className: "ac-live-status__dot", "aria-hidden": "true" }),
    /* @__PURE__ */ m.jsx("span", { className: "ac-live-status__text", children: r })
  ] }) : null;
}
function xw({
  statusText: r,
  statusStage: n = "",
  statusTool: i = "",
  ambientStatusText: a = ""
}) {
  const u = ww(), d = k.useMemo(() => {
    const g = _w({
      statusText: r,
      statusStage: n,
      ambientStatusText: a,
      hasToolActivity: n === "tool"
    }), _ = vw({
      statusStage: n === "tool" ? "compose" : n,
      statusTool: i,
      statusText: g
    });
    return [...new Set([g, ..._].filter(Boolean))];
  }, [a, n, r, i]), [h, p] = k.useState(0);
  return k.useEffect(() => {
    p(0);
  }, [d]), k.useEffect(() => {
    if (u || d.length <= 1) return;
    const g = window.setTimeout(() => {
      p((_) => (_ + 1) % d.length);
    }, 7200);
    return () => window.clearTimeout(g);
  }, [d.length, h, u]), /* @__PURE__ */ m.jsx("p", { className: "ac-progress-card__ambient", children: d[h] || "The reading is still moving..." });
}
function Ew(r) {
  return r >= 55e3 ? "This one is taking the longer orbit." : r >= 3e4 ? "Full readings can take 30-60 seconds to come through." : r >= 12e3 ? "A deeper read may take a few more moments." : r >= 4e3 ? "Following the strongest thread." : "The first signs are arriving.";
}
function kw({
  statusText: r,
  statusHistoryText: n = "",
  statusStage: i = "",
  statusTool: a = "",
  ambientStatusText: u = "",
  statusElapsedMs: d = 0
}) {
  const h = k.useRef(Date.now()), [p, g] = k.useState(0);
  k.useEffect(() => {
    const Z = window.setInterval(() => {
      g(Date.now() - h.current);
    }, 1e3);
    return () => window.clearInterval(Z);
  }, []);
  const _ = Math.max(Number(d) || 0, p), w = _ >= 4e3 || i === "tool" || i === "compose", C = Fl(n), v = r || "Opening the thread beneath your question...", R = "Choosing the strongest reading path", j = "Choosing the right reading path", M = C.filter((Z) => Z !== R && Z !== j);
  i === "tool" && v && v !== R && v !== j && !M.includes(v) && M.push(v);
  const B = M.slice(-1), Y = [
    {
      label: "Your question has entered the reading",
      state: "done"
    }
  ];
  if (w) {
    const Z = B.length > 0 || i === "compose";
    Y.push({
      label: Z ? "The strongest reading path is chosen" : R,
      state: Z ? "done" : "current"
    }), B.forEach((ne, q) => {
      const ae = q === B.length - 1;
      Y.push({
        label: ne,
        state: i === "tool" && ae ? "current" : "done"
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
  const re = Y.slice(0, 4);
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-progress-card", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-progress-card__header", children: /* @__PURE__ */ m.jsxs("div", { className: "ac-progress-card__heading", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-progress-card__eyebrow", children: "AskCrystal is listening" }),
      /* @__PURE__ */ m.jsx("h3", { children: "Reading the signs" })
    ] }) }),
    /* @__PURE__ */ m.jsx("ol", { className: "ac-progress-card__steps ac-progress-card__steps--lyric", "aria-label": "Reading progress", children: re.map((Z, ne) => /* @__PURE__ */ m.jsxs(
      "li",
      {
        className: `ac-progress-card__step ac-progress-card__step--${Z.state}`,
        style: { "--ac-progress-step-index": ne },
        children: [
          /* @__PURE__ */ m.jsx("span", { className: "ac-progress-card__step-marker", "aria-hidden": "true" }),
          /* @__PURE__ */ m.jsx("span", { className: "ac-progress-card__step-label", children: Z.label })
        ]
      },
      `${Z.label}-${ne}`
    )) }),
    /* @__PURE__ */ m.jsx(
      xw,
      {
        statusText: r,
        statusStage: i,
        statusTool: a,
        ambientStatusText: u
      }
    ),
    /* @__PURE__ */ m.jsx("div", { className: "ac-progress-card__footer", children: /* @__PURE__ */ m.jsx("p", { className: "ac-progress-card__expectation", children: Ew(_) }) })
  ] });
}
function bw(r) {
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
    taskId: Kh(r),
    elapsedMs: Number.isFinite(n) ? Math.max(0, n) : 0
  };
}
function qh(r) {
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const i = r[n];
    if (i.role === "user")
      return gr(i.content);
  }
  return "";
}
function pl(r, n) {
  return r.find((i) => n(i));
}
function Cw({ matchedIntention: r, fallbackProduct: n, products: i }) {
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
function Tw(r, n) {
  const i = r.toLowerCase(), u = [
    {
      key: "calm",
      test: /sleep|rest|anxious|stress|calm|ground|peace/,
      lead: "I would start by softening the energy around your nervous system before recommending anything too activating.",
      product: pl(n, (g) => /amethyst|selenite|moonstone|calm|sleep/i.test(`${g.title} ${g.summary || ""}`)) || n[0],
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
      product: pl(n, (g) => /rose|heart|love|pink/i.test(`${g.title} ${g.summary || ""}`)) || n[0],
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
      product: pl(n, (g) => /citrine|pyrite|tiger|success|abundance/i.test(`${g.title} ${g.summary || ""}`)) || n[0],
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
  ].find((g) => g.test.test(i)), d = n[0], h = Cw({
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
function Qh(r) {
  const n = typeof r == "string" ? r.trim() : "";
  if (!n) return "";
  const i = Wh(n), u = (i || n).replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, "").replace(/<invoke\b[\s\S]*?<\/invoke>/gi, "").replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, "").replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, "").replace(/\n{3,}/g, `

`).trim();
  if (!i && Gh(u))
    return "";
  if (u) {
    const d = u.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i), h = Yh(u), p = d >= 0 ? u.slice(d).trim() : h || u, _ = p.split(/\n{2,}/).map((C) => C.trim()).filter(Boolean).filter((C) => !bf(C)), w = (_.length > 0 ? _.join(`

`) : p).trim();
    if (w && !bf(w))
      return w;
  }
  return "";
}
function Iw(r) {
  const n = Qh(r);
  return n || [
    "I tried to check the shelf for you, but the live catalog result was not available in this moment.",
    "For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”",
    "If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely."
  ].join(`

`);
}
function Cf(r, n = []) {
  const i = Mh(r), a = Dn(n, i.components), u = Iw(i.answer);
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
  const i = typeof r == "string" ? r : "", a = Mh(i), u = Dn(n, a.components), d = __(i), h = [], p = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map(), _ = (v) => `${v.toolName}:${v.toolCallId}`;
  for (const v of u) {
    const R = hf(v);
    R && g.set(_(R), R);
  }
  const w = (v) => {
    const R = S_(v).trim(), j = Qh(R);
    if (!j) return;
    const M = h[h.length - 1];
    if (M?.type === "text") {
      M.text = `${M.text}

${j}`.trim();
      return;
    }
    h.push({
      type: "text",
      text: j
    });
  }, C = (v) => {
    for (const R of v) {
      const j = hf(R);
      if (!j) continue;
      const M = _(j);
      p.has(M) || (h.push(g.get(M) || j), p.add(M));
    }
  };
  if (d.some((v) => v.type === "payload"))
    for (const v of d) {
      if (v.type === "text") {
        w(v.value);
        continue;
      }
      C(zl(v.value));
    }
  else
    w(i);
  for (const v of g.values()) {
    const R = _(v);
    p.has(R) || h.push(v);
  }
  return h;
}
function Rw(r) {
  return /^https?:\/\//i.test(r);
}
function vr(r) {
  return r ? Rw(r) ? r : typeof window < "u" && /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && r.startsWith("/apps/") ? `${G_}${r}` : r : "";
}
function Aw(r) {
  return r ? r.endsWith("/stream") ? vr(r) : vr(`${r.replace(/\/$/, "")}/stream`) : "";
}
function Mw(r) {
  return r ? r.endsWith("/stop") ? vr(r) : vr(`${r.replace(/\/$/, "")}/stop`) : "";
}
function Nw(r) {
  return r ? r.endsWith("/suggestions") ? vr(r) : vr(`${r.replace(/\/$/, "")}/suggestions`) : "";
}
function Pw() {
  if (typeof window > "u")
    return "askcrystal-theme-preview";
  try {
    const r = window.localStorage.getItem(pf);
    if (r) return r;
    const n = _r("session");
    return window.localStorage.setItem(pf, n), n;
  } catch {
    return _r("session");
  }
}
function jw(r) {
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
function Kh(r) {
  const n = r?.taskId || r?.task_id || r?.data?.taskId || r?.data?.task_id;
  return typeof n == "string" ? n : "";
}
function Lw(r) {
  const n = r?.messageId || r?.message_id || r?.data?.messageId || r?.data?.message_id;
  return typeof n == "string" ? n : "";
}
function Jh() {
  if (typeof DOMException < "u")
    return new DOMException("The operation was aborted.", "AbortError");
  const r = new Error("The operation was aborted.");
  return r.name = "AbortError", r;
}
function Ct(r) {
  if (r?.aborted)
    throw Jh();
}
function Ow(r = "", n = "") {
  const i = Math.min(r.length, n.length);
  let a = 0;
  for (; a < i && r[a] === n[a]; )
    a += 1;
  return a;
}
function zw(r, n = 28, i = "normal") {
  if (typeof r != "string" || !r) return [];
  const a = r.match(/\n+|[^\s\n]+(?:\s+)?|[ \t]+/g) || [r];
  if (a.length <= n) return a;
  if (i === "final") {
    const h = [], p = Math.min(a.length, n);
    let g = 0;
    for (; g < a.length; ) {
      const _ = a.length - g, w = Math.max(1, p - h.length), C = _ / w, v = Math.max(1, Math.floor(C)), R = Hi(g + r.length + h.length), j = R > 0.72 ? 1 : R < 0.18 ? -1 : 0;
      let M = Math.max(1, Math.round(v + j));
      const B = a[g] || "", Y = B.trim();
      /[\n]/.test(B) || /[.!?。！？]$/.test(Y) ? M = 1 : /[,:;，；：]$/.test(Y) ? M = Math.min(M, 2) : M = Math.min(M, 3), h.push(a.slice(g, g + M).join("")), g += M;
    }
    return h;
  }
  const u = Math.ceil(a.length / n), d = [];
  for (let h = 0; h < a.length; h += u)
    d.push(a.slice(h, h + u).join(""));
  return d;
}
function Dw(r, n = "normal", i = "", a = 0) {
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
  const d = typeof i == "string" ? i.trim() : "", h = /[.!?。！？]$/.test(d) ? 176 : /[,;:，；：]$/.test(d) ? 104 : /\n/.test(i) ? 136 : 0, p = n === "final" ? Math.min(28, Math.max(0, d.length * 2 - 10)) : 0, g = n === "final" ? 52 : 6, _ = Math.round((Hi(a + r + d.length) - 0.5) * g), w = n === "final" && Hi(a * 3.17 + r) > 0.78 ? 64 + Math.round(Hi(a + 17) * 48) : 0;
  return Math.max(0, u + h + p + _ + w);
}
function Fw(r, n) {
  return r ? new Promise((i, a) => {
    const u = globalThis.setTimeout(() => {
      h(), i();
    }, r), d = () => {
      h(), a(Jh());
    };
    function h() {
      globalThis.clearTimeout(u), n?.removeEventListener?.("abort", d);
    }
    n?.addEventListener?.("abort", d, { once: !0 });
  }) : Promise.resolve();
}
async function Bw({
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
    const v = Ow(r, n);
    v / Math.max(1, Math.min(r.length, n.length)) >= 0.65 && (p = n.slice(0, v));
  }
  const g = n.slice(p.length);
  if (!g)
    return p !== r && a?.("", p, u), n;
  const _ = d === "fast" ? n.length > 1400 ? 64 : n.length > 700 ? 52 : 40 : d === "final" ? n.length > 1800 ? 120 : n.length > 1200 ? 104 : n.length > 700 ? 88 : 68 : n.length > 1400 ? 44 : n.length > 700 ? 36 : 28, w = zw(g, _, d);
  let C = p;
  for (let v = 0; v < w.length; v += 1) {
    Ct(i);
    const R = w[v];
    if (C += R, a?.(!h && v === 0 ? "" : R, C, u), v < w.length - 1) {
      const M = Dw(w.length, d, R, v);
      await Fw(M, i);
    }
  }
  return n;
}
async function Uw({ apiEndpoint: r, taskId: n, sessionId: i, conversationId: a }) {
  if (!(!r || !n))
    try {
      await fetch(Mw(r), {
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
async function $w({ apiEndpoint: r, messageId: n, sessionId: i }) {
  if (!r || !n) return [];
  try {
    const a = await fetch(Nw(r), {
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
    return _n(
      u?.suggestions || u?.data?.suggestions || u?.data || []
    );
  } catch (a) {
    return console.error("[AskCrystal] Suggested prompts request failed.", a), [];
  }
}
async function Hw({ apiEndpoint: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: h, onComponents: p, onSuggestions: g }) {
  Ct(i);
  const _ = await fetch(Aw(r), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: qh(n),
      conversationId: a,
      sessionId: u
    }),
    signal: i
  });
  if (!_.ok) {
    let re = `Proxy returned ${_.status}`;
    try {
      const Z = await _.json();
      re = Z?.error || Z?.message || re;
    } catch {
    }
    throw new Error(re);
  }
  if (!_.body)
    throw new Error("The proxy did not return a readable stream.");
  const w = _.body.getReader(), C = new TextDecoder();
  let v = "", R = "", j = "", M = [], B = [], Y = a || null;
  for (; ; ) {
    Ct(i);
    const { done: re, value: Z } = await w.read();
    if (re) break;
    Ct(i), v += C.decode(Z, { stream: !0 });
    const ne = jw(v);
    v = ne.remaining;
    for (const q of ne.events) {
      if (Ct(i), q.event === "status" && typeof q.payload?.message == "string" && (Ct(i), d?.(q.payload)), q.event === "error")
        throw new Error(q.payload?.error || q.payload?.message || "The proxy stream failed.");
      const ae = zl(q.payload);
      ae.length && (Ct(i), M = Dn(M, ae), p?.(M, ae, q.payload), Y = q.payload?.conversationId || q.payload?.conversation_id || Y);
      const ie = J_(q.payload);
      if (ie.length && (Ct(i), B = ie, g?.(ie, q.payload), Y = q.payload?.conversationId || q.payload?.conversation_id || Y), q.event === "replace") {
        Ct(i);
        const X = dl(q.payload);
        if (X) {
          R = X;
          const ye = hl(R);
          ye && (j = ye);
        }
        Y = q.payload?.conversationId || q.payload?.conversation_id || Y;
      }
      if (["delta", "message", "agent_message"].includes(q.event)) {
        Ct(i);
        const X = dl(q.payload);
        if (X) {
          R += X;
          const ye = hl(R);
          ye && (j = ye);
        }
        Y = q.payload?.conversationId || q.payload?.conversation_id || Y;
      }
      if (q.event === "complete") {
        Ct(i);
        const X = dl(q.payload) || R, De = hl(X) || j || j, Ne = Cf(X || De, M);
        return {
          answer: Ne.answer,
          components: Ne.components,
          sourceText: Ne.sourceText,
          suggestions: ie.length ? ie : B,
          conversationId: q.payload?.conversationId || q.payload?.conversation_id || Y || null,
          messageId: Lw(q.payload) || null
        };
      }
    }
  }
  if (j || M.length > 0) {
    const re = Cf(j, M);
    return {
      answer: re.answer,
      components: re.components,
      sourceText: re.sourceText,
      suggestions: B,
      conversationId: Y,
      messageId: null
    };
  }
  throw new Error("The proxy stream ended before a completion payload was received.");
}
function _r(r = "message") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${r}-${crypto.randomUUID()}` : (vf += 1, `${r}-${Date.now()}-${vf}`);
}
function Vw(r) {
  return {
    id: _r("user"),
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
  id: r = _r("assistant"),
  text: n = "",
  parts: i = null,
  components: a = [],
  status: u,
  error: d,
  statusText: h = "",
  statusStage: p = "",
  statusTool: g = "",
  statusHistory: _ = [],
  ambientStatusText: w = "",
  statusElapsedMs: C = null
}) {
  const v = Fl(_).join(`
`), R = Number(C);
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
        ...g ? { statusTool: g } : {},
        ...v ? { statusHistoryText: v } : {},
        ...w ? { ambientStatusText: w } : {},
        ...Number.isFinite(R) ? { statusElapsedMs: Math.max(0, R) } : {}
      }
    }
  };
}
function Ww(r, n) {
  const i = typeof n?.stage == "string" ? n.stage : "", a = typeof n?.message == "string" ? n.message.trim() : "", u = Fl(r);
  if (i !== "tool" || !a || u[u.length - 1] === a)
    return u;
  const d = u.filter((h) => h !== a);
  return d.push(a), d.slice(-4);
}
function Sl({ id: r, text: n = "", components: i = [] }) {
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
function Tf(r, n) {
  if (!Array.isArray(r) || !n || r.length === 0)
    return Array.isArray(r) ? [...r] : [];
  const i = [...r], a = i[i.length - 1];
  return a?.role === "assistant" && a?.status?.type === "running" && (i[i.length - 1] = Sl({
    id: a.id,
    text: gr(a.content || a.parts || []),
    components: a.metadata?.unstable_data || []
  })), i;
}
async function Gw({ config: r, messages: n, abortSignal: i, conversationId: a, sessionId: u, onStatus: d, onDelta: h, onComponents: p, onSuggestions: g }) {
  const _ = qh(n);
  if (r.runtimeMode === "proxy" && r.apiEndpoint)
    try {
      return await Hw({
        apiEndpoint: r.apiEndpoint,
        messages: n,
        abortSignal: i,
        conversationId: a,
        sessionId: u,
        onStatus: d,
        onDelta: h,
        onComponents: p,
        onSuggestions: g
      });
    } catch (C) {
      throw C?.name === "AbortError" || console.error("[AskCrystal] Proxy runtime failed.", C), C;
    }
  const w = Tw(_, r.products);
  return {
    answer: w.answer,
    components: w.components || [],
    suggestions: [],
    sourceText: w.answer,
    conversationId: a,
    messageId: null
  };
}
function Yw(r) {
  const n = k.useMemo(() => aw(), []), i = fl(n.sessions, n.activeSessionId) || n.sessions[0], [a, u] = k.useState(n.sessions), [d, h] = k.useState(i.id), [p, g] = k.useState(i.messages), [_, w] = k.useState(i.suggestions), [C, v] = k.useState(!1), R = k.useRef(null), j = k.useRef(""), M = k.useRef(""), B = k.useRef(!1), Y = k.useRef(i.conversationId || null), re = k.useRef(p), Z = k.useRef(a), ne = k.useRef(d), q = k.useRef(C), ae = k.useRef(Pw());
  k.useEffect(() => {
    re.current = p;
  }, [p]), k.useEffect(() => {
    Z.current = a;
  }, [a]), k.useEffect(() => {
    ne.current = d;
  }, [d]), k.useEffect(() => {
    q.current = C;
  }, [C]), k.useEffect(() => {
    u((H) => xf(H, d, {
      messages: Tf(p, B.current),
      suggestions: _,
      conversationId: Y.current,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
  }, [d, p, _]), k.useEffect(() => {
    lw({
      sessions: a,
      activeSessionId: d
    }), uw({
      sessions: a,
      activeSessionId: d,
      isRunning: C
    });
  }, [d, C, a]);
  const ie = k.useCallback((H) => {
    H && (Y.current = H.conversationId || null, B.current = !1, M.current = "", h(H.id), g(io(H.messages)), w(_n(H.suggestions)));
  }, []), X = k.useCallback((H) => {
    if (!H || q.current)
      return;
    if (H === ne.current) {
      Bi();
      return;
    }
    const O = fl(Z.current, H);
    if (!O) return;
    const F = {
      ...O,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    u((z) => xf(z, H, {
      updatedAt: F.updatedAt
    })), ie(F), Bi();
  }, [ie]), ye = k.useCallback(() => {
    if (q.current) return;
    const H = xs();
    u(
      (O) => yr([H, ...O]).slice(0, so)
    ), ie(H), Bi();
  }, [ie]), De = k.useCallback((H) => {
    if (!H || q.current) return;
    const O = yr(
      Z.current.filter((A) => A.id !== H)
    ), F = O.length > 0 ? O : [xs()], z = H === ne.current, E = fl(F, ne.current) || F[0];
    u(F), (z || E.id !== ne.current) && ie(E), Bi();
  }, [ie]);
  k.useEffect(() => {
    if (typeof window > "u") return;
    const H = (z) => {
      X(z.detail?.sessionId || "");
    }, O = () => {
      ye();
    }, F = (z) => {
      De(z.detail?.sessionId || "");
    };
    return window.addEventListener(mf, H), window.addEventListener(gf, O), window.addEventListener(yf, F), () => {
      window.removeEventListener(mf, H), window.removeEventListener(gf, O), window.removeEventListener(yf, F);
    };
  }, [ye, De, X]);
  const Ne = k.useCallback((H) => {
    g(Tf(H, B.current));
  }, []), Fe = k.useCallback((H, O) => {
    g(
      (F) => F.map((z) => z.id !== H ? z : O(z))
    );
  }, []), Be = k.useCallback(async () => {
    const H = R.current, O = j.current, F = M.current, z = Y.current, E = ae.current;
    H?.abort(), B.current = !0, q.current = !1, v(!1), w([]), O && Fe(
      O,
      (A) => Sl({
        id: A.id,
        text: gr(A.content || []),
        components: A.metadata?.unstable_data || []
      })
    ), !(!F || !r.apiEndpoint) && await Uw({
      apiEndpoint: r.apiEndpoint,
      taskId: F,
      sessionId: E,
      conversationId: z
    });
  }, [r.apiEndpoint, Fe]), He = k.useCallback(
    async (H) => {
      if (H.role !== "user")
        throw new Error("AskCrystal homepage only supports user-authored messages.");
      if (Fh(r) === "home") {
        const J = gr(H.content || []);
        if (nw(r, J))
          return;
      }
      const O = Vw(H), F = _r("assistant"), z = new AbortController(), E = Ln({
        id: F,
        status: {
          type: "running"
        },
        statusText: "Settling into your energy...",
        statusStage: "listen",
        statusHistory: [],
        ambientStatusText: "Settling into your energy...",
        statusElapsedMs: 0
      }), A = [...re.current, O];
      R.current = z, j.current = F, M.current = "", B.current = !1, q.current = !0, v(!0), w([]), g([...A, E]);
      let te = "", se = [], le = [];
      try {
        const J = await Gw({
          config: r,
          messages: A,
          abortSignal: z.signal,
          conversationId: Y.current,
          sessionId: ae.current,
          onStatus: (ue) => {
            if (z.signal.aborted) return;
            const he = bw(ue);
            he.taskId && (M.current = he.taskId), Fe(
              F,
              (Ut) => Ln({
                id: F,
                parts: hr({
                  text: "",
                  components: []
                }),
                components: [],
                status: {
                  type: "running"
                },
                statusText: he.message,
                statusStage: he.stage,
                statusTool: he.tool,
                statusHistory: Ww(Ut.metadata?.custom?.statusHistoryText, he),
                ambientStatusText: he.stage === "tool" ? Ut.metadata?.custom?.ambientStatusText || "Settling into your energy..." : he.message,
                statusElapsedMs: he.elapsedMs
              })
            );
          },
          onComponents: (ue, he, Ut) => {
            if (z.signal.aborted) return;
            const xr = Kh(Ut);
            xr && (M.current = xr), se = ue;
          },
          onSuggestions: (ue) => {
            z.signal.aborted || (le = _n(ue));
          }
        });
        Y.current = J.conversationId || Y.current, M.current = "", B.current = !1;
        const me = J.components || se, fe = _n(
          J.suggestions?.length ? J.suggestions : le
        );
        if (Fe(
          F,
          () => Ln({
            id: F,
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
        ), te = await Bw({
          currentAnswer: "",
          nextAnswer: J.answer,
          abortSignal: z.signal,
          speed: "final",
          onDelta: (ue, he) => {
            z.signal.aborted || (te = he, Fe(
              F,
              () => Ln({
                id: F,
                parts: hr({
                  text: he,
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
        }), g([
          ...A,
          Ln({
            id: F,
            parts: hr({
              text: te || J.answer || J.sourceText,
              components: me
            }),
            components: me,
            status: {
              type: "complete",
              reason: "stop"
            }
          })
        ]), w(fe), J.messageId && r.apiEndpoint) {
          const ue = ne.current;
          $w({
            apiEndpoint: r.apiEndpoint,
            messageId: J.messageId,
            sessionId: ae.current
          }).then((he) => {
            he.length && ne.current === ue && w(he);
          });
        }
      } catch (J) {
        if (J?.name === "AbortError") {
          M.current = "", w([]), g([
            ...A,
            Sl({
              id: F,
              text: te,
              components: []
            })
          ]);
          return;
        }
        console.error("[AskCrystal] Assistant runtime failed.", J), M.current = "", B.current = !1, w([]), g([
          ...A,
          Ln({
            id: F,
            text: "The guide hit a runtime issue before finishing the reply. Please try again.",
            status: {
              type: "incomplete",
              reason: "error",
              error: J?.message || "Unknown runtime error"
            },
            error: J?.message || "Unknown runtime error"
          })
        ]);
      } finally {
        R.current === z && (R.current = null), j.current === F && (j.current = ""), M.current && z.signal.aborted && (M.current = ""), q.current = !1, v(!1);
      }
    },
    [r, Fe]
  ), dt = k.useCallback((H) => {
    const O = typeof H == "string" ? H.trim() : "";
    !O || q.current || He({
      role: "user",
      content: [
        {
          type: "text",
          text: O
        }
      ],
      metadata: {
        custom: {
          source: "suggestion"
        }
      }
    });
  }, [He]), Ve = k.useMemo(
    () => ({
      messages: p,
      suggestions: _,
      isRunning: C,
      setMessages: Ne,
      onImport: Ne,
      onNew: He,
      onCancel: Be,
      adapters: {
        threadList: {
          threadId: d || W_,
          threads: Hh(a).map((H) => ({
            id: H.id,
            remoteId: H.id,
            title: H.title
          }))
        }
      }
    }),
    [d, C, p, Be, He, Ne, a, _]
  );
  return {
    runtime: Jg(Ve),
    hasUserMessages: p.some((H) => H.role === "user"),
    activeSessionId: d,
    sendPrompt: dt,
    onCancel: Be,
    isRunning: C
  };
}
function qw({ product: r }) {
  return /* @__PURE__ */ m.jsxs("a", { className: "ac-homepage__product-card", href: r.url, role: "listitem", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-media", children: r.image ? /* @__PURE__ */ m.jsx("img", { src: r.image, alt: r.title, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-placeholder", children: "Crystal" }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__product-copy", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__product-meta", children: r.badge || "Bestseller" }),
      /* @__PURE__ */ m.jsx("h3", { children: r.title }),
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__product-link", children: "View product" })
    ] })
  ] });
}
function Qw({ config: r }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-shelf", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "ac-homepage__guide-shelf-header", children: [
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx("p", { className: "ac-homepage__shelf-kicker", children: "Best sellers" }),
        /* @__PURE__ */ m.jsx("h2", { children: r.shelfHeading })
      ] }),
      /* @__PURE__ */ m.jsx("a", { className: "ac-homepage__browse-link", href: r.browseUrl, children: "Browse all" })
    ] }),
    r.products.length ? /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__product-carousel", role: "list", "aria-label": "Featured store products", children: r.products.map((n) => /* @__PURE__ */ m.jsx(qw, { product: n }, n.id)) }) : /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__empty-shelf", children: "Add a featured collection in the section settings to populate the welcome shelf." })
  ] });
}
function Kw({ card: r }) {
  const { sendPrompt: n, isRunning: i } = Dl(), a = [
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
function Jw({ config: r }) {
  const n = typeof r.headingLine1 == "string" ? r.headingLine1.trim() : "", i = typeof r.headingLine2Prefix == "string" ? r.headingLine2Prefix.trim() : "", a = typeof r.headingAccent == "string" ? r.headingAccent.trim() : "", u = typeof r.headingSuffix == "string" ? r.headingSuffix.trim() : "", d = a && u.toLowerCase().startsWith(`${a.toLowerCase()} `) ? u.slice(a.length).trimStart() : u, h = !!(n || i || a || d), p = [n, i].filter(Boolean).join(" "), g = (w, C) => {
    if (!w) return null;
    const v = Array.from(w.matchAll(/\byou\b/gi));
    if (!v.length)
      return w;
    const R = [];
    let j = 0;
    return v.forEach((M, B) => {
      const Y = M.index ?? 0;
      Y > j && R.push(
        /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-copy", children: w.slice(j, Y) }, `${C}-copy-${B}`)
      ), R.push(
        /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-accent", children: M[0] }, `${C}-accent-${B}`)
      ), j = Y + M[0].length;
    }), j < w.length && R.push(
      /* @__PURE__ */ m.jsx("span", { className: "ac-homepage__guide-title-copy", children: w.slice(j) }, `${C}-copy-tail`)
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
      _.map((w) => /* @__PURE__ */ m.jsx(Kw, { card: w }, w.id)),
      /* @__PURE__ */ m.jsx(Qw, { config: r })
    ] })
  ] }) });
}
function Xw() {
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
  }, [a]), /* @__PURE__ */ m.jsx(yh, { className: "ac-homepage__composer", "aria-label": "Message AskCrystal", children: /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: `ac-homepage__composer-shell${n ? " ac-homepage__composer-shell--overflowing" : ""}`,
      children: [
        /* @__PURE__ */ m.jsx(
          _h,
          {
            ref: r,
            className: "ac-homepage__composer-input",
            placeholder: "ask me anything",
            minRows: 1,
            maxRows: Q_,
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
          /* @__PURE__ */ m.jsx(yl, { running: !1, children: /* @__PURE__ */ m.jsx(Nv, { className: "ac-homepage__composer-send", "aria-label": "Send message", children: /* @__PURE__ */ m.jsx("span", { "aria-hidden": "true", children: "↑" }) }) }),
          /* @__PURE__ */ m.jsx(yl, { running: !0, children: /* @__PURE__ */ m.jsx(Jv, { className: "ac-homepage__composer-cancel", children: "Stop" }) })
        ] })
      ]
    }
  ) });
}
function Zw() {
  return typeof document > "u" ? null : ig.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__composer-dock", children: /* @__PURE__ */ m.jsx(Xw, {}) }),
    document.body
  );
}
function eS() {
  return /* @__PURE__ */ m.jsx(Pl, { className: "ac-message ac-message--user", children: /* @__PURE__ */ m.jsx("div", { className: "ac-message__bubble ac-message__bubble--user", children: /* @__PURE__ */ m.jsx(jl, {}) }) });
}
function tS() {
  const { sendPrompt: r, isRunning: n } = Dl(), i = zt((p) => p.id || ""), a = zt((p) => p.status?.type === "complete"), u = Se(({ thread: p }) => p.suggestions || []), d = Se(({ thread: p }) => p.isRunning), h = Se(({ thread: p }) => {
    for (let g = p.messages.length - 1; g >= 0; g -= 1) {
      const _ = p.messages[g];
      if (_?.role === "assistant")
        return _.id === i;
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
function nS() {
  const r = zt((v) => v.content || v.parts || []), n = gr(r), i = r.some((v) => v.type === "tool-call"), a = zt((v) => v.status?.type === "running"), u = zt((v) => v.metadata?.custom?.statusText || ""), d = zt((v) => v.metadata?.custom?.statusStage || ""), h = zt((v) => v.metadata?.custom?.statusTool || ""), p = zt((v) => v.metadata?.custom?.statusHistoryText || ""), g = zt((v) => v.metadata?.custom?.ambientStatusText || ""), _ = zt((v) => v.metadata?.custom?.statusElapsedMs || 0), w = a && !n && !i, C = a && (!!n || i) && d === "tool" && !!u;
  return /* @__PURE__ */ m.jsxs(Pl, { className: "ac-message ac-message--assistant", children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-message__label", children: "AskCrystal Guide" }),
    /* @__PURE__ */ m.jsx("div", { className: "ac-message__bubble ac-message__bubble--assistant", children: w ? /* @__PURE__ */ m.jsx(
      kw,
      {
        statusText: u,
        statusHistoryText: p,
        statusStage: d,
        statusTool: h,
        ambientStatusText: g,
        statusElapsedMs: _
      }
    ) : /* @__PURE__ */ m.jsx("div", { className: "ac-message__content-layer", children: /* @__PURE__ */ m.jsx(
      jl,
      {
        components: {
          Text: ({ text: v }) => /* @__PURE__ */ m.jsx(Vh, { text: v }),
          ...V_
        }
      }
    ) }) }),
    C ? /* @__PURE__ */ m.jsx("div", { className: "ac-message__status", children: /* @__PURE__ */ m.jsx(Sw, { statusText: u }) }) : null,
    /* @__PURE__ */ m.jsx(tS, {}),
    /* @__PURE__ */ m.jsx(mh, { children: /* @__PURE__ */ m.jsx("div", { className: "ac-message__error", children: "The response was interrupted. You can retry from the composer below." }) })
  ] });
}
function rS({ config: r }) {
  const n = typeof r.chatHeading == "string" && r.chatHeading.trim() ? r.chatHeading.trim() : "AskCrystal reading room", i = typeof r.chatDescription == "string" && r.chatDescription.trim() ? r.chatDescription.trim() : "Ask a question, name a feeling, or continue your last thread.", a = typeof r.homeUrl == "string" && r.homeUrl.trim() ? r.homeUrl.trim() : "/", u = typeof r.browseUrl == "string" && r.browseUrl.trim() ? r.browseUrl.trim() : "/collections";
  return /* @__PURE__ */ m.jsxs("header", { className: "ac-chat-page__header", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "ac-chat-page__header-copy", children: [
      /* @__PURE__ */ m.jsx("p", { className: "ac-chat-page__kicker", children: "AskCrystal" }),
      /* @__PURE__ */ m.jsx("h1", { children: n }),
      /* @__PURE__ */ m.jsx("p", { children: i })
    ] }),
    /* @__PURE__ */ m.jsxs("nav", { className: "ac-chat-page__nav", "aria-label": "AskCrystal page shortcuts", children: [
      /* @__PURE__ */ m.jsx("a", { href: a, children: "Guide" }),
      /* @__PURE__ */ m.jsx("a", { href: u, children: "Shop crystals" })
    ] })
  ] });
}
function sS() {
  const { sendPrompt: r, isRunning: n } = Dl(), i = [
    "Give me a reading for what I need today.",
    "Help me find a crystal for calm sleep.",
    "Can you do a Bazi reading?"
  ];
  return /* @__PURE__ */ m.jsxs("section", { className: "ac-chat-page__empty", "aria-label": "Start an AskCrystal reading", children: [
    /* @__PURE__ */ m.jsx("p", { className: "ac-chat-page__empty-kicker", children: "Reading room is open" }),
    /* @__PURE__ */ m.jsx("h2", { children: "Begin with a feeling, a question, or a sign you keep noticing." }),
    /* @__PURE__ */ m.jsx("div", { className: "ac-chat-page__starter-row", children: i.map((a) => /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        disabled: n,
        onClick: () => r(a),
        children: a
      },
      a
    )) })
  ] });
}
function iS({ config: r }) {
  const { runtime: n, hasUserMessages: i, activeSessionId: a, sendPrompt: u, onCancel: d, isRunning: h } = Yw(r), p = k.useMemo(() => ({
    sendPrompt: u,
    onCancel: d,
    isRunning: h
  }), [h, d, u]), g = Fh(r), _ = g === "chat", w = _ && i, C = k.useRef(null), v = k.useRef(null), R = k.useRef(!1), j = k.useRef(!1);
  return k.useEffect(() => {
    if (!_ || j.current || h) return;
    j.current = !0;
    const M = rw();
    if (!M) return;
    const B = window.setTimeout(() => {
      u(M);
    }, 80);
    return () => window.clearTimeout(B);
  }, [_, h, u]), k.useEffect(() => {
    if (!v.current) return;
    const B = window.requestAnimationFrame(() => {
      if (v.current) {
        if (!w) {
          R.current = !1, v.current.scrollTo({ top: 0, behavior: "auto" });
          return;
        }
        R.current || (R.current = !0, v.current.scrollTo({ top: v.current.scrollHeight, behavior: "auto" }));
      }
    });
    return () => window.cancelAnimationFrame(B);
  }, [a, w]), k.useEffect(() => {
    const M = C.current, B = v.current;
    if (!M || !B || typeof window > "u") return;
    const Y = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let re = 0;
    const Z = () => {
      re = 0;
      const q = Math.max(180, Math.min(320, B.clientHeight * 0.4)), ae = Y?.matches ? 0 : Math.min(54, B.scrollTop * 0.18), ie = Math.max(0, 1 - B.scrollTop / q);
      M.style.setProperty("--ac-homepage-backdrop-offset", `${ae.toFixed(2)}px`), M.style.setProperty("--ac-homepage-backdrop-opacity", ie.toFixed(3));
    }, ne = () => {
      re || (re = window.requestAnimationFrame(Z));
    };
    return Z(), B.addEventListener("scroll", ne, { passive: !0 }), () => {
      B.removeEventListener("scroll", ne), re && window.cancelAnimationFrame(re);
    };
  }, [a]), /* @__PURE__ */ m.jsx(Lh.Provider, { value: p, children: /* @__PURE__ */ m.jsx(Jy, { runtime: n, children: /* @__PURE__ */ m.jsxs("div", { ref: C, className: `ac-homepage ac-homepage--${g}`, children: [
    /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__backdrop", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("img", { src: q_, alt: "", loading: "eager", decoding: "async" }) }),
    /* @__PURE__ */ m.jsx(wh, { className: "ac-homepage__thread", children: /* @__PURE__ */ m.jsxs(
      xh,
      {
        ref: v,
        className: "ac-homepage__viewport",
        autoScroll: w,
        turnAnchor: w ? "bottom" : "top",
        scrollToBottomOnInitialize: !1,
        scrollToBottomOnRunStart: w,
        scrollToBottomOnThreadSwitch: w,
        children: [
          _ ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(rS, { config: r }),
            i ? null : /* @__PURE__ */ m.jsx(sS, {})
          ] }) : /* @__PURE__ */ m.jsx(Jw, { config: r }),
          _ ? /* @__PURE__ */ m.jsx("div", { className: "ac-homepage__messages", children: /* @__PURE__ */ m.jsx(
            i_,
            {
              components: {
                UserMessage: eS,
                AssistantMessage: nS
              }
            }
          ) }) : null,
          /* @__PURE__ */ m.jsx(Zw, {})
        ]
      }
    ) })
  ] }) }) });
}
function oS(r) {
  const n = r.getAttribute("data-config-id"), i = r.getAttribute("data-section-id") || n;
  if (!n || Ji.has(i)) return;
  const a = K_(n);
  if (!a) return;
  const u = sg.createRoot(r);
  u.render(/* @__PURE__ */ m.jsx(iS, { config: a })), Ji.set(i, u);
}
function aS(r) {
  const n = r.getAttribute("data-section-id");
  if (!n) return;
  const i = Ji.get(n);
  i && (i.unmount(), Ji.delete(n));
}
function Xh(r = document) {
  r.querySelectorAll(Nh).forEach((n) => oS(n));
}
function lS(r) {
  r.querySelectorAll(Nh).forEach((n) => aS(n));
}
Xh();
document.addEventListener("shopify:section:load", (r) => {
  Xh(r.target);
});
document.addEventListener("shopify:section:unload", (r) => {
  lS(r.target);
});
