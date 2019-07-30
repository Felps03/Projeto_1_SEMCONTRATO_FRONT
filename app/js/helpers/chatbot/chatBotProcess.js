System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function compose(...fns) {
        return (state, match) => {
            for (const fn of fns) {
                fn(state, match);
            }
        };
    }
    exports_1("compose", compose);
    function entDate(name) {
        return (state, match) => {
            const currentYearS = '' + new Date().getFullYear();
            const currentYear = +currentYearS;
            const currentYearLength = currentYearS.length;
            const [_, dayS, monthS, yearS] = match;
            const yearLength = yearS.length;
            let finalYearS;
            if (yearLength < currentYearLength) {
                const year = +yearS;
                const yearModulo = 10 ** yearLength;
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
            state.set(name, `${finalYearS}-${('00' + monthS).slice(-2)}-${(('00' + dayS).slice(-2))}`);
        };
    }
    exports_1("entDate", entDate);
    function entRaw(name, idx = 1) {
        return (state, match) => {
            state.set(name, match[idx]);
        };
    }
    exports_1("entRaw", entRaw);
    function checkLoggedIn(goto) {
        return (state, match) => {
            if (!localStorage.getItem('tkn')) {
                console.log('ntalogado');
                state.set('_GOTO', goto);
                state.set('_ANSWER', [
                    'Algo de errado não está certo 🤔',
                    'Você deve estar logado para realizar essa ação.'
                ]);
            }
        };
    }
    exports_1("checkLoggedIn", checkLoggedIn);
    function checkNotLoggedIn(goto) {
        return (state, match) => {
            if (localStorage.getItem('tkn')) {
                state.set('_GOTO', goto);
                state.set('_ANSWER', [
                    'Algo de errado não está certo 🤔',
                    'Você não pode estar logado para realizar essa ação.'
                ]);
            }
        };
    }
    exports_1("checkNotLoggedIn", checkNotLoggedIn);
    return {
        setters: [],
        execute: function () {
        }
    };
});
