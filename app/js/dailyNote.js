System.register(["./controllers/DailyNoteController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var DailyNoteController_1, userData_1, userData, dayliesResult, cadastrar, dailyesResult, cancel, listDate, showDaylies, controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DailyNoteController_1_1) {
                DailyNoteController_1 = DailyNoteController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            dayliesResult = document.getElementById("dayliesResult");
            cadastrar = document.querySelector('#daily-form');
            dailyesResult = document.querySelector('#dayliesResult');
            cancel = document.getElementById("cancel");
            listDate = document.querySelector('#filter');
            showDaylies = document.querySelector('#showDaylies');
            controller = new DailyNoteController_1.DailyNoteController();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            if (listDate && dailyesResult)
                listDate.addEventListener('click', controller.listDateDaily.bind(controller));
            if (cadastrar)
                cadastrar.addEventListener('submit', controller.registeredDaily.bind(controller));
            if (cancel)
                cancel.addEventListener('click', controller.cancel.bind(controller));
            if (showDaylies)
                showDaylies.addEventListener('click', controller.showAllDailys.bind(controller));
            $(document).ready(() => document.getElementById('showDaylies').click());
        }
    };
});
