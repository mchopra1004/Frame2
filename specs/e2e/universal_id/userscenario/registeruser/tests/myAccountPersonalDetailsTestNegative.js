'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var dpage = require('../pages/personalDetailsPage.js');

afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-891 Manage Personal details in My Account Page ----- ', function() {

    it(browser.tc_desc('UIDS-1573 TC1 (1) Verify elements of the page'), function() {

        browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileElement), 12000, 'Profile option is not visible');
        myactpage.myAccountProfile.profileElement.click();

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileHeaderMobile), 12000, 'Profile header not visible');
                expect(myactpage.myAccountProfile.profileHeaderMobile.getText()).toEqual(browser.params.user.authentication.language.myaccount.profile);
                expect(myactpage.myAccountProfile.profileBackBtn.isDisplayed()).toBeTruthy();
            }
        }

        else {
            browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileHeaderWeb), 12000, 'Profile header not visible');
            expect(myactpage.myAccountProfile.profileHeaderWeb.getText()).toEqual(browser.params.user.authentication.language.myaccount.profile);
        }

        expect(myactpage.myAccountProfile.profilePersonalDetailsHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.profilePersonal);
        expect(myactpage.myAccountProfile.profileContactInfoHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.profileContact);
        expect(myactpage.myAccountProfile.profileNameLabel.getText()).toEqual(browser.params.user.authentication.language.personal.stmtName);
        expect(myactpage.myAccountProfile.profilePrimaryEmailHeader.getText()).toEqual(browser.params.user.authentication.language.myaccount.profilePrimaryContact);
        expect(myactpage.myAccountProfile.profileCurrentAddressHeader.getText()).toEqual(browser.params.user.authentication.language.address.stmtAddress);

        if ( browser.deviceName === 'Edge'){

            myactpage.myAccountProfile.profileHelp.getText().then(function(text)
                    {
                expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help);
                    });
            myactpage.edit.nameEditBtn.getText().then(function(text)
                    {
                expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase());
                    });
            myactpage.edit.addressEditBtn.getText().then(function(text)
                    {
                expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.general.edit.toUpperCase());
                    });

        }

        else {
            expect(myactpage.myAccountProfile.profileHelp.getText()).toEqual(browser.params.user.authentication.language.mobnav.help);
            expect(myactpage.edit.nameEditBtn.getText()).toEqual(browser.params.user.authentication.language.general.edit.toUpperCase());
            expect(myactpage.edit.addressEditBtn.getText()).toEqual(browser.params.user.authentication.language.general.edit.toUpperCase());

        }
    });

    it(browser.tc_desc('UIDS-1573 TC2 (1) Verify correct information is displayed'), function() {

        expect(myactpage.myAccountProfile.profileName.getText()).toEqual('Ms. EditedFirstName EditedMiddleName EditedLastName SuEd');
        expect(myactpage.myAccountProfile.profilePrimaryEmail.getText()).toEqual(browser.params.user.authentication.email);
        //Disabling this because of address update page has some issues Defect Reported-UIDS-2303//
        //	expect(myactpage.myAccountProfile.profileCurrentAddress.getText()).toBe('Address1Edited'+"\n"+'Address2Edited'+"\n"+'CityEdited StateEdited 909090'+"\n"+'CountryEdited');
    });

    it(browser.tc_desc('UIDS-1573 TC3 (1) Verify the validation on editing Name details- First Name (2) Entering Numerics/Special characters'), function() {

        myactpage.edit.nameEditBtn.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');
        dpage.userDetails.firstName.clear();
        dpage.userDetails.familyName.clear();
        dpage.userDetails.MiddleName.clear();
        dpage.userDetails.Suffix.clear();
        browser.wait(EC.visibilityOf(dpage.userDetails.firstName), 120000, 'First Name editbox is not visible, or the App is down!');
        dpage.userDetails.firstName.sendKeys('12344');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        //dpage.userDetails.familyName.click();
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.firstName.clear();
        dpage.userDetails.firstName.sendKeys('$%^&');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FirstNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FirstNameError.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1573 TC4 (1) Verify the validation on editing Name details- Last Name (2) Entering Numerics/Special characters'), function() {

        dpage.userDetails.familyName.sendKeys('90877');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.familyName.clear();
        dpage.userDetails.familyName.sendKeys('%&*(');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.FamilyNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.FamilyNameError.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1573 TC5 (1) Verify the validation on editing Name details- Middle Name (2) Entering Numerics/Special characters'), function() {

        dpage.userDetails.MiddleName.sendKeys('1234');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.MiddleNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.MiddleNameError.isDisplayed()).toBeTruthy();
        dpage.userDetails.MiddleName.clear();
        dpage.userDetails.MiddleName.sendKeys('%$#^&');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.MiddleNameError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.MiddleNameError.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1573 TC6 (1) Verify the validation on editing Name details- Suffix (2) Entering Numerics/Special characters'), function() {

        dpage.userDetails.Suffix.sendKeys('4567');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.SuffixError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.SuffixError.isDisplayed()).toBeTruthy();
        dpage.userDetails.Suffix.clear();
        dpage.userDetails.Suffix.sendKeys('!@#$');
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.wait(EC.visibilityOf(dpage.userDetails.SuffixError), 120000, 'Validation is not appearing');
        expect(dpage.userDetails.SuffixError.isDisplayed()).toBeTruthy();
        browser.sleep(2000);

    });

    it(browser.tc_desc('UIDS-1573 TC7 (1) Verify Changes made and reflected on my account personal details page '), function() {

        dpage.userDetails.firstName.clear();
        dpage.userDetails.familyName.clear();
        dpage.userDetails.MiddleName.clear();
        dpage.userDetails.Suffix.clear();
        dpage.userDetails.firstName.sendKeys('EditedFirstNameNew');
        dpage.userDetails.familyName.sendKeys('EditedLastNameNew');
        dpage.userDetails.MiddleName.sendKeys('EditedMiddleNameNew');
        dpage.userDetails.Suffix.sendKeys('SuEdi');
        browser.wait(EC.visibilityOf(dpage.userDetails.Prefix), 120000, 'Prefix field is not visible');
        dpage.userDetails.Prefix.click();
        browser.indirectClick(dpage.userDetails.PrefixMr);
        browser.sleep(2000);
        browser.executeScript("arguments[0].scrollIntoView();", dpage.confirmation.PersonalUpdateBtn);
        browser.indirectClick(dpage.confirmation.PersonalUpdateBtn);
        browser.sleep(2000);
        browser.wait(EC.visibilityOf(myactpage.myAccountProfile.profileName), 120000, 'Prefix field is not visible');
        expect(myactpage.myAccountProfile.profileName.getText()).toEqual('Mr. EditedFirstNameNew EditedMiddleNameNew EditedLastNameNew SuEdi');
    });
});