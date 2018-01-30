'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');
var request = require('request');
var OTP="";
var newOTP="";
var regp1= require('../tests/registrationStep1TestNegative.js');

afterAll(function(done) {
    process.nextTick(done);
});

describe('UIDS-845 Add "Second Factor Method" Confirm Pass-code Page ----- ', function() {

    it(browser.tc_desc('UIDS-1117 TC19 (1) Verify validation (2) Leaving passcode blank'), function() {

        browser.wait(EC.visibilityOf(actpage.confirmCode.nocode), 65000, 'No code, tap to resend is not displayed');
        expect((actpage.confirmCode.nocode).isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1117 TC17 (1) Verify validation (2) Leaving passcode blank and clicking on confirm button'), function() {

        if ( !browser.mobile ){

            browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
            browser.wait(EC.visibilityOf(actpage.confirmCode.VerifyCodeBtn), 12000, 'Confirm button is not visible');
            browser.indirectClick(actpage.confirmCode.VerifyCodeBtn);
            browser.wait(EC.visibilityOf(actpage.confirmCode.codeError), 12000, 'Code error is not displayed');
            expect((actpage.confirmCode.codeError).isDisplayed()).toBeTruthy();
        }

        else{
            console.log("This functionality is not for mobile devices");
        }

    });

    it(browser.tc_desc('UIDS-1117 TC15 (1) Verify validation color on confirm passcode Page (2) Entering incorrect passcode'), function() {

        browser.sleep(3000);

        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
        actpage.confirmCode.enterOTP('000000');
        browser.wait(EC.visibilityOf(actpage.confirmCode.codeError), 12000, 'Incorrect passcode error is not displayed');
        expect(actpage.confirmCode.codeError.isDisplayed()).toBeTruthy();
        var actual=actpage.confirmCode.codeError.getCssValue('color');
        var expected="rgba(195, 57, 57, 1)";

        if ( browser.deviceName === 'Edge'){
            expected="rgb(195, 57, 57)";

        }
        expect(actual).toEqual(expected);

    });

    it(browser.tc_desc('UIDS-1117 TC16 (1) Verify account is locked (2) Entering incorrect passcode 3 times'), function() {

        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
        actpage.confirmCode.enterOTP('000000');
        expect((actpage.verifyPhone.codeEditBox.get(5)).isDisplayed()).toBeTruthy();
        actpage.confirmCode.enterOTP('000000');
        browser.wait(EC.presenceOf(actpage.confirmCode.codeErrorAccLock), 120000, 'Account lock error is not displayed');
        browser.driver.actions().mouseMove(actpage.confirmCode.codeErrorAccLock).perform();
        expect(actpage.confirmCode.codeErrorAccLock.isDisplayed()).toBeTruthy();

    });
    it(browser.tc_desc('(1) Enter the locked email device again as 2FA (2) It should give a validation'), function() {
        browser.wait(EC.visibilityOf(actpage.confirmCode.backBtn), 120000, 'Back button on confirm passcode page is not displayed');
        actpage.confirmCode.backBtn.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailEditBox), 120000, 'Email Edit box is not displayed');
        actpage.registerEmail.emailEditBox.clear();
        actpage.registerEmail.emailEditBox.sendKeys(browser.params.user.authentication.secondFactorEmail);
        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailError), 120000, 'Email error is not visible');
        expect(actpage.registerEmail.emailError.getText()).toEqual(browser.params.user.authentication.language.otpEmail.existingEmailError);
    });

    it(browser.tc_desc('Enter a new email as 2FA after device is locked'), function() {
        actpage.registerEmail.emailEditBox.clear();
        actpage.registerEmail.emailEditBox.sendKeys(browser.params.user.authentication.secondFactorEmailNewLocked);
        browser.sleep(1000);
        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
    });

    it(browser.tc_desc('Generate OTP for the second factor email after earlier one is locked'), function() {
        var emailSecondFactorReplaced = browser.params.user.authentication.secondFactorEmailNewLocked.replace("+", "%2B");
        console.log("ppid value on other page"+regp1.ppid);
        var deferred = protractor.promise.defer();
        var options1 = {
                method: 'GET',
                url: browser.params.apiHost+"automation/otp/next?personPpid="+regp1.ppid+"&contact="+emailSecondFactorReplaced+"&contactType=EMAIL&otpTypeCd=UIS%20E-MAIL",
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

    it(browser.tc_desc('(1) Click on resend OTP link to get the new OTP'), function() {

        browser.wait(EC.visibilityOf(actpage.confirmCode.nocode), 66000, 'No code, tap to resend is not displayed');
        expect(actpage.confirmCode.resendOTP.isDisplayed()).toBeTruthy();
        actpage.confirmCode.resendOTP.click();
        browser.sleep(1000);
    });


    it(browser.tc_desc('Generate new OTP for the second factor email after earlier one is locked'), function() {

        var emailSecondFactorReplaced = browser.params.user.authentication.secondFactorEmailNewLocked.replace("+", "%2B");
        console.log("ppid value on other page"+regp1.ppid);
        var deferred = protractor.promise.defer();
        var options1 = {
                method: 'GET',
                url: browser.params.apiHost+"automation/otp/next?personPpid="+regp1.ppid+"&contact="+emailSecondFactorReplaced+"&contactType=EMAIL&otpTypeCd=UIS%20E-MAIL",
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

    it(browser.tc_desc('(1) Enter the OTP which was generated first time (2) Validation should be displayed'), function() {

        actpage.confirmCode.enterOTP(OTP);
        browser.sleep(5000);
        browser.wait(EC.visibilityOf(actpage.confirmCode.codeError), 12000, 'Incorrect passcode error is not displayed');
        expect(actpage.confirmCode.codeError.isDisplayed()).toBeTruthy();
    });


    it(browser.tc_desc('UIDS-1115 TC17 Enter Pass code for the new email added as second factor after the previous one is locked'), function() {

        actpage.confirmCode.enterOTP(newOTP);
        browser.sleep(5000);
        browser.wait(EC.visibilityOf(myactpage.success.successHeader), 120000, 'My Account success header is not displayed');
        expect((myactpage.success.successHeader).isDisplayed()).toBeTruthy();
    });
});