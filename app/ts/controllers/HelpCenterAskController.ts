
import { HelpCenterServiceAsk } from '../services/index';
import { PostAsk } from '../models/PostAsk';
import { AnswerView } from "../views/AnswerView";
import { AnswersView } from "../views/AnswersView";
import { PostAsks } from '../models/index';
import { validate } from '../helpers/index';
import * as vals from '../validation/helpCenterAskValidate';
import { noFalse } from '../utils/index';

export class HelpCenterAskController {

    private AnswerView: AnswerView

    private AnswersView: AnswersView

    private addComment: HTMLInputElement
    private editComments: HTMLInputElement[]

    private addVals: (() => boolean)[]
    // map id to array of validation functions
    private editVals: Map<string, (() => boolean)[]>

    constructor() {
        this.AnswerView = new AnswerView('#answer_result')

        this.addComment = <HTMLInputElement>document.getElementById('comment')

        const addForm = document.getElementById('comment-form')
        if (addForm)
            addForm.addEventListener('submit', this.add.bind(this))

        // init validations
        this.addVals = [
            validate(this.addComment, vals.comment)
        ]
        this.editVals = new Map<string, (() => boolean)[]>()
    }

    add(event: Event) {
        event.preventDefault();
        if (noFalse(this.addVals)) {

            const postIdField = document.getElementById('post-meta')

            if (!(postIdField)) {
                return
            }

            const ID_POST = postIdField.getAttribute('data-id');

            if (!ID_POST) {
                return
            }

            const postAsk = new PostAsk(ID_POST, this.addComment.value, localStorage.getItem('id') || '');

            const helpCenterService = new HelpCenterServiceAsk();

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
    }


    update(id: string, event: Event) {
        event.preventDefault();

        if (noFalse(this.editVals.get(id))) {

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
            const helpCenterService = new HelpCenterServiceAsk();
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
    }

    list(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterServiceAsk();
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

        const helpCenterService = new HelpCenterServiceAsk();
        helpCenterService.list(1)
            .then(result => {
                return result.json()
            }).then(res => {

                this.AnswersView.update(
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
        const helpCenterService = new HelpCenterServiceAsk();
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

    findByID(id: string, event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterServiceAsk();
        helpCenterService.findById(id)
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