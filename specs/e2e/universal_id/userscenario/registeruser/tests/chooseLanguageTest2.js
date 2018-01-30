'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */

//var xP = require('../pages/chooseLanguagePage.js');


afterAll(function(done) {
	process.nextTick(done);
});


//describe(browser.params.langOption+' '+browser.browserName+'   '+browser.deviceName+'  '+'Change local language Process  ', function() {

describe('UIDS-384 Welcome Page for a Pre-Registered User -----', function() {	

	it(browser.tc_desc('UIDS-694 TC12 Change language'), function() {
		var selectedlangOption = 'English';
		if (browser.params.langOption !== 'en') {
			
			
			if (browser.params.langOption === 'ja') {
				selectedlangOption = '日本';
			} else if (browser.params.langOption === 'es') {
				selectedlangOption = 'Español';
			}
			
			
			xP2.openfooterLink.click();
			browser.sleep(1000);
			xP2.localOption.click();
			browser.sleep(1000);
			xP2.languageSelect(browser.params.langOption).click();
			browser.sleep(1000);
		
			expect(xP2.localOption.getText()).toContain(selectedlangOption);  
		    xP2.closefooterLink.click();
		    browser.sleep(1000);
		}
		else  if (browser.params.langOption !== 'en') {
		 xP2.openfooterLink.click();
		 expect(xP2.localOption.getText()).toContain(selectedlangOption);  
		 xP2.closefooterLink.click();
		}

	});




	


	


});