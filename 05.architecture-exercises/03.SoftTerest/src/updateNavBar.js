import { getUserData } from './utils/userData.js';

export function updateNavBar() {
  const userData = getUserData();
  const li = Array.from(document.querySelectorAll('nav ul li'));
  if (userData) {
    li.forEach((el) => {
      if (el.classList.contains('user')) {
        el.style.display = 'inline-block';
      } else if (el.classList.contains('guest')) {
        el.style.display = 'none';
      }
    });
  } else {
    li.forEach((el) => {
      if (el.classList.contains('user')) {
        el.style.display = 'none';
      } else if (el.classList.contains('guest')) {
        el.style.display = 'inline-block';
      }
    });
  }
}
