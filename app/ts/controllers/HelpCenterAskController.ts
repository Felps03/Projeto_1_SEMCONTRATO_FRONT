
import { HelpCenterAskService } from '../services/index';
import { PostAsk } from '../models/PostAsk';
import { PostAsksView } from "../views/PostAsksView";
import { PostAsks } from '../models/index';

export class HelpCenterAskController {

    private postAsksView: PostAsksView

    private addComment: HTMLInputElement

    constructor() {
        this.postAsksView = new PostAsksView('#post-ask-list')

        this.addComment = <HTMLInputElement>document.getElementById('comment')

        const addForm = document.getElementById('comment-form')
        if (addForm)
            addForm.addEventListener('submit', this.add.bind(this))
    }

    add(event: Event) {
        event.preventDefault();

        const postIdField = document.getElementById('post-meta')

        if (!(postIdField)) {
            return
        }

        const ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
            return
        }

        const postAsk = new PostAsk(ID_POST, this.addComment.value, localStorage.getItem('id') || '');

        const helpCenterService = new HelpCenterAskService();
        helpCenterService.add(postAsk)
            .then(result => {
                return result.json()
            }).then(res => {
                console.table(res);
                // $('#add-modal').modal('hide');
            })
            .catch(error => {
                console.error(error)
            })
    }


    update(event: Event) {
        event.preventDefault();

        const postAsk = new PostAsk("teste", "teste", "teste");
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.update(postAsk, '1')
            .then(result => {
                return result.json()
            }).then(res => {
                console.table(res);
                // $('#add-modal').modal('hide');
            })
            .catch(error => {
                console.error(error)
            })
    }

    list(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.list(1)
            .then(result => {
                return result.json()
            }).then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error)
            })
    }

    listByPost(event: Event) {
        event.preventDefault();

        const postIdField = document.getElementById('post-meta')

        if (!(postIdField)) {
            return
        }

        const ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
            return
        }

        const helpCenterService = new HelpCenterAskService();
        helpCenterService.list(1)
            .then(result => {
                return result.json()
            }).then(res => {
                console.log('CHE', res);

                this.postAsksView.update(
                    PostAsks.from(
                        res.filter((ask: any) => ask['id_helpCenter'] === ID_POST)
                    )
                )
            })
            .catch(error => {
                console.error(error)
            })
    }

    delete(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.remove('id')
            .then(result => {
                return result.json()
            }).then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error)
            });
    }

    findByID(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.findById('title')
            .then(result => {
                return result.json()
            }).then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error)
            });
    }
}