import { render, html } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('menu');
const form = document.querySelector('form');
const itemText = document.getElementById('itemText');
form.addEventListener('submit', addItem);

const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
const data = Object.values(await response.json());

const optionTemplate = (data) =>
  data.map((el) => html`<option value="${el._id}">${el.text}</option>`);

render(optionTemplate(data), root);

async function addItem(e) {
  e.preventDefault();
  await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: itemText.value }),
  });
  const fetchData = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
  const data = Object.values(await fetchData.json());

  form.reset();
  render(optionTemplate(data), root);
}
