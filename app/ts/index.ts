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

let clickHelp = document.getElementById("last-helps");




$(document).ready(function () {
    document.getElementById('mostra-daily').click();
    document.getElementById('mostra-help').click();


   
    clickHelp.addEventListener("click", function (event: Event) {
        let temp = (<HTMLElement>event.target).parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild;
        let idHelpCenter = (temp.querySelector('.card .card-body #idHelp').textContent);
        console.log(idHelpCenter);
    
    })

    //clickHelp.addEventListener('click', homeController.clickHelpASK.bind(homeController));

});

