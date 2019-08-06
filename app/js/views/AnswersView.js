System.register(["./View", "../utils/escapeTag"], function (exports_1, context_1) {
    "use strict";
    var View_1, escapeTag_1, AnswersView;
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
            AnswersView = class AnswersView extends View_1.View {
                template(model, page = 1) {
                    return `
            <div class="container">
                ${model.toArray().map((PostAsk, i) => `
                <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                    <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                        <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                            <div>
                                <!-- <img class="rounded-circle" width="70" src="app/img/teste.jpg" alt="Card image cap"> -->
                                <h5 class="mt-2 mb-2">${PostAsk.AuthorName ? escapeTag_1.escapeTag(PostAsk.AuthorName) : ""}</h5>
                            </div>
                            
                            <a href="app-help-asks.html?id=${PostAsk.Id}?page=${page}">
                            </a>

                        </div>
                    </div>
                    <div class="col-md-9 col-12 card-body">
                        <div class="card mb-2">
                            <div class="card-body">
                                <p>${escapeTag_1.escapeTag(PostAsk.Desc)}</p>
                            </div>
                        </div>
                    ${PostAsk.Id === localStorage.getItem('id') ? `<button id="delete-answer">Excluir</button>` : ''}
                    </div>
                </div>
                `).join('')}
            </div>
            `;
                }
            };
            exports_1("AnswersView", AnswersView);
        }
    };
});
