import { PasswordRecoveryController } from './controllers/PasswordRecoveryController';

let changePassword = document.getElementById("recoverycodeT");
if (changePassword) {
    const passwordRecoveryController = new PasswordRecoveryController();
    changePassword.addEventListener('click', passwordRecoveryController.changePassword.bind(passwordRecoveryController))
}