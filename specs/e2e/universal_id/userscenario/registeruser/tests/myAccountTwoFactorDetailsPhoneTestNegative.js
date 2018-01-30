'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');

afterAll(function(done) {
    process.nextTick(done);
});



describe('UIDS-892 Manage Second Factor Options of EMAIL & SMS in My Account ----- ', function() {

    it(browser.tc_desc('UIDS-1761 TC1 (1) Verify elements of the page (2) When phone is added in 2FA'), function() {

        browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepElement), 12000, '2-Step verification option is not visible');
        myactpage.twoStep.twoStepElement.click();
        if ( browser.mobile )
        {
            browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepHeaderMobile), 12000, '2-Step verification header not visible');
            expect(myactpage.twoStep.twoStepHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.myaccount.secondFactor);
            expect(myactpage.twoStep.twoStepBackBtn.isDisplayed()).toBeTruthy();
        }
        else {
            browser.wait(EC.visibilityOf(myactpage.twoStep.twoStepHeaderWeb), 12000, '2-Step verification header not visible');
            expect(myactpage.myAccountProfile.profileHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.myaccount.secondFactor);
        }

        expect(myactpage.twoStep.twoStepPhoneLabel(browser.params.user.authentication.language.secondFactor.phone).getText()).toEqual(browser.params.user.authentication.language.secondFactor.phone);
        expect(myactpage.twoStep.twoStepPhoneLabel(browser.params.user.authentication.language.secondFactor.email).getText()).toEqual(browser.params.user.authentication.language.secondFactor.email);
        expect(myactpage.twoStep.twoStepAddPhone(browser.params.user.authentication.language.secondFactor.addPhone).getText()).toEqual(browser.params.user.authentication.language.secondFactor.addPhone);
        expect(myactpage.twoStep.twoStepAddEmail(browser.params.user.authentication.language.secondFactor.addEmail).getText()).toEqual(browser.params.user.authentication.language.secondFactor.addEmail);
        expect(myactpage.twoStep.twoStepIcons.count()).toBe(2);
        expect((myactpage.twoStep.twoStepIcons.get(0)).isDisplayed()).toBeTruthy();
        expect((myactpage.twoStep.twoStepIcons.get(1)).isDisplayed()).toBeTruthy();
        myactpage.twoStep.twoStepHelp.getText().then(function(text)
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

        expect(myactpage.twoStep.twoStepPhonesAdded.getText()).toContain(browser.params.user.authentication.secondFactorPhoneNew);
        expect(myactpage.twoStep.twoStepEmailsAdded.getText()).toEqual(browser.params.user.authentication.language.secondFactor.noEmails);
    });
});