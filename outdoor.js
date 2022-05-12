// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
var skicka; //knapp för att lägga till kommentar
var valt2; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var outdoorinfo;
var weatherinfo; 
var lat = 56.663177;
var lng =16.356674;
var temp = 0; 
var conditions = 0;

// Initiering av globala variabler och händelsehanterare
function init() {
    flickrImgElem = document.getElementById("flickrImg2");
    valt2 = document.getElementById("valt2");
    knappar = document.getElementsByClassName("outdoor");
    display = document.getElementById("utomhus");
    weatherElem = document.getElementById("väder2");

    for (let i = 0; i < knappar.length; i++) {
        knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", requestBikeData);
        knappar[i].addEventListener("click", showledinfo);
        knappar[i].addEventListener("click", requestTemp);

    }

    skicka = document.getElementById("skicka");
    skicka.addEventListener("click", function () {
        var kommenteraValue = document.getElementById("kommentera").value;

        var p = document.createElement("p");
        var text = document.createTextNode(kommenteraValue);
        p.appendChild(text);
        document.getElementById("unordered").appendChild(p);
        document.getElementById("unordered").appendChild(p).style.border = "2px solid black";
    });



    //requestvader();

} // End init
window.addEventListener("load", init);

//-------------------------------------------------------------------------------------------------


// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(e) {
    let id1 = e.target.id;
    let latlng = id1.split(",");
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", "https://smapi.lnu.se/api/?api_key=p1SSZkZV&controller=activity&method=getfromlatlng&lat=" + latlng[0] + "&lng=" + latlng[1] + "&radius=40kmkm&physical_efforts=HIGH&debug=true", true);
    console.log(request);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
        if (request.readyState == 4) //staus 4=kommunikation klar
            if (request.status == 200) getData(request.responseText) //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
            else valt2.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
    };


}//End requestData

// Tolkar koden och skriv ut den på önskad form
function getData(response) {
    response = JSON.parse(response) //hämtar arryen med vandringsledernas data.

    let HTMLcode = ""; //tom html sträng för utskriften av innehållet i JSON 

    for (let i = 0; i < response.payload.length; i++) {
        let hi = response.payload;
        // Referenser till olika egenskaper i vandrings objektet i JSON
        HTMLcode +=
            "<hr>" +
            "<p><b>Namn:</b> " + hi[i].name + "</p>" + //lägger in namnet på ledet i html strängen
            "<p><b>Fysisktkrävande:</b> " + hi[i].physical_effort + "</p>" + //lägger in längden på ledet i html strängen
            "<p><b>beskrivning:</b> " + hi[i].description + "</p>" //lägger in info om handikapsanpassning i ledet i html strängen
            ;
    }

    valt2.innerHTML += HTMLcode; //utskrift av datan i JSON filen
    valt2.style.fontSize = "150%";
    valt2.style.visibility = "visable";
    valt2.style.marginBottom = "5%";
    document.getElementById("kommentera").style.width = "350px";
    document.getElementById("kommentera").style.height = "150px";
    document.getElementById("skicka").style.width = "100px";

    clearcontent(display);

} // End getData 

//start bike info
function requestBikeData(e) {
    let id = e.target.className;
    let cityname = e.target.attributes.city.value;
    let request = new XMLHttpRequest();
    request.open("GET", id + ".json", true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getBikeData(request.responseText, cityname)
            else valt2.innerHTML = "Den begärda filen finns inte."
    };
}

function getBikeData(JSONtext, cityname) {
    let bike = JSON.parse(JSONtext).bike;

    let HTMLcode = "";

    HTMLcode +=
        "<h1><b>" + cityname + weatherElem + "</b></h1>";

    for (let i = 0; i < bike.length; i++) {

        if (cityname === bike[i].city) {

            HTMLcode +=
                "<hr>" +
                "<p><b>Namn:</b> " + bike[i].name + "</p>" +
                "<img src='" + bike[i].img.url + "'</img>" +
                "<p><b>Beskrivning:</b> " + bike[i].description + "</p>" +
                "<p><b>Längd:</b> " + bike[i].distance + "</p>" +
                "<a href=" + bike[i].link.url + " target='_blank'>Läs mer</a>";
        }
    }


    valt2.innerHTML = HTMLcode; //utskrift av datan i JSON filen
    valt2.style.fontSize = "150%";
    valt2.style.visibility = "visable";
    valt2.style.marginBottom = "5%";
    document.getElementById("kommentera").style.width = "350px";
    document.getElementById("kommentera").style.height = "150px";
    document.getElementById("skicka").style.width = "100px";

    clearcontent(display);

}

function clearcontent(display) {
    display.innerHTML = "";
}

function showledinfo() {
    outdoorinfo = document.getElementById("outdoorinfo");
    outdoorinfo.style.visibility = "visible";
}

//Start requestTemp
function requestTemp() {

    let request = new XMLHttpRequest();
    request.open("GET", "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lng + "/lat/" + lat + "/data.json");
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200); {
            getTemp(request.responseText);
            }
        }
    };
}//End requestTemp

function getTemp(response) {

    response = JSON.parse(response);
    params = response.timeSeries[0].parameters;
    temp = params[10].values[0];
    conditions = params[18].values[0];

    let img = document.createElement("img");

    if (conditions <= 4) {
        img.src = "ikoner/sun.svg";
    } else if (conditions <= 8) {
        img.src = "ikoner/cloudy.svg";
    } else if (conditions <= 20) {
        img.src = "ikoner/rain.svg";
    } else {
        img.src = "ikoner/thunder.svg"
    }

    img.height = 80;
    img.width = 80;

    weatherElem.appendChild(img);
    weatherElem.innerHTML += "<br>" + Math.round(temp) + "°C" + "<br>";

}