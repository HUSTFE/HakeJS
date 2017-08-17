/**
 * @file Instance of HakeJS component, handle whole lifecycle of component.
 * @author Dominic Ming <dom@mingdom.cn>
 */

import Dom from '../dom';
import Data from '../data';
import Msg from '../message';
import Parse from '../parse';

const defaultOption = {
  data: {},
  shadowDOM: false,
  isRoot: false,
  isHake: false,
  created: ()=> {},
  rendered: ()=> {},
  mounted: ()=> {},
  updated: ()=> {},
  destroyed: ()=> {}
};

export default class HakeItem {
  constructor(option) {
    let config = Object.assign({}, defaultOption, option);
    let __content;

    if (!Dom.getOne(config.el)) {
      Msg.error('Root component should have a element to mount.');
      return;
    }

    if (!config.content) {
      Msg.error('Component should have content.');
      return;
    }

    if (config.content.innerHTML) {
      config.content = config.content.innerHTML;
    }

    try {
      if (config.isHake) {
        __content = Parse.parseHake(config.content);
      } else {
        __content = Parse.parseDOM(config.content);
      }
    } catch (e) {
      console.error(e);
    }

    Data.dataSearch(__content);

  }
}
