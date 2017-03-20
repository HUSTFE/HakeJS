/**
 * Created by Doming on 2016/10/21.
 */
import {Element, rootElement} from './element';

export function domTransTree(domElement) {
  var node = new Element(domElement.tagName, domElement.attributes, domElement), children = domElement.children, i;

  for (i = 0; i < children.length; i++) {
    node.appendChildren(domTransTree(children[i]));
  }
  return node;
}

class difference {
  constructor(type, depth, num, change) {
    this.type = type;
    this.depth = depth;
    this.num = num;
    this.change = change;
  }
}

class diffStack {
  constructor(root) {
    this.root = root;
    this.oldTree = domTransTree(root);
  }

  diff(oldNode, newNode, depth, num, parent) {
    var i, longer;

    depth++;
    if (oldNode === undefined || oldNode === null) {
      this.createElement(parent, newNode)
    } else if (newNode === undefined || newNode === null) {
      this.deleteElement(newNode);
    } else if (oldNode.tagName === newNode.tagName) {
      if (JSON.stringify(newNode.attr) === (JSON.stringify(oldNode.attr))) {
      } else {
        for (attribute in newNode.attr) {
          oldNode.domElement.setAttribute(attribute, this.attr[attribute]);
        }
        oldNode.domElement
        longer = (newNode.children.length > oldNode.children.length) ?
          newNode.children.length :
          oldNode.children.length;
        for (i = 0; i < longer; i++) {
          this.diff(oldNode.children[i], newNode.children[i], depth, i, oldNode);
        }
      }
    }
  }

  createElement(parent, newNode){
    parent.domElement.appendChildren(newNode.render());
  }

  deleteElement(node){
    node.domElement.remove();
  }

  render(newTree) {
    this.diff(this.oldTree, newTree, 0, 0);
  }
}

export function renderVirtualTree(root, newTree) {
  var diffs = new diffStack(root);
  diffs.render()
}