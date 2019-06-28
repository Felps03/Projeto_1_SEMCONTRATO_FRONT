System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function yesterday(first) {
        if (!(first.value.length > 3)) {
            return 'Descrição muito pequena.';
        }
        else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(first.value)) {
            return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
        }
        return 'validacao do yesterday ta ok';
    }
    exports_1("yesterday", yesterday);
    function today(today) {
        if (!(today.value.length > 3)) {
            return 'Descrição muito pequena.';
        }
        else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(today.value)) {
            return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
        }
        return 'validacao do today ta ok';
    }
    exports_1("today", today);
    function impediment(third) {
        if (!(third.value.length > 3)) {
            return 'Descrição muito pequena.';
        }
        else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(third.value)) {
            return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
        }
        return 'validacao do impediment ta ok';
    }
    exports_1("impediment", impediment);
    return {
        setters: [],
        execute: function () {
        }
    };
});
