import { getUserData } from '../utils/userData.js';

function updateNavBar(userData) {
  const userNav = document.querySelector('.user');
  const guestNav = document.querySelector('.guest');

  if (userData) {
    guestNav.style.display = 'none';
    userNav.style.display = 'inline-block';
  } else {
    userNav.style.display = 'none';
    guestNav.style.display = 'inline-block';
  }
}

export default function pageContext(ctx, next) {
  const userData = getUserData();
  ctx.userData = userData;

  updateNavBar(userData);

  next();
}
