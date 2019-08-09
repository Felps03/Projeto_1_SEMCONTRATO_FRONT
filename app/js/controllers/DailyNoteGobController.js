System.register(["../models/DailyNoteGOB", "../models/DailyNotesGOB", "../services/DailyNoteGOBService", "../views/DailyNotesGobView", "../helpers/dateHelper"], function (exports_1, context_1) {
    "use strict";
    var DailyNoteGOB_1, DailyNotesGOB_1, DailyNoteGOBService_1, DailyNotesGobView_1, dateHelper_1, DailyNoteGOBController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DailyNoteGOB_1_1) {
                DailyNoteGOB_1 = DailyNoteGOB_1_1;
            },
            function (DailyNotesGOB_1_1) {
                DailyNotesGOB_1 = DailyNotesGOB_1_1;
            },
            function (DailyNoteGOBService_1_1) {
                DailyNoteGOBService_1 = DailyNoteGOBService_1_1;
            },
            function (DailyNotesGobView_1_1) {
                DailyNotesGobView_1 = DailyNotesGobView_1_1;
            },
            function (dateHelper_1_1) {
                dateHelper_1 = dateHelper_1_1;
            }
        ],
        execute: function () {
            DailyNoteGOBController = class DailyNoteGOBController {
                constructor(totalPages = 1) {
                    this.url = new URLSearchParams(location.search);
                    this.url_date = this.url.get('date');
                    this.url_page = this.url.get('page');
                    this.url_user = this.url.get('user');
                    this.dateField = document.querySelector('#date_filter');
                    this.listDate = document.querySelector('#filter');
                }
                showAllDailys() {
                    if (this.url.get('date') && this.url.get('page'))
                        this.listD(event);
                    let date = new Date();
                    let today = dateHelper_1.dateFormatYYYYMMDD(new Date());
                    this.dateField.value = this.url_date || today;
                    this.listD(event);
                }
                logout(event) {
                    event.preventDefault();
                    localStorage.clear();
                    window.location.href = 'index.html';
                }
                listD(event) {
                    event.preventDefault();
                    let value = this.dateField.value;
                    let dailyNoteGOBService = new DailyNoteGOBService_1.DailyNoteGOBService();
                    let fullDate = dateHelper_1.dateFormatYYYYMMDD(new Date);
                    fullDate = this.dateField.value;
                    this.dateField.value = this.url_date || fullDate;
                    return dailyNoteGOBService.list(fullDate)
                        .then(res => {
                        return res.json();
                    })
                        .then(result => {
                        this.dailyView = new DailyNotesGobView_1.DailyNotesGOBView('#dayliesResult');
                        let dailyNotesGOB = new DailyNotesGOB_1.DailyNotesGOB();
                        result.reverse().forEach((result) => {
                            let dailyNoteGOB = new DailyNoteGOB_1.DailyNoteGOB(result['imagem'], result['usuario'], result['data'], result.corpo['ontem'], result.corpo['hoje'], result.corpo['impedimento']);
                            dailyNotesGOB.add(dailyNoteGOB);
                        });
                        this.dailyView.update(dailyNotesGOB);
                        return result;
                    });
                }
                ;
            };
            exports_1("DailyNoteGOBController", DailyNoteGOBController);
        }
    };
});
