'use strict';

var myactpage = require('../pages/myAccountPage.js');
var homeP = require('../../../common/pages/homePage.js');
var reg = require('../pages/registrationStep1Page.js');
afterAll(function(done) {
	process.nextTick(done);
});


describe('UIDS-1267  My Account Change Password Page ----- ', function() {



	it(browser.tc_desc('UIDQE-317 TC2a (1) Click on change password button (2) Verify the header'), function() {

		if ( !browser.mobile ){

			console.log("On web browsers focus is already on settings page");
		}

		else {

			myactpage.settings.settingsElement.click();
		}

		browser.wait(EC.visibilityOf(myactpage.changePassword.changeButton), 12000, 'Change button for password is not displayed');
		myactpage.changePassword.changeButton.click();

		if (!browser.mobile){

			browser.wait(EC.visibilityOf(myactpage.changePassword.headerWeb), 12000, 'Change password header is not displayed');
			expect(myactpage.changePassword.headerWeb.getText()).toEqual(browser.params.user.authentication.language.changePassword.title.toUpperCase());
		}

		else{
			browser.wait(EC.visibilityOf(myactpage.changePassword.headerMobile), 12000, 'Change password header is not displayed');
			expect(myactpage.changePassword.headerMobile.getText()).toEqual(browser.params.user.authentication.language.changePassword.title.toUpperCase());
		}
	});

	it(browser.tc_desc('UIDQE-317 TC1 (1) Verify page title'), function() {
		expect(browser.getTitle()).toBe(browser.params.user.authentication.language.titles.AccountChangePassword);
	});

	it(browser.tc_desc('UIDQE-317 TC2b (1) Verify current password label and placeholder'), function() {
		expect(myactpage.changePassword.currenPasswordLabel.getText()).toEqual(browser.params.user.authentication.language.changePassword.lbOldPassword);
		expect(myactpage.changePassword.currentPasswordPlaceholder.getText()).toEqual(browser.params.user.authentication.language.changePassword.phOldPassword);
	});

	it(browser.tc_desc('UIDQE-317 TC2c (1) Verify new password label and placeholder'), function() {
		expect(myactpage.changePassword.newPasswordLabel.getText()).toEqual(browser.params.user.authentication.language.changePassword.lbNewPassword);
		expect(myactpage.changePassword.newPasswordPlaceholder.getText()).toEqual(browser.params.user.authentication.language.changePassword.phNewPassword);
	});

	it(browser.tc_desc('UIDQE-317 TC2d (1) Verify confirm password label and placeholder'), function() {
		expect(myactpage.changePassword.confirmaPasswordLabel.getText()).toEqual(browser.params.user.authentication.language.changePassword.lbConfirmPassword);
		expect(myactpage.changePassword.confirmPasswordPlaceholder.getText()).toEqual(browser.params.user.authentication.language.changePassword.phConfirmPassword);
	});


	it(browser.tc_desc('UIDQE-317 TC9 (1) Verify clicking on help button (2) Open a help modal'), function() {
		browser.wait(EC.visibilityOf(myactpage.changePassword.helpButton), 120000, 'Help Link is not displayed');
		myactpage.changePassword.helpButton.getText().then(function(text)
				{
			expect( text.trim().toUpperCase()).toBe(browser.params.user.authentication.language.mobnav.help.toUpperCase());
				});
		myactpage.changePassword.helpButton.click();
		browser.wait(EC.visibilityOf(myactpage.changePassword.helpContent), 120000, 'Help content is not displayed');
		expect(myactpage.changePassword.helpContent.isDisplayed()).toBeTruthy();
	});

	it(browser.tc_desc('UIDQE-317 TC10 (1) Verify clicking on close button on help modal (2) Should close the modal'), function() {
		browser.wait(EC.visibilityOf(myactpage.changePassword.helpCloseButton), 120000, 'Close button on help content is not displayed');
		myactpage.changePassword.helpCloseButton.click();
		expect(myactpage.changePassword.helpContent.isPresent()).toEqual(false);
	});

	it(browser.tc_desc('UIDQE-317 TC2d (1) Verify change password button text'), function() {
		browser.executeScript("arguments[0].scrollIntoView();",myactpage.changePassword.changePasswordButton);
		expect(myactpage.changePassword.changePasswordButton.getText()).toEqual(browser.params.user.authentication.language.changePassword.btnNew.toUpperCase());
	});

	it(browser.tc_desc('UIDQE-317 TC3 and 4 (1) Enter current password, new password and confirm password (2) Click on change password button (3) Password should be changed'), function() {
		browser.wait(EC.visibilityOf(myactpage.changePassword.currentPasswordTextBox), 120000, 'Current Password text box is not visible');
		myactpage.changePassword.currentPasswordTextBox.sendKeys(browser.params.user.authentication.password);
		myactpage.changePassword.newPasswordTextBox.sendKeys(browser.params.user.authentication.passwordChanged);
		myactpage.changePassword.confirmPasswordTextBox.sendKeys(browser.params.user.authentication.passwordChanged);
		browser.indirectClick(myactpage.changePassword.changePasswordButton);
		browser.wait(EC.presenceOf(myactpage.changePassword.changePasswordMessage), 120000, 'Change Password Message is not displayed');
		expect(myactpage.changePassword.changePasswordMessage.getText()).toEqual(browser.params.user.authentication.language.changePassword.lbSuccess);
		browser.sleep(2000);
		expect(myactpage.settings.titles(browser.params.user.authentication.language.accountSettings.password).getText()).toEqual(browser.params.user.authentication.language.accountSettings.password);
	});

	it(browser.tc_desc('UIDQE-317 TC13 (1) Verify user can login with the same user and changed password'), function() {

		if ( !browser.mobile ) {
			browser.indirectClick(homeP.openfooterLink);
			browser.sleep(1000);
			browser.indirectClick(homeP.footer.login);
			homeP.logoutYes.click();
			browser.sleep(2000);
			browser.indirectClick(homeP.openfooterLink);
			browser.sleep(1000);
			browser.indirectClick(homeP.footer.login);
			browser.wait(EC.visibilityOf(reg.registration.emailEditBox), 120000, 'Menu Link is not displayed');
			reg.registration.emailEditBox.sendKeys(browser.params.user.authentication.email);
			reg.registration.passwordEditBox.sendKeys(browser.params.user.authentication.passwordChanged);
			browser.wait(EC.visibilityOf(reg.registration.logInButton), 120000, 'Log in button is not displayed');
			reg.registration.logInButton.click();
			browser.sleep(2000);
			browser.getTitle().then(function(text)
					{
				expect( text.toUpperCase()).toBe(browser.params.user.authentication.language.titles.AccountSecondFactorPage.toUpperCase());
					});
		}

		else {
			browser.wait(EC.visibilityOf(myactpage.settings.backBtn), 120000, 'Back button on my account settings page is not displayed');
			myactpage.settings.backBtn.click();
			browser.wait(EC.visibilityOf(homeP.openfooterLink), 120000, 'Menu link is not visible');
			browser.indirectClick(homeP.openfooterLink);
			browser.wait(EC.visibilityOf(homeP.footer.login), 120000, 'Logout link is not available');
			browser.indirectClick(homeP.footer.login);
			homeP.logoutYes.click();
			browser.sleep(2000);
			browser.indirectClick(homeP.openfooterLink);
			browser.sleep(1000);
			browser.indirectClick(homeP.footer.login);
			browser.wait(EC.visibilityOf(reg.registration.emailEditBox), 120000, 'Menu Link is not displayed');
			reg.registration.emailEditBox.sendKeys(browser.params.user.authentication.email);
			reg.registration.passwordEditBox.sendKeys(browser.params.user.authentication.passwordChanged);
			browser.wait(EC.visibilityOf(reg.registration.logInButton), 120000, 'Log in button is not displayed');
			reg.registration.logInButton.click();
			browser.sleep(2000);
			browser.getTitle().then(function(text)
					{
				expect( text.toUpperCase()).toBe(browser.params.user.authentication.language.titles.AccountSecondFactorPage.toUpperCase());
					});
		}
	});
});