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

export class HomeController {

    private dailyView: HomeDailyView;
    private helpCenterView: HomeHelpCenterView;

    constructor() { }

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
                        name: result['name'],
                        userName: result['userName']
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
                this.helpCenterView = new HomeHelpCenterView('#last-helps');



                results.pop();
                results.reverse();
                results.length = 3;
                results.map((result: any) => new HomeHelpCenter(result['owner'], result['date'], result['title'], result['desc']))
                    .forEach((result: any) => helpCenters.add(result))

                this.helpCenterView.update(helpCenters);
            })
            .catch(error => {
                console.error(error);
            });
    }

    listDailyDate(event: Event) {
        event.preventDefault();

        const dailyNoteService = new DailyNoteService();

        let data = dateFormatYYYYMMDD(new Date());

        dailyNoteService.listDate(data, 1)
            .then(result => {
                return result.json();
            }).then(results => {
                let dailyNotes = new HomeDailyNotes();
                this.dailyView = new HomeDailyView('#all-dailys');



                results.pop();
                results.reverse();
                results.map((result: any) => new HomeDailyNote(result['owner'], result['yesterday'], result['today'], result['impediment']))
                    .forEach((result: any) => dailyNotes.add(result))

                this.dailyView.update(dailyNotes);
            })
            .catch(error => {
                console.log(error);
            })
    }

    cancel(event: Event) {
        event.preventDefault();
        clean(<HTMLInputElement>document.querySelector('#email_rec'));
    }
}