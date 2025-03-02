import { html } from '../utils/libs.js';
import { deleteFurnitureById, getFurnitureById } from '../api/furnitureApi.js';
function detailsView(furniture, isOwner, onDelete) {
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src="${furniture.img.slice(1)}" />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        ${isOwner
          ? html`<div>
              <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
              <a
                @click=${onDelete}
                href="/delete/${furniture._id}"
                class="btn btn-red"
                >Delete</a
              >
            </div>`
          : null}
      </div>
    </div>`;
}

export default async function showDetails(ctx) {
  const { id } = ctx.params;
  const furniture = await getFurnitureById(id);
  const isOwner = ctx.userData()?._id == furniture._ownerId;

  ctx.render(detailsView(furniture, isOwner, onDelete));

  async function onDelete(e) {
    e.preventDefault();
    try {
      await deleteFurnitureById(id);
      ctx.page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  }
}
