import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { validate } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck'

export class DailyNoteController {

    private yesterday: HTMLInputElement;
    private today: HTMLInputElement;
    private impediment: HTMLInputElement;
    private date: HTMLInputElement;
    private listDate: HTMLInputElement;

    private addVals: (() => boolean)[];

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
            validate(this.impediment, vals.impediment),
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

            let dailyNoteAux = dailyNoteService.add(
                this.yesterday.value,
                this.today.value,
                this.impediment.value,
                new Date());

            console.log(dailyNote);
            console.log(dailyNoteAux);
        }
    }

    listD(event: Event){
        event.preventDefault();

        let date = <HTMLInputElement>document.querySelector('#filter');

        let dailyNoteService = new DailyNoteService();

        let dailyNoteListDate = dailyNoteService.listDate(new Date);
        console.log(date);
        console.log(dailyNoteListDate)

    };

}


// update(event: Event) {
//     event.preventDefault();
// }
// }