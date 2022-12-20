// API Key from openweathermap.org/api_keys
var key = "46f5b7948f56301b7d36b6dc5f891e21";
var city = "New York";

// Current Time and Date
var date = dayjs().format("MMMM, DD YYYY");
var dateTime = dayjs().format("dddd, MMMM DD YYYY, hh:mm.ss");

// City history from search
var citySearch = [];

// Save text value of search via storage/array
$(".search").on("click", function(event){
  event.preventDefault();
  city = $(this).parent(".btnPar").siblings(".textVal").val().trim();
  if (city === "") {
    return;
  };
  citySearch.push(city);

	// set local storage for city's that were searched
  localStorage.setItem("city", JSON.stringify(citySearch));
  getFiveDayForecastEl.empty();
	getHistory();
	getCurrentWeather();
});

// buttons created based on search history
var constHistEl = $(".citySearch");
function getHistory() {
	constHistEl.empty();

	for (var i = 0; i < citySearch.length; i++) {

		// creates a row and button list for the past searched cities
		var rowEl = $("<row>");
		var btnEl = $("<button>").text(`${citySearch[i]}`);

		rowEl.addClass("row histBtnRow");
		btnEl.addClass("btn btn-outline-secondary histBtn");
		btnEl.attr("type", "button");
		btnEl.attr("style", "background-color: black; color: white; opacity: 0.6; border: 2px solid white;");


		constHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}

	//allow buttons to start a search
	$(".histBtn").on("click", function(event) {
		event.preventDefault();
		city = $(this).text();
		getFiveDayForecastEl.empty();
		getCurrentWeather();
	});
};

var cardContent = $(".cardContent");

//weather data to today's card & 5 day forecast
function getCurrentWeather() {

  // API for weather data
  var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
  
  $(cardContent).empty();

	$.ajax({
		url: getUrlCurrent,
		method: "GET",
  }).then(function (response) {
    $(".cardCurrentCityName").text(response.name);
    $(".cardCurrentDate").text(date);

    //icons from openweathermap.org/weather-conditions
		$(".icons").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
	// temp
		var pEl = $("<p>").text(`Temperature: ${response.main.temp} °F`);
		cardContent.append(pEl);
	// wind
		var pElWind = $("<p>").text(`Wind Speed: ${response.wind.speed} Mph`);
		cardContent.append(pElWind);
    // humidity
		var pElHumid = $("<p>").text(`Humidity: ${response.main.humidity} %`);
		cardContent.append(pElHumid);

        var pElPressure = $("<p>").text(`Pressure: ${response.main.pressure}`);
		cardContent.append(pElPressure);
	// lat & long of city searches
    var cityLat = response.coord.lat;
		var cityLon = response.coord.lon;
    
		});
	getFiveDayForecast();
};

var getFiveDayForecastEl = $(".fiveDayForecast");

// 5 day: openweathermap.org/forecast5
function getFiveDayForecast() {
	var getUrlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;

  $.ajax({
		url: getUrlFiveDay,
		method: "GET",
	}).then(function (response) {
		var fiveDay = response.list;
		var weatherCards = [];

  //create array to show data on cards 
  $.each(fiveDay, function (index, value) {
		test = {
			date: value.dt_txt.split(" ")[0],
			time: value.dt_txt.split(" ")[1],
			temp: value.main.temp,
      speed: value.wind.speed,
			icon: value.weather[0].icon,
			humidity: value.main.humidity
		};

	
		if (value.dt_txt.split(" ")[1] === "12:00:00") {
			weatherCards.push(test);
		}
		});  
	
//cards to display on screen
		for (var i = 0; i < weatherCards.length; i++) {

			var divElCard = $("<div>");
			divElCard.attr("class", "card text-white mb-3 cardOne");
			divElCard.attr("style", "max-width: 350px; background-color: rgba(0, 0, 0, 0.567); border-radius: 30px; border: 3px solid white;");
			getFiveDayForecastEl.append(divElCard);

			var divElHeader = $("<div>");
			divElHeader.attr("class", "card-header");
			var m = dayjs(`${weatherCards[i].date}`).format("ddd");
			divElHeader.text(m);
			divElCard.append(divElHeader);

			var divElBody = $("<div>");
			divElBody.attr("class", "card-body");
			divElCard.append(divElBody);

// pull right image icons from source
			var divElIcon = $("<img>");
			divElIcon.attr("class", "icons");
			divElIcon.attr("src", `https://openweathermap.org/img/wn/${weatherCards[i].icon}@2x.png`);
			divElBody.append(divElIcon);

			// display temp, wind speed and humidity on cards
			var pElTemp = $("<p>").text(`Temperature: ${weatherCards[i].temp} °F`);
			divElBody.append(pElTemp);
      var pElWind = $("<p>").text(`Wind Speed: ${weatherCards[i].speed} Mph`);
      divElBody.append(pElWind);
			var pElHumid = $("<p>").text(`Humidity: ${weatherCards[i].humidity} %`);
			divElBody.append(pElHumid);
		}
	});
};

//Default data
function initLoad() {

	var citySearchStore = JSON.parse(localStorage.getItem("city"));

	if (citySearchStore !== null) {
		citySearch = citySearchStore;
	}
	getHistory();
	getCurrentWeather();
};

initLoad();