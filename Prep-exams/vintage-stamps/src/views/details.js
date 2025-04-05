import stampsService from '../api/stampsService.js';
import { html, render } from '../utils/lib.js';

const detailsTemplate = (
  el,
  onDelete,
  isOwner,
  isUser,
  isLiked,
  totalLikes,
  onLike
) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${el.imageUrl} alt=${el.name} />
    <div>
      <p id="details-name">${el.name}</p>
      <div id="info-wrapper">
        <div id="details-year-description">
          <p id="year-description">
            Year of oldest stamps - <span id="year">${el.year}</span>
          </p>
          <p id="more-info">${el.learnMore}</p>
        </div>
      </div>
      <h3>Stamp total likes:<span id="likes">${totalLikes}</span></h3>

      <!--Edit and Delete are only for creator-->

      ${isUser
        ? html` <div id="action-buttons">
            ${isOwner
              ? html` <a href=${`/edit/${el._id}`} id="edit-btn">Edit</a>
                  <a @click=${onDelete} href=${`/edit/${el._id}`} id="delete-btn"
                    >Delete</a
                  >`
              : isUser && !isLiked
              ? html`<a @click=${onLike} href=${`/like/${el._id}`} id="like-btn"
                  >Like</a
                >`
              : null}
          </div>`
        : null}
    </div>
  </div>
</section>`;

export default async function detailsPage(ctx) {
  const { id } = ctx.params;
  const isUser = ctx.userData && ctx.userData._id;

  try {
    const [data, isLiked, totalLikes] = await Promise.all([
      stampsService.getById(id),
      stampsService.isLiked(id, isUser),
      stampsService.getTotalLikes(id),
    ]);
    const isOwner = isUser == data._ownerId;

    render(
      detailsTemplate(data, onDelete, isOwner, isUser, isLiked, totalLikes, onLike)
    );
  } catch (error) {
    return alert(error.message);
  }

  async function onDelete(e) {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this stamp?');
    if (confirmed) {
      await stampsService.deleteById(id);
      ctx.page.redirect('/dashboard');
    }
  }
  async function onLike(e) {
    e.preventDefault();
    await stampsService.addLike(id);
    ctx.page.redirect(`/details/${id}`);
  }
}
