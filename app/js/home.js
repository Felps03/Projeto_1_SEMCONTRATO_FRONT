import { HomeController } from "./controllers/HomeController";
let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');
let homeController = new HomeController();
const data = homeController.getUserData();
console.log(data);
if (data) {
    data.then(data => {
        alert("aoi");
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
