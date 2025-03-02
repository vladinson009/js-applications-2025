import { page } from './utils/libs.js';
import { get } from './api/fetchApi.js';
import { clearUserData } from './utils/userData.js';

import pageMiddleware from './middlewares/pageContext.js';
import showCreate from './views/createView.js';
import showDetails from './views/detailsView.js';
import showEdit from './views/editView.js';
import showHome from './views/homeView.js';
import showLogin from './views/loginView.js';
import showMyFurniture from './views/myFurnitureView.js';
import showRegister from './views/registerView.js';

page(pageMiddleware);
page('/', showHome);
page('/dashboard', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/create', showCreate);
page('/profile', showMyFurniture);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page.start();

document.getElementById('logoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  get('/users/logout');
  clearUserData();
  page.redirect('/');
});
