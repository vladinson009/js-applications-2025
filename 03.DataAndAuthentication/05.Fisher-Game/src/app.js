const main = document.querySelector('main');
const views = document.getElementById('views');
const registerView = document.getElementById('register-view');
const loginView = document.getElementById('login-view');
const homeVIew = document.getElementById('home-view');

const guestNav = document.getElementById('guest');
const userNav = document.getElementById('user');
const navBar = document.querySelectorAll('nav a');

const catches = document.getElementById('catches');
catches.innerHTML = '';

const addBtn = document.querySelector('.add');
addBtn.addEventListener('click', onAddCatch);
main.addEventListener('click', onCatchAction);

navBar[0].addEventListener('click', showHome);
navBar[1].addEventListener('click', onLogout);
navBar[2].addEventListener('click', showLogin);
navBar[3].addEventListener('click', showRegister);
homeVIew.querySelector('.load').addEventListener('click', onLoadCatches);
loginView.querySelector('#login button').addEventListener('click', onLogin);
registerView
  .querySelector('#register > button')
  .addEventListener('click', onRegister);

main.replaceChildren(homeVIew);
updateNav();

function showHome(e) {
  e.preventDefault();

  Array.from(navBar).forEach((el) => {
    el.classList.remove('active');
  });
  e.target.classList.add('active');

  main.replaceChildren(homeVIew);
}
function showLogin(e) {
  e.preventDefault();
  Array.from(navBar).forEach((el) => {
    el.classList.remove('active');
  });
  e.target.classList.add('active');

  main.replaceChildren(loginView);
}
function showRegister(e) {
  e.preventDefault();
  Array.from(navBar).forEach((el) => {
    el.classList.remove('active');
  });
  e.target.classList.add('active');

  main.replaceChildren(registerView);
}
async function onLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target.parentElement);
  const email = formData.get('email');
  const password = formData.get('password');
  if (!email || !password) {
    return;
  }
  const options = {
    method: 'POST',
    'Content-type': 'application/json',
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch('http://localhost:3030/users/login', options);
    if (response.ok != true) {
      const error = await response.json();

      throw new Error(`${error.code} ${error.message}`);
    }
    const result = await response.json();

    sessionStorage.setItem('token', JSON.stringify(result));
    Array.from(navBar).forEach((el) => {
      el.classList.remove('active');
    });
    navBar[0].classList.add('active');
    updateNav();
    main.replaceChildren(homeVIew);
  } catch (error) {
    return alert(error.message);
  }
}
async function onRegister(e) {
  e.preventDefault();
  const formData = new FormData(e.target.parentElement);
  const email = formData.get('email');
  const password = formData.get('password');
  const rePass = formData.get('rePass');
  if (rePass != password) {
    return;
  }
  if (!email || !password || !rePass) {
    return;
  }
  const options = {
    method: 'POST',
    'Content-type': 'application/json',
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch('http://localhost:3030/users/register', options);
    if (response.ok != true) {
      const error = await response.json();

      throw new Error(`${error.code} ${error.message}`);
    }
    const result = await response.json();

    sessionStorage.setItem('token', JSON.stringify(result));
    Array.from(navBar).forEach((el) => {
      el.classList.remove('active');
    });
    navBar[0].classList.add('active');
    updateNav();
    main.replaceChildren(homeVIew);
  } catch (error) {
    return alert(error.message);
  }
}
async function onLogout(e) {
  e.preventDefault();
  Array.from(navBar).forEach((el) => {
    el.classList.remove('active');
  });
  const data = JSON.parse(sessionStorage.getItem('token'));

  const options = {
    method: 'get',
    headers: {
      'X-Authorization': data.accessToken,
    },
  };
  const response = await fetch('http://localhost:3030/users/logout', options);
  const result = await response.text();

  navBar[0].classList.add('active');

  sessionStorage.removeItem('token');
  updateNav();
  main.replaceChildren(homeVIew);
}
async function onLoadCatches(e) {
  catches.innerHTML = '';
  e.preventDefault();
  let token = sessionStorage.getItem('token');
  if (token) {
    token = JSON.parse(token);
  }
  const _id = token?._id;
  const response = await fetch('http://localhost:3030/data/catches');
  const catchesData = await response.json();

  for (const each of catchesData) {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'catch';
    mainDiv.innerHTML = `<label>Angler</label>
              <input type="text" class="angler" value="${each.angler}" />
              <label>Weight</label>
              <input type="text" class="weight" value="${Number(each.weight)}" />
              <label>Species</label>
              <input type="text" class="species" value="${each.species}" />
              <label>Location</label>
              <input type="text" class="location" value="${each.location}" />
              <label>Bait</label>
              <input type="text" class="bait" value="${each.bait}" />
              <label>Capture Time</label>
              <input type="number" class="captureTime" value="${Number(
                each.captureTime
              )}" />
              <button class="update" data-id="${each._id}" ${
      each._ownerId != _id ? 'disabled="true"' : ''
    }">
                Update
              </button>
              <button class="delete" data-id="${each._id}" ${
      each._ownerId != _id ? 'disabled="true"' : ''
    }">
                Delete
              </button>`;

    catches.appendChild(mainDiv);
  }
}
async function onAddCatch(e) {
  e.preventDefault();
  const token = JSON.parse(sessionStorage.getItem('token'));
  const formData = new FormData(e.target.parentElement.parentElement);
  const data = Object.fromEntries(formData);

  for (const el of Object.values(data)) {
    if (el == '') {
      return;
    }
  }
  const options = {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      'X-Authorization': token.accessToken,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('http://localhost:3030/data/catches', options);
  const result = await response.json();
  e.target.parentElement.parentElement.reset();
  onLoadCatches(e);
}
async function onCatchAction(e) {
  e.preventDefault();
  if (e.target.tagName == 'BUTTON') {
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    if (e.target.textContent.trim() == 'Update') {
      const [angler, weight, species, location, bait, captureTime] =
        parent.querySelectorAll('input');
      const options = {
        method: 'put',
        headers: {
          'Content-type': 'application/json',
          'X-Authorization': JSON.parse(sessionStorage.getItem('token')).accessToken,
        },
        body: JSON.stringify({
          angler: angler.value,
          weight: weight.value,
          species: species.value,
          location: location.value,
          bait: bait.value,
          captureTime: captureTime.value,
        }),
      };
      const response = await fetch(
        `http://localhost:3030/data/catches/${id}`,
        options
      );
      await response.json();
      onLoadCatches(e);
    } else if (e.target.textContent.trim() == 'Delete') {
      const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'delete',
        headers: {
          'X-Authorization': JSON.parse(sessionStorage.getItem('token')).accessToken,
        },
      });
      await response.json();
      onLoadCatches(e);
    }
  }
}
function updateNav() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    userNav.style.display = 'none';
    guestNav.style.display = 'inline-block';
    homeVIew.querySelector('#addForm button').disabled = true;
    document.querySelector('.load').disabled = false;
    document.querySelector('nav span').textContent = 'guest';
  } else {
    const data = JSON.parse(token);
    userNav.style.display = 'inline-block';
    guestNav.style.display = 'none';
    homeVIew.querySelector('#addForm button').disabled = false;

    document.querySelector('nav span').textContent = data.email;
  }
}
