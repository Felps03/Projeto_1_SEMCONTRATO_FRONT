System.register(["./View", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, PostView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            },
            function (escapeTag_1_1) {
                escapeTag_1 = escapeTag_1_1;
            }
        ],
        execute: function () {
            PostView = class PostView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                    this.editing = false;
                    this.lastModel = null;
                }
                template(model) {
                    this.lastModel = model;
                    const canEdit = model.AuthorId === localStorage.getItem('id') || localStorage.getItem('isAdmin') === 'true';
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
                        ${model.AuthorId ? canEdit && this.editing ? `
                        <div class="form-group">
                            <label for="edit-title">Título:</label>
                            <div class="input-group">
                                <input type="text" name="title" id="edit-title"
                                    class="form-control form-control input-circle"
                                    placeholder="Pesquisar por título" value="${escapeTag_1.escapeTag(model.Title)}">
                                <div id="edit-titlevalidator"></div>
                            </div>
                        </div>` : `
                        <div class="d-flex align-items-center">
                            <h2>${escapeTag_1.escapeTag(model.Title)}</h2>
                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                        </div>` : ''}

                        ${model.AuthorId ? canEdit && this.editing ? `
                        <div class="form-group">
                            <label for="edit-desc">Descrição:</label>
                            <div class="input-group">
                                <textarea name="desc" class="form-control input-circle" id="edit-desc"
                                    placeholder="Pesquisar por descrição" autofocus>${escapeTag_1.escapeTag(model.Desc)}</textarea>
                                <div id="edit-descvalidator"></div>
                            </div>
                        </div>` : `
                        <p>${escapeTag_1.escapeTag(model.Desc).replace('\n', '<br>')}</p>` : ''}

                        ${model.AuthorId ? canEdit && this.editing ? `
                        <button type="submit"
                            class="btn btn-warning d-flex align-items-center">Enviar <i
                                class="material-icons ml-2">send</i></button>
                        ` : '' : ''}

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

                        <div class="d-inline-flex d-row justify-content-start align-items-center ${model.AuthorId ? canEdit ? '' : 'invisible' : 'invisible'} ">
                        <div>  </div>
                            <button type="button" id="delete-btn" class="btn btn-outline-danger btn-sm pt-2 ml-1" data-toggle="modal" data-target="#confirm-del-modal">
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
        
        `;
                }
                update(model) {
                    super.update(model);
                    if (this.lastModel) {
                        const editBtn = document.getElementById('edit-btn');
                        if (editBtn) {
                            editBtn.addEventListener('click', this.toggleEditing.bind(this));
                        }
                    }
                    if (this.didMountFn)
                        this.didMountFn();
                }
                toggleEditing() {
                    this.editing = !this.editing;
                    if (this.lastModel) {
                        this.update(this.lastModel);
                    }
                }
                didMount(cb) {
                    this.didMountFn = cb;
                }
            };
            exports_1("PostView", PostView);
        }
    };
});
