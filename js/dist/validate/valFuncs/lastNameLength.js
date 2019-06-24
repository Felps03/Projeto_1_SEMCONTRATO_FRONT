define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function valLastNameLength(lastName) {
        return lastName.value.length < 3 ? 'Sobrenome muito curto.' : null;
    }
    exports.valLastNameLength = valLastNameLength;
});
//# sourceMappingURL=lastNameLength.js.map