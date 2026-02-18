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
        console.log("latitude:" + lat , "longitude:" + long)
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
            console.log("weather data:",data)
        })
        .catch(error => {
            console.log(error);
        });
}
