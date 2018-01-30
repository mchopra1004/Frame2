'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');


afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-716 REGISTRATION: Address page  ---- ', function() {

    //browser.ignoreSynchronization = false;
    browser.ignoreSynchronization = true;

    it(browser.tc_desc('UIDS-500 TC08(a) (1) Verify validation color (2) Tabbing to other field'), function() {

        browser.wait(EC.visibilityOf(dpage.address.zipcode), 120000, 'zipcode edit box is missing!');
        dpage.address.zipcode.click();

        if ( browser.mobile )
        {
            dpage.addressPageSubtext.click();
        }

        browser.wait(EC.visibilityOf(dpage.address.city), 120000, 'City edit box is missing!');
        browser.indirectClick(dpage.address.city);
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'Validation is not appearing');
        if (browser.deviceName === 'Edge'){
            expect(dpage.address.zipcodeError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }

        else {
            expect(dpage.address.zipcodeError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
        }
    });

    it(browser.tc_desc('UIDS-500 TC08(b) (1) Verify validation color on Address page (2) Clicking on continue button'), function() {

        dpage.address.zipcode.clear();
        browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'country edit box is missing!');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.countryError), 5000, 'Validation is not appearing');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.address.countryError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else {
            expect(dpage.address.countryError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
        browser.wait(EC.visibilityOf(dpage.address.streetError), 5000, 'Validation is not appearing');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else{
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'Validation is not appearing');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.address.zipcodeError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else{
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');

        }
        browser.wait(EC.visibilityOf(dpage.address.cityError), 5000, 'Validation is not appearing');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.address.cityError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }

        else{
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
        browser.wait(EC.visibilityOf(dpage.address.stateError), 5000, 'Validation is not appearing');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.address.stateError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else{
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
    });


    it(browser.tc_desc('UIDS-500 TC08 (1) Verify validation on Address page (2) Leaving Country, Address, Zip, City and State blank'), function() {
        browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'country edit box is missing!');
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.countryError), 5000, 'Validation is not appearing');
        expect(dpage.address.countryError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.streetError), 5000, 'Validation is not appearing');
        expect(dpage.address.streetError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'Validation is not appearing');
        expect(dpage.address.zipcodeError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.cityError), 5000, 'Validation is not appearing');
        expect(dpage.address.cityError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.stateError), 5000, 'Validation is not appearing');
        expect(dpage.address.stateError.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-500 TC09 (1) Verify validation (2) Entering character/special character in zipcode'), function() {

        dpage.address.zipcode.sendKeys('abcd');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'Validation is not appearing');
        expect(dpage.address.zipcodeError.isDisplayed()).toBeTruthy();
        dpage.address.zipcode.clear();
        dpage.address.zipcode.sendKeys('*&^%$');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'Validation is not appearing');
        expect(dpage.address.zipcodeError.isDisplayed()).toBeTruthy();

    });

//  it('UIDS-500 TestCase-11 Application should show error message when ZipCode field is populated with more than desired numerics', function() {
//  This functionality has been removed as per UIDS-1428
//  dpage.address.zipcode.clear();
//  dpage.address.zipcode.sendKeys('2013011');
//  if (browser.params.target === 'remote') {

//  if ( browser.mobile )
//  {
//  dpage.address.pageTitle.click();
//  }
//  }
//  dpage.address.continueBtn.click();
//  browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'Validation is not appearing');
//  expect(dpage.address.zipcodeError.isDisplayed()).toBeTruthy();

//  });

//  it('UIDS-500 TestCase-13 Application should show error message when Address1 field is populated with more than desired characters', function() {
//  This functionality has been removed as per UIDS-1428
//  dpage.address.street.sendKeys('Address 1 Address 1 Address 1 Address 1 Address 1ss');
//  if (browser.params.target === 'remote') {

//  if ( browser.mobile )
//  {
//  dpage.address.pageTitle.click();
//  }
//  }
//  dpage.address.continueBtn.click();
//  browser.wait(EC.visibilityOf(dpage.address.streetError), 5000, 'Validation is not appearing');
//  expect(dpage.address.streetError.isDisplayed()).toBeTruthy();
//  });

    it(browser.tc_desc('UIDS-500 TC17 (1) Verify validation (2) Entering Numerics/Special characters in city'), function() {
        dpage.address.city.sendKeys('98765');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.cityError), 5000, 'Validation is not appearing');
        expect(dpage.address.cityError.isDisplayed()).toBeTruthy();
        dpage.address.city.clear();
        dpage.address.city.sendKeys('*&^%$');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.cityError), 5000, 'Validation is not appearing');
        expect(dpage.address.cityError.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-500 TC17 (1) Verify validation (2) Entering Numerics/Special characters in state'), function() {
        //This is temporary implementation as state field will be drop down -UIDS-1399

        dpage.address.state.sendKeys('98765');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.stateError), 5000, 'Validation is not appearing');
        expect(dpage.address.stateError.isDisplayed()).toBeTruthy();
        dpage.address.state.clear();
        dpage.address.state.sendKeys('*&^%$');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.address.stateError), 5000, 'Validation is not appearing');
        expect(dpage.address.stateError.isDisplayed()).toBeTruthy();


    });

    it(browser.tc_desc('UIDS-500 TC24 (1) Verify navigation to next page (2) Entering valid address'), function() {
        dpage.address.state.clear();
        dpage.address.city.clear();
        dpage.address.zipcode.clear();
        dpage.address.country.sendKeys('United States');
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        dpage.address.street.sendKeys('151 W 34th St');
        dpage.address.zipcode.sendKeys('10001');
        browser.indirectClick(dpage.address.city);
        browser.sleep(15000);
        browser.wait(EC.visibilityOf(dpage.address.Address2Link), 5000, 'Address Line2 link is not appearing');
        browser.indirectClick(dpage.address.Address2Link);
        browser.wait(EC.visibilityOf(dpage.address.extendedAddress), 12000, 'Address Line2 is not appearing');
        dpage.address.extendedAddress.sendKeys('152 S 37th St');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.address.pageTitle.click();
            }
        }
        browser.sleep(1000);
        expect(dpage.address.continueBtn.isDisplayed()).toBeTruthy();
        browser.indirectClick(dpage.address.continueBtn);
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');


    });
});