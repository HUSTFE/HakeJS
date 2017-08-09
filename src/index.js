import data from './data';
import dom from './dom';
import observe from './observe';
import parse from './parse';

export default class Hake {
  constructor() {
    this._name = 'Hake';
    this._version = '0.0.0';
    this.data = data;
    this.dom = dom;
    this.observe = observe;
    this.parse = parse;
  }
}
