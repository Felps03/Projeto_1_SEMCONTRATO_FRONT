System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function yesterday(first) {
        if (!(first.value.trim().length > 3)) {
            return 'Descrição muito pequena.';
        }
        else if (!first.value.match('([a-z])')) {
            return 'Não pode só numeros.';
        }
        else {
            return null;
        }
    }
    exports_1("yesterday", yesterday);
    function today(today) {
        if (!(today.value.trim().length > 3)) {
            return 'Descrição muito pequena.';
        }
        else if (!today.value.match('([a-z])')) {
            return 'Não pode só numeros.';
        }
        else {
            return null;
        }
    }
    exports_1("today", today);
    function impediment(third) {
        if (!(third.value.trim().length > 3)) {
            return 'Descrição muito pequena.';
        }
        else if (!third.value.match('([a-z])')) {
            return 'Não pode só numeros.';
        }
        else {
            return null;
        }
    }
    exports_1("impediment", impediment);
    return {
        setters: [],
        execute: function () {
        }
    };
});
