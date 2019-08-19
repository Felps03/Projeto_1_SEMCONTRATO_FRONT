System.register(["../services/index", "../views/MessageView", "../helpers/index", "../validation/userValidate", "../utils/listCheck"], function (exports_1, context_1) {
    "use strict";
    var index_1, MessageView_1, index_2, vals, listCheck_1, AuthenticateController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (MessageView_1_1) {
                MessageView_1 = MessageView_1_1;
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
            AuthenticateController = class AuthenticateController {
                constructor() {
                    try {
                        this.messageView = new MessageView_1.MessageView('#message-view');
                    }
                    catch (_a) { }
                    this.email = document.getElementById('email');
                    this.password = document.getElementById('password');
                    this.emailRec = document.getElementById('email_rec');
                    try {
                        this.authVals = [
                            index_2.validate(this.email, vals.email),
                            index_2.validate(this.password, vals.password)
                        ];
                        this.passRecVals = [
                            index_2.validate(this.emailRec, vals.email)
                        ];
                    }
                    catch (e) {
                    }
                }
                authenticate(event) {
                    if (listCheck_1.noFalse(this.authVals)) {
                        const authenticateService = new index_1.AuthenticateService();
                        const configurationService = new index_1.ConfigurationService();
                        authenticateService.authenticate(this.email.value, this.password.value)
                            .then((res) => {
                            if (res.status === 400) {
                                grecaptcha.reset();
                                document.getElementById('message-view').innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">Email ou senha inválidos.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `;
                            }
                        })
                            .catch(err => {
                            console.log(err);
                            grecaptcha.reset();
                            document.getElementById('message-view').innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">Marque a caixa de dialogo do reCAPTCHA!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;
                        });
                    }
                    event.preventDefault();
                }
                resetPassword(event) {
                    event.preventDefault();
                    if (listCheck_1.noFalse(this.passRecVals)) {
                        const userService = new index_1.UserService();
                        const authenticateService = new index_1.AuthenticateService();
                        authenticateService.resetPassword(this.emailRec.value.toString())
                            .then(res => {
                            if (Math.floor(res.status / 100) === 2) {
                                res.json()
                                    .then(() => {
                                    document.getElementById('recoveryModal-close').click();
                                    this.messageView.update('Foi enviado um email para você, siga as instruções contidas nele para continuar.<br>Por favor verificar a seção de <i>spam</i>.');
                                })
                                    .catch(error => {
                                    console.error(error);
                                });
                            }
                            else {
                                res.json()
                                    .then((erres) => {
                                    this.messageView.update(erres.erro);
                                });
                            }
                        });
                    }
                }
                logout(event) {
                    event.preventDefault();
                    localStorage.clear();
                    window.location.href = 'index.html';
                }
                checkAdmin() {
                    event.preventDefault();
                    const authenticateService = new index_1.AuthenticateService();
                    return authenticateService.verifyAdmin();
                }
            };
            exports_1("AuthenticateController", AuthenticateController);
        }
    };
});
