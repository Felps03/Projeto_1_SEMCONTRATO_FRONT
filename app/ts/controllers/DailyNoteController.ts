import { DailyNote } from '../models/DailyNote';
import { domInject } from '../helpers/decorators/index';

export class DailyNoteController {
    
    @domInject('#yesterday')
    private _yesterday: JQuery;

    @domInject('#today')
    private _today: JQuery;

    @domInject('#impediment')
    private _impediment: JQuery;

    @domInject('#date')
    private _date: JQuery;
    
    constructor() {
    }

    adiciona(event: Event) {
        event.preventDefault();

        let data = new Date(this._date.val().replace(/-/g, ','));
        
        const dailyNote = new DailyNote(
            this._yesterday,
            this._today,
            this._impediment,
            data
        );
    }
}