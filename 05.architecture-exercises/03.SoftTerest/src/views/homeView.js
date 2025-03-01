import { updateNavBar } from '../updateNavBar.js';
import { dashboardView } from './dashboardView.js';
const main = document.getElementById('main');
const view = document.getElementById('homeView');
const getStartedBtn = view.querySelector('a');
getStartedBtn.addEventListener('click', onClick);
view.remove();

export function homeView(main) {
  updateNavBar();
  main.replaceChildren(view);
}
function onClick(e) {
  e.preventDefault();
  dashboardView(main);
}
