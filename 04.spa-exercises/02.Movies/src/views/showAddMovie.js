const addMoviePage = document.getElementById('add-movie');

export function showAddMovie(main) {
  main.replaceChildren(addMoviePage);
}
