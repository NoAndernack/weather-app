"use strict";

var inputButton = document.querySelector(".inputButton");
var inputCity = document.querySelector("#city");
var UNSPLASH_ACCESS_KEY = '2GB3Q5rtkESgtgT08v7GXO7N6iuYb9_92zNz8Nr0s74';

function fetchCityImage(cityName) {
  var url, response, data;
  return regeneratorRuntime.async(function fetchCityImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "https://api.unsplash.com/search/photos?query=".concat(cityName, "&client_id=").concat(UNSPLASH_ACCESS_KEY);
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          return _context.abrupt("return", data.results[0].urls.regular);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function updateCityImage(cityName) {
  var imageUrl, imageContainer;
  return regeneratorRuntime.async(function updateCityImage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetchCityImage(cityName));

        case 3:
          imageUrl = _context2.sent;
          imageContainer = document.querySelector(".meteoCard__une__photo");
          imageContainer.innerHTML = "<img src=\"".concat(imageUrl, "\" alt=\"Image de ").concat(cityName, "\" class=\"imgCity\">");
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("Erreur lors de la récupération de l'image de la ville :", _context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

var fetchPhoto = function fetchPhoto() {
  var url, response;
  return regeneratorRuntime.async(function fetchPhoto$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          url = "https://api.unsplash.com/photos?client_id=2GB3Q5rtkESgtgT08v7GXO7N6iuYb9_92zNz8Nr0s74";
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.json);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var fetchCity = function fetchCity(cityName) {
  var url, response;
  return regeneratorRuntime.async(function fetchCity$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = "http://api.openweathermap.org/geo/1.0/direct?q=".concat(cityName, "&appid=dee8f388d8fc9ba6a29dd1055cffe1a5");
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.json());

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var fetchMeteo = function fetchMeteo(lon, lat) {
  var url, response;
  return regeneratorRuntime.async(function fetchMeteo$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          url = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=dee8f388d8fc9ba6a29dd1055cffe1a5&units=metric&lang=fr");
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", response.json());

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

function getCityData(cityName) {
  var cityData, lon, lat;
  return regeneratorRuntime.async(function getCityData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetchCity(cityName));

        case 3:
          cityData = _context6.sent;
          console.log(cityData);
          lon = cityData[0].lon;
          lat = cityData[0].lat;
          _context6.next = 9;
          return regeneratorRuntime.awrap(getMeteoData(lon, lat));

        case 9:
          _context6.next = 14;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.error("Erreur lors de la récupération des données de la ville :", _context6.t0);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getMeteoData(lon, lat) {
  var meteoData, meteoCard, deg, sunny;
  return regeneratorRuntime.async(function getMeteoData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetchMeteo(lon, lat));

        case 3:
          meteoData = _context7.sent;
          console.log(meteoData);
          meteoCard = document.querySelector(".meteoCard__une__météo");
          meteoCard.innerHTML = '';
          deg = document.createElement("p");
          sunny = document.createElement("p");
          deg.textContent = "".concat(meteoData.main.temp, " \xB0C");
          sunny.textContent = "".concat(meteoData.weather[0].description, " ");
          meteoCard.appendChild(deg);
          meteoCard.appendChild(sunny);
          _context7.next = 18;
          break;

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          console.error("Erreur lors de la récupération des données météorologiques :", _context7.t0);

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

inputButton.addEventListener('click', function _callee(event) {
  var cityName;
  return regeneratorRuntime.async(function _callee$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          event.preventDefault();
          cityName = inputCity.value;
          _context8.next = 4;
          return regeneratorRuntime.awrap(getCityData(cityName));

        case 4:
          _context8.next = 6;
          return regeneratorRuntime.awrap(updateCityImage(cityName));

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});