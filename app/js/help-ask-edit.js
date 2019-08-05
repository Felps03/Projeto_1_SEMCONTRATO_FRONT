System.register(["./controllers/HelpCenterAskController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterAskController_1, userData_1, userData, controller, url, url_ask_id, postAsk, update;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterAskController_1_1) {
                HelpCenterAskController_1 = HelpCenterAskController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            controller = new HelpCenterAskController_1.HelpCenterAskController();
            url = new URLSearchParams(location.search);
            url_ask_id = url.get('id');
            postAsk = controller.findByID.bind(controller, url_ask_id);
            $(document).ready(function () {
                document.getElementById('answer_result').click();
            });
            update = document.querySelector("#send_answer");
            if (update) {
            }
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
        }
    };
});
