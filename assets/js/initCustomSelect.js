import CustomSelect from './customSelect.js';
import Popup from './popup.js';

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
    const popupNode = node.querySelector('[data-popup]');
    const popup = new Popup(popupNode, {
      containerClass: 'modal-container--visible',
      popupClass: 'modal-container--visible',
    });

    // Click on select button will trigger popup
    customSelect.select.onClick(() => {
      selectClickHandler(customSelect.select, popup);
    });

    // Click on popup backdrop will deactivate select
    popup.onClick(() => {
      popupClickHanlder(customSelect.select, popup);
    });

    customSelect.options.forEach((option) => {
      option.onClick(() => {
        const selectedOption = optionClickHandler(customSelect, popup, option);

        customSelect.select.value = selectedOption.value;
        customSelect.select.text = selectedOption.text;
      });
    });
  });
}
