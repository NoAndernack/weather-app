"use strict";

var inputButton = document.querySelector(".inputButton");
var inputCity = document.querySelector("#city");
var UNSPLASH_ACCESS_KEY = '2GB3Q5rtkESgtgT08v7GXO7N6iuYb9_92zNz8Nr0s74'; //---------------Recuperation des API-----------------------

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
  var imageUrl, imageContainer, img;
  return regeneratorRuntime.async(function updateCityImage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetchCityImage(cityName));

        case 3:
          imageUrl = _context2.sent;
          imageContainer = document.getElementById("meteoCardPhoto-".concat(cityName));

          if (imageContainer) {
            // Créer l'élément img et appliquer les styles
            img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "Image de ".concat(cityName);
            img.className = 'imgCity';
            img.style.width = '250px';
            img.style.height = '200px';
            img.style.padding = '10px';
            img.style.borderRadius = '10%'; // Ajouter l'image au conteneur

            imageContainer.innerHTML = ''; // Effacer le contenu précédent

            imageContainer.appendChild(img);
          }

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
          url = "https://api.openweathermap.org/data/2.5/forecast?lat=".concat(lat, "&lon=").concat(lon, "&appid=dee8f388d8fc9ba6a29dd1055cffe1a5&units=metric&lang=fr");
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

          if (!(cityData.length > 0)) {
            _context6.next = 12;
            break;
          }

          lon = cityData[0].lon;
          lat = cityData[0].lat;
          _context6.next = 10;
          return regeneratorRuntime.awrap(getMeteoData(lon, lat, cityName));

        case 10:
          _context6.next = 13;
          break;

        case 12:
          console.error("Aucune donnée de ville trouvée");

        case 13:
          _context6.next = 18;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          console.error("Erreur lors de la récupération des données de la ville :", _context6.t0);

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 15]]);
} //---------------création des élément de ma carte-----------------------


function getMeteoData(lon, lat, cityName) {
  var meteoData, meteoCard, meteoCardCity, meteoCardPhoto, days, dayTitles, button;
  return regeneratorRuntime.async(function getMeteoData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetchMeteo(lon, lat));

        case 3:
          meteoData = _context7.sent;
          meteoCard = document.createElement('section');
          meteoCard.className = 'meteoCard';
          meteoCardCity = document.createElement('div');
          meteoCardCity.className = 'meteoCard__city';
          meteoCardCity.innerHTML = "".concat(cityName);
          meteoCardPhoto = document.createElement('div');
          meteoCardPhoto.className = 'meteoCard__photo';
          meteoCardPhoto.id = "meteoCardPhoto-".concat(cityName);
          meteoCardPhoto.style.width = "250px";
          meteoCardPhoto.style.height = "200px";
          meteoCard.appendChild(meteoCardPhoto);
          days = [meteoData.list[0], meteoData.list[8], meteoData.list[16], meteoData.list[24], meteoData.list[32]];
          dayTitles = ['Aujourd\'hui', 'Demain', 'Dans 2 jours', 'Dans 3 jours', 'Dans 4 jours'];
          days.forEach(function (day, index) {
            var dayCard = document.createElement('div');
            dayCard.className = "meteoCard__day".concat(index + 1);
            var title = document.createElement('h1');
            title.className = 'day';
            title.innerHTML = dayTitles[index];
            var humidity = document.createElement("p");
            humidity.innerHTML = "<i class=\"fa-solid fa-droplet\"></i>".concat(day.main.humidity, " % d'humidit\xE9 ");
            var tempElement = document.createElement("p");
            tempElement.innerHTML = "<i class=\"fa-solid fa-temperature-three-quarters\"></i>".concat(day.main.temp, " \xB0C ");
            var weatherElement = document.createElement("p");
            weatherElement.innerHTML = " <i class=\"fa-solid fa-cloud\"></i>".concat(day.weather[0].main, "  ");
            var windElement = document.createElement("p");
            windElement.innerHTML = "<i class=\"fa-solid fa-wind\"></i> ".concat(day.wind.speed, " m/sec ");
            dayCard.appendChild(title);
            dayCard.appendChild(tempElement);
            dayCard.appendChild(weatherElement);
            dayCard.appendChild(windElement);
            dayCard.appendChild(humidity);
            meteoCard.appendChild(dayCard);
          }); //----------Button------

          button = document.createElement("button");
          button.id = "buttonExit";
          meteoCard.appendChild(button);
          button.addEventListener("click", function () {
            meteoCard.remove();
          }); //------------------------

          document.body.appendChild(meteoCard);
          _context7.next = 28;
          break;

        case 25:
          _context7.prev = 25;
          _context7.t0 = _context7["catch"](0);
          console.error("Erreur lors de la récupération des données météorologiques :", _context7.t0);

        case 28:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 25]]);
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