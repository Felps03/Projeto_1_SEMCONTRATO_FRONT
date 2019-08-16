import { HelpCenterPageController } from "./controllers/HelpCenterPageController";

import { getUser } from "./utils/userData";

let userData = getUser();

const controller = new HelpCenterPageController();

const url = new URLSearchParams(location.search);
const url_ask_id = url.get('id');

let askResult = document.getElementById("show-question");

if (url.get('page')) {
    controller.CurrentPage = +url.get('page');
}

const answerForm = document.getElementById('answer_form')
if (answerForm) {
    if (!localStorage.getItem('tkn')) {
        answerForm.innerHTML = ''
    }
}

askResult.addEventListener('click', controller.list.bind(controller));

$(document).ready(function () {
    document.getElementById('show-question').click();
});

//Responsive 
if (window.innerWidth <= 987) document.getElementById('send_answer').classList.add('btn-block');


let answer_access = document.getElementById('answer_field');
if (localStorage.getItem('tkn')) {
    answer_access.innerHTML = `
        <div class="form-group mt-4">
            <label for="add-desc" id="label_answer">Você tem alguma solução para essa pergunta?</label>
                <textarea name="answer" class="form-control form-control-sm input-circle" id="answer" placeholder="Informe a sua solução."
                    rows="5"></textarea>
            <div id="answervalidator"></div>
        </div>

        <button name="send_answer" class="btn btn-outline-success btn-sm float-right pr-4 pl-4 ml-2 input-circle d-flex justify-content-center"
        id="send_answer">
        <i class="small material-icons mr-2 align-middle">textsms</i>Responder</button>
    `;
} else {
    answer_access.innerHTML = '';
}


let a = document.getElementById('answer');
console.log(a);

let cadastrar = document.querySelector("#send_answer");

if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
}