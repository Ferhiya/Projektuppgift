let hideElem;

function init() {  // Allting som ska laddas in före sidan visas  
    getLocalStorage();
    //loggainknappen();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
function getLocalStorage() {// Funktion för den lokala lagringen

        const hide = localStorage.getItem("hidevalue");
        let hideElem =  document.getElementsByClassName("hidden");  
        let showElem = document.getElementsByClassName("show");

    if (localStorage.getItem("hidevalue") ){       
        hideElem[0].style.visibility = 'visible';
        hideElem[1].style.visibility = 'visible';
        showElem[0].style.visibility = 'hidden';
        

    }else{
        hideElem[0].style.visibility = 'hidden';
        hideElem[1].style.visibility = 'hidden';
        hideElem[0].style.height = "10px";
        showElem[0].style.visibility = 'visible';
    }

    }


        