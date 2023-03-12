let currentDate = new Date();
let days = ["Sunday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[currentDate.getDay()];
let time = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let updateDate = `${day} ${time}:${minutes}`;
let dateToday = document.querySelector("#dateToday");
dateToday.innerHTML = updateDate;

function citySearch(event) {
  event.preventDefault();
  let cityChange = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  let cityTemp = cityChange.value;
  h1.innerHTML = cityTemp;

  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=${apiKey}&units=metric`;

  function temperatura(response) {
    event.preventDefault();
    let tempe = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = tempe;
  }
  axios.get(apiUrl).then(temperatura);

  function minTemp(response) {
    let tempemin = Math.round(response.data.main.temp_min);
    let tempmin = document.querySelector("#min");
    tempmin.innerHTML = tempemin;
  }
  axios.get(apiUrl).then(minTemp);

  function maxTemp(response) {
    let tempemax = Math.round(response.data.main.temp_max);
    let tempmax = document.querySelector("#max");
    tempmax.innerHTML = tempemax;
  }
  axios.get(apiUrl).then(maxTemp);

  function windVel(response) {
    let windy = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = windy;
  }
  axios.get(apiUrl).then(windVel);
}

let city = document.querySelector("#search-city");
city.addEventListener("submit", citySearch);

function currentPosition(event) {
  event.preventDefault();

  function yourPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "2bd326a60dc89a53287e446e819664df";
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
