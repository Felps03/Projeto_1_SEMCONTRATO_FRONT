import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';


export class DailyNoteController {

    private yesterday: HTMLInputElement;
    private today: HTMLInputElement;
    private impediment: HTMLInputElement;
    private date: HTMLInputElement;


    constructor() {
        this.yesterday = <HTMLInputElement>document.querySelector('#yesterday');
        this.today = <HTMLInputElement>document.querySelector('#today');
        this.impediment = <HTMLInputElement>document.querySelector('#impediment');
        this.date = <HTMLInputElement>document.querySelector('#date');
    }

    add(event: Event) {
        event.preventDefault();

        let dailyNote = new DailyNote(
            this.yesterday.value.toString(),
            this.today.value.toString(),
            this.impediment.value.toString(),
            new Date()
        );

        let form: HTMLFormElement = <HTMLFormElement>document.getElementById('daily-form');
        let dailyNoteService = new DailyNoteService();

        let dailyNoteAux = dailyNoteService.add(form);

        console.log(dailyNote);
        console.log(dailyNoteAux);
    }
}

// list(event: Event) {

// }

// update(event: Event) {
//     event.preventDefault();
// }
// }