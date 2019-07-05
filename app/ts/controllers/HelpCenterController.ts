import { Post, User } from '../models/index';
import { HelpCenterService, UserService } from '../services/index';

import { validate } from '../helpers/index'
import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck'
import { PostsView } from '../views/PostsView';

export class DailyNoteController {

    private searchTitle: HTMLInputElement
    private searchDesc: HTMLInputElement

    private addTitle: HTMLInputElement
    private addDesc: HTMLInputElement

    private postsView: PostsView

    constructor() {
        this.searchTitle = <HTMLInputElement>document.getElementById('search-title')
        this.searchDesc = <HTMLInputElement>document.getElementById('search-desc')

        this.addTitle = <HTMLInputElement>document.getElementById('add-title')
        this.addDesc = <HTMLInputElement>document.getElementById('add-desc')

        this.postsView = new PostsView('#post-list')

        // init validations
    }

    add(event: Event) {
        event.preventDefault();

        const helpCenterService = new HelpCenterService()
        helpCenterService.add(
            this.addTitle.value,
            this.addDesc.value
        )
    }

    list(event: Event) {
        event.preventDefault();

        const helpCenterService = new HelpCenterService()
        helpCenterService.list()
            .then(res => {
                const userService = new UserService()
                /*const author = userService.lista()
                    .then(res => res.forEach(user => {
                        if (user.id === res.user_id)
                            return user
                    }))*/
            })
    }

}

// update(event: Event) {
//     event.preventDefault();
//     if (noFalse(this.editVals)) {
//         ...
//     }
// }
// }