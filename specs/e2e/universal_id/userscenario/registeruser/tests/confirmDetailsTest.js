'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-718 Confirm Personal Details Page ----- ', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on confirm details page'), function() {

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

	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on confirm details page'), function() {

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

	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on confirm details page'), function() {

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

	it(browser.tc_desc('UIDS-502 TC 4b (1) check header, description, copyright and confirm button text on name page'), function() {

		if ( !browser.mobile ) {
			dpage.confirmation.confirmTitleWeb.getText().then(function(text)
					{ 
				expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.confirm.stmtConfirmYourDetails.toUpperCase()); 
					});
			
			expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
			}
			else {
				dpage.confirmation.confirmTitleMob.getText().then(function(text)
						{ 
					expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.confirm.stmtConfirmYourDetails.toUpperCase()); 
						});
				}
			expect(dpage.confirmation.ConfirmSubTitle.getText()).toEqual(browser.params.user.authentication.language.confirm.stmtInstruction);
			dpage.confirmation.submit.getText().then(function(text)
					{ 
				expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.confirm.btnConfirm.toUpperCase()); 
					});
			
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


	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on confirm page'), function() {


		//expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();
		
		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}
		 
		 else {
			 
			 console.log("This functionality is not for mobile devices");
		 }

	});	

	
	it(browser.tc_desc('UIDS-895 TC1 (1) Check presence of Help Button on confirm details page'), function() {

		browser.wait(EC.visibilityOf(dpage.confirmation.helpLink), 120000, 'Help Link is not displayed');

		if ( browser.deviceName === 'Edge'){

			dpage.confirmation.helpLink.getText().then(function(text) 
					{ 
				expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help); 
					});
		}
		else {
			expect(dpage.confirmation.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
		}



	});

	it(browser.tc_desc('UIDS-895 TC2 (1) Click on help button on confirm details page(2) Check the content'), function() {

		dpage.confirmation.helpLink.click();
		browser.wait(EC.visibilityOf(dpage.confirmation.helpLinkContent), 120000, 'help content is not displayed');
		expect(dpage.confirmation.helpLinkContent.isDisplayed()).toBeTruthy();

	});
	
	it(browser.tc_desc('UIDS-895 TC3 (1) Verify help menu is closed on confirm details page(2) clicking on close button'), function() {

		dpage.confirmation.helpLinkClose.click();
		expect(dpage.confirmation.helpLinkContent.isPresent()).toEqual(false);	
	});
	
	
	/* Commenting out this code as SSN, DOB page is out of scope in MVP and this code used to redirect to SSN/DOB page clicking on back button*/
//	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify information added in personal information page is retained'), function() {
//		browser.wait(EC.visibilityOf(dpage.confirmation.backbtn), 120000, 'Back button on confirmation page is not displayed');
//		dpage.confirmation.backbtn.click(); 
//		browser.wait(EC.visibilityOf(dpage.personalInfo.ssn), 120000, 'SSN field is not visible');
//		expect(dpage.personalInfo.ssn.getAttribute("value")).toBe('123-45-6789');	
//		expect(dpage.personalInfo.cob.getAttribute("value")).toBe(browser.params.user.personalInfo.cob);	
//		expect(dpage.personalInfo.dob.getAttribute("value")).toBe('01-01-1981');	
//
//	});

//	it(browser.tc_desc('UIDS-1677 TC 4b (1) Click on continue button (2) Verify user is redirected to confirmation page'), function() {
//
//		dpage.personalInfo.continueBtn.click();
//		browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');
//		expect(dpage.confirmation.ConfirmSubTitle.isDisplayed()).toBeTruthy();
//
//	});
	
//	Commenting out as clicking on back button is having issues in retrieving the information//
	
//	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify information added in address page is retained'), function() {
//	browser.wait(EC.visibilityOf(dpage.confirmation.backbtn), 120000, 'Back button on confirmation page is not displayed');
//	dpage.confirmation.backbtn.click(); 
//	browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'Country field is not visible');
//	expect(dpage.address.country.getAttribute("value")).toBe('USA');	
//	expect(dpage.address.street.getAttribute("value")).toBe('151 W 34th St');	
//	expect(dpage.address.zipcode.getAttribute("value")).toBe('10001');	
//	expect(dpage.address.city.getAttribute("value")).toBe('New York');	
//	expect(dpage.address.state.getAttribute("value")).toBe('NY');	
//	expect(dpage.address.extendedAddress.getAttribute("value")).toBe('152 S 37th St');	
//    });
//	
//	it(browser.tc_desc('UIDS-1677 TC 4b (1) Click on continue button (2) Verify user is redirected to confirmation page'), function() {
//	
//		dpage.address.continueBtn.click();
//		browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');
//		expect(dpage.confirmation.ConfirmSubTitle.isDisplayed()).toBeTruthy();
//	
//	});

	 it(browser.tc_desc('UIDS-502 TC7 Verify label of name field'), function() {

			expect(dpage.confirmation.nameLabel.getText()).toEqual(browser.params.user.authentication.language.confirm.stmtName);
	 });
	
	 it(browser.tc_desc('UIDS-502 TC24 Verify label of address field'), function() {

			expect(dpage.confirmation.addressLabel.getText()).toEqual(browser.params.user.authentication.language.confirm.stmtAddress);
	 });
	 
//	 it(browser.tc_desc('UIDS-502 TC12 Verify label of SSN field'), function() {
//
//			expect(dpage.personalInfo.ssnLabel.getText()).toEqual(browser.params.user.authentication.language.confirm.stmtSocialSecurityNumber);
//	 });
	 
//	 it(browser.tc_desc('UIDS-502 TC16 Verify label of DOB field'), function() {
//
//			expect(dpage.confirmation.dobLabel.getText()).toEqual(browser.params.user.authentication.language.confirm.stmtDateofbirth);
//	 });
	 
//	 it(browser.tc_desc('UIDS-502 TC22 Verify label of COB field'), function() {
//
//			expect(dpage.personalInfo.cobLabel.getText()).toEqual(browser.params.user.authentication.language.confirm.stmCirtyOfBirth);
//	 });
	 
	 	 
	 it(browser.tc_desc('UIDS-502 TC3a Verify Edit Text of name field'), function() {
		 
		 dpage.confirmation.nameEditText.getText().then(function(text) 
					{ 
				expect( text.toUpperCase().trim()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
					});
	 });
	
	 it(browser.tc_desc('UIDS-502 TC3b Verify Edit Text of address field'), function() {

		 dpage.confirmation.AddressEditText.getText().then(function(text) 
					{ 
				expect( text.toUpperCase().trim()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
					});
	 });
	 
//	 it(browser.tc_desc('UIDS-502 TC3c Verify Edit Text of ssn field'), function() {
//		 
//		 dpage.confirmation.ssnEditText.getText().then(function(text) 
//					{ 
//				expect( text.toUpperCase().trim()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
//					});
//	 });
	 
//	 it(browser.tc_desc('UIDS-502 TC3d Verify Edit Text of dob field'), function() {
//
//		 dpage.confirmation.dobEditText.getText().then(function(text) 
//					{ 
//				expect( text.toUpperCase().trim()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
//					});
//	});
	 
//	 it(browser.tc_desc('UIDS-502 TC3e Verify Edit Text of cob field'), function() {
//
//		 dpage.confirmation.cobEditText.getText().then(function(text) 
//					{ 
//				expect( text.toUpperCase().trim()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase()); 
//					});
//	});
	 
	it(browser.tc_desc('UIDS-502 TC3 confirm (1) Name (2) SSN (3) D.O.B'), function() {

		browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');

/* Commenting below lines because of SSN, DOB page not in scope*/		
//		dpage.confirmation.dob.getText().then(function(text) 
//				{ 
//			expect( text.replace(/-/g,"")).toBe(browser.params.user.personalInfo.dob); 
//				});
//
//		dpage.confirmation.ssn.getText().then(function(text) 
//				{ 
//			expect( text.replace(/-/g,"")).toBe(browser.params.user.personalInfo.ssn); 
//				});
//
//		expect(dpage.confirmation.cob.getText()).toBe(browser.params.user.personalInfo.cob);

		expect(dpage.confirmation.name.getText()).toEqual("Mr. FirstName Middle LastName Su");
		expect(dpage.confirmation.address.getText()).toEqual('151 W 34th St'+"\n"+'152 S 37th St'+"\n"+'New York, New York 10001'+"\n"+'United States');
		//dpage.confirmation.submit.click();
		browser.indirectClick(dpage.confirmation.submit);
		browser.waitForAngular();


	});	

});
