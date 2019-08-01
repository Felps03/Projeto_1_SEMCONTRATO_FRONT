import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUser } from "./utils/userData";
import { AuthenticateController } from "./controllers/AuthenticateController";
import { ChatBotController } from "./controllers/ChatBotController";
import { PasswordRecoveryController } from "./controllers/PasswordRecoveryController";

import { ConfigurationService } from "./services/ConfigurationService";

declare const grecaptcha: any;


let userData = getUser();

let homeController = new HomeController();
let chatBotController = new ChatBotController();

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
let captcha: any;
configurationService.listAll()
    .then(res => {
        // console.log(res);
        return res.json()
    })
    .then(res => {
        // console.log("res: ", res);
        // console.log("res.recaptcha: ", res.recaptcha);
        captcha = res.recaptcha;
        if (res.recaptcha) $("#recaptcha").show()
        else $("#recaptcha").hide();
        // console.log(res.captcha);

        // console.log('captcha: ', captcha);
        return res.captcha;
    })
    .catch(err => {
        console.log(err);
    });


// export function to get configuration to another controllers    
export function getCaptchaConfig() {
    // console.log(captcha);
    return captcha
}
// getCaptchaConfig();

// export captcha;
