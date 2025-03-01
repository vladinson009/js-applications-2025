import userApi from '../api/userApi.js';
import { setUserData } from '../utils/userData.js';
import { homeView } from './homeView.js';
const main = document.getElementById('main');

const view = document.getElementById('registerView');
const form = view.querySelector('form');

form.addEventListener('submit', onSubmit);
view.remove();

export function registerView(main) {
  main.replaceChildren(view);
}

async function onSubmit(e) {
  e.preventDefault();
  try {
    const data = Object.fromEntries(new FormData(form));
    const user = await userApi.register(data);
    form.reset();
    setUserData(user);
    homeView(main);
  } catch (error) {
    alert(error.message);
  }
}
