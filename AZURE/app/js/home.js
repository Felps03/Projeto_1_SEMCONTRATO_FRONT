import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";
let userData = getUser();
let homeController = new HomeController();
window.addEventListener('load', homeController.listLastHelp.bind(homeController));
window.addEventListener('load', homeController.listDailyDate.bind(homeController));
