import { html, render as litRender } from '/node_modules/lit-html/lit-html.js';
import page from '/node_modules/page/page.mjs';

const root = document.querySelector('.container');

const render = (content) => litRender(content, root);

export { html, render, page };
