
function init() {  // Allting som ska laddas in före sidan visas
    inlagget = document.getElementById("open-thread-visa-inlagget");

    hamtautomhus();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     

    function hamtautomhus() { // Funktion för den lokala lagringen

        const intryck = localStorage.getItem("utomhus+text");
            

        if (localStorage.getItem("utomhus+text") ){         
            inlagget.innerHTML = intryck;
        }    
}