System.register(["./controllers/UserController", "./utils/userData", "./controllers/HomeController", "./services/ConfigurationService"], function (exports_1, context_1) {
    "use strict";
    var UserController_1, userData_1, HomeController_1, ConfigurationService_1, userData, recaptchaBox, homeController, update, passwordChange, userController, configurationService;
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
            },
            function (ConfigurationService_1_1) {
                ConfigurationService_1 = ConfigurationService_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            recaptchaBox = document.querySelector('#recaptcha');
            if (localStorage.getItem('isAdmin') == 'true')
                recaptchaBox.hidden = false;
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
            if (localStorage.getItem('isAdmin')) {
                $("#recaptcha").show();
            }
            else {
                $("#recaptcha").hide();
            }
            configurationService = new ConfigurationService_1.ConfigurationService();
            configurationService.listAll()
                .then(res => res.json())
                .then(res => {
                if (res.recaptcha) {
                    $('#recaptchaChange').prop("checked", true);
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
    };
});
