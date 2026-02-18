const city = document.querySelector("#city");
const searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click", ()=>{
    if (city.value.trim() === ""){
        console.log("Enter city")
        return
    }
    console.log("Entered city:" + city.value)
});