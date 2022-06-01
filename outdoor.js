// Globala variabler
var valt; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var ledinfo;
var exdiv;
var valt2; 
var nyttinlaggElem;
var resultnyttinlagg;


// Initiering av globala variabler och händelsehanterare
function init() {
    valt = document.getElementById("valt");
    knappar = document.getElementsByClassName("knappar");
    display = document.getElementById("vandringslederna");
    ledinfo = document.getElementById("ledinfo");
    valt2 = document.getElementById("valt2");


    for (let i = 0; i < knappar.length; i++) {
        knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", requestBikeData);
        knappar[i].addEventListener("click", showledinfo);
    }

    exdiv = document.getElementById("testdiv");
    document.getElementById("delaBtn2").onclick = skapainlagg;
    nyttinlaggElem = document.getElementById("inputNytt") ;
    resultnyttinlagg = document.getElementById("nyttinlagg");
    //requestData();
    //loggainknappen();
    getLocalStorage();

} // End init
window.addEventListener("load", init);

//-------------------------------------------------------------------------------------------------


// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(e) {
    let id1 = e.target.id;
    let latlng = id1.split(",");

    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", "https://smapi.lnu.se/api/?api_key=p1SSZkZV&controller=activity&method=getfromlatlng&lat=" + latlng[0] + "&lng=" + latlng[1] + "&radius=40kmkm&physical_efforts=HIGH&debug=true", true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
        if (request.readyState == 4) //staus 4=kommunikation klar
            if (request.status == 200) getData(request.responseText) //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
            else valt.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
    };

}//End requestData

// start getData
function getData(response) {
    response = JSON.parse(response)

    let HTMLcode = "";

    for (let i = 0; i < response.payload.length; i++) {
        let hi = response.payload;
        // Referenser till olika egenskaper i vandrings objektet i JSON
        HTMLcode +=
            "<hr>" +
            "<li><b>Namn:</b> " + hi[i].name + "</li>" + 
            "<li><b>Fysisktkrävande:</b> " + hi[i].physical_effort + "</li>" + 
            "<img src='img/" + hi[i].description + ".jpg'></img>" +
            "<p><b>beskrivning:</b> " + hi[i].description + "</p>"
            ;

    }

    valt.innerHTML += HTMLcode; //utskrift av datan i JSON filen
    valt.style.fontSize = "150%";
    valt.style.visibility = "visible";
    valt.style.marginBottom = "5%";
    //document.getElementById("unordered").style.border= "2px solid black";

    clearcontent(display);

} // End getData

function clearcontent(display) {
    display.innerHTML = "";
}
function showledinfo() {
    ledinfo = document.getElementById("ledinfo");
    ledinfo.style.visibility = "visible";
}

//----------------------------------------------------------------------------------------------------------------

//start bike info
function requestBikeData(e) {
    // let id = e.target.id;
    let cityname = e.target.attributes.city.value;
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", "outdoor.json", true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
        if (request.readyState == 4) //staus 4=kommunikation klar
            if (request.status == 200) getBikeData(request.responseText, cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
            else valt2.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
    };

}

function getBikeData(JSONtext, cityname) {
    let bike = JSON.parse(JSONtext).bike;

    let HTMLcode = "";

    let backBTN = document.getElementById("tillknappar");
    backBTN.style.visibility = "visible";
    let backBTN2 = document.getElementById("testbtn");
    backBTN2.innerHTML = "";
    HTMLcode +=
        "<h1>Utomhus aktiviteter i <b>" + cityname + "</b></h1>";

    for (let i = 0; i < bike.length; i++) {

        if (cityname === bike[i].city) {

            // Referenser till olika egenskaper i bikes objektet i JSON
            HTMLcode +=
                "<div id=" + bike[i].city + "-" + bike[i].id + ">" +
                "<hr>" +
                "<h2>" + bike[i].name + "</h2>" +
                "<li><b>Längd:</b> " + bike[i].distance + "</li>" +
                "<img src='" + bike[i].img.url + "'</img>" +
                "<p><b>Beskrivning:</b> " + bike[i].description + "</p>" +
                "<button><a class='gg' href='"+bike[i].link.url+"' target=_blank>Läs mer</button></a>"+
                "</div><br>";
        }
    }

    valt2.innerHTML = HTMLcode;//utskrift av datan i JSON filen
    //li.style.display=" flex";

    for (let i = 0; i < bike.length; i++) {

        if (cityname === bike[i].city) {

            var btnx2 = document.createElement("button");
            btnx2.innerHTML = "Läs kommentar"; 

            const id = document.createAttribute("id");

            id.value = "2";
            btnx2.setAttributeNode(id);

            var body = document.getElementById(bike[i].city + "-" + bike[i].id);
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
                btnx3[i].setAttribute("city", cityname);
                btnx3[i].setAttribute("id", "1");
                btnx3[i].id = i + 1;
            }
        }

        bike[i].butto = btnx2;
        if (btnx2 == bike[i].button) {

            if (btnx2 > bike.length) {
                btnx2.style.visibility = "hidden";
            }
        }
    }

    valt2.style.marginBottom = "2%";
    valt2.style.fontSize = "150%";
    valt2.style.marginBottom = "2%";

    clearcontent(display);

    let btnx = document.getElementsByClassName("btncl");
    for (let i = 0; i < btnx.length; i++) {
        btnx[i].addEventListener("click", function (e) {
            clearcontent(valt);
            requesttest(e);
            visable;

        });
    }
}// End 


function requesttest(e) {
    let cityname = e.target.attributes.city.value;

    let btn = e.target.getAttributeNode("id").value;
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", "outdoor.json", true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
        if (request.readyState == 4) //staus 4=kommunikation klar
            if (request.status == 200) getData2(request.responseText, btn, cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
            else valt2.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
    };

} // End

function getData2(JSONtext, btn, cityname) {
    let bike = JSON.parse(JSONtext).bike;
    let HTMLcode2 = "";
    document.getElementById("har").style.visibility = "visible";
    document.getElementById("head").style.visibility = "visible";
    let backBTN = document.getElementById("tillknappar");
    backBTN.style.visibility = "hidden";
    let backBTN2 = document.getElementById("testbtn");
    backBTN2.style.visibility = "visible";
    backBTN2.addEventListener("click",hide);
    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Tillbaka");
    x.setAttribute("class", "tcl");
    x.setAttribute("city", cityname);
    x.appendChild(t);
    document.getElementById("testbtn").appendChild(x);
    x.style.visibility = "visible";

    x.addEventListener("click", requestData);
    x.addEventListener("click", requestBikeData);
    x.addEventListener("click", showledinfo);

    HTMLcode2+="<h1>Utomhus aktiviteter i <b>" + cityname + "</b></h1>";

    for (let i = 0; i < bike.length; i++) {
        if (cityname === bike[i].city && btn === bike[i].id) {
            HTMLcode2 +=
                "<div id=" + bike[i].city + "-" + bike[i].id + ">" +
                "<hr>" +
                "<h2>" + bike[i].name + "</h2>" +
                "<li><b>Längd:</b> " + bike[i].distance + "</li>" +
                "<img src='" + bike[i].img.url + "'</img>" +
                "<p><b>Beskrivning:</b> " + bike[i].description + "</p>" +
                "<button><a class='gg' href='"+bike[i].link.url+"' target=_blank>Läs mer</button></a>"+
                "</div><br><hr>";


        }
    }
    valt2.innerHTML = HTMLcode2;
    valt2.style.height = "50%";

    const hide2 = localStorage.getItem("hidevalue");

    let kommentarbtn=document.getElementById("kommentarbtn");;
    let commentdiv2=document.getElementById("testdiv");

if (localStorage.getItem("hidevalue") ){       
     kommentarbtn.style.visibility="visible";
    document.getElementById("testdiv").style.visibility="visible";
}   
else{
    kommentarbtn.style.visibility="hidden";
    commentdiv2.style.visibility ="hidden";
}
    

}//end getData2
function hide(){
    let kommentar1=document.getElementById("head");
    kommentar1.style.visibility="hidden";
    
    let kommentar2=document.getElementById("har");
    kommentar2.style.visibility="hidden";

    let nykommentar=document.getElementById("nyttinlagg");

    nykommentar.style.visibility="hidden";
    commentdiv2=document.getElementById("testdiv")
    commentdiv2.style.visibility="hidden";
    document.getElementById("kommentarbtn").style.visibility="hidden";
    const hide2 = localStorage.getItem("hidevalue");

    let kommentarbtn=document.getElementById("kommentarbtn");;
    let commentdiv2=document.getElementById("testdiv");

if (localStorage.getItem("hidevalue") ){       
     kommentarbtn.style.visibility="visible";
    document.getElementById("testdiv").style.visibility="visible";
}   
else{
    kommentarbtn.style.visibility="hidden";
    commentdiv2.style.visibility ="hidden";
}

}//end hide

function hide(){
    let kommentar1=document.getElementById("head");
    kommentar1.style.visibility="hidden";
    
    let kommentar2=document.getElementById("har");
    kommentar2.style.visibility="hidden";

    let nykommentar=document.getElementById("nyttinlagg");

    nykommentar.style.visibility="hidden";
    commentdiv2=document.getElementById("testdiv")
    commentdiv2.style.visibility="hidden";
    document.getElementById("kommentarbtn").style.visibility="hidden";

}//end hide

function visable(){
    let kommentar1=document.getElementById("head");
    kommentar1.style.visibility="visible";
    
    let kommentar2=document.getElementById("andra-inlagg");
    kommentar2.style.visibility="visible";

    let nykommentar=document.getElementById("nyttinlagg");

    nykommentar.style.visibility="visible";

}//end visable


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
        moreText.style.margin = "2%";
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
        moreText.style.margin = "2%";
    }
}

function lasmer() {
    var dots2 = document.getElementById("dots4");
    var moreText = document.getElementById("mertext2");
    var btnText = document.getElementById("btn2");
    btnText.style.marginBottom="3%";

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
}//end läs mer 1


function lasmer2() {
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
}//end läs mer 2

function Visakommentarruta() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("textruta1");
    var btnText = document.getElementById("runBtn");
    if (dots.style.display === "none") {
        dots.style.display = "flex";
        btnText.innerHTML = "kommentarera";
        btnText.style.fontSize = "1.2em";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "kommentarera";
        btnText.style.fontSize = "1.2em";
        moreText.style.display = "inline";
        moreText.style.margin = "2%";
    }
}//end show commentbox 1

function Visakommentarruta2() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("textruta2");
    var btnText = document.getElementById("runBtn2");
    if (dots.style.display === "none") {
        dots.style.display = "flex";
        btnText.innerHTML = "kommentarera";
        btnText.style.fontSize = "1.3em";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "kommentarera";
        btnText.style.fontSize = "1.3em";
        moreText.style.display = "inline";
        moreText.style.margin = "2%";
    }
}//end show commentbox 2

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

console.log("hidden");
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
       
      
        hideElem[0].style.height = "10px";
        showElem[0].style.visibility = 'visible';
    }

}