'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');


afterAll(function(done) {
	process.nextTick(done);
});

describe('UIDS-1248  My Account Success Page ----- ', function() {
	browser.ignoreSynchronization = false;

   it(browser.tc_desc('UIDS-1605 TC2a (1) Verify Header of the SuccessPage'), function() {

	    browser.sleep(2000);
		browser.wait(EC.visibilityOf(myactpage.success.successHeader), 12000, 'Success header is not displayed');
		expect(myactpage.success.successHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.welcomeTitle);

	});


	it(browser.tc_desc('UIDS-1605 TC2b (1) Verify SubHeader of the SuccessPage'), function() {

		expect(myactpage.success.successSubHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.welcomeMessage);

	});

	it(browser.tc_desc('UIDS-1605 TC2c (1) Verify SuccessIcon of the SuccessPage'), function() {

		expect(myactpage.success.successIcon.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1605 TC2d (1) Verify Continue button text of the SuccessPage'), function() {


		if (browser.deviceName === 'Edge'){
			myactpage.success.successContinueBtn.getText().then(function(text)
					{
				expect( text.trim()).toBe(browser.params.user.authentication.language.myaccount.welcomeButtonText);
					});
			}

		else {

			expect(myactpage.success.successContinueBtn.getText()).toEqual(browser.params.user.authentication.language.myaccount.welcomeButtonText);
		}

	});

	it(browser.tc_desc('UIDS-1605 TC2e (1) Verify Close button is present on the SuccessPage'), function() {

		expect(myactpage.success.successCloseBtn.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1605 TC5 (1) Verify clicking on continue button (2) Should redirect to MyAccount dashboard page'), function() {

		myactpage.success.successContinueBtn.click();
		browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountHeader), 120000, 'My Account header is not displayed');
		expect((myactpage.myAccount.myAccountHeader).isDisplayed()).toBeTruthy();

	});

//	it(browser.tc_desc('UIDS-1605 TC4 (1) Verify clicking on close button (2) Should redirect to MyAccount dashboard page'), function() {
//		browser.refresh();
//		browser.wait(EC.visibilityOf(myactpage.success.successCloseBtn), 120000, 'Close button is not displayed');
//		browser.indirectClick(myactpage.success.successCloseBtn);
//		browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountHeader), 120000, 'My Account header is not displayed');
//		expect((myactpage.myAccount.myAccountHeader).isDisplayed()).toBeTruthy();
//
//	});

});
