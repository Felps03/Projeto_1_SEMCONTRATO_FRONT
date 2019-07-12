
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

        this.postAsksView.childrenDidMount((postAsk: PostAsk) => {

            const editForm = document.getElementById(`comment-edit-form-${postAsk.Id}`)
            // console.log(editForm);

            const deleteBtn = document.getElementById(`comment-del-${postAsk.Id}`)
            // console.log(' ~~~ ~', deleteBtn)

            //debugger

            if (editForm) {
                editForm.addEventListener('submit', this.update.bind(this, postAsk.Id))
            }
            if (deleteBtn) {
                deleteBtn.addEventListener('click', this.delete.bind(this, postAsk.Id))
            }

            // init validations

            // if one exists, both exist
            // if (this.editTitle) {
            //     this.editVals = [
            //         validate(this.editTitle, vals.title),
            //         validate(this.editDesc, vals.desc),
            //     ]
            // }
        })
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
                this.listByPost(event);
                // $('#add-modal').modal('hide');
            })
            .catch(error => {
                console.error(error)
            })
    }


    update(id: string, event: Event) {
        event.preventDefault();

        const postIdField = document.getElementById('post-meta')
        const textareaEl = <HTMLInputElement>document.querySelector(`#comment-edit-form-${id} textarea`)

        if (!textareaEl) {
            return
        }

        if (!(postIdField)) {
            return
        }

        const ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
            return
        }

        const postAsk = new PostAsk(ID_POST, textareaEl.value, localStorage.getItem('id') || '', id);

        // console.log(postAsk);
        // const postAsk = new PostAsk("teste", "teste", "teste");
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.update(postAsk, id)
            .then(result => {
                return result.json()
            }).then(res => {
                // $('#add-modal').modal('hide');
                this.listByPost(event)
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
                //console.log(res);
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
                // console.log('CHE', res);

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

    delete(id: string, event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.remove(id)
            .then(result => {
                return result.json()
            }).then(res => {
                // console.log(res);
                this.listByPost(event)
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
                //   console.log(res);
            })
            .catch(error => {
                console.error(error)
            });
    }
}