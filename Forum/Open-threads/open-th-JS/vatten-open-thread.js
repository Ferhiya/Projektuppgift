
function init() {  // Allting som ska laddas in före sidan visas
    inlagget = document.getElementById("open-thread-visa-inlagget");

    hamtavatten();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     

    function hamtavatten() { // Funktion för den lokala lagringen

        const intryck = localStorage.getItem("vatten+text");
            

        if (localStorage.getItem("vatten+text") ){         
            inlagget.innerHTML = intryck;
        }    
}