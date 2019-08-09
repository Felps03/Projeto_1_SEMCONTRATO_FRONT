import { DailyNoteController } from './controllers/DailyNoteController';
import { DailyNote } from './models/index';
import { getUser } from './utils/userData';
import { dateFormatYYYYMMDD } from './helpers/dateHelper';

let userData = getUser();
let cadastrar = document.querySelector('#daily-form');
let dailyesResult = document.querySelector('#dayliesResult');
let cancel = document.getElementById("cancel");
let listDate = document.querySelector('#filter');
let showDaylies = document.querySelector('#showDaylies');
const controller = new DailyNoteController();

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
if (listDate && dailyesResult) listDate.addEventListener('click', controller.listDateDaily.bind(controller));
if (cadastrar) cadastrar.addEventListener('submit', controller.registeredDaily.bind(controller));
if (cancel) cancel.addEventListener('click', controller.cancel.bind(controller));
if (showDaylies) showDaylies.addEventListener('click', controller.showAllDailys.bind(controller))

let m = document.getElementById('user-main');
m.innerHTML = '';

$(document).ready(() => {
    document.getElementById('showDaylies').click()

    setTimeout(() => {
        let logout = document.getElementById("logout");
        if (logout) logout.addEventListener('click', controller.logout.bind(controller));
    }, 1000);


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