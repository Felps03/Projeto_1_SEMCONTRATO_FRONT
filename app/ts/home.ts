import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";
import { HelpCenterController } from "./controllers/HelpCenterController";
import { DailyNoteController } from "./controllers/DailyNoteController";
import { getUserData } from "./utils/userData";

let homeController = new HomeController();

let userData = getUserData();

let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');

console.log(userData);
// if (nameSpan != null) {
//     nameSpan.textContent = userData.;  
// }
// if (userNameSpan != null) {
//     userNameSpan.textContent = `(${userData})`;   
// }

window.addEventListener('load', homeController.listLastHelp.bind(homeController));
window.addEventListener('load', homeController.listDailyDate.bind(homeController)); 