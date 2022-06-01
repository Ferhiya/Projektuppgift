let bildElem;

function init() {
bildElem = document.getElementById("bild-placeholder");
bildknappen = document.getElementById("bilder");


}

function visabild (){
bildElem = document.getElementById("bild-placeholder");


if (bildElem.innerHTML.length === 0  ){
bildElem.innerHTML += "<div id='cross'>" + "Naturbild.jpeg" + "❌ </div>"; 

z = "<img src='/img/bike4.jpg'> ";
localStorage.setItem('bild', z);

} else {
alert("Du har redan lagt till en bild");

}
}


