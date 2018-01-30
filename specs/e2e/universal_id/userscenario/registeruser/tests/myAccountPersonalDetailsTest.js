'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-891 Manage Personal details in My Account Page ----- ', function() {


	it(browser.tc_desc('UIDS-1573 TC1 (1) Verify elements of the page'), function() {

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 
				browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileHeaderMobile), 12000, 'Profile header not visible');
				expect(myactpage.myAccountProfile.profileHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.myaccount.profile);
				expect(myactpage.myAccountProfile.profileBackBtn.isDisplayed()).toBeTruthy();
			} 

		}

		else {
			browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileHeaderWeb), 12000, 'Profile header not visible');
			expect(myactpage.myAccountProfile.profileHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.myaccount.profile);
		}


		expect(myactpage.myAccountProfile.profilePersonalDetailsHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.profilePersonal);
		expect(myactpage.myAccountProfile.profileContactInfoHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.profileContact);
		expect(myactpage.myAccountProfile.profileNameLabel.getText()).toEqual(browser.params.user.authentication.language.personal.stmtName);
		expect(myactpage.myAccountProfile.profilePrimaryEmailHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.profilePrimaryContact);
		expect(myactpage.myAccountProfile.profileCurrentAddressHeader.getText()).toEqual(browser.params.user.authentication.language.address.stmtAddress);

		if ( browser.deviceName === 'Edge'){

			myactpage.myAccountProfile.profileHelp.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
			myactpage.edit.nameEditBtn.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
					});
//			myactpage.edit.emailEditBtn.getText().then(function(text) 
//					{ 
//				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
//					});
			myactpage.edit.addressEditBtn.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
					});

		}

		else {
			expect(myactpage.myAccountProfile.profileHelp.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
			expect(myactpage.edit.nameEditBtn.getText()).toEqual(browser.params.user.authentication.language.general.edit.toUpperCase());
//			expect(myactpage.edit.emailEditBtn.getText()).toEqual(browser.params.user.authentication.language.general.edit.toUpperCase());
			expect(myactpage.edit.addressEditBtn.getText()).toEqual(browser.params.user.authentication.language.general.edit.toUpperCase());

		}
	});

	it(browser.tc_desc('UIDS-1573 TC2 (1) Verify correct information is displayed'), function() {

		expect(myactpage.myAccountProfile.profileName.getText()).toEqual('Mr. FirstName Middle LastName Su');
		expect(myactpage.myAccountProfile.profilePrimaryEmail.getText()).toEqual(browser.params.user.authentication.email);
		expect(myactpage.myAccountProfile.profileCurrentAddress.getText()).toBe('151 W 34th St'+"\n"+'152 S 37th St'+"\n"+'New York, NEW YORK 10001'+"\n"+'United States');


	});


	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on my account personal details page'), function() {

		if ( !browser.mobile ) {


			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}

		else {

			expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
		}

	});	



	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on my account personal details page'), function() {

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


	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on my account personal details page'), function() {


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

	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on my account personal details page'), function() {

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


	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button on my account personal details (2) Verify user is redirected to my account page'), function() {

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 
				browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileBackBtn), 120000, 'Back button on my account profile page is not displayed');
				myactpage.myAccountProfile.profileBackBtn.click();
				browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountWelcome), 12000, 'Welcome message is not displayed');
				expect(myactpage.myAccount.myAccountWelcome.isDisplayed()).toBeTruthy();
			}

			else {

				console.log('This functionality is not for web');
			}
		}

	});


});