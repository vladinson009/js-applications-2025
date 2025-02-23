function attachEvents() {
  document.getElementById('submit').addEventListener('click', onSubmit);

  const conditions = {
    Sunny: '&#x2600;',
    'Partly sunny': '&#x26C5;',
    Overcast: '&#x2601;',
    Rain: '&#x2614;',
    degrees: '&#176;',
  };

  const current = document.getElementById('current');
  const upcoming = document.getElementById('upcoming');

  async function onSubmit(e) {
    e.preventDefault();

    try {
      document.getElementById('forecast').style.display = 'block';
      const input = document.getElementById('location');
      const inputLocation = input.value.toUpperCase().trim();
      input.value = '';
      const response = await fetch(
        'http://localhost:3030/jsonstore/forecaster/locations/'
      );
      if (response.ok == false) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const location = data.filter(
        (el) => el.name.toUpperCase() == inputLocation
      )[0];

      currentCondition(location.code);
      forecast(location.code);
    } catch (error) {
      current.innerHTML = '<div class="label">Error</div>';
      upcoming.innerHTML = '';
      throw new Error(error.message + '!Catched');
    }
    async function currentCondition(code) {
      try {
        current.innerHTML = ` <div class="label">Current conditions</div>`;
        const response = await fetch(
          'http://localhost:3030/jsonstore/forecaster/today/' + code
        );
        if (response.ok == false) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        const forecast = data.forecast;
        const div = document.createElement('div');
        div.className = 'forecasts';
        div.innerHTML = `<span class="condition symbol">${
          conditions[forecast.condition]
        }</span>
<span class="condition">
<span class="forecast-data">${data.name}</span>
<span class="forecast-data">${forecast.low + conditions.degrees}/${
          forecast.high + conditions.degrees
        }</span>
<span class="forecast-data">${forecast.condition}</span>
</span>`;
        current.appendChild(div);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async function forecast(code) {
      try {
        upcoming.innerHTML = ' <div class="label">Three-day forecast</div>';
        const response = await fetch(
          'http://localhost:3030/jsonstore/forecaster/upcoming/' + code
        );
        if (response.ok == false) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        const div = document.createElement('div');
        div.className = 'forecast-info';
        data.forecast.forEach((el) => {
          const span = document.createElement('span');
          span.className = 'upcoming';
          span.innerHTML = `
      <span class="symbol">${conditions[el.condition]}</span>
      <span class="forecast-data">${el.low + conditions.degrees}/${
            el.high + conditions.degrees
          }</span>
      <span class="forecast-data">${el.condition}</span>`;
          div.appendChild(span);
        });
        upcoming.appendChild(div);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
}
attachEvents();
