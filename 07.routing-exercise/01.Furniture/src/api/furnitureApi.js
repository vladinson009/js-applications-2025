import { del, get, post, put } from './fetchApi.js';

// Furniture
export function getAllFurniture() {
  return get('/data/catalog');
}
export function getFurnitureById(furnitureId) {
  return get('/data/catalog/' + furnitureId);
}
export function createFurniture(data, _ownerId) {
  for (let field in data) {
    if (data[field] == '') {
      throw new Error('All fields are required!');
    }
  }
  return post('/data/catalog', { ...data, _ownerId });
}
export function updateFurnitureById(furnitureId, data) {
  return put('/data/catalog/' + furnitureId, data);
}
export function deleteFurnitureById(furnitureId) {
  return del('/data/catalog/' + furnitureId);
}
export function getMyFurniture(userId) {
  return get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}
