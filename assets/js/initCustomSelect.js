import CustomSelect from './customSelect.js';
import Modal from './modal.js';

function selectClickHandler(select, popup) {
  select.makeActive();
  popup.show();
}

function popupClickHanlder(select, popup) {
  select.makeInactive();
  popup.hide();
}

function optionClickHandler(customSelect, popup, option) {
  const activeOption = customSelect.options.find(
    opt => opt.value === customSelect.select.value,
  );

  activeOption.makeInactive();
  option.makeActive();

  popup.hide();
  customSelect.select.makeInactive();

  return option;
}

export default function initCustomSelect() {
  const customSelectMatch = `[${CustomSelect.namespace}]`;
  const customSelectNodeList = document.querySelectorAll(customSelectMatch);

  customSelectNodeList.forEach((node) => {
    const customSelect = new CustomSelect(node);
    const modalNode = node.querySelector(Modal.selectors.namespace);
    const modal = new Modal(modalNode, {
      containerActiveClass: 'modal-container--visible',
      bodyActiveClass: '',
    });

    // Click on select button will trigger popup
    customSelect.select.onClick(() => {
      selectClickHandler(customSelect.select, modal);
    });

    // Click on popup backdrop will deactivate select
    modal.onClick(() => {
      popupClickHanlder(customSelect.select, modal);
    });

    customSelect.options.forEach((option) => {
      option.onClick(() => {
        const selectedOption = optionClickHandler(customSelect, modal, option);

        customSelect.select.value = selectedOption.value;
        customSelect.select.text = selectedOption.text;
      });
    });
  });
}
