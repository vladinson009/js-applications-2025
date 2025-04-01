import showService from '../api/showService.js';
import { html, render } from '../utils/lib.js';

const editTemplate = (data, onEdit) => html`<section id="edit">
  <div class="form">
    <h2>Edit Show</h2>
    <form @submit=${onEdit} class="edit-form">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="TV Show title"
        .value=${data.title}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${data.imageUrl}
      />
      <input
        type="text"
        name="genre"
        id="genre"
        placeholder="Genre"
        .value=${data.genre}
      />
      <input
        type="text"
        name="country"
        id="country"
        placeholder="Country"
        .value=${data.country}
      />
      <textarea
        id="details"
        name="details"
        placeholder="Details"
        rows="2"
        cols="10"
        .value=${data.details}
      ></textarea>
      <button type="submit">Edit Show</button>
    </form>
  </div>
</section>`;

export default async function editView(ctx) {
  const { showId } = ctx.params;

  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await showService.editShow(showId, formData);
      ctx.page.redirect('/dashboard/details/' + showId);
    } catch (error) {
      return alert(error.message);
    }
  }
  try {
    const show = await showService.getShowById(showId);
    return render(editTemplate(show, onEdit));
  } catch (error) {
    return alert(error.message);
  }
}
