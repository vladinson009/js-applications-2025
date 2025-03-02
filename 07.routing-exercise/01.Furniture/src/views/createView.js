import { createFurniture } from '../api/furnitureApi.js';
import { html } from '../utils/libs.js';

function createView(onFormSubmit, err) {
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>Create New Furniture</h1>
        ${err?.length > 0
          ? err.map((el) => html`<p style="color:red">${el}</p>`)
          : null}
      </div>
    </div>
    <form @submit=${onFormSubmit}>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input
              class="form-control valid"
              id="new-make"
              type="text"
              name="make"
            />
          </div>
          <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class="form-control" id="new-model" type="text" name="model" />
          </div>
          <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class="form-control" id="new-year" type="number" name="year" />
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
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class="form-control" id="new-price" type="number" name="price" />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class="form-control" id="new-image" type="text" name="img" />
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
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Create" />
        </div>
      </div>
    </form>`;
}
export default function showCreate(ctx) {
  ctx.render(createView(onFormSubmit));

  async function onFormSubmit(e) {
    e.preventDefault();
    const [make, model, year, description, price, img, material] =
      e.target.querySelectorAll('input');

    [make, model, year, description, price, img].forEach((el) => validate(el, true));

    const errorMessages = {};
    try {
      if (make.value.length < 4) {
        validate(make, false);
        errorMessages.make = 'Make must be at least 4 characters long!';
      }
      if (model.value.length < 4) {
        validate(model, false);
        errorMessages.model = 'Model must be at least 4 characters long!';
      }
      if (Number(year.value) < 1950 || Number(year.value) > 2050) {
        validate(year, false);
        errorMessages.year = 'Year must be between 1950 and 2050!';
      }
      if (description.value.length < 11) {
        validate(description, false);
        errorMessages.description =
          'Description must be at least 11 characters long!';
      }
      if (price.value.length < 1) {
        validate(price, false);
        errorMessages.price = 'Price must be positive number!';
      }
      if (!img.value) {
        validate(img, false);
        errorMessages.img = 'URL is required!';
      }

      if (Object.values(errorMessages).length > 0) {
        throw Object.values(errorMessages);
      }

      await createFurniture(
        {
          make: make.value,
          model: model.value,
          year: year.value,
          description: description.value,
          price: price.value,
          img: img.value,
          material: material.value,
        },
        ctx.userData()._id
      );
      ctx.page.redirect('/');
    } catch (error) {
      ctx.render(createView(onFormSubmit, error));
    }
  }
}
function validate(element, valid) {
  if (valid) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
  } else {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
  }
}
