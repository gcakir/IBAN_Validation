describe('IBAN', function(){
	describe('.isValid', function(){
		
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
		
		
		// it('should return true', function(){
			// var x = true;
			// expect(x).toBe(true);
		// });

	});
});