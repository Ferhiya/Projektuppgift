var egenElem;

function init() {  // Allting som ska laddas in före sidan visas
    egenElem = document.getElementById("egna-inlagg");


    getLocalStorage();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas


function getLocalStorage() { // Funktion för den lokala lagringen
    const egetinlagg = localStorage.getItem("egnainlagget");
    if ( localStorage.getItem("texten") ){
    egenElem.innerHTML = egetinlagg;
        
  
}    
}    