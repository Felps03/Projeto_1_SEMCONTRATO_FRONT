import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { domInject } from '../helpers/decorators/index';
import * as val from '../validate/DailyNoteValidate'
import { noFalse } from '../utils/listCheck';
import { InputWrapper, validate } from '../validate/index'


export class DailyNoteController {

    private _yesterday = InputWrapper.fromId('yesterday');

    private _today = InputWrapper.fromId('today');

    private _impediment = InputWrapper.fromId('impediment');

    private _date = new Date();

    private _service = new DailyNoteService();

    private valFns = [
        validate(this._yesterday, val.yesterday),
        validate(this._today, val.today),
        validate(this._impediment, val.impediment),
    ]

    constructor() { }

    add(event: Event) {
        event.preventDefault();

        if (noFalse(this.valFns)) {
            const dailyNote = new DailyNote(
                this._yesterday.toString(),
                this._today.toString(),
                this._impediment.toString(),
                new Date()
            );

            this._service.add();

            console.log(dailyNote);
        } else {
            console.log(this.valFns);
        }
    }

    list(event: Event) {

    }

    update(event: Event) {
        event.preventDefault();
    }
}