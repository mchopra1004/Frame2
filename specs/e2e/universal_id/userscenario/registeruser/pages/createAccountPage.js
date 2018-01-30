'use strict';
/* globals module, element, by , xpath*/
var createAccountPage = function() {
	
	
	   this.langDropDown = element(by.css('mat-select-value-text' ));
	    
	   
	   this.langOption = function(text) {
			return element(by.cssContainingText('.mat-option', text));
		};

	
};


module.exports = new createAccountPage();