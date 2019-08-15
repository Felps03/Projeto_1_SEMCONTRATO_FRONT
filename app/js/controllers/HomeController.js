System.register(["../services/UserService", "../services/HelpCenterService", "../services/DailyNoteService", "../helpers/validate", "../models/index", "../views/HomeDailyView", "../views/HomeHelpCenterView", "../models/HomeHelpCenters", "../helpers/dateHelper", "../utils/escapeTag", "../models/RegisteredDaily", "../models/RegisteredDaylies"], function (exports_1, context_1) {
    "use strict";
    var UserService_1, HelpCenterService_1, DailyNoteService_1, validate_1, index_1, HomeDailyView_1, HomeHelpCenterView_1, HomeHelpCenters_1, dateHelper_1, escapeTag_1, RegisteredDaily_1, RegisteredDaylies_1, HomeController;
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
            function (validate_1_1) {
                validate_1 = validate_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (HomeDailyView_1_1) {
                HomeDailyView_1 = HomeDailyView_1_1;
            },
            function (HomeHelpCenterView_1_1) {
                HomeHelpCenterView_1 = HomeHelpCenterView_1_1;
            },
            function (HomeHelpCenters_1_1) {
                HomeHelpCenters_1 = HomeHelpCenters_1_1;
            },
            function (dateHelper_1_1) {
                dateHelper_1 = dateHelper_1_1;
            },
            function (escapeTag_1_1) {
                escapeTag_1 = escapeTag_1_1;
            },
            function (RegisteredDaily_1_1) {
                RegisteredDaily_1 = RegisteredDaily_1_1;
            },
            function (RegisteredDaylies_1_1) {
                RegisteredDaylies_1 = RegisteredDaylies_1_1;
            }
        ],
        execute: function () {
            HomeController = class HomeController {
                constructor() {
                    this.Dailydate = new Date();
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
                                name: escapeTag_1.escapeTag(result['name']),
                                userName: escapeTag_1.escapeTag(result['userName'])
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
                        if (result.status == 200) {
                            document.getElementById('load-view').setAttribute('hidden', 'true');
                        }
                        return result.json();
                    })
                        .then(results => {
                        let helpCenters = new HomeHelpCenters_1.HomeHelpCenters();
                        this.helpCenterView = new HomeHelpCenterView_1.HomeHelpCenterView('#last-helps');
                        results.pop();
                        results.length = 3;
                        if (results.length <= 3) {
                            document.getElementById('response').innerHTML = `Total de ${results.length} pergunta${results.length >= 1 ? 's' : ''} listada${results.length >= 1 ? 's' : ''}. <a href="app-help-center.html">(clique aqui para mais)</a>`;
                        }
                        results.map((result) => new index_1.HomeHelpCenter(result['_id'], result['owner'], result['date'], result['title'], result['desc']))
                            .forEach((result) => helpCenters.add(result));
                        this.helpCenterView.update(helpCenters);
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
                listDailyDate(event, Dailydate) {
                    event.preventDefault();
                    Dailydate = this.Dailydate;
                    let data = dateHelper_1.dateFormatYYYYMMDD(Dailydate);
                    const dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    dailyNoteService.listDate(data, 1)
                        .then(result => {
                        if (result.status == 200) {
                            document.getElementById('load-view').setAttribute('hidden', 'true');
                        }
                        return result.json();
                    }).then(results => {
                        let dailyNotes = new RegisteredDaylies_1.RegisteredDaylies();
                        this.dailyView = new HomeDailyView_1.HomeDailyView('#all-dailys');
                        if (results.length == 1) {
                            this.Dailydate.setDate(Dailydate.getDate() - 1);
                            this.listDailyDate(event, Dailydate);
                        }
                        results.pop();
                        if (results.length > 0) {
                            document.getElementById('response-date').innerHTML = `Último registro em ${this.Dailydate.getDate() < 10 ? '0' + this.Dailydate.getDate() : this.Dailydate.getDate()}/${this.Dailydate.getMonth() < 10 ? '0' + (this.Dailydate.getMonth() + 1) : (this.Dailydate.getMonth() + 1)}/${this.Dailydate.getFullYear()}.`;
                            document.getElementById('response-two').innerHTML = `Total de ${results.length} daily${results.length >= 1 ? 's' : ''} listada${results.length >= 1 ? 's' : ''}. <a href="app-daily-note.html">(acessar o quadro)</a>`;
                        }
                        results.reverse();
                        results.map((result) => new RegisteredDaily_1.RegisteredDaily(result['id_daily'], result['id_user'], result['yesterday'], result['today'], result['impediment'], result['date'], result['owner']))
                            .forEach((result) => dailyNotes.add(result));
                        this.dailyView.update(dailyNotes);
                    })
                        .catch(error => {
                        console.log(error);
                    });
                }
                logout(event) {
                    event.preventDefault();
                    localStorage.clear();
                    window.location.href = 'index.html';
                }
                cancel(event) {
                    event.preventDefault();
                    validate_1.clean(document.querySelector('#email_rec'));
                }
            };
            exports_1("HomeController", HomeController);
        }
    };
});
