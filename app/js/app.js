System.register(["./controllers/HomeController", "./controllers/UserController"], function (exports_1, context_1) {
    "use strict";
    var HomeController_1, UserController_1, controller, add, nameSpan, userNameSpan, homeController, data;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HomeController_1_1) {
                HomeController_1 = HomeController_1_1;
            },
            function (UserController_1_1) {
                UserController_1 = UserController_1_1;
            }
        ],
        execute: function () {
            controller = new UserController_1.UserController();
            add = document.querySelector('.form');
            if (add != null) {
                add.addEventListener('submit', controller.add.bind(controller));
            }
            nameSpan = document.querySelector('#nameSpan');
            userNameSpan = document.querySelector('#userNameSpan');
            homeController = new HomeController_1.HomeController();
            data = homeController.getUser();
            if (data) {
                data.then(data => {
                    if (nameSpan != null) {
                        nameSpan.textContent = data.name;
                    }
                    if (userNameSpan != null) {
                        userNameSpan.textContent = `(${data.userName})`;
                    }
                });
            }
            else {
                window.location.href = "index.html";
            }
        }
    };
});
