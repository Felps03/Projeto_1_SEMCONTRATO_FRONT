import { Post, Posts } from '../models/index';
import { HelpCenterService } from '../services/index';
import { validate } from '../helpers/index';
import * as vals from '../validation/helpCenterValidate';
import { noFalse } from '../utils/listCheck';
import { PostsView } from '../views/PostsView';
import { PostView } from '../views/PostView';
import { HelpCenterAskController } from './HelpCenterAskController';
export class HelpCenterController {
    constructor() {
        this.searchTitle = document.getElementById('search-title');
        this.searchDesc = document.getElementById('search-desc');
        this.addTitle = document.getElementById('add-title');
        this.addDesc = document.getElementById('add-desc');
        this.postsView = new PostsView('#post-list');
        this.postView = new PostView('#view-view-modal');
        this.currentPage = 1;
        this.addVals = [
            validate(this.addTitle, vals.title),
            validate(this.addDesc, vals.desc),
        ];
        this.postView.didMount(() => {
            this.helpCenterAsk = new HelpCenterAskController();
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
                this.editVals = [
                    validate(this.editTitle, vals.title),
                    validate(this.editDesc, vals.desc),
                ];
            }
            this.helpCenterAsk.listByPost(new Event(''));
        });
    }
    add(event) {
        event.preventDefault();
        if (noFalse(this.addVals)) {
            const post = new Post(this.addTitle.value.toString(), this.addDesc.value.toString());
            const helpCenterService = new HelpCenterService();
            helpCenterService.add(post)
                .then(result => {
                return result.json();
            }).then(res => {
            })
                .then(() => {
                this.list(event);
            })
                .catch(error => {
                console.error(error);
            });
        }
    }
    update(event) {
        event.preventDefault();
        if (noFalse(this.editVals)) {
            const postIdField = document.getElementById('post-meta');
            if (!(postIdField && this.editTitle && this.editDesc)) {
                return;
            }
            const ID_POST = postIdField.getAttribute('data-id');
            if (!ID_POST) {
                return;
            }
            const post = new Post(this.editTitle.value, this.editDesc.value);
            const helpCenterService = new HelpCenterService();
            helpCenterService.update(post, ID_POST)
                .then(result => {
                return result.json();
            }).then(res => {
                this.list(event);
            })
                .catch(error => {
                console.error(error);
            });
        }
    }
    list(event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService();
        helpCenterService.list(this.currentPage)
            .then(result => {
            return result.json();
        }).then(res => {
            const posts = Posts.from(res.slice(0, -1));
            this.postsView.update(posts);
            Array.from(document.getElementsByClassName('post-expand'))
                .forEach(el => {
                const i = el.getAttribute('data-i');
                if (i) {
                    el.addEventListener('click', () => {
                        this.postView.update(posts.get(+i));
                    });
                }
            });
        })
            .catch(error => {
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
        const helpCenterService = new HelpCenterService();
        helpCenterService.remove(ID_POST)
            .then(result => {
            return result.json();
        }).then(res => {
            this.list(event);
        })
            .catch(error => {
            console.error(error);
        });
    }
    findByTitle(event) {
        event.preventDefault();
        let title = this.searchTitle.value;
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByTitle(title)
            .then(result => {
            return result.json();
        }).then(res => {
            const posts = Posts.from(res);
            this.postsView.update(posts);
            Array.from(document.getElementsByClassName('post-expand'))
                .forEach(el => {
                const i = el.getAttribute('data-i');
                if (i) {
                    el.addEventListener('click', () => {
                        this.postView.update(posts.get(+i));
                    });
                }
            });
        })
            .catch(error => {
            console.error(error);
        });
    }
    findByDesc(event) {
        event.preventDefault();
        let desc = this.searchDesc.value;
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByDesc(desc)
            .then(result => {
            return result.json();
        }).then(res => {
            const posts = Posts.from(res);
            this.postsView.update(posts);
            Array.from(document.getElementsByClassName('post-expand'))
                .forEach(el => {
                const i = el.getAttribute('data-i');
                if (i) {
                    el.addEventListener('click', () => {
                        this.postView.update(posts.get(+i));
                    });
                }
            });
        })
            .catch(error => {
            console.error(error);
        });
    }
}
