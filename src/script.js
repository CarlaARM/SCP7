function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let time = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${time}:${minutes}`;
}

function temperatura(response) {
  centTemp = response.data.main.temp;

  let tempe = Math.round(centTemp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = tempe;

  let cityChange = document.querySelector("#selectedCity");
  cityChange.innerHTML = response.data.name;

  let dateToday = document.querySelector("#dateToday");
  dateToday.innerHTML = formatDate(response.data.dt * 1000);

  let weatherDescrip = response.data.weather[0].description;
  let descripWeather = document.querySelector("#weather");
  descripWeather.innerHTML = weatherDescrip;

  let imageIcon = document.querySelector("#icon");
  imageIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imageIcon.setAttribute("alt", response.data.weather[0].description);

  let tempemin = Math.round(response.data.main.temp_min);
  let tempmin = document.querySelector("#min");
  tempmin.innerHTML = tempemin;

  let tempemax = Math.round(response.data.main.temp_max);
  let tempmax = document.querySelector("#max");
  tempmax.innerHTML = tempemax;

  let windy = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windy;
}

function searchCity(citySearch) {
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temperatura);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  searchCity(city.value);
}

let cityS = document.querySelector("#search-city");
cityS.addEventListener("submit", citySearch);

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheiTemp = (centTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheiTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(centTemp);
}

let centTemp = null;

let fahrenheit = document.querySelector("#fahren");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

let celsius = document.querySelector("#cent");
celsius.addEventListener("click", displayCelsiusTemp);
