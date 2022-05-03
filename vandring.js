// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
var skicka; //knapp för att lägga till kommentar
var valt; //refrens till div elemetet där info om vandrignsledet ska visas
//var knapp; //refens till tryckt knapp
	
// Initiering av globala variabler och händelsehanterare
function init() {
	flickrImgElem = document.getElementById("flickrImg");
	valt=document.getElementById("valt");
	knapp=document.getElementById("btn1");
	//knapp.addEventListener("click", requestData());
	skicka= document.getElementById("skicka");
	skicka.addEventListener("click", function(){
		var kommenteraValue= document.getElementById("kommentera").value;
	 
		var p = document.createElement("p");
		var text = document.createTextNode(kommenteraValue);
		p.appendChild(text);
		document.getElementById("unordered").appendChild(p);
	});
	requestData();
  
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------

/*
// Avläs tryckt knapp för att visa datan i json filen som hör ihop med den knappen.
function selecthike() {
	let valt=this.hikeIndex; //hämtar nummeret frå tryckt knapp , för att senare använda det för att hämta information till vald led .
	requestData(hike); //anroppar functionen som läser in xml-filen
	
} // End selectSubject
*/
// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData() { 
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","vandring" + ".json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
		if (request.readyState == 4) //staus 4=kommunikation klar
			if (request.status == 200) getData(request.responseText); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
			else valt.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
	};
} 

// Tolkar koden och skriv ut den på önskad form
function getData(JSONtext) {
	let vandring = JSON.parse(JSONtext).vandring; //hämtar arryen med vandringsledernas data.

	let HTMLcode = ""; //tom html sträng för utskriften av innehållet i JSON 
	for (let i = 0; i < vandring.length; i++) {

		// Referenser till olika egenskaper i vandrings objektet i JSON
		HTMLcode += "<p><b>led:</b> " + vandring[i].led + "</p>" + //lägger in namnet på ledet i html strängen
        "<p><b>längd:</b> " + vandring[i].längd + "</p>" + //lägger in längden på ledet i html strängen
        "<p><b>handikapsanpassat:</b> " + vandring[i].handikapsanpassat + "</p>" + //lägger in info om handikapsanpassning i ledet i html strängen
        "<p><b>beskrivning:</b> " + vandring[i].beskvivning + "</p>" + //lägger in en kort beskrivning om ledet i html strängen
		"<p><b>svårighetsnivå:</b> " + vandring[i].svårighetsnivå + "</p>" + //lägger in ledets svårighetsnivå i html strängen
		"<p><b>parkering:</b> " + vandring[i].parkering + "</p>"+ //lägger in info om parkering i html strängen
		"<hr>";
		
	}

	valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
	
} // End getData


