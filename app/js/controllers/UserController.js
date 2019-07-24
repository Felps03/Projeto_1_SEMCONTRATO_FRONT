System.register(["../models/User", "../services/UserService", "../helpers/index", "../validation/userValidate", "../utils/listCheck", "../views/MessageView"], function (exports_1, context_1) {
    "use strict";
    var User_1, UserService_1, index_1, vals, listCheck_1, MessageView_1, UserController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (User_1_1) {
                User_1 = User_1_1;
            },
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
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
            UserController = class UserController {
                constructor() {
                    this.name = document.querySelector('#name');
                    this.lastName = document.querySelector('#lastName');
                    this.userName = document.querySelector('#userName');
                    this.email = document.querySelector('#email');
                    this.password = document.querySelector('#password');
                    this.dateOfBirth = document.querySelector('#dateOfBirth');
                    this.passwordConfirm = document.querySelector('#passwordConfirm');
                    this.id = document.querySelector('#id');
                    this.messageView = new MessageView_1.MessageView('#message-view');
                    this.addVals = [
                        index_1.validate(this.name, vals.name),
                        index_1.validate(this.lastName, vals.lastName),
                        index_1.validate(this.userName, vals.username),
                        index_1.validate(this.email, vals.email),
                        index_1.validate(this.password, vals.editPassword),
                        index_1.validate(this.dateOfBirth, vals.dateOfBirth),
                        index_1.validate(this.passwordConfirm, vals.editPasswordConfirm, this.password)
                    ];
                }
                add(event) {
                    event.preventDefault();
                    if (listCheck_1.noFalse(this.addVals)) {
                        const user = new User_1.User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.dateOfBirth.value.toString(), this.password.value.toString());
                        const userService = new UserService_1.UserService();
                        new Promise((resolve, reject) => {
                            userService.add(user)
                                .then(result => {
                                if (result.status === 200) {
                                    const token = result.headers.get("Token");
                                    if (token != null) {
                                        localStorage.setItem('tkn', token);
                                    }
                                    ;
                                    resolve(result.json());
                                }
                                else {
                                    reject(result);
                                }
                            });
                        }).then((res) => {
                            localStorage.setItem('email', res.email);
                            localStorage.setItem('id', res._id);
                            window.location.href = "index.html";
                        })
                            .catch((res) => res.json())
                            .then((res) => {
                            console.log(res);
                            if (res.erro)
                                this.messageView.update(res.erro);
                        });
                    }
                    ;
                }
                getUserData() {
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
                            if (!result) {
                                window.location.href = "index.html";
                            }
                            let id = document.querySelector('#id');
                            if (id != null)
                                id.value = result['_id'];
                            new User_1.User(this.name.value = result['name'], this.userName.value = result['userName'], this.lastName.value = result['lastName'], this.email.value = result['email'], this.dateOfBirth.value = result['dateOfBirth'].slice(0, 10), this.password.value = "");
                        });
                    }
                }
                update(event) {
                    event.preventDefault();
                    let id = document.querySelector('#id');
                    if (listCheck_1.noFalse(this.addVals)) {
                        let dataOfBirth = this.dateOfBirth.value.replace(/-/g, ',');
                        const user = new User_1.User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), dataOfBirth, this.password.value.toString());
                        const userService = new UserService_1.UserService();
                        let msg = document.getElementById('retrieve-msg');
                        userService.update(user, id.value)
                            .then(result => {
                            if (result.status == 201) {
                                document.querySelector('#nameSpan').textContent = this.name.value;
                                document.querySelector('#userNameSpan').textContent = `(${this.userName.value})`;
                                msg.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show msg-status" role="alert">
                            <strong>Dados atualizados com sucesso!</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;
                            }
                            else if (result.status >= 300) {
                                msg.innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show msg-status" role="alert">
                                <strong>Erro ao atualizar os dados.</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `;
                            }
                            return result.json();
                        }).then(() => {
                            setTimeout(() => {
                                msg.innerHTML = "";
                            }, 3000);
                        });
                    }
                }
                disablePasswordInput(event) {
                    event.preventDefault();
                    let checkbox = document.querySelector('#passwordChange');
                    let password = document.querySelector('#password');
                    let passwordConfirm = document.querySelector('#passwordConfirm');
                    if (checkbox.checked) {
                        password.removeAttribute('disabled');
                        passwordConfirm.removeAttribute('disabled');
                    }
                    else {
                        password.value = '';
                        passwordConfirm.value = '';
                        password.classList.remove('is-valid');
                        password.classList.remove('is-invalid');
                        passwordConfirm.classList.remove('is-valid');
                        passwordConfirm.classList.remove('is-invalid');
                        password.setAttribute('disabled', 'true');
                        passwordConfirm.setAttribute('disabled', 'true');
                    }
                }
            };
            exports_1("UserController", UserController);
        }
    };
});
