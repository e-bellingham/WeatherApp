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

//Challenge Search engine changes location on page:
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
}
function search(event) {
  event.preventDefault();
  let apiKey = "11976d7c9e336e8e53bba53c9faf5b9e";
  let city = document.querySelector("#search-text-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  //let searchInput = document.querySelector("#search-text-input");
  //let h2 = document.querySelector("#current-location");
  // h2.innerHTML = searchInput.value;
  // if (searchInput.value) {
  // h2.innerHTML = searchInput.value;
  // } else {
  // h2.innerHTML = null;
  //  alert("Please type a city...");
  // }
  //Make an Api call to OpenWeather API
  //Once I get the HTTP response, we display the city name and temp
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
