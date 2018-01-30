'use strict';
/* globals module, element, by , xpath*/
var personalDetailsPage = function() {


	this.nameLabel = element(by.css('[data-id=\"personal-title\"]'));
	this.nameLabelWeb = element(by.xpath("//div[@class='m-card-form__header']/h1"));
	this.nameLabelMob = element(by.xpath("//div[@class='m-card-form__toolbar']/h1"));
	this.continueBtn = element(by.css('[data-id=\"setup-button\"]'));
	this.addressPageSubtext = element(by.css('[data-id=\"address-subtitle\"]'));
	this.helpLink = element(by.css('[data-id=\"personal-help-button\"]'));
	this.helpLinkClose = element(by.css('[data-id=\"personal-help-close-button\"]'));
	this.helpLinkContent =  element(by.xpath("//h2[contains(text(),'personal-help')]"));

	this.currentAddressHelp = {

			helpLink : element(by.css('[data-id=\"address-help-button\"]')),
			helpLinkClose : element(by.css('[data-id=\"address-help-close-button\"]')),
			helpLinkContent : element(by.xpath("//h2[contains(text(),'address-help')]"))
	};

	this.personalInformationHelp = {

			helpLink : element(by.css('[data-id=\"security-help-button\"]')),
			helpLinkClose : element(by.css('[data-id=\"security-help-close-button\"]')),
			helpLinkContent : element(by.xpath("//h2[contains(text(),'security-help')]"))

	};

	this.userDetails = {
			firstName : element(by.css('[data-id=\"FirstName\"]')),
			familyName : element(by.css('[data-id=\"FamilyName\"]')),
			continueBtn : element(by.css('[data-id=\"personal-submit-button\"]')),
			FirstNameError : element(by.css('[data-id=\"FirstName-message\"]')),
			FamilyNameError: element(by.css('[data-id=\"FamilyName-message\"]')),
			AddTitles : element(by.css('[data-id=\"personal-open-button\"]')),
			MiddleName : element(by.css('[data-id=\"MiddleName\"]')),
			MiddleNameError : element(by.css('[data-id=\"MiddleName-message\"]')),
			Suffix: element(by.css('[data-id=\"Postfix\"]')),
			SuffixError: element(by.css('[data-id=\"Postfix-message\"]')),
			Prefix: element(by.css('[data-id=\"Prefix"]')),
			PrefixMr: element(by.css('mat-option:nth-child(1) div')),
			PrefixMs: element(by.css('mat-option:nth-child(2) div')),
			backBtn: element(by.css('[data-id=\"personal-back-button\"]')),
			firstNameLabel: element(by.css('[data-id=\"FirstName-label\"]')),
			firstNamePlaceholder: element(by.css('[data-id=\"FirstName-placeholder\"]')),
			familyNameLabel: element(by.css('[data-id=\"FamilyName-label\"]')),
			familyNamePlaceholder: element(by.css('[data-id=\"FamilyName-placeholder\"]')),
			addTitlesLinkImage: element(by.xpath("//button[@data-id='personal-open-button']/span/img")),
			prefixLabel: element(by.css('[data-id=\"Prefix-label\"]')),
			prefixPlaceholder: element(by.xpath("//*[@id='Prefix']/div/span[1]")),
			suffixLabel: element(by.css('[data-id=\"Postfix-label\"]')),
			suffixPlaceholder: element(by.css('[data-id=\"Postfix-placeholder\"]')),
			middleNameLabel: element(by.css('[data-id=\"MiddleName-label\"]')),
			middleNamePlaceholder: element(by.css('[data-id=\"MiddleName-placeholder\"]')), 
	};

	this.address =  {
			pageTitle : element(by.css('[data-id=\"address-title\"]')),
			pageTitleWeb:  element(by.xpath("//div[@class='m-card-form__header']/h1")),
	        pageTitleMob : element(by.xpath("//div[@class='m-card-form__toolbar']/h1")),
			country : element(by.css('[data-id=\"countryName\"]')),
	        selectValue: element(by.xpath("//div[@role='listbox']/mat-option[1]")),
			countryError : element(by.css('[data-id=\"countryName-message\"]')),
			street : element(by.css('[data-id=\"Street\"]')),
			streetError : element(by.css('[data-id=\"Street-message\"]')),
		    zipcode : element(by.css('[data-id=\"postalCode\"]')),
			zipcodeError : element(by.css('[data-id=\"postalCode-message\"]')),
			city : element(by.css('[data-id=\"City\"]')),
			cityError : element(by.css('[data-id=\"City-message\"]')),
			state : element(by.css('[data-id=\"State\"]')),
			stateError : element(by.css('[data-id=\"State-message\"]')),
			continueBtn : element(by.css('[data-id=\"address-submit-button\"]')),
			extendedAddress: element(by.css('[data-id=\"ExtendedAddress\"]')),
			Address2Link: element(by.css('[data-id=\"address-open-button\"]')),
			backbtn: element(by.css('[data-id=\"address-back-button\"]')),
			countryLabel: element(by.css('[data-id=\"countryName-label\"]')),
			countryPlaceholder: element(by.css('[data-id=\"countryName-placeholder\"]')),
			addressLable: element(by.css('[data-id=\"Street-label\"]')),
			addressPlaceholder: element(by.css('[data-id=\"Street-placeholder\"]')),
			zipCodeLabel: element(by.css('[data-id=\"postalCode-label\"]')),
			zipCodePlaceholder: element(by.css('[data-id=\"postalCode-placeholder\"]')),
			cityLabel: element(by.css('[data-id=\"City-label\"]')),
			cityPlaceholder: element(by.css('[data-id=\"City-placeholder\"]')),
			stateLabel: element(by.css('[data-id=\"State-label\"]')),
			statePlaceholder: element(by.css('[data-id=\"State-placeholder\"]')),
			address2LinkIcon: 	element(by.xpath("//button[@data-id='address-open-button']/span/img")),
			extendedAddressLabel: element(by.css('[data-id=\"ExtendedAddress-label\"]')),
			extendedAddressPlaceholder: element(by.css('[data-id=\"ExtendedAddress-placeholder\"]')),


	};

	this.personalInfo = {
			securityTitle : element(by.css('[data-id=\"security-title\"]')),
			securityTitleWeb:  element(by.xpath("//div[@class='m-card-form__header']/h1")),
			securityTitleMob : element(by.xpath("//div[@class='m-card-form__toolbar']/h1")),
			securitySubTitle : element(by.css('[data-id=\"security-subtitle\"]')),
			ssn : element(by.css('[data-id=\"SSN\"]')),
			ssnError: element(by.css('[data-id=\"SSN-message\"]')),
			dob : element(by.css('[data-id=\"DOB\"]')),
			dobError : element(by.css('[data-id=\"DOB-message\"]')),
			cob : element(by.css('[data-id=\"CityOfBirth\"]')),
			cobError : element(by.css('[data-id=\"CityOfBirth-message\"]')),
			continueBtn : element(by.css('[data-id=\"security-submit-button\"]')),
			backbtn: element(by.css('[data-id=\"security-back-button\"]')),
			ssnLabel: element(by.css('[data-id=\"SSN-label\"]')),
			ssnPlaceholder: element(by.css('[data-id=\"SSN-placeholder\"]')),
			dobLabel: element(by.css('[data-id=\"DOB-label\"]')),
			dobPlaceholder: element(by.css('[data-id=\"DOB-placeholder\"]')),	
			cobLabel: element(by.css('[data-id=\"CityOfBirth-label\"]')),
			cobPlaceholder: element(by.css('[data-id=\"CityOfBirth-placeholder\"]')),
	};

	this.confirmation = {
			ConfirmSubTitle : element(by.css('[data-id=\"confirm-subtitle\"]')),
			confirmTitleWeb:  element(by.xpath("//div[@class='m-card-form__header']/h1[@data-id='confirm-title']")),
			confirmTitleMob : element(by.xpath("//div[@class='m-card-form__toolbar']/h1[@data-id='confirm-title']")),
			name : element(by.css('[data-id=\"Name\"]')),
			nameEdit : element(by.css('#name .mat-button-ripple.mat-ripple')),
			address : element(by.css('[data-id=\"Address\"]')),
			addressEdit : element(by.css('#address .mat-button-ripple.mat-ripple')),
			AddressUpdateBtn : element(by.css('[data-id=\"address-submit-button"]')),
			PersonalUpdateBtn : element(by.css('[data-id=\"personal-submit-button"]')),
			PersonalSubTitle : element(by.css('[data-id=\"personal-subtitle"]')),
			AddressSubTitle : element(by.css('[data-id=\"address-subtitle"]')),
			dob : element(by.css('[data-id=\"DateOfBirth\"]')),
			dobEdit : element(by.css('#dateOfBirth .mat-button-ripple.mat-ripple')),
			cob : element(by.css('[data-id=\"CityOfBirth\"]')),
			cobEdit : element(by.css('#cityOfBirth .mat-button-ripple.mat-ripple')),
			ssn : element(by.css('[data-id=\"SSN\"]')),
			ssnEdit : element(by.css('#SSN .mat-button-ripple.mat-ripple')),
			securitySubtitle: element(by.css('[data-id=\"security-subtitle\"]')),
			securitySubmitBtn: element(by.css('[data-id=\"security-submit-button\"]')),
			submit : element(by.css('[data-id=\"confirm-submit-button\"]')),
			backbtn: element(by.css('[data-id=\"confirm-back-button\"]')),
			addressLabel: element(by.css('[data-id=\"Address-label\"]')),
			dobLabel: element(by.css('[data-id=\"DateOfBirth-label\"]')),
			nameLabel: element(by.css('[data-id=\"Name-label\"]')),
			nameEditText: element(by.css('[data-id=\"Name-edit-button\"]')),
			AddressEditText: element(by.css('[data-id=\"Address-edit-button\"]')),
			ssnEditText: element(by.css('[data-id=\"SSN-edit-button\"]')),
			dobEditText: element(by.css('[data-id=\"DateOfBirth-edit-button\"]')),
			cobEditText: element(by.css('[data-id=\"CityOfBirth-edit-button\"]')),
			helpLink : element(by.css('[data-id=\"confirm-help-button\"]')),
			helpLinkClose : element(by.css('[data-id=\"confirm-help-close-button\"]')),
			helpLinkContent : element(by.xpath("//h2[contains(text(),'confirm-help')]"))
			
	};

	this.addressExpand =element(by.css('[data-id=\"personal-opent-button\"]'));

	this.langOption = function(text) {
		return element(by.cssContainingText('.mat-option', text));
	};


};


module.exports = new personalDetailsPage();