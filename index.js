//Challenge 1

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let day = days[now.getDay()];
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = day;

let minute = now.getMinutes();
let hour = now.getHours();
let timeInput = `${hour}:${minute}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minute} `;

let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let dateInput = `${month} ${date}, ${year}`;
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${month} ${date}, ${year}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.list;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      
     <img src="https://openweathermap.org/img/wn/${
       forecastDay.weather[0].icon
     }@2x.png"
     alt=""
      width="42" />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}° </span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
    </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4aa15e89a630bc5454ae3d46ed22844b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
function displayWeatherCondition(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-wind-direction").innerHTML =
    response.data.wind.deg;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "4aa15e89a630bc5454ae3d46ed22844b";
  let city = document.querySelector("#search-text-input").value;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Temperature Units °C & °F for current temp
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 0.5556);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
