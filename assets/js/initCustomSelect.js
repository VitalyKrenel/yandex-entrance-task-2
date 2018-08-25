import Selectable from './selectable.js';

export default function initCustomSelect() {
  const ns = 'data-cs'; // Custom select namespace

  const attrs = {
    select: ns.concat('-select'),
    option: ns.concat('-option'),
    default: ns.concat('-default'),
    value: ns.concat('-value'), 
    popup: ns.concat('-popup'),
  };

  const selectors = {
    namespace: `[${ns}]`,
    select: `[${attrs.select}]`,
    option: `[${attrs.option}]`,
    default: `[${attrs.default}]`,
    popup: `[${attrs.popup}]`,
  };

  // Active state CSS classes for active (or default) option and select
  const activeState = {
    select: 'custom-select__select--active',
    option: 'custom-select__option--active',
    popup: 'custom-select__options-backdrop--visible',
  };

  const customSelectNodeList = document.querySelectorAll(selectors.namespace);

  customSelectNodeList.forEach((customSelectNode) => {
    const selectNode = customSelectNode.querySelector(selectors.select);
    const select = new Selectable(selectNode, activeState.select, attrs.value);

    const optionNodeList = customSelectNode.querySelectorAll(selectors.option);
    const options = Array.from(optionNodeList).map(
      optionNode => new Selectable(optionNode, activeState.option, attrs.value),
    );

    // TODO: Add check: Missing default option
    const defaultOptionNode = customSelectNode.querySelector(selectors.default);
    const defaultOption = new Selectable(defaultOptionNode, activeState.option, attrs.value);

    const popupNode = customSelectNode.querySelector(selectors.popup);

    // Hack: popup block does not require settable properties (value and text),
    // but for the sake of code simplicity I've decided to not use the class
    // composition trick (.. extends C(B()))
    const popup = new Selectable(popupNode, activeState.popup);

    select.value = defaultOption.value;
    select.text = defaultOption.text;

    defaultOption.makeActive();

    // Click on select button will trigger popup
    select.onClick(() => {
      select.makeActive();
      popup.makeActive();
    });

    // Click on popup backdrop will deactivate select
    popup.onClick(() => {
      popup.makeInactive();
      select.makeInactive();
    });

    options.forEach((option) => {
      option.onClick(() => {
        const activeOption = options.find(
          opt => opt.value === select.value,
        );

        activeOption.makeInactive();
        option.makeActive();

        select.value = option.value;
        select.text = option.text;

        popup.makeInactive();
        select.makeInactive();
      });
    });
  });
}
