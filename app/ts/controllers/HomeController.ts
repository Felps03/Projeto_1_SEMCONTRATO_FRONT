import { UserService } from "../services/UserService";
import { HelpCenterService } from "../services/HelpCenterService";
import { DailyNoteService } from "../services/DailyNoteService";
import { clean } from "../helpers/validate";
import { DailyNote, HomeDailyNote, HomeHelpCenter } from "../models/index";
import { HomeDailyView } from "../views/HomeDailyView";
import { DailyNotes } from "../models/DailyNotes";
import { HomeDailyNotes } from "../models/HomeDailyNotes";
import { HomeHelpCenterView } from "../views/HomeHelpCenterView";
import { HomeHelpCenters } from "../models/HomeHelpCenters";
import { dateFormatYYYYMMDD } from "../helpers/dateHelper";
import { escapeTag } from "../utils/escapeTag";
import { RegisteredDaily } from "../models/RegisteredDaily";
import { RegisteredDaylies } from "../models/RegisteredDaylies";

export class HomeController {

    private dailyView: HomeDailyView;
    private helpCenterView: HomeHelpCenterView;

    constructor() {
        this.dailyView = new HomeDailyView('#all-dailys');
        this.helpCenterView = new HomeHelpCenterView('#last-helps');
    }

    // clickHelpASK(event: Event) {
    //     let temp = (<HTMLElement>event.target).parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild;
    //     let idHelpCenter = (temp.querySelector('.card .card-body #idHelp').textContent);

    //     window.location.href = `app-help-asks.html?id=${idHelpCenter}`;
    // }

    getUser() {
        let data;

        if (!localStorage.getItem('tkn')) {
            return false;
        }
        else {
            const userService = new UserService();
            return userService.getData()
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    let data = {
                        name: escapeTag(result['name']),
                        userName: escapeTag(result['userName'])
                    }
                    return data
                })
        }
    }

    listLastHelp(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService()

        helpCenterService.listLastHelp()
            .then(result => {
                return result.json();
            })
            .then(results => {
                let helpCenters = new HomeHelpCenters();

                results.pop();
                //results.reverse();
                results.length = 3;

                if (results.length <= 3) {
                    document.getElementById('response').innerHTML = `Total de ${results.length} pergunta${results.length >= 1 ? 's' : ''} listada${results.length >= 1 ? 's' : ''}. <a href="app-help-center.html">(clique aqui para mais)</a>`
                }

                results.map((result: any) => new HomeHelpCenter(result['_id'], result['owner'], result['date'], result['title'], result['desc']))
                    .forEach((result: any) => helpCenters.add(result))

                this.helpCenterView.update(helpCenters);
            })
            .catch(error => {
                console.error(error);
            });
    }

    private Dailydate: Date = new Date();

    listDailyDate(event: Event, Dailydate: Date) {
        event.preventDefault();

        Dailydate = this.Dailydate;
        let data = dateFormatYYYYMMDD(Dailydate);

        const dailyNoteService = new DailyNoteService();

        dailyNoteService.listDate(data, 1)
            .then(result => {
                return result.json();
            }).then(results => {
                let dailyNotes = new RegisteredDaylies();

                if (results.length == 1) {
                    this.Dailydate.setDate(Dailydate.getDate() - 1);
                    this.listDailyDate(event, Dailydate);
                }

                results.pop();
                if (results.length > 0) {
                    document.getElementById('response-date').innerHTML = `Último registro em ${this.Dailydate.getDate() < 10 ? '0' + this.Dailydate.getDate() : this.Dailydate.getDate()}/${this.Dailydate.getMonth() < 10 ? '0' + (this.Dailydate.getMonth() + 1) : (this.Dailydate.getMonth() + 1)}/${this.Dailydate.getFullYear()}.`
                    document.getElementById('response-two').innerHTML = `Total de ${results.length} daily${results.length >= 1 ? 's' : ''} listada${results.length >= 1 ? 's' : ''}. <a href="app-daily-note.html">(acessar o quadro)</a>`;
                }

                results.reverse();
                results.map((result: any) => new RegisteredDaily(result['id_daily'], result['id_user'], result['yesterday'], result['today'], result['impediment'], result['date'], result['owner']))
                    .forEach((result: any) => dailyNotes.add(result))

                this.dailyView.update(dailyNotes);
            })
            .catch(error => {
                console.log(error);
            })
    }

    logout(event: Event) {
        event.preventDefault();

        localStorage.clear();
        window.location.href = 'index.html';
    }

    cancel(event: Event) {
        event.preventDefault();
        clean(<HTMLInputElement>document.querySelector('#email_rec'));
    }
}