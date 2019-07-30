import { Posts, Post, PostAsk, PostAsks } from '../models/index';
import { HelpCenterService, HelpCenterAskService } from '../services/index';

import { QuestionView } from '../views/QuestionView';
import { AnswersView } from '../views/AnswersView';
import { PaginationView } from '../views/PaginationView';
import { MessageView } from '../views/MessageView';


import { validate } from '../helpers/index';
import * as vals from '../validation/helpCenterAskValidate';
import { noFalse } from '../utils/index';

import { HelpCenterAskController } from '../controllers/HelpCenterAskController'

export class HelpCenterPageController {
    private currentPage: number;
    private paginationView: PaginationView;
    private totalPages: number;

    private url = new URLSearchParams(location.search);
    private url_ask_id = this.url.get('id');

    private questionView: QuestionView;
    private answersView: AnswersView;

    private addVals: (() => boolean)[]
    private addComment: HTMLInputElement

    private messageView: MessageView;

    constructor(currentPage: number = 1) {
        this.currentPage = currentPage;
        this.paginationView = new PaginationView('#pagination', 'app-help-asks.html');
        this.paginationView.update(currentPage);

        this.answersView = new AnswersView('#post-ask-list')

        this.addComment = <HTMLInputElement>document.querySelector('#answer');

    }

    set CurrentPage(page: number) {
        this.currentPage = page;
        this.paginationView.update(this.currentPage);
    }

    set TotalPages(total: number) {
        this.totalPages = total;
    }

    delete(event: Event) {
        event.preventDefault();
        const postIdField = document.getElementById('post-meta');

        if (!postIdField) {
            return;
        }

        const ID_POST = this.url_ask_id;

        if (!ID_POST) {
            return;
        }

        const helpCenterService = new HelpCenterService();
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
                } else {
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

    add(event: Event) {
        event.preventDefault();
        // if (noFalse(this.addVals)) {

        const postAsk = new PostAsk(this.url_ask_id, this.addComment.value, localStorage.getItem('id') || '');

        const helpCenterService = new HelpCenterAskService();

        helpCenterService.add(postAsk)
            .then(result => {
                return result.json()
            }).then(res => {
                this.list(event);
                // $('#add-modal').modal('hide');
            })
            .catch(error => {
                console.error(error)
            })
        // }
    }

    listByPost(event: Event) {
        event.preventDefault();

        const postIdField = document.getElementById('post-meta')

        if (!(postIdField)) {
            return
        }

        const ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
            return
        }

        const helpCenterService = new HelpCenterAskService();
        helpCenterService.list(1)
            .then(result => {
                return result.json()
            }).then(res => {

                this.answersView.update(
                    PostAsks.from(
                        res.filter((ask: any) => ask['id_helpCenter'] === ID_POST)
                    )
                )
            })
            .catch(error => {
                console.error(error)
            })

    }

    list(event: Event) {
        event.preventDefault();

        const helpCenterService = new HelpCenterService();
        helpCenterService
            .list(this.currentPage, this.url_ask_id)
            .then((result) => {
                return result.json();
            })
            .then((res) => {
                //console.log(res);
                this.TotalPages = res.pagination.totalPages;
                this.paginationView.update(this.currentPage, this.totalPages);

                this.questionView = new QuestionView('#ask_result');
                let question = new Post(res.question.ask, res.question.text, res.question.id_user, res.question.owner, res.question.id_helpCenter)
                this.questionView.update(question);
                this.currentPage = res.pagination.page
                //console.log(res.pagination.page);
                let postAsks = new PostAsks();
                this.answersView = new AnswersView('#aswers_result');

                if (res.answerData || res.answerData != undefined) res.answerData.map((res: any) => new PostAsk(res.id_helpCenter, res.text, res.id_user, res.owner, res.id_answer))
                    .forEach((res: any) => postAsks.add(res));

                this.answersView.update(postAsks);

            })
            .catch((error) => {
                console.error(error);
            });
    }
}