let hideElem;
let skapakonto;

function init() {  // Allting som ska laddas in före sidan visas  
    hidecreateoption();
    
    //loggainknappen();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
function hidecreateoption() {// Funktion för den lokala lagringen

        const hide = localStorage.getItem("hidevalue");
        let hideElem =  document.getElementsByClassName("hidden");  
        

    if (localStorage.getItem("hidevalue") ){          
        hideElem[0].style.visibility = 'visible';
       


    }else{
        hideElem[0].style.visibility = 'hidden';
        hideElem[0].style.height = "10px";
        console.log("hej");
    }
loggainknappen();
    }


    
function loggainknappen() {
let showElem = document.getElementsByClassName("show");


if (localStorage.getItem("hidevalue") ){          
        showElem[0].style.visibility = 'hidden';
      
    }else{
        showElem[0].style.visibility = 'visible';
        
    }
    hideskapakonto();
}

function hideskapakonto() {
skapakonto = document.getElementById("hide-skapatrad")

    if (localStorage.getItem("hidevalue") ){          
        skapakonto.style.visibility = 'hidden';
      skapakonto.style.height= "0px";
    }
}