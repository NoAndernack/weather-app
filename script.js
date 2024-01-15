const inputButton = document.querySelector(".inputButton");
const inputCity = document.querySelector("#city");
const UNSPLASH_ACCESS_KEY = '2GB3Q5rtkESgtgT08v7GXO7N6iuYb9_92zNz8Nr0s74';

async function fetchCityImage(cityName) {
    const url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].urls.regular; 
}
async function updateCityImage(cityName) {
    try {
        const imageUrl = await fetchCityImage(cityName);
        const imageContainer = document.querySelector(".meteoCard__une__photo");
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Image de ${cityName}" class="imgCity">`;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'image de la ville :", error);
    }
}
const fetchPhoto  = async () => {
    const url= "https://api.unsplash.com/photos?client_id=2GB3Q5rtkESgtgT08v7GXO7N6iuYb9_92zNz8Nr0s74"
    const response = await fetch(url);
    return response.json
}

const fetchCity = async(cityName) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=dee8f388d8fc9ba6a29dd1055cffe1a5`;
    const response = await fetch(url);
    return response.json();
}

const fetchMeteo = async(lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dee8f388d8fc9ba6a29dd1055cffe1a5&units=metric&lang=fr`;
    const response = await fetch(url);
    return response.json();
}

async function getCityData(cityName) {
    try {
        const cityData = await fetchCity(cityName);
        console.log(cityData);
        const lon = cityData[0].lon; 
        const lat = cityData[0].lat;
        await getMeteoData(lon, lat);
    } catch (error) {
        console.error("Erreur lors de la récupération des données de la ville :", error);
    }
}

async function getMeteoData(lon, lat) {
    try {
        const meteoData = await fetchMeteo(lon, lat);
        console.log(meteoData);
        
        const meteoCard = document.querySelector(".meteoCard__une__météo");
        meteoCard.innerHTML = ''; 
        const deg = document.createElement("p");
        const sunny = document.createElement("p")
        deg.textContent = `${meteoData.main.temp} °C`;
        sunny.textContent=`${meteoData.weather[0].description} `;
        meteoCard.appendChild(deg);
        meteoCard.appendChild(sunny)

    } catch (error) {
        console.error("Erreur lors de la récupération des données météorologiques :", error);
    }
}

inputButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const cityName = inputCity.value;
    await getCityData(cityName);
    await updateCityImage(cityName); })