import { deleteIdeaById, getIdeaById } from '../api/ideasApi.js';
import { getUserData } from '../utils/userData.js';
import { dashboardView } from './dashboardView.js';
const main = document.getElementById('main');
const view = document.getElementById('detailsView');

view.remove();

export async function detailsView(main, ideaId) {
  const idea = await getIdeaById(ideaId);
  detailsTemplate(idea);
  main.replaceChildren(view);
}

function detailsTemplate(e) {
  const userData = getUserData();
  let isAuthor = false;
  if (userData) {
    isAuthor = e._ownerId == userData._id;
  }
  view.innerHTML = `<img class="det-img" src="${e.img}" />
      <div class="desc">
        <h2 class="display-5">${e.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${e.description}</p>
      </div>
      ${
        isAuthor
          ? `<div class="text-center">
        <a class="btn detb" href="">Delete</a>
      </div>`
          : ''
      }
      `;
  view.addEventListener('click', onClick);
  async function onClick(ev) {
    ev.preventDefault();
    if (ev.target.tagName == 'A') {
      await deleteIdeaById(e._id);
      dashboardView(main);
    }
  }
}
