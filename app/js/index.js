System.register(["./controllers/HomeController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HomeController_1, userData_1, userData, homeController, mostraDaily, mostraHelp;
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
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            mostraDaily = document.getElementById("mostra-daily");
            mostraHelp = document.getElementById("mostra-help");
            mostraDaily.addEventListener('click', homeController.listDailyDate.bind(homeController));
            mostraHelp.addEventListener('click', homeController.listLastHelp.bind(homeController));
            $(document).ready(function () {
                document.getElementById('mostra-daily').click();
                document.getElementById('mostra-help').click();
            });
        }
    };
});
