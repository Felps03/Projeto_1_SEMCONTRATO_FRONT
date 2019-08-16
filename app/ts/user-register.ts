import { UserController } from "./controllers/UserController";
import { getUser } from "./utils/userData";
import { HomeController } from "./controllers/HomeController";

import { ConfigurationService } from "./services/ConfigurationService";

let userData = getUser();

//document.addEventListener("DOMContentLoaded", function (event) {
if (localStorage.getItem('tkn')) { window.location.href = "index.html"; }
//});

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
        if (res.recaptcha) $("#recaptcha").show()
        else $("#recaptcha").hide()
    })
    .catch(err => {
        console.log(err);
    })

//Responsive document.getElementById('cancelEdit').classList.add('btn-block');
if (window.innerWidth <= 576) {
    // document.getElementById('closing').classList.add('btn-block');
    // document.getElementById('canc').classList.add('btn-block');
    document.getElementById('edit-user').classList.add('btn-block');
    // document.getElementById('cancelRegister').classList.add('btn-block');
    // document.getElementById('cancelRegister').classList.add('mb-n4');
}
