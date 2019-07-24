System.register([], function (exports_1, context_1) {
    "use strict";
    var PostAsk;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PostAsk = class PostAsk {
                constructor(id_helpCenter, desc, id_user, authorName, id, date) {
                    this.id_helpCenter = id_helpCenter;
                    this.desc = desc;
                    this.id_user = id_user;
                    this.authorName = authorName;
                    this.id = id;
                    this.date = date;
                }
                get helpCenter() {
                    return this.id_helpCenter;
                }
                get Desc() {
                    return this.desc;
                }
                get Author() {
                    return this.id_user;
                }
                get Id() {
                    return this.id;
                }
                get AuthorName() {
                    return this.authorName;
                }
                get Date() {
                    let hoje = new Date(this.date);
                    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    return hoje.toLocaleDateString('pt-BR', options);
                }
            };
            exports_1("PostAsk", PostAsk);
        }
    };
});
