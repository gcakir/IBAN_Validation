function typeOf(value) {
	var s = typeof value;
	if (s === 'object') {
		if (value) {
			if (Object.prototype.toString.call(value) == '[object Array]') {
				s = 'array';
			}
		} else {
			s = 'null';
		}
	}
	return s;
}

/*

function test(a, b, c) {
    checkTypes(arguments, ["array", "object", "number"]);
    out("finished type checking - no errors<br><br>");
}

try {
    test([1,2,3], {test: "foo"}, 4);
    test(3, {test: "foo"}, 4);
} catch(e) {
    out("***" + e);
}

*/

function checkTypes(arg, typeList) {
	for (var i = 0; i < typeList.length; i++) {
		if (typeOf(arg) !== typeList[i]) {
			throw 'wrong type: expecting ' + typeList[i] + ", found " + typeOf(argList[i]);
		}
	}
}

/*  *
	* Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and
	* transforming the letters to
	* numbers (A = 10, B = 11, ..., Z = 35).
	* @param {string} iban the IBAN
	* @returns {string} the prepared IBAN
*/

function Prepare(iban) {
	if (typeOf(iban) !== "string"){
		throw "wrong type: expecting string, found " + typeOf(iban);
	}

	iban = iban.replace(/\s/g, '');
	iban = iban.toUpperCase();
	iban = iban.substr(4) + iban.substr(0,4);
	
	return iban.split('').map(function(n){
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
	* Calculates the MOD 97 (at base 10) of the passed IBAN.
	* @param iban (the IBAN)
	* @returns {number}
 */
function Mod97_10(iban) {
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
