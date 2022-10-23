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
  let realCurrentTemperature = document.querySelector("#currentTemp");
  realCurrentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let realTemperature = document.querySelector("#real-feel");
  realTemperature.innerHTML = `🌡️ Real temperature: ${Math.round(
    response.data.main.feels_like
  )} °`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `💧 Humidity:  ${Math.round(
    response.data.main.humidity
  )} %`;

  // weather icon
  document
    .querySelector("#condition-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  let changeconditionText = document.querySelector("#condition-text");
  changeconditionText.innerHTML = response.data.weather[0].description;
}
// get forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// search city
function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-input");
  let apiKey = "0a0e5df8ac15e815913056404c810c25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

// Location

function userPosition(position) {
  let latitud = position.coords.latitude;
  let longitud = position.coords.longitude;
  let apiKey = "0a0e5df8ac15e815913056404c810c25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function userCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(userPosition);
}

let locationButton = document.querySelector("#get-location");
locationButton.addEventListener("click", userCurrentLocation);

//Change Real temp to F/C

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheitTemperature = (realCurrentTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(realCurrentTemperature);
}

let fahrenheitLink = document.querySelector("#temperature-f");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#temperature-c");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
