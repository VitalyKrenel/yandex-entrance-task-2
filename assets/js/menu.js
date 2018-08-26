export default class Menu {
  constructor(node, container, { activeClass }) {
    this.node = node;
    this.container = container;
    this.activeClass = activeClass;
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
    this.node.addEventListener('click', this.clickHandler);
  }

  // Can be used to remove the event handler
  get onClick() {
    return this.clickHandler;
  }

  set onOuterClick(handler) {
    // Ensure that clicked element is not an inner part of the container
    const outerClickHandler = (event) => {
      console.log('Menu: An outer click occured');
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
    this.container.classList.add(this.activeClass);
  }

  hide() {
    this.container.classList.remove(this.activeClass);
  }

  toggle() {
    this.container.classList.toggle(this.activeClass);
  }

  isActive() {
    return this.container.classList.contains(this.activeClass);
  }
}
