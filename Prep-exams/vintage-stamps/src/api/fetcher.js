import { getUserData } from '../utils/userData.js';

const baseUrl = 'http://localhost:3030';

async function fetcher(method, url, data) {
  const userData = getUserData();
  const options = {
    method,
    headers: {},
  };
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  if (userData) {
    options.headers['X-Authorization'] = userData.token;
  }

  const response = await fetch(baseUrl + url, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  if (response.status == 204) {
    return response;
  }
  return response.json();
}

function get(url) {
  return fetcher('GET', url);
}
function post(url, data) {
  return fetcher('POST', url, data);
}
function put(url, data) {
  return fetcher('PUT', url, data);
}
function del(url) {
  return fetcher('DELETE', url);
}
export default { get, post, put, del };
