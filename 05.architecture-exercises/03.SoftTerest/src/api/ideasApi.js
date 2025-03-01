import { del, get, post, put } from './fetchApi.js';

// MOVIES
export async function getAllIdeas() {
  return get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
}
export async function getIdeaById(ideaId) {
  return get('/data/ideas/' + ideaId);
}
export function createIdea({ title, description, imageURL }, _ownerId) {
  if (title.length < 6) {
    throw new Error('Title must be at least 6 characters long!');
  }
  if (description.length < 10) {
    throw new Error('Description should be at least 10 characters long!');
  }
  if (imageURL.length < 5) {
    throw new Error('Image should be at least 5 characters long!');
  }
  return post('/data/ideas', { title, description, img: imageURL, _ownerId });
}
export function updateIdea(ideaId, data) {
  return put('/data/ideas/' + ideaId, data);
}
export function deleteIdeaById(ideaId) {
  return del('/data/ideas/' + ideaId);
}
