System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, QuestionView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            QuestionView = class QuestionView extends View_1.View {
                template(model) {
                    return `
        
        <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
        <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
            <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                <div>
                    <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                    <h5 class="mt-2 mb-2">${model.AuthorName ? model.AuthorName : ""}</h5>
                </div>
            </div>
        </div>
        <div class="col-md-9 col-12 card-body">
            <div class="card mb-2">
                <div class="card-body">

                    <h5>${model.Title}</h5>
                    <p>${model.Desc}</p>
                </div>
            </div>
            ${model.Id === localStorage.getItem('id') ? `<button id="delete-answer">Excluir</button> <button id="edit-answer">Editar</button>` : ''}

        </div>
    </div>

        `;
                }
            };
            exports_1("QuestionView", QuestionView);
        }
    };
});
