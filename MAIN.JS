const cityInput = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");

//these are the various input which the button generates//
button.addEventListener("click",() =>{
    getWeather(cityInput.value);

const popup = document.getElementById("popup");
const exitBtn= document.getElementById("exitBtn");
const continueBtn  = document.getElementById("continueBtn");
const app = document.getElementById("app");
const popupInput = document.getElementById("popupInput");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const weatherIcon = document.getElementById("weather-icon");
const condition = document.getElementById("condition");
const searchBtn = document.getElementById("searchBtn");

let  city = cityInput.value.trim();
if  (city === " "){
        alert("please enter a city to continue. ");
        return;
    }


    if(city.toLowerCase() === "benin"){
        alert("please add city to continue. ");
    }

    if(city.toLowerCase() === "portharcourt"){
        alert("please space between port and harcourt. ");

        getWeather()
    }

});

function startWeather(){
    const overlay = document.querySelector(".overlay");
    
    overlay.style.display = "none";

    overlay.style.pointerEvents="none";

    app.style.opacity = "1";
    app.style.pointerEvents = "auto";
    cityInput.placeholder = popupInput.value;
}

continueBtn.addEventListener("click", () => {
    let  city = popupInput.value.trim();

    //please turn on your internet connection.
    if (!navigator.onLine){
        alert("please turn on your internet connection before continuing.");
        return;
    }

    //please enter a city to continue.
    if  (city === " "){
        alert("please enter a city to continue. ");
        return;
    }


    if(city.toLowerCase() === "benin"){
        city = "Benin City";
    }

    if(city.toLowerCase() === "portharcourt"){
        city = "Port Harcourt"

        getWeather()
    }
    startWeather();

    popup.style.display = "none";
    
    app.style,display = "block";
    app.style.opacity = "1";
    app.style.pointerEvents = "auto";
    app.classList.remove("hidden");

    cityInput.value = popupInput.value;

    getWeather(cityInput.value);

   
});

exitBtn.addEventListener("click", () =>{
    popup.style.display = "none";
});

function getWeather (city) {
    console.log("City recieved:, city");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=888b7496c04a4abcc79b23df60adc13d&units=metric`;


    fetch(url)
    .then(response =>     
        response.json()
    )
    .then(data => {temp.textContent =`${Math.round(data.main.temp)}°C`;
        cityInput.value = " ";
        feelsLike.textContent = `feelsLike: ${Math.round(data.main.feels_like)}°C`;
        condition.textContent = data.weather[0].main;

        windSpeed.textContent = `${data.wind.speed}m/s`;
        humidity.textContent = `${data.main.humidity}%`;
        pressure.textContent =`${data.main.pressure}hPa`;
        visibility.textContent =`${data.visibility/1000}km`;
        console.log(data);
        console.log(data.windSpeed);
        console.log(data.main.humidity);
        console.log(data.main.pressure);
        console.log(data.visibility);


        const icon = data.weather[0].icon;
        const iconElement = document.getElementById("weather-icon");

        

        iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconElement.alt = "Weather icon";

        const lat = data.coord.lat;
        const lon = data.coord.lon;

        getForecast(lat, lon);

    }) .catch(error => {
          console.log("Error:" ,error);
    });
}

async function getForecast(city) {

    const forecastURL =`https://api.openweathermap.org/data/2.5/forecast?q=city&appid=888b7496c04a4abcc79b23df60adc13d&units=metric%0A`;
    console.log(forecastURL);

    const response = await fetch (forecastURL);

    const forecastData = await response.json();
    console.log("forecastData:" ,forecastData);

    

    updateForecastUI(forecastData);
}

function updateForecastUI(forecastData) {
    console.log(forecastData);
    console.log(forecastData.cod);
    console.log(forecastData.message);

    const cards = document.querySelectorAll(".forecast-card");
    cards.forEach((card, index) => {
        const item = forecastData.list[index];
        console.log(index);
        console.log(item);

        const temp =item.main.temp;
        console.log( index, item);
        const weather = item.weather[0].main;

        card.querySelector("img").src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        console.log(card.querySelector("forecast-temp"));
        card.querySelector("#forecast-temp").textContent = `${Math.round(item.main.temp)}°C`;
    
    
    });
}


function getLocationWeather(){

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            const lat = position.coords.latitude;

            const lon = position .coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=888b7496c04a4abcc79b23df60adc13d&units=metric`;

            const response = await fetch (url);

            const data = await response .json();

            temp .textContent = `${data.main.temp}°c`;

            cityName.textContent = data.name;

            getForecast(lat, lon);


        }
    );
}



const dateElement = document.getElementById("date");
const now = new Date();
const dayName = now .toLocaleString ('en-US', { weekday:'long'});
const month = now.toLocaleString('en-US', { month:'long'});
const day = now.getDate(); 
const year = now.getFullYear();
dateElement.textContent = `${dayName}, ${month} ${day}, ${year}`;

const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("change", () =>{
    document.body.classList.toggle("dark-mode");
})