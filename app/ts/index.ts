import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUser } from "./utils/userData";
import { AuthenticateController } from "./controllers/AuthenticateController";
import { ChatBotController } from "./controllers/ChatBotController";

let userData = getUser();
let homeController = new HomeController();
let chatBotController = new ChatBotController();

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

let mostraDaily = document.getElementById("mostra-daily");
let mostraHelp = document.getElementById("mostra-help");

mostraDaily.addEventListener('click', homeController.listDailyDate.bind(homeController));
mostraHelp.addEventListener('click', homeController.listLastHelp.bind(homeController));

let clickHelp = document.getElementById("last-helps");

clickHelp.addEventListener('click', homeController.clickHelpASK.bind(homeController));

$(document).ready(function () {
    document.getElementById('mostra-daily').click();
    document.getElementById('mostra-help').click();

});

