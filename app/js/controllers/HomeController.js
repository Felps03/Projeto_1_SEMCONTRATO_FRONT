System.register(["../services/UserService", "../services/HelpCenterService", "../services/DailyNoteService", "../views/UserMenuView"], function (exports_1, context_1) {
    "use strict";
    var UserService_1, HelpCenterService_1, DailyNoteService_1, UserMenuView_1, HomeController;
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
            function (UserMenuView_1_1) {
                UserMenuView_1 = UserMenuView_1_1;
            }
        ],
        execute: function () {
            HomeController = class HomeController {
                constructor() {
                    this.user = new UserMenuView_1.UserMenuView("#user-menu-login-link");
                    this.user.update('');
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
                    }).then(result => {
                        let row = document.querySelector('#last-helps');
                        row.innerHTML = "";
                        let a = result.docs.length;
                        for (let i = a - 1; i >= 0; i--) {
                            row.innerHTML += `
                    <div class="card d-flex flex-row justify-content-center align-items-stretch row mb-3">
                        <div class="col-md-3 col-12 text-center d-flex align-items-stretch">
                            <div class="d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100">
                                <div>
                                    <h5 class="mt-2 mb-2 ml-4">Usuário</h5>
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
                                    <h5>${result.docs[i]['title']}</h5>
                                    <p>${result.docs[i]['desc']}</p>
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
            };
            exports_1("HomeController", HomeController);
        }
    };
});
