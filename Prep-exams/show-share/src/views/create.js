import showService from '../api/showService.js';
import { html, render } from '../utils/lib.js';

const createTemplate = (onSubmit) => html`<section id="create">
  <div class="form">
    <h2>Add Show</h2>
    <form @submit=${onSubmit} class="create-form">
      <input type="text" name="title" id="title" placeholder="TV Show title" />
      <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
      <input type="text" name="genre" id="genre" placeholder="Genre" />
      <input type="text" name="country" id="country" placeholder="Country" />
      <textarea
        id="details"
        name="details"
        placeholder="Details"
        rows="2"
        cols="10"
      ></textarea>
      <button type="submit">Add Show</button>
    </form>
  </div>
</section>`;

export default function createView(ctx) {
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const data = await showService.createShow(formData);
      ctx.page.redirect('/dashboard');
    } catch (error) {
      return alert(error.message);
    }
  }

  return render(createTemplate(onSubmit));
}
