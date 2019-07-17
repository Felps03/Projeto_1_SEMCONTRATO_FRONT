import { PasswordRecoveryController } from './controllers/PasswordRecoveryController';
import { getUser } from './utils/userData';
let userData = getUser();
document.addEventListener("DOMContentLoaded", function (event) {
    if (localStorage.getItem('tkn')) {
        window.location.href = "index.html";
    }
});
let changePassword = document.getElementById("recoverycodeT");
if (changePassword) {
    const passwordRecoveryController = new PasswordRecoveryController();
    changePassword.addEventListener('click', passwordRecoveryController.changePassword.bind(passwordRecoveryController));
}
