import stampsService from '../api/stampsService.js';
import { html, render } from '../utils/lib.js';

const dashboardTemplate = (data) => html`<h2>Collection</h2>
  <section id="collection">
    <!-- Display a div with information about every post (if any)-->

    ${data.length > 0
      ? data.map(stampTemplate)
      : html`<h2 id="no-stamp">No Stamps Added.</h2>`}
    <!-- Display an h2 if there are no posts -->
  </section>`;

export default async function dashboardPage(ctx) {
  try {
    const data = await stampsService.getAll();
    console.log(data);

    render(dashboardTemplate(data));
  } catch (error) {}
}

function stampTemplate(el) {
  return html`<div class="stamp">
    <img src=${el.imageUrl} alt=${el.name} />
    <div class="stamp-info">
      <h3 class="name">${el.name}</h3>
      <p class="year-description">
        Year of oldest stamps - <span class="year">${el.year}</span>
      </p>
      <a class="learn-more-btn" href=${`/details/${el._id}`}>Learn More</a>
    </div>
  </div>`;
}
