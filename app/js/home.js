System.register(["./controllers/HomeController", "./controllers/DailyNoteController", "./utils/userData", "./controllers/AuthenticateController", "./controllers/ChatBotController", "./services/ConfigurationService"], function (exports_1, context_1) {
    "use strict";
    var HomeController_1, DailyNoteController_1, userData_1, AuthenticateController_1, ChatBotController_1, ConfigurationService_1, userData, homeController, chatBotController, authenticate, addDailyNote, recoveryPasswordCancel, configurationService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HomeController_1_1) {
                HomeController_1 = HomeController_1_1;
            },
            function (DailyNoteController_1_1) {
                DailyNoteController_1 = DailyNoteController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            },
            function (AuthenticateController_1_1) {
                AuthenticateController_1 = AuthenticateController_1_1;
            },
            function (ChatBotController_1_1) {
                ChatBotController_1 = ChatBotController_1_1;
            },
            function (ConfigurationService_1_1) {
                ConfigurationService_1 = ConfigurationService_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            homeController = new HomeController_1.HomeController();
            chatBotController = new ChatBotController_1.ChatBotController();
            if (localStorage.getItem('tkn')) {
                window.location.href = "index.html";
            }
            authenticate = document.querySelector('#login-form');
            if (authenticate) {
                const authenticateController = new AuthenticateController_1.AuthenticateController();
                authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticateController));
                let recuperarEmail = document.querySelector('#recovery-pass-form');
                if (recuperarEmail) {
                    recuperarEmail.addEventListener('submit', authenticateController.resetPassword.bind(authenticateController));
                }
            }
            addDailyNote = document.querySelector('#daily-form');
            if (addDailyNote) {
                const dailyNoteController = new DailyNoteController_1.DailyNoteController();
                addDailyNote.addEventListener('submit', dailyNoteController.add.bind(dailyNoteController));
            }
            recoveryPasswordCancel = document.querySelector('#recoveryPasswordCancel');
            if (recoveryPasswordCancel) {
                let homeController = new HomeController_1.HomeController();
                recoveryPasswordCancel.addEventListener('click', homeController.cancel.bind(homeController));
            }
            configurationService = new ConfigurationService_1.ConfigurationService();
            configurationService.listAll()
                .then(res => res.json())
                .then(res => {
                if (res.recaptcha)
                    $("#recaptcha").show();
                else
                    $("#recaptcha").hide();
            })
                .catch(err => {
                console.log(err);
            });
        }
    };
});
