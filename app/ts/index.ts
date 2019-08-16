import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUser } from "./utils/userData";
import { AuthenticateController } from "./controllers/AuthenticateController";

let userData = getUser();
let homeController = new HomeController();
let mostraDaily = document.getElementById("mostra-daily");
let mostraHelp = document.getElementById("mostra-help");

if (mostraDaily)
    mostraDaily.addEventListener('click', homeController.listDailyDate.bind(homeController));

if (mostraHelp)
    mostraHelp.addEventListener('click', homeController.listLastHelp.bind(homeController));

let clickHelp = document.getElementById("last-helps");

// clickHelp.addEventListener('click', homeController.clickHelpASK.bind(homeController));

$(document).ready(function () {

    if (mostraDaily)
        mostraDaily.click();

    if (mostraHelp)
        mostraHelp.click();

    setTimeout(() => {
        let logout = document.getElementById("logout");
        if (logout) logout.addEventListener('click', homeController.logout.bind(homeController));
    }, 1000);

});