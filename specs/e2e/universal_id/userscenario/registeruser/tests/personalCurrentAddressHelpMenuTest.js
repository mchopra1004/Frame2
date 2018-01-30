'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-895  Help Button in Current Address Page ------ ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1616 TC1 (1) Check presence of Help Button on current address page'), function() {

		browser.wait(EC.visibilityOf(dpage.currentAddressHelp.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			dpage.currentAddressHelp.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(dpage.currentAddressHelp.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}


	});

	it(browser.tc_desc('UIDS-1616 TC2 and TC3 (1) Click on help button on current address page (2) Check the content'), function() {

		dpage.currentAddressHelp.helpLink.click();
		browser.wait(EC.visibilityOf(dpage.currentAddressHelp.helpLinkContent), 120000, 'help content is not displayed');
		expect(dpage.currentAddressHelp.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 TC6 (1) Verify help menu is closed on current address page (2) clicking on close button'), function() {

		dpage.currentAddressHelp.helpLinkClose.click();
		expect(dpage.currentAddressHelp.helpLinkContent.isPresent()).toEqual(false);	
		browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'country edit box is missing!');

	});

});	