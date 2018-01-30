'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var actpage = require('../pages/accountPage.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
	process.nextTick(done);
});



describe('UIDS-1369 Remove EMAIL 2FA [in My Account] ----- ', function() {
	
	it(browser.tc_desc('UIDS-1698 TC3 (1) Click on remove button (2) Verify a modal is opened'), function() {
		browser.wait(EC.visibilityOf(myactpage.removeEmail.removeButton), 120000, 'Remove Email Button is not displayed');
		myactpage.removeEmail.removeButton.click();
		browser.wait(EC.visibilityOf(myactpage.removeEmail.removeModalHeader), 120000, 'Remove Email Modal is not displayed');
		expect(myactpage.removeEmail.removeModalHeader.isDisplayed()).toBeTruthy();
	});
	
	it(browser.tc_desc('UIDS-1698 TC3a (1) Verify the header of remove Email Modal'), function() {

		expect(myactpage.removeEmail.removeModalHeader.getText()).toEqual(browser.params.user.authentication.language.secondFactor.questionDeleteEmailTitle);
	});
	
	it(browser.tc_desc('UIDS-1698 TC3b (1) Verify the sub-header of remove Email Modal'), function() {

		expect(myactpage.removeEmail.removeModalSubHeader.getText()).toEqual(browser.params.user.authentication.language.secondFactor.questionDeleteFirst+" "+browser.params.user.authentication.secondFactorEmailNew+" "+browser.params.user.authentication.language.secondFactor.questionDeleteSecond);
	});
	
	it(browser.tc_desc('UIDS-1698 TC3c (1) Verify the cancel button text of remove Email Modal'), function() {
		
		myactpage.removeEmail.removeModalCancelButton.getText().then(function(text) 
				{ 
			expect( text.trim().toUpperCase()).toEqual(browser.params.user.authentication.language.secondFactor.buttonNo.toUpperCase()); 
				});
		});
	
	it(browser.tc_desc('UIDS-1698 TC3d (1) Verify the remove email button text of remove Email Modal'), function() {

		myactpage.removeEmail.removeModalRemoveButton.getText().then(function(text) 
				{ 
			expect( text.trim().toUpperCase()).toEqual(browser.params.user.authentication.language.secondFactor.buttonYesDeleteEmail.toUpperCase()); 
				});
		});
	
//	it(browser.tc_desc('UIDS-1698 TC3e (1) Verify presence of X button in remove Email Modal'), function() {
//		browser.executeScript("arguments[0].scrollIntoView();",myactpage.removeEmail.removeModalCrossButton);
//		expect(myactpage.removeEmail.removeModalCrossButton.isDisplayed()).toBeTruthy();
//	});
	
	it(browser.tc_desc('UIDS-1698 TC4 (1) Click on cancel button (2) It should redirect to the my account 2 step details page'), function() {

		myactpage.removeEmail.removeModalCancelButton.click();
		expect(myactpage.twoStep.twoStepEmailNewAdded.getText()).toContain(browser.params.user.authentication.secondFactorEmailNew);
	});
	
	it(browser.tc_desc('UIDS-1698 TC5 (1) Click on remove email button (2) Verify email is removed'), function() {

		myactpage.removeEmail.removeButton.click();
		browser.wait(EC.visibilityOf(myactpage.removeEmail.removeModalRemoveButton), 120000, 'Remove Email Button is not displayed');
		myactpage.removeEmail.removeModalRemoveButton.click();
		browser.wait(EC.presenceOf(myactpage.removeEmail.removeEmailMessage), 120000, 'Remove Email Message is not displayed');
		expect(myactpage.removeEmail.removeEmailMessage.getText()).toEqual(browser.params.user.authentication.language.secondFactor.emailDeleted);
		browser.sleep(2000);
		expect(myactpage.twoStep.twoStepEmailsAdded.isDisplayed()).toBeTruthy();
		
	});
	
	
});