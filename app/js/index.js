System.register(["./controllers/HomeController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HomeController_1, userData_1, userData, homeController, mostraDaily, mostraHelp, clickHelp, m;
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
            clickHelp = document.getElementById("last-helps");
            m = document.getElementById('user-main');
            m.innerHTML = '';
            $(document).ready(function () {
                document.getElementById('mostra-daily').click();
                document.getElementById('mostra-help').click();
                setTimeout(() => {
                    let logout = document.getElementById("logout");
                    if (logout)
                        logout.addEventListener('click', homeController.logout.bind(homeController));
                }, 1000);
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
                    m.innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
                }
            });
        }
    };
});
