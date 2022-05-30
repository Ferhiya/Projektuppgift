let bildElem;

function init() {
bildElem = document.getElementById("bild-placeholder");

hamtabildElem = document.getElementById("bilder");

hamtabildElem.addEventListener("click", visabild);

}

function visabild (){
bildElem = document.getElementById("bild-placeholder");
   
console.log(bildElem.innerHTML.length);

if (bildElem.innerHTML.length === 0  ){
bildElem.innerHTML += "<div id='cross'>" + "Naturbild.jpeg" + "❌ </div>"; 

} else {
alert("Du har redan lagt till en bild");

}
};