import itemService from '../api/itemService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';

const dashboardTemplate = (data) => html`<h3 class="heading">Market</h3>
  ${data.length > 0
    ? html`<section id="dashboard">${data.map(itemTemplate)}</section>`
    : html`<h3 class="empty">No Items Yet</h3>`} `;

export default async function dashboardView(ctx) {
  try {
    const data = await itemService.getAll();
    return render(dashboardTemplate(data));
  } catch (error) {
    errorModal(error);
  }
}

function itemTemplate(el) {
  return html`<div class="item">
    <img src=${el.imageUrl} alt=${el.item} />
    <h3 class="model">${el.item}</h3>
    <div class="item-info">
      <p class="price">Price: €${el.price}</p>
      <p class="availability">${el.availability}</p>
      <p class="type">Type: ${el.type}</p>
    </div>
    <a class="details-btn" href=${`/details/${el._id}`}>Uncover More</a>
  </div>`;
}
