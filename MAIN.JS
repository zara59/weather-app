const cityInput = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");

button.addEventListener (
    "click", getWeather
);

function getWeather (){
    const city = cityInput.value

    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=888b7496c04a4abcc79b23df60adc13d&units=metric`);

    fetch(url)
    .then(response =>  
        response.json()
    )
    .then(data => {temp.textContent = `Temp:${data.main.temp}°c`;
        tempMax.textContent = `Highs:${data.main.temp_max}°c`;
        tempMin.textContent = `Lows:${data.main.temp_min}°c`;
        windSpeed.textContent = `windspeed:${data.wind.speed}m/s`;

        const icon = data.weather[0].icon;
        const iconElement = document.getElementById("weather-icon");

        iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconElement.alt = "Weather icon";
    }) .catch(error => {
          console.log("Error:" ,error);
    });
}

const dateElement = document.getElementById("date");
const now = new Date();
const dayName = now .toLocaleString ('en-US', { weekday:'long'});
const month = now.toLocaleString('en-US', { month:'long'});
const day = now.getDate(); 
const year = now.getFullYear();
dateElement.textContent = `${dayName}, ${month} ${day}, ${year}`;

const windspeed = document.getElementById("windSpeed");


const toggleBtn = document.getElementById("themeToggle")

button.addEventListener(
    "click", () =>{
        document.body.classList.toggle("light-mode");
       
        if(document.body.classList.contains("light-mode")){
        toggleBtn.textContent = "🌙";
    } else {
        toggleBtn.textContent = "☀️";
    }
});

function autoTheme(){
    const hour = new Date().getHours();

    if(hour >= 18 || hour < 6){
        document.Body.classList.add("dark-mode");
        document.Body.classList.remove("light-mode");
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
    }
}

const cityName = document.getElementById ("cityName");
cityName.textContent = city.toUpperCase();


