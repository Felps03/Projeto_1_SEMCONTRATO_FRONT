import { AuthenticateController } from './controllers/AuthenticateController';

$(document).ready(function () {
    if (localStorage.getItem('tkn')) {
        window.location.href = "home.html";
    }
});

const controllerAuth = new AuthenticateController();
$('#login-form').submit(controllerAuth.authenticate.bind(controllerAuth));
$('#recovery-pass-form').submit(controllerAuth.resetPassword.bind(controllerAuth));