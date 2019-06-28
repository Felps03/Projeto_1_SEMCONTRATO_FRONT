System.register([], function (exports_1, context_1) {
    "use strict";
    var Authenticate;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Authenticate = class Authenticate {
                constructor(email, password) {
                    this._email = email;
                    this._password = password;
                }
                get password() {
                    return this._password;
                }
                get email() {
                    return this._email;
                }
            };
            exports_1("Authenticate", Authenticate);
        }
    };
});
