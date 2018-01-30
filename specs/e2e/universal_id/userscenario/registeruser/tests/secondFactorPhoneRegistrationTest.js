'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');
var dpage = require('../pages/personalDetailsPage.js');
var request = require('request');
var regp1= require('../tests/registrationStep1Test.js');
var OTP="";

afterAll(function(done) {
    process.nextTick(done);
});



describe('UIDS-1079  Second Factor Phone option ----- ', function() {
    browser.ignoreSynchronization = false;

    it(browser.tc_desc('UIDS-1100 TC1 Go to register phone page'), function() {

        browser.wait(EC.visibilityOf(actpage.account.registerPhoneLink), 120000, 'register phone link is missing or the App is down!');
        actpage.account.registerPhoneLink.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneTitleLabelSubText), 120000, 'phone option subtext is missing, or the App is down!');
        if ( !browser.mobile ){

            actpage.registerPhone.phoneTitleLabel.getText().then(function(text)
                    {
                expect(text.toUpperCase()).toEqual(browser.params.user.authentication.language.otpPhone.title.toUpperCase());
                    });

        }

        else {

            expect(actpage.registerPhone.phoneTitleLabelMobile.getText()).toEqual(browser.params.user.authentication.language.otpPhone.title.toUpperCase());
        }

    });

    it(browser.tc_desc('UIDS-1100 TC2 Inspect title of the page'), function() {
        expect(browser.getTitle()).toBe('Second Factor Method - Phone');
    });


    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on 2 factor phone page'), function() {

        if ( !browser.mobile ) {
            browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
            expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
            browser.indirectClick(homeP.openfooterLink);
            browser.sleep(1000);
        }

        else {

            console.log('This functionality is not for mobile devices');
        }

    });

    it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on 2 factor phone page'), function() {

        if ( !browser.mobile ) {

            expect(homeP.footer.header.isDisplayed()).toBeTruthy();
            expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
            expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
            expect(homeP.footer.language.isDisplayed()).toBeTruthy();
            expect(homeP.footer.login.isDisplayed()).toBeTruthy();

        }

        else{

            console.log('This functionality is not for mobile devices');
        }

    });

    it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on 2 factor phone page'), function() {

        if ( !browser.mobile ) {

            browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
            expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
            homeP.closefooterLink.click();
        }

        else
        {

            console.log('This functionality is not for mobile devices');

        }

    });


    it(browser.tc_desc('UIDS-1100 TC5 & 6 Inspect page header and sub-header'), function() {

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                expect(actpage.registerPhone.phoneTitleLabelMobile.getText()).toBe(browser.params.user.authentication.language.otpPhone.title.toUpperCase());
            }

        }
        else {

            actpage.registerPhone.phoneTitleLabel.getText().then(function(text)
                    {
                expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.otpPhone.title.toUpperCase());
                    });
        }

        expect(actpage.registerPhone.phoneTitleLabelSubText.getText()).toBe(browser.params.user.authentication.language.otpPhone.stmtInstruction);
        browser.sleep(3000);
    });


    it(browser.tc_desc('UIDS-1100 TC8 Verify label of Country Code field'), function() {

        expect(actpage.registerPhone.countryLabel.getText()).toEqual(browser.params.user.authentication.language.otpPhone.lbCountryCode);
    });

    it(browser.tc_desc('UIDS-1100 TC10 Verify label and placeholder of phone number field'), function() {

        expect(actpage.registerPhone.phoneNumberLabel.getText()).toEqual(browser.params.user.authentication.language.otpPhone.lbPhoneNumber);
        expect(actpage.registerPhone.phoneNumberPlaceholder.getText()).toEqual(browser.params.user.authentication.language.otpPhone.phoneNumber);
    });

    it(browser.tc_desc('UIDS-1100 TC15a Verify label of get verification field'), function() {

        expect(actpage.registerPhone.getVerificationCodeLabel.getText()).toEqual(browser.params.user.authentication.language.otpPhone.lbGetVerificationCode);
    });

    it(browser.tc_desc('UIDS-1100 TC15b Verify Text me text'), function() {

        actpage.registerPhone.contactOption(browser.params.user.authentication.language.otpPhone.lbTextMe).getText().then(function(text)
                {
            expect( text.trim()).toBe(browser.params.user.authentication.language.otpPhone.lbTextMe);
                });
    });

    it(browser.tc_desc('UIDS-1100 TC15c Verify Call me text'), function() {

        actpage.registerPhone.contactOption(browser.params.user.authentication.language.otpPhone.lbCallMe).getText().then(function(text)
                {
            expect( text.trim()).toBe(browser.params.user.authentication.language.otpPhone.lbCallMe);
                });
    });

    it(browser.tc_desc('UIDS-1100 TC5 Verify header, button text and copyright text'), function() {
        expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
        actpage.registerPhone.continueBtn.getText().then(function(text)
                {
            expect(text.toUpperCase()).toBe(browser.params.user.authentication.language.otpPhone.btnContinue.toUpperCase());
                });

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
    });


    it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on register phone page'), function() {

        if ( !browser.mobile ) {

            expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
        }

        else {

            console.log("This functionality is not for mobile devices");
        }

    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on second factor Phone page'), function() {

        browser.wait(EC.visibilityOf(actpage.registerPhone.helpLink), 120000, 'Help Link is not displayed');
        actpage.registerPhone.helpLink.getText().then(function(text)
                {
            var text;
            var expected = browser.params.user.authentication.language.mobnav.help;
            if (browser.deviceName === 'Edge'){
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



    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on second factor Phone page (2) Check the content'), function() {

        actpage.registerPhone.helpLink.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.helpLinkContent), 120000, 'help content is not displayed');
        expect(actpage.registerPhone.helpLinkContent.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on second factor Phone page (2) clicking on close button'), function() {

        actpage.registerPhone.helpLinkClose.click();
        expect(actpage.registerPhone.helpLinkContent.isPresent()).toEqual(false);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberEditBox), 120000, 'phone option subtext is missing, or the App is down!');
    });




//  it(browser.tc_desc('UIDS-1100 TC7 Click on Back button'), function() {
//  actpage.registerPhone.backBtn.click();
//  browser.waitForAngular();
//  browser.wait(EC.visibilityOf(actpage.account.registerPhoneLink), 120000, 'register phone link is missing or the App is down!');
//  browser.wait(EC.visibilityOf(actpage.account.subTitleText), 120000, 'phone option subtext is missing, or the App is down!');
//  expect(actpage.account.subTitleText.getText()).toBe(browser.params.user.authentication.language.regSelect.desc);


//  });


    it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify user is redirected to 2 factor selection page'), function() {
        browser.wait(EC.visibilityOf(actpage.registerPhone.backBtn), 120000, 'Back button on phone registration page is not displayed');
        actpage.registerPhone.backBtn.click();
        browser.wait(EC.visibilityOf(actpage.account.registerPhoneLink), 120000, 'Options are not available');
        expect(actpage.account.registerPhoneLink.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1677 TC 4b (1) Click on register phone link (2) Verify user is redirected to register phone page'), function() {

        actpage.account.registerPhoneLink.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberEditBox), 120000, 'Phone number edit box is not displayed');
        expect(actpage.registerPhone.phoneNumberEditBox.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1100 TC11 enter (1) Country code (2) Phone number'), function() {

        browser.wait(EC.visibilityOf(actpage.registerPhone.countryCode), 120000, 'country code option is not visible');
        actpage.registerPhone.countryCode.sendKeys("india");
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneTitleLabelSubText), 120000, 'phone option subtext is missing, or the App is down!');

        actpage.registerPhone.phoneNumberEditBox.sendKeys(browser.params.user.authentication.secondFactorPhone);


        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
            }

        }
        browser.sleep(1000);
        browser.indirectClick(actpage.registerPhone.continueBtn);
        browser.waitForAngular();

        browser.sleep(1000);
        expect(4).toBe(4);

    });


    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on passcode page through phone'), function() {

        if ( !browser.mobile ) {

            browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
            expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
            browser.indirectClick(homeP.openfooterLink);
            browser.sleep(1000);
        }

        else {

            console.log('This functionality is not for mobile devices');
        }

    });

    it(browser.tc_desc('UIDS-1367 Story TC2 (1) check Menu Items are available on passcode page'), function() {

        if ( !browser.mobile ) {

            expect(homeP.footer.header.isDisplayed()).toBeTruthy();
            expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
            expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
            //	expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
            expect(homeP.footer.language.isDisplayed()).toBeTruthy();
            expect(homeP.footer.login.isDisplayed()).toBeTruthy();

        }

        else{

            console.log('This functionality is not for mobile devices');
        }

    });

    it(browser.tc_desc('UIDS-1367 Story TC3 (1) check Menu can be closed on passcode page'), function() {

        if ( !browser.mobile ) {

            browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
            expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
            homeP.closefooterLink.click();
        }

        else
        {

            console.log('This functionality is not for mobile devices');

        }

    });


    it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on confirm passcode page'), function() {

        if ( !browser.mobile ) {

            expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
        }

        else {

            expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
        }

    });



    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on passcode page through phone'), function() {

        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLink), 120000, 'Help Link is not displayed');

        actpage.confirmCode.helpLink.getText().then(function(text)
                {
            var text;
            var expected= browser.params.user.authentication.language.mobnav.help;
            if (browser.deviceName === 'Edge'){
                /* The Edge browser provides a lower-cased version of the text with
                 * extra whitespace, even though it displays it to the user in
                 * uppercase.  So for this browser only, we make the comparison
                 * case-insensitive. */
                text.trim().toUpperCase();
                expected= expected.toUpperCase();
            }

            expect(text).toEqual(expected);
                });
    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on passcode page through phone (2) Check the content'), function() {

        actpage.confirmCode.helpLink.click();
        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLinkContent), 120000, 'help content is not displayed');
        expect(actpage.confirmCode.helpLinkContent.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on passcode page through phone (2) clicking on close button'), function() {

        actpage.confirmCode.helpLinkClose.click();
        expect(actpage.confirmCode.helpLinkContent.isPresent()).toEqual(false);
        browser.wait(EC.visibilityOf(actpage.confirmCode.backBtn), 120000, 'Back button on confirm passcode page is not displayed');
    });

    it(browser.tc_desc('UIDS-1367 Story TC3 (1) verify header , subheader , copyright ,continue button text  passcode page'), function() {

        if ( !browser.mobile ) {
            expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
        }

        expect(actpage.confirmCode.codeErrorAccLock.getText()).toContain(browser.params.user.authentication.language.regVerifyCode.subtitleEmailPhone);

        if ( !browser.mobile )
        {
            actpage.verifyPhone.continueBtn.getText().then(function(text)
                    {
                expect((text.trim()).toUpperCase()).toBe(browser.params.user.authentication.language.regVerifyCode.btnConfirm.toUpperCase());
                    });
        } else{
            console.log("This functionalty is not for mobile");
        }
        if (browser.params.langOption === 'es') {
            homeP.footer.copyrightMsgOne.getText().then(function (text) {
                var abc = text.toString().replace("\n", " ");
                expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential _Español");
            });
            if ( !browser.mobile ) {
                expect(actpage.verifyPhone.verifyCodeHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
            }
            else {
                expect(actpage.verifyPhone.verifyCodeHeaderMob.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
            }
        }
        else if (browser.params.langOption === 'ja') {
            homeP.footer.copyrightMsgOne.getText().then(function (text) {
                var abc = text.toString().replace("\n", " ");
                expect(abc).toEqual("著作権 Ⓒ 2017年 Zentry独自および機密");
            });
            if ( !browser.mobile ) {
                expect(actpage.verifyPhone.verifyCodeHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
            }
            else {
                expect(actpage.verifyPhone.verifyCodeHeaderMob.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
            }
        }
        else if (browser.params.langOption === 'en') {
            homeP.footer.copyrightMsgOne.getText().then(function (text) {
                var abc = text.toString().replace("\n", " ");
                expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential");
            });
            if ( !browser.mobile ) {
                expect(actpage.verifyPhone.verifyCodeHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
            }
            else {
                expect(actpage.verifyPhone.verifyCodeHeaderMob.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.title);
            }
        }
    });


    it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify user is redirected to register phone page'), function() {
        browser.wait(EC.visibilityOf(actpage.confirmCode.backBtn), 120000, 'Back button on confirm passcode page is not displayed');
        actpage.confirmCode.backBtn.click();
        browser.wait(EC.visibilityOf(actpage.registerPhone.phoneNumberEditBox), 120000, 'Phone Edit box is not displayed');
        expect(actpage.registerPhone.phoneNumberEditBox.isDisplayed()).toBeTruthy();


    });

    it(browser.tc_desc('UIDS-1677 TC 4b (1) Verify the phone added earlier is displayed'), function() {

        expect(actpage.registerPhone.phoneNumberEditBox.getAttribute("value")).toBe(browser.params.user.authentication.secondFactorPhone);
        expect(actpage.registerPhone.phoneNumberEditBox.isDisplayed()).toBeTruthy();

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                actpage.registerPhone.phoneTitleLabelSubText.click();        //hide the virtual keyboard
            }

        }

        browser.sleep(1000);
        browser.wait(EC.visibilityOf(actpage.registerPhone.countryCode), 120000, 'country code option is not visible');
        actpage.registerPhone.countryCode.sendKeys("india");
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        browser.wait(EC.visibilityOf(actpage.registerPhone.continueBtn), 120000, 'Continue button is not displayed');
        browser.sleep(1000);
        browser.indirectClick(actpage.registerPhone.continueBtn);

    });


    it(browser.tc_desc('Generate OTP for the second factor phone'), function() {
        var phoneNumber = browser.params.user.authentication.secondFactorPhone;
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

    it(browser.tc_desc('UIDS-1100 TC17 Enter Pass code'), function() {
        actpage.confirmCode.enterOTP(OTP);
        browser.sleep(5000);
        browser.wait(EC.visibilityOf(myactpage.success.successHeader), 120000, 'My Account success header is not displayed');
        expect((myactpage.success.successHeader).isDisplayed()).toBeTruthy();
    });
});