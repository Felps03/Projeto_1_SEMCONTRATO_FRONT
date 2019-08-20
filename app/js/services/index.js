System.register(["./DailyNoteService", "./AuthenticateService", "./UserService", "./HelpCenterService", "./HelpCenterServiceAsk", "./ConfigurationService", "./HelpCenterGOBService", "./ChatBotService"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (DailyNoteService_1_1) {
                exportStar_1(DailyNoteService_1_1);
            },
            function (AuthenticateService_1_1) {
                exportStar_1(AuthenticateService_1_1);
            },
            function (UserService_1_1) {
                exportStar_1(UserService_1_1);
            },
            function (HelpCenterService_1_1) {
                exportStar_1(HelpCenterService_1_1);
            },
            function (HelpCenterServiceAsk_1_1) {
                exportStar_1(HelpCenterServiceAsk_1_1);
            },
            function (ConfigurationService_1_1) {
                exportStar_1(ConfigurationService_1_1);
            },
            function (HelpCenterGOBService_1_1) {
                exportStar_1(HelpCenterGOBService_1_1);
            },
            function (ChatBotService_1_1) {
                exportStar_1(ChatBotService_1_1);
            }
        ],
        execute: function () {
        }
    };
});
