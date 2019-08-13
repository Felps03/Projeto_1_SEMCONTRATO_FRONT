System.register(["./controllers/HeaderController"], function (exports_1, context_1) {
    "use strict";
    var HeaderController_1, headerController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HeaderController_1_1) {
                HeaderController_1 = HeaderController_1_1;
            }
        ],
        execute: function () {
            headerController = new HeaderController_1.HeaderController();
        }
    };
});
