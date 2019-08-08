import { HelpCenterGOBController } from "./controllers/HelpCenterGOBController";
import { HelpCenterAskController } from "./controllers/HelpCenterAskController";
import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

const controller = new HelpCenterGOBController();

const url = new URLSearchParams(location.search);
if (url.get('page')) {
    controller.CurrentPage = +url.get('page');
}
if (url.get('q')) {
    controller.CurrentSearch = url.get('q')
}

let mostraHelp = document.getElementById("mostra-help");

if (!url.get('q')) {
    mostraHelp.addEventListener('click', controller.list.bind(controller));
} else {
    mostraHelp.addEventListener('click', controller.findByJoker.bind(controller));
}

let m = document.getElementById('user-main');
m.innerHTML = '';

$(document).ready(function () {
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
        m.innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
    }
});

//const searchTitle = document.getElementById('search-joker')
// const searchDesc = document.getElementById('search-desc')

function delay(callback: any, ms: any) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

$('#search-joker').keyup(delay((e: Event) => {
    controller.findByJoker.bind(controller)(e)
}, 500));
// if (searchDesc)
//     searchDesc.addEventListener('change', controller.findByDesc.bind(controller))
