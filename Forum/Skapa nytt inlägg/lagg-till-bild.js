let bildElem;

function init() {
bildElem = document.getElementById("bild-placeholder");
bildknappen = document.getElementById("bilder");


}

function visabild (event){
let bildinput=document.getElementById("file");
let bilder=bildinput.files.length;

for (i=0; i < bilder; i++){
    var image=document.getElementById("bild-placeholder");
    image.src=URL.createObjectURL(event.target.files[0]);
    console.log(image);
}

document.getElementById("bild-placeholder").style.width="100px";


let localbild=document.getElementById("bild-placeholder");
let z = localbild.src;
console.log(z);
localStorage.setItem('bild', z);

}


