import droneService from '../api/droneService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';

const createView = (onCreate) => html` <section id="create">
  <div class="form form-item">
    <h2>Add Drone Offer</h2>
    <form @submit=${onCreate} class="create-form">
      <input type="text" name="model" id="model" placeholder="Drone Model" />
      <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
      <input type="number" name="price" id="price" placeholder="Price" />
      <input type="number" name="weight" id="weight" placeholder="Weight" />
      <input
        type="number"
        name="phone"
        id="phone"
        placeholder="Phone Number for Contact"
      />
      <input type="text" name="condition" id="condition" placeholder="Condition" />
      <textarea
        name="description"
        id="description"
        placeholder="Description"
      ></textarea>
      <button type="submit">Add</button>
    </form>
  </div>
</section>`;

export default function createPage(ctx) {
  async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await droneService.createDrone(formData);
      ctx.page.redirect('/marketplace');
    } catch (error) {
      errorModal(error);
    }
  }

  return render(createView(onCreate));
}
