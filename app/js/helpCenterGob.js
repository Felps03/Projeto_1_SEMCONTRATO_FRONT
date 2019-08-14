System.register(["./controllers/HelpCenterGOBController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterGOBController_1, userData_1, userData, controller, url, mostraHelp;
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
            $(document).ready(function () {
                document.getElementById('mostra-help').click();
                setTimeout(() => {
                    let logout = document.getElementById("logout");
                    if (logout)
                        logout.addEventListener('click', controller.logout.bind(controller));
                }, 1000);
            });
            $('#search-joker').keyup(delay((e) => {
                controller.findByJoker.bind(controller)(e);
            }, 500));
        }
    };
});
