import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { validate } from '../helpers/index'
import { clean } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';
import { DailyNotesView } from '../views/DailyNotesView';
import { InputWrapper } from '../utils/index';
import { DailyNotes } from '../models/DailyNotes';
import { RegisteredDailyView } from '../views/RegisteredDailyView';
import { RegisteredDaylies } from '../models/RegisteredDaylies';
import { RegisteredDaily } from '../models/RegisteredDaily';
import { DailyStatusView } from '../views/DailyStatusView';

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
    private dailyView: RegisteredDailyView;
    private dailyStatusView: DailyStatusView;

    // private headerPagination: headerPaginationView;

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

        let date = new Date();
        let fullDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1) < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}-${date.getUTCDate()}`;

        return dailyNoteService.listDate(fullDate, page)
            .then(res => {
                return res.json();
            })
            .then(result => {
                let registeredDaylies = new RegisteredDaylies();
                this.dailyView = new RegisteredDailyView('#dayliesResult');

                result.pop();
                result.map((result: any) => new RegisteredDaily(result['id_daily'], result['id_user'], result['yesterday'], result['today'], result['impediment'], result['date'], result['owner']))
                    .forEach((result: any) => registeredDaylies.add(result))

                this.dailyView.update(registeredDaylies);

                return result
            });
    };

    listU(event: Event) {
        event.preventDefault()

        const page = + this.url_page || 1;
        const dailyNoteService = new DailyNoteService();

        return dailyNoteService.listUser(this.url_user, page).then(res => {
            return res.json()
        })
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
        if (this.url.get('date') && this.url.get('page')) this.listDateDaily(event);
        let date = new Date();
        let today = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1) < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}-${date.getUTCDate()}`;

        this.dateField.value = this.url_date || today;

        if (this.url.get('user')) this.listUserDaily(event);
        else this.listDateDaily(event);

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
                            // console.log('total paginas', this.totalPagesDiv);

                            // header_pagination = `
                            // <nav aria-label="daily-nav" class="float-right">
                            // <ul class="pagination">
                            // <li class="page-item">
                            // </a>
                            // </li>
                            // `;

                            // let i = 0;
                            // string_li = '';
                            // for (i; i < totalPages; i++) {
                            //     string_li += `
                            //     <li class="page-item"><a class="page-link" href="app-daily-note.html?page=${i +
                            //         1}&date=${dateValue}">${i + 1}</a></li>
                            //         `;
                            // }

                            // footer_pagination = `
                            //     <li class="page-item" >

                            //     `;

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
                    this.id_daily = '';
                    return;
                });
            });
        }
    }

    registered(event: Event) {
        event.preventDefault();
        return new DailyNoteService().registeredDaily(localStorage.getItem('id'));
    }

    dailyButton(event: Event) {
        this.registered(event)
            .then((res) => {
                if (res.status == 400) document.getElementById('add_daily').setAttribute('disabled', 'disabled');
            });
    }

    registeredDaily(event: Event) {
        this.add(event)
            .then((res) => {
                this.listDateDaily(event);
                document.getElementById('dailyModal').click();
                document.getElementById('add_daily').setAttribute('disabled', 'disabled');
             
                this.dailyStatusView = new DailyStatusView('#status_daily');
                this.dailyStatusView.update(res.status == 200 ? 'Daily cadastrada com sucesso!' : res.status == 400 ? 'Você já cadastrou sua daily!': '');
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
                    this.id_daily = ''
                    return
                })
            })
        }
    }
}