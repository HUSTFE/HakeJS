function object(obj, callback) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        get() {
          return obj[key];
        },
        set(val) {
          obj[key] = val;
          callback || callback.apply(obj, val, key);
        }
      });
    }
  }
}

function key(obj, key, callback) {
  return Object.defineProperty(obj, key, {
    get() {
      return obj[key];
    },
    set(val) {
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
    get() {
      return this.length;
    },
    set(val) {
      if (parseInt(val) === val) {
        for (let i in this)
          (i >= val) || (delete this[i]);

        for (let i = 0; i < val; i += 1) {
          this[i] === undefined || (this[i] = this[i]);
        }
      }

      return this;
    }
  });

  this.prototype.fill = function (val, start, end) {
    let s = start || 0, e = end || this.length;

    for (let i in this)
      (parseInt(i) === i) && (btw(this[i], s, e)) && (this[i] = val);

    callback(this);
  };

  this.prototype.pop = function () {
    if (this.length) {
      let res = this[this.length - 1];

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
    let len = this.length - 1, tmp;

    for (let i = 0; i < len / 2; i += 1) {
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
      let res = this[0];

      for (let i = 0; i < length - 1; i += 1) {
        this[i + 1] === undefined || (this[i] = this[i + 1]);
      }

      this.length -= 1;
      callback(this);
      return res;
    }
  };

  this.prototype.toArray = function () {
    let arr = [];

    for (let i in this) {
      i === parseInt(i) && (arr[i] = this[i]);
    }

    return arr;
  };

  this.prototype.modifiedByArray = function (arr) {
    for (let i = 0; i < arr.length; i += 1) {
      this[i] = arr[i];
    }

    this.length = arr.length;

    callback(this);

    return this;
  };

  this.prototype.splice = function () {
    let arr = this.toArray();
    let res = Array.splice.apply(arr, arguments);

    this.modifiedByArray(arr);

    return res;
  };

  this.prototype.unshift = function () {
    let arr = this.toArray();
    let res = Array.unshift.apply(arr, arguments);

    this.modifiedByArray(arr);

    return res;
  };
}

function array(arr, callback) {
  return (new OArray(callback)).modifiedByArray(arr);
}

let observe = {
  object, key, array
};

export default observe;
