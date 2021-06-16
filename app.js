const API_KEY = 'your api key';

const inputText = document.querySelector('input');
const searchBtn = document.querySelector('#searchBtn');
const form = document.querySelector('form');
const weatherContainer = document.querySelector('.container');
const daily = document.querySelector('.daily');
const error = document.querySelector('.error');


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = inputText.value;

  try {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await res.json();
    // console.log(data);
    if (data.cod == 400) {
      // console.log(data.message);
      error.textContent = data.message;
    }

    if (data.cod == 404) {
      // console.log(data.message);
      error.textContent = data.message;
    }

    if (data.cod == 200) {
      error.textContent = '';
      weatherContainer.innerHTML = `<div class="main-card">
            <p>${data.name}, ${data.sys.country}</p>
            <div class="main-head">
              <img src='icons/${data.weather[0].icon}.png'/>
              <h1>${Math.floor(data.main.temp)}<span>&#176;</span>c</h1>
            </div>
            <h3>${data.weather[0].main}</h3>
            <div class="main-details">
              <p>Feels like: ${data.main.feels_like}deg C</p>
              <p>Wind: ${data.wind.speed} km/h</p>
              <p>Visibility: ${data.visibility}m</p>
            </div>
            <div class="main-details">
              <p>Barometer: ${data.main.pressure} mb</p>
              <p>Humidity: ${data.main.humidity}</p>
              <p>Dew point: 24</p>
            </div>
          </div>`;


      // const { lon, lat } = data.coord;
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          if (data) {
            for (let i = 0; i < data.list.length; i += 8) {
              // console.log(data.list[i]);
              const { dt_txt, main, weather } = data.list[i];

              daily.innerHTML += `
                    <div class="daily-card">
                    <h4>${dt_txt.slice(0, 10)}</h4>
                    <img id='daily-img' src='icons/${weather[0].icon}.png' />
                    <h5>${main.temp_max}<span>&#176;</span>c/${main.temp_min}<span>&#176;</span>c</h5>
                    <p>${weather[0].description}</p>
                  </div>            
                    `
              document.querySelector('#fc').innerText = 'Daily';

            }
          }
        })
        .catch(e => console.log(e))
    }

  }
  catch (e) {
    console.log('error is', e);
  }

  inputText.value = '';
  daily.innerHTML = '';
})

