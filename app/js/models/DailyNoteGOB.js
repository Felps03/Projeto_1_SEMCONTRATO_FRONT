System.register([], function (exports_1, context_1) {
    "use strict";
    var DailyNoteGOB;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DailyNoteGOB = class DailyNoteGOB {
                constructor(photo, user, date, yesterday, today, impediment, id) {
                    this.photo = photo;
                    this.user = user;
                    this.date = date;
                    this.yesterday = yesterday;
                    this.today = today;
                    this.impediment = impediment;
                    this.id = id;
                }
                get Photo() {
                    return this.photo;
                }
                get User() {
                    return this.user;
                }
                get Date() {
                    return this.date;
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
                get Id() {
                    return this.id;
                }
            };
            exports_1("DailyNoteGOB", DailyNoteGOB);
        }
    };
});
