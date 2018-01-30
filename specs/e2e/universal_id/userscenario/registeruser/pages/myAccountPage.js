'use strict';
/* globals module, element, by , xpath*/
var myAccountPage = function() {


    this.myAccount = {
            myAccountHeader:  element(by.css('[data-id=\"header-menu-open\"]')),
            myAccountItems: element.all(by.css('.items>ul>li')),
            myAccountWelcome: element(by.css('.account-home-component>h1')),
            myAccountText: element(by.css('[data-id=\"account-home-intro\"]')),
    };

    this.myAccountProfile = {

            profileElement: element(by.css('[data-id=\"account-menu-profile\"]')),
            profileHeaderWeb: element(by.css('.m-card-form__header>h1')),
            profileHeaderMobile: element(by.css('.m-card-form__toolbar>h1')),
            helpLink: element(by.css('[data-id=\"personal-help-button\"]')),
            helpLinkClose: element(by.css('[data-id=\"personal-help-close-button\"]')),
            helpLinkContent: element(by.xpath("//h2[contains(text(),'personal-help')]")),
            profileHelp: element(by.css('[data-id=\"personal-help-button\"]')),
            profilePersonalDetailsHeader: element(by.css('.m-card-form__content>.row:nth-child(1)>h4')),
            profileContactInfoHeader: element(by.css('.m-card-form__content>.row:nth-child(2)>h4')),
            profileNameLabel: element(by.css('[data-id=\"Name-label\"]')),
            profilePrimaryEmailHeader: element(by.css('[data-id=\"Contact-label\"]')),
            profileCurrentAddressHeader: element(by.css('[data-id=\"Address-label\"]')),
            profileName: element(by.css('[data-id=\"Name\"]')),
            profilePrimaryEmail: element(by.css('[data-id=\"Contact\"]')),
            profileCurrentAddress: element(by.css('[data-id=\"Address\"]')),
            profileBackBtn: 	element(by.css('[data-id=\"personal-back-button\"]')),
    };

    this.edit = {

            nameEditBtn: element(by.css('[data-id=\"Name-edit-button\"]')),
            emailEditBtn: element(by.css('[data-id=\"Contact-edit-button\"]')),
            addressEditBtn: element(by.css('[data-id=\"Address-edit-button\"]')),


    };

    this.twoStep = {

            twoStepElement: element(by.css('[data-id=\"account-menu-second-factor\"]')),
            twoStepHelp: element(by.css('[data-id=\"second-factor-help-button\"]')),
            twoStepHeaderWeb: element(by.css('.m-card-form__header>h1')),
            twoStepHeaderMobile: element(by.css('.m-card-form__toolbar>h1')),
            twoStepPhoneLabel: function(text) {
                return element(by.cssContainingText('[data-id=\"second-factor-title\"]', text));
            },

            twoStepEmailLabel: function(text) {
                return element(by.cssContainingText('[data-id=\"second-factor-title\"]', text));
            },

            twoStepPhonesAdded: element(by.css('[data-id=\"phones-added\"]')),
            twoStepEmailsAdded: element(by.css('[data-id=\"emails-added\"]')),
            twoStepEmailNewAdded: element(by.xpath("//ul[@data-id='emails-added']/li[2]")),
            twoStepPhoneNewAdded: element(by.xpath("//ul[@data-id='phones-added']/li[2]")),

            twoStepAddPhone: function(text) {
                return element(by.cssContainingText('[data-id=\"second-factor-button\"]', text));
            },

            twoStepAddEmail: function(text) {
                return element(by.cssContainingText('[data-id=\"second-factor-button\"]', text));
            },

            twoStepIcons : element.all(by.xpath("//div[@class='icon'][@data-id='second-factor-icon']")),
            twoStepBackBtn : element(by.css('[data-id=\"second-factor-back-button\"]')),
            helpLink : element(by.css('[data-id=\"second-factor-help-button\"]')),
            helpLinkClose : element(by.css('[data-id=\"second-factor-help-close-button\"]')),
            helpLinkContent : element(by.xpath("//h2[contains(text(),'second-factor-help')]")),

            twoStep2StepIcon : element.all(by.xpath("//li[@data-id='account-menu-second-factor']/div")),
            twoStepProfileIcon : element.all(by.xpath("//li[@data-id='account-menu-profile']/div")),
            twoStepSettingIcon : element.all(by.xpath("//li[@data-id='account-menu-settings']/div")),
            twoStepCertificatesIcon : element.all(by.xpath("//li[@data-id='account-menu-certificates']/div")),
            twoStepHomeIcon : element.all(by.xpath("//div[@class='account-home-component__status account-home-component__status--verified']")),

            phoneRemove : element(by.xpath("//ul[@data-id='phones-added']/li/a")),
            emailRemove : element(by.xpath("//ul[@data-id='emails-added']/li/a")),
            myAccountMenuHeader : element(by.xpath("//div[@class='m-header__title']/p")),
    };

    this.success = {

            successHeader: element(by.css('[data-id=\"welcome-title\"]')),
            successSubHeader: element(by.css('[data-id=\"welcome-message\"]')),
            successContinueBtn: element(by.css('[data-id=\"welcome-button-continue\"]')),
            successCloseBtn: element(by.css('[data-id=\"znt-account-welcome-close-button\"]')),
            successIcon: element(by.css('[data-id=\"welcome-icon\"]')),

    };

    this.addEmail = {

            addEmailHeaderMobile: element(by.xpath("//div[@class='m-card-form__toolbar']/h1[@data-id='otpemail-title']")),
            addEmailHeader:  element(by.xpath("//div[@class='m-card-form__header']/h1[@data-id='otpemail-title']")),
            addEmailSubtitle: element(by.xpath("//p[@data-id='optemail-subtitle']")),
            addEmailHelpBtn: element(by.css('[data-id=\"otpemail-help-button\"]')),
            addEmailContinueBtn: element(by.xpath("//div[@class='m-card-form__footer']/button/span")),
            addEmailCloseBtn: element(by.css('[data-id=\"znt-question-yes-no-close-button\"]')),
            addEmailTextBox: element(by.css('[data-id=\"Email\"]')),
            addEmailEmailLabel: element(by.css('[data-id=\"Email-label\"]')),
            helpLink: element(by.css('[data-id=\"otpemail-help-button\"]')),
            helpLinkClose: element(by.css('[data-id=\"otpemail-help-close-button\"]')),
            helpLinkContent: element(by.xpath("//h2[contains(text(),'otpemail-help')]")),
    };

    this.removeEmail={

            removeButton: element(by.xpath("//ul[@data-id='emails-added']/li[2]/a")),
            removeModalHeader: element(by.css('[data-id=\"question-title\"]')),
            removeModalSubHeader: element(by.css('[data-id=\"question-text\"]')),
            removeModalCancelButton: element(by.css('[data-id=\"button-yes\"]')),
            removeModalRemoveButton: element(by.css('[data-id=\"button-no\"]')),
            removeModalCrossButton: element(by.css('[data-id=\"znt-question-yes-no-close-button\"]')),
            removeEmailMessage: element(by.xpath("//span[@class='toast-message']/span")),

    };

    this.addPhone ={

            addPhoneHeaderMobile: element(by.xpath("//div[@class='m-card-form__toolbar']/h1[@data-id='otpphone-title']")),
            addPhoneHeader: element(by.xpath("//div[@class='m-card-form__header']/h1[@data-id='otpphone-title']")),
            addPhoneSubtitle: element(by.xpath("//p[@data-id='otpphone-subtitle']")),
            addPhoneContinueBtn: element(by.xpath("//div[@class='m-card-form__footer']/button/span")),
            addPhoneTextBox: element(by.css('[data-id=\"PhoneNumber\"]')),
            addPhoneLabel: element(by.css('[data-id=\"PhoneNumber-label\"]')),
            addPhonecountryLabel :  element(by.css('[data-id=\"CountryCode-label\"]')),
            addPhoneNumberPlaceholder: element(by.css('[data-id=\"PhoneNumber-placeholder\"]')),
            addPhonegetVerificationCodeLabel: element(by.css('[data-id=\"verificationMethod-label\"]')),
            addPhoneCountryCode: element(by.css('[data-id=\"CountryCode\"]')),
            addPhoneContactOption : function(text) {
                return element(by.cssContainingText('.mat-radio-label-content', text));
            },
    };

    this.removePhone={

            removeButton: element(by.xpath("//ul[@data-id='phones-added']/li[2]/a")),
            removeModalHeader: element(by.css('[data-id=\"question-title\"]')),
            removeModalSubHeader: element(by.css('[data-id=\"question-text\"]')),
            removeModalCancelButton: element(by.css('[data-id=\"button-yes\"]')),
            removeModalRemoveButton: element(by.css('[data-id=\"button-no\"]')),
            removeModalCrossButton: element(by.css('[data-id=\"znt-question-yes-no-close-button\"]')),
            removePhoneMessage: element(by.xpath("//span[@class='toast-message']/span")),

    };

    this.settings = {

            settingsElement: element(by.css('[data-id=\"account-menu-settings\"]')),
            settingsHeader: element(by.css('[data-id=\"settings-title-header\"]')),
            settingsHeaderMobile: element(by.css('[data-id=\"settings-title-toolbar\"]')),
            passwordIcon: element(by.xpath("//div[@class='type password']/div/div[1]")),
            titles: function(text) {
                return element(by.cssContainingText('[data-id=\"second-factor-title\"]', text));
            },
            pinIcon: element(by.xpath("//div[@class='type pin']/div/div[1]")),
            languageIcon: element(by.xpath("//div[@class='type language']/div/div[1]")),
            helpLink: element(by.css('[data-id=\"settings-help-button\"]')),
            helpLinkClose: element(by.css('[data-id=\"settings-help-close-button\"]')),
            helpLinkContent: element(by.xpath("//h2[contains(text(),'settings-help')]")),
            passwordChange: element(by.xpath("//div[@class='type password']/div[2]/button")),
            pinChange: element(by.xpath("//div[@class='type pin']/div[2]/button")),
            languageChange: element(by.xpath("//div[@class='type language']/div[2]/button")),
            backBtn: element(by.css('[data-id=\"settings-back-button\"]')),

    };

    this.changePassword ={

            changeButton: element(by.css('[data-id=\"second-factor-button\"]')),
            headerWeb: element(by.xpath("//div[@class='m-card-form__header']/h1[@data-id='changePassword-title']")),
            headerMobile: element(by.xpath("//div[@class='m-card-form__toolbar']/h1[@data-id='changePassword-title']")),
            helpButton: element(by.css('[data-id=\"changePassword-help-button\"]')),
            helpCloseButton: element(by.css('[data-id=\"changePassword-help-close-button\"]')),
            helpContent: element(by.xpath("//h2[contains(text(),'changePassword-help')]")),
            currenPasswordLabel: element(by.xpath(".//*[@id='existingValue']/div/label")),
            currentPasswordPlaceholder: element(by.css('[data-id=\"existingValue-placeholder\"]')),
            currentPasswordTextBox: element(by.css('[data-id=\"existingValue\"]')),
            newPasswordLabel: element(by.xpath(".//*[@id='value']/div/label")),
            newPasswordPlaceholder: element(by.css('[data-id=\"value-placeholder\"]')),
            newPasswordTextBox:element(by.css('[data-id=\"value\"]')),
            confirmaPasswordLabel: element(by.xpath(".//*[@id='confirmPassword']/div/label")),
            confirmPasswordPlaceholder: element(by.css('[data-id=\"confirmPassword-placeholder\"]')),
            confirmPasswordTextBox: element(by.css('[data-id=\"confirmPassword\"]')),
            changePasswordButton: element(by.xpath("//div[@class='m-card-form__footer']/button[@data-id='changePassword-submit-button']/span[@class='mat-button-wrapper']")),
            changePasswordMessage: element(by.xpath("//span[@class='toast-message']/span")),
    };
};

module.exports = new myAccountPage();