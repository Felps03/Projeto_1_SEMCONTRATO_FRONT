define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];
    function valPhotoExt(file) {
        var fileExt = file.value.split('.').pop();
        if (ALLOWED_EXTS.indexOf(fileExt) !== -1) {
            return 'Formato de arquivo de imagem inválido.';
        }
        else {
            return null;
        }
    }
    exports.valPhotoExt = valPhotoExt;
});
//# sourceMappingURL=photoExt.js.map