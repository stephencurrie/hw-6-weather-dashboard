var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getApi(cityName);
  } else {
    alert("Please enter a city");
  }
};

// This function first gets the city coordinates from the city name

var getApi = function (cityName) {
  var apiKey = "9b4ea01577c111c4a54f8444a8a355d9";

  var requestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&appid=" +
    apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Fetch Response \n-------------");
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat);
      console.log(lon);

    //   This is the api call to get the weather and the 5 day forecast using the lat/lon above
      var requestWeather =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=" +
        apiKey;

      fetch(requestWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("Fetch Response \n-------------");
          console.log(data);
        });
    });
};
cityFormEl.addEventListener("submit", formSubmitHandler);
