import techService from '../api/techService.js';
import { html, render } from '../utils/lib.js';

const detailsTemplate = (
  userId,
  isOwner,
  data,
  onLike,
  onDelete,
  likes,
  isLiked
) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${data.imageUrl} alt=${data.type} />
    <div>
      <p id="details-type">${data.type}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">${data.description}</p>
          <p id="more-info">${data.learnMore}</p>
        </div>
      </div>
      <h3>Like Solution:<span id="like">${likes}</span></h3>

      <!--Edit and Delete are only for creator-->
      ${userId
        ? html`<div id="action-buttons">
            ${isOwner
              ? html`<a href=${`/edit/${data._id}`} id="edit-btn">Edit</a>
                  <a @click=${onDelete} href=${`/delete/${data._id}`} id="delete-btn"
                    >Delete</a
                  >`
              : !isLiked
              ? html`<a @click=${onLike} href=${`/like/${data._id}`} id="like-btn">
                  Like
                </a>`
              : null}
          </div>`
        : null}
    </div>
  </div>
</section>`;

export default async function detailsView(ctx) {
  const { id } = ctx.params;
  const userId = ctx.userData && ctx.userData._id;
  try {
    const [tech, likes, isLike] = await Promise.all([
      techService.getTechById(id),
      techService.getTotalLikes(id),
      techService.getCurrentLike(id, userId),
    ]);
    const isOwner = userId && userId == tech._ownerId;
    return render(
      detailsTemplate(userId, isOwner, tech, onLike, onDelete, likes, isLike)
    );
  } catch (error) {
    alert(error.message);
  }

  async function onLike(e) {
    e.preventDefault();
    await techService.addLike(id);
    ctx.page.redirect(`/details/${id}`);
  }
  async function onDelete(e) {
    e.preventDefault();
    const isDelete = confirm('Are you sure?');
    if (isDelete) {
      await techService.deleteTechById(id);
      ctx.page.redirect('/dashboard');
    }
  }
}
