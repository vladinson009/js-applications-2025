const main = document.getElementById('main');
const nav = document.querySelector('nav');
import { get } from './api/fetchApi.js';
import { updateNavBar } from './updateNavBar.js';
import { clearUserData, getUserData } from './utils/userData.js';
import { createView } from './views/createView.js';
import { dashboardView } from './views/dashboardView.js';
import { detailsView } from './views/detailsView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';

nav.addEventListener('click', onNav);
document
  .querySelector('.navbar-brand')
  .addEventListener('click', () => homeView(main));

homeView(main);
function onNav(e) {
  const navigate = {
    Register: () => registerView(main),
    Login: () => loginView(main),
    Logout: async () => {
      get('/users/logout');
      clearUserData();
      homeView(main);
    },
    Create: () => createView(main),
    Dashboard: () => dashboardView(main),
  };
  e.preventDefault();
  const clickText = e.target.textContent.trim();
  if (typeof navigate[clickText] == 'function') {
    navigate[clickText](e);
  }
}
