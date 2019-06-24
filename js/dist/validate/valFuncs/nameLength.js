define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function valNameLength(name) {
        return name.el.value.length > 2 ? 'Nome muito curto.' : null;
    }
    exports.valNameLength = valNameLength;
});
//# sourceMappingURL=nameLength.js.map