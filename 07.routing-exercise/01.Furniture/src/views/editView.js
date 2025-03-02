import { getFurnitureById } from '../api/furnitureApi.js';
import { html } from '../utils/libs.js';

function editView(furniture, onFormSubmit) {
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
      </div>
    </div>
    <form @submit=${onFormSubmit}>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input
              class="form-control"
              id="new-make"
              type="text"
              name="make"
              .value=${furniture.make}
            />
          </div>
          <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input
              class="form-control is-valid"
              id="new-model"
              type="text"
              name="model"
              .value=${furniture.model}
            />
          </div>
          <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input
              class="form-control is-invalid"
              id="new-year"
              type="number"
              name="year"
              .value=${furniture.year}
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-description"
              >Description</label
            >
            <input
              class="form-control"
              id="new-description"
              type="text"
              name="description"
              .value=${furniture.description}
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input
              class="form-control"
              id="new-price"
              type="number"
              name="price"
              .value=${furniture.price}
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input
              class="form-control"
              id="new-image"
              type="text"
              name="img"
              .value=${furniture.img}
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-material"
              >Material (optional)</label
            >
            <input
              class="form-control"
              id="new-material"
              type="text"
              name="material"
              .value=${furniture.material}
            />
          </div>
          <input type="submit" class="btn btn-info" value="Edit" />
        </div>
      </div>
    </form>`;
}

export default async function showEdit(ctx) {
  const { id } = ctx.params;
  const furniture = await getFurnitureById(id);
  ctx.render(editView(furniture, onFormSubmit));

  async function onFormSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
  }
}
