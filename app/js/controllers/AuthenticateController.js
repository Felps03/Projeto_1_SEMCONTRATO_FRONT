System.register(["../services/AuthenticateService"], function (exports_1, context_1) {
    "use strict";
    var AuthenticateService_1, AuthenticateController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (AuthenticateService_1_1) {
                AuthenticateService_1 = AuthenticateService_1_1;
            }
        ],
        execute: function () {
            AuthenticateController = class AuthenticateController {
                constructor() {
                    this.email = document.getElementById('email');
                    this.password = document.getElementById('password');
                }
                authenticate(event) {
                    event.preventDefault();
                    const authenticateService = new AuthenticateService_1.AuthenticateService();
                    authenticateService.authenticate(this.email.value.toString(), this.password.value.toString())
                        .catch(res => res.json())
                        .then((res) => {
                        if (res.erro) {
                        }
                    });
                }
                resetPassword(event) {
                    event.preventDefault();
                    const authenticateService = new AuthenticateService_1.AuthenticateService();
                    authenticateService.resetPassword(this.emailRec.value.toString())
                        .then(res => {
                        console.log('status', res.status);
                        if (Math.floor(res.status / 100) === 2) {
                            res.json()
                                .then(() => {
                            })
                                .catch(error => {
                                console.error(error);
                            });
                        }
                        else {
                            res.json()
                                .then((erres) => {
                            });
                        }
                    });
                }
                logout(event) {
                    event.preventDefault();
                    const authenticateService = new AuthenticateService_1.AuthenticateService();
                    authenticateService.logout().then(res => {
                        if (res.status == 400)
                            alert("Houve um erro ao Deslogar");
                        if (res.status == 200) {
                            localStorage.removeItem("tkn");
                            localStorage.removeItem("email");
                            localStorage.removeItem("isAdmin");
                            localStorage.removeItem("id");
                            window.location.href = 'index.html';
                        }
                    }).catch(error => {
                        console.log("error: ", error);
                        return error;
                    });
                }
            };
            exports_1("AuthenticateController", AuthenticateController);
        }
    };
});
