System.register([], function (exports_1, context_1) {
    "use strict";
    var Post;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Post = class Post {
                constructor(title, desc, authorId, authorName, date, id) {
                    this.title = title;
                    this.desc = desc;
                    this.authorId = authorId;
                    this.authorName = authorName;
                    this.date = date;
                    this.id = id;
                }
                get Title() {
                    return this.title;
                }
                get Desc() {
                    return this.desc;
                }
                get AuthorId() {
                    return this.authorId;
                }
                get AuthorName() {
                    return this.authorName;
                }
                get Date() {
                    let hoje = new Date(this.date);
                    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    return hoje.toLocaleDateString('pt-BR', options);
                }
                get Id() {
                    return this.id;
                }
            };
            exports_1("Post", Post);
        }
    };
});
