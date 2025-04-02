import tattooService from '../api/tattooService.js';
import { html, render } from '../utils/lib.js';

const dashboardTemplate = (data) => html`<h2>Collection</h2>
  ${data.length > 0
    ? html`<section id="tattoos">${data.map(tattooTemplate)}</section>`
    : html`<h2 id="no-tattoo">
        Collection is empty, be the first to contribute
      </h2>`} `;

export default async function dashboardView() {
  try {
    const data = await tattooService.getAll();
    return render(dashboardTemplate(data));
  } catch (error) {
    alert(error.message);
  }
}

function tattooTemplate(el) {
  return html`<div class="tattoo">
    <img src=${el.imageUrl} alt=${el.type} />
    <div class="tattoo-info">
      <h3 class="type">${el.type}</h3>
      <span>Uploaded by </span>
      <p class="user-type">${el.userType}</p>
      <a class="details-btn" href=${`/details/${el._id}`}>Learn More</a>
    </div>
  </div>`;
}
