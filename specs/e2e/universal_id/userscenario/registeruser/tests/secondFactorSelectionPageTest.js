'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-839  Second Factor Selection Page ----- ', function() {
	browser.ignoreSynchronization = false;

	it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on 2 factor selection page'), function() {
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
	
	it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on 2 factor selection page'), function() {
		
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
	
	it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on 2 factor selection page'), function() {
		
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
	
	
	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on 2factor selection page'), function() {
//		expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();

		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}
		 
		 else {
			 
			 expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
		 }
	});	
	
	it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify user is redirected to 2 factor primer page'), function() {
		browser.wait(EC.visibilityOf(actpage.selectionPage.backbtn), 120000, 'Back button on 2 factor selection page is not displayed');
		actpage.selectionPage.backbtn.click(); 
		browser.wait(EC.visibilityOf(actpage.account.icon), 12000, 'account icon is missing');
		expect(actpage.account.icon.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-1677 TC 4b (1) Click on continue button (2) Verify user is redirected to 2 factor selection page'), function() {

		actpage.account.continueBtn.click();
		browser.wait(EC.visibilityOf(actpage.account.registerPhoneLink), 120000, 'Options are not available');
		expect(actpage.account.registerPhoneLink.isDisplayed()).toBeTruthy();

	});
	
	
	
	it(browser.tc_desc('UIDS-1099 TC1 Verify title of the page'), function() {

		expect(browser.getTitle()).toBe(browser.params.user.authentication.language.titles.SecuritySelectPage);
	});

	it(browser.tc_desc('UIDS-1099 TC2 Verify the options on the selection page'), function() {
       
		browser.wait(EC.visibilityOf(actpage.account.registerPhoneLink), 12000, 'Options are not visible');
		if ( browser.deviceName === 'Edge'){

			actpage.account.registerPhoneLink.getText().then(function(text) 
					{ 
				expect( text.trim()).toBe(browser.params.user.authentication.language.regSelect.phone); 
					});
			
			actpage.account.registerEmailLink.getText().then(function(text) 
					{ 
				expect( text.trim()).toBe(browser.params.user.authentication.language.regSelect.email); 
					});
			
//			actpage.account.registerTokenLink.getText().then(function(text) 
//					{ 
//				expect( text.trim()).toBe(browser.params.user.authentication.language.regSelect.token); 
//					});
			
			
		}
		
		else {
			expect(actpage.account.registerPhoneLink.getText()).toEqual(browser.params.user.authentication.language.regSelect.phone);
			expect(actpage.account.registerEmailLink.getText()).toEqual(browser.params.user.authentication.language.regSelect.email);
		//	expect(actpage.account.registerTokenLink.getText()).toEqual(browser.params.user.authentication.language.regSelect.token);

		}
});
	
	
	it(browser.tc_desc('UIDS-1099 TC5 Verify page header'), function() {

		 if ( !browser.mobile ) {

			 expect(actpage.account.pageHeader.getText()).toEqual(browser.params.user.authentication.language.regSelect.title);
			}
			 
			 else {
				 
				 expect(actpage.account.pageHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.regSelect.title);
			 }

		});
		
		
		
	it(browser.tc_desc('UIDS-1099 TC6 Verify page sub-header'), function() {

		expect(actpage.account.subTitleText.getText()).toEqual(browser.params.user.authentication.language.regSelect.desc);
		

	});
	it(browser.tc_desc('UIDS-1099 Verify copyright text'), function() {
		expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
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
	
});