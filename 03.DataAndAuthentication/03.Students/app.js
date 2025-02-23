const url = 'http://localhost:3030/jsonstore/collections/students';
const submitBtn = document.getElementById('submit');
const results = document.getElementById('results');
const [firstName, lastName, facultyNumber, grade] =
  document.querySelectorAll('.inputs input');

const tbody = document.createElement('tbody');
results.appendChild(tbody);

submitBtn.addEventListener('click', onSubmit);

async function onSubmit(ev) {
  ev.preventDefault();
  if (
    firstName.value == '' ||
    lastName.value == '' ||
    facultyNumber.value == '' ||
    grade.value == '' ||
    isNaN(facultyNumber.value) == true ||
    isNaN(grade.value) == true
  ) {
    return;
  }

  const newBody = {
    firstName: firstName.value,
    lastName: lastName.value,
    facultyNumber: facultyNumber.value,
    grade: grade.value,
  };
  firstName.value = '';
  lastName.value = '';
  facultyNumber.value = '';
  grade.value = '';

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBody),
  };

  const response = await fetch(url, options);
  const newData = await response.json();
  getCollection();
}

async function getCollection() {
  tbody.replaceChildren();
  const response = await fetch(url);
  const data = await response.json();

  Object.values(data).forEach((el) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <th>${el.firstName}</th>
    <th>${el.lastName}</th>
    <th>${el.facultyNumber}</th>
    <th>${el.grade}</th>`;
    tbody.appendChild(tr);
  });
}
getCollection();
