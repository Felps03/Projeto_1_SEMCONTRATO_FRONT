System.register(["../services/ConfigurationService"], function (exports_1, context_1) {
    "use strict";
    var ConfigurationService_1, configurationService, captcha;
    var __moduleName = context_1 && context_1.id;
    function getCaptchaConfig() {
        return captcha;
    }
    exports_1("getCaptchaConfig", getCaptchaConfig);
    return {
        setters: [
            function (ConfigurationService_1_1) {
                ConfigurationService_1 = ConfigurationService_1_1;
            }
        ],
        execute: function () {
            configurationService = new ConfigurationService_1.ConfigurationService();
            configurationService.listAll()
                .then(res => {
                return res.json();
            })
                .then(res => {
                captcha = res.recaptcha;
                return res.captcha;
            })
                .catch(err => {
                console.log(err);
            });
        }
    };
});
