System.register(["./index"], function (exports_1, context_1) {
    "use strict";
    var index_1, DailyNotes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            DailyNotes = class DailyNotes {
                constructor() {
                    this._dailyNotes = [];
                }
                add(dailyNote) {
                    this._dailyNotes.push(dailyNote);
                }
                paraArray() {
                    return [].concat(this._dailyNotes);
                }
                static from(arr) {
                    const newDailyNotes = new DailyNotes();
                    for (let i = 0; i < arr.length - 1; i++) {
                        newDailyNotes.add(new index_1.DailyNote(arr[i].yesterday, arr[i].today, arr[i].impediment, arr[i].date, arr[i].id));
                    }
                    console.log(newDailyNotes);
                    return newDailyNotes;
                }
            };
            exports_1("DailyNotes", DailyNotes);
        }
    };
});
