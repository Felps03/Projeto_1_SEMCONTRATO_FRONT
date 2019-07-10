import { DailyNoteController } from "./controllers/DailyNoteController";
import { DailyNote } from "./models/index";
let dailyesResult = document.querySelector("#dayliesResult");
let totalPagesDiv = document.querySelector("#pages");
const controller = new DailyNoteController();
let cadastrar = document.querySelector("#daily-form");
if (cadastrar) {
    cadastrar.addEventListener('submit', controller.add.bind(controller));
}
let edit = document.querySelector("#edit-daily");
if (edit) {
    edit.addEventListener('click', controller.update.bind(controller));
}
let listDate = document.querySelector("#filter");
if (listDate) {
    if (dailyesResult)
        listDate.addEventListener('click', listDateDaily);
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
                        <a class="page-link" href="#" aria-label="Anterior">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                        </a>
                        </li>
                        `;
                        let i = 0;
                        string_li = '';
                        for (i; i < totalPages; i++) {
                            string_li += `
                            <li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>
                            `;
                        }
                        footer_pagination = `
                        <li class="page-item" >
                        <a class="page-link" href = "#" aria-label="Próximo" >
                        <span aria-hidden="true" class="text-primary">&raquo;</span>
                        <span class="sr-only txt-primary">Próximo</span>
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
                if (dailyesResult) {
                    mountTable(dailyesResult, daily, owner, id_owner);
                }
                return;
            });
        });
    }
}
function mountTable(dayliesResult, daily, owner, id_user) {
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
            <button type="button" name="edit"
                class="btn btn-outline-warning btn-sm input-circle pt-2 mr-2" id="edit-daily"
                data-toggle="modal" data-target="#editdailyModal">
                    <i class="small material-icons">edit</i>
            </button>   
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
