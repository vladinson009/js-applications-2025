import { getMyFurniture } from '../api/furnitureApi.js';
import { html } from '../utils/libs.js';
import { furnitureTemplate } from './homeView.js';

function myFurnitureView(myFurniture) {
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
      </div>
    </div>
    <div class="row space-top">${myFurniture.map(furnitureTemplate)}</div>`;
}

export default function showMyFurniture(ctx) {
  getMyFurniture(ctx.userData()._id)
    .then((data) => ctx.render(myFurnitureView(data)))
    .catch((err) => console.log(err));
}
