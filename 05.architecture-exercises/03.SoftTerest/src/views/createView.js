import { createIdea } from '../api/ideasApi.js';
import { getUserData } from '../utils/userData.js';
import { dashboardView } from './dashboardView.js';
const main = document.getElementById('main');
const view = document.getElementById('createView');
const form = view.querySelector('form');

form.addEventListener('submit', onSubmit);
view.remove();

export function createView(main) {
  main.replaceChildren(view);
}

async function onSubmit(e) {
  const data = Object.fromEntries(new FormData(form));
  const userData = getUserData();
  if (!userData) {
    return;
  }
  const _ownerId = userData._id;
  e.preventDefault();
  try {
    const idea = await createIdea(data, _ownerId);
    dashboardView(main);
  } catch (error) {
    alert(error.message);
  }
}
