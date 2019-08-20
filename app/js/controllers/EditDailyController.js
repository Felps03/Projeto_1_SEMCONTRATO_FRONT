System.register(["../services/DailyNoteService", "../models/DailyNote", "../helpers/index", "../validation/dailyNoteValidate", "../utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var DailyNoteService_1, DailyNote_1, index_1, vals, listCheck_1, EditDailyController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DailyNoteService_1_1) {
                DailyNoteService_1 = DailyNoteService_1_1;
            },
            function (DailyNote_1_1) {
                DailyNote_1 = DailyNote_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (vals_1) {
                vals = vals_1;
            },
            function (listCheck_1_1) {
                listCheck_1 = listCheck_1_1;
            }
        ],
        execute: function () {
            EditDailyController = class EditDailyController {
                constructor() {
                    this.yesterday = document.querySelector('#edit-yesterday');
                    this.today = document.querySelector('#edit-today');
                    this.impediment = document.querySelector('#edit-impediment');
                    this.idDaily = document.querySelector('#idDaily');
                    this.addVals = [
                        index_1.validate(this.yesterday, vals.yesterday),
                        index_1.validate(this.today, vals.today),
                        index_1.validate(this.impediment, vals.impediment),
                    ];
                }
                checkImpediment() {
                    let yesImpediment = document.getElementById('yesImpediment');
                    let noImpediment = document.getElementById('noImpediment');
                    let impediment = document.getElementById('edit-impediment');
                    noImpediment.addEventListener('change', () => {
                        impediment.setAttribute('hidden', 'true');
                        this.impediment.value = 'Nenhum';
                    });
                    yesImpediment.addEventListener('change', () => {
                        impediment.removeAttribute('hidden');
                        impediment.setAttribute('autofocus', 'true');
                        this.impediment.value = '';
                    });
                }
                getDailyData(id) {
                    const dailyService = new DailyNoteService_1.DailyNoteService();
                    return dailyService.listDailyById(id)
                        .then(res => {
                        if (res.status == 200) {
                            document.getElementById('load-view').setAttribute('hidden', 'true');
                        }
                        return res.json();
                    })
                        .then(result => {
                        this.yesterday.value = result.yesterday;
                        this.today.value = result.today;
                        this.impediment.value = result.impediment;
                        if (this.impediment.value === 'Nenhum') {
                            this.impediment.value = '';
                        }
                        console.log('oi', this.impediment.value);
                        this.idDaily.value = result._id;
                    });
                }
                update(event) {
                    event.preventDefault();
                    let id = document.querySelector('#idDaily');
                    if (listCheck_1.noFalse(this.addVals)) {
                        const daily = new DailyNote_1.DailyNote(this.yesterday.value.toString(), this.today.value.toString(), new Date(), this.impediment.value.toString());
                        const dailyService = new DailyNoteService_1.DailyNoteService();
                        return dailyService.update(daily, this.idDaily.value.toString());
                    }
                }
            };
            exports_1("EditDailyController", EditDailyController);
        }
    };
});
