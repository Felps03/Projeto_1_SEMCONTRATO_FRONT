System.register(["./controllers/PasswordRecoveryController"], function (exports_1, context_1) {
    "use strict";
    var PasswordRecoveryController_1, changePassword;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PasswordRecoveryController_1_1) {
                PasswordRecoveryController_1 = PasswordRecoveryController_1_1;
            }
        ],
        execute: function () {
            document.addEventListener("DOMContentLoaded", function (event) {
                if (localStorage.getItem('tkn')) {
                    window.location.href = "index.html";
                }
            });
            changePassword = document.getElementById("recoverycodeT");
            if (changePassword) {
                const passwordRecoveryController = new PasswordRecoveryController_1.PasswordRecoveryController();
                changePassword.addEventListener('click', passwordRecoveryController.changePassword.bind(passwordRecoveryController));
            }
        }
    };
});
