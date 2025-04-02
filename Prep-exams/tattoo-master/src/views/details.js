import tattooService from '../api/tattooService.js';
import { html, render } from '../utils/lib.js';

const detailsTemplate = (
  data,
  onDelete,
  isLogged,
  isOwner,
  onLike,
  likeCount,
  like
) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${data.imageUrl} alt=${data.type} />
    <div>
      <div id="info-wrapper">
        <p id="details-type">${data.type}</p>
        <div id="details-description">
          <p id="user-type">${data.userType}</p>
          <p id="description">${data.description}</p>
        </div>
        <h3>Like tattoo:<span id="like">${likeCount}</span></h3>
        <!--Edit and Delete are only for creator-->
        ${isLogged &&
        html`<div id="action-buttons">
          ${isOwner
            ? html`<a href=${`/edit/${data._id}`} id="edit-btn">Edit</a>
                <a @click=${onDelete} href=${`/delete/${data._id}`} id="delete-btn"
                  >Delete</a
                >`
            : !like
            ? html`<a @click=${onLike} href=${`/like/${data._id}`} id="like-btn"
                >Like</a
              >`
            : null}
        </div>`}
      </div>
    </div>
  </div>
</section>`;

export default async function detailsView(ctx) {
  const { tattooId } = ctx.params;
  const isLogged = ctx.userData && ctx.userData._id;

  try {
    const [data, likeCount, like] = await Promise.all([
      tattooService.getTattooById(tattooId),
      tattooService.getLikes(tattooId),
      tattooService.isLiked(tattooId, isLogged),
    ]);

    const isOwner = isLogged == data._ownerId;
    return render(
      detailsTemplate(data, onDelete, isLogged, isOwner, onLike, likeCount, like)
    );
  } catch (error) {
    alert(error.message);
  }

  async function onDelete(e) {
    e.preventDefault();
    const isDelete = confirm('Are you sure?');
    if (isDelete) {
      await tattooService.deleteTattooById(tattooId);
      ctx.page.redirect('/dashboard');
    }
  }
  async function onLike(e) {
    e.preventDefault();
    await tattooService.onLike(tattooId);
    ctx.page.redirect(`/details/${tattooId}`);
  }
}
