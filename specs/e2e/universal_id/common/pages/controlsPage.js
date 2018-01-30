'use strict';
/* globals module, element, by */
var controlsPage = function() {
	
	this.userDetails = {
		continueButton : element(by.buttonText("CONTINUE")),
		getStartedButton : element(by.name("btngetStarted")),
	};
	
	this.button = function (buttonName){
		return element(by.buttonText(buttonName));
	};
	
};


module.exports = new controlsPage();