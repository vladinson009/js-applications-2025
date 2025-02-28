const host = 'http://localhost:3030/jsonstore/collections/myboard';

async function fetcher(url, method, data) {
  const options = {
    method,
    headers: {},
  };
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
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
    throw error.message;
  }
}

export function get(url) {
  return fetcher(url, 'get');
}
export function post(url, data) {
  return fetcher(url, 'post', data);
}
