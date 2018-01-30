'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-717 Personal details - Add SSN, Date of Birth and City of Birth Page', function() {

	browser.ignoreSynchronization = false;


	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on SSN, DOB page'), function() {

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

	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on SSN, DOB page'), function() {

		if ( !browser.mobile ) {

			expect(homeP.footer.header.isDisplayed()).toBeTruthy();
			expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
			expect(homeP.footer.language.isDisplayed()).toBeTruthy();
			expect(homeP.footer.login.isDisplayed()).toBeTruthy();

		}

		else{

			console.log('This functionality is not for mobile devices');
		}

	});

	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on SSN, DOB page'), function() {

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
	
	it(browser.tc_desc('UIDS-501 Story TC3 (1) 3b Inspect page header,description,continue button,Coypright text to address page', function() {

		if ( !browser.mobile ) {
			
			dpage.personalInfo.securityTitleWeb.getText().then(function(text)
					{ 
				expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.security.stmtSecurity.toUpperCase()); 
					});
			expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);	
		}
		else
		{
			dpage.personalInfo.securityTitleMob.getText().then(function(text)
					{ 
				expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.security.stmtSecurity.toUpperCase()); 
					});
		}
		expect(dpage.personalInfo.securitySubTitle.getText()).toEqual(browser.params.user.authentication.language.security.stmtInstruction);
		
		dpage.personalInfo.continueBtn.getText().then(function(text)
				{ 
			expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.security.btnContinue.toUpperCase()); 
				});
		
		if (browser.params.langOption === 'es') {
			  homeP.footer.copyrightMsgOne.getText().then(function (text) {
				     var abc = text.toString().replace("\n", " ");
				      expect(abc).toEqual("Coypright Ⓒ 2017 Zentry Proprietary and Confidential _Español");
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
					     expect(abc).toEqual("Coypright Ⓒ 2017 Zentry Proprietary and Confidential");				     
				    });
	   }
	});


	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on SSN, DOB page'), function() {

		//expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();
		
		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}
		 
		 else {
			 
			 console.log("This functionality is not for mobile devices");
		 }
	
	});	



	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify information added in address page is retained'), function() {
		browser.wait(EC.visibilityOf(dpage.personalInfo.backbtn), 120000, 'Back button on personal information page is not displayed');
		dpage.personalInfo.backbtn.click();
		browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'Country field is not visible');
		expect(dpage.address.country.getAttribute("value")).toBe('USA');	
		expect(dpage.address.street.getAttribute("value")).toBe('151 W 34th St');	
		expect(dpage.address.zipcode.getAttribute("value")).toBe('10001');	
		expect(dpage.address.city.getAttribute("value")).toBe('New York');	
		expect(dpage.address.state.getAttribute("value")).toBe('NY');	
		expect(dpage.address.extendedAddress.getAttribute("value")).toBe('152 S 37th St');	

	});

	it(browser.tc_desc('UIDS-1677 TC 4b (1) Click on continue button (2) Verify user is redirected to personal information page'), function() {

		dpage.address.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.securitySubTitle), 120000, 'personal information top subtitle label is missing');
		expect(dpage.personalInfo.securitySubTitle.isDisplayed()).toBeTruthy();

	});

	
	it(browser.tc_desc('UIDS-501 TC7 Verify label and placeholder of SSN field'), function() {

		expect(dpage.personalInfo.ssnLabel.getText()).toEqual(browser.params.user.authentication.language.security.lbSsn);
		expect(dpage.personalInfo.ssnPlaceholder.getText()).toEqual(browser.params.user.authentication.language.security.phSsn);
	});	
	
	it(browser.tc_desc('UIDS-501 TC9 Verify label and placeholder of DOB field'), function() {

		expect(dpage.personalInfo.dobLabel.getText()).toEqual(browser.params.user.authentication.language.security.lbDob);
		expect(dpage.personalInfo.dobPlaceholder.getText()).toEqual(browser.params.user.authentication.language.security.phDob);
	});	
	
	it(browser.tc_desc('UIDS-501 TC19 Verify label and placeholder of COB field'), function() {

		expect(dpage.personalInfo.cobLabel.getText()).toEqual(browser.params.user.authentication.language.security.lbCityOfBirth);
		expect(dpage.personalInfo.cobPlaceholder.getText()).toEqual(browser.params.user.authentication.language.security.phCityOfBirth);
	});	
	
	it(browser.tc_desc('enter (1) SSN (2) Date of Birth (3) city of birth'), function() {

		var age = browser.params.user.personalInfo.dob;
		var ssn = browser.params.user.personalInfo.ssn

		browser.wait(EC.visibilityOf(dpage.personalInfo.securitySubTitle), 12000, 'personal information top subtitle label is missing');

		for (var i = 0; i < ssn.length; i++) {
			dpage.personalInfo.ssn.sendKeys(ssn[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
		}

		//dpage.personalInfo.ssn.sendKeys(browser.params.user.personalInfo.ssn);
		dpage.personalInfo.cob.sendKeys(browser.params.user.personalInfo.cob);

		for (var i = 0; i < age.length; i++) {
			dpage.personalInfo.dob.sendKeys(age[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
		}

		browser.sleep(1000);


		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
			}
		}

		dpage.personalInfo.continueBtn.click();
		browser.waitForAngular();
		expect(4).toBe(4);
	});


});
