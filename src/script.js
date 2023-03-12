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
console.log(updateDate);
