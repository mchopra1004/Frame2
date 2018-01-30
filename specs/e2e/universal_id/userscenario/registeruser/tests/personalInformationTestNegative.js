'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');


afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-717 Personal details - SSN Page  ---- ', function() {

	//browser.ignoreSynchronization = false;
	browser.ignoreSynchronization = true;


	it(browser.tc_desc('UIDS-501 TC12(a) (1) Verify validation color (2) Tabbing to other field'), function() {

		browser.wait(EC.visibilityOf(dpage.personalInfo.cob), 12000, 'city of birth field is not visible');
		dpage.personalInfo.cob.sendKeys('!@#$%^');
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
			}
		}
		dpage.personalInfo.dob.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.cobError), 12000, 'City Of Birth Error is not displayed');
		if ( browser.deviceName === 'Edge'){
			expect(dpage.personalInfo.cobError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
		}
		else {

			expect(dpage.personalInfo.cobError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
		}
	});

	it(browser.tc_desc('UIDS-501 TC12(b) (1) Verify validation color (2) Clicking on continue button'), function() {

		browser.wait(EC.visibilityOf(dpage.personalInfo.cob), 12000, 'city of birth field is not visible');
		dpage.personalInfo.cob.clear();
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click(); // hide virtual keyboards
			}
		}
		browser.wait(EC.visibilityOf(dpage.personalInfo.continueBtn), 12000, 'continue button is not visible on this page');
		dpage.personalInfo.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.ssnError), 12000, 'SSN Error is not displayed');
		if ( browser.deviceName === 'Edge'){
			expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
		}
		else{
			expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
		}
		browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'Date of Birth error is not displayed');
		if ( browser.deviceName === 'Edge'){
			expect(dpage.personalInfo.dobError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
		}
		else{
			expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
		}
		browser.wait(EC.visibilityOf(dpage.personalInfo.cobError), 12000, 'city of Birth error is not displayed');
		if ( browser.deviceName === 'Edge'){
			expect(dpage.personalInfo.cobError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
		}
		else{
			expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');

		}
	});


	it(browser.tc_desc('UIDS-501 TC12 (1) Verify validation (2) Leaving SSN, DOB and City of birth blank'), function() {

		browser.wait(EC.visibilityOf(dpage.personalInfo.continueBtn), 12000, 'continue button is not visible on this page');
		dpage.personalInfo.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.ssnError), 12000, 'SSN Error is not displayed');
		expect(dpage.personalInfo.ssnError.isDisplayed()).toBeTruthy();
		browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'Date of Birth error is not displayed');
		expect(dpage.personalInfo.dobError.isDisplayed()).toBeTruthy();
		browser.wait(EC.visibilityOf(dpage.personalInfo.cobError), 12000, 'city of Birth error is not displayed');
		expect(dpage.personalInfo.cobError.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-501 TC18(a) (1) Verify validation (2) Entering incorrect date'), function() {


		var InvalidDate = browser.params.user.personalInfo.dobInvalidDate;
		for (var i = 0; i < InvalidDate.length; i++) {
			dpage.personalInfo.dob.sendKeys(InvalidDate[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
		}

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
			}
		}
		dpage.personalInfo.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'DOB Error is not displayed');
		expect(dpage.personalInfo.dobError.isDisplayed()).toBeTruthy();
	});

	it(browser.tc_desc('UIDS-501 TC18(b) (1) Verify validation (2) Entering incorrect month'), function() {

		dpage.personalInfo.dob.clear();
		var InvalidMonth = browser.params.user.personalInfo.dobInvalidMonth;
		for (var i = 0; i < InvalidMonth.length; i++) {
			dpage.personalInfo.dob.sendKeys(InvalidMonth[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
		}

		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
			}
		}
		dpage.personalInfo.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'SSN Error is not displayed');
		expect(dpage.personalInfo.dobError.isDisplayed()).toBeTruthy();
	});

	it(browser.tc_desc('UIDS-501 TC21 (1) Verify validation (2) Entering special characters/numerics in city of birth'), function() {

		dpage.personalInfo.cob.sendKeys('!@#$%^');
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
			}
		}
		dpage.personalInfo.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.cobError), 12000, 'City Of Birth Error is not displayed');
		expect(dpage.personalInfo.cobError.isDisplayed()).toBeTruthy();
		dpage.personalInfo.cob.clear();
		dpage.personalInfo.cob.sendKeys('6576575675');
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
			}
		}
		dpage.personalInfo.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.personalInfo.cobError), 12000, 'City Of Birth Error is not displayed');
		expect(dpage.personalInfo.cobError.isDisplayed()).toBeTruthy();

	});

	it(browser.tc_desc('UIDS-501 TC22 (1) Verify navigation to next page (2) Entering valid SSN, DOB and COB'), function() {
		browser.wait(EC.visibilityOf(dpage.personalInfo.ssn), 12000, 'SSN field is not displayed');
		dpage.personalInfo.ssn.clear();
		browser.wait(EC.visibilityOf(dpage.personalInfo.dob), 12000, 'DOB field is not displayed');
		dpage.personalInfo.dob.clear();
		browser.wait(EC.visibilityOf(dpage.personalInfo.cob), 12000, 'COB field is not displayed');
		dpage.personalInfo.cob.clear();

		var age = browser.params.user.personalInfo.dob;
		var ssn = browser.params.user.personalInfo.ssn;

		dpage.personalInfo.cob.sendKeys(browser.params.user.personalInfo.cob);

		browser.wait(EC.visibilityOf(dpage.personalInfo.dob), 12000, 'DOB field is not displayed');
		for (var i = 0; i < age.length; i++) {
			dpage.personalInfo.dob.sendKeys(age[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
		}

		browser.wait(EC.visibilityOf(dpage.personalInfo.ssn), 12000, 'SSN field is not displayed');
		for (var i = 0; i < ssn.length; i++) {
			dpage.personalInfo.ssn.sendKeys(ssn[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
		}

		browser.sleep(1000);


		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{	
				dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
			}
		}

		dpage.personalInfo.continueBtn.click();
		browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 12000, 'Confirm your details title is not displayed');
		expect(dpage.confirmation.ConfirmSubTitle.isDisplayed()).toBeTruthy();
	});




});