import userService from './api/userService.js';
import pageContext from './middlewares/contex.js';
import { page } from './utils/lib.js';
import createPage from './views/create.js';

import dashboardPage from './views/dashboard.js';
import detailsPage from './views/details.js';
import homePage from './views/home.js';
import loginPage from './views/login.js';
import registerPage from './views/register.js';

page(pageContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/marketplace', dashboardPage);

page('/marketplace/:droneId/details', detailsPage);

page.start();

document.getElementById('logoutBtn').addEventListener('click', onLogout);
async function onLogout(e) {
  e.preventDefault();
  await userService.logout();
  page.redirect('/');
}
