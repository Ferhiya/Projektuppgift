let textElem;


    function init() {  // Allting som ska laddas in före sidan visas
    
    textElem =document.getElementById("inlagg");
    getLocalStorage();
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     
        function getLocalStorage() { // Funktion för den lokala lagringen
       
            
            if (localStorage.bw222fgUserinfo){
              const innehall = localStorage.getItem("texten");
              console.log(innehall);
              
           textElem.innerHTML = innehall;
             
                
        }
        }