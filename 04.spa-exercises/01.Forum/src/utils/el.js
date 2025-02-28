export default function el(type, props, children) {
  const element = document.createElement(type);
  if (props) {
    for (const atr in props) {
      if (atr == 'eventListener') {
        for (const eventName in props[atr]) {
          element.addEventListener(eventName, props[atr][eventName]);
        }
      } else if (atr == 'htmlFor') {
        element.setAttribute('for', props[atr]);
      } else {
        element[atr] = props[atr];
      }
    }
  }
  if (children) {
    if (typeof children == 'string') {
      const regex = /<[^>]+>.*?<\/[^>]+>/;
      if (regex.test(children)) {
        element.innerHTML = children;
      } else {
        element.textContent = children;
      }
    } else if (Array.isArray(children)) {
      for (const each of children) {
        element.appendChild(each);
      }
    }
  }
  return element;
}
