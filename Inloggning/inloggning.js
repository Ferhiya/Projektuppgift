// Globala konstanter och variabler
var formElem;		// Referens till elementet med hela formuläret
var totalCostElem;	// Referens till elementet för totalpris
// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
formElem=document.getElementById("booking");
formElem.zipcode.addEventListener("blur", checkField);// Påkallar checkField
formElem.telephone.addEventListener("blur", checkField);// Påkallar checkField
		
} 	
// End init
window.addEventListener("load",init); // Ser till att init funktionen laddas in före sidan visas
// ------------------------------


// Slut av checkCity

function checkField() {
	const fieldNames = ["zipcode", "telephone"];  // Namnet på respektive div i html:en
	const re = [ // Array med reguljära uttryck för fälten
	/^\d{3} ?\d{2}$/,           // Postnummer
	/^0\d{1,3}[-/ ]?\d{5,8}$/  // Telefonnummer
	]; 
	const errMsg = [ // Array med felmeddelanden
		"Telnr måste innehålla av 6-11 siffror.",
		"Lösenordet måste bestå av fem siffror."
	];
	let ix = fieldNames.indexOf(this.name); // Index till re and errMsg
	let errMsgElem = this.nextElementSibling; // Element för felmeddelande
	errMsgElem.innerHTML = "";        // tomt element som fylls av respektive errMsg
	if (!re[ix].test(this.value)) {
		errMsgElem.innerHTML = errMsg[ix];
		return false; // Fel i fältet
		}
		else return true; // Fältet är okej
}  // Slutet på checkField


function endCheckCampaign() {
	this.style.backgroundColor = "";
	this.value = this.value.toUpperCase();  // Gör bokstäverna i postnummret i allcaps
}
// Slutet på endCheckCampaign

function CheckCampaign() {
	let re = /^[A-Z]{3}-\d{2}-[A-Z]\d$/i; // reguljärt uttryck för hur kampanjkoden måste se ut
		if (re.test(this.value)) this.style.backgroundColor = "#6F9"; // Grönt för godkänt
		else this.style.backgroundColor = "#F99"; // Rött för nekat
}

// Slutet på CheckCampaign up