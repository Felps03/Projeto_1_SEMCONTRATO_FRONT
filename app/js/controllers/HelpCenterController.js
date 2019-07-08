import { Post, User, Posts } from '../models/index';
import { HelpCenterService, UserService } from '../services/index';
import { PostsView } from '../views/PostsView';
import { PostView } from '../views/PostView';
export class HelpCenterController {
    constructor() {
        this.searchTitle = document.getElementById('search-title');
        this.searchDesc = document.getElementById('search-desc');
        this.addTitle = document.getElementById('add-title');
        this.addDesc = document.getElementById('add-desc');
        this.postsView = new PostsView('#post-list');
        this.postView = new PostView('#view-view-modal');
        this.postView.update(new Post('', '', new User('', '', '', '', '', '')));
        const editBtn = document.getElementById('edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', this.postView.toggleEditing);
        }
    }
    add(event) {
        event.preventDefault();
        const post = new Post(this.addTitle.value.toString(), this.addDesc.value.toString());
        const helpCenterService = new HelpCenterService();
        helpCenterService.add(post)
            .then(result => {
            return result.json();
        }).then(res => {
            console.table(res);
        })
            .then(() => {
            this.list(event);
        })
            .catch(error => {
            console.error(error);
        });
    }
    update(event) {
        event.preventDefault();
        let ID_POST = "VAI O ID DO POST";
        const userService = new UserService();
        userService.findById(ID_POST)
            .then((res) => new User(res.name, res.lastName, res.userName, res.email, "", res.dateOfBirth))
            .then(user => {
            const post = new Post(this.addTitle.value.toString(), this.addDesc.value.toString(), user);
            const helpCenterService = new HelpCenterService();
            helpCenterService.update(post, ID_POST)
                .then(result => {
                return result.json();
            }).then(res => {
                console.table(res);
            })
                .catch(error => {
                console.error(error);
            });
        });
    }
    list(event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService();
        helpCenterService.list()
            .then(result => {
            return result.json();
        }).then(res => {
            Posts.from(res)
                .then(posts => {
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
            });
        })
            .catch(error => {
            console.error(error);
        });
    }
    delete(event) {
        event.preventDefault();
        let id = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.remove(id)
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
    findByTitle(event) {
        event.preventDefault();
        let title = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByTitle(title)
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
    findByDesc(event) {
        event.preventDefault();
        let desc = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByDesc(desc)
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
}
