import { getMovieById } from '../api/movieApi.js';

const editPage = document.getElementById('edit-movie');

export async function showEditPage(main, movieId) {
  const movie = await getMovieById(movieId);
  editPage.innerHTML = `<form class="text-center border border-light p-5" action="#" method="">
            <h1>Edit Movie</h1>
            <div class="form-group">
              <label for="title">Movie Title</label>
              <input
                id="title"
                type="text"
                class="form-control"
                placeholder="Movie Title"
                value="${movie.title}"
                name="title"
              />
            </div>
            <div class="form-group">
              <label for="description">Movie Description</label>
              <input
                class="form-control"
                placeholder="Movie Description..."
                value="${movie.description}"
                name="description"
                id="description"
              />
            </div>
            <div class="form-group">
              <label for="imageUrl">Image url</label>
              <input
                id="imageUrl"
                type="text"
                class="form-control"
                placeholder="Image Url"
                value="${movie.img}"
                name="img"
              />
            </div>
            <button id="editBtn" data-id="${movie._id}" type="submit" class="btn btn-primary">Submit</button>
          </form>`;
  main.replaceChildren(editPage);
}
