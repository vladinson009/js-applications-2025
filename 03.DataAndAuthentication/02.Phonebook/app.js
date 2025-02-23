function attachEvents() {
  const loadBtn = document.getElementById('btnLoad');
  const createBtn = document.getElementById('btnCreate');
  const ulPhonebook = document.getElementById('phonebook');
  const url = 'http://localhost:3030/jsonstore/phonebook';

  loadBtn.addEventListener('click', getContacts);
  createBtn.addEventListener('click', onCreate);
  ulPhonebook.addEventListener('click', onDelete);

  getContacts();

  async function getContacts(ev) {
    ulPhonebook.replaceChildren();

    const response = await fetch(url);

    const data = Object.values(await response.json());

    data.forEach((el) => {
      const li = document.createElement('li');
      const deleteBtn = document.createElement('button');

      li.textContent = `${el.person}: ${el.phone}`;
      deleteBtn.textContent = 'Delete';
      deleteBtn.id = el._id;

      li.appendChild(deleteBtn);
      ulPhonebook.appendChild(li);
    });
  }
  async function onDelete(ev) {
    ev.preventDefault();
    const target = ev.target;

    if (target.tagName == 'BUTTON' && target.textContent == 'Delete') {
      const options = {
        method: 'delete',
      };
      const response = await fetch(url + `/${target.id}`, options);
      const data = await response.json();
      getContacts();
      return data;
    }
  }
  async function onCreate(ev) {
    ev.preventDefault();
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    if (personInput.value == '' || phoneInput.value == '') {
      return;
    }

    const newPerson = {
      person: personInput.value,
      phone: phoneInput.value,
    };
    personInput.value = '';
    phoneInput.value = '';

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPerson),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    getContacts();
    return data;
  }
}
attachEvents();
