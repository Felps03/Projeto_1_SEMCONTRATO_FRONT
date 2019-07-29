System.register(["../services/HelpCenterServiceAsk", "../helpers/index", "../validation/helpCenterAskValidate", "../utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterServiceAsk_1, index_1, vals, listCheck_1, EditAnswerHelpCenterController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterServiceAsk_1_1) {
                HelpCenterServiceAsk_1 = HelpCenterServiceAsk_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (vals_1) {
                vals = vals_1;
            },
            function (listCheck_1_1) {
                listCheck_1 = listCheck_1_1;
            }
        ],
        execute: function () {
            EditAnswerHelpCenterController = class EditAnswerHelpCenterController {
                constructor() {
                    this.answer = document.querySelector('#edit-answer');
                    this.addVals = [
                        index_1.validate(this.answer, vals.comment),
                    ];
                }
                update(event) {
                    event.preventDefault();
                    let id = document.querySelector('#idHelpCenterAnswer');
                    if (listCheck_1.noFalse(this.addVals)) {
                        const askService = new HelpCenterServiceAsk_1.HelpCenterAskService();
                    }
                }
            };
            exports_1("EditAnswerHelpCenterController", EditAnswerHelpCenterController);
        }
    };
});
