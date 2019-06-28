System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function validate(input, fn, ...opts) {
        const handle = function () {
            const msg = fn(input, ...opts);
            if (msg) {
                input.setValid(false, msg);
                return false;
            }
            input.setValid(true, '');
            return true;
        };
        input.el.addEventListener('input', handle);
        return handle;
    }
    exports_1("validate", validate);
    return {
        setters: [],
        execute: function () {
        }
    };
});
