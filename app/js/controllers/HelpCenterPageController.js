System.register(["../models/index", "../services/index", "../views/QuestionView", "../views/AnswersView", "../views/PaginationView"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, QuestionView_1, AnswersView_1, PaginationView_1, HelpCenterPageController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (QuestionView_1_1) {
                QuestionView_1 = QuestionView_1_1;
            },
            function (AnswersView_1_1) {
                AnswersView_1 = AnswersView_1_1;
            },
            function (PaginationView_1_1) {
                PaginationView_1 = PaginationView_1_1;
            }
        ],
        execute: function () {
            HelpCenterPageController = class HelpCenterPageController {
                constructor(currentPage = 1, totalPages = 1) {
                    this.url = new URLSearchParams(location.search);
                    this.currentPage = currentPage;
                    this.totalPages = totalPages;
                    this.type = 2;
                    this.url_ask_id = this.url.get('id');
                    this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-help-asks.html');
                    this.answersView = new AnswersView_1.AnswersView('#post-ask-list');
                    this.addComment = document.querySelector('#answer');
                    this.paginationView.update(this.currentPage, this.totalPages, this.type, this.url_ask_id);
                }
                set CurrentPage(page) {
                    this.currentPage = page;
                    this.paginationView.update(this.currentPage, this.totalPages, this.type);
                }
                set TotalPages(total) {
                    this.totalPages = total;
                }
                add(event) {
                    event.preventDefault();
                    const postAsk = new index_1.PostAsk(this.url_ask_id, this.addComment.value, localStorage.getItem('id') || '');
                    const helpCenterService = new index_2.HelpCenterAskService();
                    helpCenterService.add(postAsk)
                        .then(result => {
                        return result.json();
                    }).then(res => {
                        this.list(event);
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
                    const helpCenterService = new index_2.HelpCenterAskService();
                    helpCenterService.list(1)
                        .then(result => {
                        return result.json();
                    }).then(res => {
                        this.answersView.update(index_1.PostAsks.from(res.filter((ask) => ask['id_helpCenter'] === ID_POST)));
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
                list(event) {
                    event.preventDefault();
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .list(this.currentPage, this.url_ask_id)
                        .then((result) => {
                        return result.json();
                    })
                        .then((res) => {
                        this.TotalPages = res.pagination.totalPages;
                        this.paginationView.update(this.currentPage, this.totalPages, this.type, this.url_ask_id);
                        this.questionView = new QuestionView_1.QuestionView('#ask_result');
                        let question = new index_1.Post(res.question.ask, res.question.text, res.question.id_user, res.question.owner, res.question.date, res.question.id_helpCenter);
                        this.questionView.update(question);
                        this.currentPage = res.pagination.page;
                        let postAsks = new index_1.PostAsks();
                        this.answersView = new AnswersView_1.AnswersView('#aswers_result');
                        if (res.answerData || res.answerData != undefined)
                            res.answerData.map((res) => new index_1.PostAsk(res.id_helpCenter, res.text, res.id_user, res.owner, res.id_answer))
                                .forEach((res) => postAsks.add(res));
                        this.answersView.update(postAsks);
                    })
                        .catch((error) => {
                        console.error(error);
                    });
                }
                delete(id, event) {
                    event.preventDefault();
                    const helpCenterService = new index_2.HelpCenterAskService();
                    helpCenterService.remove(id)
                        .then(result => {
                        console.log(result);
                        return result.json();
                    }).then(res => {
                        this.list(event);
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
            };
            exports_1("HelpCenterPageController", HelpCenterPageController);
        }
    };
});
