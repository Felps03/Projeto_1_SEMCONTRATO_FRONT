System.register(["../services/HelpCenterService", "../models/Post", "../helpers/index", "../validation/helpCenterValidate", "../utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var HelpCenterService_1, Post_1, index_1, vals, listCheck_1, EditHelpController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (HelpCenterService_1_1) {
                HelpCenterService_1 = HelpCenterService_1_1;
            },
            function (Post_1_1) {
                Post_1 = Post_1_1;
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
            EditHelpController = class EditHelpController {
                constructor() {
                    this.title = document.querySelector('#edit-title');
                    this.desc = document.querySelector('#edit-desc');
                    this.idHelp = document.querySelector('#idHelp');
                    this.addVals = [
                        index_1.validate(this.title, vals.title),
                        index_1.validate(this.desc, vals.desc)
                    ];
                }
                getHelpData(id) {
                    const helpService = new HelpCenterService_1.HelpCenterService();
                    return helpService.listByID(id)
                        .then(res => res.json())
                        .then(result => {
                        console.log(result);
                        this.title.value = result.title;
                        this.desc.value = result.desc;
                        this.authorId = result.id_user;
                        this.date = result.date;
                        this.idHelp.value = result._id;
                    });
                }
                update(event) {
                    event.preventDefault();
                    let id = document.querySelector('#idHelp');
                    if (listCheck_1.noFalse(this.addVals)) {
                        const post = new Post_1.Post(this.title.value.toString(), this.desc.value.toString(), this.authorId, this.authorName = "", this.date, id.value.toString());
                        console.log(post);
                        const helpCenterService = new HelpCenterService_1.HelpCenterService();
                        return helpCenterService.update(post, id.value.toString());
                    }
                }
            };
            exports_1("EditHelpController", EditHelpController);
        }
    };
});
