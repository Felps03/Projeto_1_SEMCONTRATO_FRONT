System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function dateGOB(dateG) {
        let date = dateG.split('-');
        let newDate = date.reverse().map(dateFilter => +dateFilter).join('/');
        return newDate;
    }
    exports_1("dateGOB", dateGOB);
    return {
        setters: [],
        execute: function () {
        }
    };
});
