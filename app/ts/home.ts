import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUser } from "./utils/userData";
import { AuthenticateController } from "./controllers/AuthenticateController";
import { PasswordRecoveryController } from "./controllers/PasswordRecoveryController";

import { ConfigurationService } from "./services/ConfigurationService";

declare const grecaptcha: any;


let userData = getUser();

let homeController = new HomeController();
if (localStorage.getItem('tkn')) {
    window.location.href = "index.html";
}

let authenticate = document.querySelector('#login-form');
if (authenticate) {
    const authenticateController = new AuthenticateController();
    authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticateController));

    let recuperarEmail = document.querySelector('#recovery-pass-form');
    if (recuperarEmail) {
        recuperarEmail.addEventListener('submit', authenticateController.resetPassword.bind(authenticateController));
    }
}

let addDailyNote = document.querySelector('#daily-form');
if (addDailyNote) {
    const dailyNoteController = new DailyNoteController();
    addDailyNote.addEventListener('submit', dailyNoteController.add.bind(dailyNoteController));
}

let recoveryPasswordCancel = document.querySelector('#recoveryPasswordCancel');
if (recoveryPasswordCancel) {
    let homeController = new HomeController();
    recoveryPasswordCancel.addEventListener('click', homeController.cancel.bind(homeController));
}
let configurationService = new ConfigurationService();
configurationService.listAll()
    .then(res => res.json())
    .then(res => {
        if (res.recaptcha) $("#recaptcha").show()
        else $("#recaptcha").hide()
    })
    .catch(err => {
        console.log(err);
    })


