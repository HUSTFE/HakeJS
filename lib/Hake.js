(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Hake", [], factory);
	else if(typeof exports === 'object')
		exports["Hake"] = factory();
	else
		root["Hake"] = factory();
})(this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @file All of the string handler is here, parse Hake, HTML and data syntax inside.
 * @author Dominic Ming <dom@mingdom.cn>
 */

/**
 * To match single tag.
 * @constant
 * @type {RegExp}
 */

var singleTag = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/;

/**
 * To skip syntax that not involved in data.
 * @constant
 * @type {RegExp}
 */

var syntax = /[ +|\-*\/%=&\n{}<>^!?:,;~\[\]\\]/;

/**
 * Use browser native api to parse HTML, Lazy Easy DOM parser.
 * @param {string} str
 * @return {HTMLElement}
 */

function parseDOM(str) {
  var el = document.createElement('div');

  el.innerHTML = str;
  return el.childNodes[0];
}

/**
 * Read tag name and return it with a char after it
 * @param {number} startIndex
 * @param {string} str
 * @return {{tag: string, end: string}|boolean}
 */

function readTag(startIndex, str) {
  var res = '',
      i = void 0;

  for (i = startIndex; str[i] !== ' ' && str[i] !== '{' && str[i] !== '('; i += 1) {
    res += str[i];
  }

  return { tag: res, end: str[i] } || false;
}

/**
 * Parse Hake string and return HTMLElement.
 * @param {string} str
 * @return {HTMLElement}
 */

function parseHake(str) {
  var res = '',
      nowTag = [],
      tmpTag = void 0,
      inString = '';

  for (var i = 0; str[i]; i++) {
    switch (str[i]) {
      case '(':
        nowTag.push(readTag(i + 1, str));
        if (nowTag[nowTag.length - 1].end === ' ') {
          res += '<' + nowTag[nowTag.length - 1].tag + '>';
          i += nowTag[nowTag.length - 1].tag.length + 1;
        } else if (nowTag[nowTag.length - 1].end === '(') {
          res += '<' + nowTag[nowTag.length - 1].tag + '>';
          i += nowTag[nowTag.length - 1].tag.length;
        } else res += '<';
        break;
      case ')':
        tmpTag = nowTag.pop();
        res += singleTag.test(tmpTag.tag) ? '/>' : '<\/' + tmpTag.tag + '>';
        break;
      case '"':
        if (inString === '"') {
          inString = '';
        } else if (!inString) {
          inString = '"';
        }
        res += str[i];
        break;
      case '\'':
        if (inString === '\'') {
          inString = '';
        } else if (!inString) {
          inString = '\'';
        }
        res += str[i];
        break;
      case '{':
        if (!inString) {
          if (str[i + 1] === '{') {
            i++;
            res += '{{';
          } else {
            res += ' ';
          }
        } else res += str[i];
        break;
      case '}':
        if (!inString) {
          if (str[i + 1] === '}') {
            i++;
            res += '}}';
          } else {
            if (nowTag[nowTag.length - 1].end === '{') {
              res += '>';
              i++;
            } else {
              res += ' ';
            }
          }
        } else res += str[i];
        break;
      case '\\':
        str[i] === '(' || str === ')' || i++;
        res += str[i];
        break;
      default:
        res += str[i];
        break;
    }
  }

  return parseDOM(res);
}

/**
 * DataBlock contain origin data, generator and related variable
 * @param {string} str
 * @constructor
 */

function DataBlock(str) {
  this.origin = str;
  this.related = [];
  var gen = '';
  var tmp = '';
  var blindThis = false;

  for (var i = 0; str[i]; i += 1) {
    if (!syntax.test(str[i])) {
      tmp += str[i];
    } else if (str[i] === '/' && str[i + 1] === '/') {
      while (str[i] !== '\n' && str[i]) {
        i++;
      }
    } else {
      if (str[i] === ']') {
        blindThis = false;
        gen += tmp;
        tmp = '';
      }

      if (/\./.test(tmp)) {
        gen += tmp;
        tmp = '';
      }

      if (tmp && !parseInt(tmp[0]) && tmp[0] !== '0') {
        if (!blindThis) {
          gen += 'this.' + tmp;
          this.related.push(tmp);
        } else {
          gen += tmp;
        }
        tmp = '';
      } else if (parseInt(tmp[0]) || tmp === '0') {
        gen += tmp;
        tmp = '';
      }

      if (str[i] === '[') {
        blindThis = true;
      }

      gen += str[i];
    }
  }

  if (/\./.test(tmp)) {
    gen += tmp;
    tmp = '';
  }

  if (tmp && !parseInt(tmp[0]) && tmp[0] !== '0') {
    if (!blindThis) {
      gen += 'this.' + tmp;
      this.related.push(tmp);
    } else {
      gen += tmp;
    }
  } else if (parseInt(tmp[0]) || tmp === '0') {
    gen += tmp;
  }

  this.generate = Function('return ' + gen);
}

/**
 * Parse data string contain '{{...}}' and slice it into a string
 * @param {string} str
 * @return {Array}
 */

function parseData(str) {
  var res = [],
      tmp = '';

  for (var i = 0; str[i]; i += 1) {
    if (str[i] === '{' && str[i + 1] === '{') {
      tmp || res.push(tmp);
      tmp = '';
      i++;
    } else if (str[i] === '}' && str[i + 1] === '}') {
      tmp || res.push(new DataBlock(tmp));
      tmp = '';
      i++;
    } else tmp += str[i];
  }

  return res;
}

var parse = {
  parseDOM: parseDOM, parseData: parseData, parseHake: parseHake
};

exports.default = parse;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parse = __webpack_require__(0);

var _parse2 = _interopRequireDefault(_parse);

var _observe = __webpack_require__(2);

var _observe2 = _interopRequireDefault(_observe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used to detect {{}} in string
 * @type {RegExp}
 */

/**
 * @file Handle data bind, search, render and etc.
 * @author Dominic Ming <dom@mingdom.cn>
 */

var dataReg = /{{[\s\S]*}}/g;

/**
 * DataBlock Type
 * @type {string}
 */

var ATTR = 'ATTR',
    TEXT = 'TEXT';

/**
 * Hash a string to a code.
 * @param {string} str
 * @return {string}
 */

function dataHash(str) {
  var hash = 1713302033171,
      i = void 0,
      ch = void 0;

  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= (hash << 5) + ch + (hash >> 2);
    hash ^= (hash >> 2) + ch + (hash << 5);
  }

  return hash.toString(16);
}

/**
 * If string contain {{}}
 * @param {string} str
 * @return {boolean}
 */

function hasData(str) {
  return dataReg.test(str);
}

/**
 * Search data bind in element, return a array with data info.
 * @param {HTMLElement} el
 * @return {Array}
 */

function dataSearch(el) {
  var children = el.querySelectorAll('*');
  var res = [];

  for (var i in children) {
    for (var j in children[i].attributes) {
      if (hasData(children[i].attributes[j])) {
        res.push({
          type: ATTR,
          target: children[i],
          attrName: children[i].attributes[j].name,
          data: _parse2.default.parseData(children[i].attributes[j].value)
        });
      }
    }

    for (var _j in children[i].childNodes) {
      if (children[i].childNodes[_j].nodeName === '#text' && hasData(children[i].childNodes[_j].nodeValue)) {
        res.push({
          type: TEXT,
          target: children[i].childNodes[_j],
          data: _parse2.default.parseData(children[i].childNodes[_j].nodeValue)
        });
      }
    }
  }

  return res;
}

/**
 * Use dataSearch result to bind a data object, return a related map.
 * @param {array} sArr
 * @param {object} data
 * @return {object}
 */

function dataBind(sArr, data) {
  var dataMap = {};

  var _loop = function _loop(i) {
    if (parseInt(i)) {
      for (var j in sArr[i].data) {
        if (sArr[i].data[j].related) {
          sArr[i].data[j].related.forEach(function (e) {
            data.hasOwnProperty(e) && (dataMap[e] || (dataMap[e] = [])) && data[e].push(sArr[i]);
          });
        }
      }
    }
  };

  for (var i in sArr) {
    _loop(i);
  }

  return dataMap;
}

/**
 * Observing data from a element
 * @param {object} data
 * @param {HTMLElement} el
 * @return {Object}
 */

function dataObserve(data, el) {
  var dataMap = dataBind(dataSearch(el), data);

  return _observe2.default.object(data, function (key, val) {
    dataMap[key].generate();
  });
}

/**
 * diff the old data and new data to return difference array
 * @param oldData
 * @param newData
 * @param res
 */

function dataDiff(oldData, newData, res) {
  var diff = [];

  for (var i = 0; i < res.length; i++) {
    if (res[i].generate) {
      if (res[i].generate.apply(oldData) !== res[i].generate.apply(newData)) {
        diff.push(res[i]);
      }
    }
  }
}

var data = {
  dataHash: dataHash, hasData: hasData, dataSearch: dataSearch, dataBind: dataBind, dataDiff: dataDiff, dataObserve: dataObserve
};

exports.default = data;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @file Provide simple object and array observation.
 * @author Dominic Ming <dom@mingdom.cn>
 */

/**
 * Observe Object with call back, and only return top level key.
 * @param {object} obj
 * @param {function} callback
 * @param {string} top
 * @return {object}
 */

function object(obj, callback, top) {
  var __obj = Object.assign({}, obj);

  var _loop = function _loop(_key) {
    if (obj.hasOwnProperty(_key)) {
      if (__obj[_key] instanceof Array) {
        __obj[_key] = array(__obj[_key], callback, top || _key);
      } else if (_typeof(__obj[_key]) === 'object') {
        object(__obj[_key], callback, top || _key);
      }
      Object.defineProperty(obj, _key, {
        get: function get() {
          return __obj[_key];
        },
        set: function set(val) {
          if (__obj[_key] instanceof Array) {
            __obj[_key] = array(__obj[_key], callback, top || _key);
          } else if (_typeof(__obj[_key]) === 'object') {
            object(__obj[_key], callback, top || _key);
          }
          callback && callback.apply(obj, [top || _key, val]);
        }
      });
    }
  };

  for (var _key in obj) {
    _loop(_key);
  }
}

/**
 * Only observe special key change, not care about its children.
 * @param obj
 * @param key
 * @param callback
 * @return {*}
 */

function key(obj, key, callback) {
  var pValue = void 0;

  return Object.defineProperty(obj, key, {
    get: function get() {
      return pValue;
    },
    set: function set(val) {
      pValue = val;
      callback || callback.apply(obj, val);
    }
  });
}

/**
 * Return if a <= val < b .
 * @param {number} val
 * @param {number} a
 * @param {number} b
 * @return {boolean}
 */

function btw(val, a, b) {
  return val >= a && val < b;
}

/**
 * Observable array, not the real one.
 * @param {function} callback
 * @param {string} top
 * @constructor
 */

function OArray(callback, top) {
  /**
   * When length change, the OArray change.
   */

  Object.defineProperty(this, length, {
    get: function get() {
      return this.length;
    },
    set: function set(val) {
      if (parseInt(val) === val) {
        for (var i in this) {
          i >= val || delete this[i];
        }

        for (var _i = 0; _i < val; _i += 1) {
          this[_i] === undefined || (this[_i] = this[_i]);
        }
      }

      return this;
    }
  });

  /**
   * As the native fill(), with callback
   * @param {*} val
   * @param {number} start
   * @param {number} end
   */

  this.prototype.fill = function (val, start, end) {
    var s = start || 0,
        e = end || this.length;

    for (var i in this) {
      parseInt(i) === i && btw(this[i], s, e) && (this[i] = val);
    }

    callback(top);
  };

  /**
   * As the native pop(), with callback
   * @return {*}
   */

  this.prototype.pop = function () {
    if (this.length) {
      var res = this[this.length - 1];

      this.length -= 1;
      callback(top);
      return res;
    }
  };

  /**
   * As the native push(), with callback
   * @param val
   * @return {OArray}
   */

  this.prototype.push = function (val) {
    this[this.length] = val;
    this.length += 1;
    callback(top);
    return this;
  };

  /**
   * As the native reverse(), with callback
   */

  this.prototype.reverse = function () {
    var len = this.length - 1,
        tmp = void 0;

    for (var i = 0; i < len / 2; i += 1) {
      if (this[i] === undefined) {
        tmp = this[i];
        this[i] = this[len - i];
        this[len - i] = tmp;
      }
    }

    callback(top);
  };

  /**
   * As the native shift(), with callback
   * @return {*}
   */

  this.prototype.shift = function () {
    if (this.length) {
      var res = this[0];

      for (var i = 0; i < length - 1; i += 1) {
        this[i + 1] === undefined || (this[i] = this[i + 1]);
      }

      this.length -= 1;
      callback(top);
      return res;
    }
  };

  /**
   * Transform OArray to Array.
   * @return {Array}
   */

  this.prototype.toArray = function () {
    var arr = [];

    for (var i in this) {
      i === parseInt(i) && (arr[i] = this[i]);
    }

    return arr;
  };

  /**
   * extend array to OArray
   * @param {array} arr
   * @return {OArray}
   */

  this.prototype.modifiedByArray = function (arr) {
    for (var i = 0; i < arr.length; i += 1) {
      this[i] = arr[i];
      if (this[key] instanceof Array) {
        this[key] = array(this[key], callback, top || key);
      } else if (_typeof(this[key]) === 'object') {
        object(this[key], callback, top || key);
      }
    }

    this.length = arr.length;

    callback(top);

    return this;
  };

  /**
   * As the native splice(), with callback
   * @return {array}
   */

  this.prototype.splice = function () {
    var arr = this.toArray();
    var res = Array.splice.apply(arr, arguments);

    this.modifiedByArray(arr);
    callback(top);
    return res;
  };

  /**
   * As the native unshift(), with callback
   */

  this.prototype.unshift = function () {
    var arr = this.toArray();
    var res = Array.unshift.apply(arr, arguments);

    this.modifiedByArray(arr);
    callback(top);
    return res;
  };
}

/**
 * Observe array with call back, and only return top level key.
 * @param {array} arr
 * @param {function} callback
 * @param {string} top
 * @return {OArray}
 */

function array(arr, callback, top) {
  return new OArray(callback, top).modifiedByArray(arr);
}

var observe = {
  object: object, key: key, array: array
};

exports.default = observe;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @file Simple DOM function short cut, but may not use in main of HakeJS.
 * @author Dominic Ming <dom@mingdom.cn>
 */

/**
 * document.querySelector shortcut
 * @param {string} selector
 * @return {Element}
 */

function getOne(selector) {
  return document.querySelector(selector);
}

/**
 * document.querySelectorAll shortcut
 * @param {string} selector
 * @return {NodeList}
 */

function getAll(selector) {
  return document.querySelectorAll(selector);
}

/**
 * getAttribute shortcut
 * @param {HTMLElement} el
 * @param {string} name
 * @return {string}
 */

function getAttr(el, name) {
  return el.getAttribute(name);
}

/**
 * return all attribute in element in a object
 * @param {HTMLElement} el
 * @return {object}
 */

function getAttrs(el) {
  var res = {};

  for (var i in el.attribute) {
    res[el.attribute[i].name] = el.attribute[i].value;
  }

  return res;
}

/**
 * Add class on element.
 * @param {HTMLElement} el
 * @param {string} className
 * @return {*|string}
 */

function addClass(el, className) {
  return el.className.indexOf(className) + 1 || (el.className += ' ' + className);
}

/**
 * Remove class on element.
 * @param {HTMLElement} el
 * @param {string} className
 * @return {*|string}
 */

function removeClass(el, className) {
  return el.className.replace('/ ' + className + '|' + className, '');
}

/**
 * Toggle class on element.
 * @param {HTMLElement} el
 * @param {string} className
 * @return {*}
 */

function toggleClass(el, className) {
  return el.className.indexOf(className) + 1 ? el.className.replace('/ ' + className + '|' + className, '') : el.className += ' ' + className;
}

var dom = {
  getOne: getOne, getAll: getAll, getAttr: getAttr, getAttrs: getAttrs, addClass: addClass, removeClass: removeClass, toggleClass: toggleClass
};

exports.default = dom;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @file message api for HakeJS, will extend later.
 * @author Dominic Ming <dom@mingdom.cn>
 */

/**
 * All message in the Hake will come here.
 * @type {Array}
 */

var msgStack = [];

/**
 * Send a error message.
 * @param {string} msg
 */

function error(msg) {
  msgStack.push('error ' + msg);
  console.error('[Hake error] ' + msg);
}

/**
 * Send a warn message.
 * @param {string} msg
 */

function warn(msg) {
  msgStack.push('warn ' + msg);
  console.warn('[Hake] warn ' + msg);
}

var message = {
  error: error, warn: warn, msgStack: msgStack
};

exports.default = message;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = __webpack_require__(1);

var _data2 = _interopRequireDefault(_data);

var _dom = __webpack_require__(3);

var _dom2 = _interopRequireDefault(_dom);

var _observe = __webpack_require__(2);

var _observe2 = _interopRequireDefault(_observe);

var _parse = __webpack_require__(0);

var _parse2 = _interopRequireDefault(_parse);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

var _item = __webpack_require__(7);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file Main enter of HakeJS, now just export all of module.
                                                                                                                                                           * @author Dominic Ming <dom@mingdom.cn>
                                                                                                                                                           */

/**
 * A set of all HakeJS function and module.
 * @class
 */

var Hake =
/**
 * Export all module, tag name and version.
 * @constructor
 */
function Hake() {
  _classCallCheck(this, Hake);

  this._name = 'Hake';
  this._version = '0.0.0';
  this.data = _data2.default;
  this.dom = _dom2.default;
  this.observe = _observe2.default;
  this.parse = _parse2.default;
  this.event = _event2.default;
  this.item = _item2.default;
};

exports.default = Hake;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = __webpack_require__(4);

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A pool to store event that not native
 * @type {object}
 */

var eventpool = {};

/**
 * Add event in eventpool
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 * @private
 */

/**
 * @file Simple event system for HakeJS, but not sure really support.
 * @author Dominic Ming <dom@mingdom.cn>
 */

function __addListener(event, callback, target) {
  eventpool[event] && _message2.default.warn('event: ' + event + ' will be overwrite.');

  eventpool[event] = {
    callback: callback, isFake: true, target: target, event: event
  };
}

/**
 * Remove event in eventpool
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 * @private
 */

function __removeListener(event, callback, target) {
  delete eventpool[event];
}

/**
 * Add event to anything (some just fake event)
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 */

function addEvent(event, target, callback) {
  if (target.addEventListener) {
    target.addEventListener(event, callback);
  } else {
    __addListener(event, callback, target);
  }
}

/**
 * Run a event on target (fake events don't care target)
 * @param {string} event
 * @param {*} target
 */

function trigEvent(event, target) {
  if (target.dispatchEvent) {
    var e = new Event(event);

    target.dispatchEvent(e);
  }if (eventpool[event]) {
    eventpool[event].callback.apply(eventpool[event].target, [eventpool[event].target]);
  } else {
    _message2.default.error('event: ' + event + ' does not exist');
  }
}

/**
 * Remove event on anything (fake events don't care target and callback)
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 */

function removeEvent(event, target, callback) {
  if (target.removeEventListener) {
    callback ? target.removeEventListener(event, callback) : _message2.default.error('event can\'t be cancel without same callback function.');
  } else {
    __removeListener(event, callback, target);
  }
}

var event = {
  addEvent: addEvent, trigEvent: trigEvent, removeEvent: removeEvent
};

exports.default = event;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = __webpack_require__(3);

var _dom2 = _interopRequireDefault(_dom);

var _data = __webpack_require__(1);

var _data2 = _interopRequireDefault(_data);

var _message = __webpack_require__(4);

var _message2 = _interopRequireDefault(_message);

var _parse = __webpack_require__(0);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file Instance of HakeJS component, handle whole lifecycle of component.
                                                                                                                                                           * @author Dominic Ming <dom@mingdom.cn>
                                                                                                                                                           */

/**
 * Origin setting for Hake Component.
 */

var defaultOption = {
  data: {},
  shadowDOM: false,
  isRoot: false,
  isHake: false,
  created: function created() {},
  rendered: function rendered() {},
  mounted: function mounted() {},
  updated: function updated() {},
  destroyed: function destroyed() {}
};

/**
 * Hake component is called HakeItem.
 * @class
 */

var HakeItem = function HakeItem(option) {
  _classCallCheck(this, HakeItem);

  var config = Object.assign({}, defaultOption, option);
  var __content = void 0;

  if (!_dom2.default.getOne(config.el)) {
    _message2.default.error('Root component should have a element to mount.');
    return;
  }

  if (!config.content) {
    _message2.default.error('Component should have content.');
    return;
  }

  if (config.content.innerHTML) {
    config.content = config.content.innerHTML;
  }

  try {
    if (config.isHake) {
      __content = _parse2.default.parseHake(config.content);
    } else {
      __content = _parse2.default.parseDOM(config.content);
    }
  } catch (e) {
    console.error(e);
  }

  _data2.default.dataSearch(__content);
};

exports.default = HakeItem;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Hake.js.map