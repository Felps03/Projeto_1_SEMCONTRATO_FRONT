System.register(["./controllers/DailyNoteController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var DailyNoteController_1, userData_1, userData, cadastrar, dailyesResult, cancel, listDate, showDaylies, controller;
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
            cadastrar = document.querySelector('#daily-form');
            dailyesResult = document.querySelector('#dayliesResult');
            cancel = document.getElementById("cancel");
            listDate = document.querySelector('#filter');
            showDaylies = document.querySelector('#showDaylies');
            controller = new DailyNoteController_1.DailyNoteController();
            if (listDate && dailyesResult)
                listDate.addEventListener('click', controller.listDateDaily.bind(controller));
            if (cadastrar)
                cadastrar.addEventListener('submit', controller.registeredDaily.bind(controller));
            if (cancel)
                cancel.addEventListener('click', controller.cancel.bind(controller));
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
                var btn = document.querySelector('.responsive-add-daily-bottom');
                if (btn.parentNode)
                    btn.parentNode.removeChild(btn);
            }
            else {
                var btn = document.querySelector('.responsive-add-daily-top');
                if (btn.parentNode)
                    btn.parentNode.removeChild(btn);
            }
        }
    };
});
