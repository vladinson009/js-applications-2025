import validateData from '../utils/validateData.js';
import fetcher from './fetcher.js';

// return an array
function getAll() {
  return fetcher.get('/data/stamps?sortBy=_createdOn%20desc');
}
// return single object {}
function getById(id) {
  return fetcher.get(`/data/stamps/${id}`);
}
function deleteById(id) {
  return fetcher.del(`/data/stamps/${id}`);
}

function create(formData) {
  const objectData = validateData(formData);
  return fetcher.post('/data/stamps', objectData);
}

function edit(id, formData) {
  const objectData = validateData(formData);
  return fetcher.put(`/data/stamps/${id}`, objectData);
}
function addLike(stampsId) {
  return fetcher.post('/data/likes', { stampsId });
}
function getTotalLikes(stampsId) {
  return fetcher.get(
    `/data/likes?where=stampsId%3D%22${stampsId}%22&distinct=_ownerId&count`
  );
}
function isLiked(stampsId, userId) {
  return fetcher.get(
    `/data/likes?where=stampsId%3D%22${stampsId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
export default {
  getAll,
  getById,
  create,
  deleteById,
  edit,
  addLike,
  getTotalLikes,
  isLiked,
};
