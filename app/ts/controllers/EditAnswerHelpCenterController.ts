import { HelpCenterAskService } from '../services/HelpCenterServiceAsk';
import { Post } from '../models/Post';

import { validate } from '../helpers/index'
import * as vals from '../validation/helpCenterAskValidate';
import { noFalse } from '../utils/listCheck';
import { PostAsk } from '../models/index';

export class EditAnswerHelpCenterController {
    private answer: HTMLInputElement;

    private addVals: (() => boolean)[];

    constructor() {
        this.answer = <HTMLInputElement>document.querySelector('#edit-answer');

        this.addVals = [
            validate(this.answer, vals.comment),

        ];
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#idHelpCenterAnswer');

        if (noFalse(this.addVals)) {

            // this.idDaily.value.toString(),

            // const ask = new PostAsk(
            //     this..value.toString()


            //     res.id_helpCenter, res.text, res.id_user, res.owner, res.id_answer
            // )
            // console.log(daily);
            // console.log(this.idDaily.value.toString())
            const askService = new HelpCenterAskService();
            // return askService.update(ask, this.id.value.toString())
            // .then(res => {
            //     if (res.status === 200) {

            //     }
            // })

        }

    }
}