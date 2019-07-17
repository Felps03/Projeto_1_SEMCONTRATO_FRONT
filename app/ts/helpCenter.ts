import { HelpCenterController } from "./controllers/HelpCenterController";
import { HelpCenterAskController } from "./controllers/HelpCenterAskController";
import { HomeController } from "./controllers/HomeController";
import { getUser } from "./utils/userData";

let userData = getUser();
const controller = new HelpCenterController();
const homeController = new HomeController();

// check for pagination
const url = new URLSearchParams(location.search);
if (url.get('page')) {
    controller.CurrentPage = +url.get('page');
}

let cadastrar = document.querySelector("#cadastroHelpCenter");
if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
    window.addEventListener('load', controller.list.bind(controller));
}

const searchTitle = document.getElementById('search-joker')
// const searchDesc = document.getElementById('search-desc')

if (searchTitle)
    searchTitle.addEventListener('change', controller.findByTitle.bind(controller))
// if (searchDesc)
//     searchDesc.addEventListener('change', controller.findByDesc.bind(controller))

// User Menu

// let nameSpan = document.querySelector('#nameSpan');
// let userNameSpan = document.querySelector('#userNameSpan');
// const data = homeController.getUser();
// // console.log(typeof homeController.getUserData());

// if (data) {
//     data.then(data => {

//         if (nameSpan != null) {
//             nameSpan.textContent = data.name;
//         }
//         if (userNameSpan != null) {
//             userNameSpan.textContent = `(${data.userName})`;
//         }
//     })
// }
// else {
//     window.location.href = "index.html"
// }