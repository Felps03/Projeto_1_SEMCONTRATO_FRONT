System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function dateFormatYYYYMMDD(data) {
        let date = data.toLocaleDateString('pt-BR').slice(0, 10).toString();
        let year = date.slice(6, 10);
        let month = date.slice(3, 5);
        let day = date.slice(0, 2);
        let fullDate = `${year}-${month}-${day}`;
        return fullDate;
    }
    exports_1("dateFormatYYYYMMDD", dateFormatYYYYMMDD);
    return {
        setters: [],
        execute: function () {
        }
    };
});
