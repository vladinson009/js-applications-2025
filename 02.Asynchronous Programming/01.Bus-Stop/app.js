async function getInfo() {
  const userInput = document.getElementById('stopId');
  const stopName = document.getElementById('stopName');
  const ulBusses = document.getElementById('buses');
  ulBusses.innerHTML = '';
  try {
    const response = await fetch(
      `http://localhost:3030/jsonstore/bus/businfo/${userInput.value}`
    );
    const result = await response.json();

    for (const [busId, time] of Object.entries(result.buses)) {
      const liElement = Object.assign(document.createElement('li'), {
        textContent: `Bus ${busId} arrives in ${time} minutes`,
      });
      stopName.textContent = result.name;

      ulBusses.appendChild(liElement);
    }
  } catch (error) {
    stopName.textContent = 'Error';
  }
}
