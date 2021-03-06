System.register(["./InputWrapper", "./listCheck", "./delay", "./normalizeTxt"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (InputWrapper_1_1) {
                exportStar_1(InputWrapper_1_1);
            },
            function (listCheck_1_1) {
                exportStar_1(listCheck_1_1);
            },
            function (delay_1_1) {
                exportStar_1(delay_1_1);
            },
            function (normalizeTxt_1_1) {
                exportStar_1(normalizeTxt_1_1);
            }
        ],
        execute: function () {
        }
    };
});
