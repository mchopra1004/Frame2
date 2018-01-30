'use strict';

var homeP = require('../../../common/pages/homePage.js');
var controlsP = require('../../../common/pages/controlsPage.js');
//var langP = require('../pages/chooseLanguagePage.js');
var fs = require('fs');
var xP2 = require('../pages/chooseLanguagePage2.js');
var cP = require('../pages/createAccountPage.js');
var rP = require('./reuseableSteps.js');
var regP = require('../pages/registrationStep1Page.js');

afterAll(function(done) {
	process.nextTick(done);
});

describe('UIDS-384 Welcome Page for a Pre-Registered User -----', function() {	


	it(browser.tc_desc('UIDS-694 TC2 inspect pages labels'), function() {
		browser.wait(EC.visibilityOf(homeP.getstartedBtn), 120000, 'GET STARTED Button is missing or Element has changed, or the App is down!');
		browser.wait(EC.visibilityOf(homeP.footer.copyrightMsgOne), 120000, 'Copyright text is not displayed');
		//expect(homeP.footer.copyrightMsg('Zentry Proprietary and Confidential')).toBeTruthy();
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
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 
				browser.wait(EC.visibilityOf(homeP.footer.zentryLogoOne), 120000, 'Zentry Logo is not displayed in footer');
				expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
			}
		}
		else {
			browser.wait(EC.visibilityOf(homeP.footer.zentryLogo), 120000, 'Zentry Logo is not displayed in footer');
			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();}
		expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
	});	

	it(browser.tc_desc('UIDS-694 TC3 check footer menu links are displayed'), function() {
		homeP.openfooterLink.click();
		browser.sleep(1000);
		expect(homeP.footer.header.isDisplayed()).toBeTruthy();
		expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
	//	expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();	
	//	expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();	
		expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();	
		expect(homeP.footer.language.isDisplayed()).toBeTruthy();	
	//	expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();	
	//	expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
		expect(homeP.footer.login.isDisplayed()).toBeTruthy();
		homeP.closefooterLink.click();
		browser.sleep(3000);
	});	

	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on welcome page'), function() {

		//expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();

		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}

		else {

			expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
		}

	});

	it(browser.tc_desc('UIDS-694 TC2 Check Welcome Text'), function() {
		if ( browser.deviceName === 'Edge'){
			expect(xP2.landingPage.welcomeText.getText()).toEqual(browser.params.user.authentication.language.welcome.welcome+" Zentry");
		}

		else {
			expect(xP2.landingPage.welcomeText.getText()).toEqual(browser.params.user.authentication.language.welcome.welcome.toUpperCase()+" ZENTRY");
		}
		expect(xP2.landingPage.welcomeText2.getText()).toEqual(browser.params.user.authentication.language.welcome.welcomeDesc);
		
		xP2.landingPage.getstartedBtn.getText().then(function(text)
				{ 
			expect(text.trim()).toBe(browser.params.user.authentication.language.welcome.getStartedBtn.toUpperCase()); 
				});
	});	
	
	it(browser.tc_desc('UIDS-694 TC8 Click GET STARTED Button'), function() {

		xP2.landingPage.getstartedBtn.click();
		browser.waitForAngular();
		browser.sleep(3000);
		expect(regP.registration.regSubTitleTxt.getText()).toEqual(browser.params.user.authentication.language.email.registerMsg);
	});	
});