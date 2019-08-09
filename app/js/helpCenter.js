System.register(["./controllers/HelpCenterController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterController_1, userData_1, userData, controller, url, mostraHelp, cadastrar, cancelar, cancel, m;
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
            function (HelpCenterController_1_1) {
                HelpCenterController_1 = HelpCenterController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            controller = new HelpCenterController_1.HelpCenterController();
            url = new URLSearchParams(location.search);
            if (url.get('page')) {
                controller.CurrentPage = +url.get('page');
            }
            mostraHelp = document.getElementById("mostra-help");
            mostraHelp.addEventListener('click', controller.list.bind(controller));
            $(document).ready(function () {
                document.getElementById('mostra-help').click();
            });
            cadastrar = document.querySelector("#cadastroHelpCenter");
            if (cadastrar) {
                cadastrar.addEventListener('click', controller.add.bind(controller));
                cadastrar.addEventListener('click', controller.cancel.bind(controller));
                window.addEventListener('load', controller.list.bind(controller));
            }
            cancelar = document.querySelector("#cancel");
            if (cancelar) {
                cancelar.addEventListener('click', controller.cancelar.bind(controller));
            }
            cancel = document.getElementById("cancelHelpCenter");
            ;
            if (cancel)
                cancel.addEventListener('click', controller.cancel.bind(controller));
            $('#search-joker').keyup(delay(controller.findByJoker.bind(controller), 500));
            m = document.getElementById('user-main');
            m.innerHTML = '';
            if (!localStorage.getItem('email')) {
                document.getElementById('help-add-ocult').remove();
            }
            $(document).ready(() => {
                setTimeout(() => {
                    let logout = document.getElementById("logout");
                    if (logout)
                        logout.addEventListener('click', controller.logout.bind(controller));
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
            if (window.innerWidth <= 576) {
                document.getElementById('cancel').classList.add('btn-block');
                document.getElementById('cadastroHelpCenter').classList.add('btn-block');
                document.getElementById('help-add-ocult').classList.remove('mt-3');
            }
        }
    };
});
