import showService from '../api/showService.js';
import { html, render } from '../utils/lib.js';

const dashboardTemplate = (data) => html`<h2>Users Recommendations</h2>
  <section id="shows">
    ${data.length > 0
      ? data.map(showTemplate)
      : html`<h2 id="no-show">No shows Added.</h2>`}
  </section> `;

export default async function dashboardView() {
  try {
    const data = await showService.getAll();
    return render(dashboardTemplate(data));
  } catch (error) {
    return alert(error.message);
  }
}

function showTemplate(el) {
  return html`<div class="show">
    <img src=${el.imageUrl} alt=${el.title} />
    <div class="show-info">
      <h3 class="title">${el.title}</h3>
      <p class="genre">Genre: ${el.genre}</p>
      <p class="country-of-origin">Country of Origin: ${el.country}</p>
      <a class="details-btn" href=${`/dashboard/details/${el._id}`}>Details</a>
    </div>
  </div>`;
}
