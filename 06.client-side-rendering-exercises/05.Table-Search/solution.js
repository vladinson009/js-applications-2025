import { html, render } from './node_modules/lit-html/lit-html.js';

document.querySelector('#searchBtn').addEventListener('click', onClick);
const tbody = document.querySelector('tbody');
const searchField = document.getElementById('searchField');

const personTemplate = (person) => html` <tr>
  <td>${person.firstName} ${person.lastName}</td>
  <td>${person.email}</td>
  <td>${person.course}</td>
</tr>`;

const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
const result = Object.values(await response.json());

const students = result.map(personTemplate);
render(students, tbody);

function onClick(e) {
  e.preventDefault();
  const tr = Array.from(document.querySelectorAll('tr'));
  const regexp = new RegExp(searchField.value, 'i');
  for (const each of tr) {
    if (regexp.test(each.textContent)) {
      each.classList.add('select');
    } else {
      each.classList.remove('select');
    }
  }
  searchField.value = '';
}
