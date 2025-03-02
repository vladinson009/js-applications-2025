import { html, render } from './node_modules/lit-html/lit-html.js';
const body = document.body;

(function initialize() {
  const home = html`<button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <form @submit=${onSubmitForm} id="add-form">
      <h3>Add book</h3>
      <label>TITLE</label>
      <input type="text" name="title" placeholder="Title..." />
      <label>AUTHOR</label>
      <input type="text" name="author" placeholder="Author..." />
      <input type="submit" value="Submit" />
    </form>

    <form @submit=${onSaveForm} style="display:none" id="edit-form">
      <input type="hidden" name="_id" />
      <h3>Edit book</h3>
      <label>TITLE</label>
      <input type="text" name="title" placeholder="Title..." />
      <label>AUTHOR</label>
      <input type="text" name="author" placeholder="Author..." />
      <input type="submit" value="Save" />
    </form>`;

  render(home, body);
  document.getElementById('loadBooks').addEventListener('click', fetchBooks);
})();

function trTemplate(book) {
  return html` <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button @click=${onEdit}>Edit</button>
      <button @click=${onDelete}>Delete</button>
    </td>
  </tr>`;

  function onEdit() {
    const forms = document.querySelectorAll('form');
    forms[0].style.display = 'none';
    forms[1].style.display = 'block';
    const [_id, title, author] = forms[1].querySelectorAll('input');
    _id.value = book._id;
    title.value = book.title;
    author.value = book.author;
  }
  async function onDelete(e) {
    await fetch('http://localhost:3030/jsonstore/collections/books/' + book._id, {
      method: 'delete',
    });
    await fetchBooks();
  }
}

async function fetchBooks() {
  const tbody = document.querySelector('tbody');
  const response = await fetch('http://localhost:3030/jsonstore/collections/books');
  const books = Object.values(await response.json());
  render(books.map(trTemplate), tbody);
}

async function onSubmitForm(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.title == '' || data.author == '') {
    return;
  }
  await fetch('http://localhost:3030/jsonstore/collections/books', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  e.target.reset();
  await fetchBooks();
}

async function onSaveForm(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.title == '' || data.author == '') {
    return;
  }
  await fetch('http://localhost:3030/jsonstore/collections/books/' + data._id, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author: data.author, title: data.title }),
  });
  e.target.reset();
  document.querySelectorAll('form').forEach((f) => {
    if (f.style.display == 'none') {
      f.style.display = 'block';
    } else {
      f.style.display = 'none';
    }
  });
  await fetchBooks();
}
