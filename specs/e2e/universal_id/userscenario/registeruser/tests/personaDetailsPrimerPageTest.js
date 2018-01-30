'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var regP = require('../pages/registrationStep1Page.js');
var homeP = require('../../../common/pages/homePage.js');

afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-720  Add Personal Details Primer Page ------ ', function() {

    browser.ignoreSynchronization = false;

    it(browser.tc_desc('UIDS-824 TC4 check  (1) header text (2) personal details descriptions text'), function() {

        if ( browser.deviceName === 'Edge'){
            expect(regP.registration.pDetailsHeaderTitle.getText()).toEqual(browser.params.user.authentication.language.personalsetup.header);
        }

        else {

            expect(regP.registration.pDetailsHeaderTitle.getText()).toEqual(browser.params.user.authentication.language.personalsetup.header.toUpperCase());
        }
        expect(regP.registration.pDetailsDesc.getText()).toEqual(browser.params.user.authentication.language.personalsetup.desc);

        regP.registration.pDetailsContn.getText().then(function(text)
                {
            expect(text.trim()).toBe(browser.params.user.authentication.language.personalsetup.continueBtn);
                });

        expect(regP.registration.setUpIcon.isDisplayed()).toBeTruthy();
        expect(homeP.headerLabelOne.getText()).toEqual(browser.params.user.authentication.language.header.universalId);

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

    it(browser.tc_desc('UIDS-1488 TC1 Verify Zentry Logo on personal details primer page'), function() {

        if ( !browser.mobile ) {

            expect(homeP.footer.zentryLogo.isDisplayed()).toBeTruthy();
        }

        else {

            expect(homeP.footer.zentryLogoOne.isDisplayed()).toBeTruthy();
        }

    });


    it(browser.tc_desc('UIDS-1367 TC1 (1) check Menu Link is clickable on personal details primer page'), function() {

        browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
        expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
        browser.indirectClick(homeP.openfooterLink);
        browser.sleep(1000);
    });

    it(browser.tc_desc('UIDS-1367 TC2 (1) Verify Menu Items are available on personal details primer page'), function() {

        expect(homeP.footer.header.isDisplayed()).toBeTruthy();
        expect(homeP.footer.aboutLink.isDisplayed()).toBeTruthy();
        //	expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
        //	expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
        expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
        //	expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
        //	expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
        expect(homeP.footer.language.isDisplayed()).toBeTruthy();
        expect(homeP.footer.login.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1367 TC3 (1) check Menu can be closed on personal details primer page'), function() {

        browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
        expect(homeP.closefooterLink.isDisplayed()).toBeTruthy();
        homeP.closefooterLink.click();
        //	browser.indirectClick(homeP.closefooterLink);
    });

});