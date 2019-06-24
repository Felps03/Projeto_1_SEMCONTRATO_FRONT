define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function validate(input, fn) {
        var opts = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            opts[_i - 2] = arguments[_i];
        }
        input.el.addEventListener('input', function (event) {
            var msg = fn.apply(void 0, [input].concat(opts));
            if (msg) {
                input.setValid(false, msg);
                event.preventDefault();
                return false;
            }
            input.setValid(true, '');
            return true;
        });
    }
    exports.validate = validate;
});
//# sourceMappingURL=validate.js.map