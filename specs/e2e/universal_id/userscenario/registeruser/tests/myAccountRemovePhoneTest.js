'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var actpage = require('../pages/accountPage.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-1370 Remove PHONE 2FA [in My Account] ----- ', function() {

	it(browser.tc_desc('UIDS-1679 TC4a (1) Click on remove button for phone (2) Verify a modal is opened'), function() {
		browser.wait(EC.visibilityOf(myactpage.removePhone.removeButton), 120000, 'Remove Phone Button is not displayed');
		myactpage.removePhone.removeButton.click();
		browser.wait(EC.visibilityOf(myactpage.removePhone.removeModalHeader), 120000, 'Remove Phone Modal is not displayed');
		expect(myactpage.removePhone.removeModalHeader.isDisplayed()).toBeTruthy();
	});

	it(browser.tc_desc('UIDS-1679 TC4b (1) Verify the header of remove Phone Modal'), function() {
		expect(myactpage.removePhone.removeModalHeader.getText()).toEqual(browser.params.user.authentication.language.secondFactor.questionDeletePhoneTitle);
	});

	it(browser.tc_desc('UIDS-1679 TC4c (1) Verify the sub-header of remove Phone Modal'), function() {

		expect(myactpage.removePhone.removeModalSubHeader.getText()).toEqual(browser.params.user.authentication.language.secondFactor.questionDeleteFirst+" "+"+91-"+browser.params.user.authentication.secondFactorPhoneNew+" "+browser.params.user.authentication.language.secondFactor.questionDeleteSecond);
	});

	it(browser.tc_desc('UIDS-1679 TC4d (1) Verify the cancel button text of remove Phone Modal'), function() {

		myactpage.removePhone.removeModalCancelButton.getText().then(function(text)
				{
			expect( text.trim().toUpperCase()).toEqual(browser.params.user.authentication.language.secondFactor.buttonNo.toUpperCase());
				});
	});

	it(browser.tc_desc('UIDS-1679 TC4e (1) Verify the remove Phone button text of remove Phone Modal'), function() {

		myactpage.removePhone.removeModalRemoveButton.getText().then(function(text)
				{
			expect( text.trim().toUpperCase()).toEqual(browser.params.user.authentication.language.secondFactor.buttonYesDeletePhone.toUpperCase());
				});
	});

	it(browser.tc_desc('UIDS-1679 TC4f (1) Click on cancel button on remove phone modal (2) It should redirect to the my account 2 step details page'), function() {

		myactpage.removePhone.removeModalCancelButton.click();
		expect(myactpage.twoStep.twoStepPhoneNewAdded.getText()).toContain("+91-"+browser.params.user.authentication.secondFactorPhoneNew);
	});

	it(browser.tc_desc('UIDS-1679 TC6 (1) Click on remove phone button (2) Verify phone is removed'), function() {

		myactpage.removePhone.removeButton.click();
		browser.wait(EC.visibilityOf(myactpage.removePhone.removeModalRemoveButton), 120000, 'Remove phone Button is not displayed');
		myactpage.removePhone.removeModalRemoveButton.click();
		browser.wait(EC.presenceOf(myactpage.removePhone.removePhoneMessage), 120000, 'Remove phone Message is not displayed');
		expect(myactpage.removePhone.removePhoneMessage.getText()).toEqual(browser.params.user.authentication.language.secondFactor.phoneDeleted);
		browser.sleep(2000);
		expect(myactpage.twoStep.twoStepPhonesAdded.isDisplayed()).toBeTruthy();
	});
});


