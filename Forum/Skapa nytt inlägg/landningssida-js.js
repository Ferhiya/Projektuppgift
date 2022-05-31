// Om det finns ett id och rubrik sparade i local storage, hämta det och visa det under respektive kategori
let vandringElem;
let utomhusElem;

function init() {  // Allting som ska laddas in före sidan visas
    vandringElem = document.getElementById("vandring-visa-inlagg");
    utomhusElem = document.getElementById("utomhus-visa-inlagg");
    adrenalinElem = document.getElementById("adrenalin-visa-inlagg");
    vattenElem = document.getElementById("vatten-visa-inlagg");
    removeElem = document.getElementById("remove");
    removeElem2 = document.getElementById("remove2");
    removeElem3 = document.getElementById("remove3");
    removeElem4 = document.getElementById("remove4");

    hamtalocal();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     

    function hamtalocal() { // Funktion för den lokala lagringen


const intryck = localStorage.getItem("vandring+text");

const utomhus = localStorage.getItem("utomhus+text");

const adrenalin = localStorage.getItem("adrenalin+text");

const vatten = localStorage.getItem("vatten+text");
        

        if (localStorage.getItem("vandring+text") ){
            removeElem.remove();          
            vandringElem.innerHTML = intryck;
            vandringElem.style.height ="70px";
            
        }    

        if (localStorage.getItem("utomhus+text") ){
            removeElem2.remove();          
            utomhusElem.innerHTML = utomhus;
            utomhusElem.style.height ="60px";
        }

        if (localStorage.getItem("adrenalin+text") ){
            removeElem3.remove();          
            adrenalinElem.innerHTML = adrenalin;
            adrenalinElem.style.height ="70px";
        }
        if (localStorage.getItem("vatten+text") ){
            removeElem4.remove();          
            vattenElem.innerHTML = vatten;
            vattenElem.style.height ="50px";
        }
}  

 

