import droneService from '../api/droneService.js';
import { html, render } from '../utils/lib.js';

const dashboardView = (data) => html`
  <h3 class="heading">Marketplace</h3>
  <section id="dashboard">
    ${data.length > 0 ? data.map(droneTemplate) : noDrones()}
    <!-- Display a div with information about every post (if any)-->
  </section>
  <!-- Display an h2 if there are no posts -->
`;

function noDrones() {
  return html`<h3 class="no-drones">No Drones Available</h3>`;
}
function droneTemplate(drone) {
  return html`<div class="drone">
    <img src=${drone.imageUrl} alt=${drone.model} />
    <h3 class="model">${drone.model}</h3>
    <div class="drone-info">
      <p class="price">Price: €${drone.price}</p>
      <p class="condition">Condition: ${drone.condition}</p>
      <p class="weight">Weight: ${drone.weight}g</p>
    </div>
    <a class="details-btn" href="/marketplace/${drone._id}/details">Details</a>
  </div>`;
}

export default async function dashboardPage() {
  try {
    const data = await droneService.getAllDrones();
    return render(dashboardView(data));
  } catch (error) {
    //TODO error handling
    console.log(error.message);
  }
}
