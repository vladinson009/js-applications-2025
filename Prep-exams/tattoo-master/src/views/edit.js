import tattooService from '../api/tattooService.js';
import { html, render } from '../utils/lib.js';

const editTemplate = (data, onEdit) => html`<section id="edit">
  <div class="form">
    <h2>Edit tattoo</h2>
    <form @submit=${onEdit} class="edit-form">
      <input
        type="text"
        name="type"
        id="type"
        placeholder="Tattoo Type"
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
      <select id="user-type" name="user-type" .value=${data.userType}>
        <option value="" disabled>Select your role</option>
        <option value="Tattoo Artist">Tattoo Artist</option>
        <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
        <option value="First Time in Tattoo">First Time in Tattoo</option>
        <option value="Tattoo Collector">Tattoo Collector</option>
      </select>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export default async function editView(ctx) {
  const { tattooId } = ctx.params;
  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await tattooService.editTattoo(tattooId, formData);
    ctx.page.redirect(`/details/${tattooId}`);
  }
  try {
    const data = await tattooService.getTattooById(tattooId);
    return render(editTemplate(data, onEdit));
  } catch (error) {
    alert(error.message);
  }
}
