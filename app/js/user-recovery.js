System.register(["./controllers/PasswordRecoveryController", "./utils/userData", "./controllers/HomeController"], function (exports_1, context_1) {
    "use strict";
    var PasswordRecoveryController_1, userData_1, HomeController_1, userData, homeController, changePassword;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PasswordRecoveryController_1_1) {
                PasswordRecoveryController_1 = PasswordRecoveryController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            },
            function (HomeController_1_1) {
                HomeController_1 = HomeController_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            homeController = new HomeController_1.HomeController();
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
