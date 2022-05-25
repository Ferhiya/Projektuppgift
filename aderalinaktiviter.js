// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
var valt2; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var vatteninfo;
var valt;
var exdiv;
	
// Initiering av globala variabler och händelsehanterare
function init() {
	flickrImgElem = document.getElementById("flickrImg2");
	valt2=document.getElementById("valt2");
    valt=document.getElementById("valt");
	knappar=document.getElementsByClassName("knappar2");
    display=document.getElementById("vandringslederna");

	for (let i = 0; i < knappar.length; i++) {
		knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", requestJSONData);
        knappar[i].addEventListener("click", showledinfo);
        
	}


exdiv=document.getElementById("testdiv");
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
	request.open("GET","https://smapi.lnu.se/api/?api_key=p1SSZkZV&controller=activity&method=getfromlatlng&lat="+latlng[0]+"&lng="+latlng[1]+"&involves_water=Y&debug=true",true);
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
        //lägger in en kort beskrivning om 
        "<hr>"
        ;
       // valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
    }

	    valt2.innerHTML = HTMLcode; //utskrift av datan i JSON filen
        valt.style.fontSize = "150%";
        valt.style.visibility="visable";
        valt.style.marginBottom = "5%";
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
//-------------------------------------------------------------------------------------------------

// Gör ett Ajax-anrop för att läsa in begärd fil
function requestJSONData(e) { 
    // let id = e.target.id;
     let cityname = e.target.attributes.city.value;
     let request = new XMLHttpRequest(); // Object för Ajax-anropet
     request.open("GET","aderalin.json",true);
     request.send(null); // Skicka begäran till servern
     request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
         if (request.readyState == 4) //staus 4=kommunikation klar
             if (request.status == 200) getJSONData(request.responseText, cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
             else valt.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
     };
 
     
 } 
 
 // Tolkar koden och skriv ut den på önskad form
 function getJSONData(JSONtext,cityname) {
     let aderalin = JSON.parse(JSONtext).aderalin; //hämtar arryen med vandringsledernas data.
     console.log(aderalin);
     let HTMLcode = "";
     let backBTN2=document.getElementById("testbtn");
     //backBTN2.style.visibility="hidden";
     backBTN2.innerHTML="";
     let backBTN=document.getElementById("tillknappar");
     backBTN.style.visibility="visible";
     HTMLcode +=
     "<h1>Vandringsleder i <b>" + cityname + "</b></h1>" + "<hr>";
     
     for (let i = 0; i < aderalin.length; i++) {
 
         if (cityname === aderalin[i].city) {
 
                // Referenser till olika egenskaper i vandrings objektet i JSON
             HTMLcode += 
             "<h2><b></b> " + aderalin[i].led + "</h2>" + //lägger in namnet på ledet i html strängen
             //console.log(vandring[i].imgurl);
             //"<a herf='" + vandring[i].url+ "'></a>" + //lägger in en kort beskrivning om ledet i html strängen
             
             //"<a href=´Läs mer här" + vandring[i].url  + "</a>"+
             //'<a href="Läs mer>'  + vandring[i].url + '</a>'+
             "<li><b>längd:</b> " + aderalin[i].längd + "</li>" + //lägger in längden på ledet i html strängen
             "<li><b>handikapsanpassat:</b> " + aderalin[i].handikapsanpassat + "</li>" + //lägger in info om handikapsanpassning i ledet i html strängen
             "<li><b>svårighetsnivå:</b> " + aderalin[i].svårighetsnivå + "</li>" + //lägger in ledets svårighetsnivå i html strängen
             "<li><b>parkering:</b> " + aderalin[i].parkering + "</li>"+ //lägger in info om parkering i html strängen
             "<img src='"+aderalin[i].image.url+"'></img>"+
             "<p><b></b> " + aderalin[i].beskrivning + "</p>" + //lägger in en kort beskrivning om ledet i html strängen
             "<a href='"+aderalin[i].link.linkurl+"' target=_blank>Läs mer</a>"+
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
      request.open("GET","aderalin.json",true);
      request.send(null); // Skicka begäran till servern
      request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
          if (request.readyState == 4) //staus 4=kommunikation klar
              if (request.status == 200) getData2(request.responseText,btn,cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
              else valt2.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
      };
  
  } 
 function getData2(JSONtext,btn,cityname){
     let aderalin = JSON.parse(JSONtext).aderalin;
     let HTMLcode2="";
     document.getElementById("har").style.visibility="visible";
     document.getElementById("head").style.visibility="visible";
     document.getElementById("testdiv").style.visibility="visible";
     let backBTN=document.getElementById("tillknappar");
     backBTN.style.visibility="hidden";
     let backBTN2=document.getElementById("testbtn");
     backBTN2.style.visibility="visible";
     
     var x = document.createElement("BUTTON");
     var t = document.createTextNode("Tillbaka");
     x.setAttribute("class","tcl");
     x.setAttribute("city",cityname);
     x.appendChild(t);
     document.getElementById("testbtn").appendChild(x);
     x.style.visibility="visible";
  
        x.addEventListener("click", requestJSONData);
        x.addEventListener("click", showledinfo);

 for (let i = 0; i < aderalin.length; i++) {
     if (cityname === aderalin[i].city && btn === aderalin[i].id) {
        console.log("funkar2");
            // Referenser till olika egenskaper i vandrings objektet i JSON
         HTMLcode2 += 
         "<h2><b></b> " + aderalin[i].led + "</h2>" + //lägger in namnet på ledet i html strängen
         //console.log(vandring[i].imgurl);
         //"<a herf='" + vandring[i].url+ "'></a>" + //lägger in en kort beskrivning om ledet i html strängen
         
         //"<a href=´Läs mer här" + vandring[i].url  + "</a>"+
         //'<a href="Läs mer>'  + vandring[i].url + '</a>'+
         "<li><b>längd:</b> " + aderalin[i].längd + "</li>" + //lägger in längden på ledet i html strängen
         "<li><b>handikapsanpassat:</b> " + aderalin[i].handikapsanpassat + "</li>" + //lägger in info om handikapsanpassning i ledet i html strängen
         "<li><b>svårighetsnivå:</b> " + aderalin[i].svårighetsnivå + "</li>" + //lägger in ledets svårighetsnivå i html strängen
         "<li><b>parkering:</b> " + aderalin[i].parkering + "</li>"+ //lägger in info om parkering i html strängen
         "<img src='"+aderalin[i].image.url+"'></img>"+
         "<p><b></b> " + aderalin[i].beskrivning + "</p>" + //lägger in en kort beskrivning om ledet i html strängen
         "<a href='"+aderalin[i].link.linkurl+"' target=_blank>Läs mer</a>"+
         //"<button class='"+vandring[i].led+"'>Läs kommentarer</button>"+
         //`<Button class="idk" Type="button" onclick="('Edit', '${vandring[i].id}')">${vandring[i].id}</Button>`
        
         //"<div>'<span id='dots'>...</span>"+vandring[i].kommentarer.kommentar1+'<span id="more>'+"</span></div><button onclick=''id='myBtn'>Read more</button>"+
         "<hr>"
 
         //valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
         
 }
 }
 exdiv.style.marginBottom = "5%";
 exdiv.style.fontSize = "150%";
 valt.innerHTML= HTMLcode2;
 let testdiv=document.getElementsByClassName("hidden");
 testdiv.style.visibility="visible";
 
 }
 function clearcontent(display) {
     display.innerHTML = "";
 }
 
 function showledinfo(){
  ledinfo=document.getElementById("vatteninfo");
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
 var loadFile = function(event) {
     var input = document.getElementById('file');
     
     const numberofFiles = input.files.length;
     console.log(numberofFiles);
     for( i=0;i< numberofFiles; i++){
             //do the upload for each file.
             var image = document.getElementById('laddabild');
             image.src = URL.createObjectURL(event.target.files[0]);
            
             var image2 = document.getElementById('laddabild2');
             image2.src = URL.createObjectURL(event.target.files[1]);
             
             var image3 = document.getElementById('laddabild3');
             image3.src = URL.createObjectURL(event.target.files[2]);	
     }
 
 };
 
 

 function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("mertext");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Läs kommentar";
      btnText.style.fontSize="1.3em";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Göm kommentar";
      btnText.style.fontSize="1.3em";
      moreText.style.display = "inline";
    }
  }

  function Visakommentarruta() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("textruta1");
    var btnText = document.getElementById("runBtn");
    btnText.style.marginLeft = "80%";
    if (dots.style.display === "none") {
      dots.style.display = "flex";
      btnText.innerHTML = "kommentarera";
     btnText.style.fontSize="1.2em";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "kommentarera";
      btnText.style.fontSize="1.2em";
      btnText.style.marginLeft = "80%";
      moreText.style.display = "inline";
      moreText.style.margin="2%";
    }
  }

  function Visakommentarruta2() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("textruta2");
    var btnText = document.getElementById("runBtn2");
    btnText.style.marginLeft = "58%";
    if (dots.style.display === "none") {
      dots.style.display = "flex";
      btnText.innerHTML = "kommentarera";
     btnText.style.fontSize="1.3em";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "kommentarera";
      btnText.style.fontSize="1.3em";
      btnText.style.marginLeft = "58%";
      moreText.style.display = "inline";
      moreText.style.margin="2%";
    }
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
 
     //img.height = 60;
     //img.width = 60;
 
     //testElem.innerHTML += "<br><br>" + city.name + "<br>" + Math.round(city.temp) + "°C" + "<br>";
     //testElem.appendChild(img);
 
 } 