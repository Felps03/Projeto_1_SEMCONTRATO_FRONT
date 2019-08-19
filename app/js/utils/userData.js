System.register(["../controllers/HomeController"], function (exports_1, context_1) {
    "use strict";
    var HomeController_1;
    var __moduleName = context_1 && context_1.id;
    function getUser() {
        let homeController = new HomeController_1.HomeController();
        const data = homeController.getUser();
        if (data) {
            data.then(data => {
                let userData = { name: data.name, userName: data.userName };
                return userData;
            }).then(userData => {
                document.querySelector('#nameSpan').innerHTML = userData.name;
                document.querySelector('#userNameSpan').innerHTML = userData.userName;
                let aux = window.location.href;
                if (aux == 'http://localhost:3000/index.html' || aux == 'http://rebornsemcontrato.azurewebsites.net/') {
                    document.getElementById('welcomeMessage').innerHTML = `
                <div class="row ${window.innerWidth <= 576 ? '' : 'mt-3'} mb-3 mx-0" id="welcomeResponsive">
                    <div class="col-12 section-help">
                        <div class="col-12">
                            <h3 class="txt-primary mt-4 mb-4">
                                Olá, <strong>${userData.name}</strong>!
                            </h3>
                        </div>
                    </div>
                </div>`;
                }
                ;
            });
        }
    }
    exports_1("getUser", getUser);
    return {
        setters: [
            function (HomeController_1_1) {
                HomeController_1 = HomeController_1_1;
            }
        ],
        execute: function () {
        }
    };
});
