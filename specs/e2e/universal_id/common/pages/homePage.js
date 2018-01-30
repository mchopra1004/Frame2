'use strict';
/* globals module, element, by , xpath*/
var homePage = function() {

	this.getstartedBtn = element(by.css('[data-id=\"welcome-button\"]'));

	this.welcomePageSubTitle = element(by.css('[data-id=\"welcome-subtitle\"]'));

    this.headerLabel = function(text) {
		return element(by.cssContainingText('[data-id=\"header-title\"]', text));
    };	
	
    this.headerLabelOne = element(by.css('[data-id=\"header-title\"]')),
//	this.loginButton = element(by.name('buttonLogin'));
	
	//this.openfooterLink = element(by.css('.m-header__menu--account'));
    this.openfooterLink = element(by.css('[data-id=\"header-menu-open\"]'));
//	this.closefooterLink = element(by.css('[data-id=\"footer-close\"]'));
	this.closefooterLink = element(by.xpath("//div[@data-id='footer-close']/img"));
	 this.closexpath = element(by.xpath("//img[@class='close']"))
	this.logoutYes = element(by.css('[data-id=\"button-no\"]'));
	this.logoutNo = element(by.css('[data-id=\"button-yes\"]'));
	this.logoutTitle = element(by.css('[data-id=\"question-title\"]'));
	this.logoutSubTitle = element(by.css('[data-id=\"question-text\"]'));
	this.logoutCloseBtn = element(by.css('[data-id=\"znt-question-yes-no-close-button\"]'));
	this.selectSpanish = element(by.css('[data-id=\"localize-option-mobile-es\"]'));
	this.selectJapanese = element(by.css('[data-id=\"localize-option-mobile-ja\"]'));
	this.selectEnglish = 	element(by.css('[data-id=\"localize-option-mobile-en\"]'));
	this.footer = {
			header : element(by.css('[data-id=\"header-title\"]')),	 
			aboutLink : element(by.css('[data-id=\"footer-about\"]')),	 
			fagsLink : element(by.css('[data-id=\"footer-faqs\"]')),
			supportLink : element(by.css('[data-id=\"footer-support\"]')),
			privacyLink : element(by.css('[data-id=\"footer-privacy\"]')),
			securityLink : element(by.css('[data-id=\"footer-security\"]')),
			zentryLogo : element(by.css('img[alt=\"zentry logo\"]')),
			zentryLogoOne : element(by.css('[data-id=\"footer-logo\"]')),
			accessibilityLink : element(by.css('[data-id=\"footer-accessibility\"]')),
			language : element(by.css('[data-id=\"footer-locale-switch\"]')),
			languageSelect : element(by.css('[data-id=\"localize-select\"]')),
			login : element(by.css('[data-id=\"footer-login\"]')),
			copyrightMsgOne : element(by.xpath("//div[@class='l-copyright show-layout']/small")),
			copyrightMsg : function(text) {
				return element(by.cssContainingText('[data-id=\"footer-copyright\"]', text));
		    },
	        modal : element(by.xpath("//h1[contains(text(),'REMOTE CONTENT')]"))
	        	
	};


	
};


module.exports = new homePage();