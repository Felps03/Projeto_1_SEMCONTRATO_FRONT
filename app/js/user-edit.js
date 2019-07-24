System.register(["./controllers/UserController", "./utils/userData", "./controllers/HomeController"], function (exports_1, context_1) {
    "use strict";
    var UserController_1, userData_1, HomeController_1, userData, homeController, update, passwordChange, userController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (UserController_1_1) {
                UserController_1 = UserController_1_1;
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
                document.getElementById('user-main').innerHTML = `<a href="index.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            homeController = new HomeController_1.HomeController();
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
