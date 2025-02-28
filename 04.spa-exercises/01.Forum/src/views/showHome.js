import el from '../utils/el.js';
import { getAllPosts } from '../api/forumApi.js';

export async function showHome(topicContainer) {
  topicContainer.replaceChildren();
  const topics = await getAllPosts();
  topics.map((el) => {
    topicContainer.appendChild(showTopic(el));
  });
}
export function showTopic(data) {
  const topicNameWrapper = el('div', { className: 'topic-name-wrapper' }, [
    el('div', { className: 'topic-name' }, [
      el('a', { href: '#', className: 'normal' }, [
        el('h2', { id: data._id }, data.title),
      ]),
      el('div', { className: 'columns' }, [
        el('div', {}, [
          el('p', {}, `Date: <time>2024-10-10T12:08:28.451Z</time>`),
          el('div', { className: 'nick-name' }, [
            el('p', {}, `Username: <span>${data.username}</span>`),
          ]),
        ]),
      ]),
    ]),
  ]);
  return topicNameWrapper;
}
