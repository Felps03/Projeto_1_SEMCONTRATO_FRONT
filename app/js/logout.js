System.register(["./controllers/AuthenticateController"], function (exports_1, context_1) {
    "use strict";
    var AuthenticateController_1, controller, a;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (AuthenticateController_1_1) {
                AuthenticateController_1 = AuthenticateController_1_1;
            }
        ],
        execute: function () {
            controller = new AuthenticateController_1.AuthenticateController();
            window.document;
            a = document.querySelector('#user-menu-login-link #b #c #logout');
            $('#user-menu-login-link #b #c #logout').ready(function () {
                console.log($('#user-menu-login-link #b #c #logout')[0]);
                $('#user-menu-login-link #b #c #logout').click(function () {
                    console.log("oi");
                });
            });
        }
    };
});
