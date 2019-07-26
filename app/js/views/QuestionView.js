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
            <input type="text" name="title" id="edit-title"
            class="form-control form-control input-circle"
            placeholder="Pesquisar por título" value="${model.Title}">

        `;
                }
            };
            exports_1("QuestionView", QuestionView);
        }
    };
});
