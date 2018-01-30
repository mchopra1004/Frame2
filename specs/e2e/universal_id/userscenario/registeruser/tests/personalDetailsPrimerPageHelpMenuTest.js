'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var regP = require('../pages/registrationStep1Page.js');
//var regp1= require('../tests/registrationStep1Test.js');

afterAll(function(done) {
	process.nextTick(done);
});

describe('UIDS-895  Help Button in Personal Details Primer Page ------ ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1616 TC1 (1) Check presence of Help Button on personal details primer page'), function() {

		browser.wait(EC.visibilityOf(regP.registration.helpLink), 120000, 'Help Link is not displayed');
		if ( browser.deviceName === 'Edge'){

			regP.registration.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(regP.registration.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}

//		var emailSecondFactorReplaced = browser.params.user.authentication.secondFactorEmail.replace("+", "%2B");
//		console.log("New URL-----------------"+"https://uis-qa2.icsl.net:10446/automation/otp/next?personPpid="+regp1.ppid+"&contact="+emailSecondFactorReplaced+"&contactType=EMAIL&otpTypeCd=UIS%20E-MAIL");
      });

	it(browser.tc_desc('UIDS-1616 TC2 and TC3 (1) Click on help button on personal details primer page (2) Check the content'), function() {

		regP.registration.helpLink.click();
		browser.wait(EC.visibilityOf(regP.registration.helpLinkContent), 120000, 'help content is not displayed');
		expect(regP.registration.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 TC6 (1) Verify help menu is closed on personal details primer page (2) clicking on close button'), function() {

		regP.registration.helpLinkClose.click();
		expect(regP.registration.helpLinkContent.isPresent()).toEqual(false);	
		browser.wait(EC.visibilityOf(regP.registration.pDetailsHeaderTitle), 120000, 'Title of personal details primer page is not displayed');

	});

});	