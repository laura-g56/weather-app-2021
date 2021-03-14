//Change time from AM to PM
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

//Current Date and Time 
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
  document.querySelector("#description").innerHTML =response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  
  let icon = document.querySelector("#icon")
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}


//5 day Forecast
// function displayForecast(response) {
//   let forecastElement = document.querySelector("#forecast");
//   forecastElement.innerHTML = null;
//   let forecast = null;

//   for (let index = 0; index < 5; index++) {
//     forecast = response.data.list[index];
//     forecastElement.innerHTML += `
//     <div class="days col-5 col-md-auto text-center">
//       <h7>
        
//       </h7>
//       <img
//         src="http://openweathermap.org/img/wn/${
//           forecast.weather[0].icon
//         }@2x.png"
//       />
//       <div class="weather-forecast-temperature">
//         <strong>
//           ${Math.round(forecast.main.temp_max)}°
//         </strong>
//         ${Math.round(forecast.main.temp_min)}°
//       </div>
//     </div>
//   `;
//   }
// }



//User-input City search
function searchCity(city) {
  let apiKey = "c9372dd2ab0fc70c02af13cd16583303";
  //let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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