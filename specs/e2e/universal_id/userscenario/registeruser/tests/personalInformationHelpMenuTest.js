'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-895  Help Button in Personal Information Page ------ ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1616 TC1 (1) Check presence of Help Button on personal information page'), function() {

		browser.wait(EC.visibilityOf(dpage.personalInformationHelp.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			dpage.personalInformationHelp.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(dpage.personalInformationHelp.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}

	});

	it(browser.tc_desc('UIDS-1616 TC2 and TC3 (1) Click on help button on personal information page (2) Check the content'), function() {

		dpage.personalInformationHelp.helpLink.click();
		browser.wait(EC.visibilityOf(dpage.personalInformationHelp.helpLinkContent), 120000, 'help content is not displayed');
		expect(dpage.personalInformationHelp.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 TC6 (1) Verify help menu is closed on personal information page (2) clicking on close button'), function() {

		dpage.personalInformationHelp.helpLinkClose.click();
		expect(dpage.personalInformationHelp.helpLinkContent.isPresent()).toEqual(false);	
		browser.wait(EC.visibilityOf(dpage.personalInfo.securitySubTitle), 12000, 'personal information top subtitle label is missing');

	});

});	