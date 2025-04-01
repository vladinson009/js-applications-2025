import { page } from './utils/lib.js';

import pageContext from './middlewares/contex.js';
import createView from './views/create.js';
import dashboardView from './views/dashboard.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import homeView from './views/home.js';
import loginView from './views/login.js';
import registerView from './views/register.js';
import searchView from './views/search.js';
import userService from './api/userService.js';
import { clearUserData } from './utils/userData.js';

page(pageContext);
page('/', homeView);
page('/create', createView);
page('/dashboard', dashboardView);
page('/dashboard/details/:showId', detailsView);
page('/edit/:showId', editView);
page('/login', loginView);
page('/register', registerView);
page('/search', searchView);
page.start();

document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout(e) {
  e.preventDefault();
  userService.logout();
  clearUserData();
  page.redirect('/');
}
