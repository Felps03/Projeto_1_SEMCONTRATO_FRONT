System.register(["../views/HeaderView"], function (exports_1, context_1) {
    "use strict";
    var HeaderView_1, HeaderController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HeaderView_1_1) {
                HeaderView_1 = HeaderView_1_1;
            }
        ],
        execute: function () {
            HeaderController = class HeaderController {
                constructor() {
                    this.menuView = new HeaderView_1.HeaderView('#header');
                    this.menuView.update('');
                }
            };
            exports_1("HeaderController", HeaderController);
        }
    };
});
