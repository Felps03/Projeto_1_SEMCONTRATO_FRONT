System.register([], function (exports_1, context_1) {
    "use strict";
    var DailyNote;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DailyNote = class DailyNote {
                constructor(yesterday, today, impediment, date) {
                    this.yesterday = yesterday;
                    this.today = today;
                    this.impediment = impediment;
                    this.date = date;
                }
                get Yesterday() {
                    return this.yesterday;
                }
                get Today() {
                    return this.today;
                }
                get Impediment() {
                    return this.impediment;
                }
                get Date() {
                    return this.date;
                }
            };
            exports_1("DailyNote", DailyNote);
        }
    };
});
