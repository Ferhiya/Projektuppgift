var weatherElem;
var latitude;
var longitude;
var testElem;
var knappar; //refens till tryckt knapp
let cities = [
    {name: "Älmhult", lat: 56.552421, lng: 14.137449, temp: 0, conditions: 0},
    {name: "Växjö", lat: 56.879025, lng: 14.805434, temp: 0, conditions: 0},
    {name: "Ljungby", lat: 56.832700, lng: 13.941018, temp: 0, conditions: 0},
    {name: "Kalmar", lat: 56.663177, lng: 16.356674, temp: 0, conditions: 0},
    {name: "Jönköping", lat: 57.757687, lng: 16.637028, temp: 0, conditions: 0},
    {name: "Västervik", lat: 57.781323, lng: 14.161182, temp: 0, conditions: 0},
    {name: "Värnamo", lat: 57.183132, lng: 14.047798, temp: 0, conditions: 0},
    {name: "Oskarshamn", lat: 57.265678, lng: 16.447400, temp: 0, conditions: 0},
    {name: "Nässjö", lat: 57.653020, lng: 14.696725, temp: 0, conditions: 0},
    {name: "Tranås", lat: 58.035507, lng: 14.975694, temp: 0, conditions: 0},
    {name: "Vetlanda", lat: 57.427446, lng: 15.085333, temp: 0, conditions: 0},
    {name: "Öland", lat: 56.664757, lng: 16.636482, temp: 0, conditions: 0}
];
var weatherImg;
function init() {
    testElem = document.getElementById("test");
    knappar = document.getElementsByClassName("knappar");
    weatherElem = document.getElementById("väder2");
    weatherImg = document.getElementById("väder");
    for (let i = 0; i < cities.length; i++) {
        requestTemp(cities[i]);
    }

    for (let i = 0; i < knappar.length; i++) {
        knappar[i].addEventListener("click", something);
    }

}
window.addEventListener("load", init);

//Start requestTemp
function requestTemp(city) {

    let request = new XMLHttpRequest();
    request.open("GET", "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + city.lng + "/lat/" + city.lat + "/data.json");
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200); {
            getTemp(request.responseText, city);
            }
        }
    };
}//End requestTemp

function getTemp(response, city) {

    response = JSON.parse(response);
    params = response.timeSeries[0].parameters;
    city.temp = params[10].values[0];
    city.conditions = params[18].values[0];


}

function something(e) {

    let cityname = e.target.attributes.city.value;
    
    let img = document.createElement("img");

    console.log(cityname)
    for (i = 0; i < cities.length; i++) {
        if (cities[i].name == cityname) {
            city = cities[i]; 
        }
    }

  
    if (city.conditions <= 4) {
        img.src = "ikoner/sun.svg";
    } else if (city.conditions <= 8) {
        img.src = "ikoner/cloudy.svg";
    } else if (city.conditions <= 20) {
        img.src = "ikoner/rain.svg";
    } else {
        img.src = "ikoner/thunder.svg"
    }
    
    img.width = 60;
   // img.style.marginLeft="100%";

    weatherElem.innerHTML += "<p id='cityp'>" + city.name + "</p>";
    weatherElem.innerHTML += "<p id='imgp'>" + Math.round(city.temp) + "°C" + "</p>";  
    weatherElem.appendChild(img);
    //weatherImg.style.marginTop="98%";

}

//http://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-wsymb info about conditions 1-4 sun, 5-8 cloud, 9-20 rain, 21-27 thunder