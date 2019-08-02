System.register(["./controllers/ChatBotController"], function (exports_1, context_1) {
    "use strict";
    var ChatBotController_1, chatBotController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ChatBotController_1_1) {
                ChatBotController_1 = ChatBotController_1_1;
            }
        ],
        execute: function () {
            chatBotController = new ChatBotController_1.ChatBotController();
        }
    };
});
