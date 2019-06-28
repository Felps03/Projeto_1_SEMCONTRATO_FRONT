import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';


export class DailyNoteController {

    
    constructor() { }

    add(event: Event) {
        event.preventDefault();


            const dailyNote = new DailyNote(
                this._yesterday.toString(),
                this._today.toString(),
                this._impediment.toString(),
                new Date()
            );

            this._service.add();

            console.log(dailyNote);
        } 
    }

    list(event: Event) {

    }

    update(event: Event) {
        event.preventDefault();
    }
}