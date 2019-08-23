import { DailyNoteService } from '../services/DailyNoteService';
import { DailyNote } from '../models/DailyNote';

import { validate } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck';

export class EditDailyController {

    private yesterday: HTMLInputElement;
    private today: HTMLInputElement;
    private impediment: HTMLInputElement;
    private idDaily: HTMLInputElement;

    private addVals: (() => boolean)[];

    constructor() {
        this.yesterday = <HTMLInputElement>document.querySelector('#edit-yesterday');
        this.today = <HTMLInputElement>document.querySelector('#edit-today');
        this.impediment = <HTMLInputElement>document.querySelector('#edit-impediment');
        this.idDaily = <HTMLInputElement>document.querySelector('#idDaily');

        this.addVals = [
            validate(this.yesterday, vals.yesterday),
            validate(this.today, vals.today),
            validate(this.impediment, vals.impediment),
        ];
    }

    checkImpediment() {
        let yesImpediment = document.getElementById('yesImpediment')
        let noImpediment = document.getElementById('noImpediment')
        let impediment = document.getElementById('edit-impediment')

        noImpediment.addEventListener('change', () => {
            impediment.setAttribute('hidden', 'true')
            this.impediment.value = 'Nenhum'
        })

        yesImpediment.addEventListener('change', () => {
            impediment.removeAttribute('hidden')
            impediment.setAttribute('autofocus', 'true')
            this.impediment.value = ''
        })
    }

    getDailyData(id: string) {

        const dailyService = new DailyNoteService();
        return dailyService.listDailyById(id)
            .then(res => {
                if (res.status == 200) {
                    document.getElementById('load-view').setAttribute('hidden', 'true');
                }
                return res.json()
            })
            .then(result => {
                this.yesterday.value = result.yesterday;
                this.today.value = result.today;
                this.impediment.value = result.impediment;

                if (this.impediment.value === 'Nenhum') {

                    this.impediment.value = ''
                }
                console.log('oi', this.impediment.value);
                this.idDaily.value = result._id;

            })
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#idDaily');

        if (noFalse(this.addVals)) {

            const daily = new DailyNote(
                this.yesterday.value.toString(),
                this.today.value.toString(),
                new Date(),
                this.impediment.value.toString()
            )

            const dailyService = new DailyNoteService();
            return dailyService.update(daily, this.idDaily.value.toString())

        }
    }
}