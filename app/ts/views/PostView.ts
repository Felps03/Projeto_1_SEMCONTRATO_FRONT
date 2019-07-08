import { View } from './View';
import { Post } from '../models/index';

export class PostView extends View<Post> {

    private editing: boolean
    private lastModel: Post | null

    constructor(selector: string, escape: boolean = false) {
        super(selector, escape)

        this.editing = false
        this.lastModel = null
    }

    template(model: Post): string {

        this.lastModel = model

        return `
            <!-- view modal -->
            <div id="view-modal" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Pergunta</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            ${this.editing ? `<div class="form-group">
                                <label for="search-title">Título:</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="material-icons">search</i></span>
                                    </div>
                                    <input type="text" name="search-title" id="search-title"
                                        class="form-control form-control input-circle"
                                        placeholder="Pesquisar por título" autofocus>
                                    <div id="search-titlevalidator"></div>
                                </div>
                            </div>` : ''}

                            <div class="d-flex align-items-center">
                                <h2>${model.Title}</h2>
                                <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                            </div>

                            ${this.editing ? `<div class="form-group">
                                <label for="search-desc">Descrição:</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="material-icons">search</i></span>
                                    </div>
                                    <textarea name="search-desc" class="form-control input-circle" id="search-desc"
                                        placeholder="Pesquisar por descrição" autofocus></textarea>
                                    <div id="search-descvalidator"></div>
                                </div>
                            </div>` : ''}

                            <p>${model.Desc}</p>
                        </div>
                        <div class="container border-top p-3">

                            <form action="" id="comment-form">
                                <div class="form-group">
                                    <label for="first">Comentar:</label>
                                    <textarea name="first" class="form-control form-control-sm input-circle"
                                        id="comment" placeholder="Sugira soluções ou contribua à discussão"
                                        autofocus></textarea>
                                    <div id="commentvalidator"></div>
                                </div>

                                <div class="d-inline-flex d-row justify-content-start align-items-center ${ model.Author ? model.Author.Email === localStorage.getItem('email') ? '' : 'invisible' : 'invisible'} ">
                                    <button type="button" id="delete-btn" class="btn btn-outline-danger btn-sm pt-2 ml-1">
                                        <i class="small material-icons">delete</i>
                                    </button>
                                    <button type="button" id="edit-btn" class="btn btn-outline-warning btn-sm pt-2 ml-1">
                                        <i class="small material-icons">edit</i>
                                    </button>
                                </div>
                                
                                <div class="d-inline-flex d-row justify-content-end align-items-center float-right">
                                    <button type="button" class="btn btn-secondary m-1"
                                        data-dismiss="modal">Cancelar</button>
                                    <button type="submit"
                                        class="btn btn-primary d-flex align-items-center">Enviar <i
                                            class="material-icons ml-2">send</i></button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        `
    }

    toggleEditing() {
        this.editing = !this.editing

        if (this.lastModel)
            this.update(this.lastModel)
    }
}