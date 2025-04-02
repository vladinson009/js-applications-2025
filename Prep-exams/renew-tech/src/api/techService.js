import validateTechData from '../utils/validateTechData.js';
import fetcher from './fetcher.js';

// return an array of drones
function getAll() {
  return fetcher.get('/data/solutions?sortBy=_createdOn%20desc');
}
// return single object
function getTechById(id) {
  return fetcher.get(`/data/solutions/${id}`);
}
function deleteTechById(id) {
  return fetcher.del(`/data/solutions/${id}`);
}

function createTech(formData) {
  const objectData = validateTechData(formData);
  const type = objectData.type;
  const imageUrl = objectData['image-url'];
  const description = objectData.description;
  const learnMore = objectData['more-info'];
  return fetcher.post('/data/solutions', { type, imageUrl, description, learnMore });
}

function editTech(id, formData) {
  const objectData = validateTechData(formData);
  const type = objectData.type;
  const imageUrl = objectData['image-url'];
  const description = objectData.description;
  const learnMore = objectData['more-info'];
  return fetcher.put(`/data/solutions/${id}`, {
    type,
    imageUrl,
    description,
    learnMore,
  });
}
function addLike(solutionId) {
  return fetcher.post('/data/likes', { solutionId });
}
function getTotalLikes(solutionId) {
  return fetcher.get(
    `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`
  );
}
function getCurrentLike(solutionId, userId) {
  return fetcher.get(
    `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

export default {
  getAll,
  getTechById,
  createTech,
  deleteTechById,
  editTech,
  addLike,
  getTotalLikes,
  getCurrentLike,
};
