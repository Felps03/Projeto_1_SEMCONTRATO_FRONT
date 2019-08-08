System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function comment(comment) {
        if (!(comment.value.trim().length > 3)) {
            return 'Resposta muito curta.';
        }
        else {
            return null;
        }
    }
    exports_1("comment", comment);
    return {
        setters: [],
        execute: function () {
        }
    };
});
