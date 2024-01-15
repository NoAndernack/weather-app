const inputButton = document.querySelector(".inputButton");
const inputCity = document.querySelector("#city");

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

inputButton.addEventListener('click', (event) => {
    event.preventDefault();
    const cityName = inputCity.value;
    const meteoCardVilleUne = document.querySelector(".meteoCard__une__ville");
    meteoCardVilleUne.textContent = cityName;
    getCityData(cityName);
});
