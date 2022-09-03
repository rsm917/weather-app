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
  let locationTemp = document.querySelector("#current-temperature");
  locationTemp.innerHTML = `${Math.round(response.data.main.temp)}°F`;
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
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
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

search("Mobile");
