System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, AnswersView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            AnswersView = class AnswersView extends View_1.View {
                constructor(selector, escape = false) {
                    super(selector, escape);
                    this.lastModel = null;
                }
                template(model, page = 1) {
                    this.lastModel = model;
                    let result = `
            <div class="container">
        `;
                    model.toArray().forEach(PostAsk => {
                        result += `${console.log('resposta:', PostAsk)}
                        <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                                <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                                    <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                                        <div>
                                            <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                                            <h5 class="mt-2 mb-2">${PostAsk.AuthorName ? PostAsk.AuthorName : ""}</h5>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                
                                <div class="col-md-9 col-12 card-body">
                                    <div class="card mb-2">
                                        <div class="card-body">
                                            <p>${PostAsk.Desc}</p>
                                        </div>
                                    </div>
                                
                                ${PostAsk.Id_user === localStorage.getItem('id') ? `<a class="can-delete" data-id="${PostAsk.Id}" href="#">Deletar</a>` : ""}
                                    
                                ${PostAsk.Id_user === localStorage.getItem('id') ? `<a class="can-edit" data-id="${PostAsk.Id}" href="./../help-ask-edit.html?id=${PostAsk.Id}&owner=${PostAsk.Id_user}">Editar</a>` : ""}
                                </div>
                            </div>
                        </div>`;
                    });
                    return result;
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
            exports_1("AnswersView", AnswersView);
        }
    };
});
