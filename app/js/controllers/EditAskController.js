System.register(["../services/HelpCenterServiceAsk", "../models/PostAsk", "../helpers/index", "../validation/helpCenterAskValidate", "../utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterServiceAsk_1, PostAsk_1, index_1, vals, listCheck_1, EditAskController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterServiceAsk_1_1) {
                HelpCenterServiceAsk_1 = HelpCenterServiceAsk_1_1;
            },
            function (PostAsk_1_1) {
                PostAsk_1 = PostAsk_1_1;
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
            EditAskController = class EditAskController {
                constructor() {
                    this.desc = document.querySelector('#edit-desc');
                    this.idAsk = document.querySelector('#idAsk');
                    this.addVals = [
                        index_1.validate(this.desc, vals.comment)
                    ];
                }
                getAskData(id) {
                    const askService = new HelpCenterServiceAsk_1.HelpCenterServiceAsk();
                    return askService.findById(id)
                        .then(res => res.json())
                        .then(result => {
                        this.id_helpCenter = result.id_helpCenter;
                        this.id_user = result.id_user;
                        this.desc.value = result.desc;
                        this.idAsk.value = result._id;
                        this.date = result.date;
                    });
                }
                update(event) {
                    event.preventDefault();
                    let id = document.querySelector('#idAsk');
                    if (listCheck_1.noFalse(this.addVals)) {
                        const postAsk = new PostAsk_1.PostAsk(this.id_helpCenter, this.desc.value.toString(), this.id_user, this.authorName = "", id.value.toString(), this.date);
                        console.log(postAsk);
                        const helpCenterServiceAsk = new HelpCenterServiceAsk_1.HelpCenterServiceAsk();
                        return helpCenterServiceAsk.update(postAsk, id.value.toString());
                    }
                }
            };
            exports_1("EditAskController", EditAskController);
        }
    };
});
