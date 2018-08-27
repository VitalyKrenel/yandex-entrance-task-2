import Menu from './menu.js';

const toggleNode = document.querySelector('.js-menu-toggle');
const menuNode = document.querySelector('.js-menu-container');

const menu = new Menu(toggleNode, menuNode, {
  containerActiveClass: 'app__nav-container--open',
});

function toggleMenu(e) {
  menu.toggle();
  e.stopPropagation();
  return false;
}

function hideMenu() {
  if (menu.isActive()) {
    menu.hide();
  }

  return false;
}

export default function initMenu() {
  menu.onClick = toggleMenu;
  menu.onOuterClick = hideMenu;
}
