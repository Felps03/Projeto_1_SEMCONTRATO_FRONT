import { HelpCenterGOBController } from "./controllers/HelpCenterGOBController";
import { HelpCenterAskController } from "./controllers/HelpCenterAskController";
import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";

let userData = getUser();
// if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

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

$(document).ready(function () {
    document.getElementById('mostra-help').click();
    setTimeout(() => {
        let logout = document.getElementById("logout");
        if (logout) logout.addEventListener('click', controller.logout.bind(controller));
    }, 1000);
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
