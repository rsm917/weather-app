function formatDate(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthIndex = now.getMonth();
  let month = months[monthIndex];
  let dayNumber = now.getDate();

  return `${day}, ${month} ${dayNumber},  ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let now = new Date();
currentDate.innerHTML = formatDate(now);

function displayWeather(response) {
  let location = document.querySelector("#location");
  location.innerHTML = response.data.name;
  fahrenheitTemp = response.data.main.temp;
  let locationTemp = document.querySelector("#current-temperature");
  locationTemp.innerHTML = `${Math.round(fahrenheitTemp)}`;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}° | `;
  document.querySelector("#current-low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  getForecast(response.data.coord);
  //console.log(response.data);
}

function search(cityInput) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  //let cityInput = document.querySelector("#city-input");
  let apiUrl = `${apiEndpoint} ${cityInput}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}
let cityForm = document.querySelector("#change-city-form");
cityForm.addEventListener("submit", handleSearch);

function getLocation(position) {
  let latitude = position.coord.latitude;
  let longitude = position.coord.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentPosition);

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
            
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                weather-icon
                <div class="weather-forecast-temps">
                  <span class="forecast-temp-high">90°</span
                  ><span class="forecast-temp-low">|86°</span>
                </div>
              </div>
                        
          
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

let fahrenheitTemp = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Mobile");
