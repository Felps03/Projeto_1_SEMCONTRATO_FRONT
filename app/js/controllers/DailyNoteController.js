System.register(["../models/DailyNote", "../services/DailyNoteService", "../helpers/index", "../validation/dailyNoteValidate", "../utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var DailyNote_1, DailyNoteService_1, index_1, index_2, vals, listCheck_1, DailyNoteController;
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
                index_2 = index_1_1;
            },
            function (vals_1) {
                vals = vals_1;
            },
            function (listCheck_1_1) {
                listCheck_1 = listCheck_1_1;
            }
        ],
        execute: function () {
            DailyNoteController = class DailyNoteController {
                constructor() {
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
                listD(event) {
                    event.preventDefault();
                    let value = this.url_date || this.dateField.value;
                    const page = parseInt(this.url_page) || 1;
                    let dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    let year = this.dateField.value.slice(0, 4);
                    let month = this.dateField.value.slice(6, 7);
                    let day = this.dateField.value.slice(8, 10);
                    day = ("00" + day).slice(-2);
                    month = ("00" + month).slice(-2);
                    let fullDate = `${year}-${month}-${day}`;
                    return dailyNoteService.listDate(fullDate, page)
                        .then(res => {
                        return res.json();
                    })
                        .then(result => {
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
                registered(event) {
                    event.preventDefault();
                    let service = new DailyNoteService_1.DailyNoteService();
                    return service.registeredDaily(localStorage.getItem('id'));
                }
                cancel(event) {
                    event.preventDefault();
                    index_2.clean(document.querySelector('#yesterday'));
                    index_2.clean(document.querySelector('#today'));
                    index_2.clean(document.querySelector('#impediment'));
                }
                login(event) {
                    if (!localStorage.getItem('id') || localStorage.getItem('id') === 'undefined' || localStorage.getItem('id') === null)
                        document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                }
                showAllDailys() {
                    if (this.url.get('date') && this.url.get('page')) {
                        this.listDateDaily(event);
                    }
                    let year = `${new Date().getFullYear()}`;
                    let month = `${new Date().getMonth() + 1}`;
                    let day = `${new Date().getDate()}`;
                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;
                    let today = `${year}-${month}-${day}`;
                    this.dateField.value = this.url_date || today;
                    if (this.url.get('user')) {
                        this.listUserDaily(event);
                    }
                    else {
                        this.listDateDaily(event);
                    }
                    this.dailyButton(event);
                    this.login(event);
                }
                listDateDaily(event) {
                    this.dayliesResult.innerHTML = '';
                    const result = this.listD(event);
                    if (result) {
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
                                if (this.dayliesResult) {
                                    this.mountTable(this.dayliesResult, daily, owner, id_owner, this.id_daily);
                                }
                                this.id_daily = '';
                                return;
                            });
                        });
                    }
                }
                dailyButton(event) {
                    this.registered(event)
                        .then((res) => {
                        if (res.status == 400) {
                            document.getElementById('dailyModal').click();
                            document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                            return;
                        }
                    });
                }
                registeredDaily(event) {
                    this.add(event)
                        .then((res) => {
                        if (res.status == 200) {
                            this.listDateDaily(event);
                            document.getElementById('dailyModal').click();
                            document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                            document.getElementById('status_daily').innerHTML = `
			<div class="alert alert-success alert-dismissible fade show" role="alert">
			<strong>Daily cadastrada com sucesso!</strong>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
			</div>
			`;
                            return;
                        }
                        else if (res.status == 400) {
                            document.getElementById('dailyModal').click();
                            document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                            document.getElementById('status_daily').innerHTML = `
			<div class="alert alert-danger alert-dismissible fade show" role="alert">
			<strong>Você já cadastrou sua daily!</strong>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
			</div>
			`;
                            return;
                        }
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
                                if (this.dayliesResult) {
                                    this.mountTable(this.dayliesResult, daily, owner, id_owner, this.id_daily);
                                }
                                this.id_daily = '';
                                return;
                            });
                        });
                    }
                }
                mountTable(dayliesResult, daily, owner, id_user, id_daily) {
                    const body = document.createElement('tr');
                    if (localStorage.getItem('isAdmin') === 'true' || id_user === localStorage.getItem('id')) {
                        console.log("daily");
                        console.log(id_daily);
                        console.log(id_user);
                        body.innerHTML = `<tr>
                <td>${owner}</td>
                <td>${daily.Date.getUTCDate()}/${daily.Date.getUTCMonth() + 1}/${daily.Date.getUTCFullYear()} </td>
                <td>${daily.Yesterday}</td>
                <td>${daily.Today}</td>
                <td>${daily.Impediment}</td>
                <td>
                    <a href="daily-edit.html?id=${id_daily}&owner=${id_user}"
                        class="btn btn-outline-warning btn-sm input-circle pt-2 mr-2" id="edit-daily">
                        <i class="small material-icons" id="teste">edit</i>
                    </a>
                </td>
                </tr>`;
                    }
                    else {
                        body.innerHTML = `<tr>
                <td>${owner}</td>
                <td>${daily.Date.getUTCDate()}/${daily.Date.getUTCMonth() + 1}/${daily.Date.getUTCFullYear()} </td>
                <td>${daily.Yesterday}</td>
                <td>${daily.Today}</td>
                <td>${daily.Impediment}</td>
                <td>         </td>
                </tr>`;
                    }
                    this.dayliesResult.appendChild(body);
                }
            };
            exports_1("DailyNoteController", DailyNoteController);
        }
    };
});
