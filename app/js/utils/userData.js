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
