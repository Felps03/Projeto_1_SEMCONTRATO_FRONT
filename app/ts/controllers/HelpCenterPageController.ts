import { Posts, Post, PostAsk, PostAsks } from '../models/index';
import { HelpCenterService, HelpCenterAskService } from '../services/index';

import { QuestionView } from '../views/QuestionView';
import { AnswersView } from '../views/AnswersView';
import { PaginationView } from '../views/PaginationView';
import { MessageView } from '../views/MessageView';

export class HelpCenterPageController {
    private currentPage: number;
    private paginationView: PaginationView;


    private url = new URLSearchParams(location.search);

    private addComment: HTMLInputElement

    private url_ask_id: string;
    private questionView: QuestionView;
    private answersView: AnswersView;
    private totalPages: number;
    private type: number;

    constructor(currentPage: number = 1, totalPages: number = 1) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.type = 2;
        this.url_ask_id = this.url.get('id');
        this.paginationView = new PaginationView('#pagination', 'app-help-asks.html');

        this.answersView = new AnswersView('#post-ask-list')

        this.addComment = <HTMLInputElement>document.querySelector('#answer');

        this.paginationView.update(this.currentPage, this.totalPages, this.type, this.url_ask_id);

    }

    set CurrentPage(page: number) {
        this.currentPage = page;
        this.paginationView.update(this.currentPage, this.totalPages, this.type);
    }

    set TotalPages(total: number) {
        this.totalPages = total;
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
                this.paginationView.update(this.currentPage, this.totalPages, this.type, this.url_ask_id);

                //FIXME
                this.questionView = new QuestionView('#ask_result');
                let question = new Post(res.question.ask, res.question.text, res.question.id_user, res.question.owner, res.question.date, res.question.id_helpCenter)
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