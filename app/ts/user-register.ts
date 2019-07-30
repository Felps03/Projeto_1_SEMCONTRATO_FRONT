import { UserController } from "./controllers/UserController";
import { getUser } from "./utils/userData";
import { HomeController } from "./controllers/HomeController";

import { ConfigurationService } from "./services/ConfigurationService";

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

document.addEventListener("DOMContentLoaded", function (event) {
    if (localStorage.getItem('tkn')) {
        window.location.href = "home.html";
    }
});

let cadastrar = document.querySelector('#user-register');
if (cadastrar) {
    const userController = new UserController();
    cadastrar.addEventListener('submit', userController.add.bind(userController));
}

let configurationService = new ConfigurationService();
configurationService.listAll()
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.recaptcha) $("#recaptcha").show()
        else $("#recaptcha").hide()
    })
    .catch(err => {
        console.log(err);
    })