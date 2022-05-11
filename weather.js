var latitude;
var longitude;
var testElem;
let cities = [
    {name: "Älmhult", lat: 56.552421, lng: 14.137449, temp: 0, conditions: 0},
    {name: "Växjö", lat: 56.879025, lng: 14.805434, temp: 0, conditions: 0},
    {name: "Ljungby", lat: 56.832700, lng: 13.941018, temp: 0, conditions: 0},
    {name: "Kalmar", lat: 56.663177, lng: 16.356674, temp: 0, conditions: 0},
    {name: "Jönköping", lat: 57.781323, lng: 14.161182, temp: 0, conditions: 0}
];

function init() {
    testElem = document.getElementById("test");

    for (let i = 0; i < cities.length; i++) {
        requestTemp(cities[i]);
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
            console.log(city);
            }
        }
    };
}//End requestTemp

function getTemp(response, city) {

    response = JSON.parse(response);
    params = response.timeSeries[0].parameters;
    city.temp = params[10].values[0];
    city.conditions = params[18].values[0];

    testElem.innerHTML += "<br><br>" + city.name + "<br>" + city.temp + "°C" + "<br>" + city.conditions;

}

//http://opendata.smhi.se/apidocs/metfcst/parameters.html#parameter-wsymb info about conditions