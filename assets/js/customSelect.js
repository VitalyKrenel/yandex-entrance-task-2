import Selectable from './selectable.js';

export default class CustomSelect {
  constructor(node) {
    const { options, defaultOption } = CustomSelect.initOptions(node);
    this.select = CustomSelect.initSelect(node);
    this.options = options;
    this.defaultOption = defaultOption;

    this.select.value = this.defaultOption.value;
    this.select.text = this.defaultOption.text;

    this.defaultOption.makeActive();
  }

  static get attributes() {
    const ns = CustomSelect.namespace();

    return {
      default: ns.concat('-default'),
    };
  }

  static initSelect(node) {
    const activeClass = `${CustomSelect.cssClass}__select--active`;
    const selectMatch = `[${CustomSelect.namespace.concat('-select')}]`;

    const select = new Selectable(
      node.querySelector(selectMatch),
      activeClass,
      CustomSelect.valueAttribute,
    );

    return select;
  }

  static initOptions(node) {
    const optionsMatch = `[${CustomSelect.namespace.concat('-options')}]`;
    const optionNodeList = node.querySelector(optionsMatch).children;
    const defaultAttr = CustomSelect.namespace.concat('-default');

    const optionArray = Array.from(optionNodeList);
    const defaultOptionNode = optionArray.filter(optNode => optNode.hasAttribute(defaultAttr))[0];

    const defaultOption = this.initOption(defaultOptionNode);
    const options = optionArray.map(optNode => this.initOption(optNode));

    return { options, defaultOption };
  }

  static initOption(optionNode) {
    const activeClass = `${CustomSelect.cssClass}__option--active`;
    const option = new Selectable(
      optionNode,
      activeClass,
      CustomSelect.valueAttribute,
    );

    return option;
  }

  static get cssClass() {
    return 'custom-select';
  }

  static get namespace() {
    return 'data-cs'; // custom select
  }

  static get valueAttribute() {
    return CustomSelect.namespace.concat('-value');
  }
}
