import { UserService } from "../services/UserService";
import { HelpCenterService } from "../services/HelpCenterService";
import { DailyNoteService } from "../services/DailyNoteService";
import { DailyNote, HomeDailyNote } from "../models/index";
import { HomeDailyView } from "../views/HomeDailyView";
import { DailyNotes } from "../models/DailyNotes";
import { HomeDailyNotes } from "../models/HomeDailyNotes";

export class HomeController {

    private dailyView : HomeDailyView;

    constructor() {
        this.dailyView = new HomeDailyView('#all-dailys');
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
            .then(result => {
                let row = <HTMLElement>document.querySelector('#last-helps');
                row.innerHTML = "";

                let results = result.length;

                for (let aux = 0; aux < 3; aux++) {
                    let date = new Date(result[aux]['date']);
                    let dateFormatted = `${date.getDate()+1}/${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}/${date.getFullYear()}`;

                    row.innerHTML += `
                    <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                        <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                            <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                                <div>
                                    <h5 class="mt-2 mb-2 ml-4">${result[aux]['owner']}</h5>
                                    <p class="mt-2 mb-2 ml-4">${dateFormatted}</p>
                                    <button type="button" name="view"
                                        class="btn btn-outline-info btn-sm input-circle pt-2 ml-4" id="resp-view"
                                        data-toggle="modal" data-target="#respModal">
                                        <i class="small material-icons">description</i>
                                    </button>
                                </div>  
                            </div>
                        </div>
                        <div class="col-md-9 col-12 card-body">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <h5>${result[aux]['title']}</h5>
                                    <p>${result[aux]['desc']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }
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