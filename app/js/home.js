import { HomeController } from "./controllers/HomeController";
import { getUserData } from "./utils/userData";
let homeController = new HomeController();
let userData = getUserData();
let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');
console.log(userData);
window.addEventListener('load', homeController.listLastHelp.bind(homeController));
window.addEventListener('load', homeController.listDailyDate.bind(homeController));
