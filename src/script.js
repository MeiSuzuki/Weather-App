function showWeather(response) {
  console.log(response.data);
  let currentPositionTemp = document.querySelector("#current-temp");
  let description = document.querySelector("#description");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  let humidityPercentage = document.querySelector("#humidity-percentage");
  let windSpeed = document.querySelector("#wind-speed");
  currentPositionTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  humidityPercentage.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed} m/sec`;
}

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let searchResult = document.querySelector("#output-city");

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
  let currentCityName = document.querySelector("#output-city");
  let currentPositionTemp = document.querySelector("#current-temp");
  let currentPositionDescription = document.querySelector("#description");
  let currentPositionMaxTemp = document.querySelector("#max-temp");
  let currentPositionMinTemp = document.querySelector("#min-temp");
  let currentPositionHumidityPercentage = document.querySelector("#humidity-percentage");
  let currentPositionWindSpeed = document.querySelector("#wind-speed");
  
  currentCityName.innerHTML = `${response.data.name}`;
  currentPositionTemp.innerHTML = Math.round(response.data.main.temp);
  currentPositionDescription.innerHTML = response.data.weather[0].description;
  currentPositionMaxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  currentPositionMinTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
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

let now = new Date();
let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let week = weeks[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${week}, ${date} | ${hour}:${minute}`;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
