import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const root = document.getElementById('towns');
const userInput = document.getElementById('searchText');
const resultDiv = document.getElementById('result');
const button = document.querySelector('button');
button.addEventListener('click', search);

const townsTemplate = (towns) => html`<ul>
  ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`;

render(townsTemplate(towns), root);

function search() {
  let match = 0;
  const input = userInput.value;
  const regexp = new RegExp(input);
  document.querySelectorAll('ul li').forEach((el) => {
    if (regexp.test(el.textContent)) {
      el.classList.add('active');
      match++;
    } else {
      el.classList.remove('active');
    }
  });

  resultDiv.textContent = `${match} matches found`;
}
