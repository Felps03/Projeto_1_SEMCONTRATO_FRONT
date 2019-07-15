import { HelpCenterController } from "./controllers/HelpCenterController";
import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";
let userData = getUser();
const controller = new HelpCenterController();
const homeController = new HomeController();
let cadastrar = document.querySelector("#cadastroHelpCenter");
if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
    window.addEventListener('load', controller.list.bind(controller));
}
const searchTitle = document.getElementById('search-title');
const searchDesc = document.getElementById('search-desc');
if (searchTitle)
    searchTitle.addEventListener('change', controller.findByTitle.bind(controller));
if (searchDesc)
    searchDesc.addEventListener('change', controller.findByDesc.bind(controller));
