System.register(["./controllers/HelpCenterPageController"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterPageController_1, controller, url, url_ask_id, askResult;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterPageController_1_1) {
                HelpCenterPageController_1 = HelpCenterPageController_1_1;
            }
        ],
        execute: function () {
            controller = new HelpCenterPageController_1.HelpCenterPageController();
            url = new URLSearchParams(location.search);
            url_ask_id = url.get('id');
            askResult = document.getElementById("ask_result");
            askResult.addEventListener('click', controller.list.bind(controller));
            $(document).ready(function () {
                document.getElementById('ask_result').click();
            });
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
        }
    };
});
