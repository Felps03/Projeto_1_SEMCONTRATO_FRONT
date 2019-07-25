System.register([], function (exports_1, context_1) {
    "use strict";
    var HomeDailyNote;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HomeDailyNote = class HomeDailyNote {
                constructor(author, yesterday, today, impediment) {
                    this.author = author;
                    this.yesterday = yesterday;
                    this.today = today;
                    this.impediment = impediment;
                }
                get Author() {
                    return this.author;
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
            };
            exports_1("HomeDailyNote", HomeDailyNote);
        }
    };
});
