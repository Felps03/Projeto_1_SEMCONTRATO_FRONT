System.register(["./controllers/HelpCenterPageController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterPageController_1, userData_1, userData, controller, url, url_ask_id, askResult, cadastrar;
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
            if (url.get('page')) {
                controller.CurrentPage = +url.get('page');
            }
            askResult = document.getElementById("ask_result");
            askResult.addEventListener('click', controller.list.bind(controller));
            $(document).ready(function () {
                document.getElementById('ask_result').click();
            });
            cadastrar = document.querySelector("#send_answer");
            if (cadastrar) {
                cadastrar.addEventListener('click', controller.add.bind(controller));
            }
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
        }
    };
});
