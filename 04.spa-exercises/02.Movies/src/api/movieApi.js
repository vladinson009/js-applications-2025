import { del, get, post, put } from './fetchApi.js';

// MOVIES
export async function getAllMovies() {
  return get('/data/movies');
}
export async function getMovieById(movieId) {
  return get('/data/movies/' + movieId);
}
export function createMovie(data, _ownerId) {
  for (let movie in data) {
    if (data[movie] == '') {
      throw new Error('All fields are required!');
    }
  }
  return post('/data/movies', { ...data, _ownerId });
}
export function updateMovie(movieId, data) {
  return put('/data/movies/' + movieId, data);
}
export function deleteMovieById(movieId) {
  return del('/data/movies/' + movieId);
}
export function getLikes(movieId) {
  return get(`/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
}
export function getLikeFromUser(movieId, userId) {
  return get(
    `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
  );
}
export function addLike(movieId, userId) {
  return post('/data/likes', { _ownerId: userId, movieId });
}
export function revokeLike(likeId) {
  return del('/data/likes/' + likeId);
}
