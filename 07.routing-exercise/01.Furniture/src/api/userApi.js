import { post } from './fetchApi.js';

function register({ email, password, rePass }) {
  if (email == '' || password == '') {
    throw new Error('All fields are required!');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long!');
  }
  if (rePass != password) {
    throw new Error('Passwords does not match!');
  }
  return post('/users/register', { email, password });
}
function login({ email, password }) {
  if (email == '' || password == '') {
    throw new Error('All fields are required!');
  }
  return post('/users/login', { email, password });
}

export default { register, login };
