let dataReg = /{{[^(?!.*{{)]*}}/g;

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

function dataEvent(target, content) {

}

let data = {
  dataHash, hasData, dataEvent
};

export default data;
