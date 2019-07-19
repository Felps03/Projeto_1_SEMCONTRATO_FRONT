System.register(["./controllers/HomeController", "./utils/userData", "./controllers/ChatBotController"], function (exports_1, context_1) {
    "use strict";
    var HomeController_1, userData_1, ChatBotController_1, userData, homeController, chatBotController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HomeController_1_1) {
                HomeController_1 = HomeController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            },
            function (ChatBotController_1_1) {
                ChatBotController_1 = ChatBotController_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            homeController = new HomeController_1.HomeController();
            chatBotController = new ChatBotController_1.ChatBotController();
            window.addEventListener('load', homeController.listLastHelp.bind(homeController));
            window.addEventListener('load', homeController.listDailyDate.bind(homeController));
        }
    };
});
