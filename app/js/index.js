System.register(["./controllers/HomeController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HomeController_1, userData_1, userData, homeController, mostraDaily, mostraHelp, clickHelp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HomeController_1_1) {
                HomeController_1 = HomeController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            homeController = new HomeController_1.HomeController();
            mostraDaily = document.getElementById("mostra-daily");
            mostraHelp = document.getElementById("mostra-help");
            mostraDaily.addEventListener('click', homeController.listDailyDate.bind(homeController));
            mostraHelp.addEventListener('click', homeController.listLastHelp.bind(homeController));
            clickHelp = document.getElementById("last-helps");
            $(document).ready(function () {
                document.getElementById('mostra-daily').click();
                document.getElementById('mostra-help').click();
                setTimeout(() => {
                    let logout = document.getElementById("logout");
                    if (logout)
                        logout.addEventListener('click', homeController.logout.bind(homeController));
                }, 1000);
            });
        }
    };
});
