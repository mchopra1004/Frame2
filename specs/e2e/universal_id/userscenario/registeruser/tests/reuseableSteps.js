'use strict';

/* jshint node: true */
/* globals browser, describe, it, beforeAll, afterAll, EC, expect, protractor, xit */
var cP = require('../pages/chooseLanguagePage.js');

var reuseableSteps = function() {
	
	
this.changeLanguageDesktop = function(text) {
   
	cP.langDropDown.click();
	browser.sleep(1000);
	cP.langDropDownOption(text).click();
};

this.changeLanguageMobile = function() {
	cP.langDropDownMobile.click();
	browser.sleep(2000);
	cP.localLangOption.click();
	browser.sleep(1000);
  };
  
  this.changeLocalMobile = function(option) {
	  cP.mobileLang(option).click();
	  browser.sleep(2000);
	  cP.closeLocalOption.click();
  };


};

module.exports = new reuseableSteps();