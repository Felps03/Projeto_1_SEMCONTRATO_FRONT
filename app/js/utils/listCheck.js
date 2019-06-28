System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function any(fns) {
        fns.forEach(fn => {
            if (fn()) {
                return true;
            }
        });
        return false;
    }
    exports_1("any", any);
    function noFalse(fns) {
        let isValid = true;
        fns.forEach(fn => {
            if (!fn()) {
                isValid = false;
            }
        });
        return isValid;
    }
    exports_1("noFalse", noFalse);
    return {
        setters: [],
        execute: function () {
        }
    };
});
