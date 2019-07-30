System.register([], function (exports_1, context_1) {
    "use strict";
    var RegisteredDaylies;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RegisteredDaylies = class RegisteredDaylies {
                constructor() {
                    this._registeredDaylies = [];
                }
                add(registeredDaily) {
                    this._registeredDaylies.push(registeredDaily);
                }
                toArray() {
                    return [].concat(this._registeredDaylies);
                }
            };
            exports_1("RegisteredDaylies", RegisteredDaylies);
        }
    };
});
