'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');

afterAll(function(done) {
	process.nextTick(done);
});

describe('UIDS-895  Help Button in My Account personal Details Page ------ ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1616 TC1 (1) Check presence of Help Button on my account personal details page'), function() {
		
		browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileElement), 12000, 'Profile option is not visible');
		myactpage.myAccountProfile.profileElement.click();
		browser.wait(EC.visibilityOf(myactpage.myAccountProfile.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			myactpage.myAccountProfile.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(myactpage.myAccountProfile.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}

		

	});
	
	

	it(browser.tc_desc('UIDS-1616 TC2 and TC3 (1) Click on help button on my account personal details page (2) Check the content'), function() {

		myactpage.myAccountProfile.helpLink.click();
		browser.wait(EC.visibilityOf(myactpage.myAccountProfile.helpLinkContent), 120000, 'help content is not displayed');
		expect(myactpage.myAccountProfile.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 TC6 (1) Verify help menu is closed on my account personal details page (2) clicking on close button'), function() {

		myactpage.myAccountProfile.helpLinkClose.click();
		expect(myactpage.myAccountProfile.helpLinkContent.isPresent()).toEqual(false);	
		

	});

});	