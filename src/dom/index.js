/**
 * @file Simple DOM function short cut, but may not use in main of HakeJS.
 * @author Dominic Ming <dom@mingdom.cn>
 */

function getOne(selector) {
  return document.querySelector(selector);
}

function getAll(selector) {
  return document.querySelectorAll(selector);
}

function getAttr(el, name) {
  return el.getAttribute(name);
}

function getAttrs(el) {
  let res = {};

  for (let i in el.attribute) {res[el.attribute[i].name] = el.attribute[i].value;}

  return res;
}

function addClass(el, className) {
  return (el.className.indexOf(className) + 1) || (el.className += ' ' + className);
}

function removeClass(el, className) {
  return el.className.replace(`/ ${className}|${className}`, '');
}

function toggleClass(el, className) {
  return (el.className.indexOf(className) + 1) ?
    (el.className.replace(`/ ${className}|${className}`, '')) :
    (el.className += ' ' + className);
}

let dom = {
  getOne, getAll, getAttr, getAttrs, addClass, removeClass, toggleClass
};

export default dom;
