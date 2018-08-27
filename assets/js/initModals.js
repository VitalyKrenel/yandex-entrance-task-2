import Modal from './modal.js';

export default function initModals() {
  const cardNodeList = document.querySelectorAll('[data-card]');

  cardNodeList.forEach((cardNode) => {
    const relatedModel = cardNode.getAttribute(Modal.attributes.open);
    const modalNode = document.querySelector(`
      [data-modal='${relatedModel}']
    `);

    const modal = new Modal(modalNode, {
      containerActiveClass: 'modal-container--visible',
    });

    cardNode.addEventListener('click', () => {
      modal.show();
    });

    modal.onClose = () => {
      modal.hide();
    };

    modal.onConfirm = () => {
      modal.hide();
    };
  });
}
