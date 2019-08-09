System.register(["./controllers/UserController", "./utils/userData", "./services/ConfigurationService"], function (exports_1, context_1) {
    "use strict";
    var UserController_1, userData_1, ConfigurationService_1, userData, cadastrar, configurationService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (UserController_1_1) {
                UserController_1 = UserController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            },
            function (ConfigurationService_1_1) {
                ConfigurationService_1 = ConfigurationService_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            if (localStorage.getItem('tkn')) {
                window.location.href = "index.html";
            }
            cadastrar = document.querySelector('#user-register');
            if (cadastrar) {
                const userController = new UserController_1.UserController();
                cadastrar.addEventListener('submit', userController.add.bind(userController));
            }
            configurationService = new ConfigurationService_1.ConfigurationService();
            configurationService.listAll()
                .then(res => res.json())
                .then(res => {
                console.log(res);
                if (res.recaptcha)
                    $("#recaptcha").show();
                else
                    $("#recaptcha").hide();
            })
                .catch(err => {
                console.log(err);
            });
            if (window.innerWidth <= 576) {
                document.getElementById('closing').classList.add('btn-block');
                document.getElementById('canc').classList.add('btn-block');
                document.getElementById('edit-user').classList.add('btn-block');
                document.getElementById('cancelRegister').classList.add('btn-block');
                document.getElementById('cancelRegister').classList.add('mb-n4');
            }
        }
    };
});
