Universal ID UI Automation
========================

project which contains all the necessary setup for the protractor E2E testing using grunt.

## Installation path 1  ( directConnect: true)
Do the following after downloading this repo

* (1) install gitbash for windows/mac for running commands
* (2). Install NodeJS from "https://nodejs.org/en/"
* Protractor is an end-to-end test framework for Angular and AngularJS applications. 
* Protractor is a Node.js program built on top of WebDriverJS. )

* (3) CD to project files location
* (4) npm install
* (5) npm install -g grunt-cli
* (6) grunt install

Note: step 1 to 6 , is a one-off setup on a new system

## To run against local deployment
* grunt qa --suite=regflow  --lang=es
* grunt dev --suite=regflow  --lang=es
* grunt qa --suite=regflowNegative    (For running negative scenarios)

## To run against browserstack deployment

### Setting up credentials file for browserstack user:

Before running the test againt browserstack, make sure that there is a file userBrowserStackCredentials.js  located in root directory of the project.

Contents of that file should be as below:

```
{
  "username": "TestUserName",
  "userpassword": "TestPassword"
}
```


The suites have been divided based on the tests to be run: 

* grunt qabrowserstack --suite=regflow1 : This is to run happy path of the tests when user selects second factor as phone
* grunt qabrowserstack --suite=regflow2 : This is to run happy path of the tests when user selects second factor as email
* grunt qabrowserstack --suite=regflow3 : This is to run happy path of the tests when user selects second factor as hardware token


* grunt qabrowserstack --suite=regflowNegativePhone : This is to run negative scenarios of the tests when user selects second               													  factor as phone.
* grunt qabrowserstack --suite=regflowNegativeEmail : This is to run negative scenarios of the tests when user selects second               													  factor as email.

If you want to run on dev environment then replace 'qa' keyword with 'dev'
If you want to run against other languages then add --lang=es ahead of the command. For example : grunt devbrowserstack --suite=regflow  --lang=es

If --lang is not provided, it will default to en for english

## Running against QA1 and QA2 URL

If anyone needs to run on above mentioned environments, just change the above parameters to qa1 or qa2. For example: 

* grunt qa1browserstack --suite=regflow1 or grunt qa2browserstack --suite=regflow1
* grunt qa1 --suite=regflow or grunt qa2 --suite=regflow

## Installation path 2 .

In addition to step 1 to 6, you need to manually start the selenium server

## To run against local running server
* npm install -g protractor  
* webdriver-manager update
* webdriver-manager start

## Open a new cmd 
* comment out this line 'directConnect: true,' in protractor.conf.js
* grunt qalocal --suite=regflow  --lang=es
* grunt devlocal --suite=regflow  --lang=es

References

Protractor API
http://www.protractortest.org/#/api


Dev Setup
Develop on Eclipse with Tern Project plugin
https://github.com/angelozerr/tern.java/wiki/Tern-&-Protractor-support