let hideElem;
let inloggningknapp;


function init() {  // Allting som ska laddas in före sidan visas
hideElem = document.getElementById("hide");  
inloggningknapp = document.getElementById("button-loggain");
inloggningknapp.addEventListener("click", getLocalStorage);

    }
    window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
 
    
 
 function getLocalStorage () {

    hide = "hide";
    localStorage.setItem('hidevalue', hide);
console.log("hide");

window.location.href = "/index.html";
 }
 
