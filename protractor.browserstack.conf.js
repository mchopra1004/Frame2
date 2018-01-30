var failFast = require('protractor-fail-fast');
var multiReport = require('./Bamboo_BrowserstackReport/reporter.js');
var browserstack = require('browserstack-local');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var fs = require('fs');
//https://github.com/angular/protractor/issues/1451
require('protractor/built/logger').Logger.logLevel = 1;
var path = require('path');
var FirefoxProfile = require("firefox-profile");
var q = require("q");
var suites = require('./suites.conf.js').suites;


var d = new Date();
var n = d.getTime();
var generatedemail = "uidsfirstfactor+" + n + "@gmail.com";
var sFactoremail = generatedemail.replace("@","1@");
var sFactoremailNew = generatedemail.replace("@","2@");
var sFactoremailLockedNew = generatedemail.replace("@","3@");
var sFactorMyaccountNew = generatedemail.replace("@","4@");
var sFactorMyaccountLockedNew = generatedemail.replace("@","5@");
//The below code is to generate random phone numbers. The sequence used is to generate a random number using current time stamp.
//Then append them with 24 sequence so that its accepted by our system as valid number to receive OTP.
//These numbers used are not basically the real numbers which wouldn't affect any real user receiving the OTPs.
var num = "24"+n;
var phone1 = num.substring(0,10);
var phone2 = "24322"+num.substring(9,14);
var phone3 = "24333"+num.substring(9,14);
var phone4 = "24345"+num.substring(9,14);

function randomString(len, charSet) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var ranString=randomString(6);


var month;
month = [];
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = "July";
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';

var userCredfileName;
try{
    userCredfileName = fs.readFileSync('./userBrowserStackCredentials.json','utf8');
}
catch(e){
    console.log('Refer to README.md file(section: Setting up credentials file for browserstack user) for setting up the file which will have users browsetstack credentials\n', e);
    exit(0);
}

var unpwjson = JSON.parse(userCredfileName);
var usernamebs = unpwjson.username;
var passwordbs = unpwjson.userpassword;


exports.config = {
    /*
    plugins: [{
        package: 'protractor-fail-fast'
    }],*/

    seleniumServerJar: 'node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.1.1.jar',
    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
    seleniumPort: null,
    // Chromedriver location is used to help the selenium standalone server
    // find chromedriver. This will be passed to the selenium jar as
    // the system property webdriver.chrome.driver. If null, selenium will
    // attempt to find chromedriver using PATH.
    chromeDriver: 'node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.30.exe',
    // Additional command line options to pass to selenium. For example,
    // if you need to change the browser timeout, use
    // seleniumArgs: ['-browserTimeout=60'],
    seleniumArgs: [],

    framework: 'jasmine2',


    useAllAngular2AppRoots: true,

    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 60000000
    },


    maxSessions: 1,

    'suites' : suites,

    'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

    'commonCapabilities': {
        'browserstack.user': usernamebs,
        'browserstack.key': passwordbs,
        'build': 'protractor-browserstack',
        'name': 'parallel_local_test',
        'browserstack.local': true,
        'browserstack.debug': true,
    },

    'multiCapabilities': [
     /*   {
            'mobile' : false,
            'os' : 'Windows',
            'os_version' : '7',
            'browserName' : 'IE',
            'browser_version' : '11.0',
            'resolution' : '1024x768',
            'browserstack.ie.enablePopups': true
        },*/
        {
            'mobile' : false,
            'os' : 'Windows',
            'os_version' : '7',
            'browserName' : 'Chrome',
            'browser_version' : '60.0',
            'resolution' : '1024x768',
        },
        {
            'mobile' : false,
            'os' : 'Windows',
            'os_version' : '10',
            'browserName' : 'Chrome',
            'browser_version' : '60.0',
            'resolution' : '1024x768'
        },
        {
            'mobile' : false,
            'os' : 'Windows',
            'os_version' : '10',
            'browserName' : 'Edge',
            'browser_version' : '15.0',
            'resolution' : '1024x768',
            'browserstack.edge.enablePopups' : true
        },
        {
            'mobile' : false,
            'os' : 'OS X',
            'os_version' : 'Sierra',
            'browserName' : 'Chrome',
            'browser_version' : '60.0',
            'resolution' : '1024x768',
        },
        {
            'mobile' : false,
            'os' : 'OS X',
            'os_version' : 'El Capitan',
            'browserName' : 'Chrome',
            'browser_version' : '60.0',
            'resolution' : '1024x768'
        },
        {
            'mobile' : false,
            'os' : 'OS X',
            'os_version' : 'Yosemite',
            'browserName' : 'Chrome',
            'browser_version' : '60.0',
            'resolution' : '1024x768',
        },
        /*{

            'mobile' : false,
            'os' : 'Windows',
            'os_version' : '8.1',
            'browserName' : 'IE',
            'browser_version' : '11.0',
            'resolution' : '1024x768',
            'browserstack.ie.enablePopups': true
        },*/
        {
            'mobile' : false,
            'os' : 'Windows',
            'os_version' : '8.1',
            'browserName' : 'Firefox',
            'browser_version' : '47.0',
            'resolution' : '1024x768',
        },
        {
            'mobile' : true,
            'browserName' : 'chrome',
            'platform' : 'ANDROID',
            'device' : 'Google Pixel',
            'realMobile' : true,
            'os_version' : '7.1',
        },
        {
            'mobile' : true,
            'browserName' : 'chrome',
            'platform' : 'ANDROID',
            'device' : 'Samsung Galaxy Note 4',
            'realMobile' : true,
            'os_version' : '6.0',
        },
        {
            'mobile' : true,
            'browserName' : 'chrome',
            'platform' : 'ANDROID',
            'device' : 'Samsung Galaxy S6',
            'realMobile' : true,
            'os_version' : '5.0'
        },

        /*{
            'mobile' : true,
            'browserName' : 'safari',
            'device': 'iPhone 7 Plus',
            'realMobile': 'true',
            'os_version': '10.0'
        },

        {
            'mobile' : false,
            'os': 'OS X',
            'os_version': 'El Capitan',
            'browserName' : 'Safari',
            'browser_version': '9.1',
            'resolution': '1024x768'
        },

        {
            'mobile' : false,
            'os': 'OS X',
            'os_version': 'Sierra',
            'browserName' : 'Safari',
            'browser_version': '10.1',
            'resolution': '1024x768',
            'safari.options': {
                'technologyPreview': true
            }
        },

        {
            'mobile' : true,
            'browserName' : 'safari',
            'platform' : 'MAC',
            'device' : 'iPhone 7',
            'realMobile' : true,
            'os_version': '10.0'
        },*/
    ],

    onPrepare : function() {
        //jasmine.getEnv().addReporter(failFast.init());

        browser.manage().timeouts().setScriptTimeout(6000000);

        browser.getProcessedConfig().then(function(config) {
            browser.browserName = config.capabilities.browserName;
            browser.os = config.capabilities.os;
            browser.getCapabilities().then(function(cap) {

                console.log(cap);
                browser.mobile = config.capabilities.mobile;

                if (browser.mobile) {
                    console.log('onPrepare: this is mobile');
                    browser.platform = 'mobile';
                    browser.deviceName =  config.capabilities.device;
                    browser.deviceVersion = config.capabilities.os_version;

                    browser.group = config.capabilities.device + '-' + config.capabilities.os_version;
                    browser.subgroup =  config.capabilities.browserName;
                }
                else {
                    console.log('onPrepare: this is desktop');
                    browser.deviceName =  browser.browserName;
                    browser.deviceVersion = config.capabilities.browser_version;

                    browser.group = config.capabilities.os + '-' + config.capabilities.os_version;
                    browser.subgroup = config.capabilities.browserName + '-' + config.capabilities.browser_version;
                }
            });
            // Utility function to decorate testcase descriptions
            // This description is used as a datastructure by the multicapability reporting code, reporter.js
            // theme-name | testcase name | browser | browser version
            // It uses <browser>-<browser version>; it doesn't use those two fields independently.
            // So let's group this as <device|OS>-<version> and <browser>-<browser-version>
            // And the intention is to only use these for the reporting
            // purposes here, not to be used for other tests in the code.
            browser.tc_desc = function(desc) {
                return 'Language:'+browser.params.langOption+'|'+desc+'|'+browser.group+'|'+browser.subgroup;
            };

            browser.indirectClick = function(locator){
                this.executeScript("arguments[0].click();", locator.getWebElement());
            };
        });

        //   browser.executeScript('window.name = "NG_ENABLE_DEBUG_INFO"');

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
                displaySuccessfulSpec: true

            },
            summary: {
                displayDuration: true

            }
        }));

        global.EC = protractor.ExpectedConditions;

        var timeStamp = d.getDate() + '-' + month[d.getMonth()] + '-' + d.getFullYear() + '-' + d.getHours() + 'h-' + d.getMinutes() + 'm';

        return browser.getProcessedConfig().then(function(config) {

            var browserName = config.capabilities.browserName;
            var language =  browser.params.langOption;

            return browser.getCapabilities().then(function(cap) {
                console.log(cap);
                var os_version;
                var device ;
                var browserN;
                browserN =  config.capabilities.browserName;
                os_version = config.capabilities.os_version;

                // For mobile devices, we want "Google Pixel-7.0", but for desktop, we want "Windows-8.1"
                browser.mobile = config.capabilities.mobile;

                if (browser.mobile) {
                    device =  config.capabilities.device;
                }
                else {
                    device = config.capabilities.os;
                }
                jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                    savePath: './Results-Browserstack/'+language+'_'+browserN+'_'+device+'-'+os_version+'_'+timeStamp+'/',
                    screenshotsFolder: 'images',
                    cleanDestination: false,
                    takeScreenshots: true
                }));
            });
        });
    },

    // Code to start browserstack local before start of test
    beforeLaunch: function(){
        console.log("Connecting local");
        return new Promise(function(resolve, reject){
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({'key': exports.config.commonCapabilities['browserstack.key'] }, function(error) {
                if (error) return reject(error);
                console.log('Connected. ...Now testing against browserstack...');

                resolve();
            });
        });
    },

    resultJsonOutputFile: 'ptor-out.json',

    // Code to stop browserstack local after end of test
    afterLaunch: function(){
        var timeStamp = d.getDate() + '-' + month[d.getMonth()] + '-' + d.getFullYear() + '-' + d.getHours() + 'h-' + d.getMinutes() + 'm';
        //multiReport.generateHtmlReport('../ptor-out.json','UID Automation Multicapabilities Summary Report','./Results-Browserstack/localTestRunReport.html');
        multiReport.generateHtmlReport('../ptor-out.json','UID Automation Multicapabilities Summary Report',"./Bamboo_BrowserstackReport/browserStackReport-"+ timeStamp+ ".html");
        //failFast.clean(); // Cleans up the "fail file" (see below)
        return new Promise(function(resolve, reject){
            exports.bs_local.stop(resolve);

        });
    },

    params : {
        user : {
            authentication : {
                email : generatedemail,
                password: 'Xayode0001#',
                language: '',
                secondFactorEmail:sFactoremail,
                secondFactorEmailNew:sFactoremailNew,
                passwordChanged: 'Moodle1!',
                secondFactorEmailNewLocked:sFactoremailLockedNew,
                secondFactorMyAccountNewEmail: sFactorMyaccountNew,
                seconfFactorMyAccountNewEmailLocked: sFactorMyaccountLockedNew,
                secondFactorPhone:phone1,
                secondFactorPhoneNew:phone2,
                secondFactorPhoneMyAccountLocked:phone3,
                secondFactorPhoneMyAccountLockedNew:phone4
            },

            personalInfo : {
                firstName : 'Fname'+ranString,
                lastName : 'Lname'+ranString,
                prefix : 'Prefix'+ranString,
                middlename : 'Mname'+ranString,
                ssn : '123456789',
                dob : '01011981',
                dobInvalidMonth : '13231987',
                dobInvalidDate : '12321987',
                cob : 'Lagos',
                suffix : 'Suffix'+ranString,
                addressLine : '7930 Arjons Dr. Suite D',
                zipCode : '92126',
                city : 'San Diego',
                State : 'California'
            }
        }
    },
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
    for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});