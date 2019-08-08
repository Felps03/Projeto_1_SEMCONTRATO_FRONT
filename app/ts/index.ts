import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUser } from "./utils/userData";
import { AuthenticateController } from "./controllers/AuthenticateController";

let userData = getUser();
let homeController = new HomeController();

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

let mostraDaily = document.getElementById("mostra-daily");
let mostraHelp = document.getElementById("mostra-help");

mostraDaily.addEventListener('click', homeController.listDailyDate.bind(homeController));
mostraHelp.addEventListener('click', homeController.listLastHelp.bind(homeController));

let clickHelp = document.getElementById("last-helps");

clickHelp.addEventListener('click', homeController.clickHelpASK.bind(homeController));

let m = document.getElementById('user-main');
m.innerHTML = '';


$(document).ready(function () {
    document.getElementById('mostra-daily').click();
    document.getElementById('mostra-help').click();

    if (localStorage.getItem('email')) {
        m.innerHTML =
            `<div class="dropdown ml-n2 txt-user">
                <div class="d-flex align-items-center btn ml-5" data-toggle="dropdown">
                    <span id="nameSpan"></span>
                    <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle"
                        width="60px">
                    <i class="material-icons ml-n2">arrow_drop_down</i>
                </div>
                <div class="dropdown-menu dropdown-menu-right align-user">
                    <div class="dropdown-item">
                        Usuário:
                        <span id="userNameSpan"></span>
                    </div>
                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" href="user-edit.html">
                        <i class="material-icons mr-2">edit</i>Alterar Cadastro</a>
                    <a class="dropdown-item d-flex align-items-center" href="index.html">
                        <i class="material-icons mr-2">home</i>Home</a>

                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" id="logout">
                        <i class="material-icons mr-2">power_settings_new</i>
                        <strong>Sair</strong>
                    </a>
                </div>
            </div>`;
    } else {
        m.innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`; m.innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
    }
});

