System.register(["../models/index", "../services/AuthenticateService"], function (exports_1, context_1) {
    "use strict";
    var index_1, AuthenticateService_1, AuthenticateController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (AuthenticateService_1_1) {
                AuthenticateService_1 = AuthenticateService_1_1;
            }
        ],
        execute: function () {
            AuthenticateController = class AuthenticateController {
                constructor() {
                    this.email = document.querySelector('#email');
                    this.password = document.querySelector('#senha');
                }
                adiciona(event) {
                    event.preventDefault();
                    const authenticate = new index_1.Authenticate(this.email.value.toString(), this.password.value.toString());
                    const authenticateService = new AuthenticateService_1.AuthenticateService();
                    let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
                    console.log(authenticate);
                    console.log(usuario);
                }
            };
            exports_1("AuthenticateController", AuthenticateController);
        }
    };
});
