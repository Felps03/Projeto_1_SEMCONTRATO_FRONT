import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { validate } from '../helpers/index';
import * as vals from '../validation/dailyNoteValidate';
export class DailyNoteController {
    constructor() {
        this.yesterday = document.querySelector('#yesterday');
        this.today = document.querySelector('#today');
        this.impediment = document.querySelector('#impediment');
        this.date = document.querySelector('#date');
        this.addVals = [
            validate(this.yesterday, vals.yesterday),
            validate(this.today, vals.today),
            validate(this.impediment, vals.impediment),
        ];
    }
    add(event) {
        event.preventDefault();
        let dailyNote = new DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
        let dailyNoteService = new DailyNoteService();
        let dailyNoteAux = dailyNoteService.add(this.yesterday.value, this.today.value, this.impediment.value, new Date());
        console.log(dailyNote);
    }
}
