System.register([], function (exports_1, context_1) {
    "use strict";
    var HOST, GOB_HOST;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("HOST", HOST = 'http://localhost:3005/');
            exports_1("GOB_HOST", GOB_HOST = 'https://gob-bols.azurewebsites.net/');
        }
    };
});
