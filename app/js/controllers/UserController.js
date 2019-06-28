System.register(["../models/User", "../services/UserService"], function (exports_1, context_1) {
    "use strict";
    var User_1, UserService_1, UserController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (User_1_1) {
                User_1 = User_1_1;
            },
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            }
        ],
        execute: function () {
            UserController = class UserController {
                constructor() {
                    this.name = document.querySelector('#name');
                    this.lastName = document.querySelector('#lastName');
                    this.userName = document.querySelector('#userName');
                    this.email = document.querySelector('#email');
                    this.photo = document.querySelector('#photo');
                    this.password = document.querySelector('#password');
                    this.dateOfBirth = document.querySelector('#dateOfBirth');
                }
                add(event) {
                    alert("chegou");
                    event.preventDefault();
                    let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));
                    const user = new User_1.User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.photo.value.toString(), this.password.value.toString(), dataOfBirth);
                    const userService = new UserService_1.UserService();
                    let usuario = userService.cadastro(user);
                    console.log(user);
                    console.log(usuario);
                }
            };
            exports_1("UserController", UserController);
        }
    };
});
