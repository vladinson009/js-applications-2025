import { post } from './fetchApi.js';

function register({ email, password, repeatPassword }) {
  if (email == '' || password == '') {
    throw new Error('All fields are required!');
  }
  if (email.length < 3) {
    throw new Error('Email should be at least 3 characters long!');
  }
  if (password.length < 3) {
    throw new Error('Password must be at least 3 characters long!');
  }
  if (repeatPassword != password) {
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
