import { HelpCenterPageController } from "./controllers/HelpCenterPageController";

const controller = new HelpCenterPageController();

const url = new URLSearchParams(location.search);
const url_ask_id = url.get('id');

let askResult = document.getElementById("ask_result");

askResult.addEventListener('click', controller.list.bind(controller));

if (url.get('page')) {
    controller.CurrentPage = +url.get('page');
}

$(document).ready(function () {
    document.getElementById('ask_result').click();
});

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;