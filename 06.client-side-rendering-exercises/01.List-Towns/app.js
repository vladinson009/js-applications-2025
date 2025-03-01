import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const btnLoadTowns = document.getElementById('btnLoadTowns');
const userInput = document.getElementById('towns');

btnLoadTowns.addEventListener('click', onClick);

const cityTemplate = (data) => html` <ul>
  ${data.map((e) => html`<li>${e}</li>`)}
</ul>`;
console.log('here');

function onClick(e) {
  e.preventDefault();
  const data = userInput.value.split(', ');
  render(cityTemplate(data), root);
}
