System.register(["../models/DailyNote", "../services/DailyNoteService", "../helpers/index", "../validation/dailyNoteValidate", "../utils/listCheck", "../views/DailyNotesView", "../views/PaginationView", "../views/RegisteredDailyView", "../models/RegisteredDaylies", "../models/RegisteredDaily", "../views/DailyStatusView", "../helpers/dateHelper"], function (exports_1, context_1) {
    "use strict";
    var DailyNote_1, DailyNoteService_1, index_1, vals, listCheck_1, DailyNotesView_1, PaginationView_1, RegisteredDailyView_1, RegisteredDaylies_1, RegisteredDaily_1, DailyStatusView_1, dateHelper_1, DailyNoteController;
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
            function (PaginationView_1_1) {
                PaginationView_1 = PaginationView_1_1;
            },
            function (RegisteredDailyView_1_1) {
                RegisteredDailyView_1 = RegisteredDailyView_1_1;
            },
            function (RegisteredDaylies_1_1) {
                RegisteredDaylies_1 = RegisteredDaylies_1_1;
            },
            function (RegisteredDaily_1_1) {
                RegisteredDaily_1 = RegisteredDaily_1_1;
            },
            function (DailyStatusView_1_1) {
                DailyStatusView_1 = DailyStatusView_1_1;
            },
            function (dateHelper_1_1) {
                dateHelper_1 = dateHelper_1_1;
            }
        ],
        execute: function () {
            DailyNoteController = class DailyNoteController {
                constructor(totalPages = 1) {
                    this.url = new URLSearchParams(location.search);
                    this.url_date = this.url.get('date');
                    this.url_page = this.url.get('page');
                    this.url_user = this.url.get('user');
                    this.dayliesResult = document.getElementById("dayliesResult");
                    this.dateField = document.querySelector('#date_filter');
                    this.totalPagesDiv = document.querySelector('#pages');
                    this.yesterday = document.querySelector('#yesterday');
                    this.today = document.querySelector('#today');
                    this.impediment = document.querySelector('#impediment');
                    this.date = document.querySelector('#date');
                    this.listDate = document.querySelector('#filter');
                    this.dailyNotesView = new DailyNotesView_1.DailyNotesView('#dayliesResult');
                    this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-daily-note.html');
                    this.totalPages = totalPages;
                    this.type = 0;
                    this.paginationView.update(1, this.totalPages, this.type);
                    this.addVals = [
                        index_1.validate(this.yesterday, vals.yesterday),
                        index_1.validate(this.today, vals.today),
                        index_1.validate(this.impediment, vals.impediment)
                    ];
                }
                add(event) {
                    event.preventDefault();
                    if (listCheck_1.noFalse(this.addVals)) {
                        let dailyNote = new DailyNote_1.DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
                        let dailyNoteService = new DailyNoteService_1.DailyNoteService();
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
                    let value = this.dateField.value || this.url_date;
                    this.dateField.value = value;
                    const page = parseInt(this.url_page) || 1;
                    let dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    let date = new Date(value);
                    let fullDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1) < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}-${(date.getUTCDate()) < 10 ? '0' + (date.getUTCDate()) : (date.getUTCDate())}`;
                    return dailyNoteService.listDate(fullDate, page)
                        .then(res => {
                        return res.json();
                    })
                        .then(result => {
                        this.TotalPages = result[result.length - 1].totalPages;
                        this.paginationView.update(page, this.totalPages, this.type, fullDate);
                        let registeredDaylies = new RegisteredDaylies_1.RegisteredDaylies();
                        this.dailyView = new RegisteredDailyView_1.RegisteredDailyView('#dayliesResult');
                        result.pop();
                        result.reverse().map((result) => new RegisteredDaily_1.RegisteredDaily(result['id_daily'], result['id_user'], result['yesterday'], result['today'], result['impediment'], result['date'], result['owner']))
                            .forEach((result) => registeredDaylies.add(result));
                        this.dailyView.update(registeredDaylies);
                        return result;
                    });
                }
                ;
                listU(event) {
                    event.preventDefault();
                    const page = +this.url_page || 1;
                    const dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    return dailyNoteService.listUser(this.url_user, page).then(res => {
                        return res.json();
                    });
                }
                cancel(event) {
                    event.preventDefault();
                    index_1.clean(document.querySelector('#yesterday'));
                    index_1.clean(document.querySelector('#today'));
                    index_1.clean(document.querySelector('#impediment'));
                }
                login(event) {
                    if (!localStorage.getItem('id') || localStorage.getItem('id') === 'undefined' || localStorage.getItem('id') === null)
                        document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                }
                showAllDailys() {
                    if (this.url.get('date') && this.url.get('page'))
                        this.listDateDaily(event);
                    let date = new Date();
                    let today = dateHelper_1.dateFormatYYYYMMDD(new Date());
                    this.dateField.value = this.url_date || today;
                    if (this.url.get('user'))
                        this.listUserDaily(event);
                    else
                        this.listDateDaily(event);
                    this.dailyButton(event);
                    this.login(event);
                }
                listDateDaily(event) {
                    console.log("chegous");
                    this.dayliesResult.innerHTML = '';
                    const result = this.listD(event);
                    let date = document.getElementById('date_filter');
                    let lastDate = new Date(date.value.split('-').join('/'));
                    let newDate = new Date();
                    if (lastDate > newDate) {
                        let typeAlert = 'alert-warning';
                        this.dailyStatusView = new DailyStatusView_1.DailyStatusView('#status_daily');
                        this.dailyStatusView.update('Não são cadastradas dailys em datas futuras :(', 0, 0, typeAlert);
                    }
                    else if (result) {
                        result.then((result) => {
                            result.forEach((r) => {
                                const daily = new DailyNote_1.DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));
                                let totalPages;
                                if (r.hasOwnProperty('totalPages')) {
                                    totalPages = parseInt(r.totalPages);
                                    let header_pagination = '';
                                    let string_li = '';
                                    let footer_pagination = '';
                                    const dateValue = this.url_date || this.dateField.value;
                                    if (this.totalPagesDiv) {
                                        const nav_pagination = document.createElement('nav');
                                        const fullString = header_pagination + string_li + footer_pagination;
                                        nav_pagination.innerHTML = fullString;
                                        this.totalPagesDiv.innerHTML = '';
                                        this.totalPagesDiv.appendChild(nav_pagination);
                                    }
                                    return;
                                }
                                const owner = r.owner;
                                const id_owner = r.id_user;
                                this.id_daily = r.id_daily;
                                this.id_daily = '';
                                return;
                            });
                        });
                    }
                }
                registered(event) {
                    event.preventDefault();
                    return new DailyNoteService_1.DailyNoteService().registeredDaily(localStorage.getItem('id'));
                }
                dailyButton(event) {
                    this.registered(event)
                        .then((res) => {
                        let typeAlert = 'alert-warning';
                        this.dailyStatusView = new DailyStatusView_1.DailyStatusView('#status_daily');
                        if (res.status == 400) {
                            this.dailyStatusView.update('Você já cadastrou sua daily!', 0, 0, typeAlert);
                            document.getElementById("add_daily").setAttribute('title', " Você já cadastrou sua daily");
                        }
                        if (res.status == 400)
                            document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                    });
                }
                registeredDaily(event) {
                    this.add(event)
                        .then((res) => {
                        this.listDateDaily(event);
                        document.getElementById('dailyModal').click();
                        document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                        document.getElementById("add_daily").setAttribute('title', " Você já cadastrou sua daily");
                        this.dailyStatusView = new DailyStatusView_1.DailyStatusView('#status_daily');
                        this.dailyStatusView.update(res.status == 200 ? 'Daily cadastrada com sucesso!' : res.status == 400 ? 'Você já cadastrou sua daily!' : '');
                    });
                }
                listUserDaily(event) {
                    this.dayliesResult.innerHTML = '';
                    const result = this.listU(event);
                    if (result) {
                        result.then(result => {
                            result.forEach((r) => {
                                const daily = new DailyNote_1.DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));
                                let totalPages;
                                if (r.hasOwnProperty('totalPages')) {
                                    totalPages = parseInt(r.totalPages);
                                    let header_pagination = '';
                                    let string_li = '';
                                    let footer_pagination = '';
                                    const dateValue = this.url_date || this.dateField.value;
                                    if (this.totalPagesDiv) {
                                        header_pagination = `
                        <nav aria-label="daily-nav" class="float-right">
                        <ul class="pagination">
                        <li class="page-item">
                        </a>
                        </li>
                        `;
                                        let i = 0;
                                        string_li = '';
                                        for (i; i < totalPages; i++) {
                                            string_li += `
                            <li class="page-item"><a class="page-link" href="app-daily-note.html?page=${i +
                                                1}&date=${dateValue}">${i + 1}</a></li>
								`;
                                        }
                                        footer_pagination = `
							<li class="page-item" >
                        
							`;
                                        const nav_pagination = document.createElement('nav');
                                        const fullString = header_pagination + string_li + footer_pagination;
                                        nav_pagination.innerHTML = fullString;
                                        this.totalPagesDiv.innerHTML = '';
                                        this.totalPagesDiv.appendChild(nav_pagination);
                                    }
                                    return;
                                }
                                const owner = r.owner;
                                const id_owner = r.id_user;
                                this.id_daily = r.id_daily;
                                this.id_daily = '';
                                return;
                            });
                        });
                    }
                }
            };
            exports_1("DailyNoteController", DailyNoteController);
        }
    };
});
