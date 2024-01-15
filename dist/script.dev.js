"use strict";

var inputButton = document.querySelector(".inputButton");
var inputCity = document.querySelector("#city");

var fetchCity = function fetchCity(cityName) {
  var url, response;
  return regeneratorRuntime.async(function fetchCity$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "http://api.openweathermap.org/geo/1.0/direct?q=".concat(cityName, "&appid=dee8f388d8fc9ba6a29dd1055cffe1a5");
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.json());

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var fetchMeteo = function fetchMeteo(lon, lat) {
  var url, response;
  return regeneratorRuntime.async(function fetchMeteo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          url = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=dee8f388d8fc9ba6a29dd1055cffe1a5&units=metric&lang=fr");
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.json());

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

function getCityData(cityName) {
  var cityData, lon, lat;
  return regeneratorRuntime.async(function getCityData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetchCity(cityName));

        case 3:
          cityData = _context3.sent;
          console.log(cityData);
          lon = cityData[0].lon;
          lat = cityData[0].lat;
          _context3.next = 9;
          return regeneratorRuntime.awrap(getMeteoData(lon, lat));

        case 9:
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error("Erreur lors de la récupération des données de la ville :", _context3.t0);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getMeteoData(lon, lat) {
  var meteoData, meteoCard, deg, sunny;
  return regeneratorRuntime.async(function getMeteoData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetchMeteo(lon, lat));

        case 3:
          meteoData = _context4.sent;
          console.log(meteoData);
          meteoCard = document.querySelector(".meteoCard__une__météo");
          meteoCard.innerHTML = '';
          deg = document.createElement("p");
          sunny = document.createElement("p");
          deg.textContent = "".concat(meteoData.main.temp, " \xB0C");
          sunny.textContent = "".concat(meteoData.weather[0].description, " ");
          meteoCard.appendChild(deg);
          meteoCard.appendChild(sunny);
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.error("Erreur lors de la récupération des données météorologiques :", _context4.t0);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

inputButton.addEventListener('click', function (event) {
  event.preventDefault();
  var cityName = inputCity.value;
  var meteoCardVilleUne = document.querySelector(".meteoCard__une__ville");
  meteoCardVilleUne.textContent = cityName;
  getCityData(cityName);
});