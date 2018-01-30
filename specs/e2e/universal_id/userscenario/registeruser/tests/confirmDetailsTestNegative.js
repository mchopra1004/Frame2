'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var dpage = require('../pages/personalDetailsPage.js');
var actpage = require('../pages/accountPage.js');

afterAll(function(done) {
    process.nextTick(done);
});

describe('UIDS-718   Confirm Personal Details Page ----- ', function() {

    it(browser.tc_desc('UIDS-502 TC9(a) (1) Verify validation color on update name page (2) Tabbing to other field'), function() {
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');
        browser.wait(EC.visibilityOf(dpage.confirmation.nameEdit), 120000, 'Edit button is not displayed for Name');
        browser.indirectClick(dpage.confirmation.nameEdit);
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First name field is not displayed');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }
        }
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First name field is not displayed');
        dpage.userDetails.firstName.clear();
        dpage.userDetails.firstName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 120000, 'Last name field is not displayed');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }

        dpage.userDetails.familyName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First name error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }
        else {
            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
        }
    });


    it(browser.tc_desc('UIDS-502 TC9(b) (1) Verify validation color on update name page (2) Clicking on update button'), function() {

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.confirmation.PersonalUpdateBtn), 120000, 'update button is not displayed');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First name error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else {
            expect(dpage.userDetails.FirstNameError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
    });

    it(browser.tc_desc('UIDS-502 TC9 (1) Verify validation (2) Removing Firstname and Lastname'), function() {
        browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 120000, 'Last name field is not displayed');
        dpage.userDetails.familyName.clear();
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.confirmation.PersonalUpdateBtn), 120000, 'update button is not displayed');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First name error is not displayed');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'Last name error is not displayed');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-502 TC10(a) (1) Verify validation update name page (2) Entering Numerics/Special characters in FirstName'), function() {

        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');
        dpage.userDetails.firstName.sendKeys('12344');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First name error is not displayed');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.firstName.clear();
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        dpage.userDetails.firstName.sendKeys('$%^&');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'First name error is not displayed');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-502 TC10(b) (1) Verify validation in update name page (2) Entering Numerics/Special characters in LastName'), function() {
        browser.wait(EC.visibilityOf(dpage.userDetails.familyName), 120000, 'Last Name editbox is not visible, or the App is down!');
        dpage.userDetails.familyName.sendKeys('12344');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'First name error is not displayed');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.familyName.clear();
        dpage.userDetails.familyName.sendKeys('$%^&');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'First name error is not displayed');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-502 TC10(c) (1) Verify validation in update name page(2) Entering Numerics/Special characters in MiddleName'), function() {
        dpage.userDetails.MiddleName.sendKeys('1234');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.MiddleNameError), 120000, 'Middle name error is not appearing');
        expect(dpage.userDetails.MiddleNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.MiddleName.clear();
        dpage.userDetails.MiddleName.sendKeys('%$#^&');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.MiddleNameError), 120000, 'Middle name error is not appearing');
        expect(dpage.userDetails.MiddleNameError.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-502 TC10(d) (1) Verify validation in update name page(2) Entering Numerics/Special characters in Suffix'), function() {

        dpage.userDetails.Suffix.sendKeys('4567');

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.SuffixError), 120000, 'Suffix error is not appearing');
        expect(dpage.userDetails.SuffixError.isDisplayed()).toBeTruthy();
        dpage.userDetails.Suffix.clear();
        dpage.userDetails.Suffix.sendKeys('!@#$');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.PersonalSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.SuffixError), 120000, 'Suffix error is not appearing');
        expect(dpage.userDetails.SuffixError.isDisplayed()).toBeTruthy();
        browser.sleep(2000);

    });


    it(browser.tc_desc('UIDS-502 TC11 (1) Verify Changes made on update name page  (2) Are correctly reflecting'), function() {

        dpage.userDetails.firstName.clear();
        dpage.userDetails.familyName.clear();
        dpage.userDetails.MiddleName.clear();
        dpage.userDetails.Suffix.clear();
        dpage.userDetails.firstName.sendKeys('EditedFirstName');
        dpage.userDetails.MiddleName.sendKeys('EditedMiddleName');
        dpage.userDetails.familyName.sendKeys('EditedLastName');
        dpage.userDetails.Suffix.sendKeys('SuEd');
        browser.wait(EC.visibilityOf(dpage.userDetails.Prefix), 120000, 'Prefix field is not visible');
        dpage.userDetails.Prefix.click();
        browser.indirectClick(dpage.userDetails.PrefixMs);
        browser.sleep(1000);
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'Confirmation page is not displayed');

        expect(dpage.confirmation.name.getText()).toBe('Ms. EditedFirstName EditedMiddleName EditedLastName SuEd');


    });
//  Disabling this because of address update page has some issues Defect Reported-UIDS-2303//
    xit(browser.tc_desc('UIDS-502 TC26(a) (1) Verify validation color on update address page (2) Tabbing to other field'), function() {
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');
        browser.wait(EC.visibilityOf(dpage.confirmation.addressEdit), 120000, 'Edit button is not displayed for Address');
        dpage.confirmation.addressEdit.click();
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.address.street), 120000, 'Address field is not displayed');
        dpage.address.street.clear();
        dpage.address.street.click();
        browser.wait(EC.visibilityOf(dpage.address.country), 120000, 'Country field is not displayed');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        //browser.driver.actions().mouseMove(dpage.address.country).click().perform();
        //browser.indirectClick(dpage.address.country);
        dpage.address.country.click();
        browser.wait(EC.visibilityOf(dpage.address.streetError), 120000, 'Address error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }
        else{
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
        }
    });

    xit(browser.tc_desc('UIDS-502 TC26(b) (1) Verify validation color on update address page (2) Clicking on update button'), function() {
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.confirmation.AddressUpdateBtn), 120000, 'update button is not displayed');
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.address.streetError), 120000, 'Address error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else {

            expect(dpage.address.streetError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }

    });

    xit(browser.tc_desc('UIDS-502 TC26 (1) Verify validation update address page (2) Leaving Address Line 1, City, State, Country and Zip blank'), function() {


        dpage.address.country.clear();
        dpage.address.zipcode.clear();
        dpage.address.city.clear();
        dpage.address.state.clear();
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.confirmation.AddressUpdateBtn), 120000, 'update button is not displayed');
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.address.countryError), 5000, 'Country error validation is not appearing');
        expect(dpage.address.countryError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.streetError), 5000, ' Address error validation is not appearing');
        expect(dpage.address.streetError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'ZipCode error validation is not appearing');
        expect(dpage.address.zipcodeError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.cityError), 5000, 'City error validation is not appearing');
        expect(dpage.address.cityError.isDisplayed()).toBeTruthy();
        browser.wait(EC.visibilityOf(dpage.address.stateError), 5000, 'State error validation is not appearing');
        expect(dpage.address.stateError.isDisplayed()).toBeTruthy();


    });

    xit(browser.tc_desc('UIDS-502 TC27(a) (1) Verify validation in Country on update address page (2) Entering Numerics/Special Characters'), function() {
        dpage.address.country.sendKeys('32131231');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.address.countryError), 5000, 'Country error validation is not appearing');
        expect(dpage.address.countryError.isDisplayed()).toBeTruthy();
        dpage.address.country.clear();
        dpage.address.country.sendKeys(')(*&^%');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        dpage.confirmation.AddressUpdateBtn.click();
        browser.wait(EC.visibilityOf(dpage.address.countryError), 5000, 'Country error validation is not appearing');
        expect(dpage.address.countryError.isDisplayed()).toBeTruthy();
    });

    xit(browser.tc_desc('UIDS-502 TC27(b) (1) Verify validation in ZipCode on update address page (2) Entering Characters/Special Characters'), function() {
        dpage.address.zipcode.sendKeys('qwerty');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'ZipCode error validation is not appearing');
        expect(dpage.address.zipcodeError.isDisplayed()).toBeTruthy();
        dpage.address.zipcode.clear();
        dpage.address.zipcode.sendKeys(')(*&^%');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        dpage.confirmation.AddressUpdateBtn.click();
        browser.wait(EC.visibilityOf(dpage.address.zipcodeError), 5000, 'ZipCode error validation is not appearing');
        expect(dpage.address.zipcodeError.isDisplayed()).toBeTruthy();
    });

    xit(browser.tc_desc('UIDS-502 TC27(c) (1) Verify validation in City on update address page (2) Entering Numerics/Special Characters'), function() {
        dpage.address.city.sendKeys('567867');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.address.cityError), 5000, 'City error validation is not appearing');
        expect(dpage.address.cityError.isDisplayed()).toBeTruthy();
        dpage.address.city.clear();
        dpage.address.city.sendKeys(')(*&^%');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        dpage.confirmation.AddressUpdateBtn.click();
        browser.wait(EC.visibilityOf(dpage.address.cityError), 5000, 'City error validation is not appearing');
        expect(dpage.address.cityError.isDisplayed()).toBeTruthy();
    });

    xit(browser.tc_desc('UIDS-502 TC27(d) (1) Verify validation in State on update address page (2) Entering Numerics/Special Characters'), function() {
        dpage.address.state.sendKeys('567867');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.address.stateError), 5000, 'State error validation is not appearing');
        expect(dpage.address.stateError.isDisplayed()).toBeTruthy();
        dpage.address.state.clear();
        dpage.address.state.sendKeys(')(*&^%');
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.address.stateError), 5000, 'State error validation is not appearing');
        expect(dpage.address.stateError.isDisplayed()).toBeTruthy();
    });

    xit(browser.tc_desc('UIDS-502 TC28 (1) Verify Changes made on Address on update address page (2) Are correctly reflecting'), function() {

        dpage.address.country.clear();
        dpage.address.country.sendKeys('United States');
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        dpage.address.extendedAddress.clear();
        dpage.address.street.sendKeys('Address1Edited');
        dpage.address.extendedAddress.sendKeys('Address2Edited');
        dpage.address.zipcode.clear();
        dpage.address.city.clear();
        dpage.address.state.clear();
        dpage.address.zipcode.sendKeys('99501');
        browser.indirectClick(dpage.address.city);
        dpage.address.city.sendKeys('Anchorage');
        browser.indirectClick(dpage.address.selectValue);
        dpage.address.state.sendKeys('Alaska');
        browser.sleep(1000);
        browser.indirectClick(dpage.address.selectValue);
        browser.sleep(1000);


        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.AddressSubTitle.click();        //hide the virtual keyboard
            }

        }
        browser.indirectClick(dpage.confirmation.AddressUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'Confirmation page is not displayed');
        expect(dpage.confirmation.address.getText()).toBe('Address1Edited'+"\n"+'Address2Edited'+"\n"+'Anchorage Alaska 99501'+"\n"+'United States');

    });
//  SSN/DOB page is removed from scope as of now
    xit(browser.tc_desc('UIDS-502 TC15(a) (1) Verify validation color on update SSN page (2) Tabbing to other field'), function() {
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');
        browser.wait(EC.visibilityOf(dpage.confirmation.ssnEdit), 120000, 'Edit button is not displayed for SSN');
        dpage.confirmation.ssnEdit.click();

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.securitySubtitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.confirmation.ssn), 120000, 'SSN field is not displayed');
        dpage.confirmation.ssn.clear();
        dpage.confirmation.ssn.click();
        //browser.driver.actions().mouseMove(dpage.confirmation.securitySubtitle).click().perform();
        //browser.indirectClick(dpage.confirmation.securitySubtitle);
        dpage.confirmation.securitySubtitle.click();
        browser.wait(EC.visibilityOf(dpage.personalInfo.ssnError), 12000, 'SSN Error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }
        else {
            expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
        }

    });

    xit(browser.tc_desc('UIDS-502 TC15(b) (1) Verify validation color on update SSN page (2) Clicking on update button'), function() {
        browser.wait(EC.visibilityOf(dpage.confirmation.securitySubmitBtn), 120000, 'Update button is not visible');
        dpage.confirmation.securitySubmitBtn.click();
        browser.wait(EC.visibilityOf(dpage.personalInfo.ssnError), 12000, 'SSN Error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else {
            expect(dpage.personalInfo.ssnError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }

    });

    xit(browser.tc_desc('UIDS-502 TC15 (1) Verify Changes made on update SSN page (2) Are correctly reflecting'), function() {

        var ssn ='999999999';
        browser.wait(EC.visibilityOf(dpage.confirmation.ssn), 120000, 'SSN field is not displayed');
        for (var i = 0; i < ssn.length; i++) {
            dpage.confirmation.ssn.sendKeys(ssn[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
        }

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.securitySubtitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.confirmation.securitySubmitBtn), 120000, 'Update button is not displayed');
        dpage.confirmation.securitySubmitBtn.click();
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'Confirmation page is not displayed');
        expect(dpage.confirmation.ssn.getText()).toBe('999-99-9999');

    });

    xit(browser.tc_desc('UIDS-502 TC16(a) (1) Verify validation color on update Date of birth page  (2) Tabbing to other field'), function() {
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'confirm subtext is missing, or the App is down!');

        browser.wait(EC.visibilityOf(dpage.confirmation.dobEdit), 120000, 'Edit button is not displayed for DOB');
        browser.indirectClick(dpage.confirmation.dobEdit);

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.securitySubtitle.click();        //hide the virtual keyboard
            }

        }
        browser.wait(EC.visibilityOf(dpage.personalInfo.dob), 120000, 'DOB field is not displayed');
        dpage.personalInfo.dob.clear();
        dpage.personalInfo.dob.click();
        //browser.driver.actions().mouseMove(dpage.confirmation.securitySubtitle).click().perform();
        //browser.indirectClick(dpage.confirmation.securitySubtitle);
        dpage.confirmation.securitySubtitle.click();
        browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'DOB Error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.personalInfo.dobError.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }

        else {
            expect(dpage.personalInfo.dobError.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
        }

    });

    xit(browser.tc_desc('UIDS-502 TC16(b) (1) Verify validation color on update Date of birth page (2) Clicking on update button'), function() {

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.securitySubtitle.click();   // hide virtual keyboards
            }
        }

        browser.wait(EC.visibilityOf(dpage.confirmation.securitySubmitBtn), 120000, 'Update button is not visible');
        dpage.confirmation.securitySubmitBtn.click();
        browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'DOB Error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(dpage.personalInfo.dobError.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else {
            expect(dpage.personalInfo.dobError.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }

    });

    xit(browser.tc_desc('UIDS-502 TC21(a) (1) Verify validation (2) Entering incorrect date on update Date of birth page'), function() {


        var InvalidDate = browser.params.user.personalInfo.dobInvalidDate;
        for (var i = 0; i < InvalidDate.length; i++) {
            dpage.personalInfo.dob.sendKeys(InvalidDate[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
        }

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
            }
        }
        dpage.confirmation.securitySubmitBtn.click();
        browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'DOB Error is not displayed');
        expect(dpage.personalInfo.dobError.isDisplayed()).toBeTruthy();
    });

    xit(browser.tc_desc('UIDS-502 TC21(b) (1) Verify validation (2) Entering incorrect month on update Date of birth page'), function() {

        dpage.personalInfo.dob.clear();
        var InvalidMonth = browser.params.user.personalInfo.dobInvalidMonth;
        for (var i = 0; i < InvalidMonth.length; i++) {
            dpage.personalInfo.dob.sendKeys(InvalidMonth[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
        }

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
            }
        }
        dpage.confirmation.securitySubmitBtn.click();
        browser.wait(EC.visibilityOf(dpage.personalInfo.dobError), 12000, 'SSN Error is not displayed');
        expect(dpage.personalInfo.dobError.isDisplayed()).toBeTruthy();
    });

    xit(browser.tc_desc('UIDS-502 TC23 (1) Verify Changes made on DOB on update Date of birth page (2) Are correctly reflecting'), function() {
        dpage.personalInfo.dob.clear();
        var age = browser.params.user.personalInfo.dob;
        browser.wait(EC.visibilityOf(dpage.personalInfo.dob), 12000, 'DOB field is not displayed');
        for (var i = 0; i < age.length; i++) {
            dpage.personalInfo.dob.sendKeys(age[i]);  //had to be send one at a time, bcos it's failing on mobile when send together
        }

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.personalInfo.securitySubTitle.click();  // hide virtual keyboards
            }
        }
        browser.wait(EC.visibilityOf(dpage.confirmation.securitySubmitBtn), 120000, 'Update button is not displayed');
        dpage.confirmation.securitySubmitBtn.click();
        browser.wait(EC.visibilityOf(dpage.confirmation.ConfirmSubTitle), 120000, 'Confirmation page is not displayed');
        expect(dpage.confirmation.dob.getText()).toBe('01-01-1981');

    });

    /* Due to Defect number https://jira.synchronoss.net:8443/jira/browse/UIDS-1436, City of Birth Edit functionality is not being automated */
    it(browser.tc_desc('UIDS-502 TC29 (1) Verify Navigation to next page (2) Clicking on Confirm button'), function() {

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                dpage.confirmation.ConfirmSubTitle.click();  // hide virtual keyboards
            }
        }

        browser.wait(EC.visibilityOf(dpage.confirmation.submit), 120000, 'Confirm button is not displayed');
        browser.indirectClick(dpage.confirmation.submit);
        browser.wait(EC.visibilityOf(actpage.account.continueBtn), 120000, 'Continue button is not displayed on Account security primer page');
        expect(actpage.account.continueBtn.isDisplayed()).toBeTruthy();
    });
});