System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function b(a) { return a ? (+a ^ Math.random() * 16 >> +a / 4).toString(16) : ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b); }
    exports_1("default", b);
    return {
        setters: [],
        execute: function () {
        }
    };
});
