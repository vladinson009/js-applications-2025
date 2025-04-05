import itemService from '../api/itemService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';

const editTemplate = (data, onEdit) => html`<section id="edit">
  <div class="form form-item">
    <h2>Edit Your Item</h2>
    <form @submit=${onEdit} class="edit-form">
      <input
        type="text"
        name="item"
        id="item"
        placeholder="Item"
        .value=${data.item}
      />
      <input
        type="text"
        name="imageUrl"
        id="item-image"
        placeholder="Your item Image URL"
        .value=${data.imageUrl}
      />
      <input
        type="text"
        name="price"
        id="price"
        placeholder="Price in Euro"
        .value=${data.price}
      />
      <input
        type="text"
        name="availability"
        id="availability"
        placeholder="Availability Information"
        .value=${data.availability}
      />
      <input
        type="text"
        name="type"
        id="type"
        placeholder="Item Type"
        .value=${data.type}
      />
      <textarea
        id="description"
        name="description"
        placeholder="More About The Item"
        rows="10"
        cols="50"
        .value=${data.description}
      ></textarea>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export default async function editView(ctx) {
  const { id } = ctx.params;

  try {
    const data = await itemService.getItemById(id);

    return render(editTemplate(data, onEdit));
  } catch (error) {
    errorModal(error);
  }

  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await itemService.editItem(id, formData);
      ctx.page.redirect(`/details/${id}`);
    } catch (error) {
      errorModal(error);
    }
  }
}
