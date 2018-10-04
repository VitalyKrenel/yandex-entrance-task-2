import Popup from './popup.js';

export default class Modal extends Popup {
  constructor(modalContainerNode, { containerActiveClass, bodyActiveClass }) {
    super(modalContainerNode, {
      containerClass: containerActiveClass,
      popupClass: bodyActiveClass,
    });

    this.modal = this.container.querySelector(Modal.selectors.body);
    this.closeButton = this.container.querySelector(Modal.selectors.close);
    this.confirmButton = this.container.querySelector(Modal.selectors.confirm);
  }

  set onClose(handler) {
    this.onCloseHandler = handler;

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.onCloseHandler);
    }
  }

  get onClose() {
    return this.onCloseHandler;
  }

  set onConfirm(handler) {
    this.onConfirmHandler = handler;

    if (this.confirmButton) {
      this.confirmButton.addEventListener('click', this.onConfirmHandler);
    }
  }

  get onConfirm() {
    return this.onConfirmHandler;
  }

  static get attributes() {
    const namespace = 'data-modal';
    const body = namespace.concat('-body');
    const close = namespace.concat('-close');
    const open = namespace.concat('-open');
    const confirm = namespace.concat('-confirm');

    return {
      namespace,
      body,
      open,
      close,
      confirm,
    };
  }

  static get selectors() {
    return Object.assign({}, ...Object.keys(Modal.attributes).map(key => ({
      [key]: `[${Modal.attributes[key]}]`,
    })));
  }
}
