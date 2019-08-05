import { HelpCenterServiceAsk } from '../services/HelpCenterServiceAsk';
import { PostAsk } from '../models/PostAsk';

import { validate } from '../helpers/index'
import * as vals from '../validation/HelpCenterServiceAsk';
import { noFalse } from '../utils/listCheck';

export class EditAskController {

    private yesterday: HTMLInputElement;

    private idDaily: HTMLInputElement;

    private addVals: (() => boolean)[];

    constructor() {
        this.desc = <HTMLInputElement>document.querySelector('#edit-desc');
        this.idAsk = <HTMLInputElement>document.querySelector('#idAsk');

        this.addVals = [
            validate(this.desc, vals.desc)
        ];
    }

    getAskData(id: string) {
        
        const askService = new HelpCenterServiceAsk();
        return askService.findById(id)
            .then(res => res.json())
            .then(result => {
                
                this.desck.value = result.desc;
                this.idAsk.value = result._id;

            })
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#idAsk');

        if (noFalse(this.addVals)) {

            const postAsk = new PostAsk(
                this.
                this.desc.value.toString(),
                new Date()
            )
  
            const dailyService = new DailyNoteService();
            return dailyService.update(daily, this.idDaily.value.toString())
        
        }
    }
}