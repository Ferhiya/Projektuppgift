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

    getLocalStorage();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     

    function getLocalStorage() { // Funktion för den lokala lagringen

        if (localStorage.bw222fgUserinfo){

        const intryck = localStorage.getItem("vandring+text");

        const utomhus = localStorage.getItem("utomhus+text");

        const adrenalin = localStorage.getItem("adrenalin+text");

        const vatten = localStorage.getItem("vatten+text");
            

        if (intryck === intryck ){
            console.log(intryck);
            removeElem.remove();          
            vandringElem.innerHTML = intryck;
        }    

        if (utomhus === utomhus ){
            console.log(utomhus);
            removeElem2.remove();          
            utomhusElem.innerHTML = utomhus;
        }

        if (adrenalin === adrenalin ){
            console.log(adrenalin);
            removeElem3.remove();          
            adrenalinElem.innerHTML = adrenalin;
        }
        if (vatten === vatten ){
            console.log(vatten);
            removeElem4.remove();          
            vattenElem.innerHTML = vatten;
        }
}  
}
 

