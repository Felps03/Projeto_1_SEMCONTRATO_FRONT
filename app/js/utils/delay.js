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
    function delayHelp(callback, ms) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback.apply(context, args);
            }, ms || 0);
        };
    }
    return {
        setters: [],
        execute: function () {
        }
    };
});
