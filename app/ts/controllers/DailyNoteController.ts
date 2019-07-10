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

        // console.log(this.editYesterday);
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

            let dailyNoteAux = dailyNoteService.add(
                this.yesterday.value,
                this.today.value,
                this.impediment.value,
                new Date());

            // console.log(dailyNote);
            // console.log(dailyNoteAux);
        }
    }

    listD(event: Event) {
        event.preventDefault();

        let date = <HTMLInputElement>document.querySelector('#date_filter');
        let value = date.value;
        // console.log(value)
        let dateFilter = new Date(value);
        // console.log(dateFilter);
        let dailyNoteService = new DailyNoteService();

        return dailyNoteService.listDate(dateFilter)
            .then(res => {
                // console.log(res)
                return res.json();
            })
            .then(result => {
                // console.log(result);
                return result
            });
    };

    // update(event: Event) {
    //     // event.preventDefault();
    //     this.editYesterday = 
    //     console.log("oi ju");

    // }









    listAllDailies() {
        console.log("chegou");
        let ds = new DailyNoteService();

        ds.listAll(1)
            .then(result => {
                return result.json();
            }).then(result => {
                let row = <HTMLTableElement>document.querySelector('#dayliesResult');

                row.innerHTML = "";

                console.log(result.length);

                for (let i = 0; i < result.length - 1; i++) {
                    row.innerHTML += `
                            <tr>
                                <td>${result[i].owner}</td>
                                <td>${result[i].date.slice(0, 10)}</td>
                                <td>${result[i].yesterday}</td>
                                <td>${result[i].today}</td>
                                <td>${result[i].impediment}</td>
                                <td>
                                    <button type="button" name="edit"
                                        class="btn btn-outline-warning btn-sm input-circle pt-2 mr-2" id="edit-daily"
                                        data-toggle="modal" data-target="#editdailyModal">
                                        <i class="small material-icons">edit</i>
                                    </button>
                                </td>
                            </tr>
                            `;
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}