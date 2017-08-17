import Parse from '../parse';
import Observe from '../observe';

let dataReg = /{{[\s\S]*}}/g;
const ATTR = new Symbol('attrData'), TEXT = new Symbol('TEXT');

function dataHash(str) {
  let hash = 1713302033171, i, ch;

  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
    hash ^= ((hash >> 2) + ch + (hash << 5));
  }

  return (hash).toString(16);
}

function hasData(str) {
  return dataReg.test(str);
}

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

function dataObserve(data, el) {
  const dataMap = dataBind(dataSearch(el), data);

  return Observe.object(data, (key, val) => {
    dataMap[key].generate();
  });
}

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
