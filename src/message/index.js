/**
 * @file message api for HakeJS, will extend later.
 * @author Dominic Ming <dom@mingdom.cn>
 */

/**
 * All message in the Hake will come here.
 * @type {Array}
 */

let msgStack = [];

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

let message = {
  error, warn, msgStack
};

export default message;
