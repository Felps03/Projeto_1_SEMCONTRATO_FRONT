System.register(["../models/User"], function (exports_1, context_1) {
    "use strict";
    var User_1, UserController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (User_1_1) {
                User_1 = User_1_1;
            }
        ],
        execute: function () {
            UserController = class UserController {
                constructor() { }
                add(event) {
                    event.preventDefault();
                    let dataOfBirth = new Date(this._dateOfBirth.val().replace(/-/g, ','));
                    const user = new User_1.User(this._name.toString(), this._lastName.toString(), this._userName.toString(), this._email.toString(), this._password.toString(), dataOfBirth);
                    console.log(user);
                }
                list() {
                }
                update() {
                }
                remove() {
                }
                findById() {
                }
                changePassword() {
                }
            };
            exports_1("UserController", UserController);
        }
    };
});
