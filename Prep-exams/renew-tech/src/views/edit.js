import techService from '../api/techService.js';
import { html, render } from '../utils/lib.js';

const editTemplate = (data, onSubmit) => html`<section id="edit">
  <div class="form">
    <img class="border" src=${data.imageUrl} alt=${data.type} />
    <h2>Edit Solution</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input
        type="text"
        name="type"
        id="type"
        placeholder="Solution Type"
        .value=${data.type}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${data.imageUrl}
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="10"
        .value=${data.description}
      ></textarea>
      <textarea
        id="more-info"
        name="more-info"
        placeholder="more Info"
        rows="2"
        cols="10"
        .value=${data.learnMore}
      ></textarea>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export default async function editView(ctx) {
  const { id } = ctx.params;
  try {
    const data = await techService.getTechById(id);

    return render(editTemplate(data, onSubmit));
  } catch (error) {
    return alert(error.message);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await techService.editTech(id, formData);
    ctx.page.redirect(`/details/${id}`);
  }
}
