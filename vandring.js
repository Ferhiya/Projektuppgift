// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
var skicka; //knapp för att lägga till kommentar
var valt; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var ledinfo;
var testElem;
let cities = [
    //{name: "Älmhult", lat: 56.552421, lng: 14.137449, temp: 0, conditions: 0},
    //{name: "Växjö", lat: 56.879025, lng: 14.805434, temp: 0, conditions: 0},
    //{name: "Ljungby", lat: 56.832700, lng: 13.941018, temp: 0, conditions: 0},
    {name: "Kalmar", lat: 56.663177, lng: 16.356674, temp: 0, conditions: 0},
    //{name: "Jönköping", lat: 57.781323, lng: 14.161182, temp: 0, conditions: 0}
];
	
// Initiering av globala variabler och händelsehanterare
function init() {
	flickrImgElem = document.getElementById("flickrImg");
	valt=document.getElementById("valt");
	knappar=document.getElementsByClassName("knappar");
    display=document.getElementById("vandringslederna");

	for (let i = 0; i < knappar.length; i++) {
		knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", showledinfo);
        
	}

	testElem = document.getElementById("väder2");
	for (let i = 0; i < cities.length; i++) {
			requestTemp(cities[i]);
		
        
    }
    




	skicka= document.getElementById("skicka");
	skicka.addEventListener("click", function(){
		var kommentera2Value=document.getElementById("kommentera2");
		
		var kommenteraValue=document.getElementById("kommentera");
		

		var div=document.getElementById("unordered");

		let led=(kommentera2Value.value);
	

		let kommentar=(kommenteraValue.value);
	     
		div.innerHTML+="<div id='testid'>"+led+"<br>"+kommentar+"</div>";
		
		
	});
  

	//requestData();
  
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------

// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(e) { 
   // let id = e.target.id;
	let cityname = e.target.attributes.city.value;
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","vandring1.json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
		if (request.readyState == 4) //staus 4=kommunikation klar
			if (request.status == 200) getData(request.responseText, cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
			else valt.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
	};

    
} 

// Tolkar koden och skriv ut den på önskad form
function getData(JSONtext,cityname) {
	let vandring = JSON.parse(JSONtext).vandring; //hämtar arryen med vandringsledernas data.

	let HTMLcode = "";

    HTMLcode +=
	"<h1>Vandringsleder i <b>" + cityname + "</b></h1>" + "<hr>";
    
	for (let i = 0; i < vandring.length; i++) {

        if (cityname === vandring[i].city) {

           	// Referenser till olika egenskaper i vandrings objektet i JSON
			HTMLcode += 
            "<h2><b></b> " + vandring[i].led + "</h2>" + //lägger in namnet på ledet i html strängen
			//console.log(vandring[i].imgurl);
			//"<a herf='" + vandring[i].url+ "'></a>" + //lägger in en kort beskrivning om ledet i html strängen
			
			//"<a href=´Läs mer här" + vandring[i].url  + "</a>"+
			//'<a href="Läs mer>'  + vandring[i].url + '</a>'+
			"<li><b>längd:</b> " + vandring[i].längd + "</li>" + //lägger in längden på ledet i html strängen
			"<li><b>handikapsanpassat:</b> " + vandring[i].handikapsanpassat + "</li>" + //lägger in info om handikapsanpassning i ledet i html strängen
			"<li><b>svårighetsnivå:</b> " + vandring[i].svårighetsnivå + "</li>" + //lägger in ledets svårighetsnivå i html strängen
			"<li><b>parkering:</b> " + vandring[i].parkering + "</li>"+ //lägger in info om parkering i html strängen
			"<img src='"+vandring[i].image.url+"'></img>"+
			"<p><b></b> " + vandring[i].beskrivning + "</p>" + //lägger in en kort beskrivning om ledet i html strängen
			"<a href='"+vandring[i].link.linkurl+"' target=_blank>Läs mer</a>"+
			"<hr>"
			
	
			//valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
    }
}


	    valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
		//li.style.display=" flex";
        valt.style.fontSize = "150%";
        valt.style.marginBottom = "5%";
        document.getElementById("kommentera").style.width= "350px";
        document.getElementById("kommentera").style.height= "150px";
        document.getElementById("skicka").style.width= "100px";
        //document.getElementById("unordered").style.border= "2px solid black"; 

    clearcontent(display);
	
} // End getData

function clearcontent(display) {
    display.innerHTML = "";
}
function showledinfo(){
      ledinfo=document.getElementById("ledinfo");
        ledinfo.style.visibility="visible";
}


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

    let img = document.createElement("img");

    if (city.conditions <= 4) {
        img.src = "ikoner/sun.svg";
    } else if (city.conditions <= 8) {
        img.src = "ikoner/cloudy.svg";
    } else if (city.conditions <= 20) {
        img.src = "ikoner/rain.svg";
    } else {
        img.src = "ikoner/thunder.svg"
    }

    img.height = 60;
    img.width = 60;

    testElem.innerHTML += "<br><br>" + city.name + "<br>" + Math.round(city.temp) + "°C" + "<br>";
    testElem.appendChild(img);

} 

// JavaScript code
function search_animal() {
	document.getElementById("list").style.visibility="hidden";
    let input = document.getElementById('sokruta').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('animals');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}

