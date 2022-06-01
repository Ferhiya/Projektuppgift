// Globala variabler
var myApiKey = "385c01f06e7fc079126bc42be657e5d6";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
//var skicka; //knapp för att lägga till kommentar
var valt; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var testknapp;
var ledinfo;
var exdiv;
var check;
var nyttinlaggElem;
var resultnyttinlagg;

// Initiering av globala variabler och händelsehanterare
function init() {
    flickrImgElem = document.getElementById("flickrImg");
    valt = document.getElementById("valt");
    knappar = document.getElementsByClassName("knappar");
    display = document.getElementById("vandringslederna");
    check = document.getElementsByClassName("check");
    ledinfo = document.getElementById("ledinfo");

    for (let i = 0; i < knappar.length; i++) {
        knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", showledinfo);

    }



    exdiv = document.getElementById("testdiv");

    document.getElementById("delaBtn2").onclick = skapainlagg;
    nyttinlaggElem = document.getElementById("inputNytt") ;
    resultnyttinlagg = document.getElementById("nyttinlagg");
    //requestData();
    getLocalStorage();
    //loggainknappen();

} // End init
window.addEventListener("load", init);

// -----------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------

// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(e) {
    // let id = e.target.id;
    let cityname = e.target.attributes.city.value;
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", "vandring1.json", true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
        if (request.readyState == 4) //staus 4=kommunikation klar
            if (request.status == 200) getData(request.responseText, cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
            else valt.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
    };


}

// Tolkar koden och skriv ut den på önskad form
function getData(JSONtext, cityname) {
    let vandring = JSON.parse(JSONtext).vandring; //hämtar arryen med vandringsledernas data.
    let HTMLcode = "";
    let backBTN = document.getElementById("tillknappar");
    backBTN.style.visibility = "visible";
    let backBTN2 = document.getElementById("testbtn");
    //backBTN2.style.visibility="hidden";
    backBTN2.innerHTML = "";
    HTMLcode +=
        "<h1>Vandringsleder i <b>" + cityname + "</b></h1>" + "<hr>";

    for (let i = 0; i < vandring.length; i++) {

        if (cityname === vandring[i].city) {

           	// Referenser till olika egenskaper i vandrings objektet i JSON
			HTMLcode += 
            "<div id="+ vandring[i].city + "-" + vandring[i].id +">" +
            "<h2><b></b> " + vandring[i].led + "</h2>" + //lägger in namnet på ledet i html strängen
			"<li><b>längd:</b> " + vandring[i].längd + "</li>" + //lägger in längden på ledet i html strängen
			"<li><b>handikapsanpassat:</b> " + vandring[i].handikapsanpassat + "</li>" + //lägger in info om handikapsanpassning i ledet i html strängen
			"<li><b>svårighetsnivå:</b> " + vandring[i].svårighetsnivå + "</li>" + //lägger in ledets svårighetsnivå i html strängen
			"<li><b>parkering:</b> " + vandring[i].parkering + "</li>"+ //lägger in info om parkering i html strängen
			"<img src='"+vandring[i].image.url+"'></img>"+
			"<p><b></b> " + vandring[i].beskrivning + "</p>" + //lägger in en kort beskrivning om ledet i html strängen
            "<button><a class='gg' href='"+vandring[i].link.linkurl+"' target=_blank>Läs mer</button></a>"+
			"</div><hr>"   

        }
          
    }

    valt.innerHTML = HTMLcode;//utskrift av datan i JSON filen
    //li.style.display=" flex";
    for (let i = 0; i < vandring.length; i++) {

        if (cityname === vandring[i].city) {

    var btnx2 = document.createElement("button");
            btnx2.innerHTML = "Läs kommentar"; 

            const id = document.createAttribute("id");

            id.value = "2";
            btnx2.setAttributeNode(id);

            var body = document.getElementById(vandring[i].city + "-" + vandring[i].id);
            body.appendChild(btnx2);
            body.append(btnx2);
            btnx2.setAttribute("class", "btncl");

            btnx2.style.fontSize = "1.5rem";
            btnx2.style.width = "200px";
            btnx2.style.marginLeft = "5%";
            btnx2.style.marginTop ="5%";
            btnx2.style.marginBottom ="2%";

            let btnx3 = document.getElementsByClassName("btncl");
            for (let i = 0; i < btnx3.length; i++) {
                //city classen
                btnx3[i].setAttribute("city", cityname);
                btnx3[i].setAttribute("id", "1");
                btnx3[i].id = i + 1;
            }

        }

        vandring[i].butto = btnx2;
        if (btnx2 == vandring[i].button) {

           if(btnx2 > vandring.length){
            btnx2.style.visibility="hidden";
           }
        }
    
}
     
        valt.style.marginBottom = "2%";
        valt.style.fontSize = "150%";
        valt.style.marginBottom = "2%";
    clearcontent(display);

let btnx=document.getElementsByClassName("btncl");
for (let i = 0; i < btnx.length; i++) {
    btnx[i].addEventListener ("click", function(e) {
        clearcontent(valt);
        requesttest(e);
        testvisable;
       
      });
    
}


} // End getData
function requesttest(e) { 
    let cityname = e.target.attributes.city.value;
    
    let btn=e.target.getAttributeNode("id").value;
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
    let HTMLcode2 = "";
    document.getElementById("har").style.visibility = "visible";
    document.getElementById("head").style.visibility = "visible";
    //document.getElementById("testdiv").style.visibility = "visible";
    let backBTN = document.getElementById("tillknappar");
    backBTN.style.visibility = "hidden";
    let backBTN2 = document.getElementById("testbtn");
    backBTN2.addEventListener("click",testhide);
    backBTN2.style.visibility = "visible";

    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Tillbaka");
    x.setAttribute("class", "tcl");
    x.setAttribute("city", cityname);
    x.appendChild(t);
    document.getElementById("testbtn").appendChild(x);
    x.style.visibility="visible";
 
       x.addEventListener("click", requestData);
       x.addEventListener("click", showledinfo);
  
for (let i = 0; i < vandring.length; i++) {
    if (cityname === vandring[i].city && btn === vandring[i].id) {
        HTMLcode2 += 
        "<h2><b></b> " + vandring[i].led + "</h2>" + //lägger in namnet på ledet i html strängen
        "<li><b>längd:</b> " + vandring[i].längd + "</li>" + //lägger in längden på ledet i html strängen
        "<li><b>handikapsanpassat:</b> " + vandring[i].handikapsanpassat + "</li>" + //lägger in info om handikapsanpassning i ledet i html strängen
        "<li><b>svårighetsnivå:</b> " + vandring[i].svårighetsnivå + "</li>" + //lägger in ledets svårighetsnivå i html strängen
        "<li><b>parkering:</b> " + vandring[i].parkering + "</li>"+ //lägger in info om parkering i html strängen
        "<img src='"+vandring[i].image.url+"'></img>"+
        "<p><b></b> " + vandring[i].beskrivning + "</p>" + //lägger in en kort beskrivning om ledet i html strängen
        "<button><a class='gg' href='"+vandring[i].link.linkurl+"' target=_blank>Läs mer</button></a>"+
        "<hr>"
     
}
}

valt.innerHTML= HTMLcode2;
valt.style.height="50%";

document.getElementById("inputNytt").value = "";


}//end

function testhide(){
    let kommentar1=document.getElementById("head");
    kommentar1.style.visibility="hidden";
    
    let kommentar2=document.getElementById("har");
    kommentar2.style.visibility="hidden";

    let nykommentar=document.getElementById("nyttinlagg");

    nykommentar.style.visibility="hidden";

}

function testvisable(){
    let kommentar1=document.getElementById("head");
    kommentar1.style.visibility="visible";
    
    let kommentar2=document.getElementById("andra-inlagg");
    kommentar2.style.visibility="visible";

    let nykommentar=document.getElementById("nyttinlagg");

    nykommentar.style.visibility="visible";

}

function clearcontent(display) {
    display.innerHTML = "";
}

function showledinfo() {
    ledinfo.style.visibility = "visible";

}

function clearcontent(valt) {
    valt.innerHTML = "";
}

function showimgbox() {
    let imgbox = document.getElementById("läggtillbider");
    imgbox.style.visibility = "hidden";
    img.height = 60;
    img.width = 60;
    let imgrubrik = document.getElementById("bildrubrik");
    imgrubrik.addEventListener("click").style.visibility = "vissable";

}


function myFunction() {
    var dots2 = document.getElementById("dots4");
    var moreText = document.getElementById("mertext2");
    var btnText = document.getElementById("btn2");

    if (dots2.style.display === "none") {
        dots2.style.display = "inline";
        btnText.innerHTML = "Läs kommentar";
        btnText.style.fontSize = "1.3em";
        moreText.style.display = "none";
    } else {
        dots2.style.display = "none";
        btnText.innerHTML = "Göm kommentar";
        btnText.style.fontSize = "1.3em";
        moreText.style.display = "inline";
    }
}


function myFunction2() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("mertext");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Läs kommentar";
        btnText.style.fontSize = "1.3em";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Göm kommentar";
        btnText.style.fontSize = "1.3em";
        moreText.style.display = "inline";
    }
}

function Visakommentarruta() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("textruta1");
    var btnText = document.getElementById("runBtn");
    if (dots.style.display === "none") {
      dots.style.display = "flex";
      btnText.innerHTML = "post";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "post";
      moreText.style.display = "inline";
      moreText.style.margin="2%";
    }
}

  function Visakommentarruta2() {
    var dots = document.getElementById("dots2");
    var moreText = document.getElementById("textruta2");
    var btnText = document.getElementById("runBtn2");
    if (dots.style.display === "none") {
      dots.style.display = "flex";
      btnText.innerHTML = "post";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "post";
      moreText.style.display = "inline";
      moreText.style.margin="2%";
    }
}


function test (event){
    var input = document.getElementById('file');
    const numberofFiles = input.files.length;
	for( i=0;i< numberofFiles; i++){
			//do the upload for each file.
			var image = document.getElementById('laddabild');
	        image.src = URL.createObjectURL(event.target.files[0]);
           
            var image2 = document.getElementById('laddabild2');
            image2.src = URL.createObjectURL(event.target.files[1]);
            
            var image3 = document.getElementById('laddabild3');
            image3.src = URL.createObjectURL(event.target.files[2]);
    
}
  
}

function skapainlagg () {
    var bildtest=document.getElementById("nyttinlagg");
    var kommentarkommentar; // Längd i meter
    kommentarkommentar = (nyttinlaggElem.value);
    var laddabild = document.getElementById('laddabild');
    var laddabild2 = document.getElementById('laddabild2');
    var laddabild3 = document.getElementById('laddabild3');
    let img=(bildtest.src=(laddabild));
    let img2=(bildtest.src=(laddabild2));
    let img3=(bildtest.src=(laddabild3));
    //bildtest=URL.createObjectURL(img.src);
    console.log(img);
    //input1Elem.value.style.border="2px solid blue"
    if (kommentarkommentar.length === 0){
       alert("Fyll i en kommentar");
       return;
       
       } 
       else {
        resultnyttinlagg.innerHTML += "<div id='nyttinagg'><h3><b>Jane Doe</b></h3>" + kommentarkommentar +"<div id='imgdiv'> <div id='imgitem'> <img id='newimg' src='" + img.src + "'></img></div>" + " <div id='imgdiv'> <img id='newimg2' src='" + img2.src + "'></img></div>"+ "<div id='imgdiv'> <img id='newimg3' src='" + img3.src + "'></img></div> </div>" +"<br></div>";
        console.log("<img src='" + img.src + "'></img>"); 
    }

    }

    //hide funktionen//
    var hideElem;
function getLocalStorage() {// Funktion för den lokala lagringen

        const hide = localStorage.getItem("hidevalue");
        hideElem =  document.getElementsByClassName("hidden");  
        let showElem = document.getElementsByClassName("show");

    if (localStorage.getItem("hidevalue") ){       
        hideElem[0].style.visibility = 'visible';
        hideElem[1].style.visibility = 'visible';
        showElem[0].style.visibility = 'hidden';
        

    }else{
        hideElem[0].style.visibility = 'hidden';
        hideElem[1].style.visibility = 'hidden';
        hideElem[2].style.visibility = 'hidden';
        hideElem[3].style.visibility = 'hidden';
        hideElem[4].style.visibility = 'hidden';
      
        hideElem[0].style.height = "10px";
        showElem[0].style.visibility = 'visible';
    }

}



