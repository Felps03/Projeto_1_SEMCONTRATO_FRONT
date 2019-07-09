import { UserService } from "../services/UserService";
import { HelpCenterService } from "../services/HelpCenterService";
import { DailyNoteService } from "../services/DailyNoteService";

export class HomeController {

    constructor() { }


    getUserData() {
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
                return result.json()
            }).then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error)
            });
    }
    listDailyDate(event: Event) {
        event.preventDefault();
        let date = new Date();
        const dailyNoteService = new DailyNoteService()
        dailyNoteService.listDate(date)
            .then(result => {
                return result.json()
            }).then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error(error)
            })
    }
}