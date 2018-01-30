'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');


afterAll(function(done) {
	process.nextTick(done);
});



describe('UIDS-892 Manage Second Factor Options of EMAIL & SMS in My Account ----- ', function() {

	it(browser.tc_desc('UIDS-1761 TC1 (1) Verify elements of the page (2) When phone is added in 2FA'), function() {

		browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepElement), 12000, '2-Step verification option is not visible');
		myactpage.twoStep.twoStepElement.click();


		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 
				browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepHeaderMobile), 12000, '2-Step verification header not visible');
				expect(myactpage.twoStep.twoStepHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.myaccount.secondFactor);
				expect(myactpage.twoStep.twoStepBackBtn.isDisplayed()).toBeTruthy();
			} 

		}

		else {
			browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepHeaderWeb), 12000, '2-Step verification header not visible');
			expect(myactpage.myAccountProfile.profileHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.myaccount.secondFactor);
		}

		expect(myactpage.twoStep.twoStepPhoneLabel(browser.params.user.authentication.language.secondFactor.phone).getText()).toEqual(browser.params.user.authentication.language.secondFactor.phone);
		expect(myactpage.twoStep.twoStepPhoneLabel(browser.params.user.authentication.language.secondFactor.email).getText()).toEqual(browser.params.user.authentication.language.secondFactor.email);
		expect(myactpage.twoStep.twoStepAddPhone(browser.params.user.authentication.language.secondFactor.addPhone).getText()).toEqual(browser.params.user.authentication.language.secondFactor.addPhone);
		expect(myactpage.twoStep.twoStepAddEmail(browser.params.user.authentication.language.secondFactor.addEmail).getText()).toEqual(browser.params.user.authentication.language.secondFactor.addEmail);
		expect(myactpage.twoStep.twoStepIcons.count()).toBe(2);
		expect((myactpage.twoStep.twoStepIcons.get(0)).isDisplayed()).toBeTruthy();
		expect((myactpage.twoStep.twoStepIcons.get(1)).isDisplayed()).toBeTruthy();

		if ( browser.deviceName === 'Edge'){

			myactpage.twoStep.twoStepHelp.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}

		else {

			expect(myactpage.twoStep.twoStepHelp.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}

		expect(myactpage.twoStep.twoStepPhonesAdded.getText()).toContain(browser.params.user.authentication.secondFactorPhone);
		expect(myactpage.twoStep.twoStepEmailsAdded.getText()).toEqual(browser.params.user.authentication.language.secondFactor.noEmails);




	});

	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on 2factor Phone Details page'), function() {


		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}

		else {

			expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
		
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
		}
		});	
		
	it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on my account 2factor details phone'), function() {

		browser.wait(EC.visibilityOf(myactpage.twoStep.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			myactpage.twoStep.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(myactpage.twoStep.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}
	});

	it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on my account 2factor details phone (2) Check the content'), function() {

		myactpage.twoStep.helpLink.click();
		browser.wait(EC.visibilityOf(myactpage.twoStep.helpLinkContent), 120000, 'help content is not displayed');
		expect(myactpage.twoStep.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on my account 2factor details phone (2) clicking on close button'), function() {

		myactpage.twoStep.helpLinkClose.click();
		expect(myactpage.twoStep.helpLinkContent.isPresent()).toEqual(false);	
		browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
	});

	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on my account 2 factor details phone'), function() {

		if ( !browser.mobile ) {

			browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
			expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
			browser.indirectClick(homeP.openfooterLink);
			browser.sleep(1000);
		}

		else {

			console.log('This functionality is not for mobile devices');
		}

	});

	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Items are available on my account 2 factor details phone'), function() {

		if ( !browser.mobile ) {

			expect(homeP.footer.header.isDisplayed()).toBeTruthy();
			expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
		//	expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.language.isDisplayed()).toBeTruthy();
			expect(homeP.footer.login.isDisplayed()).toBeTruthy();

		}

		else{

			console.log('This functionality is not for mobile devices');
		}

	});

	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu can be closed on my account 2 factor details phone'), function() {

		if ( !browser.mobile ) {

			browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
			expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
			homeP.closefooterLink.click();
			//browser.indirectClick(homeP.closefooterLink);
		}

		else
		{

			console.log('This functionality is not for mobile devices');

		}

	});

	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button on my account 2factor details phone (2) Verify user is redirected to my account page'), function() {

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 
				browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepBackBtn), 120000, 'Back button on my account 2factor page is not displayed');
				myactpage.twoStep.twoStepBackBtn.click();
				browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountWelcome), 12000, 'Welcome message is not displayed');
				expect(myactpage.myAccount.myAccountWelcome.isDisplayed()).toBeTruthy();
				browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepElement), 12000, 'My Account page is not displayed');
				myactpage.twoStep.twoStepElement.click();
			}

			else {

				console.log('This functionality is not for web');
			}
		}

	});
});
