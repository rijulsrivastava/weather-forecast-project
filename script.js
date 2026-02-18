const city = document.querySelector("#city");
const searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click", ()=>{
    if (city.value.trim() === ""){
        console.log("Enter city")
        return
    }
    console.log("Entered city:" + city.value)
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
