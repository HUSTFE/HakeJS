let dataReg = /{{[^(?!.*{{)]*}}/g;

function dataHash(str, num) {
  let hash = 1315423911, i, ch;

  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }

  return str + '-' + (hash & num).toString(16);
}

function hasData(str) {
  return dataReg.test(str);
}

function dataEvent(target, content) {

}

let data = {
  dataHash, hasData, dataEvent
};

export default data;
