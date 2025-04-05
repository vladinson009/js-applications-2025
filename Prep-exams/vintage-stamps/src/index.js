import userService from './api/userService.js';
import pageContext from './middlewares/contex.js';
import { page } from './utils/lib.js';
import { clearUserData } from './utils/userData.js';
import createPage from './views/create.js';
import dashboardPage from './views/dashboard.js';
import detailsPage from './views/details.js';
import editPage from './views/edit.js';
import homePage from './views/home.js';
import loginPage from './views/login.js';
import registerPage from './views/register.js';

page(pageContext);
page('/', homePage);
page('/create', createPage);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page.start();

document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout(e) {
  e.preventDefault();
  userService.logout();
  clearUserData();
  page.redirect('/');
}
