const city = document.querySelector("#city");
const searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click", ()=>{
    if (city.value.trim() === ""){
        console.log("Enter city")
        return
    }
    forecastByCity(city.value)
});

const locationBtn = document.querySelector("#location");

locationBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(geoPosition => {
        const lat = geoPosition.coords.latitude;
        const long = geoPosition.coords.longitude;
        forecastByCoordinates(lat,long)
    }, (e) => {
        console.log("Can not get location",e)
    });
});

function forecastByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"e07e1f450087e2c0e4e9d3694e0dec43"}`)
        .then(resolution => {
            if (!resolution.ok) {
                throw new Error("Enter valid city name");
            }
            return resolution.json();
        })
        .then(data => {
            displayWeather(data)
        })
        .catch(error => {
            console.log(error);
        });
}

function forecastByCoordinates(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${"e07e1f450087e2c0e4e9d3694e0dec43"}`)
        .then(resolution => resolution.json())
        .then(data => {
            displayWeather(data)
        });
}

const currentWeather = document.querySelector("#currentWeather");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const weatherImage = document.querySelector("#weatherImage");
const description = document.querySelector("#description");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");

function displayWeather(data) {
    currentWeather.classList.remove("hidden");
    cityName.textContent = data.name;
    currentTemperature = data.main.temp;
    temperature.textContent = currentTemperature.toFixed(1) + "°C";
    weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    description.textContent = data.weather[0].description;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}


