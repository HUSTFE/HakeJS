/**
 * @file Simple DOM function short cut, but may not use in main of HakeJS.
 * @author Dominic Ming <dom@mingdom.cn>
 */

/**
 * document.querySelector shortcut
 * @param {string} selector
 * @return {Element}
 */

function getOne(selector) {
  return document.querySelector(selector);
}

/**
 * document.querySelectorAll shortcut
 * @param {string} selector
 * @return {NodeList}
 */

function getAll(selector) {
  return document.querySelectorAll(selector);
}

/**
 * getAttribute shortcut
 * @param {HTMLElement} el
 * @param {string} name
 * @return {string}
 */

function getAttr(el, name) {
  return el.getAttribute(name);
}

/**
 * return all attribute in element in a object
 * @param {HTMLElement} el
 * @return {object}
 */

function getAttrs(el) {
  let res = {};

  for (let i in el.attribute) {res[el.attribute[i].name] = el.attribute[i].value;}

  return res;
}

/**
 * Add class on element.
 * @param {HTMLElement} el
 * @param {string} className
 * @return {*|string}
 */

function addClass(el, className) {
  return (el.className.indexOf(className) + 1) || (el.className += ' ' + className);
}

/**
 * Remove class on element.
 * @param {HTMLElement} el
 * @param {string} className
 * @return {*|string}
 */

function removeClass(el, className) {
  return el.className.replace(`/ ${className}|${className}`, '');
}

/**
 * Toggle class on element.
 * @param {HTMLElement} el
 * @param {string} className
 * @return {*}
 */

function toggleClass(el, className) {
  return (el.className.indexOf(className) + 1) ?
    (el.className.replace(`/ ${className}|${className}`, '')) :
    (el.className += ' ' + className);
}

let dom = {
  getOne, getAll, getAttr, getAttrs, addClass, removeClass, toggleClass
};

export default dom;
