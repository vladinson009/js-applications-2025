import { getAllIdeas } from '../api/ideasApi.js';
import { detailsView } from './detailsView.js';

const view = document.getElementById('dashboard-holder');

view.remove();

export async function dashboardView(main) {
  const ideas = (await getAllIdeas()).map(ideaTemplate);
  if (ideas.length < 1) {
    view.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
  } else {
    view.replaceChildren(...ideas);
  }
  main.replaceChildren(view);
}
//
function ideaTemplate(c) {
  const div = document.createElement('div');
  div.className = 'card overflow-hidden current-card details';
  div.style = 'width: 20rem; height: 18rem';
  div.innerHTML = `<div class="card-body">
          <p class="card-text">${c.title}</p>
        </div>
        <img class="card-image" src="${c.img}" />
        <a data-id="${c._id}" class="btn" href="">Details</a>`;
  div.addEventListener('click', onClick);
  async function onClick(e) {
    e.preventDefault();
    if (e.target.tagName != 'A') {
      return;
    }
    detailsView(main, c._id);
  }
  return div;
}
