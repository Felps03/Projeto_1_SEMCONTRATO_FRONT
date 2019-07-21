System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function date(name) {
        return (state, match) => {
            const currentYearS = '' + new Date().getFullYear();
            const currentYear = +currentYearS;
            const currentYearLength = currentYearS.length;
            const [_, dayS, monthS, yearS] = match;
            const yearLength = yearS.length;
            let finalYearS;
            if (yearLength < currentYearLength) {
                const year = +yearS;
                const yearModulo = Math.pow(10, yearLength);
                if (year % yearModulo <= currentYear % yearModulo) {
                    finalYearS =
                        currentYearS.substring(0, currentYearLength - yearLength) +
                            yearS;
                }
                else {
                    const tmp = +currentYearS.substring(0, currentYearLength - yearLength);
                    finalYearS = '' + (tmp - 1) + yearS;
                }
            }
            else {
                finalYearS = yearS;
            }
            state.set(name, `${finalYearS}-${monthS}-${dayS}`);
        };
    }
    exports_1("date", date);
    function raw(name, idx = 1) {
        return (state, match) => {
            state.set(name, match[idx]);
        };
    }
    exports_1("raw", raw);
    return {
        setters: [],
        execute: function () {
        }
    };
});
