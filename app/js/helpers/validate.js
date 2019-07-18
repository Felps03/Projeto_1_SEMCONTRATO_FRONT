System.register(["../utils/InputWrapper"], function (exports_1, context_1) {
    "use strict";
    var InputWrapper_1;
    var __moduleName = context_1 && context_1.id;
    function validate(inputEl, fn, ...opts) {
        const input = new InputWrapper_1.InputWrapper(inputEl);
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
        setters: [
            function (InputWrapper_1_1) {
                InputWrapper_1 = InputWrapper_1_1;
            }
        ],
        execute: function () {
        }
    };
});
