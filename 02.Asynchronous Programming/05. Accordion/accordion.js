window.onload = solution;
function solution() {
  const main = document.getElementById('main');
  main.addEventListener('click', onGetInfo);

  getList();
  async function getList() {
    try {
      const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
      const response = await fetch(url);
      if (response.ok == false) {
        throw new Error(response.status);
      }
      const data = await response.json();

      for (let item of data) {
        const div = document.createElement('div');
        div.className = 'accordion';
        div.innerHTML = ` <div class="head">
                <span>${item.title}</span>
                <button class="button" id="${item._id}">More</button>
            </div>`;
        main.appendChild(div);
      }
    } catch (error) {
      throw error.message;
    }
  }
  async function onGetInfo(ev) {
    try {
      ev.preventDefault();
      const target = ev.target;
      const id = target.id;
      const parent = target.parentElement.parentElement;
      const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;

      if (target.tagName == 'BUTTON' && target.className == 'button') {
        if (target.textContent == 'More') {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(response.status);
          }
          const data = await response.json();
          const div = document.createElement('div');
          div.className = 'extra';
          const p = document.createElement('p');
          p.textContent = data.content;
          div.style.display = 'block';
          target.textContent = 'Less';
          div.appendChild(p);
          parent.appendChild(div);
        } else {
          target.textContent = 'More';
          parent.removeChild(parent.children[1]);
        }
      }
    } catch (error) {
      throw error.message;
    }
  }
}
