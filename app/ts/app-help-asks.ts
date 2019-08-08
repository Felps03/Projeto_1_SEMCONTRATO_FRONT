import { HelpCenterPageController } from "./controllers/HelpCenterPageController";

import { getUser } from "./utils/userData";

let userData = getUser();

const controller = new HelpCenterPageController();

const url = new URLSearchParams(location.search);
const url_ask_id = url.get('id');

let askResult = document.getElementById("ask_result");

if (url.get('page')) {
    controller.CurrentPage = +url.get('page');
}

askResult.addEventListener('click', controller.list.bind(controller));


$(document).ready(function () {
    document.getElementById('ask_result').click();
});

let cadastrar = document.querySelector("#send_answer");
if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
    //window.addEventListener('load', controller.list.bind(controller));
}

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

// $("#idQuest");

//Responsive 
if(window.innerWidth <= 987) document.getElementById('send_answer').classList.add('btn-block');