System.register(["./controllers/AuthenticateController"], function (exports_1, context_1) {
    "use strict";
    var AuthenticateController_1, controller, logout;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (AuthenticateController_1_1) {
                AuthenticateController_1 = AuthenticateController_1_1;
            }
        ],
        execute: function () {
            controller = new AuthenticateController_1.AuthenticateController();
            logout = document.getElementById('logout');
            if (logout) {
                console.log("chegou na integracao");
                logout.addEventListener('click', controller.logout.bind(controller));
            }
        }
    };
});
