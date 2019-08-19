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
            if (listDate && dailyesResult)
                listDate.addEventListener('click', controller.listD.bind(controller));
            if (showDaylies)
                showDaylies.addEventListener('click', controller.showAllDailys.bind(controller));
            $(document).ready(() => {
                document.getElementById('showDaylies').click();
                setTimeout(() => {
                    let logout = document.getElementById("logout");
                    if (logout)
                        logout.addEventListener('click', controller.logout.bind(controller));
                }, 1000);
            });
            if (window.innerWidth <= 576) {
                document.getElementById('recovery-pass').classList.add('btn-block');
                document.getElementById('cancel').classList.add('btn-block');
                document.getElementById('filter').classList.add('btn-block');
                document.getElementById('filter').classList.add('mt-0');
                document.getElementById('filter').classList.add('mb-4');
                document.getElementById('filter').classList.remove('col-sm-6');
                document.getElementById('filter').classList.add('col-sm-12');
                document.getElementById('add_daily').classList.add('mb-4');
            }
        }
    };
});
