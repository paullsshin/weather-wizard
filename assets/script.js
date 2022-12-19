var timeEl = document.getElementById("time");
var dateEl = document.getElementById("date");
var currentWeatherItemsEl = document.getElementById("current-weather-items");
var timeZone = document.getElementById("time-zone");
var countryEl = document.getElementById("country");
var weatherForecastEl = document.getElementById("weather-forecast");
var currentTempEl = document.getElementById("current-temp");

var days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var API_KEY = "46f5b7948f56301b7d36b6dc5f891e21";

setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var hoursIn12HrFormat = hour >=13 ? hour %12: hour
    var minutes = time.getMinutes();
    var ampm = hour >=12 ? "PM" : "AM"

    timeEl.innerHTML = hoursIn12HrFormat + ":" + minutes + ":" + `<spanspan id="am-pm">PM</spanspan>`

    dateEl.innerHTML = days[day] + ", " + date + " " + months[month]
}, 1000);

getWeatherData();

function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        var {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`)
        // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data)
    })
})}

function showWeatherData(data) {
    
}