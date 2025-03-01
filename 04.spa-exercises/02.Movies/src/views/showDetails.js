import { getLikeFromUser, getLikes, getMovieById } from '../api/movieApi.js';
import { getUserData } from '../utils/userData.js';

const detailsPage = document.getElementById('movie-example');

export async function showDetailsPage(main, movieId) {
  const userData = getUserData();
  const [movie, likesCount, likeFromUser] = await Promise.all([
    getMovieById(movieId),
    getLikes(movieId),
    getLikeFromUser(movieId, userData?._id),
  ]);
  const isOwner = movie._ownerId == userData?._id;
  const isUser = Boolean(userData && !isOwner);
  const isLiked = likeFromUser.length > 0 ? true : false;

  detailsPage.innerHTML = `<div class="container">
            <div class="row bg-light text-dark">
              <h1>Movie title: ${movie.title}</h1>

              <div class="col-md-8">
                <img
                  class="img-thumbnail"
                  src="${movie.img}"
                  alt="Movie"
                />
              </div>
              <div class="col-md-4 text-center">
                <h3 class="my-3">Movie Description</h3>
                <p>${movie.description}</p>
                ${
                  isOwner
                    ? `<a data-id="${movie._id}" class="btn btn-danger" href="#">Delete</a>
                <a data-id="${movie._id}" class="btn btn-warning" href="#">Edit</a>`
                    : isUser && !isLiked
                    ? `<a data-id="${movie._id}" class="btn btn-primary" href="#">Like</a>`
                    : ''
                }
                <span class="enrolled-span">Liked ${likesCount}</span>
              </div>
            </div>
          </div>`;
  main.replaceChildren(detailsPage);
}
