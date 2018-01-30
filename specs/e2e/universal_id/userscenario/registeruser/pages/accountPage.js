'use strict';
/* globals module, element, by , xpath*/
var accountPage = function() {

    this.account = {
            icon:  element(by.css('[data-id=\"account-icon\"]')),
            accountSubTitle:  element(by.css('[data-id=\"account-subtitle\"]')),
            accountTitle : element(by.xpath("//div[@class='m-card__header__content__row']/h1[@data-id='account-title']")),
            continueBtn :  element(by.css('[data-id=\"account-button\"]')),
            stepVerificationLabel :  element(by.css('[data-id=\"security-select-title\"]')), //data-id="security-select-subtitle"
            subTitleText :  element(by.css('[data-id=\"security-select-subtitle\"]')),
            registerPhoneLink :  element(by.css('[data-id=\"register-phone\"]')),
            registerEmailLink :  element(by.css('[data-id=\"register-email\"]')),
            registerTokenLink :  element(by.css('[data-id=\"register-token\"]')),
            pageHeader : element(by.css('[data-id=\"security-select-title-header\"]')),
            pageHeaderMobile : element(by.css('[data-id=\"security-select-title-toolbar\"]')),
            helpLink : element(by.css('[data-id=\"account-help-button\"]')),
            helpLinkClose : element(by.css('[data-id=\"account-help-close-button\"]')),
            helpLinkContent : element(by.xpath("//h2[contains(text(),'account-help')]")),
            backbtn : element(by.xpath("//h2[contains(text(),'account-help')]")),

    };

    this.selectionPage = {

            helpLink : element(by.css('[data-id=\"security-select-help-button\"]')),
            helpLinkClose : element(by.css('[data-id=\"security-select-help-close-button\"]')),
            helpLinkContent : element(by.xpath("//h2[contains(text(),'security-select-help')]")),
            backbtn : element(by.css('[data-id=\"security-select-back-button\"]')),
    };


    this.registerPhone = {

            phoneNumberEditBox :  element(by.css('[data-id=\"PhoneNumber\"]')),
            phoneNumberError :  element(by.css('[data-id=\"PhoneNumber-message\"]')),
            continueBtn :  element(by.css('[data-id=\"otpphone-submit-button\"]')),
            backBtn :  element(by.css('[data-id=\"otpphone-back-button\"]')),
            phoneTitleLabel : element(by.xpath("//div[@class='m-card-form__header']//h1[@data-id='otpphone-title']")),
            phoneTitleLabelMobile: element(by.xpath("//div[@class='m-card-form__toolbar']//h1[@data-id='otpphone-title']")),
            phoneTitleLabelSubText :  element(by.css('[data-id=\"otpphone-subtitle\"]')),  //data-id="otpphone-title"
            getCodeOptionText :  element(by.css('[data-id=\"verificationMethod-label\"]')),
            radioBtn :  element(by.css('[name=\"verificationMethod\"]')),

            contactOption : function(text) {
                return element(by.cssContainingText('.mat-radio-label-content', text));
            },

            helpLink : element(by.css('[data-id=\"otpphone-help-button\"]')),
            helpLinkClose : element(by.css('[data-id=\"otpphone-help-close-button\"]')),
            helpLinkContent : element(by.xpath("//h2[contains(text(),'otpphone-help')]")),
            countryLabel :  element(by.css('[data-id=\"CountryCode-label\"]')),
            phoneNumberLabel: element(by.css('[data-id=\"PhoneNumber-label\"]')),
            phoneNumberPlaceholder: element(by.css('[data-id=\"PhoneNumber-placeholder\"]')),
            getVerificationCodeLabel: element(by.css('[data-id=\"verificationMethod-label\"]')),
            countryCode: element(by.css('[data-id=\"CountryCode\"]')),
            countryCodeError: element(by.css('[data-id=\"CountryCode-message\"]'))


    };

    this.verifyPhone = {
            verifyCodeBox :  element(by.css('.m-verify-code__user')),
            reSendMsg :  element(by.css('[data-id=\"message-resend\"]')),
            verifyPhoneHeaderLabel :  element(by.css('[data-id=\"verify-code-title\"]')),
            continueBtn :  element(by.css('[data-id=\"verify-code-submit-button\"]')),
            codeEditBox : element.all(by.css('.m-verify-code__item')),
            verifyCodeHeaderWeb : element(by.xpath("//div[@class='m-card-form__header']/h1")),
            verifyCodeHeaderMob : element(by.xpath("//div[@class='m-card-form__toolbar']/h1"))
    };

    this.registerEmail = {
            emailEditBox : element(by.css('[data-id=\"Email\"]')),
            emailBackBtn : element(by.css('[data-id=\"otpemail-back-button\"]')),
            emailPageTitle : element(by.xpath("//div[@class='m-card-form__header']//h1[@data-id='otpemail-title']")),
            emailPageTitleMobile : element(by.xpath("//div[@class='m-card-form__toolbar']//h1[@data-id='otpemail-title']")),
            emailPageSubtitle : element(by.xpath("//p[@data-id='optemail-subtitle']")),
            emailError: element(by.css('[data-id=\"Email-message\"]')),
            emailContinueBtn: element(by.css('[data-id=\"otpemail-submit-button\"]')),
            verifyEmailHeaderLabel: element(by.css('[data-id=\"verify-code-title\"]')),
            verifyEmailHeaderSubTitleText : element(by.css('[data-id=\"message-subtitle\"]')),
            helpLink : element(by.css('[data-id=\"otpemail-help-button\"]')),
            helpLinkClose : element(by.css('[data-id=\"otpemail-help-close-button\"]')),
            helpLinkContent : element(by.xpath("//h2[contains(text(),'otpemail-help')]")),
            backbtn : element(by.css('[data-id=\"otpemail-back-button\"]')),
            emailPlaceholder : element(by.css('[data-id=\"Email-placeholder\"]')),
            emailLabel: element(by.css('[data-id=\"Email-label\"]')),
            waterMarkEmail : element(by.css('[data-id=\"Email-placeholder\"]')),
            verifyCodeHeaderWeb : element(by.xpath("//div[@class='m-card-form__header']/h1")),
            verifyCodeHeaderMob : element(by.xpath("//div[@class='m-card-form__toolbar']/h1")),

    };

    this.registerToken = {

            subTitleText : element(by.css('[data-id="message-subtitle"]'))

    };

    this.confirmCode={

            codeInput : function(index) {
                return element(by.css("[data-id=\"code-entry-"+ index + "\"]"));
            },
            VerifyCodeBtn: element(by.xpath("//div[@class='m-card-form__footer']/button/span")),
            codeError: element(by.css('[data-id=\"message-error\"]')),
            codeErrorAccLock : element(by.css('[data-id=\"message-locked\"]')),
            nocode : element(by.css('[data-id=\"message-resend\"]')),
            codeSuccess : element(by.css('[data-id=\"message-success\"]')),
            backBtn: element(by.css('[data-id=\"verify-code-back-button\"]')),
            helpLink : element(by.css('[data-id=\"verify-code-help-button\"]')),
            helpLinkClose : element(by.css('[data-id=\"verify-code-help-close-button\"]')),
            helpLinkContent : element(by.xpath("//h2[contains(text(),'verify-code-help')]")),
            verifyCodeHeaderWeb : element(by.xpath("//div[@class='m-card-form__header']/h1[@data-id='verify-code-title-header']")),
            verifyCodeHeaderMob : element(by.xpath("//div[@class='m-card-form__toolbar']/h1[@data-id='verify-code-title-toolbar']")),
            resendOTP : element(by.xpath("//p[@data-id='message-resend']/a")),
            enterOTP : function (value){
                var codex = value;
                for (var i = 0; i < codex.length; i++)  {
                    browser.driver.actions().mouseMove(this.codeInput(i)).click().sendKeys(codex[i]).perform();
                    console.log("code:"+codex[i]);
                    browser.sleep(1000);
                }
            }
    };
};

module.exports = new accountPage();
