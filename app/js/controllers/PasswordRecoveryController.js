System.register(["../services/UserService", "../services/index", "../helpers/index", "../validation/userValidate", "../utils/listCheck", "../views/MessageView"], function (exports_1, context_1) {
    "use strict";
    var UserService_1, index_1, index_2, vals, listCheck_1, MessageView_1, PasswordRecoveryController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (vals_1) {
                vals = vals_1;
            },
            function (listCheck_1_1) {
                listCheck_1 = listCheck_1_1;
            },
            function (MessageView_1_1) {
                MessageView_1 = MessageView_1_1;
            }
        ],
        execute: function () {
            PasswordRecoveryController = class PasswordRecoveryController {
                constructor() {
                    this.email = document.querySelector('#email_rec');
                    this.password = document.querySelector('#password_rec');
                    this.passwordConfirm = document.querySelector('#password_rec_conf');
                    this.messageView = new MessageView_1.MessageView('#link-expired');
                    this.changePasswordVals = [
                        index_2.validate(this.email, vals.email),
                        index_2.validate(this.password, vals.password),
                        index_2.validate(this.passwordConfirm, vals.passwordConfirm, this.password)
                    ];
                }
                changePassword(event) {
                    event.preventDefault();
                    if (listCheck_1.noFalse(this.changePasswordVals)) {
                        let url_string = window.location.href;
                        let url = new URL(url_string);
                        let URL_KEY = url.searchParams.get("key");
                        const authenticateService = new index_1.AuthenticateService();
                        const userService = new UserService_1.UserService();
                        authenticateService.verifyCode(URL_KEY, this.email.value, this.password.value)
                            .then(res => {
                            if (res.status === 200) {
                                const userService = new UserService_1.UserService();
                                console.log(this.email.value);
                                console.log(this.password.value);
                                userService.changePassword(this.email.value, this.password.value)
                                    .then(res => {
                                    console.log(res);
                                    console.log(res.status === 200);
                                    if (res.status === 200) {
                                        this.messageView.update('Senha alterada com sucesso', 'success');
                                    }
                                });
                            }
                            else {
                                console.log(res.status);
                                this.messageView.update('Código Inválido', 'danger');
                            }
                        });
                    }
                }
            };
            exports_1("PasswordRecoveryController", PasswordRecoveryController);
        }
    };
});
