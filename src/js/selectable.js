export default class Selectable {
  constructor(node, activeClass, valueAttribute) {
    this.node = node;
    this.activeClass = activeClass;
    this.valueAttribute = valueAttribute;
  }

  onClick(func) {
    this.node.addEventListener('click', func);
  }

  makeActive() {
    this.node.classList.add(this.activeClass);
  }

  makeInactive() {
    this.node.classList.remove(this.activeClass);
  }

  // Settable
  set value(value) {
    this.node.setAttribute(this.valueAttribute, value);
  }

  get value() {
    return this.node.getAttribute(this.valueAttribute);
  }

  set text(value) {
    this.node.textContent = value;
  }

  get text() {
    return this.node.textContent;
  }
}
