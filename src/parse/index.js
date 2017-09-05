/**
 * @file All of the string handler is here, parse Hake, HTML and data syntax inside.
 * @author Dominic Ming <dom@mingdom.cn>
 */

/**
 * To match single tag.
 * @constant
 * @type {RegExp}
 */

const singleTag = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/;

/**
 * To skip syntax that not involved in data.
 * @constant
 * @type {RegExp}
 */

const syntax = /[ +|\-*\/%=&\n{}<>^!?:,;~\[\]\\]/;

/**
 * Use browser native api to parse HTML, Lazy Easy DOM parser.
 * @param {string} str
 * @return {HTMLElement}
 */

function parseDOM(str) {
  let el = document.createElement('div');

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
  let res = '', i;

  for (i = startIndex; str[i] !== ' ' && str[i] !== '{' && str[i] !== '(' && str[i] !== ')'; i += 1) {
    res += str[i];
  }

  return {tag: res, end: str[i]} || false;
}

/**
 * Parse Hake string and return HTMLElement.
 * @param {string} str
 * @return {HTMLElement}
 */

function parseHake(str) {
  let res = '', nowTag = [], tmpTag, inString = '', len = str.length;

  for (let i = 0; i < len; i++) {
    switch (str[i]) {
      case '(':
        nowTag.push(readTag(i + 1, str));
        if (nowTag[nowTag.length - 1].end === ' ') {
          res += '<' + nowTag[nowTag.length - 1].tag + '>';
          i += nowTag[nowTag.length - 1].tag.length + 1;
        } else if (nowTag[nowTag.length - 1].end === '(') {
          res += '<' + nowTag[nowTag.length - 1].tag + '>';
          i += nowTag[nowTag.length - 1].tag.length;
        } else if (nowTag[nowTag.length - 1].end === ')') {
          res += '<' + nowTag[nowTag.length - 1].tag + '>';
          i += nowTag[nowTag.length - 1].tag.length;
        } else res += '<';
        break;
      case ')':
        tmpTag = nowTag.pop();
        res += singleTag.test(tmpTag.tag) ? '' : ('<\/' + tmpTag.tag + '>');
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
  let gen = '';
  let tmp = '';
  let blindThis = false;

  for (let i = 0; str[i]; i += 1) {
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
  let res = [], tmp = '';

  for (let i = 0; str[i]; i += 1) {
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

let parse = {
  parseDOM, parseData, parseHake
};

export default parse;
