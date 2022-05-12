let textElem;
var input1Elem, input1Elem2, resultElem;
var resultElem2;

    function init() {  // Allting som ska laddas in före sidan visas
      input1Elem = document.getElementById("input1") ;
      resultElem = document.getElementById("result");
      document.getElementById("runBtn").onclick = areaCalculations;
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

        var input1Elem, input1Elem2, resultElem;
var resultElem2;



function areaCalculations () {
var kommentar; // Kommentarens värde
kommentar = (input1Elem.value);
resultElem.innerHTML += "<div id='extra'><p>Användare</p>" + kommentar +  "<br></div>" ; 

}

