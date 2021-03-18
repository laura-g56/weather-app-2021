//Change time from AM to PM (format Hours)
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; //hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var ampm = hours + ":" + minutes + " " + ampm;

  return ampm;
}

// Days of the Week
function formatDay(timestamp) {
let now = new Date(timestamp);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[now.getDay()];
}

//Current Date and Timestamp 
let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();

//Show Current Date & Time Information
let dayAndTime = document.querySelector("#dayAndTime");
dayAndTime.innerHTML = `${currentDay} ${currentDate} ${currentMonth} ${currentYear} ${formatAMPM(new Date())}`;

// Custom Icons to replace API standards
function getIcon(icon) {
  let iconElement = "";
  if (icon === "03d" || icon === "03n") {
    iconElement = "images/icons8-clouds-64.png";
  } else if (icon === "04d") {
    iconElement = "images/icons8-clouds-64.png";
  } else if (icon === "04n") {
    iconElement = "images/icons8-clouds-64.png";
  } else if (icon === "01d") {
    iconElement = "images/icons8-sun-50.png";
  } else if (icon === "01n") {
    iconElement = "images/gif/clearnightgif.gif";
  } else if (icon === "02d") {
    iconElement = "images/icons8-partly-cloudy-day-64.png";
  } else if (icon === "02n") {
    iconElement = "images/icons8-partly-cloudy-day-64.png";
  } else if (icon === "09d") {
    iconElement = "images/icons8-rain-64.png";
  } else if (icon === "09n") {
    iconElement = "images/icons8-rain-64.png";
  } else if (icon === "10d") {
    iconElement = "images/icons8-rain-64.png";
  } else if (icon === "10n") {
    iconElement = "images/icons8-rain-64.png";
  } else if (icon === "13d") {
    iconElement = "images/gif/snowgif.gif";
  } else if (icon === "13n") {
    iconElement = "images/gif/snowgif.gif";
  } else if (icon === "50d") {
    iconElement = "images/icons8-haze-50.png";
  } else if (icon === "50n") {
    iconElement = "images/icons8-haze-50.png";
  }
  return iconElement;
}

//Get API Weather Information
function displayWeatherInfo(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name + ", " + response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

 document
    .querySelector("#icon")
    .setAttribute("src", getIcon(response.data.weather[0].icon));

  celsiusTemperature = response.data.main.temp;

  //'One-Call' apiURL
  let apiKey = "c9372dd2ab0fc70c02af13cd16583303";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall";
  let apiUrl = `${apiEndpoint}?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);  // 5 day forecast Min & Max
}

//5 day Forecast
function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `
    <div class="days col-5 col-md-auto text-center">
      <h7>
        ${formatDay(forecast.dt * 1000)}
      </h7>
      <img
        src="${getIcon(forecast.weather[0].icon)}"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.temp.max)}°
        </strong> |
        ${Math.round(forecast.temp.min)}°
      </div>
    </div>
  `;
  }
  //display % rain
  document.querySelector("#precipitation").innerHTML = Math.round(response.data.daily[0].pop * 100);
}


//User-input City search
function searchCity(city) {
  let apiKey = "c9372dd2ab0fc70c02af13cd16583303";
  //let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo); // main temperature

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);  // 5 day forecast temperature
}

//User-input City display
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//Geolocation Coordinates search
function searchLocation(position) {
  let apiKey = "c9372dd2ab0fc70c02af13cd16583303";
  //let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


//Temperature toggle between Celcius/Fahrenheit
function changeToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function changeToC(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


//User Input Button Actions
let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit); //User Search

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation); //Geolocation

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToF); //Temperature in Fahrenheit

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToC); //Temperature in Celsius


searchCity("Geelong"); //Initial City Shown
