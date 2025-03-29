import { html, render } from '../utils/lib.js';

const editView = () => html` <section id="edit">
  <div class="form form-item">
    <h2>Edit Offer</h2>
    <form class="edit-form">
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
      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export default function editPage(ctx) {
  return render(editView());
}
