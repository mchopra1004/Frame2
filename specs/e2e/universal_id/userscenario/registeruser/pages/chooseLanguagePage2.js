'use strict';
/* globals module, element, by , xpath*/
var chooseLanguagePage2 = function() {
	
	
	
	this.openfooterLink = element(by.css('[data-id=\"header-menu-open\"]'));
	this.closefooterLink = element(by.css('[data-id=\"footer-close\"]'));

	
		this.languageSelect= function(option) {
		return  element(by.css("[data-id=\"localize-option-mobile-"+option+"\"]"));
		
	};
	
	this.localOption = element(by.css('[data-id="localize-select"]'));
	

	
	this.landingPage = {
			welcomeText :	element(by.css('[data-id=\"welcome-title\"]')),
			welcomeText2  : element(by.css('[data-id=\"welcome-subtitle\"]')),
			getstartedBtn  : element(by.css('[data-id=\"welcome-button\"]'))
	};
};


module.exports = new chooseLanguagePage2();