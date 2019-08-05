System.register(["./View", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, PostAskView;
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
            PostAskView = class PostAskView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                    this.editing = false;
                    this.lastModel = null;
                }
                template(model) {
                    this.lastModel = model;
                    const canEdit = model.Author === localStorage.getItem('id') || localStorage.getItem('isAdmin') === 'true';
                    return `
            <div class="card mb-2">
                <div class="card-body inline-block">
                    <h5>${escapeTag_1.escapeTag(model.AuthorName)}</h5>
                    <p class="mt-2 mb-2">${model.Date}</p>
                    <form action="" class="comment-edit" id="comment-edit-form-${model.Id}">

                    ${model.Author ? canEdit && this.editing ? `
                    <div class="form-group">
                        <textarea name="first" class="form-control form-control-sm input-circle"
                            id="comment-edit-${model.Id}" placeholder="Sugira soluções ou contribua à discussão"
                            autofocus>${escapeTag_1.escapeTag(model.Desc)}</textarea>
                        <div id="comment-editvalidator"></div>
                    </div>
                    ` : `<p>${escapeTag_1.escapeTag(model.Desc)}</p>` : ''}

                    ${model.Author ? canEdit && this.editing ? `
                    <button type="submit"
                        class="btn btn-warning d-flex align-items-center">Enviar <i
                            class="material-icons ml-2">send</i></button>
                    ` : '' : ''}

                    </form>
                </div>
                
                <div class="d-inline-flex d-row justify-content-end align-items-center float-right ${model.Author ? canEdit ? '' : 'invisible' : 'invisible'}">
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
                update(model) {
                    super.update(model);
                    if (this.lastModel) {
                        const editBtn = document.getElementById(`edit-comment-${model.Id}`);
                        if (editBtn) {
                            editBtn.addEventListener('click', this.toggleEditing.bind(this));
                        }
                    }
                    if (this.didMountFn)
                        this.didMountFn(model);
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
            exports_1("PostAskView", PostAskView);
        }
    };
});
