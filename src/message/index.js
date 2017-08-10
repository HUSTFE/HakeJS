let msgStack = [];

function error(msg) {
  msgStack.push('error ' + msg);
  console.error('[Hake error] ' + msg);
}

function warn(msg) {
  msgStack.push('warn ' + msg);
  console.warn('[Hake] warn ' + msg);
}

let message = {
  error, warn, msgStack
};

export default message;
