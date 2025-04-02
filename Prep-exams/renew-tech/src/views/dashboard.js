import techService from '../api/techService.js';
import { html, render } from '../utils/lib.js';

const dashboardTemplate = (data) => html`<h2>Solutions</h2>
  ${data.length > 0
    ? html`<section id="solutions">${data.map(techTemplate)}</section>`
    : html`<h2 id="no-solution">No Solutions Added.</h2>`}`;

export default async function dashboardView(ctx) {
  try {
    const data = await techService.getAll();
    return render(dashboardTemplate(data));
  } catch (error) {
    alert(error.message);
  }
}

function techTemplate(el) {
  return html`<div class="solution">
    <img src=${el.imageUrl} alt=${el.type} />
    <div class="solution-info">
      <h3 class="type">${el.type}</h3>
      <p class="description">${el.description}</p>
      <a class="details-btn" href=${`/details/${el._id}`}>Learn More</a>
    </div>
  </div>`;
}
