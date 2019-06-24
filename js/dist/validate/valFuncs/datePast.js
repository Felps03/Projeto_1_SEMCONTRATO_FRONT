define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function valDatePast(date) {
        var today = new Date();
        var inputDay = new Date(date.value);
        if (today.getFullYear() === inputDay.getFullYear()) {
            if (today.getMonth() === inputDay.getMonth()) {
                if (today.getDate() >= inputDay.getDate() - 1) {
                    return 'Data deve ser pelo menos dois dias atrás.';
                }
            }
        }
        return null;
    }
    exports.valDatePast = valDatePast;
});
//# sourceMappingURL=datePast.js.map