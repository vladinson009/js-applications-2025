import validateItemData from '../utils/validateItemData.js';
import fetcher from './fetcher.js';

// return an array of drones
function getAll() {
  return fetcher.get('/data/cyberpunk?sortBy=_createdOn%20desc');
}
// return single object
function getItemById(id) {
  return fetcher.get(`/data/cyberpunk/${id}`);
}
function deleteItemById(id) {
  return fetcher.del(`/data/cyberpunk/${id}`);
}

function createItem(formData) {
  const objectData = validateItemData(formData);
  return fetcher.post('/data/cyberpunk', objectData);
}

function editItem(id, formData) {
  const objectData = validateItemData(formData);
  return fetcher.put(`/data/cyberpunk/${id}`, objectData);
}

export default {
  getAll,
  getItemById,
  createItem,
  deleteItemById,
  editItem,
};
