'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');
var fs = require('fs');


afterAll(function(done) {
    process.nextTick(done);
});


describe('UIDS-889 Menu & Log out in My Account ----- ', function() {


    it(browser.tc_desc('UIDS-1572 TC1 (1) Verify menu link is available'), function() {

        browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
        expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-1572 TC2 (1) Click on menu link (2) Observe the options available'), function() {
        browser.indirectClick( homeP.openfooterLink);
        browser.sleep(1000);
        console.log(browser.deviceName);

        if(!browser.mobile){

            expect(homeP.footer.header.getText()).toEqual(browser.params.user.authentication.language.header.myAccount);
            expect(homeP.footer.language.getText()).toMatch('\s*'+browser.params.user.authentication.language.general.language+' : '+browser.params.user.authentication.language.general.languageName+'\s*');
            expect(homeP.footer.aboutLink.getText()).toEqual(browser.params.user.authentication.language.menu.about);
            // Below are commented because these options are now not available in the menu as of now. But they can be back
            //  expect(homeP.footer.fagsLink.getText()).toEqual(browser.params.user.authentication.language.menu.faqs);
            //  expect(homeP.footer.supportLink.getText()).toEqual(browser.params.user.authentication.language.menu.support);
            expect(homeP.footer.privacyLink.getText()).toEqual(browser.params.user.authentication.language.menu.privacy);
            //  expect(homeP.footer.securityLink.getText()).toEqual(browser.params.user.authentication.language.menu.security);
            //  expect(homeP.footer.accessibilityLink.getText()).toEqual(browser.params.user.authentication.language.menu.accessibility);
            expect(homeP.footer.login.getText()).toEqual(browser.params.user.authentication.language.header.logout);
        }
//          Few of the below lines are commented because these options are now not available in the menu as of now. But they can be back in future implementations
        else {
            homeP.footer.header.getText().then(function(text)
                    {
                expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.header.myAccount);
                    });

            homeP.footer.aboutLink.getText().then(function(text)
                    {
                expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.menu.about);
                    });
//          homeP.footer.fagsLink.getText().then(function(text)
//                  {
//              expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.menu.faqs);
//                  });
//          homeP.footer.supportLink.getText().then(function(text)
//                  {
//              expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.menu.support);
//                  });
            homeP.footer.privacyLink.getText().then(function(text)
                    {
                expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.menu.privacy);
                    });
//          homeP.footer.securityLink.getText().then(function(text)
//                  {
//              expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.menu.security);
//                  });
//          homeP.footer.accessibilityLink.getText().then(function(text)
//                  {
//          expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.menu.accessibility);
//                  });
            homeP.footer.language.getText().then(function(text)
                    {
                expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.general.language+' : '+browser.params.user.authentication.language.general.languageName);
                    });
            homeP.footer.login.getText().then(function(text)
                    {
                expect( text.replace(/>/g,"").trim()).toBe(browser.params.user.authentication.language.header.logout);
                    });

        }
    });

    it(browser.tc_desc('UIDS-1572 TC3 and TC4 (1) Click on menu options (2) It should open a new modal'), function() {
        browser.wait(EC.visibilityOf(homeP.footer.aboutLink), 12000, 'About us link is not displayed');
        browser.indirectClick( homeP.footer.aboutLink);
        browser.wait(EC.visibilityOf(homeP.footer.modal), 12000, 'Modal is not displayed');
        expect(homeP.footer.modal.isDisplayed()).toBeTruthy();
        browser.sleep(1000);
        homeP.closexpath.click();
        browser.sleep(1000);
        browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
        expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
        browser.indirectClick( homeP.openfooterLink);
//      These are commented as now the below options are not available in the menu as of now. But they can come back
//      expect(homeP.footer.fagsLink.isDisplayed()).toBeTruthy();
//      browser.indirectClick( homeP.footer.fagsLink);
//      browser.wait(EC.visibilityOf(homeP.footer.modal), 12000, 'Modal is not displayed');
//      expect(homeP.footer.modal.isDisplayed()).toBeTruthy();
//      browser.sleep(1000);
//      homeP.closexpath.click();
//      browser.sleep(1000);
//      expect(homeP.footer.supportLink.isDisplayed()).toBeTruthy();
//      browser.indirectClick( homeP.footer.supportLink);
//      browser.wait(EC.visibilityOf(homeP.footer.modal), 12000, 'Modal is not displayed');
//      expect(homeP.footer.modal.isDisplayed()).toBeTruthy();
//      browser.sleep(1000);
//      homeP.closexpath.click();
        browser.sleep(1000);
        expect(homeP.footer.privacyLink.isDisplayed()).toBeTruthy();
        browser.indirectClick( homeP.footer.privacyLink);
        browser.wait(EC.visibilityOf(homeP.footer.modal), 12000, 'Modal is not displayed');
        expect(homeP.footer.modal.isDisplayed()).toBeTruthy();
        browser.sleep(1000);
        homeP.closexpath.click();
        browser.sleep(1000);
//      These are commented as now the below options are not available in the menu as of now. But they can come back
//      expect(homeP.footer.securityLink.isDisplayed()).toBeTruthy();
//      browser.indirectClick( homeP.footer.securityLink);
//      browser.wait(EC.visibilityOf(homeP.footer.modal), 12000, 'Modal is not displayed');
//      expect(homeP.footer.modal.isDisplayed()).toBeTruthy();
//      browser.sleep(1000);
//      homeP.closexpath.click();
//      browser.sleep(1000);
//      expect(homeP.footer.accessibilityLink.isDisplayed()).toBeTruthy();
//      browser.indirectClick( homeP.footer.accessibilityLink);
//      browser.wait(EC.visibilityOf(homeP.footer.modal), 12000, 'Modal is not displayed');
//      expect(homeP.footer.modal.isDisplayed()).toBeTruthy();
//      browser.sleep(1000);
//      homeP.closexpath.click();
//      browser.sleep(1000);
        browser.wait(EC.visibilityOf(homeP.openfooterLink), 12000, 'Menu link is not displayed');
        expect(homeP.openfooterLink.isDisplayed()).toBeTruthy();
        browser.indirectClick( homeP.openfooterLink);
        browser.wait(EC.visibilityOf(homeP.footer.login), 12000, 'LogoutOption is not displayed');
    });

    it(browser.tc_desc('UIDS-1572 TC8 (1) Click on logout option (2) Observe the elements available'), function() {

        browser.indirectClick(homeP.footer.login);
        expect(homeP.logoutTitle.getText()).toEqual(browser.params.user.authentication.language.logout.title);
        expect(homeP.logoutSubTitle.getText()).toEqual(browser.params.user.authentication.language.logout.question);
        if (browser.deviceName === 'Edge'){
            homeP.logoutYes.getText().then(function(text)
                    {
                expect( text.trim()).toBe(browser.params.user.authentication.language.logout.buttonYes);
                    });
            homeP.logoutNo.getText().then(function(text)
                    {
                expect( text.trim()).toBe(browser.params.user.authentication.language.logout.buttonNo);
                    });
        }

        else {
            expect(homeP.logoutYes.getText()).toEqual(browser.params.user.authentication.language.logout.buttonYes.toUpperCase());
            expect(homeP.logoutNo.getText()).toEqual(browser.params.user.authentication.language.logout.buttonNo.toUpperCase());
        }

        expect(homeP.logoutCloseBtn.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1572 TC9 (1) Click on No option in Logout (2) It should redirect to my account menu'), function() {

        homeP.logoutNo.click();
        browser.wait(EC.visibilityOf(homeP.footer.language), 12000, 'Language link is not displayed');
        expect(homeP.footer.language.isDisplayed()).toBeTruthy();

    });

    xit(browser.tc_desc('UIDS-1572 TC9 (1) Click on close button in logout (2) It should redirect to my account menu'), function() {

        browser.indirectClick(homeP.footer.login);
        browser.sleep(3000);
        browser.indirectClick(homeP.logoutCloseBtn);
        expect(homeP.footer.language.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-1572 TC5 and TC6 (1) Select any language other than english (2) The changes made should be reflected as per language selected'), function() {
        browser.sleep(1000);
        browser.wait(EC.visibilityOf(homeP.footer.languageSelect), 12000, 'Language link is not displayed');
        browser.indirectClick(homeP.footer.languageSelect);

        if (browser.params.langOption === 'en') {

            browser.wait(EC.visibilityOf(homeP.selectSpanish), 12000, 'Spanish selection is not visible');
            homeP.selectSpanish.click();
            browser.sleep(4000);
            var text = fs.readFileSync('locale-es.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
            verifyText();
            browser.sleep(4000);

            browser.wait(EC.visibilityOf(homeP.footer.languageSelect), 12000, 'Language link is not displayed');
            browser.indirectClick(homeP.footer.languageSelect);
            browser.wait(EC.visibilityOf(homeP.selectJapanese), 12000, 'Japenese selection is not visible');
            homeP.selectJapanese.click();
            browser.sleep(4000);
            text = fs.readFileSync('locale-ja.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
            verifyText();
            browser.sleep(4000);
            browser.wait(EC.visibilityOf(homeP.footer.languageSelect), 12000, 'Language link is not displayed');
            browser.indirectClick(homeP.footer.languageSelect);
            browser.wait(EC.visibilityOf(homeP.selectEnglish), 12000, 'English selection is not visible');
            homeP.selectEnglish.click();
            browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
            text = fs.readFileSync('locale-en.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
            browser.sleep(2000);
            homeP.closefooterLink.click();
            browser.sleep(1000);
        }

        else if (browser.params.langOption === 'ja') {
            browser.wait(EC.visibilityOf(homeP.selectSpanish), 12000, 'Spanish selection is not visible');
            homeP.selectSpanish.click();
            browser.sleep(2000);
            var text = fs.readFileSync('locale-es.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
            verifyText();

            browser.sleep(2000);
            browser.wait(EC.visibilityOf(homeP.footer.language), 12000, 'Language link is not displayed');
            browser.indirectClick(homeP.footer.languageSelect);

            browser.wait(EC.visibilityOf(homeP.selectEnglish), 12000, 'English selection is not visible');
            homeP.selectEnglish.click();
            browser.sleep(2000);
            var text = fs.readFileSync('locale-en.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
            verifyText();

            browser.wait(EC.visibilityOf(homeP.footer.language), 12000, 'Language link is not displayed');
            browser.indirectClick(homeP.footer.languageSelect);
            browser.wait(EC.visibilityOf(homeP.selectJapanese), 12000, 'Japanase selection is not visible');
            homeP.selectJapanese.click();
            browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
            homeP.closefooterLink.click();
            browser.sleep(2000);
            var text = fs.readFileSync('locale-ja.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);


        }
        else if (browser.params.langOption === 'es') {
            browser.wait(EC.visibilityOf(homeP.selectEnglish), 12000, 'English selection is not visible');
            homeP.selectEnglish.click();
            browser.sleep(2000);
            var text = fs.readFileSync('locale-en.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
            verifyText();

            browser.sleep(2000);
            browser.wait(EC.visibilityOf(homeP.footer.language), 12000, 'Language link is not displayed');
            browser.indirectClick(homeP.footer.languageSelect);

            browser.wait(EC.visibilityOf(homeP.selectJapanese), 12000, 'Japanese selection is not visible');
            homeP.selectJapanese.click();
            browser.sleep(2000);
            var text = fs.readFileSync('locale-ja.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
            verifyText();


            browser.wait(EC.visibilityOf(homeP.footer.language), 12000, 'Language link is not displayed');
            browser.indirectClick(homeP.footer.languageSelect);
            browser.wait(EC.visibilityOf(homeP.selectSpanish), 12000, 'Spanish selection is not visible');
            homeP.selectSpanish.click();
            browser.wait(EC.visibilityOf(homeP.closefooterLink), 12000, 'Close menu button is not displayed');
            homeP.closefooterLink.click();
            browser.sleep(2000);
            var text = fs.readFileSync('locale-es.json','utf8');
            browser.params.user.authentication.language = JSON.parse(text);
        }


    });


    function verifyText() {
        if( !browser.mobile ){
            expect( trimResult(homeP.footer.language.getText())).toBe(browser.params.user.authentication.language.general.language+" : "+browser.params.user.authentication.language.general.languageName);
            expect(toUpperCase(homeP.footer.header.getText())).toEqual(browser.params.user.authentication.language.header.myAccount.toUpperCase());
            expect(homeP.footer.aboutLink.getText()).toEqual(browser.params.user.authentication.language.menu.about);
            //      expect(homeP.footer.fagsLink.getText()).toEqual(browser.params.user.authentication.language.footer.faqs);
            //      expect(homeP.footer.supportLink.getText()).toEqual(browser.params.user.authentication.language.footer.support);
            expect(homeP.footer.privacyLink.getText()).toEqual(browser.params.user.authentication.language.menu.privacy);
            //      expect(homeP.footer.securityLink.getText()).toEqual(browser.params.user.authentication.language.footer.security);
            //      expect(homeP.footer.accessibilityLink.getText()).toEqual(browser.params.user.authentication.language.footer.accessibility);
            expect( toUpperCase(homeP.footer.login.getText())).toBe(browser.params.user.authentication.language.inactivity.buttonNo.toUpperCase());
            if ( browser.deviceName === 'Edge'){

                myactpage.myAccount.myAccountWelcome.getText().then(function(text)
                        {
                    expect( text.toUpperCase()).toEqual(browser.params.user.authentication.language.accountHome.header+" EDITEDFIRSTNAME");
                        });
            } else {

                expect(myactpage.myAccount.myAccountWelcome.getText()).toEqual(browser.params.user.authentication.language.accountHome.header.toUpperCase()+" EDITEDFIRSTNAME");
            }
            expect(myactpage.myAccount.myAccountText.getText()).toEqual(browser.params.user.authentication.language.accountHome.intro);
        }

        else {
            expect( replaceWithUpperCase(homeP.footer.header.getText())).toBe(browser.params.user.authentication.language.header.myAccount.toUpperCase());
            expect( replaceText(homeP.footer.aboutLink.getText())).toBe(browser.params.user.authentication.language.menu.about);
            //         expect( replaceText(homeP.footer.fagsLink.getText())).toBe(browser.params.user.authentication.language.footer.faqs);
            //         expect( replaceText(homeP.footer.supportLink.getText())).toBe(browser.params.user.authentication.language.footer.support);
            expect( replaceText(homeP.footer.privacyLink.getText())).toBe(browser.params.user.authentication.language.menu.privacy);
            //         expect( replaceText(homeP.footer.securityLink.getText())).toBe(browser.params.user.authentication.language.footer.security);
            //         expect( replaceText(homeP.footer.accessibilityLink.getText())).toBe(browser.params.user.authentication.language.footer.accessibility);
            expect( replaceText(homeP.footer.language.getText())).toBe(browser.params.user.authentication.language.general.language+" : "+browser.params.user.authentication.language.general.languageName);
            expect( replaceWithUpperCase(homeP.footer.login.getText())).toBe(browser.params.user.authentication.language.inactivity.buttonNo.toUpperCase());
            expect( replaceText(myactpage.myAccount.myAccountWelcome.getText())).toBe(browser.params.user.authentication.language.accountHome.header.toUpperCase()+" EDITEDFIRSTNAME");
            expect( replaceText(myactpage.myAccount.myAccountText.getText())).toBe(browser.params.user.authentication.language.accountHome.intro);

        }
    };

    function trimResult(toTrim) {
        return toTrim.then(function(val){
            return val.trim();
        });
    };

    function toUpperCase(toUpper) {
        return toUpper.then(function(val){
            return val.toUpperCase();
        });
    };


    function replaceText(replaceText) {
        return replaceText.then(function(val){
            return val.replace(/>/g,"").trim();
        });
    };

    function replaceWithUpperCase(replaceUserCaseText) {
        return replaceUserCaseText.then(function(val){
            return val.replace(/>/g,"").trim().toUpperCase();
        });
    };
});