import { getAllFurniture } from '../api/furnitureApi.js';
import { html } from '../utils/libs.js';

function homeView(elements) {
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
      </div>
    </div>
    <div class="row space-top">${elements.map(furnitureTemplate)}</div>`;
}
export function furnitureTemplate(element) {
  return html`<div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src="${element.img}" />
        <p>${element.description}</p>
        <footer>
          <p>Price: <span>${element.price} $</span></p>
        </footer>
        <div>
          <a href="details/${element._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>`;
}

export default async function showHome(ctx) {
  const furnitures = await getAllFurniture();
  ctx.render(homeView(furnitures));
}
