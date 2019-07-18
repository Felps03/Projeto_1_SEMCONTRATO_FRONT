System.register(["../services/index", "../helpers/index", "../validation/userValidate", "../utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, vals, listCheck_1, PasswordRecoveryController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
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
            }
        ],
        execute: function () {
            PasswordRecoveryController = class PasswordRecoveryController {
                constructor() {
                    this.email = document.querySelector('#email_rec');
                    this.password = document.querySelector('#password_rec');
                    this.passwordConfirm = document.querySelector('#password_rec_conf');
                    this.changePasswordVals = [
                        index_2.validate(this.email, vals.email),
                        index_2.validate(this.password, vals.password),
                        index_2.validate(this.passwordConfirm, vals.passwordConfirm, this.password)
                    ];
                }
                changePassword(event) {
                    event.preventDefault();
                    let mesage = document.querySelector("#link-expired");
                    if (listCheck_1.noFalse(this.changePasswordVals)) {
                        let url_string = window.location.href;
                        let url = new URL(url_string);
                        let URL_KEY = url.searchParams.get("key");
                        const authenticateService = new index_1.AuthenticateService();
                        console.log('pimba');
                        authenticateService.verifyCode(URL_KEY, this.email.value, this.password.value)
                            .then(res => res.json())
                            .then(res => {
                            let erro = res;
                            mesage.textContent = erro.erro;
                            if (erro.erro)
                                document.getElementById("link-expired").style.display = "block";
                        }).catch(err => {
                            console.log(err);
                            mesage.textContent = JSON.stringify(err);
                        });
                    }
                }
            };
            exports_1("PasswordRecoveryController", PasswordRecoveryController);
        }
    };
});
