System.register(["./index"], function (exports_1, context_1) {
    "use strict";
    var index_1, DailyNotesGOB;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            DailyNotesGOB = class DailyNotesGOB {
                constructor() {
                    this._dailyNotesGOB = [];
                }
                add(dailyNote) {
                    this._dailyNotesGOB.push(dailyNote);
                }
                paraArray() {
                    return [].concat(this._dailyNotesGOB);
                }
                static from(arr) {
                    const newDailyNotes = new DailyNotesGOB();
                    for (let i = 0; i < arr.length - 1; i++) {
                        newDailyNotes.add(new index_1.DailyNoteGOB(arr[i].yesterday, arr[i].today, arr[i].impediment, arr[i].date, arr[i].photo, arr[i].user));
                    }
                    console.log(newDailyNotes);
                    return newDailyNotes;
                }
            };
            exports_1("DailyNotesGOB", DailyNotesGOB);
        }
    };
});
