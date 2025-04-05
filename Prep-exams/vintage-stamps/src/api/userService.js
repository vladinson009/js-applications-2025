import { clearUserData } from '../utils/userData.js';
import fetcher from './fetcher.js';

function login(userInput) {
  const email = userInput.get('email').trim();
  const password = userInput.get('password').trim();

  if (!email || !password) {
    throw new Error('All fields are required!');
  }
  return fetcher.post('/users/login', { email, password });
}

function register(userInput) {
  const email = userInput.get('email').trim();
  const password = userInput.get('password').trim();
  const rePass = userInput.get('re-password').trim();

  if (!email || !password) {
    throw new Error('All fields are required!');
  }
  if (password !== rePass) {
    throw new Error("Passwords don't match");
  }
  return fetcher.post('/users/register', { email, password });
}
async function logout() {
  await fetcher.get('/users/logout');
  clearUserData();
}

export default { login, register, logout };
