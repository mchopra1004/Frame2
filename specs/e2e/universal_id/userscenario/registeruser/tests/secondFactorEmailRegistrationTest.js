'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var actpage = require('../pages/accountPage.js');
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');
var request = require('request');
var regp1= require('../tests/registrationStep1Test.js');
var OTP="";
afterAll(function(done) {
    process.nextTick(done);
});

//describe(browser.params.langOption+' '+browser.browserName+'   '+browser.deviceName+'  '+'UIDS-887   Second Factor Authentication-Email', function() {


describe('UIDS-843  Second Factor Email Option ----- ', function() {
    browser.ignoreSynchronization = false;

    it(browser.tc_desc('UIDS-1115 TC1 Go to register email page'), function() {

        browser.wait(EC.visibilityOf(actpage.account.registerEmailLink), 120000, 'register email link is missing or the App is down!');
        actpage.account.registerEmailLink.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailPageSubtitle), 120000, 'email option subtext is missing, or the App is down!');
        expect(actpage.registerEmail.emailEditBox.isDisplayed()).toBeTruthy();
    });


    it(browser.tc_desc('UIDS-1115 TC2 Inspect title of the page'), function() {
        expect(browser.getTitle()).toBe(browser.params.user.authentication.language.titles.OTPEmailPage);
    });

    it(browser.tc_desc('Verify copyright, continue button, UNIVERSAL ID text'), function() {

        if ( !browser.mobile ) {
            expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
        }


        actpage.registerEmail.emailContinueBtn.getText().then(function(text)
                {
            expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.otpEmail.btnContinue.toUpperCase());
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


    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on 2 factor email page'), function() {

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

    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Items are available on 2 factor email page'), function() {

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

    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu can be closed on 2 factor email page'), function() {

        if ( !browser.mobile ) {

            browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
            expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
            homeP.closefooterLink.click();
            //browser.indirectClick(homeP.closefooterLink);
        }

        else
        {

            console.log('This functionality is not for mobile devices');

        }

    });

    it(browser.tc_desc('UIDS-1115 TC5 & 6 Inspect page sub-header and header'), function() {
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                expect(actpage.registerEmail.emailPageTitleMobile.getText()).toBe(browser.params.user.authentication.language.otpEmail.title.toUpperCase());
            }

        }
        else {


            actpage.registerEmail.emailPageTitle.getText().then(function(text)
                    {
                expect( text.toUpperCase()).toBe(browser.params.user.authentication.language.otpEmail.title.toUpperCase());
                    });

        }

        actpage.registerEmail.emailPageSubtitle.getText().then(function(text)
                {
            expect( text.trim()).toBe(browser.params.user.authentication.language.otpEmail.stmtInstruction);
                });

        browser.sleep(3000);
    });



    it(browser.tc_desc('UIDS-1115 TC4 Verify label and placeholder of email field'), function() {

        expect(actpage.registerEmail.emailLabel.getText()).toEqual(browser.params.user.authentication.language.otpEmail.lbEmail);
        expect(actpage.registerEmail.emailPlaceholder.getText()).toEqual(browser.params.user.authentication.language.otpEmail.phEmail);
    });

    it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on register email page'), function() {

        //expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();

        if ( !browser.mobile ) {


            expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
        }

        else {

            console.log("This functionality is not for mobile devices");
        }
    });


    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on second factor Email page'), function() {

        browser.wait(EC.visibilityOf(actpage.registerEmail.helpLink), 120000, 'Help Link is not displayed');

        if ( browser.deviceName === 'Edge'){

            actpage.registerEmail.helpLink.getText().then(function(text)
                    {
                expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help);
                    });
        }
        else {
            expect(actpage.registerEmail.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
        }



    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on second factor Email page (2) Check the content'), function() {

        actpage.registerEmail.helpLink.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.helpLinkContent), 120000, 'help content is not displayed');
        expect(actpage.registerEmail.helpLinkContent.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on second factor Email page  (2) clicking on close button'), function() {

        actpage.registerEmail.helpLinkClose.click();
        expect(actpage.registerEmail.helpLinkContent.isPresent()).toEqual(false);
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailEditBox), 120000, 'Email edit box is missing, or the App is down!');



    });

//  it(browser.tc_desc('UIDS-1115 TC7 Click on Back button'), function() {
//  actpage.registerEmail.emailBackBtn.click();
//  browser.waitForAngular();
//  browser.wait(EC.visibilityOf(actpage.account.registerEmailLink), 120000, 'register Email link is missing or the App is down!');
//  browser.wait(EC.visibilityOf(actpage.account.subTitleText), 120000, 'Email option subtext is missing, or the App is down!');
//  expect(actpage.account.subTitleText.getText()).toBe(browser.params.user.authentication.language.regSelect.desc);


//  });


    it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify user is redirected to 2 factor selection page'), function() {
        browser.wait(EC.visibilityOf(actpage.registerEmail.backbtn), 120000, 'Back button on phone registration page is not displayed');
        actpage.registerEmail.backbtn.click();
        browser.wait(EC.visibilityOf(actpage.account.registerEmailLink), 120000, 'Options are not available');
        expect(actpage.account.registerEmailLink.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1677 TC 4b (1) Click on register email link (2) Verify user is redirected to register email page'), function() {

        actpage.account.registerEmailLink.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailEditBox), 120000, 'Email edit box is not displayed');
        expect(actpage.registerEmail.emailEditBox.isDisplayed()).toBeTruthy();

    });
    it(browser.tc_desc('UIDS-1115 TC10 enter email address'), function() {
        //actpage.account.registerEmailLink.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailPageSubtitle), 120000, 'Email option subtext is missing, or the App is down!');

        actpage.registerEmail.emailEditBox.sendKeys(browser.params.user.authentication.secondFactorEmail);
        actpage.registerEmail.emailPageSubtitle.click();


        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                actpage.registerEmail.emailPageSubtitle.click()  //hide the virtual keyboard
            }

        }

        browser.sleep(1000);
        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
        browser.waitForAngular();

        browser.sleep(1000);
        expect(4).toBe(4);
        /*
		if (browser.params.target === 'remote') {

			if ( browser.mobile )
			{
				actpage.registerPhone.contactOption('Text Me').click();  // hide virtual keyboards
			}
		}

		actpage.registerPhone.continueBtn.click();
		browser.waitForAngular();
		browser.sleep(5000);*/
    });



    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Link is clickable on passcode page through email'), function() {

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

    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu Items are available on passcode page'), function() {

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

    it(browser.tc_desc('UIDS-1367 Story TC1 (1) check Menu can be closed on passcode page'), function() {

        if ( !browser.mobile ) {

            browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
            expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
            homeP.closefooterLink.click();
            //browser.indirectClick(homeP.closefooterLink);
        }

        else
        {

            console.log('This functionality is not for mobile devices');

        }

    });


    it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on confirm passcode page'), function() {

//      expect(homeP.footer.copyrightMsgOne.isDisplayed()).toBeTruthy();

        if ( !browser.mobile ) {

            expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
        }

        else {

            expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
        }


    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC1 (1) Check presence of Help Button on passcode page through email'), function() {

        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLink), 120000, 'Help Link is not displayed');

        if ( browser.deviceName === 'Edge'){

            actpage.confirmCode.helpLink.getText().then(function(text)
                    {
                expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help);
                    });
        }
        else {
            expect(actpage.confirmCode.helpLink.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
        }
    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC2 and TC3 (1) Click on help button on passcode page through email (2) Check the content'), function() {

        actpage.confirmCode.helpLink.click();
        browser.wait(EC.visibilityOf(actpage.confirmCode.helpLinkContent), 120000, 'help content is not displayed');
        expect(actpage.confirmCode.helpLinkContent.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1616 in UIDS-895 TC6 (1) Verify help menu is closed on passcode page through email (2) clicking on close button'), function() {

        actpage.confirmCode.helpLinkClose.click();
        expect(actpage.confirmCode.helpLinkContent.isPresent()).toEqual(false);
        browser.wait(EC.visibilityOf(actpage.confirmCode.backBtn), 120000, 'Back button on confirm passcode page is not displayed');
    });


    it(browser.tc_desc('UIDS-1677 TC 4a (1) Click on back button (2) Verify user is redirected to register email page'), function() {
        browser.wait(EC.visibilityOf(actpage.confirmCode.backBtn), 120000, 'Back button on confirm passcode page is not displayed');
        actpage.confirmCode.backBtn.click();
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailEditBox), 120000, 'Email Edit box is not displayed');
        expect(actpage.registerEmail.emailEditBox.isDisplayed()).toBeTruthy();


    });


    it(browser.tc_desc('UIDS-1677 TC 4b (1) Verify the email added earlier is displayed'), function() {

        expect(actpage.registerEmail.emailEditBox.getAttribute("value")).toBe(browser.params.user.authentication.secondFactorEmail);
        expect(actpage.registerEmail.emailEditBox.isDisplayed()).toBeTruthy();
        if (browser.params.target === 'remote') {
            if ( browser.mobile )
            {
                actpage.registerEmail.emailPageSubtitle.click()  //hide the virtual keyboard
            }
        }
        browser.sleep(1000);
        browser.wait(EC.visibilityOf(actpage.registerEmail.emailContinueBtn), 120000, 'Continue button is not displayed');
        browser.indirectClick(actpage.registerEmail.emailContinueBtn);
    });

    it(browser.tc_desc('UIDS-1115 Story verify header , subheader , copyright ,continue button text  passcode page'), function() {
        browser.wait(EC.visibilityOf(actpage.confirmCode.codeErrorAccLock), 120000, 'Message is not displayed');
        if ( !browser.mobile ) {
            expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);
            expect(actpage.confirmCode.VerifyCodeBtn.getText()).toEqual(browser.params.user.authentication.language.confirm.btnConfirm.toUpperCase());
        }

        else {
            console.log("This functionality is not for mobile");
        }
        expect(actpage.confirmCode.codeErrorAccLock.getText()).toEqual(browser.params.user.authentication.language.regVerifyCode.subtitleEmailPhone+" "+browser.params.user.authentication.secondFactorEmail);

//      browser.wait(EC.visibilityOf(actpage.confirmCode.nocode), 65000, 'No code, tap to resend displayed');
//      expect(actpage.confirmCode.nocode.getText()).toContain(browser.params.user.authentication.language.regVerifyCode.nocode);


        if (browser.params.langOption === 'es') {
            homeP.footer.copyrightMsgOne.getText().then(function (text) {
                var abc = text.toString().replace("\n", " ");
                expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential _Español");
            });
            if ( !browser.mobile ) {
                expect(actpage.registerEmail.verifyCodeHeaderWeb.getText()).toEqual("CONFIRM CODE _Español");
            }
            else {
                expect(actpage.registerEmail.verifyCodeHeaderMob.getText()).toEqual("CONFIRM CODE _Español");
            }
        }
        else if (browser.params.langOption === 'ja') {
            homeP.footer.copyrightMsgOne.getText().then(function (text) {
                var abc = text.toString().replace("\n", " ");
                expect(abc).toEqual("著作権 Ⓒ 2017年 Zentry独自および機密");
            });
            if ( !browser.mobile ) {
                expect(actpage.registerEmail.verifyCodeHeaderWeb.getText()).toEqual("コードを確認する");
            }
            else {
                expect(actpage.registerEmail.verifyCodeHeaderMob.getText()).toEqual("コードを確認する");
            }
        }
        else if (browser.params.langOption === 'en') {
            homeP.footer.copyrightMsgOne.getText().then(function (text) {
                var abc = text.toString().replace("\n", " ");
                expect(abc).toEqual("Copyright Ⓒ 2017 Zentry Proprietary and Confidential");
            });
            if ( !browser.mobile ) {
                expect(actpage.registerEmail.verifyCodeHeaderWeb.getText()).toEqual("CONFIRM CODE");
            }
            else {
                expect(actpage.registerEmail.verifyCodeHeaderMob.getText()).toEqual("CONFIRM CODE");
            }
        }
    });

    it(browser.tc_desc('Generate OTP for the second factor email'), function() {
        var emailSecondFactorReplaced = browser.params.user.authentication.secondFactorEmail.replace("+", "%2B");
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

    it(browser.tc_desc('UIDS-1115 TC17 Enter Pass code for first email added as second factor'), function() {
        actpage.confirmCode.enterOTP(OTP);
        browser.sleep(5000);
        browser.wait(EC.visibilityOf(myactpage.success.successHeader), 120000, 'My Account success header is not displayed');
        expect((myactpage.success.successHeader).isDisplayed()).toBeTruthy();
    });
});