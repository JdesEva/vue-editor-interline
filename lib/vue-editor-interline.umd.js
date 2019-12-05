(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-editor-interline"] = factory();
	else
		root["vue-editor-interline"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "454f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("46a7");
var $Object = __webpack_require__("584a").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "46a7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("8e60"), 'Object', { defineProperty: __webpack_require__("d9f6").f });


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4dc3":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";function l(t){return!!t&&(t instanceof HTMLCollection||t instanceof NodeList)}var a=[];function u(t){if(t){if(t instanceof u)return t;var e,n,i,o,a=(this.selector=t).nodeType,r=[];9===a?r=[t]:1===a?r=[t]:l(t)||t instanceof Array?r=t:"string"==typeof t&&(r=0===(t=t.replace("/\n/mg","").trim()).indexOf("<")?(i=t,(o=document.createElement("div")).innerHTML=i,o.children):(e=t,l(n=document.querySelectorAll(e))?n:[n]));var c,s=r.length;if(!s)return this;for(c=0;c<s;c++)this[c]=r[c];this.length=s}}function v(t){return new u(t)}u.prototype={constructor:u,forEach:function(t){var e;for(e=0;e<this.length;e++){var n=this[e];if(!1===t.call(n,n,e))break}return this},clone:function(e){var n=[];return this.forEach(function(t){n.push(t.cloneNode(!!e))}),v(n)},get:function(t){var e=this.length;return e<=t&&(t%=e),v(this[t])},first:function(){return this.get(0)},last:function(){var t=this.length;return this.get(t-1)},on:function(t,n,i){i||(i=n,n=null);var o=[];return o=t.split(/\s+/),this.forEach(function(e){o.forEach(function(t){t&&(a.push({elem:e,type:t,fn:i}),n?e.addEventListener(t,function(t){var e=t.target;e.matches(n)&&i.call(e,t)}):e.addEventListener(t,i))})})},off:function(e,n){return this.forEach(function(t){t.removeEventListener(e,n)})},attr:function(e,n){return null==n?this[0].getAttribute(e):this.forEach(function(t){t.setAttribute(e,n)})},addClass:function(n){return n?this.forEach(function(t){var e;t.className?((e=(e=t.className.split(/\s/)).filter(function(t){return!!t.trim()})).indexOf(n)<0&&e.push(n),t.className=e.join(" ")):t.className=n}):this},removeClass:function(n){return n?this.forEach(function(t){var e;t.className&&(e=(e=t.className.split(/\s/)).filter(function(t){return!(!(t=t.trim())||t===n)}),t.className=e.join(" "))}):this},css:function(i,t){var o="".concat(i,":").concat(t,";");return this.forEach(function(t){var e=(t.getAttribute("style")||"").trim(),n=[];e?(e.split(";").forEach(function(t){var e=t.split(":").map(function(t){return t.trim()});2===e.length&&n.push(e[0]+":"+e[1])}),(n=n.map(function(t){return 0===t.indexOf(i)?o:t})).indexOf(o)<0&&n.push(o),t.setAttribute("style",n.join("; "))):t.setAttribute("style",o)})},show:function(){return this.css("display","block")},hide:function(){return this.css("display","none")},children:function(){var t=this[0];return t?v(t.children):null},childNodes:function(){var t=this[0];return t?v(t.childNodes):null},append:function(t){return this.forEach(function(e){t.forEach(function(t){e.appendChild(t)})})},remove:function(){return this.forEach(function(t){if(t.remove)t.remove();else{var e=t.parentElement;e&&e.removeChild(t)}})},isContain:function(t){var e=this[0],n=t[0];return e.contains(n)},getSizeData:function(){return this[0].getBoundingClientRect()},getNodeName:function(){return this[0].nodeName},find:function(t){return v(this[0].querySelectorAll(t))},text:function(e){return e?this.forEach(function(t){t.innerHTML=e}):this[0].innerHTML.replace(/<.*?>/g,function(){return""})},html:function(t){var e=this[0];return null==t?e.innerHTML:(e.innerHTML=t,this)},val:function(){return this[0].value.trim()},focus:function(){return this.forEach(function(t){t.focus()})},parent:function(){return v(this[0].parentElement)},parentUntil:function(t,e){var n=document.querySelectorAll(t),i=n.length;if(!i)return null;var o=e||this[0];if("BODY"===o.nodeName)return null;var a,r=o.parentElement;for(a=0;a<i;a++)if(r===n[a])return v(r);return this.parentUntil(t,r)},equal:function(t){return 1===t.nodeType?this[0]===t:this[0]===t[0]},insertBefore:function(t){var e=v(t)[0];return e?this.forEach(function(t){e.parentNode.insertBefore(t,e)}):this},insertAfter:function(t){var n=v(t)[0];return n?this.forEach(function(t){var e=n.parentNode;e.lastChild===n?e.appendChild(t):e.insertBefore(t,n.nextSibling)}):this}},v.offAll=function(){a.forEach(function(t){var e=t.elem,n=t.type,i=t.fn;e.removeEventListener(n,i)})};var e={menus:["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","video","code","undo","redo"],fontNames:["宋体","微软雅黑","Arial","Tahoma","Verdana"],colors:["#000000","#eeece0","#1c487f","#4d80bf","#c24f4a","#8baa4a","#7b5ba1","#46acc8","#f9963b","#ffffff"],emotions:[{title:"默认",type:"image",content:[{alt:"[坏笑]",src:"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png"},{alt:"[舔屏]",src:"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png"},{alt:"[污]",src:"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png"}]},{title:"新浪",type:"image",content:[{src:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif",alt:"[草泥马]"},{src:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif",alt:"[神马]"},{src:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif",alt:"[浮云]"}]},{title:"emoji",type:"emoji",content:"😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐".split(/\s/)}],zIndex:1e4,debug:!1,linkCheck:function(){return!0},linkImgCheck:function(){return!0},pasteFilterStyle:!0,pasteIgnoreImg:!1,pasteTextHandle:function(t){return t},showLinkImg:!0,linkImgCallback:function(){},uploadImgMaxSize:5242880,uploadImgShowBase64:!1,uploadFileName:"",uploadImgParams:{},uploadImgHeaders:{},withCredentials:!1,uploadImgTimeout:1e4,uploadImgHooks:{before:function(){},success:function(){},fail:function(){},error:function(){},timeout:function(){}},qiniu:!1},d={_ua:navigator.userAgent,isWebkit:function(){return/webkit/i.test(this._ua)},isIE:function(){return"ActiveXObject"in window}};function E(t,e){var n;for(n in t)if(t.hasOwnProperty(n)&&!1===e.call(t,n,t[n]))break}function k(t,e){var n,i,o=t.length||0;for(n=0;n<o&&(i=t[n],!1!==e.call(t,i,n));n++);}function h(t){return t+Math.random().toString().slice(2)}function f(t){return null==t?"":t.replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace(/(\r\n|\r|\n)/g,"<br/>")}function m(t){return"function"==typeof t}function p(){return"xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})}function t(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-bold"></i>\n        </div>'),this.type="click",this._active=!1}function g(t,e){var n=t.config.langArgs||[],i=e;return n.forEach(function(t){var e=t.reg,n=t.val;e.test(i)&&(i=i.replace(e,function(){return n}))}),i}t.prototype={constructor:t,onClick:function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("bold"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(){var t=this.editor,e=this.$elem;t.cmd.queryCommandState("bold")?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}};var y=function(){};function i(t,e){var a=this,r=t.editor;this.menu=t,this.opt=e;var n,i=v('<div class="w-e-droplist"></div>'),o=e.$title;o&&(n=o.html(),n=g(r,n),o.html(n),o.addClass("w-e-dp-title"),i.append(o));var c=e.list||[],s=e.type||"list",l=e.onClick||y,u=v('<ul class="'+("list"===s?"w-e-list":"w-e-block")+'"></ul>');i.append(u),c.forEach(function(t){var e=t.$elem,n=e.html();n=g(r,n),e.html(n);var i=t.value,o=v('<li class="w-e-item"></li>');e&&(o.append(e),u.append(o),o.on("click",function(t){l(i),a.hideTimeoutId=setTimeout(function(){a.hide()},0)}))}),i.on("mouseleave",function(t){a.hideTimeoutId=setTimeout(function(){a.hide()},0)}),this.$container=i,this._rendered=!1,this._show=!1}function n(t){var e=this;this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-header"></i></div>'),this.type="droplist",this._active=!1,this.droplist=new i(this,{width:100,$title:v("<p>设置标题</p>"),type:"list",list:[{$elem:v("<h1>H1</h1>"),value:"<h1>"},{$elem:v("<h2>H2</h2>"),value:"<h2>"},{$elem:v("<h3>H3</h3>"),value:"<h3>"},{$elem:v("<h4>H4</h4>"),value:"<h4>"},{$elem:v("<h5>H5</h5>"),value:"<h5>"},{$elem:v("<p>正文</p>"),value:"<p>"}],onClick:function(t){e._command(t)}})}function o(t){var e=this;this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-text-heigh"></i></div>'),this.type="droplist",this._active=!1,this.droplist=new i(this,{width:160,$title:v("<p>字号</p>"),type:"list",list:[{$elem:v('<span style="font-size: x-small;">x-small</span>'),value:"1"},{$elem:v('<span style="font-size: small;">small</span>'),value:"2"},{$elem:v("<span>normal</span>"),value:"3"},{$elem:v('<span style="font-size: large;">large</span>'),value:"4"},{$elem:v('<span style="font-size: x-large;">x-large</span>'),value:"5"},{$elem:v('<span style="font-size: xx-large;">xx-large</span>'),value:"6"}],onClick:function(t){e._command(t)}})}function r(t){var e=this;this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-font"></i></div>'),this.type="droplist",this._active=!1;var n=t.config.fontNames||[];this.droplist=new i(this,{width:100,$title:v("<p>字体</p>"),type:"list",list:n.map(function(t){return{$elem:v('<span style="font-family: '.concat(t,';">').concat(t,"</span>")),value:t}}),onClick:function(t){e._command(t)}})}function S(t){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}i.prototype={constructor:i,show:function(){this.hideTimeoutId&&clearTimeout(this.hideTimeoutId);var t=this.menu.$elem,e=this.$container;if(!this._show){if(this._rendered)e.show();else{var n=t.getSizeData().height||0,i=this.opt.width||100;e.css("margin-top",n+"px").css("width",i+"px"),t.append(e),this._rendered=!0}this._show=!0}},hide:function(){this.showTimeoutId&&clearTimeout(this.showTimeoutId);var t=this.$container;this._show&&(t.hide(),this._show=!1)}},n.prototype={constructor:n,_command:function(t){var e=this.editor,n=e.selection.getSelectionContainerElem();e.$textElem.equal(n)||e.cmd.do("formatBlock",t)},tryChangeActive:function(){var t=this.editor,e=this.$elem,n=t.cmd.queryCommandValue("formatBlock");/^h/i.test(n)?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}},o.prototype={constructor:o,_command:function(t){this.editor.cmd.do("fontSize",t)}},r.prototype={constructor:r,_command:function(t){this.editor.cmd.do("fontName",t)}};function w(){}var _=[];function b(t,e){this.menu=t,this.opt=e}function c(t){this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-link"></i></div>'),this.type="panel",this._active=!1}b.prototype={constructor:b,show:function(){var a=this,t=this.menu;if(!(0<=_.indexOf(t))){var r=t.editor,e=v("body"),n=r.$textContainerElem,i=this.opt,o=v('<div class="w-e-panel-container"></div>'),c=i.width||300;o.css("width",c+"px").css("margin-left",(0-c)/2+"px");var s=v('<i class="w-e-icon-close w-e-panel-close"></i>');o.append(s),s.on("click",function(){a.hide()});var l=v('<ul class="w-e-panel-tab-title"></ul>'),u=v('<div class="w-e-panel-tab-content"></div>');o.append(l).append(u);var d=i.height;d&&u.css("height",d+"px").css("overflow-y","auto");var h=i.tabs||[],f=[],m=[];h.forEach(function(t,e){if(t){var n=t.title||"",i=t.tpl||"";n=g(r,n),i=g(r,i);var o=v('<li class="w-e-item">'.concat(n,"</li>"));l.append(o);var a=v(i);u.append(a),o._index=e,f.push(o),m.push(a),0===e?(o._active=!0,o.addClass("w-e-active")):a.hide(),o.on("click",function(t){o._active||(f.forEach(function(t){t._active=!1,t.removeClass("w-e-active")}),m.forEach(function(t){t.hide()}),o._active=!0,o.addClass("w-e-active"),a.show())})}}),o.on("click",function(t){t.stopPropagation()}),e.on("click",function(t){a.hide()}),n.append(o),h.forEach(function(t,o){t&&(t.events||[]).forEach(function(t){var e=t.selector,n=t.type,i=t.fn||w;m[o].find(e).on(n,function(t){t.stopPropagation(),i(t)&&a.hide()})})});var p=o.find("input[type=text],textarea");p.length&&p.get(0).focus(),this.$container=o,this._hideOtherPanels(),_.push(t)}},hide:function(){var e=this.menu,t=this.$container;t&&t.remove(),_=_.filter(function(t){return t!==e})},_hideOtherPanels:function(){_.length&&_.forEach(function(t){var e=t.panel||{};e.hide&&e.hide()})}};var C=window.alert;function s(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-italic"></i>\n        </div>'),this.type="click",this._active=!1}function x(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-redo"></i>\n        </div>'),this.type="click",this._active=!1}function $(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-strikethrough"></i>\n        </div>'),this.type="click",this._active=!1}function T(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-underline"></i>\n        </div>'),this.type="click",this._active=!1}function I(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-undo"></i>\n        </div>'),this.type="click",this._active=!1}function R(t){var e=this;this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-list2"></i></div>'),this.type="droplist",this._active=!1,this.droplist=new i(this,{width:120,$title:v("<p>设置列表</p>"),type:"list",list:[{$elem:v('<span><i class="w-e-icon-list-numbered"></i> 有序列表</span>'),value:"insertOrderedList"},{$elem:v('<span><i class="w-e-icon-list2"></i> 无序列表</span>'),value:"insertUnorderedList"}],onClick:function(t){e._command(t)}})}function N(t){var e=this;this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-paragraph-left"></i></div>'),this.type="droplist",this._active=!1,this.droplist=new i(this,{width:100,$title:v("<p>对齐方式</p>"),type:"list",list:[{$elem:v('<span><i class="w-e-icon-paragraph-left"></i> 靠左</span>'),value:"justifyLeft"},{$elem:v('<span><i class="w-e-icon-paragraph-center"></i> 居中</span>'),value:"justifyCenter"},{$elem:v('<span><i class="w-e-icon-paragraph-right"></i> 靠右</span>'),value:"justifyRight"}],onClick:function(t){e._command(t)}})}function L(t){var e=this;this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-pencil2"></i></div>'),this.type="droplist";var n=t.config.colors||[];this._active=!1,this.droplist=new i(this,{width:120,$title:v("<p>文字颜色</p>"),type:"inline-block",list:n.map(function(t){return{$elem:v('<i style="color:'.concat(t,';" class="w-e-icon-pencil2"></i>')),value:t}}),onClick:function(t){e._command(t)}})}function H(t){var e=this;this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-paint-brush"></i></div>'),this.type="droplist";var n=t.config.colors||[];this._active=!1,this.droplist=new i(this,{width:120,$title:v("<p>背景色</p>"),type:"inline-block",list:n.map(function(t){return{$elem:v('<i style="color:'.concat(t,';" class="w-e-icon-paint-brush"></i>')),value:t}}),onClick:function(t){e._command(t)}})}function A(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-quotes-left"></i>\n        </div>'),this.type="click",this._active=!1}function D(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-terminal"></i>\n        </div>'),this.type="panel",this._active=!1}function M(t){this.editor=t,this.$elem=v('<div class="w-e-menu">\n            <i class="w-e-icon-happy"></i>\n        </div>'),this.type="panel",this._active=!1}function P(t){this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-table2"></i></div>'),this.type="panel",this._active=!1}function q(t){this.editor=t,this.$elem=v('<div class="w-e-menu"><i class="w-e-icon-play"></i></div>'),this.type="panel",this._active=!1}function O(t){this.editor=t;var e=h("w-e-img");this.$elem=v('<div class="w-e-menu" id="'+e+'"><i class="w-e-icon-image"></i></div>'),t.imgMenuId=e,this.type="panel",this._active=!1}c.prototype={constructor:c,onClick:function(){var t,e=this.editor;if(this._active){if(!(t=e.selection.getSelectionContainerElem()))return;e.selection.createRangeByElem(t),e.selection.restoreSelection(),this._createPanel(e.selection.getSelectionText(),t.attr("href"))}else e.selection.isSelectionEmpty()?this._createPanel("",""):this._createPanel(e.selection.getSelectionText(),"")},_createPanel:function(a,t){var r=this,c=h("input-link"),s=h("input-text"),e=h("btn-ok"),n=h("btn-del"),i=this._active?"inline-block":"none",o=new b(this,{width:300,tabs:[{title:"链接",tpl:'<div>\n                    <input id="'.concat(s,'" type="text" class="').concat("object"===S(a)?"hidden":"block",'" value="').concat(a,'" placeholder="链接文字"/></td>\n                    <input id="').concat(c,'" type="text" class="block" value="').concat(t,'" placeholder="请输入链接"/></td>\n                    <div class="w-e-button-container">\n                        <button id="').concat(e,'" class="right">插入</button>\n                        <button id="').concat(n,'" class="gray right" style="display:').concat(i,'">删除链接</button>\n                    </div>\n                </div>'),events:[{selector:"#"+e,type:"click",fn:function(){if("object"===S(a)){var t=v("#"+c).val();r._insertLink(-1,t)}else{var e=v("#"+c),n=v("#"+s),i=e.val(),o=n.val();r._insertLink(o,i)}return!0}},{selector:"#"+n,type:"click",fn:function(){return r._delLink(),!0}}]}]});o.show(),this.panel=o},_delLink:function(){if(this._active){var t=this.editor;if(t.selection.getSelectionContainerElem()){var e=t.selection.getSelectionText();t.cmd.do("insertHTML","<span>"+e+"</span>")}}},_insertLink:function(t,e){var n=this.editor,i=n.config.linkCheck,o=!0;if(-1===t){var a=n.selection.getSelectionText(),r=a.querySelector("a");if(r){document.getElementById(r.id).href=e}else{var c=p();n.cmd.do("insertHTML",'<a href="'.concat(e,'" target="_blank" id="').concat(c,'"></a>'));var s=document.getElementById(c);s.appendChild(a)}}else i&&"function"==typeof i&&(o=i(t,e)),!0===o?n.cmd.do("insertHTML",'<a href="'.concat(e,'" id="').concat(p(),'" target="_blank">').concat(t,"</a>")):C(o)},tryChangeActive:function(){var t=this.editor,e=this.$elem,n=t.selection.getSelectionContainerElem();n&&("A"===n.getNodeName()?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active")))}},s.prototype={constructor:s,onClick:function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("italic"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(){var t=this.editor,e=this.$elem;t.cmd.queryCommandState("italic")?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}},x.prototype={constructor:x,onClick:function(){this.editor.cmd.do("redo")}},$.prototype={constructor:$,onClick:function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("strikeThrough"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(){var t=this.editor,e=this.$elem;t.cmd.queryCommandState("strikeThrough")?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}},T.prototype={constructor:T,onClick:function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("underline"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},tryChangeActive:function(){var t=this.editor,e=this.$elem;t.cmd.queryCommandState("underline")?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}},I.prototype={constructor:I,onClick:function(){this.editor.cmd.do("undo")}},R.prototype={constructor:R,_command:function(t){var e=this.editor,n=e.$textElem;if(e.selection.restoreSelection(),!e.cmd.queryCommandState(t)){e.cmd.do(t);var i=e.selection.getSelectionContainerElem();if("LI"===i.getNodeName()&&(i=i.parent()),!1!==/^ol|ul$/i.test(i.getNodeName())&&!i.equal(n)){var o=i.parent();o.equal(n)||(i.insertAfter(o),o.remove())}}},tryChangeActive:function(){var t=this.editor,e=this.$elem;t.cmd.queryCommandState("insertUnOrderedList")||t.cmd.queryCommandState("insertOrderedList")?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}},N.prototype={constructor:N,_command:function(t){this.editor.cmd.do(t)}},L.prototype={constructor:L,_command:function(t){this.editor.cmd.do("foreColor",t)}},H.prototype={constructor:H,_command:function(t){this.editor.cmd.do("backColor",t)}},A.prototype={constructor:A,onClick:function(){var t,e=this.editor,n=e.selection.getSelectionContainerElem(),i=n.getNodeName();if(d.isIE())return"P"===i?(t=n.text(),v("<blockquote>".concat(t,"</blockquote>")).insertAfter(n),void n.remove()):void("BLOCKQUOTE"===i&&(t=n.text(),v("<p>".concat(t,"</p>")).insertAfter(n),n.remove()));"BLOCKQUOTE"===i?e.cmd.do("formatBlock","<P>"):e.cmd.do("formatBlock","<BLOCKQUOTE>")},tryChangeActive:function(){var t=this.editor,e=this.$elem,n=t.cmd.queryCommandValue("formatBlock");/^BLOCKQUOTE$/i.test(n)?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}},D.prototype={constructor:D,onClick:function(){var t,e=this.editor,n=e.selection.getSelectionStartElem(),i=e.selection.getSelectionEndElem(),o=e.selection.isSelectionEmpty(),a=e.selection.getSelectionText();if(n.equal(i))return o?void(this._active?this._createPanel(n.html()):this._createPanel()):(t=v("<code>".concat(a,"</code>")),e.cmd.do("insertElem",t),e.selection.createRangeByElem(t,!1),void e.selection.restoreSelection());e.selection.restoreSelection()},_createPanel:function(t){var n=this,i=(t=t||"")?"edit":"new",o=h("texxt"),e=h("btn"),a=new b(this,{width:500,tabs:[{title:"插入代码",tpl:'<div>\n                        <textarea id="'.concat(o,'" style="height:145px;;">').concat(t,'</textarea>\n                        <div class="w-e-button-container">\n                            <button id="').concat(e,'" class="right">插入</button>\n                        </div>\n                    <div>'),events:[{selector:"#"+e,type:"click",fn:function(){var t=v("#"+o),e=t.val()||t.html();return e=f(e),"new"==i?n._insertCode(e):n._updateCode(e),!0}}]}]});a.show(),this.panel=a},_insertCode:function(t){this.editor.cmd.do("insertHTML","<pre><code>".concat(t,"</code></pre><p><br></p>"))},_updateCode:function(t){var e=this.editor,n=e.selection.getSelectionContainerElem();n&&(n.html(t),e.selection.restoreSelection())},tryChangeActive:function(){var t=this.editor,e=this.$elem,n=t.selection.getSelectionContainerElem();if(n){var i=n.parent();"CODE"===n.getNodeName()&&"PRE"===i.getNodeName()?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}}},M.prototype={constructor:M,onClick:function(){this._createPanel()},_createPanel:function(){var o=this,t=this.editor.config.emotions||[],a=[];t.forEach(function(t){var e=t.type,n=t.content||[],i="";"emoji"===e&&n.forEach(function(t){t&&(i+='<span class="w-e-item">'+t+"</span>")}),"image"===e&&n.forEach(function(t){var e=t.src,n=t.alt;e&&(i+='<span class="w-e-item"><img src="'+e+'" alt="'+n+'" data-w-e="1"/></span>')}),a.push({title:t.title,tpl:'<div class="w-e-emoticon-container">'.concat(i,"</div>"),events:[{selector:"span.w-e-item",type:"click",fn:function(t){var e,n=v(t.target);return e="IMG"===n.getNodeName()?n.parent().html():"<span>"+n.html()+"</span>",o._insert(e),!0}}]})});var e=new b(this,{width:300,height:200,tabs:a});e.show(),this.panel=e},_insert:function(t){this.editor.cmd.do("insertHTML",t)}},P.prototype={constructor:P,onClick:function(){this._active?this._createEditPanel():this._createInsertPanel()},_createInsertPanel:function(){var n=this,t=h("btn"),i=h("row"),o=h("col"),e=new b(this,{width:250,tabs:[{title:"插入表格",tpl:'<div>\n                        <p style="text-align:left; padding:5px 0;">\n                            创建\n                            <input id="'.concat(i,'" type="text" value="5" style="width:40px;text-align:center;"/>\n                            行\n                            <input id="').concat(o,'" type="text" value="5" style="width:40px;text-align:center;"/>\n                            列的表格\n                        </p>\n                        <div class="w-e-button-container">\n                            <button id="').concat(t,'" class="right">插入</button>\n                        </div>\n                    </div>'),events:[{selector:"#"+t,type:"click",fn:function(){var t=parseInt(v("#"+i).val()),e=parseInt(v("#"+o).val());return t&&e&&0<t&&0<e&&n._insert(t,e),!0}}]}]});e.show(),this.panel=e},_insert:function(t,e){var n,i,o='<table border="0" width="100%" cellpadding="0" cellspacing="0">';for(n=0;n<t;n++){if(o+="<tr>",0===n)for(i=0;i<e;i++)o+="<th>&nbsp;</th>";else for(i=0;i<e;i++)o+="<td>&nbsp;</td>";o+="</tr>"}o+="</table><p><br></p>";var a=this.editor;a.cmd.do("insertHTML",o),a.cmd.do("enableObjectResizing",!1),a.cmd.do("enableInlineTableEditing",!1)},_createEditPanel:function(){var t=this,e=h("add-row"),n=h("add-col"),i=h("del-row"),o=h("del-col"),a=h("del-table");new b(this,{width:320,tabs:[{title:"编辑表格",tpl:'<div>\n                        <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                            <button id="'.concat(e,'" class="left">增加行</button>\n                            <button id="').concat(i,'" class="red left">删除行</button>\n                            <button id="').concat(n,'" class="left">增加列</button>\n                            <button id="').concat(o,'" class="red left">删除列</button>\n                        </div>\n                        <div class="w-e-button-container">\n                            <button id="').concat(a,'" class="gray left">删除表格</button>\n                        </dv>\n                    </div>'),events:[{selector:"#"+e,type:"click",fn:function(){return t._addRow(),!0}},{selector:"#"+n,type:"click",fn:function(){return t._addCol(),!0}},{selector:"#"+i,type:"click",fn:function(){return t._delRow(),!0}},{selector:"#"+o,type:"click",fn:function(){return t._delCol(),!0}},{selector:"#"+a,type:"click",fn:function(){return t._delTable(),!0}}]}]}).show()},_getLocationData:function(){var n={},i=this.editor.selection.getSelectionContainerElem();if(i){var t=i.getNodeName();if("TD"===t||"TH"===t){var o=i.parent(),e=o.children(),a=e.length;e.forEach(function(t,e){if(t===i[0])return!(n.td={index:e,elem:t,length:a})});var r=o.parent().children(),c=r.length;return r.forEach(function(t,e){if(t===o[0])return!(n.tr={index:e,elem:t,length:c})}),n}}},_addRow:function(){var t=this._getLocationData();if(t){var e,n=v(t.tr.elem),i=t.td.length,o=document.createElement("tr"),a="";for(e=0;e<i;e++)a+="<td>&nbsp;</td>";o.innerHTML=a,v(o).insertAfter(n)}},_addCol:function(){var t=this._getLocationData();if(t){var e=t.tr,i=t.td.index;v(e.elem).parent().children().forEach(function(t){var e=v(t).children().get(i),n=e.getNodeName().toLowerCase();v(document.createElement(n)).insertAfter(e)})}},_delRow:function(){var t=this._getLocationData();t&&v(t.tr.elem).remove()},_delCol:function(){var t=this._getLocationData();if(t){var e=t.tr,n=t.td.index;v(e.elem).parent().children().forEach(function(t){v(t).children().get(n).remove()})}},_delTable:function(){var t=this.editor.selection.getSelectionContainerElem();if(t){var e=t.parentUntil("table");e&&e.remove()}},tryChangeActive:function(){var t=this.editor,e=this.$elem,n=t.selection.getSelectionContainerElem();if(n){var i=n.getNodeName();"TD"===i||"TH"===i?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}}},q.prototype={constructor:q,onClick:function(){this._createPanel()},_createPanel:function(){var e=this,n=h("text-val"),t=h("btn"),i=new b(this,{width:350,tabs:[{title:"插入视频",tpl:'<div>\n                    <input id="'.concat(n,'" type="text" class="block" placeholder="格式如：<iframe src=... ></iframe>"/>\n                    <div class="w-e-button-container">\n                        <button id="').concat(t,'" class="right">插入</button>\n                    </div>\n                </div>'),events:[{selector:"#"+t,type:"click",fn:function(){var t=v("#"+n).val().trim();return t&&e._insert(t),!0}}]}]});i.show(),this.panel=i},_insert:function(t){this.editor.cmd.do("insertHTML",t+"<p><br></p>")}},O.prototype={constructor:O,onClick:function(){this.editor.config.qiniu||(this._active?this._createEditPanel():this._createInsertPanel())},_createEditPanel:function(){var e=this.editor,t=h("width-30"),n=h("width-50"),i=h("width-100"),o=h("del-btn"),a=new b(this,{width:300,tabs:[{title:"编辑图片",tpl:'<div>\n                <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                    <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">最大宽度：</span>\n                    <button id="'.concat(t,'" class="left">30%</button>\n                    <button id="').concat(n,'" class="left">50%</button>\n                    <button id="').concat(i,'" class="left">100%</button>\n                </div>\n                <div class="w-e-button-container">\n                    <button id="').concat(o,'" class="gray left">删除图片</button>\n                </dv>\n            </div>'),events:[{selector:"#"+t,type:"click",fn:function(){var t=e._selectedImg;return t&&t.css("max-width","30%"),!0}},{selector:"#"+n,type:"click",fn:function(){var t=e._selectedImg;return t&&t.css("max-width","50%"),!0}},{selector:"#"+i,type:"click",fn:function(){var t=e._selectedImg;return t&&t.css("max-width","100%"),!0}},{selector:"#"+o,type:"click",fn:function(){var t=e._selectedImg;return t&&t.remove(),!0}}]}]});a.show(),this.panel=a},_createInsertPanel:function(){var t=this.editor,n=t.uploadImg,e=t.config,i=h("up-trigger"),o=h("up-file"),a=h("link-url"),r=h("link-btn"),c=[{title:"上传图片",tpl:'<div class="w-e-up-img-container">\n                    <div id="'.concat(i,'" class="w-e-up-btn">\n                        <i class="w-e-icon-upload2"></i>\n                    </div>\n                    <div style="display:none;">\n                        <input id="').concat(o,'" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>\n                    </div>\n                </div>'),events:[{selector:"#"+i,type:"click",fn:function(){var t=v("#"+o)[0];if(!t)return!0;t.click()}},{selector:"#"+o,type:"change",fn:function(){var t=v("#"+o)[0];if(!t)return!0;var e=t.files;return e.length&&n.uploadImg(e),!0}}]},{title:"网络图片",tpl:'<div>\n                    <input id="'.concat(a,'" type="text" class="block" placeholder="图片链接"/></td>\n                    <div class="w-e-button-container">\n                        <button id="').concat(r,'" class="right">插入</button>\n                    </div>\n                </div>'),events:[{selector:"#"+r,type:"click",fn:function(){var t=v("#"+a).val().trim();return t&&n.insertLinkImg(t),!0}}]}],s=[];(e.uploadImgShowBase64||e.uploadImgServer||e.customUploadImg)&&window.FileReader&&s.push(c[0]),e.showLinkImg&&s.push(c[1]);var l=new b(this,{width:300,tabs:s});l.show(),this.panel=l},tryChangeActive:function(){var t=this.editor,e=this.$elem;t._selectedImg?(this._active=!0,e.addClass("w-e-active")):(this._active=!1,e.removeClass("w-e-active"))}};var B={};function j(t){this.editor=t,this.menus={}}function z(t){var e=t.clipboardData||t.originalEvent&&t.originalEvent.clipboardData;return f(null==e?window.clipboardData&&window.clipboardData.getData("text"):e.getData("text/plain"))}function U(t){this.editor=t}function F(t){this.editor=t}function K(t){this.editor=t,this._currentRange=null}function W(t){this.editor=t,this._time=0,this._isShow=!1,this._isRender=!1,this._timeoutId=0,this.$textContainer=t.$textContainerElem,this.$bar=v('<div class="w-e-progress"></div>')}function V(t){this.editor=t}B.bold=t,B.head=n,B.fontSize=o,B.fontName=r,B.link=c,B.italic=s,B.redo=x,B.strikeThrough=$,B.underline=T,B.undo=I,B.list=R,B.justify=N,B.foreColor=L,B.backColor=H,B.quote=A,B.code=D,B.emoticon=M,B.table=P,B.video=q,B.image=O,j.prototype={constructor:j,init:function(){var n=this,i=this.editor;((i.config||{}).menus||[]).forEach(function(t){var e=B[t];e&&"function"==typeof e&&(n.menus[t]=new e(i))}),this._addToToolbar(),this._bindEvent()},_addToToolbar:function(){var t=this.editor,i=t.$toolbarElem,e=this.menus,o=t.config.zIndex+1;E(e,function(t,e){var n=e.$elem;n&&(n.css("z-index",o),i.append(n))})},_bindEvent:function(){var t=this.menus,a=this.editor;E(t,function(t,e){var n=e.type;if(n){var i=e.$elem,o=e.droplist;"click"===n&&e.onClick&&i.on("click",function(t){null!=a.selection.getRange()&&e.onClick(t)}),"droplist"===n&&o&&i.on("mouseenter",function(t){null!=a.selection.getRange()&&(o.showTimeoutId=setTimeout(function(){o.show()},200))}).on("mouseleave",function(t){o.hideTimeoutId=setTimeout(function(){o.hide()},0)}),"panel"===n&&e.onClick&&i.on("click",function(t){t.stopPropagation(),null!=a.selection.getRange()&&e.onClick(t)})}})},changeActive:function(){E(this.menus,function(t,e){e.tryChangeActive&&setTimeout(function(){e.tryChangeActive()},100)})}},U.prototype={constructor:U,init:function(){this._bindEvent()},clear:function(){this.html("<p><br></p>")},html:function(t){var e,n=this.editor,i=n.$textElem;if(null==t)return e=i.html(),e=e.replace(/\u200b/gm,""),e;i.html(t),n.initSelection()},getJSON:function(){return function s(t){var l=[];return(t.childNodes()||[]).forEach(function(t){var e,n=t.nodeType;if(3===n&&(e=f(e=t.textContent)),1===n){(e={}).tag=t.nodeName.toLowerCase();for(var i=[],o=t.attributes||{},a=o.length||0,r=0;r<a;r++){var c=o[r];i.push({name:c.name,value:c.value})}e.attrs=i,e.children=s(v(t))}l.push(e)}),l}(this.editor.$textElem)},text:function(t){var e,n=this.editor,i=n.$textElem;if(null==t)return e=i.text(),e=e.replace(/\u200b/gm,""),e;i.text("<p>".concat(t,"</p>")),n.initSelection()},append:function(t){var e=this.editor;e.$textElem.append(v(t)),e.initSelection()},_bindEvent:function(){this._saveRangeRealTime(),this._enterKeyHandle(),this._clearHandle(),this._pasteHandle(),this._tabHandle(),this._imgHandle(),this._dragHandle()},_saveRangeRealTime:function(){var e=this.editor,n=e.$textElem;function i(t){e.selection.saveRange(),e.menus.changeActive()}n.on("keyup",i),n.on("mousedown",function(t){n.on("mouseleave",i)}),n.on("mouseup",function(t){i(),n.off("mouseleave",i)})},_enterKeyHandle:function(){var s=this.editor,i=s.$textElem;function o(t){var e=v("<p><br></p>");e.insertBefore(t),s.selection.createRangeByElem(e,!0),s.selection.restoreSelection(),t.remove()}i.on("keyup",function(t){var e,n;13===t.keyCode&&(e=s.selection.getSelectionContainerElem(),"<code><br></code>"!==(n=e.parent()).html()?n.equal(i)&&"P"!==e.getNodeName()&&(e.text()||o(e)):o(e))}),i.on("keydown",function(t){13===t.keyCode?function(t){var e=s.selection.getSelectionContainerElem();if(e){var n=e.parent(),i=e.getNodeName(),o=n.getNodeName();if("CODE"===i&&"PRE"===o&&s.cmd.queryCommandSupported("insertHTML")){if(!0===s._willBreakCode){var a=v("<p><br></p>");return a.insertAfter(n),s.selection.createRangeByElem(a,!0),s.selection.restoreSelection(),s._willBreakCode=!1,t.preventDefault()}var r=s.selection.getRange().startOffset;s.cmd.do("insertHTML","\n"),s.selection.saveRange(),s.selection.getRange().startOffset===r&&s.cmd.do("insertHTML","\n");var c=e.html().length;s.selection.getRange().startOffset+1===c&&(s._willBreakCode=!0),t.preventDefault()}}}(t):s._willBreakCode=!1})},_clearHandle:function(){var i=this.editor,o=i.$textElem;o.on("keydown",function(t){8===t.keyCode&&"<p><br></p>"===o.html().toLowerCase().trim()&&t.preventDefault()}),o.on("keyup",function(t){if(8===t.keyCode){var e,n=o.html().toLowerCase().trim();n&&"<br>"!==n||(e=v("<p><br/></p>"),o.html(""),o.append(e),i.selection.createRangeByElem(e,!1,!0),i.selection.restoreSelection())}})},_pasteHandle:function(){var a=this.editor,t=a.config,r=t.pasteFilterStyle,c=t.pasteTextHandle,s=t.pasteIgnoreImg,e=a.$textElem,l=0;function u(){var t=Date.now(),e=!1;return 100<=t-l&&(e=!0),l=t,e}e.on("paste",function(t){if(!d.isIE()&&(t.preventDefault(),u())){var e=function(t,e,n){var i,o,a=t.clipboardData||t.originalEvent&&t.originalEvent.clipboardData;if(null==a?i=window.clipboardData&&window.clipboardData.getData("text"):(i=a.getData("text/plain"),o=a.getData("text/html")),!o&&i&&(o="<p>"+f(i)+"</p>"),o){var r=o.split("</html>");return 2===r.length&&(o=r[0]),o=(o=(o=o.replace(/<(meta|script|link).+?>/gim,"")).replace(/<!--.*?-->/gm,"")).replace(/\s?data-.+?=('|").+?('|")/gim,""),n&&(o=o.replace(/<img.+?>/gim,"")),o=e?o.replace(/\s?(class|style)=('|").*?('|")/gim,""):o.replace(/\s?class=('|").*?('|")/gim,"")}}(t,r,s),n=z(t);n=n.replace(/\n/gm,"<br>");var i=a.selection.getSelectionContainerElem();if(i){var o=i.getNodeName();if("CODE"===o||"PRE"===o)return c&&m(c)&&(n=""+(c(n)||"")),void a.cmd.do("insertHTML","<p>".concat(n,"</p>"));if(e)try{c&&m(c)&&(e=""+(c(e)||"")),a.cmd.do("insertHTML",e)}catch(t){c&&m(c)&&(n=""+(c(n)||"")),a.cmd.do("insertHTML","<p>".concat(n,"</p>"))}else l=0}}}),e.on("paste",function(t){if(!d.isIE()&&(t.preventDefault(),u())){var e=function(t){var i=[];if(z(t))return i;var e=(t.clipboardData||t.originalEvent&&t.originalEvent.clipboardData||{}).items;return e&&E(e,function(t,e){var n=e.type;/image/i.test(n)&&i.push(e.getAsFile())}),i}(t);if(e&&e.length){var n=a.selection.getSelectionContainerElem();if(n){var i=n.getNodeName();if("CODE"!==i&&"PRE"!==i)a.uploadImg.uploadImg(e)}}}})},_tabHandle:function(){var a=this.editor;a.$textElem.on("keydown",function(t){if(9===t.keyCode&&a.cmd.queryCommandSupported("insertHTML")){var e=a.selection.getSelectionContainerElem();if(e){var n=e.parent(),i=e.getNodeName(),o=n.getNodeName();"CODE"===i&&"PRE"===o?a.cmd.do("insertHTML","    "):a.cmd.do("insertHTML","&nbsp;&nbsp;&nbsp;&nbsp;"),t.preventDefault()}}})},_imgHandle:function(){var n=this.editor,t=n.$textElem;t.on("click","img",function(t){var e=v(this);"1"!==e.attr("data-w-e")&&(n._selectedImg=e,n.selection.createRangeByElem(e),n.selection.restoreSelection())}),t.on("click  keyup",function(t){t.target.matches("img")||(n._selectedImg=null)})},_dragHandle:function(){var n=this.editor;v(document).on("dragleave drop dragenter dragover",function(t){t.preventDefault()}),n.$textElem.on("drop",function(t){t.preventDefault();var e=t.dataTransfer&&t.dataTransfer.files;e&&e.length&&n.uploadImg.uploadImg(e)})}},F.prototype={constructor:F,do:function(t,e){var n=this.editor;if(n._useStyleWithCSS||(document.execCommand("styleWithCSS",null,!0),n._useStyleWithCSS=!0),n.selection.getRange()){n.selection.restoreSelection();var i="_"+t;this[i]?this[i](e):this._execCommand(t,e),n.menus.changeActive(),n.selection.saveRange(),n.selection.restoreSelection(),n.change&&n.change()}},_insertHTML:function(t){var e=this.editor.selection.getRange();this.queryCommandSupported("insertHTML")?this._execCommand("insertHTML",t):e.insertNode?(e.deleteContents(),e.insertNode(v(t)[0])):e.pasteHTML&&e.pasteHTML(t)},_insertElem:function(t){var e=this.editor.selection.getRange();e.insertNode&&(e.deleteContents(),e.insertNode(t[0]))},_execCommand:function(t,e){document.execCommand(t,!1,e)},queryCommandValue:function(t){return document.queryCommandValue(t)},queryCommandState:function(t){return document.queryCommandState(t)},queryCommandSupported:function(t){return document.queryCommandSupported(t)}},K.prototype={constructor:K,getRange:function(){return this._currentRange},saveRange:function(t){if(t)this._currentRange=t;else{var e=window.getSelection();if(0!==e.rangeCount){var n=e.getRangeAt(0),i=this.getSelectionContainerElem(n);if(i)if("false"!==i.attr("contenteditable")&&!i.parentUntil("[contenteditable=false]"))this.editor.$textElem.isContain(i)&&(this._currentRange=n)}}},collapseRange:function(t){null==t&&(t=!1);var e=this._currentRange;e&&e.collapse(t)},getSelectionText:function(){var t=this.getRange();return t.cloneContents()},getSelectionContainerElem:function(t){var e;if(t=t||this._currentRange)return v(1===(e=t.commonAncestorContainer).nodeType?e:e.parentNode)},getSelectionStartElem:function(t){var e;if(t=t||this._currentRange)return v(1===(e=t.startContainer).nodeType?e:e.parentNode)},getSelectionEndElem:function(t){var e;if(t=t||this._currentRange)return v(1===(e=t.endContainer).nodeType?e:e.parentNode)},isSelectionEmpty:function(){var t=this._currentRange;return!(!t||!t.startContainer||t.startContainer!==t.endContainer||t.startOffset!==t.endOffset)},restoreSelection:function(){var t=window.getSelection();t.removeAllRanges(),t.addRange(this._currentRange)},createEmptyRange:function(){var t,e=this.editor,n=this.getRange();if(n&&this.isSelectionEmpty())try{d.isWebkit()?(e.cmd.do("insertHTML","&#8203;"),n.setEnd(n.endContainer,n.endOffset+1),this.saveRange(n)):(t=v("<strong>&#8203;</strong>"),e.cmd.do("insertElem",t),this.createRangeByElem(t,!0))}catch(t){}},createRangeByElem:function(t,e,n){if(t.length){var i=t[0],o=document.createRange();n?o.selectNodeContents(i):o.selectNode(i),"boolean"==typeof e&&o.collapse(e),this.saveRange(o)}}},W.prototype={constructor:W,show:function(t){var e=this;if(!this._isShow){this._isShow=!0;var n=this.$bar;if(this._isRender)this._isRender=!0;else this.$textContainer.append(n);100<Date.now()-this._time&&t<=1&&(n.css("width",100*t+"%"),this._time=Date.now());var i=this._timeoutId;i&&clearTimeout(i),i=setTimeout(function(){e._hide()},500)}},_hide:function(){this.$bar.remove(),this._time=0,this._isShow=!1,this._isRender=!1}};var Q=window.alert;V.prototype={constructor:V,_alert:function(t,e){var n=this.editor,i=n.config.debug,o=n.config.customAlert;if(i)throw new Error("wangEditor: "+(e||t));o&&"function"==typeof o?o(t):Q(t)},insertLinkImg:function(e){var t=this;if(e){var n,i=this.editor,o=i.config,a=o.linkImgCheck;if(a&&"function"==typeof a&&"string"==typeof(n=a(e)))Q(n);else{i.cmd.do("insertHTML",'<img src="'.concat(e,'" style="max-width:100%;"/>'));var r=document.createElement("img");r.onload=function(){var t=o.linkImgCallback;t&&"function"==typeof t&&t(e),r=null},r.onerror=function(){r=null,t._alert("插入图片错误",'wangEditor: 插入图片出错，图片链接是 "'.concat(e,'"，下载该链接失败'))},r.onabort=function(){r=null},r.src=e}}},uploadImg:function(t){var i=this;if(t&&t.length){var o=this.editor,e=o.config,n=e.uploadImgServer,a=e.uploadImgShowBase64,r=e.uploadImgMaxSize,c=r/1024/1024,s=e.uploadImgMaxLength||1e4,l=e.uploadFileName||"",u=e.uploadImgParams||{},d=e.uploadImgParamsWithUrl,h=e.uploadImgHeaders||{},f=e.uploadImgHooks||{},m=e.uploadImgTimeout||3e3,p=e.withCredentials;null==p&&(p=!1);var v=e.customUploadImg;if(v||n||a){var g=[],y=[];if(k(t,function(t){var e=t.name,n=t.size;e&&n&&(!1!==/\.(jpg|jpeg|png|bmp|gif|webp)$/i.test(e)?r<n?y.push("【".concat(e,"】大于 ").concat(c,"M")):g.push(t):y.push("【".concat(e,"】不是图片")))}),y.length)this._alert("图片验证未通过: \n"+y.join("\n"));else if(g.length>s)this._alert("一次最多上传"+s+"张图片");else if(v&&"function"==typeof v)v(g,this.insertLinkImg.bind(this));else{var w=new FormData;if(k(g,function(t){var e=l||t.name;w.append(e,t)}),n&&"string"==typeof n){var _=n.split("#");n=_[0];var b=_[1]||"";E(u,function(t,e){d&&(0<n.indexOf("?")?n+="&":n+="?",n=n+t+"="+e),w.append(t,e)}),b&&(n+="#"+b);var C=new XMLHttpRequest;if(C.open("POST",n),C.timeout=m,C.ontimeout=function(){f.timeout&&"function"==typeof f.timeout&&f.timeout(C,o),i._alert("上传图片超时")},C.upload&&(C.upload.onprogress=function(t){var e,n=new W(o);t.lengthComputable&&(e=t.loaded/t.total,n.show(e))}),C.onreadystatechange=function(){var e;if(4===C.readyState){if(C.status<200||300<=C.status)return f.error&&"function"==typeof f.error&&f.error(C,o),void i._alert("上传图片发生错误","上传图片发生错误，服务器返回状态是 ".concat(C.status));if("object"!==S(e=C.responseText))try{e=JSON.parse(e)}catch(t){return f.fail&&"function"==typeof f.fail&&f.fail(C,o,e),void i._alert("上传图片失败","上传图片返回结果错误，返回结果是: "+e)}if(f.customInsert||"0"===e.errno){if(f.customInsert&&"function"==typeof f.customInsert)f.customInsert(i.insertLinkImg.bind(i),e,o);else(e.data||[]).forEach(function(t){i.insertLinkImg(t)});f.success&&"function"==typeof f.success&&f.success(C,o,e)}else f.fail&&"function"==typeof f.fail&&f.fail(C,o,e),i._alert("上传图片失败","上传图片返回结果错误，返回结果 errno="+e.errno)}},f.before&&"function"==typeof f.before){var x=f.before(C,o,g);if(x&&"object"===S(x)&&x.prevent)return void this._alert(x.msg)}return E(h,function(t,e){C.setRequestHeader(t,e)}),C.withCredentials=p,void C.send(w)}a&&k(t,function(t){var e=i,n=new FileReader;n.readAsDataURL(t),n.onload=function(){e.insertLinkImg(this.result)}})}}}}};var J=1;function X(t,e){if(null===t)throw new Error("错误：初始化编辑器时候未传入任何参数，请查阅文档");this.id="wangEditor-"+J++,this.toolbarSelector=t,this.textSelector=e,this.customConfig={}}if(X.prototype={constructor:X,_initConfig:function(){this.config=Object.assign({},e,this.customConfig);var t=this.config.lang||{},n=[];E(t,function(t,e){n.push({reg:new RegExp(t,"img"),val:e})}),this.config.langArgs=n},_initDom:function(){var o,t,a,e,r=this,n=v(this.toolbarSelector),i=this.textSelector,c=this.config,s=c.zIndex;null==i?(o=v("<div></div>"),t=v("<div></div>"),e=n.children(),n.append(o).append(t),o.css("background-color","#f1f1f1").css("border","1px solid #ccc"),t.css("border","1px solid #ccc").css("border-top","none").css("height","300px")):(o=n,e=(t=v(i)).children()),(a=v("<div></div>")).attr("contenteditable","true").css("width","100%").css("height","100%"),e&&e.length?a.append(e):a.append(v("<p><br></p>")),t.append(a),o.addClass("w-e-toolbar"),t.addClass("w-e-text-container"),t.css("z-index",s),a.addClass("w-e-text");var l=h("toolbar-elem");o.attr("id",l);var u=h("text-elem");a.attr("id",u),this.$toolbarElem=o,this.$textContainerElem=t,this.$textElem=a,this.toolbarElemId=l,this.textElemId=u;var d=!0;t.on("compositionstart",function(){d=!1}),t.on("compositionend",function(){d=!0}),t.on("click keyup",function(){d&&r.change&&r.change()}),o.on("click",function(){this.change&&this.change()}),(c.onfocus||c.onblur)&&(this.isFocus=!1,v(document).on("click",function(t){var e=a.isContain(v(t.target)),n=o.isContain(v(t.target)),i=o[0]===t.target;if(e)r.isFocus||r.onfocus&&r.onfocus(),r.isFocus=!0;else{if(n&&!i)return;r.isFocus&&r.onblur&&r.onblur(),r.isFocus=!1}}))},_initCommand:function(){this.cmd=new F(this)},_initSelectionAPI:function(){this.selection=new K(this)},_initUploadImg:function(){this.uploadImg=new V(this)},_initMenus:function(){this.menus=new j(this),this.menus.init()},_initText:function(){this.txt=new U(this),this.txt.init()},initSelection:function(t){var e=this.$textElem,n=e.children();if(!n.length)return e.append(v("<p><br></p>")),void this.initSelection();var i=n.last();if(t){var o=i.html().toLowerCase(),a=i.getNodeName();if("<br>"!==o&&"<br/>"!==o||"P"!==a)return e.append(v("<p><br></p>")),void this.initSelection()}this.selection.createRangeByElem(i,!1,!0),this.selection.restoreSelection()},_bindEvent:function(){var e=0,n=this.txt.html(),t=this.config,i=t.onchangeTimeout;(!(i=parseInt(i,10))||i<=0)&&(i=200);var o=t.onchange;o&&"function"==typeof o&&(this.change=function(){var t=this.txt.html();t.length===n.length&&t===n||(e&&clearTimeout(e),e=setTimeout(function(){o(t),n=t},i))});var a=t.onblur;a&&"function"==typeof a&&(this.onblur=function(){var t=this.txt.html();a(t)});var r=t.onfocus;r&&"function"==typeof r&&(this.onfocus=function(){r()})},create:function(){this._initConfig(),this._initDom(),this._initCommand(),this._initSelectionAPI(),this._initText(),this._initMenus(),this._initUploadImg(),this.initSelection(!0),this._bindEvent()},_offAllEvent:function(){v.offAll()}},"undefined"==typeof window)throw new Error("请在浏览器环境下运行");return X});


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "616a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("454f");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d84f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"628d557d-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueEditor/src/vueEditor.vue?vue&type=template&id=20e54fde&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vueEditor"},[_c('div',{ref:"editor"})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueEditor/src/vueEditor.vue?vue&type=template&id=20e54fde&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/jsy-editor/lib/jsy-editor.umd.js
var jsy_editor_umd = __webpack_require__("4dc3");
var jsy_editor_umd_default = /*#__PURE__*/__webpack_require__.n(jsy_editor_umd);

// EXTERNAL MODULE: ./node_modules/jsy-editor/lib/index.min.css
var index_min = __webpack_require__("d84f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueEditor/src/vueEditor.vue?vue&type=script&lang=js&








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//


/* harmony default export */ var vueEditorvue_type_script_lang_js_ = ({
  // import引入的组件需要注入到对象中才能使用
  name: 'vueEditor',
  components: {},
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: function _default() {
        return '';
      }
    },
    toolBar: {
      type: Array,
      default: function _default() {
        return ['head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
        ];
      }
    },
    action: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    fileName: {
      type: String,
      default: function _default() {
        return 'files';
      }
    },
    baseUrl: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    size: {
      type: Number,
      default: function _default() {
        return 2;
      }
    },
    limit: {
      type: Number,
      default: function _default() {
        return 10000;
      }
    },
    data: {
      type: Object,
      default: function _default() {}
    },
    merge: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    debug: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    hook: {
      type: Object,
      default: function _default() {}
    },
    option: {
      type: Object,
      default: function _default() {}
    }
  },
  data: function data() {
    // 这里存放数据
    return {
      editor: null,
      content: '',
      reg: /<\/?.+?\/?>/g // 截取标签内容

    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    /**
     * 原理
     * 1. 首先监听props中v-model绑定的值的变化
     *    如果值改变了，存在以下几种情况
     *    · 富文本内容为空，证明这是第一次打开，将v-model的值绑定到富文本框即可
     *    · 富文本存在内容，证明这是在编辑，跳过即可
     * 2. 重点在于每次监听props，如果v-model的值变为空（''），证明这是关闭了富文本，将富文本框内容清空即可
     *    ** 这一步的操作主要在业务组件内完成，因此推荐使用富文本框提交表单之后，必须进行重置表单操作。
     */
    value: function value(val) {
      var content = this.editor.txt.html().replace(this.reg, '');

      if (!content && this.editor.txt.html().indexOf('img') === -1) {
        this.editor.txt.html(this.value);
        this.content = this.value;
      }

      if (!this.value) {
        this.editor.txt.clear();
        this.content = this.value;
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created: function created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this._initEditor();
    });
  },
  beforeCreate: function beforeCreate() {},
  // 生命周期 - 创建之前
  beforeMount: function beforeMount() {},
  // 生命周期 - 挂载之前
  beforeUpdate: function beforeUpdate() {},
  // 生命周期 - 更新之前
  updated: function updated() {},
  // 生命周期 - 更新之后
  beforeDestroy: function beforeDestroy() {},
  // 生命周期 - 销毁之前
  destroyed: function destroyed() {},
  // 生命周期 - 销毁完成
  activated: function activated() {},
  // 方法集合
  methods: {
    /**
     * 初始化富文本框
     */
    _initEditor: function _initEditor() {
      var _this2 = this;

      this.editor = new jsy_editor_umd_default.a(this.$refs.editor); // 编辑器的事件，每次改变会获取其html内容

      this.editor.customConfig.onchange = function (html) {
        _this2.content = html;

        _this2.$emit('change', _this2.content); // eslint-disable-next-line semi

      };

      this.editor.customConfig.debug = this.debug; // debug 模式

      this.editor.customConfig.menus = this.toolBar; // 工具栏

      this.editor.customConfig.pasteFilterStyle = false; // 关闭样式过滤

      this.editor.customConfig.withCredentials = true; // 图片上传携带凭证

      /**
       * 图片上传操作
       */

      if (this.action) {
        this.editor.customConfig.uploadImgServer = this.action; // 上传图片到服务器

        this.editor.customConfig.uploadFileName = this.fileName; // 文件键名

        /**
         * 如果自定义了上传操作，请务必覆写customInsert事件
         */

        if (this.hook && Object.keys(this.hook).length && this.action) {
          this.editor.customConfig.uploadImgHooks = this.hook; // 自定义上传操作
        } else {
          this.editor.customConfig.uploadImgHooks = {
            customInsert: this._upLoadSuccess
          };
        }
      } else {
        this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      }

      this.editor.customConfig.uploadImgMaxSize = this.size * 1024 * 1024; // 图片大小

      this.editor.customConfig.uploadImgMaxLength = this.limit; // 图片数量限制

      this.editor.customConfig.uploadImgParams = this.data; // 附加参数

      if (this.data && Object.keys(this.data).length) {
        this.editor.customConfig.uploadImgParamsWithUrl = this.merge; // 参数合并url
      }
      /**
       * 合并富文本参数
       */


      if (this.option && Object.keys(this.option).length) {
        this.editor.customConfig = _objectSpread({}, this.editor.customConfig, {}, this.option);
      }

      this.editor.create(); // 创建富文本实例

      this._initValue();
    },

    /**
     * upLoad
     */
    _upLoadSuccess: function _upLoadSuccess(insertImg, result, editor) {
      var _this3 = this;

      if (result.url.length) {
        result.url.forEach(function (row) {
          var url = "".concat(_this3.baseUrl).concat(row);
          insertImg(url);
        });
      }
    },

    /**
     * 初始化内容
     */
    _initValue: function _initValue() {
      this.editor.txt.html(this.value);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueEditor/src/vueEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_vueEditorvue_type_script_lang_js_ = (vueEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/vueEditor/src/vueEditor.vue?vue&type=style&index=0&id=20e54fde&lang=scss&scoped=true&
var vueEditorvue_type_style_index_0_id_20e54fde_lang_scss_scoped_true_ = __webpack_require__("ff4e");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/vueEditor/src/vueEditor.vue






/* normalize component */

var component = normalizeComponent(
  src_vueEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "20e54fde",
  null
  
)

/* harmony default export */ var vueEditor = (component.exports);
// CONCATENATED MODULE: ./packages/vueEditor/index.js



vueEditor.install = function (Vue) {
  Vue.component(vueEditor.name, vueEditor);
};

/* harmony default export */ var packages_vueEditor = (vueEditor);
// CONCATENATED MODULE: ./packages/index.js







function packages_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function packages_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { packages_ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { packages_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** 导出组件 */

var components = [packages_vueEditor];

var install = function install(Vue) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var packages_0 = (packages_objectSpread({
  install: install
}, components));
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "ff4e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_20e54fde_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("616a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_20e54fde_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_20e54fde_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_20e54fde_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

/******/ });
});