import { HelpCenterController } from "./controllers/HelpCenterController";
import { HelpCenterAskController } from "./controllers/HelpCenterAskController";
import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";
import { clean } from "./helpers/index";
import { checkLoggedIn } from "./helpers/chatbot/chatBotProcess";

let userData = getUser();
//if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

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

let cancelar = document.querySelector("#cancel");
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

let buttonAddHC = <HTMLInputElement>document.getElementById("help-add-ocult");

console.log(localStorage.getItem('email'))

if (localStorage.getItem('email') == null) {
    console.log("älsjfalf")
    buttonAddHC.innerHTML = ``;
} else {
    console.log(buttonAddHC)
    buttonAddHC.innerHTML = `<label for="search-joker">Deseja perguntar algo?</label>
                            <button type="button" name="new_help"
                                class="btn btn-sm btn-outline-success btn-block float-right input-circle"
                                data-toggle="modal" data-toggle="modal" data-target="#add-modal">
                                <i class="small material-icons mr-2 align-middle custom-icon-margin">help</i>
                                Perguntar
                            </button>`;
}

$(document).ready(() => {
    setTimeout(() => {
        let logout = document.getElementById("logout");
        if (logout) logout.addEventListener('click', controller.logout.bind(controller));
    }, 1000);


});

//Responsive
if (window.innerWidth <= 576) {
    document.getElementById('cancel').classList.add('btn-block');
    document.getElementById('cadastroHelpCenter').classList.add('btn-block');
    document.getElementById('help-add-ocult').classList.remove('mt-3');
}
