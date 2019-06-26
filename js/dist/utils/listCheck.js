"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function noFalse(fns) {
    var isValid = true;
    fns.forEach(function (fn) {
        if (!fn()) {
            isValid = false;
        }
    });
    return isValid;
}
exports.noFalse = noFalse;
//# sourceMappingURL=listCheck.js.map