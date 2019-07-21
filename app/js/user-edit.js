System.register(["./controllers/UserController"], function (exports_1, context_1) {
    "use strict";
    var UserController_1, update, passwordChange, userController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (UserController_1_1) {
                UserController_1 = UserController_1_1;
            }
        ],
        execute: function () {
            update = document.getElementById("user-edit");
            if (update) {
                const userController = new UserController_1.UserController();
                update.addEventListener('submit', userController.update.bind(userController));
            }
            passwordChange = document.getElementById("passwordChange");
            if (passwordChange) {
                const userController = new UserController_1.UserController();
                passwordChange.addEventListener('change', userController.disablePasswordInput.bind(userController));
            }
            userController = new UserController_1.UserController().getUserData();
        }
    };
});
