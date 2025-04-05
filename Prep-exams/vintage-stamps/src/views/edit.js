import stampsService from '../api/stampsService.js';
import { html, render } from '../utils/lib.js';

const editTemplate = (el, onEdit) => html`<section id="edit">
  <div class="form">
    <h2>Edit Post Stamp</h2>
    <form @submit=${onEdit} class="edit-form">
      <input
        type="text"
        name="name-input"
        id="name"
        placeholder="Stamp Name"
        .value=${el.name}
      />
      <input
        type="text"
        name="image-url-input"
        id="image-url"
        placeholder="Image URL"
        .value=${el.imageUrl}
      />
      <input
        type="number"
        id="year-input"
        name="year-input"
        placeholder="Year"
        .value=${el.year}
      />
      <textarea
        id="more-info"
        name="more-info-textarea"
        placeholder="More Info"
        rows="8"
        cols="10"
        .value=${el.learnMore}
      ></textarea>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export default async function editPage(ctx) {
  const { id } = ctx.params;

  try {
    const data = await stampsService.getById(id);

    render(editTemplate(data, onEdit));
  } catch (error) {
    return alert(error.message);
  }
  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await stampsService.edit(id, formData);
      ctx.page.redirect(`/details/${id}`);
    } catch (error) {
      return alert(error.message);
    }
  }
}
