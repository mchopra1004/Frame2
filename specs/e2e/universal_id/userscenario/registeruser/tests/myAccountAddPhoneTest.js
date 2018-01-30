'use strict';
var myactpage = require('../pages/myAccountPage.js');
var actpage = require('../pages/accountPage.js');
var homeP = require('../../../common/pages/homePage.js');
var request = require('request');
var regp1= require('../tests/registrationStep1Test.js');
var dpage = require('../pages/personalDetailsPage.js');
var OTP="";
afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-1371 Add Phone 2FA [in My Account] ----- ', function() {


    it(browser.tc_desc('UIDS-1678 TC3 (1) Verify Add phone option is available'), function() {
        expect(myactpage.twoStep.twoStepAddPhone(browser.params.user.authentication.language.secondFactor.addPhone).isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1628 TC2 (1) Click on Add Phone'), function() {
        myactpage.twoStep.twoStepAddPhone(browser.params.user.authentication.language.secondFactor.addPhone).click();
        myactpage.addPhone.addPhoneSubtitle.getText().then(function(text)
                {
            expect( text.trim()).toEqual(browser.params.user.authentication.language.otpPhone.stmtInstruction);
                });
    });

    it(browser.tc_desc('UIDS-1678 TC4b (1) Verify header of add phone modal'), function() {
        if ( browser.mobile ) {

            expect(myactpage.addPhone.addPhoneHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.regSelect.phone);
        }
        else {

            expect(myactpage.addPhone.addPhoneHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.regSelect.phone);
        }
    });

    it(browser.tc_desc('UIDS-1678 TC4c Verify label of Country Code field'), function() {
        expect(myactpage.addPhone.addPhonecountryLabel.getText()).toEqual(browser.params.user.authentication.language.otpPhone.lbCountryCode);
    });

    it(browser.tc_desc('UIDS-1678 TC4d Verify label and placeholder of phone number field'), function() {
        myactpage.addPhone.addPhoneTextBox.clear();
        expect(myactpage.addPhone.addPhoneLabel.getText()).toEqual(browser.params.user.authentication.language.otpPhone.lbPhoneNumber);
        expect(actpage.registerPhone.phoneNumberPlaceholder.getText()).toEqual(browser.params.user.authentication.language.otpPhone.phoneNumber);
    });

    it(browser.tc_desc('UIDS-1678 TC4e Verify label of get verification field'), function() {
        expect(myactpage.addPhone.addPhonegetVerificationCodeLabel.getText()).toEqual(browser.params.user.authentication.language.otpPhone.lbGetVerificationCode);
    });

    it(browser.tc_desc('UIDS-1678 TC4f Verify Text me text'), function() {
        myactpage.addPhone.addPhoneContactOption(browser.params.user.authentication.language.otpPhone.lbTextMe).getText().then(function(text)
                {
            expect( text.trim()).toBe(browser.params.user.authentication.language.otpPhone.lbTextMe);
                });
    });

    it(browser.tc_desc('UIDS-1678 TC4g Verify Call me text '), function() {
        myactpage.addPhone.addPhoneContactOption(browser.params.user.authentication.language.otpPhone.lbCallMe).getText().then(function(text)
                {
            expect( text.trim()).toBe(browser.params.user.authentication.language.otpPhone.lbCallMe);
                });
    });

    it(browser.tc_desc('UIDS-1678 TC5a (1) Check presence of Help Button on second factor Phone page'), function() {
        browser.wait(EC.visibilityOf(actpage.registerPhone.helpLink), 120000, 'Help Link is not displayed');

        actpage.registerPhone.helpLink.getText().then(function(text)
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

    it(browser.tc_desc('UIDS-1678 TC5b (1) Click on help button on second factor Phone page (2) Check the content'), function() {
        actpage.registerPhone.helpLink.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.helpLinkContent), 120000, 'help content is not displayed');
        expect(actpage.registerPhone.helpLinkContent.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1678 TC5c (1) Verify help menu is closed on second factor Phone page (2) clicking on close button'), function() {
        actpage.registerPhone.helpLinkClose.click();
        expect(actpage.registerPhone.helpLinkContent.isPresent()).toEqual(false);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberEditBox), 120000, 'phone option subtext is missing, or the App is down!');
    });

    it(browser.tc_desc('UIDS-1678 TC4h (1) Verify button text on add phone modal'), function() {
        browser.executeScript("arguments[0].scrollIntoView();",myactpage.addPhone.addPhoneContinueBtn);
        expect(myactpage.addPhone.addPhoneContinueBtn.getText()).toEqual(browser.params.user.authentication.language.otpEmail.btnContinue.toUpperCase());
    });

    it(browser.tc_desc('UIDS-1678 TC8 and 9 (1) Enter country code and phone number'), function() {
        browser.wait(EC.visibilityOf(myactpage.addPhone.addPhoneCountryCode), 120000, 'country code option is not visible');
        myactpage.addPhone.addPhoneCountryCode.sendKeys("india");
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        browser.wait(EC.visibilityOf(myactpage.addPhone.addPhoneSubtitle), 120000, 'phone option subtext is missing, or the App is down!');
        myactpage.addPhone.addPhoneTextBox.sendKeys(browser.params.user.authentication.secondFactorPhoneNew);

        if ( browser.mobile ) {
            myactpage.addPhone.addPhoneSubtitle.click();        //hide the virtual keyboard
        }

        browser.sleep(2000);
        browser.indirectClick(myactpage.addPhone.addPhoneContinueBtn);
        browser.waitForAngular();
        browser.sleep(1000);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
    });


    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on my account add phone passcode'), function() {
        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLink), 120000, 'Help Link is not displayed');

        actpage.confirmCode.helpLink.getText().then(function(text)
                {
            var text;
            var expected = browser.params.user.authentication.language.mobnav.help;
            if ( browser.deviceName === 'Edge'){
                /* The Edge browser provides a lower-cased version of the text with
                 * extra whitespace, even though it displays it to the user in
                 * uppercase.  So for this browser only, we make the comparison
                 * case-insensitive. */
                text = text.trim().toUpperCase();
                expected = expected.toUpperCase();
            }
            expect(text).toEqual(expected);
                });
    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on my account add phone passcode (2) Check the content'), function() {
        actpage.confirmCode.helpLink.click();
        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLinkContent), 120000, 'help content is not displayed');
        expect(actpage.confirmCode.helpLinkContent.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on my account add phone passcode (2) clicking on close button'), function() {
        actpage.confirmCode.helpLinkClose.click();
        expect(actpage.confirmCode.helpLinkContent.isPresent()).toEqual(false);
        browser.wait(EC.visibilityOf(actpage.verifyPhone.verifyCodeBox), 12000, 'verify code is not visible on the code verify page');
        expect(actpage.verifyPhone.codeEditBox.count()).toBe(6);
    });

    it(browser.tc_desc('UIDS-1616 Story verify header , subheader , copyright ,continue button text  passcode page'), function() {
        browser.wait(EC.visibilityOf(actpage.confirmCode.codeErrorAccLock), 12000, 'Message is not displayed');
        expect(actpage.confirmCode.codeErrorAccLock.getText()).toContain(browser.params.user.authentication.language.regVerifyCode.subtitleEmailPhone);
        if ( !browser.mobile ) {
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

    it(browser.tc_desc('Generate OTP for the other second factor phone'), function() {
        var phoneNumber = browser.params.user.authentication.secondFactorPhoneNew;
        console.log("ppid value on other page"+regp1.ppid);
        var deferred = protractor.promise.defer();
        var options1 = {
                method: 'GET',
                url: "https://uis-qa2.icsl.net:10446/automation/otp/next?personPpid="+regp1.ppid+"&contact="+phoneNumber+"&contactType=PHONE&otpTypeCd=UIS+SMS",
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

    it(browser.tc_desc('UIDS-1678 TC10 Enter Pass code'), function() {
        var codex = OTP;
        for (var i = 0; i < codex.length; i++)  {
            browser.driver.actions().mouseMove(actpage.confirmCode.codeInput(i)).click().sendKeys(codex[i]).perform();
            console.log("code:"+codex[i]);
        }
        browser.wait(EC.visibilityOf(myactpage.myAccount.myAccountHeader), 120000, 'My Account header is not displayed');
        expect((myactpage.myAccount.myAccountHeader).isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepPhoneNewAdded), 120000, 'Email is not displayed');
        expect(myactpage.twoStep.twoStepPhoneNewAdded.getText()).toContain("+91-"+browser.params.user.authentication.secondFactorPhoneNew);
    });
});