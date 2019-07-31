System.register([], function (exports_1, context_1) {
    "use strict";
    var HomeHelpCenters;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HomeHelpCenters = class HomeHelpCenters {
                constructor() {
                    this._homeHelpCenters = [];
                }
                add(helpCenter) {
                    this._homeHelpCenters.push(helpCenter);
                }
                toArray() {
                    return [].concat(this._homeHelpCenters);
                }
            };
            exports_1("HomeHelpCenters", HomeHelpCenters);
        }
    };
});
