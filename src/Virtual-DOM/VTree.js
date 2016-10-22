/**
 * Created by Doming on 2016/10/21.
 */
import {Element, rootElement} from './element';

var operationType = {
  CREATE: new Symbol('CREATE'),
  DELETE: new Symbol('DELETE'),
  CHANGE: new Symbol('CHANGE'),
  MOVE: new Symbol('MOVE'),
  ATTR: new Symbol('ATTR')
};

export function domTransTree(domElement) {
  var node = new Element(domElement.tagName, domElement.attributes), children = domElement.children,i;

  for (i=0;i<children.length;i++) {
    node.appendChildren(domTransTree(children[i]));
  }
  return node;
}

class difference{
  constructor(type, depth, num, change) {
    this.type = type;
    this.depth = depth;
    this.num = num;
    this.change = change;
  }
}

class diffStack{
  constructor(){
    this.diffs = [];
  }
  static diff(oldNode, newNode, depth, num) {
    depth++;
    if(oldNode === undefined||oldNode === null) {
      this.diffs.push(new difference(operationType.CREATE, depth, num, newNode));
    }else if(newNode === undefined || newNode === null) {
      this.diffs.push(new difference(operationType.DELETE, depth, num));
    }else if (oldNode.tagName === newNode.tagName) {
      if(JSON.stringify(newNode.attr) === (JSON.stringify(oldNode.attr))) {

      }
    }
  }
}



export function renderVirtualTree(root,newTree) {
  var oldTree = domTransTree(root);
  diff(oldTree,newTree,0);
}