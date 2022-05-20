let egenElem1;
let egenElem2;
let egenElem3;
let egenElem4;

function init() {  // Allting som ska laddas in före sidan visas
    egenElem1 = document.getElementById("egna-inlagg-vandring");
    egenElem2 = document.getElementById("egna-inlagg-utomhus");
    egenElem3 = document.getElementById("egna-inlagg-adrenalin");
    egenElem4 = document.getElementById("egna-inlagg-vatten");
    
    getLocalStorage();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
function getLocalStorage() { // Funktion för den lokala lagringen


    if ( localStorage.getItem("vandring+text") ){
    const intryck = localStorage.getItem("vandring+text");

    const utomhus = localStorage.getItem("utomhus+text");

    const adrenalin = localStorage.getItem("adrenalin+text");

    const vatten = localStorage.getItem("vatten+text");
        

    if (localStorage.getItem("vandring+text") ){          
        egenElem1.innerHTML = intryck;

    }else{
    egenElem4.innerHTML ="Inga trådar ännu."
    }

    if (localStorage.getItem("utomhus+text") ){          
        egenElem2.innerHTML = utomhus;
    }else{
    egenElem4.innerHTML ="Inga trådar ännu."
    }

    if (localStorage.getItem("adrenalin+text") ){        
        egenElem3.innerHTML = adrenalin;

    }else{
        egenElem4.innerHTML ="Inga trådar ännu."
        }

    if (localStorage.getItem("vatten+text") ){         
        egenElem4.innerHTML = vatten;

         }else{
        egenElem4.innerHTML ="Inga trådar ännu."
        }
    }
}  



