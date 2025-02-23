const messages = document.getElementById('messages');
function attachEvents() {
  const refreshBtn = document.getElementById('refresh');
  refreshBtn.addEventListener('click', getMessages);
  const sendBtn = document.getElementById('submit');
  sendBtn.addEventListener('click', onSend);
  getMessages();
}
attachEvents();

async function getMessages() {
  messages.value = '';
  const url = 'http://localhost:3030/jsonstore/messenger';
  try {
    const response = await fetch(url);
    if (response.ok == false) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const data = Object.values(await response.json());
    const result = data.map((el) => `${el.author}: ${el.content}`);
    messages.value = result.join('\n');
  } catch (err) {
    throw err.message;
  }
}
async function onSend() {
  const url = 'http://localhost:3030/jsonstore/messenger';
  const authorInput = document.querySelector('[name="author"]');
  const contentInput = document.querySelector('[name="content"]');
  const author = authorInput.value;
  const content = contentInput.value;

  contentInput.value = '';
  const data = {
    author,
    content,
  };
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  messages.value += `\n${result.author}: ${result.content}`;
}
//-George: Hello, guys! :))
//+George: Hello, guys! :))
