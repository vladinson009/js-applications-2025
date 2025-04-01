import showService from '../api/showService.js';
import { html, render } from '../utils/lib.js';

const searchTemplate = (onSearch, data) => html`<section id="search">
  <div class="form">
    <h2>Search</h2>
    <form @submit=${onSearch} class="search-form">
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4>Results:</h4>
  <div class="search-result">
    ${data && data.length > 0
      ? data.map(matchTemplate)
      : html`<p class="no-result">There is no TV show with this title</p>`}
    <!--If there are matches display a div with information about every show-->
  </div>
</section>`;

export default function searchView() {
  async function onSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search');
    try {
      const data = await showService.getByQuery(search);
      return render(searchTemplate(onSearch, data));
    } catch (error) {
      return alert(error.message);
    }
  }
  return render(searchTemplate(onSearch));
}

function matchTemplate(e) {
  return html`<div class="show">
    <img src=${e.imageUrl} alt=${e.title} />
    <div class="show">
      <h3 class="title">${e.title}</h3>
      <p class="genre">Genre: ${e.genre}</p>
      <p class="country-of-origin">Country of Origin: ${e.country}</p>
      <a class="details-btn" href=${`/dashboard/details/${e._id}`}>Details</a>
    </div>
  </div>`;
}
