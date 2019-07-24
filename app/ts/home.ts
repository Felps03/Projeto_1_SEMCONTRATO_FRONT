import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUser } from "./utils/userData";
import { AuthenticateController } from "./controllers/AuthenticateController";
import { ChatBotController } from "./controllers/ChatBotController";

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