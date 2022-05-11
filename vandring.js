// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
var skicka; //knapp för att lägga till kommentar
var valt; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var ledinfo;
	
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


	

	skicka= document.getElementById("skicka");
	skicka.addEventListener("click", function(){
		var kommentera2Value=document.getElementById("kommentera2");
		
		var kommenteraValue=document.getElementById("kommentera");
		

		var div=document.getElementById("unordered");

		let led=(kommentera2Value.value);
	

		let kommentar=(kommenteraValue.value);
	     
		div.innerHTML+="<div id='testid'>"+led+"<br>"+kommentar+"</div>";
		
		//document.getElementById("unordered").style.border="2px solid black";

		/*
		console.log(kommentera2Value);
		var lp = document.createElement("p");
		var text2 = document.createTextNode(kommentera2Value);
		lp.appendChild(text2);
		var div=document.getElementById("unordered");
        


		var kommenteraValue= document.getElementById("kommentera").value;
		var p = document.createElement("p");
		var text = document.createTextNode(kommenteraValue);
		p.appendChild(text);
		document.getElementById("unordered").appendChild(p);

		document.getElementById("unordered").appendChild(lp,p).style.border="2px solid black";
       
		
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < Elements.length; i++) {
                var e = document.createElement("div");
                e.innerHTML = Elements[i];
                fragment.appendChild(e);
            }
            var UlElement = document.getElementById('test');
            UlElement.appendChild(fragment);
        
	


		//document.getElementById("unordered").appendChild(lp);
        //document.getElementById("unordered").appendChild(lp).style.border="2px solid black";
		*/
	});
  

	//requestData();
	requestvader();
  
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------

// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(e) { 
    let id = e.target.id;
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","vandring" + id + ".json",true);
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



	/*for (let i = 0; i < vandring.length; i++) {
		HTMLcode += 
    "<h1><b>Vandringsleder i </b> " + vandring[i].stad + "</h1>" +"<hr>";
	}*/
    
    
	for (let i = 0; i < vandring.length; i++) {
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



function requestvader() {
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET"," https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json");//hämtar lat och lng i bildens id objekt
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4)
			if (request.status == 200) (request.responseText);// status 200 (OK) --> filen fanns, gå vidare till funktionen där datan tolkas och skrivs ut
			else flickrImgElem.innerHTML = "Den begärda resursen finns inte.";
	};
	
} // End requestLocation

function newvader(response) {
	console.log(response);
	
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

