'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
	process.nextTick(done);
});



describe('UIDS-838  Second Factor Primer Page ----- ', function() {
	browser.ignoreSynchronization = false;


	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on 2 factor primer page'), function() {

		browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
		expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
		browser.indirectClick(homeP.openfooterLink);
		browser.sleep(1000);
	});

	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on 2 factor primer page'), function() {

		expect(homeP.footer.header.isDisplayed()).toBeTruthy();
		expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
		expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
		expect(homeP.footer.language.isDisplayed()).toBeTruthy();
		expect(homeP.footer.login.isDisplayed()).toBeTruthy();
	});

	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on 2 factor primer page'), function() {

		browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
		expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
		homeP.closefooterLink.click();
	});


	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on 2factor primer page'), function() {
		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}

		else {

			expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
		}
	});	

	it(browser.tc_desc('UIDS-920 (1) check header, description, copyright on 2factor primer page'), function() {

		expect(actpage.account.accountTitle.getText()).toEqual(browser.params.user.authentication.language.accountsecurity.header.toUpperCase());
		expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
		expect(actpage.account.accountSubTitle.getText()).toEqual(browser.params.user.authentication.language.accountsecurity.desc);

		if (browser.params.langOption === 'es') {
			homeP.footer.copyrightMsgOne.getText().then(function (text) {
				var abc = text.toString().replace("\n", " ");
				expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential _Español");
			});			 
		}
		else if (browser.params.langOption === 'ja') {
			homeP.footer.copyrightMsgOne.getText().then(function (text) {
				var abc = text.toString().replace("\n", " ");
				expect(abc).toEqual("著作権 Ⓒ 2017年 Zentry独自および機密");					        
			});
		}
		else if (browser.params.langOption === 'en') {
			homeP.footer.copyrightMsgOne.getText().then(function (text) {
				var abc = text.toString().replace("\n", " ");
				expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential");				     
			});
		}

	});

	it(browser.tc_desc('Should be able to select a device'), function() {

		browser.wait(EC.visibilityOf(actpage.account.icon), 12000, 'account icon is missing');
		// browser.wait(EC.visibilityOf(actpage.account.accountSubTitle), 120000, 'options text is missing, or the App is down!');
		expect(actpage.account.continueBtn.isDisplayed()).toBeTruthy();
		actpage.account.continueBtn.click();
		browser.waitForAngular();

	});

});
