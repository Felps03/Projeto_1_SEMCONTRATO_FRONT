System.register(["./controllers/UserController"], function (exports_1, context_1) {
    "use strict";
    var UserController_1, controller, teste;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (UserController_1_1) {
                UserController_1 = UserController_1_1;
            }
        ],
        execute: function () {
            controller = new UserController_1.UserController();
            teste = document.querySelector('.form');
            if (teste != null) {
                teste.addEventListener('submit', controller.add.bind(controller));
            }
        }
    };
});
