import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
export class DailyNoteController {
    constructor() {
        this.yesterday = document.querySelector('#yesterday');
        this.today = document.querySelector('#today');
        this.impediment = document.querySelector('#impediment');
        this.date = document.querySelector('#date');
    }
    add(event) {
        event.preventDefault();
        let dailyNote = new DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
        let form = document.getElementById('daily-form');
        let dailyNoteService = new DailyNoteService();
        let dailyNoteAux = dailyNoteService.add(form);
        console.log(dailyNote);
        console.log(dailyNoteAux);
    }
}
