import '../css/index.css';

import initCustomSelect from './initCustomSelect.js';
import initMenu from './initMenu.js';
import initModals from './initModals.js';

const app = document.querySelector('#js-app-main');

initCustomSelect();
initMenu();
initModals(app);
