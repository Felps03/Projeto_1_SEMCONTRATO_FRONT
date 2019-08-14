System.register(["./controllers/HelpCenterPageController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterPageController_1, userData_1, userData, controller, url, url_ask_id, askResult, answerForm, answer_access, a, cadastrar;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterPageController_1_1) {
                HelpCenterPageController_1 = HelpCenterPageController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            controller = new HelpCenterPageController_1.HelpCenterPageController();
            url = new URLSearchParams(location.search);
            url_ask_id = url.get('id');
            askResult = document.getElementById("show-question");
            if (url.get('page')) {
                controller.CurrentPage = +url.get('page');
            }
            answerForm = document.getElementById('answer_form');
            if (answerForm) {
                if (!localStorage.getItem('tkn')) {
                    answerForm.innerHTML = '';
                }
            }
            askResult.addEventListener('click', controller.list.bind(controller));
            $(document).ready(function () {
                document.getElementById('show-question').click();
            });
            if (window.innerWidth <= 987)
                document.getElementById('send_answer').classList.add('btn-block');
            answer_access = document.getElementById('answer_field');
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
            }
            else {
                answer_access.innerHTML = '';
            }
            a = document.getElementById('answer');
            console.log(a);
            cadastrar = document.querySelector("#send_answer");
            if (cadastrar) {
                cadastrar.addEventListener('click', controller.add.bind(controller));
            }
        }
    };
});
