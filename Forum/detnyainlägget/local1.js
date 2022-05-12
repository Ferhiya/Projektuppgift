let x;
let y;
let placeholder;
let localElem;
let button;
let valjElem;
let val;

    function init() {  // Allting som ska laddas in före sidan visas
    button = document.getElementById("publicera-btn");
    button.addEventListener("click", myFunction);
    valjElem =document.getElementById("valj-forum");

    valjElem.addEventListener("click", valet);
     }
        window.addEventListener("load", init);  // Ser till så att init laddar in innan sidan visas
     
function valet(){
//val = valjElem.options[e.selectedIndex].text;
val= valjElem.options[valjElem.selectedIndex].value;
console.log(val);
}

function myFunction() {
     x = document.getElementById("rubrik").value;
     
     y = document.getElementById("texten").value;
     
     container = " <i>" + "Användaren" + "</i>" + "<b>"+ x + "</b>" + "<br>" + y;

     localStorage.setItem('texten', container);

console.log("container");

if (val === "vandring"){
vandringtext = "<b>"+ x + "</b>" + "</br>" +  "Användaren namn" + "</div>" ; 

localStorage.setItem('vandring+text', vandringtext); 
}  

if (val === "utomhus"){
utomhustext = "<b>"+ x + "</b>" + "</br>" +  "Användaren namn" + "</div>" ;

 localStorage.setItem('utomhus+text', utomhustext); 
}  

if (val === "adrenalin"){
   adrenalintext = "<b>"+ x + "</b>" + "</br>" +  "Användaren namn" + "</div>" ;
   
    localStorage.setItem('adrenalin+text', adrenalintext); 
   } 

if (val === "vattensport"){
   vattensporttext = "<b>"+ x + "</b>" + "</br>" +  "Användaren namn" + "</div>" ;
      
   localStorage.setItem('vatten+text', vattensporttext); 
} 

   
}


 