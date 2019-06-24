define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function valEmailFormat(email) {
        return !/[a-z]+@[a-z]+\.(com|edu|mil|gov|org)(\\.[a-z]{2})?/.test(email.value) ? '' : null;
    }
    exports.valEmailFormat = valEmailFormat;
});
//# sourceMappingURL=emailFormat.js.map