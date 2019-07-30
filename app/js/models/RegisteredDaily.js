System.register([], function (exports_1, context_1) {
    "use strict";
    var RegisteredDaily;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RegisteredDaily = class RegisteredDaily {
                constructor(id_daily, id_user, yesterday, today, impediment, date, owner) {
                    this.id_daily = id_daily;
                    this.id_user = id_user;
                    this.yesterday = yesterday;
                    this.today = today;
                    this.impediment = impediment;
                    this.date = new Date(date);
                    this.owner = owner;
                }
                get Id_daily() {
                    return this.id_daily;
                }
                get Id_user() {
                    return this.id_user;
                }
                get Yesterday() {
                    return this.yesterday;
                }
                get Today() {
                    return this.today;
                }
                get Impediment() {
                    return this.impediment;
                }
                get Date() {
                    return this.date;
                }
                get Owner() {
                    return this.owner;
                }
            };
            exports_1("RegisteredDaily", RegisteredDaily);
        }
    };
});
