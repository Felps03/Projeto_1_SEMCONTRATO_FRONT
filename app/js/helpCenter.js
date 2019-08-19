System.register(["./controllers/HelpCenterController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterController_1, userData_1, userData, controller, url, mostraHelp, cadastrar, cancelar, cancel, buttonAddHC;
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
            $(document).ready(function () {
                document.getElementById('mostra-help').click();
            });
            cadastrar = document.querySelector("#cadastroHelpCenter");
            if (cadastrar) {
                cadastrar.addEventListener('click', controller.add.bind(controller));
                cadastrar.addEventListener('click', controller.cancel.bind(controller));
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
            buttonAddHC = document.getElementById("help-add-ocult");
            console.log(localStorage.getItem('email'));
            if (localStorage.getItem('email') == null) {
                console.log("älsjfalf");
                buttonAddHC.innerHTML = ``;
            }
            else {
                console.log(buttonAddHC);
                buttonAddHC.innerHTML = `<label for="search-joker">Deseja perguntar algo?</label>
                            <button type="button" name="new_help"
                                class="btn btn-sm btn-outline-success btn-block float-right input-circle"
                                data-toggle="modal" data-toggle="modal" data-target="#add-modal">
                                <i class="small material-icons mr-2 align-middle custom-icon-margin">help</i>
                                Perguntar
                            </button>`;
            }
            $(document).ready(() => {
                setTimeout(() => {
                    let logout = document.getElementById("logout");
                    if (logout)
                        logout.addEventListener('click', controller.logout.bind(controller));
                }, 1000);
            });
            if (window.innerWidth <= 576) {
                document.getElementById('cancel').classList.add('btn-block');
                document.getElementById('cadastroHelpCenter').classList.add('btn-block');
                document.getElementById('help-add-ocult').classList.remove('mt-3');
            }
        }
    };
});
