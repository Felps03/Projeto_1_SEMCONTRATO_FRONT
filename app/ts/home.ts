import { HomeController } from "./controllers/HomeController";
import { UserService } from "./services/UserService";


let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');
let homeController = new HomeController();

let nameSpanTxt = "";
let userNameSpanTxt = ""




const data = homeController.getUserData();
// console.log(typeof homeController.getUserData());

if (data) {
    data.then(data => {

        if (nameSpan != null) {
            nameSpan.textContent = data.name;
        }
        if (userNameSpan != null) {
            userNameSpan.textContent = `(${data.userName})`;
        }
    })
}
else {
    window.location.href = "index.html"
}
