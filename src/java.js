let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];
let currentHours = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let currentDate = document.querySelector("#current-time");
currentDate.innerHTML = `Today is ${currentDay}, ${currentHours}:${currentMinutes}`;

// Real temperature
function displayWeather(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let realTemperature = document.querySelector("#real-feel");
  realTemperature.innerHTML = `🌡️ Real temperature: ${Math.round(
    response.data.main.feels_like
  )} c°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `💧 Humidity:  ${Math.round(
    response.data.main.humidity
  )} %`;
}

function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-input");
  let apiKey = "0a0e5df8ac15e815913056404c810c25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);
// prueba Far
function searchCityFa(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-input");
  let apiKey = "0a0e5df8ac15e815913056404c810c25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

let changeRealTempF = document.querySelector("#temperature-f");
changeRealTempF.addEventListener("click", searchCityFa);
let changeRealTempC = document.querySelector("#temperature-c");
changeRealTempC.addEventListener("click", searchCity);
