const notif = document.querySelector('.notification');
const icon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temperature-value p');
const desc = document.querySelector('.temperature-description p');
const loc = document.querySelector('.location p');
/*
const weather = {
  temperature : {
    value: 18,
    unit: "celsius"
  },
  description: "few clouds",
  iconName : "fa-sun",
  city: "London",
  country : "GB"
}
*/

const weather = {};

weather.temperature = {
    unit : "celsius"
}


function displayWeather(){
  icon.innerHTML =  `<i class="fas ${iconName}"></i>`;

  temp.innerHTML = `${weather.temperature.value}° <span>C</span>`;

  desc.innerHTML = `weather.description`;

  loc.innerHTML = `${weather.city}, ${weather.country}`;

}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "76cd0c620596a30bea5aecd4dee776f2";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}　else　{
  notif.style.display = "block";
  notif.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//　Set user position
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

// show error xhen there is an issue with geolocation service
function showError(error){
  notif.style.display = "block";
  notif.innerHTML = `<p> ${error.message} </p>`;

}


// getWeather()

function getWeather(latitude, longitude){
  
 let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

 fetch(api)
 .then(function(response){
   let data = response.json();
   return data;
 })
 .then(function(data){
   weather.temperature.value = Math.floor(data.main.temp - KELVIN)
   weather.description = data.weather[0].description;
   weather.iconId = data.weather[0].icon;
   weather.city = data.name;
   weather.country = data.sys.country;
 })
 .then(function(){
   displayWeather();
 })
}

// displayWeather()
function displayWeather(){
  icon.innerHTML = `<img src="icons/${weather.iconId}.png" alt="weather icon">`;
  temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  desc.innerHTML = weather.description;
  loc.innerHTML = `${weather.city}, ${weather.country}`;

}
