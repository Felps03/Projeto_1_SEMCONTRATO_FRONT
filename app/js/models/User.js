System.register([], function (exports_1, context_1) {
    "use strict";
    var User;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            User = class User {
                constructor(name, lastName, userName, email, password, dateOfBirth) {
                    this.name = name;
                    this.lastName = lastName;
                    this.userName = userName;
                    this.email = email;
                    this.password = password;
                    this.dateOfBirth = dateOfBirth;
                }
            };
            exports_1("User", User);
        }
    };
});
