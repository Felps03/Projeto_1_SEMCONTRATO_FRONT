import { HelpCenterService } from '../services/HelpCenterService';
import { Post } from '../models/Post';

import { validate } from '../helpers/index'
import * as vals from '../validation/helpCenterValidate';
import { noFalse } from '../utils/listCheck';

export class EditHelpController {

    private title: HTMLInputElement;

    private authorId: string;

    private desc: HTMLInputElement;

    private idHelp: HTMLInputElement;

    private authorName: string;

    private date: Date;

    private addVals: (() => boolean)[];

    constructor() {

        this.title = <HTMLInputElement>document.querySelector('#edit-title');
        this.desc = <HTMLInputElement>document.querySelector('#edit-desc');
        this.idHelp = <HTMLInputElement>document.querySelector('#idHelp');


        this.addVals = [
            validate(this.title, vals.title),
            validate(this.desc, vals.desc)
        ];
    }


    getHelpData(id: string) {

        const helpService = new HelpCenterService();
        return helpService.listByID(id)
            .then(res => {
                if (res.status == 200) {
                    document.getElementById('load-view').setAttribute('hidden', 'true');
                }
                return res.json()
            })
            .then(result => {
                console.log(result);
                this.title.value = result.title;
                this.desc.value = result.desc;
                this.authorId = result.id_user;
                this.date = result.date;
                this.idHelp.value = result._id;
            })
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#idHelp');
        //console.log(id.value);

        if (noFalse(this.addVals)) {

            const post = new Post(
                this.title.value.toString(),
                this.desc.value.toString(),
                this.authorId,
                this.authorName = "",
                this.date,
                id.value.toString()
            )
            //console.log(this);
            console.log(post);

            const helpCenterService = new HelpCenterService();
            return helpCenterService.update(post, id.value.toString())

        }
    }
}