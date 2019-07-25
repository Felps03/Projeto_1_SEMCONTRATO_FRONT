System.register([], function (exports_1, context_1) {
    "use strict";
    var HomeHelpCenter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HomeHelpCenter = class HomeHelpCenter {
                constructor(owner, date, title, description) {
                    this.owner = owner;
                    this.date = date;
                    this.title = title;
                    this.description = description;
                }
                get Owner() {
                    return this.owner;
                }
                get Date() {
                    return this.date;
                }
                get Title() {
                    return this.title;
                }
                get Description() {
                    return this.description;
                }
            };
            exports_1("HomeHelpCenter", HomeHelpCenter);
        }
    };
});
