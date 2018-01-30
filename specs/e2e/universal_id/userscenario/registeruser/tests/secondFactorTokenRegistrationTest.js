'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');

afterAll(function(done) {
	process.nextTick(done);
});

//describe(browser.params.langOption+' '+browser.browserName+'   '+browser.deviceName+'  '+'UIDS-887   Second Factor Authentication-Email', function() {

describe('UIDS-1382  Second Factor Authentication Device Selection -----', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('Should be able to select a device'), function() {
	
		browser.wait(EC.visibilityOf(actpage.account.icon), 12000, 'account icon is missing');
		// browser.wait(EC.visibilityOf(actpage.account.accountSubTitle), 120000, 'options text is missing, or the App is down!');
		actpage.account.continueBtn.click();
		browser.waitForAngular();

		expect(4).toBe(4);
	});




	it(browser.tc_desc('select a device'), function() {
		
		browser.wait(EC.visibilityOf(actpage.account.registerTokenLink), 120000, 'register email link is missing or the App is down!');
		actpage.account.registerTokenLink.click();	 
		browser.waitForAngular();

		expect(4).toBe(4);
	
	});

	it(browser.tc_desc('select a device'), function() {
		browser.wait(EC.visibilityOf(actpage.registerToken.subTitleText), 120000, 'email option subtext is missing, or the App is down!');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
		
        var code = '111111';
		for (var i = 0; i < 6; i++)  {
			browser.driver.actions().mouseMove(actpage.confirmCode.codeInput(i)).click().sendKeys(code[i]).perform();
			browser.sleep(1000);
		}
	
		browser.sleep(5000);
		browser.sleep(5000);
		browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountHeader), 120000, 'My Account header is not displayed');
		expect((myactpage.myAccount.myAccountHeader).isDisplayed()).toBeTruthy();
		
		
		/*
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				actpage.registerPhone.contactOption('Text Me').click();  // hide virtual keyboards
			}
		}
		
		actpage.registerPhone.continueBtn.click();
		browser.waitForAngular();
		browser.sleep(5000);*/
	});


});