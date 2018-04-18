function IBANtypeCheck(iban){
	if (typeof iban !== "string"){
		throw "wrong type: expecting string, found " + typeof iban;
	}
}

function IBANRegexVal(iban){
	if(!iban.match(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/i)){
		return false;
	}else{
		return true;
	}
}

function ConvertToInt(iban){
	return iban = iban.split('').map(function(n){
		var code = n.charCodeAt(0);
		var A = 'A'.charCodeAt(0),
			Z = 'Z'.charCodeAt(0);
		if (code >= A && code <= Z){
			// A = 10, B = 11, ... Z = 35
			return code - A + 10;
		} else {
			return n;
		}
	}).join('');
}

/*  *
	* Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and
	* transforming the letters to
	* numbers (A = 10, B = 11, ..., Z = 35).
	* @param {string} iban the IBAN
	* @returns {string} the prepared IBAN
*/

function Prepare(iban) {
	// console.log(typeof iban);
	IBANtypeCheck(iban);
	iban = iban.replace(/\s/g, '');
	if (!IBANRegexVal(iban)) {
		console.log("Failure: Invalid IBAN");
		return "2";
	}

	iban = iban.toUpperCase();
	iban = iban.substr(4) + iban.substr(0,4);
	
	return ConvertToInt(iban);
}

/*  *
	* Calculates the MOD 97 (at base 10) of the passed IBAN.
	* @param iban (the IBAN)
	* @returns {number}
 */
function Mod97_10(iban) {
	IBANtypeCheck(iban);

	var remainder = iban,
		block;

	while (remainder.length > 2){
		block = remainder.slice(0, 9);
		remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
	}

	return parseInt(remainder, 10) % 97;
}

/*  *
	* Checks whether the passed IBAN is valid using Prepare(iban)
	* and Mod97_10(iban) functions
	* @param iban (the IBAN)
	* @returns {boolean} true or false
*/
function isValid(iban){
	return Mod97_10(Prepare(iban)) == 1;
}

/*  *
	* Prepares the passed IBAN for the function GenerateCheckDigits(iban)
	* @param iban (the IBAN)
	* @returns {string} the prepared IBAN
*/

function Prepare_For_GenerateCheckDigits(iban){
	IBANtypeCheck(iban);
	iban = iban.replace(/\s/g, '');
	if (!IBANRegexVal(iban)) {
		console.log("Failure: Invalid IBAN");
		return "2";
	}
	iban = iban.toUpperCase();
	var ibanFirst4 = iban.substr(0,4);
	ibanFirst4 = ibanFirst4.split('').map(function(n){
		var char = n.charCodeAt(0);
		if (char >= '0'.charCodeAt(0) && char <= '9'.charCodeAt(0)){
			// console.log("if executes");
			return '0';
		} else {
			// console.log("else executes");
			return n;
		}
	}).join('');

	iban = iban.substr(4) + ibanFirst4;
	// console.log("Prepare_For_GenerateCheckDigits: " + iban);
	return ConvertToInt(iban);
}

function GenerateCheckDigits(iban) {
	IBANtypeCheck(iban);

	var remainder = iban,
		block;

	while (remainder.length > 2){
		block = remainder.slice(0, 9);
		remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
	}
	var IntRemainder = parseInt(remainder, 10) % 97;
	var IntCheckDigits = 98 - IntRemainder;
	var StrCheckDigits = IntCheckDigits.toString();
	if (StrCheckDigits.length == 1) {
		StrCheckDigits = "0" + StrCheckDigits;
		return StrCheckDigits;
	}else{
		return StrCheckDigits;
	}
}

