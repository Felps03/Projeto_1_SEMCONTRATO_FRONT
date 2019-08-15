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
    // the first list/findByJoker will be done at the current page,
    // but further ones will return to the 1st page
    private protected: boolean;

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

        this.protected = true

    }

    set CurrentPage(page: number) {
        this.currentPage = page;
        this.paginationView.update(this.currentPage, this.totalPages, this.type);
    }
    set CurrentSearch(term: string) {
        this.searchTitle.value = term
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
                if (result.status == 200) {
                    document.getElementById('load-view').setAttribute('hidden', 'true');
                }
                return result.json();
            })
            .then((res) => {

                if (this.protected) {
                    this.currentPage = this.currentPage || 1
                    this.protected = false
                } else {
                    this.currentPage = 1
                }

                //console.log(res);
                this.totalPages = res.count;

                const posts = PostsGOB.from(res.postagens);
                this.postsView.update(posts, this.totalPages)

                if (this.totalPages === 1) {
                    this.clearPagination(event)
                } else {
                    this.paginationView.update(this.currentPage, this.totalPages, this.type);
                }
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
            .findByJoker(title, this.currentPage)
            .then((result) => {
                return result.json();
            })
            .then((res) => {

                if (this.protected) {
                    this.currentPage = this.currentPage || 1
                    this.protected = false
                } else {
                    this.currentPage = 1
                }

                this.totalPages = res.count;

                const posts = PostsGOB.from(res.postagens);
                this.postsView.update(posts, this.totalPages)

                console.log('>>', title, this.currentPage, this.totalPages)

                if (this.totalPages === 1) {
                    this.clearPagination(event)
                } else {
                    console.log('>>', title, this.currentPage, this.totalPages)
                    this.paginationView.update(this.currentPage, this.totalPages, this.type);
                    Array.from(document.getElementsByClassName('page-link')).forEach((el: HTMLAnchorElement) => {
                        el.href = el.href + '&q=' + encodeURI(this.searchTitle.value)
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    logout(event: Event) {
        event.preventDefault();

        localStorage.clear();
        window.location.href = 'index.html';
    }

    clearPagination(event: Event) {
        event.preventDefault()
        document.getElementById('pagination').innerHTML = ''
        console.log('clearng')
    }

}
