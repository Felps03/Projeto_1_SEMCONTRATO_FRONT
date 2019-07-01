import { AuthenticateController } from "./controllers/AuthenticateController";
import { UserController } from "./controllers/UserController";
import { DailyNoteController } from "./controllers/DailyNoteController";
let authenticate = document.querySelector('#login-form');
if (authenticate) {
    const authenticateController = new AuthenticateController();
    authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticateController));
}
let cadastrar = document.querySelector('#user-register');
if (cadastrar) {
    const userController = new UserController();
    cadastrar.addEventListener('submit', userController.add.bind(userController));
}
let recuperarEmail = document.querySelector('#recovery-pass-form');
if (recuperarEmail != null) {
    const authenticateController = new AuthenticateController();
    recuperarEmail.addEventListener('submit', authenticateController.changePassword.bind(authenticate));
}
let addDailyNote = document.querySelector('#daily-form');
if (addDailyNote) {
    const dailyNoteController = new DailyNoteController();
    addDailyNote.addEventListener('submit', dailyNoteController.add.bind(dailyNoteController));
}
