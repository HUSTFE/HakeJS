/**
 * @file Simple event system for HakeJS, but not sure really support.
 * @author Dominic Ming <dom@mingdom.cn>
 */

import Msg from '../message';

/**
 * A pool to store event that not native
 * @type {object}
 */

let eventpool = {};

/**
 * Add event in eventpool
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 * @private
 */

function __addListener(event, callback, target) {
  eventpool[event] && Msg.warn(`event: ${event} will be overwrite.`);

  eventpool[event] = {
    callback, isFake: true, target, event
  };
}

/**
 * Remove event in eventpool
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 * @private
 */

function __removeListener(event, callback, target) {
  delete eventpool[event];
}

/**
 * Add event to anything (some just fake event)
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 */

function addEvent(event, target, callback) {
  if (target.addEventListener) {
    target.addEventListener(event, callback);
  } else {
    __addListener(event, callback, target);
  }
}

/**
 * Run a event on target (fake events don't care target)
 * @param {string} event
 * @param {*} target
 */

function trigEvent(event, target) {
  if (target.dispatchEvent) {
    let e = new Event(event);

    target.dispatchEvent(e);
  } if (eventpool[event]) {
    eventpool[event].callback.apply(eventpool[event].target, [eventpool[event].target]);
  } else {
    Msg.error(`event: ${event} does not exist`);
  }
}

/**
 * Remove event on anything (fake events don't care target and callback)
 * @param {string} event
 * @param {function} callback
 * @param {*} target
 */

function removeEvent(event, target, callback) {
  if (target.removeEventListener) {
    callback ? target.removeEventListener(event, callback) :
      Msg.error('event can\'t be cancel without same callback function.');
  } else {
    __removeListener(event, callback, target);
  }
}

let event = {
  addEvent, trigEvent, removeEvent
};

export default event;
