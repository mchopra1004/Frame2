'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');

afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-843  Add Second Factor Method Page (Email) ----- ', function() {

    it(browser.tc_desc('UIDS-1115 TC8(a) (1) Verify validation color on Register email Page (2) Tabbing to other field'), function() {

        actpage.account.continueBtn.click();
        browser.wait(EC.visibilityOf(actpage.account.registerEmailLink), 120000, 'Register email link is not visible');
        actpage.account.registerEmailLink.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailEditBox), 120000, 'Email edit box is not visible');
        actpage.registerEmail.emailEditBox.sendKeys('abc');
        actpage.registerEmail.emailPageSubtitle.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailError), 120000, 'Email error is not visible');
        var actual=actpage.registerEmail.emailError.getCssValue('color');
        var expected="rgba(228, 153, 30, 1)";

        if ( browser.deviceName === 'Edge'){
            expected='rgb(228, 153, 30)';

        }
        expect(actual).toEqual(expected);

    });

    it(browser.tc_desc('UIDS-1115 TC8(b) (1) Verify validation color on Register email Page (2) Clicking on continue button'), function() {

        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailError), 120000, 'Email error is not visible');
        var actual=actpage.registerEmail.emailError.getCssValue('color');
        var expected="rgba(195, 57, 57, 1)";

        if ( browser.deviceName === 'Edge'){
            expected='rgb(195, 57, 57)';

        }
        expect(actual).toEqual(expected);

    });

    it(browser.tc_desc('UIDS-1115 TC9 (1) Verify validation on Register email Page (2) Without entering email'), function() {

        actpage.registerEmail.emailEditBox.clear();

        if ( browser.mobile )
        {
            actpage.registerEmail.emailPageSubtitle.click();        //hide the virtual keyboard
        }

        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailError), 120000, 'Email error is not visible');
        expect(actpage.registerEmail.emailError.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1115 TC8 (1) Verify validation on Register email Page (2) Entering invalid email format'), function() {

        var invalidEmail = function(value){

            actpage.registerEmail.emailEditBox.sendKeys(value);

        }

        var checkError = function(){
            browser.indirectClick(myactpage.addEmail.addEmailContinueBtn);
            browser.wait(EC.visibilityOf(actpage.registerEmail.emailError), 30000, 'Email error is not visible');
            expect(actpage.registerEmail.emailError.isDisplayed()).toBeTruthy();
            myactpage.addEmail.addEmailTextBox.clear();
        }

        invalidEmail('Test');

        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addEmail.addEmailHeaderMobile);        //hide the virtual keyboard
        }

        checkError();

        invalidEmail('test@');

        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addEmail.addEmailHeaderMobile);       //hide the virtual keyboard
        }
        checkError();

        invalidEmail('test@test.');

        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addEmail.addEmailHeaderMobile);       //hide the virtual keyboard
        }

        checkError();
        invalidEmail('test.com');

        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addEmail.addEmailHeaderMobile);       //hide the virtual keyboard
        }
        checkError();
        invalidEmail('123');


        if ( browser.mobile )
        {
            browser.indirectClick(myactpage.addEmail.addEmailHeaderMobile);       //hide the virtual keyboard
        }

        checkError();
    });

    it(browser.tc_desc('UIDS-1115 TC9 (1) Verify primary email cannot be used as 2FA'), function() {

        actpage.registerEmail.emailEditBox.clear();
        actpage.registerEmail.emailEditBox.sendKeys(browser.params.user.authentication.email);
        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailError), 120000, 'Email error is not visible');
        expect(actpage.registerEmail.emailError.getText()).toEqual(browser.params.user.authentication.language.otpEmail.primaryEmailError);

    });


    it(browser.tc_desc('UIDS-1115 TC10 (1) Verify navigation to next screen (2) Entering valid email'), function() {

        actpage.registerEmail.emailEditBox.clear();
        actpage.registerEmail.emailEditBox.sendKeys(browser.params.user.authentication.secondFactorEmail);
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                actpage.registerEmail.emailPageSubtitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.codeEditBox.get(1)), 120000, 'Code1 is not displayed');
        expect((actpage.verifyPhone.codeEditBox.get(1)).isDisplayed()).toBeTruthy();

    });

});