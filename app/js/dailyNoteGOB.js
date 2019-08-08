System.register(["./controllers/DailyNoteGobController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var DailyNoteGobController_1, userData_1, userData, dayliesResult, dailyesResult, listDate, showDaylies, controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DailyNoteGobController_1_1) {
                DailyNoteGobController_1 = DailyNoteGobController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            dayliesResult = document.getElementById("dayliesResult");
            dailyesResult = document.querySelector('#dayliesResult');
            listDate = document.querySelector('#filter');
            showDaylies = document.querySelector('#showDaylies');
            controller = new DailyNoteGobController_1.DailyNoteGOBController();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></font></a>`;
            if (listDate && dailyesResult)
                listDate.addEventListener('click', controller.listD.bind(controller));
            if (showDaylies)
                showDaylies.addEventListener('click', controller.showAllDailys.bind(controller));
            $(document).ready(() => document.getElementById('showDaylies').click());
        }
    };
});
