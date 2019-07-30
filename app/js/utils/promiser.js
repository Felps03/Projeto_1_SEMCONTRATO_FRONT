System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function promiser(val) {
        if (val instanceof Promise) {
            return val;
        }
        else {
            return Promise.resolve(val);
        }
    }
    exports_1("promiser", promiser);
    return {
        setters: [],
        execute: function () {
        }
    };
});
