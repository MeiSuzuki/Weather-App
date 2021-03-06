function showForecast() {
  let forecast = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `<div class="col-2 forecast">
        <div class="dayOfWeek">Tue</div>
        <img
          src="images/sunnyCloud.svg"
          alt="Mostly Sunny"
          class="forecastIcon"
        />
        <br />
        <small>
          27°/ <span class="forecast-min-temp">20°</span>
        </small>
      </div>
    `;
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showWeather(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#current-temp");
  let description = document.querySelector("#description");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  let humidityPercentage = document.querySelector("#humidity-percentage");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#weather-icon");

  showForecast();

  celsiusTemperature = response.data.main.temp;
  celsiusMax = response.data.main.temp_max;
  celsiusMin = response.data.main.temp_min;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  humidityPercentage.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed} m/sec`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let searchResult = document.querySelector("#search-result");

  let unit = "metric";
  let apiKey = "03b3d0558bec00e5c48e2704eb345cbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);

  if (inputCity.value) {
    searchResult.innerHTML = `${inputCity.value}`;
  } else {
    searchResult.innerHTML = null;
    alert(`Please enter a city`);
  }
}

function showCurrentLocationWeather(response) {
  console.log(response.data);
  let currentCityName = document.querySelector("#search-result");
  let currentPositionTemp = document.querySelector("#current-temp");
  let currentPositionDescription = document.querySelector("#description");
  let currentPositionMaxTemp = document.querySelector("#max-temp");
  let currentPositionMinTemp = document.querySelector("#min-temp");
  let currentPositionHumidityPercentage = document.querySelector(
    "#humidity-percentage"
  );
  let currentPositionWindSpeed = document.querySelector("#wind-speed");

  celsiusTemperature = response.data.main.temp;
  celsiusMax = response.data.main.temp_max;
  celsiusMin = response.data.main.temp_min;

  currentCityName.innerHTML = `${response.data.name}`;
  currentPositionTemp.innerHTML = Math.round(response.data.main.temp);
  currentPositionDescription.innerHTML = response.data.weather[0].description;
  currentPositionMaxTemp.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  currentPositionMinTemp.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  currentPositionHumidityPercentage.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  currentPositionWindSpeed.innerHTML = `Wind: ${response.data.wind.speed} m/sec`;
}

function showCurrentLocation(position) {
  console.log(position);
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "03b3d0558bec00e5c48e2704eb345cbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentLocationWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function convertToF(event) {
  event.preventDefault();
  let fTemp = (celsiusTemperature * 9) / 5 + 32;
  let fMaxTemp = (celsiusMax * 9) / 5 + 32;
  fMaxTemp = Math.round(fMaxTemp);
  let fMinTemp = (celsiusMin * 9) / 5 + 32;
  fMinTemp = Math.round(fMinTemp);
  let currentTemp = document.querySelector("#current-temp");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  cConverter.classList.remove("deactive");
  fConverter.classList.add("deactive");
  currentTemp.innerHTML = Math.round(fTemp);
  maxTemp.innerHTML = `${fMaxTemp}°`;
  minTemp.innerHTML = `${fMinTemp}°`;
}

function convertToC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  cConverter.classList.add("deactive");
  fConverter.classList.remove("deactive");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  maxTemp.innerHTML = `${Math.round(celsiusMax)}°`;
  minTemp.innerHTML = `${Math.round(celsiusMin)}°`;
}

let now = new Date();
let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let week = weeks[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${week}, ${date} | ${hour}:${minute}`;

let celsiusTemperature = null;
let celsiusMax = null;
let celsiusMin = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let fConverter = document.querySelector("#fahrenheit-temp-unit");
fConverter.addEventListener("click", convertToF);

let cConverter = document.querySelector("#celsius-temp-unit");
cConverter.addEventListener("click", convertToC);
