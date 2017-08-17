/**
 * @file Main enter of HakeJS, now just export all of module.
 * @author Dominic Ming <dom@mingdom.cn>
 */

import data from './data';
import dom from './dom';
import observe from './observe';
import parse from './parse';
import event from './event';
import item from './item';

/**
 * A set of all HakeJS function and module.
 * @class
 */

export default class Hake {
  /**
   * Export all module, tag name and version.
   * @constructor
   */
  constructor() {
    this._name = 'Hake';
    this._version = '0.0.0';
    this.data = data;
    this.dom = dom;
    this.observe = observe;
    this.parse = parse;
    this.event = event;
    this.item = item;
  }
}
