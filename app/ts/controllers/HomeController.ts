import { UserService } from "../services/UserService";
import { HelpCenterService } from "../services/HelpCenterService";
import { DailyNoteService } from "../services/DailyNoteService";
import { DailyNote, HomeDailyNote, HomeHelpCenter } from "../models/index";
import { HomeDailyView } from "../views/HomeDailyView";
import { DailyNotes } from "../models/DailyNotes";
import { HomeDailyNotes } from "../models/HomeDailyNotes";
import { HomeHelpCenterView } from "../views/HomeHelpCenterView";
import { HomeHelpCenters } from "../models/HomeHelpCenters";

export class HomeController {

    private dailyView : HomeDailyView;
    private helpCenterView : HomeHelpCenterView;

    constructor() {
        this.dailyView = new HomeDailyView('#all-dailys');
        this.helpCenterView = new HomeHelpCenterView('#last-helps');
    }

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
                });
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
                results.length = 4;

                results.pop();
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
        let date = new Date().toLocaleDateString('pt-BR').slice(0, 10);
        const dailyNoteService = new DailyNoteService();

        let year = date.slice(6, 10);
        let month = date.slice(3, 5);
        let day = date.slice(0, 2);

        let fullDate = `${year}-${month}-${day}`;

        dailyNoteService.listDate(fullDate, 1)
            .then(result => {
                return result.json();
            }).then(results => {
                let dailyNotes = new HomeDailyNotes();

                results.pop();
                results.map((result: any) => new HomeDailyNote(result['owner'], result['yesterday'], result['today'], result['impediment']))
                .forEach((result: any) => dailyNotes.adiciona(result))

                this.dailyView.update(dailyNotes);
            })
            .catch(error => {
                console.log(error);
            })
    }
}