let textElem;
var input1Elem;
var resultElem;
var adrenalin;
var headbild;

function init() {  // Allting som ska laddas in före sidan visas
   input1Elem = document.getElementById("input1") ;
   resultElem = document.getElementById("result");
   document.getElementById("runBtn").onclick = areaCalculations;
   textElem =document.getElementById("inlagg");
   headbild = document.getElementById("head");
   integetlocalstorage();
   bildknappen();
   }
   window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas

   function integetlocalstorage() { // Funktion för den lokala lagringen

   const innehall = localStorage.getItem("texten");
   
   
   textElem.innerHTML = innehall;  
   }

function areaCalculations () {

   var kommentar; // Kommentarens värde
kommentar = (input1Elem.value); 


if (kommentar.length === 0){
alert("Fyll i en kommentar");
return;

} 
else {
resultElem.innerHTML += "<div id='extra'><p>Jane Doe</p>" + kommentar +  "<br></div>" ; 
}
}

function bildknappen () {

 const bilden = localStorage.getItem("bild");

if (bilden === null){ 
textElem.style.border = "0px"; 
}
else {
headbild.innerHTML += bilden;

}
}
