import { DailyNote } from '../models/DailyNote';
import { DailyNotes } from '../models/DailyNotes';
import { DailyNoteService } from '../services/DailyNoteService';

import { validate, clean } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';

import { DailyNotesView } from '../views/DailyNotesView';
import { UserMenuView } from '../views/UserMenuView';
import { InputWrapper } from '../utils/index';
import { PaginationView } from '../views/PaginationView';

export class DailyNoteController {

    private yesterday: HTMLInputElement;
    private today: HTMLInputElement;
    private impediment: HTMLInputElement;
    private date: HTMLInputElement;
    private listDate: HTMLInputElement;

    private editYesterday: HTMLInputElement;
    private editToday: HTMLInputElement;
    private editImpediment: HTMLInputElement;

    private dailyNotesView: DailyNotesView;
    private paginationView: PaginationView;

    private addVals: (() => boolean)[];
    private editVals: (() => boolean)[];
    // private user: UserMenuView;

    private currentPage: number;
	private totalPages: number;
    private type: number;


    constructor(totalPages: number = 1) {
        this.yesterday = <HTMLInputElement>document.querySelector('#yesterday');
        this.today = <HTMLInputElement>document.querySelector('#today');
        this.impediment = <HTMLInputElement>document.querySelector('#impediment');
        this.date = <HTMLInputElement>document.querySelector('#date');

        this.listDate = <HTMLInputElement>document.querySelector('#filter');

        this.editYesterday = <HTMLInputElement>document.querySelector('#edit-yesterday');
        this.editToday = <HTMLInputElement>document.querySelector('#edit-today');
        this.editImpediment = <HTMLInputElement>document.querySelector('#edit-impediment');
        this.dailyNotesView = new DailyNotesView('#dayliesResult');
        this.paginationView = new PaginationView('#pagination', 'app-daily-note.html');

		this.totalPages = totalPages;
        this.type = 0;
		this.paginationView.update(1, this.totalPages, this.type);
        
        // init validations
        this.addVals = [
            validate(this.yesterday, vals.yesterday),
            validate(this.today, vals.today),
            validate(this.impediment, vals.impediment)
        ];
        this.editVals = [
            validate(this.editYesterday, vals.yesterday),
            validate(this.editToday, vals.today),
            validate(this.editImpediment, vals.impediment)
        ];

        // this.user = new UserMenuView("#user-menu-login-link");
        // this.user.update('');
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

            let message = document.querySelector("#fail");
            let messageGood = document.querySelector("#success");

            return dailyNoteService.add(
                this.yesterday.value,
                this.today.value,
                this.impediment.value,
                new Date())
            // .then(res => {
            //     if (res.status == 200) {
            //         messageGood.textContent = 'Daily cadastrada com sucesso';
            //         document.getElementById('dailyModal').click();
            //         document.getElementById('add_daily').setAttribute('disabled', 'disabled');
            //     }

            //     else {
            //         let erro = res;
            //         console.log(res)

            //         //message.textContent = erro.erro;
            //         document.getElementById("status_daily").style.display = "block";
            //         document.getElementById('dailyModal').click();
            //         document.getElementById('add_daily').setAttribute('disabled', 'disabled');
            //     }



            //     return res.json()
            // })
        }
    }

    // set PaginationView(date:string){
    //     this.paginationView.BaseUrl = `app-daily-note.html?${date}&`;
    // }
    set CurrentPage(page: number) {
		this.currentPage = page;
		this.paginationView.update(this.currentPage, this.totalPages, this.type);
	}
	set TotalPages(total: number) {
        this.totalPages = total;
    }

    listD(event: Event) {
        event.preventDefault();

        let date = <HTMLInputElement>document.querySelector('#date_filter');
        // console.log(date)
        let urlDate = new URLSearchParams(location.search).get('date');
        // console.log(urlDate)
        // let value = date.value || urlDate;
        let value = urlDate || date.value;
        // console.log("a data no controller é: ", value);
        const url_page = new URLSearchParams(location.search).get('page');
        const page = parseInt(url_page) || 1;

        let dailyNoteService = new DailyNoteService();

        let year = date.value.slice(0, 4);
        let month = date.value.slice(6, 7);
        let day = date.value.slice(8, 10);

        day = ("00" + day).slice(-2);
        month = ("00" + month).slice(-2);

        let fullDate = `${year}-${month}-${day}`;
        console.log(fullDate);
        console.log(page);
        // console.log("a data completa no controller é: ", fullDate)
        // console.log("A page no controller é: ", page)
        return dailyNoteService.listDate(fullDate, page)
            .then(res => {
                // console.log(res)
                return res.json();
            })
            .then(result => {
                console.log(result);
                console.log(result[result.length-1].totalPages);
                this.TotalPages = result[result.length-1].totalPages;
                this.paginationView.update(page, this.totalPages, this.type, date.value);
                // console.log(result);
                return result
            });
    };

    listU(event: Event) {
        event.preventDefault()

        let urlUser = new URLSearchParams(location.search).get('user')
        const url_page = new URLSearchParams(location.search).get('page')
        const page = +url_page || 1

        const dailyNoteService = new DailyNoteService()
        console.log(urlUser, page)
        return dailyNoteService.listUser(urlUser, page).then(res => {
            // console.log(res)
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
}