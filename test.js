// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
//var skicka; //knapp för att lägga till kommentar
var valt; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var testknapp;
var ledinfo;
var testElem;
let cities = [
    //{name: "Älmhult", lat: 56.552421, lng: 14.137449, temp: 0, conditions: 0},
    //{name: "Växjö", lat: 56.879025, lng: 14.805434, temp: 0, conditions: 0},
    //{name: "Ljungby", lat: 56.832700, lng: 13.941018, temp: 0, conditions: 0},
    {name: "Kalmar", lat: 56.663177, lng: 16.356674, temp: 0, conditions: 0},
    //{name: "Jönköping", lat: 57.781323, lng: 14.161182, temp: 0, conditions: 0}
];
var exdiv;

// Initiering av globala variabler och händelsehanterare
function init() {
	flickrImgElem = document.getElementById("flickrImg");
	valt=document.getElementById("valt");
	testknapp=document.getElementById("testknapp");
	knappar=document.getElementsByClassName("knappar");
    display=document.getElementById("vandringslederna");
    ledinfo=document.getElementById("ledinfo");
	for (let i = 0; i < knappar.length; i++) {
		knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", showledinfo);
        
	}

	testElem = document.getElementById("väder2");
	for (let i = 0; i < cities.length; i++) {
			requestTemp(cities[i]);
		
        
    }
    
exdiv=document.getElementById("testdiv");
	
		
		
	

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
			//"<button class='"+vandring[i].led+"'>Läs kommentarer</button>"+
			//`<Button class="idk" Type="button" onclick="('Edit', '${vandring[i].id}')">${vandring[i].id}</Button>`
           
            //"<div>'<span id='dots'>...</span>"+vandring[i].kommentarer.kommentar1+'<span id="more>'+"</span></div><button onclick=''id='myBtn'>Read more</button>"+
			"<hr>"
        
	
			//valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
    
            var btnx2 = document.createElement("button");
            btnx2.innerHTML = "Do Something Else";
            //const cl = document.createAttribute("class");
            
            // Set the value of the class attribute:
            //cl.value = "btncl";
            
            const id = document.createAttribute("id");
            
            // Set the value of the class attribute:
            id.value = "2";
            btnx2.setAttributeNode(id);
            var body = document.getElementById("testaralt");
            //body.appendChild(button2);
            body.append(btnx2);
            btnx2.setAttribute("class","btncl");

            btnx2.style.fontSize = "100%";
            btnx2.style.style
            btnx2.style.width="130px";
            btnx2.style.margin="0.5%";
            btnx2.style.color="red";
            let btnx3=document.getElementsByClassName("btncl");
            for (let i = 0; i < btnx3.length; i++) {
               //city classen
               btnx3[i].setAttribute("city",cityname);
               btnx3[i].setAttribute("id","1");
               btnx3[i].id=i+1;
            } 
        }
 
}


	    valt.innerHTML= HTMLcode;//utskrift av datan i JSON filen
		//li.style.display=" flex";
		

     
        valt.style.marginBottom = "2%";
        valt.style.fontSize = "150%";
        valt.style.marginBottom = "2%";
        //document.getElementById("unordered").style.border= "2px solid black"; 
    clearcontent(display);
    //getData2(JSONtext,btn);

//lägger på onclick event till läs kommentar knappar
let btnx=document.getElementsByClassName("btncl");
// 3. Add event handler
for (let i = 0; i < btnx.length; i++) {
    btnx[i].addEventListener ("click", function(e) {
        //alert("did something");
        clearcontent(valt);
        requesttest(e);
      });
    
}


} // End getData
function requesttest(e) { 
    console.log(e.target);
    let cityname = e.target.attributes.city.value;
    
    let btn=e.target.getAttributeNode("id").value;
    //btn.id;
     console.log(btn);
     let request = new XMLHttpRequest(); // Object för Ajax-anropet
     request.open("GET","vandring1.json",true);
     request.send(null); // Skicka begäran till servern
     request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
         if (request.readyState == 4) //staus 4=kommunikation klar
             if (request.status == 200) getData2(request.responseText,btn,cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
             else valt.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
     };
 
 } 
function getData2(JSONtext,btn,cityname){
    let vandring = JSON.parse(JSONtext).vandring;
    let HTMLcode2="";

for (let i = 0; i < vandring.length; i++) {
    if (cityname === vandring[i].city && btn === vandring[i].id) {
       console.log("funkar2");
           // Referenser till olika egenskaper i vandrings objektet i JSON
        HTMLcode2 += 
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
        //"<button class='"+vandring[i].led+"'>Läs kommentarer</button>"+
        //`<Button class="idk" Type="button" onclick="('Edit', '${vandring[i].id}')">${vandring[i].id}</Button>`
       
        //"<div>'<span id='dots'>...</span>"+vandring[i].kommentarer.kommentar1+'<span id="more>'+"</span></div><button onclick=''id='myBtn'>Read more</button>"+
        "<hr>"

        //valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
        
}
}
exdiv.style.marginBottom = "5%";
exdiv.style.fontSize = "150%";
exdiv.style.marginBottom = "5%";
exdiv.style.border="2px solid red";
valt.innerHTML= HTMLcode2;

}
function clearcontent(display) {
    display.innerHTML = "";
}

function showledinfo(){
ledinfo.style.visibility="visible";
	
}
function clearcontent(valt) {
    valt.innerHTML = "";
     //alt.remove();
    //ledinfo.removeChild(ledinfo.firstElementChild)
   // ledinfo.removeChild(valt);
    //valt.style.display="none";
    //exdiv.style.marginRight="550px";
    //valt.style.visibility="hidden";
}
/*
function showledinfo2(){
	valt=document.getElementById("valt");

	  valt.style.visibility="hidden";
  
}*/

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