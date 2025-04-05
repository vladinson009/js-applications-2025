import { html, render } from '../utils/lib.js';

const homeTemplate = () => html`<section id="hero">
  <img src="/images/home.png" alt="home" />
  <p>We know who you are, we will contact you</p>
</section>`;

export default function homeView(ctx) {
  return render(homeTemplate());
}
