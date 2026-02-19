const city = document.querySelector("#city");
const searchBtn = document.querySelector("#search");
const searchPosition = document.querySelector(".searchPosition")
const searchContainer = document.querySelector(".searchContainer")

searchBtn.addEventListener("click", ()=>{
    if (city.value.trim() === ""){
        console.log("Enter city")
        return
    }
    searchPosition.classList.remove("md:fixed")
    forecastByCity(city.value)
    searchContainer.classList.add("justify-center")

});

const locationBtn = document.querySelector("#location");

locationBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(geoPosition => {
        searchPosition.classList.remove("md:fixed")
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
            displayWeather(data);
            currentWeather.classList.add("md:h-[500px]", "justify-center","md:text-2xl")
            weekForecast(data.coord.lat, data.coord.lon);
            saveToHistory(city);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    function forecastByCoordinates(lat, long) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${"e07e1f450087e2c0e4e9d3694e0dec43"}`)
        .then(resolution => resolution.json())
        .then(data => {
            displayWeather(data);
            searchContainer.classList.add("justify-center")
            currentWeather.classList.add("md:h-[500px]", "justify-center","md:text-2xl")
            weekForecast(lat, long);
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

    displayWeatherAlert(currentTemperature);
}

const fiveDayForecast = document.querySelector("#fiveDayForecast")

function weekForecast(lat, long) {
    fiveDayForecast.innerHTML = "";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${"e07e1f450087e2c0e4e9d3694e0dec43"}`)
        .then(resolution => resolution.json())
        .then(data => {
            const week = data.list.filter(item => item.dt_txt.includes("12:00:00"));

            for (let day of week) {
                const weatherContainer = document.createElement("div");
                weatherContainer.className = "flex items-center w-[100%] justify-evenly gap-0.5 text-center text-white shadow-sm bg-transparent backdrop-blur-3xl rounded-[10px] p-4 last:col-span-full last:justify-self-center";
                weatherContainer.innerHTML = `
                    <div class="flex flex-col items-center justify-center md:flex-row">
                        <h4 class="font-semibold">${new Date(day.dt_txt).toDateString()}</h4>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="overflow-hidden">
                    </div>
                    <div class="flex flex-col items-center justify-center md:flex-row gap-1.5 text-xl">
                        <p><i class="fa-solid fa-temperature-high"></i> ${day.main.temp.toFixed(1)}°C</p>
                        <p><i class="fa-solid fa-wind"></i> ${day.wind.speed}m/s</p>
                        <p><i class="fa-solid fa-droplet"></i> ${day.main.humidity}%</p>
                    </div>
                `;

                fiveDayForecast.appendChild(weatherContainer);
            }

        });
}

const dropdownContainer = document.querySelector("#dropdownContainer");
const recentSearch = document.querySelector("#recentSearch");

function saveToHistory(city) {
    let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    if (!savedCities) {
        savedCities = [];
    }
    if(savedCities.indexOf(city) === -1){
        savedCities[savedCities.length] = city;
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
    }
    loadSearchHistory();
}

function loadSearchHistory() {
    let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    if (savedCities.length === 0){
        return;
    }
    else{
        dropdownContainer.classList.remove("hidden");
        
        savedCities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            recentSearch.appendChild(option);
        });
    }
}

recentSearch.addEventListener("change", (e) => {
    dropdownContainer.classList.remove("md:fixed")
    searchPosition.classList.remove("md:fixed")
    searchContainer.classList.add("justify-center")
    forecastByCity(e.target.value);
});

loadSearchHistory();


const toggleBtn = document.querySelector("#toggleButton")
const toggleC = document.querySelector(".fa-toggle-off")
const toggleF = document.querySelector(".fa-toggle-on")
celsius = true

toggleBtn.addEventListener("click", () => {
    let tempF = currentTemperature * 9/5 + 32
    let tempC = currentTemperature
    if (celsius) {
        temperature.textContent = tempF.toFixed(1) + "°F";
        toggleC.classList.add("hidden");
        toggleF.classList.remove("hidden")
    } else{
        temperature.textContent = tempC.toFixed(1) + "°C";
        toggleF.classList.add("hidden");
        toggleC.classList.remove("hidden")
    }
    celsius = !celsius;
});

const weatherCondition = document.querySelector("#weatherCondition")

function displayWeatherAlert(temp){
    if (temp>40){
        weatherCondition.classList.remove("hidden");
    }
    else{
        weatherCondition.classList.add("hidden");
    }
}


