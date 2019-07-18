System.register(["./controllers/AuthenticateController"], function (exports_1, context_1) {
    "use strict";
    var AuthenticateController_1, controllerAuth;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (AuthenticateController_1_1) {
                AuthenticateController_1 = AuthenticateController_1_1;
            }
        ],
        execute: function () {
            $(document).ready(function () {
                if (localStorage.getItem('tkn')) {
                    window.location.href = "home.html";
                }
            });
            controllerAuth = new AuthenticateController_1.AuthenticateController();
            $('#login-form').submit(controllerAuth.authenticate.bind(controllerAuth));
            $('#recovery-pass-form').submit(controllerAuth.resetPassword.bind(controllerAuth));
        }
    };
});
