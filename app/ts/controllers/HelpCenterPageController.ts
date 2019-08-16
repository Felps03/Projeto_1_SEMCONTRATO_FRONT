import { Posts, Post, PostAsk, PostAsks } from '../models/index';
import { HelpCenterService, HelpCenterServiceAsk } from '../services/index';

import { QuestionView } from '../views/QuestionView';
import { AnswersView } from '../views/AnswersView';
import { PaginationView } from '../views/PaginationView';
import { MessageView } from '../views/MessageView';
import { validate, clean } from '../helpers/index';
import { InputWrapper } from '../utils/index';
import * as vals from '../validation/helpCenterAskValidate';
import { button } from '../helpers/chatbot/chatAnswerTemplates';


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
    private answerValidator: (() => boolean)[];
    
    constructor(currentPage: number = 1, totalPages: number = 1) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.type = 2;
        this.url_ask_id = this.url.get('id');
        this.paginationView = new PaginationView('#pagination', 'app-help-asks.html');

        this.answersView = new AnswersView('#post-ask-list')
        this.answersView.didMount(() => {
            Array.from(document.querySelectorAll('a.can-delete')).forEach(button => {
                const id = button.getAttribute('data-id')
                button.addEventListener('click', this.delete.bind(this, id))
            })
        })

        this.questionView = new QuestionView('#ask_result');

        this.questionView.didMount(() => {
            Array.from(document.querySelectorAll('a.can-del')).forEach(button => {
                const id = button.getAttribute('data-id')
                button.addEventListener('click', this.deleteQuestion.bind(this, id))
            })
        })

        this.addComment = <HTMLInputElement>document.querySelector('#answer');

        this.paginationView.update(this.currentPage, this.totalPages, this.type, this.url_ask_id);

        this.answerValidator = [
            validate(this.addComment, vals.comment)
        ]

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

        const postAsk = new PostAsk(this.url_ask_id, this.addComment.value, localStorage.getItem('id') || '');

        const helpCenterService = new HelpCenterServiceAsk();

        helpCenterService.add(postAsk)
            .then(result => {
                return result.json()
            }).then(res => {
                this.list(event);
                this.addComment.value = "";
                clean(this.addComment);
            })
            .catch(error => {
                console.error(error)
            })
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

        const helpCenterService = new HelpCenterServiceAsk();
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
                this.TotalPages = res.pagination.totalPages;
                // this.questionView = new QuestionView('#ask_result');

                // document.querySelector('a.can-del');
                // const idq = this.btn_question_del.addEventListener('click', this.deleteQuestion.bind(this, localStorage.getItem('id')));

                let pages = res.pagination.page;

                if (res.hasOwnProperty('answerData')) {
                    let countAnswers = res.pagination.totalDocs;
                    document.getElementById('response').textContent = `Total de ${countAnswers} resposta${countAnswers == 1 ? '' : 's'} registrada${countAnswers == 1 ? '' : 's'}. ${res[res.length - 1] == undefined ? '' : `(página ${pages})`}`;
                    this.paginationView.update(this.currentPage, this.totalPages, this.type, this.url_ask_id);
                } else {
                    document.getElementById('pagination').textContent = '';
                    document.getElementById('response').textContent = '';
                }

                let question = new Post(res.question.ask, res.question.text, res.question.id_user, res.question.owner, res.question.date, res.question.id_helpCenter)

                this.questionView.update(question);
                this.currentPage = res.pagination.page
                let postAsks = new PostAsks();
                //this.answersView = new AnswersView('#aswers_result');


                if (res.answerData || res.answerData != undefined) res.answerData.map((res: any) => new PostAsk(res.id_helpCenter, res.text, res.id_user, res.owner, res.id_answer, res.date))
                    .forEach((res: any) => postAsks.add(res));

                this.answersView.update(postAsks);


                // console.log(document.getElementById("teste"));
            })
            .catch((error) => {
                console.error(error);
            });
    }




    delete(id: string, event: Event) {

        event.preventDefault();

        //let id = this.url.get('id_ask');
        console.log(id);

        const helpCenterService = new HelpCenterServiceAsk();
        helpCenterService.remove(id)
            .then(result => {
                return result.json()
            }).then(res => {
                console.log('response: ', res);
                this.list(event)
                // window.location.href='home.html';
            })
            .catch(error => {
                console.error(error)
            });
    }

    
    deleteQuestion(id: string, event: Event) {
        event.preventDefault();

        const helpCenterService = new HelpCenterService();
        helpCenterService
            .remove(id)
            .then((result) => {
                if (Math.floor(result.status / 100) === 2) {
                    result.json().then((res) => {
                        console.log('fui apagado');
                        window.location.href = "app-help-center.html"
                    });
                } else {
                    result.json().then((res) => {
                        this.list(event);
                        
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}