'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-895  Help Button in Personal Details Page ------ ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1616 TC1 (1) Check presence of Help Button on personal details page'), function() {

		dpage.continueBtn.click();
		browser.waitForAngular();
		browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');
		browser.wait(EC.visibilityOf(dpage.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			dpage.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(dpage.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}



	});

	it(browser.tc_desc('UIDS-1616 TC2 and TC3 (1) Click on help button on personal details page(2) Check the content'), function() {

		dpage.helpLink.click();
		browser.wait(EC.visibilityOf(dpage.helpLinkContent), 120000, 'help content is not displayed');
		expect(dpage.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 TC6 (1) Verify help menu is closed on personal details page(2) clicking on close button'), function() {

		dpage.helpLinkClose.click();
		expect(dpage.helpLinkContent.isPresent()).toEqual(false);	
		browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');

	});

});	