import CustomSelect from './customSelect.js';
import Modal from './modal.js';

export default function initCustomSelect() {
  const customSelectMatch = `[${CustomSelect.namespace}]`;
  const customSelectNodeList = document.querySelectorAll(customSelectMatch);

  /*
  * TODO: Optimize the event handlers listeners
  *
  * - For every target (custom select) new instances of event listeners are
  * created. It should be a performance issue when many custom select exists;
  *
  * - Probably, better idea is to create a one document listener with required
  * target match;
  */
  customSelectNodeList.forEach((node) => {
    const customSelect = new CustomSelect(node);
    const modalNode = node.querySelector(Modal.selectors.namespace);
    const modal = new Modal(modalNode, {
      containerActiveClass: 'modal-container--visible',
      bodyActiveClass: '',
    });

    const openOptionsModal = () => {
      customSelect.select.makeActive();
      modal.show();
    };

    const closeOptionsModal = () => {
      customSelect.select.makeInactive();
      modal.hide();
    };

    const optionClickHandler = (clickedOption, options) => {
      const activeOption = options.find(
        opt => opt.value === customSelect.select.value,
      );

      activeOption.makeInactive();
      clickedOption.makeActive();
    };

    const assignOptionClickHandler = (option) => {
      // console.log(option);
      option.onClick(() => {
        optionClickHandler(option, customSelect.options);
        customSelect.select.value = option.value;
        customSelect.select.text = option.text;
      });
    };

    // Click on select button will trigger popup
    customSelect.select.onClick(openOptionsModal);
    // Click anywhere in modal container will deactivate select and hide modal
    modal.onClick(closeOptionsModal);

    customSelect.options.forEach(assignOptionClickHandler);
  });
}
