System.register(["../services/index", "../models/PostAsk", "../views/AnswerView", "../models/index", "../helpers/index", "../validation/helpCenterAskValidate", "../utils/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, PostAsk_1, AnswerView_1, index_2, index_3, vals, index_4, HelpCenterAskController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (PostAsk_1_1) {
                PostAsk_1 = PostAsk_1_1;
            },
            function (AnswerView_1_1) {
                AnswerView_1 = AnswerView_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (vals_1) {
                vals = vals_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            }
        ],
        execute: function () {
            HelpCenterAskController = class HelpCenterAskController {
                constructor() {
                    this.AnswerView = new AnswerView_1.AnswerView('#answer_result');
                    this.addComment = document.getElementById('comment');
                    const addForm = document.getElementById('comment-form');
                    if (addForm)
                        addForm.addEventListener('submit', this.add.bind(this));
                    this.addVals = [
                        index_3.validate(this.addComment, vals.comment)
                    ];
                    this.editVals = new Map();
                }
                add(event) {
                    event.preventDefault();
                    if (index_4.noFalse(this.addVals)) {
                        const postIdField = document.getElementById('post-meta');
                        if (!(postIdField)) {
                            return;
                        }
                        const ID_POST = postIdField.getAttribute('data-id');
                        if (!ID_POST) {
                            return;
                        }
                        const postAsk = new PostAsk_1.PostAsk(ID_POST, this.addComment.value, localStorage.getItem('id') || '');
                        const helpCenterService = new index_1.HelpCenterServiceAsk();
                        helpCenterService.add(postAsk)
                            .then(result => {
                            return result.json();
                        }).then(res => {
                            this.listByPost(event);
                        })
                            .catch(error => {
                            console.error(error);
                        });
                    }
                }
                update(id, event) {
                    event.preventDefault();
                    if (index_4.noFalse(this.editVals.get(id))) {
                        const postIdField = document.getElementById('post-meta');
                        const textareaEl = document.querySelector(`#comment-edit-form-${id} textarea`);
                        if (!textareaEl) {
                            return;
                        }
                        if (!(postIdField)) {
                            return;
                        }
                        const ID_POST = postIdField.getAttribute('data-id');
                        if (!ID_POST) {
                            return;
                        }
                        const postAsk = new PostAsk_1.PostAsk(ID_POST, textareaEl.value, localStorage.getItem('id') || '', id);
                        const helpCenterService = new index_1.HelpCenterServiceAsk();
                        helpCenterService.update(postAsk, id)
                            .then(result => {
                            return result.json();
                        }).then(res => {
                            this.listByPost(event);
                        })
                            .catch(error => {
                            console.error(error);
                        });
                    }
                }
                list(event) {
                    event.preventDefault();
                    const helpCenterService = new index_1.HelpCenterServiceAsk();
                    helpCenterService.list(1)
                        .then(result => {
                        return result.json();
                    }).then(res => {
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
                listByPost(event) {
                    event.preventDefault();
                    const postIdField = document.getElementById('post-meta');
                    if (!(postIdField)) {
                        return;
                    }
                    const ID_POST = postIdField.getAttribute('data-id');
                    if (!ID_POST) {
                        return;
                    }
                    const helpCenterService = new index_1.HelpCenterServiceAsk();
                    helpCenterService.list(1)
                        .then(result => {
                        return result.json();
                    }).then(res => {
                        this.AnswersView.update(index_2.PostAsks.from(res.filter((ask) => ask['id_helpCenter'] === ID_POST)));
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
                delete(id, event) {
                    event.preventDefault();
                    const helpCenterService = new index_1.HelpCenterServiceAsk();
                    helpCenterService.remove(id)
                        .then(result => {
                        return result.json();
                    }).then(res => {
                        this.listByPost(event);
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
                findByID(id, event) {
                    event.preventDefault();
                    const helpCenterService = new index_1.HelpCenterServiceAsk();
                    helpCenterService.findById(id)
                        .then(result => {
                        return result.json();
                    }).then(res => {
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
            };
            exports_1("HelpCenterAskController", HelpCenterAskController);
        }
    };
});
