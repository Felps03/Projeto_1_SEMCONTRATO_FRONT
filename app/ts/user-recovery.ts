import { PasswordRecoveryController } from './controllers/PasswordRecoveryController';
import { getUser } from './utils/userData';
import { HomeController } from './controllers/HomeController';

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

//document.addEventListener("DOMContentLoaded", function (event) {
if (localStorage.getItem('tkn')) { window.location.href = "index.html"; }

//});

let homeController = new HomeController();

let changePassword = document.getElementById("recoverycodeT");
if (changePassword) {
    const passwordRecoveryController = new PasswordRecoveryController();

    changePassword.addEventListener('click', passwordRecoveryController.changePassword.bind(passwordRecoveryController))
}

