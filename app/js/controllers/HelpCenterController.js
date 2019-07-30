System.register(["../models/index", "../services/index", "../helpers/index", "../validation/helpCenterValidate", "../utils/listCheck", "../views/PostsView", "../views/PostView", "./HelpCenterAskController", "../views/MessageView", "../views/PaginationView"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, index_3, vals, listCheck_1, PostsView_1, PostView_1, HelpCenterAskController_1, MessageView_1, PaginationView_1, HelpCenterController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
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
            function (listCheck_1_1) {
                listCheck_1 = listCheck_1_1;
            },
            function (PostsView_1_1) {
                PostsView_1 = PostsView_1_1;
            },
            function (PostView_1_1) {
                PostView_1 = PostView_1_1;
            },
            function (HelpCenterAskController_1_1) {
                HelpCenterAskController_1 = HelpCenterAskController_1_1;
            },
            function (MessageView_1_1) {
                MessageView_1 = MessageView_1_1;
            },
            function (PaginationView_1_1) {
                PaginationView_1 = PaginationView_1_1;
            }
        ],
        execute: function () {
            HelpCenterController = class HelpCenterController {
                constructor(currentPage = 1, totalPages = 1) {
                    this.searchTitle = document.getElementById('search-joker');
                    this.addTitle = document.getElementById('add-title');
                    this.addDesc = document.getElementById('add-desc');
                    this.postsView = new PostsView_1.PostsView('#post-list');
                    this.postView = new PostView_1.PostView('#view-view-modal');
                    this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-help-center.html');
                    this.messageView = new MessageView_1.MessageView('#message-view');
                    this.currentPage = currentPage;
                    this.totalPages = totalPages;
                    this.paginationView.update(this.currentPage, this.totalPages);
                    this.addVals = [index_3.validate(this.addTitle, vals.title), index_3.validate(this.addDesc, vals.desc)];
                    this.postView.didMount(() => {
                        this.helpCenterAsk = new HelpCenterAskController_1.HelpCenterAskController();
                        this.editTitle = document.getElementById('edit-title');
                        this.editDesc = document.getElementById('edit-desc');
                        const editForm = document.getElementById('edit-form');
                        const deleteBtn = document.getElementById('confirm-del-btn');
                        if (editForm) {
                            editForm.addEventListener('submit', this.update.bind(this));
                        }
                        if (deleteBtn) {
                            deleteBtn.addEventListener('click', this.delete.bind(this));
                        }
                        if (this.editTitle) {
                            this.editVals = [index_3.validate(this.editTitle, vals.title), index_3.validate(this.editDesc, vals.desc)];
                        }
                        this.helpCenterAsk.listByPost(new Event(''));
                    });
                }
                set CurrentPage(page) {
                    this.currentPage = page;
                    this.paginationView.update(this.currentPage, this.totalPages);
                }
                set TotalPages(total) {
                    this.totalPages = total;
                }
                add(event) {
                    event.preventDefault();
                    if (listCheck_1.noFalse(this.addVals)) {
                        const post = new index_1.Post(this.addTitle.value.toString(), this.addDesc.value.toString());
                        const helpCenterService = new index_2.HelpCenterService();
                        helpCenterService
                            .add(post)
                            .then((result) => {
                            if (Math.floor(result.status / 100) === 2) {
                                result
                                    .json()
                                    .then(() => {
                                    this.list(event);
                                    document.getElementById('add-modal-close').click();
                                    this.messageView.update('Adicionado com sucesso!');
                                })
                                    .catch((error) => {
                                    console.error(error);
                                });
                            }
                            else {
                                result.json().then((res) => {
                                    this.list(event);
                                    this.messageView.update(res.erro);
                                });
                            }
                        })
                            .then((res) => {
                        })
                            .then(() => {
                            this.list(event);
                        })
                            .catch((error) => {
                            console.error(error);
                        });
                    }
                }
                update(event) {
                    event.preventDefault();
                    if (listCheck_1.noFalse(this.editVals)) {
                        const postIdField = document.getElementById('post-meta');
                        if (!(postIdField && this.editTitle && this.editDesc)) {
                            return;
                        }
                        const ID_POST = postIdField.getAttribute('data-id');
                        if (!ID_POST) {
                            return;
                        }
                        const post = new index_1.Post(this.editTitle.value, this.editDesc.value);
                        const helpCenterService = new index_2.HelpCenterService();
                        helpCenterService
                            .update(post, ID_POST)
                            .then((result) => {
                            return result.json();
                        })
                            .then((res) => {
                            this.list(event);
                        })
                            .catch((error) => {
                            console.error(error);
                        });
                    }
                    else {
                        console.log('vals');
                    }
                }
                list(event) {
                    event.preventDefault();
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .list(this.currentPage)
                        .then((result) => {
                        return result.json();
                    })
                        .then((res) => {
                        this.TotalPages = res[res.length - 1].totalPages;
                        this.paginationView.update(this.currentPage, this.totalPages);
                        const posts = index_1.Posts.from(res.reverse().slice(1, -1));
                        this.postsView.update(posts);
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
                delete(event) {
                    event.preventDefault();
                    const postIdField = document.getElementById('post-meta');
                    if (!postIdField) {
                        return;
                    }
                    const ID_POST = postIdField.getAttribute('data-id');
                    if (!ID_POST) {
                        return;
                    }
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .remove(ID_POST)
                        .then((result) => {
                        if (Math.floor(result.status / 100) === 2) {
                            result.json().then((res) => {
                                this.list(event);
                                document.getElementById('confirm-del-modal-close').click();
                                document.getElementById('view-modal-close').click();
                                this.messageView.update('Deletado com sucesso.');
                            });
                        }
                        else {
                            result.json().then((res) => {
                                this.list(event);
                                this.messageView.update(res.erro);
                            });
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                findByJoker(event) {
                    event.preventDefault();
                    let title = this.searchTitle.value;
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .findByJoker(title, 1)
                        .then((result) => {
                        return result.json();
                    })
                        .then((res) => {
                        const posts = index_1.Posts.from(res.slice(0, -1));
                        this.postsView.update(posts);
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
            };
            exports_1("HelpCenterController", HelpCenterController);
        }
    };
});
