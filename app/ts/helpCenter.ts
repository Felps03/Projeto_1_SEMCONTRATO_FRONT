import { HelpCenterController } from "./controllers/HelpCenterController";
import { HelpCenterAskController } from "./controllers/HelpCenterAskController";
import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";
import { clean } from "./helpers/index";

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

const controller = new HelpCenterController();

const url = new URLSearchParams(location.search);
if (url.get('page')) {
    controller.CurrentPage = +url.get('page');
}

let mostraHelp = document.getElementById("mostra-help");

mostraHelp.addEventListener('click', controller.list.bind(controller));

$(document).ready(function () {
    document.getElementById('mostra-help').click();
});

let cadastrar = document.querySelector("#cadastroHelpCenter");
if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
    cadastrar.addEventListener('click', controller.cancel.bind(controller));
    window.addEventListener('load', controller.list.bind(controller));
}

let cancelar = document.querySelector("#cancelarHelpCenter");
if (cancelar) {
    cancelar.addEventListener('click', controller.cancelar.bind(controller));
}

let cancel = document.getElementById("cancelHelpCenter");;
if (cancel) cancel.addEventListener('click', controller.cancel.bind(controller));
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

$('#search-joker').keyup(delay(controller.findByJoker.bind(controller), 500));
// if (searchDesc)
//     searchDesc.addEventListener('change', controller.findByDesc.bind(controller))
