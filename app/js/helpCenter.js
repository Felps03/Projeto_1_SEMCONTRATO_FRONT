System.register(["./controllers/HelpCenterController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterController_1, userData_1, userData, controller, url, mostraHelp, cadastrar, searchTitle;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterController_1_1) {
                HelpCenterController_1 = HelpCenterController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="index.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            controller = new HelpCenterController_1.HelpCenterController();
            url = new URLSearchParams(location.search);
            if (url.get('page')) {
                controller.CurrentPage = +url.get('page');
            }
            mostraHelp = document.getElementById("mostra-help");
            mostraHelp.addEventListener('click', controller.list.bind(controller));
            $(document).ready(function () {
                document.getElementById('mostra-help').click();
            });
            cadastrar = document.querySelector("#cadastroHelpCenter");
            if (cadastrar) {
                cadastrar.addEventListener('click', controller.add.bind(controller));
                window.addEventListener('load', controller.list.bind(controller));
            }
            searchTitle = document.getElementById('search-joker');
            if (searchTitle)
                searchTitle.addEventListener('change', controller.findByTitle.bind(controller));
        }
    };
});
