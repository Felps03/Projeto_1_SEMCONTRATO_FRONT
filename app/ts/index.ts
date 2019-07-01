import { AuthenticateController } from "./controllers/AuthenticateController";
import { UserController } from "./controllers/UserController";
import { DailyNoteController } from "./controllers/DailyNoteController";

const authenticateController = new AuthenticateController();
const userController = new UserController();
const dailyNoteController = new DailyNoteController();

let authenticate = document.querySelector('#login-form');
if (authenticate) {
    authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticateController));
}

let cadastrar = document.querySelector('#user-register');
if (cadastrar) {
    cadastrar.addEventListener('submit', userController.add.bind(userController));
}

let recuperarEmail = document.querySelector('#recovery-pass-form');
if (recuperarEmail != null) {
    recuperarEmail.addEventListener('submit', authenticateController.changePassword.bind(authenticate));
}

let addDailyNote = document.querySelector('#daily-form');
if (addDailyNote) {
    addDailyNote.addEventListener('submit', dailyNoteController.add.bind(dailyNoteController));
}
