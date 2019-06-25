define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function any(fns) {
        fns.forEach(function (fn) {
            if (fn()) {
                return true;
            }
        });
        return false;
    }
    exports.any = any;
    function anyFalse(fns) {
        var isValid = true;
        fns.forEach(function (fn) {
            if (!fn()) {
                isValid = false;
            }
        });
        return isValid;
    }
    exports.anyFalse = anyFalse;
});
//# sourceMappingURL=any.js.map