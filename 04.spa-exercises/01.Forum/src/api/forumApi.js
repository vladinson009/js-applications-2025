import { get, post } from './fetchApi.js';

// POSTS
export function createPost(data) {
  return post('/posts', data);
}
export function getPostById(postId) {
  return get('/posts/' + postId);
}
export async function getAllPosts() {
  return Object.values(await get('/posts'));
}
// COMMENTS
export function createComment(data) {
  return post('/comments', data);
}
export async function getCommentsById(postId) {
  const data = Object.values(await get('/comments'));
  return data.filter((el) => el.postId == postId);
}
