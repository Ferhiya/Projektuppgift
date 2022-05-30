var contactBtn; 
var form;
var submitBtn;

function init() {

    contactBtn = document.getElementById("contact"); 
    form = document.getElementById("contactform"); 
    submitBtn = document.getElementById("contactform").onsubmit = function() {sumbitForm()};


    contactBtn.addEventListener("click", showContactForm);
} 
window.addEventListener("load", init); 



function sumbitForm() {
    alert("Ditt meddelande har skickats!");
}