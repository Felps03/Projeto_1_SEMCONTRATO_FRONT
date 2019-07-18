System.register([], function (exports_1, context_1) {
    "use strict";
    var Authenticate;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Authenticate = class Authenticate {
                constructor(email, password) {
                    this.email = email;
                    this.password = password;
                }
                get Email() {
                    return this.email;
                }
                get Password() {
                    return this.password;
                }
            };
            exports_1("Authenticate", Authenticate);
        }
    };
});
