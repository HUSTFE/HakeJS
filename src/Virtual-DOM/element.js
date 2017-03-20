/**
 * Created by Doming on 2016/10/15.
 * Element Class is aim to build a light-weight DOM element,
 * which consists of Virtual DOM-Tree.
 */

function isElementHasEl(el1, el2) {
  if (el1 === el2) {
    return true;
  }
  if (el2.children.length !== 0) {
    if (el2.children.includes(el1)) {
      return true;
    }
    el2.children.forEach(e=>{
      if (isElementHasEl(el2, e)) {
        return true;
      }
    });
  }
  return false;
}

export default class Element {
  /**
   * Constructor of Element
   * @param tagName String
   * @param attr Object
   * @param domElement HTMLElement
   */

  constructor(tagName, attr, domElement) {
    if (typeof tagName === 'string' && typeof attr === 'object' && tagName !== '') {
      this.tagName = tagName;
      this.attr = attr;
      this.children = [];
      this.domElement = domElement;
    } else {
      console.error("[Hake Error]: Virtual-DOM element isn't created correctly.");
    }
  };

  /**
   * Use to render Element into actual DOM-element.
   */

  render() {
    var el = document.createElement(this.tagName), attribute;

    for (attribute in this.attr) {
      el.setAttribute(attribute, this.attr[attribute]);
    }
    this.children.forEach((child)=> {
      var childEl = (child instanceof Element) ?
        child.render() :
        document.createTextNode(child);

      el.appendChild(childEl);
    });
    return el;
  };

  /**
   * to append child Elements to element
   * child element param sum has no limit.
   * @param child Array
   */

  appendChildren(child) {
    child.forEach((el)=> {
      if (typeof el === 'string' && el instanceof Element && !isElementHasEl(this, el)) {
        this.children.push(el);
      }
    });
  };
}

export class rootElement extends Element {
  constructor(tagName, attr, bindElement) {
    super(tagName, attr);
    this.isRoot = true;
    this.bindElement = bindElement;
  }
}
