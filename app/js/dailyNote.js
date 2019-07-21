System.register(["./controllers/DailyNoteController", "./models/index", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var DailyNoteController_1, index_1, userData_1, userData, dailyesResult, totalPagesDiv, id_daily, url, url_date, dateField, controller, cadastrar, listDate;
    var __moduleName = context_1 && context_1.id;
    function load() {
        if (url.get('date') && url.get('page')) {
            listDateDaily(event);
        }
        let year = `${new Date().getFullYear()}`;
        let month = `${new Date().getMonth() + 1}`;
        let day = `${new Date().getDate()}`;
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        let today = `${year}-${month}-${day}`;
        dateField.value = url_date || today;
        listDateDaily(event);
        dailyButton(event);
        login(event);
    }
    function login(event) {
        if (!localStorage.getItem('id') || localStorage.getItem('id') === 'undefined' || localStorage.getItem('id') === null) {
            document.getElementById('add_daily').setAttribute('disabled', 'disabled');
        }
    }
    function dailyButton(event) {
        controller.registered(event)
            .then((res) => {
            if (res.status == 400) {
                document.getElementById('dailyModal').click();
                document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                return;
            }
        });
    }
    function registeredDaily(event) {
        controller.add(event)
            .then((res) => {
            if (res.status == 200) {
                listDateDaily(event);
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
    function listDateDaily(event) {
        dailyesResult.innerHTML = '';
        const result = controller.listD(event);
        if (result) {
            result.then((result) => {
                result.forEach((r) => {
                    const daily = new index_1.DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));
                    let totalPages;
                    if (r.hasOwnProperty('totalPages')) {
                        totalPages = parseInt(r.totalPages);
                        let header_pagination = '';
                        let string_li = '';
                        let footer_pagination = '';
                        const dateValue = url_date || dateField.value;
                        if (totalPagesDiv) {
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
                            totalPagesDiv.innerHTML = '';
                            totalPagesDiv.appendChild(nav_pagination);
                        }
                        return;
                    }
                    const owner = r.owner;
                    const id_owner = r.id_user;
                    id_daily = r.id_daily;
                    if (dailyesResult) {
                        mountTable(dailyesResult, daily, owner, id_owner, id_daily);
                    }
                    id_daily = '';
                    return;
                });
            });
        }
    }
    function mountTable(dayliesResult, daily, owner, id_user, id_daily) {
        const body = document.createElement('tr');
        if (localStorage.getItem('isAdmin') === 'true' || id_user === localStorage.getItem('id')) {
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
        dailyesResult.appendChild(body);
    }
    return {
        setters: [
            function (DailyNoteController_1_1) {
                DailyNoteController_1 = DailyNoteController_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            userData = userData_1.getUser();
            dailyesResult = document.querySelector('#dayliesResult');
            totalPagesDiv = document.querySelector('#pages');
            url = new URLSearchParams(location.search);
            url_date = url.get('date');
            dateField = document.querySelector('#date_filter');
            controller = new DailyNoteController_1.DailyNoteController();
            cadastrar = document.querySelector('#daily-form');
            if (cadastrar) {
                cadastrar.addEventListener('submit', registeredDaily);
            }
            load();
            listDate = document.querySelector('#filter');
            if (listDate) {
                if (dailyesResult) {
                    listDate.addEventListener('click', listDateDaily);
                }
            }
            $('#cancel').click((e) => {
                e.preventDefault();
                var dirtyFormID = 'daily-form';
                var resetForm = document.getElementById(dirtyFormID);
                let yesterday = document.querySelector('#yesterday');
                let today = document.querySelector('#today');
                let impediment = document.querySelector('#impediment');
                yesterday.classList.remove('is-valid');
                today.classList.remove('is-valid');
                impediment.classList.remove('is-valid');
                resetForm.reset();
            });
        }
    };
});
