let x;
let y;
let placeholder;
let localElem;
let button;
let valjElem;
let val;

    function init() {  // Allting som ska laddas in före sidan visas
    button = document.getElementById("publicera-btn");
    button.addEventListener("click", myFunction);
    valjElem =document.getElementById("valj-forum");

    valjElem.addEventListener("click", valet);
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     
function valet(){
//val = valjElem.options[e.selectedIndex].text;
val= valjElem.options[valjElem.selectedIndex].value;
console.log(val);
}

function myFunction() {

   // Koden för det privata inlägget
   
     x = document.getElementById("rubrik").value;
     
     y = document.getElementById("texten").value;
     
     container = "<a href='/Forum/detnyainlägget/användarensinlägg.html'><b>" + x + "</b></a> <h3><i>" + "</h3></i>" + "<b>" +  "Användarn" +"</b>" + "<br>" + y;

     egnainlagget = "<a href='/Forum/detnyainlägget/användarensinlägg.html'><b>" + x + "</b></a> <h3><i>" + "</h3></i>" + "<b>" +  "Användarn" +"</b>" + "<br>";

     localStorage.setItem('texten', container);

     localStorage.setItem('egnainlagget', egnainlagget);

console.log("container");

// Koden för inlägget

if (val === undefined){
alert("Välj forum innan du publicerar");
return;
} 


if (val === "vandring"){
vandringtext =  "<a href='/Forum/detnyainlägget/användarensinlägg.html'><b>" + x + "</b></a>"  + "<br>" +  "Användaren namn" + "</div>" ; 
localStorage.setItem('vandring+text', vandringtext); 
}  


if (val === "utomhus"){
utomhustext = "<a href='/Forum/detnyainlägget/användin-utomhus.html'><b>" + x + "</b></a>"  + "<br>" +  "Användaren namn" + "</div>" ; 
   localStorage.setItem('utomhus+text', utomhustext); 
}  

if (val === "adrenalin"){
   adrenalintext = "<a href='/Forum/detnyainlägget/användin-adrenalin.html'><b>" + x + "</b></a>"  + "<br>" +  "Användaren namn" + "</div>" ; 
   localStorage.setItem('adrenalin+text', adrenalintext); 
   
   } 

if (val === "vattensport"){
   vattensporttext = "<a href='/Forum/detnyainlägget/användin-vatten.html'><b>" + x + "</b></a>"  + "<br>" +  "Användaren namn" + "</div>" ; 
   localStorage.setItem('vatten+text', vattensporttext); 
} 
window.location.href = "/Forum/detnyainlägget/användarensinlägg.html";
}
   


 