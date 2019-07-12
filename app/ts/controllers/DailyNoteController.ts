import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { validate } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';
import { DailyNotesView } from '../views/DailyNotesView';

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
                new Date());
        }
    }

    listD(event: Event) {
        event.preventDefault();

        let date = <HTMLInputElement>document.querySelector('#date_filter');
        // console.log(date)
        let urlDate = new URLSearchParams(location.search).get('date');
        // console.log(urlDate)
        let value = date.value || urlDate;
        const url_page = new URLSearchParams(location.search).get('page');
        const page = parseInt(url_page) || 1;
              
        let dailyNoteService = new DailyNoteService();

        let year = date.value.slice(0,4);
        let month =  date.value.slice(6,7);
        let day =  date.value.slice(8,10);

        day =  ("00" + day).slice(-2);
        month =  ("00" + month).slice(-2);       

        let fullDate = `${year}-${month}-${day}`;

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




}