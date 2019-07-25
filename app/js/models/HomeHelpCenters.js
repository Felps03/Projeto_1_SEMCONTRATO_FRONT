System.register([], function (exports_1, context_1) {
    "use strict";
    var HomeHelpCenters;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HomeHelpCenters = class HomeHelpCenters {
                constructor() {
                    this._homeDailyNotes = [];
                }
                adiciona(dailyNote) {
                    this._homeDailyNotes.push(dailyNote);
                }
                paraArray() {
                    return [].concat(this._homeDailyNotes);
                }
            };
            exports_1("HomeHelpCenters", HomeHelpCenters);
        }
    };
});
