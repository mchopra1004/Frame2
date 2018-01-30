'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var regP = require('../pages/registrationStep1Page.js');
var homeP = require('../../../common/pages/homePage.js');
var request = require('request');
var ppid="";


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-388 REGISTRATION: PASSWORD ENTRY page  ---- ', function() {
	browser.ignoreSynchronization = true;

	it(browser.tc_desc('UIDS-1367 TC1 (1) check Menu Link is clickable on registration page'), function() {

		browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
		expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
		browser.indirectClick(homeP.openfooterLink);
		browser.sleep(1000);
	});

	it(browser.tc_desc('UIDS-1367 TC2 (1) Verify Menu Items are available on registration page'), function() {

		expect(homeP.footer.header.isDisplayed()).toBeTruthy();
		expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
	//	expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
	//	expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
		expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
	//	expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
	//	expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
		expect(homeP.footer.language.isDisplayed()).toBeTruthy();
		expect(homeP.footer.login.isDisplayed()).toBeTruthy();
	});

	it(browser.tc_desc('UIDS-1367 TC3 (1) check Menu can be closed on registration page'), function() {

		browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
		expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
		//browser.indirectClick(homeP.closefooterLink);
		homeP.closefooterLink.click();
	});

	it(browser.tc_desc('UIDS-703 TC1 (1) check welcome text'), function() {
		browser.wait(EC.visibilityOf(regP.registration.regSubTitleTxt), 12000, 'Subtitle is not displayed');
		expect(regP.registration.regSubTitleTxt.getText()).toEqual(browser.params.user.authentication.language.email.registerMsg);
		expect(regP.registration.privacyPolicyTxt.getText()).toContain(browser.params.user.authentication.language.email.accept);

		if ( !browser.mobile ) {

			if ( browser.deviceName === 'Edge'){
				expect(regP.registration.regWelcomeText.getText()).toEqual(browser.params.user.authentication.language.welcome.welcome+" Zentry");
			}

			else {
				expect(regP.registration.regWelcomeText.getText()).toEqual(browser.params.user.authentication.language.welcome.welcome.toUpperCase()+" ZENTRY");
			}
			expect(regP.registration.regTitleTxt.getText()).toEqual(browser.params.user.authentication.language.email.getStartedBtn);

			if (browser.params.langOption === 'es') {
				homeP.footer.copyrightMsgOne.getText().then(function (text) {
					var abc = text.toString().replace("\n", " ");
					expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential _Español");

				});
				regP.registration.regWelcomeDecText.getText().then(function (text) {
					expect(text).toEqual("Combat identity fraud with secure online identity profile known as a Universal ID _Español");					        
				});
			}
			else if (browser.params.langOption === 'ja') {
				homeP.footer.copyrightMsgOne.getText().then(function (text) {
					var abc = text.toString().replace("\n", " ");
					expect(abc).toEqual("著作権 Ⓒ 2017年 Zentry独自および機密");					        
				});
				regP.registration.regWelcomeDecText.getText().then(function (text) {
					expect(text).toEqual("ユニバーサルIDとして知られている安全なオンラインIDプロファイルを使ってID詐欺に対抗する");					        
				});                      
			}
			else if (browser.params.langOption === 'en') {
				homeP.footer.copyrightMsgOne.getText().then(function (text) {
					var abc = text.toString().replace("\n", " ");
					expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential");				     
				});
				regP.registration.regWelcomeDecText.getText().then(function (text) {
					expect(text).toEqual("Combat identity fraud with secure online identity profile known as a Universal ID");					        
				}); 
			}
		}	
		else {

			console.log("This functionality is not for mobile devices");
		}
		expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);

	});

	it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on registration page'), function() {

		//expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();

		if ( !browser.mobile ) {

			expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
		}

		else {

			console.log("This functionality is not for mobile devices");
		}

	});

	it(browser.tc_desc('UIDS-1488 TC7a Verify Email and Password placeholder text on registration page'), function() {

		expect(regP.registration.emailPlaceholder.getText()).toEqual(browser.params.user.authentication.language.email.email);
		expect(regP.registration.passwordPlaceholder.getText()).toEqual(browser.params.user.authentication.language.email.password);
	});

	// Commenting as show button functionality has been removed//
//	it(browser.tc_desc('UIDS-1488 TC17 Verify show text on password field'), function() {
//
//		if (browser.deviceName === 'Edge'){
//
//			expect(regP.registration.passwordShow.getText()).toEqual(browser.params.user.authentication.language.email.passwordShow);
//		}
//		else {
//
//			expect(regP.registration.passwordShow.getText()).toEqual(browser.params.user.authentication.language.email.passwordShow.toLowerCase());
//		}
//
//
//	});

	it(browser.tc_desc('UIDS-703 TC15 (1) Click on terms and conditions link'), function() {
		//regP.registration.termsAndConditions.click();
		browser.indirectClick(regP.registration.termsAndConditions);
		browser.wait(EC.visibilityOf(regP.registration.verifyTermsModal), 120000, 'Terms Modal is not displayed');
		expect(regP.registration.verifyTermsModal.isDisplayed()).toBeTruthy();


	});

	it(browser.tc_desc('UIDS-703 TC17 (1) Close the terms and conditions modal'), function() {
        
		browser.sleep(1000);
		regP.registration.closeModal.click();
		expect(regP.registration.privacyPolicy.isDisplayed()).toBeTruthy();


	});

	it(browser.tc_desc('UIDS-703 TC18 (1) Click on privacy policy link'), function() {

		browser.wait(EC.visibilityOf(regP.registration.privacyPolicy), 120000, 'Privacy policy link is not visible');
		browser.indirectClick(regP.registration.privacyPolicy);
		browser.wait(EC.visibilityOf(regP.registration.verifyPrivacyModal), 120000, 'Privacy Modal is not displayed');
		expect(regP.registration.verifyPrivacyModal.isDisplayed()).toBeTruthy();

	});


	it(browser.tc_desc('UIDS-703 TC20 (1)  Close the privacy policy modal'), function() {

		browser.sleep(1000);
		regP.registration.closeModal.click();
		browser.wait(EC.visibilityOf(regP.registration.createAccountBtn), 120000, 'Create Account button is not displayed');
		expect(regP.registration.createAccountBtn.isDisplayed()).toBeTruthy();

	});


	it(browser.tc_desc('UIDS-703 TC2 (1) enter email and password'), function() {

		browser.sleep(1000);
		regP.registration.emailEditBox.sendKeys(browser.params.user.authentication.email);
		regP.registration.passwordEditBox.sendKeys(browser.params.user.authentication.password);
		regP.registration.termsAndConditionsCheckBox.click();
		regP.registration.createAccountBtn.click();
		browser.waitForAngular();
		browser.wait(EC.visibilityOf(regP.registration.pDetailsHeaderTitle), 120000, 'Account may have failed, PERSONAL DETAILS page is not displayed!');
		expect(regP.registration.pDetailsHeaderTitle.isDisplayed()).toBeTruthy();
		
	});
	
	it(browser.tc_desc('UIDS-703 TC2 (1) Generate PPID'), function() {
		var JsessionCookie;
		var options1;
		var deferred = protractor.promise.defer();
		         browser.manage().getCookie('JSESSIONID')
        		.then(function (cookie) {
        			
        			JsessionCookie = cookie.value;
        			console.log('cookie found' + JsessionCookie);

        			options1 = {

        					method: 'GET',
        					url: "https://uis-qa2.icsl.net:10446/bff/api/config",
        					async: true,
        					headers: {'X-UIS-RP': 'UIS',
        						'Accept': 'application/json',
        						'Cookie' : 'JSESSIONID='+JsessionCookie
        					},
        			};

        			function callback1(error, response) {
        				if (response === null || response === undefined) {
        					return new Error("LibratoMetrics.Error: Request failed without a response. Network Connected?")
        				}
        				console.log("response.statusCode" + response.statusCode );
        				if (!error && response.statusCode == 200) {
        					var data = JSON.parse(response.body);
        					deferred.fulfill(data.user.id);
        					ppid=data.user.id;
        					console.log("ppid-----------------"+ppid);
        					exports.ppid=ppid;	
        					return true;
        				}
          			}
        			
        			request(options1, callback1);
        			  
        			
        		});
	             return deferred.promise;   
	      
		});

});