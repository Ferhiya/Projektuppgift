var input1Elem, input1Elem2, resultElem;
var resultElem2;

function init() {
 input1Elem = document.getElementById("input1") ;
 resultElem = document.getElementById("result");
 document.getElementById("runBtn").onclick = areaCalculations;

input1Elem2 = document.getElementById("input2") ;
resultElem2 = document.getElementById("result2");
document.getElementById("runBtn2").onclick = areaCalculations2;
}
window.onload = init;


function areaCalculations () {
var length; // Längd i meter
var area; // Yta i kvadratmeter

length = (input1Elem.value);
//input1Elem.value.style.border="2px solid blue"
area = length; // Rektangelns area
resultElem.innerHTML += "<div id='extra'><p>Användare</p>" + area +  "<br></div>" ; 
console.log(resultElem.innerHTML);

}


function areaCalculations2() {
   var comment; // Längd i meter
   var area2; // Yta i kvadratmeter
   
   comment = (input1Elem.value);
   //input1Elem.value.style.border="2px solid blue"
   area2 = comment; // Rektangelns area
   resultElem2.innerHTML += "<div id='extra'><p>Användare</p>" + area2 +  "<br></div>" ; 
   console.log(resultElem.innerHTML);
   
}   
   