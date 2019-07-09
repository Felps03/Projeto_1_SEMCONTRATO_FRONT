import { Post, User, Posts } from '../models/index';
import { HelpCenterService, UserService } from '../services/index';

import { validate } from '../helpers/index'
//import * as vals from '../validation/dailyNoteValidate';
import { noFalse } from '../utils/listCheck'

import { PostsView } from '../views/PostsView';
import { PostView } from '../views/PostView';

export class HelpCenterController {

    private searchTitle: HTMLInputElement
    private searchDesc: HTMLInputElement

    private addTitle: HTMLInputElement
    private addDesc: HTMLInputElement

    private editTitle: HTMLInputElement
    private editDesc: HTMLInputElement

    private postsView: PostsView
    private postView: PostView

    constructor() {
        this.searchTitle = <HTMLInputElement>document.getElementById('search-title')
        this.searchDesc = <HTMLInputElement>document.getElementById('search-desc')

        this.addTitle = <HTMLInputElement>document.getElementById('add-title')
        this.addDesc = <HTMLInputElement>document.getElementById('add-desc')

        this.postsView = new PostsView('#post-list')
        this.postView = new PostView('#view-view-modal')

        this.postView.didMount(() => {

            const editForm = document.getElementById('edit-form')
            const deleteBtn = document.getElementById('confirm-del-btn')

            if (editForm) {
                editForm.addEventListener('submit', this.update.bind(this))
            }
            if (deleteBtn) {
                deleteBtn.addEventListener('click', this.delete.bind(this))
            }
        })

        // init validations
    }


    add(event: Event) {
        event.preventDefault();
        //let idUser = localStorage.getItem('id') || "";

        const post = new Post(
            this.addTitle.value.toString(),
            this.addDesc.value.toString(),
        )
        const helpCenterService = new HelpCenterService();

        helpCenterService.add(post)
            .then(result => {
                return result.json()
            }).then(res => {
                console.table(res);
                // $('#add-modal').modal('hide');
            })
            .then(() => {
                this.list(event);
            })
            .catch(error => {
                console.error(error)
            })
    }


    update(event: Event) {
        event.preventDefault();
        //let idUser = localStorage.getItem('id') || "";
        const postIdField = document.getElementById('post-meta')
        const editTitle = <HTMLInputElement>document.getElementById('edit-title')
        const editDesc = <HTMLInputElement>document.getElementById('edit-desc')


        if (!(postIdField && editTitle && editDesc)) {
            return
        }

        const ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
            return
        }

        const post = new Post(
            editTitle.value,
            editDesc.value,
        );

        const helpCenterService = new HelpCenterService();
        helpCenterService.update(post, ID_POST)
            .then(result => {
                return result.json()
            }).then(res => {
                this.list(event);
                console.table(res);
            })
            .catch(error => {
                console.error(error)
            })
    }

    list(event: Event) {
        event.preventDefault();
        console.log('chamou');
        const helpCenterService = new HelpCenterService()
        helpCenterService.list()
            .then(result => {
                return result.json()
            }).then(res => {
                Posts.from(res)
                    .then(posts => {
                        //
                        this.postsView.update(posts)
                        Array.from(document.getElementsByClassName('post-expand'))
                            .forEach(el => {
                                const i = el.getAttribute('data-i')
                                if (i) {
                                    el.addEventListener('click', () => {

                                        this.postView.update(
                                            posts.get(+i)
                                        )

                                    })
                                }
                            })
                    })
            })
            .catch(error => {
                console.error(error)
            })
    }

    delete(event: Event) {
        event.preventDefault();
        const postIdField = document.getElementById('post-meta');

        if (!postIdField) {
            return
        }

        const ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
            return
        }

        const helpCenterService = new HelpCenterService();
        helpCenterService.remove(ID_POST)
            .then(result => {
                return result.json()
            }).then(res => {
                this.list(event);
                console.table(res);
            })
            .catch(error => {
                console.error(error)
            });
    }

    findByTitle(event: Event) {
        event.preventDefault();
        let title = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByTitle(title)
            .then(result => {
                return result.json()
            }).then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error)
            });
    }

    findByDesc(event: Event) {
        event.preventDefault();
        let desc = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByDesc(desc)
            .then(result => {
                return result.json()
            }).then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error)
            });
    }

}