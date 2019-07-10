import { HomeController } from "./controllers/HomeController";
import { UserController } from "./controllers/UserController";
const controller = new UserController();
let add = document.querySelector('.form');
if (add != null) {
    add.addEventListener('submit', controller.add.bind(controller));
}
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
    });
}
else {
    window.location.href = "index.html";
}
