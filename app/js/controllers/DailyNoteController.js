import { DailyNote } from '../models/DailyNote';
import { DailyNoteService } from '../services/DailyNoteService';
import { validate } from '../helpers/index';
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';
export class DailyNoteController {
    constructor() {
        this.yesterday = document.querySelector('#yesterday');
        this.today = document.querySelector('#today');
        this.impediment = document.querySelector('#impediment');
        this.date = document.querySelector('#date');
        this.listDate = document.querySelector('#filter');
        this.editYesterday = document.querySelector('#edit-yesterday');
        this.editToday = document.querySelector('#edit-today');
        this.editImpediment = document.querySelector('#edit-impediment');
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
    }
    add(event) {
        event.preventDefault();
        if (noFalse(this.addVals)) {
            let dailyNote = new DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
            let dailyNoteService = new DailyNoteService();
            let dailyNoteAux = dailyNoteService.add(this.yesterday.value, this.today.value, this.impediment.value, new Date());
        }
    }
    listD(event) {
        event.preventDefault();
        let date = document.querySelector('#date_filter');
        let urlDate = new URLSearchParams(location.search).get('date');
        let value = date.value || urlDate;
        const url_page = new URLSearchParams(location.search).get('page');
        const page = parseInt(url_page) || 1;
        let dateFilter = new Date(value);
        let dailyNoteService = new DailyNoteService();
        return dailyNoteService.listDate(dateFilter, page)
            .then(res => {
            return res.json();
        })
            .then(result => {
            return result;
        });
    }
    ;
}
