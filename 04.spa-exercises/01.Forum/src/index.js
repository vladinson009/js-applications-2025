import { createPost, getCommentsById, getPostById } from './api/forumApi.js';
import { showDetails } from './views/showDetails.js';
import { showHome, showTopic } from './views/showHome.js';

const container = document.querySelector('.container');
const main = document.querySelector('main');
const topicContainer = document.querySelector('.topic-container');

const form = document.getElementById('addForm');
const cancelBtn = document.querySelector('.cancel');
const publicBtn = document.querySelector('.public');

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  form.reset();
});
publicBtn.addEventListener('click', onPublic);
topicContainer.addEventListener('click', onDetails);
showHome(topicContainer);

document.querySelector('nav a').addEventListener('click', onHome);
async function onPublic(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const body = {
    title: data.topicName,
    username: data.username,
    content: data.postText,
  };
  const post = await createPost(body);
  topicContainer.appendChild(showTopic(post));
  form.reset();
}
async function onDetails(e) {
  e.preventDefault();
  if (e.target.tagName != 'H2') {
    return;
  }
  const id = e.target.id;
  const [post, comments] = await Promise.all([getPostById(id), getCommentsById(id)]);
  main.style.display = 'none';

  container.appendChild(showDetails(post, comments));
}
function onHome(e) {
  e.preventDefault();
  Array.from(container.children).forEach((c) => {
    c.style.display = 'none';
  });
  main.style.display = 'block';
}
