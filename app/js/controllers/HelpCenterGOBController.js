System.register(["../models/index", "../services/index", "../views/PostsGOBView", "../views/PostGOBView", "../views/MessageView", "../views/PaginationView"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, PostsGOBView_1, PostGOBView_1, MessageView_1, PaginationView_1, HelpCenterGOBController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (PostsGOBView_1_1) {
                PostsGOBView_1 = PostsGOBView_1_1;
            },
            function (PostGOBView_1_1) {
                PostGOBView_1 = PostGOBView_1_1;
            },
            function (MessageView_1_1) {
                MessageView_1 = MessageView_1_1;
            },
            function (PaginationView_1_1) {
                PaginationView_1 = PaginationView_1_1;
            }
        ],
        execute: function () {
            HelpCenterGOBController = class HelpCenterGOBController {
                constructor(currentPage = 1, totalPages = 1) {
                    this.searchTitle = document.getElementById('search-joker');
                    this.postsView = new PostsGOBView_1.PostsGOBView('#post-list');
                    this.postView = new PostGOBView_1.PostGOBView('#view-view-modal');
                    this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-help-center-gob.html');
                    this.messageView = new MessageView_1.MessageView('#message-view');
                    this.currentPage = currentPage;
                    this.totalPages = totalPages;
                    this.type = 1;
                    this.paginationView.update(this.currentPage, this.totalPages, this.type);
                }
                set CurrentPage(page) {
                    this.currentPage = page;
                    this.paginationView.update(this.currentPage, this.totalPages, this.type);
                }
                set TotalPages(total) {
                    this.totalPages = total;
                }
                list(event) {
                    event.preventDefault();
                    const helpCenterService = new index_2.HelpCenterGOBService();
                    helpCenterService
                        .list(this.currentPage)
                        .then((result) => {
                        return result.json();
                    })
                        .then((res) => {
                        this.TotalPages = res.count;
                        this.paginationView.update(this.currentPage, this.totalPages, this.type);
                        const posts = index_1.PostsGOB.from(res.postagens);
                        this.postsView.update(posts, this.totalPages);
                        Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
                            const i = el.getAttribute('data-i');
                            if (i) {
                                el.addEventListener('click', () => {
                                    this.postView.update(posts.get(+i));
                                });
                            }
                        });
                    })
                        .catch((error) => {
                        console.error(error);
                    });
                }
                findByJoker(event) {
                    event.preventDefault();
                    let title = this.searchTitle.value;
                    if (!title) {
                        this.list(event);
                        return false;
                    }
                    const helpCenterService = new index_2.HelpCenterGOBService();
                    helpCenterService
                        .findByJoker(title, 1)
                        .then((result) => {
                        return result.json();
                    })
                        .then((res) => {
                        this.TotalPages = res.count;
                        const posts = index_1.PostsGOB.from(res.postagens);
                        this.postsView.update(posts, this.totalPages);
                        Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
                            const i = el.getAttribute('data-i');
                            if (i) {
                                el.addEventListener('click', () => {
                                    this.postView.update(posts.get(+i));
                                });
                            }
                        });
                    })
                        .catch((error) => {
                        console.error(error);
                    });
                }
                clearPagination(event) {
                    event.preventDefault();
                    document.getElementById('pagination').innerHTML = '';
                    console.log('clearng');
                }
            };
            exports_1("HelpCenterGOBController", HelpCenterGOBController);
        }
    };
});
