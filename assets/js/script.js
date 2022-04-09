var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityNameEl = document.querySelector("#cityname");
var currentDateEl = document.querySelector("#date");
var currentWeatherImageEl = document.querySelector("#currentweatherimage");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidEl = document.querySelector("#humid");
var uvEl = document.querySelector("#uv");

var dailyEl = document.querySelector("#day1");

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
      // console.log("Fetch Response \n-------------");
      // console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      // console.log(lat);
      // console.log(lon);

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
          cityNameEl.textContent = cityName;
          var date = moment().format("dddd, MMM Do YYYY");
          currentDateEl.textContent = date;

          var currentImage = data.current.weather[0].icon;
          // var currentImageUrl = "http://openweathermap.org/img/wn/" + currentImage + "@2x.png";
          var insertImg = document.createElement("img");
          insertImg.src =
            "http://openweathermap.org/img/wn/" + currentImage + "@2x.png";
          currentWeatherImageEl.append(insertImg);

          var currentTemp = data.current.temp;
          var currentWind = data.current.wind_speed;
          var currentHumid = data.current.humidity;
          var currentUv = data.current.uvi;

          tempEl.textContent = currentTemp;
          windEl.textContent = currentWind;
          humidEl.textContent = currentHumid;
          uvEl.textContent = currentUv;
          var dailyImageIcon = data.daily[0].weather[0].icon;
          var dailyTemp = data.daily[0].temp.day;
          var dailyWind = data.daily[0].wind_speed;
          var dailyHumid = data.daily[0].humidity;
          console.log(dailyImageIcon);

          dailyEl.innerHTML = `
          <img src = "http://openweathermap.org/img/wn/${dailyImageIcon}.png";>
              <p>Temp: ${dailyTemp}</p>
          <p>Wind: ${dailyWind}</p>
          <p>Humidity: ${dailyHumid}</p>        
          `;
          // tempEl.textContent = currentTemp;
          // windEl.textContent = currentWind;
          // humidEl.textContent = currentHumid;
          // uvEl.textContent = currentUv;
        });
    });
};
cityFormEl.addEventListener("submit", formSubmitHandler);
