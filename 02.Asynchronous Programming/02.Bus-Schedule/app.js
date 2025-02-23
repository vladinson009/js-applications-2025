function solve() {
  const departBtn = document.getElementById('depart');
  const arriveBtn = document.getElementById('arrive');
  const info = document.querySelector('.info');

  let stop = {
    next: 'depot',
  };

  async function depart() {
    try {
      departBtn.disabled = true;
      arriveBtn.disabled = false;

      const response = await fetch(
        'http://localhost:3030/jsonstore/bus/schedule/' + stop.next
      );
      if (response.status != 200) {
        throw new Error();
      }
      stop = await response.json();
      info.textContent = `Next stop ${stop.name}`;
    } catch (error) {
      info.textContent = 'Error';
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }
  function arrive() {
    departBtn.disabled = false;
    arriveBtn.disabled = true;
    info.textContent = `Arriving at ${stop.name}`;
  }
  return {
    depart,
    arrive,
  };
}
let result = solve();
