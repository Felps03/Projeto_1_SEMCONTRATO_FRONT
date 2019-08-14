System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function toISODate(date) {
        return date.toISOString().split('T')[0];
    }
    exports_1("toISODate", toISODate);
    return {
        setters: [],
        execute: function () {
        }
    };
});
