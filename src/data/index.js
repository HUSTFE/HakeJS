/**
 * @file Handle data bind, search, render and etc.
 * @author Dominic Ming <dom@mingdom.cn>
 */

import Parse from '../parse';
import Observe from '../observe';

/**
 * Used to detect {{}} in string
 * @type {RegExp}
 */

let dataReg = /{{[\s\S]*}}/g;

/**
 * DataBlock Type
 * @type {string}
 */

const ATTR = 'ATTR', TEXT = 'TEXT';

/**
 * Hash a string to a code.
 * @param {string} str
 * @return {string}
 */

function dataHash(str) {
  let hash = 1713302033171, i, ch;

  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
    hash ^= ((hash >> 2) + ch + (hash << 5));
  }

  return (hash).toString(16);
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
  let children = el.querySelectorAll('*');
  let res = [];

  for (let i in children) {
    for (let j in children[i].attributes) {
      if (hasData(children[i].attributes[j])) {
        res.push({
          type: ATTR,
          target: children[i],
          attrName: children[i].attributes[j].name,
          data: Parse.parseData(children[i].attributes[j].value)
        });
      }
    }

    for (let j in children[i].childNodes) {
      if (children[i].childNodes[j].nodeName === '#text' && hasData(children[i].childNodes[j].nodeValue)) {
        res.push({
          type: TEXT,
          target: children[i].childNodes[j],
          data: Parse.parseData(children[i].childNodes[j].nodeValue)
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
  let dataMap = {};

  for (let i in sArr) {
    if (parseInt(i)) {
      for (let j in sArr[i].data) {
        if (sArr[i].data[j].related) {
          sArr[i].data[j].related.forEach((e) => {
            data.hasOwnProperty(e) && (dataMap[e] || (dataMap[e] = [])) && data[e].push(sArr[i]);
          });
        }
      }
    }
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
  const dataMap = dataBind(dataSearch(el), data);

  return Observe.object(data, (key, val) => {
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
  let diff = [];

  for (let i = 0; i < res.length; i++) {
    if (res[i].generate) {
      if (res[i].generate.apply(oldData) !== res[i].generate.apply(newData)) {
        diff.push(res[i]);
      }
    }
  }
}

let data = {
  dataHash, hasData, dataSearch, dataBind, dataDiff, dataObserve
};

export default data;
