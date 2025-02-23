function attachEvents() {
  document.getElementById('btnLoadPosts').addEventListener('click', onFetch);
  document.getElementById('btnViewPost').addEventListener('click', onView);
  const posts = document.getElementById('posts');
  const ul = document.getElementById('post-comments');
  async function onFetch() {
    posts.innerHTML = '';
    const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
    const result = Object.values(await response.json());

    for (const each of result) {
      const option = document.createElement('option');
      option.value = each.id;
      option.textContent = each.title.toUpperCase();
      posts.appendChild(option);
    }
  }
  async function onView() {
    ul.innerHTML = '';
    const postId = document.getElementById('posts').value;

    const [post, comments] = await Promise.all([
      getPostById(postId),
      getComments(postId),
    ]);
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;

    for (const comment of comments) {
      const li = document.createElement('li');
      li.textContent = comment.text;
      ul.appendChild(li);
    }
  }
  async function getPostById(postId) {
    const response = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
    const result = await response.json();

    return result[postId];
  }
  async function getComments(postId) {
    const response = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
    const result = Object.values(await response.json()).filter(
      (e) => e.postId == postId
    );

    return result;
  }
}
attachEvents();
