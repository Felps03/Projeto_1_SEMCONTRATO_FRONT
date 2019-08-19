System.register([], function (exports_1, context_1) {
    "use strict";
    var PostGOB;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PostGOB = class PostGOB {
                constructor(title, desc, authorName, date, photo, likes, tags, solved, id) {
                    this.title = title;
                    this.desc = desc;
                    this.authorName = authorName;
                    this.date = date;
                    this.photo = photo;
                    this.likes = likes;
                    this.tags = tags;
                    this.solved = solved;
                    this.id = id;
                }
                get Title() {
                    return this.title;
                }
                get Desc() {
                    return this.desc;
                }
                get AuthorName() {
                    return this.authorName;
                }
                get Date() {
                    return this.date;
                }
                get Photo() {
                    return this.photo;
                }
                get Likes() {
                    return this.likes;
                }
                get Tags() {
                    return this.tags;
                }
                get Solved() {
                    return this.solved;
                }
                get Id() {
                    return this.id;
                }
            };
            exports_1("PostGOB", PostGOB);
        }
    };
});
