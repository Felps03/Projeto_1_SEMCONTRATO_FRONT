import { HomeController } from "./controllers/HomeController";
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
let home = document.querySelector("#home");
if (home) {
    home.addEventListener('onload', homeController.listLastHelp.bind(homeController));
    home.addEventListener('onload', homeController.listDailyDate.bind(homeController));
}
