export default function initCustomSelect() {
  const namespace = 'data-cs';

  const selectAttr = `${namespace}-select`;
  const optionAttr = `${namespace}-option`;
  const defaultAttr = `${namespace}-default`;
  const popupAttr = `${namespace}-popup`;

  // Active state CSS classes for active (or default) option and select
  const selectActiveClass = 'custom-select__select--active';
  const optionActiveClass = 'custom-select__option--active';
  const popupOpenClass = 'custom-select__options-backdrop--visible';

  const customSelectNodeList = document.querySelectorAll(`[${namespace}]`);

  customSelectNodeList.forEach((customSelect) => {
    const selectNode = customSelect.querySelector(`[${selectAttr}]`);
    const optionNodeList = customSelect.querySelectorAll(`[${optionAttr}]`);
    const defaultOptionNode = customSelect.querySelector(`[${defaultAttr}]`);
    const popupNode = customSelect.querySelector(`[${popupAttr}]`);

    // TODO: Add check: Missing default option
    const defaultOption = {
      value: defaultOptionNode.getAttribute(optionAttr),
      text: defaultOptionNode.textContent,
    };

    selectNode.setAttribute(selectAttr, defaultOption.value);
    selectNode.textContent = defaultOption.text;

    defaultOptionNode.classList.add(optionActiveClass);

    console.log(selectNode);
    console.log(optionNodeList);
    console.log(defaultOption);

    selectNode.addEventListener('click', () => {
      selectNode.classList.add(selectActiveClass);
      popupNode.classList.add(popupOpenClass);
    });

    function customSelectReset() {
      popupNode.classList.remove(popupOpenClass);
      selectNode.classList.remove(selectActiveClass);
    }

    popupNode.addEventListener('click', customSelectReset);

    optionNodeList.forEach((optionNode) => {
      optionNode.addEventListener('click', (e) => {
        const selectedValue = selectNode.getAttribute(selectAttr);

        // console.log(selectedValue);

        const optionList = Array.from(optionNodeList);
        const activeOptionNode = optionList.find(
          option => option.getAttribute(optionAttr) === selectedValue,
        );

        // console.log(activeOptionNode);

        activeOptionNode.classList.remove(optionActiveClass);
        optionNode.classList.add(optionActiveClass);

        const newSelectedValue = optionNode.getAttribute(optionAttr);
        const newSelectedText = optionNode.textContent;
        selectNode.setAttribute(selectAttr, newSelectedValue);
        selectNode.textContent = newSelectedText;

        setTimeout(customSelectReset, 300);

        e.stopPropagation();
      });
    });
  });
}
