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

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
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

/***/ "1a0b":
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

/*
    poly-fill
*/

var polyfill = function () {

    // Object.assign
    if (typeof Object.assign != 'function') {
        Object.assign = function (target, varArgs) {
            // .length of function is 2
            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

    // IE 中兼容 Element.prototype.matches
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
    }
};

/*
    DOM 操作 API
*/

// 根据 html 代码片段创建 dom 对象
function createElemByHTML(html) {
    var div = void 0;
    div = document.createElement('div');
    div.innerHTML = html;
    return div.children;
}

// 是否是 DOM List
function isDOMList(selector) {
    if (!selector) {
        return false;
    }
    if (selector instanceof HTMLCollection || selector instanceof NodeList) {
        return true;
    }
    return false;
}

// 封装 document.querySelectorAll
function querySelectorAll(selector) {
    var result = document.querySelectorAll(selector);
    if (isDOMList(result)) {
        return result;
    } else {
        return [result];
    }
}

// 记录所有的事件绑定
var eventList = [];

// 创建构造函数
function DomElement(selector) {
    if (!selector) {
        return;
    }

    // selector 本来就是 DomElement 对象，直接返回
    if (selector instanceof DomElement) {
        return selector;
    }

    this.selector = selector;
    var nodeType = selector.nodeType;

    // 根据 selector 得出的结果（如 DOM，DOM List）
    var selectorResult = [];
    if (nodeType === 9) {
        // document 节点
        selectorResult = [selector];
    } else if (nodeType === 1) {
        // 单个 DOM 节点
        selectorResult = [selector];
    } else if (isDOMList(selector) || selector instanceof Array) {
        // DOM List 或者数组
        selectorResult = selector;
    } else if (typeof selector === 'string') {
        // 字符串
        selector = selector.replace('/\n/mg', '').trim();
        if (selector.indexOf('<') === 0) {
            // 如 <div>
            selectorResult = createElemByHTML(selector);
        } else {
            // 如 #id .class
            selectorResult = querySelectorAll(selector);
        }
    }

    var length = selectorResult.length;
    if (!length) {
        // 空数组
        return this;
    }

    // 加入 DOM 节点
    var i = void 0;
    for (i = 0; i < length; i++) {
        this[i] = selectorResult[i];
    }
    this.length = length;
}

// 修改原型
DomElement.prototype = {
    constructor: DomElement,

    // 类数组，forEach
    forEach: function forEach(fn) {
        var i = void 0;
        for (i = 0; i < this.length; i++) {
            var elem = this[i];
            var result = fn.call(elem, elem, i);
            if (result === false) {
                break;
            }
        }
        return this;
    },

    // clone
    clone: function clone(deep) {
        var cloneList = [];
        this.forEach(function (elem) {
            cloneList.push(elem.cloneNode(!!deep));
        });
        return $(cloneList);
    },

    // 获取第几个元素
    get: function get(index) {
        var length = this.length;
        if (index >= length) {
            index = index % length;
        }
        return $(this[index]);
    },

    // 第一个
    first: function first() {
        return this.get(0);
    },

    // 最后一个
    last: function last() {
        var length = this.length;
        return this.get(length - 1);
    },

    // 绑定事件
    on: function on(type, selector, fn) {
        // selector 不为空，证明绑定事件要加代理
        if (!fn) {
            fn = selector;
            selector = null;
        }

        // type 是否有多个
        var types = [];
        types = type.split(/\s+/);

        return this.forEach(function (elem) {
            types.forEach(function (type) {
                if (!type) {
                    return;
                }

                // 记录下，方便后面解绑
                eventList.push({
                    elem: elem,
                    type: type,
                    fn: fn
                });

                if (!selector) {
                    // 无代理
                    elem.addEventListener(type, fn);
                    return;
                }

                // 有代理
                elem.addEventListener(type, function (e) {
                    var target = e.target;
                    if (target.matches(selector)) {
                        fn.call(target, e);
                    }
                });
            });
        });
    },

    // 取消事件绑定
    off: function off(type, fn) {
        return this.forEach(function (elem) {
            elem.removeEventListener(type, fn);
        });
    },

    // 获取/设置 属性
    attr: function attr(key, val) {
        if (val == null) {
            // 获取值
            return this[0].getAttribute(key);
        } else {
            // 设置值
            return this.forEach(function (elem) {
                elem.setAttribute(key, val);
            });
        }
    },

    // 添加 class
    addClass: function addClass(className) {
        if (!className) {
            return this;
        }
        return this.forEach(function (elem) {
            var arr = void 0;
            if (elem.className) {
                // 解析当前 className 转换为数组
                arr = elem.className.split(/\s/);
                arr = arr.filter(function (item) {
                    return !!item.trim();
                });
                // 添加 class
                if (arr.indexOf(className) < 0) {
                    arr.push(className);
                }
                // 修改 elem.class
                elem.className = arr.join(' ');
            } else {
                elem.className = className;
            }
        });
    },

    // 删除 class
    removeClass: function removeClass(className) {
        if (!className) {
            return this;
        }
        return this.forEach(function (elem) {
            var arr = void 0;
            if (elem.className) {
                // 解析当前 className 转换为数组
                arr = elem.className.split(/\s/);
                arr = arr.filter(function (item) {
                    item = item.trim();
                    // 删除 class
                    if (!item || item === className) {
                        return false;
                    }
                    return true;
                });
                // 修改 elem.class
                elem.className = arr.join(' ');
            }
        });
    },

    // 修改 css
    css: function css(key, val) {
        var currentStyle = key + ':' + val + ';';
        return this.forEach(function (elem) {
            var style = (elem.getAttribute('style') || '').trim();
            var styleArr = void 0,
                resultArr = [];
            if (style) {
                // 将 style 按照 ; 拆分为数组
                styleArr = style.split(';');
                styleArr.forEach(function (item) {
                    // 对每项样式，按照 : 拆分为 key 和 value
                    var arr = item.split(':').map(function (i) {
                        return i.trim();
                    });
                    if (arr.length === 2) {
                        resultArr.push(arr[0] + ':' + arr[1]);
                    }
                });
                // 替换或者新增
                resultArr = resultArr.map(function (item) {
                    if (item.indexOf(key) === 0) {
                        return currentStyle;
                    } else {
                        return item;
                    }
                });
                if (resultArr.indexOf(currentStyle) < 0) {
                    resultArr.push(currentStyle);
                }
                // 结果
                elem.setAttribute('style', resultArr.join('; '));
            } else {
                // style 无值
                elem.setAttribute('style', currentStyle);
            }
        });
    },

    // 显示
    show: function show() {
        return this.css('display', 'block');
    },

    // 隐藏
    hide: function hide() {
        return this.css('display', 'none');
    },

    // 获取子节点
    children: function children() {
        var elem = this[0];
        if (!elem) {
            return null;
        }

        return $(elem.children);
    },

    // 获取子节点（包括文本节点）
    childNodes: function childNodes() {
        var elem = this[0];
        if (!elem) {
            return null;
        }

        return $(elem.childNodes);
    },

    // 增加子节点
    append: function append($children) {
        return this.forEach(function (elem) {
            $children.forEach(function (child) {
                elem.appendChild(child);
            });
        });
    },

    // 移除当前节点
    remove: function remove() {
        return this.forEach(function (elem) {
            if (elem.remove) {
                elem.remove();
            } else {
                var parent = elem.parentElement;
                parent && parent.removeChild(elem);
            }
        });
    },

    // 是否包含某个子节点
    isContain: function isContain($child) {
        var elem = this[0];
        var child = $child[0];
        return elem.contains(child);
    },

    // 尺寸数据
    getSizeData: function getSizeData() {
        var elem = this[0];
        return elem.getBoundingClientRect(); // 可得到 bottom height left right top width 的数据
    },

    // 封装 nodeName
    getNodeName: function getNodeName() {
        var elem = this[0];
        return elem.nodeName;
    },

    // 从当前元素查找
    find: function find(selector) {
        var elem = this[0];
        return $(elem.querySelectorAll(selector));
    },

    // 获取当前元素的 text
    text: function text(val) {
        if (!val) {
            // 获取 text
            var elem = this[0];
            return elem.innerHTML.replace(/<.*?>/g, function () {
                return '';
            });
        } else {
            // 设置 text
            return this.forEach(function (elem) {
                elem.innerHTML = val;
            });
        }
    },

    // 获取 html
    html: function html(value) {
        var elem = this[0];
        if (value == null) {
            return elem.innerHTML;
        } else {
            elem.innerHTML = value;
            return this;
        }
    },

    // 获取 value
    val: function val() {
        var elem = this[0];
        return elem.value.trim();
    },

    // focus
    focus: function focus() {
        return this.forEach(function (elem) {
            elem.focus();
        });
    },

    // parent
    parent: function parent() {
        var elem = this[0];
        return $(elem.parentElement);
    },

    // parentUntil 找到符合 selector 的父节点
    parentUntil: function parentUntil(selector, _currentElem) {
        var results = document.querySelectorAll(selector);
        var length = results.length;
        if (!length) {
            // 传入的 selector 无效
            return null;
        }

        var elem = _currentElem || this[0];
        if (elem.nodeName === 'BODY') {
            return null;
        }

        var parent = elem.parentElement;
        var i = void 0;
        for (i = 0; i < length; i++) {
            if (parent === results[i]) {
                // 找到，并返回
                return $(parent);
            }
        }

        // 继续查找
        return this.parentUntil(selector, parent);
    },

    // 判断两个 elem 是否相等
    equal: function equal($elem) {
        if ($elem.nodeType === 1) {
            return this[0] === $elem;
        } else {
            return this[0] === $elem[0];
        }
    },

    // 将该元素插入到某个元素前面
    insertBefore: function insertBefore(selector) {
        var $referenceNode = $(selector);
        var referenceNode = $referenceNode[0];
        if (!referenceNode) {
            return this;
        }
        return this.forEach(function (elem) {
            var parent = referenceNode.parentNode;
            parent.insertBefore(elem, referenceNode);
        });
    },

    // 将该元素插入到某个元素后面
    insertAfter: function insertAfter(selector) {
        var $referenceNode = $(selector);
        var referenceNode = $referenceNode[0];
        if (!referenceNode) {
            return this;
        }
        return this.forEach(function (elem) {
            var parent = referenceNode.parentNode;
            if (parent.lastChild === referenceNode) {
                // 最后一个元素
                parent.appendChild(elem);
            } else {
                // 不是最后一个元素
                parent.insertBefore(elem, referenceNode.nextSibling);
            }
        });
    }
};

// new 一个对象
function $(selector) {
    return new DomElement(selector);
}

// 解绑所有事件，用于销毁编辑器
$.offAll = function () {
    eventList.forEach(function (item) {
        var elem = item.elem;
        var type = item.type;
        var fn = item.fn;
        // 解绑
        elem.removeEventListener(type, fn);
    });
};

/*
    配置信息
*/

var config = {

    // 默认菜单配置
    menus: ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'foreColor', 'backColor', 'link', 'list', 'justify', 'quote', 'emoticon', 'image', 'table', 'video', 'code', 'undo', 'redo'],

    fontNames: ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'],

    colors: ['#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a', '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff'],

    // // 语言配置
    // lang: {
    //     '设置标题': 'title',
    //     '正文': 'p',
    //     '链接文字': 'link text',
    //     '链接': 'link',
    //     '插入': 'insert',
    //     '创建': 'init'
    // },

    // 表情
    emotions: [{
        // tab 的标题
        title: '默认',
        // type -> 'emoji' / 'image'
        type: 'image',
        // content -> 数组
        content: [{
            alt: '[坏笑]',
            src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
        }, {
            alt: '[舔屏]',
            src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
        }, {
            alt: '[污]',
            src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png'
        }]
    }, {
        // tab 的标题
        title: '新浪',
        // type -> 'emoji' / 'image'
        type: 'image',
        // content -> 数组
        content: [{
            src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
            alt: '[草泥马]'
        }, {
            src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
            alt: '[神马]'
        }, {
            src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif',
            alt: '[浮云]'
        }]
    }, {
        // tab 的标题
        title: 'emoji',
        // type -> 'emoji' / 'image'
        type: 'emoji',
        // content -> 数组
        content: '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐'.split(/\s/)
    }],

    // 编辑区域的 z-index
    zIndex: 10000,

    // 是否开启 debug 模式（debug 模式下错误会 throw error 形式抛出）
    debug: false,

    // 插入链接时候的格式校验
    linkCheck: function linkCheck(text, link) {
        // text 是插入的文字
        // link 是插入的链接
        return true; // 返回 true 即表示成功
        // return '校验失败' // 返回字符串即表示失败的提示信息
    },

    // 插入网络图片的校验
    linkImgCheck: function linkImgCheck(src) {
        // src 即图片的地址
        return true; // 返回 true 即表示成功
        // return '校验失败'  // 返回字符串即表示失败的提示信息
    },

    // 粘贴过滤样式，默认开启
    pasteFilterStyle: true,

    // 粘贴内容时，忽略图片。默认关闭
    pasteIgnoreImg: false,

    // 对粘贴的文字进行自定义处理，返回处理后的结果。编辑器会将处理后的结果粘贴到编辑区域中。
    // IE 暂时不支持
    pasteTextHandle: function pasteTextHandle(content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        return content;
    },

    // onchange 事件
    // onchange: function (html) {
    //     // html 即变化之后的内容
    //     console.log(html)
    // },

    // 是否显示添加网络图片的 tab
    showLinkImg: true,

    // 插入网络图片的回调
    linkImgCallback: function linkImgCallback(url) {
        // console.log(url)  // url 即插入图片的地址
    },

    // 默认上传图片 max size: 5M
    uploadImgMaxSize: 5 * 1024 * 1024,

    // 配置一次最多上传几个图片
    // uploadImgMaxLength: 5,

    // 上传图片，是否显示 base64 格式
    uploadImgShowBase64: false,

    // 上传图片，server 地址（如果有值，则 base64 格式的配置则失效）
    // uploadImgServer: '/upload',

    // 自定义配置 filename
    uploadFileName: '',

    // 上传图片的自定义参数
    uploadImgParams: {
        // token: 'abcdef12345'
    },

    // 上传图片的自定义header
    uploadImgHeaders: {
        // 'Accept': 'text/x-json'
    },

    // 配置 XHR withCredentials
    withCredentials: false,

    // 自定义上传图片超时时间 ms
    uploadImgTimeout: 10000,

    // 上传图片 hook 
    uploadImgHooks: {
        // customInsert: function (insertLinkImg, result, editor) {
        //     console.log('customInsert')
        //     // 图片上传并返回结果，自定义插入图片的事件，而不是编辑器自动插入图片
        //     const data = result.data1 || []
        //     data.forEach(link => {
        //         insertLinkImg(link)
        //     })
        // },
        before: function before(xhr, editor, files) {
            // 图片上传之前触发

            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //     prevent: true,
            //     msg: '放弃上传'
            // }
        },
        success: function success(xhr, editor, result) {
            // 图片上传并返回结果，图片插入成功之后触发
        },
        fail: function fail(xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
        },
        error: function error(xhr, editor) {
            // 图片上传出错时触发
        },
        timeout: function timeout(xhr, editor) {
            // 图片上传超时时触发
        }
    },

    // 是否上传七牛云，默认为 false
    qiniu: false

};

/*
    工具
*/

// 和 UA 相关的属性
var UA = {
    _ua: navigator.userAgent,

    // 是否 webkit
    isWebkit: function isWebkit() {
        var reg = /webkit/i;
        return reg.test(this._ua);
    },

    // 是否 IE
    isIE: function isIE() {
        return 'ActiveXObject' in window;
    }
};

// 遍历对象
function objForEach(obj, fn) {
    var key = void 0,
        result = void 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            result = fn.call(obj, key, obj[key]);
            if (result === false) {
                break;
            }
        }
    }
}

// 遍历类数组
function arrForEach(fakeArr, fn) {
    var i = void 0,
        item = void 0,
        result = void 0;
    var length = fakeArr.length || 0;
    for (i = 0; i < length; i++) {
        item = fakeArr[i];
        result = fn.call(fakeArr, item, i);
        if (result === false) {
            break;
        }
    }
}

// 获取随机数
function getRandom(prefix) {
    return prefix + Math.random().toString().slice(2);
}

// 替换 html 特殊字符
function replaceHtmlSymbol(html) {
    if (html == null) {
        return '';
    }
    return html.replace(/</gm, '&lt;').replace(/>/gm, '&gt;').replace(/"/gm, '&quot;').replace(/(\r\n|\r|\n)/g, '<br/>');
}

// 返回百分比的格式


// 判断是不是 function
function isFunction(fn) {
    return typeof fn === 'function';
}

/*
    bold-menu
*/
// 构造函数
function Bold(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-bold"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Bold.prototype = {
    constructor: Bold,

    // 点击事件
    onClick: function onClick(e) {
        // 点击菜单将触发这里

        var editor = this.editor;
        var isSeleEmpty = editor.selection.isSelectionEmpty();

        if (isSeleEmpty) {
            // 选区是空的，插入并选中一个“空白”
            editor.selection.createEmptyRange();
        }

        // 执行 bold 命令
        editor.cmd.do('bold');

        if (isSeleEmpty) {
            // 需要将选取折叠起来
            editor.selection.collapseRange();
            editor.selection.restoreSelection();
        }
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        if (editor.cmd.queryCommandState('bold')) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    替换多语言
 */

var replaceLang = function (editor, str) {
    var langArgs = editor.config.langArgs || [];
    var result = str;

    langArgs.forEach(function (item) {
        var reg = item.reg;
        var val = item.val;

        if (reg.test(result)) {
            result = result.replace(reg, function () {
                return val;
            });
        }
    });

    return result;
};

/*
    droplist
*/
var _emptyFn = function _emptyFn() {};

// 构造函数
function DropList(menu, opt) {
    var _this = this;

    // droplist 所依附的菜单
    var editor = menu.editor;
    this.menu = menu;
    this.opt = opt;
    // 容器
    var $container = $('<div class="w-e-droplist"></div>');

    // 标题
    var $title = opt.$title;
    var titleHtml = void 0;
    if ($title) {
        // 替换多语言
        titleHtml = $title.html();
        titleHtml = replaceLang(editor, titleHtml);
        $title.html(titleHtml);

        $title.addClass('w-e-dp-title');
        $container.append($title);
    }

    var list = opt.list || [];
    var type = opt.type || 'list'; // 'list' 列表形式（如“标题”菜单） / 'inline-block' 块状形式（如“颜色”菜单）
    var onClick = opt.onClick || _emptyFn;

    // 加入 DOM 并绑定事件
    var $list = $('<ul class="' + (type === 'list' ? 'w-e-list' : 'w-e-block') + '"></ul>');
    $container.append($list);
    list.forEach(function (item) {
        var $elem = item.$elem;

        // 替换多语言
        var elemHtml = $elem.html();
        elemHtml = replaceLang(editor, elemHtml);
        $elem.html(elemHtml);

        var value = item.value;
        var $li = $('<li class="w-e-item"></li>');
        if ($elem) {
            $li.append($elem);
            $list.append($li);
            $li.on('click', function (e) {
                onClick(value);

                // 隐藏
                _this.hideTimeoutId = setTimeout(function () {
                    _this.hide();
                }, 0);
            });
        }
    });

    // 绑定隐藏事件
    $container.on('mouseleave', function (e) {
        _this.hideTimeoutId = setTimeout(function () {
            _this.hide();
        }, 0);
    });

    // 记录属性
    this.$container = $container;

    // 基本属性
    this._rendered = false;
    this._show = false;
}

// 原型
DropList.prototype = {
    constructor: DropList,

    // 显示（插入DOM）
    show: function show() {
        if (this.hideTimeoutId) {
            // 清除之前的定时隐藏
            clearTimeout(this.hideTimeoutId);
        }

        var menu = this.menu;
        var $menuELem = menu.$elem;
        var $container = this.$container;
        if (this._show) {
            return;
        }
        if (this._rendered) {
            // 显示
            $container.show();
        } else {
            // 加入 DOM 之前先定位位置
            var menuHeight = $menuELem.getSizeData().height || 0;
            var width = this.opt.width || 100; // 默认为 100
            $container.css('margin-top', menuHeight + 'px').css('width', width + 'px');

            // 加入到 DOM
            $menuELem.append($container);
            this._rendered = true;
        }

        // 修改属性
        this._show = true;
    },

    // 隐藏（移除DOM）
    hide: function hide() {
        if (this.showTimeoutId) {
            // 清除之前的定时显示
            clearTimeout(this.showTimeoutId);
        }

        var $container = this.$container;
        if (!this._show) {
            return;
        }
        // 隐藏并需改属性
        $container.hide();
        this._show = false;
    }
};

/*
    menu - header
*/
// 构造函数
function Head(editor) {
    var _this = this;

    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-header"></i></div>');
    this.type = 'droplist';

    // 当前是否 active 状态
    this._active = false;

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 100,
        $title: $('<p>设置标题</p>'),
        type: 'list', // droplist 以列表形式展示
        list: [{ $elem: $('<h1>H1</h1>'), value: '<h1>' }, { $elem: $('<h2>H2</h2>'), value: '<h2>' }, { $elem: $('<h3>H3</h3>'), value: '<h3>' }, { $elem: $('<h4>H4</h4>'), value: '<h4>' }, { $elem: $('<h5>H5</h5>'), value: '<h5>' }, { $elem: $('<p>正文</p>'), value: '<p>' }],
        onClick: function onClick(value) {
            // 注意 this 是指向当前的 Head 对象
            _this._command(value);
        }
    });
}

// 原型
Head.prototype = {
    constructor: Head,

    // 执行命令
    _command: function _command(value) {
        var editor = this.editor;

        var $selectionElem = editor.selection.getSelectionContainerElem();
        if (editor.$textElem.equal($selectionElem)) {
            // 不能选中多行来设置标题，否则会出现问题
            // 例如选中的是 <p>xxx</p><p>yyy</p> 来设置标题，设置之后会成为 <h1>xxx<br>yyy</h1> 不符合预期
            return;
        }

        editor.cmd.do('formatBlock', value);
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        var reg = /^h/i;
        var cmdValue = editor.cmd.queryCommandValue('formatBlock');
        if (reg.test(cmdValue)) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    menu - fontSize
*/

// 构造函数
function FontSize(editor) {
    var _this = this;

    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-text-heigh"></i></div>');
    this.type = 'droplist';

    // 当前是否 active 状态
    this._active = false;

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 160,
        $title: $('<p>字号</p>'),
        type: 'list', // droplist 以列表形式展示
        list: [{ $elem: $('<span style="font-size: x-small;">x-small</span>'), value: '1' }, { $elem: $('<span style="font-size: small;">small</span>'), value: '2' }, { $elem: $('<span>normal</span>'), value: '3' }, { $elem: $('<span style="font-size: large;">large</span>'), value: '4' }, { $elem: $('<span style="font-size: x-large;">x-large</span>'), value: '5' }, { $elem: $('<span style="font-size: xx-large;">xx-large</span>'), value: '6' }],
        onClick: function onClick(value) {
            // 注意 this 是指向当前的 FontSize 对象
            _this._command(value);
        }
    });
}

// 原型
FontSize.prototype = {
    constructor: FontSize,

    // 执行命令
    _command: function _command(value) {
        var editor = this.editor;
        editor.cmd.do('fontSize', value);
    }
};

/*
    menu - fontName
*/

// 构造函数
function FontName(editor) {
    var _this = this;

    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-font"></i></div>');
    this.type = 'droplist';

    // 当前是否 active 状态
    this._active = false;

    // 获取配置的字体
    var config = editor.config;
    var fontNames = config.fontNames || [];

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 100,
        $title: $('<p>字体</p>'),
        type: 'list', // droplist 以列表形式展示
        list: fontNames.map(function (fontName) {
            return { $elem: $('<span style="font-family: ' + fontName + ';">' + fontName + '</span>'), value: fontName };
        }),
        onClick: function onClick(value) {
            // 注意 this 是指向当前的 FontName 对象
            _this._command(value);
        }
    });
}

// 原型
FontName.prototype = {
    constructor: FontName,

    _command: function _command(value) {
        var editor = this.editor;
        editor.cmd.do('fontName', value);
    }
};

/*
    panel
*/

var emptyFn = function emptyFn() {};

// 记录已经显示 panel 的菜单
var _isCreatedPanelMenus = [];

// 构造函数
function Panel(menu, opt) {
    this.menu = menu;
    this.opt = opt;
}

// 原型
Panel.prototype = {
    constructor: Panel,

    // 显示（插入DOM）
    show: function show() {
        var _this = this;

        var menu = this.menu;
        if (_isCreatedPanelMenus.indexOf(menu) >= 0) {
            // 该菜单已经创建了 panel 不能再创建
            return;
        }

        var editor = menu.editor;
        var $body = $('body');
        var $textContainerElem = editor.$textContainerElem;
        var opt = this.opt;

        // panel 的容器
        var $container = $('<div class="w-e-panel-container"></div>');
        var width = opt.width || 300; // 默认 300px
        $container.css('width', width + 'px').css('margin-left', (0 - width) / 2 + 'px');

        // 添加关闭按钮
        var $closeBtn = $('<i class="w-e-icon-close w-e-panel-close"></i>');
        $container.append($closeBtn);
        $closeBtn.on('click', function () {
            _this.hide();
        });

        // 准备 tabs 容器
        var $tabTitleContainer = $('<ul class="w-e-panel-tab-title"></ul>');
        var $tabContentContainer = $('<div class="w-e-panel-tab-content"></div>');
        $container.append($tabTitleContainer).append($tabContentContainer);

        // 设置高度
        var height = opt.height;
        if (height) {
            $tabContentContainer.css('height', height + 'px').css('overflow-y', 'auto');
        }

        // tabs
        var tabs = opt.tabs || [];
        var tabTitleArr = [];
        var tabContentArr = [];
        tabs.forEach(function (tab, tabIndex) {
            if (!tab) {
                return;
            }
            var title = tab.title || '';
            var tpl = tab.tpl || '';

            // 替换多语言
            title = replaceLang(editor, title);
            tpl = replaceLang(editor, tpl);

            // 添加到 DOM
            var $title = $('<li class="w-e-item">' + title + '</li>');
            $tabTitleContainer.append($title);
            var $content = $(tpl);
            $tabContentContainer.append($content);

            // 记录到内存
            $title._index = tabIndex;
            tabTitleArr.push($title);
            tabContentArr.push($content);

            // 设置 active 项
            if (tabIndex === 0) {
                $title._active = true;
                $title.addClass('w-e-active');
            } else {
                $content.hide();
            }

            // 绑定 tab 的事件
            $title.on('click', function (e) {
                if ($title._active) {
                    return;
                }
                // 隐藏所有的 tab
                tabTitleArr.forEach(function ($title) {
                    $title._active = false;
                    $title.removeClass('w-e-active');
                });
                tabContentArr.forEach(function ($content) {
                    $content.hide();
                });

                // 显示当前的 tab
                $title._active = true;
                $title.addClass('w-e-active');
                $content.show();
            });
        });

        // 绑定关闭事件
        $container.on('click', function (e) {
            // 点击时阻止冒泡
            e.stopPropagation();
        });
        $body.on('click', function (e) {
            _this.hide();
        });

        // 添加到 DOM
        $textContainerElem.append($container);

        // 绑定 opt 的事件，只有添加到 DOM 之后才能绑定成功
        tabs.forEach(function (tab, index) {
            if (!tab) {
                return;
            }
            var events = tab.events || [];
            events.forEach(function (event) {
                var selector = event.selector;
                var type = event.type;
                var fn = event.fn || emptyFn;
                var $content = tabContentArr[index];
                $content.find(selector).on(type, function (e) {
                    e.stopPropagation();
                    var needToHide = fn(e);
                    // 执行完事件之后，是否要关闭 panel
                    if (needToHide) {
                        _this.hide();
                    }
                });
            });
        });

        // focus 第一个 elem
        var $inputs = $container.find('input[type=text],textarea');
        if ($inputs.length) {
            $inputs.get(0).focus();
        }

        // 添加到属性
        this.$container = $container;

        // 隐藏其他 panel
        this._hideOtherPanels();
        // 记录该 menu 已经创建了 panel
        _isCreatedPanelMenus.push(menu);
    },

    // 隐藏（移除DOM）
    hide: function hide() {
        var menu = this.menu;
        var $container = this.$container;
        if ($container) {
            $container.remove();
        }

        // 将该 menu 记录中移除
        _isCreatedPanelMenus = _isCreatedPanelMenus.filter(function (item) {
            if (item === menu) {
                return false;
            } else {
                return true;
            }
        });
    },

    // 一个 panel 展示时，隐藏其他 panel
    _hideOtherPanels: function _hideOtherPanels() {
        if (!_isCreatedPanelMenus.length) {
            return;
        }
        _isCreatedPanelMenus.forEach(function (menu) {
            var panel = menu.panel || {};
            if (panel.hide) {
                panel.hide();
            }
        });
    }
};

/*
    menu - link
*/
// 构造函数
function Link(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-link"></i></div>');
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Link.prototype = {
    constructor: Link,

    // 点击事件
    onClick: function onClick(e) {
        var editor = this.editor;
        var $linkelem = void 0;

        if (this._active) {
            // 当前选区在链接里面
            $linkelem = editor.selection.getSelectionContainerElem();
            if (!$linkelem) {
                return;
            }
            // 将该元素都包含在选取之内，以便后面整体替换
            editor.selection.createRangeByElem($linkelem);
            editor.selection.restoreSelection();
            // 显示 panel
            this._createPanel($linkelem.text(), $linkelem.attr('href'));
        } else {
            // 当前选区不在链接里面
            if (editor.selection.isSelectionEmpty()) {
                // 选区是空的，未选中内容
                this._createPanel('', '');
            } else {
                // 选中内容了
                this._createPanel(editor.selection.getSelectionText(), '');
            }
        }
    },

    // 创建 panel
    _createPanel: function _createPanel(text, link) {
        var _this = this;

        // panel 中需要用到的id
        var inputLinkId = getRandom('input-link');
        var inputTextId = getRandom('input-text');
        var btnOkId = getRandom('btn-ok');
        var btnDelId = getRandom('btn-del');

        // 是否显示“删除链接”
        var delBtnDisplay = this._active ? 'inline-block' : 'none';

        // 初始化并显示 panel
        var panel = new Panel(this, {
            width: 300,
            // panel 中可包含多个 tab
            tabs: [{
                // tab 的标题
                title: '链接',
                // 模板
                tpl: '<div>\n                            <input id="' + inputTextId + '" type="text" class="block" value="' + text + '" placeholder="\u94FE\u63A5\u6587\u5B57"/></td>\n                            <input id="' + inputLinkId + '" type="text" class="block" value="' + link + '" placeholder="http://..."/></td>\n                            <div class="w-e-button-container">\n                                <button id="' + btnOkId + '" class="right">\u63D2\u5165</button>\n                                <button id="' + btnDelId + '" class="gray right" style="display:' + delBtnDisplay + '">\u5220\u9664\u94FE\u63A5</button>\n                            </div>\n                        </div>',
                // 事件绑定
                events: [
                // 插入链接
                {
                    selector: '#' + btnOkId,
                    type: 'click',
                    fn: function fn() {
                        // 执行插入链接
                        var $link = $('#' + inputLinkId);
                        var $text = $('#' + inputTextId);
                        var link = $link.val();
                        var text = $text.val();
                        _this._insertLink(text, link);

                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                },
                // 删除链接
                {
                    selector: '#' + btnDelId,
                    type: 'click',
                    fn: function fn() {
                        // 执行删除链接
                        _this._delLink();

                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }]
            } // tab end
            ] // tabs end
        });

        // 显示 panel
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 删除当前链接
    _delLink: function _delLink() {
        if (!this._active) {
            return;
        }
        var editor = this.editor;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        var selectionText = editor.selection.getSelectionText();
        editor.cmd.do('insertHTML', '<span>' + selectionText + '</span>');
    },

    // 插入链接
    _insertLink: function _insertLink(text, link) {
        var editor = this.editor;
        var config = editor.config;
        var linkCheck = config.linkCheck;
        var checkResult = true; // 默认为 true
        if (linkCheck && typeof linkCheck === 'function') {
            checkResult = linkCheck(text, link);
        }
        if (checkResult === true) {
            editor.cmd.do('insertHTML', '<a href="' + link + '" target="_blank">' + text + '</a>');
        } else {
            alert(checkResult);
        }
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        if ($selectionELem.getNodeName() === 'A') {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    italic-menu
*/
// 构造函数
function Italic(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-italic"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Italic.prototype = {
    constructor: Italic,

    // 点击事件
    onClick: function onClick(e) {
        // 点击菜单将触发这里

        var editor = this.editor;
        var isSeleEmpty = editor.selection.isSelectionEmpty();

        if (isSeleEmpty) {
            // 选区是空的，插入并选中一个“空白”
            editor.selection.createEmptyRange();
        }

        // 执行 italic 命令
        editor.cmd.do('italic');

        if (isSeleEmpty) {
            // 需要将选取折叠起来
            editor.selection.collapseRange();
            editor.selection.restoreSelection();
        }
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        if (editor.cmd.queryCommandState('italic')) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    redo-menu
*/
// 构造函数
function Redo(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-redo"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Redo.prototype = {
    constructor: Redo,

    // 点击事件
    onClick: function onClick(e) {
        // 点击菜单将触发这里

        var editor = this.editor;

        // 执行 redo 命令
        editor.cmd.do('redo');
    }
};

/*
    strikeThrough-menu
*/
// 构造函数
function StrikeThrough(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-strikethrough"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
StrikeThrough.prototype = {
    constructor: StrikeThrough,

    // 点击事件
    onClick: function onClick(e) {
        // 点击菜单将触发这里

        var editor = this.editor;
        var isSeleEmpty = editor.selection.isSelectionEmpty();

        if (isSeleEmpty) {
            // 选区是空的，插入并选中一个“空白”
            editor.selection.createEmptyRange();
        }

        // 执行 strikeThrough 命令
        editor.cmd.do('strikeThrough');

        if (isSeleEmpty) {
            // 需要将选取折叠起来
            editor.selection.collapseRange();
            editor.selection.restoreSelection();
        }
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        if (editor.cmd.queryCommandState('strikeThrough')) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    underline-menu
*/
// 构造函数
function Underline(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-underline"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Underline.prototype = {
    constructor: Underline,

    // 点击事件
    onClick: function onClick(e) {
        // 点击菜单将触发这里

        var editor = this.editor;
        var isSeleEmpty = editor.selection.isSelectionEmpty();

        if (isSeleEmpty) {
            // 选区是空的，插入并选中一个“空白”
            editor.selection.createEmptyRange();
        }

        // 执行 underline 命令
        editor.cmd.do('underline');

        if (isSeleEmpty) {
            // 需要将选取折叠起来
            editor.selection.collapseRange();
            editor.selection.restoreSelection();
        }
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        if (editor.cmd.queryCommandState('underline')) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    undo-menu
*/
// 构造函数
function Undo(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-undo"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Undo.prototype = {
    constructor: Undo,

    // 点击事件
    onClick: function onClick(e) {
        // 点击菜单将触发这里

        var editor = this.editor;

        // 执行 undo 命令
        editor.cmd.do('undo');
    }
};

/*
    menu - list
*/
// 构造函数
function List(editor) {
    var _this = this;

    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-list2"></i></div>');
    this.type = 'droplist';

    // 当前是否 active 状态
    this._active = false;

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 120,
        $title: $('<p>设置列表</p>'),
        type: 'list', // droplist 以列表形式展示
        list: [{ $elem: $('<span><i class="w-e-icon-list-numbered"></i> 有序列表</span>'), value: 'insertOrderedList' }, { $elem: $('<span><i class="w-e-icon-list2"></i> 无序列表</span>'), value: 'insertUnorderedList' }],
        onClick: function onClick(value) {
            // 注意 this 是指向当前的 List 对象
            _this._command(value);
        }
    });
}

// 原型
List.prototype = {
    constructor: List,

    // 执行命令
    _command: function _command(value) {
        var editor = this.editor;
        var $textElem = editor.$textElem;
        editor.selection.restoreSelection();
        if (editor.cmd.queryCommandState(value)) {
            return;
        }
        editor.cmd.do(value);

        // 验证列表是否被包裹在 <p> 之内
        var $selectionElem = editor.selection.getSelectionContainerElem();
        if ($selectionElem.getNodeName() === 'LI') {
            $selectionElem = $selectionElem.parent();
        }
        if (/^ol|ul$/i.test($selectionElem.getNodeName()) === false) {
            return;
        }
        if ($selectionElem.equal($textElem)) {
            // 证明是顶级标签，没有被 <p> 包裹
            return;
        }
        var $parent = $selectionElem.parent();
        if ($parent.equal($textElem)) {
            // $parent 是顶级标签，不能删除
            return;
        }

        $selectionElem.insertAfter($parent);
        $parent.remove();
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        if (editor.cmd.queryCommandState('insertUnOrderedList') || editor.cmd.queryCommandState('insertOrderedList')) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    menu - justify
*/
// 构造函数
function Justify(editor) {
    var _this = this;

    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-paragraph-left"></i></div>');
    this.type = 'droplist';

    // 当前是否 active 状态
    this._active = false;

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 100,
        $title: $('<p>对齐方式</p>'),
        type: 'list', // droplist 以列表形式展示
        list: [{ $elem: $('<span><i class="w-e-icon-paragraph-left"></i> 靠左</span>'), value: 'justifyLeft' }, { $elem: $('<span><i class="w-e-icon-paragraph-center"></i> 居中</span>'), value: 'justifyCenter' }, { $elem: $('<span><i class="w-e-icon-paragraph-right"></i> 靠右</span>'), value: 'justifyRight' }],
        onClick: function onClick(value) {
            // 注意 this 是指向当前的 List 对象
            _this._command(value);
        }
    });
}

// 原型
Justify.prototype = {
    constructor: Justify,

    // 执行命令
    _command: function _command(value) {
        var editor = this.editor;
        editor.cmd.do(value);
    }
};

/*
    menu - Forecolor
*/
// 构造函数
function ForeColor(editor) {
    var _this = this;

    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-pencil2"></i></div>');
    this.type = 'droplist';

    // 获取配置的颜色
    var config = editor.config;
    var colors = config.colors || [];

    // 当前是否 active 状态
    this._active = false;

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 120,
        $title: $('<p>文字颜色</p>'),
        type: 'inline-block', // droplist 内容以 block 形式展示
        list: colors.map(function (color) {
            return { $elem: $('<i style="color:' + color + ';" class="w-e-icon-pencil2"></i>'), value: color };
        }),
        onClick: function onClick(value) {
            // 注意 this 是指向当前的 ForeColor 对象
            _this._command(value);
        }
    });
}

// 原型
ForeColor.prototype = {
    constructor: ForeColor,

    // 执行命令
    _command: function _command(value) {
        var editor = this.editor;
        editor.cmd.do('foreColor', value);
    }
};

/*
    menu - BackColor
*/
// 构造函数
function BackColor(editor) {
    var _this = this;

    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-paint-brush"></i></div>');
    this.type = 'droplist';

    // 获取配置的颜色
    var config = editor.config;
    var colors = config.colors || [];

    // 当前是否 active 状态
    this._active = false;

    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 120,
        $title: $('<p>背景色</p>'),
        type: 'inline-block', // droplist 内容以 block 形式展示
        list: colors.map(function (color) {
            return { $elem: $('<i style="color:' + color + ';" class="w-e-icon-paint-brush"></i>'), value: color };
        }),
        onClick: function onClick(value) {
            // 注意 this 是指向当前的 BackColor 对象
            _this._command(value);
        }
    });
}

// 原型
BackColor.prototype = {
    constructor: BackColor,

    // 执行命令
    _command: function _command(value) {
        var editor = this.editor;
        editor.cmd.do('backColor', value);
    }
};

/*
    menu - quote
*/
// 构造函数
function Quote(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-quotes-left"></i>\n        </div>');
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Quote.prototype = {
    constructor: Quote,

    onClick: function onClick(e) {
        var editor = this.editor;
        var $selectionElem = editor.selection.getSelectionContainerElem();
        var nodeName = $selectionElem.getNodeName();

        if (!UA.isIE()) {
            if (nodeName === 'BLOCKQUOTE') {
                // 撤销 quote
                editor.cmd.do('formatBlock', '<P>');
            } else {
                // 转换为 quote
                editor.cmd.do('formatBlock', '<BLOCKQUOTE>');
            }
            return;
        }

        // IE 中不支持 formatBlock <BLOCKQUOTE> ，要用其他方式兼容
        var content = void 0,
            $targetELem = void 0;
        if (nodeName === 'P') {
            // 将 P 转换为 quote
            content = $selectionElem.text();
            $targetELem = $('<blockquote>' + content + '</blockquote>');
            $targetELem.insertAfter($selectionElem);
            $selectionElem.remove();
            return;
        }
        if (nodeName === 'BLOCKQUOTE') {
            // 撤销 quote
            content = $selectionElem.text();
            $targetELem = $('<p>' + content + '</p>');
            $targetELem.insertAfter($selectionElem);
            $selectionElem.remove();
        }
    },

    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        var reg = /^BLOCKQUOTE$/i;
        var cmdValue = editor.cmd.queryCommandValue('formatBlock');
        if (reg.test(cmdValue)) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    menu - code
*/
// 构造函数
function Code(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-terminal"></i>\n        </div>');
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Code.prototype = {
    constructor: Code,

    onClick: function onClick(e) {
        var editor = this.editor;
        var $startElem = editor.selection.getSelectionStartElem();
        var $endElem = editor.selection.getSelectionEndElem();
        var isSeleEmpty = editor.selection.isSelectionEmpty();
        var selectionText = editor.selection.getSelectionText();
        var $code = void 0;

        if (!$startElem.equal($endElem)) {
            // 跨元素选择，不做处理
            editor.selection.restoreSelection();
            return;
        }
        if (!isSeleEmpty) {
            // 选取不是空，用 <code> 包裹即可
            $code = $('<code>' + selectionText + '</code>');
            editor.cmd.do('insertElem', $code);
            editor.selection.createRangeByElem($code, false);
            editor.selection.restoreSelection();
            return;
        }

        // 选取是空，且没有夸元素选择，则插入 <pre><code></code></prev>
        if (this._active) {
            // 选中状态，将编辑内容
            this._createPanel($startElem.html());
        } else {
            // 未选中状态，将创建内容
            this._createPanel();
        }
    },

    _createPanel: function _createPanel(value) {
        var _this = this;

        // value - 要编辑的内容
        value = value || '';
        var type = !value ? 'new' : 'edit';
        var textId = getRandom('texxt');
        var btnId = getRandom('btn');

        var panel = new Panel(this, {
            width: 500,
            // 一个 Panel 包含多个 tab
            tabs: [{
                // 标题
                title: '插入代码',
                // 模板
                tpl: '<div>\n                        <textarea id="' + textId + '" style="height:145px;;">' + value + '</textarea>\n                        <div class="w-e-button-container">\n                            <button id="' + btnId + '" class="right">\u63D2\u5165</button>\n                        </div>\n                    <div>',
                // 事件绑定
                events: [
                // 插入代码
                {
                    selector: '#' + btnId,
                    type: 'click',
                    fn: function fn() {
                        var $text = $('#' + textId);
                        var text = $text.val() || $text.html();
                        text = replaceHtmlSymbol(text);
                        if (type === 'new') {
                            // 新插入
                            _this._insertCode(text);
                        } else {
                            // 编辑更新
                            _this._updateCode(text);
                        }

                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }]
            } // first tab end
            ] // tabs end
        }); // new Panel end

        // 显示 panel
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 插入代码
    _insertCode: function _insertCode(value) {
        var editor = this.editor;
        editor.cmd.do('insertHTML', '<pre><code>' + value + '</code></pre><p><br></p>');
    },

    // 更新代码
    _updateCode: function _updateCode(value) {
        var editor = this.editor;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        $selectionELem.html(value);
        editor.selection.restoreSelection();
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        var $parentElem = $selectionELem.parent();
        if ($selectionELem.getNodeName() === 'CODE' && $parentElem.getNodeName() === 'PRE') {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    menu - emoticon
*/
// 构造函数
function Emoticon(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu">\n            <i class="w-e-icon-happy"></i>\n        </div>');
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Emoticon.prototype = {
    constructor: Emoticon,

    onClick: function onClick() {
        this._createPanel();
    },

    _createPanel: function _createPanel() {
        var _this = this;

        var editor = this.editor;
        var config = editor.config;
        // 获取表情配置
        var emotions = config.emotions || [];

        // 创建表情 dropPanel 的配置
        var tabConfig = [];
        emotions.forEach(function (emotData) {
            var emotType = emotData.type;
            var content = emotData.content || [];

            // 这一组表情最终拼接出来的 html
            var faceHtml = '';

            // emoji 表情
            if (emotType === 'emoji') {
                content.forEach(function (item) {
                    if (item) {
                        faceHtml += '<span class="w-e-item">' + item + '</span>';
                    }
                });
            }
            // 图片表情
            if (emotType === 'image') {
                content.forEach(function (item) {
                    var src = item.src;
                    var alt = item.alt;
                    if (src) {
                        // 加一个 data-w-e 属性，点击图片的时候不再提示编辑图片
                        faceHtml += '<span class="w-e-item"><img src="' + src + '" alt="' + alt + '" data-w-e="1"/></span>';
                    }
                });
            }

            tabConfig.push({
                title: emotData.title,
                tpl: '<div class="w-e-emoticon-container">' + faceHtml + '</div>',
                events: [{
                    selector: 'span.w-e-item',
                    type: 'click',
                    fn: function fn(e) {
                        var target = e.target;
                        var $target = $(target);
                        var nodeName = $target.getNodeName();

                        var insertHtml = void 0;
                        if (nodeName === 'IMG') {
                            // 插入图片
                            insertHtml = $target.parent().html();
                        } else {
                            // 插入 emoji
                            insertHtml = '<span>' + $target.html() + '</span>';
                        }

                        _this._insert(insertHtml);
                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }]
            });
        });

        var panel = new Panel(this, {
            width: 300,
            height: 200,
            // 一个 Panel 包含多个 tab
            tabs: tabConfig
        });

        // 显示 panel
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 插入表情
    _insert: function _insert(emotHtml) {
        var editor = this.editor;
        editor.cmd.do('insertHTML', emotHtml);
    }
};

/*
    menu - table
*/
// 构造函数
function Table(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-table2"></i></div>');
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Table.prototype = {
    constructor: Table,

    onClick: function onClick() {
        if (this._active) {
            // 编辑现有表格
            this._createEditPanel();
        } else {
            // 插入新表格
            this._createInsertPanel();
        }
    },

    // 创建插入新表格的 panel
    _createInsertPanel: function _createInsertPanel() {
        var _this = this;

        // 用到的 id
        var btnInsertId = getRandom('btn');
        var textRowNum = getRandom('row');
        var textColNum = getRandom('col');

        var panel = new Panel(this, {
            width: 250,
            // panel 包含多个 tab
            tabs: [{
                // 标题
                title: '插入表格',
                // 模板
                tpl: '<div>\n                        <p style="text-align:left; padding:5px 0;">\n                            \u521B\u5EFA\n                            <input id="' + textRowNum + '" type="text" value="5" style="width:40px;text-align:center;"/>\n                            \u884C\n                            <input id="' + textColNum + '" type="text" value="5" style="width:40px;text-align:center;"/>\n                            \u5217\u7684\u8868\u683C\n                        </p>\n                        <div class="w-e-button-container">\n                            <button id="' + btnInsertId + '" class="right">\u63D2\u5165</button>\n                        </div>\n                    </div>',
                // 事件绑定
                events: [{
                    // 点击按钮，插入表格
                    selector: '#' + btnInsertId,
                    type: 'click',
                    fn: function fn() {
                        var rowNum = parseInt($('#' + textRowNum).val());
                        var colNum = parseInt($('#' + textColNum).val());

                        if (rowNum && colNum && rowNum > 0 && colNum > 0) {
                            // form 数据有效
                            _this._insert(rowNum, colNum);
                        }

                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }]
            } // first tab end
            ] // tabs end
        }); // panel end

        // 展示 panel
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 插入表格
    _insert: function _insert(rowNum, colNum) {
        // 拼接 table 模板
        var r = void 0,
            c = void 0;
        var html = '<table border="0" width="100%" cellpadding="0" cellspacing="0">';
        for (r = 0; r < rowNum; r++) {
            html += '<tr>';
            if (r === 0) {
                for (c = 0; c < colNum; c++) {
                    html += '<th>&nbsp;</th>';
                }
            } else {
                for (c = 0; c < colNum; c++) {
                    html += '<td>&nbsp;</td>';
                }
            }
            html += '</tr>';
        }
        html += '</table><p><br></p>';

        // 执行命令
        var editor = this.editor;
        editor.cmd.do('insertHTML', html);

        // 防止 firefox 下出现 resize 的控制点
        editor.cmd.do('enableObjectResizing', false);
        editor.cmd.do('enableInlineTableEditing', false);
    },

    // 创建编辑表格的 panel
    _createEditPanel: function _createEditPanel() {
        var _this2 = this;

        // 可用的 id
        var addRowBtnId = getRandom('add-row');
        var addColBtnId = getRandom('add-col');
        var delRowBtnId = getRandom('del-row');
        var delColBtnId = getRandom('del-col');
        var delTableBtnId = getRandom('del-table');

        // 创建 panel 对象
        var panel = new Panel(this, {
            width: 320,
            // panel 包含多个 tab
            tabs: [{
                // 标题
                title: '编辑表格',
                // 模板
                tpl: '<div>\n                        <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                            <button id="' + addRowBtnId + '" class="left">\u589E\u52A0\u884C</button>\n                            <button id="' + delRowBtnId + '" class="red left">\u5220\u9664\u884C</button>\n                            <button id="' + addColBtnId + '" class="left">\u589E\u52A0\u5217</button>\n                            <button id="' + delColBtnId + '" class="red left">\u5220\u9664\u5217</button>\n                        </div>\n                        <div class="w-e-button-container">\n                            <button id="' + delTableBtnId + '" class="gray left">\u5220\u9664\u8868\u683C</button>\n                        </dv>\n                    </div>',
                // 事件绑定
                events: [{
                    // 增加行
                    selector: '#' + addRowBtnId,
                    type: 'click',
                    fn: function fn() {
                        _this2._addRow();
                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }, {
                    // 增加列
                    selector: '#' + addColBtnId,
                    type: 'click',
                    fn: function fn() {
                        _this2._addCol();
                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }, {
                    // 删除行
                    selector: '#' + delRowBtnId,
                    type: 'click',
                    fn: function fn() {
                        _this2._delRow();
                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }, {
                    // 删除列
                    selector: '#' + delColBtnId,
                    type: 'click',
                    fn: function fn() {
                        _this2._delCol();
                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }, {
                    // 删除表格
                    selector: '#' + delTableBtnId,
                    type: 'click',
                    fn: function fn() {
                        _this2._delTable();
                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }]
            }]
        });
        // 显示 panel
        panel.show();
    },

    // 获取选中的单元格的位置信息
    _getLocationData: function _getLocationData() {
        var result = {};
        var editor = this.editor;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        var nodeName = $selectionELem.getNodeName();
        if (nodeName !== 'TD' && nodeName !== 'TH') {
            return;
        }

        // 获取 td index
        var $tr = $selectionELem.parent();
        var $tds = $tr.children();
        var tdLength = $tds.length;
        $tds.forEach(function (td, index) {
            if (td === $selectionELem[0]) {
                // 记录并跳出循环
                result.td = {
                    index: index,
                    elem: td,
                    length: tdLength
                };
                return false;
            }
        });

        // 获取 tr index
        var $tbody = $tr.parent();
        var $trs = $tbody.children();
        var trLength = $trs.length;
        $trs.forEach(function (tr, index) {
            if (tr === $tr[0]) {
                // 记录并跳出循环
                result.tr = {
                    index: index,
                    elem: tr,
                    length: trLength
                };
                return false;
            }
        });

        // 返回结果
        return result;
    },

    // 增加行
    _addRow: function _addRow() {
        // 获取当前单元格的位置信息
        var locationData = this._getLocationData();
        if (!locationData) {
            return;
        }
        var trData = locationData.tr;
        var $currentTr = $(trData.elem);
        var tdData = locationData.td;
        var tdLength = tdData.length;

        // 拼接即将插入的字符串
        var newTr = document.createElement('tr');
        var tpl = '',
            i = void 0;
        for (i = 0; i < tdLength; i++) {
            tpl += '<td>&nbsp;</td>';
        }
        newTr.innerHTML = tpl;
        // 插入
        $(newTr).insertAfter($currentTr);
    },

    // 增加列
    _addCol: function _addCol() {
        // 获取当前单元格的位置信息
        var locationData = this._getLocationData();
        if (!locationData) {
            return;
        }
        var trData = locationData.tr;
        var tdData = locationData.td;
        var tdIndex = tdData.index;
        var $currentTr = $(trData.elem);
        var $trParent = $currentTr.parent();
        var $trs = $trParent.children();

        // 遍历所有行
        $trs.forEach(function (tr) {
            var $tr = $(tr);
            var $tds = $tr.children();
            var $currentTd = $tds.get(tdIndex);
            var name = $currentTd.getNodeName().toLowerCase();

            // new 一个 td，并插入
            var newTd = document.createElement(name);
            $(newTd).insertAfter($currentTd);
        });
    },

    // 删除行
    _delRow: function _delRow() {
        // 获取当前单元格的位置信息
        var locationData = this._getLocationData();
        if (!locationData) {
            return;
        }
        var trData = locationData.tr;
        var $currentTr = $(trData.elem);
        $currentTr.remove();
    },

    // 删除列
    _delCol: function _delCol() {
        // 获取当前单元格的位置信息
        var locationData = this._getLocationData();
        if (!locationData) {
            return;
        }
        var trData = locationData.tr;
        var tdData = locationData.td;
        var tdIndex = tdData.index;
        var $currentTr = $(trData.elem);
        var $trParent = $currentTr.parent();
        var $trs = $trParent.children();

        // 遍历所有行
        $trs.forEach(function (tr) {
            var $tr = $(tr);
            var $tds = $tr.children();
            var $currentTd = $tds.get(tdIndex);
            // 删除
            $currentTd.remove();
        });
    },

    // 删除表格
    _delTable: function _delTable() {
        var editor = this.editor;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        var $table = $selectionELem.parentUntil('table');
        if (!$table) {
            return;
        }
        $table.remove();
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        var $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem) {
            return;
        }
        var nodeName = $selectionELem.getNodeName();
        if (nodeName === 'TD' || nodeName === 'TH') {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    menu - video
*/
// 构造函数
function Video(editor) {
    this.editor = editor;
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-play"></i></div>');
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Video.prototype = {
    constructor: Video,

    onClick: function onClick() {
        this._createPanel();
    },

    _createPanel: function _createPanel() {
        var _this = this;

        // 创建 id
        var textValId = getRandom('text-val');
        var btnId = getRandom('btn');

        // 创建 panel
        var panel = new Panel(this, {
            width: 350,
            // 一个 panel 多个 tab
            tabs: [{
                // 标题
                title: '插入视频',
                // 模板
                tpl: '<div>\n                        <input id="' + textValId + '" type="text" class="block" placeholder="\u683C\u5F0F\u5982\uFF1A<iframe src=... ></iframe>"/>\n                        <div class="w-e-button-container">\n                            <button id="' + btnId + '" class="right">\u63D2\u5165</button>\n                        </div>\n                    </div>',
                // 事件绑定
                events: [{
                    selector: '#' + btnId,
                    type: 'click',
                    fn: function fn() {
                        var $text = $('#' + textValId);
                        var val = $text.val().trim();

                        // 测试用视频地址
                        // <iframe height=498 width=510 src='http://player.youku.com/embed/XMjcwMzc3MzM3Mg==' frameborder=0 'allowfullscreen'></iframe>

                        if (val) {
                            // 插入视频
                            _this._insert(val);
                        }

                        // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                        return true;
                    }
                }]
            } // first tab end
            ] // tabs end
        }); // panel end

        // 显示 panel
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 插入视频
    _insert: function _insert(val) {
        var editor = this.editor;
        editor.cmd.do('insertHTML', val + '<p><br></p>');
    }
};

/*
    menu - img
*/
// 构造函数
function Image(editor) {
    this.editor = editor;
    var imgMenuId = getRandom('w-e-img');
    this.$elem = $('<div class="w-e-menu" id="' + imgMenuId + '"><i class="w-e-icon-image"></i></div>');
    editor.imgMenuId = imgMenuId;
    this.type = 'panel';

    // 当前是否 active 状态
    this._active = false;
}

// 原型
Image.prototype = {
    constructor: Image,

    onClick: function onClick() {
        var editor = this.editor;
        var config = editor.config;
        if (config.qiniu) {
            return;
        }
        if (this._active) {
            this._createEditPanel();
        } else {
            this._createInsertPanel();
        }
    },

    _createEditPanel: function _createEditPanel() {
        var editor = this.editor;

        // id
        var width30 = getRandom('width-30');
        var width50 = getRandom('width-50');
        var width100 = getRandom('width-100');
        var delBtn = getRandom('del-btn');

        // tab 配置
        var tabsConfig = [{
            title: '编辑图片',
            tpl: '<div>\n                    <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                        <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">\u6700\u5927\u5BBD\u5EA6\uFF1A</span>\n                        <button id="' + width30 + '" class="left">30%</button>\n                        <button id="' + width50 + '" class="left">50%</button>\n                        <button id="' + width100 + '" class="left">100%</button>\n                    </div>\n                    <div class="w-e-button-container">\n                        <button id="' + delBtn + '" class="gray left">\u5220\u9664\u56FE\u7247</button>\n                    </dv>\n                </div>',
            events: [{
                selector: '#' + width30,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.css('max-width', '30%');
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }, {
                selector: '#' + width50,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.css('max-width', '50%');
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }, {
                selector: '#' + width100,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.css('max-width', '100%');
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }, {
                selector: '#' + delBtn,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg;
                    if ($img) {
                        $img.remove();
                    }
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true;
                }
            }]
        }];

        // 创建 panel 并显示
        var panel = new Panel(this, {
            width: 300,
            tabs: tabsConfig
        });
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    _createInsertPanel: function _createInsertPanel() {
        var editor = this.editor;
        var uploadImg = editor.uploadImg;
        var config = editor.config;

        // id
        var upTriggerId = getRandom('up-trigger');
        var upFileId = getRandom('up-file');
        var linkUrlId = getRandom('link-url');
        var linkBtnId = getRandom('link-btn');

        // tabs 的配置
        var tabsConfig = [{
            title: '上传图片',
            tpl: '<div class="w-e-up-img-container">\n                    <div id="' + upTriggerId + '" class="w-e-up-btn">\n                        <i class="w-e-icon-upload2"></i>\n                    </div>\n                    <div style="display:none;">\n                        <input id="' + upFileId + '" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>\n                    </div>\n                </div>',
            events: [{
                // 触发选择图片
                selector: '#' + upTriggerId,
                type: 'click',
                fn: function fn() {
                    var $file = $('#' + upFileId);
                    var fileElem = $file[0];
                    if (fileElem) {
                        fileElem.click();
                    } else {
                        // 返回 true 可关闭 panel
                        return true;
                    }
                }
            }, {
                // 选择图片完毕
                selector: '#' + upFileId,
                type: 'change',
                fn: function fn() {
                    var $file = $('#' + upFileId);
                    var fileElem = $file[0];
                    if (!fileElem) {
                        // 返回 true 可关闭 panel
                        return true;
                    }

                    // 获取选中的 file 对象列表
                    var fileList = fileElem.files;
                    if (fileList.length) {
                        uploadImg.uploadImg(fileList);
                    }

                    // 返回 true 可关闭 panel
                    return true;
                }
            }]
        }, // first tab end
        {
            title: '网络图片',
            tpl: '<div>\n                    <input id="' + linkUrlId + '" type="text" class="block" placeholder="\u56FE\u7247\u94FE\u63A5"/></td>\n                    <div class="w-e-button-container">\n                        <button id="' + linkBtnId + '" class="right">\u63D2\u5165</button>\n                    </div>\n                </div>',
            events: [{
                selector: '#' + linkBtnId,
                type: 'click',
                fn: function fn() {
                    var $linkUrl = $('#' + linkUrlId);
                    var url = $linkUrl.val().trim();

                    if (url) {
                        uploadImg.insertLinkImg(url);
                    }

                    // 返回 true 表示函数执行结束之后关闭 panel
                    return true;
                }
            }]
        } // second tab end
        ]; // tabs end

        // 判断 tabs 的显示
        var tabsConfigResult = [];
        if ((config.uploadImgShowBase64 || config.uploadImgServer || config.customUploadImg) && window.FileReader) {
            // 显示“上传图片”
            tabsConfigResult.push(tabsConfig[0]);
        }
        if (config.showLinkImg) {
            // 显示“网络图片”
            tabsConfigResult.push(tabsConfig[1]);
        }

        // 创建 panel 并显示
        var panel = new Panel(this, {
            width: 300,
            tabs: tabsConfigResult
        });
        panel.show();

        // 记录属性
        this.panel = panel;
    },

    // 试图改变 active 状态
    tryChangeActive: function tryChangeActive(e) {
        var editor = this.editor;
        var $elem = this.$elem;
        if (editor._selectedImg) {
            this._active = true;
            $elem.addClass('w-e-active');
        } else {
            this._active = false;
            $elem.removeClass('w-e-active');
        }
    }
};

/*
    所有菜单的汇总
*/

// 存储菜单的构造函数
var MenuConstructors = {};

MenuConstructors.bold = Bold;

MenuConstructors.head = Head;

MenuConstructors.fontSize = FontSize;

MenuConstructors.fontName = FontName;

MenuConstructors.link = Link;

MenuConstructors.italic = Italic;

MenuConstructors.redo = Redo;

MenuConstructors.strikeThrough = StrikeThrough;

MenuConstructors.underline = Underline;

MenuConstructors.undo = Undo;

MenuConstructors.list = List;

MenuConstructors.justify = Justify;

MenuConstructors.foreColor = ForeColor;

MenuConstructors.backColor = BackColor;

MenuConstructors.quote = Quote;

MenuConstructors.code = Code;

MenuConstructors.emoticon = Emoticon;

MenuConstructors.table = Table;

MenuConstructors.video = Video;

MenuConstructors.image = Image;

/*
    菜单集合
*/
// 构造函数
function Menus(editor) {
    this.editor = editor;
    this.menus = {};
}

// 修改原型
Menus.prototype = {
    constructor: Menus,

    // 初始化菜单
    init: function init() {
        var _this = this;

        var editor = this.editor;
        var config = editor.config || {};
        var configMenus = config.menus || []; // 获取配置中的菜单

        // 根据配置信息，创建菜单
        configMenus.forEach(function (menuKey) {
            var MenuConstructor = MenuConstructors[menuKey];
            if (MenuConstructor && typeof MenuConstructor === 'function') {
                // 创建单个菜单
                _this.menus[menuKey] = new MenuConstructor(editor);
            }
        });

        // 添加到菜单栏
        this._addToToolbar();

        // 绑定事件
        this._bindEvent();
    },

    // 添加到菜单栏
    _addToToolbar: function _addToToolbar() {
        var editor = this.editor;
        var $toolbarElem = editor.$toolbarElem;
        var menus = this.menus;
        var config = editor.config;
        // config.zIndex 是配置的编辑区域的 z-index，菜单的 z-index 得在其基础上 +1
        var zIndex = config.zIndex + 1;
        objForEach(menus, function (key, menu) {
            var $elem = menu.$elem;
            if ($elem) {
                // 设置 z-index
                $elem.css('z-index', zIndex);
                $toolbarElem.append($elem);
            }
        });
    },

    // 绑定菜单 click mouseenter 事件
    _bindEvent: function _bindEvent() {
        var menus = this.menus;
        var editor = this.editor;
        objForEach(menus, function (key, menu) {
            var type = menu.type;
            if (!type) {
                return;
            }
            var $elem = menu.$elem;
            var droplist = menu.droplist;
            var panel = menu.panel;

            // 点击类型，例如 bold
            if (type === 'click' && menu.onClick) {
                $elem.on('click', function (e) {
                    if (editor.selection.getRange() == null) {
                        return;
                    }
                    menu.onClick(e);
                });
            }

            // 下拉框，例如 head
            if (type === 'droplist' && droplist) {
                $elem.on('mouseenter', function (e) {
                    if (editor.selection.getRange() == null) {
                        return;
                    }
                    // 显示
                    droplist.showTimeoutId = setTimeout(function () {
                        droplist.show();
                    }, 200);
                }).on('mouseleave', function (e) {
                    // 隐藏
                    droplist.hideTimeoutId = setTimeout(function () {
                        droplist.hide();
                    }, 0);
                });
            }

            // 弹框类型，例如 link
            if (type === 'panel' && menu.onClick) {
                $elem.on('click', function (e) {
                    e.stopPropagation();
                    if (editor.selection.getRange() == null) {
                        return;
                    }
                    // 在自定义事件中显示 panel
                    menu.onClick(e);
                });
            }
        });
    },

    // 尝试修改菜单状态
    changeActive: function changeActive() {
        var menus = this.menus;
        objForEach(menus, function (key, menu) {
            if (menu.tryChangeActive) {
                setTimeout(function () {
                    menu.tryChangeActive();
                }, 100);
            }
        });
    }
};

/*
    粘贴信息的处理
*/

// 获取粘贴的纯文本
function getPasteText(e) {
    var clipboardData = e.clipboardData || e.originalEvent && e.originalEvent.clipboardData;
    var pasteText = void 0;
    if (clipboardData == null) {
        pasteText = window.clipboardData && window.clipboardData.getData('text');
    } else {
        pasteText = clipboardData.getData('text/plain');
    }

    return replaceHtmlSymbol(pasteText);
}

// 获取粘贴的html
function getPasteHtml(e, filterStyle, ignoreImg) {
    var clipboardData = e.clipboardData || e.originalEvent && e.originalEvent.clipboardData;
    var pasteText = void 0,
        pasteHtml = void 0;
    if (clipboardData == null) {
        pasteText = window.clipboardData && window.clipboardData.getData('text');
    } else {
        pasteText = clipboardData.getData('text/plain');
        pasteHtml = clipboardData.getData('text/html');
    }
    if (!pasteHtml && pasteText) {
        pasteHtml = '<p>' + replaceHtmlSymbol(pasteText) + '</p>';
    }
    if (!pasteHtml) {
        return;
    }

    // 过滤word中状态过来的无用字符
    var docSplitHtml = pasteHtml.split('</html>');
    if (docSplitHtml.length === 2) {
        pasteHtml = docSplitHtml[0];
    }

    // 过滤无用标签
    pasteHtml = pasteHtml.replace(/<(meta|script|link).+?>/igm, '');
    // 去掉注释
    pasteHtml = pasteHtml.replace(/<!--.*?-->/mg, '');
    // 过滤 data-xxx 属性
    pasteHtml = pasteHtml.replace(/\s?data-.+?=('|").+?('|")/igm, '');

    if (ignoreImg) {
        // 忽略图片
        pasteHtml = pasteHtml.replace(/<img.+?>/igm, '');
    }

    if (filterStyle) {
        // 过滤样式
        pasteHtml = pasteHtml.replace(/\s?(class|style)=('|").*?('|")/igm, '');
    } else {
        // 保留样式
        pasteHtml = pasteHtml.replace(/\s?class=('|").*?('|")/igm, '');
    }

    return pasteHtml;
}

// 获取粘贴的图片文件
function getPasteImgs(e) {
    var result = [];
    var txt = getPasteText(e);
    if (txt) {
        // 有文字，就忽略图片
        return result;
    }

    var clipboardData = e.clipboardData || e.originalEvent && e.originalEvent.clipboardData || {};
    var items = clipboardData.items;
    if (!items) {
        return result;
    }

    objForEach(items, function (key, value) {
        var type = value.type;
        if (/image/i.test(type)) {
            result.push(value.getAsFile());
        }
    });

    return result;
}

/*
    编辑区域
*/

// 获取一个 elem.childNodes 的 JSON 数据
function getChildrenJSON($elem) {
    var result = [];
    var $children = $elem.childNodes() || []; // 注意 childNodes() 可以获取文本节点
    $children.forEach(function (curElem) {
        var elemResult = void 0;
        var nodeType = curElem.nodeType;

        // 文本节点
        if (nodeType === 3) {
            elemResult = curElem.textContent;
            elemResult = replaceHtmlSymbol(elemResult);
        }

        // 普通 DOM 节点
        if (nodeType === 1) {
            elemResult = {};

            // tag
            elemResult.tag = curElem.nodeName.toLowerCase();
            // attr
            var attrData = [];
            var attrList = curElem.attributes || {};
            var attrListLength = attrList.length || 0;
            for (var i = 0; i < attrListLength; i++) {
                var attr = attrList[i];
                attrData.push({
                    name: attr.name,
                    value: attr.value
                });
            }
            elemResult.attrs = attrData;
            // children（递归）
            elemResult.children = getChildrenJSON($(curElem));
        }

        result.push(elemResult);
    });
    return result;
}

// 构造函数
function Text(editor) {
    this.editor = editor;
}

// 修改原型
Text.prototype = {
    constructor: Text,

    // 初始化
    init: function init() {
        // 绑定事件
        this._bindEvent();
    },

    // 清空内容
    clear: function clear() {
        this.html('<p><br></p>');
    },

    // 获取 设置 html
    html: function html(val) {
        var editor = this.editor;
        var $textElem = editor.$textElem;
        var html = void 0;
        if (val == null) {
            html = $textElem.html();
            // 未选中任何内容的时候点击“加粗”或者“斜体”等按钮，就得需要一个空的占位符 &#8203 ，这里替换掉
            html = html.replace(/\u200b/gm, '');
            return html;
        } else {
            $textElem.html(val);

            // 初始化选取，将光标定位到内容尾部
            editor.initSelection();
        }
    },

    // 获取 JSON
    getJSON: function getJSON() {
        var editor = this.editor;
        var $textElem = editor.$textElem;
        return getChildrenJSON($textElem);
    },

    // 获取 设置 text
    text: function text(val) {
        var editor = this.editor;
        var $textElem = editor.$textElem;
        var text = void 0;
        if (val == null) {
            text = $textElem.text();
            // 未选中任何内容的时候点击“加粗”或者“斜体”等按钮，就得需要一个空的占位符 &#8203 ，这里替换掉
            text = text.replace(/\u200b/gm, '');
            return text;
        } else {
            $textElem.text('<p>' + val + '</p>');

            // 初始化选取，将光标定位到内容尾部
            editor.initSelection();
        }
    },

    // 追加内容
    append: function append(html) {
        var editor = this.editor;
        var $textElem = editor.$textElem;
        $textElem.append($(html));

        // 初始化选取，将光标定位到内容尾部
        editor.initSelection();
    },

    // 绑定事件
    _bindEvent: function _bindEvent() {
        // 实时保存选取
        this._saveRangeRealTime();

        // 按回车建时的特殊处理
        this._enterKeyHandle();

        // 清空时保留 <p><br></p>
        this._clearHandle();

        // 粘贴事件（粘贴文字，粘贴图片）
        this._pasteHandle();

        // tab 特殊处理
        this._tabHandle();

        // img 点击
        this._imgHandle();

        // 拖拽事件
        this._dragHandle();
    },

    // 实时保存选取
    _saveRangeRealTime: function _saveRangeRealTime() {
        var editor = this.editor;
        var $textElem = editor.$textElem;

        // 保存当前的选区
        function saveRange(e) {
            // 随时保存选区
            editor.selection.saveRange();
            // 更新按钮 ative 状态
            editor.menus.changeActive();
        }
        // 按键后保存
        $textElem.on('keyup', saveRange);
        $textElem.on('mousedown', function (e) {
            // mousedown 状态下，鼠标滑动到编辑区域外面，也需要保存选区
            $textElem.on('mouseleave', saveRange);
        });
        $textElem.on('mouseup', function (e) {
            saveRange();
            // 在编辑器区域之内完成点击，取消鼠标滑动到编辑区外面的事件
            $textElem.off('mouseleave', saveRange);
        });
    },

    // 按回车键时的特殊处理
    _enterKeyHandle: function _enterKeyHandle() {
        var editor = this.editor;
        var $textElem = editor.$textElem;

        function insertEmptyP($selectionElem) {
            var $p = $('<p><br></p>');
            $p.insertBefore($selectionElem);
            editor.selection.createRangeByElem($p, true);
            editor.selection.restoreSelection();
            $selectionElem.remove();
        }

        // 将回车之后生成的非 <p> 的顶级标签，改为 <p>
        function pHandle(e) {
            var $selectionElem = editor.selection.getSelectionContainerElem();
            var $parentElem = $selectionElem.parent();

            if ($parentElem.html() === '<code><br></code>') {
                // 回车之前光标所在一个 <p><code>.....</code></p> ，忽然回车生成一个空的 <p><code><br></code></p>
                // 而且继续回车跳不出去，因此只能特殊处理
                insertEmptyP($selectionElem);
                return;
            }

            if (!$parentElem.equal($textElem)) {
                // 不是顶级标签
                return;
            }

            var nodeName = $selectionElem.getNodeName();
            if (nodeName === 'P') {
                // 当前的标签是 P ，不用做处理
                return;
            }

            if ($selectionElem.text()) {
                // 有内容，不做处理
                return;
            }

            // 插入 <p> ，并将选取定位到 <p>，删除当前标签
            insertEmptyP($selectionElem);
        }

        $textElem.on('keyup', function (e) {
            if (e.keyCode !== 13) {
                // 不是回车键
                return;
            }
            // 将回车之后生成的非 <p> 的顶级标签，改为 <p>
            pHandle(e);
        });

        // <pre><code></code></pre> 回车时 特殊处理
        function codeHandle(e) {
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if (!$selectionElem) {
                return;
            }
            var $parentElem = $selectionElem.parent();
            var selectionNodeName = $selectionElem.getNodeName();
            var parentNodeName = $parentElem.getNodeName();

            if (selectionNodeName !== 'CODE' || parentNodeName !== 'PRE') {
                // 不符合要求 忽略
                return;
            }

            if (!editor.cmd.queryCommandSupported('insertHTML')) {
                // 必须原生支持 insertHTML 命令
                return;
            }

            // 处理：光标定位到代码末尾，联系点击两次回车，即跳出代码块
            if (editor._willBreakCode === true) {
                // 此时可以跳出代码块
                // 插入 <p> ，并将选取定位到 <p>
                var $p = $('<p><br></p>');
                $p.insertAfter($parentElem);
                editor.selection.createRangeByElem($p, true);
                editor.selection.restoreSelection();

                // 修改状态
                editor._willBreakCode = false;

                e.preventDefault();
                return;
            }

            var _startOffset = editor.selection.getRange().startOffset;

            // 处理：回车时，不能插入 <br> 而是插入 \n ，因为是在 pre 标签里面
            editor.cmd.do('insertHTML', '\n');
            editor.selection.saveRange();
            if (editor.selection.getRange().startOffset === _startOffset) {
                // 没起作用，再来一遍
                editor.cmd.do('insertHTML', '\n');
            }

            var codeLength = $selectionElem.html().length;
            if (editor.selection.getRange().startOffset + 1 === codeLength) {
                // 说明光标在代码最后的位置，执行了回车操作
                // 记录下来，以便下次回车时候跳出 code
                editor._willBreakCode = true;
            }

            // 阻止默认行为
            e.preventDefault();
        }

        $textElem.on('keydown', function (e) {
            if (e.keyCode !== 13) {
                // 不是回车键
                // 取消即将跳转代码块的记录
                editor._willBreakCode = false;
                return;
            }
            // <pre><code></code></pre> 回车时 特殊处理
            codeHandle(e);
        });
    },

    // 清空时保留 <p><br></p>
    _clearHandle: function _clearHandle() {
        var editor = this.editor;
        var $textElem = editor.$textElem;

        $textElem.on('keydown', function (e) {
            if (e.keyCode !== 8) {
                return;
            }
            var txtHtml = $textElem.html().toLowerCase().trim();
            if (txtHtml === '<p><br></p>') {
                // 最后剩下一个空行，就不再删除了
                e.preventDefault();
                return;
            }
        });

        $textElem.on('keyup', function (e) {
            if (e.keyCode !== 8) {
                return;
            }
            var $p = void 0;
            var txtHtml = $textElem.html().toLowerCase().trim();

            // firefox 时用 txtHtml === '<br>' 判断，其他用 !txtHtml 判断
            if (!txtHtml || txtHtml === '<br>') {
                // 内容空了
                $p = $('<p><br/></p>');
                $textElem.html(''); // 一定要先清空，否则在 firefox 下有问题
                $textElem.append($p);
                editor.selection.createRangeByElem($p, false, true);
                editor.selection.restoreSelection();
            }
        });
    },

    // 粘贴事件（粘贴文字 粘贴图片）
    _pasteHandle: function _pasteHandle() {
        var editor = this.editor;
        var config = editor.config;
        var pasteFilterStyle = config.pasteFilterStyle;
        var pasteTextHandle = config.pasteTextHandle;
        var ignoreImg = config.pasteIgnoreImg;
        var $textElem = editor.$textElem;

        // 粘贴图片、文本的事件，每次只能执行一个
        // 判断该次粘贴事件是否可以执行
        var pasteTime = 0;
        function canDo() {
            var now = Date.now();
            var flag = false;
            if (now - pasteTime >= 100) {
                // 间隔大于 100 ms ，可以执行
                flag = true;
            }
            pasteTime = now;
            return flag;
        }
        function resetTime() {
            pasteTime = 0;
        }

        // 粘贴文字
        $textElem.on('paste', function (e) {
            if (UA.isIE()) {
                return;
            } else {
                // 阻止默认行为，使用 execCommand 的粘贴命令
                e.preventDefault();
            }

            // 粘贴图片和文本，只能同时使用一个
            if (!canDo()) {
                return;
            }

            // 获取粘贴的文字
            var pasteHtml = getPasteHtml(e, pasteFilterStyle, ignoreImg);
            var pasteText = getPasteText(e);
            pasteText = pasteText.replace(/\n/gm, '<br>');

            var $selectionElem = editor.selection.getSelectionContainerElem();
            if (!$selectionElem) {
                return;
            }
            var nodeName = $selectionElem.getNodeName();

            // code 中只能粘贴纯文本
            if (nodeName === 'CODE' || nodeName === 'PRE') {
                if (pasteTextHandle && isFunction(pasteTextHandle)) {
                    // 用户自定义过滤处理粘贴内容
                    pasteText = '' + (pasteTextHandle(pasteText) || '');
                }
                editor.cmd.do('insertHTML', '<p>' + pasteText + '</p>');
                return;
            }

            // 先放开注释，有问题再追查 ————
            // // 表格中忽略，可能会出现异常问题
            // if (nodeName === 'TD' || nodeName === 'TH') {
            //     return
            // }

            if (!pasteHtml) {
                // 没有内容，可继续执行下面的图片粘贴
                resetTime();
                return;
            }
            try {
                // firefox 中，获取的 pasteHtml 可能是没有 <ul> 包裹的 <li>
                // 因此执行 insertHTML 会报错
                if (pasteTextHandle && isFunction(pasteTextHandle)) {
                    // 用户自定义过滤处理粘贴内容
                    pasteHtml = '' + (pasteTextHandle(pasteHtml) || '');
                }
                editor.cmd.do('insertHTML', pasteHtml);
            } catch (ex) {
                // 此时使用 pasteText 来兼容一下
                if (pasteTextHandle && isFunction(pasteTextHandle)) {
                    // 用户自定义过滤处理粘贴内容
                    pasteText = '' + (pasteTextHandle(pasteText) || '');
                }
                editor.cmd.do('insertHTML', '<p>' + pasteText + '</p>');
            }
        });

        // 粘贴图片
        $textElem.on('paste', function (e) {
            if (UA.isIE()) {
                return;
            } else {
                e.preventDefault();
            }

            // 粘贴图片和文本，只能同时使用一个
            if (!canDo()) {
                return;
            }

            // 获取粘贴的图片
            var pasteFiles = getPasteImgs(e);
            if (!pasteFiles || !pasteFiles.length) {
                return;
            }

            // 获取当前的元素
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if (!$selectionElem) {
                return;
            }
            var nodeName = $selectionElem.getNodeName();

            // code 中粘贴忽略
            if (nodeName === 'CODE' || nodeName === 'PRE') {
                return;
            }

            // 上传图片
            var uploadImg = editor.uploadImg;
            uploadImg.uploadImg(pasteFiles);
        });
    },

    // tab 特殊处理
    _tabHandle: function _tabHandle() {
        var editor = this.editor;
        var $textElem = editor.$textElem;

        $textElem.on('keydown', function (e) {
            if (e.keyCode !== 9) {
                return;
            }
            if (!editor.cmd.queryCommandSupported('insertHTML')) {
                // 必须原生支持 insertHTML 命令
                return;
            }
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if (!$selectionElem) {
                return;
            }
            var $parentElem = $selectionElem.parent();
            var selectionNodeName = $selectionElem.getNodeName();
            var parentNodeName = $parentElem.getNodeName();

            if (selectionNodeName === 'CODE' && parentNodeName === 'PRE') {
                // <pre><code> 里面
                editor.cmd.do('insertHTML', '    ');
            } else {
                // 普通文字
                editor.cmd.do('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
            }

            e.preventDefault();
        });
    },

    // img 点击
    _imgHandle: function _imgHandle() {
        var editor = this.editor;
        var $textElem = editor.$textElem;

        // 为图片增加 selected 样式
        $textElem.on('click', 'img', function (e) {
            var img = this;
            var $img = $(img);

            if ($img.attr('data-w-e') === '1') {
                // 是表情图片，忽略
                return;
            }

            // 记录当前点击过的图片
            editor._selectedImg = $img;

            // 修改选区并 restore ，防止用户此时点击退格键，会删除其他内容
            editor.selection.createRangeByElem($img);
            editor.selection.restoreSelection();
        });

        // 去掉图片的 selected 样式
        $textElem.on('click  keyup', function (e) {
            if (e.target.matches('img')) {
                // 点击的是图片，忽略
                return;
            }
            // 删除记录
            editor._selectedImg = null;
        });
    },

    // 拖拽事件
    _dragHandle: function _dragHandle() {
        var editor = this.editor;

        // 禁用 document 拖拽事件
        var $document = $(document);
        $document.on('dragleave drop dragenter dragover', function (e) {
            e.preventDefault();
        });

        // 添加编辑区域拖拽事件
        var $textElem = editor.$textElem;
        $textElem.on('drop', function (e) {
            e.preventDefault();
            var files = e.dataTransfer && e.dataTransfer.files;
            if (!files || !files.length) {
                return;
            }

            // 上传图片
            var uploadImg = editor.uploadImg;
            uploadImg.uploadImg(files);
        });
    }
};

/*
    命令，封装 document.execCommand
*/

// 构造函数
function Command(editor) {
    this.editor = editor;
}

// 修改原型
Command.prototype = {
    constructor: Command,

    // 执行命令
    do: function _do(name, value) {
        var editor = this.editor;

        // 使用 styleWithCSS
        if (!editor._useStyleWithCSS) {
            document.execCommand('styleWithCSS', null, true);
            editor._useStyleWithCSS = true;
        }

        // 如果无选区，忽略
        if (!editor.selection.getRange()) {
            return;
        }

        // 恢复选取
        editor.selection.restoreSelection();

        // 执行
        var _name = '_' + name;
        if (this[_name]) {
            // 有自定义事件
            this[_name](value);
        } else {
            // 默认 command
            this._execCommand(name, value);
        }

        // 修改菜单状态
        editor.menus.changeActive();

        // 最后，恢复选取保证光标在原来的位置闪烁
        editor.selection.saveRange();
        editor.selection.restoreSelection();

        // 触发 onchange
        editor.change && editor.change();
    },

    // 自定义 insertHTML 事件
    _insertHTML: function _insertHTML(html) {
        var editor = this.editor;
        var range = editor.selection.getRange();

        if (this.queryCommandSupported('insertHTML')) {
            // W3C
            this._execCommand('insertHTML', html);
        } else if (range.insertNode) {
            // IE
            range.deleteContents();
            range.insertNode($(html)[0]);
        } else if (range.pasteHTML) {
            // IE <= 10
            range.pasteHTML(html);
        }
    },

    // 插入 elem
    _insertElem: function _insertElem($elem) {
        var editor = this.editor;
        var range = editor.selection.getRange();

        if (range.insertNode) {
            range.deleteContents();
            range.insertNode($elem[0]);
        }
    },

    // 封装 execCommand
    _execCommand: function _execCommand(name, value) {
        document.execCommand(name, false, value);
    },

    // 封装 document.queryCommandValue
    queryCommandValue: function queryCommandValue(name) {
        return document.queryCommandValue(name);
    },

    // 封装 document.queryCommandState
    queryCommandState: function queryCommandState(name) {
        return document.queryCommandState(name);
    },

    // 封装 document.queryCommandSupported
    queryCommandSupported: function queryCommandSupported(name) {
        return document.queryCommandSupported(name);
    }
};

/*
    selection range API
*/

// 构造函数
function API(editor) {
    this.editor = editor;
    this._currentRange = null;
}

// 修改原型
API.prototype = {
    constructor: API,

    // 获取 range 对象
    getRange: function getRange() {
        return this._currentRange;
    },

    // 保存选区
    saveRange: function saveRange(_range) {
        if (_range) {
            // 保存已有选区
            this._currentRange = _range;
            return;
        }

        // 获取当前的选区
        var selection = window.getSelection();
        if (selection.rangeCount === 0) {
            return;
        }
        var range = selection.getRangeAt(0);

        // 判断选区内容是否在编辑内容之内
        var $containerElem = this.getSelectionContainerElem(range);
        if (!$containerElem) {
            return;
        }

        // 判断选区内容是否在不可编辑区域之内
        if ($containerElem.attr('contenteditable') === 'false' || $containerElem.parentUntil('[contenteditable=false]')) {
            return;
        }

        var editor = this.editor;
        var $textElem = editor.$textElem;
        if ($textElem.isContain($containerElem)) {
            // 是编辑内容之内的
            this._currentRange = range;
        }
    },

    // 折叠选区
    collapseRange: function collapseRange(toStart) {
        if (toStart == null) {
            // 默认为 false
            toStart = false;
        }
        var range = this._currentRange;
        if (range) {
            range.collapse(toStart);
        }
    },

    // 选中区域的文字
    getSelectionText: function getSelectionText() {
        var range = this._currentRange;
        if (range) {
            return this._currentRange.toString();
        } else {
            return '';
        }
    },

    // 选区的 $Elem
    getSelectionContainerElem: function getSelectionContainerElem(range) {
        range = range || this._currentRange;
        var elem = void 0;
        if (range) {
            elem = range.commonAncestorContainer;
            return $(elem.nodeType === 1 ? elem : elem.parentNode);
        }
    },
    getSelectionStartElem: function getSelectionStartElem(range) {
        range = range || this._currentRange;
        var elem = void 0;
        if (range) {
            elem = range.startContainer;
            return $(elem.nodeType === 1 ? elem : elem.parentNode);
        }
    },
    getSelectionEndElem: function getSelectionEndElem(range) {
        range = range || this._currentRange;
        var elem = void 0;
        if (range) {
            elem = range.endContainer;
            return $(elem.nodeType === 1 ? elem : elem.parentNode);
        }
    },

    // 选区是否为空
    isSelectionEmpty: function isSelectionEmpty() {
        var range = this._currentRange;
        if (range && range.startContainer) {
            if (range.startContainer === range.endContainer) {
                if (range.startOffset === range.endOffset) {
                    return true;
                }
            }
        }
        return false;
    },

    // 恢复选区
    restoreSelection: function restoreSelection() {
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(this._currentRange);
    },

    // 创建一个空白（即 &#8203 字符）选区
    createEmptyRange: function createEmptyRange() {
        var editor = this.editor;
        var range = this.getRange();
        var $elem = void 0;

        if (!range) {
            // 当前无 range
            return;
        }
        if (!this.isSelectionEmpty()) {
            // 当前选区必须没有内容才可以
            return;
        }

        try {
            // 目前只支持 webkit 内核
            if (UA.isWebkit()) {
                // 插入 &#8203
                editor.cmd.do('insertHTML', '&#8203;');
                // 修改 offset 位置
                range.setEnd(range.endContainer, range.endOffset + 1);
                // 存储
                this.saveRange(range);
            } else {
                $elem = $('<strong>&#8203;</strong>');
                editor.cmd.do('insertElem', $elem);
                this.createRangeByElem($elem, true);
            }
        } catch (ex) {
            // 部分情况下会报错，兼容一下
        }
    },

    // 根据 $Elem 设置选区
    createRangeByElem: function createRangeByElem($elem, toStart, isContent) {
        // $elem - 经过封装的 elem
        // toStart - true 开始位置，false 结束位置
        // isContent - 是否选中Elem的内容
        if (!$elem.length) {
            return;
        }

        var elem = $elem[0];
        var range = document.createRange();

        if (isContent) {
            range.selectNodeContents(elem);
        } else {
            range.selectNode(elem);
        }

        if (typeof toStart === 'boolean') {
            range.collapse(toStart);
        }

        // 存储 range
        this.saveRange(range);
    }
};

/*
    上传进度条
*/

function Progress(editor) {
    this.editor = editor;
    this._time = 0;
    this._isShow = false;
    this._isRender = false;
    this._timeoutId = 0;
    this.$textContainer = editor.$textContainerElem;
    this.$bar = $('<div class="w-e-progress"></div>');
}

Progress.prototype = {
    constructor: Progress,

    show: function show(progress) {
        var _this = this;

        // 状态处理
        if (this._isShow) {
            return;
        }
        this._isShow = true;

        // 渲染
        var $bar = this.$bar;
        if (!this._isRender) {
            var $textContainer = this.$textContainer;
            $textContainer.append($bar);
        } else {
            this._isRender = true;
        }

        // 改变进度（节流，100ms 渲染一次）
        if (Date.now() - this._time > 100) {
            if (progress <= 1) {
                $bar.css('width', progress * 100 + '%');
                this._time = Date.now();
            }
        }

        // 隐藏
        var timeoutId = this._timeoutId;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            _this._hide();
        }, 500);
    },

    _hide: function _hide() {
        var $bar = this.$bar;
        $bar.remove();

        // 修改状态
        this._time = 0;
        this._isShow = false;
        this._isRender = false;
    }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/*
    上传图片
*/

// 构造函数
function UploadImg(editor) {
    this.editor = editor;
}

// 原型
UploadImg.prototype = {
    constructor: UploadImg,

    // 根据 debug 弹出不同的信息
    _alert: function _alert(alertInfo, debugInfo) {
        var editor = this.editor;
        var debug = editor.config.debug;
        var customAlert = editor.config.customAlert;

        if (debug) {
            throw new Error('wangEditor: ' + (debugInfo || alertInfo));
        } else {
            if (customAlert && typeof customAlert === 'function') {
                customAlert(alertInfo);
            } else {
                alert(alertInfo);
            }
        }
    },

    // 根据链接插入图片
    insertLinkImg: function insertLinkImg(link) {
        var _this2 = this;

        if (!link) {
            return;
        }
        var editor = this.editor;
        var config = editor.config;

        // 校验格式
        var linkImgCheck = config.linkImgCheck;
        var checkResult = void 0;
        if (linkImgCheck && typeof linkImgCheck === 'function') {
            checkResult = linkImgCheck(link);
            if (typeof checkResult === 'string') {
                // 校验失败，提示信息
                alert(checkResult);
                return;
            }
        }

        editor.cmd.do('insertHTML', '<img src="' + link + '" style="max-width:100%;"/>');

        // 验证图片 url 是否有效，无效的话给出提示
        var img = document.createElement('img');
        img.onload = function () {
            var callback = config.linkImgCallback;
            if (callback && typeof callback === 'function') {
                callback(link);
            }

            img = null;
        };
        img.onerror = function () {
            img = null;
            // 无法成功下载图片
            _this2._alert('插入图片错误', 'wangEditor: \u63D2\u5165\u56FE\u7247\u51FA\u9519\uFF0C\u56FE\u7247\u94FE\u63A5\u662F "' + link + '"\uFF0C\u4E0B\u8F7D\u8BE5\u94FE\u63A5\u5931\u8D25');
            return;
        };
        img.onabort = function () {
            img = null;
        };
        img.src = link;
    },

    // 上传图片
    uploadImg: function uploadImg(files) {
        var _this3 = this;

        if (!files || !files.length) {
            return;
        }

        // ------------------------------ 获取配置信息 ------------------------------
        var editor = this.editor;
        var config = editor.config;
        var uploadImgServer = config.uploadImgServer;
        var uploadImgShowBase64 = config.uploadImgShowBase64;

        var maxSize = config.uploadImgMaxSize;
        var maxSizeM = maxSize / 1024 / 1024;
        var maxLength = config.uploadImgMaxLength || 10000;
        var uploadFileName = config.uploadFileName || '';
        var uploadImgParams = config.uploadImgParams || {};
        var uploadImgParamsWithUrl = config.uploadImgParamsWithUrl;
        var uploadImgHeaders = config.uploadImgHeaders || {};
        var hooks = config.uploadImgHooks || {};
        var timeout = config.uploadImgTimeout || 3000;
        var withCredentials = config.withCredentials;
        if (withCredentials == null) {
            withCredentials = false;
        }
        var customUploadImg = config.customUploadImg;

        if (!customUploadImg) {
            // 没有 customUploadImg 的情况下，需要如下两个配置才能继续进行图片上传
            if (!uploadImgServer && !uploadImgShowBase64) {
                return;
            }
        }

        // ------------------------------ 验证文件信息 ------------------------------
        var resultFiles = [];
        var errInfo = [];
        arrForEach(files, function (file) {
            var name = file.name;
            var size = file.size;

            // chrome 低版本 name === undefined
            if (!name || !size) {
                return;
            }

            if (/\.(jpg|jpeg|png|bmp|gif|webp)$/i.test(name) === false) {
                // 后缀名不合法，不是图片
                errInfo.push('\u3010' + name + '\u3011\u4E0D\u662F\u56FE\u7247');
                return;
            }
            if (maxSize < size) {
                // 上传图片过大
                errInfo.push('\u3010' + name + '\u3011\u5927\u4E8E ' + maxSizeM + 'M');
                return;
            }

            // 验证通过的加入结果列表
            resultFiles.push(file);
        });
        // 抛出验证信息
        if (errInfo.length) {
            this._alert('图片验证未通过: \n' + errInfo.join('\n'));
            return;
        }
        if (resultFiles.length > maxLength) {
            this._alert('一次最多上传' + maxLength + '张图片');
            return;
        }

        // ------------------------------ 自定义上传 ------------------------------
        if (customUploadImg && typeof customUploadImg === 'function') {
            customUploadImg(resultFiles, this.insertLinkImg.bind(this));

            // 阻止以下代码执行
            return;
        }

        // 添加图片数据
        var formdata = new FormData();
        arrForEach(resultFiles, function (file) {
            var name = uploadFileName || file.name;
            formdata.append(name, file);
        });

        // ------------------------------ 上传图片 ------------------------------
        if (uploadImgServer && typeof uploadImgServer === 'string') {
            // 添加参数
            var uploadImgServerArr = uploadImgServer.split('#');
            uploadImgServer = uploadImgServerArr[0];
            var uploadImgServerHash = uploadImgServerArr[1] || '';
            objForEach(uploadImgParams, function (key, val) {
                // 因使用者反应，自定义参数不能默认 encode ，由 v3.1.1 版本开始注释掉
                // val = encodeURIComponent(val)

                // 第一，将参数拼接到 url 中
                if (uploadImgParamsWithUrl) {
                    if (uploadImgServer.indexOf('?') > 0) {
                        uploadImgServer += '&';
                    } else {
                        uploadImgServer += '?';
                    }
                    uploadImgServer = uploadImgServer + key + '=' + val;
                }

                // 第二，将参数添加到 formdata 中
                formdata.append(key, val);
            });
            if (uploadImgServerHash) {
                uploadImgServer += '#' + uploadImgServerHash;
            }

            // 定义 xhr
            var xhr = new XMLHttpRequest();
            xhr.open('POST', uploadImgServer);

            // 设置超时
            xhr.timeout = timeout;
            xhr.ontimeout = function () {
                // hook - timeout
                if (hooks.timeout && typeof hooks.timeout === 'function') {
                    hooks.timeout(xhr, editor);
                }

                _this3._alert('上传图片超时');
            };

            // 监控 progress
            if (xhr.upload) {
                xhr.upload.onprogress = function (e) {
                    var percent = void 0;
                    // 进度条
                    var progressBar = new Progress(editor);
                    if (e.lengthComputable) {
                        percent = e.loaded / e.total;
                        progressBar.show(percent);
                    }
                };
            }

            // 返回数据
            xhr.onreadystatechange = function () {
                var result = void 0;
                if (xhr.readyState === 4) {
                    if (xhr.status < 200 || xhr.status >= 300) {
                        // hook - error
                        if (hooks.error && typeof hooks.error === 'function') {
                            hooks.error(xhr, editor);
                        }

                        // xhr 返回状态错误
                        _this3._alert('上传图片发生错误', '\u4E0A\u4F20\u56FE\u7247\u53D1\u751F\u9519\u8BEF\uFF0C\u670D\u52A1\u5668\u8FD4\u56DE\u72B6\u6001\u662F ' + xhr.status);
                        return;
                    }

                    result = xhr.responseText;
                    if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object') {
                        try {
                            result = JSON.parse(result);
                        } catch (ex) {
                            // hook - fail
                            if (hooks.fail && typeof hooks.fail === 'function') {
                                hooks.fail(xhr, editor, result);
                            }

                            _this3._alert('上传图片失败', '上传图片返回结果错误，返回结果是: ' + result);
                            return;
                        }
                    }
                    if (!hooks.customInsert && result.errno != '0') {
                        // hook - fail
                        if (hooks.fail && typeof hooks.fail === 'function') {
                            hooks.fail(xhr, editor, result);
                        }

                        // 数据错误
                        _this3._alert('上传图片失败', '上传图片返回结果错误，返回结果 errno=' + result.errno);
                    } else {
                        if (hooks.customInsert && typeof hooks.customInsert === 'function') {
                            // 使用者自定义插入方法
                            hooks.customInsert(_this3.insertLinkImg.bind(_this3), result, editor);
                        } else {
                            // 将图片插入编辑器
                            var data = result.data || [];
                            data.forEach(function (link) {
                                _this3.insertLinkImg(link);
                            });
                        }

                        // hook - success
                        if (hooks.success && typeof hooks.success === 'function') {
                            hooks.success(xhr, editor, result);
                        }
                    }
                }
            };

            // hook - before
            if (hooks.before && typeof hooks.before === 'function') {
                var beforeResult = hooks.before(xhr, editor, resultFiles);
                if (beforeResult && (typeof beforeResult === 'undefined' ? 'undefined' : _typeof(beforeResult)) === 'object') {
                    if (beforeResult.prevent) {
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        this._alert(beforeResult.msg);
                        return;
                    }
                }
            }

            // 自定义 headers
            objForEach(uploadImgHeaders, function (key, val) {
                xhr.setRequestHeader(key, val);
            });

            // 跨域传 cookie
            xhr.withCredentials = withCredentials;

            // 发送请求
            xhr.send(formdata);

            // 注意，要 return 。不去操作接下来的 base64 显示方式
            return;
        }

        // ------------------------------ 显示 base64 格式 ------------------------------
        if (uploadImgShowBase64) {
            arrForEach(files, function (file) {
                var _this = _this3;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    _this.insertLinkImg(this.result);
                };
            });
        }
    }
};

/*
    编辑器构造函数
*/

// id，累加
var editorId = 1;

// 构造函数
function Editor(toolbarSelector, textSelector) {
    if (toolbarSelector == null) {
        // 没有传入任何参数，报错
        throw new Error('错误：初始化编辑器时候未传入任何参数，请查阅文档');
    }
    // id，用以区分单个页面不同的编辑器对象
    this.id = 'wangEditor-' + editorId++;

    this.toolbarSelector = toolbarSelector;
    this.textSelector = textSelector;

    // 自定义配置
    this.customConfig = {};
}

// 修改原型
Editor.prototype = {
    constructor: Editor,

    // 初始化配置
    _initConfig: function _initConfig() {
        // _config 是默认配置，this.customConfig 是用户自定义配置，将它们 merge 之后再赋值
        var target = {};
        this.config = Object.assign(target, config, this.customConfig);

        // 将语言配置，生成正则表达式
        var langConfig = this.config.lang || {};
        var langArgs = [];
        objForEach(langConfig, function (key, val) {
            // key 即需要生成正则表达式的规则，如“插入链接”
            // val 即需要被替换成的语言，如“insert link”
            langArgs.push({
                reg: new RegExp(key, 'img'),
                val: val

            });
        });
        this.config.langArgs = langArgs;
    },

    // 初始化 DOM
    _initDom: function _initDom() {
        var _this = this;

        var toolbarSelector = this.toolbarSelector;
        var $toolbarSelector = $(toolbarSelector);
        var textSelector = this.textSelector;

        var config$$1 = this.config;
        var zIndex = config$$1.zIndex;

        // 定义变量
        var $toolbarElem = void 0,
            $textContainerElem = void 0,
            $textElem = void 0,
            $children = void 0;

        if (textSelector == null) {
            // 只传入一个参数，即是容器的选择器或元素，toolbar 和 text 的元素自行创建
            $toolbarElem = $('<div></div>');
            $textContainerElem = $('<div></div>');

            // 将编辑器区域原有的内容，暂存起来
            $children = $toolbarSelector.children();

            // 添加到 DOM 结构中
            $toolbarSelector.append($toolbarElem).append($textContainerElem);

            // 自行创建的，需要配置默认的样式
            $toolbarElem.css('background-color', '#f1f1f1').css('border', '1px solid #ccc');
            $textContainerElem.css('border', '1px solid #ccc').css('border-top', 'none').css('height', '300px');
        } else {
            // toolbar 和 text 的选择器都有值，记录属性
            $toolbarElem = $toolbarSelector;
            $textContainerElem = $(textSelector);
            // 将编辑器区域原有的内容，暂存起来
            $children = $textContainerElem.children();
        }

        // 编辑区域
        $textElem = $('<div></div>');
        $textElem.attr('contenteditable', 'true').css('width', '100%').css('height', '100%');

        // 初始化编辑区域内容
        if ($children && $children.length) {
            $textElem.append($children);
        } else {
            $textElem.append($('<p><br></p>'));
        }

        // 编辑区域加入DOM
        $textContainerElem.append($textElem);

        // 设置通用的 class
        $toolbarElem.addClass('w-e-toolbar');
        $textContainerElem.addClass('w-e-text-container');
        $textContainerElem.css('z-index', zIndex);
        $textElem.addClass('w-e-text');

        // 添加 ID
        var toolbarElemId = getRandom('toolbar-elem');
        $toolbarElem.attr('id', toolbarElemId);
        var textElemId = getRandom('text-elem');
        $textElem.attr('id', textElemId);

        // 记录属性
        this.$toolbarElem = $toolbarElem;
        this.$textContainerElem = $textContainerElem;
        this.$textElem = $textElem;
        this.toolbarElemId = toolbarElemId;
        this.textElemId = textElemId;

        // 记录输入法的开始和结束
        var compositionEnd = true;
        $textContainerElem.on('compositionstart', function () {
            // 输入法开始输入
            compositionEnd = false;
        });
        $textContainerElem.on('compositionend', function () {
            // 输入法结束输入
            compositionEnd = true;
        });

        // 绑定 onchange
        $textContainerElem.on('click keyup', function () {
            // 输入法结束才出发 onchange
            compositionEnd && _this.change && _this.change();
        });
        $toolbarElem.on('click', function () {
            this.change && this.change();
        });

        //绑定 onfocus 与 onblur 事件
        if (config$$1.onfocus || config$$1.onblur) {
            // 当前编辑器是否是焦点状态
            this.isFocus = false;

            $(document).on('click', function (e) {
                //判断当前点击元素是否在编辑器内
                var isChild = $textElem.isContain($(e.target));

                //判断当前点击元素是否为工具栏
                var isToolbar = $toolbarElem.isContain($(e.target));
                var isMenu = $toolbarElem[0] == e.target ? true : false;

                if (!isChild) {
                    //若为选择工具栏中的功能，则不视为成blur操作
                    if (isToolbar && !isMenu) {
                        return;
                    }

                    if (_this.isFocus) {
                        _this.onblur && _this.onblur();
                    }
                    _this.isFocus = false;
                } else {
                    if (!_this.isFocus) {
                        _this.onfocus && _this.onfocus();
                    }
                    _this.isFocus = true;
                }
            });
        }
    },

    // 封装 command
    _initCommand: function _initCommand() {
        this.cmd = new Command(this);
    },

    // 封装 selection range API
    _initSelectionAPI: function _initSelectionAPI() {
        this.selection = new API(this);
    },

    // 添加图片上传
    _initUploadImg: function _initUploadImg() {
        this.uploadImg = new UploadImg(this);
    },

    // 初始化菜单
    _initMenus: function _initMenus() {
        this.menus = new Menus(this);
        this.menus.init();
    },

    // 添加 text 区域
    _initText: function _initText() {
        this.txt = new Text(this);
        this.txt.init();
    },

    // 初始化选区，将光标定位到内容尾部
    initSelection: function initSelection(newLine) {
        var $textElem = this.$textElem;
        var $children = $textElem.children();
        if (!$children.length) {
            // 如果编辑器区域无内容，添加一个空行，重新设置选区
            $textElem.append($('<p><br></p>'));
            this.initSelection();
            return;
        }

        var $last = $children.last();

        if (newLine) {
            // 新增一个空行
            var html = $last.html().toLowerCase();
            var nodeName = $last.getNodeName();
            if (html !== '<br>' && html !== '<br\/>' || nodeName !== 'P') {
                // 最后一个元素不是 <p><br></p>，添加一个空行，重新设置选区
                $textElem.append($('<p><br></p>'));
                this.initSelection();
                return;
            }
        }

        this.selection.createRangeByElem($last, false, true);
        this.selection.restoreSelection();
    },

    // 绑定事件
    _bindEvent: function _bindEvent() {
        // -------- 绑定 onchange 事件 --------
        var onChangeTimeoutId = 0;
        var beforeChangeHtml = this.txt.html();
        var config$$1 = this.config;

        // onchange 触发延迟时间
        var onchangeTimeout = config$$1.onchangeTimeout;
        onchangeTimeout = parseInt(onchangeTimeout, 10);
        if (!onchangeTimeout || onchangeTimeout <= 0) {
            onchangeTimeout = 200;
        }

        var onchange = config$$1.onchange;
        if (onchange && typeof onchange === 'function') {
            // 触发 change 的有三个场景：
            // 1. $textContainerElem.on('click keyup')
            // 2. $toolbarElem.on('click')
            // 3. editor.cmd.do()
            this.change = function () {
                // 判断是否有变化
                var currentHtml = this.txt.html();

                if (currentHtml.length === beforeChangeHtml.length) {
                    // 需要比较每一个字符
                    if (currentHtml === beforeChangeHtml) {
                        return;
                    }
                }

                // 执行，使用节流
                if (onChangeTimeoutId) {
                    clearTimeout(onChangeTimeoutId);
                }
                onChangeTimeoutId = setTimeout(function () {
                    // 触发配置的 onchange 函数
                    onchange(currentHtml);
                    beforeChangeHtml = currentHtml;
                }, onchangeTimeout);
            };
        }

        // -------- 绑定 onblur 事件 --------
        var onblur = config$$1.onblur;
        if (onblur && typeof onblur === 'function') {
            this.onblur = function () {
                var currentHtml = this.txt.html();
                onblur(currentHtml);
            };
        }

        // -------- 绑定 onfocus 事件 --------
        var onfocus = config$$1.onfocus;
        if (onfocus && typeof onfocus === 'function') {
            this.onfocus = function () {
                onfocus();
            };
        }
    },

    // 创建编辑器
    create: function create() {
        // 初始化配置信息
        this._initConfig();

        // 初始化 DOM
        this._initDom();

        // 封装 command API
        this._initCommand();

        // 封装 selection range API
        this._initSelectionAPI();

        // 添加 text
        this._initText();

        // 初始化菜单
        this._initMenus();

        // 添加 图片上传
        this._initUploadImg();

        // 初始化选区，将光标定位到内容尾部
        this.initSelection(true);

        // 绑定事件
        this._bindEvent();
    },

    // 解绑所有事件（暂时不对外开放）
    _offAllEvent: function _offAllEvent() {
        $.offAll();
    }
};

// 检验是否浏览器环境
try {
    document;
} catch (ex) {
    throw new Error('请在浏览器环境下运行');
}

// polyfill
polyfill();

// 这里的 `inlinecss` 将被替换成 css 代码的内容，详情可去 ./gulpfile.js 中搜索 `inlinecss` 关键字
var inlinecss = '.w-e-toolbar,.w-e-text-container,.w-e-menu-panel {  padding: 0;  margin: 0;  box-sizing: border-box;}.w-e-toolbar *,.w-e-text-container *,.w-e-menu-panel * {  padding: 0;  margin: 0;  box-sizing: border-box;}.w-e-clear-fix:after {  content: "";  display: table;  clear: both;}.w-e-toolbar .w-e-droplist {  position: absolute;  left: 0;  top: 0;  background-color: #fff;  border: 1px solid #f1f1f1;  border-right-color: #ccc;  border-bottom-color: #ccc;}.w-e-toolbar .w-e-droplist .w-e-dp-title {  text-align: center;  color: #999;  line-height: 2;  border-bottom: 1px solid #f1f1f1;  font-size: 13px;}.w-e-toolbar .w-e-droplist ul.w-e-list {  list-style: none;  line-height: 1;}.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item {  color: #333;  padding: 5px 0;}.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item:hover {  background-color: #f1f1f1;}.w-e-toolbar .w-e-droplist ul.w-e-block {  list-style: none;  text-align: left;  padding: 5px;}.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {  display: inline-block;  *display: inline;  *zoom: 1;  padding: 3px 5px;}.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item:hover {  background-color: #f1f1f1;}@font-face {  font-family: \'w-e-icon\';  src: url(data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAABhQAAsAAAAAGAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIPBGNtYXAAAAFoAAABBAAAAQQrSf4BZ2FzcAAAAmwAAAAIAAAACAAAABBnbHlmAAACdAAAEvAAABLwfpUWUWhlYWQAABVkAAAANgAAADYQp00kaGhlYQAAFZwAAAAkAAAAJAfEA+FobXR4AAAVwAAAAIQAAACEeAcD7GxvY2EAABZEAAAARAAAAERBSEX+bWF4cAAAFogAAAAgAAAAIAAsALZuYW1lAAAWqAAAAYYAAAGGmUoJ+3Bvc3QAABgwAAAAIAAAACAAAwAAAAMD3gGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA8fwDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEAOgAAAA2ACAABAAWAAEAIOkG6Q3pEulH6Wbpd+m56bvpxunL6d/qDepc6l/qZepo6nHqefAN8BTxIPHc8fz//f//AAAAAAAg6QbpDekS6UfpZel36bnpu+nG6cvp3+oN6lzqX+pi6mjqcep38A3wFPEg8dzx/P/9//8AAf/jFv4W+Bb0FsAWoxaTFlIWURZHFkMWMBYDFbUVsxWxFa8VpxWiEA8QCQ7+DkMOJAADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAACAAD/wAQAA8AABAATAAABNwEnAQMuAScTNwEjAQMlATUBBwGAgAHAQP5Anxc7MmOAAYDA/oDAAoABgP6ATgFAQAHAQP5A/p0yOxcBEU4BgP6A/YDAAYDA/oCAAAQAAAAABAADgAAQACEALQA0AAABOAExETgBMSE4ATEROAExITUhIgYVERQWMyEyNjURNCYjBxQGIyImNTQ2MzIWEyE1EwEzNwPA/IADgPyAGiYmGgOAGiYmGoA4KCg4OCgoOED9AOABAEDgA0D9AAMAQCYa/QAaJiYaAwAaJuAoODgoKDg4/biAAYD+wMAAAAIAAABABAADQAA4ADwAAAEmJy4BJyYjIgcOAQcGBwYHDgEHBhUUFx4BFxYXFhceARcWMzI3PgE3Njc2Nz4BNzY1NCcuAScmJwERDQED1TY4OXY8PT8/PTx2OTg2CwcICwMDAwMLCAcLNjg5djw9Pz89PHY5ODYLBwgLAwMDAwsIBwv9qwFA/sADIAgGBggCAgICCAYGCCkqKlktLi8vLi1ZKiopCAYGCAICAgIIBgYIKSoqWS0uLy8uLVkqKin94AGAwMAAAAAAAgDA/8ADQAPAABsAJwAAASIHDgEHBhUUFx4BFxYxMDc+ATc2NTQnLgEnJgMiJjU0NjMyFhUUBgIAQjs6VxkZMjJ4MjIyMngyMhkZVzo7QlBwcFBQcHADwBkZVzo7Qnh9fcxBQUFBzH19eEI7OlcZGf4AcFBQcHBQUHAAAAEAAAAABAADgAArAAABIgcOAQcGBycRISc+ATMyFx4BFxYVFAcOAQcGBxc2Nz4BNzY1NCcuAScmIwIANTIyXCkpI5YBgJA1i1BQRUZpHh4JCSIYGB5VKCAgLQwMKCiLXl1qA4AKCycbHCOW/oCQNDweHmlGRVArKClJICEaYCMrK2I2NjlqXV6LKCgAAQAAAAAEAAOAACoAABMUFx4BFxYXNyYnLgEnJjU0Nz4BNzYzMhYXByERByYnLgEnJiMiBw4BBwYADAwtICAoVR4YGCIJCR4eaUZFUFCLNZABgJYjKSlcMjI1al1eiygoAYA5NjZiKysjYBohIEkpKCtQRUZpHh48NJABgJYjHBsnCwooKIteXQAAAAACAAAAQAQBAwAAJgBNAAATMhceARcWFRQHDgEHBiMiJy4BJyY1JzQ3PgE3NjMVIgYHDgEHPgEhMhceARcWFRQHDgEHBiMiJy4BJyY1JzQ3PgE3NjMVIgYHDgEHPgHhLikpPRESEhE9KSkuLikpPRESASMjelJRXUB1LQkQBwgSAkkuKSk9ERISET0pKS4uKSk9ERIBIyN6UlFdQHUtCRAHCBICABIRPSkpLi4pKT0REhIRPSkpLiBdUVJ6IyOAMC4IEwoCARIRPSkpLi4pKT0REhIRPSkpLiBdUVJ6IyOAMC4IEwoCAQAABgBA/8AEAAPAAAMABwALABEAHQApAAAlIRUhESEVIREhFSEnESM1IzUTFTMVIzU3NSM1MxUVESM1MzUjNTM1IzUBgAKA/YACgP2AAoD9gMBAQECAwICAwMCAgICAgIACAIACAIDA/wDAQP3yMkCSPDJAku7+wEBAQEBAAAYAAP/ABAADwAADAAcACwAXACMALwAAASEVIREhFSERIRUhATQ2MzIWFRQGIyImETQ2MzIWFRQGIyImETQ2MzIWFRQGIyImAYACgP2AAoD9gAKA/YD+gEs1NUtLNTVLSzU1S0s1NUtLNTVLSzU1SwOAgP8AgP8AgANANUtLNTVLS/61NUtLNTVLS/61NUtLNTVLSwADAAAAAAQAA6AAAwANABQAADchFSElFSE1EyEVITUhJQkBIxEjEQAEAPwABAD8AIABAAEAAQD9YAEgASDggEBAwEBAAQCAgMABIP7g/wABAAAAAAACAB7/zAPiA7QAMwBkAAABIiYnJicmNDc2PwE+ATMyFhcWFxYUBwYPAQYiJyY0PwE2NCcuASMiBg8BBhQXFhQHDgEjAyImJyYnJjQ3Nj8BNjIXFhQPAQYUFx4BMzI2PwE2NCcmNDc2MhcWFxYUBwYPAQ4BIwG4ChMIIxISEhIjwCNZMTFZIyMSEhISI1gPLA8PD1gpKRQzHBwzFMApKQ8PCBMKuDFZIyMSEhISI1gPLA8PD1gpKRQzHBwzFMApKQ8PDysQIxISEhIjwCNZMQFECAckLS1eLS0kwCIlJSIkLS1eLS0kVxAQDysPWCl0KRQVFRTAKXQpDysQBwj+iCUiJC0tXi0tJFcQEA8rD1gpdCkUFRUUwCl0KQ8rEA8PJC0tXi0tJMAiJQAAAAAFAAD/wAQAA8AAGwA3AFMAXwBrAAAFMjc+ATc2NTQnLgEnJiMiBw4BBwYVFBceARcWEzIXHgEXFhUUBw4BBwYjIicuAScmNTQ3PgE3NhMyNz4BNzY3BgcOAQcGIyInLgEnJicWFx4BFxYnNDYzMhYVFAYjIiYlNDYzMhYVFAYjIiYCAGpdXosoKCgoi15dampdXosoKCgoi15dalZMTHEgISEgcUxMVlZMTHEgISEgcUxMVisrKlEmJiMFHBtWODc/Pzc4VhscBSMmJlEqK9UlGxslJRsbJQGAJRsbJSUbGyVAKCiLXl1qal1eiygoKCiLXl1qal1eiygoA6AhIHFMTFZWTExxICEhIHFMTFZWTExxICH+CQYGFRAQFEM6OlYYGRkYVjo6QxQQEBUGBvcoODgoKDg4KCg4OCgoODgAAAMAAP/ABAADwAAbADcAQwAAASIHDgEHBhUUFx4BFxYzMjc+ATc2NTQnLgEnJgMiJy4BJyY1NDc+ATc2MzIXHgEXFhUUBw4BBwYTBycHFwcXNxc3JzcCAGpdXosoKCgoi15dampdXosoKCgoi15dalZMTHEgISEgcUxMVlZMTHEgISEgcUxMSqCgYKCgYKCgYKCgA8AoKIteXWpqXV6LKCgoKIteXWpqXV6LKCj8YCEgcUxMVlZMTHEgISEgcUxMVlZMTHEgIQKgoKBgoKBgoKBgoKAAAQBl/8ADmwPAACkAAAEiJiMiBw4BBwYVFBYzLgE1NDY3MAcGAgcGBxUhEzM3IzceATMyNjcOAQMgRGhGcVNUbRobSUgGDWVKEBBLPDxZAT1sxizXNC1VJi5QGB09A7AQHh1hPj9BTTsLJjeZbwN9fv7Fj5AjGQIAgPYJDzdrCQcAAAAAAgAAAAAEAAOAAAkAFwAAJTMHJzMRIzcXIyURJyMRMxUhNTMRIwcRA4CAoKCAgKCggP8AQMCA/oCAwEDAwMACAMDAwP8AgP1AQEACwIABAAADAMAAAANAA4AAFgAfACgAAAE+ATU0Jy4BJyYjIREhMjc+ATc2NTQmATMyFhUUBisBEyMRMzIWFRQGAsQcIBQURi4vNf7AAYA1Ly5GFBRE/oRlKjw8KWafn58sPj4B2yJULzUvLkYUFPyAFBRGLi81RnQBRks1NUv+gAEASzU1SwAAAAACAMAAAANAA4AAHwAjAAABMxEUBw4BBwYjIicuAScmNREzERQWFx4BMzI2Nz4BNQEhFSECwIAZGVc6O0JCOzpXGRmAGxgcSSgoSRwYG/4AAoD9gAOA/mA8NDVOFhcXFk41NDwBoP5gHjgXGBsbGBc4Hv6ggAAAAAABAIAAAAOAA4AACwAAARUjATMVITUzASM1A4CA/sCA/kCAAUCAA4BA/QBAQAMAQAABAAAAAAQAA4AAPQAAARUjHgEVFAYHDgEjIiYnLgE1MxQWMzI2NTQmIyE1IS4BJy4BNTQ2Nz4BMzIWFx4BFSM0JiMiBhUUFjMyFhcEAOsVFjUwLHE+PnEsMDWAck5OcnJO/gABLAIEATA1NTAscT4+cSwwNYByTk5yck47bisBwEAdQSI1YiQhJCQhJGI1NExMNDRMQAEDASRiNTViJCEkJCEkYjU0TEw0NEwhHwAAAAcAAP/ABAADwAADAAcACwAPABMAGwAjAAATMxUjNzMVIyUzFSM3MxUjJTMVIwMTIRMzEyETAQMhAyMDIQMAgIDAwMABAICAwMDAAQCAgBAQ/QAQIBACgBD9QBADABAgEP2AEAHAQEBAQEBAQEBAAkD+QAHA/oABgPwAAYD+gAFA/sAAAAoAAAAABAADgAADAAcACwAPABMAFwAbAB8AIwAnAAATESERATUhFR0BITUBFSE1IxUhNREhFSElIRUhETUhFQEhFSEhNSEVAAQA/YABAP8AAQD/AED/AAEA/wACgAEA/wABAPyAAQD/AAKAAQADgPyAA4D9wMDAQMDAAgDAwMDA/wDAwMABAMDA/sDAwMAAAAUAAAAABAADgAADAAcACwAPABMAABMhFSEVIRUhESEVIREhFSERIRUhAAQA/AACgP2AAoD9gAQA/AAEAPwAA4CAQID/AIABQID/AIAAAAAABQAAAAAEAAOAAAMABwALAA8AEwAAEyEVIRchFSERIRUhAyEVIREhFSEABAD8AMACgP2AAoD9gMAEAPwABAD8AAOAgECA/wCAAUCA/wCAAAAFAAAAAAQAA4AAAwAHAAsADwATAAATIRUhBSEVIREhFSEBIRUhESEVIQAEAPwAAYACgP2AAoD9gP6ABAD8AAQA/AADgIBAgP8AgAFAgP8AgAAAAAABAD8APwLmAuYALAAAJRQPAQYjIi8BBwYjIi8BJjU0PwEnJjU0PwE2MzIfATc2MzIfARYVFA8BFxYVAuYQThAXFxCoqBAXFhBOEBCoqBAQThAWFxCoqBAXFxBOEBCoqBDDFhBOEBCoqBAQThAWFxCoqBAXFxBOEBCoqBAQThAXFxCoqBAXAAAABgAAAAADJQNuABQAKAA8AE0AVQCCAAABERQHBisBIicmNRE0NzY7ATIXFhUzERQHBisBIicmNRE0NzY7ATIXFhcRFAcGKwEiJyY1ETQ3NjsBMhcWExEhERQXFhcWMyEyNzY3NjUBIScmJyMGBwUVFAcGKwERFAcGIyEiJyY1ESMiJyY9ATQ3NjsBNzY3NjsBMhcWHwEzMhcWFQElBgUIJAgFBgYFCCQIBQaSBQUIJQgFBQUFCCUIBQWSBQUIJQgFBQUFCCUIBQVJ/gAEBAUEAgHbAgQEBAT+gAEAGwQGtQYEAfcGBQg3Ghsm/iUmGxs3CAUFBQUIsSgIFxYXtxcWFgkosAgFBgIS/rcIBQUFBQgBSQgFBgYFCP63CAUFBQUIAUkIBQYGBQj+twgFBQUFCAFJCAUGBgX+WwId/eMNCwoFBQUFCgsNAmZDBQICBVUkCAYF/eMwIiMhIi8CIAUGCCQIBQVgFQ8PDw8VYAUFCAACAAcASQO3Aq8AGgAuAAAJAQYjIi8BJjU0PwEnJjU0PwE2MzIXARYVFAcBFRQHBiMhIicmPQE0NzYzITIXFgFO/vYGBwgFHQYG4eEGBh0FCAcGAQoGBgJpBQUI/dsIBQUFBQgCJQgFBQGF/vYGBhwGCAcG4OEGBwcGHQUF/vUFCAcG/vslCAUFBQUIJQgFBQUFAAAAAQAjAAAD3QNuALMAACUiJyYjIgcGIyInJjU0NzY3Njc2NzY9ATQnJiMhIgcGHQEUFxYXFjMWFxYVFAcGIyInJiMiBwYjIicmNTQ3Njc2NzY3Nj0BETQ1NDU0JzQnJicmJyYnJicmIyInJjU0NzYzMhcWMzI3NjMyFxYVFAcGIwYHBgcGHQEUFxYzITI3Nj0BNCcmJyYnJjU0NzYzMhcWMzI3NjMyFxYVFAcGByIHBgcGFREUFxYXFhcyFxYVFAcGIwPBGTMyGhkyMxkNCAcJCg0MERAKEgEHFf5+FgcBFQkSEw4ODAsHBw4bNTUaGDExGA0HBwkJCwwQDwkSAQIBAgMEBAUIEhENDQoLBwcOGjU1GhgwMRgOBwcJCgwNEBAIFAEHDwGQDgcBFAoXFw8OBwcOGTMyGRkxMRkOBwcKCg0NEBEIFBQJEREODQoLBwcOAAICAgIMCw8RCQkBAQMDBQxE4AwFAwMFDNRRDQYBAgEICBIPDA0CAgICDAwOEQgJAQIDAwUNRSEB0AINDQgIDg4KCgsLBwcDBgEBCAgSDwwNAgICAg0MDxEICAECAQYMULYMBwEBBwy2UAwGAQEGBxYPDA0CAgICDQwPEQgIAQECBg1P/eZEDAYCAgEJCBEPDA0AAAIAAP+3A/8DtwATADkAAAEyFxYVFAcCBwYjIicmNTQ3ATYzARYXFh8BFgcGIyInJicmJyY1FhcWFxYXFjMyNzY3Njc2NzY3NjcDmygeHhq+TDdFSDQ0NQFtISn9+BcmJy8BAkxMe0c2NiEhEBEEExQQEBIRCRcIDxITFRUdHR4eKQO3GxooJDP+mUY0NTRJSTABSx/9sSsfHw0oek1MGhsuLzo6RAMPDgsLCgoWJRsaEREKCwQEAgABAAAAAAAA9evv618PPPUACwQAAAAAANbEBFgAAAAA1sQEWAAA/7cEAQPAAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAD//wQBAAEAAAAAAAAAAAAAAAAAAAAhBAAAAAAAAAAAAAAAAgAAAAQAAAAEAAAABAAAAAQAAMAEAAAABAAAAAQAAAAEAABABAAAAAQAAAAEAAAeBAAAAAQAAAAEAABlBAAAAAQAAMAEAADABAAAgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAMlAD8DJQAAA74ABwQAACMD/wAAAAAAAAAKABQAHgBMAJQA+AE2AXwBwgI2AnQCvgLoA34EHgSIBMoE8gU0BXAFiAXgBiIGagaSBroG5AcoB+AIKgkcCXgAAQAAACEAtAAKAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGljb21vb24AaQBjAG8AbQBvAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGljb21vb24AaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcmljb21vb24AaQBjAG8AbQBvAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format(\'truetype\');  font-weight: normal;  font-style: normal;}[class^="w-e-icon-"],[class*=" w-e-icon-"] {  /* use !important to prevent issues with browser extensions that change fonts */  font-family: \'w-e-icon\' !important;  speak: none;  font-style: normal;  font-weight: normal;  font-variant: normal;  text-transform: none;  line-height: 1;  /* Better Font Rendering =========== */  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;}.w-e-icon-close:before {  content: "\\f00d";}.w-e-icon-upload2:before {  content: "\\e9c6";}.w-e-icon-trash-o:before {  content: "\\f014";}.w-e-icon-header:before {  content: "\\f1dc";}.w-e-icon-pencil2:before {  content: "\\e906";}.w-e-icon-paint-brush:before {  content: "\\f1fc";}.w-e-icon-image:before {  content: "\\e90d";}.w-e-icon-play:before {  content: "\\e912";}.w-e-icon-location:before {  content: "\\e947";}.w-e-icon-undo:before {  content: "\\e965";}.w-e-icon-redo:before {  content: "\\e966";}.w-e-icon-quotes-left:before {  content: "\\e977";}.w-e-icon-list-numbered:before {  content: "\\e9b9";}.w-e-icon-list2:before {  content: "\\e9bb";}.w-e-icon-link:before {  content: "\\e9cb";}.w-e-icon-happy:before {  content: "\\e9df";}.w-e-icon-bold:before {  content: "\\ea62";}.w-e-icon-underline:before {  content: "\\ea63";}.w-e-icon-italic:before {  content: "\\ea64";}.w-e-icon-strikethrough:before {  content: "\\ea65";}.w-e-icon-table2:before {  content: "\\ea71";}.w-e-icon-paragraph-left:before {  content: "\\ea77";}.w-e-icon-paragraph-center:before {  content: "\\ea78";}.w-e-icon-paragraph-right:before {  content: "\\ea79";}.w-e-icon-terminal:before {  content: "\\f120";}.w-e-icon-page-break:before {  content: "\\ea68";}.w-e-icon-cancel-circle:before {  content: "\\ea0d";}.w-e-icon-font:before {  content: "\\ea5c";}.w-e-icon-text-heigh:before {  content: "\\ea5f";}.w-e-toolbar {  display: -webkit-box;  display: -ms-flexbox;  display: flex;  padding: 0 5px;  /* flex-wrap: wrap; */  /* 单个菜单 */}.w-e-toolbar .w-e-menu {  position: relative;  text-align: center;  padding: 5px 10px;  cursor: pointer;}.w-e-toolbar .w-e-menu i {  color: #999;}.w-e-toolbar .w-e-menu:hover i {  color: #333;}.w-e-toolbar .w-e-active i {  color: #1e88e5;}.w-e-toolbar .w-e-active:hover i {  color: #1e88e5;}.w-e-text-container .w-e-panel-container {  position: absolute;  top: 0;  left: 50%;  border: 1px solid #ccc;  border-top: 0;  box-shadow: 1px 1px 2px #ccc;  color: #333;  background-color: #fff;  /* 为 emotion panel 定制的样式 */  /* 上传图片的 panel 定制样式 */}.w-e-text-container .w-e-panel-container .w-e-panel-close {  position: absolute;  right: 0;  top: 0;  padding: 5px;  margin: 2px 5px 0 0;  cursor: pointer;  color: #999;}.w-e-text-container .w-e-panel-container .w-e-panel-close:hover {  color: #333;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title {  list-style: none;  display: -webkit-box;  display: -ms-flexbox;  display: flex;  font-size: 14px;  margin: 2px 10px 0 10px;  border-bottom: 1px solid #f1f1f1;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title .w-e-item {  padding: 3px 5px;  color: #999;  cursor: pointer;  margin: 0 3px;  position: relative;  top: 1px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title .w-e-active {  color: #333;  border-bottom: 1px solid #333;  cursor: default;  font-weight: 700;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content {  padding: 10px 15px 10px 15px;  font-size: 16px;  /* 输入框的样式 */  /* 按钮的样式 */}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input:focus,.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea:focus,.w-e-text-container .w-e-panel-container .w-e-panel-tab-content button:focus {  outline: none;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea {  width: 100%;  border: 1px solid #ccc;  padding: 5px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea:focus {  border-color: #1e88e5;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text] {  border: none;  border-bottom: 1px solid #ccc;  font-size: 14px;  height: 20px;  color: #333;  text-align: left;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text].small {  width: 30px;  text-align: center;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text].block {  display: block;  width: 100%;  margin: 10px 0;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text]:focus {  border-bottom: 2px solid #1e88e5;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button {  font-size: 14px;  color: #1e88e5;  border: none;  padding: 5px 10px;  background-color: #fff;  cursor: pointer;  border-radius: 3px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.left {  float: left;  margin-right: 10px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.right {  float: right;  margin-left: 10px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.gray {  color: #999;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.red {  color: #c24f4a;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button:hover {  background-color: #f1f1f1;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container:after {  content: "";  display: table;  clear: both;}.w-e-text-container .w-e-panel-container .w-e-emoticon-container .w-e-item {  cursor: pointer;  font-size: 18px;  padding: 0 3px;  display: inline-block;  *display: inline;  *zoom: 1;}.w-e-text-container .w-e-panel-container .w-e-up-img-container {  text-align: center;}.w-e-text-container .w-e-panel-container .w-e-up-img-container .w-e-up-btn {  display: inline-block;  *display: inline;  *zoom: 1;  color: #999;  cursor: pointer;  font-size: 60px;  line-height: 1;}.w-e-text-container .w-e-panel-container .w-e-up-img-container .w-e-up-btn:hover {  color: #333;}.w-e-text-container {  position: relative;}.w-e-text-container .w-e-progress {  position: absolute;  background-color: #1e88e5;  bottom: 0;  left: 0;  height: 1px;}.w-e-text {  padding: 0 10px;  overflow-y: scroll;}.w-e-text p,.w-e-text h1,.w-e-text h2,.w-e-text h3,.w-e-text h4,.w-e-text h5,.w-e-text table,.w-e-text pre {  margin: 10px 0;  line-height: 1.5;}.w-e-text ul,.w-e-text ol {  margin: 10px 0 10px 20px;}.w-e-text blockquote {  display: block;  border-left: 8px solid #d0e5f2;  padding: 5px 10px;  margin: 10px 0;  line-height: 1.4;  font-size: 100%;  background-color: #f1f1f1;}.w-e-text code {  display: inline-block;  *display: inline;  *zoom: 1;  background-color: #f1f1f1;  border-radius: 3px;  padding: 3px 5px;  margin: 0 3px;}.w-e-text pre code {  display: block;}.w-e-text table {  border-top: 1px solid #ccc;  border-left: 1px solid #ccc;}.w-e-text table td,.w-e-text table th {  border-bottom: 1px solid #ccc;  border-right: 1px solid #ccc;  padding: 3px 5px;}.w-e-text table th {  border-bottom: 2px solid #ccc;  text-align: center;}.w-e-text:focus {  outline: none;}.w-e-text img {  cursor: pointer;}.w-e-text img:hover {  box-shadow: 0 0 5px #333;}';

// 将 css 代码添加到 <style> 中
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = inlinecss;
document.getElementsByTagName('HEAD').item(0).appendChild(style);

// 返回
var index = window.wangEditor || Editor;

return index;

})));


/***/ }),

/***/ "1ab2":
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__("7bcc");
var FilterCSS = __webpack_require__("bc6c");


/**
 * XSS过滤
 *
 * @param {String} css 要过滤的CSS代码
 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
 * @return {String}
 */
function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterCSS;
exports.FilterCSS = FilterCSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];

// 在浏览器端使用
if (typeof window !== 'undefined') {
  window.filterCSS = module.exports;
}


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

/***/ "3b16":
/***/ (function(module, exports, __webpack_require__) {

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = __webpack_require__("1ab2").FilterCSS;
var DEFAULT = __webpack_require__("bda0");
var parser = __webpack_require__("50e1");
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = __webpack_require__("eb71");

/**
 * returns `true` if the input value is `undefined` or `null`
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull(obj) {
  return obj === undefined || obj === null;
}

/**
 * get attributes for a tag
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/"
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = html[html.length - 1] === "/";
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html: html,
    closing: isClosing
  };
}

/**
 * shallow copy
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * FilterXSS class
 *
 * @param {Object} options
 *        whiteList, onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
 */
function FilterXSS(options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }

  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * start process and returns result
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function(html) {
  // compatible with the input
  html = html || "";
  html = html.toString();
  if (!html) return "";

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // remove invisible characters
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // remove html comments
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // if enable stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    var stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag
    );
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(
    html,
    function(sourcePosition, position, tag, html, isClosing) {
      var info = {
        sourcePosition: sourcePosition,
        position: position,
        isClosing: isClosing,
        isWhite: whiteList.hasOwnProperty(tag)
      };

      // call `onTag()`
      var ret = onTag(tag, html, info);
      if (!isNull(ret)) return ret;

      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }

        var attrs = getAttrs(html);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function(name, value) {
          // call `onTagAttr()`
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret = onTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;

          if (isWhiteAttr) {
            // call `safeAttrValue()`
            value = safeAttrValue(tag, name, value, cssFilter);
            if (value) {
              return name + '="' + value + '"';
            } else {
              return name;
            }
          } else {
            // call `onIgnoreTagAttr()`
            var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
            if (!isNull(ret)) return ret;
            return;
          }
        });

        // build new tag html
        var html = "<" + tag;
        if (attrsHtml) html += " " + attrsHtml;
        if (attrs.closing) html += " /";
        html += ">";
        return html;
      } else {
        // call `onIgnoreTag()`
        var ret = onIgnoreTag(tag, html, info);
        if (!isNull(ret)) return ret;
        return escapeHtml(html);
      }
    },
    escapeHtml
  );

  // if enable stripIgnoreTagBody
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};

module.exports = FilterXSS;


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

/***/ "50e1":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var _ = __webpack_require__("eb71");

/**
 * get tag name
 *
 * @param {String} html e.g. '<a hef="#">'
 * @return {String}
 */
function getTagName(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    var tagName = html.slice(1, -1);
  } else {
    var tagName = html.slice(1, i + 1);
  }
  tagName = _.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * is close tag?
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing(html) {
  return html.slice(0, 2) === "</";
}

/**
 * parse input html and returns processed html
 *
 * @param {String} html
 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml
 * @return {String}
 */
function parseTag(html, onTag, escapeHtml) {
  "user strict";

  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";

  for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">") {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if ((c === '"' || c === "'") && html.charAt(currentPos - 1) === "=") {
          quoteStart = c;
          continue;
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;

/**
 * parse input attributes and returns processed attributes
 *
 * @param {String} html e.g. `href="#" target="_blank"`
 * @param {Function} onAttr e.g. `function (name, value)`
 * @return {String}
 */
function parseAttr(html, onAttr) {
  "user strict";

  var lastPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;

  function addAttr(name, value) {
    name = _.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || "");
    if (ret) retAttrs.push(ret);
  }

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      continue;
    }
    if (tmpName !== false) {
      if (
        i === lastPos &&
        (c === '"' || c === "'") &&
        html.charAt(i - 1) === "="
      ) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _.trim(html.slice(lastPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
    }
  }

  return _.trim(retAttrs.join(" "));
}

function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function isQuoteWrapString(text) {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return true;
  } else {
    return false;
  }
}

function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}

exports.parseTag = parseTag;
exports.parseAttr = parseAttr;


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

/***/ "5e38":
/***/ (function(module, exports, __webpack_require__) {

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__("bda0");
var parser = __webpack_require__("50e1");
var FilterXSS = __webpack_require__("3b16");

/**
 * filter xss function
 *
 * @param {String} html
 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
 * @return {String}
 */
function filterXSS(html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}

exports = module.exports = filterXSS;
exports.filterXSS = filterXSS;
exports.FilterXSS = FilterXSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];
for (var i in parser) exports[i] = parser[i];

// using `xss` on the browser, output `filterXSS` to the globals
if (typeof window !== "undefined") {
  window.filterXSS = module.exports;
}

// using `xss` on the WebWorker, output `filterXSS` to the globals
function isWorkerEnv() {
  return typeof self !== 'undefined' && typeof DedicatedWorkerGlobalScope !== 'undefined' && self instanceof DedicatedWorkerGlobalScope;
}
if (isWorkerEnv()) {
  self.filterXSS = module.exports;
}


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

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


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

/***/ "7bcc":
/***/ (function(module, exports) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = false; // default: none
  whiteList['float-offset'] = false; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}

var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

/**
 * 过滤属性值
 *
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function safeAttrValue(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
  return value;
}


exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onAttr = onAttr;
exports.onIgnoreAttr = onIgnoreAttr;
exports.safeAttrValue = safeAttrValue;


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

/***/ "8753":
/***/ (function(module, exports) {

module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
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

/***/ "ae34":
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _ = __webpack_require__("8753");


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle (css, onAttr) {
  css = _.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _.trim(source.slice(0, j));
        var value = _.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _.trim(retCSS);
}

module.exports = parseStyle;


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

/***/ "bc6c":
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__("7bcc");
var parseStyle = __webpack_require__("ae34");
var _ = __webpack_require__("8753");


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Function} onAttr
 *   - {Function} onIgnoreAttr
 *   - {Function} safeAttrValue
 */
function FilterCSS (options) {
  options = shallowCopyObject(options || {});
  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onAttr = options.onAttr || DEFAULT.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  this.options = options;
}

FilterCSS.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;
  var safeAttrValue = options.safeAttrValue;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    // 如果过滤后 value 为空则直接忽略
    value = safeAttrValue(name, value);
    if (!value) return;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


module.exports = FilterCSS;


/***/ }),

/***/ "bda0":
/***/ (function(module, exports, __webpack_require__) {

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = __webpack_require__("1ab2").FilterCSS;
var getDefaultCSSWhiteList = __webpack_require__("1ab2").getDefaultWhiteList;
var _ = __webpack_require__("eb71");

function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: ["autoplay", "controls", "loop", "preload", "src"],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
  };
}

var defaultCSSFilter = new FilterCSS();

/**
 * default onTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag(tag, html, options) {
  // do nothing
}

/**
 * default onIgnoreTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag(tag, html, options) {
  // do nothing
}

/**
 * default onTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default onIgnoreTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default escapeHtml function
 *
 * @param {String} html
 */
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}

/**
 * default safeAttrValue function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue(tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = friendlyAttrValue(value);

  if (name === "href" || name === "src") {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
    value = _.trim(value);
    if (value === "#") return "#";
    if (
      !(
        value.substr(0, 7) === "http://" ||
        value.substr(0, 8) === "https://" ||
        value.substr(0, 7) === "mailto:" ||
        value.substr(0, 4) === "tel:" ||
        value[0] === "#" ||
        value[0] === "/"
      )
    ) {
      return "";
    }
  } else if (name === "background") {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = escapeAttrValue(value);
  return value;
}

// RegExp list
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

/**
 * escape doube quote
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}

/**
 * unescape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * escape html entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
    return code[0] === "x" || code[0] === "X"
      ? String.fromCharCode(parseInt(code.substr(1), 16))
      : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * escape html5 new danger entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities(str) {
  return str
    .replace(REGEXP_ATTR_VALUE_COLON, ":")
    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}

/**
 * clear nonprintable characters
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _.trim(str2);
}

/**
 * get friendly attribute value
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}

/**
 * unescape attribute value
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * `onIgnoreTag` function for removing all the tags that are not in whitelist
 */
function onIgnoreTagStripAll() {
  return "";
}

/**
 * remove tag body
 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
 *
 * @param {array} tags
 * @param {function} next
 */
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function() {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _.indexOf(tags, tag) !== -1;
  }

  var removeList = [];
  var posStart = false;

  return {
    onIgnoreTag: function(tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function(html) {
      var rethtml = "";
      var lastPos = 0;
      _.forEach(removeList, function(pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    }
  };
}

/**
 * remove html comments
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag(html) {
  return html.replace(STRIP_COMMENT_TAG_REGEXP, "");
}
var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;

/**
 * remove invisible characters
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function(char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}

exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onTag = onTag;
exports.onIgnoreTag = onIgnoreTag;
exports.onTagAttr = onTagAttr;
exports.onIgnoreTagAttr = onIgnoreTagAttr;
exports.safeAttrValue = safeAttrValue;
exports.escapeHtml = escapeHtml;
exports.escapeQuote = escapeQuote;
exports.unescapeQuote = unescapeQuote;
exports.escapeHtmlEntities = escapeHtmlEntities;
exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
exports.friendlyAttrValue = friendlyAttrValue;
exports.escapeAttrValue = escapeAttrValue;
exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
exports.StripTagBody = StripTagBody;
exports.stripCommentTag = stripCommentTag;
exports.stripBlankChar = stripBlankChar;
exports.cssFilter = defaultCSSFilter;
exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;


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

/***/ "ce2a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "eb71":
/***/ (function(module, exports) {

module.exports = {
  indexOf: function(arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function(arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function(str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function(str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  }
};


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

/***/ "f8dd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_b1c10792_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ce2a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_b1c10792_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_b1c10792_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vueEditor_vue_vue_type_style_index_0_id_b1c10792_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78090654-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/vueEditor/src/vueEditor.vue?vue&type=template&id=b1c10792&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vueEditor"},[_c('div',{ref:"editor"})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueEditor/src/vueEditor.vue?vue&type=template&id=b1c10792&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/wangeditor/release/wangEditor.js
var wangEditor = __webpack_require__("1a0b");
var wangEditor_default = /*#__PURE__*/__webpack_require__.n(wangEditor);

// EXTERNAL MODULE: ./node_modules/xss/lib/index.js
var lib = __webpack_require__("5e38");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

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
// eslint-disable-next-line semi
 // eslint-disable-next-line semi


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
        return 'file';
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
      default: function _default() {
        return {};
      }
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
      default: function _default() {
        return {};
      }
    },
    option: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    // 这里存放数据
    return {
      editor: null,
      content: ''
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    value: function value(val) {
      this.editor.txt.html(lib_default()(this.value));
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

      this.editor = new wangEditor_default.a(this.$refs.editor); // 编辑器的事件，每次改变会获取其html内容

      this.editor.customConfig.onchange = function (html) {
        _this2.content = lib_default()(html);

        _this2.$emit('change', _this2.content); // eslint-disable-next-line semi

      };

      this.editor.customConfig.debug = this.debug; // debug 模式

      this.editor.customConfig.menus = this.toolBar; // 工具栏

      this.editor.customConfig.pasteFilterStyle = false; // 关闭样式

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

        if (Object.keys(this.hook).length) {
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

      if (Object.keys(this.data).length) {
        this.editor.customConfig.uploadImgParamsWithUrl = this.merge; // 参数合并url
      }
      /**
       * 合并富文本参数
       */


      if (Object.keys(this.option).length) {
        this.editor.customConfig = _objectSpread({}, this.editor.customConfig, {}, this.option);
      }

      this.editor.create(); // 创建富文本实例

      this._initValue();
    },

    /**
     * upLoad
     */
    _upLoadSuccess: function _upLoadSuccess(insertImg, result, editor) {
      var url = "".concat(this.baseUrl).concat(result.url);
      insertImg(url);
    },

    /**
     * 初始化内容
     */
    _initValue: function _initValue() {
      this.editor.content = lib_default()(this.value || "");
      this.editor.txt.html(this.editor.content);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueEditor/src/vueEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_vueEditorvue_type_script_lang_js_ = (vueEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/vueEditor/src/vueEditor.vue?vue&type=style&index=0&id=b1c10792&lang=scss&scoped=true&
var vueEditorvue_type_style_index_0_id_b1c10792_lang_scss_scoped_true_ = __webpack_require__("f8dd");

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
  "b1c10792",
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


/***/ })

/******/ });
});