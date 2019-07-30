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
                constructor(currentPage = 1) {
                    this.url = new URLSearchParams(location.search);
                    this.url_ask_id = this.url.get('id');
                    this.currentPage = currentPage;
                    this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-help-asks.html');
                    this.paginationView.update(currentPage);
                }
                set CurrentPage(page) {
                    this.currentPage = page;
                    this.paginationView.update(this.currentPage);
                }
                set TotalPages(total) {
                    this.totalPages = total;
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
                        console.log(res);
                        this.TotalPages = res.pagination.totalPages;
                        this.paginationView.update(this.currentPage, this.totalPages);
                        this.questionView = new QuestionView_1.QuestionView('#ask_result');
                        let question = new index_1.Post(res.question.ask, res.question.text, res.question.id_user, res.question.owner, res.question.id_helpCenter);
                        this.questionView.update(question);
                        this.currentPage = res.pagination.page;
                        console.log(res.pagination.page);
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
            };
            exports_1("HelpCenterPageController", HelpCenterPageController);
        }
    };
});
