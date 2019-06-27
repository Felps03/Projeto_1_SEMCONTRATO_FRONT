import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { domInject } from '../helpers/decorators/index';
import { yesterday } from '../validate-fns';

export class DailyNoteController {

    @domInject('#yesterday')
    private _yesterday: JQuery;

    @domInject('#today')
    private _today: JQuery;

    @domInject('#impediment')
    private _impediment: JQuery;

    @domInject('#date')
    private _date: JQuery;

    private _service = new DailyNoteService();

    constructor() {}

    add(event: Event) {
        event.preventDefault();

        let data = new Date(this._date.val().replace(/-/g, ','));

        const dailyNote = new DailyNote(
            this._yesterday.toString(),
            this._today.toString(),
            this._impediment.toString(),
            data
        );

        console.log(dailyNote);
    }

    list(event: Event) {
        event.preventDefault();

        // this._service.obterDailyNotes(res => {
        //     if (res.ok) {
        //         return res;
        //     } else {
        //         throw new Error(res.statusText);
        //     }
        // }).then(

        // );
    }

    update(event: Event) {
        event.preventDefault();


    }
}