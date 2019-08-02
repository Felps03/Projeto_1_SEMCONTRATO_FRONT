import { UserController } from "./controllers/UserController";
import { getUser } from "./utils/userData";
import { HomeController } from "./controllers/HomeController";

import { ConfigurationService } from "./services/ConfigurationService";

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
if (!localStorage.getItem('tkn')) { window.location.href = "index.html"; }

let homeController = new HomeController();

let update = document.getElementById("user-edit");
if (update) {
    const userController = new UserController();
    update.addEventListener('submit', userController.update.bind(userController))
}

let passwordChange = document.getElementById("passwordChange");
if (passwordChange) {
    const userController = new UserController();
    passwordChange.addEventListener('change', userController.disablePasswordInput.bind(userController));
}

let userController = new UserController().getUserData();

if(localStorage.getItem('isAdmin')) {
    $("#recaptcha").show()
}else {
    $("#recaptcha").hide()
}

let configurationService = new ConfigurationService();
configurationService.listAll()
    .then(res => res.json())
    .then(res => {
        if(res.recaptcha) {           
            $('#recaptchaChange').prop("checked", true);
        }
    })
    .catch(err => {
        console.log(err);
    })



