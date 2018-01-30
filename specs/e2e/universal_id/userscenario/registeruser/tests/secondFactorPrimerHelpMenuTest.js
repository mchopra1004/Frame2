'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-895  Help Button in Second Factor Primer Page ------ ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1616 TC1 (1) Check presence of Help Button on second factor primer page'), function() {

		browser.wait(EC.visibilityOf(actpage.account.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			actpage.account.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(actpage.account.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}


	});

	it(browser.tc_desc('UIDS-1616 TC2 and TC3 (1) Click on help button on second factor primer page (2) Check the content'), function() {

		actpage.account.helpLink.click();
		browser.wait(EC.visibilityOf(actpage.account.helpLinkContent), 120000, 'help content is not displayed');
		expect(actpage.account.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 TC6 (1) Verify help menu is closed on second factor primer page (2) clicking on close button'), function() {

		actpage.account.helpLinkClose.click();
		expect(actpage.account.helpLinkContent.isPresent()).toEqual(false);	
		browser.wait(EC.visibilityOf(actpage.account.icon), 12000, 'account icon is missing');

	});

});	