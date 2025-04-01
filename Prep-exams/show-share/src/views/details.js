import showService from '../api/showService.js';
import { html, render } from '../utils/lib.js';

const detailsTemplate = (el, isOwner, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${el.imageUrl} alt=${el.title} />
    <div id="details-text">
      <p id="details-title">${el.title}</p>
      <div id="info-wrapper">
        <div id="description">
          <p id="details-description">${el.details}</p>
        </div>
      </div>

      <!--Edit and Delete are only for creator-->
      ${isOwner &&
      html`<div id="action-buttons">
        <a href=${`/edit/${el._id}`} id="edit-btn">Edit</a>
        <a @click=${onDelete} href=${`/delete/${el._id}`} id="delete-btn">Delete</a>
      </div>`}
    </div>
  </div>
</section>`;

export default async function detailsView(ctx) {
  const { showId } = ctx.params;

  async function onDelete(e) {
    e.preventDefault();
    const isDelete = confirm('Are you sure you want to delete this show?');
    if (isDelete) {
      await showService.deleteShowById(showId);
      ctx.page.redirect('/dashboard');
    }
  }
  try {
    const show = await showService.getShowById(showId);
    const isOwner = ctx.userData && ctx.userData._id == show._ownerId;

    return render(detailsTemplate(show, isOwner, onDelete));
  } catch (error) {
    return alert(error.message);
  }
}
