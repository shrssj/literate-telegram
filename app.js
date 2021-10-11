let now = new Date();
let time = document.querySelector("time");
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let todayMinute = now.getMinutes();
if (todayMinute < 10) {
  todayMinute = `0${todayMinute}`;
}
window.onload = function() {
  clock();  
    function clock() {
    var now = new Date();
    var TwentyFourHour = now.getHours();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mid = 'pm';
    if (min < 10) {
      min = "0" + min;
    }
    if (hour > 12) {
      hour = hour - 12;
    }    
    if(hour==0){ 
      hour=12;
    }
    if(TwentyFourHour < 12) {
       mid = 'am';
    }     
  document.getElementById('time').innerHTML =     hour+':'+min+':'+sec +' '+mid ;
    setTimeout(clock, 1000);
    }
}



let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let weekday = document.querySelector("#weekday");

weekday.innerHTML = `${day} - ${month} ${date}, ${year} - `;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value !== "") {
    h1.innerHTML = `${searchInput.value}`;
    let apiKey = "bf54175800a55e59e6c4d6461deeef12";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    h1.innerHTML = `Please enter a city!`;
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  
  let sky = response.data.weather[0].main;
  let skyElement = document.querySelector("#sky");
  skyElement.innerHTML = `Sky: ${sky}`;

  let temperature = Math.round(response.data.main.temp);
  let humid = Math.round(response.data.main.humidity);
  let humidElement = document.querySelector("#humid");
  humidElement.innerHTML = `Humidity: ${humid}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} mph`;

  let h3 = document.querySelector("h2");
  h3.innerHTML = `${temperature}°F`;
}

function displayPosition(position) {
  let apiKey = "bf54175800a55e59e6c4d6461deeef12";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", showLocation);
