import itemService from '../api/itemService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';

const createTemplate = (onCreate) => html`<section id="create">
  <div class="form form-item">
    <h2>Share Your item</h2>
    <form @submit=${onCreate} class="create-form">
      <input type="text" name="item" id="item" placeholder="Item" />
      <input
        type="text"
        name="imageUrl"
        id="item-image"
        placeholder="Your item Image URL"
      />
      <input type="text" name="price" id="price" placeholder="Price in Euro" />
      <input
        type="text"
        name="availability"
        id="availability"
        placeholder="Availability Information"
      />
      <input type="text" name="type" id="type" placeholder="Item Type" />
      <textarea
        id="description"
        name="description"
        placeholder="More About The Item"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">Add</button>
    </form>
  </div>
</section>`;

export default function createView(ctx) {
  async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await itemService.createItem(formData);
      ctx.page.redirect('/dashboard');
    } catch (error) {
      errorModal(error);
    }
  }
  return render(createTemplate(onCreate));
}
