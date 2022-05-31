// Globala variabler
var valt2; //refrens till div elemetet där info om vandrignsledet ska visas
var knappar; //refens till tryckt knapp
var display;
var outdoorInfo;
var exdiv;


// Initiering av globala variabler och händelsehanterare
function init() {
    valt2 = document.getElementById("valt2");
    knappar = document.getElementsByClassName("knappar");
    display = document.getElementById("utomhus");
    outdoorInfo = document.getElementById("outdoorinfo");


    for (let i = 0; i < knappar.length; i++) {
        knappar[i].addEventListener("click", requestData);
        knappar[i].addEventListener("click", requestBikeData);
        knappar[i].addEventListener("click", showledinfo);
    }

    exdiv = document.getElementById("testdiv");

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
            else valt2.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
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
            "<li><b>Namn:</b> " + hi[i].name + "</li>" + //lägger in namnet på ledet i html strängen
            "<li><b>Fysisktkrävande:</b> " + hi[i].physical_effort + "</li>" + //lägger in längden på ledet i html strängen
            "<img src='img/" + hi[i].description + ".jpg'></img>" +
            "<p><b>beskrivning:</b> " + hi[i].description + "</p>" + //lägger in info om handikapsanpassning i ledet i html strängen
            //lägger in en kort beskrivning om 
            "<hr>"
            ;
        // valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen
    }

    valt2.innerHTML += HTMLcode; //utskrift av datan i JSON filen
    valt2.style.fontSize = "150%";
    valt2.style.visibility = "visible";
    valt2.style.marginBottom = "5%";
    //document.getElementById("unordered").style.border= "2px solid black";

    clearcontent(display);

} // End getData

//----------------------------------------------------------------------------------------------------------------

//start bike info
function requestBikeData(e) {
    let cityname = e.target.attributes.city.value;
    let request = new XMLHttpRequest();
    request.open("GET", "outdoor.json", true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4)
            if (request.status == 200) getBikeData(request.responseText, cityname)
            else valt2.innerHTML = "Den begärda filen finns inte.";
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

            HTMLcode +=
                "<div id=" + bike[i].city + "-" + bike[i].id + ">" +
                "<hr>" +
                "<h2>" + bike[i].name + "</h2>" +
                "<li><b>Längd:</b> " + bike[i].distance + "</li>" +
                "<img src='" + bike[i].img.url + "'</img>" +
                "<p><b>Beskrivning:</b> " + bike[i].description + "</p>" +
                "<a href=" + bike[i].link.url + " target='_blank'>Läs mer</a>" +
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

            // Set the value of the class attribute:
            id.value = "2";
            btnx2.setAttributeNode(id);

            var body = document.getElementById(bike[i].city + "-" + bike[i].id);
            body.appendChild(btnx2);
            body.append(btnx2);
            btnx2.setAttribute("class", "btncl");

            btnx2.style.fontSize = "100%";
            btnx2.style.style
            btnx2.style.width = "130px";
            btnx2.style.margin = "0.5%";
            btnx2.style.color = "red";

            let btnx3 = document.getElementsByClassName("btncl");
            for (let i = 0; i < btnx3.length; i++) {
                //city classen
                btnx3[i].setAttribute("city", cityname);
                btnx3[i].setAttribute("id", "1");
                btnx3[i].id = i + 1;
            }

        }

        bike[i].butto = btnx2;

        if (btnx2 == bike[i].button) {

           if(btnx2 > bike.length){
            btnx2.style.visibility="hidden";
           }
        }
    }

    valt2.style.marginBottom = "2%";
    valt2.style.fontSize = "150%";
    valt2.style.marginBottom = "2%";

    clearcontent(display);

    let btnx = document.getElementsByClassName("btncl");
    for (let i = 0; i < btnx.length; i++) {
        btnx[i].addEventListener("click", function(e) {
            clearcontent(valt2);
            requesttest(e);

        });

    }
}// End 


function requesttest(e) {
    console.log(e.target)
    let cityname = e.target.attributes.city.value;

    let btn = e.target.getAttributeNode("id").value;
    console.log(btn);
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", "outdoor.json", true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () { //funktion för att avläsa kommunikation i filenhämtningen
        if (request.readyState == 4) //staus 4=kommunikation klar
            if (request.status == 200) getData2(request.responseText, btn, cityname); //Status ok=filen finns. responseText=för att man hämtar en JSON fil.
            else valt.innerHTML = "Den begärda filen finns inte."; //error msg när begärd fil inte finns
    };

} // End

function getData2(JSONtext, btn, cityname) {
    let bike = JSON.parse(JSONtext).bike;
    let HTMLcode2 = "";

    document.getElementById("har").style.visibility = "visible";
    document.getElementById("head").style.visibility = "visible";
    document.getElementById("testdiv").style.visibility = "visible";

    let backBTN = document.getElementById("tillknappar");
    backBTN.style.visibility = "hidden";
    let backBTN2 = document.getElementById("testbtn");
    backBTN2.style.visibility = "visible";


    var x = document.createElement("BUTTON");
    var t = document.createTextNode("Tillbaka");
    x.setAttribute("class", "tcl");
    x.setAttribute("city", cityname);
    x.appendChild(t);
    document.getElementById("testbtn").appendChild(x);
    x.style.visibility = "visible";

    x.addEventListener("click", requestBikeData);
    x.addEventListener("click", showledinfo);

    for (let i = 0; i < bike.length; i++) {
        if (cityname === bike[i].city && btn === bike[i].id) {
            HTMLcode2 +=
                "<h2> " + bike[i].name + "</h2>" +
                "<li><b>Längd:</b> " + bike[i].distance + "</li>" +
                "<img src='" + bike[i].img.url + "'</img>" +
                "<p><b>Beskrivning:</b> " + bike[i].description + "</p>" +
                "<a href=" + bike[i].link.url + " target='_blank'>Läs mer </a>";

            //valt.innerHTML = HTMLcode; //utskrift av datan i JSON filen

        }
    }
    exdiv.style.marginBottom = "5%";
    exdiv.style.fontSize = "150%";
    valt2.innerHTML= HTMLcode2;
    let testdiv=document.getElementsByClassName("hidden");
    testdiv.style.visibility="visible";

}

function clearcontent(display) {
    display.innerHTML = "";
}

function showledinfo() {
    outdoorInfo = document.getElementById("outdoorinfo");
    outdoorInfo.style.visibility = "visible";
}

function clearcontent(valt2) {
    valt2.innerHTML = "";
}

function showimgbox() {
    let imgbox = document.getElementById("läggtillbider");
    imgbox.style.visibility = "hidden";
    img.height = 60;
    img.width = 60;
    let imgrubrik = document.getElementById("bildrubrik");
    imgrubrik.addEventListener("click").style.visibility = "visible";

}

var loadFile = function (event) {
    var input = document.getElementById('file');

    const numberofFiles = input.files.length;
    for (i = 0; i < numberofFiles; i++) {
        //do the upload for each file.
        var image = document.getElementById('laddabild');
        image.src = URL.createObjectURL(event.target.files[0]);

        var image2 = document.getElementById('laddabild2');
        image2.src = URL.createObjectURL(event.target.files[1]);

        var image3 = document.getElementById('laddabild3');
        image3.src = URL.createObjectURL(event.target.files[2]);
    }

}

function myFunction() {
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