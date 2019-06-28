System.register(["../models/User", "../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var User_1, index_1, UserController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (User_1_1) {
                User_1 = User_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            UserController = class UserController {
                constructor() { }
                adiciona(event) {
                    event.preventDefault();
                    let dataOfBirth = new Date(this._dateOfBirth.val().replace(/-/g, ','));
                    const user = new User_1.User(this._name.toString(), this._lastName.toString(), this._userName.toString(), this._email.toString(), this._password.toString(), dataOfBirth);
                    console.log(user);
                }
            };
            __decorate([
                index_1.domInject('#name')
            ], UserController.prototype, "_name", void 0);
            __decorate([
                index_1.domInject('#lastName')
            ], UserController.prototype, "_lastName", void 0);
            __decorate([
                index_1.domInject('#userName')
            ], UserController.prototype, "_userName", void 0);
            __decorate([
                index_1.domInject('#email')
            ], UserController.prototype, "_email", void 0);
            __decorate([
                index_1.domInject('#password')
            ], UserController.prototype, "_password", void 0);
            __decorate([
                index_1.domInject('#dateOfBirth')
            ], UserController.prototype, "_dateOfBirth", void 0);
            exports_1("UserController", UserController);
        }
    };
});
