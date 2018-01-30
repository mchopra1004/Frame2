'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');

afterAll(function(done) {
	process.nextTick(done);
});

describe('UIDS-895  Help Button in Second Factor Selection Page ------ ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1616 TC1 (1) Check presence of Help Button on second factor selection page'), function() {

		browser.wait(EC.visibilityOf(actpage.selectionPage.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			actpage.selectionPage.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(actpage.selectionPage.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}
	});
	
	
	it(browser.tc_desc('UIDS-1616 TC2 and TC3 (1) Click on help button on second factor selection page (2) Check the content'), function() {

		actpage.selectionPage.helpLink.click();
		browser.wait(EC.visibilityOf(actpage.selectionPage.helpLinkContent), 120000, 'help content is not displayed');
		expect(actpage.selectionPage.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 TC6 (1) Verify help menu is closed on second factor selection page (2) clicking on close button'), function() {

		actpage.selectionPage.helpLinkClose.click();
		expect(actpage.selectionPage.helpLinkContent.isPresent()).toEqual(false);	
		browser.wait(EC.visibilityOf(actpage.account.registerPhoneLink), 120000, 'register phone link is missing or the App is down!');

	});

});	