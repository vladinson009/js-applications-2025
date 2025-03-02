import { render } from '../utils/libs.js';
import { getUserData } from '../utils/userData.js';

const user = document.getElementById('user');
const guest = document.getElementById('guest');

function updateNavBar() {
  const userData = getUserData();
  if (userData) {
    user.style.display = '';
    guest.style.display = 'none';
  } else {
    user.style.display = 'none';
    guest.style.display = '';
  }
}
export default function pageMiddleware(ctx, next) {
  ctx.render = render;
  ctx.userData = getUserData;
  updateNavBar();
  next();
}
