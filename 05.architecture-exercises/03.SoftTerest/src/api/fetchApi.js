import { getUserData } from '../utils/userData.js';

const host = 'http://localhost:3030';

async function fetcher(url, method, data) {
  const options = {
    method,
    headers: {},
  };
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  const userData = getUserData();
  if (userData) {
    options.headers['X-Authorization'] = userData.accessToken;
  }
  try {
    const response = await fetch(host + url, options);

    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
}

export function get(url) {
  return fetcher(url, 'get');
}
export function post(url, data) {
  return fetcher(url, 'post', data);
}
export function put(url, data) {
  return fetcher(url, 'put', data);
}
export function del(url) {
  return fetcher(url, 'delete');
}
