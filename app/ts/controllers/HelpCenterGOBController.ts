import { Post, User, Posts, PostsGOB } from '../models/index';
import { HelpCenterGOBService, UserService } from '../services/index';

import { PostsGOBView } from '../views/PostsGOBView';
import { PostGOBView } from '../views/PostGOBView';
import { MessageView } from '../views/MessageView';
import { PaginationView } from '../views/PaginationView';

export class HelpCenterGOBController {
    private messageView: MessageView;

    private searchTitle: HTMLInputElement;
    // private searchDesc: HTMLInputElement

    private postsView: PostsGOBView;
    private postView: PostGOBView;
    private paginationView: PaginationView;

    private currentPage: number;
    private totalPages: number;

    private type: number;

    constructor(currentPage: number = 1, totalPages: number = 1) {
        this.searchTitle = <HTMLInputElement>document.getElementById('search-joker');
        // this.searchDesc = <HTMLInputElement>document.getElementById('search-desc')

        this.postsView = new PostsGOBView('#post-list');
        this.postView = new PostGOBView('#view-view-modal');
        this.paginationView = new PaginationView('#pagination', 'app-help-center-gob.html');

        this.messageView = new MessageView('#message-view');

        this.currentPage = currentPage;

        this.totalPages = totalPages;
        this.type = 1;
        this.paginationView.update(this.currentPage, this.totalPages, this.type);

    }

    set CurrentPage(page: number) {
        this.currentPage = page;
        this.paginationView.update(this.currentPage, this.totalPages, this.type);
    }
    set TotalPages(total: number) {
        this.totalPages = total;
    }

    // here be dragons
    list(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterGOBService();
        helpCenterService
            .list(this.currentPage)
            .then((result) => {
                return result.json();
            })
            .then((res) => {

                //console.log(res);
                this.TotalPages = res.count;
                this.paginationView.update(this.currentPage, this.totalPages, this.type);
                const posts = PostsGOB.from(res.postagens);
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

    findByJoker(event: Event) {
        event.preventDefault();
        let title = this.searchTitle.value;
        if (!title) {
            this.list(event)
            return false
        }
        const helpCenterService = new HelpCenterGOBService();
        helpCenterService
            .findByJoker(title, 1)
            .then((result) => {
                return result.json();
            })
            .then((res) => {
                this.TotalPages = res.count;
                const posts = PostsGOB.from(res.postagens);
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

    clearPagination(event: Event) {
        event.preventDefault()
        document.getElementById('pagination').innerHTML = ''
        console.log('clearng')
    }

}
