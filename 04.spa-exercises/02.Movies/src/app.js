import { get } from './api/fetchApi.js';
import {
  addLike,
  createMovie,
  deleteMovieById,
  getAllMovies,
  updateMovie,
} from './api/movieApi.js';
import userApi from './api/userApi.js';
import { clearUserData, getUserData, setUserData } from './utils/userData.js';
import { showAddMovie } from './views/showAddMovie.js';
import { showDetailsPage } from './views/showDetails.js';
import { showEditPage } from './views/showEditForm.js';
import { showHome } from './views/showHome.js';
import { showLogin } from './views/showLogin.js';
import { showRegister } from './views/showRegister.js';
const main = document.querySelector('#main');
document.querySelector('nav').addEventListener('click', onNav);
main.addEventListener('click', onMain);

await onMovies();

const navigation = {
  Movies: onMovies,
  Logout: onLogout,
  Login: onLogin,
  Register: onRegister,
};
const mainSection = {
  'Add Movie': addMovie,
  Details: onDetails,
  Login: onLoginForm,
  Register: onRegisterForm,
  Submit: onAddMovieForm,
  Edit: onEditForm,
  Like: onLikeButton,
  Delete: onDelete,
  onEditButton,
};
// ! event handlers
async function onNav(e) {
  e.preventDefault();
  if (typeof navigation[e.target.textContent] == 'function') {
    await navigation[e.target.textContent]();
  }
}
async function onMain(e) {
  e.preventDefault();
  if (typeof mainSection[e.target.textContent.trim()] == 'function') {
    if (e.target.id == 'addBtn') {
      await mainSection['Submit'](e);
    } else if (e.target.id == 'editBtn') {
      await mainSection['onEditButton'](e);
    } else if (e.target.id == 'movie') {
      await mainSection['Details'](e);
    } else {
      await mainSection[e.target.textContent](e);
    }
  }
}
// ! on NAVIGATION
async function onMovies() {
  const movies = await getAllMovies();
  showHome(main, movies);
  updateNavBar();
}
async function onLogout() {
  get('/users/logout');
  clearUserData();
  await onMovies();
}
function onLogin() {
  showLogin(main);
}
function onRegister() {
  showRegister(main);
}
// ! on BODY
function addMovie() {
  showAddMovie(main);
}
async function onDetails(e) {
  await showDetailsPage(main, e.currentTarget.dataset.id);
}
async function onLoginForm(e) {
  try {
    const data = Object.fromEntries(new FormData(e.target.parentElement));
    const user = await userApi.login(data);
    setUserData(user);
    await onMovies();
  } catch (error) {
    alert(error.message);
  }
}
async function onRegisterForm(e) {
  try {
    const data = Object.fromEntries(new FormData(e.target.parentElement));
    const user = await userApi.register(data);
    setUserData(user);
    await onMovies();
  } catch (error) {
    alert(error.message);
  }
}
async function onAddMovieForm(e) {
  try {
    const data = Object.fromEntries(new FormData(e.target.parentElement));

    await createMovie(data, getUserData()._id);
    await onMovies();
  } catch (error) {
    alert(error.message);
  }
}
function onEditForm(e) {
  showEditPage(main, e.target.dataset.id);
}
async function onLikeButton(e) {
  const userId = getUserData()?._id;
  const movieId = e.target.dataset.id;
  await addLike(movieId, userId);
  onDetails(e);
}
async function onEditButton(e) {
  try {
    const data = Object.fromEntries(new FormData(e.target.parentElement));

    await updateMovie(e.target.dataset.id, data);
    await showDetailsPage(main, e.target.dataset.id);
  } catch (error) {
    alert(error.message);
  }
}
async function onDelete(e) {
  await deleteMovieById(e.target.dataset.id);
  await onMovies();
}
// ! update NAVIGATION BAR USER/GUEST
function updateNavBar() {
  const navLi = Array.from(document.querySelectorAll('nav li'));
  const addMovieBtn = document.getElementById('add-movie-button');
  const userData = getUserData();
  if (userData) {
    addMovieBtn.style.display = 'inline-block';
    document.getElementById(
      'welcome-msg'
    ).textContent = `Welcome, ${userData.email}`;
    navLi.forEach((el) => {
      if (el.classList.contains('guest')) {
        el.style.display = 'none';
      } else {
        el.style.display = 'inline-block';
      }
    });
  } else {
    addMovieBtn.style.display = 'none';
    navLi.forEach((el) => {
      if (el.classList.contains('guest')) {
        el.style.display = 'inline-block';
      } else {
        el.style.display = 'none';
      }
    });
  }
}
