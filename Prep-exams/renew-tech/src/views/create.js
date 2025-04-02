import techService from '../api/techService.js';
import { html, render } from '../utils/lib.js';

const createTemplate = (onCreate) => html`<section id="create">
  <div class="form">
    <img class="border" src="./images/border.png" alt="" />
    <h2>Add Solution</h2>
    <form @submit=${onCreate} class="create-form">
      <input type="text" name="type" id="type" placeholder="Solution Type" />
      <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="10"
      ></textarea>
      <textarea
        id="more-info"
        name="more-info"
        placeholder="more Info"
        rows="2"
        cols="10"
      ></textarea>
      <button type="submit">Add Solution</button>
    </form>
  </div>
</section>`;

export default function createView(ctx) {
  async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await techService.createTech(formData);
      ctx.page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }

  return render(createTemplate(onCreate));
}
