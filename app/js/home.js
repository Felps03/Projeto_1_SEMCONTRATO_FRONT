import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";
let homeController = new HomeController();
let userData = getUser();
window.addEventListener('load', homeController.listLastHelp.bind(homeController));
window.addEventListener('load', homeController.listDailyDate.bind(homeController));
