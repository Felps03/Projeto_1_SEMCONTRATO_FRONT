import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { validate } from '../helpers/index'
import { clean } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';
import { DailyNotesView } from '../views/DailyNotesView';
import { InputWrapper } from '../utils/index';

export class DailyNoteController {

    private yesterday: HTMLInputElement;
    private today: HTMLInputElement;
    private impediment: HTMLInputElement;
    private date: HTMLInputElement;
    private listDate: HTMLInputElement;
    private addVals: (() => boolean)[];
    private dayliesResult: HTMLInputElement;
    private dateField: HTMLInputElement;
    private totalPagesDiv: HTMLInputElement;
    private url = new URLSearchParams(location.search);
    private url_date = this.url.get('date');
    private url_page = this.url.get('page');
    private url_user = this.url.get('user');
    private id_daily: string;

    constructor() {
        this.dayliesResult = <HTMLInputElement>document.getElementById("dayliesResult");
        this.dateField = <HTMLInputElement>document.querySelector('#date_filter');
        this.totalPagesDiv = document.querySelector('#pages');
        this.yesterday = <HTMLInputElement>document.querySelector('#yesterday');
        this.today = <HTMLInputElement>document.querySelector('#today');
        this.impediment = <HTMLInputElement>document.querySelector('#impediment');
        this.date = <HTMLInputElement>document.querySelector('#date');
        this.listDate = <HTMLInputElement>document.querySelector('#filter');

        this.addVals = [
            validate(this.yesterday, vals.yesterday),
            validate(this.today, vals.today),
            validate(this.impediment, vals.impediment)
        ];
    }

    add(event: Event) {
        event.preventDefault();

        if (noFalse(this.addVals)) {
            let dailyNote = new DailyNote(
                this.yesterday.value.toString(),
                this.today.value.toString(),
                this.impediment.value.toString(),
                new Date()
            );

            let dailyNoteService = new DailyNoteService();

            return dailyNoteService.add(
                this.yesterday.value,
                this.today.value,
                this.impediment.value,
                new Date()
            );
        }
    }

    listD(event: Event) {
        event.preventDefault();

        let value = this.url_date || this.dateField.value;
        const page = parseInt(this.url_page) || 1;

        let dailyNoteService = new DailyNoteService();

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
                return result
            });
    };

    listU(event: Event) {
        event.preventDefault()
        
        const page =+ this.url_page || 1;
        const dailyNoteService = new DailyNoteService();

        return dailyNoteService.listUser(this.url_user, page).then(res => {
            return res.json()
        })
    }

    registered(event: Event) {
        event.preventDefault();

        let service = new DailyNoteService();

        return service.registeredDaily(localStorage.getItem('id'))
    }

    cancel(event: Event) {
        event.preventDefault();

        clean(<HTMLInputElement>document.querySelector('#yesterday'));
        clean(<HTMLInputElement>document.querySelector('#today'));
        clean(<HTMLInputElement>document.querySelector('#impediment'));
    }

    login(event: Event) {
        if (!localStorage.getItem('id') || localStorage.getItem('id') === 'undefined' || localStorage.getItem('id') === null) document.getElementById('add_daily').setAttribute('disabled', 'disabled');
    }

    showAllDailys() {
        if (this.url.get('date') && this.url.get('page')) {
            this.listDateDaily(event);
        }

        let year = `${new Date().getFullYear()}`;
        let month = `${new Date().getMonth() + 1}`;
        let day = `${new Date().getDate()}`;

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        let today = `${year}-${month}-${day}`;

        this.dateField.value = this.url_date || today;

        if (this.url.get('user')) {
            this.listUserDaily(event)
        } else {
            this.listDateDaily(event)
        }
        this.dailyButton(event);
        this.login(event);
    }

    listDateDaily(event: Event) {
        this.dayliesResult.innerHTML = '';
        const result = this.listD(event);

        if (result) {
            result.then((result) => {
                result.forEach((r: any) => {
                    const daily = new DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));

                    let totalPages: number;
                    if (r.hasOwnProperty('totalPages')) {
                        totalPages = parseInt(r.totalPages);

                        let header_pagination: string = '';
                        let string_li: string = '';
                        let footer_pagination: string = '';
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
                            const fullString: string = header_pagination + string_li + footer_pagination;
                            nav_pagination.innerHTML = fullString;
                            this.totalPagesDiv.innerHTML = '';
                            this.totalPagesDiv.appendChild(nav_pagination)
                            
                        }
                        return;
                    }
                    const owner: string = r.owner;
                    const id_owner: string = r.id_user;
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

    dailyButton(event: Event) {
        this.registered(event)
            .then((res) => {
                if (res.status == 400) {
                    document.getElementById('dailyModal').click();
                    document.getElementById('add_daily').setAttribute('disabled', 'disabled');
                    return;
                }
            });
    }

    registeredDaily(event: Event) {
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
                } else if (res.status == 400) {
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

    listUserDaily(event: Event) {
        this.dayliesResult.innerHTML = ''
        const result = this.listU(event)

        if (result) {
            result.then(result => {
                result.forEach((r: any) => {
                    const daily = new DailyNote(
                        r.yesterday,
                        r.today,
                        r.impediment,
                        new Date(r.date)
                    )

                    let totalPages: number
                    if (r.hasOwnProperty('totalPages')) {
                        totalPages = parseInt(r.totalPages)
                        
                        let header_pagination: string = ''
                        let string_li: string = ''
                        let footer_pagination: string = ''
                        const dateValue = this.url_date || this.dateField.value
                        
                        if (this.totalPagesDiv) {
                            header_pagination = `
                        <nav aria-label="daily-nav" class="float-right">
                        <ul class="pagination">
                        <li class="page-item">
                        </a>
                        </li>
                        `
                           
                            let i = 0
                            string_li = ''
                            for (i; i < totalPages; i++) {
                                string_li += `
                            <li class="page-item"><a class="page-link" href="app-daily-note.html?page=${i +
                                    1}&date=${dateValue}">${i + 1}</a></li>
								`
                            }
                            
                            footer_pagination = `
							<li class="page-item" >
                        
							`
                            
                            const nav_pagination = document.createElement('nav')
                            const fullString: string =
                                header_pagination + string_li + footer_pagination
                            nav_pagination.innerHTML = fullString
                            this.totalPagesDiv.innerHTML = ''
                            this.totalPagesDiv.appendChild(nav_pagination)
                            
                        }
                        return
                    }
                    const owner: string = r.owner
                    const id_owner: string = r.id_user
                    this.id_daily = r.id_daily
                    if (this.dayliesResult) {
                        this.mountTable(this.dayliesResult, daily, owner, id_owner, this.id_daily)
                    }
                    this.id_daily = ''
                    return
                })
            })
        }
    }

    mountTable(dayliesResult: any, daily: DailyNote, owner: string, id_user: string, id_daily: string) {
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
        } else {
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
}