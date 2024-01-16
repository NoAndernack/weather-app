const inputButton = document.querySelector(".inputButton");
const inputCity = document.querySelector("#city");
const UNSPLASH_ACCESS_KEY = '2GB3Q5rtkESgtgT08v7GXO7N6iuYb9_92zNz8Nr0s74';
//---------------Recuperation des API-----------------------
async function fetchCityImage(cityName) {
    const url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].urls.regular;
}
async function updateCityImage(cityName) {
    try {
        const imageUrl = await fetchCityImage(cityName);
        const imageContainer = document.getElementById(`meteoCardPhoto-${cityName}`);

        if (imageContainer) {
            // Créer l'élément img et appliquer les styles
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Image de ${cityName}`;
            img.className = 'imgCity';
            img.style.width = '250px';
            img.style.height = '200px';
            img.style.padding = '10px';
            img.style.borderRadius = '10%';

            // Ajouter l'image au conteneur
            imageContainer.innerHTML = ''; // Effacer le contenu précédent
            imageContainer.appendChild(img);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'image de la ville :", error);
    }
}
const fetchPhoto = async () => {
    const url = "https://api.unsplash.com/photos?client_id=2GB3Q5rtkESgtgT08v7GXO7N6iuYb9_92zNz8Nr0s74"
    const response = await fetch(url);
    return response.json
}

const fetchCity = async (cityName) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=dee8f388d8fc9ba6a29dd1055cffe1a5`;
    const response = await fetch(url);
    return response.json();
}

const fetchMeteo = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=dee8f388d8fc9ba6a29dd1055cffe1a5&units=metric&lang=fr`;
    const response = await fetch(url);
    return response.json();
}

async function getCityData(cityName) {
    try {
        const cityData = await fetchCity(cityName);
        console.log(cityData);

        if (cityData.length > 0) {
            const lon = cityData[0].lon;
            const lat = cityData[0].lat;
            await getMeteoData(lon, lat, cityName);
        } else {
            console.error("Aucune donnée de ville trouvée");
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des données de la ville :", error);
    }
}

//---------------création des élément de ma carte-----------------------
async function getMeteoData(lon, lat, cityName) {
    try {


        const meteoData = await fetchMeteo(lon, lat);

        const meteoCard = document.createElement('section');
        meteoCard.className = 'meteoCard';


        const meteoCardCity = document.createElement('div');
        meteoCardCity.className = 'meteoCard__city';
        meteoCardCity.innerHTML = `${cityName}`

        const meteoCardPhoto = document.createElement('div');
        meteoCardPhoto.className = 'meteoCard__photo';
        meteoCardPhoto.id = `meteoCardPhoto-${cityName}`;


        meteoCardPhoto.style.width = "250px";
        meteoCardPhoto.style.height = "200px";

        meteoCard.appendChild(meteoCardPhoto);

        const days = [meteoData.list[0], meteoData.list[8], meteoData.list[16], meteoData.list[24], meteoData.list[32]];
        const dayTitles = ['Aujourd\'hui', 'Demain', 'Dans 2 jours', 'Dans 3 jours', 'Dans 4 jours'];

        days.forEach((day, index) => {

            const dayCard = document.createElement('div');
            dayCard.className = `meteoCard__day${index + 1}`;

            const title = document.createElement('h1');
            title.className = 'day';
            title.innerHTML = dayTitles[index];
            const humidity = document.createElement("p")
            humidity.innerHTML = `<i class="fa-solid fa-droplet"></i>${day.main.humidity} % d'humidité `;
            const tempElement = document.createElement("p");
            tempElement.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i>${day.main.temp} °C `;

            const weatherElement = document.createElement("p");
            weatherElement.innerHTML = ` <i class="fa-solid fa-cloud"></i>${day.weather[0].main}  `;

            const windElement = document.createElement("p");
            windElement.innerHTML = `<i class="fa-solid fa-wind"></i> ${day.wind.speed} m/sec `;

            dayCard.appendChild(title);
            dayCard.appendChild(tempElement);
            dayCard.appendChild(weatherElement);
            dayCard.appendChild(windElement);
            dayCard.appendChild(humidity)

            meteoCard.appendChild(dayCard);
        });
        //----------Button------
        const button = document.createElement("button");
        button.id = "buttonExit"
        meteoCard.appendChild(button);

        button.addEventListener("click", () => {
            meteoCard.remove()
        })
        //------------------------


        document.body.appendChild(meteoCard);

    } catch (error) {
        console.error("Erreur lors de la récupération des données météorologiques :", error);
    }
}
inputButton.addEventListener('click', async (event) => {
    event.preventDefault();



    const cityName = inputCity.value;
    await getCityData(cityName);
    await updateCityImage(cityName);
})

