'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var actpage = require('../pages/accountPage.js');
var request = require('request');
var OTP="";
var newOTP="";
var regp1= require('../tests/registrationStep1TestNegative.js');
var dpage = require('../pages/personalDetailsPage.js');

afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-1368 Add PHONE 2FA [in My Account] ----- ', function() {

    it(browser.tc_desc('UIDS-1628 TC5a (1) Verify validation color on Add phone Page in my account (2) Tabbing to other field'), function() {
        expect(myactpage.twoStep.twoStepAddPhone(browser.params.user.authentication.language.secondFactor.addPhone).isDisplayed()).toBeTruthy();
        myactpage.twoStep.twoStepAddPhone(browser.params.user.authentication.language.secondFactor.addPhone).click();
        myactpage.addPhone.addPhoneTextBox.clear();
        myactpage.addPhone.addPhoneTextBox.sendKeys('Test');

        if ( !browser.mobile ) {

            browser.driver.actions().mouseMove(myactpage.addPhone.addPhoneSubtitle.click()).perform();

        }

        else {

            browser.driver.actions().mouseMove(myactpage.addPhone.addPhoneHeaderMobile.click()).perform();

        }

        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone error is not visible');
        var actual=actpage.registerPhone.phoneNumberError.getCssValue('color');
        var expected="rgba(228, 153, 30, 1)";
        if ( browser.deviceName === 'Edge'){

            expected='rgb(228, 153, 30)';
        }
        expect(actual).toEqual(expected);

    });


    it(browser.tc_desc('UIDS-1628 TC5b (1) Verify validation color on Add Phone Page in my account (2) Clicking on continue button'), function() {
        myactpage.addPhone.addPhoneTextBox.clear();
        browser.indirectClick(myactpage.addPhone.addPhoneContinueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone error is not visible');
        var actual=actpage.registerPhone.phoneNumberError.getCssValue('color');
        var expected="rgba(195, 57, 57, 1)";
        if ( browser.deviceName === 'Edge'){
            expected='rgb(195, 57, 57)';
        }
        expect(actual).toEqual(expected);
    });


    it(browser.tc_desc('UIDS-1628 TC5 (1) Verify validation appears (2) Entering incorrect Phone format'), function() {

        var invalidPhone = function(value){

            myactpage.addPhone.addPhoneTextBox.sendKeys(value);

        }

        var checkError = function(){
            browser.indirectClick(myactpage.addPhone.addPhoneContinueBtn);
            browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 30000, 'Phone error is not visible');
            expect(actpage.registerPhone.phoneNumberError.isDisplayed()).toBeTruthy();
            myactpage.addPhone.addPhoneTextBox.clear();
        }

        invalidPhone('Test');

        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addPhone.addPhoneHeaderMobile);        //hide the virtual keyboard
        }

        checkError();
        invalidPhone('test@');
        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addPhone.addPhoneHeaderMobile);        //hide the virtual keyboard
        }
        checkError();
        invalidPhone('test@test.');
        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addPhone.addPhoneHeaderMobile);        //hide the virtual keyboard
        }
        checkError();
        invalidPhone('test.com');
        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addPhone.addPhoneHeaderMobile);        //hide the virtual keyboard
        }
        checkError();
        invalidPhone('123');
        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addPhone.addPhoneHeaderMobile);        //hide the virtual keyboard
        }
        checkError();
    });

    it(browser.tc_desc('UIDS-1628 TC4 (1) Enter phone already registered as 2FA (2) Validation should appear'), function() {
        actpage.registerPhone.countryCode.sendKeys("india");
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        actpage.registerPhone.phoneNumberEditBox.clear();
        actpage.registerPhone.phoneNumberEditBox.sendKeys(browser.params.user.authentication.secondFactorPhoneNew);
        browser.indirectClick(myactpage.addPhone.addPhoneContinueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone error is not visible');
        expect(actpage.registerPhone.phoneNumberError.getText()).toEqual(browser.params.user.authentication.language.otpPhone.existingPhoneNumberError);
    });


    it(browser.tc_desc('UIDS-1628 TC6a (1) Enter a valid Phone (2) Verify message when passcode is not entered'), function() {

        myactpage.addPhone.addPhoneTextBox.clear();
        myactpage.addPhone.addPhoneTextBox.sendKeys(browser.params.user.authentication.secondFactorPhoneMyAccountLocked);
        browser.indirectClick(myactpage.addPhone.addPhoneContinueBtn);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
        browser.wait(EC.visibilityOf(actpage.confirmCode.nocode), 65000, 'No code, tap to resend is not displayed');
        expect((actpage.confirmCode.nocode).isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1628 TC6b (1) Verify validation (2) When passcode is left blank (3) Continue button is clicked'), function() {

        if ( !browser.mobile ) {

            browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
            browser.executeScript("arguments[0].scrollIntoView();", actpage.confirmCode.VerifyCodeBtn.getWebElement());
            browser.wait(EC.visibilityOf(actpage.confirmCode.VerifyCodeBtn), 12000, 'Confirm button is not visible');
            browser.indirectClick(actpage.confirmCode.VerifyCodeBtn);
            browser.wait(EC.visibilityOf(actpage.confirmCode.codeError), 12000, 'code error is not displayed');
            expect((actpage.confirmCode.codeError).isDisplayed()).toBeTruthy();

        }

        else {
            console.log("This functionality is not for mobile devices");
        }

    });


    it(browser.tc_desc('UIDS-1117 TC15 (1) Verify validation color on confirm passcode Page in My account add phone (2) Entering incorrect passcode'), function() {

        browser.sleep(3000);

        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
        actpage.confirmCode.enterOTP('000000');
        browser.wait(EC.visibilityOf(actpage.confirmCode.codeError), 12000, 'Incorrect passcode error is not displayed');
        expect(actpage.confirmCode.codeError.isDisplayed()).toBeTruthy();
        var actual=actpage.confirmCode.codeError.getCssValue('color');
        var expected="rgba(195, 57, 57, 1)";

        if ( browser.deviceName === 'Edge'){
            expected='rgb(195, 57, 57)';

        }
        expect(actual).toEqual(expected);
    });

    it(browser.tc_desc('UIDS-1628 TC6b (1) Verify account is locked (2) upon entering incorrect passcode'), function() {

        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
        actpage.confirmCode.enterOTP('000000');
        expect((actpage.verifyPhone.codeEditBox.get(5)).isDisplayed()).toBeTruthy();
        actpage.confirmCode.enterOTP('000000');
        browser.wait(EC.presenceOf(actpage.confirmCode.codeErrorAccLock), 120000, 'Account lock error is not displayed');
        browser.driver.actions().mouseMove(actpage.confirmCode.codeErrorAccLock).perform();
        expect(actpage.confirmCode.codeErrorAccLock.isDisplayed()).toBeTruthy();
        browser.sleep(2000);
    });



    it(browser.tc_desc('(1) Enter the locked phone device again as 2FA in My account (2) It should give a validation'), function() {
        browser.executeScript("arguments[0].scrollIntoView();", actpage.confirmCode.backBtn);
        browser.wait(EC.visibilityOf(actpage.confirmCode.backBtn), 120000, 'Back button on confirm passcode page is not displayed');
        actpage.confirmCode.backBtn.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberEditBox), 120000, 'Phone Edit box is not displayed');
        browser.sleep(2000);
        actpage.registerPhone.countryCode.sendKeys("india");
        browser.sleep(2000);
        browser.indirectClick(dpage.address.selectValue);
        actpage.registerPhone.phoneNumberEditBox.clear();
        actpage.registerPhone.phoneNumberEditBox.sendKeys(browser.params.user.authentication.secondFactorPhoneMyAccountLocked);
        browser.indirectClick(myactpage.addPhone.addPhoneContinueBtn);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberError), 120000, 'Phone error is not visible');
        expect(actpage.registerPhone.phoneNumberError.getText()).toEqual(browser.params.user.authentication.language.otpPhone.existingPhoneNumberError);
    });

    it(browser.tc_desc('UIDS-1628 TC6c (1) Enter a new phone after previous device is locked in my account 2FA '), function() {

        actpage.registerPhone.phoneNumberEditBox.clear();
        actpage.registerPhone.phoneNumberEditBox.sendKeys(browser.params.user.authentication.secondFactorPhoneMyAccountLockedNew);
        browser.sleep(1000);
        browser.indirectClick(myactpage.addPhone.addPhoneContinueBtn);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
    });

    it(browser.tc_desc('Generate OTP for the second factor phone in my account page after earlier one is locked'), function() {
        var phoneNumber = browser.params.user.authentication.secondFactorPhoneMyAccountLockedNew;
        console.log("ppid value on other page"+regp1.ppid);
        var deferred = protractor.promise.defer();
        var options1 = {
                method: 'GET',
                url: browser.params.apiHost+"automation/otp/next?personPpid="+regp1.ppid+"&contact="+phoneNumber+"&contactType=PHONE&otpTypeCd=UIS+SMS",
                headers: {'X-UIS-RP': 'UIS',

                },
        };

        function callback1(error, response) {
            if (response === null || response === undefined) {
                return new Error("LibratoMetrics.Error: Request failed without a response. Network Connected?")
            }
            console.log("response.statusCode" + response.statusCode );
            if (!error && response.statusCode == 200) {
                deferred.fulfill(response);
                var OTPExtracted=response.body.replace("<otp>","").replace("</otp>","");
                console.log(OTPExtracted);
                OTP=OTPExtracted;
                return true;
            }
        }
        request(options1, callback1);
        return deferred.promise;
    });

    it(browser.tc_desc('(1) Click on resend OTP link to get the new OTP in my account add phone'), function() {

        browser.wait(EC.visibilityOf(actpage.confirmCode.nocode), 66000, 'No code, tap to resend is not displayed');
        expect(actpage.confirmCode.resendOTP.isDisplayed()).toBeTruthy();
        actpage.confirmCode.resendOTP.click();
        browser.sleep(1000);
    });

    it(browser.tc_desc('Generate new OTP for the second factor phone after earlier one is locked in my account add phone'), function() {

        var phoneNumber = browser.params.user.authentication.secondFactorPhoneMyAccountLockedNew;
        console.log("ppid value on other page"+regp1.ppid);
        var deferred = protractor.promise.defer();
        var options1 = {
                method: 'GET',
                url: browser.params.apiHost+"automation/otp/next?personPpid="+regp1.ppid+"&contact="+phoneNumber+"&contactType=PHONE&otpTypeCd=UIS+SMS",
                headers: {'X-UIS-RP': 'UIS',

                },
        };

        function callback1(error, response) {
            if (response === null || response === undefined) {
                return new Error("LibratoMetrics.Error: Request failed without a response. Network Connected?")
            }
            console.log("response.statusCode" + response.statusCode );
            if (!error && response.statusCode == 200) {
                deferred.fulfill(response);
                var OTPExtracted=response.body.replace("<otp>","").replace("</otp>","");
                console.log(OTPExtracted);
                newOTP=OTPExtracted;
                return true;
            }
        }
        request(options1, callback1);
        return deferred.promise;


    });

    it(browser.tc_desc('(1) Enter the OTP which was generated first time in my account add phone (2) Validation should be displayed'), function() {

        actpage.confirmCode.enterOTP(OTP);
        browser.sleep(5000);
        browser.wait(EC.visibilityOf(actpage.confirmCode.codeError), 12000, 'Incorrect passcode error is not displayed');
        expect(actpage.confirmCode.codeError.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1115 TC17 (1) Enter Pass code for the new phone added as second factor after the previous one is locked in My account (2) Verify Phone is added '), function() {

        actpage.confirmCode.enterOTP(newOTP);
        browser.wait(EC.invisibilityOf(actpage.verifyPhone.verifyCodeBox), 5000);
        browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountHeader), 120000, 'My Account header is not displayed');
        expect((myactpage.myAccount.myAccountHeader).isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepPhoneNewAdded), 120000, 'Phone is not displayed');
        expect(myactpage.twoStep.twoStepPhoneNewAdded.getText()).toContain("+91-"+browser.params.user.authentication.secondFactorPhoneMyAccountLockedNew);
    });
});