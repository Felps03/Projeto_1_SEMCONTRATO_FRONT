import { DailyNoteController } from "./controllers/DailyNoteController";
import { DailyNote } from "./models/index";
let dailyesResult = document.querySelector("#dayliesResult");
let totalPagesDiv = document.querySelector("#pages");
let id_daily;
const url = new URLSearchParams(location.search);
const url_date = url.get('date');
const dateField = document.querySelector('#date_filter');
const dateValue = dateField.value || url_date;
const controller = new DailyNoteController();
let registered = document.querySelector("#newResult");
let cadastrar = document.querySelector("#daily-form");
if (cadastrar) {
    cadastrar.addEventListener('submit', registeredDaily);
}
let listDate = document.querySelector("#filter");
if (listDate) {
    if (dailyesResult) {
        listDate.addEventListener('click', listDateDaily);
    }
}
window.addEventListener("load", () => {
    if ((url.get('date')) && (url.get('page'))) {
        listDateDaily(event);
    }
});
function registeredDaily(event) {
    controller.add(event)
        .then(res => {
        if (res.status == 200) {
            registered.textContent = "Daily cadastrada com sucesso";
            registered.className = "alert alert-info";
            return;
        }
        else if (res.status == 400) {
            registered.textContent = "Daily já cadastrada";
            registered.className = "alert alert-danger";
            return;
        }
    });
}
function listDateDaily(event) {
    dailyesResult.innerHTML = '';
    const result = controller.listD(event);
    if (result) {
        result
            .then(result => {
            result.forEach((r) => {
                const daily = new DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));
                let totalPages;
                if (r.hasOwnProperty('totalPages')) {
                    totalPages = parseInt(r.totalPages);
                    let header_pagination = '';
                    ;
                    let string_li = '';
                    let footer_pagination = '';
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
                            <li class="page-item"><a class="page-link" href="app-daily-note.html?page=${i + 1}&date=${dateValue}">${i + 1}</a></li>
                            `;
                        }
                        footer_pagination = `
                        <li class="page-item" >
                        
                        `;
                        const nav_pagination = document.createElement('nav');
                        const fullString = header_pagination + string_li + footer_pagination;
                        nav_pagination.innerHTML = fullString;
                        totalPagesDiv.innerHTML = '';
                        totalPagesDiv.append(nav_pagination);
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
    if ((localStorage.getItem('isAdmin') === 'true') || (id_user === localStorage.getItem('id'))) {
        body.innerHTML =
            `<tr>
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
        body.innerHTML =
            `<tr>
                <td>${owner}</td>
                <td>${daily.Date.getUTCDate()}/${daily.Date.getUTCMonth() + 1}/${daily.Date.getUTCFullYear()} </td>
                <td>${daily.Yesterday}</td>
                <td>${daily.Today}</td>
                <td>${daily.Impediment}</td>
                <td>         </td>
                </tr>`;
    }
    dailyesResult.append(body);
}
