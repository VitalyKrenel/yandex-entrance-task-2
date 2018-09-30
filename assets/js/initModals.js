import Modal from './modal.js';

export default function initModals(app) {
  const cardNodeList = document.querySelectorAll('[data-card]');

  cardNodeList.forEach((cardNode) => {
    const relatedModel = cardNode.getAttribute(Modal.attributes.open);
    const modalNode = document.querySelector(`
      [data-modal='${relatedModel}']
    `);

    const modal = new Modal(modalNode, {
      containerActiveClass: 'modal-container--visible',
    });

    const openModalHandler = () => {
      modal.show();
      app.classList.add('app__main--blurred');
    };

    const closeModalHandler = () => {
      app.classList.remove('app__main--blurred');
      modal.hide();
    };

    cardNode.addEventListener('click', openModalHandler);
    modal.onClose = closeModalHandler;
    modal.onConfirm = closeModalHandler;
  });
}
