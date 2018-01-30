'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var actpage = require('../pages/accountPage.js');
var homeP = require('../../../common/pages/homePage.js');
var request = require('request');
var regp1= require('../tests/registrationStep1Test.js');
var OTP="";
afterAll(function(done) {
    process.nextTick(done);
});

describe('UIDS-1368 Add EMAIL 2FA [in My Account] ----- ', function() {


    it(browser.tc_desc('UIDS-1628 TC1 (1) Verify Add Email option is available'), function() {

        expect(myactpage.twoStep.twoStepAddEmail(browser.params.user.authentication.language.secondFactor.addEmail).isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1628 TC2 (1) Click on Add Email'), function() {


        myactpage.twoStep.twoStepAddEmail(browser.params.user.authentication.language.secondFactor.addEmail).click();

        myactpage.addEmail.addEmailSubtitle.getText().then(function(text)
                {
            expect( text.trim()).toEqual(browser.params.user.authentication.language.otpEmail.stmtInstruction);
                });
    });

    it(browser.tc_desc('UIDS-1934 TC1 verify water mark on email text box on my account add email page'), function() {
        expect(actpage.registerEmail.emailPlaceholder.getText()).toEqual(browser.params.user.authentication.language.otpEmail.phEmail);
    });

    it(browser.tc_desc('UIDS-1616 of UIDS-895 TC1 (1) Check presence of Help Button on second factor selection page'), function() {

        browser.wait(EC.visibilityOf(myactpage.addEmail.helpLink), 120000, 'Help Link is not displayed');
        myactpage.addEmail.helpLink.getText().then(function(text)
                {
            var text;
            var expected = browser.params.user.authentication.language.mobnav.help;
            if ( browser.deviceName === 'Edge'){

                /* The Edge browser provides a lower-cased version of the text with
                 * extra whitespace, even though it displays it to the user in
                 * uppercase.  So for this browser only, we make the comparison
                 * case-insensitive. */
                text = text.trim().toUpperCase();
                expected=expected.toUpperCase();
            }
            expect(text).toEqual(expected);
                });
    });

    it(browser.tc_desc('UIDS-1616 of UIDS-895 TC2 and TC3 (1) Click on help button (2) Check the content'), function() {

        myactpage.addEmail.helpLink.click();
        browser.wait(EC.visibilityOf(myactpage.addEmail.helpLinkContent), 120000, 'help content is not displayed');
        expect(myactpage.addEmail.helpLinkContent.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1616 of UIDS-895 TC6 (1) Verify help menu is closed (2) clicking on close button'), function() {

        myactpage.addEmail.helpLinkClose.click();
        expect(myactpage.addEmail.helpLinkContent.isPresent()).toEqual(false);
    });

    it(browser.tc_desc('UIDS-1628 TC3 (1) Verify the elements in Add Email Modal'), function() {

        if ( browser.mobile )
        {
            expect(myactpage.addEmail.addEmailHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.regSelect.email);
        }

        else {

            expect(myactpage.addEmail.addEmailHeader.getText()).toEqual(browser.params.user.authentication.language.regSelect.email);
        }

        myactpage.addEmail.addEmailHelpBtn.getText().then(function(text)
                {
            var text;
            var expected=browser.params.user.authentication.language.mobnav.help;
            if ( browser.deviceName === 'Edge'){

                /* The Edge browser provides a lower-cased version of the text with
                 * extra whitespace, even though it displays it to the user in
                 * uppercase.  So for this browser only, we make the comparison
                 * case-insensitive. */
                text = text.trim().toUpperCase();
                expected=expected.toUpperCase();
            }
            expect(text).toEqual(expected);
                });

        myactpage.addEmail.addEmailContinueBtn.getText().then(function(text)
                {
            var text;
            var expected=browser.params.user.authentication.language.otpEmail.btnContinue.toUpperCase();
            if ( browser.deviceName === 'Edge'){
                text = text.trim().toUpperCase();

            }
            browser.executeScript("arguments[0].scrollIntoView();",myactpage.addEmail.addEmailContinueBtn);
            expect(text).toEqual(expected);
                });

        myactpage.addEmail.addEmailSubtitle.getText().then(function(text)
                {
            expect(text.trim()).toEqual(browser.params.user.authentication.language.otpEmail.stmtInstruction);
                });

        expect(myactpage.addEmail.addEmailCloseBtn.isDisplayed()).toBeTruthy();
        expect(myactpage.addEmail.addEmailTextBox.isDisplayed()).toBeTruthy();
        expect(myactpage.addEmail.addEmailEmailLabel.getText()).toEqual(browser.params.user.authentication.language.otpEmail.lbEmail);
    });

    it(browser.tc_desc('UIDS-1628 TC4a (1) Enter a valid email (2) Click on continue button'), function() {

        myactpage.addEmail.addEmailTextBox.sendKeys(browser.params.user.authentication.secondFactorEmailNew);
        browser.indirectClick(myactpage.addEmail.addEmailContinueBtn);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on my account add email passcode'), function() {

        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLink), 120000, 'Help Link is not displayed');

        actpage.confirmCode.helpLink.getText().then(function(text){

            var text;
            var expected=browser.params.user.authentication.language.mobnav.help;
            if ( browser.deviceName === 'Edge'){

                /* The Edge browser provides a lower-cased version of the text with
                 * extra whitespace, even though it displays it to the user in
                 * uppercase.  So for this browser only, we make the comparison
                 * case-insensitive. */
                text = text.trim().toUpperCase();
                expected=expected.toUpperCase();
            }
            expect(text).toEqual(expected);
        });

    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on my account add email passcode (2) Check the content'), function() {

        actpage.confirmCode.helpLink.click();
        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLinkContent), 120000, 'help content is not displayed');
        expect(actpage.confirmCode.helpLinkContent.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on my account add email passcode (2) clicking on close button'), function() {

        actpage.confirmCode.helpLinkClose.click();
        expect(actpage.confirmCode.helpLinkContent.isPresent()).toEqual(false);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
    });

    it(browser.tc_desc('UIDS-1616 Story verify header , subheader , copyright ,continue button text  passcode page'), function() {
        browser.wait(EC.visibilityOf(actpage.confirmCode.codeErrorAccLock), 12000, 'Message is not displayed');
        expect(actpage.confirmCode.codeErrorAccLock.getText()).toContain(browser.params.user.authentication.language.regVerifyCode.subtitleEmailPhone);

        if ( !browser.mobile )
        {
            browser.executeScript("arguments[0].scrollIntoView();",actpage.confirmCode.VerifyCodeBtn);
            actpage.confirmCode.VerifyCodeBtn.getText().then(function(text)
                    {
                expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.confirm.btnConfirm.toUpperCase());
                    });
        }
        else
        {
            console.log("This functionalty is not for mobile");
        }

        if ( !browser.mobile ) {
            expect(actpage.confirmCode.verifyCodeHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
        }
        else {
            expect(actpage.confirmCode.verifyCodeHeaderMob.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
        }


    });

    it(browser.tc_desc('Generate OTP for the other second factor email'), function() {
        var emailSecondFactorReplaced = browser.params.user.authentication.secondFactorEmailNew.replace("+", "%2B");
        console.log("ppid value on other page"+regp1.ppid);
        var deferred = protractor.promise.defer();
        var options1 = {
                method: 'GET',
                url: "https://uis-qa2.icsl.net:10446/automation/otp/next?personPpid="+regp1.ppid+"&contact="+emailSecondFactorReplaced+"&contactType=EMAIL&otpTypeCd=UIS%20E-MAIL",
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

    it(browser.tc_desc('UIDS-1628 TC4b (1) Enter passcode for email added as other second factor'), function() {

        var codex = OTP;
        for (var i = 0; i < 6; i++)  {
            browser.driver.actions().mouseMove(actpage.confirmCode.codeInput(i)).click().sendKeys(codex[i]).perform();

        }
        browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountHeader), 120000, 'My Account header is not displayed');
        expect((myactpage.myAccount.myAccountHeader).isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepEmailNewAdded), 120000, 'Email is not displayed');
        expect(myactpage.twoStep.twoStepEmailNewAdded.getText()).toContain(browser.params.user.authentication.secondFactorEmailNew);
    });
});