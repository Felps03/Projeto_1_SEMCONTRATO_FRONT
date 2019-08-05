System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function escapeTag(txt) {
        return txt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    exports_1("escapeTag", escapeTag);
    return {
        setters: [],
        execute: function () {
        }
    };
});
