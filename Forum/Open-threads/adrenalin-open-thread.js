
function init() {  // Allting som ska laddas in före sidan visas
    inlagget = document.getElementById("open-thread-visa-inlagget");

    getLocalStorage();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     

    function getLocalStorage() { // Funktion för den lokala lagringen

        const intryck = localStorage.getItem("adrenalin+text");
            

        if (localStorage.getItem("adrenalin+text") ){         
            inlagget.innerHTML = intryck;
        }    
}