System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, PostGOBView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            PostGOBView = class PostGOBView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                    this.lastModel = null;
                }
                template(model) {
                    this.lastModel = model;
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
                        
                        <div class="d-flex align-items-center">
                            <h2>${model.Title}</h2>
                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
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

        `;
                }
                update(model) {
                    super.update(model);
                    if (this.didMountFn)
                        this.didMountFn();
                }
                didMount(cb) {
                    this.didMountFn = cb;
                }
            };
            exports_1("PostGOBView", PostGOBView);
        }
    };
});
