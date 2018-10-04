export default class Popup {
  constructor(containerNode, { containerClass, popupClass }) {
    const container = containerNode;
    const popup = container.children[0];

    container.stateClass = containerClass;
    popup.stateClass = popupClass;

    container.addEventListener('transitionend', (e) => {
      if (e.target === container && !container.classList.contains(container.stateClass)) {
        container.style.visibility = 'hidden';
      }
    });

    // Note: using with custom TransitionEvent
    container.addEventListener('my-transitionstart', () => {
      if (container.classList.contains(container.stateClass)) {
        container.style.visibility = 'visible';
      }
    });

    this.container = container;
    this.popup = popup;
  }

  onClick(func) {
    this.container.addEventListener('click', () => {
      func();
    });
  }

  show() {
    this.container.classList.add(this.container.stateClass);

    // Check the cases when popup is styled through container class (context)
    if (this.popup.stateClass) {
      this.popup.classList.add(this.popup.stateClass);
    }

    const event = new TransitionEvent('my-transitionstart', {
      detail: 'Transiton starts',
    });
    this.container.dispatchEvent(event);
  }

  hide() {
    this.container.classList.remove(this.container.stateClass);

    // Check the cases when popup is styled through container class (context)
    if (this.popup.stateClass) {
      this.popup.classList.remove(this.popup.stateClass);
    }
  }
}
