System.register(["./controllers/DailyNoteController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var DailyNoteController_1, userData_1, userData, cadastrar, dailyesResult, cancel, listDate, showDaylies, controller, m;
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
            m = document.getElementById('user-main');
            m.innerHTML = '';
            $(document).ready(() => {
                document.getElementById('showDaylies').click();
                if (localStorage.getItem('email')) {
                    m.innerHTML =
                        `<div class="dropdown ml-n2 txt-user">
                <div class="d-flex align-items-center btn ml-5" data-toggle="dropdown">
                    <span id="nameSpan"></span>
                    <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle"
                        width="60px">
                    <i class="material-icons ml-n2">arrow_drop_down</i>
                </div>
                <div class="dropdown-menu dropdown-menu-right align-user">
                    <div class="dropdown-item">
                        Usuário:
                        <span id="userNameSpan"></span>
                    </div>
                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" href="user-edit.html">
                        <i class="material-icons mr-2">edit</i>Alterar Cadastro</a>
                    <a class="dropdown-item d-flex align-items-center" href="index.html">
                        <i class="material-icons mr-2">home</i>Home</a>

                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item d-flex align-items-center" id="logout">
                        <i class="material-icons mr-2">power_settings_new</i>
                        <strong>Sair</strong>
                    </a>
                </div>
            </div>`;
                }
                else {
                    m.innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
                }
            });
        }
    };
});
