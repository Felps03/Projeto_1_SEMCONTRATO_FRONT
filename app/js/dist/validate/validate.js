"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(input, fn) {
    var opts = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        opts[_i - 2] = arguments[_i];
    }
    var handle = function () {
        var msg = fn.apply(void 0, [input].concat(opts));
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
exports.validate = validate;
//# sourceMappingURL=validate.js.map