import Msg from '../message';

let eventpool = {};

function __addListener(event, callback, target) {
  eventpool[event] && Msg.warn(`event: ${event} will be overwrite.`);

  eventpool[event] = {
    callback, isFake: true, target, event
  };
}

function __removeListener(event, callback, target) {
  delete eventpool[event];
}

function addEvent(event, target, callback) {
  if (target.addEventListener) {
    target.addEventListener(event, callback);
  } else {
    __addListener(event, callback, target);
  }
}

function trigEvent(event, target) {
  if (target.dispatchEvent) {
    let event = new Event(event);

    target.dispatchEvent(event);
  } if (eventpool[event]) {
    eventpool[event].callback.apply(eventpool[event].target, [eventpool[event].target]);
  } else {
    Msg.error(`event: ${event} does not exist`);
  }
}

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
