System.register([], function (exports_1, context_1) {
    "use strict";
    var DailyStatus;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DailyStatus = class DailyStatus {
                constructor(status) { this.status = status; }
                get Status() { return this.status; }
            };
            exports_1("DailyStatus", DailyStatus);
        }
    };
});
