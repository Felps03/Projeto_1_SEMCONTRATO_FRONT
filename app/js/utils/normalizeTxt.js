System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function normalize(txt) {
        return txt
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase();
    }
    exports_1("normalize", normalize);
    return {
        setters: [],
        execute: function () {
        }
    };
});
