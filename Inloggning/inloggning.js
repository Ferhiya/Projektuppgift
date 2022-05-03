function checkField() {
	const fieldNames = ["zipcode", "telephone"];  // Namnet på respektive div i html:en
	const re = [ // Array med reguljära uttryck för fälten
	/^\d{3} ?\d{2}$/,           // Postnummer
	/^0\d{1,3}[-/ ]?\d{5,8}$/  // Telefonnummer
	]; 
	const errMsg = [ // Array med felmeddelanden
		"Postnumret måste bestå av fem siffror.",
		"Telnr måste börja med en 0:a och följs av 6-11 siffror."
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