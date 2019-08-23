System.register(["../models/index", "../services/index", "../helpers/index", "../validation/helpCenterValidate", "../utils/listCheck", "../views/PostsView", "../views/PostView", "../views/MessageView", "../views/PaginationView"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, index_3, vals, listCheck_1, PostsView_1, PostView_1, MessageView_1, PaginationView_1, HelpCenterController;
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
                    this.messageView = new MessageView_1.MessageView('#message-view');
                    this.currentPage = currentPage;
                    this.totalPages = totalPages;
                    this.type = 1;
                    this.addVals = [index_3.validate(this.addTitle, vals.title), index_3.validate(this.addDesc, vals.desc)];
                    this.postsView.didMount(() => {
                        Array.from(document.querySelectorAll('a.can-delete')).forEach(button => {
                            const id = button.getAttribute('data-id');
                            button.addEventListener('click', this.delete.bind(this, id));
                        });
                    });
                    document.getElementById('search-form').addEventListener('submit', e => e.preventDefault());
                    this.protected = true;
                }
                set CurrentSearch(term) {
                    this.searchTitle.value = term;
                }
                cancel(event) {
                    event.preventDefault();
                    index_3.clean(document.querySelector('#add-title'));
                    index_3.clean(document.querySelector('#add-desc'));
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
                                    this.messageView.update('Pergunta publicada com sucesso!');
                                    let title = document.getElementById('add-title');
                                    let desc = document.getElementById('add-desc');
                                    title.value = '';
                                    desc.value = '';
                                    index_3.clean(title);
                                    index_3.clean(desc);
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
                set CurrentPage(page) {
                    this.currentPage = page;
                    this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-help-center.html');
                    this.paginationView.update(this.currentPage, this.totalPages, this.type);
                }
                set TotalPages(total) {
                    this.totalPages = total;
                }
                list(event) {
                    event.preventDefault();
                    console.log('listando whatever');
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .list(this.currentPage, null)
                        .then((result) => {
                        if (result.status == 200) {
                            document.getElementById('load-view').setAttribute('hidden', 'true');
                        }
                        return result.json();
                    })
                        .then((res) => {
                        this.TotalPages = res[res.length - 1].totalPages;
                        let totalQuestions = res[res.length - 1].totalDocs;
                        let pages = res[res.length - 1].page;
                        res.pop();
                        const posts = index_1.Posts.from(res.slice(0, 10));
                        if (posts.toArray().length != 0) {
                            document.getElementById('response').textContent = `Total de ${totalQuestions} pergunta${totalQuestions == 1 ? '' : 's'} registrada${totalQuestions == 1 ? '' : 's'}. (página ${res[res.length - 1] === undefined ? '' : pages})`;
                            this.paginationView = new PaginationView_1.PaginationView('#pagination', 'app-help-center.html');
                            this.paginationView.update(this.currentPage, this.totalPages, this.type);
                        }
                        else {
                            document.getElementById('response').textContent = '';
                            document.getElementById('pagination').textContent = '';
                        }
                        this.postsView.update(posts, this.totalPages);
                        Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
                            const i = el.getAttribute('data-i');
                            if (i) {
                                '	';
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
                delete(id, event) {
                    event.preventDefault();
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .remove(id)
                        .then((result) => {
                        if (Math.floor(result.status / 100) === 2) {
                            result.json().then((res) => {
                                this.list(event);
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
                    console.log('jokando');
                    let title = this.searchTitle.value;
                    if (!title) {
                        this.list(event);
                        return false;
                    }
                    console.log('realmente jokando');
                    const helpCenterService = new index_2.HelpCenterService();
                    helpCenterService
                        .findByJoker(title, this.currentPage)
                        .then((result) => {
                        if (result.status == 200) {
                            document.getElementById('load-view').setAttribute('hidden', 'true');
                        }
                        return result.json();
                    })
                        .then((res) => {
                        if (this.protected) {
                            this.currentPage = this.currentPage || 1;
                            this.protected = false;
                        }
                        else {
                            this.currentPage = 1;
                        }
                        this.totalPages = Math.floor(res[res.length - 1].totalPages);
                        console.log(res);
                        this.paginationView.update(this.currentPage, this.totalPages, this.type);
                        const posts = index_1.Posts.from(res.slice(0, -1));
                        this.postsView.update(posts, this.totalPages);
                        let aux = document.getElementById('search-joker');
                        let response = document.getElementById('response_search');
                        if (aux.value === '') {
                            response.textContent = '';
                        }
                        else {
                            response.textContent = `Aproximadamente ${res.length - 1} pergunta${res.length - 1 === 1 ? '' : 's'}.`;
                        }
                        if (this.totalPages === 1) {
                            this.clearPagination(event);
                        }
                        else {
                            this.paginationView.update(this.currentPage, this.totalPages, this.type);
                            Array.from(document.getElementsByClassName('page-link')).forEach((el) => {
                                el.href = el.href + '&q=' + encodeURI(this.searchTitle.value);
                            });
                        }
                    })
                        .catch((error) => {
                        console.error(error);
                    });
                }
                logout(event) {
                    event.preventDefault();
                    localStorage.clear();
                    window.location.href = 'index.html';
                }
                cancelar(event) {
                    event.preventDefault();
                    this.limpar();
                }
                limpar() {
                    let title = document.querySelector('#add-title');
                    let desc = document.querySelector('#add-desc');
                    title.value = "";
                    desc.value = "";
                    index_3.clean(title);
                    index_3.clean(desc);
                }
                clearPagination(event) {
                    event.preventDefault();
                    document.getElementById('pagination').innerHTML = '';
                    console.log('clearng');
                }
            };
            exports_1("HelpCenterController", HelpCenterController);
        }
    };
});
