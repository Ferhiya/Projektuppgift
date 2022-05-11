// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
var skicka; //knapp för att lägga till kommentar
var valt2; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var vatteninfo;
	
// Initiering av globala variabler och händelsehanterare
function init() {
	flickrImgElem = document.getElementById("flickrImg2");
	valt2=document.getElementById("valt2");
	knappar=document.getElementsByClassName("knappar2");
    display=document.getElementById("vandringslederna");

	for (let i = 0; i < knappar.length; i++) {
		knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", showledinfo);
        
	}

	skicka= document.getElementById("skicka");
	skicka.addEventListener("click", function(){
		var kommenteraValue= document.getElementById("kommentera").value;
	 
		var p = document.createElement("p");
		var text = document.createTextNode(kommenteraValue);
		p.appendChild(text);
		document.getElementById("unordered").appendChild(p);
        document.getElementById("unordered").appendChild(p).style.border="2px solid black";
	});
  


	//requestvader();
  
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------


// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(e) { 
    let id1 = e.target.id;
    let latlng = id1.split(",");

    console.log(latlng);
    //let id = e.target.id;
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","https://smapi.lnu.se/api/?api_key=p1SSZkZV&controller=activity&method=getfromlatlng&lat="+latlng[0]+"&lng="+latlng[1]+"&radius=40kmkm&involves_water=Y&debug=true",true);
    console.log(request);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
		if (request.readyState == 4) //staus 4=kommunikation klar
			if (request.status == 200) getData(request.responseText); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
			else valt2.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
	};

    
} 

/*
// Avläs tryckt knapp för att visa datan i json filen som hör ihop med den knappen.
function selecthike() {
	let knapp=this.id; //hämtar nummeret frå tryckt knapp , för att senare använda det för att hämta information till vald led .
	requestData(knapp); //anroppar functionen som läser in xml-filen
	console.log(knapp);
	
} // End selectSubject
*/

// Tolkar koden och skriv ut den på önskad form
function getData(response) {
    console.log(response)
	response = JSON.parse(response) //hämtar arryen med vandringsledernas data.

	let HTMLcode = ""; //tom html sträng för utskriften av innehållet i JSON 
    
    for (let i = 0; i < response.payload.length; i++) {
        let hi=response.payload;
        // Referenser till olika egenskaper i vandrings objektet i JSON
        HTMLcode += 
        "<p><b>Namn:</b> " + hi[i].name + "</p>" + //lägger in namnet på ledet i html strängen
        "<p><b>Fysisktkrävande:</b> " + hi[i].physical_effort + "</p>" + //lägger in längden på ledet i html strängen
        "<p><b>beskrivning:</b> " + hi[i].description + "</p>" + //lägger in info om handikapsanpassning i ledet i html strängen
        "<p><b>vattenvanligt:</b> " + hi[i].involves_water + "</p>" + //lägger in en kort beskrivning om 
        "<hr>"
        ;
       // valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
    }

	    valt2.innerHTML = HTMLcode; //utskrift av datan i JSON filen
        valt2.style.fontSize = "150%";
        valt2.style.visibility="visable";
        valt2.style.marginBottom = "5%";
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
    vatteninfo=document.getElementById("vatteninfo");
      vatteninfo.style.visibility="visible";
}