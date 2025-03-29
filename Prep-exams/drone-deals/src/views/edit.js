import droneService from '../api/droneService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';

const editView = (drone, onEdit) => html` <section id="edit">
  <div class="form form-item">
    <h2>Edit Offer</h2>
    <form @submit=${onEdit} class="edit-form">
      <input
        type="text"
        name="model"
        id="model"
        placeholder="Drone Model"
        .value=${drone.model}
      />
      <input
        type="text"
        name="imageUrl"
        id="imageUrl"
        placeholder="Image URL"
        .value=${drone.imageUrl}
      />
      <input
        type="number"
        name="price"
        id="price"
        placeholder="Price"
        .value=${drone.price}
      />
      <input
        type="number"
        name="weight"
        id="weight"
        placeholder="Weight"
        .value=${drone.weight}
      />
      <input
        type="number"
        name="phone"
        id="phone"
        placeholder="Phone Number for Contact"
        .value=${drone.phone}
      />
      <input
        type="text"
        name="condition"
        id="condition"
        placeholder="Condition"
        .value=${drone.condition}
      />
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        .value=${drone.description}
      ></textarea>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export default async function editPage(ctx) {
  const { droneId } = ctx.params;

  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await droneService.editDrone(droneId, formData);
      ctx.page.redirect(`/marketplace/${droneId}/details`);
    } catch (error) {
      errorModal(error);
    }
  }
  try {
    const drone = await droneService.getDroneById(droneId);
    return render(editView(drone, onEdit));
  } catch (error) {
    errorModal(error);
  }
}
