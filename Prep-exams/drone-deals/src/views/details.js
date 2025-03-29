import droneService from '../api/droneService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';

const detailsView = (drone, isOwner, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <div>
      <img id="details-img" src=${drone.imageUrl} alt=${drone.model} />
      <p id="details-model">${drone.model}</p>
    </div>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="details-price">Price: €${drone.price}</p>
        <p class="details-condition">Condition: ${drone.condition}</p>
        <p class="details-weight">Weight: ${drone.weight}g</p>
        <p class="drone-description">${drone.description}</p>
        <p class="phone-number">Phone: ${drone.phone}</p>
      </div>
      <!--Edit and Delete are only for creator-->
      ${isOwner &&
      html`
        <div class="buttons">
          <a href=${`/marketplace/${drone._id}/edit`} id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>
      `}
    </div>
  </div>
</section>`;

export default async function detailsPage(ctx) {
  const droneId = ctx.params.droneId;

  async function onDelete() {
    const isConfirmed = confirm('Are you sure you want to delete');

    if (isConfirmed) {
      await droneService.deleteDroneById(droneId);
      ctx.page.redirect('/marketplace');
    }
  }

  try {
    const drone = await droneService.getDroneById(droneId);
    const isOwner = ctx.userData && ctx.userData._id == drone._ownerId;
    return render(detailsView(drone, isOwner, onDelete));
  } catch (error) {
    errorModal(error);
  }
}
