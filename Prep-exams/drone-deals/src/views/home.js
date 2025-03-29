import { html, render } from '../utils/lib.js';

const createView = () => html` <section id="hero">
  <p>
    Discover the best deals on drones! Buy, sell, and trade top-quality drones with
    ease on Drone Deals - your trusted marketplace for all things drone.
  </p>
</section>`;

export default function createPage() {
  return render(createView());
}
