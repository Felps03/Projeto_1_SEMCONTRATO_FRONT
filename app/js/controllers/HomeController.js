System.register(["../services/UserService", "../services/HelpCenterService", "../services/DailyNoteService", "../helpers/validate", "../models/index", "../views/HomeDailyView", "../models/HomeDailyNotes", "../views/HomeHelpCenterView", "../models/HomeHelpCenters", "../helpers/dateHelper"], function (exports_1, context_1) {
    "use strict";
    var UserService_1, HelpCenterService_1, DailyNoteService_1, validate_1, index_1, HomeDailyView_1, HomeDailyNotes_1, HomeHelpCenterView_1, HomeHelpCenters_1, dateHelper_1, HomeController;
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
            function (HomeDailyNotes_1_1) {
                HomeDailyNotes_1 = HomeDailyNotes_1_1;
            },
            function (HomeHelpCenterView_1_1) {
                HomeHelpCenterView_1 = HomeHelpCenterView_1_1;
            },
            function (HomeHelpCenters_1_1) {
                HomeHelpCenters_1 = HomeHelpCenters_1_1;
            },
            function (dateHelper_1_1) {
                dateHelper_1 = dateHelper_1_1;
            }
        ],
        execute: function () {
            HomeController = class HomeController {
                constructor() { }
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
                        .then(results => {
                        let helpCenters = new HomeHelpCenters_1.HomeHelpCenters();
                        this.helpCenterView = new HomeHelpCenterView_1.HomeHelpCenterView('#last-helps');
                        results.pop();
                        results.reverse();
                        results.length = 3;
                        results.map((result) => new index_1.HomeHelpCenter(result['owner'], result['date'], result['title'], result['desc']))
                            .forEach((result) => helpCenters.add(result));
                        this.helpCenterView.update(helpCenters);
                    })
                        .catch(error => {
                        console.error(error);
                    });
                }
                listDailyDate(event) {
                    event.preventDefault();
                    const dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    let data = dateHelper_1.dateFormatYYYYMMDD(new Date());
                    dailyNoteService.listDate(data, 1)
                        .then(result => {
                        return result.json();
                    }).then(results => {
                        let dailyNotes = new HomeDailyNotes_1.HomeDailyNotes();
                        this.dailyView = new HomeDailyView_1.HomeDailyView('#all-dailys');
                        results.pop();
                        results.reverse();
                        results.map((result) => new index_1.HomeDailyNote(result['owner'], result['yesterday'], result['today'], result['impediment']))
                            .forEach((result) => dailyNotes.add(result));
                        this.dailyView.update(dailyNotes);
                    })
                        .catch(error => {
                        console.log(error);
                    });
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
