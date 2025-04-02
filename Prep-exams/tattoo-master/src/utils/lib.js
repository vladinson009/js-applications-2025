import { html, render as litRender } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const main = document.querySelector('main');
const render = (content) => litRender(content, main);

export { html, render, page };
