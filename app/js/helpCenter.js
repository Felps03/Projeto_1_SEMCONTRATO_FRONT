import { HelpCenterController } from "./controllers/HelpCenterController";
import { HomeController } from "./controllers/HomeController";
const controller = new HelpCenterController();
const homeController = new HomeController();
let cadastrar = document.querySelector("#cadastroHelpCenter");
if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
    window.addEventListener('load', controller.list.bind(controller));
}
const searchTitle = document.getElementById('search-joker');
if (searchTitle)
    searchTitle.addEventListener('change', controller.findByTitle.bind(controller));
let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');
const data = homeController.getUserData();
if (data) {
    data.then(data => {
        if (nameSpan != null) {
            nameSpan.textContent = data.name;
        }
        if (userNameSpan != null) {
            userNameSpan.textContent = `(${data.userName})`;
        }
    });
}
else {
    window.location.href = "index.html";
}
