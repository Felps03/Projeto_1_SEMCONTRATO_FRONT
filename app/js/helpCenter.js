System.register(["./controllers/HelpCenterController", "./controllers/HomeController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterController_1, HomeController_1, userData_1, userData, controller, homeController, url, cadastrar, searchTitle;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterController_1_1) {
                HelpCenterController_1 = HelpCenterController_1_1;
            },
            function (HomeController_1_1) {
                HomeController_1 = HomeController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            controller = new HelpCenterController_1.HelpCenterController();
            homeController = new HomeController_1.HomeController();
            url = new URLSearchParams(location.search);
            if (url.get('page')) {
                controller.CurrentPage = +url.get('page');
            }
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
