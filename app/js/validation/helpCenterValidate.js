System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function title(title) {
        if (!(title.value.trim().length > 3)) {
            return 'Título muito pequeno.';
        }
        else {
            return null;
        }
    }
    exports_1("title", title);
    function desc(desc) {
        if (!(desc.value.trim().length > 3)) {
            return 'Descrição muito pequena.';
        }
        else {
            return null;
        }
    }
    exports_1("desc", desc);
    return {
        setters: [],
        execute: function () {
        }
    };
});
