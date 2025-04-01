import validateShowData from '../utils/validateShowData.js';
import fetcher from './fetcher.js';

// return an array of drones
function getAll() {
  return fetcher.get('/data/shows?sortBy=_createdOn%20desc');
}
function getByQuery(query) {
  return fetcher.get(`/data/shows?where=title%20LIKE%20%22${query}%22`);
}
// return single object
function getShowById(showId) {
  return fetcher.get(`/data/shows/${showId}`);
}
function deleteShowById(showId) {
  return fetcher.del(`/data/shows/${showId}`);
}

function createShow(formData) {
  const objectData = validateShowData(formData);
  const title = objectData.title;
  const imageUrl = objectData['image-url'];
  const genre = objectData.genre;
  const country = objectData.country;
  const details = objectData.details;
  return fetcher.post('/data/shows', {
    title,
    imageUrl,
    genre,
    country,
    details,
  });
}

function editShow(showId, formData) {
  const objectData = validateShowData(formData);
  const title = objectData.title;
  const imageUrl = objectData['image-url'];
  const genre = objectData.genre;
  const country = objectData.country;
  const details = objectData.details;
  return fetcher.put(`/data/shows/${showId}`, {
    title,
    imageUrl,
    genre,
    country,
    details,
  });
}

export default {
  getAll,
  getShowById,
  createShow,
  deleteShowById,
  editShow,
  getByQuery,
};
