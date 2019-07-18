System.register(["./Authenticate", "./User", "./DailyNote", "./Post", "./Posts", "./PostAsk", "./PostAsks"], function (exports_1, context_1) {
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
            function (Authenticate_1_1) {
                exportStar_1(Authenticate_1_1);
            },
            function (User_1_1) {
                exportStar_1(User_1_1);
            },
            function (DailyNote_1_1) {
                exportStar_1(DailyNote_1_1);
            },
            function (Post_1_1) {
                exportStar_1(Post_1_1);
            },
            function (Posts_1_1) {
                exportStar_1(Posts_1_1);
            },
            function (PostAsk_1_1) {
                exportStar_1(PostAsk_1_1);
            },
            function (PostAsks_1_1) {
                exportStar_1(PostAsks_1_1);
            }
        ],
        execute: function () {
        }
    };
});
