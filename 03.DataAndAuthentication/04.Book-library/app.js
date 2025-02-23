const url = 'http://localhost:3030/jsonstore/collections/books';
const tbody = document.querySelector('tbody');
const loadBooksBtn = document.getElementById('loadBooks');
const saveBtn = document.getElementById('save');

const submitForm = document.getElementById('submitForm');
const editForm = document.getElementById('editForm');

const submitBtn = document.getElementById('submit');
const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
const editTitle = document.querySelector('input[name="editTitle"]');
const editAuthor = document.querySelector('input[name="editAuthor"]');
loadBooksBtn.addEventListener('click', onLoad);
submitBtn.addEventListener('click', onSubmit);
tbody.addEventListener('click', onAction);
saveBtn.addEventListener('click', onSave);

async function onLoad(ev) {
  if (ev) {
    ev.preventDefault();
  }
  try {
    tbody.replaceChildren();
    const response = await fetch(url);
    if (response.ok != true) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const data = Object.entries(await response.json());

    data.forEach((el) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
         <td>${el[1].title}</td>
                <td>${el[1].author}</td>
                <td data-id="${el[0]}">
                    <button>Edit</button>
                    <button>Delete</button>
                </td>`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    throw err.message;
  }
}
async function onSubmit(e) {
  try {
    e.preventDefault();

    if (authorInput.value == '' || titleInput.value == '') {
      return alert('All fields are required!');
    }
    const newBody = {
      author: authorInput.value,
      title: titleInput.value,
    };
    authorInput.value = '';
    titleInput.value = '';

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBody),
    };

    const response = await fetch(url, options);
    if (response.ok != true) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const data = response.json();
    onLoad();
    return data;
  } catch (err) {
    throw err.message;
  }
}

async function onAction(ev) {
  ev.preventDefault();
  const target = ev.target;
  const parent = target.parentElement.parentElement;

  const id = target.parentElement.dataset.id;
  const title = parent.children[0].textContent;
  const author = parent.children[1].textContent;
  if (target.tagName == 'BUTTON') {
    if (target.textContent == 'Edit') {
      submitForm.querySelector('h3').textContent = 'Edit FORM';
      submitForm.querySelector('button').textContent = 'Save';
      editForm.style.display = 'block';
      authorInput.value = author;
      authorInput.dataset.id = id;
      titleInput.value = title;
      const booksArray = Array.from(parent.parentElement.querySelectorAll('tr'));

      booksArray.forEach((el) => {
        if (el.children[2].dataset.id == id) {
          el.style.display = 'none';
        } else {
          el.style.display = '';
        }
      });
    } else if (target.textContent == 'Delete') {
      onDelete(id);
    }
  }
}

async function onSave(ev) {
  ev.preventDefault();
  const newBody = {
    author: editAuthor.value,
    title: editTitle.value,
  };
  const options = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBody),
  };
  const response = await fetch(url + '/' + editAuthor.dataset.id, options);
  submitForm.style.display = 'block';
  editForm.style.display = 'none';
  onLoad();
  return (data = await response.json());
}

async function onDelete(id) {
  const options = {
    method: 'delete',
  };
  const response = await fetch(url + '/' + id, options);
  onLoad();
  return await response.json();
}
