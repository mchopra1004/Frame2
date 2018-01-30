'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var dpage = require('../pages/personalDetailsPage.js');

afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-1079  Add Second Factor Method Page (Phone) ----- ', function() {


    it(browser.tc_desc('UIDS-1100 TC13(a) (1) Verify validation color on Register Phone Page (2) Tabbing to other field'), function() {

        actpage.account.continueBtn.click();
        browser.wait(EC.visibilityOf(actpage.account.registerPhoneLink), 120000, 'Register phone link is not visible');
        actpage.account.registerPhoneLink.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberEditBox), 120000, 'Phone Number edit box is not displayed');
        actpage.registerPhone.phoneNumberEditBox.click();

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        actpage.registerPhone.countryLabel.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone Number error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(actpage.registerPhone.phoneNumberError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }
        else {
            expect(actpage.registerPhone.phoneNumberError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
        }
    });

    it(browser.tc_desc('UIDS-1100 TC13(a) (1) Verify validation color on Register Phone Page (2) Clicking on continue button '), function() {

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        browser.indirectClick(actpage.registerPhone.continueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone Number error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(actpage.registerPhone.phoneNumberError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else {
            expect(actpage.registerPhone.phoneNumberError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');

        }
    });

    it(browser.tc_desc('UIDS-1100 TC13(a) (1) Verify validation of country code and phone (2) Clicking on continue button while they are blank'), function() {
        actpage.registerPhone.countryCode.click();
        browser.indirectClick(actpage.registerPhone.continueBtn);
        expect(actpage.registerPhone.phoneNumberError.getText()).toEqual(browser.params.user.authentication.language.otpPhone.requiredPhoneNumberError);
        expect(actpage.registerPhone.countryCodeError.getText()).toEqual("Error message needs to be fixed");
    });

    it(browser.tc_desc('UIDS-1100 TC13(a) (1) Verify validation (2) entering alphabets in phone number field '), function() {

        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberEditBox), 120000, 'Phone Number edit box is not displayed');
        actpage.registerPhone.phoneNumberEditBox.sendKeys('sdfsdfsdfsd');

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        browser.indirectClick(actpage.registerPhone.continueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone Number error is not displayed');
        expect(actpage.registerPhone.phoneNumberError.isDisplayed()).toBeTruthy();
        expect(actpage.registerPhone.phoneNumberError.getText()).toEqual(browser.params.user.authentication.language.otpPhone.invalidNumericsPhoneNumberError);
    });

    it(browser.tc_desc('UIDS-1100 TC10 (1) Verify validation (2) Entering Special Characters in phone'), function() {
        actpage.registerPhone.phoneNumberEditBox.clear();

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        actpage.registerPhone.phoneNumberEditBox.sendKeys('!@#$%^&');

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        browser.indirectClick(actpage.registerPhone.continueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone Number error is not displayed');
        expect(actpage.registerPhone.phoneNumberError.isDisplayed()).toBeTruthy();
        expect(actpage.registerPhone.phoneNumberError.getText()).toEqual(browser.params.user.authentication.language.otpPhone.invalidNumericsPhoneNumberError);
    });

    // Below step is now commented out as current implementation has changed i.e. the text box entry is blocked and user is not allowed to enter more than 10 numerics //

    /*	it(browser.tc_desc('UIDS-1100 TC12 (1) Verify validation (2) Entering more than 10 numerics in phone'), function() {

		actpage.registerPhone.phoneNumberEditBox.clear();
		actpage.registerPhone.phoneNumberEditBox.sendKeys('98765432109');

			if ( browser.mobile )
			{
				actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
			}

		actpage.registerPhone.continueBtn.click();
		browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone Number error is not displayed');
		expect(actpage.registerPhone.phoneNumberError.isDisplayed()).toBeTruthy();

	}); */


    it(browser.tc_desc('UIDS-1100 TC13 (1) Verify validation (2) Entering less than 5 numerics in phone'), function() {
        actpage.registerPhone.phoneNumberEditBox.clear();
        actpage.registerPhone.phoneNumberEditBox.sendKeys('5432');

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        browser.indirectClick(actpage.registerPhone.continueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone Number error is not displayed');
        expect(actpage.registerPhone.phoneNumberError.isDisplayed()).toBeTruthy();
        expect(actpage.registerPhone.phoneNumberError.getText()).toEqual(browser.params.user.authentication.language.otpPhone.minlengthPhoneNumberError);
    });

    it(browser.tc_desc('UIDS-1100 TC13d (1) Verify validation (2) Entering special characters in country code'), function() {
        actpage.registerPhone.countryCode.sendKeys('@34%$%');

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        browser.indirectClick(actpage.registerPhone.continueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.countryCodeError), 120000, 'Country code error is not displayed');
        expect(actpage.registerPhone.countryCodeError.isDisplayed()).toBeTruthy();
    });


    it(browser.tc_desc('UIDS-1100 TC11 (1) Verify navigation to next screen (2) Entering valid phone'), function() {
        actpage.registerPhone.phoneNumberEditBox.clear();
        actpage.registerPhone.countryCode.clear();
        actpage.registerPhone.countryCode.sendKeys("india");
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneTitleLabelSubText), 120000, 'phone option subtext is missing, or the App is down!');
        actpage.registerPhone.phoneNumberEditBox.sendKeys(browser.params.user.authentication.secondFactorPhone);

        if ( browser.mobile )
        {
            actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
        }

        browser.sleep(1000);
        browser.indirectClick(actpage.registerPhone.continueBtn);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.codeEditBox.get(1)), 120000, 'Code1 is not displayed');
        expect((actpage.verifyPhone.codeEditBox.get(1)).isDisplayed()).toBeTruthy();
    });
});