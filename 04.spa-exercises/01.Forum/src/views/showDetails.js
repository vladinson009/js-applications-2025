import { createComment } from '../api/forumApi.js';
import el from '../utils/el.js';

export function showDetails(data, commentsAsChildrenArr = []) {
  console.log(commentsAsChildrenArr);

  const comments = commentsAsChildrenArr.map(showComment);
  const postedOn = el('div', { className: 'header' }, [
    el('img', { src: '/static/profile.png', alt: 'avatar' }),
    el(
      'p',
      {},
      `<span>${data.username}</span> posted on <time>2024-10-10 12:08:28</time>`
    ),
    el('p', { className: 'post-content' }, data.content),
  ]);
  const themeContent = el('div', { className: 'theme-content' }, [
    el('div', { className: 'theme-title' }, [
      el('div', { className: 'theme-name-wrapper' }, [
        el('div', { className: 'theme-name' }, [el('h2', {}, data.title)]),
      ]),
    ]),
    el('div', { className: 'comment' }, [
      postedOn,
      el('div', { className: 'user-comment' }, [...comments]),
    ]),
    el('div', { className: 'answer-comment' }, [
      el('p', {}, '<span>currentUser</span> comment:'),
      el('div', { className: 'answer' }, [
        el('form', { eventListener: { submit: onFormSubmit } }, [
          el('textarea', { name: 'postText', id: 'comment', cols: 30, rows: 10 }),
          el('div', {}, [
            el(
              'label',
              { htmlFor: 'username' },
              'Username <span class="red">*</span>'
            ),
            el('input', { type: 'text', name: 'username', id: 'username' }),
          ]),
          el('button', {}, 'Post'),
        ]),
      ]),
    ]),
  ]);
  return themeContent;

  async function onFormSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const body = {
      text: formData.postText,
      username: formData.username,
      postId: data._id,
    };
    const newComment = await createComment(body);
    e.target.reset();
    document.querySelector('.user-comment').appendChild(showComment(newComment));
  }
}

function showComment(c) {
  const div = el('div', { className: 'topic-name-wrapper' }, [
    el('div', { className: 'topic-name' }, [
      el(
        'p',
        {},
        `<strong>${c.username}</strong> commented on <time>2024-10-10 12:08:28</time>`
      ),
      el('div', { className: 'post-content' }, [el('p', {}, c.text)]),
    ]),
  ]);
  return div;
}
