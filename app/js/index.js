System.register(["./controllers/AuthenticateController", "./controllers/DailyNoteController"], function (exports_1, context_1) {
    "use strict";
    var AuthenticateController_1, DailyNoteController_1, authenticate, addDailyNote;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (AuthenticateController_1_1) {
                AuthenticateController_1 = AuthenticateController_1_1;
            },
            function (DailyNoteController_1_1) {
                DailyNoteController_1 = DailyNoteController_1_1;
            }
        ],
        execute: function () {
            document.addEventListener("DOMContentLoaded", function (event) {
                if (localStorage.getItem('tkn')) {
                    window.location.href = "home.html";
                }
            });
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
        }
    };
});
