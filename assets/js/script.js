var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentEl = document.querySelector("#current");
var dailyEl1 = document.querySelector("#day1");
var dailyEl2 = document.querySelector("#day2");
var dailyEl3 = document.querySelector("#day3");
var dailyEl4 = document.querySelector("#day4");
var dailyEl5 = document.querySelector("#day5");

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
 
      var lat = data[0].lat;
      var lon = data[0].lon;
 

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

          var date = moment().format("dddd, MMM Do");


          var currentImage = data.current.weather[0].icon;


          var currentTemp = data.current.temp;
          var currentWind = data.current.wind_speed;
          var currentHumid = data.current.humidity;
          var currentUv = data.current.uvi;

currentEl.innerHTML = `
<p class="h2">${cityName} ${date} <img src="http://openweathermap.org/img/wn/${currentImage}@2x.png"; </p>
<p>Temp: ${currentTemp}</p>
<p>Wind: ${currentWind}</p>
<p>Humidity: ${currentHumid}</p>
<p>UV Index: ${currentUv}</p>

`



          // Day1 of 5 Day Forecast
          var newDate1 = moment().add(1, "day").format("ddd, MMM Do");
          var dailyImageIcon1 = data.daily[0].weather[0].icon;
          var dailyTemp1 = data.daily[0].temp.day;
          var dailyWind1 = data.daily[0].wind_speed;
          var dailyHumid1 = data.daily[0].humidity;

          dailyEl1.innerHTML = `
          <p>${newDate1}</p>
          <img src = "http://openweathermap.org/img/wn/${dailyImageIcon1}.png";>
              <p>Temp: ${dailyTemp1}</p>
          <p>Wind: ${dailyWind1}</p>
          <p>Humidity: ${dailyHumid1}</p>        
          `;

          // Day2 of 5 Day Forecast
          var newDate2 = moment().add(2, "day").format("ddd, MMM Do");
          var dailyImageIcon2 = data.daily[1].weather[0].icon;
          var dailyTemp2 = data.daily[1].temp.day;
          var dailyWind2 = data.daily[1].wind_speed;
          var dailyHumid2 = data.daily[1].humidity;

          dailyEl2.innerHTML = `
          <p>${newDate2}</p>
                    <img src = "http://openweathermap.org/img/wn/${dailyImageIcon2}.png";>
                        <p>Temp: ${dailyTemp2}</p>
                    <p>Wind: ${dailyWind2}</p>
                    <p>Humidity: ${dailyHumid2}</p>        
                    `;

          // Day3 of 5 Day Forecast
          var newDate3 = moment().add(3, "day").format("ddd, MMM Do");
          var dailyImageIcon3 = data.daily[2].weather[0].icon;
          var dailyTemp3 = data.daily[2].temp.day;
          var dailyWind3 = data.daily[2].wind_speed;
          var dailyHumid3 = data.daily[2].humidity;

          dailyEl3.innerHTML = `
          <p>${newDate3}</p>
          <img src = "http://openweathermap.org/img/wn/${dailyImageIcon3}.png";>
              <p>Temp: ${dailyTemp3}</p>
          <p>Wind: ${dailyWind3}</p>
          <p>Humidity: ${dailyHumid3}</p>        
          `;

          // Day4 of 5 Day Forecast
          var newDate4 = moment().add(4, "day").format("ddd, MMM Do");
          var dailyImageIcon4 = data.daily[3].weather[0].icon;
          var dailyTemp4 = data.daily[3].temp.day;
          var dailyWind4 = data.daily[3].wind_speed;
          var dailyHumid4 = data.daily[3].humidity;

          dailyEl4.innerHTML = `
          <p>${newDate4}</p>
                    <img src = "http://openweathermap.org/img/wn/${dailyImageIcon4}.png";>
                        <p>Temp: ${dailyTemp4}</p>
                    <p>Wind: ${dailyWind4}</p>
                    <p>Humidity: ${dailyHumid4}</p>        
                    `;

          // Day5 of 5 Day Forecast
          var newDate5 = moment().add(5, "day").format("ddd, MMM Do");
          var dailyImageIcon5 = data.daily[4].weather[0].icon;
          var dailyTemp5 = data.daily[4].temp.day;
          var dailyWind5 = data.daily[4].wind_speed;
          var dailyHumid5 = data.daily[4].humidity;

          dailyEl5.innerHTML = `
          <p>${newDate5}</p>
          <img src = "http://openweathermap.org/img/wn/${dailyImageIcon5}.png";>
              <p>Temp: ${dailyTemp5}</p>
          <p>Wind: ${dailyWind5}</p>
          <p>Humidity: ${dailyHumid5}</p>        
          `;
        });
    });
};
cityFormEl.addEventListener("submit", formSubmitHandler);
