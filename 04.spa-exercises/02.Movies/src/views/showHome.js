import { getUserData } from '../utils/userData.js';

const homePage = document.getElementById('home-page');
const movieList = document.getElementById('movies-list');
export function showHome(main, movies) {
  movieList.replaceChildren(...movies.map(movieTemplate));
  main.replaceChildren(homePage);
}

function movieTemplate(movie) {
  const liElement = document.createElement('li');
  liElement.className = 'card mb-4';
  liElement.innerHTML = `<img
                      class="card-img-top"
                      src="${movie.img}"
                      alt="Card image cap"
                      width="400"
                    />
                    <div class="card-body">
                      <h4 class="card-title">${movie.title}</h4>
                      <a href="#"> </a>
                    </div>
                    <div class="card-footer">
                    <button id="${movie._id}" data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
                    </div>`;
  return liElement;
}
