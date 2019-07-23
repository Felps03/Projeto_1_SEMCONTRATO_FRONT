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

let mostraDaily = document.getElementById("mostra-daily");
let mostraHelp = document.getElementById("mostra-help");

mostraDaily.addEventListener('click', homeController.listDailyDate.bind(homeController));
mostraHelp.addEventListener('click', homeController.listLastHelp.bind(homeController));

$(document).ready(function() {
    document.getElementById('mostra-daily').click();
    document.getElementById('mostra-help').click();
});