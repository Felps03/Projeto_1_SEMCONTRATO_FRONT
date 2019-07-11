import { DailyNoteService } from '../services/DailyNoteService';
import { DailyNote } from '../models/DailyNote';
import { validate } from '../helpers/index';
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';
export class EditDailyController {
    constructor() {
        this.yesterday = document.querySelector('#edit-yesterday');
        this.today = document.querySelector('#edit-today');
        this.impediment = document.querySelector('#edit-impediment');
        this.idDaily = document.querySelector('#idDaily');
        this.addVals = [
            validate(this.yesterday, vals.yesterday),
            validate(this.today, vals.today),
            validate(this.impediment, vals.impediment),
        ];
    }
    getDailyData(id) {
        const dailyService = new DailyNoteService();
        return dailyService.listDailyById(id)
            .then(res => res.json())
            .then(result => {
            this.yesterday.value = result.yesterday;
            this.today.value = result.today;
            this.impediment.value = result.impediment;
            this.idDaily.value = result._id;
        });
    }
    update(event) {
        event.preventDefault();
        let id = document.querySelector('#idDaily');
        if (noFalse(this.addVals)) {
            const daily = new DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
            const dailyService = new DailyNoteService();
            return dailyService.update(daily, this.idDaily.value.toString());
        }
    }
}
