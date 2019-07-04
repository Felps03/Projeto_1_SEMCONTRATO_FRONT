import { AuthenticateController } from "./controllers/AuthenticateController";
import { UserController } from "./controllers/UserController";
import { DailyNoteController } from "./controllers/DailyNoteController";


let authenticate = document.querySelector('#login-form');
if (authenticate) {
    const authenticateController = new AuthenticateController();
    authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticateController));

    let recuperarEmail = document.querySelector('#recovery-pass-form');
    if (recuperarEmail) {
        recuperarEmail.addEventListener('submit', authenticateController.resetPassword.bind(authenticate));
    }
}
//foi movido para user-register
// let cadastrar = document.querySelector('#user-register');
// if (cadastrar) {
//     const userController = new UserController();
//     cadastrar.addEventListener('submit', userController.add.bind(userController));
// }

let addDailyNote = document.querySelector('#daily-form');
if (addDailyNote) {
    const dailyNoteController = new DailyNoteController();
    addDailyNote.addEventListener('submit', dailyNoteController.add.bind(dailyNoteController));
}
