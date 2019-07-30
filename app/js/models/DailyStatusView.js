System.register([], function (exports_1, context_1) {
    "use strict";
    var RegisteredDaily;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RegisteredDaily = class RegisteredDaily {
                constructor(status) { this.status = status; }
                get Status() { return this.status; }
            };
            exports_1("RegisteredDaily", RegisteredDaily);
        }
    };
});
