import itemService from '../api/itemService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';

const detailsTemplate = (data, isOwner, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <div>
      <img id="details-img" src=${data.imageUrl} alt=${data.item} />
      <p id="details-title">${data.item}</p>
    </div>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="details-price">Price: €${data.price}</p>
        <p class="details-availability">${data.availability}</p>
        <p class="type">Type: ${data.type}</p>
        <p id="item-description">${data.description}</p>
      </div>
      <!--Edit and Delete are only for creator-->
      ${isOwner
        ? html`<div id="action-buttons">
            <a href=${`/edit/${data._id}`} id="edit-btn">Edit</a>
            <a @click=${onDelete} href=${`/delete/${data._id}`} id="delete-btn"
              >Delete</a
            >
          </div>`
        : null}
    </div>
  </div>
</section>`;

export default async function detailsView(ctx) {
  const { id } = ctx.params;
  const userId = ctx.userData && ctx.userData._id;
  try {
    const data = await itemService.getItemById(id);
    const isOwner = data._ownerId == userId;
    return render(detailsTemplate(data, isOwner, onDelete));
  } catch (error) {
    errorModal(error);
  }

  async function onDelete(e) {
    e.preventDefault();
    const isDelete = confirm('Are you sure?');
    if (isDelete) {
      await itemService.deleteItemById(id);
      ctx.page.redirect('/dashboard');
    }
  }
}
