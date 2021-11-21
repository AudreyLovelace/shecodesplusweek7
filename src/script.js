let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");
let cel = document.querySelector("#cel");
let far = document.querySelector("#far");
let form = document.querySelector("form");
let city = document.querySelector("#city");
let button1 = document.querySelector("#button1");
let button2 = document.querySelector("#button2");
let li2 = document.querySelector("#li2>span");
let li3 = document.querySelector("#li3>span");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function nowDate() {
  date = null;
  date = new Date();
  let weekday = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  h2.innerHTML = `${weekday} ${hour}:${minute}`;
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  if ((temperature < 10) & (temperature > -10)) {
    temperature = `0${temperature}`;
  }
  h3.innerHTML = response.data.weather[0].description;
  h4.innerHTML = temperature;
  h1.innerHTML = response.data.name;
  li2.innerHTML = Math.round(response.data.main.humidity);
  li3.innerHTML = Math.round(response.data.wind.speed);
  function celChange() {
    h4.innerHTML = `${temperature}`;
    cel.classList.add("spanChosed");
    far.classList.remove("spanChosed");
    far.classList.add("spanOrigin");
  }

  function farChange() {
    h4.innerHTML = `${Math.round(temperature * 1.8 + 32)}`;
    far.classList.add("spanChosed");
    cel.classList.remove("spanChosed");
    cel.classList.add("spanOrigin");
  }
  cel.addEventListener("click", celChange);
  far.addEventListener("click", farChange);
}

function searchCity(position) {
  let apiKey = "eb0a1d7541da4e9c4f957db698ea2ffe";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function h1city(event) {
  event.preventDefault();

  if (city.value.trim() === "") {
    h1.innerHTML = `Please enter a valid city name`;
  }
  cel.classList.add("spanChosed");
  far.classList.remove("spanChosed");
  far.classList.add("spanOrigin");
  nowDate();
  searchCity();
}

function retrievePosition(position) {
  let apiKey = "eb0a1d7541da4e9c4f957db698ea2ffe";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url2).then(showWeather);
}

function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  city.value = null;
  cel.classList.add("spanChosed");
  far.classList.remove("spanChosed");
  far.classList.add("spanOrigin");
  nowDate();
}

button1.addEventListener("click", h1city);
button2.addEventListener("click", current);

function current1() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  cel.classList.add("spanChosed");
  far.classList.remove("spanChosed");
  far.classList.add("spanOrigin");
  nowDate();
}
