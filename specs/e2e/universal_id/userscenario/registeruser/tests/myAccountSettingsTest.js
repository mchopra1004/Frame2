'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-1265  My Account Settings Page ----- ', function() {
	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1265 TC1 (1) Verify Header of my account settings page'), function() {
		browser.wait(EC.visibilityOf(myactpage.settings.settingsElement), 12000, 'my account settings is not displayed');
		myactpage.settings.settingsElement.click();
		if ( !browser.mobile ) {
		browser.wait(EC.visibilityOf(myactpage.settings.settingsHeader), 12000, 'Settings header is not displayed');
		myactpage.settings.settingsHeader.getText().then(function(text) 
				{ 
			expect( text.toUpperCase()).toEqual(browser.params.user.authentication.language.accountMenu.settings.toUpperCase()); 
				});
		}
		
		else {
			
			browser.wait(EC.visibilityOf(myactpage.settings.settingsHeaderMobile), 12000, 'Settings header is not displayed');
			expect(myactpage.settings.settingsHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.accountMenu.settings.toUpperCase());
		}
	});


	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on my account settings page'), function() {

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

	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on my account settings page'), function() {


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

	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on my account settings page'), function() {

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

	it(browser.tc_desc('UIDS-1265 TC2 (1) Verify password icon and password text on my account settings page'), function() {

		if ( !browser.mobile ) {
			browser.wait(EC.visibilityOf(myactpage.settings.settingsHeader), 12000, 'Settings header is not displayed');
			myactpage.settings.settingsHeader.getText().then(function(text) 
					{ 
				expect( text.toUpperCase()).toEqual(browser.params.user.authentication.language.accountMenu.settings.toUpperCase()); 
					});
			}
			
			else {
				
				browser.wait(EC.visibilityOf(myactpage.settings.settingsHeaderMobile), 12000, 'Settings header is not displayed');
				expect(myactpage.settings.settingsHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.accountMenu.settings.toUpperCase());
			}
		expect(myactpage.settings.titles(browser.params.user.authentication.language.accountSettings.password).getText()).toEqual(browser.params.user.authentication.language.accountSettings.password);
		expect(myactpage.settings.passwordIcon.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1265 TC3 (1) Verify presence of change button for password on my account settings page'), function() {

		expect(myactpage.settings.passwordChange.getText()).toEqual(browser.params.user.authentication.language.accountSettings.buttonChange);

	});

	// Commented the below code as PIN is not implemented yet//
	
//	it(browser.tc_desc('UIDS-1265 TC4 (1) Verify pin icon and pin text on my account settings page'), function() {
//
//		expect(myactpage.settings.titles(browser.params.user.authentication.language.accountSettings.pin).getText()).toEqual(browser.params.user.authentication.language.accountSettings.pin);
//		expect(myactpage.settings.pinIcon.isDisplayed()).toBeTruthy();
//
//	});
//
//	it(browser.tc_desc('UIDS-1265 TC5 (1) Verify presence of change button for pin on my account settings page'), function() {
//
//		expect(myactpage.settings.pinChange.getText()).toEqual(browser.params.user.authentication.language.accountSettings.buttonChange);
//
//	});
	
	//Commenting the below code as Account language option is not in phase 1//

//	it(browser.tc_desc('UIDS-1265 TC4 (1) Verify language icon and language text on my account settings page'), function() {
//
//		myactpage.settings.titles(browser.params.user.authentication.language.accountSettings.accountLanguage).getText().then(function(text) 
//				{ 
//			expect(text.toUpperCase()).toEqual(browser.params.user.authentication.language.accountSettings.accountLanguage.toUpperCase()+": "+browser.params.user.authentication.language.general.languageName.toUpperCase()); 
//				});
//	    expect(myactpage.settings.languageIcon.isDisplayed()).toBeTruthy();
//
//	});
//
//	it(browser.tc_desc('UIDS-1265 TC5 (1) Verify presence of change button for language on my account settings page'), function() {
//
//		expect(myactpage.settings.languageChange.getText()).toEqual(browser.params.user.authentication.language.accountSettings.buttonChange);
//
//	});



	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on my account settings page'), function() {


		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}

		else {

			expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
		}

	});	


	it(browser.tc_desc('UIDS-1265 TC7 Verify copyright text on my account settings page'), function() {

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 

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
		}

		else {

			console.log("This functionality is not for web");
		}

	});	


	it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on my account settings page'), function() {

		browser.wait(EC.visibilityOf(myactpage.settings.helpLink), 120000, 'Help Link is not displayed');
		myactpage.settings.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help.toUpperCase()); 
					});
		
	});

	it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on my account settings page (2) Check the content'), function() {

		myactpage.settings.helpLink.click();
		browser.wait(EC.visibilityOf(myactpage.settings.helpLinkContent), 120000, 'help content is not displayed');
		expect(myactpage.settings.helpLinkContent.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on my account settings page (2) clicking on close button'), function() {

		myactpage.settings.helpLinkClose.click();
		expect(myactpage.settings.helpLinkContent.isPresent()).toEqual(false);	
		
		if ( !browser.mobile ) {
			browser.wait(EC.visibilityOf(myactpage.settings.settingsHeader), 12000, 'Settings header is not displayed');
			
			myactpage.settings.settingsHeader.getText().then(function(text) 
					{ 
				expect( text.toUpperCase()).toEqual(browser.params.user.authentication.language.accountMenu.settings.toUpperCase()); 
					});
			}
			
			else {
				
				browser.wait(EC.visibilityOf(myactpage.settings.settingsHeaderMobile), 12000, 'Settings header is not displayed');
				expect(myactpage.settings.settingsHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.accountMenu.settings.toUpperCase());
			}
	});


	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button on my account settings page (2) Verify user is redirected to my account page'), function() {

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 
				browser.wait(EC.visibilityOf(myactpage.settings.backBtn), 120000, 'Back button on my account settings page is not displayed');
				myactpage.settings.backBtn.click();
				browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepBackBtn), 120000, 'Back button on my account 2factor page is not displayed');
				expect(myactpage.twoStep.twoStepBackBtn.isDisplayed()).toBeTruthy();
			}

			else {

				console.log('This functionality is not for web');
			}
		}

	});


});