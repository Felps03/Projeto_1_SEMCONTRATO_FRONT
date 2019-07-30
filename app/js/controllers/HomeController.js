System.register(["../services/UserService", "../services/HelpCenterService", "../services/DailyNoteService", "../helpers/dateHelper", "../helpers/validate"], function (exports_1, context_1) {
    "use strict";
    var UserService_1, HelpCenterService_1, DailyNoteService_1, dateHelper_1, validate_1, HomeController;
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
            function (dateHelper_1_1) {
                dateHelper_1 = dateHelper_1_1;
            },
            function (validate_1_1) {
                validate_1 = validate_1_1;
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
                    const dailyNoteService = new DailyNoteService_1.DailyNoteService();
                    let data = dateHelper_1.dateFormatYYYYMMDD(new Date());
                    dailyNoteService.listDate(data, 1)
                        .then(result => {
                        return result.json();
                    }).then(result => {
                        let row = document.querySelector('#all-dailys');
                        row.innerHTML = "";
                        for (let i = 0; i < result.length - 1; i++) {
                            row.innerHTML += `
                    <tr>
                        <td>${result[i]['owner']}</td>
                        <td>${result[i]['yesterday']}</td>
                        <td>${result[i]['today']}</td>
                        <td>${result[i]['impediment']}</td>
                    </tr>
                    `;
                        }
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
