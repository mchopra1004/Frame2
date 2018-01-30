'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, afterAll, EC, expect, protractor, xit */
var homeP = require('../pages/homePage.js');
var controlsP = require('../pages/controlsPage.js');
//var langP = require('../pages/chooseLanguagePage.js');
var fs = require('fs');
//var xP2 = require('../pages/chooseLanguagePage2.js');
var xP2 = require('../../userscenario/registeruser/pages/chooseLanguagePage2.js');
var cP = require('../../userscenario/registeruser/pages/createAccountPage.js');
//var rP = require('./reuseableSteps.js');
var regP = require('../../userscenario/registeruser/pages/registrationStep1Page.js');

afterAll(function(done) {
    process.nextTick(done);
});


describe('Setup The Application', function() {

    beforeAll(function(done){
        // Load the translations for strings we may need to check
        var text;
        text = fs.readFileSync('locale-'+browser.params.langOption+'.json','utf8');
        browser.params.user.authentication.language = JSON.parse(text);

        done();
    });

    it(browser.tc_desc('Launch the application'), function() {
        browser.ignoreSynchronization = true;

        // If we are not on mobile, maximize the window
        if (browser.mobile) {
            console.log('this is mobile');
        }
        else {
            console.log('this is desktop');
            browser.driver.manage().window().maximize();
        }
        browser.get(browser.baseUrl);
        browser.waitForAngular();
        browser.wait(EC.visibilityOf(homeP.getstartedBtn), 120000, 'GET STARTED Button is missing or Element has changed, or the App is down!');
        expect(homeP.getstartedBtn.isDisplayed()).toBeTruthy();
    });

    it(browser.tc_desc('UIDS-694 TC12 Select language'), function() {
        var selectedlangOption = 'English';
        if (browser.params.langOption !== 'en') {

            if (browser.params.langOption === 'ja') {
                selectedlangOption = '日本';
            } else if (browser.params.langOption === 'es') {
                selectedlangOption = 'Español';
            }
            browser.sleep(2000);
            xP2.openfooterLink.click();
            browser.sleep(1000);
            xP2.localOption.click();
            browser.sleep(1000);
            xP2.languageSelect(browser.params.langOption).click();
            browser.sleep(1000);

            expect(xP2.localOption.getText()).toContain(selectedlangOption);
            xP2.closefooterLink.click();
            browser.sleep(1000);
            expect(4).toEqual(4);
        }
        else  if (browser.params.langOption !== 'en') {
            xP2.openfooterLink.click();
            expect(xP2.localOption.getText()).toContain(selectedlangOption);
            xP2.closefooterLink.click();
            expect(4).toEqual(4);
        }
        else if(browser.params.langOption == 'en'){
            expect(4).toEqual(4);
        }
    });
});

