import { View } from './View';
import { PostGOB } from '../models/index';

export class PostGOBView extends View<PostGOB> {

    private lastModel: PostGOB | null
    private didMountFn: Function

    constructor(selector: string, escape: boolean = false) {
        super(selector, escape)

        this.lastModel = null
    }

    template(model: PostGOB): string {

        this.lastModel = model

        return `
            
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Pergunta</h5>
                        <button id="view-modal-close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div id="post-meta" data-id="${model.Id}"></div>

                        <form action="" id="edit-form">
                            <div class="word-cut">
                                <div class="d-flex align-items-center">
                                    <h2>${model.Title}</h2>
                                    <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                                </div>
                            </div>
                            <p>${model.Desc.replace('\n', '<br>')}</p>

                        </form>

                    </div>

                    <div id="post-ask-list"></div>

                    <div class="container border-top p-3">

                        <form action="" id="comment-form">
                            <div class="form-group">
                                <label for="first">Comentar:</label>
                                <textarea name="first" class="form-control form-control-sm input-circle"
                                    id="comment" placeholder="Sugira soluções ou contribua à discussão"
                                    autofocus></textarea>
                                <div id="commentvalidator"></div>
                            </div>
                            
                            <!--<div class="d-inline-flex d-row justify-content-end align-items-center float-right">
                                <button type="button" class="btn btn-secondary m-1"
                                    data-dismiss="modal">Cancelar</button>
                                <button type="submit"
                                    class="btn btn-primary d-flex align-items-center">Enviar <i
                                        class="material-icons ml-2">send</i></button>
                            </div>-->
                        </form>

                    </div>
                </div>
            

        `
    }

    update(model: PostGOB) {
        super.update(model)

        if (this.didMountFn)
            this.didMountFn()
    }

    didMount(cb: Function) {
        this.didMountFn = cb
    }
}