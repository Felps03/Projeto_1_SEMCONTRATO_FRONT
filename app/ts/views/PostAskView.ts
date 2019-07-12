import { View } from './View';
import { PostAsk } from '../models/index';

export class PostAskView extends View<PostAsk> {

    private editing: boolean
    private lastModel: PostAsk | null
    private didMountFn: Function

    constructor(selector: string, escape: boolean = false) {
        super(selector, escape)

        this.editing = false
        this.lastModel = null
    }

    template(model: PostAsk): string {

        this.lastModel = model

        return `
            <div class="card mb-2">
                <div class="card-body inline-block">
                    <h5>${model.AuthorName}</h5>
                    <form action="" class="comment-edit" id="comment-edit-form-${model.Id}">

                    ${ this.editing ? `
                    <div class="form-group">
                        <textarea name="first" class="form-control form-control-sm input-circle"
                            id="comment-edit-${model.Id}" placeholder="Sugira soluções ou contribua à discussão"
                            autofocus>${model.Desc}</textarea>
                        <div id="comment-editvalidator"></div>
                    </div>
                    ` : `<p>${model.Desc}</p>`}

                    ${ this.editing ? `
                    <button type="submit"
                        class="btn btn-warning d-flex align-items-center">Enviar <i
                            class="material-icons ml-2">send</i></button>
                    ` : ''}

                    </form>
                </div>
                
                <div class="d-inline-flex d-row justify-content-end align-items-center float-right ${ model.Author ? model.Author === localStorage.getItem('id') ? '' : 'invisible' : 'invisible'}">
                    <button type="button" id="comment-del-${model.Id}" class="btn btn-outline-danger btn-sm pt-2 ml-1">
                        <i class="small material-icons">delete</i>
                    </button>
                    <button type="button" class="btn btn-outline-warning btn-sm pt-2 ml-1" id="edit-comment-${model.Id}">
                        <i class="small material-icons">edit</i>
                    </button>
                </div>
            </div>
        `;
    }

    update(model: PostAsk) {
        super.update(model)

        if (this.lastModel) {
            const editBtn = document.getElementById(`edit-comment-${model.Id}`)

            if (editBtn) {
                editBtn.addEventListener('click', this.toggleEditing.bind(this))
            }
        }

        if (this.didMountFn)
            this.didMountFn(model)
    }

    toggleEditing() {
        this.editing = !this.editing

        if (this.lastModel) {
            this.update(this.lastModel)
        }
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }
}