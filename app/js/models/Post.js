System.register([], function (exports_1, context_1) {
    "use strict";
    var Post;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Post = class Post {
                constructor(title, desc, authorId, authorName, id) {
                    this.title = title;
                    this.desc = desc;
                    this.authorId = authorId;
                    this.authorName = authorName;
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
                get Id() {
                    return this.id;
                }
            };
            exports_1("Post", Post);
        }
    };
});
