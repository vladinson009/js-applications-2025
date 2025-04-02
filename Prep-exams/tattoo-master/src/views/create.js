import tattooService from '../api/tattooService.js';
import { html, render } from '../utils/lib.js';

const createTemplate = (onCreate) => html`<section id="create">
  <div class="form">
    <h2>Add tattoo</h2>
    <form @submit=${onCreate} class="create-form">
      <input type="text" name="type" id="type" placeholder="Tattoo Type" />
      <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="10"
      ></textarea>
      <select id="user-type" name="user-type">
        <option value="" disabled selected>Select your role</option>
        <option value="Tattoo Artist">Tattoo Artist</option>
        <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
        <option value="First Time in Tattoo">First Time in Tattoo</option>
        <option value="Tattoo Collector">Tattoo Collector</option>
      </select>
      <button type="submit">Add tattoo</button>
    </form>
  </div>
</section>`;

export default function createView(ctx) {
  async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = await tattooService.createTattoo(formData);
    ctx.page.redirect('/dashboard');
  }

  return render(createTemplate(onCreate));
}
