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

window.addEventListener('load', homeController.listLastHelp.bind(homeController));
window.addEventListener('load', homeController.listDailyDate.bind(homeController)); 