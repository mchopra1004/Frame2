'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-715  Personal details - Add Name Page -----', function() {

	browser.ignoreSynchronization = false;
	

	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on name page'), function() {

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
	
	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check header,description,copyright and continue button text on name page'), function() {
		if ( !browser.mobile ) {
		dpage.nameLabelWeb.getText().then(function(text)
				{ 
			expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.personal.stmtName.toUpperCase()); 
				});
		
		expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
		}
		else {
			dpage.nameLabelMob.getText().then(function(text)
					{ 
				expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.personal.stmtName.toUpperCase()); 
					});
			}
		expect(dpage.confirmation.PersonalSubTitle.getText()).toEqual(browser.params.user.authentication.language.personal.stmtInstruction);
		dpage.userDetails.continueBtn.getText().then(function(text)
				{ 
			expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.personal.btnContinue.toUpperCase()); 
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

	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on name page'), function() {

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

	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on name page'), function() {

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

	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on personal details page'), function() {

		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}
		 
		 else {
			 
			 console.log("This functionality is not for mobile devices");
		 }

	});	

    it(browser.tc_desc('UIDS-499 TC9 Verify label and placeholder of first name field'), function() {

		expect(dpage.userDetails.firstNameLabel.getText()).toEqual(browser.params.user.authentication.language.personal.lbFirstName);
		expect(dpage.userDetails.firstNamePlaceholder.getText()).toEqual(browser.params.user.authentication.language.personal.phFirstName);
	});	
    
    it(browser.tc_desc('UIDS-499 TC13 Verify label and placeholder of family name field'), function() {

		expect(dpage.userDetails.familyNameLabel.getText()).toEqual(browser.params.user.authentication.language.personal.lbLastname);
		expect(dpage.userDetails.familyNamePlaceholder.getText()).toEqual(browser.params.user.authentication.language.personal.phLastname);
	});	
    
    it(browser.tc_desc('UIDS-499 TC3 Verify text and image of the link to add prefix, suffix'), function() {
    	expect(dpage.userDetails.addTitlesLinkImage.isDisplayed()).toBeTruthy(); 
    	
    	dpage.userDetails.AddTitles.getText().then(function(text) 
				{ 
			expect(text.trim()).toBe(browser.params.user.authentication.language.personal.stmtAdding); 
				});
	
		
		dpage.userDetails.AddTitles.click();
	});	
    
    it(browser.tc_desc('UIDS-499 TC7 Verify label and placeholder of prefix field'), function() {
    	
    	expect(dpage.userDetails.prefixLabel.getText()).toEqual(browser.params.user.authentication.language.personal.lbPrefix);
    	dpage.userDetails.prefixPlaceholder.getText().then(function(text) 
				{ 
			expect(text.trim()).toBe(browser.params.user.authentication.language.personal.phPrefix); 
				});
		
	});	
    
    it(browser.tc_desc('UIDS-499 TC15 Verify label and placeholder of suffix field'), function() {
    	
    	expect(dpage.userDetails.suffixLabel.getText()).toEqual(browser.params.user.authentication.language.personal.lbSuffix);
		expect(dpage.userDetails.suffixPlaceholder.getText()).toEqual(browser.params.user.authentication.language.personal.phSuffix);
	});	
    
    it(browser.tc_desc('UIDS-499 TC11 Verify label and placeholder of middle name field'), function() {
    	
    	expect(dpage.userDetails.middleNameLabel.getText()).toEqual(browser.params.user.authentication.language.personal.lbMiddlename);
		expect(dpage.userDetails.middleNamePlaceholder.getText()).toEqual(browser.params.user.authentication.language.personal.phMiddlename);
	});	
    
     
	it(browser.tc_desc('UIDS-499 TC20 (a) Enter FirstName, LastName, MiddleName, Suffix, Prefix (b) Click on back button'), function() {

		
		dpage.userDetails.firstName.sendKeys('FirstName');
		dpage.userDetails.familyName.sendKeys('LastName');

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{
				dpage.nameLabel.click();        //hide the virtual keyboard
			}

		}

		expect(dpage.userDetails.familyName.isDisplayed()).toBeTruthy(); 
		dpage.userDetails.MiddleName.sendKeys('Middle');
		expect(dpage.userDetails.MiddleName.isDisplayed()).toBeTruthy(); 
		dpage.userDetails.Suffix.sendKeys('Su');
		browser.wait(EC.visibilityOf(dpage.userDetails.Prefix), 120000, 'Prefix field is not visible');
		dpage.userDetails.Prefix.click();
		browser.indirectClick(dpage.userDetails.PrefixMr);
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{
				dpage.nameLabel.click();        //hide the virtual keyboard
			}

		}

		browser.sleep(2000);
		//expect(dpage.confirmation.PersonalSubTitle.getText()).toEqual(browser.params.user.authentication.language.personal.stmtInstructionInitials);
		dpage.userDetails.backBtn.click();
		browser.wait(EC.visibilityOf(dpage.continueBtn), 120000, 'Continue button is not displayed');
		expect(dpage.continueBtn.isDisplayed()).toBeTruthy();
	
	});

	it(browser.tc_desc('UIDS-1677 TC 3 (a) Click on continue button on personal details primer page (b) Verify Name information added earlier is retained'), function() {

		dpage.continueBtn.click();	
		browser.wait(EC.visibilityOf(dpage.userDetails.Prefix), 120000, 'Prefix field is not visible');
		expect(dpage.userDetails.firstName.getAttribute("value")).toBe('FirstName');	
		expect(dpage.userDetails.familyName.getAttribute("value")).toBe('LastName');
		expect(dpage.userDetails.MiddleName.getAttribute("value")).toBe('Middle');
		expect(dpage.userDetails.Suffix.getAttribute("value")).toBe('Su');
		dpage.userDetails.Prefix.getText().then(function(text) 
				{ 
			expect( text.trim()).toBe('Mr.'); 
				});
		browser.sleep(1000);
		browser.indirectClick(dpage.userDetails.continueBtn);
		browser.waitForAngular();
		expect(4).toBe(4);
	});
});	