'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');


afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-715 REGISTRATION: Add Name page  ---- ', function() {

    //browser.ignoreSynchronization = false;
    browser.ignoreSynchronization = true;
    it(browser.tc_desc('UIDS-499 TC18(a) (1) Verify validation color on Name page (2) Tabbing to other field'), function() {
        dpage.continueBtn.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');
        dpage.userDetails.firstName.sendKeys('12344');
        browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 120000, 'Family Name field is not visible');
        dpage.userDetails.familyName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First Name required message is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }

        else {

            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');

        }
    });

    it(browser.tc_desc('UIDS-499 TC18(b) (1) Verify validation color on Name page (2) Clicking on continue button'), function() {
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');
        dpage.userDetails.firstName.clear();

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.nameLabel.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.userDetails.continueBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First Name required message is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else{
            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'Last Name required message is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.userDetails.FamilyNameError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }

        else{
            expect(dpage.userDetails.FamilyNameError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }


    });


    it(browser.tc_desc('UIDS-499 TC18 (1) Verify validation (2) Leaving FirstName/LastName blank'), function() {

        browser.waitForAngular();

        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');

        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First Name required message is not displayed');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'Last Name required message is not displayed');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();
    });


    it(browser.tc_desc('UIDS-499 TC19(a) (1) Verify validation (2) Entering Numerics/Special characters in FirstName'), function() {

        dpage.userDetails.AddTitles.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');
        dpage.userDetails.firstName.sendKeys('12344');
        browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 120000, 'Family Name field is not visible');
        browser.indirectClick(dpage.userDetails.familyName);
        //dpage.userDetails.familyName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.firstName.clear();
        dpage.userDetails.firstName.sendKeys('$%^&');
        browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 120000, 'Family Name is edit box is not appearing');
        browser.indirectClick(dpage.userDetails.familyName);
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-499 TC19(b) (1) Verify validation (2) Entering Numerics/Special characters in LastName'), function() {


        dpage.userDetails.familyName.sendKeys('90877');
        dpage.userDetails.firstName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.familyName.clear();
        dpage.userDetails.familyName.sendKeys('%&*(');
        dpage.userDetails.firstName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();

    });


    it(browser.tc_desc('UIDS-499 TC19(c) (1) Verify validation (2) Entering Numerics/Special characters in MiddleName'), function() {
        dpage.userDetails.MiddleName.sendKeys('1234');
        dpage.userDetails.firstName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.MiddleNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.MiddleNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.MiddleName.clear();
        dpage.userDetails.MiddleName.sendKeys('%$#^&');
        dpage.userDetails.firstName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.MiddleNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.MiddleNameError.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-499 TC19(d) (1) Verify validation (2) Entering Numerics/Special characters in Suffix'), function() {

        dpage.userDetails.Suffix.sendKeys('4567');
        dpage.userDetails.firstName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.SuffixError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.SuffixError.isDisplayed()).toBeTruthy();
        dpage.userDetails.Suffix.clear();
        dpage.userDetails.Suffix.sendKeys('!@#$');
        dpage.userDetails.firstName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.SuffixError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.SuffixError.isDisplayed()).toBeTruthy();
        browser.sleep(2000);

    });

//  it('UIDS-499 TestCase-20 (1) Enter more than maximum characters supported (2) Should display validation', function() {

//  // * This functionality has been removed * UIDS-1428 *
//  browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 5000, 'Field is not visible');
//  dpage.userDetails.firstName.clear();
//  browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 5000, 'Field is not visible');
//  dpage.userDetails.familyName.clear();
//  dpage.userDetails.AddTitles.click();
//  dpage.userDetails.firstName.sendKeys('FirstNameAddedforTest');
//  dpage.userDetails.familyName.click();
//  browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 5000, 'Validation is not appearing');
//  expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
//  dpage.userDetails.MiddleName.sendKeys('MiddleNameAddedForTes');
//  dpage.userDetails.familyName.click();
//  browser.wait(EC.visibilityOf(dpage.userDetails.MiddleNameError), 5000, 'Validation is not appearing');
//  expect(dpage.userDetails.MiddleNameError.isDisplayed()).toBeTruthy();
//  dpage.userDetails.familyName.sendKeys('LastNameAddedForTestt');
//  dpage.userDetails.firstName.click();
//  browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 5000, 'Validation is not appearing');
//  expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();
//  dpage.userDetails.Suffix.sendKeys('SuffixAddedForTestttt');
//  dpage.userDetails.firstName.click();
//  browser.wait(EC.visibilityOf(dpage.userDetails.SuffixError), 5000, 'Validation is not appearing');
//  expect(dpage.userDetails.SuffixError.isDisplayed()).toBeTruthy();
//  browser.waitForAngular();
//  browser.sleep(2000);
//  });

    it(browser.tc_desc('UIDS-499 TC22 (1) Verify no validation (2) Entering valid data'), function() {
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'Field is not visible');
        dpage.userDetails.firstName.clear();
        browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 120000, 'Field is not visible');
        dpage.userDetails.familyName.clear();
        browser.wait(EC.visibilityOf(dpage.userDetails.MiddleName), 120000, 'Field is not visible');
        dpage.userDetails.MiddleName.clear();
        browser.wait(EC.visibilityOf(dpage.userDetails.Suffix), 120000, 'Field is not visible');
        dpage.userDetails.Suffix.clear();
        dpage.userDetails.firstName.sendKeys('FirstName');
        expect(dpage.userDetails.firstName.isDisplayed()).toBeTruthy();
        dpage.userDetails.familyName.sendKeys('LastName');
        expect(dpage.userDetails.familyName.isDisplayed()).toBeTruthy();
        dpage.userDetails.MiddleName.sendKeys('Middle');
        expect(dpage.userDetails.MiddleName.isDisplayed()).toBeTruthy();
        dpage.userDetails.Suffix.sendKeys('Su');
        expect(dpage.userDetails.Suffix.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.userDetails.Prefix), 120000, 'Prefix field is not visible');
        dpage.userDetails.Prefix.click();
        //browser.wait(EC.visibilityOf(dpage.userDetails.PrefixMr), 120000, 'PrefixMr field is not visible');
        browser.indirectClick(dpage.userDetails.PrefixMr);

        if (browser.params.target === 'remote') {

            if ( browser.mobile )

            {
                dpage.nameLabel.click();        //hide the virtual keyboard
            }
        }

        browser.sleep(2000);
        browser.indirectClick(dpage.userDetails.continueBtn);



    });
});