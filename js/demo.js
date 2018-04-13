$(document).ready(function(){

	$('#IBANComplete').focus();

	$('#goBtn1').click(function() {
		const val = $('#IBANComplete').val();
		let html;
		if (isValid(val)) {
		  html = '<h3><font color="green"><b>This IBAN is VALID!</b></font></h3>';
		} else {
		  html = '<h3><font color="red"><b>This IBAN is INVALID!</b></font></h3>';
		}
		$('#results').html(html);
		$('#results').show();
	});

	$('#goBtn2').click(function() {
		const val1 = $('#CountryCode').val();
		const val2 = $('#TwoDigits').val();
		const val3 = $('#Rest').val();
		var all = val1 + val2 +val3;
		let html;
		if (isValid(all)) {
		  html = '<h3><font color="green"><b>This IBAN is VALID!</b></font></h3>';
		} else {
		  html = '<h3><font color="red"><b>This IBAN is INVALID!</b></font></h3>';
		}
		$('#results').html(html);
		$('#results').show();
	});

	$("#CountryCode").keyup(function(){
		this.value = this.value.toUpperCase();
	});

	$("#CountryCode, #TwoDigits").on('keyup keydown keypress', function(e) {

		// if (event.which !== 16 ) {alert(event.which)} // why is this giving two different event.which values?
		if ( e.type === "keyup"  ) {
			if ( !(e.shiftKey) && (event.which !== 16) ) {
				if (!(e.key === 'Tab')) {
					if( $(this).val().length==$(this).attr('maxlength') ){
					// var inputs = $(this).closest('form-group').find(':input'); // won't work. Why?
					// inputs.eq(100).focus();  // won't work. Why?
						$(this).next().focus(); // works fine
					}
				}
			}
		}
   	});
});

