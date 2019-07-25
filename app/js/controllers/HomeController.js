System.register(["../services/UserService", "../services/HelpCenterService", "../services/DailyNoteService", "../models/index", "../views/HomeDailyView", "../models/HomeDailyNotes"], function (exports_1, context_1) {
    "use strict";
    var UserService_1, HelpCenterService_1, DailyNoteService_1, index_1, HomeDailyView_1, HomeDailyNotes_1, HomeController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            },
            function (HelpCenterService_1_1) {
                HelpCenterService_1 = HelpCenterService_1_1;
            },
            function (DailyNoteService_1_1) {
                DailyNoteService_1 = DailyNoteService_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (HomeDailyView_1_1) {
                HomeDailyView_1 = HomeDailyView_1_1;
            },
            function (HomeDailyNotes_1_1) {
                HomeDailyNotes_1 = HomeDailyNotes_1_1;
            }
        ],
        execute: function () {
            HomeController = class HomeController {
                constructor() {
                    this.dailyView = new HomeDailyView_1.HomeDailyView('#all-dailys');
                }
                getUser() {
                    let data;
                    if (!localStorage.getItem('tkn')) {
                        return false;
                    }
                    else {
                        const userService = new UserService_1.UserService();
                        return userService.getData()
                            .then(res => {
                            return res.json();
                        })
                            .then(result => {
                            let data = {
                                name: result['name'],
                                userName: result['userName']
                            };
                            return data;
                        });
                    }
                }
                listLastHelp(event) {
                    event.preventDefault();
                    const helpCenterService = new HelpCenterService_1.HelpCenterService();
                    helpCenterService.listLastHelp()
                        .then(result => {
                        return result.json();
                    })
                        .then(result => {
                        let row = document.querySelector('#last-helps');
                        row.innerHTML = "";
                        let results = result.length;
                        for (let aux = 0; aux < 3; aux++) {
                            let date = new Date(result[aux]['date']);
                            let dateFormatted = `${date.getDate() + 1}/${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}/${date.getFullYear()}`;
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
                listDailyDate(event) {
                    event.preventDefault();
                    let date = new Date().toLocaleDateString('pt-BR').slice(0, 10);
                    const dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    let year = date.slice(6, 10);
                    let month = date.slice(3, 5);
                    let day = date.slice(0, 2);
                    let fullDate = `${year}-${month}-${day}`;
                    dailyNoteService.listDate(fullDate, 1)
                        .then(result => {
                        return result.json();
                    }).then(results => {
                        let dailyNotes = new HomeDailyNotes_1.HomeDailyNotes();
                        results.pop();
                        results.map((result) => new index_1.HomeDailyNote(result['owner'], result['yesterday'], result['today'], result['impediment']))
                            .forEach((result) => dailyNotes.adiciona(result));
                        this.dailyView.update(dailyNotes);
                    })
                        .catch(error => {
                        console.log(error);
                    });
                }
            };
            exports_1("HomeController", HomeController);
        }
    };
});
