const COORDS='coords';
const API_KEY="c42da64688df58d42439b759ba2c7565";
const weather=document.querySelector(".js-weather");


function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        
        return response.json();
    }).then(function(json){
        const temp=json.main.temp;
        const place=json.name;

        weather.innerText=`${temp} @ ${place}`;
    });

}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude:latitude,
        longitude:longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("error");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}


function loadCoords(){
    const loadCords=localStorage.getItem(COORDS);
    if(loadCords===null){
        askForCoords();
    }else{
        const parseCoords=JSON.parse(loadCords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();