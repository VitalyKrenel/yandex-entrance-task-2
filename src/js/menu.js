export default class Menu {
  constructor(togglerNode, containerNode, { containerActiveClass }) {
    this.toggler = togglerNode;
    this.container = containerNode;
    this.containerActiveClass = containerActiveClass;
  }

  set onClick(handler) {
    this.clickHandler = (event) => {
      // Note: handler() supposed to change the state of menu, so document
      // event is added/removed only after the handler
      handler(event);
      if (this.isActive()) {
        document.addEventListener('click', this.onOuterClick);
      } else {
        // this.node.style.visibility = 'hidden';
        document.removeEventListener('click', this.onOuterClick);
      }
    };
    this.toggler.addEventListener('click', this.clickHandler);
  }

  // Can be used to remove the event handler
  get onClick() {
    return this.clickHandler;
  }

  set onOuterClick(handler) {
    // Ensure that clicked element is not an inner part of the container
    const outerClickHandler = (event) => {
      if (!this.container.contains(event.target)) {
        handler(event);
        document.removeEventListener('click', this.onOuterClick);
      }
    };

    this.outerClickHandler = outerClickHandler;
  }

  // Can be used to remove the event handler
  get onOuterClick() {
    return this.outerClickHandler;
  }

  show() {
    this.container.classList.add(this.containerActiveClass);
  }

  hide() {
    this.container.classList.remove(this.containerActiveClass);
  }

  toggle() {
    this.container.classList.toggle(this.containerActiveClass);
  }

  isActive() {
    return this.container.classList.contains(this.containerActiveClass);
  }
}
