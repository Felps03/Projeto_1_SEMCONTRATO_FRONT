import { UserController } from "./controllers/UserController";
import { getUser } from "./utils/userData";
import { HomeController } from "./controllers/HomeController";

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="index.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

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



