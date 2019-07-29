import { Posts, Post, PostAsk, PostAsks } from '../models/index';
import { HelpCenterService } from '../services/index';
import { QuestionView } from '../views/QuestionView';
import { AnswersView } from '../views/AnswersView';
import { PaginationView } from '../views/PaginationView';

export class HelpCenterPageController {
    private currentPage: number;
    private paginationView: PaginationView;
    private url = new URLSearchParams(location.search);
    private url_ask_id = this.url.get('id');
    private questionView: QuestionView;
    private answersView: AnswersView;

    constructor(currentPage: number = 1) {
        this.currentPage = currentPage;
        this.paginationView = new PaginationView('#pagination', 'app-help-asks.html');
        this.paginationView.update(currentPage);
    }

    set CurrentPage(event: Event, page: number) {
        event.preventDefault();
        this.currentPage = page;
        this.paginationView.update(this.currentPage);
    }

    list(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService();
        helpCenterService
            .list(this.currentPage, this.url_ask_id)
            .then((result) => {
                // console.log(result.json())
                return result.json();
            })
            .then((res) => {
                console.log(res.question);
                this.questionView = new QuestionView('#ask_result');
                let question = new Post(res.question.ask, res.question.text, res.question.id_user, res.question.owner, res.question.id_helpCenter)
                this.questionView.update(question);

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