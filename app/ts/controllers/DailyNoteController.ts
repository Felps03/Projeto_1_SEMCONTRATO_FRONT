import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { validate } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';
import { DailyNotesView } from '../views/DailyNotesView';
import { UserMenuView } from '../views/UserMenuView';

export class DailyNoteController {

    private yesterday: HTMLInputElement;
    private today: HTMLInputElement;
    private impediment: HTMLInputElement;
    private date: HTMLInputElement;
    private listDate: HTMLInputElement;

    private editYesterday: HTMLInputElement;
    private editToday: HTMLInputElement;
    private editImpediment: HTMLInputElement;

    private addVals: (() => boolean)[];
    private editVals: (() => boolean)[];
    private user: UserMenuView;


    constructor() {
        this.yesterday = <HTMLInputElement>document.querySelector('#yesterday');
        this.today = <HTMLInputElement>document.querySelector('#today');
        this.impediment = <HTMLInputElement>document.querySelector('#impediment');
        this.date = <HTMLInputElement>document.querySelector('#date');

        this.listDate = <HTMLInputElement>document.querySelector('#filter');

        this.editYesterday = <HTMLInputElement>document.querySelector('#edit-yesterday');
        this.editToday = <HTMLInputElement>document.querySelector('#edit-today');
        this.editImpediment = <HTMLInputElement>document.querySelector('#edit-impediment');
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

        this.user = new UserMenuView("#user-menu-login-link");
        this.user.update('');
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
        // console.log("a data completa no controller é: ", fullDate)
        // console.log("A page no controller é: ", page)
        return dailyNoteService.listDate(fullDate, page)
            .then(res => {
                // console.log(res)
                return res.json();
            })
            .then(result => {
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
}