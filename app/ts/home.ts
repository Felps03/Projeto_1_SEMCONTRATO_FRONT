import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";

let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');

let homeController = new HomeController();

const data = homeController.getUserData();

if (data) {
    data.then(data => {
        if (nameSpan != null) {
            nameSpan.textContent = data.name;
        }
        if (userNameSpan != null) {
            userNameSpan.textContent = `(${data.userName})`;
        }
    })
}
else {
    window.location.href = "index.html"
}

window.addEventListener('load', homeController.listLastHelp.bind(homeController));
window.addEventListener('load', homeController.listDailyDate.bind(homeController)); 