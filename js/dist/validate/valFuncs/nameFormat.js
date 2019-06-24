define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function valNameFormat(name) {
        return /[A-Z][a-z]+/.test(name.value) ? 'Nome inválido. Dica: acentos não são permitidos.' : null;
    }
    exports.valNameFormat = valNameFormat;
});
//# sourceMappingURL=nameFormat.js.map