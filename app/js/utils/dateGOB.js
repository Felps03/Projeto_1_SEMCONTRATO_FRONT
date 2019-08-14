System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function dateGOB(dateG) {
        let date = dateG.split('-');
        let newDate = date.reverse().map(dateFilter => +dateFilter).join('/');
        return newDate;
    }
    exports_1("dateGOB", dateGOB);
    function reverseDateGOB(dateG) {
        let date = dateG.split('/');
        const newDay = ('00' + date[0]).slice(-2);
        const newMonth = ('00' + date[1]).slice(-2);
        const newYear = ('00' + date[2]).slice(-4);
        return `${newYear}-${newMonth}-${newDay}`;
    }
    exports_1("reverseDateGOB", reverseDateGOB);
    return {
        setters: [],
        execute: function () {
        }
    };
});
