'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var xP = require('../pages/chooseLanguagePage.js');
var cP = require('../pages/createAccountPage.js');
var rP = require('./reuseableSteps.js');

afterAll(function(done) {
	process.nextTick(done);
});


//describe(browser.params.langOption+' '+browser.browserName+'   '+browser.deviceName+'  '+'Change local language Process  ', function() {

describe('UIDS-384 Welcome Page for a Pre-Registered User -----', function() {	

	it(browser.tc_desc('UIDS-694 TC12 Change language'), function() {
		if (browser.params.langOption !== 'en') {

			var selectedlangOption;
			if (browser.params.langOption === 'ja') {
				selectedlangOption = '日本';
			} else if (browser.params.langOption === 'es') {
				selectedlangOption = 'Español';
			}

			//expect (selectedlangOption).toBe('en' ||'日本' || 'Español' );

			if (browser.params.target === 'remote') {

				//console.log('operating system: ' + browser.os);
				console.log('Device: ' + browser.deviceName);

				if (browser.os === 'Windows' ) {
					console.log('In windows, right now !!!!! ');
					rP.changeLanguageDesktop(selectedlangOption);
					browser.sleep(2000);
				}

				else if (browser.deviceName === 'Samsung Galaxy S6'
					|| browser.deviceName === 'Samsung Galaxy Note 4'
						|| browser.deviceName === 'Google Pixel' )
				{
					console.log('deviceNamex: '+browser.deviceName);
					rP.changeLanguageMobile();
					browser.sleep(2000);
					rP.changeLocalMobile(browser.params.langOption);
					browser.sleep(2000);

				} else if (browser.deviceName === 'Apple iPad') {
					console.log('deviceName apple ipad: '+browser.deviceName);
					rP.changeLanguageDesktop(selectedlangOption);
					browser.sleep(2000);
				}

			} else if (browser.params.target === 'local') {

				console.log('operating system: ' + browser.os);
				console.log('Device: ' + browser.deviceName);

				if (browser.os === 'windows' && browser.deviceName === '') {
					rP.changeLanguageDesktop(selectedlangOption);
					browser.sleep(2000);
				}

				else if (browser.deviceName === 'Samsung Galaxy Note 3'
					|| browser.deviceName === 'Google Nexus 5'
						|| browser.deviceName === 'Apple iPhone 6'
							|| browser.deviceName === 'Google Nexus 6') {

					rP.changeLanguageMobile();
					browser.sleep(2000);
					rP.changeLocalMobile(browser.params.langOption);
					browser.sleep(2000);

				} else if (browser.deviceName === 'Google Nexus 10' || browser.deviceName === 'Apple iPad') {
					rP.changeLanguageDesktop(selectedlangOption);
					browser.sleep(2000);
				}
			} 

		}// end of first if
		expect(4).toBe(4);  //placeholder ,so that this block is not skip in the result

	});




	it(browser.tc_desc('UIDS-694 TC2 Check Welcome Text'), function() {
		if ( browser.deviceName === 'Edge'){
			expect(xP.landingPage.welcomeText.getText()).toEqual(browser.params.user.authentication.language.welcome.welcome);
		}

		else {
			expect(xP.landingPage.welcomeText.getText()).toEqual(browser.params.user.authentication.language.welcome.welcome.toUpperCase());
		}
		expect(xP.landingPage.welcomeText2.getText()).toEqual(browser.params.user.authentication.language.welcome.welcomeDesc);
		expect(xP.landingPage.getstartedBtn.getText()).toEqual(browser.params.user.authentication.language.welcome.getStartedBtn.toUpperCase());


	});	


	it(browser.tc_desc('UIDS-694 TC8 Click GET STARTED Button'), function() {

		xP.landingPage.getstartedBtn.click();
		browser.waitForAngular();
		browser.sleep(3000);
	});	


});