System.register(["./controllers/HelpCenterGOBController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterGOBController_1, userData_1, userData, controller, url, mostraHelp, m;
    var __moduleName = context_1 && context_1.id;
    function delay(callback, ms) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }
    return {
        setters: [
            function (HelpCenterGOBController_1_1) {
                HelpCenterGOBController_1 = HelpCenterGOBController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            controller = new HelpCenterGOBController_1.HelpCenterGOBController();
            url = new URLSearchParams(location.search);
            if (url.get('page')) {
                controller.CurrentPage = +url.get('page');
            }
            if (url.get('q')) {
                controller.CurrentSearch = url.get('q');
            }
            mostraHelp = document.getElementById("mostra-help");
            if (!url.get('q')) {
                mostraHelp.addEventListener('click', controller.list.bind(controller));
            }
            else {
                mostraHelp.addEventListener('click', controller.findByJoker.bind(controller));
            }
            m = document.getElementById('user-main');
            m.innerHTML = '';
            $(document).ready(function () {
                document.getElementById('mostra-help').click();
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
            $('#search-joker').keyup(delay((e) => {
                controller.findByJoker.bind(controller)(e);
            }, 500));
        }
    };
});
