System.register(["../models/DailyNote", "../services/DailyNoteService"], function (exports_1, context_1) {
    "use strict";
    var DailyNote_1, DailyNoteService_1, DailyNoteController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DailyNote_1_1) {
                DailyNote_1 = DailyNote_1_1;
            },
            function (DailyNoteService_1_1) {
                DailyNoteService_1 = DailyNoteService_1_1;
            }
        ],
        execute: function () {
            DailyNoteController = class DailyNoteController {
                constructor() {
                    this.yesterday = document.querySelector('#yesterday');
                    this.today = document.querySelector('#today');
                    this.impediment = document.querySelector('#impediment');
                    this.date = document.querySelector('#date');
                }
                add(event) {
                    event.preventDefault();
                    let dailyNote = new DailyNote_1.DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
                    let form = document.getElementById('daily-form');
                    let dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    let dailyNoteAux = dailyNoteService.add(form);
                    console.log(dailyNote);
                    console.log(dailyNoteAux);
                }
            };
            exports_1("DailyNoteController", DailyNoteController);
        }
    };
});
