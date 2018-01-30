'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, EC, expect, protractor, xit, afterAll */
var regP = require('../pages/registrationStep1Page.js');
var xP = require('../pages/chooseLanguagePage.js');
var ppid="";
var request = require('request');

afterAll(function(done) {
    process.nextTick(done);
});

describe('UIDS-388 REGISTRATION: PASSWORD ENTRY page  ---- ', function() {
    //browser.ignoreSynchronization = false;
    browser.ignoreSynchronization = true;

    it(browser.tc_desc('UIDS-703 TC7(a) (1) Verify validation color (2) Tabbing to other field'), function() {

        regP.registration.emailEditBox.sendKeys('Test');
        regP.registration.passwordEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        if ( browser.deviceName === 'Edge'){

            expect(regP.registration.emailErrorMessage.getCssValue('color')).toEqual('rgb(228, 153, 30)');
        }

        else {

            expect(regP.registration.emailErrorMessage.getCssValue('color')).toEqual('rgba(228, 153, 30, 1)');
        }

        regP.registration.emailEditBox.clear();

    });


    it(browser.tc_desc('UIDS-703 TC7(b) (1) Verify validation color (2) Clicking on create account button'), function() {

        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                regP.registration.regSubTitleTxt.click();  // hide virtual keyboards
            }
        }

        regP.registration.createAccountBtn.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(regP.registration.emailErrorMessage.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else{

            expect(regP.registration.emailErrorMessage.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
        browser.wait(EC.visibilityOf(regP.registration.passwordErrorMessage), 5000, 'Password error is not displayed');
        if ( browser.deviceName === 'Edge'){
            expect(regP.registration.passwordErrorMessage.getCssValue('color')).toEqual('rgb(195, 57, 57)');
        }
        else {
            expect(regP.registration.passwordErrorMessage.getCssValue('color')).toEqual('rgba(195, 57, 57, 1)');
        }
    });





    it(browser.tc_desc('UIDS-703 TC7 (1) Verify validation (2) Entering invalid email'), function() {
        regP.registration.emailEditBox.sendKeys('Test');
        regP.registration.passwordEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        expect(regP.registration.emailErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.emailEditBox.clear();
        regP.registration.emailEditBox.sendKeys('test');
        regP.registration.passwordEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        expect(regP.registration.emailErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.emailEditBox.clear();
        regP.registration.emailEditBox.sendKeys('test@');
        regP.registration.passwordEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        expect(regP.registration.emailErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.emailEditBox.clear();
        regP.registration.emailEditBox.sendKeys('test@test.');
        regP.registration.passwordEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        expect(regP.registration.emailErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.emailEditBox.clear();
        regP.registration.emailEditBox.sendKeys('test.com');
        regP.registration.passwordEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        expect(regP.registration.emailErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.emailEditBox.clear();
        regP.registration.emailEditBox.sendKeys('123');
        regP.registration.passwordEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.emailErrorMessage), 5000, 'Email not valid message is not displayed');
        expect(regP.registration.emailErrorMessage.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-703 TC8 (1) Verify no validation (2) Entering valid email'), function() {
        regP.registration.emailEditBox.clear();
        regP.registration.emailEditBox.sendKeys('test@test.com');
        regP.registration.passwordEditBox.click();
        expect(regP.registration.emailErrorMessage.isPresent()).toBe(false);
        browser.waitForAngular();

    });

    it(browser.tc_desc('UIDS-703 TC10 (1) Verify validation (2) Entering invalid password'), function() {
        // Enter the invalid test data
        regP.registration.passwordEditBox.sendKeys('Test1#');
        regP.registration.emailEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.passwordErrorMessage), 5000, 'Password error is not displayed');
        expect(regP.registration.passwordErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.passwordEditBox.clear();
        // Enter the invalid test data
        regP.registration.passwordEditBox.sendKeys('Testing1');
        regP.registration.emailEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.passwordErrorMessage), 5000, 'Password error is not displayed');
        expect(regP.registration.passwordErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.passwordEditBox.clear();
        // Enter the invalid test data
        regP.registration.passwordEditBox.sendKeys('testin#1');
        regP.registration.emailEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.passwordErrorMessage), 5000, 'Password error is not displayed');
        expect(regP.registration.passwordErrorMessage.isDisplayed()).toBeTruthy();
        regP.registration.passwordEditBox.clear();
        // Enter the invalid test data
        regP.registration.passwordEditBox.sendKeys('TESTIN#1');
        regP.registration.emailEditBox.click();
        browser.wait(EC.visibilityOf(regP.registration.passwordErrorMessage), 5000, 'Password error is not displayed');
        expect(regP.registration.passwordErrorMessage.isDisplayed()).toBeTruthy();

    });

    it(browser.tc_desc('UIDS-703 TC11 (1) Verify cannot signup (2) Without selecting EULA agreement'), function() {
        regP.registration.emailEditBox.clear();
        regP.registration.passwordEditBox.clear();
        regP.registration.emailEditBox.sendKeys(browser.params.user.authentication.email);
        regP.registration.passwordEditBox.sendKeys(browser.params.user.authentication.password);
        if (browser.params.target === 'remote') {

            if ( browser.mobile )
            {
                regP.registration.regSubTitleTxt.click();  // hide virtual keyboards
            }
        }

        regP.registration.createAccountBtn.click();
        expect(regP.registration.pDetailsHeaderTitle.isPresent()).toEqual(false);



    });




    it(browser.tc_desc('UIDS-703 TC12 (1) Verify signup (2) Entering valid email and password'), function() {
        regP.registration.emailEditBox.clear();
        regP.registration.passwordEditBox.clear();
        regP.registration.emailEditBox.sendKeys(browser.params.user.authentication.email);
        regP.registration.passwordEditBox.sendKeys(browser.params.user.authentication.password);
        regP.registration.termsAndConditionsCheckBox.click();
        regP.registration.createAccountBtn.click();
        browser.waitForAngular();
        browser.wait(EC.visibilityOf(regP.registration.pDetailsHeaderTitle), 120000, 'Account may have failed, PERSONAL DETAILS page is not displayed!');
        expect(regP.registration.pDetailsHeaderTitle.isDisplayed()).toBeTruthy();



    });


    it(browser.tc_desc('UIDS-703 TC2 (1) Generate PPID'), function() {
        var JsessionCookie;
        var options1;
        var deferred = protractor.promise.defer();
        browser.manage().getCookie('JSESSIONID')
        .then(function (cookie) {

            JsessionCookie = cookie.value;
            console.log('cookie found' + JsessionCookie);

            options1 = {

                    method: 'GET',
                    url: browser.params.apiHost+"bff/api/config",
                    async: true,
                    headers: {'X-UIS-RP': 'UIS',
                        'Accept': 'application/json',
                        'Cookie' : 'JSESSIONID='+JsessionCookie
                    },
            };

            function callback1(error, response) {
                if (response === null || response === undefined) {
                    return new Error("LibratoMetrics.Error: Request failed without a response. Network Connected?")
                }
                console.log("response.statusCode" + response.statusCode );
                if (!error && response.statusCode == 200) {
                    var data = JSON.parse(response.body);
                    deferred.fulfill(data.user.id);
                    ppid=data.user.id;
                    console.log("ppid-----------------"+ppid);
                    exports.ppid=ppid;
                    return true;
                }
            }

            request(options1, callback1);


        });
        return deferred.promise;

    });



    it(browser.tc_desc('UIDS-703 TC9 (1) Verify cannot signup (2) Entering pre-registered email and password'), function() {

        browser.executeScript('window.open()').then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                var firstWindow = handles[0];
                var secondWindow = handles[1];
                browser.switchTo().window(secondWindow).then(function () {
                    browser.get(browser.baseUrl);
                    browser.sleep(1000);
                    xP.landingPage.getstartedBtn.click();
                    regP.registration.emailEditBox.sendKeys(browser.params.user.authentication.email);
                    regP.registration.passwordEditBox.sendKeys(browser.params.user.authentication.password);
                    regP.registration.termsAndConditionsCheckBox.click();
                    regP.registration.createAccountBtn.click();
                    browser.wait(EC.visibilityOf(regP.registration.EmailExistsError), 120000, 'Email Exists error is not displayed');
                    expect(regP.registration.EmailExistsError.isDisplayed()).toBeTruthy();

                }).then(function(){
                    browser.close();
                }).then(function(){
                    browser.switchTo().window(firstWindow)
                    browser.wait(EC.visibilityOf(regP.registration.pDetailsHeaderTitle), 120000, 'Unable to switch to parent window');
                    expect(regP.registration.pDetailsHeaderTitle.isDisplayed()).toBeTruthy();
                });
            });
        });
    });

});