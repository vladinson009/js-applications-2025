import stampsService from '../api/stampsService.js';
import { html, render } from '../utils/lib.js';

const createTemplate = (onCreate) => html`<section id="create">
  <div class="form">
    <h2>Add Post Stamp</h2>
    <form @submit=${onCreate} class="create-form">
      <input
        type="text"
        name="name-input"
        id="name-input"
        placeholder="Stamp Name"
      />
      <input
        type="text"
        name="image-url-input"
        id="image-url-input"
        placeholder="Image URL"
      />
      <input type="number" id="year-input" name="year-input" placeholder="year" />
      <textarea
        id="more-info-textarea"
        name="more-info-textarea"
        placeholder="More Info"
        rows="8"
        cols="10"
      ></textarea>
      <button type="submit">Add Stamp</button>
    </form>
  </div>
</section>`;

export default function createPage(ctx) {
  async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await stampsService.create(formData);
      ctx.page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }

  render(createTemplate(onCreate));
}
