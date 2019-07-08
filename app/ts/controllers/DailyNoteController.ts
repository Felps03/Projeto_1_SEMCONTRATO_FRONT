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

        console.log(this.editYesterday);
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

            console.log(dailyNote);
            console.log(dailyNoteAux);
        }
    }

    listD(event: Event) {
        event.preventDefault();

        let date = <HTMLInputElement>document.querySelector('#date_filter');
        let value = date.value;
        let dateFilter = new Date(value);

        let dailyNoteService = new DailyNoteService();

        return dailyNoteService.listDate(dateFilter)
            .then(res => {
                // console.log(res)
                return res.json();
            })
            .then(result => {
                // console.log(token);
                // console.log(result['name'])
                // console.log(result['userName'])
                console.log(result);
                // let daily = {
                //     yesterday: result['yesterday'],
                //     today: result['today'],
                //     impediment: result['impediment']
                // }
                return result
            });

        // .then(resp => resp.json())
        // .then(result => {
        //    console.log(result.docs);
        //    return result; 
        // });
    };
}


// update(event: Event) {
//     event.preventDefault();
//     if (noFalse(this.editVals)) {
//         ...
//     }
// }
// }