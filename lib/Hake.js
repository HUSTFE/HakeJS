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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _data = __webpack_require__(1);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _dom = __webpack_require__(2);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _observe = __webpack_require__(3);
	
	var _observe2 = _interopRequireDefault(_observe);
	
	var _parse = __webpack_require__(4);
	
	var _parse2 = _interopRequireDefault(_parse);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Hake = function Hake() {
	  _classCallCheck(this, Hake);
	
	  this._name = 'Hake';
	  this._version = '0.0.0';
	  this.data = _data2.default;
	  this.dom = _dom2.default;
	  this.observe = _observe2.default;
	  this.parse = _parse2.default;
	};
	
	exports.default = Hake;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var dataReg = /{{[^(?!.*{{)]*}}/g;
	
	function dataHash(str, num) {
	  var hash = 1315423911,
	      i = void 0,
	      ch = void 0;
	
	  for (i = str.length - 1; i >= 0; i--) {
	    ch = str.charCodeAt(i);
	    hash ^= (hash << 5) + ch + (hash >> 2);
	  }
	
	  return str + '-' + (hash & num).toString(16);
	}
	
	function hasData(str) {
	  return dataReg.test(str);
	}
	
	function dataEvent(target, content) {}
	
	var data = {
	  dataHash: dataHash, hasData: hasData, dataEvent: dataEvent
	};
	
	exports.default = data;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getOne(selector) {
	  return document.querySelector(selector);
	}
	
	function getAll(selector) {
	  return document.querySelectorAll(selector);
	}
	
	function getAttr(el, name) {
	  return el.getAttribute(name);
	}
	
	function getAttrs(el) {
	  var res = {};
	
	  for (var i in el.attribute) {
	    res[el.attribute[i].name] = el.attribute[i].value;
	  }return res;
	}
	
	function addClass(el, className) {
	  return el.className.indexOf(className) + 1 || (el.className += ' ' + className);
	}
	
	function removeClass(el, className) {
	  return el.className.replace('/ ' + className + '|' + className, '');
	}
	
	function toggleClass(el, className) {
	  return el.className.indexOf(className) + 1 ? el.className.replace('/ ' + className + '|' + className, '') : el.className += ' ' + className;
	}
	
	var dom = {
	  getOne: getOne, getAll: getAll, getAttr: getAttr, getAttrs: getAttrs, addClass: addClass, removeClass: removeClass, toggleClass: toggleClass
	};
	
	exports.default = dom;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function object(obj, callback) {
	  var _loop = function _loop(_key) {
	    if (obj.hasOwnProperty(_key)) {
	      Object.defineProperty(obj, _key, {
	        get: function get() {
	          return obj[_key];
	        },
	        set: function set(val) {
	          obj[_key] = val;
	          callback || callback.apply(obj, val, _key);
	        }
	      });
	    }
	  };
	
	  for (var _key in obj) {
	    _loop(_key);
	  }
	}
	
	function key(obj, key, callback) {
	  return Object.defineProperty(obj, key, {
	    get: function get() {
	      return obj[key];
	    },
	    set: function set(val) {
	      obj[key] = val;
	      callback || callback.apply(obj, val);
	    }
	  });
	}
	
	function btw(val, a, b) {
	  return val >= a && val < b;
	}
	
	function OArray(callback) {
	  Object.defineProperty(this, length, {
	    get: function get() {
	      return this.length;
	    },
	    set: function set(val) {
	      if (parseInt(val) === val) {
	        for (var i in this) {
	          i >= val || delete this[i];
	        }for (var _i = 0; _i < val; _i += 1) {
	          this[_i] === undefined || (this[_i] = this[_i]);
	        }
	      }
	
	      return this;
	    }
	  });
	
	  this.prototype.fill = function (val, start, end) {
	    var s = start || 0,
	        e = end || this.length;
	
	    for (var i in this) {
	      parseInt(i) === i && btw(this[i], s, e) && (this[i] = val);
	    }callback(this);
	  };
	
	  this.prototype.pop = function () {
	    if (this.length) {
	      var res = this[this.length - 1];
	
	      this.length -= 1;
	      callback(this);
	      return res;
	    }
	  };
	
	  this.prototype.push = function (val) {
	    this[this.length] = val;
	    this.length += 1;
	    callback(this);
	    return this;
	  };
	
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
	
	    callback(this);
	  };
	
	  this.prototype.shift = function () {
	    if (this.length) {
	      var res = this[0];
	
	      for (var i = 0; i < length - 1; i += 1) {
	        this[i + 1] === undefined || (this[i] = this[i + 1]);
	      }
	
	      this.length -= 1;
	      callback(this);
	      return res;
	    }
	  };
	
	  this.prototype.toArray = function () {
	    var arr = [];
	
	    for (var i in this) {
	      i === parseInt(i) && (arr[i] = this[i]);
	    }
	
	    return arr;
	  };
	
	  this.prototype.modifiedByArray = function (arr) {
	    for (var i = 0; i < arr.length; i += 1) {
	      this[i] = arr[i];
	    }
	
	    this.length = arr.length;
	
	    callback(this);
	
	    return this;
	  };
	
	  this.prototype.splice = function () {
	    var arr = this.toArray();
	    var res = Array.splice.apply(arr, arguments);
	
	    this.modifiedByArray(arr);
	
	    return res;
	  };
	
	  this.prototype.unshift = function () {
	    var arr = this.toArray();
	    var res = Array.unshift.apply(arr, arguments);
	
	    this.modifiedByArray(arr);
	
	    return res;
	  };
	}
	
	function array(arr, callback) {
	  return new OArray(callback).modifiedByArray(arr);
	}
	
	var observe = {
	  object: object, key: key, array: array
	};
	
	exports.default = observe;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// /{{[^(?!.*{{)]*}}/g test{{}}
	
	var singleTag = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/;
	var syntax = / |\+|-|\*|\/|%|=|\||&|\n|{|}|<|>|\^|!|\?|:|,|;|~|\[|]/;
	
	// Lazy Easy DOM parser
	
	function parseDOM(str) {
	  var el = document.createElement('div');
	
	  el.innerHTML = str;
	  return el.childNodes[0];
	}
	
	function readTag(startIndex, str) {
	  var res = '',
	      i = void 0;
	
	  for (i = startIndex; str[i] !== ' ' && str[i] !== '{' && str[i] !== '('; i += 1) {
	    res += str[i];
	  }
	
	  return { tag: res, end: str[i] } || false;
	}
	
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
	
	function DataBlock(str) {
	  this.origin = str;
	  this.generate = Function('return ' + str);
	  this.related = [];
	
	  var tmp = '';
	
	  for (var i = 0; str[i]; i += 1) {
	    if (!syntax.test(str[i])) {
	      tmp += str[i];
	    } else if (str[i] === '/' && str[i + 1] === '/') {
	      while (str[i] !== '\n') {
	        i++;
	      }
	    } else {
	      tmp || this.related.push(tmp);
	      tmp = '';
	    }
	  }
	}
	
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
	
	  return str;
	}
	
	var parse = {
	  parseDOM: parseDOM, parseData: parseData, parseHake: parseHake
	};
	
	exports.default = parse;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Hake.js.map