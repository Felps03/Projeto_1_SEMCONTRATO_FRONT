import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUser } from "./utils/userData";
import { AuthenticateController } from "./controllers/AuthenticateController";
import { ChatBotController } from "./controllers/ChatBotController";

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
    //authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticateController));

    authenticate.addEventListener('submit', (event: Event) => {
        event.preventDefault()
        console.log('oi');
        grecaptcha.ready(function () {
            grecaptcha.execute('6LfhNKsUAAAAALAOqOT02K16qCAaFAb7G0Lih859', { action: 'user_login' }).then(function (token: string) {
                console.log(token);
            })
        })
    })

    
//6LfhNKsUAAAAALAOqOT02K16qCAaFAb7G0Lih859








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