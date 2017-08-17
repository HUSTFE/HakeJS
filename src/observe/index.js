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
  let __obj = Object.assign({}, obj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (__obj[key] instanceof Array) {
        __obj[key] = array(__obj[key], callback, top || key);
      } else if (typeof __obj[key] === 'object') {
        object(__obj[key], callback, top || key);
      }
      Object.defineProperty(obj, key, {
        get() {
          return __obj[key];
        },
        set(val) {
          if (__obj[key] instanceof Array) {
            __obj[key] = array(__obj[key], callback, top || key);
          } else if (typeof __obj[key] === 'object') {
            object(__obj[key], callback, top || key);
          }
          callback && callback.apply(obj, [top || key, val]);
        }
      });
    }
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
  let pValue;

  return Object.defineProperty(obj, key, {
    get() {
      return pValue;
    },
    set(val) {
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
    get() {
      return this.length;
    },
    set(val) {
      if (parseInt(val) === val) {
        for (let i in this) {(i >= val) || (delete this[i]);}

        for (let i = 0; i < val; i += 1) {
          this[i] === undefined || (this[i] = this[i]);
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
    let s = start || 0, e = end || this.length;

    for (let i in this) {(parseInt(i) === i) && (btw(this[i], s, e)) && (this[i] = val);}

    callback(top);
  };

  /**
   * As the native pop(), with callback
   * @return {*}
   */

  this.prototype.pop = function () {
    if (this.length) {
      let res = this[this.length - 1];

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
    let len = this.length - 1, tmp;

    for (let i = 0; i < len / 2; i += 1) {
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
      let res = this[0];

      for (let i = 0; i < length - 1; i += 1) {
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
    let arr = [];

    for (let i in this) {
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
    for (let i = 0; i < arr.length; i += 1) {
      this[i] = arr[i];
      if (this[key] instanceof Array) {
        this[key] = array(this[key], callback, top || key);
      } else if (typeof this[key] === 'object') {
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
    let arr = this.toArray();
    let res = Array.splice.apply(arr, arguments);

    this.modifiedByArray(arr);
    callback(top);
    return res;
  };

  /**
   * As the native unshift(), with callback
   */

  this.prototype.unshift = function () {
    let arr = this.toArray();
    let res = Array.unshift.apply(arr, arguments);

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
  return (new OArray(callback, top)).modifiedByArray(arr);
}

let observe = {
  object, key, array
};

export default observe;
