System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function delay(val, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(val);
            }, delay);
        });
    }
    exports_1("delay", delay);
    return {
        setters: [],
        execute: function () {
        }
    };
});
