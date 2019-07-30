System.register([], function (exports_1, context_1) {
    "use strict";
    var HomeDailyNotes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HomeDailyNotes = class HomeDailyNotes {
                constructor() {
                    this._homeDailyNotes = [];
                }
                add(dailyNote) {
                    this._homeDailyNotes.push(dailyNote);
                }
                toArray() {
                    return [].concat(this._homeDailyNotes);
                }
            };
            exports_1("HomeDailyNotes", HomeDailyNotes);
        }
    };
});
