import Element from './Virtual-DOM/element';

export default class Hake {
  constructor() {
    this._name = 'Hake';
    this.element = Element;
    this._version = '0.0.0';
  }

  get name() {
    return this._name + ' ver.' + this._version;
  }
}
