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
  let tempe = Math.round(response.data.main.temp);
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

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  city.addEventListener("submit", citySearch.value);
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temperatura);
}

function currentPosition(event) {
  event.preventDefault();

  function yourPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let apiUrlC = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let apiUrlCC = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`;

    function currentCity(response) {
      let cityTempC = response.name;
      let h1C = document.querySelector("#selectedCity");
      h1C.innerHTML = cityTempC;
    }
    axios.get(apiUrlCC).then(currentCity);

    function temperature(response) {
      let currentTemp = Math.round(response.data.main.temp);
      let tempCu = document.querySelector("#temp");
      tempCu.innerHTML = currentTemp;
    }
    axios.get(apiUrlC).then(temperature);

    function minTempC(response) {
      let tempeminC = Math.round(response.data.main.temp_min);
      let tempminC = document.querySelector("#min");
      tempminC.innerHTML = tempeminC;
    }
    axios.get(apiUrlC).then(minTempC);

    function maxTempC(response) {
      let tempemaxC = Math.round(response.data.main.temp_max);
      let tempmaxC = document.querySelector("#max");
      tempmaxC.innerHTML = tempemaxC;
    }
    axios.get(apiUrlC).then(maxTempC);

    function windVelC(response) {
      let windyC = Math.round(response.data.wind.speed);
      let windC = document.querySelector("#wind");
      windC.innerHTML = windyC;
    }
    axios.get(apiUrlC).then(windVelC);
  }
  navigator.geolocation.getCurrentPosition(yourPosition);
}
let currentLoc = document.querySelector("#currentBut");
currentLoc.addEventListener("click", currentPosition);
