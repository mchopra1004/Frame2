'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');
var homeP = require('../../../common/pages/homePage.js');
var request = require('request');

afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-716  Desktop-Mobile-Tablet ADDRESS page ----', function() {

	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on address page'), function() {

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

	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on address page'), function() {

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

	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on address page'), function() {

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


	it(browser.tc_desc('check (1) Address edit boxes'), function() {
		browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'country edit box is missing!');
		//expect(dpage.addressPageSubtext.getText()).toBe(browser.params.user.authentication.language.address.stmtInstruction);
		expect(dpage.address.country.isDisplayed()).toBeTruthy();
	});


	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on address page'), function() {

		//expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();
		
		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}
		 
		 else {
			 
			 console.log("This functionality is not for mobile devices");
		 }

	});	
	
	//Commenting as clicking on back button is having issues to retrieve the information

//	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify information added in name page is retained'), function() {
//		browser.wait(EC.visibilityOf(dpage.address.backbtn), 120000, 'Back button on address page is not displayed');
//		dpage.address.backbtn.click();
//		browser.wait(EC.visibilityOf(dpage.userDetails.Prefix), 120000, 'Prefix field is not visible');
//		expect(dpage.userDetails.firstName.getAttribute("value")).toBe('FirstName');	
//		expect(dpage.userDetails.familyName.getAttribute("value")).toBe('LastName');
//		expect(dpage.userDetails.MiddleName.getAttribute("value")).toBe('Middle');
//		expect(dpage.userDetails.Suffix.getAttribute("value")).toBe('Su');
//		dpage.userDetails.Prefix.getText().then(function(text) 
//				{ 
//			expect( text.trim()).toBe('Mr.'); 
//				});
//	});
//
//	it(browser.tc_desc('UIDS-1677 TC 4b (1) Click on continue button (2) Verify user is redirected to address page'), function() {
//
//		dpage.userDetails.continueBtn.click();
//		browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'country edit box is missing!');
//		expect(dpage.address.country.isDisplayed()).toBeTruthy();
//	});


	 it(browser.tc_desc('UIDS-500 TC3a Verify label and placeholder of country field'), function() {

			expect(dpage.address.countryLabel.getText()).toEqual(browser.params.user.authentication.language.address.lbCountry);
			expect(dpage.address.countryPlaceholder.getText()).toEqual(browser.params.user.authentication.language.address.country);
	 });
	 
	 it(browser.tc_desc('UIDS-500 TC3b Verify label and placeholder of address field'), function() {

			expect(dpage.address.addressLable.getText()).toEqual(browser.params.user.authentication.language.address.lbStreet);
			expect(dpage.address.addressPlaceholder.getText()).toEqual(browser.params.user.authentication.language.address.street);
	 });
	 
	 it(browser.tc_desc('UIDS-500 TC3c Verify label and placeholder of zipcode field'), function() {

			expect(dpage.address.zipCodeLabel.getText()).toEqual(browser.params.user.authentication.language.address.lbZipcode);
			expect(dpage.address.zipCodePlaceholder.getText()).toEqual(browser.params.user.authentication.language.address.zipcode);
	 });
	 
	 it(browser.tc_desc('UIDS-500 TC3d Verify label and placeholder of city field'), function() {

			expect(dpage.address.cityLabel.getText()).toEqual(browser.params.user.authentication.language.address.lbCity);
			expect(dpage.address.cityPlaceholder.getText()).toEqual(browser.params.user.authentication.language.address.city);
	 });
	 
	 it(browser.tc_desc('UIDS-500 TC3e Verify label and placeholder of state field'), function() {

			expect(dpage.address.stateLabel.getText()).toEqual(browser.params.user.authentication.language.address.lbState);
			expect(dpage.address.statePlaceholder.getText()).toEqual(browser.params.user.authentication.language.address.state);
	 });
	 
	 it(browser.tc_desc('UIDS-500 TC3f Verify text and image of the link to add address 2'), function() {
	    
		 expect(dpage.address.address2LinkIcon.isDisplayed()).toBeTruthy(); 
		 
		 dpage.address.Address2Link.getText().then(function(text) 
					{ 
				expect(text.trim()).toBe(browser.params.user.authentication.language.address.stmtAdding); 
					});
		 
		 browser.wait(EC.visibilityOf(dpage.address.Address2Link), 5000, 'Address Line2 link is not appearing');
		 browser.indirectClick(dpage.address.Address2Link);
	 });	
	 
	 it(browser.tc_desc('UIDS-500 TC3g Verify label and placeholder of address2'), function() {
		    
		 expect(dpage.address.extendedAddressLabel.getText()).toEqual(browser.params.user.authentication.language.address.lbAddLine2);
		 expect(dpage.address.extendedAddressPlaceholder.getText()).toEqual(browser.params.user.authentication.language.address.addLine2);
	 });	
	 


	it(browser.tc_desc('UIDS-500 TC 4b (1) Inspect page header,description,continue button,Coypright text to address page'), function() {

		if ( !browser.mobile ) {
		dpage.address.pageTitleWeb.getText().then(function(text)
				{ 
			expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.address.stmtAddress.toUpperCase()); 
				});
		
		expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);	
	  }
		else {
			dpage.address.pageTitleMob.getText().then(function(text)
					{ 
				expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.address.stmtAddress.toUpperCase()); 
					});
		}
		expect(dpage.addressPageSubtext.getText()).toEqual(browser.params.user.authentication.language.address.stmtInstruction);
		dpage.address.continueBtn.getText().then(function(text)
				{ 
			expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.address.btnContinue.toUpperCase()); 
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

	it(browser.tc_desc('UIDS-500 TC24a (1) Enter Country, Addresses, State, Zip code and State'), function() {
		dpage.address.country.sendKeys('United States');
		browser.sleep(1000);
		browser.indirectClick(dpage.address.selectValue);
		//dpage.address.selectValue.click();
		dpage.address.street.sendKeys('151 W 34th St');
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.address.pageTitle.click();  // hide virtual keyboards
			}
		}
		
		browser.wait(EC.visibilityOf(dpage.address.extendedAddress), 12000, 'Address Line2 is not appearing');
		dpage.address.extendedAddress.sendKeys('152 S 37th St');
		if (browser.params.target === 'remote') {
			if ( browser.mobile )
			{	
				dpage.address.pageTitle.click();
			}
		}
		dpage.address.zipcode.sendKeys('10001');
		browser.indirectClick(dpage.address.city);
		browser.sleep(15000);
//		dpage.address.city.sendKeys('New York');
//		browser.indirectClick(dpage.address.selectValue);
//		dpage.address.state.sendKeys('New York');
//		browser.sleep(1000);
//		browser.indirectClick(dpage.address.selectValue);
//		browser.sleep(1000);
		expect(dpage.address.continueBtn.isDisplayed()).toBeTruthy();
		browser.sleep(1000);
		browser.indirectClick(dpage.address.continueBtn);
		browser.waitForAngular();
		browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');
		   
	});	
	});