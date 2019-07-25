System.register(["../models/DailyNote", "../services/DailyNoteService", "../helpers/index", "../validation/dailyNoteValidate", "../utils/listCheck", "../views/DailyNotesView", "../views/UserMenuView", "../views/PaginationView"], function (exports_1, context_1) {
    "use strict";
    var DailyNote_1, DailyNoteService_1, index_1, vals, listCheck_1, DailyNotesView_1, UserMenuView_1, PaginationView_1, DailyNoteController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DailyNote_1_1) {
                DailyNote_1 = DailyNote_1_1;
            },
            function (DailyNoteService_1_1) {
                DailyNoteService_1 = DailyNoteService_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (vals_1) {
                vals = vals_1;
            },
            function (listCheck_1_1) {
                listCheck_1 = listCheck_1_1;
            },
            function (DailyNotesView_1_1) {
                DailyNotesView_1 = DailyNotesView_1_1;
            },
            function (UserMenuView_1_1) {
                UserMenuView_1 = UserMenuView_1_1;
            },
            function (PaginationView_1_1) {
                PaginationView_1 = PaginationView_1_1;
            }
        ],
        execute: function () {
            DailyNoteController = class DailyNoteController {
                constructor(totalPages = 1) {
                    this.yesterday = document.querySelector('#yesterday');
                    this.today = document.querySelector('#today');
                    this.impediment = document.querySelector('#impediment');
                    this.date = document.querySelector('#date');
                    this.listDate = document.querySelector('#filter');
                    this.editYesterday = document.querySelector('#edit-yesterday');
                    this.editToday = document.querySelector('#edit-today');
                    this.editImpediment = document.querySelector('#edit-impediment');
                    this.dailyNotesView = new DailyNotesView_1.DailyNotesView('#dayliesResult');
                    this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-daily-note.html');
                    this.totalPages = totalPages;
                    this.paginationView.update(1, this.totalPages);
                    this.addVals = [
                        index_1.validate(this.yesterday, vals.yesterday),
                        index_1.validate(this.today, vals.today),
                        index_1.validate(this.impediment, vals.impediment)
                    ];
                    this.editVals = [
                        index_1.validate(this.editYesterday, vals.yesterday),
                        index_1.validate(this.editToday, vals.today),
                        index_1.validate(this.editImpediment, vals.impediment)
                    ];
                    this.user = new UserMenuView_1.UserMenuView("#user-menu-login-link");
                    this.user.update('');
                }
                add(event) {
                    event.preventDefault();
                    if (listCheck_1.noFalse(this.addVals)) {
                        let dailyNote = new DailyNote_1.DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
                        let dailyNoteService = new DailyNoteService_1.DailyNoteService();
                        let message = document.querySelector("#fail");
                        let messageGood = document.querySelector("#success");
                        return dailyNoteService.add(this.yesterday.value, this.today.value, this.impediment.value, new Date());
                    }
                }
                set CurrentPage(page) {
                    this.currentPage = page;
                    this.paginationView.update(this.currentPage, this.totalPages);
                }
                set TotalPages(total) {
                    this.totalPages = total;
                }
                listD(event) {
                    event.preventDefault();
                    let date = document.querySelector('#date_filter');
                    let urlDate = new URLSearchParams(location.search).get('date');
                    let value = urlDate || date.value;
                    const url_page = new URLSearchParams(location.search).get('page');
                    const page = parseInt(url_page) || 1;
                    let dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    let year = date.value.slice(0, 4);
                    let month = date.value.slice(6, 7);
                    let day = date.value.slice(8, 10);
                    day = ("00" + day).slice(-2);
                    month = ("00" + month).slice(-2);
                    let fullDate = `${year}-${month}-${day}`;
                    return dailyNoteService.listDate(fullDate, page)
                        .then(res => {
                        return res.json();
                    })
                        .then(result => {
                        console.log(result);
                        console.log(result[result.length - 1].totalPages);
                        this.TotalPages = result[result.length - 1].totalPages;
                        this.paginationView.update(page, this.totalPages, date.value);
                        return result;
                    });
                }
                ;
                listU(event) {
                    event.preventDefault();
                    let urlUser = new URLSearchParams(location.search).get('user');
                    const url_page = new URLSearchParams(location.search).get('page');
                    const page = +url_page || 1;
                    const dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    console.log(urlUser, page);
                    return dailyNoteService.listUser(urlUser, page).then(res => {
                        return res.json();
                    });
                }
                registered(event) {
                    event.preventDefault();
                    let service = new DailyNoteService_1.DailyNoteService();
                    return service.registeredDaily(localStorage.getItem('id'));
                }
            };
            exports_1("DailyNoteController", DailyNoteController);
        }
    };
});
