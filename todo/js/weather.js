const COORDS = 'coords';
const API_KEY = "28f7210069c0a44403b03e57c9d9921a"
const weather = document.querySelector(".js-weather");




function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json);
        const temp = Math.ceil(json.main.temp - 273.15)
        const weatherDes = json.weather[0].main 
        const weatherDes2 = json.weather[0].description
       weather.innerText = `Temperature : ${temp}'C \n Weather : ${weatherDes} , ${weatherDes2}\n `;
    })
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}



function askForCoords(){
    navigator.geolocation.getCurrentPosition(function(position){
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const coordsObj= {
            latitude,
            longitude
        }
        saveCoords(coordsObj);
        getWeather(latitude,longitude);
    })

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords=== null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();
