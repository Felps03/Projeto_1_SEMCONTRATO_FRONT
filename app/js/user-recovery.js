import { PasswordRecoveryController } from './controllers/PasswordRecoveryController';
document.addEventListener("DOMContentLoaded", function (event) {
    if (!localStorage.getItem('tkn')) {
        window.location.href = "index.html";
    }
});
let changePassword = document.getElementById("recoverycodeT");
if (changePassword) {
    const passwordRecoveryController = new PasswordRecoveryController();
    changePassword.addEventListener('click', passwordRecoveryController.changePassword.bind(passwordRecoveryController));
}
