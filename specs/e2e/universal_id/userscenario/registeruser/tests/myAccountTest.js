
'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-994 My Account Home Page/Dashboard ----- ', function() {


	it(browser.tc_desc('UIDS-1560 TC2 (1) Verify title of the page'), function() {

		
		expect(browser.getTitle()).toEqual(browser.params.user.authentication.language.titles.AccountHomePage); 

	});

	it(browser.tc_desc('UIDS-1560 TC3 (1) Verify Welcome message on Dashboard'), function() {
		
		browser.sleep(2000);
		browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountWelcome), 12000, 'Welcome message is not displayed');

		if ( browser.deviceName === 'Edge'){
			expect(myactpage.myAccount.myAccountWelcome.getText()).toEqual(browser.params.user.authentication.language.accountHome.header+" FIRSTNAME");
		}

		else {
			expect(myactpage.myAccount.myAccountWelcome.getText()).toEqual(browser.params.user.authentication.language.accountHome.header+" FIRSTNAME");
		}
});

	it(browser.tc_desc('UIDS-1560 TC5 (1) Verify Text on the page'), function() {
		browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountText), 12000, 'Text description is not displayed');

		if ( browser.deviceName === 'Edge'){
			expect(myactpage.myAccount.myAccountText.getText()).toEqual(browser.params.user.authentication.language.accountHome.intro);
		}

		else {
			expect(myactpage.myAccount.myAccountText.getText()).toEqual(browser.params.user.authentication.language.accountHome.intro);
		}


	});

	it(browser.tc_desc('UIDS-1560 TC4 (1) Verify components of My account page'), function() {
		browser.sleep(1000);
		expect(myactpage.myAccount.myAccountItems.count()).toBe(3);

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{ 
				(myactpage.myAccount.myAccountItems.get(0)).getText().then(function(text) 
						{ 
					expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.titles.AccountSecondFactorPage); 
						});

				(myactpage.myAccount.myAccountItems.get(1)).getText().then(function(text) 
						{ 
					expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.accountMenu.profile); 
						});
				(myactpage.myAccount.myAccountItems.get(2)).getText().then(function(text) 
						{ 
					expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.accountMenu.settings); 
						});

				// Commenting the below code as certificates has been removed as of now//
//				(myactpage.myAccount.myAccountItems.get(3)).getText().then(function(text) 
//						{ 
//					expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.accountMenu.certificates); 
//						});

				
				expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
				homeP.footer.copyrightMsgOne.getText().then(function (text) {
					var abc = text.toString().replace("\n", " ");
					expect(abc).toEqual('Copyright Ⓒ 2017 Zentry Proprietary and Confidential');

				});


			}

		}




		else if ( browser.deviceName === 'Edge'){

			expect((myactpage.myAccount.myAccountItems.get(0)).getText()).toMatch('\s*'+browser.params.user.authentication.language.titles.AccountSecondFactorPage+'\s*');
			expect((myactpage.myAccount.myAccountItems.get(1)).getText()).toMatch('\s*'+browser.params.user.authentication.language.accountMenu.profile+'\s*');
			expect((myactpage.myAccount.myAccountItems.get(2)).getText()).toMatch('\s*'+browser.params.user.authentication.language.accountMenu.settings+'\s*');
		//	expect((myactpage.myAccount.myAccountItems.get(3)).getText()).toMatch('\s*'+browser.params.user.authentication.language.accountMenu.certificates+'\s*');
			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}

		else {

			expect((myactpage.myAccount.myAccountItems.get(0)).getText()).toEqual(browser.params.user.authentication.language.titles.AccountSecondFactorPage);
			expect((myactpage.myAccount.myAccountItems.get(1)).getText()).toEqual(browser.params.user.authentication.language.accountMenu.profile);
			expect((myactpage.myAccount.myAccountItems.get(2)).getText()).toEqual(browser.params.user.authentication.language.accountMenu.settings);
		//	expect((myactpage.myAccount.myAccountItems.get(3)).getText()).toEqual(browser.params.user.authentication.language.accountMenu.certificates);
			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}



	});

	it(browser.tc_desc('UIDS-1560 TC6 (1) Verify menu link is available and clickable'), function() {

		expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
		
	});
	
	it(browser.tc_desc('UIDS-1560 TC6 (1) Verify 2-Step Verification, Profile , Settings,Certificates, home icon,zentry logo, copyright text for mobile'), function() {

		expect(myactpage.twoStep.twoStep2StepIcon.isDisplayed()).toBeTruthy();
		expect(myactpage.twoStep.twoStepProfileIcon.isDisplayed()).toBeTruthy();
		expect(myactpage.twoStep.twoStepSettingIcon.isDisplayed()).toBeTruthy();
//		expect(myactpage.twoStep.twoStepCertificatesIcon.isDisplayed()).toBeTruthy();
		expect(myactpage.twoStep.twoStepHomeIcon.isDisplayed()).toBeTruthy();
		expect(myactpage.twoStep.myAccountMenuHeader.getText()).toEqual(browser.params.user.authentication.language.header.myAccount);
		
		
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
	
	
});