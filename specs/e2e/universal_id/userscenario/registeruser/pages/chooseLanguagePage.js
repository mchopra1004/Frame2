'use strict';
/* globals module, element, by , xpath*/
var chooseLanguagePage = function() {
	
	this.langDropDown = element(by.css('.mat-select-value-text'));
	
	this.langDropDownMobile = element(by.css('.m-header__menu'));
	this.localLangOption = element(by.css('[data-id=\"localize-select\"]'));

	this.closeLocalOption = element(by.css('.close'));	
		this.langDropDownOption = function(option) {
		return element(by.cssContainingText('.mat-option', option));
	};
	
	//id="localize-option-es"
	this.mobileLang = function(option) {
		return  element(by.id('localize-option-'+ option));
	
	};
	
	this.landingPage = {
			welcomeText :	element(by.css('[data-id=\"welcome-title\"]')),
			welcomeText2  : element(by.css('[data-id=\"welcome-subtitle\"]')),
			getstartedBtn  : element(by.css('[data-id=\"welcome-button\"]'))
	};
};


module.exports = new chooseLanguagePage();