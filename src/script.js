//AM to PM
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

//Date and Time 
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

//Get API Information
function displayWeatherInfo(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

//User-input City search
function searchCity(city) {
  let apiKey = "c9372dd2ab0fc70c02af13cd16583303";
  //let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
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

//User Input Button Actions
let search = document.querySelector("#search");
search.addEventListener("submit", handleSubmit); //User Search

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation); //Geolocation

searchCity("Geelong"); //Initial City Shown

//Temperature toggle between Celcius/Fahrenheit
function changeToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round(((temperature * 9) / 5) + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToF);


function changeToC(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", changeToC);


