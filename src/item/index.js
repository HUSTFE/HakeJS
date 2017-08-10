import Dom from '../dom';
import Msg from '../message';

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

    if (!Dom.getOne(config.el)) {
      Msg.error('Root component should have a element to mount.');
      return;
    }
    if (!config.content) {
      Msg.error('Component should have content.');
      return;
    }
  }
}
