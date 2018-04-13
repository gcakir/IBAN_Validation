describe('IBAN', function(){
	describe('isValid()', function(){
		
		it('should return false for an unknown country code digit', function(){
			expect(isValid('ZZ68539007547034')).toBe(false);
		});

		it('should return true for a valid belgian IBAN', function(){
			expect(isValid('BE68539007547034')).toBe(true);
		});

		it('should return true for a valid Dutch IBAN', function(){
			expect(isValid('NL86INGB0002445588')).toBe(true);
		});

		it('should return true for a valid Moldovan IBAN', function(){
			expect(isValid('MD75EX0900002374642125EU')).toBe(true);			
		});

		it('should return true for a valid Saint-Lucia IBAN', function(){
			expect(isValid('LC55HEMM000100010012001200023015')).toBe(true);
		});
		
		it('should return true for a valid German IBAN with white space', function(){
			expect(isValid('DE89 3704 0044 0532 0130 00')).toBe(true);
		});
		
		it('should return true for a valid German IBAN with leading and trailing white space', function(){
			expect(isValid('  	DE89 3704 0044 0532 0130 00  		   ')).toBe(true);
		});
		
		it('should return false for an invalid German IBAN with white space', function(){
			expect(isValid('DE89 3704 0045 0532 0130 00')).toBe(false);
		});
		
		
		it('should return false for an incorrect check digit', function(){
			expect(isValid('BE68539007547035')).toBe(false);
		});
		
		it('should return true for valid British IBAN', function(){
			expect(isValid('GB82WEST12345698765432')).toBe(true);
		});

		it('should return true for valid Polish IBAN', function(){
			expect(isValid('PL61109010140000071219812874')).toBe(true);
		});

		it('should return true for valid Portuguese IBAN', function(){
			expect(isValid('PT50000201231234567890154')).toBe(true);
		});

		it('should return true for valid Qatari IBAN', function(){
			expect(isValid('QA58DOHB00001234567890ABCDEFG')).toBe(true);
		});

		it('should return true for valid Seychellois IBAN', function(){
			expect(isValid('SC18SSCB11010000000000001497USD')).toBe(true);
		});

		it('should return true for valid Kosovar IBAN', function(){
			expect(isValid('XK051212012345678906')).toBe(true);
		});
		
		it('hahahah test', function(){
			var x = true;
			expect(x).toBe(true);
		});

	});

	describe('Prepare()', function(){
		it('should throw an error for number parameter', function(){
			expect(function () {  Prepare(123456); } ).toThrow("wrong type: expecting string, found number");
		});

		it('should throw an error for array parameter', function(){
			expect(function () { 
				Prepare([1,2,3]);
			}).toThrow("wrong type: expecting string, found object");
		});

		it('should throw an error for boolean parameter', function(){
			expect(function () {  Prepare(true); } ).toThrow("wrong type: expecting string, found boolean");
		});

	});	

	describe('Mod97_10()', function(){
		it('should throw an error for number parameter', function(){
			expect(function () {  Mod97_10(123456); } ).toThrow("wrong type: expecting string, found number");
		});

		it('should throw an error for array parameter', function(){
			expect(function () { 
				Mod97_10([1,2,3]);
			}).toThrow("wrong type: expecting string, found object");
		});

		it('should throw an error for boolean parameter', function(){
			expect(function () {  Mod97_10(true); } ).toThrow("wrong type: expecting string, found boolean");
		});

	});
});

