import validateTattooData from '../utils/validateTattooData.js';
import fetcher from './fetcher.js';

// return an array of drones
function getAll() {
  return fetcher.get('/data/tattoos?sortBy=_createdOn%20desc');
}
// return single object
function getTattooById(tattooId) {
  return fetcher.get(`/data/tattoos/${tattooId}`);
}
function deleteTattooById(tattooId) {
  return fetcher.del(`/data/tattoos/${tattooId}`);
}

function createTattoo(formData) {
  const objectData = validateTattooData(formData);
  const userType = objectData['user-type'];
  const imageUrl = objectData['image-url'];
  const description = objectData.description;
  const type = objectData.type;
  return fetcher.post('/data/tattoos', { type, imageUrl, description, userType });
}

function editTattoo(tattooId, formData) {
  const objectData = validateTattooData(formData);
  const userType = objectData['user-type'];
  const imageUrl = objectData['image-url'];
  const description = objectData.description;
  const type = objectData.type;
  return fetcher.put(`/data/tattoos/${tattooId}`, {
    type,
    imageUrl,
    description,
    userType,
  });
}

function onLike(tattooId) {
  return fetcher.post(`/data/likes`, { tattooId });
}
function getLikes(tattooId) {
  return fetcher.get(
    `/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`
  );
}
function isLiked(tattooId, userId) {
  return fetcher.get(
    `/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
export default {
  getAll,
  getTattooById,
  createTattoo,
  deleteTattooById,
  editTattoo,
  onLike,
  getLikes,
  isLiked,
};
