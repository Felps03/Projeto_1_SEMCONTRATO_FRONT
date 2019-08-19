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

mostraDaily.addEventListener('click', homeController.listDailyDate.bind(homeController));
mostraHelp.addEventListener('click', homeController.listLastHelp.bind(homeController));

let clickHelp = document.getElementById("last-helps");

// clickHelp.addEventListener('click', homeController.clickHelpASK.bind(homeController));

// })
$(document).ready(function () {
    document.getElementById('mostra-daily').click();
    document.getElementById('mostra-help').click();

    setTimeout(() => {
        let logout = document.getElementById("logout");
        if (logout) logout.addEventListener('click', homeController.logout.bind(homeController));
    }, 1000);

});