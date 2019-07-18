System.register([], function (exports_1, context_1) {
    "use strict";
    var DailyNotes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DailyNotes = class DailyNotes {
                constructor() {
                    this._dailyNotes = [];
                }
                adiciona(dailyNote) {
                    this._dailyNotes.push(dailyNote);
                }
                paraArray() {
                    return [].concat(this._dailyNotes);
                }
            };
            exports_1("DailyNotes", DailyNotes);
        }
    };
});
