var input1Elem, input1Elem2, resultElem;
var resultElem2;

function init() {
 input1Elem = document.getElementById("input1") ;
 resultElem = document.getElementById("result");
 document.getElementById("runBtn").onclick = hamtainlaggkommentarer;

input1Elem2 = document.getElementById("input2") ;
resultElem2 = document.getElementById("result2");
document.getElementById("runBtn2").onclick = hamtakommentarkommentar;
}
window.onload = init;


function hamtainlaggkommentarer () {
var inlaggkommentar; // Längd i meter

inlaggkommentar = (input1Elem.value);
//input1Elem.value.style.border="2px solid blue"
if (inlaggkommentar.length === 0){
   alert("Fyll i en kommentar");
   return;
   } 
   else {
resultElem.innerHTML += "<div id='extra'><p>Användare</p>" + inlaggkommentar +  "<br></div>" ; 
}
}

function hamtakommentarkommentar () {
   var kommentarkommentar; // Längd i meter
   
   kommentarkommentar = (input1Elem2.value);
   //input1Elem.value.style.border="2px solid blue"
   if (kommentarkommentar.length === 0){
      alert("Fyll i en kommentar");
      return;
      
      } 
      else {
   resultElem2.innerHTML += "<div id='extra'><p>Användare</p>" + kommentarkommentar +  "<br></div>" ;
   console.log(kommentarkommentar.length); 
   }
   }
