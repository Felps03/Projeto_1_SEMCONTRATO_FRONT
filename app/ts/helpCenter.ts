import { HelpCenterController } from "./controllers/HelpCenterController";
import { HelpCenterAskController } from "./controllers/HelpCenterAskController";
import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

const controller = new HelpCenterController();
// const homeController = new HomeController();

// check for pagination
const url = new URLSearchParams(location.search);
if (url.get('page')) {
    controller.CurrentPage = +url.get('page');
}

let mostraHelp = document.getElementById("mostra-help");

mostraHelp.addEventListener('click', controller.list.bind(controller));

$(document).ready(function() {
    document.getElementById('mostra-help').click();
});

let cadastrar = document.querySelector("#cadastroHelpCenter");
if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
    window.addEventListener('load', controller.list.bind(controller));
}

function delay(callback: any, ms: any) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, ms || 0);
    };
  }


$('#search-joker').keyup(delay( controller.findByJoker.bind(controller), 500));