'use strict';
/* globals module, element, by , xpath*/
var regPersonalInfoPage = function() {
	
	this.userDetails = {
		personalInfoHeader : element(by.xpath("//h1[text()='Personal Information']")),
		nameHeader : element(by.xpath("//h1[text()='NAME']")),
		firstNameText : element(by.id("givenName")),
	    lastNameText : element(by.id("familyName")),
	    addTitleLink : element(by.xpath("//p[contains(text(), 'Add titles, and additional name')]")),
	    prefixText : element(by.id("prefix")),
	    middleNameText : element(by.id("middleName")),
	    suffixText : element(by.id("postfix")),
	    addressHeader : element(by.xpath("//h1[text()='Address']")),
    
	    address1Editbox : element(by.css('input[placeholder=\"Address\"]')),
	    zipcodeEditbox : element(by.css('input[placeholder=\"Zip Code\"]')),
	    cityEditbox : element(by.css('input[placeholder=\"City\"]')),
	    stateEditbox : element(by.css('input[placeholder=\"State\"]')),
	    ssnEditBox : element(by.css('input[placeholder=\"Social Security Number\"]')),
	    dobEditBox : element(by.css('input[placeholder=\"Date of birth\"]')),
	    
	};
    this.confirmDetails  = {
       			dobConfirmLabel : element(by.name('dob')),
       			ssnConfirmLabel : element(by.name('ssnInfo'))
       			
       			//dobConfirmLabel : element(by.css('input[name=\"dob\"]')),
       			//ssnConfirmLabel :  element(by.css('input[name=\"ssnInfo\"]')),
    		
    }


};

module.exports = new regPersonalInfoPage();