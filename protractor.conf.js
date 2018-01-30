var failFast = require('protractor-fail-fast');
var multiReport = require('./reporter.js');
var bamboomultiReport = require('./Bamboo_LocalReport/reporter.js');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var JSONReporter = require('jasmine-bamboo-reporter');
var fs = require('fs');
require('protractor/built/logger').Logger.logLevel = 1;
var path = require('path');
var suites = require('./suites.conf.js').suites;


/* Generate unique emails" +
"
 */
var d = new Date();
var n = d.getTime();
var generatedemail = "uidsfirstfactor+" + n + "@gmail.com";
var sFactoremail = generatedemail.replace("@","1@");
var sFactoremailNew = generatedemail.replace("@","2@");
var sFactoremailLockedNew = generatedemail.replace("@","3@");
var sFactorMyaccountNew = generatedemail.replace("@","4@");
var sFactorMyaccountLockedNew = generatedemail.replace("@","5@");
// The below code is to generate random phone numbers. The sequence used is to generate a random number using current time stamp.
// Then append them with 24 sequence so that its accepted by our system as valid number to receive OTP.
// These numbers used are not basically the real numbers which wouldn't affect any real user receiving the OTPs.
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


exports.config = {

    /*
    plugins: [{
        package: 'protractor-fail-fast'
    }],     */

    //directConnect: true,


    // There are three ways to specify how to use Selenium. Specify one of the
    // following:
    //
    // 1. seleniumServerJar - to start Selenium Standalone locally.
    // 2. seleniumAddress - to connect to a Selenium server which is already
    //    running.
    // 3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.

    // The location of the selenium standalone server .jar file.
    seleniumServerJar: 'node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar',
    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
    seleniumPort: null,
    // Chromedriver location is used to help the selenium standalone server
    // find chromedriver. This will be passed to the selenium jar as
    // the system property webdriver.chrome.driver. If null, selenium will
    // attempt to find chromedriver using PATH.
    chromeDriver: 'node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.33.exe',
    // Additional command line options to pass to selenium. For example,
    // if you need to change the browser timeout, use
    // seleniumArgs: ['-browserTimeout=60'],
    seleniumArgs: [],

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',


    // Capabilities to be passed to the webdriver instance.
    capabilities : {
        browserName : "chrome",
        'chromeOptions' : {
            'args' : [ '--lang=en', '--start-maximized' ],
            'prefs' : {
                'profile.managed_default_content_settings.geolocation' : 1,
                'profile.managed_default_content_settings.cookies' : 1
            }
        }
    },

    maxSessions : 1,

    //multiCapabilities : [
    //
    //    {
    //        browserName : 'chrome'
    //        mobile : false,
    //    },
    //      {
    //        browserName : 'firefox'
    //        mobile : false,
    //    },
    //    {
    //        browserName : 'chrome',
    //        mobile : true,
    //        chromeOptions : {
    //            'mobileEmulation' : {
    //                'deviceName' : 'Nexus 10'
    //            }
    //        }
    //    },
    //
    //    {
    //        browserName : 'chrome',
    //        mobile : true,
    //        chromeOptions : {
    //            'mobileEmulation' : {
    //                'deviceName' : 'Galaxy S5'
    //            }
    //        }
    //    },
    //
    //    {
    //        browserName : 'chrome',
    //        mobile : true,
    //        chromeOptions : {
    //            'mobileEmulation' : {
    //                'deviceName' : 'Nexus 5X'
    //            }
    //        }
    //    },
    //
    //    {
    //        browserName : 'chrome',
    //        mobile : true,
    //        chromeOptions : {
    //            'mobileEmulation' : {
    //                'deviceName' : 'Nexus 6P'
    //            }
    //        }
    //    },
    //
    //    {
    //        browserName : 'chrome',
    //        mobile : true,
    //        chromeOptions : {
    //            'mobileEmulation' : {
    //                'deviceName' : 'iPhone 5'
    //            }
    //        }
    //    },
    //
    //    {
    //        browserName : 'chrome',
    //        mobile : true,
    //        chromeOptions : {
    //            'mobileEmulation' : {
    //                'deviceName' : 'iPhone 6 Plus'
    //            }
    //        }
    //    },
    //    //{
    //    //    browserName : 'chrome',
    //    //    mobile : true,
    //    //    chromeOptions : {
    //    //        'mobileEmulation' : {
    //    //            'deviceName' : 'iPad'
    //    //        }
    //    //    }
    //    //},
    //    {
    //        browserName : 'chrome',
    //        mobile : true,
    //        chromeOptions : {
    //            'mobileEmulation' : {
    //                'deviceName' : 'iPad Pro'
    //            }
    //        }
    //    },
    //],

    // Spec patterns are relative to the current working directory when
    // specs: ['./specs/*.js'],

    'suites' : suites,

    // Selector for the element housing the angular app - this defaults
    // to

    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement : 'body',

    useAllAngular2AppRoots: true,

    onPrepare : function() {
        // jasmine.getEnv().addReporter(failFast.init());

        browser.manage().timeouts().setScriptTimeout(60000);

        browser.getProcessedConfig().then(function(config) {
            browser.browserName = config.capabilities.browserName;
            browser.getCapabilities().then(function(cap) {
                browser.mobile = config.capabilities.mobile;
                browser.emulation = cap.get('mobileEmulationEnabled');
                browser.runningBrowserName =  cap.get('browserName');
                console.log(cap);
                if (cap.get('mobileEmulationEnabled') === true) {
                    browser.deviceName =  config.capabilities.chromeOptions.mobileEmulation.deviceName;
                    browser.deviceVersion = 'emulator';
                }
                else{
                    browser.deviceName =  browser.browserName;
                    var version = parseInt(cap.get('version'));
                    browser.deviceVersion = Math.round(version);
                }
            });
            // Utility function to decorate testcase descriptions
            browser.tc_desc = function(desc) {
                return 'Language:'+browser.params.langOption+'|'+desc+'|'+browser.deviceName+'|'+browser.deviceVersion;
            };

            browser.indirectClick = function(locator){

                this.executeScript("arguments[0].click();", locator.getWebElement());
            };
        });

        browser.executeScript('window.name = "NG_ENABLE_DEBUG_INFO"');

        jasmine.getEnv().addReporter(new JSONReporter({
            file: 'jasmine-results-new.json', // by default it writes to jasmine.json
            beautify: true,
            indentationLevel: 4 // used if beautify === true
        }));


        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
                displaySuccessfulSpec: true

            },
            summary: {
                displayDuration: true

            }
        }));
        //jasmine.getEnv().addReporter(failFast.init());

        global.EC = protractor.ExpectedConditions;



        var timeStamp = d.getDate() + '-' + month[d.getMonth()] + '-' + d.getFullYear() + '-' + d.getHours() + 'h-' + d.getMinutes() + 'm';

        return browser.getProcessedConfig().then(function(config) {


            var browserName = config.capabilities.browserName;
            var language =  browser.params.langOption;

            return browser.getCapabilities().then(function(cap) {
                if (cap.get('mobileEmulationEnabled') === true) {

                    var deviceName =  config.capabilities.chromeOptions.mobileEmulation.deviceName;

                    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                        savePath: './Results-Local/'+language+'_'+browserName+'_'+deviceName+'_'+timeStamp+'/',
                        screenshotsFolder: 'images',
                        cleanDestination: false,
                        takeScreenshots: true
                    }));

                }
                else {

                    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                        savePath: './Results-Local/'+language+'_'+browserName+'_'+timeStamp+'/',
                        screenshotsFolder: 'images',
                        cleanDestination: false,
                        takeScreenshots: true
                    }));
                }

            });

        });
    },

    onComplete: function() {
        /*
        At this point, tests will be done but global objects will still be
        available.*/
    },

    beforeLaunch: function() {
        //clean up any residual/leftover from a previous run. Ensure we have clean
        //files for both locking and merging.
        if (fs.existsSync('jasmine-results-new.json.lock')) {
            fs.unlinkSync('jasmine-results-new.json.lock');
        }
        if (fs.existsSync('jasmine-results-new.json')) {
            fs.unlink('jasmine-results-new.json');
        }
    },

    resultJsonOutputFile: 'ptor-out.json',

    afterLaunch: function() {
        var timeStamp = d.getDate() + '-' + month[d.getMonth()] + '-' + d.getFullYear() + '-' + d.getHours() + 'h-' + d.getMinutes() + 'm';


        //multiReport.generateHtmlReport('./ptor-out.json','UID Automation Multicapabilities Summary Report',"./Results-Local/localTestRunReport-"+ timeStamp+ ".html");
        bamboomultiReport.generateHtmlReport('../ptor-out.json','UID Automation Multicapabilities Summary Report',"./Bamboo_LocalReport/BambooReport-"+ timeStamp+ ".html");
        //  failFast.clean(); // Cleans up the "fail file" (see below)

    },

    // Options to be passed to Jasmine.
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
        defaultTimeoutInterval: 6000000
    },

    params : {

        user : {
            authentication : {
                email : generatedemail,
                password: 'Xayode0001#',
                language: '',
                secondFactorEmail:sFactoremail,
                secondFactorEmailNew:sFactoremailNew,
                secondFactorEmailNewLocked:sFactoremailLockedNew,
                secondFactorMyAccountNewEmail: sFactorMyaccountNew,
                seconfFactorMyAccountNewEmailLocked: sFactorMyaccountLockedNew,
                passwordChanged: 'Moodle1!',
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