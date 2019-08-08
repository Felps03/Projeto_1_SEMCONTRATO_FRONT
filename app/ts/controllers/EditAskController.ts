import { HelpCenterServiceAsk } from '../services/HelpCenterServiceAsk';
import { PostAsk } from '../models/PostAsk';

import { validate } from '../helpers/index'
import * as vals from '../validation/helpCenterAskValidate';
import { noFalse } from '../utils/listCheck';

export class EditAskController {

    private  id_helpCenter: string;

    private id_user: string;

    private desc: HTMLInputElement;

    private idAsk: HTMLInputElement;

    private authorName: string;

    private date: Date;

    private addVals: (() => boolean)[];

    constructor() {
       // this.id_helpCenter = "";
        //this.id_helpCenter = "";
        this.desc = <HTMLInputElement>document.querySelector('#edit-desc');
        this.idAsk = <HTMLInputElement>document.querySelector('#idAsk');
        //this.id_helpCenter = "";


        this.addVals = [
            validate(this.desc, vals.comment)
        ];
    }


    getAskData(id: string) {
        
        const askService = new HelpCenterServiceAsk();
        return askService.findById(id)
            .then(res => res.json())
            .then(result => {
                this.id_helpCenter = result.id_helpCenter;
                this.id_user = result.id_user;
                this.desc.value = result.desc;
                this.idAsk.value = result._id;
                this.date = result.date;

            })
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#idAsk');
        //console.log(id.value);

        if (noFalse(this.addVals)) {

            const postAsk = new PostAsk(
                this.id_helpCenter,
                this.desc.value.toString(),
                this.id_user,
                this.authorName="",
                id.value.toString(),
                this.date
            )
            //console.log(this);
            console.log(postAsk);
  
            const helpCenterServiceAsk = new HelpCenterServiceAsk();
            return helpCenterServiceAsk.update(postAsk, id.value.toString())
        
        }
    }
}