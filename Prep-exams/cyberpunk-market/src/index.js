import userService from './api/userService.js';
import pageContext from './middlewares/contex.js';
import { page } from './utils/lib.js';
import { clearUserData } from './utils/userData.js';
import createView from './views/create.js';
import dashboardView from './views/dashboard.js';
import detailsView from './views/details.js';
import editView from './views/edit.js';
import homeView from './views/home.js';
import loginView from './views/login.js';
import registerView from './views/register.js';

page(pageContext);
page('/', homeView);
page('/create', createView);
page('/dashboard', dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page.start();

document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout(e) {
  e.preventDefault();
  userService.logout();
  clearUserData();
  page.redirect('/');
}
