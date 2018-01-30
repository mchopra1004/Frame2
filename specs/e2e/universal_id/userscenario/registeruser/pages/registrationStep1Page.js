'use strict';
/* globals module, element, by , xpath*/
var registrationStep1Page = function() {
	
	this.registration = {
		emailEditBox  :	element(by.css('[data-id=\"Email\"]')),
		emailErrorMessage: element(by.css('[data-id=\"Email-message\"]')),
		passwordEditBox   : element(by.css('[data-id=\"Password\"]')),
		passwordErrorMessage: element(by.css('[data-id=\"Password-message\"]')),
		termsAndConditionsCheckBox   : element(by.name('termsAndConditions')),
		createAccountBtn   : element(by.css('[data-id=\"register-button\"]')),
		EmailExistsError   : element(by.css('[data-id=\"welcome-registration-general-error\"]')),
		pDetailsHeaderTitle : element(by.css('[data-id=\"setup-title\"]')),
		pDetailsDesc : element(by.css('[data-id=\"setup-subtitle\"]')),
		pDetailsContn : element(by.css('[data-id=\"setup-button\"]')),
		regSubTitleTxt : element(by.css('[data-id="register-subtitle"]')),
		privacyPolicyTxt : element(by.css('[data-id=\"termsAndConditions-label\"]')),
		helpLink : element(by.css('[data-id=\"setup-help-button\"]')),
		helpLinkClose : element(by.css('[data-id=\"setup-help-close-button\"]')),
		helpLinkContent :  element(by.xpath("//h2[contains(text(),'setup-help')]")),
		termsAndConditions : element(by.xpath("//label[@data-id='termsAndConditions-label']/a[1]")),
		privacyPolicy : element(by.xpath("//label[@data-id='termsAndConditions-label']/a[2]")),
	   	privacyPolicyTxt : element(by.css('[data-id=\"termsAndConditions-label\"]')),
		closeModal : element(by.xpath("//img[@class='close']")),
		verifyTermsModal : element(by.xpath("//h1[contains(text(),'terms')]")),
		verifyPrivacyModal : element(by.xpath("//h1[contains(text(),'privacy')]")),
		emailPlaceholder : element(by.css('[data-id=\"Email-placeholder\"]')),
		passwordPlaceholder : element(by.css('[data-id=\"Password-placeholder\"]')),
		passwordShow : element(by.id("show")),
		regWelcomeText   : element(by.css('[data-id=\"welcome-registration-title\"]')),
		regWelcomeDecText :  element(by.css('[data-id=\"welcome-registration-subtitle\"]')),
		regTitleTxt :  element(by.css('[data-id=\"register-title\"]')),
		setUpIcon :  element(by.css('[data-id=\"setup-icon\"]')),
		logInButton: element(by.css('[data-id=\"login-button\"]')),

	};
	
};

module.exports = new registrationStep1Page();	